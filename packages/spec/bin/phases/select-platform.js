/**
 * Phase: platform detection + selection.
 *
 * Resolves which platforms to install for: auto-detect existing folders, or
 * prompt when none/ambiguous. Sets ctx.platforms, or ctx.cancelled if the user
 * backs out (the orchestrator releases the lock and exits cleanly).
 */

const readline = require('readline');
const {
  PLATFORMS,
  detectPlatforms,
  formatPlatformList,
  getPlatformKeys,
  warnLegacyClaudeFolder
} = require('../lib/context');

async function promptPlatformSelection() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const maxChoice = Object.keys(PLATFORMS).length + 1;

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║      CafeKit - Platform Selection                      ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log();
  console.log('No existing AI editor configuration detected.\n');
  console.log('Select which platform(s) to install for:\n');
  console.log(formatPlatformList());
  console.log(`${maxChoice}) All platforms`);
  console.log('0) Cancel');
  console.log();

  return new Promise((resolve) => {
    rl.question(`Select (0-${maxChoice}): `, (answer) => {
      rl.close();
      const choice = parseInt(answer.trim(), 10);
      if (choice === 0 || isNaN(choice)) {
        resolve([]);
      } else if (choice === maxChoice) {
        resolve(getPlatformKeys());
      } else if (choice >= 1 && choice <= Object.keys(PLATFORMS).length) {
        resolve([getPlatformKeys()[choice - 1]]);
      } else {
        console.log('Invalid selection. Please run the installer again.');
        resolve([]);
      }
    });
  });
}

async function promptMultiPlatformConfirm(detected) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const platformNames = detected.map((key) => PLATFORMS[key].name).join(', ');

  console.log(`\nDetected existing configurations: ${platformNames}`);
  console.log();

  return new Promise((resolve) => {
    rl.question('Install for all detected platforms? (Y/n): ', (answer) => {
      rl.close();
      const response = answer.trim().toLowerCase();
      resolve(response === '' || response === 'y' || response === 'yes');
    });
  });
}

/**
 * Resolve ctx.platforms via detection + prompts. Sets ctx.cancelled on backout.
 */
async function resolvePlatforms(ctx) {
  let platforms = detectPlatforms();

  if (platforms.length === 0) {
    platforms = await promptPlatformSelection();
    if (platforms.length === 0) {
      console.log('\nInstallation cancelled.');
      ctx.cancelled = true;
      return ctx;
    }
  } else if (platforms.length > 1) {
    const proceed = await promptMultiPlatformConfirm(platforms);
    if (!proceed) {
      platforms = await promptPlatformSelection();
      if (platforms.length === 0) {
        console.log('\nInstallation cancelled.');
        ctx.cancelled = true;
        return ctx;
      }
    }
  }

  ctx.platforms = platforms;

  const platformNames = platforms.map((key) => PLATFORMS[key].name).join(', ');
  console.log(`\nInstalling for: ${platformNames}`);
  warnLegacyClaudeFolder(platforms);

  if (ctx.options.forceOverwrite) {
    console.log('Mode: force-overwrite (replace user-modified managed files, backup kept)\n');
  } else if (ctx.dryRun) {
    console.log('Mode: dry-run (preview only, no changes written)\n');
  } else {
    console.log('Mode: install/update (selective; preserves user-modified files)\n');
  }

  return ctx;
}

module.exports = { promptPlatformSelection, promptMultiPlatformConfirm, resolvePlatforms };
