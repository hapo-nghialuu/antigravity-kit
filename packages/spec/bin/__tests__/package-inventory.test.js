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
  'src/claude/scripts/provenance.cjs',
  'src/claude/scripts/spec-receipt.cjs',
  'src/claude/scripts/spec-ground.cjs',
  'src/claude/scripts/spec-final-state.cjs',
  'src/claude/scripts/spec-readiness.cjs',
  'src/claude/scripts/spec-semantic-model.cjs',
  'src/claude/scripts/validate-spec-output.cjs',
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
  const cache = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-npm-pack-cache-'));
  try {
    const result = spawnSync('npm', ['pack', '--ignore-scripts', ...args], {
      cwd,
      encoding: 'utf8',
      env: { ...process.env, npm_config_cache: cache },
    });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    return JSON.parse(result.stdout)[0];
  } finally {
    fs.rmSync(cache, { recursive: true, force: true });
  }
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

function packageDirectory(name, from) {
  let directory = path.dirname(require.resolve(name, { paths: [from] }));
  while (directory !== path.dirname(directory)) {
    const manifest = path.join(directory, 'package.json');
    if (fs.existsSync(manifest)) {
      const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));
      if (metadata.name === name) return { directory, metadata };
    }
    directory = path.dirname(directory);
  }
  throw new Error(`cannot resolve local runtime dependency ${name}`);
}

function packedRuntimeClosure(destination) {
  fs.mkdirSync(destination, { recursive: true });
  const rootManifest = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));
  const queue = Object.keys(rootManifest.dependencies || {});
  const visited = new Set();
  const tarballs = [];
  while (queue.length > 0) {
    const name = queue.shift();
    if (visited.has(name)) continue;
    visited.add(name);
    const resolved = packageDirectory(name, PACKAGE_ROOT);
    const packed = npmPack(['--ignore-scripts', '--pack-destination', destination, '--json'], resolved.directory);
    tarballs.push(path.join(destination, packed.filename));
    queue.push(...Object.keys(resolved.metadata.dependencies || {}));
  }
  return tarballs.sort();
}

function installPacked(tarball, root, runtimeClosure) {
  fs.mkdirSync(root, { recursive: true });
  const result = spawnSync('npm', [
    'install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund',
    '--package-lock=false', '--prefix', root, tarball, ...runtimeClosure,
  ], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, npm_config_cache: path.join(root, '.cafekit-npm-cache') },
  });
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

function createProvenanceFixture(root) {
  const feature = 'installer-provenance';
  const specFile = path.join('specs', feature, 'spec.json');
  fs.mkdirSync(path.join(root, path.dirname(specFile)), { recursive: true });
  fs.writeFileSync(
    path.join(root, specFile),
    JSON.stringify({ feature_name: feature, status: 'in_progress' }) + '\n'
  );
  fs.writeFileSync(path.join(root, 'tracked-fixture.txt'), 'tracked fixture\n');

  for (const args of [
    ['init', '-q'],
    ['add', '--', 'tracked-fixture.txt', specFile],
    ['-c', 'user.name=CafeKit Fixture', '-c', 'user.email=cafekit-fixture@example.invalid', 'commit', '--no-gpg-sign', '-qm', 'provenance fixture'],
  ]) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, `${args.join(' ')}\n${result.stdout}\n${result.stderr}`);
  }

  return {
    specsRoot: 'specs',
    specFile,
    feature,
    session: `package-${path.basename(root)}`,
  };
}

function provenanceCliArgs(helper, root, fixture) {
  return [
    helper,
    '--json',
    '--project-root', root,
    '--specs-root', fixture.specsRoot,
    '--spec-file', fixture.specFile,
    '--feature-name', fixture.feature,
    '--session', fixture.session,
  ];
}

function assertInstalledProvenance(root, platform, fixture) {
  const scripts = path.join(root, RUNTIMES[platform].root, 'scripts');
  const helper = path.join(scripts, 'provenance.cjs');
  const policy = path.join(scripts, 'workflow-policy.cjs');
  const resolver = path.join(scripts, 'spec-resolver.cjs');
  const receipt = path.join(scripts, 'spec-receipt.cjs');
  const finalState = path.join(scripts, 'spec-final-state.cjs');
  const readiness = path.join(scripts, 'spec-readiness.cjs');
  const gate = path.join(
    root,
    platform === 'claude' ? '.claude/hooks/spec-gate.cjs' : '.codex/hooks/spec-gate.cjs'
  );
  const authorityDir = path.join(root, platform === 'claude' ? '.claude/hooks' : '.codex/hooks');
  const authority = path.join(authorityDir, 'completion-authority.cjs');
  const authorityCheck = path.join(authorityDir, 'completion-authority-check.cjs');
  const authorityState = path.join(authorityDir, 'completion-authority-state.cjs');
  const semanticAuthority = path.join(authorityDir, 'semantic-review-authority.cjs');
  for (const file of [helper, policy, resolver, receipt, finalState, readiness]) {
    assert.equal(fs.existsSync(file), true, `${platform} installed file missing: ${file}`);
  }
  assert.equal(fs.existsSync(gate), true, `${platform} installed gate missing: ${gate}`);

  for (const file of [authority, authorityCheck, authorityState, semanticAuthority]) {
    assert.equal(fs.existsSync(file), true, `${platform} installed completion authority missing: ${file}`);
  }
  const finalStateBytes = fs.readFileSync(finalState);
  fs.rmSync(finalState);
  const missingFinalState = spawnSync(process.execPath, [authority, '--stop'], {
    cwd: root,
    env: { ...process.env, PROJECT_ROOT: root },
    input: JSON.stringify({ cwd: root, session_id: fixture.session, hook_event_name: 'Stop' }),
    encoding: 'utf8',
  });
  assert.equal(JSON.parse(missingFinalState.stdout).decision, 'block', `${platform} missing final-state closure must fail closed`);
  const escapedFinalState = path.join(root, 'escaped-spec-final-state.cjs');
  fs.writeFileSync(escapedFinalState, finalStateBytes);
  fs.symlinkSync(escapedFinalState, finalState);
  const symlinkFinalState = spawnSync(process.execPath, [authority, '--stop'], {
    cwd: root,
    env: { ...process.env, PROJECT_ROOT: root },
    input: JSON.stringify({ cwd: root, session_id: fixture.session, hook_event_name: 'Stop' }),
    encoding: 'utf8',
  });
  assert.equal(JSON.parse(symlinkFinalState.stdout).decision, 'block', `${platform} symlinked final-state closure must fail closed`);
  fs.rmSync(finalState);
  fs.writeFileSync(finalState, finalStateBytes);
  fs.rmSync(escapedFinalState);
  const authorityCheckBytes = fs.readFileSync(authorityCheck);
  fs.writeFileSync(authorityCheck, 'module.exports = {};\n');
  const malformedAuthority = spawnSync(process.execPath, [authority, '--stop'], {
    cwd: root,
    env: { ...process.env, PROJECT_ROOT: root },
    input: JSON.stringify({ cwd: root, session_id: fixture.session, hook_event_name: 'Stop' }),
    encoding: 'utf8',
  });
  assert.equal(malformedAuthority.status, 0, `${platform} malformed authority must fail closed`);
  assert.equal(JSON.parse(malformedAuthority.stdout).decision, 'block');
  fs.writeFileSync(authorityCheck, authorityCheckBytes);
  fs.rmSync(authorityCheck);
  const missingAuthority = spawnSync(process.execPath, [authority, '--stop'], {
    cwd: root,
    env: { ...process.env, PROJECT_ROOT: root },
    input: JSON.stringify({ cwd: root, session_id: fixture.session, hook_event_name: 'Stop' }),
    encoding: 'utf8',
  });
  assert.equal(missingAuthority.status, 0, `${platform} missing authority dependency must fail closed`);
  assert.equal(JSON.parse(missingAuthority.stdout).decision, 'block');
  fs.writeFileSync(authorityCheck, authorityCheckBytes);

  const helperRun = spawnSync(process.execPath, provenanceCliArgs(helper, root, fixture), {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(helperRun.status, 0, `${helperRun.stdout}\n${helperRun.stderr}`);
  const output = JSON.parse(helperRun.stdout);
  assert.equal(output.ok, true);
  assert.match(output.Base, /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/);
  assert.match(output.Head, /^[a-f0-9]{64}$/);
  assert.match(output.context_id, /^[a-f0-9]{64}$/);
  assert.equal(output.context.runtime_session, fixture.session);

  const policyLoad = spawnSync(process.execPath, [policy, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(policyLoad.status, 0, `${policyLoad.stdout}\n${policyLoad.stderr}`);
  assert.equal(JSON.parse(policyLoad.stdout).ok, true);

  const gateInput = JSON.stringify({
    cwd: root,
    session_id: fixture.session,
    featureName: fixture.feature,
  });
  const assertControlledBlock = (label) => {
    const gateRun = spawnSync(process.execPath, [gate], {
      cwd: root,
      input: `${gateInput}\n`,
      encoding: 'utf8',
    });
    assert.equal(gateRun.status, 0, `${label}: ${gateRun.stdout}\n${gateRun.stderr}`);
    const decision = JSON.parse(gateRun.stdout);
    assert.equal(decision.decision, 'block', `${label}: ${gateRun.stdout}`);
    assert.equal(decision.ok, undefined, `${label}: ${gateRun.stdout}`);
    assert.match(decision.reason, /unavailable|shared workflow policy|provenance|helper/i);
    assert.doesNotMatch(gateRun.stdout, /"decision"\s*:\s*"allow"|"ok"\s*:\s*true/);
  };

  const helperBytes = fs.readFileSync(helper);
  fs.rmSync(helper);
  assertControlledBlock('missing provenance helper');

  fs.writeFileSync(helper, 'module.exports = {;\n');
  assertControlledBlock('malformed provenance helper');

  fs.writeFileSync(helper, helperBytes);
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
  const grounder = path.join(scripts, 'spec-ground.cjs');
  const finalState = path.join(scripts, 'spec-final-state.cjs');
  const readiness = path.join(scripts, 'spec-readiness.cjs');
  const validator = path.join(scripts, 'validate-spec-output.cjs');
  assert.ok(fs.existsSync(policy), `installed policy missing: ${policy}`);
  assert.ok(fs.existsSync(scanner), `installed scanner missing: ${scanner}`);
  assert.ok(fs.existsSync(grounder), `installed validator dependency missing: ${grounder}`);
  assert.ok(fs.existsSync(finalState), `installed final-state dependency missing: ${finalState}`);
  assert.ok(fs.existsSync(readiness), `installed readiness finalizer missing: ${readiness}`);
  assert.ok(fs.existsSync(validator), `installed validator missing: ${validator}`);

  const policyRun = spawnSync(process.execPath, [policy, '--json'], { cwd: root, encoding: 'utf8' });
  assert.equal(policyRun.status, 0, `${policyRun.stdout}\n${policyRun.stderr}`);
  assert.equal(JSON.parse(policyRun.stdout).contract, 'execution-policy');

  const validatorRun = spawnSync(process.execPath, [validator], { cwd: root, encoding: 'utf8' });
  assert.equal(validatorRun.status, 2, `${validatorRun.stdout}\n${validatorRun.stderr}`);
  assert.match(validatorRun.stderr, /Usage: .*validate-spec-output\.cjs/);
  assert.doesNotMatch(validatorRun.stderr, /MODULE_NOT_FOUND|Cannot find module/);

  const safe = path.join(root, 'safe.txt');
  fs.writeFileSync(safe, 'mode=safe\n');
  spawnSync('git', ['init', '-q'], { cwd: root });
  spawnSync('git', ['add', 'safe.txt'], { cwd: root });
  const scannerRun = spawnSync(process.execPath, [scanner], { cwd: root, encoding: 'utf8' });
  assert.equal(scannerRun.status, 0, `${scannerRun.stdout}\n${scannerRun.stderr}`);
  assert.match(scannerRun.stdout, /No staged secrets found/);
}

function installedSemanticPaths(root, platform) {
  const runtimeRoot = path.join(root, RUNTIMES[platform].root);
  const skillRoot = platform === 'codex'
    ? path.join(root, '.agents', 'skills')
    : path.join(runtimeRoot, 'skills');
  const paths = {
    policy: path.join(runtimeRoot, 'scripts', 'workflow-policy.cjs'),
    validator: path.join(runtimeRoot, 'scripts', 'validate-spec-output.cjs'),
    grounder: path.join(runtimeRoot, 'scripts', 'spec-ground.cjs'),
    finalState: path.join(runtimeRoot, 'scripts', 'spec-final-state.cjs'),
    readiness: path.join(runtimeRoot, 'scripts', 'spec-readiness.cjs'),
    semanticModel: path.join(runtimeRoot, 'scripts', 'spec-semantic-model.cjs'),
    resolver: path.join(runtimeRoot, 'scripts', 'spec-resolver.cjs'),
    provenance: path.join(runtimeRoot, 'scripts', 'provenance.cjs'),
    completion: path.join(runtimeRoot, 'hooks', 'completion-authority-check.cjs'),
    semanticAuthority: path.join(runtimeRoot, 'hooks', 'semantic-review-authority.cjs'),
    stateTemplate: path.join(skillRoot, 'specs', 'templates', 'spec-state.json'),
  };
  for (const [name, target] of Object.entries(paths)) {
    assert.equal(fs.existsSync(target), true, `${platform} installed ${name} missing: ${target}`);
    assert.equal(path.relative(root, target).startsWith('..'), false, `${platform} ${name} escaped install root`);
  }
  return paths;
}

function runInstalled(script, args, root, expected = 0) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, expected, `${script}\n${result.stdout}\n${result.stderr}`);
  return result;
}

function writeJson(target, value) {
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}

function materializeSpecState(paths, root, feature, { strict = false } = {}) {
  const featureDir = path.join(root, 'specs', feature);
  fs.mkdirSync(featureDir, { recursive: true });
  const source = fs.readFileSync(paths.stateTemplate, 'utf8')
    .replaceAll('{{FEATURE_NAME}}', feature)
    .replaceAll('{{TIMESTAMP}}', '2026-08-14T00:00:00.000Z')
    .replaceAll('{{PROJECT_DESCRIPTION}}', `${feature} installed semantic fixture`);
  const state = JSON.parse(source);
  state.scope_lock.in_scope = [`${feature} behavior`];
  state.scope_lock.out_of_scope = ['unrelated behavior'];
  if (strict) {
    state.workflow_policy.assurance_level = 'Strict';
    state.workflow_policy.classified_minimum.assurance_level = 'Strict';
    state.workflow_policy.risks = ['auth'];
  }
  writeJson(path.join(featureDir, 'spec.json'), state);
  return { featureDir, specFile: path.join(featureDir, 'spec.json'), state };
}

function requirementsProjection({ proof = false } = {}) {
  return `# Requirements

## Requirements

### Requirement 1: Installed behavior

- **R1.1**: The installed entry command shall return status enabled; invalid input shall return status rejected.${proof ? '\n- **R1.2**: The installed verifier shall prove the observed entry behavior through its grounded evidence boundary.' : ''}
`;
}

const TYPED_ANCHOR_COLUMNS = ['ID', 'Type', 'Target', 'Role', 'Access', 'Action'];

function typedAnchorTable(rows) {
  assert.ok(Array.isArray(rows) && rows.length > 0, 'typed anchor projection requires rows');
  const header = `| ${TYPED_ANCHOR_COLUMNS.join(' | ')} |`;
  const separator = `|${TYPED_ANCHOR_COLUMNS.map(() => '---').join('|')}|`;
  const body = rows.map((row) => {
    assert.deepEqual(Object.keys(row), ['id', 'type', 'target', 'role', 'access', 'action']);
    assert.ok(Object.values(row).every((value) => typeof value === 'string' && value.trim() !== ''));
    return `| ${row.id} | ${row.type} | \`${row.target}\` | ${row.role} | ${row.access} | ${row.action} |`;
  });
  return [header, separator, ...body].join('\n');
}

function designProjection({
  expected = 'exit 0 and status enabled for valid input',
  taskful = false,
} = {}) {
  const anchors = typedAnchorTable([{
    id: 'A-D-01', type: 'file', target: 'src/design-boundary.js',
    role: 'existing design boundary for the entrypoint', access: 'read', action: 'read',
  }]);
  return `# Design

## Boundary

- **Owns:** \`src/entry.js\` returns the installed behavior state.
- **Reads:** The input discriminator.
- **Writes/exposes:** A status result through the entrypoint.
- **Outside boundary:** Unrelated runtime behavior.

## Typed Anchors

${anchors}

## Decisions and Invariants

### D1 — Installed result decision

- **Decision:** Valid input returns enabled and invalid input returns rejected.
- **Rejects ambiguity:** Invalid input never falls through to enabled.
- **Negative path:** Missing discriminator returns rejected.
- **Anchors:** A-D-01

### I1 — Rejection invariant

Invalid input never returns enabled.

### C1 — Result contract

- **Owner:** A-D-01
- **Consumers:** installed semantic validation
- **Shape/behavior:** The result contains status enabled or rejected.
- **Compatibility:** The two status values remain stable.

## Verification Definitions

- **V1**: Criteria R1.1; Owner ${taskful ? 'R1-01' : 'A-D-01'}; ${taskful ? 'Proof criteria R1.2; Proof owner R1-02; Evidence anchor A-R1-02-02; ' : ''}Decision refs D1, I1, C1; Method command \`node --test test/entry.test.js\`; Expected ${expected}; Negative/failure invalid input returns rejected without publishing proof; Reachability/grounding entrypoint \`src/entry.js\` via A-D-01${taskful ? ', A-R1-02-02' : ''}.
`;
}

function completeSemanticReview(paths, root, fixture, counterexamples) {
  const state = JSON.parse(fs.readFileSync(fixture.specFile, 'utf8'));
  state.authoring.requirements = 'validated';
  state.authoring.design = 'validated';
  if (state.authoring.tasks !== 'absent') state.authoring.tasks = 'validated';
  writeJson(fixture.specFile, state);
  fixture.reviewResult = { reviewed_criteria: counterexamples.map(({ criterion }) => criterion), counterexamples };
  if (state.workflow_policy.assurance_level === 'Strict') {
    const digest = runInstalled(paths.validator, [fixture.featureDir, '--semantic-digest'], root).stdout.trim();
    assert.match(digest, /^sha256:[a-f0-9]{64}$/);
    return digest;
  }
  const reviewFile = path.join(fixture.featureDir, '.review-result.json');
  writeJson(reviewFile, fixture.reviewResult);
  runInstalled(paths.readiness, [fixture.featureDir, '--review-result', reviewFile], root);
  fs.unlinkSync(reviewFile);
  runInstalled(paths.validator, [fixture.featureDir], root);
  runInstalled(paths.grounder, [fixture.featureDir, '--root', root], root);
  return JSON.parse(fs.readFileSync(fixture.specFile, 'utf8')).validation.semantic_review.semantic_digest;
}

function createTasklessFixture(paths, root, feature, options = {}) {
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.mkdirSync(path.join(root, 'test'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src', 'entry.js'), 'module.exports = (valid) => ({ status: valid ? "enabled" : "rejected" });\n');
  fs.writeFileSync(path.join(root, 'src', 'design-boundary.js'), 'module.exports = { entry: "src/entry.js" };\n');
  fs.writeFileSync(path.join(root, 'test', 'entry.test.js'), 'require("node:test")("entry", () => {});\n');
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ scripts: { test: 'node --test' } }));
  const fixture = materializeSpecState(paths, root, feature, options);
  fs.writeFileSync(path.join(fixture.featureDir, 'requirements.md'), requirementsProjection());
  fs.writeFileSync(path.join(fixture.featureDir, 'design.md'), designProjection());
  fixture.digest = completeSemanticReview(paths, root, fixture, [{
    criterion: 'R1.1', case_kind: 'failure',
    scenario: 'The installed entry receives input without the required discriminator.',
    expected: 'The installed entry returns rejected and never returns enabled.',
    decision_refs: ['D1', 'I1', 'C1'], verification_ref: 'V1',
  }]);
  return fixture;
}

function taskProjection({ id, title, ownedPath, criterion, verificationRef, role, artifact = false }) {
  const anchors = typedAnchorTable([
    { id: `A-${id}-01`, type: 'file', target: ownedPath, role: 'owner', access: 'write', action: 'modify' },
    ...(artifact ? [{
      id: `A-${id}-02`, type: 'artifact', target: `artifacts/${id}.json`,
      role: 'verifier', access: 'write', action: 'create',
    }] : []),
    {
      id: `A-${id}-${artifact ? '03' : '02'}`, type: 'command',
      target: 'node --test test/entry.test.js', role: 'verifier', access: 'read', action: 'read',
    },
  ]);
  return `# Task ${id}: ${title}
**Status:** pending

## Outcome

Deliver observable ${title.toLowerCase()} behavior through the installed entrypoint.

## Scope

- **In scope:** Exact behavior owned at ${ownedPath}.
- **Out of scope:** Unrelated runtime behavior.

## Anchors and Ownership

${anchors}

## Changes

- [ ] Implement the exact owned behavior. _Requirements: ${criterion.slice(1)}_

## Acceptance

- **${criterion}:** The installed command returns the criterion-specific observable state.

## Dependencies

- none

## Verification Plan

- **Verification ref:** ${verificationRef}
- **Task role:** ${role}
- **Command:** \`node --test test/entry.test.js\`
- **Expected:** Exit code 0 and the criterion-specific state is observed.
- **Negative path:** Invalid input returns the named rejected state.
- **Reachability:** \`src/entry.js\` is reached by the installed test command.
`;
}

function createTaskFixture(paths, root, feature) {
  fs.mkdirSync(path.join(root, 'artifacts'), { recursive: true });
  const fixture = materializeSpecState(paths, root, feature);
  fs.writeFileSync(path.join(fixture.featureDir, 'requirements.md'), requirementsProjection({ proof: true }));
  fs.writeFileSync(path.join(fixture.featureDir, 'design.md'), designProjection({
    expected: 'exit 0, status enabled, and verifier artifact `artifacts/R1-02.json`',
    taskful: true,
  }));
  const taskOne = 'tasks/task-R1-01-implement.md';
  const taskTwo = 'tasks/task-R1-02-verify.md';
  fs.mkdirSync(path.join(fixture.featureDir, 'tasks'), { recursive: true });
  fs.writeFileSync(path.join(fixture.featureDir, taskOne), taskProjection({
    id: 'R1-01', title: 'Implement behavior', ownedPath: 'src/entry.js', criterion: 'R1.1',
    verificationRef: 'V1', role: 'subject implements R1.1',
  }));
  fs.writeFileSync(path.join(fixture.featureDir, taskTwo), taskProjection({
    id: 'R1-02', title: 'Verify behavior', ownedPath: 'test/entry.test.js', criterion: 'R1.2',
    verificationRef: 'V1', role: 'verifier verifies V1 through separately owned R1.2 proof', artifact: true,
  }));
  const state = fixture.state;
  state.authoring.tasks = 'draft';
  state.task_files = [taskOne, taskTwo];
  state.task_registry = Object.fromEntries([
    [taskOne, { id: 'R1-01', title: 'Implement behavior', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null }],
    [taskTwo, { id: 'R1-02', title: 'Verify behavior', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null }],
  ]);
  state.coordination.boundaries = [{
    id: 'B-OWN', type: 'ownership', tasks: ['R1-01', 'R1-02'],
    write_sets: { 'R1-01': ['src/entry.js'], 'R1-02': ['test/entry.test.js', 'artifacts/R1-02.json'] },
  }, {
    id: 'B-PROOF', type: 'proof', subject: 'R1-01', verifier: 'R1-02',
    verification_ref: 'V1', artifact_anchor: 'A-R1-02-02',
  }];
  writeJson(fixture.specFile, state);
  fixture.digest = completeSemanticReview(paths, root, fixture, [{
    criterion: 'R1.1', case_kind: 'failure',
    scenario: 'Invalid input reaches the installed implementation boundary.',
    expected: 'The implementation returns rejected and never reports enabled.',
    decision_refs: ['D1', 'I1', 'C1'], verification_ref: 'V1',
  }, {
    criterion: 'R1.2', case_kind: 'failure',
    scenario: 'The verification command completes without producing its proof artifact.',
    expected: 'The verification criterion remains unsatisfied until the artifact exists.',
    decision_refs: ['D1', 'I1', 'C1'], verification_ref: 'V1',
  }]);
  return fixture;
}

function initializeGit(root) {
  fs.writeFileSync(path.join(root, '.gitignore'), `${'node_' + 'modules'}/\n`);
  for (const args of [
    ['init', '-q'], ['config', 'user.name', 'CafeKit Packed E2E'],
    ['config', 'user.email', 'packed-e2e@example.invalid'],
    ['add', '--', '.gitignore', 'src/entry.js', 'src/design-boundary.js', 'test/entry.test.js', 'package.json'],
    ['commit', '--no-gpg-sign', '-qm', 'packed semantic fixture'],
  ]) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, `${args.join(' ')}\n${result.stdout}\n${result.stderr}`);
  }
}

function assertInstalledCompletion(paths, root, platform, fixture) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-packed-completion-home-'));
  const code = `
const fs = require('fs');
const path = require('path');
const policy = require(process.argv[1]);
const provenance = require(process.argv[2]);
const checker = require(process.argv[3]);
const resolver = require(process.argv[4]);
const root = process.argv[5];
const feature = process.argv[6];
const specFile = path.join(root, 'specs', feature, 'spec.json');
const state = JSON.parse(fs.readFileSync(specFile, 'utf8'));
state.status = 'done';
fs.writeFileSync(specFile, JSON.stringify(state, null, 2) + '\\n');
const context = provenance.deriveRuntimeContext({ projectRoot: root, specsRoot: path.join(root, 'specs'), specFile, featureName: feature, runtimeSession: 'packed-session' });
fs.writeFileSync(path.join(root, 'specs', feature, 'feature-receipt.md'), ['Verification: PASS','Command: node --test','Exit: 0','Result: PASS','Expected: installed behavior passes','Observed: installed behavior passed','Base: ' + context.base,'Head: ' + context.head,'Feature: ' + feature].join('\\n') + '\\n');
const result = checker.evaluateCloseout({ resolver, policy, projectRoot: root, runtime: {}, payload: { session_id: 'packed-session', featureName: feature } });
process.stdout.write(JSON.stringify({ ok: result.ok, active: result.active, reason: result.reason || null, feature: result.candidate && result.candidate.featureName }));`;
  const result = spawnSync(process.execPath, ['-e', code, paths.policy, paths.provenance, paths.completion, paths.resolver, root, fixture.state.feature_name], {
    cwd: root, encoding: 'utf8', env: { ...process.env, HOME: home },
  });
  fs.rmSync(home, { recursive: true, force: true });
  assert.equal(result.status, 0, `${platform}\n${result.stdout}\n${result.stderr}`);
  assert.deepEqual(JSON.parse(result.stdout), {
    ok: true, active: true, reason: null, feature: fixture.state.feature_name,
  });
}

function assertInstalledResolution(paths, root, platform, explicitFeature) {
  const code = `
const checker = require(process.argv[1]); const resolver = require(process.argv[2]);
const root = process.argv[3]; const platform = process.argv[4]; const feature = process.argv[5];
const base = { projectRoot: root, runtime: {}, payload: {} };
if (platform === 'claude') base.resolver = resolver;
const explicit = checker.resolveCandidate({ ...base, payload: { featureName: feature } });
const ambiguous = checker.resolveCandidate(base);
process.stdout.write(JSON.stringify({ explicit: explicit && explicit.featureName, error: ambiguous && ambiguous.error, candidates: ambiguous && ambiguous.candidates }));`;
  const result = spawnSync(process.execPath, ['-e', code, paths.completion, paths.resolver, root, platform, explicitFeature], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const resolution = JSON.parse(result.stdout);
  assert.equal(resolution.explicit, explicitFeature);
  assert.equal(resolution.error, 'multiple_persisted');
  assert.ok(resolution.candidates.length >= 2);
}

function assertStrictHostHookGuardrail(paths, root, fixture) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-packed-strict-home-'));
  const code = `
const authority = require(process.argv[1]); const readiness = require(process.argv[2]); const root = process.argv[3]; const feature = process.argv[4]; const digest = process.argv[5]; const review = JSON.parse(process.argv[6]);
const spec_file = 'specs/' + feature + '/spec.json';
const marker = authority.MARKER + JSON.stringify({ feature_name: feature, spec_file, semantic_digest: digest, verdict: 'PASS' });
const before = authority.verifyAttestation(root, spec_file, feature, digest);
const forged = authority.recordFromSubagentStop({ cwd: root, hook_event_name: 'SubagentStop', session_id: 'self-session', agent_id: 'self', agent_type: 'spec-maker', last_assistant_message: marker });
const afterForged = authority.verifyAttestation(root, spec_file, feature, digest);
const observed = authority.recordFromSubagentStop({ cwd: root, hook_event_name: 'SubagentStop', session_id: 'host-session', agent_id: 'reviewer-1', agent_type: 'code-auditor', last_assistant_message: marker });
const afterObserved = authority.verifyAttestation(root, spec_file, feature, digest);
const finalized = readiness.finalizeReadiness({ specDir: require('path').join(root, 'specs', feature), projectRoot: root, reviewResult: review });
process.stdout.write(JSON.stringify({ before: before.ok, forged: forged.recorded, afterForged: afterForged.ok, observed: observed.recorded, afterObserved: afterObserved.ok, ready: finalized.spec.ready_for_implementation }));`;
  const result = spawnSync(process.execPath, ['-e', code, paths.semanticAuthority, paths.readiness, root, fixture.state.feature_name, fixture.digest, JSON.stringify(fixture.reviewResult)], {
    cwd: root, encoding: 'utf8', env: { ...process.env, HOME: home, PROJECT_ROOT: root },
  });
  fs.rmSync(home, { recursive: true, force: true });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.deepEqual(JSON.parse(result.stdout), {
    before: false, forged: false, afterForged: false, observed: true, afterObserved: true, ready: true,
  });
}

function assertStaleDigestMutations(paths, root, taskless, taskBearing) {
  const requirementFile = path.join(taskless.featureDir, 'requirements.md');
  const requirementBytes = fs.readFileSync(requirementFile);
  fs.appendFileSync(requirementFile, '\nThe installed Markdown meaning changed.\n');
  assert.match(runInstalled(paths.validator, [taskless.featureDir], root, 1).stderr, /semantic_digest: stale/);
  fs.writeFileSync(requirementFile, requirementBytes);

  const tasklessState = JSON.parse(fs.readFileSync(taskless.specFile, 'utf8'));
  const originalPolicy = JSON.parse(JSON.stringify(tasklessState.workflow_policy));
  tasklessState.workflow_policy.planning_depth = 'Full';
  writeJson(taskless.specFile, tasklessState);
  assert.match(runInstalled(paths.validator, [taskless.featureDir], root, 1).stderr, /semantic_digest: stale/);
  tasklessState.workflow_policy = originalPolicy;
  writeJson(taskless.specFile, tasklessState);

  const taskState = JSON.parse(fs.readFileSync(taskBearing.specFile, 'utf8'));
  const originalId = taskState.coordination.boundaries[0].id;
  taskState.coordination.boundaries[0].id = 'B-OWN-MUTATED';
  writeJson(taskBearing.specFile, taskState);
  assert.match(runInstalled(paths.validator, [taskBearing.featureDir], root, 1).stderr, /semantic_digest: stale/);
  taskState.coordination.boundaries[0].id = originalId;
  writeJson(taskBearing.specFile, taskState);
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
    const runtimeClosure = packedRuntimeClosure(path.join(root, 'runtime-closure'));
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
        const installer = installPacked(tarball, project, runtimeClosure);
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

test('packed Claude and Codex installs execute semantic kernel behavior without package source', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-packed-semantic-'));
  const destination = path.join(root, 'pack');
  fs.mkdirSync(destination, { recursive: true });
  try {
    const packed = npmPack(['--pack-destination', destination, '--json'], PACKAGE_ROOT);
    const tarball = path.join(destination, packed.filename);
    const runtimeClosure = packedRuntimeClosure(path.join(root, 'runtime-closure'));
    assertCleanInventory(packedInventory(tarball));

    for (const platform of ['claude', 'codex']) {
      const project = path.join(root, platform);
      const installer = installPacked(tarball, project, runtimeClosure);
      runInstaller(installer, project, [platform], null);
      const packedSource = path.resolve(path.dirname(installer), '..', 'src');
      fs.rmSync(packedSource, { recursive: true, force: true });
      assert.equal(fs.existsSync(packedSource), false, `${platform} package source must be unavailable`);

      const paths = installedSemanticPaths(project, platform);
      const taskless = createTasklessFixture(paths, project, 'compact-installed');
      initializeGit(project);
      assertInstalledCompletion(paths, project, platform, taskless);

      const strict = createTasklessFixture(paths, project, 'strict-installed', { strict: true });
      const taskBearing = createTaskFixture(paths, project, 'tasks-installed');
      assertInstalledResolution(paths, project, platform, 'strict-installed');
      assertStrictHostHookGuardrail(paths, project, strict);
      assertStaleDigestMutations(paths, project, taskless, taskBearing);
      runInstalled(paths.validator, [taskless.featureDir], project);
      runInstalled(paths.validator, [taskBearing.featureDir], project);
      runInstalled(paths.grounder, [taskBearing.featureDir, '--root', project], project);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('packed Claude and Codex installs self-contain runtime provenance and fail closed without it', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-provenance-package-'));
  const destination = path.join(root, 'pack');
  fs.mkdirSync(destination, { recursive: true });
  try {
    const packed = npmPack(['--pack-destination', destination, '--json'], PACKAGE_ROOT);
    const tarball = path.join(destination, packed.filename);
    const runtimeClosure = packedRuntimeClosure(path.join(root, 'runtime-closure'));
    assertCleanInventory(packedInventory(tarball));

    for (const platform of ['claude', 'codex']) {
      const project = path.join(root, platform);
      const installer = installPacked(tarball, project, runtimeClosure);
      runInstaller(installer, project, [platform], null);

      const packedSource = path.resolve(path.dirname(installer), '..', 'src');
      fs.rmSync(packedSource, { recursive: true, force: true });
      assert.equal(fs.existsSync(packedSource), false, 'installed gate must not need package source fallback');

      const fixture = createProvenanceFixture(project);
      assertInstalledProvenance(project, platform, fixture);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
