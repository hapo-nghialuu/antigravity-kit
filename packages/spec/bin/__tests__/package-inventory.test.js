'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.resolve(__dirname, '../..');
const REQUIRED_PAYLOAD = [
  'bin/install.js',
  'src/claude/migration-manifest.json',
  'src/claude/scripts/scan-staged-secrets.cjs',
  'src/claude/scripts/workflow-policy.cjs',
];
const FORBIDDEN_PAYLOAD = [
  /(^|\/)\.logs(\/|$)/,
  /\.log$/,
  /\.coverage(?:\/|$)/,
  /__pycache__(?:\/|$)/,
  /\.pyc$/,
  /(^|\/)\.(?:cache|state|tmp)(\/|$)/,
  /^src\/\.codex(?:\/|$)/,
];

function npmPack(args, cwd) {
  const result = spawnSync('npm', ['pack', '--ignore-scripts', ...args], {
    cwd,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return JSON.parse(result.stdout)[0];
}

function packedInventory(tarball) {
  const result = spawnSync('tar', ['-tzf', tarball], { encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return result.stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((entry) => entry.replace(/^package\//, '').replace(/\/$/, ''))
    .filter(Boolean)
    .sort();
}

function assertCleanInventory(inventory) {
  assert.deepEqual(inventory, [...inventory].sort(), 'package inventory must be sorted');
  assert.equal(new Set(inventory).size, inventory.length, 'package inventory must not contain duplicates');
  for (const required of REQUIRED_PAYLOAD) assert.ok(inventory.includes(required), `missing payload: ${required}`);
  for (const entry of inventory) {
    for (const pattern of FORBIDDEN_PAYLOAD) {
      assert.doesNotMatch(entry, pattern, `forbidden generated payload: ${entry}`);
    }
  }
}

test('npm dry-run inventory is deterministic and preserves runtime payload', () => {
  const first = npmPack(['--dry-run', '--json'], PACKAGE_ROOT);
  const second = npmPack(['--dry-run', '--json'], PACKAGE_ROOT);
  const firstInventory = first.files.map(({ path: filePath }) => filePath).sort();
  const secondInventory = second.files.map(({ path: filePath }) => filePath).sort();
  assert.deepEqual(firstInventory, secondInventory);
  assertCleanInventory(firstInventory);
});

test('packed tarball installs runtime from isolated temporary directories', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-package-'));
  const destination = path.join(root, 'dist');
  const extractRoot = path.join(root, 'extract');
  const installRoot = path.join(root, 'project');
  fs.mkdirSync(destination, { recursive: true });
  fs.mkdirSync(extractRoot, { recursive: true });
  fs.mkdirSync(installRoot, { recursive: true });

  try {
    const packed = npmPack(['--pack-destination', destination, '--json'], PACKAGE_ROOT);
    const tarball = path.join(destination, packed.filename);
    const inventory = packedInventory(tarball);
    assertCleanInventory(inventory);

    const extracted = spawnSync('tar', ['-xzf', tarball, '-C', extractRoot], { encoding: 'utf8' });
    assert.equal(extracted.status, 0, `${extracted.stdout}\n${extracted.stderr}`);

    // Install packed artifact, not source, into an isolated project. Offline mode
    // makes dependency resolution deterministic against this repo's npm cache.
    const installedPackage = spawnSync(
      'npm',
      [
        'install',
        '--offline',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        '--package-lock=false',
        '--prefix',
        installRoot,
        tarball,
      ],
      { cwd: installRoot, encoding: 'utf8' },
    );
    assert.equal(installedPackage.status, 0, `${installedPackage.stdout}\n${installedPackage.stderr}`);

    const installer = path.join(
      installRoot,
      'node_modules',
      '@haposoft',
      'cafekit',
      'bin',
      'install.js',
    );
    assert.ok(fs.existsSync(installer), 'npm install must resolve packed package bin');
    const installed = spawnSync(process.execPath, [installer, '--platform', 'claude', '--yes'], {
      cwd: installRoot,
      encoding: 'utf8',
      env: { ...process.env, HOME: path.join(root, 'home'), PATH: '/usr/bin:/bin' },
    });
    assert.equal(installed.status, 0, `${installed.stdout}\n${installed.stderr}`);
    assert.ok(fs.existsSync(path.join(installRoot, '.claude', 'scripts', 'workflow-policy.cjs')));
    assert.ok(fs.existsSync(path.join(installRoot, '.claude', 'scripts', 'scan-staged-secrets.cjs')));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
