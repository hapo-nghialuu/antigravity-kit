## Codex runtime

- Repository instructions live in `AGENTS.md`.
- CafeKit skills live in `.agents/skills/`; invoke them as `$hapo-<name>` or browse with `/skills`. Edit skills in the project, not in a global skills directory.
- Run Python skill scripts with the project venv:
  - macOS/Linux: `.agents/skills/.venv/bin/python3 scripts/<script>.py`
  - Windows: `.agents\\skills\\.venv\\Scripts\\python.exe scripts\\<script>.py`
- CafeKit agents live in `.codex/agents/*.toml` and are auto-discovered after the repository is trusted.
- Runtime support lives in `.codex/rules/`, `.codex/scripts/`, `.codex/references/`, and `.codex/runtime.json`.
- Project hooks live in `.codex/hooks.json`; review trusted hooks with `/hooks`.
- Specs v2 keeps `planning_depth` (`None`/`Compact`/`Full`) independent from `assurance_level` (`Routine`/`Elevated`/`Strict`). Any risk has an Elevated automatic floor; Strict is opt-in only for an explicit user/project independent-audit requirement or a user-confirmed scope-specific audit decision, never a keyword or severity label. Run the artifact router before discovery: None has no durable spec; Compact/Full share the bounded `spec.json` + `requirements.md` + `design.md` core. Research requires material unresolved uncertainty, an external-current fact, or an explicit request; tasks require typed coordination topology. Full/Strict never create either automatically.
- In v2.1, `spec.json` is machine authority and Markdown is a human projection. Task plans have exactly seven sections: `Outcome`, `Scope`, `Anchors and Ownership`, `Changes`, `Acceptance`, `Dependencies`, `Verification Plan`; the only ownership table is `ID | Type | Target | Role | Access | Action`.
- Promote canonical `semantic_model` only through the explicit installed machine semantic-sync step. A semantic Markdown edit requires resynchronization and round-trip validation; never hand-author the machine shape.
- `coordination.boundaries` typed as ownership/dependency/transition/proof/parallel is topology authority. Legacy trigger fields, priority markers, related-file lists, approval fields, and prose are inert compatibility inputs, never canonical authoring.
- Canonical lifecycle is exactly `in_progress`, `paused`, `blocked`, or `done`. Technical readiness differs from closeout; authors cannot self-declare readiness, review authority, execution proof, or final `done`.
- Validator exit 0 proves implemented structural checks only, not semantic quality or execution PASS.

## Codex caveats

- Custom agents use snake_case names and `fork_turns: "none"` for explicit delegation.
- Use Codex-native subagent delegation and task-state tools; do not rely on Claude-only tool labels.
- Do not edit global trust configuration. Hooks are not a complete security boundary; hosted tools and untrusted project hooks can bypass the local hook path.

## Combined-install boundary

Codex's native project instruction surface is root `AGENTS.md`. Combined installs keep this Codex block there because no separate Codex project entrypoint is configured by CafeKit. Other runtimes may read the same root file; this shared-root trade-off is intentional and must not be treated as filesystem isolation.

**Ownership / ignore contract (fail-safe):** This Codex block is owned by Codex CLI only. If you are Claude Code, OpenCode, or any other runtime, ignore this entire Codex block and consume only CORE plus your native block. If you cannot determine which block is yours, treat the file as CORE-only. Do not treat another runtime's block as instructions.
