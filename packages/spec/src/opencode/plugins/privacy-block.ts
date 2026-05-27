/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — privacy-block.ts
 *
 * Port of .claude/hooks/privacy-block.cjs to OpenCode plugin protocol.
 *
 * Behavior:
 * - Match tool input paths against RESTRICTED_PATTERNS.
 * - For `bash`: log warning and allow (caller may have user approval already).
 * - For other tools: throw with @@PRIVACY_PROMPT_START@@ marker payload so the
 *   assistant prompts the user before retrying via bash cat.
 *
 * Disable via `.opencode/runtime.json` { "privacyBlock": false }.
 */

import type { Plugin } from "@opencode-ai/plugin";
import { existsSync, readFileSync, mkdirSync, appendFileSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RESTRICTED_PATTERNS: RegExp[] = [
  /^\.env(\.|$)/i,
  /^credentials/i,
  /secrets?\.(ya?ml|json)$/i,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i,
  /^id_(rsa|ed25519|ecdsa|dsa)$/i,
  /\.netrc$/i,
  /\.pgpass$/i,
  /kubeconfig/i,
  /\.keystore$/i,
  /\.jks$/i,
  /auth\.json$/i,
  /token(s)?\.json$/i,
];

const ALLOWED_EXEMPTIONS: RegExp[] = [/\.env\.(example|sample|template|test)$/i];

const GATED_TOOLS = new Set(["read", "write", "edit", "glob", "grep", "bash"]);

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));

function readRuntime(cwd: string): Record<string, unknown> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function isSafe(filePath: string): boolean {
  const base = basename(filePath);
  return ALLOWED_EXEMPTIONS.some((rule) => rule.test(base) || rule.test(filePath));
}

function isSensitive(filePath: string): boolean {
  const base = basename(filePath);
  return RESTRICTED_PATTERNS.some((rule) => rule.test(base) || rule.test(filePath));
}

function extractBashPaths(command: string): string[] {
  const paths: string[] = [];
  const regex = /(?:cat|less|more|head|tail|source|\.)\s+(?:"([^"]+)"|'([^']+)'|([^\s]+))/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(command)) !== null) {
    const value = match[1] || match[2] || match[3];
    if (value) paths.push(value);
  }
  return paths;
}

function extractPaths(tool: string, args: Record<string, unknown>): string[] {
  const paths: string[] = [];
  if (!args) return paths;

  const filePath = typeof args.filePath === "string" ? args.filePath.trim() : "";
  if (filePath) paths.push(filePath);

  const path = typeof args.path === "string" ? args.path.trim() : "";
  if (path) paths.push(path);

  if (tool === "bash" && typeof args.command === "string") {
    paths.push(...extractBashPaths(args.command));
  }

  return paths.filter(Boolean);
}

function formatBlockMessage(filePath: string): string {
  const fileBase = basename(filePath);
  const promptData = {
    type: "PRIVACY_PROMPT",
    file: filePath,
    basename: fileBase,
    question: {
      header: "File Access",
      text: `I need to read "${fileBase}" which may contain sensitive data (API keys, passwords, tokens). Do you approve?`,
      options: [
        {
          label: "Yes, approve access",
          description: `Allow reading ${fileBase} this time`,
        },
        {
          label: "No, skip this file",
          description: "Continue without accessing this file",
        },
      ],
    },
  };

  return [
    "NOTE: This is not an error. This block protects sensitive data.",
    "",
    "PRIVACY BLOCK: Sensitive file access requires user approval",
    `File: ${filePath}`,
    "",
    "@@PRIVACY_PROMPT_START@@",
    JSON.stringify(promptData, null, 2),
    "@@PRIVACY_PROMPT_END@@",
    "",
    "OpenCode follow-up:",
    `- If approved: use bash to read: cat "${filePath}"`,
    "- If denied: continue without this file",
  ].join("\n");
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      JSON.stringify({
        ts: new Date().toISOString(),
        hook: "privacy-block",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

export const PrivacyBlock: Plugin = async ({ directory }) => ({
  "tool.execute.before": async (input, output) => {
    try {
      if (!GATED_TOOLS.has(input.tool)) return;

      const runtime = readRuntime(directory);
      if (runtime.privacyBlock === false) return;

      const args = (output.args ?? {}) as Record<string, unknown>;
      const paths = extractPaths(input.tool, args);
      if (paths.length === 0) return;

      for (const filePath of paths) {
        if (isSafe(filePath)) continue;
        if (!isSensitive(filePath)) continue;

        if (input.tool === "bash") {
          console.error(
            `WARN: Privacy-sensitive file access via bash allowed for approved follow-up: ${basename(filePath)}`,
          );
          return;
        }

        throw new Error(formatBlockMessage(filePath));
      }
    } catch (error) {
      // Re-throw the privacy block error (intentional); only swallow programming errors.
      if (error instanceof Error && error.message.includes("@@PRIVACY_PROMPT_START@@")) {
        throw error;
      }
      logCrash(error);
    }
  },
});
