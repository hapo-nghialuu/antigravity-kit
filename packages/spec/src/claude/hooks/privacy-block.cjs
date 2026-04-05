#!/usr/bin/env node
/**
 * Copyright (c) 2024-2025 Haposoft. MIT License.
 *
 * PreToolUse Hook — privacy-block.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Blocks access to sensitive files unless the user explicitly approves.
 *
 * Approval flow:
 *   1. Hook blocks with exit(2) and shows a prompt
 *   2. Claude Code asks user for approval
 *   3. User approves → Claude retries with "APPROVED:" prefix
 *   4. Hook detects prefix → allows through
 *
 * Disable: set "privacyBlock": false in .claude/runtime.json
 *
 * Exit: 0 = allow, 2 = block
 */

try {
  const fs   = require('fs');
  const path = require('path');

  // Sensitive file patterns — matched against basename and full path
  const RESTRICTED_PATTERNS = [
    /^\.env(\.|$)/i,                  // .env, .env.local, .env.production …
    /^credentials/i,                  // credentials.json, aws-credentials …
    /secrets?\.(ya?ml|json)$/i,       // secrets.yaml, secret.json
    /\.pem$/i,                        // TLS certificates
    /\.key$/i,                        // Private keys
    /\.p12$/i,                        // PKCS12 bundles
    /\.pfx$/i,                        // PFX bundles
    /^id_(rsa|ed25519|ecdsa|dsa)$/i,  // SSH private keys
    /\.netrc$/i,                      // Network credentials
    /\.pgpass$/i,                     // PostgreSQL passwords
    /kubeconfig/i,                    // Kubernetes config
    /\.keystore$/i,                   // Java / Android keystores
    /\.jks$/i,                        // Java KeyStore
    /auth\.json$/i,                   // OAuth tokens
    /token(s)?\.json$/i,              // Token files
  ];

  // Safe exceptions — these always pass through (example / template files)
  const ALLOWED_EXEMPTIONS = [
    /\.env\.(example|sample|template|test)$/i,
  ];

  function isSafe(p)      { const b = path.basename(p); return ALLOWED_EXEMPTIONS.some(r => r.test(b) || r.test(p)); }
  function isSensitive(p) { const b = path.basename(p); return RESTRICTED_PATTERNS.some(r => r.test(b) || r.test(p)); }

  /** Extract file paths from various tool inputs */
  function extractPaths(toolName, input) {
    const out = [];
    if (!input) return out;
    if (input.file_path) out.push(input.file_path);
    if (input.path)      out.push(input.path);
    // Bash: look for cat/less/head/tail etc.
    if (typeof input.command === 'string') {
      const m = input.command.match(/(?:cat|less|more|head|tail|source|\.)\s+(\S+)/g);
      if (m) m.forEach(s => out.push(s.trim().split(/\s+/).pop()));
    }
    return out.filter(Boolean);
  }

  /** True if the user prompt contains an APPROVED: prefix */
  function approved(prompt) {
    return typeof prompt === 'string' && prompt.includes('APPROVED:');
  }

  /** Read runtime.json */
  function readRuntime(cwd) {
    try {
      const p = path.join(cwd, '.claude', 'runtime.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
    } catch { return {}; }
  }

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin   = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const data      = JSON.parse(stdin);
  const toolName  = data.tool_name  || '';
  const toolInput = data.tool_input || {};
  const prompt    = data.prompt     || '';
  const cwd       = data.cwd        || process.cwd();
  const runtime   = readRuntime(cwd);

  // Disabled via config
  if (runtime.privacyBlock === false) process.exit(0);

  // Already approved by user
  if (approved(prompt)) process.exit(0);

  const paths = extractPaths(toolName, toolInput);
  if (!paths.length) process.exit(0);

  for (const filePath of paths) {
    if (isSafe(filePath)) continue;
    if (isSensitive(filePath)) {
      console.log(
        `RESTRICTED ACCESS: File protection active — approval required\n` +
        `Target: ${filePath}\n\n` +
        `Retry query with: APPROVED:${filePath}\n\n` +
        `--- RESTRICTED_FILE_PROMPT_BEGIN ---\n` +
        JSON.stringify({ type: 'RESTRICTED_PROMPT', file: filePath, tool: toolName }) + '\n' +
        `--- RESTRICTED_FILE_PROMPT_END ---`
      );
      process.exit(2);
    }
  }

  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'privacy-block', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0); // fail-open
}
