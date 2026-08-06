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
    approvals: { requirements: { generated: true, approved: true }, design: { generated: true, approved: true }, tasks: { generated: true, approved: true } },
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
        approvals: { requirements: { generated: false, approved: true }, design: { generated: true, approved: false }, tasks: { generated: true, approved: true } },
        validation: { status: 'not-run' },
      },
    });
    const result = run(VALIDATOR, [specDir], ROOT);
    assert.notEqual(result.status, 0);
    assert.match(output(result), /approved transition requires generated=true/);
    assert.match(output(result), /requires generated and approved design evidence/);
    assert.match(output(result), /validation evidence is incomplete/);
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
