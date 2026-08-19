# Parallel waves — `hapo:develop --parallel`

Load this reference only for explicit parallel execution. The goal is bounded
concurrency with immutable provenance and one state writer.

## Preconditions

1. Confirm the work context is a Git repository and worktree isolation is
   available. Otherwise state why and fall back to the sequential loop.
2. Respect `.claude/runtime.json` `develop.parallel: false` when present.
3. Clamp `--parallel N` to 1..5; default to 3.
4. Require a clean destination and record its exact `base_sha`. Stop without
   mutation if cleanliness or base compatibility fails.
5. Confirm whether the user's parallel consent also authorizes worker commits
   and controller cherry-picks before creating worktrees.

Every task receipt for a wave records:

```text
base_sha: <destination commit before dispatch>
head_sha: <worker or integrated commit>
branch: <worker branch>
worktree_path: <path>
commit_range: <base_sha>..<head_sha>
retention: retained|released
cleanup_authorization: pending|explicit-discard|merged-release
```

Test and review commands inspect `git diff <base_sha>..<head_sha>`, never an
ambient working-tree diff. A fix creates a new commit and advances Head.

## Build a wave

Read dependencies from the plan task table and each flat task's
`## Dependencies`. A candidate is ready only when all named dependencies are
done with valid Receipts.

Add ready tasks in plan order up to the cap, excluding a task when it shares a
write target with an earlier task or touches the same mutable registry,
lockfile, manifest, generated output, migration, or export barrel. Normalize
paths. Uncertain overlap is a conflict, not an invitation to guess.

One file has one writer per wave. If no safe wave remains, use the sequential
loop and state the dependency or ownership conflict.

## Dispatch

Each worker receives the complete task packet, work context, exact owned paths,
acceptance, Verification Plan, dependencies, and these constraints:

1. Work only in the assigned isolated worktree.
2. Do not edit `plan.md`, task Status, or `## Receipt`; the controller owns
   state and evidence synchronization.
3. Do not touch a path outside granted ownership or undo another worker's edit.
4. Run task-local prechecks and report exact commands and exits.
5. Commit only when the user's authorization covers worker commits.
6. Return status plus branch, worktree, Base, Head, range, and retention.

A blocked or failed worker keeps its identifiable worktree and branch. Never
force-delete it without merge success or explicit discard authorization.

## Verify before integration

Inside each worktree, run the task's proof through `quality-gate.md` against the
immutable commit range. A task with missing proof, overlap, or unresolved High
or Critical finding is not eligible to integrate. Three failed repair rounds
collapse only that task; siblings may finish but do not erase its blocker.

## Integrate sequentially

Apply accepted worker commits one at a time in plan order:

```bash
git cherry-pick <worker-commit>
```

On conflict, abort the cherry-pick, mark the task blocked, and retain its
worktree/branch. After success, update the receipt range to the integrated Head.
Release a worktree only after recording `cleanup_authorization: merged-release`.

## Post-merge proof

After the wave's last integration, run an affected integration command derived
from the tasks and repository contract. Record command, exit, Base, Head,
range, and output. Failure blocks the next wave.

Classify a failure before acting:

- `baseline`: reproduces from the recorded Base;
- `environment`: required tool, service, permission, or dependency unavailable;
- `spec`: acceptance or evidence contract is wrong or incomplete;
- `code`: implementation or integration regression.

Do not blind-retry. Fix code/spec with a new commit and rerun affected proof;
record baseline/environment as blockers.

After the final wave, run the feature-level integration and reachability proof.
The controller then writes inline Receipts and Status updates one task at a
time. Worker reports are evidence inputs, not permission to claim done.

## Legacy workflow compatibility

For an existing `spec.json` feature, readiness and dependencies come from the
persisted `task_registry` and typed `coordination.boundaries`. Workers still do
not edit that state. The controller writes the legacy separate task receipt,
synchronizes registry plus nested task Markdown, and creates the required final
feature receipt only after integrated proof.
