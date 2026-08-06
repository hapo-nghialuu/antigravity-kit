'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const DEVELOP = path.join(__dirname, '../../src/claude/skills/develop/SKILL.md');
const GATE = path.join(__dirname, '../../src/claude/skills/develop/references/quality-gate.md');
const TEST_SKILL = path.join(__dirname, '../../src/claude/skills/test/SKILL.md');
const SYNC_SKILL = path.join(__dirname, '../../src/claude/skills/sync/SKILL.md');
const CODE_REVIEW_SKILL = path.join(__dirname, '../../src/claude/skills/code-review/SKILL.md');
const GIT_SKILL = path.join(__dirname, '../../src/claude/skills/git/SKILL.md');

function traceQualityGate({ tier, mode, tasks }) {
  const calls = [];
  if (tier === 'Light') return calls;
  if (tier === 'Standard' && mode === 'specific-task') {
    calls.push('combined-auditor');
  } else if (tier === 'Standard' && mode === 'full-spec') {
    calls.push('combined-auditor');
  } else if (tier === 'Deep') {
    tasks.forEach(() => calls.push('test-runner', 'spec-review', 'quality-review'));
  }
  return calls;
}

function promoteFlashTask(task, verdict) {
  if (task.status !== 'in_progress' || task.receipt !== 'FLASH_UNVERIFIED') return task;
  if (verdict !== 'PASS') return task;
  return { ...task, status: 'done', receipt: 'Verification: PASS', blocker: null, dependencyBlocked: false, unblocks: true };
}

test('quality gate trace uses tier and ship-point semantics', () => {
  assert.equal(traceQualityGate({ tier: 'Light', mode: 'full-spec', tasks: ['a', 'b'] }).length, 0);
  assert.deepEqual(
    traceQualityGate({ tier: 'Standard', mode: 'full-spec', tasks: ['a', 'b', 'c'] }),
    ['combined-auditor'],
  );
  assert.deepEqual(
    traceQualityGate({ tier: 'Standard', mode: 'specific-task', tasks: ['a'] }),
    ['combined-auditor'],
  );
  assert.equal(
    traceQualityGate({ tier: 'Deep', mode: 'full-spec', tasks: ['a', 'b'] }).filter((call) => call === 'combined-auditor').length,
    0,
  );
});

test('flash and parallel are rejected before any execution trace', () => {
  const args = ['--flash', '--parallel'];
  const trace = args.includes('--flash') && args.includes('--parallel') ? [] : ['state', 'worktree'];
  assert.deepEqual(trace, []);
  assert.match(fs.readFileSync(DEVELOP, 'utf8'), /unsupported — no execution/);
  assert.match(fs.readFileSync(DEVELOP, 'utf8'), /No spec state, task receipt, worktree, subagent, or commit was created/);
});

test('review verdict consumer stops on BLOCKED and retries only FAIL', () => {
  const consumer = (verdict) => verdict === 'PASS' ? 'proceed' : verdict === 'FAIL' ? 'fix-and-rerun' : 'stop-no-retry';
  assert.equal(consumer('PASS'), 'proceed');
  assert.equal(consumer('FAIL'), 'fix-and-rerun');
  assert.equal(consumer('BLOCKED'), 'stop-no-retry');
  const gate = fs.readFileSync(GATE, 'utf8');
  assert.match(gate, /Status: in_progress/);
  assert.match(gate, /Blocker: awaiting \/hapo:test <feature>/);
  assert.doesNotMatch(gate, /SPEC_PASS|NEEDS FIXES|Incomplete PASS|USER INTERVENTION/);
});

test('review and secret output contracts stay bounded', () => {
  const codeReview = fs.readFileSync(CODE_REVIEW_SKILL, 'utf8');
  const git = fs.readFileSync(GIT_SKILL, 'utf8');
  assert.match(codeReview, /PASS \| FAIL \| BLOCKED/);
  assert.doesNotMatch(git, /show[- ]lines?/i);
});

test('flash promotion is task-scoped and requires PASS proof', () => {
  const initial = {
    status: 'in_progress',
    receipt: 'FLASH_UNVERIFIED',
    blocker: 'awaiting /hapo:test <feature>',
    dependencyBlocked: true,
  };
  assert.deepEqual(promoteFlashTask(initial, 'FAIL'), initial);
  assert.deepEqual(promoteFlashTask(initial, 'BLOCKED'), initial);
  assert.deepEqual(promoteFlashTask(initial, 'NO_TESTS'), initial);
  assert.deepEqual(promoteFlashTask(initial, 'PASS'), {
    status: 'done',
    receipt: 'Verification: PASS',
    blocker: null,
    dependencyBlocked: false,
    unblocks: true,
  });
  assert.match(fs.readFileSync(TEST_SKILL, 'utf8'), /Never blanket-promote every flash task/);
  assert.match(fs.readFileSync(SYNC_SKILL, 'utf8'), /do not unblock dependencies/);
});
