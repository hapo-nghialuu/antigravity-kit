/**
 * CafeKit install process lock (P5)
 *
 * Prevents two installer runs (or a run racing another writer) from clobbering
 * the same project. A lock file at the project root holds the owning PID and a
 * timestamp. If a live process owns it, a second run refuses; if the owner is
 * dead (stale lock), it is reclaimed.
 *
 * Pure module: no console output, no process control. Returns structured
 * results; the orchestrator decides what to log and whether to exit.
 */

const fs = require('fs');
const path = require('path');

const LOCK_FILE = '.cafekit.lock';

/**
 * Check whether a PID belongs to a live process. `process.kill(pid, 0)` sends
 * no signal but throws ESRCH if the process does not exist.
 */
function isProcessAlive(pid) {
  if (!pid || typeof pid !== 'number') return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    // EPERM → process exists but we can't signal it → still alive.
    return err.code === 'EPERM';
  }
}

/**
 * Attempt to acquire the lock.
 *
 * @param {string} cwd  project root (defaults to process.cwd())
 * @returns {{acquired: boolean, reason?: string, pid?: number, since?: string, reclaimed?: boolean}}
 *   acquired:false + reason:'held' → another live process owns it (pid/since set)
 *   acquired:true, reclaimed:true  → a stale lock was taken over
 */
function acquire(cwd = process.cwd()) {
  const lockPath = path.join(cwd, LOCK_FILE);
  let reclaimed = false;

  if (fs.existsSync(lockPath)) {
    let info = {};
    try {
      info = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    } catch {
      info = {};
    }

    if (isProcessAlive(info.pid)) {
      return { acquired: false, reason: 'held', pid: info.pid, since: info.since };
    }
    // Stale lock from a dead process — safe to reclaim.
    reclaimed = true;
  }

  const payload = { pid: process.pid, since: new Date().toISOString() };
  fs.writeFileSync(lockPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return { acquired: true, reclaimed };
}

/**
 * Release the lock if (and only if) this process owns it. Safe to call in a
 * finally block even when acquire() failed.
 */
function release(cwd = process.cwd()) {
  const lockPath = path.join(cwd, LOCK_FILE);
  if (!fs.existsSync(lockPath)) return;
  try {
    const info = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    if (info.pid && info.pid !== process.pid) return; // not ours, leave it
  } catch {
    // Unreadable lock — fall through and remove it.
  }
  fs.rmSync(lockPath, { force: true });
}

module.exports = {
  LOCK_FILE,
  isProcessAlive,
  acquire,
  release
};
