#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * UserPromptSubmit Hook - skill-router.cjs
 *
 * Adds a deterministic CafeKit skill suggestion for natural-language prompts.
 * It never overrides explicit slash commands; it only injects a short routing hint.
 *
 * Exit: 0 always (fail-open)
 */

const fs = require('fs');
const path = require('path');

function logCrash(error) {
  try {
    const dir = path.join(__dirname, '.logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(
      path.join(dir, 'hook-log.jsonl'),
      JSON.stringify({
        ts: new Date().toISOString(),
        hook: 'skill-router',
        status: 'crash',
        error: error.message,
      }) + '\n'
    );
  } catch (_) {}
}

try {
  const { isHookEnabled } = require('./lib/config.cjs');
  const { findRoute } = require('./lib/skill-router-routes.cjs');

  function isExplicitCommand(prompt) {
    const trimmed = prompt.trim();
    return trimmed.startsWith('/') || /^hapo:[a-z-]+/i.test(trimmed);
  }

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload = JSON.parse(stdin);
  const cwd = payload.cwd || process.cwd();
  const prompt = payload.prompt || '';
  if (!isHookEnabled('skill-router', { cwd })) process.exit(0);
  if (!prompt || isExplicitCommand(prompt)) process.exit(0);

  const route = findRoute(prompt);
  if (!route) process.exit(0);

  const skillDir = route.skill.replace(/^hapo:/, '');
  const lines = [
    '## CafeKit Skill Router',
    `- Suggested skill: \`${route.skill}\``,
    `- Why: ${route.reason}.`,
    `- Confidence: ${route.confidence} (score ${route.score}).`,
    `- Action: before acting, read \`.claude/skills/${skillDir}/SKILL.md\` and follow that workflow.`,
    '- If the user explicitly names another workflow or asks for direct answering only, follow the user request.',
  ];

  console.log(lines.join('\n'));
  process.exit(0);
} catch (error) {
  try { logCrash(error); } catch (_) {}
  process.exit(0);
}
