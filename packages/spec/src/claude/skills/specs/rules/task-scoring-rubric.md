# Task Scoring Rubric (optional advisory)

Load this rubric only when the persisted policy requires a task bundle and the
decomposition has a real split/merge or dependency question. It is not a lane
classifier, readiness gate, approval gate, or reason to create a task bundle.

## Candidate dimensions

Score each candidate from 0–3 only when the score will change a task decision:

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Dependency criticality | standalone | one predecessor | one slice blocked | core path blocked |
| Implementation risk | routine | known pattern | complex integration | unproven/security |
| Blast radius | isolated | feature-local | shared contract | critical boundary |
| User value | internal | enables work | visible improvement | acceptance/launch |
| Evidence confidence | proven | mostly proven | partial | low/no evidence |
| Test burden | unit/smoke | component/integration | workflow | security/rollback |
| File conflict | none | minor | shared module | overlapping ownership |
| Scope creep | none | interpretation | adjacent behavior | unapproved contract |

## Use of the result

Use the result only to explain priority, split/merge, dependency order,
parallel ownership, or proof depth. Prefer one task when one boundary and one
proof path are enough. Split only for a real dependency, ownership boundary, or
independent proof path.

- Scope-creep score 3: stop and ask for scope approval.
- Low evidence plus risk ≥2: consider a time-boxed spike, but do not create one
  solely because a Cynefin label says `Complex`.
- Blast radius 3: include rollback/negative-path proof.
- File conflict ≥2: remove `(P)` unless ownership is isolated.
- High value plus dependency ≥2: schedule early only after real prerequisites.

Cynefin is advisory discovery language. It may suggest a spike or research
question; it never changes Direct/Standard/Critical, adds registry/DAG
ceremony, or decides readiness.

## Compact task metadata

Do not copy the raw table into task files. Record only decisions that affect
execution:

- why the task is split or merged;
- why it is early or deferred;
- why it is or is not parallel;
- why a spike or deeper proof is useful;
- exact dependencies and evidence.

If no decision changes, omit scoring entirely and keep the task packet compact.
