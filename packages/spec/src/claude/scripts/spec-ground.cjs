#!/usr/bin/env node
/**
 * CafeKit spec GROUNDING checker (Specs v2, Layer 2).
 *
 * The deterministic validator (`validate-spec-output.cjs`) checks spec SHAPE
 * (headings, registry sync, coverage). It is blind to whether the file paths a
 * task cites actually EXIST. This script closes that gap: it parses every task's
 * `Related Files` table and verifies, against the real work tree, that each
 * Modify/Delete/Read path exists — unless another task in the same spec Creates
 * it first (intra-spec resolution).
 *
 * Why active-grep instead of opt-in: field tests showed opt-in checks get
 * skipped by the author. Grounding runs unconditionally over whatever paths the
 * tasks already declare, so it cannot be dodged by choosing a different format.
 *
 * Usage:
 *   node spec-ground.cjs <specDir> [--root <work-context>]
 *
 * <specDir>  : path to specs/<feature>  (relative or absolute)
 * --root     : work tree the paths resolve against. Default: two levels up from
 *              specDir (…/<root>/specs/<feature> -> <root>). Override for
 *              monorepos where the spec lives apart from the code.
 *
 * Exit: 0 = GROUNDED, 1 = FAIL (missing path), 2 = usage error.
 */

const fs = require('fs');
const path = require('path');

function usage() {
  console.error('Usage: node spec-ground.cjs <specDir> [--root <work-context>]');
}

function parseArgs(argv) {
  const args = { specDir: null, root: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--root') args.root = argv[++i];
    else if (!args.specDir) args.specDir = argv[i];
  }
  return args;
}

function listTaskFiles(specDir) {
  const tasksDir = path.join(specDir, 'tasks');
  if (!fs.existsSync(tasksDir)) return [];
  return fs
    .readdirSync(tasksDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => path.join(tasksDir, e.name))
    .sort();
}

/**
 * Pull rows out of a markdown `## Related Files` table. Returns
 * [{ path, action, taskFile }]. Tables look like:
 *   | Path | Action | Description |
 *   | `front/x.vue` | Modify | ... |
 */
function parseRelatedFiles(content, taskFile) {
  const rows = [];
  const lines = content.split('\n');
  let inSection = false;
  for (const line of lines) {
    if (/^##+\s+Related Files\s*$/i.test(line)) { inSection = true; continue; }
    if (inSection && /^##+\s+/.test(line)) break; // next heading ends section
    if (!inSection) continue;
    if (!line.trim().startsWith('|')) continue;

    const cells = line.split('|').map((c) => c.trim());
    // cells[0] is '' (leading pipe). path=cells[1], action=cells[2].
    const rawPath = (cells[1] || '').replace(/`/g, '').trim();
    const action = (cells[2] || '').toLowerCase().trim();
    if (!rawPath || rawPath === 'path') continue;          // header row
    if (/^-+$/.test(rawPath)) continue;                    // separator row
    if (!action || !/(create|modify|delete|read)/.test(action)) continue;
    rows.push({ path: rawPath, action, taskFile: path.basename(taskFile) });
  }
  return rows;
}

/** Lenient existence check with minimal glob handling. */
function pathExists(root, p) {
  // Glob-ish path (e.g. `assets/{x,instagram,facebook}.svg` or `dir/*.ts`):
  // verify the parent directory exists rather than the literal name.
  if (/[{*]/.test(p)) {
    const parent = path.dirname(p.replace(/\{.*$/, '').replace(/\*.*$/, ''));
    return fs.existsSync(path.join(root, parent));
  }
  return fs.existsSync(path.join(root, p));
}

function main() {
  const { specDir: specInput, root: rootInput } = parseArgs(process.argv);
  if (!specInput) { usage(); process.exit(2); }

  const specDir = path.resolve(process.cwd(), specInput);
  if (!fs.existsSync(specDir)) {
    console.error(`FAIL ${specInput}\n- spec directory does not exist`);
    process.exit(1);
  }
  // Default work-context: two levels up (…/<root>/specs/<feature>).
  const root = rootInput
    ? path.resolve(process.cwd(), rootInput)
    : path.resolve(specDir, '..', '..');

  const taskFiles = listTaskFiles(specDir);
  const allRows = [];
  for (const tf of taskFiles) {
    allRows.push(...parseRelatedFiles(fs.readFileSync(tf, 'utf8'), tf));
  }

  // Paths that will exist because a task Creates them (intra-spec resolution).
  const createdPaths = new Set(
    allRows.filter((r) => r.action.includes('create')).map((r) => r.path),
  );

  const errors = [];
  const warnings = [];
  let checked = 0;

  for (const row of allRows) {
    const onDisk = pathExists(root, row.path);
    if (row.action.includes('create')) {
      if (onDisk) warnings.push(`${row.taskFile}: Create path already exists (will overwrite): ${row.path}`);
      continue;
    }
    // modify / delete / read must exist OR be created by another task in-spec.
    checked++;
    if (!onDisk && !createdPaths.has(row.path)) {
      errors.push(`${row.taskFile}: ${row.action} path not found in work tree: ${row.path}`);
    }
  }

  for (const w of warnings) console.warn(`[WARN] ${w}`);

  const rel = path.relative(process.cwd(), specDir) || specDir;
  if (errors.length > 0) {
    console.error(`FAIL ${rel}  (root: ${root})`);
    for (const e of errors) console.error(`- ${e}`);
    console.error(`\n${errors.length} missing / ${checked} checked path(s).`);
    process.exit(1);
  }
  console.log(`GROUNDED ${rel}  (${checked} path(s) verified against ${root})`);
}

main();
