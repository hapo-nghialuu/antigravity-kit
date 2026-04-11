#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * UserPromptSubmit Hook — rules.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Injects a lightweight rules reminder into Claude's context on each prompt.
 * Uses a per-session cooldown (5 min) to avoid repeating on every message.
 *
 * Exit: 0 always (fail-open)
 */

try {
  const fs   = require('fs');
  const os   = require('os');
  const path = require('path');

  const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

  function readRuntime(cwd) {
    try {
      const p = path.join(cwd, '.claude', 'runtime.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
    } catch { return {}; }
  }

  /** Check cooldown via temp file — returns true if injection was recent */
  function recentlyInjected(sessionId) {
    if (!sessionId) return false;
    try {
      const f = path.join(os.tmpdir(), `cafekit-rules-${sessionId}.json`);
      if (!fs.existsSync(f)) return false;
      const { ts } = JSON.parse(fs.readFileSync(f, 'utf8'));
      return (Date.now() - ts) < COOLDOWN_MS;
    } catch { return false; }
  }

  function markInjected(sessionId) {
    if (!sessionId) return;
    try {
      fs.writeFileSync(
        path.join(os.tmpdir(), `cafekit-rules-${sessionId}.json`),
        JSON.stringify({ ts: Date.now() })
      );
    } catch { /* fail-open */ }
  }

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload   = JSON.parse(stdin);
  const sessionId = payload.session_id || null;
  const cwd       = payload.cwd || process.cwd();

  if (recentlyInjected(sessionId)) process.exit(0);

  const runtime = readRuntime(cwd);

  // Language
  const thinkLang   = runtime.locale?.thinkingLanguage || '';
  const respondLang = runtime.locale?.responseLanguage || '';
  const effectThink = thinkLang || (respondLang ? 'en' : '');

  // Paths
  const baseDir   = process.env.PROJECT_ROOT || cwd;
  const plansPath = path.join(baseDir, runtime.paths?.plans || 'plans');
  const docsPath  = path.join(baseDir, runtime.paths?.docs  || 'docs');
  const maxLoc    = runtime.docs?.maxLoc || 800;

  const lines = [];

  // Language reminder
  const hasThink = effectThink && effectThink !== respondLang;
  if (hasThink || respondLang) {
    lines.push('## Language');
    if (hasThink)    lines.push(`- Thinking: Use ${effectThink} for reasoning.`);
    if (respondLang) lines.push(`- Response: Respond in ${respondLang}.`);
    lines.push('');
  }

  // Rules reminder
  lines.push('## Rules');
  lines.push(`- Markdown files: Plans → "${plansPath}/" | Docs → "${docsPath}/"`);
  lines.push(`- **DO NOT** create markdown files outside of those directories unless explicitly asked.`);
  lines.push(`- docs.maxLoc: ${maxLoc} lines max per doc file`);
  lines.push('- Follow **YAGNI · KISS · DRY** principles');
  lines.push('- Sacrifice grammar for concision in reports. List unresolved Qs at end.');
  lines.push('- Ensure token efficiency while maintaining high quality.');
  lines.push('');

  // Modularization
  lines.push('## [IMPORTANT] Consider Modularization:');
  lines.push('- If a file exceeds 200 lines, consider splitting it');
  lines.push('- Check existing modules before creating new ones');
  lines.push('- Prefer kebab-case (JS/TS/Python/shell); PascalCase (C#/Java); snake_case (Go/Rust)');
  lines.push('- Write descriptive code comments');
  lines.push('- Skip modularization for: markdown, plain text, bash scripts, config files, .env files');

  console.log(lines.join('\n'));
  markInjected(sessionId);
  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'rules', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
