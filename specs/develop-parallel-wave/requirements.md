# Requirements — develop-parallel-wave

> EARS-format requirements. Canonical English. Scope per `spec.json.scope_lock`.

## R1 — Wave planning

- **R1.1** When `hapo:develop <feature> --parallel` runs in Full-Spec mode, the system shall compute dependency-ordered waves from `task_registry.dependencies`, where a wave contains every `pending` task whose dependencies all have status `done`.
- **R1.2** If two tasks eligible for the same wave share any `Create` or `Modify` path in their `Related Files` tables, the system shall keep the lower-ordered task id in the wave and defer the other to a later wave (single writer per file per wave).
- **R1.3** The system shall cap concurrent tasks per wave at 3 by default; `--parallel N` may raise or lower the cap within 1–5.

## R2 — Dispatch and isolation

- **R2.1** When dispatching a wave, the system shall run one `god-developer` subagent per task with worktree isolation and background execution.
- **R2.2** Each dispatch prompt shall be self-contained per `orchestrator.md` (task packet, work-context/specs/docs paths, acceptance criteria) and shall explicitly forbid the agent from editing `spec.json` or any `tasks/*.md`.
- **R2.3** While worktree isolation is unavailable (not a git repository, or isolation unsupported by the runtime), the system shall fall back to the sequential Full-Spec loop and state the fallback reason before starting.

## R3 — Quality gate and merge

- **R3.1** The system shall run the existing quality gate (Stage A + Stage B, unchanged thresholds) for each task against that task's worktree before its changes are merged.
- **R3.2** When a task passes its gate, the system shall merge task branches sequentially; if a merge conflicts, the system shall skip that branch, set the task's `task_registry` status to `blocked` with the conflict summary as `blocker`, and continue merging remaining passed branches.
- **R3.3** When all merges of a wave finish, the system shall run a post-merge integration check (project build or the affected test subset) and shall not start the next wave while the check fails.
- **R3.4** If a task fails its quality gate 3 times, the system shall apply the existing COLLAPSE protocol for that task without cancelling other in-flight tasks of the wave.

## R4 — Spec-state sync (single writer)

- **R4.1** The orchestrator alone shall write `spec.json` and task markdown: task status updates happen after each task's merge, and a wave-summary sync happens at wave end.
- **R4.2** Each merged task's verification receipt shall record the gate evidence produced in its worktree plus the post-merge integration result.

## R5 — Configuration and compatibility

- **R5.1** Where `.claude/runtime.json` contains `"develop": { "parallel": false }`, the system shall refuse `--parallel` and run sequentially, stating the escape hatch is active (missing key = parallel allowed).
- **R5.2** The system shall keep `hapo:develop` behavior without `--parallel` unchanged (sequential Full-Spec loop remains the default).
- **R5.3** The self-test suite shall assert the presence of the single-writer rule, the sequential-fallback clause, the `develop.parallel` escape hatch, and the wave cap in the shipped skill text.

## R6 — Non-functional

- **R6.1** The wave cap shall never exceed 5 concurrent subagents (each subagent has a 200K context budget; resource constraint per `orchestrator.md`).
- **R6.2** The merge-back instructions shipped in the skill text shall match the spike-verified worktree semantics (no instruction may describe unverified branch/cleanup behavior).

## Unresolved questions

- Exact worktree branch naming/cleanup semantics — resolved by spike task R1-01 before R6.2 can be satisfied.
