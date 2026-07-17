# AGENTS.md

Primary operating instructions for OpenCode using the CafeKit runtime.

## OpenCode Runtime Mapping

- Project instructions live in `AGENTS.md`.
- CafeKit commands live in `.opencode/commands/` and use OpenCode-native slash names without the `hapo:` prefix.
- CafeKit subagents live in `.opencode/agents/` using OpenCode frontmatter.
- CafeKit skills live in `.opencode/skills/` and are read natively by OpenCode.
- Shared CafeKit support files live in `.opencode/rules/`, `.opencode/scripts/`, `.opencode/references/`, and `.opencode/runtime.json`.
- OpenCode config is merged into `opencode.json`; keep project-specific model/provider choices there.

## Command Surface

Use these OpenCode commands:

- `/brainstorm <idea-or-problem>`: scout and narrow an unclear idea before specs.
- `/question <question> [--repo|--web|--both|--brief|--deep]`: answer questions using repo evidence first, then external/current sources when needed.
- `/specs <feature-or-spec-command>`: create, update, validate, or approve specs.
- `/develop <feature> [task-file] [--flash]`: implement approved spec tasks.
- `/test [scope|--full]`: verify implementation and collect evidence.
- `/code-review [scope|--pending]`: review for correctness, regressions, and scope drift.
- `/debug <issue>`: diagnose root cause without product-code edits.
- `/hotfix <issue>`: apply a narrow, scout-first production fix.
- `/docs [--init|--update|--summarize|--reconstruct]`: maintain or reconstruct project docs.
- `/inspect <target>`: inspect source, artifacts, or external context.

The underlying CafeKit skills are still named `hapo:*` in their documentation. In OpenCode, use the commands above; each command reads the matching skill from `.opencode/skills/<skill>/SKILL.md`.

## Core Objective

Act as the project orchestrator: understand the request, keep scope tight, use the right CafeKit skill/agent, and deliver verified work that follows the project's architecture.

## Core Behavior

These rules reduce common agent coding failures: hidden assumptions, overbuilt solutions, unrelated edits, and unverified completion claims. They take priority over speed-oriented shortcuts.

### 1. Think Before Coding

- Do not assume silently. State assumptions when they affect the work.
- If multiple interpretations are plausible, surface them before implementation.
- If the simpler option is likely better, say so and push back.
- If the user asks a question about the project, use `/question` to answer from source evidence before planning.
- Before feature planning or coding, read `./README.md` for project context.

### 2. Simplicity First

- Solve the requested problem with the smallest maintainable change.
- Do not add speculative features, future-proofing, or single-use abstractions.
- Reuse existing modules before creating new ones.
- If code grows past 200 lines and could be materially simpler, consider splitting it by real boundaries.
- Prefer YAGNI, KISS, and DRY in that order.

### 3. Surgical Changes

- Touch only files required by the task.
- Do not refactor adjacent code, comments, or formatting unless needed for the requested change.
- Match existing style even if you would choose another style in a new project.
- Remove only dead code/imports created by your own change.
- Mention unrelated issues instead of fixing them opportunistically.

### 4. Goal-Driven Execution

- Convert requests into verifiable success criteria.
- For spec tasks, use `Completion Criteria` and `Evidence` as the source of truth. Existing task files may use `Task Test Plan & Verification Evidence` or legacy `Verification & Evidence`.
- For bugs, reproduce with a failing test or concrete evidence when feasible before fixing.
- Loop until verification passes or a real blocker is recorded.

## CafeKit Operating Loop

Use this loop for non-trivial work:

1. Understand: read README, relevant docs, active spec/task, and existing code.
2. Plan: choose the smallest coherent path; use `/question` for evidence-backed project questions and `/specs` for feature specs when ready.
3. Execute: implement only the active task/scope; no placeholder completion.
4. Verify: run exact task commands first, then repo-level lint/test/build as needed.
5. Sync: mark task state only after proof exists.

## OpenCode Runtime Limits And Replacements

- Claude Code hooks/statusline/settings do not run in OpenCode.
- Treat `.claude/rules/*` as explicit reference material, not injected hook context.
- Map Claude-specific tools to OpenCode built-ins: `TodoWrite` → the `todowrite` tool; `AskUserQuestion` → the `question` tool; `Task` → OpenCode's agent/subtask flow.
- Privacy and inspect gates are instruction-level gates in OpenCode unless a project-specific OpenCode plugin adds hard enforcement.

## Operating Discipline

- If a CafeKit skill may apply, read and use that skill before acting.
- No completion claim without fresh evidence from the current run: command output, artifact inspection, runtime proof, or an explicitly recorded blocker.
- For bugs, CI failures, and regressions, diagnose root cause before editing. Symptom patches are not completion.
- For implementation work, keep each task scoped to one clear owner/context. Reviewers should receive task files, diffs, and acceptance criteria, not chat history.
- For branch closeout, verify first, then choose an explicit finish action: merge, push/PR, keep branch/worktree, or discard with confirmation.

## Definition Of Done

A task is done only when all apply:

- implementation satisfies `Completion Criteria`
- `Evidence` is satisfied with concrete proof
- preflight/build/test outcomes are passing or an explicit blocker is recorded
- code review has no critical issues
- a verification receipt exists before task state is synced to `done`

`NO_TESTS` and `0 tests + exit 0` are not passing outcomes when the task requires automated tests.

## Rule References

Consult these when the task touches the relevant area:

- Primary workflow: `./.claude/rules/workflow.md`
- Development rules: `./.claude/rules/ai-dev-rules.md`
- Subagent coordination: `./.claude/rules/orchestrator.md`
- Docs maintenance: `./.claude/rules/manage-docs.md`
- State sync: `./.claude/rules/state-sync.md`
- Hook handling reference: `./.claude/rules/hook-protocols.md`
- Other protocols: `./.claude/rules/*`

## Skill And Script Use

- Evaluate the installed skill catalog before work and activate the relevant skill(s).
- If there is a reasonable chance a skill applies, prefer the skill workflow over ad hoc execution.
- If modifying skills, edit the current project/runtime files, not `~/.claude/skills` directly.
- Run Python skill scripts with the skill venv:
  - macOS/Linux: `.claude/skills/.venv/bin/python3 scripts/<script>.py`
  - Windows: `.claude\skills\.venv\Scripts\python.exe scripts\<script>.py`
- If a skill script fails, diagnose and fix the script or environment instead of abandoning the task.

## Git And Reporting

- Use conventional commits.
- Do not add AI attribution by default.
- Lint before commit and run the full required verification before push.
- Keep commits focused on actual changes.
- Reports should be concise; list unresolved questions or blockers at the end.

## Language Consistency

When generating specs or structured project output, use the user's preferred language consistently across the whole spec workspace. Technical terms, code samples, and file paths may remain English.
