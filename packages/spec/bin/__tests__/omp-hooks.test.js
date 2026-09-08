'use strict';

// The gate scripts were authored against Claude Code's vocabulary. omp speaks a
// different one: its tool registry uses lowercase names, and its tool_call result has
// only { block, reason } — there is no ask state. The omp fork carries those three
// contract differences. Each test states the failure it prevents, because a fork that
// silently drifts back to the Claude contract disables a gate while looking installed.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const OMP_HOOKS = path.join(PACKAGE_ROOT, 'src/omp/hooks');
const CLAUDE_HOOKS = path.join(PACKAGE_ROOT, 'src/claude/hooks');
const { normalizeToolName } = require(path.join(OMP_HOOKS, 'lib/omp-tool-names.cjs'));

function withSecretProject(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-omp-hooks-'));
  try {
    fs.writeFileSync(path.join(root, '.env'), 'API_TOKEN=redacted\n');
    return run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

/** Run a hook as a real child process and return its verdict, if any. */
function verdict(hookPath, payload) {
  const result = spawnSync(process.execPath, [hookPath], {
    input: typeof payload === 'string' ? payload : JSON.stringify(payload),
    encoding: 'utf8',
  });
  const out = (result.stdout || '').trim();
  let decision = null;
  try {
    decision = out ? JSON.parse(out)?.hookSpecificOutput?.permissionDecision ?? null : null;
  } catch { decision = null; }
  return { code: result.status, out, decision };
}

test('omp tool names map to the Claude names the rules were written against', () => {
  for (const [omp, claude] of [['bash', 'Bash'], ['read', 'Read'], ['edit', 'Edit'], ['write', 'Write'], ['grep', 'Grep']]) {
    assert.equal(normalizeToolName(omp), claude, `${omp} must reach the ${claude} rule`);
  }
  // An unknown tool is left alone rather than renamed into a rule it does not belong to.
  assert.equal(normalizeToolName('some_future_tool'), 'some_future_tool');
  assert.equal(normalizeToolName('Bash'), 'Bash', 'a Claude name must survive unchanged');
});

test('a lowercase bash command reading a secret file is denied, where Claude lets it pass', () => {
  withSecretProject((root) => {
    const payload = { tool_name: 'bash', tool_input: { command: `cat ${path.join(root, '.env')}` }, cwd: root };

    // The gap this fork exists to close: privacy-block.cjs compares tool_name === 'Bash'
    // exactly, so omp's lowercase name skips the command scan entirely.
    const claude = verdict(path.join(CLAUDE_HOOKS, 'privacy-block.cjs'), payload);
    assert.equal(claude.decision, null, 'fixture assumes the Claude hook does not act on a lowercase name');

    const omp = verdict(path.join(OMP_HOOKS, 'privacy-block.cjs'), payload);
    assert.equal(omp.decision, 'deny');
    assert.match(omp.out, /\.env/, 'the denial must name what it protected');
  });
});

test('a capitalised tool name keeps working, so the fork adds a case rather than swapping one', () => {
  withSecretProject((root) => {
    const omp = verdict(path.join(OMP_HOOKS, 'privacy-block.cjs'),
      { tool_name: 'Bash', tool_input: { command: `cat ${path.join(root, '.env')}` }, cwd: root });
    assert.equal(omp.decision, 'deny');
  });
});

test('the privacy hook denies where Claude asks, since omp tool_call has no ask state', () => {
  const source = fs.readFileSync(path.join(OMP_HOOKS, 'privacy-block.cjs'), 'utf8');
  assert.ok(!source.includes("permissionDecision: 'ask'"),
    "omp's tool_call result carries only block and reason; an ask would be dropped and the access allowed");
  assert.ok(source.includes("permissionDecision: 'deny'"));

  withSecretProject((root) => {
    const omp = verdict(path.join(OMP_HOOKS, 'privacy-block.cjs'),
      { tool_name: 'read', tool_input: { file_path: path.join(root, '.env') }, cwd: root });
    assert.equal(omp.decision, 'deny');
  });
});

test('an unevaluable access denies rather than allows', () => {
  for (const malformed of ['not json', '', '{"tool_name":']) {
    const omp = verdict(path.join(OMP_HOOKS, 'privacy-block.cjs'), malformed);
    assert.equal(omp.code, 0, 'the hook must not crash the turn');
    if (malformed === 'not json' || malformed === '{"tool_name":') {
      assert.equal(omp.decision, 'deny',
        'a hook that cannot evaluate an access must not hand the model a secret-bearing path');
    }
  }
});

test('a write to a scaffolded task path is guarded under omp lowercase names too', () => {
  const guard = path.join(OMP_HOOKS, 'task-scaffold-guard.cjs');
  const source = fs.readFileSync(guard, 'utf8');
  assert.match(source, /normalizeToolName\(toolName\) !== 'Write'/,
    "omp sends `write`; an exact 'Write' comparison would skip the guard entirely");
});

test('the fork carries every gate script, not a subset', () => {
  const claude = fs.readdirSync(CLAUDE_HOOKS).filter((f) => f.endsWith('.cjs')).sort();
  const omp = fs.readdirSync(OMP_HOOKS).filter((f) => f.endsWith('.cjs')).sort();
  assert.deepEqual(omp, claude, 'a missing script means the bridge dispatches into nothing');
});
