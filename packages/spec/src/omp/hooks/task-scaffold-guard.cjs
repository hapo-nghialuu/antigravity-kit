#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * PreToolUse Hook — task-scaffold-guard.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Forces spec task files to be GENERATED via spec-scaffold.cjs instead of
 * hand-written. Field tests showed the model dodges the (opt-in) scaffold step
 * and raw-`Write`s every task file — the single biggest output-token cost of a
 * spec run. This hook blocks `Write` to `specs/<feature>/tasks/task-*.md`, so
 * the only path to a task file is: scaffold (creates the stub) -> Edit (fills it).
 *
 * Scope is deliberately narrow — it only ever blocks the `Write` tool on a task
 * file path. `Edit`/`MultiEdit` (filling a stub), and `Write` to any other file
 * (requirements.md, design.md, source code) are never touched. The scaffold
 * script itself writes via Node fs through a Bash call, not the `Write` tool, so
 * it is never blocked.
 *
 * Safety valves:
 *   1. fail-open when spec-scaffold.cjs is absent — you cannot force a tool that
 *      is not installed, so a hook shipped without its script must not deadlock.
 *   2. actionable block message — prints the exact scaffold command to run.
 *   3. escape hatch — "spec": { "scaffold_guard": false } in <runtime>/runtime.json.
 *
 * Exit: 0 = allow, 2 = block.
 */

try {
  const fs   = require('fs');
  const path = require('path');
  const { runtimeDirName, runtimeDir, runtimePath } = require('./lib/runtime-dir.cjs');

/**
 * Deny the call with a reason every host can read.
 *
 * The reason is the JSON `permissionDecisionReason`, which Claude Code reads natively and
 * grok honours "regardless of exit code"; the same text also goes to stderr, because on
 * an exit-2 denial that is the channel Claude Code feeds back, and grok reads only the
 * first stderr line. Exit 2 stays so a host that reads neither still blocks.
 */
function denyWithReason(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  }) + '\n');
  process.stderr.write(reason + '\n');
  process.exit(2);
}

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const { normalizeHookPayload } = require('./lib/hook-payload.cjs');
  const data      = normalizeHookPayload(JSON.parse(stdin));
  const toolName  = data.tool_name  || '';
  const toolInput = data.tool_input || {};
  const cwd       = data.cwd        || process.cwd();

  // Only `Write` can create a file from scratch. Edit/MultiEdit require an
  // existing file, so filling a scaffolded stub is always allowed.
  const { normalizeToolName } = require('./lib/omp-tool-names.cjs');
  // omp sends `write`; this guard was authored against Claude's `Write`.
  if (normalizeToolName(toolName) !== 'Write') process.exit(0);

  const filePath = toolInput.file_path || toolInput.path || '';
  if (!filePath) process.exit(0);

  // Match a spec task file: .../specs/<feature>/tasks/task-<...>.md
  const norm = filePath.replace(/\\/g, '/');
  const isTaskFile = /(^|\/)specs\/[^/]+\/tasks\/task-[^/]+\.md$/.test(norm);
  if (!isTaskFile) process.exit(0);

  // Valve 3: explicit escape hatch via <runtime>/runtime.json (fail-closed: a
  // missing/broken runtime.json keeps the guard ON).
  let runtime = {};
  try {
    const rp = runtimePath(cwd, 'runtime.json');
    if (fs.existsSync(rp)) runtime = JSON.parse(fs.readFileSync(rp, 'utf8'));
  } catch { /* malformed runtime.json -> keep guard on */ }
  if (runtime.spec && runtime.spec.scaffold_guard === false) process.exit(0);

  // Valve 1: fail-open if the scaffold script is not installed next to this hook
  // (hook lives in <runtime>/hooks/, script in <runtime>/scripts/). Forcing a tool
  // that does not exist would deadlock task creation.
  const scaffold = path.join(__dirname, '..', 'scripts', 'spec-scaffold.cjs');
  if (!fs.existsSync(scaffold)) process.exit(0);

  // Valve 2: block with an actionable message carrying the exact command.
  // NOTE: deliberately does NOT mention the runtime.json escape hatch — an
  // Smoke testing proved the model reads the advertised override and
  // simply disables the guard itself. The hatch stays functional for humans.
  const m = norm.match(/(^|\/)specs\/([^/]+)\/tasks\//);
  const feature = m ? m[2] : '<feature>';
  denyWithReason(
    `TASK SCAFFOLD REQUIRED: task files must be generated, not hand-written.\n` +
    `Blocked Write: ${filePath}\n\n` +
    `Generate the stub(s), then Edit-fill the {{...}} placeholders:\n` +
    `  node ${runtimeDirName()}/scripts/spec-scaffold.cjs ${feature} --tasks "R0-01-slug,R1-01-slug,..." --tasks-only\n` +
    `Then use Edit (not Write) on each tasks/task-*.md stub.`
  );

} catch (e) {
  // Never let a hook crash block the user — log and fail-open.
  try {
    const fs = require('fs'), p = require('path');
    const d = require('./lib/hook-state-dir.cjs').hookStateDir();
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'task-scaffold-guard', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
