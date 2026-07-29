'use strict';

// Behavioral tests for privacy-block.cjs. The hook is run as a real subprocess:
// a PreToolUse payload is piped to stdin and native permission output asserted.

const { test } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const HOOK = path.join(__dirname, '..', 'privacy-block.cjs');

/** Run the hook with a tool payload; return process output. */
function runHook(payload, cwd) {
  const res = spawnSync(process.execPath, [HOOK], {
    input: JSON.stringify({ ...payload, cwd: cwd || payload.cwd }),
    encoding: 'utf8',
  });
  return { code: res.status, stdout: res.stdout || '', stderr: res.stderr || '' };
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ck-privacy-'));
}

function permissionDecision(stdout) {
  if (!stdout.trim()) return null;
  return JSON.parse(stdout).hookSpecificOutput?.permissionDecision || null;
}

test('asks natively for a direct Read of .env', () => {
  const dir = tmpDir();
  try {
    const env = path.join(dir, '.env');
    fs.writeFileSync(env, 'SECRET=1');
    const { code, stdout } = runHook({ tool_name: 'Read', tool_input: { file_path: env } }, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(permissionDecision(stdout), 'ask');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('asks for a symlink whose target is .env (regression: symlink bypass)', () => {
  const dir = tmpDir();
  try {
    const env = path.join(dir, '.env');
    fs.writeFileSync(env, 'SECRET=1');
    const link = path.join(dir, 'notes.txt'); // harmless-looking name
    fs.symlinkSync(env, link);
    const { code, stdout } = runHook({ tool_name: 'Read', tool_input: { file_path: link } }, dir);
    assert.strictEqual(code, 0);
    assert.strictEqual(permissionDecision(stdout), 'ask');
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

test('an exempt-looking symlink to .env still asks based on its target', () => {
  const dir = tmpDir();
  try {
    const env = path.join(dir, '.env');
    fs.writeFileSync(env, 'SECRET=1');
    const link = path.join(dir, '.env.example');
    fs.symlinkSync(env, link);
    const { stdout } = runHook({ tool_name: 'Read', tool_input: { file_path: link } }, dir);
    assert.strictEqual(permissionDecision(stdout), 'ask');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

for (const command of [
  'cat ".env"',
  'cat .env',
  'cat .env*',
  'sed -n 1p .env',
  "bash -c 'sed -n 1p .env'",
]) {
  test(`asks natively for Bash sensitive reference: ${command}`, () => {
    const dir = tmpDir();
    try {
      fs.writeFileSync(path.join(dir, '.env'), 'SECRET=1');
      const { code, stdout } = runHook({ tool_name: 'Bash', tool_input: { command } }, dir);
      assert.strictEqual(code, 0);
      assert.strictEqual(permissionDecision(stdout), 'ask');
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}
