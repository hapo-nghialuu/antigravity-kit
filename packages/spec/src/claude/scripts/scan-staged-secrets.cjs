#!/usr/bin/env node
'use strict';

const { spawnSync } = require('node:child_process');

const SENSITIVE_NAMES = new Set([
  'api_key', 'apikey', 'api-key', 'secret', 'secret_key', 'secret-key',
  'password', 'passwd', 'credential', 'credentials', 'token', 'access_token',
  'auth_token', 'bearer_token', 'client_secret', 'private_key',
  'aws_secret_access_key', 'aws_access_key_id', 'github_token', 'jwt_secret',
  'openai_api_key', 'anthropic_api_key'
]);
const SAFE_SUFFIXES = /(?:_label|_hint|_path|_file)$/i;
const PLACEHOLDER = /^(?:$|(?:your|my|replace|change|set)[-_ ]?(?:value|secret|key|token|password)?$|(?:changeme|change-me|example|sample|dummy|placeholder|test|testing|fake|xxx+|<[^>]+>|\.{3,}|\*{3,}|process\.env(?:\.|\[)))/i;
const VALUE_SIGNAL = /(?:^|[-_])(sk-[a-z0-9_-]{8,}|gh[pousr]_[a-z0-9_]{8,}|ey[a-z0-9_-]{20,}|[a-f0-9]{24,}|[a-z0-9+/]{20,}={0,2})(?:$|[^a-z0-9_])/i;

function identifierIsSensitive(name) {
  const normalized = name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  if (SAFE_SUFFIXES.test(normalized) || normalized === 'tokenizer') return false;
  if (SENSITIVE_NAMES.has(normalized)) return true;
  return /(?:^|_)(?:api[_-]?key|secret|password|passwd|credential|token|private[_-]?key)(?:_|$)/i.test(normalized);
}

function valueLooksSecret(value) {
  const clean = String(value || '').trim().replace(/^['"`]|['"`,;]$/g, '');
  if (!clean || PLACEHOLDER.test(clean) || /^\$\{?[A-Z0-9_]+\}?$/.test(clean)) return false;
  return VALUE_SIGNAL.test(clean) || (clean.length >= 20 && /[A-Za-z]/.test(clean) && /\d/.test(clean));
}

function parseDiff(diff) {
  const findings = [];
  let file = null;
  let sourceLine = 0;
  for (const line of diff.split(/\r?\n/)) {
    if (line.startsWith('+++ b/')) {
      file = line.slice(6);
      continue;
    }
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
    if (hunk) {
      sourceLine = Number(hunk[1]);
      continue;
    }
    if (!file || sourceLine < 1) continue;
    if (line.startsWith('+') && !line.startsWith('+++')) {
      inspectAddedLine(line.slice(1), file, sourceLine, findings);
      sourceLine++;
    } else if (!line.startsWith('-') && !line.startsWith('\\')) {
      sourceLine++;
    }
  }
  return findings;
}

function inspectAddedLine(text, file, sourceLine, findings) {
  const assignment = /(?:^|[\s,{])(["']?[A-Za-z][A-Za-z0-9_-]*["']?)\s*(?::|=)\s*([^\s#]+)/g;
  let match;
  while ((match = assignment.exec(text)) !== null) {
    const name = match[1].replace(/^['"]|['"]$/g, '');
    const value = match[2];
    if (identifierIsSensitive(name) && valueLooksSecret(value)) {
      findings.push({ file, sourceLine, name });
    }
  }
}

function main() {
  const result = spawnSync(
    'git',
    ['diff', '--cached', '--unified=0', '--no-color', '--diff-filter=ACMR', '--'],
    { encoding: 'utf8' }
  );
  if (result.error || result.status !== 0) {
    process.stderr.write(`Unable to read staged diff: ${result.error?.message || result.stderr || 'git diff failed'}\n`);
    return 2;
  }

  const findings = parseDiff(result.stdout);
  const unique = new Map(findings.map((finding) => [
    `${finding.file}:${finding.sourceLine}:${finding.name}`,
    finding
  ]));
  for (const finding of unique.values()) {
    process.stdout.write(
      `Blocked: possible secret \`${finding.name}\` at ${finding.file}:${finding.sourceLine}. Value not shown.\n`
    );
  }
  if (unique.size === 0) process.stdout.write('No staged secrets found.\n');
  return unique.size > 0 ? 1 : 0;
}

if (require.main === module) process.exit(main());
module.exports = { parseDiff, identifierIsSensitive, valueLooksSecret };
