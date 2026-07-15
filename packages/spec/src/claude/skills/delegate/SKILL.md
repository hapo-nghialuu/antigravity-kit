---
name: hapo:delegate
description: "Delegate implementation tasks from Claude Code to external CLI agents (Codex or Grok). Covers task-brief authoring, non-interactive dispatch, permission setup, background monitoring, resume, and independent verification of the returned work."
user-invocable: true
when_to_use: "Invoke when the user asks to assign/offload a coding task to codex or grok, or to run work on an external agent CLI."
category: orchestration
keywords: [delegate, codex, grok, external-agent, offload, assign]
argument-hint: "<codex|grok> <task-description | path/to/task-brief.md>"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Delegate to External Agents (Codex / Grok)

Dispatch a well-scoped implementation task to an external agentic CLI — **Codex** (OpenAI) or **Grok** (xAI Grok Build) — from a Claude Code session acting as orchestrator. Claude Code stays responsible for: writing the task brief, choosing safe permissions, monitoring, and **independently verifying** the result before reporting completion.

**Mantra:** Brief precisely, sandbox tightly, verify independently.

## When to Use

- User explicitly asks to hand a task to codex/grok ("giao cho codex", "assign to grok").
- Parallel workstreams: Claude Code keeps orchestrating while an external agent implements a scoped task.
- Cross-checking: a second model implements or reviews independently.

Do NOT delegate: tasks touching secrets/`.env`, deploys to shared environments, destructive migrations on live data, or tasks whose scope is still unclear (clarify first — a vague brief wastes an entire agent run).

## Workflow

### 1. Write the task brief (mandatory, file-based)

External agents run **fresh-context** — they see none of your conversation. Write the brief to a file (convention: `plans/<slug>-task.md` in the target repo), never inline-only. Follow the orchestrator prompt rules (`.claude/rules/orchestrator.md`): the brief must be self-contained.

Required sections:

```markdown
# Task: <title>

> Self-contained brief for a fresh-context agent. Date: <YYYY-MM-DD>.
> FOUNDATION: <state of the working tree the agent builds on — branch,
> uncommitted changes it must NOT revert, verified test/build status>

## Context        — project, architecture, why this task exists
## Scope          — numbered work items with exact file paths
## Constraints    — what must NOT be touched (staging data, .env, deploys,
                    unrelated refactors); repo rules to obey (CLAUDE.md)
## Completion Criteria — verifiable, numbered
## Evidence required   — exact commands whose output proves completion
```

Rules of thumb:
- Name exact files and line-level anchors where known; agents burn tokens rediscovering what you already know.
- State dependency order explicitly if this task builds on another agent's uncommitted work ("do NOT revert/stash existing changes").
- Put user-pending decisions in Constraints as forbidden actions (e.g. "do NOT touch staging rows until user confirms").

### 2. Protect the working tree

Before dispatch, snapshot state you cannot afford to lose:

```bash
git stash push -u -m "backup: <reason>" && git stash apply -q   # snapshot, keep tree intact
```

Prefer isolation when the task is risky or parallel to other edits:
- Grok: `--worktree=<name>` (built-in).
- Codex: run with `-C <worktree-dir>` after creating a git worktree yourself.

If the agent must build on uncommitted changes, isolation is not possible — use the stash-backup pattern above and say so in the brief.

### 3. Dispatch

Load the matching reference for exact flags, permission model, and pitfalls:
- **Codex:** `./references/codex-delegation.md`
- **Grok:** `./references/grok-delegation.md`

Common principles:
- Run non-interactive/headless mode in a **background** shell; both CLIs stream progress to stdout.
- Grant the **minimum** permission set that lets the agent write code and run its Evidence commands (npm/node). Never grant full-access/bypass modes for routine tasks.
- Model/effort overrides: pass explicitly rather than relying on user config, so the run is reproducible.
- Capture the output file path; check progress after ~20–30s to confirm the agent actually started (auth errors, bad flags, and permission blocks surface early).

### 4. Monitor

- Poll the background output periodically; look for permission-block messages — both CLIs degrade to "design-only" output instead of failing loudly when a write tool is blocked.
- If blocked on permissions: **resume the same session** with corrected flags (both CLIs support resume; see references) — context is preserved, work continues instead of restarting.
- Apply the 3-strike rule from `.claude/rules/orchestrator.md`: same failure 3+ times → stop, escalate to user with evidence.

### 5. Verify independently (non-negotiable)

External-agent claims are **not** evidence (CLAUDE.md: no completion claim without fresh proof from the current run). After the agent reports done:

1. `git status` / `git diff` — confirm the changed file set matches the brief's Scope; flag out-of-scope edits.
2. Run the brief's Evidence commands yourself (tests, build). The agent's transcript of a test run does not count.
3. Check Completion Criteria one by one.
4. Report to user: what was delegated, what came back, verification results, and any deviations.

### 6. Sync

- Keep the brief file updated (checklist ticks / blockers) so it doubles as task state.
- If a spec (`specs/<slug>/`) governs the work, follow the Tollgate Protocol (`.claude/rules/state-sync.md`): update `spec.json` + task files only after verification passes.
- The user decides commit/merge/deploy — delegation ends at verified working-tree changes unless told otherwise.

## Choosing Codex vs Grok

Both are capable general coding agents; prefer the one the user names. If unspecified:

| Factor | Codex | Grok |
|---|---|---|
| Isolation | manual git worktree + `-C` | built-in `--worktree=<name>` |
| Structured output | `--output-schema` (JSON Schema) | `--json-schema` |
| Self-verification | ask in the brief | `--check` flag appends a verify loop |
| Resume | `codex exec resume <id>` | `grok --resume <id>` |

## Rules

- Never grant `--dangerously-bypass-approvals-and-sandbox` (codex) or `bypassPermissions` (grok) for routine delegation.
- Never let an external agent touch `.env`, secrets, staging/production data, or run deploys.
- Never report the agent's own success claim as completion — verify first.
- Never re-dispatch a blocked task unchanged (BLOCKED ≠ retry; fix the cause: permissions, context, or scope).
- One writer per file set: don't run two agents (or an agent + yourself) editing the same files concurrently.

## References

- `./references/codex-delegation.md` — Codex CLI: exec mode, sandbox/approval model, resume, pitfalls
- `./references/grok-delegation.md` — Grok CLI: headless mode, worktree, permission rules, resume, pitfalls
