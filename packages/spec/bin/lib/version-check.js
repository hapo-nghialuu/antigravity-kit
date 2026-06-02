/**
 * Version check before install.
 *
 * Reads each platform's cafekit.json to compare the installed version with the
 * incoming one and decides whether to proceed:
 *
 *   same    → info + exit 0 (unless --force-overwrite)
 *   newer   → normal update
 *   older   → downgrade warning + confirm (interactive) or abort (non-interactive)
 *   missing → fresh install, no check needed
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS, packageJson } = require('./context');

/** Simple semver-ish comparison. Returns -1 | 0 | 1. */
function cmpVersion(a, b) {
  const toNum = (v) => String(v).split('.').map((n) => parseInt(n, 10) || 0);
  const [aN, bN] = [toNum(a), toNum(b)];
  for (let i = 0; i < 3; i++) {
    const diff = (aN[i] || 0) - (bN[i] || 0);
    if (diff !== 0) return diff < 0 ? -1 : 1;
  }
  return 0;
}

/**
 * Read the currently installed version for a platform.
 * Returns null if cafekit.json doesn't exist yet (fresh install).
 */
function getInstalledVersion(platformKey) {
  const p = path.join(PLATFORMS[platformKey].folder, 'cafekit.json');
  try {
    if (!fs.existsSync(p)) return null;
    const meta = JSON.parse(fs.readFileSync(p, 'utf8'));
    return typeof meta.version === 'string' ? meta.version : null;
  } catch {
    return null;
  }
}

/**
 * Check versions for all selected platforms and decide whether to proceed.
 * Sets ctx.cancelled on same-version (without --force) or unconfirmed downgrade.
 */
async function checkVersions(ctx) {
  if (ctx.dryRun) return ctx;

  const incoming = packageJson.version;

  for (const key of ctx.platforms) {
    const installed = getInstalledVersion(key);
    if (!installed) continue; // fresh install — no check needed

    const cmp = cmpVersion(installed, incoming);

    // ── Same version ─────────────────────────────────────────────────────────
    if (cmp === 0) {
      if (ctx.options.forceOverwrite) continue; // --force-overwrite overrides
      ctx.ui.info(ctx.t ? ctx.t('versionUpToDate', { v: installed }) : `Already up to date (${installed}). Use --force-overwrite to reinstall.`);
      ctx.cancelled = true;
      return ctx;
    }

    // ── Downgrade ─────────────────────────────────────────────────────────────
    if (cmp > 0) {
      const msg = ctx.t
        ? ctx.t('versionDowngrade', { from: installed, to: incoming })
        : `Downgrading ${installed} → ${incoming}. This may remove features. Continue?`;

      if (!ctx.interactive) {
        ctx.ui.warn ? ctx.ui.warn(`Downgrade detected (${installed} → ${incoming}). Aborted in non-interactive mode. Use --force-overwrite to proceed.`) : console.warn(msg);
        ctx.cancelled = true;
        return ctx;
      }

      const yes = await ctx.ui.confirm({ message: msg, initialValue: false }, false);
      if (!yes || ctx.ui.isCancel(yes)) {
        ctx.cancelled = true;
        return ctx;
      }
    }

    // cmp < 0 → upgrade, proceed normally
  }

  return ctx;
}

module.exports = { getInstalledVersion, cmpVersion, checkVersions };
