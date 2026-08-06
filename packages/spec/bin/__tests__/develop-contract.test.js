'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const POLICY = require(path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs'));
const DEVELOP = path.join(PACKAGE_ROOT, 'src/claude/skills/develop/SKILL.md');
const GATE = path.join(PACKAGE_ROOT, 'src/claude/skills/develop/references/quality-gate.md');
const TEST_SKILL = path.join(PACKAGE_ROOT, 'src/claude/skills/test/SKILL.md');
const SYNC_SKILL = path.join(PACKAGE_ROOT, 'src/claude/skills/sync/SKILL.md');
const CODE_REVIEW_SKILL = path.join(PACKAGE_ROOT, 'src/claude/skills/code-review/SKILL.md');

function read(relativePath) {
  return fs.readFileSync(path.join(PACKAGE_ROOT, relativePath), 'utf8');
}

test('flash and parallel fail fast before execution', () => {
  assert.deepEqual(POLICY.executionPolicy({ flash: true, parallel: true }), {
    allowed: false,
    failFast: true,
    mode: 'flash-parallel-conflict',
    reason: '--flash cannot be combined with --parallel; no execution starts',
  });
  assert.deepEqual(POLICY.executionPolicy({ flash: true, parallel: false }).mode, 'flash');
  const develop = read('src/claude/skills/develop/SKILL.md');
  assert.match(develop, /workflow-policy\.cjs/);
  assert.match(develop, /flash\+parallel.*fail-fast/i);
});

test('delegation plan is tier-specific', () => {
  assert.deepEqual(POLICY.delegationPlan({ tier: 'Light', mode: 'full-spec', taskCount: 2 }).delegated, []);
  assert.deepEqual(POLICY.delegationPlan({ tier: 'Standard', mode: 'specific-task' }).delegated, ['code-auditor']);
  assert.deepEqual(
    POLICY.delegationPlan({ tier: 'Deep', mode: 'full-spec', taskCount: 2 }).delegated,
    ['test-runner', 'spec-review', 'quality-review', 'test-runner', 'spec-review', 'quality-review'],
  );
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
  assert.match(read('src/claude/skills/develop/references/quality-gate.md'), /PASS \| FAIL \| BLOCKED/);
  assert.match(read('src/claude/skills/code-review/SKILL.md'), /PASS \| FAIL \| BLOCKED/);
});

test('flash promotion is task-scoped and requires PASS proof', () => {
  const initial = {
    status: 'in_progress',
    receipt: 'FLASH_UNVERIFIED',
    blocker: 'awaiting /hapo:test <feature>',
    dependencyBlocked: true,
  };
  assert.deepEqual(POLICY.promoteFlashTask(initial, 'FAIL'), initial);
  assert.deepEqual(POLICY.promoteFlashTask(initial, 'BLOCKED'), initial);
  assert.deepEqual(POLICY.promoteFlashTask(initial, 'NO_TESTS'), initial);
  assert.deepEqual(POLICY.promoteFlashTask(initial, 'PASS'), {
    status: 'done',
    receipt: 'Verification: PASS',
    blocker: null,
    dependencyBlocked: false,
    unblocks: true,
  });
  assert.match(read('src/claude/skills/test/SKILL.md'), /exact Evidence and runtime reachability/);
  assert.match(read('src/claude/skills/sync/SKILL.md'), /do not unblock dependencies/);
  assert.match(read('src/claude/skills/develop/references/quality-gate.md'), /workflow-policy\.cjs/);
});
