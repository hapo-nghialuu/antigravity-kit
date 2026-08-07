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
const EXPLICIT_FAILURE = /\bFAIL(?:ED|URE|URES|ING)?\b|tests?\s+failed|exit\s+code\s*[:=]?\s*[1-9]\d*|\b0\s+tests?\b/i;

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
    if (heading && heading[1].length <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

function safeTaskFile(featureDir, taskPath) {
  const target = path.resolve(featureDir, taskPath);
  const relative = path.relative(featureDir, target);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
  return target;
}

function validateCanonicalReceipt(body) {
  const failures = [];
  if (!/^\s*Verification:\s*PASS\s*$/m.test(body)) {
    failures.push('verification_state');
  }
  if (!/^\s*Command(?:\(s\))?\s*:/m.test(body)) {
    failures.push('command');
  }
  if (!/^\s*Exit\s*:|exit\s+code\s*[:=]|\bResult\s*:\s*PASS\b/im.test(body)) {
    failures.push('exit_result');
  }
  const hasBase = /^\s*Base[ \t]*:[ \t]*\S/im.test(body);
  const hasHead = /^\s*Head[ \t]*:[ \t]*\S/im.test(body);
  const hasBaseSha = /\bbase_sha[ \t]*:[ \t]*\S/im.test(body);
  const hasHeadSha = /\bhead_sha[ \t]*:[ \t]*\S/im.test(body);
  if (!((hasBase && hasHead) || (hasBaseSha && hasHeadSha))) {
    failures.push('provenance');
  }
  if (/\bartifact\b/i.test(body) && !/sha256:/i.test(body)) {
    failures.push('artifact_hash');
  }
  return failures;
}

function checkReceipt(featureDir, taskPath, task) {
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
    || EXPLICIT_FAILURE.test(body)
    || !(PASS_MARKER.test(body) || LEGACY_SUCCESS.test(body))
  ) {
    failures.push('c');
  } else {
    // Canonical receipt requirements: command, exit/result, provenance, unambiguous PASS
    // For done tasks, require canonical fields. If missing, add e/f/g.
    const canonical = validateCanonicalReceipt(body);
    // Map canonical failures to letters e,f,g,h for backward compat checks
    // Use detailed names but also add letters for gate reporting
    const map = {
      verification_state: 'c', // already covers but keep distinct
      command: 'e',
      exit_result: 'f',
      provenance: 'g',
      artifact_hash: 'h',
    };
    for (const fail of canonical) {
      const letter = map[fail];
      // Avoid duplicating c if already failed, but add specific
      if (fail === 'verification_state' && failures.includes('c')) continue;
      if (fail === 'verification_state') {
        // This should have been caught by c, but if PASS present via legacy, still need strict PASS
        if (!PASS_MARKER.test(body)) failures.push('c');
        continue;
      }
      if (letter && !failures.includes(letter)) failures.push(letter);
    }
    // Additional strict check: legacy success alone is not sufficient for canonical
    // If body contains only legacy PASS but not canonical Verification: PASS, c already would have caught if no PASS_MARKER?
    // But we allow legacy for backward compat in c, but canonical requires PASS_MARKER, so we must enforce.
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

module.exports = { checkReceipt, evidenceBody, safeTaskFile, validateCanonicalReceipt };
