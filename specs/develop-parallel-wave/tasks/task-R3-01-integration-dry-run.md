# Task R3-01: Integration dry run

**Requirement:** R2/R4 — Integration dry run (final reachability)
**Status:** pending
**Priority:** P1
**Estimated Effort:** M (~1.5h)
**Dependencies:** tasks/task-R2-02-self-test-assertions.md
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: Text-only features die at first contact with a real session. This task proves the whole chain — flag → waves → worktree dispatch → gate-in-worktree → merge → orchestrator sync — actually runs end-to-end on a disposable sample spec, plus the fallback path. This is the spec's final integration/reachability task.
- **Current state**: After R0-01..R2-02, all shipped text exists and self-tests pass, but no live run has exercised parallel mode.
- **Target outcome**: A dry-run report `specs/develop-parallel-wave/reports/integration-dry-run.md`: a 3-task disposable sample spec (2 independent + 1 dependent) executed via `/hapo:develop <sample> --parallel 2` in a scratch project, with timings, wave composition, merge results, receipts, and one fallback run with the escape hatch on.

## Constraints

- **MUST**: Use a scratch/sample project (may reuse `sample/` assets) — never a real user project; sample spec tasks are trivial file creations.
- **MUST**: Verify receipts satisfy the Stop completion gate (spec-gate.cjs) — the new mode must compose with existing enforcement.
- **MUST NOT**: Ship any change from the dry run into product source; findings that require text fixes loop back to the owning task.
- **SCOPE**: Implement only the behavior mapped to R2.3/R4.2 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. Build the disposable sample spec (3 tasks: A, B independent; C depends on A) in a scratch project with CafeKit installed; run `/hapo:develop <sample> --parallel 2`; capture wave composition (expect wave1 = A+B, wave2 = C), worktree dispatch evidence, per-task gate results, merge sequence, and orchestrator-only spec.json updates
  - Proves the happy path end-to-end with real subagents
  - Record wall-clock vs a sequential baseline run of the same sample
  - _Requirements: 4.2_

- [ ] 2. Run the two negative paths: (a) set `"develop": { "parallel": false }` → `--parallel` refused with reason, sequential run proceeds; (b) run in a non-git scratch dir → fallback notice + sequential
  - Proves R2.3/R5.1 guardrails fire in reality, not just prose
  - Capture the exact refusal/fallback messages
  - _Requirements: 2.3_

- [ ] 3. Verification implementation
  - Write `reports/integration-dry-run.md` with all captures; every receipt in the sample spec passes the Stop gate check
  - _Requirements: 4_

## Requirements

- 2.3 — Fallback to sequential with stated reason, verified live
- 4.2 — Receipts carry worktree gate evidence + post-merge result, verified live

## Related Files

| Path | Action | Description |
|---|---|---|
| `specs/develop-parallel-wave/reports/integration-dry-run.md` | Create | End-to-end + negative-path evidence with timings |
| `packages/spec/src/claude/skills/develop/SKILL.md` | Read | The flow under test |
| `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Read | The protocol under test |

## Completion Criteria

- [ ] Happy path: wave1=A+B parallel, wave2=C, all gates pass in worktrees, merges clean, receipts valid under spec-gate
- [ ] Both negative paths produce the prescribed refusal/fallback messages (no silent parallel run)
- [ ] Timing comparison recorded (parallel vs sequential on the same sample)
- [ ] Any divergence between observed behavior and shipped text is filed back to the owning task before this task closes

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
  - Command(s): `node .claude/scripts/validate-spec-output.cjs specs/<sample>` in the scratch project after the run
  - Expected proof: sample spec passes (receipts + registry consistent post-parallel-run)
- [ ] Artifact / runtime verification
  - Inspect: `specs/develop-parallel-wave/reports/integration-dry-run.md`
  - Expect: wave composition, gate outputs, merge log, timings, refusal/fallback captures all present
- [ ] Runtime reachability verification
  - Entrypoint/caller: live `/hapo:develop <sample> --parallel 2` session (E2E of the full chain)
  - Expect: parallel-waves.md protocol observably followed; spec-gate accepts the receipts at Stop
- [ ] Contract / negative-path verification
  - Check: escape hatch on + non-git dir runs
  - Expect: prescribed refusal/fallback messages; zero worktree dispatches in both cases

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Live harness behavior diverges from spike-era findings | High | Divergences filed back to owning tasks (final Completion Criterion); spike report updated |
| Dry-run cost (multiple live subagents) | Low | 3 trivial tasks; cap 2; single scratch project |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
