# Task R1-02: Develop skill parallel mode

**Requirement:** R1/R2/R5 — Parallel mode in develop SKILL
**Status:** done
**Priority:** P1
**Estimated Effort:** M (~2h)
**Dependencies:** tasks/task-R0-01-parallel-waves-reference.md
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: `hapo:develop` is the user-facing entrypoint — the `--parallel` flag, mode selection, and refusal paths live here. Without this task the reference doc (R0-01) is orphaned.
- **Current state**: `packages/spec/src/claude/skills/develop/SKILL.md` (263 lines) defines Specific-Task / Full-Spec / Flash modes; the Full-Spec Loop Protocol (line ~179) mandates one task at a time; frontmatter `argument-hint` lists current flags.
- **Target outcome**: A "Parallel Wave Mode" section (≤40 lines, pointing to `references/parallel-waves.md` for the algorithm) + flag parsing + escape-hatch refusal, with sequential default text untouched.

Contracts: WAVE_CONFIG

<!-- contract:WAVE_CONFIG -->
```jsonc
// .claude/runtime.json — develop parallel toggle (missing key = allowed)
"develop": {
  "parallel": true   // false = --parallel refused, sequential run + notice
}
// Flag: /hapo:develop <feature> --parallel [N]   (N = wave cap, 1..5, default 3)
```

## Constraints

- **MUST**: Keep the existing Full-Spec Loop Protocol text byte-identical for the non-parallel path (R5.2); parallel mode is additive prose.
- **MUST**: Dispatch-prompt requirements embed both prohibitions (no `spec.json`/task-md edits; no files outside the task's `Related Files`).
- **SHOULD**: Keep the new section ≤40 lines — algorithm detail belongs in `parallel-waves.md`.
- **MUST NOT**: Change Flash mode, Specific-Task mode, or quality-gate thresholds; must not make parallel the default.
- **SCOPE**: Implement only the behavior mapped to R1.1/R2.1/R2.2/R5.1/R5.2 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [x] 1. Add "Parallel Wave Mode" section to `develop/SKILL.md`: activation (`--parallel [N]` in Full-Spec only), load `references/parallel-waves.md`, wave loop summary (compute wave → dispatch one god-developer per task with worktree isolation + background → per-task gate in worktree → sequential merge → orchestrator-only state sync → next wave), and update frontmatter `argument-hint`
  - Gives users the opt-in fast path while keeping the skill body lean
  - Dispatch prompt template per orchestrator.md incl. the two prohibitions (R2.2)
  - _Requirements: 1.1, 2.1, 2.2_

- [x] 2. Add the refusal/fallback openings: escape hatch check (`develop.parallel === false` → refuse `--parallel`, state reason, run sequential) and the unchanged-default statement; copy the `WAVE_CONFIG` contract block verbatim into the section
  - Guardrails first — mode must fail safe before it runs fast
  - Refusal text names the runtime.json key so humans can find the switch
  - _Requirements: 5.1, 5.2_

- [x] 3. Verification implementation
  - Re-read final SKILL.md: sequential sections diff-clean vs pre-task version (`git diff` shows only additive hunks); contract block byte-matches design.md
  - _Requirements: 5_

## Requirements

- 1.1 — `--parallel` triggers wave computation in Full-Spec mode
- 2.1 — One god-developer per task, worktree isolation, background
- 2.2 — Self-contained dispatch prompt with spec-state + file-scope prohibitions
- 5.1 — Escape hatch refusal with stated reason
- 5.2 — Sequential default byte-identical

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/src/claude/skills/develop/SKILL.md` | Modify | Add Parallel Wave Mode section + flag + refusal paths |
| `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Read | Normative algorithm the section points to |
| `specs/develop-parallel-wave/design.md` | Read | Contract source + dispatch-prompt requirements |

## Completion Criteria

- [x] Parallel Wave Mode section exists, ≤40 lines, loads `references/parallel-waves.md`
- [x] `git diff` on SKILL.md shows only additive hunks around the new section + frontmatter (negative-path: zero deletions in Full-Spec/Flash/Specific-Task text)
- [x] WAVE_CONFIG contract block present and byte-identical to design.md (validator contract check passes)
- [x] Section reachable from user flow: frontmatter `argument-hint` mentions `--parallel`

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

- [x] Automated verification (unit/component/integration/E2E as applicable)
  - Command(s): `cd packages/spec && npm test` (semantic assertions incl. skill-catalog checks)
  - Expected proof: suite PASS; no assertion regressions on develop SKILL content
- [x] Artifact / runtime verification
  - Inspect: `packages/spec/src/claude/skills/develop/SKILL.md`
  - Expect: Parallel Wave Mode section present; `argument-hint` updated; section ≤40 lines
- [x] Runtime reachability verification
  - Entrypoint/caller: `/hapo:develop <feature> --parallel` invocation path (skill frontmatter + section)
  - Expect: flag documented in frontmatter `argument-hint` and handled in the mode dispatch prose
- [x] Contract / negative-path verification
  - Check: escape-hatch path — section text for `develop.parallel === false`
  - Expect: refusal + stated reason + sequential run (never a silent parallel run)


### Verification receipt (2026-07-19)

```
git diff --stat SKILL.md -> 22 insertions(+), 1 deletion(-)  (deletion = argument-hint frontmatter swap only)
grep "^-[^-]" body deletions -> 0 in Full-Spec/Flash/Specific-Task text  == additive-only PASS
Section "### 2b. Parallel Wave Mode" = 21 lines (<=40 PASS); loads references/parallel-waves.md
argument-hint now includes --parallel [N]
WAVE_CONFIG block copied from design.md (same source string)
```

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Section rewrite accidentally touches sequential prose | High | Completion criterion: additive-only `git diff`; R5.2 assertion in R2-02 |
| SKILL grows past lean budget | Low | ≤40-line cap; detail lives in parallel-waves.md |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [x]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
