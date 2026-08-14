Primary operating instructions for OpenCode using the CafeKit runtime.

## OpenCode Runtime Mapping

- Project instructions live in `AGENTS.md`.
- CafeKit commands live in `.opencode/commands/` and use OpenCode-native slash names.
- CafeKit agents live in `.opencode/agents/` using OpenCode frontmatter.
- CafeKit skills live in `.opencode/skills/` and are read natively by OpenCode; edit project-local skills there.
- Run Python skill scripts with the project venv:
  - macOS/Linux: `.opencode/skills/.venv/bin/python3 scripts/<script>.py`
  - Windows: `.opencode\\skills\\.venv\\Scripts\\python.exe scripts\\<script>.py`
- Support files live in `.opencode/rules/`, `.opencode/scripts/`, `.opencode/references/`, and `.opencode/runtime.json`.
- OpenCode config is merged into `opencode.json`; keep project model/provider choices there.

## Command surface

Use these OpenCode commands without the `hapo:` prefix:

- `/question <question>`: answer from repository evidence first.
- `/brainstorm <idea-or-problem>`: narrow unclear ideas before specs.
- `/specs <feature-or-spec-command>`: create, update, validate, or approve specs.
- `/develop <feature> [task-file] [--flash]`: implement approved spec tasks.
- `/test [scope|--full]`: verify implementation and collect evidence.
- `/code-review [scope|--pending]`: review correctness and regressions.
- `/debug <issue>` and `/hotfix <issue>`: diagnose, then apply narrow fixes.

The underlying CafeKit skills are still named `hapo:*` in their documentation.

## OpenCode limits

Claude Code hooks, statusline, and settings do not run in OpenCode. Map Claude-only tools to OpenCode built-ins: `TodoWrite` → `todowrite`, `AskUserQuestion` → `question`, `Task` → the agent/subtask flow. The installed plugins under `.opencode/plugins/` provide the privacy, inspect-scope, spec-state, scaffold-guard, session-state, and docs-sync gates; other Claude runtime behavior has no OpenCode equivalent.

The installed `spec-gate` plugin uses the cancellable `tool.execute.before` hook to hard-block supported completion/state tools (`task`, `taskupdate`, and `todowrite`) with a controlled `CAFEKIT_SPEC_GATE_BLOCKED` result when shared policy/resolver or receipt evidence is invalid or unavailable. Receipt-repair tools remain available where the host boundary permits correction.

OpenCode does not expose a cancellable `session.idle`/Stop hook or final assistant-turn cancellation boundary. Those event and prompt-injection paths are observational only; do not claim full-turn parity with Claude/Codex.

## Combined-install boundary

OpenCode's native project instruction surface is root `AGENTS.md`. Combined installs keep this OpenCode block there because CafeKit has not proven a separate project instruction entrypoint for OpenCode. Other runtimes may read the same root file; this shared-root trade-off is intentional and must not be treated as filesystem isolation.

**Ownership / ignore contract (fail-safe):** This OpenCode block is owned by OpenCode only. If you are Claude Code, Codex CLI, or any other runtime, ignore this entire OpenCode block and consume only CORE plus your native block. If you cannot determine which block is yours, treat the file as CORE-only. Do not treat another runtime's block as instructions.
