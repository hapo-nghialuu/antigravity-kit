#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const SEMANTIC = require('./spec-semantic-model.cjs');
const VALIDATOR = require('./validate-spec-output.cjs');
const { canonicalProjectRoot, groundSpec } = require('./spec-ground.cjs');

function plain(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function exactKeys(value, fields) {
  return plain(value)
    && JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...fields].sort());
}

function readReviewResult(input) {
  if (!exactKeys(input, ['reviewed_criteria', 'counterexamples'])) {
    throw new Error('semantic review result fields must be exactly reviewed_criteria and counterexamples');
  }
  return JSON.parse(JSON.stringify(input));
}

function atomicReplace(file, bytes, io = fs) {
  const stat = io.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('spec.json must be a regular non-symlink file');
  const original = io.readFileSync(file);
  const temporary = path.join(path.dirname(file), `.${path.basename(file)}.finalize-${process.pid}-${Date.now()}`);
  let descriptor;
  try {
    descriptor = io.openSync(temporary, 'wx', stat.mode);
    io.writeFileSync(descriptor, bytes);
    io.fsyncSync(descriptor);
    io.closeSync(descriptor);
    descriptor = undefined;
    if (process.env.CAFEKIT_FINALIZE_FAIL_BEFORE_RENAME === '1') throw new Error('injected finalization failure before rename');
    io.renameSync(temporary, file);
  } catch (error) {
    if (descriptor !== undefined) try { io.closeSync(descriptor); } catch {}
    try { io.unlinkSync(temporary); } catch {}
    if (!io.readFileSync(file).equals(original)) {
      const rollback = `${temporary}-rollback`;
      try {
        io.writeFileSync(rollback, original, { flag: 'wx', mode: stat.mode });
        io.renameSync(rollback, file);
      } finally { try { io.unlinkSync(rollback); } catch {} }
    }
    throw error;
  }
}

function finalizeReadiness({ specDir, reviewResult, projectRoot, io = fs }) {
  const directory = io.realpathSync(path.resolve(specDir));
  const root = projectRoot ? io.realpathSync(path.resolve(projectRoot)) : canonicalProjectRoot(directory);
  const relative = path.relative(root, directory);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error('spec directory escapes the canonical project root');
  }
  const specFile = path.join(directory, 'spec.json');
  const original = io.readFileSync(specFile);
  let spec;
  try { spec = JSON.parse(original); } catch (error) { throw new Error(`spec.json is invalid JSON (${error.message})`); }
  if (!plain(spec) || spec.schema_version !== '2.1') throw new Error('readiness finalization accepts canonical schema 2.1 only');
  const review = readReviewResult(reviewResult);
  const projection = SEMANTIC.modelFromMarkdown(directory, spec);
  if (projection.errors.length) throw new Error(`semantic projection failed (${projection.errors.join('; ')})`);
  const candidate = JSON.parse(JSON.stringify(spec));
  candidate.semantic_model = projection.model;
  candidate.validation = {
    status: 'completed',
    semantic_review: {
      status: 'not-run', semantic_digest: null, reviewed_criteria: [], counterexamples: [],
    },
  };
  candidate.ready_for_implementation = false;
  const digestResult = VALIDATOR.computeSemanticDigest21(directory, candidate);
  if (digestResult.errors.length) throw new Error(`semantic digest failed (${digestResult.errors.join('; ')})`);
  candidate.validation.semantic_review = {
    status: 'completed', semantic_digest: digestResult.digest,
    reviewed_criteria: review.reviewed_criteria, counterexamples: review.counterexamples,
  };
  candidate.ready_for_implementation = true;
  candidate.updated_at = new Date().toISOString();
  const validation = VALIDATOR.validateSpec(directory, candidate);
  if (validation.errors.length) throw new Error(`readiness validation failed (${validation.errors.join('; ')})`);
  const grounding = groundSpec({ specDir: directory, root, spec: candidate });
  if (grounding.errors.length) throw new Error(`readiness grounding failed (${grounding.errors.join('; ')})`);
  const bytes = Buffer.from(`${JSON.stringify(candidate, null, 2)}\n`);
  atomicReplace(specFile, bytes, io);
  return { spec: candidate, semantic_digest: digestResult.digest };
}

function usage() {
  process.stderr.write('Usage: node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>\n');
}

function main() {
  const args = process.argv.slice(2);
  const marker = args.indexOf('--review-result');
  if (args.length !== 3 || marker !== 1) { usage(); process.exitCode = 2; return; }
  try {
    const reviewFile = path.resolve(args[2]);
    const reviewStat = fs.lstatSync(reviewFile);
    if (!reviewStat.isFile() || reviewStat.isSymbolicLink()) throw new Error('review result must be a regular non-symlink JSON file');
    const reviewResult = JSON.parse(fs.readFileSync(reviewFile, 'utf8'));
    const result = finalizeReadiness({ specDir: args[0], reviewResult });
    process.stdout.write(`SPEC_READY ${args[0]} ${result.semantic_digest}\n`);
  } catch (error) {
    process.stderr.write(`SPEC_NOT_READY ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { atomicReplace, finalizeReadiness, readReviewResult };

if (require.main === module) main();
