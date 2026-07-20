# Worktree Spike Report — R1-01

> Live evidence, 2026-07-19, repo `cafekit` @ `feat/develop-parallel-wave` (a5436a6). Two real subagent dispatches with `isolation: "worktree"`.

## Q1 — Where does the worktree live?

`<repo>/.claude/worktrees/agent-<id>` — verbatim from run 1:

```
pwd → /Users/nghialuutrung/Desktop/cafekit/.claude/worktrees/agent-abc2c107c88218f89
```

## Q2 — Branch naming?

`worktree-agent-<id>`:

```
git branch --show-current → worktree-agent-abc2c107c88218f89
```

⚠️ **CRITICAL FINDING — base ref:** the worktree branch is created from **`origin/<default-branch>`** (default `worktree.baseRef: "fresh"`), **NOT from the current local HEAD**. Run 2 proved it: branch base = `d294319` = ancient `origin/main` (Antigravity-era, v0.3.5), while the session branch sat at `a5436a6`. Any protocol that assumes "worktree = copy of my branch" is wrong on repos whose origin default branch diverges.

## Q3 — What remains after an agent finishes WITH changes?

Everything persists: the worktree directory, the branch, and the agent's commit.

```
[worktree-agent-abc2c107c88218f89 0e52eee] spike: worktree isolation proof
 1 file changed, 1 insertion(+)
git worktree list (after) →
/Users/nghialuutrung/Desktop/cafekit                                            a5436a6 [feat/develop-parallel-wave]
/Users/nghialuutrung/Desktop/cafekit/.claude/worktrees/agent-abc2c107c88218f89  0e52eee [worktree-agent-abc2c107c88218f89]
```

Bonus: the Agent tool result returns `worktreePath` + `worktreeBranch` metadata — the orchestrator does not need discovery.

## Q4 — Merge-back recipe

**`git merge <agent-branch>` is FORBIDDEN.** Executed once for evidence: it exploded into dozens of conflicts (CLAUDE.md, package.json, install.js, migration-manifest.json, whole `cafekit-web/` tree, ...) because the branch base was ancient `origin/main`. Recovered cleanly with `git merge --abort` (exit evidence: `Automatic merge failed; fix conflicts...` → abort → tree restored).

**Canonical recipe (proven clean): cherry-pick the agent's commit(s).** Base-agnostic — applies only the agent's own diff:

```
git cherry-pick 0e52eee
→ [feat/develop-parallel-wave 4da3755] spike: worktree isolation proof
→ 1 file changed, 1 insertion(+)  (only spike-proof.txt — zero conflicts)
```

Protocol implications:
1. Dispatch prompts MUST require the agent to `git commit` its work with a prescribed message (`task(<id>): <title>`), so there is a commit to cherry-pick.
2. Merge-back = `git cherry-pick <agent-commit(s)>` on the session branch, one task at a time.
3. Optionally set `worktree.baseRef: "head"` in settings to make worktrees branch from the session HEAD — but cherry-pick remains the recipe either way (belt and braces).

## Q5 — Cleanup behavior

**No immediate auto-clean, even for an unchanged run.** Run 2 (read-only agent, zero writes): worktree dir + branch still present after completion. Orchestrator must clean explicitly after each task's cherry-pick:

```
git worktree remove --force .claude/worktrees/agent-<id>
git branch -D worktree-agent-<id>
```

Executed for both runs; final state verified: `git worktree list` = main tree only, `git branch --list "worktree-*"` = 0, working tree clean of spike artifacts (spike-proof.txt removed via `git reset --soft HEAD~1` + delete after evidence capture).

## Environment

Claude Code harness, session of 2026-07-19; repo default remote branch (`origin/main`) diverged years-of-commits from working branches — the exact condition that exposed the base-ref trap.
