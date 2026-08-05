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

## 2. Wave planning (normative)

```
ready(t) = t.status == "pending" AND every dep in task_registry[t].dependencies
           has status == "done"
candidates = ready tasks in task_registry order
wave = first ≤cap candidates, EXCLUDING any task that shares a Create or Modify
       path (exact normalized string match over its Related Files table) with an
       earlier task already in the wave — the excluded task returns to the pool
```

**Single writer per file per wave** is absolute. `Read` rows never conflict.
If the wave is empty but pending tasks remain, dependencies are unsatisfiable in
parallel — finish them with the sequential loop and say so.

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
   your worktree path, branch, and commit hash(es).

The Agent result returns `worktreePath` and `worktreeBranch` — record both per task.

## 4. Quality gate — inside the worktree, before merge

Run the unchanged Stage A + Stage B gate (`references/quality-gate.md`) per task
**with the task's worktree as working directory**. Gate evidence from that run
feeds the task receipt. 3 failed rounds → COLLAPSE protocol for that task only;
sibling tasks in the wave keep running.

## 5. Merge protocol (spike-verified — do not improvise)

⚠️ Spike finding: worktree branches are based on **`origin/<default-branch>`**
(`worktree.baseRef: "fresh"` default), NOT the session HEAD. On repos whose origin
default diverges, `git merge <agent-branch>` explodes into unrelated conflicts.

Therefore, for each gate-passed task, **sequentially** (one at a time, registry order):

```bash
git cherry-pick <agent-commit>       # base-agnostic: applies only the agent's diff
# conflict? → git cherry-pick --abort
#   → task_registry[task].status = "blocked", blocker = one-line conflict summary
#   → continue with the next passed task
git worktree remove --force .claude/worktrees/agent-<id>   # NOT auto-cleaned —
git branch -D worktree-agent-<id>                          # explicit cleanup, always
```

Cleanup runs for unchanged/failed worktrees too (spike: even a read-only run
leaves its worktree and branch behind). Optionally set `worktree.baseRef: "head"`
in settings; cherry-pick remains the recipe regardless.

## 6. Post-merge integration check (per wave)

After the wave's last cherry-pick: run the project build or the affected test
subset (never the full suite mid-flight — that runs once at develop completion).
Failure = fix before computing the next wave. This is the wave gate of
`quality-gate.md`.

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
| Gate fails 3× for a task | COLLAPSE for that task; wave continues |
| Cherry-pick conflict | Abort pick; task `blocked` + conflict blocker; wave continues |
| Post-merge check fails | No next wave until fixed |
| Empty wave, tasks pending | Sequential loop for the remainder + notice |
