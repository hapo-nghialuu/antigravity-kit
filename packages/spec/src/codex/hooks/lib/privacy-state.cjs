'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const TTL_MS = 5 * 60 * 1000;
const APPROVAL_PREFIX = 'APPROVE CAFEKIT PRIVACY ';
function stateDir(projectRoot) {
  return path.join(projectRoot, '.codex', 'hooks', '.privacy');
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

function atomicWrite(file, payload) {
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const temp = `${file}.${process.pid}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(payload)}\n`, { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(temp, file);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function cleanup(projectRoot, now = Date.now()) {
  const dir = stateDir(projectRoot);
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (!/^(pending|token)-[a-f0-9]+\.json$/.test(name)) continue;
    const file = path.join(dir, name);
    const record = readJson(file);
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
  const dir = stateDir(projectRoot);
  try {
    if (!fs.existsSync(dir)) return;
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
  atomicWrite(path.join(stateDir(projectRoot), `pending-${requestId}.json`), record);
  return record;
}

function approvePending({ projectRoot, sessionId, requestId }) {
  cleanup(projectRoot);
  if (!sessionId) return { ok: false, reason: 'session' };
  if (!/^[a-f0-9]{24}$/.test(requestId)) return { ok: false, reason: 'invalid' };

  const pendingFile = path.join(stateDir(projectRoot), `pending-${requestId}.json`);
  const record = readJson(pendingFile);
  if (!record) return { ok: false, reason: 'missing' };
  if (record.sessionId !== String(sessionId || '')) return { ok: false, reason: 'session' };
  if (Number(record.expiresAt) <= Date.now()) return { ok: false, reason: 'expired' };

  try {
    fs.unlinkSync(pendingFile);
  } catch {
    return { ok: false, reason: 'consumed' };
  }

  atomicWrite(path.join(stateDir(projectRoot), `token-${requestId}.json`), {
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
  const dir = stateDir(projectRoot);
  if (!fs.existsSync(dir)) return false;
  const paths = requestPaths(filePaths, filePath);
  if (paths.length === 0) return false;
  const expectedPaths = requestPathKeys(paths, sessionCwd);

  for (const name of fs.readdirSync(dir)) {
    if (!/^token-[a-f0-9]{24}\.json$/.test(name)) continue;
    const tokenFile = path.join(dir, name);
    const token = readJson(tokenFile);
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
