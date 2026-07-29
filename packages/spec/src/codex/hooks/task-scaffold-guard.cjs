#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const {
  getHookContext,
  logCrash,
  readPayload
} = require('./lib/hook-context.cjs');

function addedFiles(toolName, input) {
  if (toolName === 'Write') {
    return [input.file_path || input.filePath || input.path || ''].filter(Boolean);
  }
  if (toolName !== 'apply_patch') return [];
  const patch = typeof input.command === 'string'
    ? input.command
    : typeof input.patch === 'string' ? input.patch : '';
  return [...patch.matchAll(/^\*\*\* Add File:\s+(.+)$/gm)]
    .map((match) => match[1].trim());
}

function projectRelative(filePath, projectRoot, sessionCwd) {
  const absolute = path.isAbsolute(filePath)
    ? path.normalize(filePath)
    : path.resolve(sessionCwd, filePath);
  return path.relative(projectRoot, absolute).replace(/\\/g, '/');
}

try {
  const payload = readPayload();
  if (!payload) process.exit(0);
  const { projectRoot, runtime, sessionCwd } = getHookContext(payload);
  const candidates = addedFiles(payload.tool_name || '', payload.tool_input || {});
  const taskFile = candidates
    .map((requested) => ({
      requested,
      relative: projectRelative(requested, projectRoot, sessionCwd)
    }))
    .find(({ relative }) => (
      /^specs\/[^/]+\/tasks\/task-[^/]+\.md$/.test(relative)
    ));
  if (!taskFile) process.exit(0);
  if (runtime.spec?.scaffold_guard === false) process.exit(0);

  const scaffold = path.join(projectRoot, '.codex', 'scripts', 'spec-scaffold.cjs');
  if (!fs.existsSync(scaffold)) process.exit(0);

  const feature = taskFile.relative.split('/')[1];
  const command = sessionCwd === projectRoot
    ? `node .codex/scripts/spec-scaffold.cjs ${feature}`
    : `node ${JSON.stringify(scaffold)} ${feature}`;
  process.stderr.write(
    'TASK SCAFFOLD REQUIRED: task files must be generated, not hand-written.\n'
    + `Blocked Write: ${taskFile.requested}\n\n`
    + 'Generate the stubs, then fill their {{...}} placeholders with apply_patch:\n'
    + `  ${command} --tasks "R0-01-slug,R1-01-slug,..." --tasks-only\n`
  );
  process.exit(2);
} catch (error) {
  logCrash('task-scaffold-guard', error);
}
