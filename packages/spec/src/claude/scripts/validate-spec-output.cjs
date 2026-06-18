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
 * write acceptance criteria as a plain numbered list under a heading declare no
 * such literals, so this returns empty and per-criterion coverage is skipped
 * for them (no behaviour change). This is a progressive check: it rewards an
 * unambiguous format, it never penalises the legacy one.
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
  if (!hasCompletionCriteria) errors.push(`${taskPath}: missing Completion Criteria`);
  if (!hasEvidence) errors.push(`${taskPath}: missing Evidence or task test plan`);
  if (!hasRiskAssessment) errors.push(`${taskPath}: missing Risk Assessment`);
  if (hasEvidence && !/Runtime reachability verification/i.test(content)) {
    errors.push(`${taskPath}: missing Runtime reachability verification`);
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
  for (const taskFile of taskFiles) {
    const fullPath = path.join(specDir, taskFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    validateTaskSections(taskFile, content, errors);

    const idRe = /\b((?:REQ-\d+)|(?:R\d+))\b/gi;
    let match;
    while ((match = idRe.exec(content)) !== null) {
      const id = match[1].toUpperCase();
      if (id !== 'R0') coveredRequirementIds.add(id);
    }

    const numericMappingRe = /_Requirements:\s*([^_\n]+)_/gi;
    while ((match = numericMappingRe.exec(content)) !== null) {
      for (const token of match[1].split(',')) {
        const trimmed = token.trim();
        const major = trimmed.match(/^(\d+)(?:\.\d+)?$/);
        if (major) coveredRequirementIds.add(`R${major[1]}`);
        // Record the full sub-criterion (e.g. 3.4 -> R3.4) for per-criterion coverage.
        const sub = trimmed.match(/^(\d+\.\d+)$/);
        if (sub) coveredSubCriteriaIds.add(`R${sub[1]}`);
      }
    }
  }

  for (const requirementId of requirementIds) {
    if (!coveredRequirementIds.has(requirementId)) {
      errors.push(`requirements.md:${requirementId}: not covered by any task`);
    }
  }

  // Per-criterion coverage: only enforced when requirements.md declares explicit
  // R{N}.{M} literals AND tasks use the numeric `_Requirements: x.y_` mapping.
  // If a spec declares sub-criteria but no task maps any at sub-level, that is the
  // legacy coarse format (major-only) — skip silently to avoid false failures.
  if (subCriteriaIds.length > 0 && coveredSubCriteriaIds.size > 0) {
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
