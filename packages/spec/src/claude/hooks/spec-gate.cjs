#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * Stop Hook — spec-gate.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Blocks turn end when *newly-done* tasks lack a verification receipt.
 * Block contract (exit 0 + stdout): {"decision":"block","reason":"..."}.
 *
 * Safety: stop_hook_active loop guard; no worker-writable completion-gate
 * bypass exists; cache is optimization only - every
 * done transition is validated even on first run / empty cache; crash → controlled block + hooks/.logs/hook-log.jsonl. Exit: 0 always.
 */

const fs = require('fs');
const path = require('path');

function projectRoot(payload = {}) {
  const configured = typeof process.env.CLAUDE_PROJECT_DIR === 'string'
    ? process.env.CLAUDE_PROJECT_DIR.trim()
    : '';
  if (configured) {
    try { return fs.realpathSync(path.resolve(configured)); } catch { /* continue */ }
  }

  const installedRoot = path.resolve(__dirname, '..', '..');
  const installedHook = path.join(installedRoot, '.claude', 'hooks', path.basename(__filename));
  if (fs.existsSync(installedHook)) return installedRoot;

  const sourceFixture = typeof process.env.PROJECT_ROOT === 'string'
    ? process.env.PROJECT_ROOT.trim()
    : '';
  if (sourceFixture) {
    try { return fs.realpathSync(path.resolve(sourceFixture)); } catch { /* continue */ }
  }

  const legacy = typeof payload.cwd === 'string' ? payload.cwd.trim() : '';
  if (legacy) {
    try { return fs.realpathSync(path.resolve(legacy)); } catch { /* continue */ }
  }
  try { return fs.realpathSync(process.cwd()); } catch { return path.resolve(process.cwd()); }
}

function logCrash(error) {
  try {
    const d = path.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(
      path.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'spec-gate', status: 'crash', error: error.message }) + '\n'
    );
  } catch (_) {}
}

function emitBlock(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason }) + '\n');
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

try {
  const policyPath = path.join(__dirname, '..', 'scripts', 'workflow-policy.cjs');

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) throw new Error('hook payload is empty');

  const payload = JSON.parse(stdin);
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('hook payload must be a JSON object');
  }

  // Never re-block a continuation caused by our own block (infinite-loop guard).
  if (payload.stop_hook_active === true) process.exit(0);

  let POLICY;
  let RESOLVER;
  try {
    POLICY = require(policyPath);
    RESOLVER = require(path.join(__dirname, '..', 'scripts', 'spec-resolver.cjs'));
    if (typeof POLICY.validateCanonicalReceipt !== 'function'
      || typeof POLICY.completionDecisionForSpec !== 'function') {
      throw new Error('shared workflow policy lacks completion authority functions');
    }
  } catch (error) {
    logCrash(error);
    emitBlock(`Completion gate unavailable: shared workflow policy could not be loaded (${error.message}). Repair ${policyPath} before completing tasks.`);
    process.exit(0);
  }

  const cwd     = projectRoot(payload);

  // Missing/malformed runtime.json keeps the gate ON (fail-closed, valve 3 style).
  let runtime = {};
  try {
    const rp = path.join(cwd, '.claude', 'runtime.json');
    if (fs.existsSync(rp)) runtime = JSON.parse(fs.readFileSync(rp, 'utf8'));
  } catch { /* gate stays on */ }
  // Active-spec discovery via shared resolver — explicit target if present, else fail on ambiguity.
  const baseDir   = cwd;
  const explicitFeature = payload.featureName || payload.feature || payload.explicitFeature || null;
  const explicitPath = payload.specPath || payload.spec_path || payload.featurePath || null;
  const resolved = RESOLVER.resolveActiveSpec({ projectRoot: baseDir, runtime, explicitFeature, explicitPath });
  if (!resolved) process.exit(0);
  if (resolved.error === 'multiple_active') {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `Completion gate: multiple active specs detected (${resolved.candidates.join(', ')}). Provide explicit feature target or resolve ambiguity before completing tasks. Candidates: ${resolved.candidates.join(', ')}`
    }) + '\n');
    process.exit(0);
  }
  if (resolved.error === 'invalid_specs') {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `Completion gate: invalid spec JSON detected (${resolved.candidates.join(', ')}): ${resolved.reason}. Fix or remove malformed spec.json before completing tasks.`
    }) + '\n');
    process.exit(0);
  }
  if (resolved.error === 'explicit_not_found' || resolved.error === 'explicit_malformed') {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `Completion gate: explicit spec target invalid (${resolved.error}): ${resolved.reason || resolved.explicitFeature || resolved.explicitPath || 'unknown'}. Provide a valid feature target inside configured specs root.`
    }) + '\n');
    process.exit(0);
  }
  if (resolved.error) process.exit(0);

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

  const configuredGate = runtime.spec?.completion_gate;
  if (configuredGate !== undefined && configuredGate !== true) {
    emitBlock('Completion gate: runtime.spec.completion_gate is a worker-writable flag, not an authorization; no completion-gate bypass is supported. Remove the flag and satisfy the gate.');
    process.exit(0);
  }
  const taskRegistry = activeSpec.task_registry || {};
  const cacheFile = path.join(__dirname, '.logs', 'spec-gate-last.json');
  const cacheExists = fs.existsSync(cacheFile);
  let cache = {};
  if (cacheExists) {
    try { cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8')); } catch { cache = {}; }
  }

  const currentStatuses = {};
  for (const [tp, task] of Object.entries(taskRegistry)) {
    currentStatuses[tp] = task?.status || 'pending';
  }

  const staleFlashTasks = Object.entries(taskRegistry)
    .filter(([, task]) => POLICY.isStaleFlashDone(task))
    .map(([taskPath]) => taskPath);
  if (staleFlashTasks.length > 0) {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `Completion gate: ${staleFlashTasks.length} task(s) marked done with FLASH_UNVERIFIED (${staleFlashTasks.join(', ')}). Run /hapo:test for exact proof, then use explicit sync-finalize.`
    }) + '\n');
    process.exit(0);
  }

  // Cache hardening: every Stop revalidates the canonical receipt for
  // every task currently marked done, so a cached PASS cannot hide later
  // mutations (deletion, placeholder, changed Verification/Command/Exit/
  // Base/Head, stale provenance). Cache is an optimization, not truth.
  const featureCache = cacheExists ? (cache[featureName] || {}) : {};
  const allDoneTasks = Object.keys(taskRegistry).filter((tp) =>
    (taskRegistry[tp]?.status || 'pending') === 'done'
  );
  const receiptBodies = new Map();
  // /m so ^ matches line starts (Evidence is never at byte 0 of the file).
  // legacy heading aliases: read-compat only, no longer advertised
  const EVID_RE = /^#{2,3}\s+(Evidence|Task Test Plan & Verification Evidence|Verification & Evidence)\b/m;
  const PASS_MARKER_RE = /^\s*Verification:\s*PASS\s*$/m;
  const LEGACY_SUCCESS_RE = /^\s*(?:PASS(?:ED)?|✓)(?:\s*:|$)|exit\s+code\s*[:=]?\s*0\b/im;

  /** Body of first Evidence heading until next same-or-higher heading. */
  function evidenceBody(text) {
    const lines = text.split('\n');
    let start = -1, level = 0;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(#{2,3})\s+(Evidence|Task Test Plan & Verification Evidence|Verification & Evidence)\b/);
      if (m) { start = i + 1; level = m[1].length; break; }
    }
    if (start < 0) return null;
    let end = lines.length;
    for (let i = start; i < lines.length; i++) {
      const hm = lines[i].match(/^(#{1,6})\s+/);
      const isTapMetadata = typeof POLICY.isTapMetadataHeading === 'function'
        && POLICY.isTapMetadataHeading(lines[i]);
      if (hm && hm[1].length <= level && !isTapMetadata) { end = i; break; }
    }
    return lines.slice(start, end).join('\n');
  }

  function validateCanonicalReceipt(body, options) {
    return POLICY.validateCanonicalReceipt(body, options);
  }

  // Receipt checks a–h → failed letter list.
  // a: file + Status header has "done"; b: Evidence heading; c: no {{...}} + unambiguous PASS; d: completed_at; e: command; f: exit/result; g: provenance; h: artifact hash
  function safeTaskFile(featureDir, taskPath) {
    const resolvedFeature = path.resolve(featureDir);
    const target = path.resolve(featureDir, taskPath);
    const relative = path.relative(resolvedFeature, target);
    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
    if (!fs.existsSync(target)) return null;
    try {
      const canonicalFeature = fs.realpathSync(resolvedFeature);
      const canonicalTarget = fs.realpathSync(target);
      const rel = path.relative(canonicalFeature, canonicalTarget);
      if (rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) return null;
    } catch {
      return null;
    }
    return target;
  }

  function checkReceipt(taskPath) {
    const fails = [];
    const featureDir = path.join(specsPath, featureName);
    const abs = safeTaskFile(featureDir, taskPath);
    if (!abs || !fs.existsSync(abs)) return ['a'];
    let text = '';
    try { text = fs.readFileSync(abs, 'utf8'); } catch { return ['a']; }

    const statusLine = text.split('\n').find((l) => /^\s*(\*\*)?Status(\*\*)?\s*:/i.test(l));
    if (!statusLine || !/\bdone\b/i.test(statusLine)) fails.push('a');

    const body = evidenceBody(text);
    if (body !== null) receiptBodies.set(taskPath, body);
    if (body === null || !EVID_RE.test(text)) {
      fails.push('b');
    } else if (
      /\{\{[^}]+\}\}/.test(body) ||
      !(PASS_MARKER_RE.test(body) || LEGACY_SUCCESS_RE.test(body))
    ) {
      fails.push('c');
    } else {
      // Canonical receipt checks for done tasks — delegated to shared validator (single authority)
      const canonicalFails = validateCanonicalReceipt(body, POLICY.receiptValidatorOptions(taskRegistry[taskPath], {
        runtimeContext,
        requireProvenanceBinding: true,
      }));
      const map = { verification_state: 'c', command: 'e', exit_result: 'f', provenance: 'g', artifact_hash: 'h', artifact_declaration: 'h', placeholder: 'c', shared_validator: 'c', validator_unavailable: 'c' };
      for (const cf of canonicalFails) {
        if (cf === 'verification_state' || cf === 'shared_validator' || cf === 'validator_unavailable') {
          if (!fails.includes('c')) fails.push('c');
          continue;
        }
        if (cf === 'placeholder') {
          if (!fails.includes('c')) fails.push('c');
          continue;
        }
        const letter = map[cf];
        if (letter && !fails.includes(letter)) fails.push(letter);
      }
      // Enforce strict Verification: PASS, not just legacy success
      if (!PASS_MARKER_RE.test(body) && !fails.includes('c')) fails.push('c');
    }

    const at = taskRegistry[taskPath]?.completed_at;
    if (
      typeof at !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T/.test(at) ||
      Number.isNaN(Date.parse(at))
    ) fails.push('d');
    return fails;
  }

  const failures = allDoneTasks
    .map((tp) => ({ taskPath: tp, fails: checkReceipt(tp) }))
    .filter((f) => f.fails.length > 0);

  const firstReceiptTask = allDoneTasks.find((taskPath) => receiptBodies.has(taskPath));
  const completion = allDoneTasks.length > 0 && Object.prototype.hasOwnProperty.call(activeSpec, 'workflow_policy')
    ? POLICY.completionDecisionForSpec(activeSpec, {
      runtimeContext,
      executionReceipt: firstReceiptTask ? receiptBodies.get(firstReceiptTask) : null,
      taskContext: firstReceiptTask ? taskRegistry[firstReceiptTask] : null,
    })
    : null;

  // Always persist status transitions, including done → pending. Keep
  // failing done tasks at their previous cached status so a stale valid
  // entry cannot mask a mutated receipt on the next Stop; with
  // revalidation of every done task the gate still re-fires regardless.
  try {
    const nextFeature = { ...featureCache, ...currentStatuses };
    for (const { taskPath } of failures) {
      if (featureCache[taskPath] === undefined) delete nextFeature[taskPath];
      else nextFeature[taskPath] = featureCache[taskPath];
    }
    cache[featureName] = nextFeature;
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
    fs.writeFileSync(cacheFile, JSON.stringify(cache));
  } catch { /* fail-open */ }

  if (allDoneTasks.length === 0) process.exit(0);
  const completionBlocked = completion && completion.completion !== 'complete' && completion.completion !== 'not_applicable';
  if (failures.length === 0 && !completionBlocked) process.exit(0);

  const lines = [
    failures.length > 0
      ? `⚠️ Completion gate: ${failures.length} newly-done task(s) lack a verification receipt.`
      : '⚠️ Completion gate: workflow completion proof is incomplete.',
  ];
  for (const { taskPath, fails } of failures) {
    lines.push(`- \`${taskPath}\`: failed check(s) ${fails.join(', ')}`);
    lines.push(
      `  Fix: add \`Verification: PASS\` plus commands and successful outcomes to \`## Evidence\` in \`specs/${featureName}/${taskPath}\`, then re-sync spec.json`
    );
  }
  if (completionBlocked) {
    lines.push(`- Completion decision unfinished: ${completion.blocker || 'required workflow proof is missing.'}`);
    if (Array.isArray(completion.missingProof) && completion.missingProof.length > 0) {
      lines.push(`  Missing proof: ${completion.missingProof.join(', ')}`);
    }
  }
  process.stdout.write(JSON.stringify({ decision: 'block', reason: lines.slice(0, 8).join('\n') }) + '\n');
  process.exit(0);

} catch (e) {
  logCrash(e);
  emitBlock(`Completion gate controlled failure: ${e.message}. Completion is blocked until the hook is repaired.`);
  process.exit(0);
}
