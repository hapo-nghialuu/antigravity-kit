'use strict';

/**
 * Phase: Oh My Pi runtime.
 *
 * omp discovers `.claude/skills` and `.agents/skills` on its own, so CafeKit copies no
 * skill payload here. What omp does not have is CafeKit's enforcement chain, so this
 * phase provisions the two directories that carry it:
 *
 *   .omp/hooks/       the gate scripts, seeded from the Claude tree
 *   .omp/extensions/  the bridge omp auto-loads, which dispatches those scripts
 *
 * The omp-specific contract changes to the hooks are owned by a later task, as is the
 * bridge itself. This phase is deliberately verified on directory and metadata presence
 * only; it proves the install path, never gate behaviour.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS } = require('../lib/context');
const { copyManagedTree } = require('../lib/managed-writer');
const { report, treeAction } = require('./report');
const { copyRulesDirectory } = require('./claude-runtime');

const SRC = path.join(__dirname, '../../src');

/**
 * Seed `.omp/hooks/` from the omp fork when it exists, else from the Claude tree.
 * The fork is introduced by a later task; until then the Claude scripts are the
 * fork's starting state, which keeps this phase installable on its own.
 */
function hooksSource() {
  const forked = path.join(SRC, 'omp', 'hooks');
  return fs.existsSync(forked) ? forked : path.join(SRC, 'claude', 'hooks');
}

function installOmpRuntime(ctx, platformKey) {
  if (platformKey !== 'omp') return;
  const platform = PLATFORMS[platformKey];

  const hooks = copyManagedTree({
    src: hooksSource(),
    dest: path.join(platform.folder, 'hooks'),
    platformFolder: platform.folder,
    ctx,
    tracker: ctx.trackers[platformKey]
  });
  report(ctx, treeAction(hooks), 'omp hooks');

  // The bridge is authored by a later task. Create the directory regardless so a
  // half-provisioned install is visibly empty rather than silently absent.
  const bridgeSource = path.join(SRC, 'omp', 'extensions');
  const bridgeDest = path.join(platform.folder, 'extensions');
  if (fs.existsSync(bridgeSource)) {
    const bridge = copyManagedTree({
      src: bridgeSource,
      dest: bridgeDest,
      platformFolder: platform.folder,
      ctx,
      tracker: ctx.trackers[platformKey]
    });
    report(ctx, treeAction(bridge), 'omp bridge extension');
  } else if (!ctx.dryRun) {
    fs.mkdirSync(bridgeDest, { recursive: true });
    ctx.ui.detail('  ✓ omp extensions directory created (bridge not authored yet)');
  }

  copyRulesDirectory(ctx, platformKey);
  return ctx;
}

module.exports = { installOmpRuntime, hooksSource };
