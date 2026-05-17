#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * SubagentStart Hook — agent.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Fires when a subagent (Task tool) is spawned.
 * Injects lightweight context: language, rules, paths (~100 tokens).
 *
 * Exit: 0 always (fail-open)
 */

try {
  const fs   = require('fs');
  const path = require('path');

  /** Read .claude/runtime.json */
  function readRuntime(cwd) {
    try {
      const p = path.join(cwd, '.claude', 'runtime.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
    } catch { return {}; }
  }

  /** Resolve Python venv executable path if it exists */
  function resolveVenv(cwd) {
    const candidates = [
      path.join(cwd, '.claude', 'skills', '.venv', 'bin', 'python3'),
      path.join(cwd, '.claude', 'skills', '.venv', 'Scripts', 'python.exe'),
    ];
    return candidates.find(p => fs.existsSync(p)) || null;
  }

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload    = JSON.parse(stdin);
  const agentType  = payload.agent_type || 'unknown';
  const agentId    = payload.agent_id   || 'unknown';
  // Use payload.cwd for monorepo support — subagent may run in a different dir
  const agentCwd   = payload.cwd?.trim() || process.cwd();
  const runtime    = readRuntime(agentCwd);

  // Language config from runtime.json
  const thinkLang    = runtime.locale?.thinkingLanguage || '';
  const respondLang  = runtime.locale?.responseLanguage || '';
  // Default thinking to 'en' when only response language is set
  const effectThink  = thinkLang || (respondLang ? 'en' : '');

  // Resolve paths from env (set by session.cjs) or runtime defaults
  const baseDir    = process.env.PROJECT_ROOT || agentCwd;
  const plansPath  = path.join(baseDir, runtime.paths?.plans || 'plans');
  const docsPath   = path.join(baseDir, runtime.paths?.docs  || 'docs');

  // Build context block
  const lines = [];

  lines.push(`## Subagent: ${agentType}`);
  lines.push(`ID: ${agentId} | CWD: ${agentCwd}`);
  lines.push('');

  // Language section (only if configured)
  const hasThink = effectThink && effectThink !== respondLang;
  if (hasThink || respondLang) {
    lines.push('## Language');
    if (hasThink)   lines.push(`- Thinking: Use ${effectThink} for reasoning.`);
    if (respondLang) lines.push(`- Response: Respond in ${respondLang}.`);
    lines.push('');
  }

  // Python venv (optional — if .claude/skills/.venv exists)
  const venv = resolveVenv(agentCwd);

  // Rules
  lines.push('## Rules');
  lines.push(`- Plans → ${plansPath}/ | Docs → ${docsPath}/`);
  lines.push('- YAGNI · KISS · DRY');
  lines.push('- Be concise. List unresolved questions at end.');
  if (venv) {
    lines.push(`- Python in .claude/skills/: use \`${venv}\``);
    lines.push('- Never use global pip install');
  }

  // Output in Claude Code SubagentStart required format
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SubagentStart',
      additionalContext: lines.join('\n')
    }
  }));

  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'agent', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
