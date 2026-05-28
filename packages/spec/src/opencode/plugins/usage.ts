/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — usage.ts
 *
 * Port of .claude/hooks/usage.cjs adapted to OpenCode's plugin surface.
 *
 * Claude's version polls the Anthropic OAuth API for plan usage so the
 * statusline can render quota. OpenCode has no statusline injection point
 * and no OAuth plumbing, so this port instead tracks per-session token
 * usage by inspecting `message.updated` payloads and writing the rolling
 * totals to `.opencode/session-state/usage.json` for downstream tooling.
 *
 * Disable via .opencode/runtime.json: { "usage": { "enabled": false } }.
 */

import type { Plugin } from "@opencode-ai/plugin";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));

interface UsageTotals {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  messages: number;
  lastUpdated: string;
}

interface UsageFile {
  sessionId: string;
  startedAt: string;
  totals: UsageTotals;
}

function resolveProjectDir(directory?: string): string {
  if (directory && existsSync(directory)) return directory;
  // Plugin installed under <project>/.opencode/plugins/, so go up twice.
  return dirname(dirname(PLUGIN_DIR));
}

function readRuntime(cwd: string): Record<string, any> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    if (existsSync(file)) {
      return JSON.parse(readFileSync(file, "utf8"));
    }
  } catch {
    /* fail-open */
  }
  return {};
}

function isEnabled(cwd: string): boolean {
  const runtime = readRuntime(cwd);
  return runtime?.usage?.enabled !== false;
}

function usagePath(cwd: string): string {
  return join(cwd, ".opencode", "session-state", "usage.json");
}

function readUsage(file: string): UsageFile | null {
  try {
    if (!existsSync(file)) return null;
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function writeUsage(file: string, payload: UsageFile): void {
  try {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(payload, null, 2));
  } catch {
    /* fail-open */
  }
}

// Defensive extractor: OpenCode message payloads may expose usage either
// directly on the message or nested under metadata/usage. Accept both.
function extractUsage(message: any): {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
} | null {
  const candidates = [
    message?.usage,
    message?.metadata?.usage,
    message?.tokens,
    message?.metadata?.tokens,
  ].filter(Boolean);

  for (const c of candidates) {
    const input =
      Number(c.input_tokens ?? c.inputTokens ?? c.prompt_tokens ?? 0) || 0;
    const output =
      Number(c.output_tokens ?? c.outputTokens ?? c.completion_tokens ?? 0) ||
      0;
    const cacheRead =
      Number(
        c.cache_read_input_tokens ??
          c.cacheReadInputTokens ??
          c.cache_read_tokens ??
          0,
      ) || 0;
    const cacheWrite =
      Number(
        c.cache_creation_input_tokens ??
          c.cacheCreationInputTokens ??
          c.cache_write_tokens ??
          0,
      ) || 0;
    if (input || output || cacheRead || cacheWrite) {
      return { input, output, cacheRead, cacheWrite };
    }
  }
  return null;
}

export const UsagePlugin: Plugin = async ({ directory }) => {
  const cwd = resolveProjectDir(directory);

  return {
    event: async ({ event }) => {
      if (event.type !== "message.updated") return;
      if (!isEnabled(cwd)) return;

      const message = (event as any).properties?.info ?? (event as any).properties?.message;
      if (!message) return;

      const tokens = extractUsage(message);
      if (!tokens) return;

      const sessionId = message.sessionID ?? message.sessionId ?? "default";
      const file = usagePath(cwd);
      const now = new Date().toISOString();
      const existing = readUsage(file);

      const sameSession = existing && existing.sessionId === sessionId;
      const totals: UsageTotals = sameSession
        ? existing!.totals
        : {
            inputTokens: 0,
            outputTokens: 0,
            cacheReadTokens: 0,
            cacheWriteTokens: 0,
            messages: 0,
            lastUpdated: now,
          };

      totals.inputTokens += tokens.input;
      totals.outputTokens += tokens.output;
      totals.cacheReadTokens += tokens.cacheRead;
      totals.cacheWriteTokens += tokens.cacheWrite;
      totals.messages += 1;
      totals.lastUpdated = now;

      writeUsage(file, {
        sessionId,
        startedAt: sameSession ? existing!.startedAt : now,
        totals,
      });
    },
  };
};

export default UsagePlugin;
