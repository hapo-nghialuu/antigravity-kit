/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — spec-gate.ts
 *
 * OpenCode exposes a cancellable `tool.execute.before` hook, so completion
 * related state tools can be hard-blocked with a controlled error. It does
 * not expose a cancellable Stop/session.idle hook: a final assistant message
 * without a guarded tool call is therefore outside this adapter's boundary.
 * The plugin never presents that observer event as Claude/Codex parity.
 *
 * Receipt validation and active-spec resolution are loaded from the installed
 * shared executable authorities. Missing or malformed authorities are a
 * blocked/unavailable result; this adapter never invents a local PASS.
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
import { join, dirname, relative, resolve, sep, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const SPEC_GATE_BANNER_START = "<!-- CAFEKIT SPEC-GATE START -->";
const SPEC_GATE_BANNER_END = "<!-- CAFEKIT SPEC-GATE END -->";
const BLOCK_CODE = "CAFEKIT_SPEC_GATE_BLOCKED";
const SHARED_POLICY_FILE = "workflow-policy.cjs";
const SHARED_RESOLVER_FILE = "spec-resolver.cjs";

type TaskEntry = {
  status?: string;
  completed_at?: string;
  receipt?: string;
  artifacts?: string[];
};

type SpecJson = {
  status?: string;
  current_phase?: string;
  phase?: string;
  task_registry?: Record<string, TaskEntry>;
};

type ActiveSpec = {
  featureName: string;
  spec: SpecJson;
  specsDir: string;
  featureDir: string;
  specFile: string;
};

type SharedModule = {
  policy: any | null;
  resolver: any | null;
  error: Error | null;
  path: string;
};

type GateMultiple = {
  error: "multiple_active";
  candidates: string[];
  reason: string;
  taskPath: string;
};

type GateInvalid = {
  error: "invalid_specs";
  candidates: string[];
  reason: string;
  taskPath: string;
};

type GateExplicit = {
  error: "explicit_not_found" | "explicit_malformed";
  reason: string;
  taskPath: string;
};

type GateUnavailable = {
  error: "validator_unavailable" | "resolver_unavailable";
  reason: string;
  taskPath: string;
};

type GateFailures = {
  featureName: string;
  failures: { taskPath: string; fails: string[] }[];
};

type CollectResult = GateFailures | GateMultiple | GateInvalid | GateExplicit | GateUnavailable | null;

const EVIDENCE_NAMES = ["Evidence", "Task Test Plan & Verification Evidence", "Verification & Evidence"];
const GATED_TOOLS = new Set(["edit", "write", "apply_patch", "task", "taskupdate", "todowrite"]);
const HARD_BLOCK_TOOLS = new Set(["task", "taskupdate", "todowrite"]);

function loadSharedModule(kind: "policy" | "resolver"): SharedModule {
  const authorityFile = kind === "policy" ? SHARED_POLICY_FILE : SHARED_RESOLVER_FILE;
  const relativePath = `../scripts/${authorityFile}`;
  const sourcePath = `../../claude/scripts/${authorityFile}`;
  const installed = join(PLUGIN_DIR, relativePath);
  const source = join(PLUGIN_DIR, sourcePath);
  // Prefer the installed authority. If it exists but cannot load, do not
  // silently substitute another copy with potentially different semantics.
  const candidate = existsSync(installed) ? installed : source;
  try {
    const module = require(candidate);
    const requiredExport = kind === "policy" ? "validateCanonicalReceipt" : "resolveActiveSpec";
    if (!module || typeof module[requiredExport] !== "function") {
      throw new Error(`shared ${kind} has no ${requiredExport} function`);
    }
    return {
      policy: kind === "policy" ? module : null,
      resolver: kind === "resolver" ? module : null,
      error: null,
      path: candidate,
    };
  } catch (error) {
    return {
      policy: null,
      resolver: null,
      error: error instanceof Error ? error : new Error(String(error)),
      path: candidate,
    };
  }
}

function loadSharedPolicy(): { policy: any | null; error: Error; path: string } {
  const loaded = loadSharedModule("policy");
  return {
    policy: loaded.policy,
    error: loaded.error || new Error("shared workflow policy is unavailable"),
    path: loaded.path,
  };
}

function getSharedPolicy(): any | null {
  return loadSharedPolicy().policy;
}

function getSharedValidate(): ((body: string, options?: any) => string[]) | null {
  const shared = loadSharedPolicy().policy;
  return shared && typeof shared.validateCanonicalReceipt === "function"
    ? shared.validateCanonicalReceipt
    : null;
}

function isTapMetadataHeading(line: string): boolean {
  const shared = getSharedPolicy();
  return Boolean(shared && typeof shared.isTapMetadataHeading === "function" && shared.isTapMetadataHeading(line));
}

function readRuntime(cwd: string): Record<string, unknown> {
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
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,3})\s+(.+?)\s*$/);
    if (match && EVIDENCE_NAMES.includes(match[2])) {
      start = index + 1;
      level = match[1].length;
      break;
    }
  }
  if (start < 0) return null;
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,6})\s+/);
    if (heading && heading[1].length <= level && !isTapMetadataHeading(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function validateCanonicalReceipt(body: string, options?: any): string[] {
  const shared = getSharedValidate();
  return shared ? shared(body, options) : ["shared_validator"];
}

function checkReceipt(featureDir: string, taskPath: string, task: TaskEntry, policy: any): string[] {
  const fails: string[] = [];
  const resolvedFeatureDir = resolve(featureDir);
  const abs = resolve(featureDir, taskPath);
  const rel = relative(resolvedFeatureDir, abs);
  if (rel === "" || rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return ["a"];
  if (!existsSync(abs)) return ["a"];
  try {
    const canonicalFeature = realpathSync(resolvedFeatureDir);
    const canonicalTarget = realpathSync(abs);
    const canonicalRelative = relative(canonicalFeature, canonicalTarget);
    if (canonicalRelative === "" || canonicalRelative === ".." || canonicalRelative.startsWith(`..${sep}`) || isAbsolute(canonicalRelative)) return ["a"];
  } catch {
    return ["a"];
  }

  let text: string;
  try {
    text = readFileSync(abs, "utf8");
  } catch {
    return ["a"];
  }
  const statusLine = text.split("\n").find((line) => /^\s*(?:\*\*)?Status(?:\*\*)?\s*:/i.test(line));
  if (!statusLine || !/\bdone\b/i.test(statusLine)) fails.push("a");

  const body = evidenceBody(text);
  if (body === null) {
    fails.push("b");
  } else {
    const options = typeof policy?.receiptValidatorOptions === "function"
      ? policy.receiptValidatorOptions(task)
      : {};
    const canonical = validateCanonicalReceipt(body, options);
    const map: Record<string, string> = {
      verification_state: "c",
      command: "e",
      exit_result: "f",
      provenance: "g",
      artifact_hash: "h",
      artifact_declaration: "h",
      placeholder: "c",
      shared_validator: "c",
      validator_unavailable: "c",
    };
    for (const failure of canonical) {
      const letter = map[failure];
      if (letter && !fails.includes(letter)) fails.push(letter);
    }
  }

  const completedAt = task?.completed_at;
  if (typeof completedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(completedAt) || Number.isNaN(Date.parse(completedAt))) {
    fails.push("d");
  }
  return fails;
}

function resolverUnavailable(loaded: SharedModule): GateUnavailable {
  return {
    error: "resolver_unavailable",
    reason: `${loaded.error?.message || "shared spec resolver is unavailable"} (${loaded.path})`,
    taskPath: "shared spec resolver",
  };
}

function collectFailures(cwd: string, targetSources: unknown[] = []): CollectResult {
  const runtime = readRuntime(cwd);
  if (runtime.spec && (runtime.spec as Record<string, unknown>).completion_gate === false) return null;

  const resolverLoaded = loadSharedModule("resolver");
  if (!resolverLoaded.resolver) return resolverUnavailable(resolverLoaded);

  const resolver = resolverLoaded.resolver;
  const target = typeof resolver.extractExplicitTarget === "function"
    ? resolver.extractExplicitTarget(...targetSources)
    : null;
  let resolved: any;
  try {
    resolved = resolver.resolveActiveSpec({ projectRoot: cwd, runtime, ...(target || {}) });
  } catch (error) {
    return {
      error: "resolver_unavailable",
      reason: `${error instanceof Error ? error.message : String(error)} (${resolverLoaded.path})`,
      taskPath: "shared spec resolver",
    };
  }
  if (!resolved) return null;
  if (resolved.error === "multiple_active") {
    return { error: "multiple_active", candidates: resolved.candidates, reason: resolved.reason, taskPath: `specs (${resolved.candidates.join(", ")})` };
  }
  if (resolved.error === "invalid_specs") {
    return { error: "invalid_specs", candidates: resolved.candidates, reason: resolved.reason, taskPath: `specs (${resolved.candidates.join(", ")})` };
  }
  if (resolved.error === "explicit_not_found" || resolved.error === "explicit_malformed") {
    return { error: resolved.error, reason: resolved.reason || "explicit target is invalid", taskPath: "explicit spec target" };
  }
  if (resolved.error) {
    return { error: "resolver_unavailable", reason: `${resolved.error}: ${resolved.reason || "resolution failed"}`, taskPath: "shared spec resolver" };
  }

  const policyLoaded = loadSharedPolicy();
  if (!policyLoaded.policy) {
    return {
      error: "validator_unavailable",
      reason: `${policyLoaded.error.message} (${policyLoaded.path})`,
      taskPath: "shared workflow policy",
    };
  }

  const active = resolved as ActiveSpec;
  const registry = active.spec.task_registry || {};
  const staleFlash = Object.entries(registry).filter(([, task]) => task?.status === "done" && task.receipt === "FLASH_UNVERIFIED");
  if (staleFlash.length > 0) {
    return {
      featureName: active.featureName,
      failures: staleFlash.map(([taskPath]) => ({ taskPath, fails: ["flash"] })),
    };
  }

  const failures: { taskPath: string; fails: string[] }[] = [];
  for (const [taskPath, task] of Object.entries(registry)) {
    if (task?.status !== "done") continue;
    const fails = checkReceipt(active.featureDir, taskPath, task, policyLoaded.policy);
    if (fails.length > 0) failures.push({ taskPath, fails });
  }
  return failures.length > 0 ? { featureName: active.featureName, failures } : null;
}

function formatReason(result: CollectResult): string {
  if (!result) return "";
  const targetHint = "Provide `featureName`/`feature` or `specPath`/`featurePath` in the host tool input; do not rely on first-directory selection.";
  if (result.error === "multiple_active") {
    return `Completion gate blocked: multiple active specs detected (${result.candidates.join(", ")}). ${targetHint}`;
  }
  if (result.error === "invalid_specs") {
    return `Completion gate blocked: invalid spec JSON detected (${result.candidates.join(", ")}): ${result.reason}. Repair the malformed spec before completing tasks.`;
  }
  if (result.error === "explicit_not_found" || result.error === "explicit_malformed") {
    return `Completion gate blocked: explicit spec target is invalid: ${result.reason}. ${targetHint}`;
  }
  if (result.error === "validator_unavailable" || result.error === "resolver_unavailable") {
    return `Completion gate blocked: ${result.error}: ${result.reason}. Repair the shared authority before completing tasks.`;
  }
  const flashOnly = result.failures.length === 1 && result.failures[0].fails.includes("flash");
  if (flashOnly) {
    return `Completion gate blocked: feature ${result.featureName}; task ${result.failures[0].taskPath} is FLASH_UNVERIFIED. Run /hapo:test for exact proof, then use explicit sync-finalize.`;
  }
  const lines = [`Completion gate blocked: feature ${result.featureName}; ${result.failures.length} done task(s) lack valid verification evidence.`];
  for (const { taskPath, fails } of result.failures) {
    lines.push(`- \`${taskPath}\`: failed check(s) ${fails.join(", ")}`);
  }
  return lines.slice(0, 8).join("\n");
}

function createBlockError(result: CollectResult): Error {
  const reason = formatReason(result);
  const error = new Error(`[${BLOCK_CODE}]\n${reason}`) as Error & { code?: string; result?: unknown };
  error.name = "CafeKitSpecGateBlocked";
  error.code = BLOCK_CODE;
  error.result = { decision: "block", reason };
  return error;
}

function isControlledBlock(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && (error as { code?: string }).code === BLOCK_CODE);
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
    writeFileSync(file, cleaned ? `${cleaned}\n\n${block}\n` : `${block}\n`);
  } catch {
    // Banner persistence is secondary to the before-hook decision.
  }
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      `${JSON.stringify({ ts: new Date().toISOString(), hook: "spec-gate", status: "crash", error: error instanceof Error ? error.message : String(error) })}\n`,
    );
  } catch {
    // Logging errors are intentionally ignored.
  }
}

export const SpecGate: Plugin = async ({ directory }) => ({
  event: async ({ event }) => {
    try {
      if (event.type !== "session.idle") return;
      const eventRecord = event as unknown as Record<string, unknown>;
      const properties = eventRecord.properties as Record<string, unknown> | undefined;
      const result = collectFailures(directory, [eventRecord, properties]);
      if (result) {
        const reason = formatReason(result);
        writeBanner(directory, reason);
        console.error(`[spec-gate] ${reason}`);
      } else {
        writeBanner(directory, null);
      }
    } catch (error) {
      logCrash(error);
    }
  },

  // OpenCode's documented cancellation boundary is before tool execution.
  // Throwing here aborts the guarded completion/state tool call.
  "tool.execute.before": async (input, output) => {
    try {
      if (!GATED_TOOLS.has(input.tool)) return;
      const result = collectFailures(directory, [input, (output as { args?: unknown })?.args]);
      if (!result) return;
      const reason = formatReason(result);
      writeBanner(directory, reason);
      if (HARD_BLOCK_TOOLS.has(input.tool)) throw createBlockError(result);
      console.error(`[spec-gate] ${reason}`);
    } catch (error) {
      if (isControlledBlock(error)) throw error;
      logCrash(error);
    }
  },

  // After-hook output is observational only; the tool has already run.
  "tool.execute.after": async (input) => {
    try {
      if (!GATED_TOOLS.has(input.tool)) return;
      const result = collectFailures(directory, [input, (input as { args?: unknown }).args]);
      if (result) {
        const reason = formatReason(result);
        writeBanner(directory, reason);
        console.error(`[spec-gate] ${reason}`);
      } else {
        writeBanner(directory, null);
      }
    } catch (error) {
      logCrash(error);
    }
  },
});

export default SpecGate;
