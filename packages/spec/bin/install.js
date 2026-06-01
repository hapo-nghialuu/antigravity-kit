#!/usr/bin/env node

/**
 * CafeKit Installer (orchestrator)
 *
 * Thin coordinator that runs the install as a sequence of phase handlers. Each
 * phase receives and returns the run context (`ctx`). Heavy logic lives in
 * bin/phases/* and bin/lib/*.
 *
 * Safety features:
 *  - Process lock (lib/lock)       — refuses to run concurrently.
 *  - Pre-run snapshot (lib/backup) — rolls back on a mid-install crash.
 *  - Ownership manifest (lib/manifest) — selective update; preserves user edits.
 *  - --dry-run                     — preview only, no filesystem changes.
 *
 * Supported platforms (each self-contained): claude → .claude/, opencode → .opencode/.
 * To add a platform, extend the PLATFORMS registry in lib/context.js.
 */

const { buildContext, PLATFORMS, packageJson } = require('./lib/context');
const lock = require('./lib/lock');
const backup = require('./lib/backup');
const manifestLib = require('./lib/manifest');

const { resolvePlatforms } = require('./phases/select-platform');
const { copyPlatformFiles } = require('./phases/copy-payload');
const {
  copyRoutingFile,
  copyClaudeRuntimeFiles,
  removeObsoleteClaudeRuntimeFiles,
  copyClaudeMdFile,
  copyRulesDirectory
} = require('./phases/claude-runtime');
const { mergeClaudeSettings } = require('./phases/claude-settings');
const { installOpenCodeRuntime } = require('./phases/opencode-runtime');
const { writePlatformVersionMetadata } = require('./phases/write-metadata');
const { ensureGitignore } = require('./phases/root-config');
const { runPostInstall } = require('./phases/post-install');
const { printSummary } = require('./phases/summary');

function printHeader() {
  console.log();
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log(`║         CafeKit Installer v${String(packageJson.version).padEnd(5, ' ')}                    ║`);
  console.log('║         Multi-platform SDD Workflow                    ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log();
}

/** Install a single platform: payload + runtime + metadata. */
function installPlatform(ctx, platformKey) {
  const platform = PLATFORMS[platformKey];

  // Read ownership baseline + start a fresh tracker for this platform.
  ctx.ownership[platform.folder] = manifestLib.read(platform.folder);
  ctx.trackers[platformKey] = manifestLib.createTracker(platform.folder, packageJson.version);

  console.log(`${platform.name} (${platform.folder}/)`);
  console.log('-'.repeat(40));

  copyPlatformFiles(ctx, platformKey);

  if (platformKey === 'claude') {
    copyRoutingFile(ctx, platformKey);
    copyClaudeRuntimeFiles(ctx, platformKey);
    removeObsoleteClaudeRuntimeFiles(ctx, platformKey);
    mergeClaudeSettings(ctx, platformKey);
    copyClaudeMdFile(ctx, platformKey);
    copyRulesDirectory(ctx, platformKey);
  }

  if (platformKey === 'opencode') {
    installOpenCodeRuntime(ctx, platformKey);
  }

  writePlatformVersionMetadata(ctx, platformKey);

  ctx.results.targets.push(platform.commandsDir);
  console.log();
}

async function main() {
  printHeader();

  // ── Concurrency guard ───────────────────────────────────
  const got = lock.acquire();
  if (!got.acquired) {
    console.error(`✗ Another CafeKit install is in progress (pid ${got.pid}, since ${got.since}).`);
    console.error('  If that process is gone, delete .cafekit.lock and retry.');
    process.exit(1);
  }
  if (got.reclaimed) {
    console.log('  ℹ Reclaimed a stale install lock from a dead process.\n');
  }

  let ctx;
  let exitCode = 0;

  try {
    ctx = buildContext(process.argv, `${Date.now()}`);

    await resolvePlatforms(ctx);
    if (ctx.cancelled) {
      lock.release();
      process.exit(0);
    }

    // ── Pre-run snapshot for rollback ─────────────────────
    // Capture platform folders AND the root files the pipeline mutates
    // (CLAUDE.md, .gitignore) so a mid-run failure rolls back cleanly.
    if (!ctx.dryRun) {
      const folders = ctx.platforms.map((key) => PLATFORMS[key].folder);
      ctx.backupDir = backup.snapshot([...folders, 'CLAUDE.md', '.gitignore'], ctx.runId);
    }

    for (const platformKey of ctx.platforms) {
      installPlatform(ctx, platformKey);
    }

    console.log('Root Configuration');
    console.log('-'.repeat(40));
    ensureGitignore(ctx);
    console.log();

    await runPostInstall(ctx);

    printSummary(ctx);

    if (!ctx.dryRun) backup.prune(3);

    exitCode = ctx.results.errors > 0 ? 1 : 0;
  } catch (error) {
    console.error(`\n✗ Installation failed: ${error.message}`);
    if (ctx && ctx.backupDir && !ctx.dryRun) {
      try {
        backup.restore(ctx.backupDir);
        console.error('  ↩ Rolled back to the pre-install state from snapshot.');
      } catch (restoreError) {
        console.error(`  ⚠ Rollback failed: ${restoreError.message}`);
        console.error(`  Manual restore available at: ${ctx.backupDir}`);
      }
    }
    exitCode = 1;
  } finally {
    lock.release();
  }

  process.exit(exitCode);
}

main();
