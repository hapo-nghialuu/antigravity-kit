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
  return !relative.startsWith('..') && !path.isAbsolute(relative)
    ? target
    : null;
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
  }

  const completedAt = task?.completed_at;
  if (
    typeof completedAt !== 'string'
    || !/^\d{4}-\d{2}-\d{2}T/.test(completedAt)
    || Number.isNaN(Date.parse(completedAt))
  ) failures.push('d');
  return failures;
}

module.exports = { checkReceipt };
