/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — spec-state.ts
 *
 * Port of .claude/hooks/spec-state.cjs to OpenCode plugin protocol.
 *
 * Behavior:
 * - On chat.message (before the model processes the user turn), scan
 *   project specs dirs for the first in_progress / in-progress spec.json.
 * - Inject a tollgate reminder into the turn by pushing a text part onto
 *   output.parts (OpenCode equivalent of Claude UserPromptSubmit stdout inject).
 * - State-change gate: fingerprint phase|done/total in plugins/.logs/tollgate-last.txt;
 *   unchanged -> one-line reminder; changed -> full URGENT block + refresh fingerprint.
 *
 * Disable via `.opencode/runtime.json` { "spec": { "tollgate": false } }.
 * Fail-open: never throw — a tollgate crash must not break the turn.
 */

import type { Plugin } from "@opencode-ai/plugin";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  appendFileSync,
  readdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = join(PLUGIN_DIR, ".logs", "tollgate-last.txt");

type SpecJson = {
  status?: string;
  current_phase?: string;
  phase?: string;
  task_registry?: Record<
    string,
    {
      status?: string;
      dependencies?: string[];
    }
  >;
};

function readRuntime(cwd: string): Record<string, unknown> {
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
        hook: "spec-state",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

function findActiveSpec(
  specsPath: string,
): { featureName: string; activeSpec: SpecJson } | null {
  if (!existsSync(specsPath)) return null;

  let entries;
  try {
    entries = readdirSync(specsPath, { withFileTypes: true });
  } catch {
    return null;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const specFile = join(specsPath, entry.name, "spec.json");
    if (!existsSync(specFile)) continue;
    try {
      const specData = JSON.parse(readFileSync(specFile, "utf8")) as SpecJson;
      if (specData.status === "in_progress" || specData.status === "in-progress") {
        return { featureName: entry.name, activeSpec: specData };
      }
    } catch {
      // skip bad JSON
    }
  }
  return null;
}

function buildTollgateText(
  featureName: string,
  activeSpec: SpecJson,
): { stateKey: string; fullBlock: string; reminder: string } {
  const phase = activeSpec.current_phase || activeSpec.phase || "unknown";
  const taskRegistry = activeSpec.task_registry || {};
  const taskEntries = Object.entries(taskRegistry);
  const taskCounts = taskEntries.reduce<Record<string, number>>((acc, [, task]) => {
    const status = task?.status || "pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const taskStatusByPath = new Map(
    taskEntries.map(([taskPath, task]) => [taskPath, task?.status || "pending"]),
  );
  const nextUnblocked = taskEntries.find(([, task]) => {
    const status = task?.status || "pending";
    const deps = Array.isArray(task?.dependencies) ? task.dependencies : [];
    return status === "pending" && deps.every((dep) => taskStatusByPath.get(dep) === "done");
  });

  const done = taskCounts.done || 0;
  const total = taskEntries.length;
  const stateKey = `${phase}|${done}/${total}`;

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
    if (nextUnblocked) {
      lines.push(`- **Next Unblocked Task:** \`${nextUnblocked[0]}\``);
    }
  }
  lines.push("");
  lines.push(
    "> BẮT BUỘC (MANDATORY): Nếu bạn vừa hoàn thành một bước, bạn KHÔNG ĐƯỢC báo cáo \"Đã xong\" ngay.",
  );
  lines.push(
    "> Bạn PHẢI sử dụng công cụ Edit để cập nhật trạng thái vật lý sau khi đã có bằng chứng verify thật (build/test/runtime/artifact), không phải chỉ vì code đã viết xong.",
  );
  lines.push(
    "> 1. Sửa file `spec.json` (status, phase/current_phase, timestamps, `task_files`, `task_registry`, validation state nếu có thay đổi).",
  );
  lines.push(
    "> 2. Chỉ khi verify xong mới sửa file `tasks/task-*.md` (status + tick '[x]' các sub-task và completion criteria liên quan).",
  );
  lines.push(
    `> 3. Trước khi set \`ready_for_implementation = true\`, PHẢI chạy \`node .opencode/scripts/validate-spec-output.cjs specs/${featureName}\` và sửa mọi lỗi.`,
  );
  lines.push(
    "> 4. NẾU VỪA HOÀN THÀNH 1 TASK CÓ SỬA SOURCE CODE, BẮT BUỘC cập nhật ngay tài liệu trong `docs/` (`system-architecture.md` hoặc Changelog) cho đồng bộ.",
  );
  lines.push(
    "> CẤM VI PHẠM LUẬT TOLLGATE NÀY NHẰM ĐẢM BẢO TÍNH ĐỒNG BỘ CỦA HỆ THỐNG.",
  );
  lines.push("");

  return { stateKey, fullBlock: lines.join("\n"), reminder };
}

type MessageRef = { id?: string; sessionID?: string };

function injectText(
  output: { message?: MessageRef; parts?: unknown[] },
  text: string,
): void {
  // OpenCode persists user parts and validates their schema: a part MUST carry
  // id + sessionID + messageID or the whole turn fails with
  // "invalid user part before save" (verified on opencode 1.17.15).
  const message = output.message ?? {};
  if (!Array.isArray(output.parts)) {
    (output as { parts: unknown[] }).parts = [];
  }
  output.parts!.push({
    id: `prt_ck${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
    sessionID: message.sessionID ?? "",
    messageID: message.id ?? "",
    type: "text",
    text,
    synthetic: true,
  });
}

export const SpecState: Plugin = async ({ directory }) => ({
  "chat.message": async (_input, output) => {
    try {
      const runtime = readRuntime(directory);
      const spec = runtime.spec as Record<string, unknown> | undefined;
      if (spec?.tollgate === false) return;

      const paths = runtime.paths as Record<string, unknown> | undefined;
      const specsRel =
        typeof paths?.specs === "string" && paths.specs.trim()
          ? paths.specs.trim()
          : "specs";
      const specsPath = join(directory, specsRel);

      const found = findActiveSpec(specsPath);
      if (!found) return;

      const { featureName, activeSpec } = found;
      const { stateKey, fullBlock, reminder } = buildTollgateText(
        featureName,
        activeSpec,
      );

      let lastKey = "";
      try {
        lastKey = readFileSync(CACHE_FILE, "utf8").trim();
      } catch {
        // first run
      }

      if (lastKey === stateKey) {
        injectText(output as { message?: MessageRef; parts?: unknown[] }, reminder);
        return;
      }

      try {
        mkdirSync(dirname(CACHE_FILE), { recursive: true });
        writeFileSync(CACHE_FILE, stateKey);
      } catch {
        // fail-open: still inject full block
      }

      injectText(output as { message?: MessageRef; parts?: unknown[] }, fullBlock);
    } catch (error) {
      logCrash(error);
      // never throw — tollgate must not break the turn
    }
  },
});
