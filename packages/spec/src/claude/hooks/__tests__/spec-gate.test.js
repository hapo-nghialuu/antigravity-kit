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
 * @param {'valid'|'legacy-valid'|'failed'|'fence-only'|'missing-evidence'|'placeholder'|'none'} [opts.evidence='valid']
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
      'Verification: PASS',
      'Command: npm test',
      'Exit: 0',
      'Result: PASS',
      'Base: abc123',
      'Head: def456',
      'Artifact: dist/bundle.js (sha256:deadbeef)',
      '```',
      'npm test',
      'PASS: 10 tests',
      '```',
      '',
    ].join('\n');
  } else if (evidence === 'legacy-valid') {
    evidenceBlock = '## Evidence\n\nVerification: PASS\nCommand: npm test\nExit: 0\nBase: abc123\nHead: def456\nnpm test — passed, exit code 0\n';
  } else if (evidence === 'failed') {
    evidenceBlock = '## Evidence\n\nVerification: PASS\n\nFAIL: tests failed, exit code 1\n';
  } else if (evidence === 'fence-only') {
    evidenceBlock = '## Evidence\n\n```\nnpm test\n```\n';
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

test('5. first run (no cache) with done-without-receipt → block (cache is not truth)', () => {
  const dir = makeFixture({ evidence: 'missing-evidence' });
  try {
    clearCache();
    assert.ok(!fs.existsSync(CACHE), 'cache must be absent for first-run');
    const { code, stdout } = runHook({}, dir);
    assert.strictEqual(code, 0);
    const body = parseBlock(stdout);
    assert.ok(body, 'first run must block done without receipt');
    assert.strictEqual(body.decision, 'block');
    assert.ok(body.reason.includes(TASK_REL));
    assert.ok(fs.existsSync(CACHE), 'cache file must be created even when blocking');
    const cache = readCache();
    // failing task must not be cached as done
    assert.strictEqual(cache[FEATURE]?.[TASK_REL], undefined);
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

test('8. explicit failure cannot pass even when PASS text is present', () => {
  const dir = makeFixture({ evidence: 'failed' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body);
    assert.match(body.reason, /\bc\b/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('9. a code fence alone is not verification proof', () => {
  const dir = makeFixture({ evidence: 'fence-only' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    assert.ok(parseBlock(runHook({}, dir).stdout));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('10. completed_at must be a valid ISO timestamp', () => {
  const dir = makeFixture({ completed_at: 'yesterday' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body);
    assert.match(body.reason, /\bd\b/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('11. done → pending cache transition is persisted and can be gated again', () => {
  const dir = makeFixture({ taskStatus: 'pending', mdStatus: 'pending' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'done' } });
    assert.strictEqual(runHook({}, dir).stdout, '');
    assert.strictEqual(readCache()[FEATURE][TASK_REL], 'pending');

    const specFile = path.join(dir, 'specs', FEATURE, 'spec.json');
    const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
    spec.task_registry[TASK_REL] = {
      status: 'done',
      completed_at: '2026-07-01T00:00:00Z',
    };
    fs.writeFileSync(specFile, JSON.stringify(spec));
    const taskFile = path.join(dir, 'specs', FEATURE, TASK_REL);
    fs.writeFileSync(taskFile, '# Task\n\n**Status:** done\n\n## Evidence\n\nFAIL: tests failed\n');

    assert.ok(parseBlock(runHook({}, dir).stdout), 're-completed failing task must be gated');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('12. legacy successful receipt remains read-compatible', () => {
  const dir = makeFixture({ evidence: 'legacy-valid' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    assert.strictEqual(runHook({}, dir).stdout, '');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('13. provenance requires both Base and Head - only Base fails', () => {
  const dir = tmpDir();
  const featureDir = path.join(dir, 'specs', FEATURE);
  const tasksDir = path.join(featureDir, 'tasks');
  fs.mkdirSync(tasksDir, { recursive: true });
  fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify({
    status: 'in_progress',
    current_phase: 'implementation',
    task_registry: { [TASK_REL]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' } },
  }));
  // Only Base, missing Head
  fs.writeFileSync(path.join(dir, 'specs', FEATURE, TASK_REL), [
    '# Task',
    '',
    '**Status:** done',
    '',
    '## Evidence',
    '',
    'Verification: PASS',
    'Command: npm test',
    'Exit: 0',
    'Base: abc123',
    '```',
    'npm test PASS',
    '```',
  ].join('\n'));
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, 'only Base should block');
    assert.strictEqual(body.decision, 'block');
    assert.match(body.reason, /\bg\b/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('14. provenance requires both Base and Head - only Head fails', () => {
  const dir = tmpDir();
  const featureDir = path.join(dir, 'specs', FEATURE);
  const tasksDir = path.join(featureDir, 'tasks');
  fs.mkdirSync(tasksDir, { recursive: true });
  fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify({
    status: 'in_progress',
    current_phase: 'implementation',
    task_registry: { [TASK_REL]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' } },
  }));
  // Only Head, missing Base
  fs.writeFileSync(path.join(dir, 'specs', FEATURE, TASK_REL), [
    '# Task',
    '',
    '**Status:** done',
    '',
    '## Evidence',
    '',
    'Verification: PASS',
    'Command: npm test',
    'Exit: 0',
    'Head: def456',
    '```',
    'npm test PASS',
    '```',
  ].join('\n'));
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, 'only Head should block');
    assert.strictEqual(body.decision, 'block');
    assert.match(body.reason, /\bg\b/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('15. provenance with both Base and Head passes', () => {
  const dir = tmpDir();
  const featureDir = path.join(dir, 'specs', FEATURE);
  const tasksDir = path.join(featureDir, 'tasks');
  fs.mkdirSync(tasksDir, { recursive: true });
  fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify({
    status: 'in_progress',
    current_phase: 'implementation',
    task_registry: { [TASK_REL]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' } },
  }));
  fs.writeFileSync(path.join(dir, 'specs', FEATURE, TASK_REL), [
    '# Task',
    '',
    '**Status:** done',
    '',
    '## Evidence',
    '',
    'Verification: PASS',
    'Command: npm test',
    'Exit: 0',
    'Base: abc123',
    'Head: def456',
    '```',
    'npm test PASS',
    '```',
  ].join('\n'));
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { stdout } = runHook({}, dir);
    assert.strictEqual(stdout, '', 'both Base and Head should not block');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('16. registry task path with ../ escape or sibling-prefix is rejected (check a)', () => {
  const dir = tmpDir();
  const featureDir = path.join(dir, 'specs', FEATURE);
  const evilFeature = path.join(dir, 'specs', `${FEATURE}-evil`);
  const maliciousRel = `../${FEATURE}-evil/tasks/task.md`;
  const maliciousAbs = path.join(evilFeature, 'tasks/task.md');
  // Prepare evil file with valid receipt outside feature (should be ignored due to path traversal)
  fs.mkdirSync(path.join(featureDir, 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(evilFeature, 'tasks'), { recursive: true });
  fs.writeFileSync(maliciousAbs, [
    '# Task',
    '',
    '**Status:** done',
    '',
    '## Evidence',
    '',
    'Verification: PASS',
    'Command: npm test',
    'Exit: 0',
    'Base: abc123',
    'Head: def456',
    '```',
    'pass',
    '```',
  ].join('\n'));
  // Also create sibling-prefix style path: tasks/../../demo-evil/tasks/task.md
  const siblingPrefixRel = `tasks/../../${FEATURE}-evil/tasks/task.md`;
  fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify({
    status: 'in_progress',
    current_phase: 'implementation',
    task_registry: {
      [maliciousRel]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' },
      [siblingPrefixRel]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' },
      [path.resolve(featureDir, maliciousRel)]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' },
    },
  }));
  try {
    seedCache({ [FEATURE]: { [maliciousRel]: 'pending', [siblingPrefixRel]: 'pending', [path.resolve(featureDir, maliciousRel)]: 'pending' } });
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, 'traversal path should block');
    assert.strictEqual(body.decision, 'block');
    // Must fail check a (file + Status)
    assert.match(body.reason, /\ba\b/);
    // Ensure malicious path is named in reason
    assert.ok(body.reason.includes(maliciousRel) || body.reason.includes(siblingPrefixRel));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('17. empty or bare provenance fails — Base:/Head: require non-empty same-line values', () => {
  const cases = [
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','Base:','Head: def456'].join('\n'), desc: 'empty Base:' },
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','Base:   ','Head: def456'].join('\n'), desc: 'Base: spaces only' },
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','Base: abc','Head:'].join('\n'), desc: 'empty Head:' },
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','base_sha','head_sha: def'].join('\n'), desc: 'bare base_sha without colon' },
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','base_sha:','head_sha: def'].join('\n'), desc: 'empty base_sha:' },
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','base_sha:   ','head_sha: def'].join('\n'), desc: 'base_sha spaces only' },
    { evidence: ['Verification: PASS','Command: npm test','Exit: 0','base_sha head_sha'].join('\n'), desc: 'bare base_sha head_sha without colon' },
  ];
  for (const { evidence, desc } of cases) {
    const dir = tmpDir();
    const featureDir = path.join(dir, 'specs', FEATURE);
    fs.mkdirSync(path.join(featureDir, 'tasks'), { recursive: true });
    fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify({
      status: 'in_progress',
      current_phase: 'implementation',
      task_registry: { [TASK_REL]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' } },
    }));
    fs.writeFileSync(path.join(dir, 'specs', FEATURE, TASK_REL), ['# Task','','**Status:** done','','## Evidence','','' + evidence,'```','pass','```'].join('\n'));
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, `empty/bare provenance should block for ${desc}`);
    assert.strictEqual(body.decision, 'block', `empty/bare should block: ${desc}`);
    assert.match(body.reason, /\bg\b/, `should fail provenance g for ${desc}`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('18. valid non-empty Base: value and base_sha: value pass', () => {
  const validCases = [
    ['Verification: PASS','Command: npm test','Exit: 0','Base: abc123','Head: def456'].join('\n'),
    ['Verification: PASS','Command: npm test','Exit: 0','base_sha: abc123','head_sha: def456'].join('\n'),
    ['Verification: PASS','Command: npm test','Exit: 0','Base: a1b2c3','Head: d4e5f6'].join('\n'),
  ];
  for (const evidence of validCases) {
    const dir = tmpDir();
    const featureDir = path.join(dir, 'specs', FEATURE);
    fs.mkdirSync(path.join(featureDir, 'tasks'), { recursive: true });
    fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify({
      status: 'in_progress',
      current_phase: 'implementation',
      task_registry: { [TASK_REL]: { status: 'done', completed_at: '2026-07-01T00:00:00Z' } },
    }));
    fs.writeFileSync(path.join(dir, 'specs', FEATURE, TASK_REL), ['# Task','','**Status:** done','','## Evidence','','' + evidence,'```','pass','```'].join('\n'));
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    const { stdout } = runHook({}, dir);
    assert.strictEqual(stdout, '', `valid provenance should not block: ${evidence.slice(0,40)}`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// --- Cache-hardening regressions: cached PASS must not hide later mutations ---

test('19. cache-hit: unchanged valid receipt stays PASS on second Stop (revalidation)', () => {
  const dir = makeFixture({ evidence: 'valid' });
  try {
    clearCache();
    // first Stop (no cache file) with valid receipt → no block, cache seeded as done
    let res = runHook({}, dir);
    assert.strictEqual(res.stdout, '', 'first run valid must not block');
    assert.strictEqual(readCache()[FEATURE][TASK_REL], 'done');
    // second Stop with same valid receipt and cache-hit → must still not block
    res = runHook({}, dir);
    assert.strictEqual(res.stdout, '', 'cache-hit with unchanged valid receipt must not block');
    assert.strictEqual(readCache()[FEATURE][TASK_REL], 'done');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('20. cache-hit: receipt mutation (removed Verification/Command) blocks even though status stays done', () => {
  const dir = makeFixture({ evidence: 'valid' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    assert.strictEqual(runHook({}, dir).stdout, '', 'initial valid must pass');
    assert.strictEqual(readCache()[FEATURE][TASK_REL], 'done');
    // mutate: strip Verification: PASS and Command — keep file as done
    const taskFile = path.join(dir, 'specs', FEATURE, TASK_REL);
    fs.writeFileSync(taskFile, [
      '# Task', '', '**Status:** done', '',
      '## Evidence', '',
      'Exit: 0', 'Base: abc123', 'Head: def456',
      '```', 'pass', '```',
    ].join('\n'));
    const blocked = parseBlock(runHook({}, dir).stdout);
    assert.ok(blocked, 'mutated receipt missing Verification/Command should block on cache-hit');
    assert.strictEqual(blocked.decision, 'block');
    assert.match(blocked.reason, /\bc\b|\be\b/);
    // cache must not have been promoted to still-valid done; next run must still block
    const secondBlocked = parseBlock(runHook({}, dir).stdout);
    assert.ok(secondBlocked, 'second hit after mutation must still block');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('21. cache-hit: provenance mutation (removed Head / changed to stale) blocks', () => {
  const dir = makeFixture({ evidence: 'valid' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    assert.strictEqual(runHook({}, dir).stdout, '');
    // mutate: remove Head, leave only Base
    const taskFile = path.join(dir, 'specs', FEATURE, TASK_REL);
    fs.writeFileSync(taskFile, [
      '# Task', '', '**Status:** done', '',
      '## Evidence', '', 'Verification: PASS', 'Command: npm test', 'Exit: 0', 'Base: abc123',
      '```', 'pass', '```',
    ].join('\n'));
    let body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, 'missing Head provenance should block on cache-hit');
    assert.match(body.reason, /\bg\b/);
    // mutate back to include both but with empty Head value (stale)
    fs.writeFileSync(taskFile, [
      '# Task', '', '**Status:** done', '',
      '## Evidence', '', 'Verification: PASS', 'Command: npm test', 'Exit: 0', 'Base: abc123', 'Head:',
      '```', 'pass', '```',
    ].join('\n'));
    body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, 'empty Head should block as stale provenance');
    assert.match(body.reason, /\bg\b/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('22. cache-hit: deleted task file blocks even though spec still says done', () => {
  const dir = makeFixture({ evidence: 'valid' });
  try {
    seedCache({ [FEATURE]: { [TASK_REL]: 'pending' } });
    assert.strictEqual(runHook({}, dir).stdout, '');
    assert.strictEqual(readCache()[FEATURE][TASK_REL], 'done');
    fs.unlinkSync(path.join(dir, 'specs', FEATURE, TASK_REL));
    const body = parseBlock(runHook({}, dir).stdout);
    assert.ok(body, 'deleted receipt file should block on cache-hit');
    assert.strictEqual(body.decision, 'block');
    assert.match(body.reason, /\ba\b/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('23. malformed cache JSON does not bypass validation', () => {
  // valid receipt with malformed cache → must still PASS (fail-open on cache parse, not on receipt)
  const dirValid = makeFixture({ evidence: 'valid' });
  try {
    clearCache();
    fs.mkdirSync(path.dirname(CACHE), { recursive: true });
    fs.writeFileSync(CACHE, '{ not json');
    const res = runHook({}, dirValid);
    assert.strictEqual(res.stdout, '', 'malformed cache with valid receipt must not block');
    assert.ok(fs.existsSync(CACHE), 'hook must rewrite cache file');
  } finally {
    fs.rmSync(dirValid, { recursive: true, force: true });
  }
  // invalid receipt with malformed cache → must still BLOCK (cache not truth)
  const dirInvalid = makeFixture({ evidence: 'missing-evidence' });
  try {
    fs.mkdirSync(path.dirname(CACHE), { recursive: true });
    fs.writeFileSync(CACHE, '{ malformed: ');
    const body = parseBlock(runHook({}, dirInvalid).stdout);
    assert.ok(body, 'malformed cache with invalid receipt must block');
    assert.strictEqual(body.decision, 'block');
  } finally {
    fs.rmSync(dirInvalid, { recursive: true, force: true });
  }
});

test('24. first-run (no cache file) with valid receipt passes and seeds cache', () => {
  const dir = makeFixture({ evidence: 'valid' });
  try {
    clearCache();
    assert.ok(!fs.existsSync(CACHE));
    const { stdout } = runHook({}, dir);
    assert.strictEqual(stdout, '', 'first run valid receipt must not block');
    assert.ok(fs.existsSync(CACHE), 'cache must be created on first valid run');
    assert.strictEqual(readCache()[FEATURE][TASK_REL], 'done');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
