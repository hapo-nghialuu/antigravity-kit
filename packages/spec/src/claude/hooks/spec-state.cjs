#!/usr/bin/env node
/**
 * Copyright (c) 2026 soft. MIT License.
 *
 * UserPromptSubmit Hook — spec-state.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Scans for an active spec in progress and dynamically injects
 * the State Sync (Tollgate) rule into the agent's context.
 *
 * Exit: 0 always; unavailable policy is surfaced as a controlled failure.
 */

const fs = require('fs');
const path = require('path');

function logCrash(error) {
  try {
    const d = path.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(
      path.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'spec-state', status: 'crash', error: error.message }) + '\n'
    );
  } catch (_) {}
}

function emitControlledFailure(reason) {
  console.log(`\n> ⚠️ Spec tollgate unavailable: ${reason}. Repair the installed workflow policy before continuing.\n`);
}

function sessionIdentity(payload) {
  const candidates = [
    payload && payload.session_id,
    payload && payload.sessionId,
    payload && payload.sessionID,
    payload && payload.session && payload.session.id,
  ];
  return candidates.find((value) => typeof value === 'string' && value.length > 0) || null;
}

function canonicalPath(value) {
  try { return fs.realpathSync(value); } catch { return null; }
}

try {
  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload = JSON.parse(stdin);
  const cwd     = payload.cwd || process.cwd();

  let POLICY;
  let RESOLVER;
  let RECEIPT;
  try {
    POLICY = require(path.join(__dirname, '..', 'scripts', 'workflow-policy.cjs'));
    RESOLVER = require(path.join(__dirname, '..', 'scripts', 'spec-resolver.cjs'));
    RECEIPT = require(path.join(__dirname, '..', 'scripts', 'spec-receipt.cjs'));
    if (typeof POLICY.flashState !== 'function') throw new Error('shared workflow policy has no flashState function');
  } catch (error) {
    logCrash(error);
    emitControlledFailure(error.message);
    process.exit(0);
  }

  // Read runtime configuration if exists
  let runtime = {};
  try {
    const p = path.join(cwd, '.claude', 'runtime.json');
    if (fs.existsSync(p)) runtime = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch { /* ignore */ }

  // Reminder toggle — same key the OpenCode spec-state plugin honors.
  // (The Stop completion gate has its own toggle: spec.completion_gate.)
  if (runtime.spec && runtime.spec.tollgate === false) process.exit(0);

  const baseDir   = process.env.PROJECT_ROOT || cwd;
  const explicitFeature = payload.featureName || payload.feature || payload.explicitFeature || null;
  const explicitPath = payload.specPath || payload.spec_path || payload.featurePath || null;
  const resolved = RESOLVER.resolveActiveSpec({ projectRoot: baseDir, runtime, explicitFeature, explicitPath });

  if (!resolved) {
    process.exit(0); // No active spec, do nothing
  }

  if (resolved.error === 'multiple_active') {
    const candidates = resolved.candidates.join(', ');
    console.log(`\n> ⚠️ Multiple active specs detected: ${candidates}. Provide explicit feature target or resolve ambiguity. Tollgate paused.\n`);
    process.exit(0);
  }

  if (resolved.error === 'invalid_specs') {
    const cands = resolved.candidates.join(', ');
    console.log(`\n> ⚠️ Invalid spec JSON detected: ${cands}. ${resolved.reason}. Fix or remove malformed spec.json before continuing. Tollgate paused.\n`);
    process.exit(0);
  }

  if (resolved.error === 'explicit_not_found' || resolved.error === 'explicit_malformed') {
    const detail = resolved.reason || resolved.explicitFeature || resolved.explicitPath || 'unknown';
    console.log(`\n> ⚠️ Explicit spec target invalid (${resolved.error}): ${detail}. Provide a valid feature target inside configured specs root. Tollgate paused.\n`);
    process.exit(0);
  }

  if (resolved.error) {
    process.exit(0);
  }

  const activeSpec = resolved.spec;
  const featureName = resolved.featureName;
  const specsPath = resolved.specsDir;
  const runtimeContext = POLICY.deriveRuntimeContext({
    projectRoot: baseDir,
    specsRoot: specsPath,
    specFile: resolved.specFile || path.join(specsPath, featureName, 'spec.json'),
    featureName,
    runtimeSession: sessionIdentity(payload),
  });

  const phase = activeSpec.current_phase || activeSpec.phase || 'unknown';
  const taskRegistry = activeSpec.task_registry || {};
  const flashTasks = POLICY.flashState(taskRegistry);
  const taskEntries = Object.entries(taskRegistry);
  const taskCounts = taskEntries.reduce((acc, [, task]) => {
    const status = task?.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const taskStatusByPath = new Map(taskEntries.map(([taskPath, task]) => [taskPath, task?.status || 'pending']));
  const nextUnblocked = taskEntries.find(([, task]) => {
    const status = task?.status || 'pending';
    const deps = Array.isArray(task?.dependencies) ? task.dependencies : [];
    return status === 'pending' && deps.every((dep) => taskStatusByPath.get(dep) === 'done');
  });
  const featureDir = path.join(specsPath, featureName);
  const featureReceiptPresent = RECEIPT.safeRead(featureDir, 'feature-receipt.md').status === 'ok';

  // ── State-change gate: only emit the full tollgate when spec state changed ──
  // The cache is shared by installed hook copies, so its key must carry the
  // canonical project, complete session identity, and canonical spec identity.
  // If any identity is unavailable, skip caching and emit the full block.
  const stateKey = JSON.stringify({
    projectRoot: runtimeContext.project_root,
    specsRoot: runtimeContext.specs_root,
    specFile: runtimeContext.spec_file,
    featureName: runtimeContext.feature_name,
    runtimeSession: runtimeContext.runtime_session,
    provenanceMode: runtimeContext.provenance_mode,
    Base: runtimeContext.base,
    Head: runtimeContext.head,
    contextId: runtimeContext.context_id,
    phase,
    done: taskCounts.done || 0,
    total: taskEntries.length,
    featureReceiptPresent,
  });
  const cacheFile = path.join(__dirname, '.logs', 'tollgate-last.txt');

  let lastKey = '';
  if (stateKey) {
    try { lastKey = fs.readFileSync(cacheFile, 'utf8'); } catch { /* first run */ }
  }

  if (stateKey && lastKey === stateKey) {
    console.log(`\n> 🔵 Spec \`${featureName}\` @ \`${phase}\` (${taskCounts.done || 0}/${taskEntries.length} tasks done). Tollgate active — sync \`spec.json\` when state changes.\n`);
    process.exit(0);
  }

  try {
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
    if (stateKey) fs.writeFileSync(cacheFile, stateKey);
  } catch { /* cache failure only disables reminder compression */ }

  // Compact state-change block (enforcement lives on Stop via spec-gate.cjs).
  const lines = [];
  lines.push('');
  lines.push(`### Spec state changed: \`${featureName}\``);
  lines.push(`- Phase: \`${phase}\` | Tasks: ${(taskCounts.done || 0)} done / ${taskEntries.length} total` +
    (taskEntries.length > 0
      ? ` (${(taskCounts.in_progress || 0)} in_progress, ${(taskCounts.pending || 0)} pending, ${(taskCounts.blocked || 0)} blocked)`
      : ''));
  if (nextUnblocked) {
    lines.push(`- Next unblocked: \`${nextUnblocked[0]}\``);
  }
  if (flashTasks.length > 0) {
    lines.push(`- Flash verification pending: ${flashTasks.map((taskPath) => `\`${taskPath}\``).join(', ')}. A PASS proof keeps the persisted task in_progress until explicit sync-finalize.`);
  }
  lines.push(`- Sync \`spec.json\` + task Markdown status after verified work; task proof belongs in \`receipts/<task-basename>.md\`.`);
  lines.push(`- Create \`feature-receipt.md\` once after final integration proof${featureReceiptPresent ? ' (present)' : ' (not required before closeout)'}.`);
  lines.push(`- Validate with \`node .claude/scripts/validate-spec-output.cjs specs/${featureName}\`; hooks revalidate receipt bytes but never grant approval.`);
  lines.push('');

  console.log(lines.join('\n'));
  process.exit(0);

} catch (e) {
  logCrash(e);
  emitControlledFailure(e.message);
  process.exit(0);
}
