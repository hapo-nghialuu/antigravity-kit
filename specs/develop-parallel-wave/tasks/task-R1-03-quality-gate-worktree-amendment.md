# Task R1-03: Quality gate worktree amendment

**Requirement:** R3 — Quality gate in worktrees (P)
**Status:** pending
**Priority:** P1
**Estimated Effort:** S (~1h)
**Dependencies:** tasks/task-R0-01-parallel-waves-reference.md
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: The gate is the quality floor of develop; parallel mode must reuse it unchanged but point it at the right working directory (the task's worktree) and add the wave-level post-merge check.
- **Current state**: `packages/spec/src/claude/skills/develop/references/quality-gate.md` (131 lines) defines Stage A (test-runner + code-auditor SPEC COMPLIANCE, parallel) and Stage B (CODE QUALITY ≥9.5, 0 critical), retry ≤3 → COLLAPSE. It implicitly assumes the main working tree.
- **Target outcome**: quality-gate.md gains (a) a short "Working directory" note — in parallel mode every Stage A/B command runs inside the task's worktree; (b) a "Post-merge integration check" subsection — per wave, after all merges: project build or affected-test subset, failure blocks the next wave; (c) an explicit line that a COLLAPSE of one task does not cancel other in-flight wave tasks.

## Constraints

- **MUST**: Keep Stage A/B thresholds, retry counter, and COLLAPSE protocol unchanged (invariant 3 in design.md).
- **SHOULD**: Post-merge check guidance stays lightweight (build OR affected tests — full suite only at develop completion).
- **MUST NOT**: Introduce a second scoring scale or duplicate wave-planning content from parallel-waves.md.
- **SCOPE**: Implement only the behavior mapped to R3.1/R3.3/R3.4 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. Add the "Working directory (parallel mode)" note to Stage A/B in `quality-gate.md`: gate commands execute with the task's worktree as cwd; evidence recorded from that run feeds the task receipt
  - Preserves gate integrity while containing failures pre-merge (R3.1)
  - One short paragraph + one example line; no threshold edits
  - _Requirements: 3.1_

- [ ] 2. Add the "Post-merge integration check" subsection: after a wave's merges, run project build or the affected test subset; on failure the next wave MUST NOT start until fixed; add the COLLAPSE-isolation line (one task's 3-strike COLLAPSE never cancels other in-flight tasks of the wave)
  - Codifies R3.3 wave gate and R3.4 failure isolation
  - Reference parallel-waves.md for what "wave" means (no duplication)
  - _Requirements: 3.3, 3.4_

- [ ] 3. Verification implementation
  - `git diff` review: Stage A/B threshold text untouched; new content additive; npm test suite still passes
  - _Requirements: 3_

## Requirements

- 3.1 — Gate runs against the task's worktree before merge
- 3.3 — Post-merge integration check gates the next wave
- 3.4 — Per-task COLLAPSE without cancelling wave siblings

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/src/claude/skills/develop/references/quality-gate.md` | Modify | Working-directory note + post-merge check + COLLAPSE isolation |
| `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Read | Wave definition referenced (not duplicated) |

## Completion Criteria

- [ ] Both additions present; Stage A/B thresholds and COLLAPSE protocol text byte-unchanged (negative check via `git diff`)
- [ ] Post-merge check names concrete command classes (build / affected tests) and the blocking rule
- [ ] COLLAPSE-isolation line present verbatim enough to grep ("does not cancel other in-flight")
- [ ] Reachable: parallel-waves.md merge section links to the post-merge subsection (wired here or noted for R0-01 cross-link)

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
  - Expected proof: suite PASS (existing quality-gate assertions unaffected)
- [ ] Artifact / runtime verification
  - Inspect: `packages/spec/src/claude/skills/develop/references/quality-gate.md`
  - Expect: working-directory note + post-merge subsection + COLLAPSE-isolation line present
- [ ] Runtime reachability verification
  - Entrypoint/caller: `develop/SKILL.md` Step 4 (existing "Load quality-gate.md" flow — unchanged) + parallel-waves.md merge section cross-link
  - Expect: gate reference reachable from both sequential and parallel flows
- [ ] Contract / negative-path verification
  - Check: `git diff` over Stage A/B threshold lines and COLLAPSE protocol
  - Expect: zero modifications to thresholds/retry text — additive-only diff

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Gate semantics accidentally weakened | High | Additive-only diff criterion; thresholds byte-checked |
| Post-merge check interpreted as full-suite (slow) | Low | Wording pins "build OR affected tests"; full suite only at completion |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
