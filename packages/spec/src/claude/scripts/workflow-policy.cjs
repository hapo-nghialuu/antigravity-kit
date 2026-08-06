'use strict';

const REVIEW_VERDICTS = Object.freeze(['PASS', 'FAIL', 'BLOCKED']);
const EXECUTION_TIERS = Object.freeze(['Light', 'Standard', 'Deep']);

function assertVerdict(verdict) {
  if (!REVIEW_VERDICTS.includes(verdict)) {
    throw new TypeError(`Unsupported review verdict: ${String(verdict)}`);
  }
  return verdict;
}

function executionPolicy({ flash = false, parallel = false } = {}) {
  if (flash && parallel) {
    return {
      allowed: false,
      failFast: true,
      mode: 'flash-parallel-conflict',
      reason: '--flash cannot be combined with --parallel; no execution starts',
    };
  }
  return {
    allowed: true,
    failFast: false,
    mode: parallel ? 'parallel' : flash ? 'flash' : 'standard',
    reason: null,
  };
}

function delegationPlan({ tier, mode = 'full-spec', taskCount = 1 } = {}) {
  if (!EXECUTION_TIERS.includes(tier)) {
    throw new TypeError(`Unsupported execution tier: ${String(tier)}`);
  }
  if (!Number.isInteger(taskCount) || taskCount < 1) {
    throw new RangeError('taskCount must be a positive integer');
  }

  if (tier === 'Light') {
    return { tier, mode, delegated: [], qualityGate: 'main-session', shipPoint: 'task' };
  }
  if (tier === 'Standard') {
    return { tier, mode, delegated: ['code-auditor'], qualityGate: 'combined-ship-point', shipPoint: mode === 'full-spec' ? 'final-task' : 'requested-task' };
  }
  return {
    tier,
    mode,
    delegated: Array.from({ length: taskCount }, () => ['test-runner', 'spec-review', 'quality-review']).flat(),
    qualityGate: 'per-task-stage-a-b',
    shipPoint: 'task',
  };
}

function consumeReviewVerdict(verdict) {
  assertVerdict(verdict);
  if (verdict === 'PASS') return { action: 'proceed', terminal: false };
  if (verdict === 'FAIL') return { action: 'fix-and-rerun', terminal: false };
  return { action: 'stop', terminal: true, blocker: 'review returned BLOCKED' };
}

function promoteFlashTask(task, verdict) {
  if (verdict !== 'NO_TESTS') assertVerdict(verdict);
  if (task?.status !== 'in_progress' || task.receipt !== 'FLASH_UNVERIFIED') return task;
  if (verdict !== 'PASS') return task;
  return {
    ...task,
    status: 'done',
    receipt: 'Verification: PASS',
    blocker: null,
    dependencyBlocked: false,
    unblocks: true,
  };
}

module.exports = {
  REVIEW_VERDICTS,
  EXECUTION_TIERS,
  executionPolicy,
  delegationPlan,
  consumeReviewVerdict,
  promoteFlashTask,
};
