# Research — develop-parallel-wave

> Evidence log for the parallel-wave execution mode of `hapo:develop`. Date: 2026-07-19.

## Evidence Summary

- **Codebase scout result**: all five modification surfaces located and quoted below (develop SKILL Full-Spec loop, quality-gate stages, god-developer Single-Track clause, orchestrator parallel rules, task template `Related Files` table used for conflict planning). `task_registry` already carries per-task `dependencies` (relative task paths) — the wave planner needs no schema change.
- **External research result**: Claude Code subagent capabilities verified against official changelog/docs research performed 2026-07-13 (code.claude.com/docs, github.com/anthropics/claude-code CHANGELOG): subagents support `isolation: "worktree"` (each agent gets its own git worktree copy of the repo), run in background by default (v2.1.198), max 5-level nesting; `TeamCreate`/`TeamDelete` removed (v2.1.178) — coordination is per-agent dispatch, not teams. One unverified point — exact merge-back semantics of a worktree subagent's changes (branch name, cleanup behavior when changed) — is isolated into spike task R1-01 rather than assumed.
- **Selected decision**: opt-in `--parallel` flag on `hapo:develop` Full-Spec mode; dependency-ordered waves computed from `task_registry.dependencies`; per-wave file-conflict exclusion using each task's `Related Files` Create/Modify paths (single writer per file per wave); one `god-developer` per task in an isolated worktree, background; quality gate per task runs against the task's worktree BEFORE merge; orchestrator merges each task branch sequentially after its gate passes, then runs a post-merge integration check per wave; ONLY the orchestrator writes `spec.json`/task markdown (agents never touch spec state — avoids N-way merge conflicts on spec.json); wave size cap default 3; sequential fallback + `runtime.json` escape hatch.
- **Rejected alternatives**:
  - *Agents share the main working tree* (no isolation): rejected — this is precisely the failure mode the current orchestrator rule guards against ("Do not dispatch multiple implementation agents against the same files"); write collisions are unrecoverable mid-flight.
  - *Post-merge quality gate only*: rejected — a failing task discovered after merge poisons the tree for every subsequent merge in the wave; gate-in-worktree keeps failures contained and preserves the existing per-task COLLAPSE protocol.
  - *Agents sync their own spec state from inside worktrees*: rejected — N agents editing `spec.json` guarantees merge conflicts; single-writer orchestrator sync preserves the Tollgate/two-layer state model unchanged.
  - *Agent teams / SendMessage coordination*: rejected — `TeamCreate` was removed from Claude Code (v2.1.178); plain per-agent dispatch is the supported primitive.
- **Remaining gaps**: (1) exact worktree branch/cleanup semantics → spike R1-01 must run before the SKILL text describing merge commands is finalized; (2) real-world speedup ratio unknown until field test (target case: 16-task spec, 1h38m sequential — notes/v0.13.0-field-test-post-list-screen.md).
- **Downstream task/test implications**: self-test static assertions must pin the new mode's guard phrases (single-writer rule, fallback, escape hatch) so future edits cannot silently drop them; existing assertions about Single-Track wording in god-developer must keep passing (wording is amended, not removed).

## Codebase scout (quotes, 2026-07-19, branch feat/develop-parallel-wave @ dev 72d03ca)

1. `packages/spec/src/claude/skills/develop/SKILL.md:179` — "**Full-Spec Loop Protocol:** If you were asked to implement the whole feature, you MUST still work one task at a time." and `:252` — "only after sync may you re-read `task_registry`, pick the next unblocked pending task". → The sequential loop is explicit prose; parallel mode must be added as a *sibling mode*, not a rewrite, to keep the default untouched (scope_lock).
2. `packages/spec/src/claude/agents/god-developer.md:3` — "Operates on a Single-Track principle (linear, non-parallel)." → Amend to "Single-Track *within its workspace*"; multiple instances may run in separate worktrees.
3. `packages/spec/src/claude/rules/orchestrator.md:51` — "Do not dispatch multiple implementation agents against the same files or same task. Parallelize only independent scopes with distinct file ownership." and `:26` — resource warning. → The wave planner operationalizes exactly this rule (distinct file ownership per wave); rule text gains the worktree-isolation clause and keeps the resource cap.
4. `packages/spec/src/claude/skills/develop/references/quality-gate.md` — Stage A (test-runner + code-auditor SPEC COMPLIANCE, parallel) / Stage B (CODE QUALITY ≥9.5, 0 critical), retry ≤3 → COLLAPSE. → Reused verbatim per task; only its *working directory* changes (the task's worktree). Post-merge integration check is a NEW, lighter step (build/affected-tests) added per wave.
5. `.claude/skills/specs/templates/task.md:44-46` — `## Related Files` table `| Path | Action | Description |`. → Conflict planning input: two tasks sharing any Create/Modify path may not share a wave.
6. `packages/spec/src/claude/src runtime.json` (template, post batch-2) — `spec.{scaffold_guard, completion_gate, tollgate}` precedent for toggles → new `develop.parallel` key follows the same pattern (missing key = enabled default semantics documented in design).

## External evidence

- Claude Code subagents: `isolation: "worktree"` gives the agent an isolated git worktree; background execution is default; notification on completion (docs research 2026-07-13, session audit doc §Phần 2). Source: code.claude.com/docs/en/sub-agents + CHANGELOG (v2.1.198, v2.1.178).
- Field-test baseline for the problem statement: 16-task spec, sequential develop = 1h38m, 8 timeouts (`notes/v0.13.0-field-test-post-list-screen.md`, 2026-06-18) — parallel waves target the "spec too large" lever identified there.
