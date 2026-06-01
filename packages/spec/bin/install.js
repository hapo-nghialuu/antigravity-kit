#!/usr/bin/env node

/**
 * CafeKit Installer (orchestrator)
 *
 * Thin coordinator that runs the install as a sequence of phase handlers. Each
 * phase receives and returns the run context (`ctx`). Heavy logic lives in
 * bin/phases/* and bin/lib/*. Terminal UX is rendered via ctx.ui (clack in an
 * interactive TTY; plain logs when piped/CI/--yes).
 *
 * Safety features:
 *  - Process lock (lib/lock)       — refuses to run concurrently.
 *  - Pre-run snapshot (lib/backup) — rolls back on a mid-install crash.
 *  - Ownership manifest (lib/manifest) — selective update; preserves user edits.
 *  - --dry-run                     — preview only, no filesystem changes.
 */

const { buildContext, PLATFORMS, packageJson } = require('./lib/context');
const lock = require('./lib/lock');
const backup = require('./lib/backup');
const manifestLib = require('./lib/manifest');

const { selectLanguage, resolvePlatforms } = require('./phases/select-platform');
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
const { setupSkillDeps } = require('./phases/skills-setup');
const { printSummary } = require('./phases/summary');

/** Install a single platform: payload + runtime + metadata, under one spinner. */
function installPlatform(ctx, platformKey) {
  const platform = PLATFORMS[platformKey];

  // Read ownership baseline + start a fresh tracker for this platform.
  ctx.ownership[platform.folder] = manifestLib.read(platform.folder);
  ctx.trackers[platformKey] = manifestLib.createTracker(platform.folder, packageJson.version);

  const before = { copied: ctx.results.copied, updated: ctx.results.updated, skills: ctx.results.installedSkills };
  ctx.ui.startSpinner(`Installing ${platform.name} (${platform.folder}/)`);

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

  const wrote = (ctx.results.copied - before.copied) + (ctx.results.updated - before.updated);
  const skills = ctx.results.installedSkills - before.skills;
  ctx.ui.stopSpinner(ctx.t(ctx.dryRun ? 'platformDryInstalled' : 'platformInstalled', {
    name: platform.name, files: wrote, skills
  }));

  ctx.results.targets.push(platform.commandsDir);
}

function printHelp() {
  console.log(`CafeKit installer (cafekit) v${packageJson.version}

Usage: npx @haposoft/cafekit [options]

Installs CafeKit skills, agents, rules and runtime into the current project
(.claude/ and/or .opencode/). Re-runs are selective: managed files are updated,
your edits are preserved.

Options:
  --dry-run            Preview changes; write nothing
  --force-overwrite    Overwrite user-modified managed files (backup kept)
  -u, --upgrade, -f, --force   Alias of --force-overwrite
  --with-skills-deps   Install skill dependencies (Python venv + pip, npm,
                       Chromium/Playwright). Otherwise prompted interactively.
  -y, --yes            Non-interactive: skip prompts, use defaults (CI)
  -h, --help           Show this help
  -v, --version        Print version

Docs: https://github.com/haposoft/cafekit`);
}

async function main() {
  // Info flags short-circuit before any side effects.
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    process.exit(0);
  }
  if (argv.includes('--version') || argv.includes('-v')) {
    console.log(packageJson.version);
    process.exit(0);
  }

  // ── Concurrency guard (before context; plain output) ────
  const got = lock.acquire();
  if (!got.acquired) {
    console.error(`✗ Another CafeKit install is in progress (pid ${got.pid}, since ${got.since}).`);
    console.error('  If that process is gone, delete .cafekit.lock and retry.');
    process.exit(1);
  }

  let ctx;
  let exitCode = 0;

  try {
    ctx = buildContext(process.argv, `${Date.now()}`);
    ctx.ui.intro(`${ctx.ui.pc.bgCyan(ctx.ui.pc.black(' CafeKit '))}Installer v${packageJson.version} · Multi-platform SDD`);
    if (got.reclaimed) ctx.ui.info('Reclaimed a stale install lock from a dead process.');

    await selectLanguage(ctx);
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

    ensureGitignore(ctx);
    await runPostInstall(ctx);
    await setupSkillDeps(ctx);
    printSummary(ctx);

    if (!ctx.dryRun) backup.prune(3);

    exitCode = ctx.results.errors > 0 ? 1 : 0;
  } catch (error) {
    const log = ctx && ctx.ui ? ctx.ui : { error: (m) => console.error(m) };
    log.error(`Installation failed: ${error.message}`);
    if (ctx && ctx.backupDir && !ctx.dryRun) {
      try {
        backup.restore(ctx.backupDir);
        log.error('Rolled back to the pre-install state from snapshot.');
      } catch (restoreError) {
        log.error(`Rollback failed: ${restoreError.message}`);
        log.error(`Manual restore available at: ${ctx.backupDir}`);
      }
    }
    exitCode = 1;
  } finally {
    lock.release();
  }

  process.exit(exitCode);
}

main();
