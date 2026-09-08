'use strict';

// The gate hooks derive their runtime directory from their own location instead of a
// literal `.claude`. Each case copies the helper into a directory shaped like a real
// layout and requires it from there, so the derivation is exercised against the path the
// module actually sees — not a mocked one.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const HELPER = path.join(PACKAGE_ROOT, 'src/claude/hooks/lib/runtime-dir.cjs');

/** Place the helper at <root>/<layout>/hooks/lib/ and return what it derives. */
function deriveAt(root, layout) {
  const lib = path.join(root, layout, 'hooks', 'lib');
  fs.mkdirSync(lib, { recursive: true });
  const target = path.join(lib, 'runtime-dir.cjs');
  fs.copyFileSync(HELPER, target);
  // Each copy is a distinct module path, so require caches never collide.
  return require(target);
}

function withTemp(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-runtime-dir-'));
  try { return run(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('installed layouts derive their own folder', () => {
  withTemp((root) => {
    for (const folder of ['.claude', '.codex', '.omp']) {
      const m = deriveAt(root, path.join('project-' + folder.slice(1), folder));
      assert.equal(m.runtimeDirName(), folder);
      assert.equal(m.runtimeDir('/p'), path.join('/p', folder));
      assert.equal(m.runtimePath('/p', 'runtime.json'), path.join('/p', folder, 'runtime.json'));
    }
  });
});

test('the source tree maps platform to dotted name', () => {
  withTemp((root) => {
    for (const platform of ['claude', 'omp', 'codex']) {
      const m = deriveAt(root, path.join('packages', 'spec', 'src', platform));
      assert.equal(m.runtimeDirName(), `.${platform}`, `source tree for ${platform}`);
    }
  });
});

test('a dotted folder wins over the source marker', () => {
  withTemp((root) => {
    // An install whose absolute path happens to contain /packages/spec/src/ must still
    // report its real folder, not a doubled-dot name derived from the marker.
    const m = deriveAt(root, path.join('packages', 'spec', 'src', 'fixture', '.codex'));
    assert.equal(m.runtimeDirName(), '.codex');
  });
});

test('an unknown layout falls back to .claude', () => {
  withTemp((root) => {
    const m = deriveAt(root, path.join('somewhere', 'else'));
    assert.equal(m.runtimeDirName(), '.claude', 'the pre-helper behaviour is the fallback');
  });
});

test('the helper in the real source tree derives .claude', () => {
  const m = require(HELPER);
  assert.equal(m.runtimeDirName(), '.claude');
});
