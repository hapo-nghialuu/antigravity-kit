'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const POLICY_PATH = path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs');
const POLICY = require(POLICY_PATH);
const DEVELOP = path.join(PACKAGE_ROOT, 'src/claude/skills/develop/SKILL.md');
const GATE = path.join(PACKAGE_ROOT, 'src/claude/skills/develop/references/quality-gate.md');
const TEST_SKILL = path.join(PACKAGE_ROOT, 'src/claude/skills/test/SKILL.md');
const SYNC_SKILL = path.join(PACKAGE_ROOT, 'src/claude/skills/sync/SKILL.md');
const CODE_REVIEW_SKILL = path.join(PACKAGE_ROOT, 'src/claude/skills/code-review/SKILL.md');
const PARALLEL_WAVES = path.join(PACKAGE_ROOT, 'src/claude/skills/develop/references/parallel-waves.md');
const PROVENANCE = path.join(PACKAGE_ROOT, '../../docs/provenance.md');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function manifestAgents() {
  const manifest = JSON.parse(read(path.join(PACKAGE_ROOT, 'src/claude/migration-manifest.json')));
  return manifest.agents.required.map((fileName) => path.basename(fileName, path.extname(fileName)));
}

test('CLI rejects flash and parallel before any mutation', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-policy-cli-'));
  const statePath = path.join(root, 'state.json');
  fs.writeFileSync(statePath, '{"status":"in_progress"}\n');
  const before = fs.readFileSync(statePath, 'utf8');
  try {
    const result = spawnSync(process.execPath, [POLICY_PATH, '--flash', '--parallel', '--json'], {
      cwd: root,
      encoding: 'utf8',
    });
    assert.equal(result.status, 2, `${result.stdout}\n${result.stderr}`);
    const payload = JSON.parse(result.stdout);
    assert.equal(payload.ok, false);
    assert.equal(payload.failFast, true);
    assert.match(payload.message, /incompatible/);
    assert.equal(fs.readFileSync(statePath, 'utf8'), before);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('develop pre-state guard names executable policy contract', () => {
  const develop = read(DEVELOP);
  assert.match(develop, /node \.claude\/scripts\/workflow-policy\.cjs --flash --parallel --json/);
  assert.match(develop, /No spec state, task receipt, worktree, subagent, or commit was created/);
  assert.match(develop, /flash\+parallel fail-fast/i);
});

test('delegation plan uses only shipped agents and exact Deep sequence', () => {
  const shipped = new Set(manifestAgents());
  assert.deepEqual(POLICY.delegationPlan({ tier: 'Light', mode: 'full-spec', taskCount: 2 }).delegated, []);
  assert.deepEqual(POLICY.delegationPlan({ tier: 'Standard', mode: 'specific-task' }).delegated, ['code-auditor']);
  const deep = POLICY.delegationPlan({ tier: 'Deep', mode: 'full-spec', taskCount: 2 }).delegated;
  assert.deepEqual(deep, [
    'inspector', 'implementer', 'test-runner', 'code-auditor',
    'inspector', 'implementer', 'test-runner', 'code-auditor',
  ]);
  for (const agent of deep) assert.ok(shipped.has(agent), `Deep agent is not shipped: ${agent}`);
  assert.doesNotMatch(read(GATE), /spec-review|quality-review/);
  assert.doesNotMatch(read(DEVELOP), /spec-review|quality-review/);
});

test('lane classifier selects Direct for explicit reversible low-risk work', () => {
  const result = POLICY.classifyLane({ reversible: true, lowRisk: true, isolated: true, taskCount: 1 });
  assert.equal(result.lane, 'Direct');
  assert.equal(result.automaticLane, 'Direct');
  assert.deepEqual(result.risks, []);
  assert.deepEqual(POLICY.delegationPlan({ lane: 'Direct' }).delegated, []);
  assert.equal(POLICY.lanePolicy(result).requiresSpec, false);
});

test('lane classifier forces Critical for named high-risk signals', () => {
  const result = POLICY.classifyLane({
    reversible: true,
    riskSignals: { auth: true, migration: true, publicContract: true },
  });
  assert.equal(result.lane, 'Critical');
  assert.deepEqual(result.risks, ['auth', 'migration', 'publicContract']);
  assert.deepEqual(POLICY.delegationPlan({ lane: 'Critical' }).delegated, [
    'inspector', 'implementer', 'test-runner', 'code-auditor',
  ]);
});

test('lane override keeps automatic result and surfaces downgrade warning', () => {
  const result = POLICY.classifyLane({
    reversible: true,
    riskSignals: { privacy: true },
    override: 'Direct',
  });
  assert.equal(result.lane, 'Direct');
  assert.equal(result.automaticLane, 'Critical');
  assert.equal(result.overridden, true);
  assert.match(result.warnings.join(' '), /downgrad|review and evidence coverage/i);
  assert.ok(POLICY.lanePolicy(result).warnings.length >= 2);
});

test('approval state never infers user approval from generated or agent validation', () => {
  assert.deepEqual(POLICY.approvalState({ generated: true, agent_validated: true }), {
    generated: true,
    agent_validated: true,
    user_approved: false,
    ready: false,
  });
  assert.equal(POLICY.approvalState({ generated: true, agent_validated: true, user_approved: true }).ready, true);
  const cli = spawnSync(process.execPath, [
    POLICY_PATH,
    '--approval-state',
    '--task-json',
    JSON.stringify({ generated: true, agent_validated: true }),
    '--json',
  ], { encoding: 'utf8' });
  assert.equal(cli.status, 0, `${cli.stdout}\n${cli.stderr}`);
  assert.equal(JSON.parse(cli.stdout).state.user_approved, false);
});

test('CLI exposes JSON lane classification and develop has no universal spec hard gate', () => {
  const cli = spawnSync(process.execPath, [
    POLICY_PATH,
    '--classify-lane',
    '--task-json',
    JSON.stringify({ reversible: true, lowRisk: true, isolated: true }),
    '--json',
  ], { encoding: 'utf8' });
  assert.equal(cli.status, 0, `${cli.stdout}\n${cli.stderr}`);
  const payload = JSON.parse(cli.stdout);
  assert.equal(payload.classification.lane, 'Direct');
  assert.equal(payload.policy.requiresSpec, false);
  const develop = read(DEVELOP);
  assert.doesNotMatch(develop, /DO NOT write implementation code until an approved spec exists/i);
  assert.match(develop, /Direct.*bypass spec\/state/i);
  assert.match(develop, /Standard.*approved.*spec/i);
  assert.match(develop, /Critical.*strict evidence/i);
  assert.match(develop, /C --> D\s*$/m);
  assert.doesNotMatch(develop, /D2\[Step 3/);
  assert.match(read(path.join(PACKAGE_ROOT, 'src/claude/skills/specs/SKILL.md')), /requirements\.md.*design\.md.*current layout/i);
});

test('review verdict consumer handles PASS, FAIL, and BLOCKED', () => {
  assert.deepEqual(POLICY.consumeReviewVerdict('PASS'), { action: 'proceed', terminal: false });
  assert.deepEqual(POLICY.consumeReviewVerdict('FAIL'), { action: 'fix-and-rerun', terminal: false });
  assert.deepEqual(POLICY.consumeReviewVerdict('BLOCKED'), {
    action: 'stop',
    terminal: true,
    blocker: 'review returned BLOCKED',
  });
  assert.throws(() => POLICY.consumeReviewVerdict('NO_TESTS'), /Unsupported review verdict/);
  const cli = spawnSync(process.execPath, [POLICY_PATH, '--consume-verdict', '--verdict', 'BLOCKED', '--json'], { encoding: 'utf8' });
  assert.equal(cli.status, 0, `${cli.stdout}\n${cli.stderr}`);
  assert.deepEqual(JSON.parse(cli.stdout).action, 'stop');
  assert.match(read(GATE), /PASS \| FAIL \| BLOCKED/);
  assert.match(read(CODE_REVIEW_SKILL), /PASS \| FAIL \| BLOCKED/);
  assert.match(read(TEST_SKILL), /PASS.*FAIL.*BLOCKED/);
});

test('flash PASS promotes proof without completion, finalize alone completes', () => {
  const initial = {
    status: 'in_progress',
    receipt: 'FLASH_UNVERIFIED',
    blocker: 'awaiting /hapo:test <feature>',
    dependencyBlocked: true,
    unblocks: false,
  };
  for (const verdict of ['FAIL', 'BLOCKED', 'NO_TESTS']) {
    const result = POLICY.promoteFlashTask(initial, verdict);
    assert.equal(result.status, 'in_progress');
    assert.equal(result.receipt, 'FLASH_UNVERIFIED');
    assert.equal(result.dependencyBlocked, true);
    assert.equal(result.unblocks, false);
    assert.match(result.blocker, /verification|test proof/);
  }
  const promoted = POLICY.promoteFlashTask(initial, 'PASS', 'Verification: PASS\nCommand: pnpm test\nResult: PASS');
  assert.equal(promoted.status, 'in_progress');
  assert.equal(promoted.receipt.startsWith('Verification: PASS'), true);
  assert.equal(promoted.blocker, null);
  assert.equal(promoted.dependencyBlocked, true);
  assert.equal(promoted.unblocks, false);
  assert.equal(promoted.readyForSync, true);
  assert.equal(POLICY.finalizeFlashTask(promoted, 'sync'), promoted);
  const finalized = POLICY.finalizeFlashTask(promoted, 'sync-finalize');
  assert.equal(finalized.status, 'done');
  assert.equal(finalized.dependencyBlocked, false);
  assert.equal(finalized.unblocks, true);
  assert.equal(finalized.readyForSync, false);
  assert.equal(POLICY.isStaleFlashDone({ status: 'done', receipt: 'FLASH_UNVERIFIED' }), true);
  assert.match(read(TEST_SKILL), /only explicit .*sync-finalize/);
  assert.match(read(SYNC_SKILL), /sync-finalize/);
});

test('spec-gate rejects stale FLASH_UNVERIFIED done state', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-spec-gate-'));
  const claude = path.join(root, '.claude');
  fs.mkdirSync(path.join(claude, 'hooks'), { recursive: true });
  fs.mkdirSync(path.join(claude, 'scripts'), { recursive: true });
  fs.copyFileSync(path.join(PACKAGE_ROOT, 'src/claude/hooks/spec-gate.cjs'), path.join(claude, 'hooks/spec-gate.cjs'));
  fs.copyFileSync(POLICY_PATH, path.join(claude, 'scripts/workflow-policy.cjs'));
  fs.mkdirSync(path.join(root, 'specs', 'demo', 'tasks'), { recursive: true });
  fs.writeFileSync(path.join(root, 'specs', 'demo', 'spec.json'), JSON.stringify({
    status: 'in_progress',
    task_registry: { 'tasks/task.md': { status: 'done', receipt: 'FLASH_UNVERIFIED' } },
  }));
  try {
    const result = spawnSync(process.execPath, [path.join(claude, 'hooks/spec-gate.cjs')], {
      cwd: root,
      env: { ...process.env, PROJECT_ROOT: root },
      input: JSON.stringify({ cwd: root }),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const payload = JSON.parse(result.stdout);
    assert.equal(payload.decision, 'block');
    assert.match(payload.reason, /FLASH_UNVERIFIED/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('parallel waves require immutable provenance receipts and safe recovery', () => {
  const waves = read(PARALLEL_WAVES);
  for (const field of ['base_sha', 'head_sha', 'branch', 'worktree_path', 'commit_range']) {
    assert.match(waves, new RegExp(`\\b${field}\\b`));
  }
  assert.match(waves, /git diff(?: --stat)? [^\\n]*(?:BASE_SHA|base_sha)[^\\n]*(?:HEAD_SHA|head_sha)/i);
  assert.match(waves, /new commit|new commits|Every fix is a new commit/i);
  assert.match(waves, /destination tree must be clean/i);
  assert.match(waves, /compatible with the selected base/i);
  assert.match(waves, /consent.*commit|commit.*consent/i);
  assert.match(waves, /retention.*retained|retained.*worktree/i);
  assert.match(waves, /cleanup_authorization|explicit discard/i);
  assert.match(waves, /directory overlap|lockfiles|manifests|export barrels|migrations|registries|generated artifacts|shared state writers/i);
  assert.match(waves, /affected integration|final.*integration/i);
  for (const category of ['baseline', 'environment', 'spec', 'code']) {
    assert.match(waves, new RegExp(`\\b${category}\\b`));
  }
  assert.match(waves, /Do not blind-retry/i);
});

test('provenance ledger defines reuse contract and source anchors', () => {
  assert.equal(fs.existsSync(PROVENANCE), true);
  const provenance = read(PROVENANCE);
  assert.match(provenance, /\bidea\b/);
  assert.match(provenance, /\bclean-room\b/);
  assert.match(provenance, /copied-text.*never valid|never valid.*copied-text/i);
  assert.match(provenance, /never copy source text verbatim/i);
  for (const column of ['Pattern', 'Source anchor', 'Reuse type', 'CafeKit destination', 'Evidence/status']) {
    assert.match(provenance, new RegExp(`\\b${column.replace('/', '\\/')}\\b`, 'i'));
  }
  assert.match(provenance, /AgentKit|cafekit-ref/);
  assert.match(provenance, /before implementation/i);
});

const BENCHMARK_SCRIPT = path.join(PACKAGE_ROOT, 'scripts/benchmark-workflow.mjs');
const BENCHMARK_CORPUS_SCHEMA = path.join(PACKAGE_ROOT, 'benchmarks/corpus.schema.json');
const BENCHMARK_CONFIG_EXAMPLE = path.join(PACKAGE_ROOT, 'benchmarks/benchmark-config.example.json');
const BENCHMARK_RUBRIC = path.join(PACKAGE_ROOT, 'benchmarks/rubric.md');
const BENCHMARK_DOCS = path.join(PACKAGE_ROOT, '../../docs/benchmark-workflow.md');

function canonicalBenchmark(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalBenchmark).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalBenchmark(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function benchmarkHash(value) {
  const crypto = require('node:crypto');
  return `sha256:${crypto.createHash('sha256').update(canonicalBenchmark(value)).digest('hex')}`;
}

function benchmarkRawHash(value) {
  return `sha256:${crypto.createHash('sha256').update(value).digest('hex')}`;
}

function writeBenchmarkConfig(file, config) {
  const frozen = { ...config };
  delete frozen.config_sha256;
  frozen.config_sha256 = benchmarkHash(frozen);
  fs.writeFileSync(file, JSON.stringify(frozen));
}

function makeBenchmarkFixture(root) {
  const corpus = {
    schema_version: 'b1.v1', status: 'frozen', corpus_id: 'fixture-only-corpus',
    tasks: [
      { task_id: 'fixture-direct', lane: 'Direct', prompt: 'fixture-only reversible task', repo_sample: 'fixture-repo', acceptance: { criteria: ['fixture criterion'] }, risk: { level: 'low' } },
      { task_id: 'fixture-critical', lane: 'Critical', prompt: 'fixture-only negative control', repo_sample: 'fixture-repo', acceptance: { criteria: ['fixture contract'] }, risk: { level: 'high', reasons: ['fixture negative control'] } },
    ],
  };
  const corpusSha = benchmarkHash(corpus);
  const common = {
    schema_version: 'b1.v1', status: 'frozen', experiment_id: 'fixture-only-experiment',
    model: { name: 'fixture-model', version: 'fixture-version' }, reasoning_effort: 'fixture',
    repo: { identifier: 'fixture-repo', commit: 'abc1234567890', clean_initial_tree_sha: benchmarkHash('fixture-clean-tree') },
    permissions_fingerprint: benchmarkHash('fixture-permissions'), tool_availability_fingerprint: benchmarkHash('fixture-tools'),
    corpus_sha256: corpusSha, repeat_policy: { repeats_per_task: 2, context_isolated: true },
    input_usd_per_1k: 1, output_usd_per_1k: 2,
  };
  const configs = ['baseline', 'treatment'].map((arm) => {
    const config = { ...common, arm };
    config.config_sha256 = benchmarkHash(config);
    return config;
  });
  const artifactRef = 'fixture-artifact.bin';
  const artifactBytes = Buffer.from('fixture-only benchmark artifact\n');
  fs.writeFileSync(path.join(root, artifactRef), artifactBytes);
  const artifactSha = benchmarkRawHash(artifactBytes);
  const receipts = [];
  for (const config of configs) for (const task of corpus.tasks) for (const repeat of [1, 2]) {
    const treatment = config.arm === 'treatment';
    const critical = task.lane === 'Critical';
    const wall = critical ? 300 : (treatment ? 50 : 100) * repeat;
    const input = (treatment ? 100 : 200) * repeat;
    const output = (treatment ? 50 : 100) * repeat;
    receipts.push({
      task_id: task.task_id, lane: task.lane, arm: config.arm, repeat,
      model: config.model, reasoning_effort: config.reasoning_effort,
      repo_commit: config.repo.commit, clean_initial_tree_sha: config.repo.clean_initial_tree_sha,
      permissions_fingerprint: config.permissions_fingerprint, tool_availability_fingerprint: config.tool_availability_fingerprint,
      corpus_sha256: config.corpus_sha256, config_sha256: config.config_sha256,
      wall_ms: wall, input_tokens: input, output_tokens: output, context_loaded_tokens: 500,
      tool_calls: 2, subagent_calls: critical ? 1 : 0, correctness: true, regression: false,
      unsupported_completion_claim: false, user_corrections: 0, useful_reviewer_findings: 1,
      false_positive_reviewer_findings: 0,
      evidence: { artifact_ref: artifactRef, artifact_sha256: artifactSha, command: 'fixture-only command' },
    });
  }
  const paths = { corpus: path.join(root, 'corpus.json'), receipts: path.join(root, 'receipts.json') };
  fs.writeFileSync(paths.corpus, JSON.stringify(corpus));
  fs.writeFileSync(paths.receipts, JSON.stringify({ receipts }));
  paths.configs = configs.map((config, index) => {
    const file = path.join(root, `${config.arm}-${index}.json`);
    fs.writeFileSync(file, JSON.stringify(config));
    return file;
  });
  return paths;
}

test('B1 benchmark artifacts expose bounded CLI contract', () => {
  for (const file of [BENCHMARK_SCRIPT, BENCHMARK_CORPUS_SCHEMA, BENCHMARK_CONFIG_EXAMPLE, BENCHMARK_RUBRIC, BENCHMARK_DOCS]) assert.equal(fs.existsSync(file), true, file);
  assert.match(read(BENCHMARK_DOCS), /live baseline.*treatment.*pending/i);
  assert.match(read(BENCHMARK_DOCS), /`npm test`.*workflow correctness/i);
  assert.match(read(BENCHMARK_CONFIG_EXAMPLE), /TEMPLATE ONLY|example.template/i);
  assert.match(read(BENCHMARK_RUBRIC), /Direct/);
  assert.match(read(BENCHMARK_RUBRIC), /Standard/);
  assert.match(read(BENCHMARK_RUBRIC), /Critical/);
});

test('B1 validator rejects missing freeze fields and accepts fixture-only corpus', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-validation-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    assert.equal(JSON.parse(read(fixture.corpus)).status, 'frozen');
    const valid = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', fixture.receipts], { encoding: 'utf8' });
    assert.equal(valid.status, 0, `${valid.stdout}\n${valid.stderr}`);
    assert.equal(JSON.parse(valid.stdout).status, 'valid');
    const invalidConfig = JSON.parse(read(fixture.configs[0]));
    delete invalidConfig.clean_initial_tree_sha;
    delete invalidConfig.config_sha256;
    const invalidPath = path.join(root, 'missing-freeze.json');
    fs.writeFileSync(invalidPath, JSON.stringify(invalidConfig));
    const invalid = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', invalidPath], { encoding: 'utf8' });
    assert.equal(invalid.status, 2);
    assert.match(invalid.stderr, /missing or placeholder freeze field/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 validator fails closed for templates, prompts, parity, and artifacts', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-integrity-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    const templateCorpus = JSON.parse(read(fixture.corpus));
    templateCorpus.status = 'example_template';
    const templatePath = path.join(root, 'template-corpus.json');
    fs.writeFileSync(templatePath, JSON.stringify(templateCorpus));
    const template = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', templatePath, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', fixture.receipts], { encoding: 'utf8' });
    assert.equal(template.status, 2);
    assert.match(template.stderr, /example_template.*receipt validation.*live summary/);

    const placeholderCorpus = JSON.parse(read(fixture.corpus));
    placeholderCorpus.tasks[0].prompt = '{{replace_me}}';
    const placeholderPath = path.join(root, 'placeholder-corpus.json');
    fs.writeFileSync(placeholderPath, JSON.stringify(placeholderCorpus));
    const placeholder = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', placeholderPath, '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(placeholder.status, 2);
    assert.match(placeholder.stderr, /tasks\[0\]\.prompt.*missing or placeholder/);

    const emptyPromptWithHashCorpus = JSON.parse(read(fixture.corpus));
    emptyPromptWithHashCorpus.tasks[0].prompt = '';
    emptyPromptWithHashCorpus.tasks[0].prompt_sha256 = `sha256:${'1'.repeat(64)}`;
    const emptyPromptWithHashPath = path.join(root, 'empty-prompt-with-hash-corpus.json');
    fs.writeFileSync(emptyPromptWithHashPath, JSON.stringify(emptyPromptWithHashCorpus));
    const emptyPromptWithHash = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', emptyPromptWithHashPath, '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(emptyPromptWithHash.status, 2);
    assert.match(emptyPromptWithHash.stderr, /tasks\[0\]: exactly one of prompt or prompt_sha256 required/);

    const treatment = JSON.parse(read(fixture.configs[1]));
    treatment.experiment_id = 'different-experiment';
    const parityPath = path.join(root, 'parity-treatment.json');
    writeBenchmarkConfig(parityPath, treatment);
    const parity = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', parityPath], { encoding: 'utf8' });
    assert.equal(parity.status, 2);
    assert.match(parity.stderr, /differ only by arm/);

    const receipts = JSON.parse(read(fixture.receipts));
    const missingArtifactHash = JSON.parse(read(fixture.receipts));
    delete missingArtifactHash.receipts[0].evidence.artifact_sha256;
    const missingArtifactHashPath = path.join(root, 'missing-artifact-hash.json');
    fs.writeFileSync(missingArtifactHashPath, JSON.stringify(missingArtifactHash));
    const missingHash = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', missingArtifactHashPath], { encoding: 'utf8' });
    assert.equal(missingHash.status, 2);
    assert.match(missingHash.stderr, /evidence\.artifact_sha256.*missing or placeholder/);

    receipts.receipts[0].evidence.artifact_sha256 = benchmarkRawHash(Buffer.from('wrong artifact'));
    const wrongHashPath = path.join(root, 'wrong-artifact-hash.json');
    fs.writeFileSync(wrongHashPath, JSON.stringify(receipts));
    const wrongHash = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', wrongHashPath], { encoding: 'utf8' });
    assert.equal(wrongHash.status, 2);
    assert.match(wrongHash.stderr, /artifact_sha256.*raw-byte hash mismatch/);

    receipts.receipts[0].evidence.artifact_ref = 'https://example.invalid/artifact.json';
    const uriPath = path.join(root, 'uri-artifact.json');
    fs.writeFileSync(uriPath, JSON.stringify(receipts));
    const uri = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', uriPath], { encoding: 'utf8' });
    assert.equal(uri.status, 2);
    assert.match(uri.stderr, /artifact_ref.*relative local file.*URI/);

    const outsideArtifact = path.join(path.dirname(root), `${path.basename(root)}-outside.bin`);
    fs.writeFileSync(outsideArtifact, Buffer.from('outside receipt bundle'));
    const traversalReceipts = JSON.parse(read(fixture.receipts));
    traversalReceipts.receipts[0].evidence.artifact_ref = path.relative(root, outsideArtifact);
    traversalReceipts.receipts[0].evidence.artifact_sha256 = benchmarkRawHash(fs.readFileSync(outsideArtifact));
    const traversalPath = path.join(root, 'traversal-artifact.json');
    fs.writeFileSync(traversalPath, JSON.stringify(traversalReceipts));
    const traversal = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', traversalPath], { encoding: 'utf8' });
    assert.equal(traversal.status, 2);
    assert.match(traversal.stderr, /artifact_ref.*path escapes receipt bundle directory/);
    fs.rmSync(outsideArtifact, { force: true });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 summary groups fixture-only receipts by arm/lane with deterministic quantiles', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-summary-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    const result = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', fixture.receipts], { encoding: 'utf8' });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const summary = JSON.parse(result.stdout);
    assert.equal(summary.status, 'ready');
    assert.equal(summary.groups.baseline.Direct.metrics.wall_ms.median, 150);
    assert.equal(summary.groups.baseline.Direct.metrics.wall_ms.p25, 125);
    assert.equal(summary.groups.baseline.Direct.metrics.wall_ms.p75, 175);
    assert.equal(summary.groups.treatment.Direct.quality_rates.correctness, 1);
    assert.equal(summary.rollout_recommendation.gates.Critical.pass, true);

    const countAggregation = JSON.parse(read(fixture.receipts));
    const countedReceipt = countAggregation.receipts.find((item) => item.arm === 'baseline' && item.lane === 'Direct' && item.repeat === 1);
    countedReceipt.user_corrections = 2;
    countedReceipt.useful_reviewer_findings = 3;
    countedReceipt.false_positive_reviewer_findings = 4;
    const countAggregationPath = path.join(root, 'count-aggregation.json');
    fs.writeFileSync(countAggregationPath, JSON.stringify(countAggregation));
    const countAggregationResult = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', countAggregationPath], { encoding: 'utf8' });
    assert.equal(countAggregationResult.status, 0, `${countAggregationResult.stdout}\n${countAggregationResult.stderr}`);
    const countAggregationSummary = JSON.parse(countAggregationResult.stdout);
    assert.equal(countAggregationSummary.groups.baseline.Direct.quality_rates.user_correction_rate, 1);
    assert.equal(countAggregationSummary.groups.baseline.Direct.quality_rates.useful_reviewer_finding_rate, 2);
    assert.equal(countAggregationSummary.groups.baseline.Direct.quality_rates.false_positive_reviewer_finding_rate, 2);

    const degraded = JSON.parse(read(fixture.receipts));
    for (const receipt of degraded.receipts.filter((item) => item.arm === 'treatment')) {
      receipt.useful_reviewer_findings = 0;
      receipt.false_positive_reviewer_findings = 1;
    }
    const degradedPath = path.join(root, 'degraded-review-quality.json');
    fs.writeFileSync(degradedPath, JSON.stringify(degraded));
    const degradedResult = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', degradedPath], { encoding: 'utf8' });
    assert.equal(degradedResult.status, 0, `${degradedResult.stdout}\n${degradedResult.stderr}`);
    const degradedSummary = JSON.parse(degradedResult.stdout);
    assert.equal(degradedSummary.status, 'not-ready');
    assert.equal(degradedSummary.rollout_recommendation.gates.Critical.quality_pass, false);
    assert.equal(degradedSummary.rollout_recommendation.gates.Critical.pass, false);

    const lowRiskQualityFailure = JSON.parse(read(fixture.receipts));
    for (const receipt of lowRiskQualityFailure.receipts.filter((item) => item.lane === 'Direct')) receipt.correctness = false;
    const lowRiskQualityFailurePath = path.join(root, 'low-risk-quality-failure.json');
    fs.writeFileSync(lowRiskQualityFailurePath, JSON.stringify(lowRiskQualityFailure));
    const lowRiskQualityFailureResult = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', lowRiskQualityFailurePath], { encoding: 'utf8' });
    assert.equal(lowRiskQualityFailureResult.status, 0, `${lowRiskQualityFailureResult.stdout}\n${lowRiskQualityFailureResult.stderr}`);
    const lowRiskQualityFailureSummary = JSON.parse(lowRiskQualityFailureResult.stdout);
    assert.equal(lowRiskQualityFailureSummary.rollout_recommendation.gates.Direct.quality_pass, false);
    assert.equal(lowRiskQualityFailureSummary.rollout_recommendation.gates.Direct.pass, false);
    assert.equal(lowRiskQualityFailureSummary.rollout_recommendation.gates.Critical.pass, true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 rollout rejects incomplete fixture-only lane/repeat matrices', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-completeness-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    const payload = JSON.parse(read(fixture.receipts));
    const completeReceipts = payload.receipts;
    const partialPath = path.join(root, 'partial.json');
    fs.writeFileSync(partialPath, JSON.stringify({ receipts: completeReceipts.filter((receipt) => !(receipt.arm === 'treatment' && receipt.lane === 'Direct' && receipt.repeat === 1)) }));
    const partial = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', partialPath], { encoding: 'utf8' });
    assert.equal(partial.status, 0, `${partial.stdout}\n${partial.stderr}`);
    const partialSummary = JSON.parse(partial.stdout);
    assert.equal(partialSummary.status, 'not-ready');
    assert.equal(partialSummary.rollout_recommendation.gates.Direct.treatment_matrix.complete, false);
    const incompleteValidation = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', partialPath], { encoding: 'utf8' });
    assert.equal(incompleteValidation.status, 2);
    assert.match(incompleteValidation.stderr, /incomplete receipt matrix.*treatment\/Direct\/fixture-direct\/1/);

    const missingLanePath = path.join(root, 'missing-lane.json');
    fs.writeFileSync(missingLanePath, JSON.stringify({ receipts: completeReceipts.filter((receipt) => !(receipt.arm === 'treatment' && receipt.lane === 'Critical')) }));
    const missingLane = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', missingLanePath], { encoding: 'utf8' });
    assert.equal(missingLane.status, 0, `${missingLane.stdout}\n${missingLane.stderr}`);
    const missingLaneSummary = JSON.parse(missingLane.stdout);
    assert.equal(missingLaneSummary.status, 'not-ready');
    assert.equal(missingLaneSummary.rollout_recommendation.gates.Critical.treatment_matrix.complete, false);

    const outOfRange = JSON.parse(JSON.stringify(completeReceipts));
    outOfRange[0].repeat = 3;
    const outOfRangePath = path.join(root, 'out-of-range.json');
    fs.writeFileSync(outOfRangePath, JSON.stringify({ receipts: outOfRange }));
    const invalidRepeat = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', outOfRangePath], { encoding: 'utf8' });
    assert.equal(invalidRepeat.status, 2);
    assert.match(invalidRepeat.stderr, /exceeds repeat_policy/);

    const duplicateArm = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(duplicateArm.status, 2);
    assert.match(duplicateArm.stderr, /duplicate arm/);

    const invalidCorpus = JSON.parse(read(fixture.corpus));
    delete invalidCorpus.corpus_id;
    const invalidCorpusPath = path.join(root, 'missing-corpus-id.json');
    fs.writeFileSync(invalidCorpusPath, JSON.stringify(invalidCorpus));
    const missingCorpusId = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', invalidCorpusPath, '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(missingCorpusId.status, 2);
    assert.match(missingCorpusId.stderr, /corpus_id.*missing or placeholder/);

    const invalidCost = JSON.parse(read(fixture.configs[0]));
    invalidCost.input_usd_per_1k = 'not-a-rate';
    const invalidCostPath = path.join(root, 'invalid-cost.json');
    fs.writeFileSync(invalidCostPath, JSON.stringify(invalidCost));
    const invalidCostResult = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', invalidCostPath], { encoding: 'utf8' });
    assert.equal(invalidCostResult.status, 2);
    assert.match(invalidCostResult.stderr, /config\.input_usd_per_1k.*non-negative number/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 summary marks no receipts exploratory instead of claiming a run', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-empty-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    const result = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const summary = JSON.parse(result.stdout);
    assert.equal(summary.status, 'exploratory/no-live-runs');
    assert.equal(summary.live_runs, false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
