#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  getHookContext,
  logCrash,
  readPayload,
  resolveProjectPath
} = require('./lib/hook-context.cjs');

function latestSourceHash(projectRoot, docsRelative) {
  try {
    return execFileSync(
      'git',
      ['log', '-1', '--format=%H', '--', '.', `:(exclude)${docsRelative}`],
      {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      }
    ).trim();
  } catch {
    return '';
  }
}

try {
  const payload = readPayload();
  if (!payload) process.exit(0);
  const { projectRoot, runtime } = getHookContext(payload);
  const docsDir = resolveProjectPath(projectRoot, runtime.paths?.docs, 'docs');
  const docsRelative = path.relative(projectRoot, docsDir).replace(/\\/g, '/');
  const hasCode = [
    'src', 'app', 'lib', 'package.json', 'index.js', 'main.py'
  ].some((candidate) => fs.existsSync(path.join(projectRoot, candidate)));
  if (!hasCode) process.exit(0);

  const lines = [];
  if (!fs.existsSync(docsDir)) {
    lines.push(
      '### Missing docs/',
      '> Source exists but the configured docs directory does not.',
      '> Create baseline architecture and project-overview docs, then record the source Git hash in `docs/.sync_hash`.'
    );
  } else {
    const currentHash = latestSourceHash(projectRoot, docsRelative);
    const trackingFile = path.join(docsDir, '.sync_hash');
    const previousHash = fs.existsSync(trackingFile)
      ? fs.readFileSync(trackingFile, 'utf8').trim()
      : '';
    if (currentHash && currentHash !== previousHash) {
      lines.push(
        '### Docs sync needed',
        `> Source changed (\`${currentHash}\`) since last docs sync (\`${previousHash || 'none'}\`).`,
        '> Review the source changes, update affected docs, then refresh `docs/.sync_hash`.'
      );
    }
  }

  if (lines.length) process.stdout.write(`${lines.join('\n')}\n`);
} catch (error) {
  logCrash('docs-sync', error);
}
