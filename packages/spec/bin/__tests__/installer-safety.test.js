'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const backup = require('../lib/backup');
const {
  copyOpenCodeAgentsMdFile,
  normalizeOpenCodeBody
} = require('../lib/opencode-install');
const {
  commandFailureReason,
  resolvePackageCommand
} = require('../lib/skill-deps');
const { copyClaudeMdFile, copyClaudeAgentsMdFile, removeObsoleteAgents } = require('../phases/claude-runtime');
const { ensureGitignore } = require('../phases/root-config');
const { configureAddressing, patchRuntimeLocale } = require('../phases/post-install');
const { upsertManagedCoreBlock } = require('../lib/instruction-blocks');
const { upsertManagedCodexBlock, normalizeCodexBody } = require('../lib/codex-install');
const { copyRecursive } = require('../lib/copy-utils');
const { createTracker, sha256 } = require('../lib/manifest');

const START = '<!-- CAFEKIT CLAUDE START -->';
const END = '<!-- CAFEKIT CLAUDE END -->';
const CORE_START = '<!-- CAFEKIT CORE START -->';
const CORE_END = '<!-- CAFEKIT CORE END -->';
const TEMPLATE = fs.readFileSync(path.join(__dirname, '../../src/claude/CLAUDE.md'), 'utf8');
const SHARED_TEMPLATE = fs.readFileSync(path.join(__dirname, '../../src/common/AGENTS.md'), 'utf8');
const INSTALLER = path.join(__dirname, '../install.js');

test('skill dependency package commands use cmd.exe for Windows npm launchers', () => {
  const windows = resolvePackageCommand(
    'npm',
    ['install', '--no-audit', '--no-fund'],
    'win32',
    { ComSpec: 'C:\\Windows\\System32\\cmd.exe' }
  );
  assert.deepEqual(windows, {
    command: 'C:\\Windows\\System32\\cmd.exe',
    args: ['/d', '/s', '/c', 'npm.cmd', 'install', '--no-audit', '--no-fund']
  });

  const posix = resolvePackageCommand('npx', ['playwright', '--version'], 'linux', {});
  assert.deepEqual(posix, {
    command: 'npx',
    args: ['playwright', '--version']
  });
});

test('skill dependency failures surface the useful npm or spawn error code', () => {
  assert.equal(
    commandFailureReason({
      stderr: "npm error Request failed\nnpm error code ENOTCACHED\nnpm error Log unavailable\n",
      stdout: '',
      status: 1
    }),
    'npm error code ENOTCACHED'
  );
  assert.equal(
    commandFailureReason({
      stderr: 'spawn npm.cmd EINVAL',
      stdout: '',
      status: null,
      errorCode: 'EINVAL'
    }),
    'spawn npm.cmd EINVAL'
  );
});

function inTempProject(run) {
  const originalCwd = process.cwd();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-installer-safety-'));
  process.chdir(root);
  try {
    return run(root);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('legacy managed root gitignore migrates A13 plan patterns and preserves user content', () => {
  inTempProject((root) => {
    fs.writeFileSync('.gitignore', [
      '# User preface',
      'keep-before.txt',
      '',
      '# CafeKit / Ecosystem',
      '',
      '# legacy managed note',
      'specs/_shared/',
      'plans/',
      '!plans/templates/*',
      '.cafekit-backup/',
      '.cafekit.lock',
      '.claude/',
      '.opencode/',
      '.codex/',
      '.agents/',
      '',
      '# User-owned section',
      'custom-ignore/',
      'keep-after.txt',
      ''
    ].join('\n'), 'utf8');

    const context = {
      dryRun: false,
      ui: { detail() {} },
      results: { copied: 0, updated: 0, skipped: 0 }
    };
    ensureGitignore(context);

    const migrated = fs.readFileSync('.gitignore', 'utf8');
    const lines = migrated.split('\n');
    const headerIndex = lines.indexOf('# CafeKit / Ecosystem');
    const userSectionIndex = lines.indexOf('# User-owned section');
    assert.deepEqual(lines.slice(headerIndex + 1, userSectionIndex - 1), [
      '',
      '# legacy managed note',
      'specs/_shared/',
      'plans/*',
      '!plans/*.md',
      '!plans/templates/',
      '!plans/templates/**',
      '.cafekit-backup/',
      '.cafekit.lock',
      '.claude/',
      '.opencode/',
      '.codex/',
      '.agents/'
    ]);
    assert.match(migrated, /# User preface\nkeep-before\.txt/);
    assert.match(migrated, /# User-owned section\ncustom-ignore\/\nkeep-after\.txt/);
    assert.doesNotMatch(migrated, /^plans\/$/m);
    assert.doesNotMatch(migrated, /^!plans\/templates\/\*$/m);

    const firstPass = Buffer.from(migrated);
    assert.equal(context.results.updated, 1);
    ensureGitignore(context);
    assert.deepEqual(fs.readFileSync('.gitignore'), firstPass);
    assert.equal(context.results.updated, 1);
    assert.equal(context.results.skipped, 1);

    fs.mkdirSync(path.join(root, 'plans/reports'), { recursive: true });
    fs.writeFileSync(path.join(root, 'plans/example.md'), 'top-level markdown\n');
    fs.writeFileSync(path.join(root, 'plans/reports/example.md'), 'nested markdown\n');
    fs.writeFileSync(path.join(root, 'plans/example.html'), 'html artifact\n');
    const init = spawnSync('git', ['init', '-q'], { cwd: root, encoding: 'utf8' });
    assert.equal(init.status, 0, init.stderr);
    const status = spawnSync(
      'git',
      ['status', '--short', '--ignored', '--untracked-files=all'],
      { cwd: root, encoding: 'utf8' }
    );
    assert.equal(status.status, 0, status.stderr);
    assert.match(status.stdout, /^\?\? plans\/example\.md$/m);
    assert.match(status.stdout, /^!! plans\/reports\/example\.md$/m);
    assert.match(status.stdout, /^!! plans\/example\.html$/m);
    assert.doesNotMatch(status.stdout, /^!! plans\/example\.md$/m);
  });
});

test('malformed managed marker topology fails transactionally and preserves exact bytes', () => {
  const markers = {
    claude: ['<!-- CAFEKIT CORE START -->', '<!-- CAFEKIT CORE END -->'],
    codex: ['<!-- CAFEKIT CODEX START -->', '<!-- CAFEKIT CODEX END -->'],
    opencode: ['<!-- CAFEKIT OPENCODE START -->', '<!-- CAFEKIT OPENCODE END -->']
  };
  const topologies = (start, end) => [
    `user\n${end}\n`,
    `user\n${start}\n`,
    `${start}\na\n${start}\nb\n${end}\n`,
    `${start}\na\n${end}\nb\n${end}\n`,
    `${end}\nuser\n${start}\n`
  ];

  for (const [platform, [start, end]] of Object.entries(markers)) {
    for (const content of topologies(start, end)) {
      inTempProject((root) => {
        fs.writeFileSync('AGENTS.md', content, 'utf8');
        const before = fs.readFileSync('AGENTS.md');
        const result = spawnSync(
          process.execPath,
          [INSTALLER, '--platform', platform, '--yes', '--force-overwrite'],
          { cwd: root, encoding: 'utf8', env: { ...process.env, PATH: '/usr/bin:/bin' } }
        );
        assert.notEqual(result.status, 0, `${platform}\n${result.stdout}\n${result.stderr}`);
        assert.deepEqual(fs.readFileSync('AGENTS.md'), before);
        assert.match(`${result.stdout}\n${result.stderr}`, /malformed .*marker topology/i);
        assert.doesNotMatch(`${result.stdout}\n${result.stderr}`, /unchanged|success/i);
      });
    }
  }
});

test('malformed CLAUDE.md marker topology preserves exact bytes and reports an error', () => {
  inTempProject(() => {
    const content = `${START}\nuser managed content without end\n`;
    fs.writeFileSync('CLAUDE.md', content, 'utf8');
    const ctx = installContext([]);
    copyClaudeMdFile(ctx, 'claude');
    assert.equal(fs.readFileSync('CLAUDE.md', 'utf8'), content);
    assert.equal(ctx.results.errors, 1);
  });
});

test('fresh no-lang install leaves locale unset and rules hook silent', () => {
  inTempProject((root) => {
    const result = spawnSync(
      process.execPath,
      [INSTALLER, '--platform', 'claude', '--yes'],
      { cwd: root, encoding: 'utf8', env: { ...process.env, PATH: '/usr/bin:/bin' } }
    );
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const runtime = JSON.parse(fs.readFileSync('.claude/runtime.json', 'utf8'));
    assert.equal(runtime.locale.responseLanguage, null);
    const hook = spawnSync(
      process.execPath,
      [path.join(root, '.claude/hooks/rules.cjs')],
      { cwd: root, input: JSON.stringify({ cwd: root, session_id: 'fresh-no-lang' }), encoding: 'utf8' }
    );
    assert.equal(hook.status, 0, hook.stderr);
    assert.doesNotMatch(hook.stdout, /Language Consistency|Always respond in|Respond in/);
  });
});

test('obsolete agent pruning is ownership-aware across Claude, Codex, and OpenCode', () => {
  const cases = {
    claude: ['agents/god-developer.md', '.claude'],
    codex: ['agents/god_developer.toml', '.codex'],
    opencode: ['agents/god-developer.md', '.opencode']
  };
  for (const [platformKey, [relative, folder]] of Object.entries(cases)) {
    for (const state of ['pristine', 'modified', 'untracked']) {
      inTempProject(() => {
        const target = path.join(folder, relative);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, 'old agent\n', 'utf8');
        const tracker = platformKey === 'codex'
          ? createTracker(folder, 'test', { recordRoot: '.', allowedRoots: ['.codex', '.agents'] })
          : createTracker(folder, 'test');
        const key = tracker.keyFor(target);
        const ownership = state === 'untracked'
          ? { files: {} }
          : { files: { [key]: { sha256: sha256(state === 'pristine' ? 'old agent\n' : 'different\n') } } };
        const warnings = [];
        const ctx = {
          dryRun: false,
          manifest: { obsolete: { agents: { [platformKey]: [relative] } } },
          ownership: { [folder]: ownership },
          trackers: { [platformKey]: tracker },
          ui: { detail() {}, warn(message) { warnings.push(message); } },
          results: { updated: 0, preserved: 0, preservedFiles: [] }
        };
        removeObsoleteAgents(ctx, platformKey);
        if (state === 'pristine') {
          assert.equal(fs.existsSync(target), false);
          assert.equal(tracker._pruned.has(key), true);
          assert.equal(warnings.length, 0);
        } else {
          assert.equal(fs.existsSync(target), true);
          assert.equal(warnings.length, 1);
          assert.equal(ctx.results.preserved, 1);
          assert.equal(tracker._pruned.has(key), false);
        }
      });
    }
  }
});

function installContext(pruned) {
  return {
    dryRun: false,
    options: { forceOverwrite: true },
    ownership: { '.claude': { files: {} } },
    trackers: {
      claude: {
        recorded: () => null,
        record: () => assert.fail('root CLAUDE.md must not be recorded'),
        prune: (target) => pruned.push(target)
      }
    },
    ui: { detail() {}, warn() {}, success() {} },
    results: {
      copied: 0,
      updated: 0,
      unchanged: 0,
      preserved: 0,
      missingDependencies: 0,
      errors: 0,
      preservedFiles: []
    }
  };
}

test('managed CLAUDE block replacement preserves user bytes under force overwrite', () => {
  inTempProject(() => {
    const before = '# User preface\n\n';
    const after = '\n\n## User tail\nKeep this exactly.\n';
    fs.writeFileSync('CLAUDE.md', `${before}${START}\nold managed text\n${END}${after}`);

    const pruned = [];
    copyClaudeMdFile(installContext(pruned), 'claude');

    const content = fs.readFileSync('CLAUDE.md', 'utf8');
    assert.ok(content.startsWith(before));
    assert.ok(content.endsWith(after));
    assert.ok(content.includes(TEMPLATE.trimEnd()));
    assert.equal(content.match(new RegExp(START, 'g')).length, 1);
    assert.deepEqual(pruned, ['../CLAUDE.md']);
  });
});

test('legacy pristine CLAUDE template migrates to one managed block', () => {
  inTempProject(() => {
    fs.writeFileSync('CLAUDE.md', TEMPLATE);
    const pruned = [];

    copyClaudeMdFile(installContext(pruned), 'claude');

    const content = fs.readFileSync('CLAUDE.md', 'utf8');
    assert.equal(content, `${START}\n${TEMPLATE.trimEnd()}\n${END}\n`);
    assert.equal(content.match(new RegExp(START, 'g')).length, 1);
    assert.deepEqual(pruned, ['../CLAUDE.md']);
  });
});

test('legacy shared AGENTS block migrates to one core marker', () => {
  inTempProject(() => {
    const shared = fs.readFileSync(path.join(__dirname, '../../src/common/AGENTS.md'), 'utf8');
    fs.writeFileSync(
      'AGENTS.md',
      `# User instructions\n\n<!-- CAFEKIT CLAUDE AGENTS START -->\n${shared.trimEnd()}\n<!-- CAFEKIT CLAUDE AGENTS END -->\n`
    );

    copyClaudeAgentsMdFile(installContext([]), 'claude');

    const content = fs.readFileSync('AGENTS.md', 'utf8');
    assert.equal((content.match(/<!-- CAFEKIT CORE START -->/g) || []).length, 1);
    assert.equal((content.match(/<!-- CAFEKIT CLAUDE AGENTS START -->/g) || []).length, 0);
    assert.ok(content.startsWith('# User instructions'));
  });
});
test('addressing changes remain inside the managed CLAUDE block', () => {
  inTempProject(() => {
    const userSection = '## Addressing (Context Overflow Indicator)\n\nUser-owned wording.';
    const managedSection = '## Addressing (Context Overflow Indicator)\n\nOld managed wording.';
    fs.writeFileSync(
      'CLAUDE.md',
      `${userSection}\n\n${START}\n${managedSection}\n${END}\n`
    );
    const ctx = {
      platforms: ['claude'],
      ui: { success() {}, warn() {} },
      t: () => 'updated'
    };

    configureAddressing(ctx, 'anh');

    const content = fs.readFileSync('CLAUDE.md', 'utf8');
    assert.ok(content.startsWith(`${userSection}\n\n${START}`));
    assert.ok(content.includes('Claude Code always addresses the user as "anh"'));
  });
});

test('addressing appends when template has no section without entering shared CORE', () => {
  inTempProject(() => {
    const templateWithoutAddressing = TEMPLATE
      .replace(/\n## Addressing \(Context Overflow Indicator\)[\s\S]*$/m, '')
      .trimEnd();
    fs.writeFileSync('CLAUDE.md', `${START}\n${templateWithoutAddressing}\n${END}\n`);
    fs.writeFileSync('AGENTS.md', upsertManagedCoreBlock('', SHARED_TEMPLATE));
    const ctx = {
      platforms: ['claude'],
      ui: { success() {}, warn() {} },
      t: () => 'updated'
    };

    configureAddressing(ctx, 'bro');

    const claude = fs.readFileSync('CLAUDE.md', 'utf8');
    const agents = fs.readFileSync('AGENTS.md', 'utf8');
    const core = agents.slice(agents.indexOf(CORE_START), agents.indexOf(CORE_END));
    assert.match(claude, /## Addressing \(Context Overflow Indicator\)/);
    assert.match(claude, /Claude Code always addresses the user as "bro"/);
    assert.doesNotMatch(core, /## Addressing \(Context Overflow Indicator\)/);
    assert.doesNotMatch(core, /always addresses the user as "bro"/);
  });
});

test('OpenCode force refresh preserves user and Codex AGENTS blocks', () => {
  inTempProject(() => {
    const userContent = '# User instructions\n\nKeep this exact.\n';
    const codexBlock = '<!-- CAFEKIT CODEX START -->\nCodex managed\n<!-- CAFEKIT CODEX END -->\n';
    fs.writeFileSync('AGENTS.md', `${userContent}\n${codexBlock}`);
    const results = { copied: 0, updated: 0, skipped: 0, missingDependencies: 0 };

    copyOpenCodeAgentsMdFile('opencode', results, { upgrade: true });

    const content = fs.readFileSync('AGENTS.md', 'utf8');
    assert.ok(content.startsWith(userContent));
    assert.ok(content.includes(codexBlock.trim()));
    assert.equal((content.match(/<!-- CAFEKIT OPENCODE START -->/g) || []).length, 1);
    assert.equal(results.updated, 1);
  });
});

test('legacy unmarked OpenCode AGENTS content is wrapped without duplication', () => {
  inTempProject(() => {
    const source = path.join(__dirname, '../../src/opencode/AGENTS.md');
    const legacy = normalizeOpenCodeBody(fs.readFileSync(source, 'utf8'));
    const codexBlock = '<!-- CAFEKIT CODEX START -->\nCodex managed\n<!-- CAFEKIT CODEX END -->\n';
    fs.writeFileSync('AGENTS.md', `${legacy}\n${codexBlock}`);
    const results = { copied: 0, updated: 0, skipped: 0, missingDependencies: 0 };

    copyOpenCodeAgentsMdFile('opencode', results, { upgrade: true });

    const content = fs.readFileSync('AGENTS.md', 'utf8');
    assert.equal((content.match(/<!-- CAFEKIT OPENCODE START -->/g) || []).length, 1);
    assert.ok(content.includes('## OpenCode Runtime Mapping'));
    assert.ok(content.includes(codexBlock.trim()));
  });
});

test('locale patch does not claim ownership of a preserved user runtime', () => {
  inTempProject(() => {
    fs.mkdirSync('.codex', { recursive: true });
    fs.writeFileSync(
      '.codex/runtime.json',
      `${JSON.stringify({ custom: true, locale: { responseLanguage: 'English' } })}\n`
    );
    const ctx = {
      platforms: ['codex'],
      locale: 'Tiếng Việt',
      lang: 'vi',
      trackers: {
        codex: {
          keyFor: () => '.codex/runtime.json',
          recorded: () => null,
          record: () => assert.fail('preserved runtime must not become installer-owned')
        }
      }
    };

    patchRuntimeLocale(ctx);

    const runtime = JSON.parse(fs.readFileSync('.codex/runtime.json', 'utf8'));
    assert.equal(runtime.custom, true);
    assert.equal(runtime.locale.responseLanguage, 'Tiếng Việt');
  });
});

test('backup restores existing targets and removes targets absent before the run', () => {
  inTempProject(() => {
    fs.mkdirSync('.claude/nested', { recursive: true });
    fs.writeFileSync('.claude/nested/runtime.txt', 'before\n');
    fs.writeFileSync('CLAUDE.md', 'user instructions\n');

    const backupDir = backup.snapshot(
      ['.claude', 'CLAUDE.md', '.gitignore'],
      '20260729-test'
    );
    const metadata = JSON.parse(
      fs.readFileSync(path.join(backupDir, 'snapshot.json'), 'utf8')
    );
    assert.deepEqual(metadata.targets, [
      { target: '.claude', existed: true },
      { target: 'CLAUDE.md', existed: true },
      { target: '.gitignore', existed: false }
    ]);

    fs.writeFileSync('.claude/nested/runtime.txt', 'after\n');
    fs.writeFileSync('CLAUDE.md', 'overwritten\n');
    fs.writeFileSync('.gitignore', 'generated\n');
    backup.restore(backupDir);

    assert.equal(fs.readFileSync('.claude/nested/runtime.txt', 'utf8'), 'before\n');
    assert.equal(fs.readFileSync('CLAUDE.md', 'utf8'), 'user instructions\n');
    assert.equal(fs.existsSync('.gitignore'), false);
    assert.equal(fs.existsSync(path.join(backupDir, 'snapshot.json')), true);
  });
});

test('backup preserves nested dependency symlinks without following them', () => {
  inTempProject(() => {
    fs.mkdirSync('.agents/skills/demo/.venv/bin', { recursive: true });
    fs.mkdirSync('toolchain', { recursive: true });
    fs.writeFileSync('toolchain/python3', 'project-owned target\n');
    const linkPath = '.agents/skills/demo/.venv/bin/python3';
    const linkTarget = '../../../../../toolchain/python3';
    fs.symlinkSync(linkTarget, linkPath);

    const backupDir = backup.snapshot(['.agents'], '20260729-nested-symlink');
    const backupLink = path.join(backupDir, 'data', linkPath);
    assert.equal(fs.lstatSync(backupLink).isSymbolicLink(), true);
    assert.equal(fs.readlinkSync(backupLink), linkTarget);

    fs.rmSync('.agents', { recursive: true, force: true });
    backup.restore(backupDir);

    assert.equal(fs.lstatSync(linkPath).isSymbolicLink(), true);
    assert.equal(fs.readlinkSync(linkPath), linkTarget);
    assert.equal(fs.readFileSync(linkPath, 'utf8'), 'project-owned target\n');
  });
});

test('backup rejects traversal targets before snapshot or restore deletion', () => {
  inTempProject(() => {
    assert.throws(
      () => backup.snapshot(['../outside'], '20260729-test'),
      /Unsafe backup target/
    );
  });
});

test('managed targets and snapshots reject project symlink traversal', () => {
  inTempProject((root) => {
    fs.mkdirSync('external', { recursive: true });
    fs.symlinkSync(
      path.join(root, 'external'),
      '.agents',
      process.platform === 'win32' ? 'junction' : 'dir'
    );

    const { createTracker } = require('../lib/manifest');
    const tracker = createTracker('.codex', 'test', {
      recordRoot: '.',
      allowedRoots: ['.codex', '.agents']
    });
    assert.throws(
      () => tracker.keyFor('.agents/skills/specs/SKILL.md'),
      /Refusing to follow symlinked managed path/
    );
    assert.throws(
      () => backup.snapshot(['.agents'], '20260729-symlink-test'),
      /Refusing to follow symlinked managed path/
    );
  });
});

test('managed Claude Addressing survives force refresh when template drops it', () => {
  inTempProject(() => {
    const before = '# User preface\n\n';
    const after = '\n\n## User tail\nKeep this exactly.\n';
    const configuredAddressing = '## Addressing (Context Overflow Indicator)\n\nThe AI always addresses the user as "anh" throughout the conversation.';
    fs.writeFileSync(
      'CLAUDE.md',
      `${before}${START}\nManaged line.\n\n${configuredAddressing}\n${END}${after}`
    );

    const pruned = [];
    copyClaudeMdFile(installContext(pruned), 'claude');

    const content = fs.readFileSync('CLAUDE.md', 'utf8');
    assert.ok(content.startsWith(before));
    assert.ok(content.endsWith(after));
    assert.ok(content.includes(TEMPLATE.trimEnd()));
    assert.equal((content.match(/## Addressing \(Context Overflow Indicator\)/g) || []).length, 1);
    assert.ok(content.includes('The AI always addresses the user as "anh"'));
    assert.equal(content.match(new RegExp(START, 'g')).length, 1);
    assert.deepEqual(pruned, ['../CLAUDE.md']);
  });
});

test('managed Codex block Addressing survives upsert with the current template', () => {
  inTempProject(() => {
    const codexTemplate = normalizeCodexBody(
      fs.readFileSync(path.join(__dirname, '../../src/codex/AGENTS.md'), 'utf8')
    );
    const userTop = '# User codex notes\n\n';
    const userBottom = '\n\n## User section\nKeep me.\n';
    const configuredAddressing = '## Addressing (Context Overflow Indicator)\n\nThe AI always addresses the user as "bro" throughout the conversation.';
    const existing =
      `${userTop}<!-- CAFEKIT CODEX START -->\nCodex runtime line.\n\n${configuredAddressing}\n<!-- CAFEKIT CODEX END -->${userBottom}`;

    const next = upsertManagedCodexBlock(existing, codexTemplate);

    assert.ok(next.startsWith(userTop));
    assert.ok(next.endsWith(userBottom));
    assert.ok(next.includes(codexTemplate.trim()));
    assert.equal((next.match(/## Addressing \(Context Overflow Indicator\)/g) || []).length, 1);
    assert.ok(next.includes('The AI always addresses the user as "bro"'));
    assert.equal((next.match(/<!-- CAFEKIT CODEX START -->/g) || []).length, 1);
  });
});

test('managed OpenCode block Addressing survives force refresh with the current template', () => {
  inTempProject(() => {
    const userContent = '# User instructions\n\nKeep this exact.\n';
    const codexBlock = '<!-- CAFEKIT CODEX START -->\nCodex managed\n<!-- CAFEKIT CODEX END -->\n';
    const configuredAddressing = '## Addressing (Context Overflow Indicator)\n\nThe AI always addresses the user as "anh" throughout the conversation.';
    fs.writeFileSync(
      'AGENTS.md',
      `${userContent}<!-- CAFEKIT OPENCODE START -->\nOpenCode runtime line.\n\n${configuredAddressing}\n<!-- CAFEKIT OPENCODE END -->\n${codexBlock}`
    );
    const results = { copied: 0, updated: 0, skipped: 0, missingDependencies: 0 };

    copyOpenCodeAgentsMdFile('opencode', results, { upgrade: true });

    const content = fs.readFileSync('AGENTS.md', 'utf8');
    assert.ok(content.startsWith(userContent));
    assert.ok(content.includes(codexBlock.trim()));
    assert.equal((content.match(/## Addressing \(Context Overflow Indicator\)/g) || []).length, 1);
    assert.ok(content.includes('The AI always addresses the user as "anh"'));
    assert.equal((content.match(/<!-- CAFEKIT OPENCODE START -->/g) || []).length, 1);
    assert.equal(results.updated, 1);
  });
});

test('copyRecursive skips generated artifacts while copying normal files', () => {
  inTempProject(() => {
    fs.mkdirSync('src/__pycache__', { recursive: true });
    fs.mkdirSync('src/extra', { recursive: true });
    fs.writeFileSync('src/normal.txt', 'normal\n');
    fs.writeFileSync('src/.coverage', 'coverage database\n');
    fs.writeFileSync('src/module.pyc', 'bytecode\n');
    fs.writeFileSync('src/__pycache__/module.pyc', 'cached bytecode\n');
    fs.writeFileSync('src/extra/bundle.pyo', 'pyo bytecode\n');

    copyRecursive('src', 'dest');

    assert.equal(fs.readFileSync('dest/normal.txt', 'utf8'), 'normal\n');
    assert.equal(fs.existsSync('dest/.coverage'), false);
    assert.equal(fs.existsSync('dest/__pycache__'), false);
    assert.equal(fs.existsSync('dest/module.pyc'), false);
    assert.equal(fs.existsSync('dest/extra/bundle.pyo'), false);
  });
});
