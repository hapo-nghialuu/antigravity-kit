/**
 * CafeKit install backup / rollback (P2)
 *
 * Snapshots platform folders before any writes so a mid-install crash can be
 * rolled back to the pre-run state. Snapshots live under
 * `.cafekit-backup/<runId>/` at the project root and are pruned to the most
 * recent few on success.
 *
 * Pure module: no console output, no process control. The orchestrator decides
 * when to snapshot, restore, and prune, and what to log.
 */

const fs = require('fs');
const path = require('path');

const BACKUP_ROOT = '.cafekit-backup';

/**
 * Recursively copy a directory tree (verbatim, no transforms). Used for
 * snapshot and restore. Skips if the source does not exist.
 */
function copyTree(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyTree(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    // Preserve restrictive perms (e.g. .env at 0o600) on the backup copy.
    try {
      fs.chmodSync(dest, stat.mode);
    } catch {
      /* best-effort: chmod may fail on some filesystems */
    }
  }
}

/**
 * Snapshot the given platform folders (relative to cwd, e.g. ['.claude']).
 * Only existing folders are captured. Returns the backup directory path, or
 * null if nothing existed to back up (fresh install → no rollback target).
 *
 * @param {string[]} folders
 * @param {string} runId  unique id for this run (timestamp-based)
 */
function snapshot(folders, runId) {
  const existing = folders.filter((f) => fs.existsSync(f));
  if (existing.length === 0) return null;

  const backupDir = path.join(BACKUP_ROOT, runId);
  fs.mkdirSync(backupDir, { recursive: true });

  for (const folder of existing) {
    copyTree(folder, path.join(backupDir, folder));
  }

  return backupDir;
}

/**
 * Restore a snapshot back over the working tree. For each captured folder we
 * remove the current (possibly half-written) copy and replace it with the
 * snapshot, returning the tree to its pre-run state.
 *
 * @param {string} backupDir  path returned by snapshot()
 */
function restore(backupDir) {
  if (!backupDir || !fs.existsSync(backupDir)) return;

  for (const folder of fs.readdirSync(backupDir)) {
    const target = folder; // backup mirrors cwd-relative folder names
    const source = path.join(backupDir, folder);
    fs.rmSync(target, { recursive: true, force: true });
    copyTree(source, target);
  }
}

/**
 * Keep only the most recent `keepN` backups; delete older ones. Backups sort
 * lexicographically by runId, which is timestamp-prefixed so newest sorts last.
 */
function prune(keepN = 3) {
  if (!fs.existsSync(BACKUP_ROOT)) return;

  const dirs = fs
    .readdirSync(BACKUP_ROOT)
    .filter((name) => {
      try {
        return fs.statSync(path.join(BACKUP_ROOT, name)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort();

  const toRemove = dirs.slice(0, Math.max(0, dirs.length - keepN));
  for (const name of toRemove) {
    fs.rmSync(path.join(BACKUP_ROOT, name), { recursive: true, force: true });
  }
}

module.exports = {
  BACKUP_ROOT,
  snapshot,
  restore,
  prune
};
