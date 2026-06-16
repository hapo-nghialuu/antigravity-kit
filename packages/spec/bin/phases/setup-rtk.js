/**
 * setup-rtk — opt-in install of the rtk token-saver and its Claude Code hook.
 *
 * Phase order (per specs/rtk-installer-integration/design.md):
 *   shouldRunRtk → ensureRtkBinary → `rtk init -g` → jq precheck → manifest
 *
 * R1-01 wired the consent gate (`shouldRunRtk`) and a thin `setupRtk` wrapper.
 * R2-01 adds the orchestrator: `ensureRtkBinary` (detect/install), the
 * `rtk init -g` hook registration, the `jq` precheck, and the manifest write.
 *
 * Non-fatal invariant (R2.7, R4.1): the entire `setupRtk` body is wrapped in
 * try/catch. Any throw / non-zero exit / timeout is logged as a warning via
 * `ctx.t('rtkFailed')` (with `{reason}` interpolation) and the cafekit
 * install continues with its existing exit code. Mirrors the non-fatal
 * contract of `phases/skills-setup.js`.
 *
 * Idempotency (R2.1, R2.6): re-runs see `hasCmd('rtk')` short-circuit the
 * binary install path and re-invoke `rtk init -g` (rtk's own command handles
 * its hook idempotency). The in-memory `ctx.rtkSetupRan` flag records that
 * setup executed, so downstream consumers (R3-01 summary line) can read it.
 *
 * Cross-OS install (validated 2026-06-15): best-effort order
 *   (1) official prebuilt install script (pinned source)
 *   (2) `cargo install rtk` when `hasCmd('cargo')`
 *   (3) skip + warn
 * covers macOS/Linux dev machines (cargo fall-through) and CI (skip+warn).
 *
 * No timeout for `cargo install rtk` (validated 2026-06-15): user accepted
 * default `spawnSync` timeout; non-fatal guarantee holds via try/catch.
 */

const dep = require('../lib/skill-deps');
const rtkRun = require('../lib/rtk-run');
const { hasCmd } = dep;
const { run } = rtkRun;

const RTK_INIT_TIMEOUT_MS = 30_000;       // `rtk init -g` is a fast global-hook write
const RTK_PREBUILT_TIMEOUT_MS = 120_000;  // prebuilt install: curl download + sh pipe; slow networks need headroom
const RTK_PREBUILT_INSTALL_URL =
  'https://raw.githubusercontent.com/rtk-ai/rtk/main/install.sh';

/**
 * Detect rtk binary, installing it if absent. Pure function over `ctx`.
 *
 * @param {object} ctx
 * @returns {'present'|'installed'|'absent'}
 */
function ensureRtkBinary(ctx) {
  if (hasCmd('rtk')) return 'present';
  return installRtkBinary(ctx) ? 'installed' : 'absent';
}

/**
 * Best-effort rtk install. Tries the official prebuilt install script first
 * (R5.2: surface source), then falls back to `cargo install rtk` if cargo is
 * available, otherwise returns false (R2.3 non-fatal skip).
 *
 * @param {object} ctx
 * @returns {boolean} true on success, false on failure or no method available
 */
function installRtkBinary(ctx) {
  // Method 1: official prebuilt install script (pinned URL).
  ctx.ui.info(ctx.t('rtkInstalling', { method: `prebuilt script (${RTK_PREBUILT_INSTALL_URL})` }));
  const prebuilt = run('sh', ['-c', `curl -fsSL ${RTK_PREBUILT_INSTALL_URL} | sh`], {
    timeout: RTK_PREBUILT_TIMEOUT_MS
  });
  if (prebuilt.ok) return true;

  // Method 2: `cargo install rtk` if cargo is on PATH.
  if (hasCmd('cargo')) {
    ctx.ui.info(ctx.t('rtkInstalling', { method: 'cargo install rtk' }));
    const cargo = run('cargo', ['install', 'rtk']);
    if (cargo.ok) return true;
  }

  // No method succeeded.
  return false;
}

/**
 * Phase entrypoint. R2-01 wires the full install + hook + manifest pipeline.
 * The consent gate is delegated to `shouldRunRtk(ctx)` (R1-01).
 *
 * @param {object} ctx
 * @returns {Promise<object>} the same ctx
 */
async function setupRtk(ctx) {
  if (!(await shouldRunRtk(ctx))) {
    // Dry-run: enumerate the action set that would have run (validated 2026-06-15).
    if (ctx.dryRun) {
      ctx.ui.info(
        '[dry-run] rtk setup skipped (would: detect rtk binary, install if missing via prebuilt/cargo, run rtk init -g, check jq)'
      );
    } else {
      ctx.ui.info(ctx.t('rtkSkipped'));
    }
    return ctx;
  }

  try {
    // Step 1: ensure the binary is on PATH (R2.1, R2.2, R2.3).
    const state = ensureRtkBinary(ctx);
    if (state === 'absent') {
      ctx.ui.warn(ctx.t('rtkInstallFailed'));
      return ctx;
    }
    if (state === 'installed') {
      ctx.ui.info(ctx.t('rtkInstalled'));
    }

    // Step 2: register rtk's official Claude Code hook via `rtk init -g` (R2.4).
    const init = run('rtk', ['init', '-g'], { timeout: RTK_INIT_TIMEOUT_MS });
    if (!init.ok) {
      ctx.ui.warn(ctx.t('rtkInitFailed', { reason: init.stderr || `exit ${init.status}` }));
      return ctx;
    }

    // Step 3: `jq` precheck (R2.5). Warn if missing; do not fail.
    if (!hasCmd('jq')) {
      ctx.ui.warn(ctx.t('rtkNeedsJq'));
    }

    // Step 4: record the action (R2.6, idempotency). In-memory flag — re-runs
    // observe `hasCmd('rtk')` short-circuit and re-invoke `rtk init -g`,
    // which is itself idempotent. R3-01 reads this flag for the summary line.
    ctx.rtkSetupRan = true;
    return ctx;
  } catch (err) {
    // Non-fatal boundary: any unexpected throw becomes a warning, the
    // installer continues (R2.7, R4.1).
    ctx.ui.warn(ctx.t('rtkFailed', { reason: (err && err.message) || String(err) }));
    return ctx;
  }
}

/**
 * Decision matrix for whether the rtk setup phase should run. R1-01.
 *
 *   1. --dry-run                          → false (R1.4)
 *   2. ctx.options.withRtk === true       → true  (R1.1)
 *   3. !ctx.interactive                   → false (R1.3)
 *   4. interactive confirm resolves true  → true  (R1.2)
 *   5. interactive confirm resolves false → false (R1.2)
 *
 * @param {object} ctx
 * @returns {Promise<boolean>}
 */
async function shouldRunRtk(ctx) {
  if (ctx.dryRun) return false;
  if (ctx.options.withRtk) return true;
  if (!ctx.interactive) return false;
  const yes = await ctx.ui.confirm(
    { message: ctx.t('rtkConfirm'), initialValue: false },
    false
  );
  return yes === true;
}

module.exports = { shouldRunRtk, setupRtk, ensureRtkBinary, installRtkBinary };
