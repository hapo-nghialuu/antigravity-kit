# CafeKit for Codex CLI

## Native runtime mapping

- Repository instructions: `AGENTS.md`.
- CafeKit skills: `.agents/skills/`; invoke explicitly as `$hapo-<name>` or browse with `/skills`.
- CafeKit agents: native auto-discovered definitions in `.codex/agents/*.toml`.
- Runtime support: `.codex/rules/`, `.codex/scripts/`, `.codex/references/`, and `.codex/runtime.json`.
- Lifecycle enforcement: `.codex/hooks.json`. Project hooks run only after the repository and hook definitions are trusted; review them with `/hooks`.
- Do not create deprecated custom prompts or assume Claude/OpenCode command wrappers exist.

## Operating contract

- Read `README.md` and relevant project instructions before non-trivial work.
- Choose the matching CafeKit skill before improvising a workflow.
- Read `.codex/rules/workflow.md`, `.codex/rules/ai-dev-rules.md`, and
  `.codex/rules/skill-workflow-routing.md` for non-trivial work. Load the other
  `.codex/rules/*.md` files when their topic applies.
- Keep scope surgical; prefer YAGNI, KISS, then DRY.
- Do not claim completion without fresh build, test, runtime, or artifact evidence.
- For spec tasks, keep `spec.json`, task status, `Completion Criteria`, and `Evidence` synchronized only after verification.
- Privacy approvals are one request, one session, one retry. Only the user may submit the exact approval phrase emitted by the privacy hook.

## Runtime caveats

- Codex custom agents use snake_case names.
- When selecting a CafeKit custom role explicitly, call `spawn_agent` with `agent_type`, a unique snake_case `task_name`, `message`, and `fork_turns: "none"`. A full-history fork cannot change agent type.
- Use Codex-native subagent delegation and task-state tools; do not rely on Claude-only tool labels.
- The project `.codex/` layer—agents, config, rules, and hooks—loads only after the repository is trusted. Never edit the user's global trust configuration on their behalf.
- Hooks are guardrails, not a complete security boundary. Hosted tools and untrusted project hooks may not enter the local hook path.
