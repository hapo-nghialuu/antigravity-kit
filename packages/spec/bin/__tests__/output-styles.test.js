'use strict';

// Output styles are a Claude Code surface: Claude Code discovers .claude/output-styles/
// alongside agents, skills and rules, and Codex CLI has no equivalent. These tests pin
// what installs where, and that every style stays loadable — a style with broken
// frontmatter is silently unavailable rather than loudly wrong.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const INSTALLER = path.join(PACKAGE_ROOT, 'bin/install.js');
const SOURCE_DIR = path.join(PACKAGE_ROOT, 'src/claude/output-styles');
const EXPECTED = [
  'coding-level-0-eli5.md',
  'coding-level-1-junior.md',
  'coding-level-2-mid.md',
  'coding-level-3-senior.md',
  'coding-level-4-lead.md',
  'coding-level-5-god.md',
];

function inTempProject(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-output-styles-'));
  try {
    return run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function install(root, platform) {
  return spawnSync(
    process.execPath,
    [INSTALLER, '--platform', platform, '--yes'],
    { cwd: root, encoding: 'utf8', env: { ...process.env, PATH: '/usr/bin:/bin' } }
  );
}

/** Parse the leading `---` frontmatter block into a flat key/value map. */
function frontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^([a-z][a-z0-9-]*):\s*(.*)$/i);
    if (pair) fields[pair[1]] = pair[2].trim();
  }
  return fields;
}

test('the source ships exactly the six coding levels', () => {
  const found = fs.readdirSync(SOURCE_DIR).filter((name) => name.endsWith('.md')).sort();
  assert.deepEqual(found, EXPECTED);
});

test('every style carries the frontmatter Claude Code reads', () => {
  for (const name of EXPECTED) {
    const fields = frontmatter(fs.readFileSync(path.join(SOURCE_DIR, name), 'utf8'));
    assert.ok(fields, `${name} has no frontmatter block, so it cannot load`);
    assert.ok(fields.name, `${name} has no name`);
    assert.ok(fields.description, `${name} has no description`);
    // These styles change how answers are written, not what the agent is allowed to do.
    assert.equal(
      fields['keep-coding-instructions'], 'true',
      `${name} must keep the base coding instructions, or the style would replace them`
    );
  }
});

test('each level declares a distinct name and description', () => {
  const names = new Set();
  const descriptions = new Set();
  for (const file of EXPECTED) {
    const fields = frontmatter(fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8'));
    names.add(fields.name);
    descriptions.add(fields.description);
  }
  assert.equal(names.size, EXPECTED.length, 'two styles share a name and would be indistinguishable');
  assert.equal(descriptions.size, EXPECTED.length, 'two styles share a description');
});

test('a Claude install places every style where Claude Code discovers them', () => {
  inTempProject((root) => {
    const result = install(root, 'claude');
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const installed = path.join(root, '.claude', 'output-styles');
    for (const name of EXPECTED) {
      assert.equal(fs.existsSync(path.join(installed, name)), true, `missing ${name}`);
      assert.equal(
        fs.readFileSync(path.join(installed, name), 'utf8'),
        fs.readFileSync(path.join(SOURCE_DIR, name), 'utf8'),
        `${name} was altered on the way in`
      );
    }
  });
});

test('a Codex install ships no output styles, because Codex CLI has no such surface', () => {
  inTempProject((root) => {
    const result = install(root, 'codex');
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.equal(fs.existsSync(path.join(root, '.codex', 'output-styles')), false);
    assert.equal(fs.existsSync(path.join(root, '.agents', 'output-styles')), false);
  });
});

test('a style edited by the user survives a reinstall', () => {
  inTempProject((root) => {
    assert.equal(install(root, 'claude').status, 0);
    const target = path.join(root, '.claude', 'output-styles', 'coding-level-5-god.md');
    const edited = `${fs.readFileSync(target, 'utf8')}\n\nAlways answer in Vietnamese.\n`;
    fs.writeFileSync(target, edited);

    assert.equal(install(root, 'claude').status, 0);
    assert.equal(fs.readFileSync(target, 'utf8'), edited, 'the reinstall discarded a user edit');
  });
});
