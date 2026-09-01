'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { normalizeCodexBody } = require('../lib/codex-install');

const PACKAGE_ROOT = path.resolve(__dirname, '../..');
const SCANNER = path.join(PACKAGE_ROOT, 'src/claude/scripts/generate-skill-catalog.cjs');
const MANIFEST = JSON.parse(fs.readFileSync(
  path.join(PACKAGE_ROOT, 'src/claude/migration-manifest.json'), 'utf8'
));

function withTempRoot(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-routing-'));
  try {
    return run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function writeSkill(root, directory, fields = {}) {
  const target = path.join(root, directory);
  fs.mkdirSync(target, { recursive: true });
  if (fields.raw) {
    fs.writeFileSync(path.join(target, 'SKILL.md'), fields.raw);
    return;
  }
  const lines = ['---'];
  if (fields.name !== undefined) lines.push(`name: ${fields.name}`);
  if (fields.description !== undefined) lines.push(`description: "${fields.description}"`);
  if (fields.when !== undefined) lines.push(`when_to_use: "${fields.when}"`);
  if (fields.category !== undefined) lines.push(`category: ${fields.category}`);
  if (fields.keywords !== undefined) lines.push(`keywords: [${fields.keywords.join(', ')}]`);
  lines.push('user-invocable: true', '---', `# ${directory}`, '');
  fs.writeFileSync(path.join(target, 'SKILL.md'), `${lines.join('\n')}\n`);
}

function runCatalog(script, cwd, args = ['--json']) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

function installScanner(source, destination, transform = (content) => content) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, transform(fs.readFileSync(source, 'utf8')));
}

test('skill routing consumes live catalog without fixed optional commands', () => {
  withTempRoot((root) => {
    const claudeScript = path.join(root, '.claude/scripts/generate-skill-catalog.cjs');
    const codexScript = path.join(root, '.codex/scripts/generate-skill-catalog.cjs');
    installScanner(SCANNER, claudeScript);
    installScanner(SCANNER, codexScript, (content) => normalizeCodexBody(content, SCANNER));

    writeSkill(path.join(root, '.claude/skills'), 'question', {
      name: 'hapo:ask', description: 'Answer with evidence.', when: 'Use for factual questions.',
      category: 'utilities', keywords: ['answer', 'evidence'],
    });
    writeSkill(path.join(root, '.claude/skills'), 'docs', {
      name: 'hapo:docs', description: 'Work with docs.', when: 'Use for documentation.',
      category: 'documents', keywords: ['docs'],
    });
    writeSkill(path.join(root, '.agents/skills'), 'question', {
      name: 'hapo-ask', description: 'Answer with evidence.', when: 'Use for factual questions.',
      category: 'utilities', keywords: ['answer', 'evidence'],
    });

    const claude = runCatalog(claudeScript, root);
    const codex = runCatalog(codexScript, root);
    assert.equal(claude.root, fs.realpathSync(path.join(root, '.claude/skills')));
    assert.equal(codex.root, fs.realpathSync(path.join(root, '.agents/skills')));
    assert.deepEqual(claude.skills.map((skill) => skill.public_id), ['hapo:ask', 'hapo:docs']);
    assert.deepEqual(codex.skills.map((skill) => skill.public_id), ['hapo:ask']);
    assert.equal(codex.skills.some((skill) => skill.public_id === 'hapo:docs'), false);
  });

  const workflow = fs.readFileSync(path.join(PACKAGE_ROOT, 'src/claude/rules/skill-workflow-routing.md'), 'utf8');
  const domain = fs.readFileSync(path.join(PACKAGE_ROOT, 'src/claude/rules/skill-domain-routing.md'), 'utf8');
  const codexEntry = fs.readFileSync(path.join(PACKAGE_ROOT, 'src/codex/AGENTS.md'), 'utf8');
  assert.match(workflow, /user names a valid installed skill[\s\S]*one obvious low-risk[\s\S]*direct factual conversation/);
  assert.match(workflow, /do not invoke Route or agents for ceremony/);
  assert.match(workflow.replace(/\s+/g, ' '), /numeric optimization capability remains explicit-only/);
  assert.match(domain, /examples below are intent hints, not a copied installed inventory/);
  assert.match(domain, /document\/artifact work \| use only a matching installed optional capability/);
  assert.doesNotMatch(domain, /\/hapo:(?:docs|docx|pdf|pptx|xlsx|ai-multimodal)/);
  assert.match(codexEntry, /node \.codex\/scripts\/generate-skill-catalog\.cjs --skills/);
  assert.match(codexEntry, /Codex-bound[\s\S]*\.agents\/skills/);
});

test('skill catalog exposes discriminating routing metadata', () => {
  withTempRoot((root) => {
    const skills = path.join(root, 'skills');
    writeSkill(skills, 'route', {
      name: 'hapo:route', description: 'Choose a bounded chain.',
      when: 'Use for ambiguous multi-step work.', category: 'utilities',
      keywords: ['routing', 'risk'],
    });
    writeSkill(skills, 'question', {
      name: 'hapo:ask', description: 'First duplicate.', when: 'Use for questions.',
      category: 'utilities', keywords: ['answer'],
    });
    writeSkill(skills, 'ask', {
      name: 'hapo:ask', description: 'Second duplicate.', when: 'Use for questions.',
      category: 'utilities', keywords: ['answer'],
    });
    writeSkill(skills, 'missing-description', { name: 'hapo:missing-description' });
    writeSkill(skills, 'mismatch', { name: 'hapo:wrong', description: 'Wrong folder.' });
    writeSkill(skills, 'malformed', { raw: '# no frontmatter\n' });
    writeSkill(skills, 'bad-line', {
      raw: '---\nname: hapo:bad-line\ndescription: Valid-looking description.\nthis is not yaml\n---\n',
    });
    writeSkill(skills, 'unterminated', {
      raw: '---\nname: hapo:unterminated\ndescription: "unterminated\n---\n',
    });
    writeSkill(skills, 'blank-description', {
      raw: '---\nname: hapo:blank-description\ndescription: "   "\n---\n',
    });
    writeSkill(skills, 'invalid-flow', {
      raw: '---\nname: hapo:invalid-flow\ndescription: [unterminated\n---\n',
    });
    writeSkill(skills, 'duplicate-key', {
      raw: '---\nname: hapo:wrong\nname: hapo:duplicate-key\ndescription: Duplicate name.\n---\n',
    });
    writeSkill(skills, 'backend-development', {
      name: 'hapo:backend-development', description: 'User-modified retired skill.',
    });

    const catalog = runCatalog(SCANNER, root, ['--json', '--root', skills]);
    assert.deepEqual(catalog.skills.map((skill) => skill.public_id), ['hapo:route']);
    assert.deepEqual(catalog.skills[0], {
      name: 'hapo:route', public_id: 'hapo:route', directory: 'route',
      description: 'Choose a bounded chain.', when_to_use: 'Use for ambiguous multi-step work.',
      category: 'utilities', keywords: ['routing', 'risk'], user_invocable: true,
      has_references: false, has_scripts: false,
    });
    const codes = catalog.diagnostics.map((item) => item.code);
    assert.equal(codes.filter((code) => code === 'duplicate_public_name').length, 2);
    for (const required of [
      'folder_name_mismatch', 'malformed_frontmatter', 'missing_routing_metadata', 'retired_skill',
    ]) assert.ok(codes.includes(required), required);
    for (const directory of ['bad-line', 'unterminated', 'duplicate-key', 'invalid-flow']) {
      assert.ok(catalog.diagnostics.some((item) =>
        item.directory === directory && item.code === 'malformed_frontmatter'), directory);
    }
    assert.ok(catalog.diagnostics.some((item) =>
      item.directory === 'blank-description' && item.code === 'missing_routing_metadata'));
    assert.ok(catalog.diagnostics.every((item) => item.code !== 'duplicate_public_name'
      || item.message.includes('explicit user disambiguation')));
  });

  const sourceCatalog = runCatalog(SCANNER, PACKAGE_ROOT);
  const retiredDiagnostics = sourceCatalog.diagnostics
    .filter((item) => item.code === 'retired_skill').map((item) => item.directory).sort();
  assert.deepEqual(retiredDiagnostics, [...MANIFEST.obsolete.skills].sort());
  assert.equal(sourceCatalog.skills.some((skill) => MANIFEST.obsolete.skills.includes(skill.directory)), false);
  const route = sourceCatalog.skills.find((skill) => skill.public_id === 'hapo:route');
  assert.ok(route?.description && route.when_to_use && route.category && route.keywords.length > 0);
});

test('skill catalog rejects a missing root value before path resolution', () => {
  const result = spawnSync(process.execPath, [SCANNER, '--root', '--json'], {
    cwd: PACKAGE_ROOT, encoding: 'utf8',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--root requires a skills directory/);
});
