#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  atomicWrite,
  getHookContext,
  logCrash,
  readPayload,
  resolveProjectPath
} = require('./lib/hook-context.cjs');

const COOLDOWN_MS = 5 * 60 * 1000;

function cooldownFile(projectRoot, sessionId) {
  const key = crypto.createHash('sha256')
    .update(String(sessionId || 'unknown'))
    .digest('hex')
    .slice(0, 16);
  return path.join(projectRoot, '.codex', 'hooks', '.logs', `rules-${key}.json`);
}

function recentlyInjected(file) {
  try {
    const state = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Date.now() - Number(state.ts || 0) < COOLDOWN_MS;
  } catch {
    return false;
  }
}

try {
  const payload = readPayload();
  if (!payload) process.exit(0);
  const { projectRoot, runtime } = getHookContext(payload);
  const cache = cooldownFile(projectRoot, payload.session_id);
  if (recentlyInjected(cache)) process.exit(0);

  const respondLang = runtime.locale?.responseLanguage || '';
  const thinkLang = runtime.locale?.thinkingLanguage || (respondLang ? 'en' : '');
  const plansPath = resolveProjectPath(projectRoot, runtime.paths?.plans, 'plans');
  const docsPath = resolveProjectPath(projectRoot, runtime.paths?.docs, 'docs');
  const lines = [];

  if ((thinkLang && thinkLang !== respondLang) || respondLang) {
    lines.push('## Language');
    if (thinkLang && thinkLang !== respondLang) {
      lines.push(`- Thinking: Use ${thinkLang} for reasoning.`);
    }
    if (respondLang) lines.push(`- Response: Respond in ${respondLang}.`);
    lines.push('');
  }

  lines.push(
    '## Rules',
    `- Markdown: Plans → "${plansPath}/" | Docs → "${docsPath}/"`,
    '- Do not create markdown outside those directories unless explicitly asked.',
    `- docs.maxLoc: ${runtime.docs?.maxLoc || 800} lines per doc file`,
    '- Follow YAGNI · KISS · DRY.',
    '- Reports: concise; unresolved questions last.',
    '',
    '## Skill Routing',
    '- Choose skills using `.codex/rules/skill-workflow-routing.md` and `.codex/rules/skill-domain-routing.md`.',
    '- Inspect installed skills with `node .codex/scripts/generate-skill-catalog.cjs --skills` when needed.',
    '- Explicit user requests override routing suggestions.',
    '',
    '## Modularization',
    '- Consider splitting code files over 200 lines at real concern boundaries.',
    '- Check existing modules first; use descriptive names and comments.',
    '- Skip modularization for markdown, plain text, shell, config, and env files.'
  );

  process.stdout.write(`${lines.join('\n')}\n`);
  atomicWrite(cache, `${JSON.stringify({ ts: Date.now() })}\n`);
} catch (error) {
  logCrash('rules', error);
}
