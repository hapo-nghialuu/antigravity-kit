#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  atomicWrite,
  getHookContext,
  logCrash,
  readPayload
} = require('./lib/hook-context.cjs');
const { findActiveSpec } = require('./lib/spec-utils.cjs');
const policyPath = path.join(__dirname, '..', 'scripts', 'workflow-policy.cjs');
const POLICY = require(fs.existsSync(policyPath)
  ? policyPath
  : path.join(__dirname, '../../claude/scripts/workflow-policy.cjs'));

function cacheFile(projectRoot, sessionId) {
  const key = crypto.createHash('sha256')
    .update(String(sessionId || 'unknown'))
    .digest('hex')
    .slice(0, 16);
  return path.join(projectRoot, '.codex', 'hooks', '.logs', `tollgate-${key}.txt`);
}

try {
  const payload = readPayload();
  if (!payload) process.exit(0);
  const { projectRoot, runtime } = getHookContext(payload);
  if (runtime.spec?.tollgate === false) process.exit(0);
  const active = findActiveSpec(projectRoot, runtime);
  if (!active) process.exit(0);

  const phase = active.spec.current_phase || active.spec.phase || 'unknown';
  const taskRegistry = active.spec.task_registry || {};
  const flashTasks = POLICY.flashState(taskRegistry);
  const tasks = Object.entries(taskRegistry);
  const counts = tasks.reduce((result, [, task]) => {
    const status = task?.status || 'pending';
    result[status] = (result[status] || 0) + 1;
    return result;
  }, {});
  const statuses = new Map(tasks.map(([taskPath, task]) => [
    taskPath,
    task?.status || 'pending'
  ]));
  const next = tasks.find(([, task]) => (
    (task?.status || 'pending') === 'pending'
    && (task?.dependencies || []).every((dependency) => statuses.get(dependency) === 'done')
  ));
  const stateKey = `${active.featureName}|${phase}|${counts.done || 0}/${tasks.length}`;
  const cache = cacheFile(projectRoot, payload.session_id);
  let previous = '';
  try { previous = fs.readFileSync(cache, 'utf8').trim(); } catch { /* first run */ }

  if (previous === stateKey) {
    process.stdout.write(
      `> Spec \`${active.featureName}\` @ \`${phase}\` `
      + `(${counts.done || 0}/${tasks.length} tasks done). Tollgate active.\n`
    );
    process.exit(0);
  }

  atomicWrite(cache, `${stateKey}\n`);
  const lines = [
    `### Spec state changed: \`${active.featureName}\``,
    `- Phase: \`${phase}\` | Tasks: ${counts.done || 0} done / ${tasks.length} total`
  ];
  if (next) lines.push(`- Next unblocked: \`${next[0]}\``);
  if (flashTasks.length > 0) {
    lines.push(`- Flash verification pending: ${flashTasks.map((taskPath) => `\`${taskPath}\``).join(', ')}. PASS promotion keeps task in_progress until explicit sync-finalize.`);
  }
  lines.push(
    '- Sync `spec.json` and the task file only after verified work.',
    `- Validate with \`node .codex/scripts/validate-spec-output.cjs specs/${active.featureName}\`.`,
    '- The Stop completion gate checks receipts for newly-done tasks.'
  );
  process.stdout.write(`${lines.join('\n')}\n`);
} catch (error) {
  logCrash('spec-state', error);
}
