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
 * Safety: stop_hook_active loop guard; runtime.spec.completion_gate=false
 * escape hatch (missing key → ON); cache is optimization only - every
 * done transition is validated even on first run / empty cache; crash → fail-open + hooks/.logs/hook-log.jsonl. Exit: 0 always.
 */

try {
  const fs   = require('fs');
  const path = require('path');
  const policyPath = path.join(__dirname, '..', 'scripts', 'workflow-policy.cjs');
  const POLICY = require(policyPath);

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload = JSON.parse(stdin);
  const cwd     = payload.cwd || process.cwd();

  // Never re-block a continuation caused by our own block (infinite-loop guard).
  if (payload.stop_hook_active === true) process.exit(0);

  // Missing/malformed runtime.json keeps the gate ON (fail-closed, valve 3 style).
  let runtime = {};
  try {
    const rp = path.join(cwd, '.claude', 'runtime.json');
    if (fs.existsSync(rp)) runtime = JSON.parse(fs.readFileSync(rp, 'utf8'));
  } catch { /* gate stays on */ }
  if (runtime.spec && runtime.spec.completion_gate === false) process.exit(0);

  // Active-spec discovery — same rules as spec-state.cjs.
  const baseDir   = process.env.PROJECT_ROOT || cwd;
  const specsPath = path.join(baseDir, runtime.paths?.specs || 'specs');
  if (!fs.existsSync(specsPath)) process.exit(0);

  let activeSpec = null;
  let featureName = null;
  for (const entry of fs.readdirSync(specsPath, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const specFile = path.join(specsPath, entry.name, 'spec.json');
    if (!fs.existsSync(specFile)) continue;
    try {
      const specData = JSON.parse(fs.readFileSync(specFile, 'utf8'));
      if (specData.status === 'in_progress' || specData.status === 'in-progress') {
        activeSpec = specData;
        featureName = entry.name;
        break;
      }
    } catch { /* skip bad JSON */ }
  }
  if (!activeSpec) process.exit(0);

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
  // /m so ^ matches line starts (Evidence is never at byte 0 of the file).
  // legacy heading aliases: read-compat only, no longer advertised
  const EVID_RE = /^#{2,3}\s+(Evidence|Task Test Plan & Verification Evidence|Verification & Evidence)\b/m;
  const PASS_MARKER_RE = /^\s*Verification:\s*PASS\s*$/m;
  const LEGACY_SUCCESS_RE = /^\s*(?:PASS(?:ED)?|✓)(?:\s*:|$)|exit\s+code\s*[:=]?\s*0\b/im;
  const EXPLICIT_FAILURE_RE = /\bFAIL(?:ED|URE|URES|ING)?\b|tests?\s+failed|exit\s+code\s*[:=]?\s*[1-9]\d*|\b0\s+tests?\b/i;

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
      if (hm && hm[1].length <= level) { end = i; break; }
    }
    return lines.slice(start, end).join('\n');
  }

  function validateCanonicalReceipt(body) {
    const fails = [];
    if (!/^\s*Verification:\s*PASS\s*$/m.test(body)) fails.push('verification_state');
    if (!/^\s*Command(?:\(s\))?\s*:/m.test(body)) fails.push('command');
    if (!/^\s*Exit\s*:|exit\s+code\s*[:=]|\bResult\s*:\s*PASS\b/im.test(body)) fails.push('exit_result');
    const hasBase = /^\s*Base[ \t]*:[ \t]*\S/im.test(body);
    const hasHead = /^\s*Head[ \t]*:[ \t]*\S/im.test(body);
    const hasBaseSha = /\bbase_sha[ \t]*:[ \t]*\S/im.test(body);
    const hasHeadSha = /\bhead_sha[ \t]*:[ \t]*\S/im.test(body);
    if (!((hasBase && hasHead) || (hasBaseSha && hasHeadSha))) fails.push('provenance');
    if (/\bartifact\b/i.test(body) && !/sha256:/i.test(body)) fails.push('artifact_hash');
    return fails;
  }

  // Receipt checks a–h → failed letter list.
  // a: file + Status header has "done"; b: Evidence heading; c: no {{...}} + unambiguous PASS; d: completed_at; e: command; f: exit/result; g: provenance; h: artifact hash
  function safeTaskFile(featureDir, taskPath) {
    const target = path.resolve(featureDir, taskPath);
    const relative = path.relative(featureDir, target);
    // sibling-prefix safe: must not be .., ../..., or absolute (cross-platform)
    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
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
    if (body === null || !EVID_RE.test(text)) {
      fails.push('b');
    } else if (
      /\{\{[^}]+\}\}/.test(body) ||
      EXPLICIT_FAILURE_RE.test(body) ||
      !(PASS_MARKER_RE.test(body) || LEGACY_SUCCESS_RE.test(body))
    ) {
      fails.push('c');
    } else {
      // Canonical receipt checks for done tasks
      const canonicalFails = validateCanonicalReceipt(body);
      const map = { verification_state: 'c', command: 'e', exit_result: 'f', provenance: 'g', artifact_hash: 'h' };
      for (const cf of canonicalFails) {
        if (cf === 'verification_state') {
          if (!PASS_MARKER_RE.test(body) && !fails.includes('c')) fails.push('c');
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
  if (failures.length === 0) process.exit(0);

  const lines = [
    `⚠️ Completion gate: ${failures.length} newly-done task(s) lack a verification receipt.`,
  ];
  for (const { taskPath, fails } of failures) {
    lines.push(`- \`${taskPath}\`: failed check(s) ${fails.join(', ')}`);
    lines.push(
      `  Fix: add \`Verification: PASS\` plus commands and successful outcomes to \`## Evidence\` in \`specs/${featureName}/${taskPath}\`, then re-sync spec.json`
    );
  }
  process.stdout.write(JSON.stringify({ decision: 'block', reason: lines.slice(0, 8).join('\n') }) + '\n');
  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'spec-gate', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
