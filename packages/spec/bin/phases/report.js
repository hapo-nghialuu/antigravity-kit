/**
 * Shared reporting helper for install phases.
 *
 * Maps an ownership-writer action to a UI update + results counter so every
 * phase reports outcomes consistently. Routine create/update lines go to
 * ctx.ui.detail (ephemeral spinner progress when interactive; plain log when
 * not). Preserved/missing are surfaced more prominently.
 */

const SYMBOL = {
  created: '✓',
  updated: '↻',
  unchanged: '→',
  preserved: '⊘',
  missing: '⚠'
};

/**
 * Report a single file/group outcome.
 *
 * @param {object} ctx     run context (ui + results + dryRun)
 * @param {string} action  'created'|'updated'|'unchanged'|'preserved'|'missing'
 * @param {string} label   human label, e.g. "Skill: specs"
 */
function report(ctx, action, label) {
  const prefix = ctx.dryRun ? '[dry-run] ' : '';
  const sym = SYMBOL[action] || ' ';
  const r = ctx.results;

  switch (action) {
    case 'created':
      ctx.ui.detail(`  ${sym} ${prefix}${label}`);
      r.copied++;
      break;
    case 'updated':
      ctx.ui.detail(`  ${sym} ${prefix}${label}`);
      r.updated++;
      break;
    case 'unchanged':
      r.unchanged++;
      break;
    case 'preserved':
      ctx.ui.detail(`  ${sym} ${prefix}preserved (user-modified): ${label}`);
      r.preserved++;
      break;
    case 'missing':
      ctx.ui.warn(`${prefix}Missing: ${label}`);
      r.missingDependencies++;
      break;
    default:
      break;
  }
}

/**
 * Pick the dominant action for a tree-copy aggregate, for a single summary line.
 * created wins over updated wins over preserved wins over unchanged.
 */
function treeAction(agg) {
  if (agg.created > 0) return 'created';
  if (agg.updated > 0) return 'updated';
  if (agg.preserved > 0) return 'preserved';
  return 'unchanged';
}

module.exports = { SYMBOL, report, treeAction };
