'use strict';

const fs = require('fs');
const path = require('path');

function specsDirectory(projectRoot, runtime) {
  const rel = runtime && runtime.paths && typeof runtime.paths.specs === 'string' && runtime.paths.specs.trim()
    ? runtime.paths.specs.trim()
    : 'specs';
  const resolved = path.resolve(projectRoot, rel);
  assertSpecsRootContained(projectRoot, resolved);
  return resolved;
}

function isMissingError(e) {
  return e && (e.code === 'ENOENT' || e.code === 'ENOTDIR');
}

function isPathInside(parentReal, childReal) {
  if (parentReal === childReal) return false;
  const rel = path.relative(parentReal, childReal);
  return rel !== '' && rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
}

function isPathInsideOrEqual(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function assertSpecsRootContained(projectRoot, specsDir) {
  const projectPath = path.resolve(projectRoot);
  const specsPath = path.resolve(specsDir);
  if (!isPathInsideOrEqual(projectPath, specsPath)) {
    throw candidateError('configured specs root escapes project root', 'SPECS_ROOT_OUTSIDE_PROJECT');
  }

  let projectReal;
  try {
    projectReal = fs.realpathSync(projectPath);
  } catch (e) {
    throw candidateError(`project root canonicalization error: ${e.message}`, 'PROJECT_ROOT_INVALID');
  }

  let probe = specsPath;
  try {
    while (!fs.existsSync(probe)) {
      const parent = path.dirname(probe);
      if (parent === probe) break;
      probe = parent;
    }
    const canonicalProbe = fs.realpathSync(probe);
    if (!isPathInsideOrEqual(projectReal, canonicalProbe)) {
      throw candidateError('configured specs root traverses outside project root', 'SPECS_ROOT_OUTSIDE_PROJECT');
    }
  } catch (e) {
    if (e && e.code === 'SPECS_ROOT_OUTSIDE_PROJECT') throw e;
    throw candidateError(`configured specs root canonicalization error: ${e.message}`, 'SPECS_ROOT_INVALID');
  }
}

function isPlainObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function candidateError(reason, code = 'malformed') {
  const error = new Error(reason);
  error.code = code;
  return error;
}

function inspectFeature(specsDir, canonicalSpecs, requestedName) {
  const featureDir = path.join(specsDir, requestedName);
  let featureLstat;
  try {
    featureLstat = fs.lstatSync(featureDir);
  } catch (e) {
    if (isMissingError(e)) return { missing: true };
    throw candidateError(`feature lstat error: ${e.message}`);
  }

  let canonicalFeature;
  try {
    canonicalFeature = fs.realpathSync(featureDir);
    if (!fs.statSync(featureDir).isDirectory()) {
      throw candidateError('feature entry must be a directory');
    }
  } catch (e) {
    if (e && e.code) throw e;
    throw candidateError(`feature canonicalization error: ${e.message}`);
  }
  if (canonicalFeature !== canonicalSpecs && !isPathInside(canonicalSpecs, canonicalFeature)) {
    throw candidateError('feature symlink escapes specs root');
  }
  if (path.dirname(canonicalFeature) !== canonicalSpecs) {
    throw candidateError('feature directory must resolve to a direct child of specs root');
  }

  const featureName = path.basename(canonicalFeature);
  const specFile = path.join(featureDir, 'spec.json');
  let specLstat;
  try {
    specLstat = fs.lstatSync(specFile);
  } catch (e) {
    if (isMissingError(e)) return { missingSpec: true, featureName, featureDir, canonicalFeature, specFile };
    throw candidateError(`spec.json lstat error: ${e.message}`);
  }

  let canonicalSpecFile;
  try {
    canonicalSpecFile = fs.realpathSync(specFile);
    if (!fs.statSync(specFile).isFile()) {
      throw candidateError('spec.json must be a regular file');
    }
  } catch (e) {
    if (e && e.code) throw e;
    throw candidateError(`spec.json canonicalization error: ${e.message}`);
  }
  if (canonicalSpecFile !== canonicalSpecs && !isPathInside(canonicalSpecs, canonicalSpecFile)) {
    throw candidateError('spec file symlink escapes specs root');
  }
  const expectedSpecFile = path.join(canonicalFeature, 'spec.json');
  if (canonicalSpecFile !== expectedSpecFile) {
    throw candidateError(`spec.json does not belong to feature directory ${featureName}`);
  }

  let spec;
  try {
    spec = JSON.parse(fs.readFileSync(canonicalSpecFile, 'utf8'));
  } catch (e) {
    throw candidateError(e.message);
  }
  if (!isPlainObject(spec)) throw candidateError('spec.json must contain a JSON object');
  if (typeof spec.feature_name !== 'string' || spec.feature_name.trim() !== featureName) {
    throw candidateError(`spec.json.feature_name must equal canonical feature name ${featureName}`);
  }

  return {
    featureName,
    spec,
    specsDir,
    featureDir: canonicalFeature,
    specFile: canonicalSpecFile,
    canonicalFeature,
    canonicalSpecFile,
    featureLstat,
    specLstat,
  };
}

function scanSpecs(specsDir) {
  let canonicalSpecs;
  let specsLstat = null;
  try {
    specsLstat = fs.lstatSync(specsDir);
  } catch (e) {
    if (isMissingError(e)) return { active: [], candidates: [], invalid: [], canonicalSpecs: path.resolve(specsDir) };
    return { active: [], candidates: [], invalid: [{ featureName: '<specs>', reason: `specs lstat error: ${e.message}`, specFile: specsDir }], canonicalSpecs: path.resolve(specsDir) };
  }
  try {
    canonicalSpecs = fs.realpathSync(specsDir);
  } catch (e) {
    return { active: [], candidates: [], invalid: [{ featureName: '<specs>', reason: `specs root canonicalization error: ${e.message}`, specFile: specsDir }], canonicalSpecs: path.resolve(specsDir) };
  }

  let entries;
  try {
    entries = fs.readdirSync(specsDir, { withFileTypes: true });
  } catch (e) {
    return { active: [], candidates: [], invalid: [{ featureName: '<specs>', reason: `specs directory read error: ${e.message}`, specFile: specsDir }], canonicalSpecs };
  }
  const active = [];
  const candidates = [];
  const invalid = [];
  const seenCanonicalFeatures = new Set();
  const sorted = entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of sorted) {
    try {
      const candidate = inspectFeature(specsDir, canonicalSpecs, entry.name);
      if (candidate.missing) {
        invalid.push({
          featureName: entry.name,
          reason: 'feature entry disappeared during scan',
          specFile: path.join(specsDir, entry.name, 'spec.json'),
        });
        continue;
      }
      if (candidate.missingSpec) {
        continue;
      }
      if (seenCanonicalFeatures.has(candidate.canonicalFeature)) continue;
      seenCanonicalFeatures.add(candidate.canonicalFeature);
      candidates.push(candidate);
      if (candidate.spec.status === 'in_progress' || candidate.spec.status === 'in-progress') {
        active.push(candidate);
      }
    } catch (e) {
      invalid.push({
        featureName: entry.name,
        reason: e.message,
        specFile: path.join(specsDir, entry.name, 'spec.json'),
      });
    }
  }
  return { active, candidates, invalid, canonicalSpecs };
}

function findAllSpecCandidates(projectRoot, runtime) {
  let specsDir;
  try {
    specsDir = specsDirectory(projectRoot, runtime);
  } catch (error) {
    const wrapped = new Error(`Invalid spec candidates: <specs>: ${error.message}`);
    wrapped.code = 'INVALID_SPECS';
    wrapped.invalid = [{ featureName: '<specs>', reason: error.message, specFile: path.resolve(projectRoot, 'specs') }];
    throw wrapped;
  }
  const scanned = scanSpecs(specsDir);
  if (scanned.invalid.length > 0) {
    const error = new Error(`Invalid spec candidates: ${scanned.invalid.map((item) => `${item.featureName}: ${item.reason}`).join('; ')}`);
    error.code = 'INVALID_SPECS';
    error.invalid = scanned.invalid;
    throw error;
  }
  return scanned.candidates.sort((left, right) => left.featureName.localeCompare(right.featureName));
}

function findAllActiveSpecs(projectRoot, runtime) {
  let specsDir;
  try {
    specsDir = specsDirectory(projectRoot, runtime);
  } catch (error) {
    const wrapped = new Error(`Invalid spec candidates: <specs>: ${error.message}`);
    wrapped.code = 'INVALID_SPECS';
    wrapped.invalid = [{ featureName: '<specs>', reason: error.message, specFile: path.resolve(projectRoot, 'specs') }];
    throw wrapped;
  }
  const { active, invalid } = scanSpecs(specsDir);
  if (invalid.length > 0) {
    const error = new Error(`Invalid spec candidates: ${invalid.map((item) => `${item.featureName}: ${item.reason}`).join('; ')}`);
    error.code = 'INVALID_SPECS';
    error.invalid = invalid;
    throw error;
  }
  return active;
}

function isPathInsideLegacy(parent, child) {
  const rel = path.relative(parent, child);
  return rel !== '' && !rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel);
}

function explicitTargetValue(value) {
  return typeof value === 'string' ? value.trim() : value;
}

/**
 * Normalize host-provided feature targets without making runtime adapters
 * guess from the first active directory. The resolver remains the authority
 * for containment, existence, JSON, and ambiguity checks.
 */
function extractExplicitTarget(...sources) {
  for (const source of sources.flat()) {
    if (!source || typeof source !== 'object') continue;

    for (const key of ['explicitFeature', 'featureName', 'feature']) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        return { explicitFeature: explicitTargetValue(source[key]) };
      }
    }
    for (const key of ['explicitPath', 'specPath', 'spec_path', 'featurePath']) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        return { explicitPath: explicitTargetValue(source[key]) };
      }
    }

    const target = source.target;
    if (target && typeof target === 'object') {
      const nested = extractExplicitTarget(target);
      if (nested) return nested;
    }
    if (Object.prototype.hasOwnProperty.call(source, 'target')) {
      const targetValue = explicitTargetValue(target);
      return /[\\/]/.test(targetValue) || /(?:^|[\\/])spec\.json$/.test(targetValue)
        ? { explicitPath: targetValue }
        : { explicitFeature: targetValue };
    }
  }
  return null;
}

function lstatOptional(p) {
  try {
    const s = fs.lstatSync(p);
    return { exists: true, stat: s, isSymlink: s.isSymbolicLink(), error: null };
  } catch (e) {
    if (isMissingError(e)) return { exists: false, stat: null, isSymlink: false, error: null };
    return { exists: false, stat: null, isSymlink: false, error: e };
  }
}

function resolveActiveSpec({ projectRoot, runtime, explicitFeature, explicitPath, target } = {}) {
  if (!projectRoot) throw new TypeError('projectRoot required');
  const rt = runtime || {};
  const normalizedTarget = extractExplicitTarget(target);
  if (explicitFeature === undefined && normalizedTarget
    && Object.prototype.hasOwnProperty.call(normalizedTarget, 'explicitFeature')) {
    explicitFeature = normalizedTarget.explicitFeature;
  }
  if (explicitPath === undefined && normalizedTarget
    && Object.prototype.hasOwnProperty.call(normalizedTarget, 'explicitPath')) {
    explicitPath = normalizedTarget.explicitPath;
  }
  const hasExplicitFeature = explicitFeature !== undefined && explicitFeature !== null;
  const hasExplicitPath = explicitPath !== undefined && explicitPath !== null;
  const hasExplicitTarget = hasExplicitFeature || hasExplicitPath;
  let specsDir;
  try {
    specsDir = specsDirectory(projectRoot, rt);
  } catch (error) {
    return {
      error: hasExplicitTarget ? 'explicit_malformed' : 'invalid_specs',
      candidates: ['<specs>'],
      explicitFeature,
      explicitPath,
      reason: error.message,
    };
  }
  let canonicalSpecs;
  const specsLstat = lstatOptional(specsDir);
  if (specsLstat.error) {
    if (hasExplicitTarget) {
      return { error: 'explicit_malformed', explicitFeature, explicitPath, reason: `specs lstat error: ${specsLstat.error.message}` };
    }
    return { error: 'invalid_specs', candidates: ['<specs>'], invalid: [{ featureName: '<specs>', reason: `specs lstat error: ${specsLstat.error.message}`, specFile: specsDir }], reason: `Invalid spec JSON: <specs>: specs lstat error: ${specsLstat.error.message}` };
  }
  if (!specsLstat.exists) {
    canonicalSpecs = path.resolve(specsDir);
  } else {
    try {
      canonicalSpecs = fs.realpathSync(specsDir);
    } catch (e) {
      if (hasExplicitTarget) {
        return { error: 'explicit_malformed', explicitFeature, explicitPath, reason: `specs root canonicalization error: ${e.message}` };
      }
      return { error: 'invalid_specs', candidates: ['<specs>'], invalid: [{ featureName: '<specs>', reason: `specs root canonicalization error: ${e.message}`, specFile: specsDir }], reason: `Invalid spec JSON: <specs>: specs root canonicalization error: ${e.message}` };
    }
  }

  if (hasExplicitFeature) {
    if (typeof explicitFeature !== 'string' || explicitFeature.trim() === '' || explicitFeature.includes('/') || explicitFeature.includes('\\') || explicitFeature.includes('..')) {
      return { error: 'explicit_malformed', explicitFeature, reason: `malformed feature name: ${explicitFeature}` };
    }
    const featureDir = path.join(specsDir, explicitFeature);
    const resolvedFeature = path.resolve(featureDir);
    if (!isPathInsideLegacy(path.resolve(specsDir), resolvedFeature) && resolvedFeature !== path.resolve(specsDir)) {
      return { error: 'explicit_malformed', explicitFeature, reason: 'feature path escapes specs root' };
    }
    if (path.relative(path.resolve(specsDir), resolvedFeature) !== explicitFeature) {
      return { error: 'explicit_malformed', explicitFeature, reason: 'feature name does not canonicalize inside specs root' };
    }
    try {
      const candidate = inspectFeature(specsDir, canonicalSpecs, explicitFeature);
      if (candidate.missing || candidate.missingSpec) {
        return { error: 'explicit_not_found', explicitFeature, reason: `spec not found for feature ${explicitFeature}` };
      }
      if (candidate.featureName !== explicitFeature) {
        return {
          error: 'explicit_malformed',
          explicitFeature,
          reason: `feature directory resolves to canonical feature ${candidate.featureName}`,
        };
      }
      return candidate;
    } catch (e) {
      return { error: 'explicit_malformed', explicitFeature, reason: e.message };
    }
  }

  if (hasExplicitPath) {
    if (typeof explicitPath !== 'string' || explicitPath.trim() === '') {
      return { error: 'explicit_malformed', explicitPath, reason: 'empty explicit path' };
    }
    let specFile = explicitPath;
    if (!path.isAbsolute(specFile)) {
      specFile = path.resolve(projectRoot, specFile);
    } else {
      specFile = path.resolve(specFile);
    }
    try {
      const st = fs.lstatSync(specFile);
      if (st.isDirectory()) {
        specFile = path.join(specFile, 'spec.json');
      } else if (st.isSymbolicLink()) {
        try {
          if (fs.statSync(specFile).isDirectory()) specFile = path.join(specFile, 'spec.json');
        } catch (e) {
          if (!isMissingError(e)) throw e;
        }
      }
    } catch (e) {
      if (!isMissingError(e)) {
        return { error: 'explicit_malformed', explicitPath, reason: `explicit path stat error: ${e.message}` };
      }
      // If lstat is missing, the candidate is handled as an explicit not-found below.
    }
    const featureDir = path.dirname(specFile);
    if (!isPathInsideLegacy(path.resolve(specsDir), path.resolve(featureDir)) && path.resolve(featureDir) !== path.resolve(specsDir)) {
      return { error: 'explicit_malformed', explicitPath, reason: 'explicit path escapes specs root' };
    }
    const rel = path.relative(path.resolve(specsDir), path.resolve(specFile));
    const segs = rel.split(path.sep);
    if (segs.length !== 2 || segs[1] !== 'spec.json') {
      return { error: 'explicit_malformed', explicitPath, reason: 'explicit path must be <specs>/<feature>/spec.json or <specs>/<feature>' };
    }
    try {
      const candidate = inspectFeature(specsDir, canonicalSpecs, segs[0]);
      if (candidate.missing || candidate.missingSpec) {
        return { error: 'explicit_not_found', explicitPath, reason: `spec not found at ${explicitPath}` };
      }
      if (candidate.featureName !== segs[0]) {
        return {
          error: 'explicit_malformed',
          explicitPath,
          reason: `explicit path resolves to canonical feature ${candidate.featureName}, not ${segs[0]}`,
        };
      }
      return candidate;
    } catch (e) {
      return { error: 'explicit_malformed', explicitPath, reason: e.message };
    }
  }

  const { active, invalid } = scanSpecs(specsDir);
  if (invalid.length > 0) {
    return {
      error: 'invalid_specs',
      candidates: invalid.map((i) => i.featureName),
      invalid,
      reason: `Invalid spec JSON: ${invalid.map((i) => `${i.featureName}: ${i.reason}`).join('; ')}`,
    };
  }
  active.sort((left, right) => left.featureName.localeCompare(right.featureName));
  if (active.length === 0) return null;
  if (active.length === 1) return active[0];
  return {
    error: 'multiple_active',
    candidates: active.map((a) => a.featureName),
    active,
    reason: `Multiple active specs found: ${active.map((a) => a.featureName).join(', ')}. Provide explicit feature.`,
  };
}

/**
 * Resolve one persisted feature identity. Explicit host targets are inspected
 * directly and never scan siblings; only the no-target path performs a global
 * persisted-candidate scan and therefore owns ambiguity/invalid-sibling errors.
 */
function resolvePersistedSpec({ projectRoot, runtime, explicitFeature, explicitPath, target } = {}) {
  const normalized = extractExplicitTarget(
    target,
    explicitFeature !== undefined ? { explicitFeature } : null,
    explicitPath !== undefined ? { explicitPath } : null,
  );
  if (normalized) {
    const value = Object.prototype.hasOwnProperty.call(normalized, 'explicitFeature')
      ? normalized.explicitFeature
      : normalized.explicitPath;
    if (value === null || value === undefined) {
      return { error: 'explicit_malformed', ...normalized, reason: 'explicit target must be a non-empty string' };
    }
    return resolveActiveSpec({ projectRoot, runtime, ...normalized });
  }
  try {
    const candidates = findAllSpecCandidates(projectRoot, runtime);
    if (candidates.length === 0) return null;
    if (candidates.length === 1) return candidates[0];
    return {
      error: 'multiple_persisted',
      candidates: candidates.map((candidate) => candidate.featureName),
      reason: `Multiple persisted specs found: ${candidates.map((candidate) => candidate.featureName).join(', ')}. Provide explicit feature.`,
    };
  } catch (error) {
    return {
      error: 'invalid_specs',
      candidates: Array.isArray(error.invalid)
        ? error.invalid.map((entry) => entry.featureName)
        : ['<specs>'],
      invalid: error.invalid || [],
      reason: error.message,
    };
  }
}

module.exports = {
  specsDirectory,
  findAllActiveSpecs,
  findAllSpecCandidates,
  extractExplicitTarget,
  resolveActiveSpec,
  resolvePersistedSpec,
};
