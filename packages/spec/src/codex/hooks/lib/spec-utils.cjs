'use strict';

const fs = require('fs');
const path = require('path');

// Installed Codex hooks use .codex/scripts; source tests use the Claude-side
// source path. If an installed resolver exists but is malformed, do not fall
// back to another copy: the shared authority is unavailable.
const RESOLVER_CANDIDATES = [
  path.join(__dirname, '../../scripts/spec-resolver.cjs'),
  path.join(__dirname, '../../../claude/scripts/spec-resolver.cjs'),
];

function sharedResolver() {
  const candidate = RESOLVER_CANDIDATES.find((file) => fs.existsSync(file)) || RESOLVER_CANDIDATES[0];
  try {
    const resolver = require(candidate);
    if (typeof resolver?.resolveActiveSpec !== 'function') {
      throw new Error('shared spec resolver has no resolveActiveSpec function');
    }
    return resolver;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${message} (${candidate})`);
  }
}

function specsDirectory(projectRoot, runtime) {
  return sharedResolver().specsDirectory(projectRoot, runtime);
}

function findAllActiveSpecs(projectRoot, runtime) {
  return sharedResolver().findAllActiveSpecs(projectRoot, runtime);
}

function findAllSpecCandidates(projectRoot, runtime) {
  return sharedResolver().findAllSpecCandidates(projectRoot, runtime);
}

function resolveActiveSpec(projectRoot, runtime, explicitFeature, explicitPath) {
  if (projectRoot && typeof projectRoot === 'object') {
    return sharedResolver().resolveActiveSpec(projectRoot);
  }
  return sharedResolver().resolveActiveSpec({
    projectRoot,
    runtime,
    explicitFeature,
    explicitPath,
  });
}

function findActiveSpec(projectRoot, runtime) {
  const resolved = resolveActiveSpec(projectRoot, runtime);
  if (!resolved) return null;
  if (resolved.error === 'multiple_active' || resolved.error === 'invalid_specs') return resolved;
  if (resolved.error) return null;
  return resolved;
}

function taskStatusMap(spec) {
  return Object.fromEntries(
    Object.entries(spec.task_registry || {}).map(([taskPath, task]) => [
      taskPath,
      task?.status || 'pending',
    ]),
  );
}

module.exports = {
  findActiveSpec,
  findAllActiveSpecs,
  findAllSpecCandidates,
  resolveActiveSpec,
  specsDirectory,
  taskStatusMap,
};
