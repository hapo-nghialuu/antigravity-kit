/**
 * Phase: root project configuration (.gitignore).
 *
 * Ensures the root .gitignore carries CafeKit-managed patterns, including the
 * new install backup dir and lock file so they never get committed. Honors dry-run.
 */

const fs = require('fs');
const path = require('path');

function ensureGitignore(ctx) {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  const header = '# CafeKit / Ecosystem';
  const patterns = [
    'specs/_shared/',
    'plans/',
    '!plans/templates/',
    '.cafekit-backup/',
    '.cafekit.lock'
  ];
  const prefix = ctx.dryRun ? '[dry-run] ' : '';

  if (!fs.existsSync(gitignorePath)) {
    const content = ['# Git Ignore', '', header, ...patterns, ''].join('\n');
    if (!ctx.dryRun) fs.writeFileSync(gitignorePath, content, 'utf8');
    ctx.ui.detail(`  ✓ ${prefix}.gitignore created at root`);
    ctx.results.copied++;
    return;
  }

  const content = fs.readFileSync(gitignorePath, 'utf8');
  const lines = content.split('\n').map((l) => l.trim());
  const missing = patterns.filter((p) => !lines.includes(p));

  if (missing.length > 0) {
    let newContent = content;
    if (!newContent.endsWith('\n')) newContent += '\n';
    if (!content.includes(header)) newContent += `\n${header}\n`;
    newContent += missing.join('\n') + '\n';
    if (!ctx.dryRun) fs.writeFileSync(gitignorePath, newContent, 'utf8');
    ctx.ui.detail(`  ↻ ${prefix}.gitignore updated: added ${missing.join(', ')}`);
    ctx.results.updated++;
  } else {
    ctx.ui.detail(`  → ${prefix}.gitignore already up to date`);
    ctx.results.skipped++;
  }
}

module.exports = { ensureGitignore };
