# Parallel Waves — hapo:develop `--parallel` operating procedure

Normative protocol for executing independent spec tasks concurrently. Loaded by
`develop/SKILL.md` when Full-Spec mode runs with `--parallel [N]`. Verified against
live worktree-subagent behavior (spec `develop-parallel-wave`,
`reports/worktree-spike.md`, 2026-07-19).

## 1. Preconditions (check before anything else)

1. `.claude/runtime.json` → `develop.parallel` is not `false` (escape hatch; missing
   key = allowed). If `false`: refuse `--parallel`, tell the user the hatch is active
   and which key controls it, then run the standard sequential loop.
2. The work context is a git repository and worktree isolation is available.
   Otherwise: state the reason ("not a git repo" / "isolation unavailable") and run
   the standard **sequential fallback**.
3. `--parallel N`: **wave cap** = N clamped to 1..5; default 3. Never exceed 5 —
   each subagent carries a ~200K context budget (orchestrator.md resource rule).
4. The destination tree must be clean (`git status --porcelain` is empty) and
   compatible with the selected base before dispatch. Record the destination
   `base_sha` and stop without mutation when cleanliness, repository, or base
   compatibility checks fail.
5. Before dispatch, state whether `--parallel` consent authorizes worker commits
   and orchestrator cherry-picks. If that consent is not explicit, obtain the
   separate confirmation before creating worktrees or asking workers to commit.

### Receipt contract (required per wave/task)

Every task and wave receipt records these exact fields:

```text
base_sha: <destination commit before dispatch>
head_sha: <latest worker/integration commit>
branch: <worker branch>
worktree_path: <retained or merged worktree path>
commit_range: <base_sha>..<head_sha>
retention: retained|released
cleanup_authorization: pending|explicit-discard|merged-release
```

Reviewer and tester commands MUST inspect `git diff <base_sha>..<head_sha>` (or
`git diff --stat <base_sha>..<head_sha>`), never an ambient working-tree diff.
Every fix is a new commit: advance `head_sha`, replace `commit_range`, and rerun
only affected gates plus the wave integration check. A receipt without these
fields is incomplete.

## 2. Wave planning (normative)

```
ready(t) = t.status == "pending" AND every dep in task_registry[t].dependencies
           has status == "done"
candidates = ready tasks in task_registry order
wave = first ≤cap candidates, EXCLUDING any task that conflicts with an
       earlier task already in the wave under the conflict graph below
```

**Conflict graph.** A pair conflicts when either task writes the same exact file,
one writes a directory another writes, or either touches a shared mutable surface:
lockfiles, manifests/export barrels, migrations/registries, generated artifacts,
or shared state writers. `Create`/`Modify`/`Delete` rows are writers; `Read` rows
are still conflicts when they consume a mutable generated or registry surface.
Normalize paths before comparison. If overlap is uncertain, classify it as a
conflict and defer the task to the sequential fallback; never guess that two
writers are independent.

**Single writer per file per wave** remains absolute. Read-only tasks can still
be deferred when they inspect a directory or shared generated state that a sibling
writes.

If the wave is empty but pending tasks remain, dependencies or conflicts are
unsatisfiable in parallel — finish them with the sequential loop and say so.

### Worked example

Registry: A (deps: –), B (deps: –), C (deps: A), D (deps: – but shares
`src/api/users.ts` Modify with B). Cap 3.

- Wave 1 = A, B (D excluded: path collision with B; C excluded: dep on A)
- Wave 2 = C, D (A done unblocks C; B done releases D's path)

## 3. Dispatch (one implementer per wave task)

Every dispatch uses worktree isolation + background execution and a
self-contained prompt per `rules/orchestrator.md` (task file content, design and
requirements excerpts, work-context/specs/docs paths, acceptance criteria) plus
these mandatory lines:

1. "You are in an isolated git worktree. Implement ONLY this task."
2. "Do NOT edit `spec.json` or any `tasks/*.md` — the orchestrator owns spec state."
3. "Do NOT touch files outside this task's `Related Files`."
4. "When done, `git add` your changes and `git commit -m \"task(<id>): <title>\"` —
   an uncommitted worktree cannot be merged."
5. End with the standard `Status: DONE|CONCERNS|BLOCKED|NEEDS_INFO` block, plus
   the receipt fields from §1, including worktree path, branch, and commit range.
6. If a worker fails or blocks, do not remove its worktree or delete its branch.
   Mark `retention: retained` and `cleanup_authorization: pending` until merge
   succeeds or the user gives explicit discard authorization.

The orchestrator records `base_sha` immediately before dispatch. The worker's
first accepted commit becomes `head_sha`; no receipt may use a moving ambient
HEAD as a substitute. The Agent result returns `worktreePath` and
`worktreeBranch`; record both in the receipt.

## 4. Quality gate — inside the worktree, before merge

Run the unchanged Stage A + Stage B gate (`references/quality-gate.md`) per task
**with the task's worktree as working directory**. Before reviewing, tester and
reviewer commands must inspect the receipt's immutable range:

```bash
git diff --stat "$BASE_SHA..$HEAD_SHA"
git diff "$BASE_SHA..$HEAD_SHA"
```

Do not replace this range with `git diff`, `git status`, or another ambient
working-tree view. Gate evidence from that run feeds the task receipt. Three
failed rounds → COLLAPSE protocol for that task only; sibling tasks in the wave
keep running. Any fix creates a new commit and updates `head_sha`/`commit_range`
before affected gates rerun.

## 5. Merge protocol (spike-verified — do not improvise)

⚠️ Spike finding: worktree branches are based on **`origin/<default-branch>`**
(`worktree.baseRef: "fresh"` default), NOT the session HEAD. On repos whose origin
default diverges, `git merge <agent-branch>` explodes into unrelated conflicts.

Therefore, for each gate-passed task, sequentially (one at a time, registry order):

```bash
git cherry-pick <agent-commit>       # base-agnostic: applies only the agent's diff
# conflict? → git cherry-pick --abort
#   → task_registry[task].status = "blocked", blocker = one-line conflict summary
#   → retain the worktree/branch; receipt says retention=retained
```

A successful merge may release the worktree and branch only after the receipt
records `head_sha` at the merge result, the new `commit_range`, and
`cleanup_authorization: merged-release`:

```bash
git worktree remove .claude/worktrees/agent-<id>
git branch -d worktree-agent-<id>
```

Never use `--force` cleanup for failed or blocked work. Retain its identifiable
worktree and branch for inspect/resume until the merge succeeds or the user
explicitly authorizes discard; record `cleanup_authorization: explicit-discard`
when that happens. Optionally set `worktree.baseRef: "head"` in settings;
cherry-pick remains the recipe regardless.

## 6. Post-merge integration check (per wave)

After the wave's last cherry-pick, run an affected integration command derived
from the task's `## Evidence` and repository contract (build or affected test
subset; never the full suite mid-flight). Record command, `base_sha`, `head_sha`,
range, and result in the wave receipt. Failure blocks the next wave.

After the final wave, run an explicit feature/full integration command derived
from the repository contract — for example the feature's exact Evidence suite
or the repository's documented full test/build command. A final scout is not a
substitute. Classify every failure before acting as exactly one of:

- `baseline` — reproduces from the recorded destination `base_sha`;
- `environment` — tool, dependency, permission, or service unavailable;
- `spec` — requirement, acceptance, or evidence contract mismatch;
- `code` — implementation or integration regression.

Do not blind-retry. Fix `code`/`spec` failures with a new commit and affected
gates; record `baseline`/`environment` blockers and escalate or use the
sequential fallback according to the task contract.

## 7. State sync — orchestrator is the single writer

Only the orchestrator writes `spec.json` and task markdown, after each task's
cherry-pick: registry `status`/`completed_at`/`last_updated_at`, task-md `Status`,
checkbox ticks, and a verification receipt citing the worktree gate evidence plus
the post-merge check result. The Stop completion gate (`spec-gate.cjs`) applies
unchanged — a receipt-less done blocks the turn. After syncing the wave, recompute
§2 and continue until no pending tasks remain.

## 8. Failure summary

| Event | Action |
|---|---|
| Escape hatch on / not a git repo / no isolation | Sequential fallback + stated reason |
| Same-wave path collision | Defer the later task to next wave (§2) |
| Gate fails 3× for a task | COLLAPSE for that task; retain worktree/branch and receipt; wave continues |
| Worker failure or blocked task | Retain identifiable worktree/branch; no force-remove; classify and await resume or explicit discard |
| Cherry-pick conflict | Abort pick; task `blocked` + conflict blocker; retain worktree/branch; wave continues |
| Post-merge check fails | Classify baseline/environment/spec/code; no next wave until resolved or explicitly blocked |
| Final integration fails | Record failure class and stop; do not claim completion from a final scout |
| Empty wave, tasks pending | Sequential loop for the remainder + notice |
