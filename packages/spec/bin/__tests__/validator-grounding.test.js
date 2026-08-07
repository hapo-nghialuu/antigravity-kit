'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const ROOT = path.resolve(__dirname, '../..');
const VALIDATOR = path.join(ROOT, 'src/claude/scripts/validate-spec-output.cjs');
const GROUNDING = path.join(ROOT, 'src/claude/scripts/spec-ground.cjs');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function run(script, args, cwd) {
  return spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });
}

function task({ file = 'task-R1-01-one.md', mapping = '1.1', related = '`src/one.js` | Modify', extra = '' } = {}) {
  return `# Task R1-01: One\n\n## Context\n- Existing source.\n\n## Constraints\n- Keep scope.\n\n## Steps\n- [ ] Update source\n  - _Requirements: ${mapping}_\n\n## Requirements\n- 1.1 — One behavior\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| ${related} | Source | test |\n\n## Completion Criteria\n- [ ] Behavior works.\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/one.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n${extra}`;
}

function createSpec(root, options = {}) {
  const specDir = path.join(root, options.name || 'spec');
  const taskPath = 'tasks/task-R1-01-one.md';
  write(path.join(specDir, 'requirements.md'), options.requirements || '# Requirements\n\n### Requirement 1: One\n\n- **R1.1** Do one thing.\n');
  write(path.join(specDir, 'design.md'), options.design || '# Design\n');
  write(path.join(specDir, 'research.md'), '# Research\n\n## Evidence Summary\n- Internal evidence.\n');
  write(path.join(specDir, taskPath), options.task || task());
  write(path.join(specDir, 'spec.json'), JSON.stringify({
    schema_version: '2.0',
    feature_name: 'fixture',
    status: 'in_progress',
    current_phase: 'tasks',
    scope_lock: { source: 'fixture', in_scope: ['1'], out_of_scope: [], expansion_policy: 'requires-user-approval' },
    task_files: [taskPath],
    task_registry: {
      [taskPath]: {
        id: 'R1-01', title: 'One', status: 'pending', dependencies: [], blocker: null,
        started_at: null, completed_at: null, last_updated_at: null,
      },
    },
    approvals: { requirements: { generated: true, agent_validated: true, user_approved: true }, design: { generated: true, agent_validated: true, user_approved: true }, tasks: { generated: true, agent_validated: true, user_approved: true } },
    validation: { status: 'not-run' },
    ready_for_implementation: false,
    ...(options.spec || {}),
  }, null, 2));
  return specDir;
}

function output(result) {
  return `${result.stdout}\n${result.stderr}`;
}

test('validator rejects missing explicit requirement and sub-criterion mappings', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-mapping-'));
  try {
    const specDir = createSpec(root, { task: task({ mapping: '' }) });
    const result = run(VALIDATOR, [specDir], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /R1: not covered|R1\.1: acceptance criterion not covered/);

    const incidental = createSpec(root, {
      name: 'incidental',
      task: task({ mapping: '', file: 'task-R1-01-one.md' }).replace('Update source', 'Update R1 source'),
    });
    const incidentalResult = run(VALIDATOR, [incidental], ROOT);
    assert.notEqual(incidentalResult.status, 0);
    assert.match(output(incidentalResult), /R1: not covered/);

    const partial = createSpec(root, {
      name: 'partial',
      requirements: '# Requirements\n\n### Requirement 1: One\n\n- **R1.1** First.\n- **R1.2** Second.\n',
    });
    const partialResult = run(VALIDATOR, [partial], ROOT);
    assert.notEqual(partialResult.status, 0);
    assert.match(output(partialResult), /R1\.2: acceptance criterion not covered/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator rejects unknown, missing, and divergent contract copies', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-contract-'));
  const design = '# Design\n\n<!-- contract:PAYLOAD -->\n```json\n{ "id": 1 }\n```\n';
  try {
    const unknown = createSpec(root, {
      name: 'unknown', design,
      task: task({ extra: 'Contracts: MISSING\n' }),
    });
    let result = run(VALIDATOR, [unknown], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /unknown contract "MISSING"/);

    const noCanonical = createSpec(root, {
      name: 'no-canonical',
      task: task({ extra: 'Contracts: PAYLOAD\n' }),
    });
    result = run(VALIDATOR, [noCanonical], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /defines no canonical contract blocks/);

    const missing = createSpec(root, {
      name: 'missing', design,
      task: task({ extra: 'Contracts: PAYLOAD\n' }),
    });
    result = run(VALIDATOR, [missing], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /contract "PAYLOAD" is missing/);

    const divergent = createSpec(root, {
      name: 'divergent', design,
      task: task({ extra: 'Contracts: PAYLOAD\n\n```json\n{ "id": 2 }\n```\n' }),
    });
    result = run(VALIDATOR, [divergent], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /contract "PAYLOAD" body diverges/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator rejects invalid ready approval and validation transitions', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-state-'));
  try {
    const specDir = createSpec(root, {
      spec: {
        ready_for_implementation: true,
        approvals: { requirements: { generated: false, agent_validated: true, user_approved: true }, design: { generated: true, agent_validated: false, user_approved: true }, tasks: { generated: true, agent_validated: true, user_approved: false } },
        validation: { status: 'not-run' },
      },
    });
    const result = run(VALIDATOR, [specDir], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /requires generated and agent_validated and user_approved requirements evidence/);
    assert.match(output(result), /requires generated and agent_validated and user_approved design evidence/);
    assert.match(output(result), /validation evidence is incomplete/);

    // Legacy approved field must fail closed with migration guidance
    const legacyDir = createSpec(root, {
      name: 'legacy',
      spec: {
        schema_version: undefined,
        approvals: { requirements: { generated: true, approved: true }, design: { generated: true, agent_validated: true, user_approved: true }, tasks: { generated: true, agent_validated: true, user_approved: true } },
      },
    });
    // Remove schema_version to simulate legacy
    const legacySpecPath = path.join(legacyDir, 'spec.json');
    const legacySpec = JSON.parse(fs.readFileSync(legacySpecPath, 'utf8'));
    delete legacySpec.schema_version;
    fs.writeFileSync(legacySpecPath, JSON.stringify(legacySpec, null, 2));
    const legacyResult = run(VALIDATOR, [legacyDir], ROOT);
    assert.notEqual(legacyResult.status, 0);
    assert.match(output(legacyResult), /Legacy approval field "approved"/);

    // Unsupported schema_version must fail closed
    const unsupportedDir = createSpec(root, {
      name: 'unsupported',
      spec: { schema_version: '9.9' },
    });
    const unsupportedResult = run(VALIDATOR, [unsupportedDir], ROOT);
    assert.notEqual(unsupportedResult.status, 0);
    assert.match(output(unsupportedResult), /unsupported "9\.9"/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator rejects malformed Related Files and dependency topology', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-shape-'));
  try {
    for (const [name, related, expected] of [
      ['empty', '', /Related Files section must not be empty/],
      ['action', '`src/one.js` | Rename', /unsupported Related Files action/],
      ['absolute', '`\/tmp\/one.js` | Modify', /must be relative/],
      ['traversal', '`..\/one.js` | Modify', /must be relative/],
    ]) {
      const specDir = createSpec(root, {
        name,
        task: related ? task({ related }) : task({ related: 'Path | Action | Description\n|---|---|---|' }),
      });
      const result = run(VALIDATOR, [specDir], ROOT);
      assert.notEqual(result.status, 0);
      assert.match(output(result), expected);
    }

    const cycle = createSpec(root, { name: 'cycle' });
    const statePath = path.join(cycle, 'spec.json');
    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    state.task_files.push('tasks/task-R1-02-two.md');
    state.task_registry['tasks/task-R1-01-one.md'].dependencies = ['tasks/task-R1-02-two.md'];
    state.task_registry['tasks/task-R1-02-two.md'] = { id: 'R1-02', title: 'Two', status: 'pending', dependencies: ['tasks/task-R1-01-one.md'], blocker: null, started_at: null, completed_at: null, last_updated_at: null };
    write(path.join(cycle, 'tasks/task-R1-02-two.md'), task({ related: '`src/two.js` | Modify' }));
    write(statePath, JSON.stringify(state, null, 2));
    const cycleResult = run(VALIDATOR, [cycle], ROOT);
    assert.notEqual(cycleResult.status, 0);
    assert.match(output(cycleResult), /dependency cycle detected/);

    const ordering = createSpec(root, {
      name: 'ordering',
      task: task({ related: '`src/generated.js` | Create' }),
    });
    const orderingStatePath = path.join(ordering, 'spec.json');
    const orderingState = JSON.parse(fs.readFileSync(orderingStatePath, 'utf8'));
    orderingState.task_files.push('tasks/task-R1-02-two.md');
    orderingState.task_registry['tasks/task-R1-02-two.md'] = { id: 'R1-02', title: 'Two', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null };
    write(path.join(ordering, 'tasks/task-R1-02-two.md'), task({ related: '`src/generated.js` | Modify' }));
    write(orderingStatePath, JSON.stringify(orderingState, null, 2));
    const orderingResult = run(VALIDATOR, [ordering], ROOT);
    assert.notEqual(orderingResult.status, 0);
    assert.match(output(orderingResult), /must depend on creator/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('grounding rejects empty sections, unsafe paths, unsupported actions, and zero-match globs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-grounding-'));
  try {
    write(path.join(root, 'src/one.js'), 'source\n');
    const cases = [
      ['empty', '# Task\n\n## Related Files\n\n## Completion Criteria\n', /Related Files section must not be empty/],
      ['action', task({ related: '`src/one.js` | Rename' }), /unsupported Related Files action/],
      ['absolute', task({ related: '`\/tmp\/one.js` | Read' }), /must be relative/],
      ['traversal', task({ related: '`..\/one.js` | Read' }), /must be relative/],
      ['glob', task({ related: '`src\/missing-*.js` | Read' }), /glob matches no paths/],
    ];
    for (const [name, content, expected] of cases) {
      const specDir = path.join(root, name);
      write(path.join(specDir, 'tasks/task-R1-01-one.md'), content);
      const result = run(GROUNDING, [specDir, '--root', root], ROOT);
      assert.notEqual(result.status, 0);
      assert.match(output(result), expected);
    }

    const valid = path.join(root, 'valid');
    write(path.join(valid, 'tasks/task-R1-01-one.md'), task({ related: '`src/*.js` | Read' }));
    const result = run(GROUNDING, [valid, '--root', root], ROOT);
    assert.equal(result.status, 0, output(result));
    assert.match(result.stdout, /GROUNDED/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator enforces Read before Modify for existing implementation', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-lifecycle-'));
  try {
    // Existing file Modify without preceding Read must fail
    const missingRead = createSpec(root, {
      name: 'missing-read',
      task: task({ related: '`src/existing.js` | Modify' }),
    });
    const missingResult = run(VALIDATOR, [missingRead], ROOT);
    assert.notEqual(missingResult.status, 0);
    assert.match(output(missingResult), /has no preceding Read/);

    // Same path with Read in same task earlier row should pass
    const withReadSameTask = createSpec(root, {
      name: 'with-read-same',
      task: `# Task R1-01: One\n\n## Context\n- Existing.\n\n## Constraints\n- Keep.\n\n## Steps\n- [ ] Update\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/existing.js\` | Read | Inspect existing |\n| \`src/existing.js\` | Modify | Update |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/existing.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`,
    });
    const sameResult = run(VALIDATOR, [withReadSameTask], ROOT);
    assert.equal(sameResult.status, 0, output(sameResult));

    // Modify should fail if Read is only in unrelated task without dependency
    const depRead = createSpec(root, { name: 'dep-read' });
    const depStatePath = path.join(depRead, 'spec.json');
    const depState = JSON.parse(fs.readFileSync(depStatePath, 'utf8'));
    depState.task_files.push('tasks/task-R1-02-two.md');
    depState.task_registry['tasks/task-R1-02-two.md'] = { id: 'R1-02', title: 'Two', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null };
    // Task 1 has Read, Task 2 modifies without depending
    write(path.join(depRead, 'tasks/task-R1-01-one.md'), `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Read\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/existing.js\` | Read | Inspect |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/existing.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`);
    write(path.join(depRead, 'tasks/task-R1-02-two.md'), task({ related: '`src/existing.js` | Modify' }));
    write(depStatePath, JSON.stringify(depState, null, 2));
    const depMissingResult = run(VALIDATOR, [depRead], ROOT);
    assert.notEqual(depMissingResult.status, 0);
    assert.match(output(depMissingResult), /has no preceding Read/);

    // If Modify task depends on Read task, should pass
    depState.task_registry['tasks/task-R1-02-two.md'].dependencies = ['tasks/task-R1-01-one.md'];
    write(depStatePath, JSON.stringify(depState, null, 2));
    const depPass = run(VALIDATOR, [depRead], ROOT);
    assert.equal(depPass.status, 0, output(depPass));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator rejects reachability without concrete anchor and accepts with path', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-reachability-'));
  try {
    const noAnchor = createSpec(root, {
      name: 'no-anchor',
      task: task({ related: '`src/one.js` | Modify' }).replace('Runtime reachability verification\n  - Entrypoint/caller: src/one.js', 'Runtime reachability verification\n  - Some vague phrase'),
    });
    // Add a Read to avoid lifecycle error, so we can isolate reachability check
    const noAnchorContent = fs.readFileSync(path.join(noAnchor, 'tasks/task-R1-01-one.md'), 'utf8')
      .replace('`src/one.js` | Modify', '`src/one.js` | Read\n| `src/one.js` | Modify');
    // Keep lifecycle satisfied: Read before Modify in same task
    write(path.join(noAnchor, 'tasks/task-R1-01-one.md'), noAnchorContent.replace('Some vague phrase', 'Runtime reachability verification'));
    // Actually construct valid task with missing concrete anchor explicitly
    write(path.join(noAnchor, 'tasks/task-R1-01-one.md'), `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Update\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/one.js\` | Read | Inspect |\n| \`src/one.js\` | Modify | Update |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Note: verified somehow\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`);
    const noAnchorResult = run(VALIDATOR, [noAnchor], ROOT);
    assert.notEqual(noAnchorResult.status, 0);
    assert.match(output(noAnchorResult), /Runtime reachability verification must reference a concrete file path/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator fails closed when 5+ tasks have no contract blocks', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-contract-closed-'));
  try {
    const specDir = createSpec(root, { name: 'five-no-contract' });
    const statePath = path.join(specDir, 'spec.json');
    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    for (let i = 2; i <= 5; i += 1) {
      const taskFile = `tasks/task-R1-0${i}-extra.md`;
      state.task_files.push(taskFile);
      state.task_registry[taskFile] = { id: `R1-0${i}`, title: `Extra ${i}`, status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null };
      write(path.join(specDir, taskFile), task({ related: '`src/extra.js` | Modify', mapping: '1.1' }));
    }
    // Need to ensure each extra task has Read before Modify to avoid lifecycle error
    for (let i = 2; i <= 5; i += 1) {
      const p = path.join(specDir, `tasks/task-R1-0${i}-extra.md`);
      const c = fs.readFileSync(p, 'utf8').replace('`src/extra.js` | Modify', '`src/extra.js` | Read\n| `src/extra.js` | Modify');
      const updated = c.replace('Entrypoint/caller: src/one.js', 'Entrypoint/caller: src/extra.js');
      write(p, updated);
    }
    // Also fix first task to have Read
    const first = fs.readFileSync(path.join(specDir, 'tasks/task-R1-01-one.md'), 'utf8').replace('`src/one.js` | Modify', '`src/one.js` | Read\n| `src/one.js` | Modify');
    write(path.join(specDir, 'tasks/task-R1-01-one.md'), first);
    write(statePath, JSON.stringify(state, null, 2));
    const result = run(VALIDATOR, [specDir], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /5\+ task spec requires contract blocks/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('grounding treats Create on existing file as error', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-grounding-create-existing-'));
  try {
    write(path.join(root, 'src/existing.js'), 'existing\n');
    const specDir = path.join(root, 'spec-create-existing');
    write(path.join(specDir, 'tasks/task-R1-01-one.md'), task({ related: '`src/existing.js` | Create' }));
    const result = run(GROUNDING, [specDir, '--root', root], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /Create path already exists/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator scopes requirement mapping to structured section, incidental mention does not cover', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-scope-'));
  try {
    // Task mentions R1 in Context but has no structured _Requirements mapping — should fail
    const incidentalOnly = createSpec(root, {
      name: 'incidental-scope',
      task: `# Task R1-01: One\n\n## Context\nMention R1 and Requirement 1 incidental.\n\n## Constraints\n- Keep\n\n## Steps\n- [ ] Do work\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/one.js\` | Read | Inspect |\n| \`src/one.js\` | Modify | Update |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/one.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`,
    });
    const res = run(VALIDATOR, [incidentalOnly], ROOT);
    assert.notEqual(res.status, 0);
    assert.match(output(res), /R1: not covered/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('validator enforces Create before Read/Modify/Delete within same task and cross-task dependencies', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-validator-create-order-'));
  try {
    // Same-task: Create after Read must fail (dead-code regression)
    const createAfterRead = createSpec(root, {
      name: 'create-after-read',
      task: `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Do work\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/new.js\` | Read | Read before create |\n| \`src/new.js\` | Create | Create after read |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/new.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`,
    });
    const carResult = run(VALIDATOR, [createAfterRead], ROOT);
    assert.notEqual(carResult.status, 0);
    assert.match(output(carResult), /Create must precede read for src\/new\.js/);

    // Same-task: Create after Modify must fail
    const createAfterModify = createSpec(root, {
      name: 'create-after-modify',
      task: `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Do work\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/new.js\` | Modify | Modify before create |\n| \`src/new.js\` | Create | Create after modify |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/new.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`,
    });
    const camResult = run(VALIDATOR, [createAfterModify], ROOT);
    assert.notEqual(camResult.status, 0);
    assert.match(output(camResult), /Create must precede modify for src\/new\.js/);

    // Same-task: Create before Read/Modify must pass; repeated Reads must not be rejected
    const createBefore = createSpec(root, {
      name: 'create-before',
      task: `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Do work\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/new.js\` | Create | Create first |\n| \`src/new.js\` | Read | Read after create |\n| \`src/new.js\` | Modify | Modify after create |\n| \`src/new.js\` | Read | Second read |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/new.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`,
    });
    const cbResult = run(VALIDATOR, [createBefore], ROOT);
    assert.equal(cbResult.status, 0, output(cbResult));

    // Valid same-task repeated reads without create must pass (not rejected unnecessarily)
    const repeatedReads = createSpec(root, {
      name: 'repeated-reads',
      task: `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Do work\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/existing.js\` | Read | First read |\n| \`src/existing.js\` | Read | Second read |\n| \`src/existing.js\` | Modify | Modify after reads |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/existing.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`,
    });
    const rrResult = run(VALIDATOR, [repeatedReads], ROOT);
    assert.equal(rrResult.status, 0, output(rrResult));

    // Cross-task: Read without dependency must fail
    const crossRead = createSpec(root, { name: 'cross-read-base' });
    const crossReadStatePath = path.join(crossRead, 'spec.json');
    const crossReadState = JSON.parse(fs.readFileSync(crossReadStatePath, 'utf8'));
    // Task1 creates src/gen.js
    write(path.join(crossRead, 'tasks/task-R1-01-one.md'), `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Create\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen.js\` | Create | Create gen |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/gen.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`);
    crossReadState.task_files.push('tasks/task-R1-02-two.md');
    crossReadState.task_registry['tasks/task-R1-02-two.md'] = { id: 'R1-02', title: 'Two', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null };
    write(path.join(crossRead, 'tasks/task-R1-02-two.md'), `# Task R1-02: Two\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Read gen\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen.js\` | Read | Read gen without dep |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/gen.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`);
    write(crossReadStatePath, JSON.stringify(crossReadState, null, 2));
    const crossReadFail = run(VALIDATOR, [crossRead], ROOT);
    assert.notEqual(crossReadFail.status, 0);
    assert.match(output(crossReadFail), /read of src\/gen\.js must depend on creator/);

    // Cross-task Read with dependency must pass
    crossReadState.task_registry['tasks/task-R1-02-two.md'].dependencies = ['tasks/task-R1-01-one.md'];
    write(crossReadStatePath, JSON.stringify(crossReadState, null, 2));
    const crossReadPass = run(VALIDATOR, [crossRead], ROOT);
    assert.equal(crossReadPass.status, 0, output(crossReadPass));

    // Cross-task Modify without dependency must fail, with dep must pass
    const crossMod = createSpec(root, { name: 'cross-mod-base' });
    const crossModStatePath = path.join(crossMod, 'spec.json');
    const crossModState = JSON.parse(fs.readFileSync(crossModStatePath, 'utf8'));
    write(path.join(crossMod, 'tasks/task-R1-01-one.md'), `# Task R1-01: One\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Create\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen2.js\` | Create | Create gen2 |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/gen2.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`);
    crossModState.task_files.push('tasks/task-R1-02-two.md');
    crossModState.task_registry['tasks/task-R1-02-two.md'] = { id: 'R1-02', title: 'Two', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null };
    write(path.join(crossMod, 'tasks/task-R1-02-two.md'), `# Task R1-02: Two\n\n## Context\n- X\n\n## Constraints\n- Y\n\n## Steps\n- [ ] Modify gen2\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — One\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen2.js\` | Modify | Modify without dep |\n\n## Completion Criteria\n- [ ] Works\n\n## Evidence\n- Runtime reachability verification\n  - Entrypoint/caller: src/gen2.js\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None | Low | Tests |\n`);
    write(crossModStatePath, JSON.stringify(crossModState, null, 2));
    const crossModFail = run(VALIDATOR, [crossMod], ROOT);
    assert.notEqual(crossModFail.status, 0);
    assert.match(output(crossModFail), /modify of src\/gen2\.js must depend on creator/);
    crossModState.task_registry['tasks/task-R1-02-two.md'].dependencies = ['tasks/task-R1-01-one.md'];
    write(crossModStatePath, JSON.stringify(crossModState, null, 2));
    const crossModPass = run(VALIDATOR, [crossMod], ROOT);
    assert.equal(crossModPass.status, 0, output(crossModPass));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('grounding enforces Create ordering and cross-task dependency', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-grounding-order-'));
  try {
    // Same-task Create after Read must fail in grounding
    const specDir = path.join(root, 'spec-order');
    write(path.join(specDir, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/new.js\` | Read | Read before create |\n| \`src/new.js\` | Create | Create after read |\n`);
    write(path.join(specDir, 'spec.json'), JSON.stringify({
      schema_version: '2.0',
      task_files: ['tasks/task-R1-01-one.md'],
      task_registry: { 'tasks/task-R1-01-one.md': { id: 'R1-01', title: 'One', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null } }
    }));
    const r1 = run(GROUNDING, [specDir, '--root', root], ROOT);
    assert.notEqual(r1.status, 0);
    assert.match(`${r1.stdout}\n${r1.stderr}`, /Create must precede read/);

    // Cross-task Read without dependency must fail in grounding
    const specDir2 = path.join(root, 'spec-cross');
    write(path.join(specDir2, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen.js\` | Create | Create |\n`);
    write(path.join(specDir2, 'tasks/task-R1-02-two.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen.js\` | Read | Read without dep |\n`);
    write(path.join(specDir2, 'spec.json'), JSON.stringify({
      schema_version: '2.0',
      task_files: ['tasks/task-R1-01-one.md', 'tasks/task-R1-02-two.md'],
      task_registry: {
        'tasks/task-R1-01-one.md': { id: 'R1-01', title: 'One', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null },
        'tasks/task-R1-02-two.md': { id: 'R1-02', title: 'Two', status: 'pending', dependencies: [], blocker: null, started_at: null, completed_at: null, last_updated_at: null }
      }
    }));
    const r2 = run(GROUNDING, [specDir2, '--root', root], ROOT);
    assert.notEqual(r2.status, 0);
    assert.match(`${r2.stdout}\n${r2.stderr}`, /read of src\/gen\.js must depend on creator/);

    // Cross-task Read with dependency must pass (if file not found but created, dependency satisfies)
    const spec2Json = JSON.parse(fs.readFileSync(path.join(specDir2, 'spec.json'), 'utf8'));
    spec2Json.task_registry['tasks/task-R1-02-two.md'].dependencies = ['tasks/task-R1-01-one.md'];
    fs.writeFileSync(path.join(specDir2, 'spec.json'), JSON.stringify(spec2Json, null, 2));
    const r3 = run(GROUNDING, [specDir2, '--root', root], ROOT);
    assert.equal(r3.status, 0, `${r3.stdout}\n${r3.stderr}`);

    // Repeated reads without create must not be rejected unnecessarily (grounding should pass if files exist or fail only for missing file, not ordering)
    write(path.join(root, 'src/existing.js'), 'x\n');
    const specDir3 = path.join(root, 'spec-repeated');
    write(path.join(specDir3, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/existing.js\` | Read | First |\n| \`src/existing.js\` | Read | Second |\n`);
    const r4 = run(GROUNDING, [specDir3, '--root', root], ROOT);
    assert.equal(r4.status, 0, `${r4.stdout}\n${r4.stderr}`);

    // Create on existing must remain error in grounding
    const specDir4 = path.join(root, 'spec-create-existing2');
    write(path.join(specDir4, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/existing.js\` | Create | Create existing |\n`);
    const r5 = run(GROUNDING, [specDir4, '--root', root], ROOT);
    assert.notEqual(r5.status, 0);
    assert.match(`${r5.stdout}\n${r5.stderr}`, /Create path already exists/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('grounding fails closed when cross-task producer exists but registry missing', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-grounding-missing-registry-'));
  try {
    // Cross-task Create -> Read with missing spec.json must fail closed
    const specDir = path.join(root, 'spec-missing-registry');
    write(path.join(specDir, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen.js\` | Create | Create |\n`);
    write(path.join(specDir, 'tasks/task-R1-02-two.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/gen.js\` | Read | Read without registry |\n`);
    // Intentionally no spec.json
    const noRegistry = run(GROUNDING, [specDir, '--root', root], ROOT);
    assert.notEqual(noRegistry.status, 0);
    assert.match(`${noRegistry.stdout}\n${noRegistry.stderr}`, /task_registry is missing.*fail-closed|fail-closed/);

    // Missing registry but also empty registry object must fail closed
    write(path.join(specDir, 'spec.json'), JSON.stringify({ task_files: ['tasks/task-R1-01-one.md', 'tasks/task-R1-02-two.md'], task_registry: {} }));
    const emptyRegistry = run(GROUNDING, [specDir, '--root', root], ROOT);
    assert.notEqual(emptyRegistry.status, 0);
    assert.match(`${emptyRegistry.stdout}\n${emptyRegistry.stderr}`, /fail-closed|must depend on creator|task_registry/);

    // Valid single-task Create+Read with missing registry must still PASS (no cross-task)
    const singleDir = path.join(root, 'spec-single-missing-registry');
    write(path.join(singleDir, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/single.js\` | Create | Create |\n| \`src/single.js\` | Read | Read same task |\n`);
    // No spec.json for single-task
    const singlePass = run(GROUNDING, [singleDir, '--root', root], ROOT);
    assert.equal(singlePass.status, 0, `${singlePass.stdout}\n${singlePass.stderr}`);

    // Existing-file Read without producer and missing registry must PASS (if file exists)
    write(path.join(root, 'src/existing2.js'), 'x\n');
    const existingDir = path.join(root, 'spec-existing-missing-registry');
    write(path.join(existingDir, 'tasks/task-R1-01-one.md'), `# Task\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`src/existing2.js\` | Read | Read existing |\n`);
    // No spec.json
    const existingPass = run(GROUNDING, [existingDir, '--root', root], ROOT);
    assert.equal(existingPass.status, 0, `${existingPass.stdout}\n${existingPass.stderr}`);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('benchmark gate fails Critical when both arms correctness is zero', () => {
  const BENCHMARK = path.join(ROOT, 'scripts/benchmark-workflow.mjs');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-benchmark-critical-zero-'));
  try {
    function canon(v) {
      if (Array.isArray(v)) return `[${v.map(canon).join(',')}]`;
      if (v && typeof v === 'object') return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`;
      return JSON.stringify(v);
    }
    function shaCanon(v) { const c = require('node:crypto'); return `sha256:${c.createHash('sha256').update(canon(v)).digest('hex')}`; }
    function hash(v) { const c = require('node:crypto'); return `sha256:${c.createHash('sha256').update(JSON.stringify(v)).digest('hex')}`; }
    function rawHash(buf) { const c = require('node:crypto'); return `sha256:${c.createHash('sha256').update(buf).digest('hex')}`; }
    const corpus = {
      schema_version: 'b1.v1',
      status: 'frozen',
      corpus_id: 'zero-critical-test',
      tasks: [
        { task_id: 'c1', lane: 'Critical', prompt: 'critical task', repo_sample: 'r/a', acceptance: { criteria: ['x'] }, risk: { level: 'high', reasons: ['x'] } },
        { task_id: 'd1', lane: 'Direct', prompt: 'direct task', repo_sample: 'r/a', acceptance: { criteria: ['x'] }, risk: { level: 'low', reasons: ['x'] } },
      ],
    };
    const corpusSha = shaCanon(corpus);
    const corpusPath = path.join(root, 'corpus.json');
    fs.writeFileSync(corpusPath, JSON.stringify(corpus));
    function makeConfig(arm) {
      const cfg = {
        schema_version: 'b1.v1',
        status: 'frozen',
        experiment_id: 'exp-zero',
        arm,
        model: { name: 'm', version: 'v' },
        reasoning_effort: 'standard',
        repo: { identifier: 'r', commit: 'abc1234', clean_initial_tree_sha: hash('clean') },
        permissions_fingerprint: hash('perm'),
        tool_availability_fingerprint: hash('tool'),
        corpus_sha256: corpusSha,
        repeat_policy: { repeats_per_task: 1, context_isolated: true },
        input_usd_per_1k: 0.01,
        output_usd_per_1k: 0.02,
      };
      const without = { ...cfg }; delete without.config_sha256;
      cfg.config_sha256 = shaCanon(without);
      return cfg;
    }
    const baselineCfg = makeConfig('baseline');
    const treatmentCfg = makeConfig('treatment');
    const baselinePath = path.join(root, 'baseline.json');
    const treatmentPath = path.join(root, 'treatment.json');
    fs.writeFileSync(baselinePath, JSON.stringify(baselineCfg));
    fs.writeFileSync(treatmentPath, JSON.stringify(treatmentCfg));
    const artifactBytes = Buffer.from('artifact');
    const artifactSha = rawHash(artifactBytes);
    const receiptsDir = path.join(root, 'receipts');
    fs.mkdirSync(receiptsDir, { recursive: true });
    fs.writeFileSync(path.join(receiptsDir, 'artifact.json'), artifactBytes);
    const receipts = [];
    for (const t of corpus.tasks) {
      for (const arm of ['baseline', 'treatment']) {
        const cfg = arm === 'baseline' ? baselineCfg : treatmentCfg;
        receipts.push({
          task_id: t.task_id,
          lane: t.lane,
          arm,
          repeat: 1,
          model: { name: 'm', version: 'v' },
          reasoning_effort: 'standard',
          repo_commit: 'abc1234',
          clean_initial_tree_sha: hash('clean'),
          permissions_fingerprint: hash('perm'),
          tool_availability_fingerprint: hash('tool'),
          corpus_sha256: corpusSha,
          config_sha256: cfg.config_sha256,
          wall_ms: 100,
          input_tokens: 10,
          output_tokens: 10,
          context_loaded_tokens: 100,
          tool_calls: 1,
          subagent_calls: 0,
          correctness: false,
          regression: false,
          unsupported_completion_claim: false,
          user_corrections: 0,
          useful_reviewer_findings: 1,
          false_positive_reviewer_findings: 0,
          evidence: { artifact_ref: 'artifact.json', artifact_sha256: artifactSha, command: 'echo hi' },
        });
      }
    }
    const receiptsPath = path.join(receiptsDir, 'receipts.json');
    fs.writeFileSync(receiptsPath, JSON.stringify({ receipts }));
    const summary = spawnSync(process.execPath, [BENCHMARK, 'summarize', '--corpus', corpusPath, '--config', baselinePath, '--config', treatmentPath, '--receipts', receiptsPath], { encoding: 'utf8' });
    assert.equal(summary.status, 0, `${summary.stdout}\n${summary.stderr}`);
    const parsed = JSON.parse(summary.stdout);
    assert.equal(parsed.rollout_recommendation.gates.Critical.pass, false, 'Critical should not pass with zero correctness');
    assert.equal(parsed.rollout_recommendation.gates.Critical.quality_pass, false);
    assert.equal(parsed.status, 'not-ready');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('benchmark validate handles empty and invalid evidence as not-ready/invalid', () => {
  const BENCHMARK = path.join(ROOT, 'scripts/benchmark-workflow.mjs');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cafekit-benchmark-empty-'));
  try {
    function canon(v) {
      if (Array.isArray(v)) return `[${v.map(canon).join(',')}]`;
      if (v && typeof v === 'object') return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`;
      return JSON.stringify(v);
    }
    function shaCanon(v) { const c = require('node:crypto'); return `sha256:${c.createHash('sha256').update(canon(v)).digest('hex')}`; }
    function hash(v) { const c = require('node:crypto'); return `sha256:${c.createHash('sha256').update(JSON.stringify(v)).digest('hex')}`; }
    const corpus = {
      schema_version: 'b1.v1',
      status: 'frozen',
      corpus_id: 'empty-test',
      tasks: [{ task_id: 't1', lane: 'Direct', prompt: 'p', repo_sample: 'r/a', acceptance: { criteria: ['x'] }, risk: { level: 'low', reasons: ['x'] } }],
    };
    const corpusSha = shaCanon(corpus);
    const corpusPath = path.join(root, 'corpus.json');
    fs.writeFileSync(corpusPath, JSON.stringify(corpus));
    function makeConfig(arm) {
      const cfg = {
        schema_version: 'b1.v1', status: 'frozen', experiment_id: 'exp-empty', arm,
        model: { name: 'm', version: 'v' }, reasoning_effort: 'standard',
        repo: { identifier: 'r', commit: 'abc', clean_initial_tree_sha: hash('clean') },
        permissions_fingerprint: hash('perm'), tool_availability_fingerprint: hash('tool'),
        corpus_sha256: corpusSha, repeat_policy: { repeats_per_task: 1, context_isolated: true },
      };
      const without = { ...cfg }; delete without.config_sha256;
      cfg.config_sha256 = shaCanon(without);
      return cfg;
    }
    const cfg = makeConfig('baseline');
    const cfgPath = path.join(root, 'cfg.json');
    fs.writeFileSync(cfgPath, JSON.stringify(cfg));
    const emptyReceipts = path.join(root, 'empty.json');
    fs.writeFileSync(emptyReceipts, JSON.stringify({ receipts: [] }));
    const emptySummary = spawnSync(process.execPath, [BENCHMARK, 'summarize', '--corpus', corpusPath, '--config', cfgPath, '--receipts', emptyReceipts], { encoding: 'utf8' });
    assert.equal(emptySummary.status, 0);
    const emptyParsed = JSON.parse(emptySummary.stdout);
    assert.ok(['not-ready', 'exploratory/no-live-runs'].includes(emptyParsed.status));

    const artifactBytes = Buffer.from('artifact');
    const rawHash = (b) => { const c = require('node:crypto'); return `sha256:${c.createHash('sha256').update(b).digest('hex')}`; };
    const artifactSha = rawHash(artifactBytes);
    const badReceipts = { receipts: [{
      task_id: 't1', lane: 'Direct', arm: 'baseline', repeat: 1,
      model: { name: 'm', version: 'v' }, reasoning_effort: 'standard',
      repo_commit: 'abc', clean_initial_tree_sha: hash('clean'),
      permissions_fingerprint: hash('perm'), tool_availability_fingerprint: hash('tool'),
      corpus_sha256: corpusSha, config_sha256: cfg.config_sha256,
      wall_ms: 100, input_tokens: 10, output_tokens: 10, context_loaded_tokens: 100, tool_calls: 1, subagent_calls: 0,
      correctness: true, regression: false, unsupported_completion_claim: false,
      user_corrections: 0, useful_reviewer_findings: 0, false_positive_reviewer_findings: 0,
      evidence: { artifact_ref: 'missing.json', artifact_sha256: artifactSha, command: 'echo hi' },
    }] };
    const badPath = path.join(root, 'bad.json');
    fs.writeFileSync(badPath, JSON.stringify(badReceipts));
    const badValidation = spawnSync(process.execPath, [BENCHMARK, 'validate', '--corpus', corpusPath, '--config', cfgPath, '--receipts', badPath], { encoding: 'utf8' });
    assert.equal(badValidation.status, 2);
    assert.match(badValidation.stderr, /artifact.*does not exist|artifact_ref/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
