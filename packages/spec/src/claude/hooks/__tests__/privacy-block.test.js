'use strict';

// Behavioral tests for privacy-block.cjs. The hook is run as a real subprocess:
// a PreToolUse payload is piped to stdin and the exit code is asserted
// (0 = allow, 2 = block). Covers the symlink-bypass hardening.

const { test } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const HOOK = path.join(__dirname, '..', 'privacy-block.cjs');

/** Run the hook with a tool payload; return { code, stderr }. */
function runHook(payload, cwd) {
  const res = spawnSync(process.execPath, [HOOK], {
    input: JSON.stringify({ ...payload, cwd: cwd || payload.cwd }),
    encoding: 'utf8',
  });
  return { code: res.status, stderr: res.stderr || '' };
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ck-privacy-'));
}

test('blocks a direct Read of .env (exit 2)', () => {
  const dir = tmpDir();
  try {
    const env = path.join(dir, '.env');
    fs.writeFileSync(env, 'SECRET=1');
    const { code } = runHook({ tool_name: 'Read', tool_input: { file_path: env } }, dir);
    assert.strictEqual(code, 2);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('blocks a symlink whose target is .env (regression: symlink bypass)', () => {
  const dir = tmpDir();
  try {
    const env = path.join(dir, '.env');
    fs.writeFileSync(env, 'SECRET=1');
    const link = path.join(dir, 'notes.txt'); // harmless-looking name
    fs.symlinkSync(env, link);
    const { code } = runHook({ tool_name: 'Read', tool_input: { file_path: link } }, dir);
    assert.strictEqual(code, 2, 'symlink to .env must be blocked, not allowed');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('allows a normal non-sensitive file (exit 0)', () => {
  const dir = tmpDir();
  try {
    const f = path.join(dir, 'README.md');
    fs.writeFileSync(f, '# hi');
    const { code } = runHook({ tool_name: 'Read', tool_input: { file_path: f } }, dir);
    assert.strictEqual(code, 0);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('allows a symlink to an exempt .env.example (exemption still wins)', () => {
  const dir = tmpDir();
  try {
    const example = path.join(dir, '.env.example');
    fs.writeFileSync(example, 'SECRET=');
    const link = path.join(dir, 'sample.txt');
    fs.symlinkSync(example, link);
    const { code } = runHook({ tool_name: 'Read', tool_input: { file_path: link } }, dir);
    assert.strictEqual(code, 0, 'symlink to an exempt file must stay allowed');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
