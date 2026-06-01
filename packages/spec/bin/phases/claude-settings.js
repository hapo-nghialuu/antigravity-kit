/**
 * Phase helper: Claude settings.json merge + obsolete-hook pruning.
 *
 * settings.json is merged (not a verbatim payload copy), so it stays outside
 * the ownership model: managed statusLine/hooks are merged into the user's
 * existing settings, and obsolete hook registrations are pruned. Honors dry-run.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS } = require('../lib/context');

const SRC_CLAUDE = path.join(__dirname, '../../src/claude');

/**
 * Remove obsolete hook entries from a settings object whose command matches any
 * manifest-listed substring (e.g. a retired router hook). Returns a possibly
 * new settings object.
 */
function pruneObsoleteSettingsHooks(settings, ctx) {
  const obsoleteSubstrings = ctx.manifest?.obsolete?.settingsHookCommandSubstrings || [];

  if (!settings.hooks || obsoleteSubstrings.length === 0) {
    return settings;
  }

  let removedCount = 0;
  const prunedHooks = {};

  Object.entries(settings.hooks).forEach(([eventName, matcherEntries]) => {
    if (!Array.isArray(matcherEntries)) {
      prunedHooks[eventName] = matcherEntries;
      return;
    }

    const prunedEntries = [];
    matcherEntries.forEach((entry) => {
      if (!Array.isArray(entry?.hooks)) {
        prunedEntries.push(entry);
        return;
      }
      const remainingHooks = entry.hooks.filter((hook) => {
        const command = hook?.command || '';
        const isObsolete = obsoleteSubstrings.some((substring) => command.includes(substring));
        if (isObsolete) removedCount++;
        return !isObsolete;
      });
      if (remainingHooks.length > 0) {
        prunedEntries.push({ ...entry, hooks: remainingHooks });
      }
    });

    if (prunedEntries.length > 0) {
      prunedHooks[eventName] = prunedEntries;
    }
  });

  if (removedCount > 0) {
    ctx.ui.detail(`  ↻ ${ctx.dryRun ? '[dry-run] ' : ''}Settings: removed ${removedCount} obsolete hook(s)`);
    ctx.results.updated++;
    return { ...settings, hooks: prunedHooks };
  }

  return settings;
}

/**
 * Merge CafeKit-managed statusLine + hooks into .claude/settings.json,
 * preserving user-owned entries. Claude only.
 */
function mergeClaudeSettings(ctx, platformKey) {
  if (platformKey !== 'claude') return;

  const manifest = ctx.manifest;
  if (!manifest?.settings?.template) return;

  const templatePath = path.join(SRC_CLAUDE, manifest.settings.template);
  const targetPath = path.join(PLATFORMS.claude.folder, 'settings.json');

  if (!fs.existsSync(templatePath)) {
    ctx.ui.warn(`Settings template not found: ${manifest.settings.template}`);
    return;
  }

  const managedSettings = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
  let existingSettings = {};
  if (fs.existsSync(targetPath)) {
    existingSettings = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  }

  const mergedSettings = pruneObsoleteSettingsHooks({ ...existingSettings }, ctx);

  // statusLine: adopt managed value if upgrading, missing, or CafeKit-owned.
  if (managedSettings.statusLine) {
    const existingCommand = existingSettings.statusLine?.command || '';
    const isCafeKitOwned = existingCommand.includes('status.cjs') || existingCommand.includes('statusline.cjs');
    if (ctx.options.forceOverwrite || !existingSettings.statusLine || isCafeKitOwned) {
      mergedSettings.statusLine = managedSettings.statusLine;
      ctx.ui.detail(`  ✓ ${ctx.dryRun ? '[dry-run] ' : ''}Settings: statusLine merged`);
    }
  }

  // hooks: append managed hooks that aren't already present (dedupe by command).
  if (managedSettings.hooks) {
    mergedSettings.hooks = mergedSettings.hooks || {};
    Object.keys(managedSettings.hooks).forEach((eventName) => {
      const managedHooks = managedSettings.hooks[eventName];
      const existingHooks = mergedSettings.hooks[eventName] || [];
      const mergedHooks = [...existingHooks];

      managedHooks.forEach((managedHook) => {
        const managedCommand = managedHook.hooks?.[0]?.command || '';
        const isDuplicate = mergedHooks.some((existingHook) =>
          existingHook.hooks?.some((h) => h.command === managedCommand));
        if (!isDuplicate) {
          mergedHooks.push(managedHook);
          ctx.ui.detail(`  ✓ ${ctx.dryRun ? '[dry-run] ' : ''}Settings: hook ${eventName} merged`);
        }
      });

      mergedSettings.hooks[eventName] = mergedHooks;
    });
  }

  if (!ctx.dryRun) {
    fs.writeFileSync(targetPath, JSON.stringify(mergedSettings, null, 2), 'utf8');
  }
}

module.exports = { pruneObsoleteSettingsHooks, mergeClaudeSettings };
