'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const CODEX_HOOKS = path.join(PACKAGE_ROOT, 'src/codex/hooks');
const { stateDir: codexStateDir } = require(
  path.join(CODEX_HOOKS, 'lib', 'state-store.cjs')
);

function runHook(file, cwd, payload) {
  return spawnSync(process.execPath, [file], {
    cwd,
    input: JSON.stringify(payload),
    encoding: 'utf8'
  });
}

function inHookFixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-codex-hooks-'));
  const hooks = path.join(root, '.codex', 'hooks');
  try {
    fs.cpSync(CODEX_HOOKS, hooks, { recursive: true });
    fs.mkdirSync(path.join(root, '.codex', 'scripts'), { recursive: true });
    fs.copyFileSync(
      path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs'),
      path.join(root, '.codex', 'scripts', 'workflow-policy.cjs'),
    );
    fs.writeFileSync(path.join(root, '.codex', 'scripts', 'spec-scaffold.cjs'), '');
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

    const blocked = runHook(gate, nested, payload);
    assert.equal(blocked.status, 0);
    assert.equal(JSON.parse(blocked.stdout).decision, 'block');
    assert.match(JSON.parse(blocked.stdout).reason, /verification receipt/);
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

test('Codex canonical receipt provenance requires both Base and Head', () => {
  const receipt = require(path.join(CODEX_HOOKS, 'lib', 'spec-receipt.cjs'));
  const onlyBase = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\n');
  assert.ok(onlyBase.includes('provenance'), 'only Base should fail');
  const onlyHead = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nHead: def\n');
  assert.ok(onlyHead.includes('provenance'), 'only Head should fail');
  const both = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\nHead: def\n');
  assert.deepEqual(both, [], 'both Base and Head should pass');
  const onlyBaseSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc\n');
  assert.ok(onlyBaseSha.includes('provenance'));
  const bothSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc\nhead_sha: def\n');
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
  const validBaseHead = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\nHead: def456\n');
  assert.deepEqual(validBaseHead, [], 'valid Base+Head with values should pass');
  const validSha = receipt.validateCanonicalReceipt('Verification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha: abc123\nhead_sha: def456\n');
  assert.deepEqual(validSha, [], 'valid base_sha+head_sha with values should pass');

  // Integration via spec-gate hook: only Base blocks, both passes
  inHookFixture((root, hooks) => {
    const feature = path.join(root, 'specs', 'auth');
    const taskPath = 'tasks/task-R0-01-auth.md';
    fs.mkdirSync(path.join(feature, 'tasks'), { recursive: true });
    const gate = path.join(hooks, 'spec-gate.cjs');
    const payload = { cwd: path.join(root, 'packages', 'app'), session_id: 'session-a', hook_event_name: 'Stop', stop_hook_active: false };

    // only Base -> block
    fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({ status: 'in_progress', task_registry: { [taskPath]: { status: 'done', completed_at: '2026-07-29T10:00:00.000Z' } } }));
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\n');
    fs.mkdirSync(payload.cwd, { recursive: true });
    const blocked = runHook(gate, payload.cwd, payload);
    assert.equal(JSON.parse(blocked.stdout).decision, 'block');
    assert.match(JSON.parse(blocked.stdout).reason, /\bg\b|\bprovenance\b/);

    // both -> no block
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc\nHead: def\n');
    const passed = runHook(gate, payload.cwd, payload);
    assert.equal(passed.stdout, '');

    // empty Base: should block provenance — reset gate cache so re-checked as newly-done
    try { fs.rmSync(path.join(root, '.codex', 'hooks', '.logs', 'spec-gate-last.json'), { force: true }); } catch {}
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase:\nHead: def\n');
    const blockedEmpty = runHook(gate, payload.cwd, payload);
    assert.equal(JSON.parse(blockedEmpty.stdout).decision, 'block');
    assert.match(JSON.parse(blockedEmpty.stdout).reason, /\bg\b/);

    // bare base_sha without colon should block — reset cache again
    try { fs.rmSync(path.join(root, '.codex', 'hooks', '.logs', 'spec-gate-last.json'), { force: true }); } catch {}
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nbase_sha head_sha\n');
    const blockedBare = runHook(gate, payload.cwd, payload);
    assert.equal(JSON.parse(blockedBare.stdout).decision, 'block');
    assert.match(JSON.parse(blockedBare.stdout).reason, /\bg\b/);
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
    const validBody = 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\nHead: def456\n```\npass\n```\n';

    // first-run (no cache) with valid receipt → no block, cache seeded
    try { fs.rmSync(cacheFile, { force: true }); } catch {}
    fs.writeFileSync(path.join(feature, 'spec.json'), JSON.stringify({ status: 'in_progress', task_registry: { [taskPath]: { status: 'done', completed_at: '2026-07-29T10:00:00.000Z' } } }));
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    let res = runHook(gate, appCwd, payload);
    assert.equal(res.stdout, '', 'first-run valid should not block');
    assert.ok(fs.existsSync(cacheFile), 'cache file must be created on first valid run');
    assert.equal(JSON.parse(fs.readFileSync(cacheFile, 'utf8')).auth[taskPath], 'done');

    // cache-hit unchanged valid → still no block (revalidation passes)
    res = runHook(gate, appCwd, payload);
    assert.equal(res.stdout, '', 'cache-hit unchanged valid must not block');

    // mutation: remove Command/Verification → must block even though cache says done
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nExit: 0\nBase: abc123\nHead: def456\n```\npass\n```\n');
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block', 'mutated receipt missing Verification/Command should block on cache-hit');
    assert.match(JSON.parse(res.stdout).reason, /\bc\b|\be\b/);
    // second hit still blocks
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block', 'second hit after mutation still blocks');

    // restore valid, then mutate provenance (remove Head) → block
    fs.writeFileSync(path.join(feature, taskPath), validBody);
    assert.equal(runHook(gate, appCwd, payload).stdout, '', 'restored valid should pass again');
    fs.writeFileSync(path.join(feature, taskPath), 'Status: done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: abc123\n```\npass\n```\n');
    res = runHook(gate, appCwd, payload);
    assert.equal(JSON.parse(res.stdout).decision, 'block');
    assert.match(JSON.parse(res.stdout).reason, /\bg\b/);

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
