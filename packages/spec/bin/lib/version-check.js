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
const { fetchRecentVersions } = require('./registry');

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
 * Sets ctx.isUpdate = true when upgrading from an older version.
 * Shows interactive prompt when version differs, asking user what to do.
 */
async function checkVersions(ctx) {
  if (ctx.dryRun) return ctx;

  const incoming = packageJson.version;
  const platformsWithInstall = [];

  for (const key of ctx.platforms) {
    const installed = getInstalledVersion(key);
    if (installed) {
      platformsWithInstall.push({ key, installed });
    }
  }

  // All fresh installs - skip version check, proceed normally
  if (platformsWithInstall.length === 0) {
    ctx.isUpdate = false;
    return ctx;
  }

  // Get unique versions across all platforms
  const uniqueVersions = [...new Set(platformsWithInstall.map(p => p.installed))];
  const installedVersion = uniqueVersions.length === 1 ? uniqueVersions[0] : `${uniqueVersions.join(', ')}`;

  // Determine overall comparison (assuming same version across platforms)
  const firstPlatform = platformsWithInstall[0];
  const cmp = cmpVersion(firstPlatform.installed, incoming);

  // ── Same version ───────────────────────────────────────────────────────────
  if (cmp === 0) {
    ctx.isUpdate = false;

    if (ctx.options.forceOverwrite) {
      ctx.ui.info(ctx.t ? ctx.t('versionForceReinstall', { v: installedVersion }) : `Reinstalling CafeKit ${installedVersion} (--force-overwrite)...`);
      return ctx;
    }

    if (!ctx.interactive) {
      ctx.ui.info(ctx.t ? ctx.t('versionUpToDate', { v: installedVersion }) : `CafeKit ${installedVersion} is already up to date. Use --force-overwrite to reinstall.`);
      ctx.cancelled = true;
      return ctx;
    }

    // Show current vs new and ask what to do
    const options = [
      { value: 'reinstall', label: ctx.t ? ctx.t('reinstallOption') : 'Reinstall (overwrite managed files)' },
      { value: 'skip', label: ctx.t ? ctx.t('skipOption') : 'Skip (exit)' }
    ];

    const answer = await ctx.ui.select({
      message: ctx.t
        ? ctx.t('versionSamePrompt', { v: installedVersion })
        : `CafeKit ${installedVersion} is already installed. What do you want to do?`,
      options
    });

    if (ctx.ui.isCancel(answer) || answer === 'skip') {
      ctx.cancelled = true;
      return ctx;
    }

    if (answer === 'reinstall') {
      ctx.options.forceOverwrite = true;
    }

    return ctx;
  }

  // ── Upgrade available ───────────────────────────────────────────────────────
  if (cmp < 0) {
    ctx.isUpdate = true;

    // --force-overwrite or non-interactive: proceed without asking
    if (!ctx.interactive || ctx.options.forceOverwrite) {
      return ctx;
    }

    // Try to fetch recent versions for the picker; fall back to 3-option menu on failure
    const registry = await fetchRecentVersions();

    if (registry) {
      // Build picker options: each version labelled with (installed) / (latest) hints
      const pickerOptions = registry.versions.map((v) => {
        let hint = '';
        if (v === firstPlatform.installed) hint = ctx.t ? ctx.t('versionPickCurrent') : '(installed)';
        else if (v === registry.latest) hint = ctx.t ? ctx.t('versionPickLatest') : '(latest)';
        const label = hint ? `${v}  ${hint}` : v;
        return { value: v, label };
      });
      pickerOptions.push({ value: 'skip', label: ctx.t ? ctx.t('skipOption') : 'Skip (exit)' });

      const picked = await ctx.ui.select({
        message: ctx.t ? ctx.t('versionPickPrompt') : 'Select CafeKit version to install:',
        options: pickerOptions
      });

      if (ctx.ui.isCancel(picked) || picked === 'skip') {
        ctx.cancelled = true;
        return ctx;
      }

      if (picked !== incoming) {
        // User chose a version different from the one currently running — signal re-exec
        ctx.reexec = picked;
        return ctx;
      }

      // User confirmed the incoming (latest) version — proceed normally
      return ctx;
    }

    // Offline or fetch failed: fall back to the classic 3-option menu
    ctx.ui.warn(ctx.t ? ctx.t('versionFetchFailed') : 'Could not fetch version list. Using default menu.');

    const fallbackOptions = [
      { value: 'update', label: ctx.t ? ctx.t('updateOption', { v: incoming }) : `Update to ${incoming}` },
      { value: 'reinstall', label: ctx.t ? ctx.t('reinstallCurrentOption', { v: firstPlatform.installed }) : `Reinstall ${firstPlatform.installed}` },
      { value: 'skip', label: ctx.t ? ctx.t('skipOption') : 'Skip (exit)' }
    ];

    const answer = await ctx.ui.select({
      message: ctx.t
        ? ctx.t('versionUpgradePrompt', { from: firstPlatform.installed, to: incoming })
        : `CafeKit ${firstPlatform.installed} → ${incoming}: Update available!`,
      options: fallbackOptions
    });

    if (ctx.ui.isCancel(answer) || answer === 'skip') {
      ctx.cancelled = true;
      return ctx;
    }

    if (answer === 'reinstall') {
      ctx.options.forceOverwrite = true;
      ctx.isUpdate = false; // Reinstall treats as fresh install
    }

    return ctx;
  }

  // ── Downgrade ──────────────────────────────────────────────────────────────
  if (cmp > 0) {
    ctx.isUpdate = false;

    const msg = ctx.t
      ? ctx.t('versionDowngrade', { from: firstPlatform.installed, to: incoming })
      : `Downgrading ${firstPlatform.installed} → ${incoming}. This may remove features.`;

    if (!ctx.interactive) {
      ctx.ui.warn ? ctx.ui.warn(msg + ' Downgrade aborted in non-interactive mode. Use --force-overwrite to proceed.') : console.warn(msg);
      ctx.cancelled = true;
      return ctx;
    }

    const yes = await ctx.ui.confirm({ message: msg + ' Continue?', initialValue: false });
    if (!yes || ctx.ui.isCancel(yes)) {
      ctx.cancelled = true;
      return ctx;
    }
  }

  return ctx;
}

module.exports = { getInstalledVersion, cmpVersion, checkVersions };
