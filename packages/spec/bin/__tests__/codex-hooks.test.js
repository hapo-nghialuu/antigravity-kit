'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const CODEX_HOOKS = path.join(PACKAGE_ROOT, 'src/codex/hooks');
const PROVENANCE = require(path.join(PACKAGE_ROOT, 'src/claude/scripts/provenance.cjs'));
const POLICY = require(path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs'));
const VALID_BASE = '0123456789abcdef0123456789abcdef01234567';
const VALID_HEAD = '89abcdef0123456789abcdef0123456789abcdef';
const { stateDir: codexStateDir } = require(
  path.join(CODEX_HOOKS, 'lib', 'state-store.cjs')
);

function runHook(file, cwd, payload) {
  if (path.basename(file) === 'spec-gate.cjs') {
    const rootResult = spawnSync('git', ['-C', cwd, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' });
    if (rootResult.status === 0) installFeatureReceipts(rootResult.stdout.trim(), payload.session_id || 'session-a');
  }
  return spawnSync(process.execPath, [file], {
    cwd,
    input: JSON.stringify(payload),
    encoding: 'utf8'
  });
}

function runtimeContext(root, feature = 'auth', session = 'session-a') {
  return PROVENANCE.deriveRuntimeContext({
    projectRoot: root,
    specsRoot: path.join(root, 'specs'),
    specFile: path.join(root, 'specs', feature, 'spec.json'),
    featureName: feature,
    runtimeSession: session,
  });
}

function bindReceipt(root, value, feature = 'auth', session = 'session-a') {
  const context = runtimeContext(root, feature, session);
  return value.replaceAll(VALID_BASE, context.base).replaceAll(VALID_HEAD, context.head);
}

function installFeatureReceipts(root, session = 'session-a') {
  const specsRoot = path.join(root, 'specs');
  if (!fs.existsSync(specsRoot)) return;
  for (const feature of fs.readdirSync(specsRoot)) {
    const featureDir = path.join(specsRoot, feature);
    const specFile = path.join(featureDir, 'spec.json');
    if (!fs.existsSync(specFile)) continue;
    let spec;
    try { spec = JSON.parse(fs.readFileSync(specFile, 'utf8')); } catch { continue; }
    const lifecyclePhase = spec.current_phase || spec.phase;
    const explicitCloseout = ['completed', 'complete'].includes(spec.status)
      || ['closeout', 'completion', 'completed', 'complete'].includes(lifecyclePhase);
    if (!explicitCloseout) continue;
    const tasks = Object.values(spec.task_registry || {});
    if (tasks.length === 0 || tasks.some((task) => task.status !== 'done')) continue;
    const context = runtimeContext(root, feature, session);
    fs.writeFileSync(path.join(featureDir, 'feature-receipt.md'), [
      `Feature: ${feature}`,
      'Expected: final integration verification passes',
      'Observed: final integration verification passed',
      'Verification: PASS',
      'Command: node --test',
      'Exit: 0',
      `Base: ${context.base}`,
      `Head: ${context.head}`,
      '',
    ].join('\n'));
  }
}

function inHookFixture(run, options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-hooks-'));
  const hooks = path.join(root, '.codex', 'hooks');
  try {
    fs.cpSync(CODEX_HOOKS, hooks, { recursive: true });
    fs.mkdirSync(path.join(root, '.codex', 'scripts'), { recursive: true });
    if (options.policy !== 'missing') {
      if (options.policy === 'malformed') {
        fs.writeFileSync(path.join(root, '.codex', 'scripts', 'workflow-policy.cjs'), 'module.exports = {\n');
      } else {
        fs.copyFileSync(
          path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs'),
          path.join(root, '.codex', 'scripts', 'workflow-policy.cjs'),
        );
        fs.copyFileSync(
          path.join(PACKAGE_ROOT, 'src/claude/scripts/provenance.cjs'),
          path.join(root, '.codex', 'scripts', 'provenance.cjs'),
        );
        fs.copyFileSync(
          path.join(PACKAGE_ROOT, 'src/claude/scripts/spec-receipt.cjs'),
          path.join(root, '.codex', 'scripts', 'spec-receipt.cjs'),
        );
      }
    }
    fs.copyFileSync(
      path.join(PACKAGE_ROOT, 'src/claude/scripts/spec-resolver.cjs'),
      path.join(root, '.codex', 'scripts', 'spec-resolver.cjs'),
    );
    for (const file of ['validate-spec-output.cjs', 'spec-ground.cjs', 'spec-semantic-model.cjs', 'spec-final-state.cjs']) {
      fs.copyFileSync(
        path.join(PACKAGE_ROOT, 'src/claude/scripts', file),
        path.join(root, '.codex', 'scripts', file),
      );
    }
    fs.writeFileSync(path.join(root, '.codex', 'scripts', 'spec-scaffold.cjs'), '');
    for (const args of [['init', '-q'], ['config', 'user.email', 'cafekit@example.invalid'], ['config', 'user.name', 'CafeKit Test'], ['commit', '--allow-empty', '-qm', 'fixture']]) {
      const result = spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    }
    return run(root, hooks);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Codex privacy approval is exact, session-bound, and one-time', () => {
  inHookFixture((root, hooks) => {
    const nested = path.join(root, 'packages', 'app');
    fs.mkdirSync(nested, { recursive: true });
    fs.writeFileSync(path.join(nested, '.env'), 'SECRET=value\n');
    const block = path.join(hooks, 'privacy-block.cjs');
    const approve = path.join(hooks, 'privacy-approval.cjs');
    const harmlessPatch = runHook(block, nested, {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'PreToolUse',
      tool_name: 'apply_patch',
      tool_input: {
        command: '*** Begin Patch\n*** Update File: README.md\n+Document `.env` setup.\n*** End Patch\n'
      }
    });
    assert.equal(harmlessPatch.stdout, '');

    const request = {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'PreToolUse',
      tool_name: 'Bash',
      tool_input: { command: 'cat .env' }
    };

    const denied = runHook(block, nested, request);
    assert.equal(denied.status, 0);
    const decision = JSON.parse(denied.stdout);
    assert.equal(decision.hookSpecificOutput.permissionDecision, 'deny');
    const prompt = decision.hookSpecificOutput.permissionDecisionReason.match(
      /APPROVE CAFEKIT PRIVACY [a-f0-9]{24}/
    )?.[0];
    assert.ok(prompt);
    assert.equal(fs.existsSync(path.join(nested, '.codex')), false);
    assert.equal(fs.existsSync(path.join(hooks, '.privacy')), true);

    const wrongSession = runHook(approve, nested, {
      cwd: nested,
      session_id: 'session-b',
      hook_event_name: 'UserPromptSubmit',
      prompt
    });
    assert.match(wrongSession.stdout, /rejected/);

    const approved = runHook(approve, nested, {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'UserPromptSubmit',
      prompt
    });
    assert.match(approved.stdout, /approved one retry/);

    const allowedOnce = runHook(block, nested, request);
    assert.equal(allowedOnce.stdout, '');

    const deniedAgain = runHook(block, nested, request);
    assert.equal(JSON.parse(deniedAgain.stdout).hookSpecificOutput.permissionDecision, 'deny');

    fs.writeFileSync(path.join(nested, 'credentials.json'), '{"token":"test"}\n');
    const multiRequest = {
      ...request,
      tool_input: { command: 'cat .env credentials.json' }
    };
    const multiDenied = runHook(block, nested, multiRequest);
    const multiDecision = JSON.parse(multiDenied.stdout);
    assert.match(multiDecision.hookSpecificOutput.permissionDecisionReason, /\.env, credentials\.json/);
    const multiPrompt = multiDecision.hookSpecificOutput.permissionDecisionReason.match(
      /APPROVE CAFEKIT PRIVACY [a-f0-9]{24}/
    )?.[0];
    assert.ok(multiPrompt);

    const multiApproved = runHook(approve, nested, {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'UserPromptSubmit',
      prompt: multiPrompt
    });
    assert.match(multiApproved.stdout, /approved one retry/);

    // A token for two paths cannot authorize a subset, and the failed subset
    // attempt must not consume the exact-set token.
    const subsetDenied = runHook(block, nested, request);
    assert.equal(JSON.parse(subsetDenied.stdout).hookSpecificOutput.permissionDecision, 'deny');
    fs.writeFileSync(path.join(nested, 'tokens.json'), '{"token":"test"}\n');
    const supersetDenied = runHook(block, nested, {
      ...request,
      tool_input: { command: 'cat .env credentials.json tokens.json' }
    });
    assert.equal(JSON.parse(supersetDenied.stdout).hookSpecificOutput.permissionDecision, 'deny');
    const reordered = {
      ...request,
      tool_input: { command: 'cat credentials.json .env' }
    };
    assert.equal(runHook(block, nested, reordered).stdout, '');
    assert.equal(
      JSON.parse(runHook(block, nested, multiRequest).stdout).hookSpecificOutput.permissionDecision,
      'deny'
    );
  });
});

test('Codex privacy hook parses native patch fields and move destinations', () => {
  inHookFixture((root, hooks) => {
    const block = path.join(hooks, 'privacy-block.cjs');
    const payload = (patch) => ({
      cwd: root,
      session_id: 'session-a',
      hook_event_name: 'PreToolUse',
      tool_name: 'apply_patch',
      tool_input: { patch }
    });

    const harmless = runHook(
      block,
      root,
      payload('*** Begin Patch\n*** Update File: README.md\n+Document `.env` setup.\n*** End Patch\n')
    );
    assert.equal(harmless.stdout, '');

    for (const patch of [
      '*** Begin Patch\n*** Update File: .env\n+SECRET=x\n*** End Patch\n',
      '*** Begin Patch\n*** Update File: README.md\n*** Move to: credentials.json\n*** End Patch\n'
    ]) {
      const denied = runHook(block, root, payload(patch));
      assert.equal(JSON.parse(denied.stdout).hookSpecificOutput.permissionDecision, 'deny');
    }
  });
});

test('Codex inspect hook scans native shell commands and structured paths', () => {
  inHookFixture((root, hooks) => {
    const inspect = path.join(hooks, 'inspect-block.cjs');
    const payload = (command) => ({
      cwd: root,
      session_id: 'session-a',
      hook_event_name: 'PreToolUse',
      tool_name: 'Bash',
      tool_input: { command }
    });

    for (const command of [
      'rg secret node_modules',
      "sed -n '1,20p' dist/bundle.js",
      "rg --glob '**/*' symbol src"
    ]) {
      const result = runHook(inspect, root, payload(command));
      assert.equal(result.status, 2, command);
      assert.match(result.stderr, /SCOPE LIMIT EXCEEDED/);
    }

    const normal = runHook(inspect, root, payload('rg symbol src packages'));
    assert.equal(normal.status, 0);

    const structured = runHook(inspect, root, {
      ...payload(''),
      tool_name: 'mcp__filesystem__read_file',
      tool_input: { path: 'coverage/index.html' }
    });
    assert.equal(structured.status, 2);
  });
});

test('Codex task scaffold hook blocks apply_patch Add File with stderr guidance', () => {
  inHookFixture((root, hooks) => {
    const result = runHook(path.join(hooks, 'task-scaffold-guard.cjs'), root, {
      cwd: root,
      session_id: 'session-a',
      hook_event_name: 'PreToolUse',
      tool_name: 'apply_patch',
      tool_input: {
        command: '*** Begin Patch\n*** Add File: specs/auth/tasks/task-R0-01-auth.md\n+x\n*** End Patch\n'
      }
    });

    assert.equal(result.status, 2);
    assert.match(result.stderr, /TASK SCAFFOLD REQUIRED/);
    assert.match(result.stderr, /node \.codex\/scripts\/spec-scaffold\.cjs auth/);
  });
});

test('Codex completion gate cannot be bypassed from a nested cwd', () => {
  inHookFixture((root, hooks) => {
    const nested = path.join(root, 'packages', 'app');
    const feature = path.join(root, 'specs', 'auth');
    const taskPath = 'tasks/task-R0-01-auth.md';
    fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
    fs.mkdirSync(nested, { recursive: true });
    const spec = {
      status: 'in_progress',
      feature_name: 'auth',
      task_registry: {
        [taskPath]: { status: 'pending', completed_at: null }
      }
    };
    fs.writeFileSync(path.join(feature, 'spec.json'), `${JSON.stringify(spec)}\n`);
    fs.writeFileSync(path.join(feature, taskPath), 'Status: pending\n');
    const gate = path.join(hooks, 'spec-gate.cjs');
    const payload = {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'Stop',
      stop_hook_active: false,
      last_assistant_message: 'done'
    };

    const seeded = runHook(gate, nested, payload);
    assert.equal(seeded.status, 0);
    assert.equal(seeded.stdout, '');

    spec.task_registry[taskPath] = {
      status: 'done',
      completed_at: '2026-07-29T10:00:00.000Z'
    };
    fs.writeFileSync(path.join(feature, 'spec.json'), `${JSON.stringify(spec)}\n`);
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n');

    const blockedBeforeCloseout = runHook(gate, nested, payload);
    assert.equal(blockedBeforeCloseout.status, 0);
    assert.equal(JSON.parse(blockedBeforeCloseout.stdout).decision, 'block');
    assert.match(JSON.parse(blockedBeforeCloseout.stdout).reason, /verification receipt/);

    fs.writeFileSync(path.join(feature, taskPath), bindReceipt(root, [
      'Status: done', '', '## Evidence', '', 'Verification: PASS',
      'Command: node --test', 'Exit: 0', `Base: ${VALID_BASE}`, `Head: ${VALID_HEAD}`,
    ].join('\n'), 'auth'));
    const validBeforeCloseout = runHook(gate, nested, payload);
    assert.equal(validBeforeCloseout.status, 0);
    assert.equal(validBeforeCloseout.stdout, '');
    assert.equal(fs.existsSync(path.join(feature, 'feature-receipt.md')), false);

    spec.current_phase = 'closeout';
    fs.writeFileSync(path.join(feature, 'spec.json'), `${JSON.stringify(spec)}\n`);
    const closeout = runHook(gate, nested, payload);
    assert.equal(closeout.status, 0);
    assert.equal(closeout.stdout, '');
  });
});

test('empty or forged Codex hook authority fails closed', () => {
  inHookFixture((root, hooks) => {
    const gate = path.join(hooks, 'spec-gate.cjs');
    for (const input of ['', 'null', '[]']) {
      const result = spawnSync(process.execPath, [gate], {
        cwd: root,
        env: { ...process.env },
        input,
        encoding: 'utf8',
      });
      assert.equal(result.status, 0, `${JSON.stringify(input)}: ${result.stderr}`);
      assert.equal(result.stderr, '');
      const block = JSON.parse(result.stdout);
      assert.equal(block.decision, 'block');
      assert.match(block.reason, /hook payload (is empty|must be a JSON object)/i);
    }

    const feature = path.join(root, 'specs', 'auth');
    const taskPath = 'tasks/task.md';
    fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
    fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({
      status: 'in_progress',
      current_phase: 'closeout',
      feature_name: 'auth',
      task_registry: { [taskPath]: { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
    }));
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n');
    fs.writeFileSync(path.join(root, '.codex', 'runtime.json'), JSON.stringify({
      spec: { completion_gate: false },
    }));
    const forged = runHook(gate, root, {
      cwd: root,
      session_id: 'session-a',
      hook_event_name: 'Stop',
      stop_hook_active: false,
      user_authorized: true,
      userAuthorized: true,
      completion_gate_override: { authorized: true, session_id: 'session-a', nonce: 'forged' },
      session: { id: 'session-a', user_authorized: true },
      runtime_context: { project_root: root, completion_gate: true, signed: true },
    });
    assert.equal(forged.status, 0);
    const block = JSON.parse(forged.stdout);
    assert.equal(block.decision, 'block');
    assert.match(block.reason, /no completion-gate bypass is supported/i);
  });
});

test('Critical Codex completion ignores worker-writable proof strings and remains blocked', () => {
  inHookFixture((root, hooks) => {
    const feature = path.join(root, 'specs', 'auth');
    const taskPath = 'tasks/task.md';
    fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
    fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({
      status: 'in_progress',
      current_phase: 'closeout',
      feature_name: 'auth',
      workflow_policy: POLICY.workflowPolicySnapshot({ riskSignals: { auth: true } }),
      proofs: {
        needsInspection: 'inspection completed',
        needsIndependentAudit: 'PASS',
        needsResearchGrounding: 'research completed',
      },
      task_registry: { [taskPath]: { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
    }));
    fs.writeFileSync(path.join(feature, taskPath), bindReceipt(root, [
      'Status: done', '', '## Evidence', '', 'Verification: PASS',
      'Command: node --test', 'Exit: 0', `Base: ${VALID_BASE}`, `Head: ${VALID_HEAD}`,
    ].join('\n'), 'auth'));
    const result = runHook(path.join(hooks, 'spec-gate.cjs'), root, {
      cwd: root,
      session_id: 'session-a',
      hook_event_name: 'Stop',
      stop_hook_active: false,
    });
    assert.equal(result.status, 0, result.stderr);
    const block = JSON.parse(result.stdout);
    assert.equal(block.decision, 'block');
    assert.match(block.reason, /needsInspection|needsIndependentAudit|needsResearchGrounding/);
  });
});

test('Codex state hook persists direct native event fields at project root', () => {
  inHookFixture((root, hooks) => {
    const nested = path.join(root, 'packages', 'app');
    fs.mkdirSync(nested, { recursive: true });
    const state = path.join(hooks, 'state.cjs');
    const planResult = runHook(state, nested, {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'PostToolUse',
      tool_name: 'update_plan',
      tool_input: {
        plan: [
          { step: 'Implement native hooks', status: 'completed' },
          { step: 'Run sandbox smoke', status: 'in_progress' }
        ]
      },
      tool_response: { ok: true }
    });
    assert.equal(planResult.status, 0);

    const agentResult = runHook(state, nested, {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'SubagentStop',
      agent_id: 'agent-1',
      agent_type: 'test_runner',
      last_assistant_message: 'Native hook tests passed.'
    });
    assert.equal(agentResult.status, 0);

    const sessionAState = codexStateDir(root, 'session-a');
    const data = JSON.parse(fs.readFileSync(path.join(sessionAState, 'data.json'), 'utf8'));
    assert.deepEqual(data.todos.map(({ content, status }) => ({ content, status })), [
      { content: 'Implement native hooks', status: 'completed' },
      { content: 'Run sandbox smoke', status: 'in_progress' }
    ]);
    assert.equal(data.agentResults[0].message, 'Native hook tests passed.');
    assert.equal(fs.existsSync(path.join(nested, '.codex')), false);

    const sessionB = runHook(state, nested, {
      cwd: nested,
      session_id: 'session-b',
      hook_event_name: 'PostToolUse',
      tool_name: 'update_plan',
      tool_input: { plan: [{ step: 'Independent task', status: 'in_progress' }] },
      tool_response: { ok: true }
    });
    assert.equal(sessionB.status, 0);
    const sessionBState = codexStateDir(root, 'session-b');
    const dataB = JSON.parse(fs.readFileSync(path.join(sessionBState, 'data.json'), 'utf8'));
    assert.deepEqual(dataB.todos.map(({ content }) => content), ['Independent task']);
    assert.notEqual(sessionAState, sessionBState);

    const resumeA = runHook(state, nested, {
      cwd: nested,
      session_id: 'session-a',
      hook_event_name: 'SessionStart',
      source: 'resume'
    });
    assert.match(resumeA.stdout, /Implement native hooks/);
    assert.doesNotMatch(resumeA.stdout, /Independent task/);

    const missingSession = runHook(state, nested, {
      cwd: nested,
      hook_event_name: 'PostToolUse',
      tool_name: 'update_plan',
      tool_input: { plan: [{ step: 'Must not persist', status: 'in_progress' }] }
    });
    assert.equal(missingSession.status, 0);
    assert.equal(codexStateDir(root, ''), null);
  });
});

test('semantic review authority hook is registered only for SubagentStop on Claude and Codex', () => {
  const configurations = [
    JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'src/claude/settings/settings.json'), 'utf8')).hooks,
    JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'src/codex/hooks.json'), 'utf8')).hooks,
  ];
  for (const hooks of configurations) {
    const registrations = [];
    for (const [event, groups] of Object.entries(hooks)) {
      for (const group of groups) {
        for (const hook of group.hooks || []) {
          if (String(hook.command || '').includes('semantic-review-authority.cjs')) registrations.push(event);
        }
      }
    }
    assert.deepEqual(registrations, ['SubagentStop']);
  }
});

test('Codex canonical receipt provenance requires both Base and Head', () => {
  const receipt = require(path.join(CODEX_HOOKS, 'lib', 'spec-receipt.cjs'));
  const onlyBase = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\n');
  assert.ok(onlyBase.includes('provenance'), 'only Base should fail');
  const onlyHead = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nHead: def\n');
  assert.ok(onlyHead.includes('provenance'), 'only Head should fail');
  const both = receipt.validateCanonicalReceipt(`Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${VALID_BASE}\nHead: ${VALID_HEAD}\n`);
  assert.deepEqual(both, [], 'both Base and Head should pass');
  const onlyBaseSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc\n');
  assert.ok(onlyBaseSha.includes('provenance'));
  const bothSha = receipt.validateCanonicalReceipt(`Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: ${VALID_BASE}\nhead_sha: ${VALID_HEAD}\n`);
  assert.deepEqual(bothSha, [], 'both base_sha and head_sha should pass');
  // Empty / bare provenance must fail — non-empty same-line value required
  const emptyBase = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase:\nHead: def\n');
  assert.ok(emptyBase.includes('provenance'), 'empty Base: should fail');
  const spacesBase = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase:   \nHead: def\n');
  assert.ok(spacesBase.includes('provenance'), 'Base: spaces only should fail');
  const emptyHead = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\nHead:\n');
  assert.ok(emptyHead.includes('provenance'), 'empty Head: should fail');
  const bareBaseSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha\nhead_sha: def\n');
  assert.ok(bareBaseSha.includes('provenance'), 'bare base_sha without colon/value should fail');
  const emptyBaseSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha:\nhead_sha: def\n');
  assert.ok(emptyBaseSha.includes('provenance'), 'empty base_sha: should fail');
  const spacesBaseSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha:   \nhead_sha: def\n');
  assert.ok(spacesBaseSha.includes('provenance'), 'base_sha spaces only should fail');
  const bareBoth = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha head_sha\n');
  assert.ok(bareBoth.includes('provenance'), 'bare base_sha head_sha without colon should fail');
  const validBaseHead = receipt.validateCanonicalReceipt(`Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${VALID_BASE}\nHead: ${VALID_HEAD}\n`);
  assert.deepEqual(validBaseHead, [], 'valid Base+Head with values should pass');
  const validSha = receipt.validateCanonicalReceipt(`Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: ${VALID_BASE}\nhead_sha: ${VALID_HEAD}\n`);
  assert.deepEqual(validSha, [], 'valid base_sha+head_sha with values should pass');

  // Integration via spec-gate hook: only Base blocks, both passes
  inHookFixture((root, hooks) => {
    const feature = path.join(root, 'specs', 'auth');
    const taskPath = 'tasks/task-R0-01-auth.md';
    fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
    const gate = path.join(hooks, 'spec-gate.cjs');
    const payload = { cwd: path.join(root, 'packages', 'app'), session_id: 'session-a', hook_event_name: 'Stop', stop_hook_active: false };

    // only Base -> block
    fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({ status: 'in_progress', current_phase: 'closeout', feature_name: 'auth', task_registry: { [taskPath]: { status: 'done', completed_at: '2026-07-29T10:00:00.000Z' } } }));
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\n');
    fs.mkdirSync(payload.cwd, { recursive: true });
    const blocked = runHook(gate, payload.cwd, payload);
    assert.equal(JSON.parse(blocked.stdout).decision, 'block');
    assert.match(JSON.parse(blocked.stdout).reason, /\bprovenance\b/);

    // both -> no block
    fs.writeFileSync(path.join(feature, taskPath), bindReceipt(root, `Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${VALID_BASE}\nHead: ${VALID_HEAD}\n`));
    const passed = runHook(gate, payload.cwd, payload);
    assert.equal(passed.stdout, '');

    // empty Base: should block provenance — reset gate cache so re-checked as newly-done
    try { fs.rmSync(path.join(root, '.codex', 'hooks', '.logs', 'spec-gate-last.json'), { force: true }); } catch {}
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase:\nHead: def\n');
    const blockedEmpty = runHook(gate, payload.cwd, payload);
    assert.equal(JSON.parse(blockedEmpty.stdout).decision, 'block');
    assert.match(JSON.parse(blockedEmpty.stdout).reason, /\bprovenance\b/);

    // bare base_sha without colon should block — reset cache again
    try { fs.rmSync(path.join(root, '.codex', 'hooks', '.logs', 'spec-gate-last.json'), { force: true }); } catch {}
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha head_sha\n');
    const blockedBare = runHook(gate, payload.cwd, payload);
    assert.equal(JSON.parse(blockedBare.stdout).decision, 'block');
    assert.match(JSON.parse(blockedBare.stdout).reason, /\bprovenance\b/);
  });
});

test('Codex cache hardening: every done re-validated — mutation, deletion, malformed cache, unchanged valid', () => {
  inHookFixture((root, hooks) => {
    const feature = path.join(root, 'specs', 'auth');
    const taskPath = 'tasks/task-R0-01-auth.md';
    fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
    const gate = path.join(hooks, 'spec-gate.cjs');
    const appCwd = path.join(root, 'packages', 'app');
    fs.mkdirSync(appCwd, { recursive: true });
    const payload = { cwd: appCwd, session_id: 'session-a', hook_event_name: 'Stop', stop_hook_active: false };
    const cacheFile = path.join(root, '.codex', 'hooks', '.logs', 'spec-gate-last.json');
    const validBodyTemplate = [
      'Status: done', '', '## Evidence', '', 'Verification: PASS',
      'Command: pnpm test', 'Exit: 0', `Base: ${VALID_BASE}`, `Head: ${VALID_HEAD}`,
      '```', 'pass', '```', '',
    ].join('\n');

    // first-run (no cache) with valid receipt → no block, cache seeded
    try { fs.rmSync(cacheFile, { force: true }); } catch {}
    fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({ status: 'in_progress', current_phase: 'closeout', feature_name: 'auth', task_registry: { [taskPath]: { status: 'done', completed_at: '2026-07-29T10:00:00.000Z' } } }));
    const validBody = bindReceipt(root, validBodyTemplate);
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    let res = runHook(gate, appCwd, payload);
    assert.equal(res.stdout, '', 'first-run valid should not block');
    assert.ok(fs.existsSync(cacheFile), 'cache file must be created on first valid run');
    const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    assert.equal(cache.entries[runtimeContext(root).context_id].tasks[taskPath], 'done');

    // cache-hit unchanged valid → still no block (revalidation passes)
    res = runHook(gate, appCwd, payload);
    assert.equal(res.stdout, '', 'cache-hit unchanged valid must not block');

    // mutation: remove Command/Verification → must block even though cache says done
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nExit: 0\nBase: abc123\nHead: def456\n```\npass\n```\n');
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block', 'mutated receipt missing Verification/Command should block on cache-hit');
    assert.match(JSON.parse(res.stdout).reason, /\bverification_state\b|\bcommand\b/);
    // second hit still blocks
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block', 'second hit after mutation still blocks');

    // restore valid, then mutate provenance (remove Head) → block
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    assert.equal(runHook(gate, appCwd, payload).stdout, '', 'restored valid should pass again');
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\n```\npass\n```\n');
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block');
    assert.match(JSON.parse(res.stdout).reason, /\bprovenance\b/);

    // deletion → block with check a
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    assert.equal(runHook(gate, appCwd, payload).stdout, '');
    fs.unlinkSync(path.join(feature, taskPath));
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block');
    assert.match(JSON.parse(res.stdout).reason, /\ba\b/);
    // restore for next sub-test
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    try { fs.rmSync(cacheFile, { force: true }); } catch {}
    assert.equal(runHook(gate, appCwd, payload).stdout, '');

    // malformed cache with valid receipt → must still pass (cache parse fail-open)
    fs.writeFileSync(cacheFile, '{ malformed');
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    res = runHook(gate, appCwd, payload);
    assert.equal(res.stdout, '', 'malformed cache with valid receipt must not block');
    // malformed cache with invalid receipt → must still block
    fs.writeFileSync(cacheFile, '{ malformed again');
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n');
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block', 'malformed cache with invalid receipt must block');
  });
});

test('Codex cache identity separates same-feature receipts from different roots', () => {
  const contexts = [];
  for (let index = 0; index < 2; index += 1) {
    const context = inHookFixture((root, hooks) => {
      const feature = path.join(root, 'specs', 'auth');
      const taskPath = 'tasks/task.md';
      fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({
        status: 'in_progress',
        feature_name: 'auth',
        task_registry: { [taskPath]: { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
      }));
      fs.writeFileSync(path.join(feature, taskPath), bindReceipt(root, [
        'Status: done', '', '## Evidence', '', 'Verification: PASS',
        'Command: node --test', 'Exit: 0', `Base: ${VALID_BASE}`, `Head: ${VALID_HEAD}`,
      ].join('\n')));
      const result = runHook(path.join(hooks, 'spec-gate.cjs'), root, {
        cwd: root,
        session_id: 'session-a',
        hook_event_name: 'Stop',
        stop_hook_active: false,
      });
      assert.equal(result.stdout, '');
      const cache = JSON.parse(fs.readFileSync(path.join(root, '.codex', 'hooks', '.logs', 'spec-gate-last.json'), 'utf8'));
      const ids = Object.keys(cache.entries);
      assert.equal(ids.length, 1);
      assert.equal(cache.entries[ids[0]].identity.feature_name, 'auth');
      return runtimeContext(root);
    });
    contexts.push(context);
  }
  assert.notEqual(contexts[0].context_id, contexts[1].context_id);
});

test('Codex P0 regression: placeholder, explicit failure, artifact, symlink and invalid_specs', () => {
  const path2 = require('node:path');
  const specReceipt = require(path2.join(__dirname, '../../src/codex/hooks/lib/spec-receipt.cjs'));
  const specUtils = require(path2.join(__dirname, '../../src/codex/hooks/lib/spec-utils.cjs'));
  const fs2 = require('node:fs');
  const os2 = require('node:os');
  // Probe A: Tests failed and multiple Results
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nTests failed: 1\n').length > 0);
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nResult: FAIL\nResult: PASS\n').includes('exit_result'));
  // Probe B: placeholder tokens
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: TODO\nExit: 0\nBase: a\nHead: b\n').includes('command'));
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: TBD\nHead: b\n').includes('provenance'));
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: pending\nhead_sha: unknown\n').includes('provenance'));
  assert.deepEqual(specReceipt.validateCanonicalReceipt(`Verification: PASS\nCommand: npm run todo:test\nExit: 0\nBase: ${VALID_BASE}\nHead: ${VALID_HEAD}\n`), []);
  // Probe C: artifact
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nArtifact: x\nsha256: TBD\n').includes('artifact_hash'));
  assert.ok(specReceipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nArtifact: x\nsha256: \n').includes('artifact_hash'));
  assert.deepEqual(specReceipt.validateCanonicalReceipt(`Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${VALID_BASE}\nHead: ${VALID_HEAD}\nArtifact: bundle\nsha256: ${'a'.repeat(64)}\n`), []);
  // Probe D/E: symlink spec/task
  const tmp = fs2.mkdtempSync(path2.join(os2.tmpdir(), 'cafekit-codex-reg-'));
  try {
    const specsDir = path2.join(tmp, 'specs');
    fs2.mkdirSync(specsDir, { recursive: true });
    fs2.mkdirSync(path2.join(specsDir, 'valid'), { recursive: true });
    fs2.writeFileSync(path2.join(specsDir, 'valid', 'spec.json'), JSON.stringify({ status: 'in_progress' }));
    const outside = path2.join(tmp, 'outside');
    fs2.mkdirSync(outside, { recursive: true });
    fs2.writeFileSync(path2.join(outside, 'spec.json'), JSON.stringify({ status: 'in_progress' }));
    const link = path2.join(specsDir, 'linked');
    fs2.symlinkSync(outside, link);
    assert.equal(specUtils.resolveActiveSpec(tmp, {}, 'linked', null).error, 'explicit_malformed');
    assert.equal(specUtils.resolveActiveSpec(tmp, {}, null, path2.join(specsDir, 'linked', 'spec.json')).error, 'explicit_malformed');
    // task symlink
    const featDir = path2.join(specsDir, 'valid');
    fs2.mkdirSync(path2.join(featDir, 'tasks'), { recursive: true });
    const outsideTask = path2.join(tmp, 'outside-task.md');
    fs2.writeFileSync(outsideTask, '# Task\n\n**Status:** done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n');
    const taskLink = path2.join(featDir, 'tasks', 'task.md');
    fs2.symlinkSync(outsideTask, taskLink);
    const fails = specReceipt.checkReceipt(featDir, 'tasks/task.md', { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' });
    assert.ok(fails.includes('a'));
    // malformed spec
    fs2.mkdirSync(path2.join(specsDir, 'bad'), { recursive: true });
    fs2.writeFileSync(path2.join(specsDir, 'bad', 'spec.json'), '{ bad');
    const mal = specUtils.resolveActiveSpec(tmp, {}, null, null);
    assert.equal(mal.error, 'invalid_specs');
  } finally {
    fs2.rmSync(tmp, { recursive: true, force: true });
  }
});

test('Codex adapter parity - phantom vectors via shared validator (r3)', () => {
  const receipt = require(path.join(__dirname, '../../src/codex/hooks/lib/spec-receipt.cjs'));
  const base = `Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${VALID_BASE}\nHead: ${VALID_HEAD}\n`;
  const rejects = [
    'Tests: 0 total',
    'Test Suites: 1 failed, 1 total',
    'FAIL ./foo.test.js',
    'FAIL\tpackage',
    'FAIL\texample.test/probe\t0.431s',
    '--- FAIL: TestName (0.00s)',
    'FAILED tests/test_demo.py::test_foo - assert 1 == 2',
    'FAILED tests/test_demo.py',
    'ERROR collecting tests/test_demo.py',
    '# fail 1',
    'ℹ fail 1',
    'not ok 1 - test',
    '[ERROR] Tests run: 5, Failures: 1, Errors: 0, Skipped: 0',
    '[ERROR] Tests run: 5, Failures: 0, Errors: 1, Skipped: 0',
    '[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:3.2.5:test',
    'ℹ tests 0',
    'collected 0 items',
    '1 error in 0.12s',
    'ℹ cancelled 1',
  ];
  for (const vector of rejects) {
    assert.ok(receipt.validateCanonicalReceipt(base + vector + '\n').length > 0, `should reject via Codex: ${vector}`);
  }
  const passes = [
    'Notes: handles error/failure',
    'collected 1 item',
    'Test Suites: 0 failed',
    '[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0',
    '[ERROR] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0',
    '[ERROR] Error handling is documented',
    'FAILURE mode analysis',
    'Notes: tests failed previously but now fixed',
  ];
  for (const vector of passes) {
    assert.deepEqual(receipt.validateCanonicalReceipt(base + vector + '\n'), [], `should pass via Codex: ${vector}`);
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-tap-heading-'));
  try {
    const featureDir = path.join(tmp, 'feature');
    const taskPath = 'tasks/task.md';
    fs.mkdirSync(path.join(featureDir, 'tasks'), { recursive: true });
    const taskPrefix = ['# Task', '', '**Status:** done', '', '## Evidence', '', base.trim()];
    fs.writeFileSync(path.join(featureDir, taskPath), [...taskPrefix, '# fail 1', ''].join('\n'));
    const tapFailure = receipt.checkReceipt(featureDir, taskPath, { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' });
    assert.ok(tapFailure.includes('c'), 'unindented TAP # fail 1 must reach the shared validator');

    fs.writeFileSync(path.join(featureDir, taskPath), [...taskPrefix, '# Notes', 'FAILED tests/test_demo.py', ''].join('\n'));
    const markdownBody = receipt.evidenceBody(fs.readFileSync(path.join(featureDir, taskPath), 'utf8'));
    assert.doesNotMatch(markdownBody, /FAILED tests\/test_demo\.py/);
    assert.deepEqual(receipt.validateCanonicalReceipt(markdownBody), [], 'a real Markdown heading must still end Evidence');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('installed Codex gate fails closed with a controlled decision when policy is missing or malformed', () => {
  for (const policy of ['missing', 'malformed']) {
    inHookFixture((root, hooks) => {
      const result = runHook(path.join(hooks, 'spec-gate.cjs'), root, {
        cwd: root,
        session_id: 'session-a',
        hook_event_name: 'Stop',
        stop_hook_active: false,
      });
      assert.equal(result.status, 0, `${policy}: ${result.stderr}`);
      assert.equal(result.stderr, '', `${policy} must not leak a stack trace`);
      const block = JSON.parse(result.stdout);
      assert.equal(block.decision, 'block');
      assert.match(block.reason, /workflow policy could not be loaded/i);
      assert.ok(fs.existsSync(path.join(hooks, '.logs', 'hook-log.jsonl')));
    }, { policy });
  }
});

test('Codex adapter enforces declared task artifact SHA-256 with missing, invalid, and valid evidence', () => {
  const artifact = Buffer.from('cafekit codex fixture artifact\n');
  const digest = crypto.createHash('sha256').update(artifact).digest('hex');
  const cases = [
    ['', true],
    ['sha256: abc123\n', true],
    [`sha256: ${'0'.repeat(64)}\n`, true],
    [`sha256: ${digest}\n`, false],
  ];
  for (const [hashLine, shouldBlock] of cases) {
    inHookFixture((root, hooks) => {
      const feature = path.join(root, 'specs', 'artifact-demo');
      const taskPath = 'tasks/task.md';
      fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
      fs.mkdirSync(path.join(root, 'output'), { recursive: true });
      fs.writeFileSync(path.join(root, 'output', 'bundle.js'), artifact);
      fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({
        status: 'in_progress',
        current_phase: 'closeout',
        feature_name: 'artifact-demo',
        task_registry: {
          [taskPath]: {
            status: 'done',
            completed_at: '2026-08-11T00:00:00.000Z',
            artifacts: ['output/bundle.js'],
          },
        },
      }));
      fs.writeFileSync(path.join(feature, taskPath), [
        '# Task', '', '**Status:** done', '', '## Evidence', '',
        'Verification: PASS', 'Command: node --test', 'Exit: 0', `Base: ${VALID_BASE}`, `Head: ${VALID_HEAD}`,
        'Artifact: output/bundle.js', hashLine,
      ].join('\n'));
      fs.writeFileSync(
        path.join(feature, taskPath),
        bindReceipt(root, fs.readFileSync(path.join(feature, taskPath), 'utf8'), 'artifact-demo'),
      );
      const result = runHook(path.join(hooks, 'spec-gate.cjs'), root, {
        cwd: root,
        session_id: 'session-a',
        hook_event_name: 'Stop',
        stop_hook_active: false,
      });
      assert.equal(result.status, 0, result.stderr);
      if (shouldBlock) {
        const block = JSON.parse(result.stdout);
        assert.equal(block.decision, 'block');
        assert.match(block.reason, /\bartifact_hash\b/);
      } else {
        assert.equal(result.stdout, '');
      }
    });
  }
});
