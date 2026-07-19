/**
 * Phase: language + platform selection.
 *
 * Language is chosen first (interactive) so the rest of the installer renders in
 * it; non-interactive uses --lang or English. Then platforms are auto-detected
 * or prompted. Sets ctx.platforms, or ctx.cancelled if the user backs out.
 */

const fs = require('fs');
const path = require('path');
const {
  PLATFORMS,
  detectPlatforms,
  getPlatformKeys,
  warnLegacyClaudeFolder
} = require('../lib/context');
const { SUPPORTED, LANGUAGE_LABELS, OTHER_LABEL } = require('../lib/i18n');

const OTHER = '__other__';

/**
 * Read saved locale label from .claude/runtime.json (written by post-install).
 * Returns the freeform label string (e.g. "Tiếng Việt") or null.
 */
function getInstalledLocale() {
  const runtimeJson = path.join(process.cwd(), '.claude', 'runtime.json');
  if (!fs.existsSync(runtimeJson)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(runtimeJson, 'utf8'));
    return (data && data.locale && typeof data.locale.responseLanguage === 'string')
      ? data.locale.responseLanguage
      : null;
  } catch { return null; }
}

/** First step: pick the installer/UI language (interactive only). */
async function selectLanguage(ctx) {
  // Restore the saved locale BEFORE the interactivity check: a non-interactive
  // upgrade (--yes) must not forget the configured language. Skipping this left
  // ctx at the 'en' default, and patchRuntimeLocale then clobbered the user's
  // responseLanguage on every upgrade.
  if (!ctx.options.lang) {
    const savedLocale = getInstalledLocale();
    if (savedLocale) {
      const code = Object.keys(LANGUAGE_LABELS).find((k) => LANGUAGE_LABELS[k] === savedLocale) || 'en';
      ctx.setLang(code, savedLocale); // updates ctx.t to the saved language
      if (ctx.interactive) ctx.ui.info(ctx.t('langKept', { lang: savedLocale }));
      return ctx;
    }
  }

  if (!ctx.interactive || ctx.options.lang) return ctx;

  const options = [
    ...SUPPORTED.map((code) => ({ value: code, label: LANGUAGE_LABELS[code] })),
    { value: OTHER, label: OTHER_LABEL.en + ' / その他 / Ngôn ngữ khác' }
  ];

  const r = await ctx.ui.select(
    { message: 'Select language · 言語を選択 · Chọn ngôn ngữ', options },
    ctx.lang
  );
  if (ctx.ui.isCancel(r)) return ctx;

  if (r === OTHER) {
    // User types their language name — UI stays English, AI responds in that language.
    const typed = await ctx.ui.text(
      { message: 'Enter your language (e.g. Korean, French, Spanish…)', placeholder: 'Language name in English' },
      ''
    );
    if (!ctx.ui.isCancel(typed) && typed && typed.trim()) {
      ctx.setLang('en', typed.trim()); // UI = English, locale = user's label
    }
  } else {
    ctx.setLang(r, LANGUAGE_LABELS[r]);
  }

  return ctx;
}

/** clack select: which platform(s) to install for. */
async function promptPlatformSelection(ctx) {
  const options = [
    ...getPlatformKeys().map((key) => ({
      value: [key],
      label: PLATFORMS[key].name,
      hint: `${PLATFORMS[key].folder}/`
    })),
    { value: getPlatformKeys(), label: ctx.t('allPlatforms') }
  ];
  const r = await ctx.ui.select({ message: ctx.t('selectPlatform'), options }, []);
  if (ctx.ui.isCancel(r)) return [];
  return r;
}

/** clack confirm: install for all detected platforms? */
async function confirmAllDetected(ctx, detected) {
  const names = detected.map((key) => PLATFORMS[key].name).join(', ');
  const r = await ctx.ui.confirm(
    { message: ctx.t('confirmAllDetected', { names }), initialValue: true },
    true
  );
  if (ctx.ui.isCancel(r)) return false;
  return r;
}

/**
 * Resolve ctx.platforms via detection + prompts. Sets ctx.cancelled on backout.
 * If cafekit.json exists (prior install), reads platform from it to skip prompt.
 * Note: ctx.isUpdate is set later by checkVersions and cannot be used here.
 */
async function resolvePlatforms(ctx) {
  // Skip platform prompt when a prior install is detected via cafekit.json
  const savedPlatform = getInstalledPlatform();
  if (savedPlatform) {
    ctx.platforms = [savedPlatform];
    const platformNames = PLATFORMS[savedPlatform].name;
    ctx.ui.info(ctx.t('platformKept', { names: platformNames }));

    if (ctx.options.forceOverwrite) {
      ctx.ui.info(ctx.t('modeForce'));
    } else if (ctx.dryRun) {
      ctx.ui.info(ctx.t('modeDryRun'));
    } else {
      ctx.ui.info(ctx.t('modeInstall'));
    }
    return ctx;
  }

  let platforms = detectPlatforms();

  if (platforms.length === 0) {
    if (ctx.interactive) {
      platforms = await promptPlatformSelection(ctx);
      if (platforms.length === 0) {
        ctx.ui.outro(ctx.t('cancelled'));
        ctx.cancelled = true;
        return ctx;
      }
    } else {
      platforms = ['claude'];
      ctx.ui.info('No platform detected; defaulting to Claude Code (.claude/).');
    }
  } else if (platforms.length > 1 && ctx.interactive) {
    const proceed = await confirmAllDetected(ctx, platforms);
    if (!proceed) {
      platforms = await promptPlatformSelection(ctx);
      if (platforms.length === 0) {
        ctx.ui.outro(ctx.t('cancelled'));
        ctx.cancelled = true;
        return ctx;
      }
    }
  }

  ctx.platforms = platforms;

  const platformNames = platforms.map((key) => PLATFORMS[key].name).join(', ');
  ctx.ui.info(ctx.t('installingFor', { names: platformNames }));
  warnLegacyClaudeFolder(platforms);

  if (ctx.options.forceOverwrite) {
    ctx.ui.info(ctx.t('modeForce'));
  } else if (ctx.dryRun) {
    ctx.ui.info(ctx.t('modeDryRun'));
  } else {
    ctx.ui.info(ctx.t('modeInstall'));
  }

  return ctx;
}

/**
 * Get the installed platform from cafekit.json files.
 * Returns the platform key (e.g. 'claude', 'opencode') or null.
 */
function getInstalledPlatform() {
  const claudeJson = path.join(process.cwd(), '.claude', 'cafekit.json');
  if (fs.existsSync(claudeJson)) {
    try {
      const data = JSON.parse(fs.readFileSync(claudeJson, 'utf8'));
      if (data.platform) return data.platform;
    } catch { /* ignore */ }
  }

  const opencodeJson = path.join(process.cwd(), '.opencode', 'cafekit.json');
  if (fs.existsSync(opencodeJson)) {
    try {
      const data = JSON.parse(fs.readFileSync(opencodeJson, 'utf8'));
      if (data.platform) return data.platform;
    } catch { /* ignore */ }
  }

  return null;
}

module.exports = { selectLanguage, promptPlatformSelection, resolvePlatforms };
