/**
 * Phase: final summary report.
 *
 * Renders install stats (incl. selective-merge counters) + next steps through
 * ctx.ui, so it appears as a framed clack note/outro when interactive and as
 * plain text otherwise.
 */

const { PLATFORMS, packageJson } = require('../lib/context');

function printSummary(ctx) {
  const { results, platforms, options, ui } = ctx;

  const stats = [
    `Copied:      ${results.copied}`,
    `Updated:     ${results.updated}`,
    `Unchanged:   ${results.unchanged}`,
    `Preserved:   ${results.preserved}`,
    `Skills:      ${results.installedSkills > 0 ? 'yes' : 'no'}`,
    `CafeKit Version: ${packageJson.version}`,
    results.missingDependencies > 0 ? `Missing:     ${results.missingDependencies}` : null,
    results.errors > 0 ? `Errors:      ${results.errors}` : null
  ].filter(Boolean).join('\n');

  ui.note(stats, ctx.dryRun ? 'Dry-run preview' : 'Installation complete');

  if (results.preserved > 0) {
    const list = results.preservedFiles.slice(0, 8).map((f) => `  ⊘ ${f}`).join('\n');
    const more = results.preservedFiles.length > 8 ? `\n  ... and ${results.preservedFiles.length - 8} more` : '';
    ui.warn(`${results.preserved} user-modified file(s) preserved:\n${list}${more}\n`
      + 'Re-run with --force-overwrite to replace them (a backup is kept under .cafekit-backup/).');
  }

  if (ctx.dryRun) {
    ui.outro('Dry-run only — re-run without --dry-run to apply.');
    return;
  }

  const lines = [];
  for (const key of platforms) {
    if (key === 'claude') lines.push('Claude: use /hapo:specs <feature-description>');
    else lines.push('OpenCode: ask the agent to start a feature or brainstorm');
  }
  lines.push('Skill API keys: set per-skill (e.g. ai-multimodal → GEMINI_API_KEY via its .env.example)');
  if (!options.forceOverwrite) {
    lines.push('Use --force-overwrite to refresh user-modified files');
  }
  ui.note(lines.join('\n'), 'Next steps');

  ui.outro(`Done — docs: https://github.com/haposoft/cafekit`);
}

module.exports = { printSummary };
