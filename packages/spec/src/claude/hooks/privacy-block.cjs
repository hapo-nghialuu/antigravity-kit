#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * PreToolUse Hook — privacy-block.cjs
 *
 * Claude Code CLI privacy gate for sensitive files.
 *
 * Runtime contract:
 * - Sensitive access returns Claude Code's native PreToolUse "ask" decision
 * - The same decision applies to direct tools and Bash commands
 * - Symlinks are classified by their resolved target before their alias
 *
 * Exit: 0 (the JSON hook output carries the permission decision)
 */

try {
  const fs = require('fs');
  const path = require('path');

  const RESTRICTED_PATTERNS = [
    /^\.env(?:[.\[*?{]|$)/i,
    /^credentials/i,
    /secrets?\.(ya?ml|json)$/i,
    /\.pem$/i,
    /\.key$/i,
    /\.p12$/i,
    /\.pfx$/i,
    /^id_(rsa|ed25519|ecdsa|dsa)$/i,
    /\.netrc$/i,
    /\.pgpass$/i,
    /kubeconfig/i,
    /\.keystore$/i,
    /\.jks$/i,
    /auth\.json$/i,
    /token(s)?\.json$/i
  ];

  const ALLOWED_EXEMPTIONS = [
    /\.env\.(example|sample|template|test)$/i
  ];

  function readRuntime(cwd) {
    try {
      const file = path.join(cwd, '.claude', 'runtime.json');
      return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    } catch {
      return {};
    }
  }

  function isSafe(filePath) {
    const base = path.basename(filePath);
    return ALLOWED_EXEMPTIONS.some((rule) => rule.test(base) || rule.test(filePath));
  }

  function isSensitive(filePath) {
    const base = path.basename(filePath);
    return RESTRICTED_PATTERNS.some((rule) => rule.test(base) || rule.test(filePath));
  }

  /**
   * Resolve a symlink to its real target so a harmless-looking name that points
   * at a sensitive file cannot slip through the basename check. Returns null
   * when the path cannot be resolved (missing file, broken link) — fail-open to
   * the original-path check in that case.
   */
  function resolveTarget(filePath, cwd) {
    try {
      const requested = path.isAbsolute(filePath) ? filePath : path.resolve(cwd, filePath);
      return fs.realpathSync(requested);
    } catch {
      return null;
    }
  }

  function extractBashPaths(command) {
    const paths = new Set();
    // Quotes are delimiters rather than grouped tokens so nested shell
    // commands such as `bash -c 'cat .env'` cannot hide the sensitive path.
    const tokens = command.split(/[\s|;&<>"']+/).filter(Boolean);
    for (const token of tokens) {
      const cleaned = token.replace(/^["'()`]+|["'(),]+$/g, '');
      for (const candidate of cleaned.split('=')) {
        const value = candidate.replace(/^["'()`]+|["'(),]+$/g, '');
        if (value && (isSensitive(value) || isSafe(value))) paths.add(value);
      }
    }
    return [...paths];
  }

  function extractPaths(toolName, input) {
    const paths = [];
    if (!input) return paths;

    for (const key of ['file_path', 'path']) {
      if (typeof input[key] === 'string' && input[key].trim()) {
        paths.push(input[key].trim());
      }
    }

    for (const key of ['paths', 'search_paths']) {
      if (Array.isArray(input[key])) {
        paths.push(...input[key].filter(Boolean));
      }
    }

    if (toolName === 'Bash' && typeof input.command === 'string') {
      paths.push(...extractBashPaths(input.command));
    }

    return paths.filter(Boolean);
  }

  function askForPermission(filePath) {
    const basename = path.basename(filePath);
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'ask',
        permissionDecisionReason: `Sensitive file access requires approval: ${basename}`
      }
    }) + '\n');
  }

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const data = JSON.parse(stdin);
  const toolName = data.tool_name || '';
  const toolInput = data.tool_input || {};
  const cwd = data.cwd || process.cwd();
  const runtime = readRuntime(cwd);

  if (runtime.privacyBlock === false) process.exit(0);

  const paths = extractPaths(toolName, toolInput);
  if (!paths.length) process.exit(0);

  for (const filePath of paths) {
    const target = resolveTarget(filePath, cwd);

    // The real target is authoritative: an exempt-looking alias must not hide
    // a sensitive target, while a real .env.example target remains safe.
    if (target) {
      if (isSensitive(target) && !isSafe(target)) {
        askForPermission(filePath);
        process.exit(0);
      }
      if (isSafe(target)) continue;
    }

    if (isSafe(filePath) || !isSensitive(filePath)) continue;
    askForPermission(filePath);
    process.exit(0);
  }

  process.exit(0);
} catch (error) {
  try {
    const fs = require('fs');
    const path = require('path');
    const logDir = path.join(__dirname, '.logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(
      path.join(logDir, 'hook-log.jsonl'),
      JSON.stringify({
        ts: new Date().toISOString(),
        hook: 'privacy-block',
        status: 'crash',
        error: error.message
      }) + '\n'
    );
  } catch (_) {}
  process.exit(0);
}
