'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.resolve(__dirname, '../..');
const PACKAGE_VERSION = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')).version;
const OLD_FIXTURE_VERSION = '0.14.1';
const NO_INVENTION_ANCHOR = 'Before implementation handoff, apply the **no-invention gate**:';
const IMPLEMENTATION_READINESS_BOUNDARY_ROWS = [
  ['API/CLI', 'entrypoint/route or command grammar; identity/auth; input/default/normalization; success output; error/status/exit; duplicate/retry/idempotency; compatibility'],
  ['Schema', 'version; exact keys/nesting/types; required/optional; enum/format/bounds/cardinality; unknown-field behavior; compatibility/migration'],
  ['State/concurrency', 'initial/terminal states; event + guard + effect + next + error; ordering; duplicate/retry; writer/lock acquire/contention/release; rollback/recovery'],
  ['Filesystem/security', 'authoritative root; trusted/untrusted segment grammar; lexical + canonical containment and symlink policy; flags/mode; temp/rename/fsync; lock/stale reclaim; crash cleanup'],
  ['Time/retention', 'clock source; unit/precision/timezone; endpoints and inclusion/comparator; anomaly behavior; expiry/purge/recovery'],
  ['Integration/proof', 'caller; export/registration; packaging/config; native path/consumer; proof level (`source`/`installed`/`live`); observable failure oracle'],
];
const IMPLEMENTATION_READINESS_CLAUSES = {
  noInvention: 'Before implementation handoff, apply the **no-invention gate**: if two implementations conform to the packet text yet can produce different externally observable output, state, error, security, or compatibility behavior, surface the missing choice as an explicit C1 or C2 question and block handoff.',
  materialDefinition: 'A boundary is material when the task creates, changes, or depends on it and a different choice changes an external observation, security, durable data, compatibility, or proof reachability. Require only the matching material row; omit nonmaterial categories.',
  exactBoundaryChoices: 'For every required row, name each listed choice exactly; labels such as “JSON”, “local path”, “locked”, or “timestamped” alone remain unresolved.',
  proofPlanLines: [
    '- Command: `<exact runnable command>`',
    '- Named probe: <existing concrete probe/test/hook ID; never only a suite label>',
    '- Reachability: <real entrypoint/caller at each `source`/`installed`/`live` level; `UNKNOWN` if unexecuted>',
    '- Oracle: <externally observable success or failure>',
    '- Counterexample: <material alternative behavior that must make this proof fail>',
    '- Artifacts: <required artifact path plus digest algorithm/comparison rule, or explicitly ephemeral with cleanup rule>',
  ],
  proofTrace: 'Trace `Command → Named probe → Reachability → Oracle`.',
  namedProbeOwnership: 'Aggregate suites\nname the owning concrete probe.',
  proofLevelSeparation: 'Proof at `source`/`installed`/`live` stays\nseparate; one level never promotes another.',
  disposableTemplateControls: 'Run mutation or destructive\nnegative controls only on disposable copies under a verified temporary root,\nnever tracked worktree or canonical source bytes.',
  disposableReviewControls: 'Run mutation or destructive negative controls only on disposable copies below a verified temporary root, never tracked worktree or canonical source bytes.',
  failureSemantics: '`Crash` means abrupt unhandled termination before the claimed catch point; a catchable failure returns/raises an error or exits nonzero. Never use them interchangeably.',
  privacyIdentifiers: 'Any privacy/security claim names the exact identifier surface at risk, such as an env var, header, path, token class, or field name; generic “sensitive data” is insufficient.',
  freshReplay: 'After applying an accepted C2 finding, a fresh-context closure pass records and freshly replays its original counterexample after the repair under this exact review-log header:',
  distinctRepairProof: '`Repaired at` cites the repair edit; `Proved at` must cite distinct evidence from the fresh replay, never the repair-edit citation.',
  closureTransition: 'An accepted finding transitions `accepted → repaired → PASS|FAIL|UNKNOWN`.',
  unknownBlocks: 'Only `PASS` closes it; `FAIL` remains open for the remaining paper-review round; `UNKNOWN` blocks implementation handoff.',
  scopeReturnsToC1: 'A repair that adds user semantics or scope returns to C1.',
};
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
  'src/claude/scripts/spec-authoring-validation.cjs',
  'src/claude/scripts/spec-authoring-digest.cjs',
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
  claude: {
    root: '.claude', rules: '.claude/hooks/rules.cjs', specs: '.claude/skills/specs',
    manifest: '.claude/cafekit-manifest.json', templatesManifestPath: 'skills/specs/references/templates.md'
  },
  codex: {
    root: '.codex', rules: '.codex/hooks/rules.cjs', specs: '.agents/skills/specs',
    manifest: '.codex/cafekit-manifest.json', templatesManifestPath: '.agents/skills/specs/references/templates.md'
  },
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
  return result;
}

function markdownTableUnderHeading(content, heading) {
  const lines = markdownSectionUnderHeading(content, heading).split('\n');
  const tableStart = lines.findIndex((line) => line.trim().startsWith('|'));
  if (tableStart < 0) return [];
  const rows = [];
  for (let index = tableStart; index < lines.length && lines[index].trim().startsWith('|'); index += 1) {
    const cells = lines[index].split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue;
    rows.push(cells);
  }
  return rows;
}

function markdownSectionUnderHeading(content, heading) {
  const lines = String(content).split('\n');
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (headingIndex < 0) return '';
  const nextHeadingIndex = lines.findIndex(
    (line, index) => index > headingIndex && /^##\s+/.test(line)
  );
  return lines.slice(headingIndex + 1, nextHeadingIndex < 0 ? undefined : nextHeadingIndex).join('\n');
}

function normalizeMarkdownWhitespace(content) {
  return String(content).replace(/\s+/g, ' ').trim();
}

function markdownBetweenHeadings(content, startHeading, endHeading) {
  const value = String(content);
  const startMarker = `## ${startHeading}`;
  const endMarker = `## ${endHeading}`;
  const startIndex = value.indexOf(startMarker);
  const endIndex = value.indexOf(endMarker, startIndex + startMarker.length);
  if (startIndex < 0 || endIndex < 0) return '';
  return value.slice(startIndex + startMarker.length, endIndex);
}

function implementationReadinessContractIssues(input) {
  const keys = input && typeof input === 'object' && !Array.isArray(input)
    ? Object.keys(input).sort()
    : [];
  if (keys.join(',') !== 'review,templates'
    || typeof input.templates !== 'string' || typeof input.review !== 'string') {
    throw new TypeError('implementation-readiness checker expects exactly templates and review UTF-8 strings');
  }

  const issues = new Set();
  const authoring = markdownSectionUnderHeading(
    input.templates,
    'No-invention and conditional boundary contracts'
  );
  if (!authoring.includes(IMPLEMENTATION_READINESS_CLAUSES.noInvention)) {
    issues.add('no-invention');
  }

  const boundaryTable = markdownTableUnderHeading(
    input.templates,
    'No-invention and conditional boundary contracts'
  );
  const expectedBoundaryTable = [
    ['Boundary', 'Required contract when material'],
    ...IMPLEMENTATION_READINESS_BOUNDARY_ROWS,
  ];
  if (!authoring.includes(IMPLEMENTATION_READINESS_CLAUSES.materialDefinition)
    || !authoring.includes(IMPLEMENTATION_READINESS_CLAUSES.exactBoundaryChoices)
    || IMPLEMENTATION_READINESS_BOUNDARY_ROWS.length !== 6
    || boundaryTable.length !== expectedBoundaryTable.length
    || JSON.stringify(boundaryTable) !== JSON.stringify(expectedBoundaryTable)) {
    issues.add('boundary-contract');
  }

  const proof = markdownSectionUnderHeading(input.templates, 'Verification Plan');
  const proofPlanLines = proof.split('\n').map((line) => line.trim()).filter((line) => line.startsWith('- '));
  const normalizedProofContract = normalizeMarkdownWhitespace(markdownBetweenHeadings(
    input.templates,
    'Verification Plan',
    'Canonical inline Receipt'
  ));
  const normalizedProofClauses = [
    IMPLEMENTATION_READINESS_CLAUSES.proofTrace,
    IMPLEMENTATION_READINESS_CLAUSES.namedProbeOwnership,
    IMPLEMENTATION_READINESS_CLAUSES.proofLevelSeparation,
    IMPLEMENTATION_READINESS_CLAUSES.disposableTemplateControls,
  ].map(normalizeMarkdownWhitespace);
  const reviewNegativeControls = normalizeMarkdownWhitespace(
    markdownSectionUnderHeading(input.review, 'B2 — fresh-context red team')
  );
  if (JSON.stringify(proofPlanLines) !== JSON.stringify(IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines)
    || normalizedProofClauses.some((clause) => !normalizedProofContract.includes(clause))
    || !reviewNegativeControls.includes(normalizeMarkdownWhitespace(
      IMPLEMENTATION_READINESS_CLAUSES.disposableReviewControls
    ))) {
    issues.add('proof-chain');
  }

  const failureGuidance = markdownSectionUnderHeading(input.templates, 'Twelve edge-case dimensions');
  if (!failureGuidance.includes(IMPLEMENTATION_READINESS_CLAUSES.failureSemantics)) {
    issues.add('failure-semantics');
  }

  const evidenceRules = markdownSectionUnderHeading(input.review, 'B1 — evidence rule');
  if (!evidenceRules.includes(IMPLEMENTATION_READINESS_CLAUSES.privacyIdentifiers)) {
    issues.add('privacy-identifiers');
  }

  const closure = markdownSectionUnderHeading(input.review, 'Accepted-repair closure');
  const normalizedClosure = normalizeMarkdownWhitespace(closure);
  const closureHeader = markdownTableUnderHeading(input.review, 'Accepted-repair closure')[0] || [];
  if (JSON.stringify(closureHeader) !== JSON.stringify([
    'ID', 'Decision', 'Original counterexample', 'Repaired at', 'Proved at', 'Replay', 'Closure',
  ])
    || !normalizedClosure.includes(normalizeMarkdownWhitespace(IMPLEMENTATION_READINESS_CLAUSES.freshReplay))
    || !closure.includes(IMPLEMENTATION_READINESS_CLAUSES.distinctRepairProof)
    || !closure.includes(IMPLEMENTATION_READINESS_CLAUSES.closureTransition)
    || !closure.includes(IMPLEMENTATION_READINESS_CLAUSES.unknownBlocks)
    || !closure.includes(IMPLEMENTATION_READINESS_CLAUSES.scopeReturnsToC1)) {
    issues.add('repair-closure');
  }

  return [...issues].sort();
}

function installedSpecsReadinessIssues(project, installedRoot, expectedRelative) {
  assert.equal(path.isAbsolute(project), true, 'project root must be absolute');
  assert.equal(path.isAbsolute(installedRoot), true, 'installed Specs root must be absolute');
  const canonicalProject = fs.realpathSync(project);
  const canonicalInstalled = fs.realpathSync(installedRoot);
  const relative = path.relative(canonicalProject, canonicalInstalled);
  assert.ok(relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), 'installed Specs root must stay inside project');
  assert.equal(canonicalInstalled, fs.realpathSync(path.join(canonicalProject, expectedRelative)), 'checker must use the native installed Specs root');
  return implementationReadinessContractIssues({
    templates: fs.readFileSync(path.join(canonicalInstalled, 'references/templates.md'), 'utf8'),
    review: fs.readFileSync(path.join(canonicalInstalled, 'references/review.md'), 'utf8'),
  });
}

function assertInstalledSpecsReadiness(project, platform, expected = []) {
  const runtime = RUNTIMES[platform];
  assert.ok(runtime, `unknown platform: ${platform}`);
  const installedRoot = path.join(project, runtime.specs);
  const issues = installedSpecsReadinessIssues(project, installedRoot, runtime.specs);
  assert.deepEqual(issues, expected, `${platform} installed Specs readiness issues`);
  return issues;
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function assertContainedRealpath(root, target, label) {
  const canonicalRoot = fs.realpathSync(root);
  const canonicalTarget = fs.realpathSync(target);
  const relative = path.relative(canonicalRoot, canonicalTarget);
  assert.ok(
    relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative),
    `${label} must stay inside ${canonicalRoot}`
  );
  return canonicalTarget;
}

function installedMutationContext(tempRoot, project, platform, packageRoot = PACKAGE_ROOT) {
  const runtime = RUNTIMES[platform];
  assert.ok(runtime, `unknown platform: ${platform}`);
  const canonicalTempRoot = assertContainedRealpath(os.tmpdir(), tempRoot, `${platform} mkdtemp root`);
  assert.match(path.basename(canonicalTempRoot), /^cafekit-package-matrix-/, `${platform} mutation root must be the verified matrix mkdtemp`);
  const canonicalProject = assertContainedRealpath(canonicalTempRoot, project, `${platform} packed project`);
  const nativeInstalledRoot = path.join(canonicalProject, runtime.specs);
  const canonicalInstalledRoot = assertContainedRealpath(
    canonicalProject,
    nativeInstalledRoot,
    `${platform} native installed Specs root`
  );
  const installedRelatives = {
    templates: 'references/templates.md',
    review: 'references/review.md',
  };
  const installedPaths = {
    templates: path.join(nativeInstalledRoot, installedRelatives.templates),
    review: path.join(nativeInstalledRoot, installedRelatives.review),
  };
  const sourcePaths = {
    templates: path.join(packageRoot, 'src/claude/skills/specs/references/templates.md'),
    review: path.join(packageRoot, 'src/claude/skills/specs/references/review.md'),
  };
  for (const source of Object.keys(sourcePaths)) sourcePaths[source] = fs.realpathSync(sourcePaths[source]);
  const sourceHashes = Object.fromEntries(
    Object.entries(sourcePaths).map(([source, sourcePath]) => [source, sha256(fs.readFileSync(sourcePath))])
  );
  const assertSourceHashes = (stage) => {
    for (const source of Object.keys(sourcePaths)) {
      assert.equal(
        sha256(fs.readFileSync(sourcePaths[source])),
        sourceHashes[source],
        `${platform} PACKAGE_ROOT ${source} SHA changed ${stage}`
      );
    }
  };
  const assertSafeInstalledTarget = (source, stage) => {
    assert.ok(Object.hasOwn(installedPaths, source), `${platform} unknown installed mutation source: ${source}`);
    assertSourceHashes(`before ${stage}`);

    const currentTempRoot = assertContainedRealpath(os.tmpdir(), tempRoot, `${platform} ${stage} mkdtemp root`);
    assert.equal(currentTempRoot, canonicalTempRoot, `${platform} ${stage} mutation root changed`);
    const currentProject = assertContainedRealpath(currentTempRoot, project, `${platform} ${stage} packed project`);
    assert.equal(currentProject, canonicalProject, `${platform} ${stage} packed project changed`);
    const currentInstalledRoot = assertContainedRealpath(
      currentProject,
      nativeInstalledRoot,
      `${platform} ${stage} native installed Specs root`
    );
    assert.equal(currentInstalledRoot, canonicalInstalledRoot, `${platform} ${stage} native installed Specs root changed`);

    const target = installedPaths[source];
    const targetMetadata = fs.lstatSync(target);
    assert.equal(
      targetMetadata.isSymbolicLink(),
      false,
      `${platform} ${stage} target must be a regular non-symlink file`
    );
    assert.equal(targetMetadata.isFile(), true, `${platform} ${stage} target must be a regular non-symlink file`);
    const canonicalTarget = assertContainedRealpath(
      currentInstalledRoot,
      target,
      `${platform} ${stage} installed ${source} mutation target`
    );
    assert.equal(
      assertContainedRealpath(currentProject, target, `${platform} ${stage} disposable project target`),
      canonicalTarget
    );
    assert.equal(
      canonicalTarget,
      path.join(currentInstalledRoot, installedRelatives[source]),
      `${platform} ${stage} target must remain at its exact native installed path`
    );
    assert.notEqual(canonicalTarget, sourcePaths[source], `${platform} ${stage} target must not be package source`);

    const installedIdentity = fs.statSync(target);
    const sourceIdentity = fs.statSync(sourcePaths[source]);
    assert.ok(
      installedIdentity.dev !== sourceIdentity.dev || installedIdentity.ino !== sourceIdentity.ino,
      `${platform} ${stage} target must not share (dev, ino) with package source`
    );
    return target;
  };
  const writeInstalled = (source, content, stage) => {
    const target = assertSafeInstalledTarget(source, stage);
    fs.writeFileSync(target, content);
    assertSourceHashes(`immediately after ${stage}`);
  };
  for (const source of Object.keys(installedPaths)) {
    assertSafeInstalledTarget(source, `${source} context creation`);
  }
  return { installedPaths, assertSafeInstalledTarget, writeInstalled, assertSourceHashes };
}

test('installed mutation guard rejects post-context symlink and hardlink before source bytes change', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-package-matrix-'));
  const trackedSources = {
    templates: path.join(PACKAGE_ROOT, 'src/claude/skills/specs/references/templates.md'),
    review: path.join(PACKAGE_ROOT, 'src/claude/skills/specs/references/review.md'),
  };
  const trackedHashes = Object.fromEntries(
    Object.entries(trackedSources).map(([source, sourcePath]) => [source, sha256(fs.readFileSync(sourcePath))])
  );
  try {
    for (const topology of ['symlink', 'hardlink']) {
      const packageRoot = path.join(root, `${topology}-package-source`);
      const project = path.join(root, `${topology}-project`);
      const sourceDirectory = path.join(packageRoot, 'src/claude/skills/specs/references');
      const installedDirectory = path.join(project, RUNTIMES.claude.specs, 'references');
      fs.mkdirSync(sourceDirectory, { recursive: true });
      fs.mkdirSync(installedDirectory, { recursive: true });
      for (const file of ['templates.md', 'review.md']) {
        fs.writeFileSync(path.join(sourceDirectory, file), `${topology} disposable source ${file}\n`);
        fs.writeFileSync(path.join(installedDirectory, file), `${topology} disposable installed ${file}\n`);
      }

      const context = installedMutationContext(root, project, 'claude', packageRoot);
      const sourcePath = path.join(sourceDirectory, 'templates.md');
      const target = context.installedPaths.templates;
      const sourceBytes = fs.readFileSync(sourcePath);
      const sourceHash = sha256(sourceBytes);
      fs.unlinkSync(target);
      if (topology === 'symlink') {
        fs.symlinkSync(sourcePath, target);
        assert.equal(fs.lstatSync(target).isSymbolicLink(), true, 'symlink control must change target topology');
      } else {
        fs.linkSync(sourcePath, target);
        const sourceIdentity = fs.statSync(sourcePath);
        const installedIdentity = fs.statSync(target);
        assert.deepEqual(
          [installedIdentity.dev, installedIdentity.ino],
          [sourceIdentity.dev, sourceIdentity.ino],
          'hardlink control must share source identity'
        );
      }

      assert.throws(
        () => context.writeInstalled('templates', 'forbidden installed mutation\n', `${topology} regression`),
        topology === 'symlink' ? /regular non-symlink file/ : /must not share \(dev, ino\)/
      );
      assert.deepEqual(fs.readFileSync(sourcePath), sourceBytes, `${topology} rejection must preserve source bytes`);
      assert.equal(sha256(fs.readFileSync(sourcePath)), sourceHash, `${topology} rejection must preserve source SHA`);
      context.assertSourceHashes(`after rejected ${topology} write`);
    }
    for (const [source, sourcePath] of Object.entries(trackedSources)) {
      assert.equal(
        sha256(fs.readFileSync(sourcePath)),
        trackedHashes[source],
        `tracked PACKAGE_ROOT ${source} SHA must remain unchanged`
      );
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

function assertInstalledReadinessMutationsDetected(tempRoot, project, platform) {
  const context = installedMutationContext(tempRoot, project, platform);
  const baseline = Object.fromEntries(
    Object.entries(context.installedPaths).map(([source, target]) => [source, fs.readFileSync(target, 'utf8')])
  );
  const apiBoundary = IMPLEMENTATION_READINESS_BOUNDARY_ROWS.find(([label]) => label === 'API/CLI');
  assert.ok(apiBoundary, 'API/CLI boundary contract must exist');
  const mutations = [
    {
      name: 'no-invention-blocking', issue: 'no-invention', source: 'templates',
      from: IMPLEMENTATION_READINESS_CLAUSES.noInvention,
      to: 'Before implementation handoff, note ambiguous choices without blocking handoff.',
    },
    {
      name: 'api-success-and-error-semantics', issue: 'boundary-contract', source: 'templates',
      from: `| ${apiBoundary[0]} | ${apiBoundary[1]} |`,
      to: `| ${apiBoundary[0]} | ${apiBoundary[1].replace('success output; ', '').replace('error/status/exit; ', '')} |`,
    },
    {
      name: 'concrete-named-probe', issue: 'proof-chain', source: 'templates',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines[1],
      to: '- Named probe: <suite label>',
    },
    {
      name: 'artifact-path-and-digest-or-ephemeral', issue: 'proof-chain', source: 'templates',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines[5],
      to: '- Artifacts: <required artifact path, or none>',
    },
    {
      name: 'distinct-repair-and-proof-evidence', issue: 'repair-closure', source: 'review',
      from: IMPLEMENTATION_READINESS_CLAUSES.distinctRepairProof,
      to: '`Repaired at` and `Proved at` may cite the same repair edit.',
    },
    {
      name: 'crash-versus-catchable-failure', issue: 'failure-semantics', source: 'templates',
      from: IMPLEMENTATION_READINESS_CLAUSES.failureSemantics,
      to: 'Crash and catchable failure both mean an error occurred.',
    },
    {
      name: 'privacy-identifier-surface', issue: 'privacy-identifiers', source: 'review',
      from: IMPLEMENTATION_READINESS_CLAUSES.privacyIdentifiers,
      to: 'Any privacy/security claim names the sensitive data at risk.',
    },
  ];
  assertInstalledSpecsReadiness(project, platform);
  for (const mutation of mutations) {
    const anchorIndex = baseline[mutation.source].indexOf(mutation.from);
    assert.notEqual(anchorIndex, -1, `${platform} ${mutation.name} mutation anchor must exist`);
    assert.equal(
      baseline[mutation.source].indexOf(mutation.from, anchorIndex + mutation.from.length),
      -1,
      `${platform} ${mutation.name} mutation anchor must be unique`
    );
    const weakened = `${baseline[mutation.source].slice(0, anchorIndex)}${mutation.to}${baseline[mutation.source].slice(anchorIndex + mutation.from.length)}`;
    try {
      context.writeInstalled(mutation.source, weakened, `${mutation.name} mutation`);
      assertInstalledSpecsReadiness(project, platform, [mutation.issue]);
    } finally {
      context.writeInstalled(mutation.source, baseline[mutation.source], `${mutation.name} restoration`);
    }
    assertInstalledSpecsReadiness(project, platform);
  }
}

function assertPristineUpgradeAndUserPreservation(installer, tempRoot, project, platform) {
  const runtime = RUNTIMES[platform];
  const context = installedMutationContext(tempRoot, project, platform);
  const templatesPath = context.installedPaths.templates;
  const manifestPath = path.join(project, runtime.manifest);
  const metadataPath = path.join(project, runtime.root, 'cafekit.json');
  const baseline = fs.readFileSync(templatesPath, 'utf8');
  const weakened = baseline.replace(NO_INVENTION_ANCHOR, '');
  assert.notEqual(weakened, baseline, `${platform} old fixture mutation must apply`);
  try {
    context.writeInstalled('templates', weakened, 'pristine-upgrade mutation');
    const oldManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.ok(oldManifest.files[runtime.templatesManifestPath], `${platform} templates ownership record missing`);
    oldManifest.files[runtime.templatesManifestPath] = {
      ...oldManifest.files[runtime.templatesManifestPath], sha256: sha256(weakened), version: OLD_FIXTURE_VERSION
    };
    writeJson(manifestPath, oldManifest);
    const oldMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    oldMetadata.version = OLD_FIXTURE_VERSION;
    writeJson(metadataPath, oldMetadata);

    runInstaller(installer, project, [platform], null);
    context.assertSourceHashes('immediately after pristine-upgrade installer');
    context.assertSafeInstalledTarget('templates', 'after pristine-upgrade installer');
    assert.equal(fs.readFileSync(templatesPath, 'utf8'), baseline, `${platform} pristine old gate must upgrade`);
    assert.equal(JSON.parse(fs.readFileSync(metadataPath, 'utf8')).version, PACKAGE_VERSION);
    const upgradedManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(upgradedManifest.files[runtime.templatesManifestPath].sha256, sha256(baseline));
    assert.equal(upgradedManifest.files[runtime.templatesManifestPath].version, PACKAGE_VERSION);
    assertInstalledSpecsReadiness(project, platform);

    context.writeInstalled('templates', weakened, 'user-preservation mutation after installer');
    const manifestBeforePreservedRerun = fs.readFileSync(manifestPath, 'utf8');
    const preserved = runInstaller(installer, project, [platform], null);
    context.assertSourceHashes('immediately after user-preservation installer');
    context.assertSafeInstalledTarget('templates', 'after user-preservation installer');
    assert.equal(fs.readFileSync(templatesPath, 'utf8'), weakened, `${platform} user edit must be preserved`);
    assert.equal(fs.readFileSync(manifestPath, 'utf8'), manifestBeforePreservedRerun, `${platform} user-modified manifest must stay unchanged`);
    assert.match(`${preserved.stdout}\n${preserved.stderr}`, /preserved \(user-modified\): Skill: specs/);
    assertInstalledSpecsReadiness(project, platform, ['no-invention']);
  } finally {
    context.writeInstalled('templates', baseline, 'upgrade and user-preservation restoration');
  }
  assertInstalledSpecsReadiness(project, platform);
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

  for (const [content, marker] of [
    [agents, '<!-- CAFEKIT CORE START -->'],
    [agents, '<!-- CAFEKIT CODEX START -->'],
    [claude, '<!-- CAFEKIT CLAUDE START -->']
  ]) assert.equal((content.match(new RegExp(marker, 'g')) || []).length, 1);

  assert.doesNotMatch(core, /Claude|Codex|\.claude|\.codex|\/hapo:|\$hapo-/i);
  assert.doesNotMatch(claudeBlock, /Codex|\.codex|\$hapo-/i);
  assert.match(codexBlock, /native project instruction surface is root `AGENTS\.md`/);
  assert.match(agents, /shared-root trade-off is intentional/);
  // H5 ownership/ignore contract
  assert.match(core, /runtime-neutral/i);
  assert.match(core, /fail-safe/i);
  assert.match(codexBlock, /owned by Codex/i);
  assert.match(codexBlock, /If you are Claude Code or any other runtime, ignore this entire Codex block/i);
  assert.doesNotMatch(codexBlock, /If you are Codex CLI or any other runtime, ignore this entire Codex block/i);
  assert.doesNotMatch(core, /\$hapo-|hapo:/i);
  assert.doesNotMatch(claudeBlock, /<!-- CAFEKIT CODEX /);
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
    scaffold: path.join(runtimeRoot, 'scripts', 'spec-scaffold.cjs'),
    validator: path.join(runtimeRoot, 'scripts', 'validate-spec-output.cjs'),
    authoringValidator: path.join(runtimeRoot, 'scripts', 'spec-authoring-validation.cjs'),
    authoringDigest: path.join(runtimeRoot, 'scripts', 'spec-authoring-digest.cjs'),
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
  runInstalled(paths.scaffold, [feature], root);
  const state = JSON.parse(fs.readFileSync(path.join(featureDir, 'spec.json'), 'utf8'));
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

- **R1.1**: The CommonJS entrypoint \`src/entry.js\` shall return an object containing only status \`enabled\` when its sole \`valid\` argument is the boolean \`true\`; it shall return an object containing only status \`rejected\` for \`false\`, a missing argument, or any non-boolean value.${proof ? '\n- **R1.2**: The installed verifier shall prove the observed entry behavior through its grounded evidence boundary.' : ''}
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
  expected = 'exit 0; boolean true returns the exact enabled object; false, undefined, null, `"true"`, 1, and an object return the exact rejected object',
  taskful = false,
} = {}) {
  const anchors = typedAnchorTable([{
    id: 'A-D-01', type: 'file', target: taskful ? 'src/design-boundary.js' : 'src/entry.js',
    role: taskful ? 'existing design boundary for the entrypoint' : 'existing runtime entrypoint and contract owner',
    access: 'read', action: 'read',
  }]);
  const reachabilityAnchors = taskful ? 'A-R1-01-01, A-R1-02-02' : 'A-D-01';
  return `# Design

## Boundary

- **Owns:** The exact return contract of the CommonJS function exported by \`src/entry.js\`.
- **Reads:** One \`valid\` argument; only the boolean \`true\` is valid.
- **Writes/exposes:** Exactly one status field whose value is \`enabled\` or \`rejected\`.
- **Outside boundary:** Unrelated runtime behavior.

## Typed Anchors

${anchors}

## Decisions and Invariants

### D1 — Installed result decision

- **Decision:** \`valid === true\` returns an object containing only status \`enabled\`; every other value returns an object containing only status \`rejected\`.
- **Rejects ambiguity:** Truthy non-booleans such as \`"true"\` never count as valid.
- **Negative path:** \`false\`, \`undefined\`, \`null\`, strings, numbers, and objects return rejected.
- **Anchors:** A-D-01

### I1 — Rejection invariant

Any input other than the boolean \`true\` never returns enabled.

### C1 — Result contract

- **Owner:** A-D-01
- **Consumers:** \`test/entry.test.js\` and callers of the CommonJS export.
- **Shape/behavior:** The result is an object with exactly one \`status\` field set to \`enabled\` or \`rejected\`.
- **Compatibility:** The strict boolean discriminator, exact object shape, and two status values remain stable.

## Verification Definitions

- **V1**: Criteria R1.1; Owner ${taskful ? 'R1-01' : 'A-D-01'}; ${taskful ? 'Proof criteria R1.2; Proof owner R1-02; Evidence anchor A-R1-02-02; ' : ''}Decision refs D1, I1, C1; Method command \`node --test test/entry.test.js\`; Expected ${expected}; Negative/failure \`false\`, missing input, \`null\`, and truthy non-booleans all return the exact rejected object; Reachability/grounding entrypoint \`src/entry.js\` via ${reachabilityAnchors}.
`;
}

function completeSemanticReview(paths, root, fixture, counterexamples) {
  // C16/D13: only the installed spec-authoring-validation.cjs coordinator may
  // flip authoring.* to validated and write the matching receipt (I21/R3.9) —
  // run it over the fixture's current bytes instead of hand-writing the enum.
  // Lifecycle order (I15/R3.7): authoring -> coordinator -> semantic review ->
  // readiness, never the reverse.
  runInstalled(paths.scaffold, [fixture.state.feature_name, '--sync-semantic-model'], root);
  runInstalled(paths.authoringValidator, [fixture.featureDir], root);
  const state = JSON.parse(fs.readFileSync(fixture.specFile, 'utf8'));
  fixture.reviewResult = {
    verdict: 'PASS',
    findings: [],
    unresolved_decisions: [],
    graph_coverage: [
      'criterion_local', 'cross_criterion', 'runtime_path',
      'assumption_provenance', 'compatibility_migration',
    ].map((surface) => ({
      surface, covered: true,
      notes: 'The review covers this semantic surface against the canonical model.',
    })),
    reviewed_criteria: counterexamples.map(({ criterion }) => criterion),
    counterexamples,
    reviewer_evidence: null,
  };
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
  fs.writeFileSync(path.join(root, 'src', 'entry.js'), 'module.exports = (valid) => ({ status: valid === true ? "enabled" : "rejected" });\n');
  fs.writeFileSync(path.join(root, 'src', 'design-boundary.js'), 'module.exports = { entry: "src/entry.js" };\n');
  fs.writeFileSync(path.join(root, 'test', 'entry.test.js'), `const test = require('node:test');
const assert = require('node:assert/strict');
const entry = require('../src/entry.js');

test('entry accepts only the boolean true discriminator', () => {
  assert.deepEqual(entry(true), { status: 'enabled' });
  for (const invalid of [false, undefined, null, 'true', 1, {}]) {
    assert.deepEqual(entry(invalid), { status: 'rejected' });
  }
});
`);
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
  const artifactPath = `artifacts/${id}.json`;
  const anchors = typedAnchorTable([
    { id: `A-${id}-01`, type: 'file', target: ownedPath, role: 'owner', access: 'write', action: 'modify' },
    ...(artifact ? [{
      id: `A-${id}-02`, type: 'artifact', target: artifactPath,
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
- **Expected:** Exit code 0 and the criterion-specific state is observed.${artifact ? ` The artifact \`${artifactPath}\` must exist, and SHA-256 over its current bytes must match the recorded digest.` : ''}
- **Negative path:** Invalid input returns the named rejected state.
- **Reachability:** \`src/entry.js\` is reached by the installed test command.
`;
}

function createTaskFixture(paths, root, feature) {
  fs.mkdirSync(path.join(root, 'artifacts'), { recursive: true });
  const fixture = materializeSpecState(paths, root, feature);
  fs.writeFileSync(path.join(fixture.featureDir, 'requirements.md'), requirementsProjection({ proof: true }));
  fs.writeFileSync(path.join(fixture.featureDir, 'design.md'), designProjection({
    expected: 'exit 0, status enabled, and verifier artifact `artifacts/R1-02.json` whose SHA-256 over current bytes matches the recorded digest',
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
    expected: 'The verification criterion remains unsatisfied until `artifacts/R1-02.json` exists and its SHA-256 over current bytes matches the recorded digest.',
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

function assertStrictSimulatedHandlerGuardrail(paths, root, fixture) {
  // Simulated SubagentStop handler chain — NOT a live Codex host E2E.
  // This exercises the installed hook's handler logic via direct spawn,
  // not a real Codex binary dispatching SubagentStop. For live host,
  // see the opt-in CAFEKIT_CODEX_HOST_E2E test below.
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-packed-strict-home-'));
  const code = `
const authority = require(process.argv[1]); const readiness = require(process.argv[2]); const root = process.argv[3]; const feature = process.argv[4]; const digest = process.argv[5]; const review = JSON.parse(process.argv[6]);
const spec_file = 'specs/' + feature + '/spec.json';
const marker = authority.MARKER + JSON.stringify({ feature_name: feature, spec_file, semantic_digest: digest, verdict: 'PASS' });
const before = authority.verifyAttestation(root, spec_file, feature, digest);
const {spawnSync} = require('child_process');
const authorityPath = process.argv[1];
function handlerInvoke(payload) {
  return spawnSync(process.execPath, [authorityPath], {cwd: root, input: JSON.stringify(payload), encoding:'utf8', env: {...process.env, HOME: process.env.HOME, USERPROFILE: process.env.HOME, PROJECT_ROOT: root}});
}
const forgedPayload = {cwd: root, hook_event_name: 'SubagentStop', session_id: 'self-session', agent_id: 'self', agent_type: 'spec-maker', last_assistant_message: marker};
const forgedRes = handlerInvoke(forgedPayload);
const afterForged = authority.verifyAttestation(root, spec_file, feature, digest);
const observedPayload = {cwd: root, hook_event_name: 'SubagentStop', session_id: 'host-session', agent_id: 'reviewer-1', agent_type: 'code-auditor', last_assistant_message: marker};
const observedRes = handlerInvoke(observedPayload);
const afterObserved = authority.verifyAttestation(root, spec_file, feature, digest);
const finalized = readiness.finalizeReadiness({ specDir: require('path').join(root, 'specs', feature), projectRoot: root, reviewResult: review });
process.stdout.write(JSON.stringify({ before: before.ok, forged: afterForged.ok, afterForged: afterForged.ok, observed: afterObserved.ok, afterObserved: afterObserved.ok, ready: finalized.spec.ready_for_implementation, forgedStderr: forgedRes.stderr.trim(), observedStderr: observedRes.stderr.trim() }));`;
  const result = spawnSync(process.execPath, ['-e', code, paths.semanticAuthority, paths.readiness, root, fixture.state.feature_name, fixture.digest, JSON.stringify(fixture.reviewResult)], {
    cwd: root, encoding: 'utf8', env: { ...process.env, HOME: home, PROJECT_ROOT: root },
  });
  fs.rmSync(home, { recursive: true, force: true });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const out = JSON.parse(result.stdout);
  // Simulated handler: forged self-attestation via spec-maker must NOT create observation, code-auditor must.
  assert.equal(out.before, false, 'strict attestation must be missing before simulated handler observation');
  assert.equal(out.afterForged, false, 'forged self-attestation must NOT create simulated handler observation');
  assert.equal(out.afterObserved, true, 'code-auditor simulated handler must create observation');
  assert.equal(out.ready, true, 'SPEC_READY after simulated handler observation');
  assert.ok(out.forgedStderr.includes('rejected') || out.forgedStderr === '', 'forged handler invoke should be rejected or silent but not create observation');
  assert.equal(out.observedStderr, '', 'code-auditor simulated handler observation should be silent');
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
      { name: 'combined', platforms: ['claude', 'codex'] },
      { name: 'combined-rerun', platforms: ['claude', 'codex'], rerun: true },
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
          assertInstalledSpecsReadiness(project, platform);
          if (matrixCase.platforms.length === 1 && lang === null) {
            assertInstalledReadinessMutationsDetected(root, project, platform);
            assertPristineUpgradeAndUserPreservation(installer, root, project, platform);
          }
        }
        if (matrixCase.platforms.includes('claude') && matrixCase.platforms.includes('codex')) {
          assertCombinedInstructionIsolation(project);
        }
        if (matrixCase.rerun) {
          fs.appendFileSync(path.join(project, 'AGENTS.md'), '\n## User matrix note\nKeep this exact.\n');
          fs.appendFileSync(path.join(project, 'CLAUDE.md'), '\n## User Claude matrix note\nKeep this exact.\n');
          const before = stableInstallSnapshot(project, matrixCase.platforms);
          runInstaller(installer, project, matrixCase.platforms, lang);
          const after = stableInstallSnapshot(project, matrixCase.platforms);
          const changed = [...new Set([...Object.keys(before), ...Object.keys(after)])]
            .filter((file) => !before[file] || !after[file] || !before[file].equals(after[file]));
          assert.deepEqual(changed, [], `${matrixCase.name} rerun must be byte-idempotent`);
          for (const platform of matrixCase.platforms) assertInstalledSpecsReadiness(project, platform);
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
      assertStrictSimulatedHandlerGuardrail(paths, project, strict);
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

test('packed Codex live host E2E via codex binary (opt-in)', async (t) => {
  if (process.env.CAFEKIT_CODEX_HOST_E2E !== '1') {
    t.skip('opt-in only: set CAFEKIT_CODEX_HOST_E2E=1 to run live Codex host');
    return;
  }
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-live-codex-'));
  const destination = path.join(root, 'pack');
  fs.mkdirSync(destination, { recursive: true });
  const cafekitHome = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-live-home-'));
  const originalHome = process.env.HOME;
  const originalUserProfile = process.env.USERPROFILE;
  const originalCodexHome = process.env.CODEX_HOME;
  // Preserve original home for Codex auth (without inspecting contents)
  const authHome = originalCodexHome || (originalHome ? path.join(originalHome, '.codex') : null);
  let project;
  try {
    const packed = npmPack(['--pack-destination', destination, '--json'], PACKAGE_ROOT);
    const tarball = path.join(destination, packed.filename);
    const runtimeClosure = packedRuntimeClosure(path.join(root, 'runtime-closure'));
    project = path.join(root, 'codex-live');
    const installer = installPacked(tarball, project, runtimeClosure);
    runInstaller(installer, project, ['codex'], null);
    const paths = installedSemanticPaths(project, 'codex');
    const fixture = createTasklessFixture(paths, project, 'live-strict', { strict: true });
    initializeGit(project);
    // Verify via child process to keep CafeKit state isolated without mutating global env
    const verifyViaChild = (digest) => {
      const script = 'const a=require(process.argv[1]); console.log(JSON.stringify(a.verifyAttestation(process.argv[2],process.argv[3],process.argv[4],process.argv[5])))';
      const res = spawnSync(process.execPath, ['-e', script, paths.semanticAuthority, project, path.join(project, 'specs', 'live-strict', 'spec.json'), 'live-strict', digest], {
        encoding: 'utf8',
        env: { ...process.env, HOME: cafekitHome, USERPROFILE: cafekitHome },
      });
      assert.equal(res.status, 0, `verify child failed: ${res.stderr}`);
      return JSON.parse(res.stdout);
    };
    const before = verifyViaChild(fixture.digest);
    assert.equal(before.ok, false, 'before host observation, Strict attestation must be missing (fail-closed)');

    const model = process.env.CAFEKIT_CODEX_MODEL || 'gpt-5.6-luna';
    const reasoning = process.env.CAFEKIT_CODEX_REASONING || 'max';
    const codexBin = process.env.CAFEKIT_CODEX_BIN || 'codex';
    const canonicalProject = fs.realpathSync(project);
    const codeAuditorConfig = path.join(canonicalProject, '.codex', 'agents', 'code_auditor.toml');
    const semanticAuthorityHook = fs.realpathSync(paths.semanticAuthority);
    const shellQuote = (value) => `'${String(value).replaceAll("'", `'\\''`)}'`;
    const posixHookCommand = `${shellQuote(process.execPath)} ${shellQuote(semanticAuthorityHook)}`;
    const encodedHookPath = Buffer.from(semanticAuthorityHook, 'utf8').toString('base64url');
    const windowsHookCommand = 'node -e "process.argv[1]=Buffer.from(process.argv[1],\'base64url\').toString(\'utf8\');require(\'module\').runMain()" ' + encodedHookPath;
    const subagentStopHooks = `[{ matcher = "*", hooks = [{ type = "command", command = ${JSON.stringify(posixHookCommand)}, commandWindows = ${JSON.stringify(windowsHookCommand)} }] }]`;
    assert.equal(fs.existsSync(codeAuditorConfig), true, 'packed install must contain code_auditor config');
    const versionCheck = spawnSync(codexBin, ['--version'], { encoding: 'utf8' });
    if (versionCheck.status !== 0) {
      assert.fail(`Codex binary not available at ${codexBin}: ${versionCheck.stderr.trim()} (exit ${versionCheck.status})`);
    }
    const controllerPrompt = [
      'You are a CafeKit controller. Do NOT emit CAFEKIT_SEMANTIC_REVIEW_ATTESTATION yourself.',
      `Spawn exactly one subagent with agent_type="code_auditor" to perform Strict semantic review for feature live-strict.`,
      'Wait for that exact subagent to finish by calling wait_agent before you answer.',
      'This is a specs-only authoring review: assess requirements, design, semantic model, and counterexample coverage only. Do not require implementation code, execution receipts, or a Develop run.',
      'The request has assurance_level: Strict. Keep the review bounded to this fixture and do not invoke a skill.',
      'This is intentionally a pre-finalization candidate: semantic_model is null and semantic_review is not-run until a PASS marker is observed and spec-readiness atomically promotes them. Do not run or require the full validator before that host event because it must fail closed at this stage.',
      `The subagent must recompute the digest via: node .codex/scripts/validate-spec-output.cjs specs/live-strict --semantic-digest`,
      `The exact review result that will be passed to the finalizer is ${JSON.stringify(fixture.reviewResult)}. Verify every criterion, counterexample, decision ref, verification ref, and artifact statement before PASS.`,
      `If the subagent verifies PASS and the digest matches ${fixture.digest}, it must emit exactly:`,
      `CAFEKIT_SEMANTIC_REVIEW_ATTESTATION {"feature_name":"live-strict","spec_file":"specs/live-strict/spec.json","semantic_digest":"${fixture.digest}","verdict":"PASS"}`,
      'No other marker. After the subagent, do not add any marker.',
    ].join(' ');

    const execArgs = [
      'exec',
      '-m', model,
      '-c', `model_reasoning_effort=${reasoning}`,
      // Project agents are intentionally skipped until a user trusts the repo.
      // This disposable E2E must not mutate global trust, so register the
      // packed profile explicitly for this process. Static packed tests cover
      // the normal trusted-project auto-discovery path and file schema.
      '-c', 'agents.code_auditor.description="CafeKit Strict semantic reviewer"',
      '-c', `agents.code_auditor.config_file=${JSON.stringify(codeAuditorConfig)}`,
      // Isolate this E2E from the user's config/hooks while retaining auth.
      // The process-scoped hook executes the packed entrypoint directly.
      '--ignore-user-config',
      // Only thread-spawned Codex subagents emit the supported SubagentStop
      // event. The legacy internal path emits spawn PostToolUse but no
      // hook-observable completion payload and must remain fail-closed.
      '--enable', 'multi_agent_v2',
      '-c', 'features.hooks=true',
      '-c', `hooks.SubagentStop=${subagentStopHooks}`,
      '-s', 'read-only',
      '--dangerously-bypass-hook-trust',
      '--ephemeral',
      '-C', canonicalProject,
      controllerPrompt,
    ];
    const codexResult = spawnSync(codexBin, execArgs, {
      cwd: project,
      encoding: 'utf8',
      timeout: 600000,
      maxBuffer: 16 * 1024 * 1024,
      env: { ...process.env, HOME: cafekitHome, USERPROFILE: cafekitHome, ...(authHome ? { CODEX_HOME: authHome } : {}) },
    });
    if (codexResult.status !== 0) {
      const cliOutput = `${codexResult.stderr.trim()}\n${codexResult.stdout.trim()}`.trim();
      const processState = [
        `status=${codexResult.status}`,
        `signal=${codexResult.signal || 'none'}`,
        codexResult.error ? `spawn_error=${codexResult.error.code || codexResult.error.message}` : null,
      ].filter(Boolean).join(', ');
      const isEnvAuth = /authentication|unauthorized|credential|not logged in|login required|CODEX_HOME|not.*found|ENOENT/i.test(cliOutput);
      if (isEnvAuth) {
        assert.fail(`Live Codex host failed due to CLI/environment (${processState}): ${cliOutput.slice(0, 1600)}`);
      }
      assert.fail(`Live Codex host exec failed (${processState}): ${cliOutput.slice(0, 1600)}`);
    }
    // Verify via public authority API only (no HOME inspection) via child process
    const after = verifyViaChild(fixture.digest);
    const liveTrace = `${codexResult.stderr || ''}\n${codexResult.stdout || ''}`.trim();
    assert.equal(
      after.ok,
      true,
      `host observation must exist after Codex reviewer completion event (got ${after.reason})\n` +
      `Codex trace tail:\n${liveTrace.slice(-6000)}`,
    );
    assert.equal(after.record.reviewer_agent_type, 'code_auditor', 'observation must be from code_auditor');
    const reviewFile = path.join(project, 'specs', 'live-strict', '.live-review.json');
    fs.writeFileSync(reviewFile, JSON.stringify(fixture.reviewResult));
    const readinessResult = spawnSync(process.execPath, [paths.readiness, path.join(project, 'specs', 'live-strict'), '--review-result', reviewFile], {
      cwd: project,
      encoding: 'utf8',
      env: { ...process.env, HOME: cafekitHome },
    });
    fs.unlinkSync(reviewFile);
    assert.equal(readinessResult.status, 0, `readiness should succeed after host observation: ${readinessResult.stderr.trim()}`);
    assert.match(readinessResult.stdout, /SPEC_READY/);
    const specAfter = JSON.parse(fs.readFileSync(path.join(project, 'specs', 'live-strict', 'spec.json'), 'utf8'));
    assert.equal(specAfter.ready_for_implementation, true, 'SPEC_READY after live host observation');
  } finally {
    // Restore exact environment on all paths
    if (originalHome !== undefined) process.env.HOME = originalHome; else delete process.env.HOME;
    if (originalUserProfile !== undefined) process.env.USERPROFILE = originalUserProfile; else delete process.env.USERPROFILE;
    if (originalCodexHome !== undefined) process.env.CODEX_HOME = originalCodexHome; else delete process.env.CODEX_HOME;
    // Clear require cache for authority to avoid polluting other tests
    try {
      const tmpPaths = path.join(root || os.tmpdir(), 'codex-live', '.codex', 'hooks', 'semantic-review-authority.cjs');
      delete require.cache[require.resolve(tmpPaths)];
    } catch {}
    fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(cafekitHome, { recursive: true, force: true });
  }
});
