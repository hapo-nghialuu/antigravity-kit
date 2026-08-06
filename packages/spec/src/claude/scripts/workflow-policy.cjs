'use strict';

const REVIEW_VERDICTS = Object.freeze(['PASS', 'FAIL', 'BLOCKED']);
const EXECUTION_TIERS = Object.freeze(['Light', 'Standard', 'Deep']);
const LANES = Object.freeze(['Direct', 'Standard', 'Critical']);
const DEEP_TASK_SEQUENCE = Object.freeze(['inspector', 'implementer', 'test-runner', 'code-auditor']);
const CRITICAL_LANE_SEQUENCE = Object.freeze(['inspector', 'implementer', 'test-runner', 'code-auditor']);
const LANE_DELEGATION = Object.freeze({
  Direct: Object.freeze([]),
  Standard: Object.freeze(['code-auditor']),
  Critical: CRITICAL_LANE_SEQUENCE,
});
const LANE_RISK_KEYS = Object.freeze({
  reversibility: ['reversible', 'reversibility', 'irreversible', 'non-reversible'],
  destructive: ['destructive', 'deletion', 'delete', 'destroy'],
  auth: ['auth', 'authentication', 'authorization'],
  payment: ['payment', 'billing', 'charge'],
  privacy: ['privacy', 'pii', 'personal data'],
  data: ['data', 'dataset', 'records'],
  schema: ['schema'],
  migration: ['migration', 'migrate', 'database migration'],
  publicContract: ['publicContract', 'public_contract', 'public contract', 'api contract', 'breaking change', 'backward compatibility'],
  crossRuntime: ['crossRuntime', 'cross-runtime', 'cross runtime', 'cross_service', 'cross-service', 'runtime coupling', 'worker', 'webhook'],
  ambiguity: ['ambiguous', 'ambiguity', 'unclear', 'unknown requirements', 'underspecified'],
  rollback: ['rollback', 'rollback difficulty', 'hard to rollback', 'cannot rollback', 'no rollback'],
});

function assertLane(lane) {
  if (!LANES.includes(lane)) {
    throw new TypeError(`Unsupported workflow lane: ${String(lane)}`);
  }
  return lane;
}

function asTrue(value) {
  return value === true || value === 1 || value === 'true' || value === 'yes';
}

function signalValue(source, keys) {
  return keys.some((key) => asTrue(source[key]));
}

function textValue(input) {
  const files = Array.isArray(input.files) ? input.files : [];
  return [input.title, input.description, input.summary, input.operation, ...files]
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase();
}

function classifyRiskSignals(input = {}) {
  const nestedSignals = input.signals && typeof input.signals === 'object' ? input.signals : {};
  const declaredSignals = [input.riskSignals, input.risks]
    .flatMap((value) => Array.isArray(value) ? value : [])
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase();
  const source = {
    ...input,
    ...nestedSignals,
    ...(input.riskSignals && typeof input.riskSignals === 'object' && !Array.isArray(input.riskSignals) ? input.riskSignals : {}),
  };
  const text = `${textValue(input)} ${declaredSignals}`;
  const hasTerm = (terms) => terms.some((term) => {
    const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    return new RegExp(`(?:^|[^a-z0-9_])${escaped}(?:$|[^a-z0-9_])`).test(text);
  });
  const reversibility = String(source.reversibility || '').toLowerCase();
  const rollback = String(source.rollback || source.rollbackDifficulty || '').toLowerCase();
  const signals = {
    reversibility: source.reversible === false
      || ['irreversible', 'non-reversible', 'not reversible'].includes(reversibility)
      || hasTerm(['irreversible', 'non-reversible', 'not reversible']),
    destructive: signalValue(source, LANE_RISK_KEYS.destructive) || hasTerm(LANE_RISK_KEYS.destructive),
    auth: signalValue(source, LANE_RISK_KEYS.auth) || hasTerm(LANE_RISK_KEYS.auth),
    payment: signalValue(source, LANE_RISK_KEYS.payment) || hasTerm(LANE_RISK_KEYS.payment),
    privacy: signalValue(source, LANE_RISK_KEYS.privacy) || hasTerm(LANE_RISK_KEYS.privacy),
    data: signalValue(source, LANE_RISK_KEYS.data) || hasTerm(LANE_RISK_KEYS.data) || /\bdata\b/.test(declaredSignals),
    schema: signalValue(source, LANE_RISK_KEYS.schema) || hasTerm(LANE_RISK_KEYS.schema),
    migration: signalValue(source, LANE_RISK_KEYS.migration) || hasTerm(LANE_RISK_KEYS.migration),
    publicContract: signalValue(source, LANE_RISK_KEYS.publicContract) || hasTerm(LANE_RISK_KEYS.publicContract),
    crossRuntime: signalValue(source, LANE_RISK_KEYS.crossRuntime) || hasTerm(LANE_RISK_KEYS.crossRuntime),
    ambiguity: signalValue(source, LANE_RISK_KEYS.ambiguity)
      || ['high', 'severe'].includes(String(source.ambiguity || '').toLowerCase())
      || hasTerm(LANE_RISK_KEYS.ambiguity),
    rollback: signalValue(source, LANE_RISK_KEYS.rollback)
      || ['difficult', 'hard', 'none', 'impossible'].includes(rollback)
      || hasTerm(LANE_RISK_KEYS.rollback),
  };
  return signals;
}

function explicitReversible(input = {}) {
  const source = {
    ...input,
    ...(input.signals && typeof input.signals === 'object' ? input.signals : {}),
    ...(input.riskSignals && typeof input.riskSignals === 'object' ? input.riskSignals : {}),
  };
  return source.reversible === true
    || String(source.reversibility || '').toLowerCase() === 'reversible';
}

function overrideLane(input = {}) {
  if (typeof input === 'string') return input;
  return input.override ?? input.laneOverride ?? input.requestedLane ?? input.lane ?? null;
}

function classifyLane(input = {}) {
  if (typeof input === 'string') return { lane: assertLane(input), automaticLane: input, overridden: false, warnings: [], risks: [] };
  if (!input || typeof input !== 'object') throw new TypeError('Lane classification input must be an object');

  const signals = classifyRiskSignals(input);
  const risks = Object.entries(signals).filter(([, active]) => active).map(([name]) => name);
  const taskCount = input.taskCount === undefined ? 1 : input.taskCount;
  if (!Number.isInteger(taskCount) || taskCount < 1) throw new RangeError('taskCount must be a positive integer');

  const automaticLane = risks.length > 0
    ? 'Critical'
    : explicitReversible(input) && input.lowRisk === true && input.isolated === true && taskCount <= 2
      ? 'Direct'
      : 'Standard';
  const requested = overrideLane(input);
  if (requested === null || requested === undefined) {
    return {
      lane: automaticLane,
      automaticLane,
      overridden: false,
      warnings: [],
      risks,
      signals,
    };
  }
  assertLane(requested);
  const warnings = [`Explicit lane override selected: ${requested}.`];
  if (requested !== automaticLane) {
    warnings.push(`Override changes automatic ${automaticLane} classification to ${requested}.`);
    if (LANES.indexOf(requested) < LANES.indexOf(automaticLane)) {
      warnings.push(`Downgrading risk lane may reduce review and evidence coverage: ${risks.join(', ') || 'default risk policy'}.`);
    }
  }
  return {
    lane: requested,
    automaticLane,
    overridden: true,
    warnings,
    risks,
    signals,
  };
}

function lanePolicy(input = {}) {
  const classification = typeof input === 'string'
    ? classifyLane(input)
    : input && LANES.includes(input.lane) && Object.hasOwn(input, 'automaticLane')
      ? input
      : classifyLane(input);
  const lane = assertLane(classification.lane);
  const delegated = [...LANE_DELEGATION[lane]];
  return {
    lane,
    executionTier: lane === 'Critical' ? 'Deep' : lane === 'Direct' ? 'Light' : 'Standard',
    automaticLane: classification.automaticLane,
    overridden: classification.overridden,
    warnings: [...classification.warnings],
    risks: [...classification.risks],
    delegated,
    requiresSpec: lane !== 'Direct',
    requiresState: lane !== 'Direct',
    qualityGate: lane === 'Direct' ? 'main-session' : lane === 'Standard' ? 'combined-feature-review' : 'strict-evidence',
    shipPoint: lane === 'Direct' ? 'task' : 'feature',
    evidence: lane === 'Critical' ? 'strict' : lane === 'Standard' ? 'bounded' : 'targeted',
  };
}

function approvalState(state = {}) {
  const source = state && state.approvals && typeof state.approvals === 'object' ? state.approvals : state;
  const result = {
    generated: source?.generated === true,
    agent_validated: source?.agent_validated === true,
    user_approved: source?.user_approved === true,
  };
  return { ...result, ready: result.generated && result.agent_validated && result.user_approved };
}

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

function delegationPlan({ tier, lane = null, mode = 'full-spec', taskCount = 1 } = {}) {
  if (lane !== null && lane !== undefined) {
    const policy = lanePolicy(lane);
    return {
      lane: policy.lane,
      executionTier: policy.executionTier,
      tier: tier || null,
      mode,
      delegated: policy.delegated,
      qualityGate: policy.qualityGate,
      shipPoint: policy.shipPoint,
    };
  }
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
    lane: null,
    override: null,
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
    else if (arg === '--classify-lane') options.action = 'classify-lane';
    else if (arg === '--lane-policy') options.action = 'lane-policy';
    else if (arg === '--approval-state') options.action = 'approval-state';
    else if (arg === '--lane') options.lane = args[++i];
    else if (arg === '--override') options.override = args[++i];
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

    if (options.action === 'classify-lane') {
      const input = options.task || {};
      const classification = classifyLane({ ...input, ...(options.lane ? { override: options.lane } : {}), ...(options.override ? { override: options.override } : {}) });
      return cliResult({ ok: true, classification, policy: lanePolicy(classification), exitCode: 0, message: `Lane: ${classification.lane}` }, options.json);
    }
    if (options.action === 'lane-policy') {
      const input = options.task || options.lane;
      if (!input) throw new Error('--lane-policy requires --lane or --task-json');
      const policy = lanePolicy(input);
      return cliResult({ ok: true, policy, exitCode: 0, message: `Lane: ${policy.lane}` }, options.json);
    }
    if (options.action === 'approval-state') {
      if (!options.task) throw new Error('--approval-state requires --task-json');
      const state = approvalState(options.task);
      return cliResult({ ok: true, state, exitCode: 0, message: `Approval ready: ${state.ready}` }, options.json);
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
  LANES,
  DEEP_TASK_SEQUENCE,
  CRITICAL_LANE_SEQUENCE,
  executionPolicy,
  classifyLane,
  lanePolicy,
  approvalState,
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
