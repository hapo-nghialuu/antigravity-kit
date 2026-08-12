'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const ROOT = path.resolve(__dirname, '../../..');
const CLAUDE_HOOK = path.join(__dirname, '..', 'completion-authority.cjs');
const CODEX_HOOKS = path.join(ROOT, 'codex/hooks');
const POLICY = require(path.join(ROOT, 'claude/scripts/workflow-policy.cjs'));
const PROVENANCE = require(path.join(ROOT, 'claude/scripts/provenance.cjs'));
const FEATURE = 'authority-fixture';
const TASK = 'tasks/closeout.md';
const TEST_HOMES = new Map();

function homeFor(root) {
  if (!TEST_HOMES.has(root)) {
    const home = path.join(os.tmpdir(), 'cafekit-authority-homes', path.basename(root));
    fs.mkdirSync(home, { recursive: true });
    TEST_HOMES.set(root, home);
  }
  return TEST_HOMES.get(root);
}

function cleanupFixture(root) {
  fs.rmSync(root, { recursive: true, force: true });
  const home = TEST_HOMES.get(root);
  if (home) fs.rmSync(home, { recursive: true, force: true });
  TEST_HOMES.delete(root);
}

function gitFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-authority-'));
  for (const args of [
    ['init', '-q'],
    ['config', 'user.email', 'cafekit@example.invalid'],
    ['config', 'user.name', 'CafeKit Test'],
    ['commit', '--allow-empty', '-qm', 'fixture'],
  ]) {
    const result = spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
  return root;
}

function context(root, session = 'session-a', featureName = FEATURE) {
  return PROVENANCE.deriveRuntimeContext({
    projectRoot: root,
    specsRoot: path.join(root, 'specs'),
    specFile: path.join(root, 'specs', featureName, 'spec.json'),
    featureName,
    runtimeSession: session,
  });
}

function prepare(root, { lane = 'Standard', status = 'in_progress', proofs = true, feature = FEATURE } = {}) {
  const featureDir = path.join(root, 'specs', feature);
  fs.mkdirSync(path.join(featureDir, 'tasks'), { recursive: true });
  const policyInput = lane === 'Critical'
    ? { riskSignals: { auth: true } }
    : lane === 'Direct'
      ? { reversible: true, lowRisk: true, isolated: true }
      : { riskSignals: {} };
  const spec = {
    status,
    feature_name: feature,
    workflow_policy: POLICY.workflowPolicySnapshot(policyInput),
    task_registry: { [TASK]: { status: 'done', completed_at: '2026-08-12T00:00:00.000Z' } },
  };
  fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify(spec));
  const runtime = context(root, 'session-a', feature);
  const body = [
    'Verification: PASS',
    'Command: node --test',
    'Exit: 0',
    `Base: ${runtime.base}`,
    `Head: ${runtime.head}`,
  ].join('\n');
  fs.writeFileSync(path.join(featureDir, TASK), `# Closeout\n\nStatus: done\n\n## Evidence\n\n${body}\n`);
  if (proofs) {
    spec.proofs = {
      needsInspection: { receipt: body },
      needsResearchGrounding: { receipt: body },
    };
    if (lane === 'Critical') {
      spec.proofs.needsIndependentAudit = {
        schema_version: '1',
        reviewer_session_id: 'reviewer-session',
        implementation_session_id: 'session-a',
        expected_provenance: { base: runtime.base, head: runtime.head },
        evidence: 'independent closeout review passed',
        verdict: 'PASS',
      };
    }
    fs.writeFileSync(path.join(featureDir, 'spec.json'), JSON.stringify(spec));
  }
  return { featureDir, specFile: path.join(featureDir, 'spec.json') };
}

function adapter(kind, root) {
  const home = homeFor(root);
  fs.mkdirSync(home, { recursive: true });
  if (kind === 'claude') {
    return {
      root,
      hook: CLAUDE_HOOK,
      sessionHook: path.join(__dirname, '..', 'session.cjs'),
      state: path.join(home, '.cafekit', 'completion-authority', 'projects'),
      home,
      env: { ...process.env, HOME: home, USERPROFILE: home, PROJECT_ROOT: root },
      run(mode, payload) {
        return spawnSync(process.execPath, [CLAUDE_HOOK, mode], {
          cwd: root,
          env: this.env,
          input: JSON.stringify({ cwd: root, session_id: 'session-a', ...payload }),
          encoding: 'utf8',
        });
      },
    };
  }
  const hooks = path.join(root, '.codex/hooks');
  fs.cpSync(CODEX_HOOKS, hooks, { recursive: true });
  fs.mkdirSync(path.join(root, '.codex/scripts'), { recursive: true });
  for (const file of ['workflow-policy.cjs', 'provenance.cjs', 'spec-resolver.cjs']) {
    fs.copyFileSync(path.join(ROOT, 'claude/scripts', file), path.join(root, '.codex/scripts', file));
  }
  return {
    root,
    hook: path.join(hooks, 'completion-authority.cjs'),
    sessionHook: path.join(hooks, 'session.cjs'),
    state: path.join(home, '.cafekit', 'completion-authority', 'projects'),
    home,
    env: { ...process.env, HOME: home, USERPROFILE: home },
    run(mode, payload) {
      return spawnSync(process.execPath, [path.join(hooks, 'completion-authority.cjs'), mode], {
        cwd: root,
        env: this.env,
        input: JSON.stringify({ cwd: root, session_id: 'session-a', ...payload }),
        encoding: 'utf8',
      });
    },
  };
}

function stateFiles(runtime) {
  if (!fs.existsSync(runtime.state)) return [];
  return fs.readdirSync(runtime.state, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => fs.readdirSync(path.join(runtime.state, entry.name)));
}

function stateRecord(runtime, prefix) {
  const files = stateFiles(runtime).filter((name) => name.startsWith(prefix));
  assert.equal(files.length, 1, `expected exactly one ${prefix} authority record`);
  const projects = fs.readdirSync(runtime.state, { withFileTypes: true }).find((entry) => entry.isDirectory());
  return path.join(runtime.state, projects.name, files[0]);
}

function sessionStart(runtime, source = 'startup', sessionId = 'session-a') {
  return spawnSync(process.execPath, [runtime.sessionHook], {
    cwd: runtime.root,
    env: runtime.env,
    input: JSON.stringify({ cwd: runtime.root, session_id: sessionId, source, hook_event_name: 'SessionStart' }),
    encoding: 'utf8',
  });
}

function stop(runtime, payload = {}) {
  return runtime.run('--stop', { hook_event_name: 'Stop', ...payload });
}

function approve(runtime, nonce, payload = {}) {
  return runtime.run('--approve', {
    hook_event_name: 'UserPromptSubmit',
    prompt: `APPROVE CAFEKIT COMPLETION ${nonce}`,
    ...payload,
  });
}

function block(result) {
  assert.equal(result.status, 0, result.stderr);
  const output = result.stdout.trim();
  assert.notEqual(output, '', 'expected a controlled block');
  const line = output.split('\n').find((value) => value.includes('"decision"'));
  return JSON.parse(line || output);
}

function nonceFrom(result) {
  const body = block(result);
  const match = body.reason.match(/APPROVE CAFEKIT COMPLETION ([a-f0-9]{24})/);
  assert.ok(match, body.reason);
  return { body, nonce: match[1] };
}

for (const kind of ['claude', 'codex']) {
  test(`${kind}: exact user approval is one-time and runtime-bound`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root);
      const first = nonceFrom(stop(runtime));
      const forged = runtime.run('--approve', { hook_event_name: 'UserPromptSubmit', user_authorized: true });
      assert.equal(forged.status, 0);
      assert.equal(stateFiles(runtime).filter((name) => name.startsWith('grant-')).length, 0);
      approve(runtime, first.nonce);
      assert.equal(stop(runtime).stdout.trim(), '', 'approved closeout must pass once');
      const replay = approve(runtime, first.nonce);
      assert.equal(replay.status, 0);
      const second = nonceFrom(stop(runtime));
      assert.notEqual(second.nonce, first.nonce, 'replayed nonce must not grant a second closeout');
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: valid Critical closeout succeeds only after exact approval`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root, { lane: 'Critical' });
      const pending = nonceFrom(stop(runtime));
      assert.equal(stop(runtime).stdout.match(/APPROVE CAFEKIT COMPLETION/g).length, 1);
      approve(runtime, pending.nonce);
      assert.equal(stop(runtime).stdout.trim(), '');
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: wrong nonce/session/target and forged approval fields never grant`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root);
      const pending = nonceFrom(stop(runtime));
      const replacement = pending.nonce.endsWith('0') ? '1' : '0';
      const wrongNonce = approve(runtime, `${pending.nonce.slice(0, -1)}${replacement}`);
      assert.equal(wrongNonce.status, 0);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('grant-')), false);
      const wrongEvent = approve(runtime, pending.nonce, { hook_event_name: 'Stop' });
      assert.equal(wrongEvent.status, 0);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('grant-')), false);
      const wrongSession = approve(runtime, pending.nonce, { session_id: 'other-session' });
      assert.equal(wrongSession.status, 0);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('grant-')), false);
      const forged = runtime.run('--approve', {
        hook_event_name: 'UserPromptSubmit',
        user_authorized: true,
        userAuthorized: true,
        session: { id: 'session-a', user_authorized: true },
      });
      assert.equal(forged.status, 0);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('grant-')), false);
      approve(runtime, pending.nonce);
      const wrongStop = stop(runtime, {
        session_id: 'other-session',
        featureName: 'wrong-feature',
        runtime_context: { project_root: '/forged', head: 'forged', context_id: 'forged' },
        user_authorized: true,
      });
      assert.equal(block(wrongStop).decision, 'block');
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: status, policy, registry, and artifact/proof mutation invalidate approval`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      const fixture = prepare(root);
      const initial = nonceFrom(stop(runtime));
      approve(runtime, initial.nonce);
      const spec = JSON.parse(fs.readFileSync(fixture.specFile, 'utf8'));
      spec.status = 'completed';
      fs.writeFileSync(fixture.specFile, JSON.stringify(spec));
      const statusMutation = nonceFrom(stop(runtime));
      assert.notEqual(statusMutation.nonce, initial.nonce);

      approve(runtime, statusMutation.nonce);
      const direct = POLICY.workflowPolicySnapshot({ reversible: true, lowRisk: true, isolated: true });
      spec.workflow_policy = direct;
      fs.writeFileSync(fixture.specFile, JSON.stringify(spec));
      const policyMutation = block(stop(runtime));
      assert.match(policyMutation.reason, /monotonic|downgraded/i);
      spec.task_registry = {};
      fs.writeFileSync(fixture.specFile, JSON.stringify(spec));
      const missingRegistry = block(stop(runtime));
      assert.match(missingRegistry.reason, /monotonic|downgraded/i);

      prepare(root, { lane: 'Direct' });
      const directRuntime = adapter(kind, root);
      const artifactMutation = block(stop(directRuntime));
      assert.match(artifactMutation.reason, /monotonic|downgraded/i);
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: completed, empty/malformed candidates, Critical fake proofs, and Direct no-spec are fail-closed`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      for (const input of ['', 'null', '[]']) {
        const malformed = spawnSync(process.execPath, [runtime.hook, '--stop'], {
          cwd: root,
          env: runtime.env,
          input,
          encoding: 'utf8',
        });
        assert.equal(malformed.status, 0);
        assert.equal(block(malformed).decision, 'block');
      }
      prepare(root, { status: 'completed' });
      assert.match(nonceFrom(stop(runtime)).body.reason, /approval/i);

      const specFile = path.join(root, 'specs', FEATURE, 'spec.json');
      const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
      spec.task_registry = {};
      fs.writeFileSync(specFile, JSON.stringify(spec));
      assert.match(block(stop(runtime)).reason, /task_registry is missing or empty/i);

      fs.writeFileSync(specFile, '{ malformed');
      assert.equal(block(stop(runtime)).decision, 'block');

      fs.rmSync(path.join(root, 'specs'), { recursive: true, force: true });
      const disappeared = block(stop(runtime));
      assert.match(disappeared.reason, /disappeared|persisted/i);

      const noSpecRoot = gitFixture();
      try {
        const noSpec = adapter(kind, noSpecRoot);
        assert.equal(stop(noSpec).stdout.trim(), '', 'true no-spec Direct path remains silent');
      } finally {
        cleanupFixture(noSpecRoot);
      }

      prepare(root, { lane: 'Critical', proofs: false });
      const critical = adapter(kind, root);
      const criticalBlock = block(stop(critical));
      assert.match(criticalBlock.reason, /technical completion proof|needsIndependentAudit/i);

      fs.mkdirSync(path.join(root, '.claude'), { recursive: true });
      fs.writeFileSync(path.join(root, '.claude', 'runtime.json'), JSON.stringify({ spec: { completion_gate: false } }));
      if (kind === 'codex') {
        fs.rmSync(path.join(root, '.claude'), { recursive: true, force: true });
        fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
        fs.writeFileSync(path.join(root, '.codex', 'runtime.json'), JSON.stringify({ spec: { completion_gate: false } }));
      }
      assert.match(block(stop(critical)).reason, /worker-writable|cannot authorize/i);
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: copied, unsigned, MAC-invalid, wrong-key, and project-local grants never authorize`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root);
      const localDir = path.join(root, kind === 'claude' ? '.claude/hooks/.logs/completion-authority' : '.codex/hooks/.logs/completion-authority');
      fs.mkdirSync(localDir, { recursive: true });
      fs.writeFileSync(path.join(localDir, 'grant-deadbeefdeadbeefdeadbeef.json'), JSON.stringify({ kind: 'grant', nonce: 'deadbeefdeadbeefdeadbeef', binding: {} }));
      const pending = nonceFrom(stop(runtime));
      approve(runtime, pending.nonce);
      assert.equal(stop(runtime).stdout.trim(), '', 'project-local legacy grant must be ignored');
      fs.rmSync(localDir, { recursive: true, force: true });

      const retry = nonceFrom(stop(runtime));
      const pendingFile = stateRecord(runtime, 'pending-');
      const copiedGrant = path.join(path.dirname(pendingFile), `grant-${retry.nonce}.json`);
      fs.copyFileSync(pendingFile, copiedGrant);
      const copiedApproval = approve(runtime, retry.nonce);
      assert.doesNotMatch(copiedApproval.stdout, /accepted/i);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('grant-')), true);
      fs.rmSync(copiedGrant);
      approve(runtime, retry.nonce);
      assert.equal(stop(runtime).stdout.trim(), '');

      const clean = gitFixture();
      try {
        const cleanRuntime = adapter(kind, clean);
        prepare(clean);
        const cleanPending = nonceFrom(stop(cleanRuntime));
        const cleanFile = stateRecord(cleanRuntime, 'pending-');
        const record = JSON.parse(fs.readFileSync(cleanFile, 'utf8'));
        record.mac = `${record.mac.slice(0, -1)}${record.mac.endsWith('0') ? '1' : '0'}`;
        fs.writeFileSync(cleanFile, JSON.stringify(record));
        assert.doesNotMatch(approve(cleanRuntime, cleanPending.nonce).stdout, /accepted/i);
      } finally {
        cleanupFixture(clean);
      }

      const wrongKeyRoot = gitFixture();
      try {
        const wrongKeyRuntime = adapter(kind, wrongKeyRoot);
        prepare(wrongKeyRoot);
        const wrongKeyPending = nonceFrom(stop(wrongKeyRuntime));
        fs.writeFileSync(path.join(wrongKeyRuntime.home, '.cafekit', 'completion-authority', 'hmac.key'), Buffer.alloc(32, 7));
        assert.doesNotMatch(approve(wrongKeyRuntime, wrongKeyPending.nonce).stdout, /accepted/i);
      } finally {
        cleanupFixture(wrongKeyRoot);
      }
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: replay and signed-record mutation remain one-use and bound`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root);
      const pending = nonceFrom(stop(runtime));
      approve(runtime, pending.nonce);
      assert.equal(stop(runtime).stdout.trim(), '');
      assert.doesNotMatch(approve(runtime, pending.nonce).stdout, /accepted/i);
      const next = nonceFrom(stop(runtime));
      const specFile = path.join(root, 'specs', FEATURE, 'spec.json');
      const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
      spec.task_registry[TASK].completed_at = '2026-08-13T00:00:00.000Z';
      fs.writeFileSync(specFile, JSON.stringify(spec));
      approve(runtime, next.nonce);
      const mutated = block(stop(runtime));
      assert.match(mutated.reason, /approval|technical|binding|proof/i);
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: policy baseline is recorded before proof completion, survives SessionStart, and blocks Critical to Direct`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root, { proofs: false });
      const incomplete = block(stop(runtime));
      assert.match(incomplete.reason, /technical|proof|missing/i);
      assert.equal(stateFiles(runtime).filter((name) => name.startsWith('baseline-')).length, 1);

      prepare(root);
      const pending = nonceFrom(stop(runtime));
      assert.equal(sessionStart(runtime).status, 0);
      assert.equal(stateFiles(runtime).filter((name) => name.startsWith('baseline-')).length, 1);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('pending-') || name.startsWith('grant-')), false);
      const freshPending = nonceFrom(stop(runtime));
      assert.notEqual(freshPending.nonce, pending.nonce);

      approve(runtime, freshPending.nonce);
      assert.equal(stop(runtime).stdout.trim(), '');
      const retry = nonceFrom(stop(runtime));
      approve(runtime, retry.nonce);
      const specFile = path.join(root, 'specs', FEATURE, 'spec.json');
      const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
      spec.workflow_policy = POLICY.workflowPolicySnapshot({ reversible: true, lowRisk: true, isolated: true });
      fs.writeFileSync(specFile, JSON.stringify(spec));
      const downgrade = block(stop(runtime));
      assert.match(downgrade.reason, /monotonic|downgraded/i);
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: Critical feature A survives deletion and blocks Direct feature B`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root, { feature: 'critical-feature-a', lane: 'Critical' });
      nonceFrom(stop(runtime));
      assert.equal(stateFiles(runtime).filter((name) => name === 'policy-floor.json').length, 1);

      fs.rmSync(path.join(root, 'specs', 'critical-feature-a'), { recursive: true, force: true });
      prepare(root, { feature: 'direct-feature-b', lane: 'Direct' });
      const blocked = block(stop(runtime));
      assert.match(blocked.reason, /project policy floor|monotonic|downgraded/i);
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: Critical policy floor survives same-path recreation and a new session`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      const featureDir = path.join(root, 'specs', FEATURE);
      prepare(root, { lane: 'Critical' });
      nonceFrom(stop(runtime));
      fs.rmSync(featureDir, { recursive: true, force: true });
      prepare(root, { lane: 'Direct' });
      const recreated = block(stop(runtime));
      assert.match(recreated.reason, /project policy floor|monotonic|downgraded/i);
    } finally {
      cleanupFixture(root);
    }

    const sessionRoot = gitFixture();
    try {
      const runtime = adapter(kind, sessionRoot);
      prepare(sessionRoot, { lane: 'Critical' });
      nonceFrom(stop(runtime));
      assert.equal(sessionStart(runtime, 'startup', 'session-b').status, 0);
      assert.equal(stateFiles(runtime).filter((name) => name === 'policy-floor.json').length, 1);
      assert.equal(stateFiles(runtime).some((name) => name.startsWith('pending-') || name.startsWith('grant-')), false);
      prepare(sessionRoot, { lane: 'Direct' });
      const newSession = block(stop(runtime, { session_id: 'session-b' }));
      assert.match(newSession.reason, /project policy floor|monotonic|downgraded/i);
    } finally {
      cleanupFixture(sessionRoot);
    }
  });

  test(`${kind}: project policy floor prevents risk and proof-obligation removal`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root, { lane: 'Critical' });
      nonceFrom(stop(runtime));
      const specFile = path.join(root, 'specs', FEATURE, 'spec.json');
      const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
      assert.ok(spec.workflow_policy.risks.length > 0);
      assert.ok(spec.workflow_policy.proof_obligations.length > 0);
      const removedObligationIndex = spec.workflow_policy.proof_obligations.length - 1;
      spec.workflow_policy = {
        ...spec.workflow_policy,
        risks: spec.workflow_policy.risks.slice(0, -1),
        proof_obligations: spec.workflow_policy.proof_obligations.slice(0, -1),
        actor_needs: spec.workflow_policy.actor_needs.filter((_, index) => index !== removedObligationIndex),
      };
      fs.writeFileSync(specFile, JSON.stringify(spec));
      const blocked = block(stop(runtime));
      assert.match(blocked.reason, /risk .*removed/i);
      assert.match(blocked.reason, /obligation .*removed/i);
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: missing or corrupt project policy floor fails closed`, () => {
    const missingRoot = gitFixture();
    try {
      const runtime = adapter(kind, missingRoot);
      prepare(missingRoot);
      nonceFrom(stop(runtime));
      fs.rmSync(stateRecord(runtime, 'policy-floor'), { force: true });
      assert.match(block(stop(runtime)).reason, /floor|authority/i);
    } finally {
      cleanupFixture(missingRoot);
    }

    const corruptRoot = gitFixture();
    try {
      const runtime = adapter(kind, corruptRoot);
      prepare(corruptRoot);
      nonceFrom(stop(runtime));
      fs.writeFileSync(stateRecord(runtime, 'policy-floor'), '{ corrupt');
      assert.match(block(stop(runtime)).reason, /floor|malformed|authority/i);
    } finally {
      cleanupFixture(corruptRoot);
    }
  });

  test(`${kind}: valid policy escalation is allowed, while missing policy is blocked`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root, { lane: 'Standard' });
      nonceFrom(stop(runtime));
      const standardFloor = JSON.parse(fs.readFileSync(stateRecord(runtime, 'policy-floor'), 'utf8'));
      assert.equal(standardFloor.policy.lane, 'Standard');
      prepare(root, { lane: 'Critical' });
      const escalated = nonceFrom(stop(runtime));
      assert.match(escalated.body.reason, /approval/i);
      const criticalFloor = JSON.parse(fs.readFileSync(stateRecord(runtime, 'policy-floor'), 'utf8'));
      assert.equal(criticalFloor.policy.lane, 'Critical');

      const missingRoot = gitFixture();
      try {
        const missingRuntime = adapter(kind, missingRoot);
        const fixture = prepare(missingRoot);
        const spec = JSON.parse(fs.readFileSync(fixture.specFile, 'utf8'));
        delete spec.workflow_policy;
        fs.writeFileSync(fixture.specFile, JSON.stringify(spec));
        assert.match(block(stop(missingRuntime)).reason, /workflow_policy.*missing/i);
      } finally {
        cleanupFixture(missingRoot);
      }
    } finally {
      cleanupFixture(root);
    }
  });

  test(`${kind}: explicit targets cannot hide global persisted specs or mismatch the sole candidate`, () => {
    const root = gitFixture();
    try {
      const runtime = adapter(kind, root);
      prepare(root);
      assert.match(block(stop(runtime, { featureName: 'other-feature' })).reason, /explicit/i);
      const otherDir = path.join(root, 'specs', 'other-feature');
      fs.mkdirSync(otherDir, { recursive: true });
      fs.writeFileSync(path.join(otherDir, 'spec.json'), JSON.stringify({
        feature_name: 'other-feature',
        status: 'in_progress',
        workflow_policy: POLICY.workflowPolicySnapshot({ riskSignals: {} }),
        task_registry: { [TASK]: { status: 'in_progress' } },
      }));
      assert.match(block(stop(runtime, { featureName: FEATURE })).reason, /multiple_persisted|multiple/i);
    } finally {
      cleanupFixture(root);
    }
  });
}

test('Claude hook: CLAUDE_PROJECT_DIR wins over malicious payload.cwd and stale process cwd', () => {
  const target = gitFixture();
  const stale = gitFixture();
  try {
    prepare(target);
    const home = homeFor(target);
    const result = spawnSync(process.execPath, [CLAUDE_HOOK, '--stop'], {
      cwd: stale,
      env: {
        ...process.env,
        HOME: home,
        USERPROFILE: home,
        CLAUDE_PROJECT_DIR: target,
        PROJECT_ROOT: stale,
      },
      input: JSON.stringify({
        hook_event_name: 'Stop',
        session_id: 'session-a',
        cwd: stale,
      }),
      encoding: 'utf8',
    });
    assert.match(block(result).reason, /approval/i);
  } finally {
    cleanupFixture(target);
    cleanupFixture(stale);
  }
});

test('installed scaffold observes Critical policy before Stop and source scaffold does not touch authority state', () => {
  const root = gitFixture();
  const sourceRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-source-scaffold-'));
  const sourceHome = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-source-home-'));
  const installedHome = homeFor(root);
  try {
    const installedClaude = path.join(root, '.claude');
    fs.cpSync(path.join(ROOT, 'claude/scripts'), path.join(installedClaude, 'scripts'), { recursive: true });
    fs.cpSync(path.join(ROOT, 'claude/skills/specs/templates'), path.join(installedClaude, 'skills/specs/templates'), { recursive: true });
    fs.cpSync(path.join(ROOT, 'claude/hooks'), path.join(installedClaude, 'hooks'), { recursive: true });

    const installedScaffold = path.join(installedClaude, 'scripts/spec-scaffold.cjs');
    const installedHook = path.join(installedClaude, 'hooks/completion-authority.cjs');
    const installedRuntime = {
      root,
      home: installedHome,
      state: path.join(installedHome, '.cafekit', 'completion-authority', 'projects'),
      run(mode, payload) {
        return spawnSync(process.execPath, [installedHook, mode], {
          cwd: root,
          env: {
            ...process.env,
            HOME: installedHome,
            USERPROFILE: installedHome,
            CLAUDE_PROJECT_DIR: root,
            PROJECT_ROOT: root,
          },
          input: JSON.stringify({ cwd: root, session_id: 'session-a', ...payload }),
          encoding: 'utf8',
        });
      },
    };
    const scaffolded = spawnSync(process.execPath, [
      installedScaffold,
      'installed-critical',
      '--tasks',
      'R0-01-authority-baseline',
      '--lane',
      'Critical',
    ], {
      cwd: root,
      env: { ...process.env, HOME: installedHome, USERPROFILE: installedHome },
      encoding: 'utf8',
    });
    assert.equal(scaffolded.status, 0, `${scaffolded.stdout}\n${scaffolded.stderr}`);

    const floor = JSON.parse(fs.readFileSync(stateRecord(installedRuntime, 'policy-floor'), 'utf8'));
    const baseline = JSON.parse(fs.readFileSync(stateRecord(installedRuntime, 'baseline-'), 'utf8'));
    assert.equal(typeof floor.mac, 'string');
    assert.ok(floor.mac.length > 0);
    assert.equal(typeof baseline.mac, 'string');
    assert.ok(baseline.mac.length > 0);

    fs.rmSync(path.join(root, 'specs', 'installed-critical'), { recursive: true, force: true });
    const disappeared = block(stop(installedRuntime));
    assert.match(disappeared.reason, /disappeared/i);

    const sourceScaffolded = spawnSync(process.execPath, [
      path.join(ROOT, 'claude/scripts/spec-scaffold.cjs'),
      'source-critical',
      '--tasks',
      'R0-01-source-baseline',
      '--lane',
      'Critical',
    ], {
      cwd: sourceRoot,
      env: { ...process.env, HOME: sourceHome, USERPROFILE: sourceHome },
      encoding: 'utf8',
    });
    assert.equal(sourceScaffolded.status, 0, `${sourceScaffolded.stdout}\n${sourceScaffolded.stderr}`);
    assert.equal(fs.existsSync(path.join(sourceHome, '.cafekit', 'completion-authority')), false);
  } finally {
    cleanupFixture(root);
    fs.rmSync(sourceRoot, { recursive: true, force: true });
    fs.rmSync(sourceHome, { recursive: true, force: true });
  }
});
