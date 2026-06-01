/**
 * Phase: language + platform selection.
 *
 * Language is chosen first (interactive) so the rest of the installer renders in
 * it; non-interactive uses --lang or English. Then platforms are auto-detected
 * or prompted. Sets ctx.platforms, or ctx.cancelled if the user backs out.
 */

const {
  PLATFORMS,
  detectPlatforms,
  getPlatformKeys,
  warnLegacyClaudeFolder
} = require('../lib/context');
const { SUPPORTED, LANGUAGE_LABELS } = require('../lib/i18n');

/** First step: pick the installer/UI language (interactive only). */
async function selectLanguage(ctx) {
  // Honor an explicit --lang or non-interactive default (English) without prompting.
  if (!ctx.interactive || ctx.options.lang) return ctx;

  const r = await ctx.ui.select(
    {
      message: 'Select language · 言語を選択 · Chọn ngôn ngữ',
      options: SUPPORTED.map((code) => ({ value: code, label: LANGUAGE_LABELS[code] }))
    },
    ctx.lang
  );
  if (!ctx.ui.isCancel(r)) ctx.setLang(r);
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
 */
async function resolvePlatforms(ctx) {
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

module.exports = { selectLanguage, promptPlatformSelection, resolvePlatforms };
