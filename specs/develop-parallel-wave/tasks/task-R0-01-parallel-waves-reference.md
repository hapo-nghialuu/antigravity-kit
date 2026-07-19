# Task R0-01: Parallel waves reference

**Requirement:** R1 — Wave planning (foundation reference)
**Status:** pending
**Priority:** P1
**Estimated Effort:** M (~2h)
**Dependencies:** tasks/task-R1-01-worktree-spike.md
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: The wave protocol needs one normative home so SKILL.md stays lean and every rule (conflict exclusion, caps, fallback, merge recipe) has a single source. All later tasks point here.
- **Current state**: `packages/spec/src/claude/skills/develop/references/` contains `quality-gate.md`, `subagent-patterns.md`, `implementation-notes-template.html` — no parallel material. Merge semantics evidence arrives from task R1-01's report.
- **Target outcome**: New `packages/spec/src/claude/skills/develop/references/parallel-waves.md` (≤200 lines) carrying the wave algorithm exactly as design.md specifies, the spike-verified merge protocol, and the fallback rules.

## Constraints

- **MUST**: Reproduce the design.md "Wave algorithm (normative)" block semantics verbatim (ready-set, registry order, cap default 3 / max 5, Create/Modify path exclusion, deferred-task pool).
- **MUST**: Base the merge-protocol section only on `reports/worktree-spike.md` findings (R6.2) — no invented git behavior.
- **SHOULD**: Include one worked example (4 tasks, 1 conflict, 2 waves) so agents can pattern-match.
- **MUST NOT**: Duplicate quality-gate thresholds (link to `quality-gate.md`); must not describe changes to sequential mode.
- **SCOPE**: Implement only the behavior mapped to R1/R2.3/R3.2-3.3/R6.1 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. Write the Wave Planning section in `parallel-waves.md`: ready-set definition, registry-order selection, cap (default 3, `--parallel N` 1..5), single-writer-per-file exclusion over `Related Files` Create/Modify paths, deferred-task pool
  - Enables deterministic wave computation any agent can follow
  - Include the worked 4-task example with one path collision
  - _Requirements: 1.1, 1.2, 1.3, 6.1_

- [ ] 2. Write the Merge & Fallback sections: sequential merge of gate-passed branches using the spike-verified recipe, conflict → skip branch + mark task blocked with conflict summary, post-merge integration check per wave, and the fallback triggers (no git repo / isolation unavailable / escape hatch) with the required user-facing notice
  - Codifies R3.2/R3.3 skip-and-block behavior and R2.3 fallback so failure paths are prescriptive, not improvised
  - Cite `specs/develop-parallel-wave/reports/worktree-spike.md` for every git command shown
  - _Requirements: 2.3, 3.2, 3.3_

- [ ] 3. Verification implementation
  - Cross-check the file against design.md traceability rows R1.1–R1.3/R2.3/R3.2–R3.3/R6.1; confirm ≤200 lines; grep-able key phrases present for R2-02 assertions ("single writer", "sequential fallback", "wave cap")
  - _Requirements: 1_

## Requirements

- 1.1 — Wave computed from `task_registry.dependencies` (pending + all deps done)
- 1.2 — Same-wave Create/Modify path conflict → defer lower-priority task
- 1.3 — Cap 3 default, `--parallel N` within 1–5
- 2.3 — Sequential fallback with stated reason when isolation unavailable
- 3.2 — Merge conflict → skip branch, task blocked with conflict summary
- 3.3 — Post-merge integration check gates the next wave
- 6.1 — Cap never exceeds 5 (200K/agent resource constraint)

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Create | Normative wave protocol reference (algorithm, merge, fallback) |
| `specs/develop-parallel-wave/reports/worktree-spike.md` | Read | Spike-verified merge semantics (input for Merge section) |
| `specs/develop-parallel-wave/design.md` | Read | Normative algorithm + traceability source |

## Completion Criteria

- [ ] `parallel-waves.md` exists, ≤200 lines, and covers algorithm + merge + fallback with the worked example
- [ ] Every git command in the Merge section traces to the spike report (no unverified behavior — negative check: zero commands absent from the report)
- [ ] Key phrases "single writer", "sequential fallback", "wave cap" present verbatim for downstream self-test assertions
- [ ] File is referenced (reachable) from `develop/SKILL.md` parallel section — wired in task R1-02; deferral to R1-02 is the named integration point

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
  - Command(s): `wc -l packages/spec/src/claude/skills/develop/references/parallel-waves.md && grep -c "single writer\|sequential fallback\|wave cap" packages/spec/src/claude/skills/develop/references/parallel-waves.md`
  - Expected proof: ≤200 lines; grep count ≥3
- [ ] Artifact / runtime verification
  - Inspect: `packages/spec/src/claude/skills/develop/references/parallel-waves.md`
  - Expect: algorithm matches design.md normative block; worked example present; merge commands cite the spike report
- [ ] Runtime reachability verification
  - Entrypoint/caller: `packages/spec/src/claude/skills/develop/SKILL.md` (parallel section, wired by task R1-02)
  - Expect: SKILL.md "Load `references/parallel-waves.md`" line exists after R1-02; deferred to named task R1-02
- [ ] Contract / negative-path verification
  - Check: diff the algorithm semantics against design.md "Wave algorithm (normative)"
  - Expect: no divergence in ready-set rule, cap bounds, or conflict exclusion; any deviation = task FAIL

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Reference drifts from design over time | Medium | R2-02 pins key phrases in self-tests; design.md stays the normative source |
| Worked example teaches the wrong pattern | Low | Example reviewed against algorithm in Step 3 cross-check |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
