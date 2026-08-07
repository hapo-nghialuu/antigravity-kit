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
const RUNTIMES = {
  claude: { root: '.claude', rules: '.claude/hooks/rules.cjs' },
  codex: { root: '.codex', rules: '.codex/hooks/rules.cjs' },
  opencode: { root: '.opencode', rules: '.opencode/plugins/rules.ts' },
};

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

function installPacked(tarball, root) {
  fs.mkdirSync(root, { recursive: true });
  const result = spawnSync('npm', [
    'install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund',
    '--package-lock=false', '--prefix', root, tarball,
  ], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const installer = path.join(root, 'node_modules', '@haposoft', 'cafekit', 'bin', 'install.js');
  assert.ok(fs.existsSync(installer), 'npm install must resolve packed package bin');
  return installer;
}

function runInstaller(installer, root, platforms, lang) {
  const args = ['--platform', platforms.join(','), '--yes'];
  if (lang) args.push('--lang', lang);
  const result = spawnSync(process.execPath, [installer, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, HOME: path.join(root, 'home'), PATH: '/usr/bin:/bin' },
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
}

function managedBlock(content, start, end) {
  const startIndex = content.indexOf(start);
  const endIndex = content.indexOf(end);
  assert.ok(startIndex >= 0 && endIndex > startIndex, `missing managed block: ${start}`);
  return content.slice(startIndex + start.length, endIndex);
}

function assertCombinedInstructionIsolation(root) {
  const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
  const claude = fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8');
  const core = managedBlock(agents, '<!-- CAFEKIT CORE START -->', '<!-- CAFEKIT CORE END -->');
  const claudeBlock = managedBlock(claude, '<!-- CAFEKIT CLAUDE START -->', '<!-- CAFEKIT CLAUDE END -->');
  const codexBlock = managedBlock(agents, '<!-- CAFEKIT CODEX START -->', '<!-- CAFEKIT CODEX END -->');
  const opencodeBlock = managedBlock(agents, '<!-- CAFEKIT OPENCODE START -->', '<!-- CAFEKIT OPENCODE END -->');

  for (const [content, marker] of [
    [agents, '<!-- CAFEKIT CORE START -->'],
    [agents, '<!-- CAFEKIT CODEX START -->'],
    [agents, '<!-- CAFEKIT OPENCODE START -->'],
    [claude, '<!-- CAFEKIT CLAUDE START -->']
  ]) assert.equal((content.match(new RegExp(marker, 'g')) || []).length, 1);

  assert.doesNotMatch(core, /Claude|Codex|OpenCode|\.claude|\.codex|\.opencode|\/hapo:|\$hapo-/i);
  assert.doesNotMatch(claudeBlock, /Codex|OpenCode|\.codex|\.opencode|\$hapo-/i);
  assert.match(codexBlock, /native project instruction surface is root `AGENTS\.md`/);
  assert.match(opencodeBlock, /native project instruction surface is root `AGENTS\.md`/);
  assert.match(agents, /shared-root trade-off is intentional/);
  // H5 ownership/ignore contract
  assert.match(core, /runtime-neutral/i);
  assert.match(core, /fail-safe/i);
  assert.match(codexBlock, /owned by Codex/i);
  assert.match(codexBlock, /ignore this entire Codex block/i);
  assert.match(opencodeBlock, /owned by OpenCode/i);
  assert.match(opencodeBlock, /ignore this entire OpenCode block/i);
  assert.doesNotMatch(core, /\$hapo-|hapo:/i);
  assert.doesNotMatch(claudeBlock, /<!-- CAFEKIT (CODEX|OPENCODE) /);
}
function stableInstallSnapshot(root, platforms) {
  const files = ['AGENTS.md', 'CLAUDE.md', '.gitignore'];
  for (const platform of platforms) files.push(RUNTIMES[platform].root);
  const snapshot = {};
  for (const file of files) {
    const absolute = path.join(root, file);
    if (!fs.existsSync(absolute)) continue;
    const walk = (current, relative = '') => {
      const stat = fs.lstatSync(current);
      if (stat.isDirectory()) {
        for (const entry of fs.readdirSync(current).sort()) walk(path.join(current, entry), path.join(relative, entry));
      } else {
        if (path.basename(current) === 'cafekit.json') {
          const metadata = JSON.parse(fs.readFileSync(current, 'utf8'));
          delete metadata.lastInstalledAt;
          snapshot[path.join(file, relative)] = Buffer.from(`${JSON.stringify(metadata, null, 2)}\n`);
        } else {
          snapshot[path.join(file, relative)] = fs.readFileSync(current);
        }
      }
    };
    walk(absolute);
  }
  return snapshot;
}

function assertHookLanguage(root, platform, lang, sessionId) {
  const runtime = RUNTIMES[platform];
  const runtimeJson = JSON.parse(fs.readFileSync(path.join(root, runtime.root, 'runtime.json'), 'utf8'));
  assert.equal(runtimeJson.locale.responseLanguage, lang || null);
  const rulesPath = path.join(root, runtime.rules);
  assert.ok(fs.existsSync(rulesPath), `installed rules path missing: ${rulesPath}`);
  if (platform === 'opencode') {
    const plugin = fs.readFileSync(rulesPath, 'utf8');
    assert.match(plugin, /if \(respondLang\)/);
    assert.match(plugin, /Respond in \$\{respondLang\}/);
    return;
  }
  const result = spawnSync(process.execPath, [rulesPath], {
    cwd: root,
    input: JSON.stringify({ cwd: root, session_id: sessionId }),
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  if (lang) assert.match(result.stdout, /Respond in vi/);
  else assert.doesNotMatch(result.stdout, /Respond in/);
}

function assertInstalledScripts(root, platform) {
  const scripts = path.join(root, RUNTIMES[platform].root, 'scripts');
  const policy = path.join(scripts, 'workflow-policy.cjs');
  const scanner = path.join(scripts, 'scan-staged-secrets.cjs');
  assert.ok(fs.existsSync(policy), `installed policy missing: ${policy}`);
  assert.ok(fs.existsSync(scanner), `installed scanner missing: ${scanner}`);

  const policyRun = spawnSync(process.execPath, [policy, '--json'], { cwd: root, encoding: 'utf8' });
  assert.equal(policyRun.status, 0, `${policyRun.stdout}\n${policyRun.stderr}`);
  assert.equal(JSON.parse(policyRun.stdout).contract, 'execution-policy');

  const safe = path.join(root, 'safe.txt');
  fs.writeFileSync(safe, 'mode=safe\n');
  spawnSync('git', ['init', '-q'], { cwd: root });
  spawnSync('git', ['add', 'safe.txt'], { cwd: root });
  const scannerRun = spawnSync(process.execPath, [scanner], { cwd: root, encoding: 'utf8' });
  assert.equal(scannerRun.status, 0, `${scannerRun.stdout}\n${scannerRun.stderr}`);
  assert.match(scannerRun.stdout, /No staged secrets found/);
}

function assertTransforms(root, platform) {
  const skill = path.join(root, RUNTIMES[platform].root === '.codex' ? '.agents/skills' : `${RUNTIMES[platform].root}/skills`, 'develop', 'SKILL.md');
  const content = fs.readFileSync(skill, 'utf8');
  if (platform === 'codex') {
    assert.match(content, /\$hapo-develop/);
    assert.doesNotMatch(content, /\/hapo:develop/);
  } else {
    assert.match(content, /\/hapo:develop/);
  }
  assert.ok(fs.existsSync(path.join(root, RUNTIMES[platform].root, 'agents')) || platform === 'codex');
}

test('npm dry-run inventory is deterministic and preserves runtime payload', () => {
  const first = npmPack(['--dry-run', '--json'], PACKAGE_ROOT);
  const second = npmPack(['--dry-run', '--json'], PACKAGE_ROOT);
  const firstInventory = first.files.map(({ path: filePath }) => filePath).sort();
  const secondInventory = second.files.map(({ path: filePath }) => filePath).sort();
  assert.deepEqual(firstInventory, secondInventory);
  assertCleanInventory(firstInventory);
});

test('packed tarball installer matrix proves locale, transforms, paths, and rerun safety', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-package-matrix-'));
  const destination = path.join(root, 'pack');
  fs.mkdirSync(destination, { recursive: true });
  try {
    const packed = npmPack(['--pack-destination', destination, '--json'], PACKAGE_ROOT);
    const tarball = path.join(destination, packed.filename);
    assertCleanInventory(packedInventory(tarball));

    const cases = [
      { name: 'claude', platforms: ['claude'] },
      { name: 'codex', platforms: ['codex'] },
      { name: 'opencode', platforms: ['opencode'] },
      { name: 'combined', platforms: ['claude', 'codex', 'opencode'] },
      { name: 'combined-rerun', platforms: ['claude', 'codex', 'opencode'], rerun: true },
    ];
    for (const matrixCase of cases) {
      for (const lang of [null, 'vi']) {
        const project = path.join(root, `${matrixCase.name}-${lang ? 'lang-vi' : 'no-lang'}`);
        const installer = installPacked(tarball, project);
        runInstaller(installer, project, matrixCase.platforms, lang);
        for (const platform of matrixCase.platforms) {
          assertHookLanguage(project, platform, lang, `${project}-${matrixCase.name}-${lang || 'none'}`);
          assertInstalledScripts(project, platform);
          assertTransforms(project, platform);
        }
        if (matrixCase.platforms.length === 3) assertCombinedInstructionIsolation(project);
        if (matrixCase.rerun) {
          fs.appendFileSync(path.join(project, 'AGENTS.md'), '\n## User matrix note\nKeep this exact.\n');
          fs.appendFileSync(path.join(project, 'CLAUDE.md'), '\n## User Claude matrix note\nKeep this exact.\n');
          const before = stableInstallSnapshot(project, matrixCase.platforms);
          runInstaller(installer, project, matrixCase.platforms, lang);
          const after = stableInstallSnapshot(project, matrixCase.platforms);
          const changed = [...new Set([...Object.keys(before), ...Object.keys(after)])]
            .filter((file) => !before[file] || !after[file] || !before[file].equals(after[file]));
          assert.deepEqual(changed, [], `${matrixCase.name} rerun must be byte-idempotent`);
          assertCombinedInstructionIsolation(project);
          assert.match(fs.readFileSync(path.join(project, 'AGENTS.md'), 'utf8'), /User matrix note\nKeep this exact\./);
          assert.match(fs.readFileSync(path.join(project, 'CLAUDE.md'), 'utf8'), /User Claude matrix note\nKeep this exact\./);
        }
      }
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
