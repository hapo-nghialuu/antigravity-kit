'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const {
  normalizeCodexBody,
  transformManagedCodexContent,
  upsertManagedCodexBlock
} = require('../lib/codex-install');
const { createTracker } = require('../lib/manifest');
const { checkVersions } = require('../lib/version-check');
const {
  resolvePlatforms,
  selectLanguage
} = require('../phases/select-platform');
const { MESSAGES } = require('../lib/i18n');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const PACKAGE_VERSION = JSON.parse(
  fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')
).version;
const INSTALLER = path.join(PACKAGE_ROOT, 'bin/install.js');
const MANIFEST = JSON.parse(
  fs.readFileSync(path.join(PACKAGE_ROOT, 'src/claude/migration-manifest.json'), 'utf8')
);

function inTempProject(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-native-'));
  try {
    return run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function install(root, extraArgs = []) {
  return spawnSync(
    process.execPath,
    [INSTALLER, '--platform', 'codex', '--yes', ...extraArgs],
    {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, PATH: '/usr/bin:/bin' }
    }
  );
}

function allFiles(root, predicate) {
  const found = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) found.push(...allFiles(target, predicate));
    else if (predicate(target)) found.push(target);
  }
  return found;
}

function allHookHandlers(config) {
  return Object.values(config.hooks).flatMap((groups) => (
    groups.flatMap((group) => group.hooks)
  ));
}

function parseGeneratedTomlString(content, key) {
  const match = content.match(new RegExp(`^${key} = (.+)$`, 'm'));
  assert.ok(match, `missing TOML key: ${key}`);
  return JSON.parse(match[1]);
}

test('Codex payload transform emits native skill and subagent syntax', () => {
  const transformed = normalizeCodexBody(
    'Agent(subagent_type="implementer", prompt="Implement it", description="Code Feature")\n' +
    'Use `/specs auth`, `SendMessage`, `Bash`, `Read`, and `Edit`.'
  );

  assert.match(
    transformed,
    /spawn_agent\(agent_type="implementer", fork_turns="none", message="Implement it", task_name="code_feature"\)/
  );
  assert.match(transformed, /\$hapo-specs auth/);
  assert.match(transformed, /`send_message`/);
  assert.match(transformed, /`exec_command`/);
  assert.match(transformed, /`apply_patch`/);
  assert.doesNotMatch(transformed, /Agent\(|subagent_type|\/specs\b|Claude Code/);
});

test('Codex payload transform preserves executable keyword arguments', () => {
  const transformed = normalizeCodexBody(
    'parser = ArgumentParser(description="Analyze it")\n' +
    'result = client.generate(prompt=prompt)\n' +
    'skills = ".claude/skills"\n',
    '/fixture/tool.py'
  );

  assert.match(transformed, /description="Analyze it"/);
  assert.match(transformed, /prompt=prompt/);
  assert.match(transformed, /skills = "\.agents\/skills"/);
  assert.doesNotMatch(transformed, /task_name=|message=prompt/);
});

test('Codex managed AGENTS block preserves malformed marker topologies', () => {
  const malformed = [
    'user before\n<!-- CAFEKIT CODEX START -->\nuser tail\n',
    'user before\n<!-- CAFEKIT CODEX END -->\nuser tail\n',
    '<!-- CAFEKIT CODEX END -->\nuser\n<!-- CAFEKIT CODEX START -->\n',
    '<!-- CAFEKIT CODEX START -->\na\n<!-- CAFEKIT CODEX START -->\nb\n<!-- CAFEKIT CODEX END -->\n',
    '<!-- CAFEKIT CODEX START -->\na\n<!-- CAFEKIT CODEX END -->\nb\n<!-- CAFEKIT CODEX END -->\n'
  ];
  for (const content of malformed) {
    assert.equal(upsertManagedCodexBlock(content, 'replacement'), content);
    assert.equal(transformManagedCodexContent(content, () => 'replacement'), content);
  }
});

test('platform resolver keeps saved runtimes and newly detected Codex', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-detect-'));
  const originalCwd = process.cwd();
  try {
    for (const folder of ['.claude', '.opencode', '.codex']) {
      fs.mkdirSync(path.join(root, folder), { recursive: true });
    }
    fs.writeFileSync(
      path.join(root, '.claude', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'claude' })}\n`
    );
    process.chdir(root);
    const ctx = {
      options: { platforms: [], forceOverwrite: false },
      interactive: false,
      dryRun: false,
      ui: { info() {} },
      t: (key) => key
    };
    await resolvePlatforms(ctx);
    assert.deepEqual(ctx.platforms, ['claude', 'opencode', 'codex']);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('explicit Codex install restores the Codex locale first', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-locale-'));
  const originalCwd = process.cwd();
  try {
    for (const [folder, responseLanguage] of [
      ['.claude', '日本語'],
      ['.codex', 'Tiếng Việt']
    ]) {
      fs.mkdirSync(path.join(root, folder), { recursive: true });
      fs.writeFileSync(
        path.join(root, folder, 'runtime.json'),
        `${JSON.stringify({ locale: { responseLanguage } })}\n`
      );
    }
    process.chdir(root);
    const ctx = {
      options: { platforms: ['codex'] },
      interactive: false,
      lang: 'en',
      setLang(code, locale) {
        this.lang = code;
        this.locale = locale;
      },
      ui: { info() {} },
      t: (key) => key
    };
    await selectLanguage(ctx);
    assert.equal(ctx.locale, 'Tiếng Việt');
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('same-version install can add Codex beside an existing runtime', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-version-'));
  const originalCwd = process.cwd();
  try {
    fs.mkdirSync(path.join(root, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(root, '.claude', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'claude' })}\n`
    );
    process.chdir(root);
    const ctx = {
      platforms: ['claude', 'codex'],
      dryRun: false,
      interactive: false,
      options: { forceOverwrite: false },
      ui: { info() {}, warn() {} }
    };
    await checkVersions(ctx);
    assert.notEqual(ctx.cancelled, true);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('resolvePlatforms interactive prompts to add more platforms when prior install exists', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-add-platforms-'));
  const originalCwd = process.cwd();
  try {
    fs.mkdirSync(path.join(root, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(root, '.claude', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'claude' })}\n`
    );
    process.chdir(root);
    const ctx = {
      options: { platforms: [], forceOverwrite: false },
      interactive: true,
      dryRun: false,
      ui: {
        info() {},
        confirm: async ({ message }) => {
          if (message.includes('Existing platforms') || message.includes('addPlatformsPrompt')) return true;
          if (message.includes('confirmAllDetected') || message.includes('existing configs')) return true;
          return true;
        },
        select: async ({ message, options }) => {
          if (message.includes('selectPlatform') || message.includes('Select platform')) {
            return ['codex'];
          }
          return options[0].value;
        },
        isCancel: () => false
      },
      t: (key, vars) => {
        const tpl = (MESSAGES.en && MESSAGES.en[key]) || key;
        if (vars) return tpl.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? String(vars[name]) : `{${name}}`));
        return tpl;
      }
    };
    await resolvePlatforms(ctx);
    assert.deepEqual(ctx.platforms.sort(), ['claude', 'codex'].sort());
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('resolvePlatforms interactive keeps existing platforms when user declines to add more', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-keep-platforms-'));
  const originalCwd = process.cwd();
  try {
    fs.mkdirSync(path.join(root, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(root, '.claude', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'claude' })}\n`
    );
    process.chdir(root);
    const ctx = {
      options: { platforms: [], forceOverwrite: false },
      interactive: true,
      dryRun: false,
      ui: {
        info() {},
        confirm: async ({ message }) => {
          // Check that the message is properly rendered without {names} placeholder
          // If i18n uses {existing} but ctx passes {names}, the rendered message will contain {existing}
          if (message.includes('Existing platforms') || message.includes('既存プラットフォーム') || message.includes('Nền tảng hiện có')) {
            assert.ok(!message.includes('{'), `Message should not contain unrendered placeholder: ${message}`);
            assert.ok(!message.includes('}'), `Message should not contain unrendered placeholder: ${message}`);
            return false; // decline to add more
          }
          return true; // confirmAllDetected
        },
        select: async () => ['claude'],
        isCancel: () => false
      },
      t: (key, vars) => {
        const tpl = (MESSAGES.en && MESSAGES.en[key]) || key;
        if (vars) return tpl.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? String(vars[name]) : `{${name}}`));
        return tpl;
      }
    };
    await resolvePlatforms(ctx);
    assert.deepEqual(ctx.platforms, ['claude']);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('addPlatformsPrompt placeholder consistency across all locales', () => {
  const expectedPlaceholders = ['names'];
  const placeholderRegex = /\{(\w+)\}/g;

  for (const [locale, messages] of Object.entries(MESSAGES)) {
    const template = messages.addPlatformsPrompt;
    assert.ok(template, `Missing addPlatformsPrompt key in locale: ${locale}`);

    const placeholders = [];
    let match;
    while ((match = placeholderRegex.exec(template)) !== null) {
      placeholders.push(match[1]);
    }

    assert.deepEqual(
      placeholders,
      expectedPlaceholders,
      `Locale ${locale} addPlatformsPrompt has incorrect placeholders. Template: "${template}". Expected: ${JSON.stringify(expectedPlaceholders)}, Got: ${JSON.stringify(placeholders)}`
    );
  }
});

test('same-version non-interactive install performs a selective refresh', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-version-'));
  const originalCwd = process.cwd();
  try {
    fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
    fs.writeFileSync(
      path.join(root, '.codex', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'codex' })}\n`
    );
    process.chdir(root);
    const messages = [];
    const ctx = {
      platforms: ['codex'],
      dryRun: false,
      interactive: false,
      options: { forceOverwrite: false },
      ui: { info(message) { messages.push(message); }, warn() {} },
      t: (key) => key
    };
    await checkVersions(ctx);
    assert.notEqual(ctx.cancelled, true);
    assert.equal(ctx.options.forceOverwrite, false);
    assert.deepEqual(messages, ['versionRefreshing']);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('same-version interactive refresh does not enable force overwrite', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-version-'));
  const originalCwd = process.cwd();
  try {
    fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
    fs.writeFileSync(
      path.join(root, '.codex', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'codex' })}\n`
    );
    process.chdir(root);
    const ctx = {
      platforms: ['codex'],
      dryRun: false,
      interactive: true,
      options: { forceOverwrite: false },
      ui: {
        info() {},
        warn() {},
        select: async () => 'refresh',
        isCancel: () => false
      },
      t: (key) => key
    };
    await checkVersions(ctx);
    assert.notEqual(ctx.cancelled, true);
    assert.equal(ctx.options.forceOverwrite, false);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('mixed runtime versions update the stale Codex install', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-version-'));
  const originalCwd = process.cwd();
  try {
    for (const [folder, platform, version] of [
      ['.claude', 'claude', PACKAGE_VERSION],
      ['.codex', 'codex', '0.14.1']
    ]) {
      fs.mkdirSync(path.join(root, folder), { recursive: true });
      fs.writeFileSync(
        path.join(root, folder, 'cafekit.json'),
        `${JSON.stringify({ version, platform })}\n`
      );
    }
    process.chdir(root);
    const ctx = {
      platforms: ['claude', 'codex'],
      dryRun: false,
      interactive: false,
      options: { forceOverwrite: false },
      ui: { info() {}, warn() {} }
    };
    await checkVersions(ctx);
    assert.notEqual(ctx.cancelled, true);
    assert.equal(ctx.isUpdate, true);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Codex ownership rejects files outside its split managed roots', () => {
  inTempProject((root) => {
    const originalCwd = process.cwd();
    process.chdir(root);
    try {
      const tracker = createTracker('.codex', PACKAGE_VERSION, {
        recordRoot: '.',
        allowedRoots: ['.codex', '.agents']
      });
      assert.throws(() => tracker.keyFor('AGENTS.md'), /outside allowed roots/);
      assert.equal(tracker.keyFor('.agents/skills/specs/SKILL.md'), '.agents/skills/specs/SKILL.md');
    } finally {
      process.chdir(originalCwd);
    }
  });
});

test('Codex dry-run leaves both managed roots untouched', () => {
  inTempProject((root) => {
    const result = install(root, ['--dry-run']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.equal(fs.existsSync(path.join(root, '.codex')), false);
    assert.equal(fs.existsSync(path.join(root, '.agents')), false);
    assert.equal(fs.existsSync(path.join(root, 'AGENTS.md')), false);
    assert.equal(fs.existsSync(path.join(root, '.gitignore')), false);
  });
});

test('Codex Windows hook launchers stay project-bound without Git from nested cwd', () => {
  inTempProject((root) => {
    const projectRoot = path.join(root, 'project with spaces');
    fs.mkdirSync(projectRoot, { recursive: true });
    const installed = install(projectRoot);
    assert.equal(installed.status, 0, `${installed.stdout}\n${installed.stderr}`);

    const config = JSON.parse(
      fs.readFileSync(path.join(projectRoot, '.codex', 'hooks.json'), 'utf8')
    );
    const handlers = allHookHandlers(config);
    assert.equal(handlers.length, 14);
    for (const handler of handlers) {
      assert.doesNotMatch(handler.commandWindows, /\$\(/);
      assert.doesNotMatch(handler.commandWindows, /\bgit\b/i);
      assert.doesNotMatch(handler.commandWindows, /process\.cwd\(\)|existsSync/);
      const encodedPath = handler.commandWindows.match(/\s([A-Za-z0-9_-]+)$/)?.[1];
      assert.ok(encodedPath, `missing encoded hook path in: ${handler.commandWindows}`);
      const target = Buffer.from(encodedPath, 'base64url').toString('utf8');
      assert.equal(path.dirname(target), fs.realpathSync(path.join(projectRoot, '.codex', 'hooks')));
      assert.equal(
        fs.existsSync(target),
        true,
        `missing installed hook: ${path.basename(target)}`
      );
    }

    const nested = path.join(projectRoot, 'nested', 'workspace');
    fs.mkdirSync(nested, { recursive: true });
    const shadowHooks = path.join(projectRoot, 'nested', '.codex', 'hooks');
    const shadowMarker = path.join(root, 'shadow-hook-ran');
    fs.mkdirSync(shadowHooks, { recursive: true });
    fs.writeFileSync(
      path.join(shadowHooks, 'session.cjs'),
      `require('node:fs').writeFileSync(${JSON.stringify(shadowMarker)}, 'unsafe')\n`
    );
    const session = config.hooks.SessionStart[0].hooks[0];
    const nodeCommand = session.commandWindows.replace(/^node /, `"${process.execPath}" `);
    const noGitEnv = { ...process.env, PATH: '' };
    const launched = spawnSync(nodeCommand, {
      cwd: nested,
      encoding: 'utf8',
      input: JSON.stringify({
        session_id: 'windows-launcher-test',
        cwd: nested,
        hook_event_name: 'SessionStart',
        source: 'startup'
      }),
      env: noGitEnv,
      shell: true
    });
    assert.equal(launched.status, 0, launched.stderr);
    assert.match(launched.stdout, /Session startup\./);
    assert.match(launched.stdout, /CafeKit project root:/);
    assert.equal(fs.existsSync(shadowMarker), false);
  });
});

test('Codex install is project-local, native, and upgrade-safe', () => {
  inTempProject((root) => {
    const userInstructions = '# User rules\n\nKeep this exact.\n';
    fs.writeFileSync(path.join(root, 'AGENTS.md'), userInstructions);

    const first = install(root);
    assert.equal(first.status, 0, `${first.stdout}\n${first.stderr}`);
    assert.equal(fs.existsSync(path.join(root, '.claude')), false);
    assert.equal(fs.existsSync(path.join(root, '.opencode')), false);
    assert.equal(fs.existsSync(path.join(root, '.codex', 'config.toml')), false);

    for (const relative of [
      '.codex/hooks.json',
      '.codex/runtime.json',
      '.codex/hooks/privacy-block.cjs',
      '.codex/rules/workflow.md',
      '.codex/rules/hook-protocols.md',
      '.codex/scripts/validate-spec-output.cjs',
      '.agents/.gitignore',
      '.agents/skills/specs/SKILL.md'
    ]) {
      assert.equal(fs.existsSync(path.join(root, relative)), true, `missing ${relative}`);
    }

    const agentsGitignore = fs.readFileSync(
      path.join(root, '.agents', '.gitignore'),
      'utf8'
    );
    assert.match(agentsGitignore, /skills\/\*\*\/\.venv\//);
    assert.match(agentsGitignore, /skills\/\*\*\/node_modules\//);
    assert.match(agentsGitignore, /!skills\/\*\*\/\.env\.example/);

    if (process.platform !== 'win32') {
      for (const [sourceRelative, installedRelative] of [
        ['src/claude/scripts/validate-spec-output.cjs', '.codex/scripts/validate-spec-output.cjs'],
        ['src/claude/skills/chrome-devtools/scripts/install.sh', '.agents/skills/chrome-devtools/scripts/install.sh'],
        ['src/claude/skills/ai-multimodal/scripts/check_setup.py', '.agents/skills/ai-multimodal/scripts/check_setup.py']
      ]) {
        const sourceMode = fs.statSync(path.join(PACKAGE_ROOT, sourceRelative)).mode & 0o111;
        const installedMode = fs.statSync(path.join(root, installedRelative)).mode & 0o111;
        assert.notEqual(sourceMode, 0, `fixture should be executable: ${sourceRelative}`);
        assert.equal(installedMode, sourceMode, `execute bits differ: ${installedRelative}`);
      }
    }

    for (const fileName of MANIFEST.agents.required) {
      const name = path.basename(fileName, '.md').replace(/-/g, '_');
      const agentPath = path.join(root, '.codex', 'agents', `${name}.toml`);
      const content = fs.readFileSync(agentPath, 'utf8');
      assert.equal(parseGeneratedTomlString(content, 'name'), name);
      assert.ok(parseGeneratedTomlString(content, 'description').length > 8);
      assert.ok(parseGeneratedTomlString(content, 'developer_instructions').length > 20);
    }

    const skillFiles = allFiles(
      path.join(root, '.agents', 'skills'),
      (file) => path.basename(file) === 'SKILL.md'
    );
    const skillNames = skillFiles.map((file) => {
      const match = fs.readFileSync(file, 'utf8').match(/^name:\s*(.+)$/m);
      assert.ok(match, `missing skill name in ${file}`);
      return match[1].trim();
    });
    assert.ok(skillNames.length >= 20);
    assert.equal(new Set(skillNames).size, skillNames.length);
    assert.ok(skillNames.every((name) => /^[a-z0-9-]+$/.test(name)));

    const catalog = spawnSync(
      process.execPath,
      [path.join(root, '.codex', 'scripts', 'generate-skill-catalog.cjs'), '--json'],
      { cwd: root, encoding: 'utf8' }
    );
    assert.equal(catalog.status, 0, catalog.stderr);
    const catalogData = JSON.parse(catalog.stdout);
    assert.equal(catalogData.total, skillNames.length);
    assert.equal(
      catalogData.root,
      fs.realpathSync(path.join(root, '.agents', 'skills'))
    );

    const dockerScript = fs.readFileSync(
      path.join(root, '.agents', 'skills', 'devops', 'scripts', 'docker_optimize.py'),
      'utf8'
    );
    assert.match(dockerScript, /description="Analyze Dockerfile for optimization opportunities"/);
    assert.doesNotMatch(dockerScript, /task_name="analyze_dockerfile/);

    const multimodalScript = fs.readFileSync(
      path.join(root, '.agents', 'skills', 'ai-multimodal', 'scripts', 'gemini_batch_process.py'),
      'utf8'
    );
    assert.match(multimodalScript, /prompt=prompt/);
    assert.doesNotMatch(multimodalScript, /message=prompt/);

    const modelVisibleFiles = [
      path.join(root, 'AGENTS.md'),
      ...allFiles(path.join(root, '.codex', 'agents'), (file) => file.endsWith('.toml')),
      ...allFiles(path.join(root, '.codex', 'rules'), (file) => file.endsWith('.md')),
      ...allFiles(path.join(root, '.agents', 'skills'), (file) => file.endsWith('.md'))
    ];
    const visible = modelVisibleFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
    assert.doesNotMatch(visible, /\bAgent\(|subagent_type|`Agent`|\bSendMessage\b|\/hapo:|\bhapo:|Claude Code/);
    assert.doesNotMatch(visible, /@@PRIVACY_PROMPT_START@@|Claude Tasks/);
    assert.match(visible, /\$hapo-specs/);

    const agentsMd = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
    assert.ok(agentsMd.startsWith(userInstructions));
    assert.equal((agentsMd.match(/<!-- CAFEKIT CODEX START -->/g) || []).length, 1);
    assert.match(agentsMd, /fork_turns: "none"/);
    assert.match(agentsMd, /repository is trusted/);

    const ownership = JSON.parse(
      fs.readFileSync(path.join(root, '.codex', 'cafekit-manifest.json'), 'utf8')
    );
    assert.ok(Object.keys(ownership.files).every((key) => (
      (key.startsWith('.codex/') || key.startsWith('.agents/')) && !key.includes('../')
    )));

    const questionSkill = path.join(root, '.agents', 'skills', 'question', 'SKILL.md');
    fs.appendFileSync(questionSkill, '\nUSER-CODEX-SENTINEL\n');

    const sameVersion = install(root);
    assert.equal(sameVersion.status, 0, `${sameVersion.stdout}\n${sameVersion.stderr}`);
    assert.match(fs.readFileSync(questionSkill, 'utf8'), /USER-CODEX-SENTINEL/);

    const metadataPath = path.join(root, '.codex', 'cafekit.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    metadata.version = '0.14.1';
    fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);

    const upgrade = install(root);
    assert.equal(upgrade.status, 0, `${upgrade.stdout}\n${upgrade.stderr}`);
    assert.match(fs.readFileSync(questionSkill, 'utf8'), /USER-CODEX-SENTINEL/);
    assert.ok(fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8').startsWith(userInstructions));

    const forced = install(root, ['--force-overwrite']);
    assert.equal(forced.status, 0, `${forced.stdout}\n${forced.stderr}`);
    assert.doesNotMatch(fs.readFileSync(questionSkill, 'utf8'), /USER-CODEX-SENTINEL/);
  });
});

test('Codex install on top of existing Claude installation preserves content and adds Codex', () => {
  inTempProject((root) => {
    // Setup existing Claude installation with content
    fs.mkdirSync(path.join(root, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(root, '.claude', 'cafekit.json'),
      `${JSON.stringify({ version: PACKAGE_VERSION, platform: 'claude' })}\n`
    );

    // Existing CLAUDE.md with content
    const claudeMdContent = '# CLAUDE.md\n\n## User Instructions\n\nThis is my existing CLAUDE.md content.\n';
    fs.writeFileSync(path.join(root, 'CLAUDE.md'), claudeMdContent);

    // Existing AGENTS.md with content
    const agentsMdContent = '# AGENTS.md\n\n## User Rules\n\nKeep this exact.\n';
    fs.writeFileSync(path.join(root, 'AGENTS.md'), agentsMdContent);

    // Run Codex install
    const result = install(root, ['--platform', 'codex']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    // Assert .claude/ and its content still exist
    assert.equal(fs.existsSync(path.join(root, '.claude')), true, '.claude should exist');
    assert.equal(fs.existsSync(path.join(root, '.claude', 'cafekit.json')), true, '.claude/cafekit.json should exist');
    const claudeMetadata = JSON.parse(fs.readFileSync(path.join(root, '.claude', 'cafekit.json'), 'utf8'));
    assert.equal(claudeMetadata.platform, 'claude', '.claude/cafekit.json should still be claude platform');

    // Assert .codex/ is created with payload
    assert.equal(fs.existsSync(path.join(root, '.codex')), true, '.codex should be created');
    assert.equal(fs.existsSync(path.join(root, '.codex', 'hooks.json')), true, '.codex/hooks.json should exist');
    assert.equal(fs.existsSync(path.join(root, '.codex', 'runtime.json')), true, '.codex/runtime.json should exist');
    assert.equal(fs.existsSync(path.join(root, '.codex', 'hooks', 'privacy-block.cjs')), true, '.codex/hooks/privacy-block.cjs should exist');
    assert.equal(fs.existsSync(path.join(root, '.codex', 'rules', 'workflow.md')), true, '.codex/rules/workflow.md should exist');
    assert.equal(fs.existsSync(path.join(root, '.codex', 'scripts', 'validate-spec-output.cjs')), true, '.codex/scripts/validate-spec-output.cjs should exist');
    assert.equal(fs.existsSync(path.join(root, '.agents', '.gitignore')), true, '.agents/.gitignore should exist');
    assert.equal(fs.existsSync(path.join(root, '.agents', 'skills', 'specs', 'SKILL.md')), true, '.agents/skills/specs/SKILL.md should exist');

    // Assert .codex/cafekit.json has platform codex
    const codexMetadata = JSON.parse(fs.readFileSync(path.join(root, '.codex', 'cafekit.json'), 'utf8'));
    assert.equal(codexMetadata.platform, 'codex', '.codex/cafekit.json should have platform codex');
    assert.equal(codexMetadata.version, PACKAGE_VERSION, '.codex/cafekit.json should have current version');

    // Assert AGENTS.md root contains CODEX markers AND preserves original content
    const agentsMd = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
    assert.match(agentsMd, /<!-- CAFEKIT CODEX START -->/, 'AGENTS.md should have CODEX START marker');
    assert.match(agentsMd, /<!-- CAFEKIT CODEX END -->/, 'AGENTS.md should have CODEX END marker');
    assert.match(agentsMd, /Keep this exact\./, 'AGENTS.md should preserve original user content');
    assert.ok(agentsMd.startsWith(agentsMdContent), 'AGENTS.md should start with original user content');

    // Assert CLAUDE.md is unchanged
    const claudeMd = fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8');
    assert.equal(claudeMd, claudeMdContent, 'CLAUDE.md should be unchanged');
  });
});
