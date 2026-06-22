#!/usr/bin/env node
/**
 * CafeKit spec SCAFFOLD generator (Specs v2 — output-cost reducer).
 *
 * Field tests showed the dominant cost of a spec run is OUTPUT tokens: the
 * model hand-Writes spec.json + every task file from scratch (a 16-task spec
 * emitted ~935K output tokens). This script does the mechanical scaffolding so
 * the model only has to Edit-fill content, not Write whole files.
 *
 * It creates spec.json (with task_files + task_registry pre-populated) and one
 * stub per task from the canonical templates, leaving the `{{...}}` placeholders
 * for the model to fill. It NEVER overwrites an existing spec directory.
 *
 * Usage:
 *   node spec-scaffold.cjs <feature> --tasks "R0-01-slug,R1-01-slug,..." \
 *        [--lang en] [--title "..."] [--specs-root specs]
 *
 * Exit: 0 = scaffolded, 2 = usage/precondition error.
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES = path.join(__dirname, '..', 'skills', 'specs', 'templates');
const TASK_ID_RE = /^R(\d+)-(\d+)-([a-z0-9]+(?:-[a-z0-9]+)*)$/;

function usage() {
  console.error('Usage: node spec-scaffold.cjs <feature> --tasks "R0-01-slug,R1-01-slug" [--lang en] [--title "..."] [--specs-root specs]');
}

function parseArgs(argv) {
  const a = { feature: null, tasks: null, lang: 'en', title: null, specsRoot: 'specs', tasksOnly: false };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--tasks') a.tasks = argv[++i];
    else if (v === '--lang') a.lang = argv[++i];
    else if (v === '--title') a.title = argv[++i];
    else if (v === '--specs-root') a.specsRoot = argv[++i];
    else if (v === '--tasks-only') a.tasksOnly = true;
    else if (!a.feature) a.feature = v;
  }
  return a;
}

function readTemplate(name) {
  const p = path.join(TEMPLATES, name);
  if (!fs.existsSync(p)) {
    console.error(`precondition: template not found: ${p}`);
    process.exit(2);
  }
  return fs.readFileSync(p, 'utf8');
}

function titleFromSlug(slug) {
  const s = slug.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function registryEntry(t) {
  return {
    id: `R${t.req}-${t.seq}`,
    title: titleFromSlug(t.slug),
    status: 'pending',
    dependencies: [],
    blocker: null,
    started_at: null,
    completed_at: null,
    last_updated_at: null,
  };
}

function fillTask(taskTpl, t, feature) {
  return taskTpl
    .replace(/\{\{REQ_NUMBER\}\}/g, t.req)
    .replace(/\{\{SEQ\}\}/g, t.seq)
    .replace(/\{\{TITLE\}\}/g, titleFromSlug(t.slug))
    .replace(/\{\{FEATURE_NAME\}\}/g, feature)
    .replace(/\{\{PRIORITY\}\}/g, 'P2')
    .replace(/\{\{EFFORT\}\}/g, 'TBD')
    .replace(/\{\{DEPENDENCIES\}\}/g, 'none');
}

function nowIso() {
  // Local ISO with offset, e.g. 2026-06-21T12:30:00+07:00
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? '+' : '-';
  const oh = pad(Math.floor(Math.abs(off) / 60));
  const om = pad(Math.abs(off) % 60);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${sign}${oh}:${om}`;
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.feature || !args.tasks) { usage(); process.exit(2); }

  const ids = args.tasks.split(',').map((s) => s.trim()).filter(Boolean);
  const parsed = [];
  for (const id of ids) {
    const m = id.match(TASK_ID_RE);
    if (!m) {
      console.error(`precondition: invalid task id "${id}" (want R{N}-{SEQ}-<slug>, SEQ 2 digits)`);
      process.exit(2);
    }
    parsed.push({ raw: id, req: m[1], seq: m[2], slug: m[3], file: `tasks/task-${id}.md` });
  }

  const specDir = path.resolve(process.cwd(), args.specsRoot, args.feature);
  const taskTpl = readTemplate('task.md');
  const ts = nowIso();
  const created = [];

  // --- --tasks-only: add task stubs + merge registry into an existing spec ---
  if (args.tasksOnly) {
    const specPath = path.join(specDir, 'spec.json');
    if (!fs.existsSync(specPath)) {
      console.error(`precondition: --tasks-only needs an existing spec.json at ${specPath}`);
      process.exit(2);
    }
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    spec.task_files = spec.task_files || [];
    spec.task_registry = spec.task_registry || {};
    fs.mkdirSync(path.join(specDir, 'tasks'), { recursive: true });
    for (const t of parsed) {
      const abs = path.join(specDir, t.file);
      if (fs.existsSync(abs)) continue; // never overwrite an already-filled task
      fs.writeFileSync(abs, fillTask(taskTpl, t, args.feature));
      if (!spec.task_files.includes(t.file)) spec.task_files.push(t.file);
      spec.task_registry[t.file] = registryEntry(t);
      created.push(t.file);
    }
    spec.task_files.sort();
    spec.updated_at = ts;
    fs.writeFileSync(specPath, JSON.stringify(spec, null, 2) + '\n');
    const relTo = path.relative(process.cwd(), specDir) || specDir;
    console.log(`SCAFFOLDED (tasks-only) ${relTo}`);
    console.log(`- ${created.length} new task stub(s); task_files + task_registry merged.`);
    console.log(`- NEXT: Edit-fill {{...}} in each stub; set dependencies; run validator + spec-ground.`);
    return;
  }

  if (fs.existsSync(specDir)) {
    console.error(`precondition: spec dir already exists, refusing to overwrite: ${specDir}`);
    process.exit(2);
  }

  fs.mkdirSync(path.join(specDir, 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(specDir, 'reports'), { recursive: true });

  // --- spec.json (from spec-state.json template) ---
  const spec = JSON.parse(readTemplate('spec-state.json'));
  spec.feature_name = args.feature;
  spec.created_at = ts;
  spec.updated_at = ts;
  spec.language = args.lang;
  spec.timestamps = spec.timestamps || {};
  spec.timestamps.init = ts;
  spec.scope_lock = spec.scope_lock || {};
  spec.scope_lock.source = args.title || `{{PROJECT_DESCRIPTION}}`;
  spec.task_files = parsed.map((t) => t.file);
  spec.task_registry = {};
  for (const t of parsed) spec.task_registry[t.file] = registryEntry(t);
  fs.writeFileSync(path.join(specDir, 'spec.json'), JSON.stringify(spec, null, 2) + '\n');
  created.push('spec.json');

  // --- doc templates (placeholders left for the model to fill) ---
  for (const [tpl, out] of [['requirements.md', 'requirements.md'], ['research.md', 'research.md'], ['design.md', 'design.md']]) {
    const body = readTemplate(tpl).replace(/\{\{FEATURE_NAME\}\}/g, args.feature);
    fs.writeFileSync(path.join(specDir, out), body);
    created.push(out);
  }

  // --- task stubs (fill the cheap placeholders; leave the rest) ---
  for (const t of parsed) {
    fs.writeFileSync(path.join(specDir, t.file), fillTask(taskTpl, t, args.feature));
    created.push(t.file);
  }

  const rel = path.relative(process.cwd(), specDir) || specDir;
  console.log(`SCAFFOLDED ${rel}`);
  console.log(`- ${created.length} files created: spec.json + 3 docs + ${parsed.length} task stub(s)`);
  console.log(`- task_files + task_registry pre-populated (${parsed.length} entries, all pending)`);
  console.log(`- NEXT: Edit-fill the {{...}} placeholders (do NOT leave any); set dependencies in task_registry; run validator + spec-ground before ready.`);
}

main();
