'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { annotatedMarkdownLines } = require('./spec-resolver.cjs');

const EVIDENCE_HEADINGS = new Set([
  'Evidence',
  'Task Test Plan & Verification Evidence',
  'Verification & Evidence',
]);

function inside(root, target) {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function safeRead(root, relativePath) {
  if (typeof relativePath !== 'string' || path.isAbsolute(relativePath)) return { status: 'unsafe' };
  const segments = relativePath.split(/[\\/]+/);
  if (segments.length === 0 || segments.some((segment) => !segment || segment === '.' || segment === '..')) return { status: 'unsafe' };
  const resolvedRoot = path.resolve(root);
  const target = path.resolve(resolvedRoot, ...segments);
  if (!inside(resolvedRoot, target)) return { status: 'unsafe' };
  try {
    const canonicalRoot = fs.realpathSync(resolvedRoot);
    let current = resolvedRoot;
    for (const segment of segments) {
      current = path.join(current, segment);
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink()) return { status: 'unsafe' };
    }
    const canonicalTarget = fs.realpathSync(target);
    if (!inside(canonicalRoot, canonicalTarget) || !fs.statSync(target).isFile()) return { status: 'unsafe' };
    return { status: 'ok', path: canonicalTarget, bytes: fs.readFileSync(target) };
  } catch (error) {
    return { status: error && error.code === 'ENOENT' ? 'missing' : 'unsafe' };
  }
}

function canonicalTaskReceiptPath(taskPath) {
  if (typeof taskPath !== 'string') return null;
  const match = taskPath.match(/^tasks\/(task-[A-Za-z0-9][A-Za-z0-9._-]*\.md)$/);
  return match ? `receipts/${match[1]}` : null;
}

function evidenceBody(text, policy = {}) {
  const lines = String(text || '').split('\n');
  let start = -1;
  let level = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,3})\s+(.+?)\s*$/);
    if (match && EVIDENCE_HEADINGS.has(match[2])) {
      start = index + 1;
      level = match[1].length;
      break;
    }
  }
  if (start < 0) return null;
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,6})\s+/);
    const tap = typeof policy.isTapMetadataHeading === 'function' && policy.isTapMetadataHeading(lines[index]);
    if (heading && heading[1].length <= level && !tap) { end = index; break; }
  }
  return lines.slice(start, end).join('\n');
}

function workflowReceiptBody(text, policy = {}) {
  const lines = annotatedMarkdownLines(text);
  const starts = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].outsideFence && /^##\s+Receipt\s*$/.test(lines[index].line)) starts.push(index + 1);
  }
  if (starts.length !== 1) return null;

  const start = starts[0];
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    if (!lines[index].outsideFence) continue;
    const heading = lines[index].line.match(/^(#{1,6})\s+/);
    const tap = typeof policy.isTapMetadataHeading === 'function' && policy.isTapMetadataHeading(lines[index].line);
    if (heading && heading[1].length <= 2 && !tap) { end = index; break; }
  }
  return lines.slice(start, end).map(({ line }) => line).join('\n');
}

function workflowCanonicalValidationBody(body) {
  return annotatedMarkdownLines(body)
    .filter(({ outsideFence }) => outsideFence)
    .map(({ line }) => line)
    .join('\n');
}

function hasNonEmptyFencedBlock(body) {
  let open = false;
  let nonEmpty = false;
  for (const { line, fenceEvent } of annotatedMarkdownLines(body)) {
    if (fenceEvent === 'open') {
      open = true;
      nonEmpty = false;
    } else if (fenceEvent === 'close') {
      if (open && nonEmpty) return true;
      open = false;
    } else if (open && line.trim() !== '') {
      nonEmpty = true;
    }
  }
  return false;
}

function fieldValues(body, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matcher = new RegExp(`^\\s*${escaped}\\s*:\\s*(.*?)\\s*$`, 'i');
  return String(body || '').split('\n').map((line) => line.match(matcher)).filter(Boolean).map((match) => match[1]);
}

function concrete(value) {
  return typeof value === 'string' && value.trim() !== '' && !/^(?:N\/A|NONE|PENDING|TBD|UNKNOWN|\{\{.*\}\})$/i.test(value.trim());
}

function normalizedCommand(value) {
  if (typeof value !== 'string') return null;
  let command = value.trim();
  if (/^`[^`\r\n]+`$/.test(command)) command = command.slice(1, -1).trim();
  if (!concrete(command) || /^<[^>]+>$/.test(command)) return null;
  return command;
}

function workflowVerificationCommand(taskText) {
  const sections = [];
  let current = null;
  for (const { line, outsideFence } of annotatedMarkdownLines(taskText)) {
    if (!outsideFence) continue;
    if (/^##\s+Verification Plan\s*$/.test(line)) {
      current = [];
      sections.push(current);
      continue;
    }
    if (current && /^#{1,2}\s+/.test(line)) {
      current = null;
      continue;
    }
    if (current) current.push(line);
  }
  if (sections.length !== 1) return null;
  const commands = sections[0]
    .map((line) => line.match(/^\s*-\s+(?:\*\*Command\*\*|Command)\s*:\s*(.*?)\s*$/i))
    .filter(Boolean)
    .map((match) => normalizedCommand(match[1]));
  return commands.length === 1 ? commands[0] : null;
}

function workflowCommandFailures(taskText, body) {
  const planned = workflowVerificationCommand(taskText);
  const actualValues = [
    ...fieldValues(body, 'Command'),
    ...fieldValues(body, 'Commands'),
  ].map(normalizedCommand);
  return planned && actualValues.length === 1 && actualValues[0] === planned
    ? []
    : ['command_identity'];
}

function plannedField(taskText, name) {
  const plan = String(taskText || '').split(/^##\s+Verification Plan\s*$/m)[1];
  if (!plan) return null;
  const value = fieldValues(plan.split(/^##\s+/m)[0], `- **${name}**`)[0];
  return value ? value.replace(/^`|`$/g, '').trim() : null;
}

function identity(body) {
  const names = ['Verification', 'Command', 'Commands', 'Exit', 'Result', 'Base', 'Head', 'base_sha', 'head_sha'];
  const fields = names.flatMap((name) => fieldValues(body, name).map((value) => [name.toLowerCase(), value.trim()]));
  const artifacts = String(body || '').split('\n').filter((line) => /^\s*Artifacts?\s*:|^\s*Artifact\s+produced\b/i.test(line)).map((line) => line.trim());
  return crypto.createHash('sha256').update(JSON.stringify({ fields, artifacts })).digest('hex');
}

function canonicalFailures(body, task, runtimeContext, policy) {
  if (!policy || typeof policy.validateCanonicalReceipt !== 'function') return ['validator_unavailable'];
  const options = typeof policy.receiptValidatorOptions === 'function'
    ? policy.receiptValidatorOptions(task || {}, { runtimeContext, requireProvenanceBinding: true })
    : { requireProvenanceBinding: true };
  return policy.validateCanonicalReceipt(body, options);
}

function separateMetadataFailures(body, taskPath, taskText) {
  const failures = [];
  const basename = path.posix.basename(taskPath);
  if (fieldValues(body, 'Task').length !== 1 || fieldValues(body, 'Task')[0] !== basename) failures.push('task_identity');
  if (fieldValues(body, 'Task path').length !== 1 || fieldValues(body, 'Task path')[0] !== taskPath) failures.push('task_identity');
  if (!concrete(fieldValues(body, 'Expected')[0]) || !concrete(fieldValues(body, 'Observed')[0])) failures.push('expected_observed');
  const plannedCommand = plannedField(taskText, 'Command');
  const actualCommand = fieldValues(body, 'Command')[0] || fieldValues(body, 'Commands')[0];
  if (plannedCommand && !/^N\/A\b/i.test(plannedCommand) && actualCommand !== plannedCommand) failures.push('command_identity');
  for (const name of ['Negative path', 'Reachability']) {
    const planned = plannedField(taskText, name);
    if (planned && !/^(?:N\/A|none|not relevant)\b/i.test(planned) && !concrete(fieldValues(body, name)[0])) failures.push(name.toLowerCase().replace(' ', '_'));
  }
  return [...new Set(failures)];
}

function readTaskProof(featureDir, taskPath, policy = {}) {
  const receiptPath = canonicalTaskReceiptPath(taskPath);
  if (typeof taskPath !== 'string' || !/^tasks\/[^/]+\.md$/.test(taskPath)) return { status: 'unsafe', taskPath, receiptPath: null };
  const taskFile = safeRead(featureDir, taskPath);
  if (taskFile.status !== 'ok') return { status: taskFile.status, taskPath, receiptPath };
  const taskText = taskFile.bytes.toString('utf8');
  const separate = receiptPath ? safeRead(featureDir, receiptPath) : { status: 'missing' };
  const legacyBody = evidenceBody(taskText, policy);
  if (separate.status === 'unsafe') return { status: 'unsafe', taskPath, receiptPath, taskFile };
  if (separate.status === 'ok') {
    const body = separate.bytes.toString('utf8');
    return { status: 'ok', source: 'separate', body, receiptBytes: separate.bytes, receiptFile: separate, taskFile, taskText, taskPath, receiptPath, legacyBody };
  }
  if (legacyBody !== null) return { status: 'ok', source: 'legacy', body: legacyBody, receiptBytes: Buffer.from(legacyBody), taskFile, taskText, taskPath, receiptPath, legacyBody };
  return { status: 'missing', taskPath, receiptPath, taskFile, taskText };
}

function checkTaskReceipt(featureDir, taskPath, task, runtimeContext, policy) {
  const proof = readTaskProof(featureDir, taskPath, policy);
  const failures = [];
  if (proof.status !== 'ok') return { ...proof, failures: [proof.status === 'unsafe' ? 'unsafe_path' : 'missing_receipt'] };
  const status = proof.taskText.split('\n').find((line) => /^\s*(?:\*\*)?Status(?:\*\*)?\s*:/i.test(line));
  if (!status || !/\bdone\b/i.test(status)) failures.push('task_status');
  failures.push(...canonicalFailures(proof.body, task, runtimeContext, policy));
  if (proof.source === 'separate') {
    failures.push(...separateMetadataFailures(proof.body, taskPath, proof.taskText));
    if (proof.legacyBody !== null
      && /^\s*Verification:\s*PASS\s*$/m.test(proof.legacyBody)
      && identity(proof.legacyBody) !== identity(proof.body)) failures.push('receipt_conflict');
  }
  const completedAt = task && task.completed_at;
  if (typeof completedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(completedAt) || Number.isNaN(Date.parse(completedAt))) failures.push('completed_at');
  return { ...proof, failures: [...new Set(failures)] };
}

function checkWorkflowTaskReceipt(featureDir, taskPath, runtimeContext, policy) {
  const safeTaskPath = typeof taskPath === 'string' && /^task-[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(taskPath);
  if (!safeTaskPath) return { status: 'unsafe', taskPath, failures: ['unsafe_path'] };
  const taskFile = safeRead(featureDir, taskPath);
  if (taskFile.status !== 'ok') {
    return { ...taskFile, taskPath, failures: [taskFile.status === 'unsafe' ? 'unsafe_path' : 'missing_receipt'] };
  }

  const taskText = taskFile.bytes.toString('utf8');
  const statusLines = annotatedMarkdownLines(taskText)
    .filter(({ outsideFence }) => outsideFence)
    .map(({ line }) => line.match(/^\s*(?:\*\*)?Status(?:\*\*)?\s*:\s*(?:\*\*)?\s*([A-Za-z_-]+)(?:\*\*)?\s*$/i))
    .filter(Boolean);
  const body = workflowReceiptBody(taskText, policy);
  const failures = [];
  if (statusLines.length !== 1 || statusLines[0][1].toLowerCase().replaceAll('-', '_') !== 'done') {
    failures.push('task_status');
  }
  if (body === null) {
    failures.push('missing_receipt');
  } else {
    const canonicalBody = workflowCanonicalValidationBody(body);
    const options = typeof policy?.receiptValidatorOptions === 'function'
      ? policy.receiptValidatorOptions({}, { runtimeContext, requireProvenanceBinding: true })
      : { requireProvenanceBinding: true };
    failures.push(...canonicalFailures(canonicalBody, {}, runtimeContext, policy));
    failures.push(...canonicalFailures(body, {}, runtimeContext, policy)
      .filter((failure) => ['placeholder', 'verification_state', 'exit_result'].includes(failure)));
    failures.push(...workflowCommandFailures(taskText, canonicalBody));
    if (!hasNonEmptyFencedBlock(body)) failures.push('command_output');
    if (!options.expectedProvenance) failures.push('provenance');
  }
  return {
    status: failures.length === 0 ? 'ok' : 'invalid',
    source: 'inline',
    body,
    receiptBytes: body === null ? null : Buffer.from(body),
    taskFile,
    taskText,
    taskPath,
    failures: [...new Set(failures)],
  };
}

function workflowProofSignature(taskPath, proof) {
  const hash = crypto.createHash('sha256');
  hash.update('cafekit-workflow-proof-v1\0');
  hash.update(String(taskPath));
  hash.update('\0');
  hash.update(proof.taskFile?.bytes || Buffer.alloc(0));
  hash.update('\0');
  hash.update(proof.receiptBytes || Buffer.alloc(0));
  hash.update('\0');
  hash.update(String(proof.status || 'unknown'));
  return hash.digest('hex');
}

function workflowDependencyProofState(featureDir, taskRegistry, runtimeContext, policy) {
  const tasks = {};
  for (const taskPath of Object.keys(taskRegistry || {}).sort()) {
    const done = taskRegistry[taskPath]?.status === 'done';
    const proof = checkWorkflowTaskReceipt(featureDir, taskPath, runtimeContext, policy);
    const valid = proof.failures.length === 0;
    tasks[taskPath] = {
      done,
      valid,
      eligible: done && valid,
      signature: workflowProofSignature(taskPath, proof),
      failures: [...proof.failures],
    };
  }
  return tasks;
}

function checkWorkflowReceiptSet(candidates, projectRoot, runtimeSession, policy) {
  const failures = [];
  for (const candidate of Array.isArray(candidates) ? candidates : []) {
    const runtimeContext = policy.deriveRuntimeContext({
      projectRoot,
      specsRoot: candidate.specsDir,
      specFile: candidate.stateFile || candidate.planFile,
      featureName: candidate.featureName,
      runtimeSession,
    });
    const doneTasks = Object.keys(candidate.taskRegistry || {}).filter((taskPath) => (
      candidate.taskRegistry[taskPath]?.status === 'done'
    ));
    for (const taskPath of doneTasks) {
      const proof = checkWorkflowTaskReceipt(candidate.featureDir, taskPath, runtimeContext, policy);
      if (proof.failures.length > 0) {
        failures.push({ featureName: candidate.featureName, taskPath, failures: proof.failures });
      }
    }
  }
  return { failures };
}

function checkFeatureReceipt(featureDir, runtimeContext, policy) {
  const receipt = safeRead(featureDir, 'feature-receipt.md');
  if (receipt.status !== 'ok') return { status: receipt.status, failures: [receipt.status === 'unsafe' ? 'unsafe_path' : 'missing_receipt'] };
  const body = receipt.bytes.toString('utf8');
  const failures = canonicalFailures(body, {}, runtimeContext, policy);
  if (fieldValues(body, 'Feature').length !== 1 || fieldValues(body, 'Feature')[0] !== path.basename(featureDir)) failures.push('feature_identity');
  if (!concrete(fieldValues(body, 'Expected')[0]) || !concrete(fieldValues(body, 'Observed')[0])) failures.push('expected_observed');
  return { status: 'ok', source: 'feature', body, receiptBytes: receipt.bytes, receiptFile: receipt, failures: [...new Set(failures)] };
}

module.exports = {
  canonicalTaskReceiptPath,
  checkFeatureReceipt,
  checkTaskReceipt,
  checkWorkflowReceiptSet,
  checkWorkflowTaskReceipt,
  evidenceBody,
  readTaskProof,
  safeRead,
  workflowDependencyProofState,
  workflowReceiptBody,
};
