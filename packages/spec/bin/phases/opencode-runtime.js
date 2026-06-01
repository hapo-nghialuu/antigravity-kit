/**
 * Phase: OpenCode runtime installation.
 *
 * Delegates to the existing opencode-install.js module (kept as-is) in the
 * exact original order. These writers manage their own files (plugins, command
 * templates, AGENTS.md, opencode.json) and honor the legacy `upgrade` option.
 * In dry-run we skip them and report intent, since they are not dry-run aware.
 */

const {
  copyOpenCodeSharedRuntimeFiles,
  copyOpenCodePlugins,
  copyOpenCodeCommandTemplates,
  copyOpenCodeAgentsMdFile,
  mergeOpenCodeConfig
} = require('../lib/opencode-install');
const { copyRulesDirectory } = require('./claude-runtime');

function installOpenCodeRuntime(ctx, platformKey) {
  if (platformKey !== 'opencode') return;

  if (ctx.dryRun) {
    ctx.ui.detail('  → [dry-run] OpenCode runtime (plugins, command templates, AGENTS.md, opencode.json) would be installed');
    // rules/ is dry-run aware; still preview it.
    copyRulesDirectory(ctx, platformKey);
    return;
  }

  const { results, options } = ctx;
  copyOpenCodeSharedRuntimeFiles(platformKey, results, options);
  copyOpenCodePlugins(platformKey, results, options);
  copyOpenCodeCommandTemplates(platformKey, results, options);
  copyOpenCodeAgentsMdFile(platformKey, results, options);
  copyRulesDirectory(ctx, platformKey);
  mergeOpenCodeConfig(platformKey, results);
}

module.exports = { installOpenCodeRuntime };
