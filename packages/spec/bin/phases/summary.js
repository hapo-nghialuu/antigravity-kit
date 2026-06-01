/**
 * Phase: final summary report.
 *
 * Prints install stats (including the new selective-merge counters: unchanged
 * and preserved user-modified files) plus next steps.
 */

const { PLATFORMS, packageJson } = require('../lib/context');

function printSummary(ctx) {
  const { results, platforms, options } = ctx;
  const banner = ctx.dryRun ? 'Dry-run Preview Complete' : 'Installation Complete!';

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log(`║         ${banner.padEnd(46, ' ')}║`);
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log();
  console.log(`  Copied Files:       ${results.copied}`);
  console.log(`  Updated Files:      ${results.updated}`);
  console.log(`  Unchanged Files:    ${results.unchanged}`);
  console.log(`  Preserved (user):   ${results.preserved}`);
  console.log(`  CafeKit Version:    ${packageJson.version}`);
  console.log(`  Skipped Files:      ${results.skipped}`);
  console.log(`  Installed Skills:   ${results.installedSkills > 0 ? 'Yes ✓' : 'No'}`);
  console.log(`  Missing Deps:       ${results.missingDependencies}`);
  console.log(`  Target Directories: ${results.targets.join(', ')}`);
  if (results.errors > 0) {
    console.log(`  Errors:             ${results.errors} ⚠`);
  }
  console.log();

  if (results.preserved > 0) {
    console.log(`  ${results.preserved} user-modified file(s) were preserved (not overwritten):`);
    results.preservedFiles.slice(0, 10).forEach((f) => console.log(`     ⊘ ${f}`));
    if (results.preservedFiles.length > 10) {
      console.log(`     ... and ${results.preservedFiles.length - 10} more`);
    }
    console.log('  Re-run with --force-overwrite to replace them (a backup is kept under .cafekit-backup/).');
    console.log();
  }

  if (ctx.dryRun) {
    console.log('No files were changed (dry-run). Re-run without --dry-run to apply.');
    console.log();
    return;
  }

  console.log('Next steps:');
  const nextEditorLabel = platforms.length === 1 ? PLATFORMS[platforms[0]].name : 'your AI editor';
  console.log(`  1. Start ${nextEditorLabel}`);

  for (const platformKey of platforms) {
    const platform = PLATFORMS[platformKey];
    console.log(`\n  For ${platform.name}:`);
    if (platformKey === 'claude') {
      console.log('     Use skill: /hapo:specs <feature-description>');
    } else {
      console.log('     Instruct the agent to start a new feature or brainstorm');
    }
  }

  if (platforms.includes('claude')) {
    console.log('\n  2. Claude Code will automatically sync docs/ (Continuous Documentation)');
  } else {
    console.log('\n  2. CafeKit skills and AGENTS.md are installed for the selected runtime');
  }
  const envHosts = platforms.map((key) => `${PLATFORMS[key].folder}/.env`).join(' and ');
  console.log(`  3. Project API Keys are now securely isolated in ${envHosts}`);
  if (!options.forceOverwrite) {
    console.log('  4. To force-refresh user-modified managed files later, run with --force-overwrite');
  }
  console.log();
  console.log('Documentation: https://github.com/haposoft/cafekit');
  if (results.missingDependencies > 0) {
    console.log('Note: some dependency templates could not be installed. Please check command/agent directories.');
  }
  console.log();
}

module.exports = { printSummary };
