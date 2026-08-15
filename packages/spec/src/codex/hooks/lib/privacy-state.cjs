'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const PATH_SAFETY = require('./runtime-path-safety.cjs');

const TTL_MS = 5 * 60 * 1000;
const APPROVAL_PREFIX = 'APPROVE CAFEKIT PRIVACY ';
function stateDir(projectRoot) {
  return path.join(projectRoot, '.codex', 'hooks', '.privacy');
}
function secureStateDir(projectRoot, create = false) {
  const root = PATH_SAFETY.canonicalDirectory(projectRoot, 'privacy project root');
  const hooks = path.join(root, '.codex', 'hooks');
  try { PATH_SAFETY.assertComponentPath(root, hooks); }
  catch (error) {
    if (!create && error.code === 'ENOENT') return null;
    throw error;
  }
  const dir = path.join(hooks, '.privacy');
  if (create && !fs.existsSync(dir)) fs.mkdirSync(dir, { mode: 0o700 });
  try { PATH_SAFETY.assertComponentPath(root, dir); }
  catch (error) {
    if (!create && error.code === 'ENOENT') return null;
    throw error;
  }
  if (!fs.lstatSync(dir).isDirectory()) throw new Error('privacy state must be a regular directory');
  return dir;
}
function hash(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}
function pathKey(filePath, sessionCwd) {
  const requested = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(sessionCwd, filePath);
  let target = requested;
  try {
    target = fs.realpathSync(requested);
  } catch {
    // Missing or virtual paths are still bound to their normalized request path.
  }
  return hash(path.normalize(target));
}
function requestPaths(filePaths, filePath) {
  const values = Array.isArray(filePaths) ? filePaths : [filePath];
  return [...new Set(values.filter((value) => typeof value === 'string' && value.trim()))];
}
function requestPathKeys(filePaths, sessionCwd) {
  return [...new Set(filePaths.map((filePath) => pathKey(filePath, sessionCwd)))].sort();
}
function samePathKeys(left, right) {
  return Array.isArray(left)
    && left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function displayNames(filePaths) {
  const names = [...new Set(filePaths.map((filePath) => path.basename(filePath)))].sort();
  return names.length <= 3
    ? names.join(', ')
    : `${names.slice(0, 3).join(', ')} (+${names.length - 3} more)`;
}

function atomicWrite(dir, file, payload) {
  PATH_SAFETY.assertComponentPath(dir, path.dirname(file));
  const temp = `${file}.${process.pid}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(payload)}\n`, { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(temp, file);
}

function readJson(dir, file) {
  try {
    PATH_SAFETY.assertComponentPath(dir, file);
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function cleanup(projectRoot, now = Date.now()) {
  const dir = secureStateDir(projectRoot);
  if (!dir) return;
  for (const name of fs.readdirSync(dir)) {
    if (!/^(pending|token)-[a-f0-9]+\.json$/.test(name)) continue;
    const file = path.join(dir, name);
    const record = readJson(dir, file);
    if (!record || Number(record.expiresAt) <= now) {
      try {
        fs.unlinkSync(file);
      } catch {
        // Another hook may have consumed it.
      }
    }
  }
}

function clearState(projectRoot) {
  try {
    const dir = secureStateDir(projectRoot);
    if (!dir) return;
    for (const name of fs.readdirSync(dir)) {
      if (/^(pending|token)-[a-f0-9]+\.json$/.test(name)) {
        try { fs.unlinkSync(path.join(dir, name)); } catch { /* concurrently consumed */ }
      }
    }
  } catch {
    // Session boundaries invalidate best-effort state without blocking startup.
  }
}

function createPending({
  projectRoot,
  sessionCwd,
  sessionId,
  filePaths,
  filePath,
  toolName
}) {
  cleanup(projectRoot);
  if (!sessionId) throw new Error('A Codex session ID is required');
  const paths = requestPaths(filePaths, filePath);
  if (paths.length === 0) throw new Error('At least one sensitive path is required');
  const requestId = crypto.randomBytes(12).toString('hex');
  const record = {
    version: 2,
    requestId,
    sessionId: String(sessionId || ''),
    pathKeys: requestPathKeys(paths, sessionCwd),
    displayName: displayNames(paths),
    toolName: String(toolName || ''),
    expiresAt: Date.now() + TTL_MS
  };
  const dir = secureStateDir(projectRoot, true);
  atomicWrite(dir, path.join(dir, `pending-${requestId}.json`), record);
  return record;
}

function approvePending({ projectRoot, sessionId, requestId }) {
  cleanup(projectRoot);
  if (!sessionId) return { ok: false, reason: 'session' };
  if (!/^[a-f0-9]{24}$/.test(requestId)) return { ok: false, reason: 'invalid' };

  const dir = secureStateDir(projectRoot);
  if (!dir) return { ok: false, reason: 'missing' };
  const pendingFile = path.join(dir, `pending-${requestId}.json`);
  const record = readJson(dir, pendingFile);
  if (!record) return { ok: false, reason: 'missing' };
  if (record.sessionId !== String(sessionId || '')) return { ok: false, reason: 'session' };
  if (Number(record.expiresAt) <= Date.now()) return { ok: false, reason: 'expired' };

  try {
    fs.unlinkSync(pendingFile);
  } catch {
    return { ok: false, reason: 'consumed' };
  }

  atomicWrite(dir, path.join(dir, `token-${requestId}.json`), {
    version: 2,
    requestId,
    sessionId: record.sessionId,
    pathKeys: record.pathKeys,
    toolName: record.toolName,
    expiresAt: Math.min(record.expiresAt, Date.now() + TTL_MS)
  });
  return { ok: true, displayName: record.displayName };
}

function consumeToken({
  projectRoot,
  sessionCwd,
  sessionId,
  filePaths,
  filePath,
  toolName
}) {
  cleanup(projectRoot);
  if (!sessionId) return false;
  const dir = secureStateDir(projectRoot);
  if (!dir) return false;
  const paths = requestPaths(filePaths, filePath);
  if (paths.length === 0) return false;
  const expectedPaths = requestPathKeys(paths, sessionCwd);

  for (const name of fs.readdirSync(dir)) {
    if (!/^token-[a-f0-9]{24}\.json$/.test(name)) continue;
    const tokenFile = path.join(dir, name);
    const token = readJson(dir, tokenFile);
    if (
      !token ||
      token.sessionId !== String(sessionId || '') ||
      !samePathKeys(token.pathKeys, expectedPaths) ||
      token.toolName !== String(toolName || '') ||
      Number(token.expiresAt) <= Date.now()
    ) {
      continue;
    }

    const claimed = `${tokenFile}.claimed-${process.pid}-${crypto.randomBytes(4).toString('hex')}`;
    try {
      fs.renameSync(tokenFile, claimed);
      fs.unlinkSync(claimed);
      return true;
    } catch {
      // Only one concurrent tool invocation can rename and consume this token.
    }
  }
  return false;
}

module.exports = {
  APPROVAL_PREFIX,
  TTL_MS,
  pathKey,
  createPending,
  approvePending,
  consumeToken,
  cleanup,
  clearState
};
