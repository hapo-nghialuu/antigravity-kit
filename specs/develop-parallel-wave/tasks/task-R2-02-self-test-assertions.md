# Task R2-02: Self test assertions

**Requirement:** R5 — Self-test assertions
**Status:** pending
**Priority:** P1
**Estimated Effort:** S (~1h)
**Dependencies:** tasks/task-R1-02-develop-skill-parallel-mode.md, tasks/task-R1-03-quality-gate-worktree-amendment.md, tasks/task-R1-04-agent-and-orchestrator-rules.md, tasks/task-R2-01-runtime-toggle-and-changelog.md
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: Field-test lesson — guard prose that nothing enforces gets silently dropped in later edits. R5.3 pins the four load-bearing phrases so the suite fails if they vanish.
- **Current state**: `packages/spec/scripts/run-skill-self-tests.mjs` carries ~70 static `{label, file, assert}` semantic assertions over `src/` plus fixture tests; no parallel-wave assertions exist.
- **Target outcome**: New assertions covering: `parallel-waves.md` exists with "single writer" + "sequential fallback" + "wave cap"; develop SKILL mentions `--parallel` and loads the reference; god-developer says "within its workspace"; orchestrator sanctions worktree parallel with cap; runtime template has `develop.parallel`.

## Constraints

- **MUST**: Follow the existing static-assertion pattern (label/file/assert closure), grouped with develop-skill assertions.
- **SHOULD**: Assert phrases, not full sentences (edit-resilient).
- **MUST NOT**: Add fixture/subprocess tests here (no runtime behavior to spawn — text-only feature).
- **SCOPE**: Implement only the behavior mapped to R5.3 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. Add static assertions to `run-skill-self-tests.mjs` for the five files listed in Target outcome (one assertion per file, multiple `content.includes` per assertion)
  - Locks the guard phrases against silent regression
  - Reuse the existing assertion array; keep labels descriptive ("develop parallel mode keeps single-writer rule", ...)
  - _Requirements: 5.3_

- [ ] 2. Run the full suite and reconcile the printed test count (baseline 152 + N new)
  - Proves assertions actually execute and pass against the shipped text
  - If any fails, fix the SOURCE text (tasks R0-01..R2-01), never weaken the assertion
  - _Requirements: 5.3_

- [ ] 3. Verification implementation
  - `cd packages/spec && npm test` twice (stability); count matches expectation
  - _Requirements: 5_

## Requirements

- 5.3 — Suite asserts single-writer rule, sequential fallback, escape hatch, wave cap presence

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/scripts/run-skill-self-tests.mjs` | Modify | Static assertions for parallel-wave guard phrases |
| `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Read | Asserted content |
| `packages/spec/src/claude/skills/develop/SKILL.md` | Read | Asserted content |
| `packages/spec/src/claude/agents/god-developer.md` | Read | Asserted content |
| `packages/spec/src/claude/rules/orchestrator.md` | Read | Asserted content |
| `packages/spec/src/claude/runtime.json` | Read | Asserted content |

## Completion Criteria

- [ ] ≥5 new assertions present following house pattern
- [ ] Suite passes with increased count; removing any guard phrase makes it fail (negative check: temporarily blank one phrase → red → restore → green, proven once)
- [ ] No assertion weakened or skipped to pass
- [ ] Assertions reachable: wired into the main assertion array executed by `npm test`

## Evidence

This section is both the task-level test plan and the proof checklist. Keep it short, exact, and executable.
Select the proof by task risk; do not run every test type for every task.

- Logic/data/validator task: include unit tests.
- Stateful UI/component task: include component or integration tests.
- Cross-module/API/state flow task: include integration tests.
- User-facing end-to-end workflow: include E2E/UI flow verification.
- Layout/theme/responsive task: include visual/runtime viewport checks.
- Interactive UI task: include accessibility checks when keyboard, focus, labels, or ARIA can regress.
- Scaffold/release task: include smoke build/test/dev-server checks.
- Performance/security checks are required only when the requirement, risk, or touched surface calls for them.

- [ ] Automated verification (unit/component/integration/E2E as applicable)
  - Command(s): `cd packages/spec && npm test`
  - Expected proof: PASS with count = baseline + new assertions; proven-red-once evidence recorded
- [ ] Artifact / runtime verification
  - Inspect: `packages/spec/scripts/run-skill-self-tests.mjs`
  - Expect: new labeled assertions in the main array
- [ ] Runtime reachability verification
  - Entrypoint/caller: `npm test` (package.json test script)
  - Expect: assertions execute in the run (labels visible on failure)
- [ ] Contract / negative-path verification
  - Check: blank one guard phrase in a scratch copy → run suite
  - Expect: suite fails naming the assertion; restore → green

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Phrase-assertions too brittle (block legit rewording) | Medium | Assert short stable phrases; rewording updates assertion + text together |
| Assertions pass vacuously (wrong file path) | Low | Proven-red-once requirement in Completion Criteria |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
