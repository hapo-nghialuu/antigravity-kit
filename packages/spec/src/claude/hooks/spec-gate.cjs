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
 * escape hatch (missing key → ON); first-run seeds cache without blocking;
 * crash → fail-open + hooks/.logs/hook-log.jsonl. Exit: 0 always.
 */

try {
  const fs   = require('fs');
  const path = require('path');

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

  // First run: treat all current done as historical — seed cache, never block.
  if (!cacheExists) {
    try {
      fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
      cache[featureName] = currentStatuses;
      fs.writeFileSync(cacheFile, JSON.stringify(cache));
    } catch { /* fail-open */ }
    process.exit(0);
  }

  const featureCache = cache[featureName] || {};
  // Newly done: status is done now AND cached status differs or is absent.
  const newlyDone = Object.keys(taskRegistry).filter((tp) =>
    (taskRegistry[tp]?.status || 'pending') === 'done' && featureCache[tp] !== 'done'
  );
  if (newlyDone.length === 0) process.exit(0);

  // /m so ^ matches line starts (Evidence is never at byte 0 of the file).
  const EVID_RE = /^#{2,3}\s+(Evidence|Task Test Plan & Verification Evidence|Verification & Evidence)\b/m;
  const PROOF_RE = /(PASS|FAIL|exit code|passed|✓)/;

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

  // Receipt checks a–d → failed letter list.
  // a: file + Status header has "done"; b: Evidence heading; c: no {{...}} + (fence|proof); d: completed_at
  function checkReceipt(taskPath) {
    const fails = [];
    const abs = path.join(specsPath, featureName, taskPath);
    if (!fs.existsSync(abs)) return ['a'];
    let text = '';
    try { text = fs.readFileSync(abs, 'utf8'); } catch { return ['a']; }

    const statusLine = text.split('\n').find((l) => /^\s*(\*\*)?Status(\*\*)?\s*:/i.test(l));
    if (!statusLine || !/\bdone\b/i.test(statusLine)) fails.push('a');

    const body = evidenceBody(text);
    if (body === null || !EVID_RE.test(text)) {
      fails.push('b');
    } else if (/\{\{[^}]+\}\}/.test(body) || !(/```/.test(body) || PROOF_RE.test(body))) {
      fails.push('c');
    }

    const at = taskRegistry[taskPath]?.completed_at;
    if (typeof at !== 'string' || at.trim() === '') fails.push('d');
    return fails;
  }

  const failures = newlyDone
    .map((tp) => ({ taskPath: tp, fails: checkReceipt(tp) }))
    .filter((f) => f.fails.length > 0);

  // Leave failing newly-done at old cache status so the gate re-fires next Stop.
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

  if (failures.length === 0) process.exit(0);

  const lines = [
    `⚠️ Completion gate: ${failures.length} newly-done task(s) lack a verification receipt.`,
  ];
  for (const { taskPath, fails } of failures) {
    lines.push(`- \`${taskPath}\`: failed check(s) ${fails.join(', ')}`);
    lines.push(
      `  Fix: add a verification receipt to \`## Evidence\` in \`specs/${featureName}/${taskPath}\`: commands run + outcomes, then re-sync spec.json`
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
