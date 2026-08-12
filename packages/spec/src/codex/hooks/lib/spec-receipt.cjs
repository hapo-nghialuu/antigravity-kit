'use strict';

const fs = require('fs');
const path = require('path');

const EVIDENCE_NAMES = [
  'Evidence',
  'Task Test Plan & Verification Evidence',
  'Verification & Evidence'
];
const PASS_MARKER = /^\s*Verification:\s*PASS\s*$/m;
const LEGACY_SUCCESS = /^\s*(?:PASS(?:ED)?|✓)(?:\s*:|$)|exit\s+code\s*[:=]?\s*0\b/im;

// Single authority: delegate to shared workflow-policy validator. If an
// installed policy exists but is broken, do not fall back to another copy.
function loadSharedPolicy() {
  const installed = path.join(__dirname, '../../scripts/workflow-policy.cjs');
  const repo = path.join(__dirname, '../../../claude/scripts/workflow-policy.cjs');
  const candidates = fs.existsSync(installed) ? [installed] : [repo];
  let lastError = new Error('shared workflow policy is missing');
  for (const candidate of candidates) {
    try {
      const policy = require(candidate);
      if (typeof policy?.validateCanonicalReceipt !== 'function') {
        throw new Error('shared workflow policy has no validateCanonicalReceipt function');
      }
      return { policy, error: null, path: candidate };
    } catch (error) {
      lastError = error;
    }
  }
  return { policy: null, error: lastError, path: candidates[0] };
}

function getSharedPolicy() {
  return loadSharedPolicy().policy;
}

function getSharedValidate() {
  return loadSharedPolicy().policy?.validateCanonicalReceipt || null;
}

function isTapMetadataHeading(line) {
  const policy = getSharedPolicy();
  return typeof policy?.isTapMetadataHeading === 'function' && policy.isTapMetadataHeading(line);
}

function evidenceBody(text) {
  const lines = text.split('\n');
  let start = -1;
  let level = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,3})\s+(.+?)\s*$/);
    if (match && EVIDENCE_NAMES.includes(match[2])) {
      start = index + 1;
      level = match[1].length;
      break;
    }
  }
  if (start < 0) return null;
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,6})\s+/);
    if (heading && heading[1].length <= level && !isTapMetadataHeading(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

function safeTaskFile(featureDir, taskPath) {
  const resolvedFeature = path.resolve(featureDir);
  const target = path.resolve(featureDir, taskPath);
  const relative = path.relative(resolvedFeature, target);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
  if (!fs.existsSync(target)) return null;
  try {
    const canonicalFeature = fs.realpathSync(resolvedFeature);
    const canonicalTarget = fs.realpathSync(target);
    const rel = path.relative(canonicalFeature, canonicalTarget);
    if (rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) return null;
  } catch {
    return null;
  }
  return target;
}

function validateCanonicalReceipt(body, options = {}) {
  const fn = getSharedValidate();
  if (!fn) return ['shared_validator'];
  return fn(body, options);
}

function checkReceipt(featureDir, taskPath, task, runtimeContext) {
  const failures = [];
  const file = safeTaskFile(featureDir, taskPath);
  if (!file || !fs.existsSync(file)) return ['a'];
  let text = '';
  try { text = fs.readFileSync(file, 'utf8'); } catch { return ['a']; }

  const status = text.split('\n')
    .find((line) => /^\s*(?:\*\*)?Status(?:\*\*)?\s*:/i.test(line));
  if (!status || !/\bdone\b/i.test(status)) failures.push('a');

  const body = evidenceBody(text);
  if (body === null) {
    failures.push('b');
  } else if (
    /\{\{[^}]+\}\}/.test(body)
    || !(PASS_MARKER.test(body) || LEGACY_SUCCESS.test(body))
  ) {
    failures.push('c');
  } else {
    const policy = loadSharedPolicy().policy;
    const options = typeof policy?.receiptValidatorOptions === 'function'
      ? policy.receiptValidatorOptions(task, { runtimeContext, requireProvenanceBinding: true })
      : { requireProvenanceBinding: true };
    const canonical = validateCanonicalReceipt(body, options);
    const map = {
      verification_state: 'c',
      command: 'e',
      exit_result: 'f',
      provenance: 'g',
      artifact_hash: 'h',
      artifact_declaration: 'h',
      placeholder: 'c',
      shared_validator: 'c',
      validator_unavailable: 'c',
    };
    for (const fail of canonical) {
      if (fail === 'verification_state' || fail === 'shared_validator' || fail === 'validator_unavailable') {
        if (!failures.includes('c')) failures.push('c');
        continue;
      }
      if (fail === 'placeholder') {
        if (!failures.includes('c')) failures.push('c');
        continue;
      }
      const letter = map[fail];
      if (letter && !failures.includes(letter)) failures.push(letter);
    }
    if (!PASS_MARKER.test(body)) {
      if (!failures.includes('c')) failures.push('c');
    }
  }

  const completedAt = task?.completed_at;
  if (
    typeof completedAt !== 'string'
    || !/^\d{4}-\d{2}-\d{2}T/.test(completedAt)
    || Number.isNaN(Date.parse(completedAt))
  ) failures.push('d');
  return failures;
}

module.exports = {
  checkReceipt,
  evidenceBody,
  safeTaskFile,
  validateCanonicalReceipt,
  loadSharedPolicy,
  getSharedPolicy,
};
