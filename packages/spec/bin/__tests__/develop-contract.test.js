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
    userAuthorized: true,
  });
  assert.equal(result.lane, 'Direct');
  assert.equal(result.automaticLane, 'Critical');
  assert.equal(result.overridden, true);
  assert.match(result.warnings.join(' '), /downgrad|review and evidence coverage/i);
  assert.ok(POLICY.lanePolicy(result).warnings.length >= 2);
});

test('unsafe downgrade without user authorization is blocked', () => {
  assert.throws(() => POLICY.classifyLane({
    reversible: true,
    riskSignals: { privacy: true },
    override: 'Direct',
  }), /requires explicit user authorization/);
  // also via CLI
  const cli = spawnSync(process.execPath, [
    POLICY_PATH,
    '--classify-lane',
    '--task-json',
    JSON.stringify({ riskSignals: { auth: true }, override: 'Direct' }),
    '--json',
  ], { encoding: 'utf8' });
  assert.equal(cli.status, 2);
  assert.match(cli.stderr, /requires explicit user authorization/);
});

test('forged approval via legacy approved field is rejected', () => {
  assert.throws(() => POLICY.approvalState({ generated: true, approved: true }), /Legacy approval state/);
  const cli = spawnSync(process.execPath, [
    POLICY_PATH,
    '--approval-state',
    '--task-json',
    JSON.stringify({ generated: true, approved: true }),
    '--json',
  ], { encoding: 'utf8' });
  assert.equal(cli.status, 2);
  assert.match(cli.stderr, /Legacy approval state/);
  const legacyCheck = POLICY.validateApprovalSchema({ approvals: { requirements: { generated: true, approved: true } } });
  assert.equal(legacyCheck.valid, false);
  assert.equal(legacyCheck.legacy, true);
  assert.match(legacyCheck.error, /Legacy/);
});

test('approval state never infers user approval from generated or agent validation', () => {
  const state = POLICY.approvalState({ generated: true, agent_validated: true });
  assert.equal(state.generated, true);
  assert.equal(state.agent_validated, true);
  assert.equal(state.user_approved, false);
  assert.equal(state.ready, false);
  assert.equal(state.schema_version, '2.0');
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

test('first-run cache bypass is blocked - canonical receipt required even without cache', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-first-run-'));
  const claude = path.join(root, '.claude');
  fs.mkdirSync(path.join(claude, 'hooks'), { recursive: true });
  fs.mkdirSync(path.join(claude, 'scripts'), { recursive: true });
  fs.copyFileSync(path.join(PACKAGE_ROOT, 'src/claude/hooks/spec-gate.cjs'), path.join(claude, 'hooks/spec-gate.cjs'));
  fs.copyFileSync(POLICY_PATH, path.join(claude, 'scripts/workflow-policy.cjs'));
  const specDir = path.join(root, 'specs', 'demo', 'tasks');
  fs.mkdirSync(specDir, { recursive: true });
  // Done task without canonical receipt (missing Command, provenance)
  fs.writeFileSync(path.join(root, 'specs', 'demo', 'spec.json'), JSON.stringify({
    status: 'in_progress',
    task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-07-29T10:00:00.000Z' } },
  }));
  fs.writeFileSync(path.join(specDir, 'task.md'), '# Task\n\n**Status:** done\n\n## Evidence\n\nVerification: PASS\n```\nnpm test\n```\n');
  try {
    const result = spawnSync(process.execPath, [path.join(claude, 'hooks/spec-gate.cjs')], {
      cwd: root,
      env: { ...process.env, PROJECT_ROOT: root },
      input: JSON.stringify({ cwd: root }),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0);
    const payload = JSON.parse(result.stdout);
    assert.equal(payload.decision, 'block', 'first-run without canonical receipt must block');
    assert.match(payload.reason, /tasks\/task\.md/);
    // Also test that with canonical receipt it passes
    fs.writeFileSync(path.join(specDir, 'task.md'), '# Task\n\n**Status:** done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nResult: PASS\nBase: abc123\nHead: def456\n```\nnpm test\nPASS\n```\n');
    // Clear cache to simulate fresh first-run with valid receipt
    try { fs.unlinkSync(path.join(claude, 'hooks', '.logs', 'spec-gate-last.json')); } catch {}
    try { fs.unlinkSync(path.join(__dirname, '..', '.logs', 'spec-gate-last.json')); } catch {}
    // Need to clear the cache that the hook uses (under claude hooks .logs) - we already cleared above
    // Re-run with valid receipt - should not block
    const result2 = spawnSync(process.execPath, [path.join(claude, 'hooks/spec-gate.cjs')], {
      cwd: root,
      env: { ...process.env, PROJECT_ROOT: root },
      input: JSON.stringify({ cwd: root }),
      encoding: 'utf8',
    });
    assert.equal(result2.stdout, '', 'valid canonical receipt on first run must not block');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
    try { fs.unlinkSync(path.join(PACKAGE_ROOT, 'src/claude/hooks/.logs/spec-gate-last.json')); } catch {}
  }
});

test('canonical receipt requires command, exit, provenance and unambiguous PASS', () => {
  assert.deepEqual(POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\nHead: def\n'), []);
  const missingCommand = POLICY.validateCanonicalReceipt('Verification: PASS\nExit: 0\nBase: a\nHead: b\n');
  assert.ok(missingCommand.includes('command'));
  const missingProvenance = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\n');
  assert.ok(missingProvenance.includes('provenance'));
  const missingVerification = POLICY.validateCanonicalReceipt('Command: pnpm test\nExit: 0\nBase: a\nHead: b\n');
  assert.ok(missingVerification.includes('verification_state'));
  const artifactWithoutHash = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nArtifact: dist/bundle.js\n');
  assert.ok(artifactWithoutHash.includes('artifact_hash'));
  // CLI validation
  const cli = spawnSync(process.execPath, [POLICY_PATH, '--validate-receipt', '--task-json', JSON.stringify({ body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n' }), '--json'], { encoding: 'utf8' });
  assert.equal(cli.status, 0);
  assert.equal(JSON.parse(cli.stdout).ok, true);
});

test('canonical receipt provenance requires both Base and Head (or both base_sha and head_sha)', () => {
  // Only Base fails - single endpoint must not satisfy provenance
  const onlyBase = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\n');
  assert.ok(onlyBase.includes('provenance'), 'only Base should fail provenance');
  // Only Head fails
  const onlyHead = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nHead: def456\n');
  assert.ok(onlyHead.includes('provenance'), 'only Head should fail provenance');
  // Both Base and Head passes
  const bothLabels = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\nHead: def456\n');
  assert.deepEqual(bothLabels, [], 'both Base and Head should pass');
  // Only base_sha fails
  const onlyBaseSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc123\n');
  assert.ok(onlyBaseSha.includes('provenance'), 'only base_sha should fail provenance');
  // Only head_sha fails
  const onlyHeadSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nhead_sha: def456\n');
  assert.ok(onlyHeadSha.includes('provenance'), 'only head_sha should fail provenance');
  // Both base_sha and head_sha passes
  const bothSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc123\nhead_sha: def456\n');
  assert.deepEqual(bothSha, [], 'both base_sha and head_sha should pass');
  // Alternation-precedence false acceptance check: ensure single Head or base_sha alone does not pass
  const singleHeadLower = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nHead: single\n');
  assert.ok(singleHeadLower.includes('provenance'));
  // Empty / bare provenance must fail — same-line non-empty value required
  const emptyBase = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase:\nHead: def456\n');
  assert.ok(emptyBase.includes('provenance'), 'empty Base: should fail');
  const spacesBase = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase:   \nHead: def456\n');
  assert.ok(spacesBase.includes('provenance'), 'Base: with only spaces should fail');
  const emptyHead = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\nHead:\n');
  assert.ok(emptyHead.includes('provenance'), 'empty Head: should fail');
  const spacesHead = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\nHead:   \n');
  assert.ok(spacesHead.includes('provenance'), 'Head: with only spaces should fail');
  const bareBaseSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha\nhead_sha: def\n');
  assert.ok(bareBaseSha.includes('provenance'), 'bare base_sha without colon/value should fail');
  const emptyBaseSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha:\nhead_sha: def\n');
  assert.ok(emptyBaseSha.includes('provenance'), 'empty base_sha: should fail');
  const spacesBaseSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha:   \nhead_sha: def\n');
  assert.ok(spacesBaseSha.includes('provenance'), 'base_sha: with only spaces should fail');
  const bareHeadSha = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc\nhead_sha\n');
  assert.ok(bareHeadSha.includes('provenance'), 'bare head_sha without colon/value should fail');
  const bareBoth = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha head_sha\n');
  assert.ok(bareBoth.includes('provenance'), 'bare base_sha head_sha without colon/value should fail');
  const baseEmptyHeadValid = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase:\nHead: def\n');
  assert.ok(baseEmptyHeadValid.includes('provenance'));
  const validWithValues = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\nHead: def456\n');
  assert.deepEqual(validWithValues, [], 'valid Base and Head with values should pass');
  const validShaWithValues = POLICY.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc\nhead_sha: def\n');
  assert.deepEqual(validShaWithValues, [], 'valid base_sha and head_sha with values should pass');
  // CLI: only Base via --validate-receipt should fail
  const cliOnlyBase = spawnSync(process.execPath, [POLICY_PATH, '--validate-receipt', '--task-json', JSON.stringify({ body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\n' }), '--json'], { encoding: 'utf8' });
  assert.equal(cliOnlyBase.status, 2);
  assert.equal(JSON.parse(cliOnlyBase.stdout).ok, false);
  assert.ok(JSON.parse(cliOnlyBase.stdout).failures.includes('provenance'));
  const cliBoth = spawnSync(process.execPath, [POLICY_PATH, '--validate-receipt', '--task-json', JSON.stringify({ body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n' }), '--json'], { encoding: 'utf8' });
  assert.equal(cliBoth.status, 0);
  assert.equal(JSON.parse(cliBoth.stdout).ok, true);
  // CLI empty Base should fail
  const cliEmptyBase = spawnSync(process.execPath, [POLICY_PATH, '--validate-receipt', '--task-json', JSON.stringify({ body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase:\nHead: b\n' }), '--json'], { encoding: 'utf8' });
  assert.equal(cliEmptyBase.status, 2);
  assert.ok(JSON.parse(cliEmptyBase.stdout).failures.includes('provenance'));
});

test('lane traces - Direct, Standard, Critical classification, override, state mutation and completion', () => {
  // Direct: isolated reversible low-risk
  const direct = POLICY.classifyLane({ reversible: true, lowRisk: true, isolated: true, taskCount: 1 });
  assert.equal(direct.lane, 'Direct');
  assert.equal(direct.automaticLane, 'Direct');
  assert.deepEqual(POLICY.lanePolicy(direct).delegated, []);
  assert.equal(POLICY.lanePolicy(direct).requiresSpec, false);
  assert.equal(POLICY.lanePolicy(direct).shipPoint, 'task');
  // Standard: default
  const standard = POLICY.classifyLane({ title: 'add pagination to list', taskCount: 1 });
  assert.equal(standard.lane, 'Standard');
  assert.deepEqual(POLICY.lanePolicy(standard).delegated, ['code-auditor']);
  assert.equal(POLICY.lanePolicy(standard).shipPoint, 'feature');
  // Critical: auth signal
  const critical = POLICY.classifyLane({ riskSignals: { auth: true }, taskCount: 1 });
  assert.equal(critical.lane, 'Critical');
  assert.ok(critical.risks.includes('auth'));
  assert.deepEqual(POLICY.lanePolicy(critical).delegated, ['inspector', 'implementer', 'test-runner', 'code-auditor']);
  // Override: Direct requesting Critical is allowed (upgrade) without extra auth
  const upgrade = POLICY.classifyLane({ reversible: true, lowRisk: true, isolated: true, taskCount: 1, override: 'Critical' });
  assert.equal(upgrade.lane, 'Critical');
  assert.equal(upgrade.automaticLane, 'Direct');
  // Downgrade without auth is blocked
  assert.throws(() => POLICY.classifyLane({ riskSignals: { payment: true }, override: 'Standard' }), /requires explicit user authorization/);
  // Downgrade with auth succeeds and surfaces warning
  const downgrade = POLICY.classifyLane({ riskSignals: { payment: true }, override: 'Standard', userAuthorized: true });
  assert.equal(downgrade.lane, 'Standard');
  assert.match(downgrade.warnings.join(' '), /Downgrade authorized by user/);
  // State mutation: approvalState
  const pendingApproval = POLICY.approvalState({ generated: true, agent_validated: false, user_approved: false });
  assert.equal(pendingApproval.ready, false);
  const agentValidated = POLICY.approvalState({ generated: true, agent_validated: true, user_approved: false });
  assert.equal(agentValidated.ready, false, 'agent_validated alone must not imply ready');
  const approved = POLICY.approvalState({ generated: true, agent_validated: true, user_approved: true });
  assert.equal(approved.ready, true);
  // Completion: flash work remains in_progress and does not unblock
  const flashTask = { status: 'in_progress', receipt: 'FLASH_UNVERIFIED', blocker: 'awaiting /hapo:test <feature>', dependencyBlocked: true, unblocks: false };
  const failRemains = POLICY.promoteFlashTask(flashTask, 'FAIL');
  assert.equal(failRemains.status, 'in_progress');
  assert.equal(failRemains.unblocks, false);
  const blockedRemains = POLICY.promoteFlashTask(flashTask, 'BLOCKED');
  assert.equal(blockedRemains.unblocks, false);
  const noTestsRemains = POLICY.promoteFlashTask(flashTask, 'NO_TESTS');
  assert.equal(noTestsRemains.unblocks, false);
  const promoted = POLICY.promoteFlashTask(flashTask, 'PASS', 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n');
  assert.equal(promoted.readyForSync, true);
  assert.equal(promoted.unblocks, false, 'promoted flash must not unblock until sync-finalize');
  const finalized = POLICY.finalizeFlashTask(promoted, 'sync-finalize');
  assert.equal(finalized.status, 'done');
  assert.equal(finalized.unblocks, true);
});

test('flash selective promotion - only specific task is promoted, not blanket', () => {
  const registry = {
    'tasks/task-a.md': { status: 'in_progress', receipt: 'FLASH_UNVERIFIED', dependencyBlocked: true, unblocks: false },
    'tasks/task-b.md': { status: 'in_progress', receipt: 'FLASH_UNVERIFIED', dependencyBlocked: true, unblocks: false },
  };
  const promotedA = POLICY.promoteFlashTask(registry['tasks/task-a.md'], 'PASS', 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n');
  const notPromotedB = registry['tasks/task-b.md']; // unchanged
  assert.equal(promotedA.readyForSync, true);
  assert.equal(notPromotedB.receipt, 'FLASH_UNVERIFIED');
  assert.equal(notPromotedB.readyForSync, undefined);
  // FAIL on B does not affect A
  const failB = POLICY.promoteFlashTask(notPromotedB, 'FAIL');
  assert.equal(failB.receipt, 'FLASH_UNVERIFIED');
  assert.equal(promotedA.receipt.startsWith('Verification: PASS'), true);
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
  // H1 remediation: distinguish survey vs verified implementation, fail unsupported claims
  assert.match(provenance, /external survey|not committed/i);
  assert.match(provenance, /survey only|not used|No borrowed text recorded/i);
  assert.match(provenance, /Source anchor.*plans\//);
  assert.match(provenance, /Evidence\/status/i);
  assert.match(provenance, /grep -r.*cafekit-ref/i);
  assert.doesNotMatch(provenance, /AgentKit T1.*implemented as direct source/i);
  // shipped runtime must not contain cafekit-ref/AgentKit verbatim (only ledger/plans may)
  const shippedHits = spawnSync('grep', ['-rn', 'cafekit-ref', 'packages/spec/src', '--include=*.md', '--include=*.cjs', '--include=*.ts'], { encoding: 'utf8' });
  const agentKitHits = spawnSync('grep', ['-rn', 'AgentKit', 'packages/spec/src', '--include=*.md', '--include=*.cjs', '--include=*.ts'], { encoding: 'utf8' });
  assert.equal(shippedHits.stdout.trim(), '', 'shipped runtime must not contain cafekit-ref verbatim');
  assert.equal(agentKitHits.stdout.trim(), '', 'shipped runtime must not contain AgentKit verbatim');
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

test('B1 run requires explicit runner contract and rejects placeholders/shell strings', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-run-runner-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    // Missing runner
    const missing = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--out', path.join(root, 'out-missing')], { encoding: 'utf8' });
    assert.equal(missing.status, 2);
    assert.match(missing.stderr, /runner contract is required/);
    assert.match(missing.stderr, /explicit command array/);

    // Placeholder runner (command contains placeholder)
    const placeholderRunner = path.join(root, 'placeholder-runner.json');
    fs.writeFileSync(placeholderRunner, JSON.stringify({ schema_version: 'b1.v1', command: ['node', '{{replace_me}}'] }));
    const placeholder = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', placeholderRunner, '--out', path.join(root, 'out-placeholder')], { encoding: 'utf8' });
    assert.equal(placeholder.status, 2);
    assert.match(placeholder.stderr, /missing or placeholder freeze field/);

    // Shell string forbidden (command as string)
    const shellRunner = path.join(root, 'shell-runner.json');
    fs.writeFileSync(shellRunner, JSON.stringify({ schema_version: 'b1.v1', command: 'node runner.mjs' }));
    const shell = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', shellRunner, '--out', path.join(root, 'out-shell')], { encoding: 'utf8' });
    assert.equal(shell.status, 2);
    assert.match(shell.stderr, /explicit argv|shell string is forbidden/);

    // Missing out/receipts
    const minimalRunner = path.join(root, 'minimal-runner.json');
    fs.writeFileSync(minimalRunner, JSON.stringify({ schema_version: 'b1.v1', command: ['node', '-e', 'process.exit(0)'] }));
    const noOut = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', minimalRunner], { encoding: 'utf8' });
    assert.equal(noOut.status, 2);
    assert.match(noOut.stderr, /output is required/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 run executes via explicit argv, captures wall_ms/artifact, and remains honest no-live-runs without execution', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-run-execute-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    // Honest no-live-runs: summarize without receipts must stay exploratory
    const noLive = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'summarize', '--corpus', fixture.corpus, '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(noLive.status, 0);
    const noLiveSummary = JSON.parse(noLive.stdout);
    assert.equal(noLiveSummary.status, 'exploratory/no-live-runs');
    assert.equal(noLiveSummary.live_runs, false);
    assert.equal(noLiveSummary.rollout_recommendation.status, 'exploratory');
    // Also validate without receipts is valid_no_receipts, not fabricated success
    const validNoReceipts = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0]], { encoding: 'utf8' });
    assert.equal(validNoReceipts.status, 0);
    assert.equal(JSON.parse(validNoReceipts.stdout).status, 'valid_no_receipts');

    // Create minimal deterministic runner that writes artifact and emits metrics JSON
    const runnerScript = path.join(root, 'runner.mjs');
    fs.writeFileSync(runnerScript, `
import fs from 'node:fs';
import path from 'node:path';
let input='';
process.stdin.on('data', c=>input+=c);
process.stdin.on('end', ()=>{
  const payload=JSON.parse(input);
  fs.mkdirSync(path.dirname(payload.artifact_path), {recursive:true});
  fs.writeFileSync(payload.artifact_path, 'artifact:'+payload.task_id+'/'+payload.repeat+'\\n');
  const out={input_tokens:100, output_tokens:50, context_loaded_tokens:500, tool_calls:2, subagent_calls:0, correctness:true, regression:false, unsupported_completion_claim:false, user_corrections:0, useful_reviewer_findings:1, false_positive_reviewer_findings:0};
  process.stdout.write(JSON.stringify(out));
});
`);
    const runnerJson = path.join(root, 'runner.json');
    fs.writeFileSync(runnerJson, JSON.stringify({ schema_version: 'b1.v1', command: ['node', runnerScript] }));
    const outDir = path.join(root, 'out-live');
    const run = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', runnerJson, '--out', outDir], { encoding: 'utf8' });
    assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
    const runResult = JSON.parse(run.stdout);
    assert.equal(runResult.status, 'executed');
    assert.equal(runResult.live_runs, true);
    assert.ok(fs.existsSync(path.join(outDir, 'receipts.json')), 'receipts.json must be written');
    // Receipts must be consumable by existing validate/summarize path
    const receipts = JSON.parse(fs.readFileSync(path.join(outDir, 'receipts.json'), 'utf8'));
    assert.ok(Array.isArray(receipts.receipts) || Array.isArray(receipts));
    const validate = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--receipts', path.join(outDir, 'receipts.json')], { encoding: 'utf8' });
    assert.equal(validate.status, 0, `${validate.stdout}\n${validate.stderr}`);
    assert.equal(JSON.parse(validate.stdout).status, 'valid');
    // Ensure receipts capture wall_ms, command, artifact hash and are frozen
    const firstReceipt = (receipts.receipts || receipts)[0];
    assert.ok(typeof firstReceipt.wall_ms === 'number' && firstReceipt.wall_ms >= 0, 'wall_ms captured');
    assert.ok(typeof firstReceipt.evidence.command === 'string' && firstReceipt.evidence.command.includes('node'), 'command captured');
    assert.match(firstReceipt.evidence.artifact_sha256, /^sha256:[0-9a-f]{64}$/);
    assert.equal(firstReceipt.corpus_sha256, JSON.parse(fs.readFileSync(fixture.corpus, 'utf8')).corpus_sha256 || runResult.corpus_sha256 || firstReceipt.corpus_sha256);
    // Artifact file must exist and hash must match raw bytes
    const artifactPath = path.join(outDir, firstReceipt.evidence.artifact_ref);
    assert.ok(fs.existsSync(artifactPath), 'artifact file must exist inside bundle');
    const bytes = fs.readFileSync(artifactPath);
    const expectedHash = `sha256:${crypto.createHash('sha256').update(bytes).digest('hex')}`;
    assert.equal(firstReceipt.evidence.artifact_sha256, expectedHash);
    // Ensure no secrets leakage: receipts must not contain env secrets (check that known secret pattern not in file)
    const receiptsText = fs.readFileSync(path.join(outDir, 'receipts.json'), 'utf8');
    assert.doesNotMatch(receiptsText, /OPENAI_API_KEY|AWS_SECRET|GITHUB_TOKEN/);
    // Ensure artifact_ref is relative and does not escape
    assert.doesNotMatch(firstReceipt.evidence.artifact_ref, /^\//);
    assert.doesNotMatch(firstReceipt.evidence.artifact_ref, /^\.\./);
    assert.doesNotMatch(firstReceipt.evidence.artifact_ref, /^https?:/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 run rejects mismatched corpus hash, artifact escape, and partial matrices fail-closed', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-run-safety-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    const runnerScript = path.join(root, 'safe-runner.mjs');
    fs.writeFileSync(runnerScript, `
import fs from 'node:fs';
import path from 'node:path';
let input='';
process.stdin.on('data', c=>input+=c);
process.stdin.on('end', ()=>{
  const payload=JSON.parse(input);
  fs.mkdirSync(path.dirname(payload.artifact_path), {recursive:true});
  fs.writeFileSync(payload.artifact_path, 'ok');
  const out={input_tokens:100, output_tokens:50, context_loaded_tokens:500, tool_calls:2, subagent_calls:0, correctness:true, regression:false, unsupported_completion_claim:false, user_corrections:0, useful_reviewer_findings:1, false_positive_reviewer_findings:0};
  process.stdout.write(JSON.stringify(out));
});
`);
    const runnerJson = path.join(root, 'runner.json');
    fs.writeFileSync(runnerJson, JSON.stringify({ schema_version: 'b1.v1', command: ['node', runnerScript] }));

    // Mismatched corpus_sha256 in config must be rejected before execution
    const badCorpus = JSON.parse(fs.readFileSync(fixture.corpus, 'utf8'));
    badCorpus.corpus_id = 'tampered-id';
    const badCorpusPath = path.join(root, 'bad-corpus.json');
    fs.writeFileSync(badCorpusPath, JSON.stringify(badCorpus));
    const mismatch = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', badCorpusPath, '--config', fixture.configs[0], '--runner', runnerJson, '--out', path.join(root, 'out-mismatch')], { encoding: 'utf8' });
    assert.equal(mismatch.status, 2);
    assert.match(mismatch.stderr, /corpus_sha256.*does not match corpus|freeze hash mismatch/);

    // Artifact escape via validator: craft receipt with traversal artifact_ref and expect reject
    const traversalReceipts = JSON.parse(fs.readFileSync(fixture.receipts, 'utf8'));
    const outsideArtifact = path.join(path.dirname(root), 'outside.bin');
    fs.writeFileSync(outsideArtifact, Buffer.from('outside'));
    traversalReceipts.receipts[0].evidence.artifact_ref = path.relative(root, outsideArtifact);
    traversalReceipts.receipts[0].evidence.artifact_sha256 = `sha256:${crypto.createHash('sha256').update(fs.readFileSync(outsideArtifact)).digest('hex')}`;
    const traversalPath = path.join(root, 'traversal.json');
    fs.writeFileSync(traversalPath, JSON.stringify(traversalReceipts));
    const traversal = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--config', fixture.configs[1], '--receipts', traversalPath], { encoding: 'utf8' });
    assert.equal(traversal.status, 2);
    assert.match(traversal.stderr, /path escapes receipt bundle directory/);
    fs.rmSync(outsideArtifact, { force: true });

    // Partial matrix: run with runner that fails on one task/repeat must not be reported as valid success
    // Simulate by creating a runner that exits non-zero for one specific task
    const flakyRunner = path.join(root, 'flaky-runner.mjs');
    fs.writeFileSync(flakyRunner, `
import fs from 'node:fs';
import path from 'node:path';
let input='';
process.stdin.on('data', c=>input+=c);
process.stdin.on('end', ()=>{
  const payload=JSON.parse(input);
  if (payload.task_id==='fixture-direct' && payload.repeat===1 && payload.arm==='baseline') process.exit(7);
  fs.mkdirSync(path.dirname(payload.artifact_path), {recursive:true});
  fs.writeFileSync(payload.artifact_path, 'ok');
  const out={input_tokens:100, output_tokens:50, context_loaded_tokens:500, tool_calls:2, subagent_calls:0, correctness:true, regression:false, unsupported_completion_claim:false, user_corrections:0, useful_reviewer_findings:1, false_positive_reviewer_findings:0};
  process.stdout.write(JSON.stringify(out));
});
`);
    const flakyJson = path.join(root, 'flaky.json');
    fs.writeFileSync(flakyJson, JSON.stringify({ schema_version: 'b1.v1', command: ['node', flakyRunner] }));
    const flakyOut = path.join(root, 'out-flaky');
    const flakyRun = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', flakyJson, '--out', flakyOut], { encoding: 'utf8' });
    assert.equal(flakyRun.status, 2);
    assert.match(flakyRun.stderr, /runner exited non-zero|no receipt fabricated/);
    // No valid live success should be claimed from partial run
    if (fs.existsSync(path.join(flakyOut, 'receipts.json'))) {
      const maybeReceipts = JSON.parse(fs.readFileSync(path.join(flakyOut, 'receipts.json'), 'utf8'));
      if (maybeReceipts.receipts) {
        const incompleteValidate = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'validate', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--receipts', path.join(flakyOut, 'receipts.json')], { encoding: 'utf8' });
        assert.equal(incompleteValidate.status, 2);
        assert.match(incompleteValidate.stderr, /incomplete receipt matrix|runner exited/);
      }
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('B1 runner secret safety: command argv with secret-like assignment/flag is fail-closed and stderr is redacted', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-b1-secret-'));
  const fixture = makeBenchmarkFixture(root);
  try {
    // Helper runner that would succeed if not blocked
    const okRunnerScript = path.join(root, 'ok.mjs');
    fs.writeFileSync(okRunnerScript, `
import fs from 'node:fs';
import path from 'node:path';
let input='';
process.stdin.on('data', c=>input+=c);
process.stdin.on('end', ()=>{
  const p=JSON.parse(input);
  fs.mkdirSync(path.dirname(p.artifact_path), {recursive:true});
  fs.writeFileSync(p.artifact_path,'ok');
  process.stdout.write(JSON.stringify({input_tokens:1,output_tokens:1,context_loaded_tokens:1,tool_calls:0,subagent_calls:0,correctness:true,regression:false,unsupported_completion_claim:false,user_corrections:0,useful_reviewer_findings:0,false_positive_reviewer_findings:0}));
});
`);
    // Secret-like argv must be rejected fail-closed, value not shown, keep shell:false
    const cases = [
      { desc: 'env assignment', command: ['node', okRunnerScript, 'OPENAI_API_KEY=sk-1234567890abcdefghij123456'] },
      { desc: 'flag equals', command: ['node', okRunnerScript, '--api-key=sk-1234567890abcdefghij123456'] },
      { desc: 'flag spaced', command: ['node', okRunnerScript, '--api-key', 'sk-1234567890abcdefghij123456'] },
      { desc: 'password', command: ['node', okRunnerScript, '--password=supersecret1234'] },
      { desc: 'jwt', command: ['node', okRunnerScript, '--jwt-secret=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9abcdefghij'] },
      { desc: 'github token', command: ['node', okRunnerScript, 'GITHUB_TOKEN=ghp_1234567890abcdefghijklmnopqrstuv'] },
    ];
    for (const c of cases) {
      const runnerJson = path.join(root, `runner-${c.desc.replace(/\s+/g,'-')}.json`);
      fs.writeFileSync(runnerJson, JSON.stringify({ schema_version: 'b1.v1', command: c.command }));
      const out = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', runnerJson, '--out', path.join(root, `out-${c.desc}`)], { encoding: 'utf8' });
      assert.equal(out.status, 2, `case ${c.desc} should be blocked`);
      assert.match(out.stderr, /secret-like assignment\/flag is forbidden/);
      assert.match(out.stderr, /Value not shown/);
      // Must not leak secret value in error or evidence
      assert.doesNotMatch(out.stderr, /sk-1234567890/);
      assert.doesNotMatch(out.stderr, /supersecret/);
      assert.doesNotMatch(out.stderr, /ghp_/);
      assert.doesNotMatch(out.stderr, /eyJhbGci/);
      // Also ensure stderr snippet does not contain raw secret if leaked via stderr
      // (the runner never executed, so no stderr from runner, just validation error)
    }

    // Safe names must NOT be flagged (no false positive)
    const safeCases = [
      ['node', okRunnerScript, '--tokenizer', 'bert-base'],
      ['node', okRunnerScript, '--api-key-file', '/tmp/keyfile'],
      ['node', okRunnerScript, '--token-path', '/tmp/token'],
      ['node', okRunnerScript, '--password-hint', 'my hint'],
      ['node', okRunnerScript, '--password-label', 'label'],
    ];
    for (const [idx, command] of safeCases.entries()) {
      const runnerJson = path.join(root, `safe-${idx}.json`);
      fs.writeFileSync(runnerJson, JSON.stringify({ schema_version: 'b1.v1', command }));
      const out = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', runnerJson, '--out', path.join(root, `out-safe-${idx}`)], { encoding: 'utf8' });
      // Should not be blocked for secret-like; it should either succeed or fail for other reasons but not secret-like
      assert.doesNotMatch(out.stderr, /secret-like assignment\/flag is forbidden/, `safe case ${command.join(' ')} must not be flagged`);
      assert.equal(out.status, 0, `safe case ${command.join(' ')} should execute (got ${out.stderr})`);
      // Clean out for next
      fs.rmSync(path.join(root, `out-safe-${idx}`), { recursive: true, force: true });
    }

    // Stderr redaction: runner that exits non-zero and leaks secret in stderr must have [REDACTED] and not raw secret
    const leakyRunner = path.join(root, 'leaky.mjs');
    fs.writeFileSync(leakyRunner, `
import fs from 'node:fs';
let input='';
process.stdin.on('data', c=>input+=c);
process.stdin.on('end', ()=>{
  console.error('failed to connect with OPENAI_API_KEY=sk-1234567890abcdefghijklmnopqrstuv and token ghp_1234567890abcdefghijklmnopqrstuv');
  console.error('also password supersecret1234 and jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9abcdefghij');
  process.exit(2);
});
`);
    const leakyJson = path.join(root, 'leaky.json');
    fs.writeFileSync(leakyJson, JSON.stringify({ schema_version: 'b1.v1', command: ['node', leakyRunner] }));
    const leakyOut = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', leakyJson, '--out', path.join(root, 'out-leaky')], { encoding: 'utf8' });
    assert.equal(leakyOut.status, 2);
    assert.match(leakyOut.stderr, /runner exited non-zero/);
    assert.match(leakyOut.stderr, /\[REDACTED\]/);
    assert.doesNotMatch(leakyOut.stderr, /sk-1234567890/);
    assert.doesNotMatch(leakyOut.stderr, /ghp_1234567890/);
    assert.doesNotMatch(leakyOut.stderr, /supersecret/);
    assert.doesNotMatch(leakyOut.stderr, /eyJhbGci/);
    // Ensure no receipt was fabricated
    assert.equal(fs.existsSync(path.join(root, 'out-leaky', 'receipts.json')), false, 'no receipt should be fabricated on stderr secret leak');

    // Also test that evidence.command never contains secret when runner would have been allowed (it is blocked, so no evidence)
    // For a runner that does not contain secret, evidence should contain the safe command
    const safeRunnerForEvidence = path.join(root, 'evidence.mjs');
    fs.writeFileSync(safeRunnerForEvidence, `
import fs from 'node:fs';
import path from 'node:path';
let input='';
process.stdin.on('data', c=>input+=c);
process.stdin.on('end', ()=>{
  const p=JSON.parse(input);
  fs.mkdirSync(path.dirname(p.artifact_path),{recursive:true});
  fs.writeFileSync(p.artifact_path,'evidence');
  process.stdout.write(JSON.stringify({input_tokens:1,output_tokens:1,context_loaded_tokens:1,tool_calls:0,subagent_calls:0,correctness:true,regression:false,unsupported_completion_claim:false,user_corrections:0,useful_reviewer_findings:0,false_positive_reviewer_findings:0}));
});
`);
    const evidenceRunnerJson = path.join(root, 'evidence.json');
    fs.writeFileSync(evidenceRunnerJson, JSON.stringify({ schema_version: 'b1.v1', command: ['node', safeRunnerForEvidence, '--verbose'] }));
    const evidenceOut = path.join(root, 'out-evidence');
    const evidenceRun = spawnSync(process.execPath, [BENCHMARK_SCRIPT, 'run', '--corpus', fixture.corpus, '--config', fixture.configs[0], '--runner', evidenceRunnerJson, '--out', evidenceOut], { encoding: 'utf8' });
    assert.equal(evidenceRun.status, 0);
    const evidenceReceipts = JSON.parse(fs.readFileSync(path.join(evidenceOut, 'receipts.json'), 'utf8'));
    const ev = (evidenceReceipts.receipts || evidenceReceipts)[0].evidence;
    assert.match(ev.command, /node/);
    assert.doesNotMatch(ev.command, /sk-|ghp_|eyJ/);
    assert.doesNotMatch(JSON.stringify(evidenceReceipts), /OPENAI_API_KEY/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
