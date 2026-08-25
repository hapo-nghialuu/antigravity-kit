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
const SPECS_SOURCE_ROOT = path.join(PACKAGE_ROOT, 'src/claude/skills/specs');
const IMPLEMENTATION_READINESS_BOUNDARY_ROWS = [
  ['API/CLI', 'entrypoint/route or command grammar; identity/auth; input/default/normalization; success output; error/status/exit; duplicate/retry/idempotency; compatibility'],
  ['Schema', 'version; exact keys/nesting/types; required/optional; enum/format/bounds/cardinality; unknown-field behavior; compatibility/migration'],
  ['State/concurrency', 'initial/terminal states; event + guard + effect + next + error; ordering; duplicate/retry; writer/lock acquire/contention/release; rollback/recovery'],
  ['Filesystem/security', 'authoritative root; trusted/untrusted segment grammar; lexical + canonical containment and symlink policy; flags/mode; temp/rename/fsync; lock/stale reclaim; crash cleanup'],
  ['Time/retention', 'clock source; unit/precision/timezone; endpoints and inclusion/comparator; anomaly behavior; expiry/purge/recovery'],
  ['Integration/proof', 'caller; export/registration; packaging/config; native path/consumer; proof level (`source`/`installed`/`live`); observable failure oracle']
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
    '- Artifacts: <required artifact path plus digest algorithm/comparison rule, or explicitly ephemeral with cleanup rule>'
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
  scopeReturnsToC1: 'A repair that adds user semantics or scope returns to C1.'
};
const V3_SPECS_BUNDLE = [
  'SKILL.md',
  'references/review.md',
  'references/templates.md',
  'templates/design.md',
  'templates/requirements-init.md',
  'templates/requirements.md',
  'templates/research.md',
  'templates/spec-state.json',
  'templates/task.md'
];
const OBSOLETE_SPECS_FILES = [
  'references/archive-workflow.md',
  'references/ask-user-question-gates.md',
  'references/codebase-analysis.md',
  'references/cross-spec-dependency.md',
  'references/research-strategy.md',
  'references/scope-inquiry.md',
  'references/translation-mirror.md',
  'rules/design-discovery-full.md',
  'rules/design-discovery-light.md',
  'rules/design-principles.md',
  'rules/design-review.md',
  'rules/ears-format.md',
  'rules/phase-decision-matrix.md',
  'rules/task-scoring-rubric.md',
  'rules/tasks-generation.md'
];

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

function allHookLaunchers(config) {
  return Object.entries(config.hooks).flatMap(([event, groups]) => (
    groups.flatMap((group) => group.hooks.map((handler) => ({ event, handler })))
  ));
}

function parseGeneratedTomlString(content, key) {
  const match = content.match(new RegExp(`^${key} = (.+)$`, 'm'));
  assert.ok(match, `missing TOML key: ${key}`);
  return JSON.parse(match[1]);
}

function renderCanonicalVerificationExample(template) {
  const values = new Map([
    ['SUBJECT_REQ', '1'],
    ['X', '1'],
    ['PROOF_REQ', '1'],
    ['Y', '2'],
    ['exact command', 'node --test test/installed.test.js'],
    ['exact anchored target', 'src/installed.js#entry'],
    ['exact/repository/entrypoint', 'src/installed.js'],
    ['observable result', 'the subject behavior and verifier proof both pass'],
    ['concrete observable result and proof', 'the subject behavior and verifier proof both pass'],
    ['concrete rejected or recovery case', 'invalid input remains rejected and observable'],
    ['real entrypoint/caller and grounded anchor expectation', 'the installed entrypoint reaches A-D-01'],
  ]);
  return template.replace(/\{\{([^}]+)\}\}/g, (placeholder, name) => (
    values.has(name) ? values.get(name) : placeholder
  ));
}

function assertInstalledVerificationModel(grounderPath, designTemplate) {
  const { parseVerificationDefinitions } = require(grounderPath);
  assert.equal(typeof parseVerificationDefinitions, 'function');
  const concreteDesign = renderCanonicalVerificationExample(designTemplate);
  const errors = [];
  const definitions = parseVerificationDefinitions(concreteDesign, errors);
  assert.deepEqual(errors, []);
  assert.equal(definitions.size, 1);
  const definition = definitions.get('V1');
  assert.ok(definition);
  assert.deepEqual(definition.subject_criteria, ['R1.1']);
  assert.deepEqual(definition.proof_criteria, []);
  assert.equal(definition.proof_owner, null);
  assert.equal(definition.evidence_anchor, null);
  assert.deepEqual(definition.decision_refs, ['D1', 'I1', 'C1']);
  for (const field of [
    'subject_criteria', 'subject_owner', 'decision_refs', 'method', 'expected',
    'negative', 'reachability'
  ]) {
    const value = definition[field];
    assert.ok(
      Array.isArray(value)
        ? value.length > 0
        : (typeof value === 'string' ? value.trim() !== '' : value && Object.keys(value).length > 0)
    );
  }
  for (const mutation of [
    concreteDesign.replace('- **V1**:', '### V1 —'),
    concreteDesign.replace('- **V1**:', '| V1 |'),
    concreteDesign.replace('; Expected ', '\nExpected '),
    concreteDesign.replace('Decision refs ', 'Decisions '),
  ]) {
    const mutationErrors = [];
    const mutated = parseVerificationDefinitions(mutation, mutationErrors);
    assert.ok(mutationErrors.length > 0);
    assert.equal(mutated.has('V1'), false);
  }
}

function markdownSection(content, heading) {
  const lines = String(content).split('\n');
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start < 0) return '';
  const end = lines.findIndex((line, index) => index > start && /^##\s+/.test(line));
  return lines.slice(start + 1, end < 0 ? undefined : end).join('\n');
}

function markdownTableUnderHeading(content, heading) {
  const lines = markdownSection(content, heading).split('\n');
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

function implementationReadinessIssues(templates, review) {
  if (typeof templates !== 'string' || typeof review !== 'string') {
    throw new TypeError('implementation-readiness checker expects templates and review UTF-8 strings');
  }

  const issues = new Set();
  const authoring = markdownSection(templates, 'No-invention and conditional boundary contracts');
  if (!authoring.includes(IMPLEMENTATION_READINESS_CLAUSES.noInvention)) {
    issues.add('no-invention');
  }

  const boundaryTable = markdownTableUnderHeading(
    templates,
    'No-invention and conditional boundary contracts'
  );
  const expectedBoundaryTable = [
    ['Boundary', 'Required contract when material'],
    ...IMPLEMENTATION_READINESS_BOUNDARY_ROWS
  ];
  if (!authoring.includes(IMPLEMENTATION_READINESS_CLAUSES.materialDefinition)
    || !authoring.includes(IMPLEMENTATION_READINESS_CLAUSES.exactBoundaryChoices)
    || IMPLEMENTATION_READINESS_BOUNDARY_ROWS.length !== 6
    || boundaryTable.length !== expectedBoundaryTable.length
    || JSON.stringify(boundaryTable) !== JSON.stringify(expectedBoundaryTable)) {
    issues.add('boundary-contract');
  }

  const proof = markdownSection(templates, 'Verification Plan');
  const proofPlanLines = proof.split('\n').map((line) => line.trim()).filter((line) => line.startsWith('- '));
  const normalizedProofContract = normalizeMarkdownWhitespace(markdownBetweenHeadings(
    templates,
    'Verification Plan',
    'Canonical inline Receipt'
  ));
  const normalizedProofClauses = [
    IMPLEMENTATION_READINESS_CLAUSES.proofTrace,
    IMPLEMENTATION_READINESS_CLAUSES.namedProbeOwnership,
    IMPLEMENTATION_READINESS_CLAUSES.proofLevelSeparation,
    IMPLEMENTATION_READINESS_CLAUSES.disposableTemplateControls
  ].map(normalizeMarkdownWhitespace);
  const reviewNegativeControls = normalizeMarkdownWhitespace(
    markdownSection(review, 'B2 — fresh-context red team')
  );
  if (JSON.stringify(proofPlanLines) !== JSON.stringify(IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines)
    || normalizedProofClauses.some((clause) => !normalizedProofContract.includes(clause))
    || !reviewNegativeControls.includes(normalizeMarkdownWhitespace(
      IMPLEMENTATION_READINESS_CLAUSES.disposableReviewControls
    ))) {
    issues.add('proof-chain');
  }

  const failureGuidance = markdownSection(templates, 'Twelve edge-case dimensions');
  if (!failureGuidance.includes(IMPLEMENTATION_READINESS_CLAUSES.failureSemantics)) {
    issues.add('failure-semantics');
  }

  const evidenceRules = markdownSection(review, 'B1 — evidence rule');
  if (!evidenceRules.includes(IMPLEMENTATION_READINESS_CLAUSES.privacyIdentifiers)) {
    issues.add('privacy-identifiers');
  }

  const closure = markdownSection(review, 'Accepted-repair closure');
  const normalizedClosure = normalizeMarkdownWhitespace(closure);
  const closureHeader = markdownTableUnderHeading(review, 'Accepted-repair closure')[0] || [];
  if (JSON.stringify(closureHeader) !== JSON.stringify([
    'ID', 'Decision', 'Original counterexample', 'Repaired at', 'Proved at', 'Replay', 'Closure'
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

function authoringProjectionIssues(files) {
  const issues = [];
  issues.push(...implementationReadinessIssues(files.templates, files.review));
  const foreignRuntimeBoundary = 'If you are Claude Code or any other runtime, ignore this entire Codex block';
  if (!files.skill.includes('Task files are flat beside `plan.md`')
    || !files.skill.includes('Do not create a nested task directory.')) {
    issues.push('flat-layout-entrypoint');
  }
  if (!files.templates.includes('The primary layout is always flat:')
    || !files.templates.includes('task-NN-<slug>.md')) {
    issues.push('flat-layout-template');
  }
  for (const gate of ['C1 — Scope', 'C2 — Findings', 'C3 — Done']) {
    if (!files.skill.includes(gate)) issues.push(`human-gate-${gate.slice(0, 2).toLowerCase()}`);
  }
  if (!files.review.includes('fresh-context red team')
    || !/Cap the presented\s+list at 15/.test(files.review)
    || !files.review.includes('at most two review-and-repair rounds')) {
    issues.push('adversarial-review');
  }
  if (!files.skill.includes('inline `## Receipt`')
    || !files.templates.includes('## Canonical inline Receipt')) {
    issues.push('inline-receipt');
  }
  for (const field of [
    'Verification: PASS', 'Command:', 'Exit: 0', 'Base:', 'Head:'
  ]) {
    if (!files.templates.includes(field)) issues.push(`receipt-${field.toLowerCase()}`);
  }
  if (!/^name: hapo-specs$/m.test(files.skill)) issues.push('codex-skill-name');
  const bundle = [files.skill, files.review, files.templates, files.legacyTemplates].join('\n');
  const runtimeProjection = `${bundle}\n${files.codex.replace(foreignRuntimeBoundary, '')}`;
  if (!files.codex.includes(foreignRuntimeBoundary)
    || files.codex.includes('If you are Codex CLI or any other runtime, ignore this entire Codex block')) {
    issues.push('codex-ownership-boundary');
  }
  for (const claudeOnly of [
    'AskUserQuestion', 'TaskCreate', 'TaskGet', 'TaskUpdate', 'TaskList',
    'WebSearch', 'WebFetch', 'SendMessage', 'Claude Code', '.claude', '/hapo:', 'hapo:'
  ]) {
    if (runtimeProjection.includes(claudeOnly)) issues.push(`claude-vocabulary-${claudeOnly}`);
  }
  for (const command of ['$hapo-specs', '$hapo-develop', '$hapo-sync']) {
    if (!files.codex.includes(command)) issues.push(`codex-command-${command}`);
  }
  for (const state of ['pending', 'in_progress', 'paused', 'blocked', 'done']) {
    if (!files.codex.includes(`\`${state}\``)) issues.push(`lifecycle-${state}`);
  }
  if (!files.codex.includes('flat `task-NN-*.md` files')
    || !files.codex.includes('inline `## Receipt`')
    || !files.codex.includes('C1') || !files.codex.includes('C2') || !files.codex.includes('C3')) {
    issues.push('codex-process-v3');
  }
  return [...new Set(issues)].sort();
}

function canonicalInstalledSpecsRoot(projectRoot, installedRoot) {
  assert.equal(path.isAbsolute(projectRoot), true, 'project root must be absolute');
  assert.equal(path.isAbsolute(installedRoot), true, 'installed Specs root must be absolute');
  const canonicalProject = fs.realpathSync(projectRoot);
  const canonicalInstalled = fs.realpathSync(installedRoot);
  const relative = path.relative(canonicalProject, canonicalInstalled);
  assert.ok(relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), 'installed Specs root must stay inside project');
  assert.equal(
    canonicalInstalled,
    fs.realpathSync(path.join(canonicalProject, '.agents/skills/specs')),
    'checker must read the native installed Codex Specs root'
  );
  return canonicalInstalled;
}

function readInstalledAuthoringProjection(projectRoot, installedRoot) {
  const canonicalRoot = canonicalInstalledSpecsRoot(projectRoot, installedRoot);
  const read = (relative) => fs.readFileSync(path.join(canonicalRoot, relative), 'utf8');
  return {
    skill: read('SKILL.md'),
    review: read('references/review.md'),
    templates: read('references/templates.md'),
    legacyTemplates: V3_SPECS_BUNDLE.filter((relative) => relative.startsWith('templates/')).map(read).join('\n'),
    codex: [
      fs.readFileSync(path.join(projectRoot, 'AGENTS.md'), 'utf8'),
      fs.readFileSync(path.join(projectRoot, '.codex/rules/state-sync.md'), 'utf8')
    ].join('\n')
  };
}

function installedAuthoringProjectionIssues(projectRoot, installedRoot) {
  return authoringProjectionIssues(readInstalledAuthoringProjection(projectRoot, installedRoot));
}

function assertInstalledMutationTarget(projectRoot, installedRoot, relative) {
  const canonicalProject = fs.realpathSync(projectRoot);
  const canonicalInstalled = canonicalInstalledSpecsRoot(projectRoot, installedRoot);
  const targetPath = path.join(canonicalInstalled, relative);
  const targetLstat = fs.lstatSync(targetPath);
  assert.equal(targetLstat.isSymbolicLink(), false, 'installed mutation target must not be a symlink');
  assert.equal(targetLstat.isFile(), true, 'installed mutation target must be a regular file');
  const canonicalTarget = fs.realpathSync(targetPath);
  const installedRelative = path.relative(canonicalInstalled, canonicalTarget);
  const projectRelative = path.relative(canonicalProject, canonicalTarget);
  assert.ok(
    installedRelative && installedRelative !== '..'
      && !installedRelative.startsWith(`..${path.sep}`)
      && !path.isAbsolute(installedRelative),
    'installed mutation target must stay inside .agents/skills/specs'
  );
  assert.ok(
    projectRelative && projectRelative !== '..'
      && !projectRelative.startsWith(`..${path.sep}`)
      && !path.isAbsolute(projectRelative),
    'installed mutation target must stay inside the disposable project'
  );
  const canonicalSource = fs.realpathSync(path.join(SPECS_SOURCE_ROOT, relative));
  assert.notEqual(
    canonicalTarget,
    canonicalSource,
    'installed mutation target must not resolve to canonical source'
  );
  const targetStat = fs.statSync(canonicalTarget);
  const sourceStat = fs.statSync(canonicalSource);
  assert.notDeepEqual(
    [targetStat.dev, targetStat.ino],
    [sourceStat.dev, sourceStat.ino],
    'installed mutation target must not share an inode with canonical source'
  );
  return canonicalTarget;
}

function assertCanonicalSpecsSourceBytesUnchanged(sourceBytes) {
  for (const [relative, expected] of sourceBytes) {
    assert.deepEqual(
      fs.readFileSync(path.join(SPECS_SOURCE_ROOT, relative)),
      expected,
      `canonical Specs source bytes changed during installed mutation: ${relative}`
    );
  }
}

function assertInstalledAuthoringProjection(root, installedRoot) {
  canonicalInstalledSpecsRoot(root, installedRoot);
  const relativeFiles = (directory) => allFiles(directory, () => true)
    .map((file) => path.relative(directory, file).split(path.sep).join('/'))
    .sort();
  assert.deepEqual(relativeFiles(SPECS_SOURCE_ROOT), V3_SPECS_BUNDLE);
  assert.deepEqual(relativeFiles(installedRoot), V3_SPECS_BUNDLE);

  for (const relative of V3_SPECS_BUNDLE) {
    const sourcePath = path.join(SPECS_SOURCE_ROOT, relative);
    const expected = normalizeCodexBody(fs.readFileSync(sourcePath, 'utf8'), sourcePath);
    const actual = fs.readFileSync(path.join(installedRoot, relative), 'utf8');
    assert.equal(actual, expected, `Codex Specs projection drifted: ${relative}`);
  }
  for (const relative of OBSOLETE_SPECS_FILES) {
    assert.equal(fs.existsSync(path.join(installedRoot, relative)), false, `obsolete Specs file installed: ${relative}`);
  }

  const files = readInstalledAuthoringProjection(root, installedRoot);
  const sourceBytes = new Map(V3_SPECS_BUNDLE.map((relative) => [
    relative,
    fs.readFileSync(path.join(SPECS_SOURCE_ROOT, relative))
  ]));
  assert.deepEqual(installedAuthoringProjectionIssues(root, installedRoot), []);
  assertCanonicalSpecsSourceBytesUnchanged(sourceBytes);

  if (process.platform !== 'win32') {
    const relative = 'references/templates.md';
    const installedPath = path.join(installedRoot, relative);
    const backupPath = `${installedPath}.cafekit-backup`;
    const sourcePath = path.join(SPECS_SOURCE_ROOT, relative);
    fs.renameSync(installedPath, backupPath);
    try {
      fs.linkSync(sourcePath, installedPath);
      assert.throws(
        () => assertInstalledMutationTarget(root, installedRoot, relative),
        /must not share an inode with canonical source/
      );
      assertCanonicalSpecsSourceBytesUnchanged(sourceBytes);
    } finally {
      try { fs.unlinkSync(installedPath); } catch { /* best-effort disposable cleanup */ }
      fs.renameSync(backupPath, installedPath);
    }
  }

  const boundaryMutation = (name, boundary, replacements) => {
    const row = IMPLEMENTATION_READINESS_BOUNDARY_ROWS.find(([label]) => label === boundary);
    assert.ok(row, `${name} references unknown boundary ${boundary}`);
    let weakened = row[1];
    for (const [from, to] of replacements) {
      const next = weakened.replace(from, to);
      assert.notEqual(next, weakened, `${name} weakening anchor must exist in ${boundary}`);
      weakened = next;
    }
    return {
      name,
      issue: 'boundary-contract',
      relative: 'references/templates.md',
      from: `| ${row[0]} | ${row[1]} |`,
      to: `| ${row[0]} | ${weakened} |`
    };
  };

  const readinessMutations = [
    {
      name: 'no-invention-blocking',
      issue: 'no-invention',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.noInvention,
      to: 'Before implementation handoff, note ambiguous choices without blocking handoff.'
    },
    {
      name: 'material-boundary-definition',
      issue: 'boundary-contract',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.materialDefinition,
      to: 'A boundary is material when it seems relevant to the task.'
    },
    {
      name: 'exact-boundary-choices',
      issue: 'boundary-contract',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.exactBoundaryChoices,
      to: 'For every required row, describe the listed choices generally.'
    },
    boundaryMutation('api-success-and-error-semantics', 'API/CLI', [
      ['success output; ', ''],
      ['error/status/exit; ', '']
    ]),
    boundaryMutation('schema-shape-and-unknown-fields', 'Schema', [
      ['exact keys/nesting/types; ', ''],
      ['unknown-field behavior; ', '']
    ]),
    boundaryMutation('state-lock-lifecycle', 'State/concurrency', [
      ['writer/lock acquire/contention/release', 'writer/lock']
    ]),
    boundaryMutation('filesystem-segment-grammar', 'Filesystem/security', [
      ['trusted/untrusted segment grammar; ', '']
    ]),
    boundaryMutation('filesystem-stale-lock-reclaim', 'Filesystem/security', [
      ['lock/stale reclaim; ', '']
    ]),
    boundaryMutation('retention-clock-and-endpoints', 'Time/retention', [
      ['clock source; ', ''],
      ['unit/precision/timezone; ', ''],
      ['endpoints and inclusion/comparator; ', '']
    ]),
    boundaryMutation('proof-level-partition', 'Integration/proof', [
      ['proof level (`source`/`installed`/`live`)', 'proof level']
    ]),
    {
      name: 'concrete-named-probe',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines[1],
      to: '- Named probe: <suite label>'
    },
    {
      name: 'aggregate-suite-probe-owner',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.namedProbeOwnership,
      to: 'Aggregate suites may cite only the suite label.'
    },
    {
      name: 'reachability-levels',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines[2],
      to: '- Reachability: <entrypoint or consumer>'
    },
    {
      name: 'proof-level-separation',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofLevelSeparation,
      to: 'Proof may be promoted between source, installed, and live levels.'
    },
    {
      name: 'disposable-template-negative-controls',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.disposableTemplateControls,
      to: 'Run mutation or destructive negative controls against the available project copy.'
    },
    {
      name: 'disposable-review-negative-controls',
      issue: 'proof-chain',
      relative: 'references/review.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.disposableReviewControls,
      to: 'Run mutation or destructive negative controls against the available project copy.'
    },
    {
      name: 'artifact-path-and-digest-or-ephemeral',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines[5],
      to: '- Artifacts: <required artifact path, or none>'
    },
    {
      name: 'proof-counterexample',
      issue: 'proof-chain',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.proofPlanLines[4],
      to: '- Counterexample: <example>'
    },
    {
      name: 'repair-and-proof-columns',
      issue: 'repair-closure',
      relative: 'references/review.md',
      from: '| ID | Decision | Original counterexample | Repaired at | Proved at | Replay | Closure |',
      to: '| ID | Decision | Original counterexample | Repaired at | Evidence | Replay | Closure |'
    },
    {
      name: 'fresh-original-counterexample-replay',
      issue: 'repair-closure',
      relative: 'references/review.md',
      from: 'After applying an accepted C2 finding, a fresh-context closure pass records and\nfreshly replays its original counterexample after the repair under this exact review-log header:',
      to: 'After applying an accepted C2 finding, record the repair under this review-log header:'
    },
    {
      name: 'distinct-repair-and-proof-evidence',
      issue: 'repair-closure',
      relative: 'references/review.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.distinctRepairProof,
      to: '`Repaired at` and `Proved at` may cite the same repair edit.'
    },
    {
      name: 'unknown-blocks-handoff',
      issue: 'repair-closure',
      relative: 'references/review.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.unknownBlocks,
      to: '`PASS` closes it; `FAIL` and `UNKNOWN` may continue to implementation handoff.'
    },
    {
      name: 'crash-versus-catchable-failure',
      issue: 'failure-semantics',
      relative: 'references/templates.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.failureSemantics,
      to: 'Crash and catchable failure both mean an error occurred.'
    },
    {
      name: 'privacy-identifier-surface',
      issue: 'privacy-identifiers',
      relative: 'references/review.md',
      from: IMPLEMENTATION_READINESS_CLAUSES.privacyIdentifiers,
      to: 'Any privacy/security claim names the sensitive data at risk.'
    }
  ];

  for (const { name, issue, relative, from, to } of readinessMutations) {
    const target = assertInstalledMutationTarget(root, installedRoot, relative);
    const installedBytes = fs.readFileSync(target, 'utf8');
    const anchorIndex = installedBytes.indexOf(from);
    assert.ok(anchorIndex >= 0, `${name} mutation anchor must exist in installed bytes`);
    assert.equal(
      installedBytes.indexOf(from, anchorIndex + from.length),
      -1,
      `${name} mutation anchor must be unique in installed bytes`
    );
    const weakened = `${installedBytes.slice(0, anchorIndex)}${to}${installedBytes.slice(anchorIndex + from.length)}`;
    try {
      fs.writeFileSync(assertInstalledMutationTarget(root, installedRoot, relative), weakened);
      assertCanonicalSpecsSourceBytesUnchanged(sourceBytes);
      assert.deepEqual(installedAuthoringProjectionIssues(root, installedRoot), [issue], name);
    } finally {
      fs.writeFileSync(assertInstalledMutationTarget(root, installedRoot, relative), installedBytes);
    }
    assert.deepEqual(installedAuthoringProjectionIssues(root, installedRoot), [], `${name} restore`);
    assertCanonicalSpecsSourceBytesUnchanged(sourceBytes);
  }

  const mutations = [
    ['skill', (value) => value.replace('Task files are flat beside `plan.md`', 'Task files may be nested')],
    ['review', (value) => value.replace('list at 15', 'list without a cap')],
    ['templates', (value) => value.replace('Verification: PASS', 'Verification: UNKNOWN')],
    ['codex', (value) => `${value}\nUse TaskUpdate for state changes.`]
  ];
  for (const [key, mutate] of mutations) {
    const changed = { ...files, [key]: mutate(files[key]) };
    assert.notDeepEqual(authoringProjectionIssues(changed), []);
  }
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
    for (const folder of ['.claude', '.codex']) {
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
    assert.deepEqual(ctx.platforms, ['claude', 'codex']);
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
    const launchers = allHookLaunchers(config);
    assert.ok(launchers.length > 0, 'installed Codex config must register hook launchers');
    const semanticReviewEvents = [];
    for (const { event, handler } of launchers) {
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
      if (path.basename(target) === 'semantic-review-authority.cjs') {
        semanticReviewEvents.push(event);
      }
    }
    assert.deepEqual(semanticReviewEvents, ['SubagentStop']);

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
    assert.match(session.commandWindows, /require\('module'\)\.runMain\(\)/, 'Windows launcher must execute hook main');
  });
});

test('Codex fresh install is exact while refresh and upgrade preserve existing files', () => {
  inTempProject((root) => {
    const userInstructions = '# User rules\n\nKeep this exact.\n';
    fs.writeFileSync(path.join(root, 'AGENTS.md'), userInstructions);

    const first = install(root);
    assert.equal(first.status, 0, `${first.stdout}\n${first.stderr}`);
    assert.equal(fs.existsSync(path.join(root, '.claude')), false);
    assert.equal(fs.existsSync(path.join(root, '.codex', 'config.toml')), false);

    for (const relative of [
      '.codex/hooks.json',
      '.codex/runtime.json',
      '.codex/hooks/privacy-block.cjs',
      '.codex/rules/workflow.md',
      '.codex/rules/hook-protocols.md',
      '.codex/rules/state-sync.md',
      '.codex/scripts/spec-ground.cjs',
      '.codex/scripts/validate-spec-output.cjs',
      '.agents/.gitignore',
      ...V3_SPECS_BUNDLE.map((file) => `.agents/skills/specs/${file}`)
    ]) {
      assert.equal(fs.existsSync(path.join(root, relative)), true, `missing ${relative}`);
    }

    const installedDesign = fs.readFileSync(
      path.join(root, '.agents/skills/specs/templates/design.md'), 'utf8'
    );
    assert.equal((installedDesign.match(/^## Verification Definitions$/gm) || []).length, 1);
    assertInstalledVerificationModel(
      path.join(root, '.codex/scripts/spec-ground.cjs'),
      installedDesign
    );
    const installedSpecsRoot = path.join(root, '.agents/skills/specs');
    assert.throws(
      () => installedAuthoringProjectionIssues(root, '.agents/skills/specs'),
      /must be absolute/
    );
    assert.throws(
      () => installedAuthoringProjectionIssues(root, SPECS_SOURCE_ROOT),
      /must stay inside project/
    );
    assert.throws(
      () => installedAuthoringProjectionIssues(root, path.dirname(root)),
      /must stay inside project/
    );
    assertInstalledAuthoringProjection(root, installedSpecsRoot);

    const installedTask = fs.readFileSync(
      path.join(root, '.agents/skills/specs/templates/task.md'), 'utf8'
    );
    assert.deepEqual(
      [...installedTask.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
      ['Outcome', 'Scope', 'Anchors and Ownership', 'Changes', 'Acceptance', 'Dependencies', 'Verification Plan']
    );
    assert.match(installedTask, /^- \*\*Task role:\*\*/m);

    const installedState = JSON.parse(fs.readFileSync(
      path.join(root, '.agents/skills/specs/templates/spec-state.json'), 'utf8'
    ));
    assert.deepEqual(Object.keys(installedState.workflow_policy).sort(), [
      'assurance_level', 'classified_minimum', 'planning_depth', 'risks', 'version'
    ]);

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
    const foreignRuntimeBoundary = 'If you are Claude Code or any other runtime, ignore this entire Codex block';
    assert.match(visible, new RegExp(foreignRuntimeBoundary));
    assert.doesNotMatch(visible, /If you are Codex CLI or any other runtime, ignore this entire Codex block/);
    assert.doesNotMatch(
      visible.replaceAll(foreignRuntimeBoundary, ''),
      /\bAgent\(|subagent_type|`Agent`|\bSendMessage\b|\/hapo:|\bhapo:|Claude Code/,
    );
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
    // Fresh installs are exact. Refresh/upgrade intentionally documents the
    // current Codex limitation: removed skill paths are not pruned.
    const obsoleteSpecsRule = path.join(
      root, '.agents', 'skills', 'specs', 'rules', 'design-principles.md'
    );
    fs.mkdirSync(path.dirname(obsoleteSpecsRule), { recursive: true });
    fs.writeFileSync(obsoleteSpecsRule, 'LEGACY-CODEX-ORPHAN\n');

    const sameVersion = install(root);
    assert.equal(sameVersion.status, 0, `${sameVersion.stdout}\n${sameVersion.stderr}`);
    assert.deepEqual(installedAuthoringProjectionIssues(root, installedSpecsRoot), []);
    assert.match(fs.readFileSync(questionSkill, 'utf8'), /USER-CODEX-SENTINEL/);
    assert.equal(
      fs.existsSync(obsoleteSpecsRule),
      true,
      'known limitation: Codex refresh does not prune obsolete skill files'
    );

    const metadataPath = path.join(root, '.codex', 'cafekit.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    metadata.version = '0.14.1';
    fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);

    const upgrade = install(root);
    assert.equal(upgrade.status, 0, `${upgrade.stdout}\n${upgrade.stderr}`);
    assert.deepEqual(installedAuthoringProjectionIssues(root, installedSpecsRoot), []);
    assert.match(fs.readFileSync(questionSkill, 'utf8'), /USER-CODEX-SENTINEL/);
    assert.equal(
      fs.existsSync(obsoleteSpecsRule),
      true,
      'known limitation: Codex upgrade does not prune obsolete skill files'
    );
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
    assert.equal(fs.existsSync(path.join(root, '.codex', 'scripts', 'spec-ground.cjs')), true, '.codex/scripts/spec-ground.cjs should exist');
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

test('Codex installed code_auditor contains Strict conditional marker', () => {
  inTempProject((root) => {
    const result = install(root);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const toml = fs.readFileSync(path.join(root, '.codex', 'agents', 'code_auditor.toml'), 'utf8');
    assert.match(toml, /Strict Semantic Review Attestation/);
    assert.match(toml, /CAFEKIT_SEMANTIC_REVIEW_ATTESTATION/);
    assert.match(toml, /MAC-protected host-hook observation/);
    assert.doesNotMatch(toml, /host-signed/);
    assert.match(toml, /specs\/<feature>\/spec\.json/);
  });
});

test('Codex scaffold resolver rejects symlink template', () => {
  inTempProject((root) => {
    const result = install(root);
    assert.equal(result.status, 0);
    const template = path.join(root, '.agents', 'skills', 'specs', 'templates', 'task.md');
    const target = path.join(root, 'outside.md');
    fs.writeFileSync(target, 'evil');
    const original = fs.readFileSync(template);
    fs.unlinkSync(template);
    fs.symlinkSync(target, template);
    const scaffold = path.join(root, '.codex', 'scripts', 'spec-scaffold.cjs');
    const out = spawnSync(process.execPath, [scaffold, 'symlink-test', '--tasks', 'R1-01-foo,R1-02-bar', '--boundaries', '[{"id":"B-OWN","type":"ownership","tasks":["R1-01","R1-02"],"write_sets":{"R1-01":["src/a.js"],"R1-02":["src/b.js"]}}]'], { cwd: root, encoding: 'utf8' });
    // Should fail because template is symlink and resolver rejects it
    assert.notEqual(out.status, 0, 'scaffold should reject symlink template');
    assert.match(`${out.stdout}\n${out.stderr}`, /template not found|symlink/i);
    fs.unlinkSync(template);
    fs.writeFileSync(template, original);
  });
});
