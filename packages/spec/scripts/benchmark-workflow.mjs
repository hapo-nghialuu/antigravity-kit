#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const LANES = ['Direct', 'Standard', 'Critical'];
const ARMS = ['baseline', 'treatment'];
const RECEIPT_METRICS = ['wall_ms', 'input_tokens', 'output_tokens', 'context_loaded_tokens', 'tool_calls', 'subagent_calls', 'user_corrections', 'useful_reviewer_findings', 'false_positive_reviewer_findings'];
const QUALITY = ['correctness', 'regression', 'unsupported_completion_claim'];

function fail(message) { throw new Error(message); }
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { fail(`${file}: invalid JSON (${error.message})`); }
}
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
function sha(value) { return `sha256:${crypto.createHash('sha256').update(canonical(value)).digest('hex')}`; }
function rawSha(value) { return `sha256:${crypto.createHash('sha256').update(value).digest('hex')}`; }
function concrete(value, name) {
  if (typeof value !== 'string' || !value.trim() || /<[^>]+>|\{\{.+\}\}|placeholder|example|replace_me|change_me|todo|tbd|unknown|changeme|your[_-]/i.test(value) || /^sha256:0+$/.test(value)) fail(`${name}: missing or placeholder freeze field`);
  return value;
}
function hash(value, name) {
  concrete(value, name);
  if (!/^sha256:[0-9a-f]{64}$/.test(value)) fail(`${name}: expected sha256:<64 hex>`);
}
function object(value, name) { if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${name}: expected object`); }
function nonnegative(value, name, integer = false) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || (integer && !Number.isInteger(value))) fail(`${name}: expected non-negative ${integer ? 'integer' : 'number'}`);
}
function validateCorpus(corpus) {
  if (corpus?.schema_version !== 'b1.v1') fail('corpus.schema_version: expected b1.v1');
  if (!['frozen', 'example_template'].includes(corpus?.status)) fail('corpus.status: expected frozen or example_template');
  concrete(corpus?.corpus_id, 'corpus.corpus_id');
  if (!Array.isArray(corpus.tasks) || !corpus.tasks.length) fail('corpus.tasks: expected non-empty array');
  const ids = new Set();
  for (const [index, task] of corpus.tasks.entries()) {
    const p = `corpus.tasks[${index}]`;
    concrete(task.task_id, `${p}.task_id`);
    if (ids.has(task.task_id)) fail(`duplicate task_id: ${task.task_id}`); ids.add(task.task_id);
    if (!LANES.includes(task.lane)) fail(`${p}.lane: invalid lane`);
    const hasPrompt = Object.hasOwn(task, 'prompt');
    const hasPromptHash = Object.hasOwn(task, 'prompt_sha256');
    if (hasPrompt === hasPromptHash) fail(`${p}: exactly one of prompt or prompt_sha256 required`);
    if (hasPrompt) concrete(task.prompt, `${p}.prompt`);
    else hash(task.prompt_sha256, `${p}.prompt_sha256`);
    concrete(task.repo_sample, `${p}.repo_sample`);
    object(task.acceptance, `${p}.acceptance`); object(task.risk, `${p}.risk`);
    if (!Object.keys(task.acceptance).length || !Object.keys(task.risk).length) fail(`${p}: acceptance/risk metadata cannot be empty`);
  }
  return sha(corpus);
}
function validateConfig(config, corpusHash) {
  if (config?.schema_version !== 'b1.v1') fail('config.schema_version: expected b1.v1');
  if (config.status !== 'frozen') fail('config.status: must be frozen; placeholders cannot run');
  if (!ARMS.includes(config.arm)) fail('config.arm: expected baseline or treatment');
  object(config.model, 'config.model'); concrete(config.model.name, 'config.model.name'); concrete(config.model.version, 'config.model.version');
  concrete(config.reasoning_effort, 'config.reasoning_effort'); concrete(config.experiment_id, 'config.experiment_id');
  object(config.repo, 'config.repo'); concrete(config.repo.identifier, 'config.repo.identifier'); concrete(config.repo.commit, 'config.repo.commit'); hash(config.repo.clean_initial_tree_sha, 'config.repo.clean_initial_tree_sha');
  hash(config.permissions_fingerprint, 'config.permissions_fingerprint'); hash(config.tool_availability_fingerprint, 'config.tool_availability_fingerprint');
  for (const rate of ['input_usd_per_1k', 'output_usd_per_1k']) if (config[rate] !== undefined) nonnegative(config[rate], `config.${rate}`);
  if (config.corpus_sha256 !== corpusHash) fail('config.corpus_sha256: does not match corpus');
  hash(config.config_sha256, 'config.config_sha256');
  const withoutHash = { ...config }; delete withoutHash.config_sha256;
  if (sha(withoutHash) !== config.config_sha256) fail('config.config_sha256: freeze hash mismatch');
  object(config.repeat_policy, 'config.repeat_policy');
  nonnegative(config.repeat_policy.repeats_per_task, 'config.repeat_policy.repeats_per_task', true);
  if (!config.repeat_policy.repeats_per_task || config.repeat_policy.context_isolated !== true) fail('config.repeat_policy: require positive repeats_per_task and context_isolated=true');
  return config;
}
function comparableConfig(config) {
  const { arm, config_sha256: ignoredHash, ...shared } = config;
  return canonical(shared);
}
function validateArtifact(evidence, receiptDir) {
  const ref = evidence.artifact_ref;
  if (typeof ref !== 'string' || path.isAbsolute(ref) || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(ref)) fail('receipt.evidence.artifact_ref: expected a relative local file, not a URI');
  concrete(ref, 'receipt.evidence.artifact_ref');
  const bundlePath = path.resolve(receiptDir);
  const artifactPath = path.resolve(bundlePath, ref);
  const relativeArtifact = path.relative(bundlePath, artifactPath);
  if (relativeArtifact === '..' || relativeArtifact.startsWith(`..${path.sep}`) || path.isAbsolute(relativeArtifact)) fail('receipt.evidence.artifact_ref: path escapes receipt bundle directory');
  let bundleRealPath;
  let artifactRealPath;
  try {
    bundleRealPath = fs.realpathSync(bundlePath);
    artifactRealPath = fs.realpathSync(artifactPath);
  } catch { fail('receipt.evidence.artifact_ref: local artifact does not exist'); }
  const relativeRealArtifact = path.relative(bundleRealPath, artifactRealPath);
  if (relativeRealArtifact === '..' || relativeRealArtifact.startsWith(`..${path.sep}`) || path.isAbsolute(relativeRealArtifact)) fail('receipt.evidence.artifact_ref: resolved artifact escapes receipt bundle directory');
  let bytes;
  try { bytes = fs.readFileSync(artifactRealPath); }
  catch { fail('receipt.evidence.artifact_ref: local artifact does not exist'); }
  if (rawSha(bytes) !== evidence.artifact_sha256) fail('receipt.evidence.artifact_sha256: raw-byte hash mismatch');
}
function validateReceipt(receipt, config, taskIds, receiptDir) {
  object(receipt, 'receipt');
  concrete(receipt.task_id, 'receipt.task_id'); if (!taskIds.has(receipt.task_id)) fail(`receipt.task_id: unknown task ${receipt.task_id}`);
  if (receipt.lane !== taskIds.get(receipt.task_id)) fail('receipt.lane: does not match corpus');
  if (receipt.arm !== config.arm || receipt.corpus_sha256 !== config.corpus_sha256 || receipt.config_sha256 !== config.config_sha256) fail('receipt: frozen hash or arm mismatch');
  if (receipt.model?.name !== config.model.name || receipt.model?.version !== config.model.version || receipt.reasoning_effort !== config.reasoning_effort) fail('receipt: model/reasoning freeze mismatch');
  if (receipt.repo_commit !== config.repo.commit || receipt.clean_initial_tree_sha !== config.repo.clean_initial_tree_sha || receipt.permissions_fingerprint !== config.permissions_fingerprint || receipt.tool_availability_fingerprint !== config.tool_availability_fingerprint) fail('receipt: repository/permission/tool freeze mismatch');
  nonnegative(receipt.repeat, 'receipt.repeat', true); if (!receipt.repeat) fail('receipt.repeat: must be positive');
  if (receipt.repeat > config.repeat_policy.repeats_per_task) fail('receipt.repeat: exceeds repeat_policy.repeats_per_task');
  for (const metric of RECEIPT_METRICS) nonnegative(receipt[metric], `receipt.${metric}`, metric !== 'wall_ms');
  for (const metric of QUALITY) if (typeof receipt[metric] !== 'boolean') fail(`receipt.${metric}: expected boolean`);
  object(receipt.evidence, 'receipt.evidence'); hash(receipt.evidence.artifact_sha256, 'receipt.evidence.artifact_sha256'); concrete(receipt.evidence.command, 'receipt.evidence.command');
  validateArtifact(receipt.evidence, receiptDir);
}
function loadReceipts(file) { const value = readJson(file); const receipts = Array.isArray(value) ? value : value?.receipts; if (!Array.isArray(receipts)) fail('receipts: expected array or {receipts: []}'); return receipts; }
function matrixCoverage(receipts, configs, corpus) {
  const repeats = configs[0].value.repeat_policy.repeats_per_task;
  const arms = {};
  for (const { value: config } of configs) {
    arms[config.arm] = {};
    for (const lane of LANES) {
      const expected = corpus.tasks.filter((task) => task.lane === lane).flatMap((task) => Array.from({ length: repeats }, (_, index) => `${task.task_id}/${index + 1}`)).sort();
      const actual = receipts.filter((receipt) => receipt.arm === config.arm && receipt.lane === lane).map((receipt) => `${receipt.task_id}/${receipt.repeat}`).sort();
      arms[config.arm][lane] = { complete: actual.length === expected.length && expected.every((key) => actual.includes(key)), expected_receipts: expected.length, actual_receipts: actual.length, missing: expected.filter((key) => !actual.includes(key)), unexpected: actual.filter((key) => !expected.includes(key)) };
    }
  }
  const coverage = { arms, complete: Object.values(arms).every((lanes) => LANES.every((lane) => lanes[lane].complete)) };
  return coverage;
}
function validateCompleteMatrix(coverage) {
  if (coverage.complete) return;
  const missing = Object.entries(coverage.arms).flatMap(([arm, lanes]) => Object.entries(lanes).flatMap(([lane, matrix]) => matrix.missing.map((key) => `${arm}/${lane}/${key}`)));
  fail(`incomplete receipt matrix: missing ${missing.join(', ') || 'expected task/repeat coverage'}`);
}
function validateAll(corpusFile, configFiles, receiptFile, requireCompleteMatrix = false) {
  const corpus = readJson(corpusFile); const corpusHash = validateCorpus(corpus); const taskIds = new Map(corpus.tasks.map((task) => [task.task_id, task.lane]));
  if (corpus.status === 'example_template' && receiptFile) fail('example_template corpus: receipt validation and live summary are not allowed');
  const configs = configFiles.map((file) => ({ file, value: readJson(file) })); configs.forEach(({ value }) => validateConfig(value, corpusHash));
  const arms = configs.map(({ value }) => value.arm);
  if (new Set(arms).size !== arms.length) fail('configs: duplicate arm; supply at most one baseline and one treatment config');
  if (configs.length === 2 && comparableConfig(configs[0].value) !== comparableConfig(configs[1].value)) fail('configs: baseline and treatment must share all freeze metadata and differ only by arm');
  const receipts = receiptFile ? loadReceipts(receiptFile) : [];
  if (receiptFile) {
    const byHash = new Map(configs.map(({ value }) => [value.config_sha256, value])); const seen = new Set();
    for (const receipt of receipts) {
      const config = byHash.get(receipt.config_sha256); if (!config) fail(`receipt.config_sha256: no supplied frozen config (${receipt.config_sha256})`);
      validateReceipt(receipt, config, taskIds, path.dirname(path.resolve(receiptFile))); const key = `${receipt.arm}/${receipt.task_id}/${receipt.repeat}`;
      if (seen.has(key)) fail(`duplicate arm/task/repeat: ${key}`); seen.add(key);
    }
  }
  const matrix = receiptFile ? matrixCoverage(receipts, configs, corpus) : null;
  if (requireCompleteMatrix && matrix) validateCompleteMatrix(matrix);
  return { corpus, configs: configs.map(({ value }) => value), corpusHash, receipts, matrix };
}
function quantile(values, q) { const sorted = [...values].sort((a, b) => a - b); if (!sorted.length) return null; const index = (sorted.length - 1) * q; const low = Math.floor(index); const high = Math.ceil(index); return sorted[low] + (sorted[high] - sorted[low]) * (index - low); }
function summaryStats(values) { return { p25: quantile(values, 0.25), median: quantile(values, 0.5), p75: quantile(values, 0.75) }; }
function summarize(receipts, configs, corpus, suppliedCoverage) {
  const groups = {};
  for (const receipt of receipts) {
    groups[receipt.arm] ??= {};
    const group = groups[receipt.arm][receipt.lane] ??= { receipt_count: 0, task_ids: new Set(), matrix_keys: new Set(), metrics: {}, quality_rates: {} };
    group.receipt_count++;
    group.task_ids.add(receipt.task_id);
    group.matrix_keys.add(`${receipt.task_id}/${receipt.repeat}`);
  }
  for (const receipt of receipts) {
    const group = groups[receipt.arm][receipt.lane];
    const config = configs.find((item) => item.config_sha256 === receipt.config_sha256);
    const values = { ...receipt, estimated_cost_usd: (receipt.input_tokens * (config.input_usd_per_1k ?? 0) + receipt.output_tokens * (config.output_usd_per_1k ?? 0)) / 1000 };
    for (const key of [...RECEIPT_METRICS, 'estimated_cost_usd']) (group.metrics[key] ??= []).push(values[key]);
    for (const key of QUALITY) (group.quality_rates[key] ??= []).push(receipt[key] ? 1 : 0);
    for (const [key, value] of Object.entries({ user_correction_rate: receipt.user_corrections, useful_reviewer_finding_rate: receipt.useful_reviewer_findings, false_positive_reviewer_finding_rate: receipt.false_positive_reviewer_findings })) (group.quality_rates[key] ??= []).push(value);
  }
  for (const arm of Object.keys(groups)) for (const lane of Object.keys(groups[arm])) {
    const group = groups[arm][lane]; group.task_ids = [...group.task_ids].sort();
    for (const key of Object.keys(group.metrics)) group.metrics[key] = summaryStats(group.metrics[key]);
    for (const key of Object.keys(group.quality_rates)) group.quality_rates[key] = group.quality_rates[key].reduce((a, b) => a + b, 0) / group.quality_rates[key].length;
  }
  const coverage = suppliedCoverage ?? matrixCoverage(receipts, configs.map((value) => ({ value })), corpus);
  const emptyMatrix = { complete: false, expected_receipts: 0, actual_receipts: 0, missing: [], unexpected: [] };
  let ready = receipts.length > 0 && ARMS.every((arm) => groups[arm]);
  const gates = {};
  for (const lane of LANES.filter((item) => corpus.tasks.some((task) => task.lane === item))) {
    const expected = coverage.arms.baseline?.[lane] ? coverage.arms.baseline[lane].missing.concat(coverage.arms.baseline[lane].unexpected) : [];
    const baseline = coverage.arms.baseline?.[lane] ?? { ...emptyMatrix, missing: expected };
    const treatment = coverage.arms.treatment?.[lane] ?? emptyMatrix;
    const complete = baseline.complete && treatment.complete;
    const base = groups.baseline?.[lane]; const current = groups.treatment?.[lane];
    const relativeQuality = complete && current.quality_rates.correctness >= base.quality_rates.correctness && current.quality_rates.regression <= base.quality_rates.regression && current.quality_rates.unsupported_completion_claim <= base.quality_rates.unsupported_completion_claim && current.quality_rates.user_correction_rate <= base.quality_rates.user_correction_rate && current.quality_rates.useful_reviewer_finding_rate >= base.quality_rates.useful_reviewer_finding_rate && current.quality_rates.false_positive_reviewer_finding_rate <= base.quality_rates.false_positive_reviewer_finding_rate;
    const absoluteQuality = !['Direct', 'Standard'].includes(lane) || (complete && current.quality_rates.correctness === 1 && current.quality_rates.regression === 0 && current.quality_rates.unsupported_completion_claim === 0);
    const quality = complete && relativeQuality && absoluteQuality;
    const efficiency = quality && ['Direct', 'Standard'].includes(lane) && current.metrics.wall_ms.median < base.metrics.wall_ms.median && current.metrics.estimated_cost_usd.median < base.metrics.estimated_cost_usd.median;
    const pass = complete && (lane === 'Critical' ? quality : efficiency);
    gates[lane] = { comparable_tasks: complete, baseline_matrix: baseline, treatment_matrix: treatment, quality_pass: Boolean(quality), efficiency_pass: Boolean(efficiency), pass };
    ready &&= pass;
  }
  for (const arm of Object.keys(groups)) for (const lane of Object.keys(groups[arm])) delete groups[arm][lane].matrix_keys;
  return { status: receipts.length ? (ready ? 'ready' : 'not-ready') : 'exploratory/no-live-runs', live_runs: receipts.length > 0, groups, rollout_recommendation: { status: receipts.length && ready ? 'ready' : receipts.length ? 'not-ready' : 'exploratory', gates } };
}
function args(argv) { const out = { _: [] }; for (let i = 0; i < argv.length; i++) { const item = argv[i]; if (item.startsWith('--')) { const key = item.slice(2).replaceAll('-', '_'); out[key] = key === 'config' ? [...(out[key] ?? []), argv[++i]] : argv[++i]; } else out._.push(item); } return out; }
function main() { const flags = args(process.argv.slice(2)); if (!['validate', 'summarize'].includes(flags._[0])) fail('usage: benchmark-workflow.mjs validate|summarize --corpus FILE --config FILE [--config FILE] [--receipts FILE]'); const configs = Array.isArray(flags.config) ? flags.config : [flags.config]; if (!flags.corpus || !configs[0]) fail('corpus and config are required'); const result = validateAll(flags.corpus, configs, flags.receipts, flags._[0] === 'validate'); if (flags._[0] === 'summarize') { const receipts = result.receipts; process.stdout.write(`${JSON.stringify(summarize(receipts, result.configs, result.corpus, result.matrix), null, 2)}\n`); } else process.stdout.write(`${JSON.stringify({ status: flags.receipts ? 'valid' : 'valid_no_receipts', corpus_sha256: result.corpusHash, config_sha256: result.configs.map((config) => config.config_sha256) }, null, 2)}\n`); }
try { main(); } catch (error) { process.stderr.write(`benchmark validation failed: ${error.message}\n`); process.exitCode = 2; }
