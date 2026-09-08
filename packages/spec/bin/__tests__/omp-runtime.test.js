'use strict';

// omp discovers .claude/skills and .agents/skills on its own, so CafeKit ships it no
// skill payload. What omp lacks is the enforcement chain, so an omp install has to
// provision the hooks and the extension directory that carries it. These tests pin the
// install path only; gate behaviour belongs to the tasks that author the fork and bridge.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const INSTALLER = path.join(PACKAGE_ROOT, 'bin/install.js');
const { PLATFORMS } = require(path.join(PACKAGE_ROOT, 'bin/lib/context'));

function inTempProject(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-omp-runtime-'));
  try {
    const init = spawnSync('git', ['-C', root, 'init', '-q'], { encoding: 'utf8' });
    assert.equal(init.status, 0, init.stderr);
    return run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function install(root, platform, extra = []) {
  return spawnSync(process.execPath, [INSTALLER, '--platform', platform, '--yes', ...extra],
    { cwd: root, encoding: 'utf8', env: { ...process.env, PATH: '/usr/bin:/bin' } });
}

test('omp is a registered platform that ships no skill payload of its own', () => {
  const omp = PLATFORMS.omp;
  assert.ok(omp, 'omp must exist in the platform registry');
  assert.equal(omp.folder, '.omp');
  assert.equal(omp.capabilities.skills, false, 'omp reads .claude/skills itself; copying would duplicate');
  assert.equal(omp.capabilities.agents, false);
});

test('an omp install creates hooks, an extensions directory, and platform metadata', () => {
  inTempProject((root) => {
    const result = install(root, 'omp');
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const hooks = fs.readdirSync(path.join(root, '.omp', 'hooks')).filter((f) => f.endsWith('.cjs'));
    assert.ok(hooks.length > 0, 'the gate scripts must be installed');
    for (const required of ['spec-gate.cjs', 'privacy-block.cjs', 'rules.cjs']) {
      assert.ok(hooks.includes(required), `missing ${required}`);
    }

    assert.equal(fs.existsSync(path.join(root, '.omp', 'extensions')), true,
      'omp auto-loads this directory; a half-provisioned install must be visibly empty, not absent');

    const metadata = JSON.parse(fs.readFileSync(path.join(root, '.omp', 'cafekit.json'), 'utf8'));
    assert.equal(metadata.platform, 'omp');
    assert.ok(metadata.version, 'the install must record a version');
  });
});

test('a non-omp install creates no .omp directory', () => {
  inTempProject((root) => {
    const result = install(root, 'claude');
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.equal(fs.existsSync(path.join(root, '.omp')), false);
  });
});

test('an omp install ignores its own auto-executed extension directory', () => {
  inTempProject((root) => {
    assert.equal(install(root, 'omp').status, 0);
    const ignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
    // A committed .omp/extensions/ would run arbitrary code on clone, before any gate
    // can act, so the ignore rule is part of the install rather than user hygiene.
    assert.match(ignore, /^\.omp\/$/m, '.omp/ must be ignored like .claude/ and .codex/');
  });
});

test('reinstalling omp is idempotent and preserves a user-added extension', () => {
  inTempProject((root) => {
    assert.equal(install(root, 'omp').status, 0);
    const mine = path.join(root, '.omp', 'extensions', 'my-own.mjs');
    fs.writeFileSync(mine, 'export default function () {}\n');

    assert.equal(install(root, 'omp').status, 0);
    assert.equal(fs.existsSync(mine), true, 'a reinstall erased an extension the user added');
  });
});
