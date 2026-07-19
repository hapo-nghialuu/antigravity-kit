# Task R1-01: Worktree spike

**Requirement:** R6 — Non-functional (merge-semantics evidence)
**Status:** pending
**Priority:** P1
**Estimated Effort:** S (≤1h)
**Dependencies:** none
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: The whole parallel design rests on worktree subagent merge semantics that have never been exercised in this repo (research.md "Remaining gaps" #1). R6.2 forbids shipping merge instructions that describe unverified behavior — this spike produces the evidence.
- **Current state**: Claude Code docs state subagents support `isolation: "worktree"` (own git worktree, auto-clean when unchanged) and background execution; branch naming, dirty-worktree persistence, and merge-back mechanics are undocumented in the repo.
- **Target outcome**: A short evidence report `specs/develop-parallel-wave/reports/worktree-spike.md` answering: worktree location, branch name pattern, what remains after the agent finishes WITH changes, exact commands the orchestrator must run to merge those changes into the working branch, and cleanup behavior.

## Constraints

- **MUST**: Run a real subagent with `isolation: "worktree"` making a trivial, throwaway file change; observe with `git worktree list` + `git branch` before/after.
- **SHOULD**: Repeat once with an unchanged run to confirm auto-clean behavior.
- **MUST NOT**: Touch any product source; the throwaway change must be deleted after evidence capture.
- **SCOPE**: Implement only the behavior mapped to R6 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. Dispatch a trivial background subagent with `isolation: "worktree"` that creates `spike-proof.txt` in the repo root, then inspect `git worktree list`, `git branch --list`, and the worktree directory state after completion
  - Answers: where the worktree lives, branch naming, whether changes persist after agent exit
  - Record raw command outputs verbatim in the report
  - _Requirements: 6.2_

- [ ] 2. Merge the spike branch into the current branch with plain `git merge <spike-branch>`; record the exact command sequence and result, then delete `spike-proof.txt` + the spike branch/worktree
  - Answers: the canonical merge-back recipe the orchestrator will ship in parallel-waves.md
  - Note any surprise (detached state, auto-cleanup, lock files)
  - _Requirements: 6.2_

- [ ] 3. Verification implementation
  - Write `reports/worktree-spike.md` with the five answers + verbatim outputs; confirm working tree back to clean state (`git status`)
  - _Requirements: 6_

## Requirements

- 6.2 — Merge-back instructions shipped in skill text must match spike-verified worktree semantics.

## Related Files

| Path | Action | Description |
|---|---|---|
| `specs/develop-parallel-wave/reports/worktree-spike.md` | Create | Evidence report: worktree location, branch pattern, merge recipe, cleanup behavior |

## Completion Criteria

- [ ] Report exists and answers all five questions with verbatim command output (no inference)
- [ ] Merge recipe was actually executed once successfully (not just described)
- [ ] Working tree and branch list restored to pre-spike state (negative-path: no leftover worktree/branch)
- [ ] R0-01 (parallel-waves reference) is unblocked: its merge-protocol section can cite this report

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
  - Command(s): `git worktree list && git branch --list && git status --short` (before/after each spike phase)
  - Expected proof: outputs captured verbatim in the report; final `git status` clean
- [ ] Artifact / runtime verification
  - Inspect: `specs/develop-parallel-wave/reports/worktree-spike.md`
  - Expect: five questions answered with raw outputs, merge recipe present
- [ ] Runtime reachability verification
  - Entrypoint/caller: `specs/develop-parallel-wave/tasks/task-R0-01-parallel-waves-reference.md` (consumer of the recipe)
  - Expect: R0-01 merge-protocol section cites this report; if R0-01 not yet written, this task's report is its named input
- [ ] Contract / negative-path verification
  - Check: unchanged-run behavior — dispatch a second subagent that modifies nothing
  - Expect: worktree auto-cleaned, no branch left behind (documents the "nothing to merge" path)

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Harness behavior differs by Claude Code version | Medium | Record the CLI version in the report; parallel-waves.md must tell agents to fall back sequential on unexpected git state |
| Spike leaves repo dirty | Low | Deletion steps + final `git status` gate in Completion Criteria |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
