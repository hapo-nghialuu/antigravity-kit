# Task R1-04: Agent and orchestrator rules

**Requirement:** R2/R4 — Agent & orchestration rules (P)
**Status:** pending
**Priority:** P1
**Estimated Effort:** S (~1h)
**Dependencies:** tasks/task-R0-01-parallel-waves-reference.md
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: Two shipped texts currently *forbid* what parallel mode does: `god-developer.md:3` declares "Single-Track (linear, non-parallel)" and `orchestrator.md:51` bans multiple implementation agents. Both must be amended precisely — not deleted — so the sequential guarantees survive inside each worktree.
- **Current state**: `packages/spec/src/claude/agents/god-developer.md` (96 lines) frontmatter description carries the Single-Track clause; `packages/spec/src/claude/rules/orchestrator.md` (132 lines) "Implementation Review Chain" bans same-file parallel dispatch and warns on resource use (line ~26).
- **Target outcome**: god-developer described as "Single-Track **within its workspace**" (multiple instances allowed in separate worktrees); orchestrator.md parallel prerequisites gain the worktree-isolation clause, the single-writer-per-file wave rule, and the wave cap (3 default / 5 max).

## Constraints

- **MUST**: Keep the same-file prohibition — it becomes "same files *within the same workspace*"; distinct worktrees are the sanctioned exception.
- **MUST**: Keep the resource warning; attach the concrete cap numbers to it.
- **MUST NOT**: Remove the sequential Implementation Review Chain — it remains the default pattern.
- **SCOPE**: Implement only the behavior mapped to R2.1/R2.2/R4.1/R6.1 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. Amend `agents/god-developer.md` frontmatter description + body: Single-Track applies within the agent's workspace; when dispatched into a worktree the agent works only there, never edits `spec.json`/`tasks/*.md`, and stays inside its task's `Related Files`
  - Lets N instances run without contradicting the agent's own contract
  - Mirror the two dispatch prohibitions (R2.2) so agent-side and prompt-side agree
  - _Requirements: 2.1, 2.2_

- [ ] 2. Amend `rules/orchestrator.md` Parallel section: prerequisites add worktree isolation for implementation agents, the single-writer-per-file wave rule, orchestrator-only spec-state writes (R4.1), and the cap (default 3, max 5) tied to the existing 200K-per-agent resource warning
  - Turns the previous blanket ban into a precise sanctioned pattern
  - Cross-reference `skills/develop/references/parallel-waves.md` as the operating procedure
  - _Requirements: 4.1, 6.1_

- [ ] 3. Verification implementation
  - `git diff` review: prohibitions amended not removed; npm test passes (agent/rule semantic assertions)
  - _Requirements: 4_

## Requirements

- 2.1 — Multiple god-developer instances sanctioned via worktree isolation
- 2.2 — Agent-side restatement of dispatch prohibitions
- 4.1 — Orchestrator-only spec-state writes codified in the rule
- 6.1 — Cap ≤5 attached to the resource constraint

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/src/claude/agents/god-developer.md` | Modify | Single-Track-within-workspace + worktree prohibitions |
| `packages/spec/src/claude/rules/orchestrator.md` | Modify | Sanctioned parallel pattern + single-writer + cap |
| `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Read | Cross-referenced operating procedure |

## Completion Criteria

- [ ] god-developer description says Single-Track within its workspace; both prohibitions present in body
- [ ] orchestrator.md sanctions worktree-isolated implementation parallelism with single-writer rule + cap numbers (negative check: the old blanket "Do not dispatch multiple implementation agents" phrasing no longer contradicts parallel-waves.md)
- [ ] Cross-reference to parallel-waves.md resolves (file exists — R0-01 dependency)
- [ ] Sequential Implementation Review Chain text retained

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
  - Expected proof: suite PASS; existing god-developer/orchestrator assertions unaffected
- [ ] Artifact / runtime verification
  - Inspect: `packages/spec/src/claude/agents/god-developer.md`, `packages/spec/src/claude/rules/orchestrator.md`
  - Expect: amended clauses present; sequential chain retained
- [ ] Runtime reachability verification
  - Entrypoint/caller: rule loaded by every session (orchestrator.md is an installed rule); agent loaded on god-developer dispatch
  - Expect: no dangling reference — parallel-waves.md path cited in orchestrator.md exists
- [ ] Contract / negative-path verification
  - Check: contradiction scan — grep for "non-parallel" / blanket dispatch ban after amendment
  - Expect: no shipped text contradicts the sanctioned worktree pattern

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Loosened wording weakens sequential safety | High | Prohibitions amended with qualifier, never deleted; negative-path grep |
| Rule and skill text drift apart | Medium | Both cite parallel-waves.md as single source; R2-02 pins phrases |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
