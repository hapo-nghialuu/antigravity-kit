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

Match the language the user writes in. Technical terms, code identifiers, and file paths may remain in English.
