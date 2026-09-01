'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const STATUS_PATH = path.resolve(__dirname, '..', '..', 'status.cjs');
const GOLDEN_PATH = path.join(__dirname, 'fixtures', 'statusline-default.golden');
const NBSP = / /g;

const cleanupDirs = [];
process.on('exit', () => {
  for (const dir of cleanupDirs) fs.rmSync(dir, { recursive: true, force: true });
});

function basePayload(overrides = {}) {
  return {
    model: { display_name: 'TestModel' },
    workspace: { current_dir: '/fixture/dir' },
    cwd: '/fixture/dir',
    context_window: {
      context_window_size: 200000,
      current_usage: {
        input_tokens: 40000,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 20000,
      },
    },
    ...overrides,
  };
}

/**
 * Spawn status.cjs as a child process under a fully pinned environment:
 * - cwd: a fixture root carrying its own .claude/runtime.json
 * - TMPDIR/TEMP/TMP: an isolated per-case temp root (git + usage + context caches)
 * - NO_COLOR/FORCE_COLOR scrubbed unless the case provides them
 * - COLUMNS pinned so responsive wrapping is deterministic
 */
function runStatus({ runtime = { statusline: 'full', statuslineColors: true }, payload = basePayload(), envExtra = {}, tmpFiles = {} } = {}) {
  const caseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sl-case-'));
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sl-tmp-'));
  try {
    fs.mkdirSync(path.join(caseDir, '.claude'));
    fs.writeFileSync(path.join(caseDir, '.claude', 'runtime.json'), JSON.stringify(runtime));
    for (const [name, content] of Object.entries(tmpFiles)) {
      fs.writeFileSync(path.join(tmpDir, name), JSON.stringify(content));
    }
    const env = {
      PATH: process.env.PATH,
      HOME: process.env.HOME,
      TMPDIR: tmpDir,
      TEMP: tmpDir,
      TMP: tmpDir,
      COLUMNS: '200',
      ...envExtra,
    };
    const result = spawnSync(process.execPath, [STATUS_PATH], {
      cwd: caseDir,
      env,
      input: Buffer.from(JSON.stringify(payload)),
    });
    return {
      status: result.status,
      stdoutBuffer: result.stdout,
      stdout: result.stdout.toString('utf8'),
      stderr: result.stderr.toString('utf8'),
      readTmpFile(name) {
        const p = path.join(tmpDir, name);
        return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
      },
    };
  } finally {
    // Defer cleanup so readTmpFile still works after the spawn returns.
    cleanupDirs.push(caseDir, tmpDir);
  }
}

function freshUsageCache(now = Date.now()) {
  return {
    status: 'available',
    timestamp: now,
    data: {
      five_hour: { utilization: 20, resets_at: new Date(now + 2 * 3600 * 1000 + 29 * 60 * 1000).toISOString() },
      seven_day: { utilization: 45, resets_at: new Date(now + (2 * 86400 + 5 * 3600) * 1000).toISOString() },
    },
  };
}

test('statusline default output is byte-identical to the golden fixture when no layout is configured', () => {
  const golden = fs.readFileSync(GOLDEN_PATH);
  const run = runStatus();
  assert.equal(run.status, 0, run.stderr);
  assert.ok(run.stdoutBuffer.equals(golden),
    `default output drifted from golden\nexpected: ${JSON.stringify(golden.toString('utf8'))}\nactual:   ${JSON.stringify(run.stdout)}`);
});

test('statusline custom layout renders named sections in order per line', () => {
  const run = runStatus({
    runtime: { statusline: 'full', statuslineColors: true, statuslineLayout: { lines: [['directory', 'model']] } },
  });
  assert.equal(run.status, 0, run.stderr);
  const dirIndex = run.stdout.indexOf('📁');
  const modelIndex = run.stdout.indexOf('🤖');
  assert.ok(dirIndex >= 0 && modelIndex >= 0, run.stdout);
  assert.ok(dirIndex < modelIndex, `directory must precede model: ${JSON.stringify(run.stdout)}`);
});

test('statusline ignores unknown section ids without crashing or rendering placeholders', () => {
  const run = runStatus({
    runtime: { statusline: 'full', statuslineColors: true, statuslineLayout: { lines: [['model', 'bogus']] } },
  });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /🤖/);
  assert.doesNotMatch(run.stdout, /bogus/);
});

test('statusline modes slice the layout line count (minimal renders only the first line)', () => {
  const run = runStatus({
    runtime: { statusline: 'minimal', statuslineColors: true, statuslineLayout: { lines: [['model'], ['directory']] } },
  });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /🤖/);
  assert.doesNotMatch(run.stdout, /📁/);
});

test('statusline empty or invalid layout falls back to the default renderers', () => {
  const golden = fs.readFileSync(GOLDEN_PATH);
  for (const layout of [{}, { lines: [] }, { lines: [['bogus']] }, 'nonsense']) {
    const run = runStatus({
      runtime: { statusline: 'full', statuslineColors: true, statuslineLayout: layout },
    });
    assert.equal(run.status, 0, run.stderr);
    assert.ok(run.stdoutBuffer.equals(golden), `fallback drifted for layout ${JSON.stringify(layout)}: ${JSON.stringify(run.stdout)}`);
  }
});

test('statusline shows five-hour and weekly windows with countdowns when the cache is fresh', () => {
  const run = runStatus({ tmpFiles: { 'ck-usage-limits-cache.json': freshUsageCache() } });
  assert.equal(run.status, 0, run.stderr);
  const plain = run.stdout.replace(NBSP, ' ');
  assert.match(plain, /⌛ \d+h \d+m left \(20% used\)/, plain);
  assert.match(plain, /wk 45% \(\d+d \d+h\)/, plain);
});

test('statusline hides the quota area when the cache is stale', () => {
  const stale = freshUsageCache(Date.now() - 10 * 60 * 1000);
  stale.timestamp = Date.now() - 10 * 60 * 1000;
  const run = runStatus({ tmpFiles: { 'ck-usage-limits-cache.json': stale } });
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(run.stdout, /⌛/);
  assert.doesNotMatch(run.stdout, /wk /);
});

test('statusline cost renders only when the layout enables it, billing is api, and data exists', () => {
  const costLayout = { statusline: 'full', statuslineColors: true, statuslineLayout: { lines: [['model', 'cost']] } };
  const withCost = basePayload({ cost: { total_cost_usd: '1.2345' } });

  const enabled = runStatus({ runtime: costLayout, payload: withCost, envExtra: { CLAUDE_BILLING_MODE: 'api' } });
  assert.equal(enabled.status, 0, enabled.stderr);
  const plain = enabled.stdout.replace(NBSP, ' ');
  assert.match(plain, /💵 \$1\.23(?!\d)/, plain);

  const wrongBilling = runStatus({ runtime: costLayout, payload: withCost, envExtra: { CLAUDE_BILLING_MODE: 'subscription' } });
  assert.equal(wrongBilling.status, 0, wrongBilling.stderr);
  assert.doesNotMatch(wrongBilling.stdout, /💵/);

  const noData = runStatus({ runtime: costLayout, envExtra: { CLAUDE_BILLING_MODE: 'api' } });
  assert.equal(noData.status, 0, noData.stderr);
  assert.doesNotMatch(noData.stdout, /💵/);

  const noLayout = runStatus({ payload: withCost, envExtra: { CLAUDE_BILLING_MODE: 'api' } });
  assert.equal(noLayout.status, 0, noLayout.stderr);
  assert.doesNotMatch(noLayout.stdout, /💵/);
});

test('statusline writes the ck-context session file regardless of layout', () => {
  const run = runStatus({
    runtime: { statusline: 'full', statuslineColors: true, statuslineLayout: { lines: [['model']] } },
    payload: basePayload({ session_id: 'ctxcase' }),
  });
  assert.equal(run.status, 0, run.stderr);
  const contextFile = run.readTmpFile('ck-context-ctxcase.json');
  assert.ok(contextFile, 'ck-context-ctxcase.json must be written even under a custom layout');
  assert.equal(typeof contextFile.percent, 'number');
  assert.equal(typeof contextFile.tokens, 'number');
});

test('statusline honors NO_COLOR with no ANSI escapes in output', () => {
  const run = runStatus({ envExtra: { NO_COLOR: '1' } });
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(run.stdout, /\[/);
});
