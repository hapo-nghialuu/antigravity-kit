# Task R2-01: Runtime toggle and changelog

**Requirement:** R5 — Runtime toggle & changelog (P)
**Status:** done
**Priority:** P2
**Estimated Effort:** S (~30m)
**Dependencies:** none
**Spec:** specs/develop-parallel-wave/

## Context

- **Why**: The escape hatch must be discoverable in the shipped template (batch-2 lesson: undocumented toggle keys are dead config), and the feature needs its changelog trail.
- **Current state**: `packages/spec/src/claude/runtime.json` template ships `spec.{scaffold_guard, completion_gate, tollgate}` — no `develop` key. Changelogs have an empty `[Unreleased]`.
- **Target outcome**: Template documents `develop.parallel: true`; both changelogs record the feature under `[Unreleased] → Added`.

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

- **MUST**: Missing-key semantics = allowed (matches contract); template value `true` documents the default.
- **SHOULD**: Follow the `spec` block precedent (place `develop` adjacent to it).
- **MUST NOT**: Add other develop-related keys speculatively (YAGNI).
- **SCOPE**: Implement only the behavior mapped to R5.1 and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [x] 1. Add `"develop": { "parallel": true }` to `packages/spec/src/claude/runtime.json` per the WAVE_CONFIG contract
  - Makes the hatch discoverable; installer ships it via existing runtime.files entry
  - Placement next to the `spec` block; JSON stays valid
  - _Requirements: 5.1_

- [x] 2. Add `[Unreleased] → Added` entries to `packages/spec/CHANGELOG.md` and `docs/project-changelog.md` describing parallel wave mode (opt-in flag, waves, worktree isolation, gate preserved, escape hatch)
  - Keeps the release trail per manage-docs.md
  - One concise bullet per file, Keep-a-Changelog format
  - _Requirements: 5.1_

- [x] 3. Verification implementation
  - `node -e "require('./packages/spec/src/claude/runtime.json')"` parses; changelog entries render under [Unreleased]
  - _Requirements: 5_

## Requirements

- 5.1 — `develop.parallel: false` escape hatch documented in the shipped template

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/src/claude/runtime.json` | Modify | Add `develop.parallel` per WAVE_CONFIG |
| `packages/spec/CHANGELOG.md` | Modify | [Unreleased] Added entry |
| `docs/project-changelog.md` | Modify | [Unreleased] Added entry |

## Completion Criteria

- [x] Template contains `develop.parallel: true` and parses as valid JSON
- [x] Contract block in this task byte-matches design.md (validator contract check — negative path: any drift fails Layer 1)
- [x] Both changelogs carry the feature entry
- [x] Key is consumed by the SKILL text (wired in R1-02 refusal path — named integration point)

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
  - Command(s): `node -e "const r=require('./packages/spec/src/claude/runtime.json'); if(r.develop?.parallel!==true) process.exit(1)"`
  - Expected proof: exit 0
- [x] Artifact / runtime verification
  - Inspect: `packages/spec/CHANGELOG.md`, `docs/project-changelog.md`
  - Expect: [Unreleased] Added entries present
- [x] Runtime reachability verification
  - Entrypoint/caller: `develop/SKILL.md` escape-hatch check (task R1-02)
  - Expect: SKILL refusal path reads `develop.parallel`; deferred integration named as R1-02
- [x] Contract / negative-path verification
  - Check: WAVE_CONFIG block drift vs design.md
  - Expect: Layer 1 contract check passes byte-identical


### Verification receipt (2026-07-19)

```
node -e "require runtime.json; develop.parallel===true" -> exit 0 (valid JSON, key present)
packages/spec/CHANGELOG.md + docs/project-changelog.md: [Unreleased] -> Added entries present
WAVE_CONFIG contract in this task byte-matches design.md (validated by Layer 1 at spec finalization)
```

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Template key ignored by upgrade merge quirks | Low | runtime.json ships via managed writer; locale-preservation fixture covers upgrade path |
| Changelog entry drifts from shipped behavior | Low | Written after R1-02 text is final or updated at review |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [x]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
