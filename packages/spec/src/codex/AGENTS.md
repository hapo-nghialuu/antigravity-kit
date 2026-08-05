## Codex runtime

- Repository instructions live in `AGENTS.md`.
- CafeKit skills live in `.agents/skills/`; invoke them as `$hapo-<name>` or browse with `/skills`. Edit skills in the project, not in a global skills directory.
- Run Python skill scripts with the project venv:
  - macOS/Linux: `.agents/skills/.venv/bin/python3 scripts/<script>.py`
  - Windows: `.agents\\skills\\.venv\\Scripts\\python.exe scripts\\<script>.py`
- CafeKit agents live in `.codex/agents/*.toml` and are auto-discovered after the repository is trusted.
- Runtime support lives in `.codex/rules/`, `.codex/scripts/`, `.codex/references/`, and `.codex/runtime.json`.
- Project hooks live in `.codex/hooks.json`; review trusted hooks with `/hooks`.

## Codex caveats

- Custom agents use snake_case names and `fork_turns: "none"` for explicit delegation.
- Use Codex-native subagent delegation and task-state tools; do not rely on Claude-only tool labels.
- Do not edit global trust configuration. Hooks are not a complete security boundary; hosted tools and untrusted project hooks can bypass the local hook path.
