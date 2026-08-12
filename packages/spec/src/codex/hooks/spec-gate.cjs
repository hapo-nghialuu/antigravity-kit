#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const {
  atomicWrite,
  getHookContext,
  logCrash,
  readPayload
} = require('./lib/hook-context.cjs');
const { checkReceipt, evidenceBody, loadSharedPolicy } = require('./lib/spec-receipt.cjs');
const { taskStatusMap } = require('./lib/spec-utils.cjs');

function emitBlock(reason) {
  process.stdout.write(`${JSON.stringify({ decision: 'block', reason })}\n`);
}

function sessionIdentity(payload) {
  const candidates = [
    payload && payload.session_id,
    payload && payload.sessionId,
    payload && payload.sessionID,
    payload && payload.session && payload.session.id,
  ];
  return candidates.find((value) => typeof value === 'string' && value.trim() !== '') || null;
}

function readReceiptBody(featureDir, taskPath) {
  const featureRoot = path.resolve(featureDir);
  const target = path.resolve(featureRoot, taskPath);
  const relative = path.relative(featureRoot, target);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
  try {
    const canonicalFeature = fs.realpathSync(featureRoot);
    const canonicalTarget = fs.realpathSync(target);
    const canonicalRelative = path.relative(canonicalFeature, canonicalTarget);
    if (canonicalRelative === '..' || canonicalRelative.startsWith(`..${path.sep}`) || path.isAbsolute(canonicalRelative)) return null;
    return evidenceBody(fs.readFileSync(canonicalTarget, 'utf8'));
  } catch (_) {
    return null;
  }
}

try {
  const payload = readPayload();
  if (payload.stop_hook_active === true) process.exit(0);
  const loaded = loadSharedPolicy();
  if (!loaded.policy) {
    logCrash('spec-gate', loaded.error);
    emitBlock(`Completion gate unavailable: shared workflow policy could not be loaded (${loaded.error.message}). Repair ${loaded.path} before completing tasks.`);
    process.exit(0);
  }
  const POLICY = loaded.policy;
  const { projectRoot, runtime } = getHookContext(payload);
  if (typeof POLICY.completionDecisionForSpec !== 'function') {
    throw new Error('shared workflow policy lacks completion authority functions');
  }
  const explicitFeature = payload.featureName || payload.feature || payload.explicitFeature || null;
  const explicitPath = payload.specPath || payload.spec_path || payload.featurePath || null;
  const { resolveActiveSpec } = require('./lib/spec-utils.cjs');
  const resolved = resolveActiveSpec(projectRoot, runtime, explicitFeature, explicitPath);
  if (!resolved) process.exit(0);
  if (resolved.error === 'multiple_active') {
    process.stdout.write(`${JSON.stringify({
      decision: 'block',
      reason: `Completion gate: multiple active specs detected (${resolved.candidates.join(', ')}). Provide explicit feature target or resolve ambiguity before completing tasks.`
    })}\n`);
    process.exit(0);
  }
  if (resolved.error === 'invalid_specs') {
    process.stdout.write(`${JSON.stringify({
      decision: 'block',
      reason: `Completion gate: invalid spec JSON detected (${resolved.candidates.join(', ')}): ${resolved.reason}. Fix or remove malformed spec.json before completing tasks.`
    })}\n`);
    process.exit(0);
  }
  if (resolved.error === 'explicit_not_found' || resolved.error === 'explicit_malformed') {
    process.stdout.write(`${JSON.stringify({
      decision: 'block',
      reason: `Completion gate: explicit spec target invalid (${resolved.error}): ${resolved.reason || resolved.explicitFeature || resolved.explicitPath || 'unknown'}. Provide a valid feature target inside configured specs root.`
    })}\n`);
    process.exit(0);
  }
  if (resolved.error) process.exit(0);
  const active = resolved;
  const runtimeContext = POLICY.deriveRuntimeContext({
    projectRoot,
    specsRoot: active.specsDir,
    specFile: active.specFile || path.join(active.specsDir, active.featureName, 'spec.json'),
    featureName: active.featureName,
    runtimeSession: sessionIdentity(payload),
  });
  const configuredGate = runtime.spec?.completion_gate;
  if (configuredGate !== undefined && configuredGate !== true) {
    emitBlock('Completion gate: runtime.spec.completion_gate is a worker-writable flag, not an authorization; no completion-gate bypass is supported. Remove the flag and satisfy the gate.');
    process.exit(0);
  }
  const registry = active.spec.task_registry || {};
  const currentStatuses = taskStatusMap(active.spec);
  const cacheFile = path.join(
    projectRoot,
    '.codex',
    'hooks',
    '.logs',
    'spec-gate-last.json'
  );
  const cacheExists = fs.existsSync(cacheFile);
  let cache = {};
  if (cacheExists) {
    try { cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8')); } catch { cache = {}; }
  }

  // Cache hardening: revalidate every done task on every Stop so a
  // cached PASS cannot hide later receipt/provenance mutations.
  // Cache is optimization only - validate every done task even on first run.
  const cacheIdentity = {
    project_root: runtimeContext.project_root,
    specs_root: runtimeContext.specs_root,
    spec_file: runtimeContext.spec_file,
    feature_name: runtimeContext.feature_name,
    runtime_session: runtimeContext.runtime_session,
    provenance_mode: runtimeContext.provenance_mode,
    Base: runtimeContext.base,
    Head: runtimeContext.head,
    context_id: runtimeContext.context_id,
  };
  const cacheEntries = cache && cache.entries && typeof cache.entries === 'object' ? cache.entries : {};
  const previous = cacheExists && cacheEntries[runtimeContext.context_id]
    ? cacheEntries[runtimeContext.context_id].tasks || {}
    : {};
  const staleFlashTasks = Object.entries(registry)
    .filter(([, task]) => POLICY.isStaleFlashDone(task))
    .map(([taskPath]) => taskPath);
  if (staleFlashTasks.length > 0) {
    process.stdout.write(`${JSON.stringify({
      decision: 'block',
      reason: `Completion gate: ${staleFlashTasks.length} task(s) marked done with FLASH_UNVERIFIED (${staleFlashTasks.join(', ')}). Run /hapo:test, then use explicit sync-finalize.`
    })}\n`);
    process.exit(0);
  }
  const allDoneTasks = Object.keys(registry).filter((taskPath) => (
    currentStatuses[taskPath] === 'done'
  ));
  const featureDir = path.join(active.specsDir, active.featureName);
  const receiptBodies = new Map();
  const failures = allDoneTasks
    .map((taskPath) => {
      const body = readReceiptBody(featureDir, taskPath);
      if (body !== null) receiptBodies.set(taskPath, body);
      return {
        taskPath,
        failures: checkReceipt(featureDir, taskPath, registry[taskPath], runtimeContext)
      };
    })
    .filter((result) => result.failures.length);

  const firstReceiptTask = allDoneTasks.find((taskPath) => receiptBodies.has(taskPath));
  const completion = allDoneTasks.length > 0 && Object.prototype.hasOwnProperty.call(active.spec, 'workflow_policy')
    ? POLICY.completionDecisionForSpec(active.spec, {
      runtimeContext,
      executionReceipt: firstReceiptTask ? receiptBodies.get(firstReceiptTask) : null,
      taskContext: firstReceiptTask ? registry[firstReceiptTask] : null,
    })
    : null;

  const next = { ...previous, ...currentStatuses };
  for (const result of failures) {
    if (previous[result.taskPath] === undefined) delete next[result.taskPath];
    else next[result.taskPath] = previous[result.taskPath];
  }
  atomicWrite(cacheFile, `${JSON.stringify({
    schema_version: '2',
    entries: { ...cacheEntries, [runtimeContext.context_id]: { identity: cacheIdentity, tasks: next } },
  })}\n`);

  const completionBlocked = completion && completion.completion !== 'complete' && completion.completion !== 'not_applicable';
  if (!failures.length && !completionBlocked) process.exit(0);
  const lines = [
    failures.length > 0
      ? `Completion gate: ${failures.length} newly-done task(s) lack a verification receipt.`
      : 'Completion gate: workflow completion proof is incomplete.'
  ];
  for (const result of failures) {
    lines.push(
      `- \`${result.taskPath}\`: failed check(s) ${result.failures.join(', ')}`,
      `  Add \`Verification: PASS\`, commands, and successful outcomes under \`## Evidence\` in \`specs/${active.featureName}/${result.taskPath}\`, then re-sync spec.json.`
    );
  }
  if (completionBlocked) {
    lines.push(`- Completion decision unfinished: ${completion.blocker || 'required workflow proof is missing.'}`);
    if (Array.isArray(completion.missingProof) && completion.missingProof.length > 0) {
      lines.push(`  Missing proof: ${completion.missingProof.join(', ')}`);
    }
  }
  process.stdout.write(`${JSON.stringify({
    decision: 'block',
    reason: lines.slice(0, 8).join('\n')
  })}\n`);
} catch (error) {
  logCrash('spec-gate', error);
  emitBlock(`Completion gate controlled failure: ${error.message}. Completion is blocked until the hook is repaired.`);
}
