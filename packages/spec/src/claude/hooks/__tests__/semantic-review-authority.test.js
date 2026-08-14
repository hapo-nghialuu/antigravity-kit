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
