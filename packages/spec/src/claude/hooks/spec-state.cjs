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
 * Exit: 0 always (fail-open)
 */

try {
  const fs   = require('fs');
  const path = require('path');

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload = JSON.parse(stdin);
  const cwd     = payload.cwd || process.cwd();

  // Read runtime configuration if exists
  let runtime = {};
  try {
    const p = path.join(cwd, '.claude', 'runtime.json');
    if (fs.existsSync(p)) runtime = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch { /* ignore */ }

  const baseDir   = process.env.PROJECT_ROOT || cwd;
  const specsPath = path.join(baseDir, runtime.paths?.specs || 'specs');

  if (!fs.existsSync(specsPath)) {
    process.exit(0);
  }

  // Find the active spec
  let activeSpec = null;
  let featureName = null;

  const entries = fs.readdirSync(specsPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const specFile = path.join(specsPath, entry.name, 'spec.json');
      if (fs.existsSync(specFile)) {
        try {
          const specData = JSON.parse(fs.readFileSync(specFile, 'utf8'));
          if (specData.status === 'in_progress' || specData.status === 'in-progress') {
            activeSpec = specData;
            featureName = entry.name;
            break; // take the first active one
          }
        } catch { /* skip bad JSON */ }
      }
    }
  }

  if (!activeSpec) {
    process.exit(0); // No active spec, do nothing
  }

  const phase = activeSpec.current_phase || activeSpec.phase || 'unknown';
  const taskRegistry = activeSpec.task_registry || {};
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

  // ── State-change gate: only emit the full tollgate when spec state changed ──
  // This hook runs on EVERY UserPromptSubmit. Re-printing the whole block when
  // phase + done/total are unchanged is wasted context (~460 tok/turn). We keep
  // a tiny state fingerprint in a temp file: same -> one-line reminder; changed
  // -> full block (and refresh the fingerprint). Fail-open at every step.
  const stateKey = `${phase}|${taskCounts.done || 0}/${taskEntries.length}`;
  const cacheFile = path.join(__dirname, '.logs', 'tollgate-last.txt');

  let lastKey = '';
  try { lastKey = fs.readFileSync(cacheFile, 'utf8').trim(); } catch { /* first run */ }

  if (lastKey === stateKey) {
    console.log(`\n> 🔵 Spec \`${featureName}\` @ \`${phase}\` (${taskCounts.done || 0}/${taskEntries.length} tasks done). Tollgate active — sync \`spec.json\` when state changes.\n`);
    process.exit(0);
  }

  try {
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
    fs.writeFileSync(cacheFile, stateKey);
  } catch { /* fail-open: if the write fails we still print the full block */ }

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
  lines.push(`- Sync \`spec.json\` + task file after verified work; run \`node .claude/scripts/validate-spec-output.cjs specs/${featureName}\` before \`ready_for_implementation=true\`.`);
  lines.push(`- A completion gate verifies receipts when you end a turn with newly-done tasks.`);
  lines.push('');

  console.log(lines.join('\n'));
  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'spec-state', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
