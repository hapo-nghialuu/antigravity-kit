#!/usr/bin/env node
/**
 * CafeKit spec GROUNDING checker (Specs v2, Layer 2).
 *
 * Verifies every task Related Files declaration against the real work tree.
 * Paths are relative, actions are explicit, and globs must match at least one
 * filesystem entry. Create paths may be resolved by another task in the spec.
 */

const fs = require('fs');
const path = require('path');

const ACTIONS = new Set(['create', 'modify', 'delete', 'read']);

function usage() {
  console.error('Usage: node spec-ground.cjs <specDir> [--root <work-context>]');
}

function parseArgs(argv) {
  const args = { specDir: null, root: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--root') {
      args.root = argv[++i];
      if (!args.root) throw new Error('--root requires a value');
    } else if (!args.specDir) args.specDir = argv[i];
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return args;
}

function listTaskFiles(specDir) {
  const tasksDir = path.join(specDir, 'tasks');
  if (!fs.existsSync(tasksDir)) return [];
  return fs
    .readdirSync(tasksDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(tasksDir, entry.name))
    .sort();
}

function parseRelatedFiles(content, taskFile) {
  const lines = content.split('\n');
  const headingIndex = lines.findIndex((line) => /^##+\s+Related Files\s*$/i.test(line));
  if (headingIndex < 0) return { present: false, rows: [] };

  const rows = [];
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^##+\s+/.test(line)) break;
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').map((cell) => cell.trim());
    const filePath = (cells[1] || '').replace(/`/g, '').trim();
    const action = (cells[2] || '').replace(/`/g, '').trim().toLowerCase();
    if (!filePath || filePath.toLowerCase() === 'path' || /^-+$/.test(filePath)) continue;
    rows.push({ path: filePath, action, taskFile: path.basename(taskFile) });
  }
  return { present: true, rows };
}

function unsafePath(filePath) {
  return path.isAbsolute(filePath)
    || /^[A-Za-z]:[\\/]/.test(filePath)
    || filePath.split(/[\\/]+/).includes('..');
}

function expandBraces(pattern) {
  const match = pattern.match(/\{([^{}]*)\}/);
  if (!match) return [pattern];
  return match[1].split(',').flatMap((part) => expandBraces(
    `${pattern.slice(0, match.index)}${part}${pattern.slice(match.index + match[0].length)}`,
  ));
}

function globRegExp(pattern) {
  let source = '^';
  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index];
    if (char === '*') {
      if (pattern[index + 1] === '*') {
        index += 1;
        if (pattern[index + 1] === '/') index += 1;
        source += '.*';
      } else source += '[^/]*';
    } else if (char === '?') source += '[^/]';
    else source += char.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`${source}$`);
}

function relativeEntries(root) {
  const entries = [];
  function walk(current, relative) {
    let children;
    try { children = fs.readdirSync(current, { withFileTypes: true }); } catch { return; }
    for (const entry of children) {
      const nextRelative = relative ? `${relative}/${entry.name}` : entry.name;
      const next = path.join(current, entry.name);
      entries.push(nextRelative);
      if (entry.isDirectory() && !entry.isSymbolicLink()) walk(next, nextRelative);
    }
  }
  walk(root, '');
  return entries;
}

function matchingEntries(root, filePath) {
  if (!/[{}*?]/.test(filePath)) return fs.existsSync(path.join(root, filePath)) ? [filePath] : [];
  const candidates = relativeEntries(root);
  const matches = new Set();
  for (const expanded of expandBraces(filePath)) {
    const matcher = globRegExp(expanded.replaceAll('\\', '/'));
    for (const candidate of candidates) if (matcher.test(candidate)) matches.add(candidate);
  }
  return [...matches];
}

function main() {
  let args;
  try { args = parseArgs(process.argv); } catch (error) {
    usage();
    console.error(`- ${error.message}`);
    process.exit(2);
  }
  if (!args.specDir) { usage(); process.exit(2); }

  const specDir = path.resolve(process.cwd(), args.specDir);
  if (!fs.existsSync(specDir)) {
    console.error(`FAIL ${args.specDir}\n- spec directory does not exist`);
    process.exit(1);
  }
  const root = args.root
    ? path.resolve(process.cwd(), args.root)
    : path.resolve(specDir, '..', '..');

  const taskFiles = listTaskFiles(specDir);
  const allRows = [];
  const errors = [];
  const warnings = [];
  for (const taskFile of taskFiles) {
    const section = parseRelatedFiles(fs.readFileSync(taskFile, 'utf8'), taskFile);
    if (!section.present) errors.push(`${path.basename(taskFile)}: missing Related Files section`);
    else if (section.rows.length === 0) errors.push(`${path.basename(taskFile)}: Related Files section must not be empty`);
    for (const row of section.rows) {
      if (!ACTIONS.has(row.action)) errors.push(`${row.taskFile}: unsupported Related Files action "${row.action}" for ${row.path}`);
      if (unsafePath(row.path)) errors.push(`${row.taskFile}: Related Files path must be relative and stay within work root: ${row.path}`);
      allRows.push(row);
    }
  }

  const createdPaths = new Set(allRows.filter((row) => row.action === 'create').map((row) => row.path));
  let checked = 0;
  for (const row of allRows) {
    if (!ACTIONS.has(row.action) || unsafePath(row.path)) continue;
    const matches = matchingEntries(root, row.path);
    if (/[{}*?]/.test(row.path) && matches.length === 0) {
      errors.push(`${row.taskFile}: glob matches no paths in work tree: ${row.path}`);
      continue;
    }
    if (row.action === 'create') {
      if (matches.length > 0) warnings.push(`${row.taskFile}: Create path already exists (will overwrite): ${row.path}`);
      continue;
    }
    checked += 1;
    if (matches.length === 0 && !createdPaths.has(row.path)) {
      errors.push(`${row.taskFile}: ${row.action} path not found in work tree: ${row.path}`);
    }
  }

  for (const warning of warnings) console.warn(`[WARN] ${warning}`);
  const relativeSpec = path.relative(process.cwd(), specDir) || specDir;
  if (errors.length > 0) {
    console.error(`FAIL ${relativeSpec}  (root: ${root})`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`GROUNDED ${relativeSpec}  (${checked} path(s) verified against ${root})`);
}

main();
