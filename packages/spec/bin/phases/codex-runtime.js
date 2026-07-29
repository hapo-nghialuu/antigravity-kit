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
      `Codex runtime: ${targetRel}`
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
  const source = path.join(CODEX_SRC, 'AGENTS.md');
  if (!fs.existsSync(source)) {
    report(ctx, 'missing', 'Codex AGENTS.md template');
    return;
  }

  const destination = 'AGENTS.md';
  const exists = fs.existsSync(destination);
  const existing = exists ? fs.readFileSync(destination, 'utf8') : '';
  const block = normalizeCodexBody(fs.readFileSync(source, 'utf8'))
    .replace(/^# CLAUDE\.md\s*$/m, '# CafeKit for Codex CLI')
    .trim();
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

module.exports = { installCodexRuntime };
