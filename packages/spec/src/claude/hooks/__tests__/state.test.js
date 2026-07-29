'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const HOOK = path.join(__dirname, '..', 'state.cjs');

test('Stop snapshot includes tracked modifications and untracked files', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ck-state-'));
  try {
    fs.mkdirSync(path.join(dir, '.claude'));
    spawnSync('git', ['init', '-q'], { cwd: dir });
    spawnSync('git', ['config', 'user.email', 'test@example.com'], { cwd: dir });
    spawnSync('git', ['config', 'user.name', 'Test'], { cwd: dir });
    fs.writeFileSync(path.join(dir, 'tracked.txt'), 'before\n');
    spawnSync('git', ['add', 'tracked.txt'], { cwd: dir });
    spawnSync('git', ['commit', '-qm', 'initial'], { cwd: dir });

    fs.writeFileSync(path.join(dir, 'tracked.txt'), 'after\n');
    fs.writeFileSync(path.join(dir, 'new-untracked.json'), '{}\n');
    const result = spawnSync(process.execPath, [HOOK], {
      cwd: dir,
      input: JSON.stringify({ hook_event_name: 'Stop', cwd: dir }),
      encoding: 'utf8',
    });

    assert.strictEqual(result.status, 0);
    const state = fs.readFileSync(
      path.join(dir, '.claude', 'session-state', 'latest.md'),
      'utf8',
    );
    assert.match(state, /- tracked\.txt/);
    assert.match(state, /- new-untracked\.json/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('Stop snapshot includes untracked files before the first commit', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ck-state-no-head-'));
  try {
    fs.mkdirSync(path.join(dir, '.claude'));
    spawnSync('git', ['init', '-q'], { cwd: dir });
    fs.writeFileSync(path.join(dir, 'first-untracked.txt'), 'new\n');

    const result = spawnSync(process.execPath, [HOOK], {
      cwd: dir,
      input: JSON.stringify({ hook_event_name: 'Stop', cwd: dir }),
      encoding: 'utf8',
    });

    assert.strictEqual(result.status, 0);
    const state = fs.readFileSync(
      path.join(dir, '.claude', 'session-state', 'latest.md'),
      'utf8',
    );
    assert.match(state, /- first-untracked\.txt/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
