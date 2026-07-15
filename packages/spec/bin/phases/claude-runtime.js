/**
 * Phase: Claude/runtime file installation.
 *
 * ROUTING.md, runtime files (hooks/status/gitignore/runtime.json), obsolete
 * runtime cleanup, CLAUDE.md, and the rules/ tree. All copies are
 * ownership-aware — notably CLAUDE.md and rules/ no longer force-overwrite, so
 * user edits survive re-installs (the latent wipe is fixed).
 */

const fs = require('fs');
const path = require('path');
const {
  PLATFORMS,
  isClaudeCompatibleRuntime,
  getRuntimeSupportTargetDir,
  getCopyOptions
} = require('../lib/context');
const { writeManagedFile, copyManagedTree } = require('../lib/managed-writer');
const { report, treeAction } = require('./report');
const { normalizeOpenCodeBody } = require('../lib/opencode-install');

const SRC = path.join(__dirname, '../../src');

/** Copy ROUTING.md (SKILLS_DIR substituted; OpenCode body normalized). */
function copyRoutingFile(ctx, platformKey) {
  const platform = PLATFORMS[platformKey];
  const src = path.join(SRC, platform.sourceDir, 'ROUTING.md');
  const dest = path.join(platform.folder, 'ROUTING.md');
  if (!fs.existsSync(src)) return;

  const transform = (content) => {
    let c = content.replace(/\{\{SKILLS_DIR\}\}/g, platform.skillsRef);
    if (platformKey === 'opencode') c = normalizeOpenCodeBody(c);
    return c;
  };
  const { action } = writeManagedFile({
    src, dest, platformFolder: platform.folder, ctx, tracker: ctx.trackers[platformKey], transform
  });
  report(ctx, action, 'ROUTING.md');
}

/** Copy Claude runtime files declared in the migration manifest. Claude only. */
function copyClaudeRuntimeFiles(ctx, platformKey) {
  if (platformKey !== 'claude') return;
  const manifest = ctx.manifest;
  if (!manifest?.runtime?.files) return;

  const srcBase = path.join(SRC, 'claude');
  const targetBase = PLATFORMS.claude.folder;
  const tracker = ctx.trackers.claude;

  manifest.runtime.files.forEach((relPath) => {
    const srcPath = path.join(srcBase, relPath);
    const targetRelPath = relPath === 'gitignore' ? '.gitignore' : relPath;
    const targetPath = path.join(targetBase, targetRelPath);

    if (!fs.existsSync(srcPath)) {
      ctx.ui.warn(`Runtime file not found: ${relPath}`);
      ctx.results.missingDependencies++;
      return;
    }

    const { action } = writeManagedFile({
      src: srcPath, dest: targetPath, platformFolder: targetBase, ctx, tracker
    });
    report(ctx, action, `Runtime: ${targetRelPath}`);
  });
}

/** Delete runtime files marked obsolete by the manifest. Claude only. */
function removeObsoleteClaudeRuntimeFiles(ctx, platformKey) {
  if (platformKey !== 'claude') return;

  const obsoleteFiles = ctx.manifest?.obsolete?.runtimeFiles || [];
  const targetBase = PLATFORMS.claude.folder;

  obsoleteFiles.forEach((relPath) => {
    const targetPath = path.join(targetBase, relPath);
    if (!fs.existsSync(targetPath)) return;

    const isDir = fs.statSync(targetPath).isDirectory();
    if (!ctx.dryRun) {
      fs.rmSync(targetPath, { force: true, recursive: isDir });
      // Remove the entry from the manifest so it doesn't linger as a zombie.
      if (ctx.trackers && ctx.trackers.claude) {
        ctx.trackers.claude.prune(relPath);
        // Directories: prune every tracked file underneath as well.
        if (isDir) ctx.trackers.claude.prunePrefix(`${relPath}/`);
      }
    }
    ctx.ui.detail(`  ↻ ${ctx.dryRun ? '[dry-run] ' : ''}Removed obsolete runtime: ${relPath}`);
    ctx.results.updated++;
  });
}

/** Install CLAUDE.md at the project root (ownership-aware). Claude only. */
function copyClaudeMdFile(ctx, platformKey) {
  if (platformKey !== 'claude') return;

  const src = path.join(SRC, 'claude/CLAUDE.md');
  const dest = 'CLAUDE.md'; // project root
  if (!fs.existsSync(src)) {
    ctx.ui.warn('CLAUDE.md template not found');
    ctx.results.missingDependencies++;
    return;
  }

  const { action } = writeManagedFile({
    src, dest, platformFolder: PLATFORMS.claude.folder, ctx, tracker: ctx.trackers.claude
  });
  report(ctx, action, 'CLAUDE.md');
}

/** Copy the rules/ tree (ownership-aware; no longer force-overwrites). */
function copyRulesDirectory(ctx, platformKey) {
  if (!isClaudeCompatibleRuntime(platformKey)) return;

  const src = path.join(SRC, 'claude/rules');
  const dest = getRuntimeSupportTargetDir(platformKey, 'rules');
  if (!fs.existsSync(src)) {
    ctx.ui.warn('rules/ directory not found');
    ctx.results.missingDependencies++;
    return;
  }

  const transform = platformKey === 'opencode'
    ? getCopyOptions('opencode', {}).transform
    : undefined;
  const agg = copyManagedTree({
    src, dest, platformFolder: PLATFORMS[platformKey].folder, ctx, tracker: ctx.trackers[platformKey], transform
  });
  report(ctx, treeAction(agg), 'rules/ directory');
}

module.exports = {
  copyRoutingFile,
  copyClaudeRuntimeFiles,
  removeObsoleteClaudeRuntimeFiles,
  copyClaudeMdFile,
  copyRulesDirectory
};
