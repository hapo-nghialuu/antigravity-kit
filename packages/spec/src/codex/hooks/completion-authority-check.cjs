'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const STATE = require('./completion-authority-state.cjs');
const { checkReceipt, evidenceBody } = require('./lib/spec-receipt.cjs');
const { findAllSpecCandidates, resolveActiveSpec } = require('./lib/spec-utils.cjs');

function plain(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function inside(root, target) {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function readBoundFile(root, target) {
  const requested = path.isAbsolute(target) ? target : path.resolve(root, target);
  if (!inside(root, requested)) return null;
  try {
    const canonicalRoot = fs.realpathSync(root);
    const canonical = fs.realpathSync(requested);
    if (!inside(canonicalRoot, canonical) || !fs.statSync(canonical).isFile()) return null;
    return fs.readFileSync(canonical);
  } catch { return null; }
}

function readTask(featureDir, taskPath) {
  const target = path.resolve(featureDir, taskPath);
  if (!inside(featureDir, target)) return null;
  const bytes = readBoundFile(featureDir, target);
  if (!bytes) return null;
  return { bytes, text: bytes.toString('utf8'), path: fs.realpathSync(target) };
}

function artifactReferences(body) {
  if (typeof body !== 'string') return [];
  const references = [];
  for (const line of body.split('\n')) {
    if (!/^\s*Artifacts?\s*:/i.test(line) && !/^\s*Artifact\s+produced\b/i.test(line)) continue;
    const hashes = [...line.matchAll(/\b(?:artifact[_-])?sha-?256\s*:\s*([^\s),;`]+)/gi)].map((match) => match[1]);
    const raw = line.replace(/^\s*Artifacts?\s*:\s*/i, '').replace(/^\s*Artifact\s+produced\s*:?[ \t]*/i, '').replace(/\b(?:artifact[_-])?sha-?256\s*:\s*[^\s),;`]+/gi, '').replace(/[()[\]{}]/g, ' ').trim();
    const paths = raw.split(/\s*(?:\+|,|;|\band\b)\s*/i).map((value) => value.trim()).filter(Boolean);
    paths.forEach((artifactPath, index) => references.push({ path: artifactPath, hash: hashes[index] || null }));
  }
  return references;
}

function resolveCandidate({ projectRoot, runtime, payload }) {
  const explicitFeature = payload.featureName || payload.feature || payload.explicitFeature || null;
  const explicitPath = payload.specPath || payload.spec_path || payload.featurePath || null;
  const candidates = findAllSpecCandidates(projectRoot, runtime);
  if (candidates.length > 1) return { error: 'multiple_persisted', candidates: candidates.map((candidate) => candidate.featureName) };
  if (candidates.length === 0) {
    if (explicitFeature || explicitPath) return { error: 'explicit_not_found', explicitFeature, explicitPath, reason: 'no globally persisted spec matches the explicit target' };
    return null;
  }
  if (!explicitFeature && !explicitPath) return candidates[0];
  const targeted = resolveActiveSpec({ projectRoot, runtime, explicitFeature, explicitPath });
  if (!targeted || targeted.error) {
    return {
      error: 'explicit_mismatch',
      explicitFeature,
      explicitPath,
      reason: targeted?.reason || 'explicit target does not resolve to the persisted candidate',
    };
  }
  if (targeted.featureName !== candidates[0].featureName || path.resolve(targeted.specFile) !== path.resolve(candidates[0].specFile)) {
    return {
      error: 'explicit_mismatch',
      explicitFeature,
      explicitPath,
      reason: 'explicit target does not match the sole globally persisted candidate',
    };
  }
  return candidates[0];
}

function policyRank(policy, lane) {
  const lanes = Array.isArray(policy.LANES) ? policy.LANES : ['Direct', 'Standard', 'Critical'];
  return lanes.indexOf(lane);
}

function policyMonotonicFailures(policy, baseline, current) {
  const failures = [];
  if (baseline.version !== current.version) failures.push('workflow_policy.version changed');
  if (policyRank(policy, current.lane) < policyRank(policy, baseline.lane)) failures.push(`workflow_policy.lane downgraded from ${baseline.lane} to ${current.lane}`);
  if (policyRank(policy, current.automatic_lane) < policyRank(policy, baseline.automatic_lane)) failures.push(`workflow_policy.automatic_lane downgraded from ${baseline.automatic_lane} to ${current.automatic_lane}`);
  const currentRisks = new Set(current.risks);
  for (const risk of baseline.risks) if (!currentRisks.has(risk)) failures.push(`workflow_policy risk ${risk} was removed`);
  const currentObligations = new Set(current.proof_obligations);
  for (const obligation of baseline.proof_obligations) if (!currentObligations.has(obligation)) failures.push(`workflow_policy obligation ${obligation} was removed`);
  return failures;
}

function mergePolicyFloor(policy, floor, current) {
  const merged = { ...current };
  if (policyRank(policy, floor.lane) > policyRank(policy, current.lane)) merged.lane = floor.lane;
  if (policyRank(policy, floor.automatic_lane) > policyRank(policy, current.automatic_lane)) merged.automatic_lane = floor.automatic_lane;
  merged.risks = [...new Set([...current.risks, ...floor.risks])];
  const proofObligations = [];
  const actorNeeds = [];
  for (const source of [current, floor]) {
    for (let index = 0; index < source.proof_obligations.length; index += 1) {
      const obligation = source.proof_obligations[index];
      if (proofObligations.includes(obligation)) continue;
      proofObligations.push(obligation);
      actorNeeds.push(source.actor_needs[index]);
    }
  }
  merged.proof_obligations = proofObligations;
  merged.actor_needs = actorNeeds;
  return merged;
}

function observePolicyBaseline({ STATE: state, policy, projectRoot, candidate }) {
  if (!Object.prototype.hasOwnProperty.call(candidate.spec, 'workflow_policy')) {
    return { ok: false, reason: 'workflow_policy is missing for persisted spec' };
  }
  const current = candidate.spec.workflow_policy;
  const validation = policy.validateWorkflowPolicySnapshot(current);
  if (!validation.valid) return { ok: false, reason: `workflow_policy is malformed: ${validation.errors.join('; ')}` };
  let identity;
  try {
    identity = {
      project_root: fs.realpathSync(projectRoot),
      spec_file: fs.realpathSync(candidate.specFile),
      feature_name: candidate.featureName,
    };
    state.ensureKey();
    let authorityState = state.readState(projectRoot);
    if (authorityState.malformed || authorityState.keyError || authorityState.keyMissing) {
      return { ok: false, reason: authorityState.reason || 'completion authority state is unavailable' };
    }
    if (!authorityState.floor) {
      if (authorityState.baselines.length > 0 || authorityState.pending || authorityState.grant) {
        return { ok: false, reason: 'project policy floor is missing for persisted authority state' };
      }
      state.writePolicyFloor(projectRoot, current);
      authorityState = state.readState(projectRoot);
      if (authorityState.malformed || authorityState.keyError || authorityState.keyMissing || !authorityState.floor) {
        return { ok: false, reason: authorityState.reason || 'project policy floor could not be persisted' };
      }
    } else {
      const floorValidation = policy.validateWorkflowPolicySnapshot(authorityState.floor.policy);
      if (!floorValidation.valid) return { ok: false, reason: `persisted project policy floor is malformed: ${floorValidation.errors.join('; ')}` };
      const floorFailures = policyMonotonicFailures(policy, authorityState.floor.policy, current);
      if (floorFailures.length) return { ok: false, reason: `project policy floor is monotonic and cannot be downgraded (${floorFailures.join('; ')})` };
      const mergedFloor = mergePolicyFloor(policy, authorityState.floor.policy, current);
      if (state.digest(authorityState.floor.policy) !== state.digest(mergedFloor)) state.writePolicyFloor(projectRoot, mergedFloor);
    }
    const baseline = state.readBaseline(projectRoot, identity);
    if (!baseline) {
      state.writeBaseline(projectRoot, identity, current);
      return { ok: true };
    }
    const baselineValidation = policy.validateWorkflowPolicySnapshot(baseline.policy);
    if (!baselineValidation.valid) return { ok: false, reason: `persisted workflow policy baseline is malformed: ${baselineValidation.errors.join('; ')}` };
    const failures = policyMonotonicFailures(policy, baseline.policy, current);
    if (failures.length) return { ok: false, reason: `workflow_policy baseline is monotonic and cannot be downgraded (${failures.join('; ')})` };
    if (state.digest(baseline.policy) !== state.digest(current)) state.writeBaseline(projectRoot, identity, current);
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `workflow_policy baseline unavailable: ${error.message}` };
  }
}

function evaluateCloseout({ policy, projectRoot, runtime, payload }) {
  const candidate = resolveCandidate({ projectRoot, runtime, payload });
  if (!candidate) return { ok: true, candidate: null };
  if (candidate.error) {
    const detail = Array.isArray(candidate.candidates) ? candidate.candidates.join(', ') : (candidate.reason || candidate.error);
    return { ok: false, candidate, reason: `${candidate.error}: ${detail}` };
  }
  const sessionId = payload.session_id;
  if (typeof sessionId !== 'string' || !sessionId.trim()) return { ok: false, candidate, reason: 'trusted host session ID is unavailable' };
  const baseline = observePolicyBaseline({ STATE, policy, projectRoot, candidate });
  if (!baseline.ok) return { ok: false, candidate, reason: baseline.reason };
  if (runtime.spec?.completion_gate !== undefined && runtime.spec.completion_gate !== true) return { ok: false, candidate, reason: 'runtime.spec.completion_gate is worker-writable and cannot authorize completion' };
  const status = candidate.spec.status;
  if (!['in_progress', 'in-progress', 'completed', 'complete'].includes(status)) return { ok: false, candidate, reason: `spec status is invalid: ${String(status)}` };
  const registry = candidate.spec.task_registry;
  if (!plain(registry) || Object.keys(registry).length === 0) return { ok: false, candidate, reason: 'task_registry is missing or empty' };

  let runtimeContext;
  try {
    runtimeContext = policy.deriveRuntimeContext({
      projectRoot,
      specsRoot: candidate.specsDir,
      specFile: candidate.specFile,
      featureName: candidate.featureName,
      runtimeSession: sessionId,
    });
  } catch (error) {
    return { ok: false, candidate, reason: `runtime provenance unavailable: ${error.message}` };
  }
  if (!policy.isTrustedRuntimeContext(runtimeContext)) return { ok: false, candidate, reason: 'fresh trusted runtime Base/Head/context is unavailable' };

  const featureDir = path.join(candidate.specsDir, candidate.featureName);
  const receiptBodies = new Map();
  const taskFiles = [];
  const failures = [];
  for (const [taskPath, task] of Object.entries(registry)) {
    if (!plain(task) || task.status !== 'done') {
      failures.push(`${taskPath}: status is not done`);
      continue;
    }
    if (policy.isStaleFlashDone(task)) failures.push(`${taskPath}: FLASH_UNVERIFIED`);
    const file = readTask(featureDir, taskPath);
    const body = file ? evidenceBody(file.text) : null;
    if (body !== null) receiptBodies.set(taskPath, body);
    const receiptFailures = checkReceipt(featureDir, taskPath, task, runtimeContext);
    if (receiptFailures.length) failures.push(`${taskPath}: checks ${receiptFailures.join(',')}`);
    if (file) taskFiles.push({ path: taskPath, digest: crypto.createHash('sha256').update(file.bytes).digest('hex') });
  }
  if (failures.length) return { ok: false, candidate, reason: `technical completion proof is incomplete (${failures.slice(0, 4).join('; ')})` };

  const firstTask = Object.keys(registry).find((taskPath) => receiptBodies.has(taskPath));
  let completion;
  try {
    completion = policy.completionDecisionForSpec(candidate.spec, {
      runtimeContext,
      executionReceipt: firstTask ? receiptBodies.get(firstTask) : null,
      taskContext: firstTask ? registry[firstTask] : null,
    });
  } catch (error) {
    return { ok: false, candidate, reason: `workflow completion proof could not be evaluated: ${error.message}` };
  }
  if (completion.completion !== 'complete' && completion.completion !== 'not_applicable') {
    return { ok: false, candidate, reason: completion.blocker || 'workflow completion proof is incomplete' };
  }

  const artifactRefs = [...receiptBodies.values()].flatMap(artifactReferences).sort((left, right) => `${left.path}:${left.hash}`.localeCompare(`${right.path}:${right.hash}`));
  const artifactFiles = artifactRefs.map((reference) => ({
    ...reference,
    digest: crypto.createHash('sha256').update(readBoundFile(projectRoot, reference.path) || Buffer.from('<missing>')).digest('hex'),
  }));
  const specBytes = readBoundFile(projectRoot, candidate.specFile);
  const binding = {
    project_root: runtimeContext.project_root,
    platform: process.platform,
    session_id: sessionId,
    feature_name: candidate.featureName,
    spec_file: candidate.specFile,
    runtime: { base: runtimeContext.base, head: runtimeContext.head, context_id: runtimeContext.context_id },
    spec_digest: STATE.digest(candidate.spec),
    spec_bytes_digest: crypto.createHash('sha256').update(specBytes || Buffer.from('<missing>')).digest('hex'),
    policy_digest: STATE.digest(candidate.spec.workflow_policy ?? null),
    task_registry_digest: STATE.digest(registry),
    task_digest: STATE.digest(taskFiles),
    artifact_digest: STATE.digest(artifactFiles),
    provenance_digest: STATE.digest({ runtime: runtimeContext, receipts: [...receiptBodies.values()].map((body) => body.match(/^\s*(?:Base|Head|base_sha|head_sha)\s*:.*$/gim) || []) }),
  };
  binding.binding_digest = STATE.digest(binding);
  return { ok: true, candidate, runtimeContext, binding };
}

module.exports = { evaluateCloseout, resolveCandidate, observePolicyBaseline };
