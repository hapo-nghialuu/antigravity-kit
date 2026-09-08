/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * omp tool-name normalisation.
 *
 * omp's tool registry uses lowercase names — `bash`, `read`, `edit`, `write`, `grep` —
 * while the gate scripts were authored against Claude Code's capitalised names and
 * compare them exactly (see `privacy-block.cjs`, which tests `toolName === 'Bash'`).
 * Without this, a `bash` payload skips the command-scanning branch entirely and a
 * secret-bearing command is never examined.
 *
 * Only names omp actually emits are mapped. An unknown name is returned unchanged, so
 * a new omp tool degrades to "not specially handled" rather than being silently
 * renamed into a rule it does not belong to.
 */

const OMP_TO_CLAUDE = {
  bash: 'Bash',
  read: 'Read',
  edit: 'Edit',
  write: 'Write',
  grep: 'Grep',
  glob: 'Glob',
  find: 'Glob',
  ls: 'Glob',
  webfetch: 'WebFetch',
  websearch: 'WebSearch',
};

/** Claude's name for an omp tool, or the input unchanged when unknown. */
function normalizeToolName(name) {
  if (typeof name !== 'string' || name === '') return name;
  return Object.prototype.hasOwnProperty.call(OMP_TO_CLAUDE, name) ? OMP_TO_CLAUDE[name] : name;
}

module.exports = { OMP_TO_CLAUDE, normalizeToolName };
