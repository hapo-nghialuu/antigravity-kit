# Task Scoring Rubric

Use this rubric after applying the Phase Decision Matrix and before writing each task file. The score determines priority, split/merge, spike needs, dependency shape, and evidence depth.

## Score Each Candidate Task

Score each dimension 0-3.

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Dependency criticality | Standalone | Depends on one task | Blocks one feature slice | Blocks many tasks or core runtime |
| Implementation risk | Routine | Known pattern, minor edge cases | Complex logic or integration | Unproven behavior, migration, security, provider/platform uncertainty |
| Blast radius | Isolated file | Feature-local files | Shared component/API/config | Auth, data layer, routing, permissions, package export, or critical path |
| User value | Internal cleanup | Enables later work | User-visible improvement | Core acceptance criterion or launch blocker |
| Evidence confidence | Proven by code/tests/docs | Mostly proven | Partial evidence | Low/no evidence |
| Testability burden | Simple unit/smoke | Component/integration | Multi-step workflow | E2E/security/performance/rollback proof required |
| File conflict risk | No overlap | Minor shared utility | Shared module with consumers | Same files as another task or cross-agent conflict likely |
| Scope creep risk | Fully in scope | Small interpretation | Adds adjacent behavior | Adds unapproved feature/contract |

## Interpret Score

| Total | Priority | Action |
|---:|---|---|
| 0-6 | P3 | Keep compact. Merge if no independent proof exists. |
| 7-12 | P2 | Normal task. Include explicit dependencies and evidence. |
| 13-18 | P1 | High attention. Consider split, stronger evidence, and validation note. |
| 19+ | P1 critical | Split or add spike. Do not mark parallel unless file ownership is isolated. |

## Mandatory Overrides

- If Scope creep risk = 3, stop and use `AskUserQuestion` before generating the task.
- If Evidence confidence = 3 and Implementation risk >= 2, create a spike task first.
- If Blast radius = 3, include rollback/negative-path proof in `Evidence`.
- If File conflict risk >= 2, remove `(P)` unless ownership is explicitly separated.
- If User value = 3 and Dependency criticality >= 2, schedule early unless blocked by foundation work.

## Task Metadata Decisions

- `priority`: from total score plus overrides.
- `dependencies`: list every required predecessor task file.
- `(P)` marker: allowed only when dependency and file conflict scores are <= 1 and design boundaries do not overlap.
- `Evidence`: choose proof type from `tasks-generation.md` Test Type Selection table; increase proof depth for high scores.
- `Risk Assessment`: include all dimensions scored 2-3 as risks or constraints.

## Compact Output

Do not write the raw score table into every task file. Use the rubric to shape task content. Surface only decisions that affect implementation:

- why task is P1/P2/P3
- why it is split/merged
- why it is or is not parallel
- why a spike or extra proof is required
