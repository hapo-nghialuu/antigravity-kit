'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Installed layout: <project>/.codex/hooks/lib/hook-context.cjs
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');

function readPayload() {
  const raw = fs.readFileSync(0, 'utf8').trim();
  return raw ? JSON.parse(raw) : null;
}

function resolveSessionCwd(payload) {
  const value = typeof payload?.cwd === 'string' ? payload.cwd.trim() : '';
  const resolved = value
    ? path.resolve(process.cwd(), value)
    : process.cwd();
  try {
    return fs.realpathSync(resolved);
  } catch {
    return resolved;
  }
}

function readRuntime(projectRoot = PROJECT_ROOT) {
  try {
    const file = path.join(projectRoot, '.codex', 'runtime.json');
    return fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf8'))
      : {};
  } catch {
    return {};
  }
}

function getHookContext(payload) {
  return {
    projectRoot: PROJECT_ROOT,
    sessionCwd: resolveSessionCwd(payload),
    runtime: readRuntime(PROJECT_ROOT)
  };
}

function resolveProjectPath(projectRoot, configuredPath, fallback) {
  const requested = typeof configuredPath === 'string' && configuredPath.trim()
    ? configuredPath.trim()
    : fallback;
  const resolved = path.resolve(projectRoot, requested);
  const relative = path.relative(projectRoot, resolved);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
    ? resolved
    : path.resolve(projectRoot, fallback);
}

function atomicWrite(file, content, mode = 0o600) {
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  const suffix = `${process.pid}-${crypto.randomBytes(6).toString('hex')}`;
  const temp = `${file}.${suffix}.tmp`;
  fs.writeFileSync(temp, content, { encoding: 'utf8', mode });
  fs.renameSync(temp, file);
}

function logCrash(hook, error) {
  try {
    const dir = path.join(PROJECT_ROOT, '.codex', 'hooks', '.logs');
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(
      path.join(dir, 'hook-log.jsonl'),
      `${JSON.stringify({
        ts: new Date().toISOString(),
        hook,
        status: 'crash',
        error: String(error?.message || error)
      })}\n`
    );
  } catch {
    // Hook failures remain fail-open unless the hook explicitly denies.
  }
}

module.exports = {
  PROJECT_ROOT,
  atomicWrite,
  getHookContext,
  logCrash,
  readPayload,
  readRuntime,
  resolveProjectPath,
  resolveSessionCwd
};
