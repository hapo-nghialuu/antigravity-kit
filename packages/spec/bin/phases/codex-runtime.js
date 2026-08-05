'use strict';

const fs = require('fs');
const path = require('path');
const { PLATFORMS } = require('../lib/context');
const { writeManagedFile, copyManagedTree } = require('../lib/managed-writer');
const { report, treeAction } = require('./report');
const { copyRulesDirectory } = require('./claude-runtime');
const {
  normalizeCodexBody,
  upsertManagedCodexBlock
} = require('../lib/codex-install');

const SRC = path.join(__dirname, '../../src');
const CODEX_SRC = path.join(SRC, 'codex');

const CODEX_OWN_RUNTIME = [
  ['gitignore', '.gitignore'],
  ['runtime.json', 'runtime.json'],
  ['hooks.json', 'hooks.json']
];

const WINDOWS_HOOK_COMMAND = /^node "\.codex\/hooks\/([a-z0-9-]+\.cjs)"$/;

function materializeWindowsHookCommands(content, projectRoot = process.cwd()) {
  const config = JSON.parse(content);
  const canonicalRoot = fs.realpathSync(projectRoot);

  for (const groups of Object.values(config.hooks || {})) {
    for (const group of groups) {
      for (const handler of group.hooks || []) {
        if (typeof handler.commandWindows !== 'string') continue;
        const match = handler.commandWindows.match(WINDOWS_HOOK_COMMAND);
        if (!match) {
          throw new Error(`Unsupported Codex Windows hook command: ${handler.commandWindows}`);
        }
        const hookPath = path.join(canonicalRoot, '.codex', 'hooks', match[1]);
        const encodedPath = Buffer.from(hookPath, 'utf8').toString('base64url');
        handler.commandWindows = (
          'node -e "require(Buffer.from(process.argv[1],\'base64url\').toString(\'utf8\'))" ' +
          encodedPath
        );
      }
    }
  }

  return `${JSON.stringify(config, null, 2)}\n`;
}

function writeSourceFile(ctx, platformKey, src, dest, label, transform) {
  const platform = PLATFORMS[platformKey];
  const { action } = writeManagedFile({
    src,
    dest,
    platformFolder: platform.folder,
    ctx,
    tracker: ctx.trackers[platformKey],
    transform
  });
  report(ctx, action, label);
}

function installRuntimeFiles(ctx, platformKey) {
  const platform = PLATFORMS[platformKey];
  for (const [sourceRel, targetRel] of CODEX_OWN_RUNTIME) {
    writeSourceFile(
      ctx,
      platformKey,
      path.join(CODEX_SRC, sourceRel),
      path.join(platform.folder, targetRel),
      `Codex runtime: ${targetRel}`,
      sourceRel === 'hooks.json'
        ? (content) => materializeWindowsHookCommands(content, process.cwd())
        : undefined
    );
  }
  writeSourceFile(
    ctx,
    platformKey,
    path.join(CODEX_SRC, 'agents-gitignore'),
    path.join('.agents', '.gitignore'),
    'Codex skills: .agents/.gitignore'
  );

  const agg = copyManagedTree({
    src: path.join(CODEX_SRC, 'hooks'),
    dest: path.join(platform.folder, 'hooks'),
    platformFolder: platform.folder,
    ctx,
    tracker: ctx.trackers[platformKey]
  });
  report(ctx, treeAction(agg), 'Codex native hooks');
}

function installNativeRuleOverrides(ctx, platformKey) {
  const platform = PLATFORMS[platformKey];
  const source = path.join(CODEX_SRC, 'rules');
  if (!fs.existsSync(source)) return;
  const agg = copyManagedTree({
    src: source,
    dest: path.join(platform.folder, 'rules'),
    platformFolder: platform.folder,
    ctx,
    tracker: ctx.trackers[platformKey]
  });
  report(ctx, treeAction(agg), 'Codex native rule overrides');
}

function installManagedAgentsMd(ctx) {
  const runtimeSource = path.join(CODEX_SRC, 'AGENTS.md');
  if (!fs.existsSync(runtimeSource)) {
    report(ctx, 'missing', 'Codex AGENTS.md template');
    return;
  }

  const destination = 'AGENTS.md';
  const exists = fs.existsSync(destination);
  const existing = exists ? fs.readFileSync(destination, 'utf8') : '';
  const block = normalizeCodexBody(fs.readFileSync(runtimeSource, 'utf8'));
  const next = upsertManagedCodexBlock(existing, block);
  const action = !exists ? 'created' : next === existing ? 'unchanged' : 'updated';

  if (!ctx.dryRun && action !== 'unchanged') {
    fs.writeFileSync(destination, next, 'utf8');
  }
  report(ctx, action, 'AGENTS.md (CafeKit Codex block)');
}

function installCodexRuntime(ctx, platformKey) {
  if (platformKey !== 'codex') return ctx;
  installRuntimeFiles(ctx, platformKey);
  copyRulesDirectory(ctx, platformKey);
  installNativeRuleOverrides(ctx, platformKey);
  installManagedAgentsMd(ctx);
  return ctx;
}

module.exports = { installCodexRuntime, materializeWindowsHookCommands };
