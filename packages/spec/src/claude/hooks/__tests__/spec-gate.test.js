'use strict';

// Behavioral tests for spec-gate.cjs (Stop completion gate). The hook is run as
// a real subprocess: a Stop payload is piped to stdin; we assert exit code and
// whether stdout carries {"decision":"block",...}. Cache lives under the hook's
// own .logs/ dir (shared), so each test seeds/clears it deliberately.

const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const HOOK = path.join(__dirname, '..', 'spec-gate.cjs');
const CACHE = path.join(__dirname, '..', '.logs', 'spec-gate-last.json');
const FEATURE = 'demo';
const TASK_REL = 'tasks/task-R0-01-x.md';

function runHook(payload, cwd) {
  const projectRoot = cwd || payload.cwd;
  // PROJECT_ROOT wins over cwd in the hook; pin it to the fixture so a host
  // monorepo's real specs/ cannot leak into the test (e.g. active rtk-* specs).
  const env = { ...process.env, PROJECT_ROOT: projectRoot };
  const res = spawnSync(process.execPath, [HOOK], {
    input: JSON.stringify({
      hook_event_name: 'Stop',
      session_id: 'test',
      transcript_path: '/tmp/t',
      stop_hook_active: false,
      ...payload,
      cwd: projectRoot,
    }),
    encoding: 'utf8',
    env,
  });
  return {
    code: res.status,
    stdout: (res.stdout || '').trim(),
    stderr: res.stderr || '',
  };
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ck-spec-gate-'));
}

function clearCache() {
  try { fs.unlinkSync(CACHE); } catch { /* absent */ }
}

function seedCache(featureMap) {
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(featureMap));
}

function readCache() {
  return JSON.parse(fs.readFileSync(CACHE, 'utf8'));
}

/**
 * Build a minimal active-spec fixture under dir.
 * @param {object} opts
 * @param {string} [opts.taskStatus='done']
 * @param {string|null} [opts.completed_at='2026-07-01T00:00:00Z']
 * @param {string} [opts.mdStatus='done']
 * @param {'valid'|'missing-evidence'|'placeholder'|'none'} [opts.evidence='valid']
 * @param {object|null} [opts.runtime] — if set, write .claude/runtime.json
 */
function makeFixture(opts = {}) {
  const {
    taskStatus = 'done',
    completed_at = '2026-07-01T00:00:00Z',
    mdStatus = 'done',
    evidence = 'valid',
    runtime = null,
  } = opts;
  const dir = tmpDir();
  const featureDir = path.join(dir, 'specs', FEATURE);
  const tasksDir = path.join(featureDir, 'tasks');
  fs.mkdirSync(tasksDir, { recursive: true });

  const entry = { status: taskStatus };
  if (completed_at !== null) entry.completed_at = completed_at;

  fs.writeFileSync(
    path.join(featureDir, 'spec.json'),
    JSON.stringify({
      status: 'in_progress',
      current_phase: 'implementation',
      task_registry: { [TASK_REL]: entry },
    }),
  );

  let evidenceBlock = '';
  if (evidence === 'valid') {
    evidenceBlock = [
      '## Evidence',
      '',
      '```',
      'npm test',
      'PASS: 10 tests',
      '```',
      '',
    ].join('\n');
  } else if (evidence === 'placeholder') {
    evidenceBlock = [
      '## Evidence',
      '',
      'Command: `{{TYPECHECK / TEST COMMAND}}`',
      'Expected: {{What proves success}}',
      '',
    ].join('\n');
  } else if (evidence === 'missing-evidence') {
    evidenceBlock = '## Risk Assessment\n\nNone.\n';
  } else {
    evidenceBlock = '';
  }

  fs.writeFileSync(
    path.join(dir, 'specs', FEATURE, TASK_REL),
    [
      `# Task R0-01: example`,
      '',
      `**Status:** ${mdStatus}`,
      '',
      evidenceBlock,
    ].join('\n'),
  );

  if (runtime) {
    fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, '.claude', 'runtime.json'),
      JSON.stringify(runtime),
    );
  }

  return dir;
}

function parseBlock(stdout) {
  if (!stdout) return null;
  // Hook may print only the JSON line.
  try {
    return JSON.parse(stdout);
  } catch {
    const line = stdout.split('\n').find((l) => l.includes('"decision"'));
    if (!line) return null;
    return JSON.parse(line);
  }
}

beforeEach(() => {
  clearCache();
});

after(() => {
  clearCache();
});

test('1. newly-done task WITHOUT receipt → block, reason names task path', () => {
  const dir = makeFixture({
    evidence: 'missing-evidence',
    completed_at: '2026-07-01T00:00:00Z',
  });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    const body = parseBlock(stdout);
    assert.ok(body, 'expected block JSON on stdout');
    assert.strictEqual(body.decision, 'block');
    assert.ok(
      body.reason.includes(TASK_REL),
      `reason must name task path; got: ${body.reason}`,
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('2. newly-done task WITH valid receipt → no block, cache updated', () => {
  const dir = makeFixture({ evidence: 'valid' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(stdout, '', 'valid receipt must not produce block output');
    const cache = readCache();
    assert.strictEqual(cache[FEATURE][TASK_REL], 'done');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('3. no active spec → exit 0 silent', () => {
  const dir = tmpDir();
  try {
    fs.mkdirSync(path.join(dir, 'specs'), { recursive: true });
    // No in_progress spec.
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(stdout, '');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('4. stop_hook_active: true → exit 0 silent even with violating task', () => {
  const dir = makeFixture({ evidence: 'missing-evidence' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { code, stdout } = runHook({ stop_hook_active: true }, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(stdout, '');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('5. first run (no cache) with done-without-receipt → exit 0, cache created', () => {
  const dir = makeFixture({ evidence: 'missing-evidence' });
  try {
    clearCache();
    assert.ok(!fs.existsSync(CACHE), 'cache must be absent for first-run');
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(stdout, '', 'first run must never block');
    assert.ok(fs.existsSync(CACHE), 'cache file must be created');
    const cache = readCache();
    assert.strictEqual(cache[FEATURE][TASK_REL], 'done');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('6. runtime.json spec.completion_gate: false → exit 0 silent', () => {
  const dir = makeFixture({
    evidence: 'missing-evidence',
    runtime: { spec: { completion_gate: false } },
  });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(stdout, '');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('7. Evidence with {{...}} placeholder → blocked (check c)', () => {
  const dir = makeFixture({ evidence: 'placeholder' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    const body = parseBlock(stdout);
    assert.ok(body, 'expected block JSON on stdout');
    assert.strictEqual(body.decision, 'block');
    assert.ok(
      body.reason.includes(TASK_REL) && /\bc\b/.test(body.reason),
      `reason must cite task path and check c; got: ${body.reason}`,
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
