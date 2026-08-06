'use strict';

const REVIEW_VERDICTS = Object.freeze(['PASS', 'FAIL', 'BLOCKED']);
const EXECUTION_TIERS = Object.freeze(['Light', 'Standard', 'Deep']);
const DEEP_TASK_SEQUENCE = Object.freeze(['inspector', 'implementer', 'test-runner', 'code-auditor']);

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
    return {
      tier,
      mode,
      delegated: ['code-auditor'],
      qualityGate: 'combined-ship-point',
      shipPoint: mode === 'full-spec' ? 'final-task' : 'requested-task',
    };
  }
  return {
    tier,
    mode,
    delegated: Array.from({ length: taskCount }, () => [...DEEP_TASK_SEQUENCE]).flat(),
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

function isFlashUnverified(task) {
  return task?.status === 'in_progress' && task.receipt === 'FLASH_UNVERIFIED';
}

function isStaleFlashDone(task) {
  return task?.status === 'done' && task.receipt === 'FLASH_UNVERIFIED';
}

function promoteFlashTask(task, verdict, proof = 'Verification: PASS') {
  if (verdict !== 'NO_TESTS') assertVerdict(verdict);
  if (!isFlashUnverified(task)) return task;

  if (verdict !== 'PASS') {
    return {
      ...task,
      status: 'in_progress',
      receipt: 'FLASH_UNVERIFIED',
      blocker: verdict === 'NO_TESTS'
        ? 'awaiting test proof from /hapo:test <feature>'
        : `verification returned ${verdict}`,
      dependencyBlocked: true,
      unblocks: false,
      readyForSync: false,
    };
  }

  if (typeof proof !== 'string' || !/^Verification:\s*PASS\b/.test(proof.trim())) {
    throw new TypeError('PASS promotion requires a concrete Verification: PASS receipt');
  }

  return {
    ...task,
    status: 'in_progress',
    receipt: proof.trim(),
    blocker: null,
    dependencyBlocked: true,
    unblocks: false,
    readyForSync: true,
  };
}

function finalizeFlashTask(task, operation) {
  if (operation !== 'sync-finalize') return task;
  if (
    task?.status !== 'in_progress'
    || !/^Verification:\s*PASS\b/.test(String(task.receipt || '').trim())
    || task.readyForSync !== true
  ) return task;

  return {
    ...task,
    status: 'done',
    dependencyBlocked: false,
    unblocks: true,
    readyForSync: false,
  };
}

function flashState(taskRegistry = {}) {
  return Object.entries(taskRegistry)
    .filter(([, task]) => isFlashUnverified(task))
    .map(([taskPath]) => taskPath);
}

function parseCliArgs(argv) {
  const options = {
    flash: false,
    parallel: false,
    json: false,
    verdict: null,
    task: null,
    action: null,
    proof: 'Verification: PASS',
  };
  const args = [...argv];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--flash') options.flash = true;
    else if (arg === '--parallel') options.parallel = true;
    else if (arg === '--json') options.json = true;
    else if (arg === '--consume-verdict') options.action = 'consume-verdict';
    else if (arg === '--promote-flash') options.action = 'promote-flash';
    else if (arg === '--sync-finalize') options.action = 'sync-finalize';
    else if (arg === '--verdict') {
      options.verdict = args[++i];
      if (!options.verdict) throw new Error('--verdict requires a value');
    } else if (arg === '--task-json') {
      const raw = args[++i];
      if (!raw) throw new Error('--task-json requires a JSON value');
      options.task = JSON.parse(raw);
    } else if (arg === '--proof') {
      options.proof = args[++i];
      if (!options.proof) throw new Error('--proof requires a value');
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function cliResult(result, json) {
  process.stdout.write(json ? `${JSON.stringify(result)}\n` : `${result.message}\n`);
  return result.exitCode;
}

function runCli(argv = process.argv.slice(2)) {
  try {
    const options = parseCliArgs(argv);
    const policy = executionPolicy(options);
    if (!policy.allowed) {
      return cliResult({
        ok: false,
        contract: 'execution-policy',
        ...policy,
        message: 'Unsupported flags: --flash and --parallel are incompatible.\nNo spec state, task receipt, worktree, subagent, or commit was created.',
        exitCode: 2,
      }, options.json);
    }

    if (options.action === 'consume-verdict') {
      const result = consumeReviewVerdict(options.verdict);
      return cliResult({ ok: true, ...result, exitCode: 0, message: `Verdict ${options.verdict}: ${result.action}` }, options.json);
    }
    if (options.action === 'promote-flash') {
      if (!options.task) throw new Error('--promote-flash requires --task-json');
      const result = promoteFlashTask(options.task, options.verdict, options.proof);
      return cliResult({ ok: true, task: result, exitCode: 0, message: 'Flash task promotion evaluated.' }, options.json);
    }
    if (options.action === 'sync-finalize') {
      if (!options.task) throw new Error('--sync-finalize requires --task-json');
      const result = finalizeFlashTask(options.task, 'sync-finalize');
      return cliResult({ ok: true, task: result, exitCode: 0, message: 'Flash task sync-finalize evaluated.' }, options.json);
    }

    return cliResult({ ok: true, contract: 'execution-policy', ...policy, exitCode: 0, message: `Execution mode: ${policy.mode}` }, options.json);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    return 2;
  }
}

if (require.main === module) process.exitCode = runCli();

module.exports = {
  REVIEW_VERDICTS,
  EXECUTION_TIERS,
  DEEP_TASK_SEQUENCE,
  executionPolicy,
  delegationPlan,
  consumeReviewVerdict,
  isFlashUnverified,
  isStaleFlashDone,
  promoteFlashTask,
  finalizeFlashTask,
  flashState,
  parseCliArgs,
  runCli,
};
