'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const HELPER = path.join(__dirname, '../../src/claude/scripts/scan-staged-secrets.cjs');

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
}

function withRepo(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-secret-scan-'));
  try {
    git(root, ['init', '-q']);
    git(root, ['config', 'user.email', 'test@example.invalid']);
    git(root, ['config', 'user.name', 'CafeKit Test']);
    fs.writeFileSync(path.join(root, 'config.ts'), 'export const mode = "safe";\n');
    git(root, ['add', '.']);
    git(root, ['commit', '-qm', 'fixture']);
    return run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('staged secret scanner maps added source lines and redacts values', () => {
  withRepo((root) => {
    const value = ['sk-live-', '0123456789abcdef0123456789'].join('');
    fs.writeFileSync(
      path.join(root, 'config.ts'),
      `export const mode = "safe";\nexport const OPENAI_API_KEY = "${value}";\n`,
    );
    git(root, ['add', 'config.ts']);

    const result = spawnSync(process.execPath, [HELPER], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stdout, /Blocked: possible secret `OPENAI_API_KEY` at config\.ts:2\. Value not shown\./);
    assert.doesNotMatch(result.stdout, new RegExp(value));
    assert.doesNotMatch(result.stderr, new RegExp(value));
  });
});

test('staged secret scanner handles JSON/YAML names and safe-name exclusions', () => {
  withRepo((root) => {
    const longValue = ['0123456789abcdef', '0123456789abcdef'].join('');
    fs.writeFileSync(
      path.join(root, 'config.yml'),
      [
        'tokenizer: enabled',
        'password_hint_label: "Password"',
        'api_key_file: "./fixtures/key.txt"',
        `apiKey: "${longValue}"`,
        `AWS_SECRET_ACCESS_KEY: "${longValue}"`,
        'example_token: "changeme"',
        '',
      ].join('\n'),
    );
    git(root, ['add', 'config.yml']);

    const result = spawnSync(process.execPath, [HELPER], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stdout, /`apiKey` at config\.yml:4/);
    assert.match(result.stdout, /`AWS_SECRET_ACCESS_KEY` at config\.yml:5/);
    assert.doesNotMatch(result.stdout, /tokenizer|password_hint_label|api_key_file|example_token/);
  });
});

test('staged secret scanner ignores deleted and context lines', () => {
  withRepo((root) => {
    const oldValue = ['sk-old-', '0123456789abcdef0123456789'].join('');
    fs.writeFileSync(
      path.join(root, 'config.ts'),
      `export const OLD_TOKEN = "${oldValue}";\nexport const mode = "safe";\n`,
    );
    git(root, ['add', 'config.ts']);
    git(root, ['commit', '-qm', 'old secret fixture']);
    fs.writeFileSync(
      path.join(root, 'config.ts'),
      'export const mode = "safe";\nexport const replacement = true;\n',
    );
    git(root, ['add', 'config.ts']);

    const result = spawnSync(process.execPath, [HELPER], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stdout, /No staged secrets found/);
  });
});
