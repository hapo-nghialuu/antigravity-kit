/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — state.ts
 *
 * Port of .claude/hooks/state.cjs (partial).
 *
 * Behavior:
 * - On session.created: read .opencode/session-state/latest.md (if fresh)
 *   and surface it via stderr + banner file so the assistant sees prior
 *   execution context.
 * - On tool.execute.after for state-shaping tools (todowrite, task,
 *   taskcreate, taskupdate): refresh snapshot.
 * - On session.idle (≈ Claude Stop): persist snapshot + archive.
 *
 * Dropped:
 * - SubagentStop branch (no equivalent in OpenCode).
 * - Transcript-based todo extraction (OpenCode plugin context lacks
 *   transcript_path). Snapshot now captures modifiedFiles only.
 *
 * Storage: .opencode/session-state/latest.md + archive/.
 */

import type { Plugin } from "@opencode-ai/plugin";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  unlinkSync,
  renameSync,
  appendFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const EXPIRY_DAYS = 7;
const MAX_ARCHIVES = 5;
const STATE_REFRESH_TOOLS = new Set(["todowrite", "task", "taskcreate", "taskupdate"]);
const STATE_SECTION_START = "<!-- CAFEKIT STATE START -->";
const STATE_SECTION_END = "<!-- CAFEKIT STATE END -->";

interface SnapshotData {
  timestamp: string;
  branch: string;
  modifiedFiles: string[];
}

function stateDir(cwd: string): string | null {
  try {
    const dir = join(cwd, ".opencode", "session-state");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    return dir;
  } catch {
    return null;
  }
}

function loadLatest(dir: string): string | null {
  try {
    const file = join(dir, "latest.md");
    if (!existsSync(file)) return null;
    const text = readFileSync(file, "utf8");
    const match = text.match(/<!-- Generated: (.+?) -->/);
    if (match) {
      const generatedAt = new Date(match[1]).getTime();
      if (Number.isNaN(generatedAt)) return null;
      if (Date.now() - generatedAt > EXPIRY_DAYS * 24 * 60 * 60 * 1000) return null;
    }
    return text;
  } catch {
    return null;
  }
}

function writeAtomic(filePath: string, content: string): void {
  const tempFile = `${filePath}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
  writeFileSync(tempFile, content);
  renameSync(tempFile, filePath);
}

function archive(dir: string): void {
  try {
    const latestFile = join(dir, "latest.md");
    if (!existsSync(latestFile)) return;

    const archiveDir = join(dir, "archive");
    if (!existsSync(archiveDir)) mkdirSync(archiveDir);

    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");
    const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;

    copyFileSync(latestFile, join(archiveDir, `${stamp}.md`));

    const files = readdirSync(archiveDir)
      .filter((file) => file.endsWith(".md"))
      .sort();
    while (files.length > MAX_ARCHIVES) {
      const oldest = files.shift();
      if (oldest) {
        try {
          unlinkSync(join(archiveDir, oldest));
        } catch {
          // fail-open
        }
      }
    }
  } catch {
    // fail-open
  }
}

function extractSnapshot(cwd: string): SnapshotData {
  const data: SnapshotData = {
    timestamp: new Date().toISOString(),
    branch: "",
    modifiedFiles: [],
  };

  try {
    data.branch = execSync("git branch --show-current", {
      cwd,
      encoding: "utf8",
      timeout: 3000,
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    // fail-open
  }

  try {
    const diff = execSync("git diff --name-only HEAD", {
      cwd,
      encoding: "utf8",
      timeout: 3000,
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    if (diff) data.modifiedFiles = diff.split("\n").slice(0, 20);
  } catch {
    // fail-open
  }

  return data;
}

function buildStateContent(data: SnapshotData): string {
  return [
    "# Session State",
    `<!-- Generated: ${data.timestamp} -->`,
    `<!-- Branch: ${data.branch || "unknown"} -->`,
    "",
    "## Key Files Modified",
    ...(data.modifiedFiles.length
      ? data.modifiedFiles.map((file) => `- ${file}`)
      : ["- (No file changes detected)"]),
    "",
  ].join("\n");
}

function writeBannerSection(cwd: string, content: string | null): void {
  const target = join(cwd, ".opencode", "session-banner.md");
  const dir = dirname(target);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const existing = existsSync(target) ? readFileSync(target, "utf8") : "";
  const pattern = new RegExp(`${STATE_SECTION_START}[\\s\\S]*?${STATE_SECTION_END}\\n?`);
  const cleaned = existing.replace(pattern, "").trimEnd();

  if (!content) {
    if (cleaned !== existing.trimEnd()) {
      writeFileSync(target, cleaned ? `${cleaned}\n` : "");
    }
    return;
  }

  const block = [STATE_SECTION_START, content, STATE_SECTION_END].join("\n");
  const next = cleaned ? `${cleaned}\n\n${block}\n` : `${block}\n`;
  writeFileSync(target, next);
}

function persistSnapshot(dir: string, data: SnapshotData, options: { archive?: boolean } = {}): void {
  const file = join(dir, "latest.md");
  writeAtomic(file, buildStateContent(data));
  if (options.archive) archive(dir);
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      JSON.stringify({
        ts: new Date().toISOString(),
        hook: "state",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

export const State: Plugin = async ({ directory }) => ({
  event: async ({ event }) => {
    try {
      const dir = stateDir(directory);
      if (!dir) return;

      if (event.type === "session.created") {
        const previous = loadLatest(dir);
        if (previous) {
          const banner = [
            "=== Prior Execution Context ===",
            previous.trim(),
            "=== End of Prior Context ===",
          ].join("\n");
          writeBannerSection(directory, banner);
          console.error(banner);
        } else {
          writeBannerSection(directory, null);
        }
        return;
      }

      if (event.type === "session.idle") {
        const snapshot = extractSnapshot(directory);
        persistSnapshot(dir, snapshot, { archive: true });
        return;
      }
    } catch (error) {
      logCrash(error);
    }
  },

  "tool.execute.after": async (input) => {
    try {
      if (!STATE_REFRESH_TOOLS.has(input.tool)) return;
      const dir = stateDir(directory);
      if (!dir) return;
      const snapshot = extractSnapshot(directory);
      persistSnapshot(dir, snapshot);
    } catch (error) {
      logCrash(error);
    }
  },
});
