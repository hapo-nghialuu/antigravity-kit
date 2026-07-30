'use strict';

const fs = require('fs');
const path = require('path');
const { resolveProjectPath } = require('./hook-context.cjs');

function specsDirectory(projectRoot, runtime) {
  return resolveProjectPath(
    projectRoot,
    runtime.paths?.specs,
    'specs'
  );
}

function findActiveSpec(projectRoot, runtime) {
  const specsDir = specsDirectory(projectRoot, runtime);
  if (!fs.existsSync(specsDir)) return null;
  const entries = fs.readdirSync(specsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    const file = path.join(specsDir, entry.name, 'spec.json');
    if (!fs.existsSync(file)) continue;
    try {
      const spec = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (spec.status === 'in_progress' || spec.status === 'in-progress') {
        return { featureName: entry.name, spec, specsDir };
      }
    } catch {
      // Ignore an unrelated malformed spec and continue discovery.
    }
  }
  return null;
}

function taskStatusMap(spec) {
  return Object.fromEntries(
    Object.entries(spec.task_registry || {}).map(([taskPath, task]) => [
      taskPath,
      task?.status || 'pending'
    ])
  );
}

module.exports = {
  findActiveSpec,
  specsDirectory,
  taskStatusMap
};
