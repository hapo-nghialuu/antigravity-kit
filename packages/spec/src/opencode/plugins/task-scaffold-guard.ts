/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — task-scaffold-guard.ts
 *
 * Port of .claude/hooks/task-scaffold-guard.cjs to OpenCode plugin protocol.
 * Also covers the OpenCode-only `apply_patch` file-creation vector
 * (`*** Add File: <path>` in `output.args.patchText`).
 *
 * Behavior:
 * - Block `write` and `apply_patch` that create `specs/<feature>/tasks/task-*.md`.
 * - Task files must be generated via `spec-scaffold.cjs`, then Edit-filled.
 *
 * Safety valves:
 *   1. Escape hatch: `.opencode/runtime.json` `{ "spec": { "scaffold_guard": false } }`
 *      (fail-closed: missing/broken runtime keeps the guard ON).
 *   2. Fail-open if `.opencode/scripts/spec-scaffold.cjs` is absent.
 *   3. Actionable block message with the exact scaffold command.
 */

import type { Plugin } from "@opencode-ai/plugin";
import { existsSync, readFileSync, mkdirSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TASK_FILE_RE = /(^|\/)specs\/[^/]+\/tasks\/task-[^/]+\.md$/;
const TASK_FILE_REL_RE = /(?:^|\/)(specs\/[^/]+\/tasks\/task-[^/]+\.md)$/;
const FEATURE_RE = /(^|\/)specs\/([^/]+)\/tasks\//;
const ADD_FILE_RE = /^\*\*\* Add File:\s*(.+?)\s*$/gm;

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));

function readRuntime(cwd: string): Record<string, unknown> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function isTaskFile(filePath: string): boolean {
  const norm = filePath.replace(/\\/g, "/");
  return TASK_FILE_RE.test(norm);
}

function extractFeature(filePath: string): string {
  const norm = filePath.replace(/\\/g, "/");
  const m = norm.match(FEATURE_RE);
  return m ? m[2] : "<feature>";
}

function pathsFromApplyPatch(patchText: string): string[] {
  const paths: string[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(ADD_FILE_RE.source, ADD_FILE_RE.flags);
  while ((match = re.exec(patchText)) !== null) {
    const p = match[1]?.trim();
    if (p) paths.push(p);
  }
  return paths;
}

function collectTargetPaths(tool: string, args: Record<string, unknown>): string[] {
  if (tool === "write") {
    const filePath = typeof args.filePath === "string" ? args.filePath.trim() : "";
    return filePath ? [filePath] : [];
  }
  if (tool === "apply_patch") {
    const patchText = typeof args.patchText === "string" ? args.patchText : "";
    return patchText ? pathsFromApplyPatch(patchText) : [];
  }
  return [];
}

/**
 * Resolve a (possibly sandbox-virtual) tool path to the real on-disk task file.
 * OpenCode may present paths like /home/user/specs/... to the model; the
 * project-relative `specs/...` suffix joined onto the plugin `directory` is
 * the reliable location for existence checks.
 */
function resolveTaskFile(directory: string, filePath: string): string {
  const norm = filePath.replace(/\\/g, "/");
  const m = norm.match(TASK_FILE_REL_RE);
  return m ? join(directory, m[1]) : filePath;
}

function formatBlockMessage(filePath: string): string {
  const feature = extractFeature(filePath);
  // NOTE: deliberately does NOT mention the runtime.json escape hatch.
  // Smoke-tested on opencode 1.17.15: when the block message advertised the
  // override, the model simply wrote runtime.json and disabled the guard.
  // The hatch stays functional for humans; it is documented in the docs only.
  return [
    "TASK SCAFFOLD REQUIRED: task files must be generated, not hand-written.",
    `Blocked Write: ${filePath}`,
    "",
    "Generate the stub(s), then Edit-fill the {{...}} placeholders:",
    `  node .opencode/scripts/spec-scaffold.cjs ${feature} --tasks "R0-01-slug,R1-01-slug,..." --tasks-only`,
    "Then use Edit (not Write) on each tasks/task-*.md stub.",
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
        hook: "task-scaffold-guard",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

export const TaskScaffoldGuard: Plugin = async ({ directory }) => ({
  "tool.execute.before": async (input, output) => {
    try {
      if (input.tool !== "write" && input.tool !== "apply_patch" && input.tool !== "edit") return;

      const runtime = readRuntime(directory);
      const spec = runtime.spec as Record<string, unknown> | undefined;
      if (spec?.scaffold_guard === false) return;

      const scaffold = join(directory, ".opencode", "scripts", "spec-scaffold.cjs");
      if (!existsSync(scaffold)) return;

      const args = (output.args ?? {}) as Record<string, unknown>;

      // OpenCode's `edit` CAN create new files (unlike Claude's Edit, which
      // requires an existing file — the original guard's design premise).
      // Verified on opencode 1.17.15. Gate: edit on a NON-existent task file
      // is creation (block); edit on an existing stub is legitimate filling.
      if (input.tool === "edit") {
        const filePath = typeof args.filePath === "string" ? args.filePath.trim() : "";
        if (filePath && isTaskFile(filePath) && !existsSync(resolveTaskFile(directory, filePath))) {
          throw new Error(formatBlockMessage(filePath));
        }
        return;
      }

      const paths = collectTargetPaths(input.tool, args);
      for (const filePath of paths) {
        if (!isTaskFile(filePath)) continue;
        throw new Error(formatBlockMessage(filePath));
      }
    } catch (error) {
      // Re-throw intentional scaffold blocks; swallow programming errors.
      if (error instanceof Error && error.message.includes("TASK SCAFFOLD REQUIRED")) {
        throw error;
      }
      logCrash(error);
    }
  },
});
