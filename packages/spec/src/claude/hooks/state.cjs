#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * Multi-event Hook — state.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Persists and restores session progress across Claude Code sessions.
 *
 * Events:
 *   SessionStart  → load previous state and print to context
 *   Stop          → extract todos + git changes, save to latest.md
 *   SubagentStop  → append agent completion note to current state
 *
 * Storage: .claude/session-state/latest.md (+ archive/)
 * Safety:  atomic writes, 7-day expiry, max 5 archives
 *
 * Exit: 0 always (fail-open)
 */

try {
  const fs     = require('fs');
  const path   = require('path');
  const os     = require('os');
  const crypto = require('crypto');
  const { execSync } = require('child_process');

  const EXPIRY_DAYS  = 7;
  const MAX_ARCHIVES = 5;

  // ── Storage ───────────────────────────────────────────────────────────────

  function stateDir(cwd) {
    try {
      const local = path.join(cwd, '.claude', 'session-state');
      if (fs.existsSync(path.join(cwd, '.claude'))) {
        if (!fs.existsSync(local)) fs.mkdirSync(local, { recursive: true });
        return local;
      }
      const hash   = crypto.createHash('md5').update(cwd).digest('hex').slice(0, 12);
      const global = path.join(os.homedir(), '.claude', 'session-states', hash);
      if (!fs.existsSync(global)) fs.mkdirSync(global, { recursive: true });
      return global;
    } catch { return null; }
  }

  function loadLatest(cwd) {
    try {
      const dir   = stateDir(cwd);
      if (!dir) return null;
      const file  = path.join(dir, 'latest.md');
      if (!fs.existsSync(file)) return null;
      const text  = fs.readFileSync(file, 'utf8');
      const tsMatch = text.match(/<!-- Generated: (.+?) -->/);
      if (tsMatch) {
        const parsed = new Date(tsMatch[1]).getTime();
        if (isNaN(parsed)) return null;
        if (Date.now() - parsed > EXPIRY_DAYS * 24 * 60 * 60 * 1000) return null;
      }
      return text;
    } catch { return null; }
  }

  function writeAtomic(filePath, content) {
    const tmp = `${filePath}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
    fs.writeFileSync(tmp, content);
    fs.renameSync(tmp, filePath);
  }

  function archive(dir) {
    try {
      const src  = path.join(dir, 'latest.md');
      if (!fs.existsSync(src)) return;
      const aDir = path.join(dir, 'archive');
      if (!fs.existsSync(aDir)) fs.mkdirSync(aDir);
      const now  = new Date();
      const pad  = n => String(n).padStart(2, '0');
      const ts   = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
      fs.copyFileSync(src, path.join(aDir, `${ts}.md`));
      const files = fs.readdirSync(aDir).filter(f => f.endsWith('.md')).sort();
      while (files.length > MAX_ARCHIVES) {
        try { fs.unlinkSync(path.join(aDir, files.shift())); } catch { /* ignore */ }
      }
    } catch { /* fail-open */ }
  }

  // ── Data extraction ───────────────────────────────────────────────────────

  function extractSessionData(stdinData) {
    const data = {
      timestamp: new Date().toISOString(),
      branch: process.env.GIT_BRANCH || '',
      todos: [],
      modifiedFiles: []
    };

    if (stdinData.transcript_path && fs.existsSync(stdinData.transcript_path)) {
      try {
        const latest = [];
        const lines  = fs.readFileSync(stdinData.transcript_path, 'utf8').split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const entry = JSON.parse(line);
            const blocks = entry.message?.content;
            if (!Array.isArray(blocks)) continue;
            for (const b of blocks) {
              if (b.type === 'tool_use' && b.name === 'TodoWrite' && Array.isArray(b.input?.todos)) {
                latest.length = 0;
                latest.push(...b.input.todos);
              }
            }
          } catch { /* skip bad lines */ }
        }
        data.todos = latest;
      } catch { /* ignore */ }
    }

    try {
      const out = execSync('git diff --name-only HEAD', {
        encoding: 'utf8', timeout: 3000, stdio: ['pipe','pipe','pipe']
      }).trim();
      if (out) data.modifiedFiles = out.split('\n').slice(0, 20);
    } catch { /* ignore */ }

    return data;
  }

  // ── Markdown builder ──────────────────────────────────────────────────────

  function buildStateContent(data) {
    const done    = data.todos.filter(t => t.status === 'completed');
    const pending = data.todos.filter(t => t.status !== 'completed');
    return [
      '# Session State',
      `<!-- Generated: ${data.timestamp} -->`,
      `<!-- Branch: ${data.branch || 'unknown'} -->`,
      '',
      '## What Worked (Verified)',
      ...(done.length    ? done.map(t => `- ${t.content}`)    : ['- (No completed tasks recorded)']),
      '',
      "## What's Left",
      ...(pending.length ? pending.map(t => `- [ ] ${t.content}`) : ['- (All tasks completed)']),
      '',
      '## Key Files Modified',
      ...(data.modifiedFiles.length   ? data.modifiedFiles.map(f => `- ${f}`) : ['- (No file changes detected)']),
      ''
    ].join('\n');
  }

  function buildAgentSection(data) {
    const type = data.agent_type || 'unknown';
    const ts   = new Date().toISOString().slice(11, 19);
    return `\n## Agent Result: ${type} (${ts})\n- Completed at ${ts}\n`;
  }

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin   = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const data  = JSON.parse(stdin);
  const event = data.hook_event_name || '';
  const cwd   = data.cwd || process.cwd();
  const dir   = stateDir(cwd);

  // SessionStart: restore previous state
  if (event === 'SessionStart') {
    const prev = loadLatest(cwd);
    if (prev) {
      console.log('\n=== Prior Execution Context ===');
      console.log(prev.trim());
      console.log('=== End of Prior Context ===\n');
    }
    process.exit(0);
  }

  // SubagentStop: append completion note
  if (event === 'SubagentStop' && dir) {
    const file    = path.join(dir, 'latest.md');
    const agentSection = buildAgentSection(data);
    const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    let updated;
    if (existing) {
      updated = existing.replace(/(\n## Key Files Modified)/, `\n${agentSection}$1`);
      if (updated === existing) updated = existing.trimEnd() + '\n' + agentSection;
    } else {
      updated = buildStateContent(extractSessionData(data)) + '\n' + agentSection;
    }
    writeAtomic(file, updated);
    process.exit(0);
  }

  // Stop: persist full state
  if (event === 'Stop' && dir) {
    const file    = path.join(dir, 'latest.md');
    const sessionData = extractSessionData(data);
    let content = buildStateContent(sessionData);

    // Preserve agent sections from SubagentStop
    if (fs.existsSync(file)) {
      const existing = fs.readFileSync(file, 'utf8');
      const agentMatches = existing.match(/## Agent Result:.+?(?=\n## |$)/gs);
      if (agentMatches) {
        content = content.replace(
          /(\n## Key Files Modified)/,
          `\n${agentMatches.join('\n')}$1`
        );
      }
    }

    writeAtomic(file, content);
    archive(dir);
    process.exit(0);
  }

  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'state', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
