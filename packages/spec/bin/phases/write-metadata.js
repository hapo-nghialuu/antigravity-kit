/**
 * Phase: write platform version metadata + install manifest.
 *
 * cafekit.json keeps pure version metadata (schemaVersion, version, platform,
 * timestamps, previousVersion). The ownership baseline is written separately by
 * the run's manifest tracker. Both are skipped in dry-run.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS, INSTALL_COMMAND, packageJson } = require('../lib/context');
const { readJsonFile } = require('../lib/copy-utils');

function writePlatformVersionMetadata(ctx, platformKey) {
  const platform = PLATFORMS[platformKey];
  const targetPath = path.join(platform.folder, 'cafekit.json');
  const targetExists = fs.existsSync(targetPath);
  const existingMetadata = readJsonFile(targetPath);
  const now = new Date().toISOString();
  const previousVersion = typeof existingMetadata.version === 'string'
    ? existingMetadata.version
    : null;

  const metadata = {
    schemaVersion: 1,
    packageName: packageJson.name,
    version: packageJson.version,
    platform: platform.id,
    platformName: platform.name,
    installedAt: existingMetadata.installedAt || now,
    lastInstalledAt: now,
    installCommand: INSTALL_COMMAND
  };

  if (previousVersion && previousVersion !== packageJson.version) {
    metadata.previousVersion = previousVersion;
  }

  if (!ctx.dryRun) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
  }

  const prefix = ctx.dryRun ? '[dry-run] ' : '';
  if (targetExists) {
    console.log(`  ↻ ${prefix}Version metadata updated: ${targetPath}`);
    ctx.results.updated++;
  } else {
    console.log(`  ✓ ${prefix}Version metadata installed: ${targetPath}`);
    ctx.results.copied++;
  }

  // Persist the ownership baseline of everything installed this run.
  const tracker = ctx.trackers[platformKey];
  if (tracker && !ctx.dryRun) {
    tracker.write();
  }
}

module.exports = { writePlatformVersionMetadata };
