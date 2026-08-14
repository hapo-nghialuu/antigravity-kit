'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { pathToFileURL } = require('node:url');

const PACKAGE_ROOT = path.join(__dirname, '../..');
const GATE_SRC = path.join(PACKAGE_ROOT, 'src/opencode/plugins/spec-gate.ts');
const STATE_SRC = path.join(PACKAGE_ROOT, 'src/opencode/plugins/spec-state.ts');
const BASE_SHA = 'a'.repeat(40);
const HEAD_SHA = 'b'.repeat(40);

function mkTmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-opencode-'));
}

function getTypescript() {
  try {
    return require('typescript');
  } catch (_) {
    // Fallback to workspace root (pnpm hoists typescript there)
    const alt = path.join(PACKAGE_ROOT, '..', '..', 'node_modules', 'typescript');
    return require(alt);
  }
}

function compileToMjs(srcPath, outPath) {
  const ts = getTypescript();
  const source = fs.readFileSync(srcPath, 'utf8');
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
  });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, result.outputText, 'utf8');
}

function ensureSharedValidator(tmp) {
  const sources = [
    ['workflow-policy.cjs', path.join(PACKAGE_ROOT, 'src/claude/scripts/workflow-policy.cjs')],
    ['spec-resolver.cjs', path.join(PACKAGE_ROOT, 'src/claude/scripts/spec-resolver.cjs')],
    ['provenance.cjs', path.join(PACKAGE_ROOT, 'src/claude/scripts/provenance.cjs')],
  ];
  const dests = [
    path.join(tmp, '.opencode', 'scripts'),
    path.join(tmp, 'scripts'),
  ];
  for (const destDir of dests) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const [name, source] of sources) fs.copyFileSync(source, path.join(destDir, name));
  }
}

test('OpenCode SpecGate lists multiple active candidates and does not pick first', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    const specsDir = path.join(tmp, 'specs');
    fs.mkdirSync(specsDir, { recursive: true });
    for (const name of ['alpha', 'beta']) {
      fs.mkdirSync(path.join(specsDir, name), { recursive: true });
      fs.writeFileSync(path.join(specsDir, name, 'spec.json'), JSON.stringify({ feature_name: name, status: 'in_progress', current_phase: 'design', task_registry: {} }));
    }
    const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
    compileToMjs(GATE_SRC, out);
    const { SpecGate } = await import(pathToFileURL(out).href);
    const gate = await SpecGate({ directory: tmp });
    const captured = [];
    const origErr = console.error;
    console.error = (...args) => captured.push(args.join(' '));
    try {
      await gate.event({ event: { type: 'session.idle' } });
    } finally {
      console.error = origErr;
    }
    const bannerPath = path.join(tmp, '.opencode', 'session-banner.md');
    let banner = '';
    try { banner = fs.readFileSync(bannerPath, 'utf8'); } catch {}
    const combined = captured.join('\n') + '\n' + banner;
    assert.match(combined, /multiple active specs detected/i);
    assert.match(combined, /alpha/);
    assert.match(combined, /beta/);
    // Ensure not silently using first spec's task failures (which would be none) — must surface ambiguity
    assert.doesNotMatch(combined, /no verification receipt/i);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode installed gate reports missing and malformed shared policy as controlled unavailable status', async () => {
  for (const policyMode of ['missing', 'malformed']) {
    const tmp = mkTmp();
    const out = path.join(tmp, '.opencode', 'plugins', 'spec-gate.mjs');
    if (policyMode === 'malformed') {
      fs.mkdirSync(path.join(tmp, '.opencode', 'scripts'), { recursive: true });
      fs.writeFileSync(path.join(tmp, '.opencode', 'scripts', 'workflow-policy.cjs'), 'module.exports = {\n');
    }
    const resolver = path.join(PACKAGE_ROOT, 'src/claude/scripts/spec-resolver.cjs');
    for (const scriptsDir of [path.join(tmp, 'scripts'), path.join(tmp, '.opencode', 'scripts')]) {
      fs.mkdirSync(scriptsDir, { recursive: true });
      fs.copyFileSync(resolver, path.join(scriptsDir, 'spec-resolver.cjs'));
    }
    fs.mkdirSync(path.join(tmp, 'specs', 'demo', 'tasks'), { recursive: true });
    fs.writeFileSync(path.join(tmp, 'specs', 'demo', 'spec.json'), JSON.stringify({
      feature_name: 'demo',
      status: 'in_progress',
      task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
    }));
    fs.writeFileSync(path.join(tmp, 'specs', 'demo', 'tasks', 'task.md'), `# Task\n\n**Status:** done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${BASE_SHA}\nHead: ${HEAD_SHA}\n`);
    compileToMjs(GATE_SRC, out);
    try {
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const original = console.error;
      console.error = (...args) => captured.push(args.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = original; }
      const banner = fs.readFileSync(path.join(tmp, '.opencode', 'session-banner.md'), 'utf8');
      const combined = `${captured.join('\n')}\n${banner}`;
      assert.match(combined, /validator_unavailable|workflow policy/i);
      assert.doesNotMatch(combined, /SyntaxError|at .*\.mjs:/);
      await assert.rejects(
        () => gate['tool.execute.before'](
          { tool: 'taskupdate', sessionID: 's-policy', callID: 'c-policy' },
          { args: { featureName: 'demo' } },
        ),
        (error) => error.code === 'CAFEKIT_SPEC_GATE_BLOCKED' && /validator_unavailable|workflow policy/i.test(error.message),
      );
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
});

test('OpenCode hard-blocks completion tools with a controlled result and allows receipt repair tools', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    const taskDir = path.join(tmp, 'specs', 'demo', 'tasks');
    fs.mkdirSync(taskDir, { recursive: true });
    fs.writeFileSync(path.join(tmp, 'specs', 'demo', 'spec.json'), JSON.stringify({
      feature_name: 'demo',
      status: 'in_progress',
      task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
    }));
    fs.writeFileSync(path.join(taskDir, 'task.md'), '# Task\n\n**Status:** done\n\n## Evidence\n\nVerification: PASS\nExit: 1\n');
    const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
    compileToMjs(GATE_SRC, out);
    const { SpecGate } = await import(pathToFileURL(out).href);
    const gate = await SpecGate({ directory: tmp });

    await assert.rejects(
      () => gate['tool.execute.before'](
        { tool: 'taskupdate', sessionID: 'session-full', callID: 'call-1' },
        { args: { featureName: 'demo' } },
      ),
      (error) => (
        error.name === 'CafeKitSpecGateBlocked'
        && error.code === 'CAFEKIT_SPEC_GATE_BLOCKED'
        && error.result?.decision === 'block'
        && /Exit|failed check/i.test(error.message)
      ),
    );

    // Editing the receipt remains available so the blocked state can be repaired.
    await gate['tool.execute.before'](
      { tool: 'edit', sessionID: 'session-full', callID: 'call-2' },
      { args: { featureName: 'demo' } },
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode explicit feature/path target selects the requested spec and never picks first', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    for (const name of ['alpha', 'beta']) {
      fs.mkdirSync(path.join(tmp, 'specs', name), { recursive: true });
      fs.writeFileSync(path.join(tmp, 'specs', name, 'spec.json'), JSON.stringify({ feature_name: name, status: 'in_progress', task_registry: {} }));
    }
    const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
    compileToMjs(GATE_SRC, out);
    const { SpecGate } = await import(pathToFileURL(out).href);
    const gate = await SpecGate({ directory: tmp });

    await assert.rejects(
      () => gate['tool.execute.before'](
        { tool: 'taskupdate', sessionID: 'session-target', callID: 'call-1' },
        { args: {} },
      ),
      (error) => /multiple active specs/i.test(error.message)
        && /alpha.*beta/i.test(error.message)
        && /featureName|specPath/i.test(error.message),
    );
    await gate['tool.execute.before'](
      { tool: 'taskupdate', sessionID: 'session-target', callID: 'call-2', featureName: 'beta' },
      { args: {} },
    );
    await gate['tool.execute.before'](
      { tool: 'taskupdate', sessionID: 'session-target', callID: 'call-3' },
      { args: { specPath: path.join('specs', 'beta', 'spec.json') } },
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode adapter enforces declared task artifact SHA-256 with missing, invalid, and valid evidence', async () => {
  const digest = 'c'.repeat(64);
  const cases = [
    ['', true],
    ['sha256: abc123\n', true],
    [`sha256: ${digest}\n`, false],
  ];
  for (const [hashLine, shouldBlock] of cases) {
    const tmp = mkTmp();
    ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'artifact-demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'artifact-demo', 'spec.json'), JSON.stringify({
        feature_name: 'artifact-demo',
        status: 'in_progress',
        task_registry: {
          'tasks/task.md': {
            status: 'done',
            completed_at: '2026-08-11T00:00:00.000Z',
            artifacts: ['output/bundle.js'],
          },
        },
      }));
      fs.writeFileSync(path.join(specsDir, 'artifact-demo', 'tasks', 'task.md'), [
        '# Task', '', '**Status:** done', '', '## Evidence', '',
        'Verification: PASS', 'Command: node --test', 'Exit: 0', `Base: ${BASE_SHA}`, `Head: ${HEAD_SHA}`,
        'Artifact: output/bundle.js', hashLine,
      ].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const original = console.error;
      console.error = (...args) => captured.push(args.join(' '));
      try {
        await gate.event({ event: { type: 'session.idle' } });
      } finally {
        console.error = original;
      }
      const banner = fs.existsSync(path.join(tmp, '.opencode', 'session-banner.md'))
        ? fs.readFileSync(path.join(tmp, '.opencode', 'session-banner.md'), 'utf8')
        : '';
      const combined = `${captured.join('\n')}\n${banner}`;
      if (shouldBlock) {
        assert.match(combined, /failed check/i);
        assert.match(combined, /\bh\b/);
      } else {
        assert.doesNotMatch(combined, /failed check/i);
      }
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
});

test('OpenCode gate and state use the same configured external specs authority', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    const localSpecs = path.join(tmp, 'specs');
    const externalSpecs = path.join(tmp, 'external-specs');
    fs.mkdirSync(path.join(localSpecs, 'local'), { recursive: true });
    fs.mkdirSync(path.join(externalSpecs, 'remote', 'tasks'), { recursive: true });
    fs.writeFileSync(path.join(localSpecs, 'local', 'spec.json'), JSON.stringify({ feature_name: 'local', status: 'in_progress', current_phase: 'local' }));
    fs.writeFileSync(path.join(externalSpecs, 'remote', 'spec.json'), JSON.stringify({
      feature_name: 'remote',
      status: 'in_progress',
      current_phase: 'remote',
      task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
    }));
    fs.writeFileSync(path.join(externalSpecs, 'remote', 'tasks', 'task.md'), '# Task\n\n**Status:** done\n');
    fs.mkdirSync(path.join(tmp, '.opencode'), { recursive: true });
    fs.writeFileSync(path.join(tmp, '.opencode', 'runtime.json'), JSON.stringify({ paths: { specs: externalSpecs } }));

    const gateOut = path.join(tmp, '.opencode', 'plugins', 'spec-gate.mjs');
    compileToMjs(GATE_SRC, gateOut);
    const { SpecGate } = await import(pathToFileURL(gateOut).href);
    const gate = await SpecGate({ directory: tmp });
    const captured = [];
    const original = console.error;
    console.error = (...args) => captured.push(args.join(' '));
    try {
      await gate.event({ event: { type: 'session.idle' } });
    } finally {
      console.error = original;
    }
    const banner = fs.readFileSync(path.join(tmp, '.opencode', 'session-banner.md'), 'utf8');
    const gateText = `${captured.join('\n')}\n${banner}`;
    assert.match(gateText, /remote/);
    assert.doesNotMatch(gateText, /local/);

    const stateOut = path.join(tmp, '.opencode', 'plugins', 'spec-state.mjs');
    compileToMjs(STATE_SRC, stateOut);
    const { SpecState } = await import(pathToFileURL(stateOut).href);
    const state = await SpecState({ directory: tmp });
    const output = { message: { id: 'external', sessionID: 'external' }, parts: [] };
    await state['chat.message']({}, output);
    const stateText = output.parts.map((part) => part.text || '').join('\n');
    assert.match(stateText, /remote/);
    assert.doesNotMatch(stateText, /local/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode SpecState injects multiple-active warning with candidates', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    const specsDir = path.join(tmp, 'specs');
    fs.mkdirSync(specsDir, { recursive: true });
    for (const name of ['alpha', 'beta']) {
      fs.mkdirSync(path.join(specsDir, name), { recursive: true });
      fs.writeFileSync(path.join(specsDir, name, 'spec.json'), JSON.stringify({ feature_name: name, status: 'in_progress', current_phase: 'design', task_registry: {} }));
    }
    const out = path.join(tmp, 'plugins', 'spec-state.mjs');
    compileToMjs(STATE_SRC, out);
    const { SpecState } = await import(pathToFileURL(out).href);
    const state = await SpecState({ directory: tmp });
    const output = { message: { id: 'm1', sessionID: 's1' }, parts: [] };
    await state['chat.message']({}, output);
    const text = output.parts.map((p) => p.text || '').join('\n');
    assert.match(text, /Multiple active specs detected/i);
    assert.match(text, /alpha/);
    assert.match(text, /beta/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode SpecGate reports Exit:1 receipt as a completion failure', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    const specsDir = path.join(tmp, 'specs');
    fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
    // Single active spec with done task but Exit 1 must remain incomplete.
    fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({
      feature_name: 'demo',
      status: 'in_progress',
      current_phase: 'implement',
      task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } },
    }));
    fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), [
      '# Task',
      '',
      '**Status:** done',
      '',
      '## Evidence',
      '',
      'Verification: PASS',
      'Command: pnpm test',
      'Exit: 1',
      `Base: ${BASE_SHA}`,
      `Head: ${HEAD_SHA}`,
      '',
    ].join('\n'));
    const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
    compileToMjs(GATE_SRC, out);
    const { SpecGate } = await import(pathToFileURL(out).href);
    const gate = await SpecGate({ directory: tmp });
    const captured = [];
    const origErr = console.error;
    console.error = (...args) => captured.push(args.join(' '));
    try {
      await gate.event({ event: { type: 'session.idle' } });
    } finally {
      console.error = origErr;
    }
    const bannerPath = path.join(tmp, '.opencode', 'session-banner.md');
    let banner = '';
    try { banner = fs.readFileSync(bannerPath, 'utf8'); } catch {}
    const combined = captured.join('\n') + '\n' + banner;
    // Should surface verification receipt failure, not pass silently
    assert.match(combined, /verification receipt|failed check/i);
    assert.match(combined, /tasks\/task\.md/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode SpecState single active injects tollgate block (not multiple)', async () => {
  const tmp = mkTmp();
  ensureSharedValidator(tmp);
  try {
    const specsDir = path.join(tmp, 'specs');
    fs.mkdirSync(path.join(specsDir, 'solo'), { recursive: true });
    fs.writeFileSync(path.join(specsDir, 'solo', 'spec.json'), JSON.stringify({ feature_name: 'solo', status: 'in_progress', current_phase: 'design', task_registry: { 'tasks/a.md': { status: 'pending' } } }));
    const out = path.join(tmp, 'plugins', 'spec-state.mjs');
    compileToMjs(STATE_SRC, out);
    const { SpecState } = await import(pathToFileURL(out).href);
    const state = await SpecState({ directory: tmp });
    const output = { message: { id: 'm2', sessionID: 's2' }, parts: [] };
    await state['chat.message']({}, output);
    const text = output.parts.map((p) => p.text || '').join('\n');
    assert.match(text, /`solo`/);
    assert.doesNotMatch(text, /Multiple active specs detected/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('OpenCode tollgate cache binds canonical root, full session identity, and spec identity', async () => {
  const tmp = mkTmp();
  const projectA = mkTmp();
  const projectB = mkTmp();
  try {
    ensureSharedValidator(tmp);
    for (const project of [projectA, projectB]) {
      fs.mkdirSync(path.join(project, 'specs', 'same'), { recursive: true });
      fs.writeFileSync(path.join(project, 'specs', 'same', 'spec.json'), JSON.stringify({
        feature_name: 'same',
        status: 'in_progress',
        current_phase: 'design',
        task_registry: { 'tasks/task.md': { status: 'pending' } },
      }));
    }
    const out = path.join(tmp, 'plugins', 'spec-state.mjs');
    compileToMjs(STATE_SRC, out);
    const { SpecState } = await import(pathToFileURL(out).href);
    const state = await SpecState({ directory: projectA });

    const first = { message: { id: 'm-a', sessionID: 'same-session' }, parts: [] };
    await state['chat.message']({}, first);
    assert.match(first.parts.map((part) => part.text || '').join('\n'), /URGENT SYSTEM TOLLGATE/);

    const second = { message: { id: 'm-b', sessionID: 'same-session' }, parts: [] };
    await (await SpecState({ directory: projectB }))['chat.message']({}, second);
    assert.match(second.parts.map((part) => part.text || '').join('\n'), /URGENT SYSTEM TOLLGATE/);

    fs.rmSync(path.join(projectA, 'specs', 'same'), { recursive: true, force: true });
    fs.mkdirSync(path.join(projectA, 'specs', 'other'), { recursive: true });
    fs.writeFileSync(path.join(projectA, 'specs', 'other', 'spec.json'), JSON.stringify({
      feature_name: 'other',
      status: 'in_progress',
      current_phase: 'design',
      task_registry: { 'tasks/task.md': { status: 'pending' } },
    }));
    const third = { message: { id: 'm-c', sessionID: 'same-session' }, parts: [] };
    await state['chat.message']({}, third);
    const thirdText = third.parts.map((part) => part.text || '').join('\n');
    assert.match(thirdText, /`other`/);
    assert.match(thirdText, /URGENT SYSTEM TOLLGATE/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.rmSync(projectA, { recursive: true, force: true });
    fs.rmSync(projectB, { recursive: true, force: true });
  }
});

test('OpenCode P0 regression: placeholder, explicit failure, artifact, symlink and invalid_specs', async () => {
  // Probe B/C via the shared completion gate.
  const cases = [
    { body: 'Verification: PASS\nCommand: TODO\nExit: 0\nBase: a\nHead: b\n', desc: 'Command TODO' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: TBD\nHead: b\n', desc: 'Base TBD' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nArtifact: x\nsha256: TBD\n', desc: 'artifact TBD' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nTests failed: 1\n', desc: 'Tests failed' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nResult: FAIL\nResult: PASS\n', desc: 'Result FAIL then PASS' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n  # fail 1\n', desc: 'TAP # fail 1' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nnot ok 1 - test\n', desc: 'TAP not ok 1' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nTests: 1 failed, 2 passed\n', desc: 'Jest Tests: 1 failed' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\nTests  1 failed | 2 passed\n', desc: 'Vitest Tests 1 failed' },
    { body: 'Verification: PASS\nCommand: pnpm test\nExit: 0\nBase: a\nHead: b\n1 failed, 2 passed\n', desc: '1 failed summary' },
  ];
  for (const { body, desc } of cases) {
    const tmp = mkTmp();
  ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({ feature_name: 'demo', status: 'in_progress', current_phase: 'implement', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','',body].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.match(combined, /verification receipt|failed check/i, `case ${desc} should be rejected`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
  // Normal todo substring should pass
  {
    const tmp = mkTmp();
  ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({ feature_name: 'demo', status: 'in_progress', current_phase: 'implement', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: npm run todo:test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.doesNotMatch(combined, /verification receipt|failed check/i, 'todo substring should not block');
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
  // Symlink task outside via OpenCode checkReceipt (uses same realpath logic)
  {
    const tmp = mkTmp();
  ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'feat', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'feat', 'spec.json'), JSON.stringify({ feature_name: 'feat', status: 'in_progress', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      const outside = path.join(tmp, 'outside-task.md');
      fs.writeFileSync(outside, `# Task\n\n**Status:** done\n\n## Evidence\n\nVerification: PASS\nCommand: pnpm test\nExit: 0\nBase: ${BASE_SHA}\nHead: ${HEAD_SHA}\n`);
      const link = path.join(specsDir, 'feat', 'tasks', 'task.md');
      fs.symlinkSync(outside, link);
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.match(combined, /failed check/i, 'symlink task outside should be blocked');
      assert.match(combined, /tasks\/task\.md/);
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
  // Invalid spec JSON and symlink spec handling via SpecState
  {
    const tmp = mkTmp();
  ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'good'), { recursive: true });
      fs.mkdirSync(path.join(specsDir, 'bad'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'good', 'spec.json'), JSON.stringify({ feature_name: 'good', status: 'in_progress' }));
      fs.writeFileSync(path.join(specsDir, 'bad', 'spec.json'), '{ malformed');
      const out = path.join(tmp, 'plugins', 'spec-state.mjs');
      compileToMjs(STATE_SRC, out);
      const { SpecState } = await import(pathToFileURL(out).href);
      const state = await SpecState({ directory: tmp });
      const output = { message: { id: 'm3', sessionID: 's3' }, parts: [] };
      await state['chat.message']({}, output);
      const text = output.parts.map((p)=>p.text||'').join('\n');
      assert.match(text, /Invalid spec JSON/i);
      assert.match(text, /bad/);
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
  // Symlink spec outside should be explicit_malformed or skipped: test via SpecState multiple? Use gate for explicit not needed; ensure non-explicit skips
  {
    const tmp = mkTmp();
  ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'valid'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'valid', 'spec.json'), JSON.stringify({ feature_name: 'valid', status: 'in_progress', task_registry: {} }));
      const outside = path.join(tmp, 'outside-spec');
      fs.mkdirSync(outside, { recursive: true });
      fs.writeFileSync(path.join(outside, 'spec.json'), JSON.stringify({ feature_name: 'linked', status: 'in_progress' }));
      const link = path.join(specsDir, 'linked');
      fs.symlinkSync(outside, link);
      const out = path.join(tmp, 'plugins', 'spec-state.mjs');
      compileToMjs(STATE_SRC, out);
      const { SpecState } = await import(pathToFileURL(out).href);
      const state = await SpecState({ directory: tmp });
      const output = { message: { id: 'm4', sessionID: 's4' }, parts: [] };
      await state['chat.message']({}, output);
      const text = output.parts.map((p)=>p.text||'').join('\n');
      assert.match(text, /Invalid spec JSON/i);
      assert.match(text, /linked/);
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
  // Structured explicit failure and artifact scope parity
  {
    const tmp = mkTmp();
    ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({ feature_name: 'demo', status: 'in_progress', current_phase: 'implement', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      // Notes with failure handling should pass (not structured)
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: pnpm test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`,'Notes: verifies failure handling'].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      let captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      let banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      assert.doesNotMatch(captured.join('\n') + '\n' + banner, /failed check/i, 'Notes with failure prose should not block');
      // Tests failed: 0 should pass
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: pnpm test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`,'Tests failed: 0'].join('\n'));
      captured = [];
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      assert.doesNotMatch(captured.join('\n') + '\n' + banner, /failed check/i, 'Tests failed: 0 should not block');
      // Status: FAILED should block
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: pnpm test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`,'Status: FAILED'].join('\n'));
      captured = [];
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      assert.match(captured.join('\n') + '\n' + banner, /failed check/i, 'Status: FAILED should block');
      // Command containing artifact without hash should pass
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: npm run artifact:test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`].join('\n'));
      captured = [];
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      assert.doesNotMatch(captured.join('\n') + '\n' + banner, /failed check/i, 'Command with artifact substring should not require hash');
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
  // Shared authorities missing should be fail-closed (not crash-silent)
  {
    const tmp = mkTmp();
    // Do NOT ensure shared authorities, so the gate must report unavailable.
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({ feature_name: 'demo', status: 'in_progress', current_phase: 'implement', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: pnpm test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.match(combined, /resolver_unavailable|shared_validator|unavailable|failed check/i, 'missing shared authority should be fail-closed');
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
  // Dangling task symlink should be fail-closed (realpath failure)
  {
    const tmp = mkTmp();
    ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'feat', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'feat', 'spec.json'), JSON.stringify({ feature_name: 'feat', status: 'in_progress', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      fs.writeFileSync(path.join(specsDir, 'feat', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: pnpm test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      // Dangling symlink: task file is a broken symlink, realpath will throw and should be fail-closed
      const broken = path.join(specsDir, 'feat', 'tasks', 'broken.md');
      fs.symlinkSync(path.join(tmp, 'nonexistent'), broken);
      // Update spec to point to broken
      const specPath = path.join(specsDir, 'feat', 'spec.json');
      const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
      spec.task_registry['tasks/broken.md'] = { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' };
      fs.writeFileSync(specPath, JSON.stringify(spec));
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.match(combined, /failed check/i, 'broken symlink task should be fail-closed');
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  }
});

test('OpenCode P0 phantom vectors via installed shared validator (r3)', async () => {
  const vectors = [
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
  for (const v of vectors) {
    const tmp = mkTmp();
    ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({ feature_name: 'demo', status: 'in_progress', current_phase: 'implement', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), ['# Task','','**Status:** done','','## Evidence','','Verification: PASS','Command: pnpm test','Exit: 0',`Base: ${BASE_SHA}`,`Head: ${HEAD_SHA}`, v].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.match(combined, /failed check/i, `OpenCode vector should block: ${v}`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
  // positive controls must not block via OpenCode shared validator
  const passes = [
    'Tests failed: 0',
    'cancelled 0',
    'Test Suites: 0 failed',
    'collected 1 item',
    'Error handling is documented',
    '[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0',
    '[ERROR] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0',
    '[ERROR] Error handling is documented',
    'FAILURE mode analysis',
    'Notes: tests failed previously but now fixed',
    '# tests 1',
    '# suites 0',
    '# pass 1',
    '# fail 0',
    '# cancelled 0',
    '# skipped 0',
    '# todo 0',
    '# duration_ms 114.203625',
  ];
  for (const v of passes) {
    const tmp = mkTmp();
    ensureSharedValidator(tmp);
    try {
      const specsDir = path.join(tmp, 'specs');
      fs.mkdirSync(path.join(specsDir, 'demo', 'tasks'), { recursive: true });
      fs.writeFileSync(path.join(specsDir, 'demo', 'spec.json'), JSON.stringify({ feature_name: 'demo', status: 'in_progress', current_phase: 'implement', task_registry: { 'tasks/task.md': { status: 'done', completed_at: '2026-08-11T00:00:00.000Z' } } }));
      fs.writeFileSync(path.join(specsDir, 'demo', 'tasks', 'task.md'), [
        '# Task',
        '',
        '**Status:** done',
        '',
        '## Evidence',
        '',
        'Verification: PASS',
        'Command: pnpm test',
        'Exit: 0',
        `Base: ${BASE_SHA}`,
        `Head: ${HEAD_SHA}`,
        v,
      ].join('\n'));
      const out = path.join(tmp, 'plugins', 'spec-gate.mjs');
      compileToMjs(GATE_SRC, out);
      const { SpecGate } = await import(pathToFileURL(out).href);
      const gate = await SpecGate({ directory: tmp });
      const captured = [];
      const orig = console.error;
      console.error = (...a) => captured.push(a.join(' '));
      try { await gate.event({ event: { type: 'session.idle' } }); } finally { console.error = orig; }
      const banner = (()=>{ try{return fs.readFileSync(path.join(tmp,'.opencode','session-banner.md'),'utf8')}catch{return ''}})();
      const combined = captured.join('\n') + '\n' + banner;
      assert.doesNotMatch(combined, /failed check/i, `OpenCode positive should not block: ${v}`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
});
