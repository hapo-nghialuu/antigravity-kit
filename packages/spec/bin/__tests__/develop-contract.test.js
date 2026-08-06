'use strict';

const assert = require('node:assert/strict');
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
