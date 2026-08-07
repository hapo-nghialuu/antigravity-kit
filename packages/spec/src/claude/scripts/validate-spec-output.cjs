#!/usr/bin/env node
/**
 * CafeKit spec artifact validator.
 *
 * This is intentionally deterministic. Prompt rules can drift; this script is
 * the hard backstop before a spec is marked ready for implementation.
 */

const fs = require('fs');
const path = require('path');

const TASK_PATH_RE = /^tasks\/task-R\d+-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const REQUIRED_REGISTRY_KEYS = [
  'id',
  'title',
  'status',
  'dependencies',
  'blocker',
  'started_at',
  'completed_at',
  'last_updated_at',
];
const APPROVAL_SCHEMA_VERSION = '2.0';
const LEGACY_APPROVAL_ERROR =
  `Legacy approval field "approved" detected. Migration required: replace "approved" with "agent_validated" and "user_approved" per schema v${APPROVAL_SCHEMA_VERSION} (schema_version: "${APPROVAL_SCHEMA_VERSION}"). See spec-state.json template. Refusing to infer user approval.`;

function usage() {
  console.error('Usage: node .claude/scripts/validate-spec-output.cjs specs/<feature>');
}

function resolveSpecDir(input) {
  if (!input) return null;

  const cwd = process.cwd();
  const direct = path.resolve(cwd, input);
  if (fs.existsSync(direct)) return direct;

  const viaSpecs = path.resolve(cwd, 'specs', input);
  if (fs.existsSync(viaSpecs)) return viaSpecs;

  return direct;
}

function readJson(filePath, errors) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    errors.push(`${filePath}: invalid JSON (${error.message})`);
    return null;
  }
}

function listTaskFiles(specDir) {
  const tasksDir = path.join(specDir, 'tasks');
  if (!fs.existsSync(tasksDir)) return [];

  return fs
    .readdirSync(tasksDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => `tasks/${entry.name}`)
    .sort();
}

function hasHeading(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^##\\s+${escaped}\\s*$`, 'm').test(content);
}

function extractSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^##\\s+${escaped}\\s*$`, 'im');
  const match = content.match(re);
  if (!match) return null;
  const start = match.index + match[0].length;
  const after = content.slice(start);
  const next = after.match(/^##\s+/m);
  return next ? after.slice(0, next.index) : after;
}

function extractRequirementIds(requirementsText) {
  const ids = new Set();
  const headingRe = /^#{2,4}\s+(?:(?:Requirement)\s+)?((?:REQ-\d+)|(?:R\d+))\b/gim;
  let match;

  while ((match = headingRe.exec(requirementsText)) !== null) {
    ids.add(match[1].toUpperCase());
  }

  const numericRequirementRe = /^#{2,4}\s+(?:Requirement\s+)?(\d+)(?=[:.\s-])/gim;
  while ((match = numericRequirementRe.exec(requirementsText)) !== null) {
    ids.add(`R${match[1]}`);
  }

  const bracketRe = /\[((?:REQ-\d+)|(?:R\d+))\]/gi;
  while ((match = bracketRe.exec(requirementsText)) !== null) {
    ids.add(match[1].toUpperCase());
  }

  return [...ids].filter((id) => id !== 'R0').sort();
}

/**
 * Extract sub-criteria IDs (e.g. R3.4) ONLY when requirements.md declares them
 * as explicit literals — bold `**R3.4**` or a line-leading `R3.4`. Specs that
 * write acceptance criteria as a plain numbered list declare no such literals.
 * Every declared literal must have an explicit numeric task mapping.
 */
function extractSubCriteriaIds(requirementsText) {
  const ids = new Set();
  const re = /(?:^|\s)\**(R\d+\.\d+)\**/gim;
  let match;
  while ((match = re.exec(requirementsText)) !== null) {
    const id = match[1].toUpperCase();
    if (!id.startsWith('R0.')) ids.add(id);
  }
  return [...ids].sort();
}

function validateTaskSections(taskPath, content, errors) {
  const hasContext = hasHeading(content, 'Context');
  const hasConstraints = hasHeading(content, 'Constraints');
  const hasSteps =
    hasHeading(content, 'Steps') || hasHeading(content, 'Implementation Steps');
  const hasRequirements =
    hasHeading(content, 'Requirements') || /_Requirements:\s*[^_\n]+_/i.test(content);
  const hasRelatedFiles = hasHeading(content, 'Related Files');
  const hasCompletionCriteria = hasHeading(content, 'Completion Criteria');
  // legacy heading aliases: read-compat only, no longer advertised
  const hasEvidence =
    hasHeading(content, 'Evidence') ||
    hasHeading(content, 'Task Test Plan & Verification Evidence') ||
    hasHeading(content, 'Verification & Evidence');
  const hasRiskAssessment = hasHeading(content, 'Risk Assessment');

  if (!hasContext) errors.push(`${taskPath}: missing Context`);
  if (!hasConstraints) errors.push(`${taskPath}: missing Constraints`);
  if (!hasSteps) errors.push(`${taskPath}: missing Steps/Implementation Steps`);
  if (!hasRequirements) errors.push(`${taskPath}: missing Requirements mapping`);
  if (!hasRelatedFiles) errors.push(`${taskPath}: missing Related Files`);
  else if (relatedFilesSection(content).rows.length === 0) errors.push(`${taskPath}: Related Files section must not be empty`);
  if (!hasCompletionCriteria) errors.push(`${taskPath}: missing Completion Criteria`);
  if (!hasEvidence) errors.push(`${taskPath}: missing Evidence or task test plan`);
  if (!hasRiskAssessment) errors.push(`${taskPath}: missing Risk Assessment`);
  if (hasEvidence) {
    const evidenceSection = extractSection(content, 'Evidence')
      || extractSection(content, 'Task Test Plan & Verification Evidence')
      || extractSection(content, 'Verification & Evidence')
      || '';
    if (!/Runtime reachability verification/i.test(evidenceSection)) {
      errors.push(`${taskPath}: missing Runtime reachability verification`);
    } else {
      // Reachability must prove a concrete path/anchor, not just the phrase.
      // Require at least one of: backtick file path, Entrypoint/caller line, or anchor.
      const hasConcreteAnchor =
        /`[^`]*\.[a-z]{1,4}`/i.test(evidenceSection) ||
        /Entrypoint\/caller\s*:/i.test(evidenceSection) ||
        /Route is registered|import.*from|anchor:\s*`/i.test(evidenceSection);
      if (!hasConcreteAnchor) {
        errors.push(`${taskPath}: Runtime reachability verification must reference a concrete file path or anchor (e.g. \`src/...\` or Entrypoint/caller)`);
      } else {
        // Cross-check against declared Related Files paths
        const relatedPaths = new Set(relatedFilesSection(content).rows.map((r) => r.path));
        const referencedPaths = [...evidenceSection.matchAll(/`([^`]*\.[a-z0-9]{1,4})`/gi)].map((m) => m[1].replace(/^\.\//, ''));
        // At least one referenced path should correspond to a declared Related Files entry (or be clearly external)
        if (referencedPaths.length > 0 && relatedPaths.size > 0) {
          const overlaps = referencedPaths.some((p) => [...relatedPaths].some((rp) => p === rp || p.endsWith(rp) || rp.endsWith(p) || p.includes(rp.split('/').pop())));
          if (!overlaps && !/Entrypoint\/caller/i.test(evidenceSection)) {
            errors.push(`${taskPath}: Runtime reachability verification references no Related Files path — must anchor to a declared file`);
          }
        }
      }
    }
  }
}

/**
 * Task files are created from the scaffold template (the scaffold-guard hook
 * forces creation through it), so every task starts as a stub full of `{{...}}`
 * placeholders. The hook guarantees the stub is CREATED via scaffold, but
 * nothing guaranteed the model FILLED it. An unfilled `{{...}}` is an
 * incomplete task — SKILL.md: "Leave NO {{...}} placeholder ... fails DoCT" —
 * so it is a hard error here. A `.../` path fragment is a not-yet-resolved path
 * placeholder; it is only a warning, because it usually survives in prose Steps
 * while the Related Files table (which spec-ground.cjs does verify) is already
 * concrete. Matching `\.\.\.\/` (three dots + slash) avoids flagging a relative
 * `../` path or a prose ellipsis.
 */
function validateTaskPlaceholders(taskPath, content, errors, warnings) {
  const stub = content.match(/\{\{[^}\n]+\}\}/);
  if (stub) {
    errors.push(`${taskPath}: unfilled scaffold placeholder ${stub[0]} — task stub was not completed`);
  }
  if (/\.\.\.\//.test(content)) {
    warnings.push(`${taskPath}: contains a '.../' path placeholder — replace with a concrete path`);
  }
}

/**
 * Each phase completion must carry its own timestamp. Reusing `timestamps.init`
 * for a later phase is forbidden (SKILL.md spec.json Update Rules). This used to
 * be a prompt-only rule the model had to remember; here it is a hard backstop.
 */
function validateTimestamps(spec, errors) {
  const ts = spec.timestamps;
  if (!ts || typeof ts !== 'object') return;
  const init = ts.init;
  if (!init) return;

  for (const phase of ['requirements_done', 'design_done', 'tasks_done']) {
    if (ts[phase] && ts[phase] === init) {
      errors.push(
        `spec.json.timestamps.${phase}: reuses init timestamp (${init}); ` +
          'each phase must stamp its own completion time',
      );
    }
  }
}

/** Normalize a fenced code block body for byte-comparison: trim + collapse
 * trailing whitespace per line + drop blank edges. Keeps inner structure so a
 * real field rename (user_name vs userName) still differs. */
function normalizeBlock(body) {
  return body
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/^\n+|\n+$/g, '');
}

/**
 * Parse canonical contract definitions from design.md. A definition is an HTML
 * marker `<!-- contract:NAME -->` immediately followed by a fenced code block.
 * Returns a Map<name, normalizedBody>. Empty when the spec uses no markers —
 * which makes the whole cross-layer check opt-in (no effect on legacy specs).
 */
function extractContractDefs(designText) {
  const defs = new Map();
  const re = /<!--\s*contract:([A-Za-z0-9_.-]+)\s*-->\s*\n```[^\n]*\n([\s\S]*?)\n```/g;
  let match;
  while ((match = re.exec(designText)) !== null) {
    defs.set(match[1], normalizeBlock(match[2]));
  }
  return defs;
}

/**
 * From a task body, return the contracts it claims plus its local contract
 * copies. Shape: { names: string[], blocks: Map<name, string>, firstBlock: string|null }
 * `names` come from a `Contracts: A, B` line. `blocks` maps every
 * `<!-- contract:NAME -->` marker in the task to its fenced block, so a task
 * carrying multiple contracts has EACH copy verified (not just the first).
 * `firstBlock` keeps the legacy fallback for single-contract tasks that copy
 * the block without repeating the marker.
 */
function extractTaskContracts(taskText) {
  const names = [];
  const nameLine = taskText.match(/^\s*Contracts:\s*([^\n]+)$/im);
  if (nameLine) {
    for (const token of nameLine[1].split(',')) {
      const name = token.trim();
      if (name) names.push(name);
    }
  }
  const blocks = extractContractDefs(taskText); // same marker+fence grammar as design.md
  const blockMatch = taskText.match(/```[^\n]*\n([\s\S]*?)\n```/);
  const firstBlock = blockMatch ? normalizeBlock(blockMatch[1]) : null;
  return { names, blocks, firstBlock };
}

const RELATED_FILE_ACTIONS = new Set(['create', 'modify', 'delete', 'read']);

function relatedFilesSection(content) {
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
    rows.push({ path: filePath, action });
  }
  return { present: true, rows };
}

function unsafeRelatedPath(filePath) {
  return path.isAbsolute(filePath)
    || /^[A-Za-z]:[\\/]/.test(filePath)
    || filePath.split(/[\\/]+/).includes('..');
}

function validateRelatedFiles(taskPath, content, errors) {
  const section = relatedFilesSection(content);
  if (!section.present || section.rows.length === 0) return;
  for (const row of section.rows) {
    if (!RELATED_FILE_ACTIONS.has(row.action)) {
      errors.push(`${taskPath}: unsupported Related Files action "${row.action}" for ${row.path}`);
    }
    if (unsafeRelatedPath(row.path)) {
      errors.push(`${taskPath}: Related Files path must be relative and stay within work root: ${row.path}`);
    }
  }
}

function validateStateTransitions(spec, errors) {
  // Approval schema v2: generated, agent_validated, user_approved independent.
  // Legacy "approved" field is rejected fail-closed with migration guidance.
  const approvals = spec.approvals || {};
  let hasLegacy = false;
  for (const [stage, approval] of Object.entries(approvals)) {
    if (!approval || typeof approval !== 'object') {
      errors.push(`spec.json.approvals.${stage}: must be an object`);
      continue;
    }
    if ('approved' in approval) {
      errors.push(`spec.json.approvals.${stage}: ${LEGACY_APPROVAL_ERROR}`);
      hasLegacy = true;
    }
    // Unsupported/ambiguous: if schema_version missing when approvals use v2 shape, warn but not fail? B2 says fail closed.
    // We fail closed when version is unsupported or ambiguous and ready_for_implementation is true.
  }

  // Schema version validation
  if (spec.schema_version !== undefined && spec.schema_version !== APPROVAL_SCHEMA_VERSION) {
    errors.push(`spec.json.schema_version: unsupported "${spec.schema_version}", expected "${APPROVAL_SCHEMA_VERSION}" — migration required`);
  }
  if (spec.approval_schema_version !== undefined && spec.approval_schema_version !== APPROVAL_SCHEMA_VERSION) {
    errors.push(`spec.json.approval_schema_version: unsupported "${spec.approval_schema_version}", expected "${APPROVAL_SCHEMA_VERSION}"`);
  }
  // If approvals use v2 fields but no schema_version, treat as ambiguous — fail closed when ready flag is set
  const usesV2 = Object.values(approvals).some((a) => a && typeof a === 'object' && ('agent_validated' in a || 'user_approved' in a));
  if (usesV2 && spec.schema_version === undefined && spec.approval_schema_version === undefined) {
    // Only warn now; will be error if ready_for_implementation is true (checked below)
    // Provide guidance
    if (spec.ready_for_implementation === true) {
      errors.push(`spec.json.schema_version: missing — spec uses v2 approvals (agent_validated/user_approved) but has no schema_version "${APPROVAL_SCHEMA_VERSION}"`);
    }
  }

  if (spec.validation?.status === 'completed' && !spec.timestamps?.validation_done) {
    errors.push('spec.json.validation: completed transition requires timestamps.validation_done');
  }

  if (spec.ready_for_implementation === true) {
    if (hasLegacy) {
      errors.push(`spec.json.ready_for_implementation: cannot be true with legacy approval fields — migrate to agent_validated/user_approved`);
    }
    for (const stage of ['requirements', 'design', 'tasks']) {
      const approval = spec.approvals?.[stage];
      if (!approval || approval?.generated !== true || approval?.agent_validated !== true || approval?.user_approved !== true) {
        errors.push(`spec.json.ready_for_implementation: requires generated and agent_validated and user_approved ${stage} evidence (v2)`);
      }
    }
    if (spec.validation?.status === 'in_progress' || spec.validation?.status === 'not-run') {
      errors.push('spec.json.ready_for_implementation: cannot be true while validation evidence is incomplete');
    }
  }
}

function validateDependencyTopology(spec, taskFiles, registry, taskRecords, errors) {
  const dependencies = new Map(taskFiles.map((taskFile) => [taskFile, new Set(registry?.[taskFile]?.dependencies || [])]));
  if (dependencies.size === 0) return;

  const visiting = new Set();
  const visited = new Set();
  function visit(taskFile, stack = []) {
    if (visiting.has(taskFile)) {
      const cycleStart = stack.indexOf(taskFile);
      errors.push(`spec.json.task_registry.dependencies: dependency cycle detected (${stack.slice(cycleStart).concat(taskFile).join(' -> ')})`);
      return;
    }
    if (visited.has(taskFile)) return;
    visiting.add(taskFile);
    for (const dependency of dependencies.get(taskFile) || []) visit(dependency, [...stack, taskFile]);
    visiting.delete(taskFile);
    visited.add(taskFile);
  }
  for (const taskFile of taskFiles) visit(taskFile);

  const roots = taskFiles.filter((taskFile) => (dependencies.get(taskFile) || new Set()).size === 0);
  const reachable = new Set();
  const dependents = new Map(taskFiles.map((taskFile) => [taskFile, []]));
  for (const [taskFile, deps] of dependencies) {
    for (const dependency of deps) dependents.get(dependency)?.push(taskFile);
  }
  const queue = [...roots];
  while (queue.length > 0) {
    const taskFile = queue.shift();
    if (reachable.has(taskFile)) continue;
    reachable.add(taskFile);
    queue.push(...(dependents.get(taskFile) || []));
  }
  for (const taskFile of taskFiles) {
    if (!reachable.has(taskFile)) errors.push(`spec.json.task_registry.${taskFile}: orphan or unreachable task in dependency graph`);
  }

  function dependsOn(taskFile, ancestor, seen = new Set()) {
    if (taskFile === ancestor) return true;
    if (seen.has(taskFile)) return false;
    seen.add(taskFile);
    return [...(dependencies.get(taskFile) || [])].some((dependency) => dependsOn(dependency, ancestor, seen));
  }

  const producers = new Map();
  for (const [taskFile, record] of taskRecords) {
    for (const [index, row] of record.rows.entries()) {
      if (row.action !== 'create') continue;
      const prior = producers.get(row.path);
      if (prior && prior.taskFile !== taskFile) {
        errors.push(`${taskFile}: Related Files path ${row.path} is created by multiple tasks (${prior.taskFile}, ${taskFile})`);
      } else {
        producers.set(row.path, { taskFile, index });
      }
    }
  }
  // Lifecycle ordering: Create must precede Modify/Delete/Read within task for same path
  for (const [taskFile, record] of taskRecords) {
    const createIndexByPath = new Map();
    for (const [index, row] of record.rows.entries()) {
      if (row.action === 'create' && !createIndexByPath.has(row.path)) {
        createIndexByPath.set(row.path, index);
      }
    }
    for (const [index, row] of record.rows.entries()) {
      if (!['modify', 'delete', 'read'].includes(row.action)) continue;
      if (!createIndexByPath.has(row.path)) continue;
      const createIdx = createIndexByPath.get(row.path);
      if (createIdx > index) {
        errors.push(`${taskFile}: Create must precede ${row.action} for ${row.path} within Related Files order`);
      }
    }
  }
  // Cross-task lifecycle: Modify/Delete/Read of a path created by another task must depend on creator
  for (const [taskFile, record] of taskRecords) {
    for (const [index, row] of record.rows.entries()) {
      if (!['modify', 'delete', 'read'].includes(row.action)) continue;
      const producer = producers.get(row.path);
      if (!producer) continue;
      if (producer.taskFile === taskFile) continue;
      if (!dependsOn(taskFile, producer.taskFile)) {
        errors.push(`${taskFile}: ${row.action} of ${row.path} must depend on creator ${producer.taskFile}`);
      }
    }
  }

  // Existing implementation: Modify/Delete on non-produced paths must have a Read before them.
  // This ensures lifecycle Read is not skipped for existing files.
  for (const [taskFile, record] of taskRecords) {
    for (const [index, row] of record.rows.entries()) {
      if (!['modify', 'delete'].includes(row.action)) continue;
      if (producers.has(row.path)) continue; // produced by spec, not existing
      // Check if there's a Read for same path preceding this Modify/Delete
      let hasPrecedingRead = false;
      // Same task earlier row
      for (let i = 0; i < index; i += 1) {
        const r = record.rows[i];
        if (r.action === 'read' && r.path === row.path) { hasPrecedingRead = true; break; }
      }
      if (hasPrecedingRead) continue;
      // In any dependency ancestor
      const deps = dependencies.get(taskFile) || new Set();
      // Walk transitive deps for Read
      const stack = [...deps];
      const seen = new Set();
      while (stack.length > 0) {
        const dep = stack.pop();
        if (seen.has(dep)) continue;
        seen.add(dep);
        const depRecord = taskRecords.get(dep);
        if (depRecord && depRecord.rows.some((r) => r.action === 'read' && r.path === row.path)) {
          hasPrecedingRead = true; break;
        }
        for (const d of dependencies.get(dep) || []) stack.push(d);
      }
      if (!hasPrecedingRead) {
        errors.push(`${taskFile}: ${row.action} of ${row.path} targets existing implementation but has no preceding Read — add a Read for ${row.path} before modifying it (lifecycle ordering)`);
      }
    }
  }
}

function validateSpec(specDir) {
  const errors = [];
  const warnings = [];
  const specJsonPath = path.join(specDir, 'spec.json');

  if (!fs.existsSync(specDir)) {
    errors.push(`${specDir}: spec directory does not exist`);
    return { errors, warnings };
  }

  for (const forbidden of ['init.json', 'spec-state.json', 'hydration.md']) {
    if (fs.existsSync(path.join(specDir, forbidden))) {
      errors.push(`${forbidden}: forbidden generated artifact`);
    }
  }

  if (!fs.existsSync(specJsonPath)) {
    errors.push('spec.json: missing');
    return { errors, warnings };
  }

  const spec = readJson(specJsonPath, errors);
  if (!spec) return { errors, warnings };

  if (!spec.scope_lock || typeof spec.scope_lock !== 'object' || Array.isArray(spec.scope_lock)) {
    errors.push('spec.json.scope_lock: must be an object, not a boolean or array');
  }

  validateTimestamps(spec, errors);
  validateStateTransitions(spec, errors);

  const taskFiles = listTaskFiles(specDir);
  const taskFileSet = new Set(taskFiles);

  if (!Array.isArray(spec.task_files)) {
    errors.push('spec.json.task_files: missing array');
    if (Array.isArray(spec.tasks)) {
      errors.push('spec.json.tasks: legacy field detected; use task_files');
    }
  } else {
    const declared = [...spec.task_files].sort();
    if (JSON.stringify(declared) !== JSON.stringify(taskFiles)) {
      errors.push('spec.json.task_files: must exactly match files under tasks/');
      warnings.push(`expected task_files=${JSON.stringify(taskFiles)}`);
    }
  }

  if (!spec.task_registry || typeof spec.task_registry !== 'object' || Array.isArray(spec.task_registry)) {
    errors.push('spec.json.task_registry: missing object keyed by task file path');
  } else {
    const registryKeys = Object.keys(spec.task_registry).sort();
    if (JSON.stringify(registryKeys) !== JSON.stringify(taskFiles)) {
      errors.push('spec.json.task_registry: keys must exactly match task file paths');
    }

    for (const [registryPath, entry] of Object.entries(spec.task_registry)) {
      if (!taskFileSet.has(registryPath)) {
        errors.push(`spec.json.task_registry.${registryPath}: no matching task file`);
      }
      for (const key of REQUIRED_REGISTRY_KEYS) {
        if (!(key in (entry || {}))) {
          errors.push(`spec.json.task_registry.${registryPath}: missing ${key}`);
        }
      }
      if (entry && !Array.isArray(entry.dependencies)) {
        errors.push(`spec.json.task_registry.${registryPath}.dependencies: must be an array`);
      }
      for (const dep of entry?.dependencies || []) {
        if (!taskFileSet.has(dep)) {
          errors.push(`spec.json.task_registry.${registryPath}.dependencies: unknown dependency ${dep}`);
        }
      }
    }
  }

  for (const taskFile of taskFiles) {
    if (!TASK_PATH_RE.test(taskFile)) {
      errors.push(`${taskFile}: must match tasks/task-R{N}-{SEQ}-<slug>.md with two-digit SEQ`);
    }
  }

  if (taskFiles.length > 2 && taskFiles.every((taskFile) => /^tasks\/task-R0-/.test(taskFile))) {
    errors.push('tasks/: feature work cannot be entirely R0; reserve R0 for shared foundation tasks');
  }

  const validationRecommended = spec.design_context?.validation_recommended === true;
  if (taskFiles.length >= 5 && !validationRecommended) {
    errors.push('spec.json.design_context.validation_recommended: must be true for specs with 5+ task files');
  }
  if (
    (validationRecommended || taskFiles.length >= 5) &&
    spec.ready_for_implementation === true &&
    spec.validation?.status !== 'completed'
  ) {
    errors.push(
      'spec.json.ready_for_implementation: cannot be true when validation is recommended but validation.status is not completed',
    );
  }
  if (spec.validation?.status === 'completed') {
    if (!spec.timestamps?.validation_done) {
      errors.push('spec.json.timestamps.validation_done: required when validation.status is completed');
    }
    if (taskFiles.length >= 5 && !spec.timestamps?.review_done) {
      errors.push('spec.json.timestamps.review_done: required for 5+ task specs after validation');
    }
  }

  const requirementsPath = path.join(specDir, 'requirements.md');
  const designPath = path.join(specDir, 'design.md');
  const researchPath = path.join(specDir, 'research.md');

  if (!fs.existsSync(requirementsPath)) errors.push('requirements.md: missing');
  if (!fs.existsSync(designPath)) errors.push('design.md: missing');

  if (taskFiles.length > 0) {
    if (!fs.existsSync(researchPath)) {
      errors.push('research.md: missing Evidence Summary for non-trivial spec');
    } else {
      const research = fs.readFileSync(researchPath, 'utf8');
      if (!/^##\s+Evidence Summary\s*$/m.test(research)) {
        errors.push('research.md: missing ## Evidence Summary');
      }
    }
  }

  let requirementIds = [];
  let subCriteriaIds = [];
  if (fs.existsSync(requirementsPath)) {
    const requirementsText = fs.readFileSync(requirementsPath, 'utf8');
    requirementIds = extractRequirementIds(requirementsText);
    subCriteriaIds = extractSubCriteriaIds(requirementsText);
  }

  const coveredRequirementIds = new Set();
  const coveredSubCriteriaIds = new Set();
  const taskRecords = new Map();
  // Cross-layer contract defs (opt-in): empty unless design.md uses
  // <!-- contract:NAME --> markers, so legacy specs are unaffected.
  const contractDefs = fs.existsSync(designPath)
    ? extractContractDefs(fs.readFileSync(designPath, 'utf8'))
    : new Map();
  if (taskFiles.length >= 5 && contractDefs.size === 0) {
    errors.push(
      'design.md: 5+ task spec requires contract blocks for BE/FE shared shapes (<!-- contract:NAME -->) — fail closed, not warning',
    );
  }
  for (const taskFile of taskFiles) {
    const fullPath = path.join(specDir, taskFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    validateTaskSections(taskFile, content, errors);
    validateTaskPlaceholders(taskFile, content, errors, warnings);
    validateRelatedFiles(taskFile, content, errors);
    taskRecords.set(taskFile, { rows: relatedFilesSection(content).rows });

    // Requirement traceability: only structured _Requirements: ..._ mappings inside Steps/Requirements sections count.
    // Incidental mentions elsewhere (prose Context, Constraints) must not be counted.
    const stepsSection = extractSection(content, 'Steps') || extractSection(content, 'Implementation Steps') || '';
    const reqSectionInTask = extractSection(content, 'Requirements') || '';
    const mappingSource = `${stepsSection}\n${reqSectionInTask}`;
    // Also consider inline _Requirements: inside Steps bullet lines that may be outside section extraction edge cases,
    // so fallback to whole content scanning only if sections are null (e.g., malformed heading). But prefer scoped.
    const effectiveMappingSource = mappingSource.trim() ? mappingSource : content;
    const numericMappingRe = /_Requirements:\s*([^_\n]+)_/gi;
    let match;
    while ((match = numericMappingRe.exec(effectiveMappingSource)) !== null) {
      for (const token of match[1].split(',')) {
        const trimmed = token.trim();
        const major = trimmed.match(/^(\d+)(?:\.\d+)?$/);
        if (major) coveredRequirementIds.add(`R${major[1]}`);
        // Record the full sub-criterion (e.g. 3.4 -> R3.4) for per-criterion coverage.
        const sub = trimmed.match(/^(\d+\.\d+)$/);
        if (sub) coveredSubCriteriaIds.add(`R${sub[1]}`);
      }
    }

    // Cross-layer contract check (opt-in via design.md markers). When a task
    // claims `Contracts: NAME`, design.md must define the name and the task's
    // local copy must match the canonical definition byte-for-byte (after
    // whitespace normalization). This catches BE/FE drift like user_name vs
    // userName before integration, and rejects declarations with no canonical
    // source instead of silently accepting an orphan contract.
    const { names, blocks, firstBlock } = extractTaskContracts(content);
    if (names.length > 0 && contractDefs.size === 0) {
      errors.push(`${taskFile}: declares contract(s) but design.md defines no canonical contract blocks`);
    }
    if (contractDefs.size > 0) {
      for (const name of names) {
        if (!contractDefs.has(name)) {
          errors.push(`${taskFile}: declares unknown contract "${name}" (not defined in design.md)`);
          continue;
        }
        // Prefer the task's marker-tagged copy for this contract; fall back to
        // the first fenced block only for single-contract tasks (legacy format).
        const localCopy = blocks.has(name)
          ? blocks.get(name)
          : (names.length === 1 ? firstBlock : null);
        if (localCopy === null) {
          errors.push(`${taskFile}: contract "${name}" is missing a copied canonical block`);
          continue;
        }
        if (localCopy !== contractDefs.get(name)) {
          errors.push(`${taskFile}: contract "${name}" body diverges from the canonical definition in design.md`);
        }
      }
      // Marker-tagged blocks not declared on the Contracts: line are drift risks.
      for (const taggedName of blocks.keys()) {
        if (!names.includes(taggedName)) {
          warnings.push(`${taskFile}: carries <!-- contract:${taggedName} --> block but does not declare it on the Contracts: line`);
        }
      }
    }
  }

  validateDependencyTopology(spec, taskFiles, spec.task_registry, taskRecords, errors);

  for (const requirementId of requirementIds) {
    if (!coveredRequirementIds.has(requirementId)) {
      errors.push(`requirements.md:${requirementId}: not covered by any task`);
    }
  }

  // Per-criterion coverage: every explicit R{N}.{M} literal in requirements.md
  // must appear in a numeric `_Requirements: x.y_` task mapping.
  if (subCriteriaIds.length > 0) {
    for (const subId of subCriteriaIds) {
      if (!coveredSubCriteriaIds.has(subId)) {
        errors.push(`requirements.md:${subId}: acceptance criterion not covered by any task`);
      }
    }
  }

  if (spec.ready_for_implementation === true && errors.length > 0) {
    errors.push('spec.json.ready_for_implementation: cannot be true while validator errors exist');
  }

  return { errors, warnings };
}

function main() {
  const specDir = resolveSpecDir(process.argv[2]);
  if (!specDir) {
    usage();
    process.exit(2);
  }

  const { errors, warnings } = validateSpec(specDir);
  for (const warning of warnings) {
    console.warn(`[WARN] ${warning}`);
  }

  if (errors.length > 0) {
    console.error(`FAIL ${path.relative(process.cwd(), specDir) || specDir}`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`PASS ${path.relative(process.cwd(), specDir) || specDir}`);
}

main();
