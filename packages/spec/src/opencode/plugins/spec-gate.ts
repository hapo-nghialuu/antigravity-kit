/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — spec-gate.ts
 *
 * Advisory port of .claude/hooks/spec-gate.cjs and .codex/hooks/spec-gate.cjs.
 *
 * OpenCode has no Stop-hook equivalent that can hard-block a turn end.
 * This plugin provides a best-effort advisory gate:
 * - On tool.execute.after for writes to specs/<feature>/spec.json or task markdown, re-validate
 *   any newly-done task receipts (Verification: PASS, Command, Exit, provenance, completed_at).
 * - On session.idle (≈ Claude Stop), run the same check and surface a banner + stderr warning.
 *
 * It never throws to break the turn (fail-open). Disable via `.opencode/runtime.json`
 * `{ "spec": { "completion_gate": false } }`. Missing key keeps the advisory gate ON.
 * This is tier-2 compared to Claude/Codex hard gates — docs must not claim parity.
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
import { join, dirname, relative, resolve, sep, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const SPEC_GATE_BANNER_START = "<!-- CAFEKIT SPEC-GATE START -->";
const SPEC_GATE_BANNER_END = "<!-- CAFEKIT SPEC-GATE END -->";

type TaskEntry = {
  status?: string;
  completed_at?: string;
  receipt?: string;
};

type SpecJson = {
  status?: string;
  current_phase?: string;
  phase?: string;
  task_registry?: Record<string, TaskEntry>;
};

const EVIDENCE_NAMES = ["Evidence", "Task Test Plan & Verification Evidence", "Verification & Evidence"];
const PASS_MARKER = /^\s*Verification:\s*PASS\s*$/m;
const LEGACY_SUCCESS = /^\s*(?:PASS(?:ED)?|✓)(?:\s*:|$)|exit\s+code\s*[:=]?\s*0\b/im;
const EXPLICIT_FAILURE = /\bFAIL(?:ED|URE|URES|ING)?\b|tests?\s+failed|exit\s+code\s*[:=]?\s*[1-9]\d*|\b0\s+tests?\b/i;

function readRuntime(cwd: string): Record<string, any> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function evidenceBody(text: string): string | null {
  const lines = text.split("\n");
  let start = -1;
  let level = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m && EVIDENCE_NAMES.includes(m[2])) {
      start = i + 1;
      level = m[1].length;
      break;
    }
  }
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    const hm = lines[i].match(/^(#{1,6})\s+/);
    if (hm && hm[1].length <= level) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function validateCanonicalReceipt(body: string): string[] {
  const fails: string[] = [];
  if (!/^\s*Verification:\s*PASS\s*$/m.test(body)) fails.push("verification_state");
  if (!/^\s*Command(?:\(s\))?\s*:/m.test(body)) fails.push("command");
  if (!/^\s*Exit\s*:|exit\s+code\s*[:=]|\bResult\s*:\s*PASS\b/im.test(body)) fails.push("exit_result");
  const hasBase = /^\s*Base\s*:[ \t]*\S/im.test(body);
  const hasHead = /^\s*Head\s*:[ \t]*\S/im.test(body);
  const hasBaseSha = /\bbase_sha\s*:[ \t]*\S/im.test(body);
  const hasHeadSha = /\bhead_sha\s*:[ \t]*\S/im.test(body);
  if (!((hasBase && hasHead) || (hasBaseSha && hasHeadSha))) fails.push("provenance");
  if (/\bartifact\b/i.test(body) && !/sha256:/i.test(body)) fails.push("artifact_hash");
  return fails;
}

function checkReceipt(featureDir: string, taskPath: string, task: TaskEntry): string[] {
  const fails: string[] = [];
  const abs = resolve(join(featureDir, taskPath));
  const resolvedFeatureDir = resolve(featureDir);
  const rel = relative(resolvedFeatureDir, abs);
  // prevent path traversal: taskPath must stay inside featureDir (cross-platform sibling-prefix safe)
  if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return ["a"];
  if (!existsSync(abs)) return ["a"];
  let text: string;
  try {
    text = readFileSync(abs, "utf8");
  } catch {
    return ["a"];
  }
  const statusLine = text.split("\n").find((l) => /^\s*(?:\*\*)?Status(?:\*\*)?\s*:/i.test(l));
  if (!statusLine || !/\bdone\b/i.test(statusLine)) fails.push("a");
  const body = evidenceBody(text);
  if (body === null) {
    fails.push("b");
  } else if (/\{\{[^}]+\}\}/.test(body) || EXPLICIT_FAILURE.test(body) || !(PASS_MARKER.test(body) || LEGACY_SUCCESS.test(body))) {
    fails.push("c");
  } else {
    const canonical = validateCanonicalReceipt(body);
    const map: Record<string, string> = { verification_state: "c", command: "e", exit_result: "f", provenance: "g", artifact_hash: "h" };
    for (const f of canonical) {
      if (f === "verification_state") {
        if (!PASS_MARKER.test(body) && !fails.includes("c")) fails.push("c");
        continue;
      }
      const letter = map[f];
      if (letter && !fails.includes(letter)) fails.push(letter);
    }
    if (!PASS_MARKER.test(body) && !fails.includes("c")) fails.push("c");
  }
  const at = task?.completed_at;
  if (typeof at !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(at) || Number.isNaN(Date.parse(at))) fails.push("d");
  return fails;
}

function findActiveSpec(specsPath: string): { featureName: string; spec: SpecJson; specsDir: string; featureDir: string } | null {
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
      const data = JSON.parse(readFileSync(specFile, "utf8")) as SpecJson;
      if (data.status === "in_progress" || data.status === "in-progress") {
        return { featureName: entry.name, spec: data, specsDir: specsPath, featureDir: join(specsPath, entry.name) };
      }
    } catch {
      // skip bad json
    }
  }
  return null;
}

function isStaleFlashDone(task: TaskEntry): boolean {
  return task?.status === "done" && task.receipt === "FLASH_UNVERIFIED";
}

function collectFailures(cwd: string): { featureName: string; failures: { taskPath: string; fails: string[] }[] } | null {
  const runtime = readRuntime(cwd);
  if (runtime.spec && runtime.spec.completion_gate === false) return null;
  const specsPath = join(cwd, runtime.paths?.specs || "specs");
  const active = findActiveSpec(specsPath);
  if (!active) return null;
  const registry = active.spec.task_registry || {};
  const staleFlash = Object.entries(registry).filter(([, t]) => isStaleFlashDone(t as TaskEntry));
  if (staleFlash.length > 0) {
    return {
      featureName: active.featureName,
      failures: staleFlash.map(([p]) => ({ taskPath: p, fails: ["flash"] })),
    };
  }
  // Check every done task (advisory — we have no cache to know newly-done, so check all)
  const failures: { taskPath: string; fails: string[] }[] = [];
  for (const [taskPath, task] of Object.entries(registry)) {
    if ((task as TaskEntry)?.status !== "done") continue;
    const fails = checkReceipt(active.featureDir, taskPath, task as TaskEntry);
    if (fails.length > 0) failures.push({ taskPath, fails });
  }
  if (failures.length === 0) return null;
  return { featureName: active.featureName, failures };
}

function formatReason(featureName: string, failures: { taskPath: string; fails: string[] }[]): string {
  const flashOnly = failures.length === 1 && failures[0].fails.includes("flash");
  if (flashOnly) {
    return `Completion gate (advisory): 1 task(s) marked done with FLASH_UNVERIFIED (${failures[0].taskPath}). Run /hapo:test for exact proof, then use explicit sync-finalize.`;
  }
  const lines = [`⚠️ Completion gate (advisory): ${failures.length} done task(s) lack a verification receipt.`];
  for (const { taskPath, fails } of failures) {
    if (fails.includes("flash")) {
      lines.push(`- \`${taskPath}\`: FLASH_UNVERIFIED`);
    } else {
      lines.push(`- \`${taskPath}\`: failed check(s) ${fails.join(", ")}`);
    }
  }
  return lines.slice(0, 8).join("\n");
}

function writeBanner(cwd: string, reason: string | null): void {
  try {
    const file = join(cwd, ".opencode", "session-banner.md");
    const dir = dirname(file);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    let existing = "";
    try {
      existing = existsSync(file) ? readFileSync(file, "utf8") : "";
    } catch {
      existing = "";
    }
    const pattern = new RegExp(`${SPEC_GATE_BANNER_START}[\\s\\S]*?${SPEC_GATE_BANNER_END}\\n?`);
    const cleaned = existing.replace(pattern, "").trimEnd();
    if (!reason) {
      if (cleaned !== existing.trimEnd()) writeFileSync(file, cleaned ? `${cleaned}\n` : "");
      return;
    }
    const block = [SPEC_GATE_BANNER_START, reason, SPEC_GATE_BANNER_END].join("\n");
    const next = cleaned ? `${cleaned}\n\n${block}\n` : `${block}\n`;
    writeFileSync(file, next);
  } catch {
    // fail-open
  }
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      JSON.stringify({ ts: new Date().toISOString(), hook: "spec-gate", status: "crash", error: error instanceof Error ? error.message : String(error) }) + "\n",
    );
  } catch {
    // fail-open
  }
}

const RELEVANT_TOOLS = new Set(["edit", "write", "apply_patch", "task", "taskcreate", "taskupdate", "todowrite"]);

export const SpecGate: Plugin = async ({ directory }) => ({
  event: async ({ event }) => {
    try {
      if (event.type === "session.idle") {
        const result = collectFailures(directory);
        if (result) {
          const reason = formatReason(result.featureName, result.failures);
          writeBanner(directory, reason);
          console.error(reason);
        } else {
          writeBanner(directory, null);
        }
      }
    } catch (error) {
      logCrash(error);
    }
  },
  "tool.execute.after": async (input) => {
    try {
      if (!RELEVANT_TOOLS.has(input.tool)) return;
      const result = collectFailures(directory);
      if (result) {
        const reason = formatReason(result.featureName, result.failures);
        writeBanner(directory, reason);
        console.error(`[spec-gate advisory] ${reason}`);
      } else {
        // clear banner if no failures after a relevant tool
        // (keep banner if failures still exist from other tasks — collectFailures already handles)
      }
    } catch (error) {
      logCrash(error);
    }
  },
});

export default SpecGate;
