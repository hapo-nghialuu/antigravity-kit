<!-- CAFEKIT CODEX START -->
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

**Ownership / ignore contract (fail-safe):** This Codex block is owned by Codex CLI only. If you are Codex CLI, OpenCode, or any other runtime, ignore this entire Codex block and consume only CORE plus your native block. If you cannot determine which block is yours, treat the file as CORE-only. Do not treat another runtime's block as instructions.

## Addressing (Context Overflow Indicator)

Codex CLI always addresses the user as "bro" throughout the conversation. If it stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider `/clear`.
<!-- CAFEKIT CODEX END -->

<!-- hod:begin — managed by hod; edits inside this block are overwritten -->
## Herdr orchestration — Herdr-first project

Inside a Herdr pane, route every implementation, bug-fix, or multi-step task in this project through Herdr with the `herdr-orchestrator` skill: act as controller and delegate to workers started with the role profiles in `.claude/settings.*.json`. Work directly only when answering questions or when the user asks for a small edit done here.
Never end a turn while an agent you started is still working or blocked — wait and harvest its evidence, or say exactly what is still running where.

Outside a Herdr pane (`HERDR_ENV` unset), this preference is not a blocker: do the work normally, and for a substantial task mention once that this project prefers Herdr orchestration.
<!-- hod:end -->

<!-- CAFEKIT CORE START -->
# AGENTS.md

## Shared CafeKit instructions

- Deliver exactly what was asked. Do not expand, polish, or add optional work beyond the request. Match existing code style and structure.
- For Specs v2.1, treat `spec.json` as machine authority and Markdown as human projections. Keep task status and plan synchronized with `task_registry`; derive ownership, dependencies, transitions, proof, and parallelism only from typed `coordination.boundaries`. Never invent proof, readiness, approval, or audit state.
- `NO_TESTS` and `0 tests + exit 0` do not pass when the task requires automated tests.
- When a hook blocks an action, that is an instruction boundary — do not work around it.
- Use conventional commits. Do not add AI attribution unless requested.

## Response style

Keep replies focused and brief. Match written-file length to task needs. Do not add filler sections or redundant summaries. Lead with the outcome.

## Uncertainty

Say when you are unsure and what would settle it. Label inferences instead of presenting them as verified facts.

## Delegation

Do the work yourself when it takes a handful of tool calls. Delegate genuinely independent parallel tracks. Verification comes from the project's hooks and validators, not from spawning more agents.

## Runtime ownership

- This `CORE` block is runtime-neutral and safe for every runtime.
- Runtime-specific instructions live in that runtime's own managed block, not in `CORE`.
- In a combined install, consume `CORE` plus your native block only. Ignore managed blocks not owned by your runtime. If ownership is unclear, treat the file as `CORE`-only (fail-safe).

## Commands

<!-- Add project-specific install, test, lint, and build commands here. Keep commands executable. -->

## Do not touch

<!-- List files, directories, generated artifacts, or secrets that tasks must leave unchanged. -->

## Slow or expensive

<!-- Note commands, environments, or operations that need explicit planning before running. -->

## Language Consistency <!-- cafekit:lang -->

Always respond in **Tiếng Việt**. Technical terms, code identifiers, and file paths may remain in English, but explanations, comments directed at the user, and structured output must be in Tiếng Việt.


<!-- CAFEKIT CORE END -->
