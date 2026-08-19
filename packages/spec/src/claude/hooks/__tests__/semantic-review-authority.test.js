'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.resolve(__dirname, '../../../..');
const VALIDATOR = path.join(PACKAGE_ROOT, 'src/claude/scripts/validate-spec-output.cjs');
const HOOKS = ['claude', 'codex'].map((runtime) => path.join(PACKAGE_ROOT, `src/${runtime}/hooks/semantic-review-authority.cjs`));

function fixture(base, name) {
  const root = path.join(base, name);
  const specDir = path.join(root, 'specs', 'feature');
  fs.mkdirSync(specDir, { recursive: true });
  fs.writeFileSync(path.join(specDir, 'requirements.md'), '# Requirements\n\n- **R1.1** The service shall return one result.\n');
  fs.writeFileSync(path.join(specDir, 'design.md'), '# Design\n\n### D1 — Stable result\n\nReturn one stable result.\n');
  fs.writeFileSync(path.join(specDir, 'spec.json'), `${JSON.stringify({ feature_name: 'feature', status: 'in_progress', task_registry: {}, workflow_policy: { assurance_level: 'Strict' } })}\n`);
  return { root, specDir, specFile: path.join(specDir, 'spec.json') };
}

function installSemanticRuntime(target, runtime) {
  const runtimeRoot = path.join(target.root, runtime === 'claude' ? '.claude' : '.codex');
  const hooks = path.join(runtimeRoot, 'hooks');
  const scripts = path.join(runtimeRoot, 'scripts');
  fs.mkdirSync(path.join(hooks, 'lib'), { recursive: true });
  fs.cpSync(path.join(PACKAGE_ROOT, 'src/claude/scripts'), scripts, { recursive: true });
  for (const name of ['semantic-review-authority.cjs', 'completion-authority-state.cjs']) {
    fs.copyFileSync(path.join(PACKAGE_ROOT, `src/${runtime}/hooks`, name), path.join(hooks, name));
  }
  fs.copyFileSync(
    path.join(PACKAGE_ROOT, 'src/claude/hooks/lib/runtime-path-safety.cjs'),
    path.join(hooks, 'lib/runtime-path-safety.cjs'),
  );
  return {
    hook: path.join(hooks, 'semantic-review-authority.cjs'),
    validator: path.join(scripts, 'validate-spec-output.cjs'),
  };
}

function envFor(root, home) {
  return { ...process.env, HOME: home, USERPROFILE: home, PROJECT_ROOT: root };
}

function digest(target, home) {
  const result = spawnSync(process.execPath, [VALIDATOR, target.specDir, '--semantic-digest'], { cwd: target.root, env: envFor(target.root, home), encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return result.stdout.trim();
}

function claim(target, semanticDigest, overrides = {}) {
  return `CAFEKIT_SEMANTIC_REVIEW_ATTESTATION ${JSON.stringify({ feature_name: 'feature', spec_file: 'specs/feature/spec.json', semantic_digest: semanticDigest, verdict: 'PASS', ...overrides })}`;
}

function runHook(hook, target, home, message, event = 'SubagentStop', payload = {}) {
  return spawnSync(process.execPath, [hook], {
    cwd: target.root, env: envFor(target.root, home), encoding: 'utf8',
    input: JSON.stringify({ hook_event_name: event, session_id: 'host-session', agent_id: 'review-agent', agent_type: 'code_auditor', last_assistant_message: message, cwd: target.root, ...payload }),
  });
}

function verify(hook, target, home, semanticDigest) {
  const script = 'const a=require(process.argv[1]); console.log(JSON.stringify(a.verifyAttestation(process.argv[2],process.argv[3],process.argv[4],process.argv[5])))';
  const result = spawnSync(process.execPath, ['-e', script, hook, target.root, target.specFile, 'feature', semanticDigest], { env: envFor(target.root, home), encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

function observationFile(home) {
  const files = fs.readdirSync(home, { recursive: true }).filter((entry) => String(entry).endsWith('.json') && String(entry).includes('observation-'));
  assert.equal(files.length, 1);
  return path.join(home, files[0]);
}

test('Claude and Codex observe equivalent allowlisted SubagentStop claims with HMAC integrity', () => {
  for (const hook of HOOKS) {
    const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-semantic-authority-'));
    try {
      const target = fixture(base, 'project');
      const home = path.join(base, 'home');
      const current = digest(target, home);
      assert.equal(runHook(hook, target, home, claim(target, current), 'SessionStart').stderr, '');
      assert.equal(fs.existsSync(path.join(home, '.cafekit')), false, 'non-SubagentStop event wrote authority state');
      assert.equal(runHook(hook, target, home, 'Ordinary worker finished without a semantic review claim.').stderr, '');
      assert.equal(fs.existsSync(path.join(home, '.cafekit')), false, 'ordinary SubagentStop wrote authority state');
      const recorded = runHook(hook, target, home, claim(target, current));
      assert.equal(recorded.status, 0);
      assert.equal(recorded.stderr, '');
      const observed = verify(hook, target, home, current);
      assert.equal(observed.ok, true);
      assert.equal(observed.record.kind, 'semantic-review-observation');
      assert.equal(observed.record.event, 'SubagentStop');

      const before = current;
      const spec = JSON.parse(fs.readFileSync(target.specFile, 'utf8'));
      spec.status = 'done';
      spec.updated_at = '2026-08-13T12:00:00+07:00';
      fs.writeFileSync(target.specFile, `${JSON.stringify(spec)}\n`);
      assert.equal(digest(target, home), before);
      assert.equal(verify(hook, target, home, before).ok, true);

      fs.appendFileSync(path.join(target.specDir, 'requirements.md'), '\nSemantic behavior changed.\n');
      const changed = digest(target, home);
      assert.notEqual(changed, before);
      assert.match(verify(hook, target, home, changed).reason, /stale/);
    } finally { fs.rmSync(base, { recursive: true, force: true }); }
  }
});

test('observation rejects wrong identity, digest, verdict, tampered MAC, copied record, and self-authored strings', () => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-semantic-adversarial-'));
  try {
    const home = path.join(base, 'home');
    const first = fixture(base, 'first');
    const second = fixture(base, 'second');
    const firstDigest = digest(first, home);
    const secondDigest = digest(second, home);
    const hook = HOOKS[0];

    for (const badClaim of [
      claim(first, `sha256:${'0'.repeat(64)}`),
      claim(first, firstDigest, { verdict: 'FAIL' }),
      claim(first, firstDigest, { feature_name: 'copied-feature' }),
      claim(first, firstDigest, { spec_file: 'specs/missing/spec.json' }),
    ]) {
      const result = runHook(hook, first, home, badClaim);
      assert.match(result.stderr, /rejected/);
    }
    assert.equal(verify(hook, first, home, firstDigest).ok, false, 'self-authored claims created authority');

    assert.equal(runHook(hook, first, home, claim(first, firstDigest)).stderr, '');
    const firstRecordPath = observationFile(home);
    const firstRecord = fs.readFileSync(firstRecordPath);
    assert.equal(runHook(hook, second, home, claim(second, secondDigest)).stderr, '');
    const records = fs.readdirSync(home, { recursive: true }).filter((entry) => String(entry).includes('observation-'));
    assert.equal(records.length, 2);
    const secondRecordPath = records.map((entry) => path.join(home, entry)).find((file) => file !== firstRecordPath);
    fs.writeFileSync(secondRecordPath, firstRecord);
    assert.equal(verify(hook, second, home, secondDigest).ok, false, 'copied project record was accepted');

    const tampered = JSON.parse(fs.readFileSync(firstRecordPath, 'utf8'));
    tampered.verdict = 'FAIL';
    fs.writeFileSync(firstRecordPath, `${JSON.stringify(tampered)}\n`);
    assert.match(verify(hook, first, home, firstDigest).reason, /MAC|malformed/);
  } finally { fs.rmSync(base, { recursive: true, force: true }); }
});

test('SubagentStop markers and claimed capabilities cannot turn a non-reviewer into authority', () => {
  for (const hook of HOOKS) {
    const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-semantic-role-'));
    try {
      const target = fixture(base, 'project');
      const home = path.join(base, 'home');
      const current = digest(target, home);
      for (const payload of [
        { agent_type: 'implementer' },
        { agent_type: 'test_runner', capability: 'reviewer' },
        { agent_type: 'worker', reviewer_capability: true },
      ]) {
        const result = runHook(hook, target, home, claim(target, current), 'SubagentStop', payload);
        assert.equal(result.status, 0);
        assert.equal(result.stderr, '');
        assert.equal(verify(hook, target, home, current).ok, false);
      }
      assert.equal(runHook(hook, target, home, claim(target, current), 'SubagentStop', { agent_type: 'code-auditor' }).stderr, '');
      assert.equal(verify(hook, target, home, current).ok, true);
    } finally { fs.rmSync(base, { recursive: true, force: true }); }
  }
});

test('canonicalizes and contains the validator before semantic digest spawn', () => {
  for (const runtime of ['claude', 'codex']) {
    const base = fs.mkdtempSync(path.join(os.tmpdir(), `cafekit-semantic-validator-${runtime}-`));
    try {
      const target = fixture(base, 'project');
      const installed = installSemanticRuntime(target, runtime);
      const digestValue = digest(target, path.join(base, 'digest-home'));
      const validHome = path.join(base, 'valid-home');
      const valid = runHook(installed.hook, target, validHome, claim(target, digestValue));
      assert.equal(valid.status, 0);
      assert.equal(valid.stderr, '', `${runtime} contained validator should be accepted`);
      assert.equal(verify(installed.hook, target, validHome, digestValue).ok, true);

      const outsideValidator = path.join(base, 'outside-validator.cjs');
      fs.copyFileSync(VALIDATOR, outsideValidator);
      fs.rmSync(installed.validator);
      fs.symlinkSync(outsideValidator, installed.validator);
      const escapedHome = path.join(base, 'escaped-home');
      const escaped = runHook(installed.hook, target, escapedHome, claim(target, digestValue));
      assert.equal(escaped.status, 0);
      assert.match(escaped.stderr, /semantic validator|escapes|rejected/i, `${runtime} validator escape must be rejected`);
      assert.equal(verify(installed.hook, target, escapedHome, digestValue).ok, false);

      fs.rmSync(installed.validator);
      fs.copyFileSync(VALIDATOR, installed.validator);
      const dependency = path.join(path.dirname(installed.validator), 'workflow-policy.cjs');
      const outsideDependency = path.join(base, 'outside-workflow-policy.cjs');
      fs.copyFileSync(dependency, outsideDependency);
      fs.rmSync(dependency);
      fs.symlinkSync(outsideDependency, dependency);
      const dependencyHome = path.join(base, 'dependency-home');
      const dependencyEscape = runHook(installed.hook, target, dependencyHome, claim(target, digestValue));
      assert.equal(dependencyEscape.status, 0);
      assert.match(dependencyEscape.stderr, /dependency|symlink|rejected/i, `${runtime} transitive dependency escape must be rejected`);
      assert.equal(verify(installed.hook, target, dependencyHome, digestValue).ok, false);

      fs.rmSync(dependency);
      fs.copyFileSync(path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs'), dependency);
      const runtimeRoot = path.dirname(path.dirname(installed.hook));
      const outsideRuntime = path.join(base, `outside-${runtime}`);
      fs.renameSync(runtimeRoot, outsideRuntime);
      fs.symlinkSync(outsideRuntime, runtimeRoot);
      const rootHome = path.join(base, 'root-home');
      const rootEscape = runHook(installed.hook, target, rootHome, claim(target, digestValue));
      assert.equal(rootEscape.status, 0);
      assert.match(rootEscape.stderr, /symlink|identity|rejected/i, `${runtime} adapter-root symlink must be rejected`);
      assert.equal(verify(installed.hook, target, rootHome, digestValue).ok, false);
    } finally { fs.rmSync(base, { recursive: true, force: true }); }
  }
});

test('rejects scratch/spec.json and traversal feature identities', () => {
  for (const hook of HOOKS) {
    const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-semantic-scratch-'));
    try {
      const target = fixture(base, 'project');
      const home = path.join(base, 'home');
      const current = digest(target, home);
      const badScratch = claim(target, current, { spec_file: 'scratch/spec.json' });
      const resScratch = runHook(hook, target, home, badScratch);
      assert.match(resScratch.stderr, /rejected|spec identity/);
      assert.equal(verify(hook, target, home, current).ok, false, 'scratch identity should not create observation');

      const traversal = `CAFEKIT_SEMANTIC_REVIEW_ATTESTATION ${JSON.stringify({ feature_name: '../evil', spec_file: 'specs/../evil/spec.json', semantic_digest: current, verdict: 'PASS' })}`;
      const resTraversal = runHook(hook, target, home, traversal);
      assert.match(resTraversal.stderr, /rejected|malformed/);
      assert.equal(verify(hook, target, home, current).ok, false);

      const slash = claim(target, current, { feature_name: 'evil/traversal' });
      const resSlash = runHook(hook, target, home, slash);
      assert.match(resSlash.stderr, /rejected|malformed/);
    } finally { fs.rmSync(base, { recursive: true, force: true }); }
  }
});

test('code-auditor agent ships Strict conditional marker contract', () => {
  const agentPath = path.join(PACKAGE_ROOT, 'src/claude/agents/code-auditor.md');
  const content = fs.readFileSync(agentPath, 'utf8');
  assert.match(content, /Strict Semantic Review Attestation/);
  assert.match(content, /CAFEKIT_SEMANTIC_REVIEW_ATTESTATION/);
  assert.match(content, /Emit only for `Strict`/);
  assert.match(content, /specs\/<feature>\/spec\.json/);
  assert.match(content, /MAC-protected host-hook observation/);
  assert.doesNotMatch(content, /host-signed|proves causal/);
});
