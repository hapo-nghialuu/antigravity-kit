/**
 * Phase: platform detection + selection.
 *
 * Resolves which platforms to install for: auto-detect existing folders, or
 * prompt (clack) when interactive. In non-interactive mode it uses detection
 * only and defaults to Claude when nothing is found — never blocks on input.
 * Sets ctx.platforms, or ctx.cancelled if the user backs out.
 */

const {
  PLATFORMS,
  detectPlatforms,
  getPlatformKeys,
  warnLegacyClaudeFolder
} = require('../lib/context');

/** clack select: which platform(s) to install for. */
async function promptPlatformSelection(ctx) {
  const options = [
    ...getPlatformKeys().map((key) => ({
      value: [key],
      label: PLATFORMS[key].name,
      hint: `${PLATFORMS[key].folder}/`
    })),
    { value: getPlatformKeys(), label: 'All platforms' }
  ];
  const r = await ctx.ui.select(
    { message: 'Select which platform(s) to install for', options },
    []
  );
  if (ctx.ui.isCancel(r)) return [];
  return r;
}

/** clack confirm: install for all detected platforms? */
async function confirmAllDetected(ctx, detected) {
  const names = detected.map((key) => PLATFORMS[key].name).join(', ');
  const r = await ctx.ui.confirm(
    { message: `Install for all detected platforms? (${names})`, initialValue: true },
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
        ctx.ui.outro('Installation cancelled.');
        ctx.cancelled = true;
        return ctx;
      }
    } else {
      // Non-interactive with nothing detected → sensible default, never block.
      platforms = ['claude'];
      ctx.ui.info('No platform detected; defaulting to Claude Code (.claude/).');
    }
  } else if (platforms.length > 1 && ctx.interactive) {
    const proceed = await confirmAllDetected(ctx, platforms);
    if (!proceed) {
      platforms = await promptPlatformSelection(ctx);
      if (platforms.length === 0) {
        ctx.ui.outro('Installation cancelled.');
        ctx.cancelled = true;
        return ctx;
      }
    }
  }

  ctx.platforms = platforms;

  const platformNames = platforms.map((key) => PLATFORMS[key].name).join(', ');
  ctx.ui.info(`Installing for: ${platformNames}`);
  warnLegacyClaudeFolder(platforms);

  if (ctx.options.forceOverwrite) {
    ctx.ui.info('Mode: force-overwrite (replace user-modified files; backup kept)');
  } else if (ctx.dryRun) {
    ctx.ui.info('Mode: dry-run (preview only, no changes written)');
  } else {
    ctx.ui.info('Mode: install/update (selective; preserves user-modified files)');
  }

  return ctx;
}

module.exports = { promptPlatformSelection, resolvePlatforms };
