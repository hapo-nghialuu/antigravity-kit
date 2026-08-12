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
 *   node spec-scaffold.cjs <feature> [--tasks "R0-01-slug,R1-01-slug,..."] \
 *        [--lane Standard|Critical] [--risks auth,privacy] \
 *        [--lang en] [--title "..."] [--specs-root specs] \
 *        [--artifacts '{"R1-01-slug":["dist/output.js"]}']
 *
 * Exit: 0 = scaffolded, 2 = usage/precondition error.
 */

const fs = require('fs');
const path = require('path');
const POLICY = require('./workflow-policy.cjs');

const TEMPLATES = path.join(__dirname, '..', 'skills', 'specs', 'templates');
const TASK_ID_RE = /^R(\d+)-(\d+)-([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const TASK_PATH_RE = /^tasks\/task-(R\d+-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const FEATURE_NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const REGISTRY_KEYS = [
  'id',
  'title',
  'status',
  'dependencies',
  'blocker',
  'started_at',
  'completed_at',
  'last_updated_at',
];

class ScaffoldPreconditionError extends Error {}

function usage() {
  console.error('Usage: node spec-scaffold.cjs <feature> [--tasks "R0-01-slug,R1-01-slug"] [--lane Standard|Critical] [--risks auth,privacy] [--lang en] [--title "..."] [--specs-root specs] [--artifacts \'{"R1-01-slug":["dist/output.js"]}\']');
}

function failPrecondition(message) {
  throw new ScaffoldPreconditionError(message);
}

function observeInstalledPolicyBaseline({ args, specDir, spec }) {
  const adapterDir = path.dirname(__dirname);
  const adapterName = path.basename(adapterDir);
  if (path.basename(__dirname) !== 'scripts' || (adapterName !== '.claude' && adapterName !== '.codex')) return;

  const statePath = path.join(adapterDir, 'hooks', 'completion-authority-state.cjs');
  const checkPath = path.join(adapterDir, 'hooks', 'completion-authority-check.cjs');
  if (![statePath, checkPath].every((filePath) => {
    try {
      return fs.statSync(filePath).isFile();
    } catch {
      return false;
    }
  })) return;

  let installedRoot;
  let scaffoldCwd;
  let specFile;
  try {
    installedRoot = fs.realpathSync(path.resolve(adapterDir, '..'));
    scaffoldCwd = fs.realpathSync(path.resolve(process.cwd()));
    specFile = path.join(specDir, 'spec.json');
    const canonicalSpecFile = fs.realpathSync(specFile);
    if (!isWithin(installedRoot, scaffoldCwd) || !isWithin(installedRoot, canonicalSpecFile)) {
      throw new Error(`scaffold cwd and spec path must stay inside installed project root ${installedRoot}`);
    }
  } catch (error) {
    throw new Error(`installed ${adapterName} scaffold authority baseline could not be verified: ${error.message}`);
  }

  let STATE;
  let check;
  try {
    STATE = require(statePath);
    check = require(checkPath);
  } catch (error) {
    throw new Error(`installed ${adapterName} scaffold authority hooks are unavailable: ${error.message}`);
  }
  if (typeof check.observePolicyBaseline !== 'function') {
    throw new Error(`installed ${adapterName} scaffold authority check does not expose observePolicyBaseline`);
  }

  let result;
  try {
    result = check.observePolicyBaseline({
      STATE,
      policy: POLICY,
      projectRoot: installedRoot,
      candidate: { spec, specFile, featureName: args.feature },
    });
  } catch (error) {
    throw new Error(`installed ${adapterName} scaffold authority baseline failed: ${error.message}`);
  }
  if (!result || result.ok !== true) {
    throw new Error(`installed ${adapterName} scaffold authority baseline rejected the spec: ${result?.reason || 'unknown reason'}`);
  }
}

function parseArgs(argv) {
  const a = { feature: null, tasks: null, lane: null, risks: null, lang: 'en', title: null, specsRoot: 'specs', tasksOnly: false, artifacts: null };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--tasks') a.tasks = argv[++i];
    else if (v === '--lane') a.lane = argv[++i];
    else if (v === '--risks') a.risks = argv[++i];
    else if (v === '--lang') a.lang = argv[++i];
    else if (v === '--title') a.title = argv[++i];
    else if (v === '--specs-root') a.specsRoot = argv[++i];
    else if (v === '--tasks-only') a.tasksOnly = true;
    else if (v === '--artifacts') a.artifacts = argv[++i];
    else if (!a.feature) a.feature = v;
  }
  return a;
}

function readTemplate(name) {
  const p = path.join(TEMPLATES, name);
  if (!fs.existsSync(p)) {
    failPrecondition(`template not found: ${p}`);
  }
  return fs.readFileSync(p, 'utf8');
}

function titleFromSlug(slug) {
  const s = slug.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function registryEntry(t, artifactDeclarations) {
  const entry = {
    id: `R${t.req}-${t.seq}`,
    title: titleFromSlug(t.slug),
    status: 'pending',
    dependencies: [],
    blocker: null,
    started_at: null,
    completed_at: null,
    last_updated_at: null,
  };
  const artifacts = artifactDeclarations.get(t.file);
  if (artifacts) entry.artifacts = artifacts;
  return entry;
}

function parseArtifactDeclarations(raw, parsedTasks) {
  if (raw === null || raw === undefined) return new Map();
  let declarations;
  try {
    declarations = JSON.parse(raw);
  } catch (error) {
    failPrecondition(`--artifacts must be valid JSON (${error.message})`);
  }
  if (!declarations || typeof declarations !== 'object' || Array.isArray(declarations)) {
    failPrecondition('--artifacts must be an object keyed by task id or task path');
  }

  const result = new Map();
  for (const [key, artifacts] of Object.entries(declarations)) {
    const task = parsedTasks.find((candidate) => key === candidate.raw || key === candidate.file);
    if (!task) {
      failPrecondition(`--artifacts references unknown task "${key}"`);
    }
    if (!Array.isArray(artifacts) || artifacts.length === 0 || artifacts.some((artifact) => (
      typeof artifact !== 'string'
      || artifact.trim() === ''
      || artifact !== artifact.trim()
      || /^(?:[A-Za-z]:[\\/]|[\\/]|https?:\/\/)/.test(artifact)
      || artifact.split(/[\\/]+/).includes('..')
    ))) {
      failPrecondition(`--artifacts for "${key}" must be a non-empty array of safe relative paths`);
    }
    if (new Set(artifacts).size !== artifacts.length) {
      failPrecondition(`--artifacts for "${key}" must not contain duplicate paths`);
    }
    result.set(task.file, artifacts);
  }
  return result;
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

function parseRiskNames(raw) {
  if (!raw) return [];
  const aliases = new Map([
    ['auth', 'auth'],
    ['authentication', 'auth'],
    ['authorization', 'auth'],
  ]);
  return [...new Set(raw
    .split(',')
    .map((risk) => risk.trim().toLowerCase())
    .filter(Boolean)
    .map((risk) => aliases.get(risk) || risk))];
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

function hasOwn(value, key) {
  return value !== null && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, key);
}

function isPlainObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function isWithin(root, target) {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function assertNoSymlinkPath(root, target, label) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  if (!isWithin(resolvedRoot, resolvedTarget)) {
    failPrecondition(`${label} escapes the work root: ${target}`);
  }

  const relative = path.relative(resolvedRoot, resolvedTarget);
  let current = resolvedRoot;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    let stat;
    try {
      stat = fs.lstatSync(current);
    } catch (error) {
      if (error.code === 'ENOENT') break;
      failPrecondition(`${label} cannot be inspected (${error.message})`);
    }
    if (stat.isSymbolicLink()) failPrecondition(`${label} cannot traverse a symlink: ${current}`);
  }
}

function assertExistingDirectory(root, directory, label) {
  assertNoSymlinkPath(root, directory, label);
  let stat;
  try {
    stat = fs.lstatSync(directory);
  } catch (error) {
    failPrecondition(`${label} is missing (${error.message})`);
  }
  if (!stat.isDirectory()) failPrecondition(`${label} must be a directory`);
}

function assertRegularFileOrMissing(root, filePath, label) {
  assertNoSymlinkPath(root, filePath, label);
  try {
    const stat = fs.lstatSync(filePath);
    if (!stat.isFile()) failPrecondition(`${label} must be a regular file`);
  } catch (error) {
    if (error instanceof ScaffoldPreconditionError) throw error;
    if (error.code !== 'ENOENT') failPrecondition(`${label} cannot be inspected (${error.message})`);
  }
}

function safeRelativePath(value, label) {
  if (
    typeof value !== 'string'
    || value.trim() === ''
    || value !== value.trim()
    || path.isAbsolute(value)
    || /^[A-Za-z]:[\\/]/.test(value)
    || value.split(/[\\/]+/).includes('..')
  ) {
    failPrecondition(`${label} must be a safe relative path`);
  }
  return value;
}

function validateArtifactList(artifacts, label) {
  if (!Array.isArray(artifacts) || artifacts.length === 0) {
    failPrecondition(`${label} must be a non-empty array of safe relative paths`);
  }
  const seen = new Set();
  for (const artifact of artifacts) {
    safeRelativePath(artifact, `${label} entry`);
    if (seen.has(artifact)) failPrecondition(`${label} must not contain duplicate paths`);
    seen.add(artifact);
  }
}

function parseTaskPath(taskPath, label) {
  const match = typeof taskPath === 'string' && taskPath.match(TASK_PATH_RE);
  if (!match) failPrecondition(`${label} must match tasks/task-R{N}-{SEQ}-<slug>.md`);
  const rawId = match[1];
  const idParts = rawId.match(TASK_ID_RE);
  if (!idParts) failPrecondition(`${label} contains an invalid task id`);
  return { id: `R${idParts[1]}-${idParts[2]}`, rawId, req: idParts[1], seq: idParts[2], slug: idParts[3] };
}

function validateTaskPathList(taskFiles, label) {
  if (!Array.isArray(taskFiles)) failPrecondition(`${label} must be an array`);
  const seen = new Set();
  for (const taskPath of taskFiles) {
    parseTaskPath(taskPath, `${label} entry`);
    if (seen.has(taskPath)) failPrecondition(`${label} contains duplicate path ${taskPath}`);
    seen.add(taskPath);
  }
  return [...taskFiles].sort();
}

function validateRegistryEntry(taskPath, entry, declaredSet) {
  if (!isPlainObject(entry)) failPrecondition(`task_registry.${taskPath} must be an object`);
  for (const key of REGISTRY_KEYS) {
    if (!hasOwn(entry, key)) failPrecondition(`task_registry.${taskPath} is missing ${key}`);
  }
  const identity = parseTaskPath(taskPath, `task_registry.${taskPath}`);
  if (entry.id !== identity.id) failPrecondition(`task_registry.${taskPath}.id conflicts with its task path`);
  if (typeof entry.title !== 'string' || entry.title.trim() === '') failPrecondition(`task_registry.${taskPath}.title must be a non-empty string`);
  if (typeof entry.status !== 'string' || entry.status.trim() === '') failPrecondition(`task_registry.${taskPath}.status must be a non-empty string`);
  if (!Array.isArray(entry.dependencies)) failPrecondition(`task_registry.${taskPath}.dependencies must be an array`);
  const dependencies = new Set();
  for (const dependency of entry.dependencies) {
    parseTaskPath(dependency, `task_registry.${taskPath}.dependencies entry`);
    if (dependencies.has(dependency)) failPrecondition(`task_registry.${taskPath}.dependencies contains a duplicate`);
    if (dependency === taskPath) failPrecondition(`task_registry.${taskPath}.dependencies cannot contain itself`);
    if (!declaredSet.has(dependency)) failPrecondition(`task_registry.${taskPath}.dependencies references unknown task ${dependency}`);
    dependencies.add(dependency);
  }
  if (hasOwn(entry, 'artifacts')) validateArtifactList(entry.artifacts, `task_registry.${taskPath}.artifacts`);
}

function validateDependencyCycles(taskFiles, registry) {
  const visiting = new Set();
  const visited = new Set();
  function visit(taskPath, stack = []) {
    if (visiting.has(taskPath)) {
      const start = stack.indexOf(taskPath);
      failPrecondition(`task_registry.dependencies contains a cycle: ${stack.slice(start).concat(taskPath).join(' -> ')}`);
    }
    if (visited.has(taskPath)) return;
    visiting.add(taskPath);
    for (const dependency of registry[taskPath].dependencies) visit(dependency, [...stack, taskPath]);
    visiting.delete(taskPath);
    visited.add(taskPath);
  }
  for (const taskPath of taskFiles) visit(taskPath);
}

function listExistingTaskFiles(workRoot, specDir) {
  const tasksDir = path.join(specDir, 'tasks');
  assertNoSymlinkPath(workRoot, tasksDir, 'tasks directory');
  if (!fs.existsSync(tasksDir)) return [];
  assertExistingDirectory(workRoot, tasksDir, 'tasks directory');
  const files = [];
  for (const entry of fs.readdirSync(tasksDir, { withFileTypes: true })) {
    const fullPath = path.join(tasksDir, entry.name);
    if (entry.isSymbolicLink()) failPrecondition(`tasks entry cannot be a symlink: ${fullPath}`);
    if (!entry.isFile()) failPrecondition(`tasks entry must be a regular file: ${fullPath}`);
    const relative = `tasks/${entry.name}`;
    parseTaskPath(relative, `tasks entry ${relative}`);
    files.push(relative);
  }
  return files.sort();
}

function readPersistedPolicy(spec) {
  if (hasOwn(spec, 'override_receipt')) {
    failPrecondition('existing spec contains legacy override_receipt; persist only workflow_policy.override_receipt');
  }
  if (!hasOwn(spec, 'workflow_policy')) {
    const legacy = spec.design_context?.execution_tier;
    failPrecondition(
      legacy
        ? 'existing spec has no persisted workflow_policy; design_context.execution_tier is read-only and cannot create policy'
        : 'existing spec must contain a persisted workflow_policy snapshot',
    );
  }
  try {
    return POLICY.readWorkflowPolicySnapshot(spec);
  } catch (error) {
    failPrecondition(`existing workflow_policy is invalid (${error.message})`);
  }
}

function validateResearchTopology(workRoot, specDir, spec, needsResearch) {
  const canonical = 'research.md';
  if (hasOwn(spec, 'research') && spec.research !== null) {
    const pointer = isPlainObject(spec.research) ? spec.research.path : spec.research;
    if (typeof pointer !== 'string') failPrecondition('spec.research must be null, a safe relative path, or an object with a path');
    const safePointer = safeRelativePath(pointer, 'spec.research');
    const pointerPath = path.resolve(specDir, safePointer);
    assertNoSymlinkPath(workRoot, pointerPath, 'spec.research path');
    if (!isWithin(specDir, pointerPath)) failPrecondition('spec.research path must stay inside the spec directory');
    if (needsResearch && safePointer !== canonical) {
      failPrecondition('spec.research path must be research.md when needsResearchGrounding is required');
    }
    assertRegularFileOrMissing(workRoot, pointerPath, 'spec.research path');
  }
  const researchPath = path.join(specDir, canonical);
  assertRegularFileOrMissing(workRoot, researchPath, 'research.md');
  return researchPath;
}

function inspectTaskTopology(workRoot, specDir, spec, parsed, artifactDeclarations) {
  const hasTaskFiles = hasOwn(spec, 'task_files');
  const hasRegistry = hasOwn(spec, 'task_registry');
  if (hasTaskFiles !== hasRegistry) failPrecondition('task_files and task_registry must be present together');

  const declared = hasTaskFiles ? validateTaskPathList(spec.task_files, 'task_files') : [];
  const registry = hasRegistry ? spec.task_registry : {};
  if (hasRegistry && !isPlainObject(registry)) failPrecondition('task_registry must be an object keyed by task file path');
  const declaredSet = new Set(declared);
  if (hasRegistry) {
    const registryIds = new Set();
    for (const taskPath of Object.keys(registry)) {
      parseTaskPath(taskPath, `task_registry key ${taskPath}`);
      if (!declaredSet.has(taskPath)) failPrecondition(`task_registry has an unregistered entry ${taskPath}`);
      validateRegistryEntry(taskPath, registry[taskPath], declaredSet);
      if (registryIds.has(registry[taskPath].id)) failPrecondition(`task_registry contains duplicate task id ${registry[taskPath].id}`);
      registryIds.add(registry[taskPath].id);
    }
    for (const taskPath of declared) {
      if (!hasOwn(registry, taskPath)) failPrecondition(`task_registry is missing entry ${taskPath}`);
    }
    validateDependencyCycles(declared, registry);
  }

  const existing = listExistingTaskFiles(workRoot, specDir);
  const existingSet = new Set(existing);
  if (!hasTaskFiles && existing.length > 0) failPrecondition('tasks directory contains files but task_files/task_registry are absent');
  for (const taskPath of existing) {
    if (!declaredSet.has(taskPath)) failPrecondition(`task_files is missing existing task file ${taskPath}`);
  }
  const requested = new Set(parsed.map((task) => task.file));
  for (const taskPath of declared) {
    if (!existingSet.has(taskPath)) failPrecondition(`task_files declares missing task file ${taskPath}`);
  }

  for (const task of parsed) {
    if (!existingSet.has(task.file)) continue;
    const entry = registry[task.file];
    const expected = registryEntry(task, new Map());
    if (entry.id !== expected.id || entry.title !== expected.title) {
      failPrecondition(`conflicting duplicate task ${task.raw}: existing registry entry differs`);
    }
    if (artifactDeclarations.has(task.file)) {
      if (!hasOwn(entry, 'artifacts') || JSON.stringify(entry.artifacts) !== JSON.stringify(expected.artifacts)) {
        failPrecondition(`conflicting duplicate task ${task.raw}: existing registry artifacts differ`);
      }
    }
  }

  return {
    declared,
    registry,
    existing,
    existingSet,
    requested,
    hasTaskTopology: hasTaskFiles,
  };
}

function captureTarget(workRoot, specDir, relativePath) {
  const target = path.join(specDir, relativePath);
  assertNoSymlinkPath(workRoot, target, `target ${relativePath}`);
  try {
    const stat = fs.lstatSync(target);
    if (!stat.isFile()) failPrecondition(`target ${relativePath} must be a regular file`);
    return { exists: true, bytes: fs.readFileSync(target) };
  } catch (error) {
    if (error instanceof ScaffoldPreconditionError) throw error;
    if (error.code !== 'ENOENT') failPrecondition(`target ${relativePath} cannot be inspected (${error.message})`);
    return { exists: false, bytes: null };
  }
}

function parseFailureInjection() {
  const raw = process.env.CAFEKIT_SCAFFOLD_FAIL_AFTER_WRITES;
  if (raw === undefined) return null;
  if (!/^[1-9]\d*$/.test(raw)) failPrecondition('CAFEKIT_SCAFFOLD_FAIL_AFTER_WRITES must be a positive integer');
  return Number(raw);
}

function stageChanges(workRoot, specDir, changes) {
  const parent = path.dirname(specDir);
  assertExistingDirectory(workRoot, parent, 'spec parent directory');
  const stageDir = fs.mkdtempSync(path.join(parent, '.cafekit-scaffold-stage-'));
  try {
    for (const change of changes) {
      safeRelativePath(change.path, `staged path ${change.path}`);
      const staged = path.join(stageDir, change.path);
      fs.mkdirSync(path.dirname(staged), { recursive: true });
      fs.writeFileSync(staged, change.body, { encoding: 'utf8', flag: 'wx' });
    }
    return stageDir;
  } catch (error) {
    fs.rmSync(stageDir, { recursive: true, force: true });
    throw error;
  }
}

function ensureTargetParent(workRoot, specDir, relativePath, createdDirs) {
  const parent = path.dirname(relativePath);
  if (parent === '.') return;
  let current = specDir;
  for (const segment of parent.split(path.sep)) {
    current = path.join(current, segment);
    assertNoSymlinkPath(workRoot, current, `target parent ${current}`);
    if (fs.existsSync(current)) {
      assertExistingDirectory(workRoot, current, `target parent ${current}`);
    } else {
      fs.mkdirSync(current);
      createdDirs.push(current);
    }
  }
}

function removeTarget(target) {
  try {
    const stat = fs.lstatSync(target);
    if (stat.isDirectory()) throw new Error(`rollback target is a directory: ${target}`);
    fs.unlinkSync(target);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

function rollbackChanges(applied, createdDirs, backupDir) {
  for (let index = applied.length - 1; index >= 0; index -= 1) {
    const record = applied[index];
    const target = record.target;
    if (record.targetInstalled) removeTarget(target);
    if (record.backupMoved) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.renameSync(record.backup, target);
    }
  }
  for (let index = createdDirs.length - 1; index >= 0; index -= 1) {
    try {
      fs.rmdirSync(createdDirs[index]);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  fs.rmSync(backupDir, { recursive: true, force: true });
}

function commitChanges(workRoot, specDir, changes, snapshots, failureAfter) {
  const stageDir = stageChanges(workRoot, specDir, changes);
  const parent = path.dirname(specDir);
  let backupDir;
  try {
    backupDir = fs.mkdtempSync(path.join(parent, '.cafekit-scaffold-backup-'));
  } catch (error) {
    fs.rmSync(stageDir, { recursive: true, force: true });
    throw error;
  }
  const applied = [];
  const createdDirs = [];
  let writes = 0;
  try {
    for (const change of changes) {
      const target = path.join(specDir, change.path);
      const before = captureTarget(workRoot, specDir, change.path);
      const expected = snapshots.get(change.path);
      if (before.exists !== expected.exists || (before.exists && !before.bytes.equals(expected.bytes))) {
        failPrecondition(`target changed during preflight: ${change.path}`);
      }
      ensureTargetParent(workRoot, specDir, change.path, createdDirs);
      const record = {
        target,
        backup: path.join(backupDir, change.path),
        targetInstalled: false,
        backupMoved: false,
      };
      applied.push(record);
      if (before.exists) {
        fs.mkdirSync(path.dirname(record.backup), { recursive: true });
        fs.renameSync(target, record.backup);
        record.backupMoved = true;
      }
      fs.renameSync(path.join(stageDir, change.path), target);
      record.targetInstalled = true;
      writes += 1;
      if (failureAfter !== null && writes >= failureAfter) {
        throw new Error(`injected failure after ${writes} staged write(s)`);
      }
    }
  } catch (error) {
    let rollbackError = null;
    try {
      rollbackChanges(applied, createdDirs, backupDir);
    } catch (rollbackFailure) {
      rollbackError = rollbackFailure;
    }
    fs.rmSync(stageDir, { recursive: true, force: true });
    if (rollbackError) throw new Error(`${error.message}; rollback failed: ${rollbackError.message}`);
    throw new Error(`${error.message}; transaction rolled back`);
  }
  fs.rmSync(backupDir, { recursive: true, force: true });
  fs.rmSync(stageDir, { recursive: true, force: true });
}

function scaffoldTasksOnly({ args, specDir, specPath, spec, persistedPolicy, parsed, artifactDeclarations, taskTpl, ts }) {
  const workRoot = path.resolve(process.cwd());
  assertExistingDirectory(workRoot, specDir, 'spec directory');
  assertRegularFileOrMissing(workRoot, specPath, 'spec.json');
  const topology = inspectTaskTopology(workRoot, specDir, spec, parsed, artifactDeclarations);

  let nextPolicy = persistedPolicy;
  if (args.risks && args.risks.length > 0) {
    try {
      nextPolicy = POLICY.escalateWorkflowPolicy(spec, { risks: args.risks });
    } catch (error) {
      failPrecondition(`--tasks-only cannot escalate workflow policy (${error.message})`);
    }
    const validation = POLICY.validateWorkflowPolicySnapshot(nextPolicy);
    if (!validation.valid) failPrecondition(`--tasks-only escalation produced an invalid workflow_policy (${validation.errors.join('; ')})`);
  }

  const needsResearch = nextPolicy.proof_obligations.includes('needsResearchGrounding');
  const researchPath = validateResearchTopology(workRoot, specDir, spec, needsResearch);
  const researchExists = fs.existsSync(researchPath);
  const researchTemplate = needsResearch && !researchExists
    ? readTemplate('research.md').replace(/\{\{FEATURE_NAME\}\}/g, args.feature)
    : null;
  const newTasks = parsed.filter((task) => !topology.existingSet.has(task.file));
  const nextSpec = cloneJson(spec);
  let specChanged = false;
  if (!topology.hasTaskTopology && newTasks.length > 0) {
    nextSpec.task_files = [];
    nextSpec.task_registry = {};
    specChanged = true;
  }
  for (const task of newTasks) {
    nextSpec.task_files.push(task.file);
    nextSpec.task_registry[task.file] = registryEntry(task, artifactDeclarations);
    specChanged = true;
  }
  if (JSON.stringify(nextPolicy) !== JSON.stringify(persistedPolicy)) {
    nextSpec.workflow_policy = nextPolicy;
    specChanged = true;
  }
  if (specChanged) {
    nextSpec.task_files.sort();
    nextSpec.updated_at = ts;
  }

  const changes = newTasks.map((task) => ({
    path: task.file,
    body: fillTask(taskTpl, task, args.feature),
  }));
  if (researchTemplate !== null) changes.push({ path: 'research.md', body: researchTemplate });
  if (specChanged) changes.push({ path: 'spec.json', body: `${JSON.stringify(nextSpec, null, 2)}\n` });
  if (changes.length === 0) return { createdTasks: [], researchCreated: false };

  const expectedAbsent = new Set(newTasks.map((task) => task.file));
  if (researchTemplate !== null) expectedAbsent.add('research.md');
  const snapshots = new Map();
  for (const change of changes) {
    const snapshot = captureTarget(workRoot, specDir, change.path);
    if (expectedAbsent.has(change.path) && snapshot.exists) {
      failPrecondition(`target appeared after preflight: ${change.path}`);
    }
    snapshots.set(change.path, snapshot);
  }
  commitChanges(workRoot, specDir, changes, snapshots, parseFailureInjection());
  return { createdTasks: newTasks.map((task) => task.file), researchCreated: researchTemplate !== null };
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.feature || (args.tasks === null && args.tasksOnly) || (args.lane === 'Critical' && !args.tasks)) {
    usage();
    failPrecondition('missing feature or required task arguments');
  }
  if (typeof args.lane === 'string' && args.lane.toLowerCase() === 'direct') {
    failPrecondition('Direct lane does not create a spec; run targeted verification from the Direct workflow instead');
  }
  if (args.lane && !POLICY.LANES.includes(args.lane)) {
    failPrecondition(`--lane must be one of ${POLICY.LANES.join(', ')}`);
  }

  const ids = (args.tasks || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (args.tasksOnly && ids.length === 0) {
    failPrecondition('--tasks-only requires at least one task id');
  }
  const parsed = [];
  const seenIds = new Set();
  for (const id of ids) {
    const m = id.match(TASK_ID_RE);
    if (!m) {
      failPrecondition(`invalid task id "${id}" (want R{N}-{SEQ}-<slug>, SEQ 2 digits)`);
    }
    const logicalId = `R${m[1]}-${m[2]}`;
    if (seenIds.has(logicalId)) failPrecondition(`duplicate task id "${logicalId}"`);
    seenIds.add(logicalId);
    parsed.push({ raw: id, req: m[1], seq: m[2], slug: m[3], file: `tasks/task-${id}.md` });
  }
  const artifactDeclarations = parseArtifactDeclarations(args.artifacts, parsed);
  const riskNames = parseRiskNames(args.risks);

  const workRoot = path.resolve(process.cwd());
  safeRelativePath(args.specsRoot, '--specs-root');
  safeRelativePath(args.feature, 'feature');
  if (!FEATURE_NAME_RE.test(args.feature)) {
    failPrecondition('feature must be one safe path segment starting with an alphanumeric character');
  }
  const specDir = path.resolve(process.cwd(), args.specsRoot, args.feature);
  if (!isWithin(workRoot, specDir)) failPrecondition(`spec directory escapes the work root: ${specDir}`);
  assertNoSymlinkPath(workRoot, specDir, 'spec directory');
  const taskTpl = readTemplate('task.md');
  const ts = nowIso();
  const created = [];

  // --- --tasks-only: add task stubs + merge registry into an existing spec ---
  if (args.tasksOnly) {
    const specPath = path.join(specDir, 'spec.json');
    assertNoSymlinkPath(workRoot, specPath, 'spec.json');
    if (!fs.existsSync(specPath)) failPrecondition(`--tasks-only needs an existing spec.json at ${specPath}`);
    let spec;
    try {
      spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    } catch (error) {
      failPrecondition(`--tasks-only existing spec.json is invalid JSON (${error.message})`);
    }
    if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
      failPrecondition('--tasks-only existing spec.json must contain a JSON object');
    }
    const persistedPolicy = readPersistedPolicy(spec);
    if (args.lane && args.lane !== persistedPolicy.lane) {
      failPrecondition(`--tasks-only --lane ${args.lane} does not match persisted workflow_policy.lane ${persistedPolicy.lane}; omit --lane or use the persisted lane (downgrade is not allowed)`);
    }
    const result = scaffoldTasksOnly({
      args: { ...args, risks: riskNames },
      specDir,
      specPath,
      spec,
      persistedPolicy,
      parsed,
      artifactDeclarations,
      taskTpl,
      ts,
    });
    const createdTasks = result.createdTasks;
    const relTo = path.relative(process.cwd(), specDir) || specDir;
    console.log(`SCAFFOLDED (tasks-only) ${relTo}`);
    console.log(`- ${createdTasks.length} new task stub(s); task_files + task_registry merged.`);
    if (result.researchCreated) console.log('- research.md created for needsResearchGrounding.');
    console.log(`- NEXT: Edit-fill {{...}} in each stub; set dependencies; run validator + spec-ground.`);
    return;
  }

  const policyInput = args.lane ? { risks: riskNames, override: args.lane } : { risks: riskNames };
  let selectedPolicy;
  try {
    selectedPolicy = POLICY.workflowPolicySnapshot(policyInput);
  } catch (error) {
    failPrecondition(error.message);
  }
  if (selectedPolicy.lane === 'Critical' && parsed.length === 0) {
    console.error('precondition: Critical workflow policy requires a task bundle; pass --tasks with at least one task id');
    process.exit(2);
  }

  if (fs.existsSync(specDir)) {
    console.error(`precondition: spec dir already exists, refusing to overwrite: ${specDir}`);
    process.exit(2);
  }

  fs.mkdirSync(specDir, { recursive: true });
  if (parsed.length > 0) {
    fs.mkdirSync(path.join(specDir, 'tasks'), { recursive: true });
  }

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
  delete spec.workflow_policy;
  delete spec.override_receipt;
  Object.assign(spec, POLICY.persistWorkflowPolicySnapshot(spec, policyInput));
  if (parsed.length > 0) {
    spec.task_files = parsed.map((t) => t.file);
    spec.task_registry = {};
    for (const t of parsed) spec.task_registry[t.file] = registryEntry(t, artifactDeclarations);
  } else {
    delete spec.task_files;
    delete spec.task_registry;
  }
  fs.writeFileSync(path.join(specDir, 'spec.json'), JSON.stringify(spec, null, 2) + '\n');
  observeInstalledPolicyBaseline({ args, specDir, spec });
  created.push('spec.json');

  // --- doc templates (placeholders left for the model to fill) ---
  const docs = [
    ['requirements.md', 'requirements.md'],
    ...(selectedPolicy.proof_obligations.includes('needsResearchGrounding')
      ? [['research.md', 'research.md']]
      : []),
    ['design.md', 'design.md'],
  ];
  for (const [tpl, out] of docs) {
    const body = readTemplate(tpl).replace(/\{\{FEATURE_NAME\}\}/g, args.feature);
    fs.writeFileSync(path.join(specDir, out), body);
    created.push(out);
  }

  fs.writeFileSync(
    path.join(specDir, 'feature-receipt.md'),
    '# Feature Verification Receipt\n\nVerification: PENDING\n\nStatus: in_progress\n\nBlocker: awaiting execution proof\n',
  );
  created.push('feature-receipt.md');

  // --- task stubs (fill the cheap placeholders; leave the rest) ---
  for (const t of parsed) {
    fs.writeFileSync(path.join(specDir, t.file), fillTask(taskTpl, t, args.feature));
    created.push(t.file);
  }

  const rel = path.relative(process.cwd(), specDir) || specDir;
  console.log(`SCAFFOLDED ${rel}`);
  console.log(`- ${created.length} files created: spec.json + ${docs.length} docs + feature-receipt.md + ${parsed.length} task stub(s)`);
  if (parsed.length > 0) console.log(`- task_files + task_registry pre-populated (${parsed.length} entries, all pending)`);
  console.log('- NEXT: Fill all spec placeholders (do NOT leave any); run validator + spec-ground before ready; keep feature-receipt.md PENDING until implementation evidence, then complete its canonical receipt at closeout.');
}

try {
  main();
} catch (error) {
  console.error(`precondition: ${error.message}`);
  process.exitCode = 2;
}
