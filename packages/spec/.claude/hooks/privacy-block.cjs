#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * PreToolUse Hook — privacy-block.cjs
 *
 * Claude Code CLI privacy gate for sensitive files.
 *
 * Runtime contract:
 * - Non-bash file access to sensitive files is blocked with a JSON marker
 * - Assistant must use AskUserQuestion with that JSON payload
 * - If user approves, assistant should read via `bash cat "file"`
 * - Bash access is allowed with a warning to enable the approved follow-up path
 *
 * Exit: 0 = allow, 2 = block
 */

try {
  const fs = require('fs');
  const path = require('path');

  const RESTRICTED_PATTERNS = [
    /^\.env(\.|$)/i,
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

  function extractBashPaths(command) {
    const paths = [];
    const regex = /(?:cat|less|more|head|tail|source|\.)\s+(?:"([^"]+)"|'([^']+)'|([^\s]+))/g;
    let match;
    while ((match = regex.exec(command)) !== null) {
      paths.push(match[1] || match[2] || match[3]);
    }
    return paths;
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

  function formatBlockMessage(filePath) {
    const basename = path.basename(filePath);
    const promptData = {
      type: 'PRIVACY_PROMPT',
      file: filePath,
      basename,
      question: {
        header: 'File Access',
        text: `I need to read "${basename}" which may contain sensitive data (API keys, passwords, tokens). Do you approve?`,
        options: [
          {
            label: 'Yes, approve access',
            description: `Allow reading ${basename} this time`
          },
          {
            label: 'No, skip this file',
            description: 'Continue without accessing this file'
          }
        ]
      }
    };

    return [
      'NOTE: This is not an error. This block protects sensitive data.',
      '',
      `PRIVACY BLOCK: Sensitive file access requires user approval`,
      `File: ${filePath}`,
      '',
      '@@PRIVACY_PROMPT_START@@',
      JSON.stringify(promptData, null, 2),
      '@@PRIVACY_PROMPT_END@@',
      '',
      'Claude Code follow-up:',
      `- If approved: use bash to read: cat "${filePath}"`,
      '- If denied: continue without this file'
    ].join('\n');
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
    if (isSafe(filePath)) continue;
    if (!isSensitive(filePath)) continue;

    if (toolName === 'Bash') {
      console.error(`WARN: Privacy-sensitive file access via bash allowed for approved follow-up: ${path.basename(filePath)}`);
      process.exit(0);
    }

    console.error(formatBlockMessage(filePath));
    process.exit(2);
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
