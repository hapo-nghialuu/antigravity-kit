#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * SessionStart Hook — session.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Fires once per session (startup, resume, clear, compact).
 * Detects project environment and writes context to CLAUDE_ENV_FILE.
 *
 * Exit: 0 always (fail-open)
 */

try {
  const fs   = require('fs');
  const path = require('path');
  const os   = require('os');
  const { execSync } = require('child_process');

  // ── Utilities ─────────────────────────────────────────────────────────────

  /** Run a shell command safely, return stdout or fallback */
  function run(cmd, fallback = '') {
    try {
      return execSync(cmd, {
        encoding: 'utf8', timeout: 3000,
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim();
    } catch { return fallback; }
  }

  /** Write a key=value export line to CLAUDE_ENV_FILE */
  function writeEnv(file, key, value) {
    if (!file) return;
    try {
      const safe = String(value ?? '').replace(/"/g, '\\"');
      fs.appendFileSync(file, `export ${key}="${safe}"\n`);
    } catch { /* fail-open */ }
  }

  /** Read .claude/runtime.json config */
  function readRuntime(cwd) {
    try {
      const p = path.join(cwd, '.claude', 'runtime.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
    } catch { return {}; }
  }

  // ── Project Detection ──────────────────────────────────────────────────────

  function detectProjectType() {
    const cwd = process.cwd();
    if (fs.existsSync(path.join(cwd, 'pnpm-workspace.yaml')) ||
        fs.existsSync(path.join(cwd, 'lerna.json'))) return 'monorepo';
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
      if (pkg.workspaces) return 'monorepo';
      if (pkg.main || pkg.exports || pkg.module) return 'library';
    } catch { /* ignore */ }
    return 'app';
  }

  function detectPackageManager() {
    const cwd = process.cwd();
    if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml')))  return 'pnpm';
    if (fs.existsSync(path.join(cwd, 'yarn.lock')))        return 'yarn';
    if (fs.existsSync(path.join(cwd, 'bun.lockb')))        return 'bun';
    if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm';
    return '';
  }

  function detectFramework() {
    try {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
      );
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['next'])        return 'next';
      if (deps['nuxt'])        return 'nuxt';
      if (deps['@sveltejs/kit']) return 'sveltekit';
      if (deps['react'])       return 'react';
      if (deps['vue'])         return 'vue';
      if (deps['svelte'])      return 'svelte';
      if (deps['express'])     return 'express';
      if (deps['fastify'])     return 'fastify';
      if (deps['hono'])        return 'hono';
    } catch { /* ignore */ }
    return '';
  }

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin   = fs.readFileSync(0, 'utf8').trim();
  const payload = stdin ? JSON.parse(stdin) : {};
  const source  = payload.source || 'unknown';
  const envFile = process.env.CLAUDE_ENV_FILE;
  const cwd     = process.cwd();
  const runtime = readRuntime(cwd);

  // Project detection
  const projectType = runtime.project?.type !== 'auto'
    ? (runtime.project?.type || detectProjectType())
    : detectProjectType();

  const packageManager = runtime.project?.packageManager !== 'auto'
    ? (runtime.project?.packageManager || detectPackageManager())
    : detectPackageManager();

  const framework = runtime.project?.framework !== 'auto'
    ? (runtime.project?.framework || detectFramework())
    : detectFramework();

  // Static environment
  const gitBranch  = run('git branch --show-current');
  const gitUrl     = run('git remote get-url origin');
  const gitRoot    = run('git rev-parse --show-toplevel');
  const nodeVer    = process.version;
  const pythonVer  = run('python3 --version') || run('python --version');
  const user       = process.env.USERNAME || process.env.USER
                     || process.env.LOGNAME || os.userInfo().username;
  const timezone   = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Write env vars (no prefix — descriptive names only)
  if (envFile) {
    writeEnv(envFile, 'PROJECT_TYPE',    projectType);
    writeEnv(envFile, 'PACKAGE_MANAGER', packageManager);
    writeEnv(envFile, 'FRAMEWORK',       framework);
    writeEnv(envFile, 'GIT_BRANCH',      gitBranch);
    writeEnv(envFile, 'GIT_URL',         gitUrl);
    writeEnv(envFile, 'GIT_ROOT',        gitRoot);
    writeEnv(envFile, 'NODE_VERSION',    nodeVer);
    writeEnv(envFile, 'PYTHON_VERSION',  pythonVer);
    writeEnv(envFile, 'OS_PLATFORM',     process.platform);
    writeEnv(envFile, 'PROJECT_ROOT',    cwd);
    writeEnv(envFile, 'CLAUDE_USER',     user);
    writeEnv(envFile, 'TIMEZONE',        timezone);
    writeEnv(envFile, 'LOCALE',          process.env.LANG || '');
  }

  // Session summary
  const parts = [];
  if (projectType)    parts.push(`Type: ${projectType}`);
  if (packageManager) parts.push(`PM: ${packageManager}`);
  if (framework)      parts.push(`Framework: ${framework}`);
  if (gitBranch)      parts.push(`Branch: ${gitBranch}`);

  console.log(`Session ${source}. ${parts.length ? parts.join(' | ') : 'No project info detected.'}`);

  // Compact warning — context compaction can lose pending approval state
  if (source === 'compact') {
    console.log('\n🚨 SESSION COMPRESSED — VERIFY PENDING AUTHORIZATIONS:');
    console.log('Any pending confirmations requested via AskUserQuestion might have been lost.');
    console.log('Do not proceed without explicitly asking the user again to ensure safety.');
    console.log('Use AskUserQuestion: "The chat context was compressed. Do I still have permission to proceed?"');
  }

  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'session', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
