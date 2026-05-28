/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — inspect-block.ts
 *
 * Port of .claude/hooks/inspect-block.cjs.
 *
 * Behavior:
 * - Block reads/writes/globs/greps that target heavy directories (node_modules,
 *   .git, dist, build, .next, .venv, vendor, target, coverage, ...).
 * - Block excessively broad glob patterns (e.g. **\/* alone).
 * - Allow approved build/package-manager bash commands.
 *
 * Disable via `.opencode/runtime.json` { "inspect": { "enabled": false } }
 * or `.opencode/runtime.json` { "scout": { "enabled": false } }.
 */

import type { Plugin } from "@opencode-ai/plugin";
import { existsSync, readFileSync, mkdirSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const BLOCKED_DIRS = [
  "node_modules",
  "dist",
  "build",
  ".next",
  ".nuxt",
  ".output",
  "__pycache__",
  ".venv",
  "venv",
  ".env",
  "vendor",
  "target",
  ".git",
  "coverage",
  ".nyc_output",
];

const BROAD_GLOB = [/^\*\*\/\*$/, /^\*\*\.\w+$/, /^\*\*\/\*\.\w+$/];

const ALLOWED_CMD =
  /^(npm|pnpm|yarn|bun|npx|pnpx|bunx|tsc|vite|esbuild|webpack|rollup|turbo|nx|jest|vitest|eslint|prettier|go|cargo|make|mvn|gradle|dotnet|docker|kubectl|helm|python3?|pip|uv|deno|bundle|rake|php|composer|ruby|mix)\b/;
const VENV_EXEC = /(^|[\/\\])\.?venv[\/\\](bin|Scripts)[\/\\]/;
const VENV_CREATE = /^(python3?|py)\s+.*-m\s+venv\s+|^uv\s+venv(\s|$)/;

const GATED_TOOLS = new Set(["read", "write", "edit", "glob", "grep", "bash"]);

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));

function isAllowedCommand(cmd: string): boolean {
  const stripped = cmd
    .trim()
    .replace(/^(\w+=\S+\s+)+/, "")
    .replace(/^(sudo|env|time)\s+/, "")
    .trim();
  return ALLOWED_CMD.test(stripped) || VENV_EXEC.test(stripped) || VENV_CREATE.test(stripped);
}

function isBlockedPath(p: string): string | null {
  const segments = p.replace(/\\/g, "/").split("/");
  return segments.find((seg) => BLOCKED_DIRS.includes(seg)) ?? null;
}

function isBroadGlob(p: string): boolean {
  return BROAD_GLOB.some((rule) => rule.test(p.trim()));
}

function extractPaths(tool: string, args: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (!args) return out;

  if (typeof args.filePath === "string") out.push(args.filePath);
  if (typeof args.path === "string") out.push(args.path);
  if (typeof args.pattern === "string" && tool === "glob") out.push(args.pattern);

  if (tool === "bash" && typeof args.command === "string") {
    const matches = args.command.match(/(?:cat|ls|find|head|tail)\s+(\S+)/g);
    if (matches) {
      for (const m of matches) {
        const tail = m.trim().split(/\s+/).pop();
        if (tail) out.push(tail);
      }
    }
  }

  return out.filter(Boolean);
}

function readRuntime(cwd: string): Record<string, any> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      JSON.stringify({
        ts: new Date().toISOString(),
        hook: "inspect-block",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

export const InspectBlock: Plugin = async ({ directory }) => ({
  "tool.execute.before": async (input, output) => {
    try {
      if (!GATED_TOOLS.has(input.tool)) return;

      const runtime = readRuntime(directory);
      if (runtime.scout?.enabled === false || runtime.inspect?.enabled === false) return;

      const args = (output.args ?? {}) as Record<string, unknown>;

      if (input.tool === "bash" && typeof args.command === "string") {
        const cmds = args.command.split(/\s*(?:&&|\|\||;)\s*/).filter(Boolean);
        if (cmds.every((c) => isAllowedCommand(c))) return;
      }

      if (input.tool === "glob" && typeof args.pattern === "string" && isBroadGlob(args.pattern)) {
        throw new Error(
          [
            "SCOPE LIMIT EXCEEDED: Glob pattern is excessively broad",
            `Requested Pattern: ${args.pattern}`,
            "",
            "Please narrow your scope (e.g., src/**/*.ts rather than **/*.ts).",
          ].join("\n"),
        );
      }

      const paths = extractPaths(input.tool, args);
      for (const p of paths) {
        const blocked = isBlockedPath(p);
        if (blocked) {
          throw new Error(
            [
              `SCOPE LIMIT EXCEEDED: Directory "${blocked}/" is explicitly forbidden`,
              `Requested Path: ${p}`,
              `Restricted zones: ${BLOCKED_DIRS.join(", ")}`,
            ].join("\n"),
          );
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("SCOPE LIMIT EXCEEDED")) {
        throw error;
      }
      logCrash(error);
    }
  },
});
