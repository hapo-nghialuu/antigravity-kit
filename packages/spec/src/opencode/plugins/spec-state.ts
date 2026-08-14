/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — spec-state.ts
 *
 * The reminder adapter consumes the same executable spec resolver used by
 * Claude and Codex. OpenCode can inject a prompt part, but this hook is not a
 * cancellable completion boundary; hard completion enforcement belongs to
 * spec-gate's `tool.execute.before` hook where OpenCode supports it.
 *
 * The reminder cache is scoped by canonical project root, complete session
 * identity, canonical spec identity, and current state. Missing identity
 * disables the cache for that turn instead of creating a collision-prone key.
 */

import type { Plugin } from "@opencode-ai/plugin";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  appendFileSync,
  realpathSync,
} from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = join(PLUGIN_DIR, ".logs", "tollgate-last.txt");
const SHARED_RESOLVER_FILE = "spec-resolver.cjs";

type SpecJson = {
  current_phase?: string;
  phase?: string;
  task_registry?: Record<string, { status?: string; dependencies?: string[] }>;
};

type ActiveSpec = {
  featureName: string;
  spec: SpecJson;
  specsDir: string;
  featureDir: string;
  specFile: string;
};

type ResolverIssue = {
  error: "multiple_active" | "invalid_specs" | "explicit_not_found" | "explicit_malformed" | "resolver_unavailable";
  candidates?: string[];
  reason: string;
};

type ResolveResult = ActiveSpec | ResolverIssue | null;

function readRuntime(cwd: string): Record<string, unknown> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function loadResolver(): { resolver: any | null; error: Error | null; path: string } {
  const installed = join(PLUGIN_DIR, "../scripts", SHARED_RESOLVER_FILE);
  const source = join(PLUGIN_DIR, "../../claude/scripts", SHARED_RESOLVER_FILE);
  const candidate = existsSync(installed) ? installed : source;
  try {
    const resolver = require(candidate);
    if (!resolver || typeof resolver.resolveActiveSpec !== "function") {
      throw new Error("shared spec resolver has no resolveActiveSpec function");
    }
    return { resolver, error: null, path: candidate };
  } catch (error) {
    return {
      resolver: null,
      error: error instanceof Error ? error : new Error(String(error)),
      path: candidate,
    };
  }
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      `${JSON.stringify({
        ts: new Date().toISOString(),
        hook: "spec-state",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      })}\n`,
    );
  } catch {
    // Logging errors are intentionally ignored.
  }
}

function isIssue(resolved: ResolveResult): resolved is ResolverIssue {
  return Boolean(resolved && typeof resolved === "object" && "error" in resolved);
}

function resolveActiveSpec(
  cwd: string,
  runtime: Record<string, unknown>,
  targetSources: unknown[],
): ResolveResult {
  const loaded = loadResolver();
  if (!loaded.resolver) {
    return {
      error: "resolver_unavailable",
      reason: `${loaded.error?.message || "shared spec resolver is unavailable"} (${loaded.path})`,
    };
  }
  const target = typeof loaded.resolver.extractExplicitTarget === "function"
    ? loaded.resolver.extractExplicitTarget(...targetSources)
    : null;
  try {
    return loaded.resolver.resolveActiveSpec({
      projectRoot: cwd,
      runtime,
      ...(target || {}),
    }) as ResolveResult;
  } catch (error) {
    return {
      error: "resolver_unavailable",
      reason: `${error instanceof Error ? error.message : String(error)} (${loaded.path})`,
    };
  }
}

function canonicalPath(value: string): string | null {
  try {
    return realpathSync(value);
  } catch {
    return null;
  }
}

function sessionIdentity(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, any>;
  const candidates = [
    record.sessionID,
    record.sessionId,
    record.session_id,
    record.message?.sessionID,
    record.message?.sessionId,
  ];
  return candidates.find((candidate) => (
    typeof candidate === "string" && candidate.length > 0 && candidate.trim() === candidate
  )) || null;
}

function buildCacheKey(
  cwd: string,
  featureName: string,
  activeSpec: ActiveSpec,
  hostInput: unknown,
  output: unknown,
): string | null {
  const projectRoot = canonicalPath(cwd);
  const specIdentity = canonicalPath(activeSpec.specFile);
  const sessionID = sessionIdentity(output) || sessionIdentity(hostInput);
  if (!projectRoot || !specIdentity || !sessionID) return null;

  const taskEntries = Object.entries(activeSpec.spec.task_registry || {});
  const done = taskEntries.filter(([, task]) => task?.status === "done").length;
  const phase = activeSpec.spec.current_phase || activeSpec.spec.phase || "unknown";
  return JSON.stringify({
    projectRoot,
    sessionID,
    featureName,
    specIdentity,
    phase,
    done,
    total: taskEntries.length,
  });
}

function buildTollgateText(
  featureName: string,
  activeSpec: SpecJson,
  cacheKey: string | null,
): { stateKey: string | null; fullBlock: string; reminder: string } {
  const phase = activeSpec.current_phase || activeSpec.phase || "unknown";
  const taskRegistry = activeSpec.task_registry || {};
  const taskEntries = Object.entries(taskRegistry);
  const taskCounts = taskEntries.reduce<Record<string, number>>((acc, [, task]) => {
    const status = task?.status || "pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const taskStatusByPath = new Map(taskEntries.map(([taskPath, task]) => [taskPath, task?.status || "pending"]));
  const nextUnblocked = taskEntries.find(([, task]) => {
    const status = task?.status || "pending";
    const deps = Array.isArray(task?.dependencies) ? task.dependencies : [];
    return status === "pending" && deps.every((dependency) => taskStatusByPath.get(dependency) === "done");
  });

  const done = taskCounts.done || 0;
  const total = taskEntries.length;
  const reminder =
    `\n> 🔵 Spec \`${featureName}\` @ \`${phase}\` (${done}/${total} tasks done). ` +
    "Tollgate active — sync `spec.json` when state changes.\n";

  const lines: string[] = [
    "",
    "### 🔴 URGENT SYSTEM TOLLGATE (STATE SYNC) 🔴",
    `- **Active Feature:** \`${featureName}\``,
    `- **Current Phase:** \`${phase}\``,
  ];
  if (total > 0) {
    lines.push(
      `- **Task Registry:** \`${total} total | ${done} done | ${taskCounts.in_progress || 0} in_progress | ${taskCounts.blocked || 0} blocked | ${taskCounts.pending || 0} pending\``,
    );
    if (nextUnblocked) lines.push(`- **Next Unblocked Task:** \`${nextUnblocked[0]}\``);
  }
  lines.push("");
  lines.push("> BẮT BUỘC (MANDATORY): Nếu bạn vừa hoàn thành một bước, hãy cập nhật state vật lý sau khi có bằng chứng verify thật (build/test/runtime/artifact).\n");
  lines.push("> 1. Sửa file `spec.json` (status, phase/current_phase, timestamps, `task_files`, `task_registry`, validation state nếu có thay đổi).\n");
  lines.push("> 2. Chỉ khi verify xong mới sửa file `tasks/task-*.md` (status + tick '[x]' các sub-task và completion criteria liên quan).\n");
  lines.push(`> 3. Trước khi set \`ready_for_implementation = true\`, PHẢI chạy \`node .opencode/scripts/validate-spec-output.cjs specs/${featureName}\` và sửa mọi lỗi.\n`);
  lines.push("> 4. Sau verified source work, đánh giá docs impact thực tế: cập nhật đúng tài liệu bị ảnh hưởng hoặc ghi `Docs impact: none`; không tạo docs update chỉ vì hoàn tất task.\n");
  lines.push("> CẤM biến marker hoặc model claim thành bằng chứng verify.\n");
  lines.push("");

  return { stateKey: cacheKey, fullBlock: lines.join("\n"), reminder };
}

function injectText(
  output: { message?: { id?: string; sessionID?: string }; parts?: unknown[] },
  text: string,
): void {
  const message = output.message ?? {};
  if (!Array.isArray(output.parts)) output.parts = [];
  output.parts.push({
    id: `prt_ck${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
    sessionID: message.sessionID ?? "",
    messageID: message.id ?? "",
    type: "text",
    text,
    synthetic: true,
  });
}

function issueText(issue: ResolverIssue): string {
  const candidates = issue.candidates?.join(", ");
  if (issue.error === "multiple_active") {
    return `\n> ⚠️ Multiple active specs detected: ${candidates}. Provide exact \`featureName\`/\`feature\` or \`specPath\`/\`featurePath\` in the host input; tollgate paused.\n`;
  }
  if (issue.error === "invalid_specs") {
    return `\n> ⚠️ Invalid spec JSON detected: ${candidates || "unknown"}. ${issue.reason}. Fix the malformed spec before continuing.\n`;
  }
  if (issue.error === "resolver_unavailable") {
    return `\n> ⚠️ Spec tollgate unavailable: ${issue.reason}. Repair the shared spec resolver before continuing.\n`;
  }
  return `\n> ⚠️ Explicit spec target unavailable: ${issue.reason}. Provide an exact target inside the configured specs root.\n`;
}

export const SpecState: Plugin = async ({ directory }) => ({
  "chat.message": async (input, output) => {
    try {
      const runtime = readRuntime(directory);
      const spec = runtime.spec as Record<string, unknown> | undefined;
      if (spec?.tollgate === false) return;

      const inputRecord = input as unknown as Record<string, unknown>;
      const outputRecord = output as unknown as { message?: { id?: string; sessionID?: string }; parts?: unknown[] };
      const resolved = resolveActiveSpec(directory, runtime, [inputRecord, outputRecord, outputRecord.message]);
      if (!resolved) return;
      if (isIssue(resolved)) {
        injectText(outputRecord, issueText(resolved));
        return;
      }

      const cacheKey = buildCacheKey(directory, resolved.featureName, resolved, inputRecord, outputRecord);
      const { stateKey, fullBlock, reminder } = buildTollgateText(resolved.featureName, resolved.spec, cacheKey);
      let lastKey = "";
      if (stateKey) {
        try {
          lastKey = readFileSync(CACHE_FILE, "utf8");
        } catch {
          lastKey = "";
        }
      }

      if (stateKey && lastKey === stateKey) {
        injectText(outputRecord, reminder);
        return;
      }

      if (stateKey) {
        try {
          mkdirSync(dirname(CACHE_FILE), { recursive: true });
          writeFileSync(CACHE_FILE, stateKey);
        } catch {
          // Cache persistence is optional; the full block remains truthful.
        }
      }
      injectText(outputRecord, fullBlock);
    } catch (error) {
      logCrash(error);
    }
  },
});

export default SpecState;
