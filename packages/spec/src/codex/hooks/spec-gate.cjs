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
const { checkReceipt } = require('./lib/spec-receipt.cjs');
const { findActiveSpec, taskStatusMap } = require('./lib/spec-utils.cjs');
const policyPath = path.join(__dirname, '..', 'scripts', 'workflow-policy.cjs');
const POLICY = require(fs.existsSync(policyPath)
  ? policyPath
  : path.join(__dirname, '../../claude/scripts/workflow-policy.cjs'));

try {
  const payload = readPayload();
  if (!payload || payload.stop_hook_active === true) process.exit(0);
  const { projectRoot, runtime } = getHookContext(payload);
  if (runtime.spec?.completion_gate === false) process.exit(0);
  const active = findActiveSpec(projectRoot, runtime);
  if (!active) process.exit(0);

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
  const previous = cacheExists ? (cache[active.featureName] || {}) : {};
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
  const failures = allDoneTasks
    .map((taskPath) => ({
      taskPath,
      failures: checkReceipt(featureDir, taskPath, registry[taskPath])
    }))
    .filter((result) => result.failures.length);

  const next = { ...previous, ...currentStatuses };
  for (const result of failures) {
    if (previous[result.taskPath] === undefined) delete next[result.taskPath];
    else next[result.taskPath] = previous[result.taskPath];
  }
  cache[active.featureName] = next;
  atomicWrite(cacheFile, `${JSON.stringify(cache)}\n`);

  if (!failures.length) process.exit(0);
  const lines = [
    `Completion gate: ${failures.length} newly-done task(s) lack a verification receipt.`
  ];
  for (const result of failures) {
    lines.push(
      `- \`${result.taskPath}\`: failed check(s) ${result.failures.join(', ')}`,
      `  Add \`Verification: PASS\`, commands, and successful outcomes under \`## Evidence\` in \`specs/${active.featureName}/${result.taskPath}\`, then re-sync spec.json.`
    );
  }
  process.stdout.write(`${JSON.stringify({
    decision: 'block',
    reason: lines.slice(0, 8).join('\n')
  })}\n`);
} catch (error) {
  logCrash('spec-gate', error);
}
