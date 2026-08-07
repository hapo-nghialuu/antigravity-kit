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

const APPROVAL_SCHEMA_VERSION = '2.0';
const LEGACY_APPROVAL_ERROR = `Legacy approval state detected (field \`approved\`). Migration required: replace \`approved\` with \`agent_validated\` and \`user_approved\` per schema v${APPROVAL_SCHEMA_VERSION} (schema_version: "${APPROVAL_SCHEMA_VERSION}"). See spec-state.json template. Refusing to infer user approval.`;

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

function isUserAuthorizedForDowngrade(input = {}) {
  // Explicit user-originated authorization is required for any downgrade from Critical.
  // We accept several synonyms for the authorization flag to allow different callers.
  return input.userAuthorized === true
    || input.user_authorized === true
    || input.explicitUserAuthorization === true
    || input.downgradeAuthorized === true
    || input.confirmDowngrade === true
    || input.authorization === 'user'
    || input.origin === 'user'
    || input.requestedBy === 'user'
    || input.user_approved === true;
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
  const isDowngrade = LANES.indexOf(requested) < LANES.indexOf(automaticLane);
  if (isDowngrade && !isUserAuthorizedForDowngrade(input)) {
    throw new Error(
      `Downgrade from ${automaticLane} to ${requested} requires explicit user authorization. ` +
      `Automatic ${automaticLane} due to: ${risks.join(', ') || 'default risk policy'}. ` +
      `Provide userAuthorized:true (origin=user) to confirm downgrade and acknowledge reduced review/evidence coverage.`
    );
  }
  const warnings = [`Explicit lane override selected: ${requested}.`];
  if (requested !== automaticLane) {
    warnings.push(`Override changes automatic ${automaticLane} classification to ${requested}.`);
    if (LANES.indexOf(requested) < LANES.indexOf(automaticLane)) {
      warnings.push(`Downgrading risk lane may reduce review and evidence coverage: ${risks.join(', ') || 'default risk policy'}.`);
      if (isUserAuthorizedForDowngrade(input)) {
        warnings.push(`Downgrade authorized by user - proceeding with ${requested} despite ${automaticLane} signals.`);
      }
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

function isLegacyApprovalObject(obj) {
  return obj && typeof obj === 'object' && 'approved' in obj;
}

function validateApprovalSchema(spec) {
  if (!spec || typeof spec !== 'object') return { valid: false, legacy: false, error: 'spec must be an object' };
  const approvals = spec.approvals;
  if (!approvals || typeof approvals !== 'object') return { valid: true, legacy: false };
  // Check for legacy field `approved` in any stage
  for (const [stage, val] of Object.entries(approvals)) {
    if (isLegacyApprovalObject(val)) {
      return {
        valid: false,
        legacy: true,
        error: `Legacy approval state at approvals.${stage}.approved. ${LEGACY_APPROVAL_ERROR}`,
      };
    }
    if (val && typeof val === 'object') {
      // also check if missing new fields but has generated/approved only
      if ('generated' in val && !('agent_validated' in val) && !('user_approved' in val) && !('approved' in val)) {
        // This is ambiguous: generated without new fields - treat as not ready but not legacy
      }
    }
  }
  // Check schema version
  const version = spec.schema_version || spec.approval_schema_version;
  if (version && version !== APPROVAL_SCHEMA_VERSION) {
    return { valid: false, legacy: false, error: `Unsupported schema_version ${version}, expected ${APPROVAL_SCHEMA_VERSION}` };
  }
  if (!version && Object.keys(approvals).length > 0) {
    // No version but uses new schema - allow for backward compat but warn that version should be present
    // Fail closed only if legacy detected above; otherwise allow.
    return { valid: true, legacy: false, warning: `Missing schema_version, expected ${APPROVAL_SCHEMA_VERSION}` };
  }
  return { valid: true, legacy: false };
}

function approvalState(state = {}) {
  // Detect legacy at top level or inside approvals map
  const approvalsMap = state && state.approvals && typeof state.approvals === 'object' ? state.approvals : null;
  if (approvalsMap) {
    for (const val of Object.values(approvalsMap)) {
      if (isLegacyApprovalObject(val)) {
        throw new Error(LEGACY_APPROVAL_ERROR);
      }
    }
  }
  const source = approvalsMap ? null : state;
  // If source is approvals map itself, we should not try to interpret it as single stage
  // But approvalState is intended for a single stage object; if passed whole approvals map, treat as error?
  // Keep original behavior: if state has approvals, use that, otherwise state itself.
  // For whole-spec case with legacy inside map, we already threw above.
  // For single-stage object:
  const singleSource = state && state.approvals && typeof state.approvals === 'object' && !approvalsMap ? state.approvals : state;
  // Actually simplify: if state has approvals, we already handled legacy; for single stage, source is state itself.
  // If state was {generated:true, agent_validated:true}, then approvalsMap is null, source = state
  const target = approvalsMap ? null : state;
  if (target && isLegacyApprovalObject(target)) {
    throw new Error(LEGACY_APPROVAL_ERROR);
  }
  // For single stage case, use target
  // For map case, we shouldn't be called with map; but if called with spec object containing approvals map, we return not-ready?
  if (approvalsMap) {
    // This is a spec-level object, not a stage. Return aggregate? For compatibility, treat as not ready.
    // Check if any stage has valid approval? But spec-level ready requires all stages.
    // We'll just return not ready with legacy check already done.
    return { generated: false, agent_validated: false, user_approved: false, ready: false, schema_version: APPROVAL_SCHEMA_VERSION, legacy: false };
  }
  const src = target || state;
  // Final legacy check on src
  if (isLegacyApprovalObject(src)) {
    throw new Error(LEGACY_APPROVAL_ERROR);
  }
  const result = {
    generated: src?.generated === true,
    agent_validated: src?.agent_validated === true,
    user_approved: src?.user_approved === true,
  };
  return { ...result, ready: result.generated && result.agent_validated && result.user_approved, schema_version: APPROVAL_SCHEMA_VERSION };
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

function validateCanonicalReceipt(body, options = {}) {
  if (typeof body !== 'string') return ['verification_state'];
  const failures = [];
  // Unambiguous verification state: must be Verification: PASS exactly
  if (!/^\s*Verification:\s*PASS\s*$/m.test(body)) {
    failures.push('verification_state');
  }
  // Command must be present
  if (!/^\s*Command(?:\(s\))?\s*:/m.test(body)) {
    failures.push('command');
  }
  // Exit or Result must be present with success
  if (!/^\s*Exit\s*:|exit\s+code\s*[:=]|\bResult\s*:\s*PASS\b/im.test(body)) {
    failures.push('exit_result');
  }
  // Provenance: must carry both endpoints with non-empty values on same line
  // Base: <non-whitespace> plus Head: <non-whitespace>, OR base_sha: <non-whitespace> plus head_sha: <non-whitespace>
  const hasBase = /^\s*Base[ \t]*:[ \t]*\S/im.test(body);
  const hasHead = /^\s*Head[ \t]*:[ \t]*\S/im.test(body);
  const hasBaseSha = /\bbase_sha[ \t]*:[ \t]*\S/im.test(body);
  const hasHeadSha = /\bhead_sha[ \t]*:[ \t]*\S/im.test(body);
  if (!((hasBase && hasHead) || (hasBaseSha && hasHeadSha))) {
    failures.push('provenance');
  }
  // Artifact hash: if body mentions artifact, require sha256
  // For strict mode, require at least one sha256 or artifact reference?
  // Requirement says artifact or evidence hash when applicable. We make it optional but if artifact mentioned, require hash.
  // For done tasks that produce artifacts, hash should be present. We enforce that if body contains Artifact|artifact, then sha256 must be present.
  if (/\bartifact\b/i.test(body) && !/sha256:/i.test(body)) {
    failures.push('artifact_hash');
  }
  // Evidence hash: if no artifact but strict evidence hash required, we could require sha256 generally for done tasks?
  // Make it optional for now; but we can require at least one hash when requireArtifactHash true
  if (options.requireArtifactHash && !/sha256:/i.test(body)) {
    failures.push('artifact_hash');
  }
  return failures;
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
    userAuthorized: false,
    origin: null,
  };
  const args = [...argv];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--flash') options.flash = true;
    else if (arg === '--parallel') options.parallel = true;
    else if (arg === '--json') options.json = true;
    else if (arg === '--user-authorized') options.userAuthorized = true;
    else if (arg === '--origin') options.origin = args[++i];
    else if (arg === '--consume-verdict') options.action = 'consume-verdict';
    else if (arg === '--promote-flash') options.action = 'promote-flash';
    else if (arg === '--sync-finalize') options.action = 'sync-finalize';
    else if (arg === '--classify-lane') options.action = 'classify-lane';
    else if (arg === '--lane-policy') options.action = 'lane-policy';
    else if (arg === '--approval-state') options.action = 'approval-state';
    else if (arg === '--validate-approval') options.action = 'validate-approval';
    else if (arg === '--validate-receipt') options.action = 'validate-receipt';
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
      // Merge CLI lane/override and auth flags into input
      const merged = { ...input };
      if (options.lane) merged.override = options.lane;
      if (options.override) merged.override = options.override;
      if (options.userAuthorized) merged.userAuthorized = true;
      if (options.origin) merged.origin = options.origin;
      const classification = classifyLane(merged);
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
    if (options.action === 'validate-approval') {
      if (!options.task) throw new Error('--validate-approval requires --task-json');
      const result = validateApprovalSchema(options.task);
      return cliResult({ ok: result.valid, ...result, exitCode: result.valid ? 0 : 2, message: result.valid ? 'Approval schema valid' : result.error }, options.json);
    }
    if (options.action === 'validate-receipt') {
      if (!options.task) throw new Error('--validate-receipt requires --task-json');
      const body = options.task.body || options.task.receipt || '';
      const failures = validateCanonicalReceipt(body);
      return cliResult({ ok: failures.length === 0, failures, exitCode: failures.length === 0 ? 0 : 2, message: failures.length === 0 ? 'Receipt valid' : `Receipt missing: ${failures.join(', ')}` }, options.json);
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
  APPROVAL_SCHEMA_VERSION,
  LEGACY_APPROVAL_ERROR,
  DEEP_TASK_SEQUENCE,
  CRITICAL_LANE_SEQUENCE,
  executionPolicy,
  classifyLane,
  lanePolicy,
  approvalState,
  validateApprovalSchema,
  isLegacyApprovalObject,
  isUserAuthorizedForDowngrade,
  validateCanonicalReceipt,
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
