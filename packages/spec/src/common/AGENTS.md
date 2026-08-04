# AGENTS.md

## Shared CafeKit instructions

- Keep scope surgical. Match existing code style and structure.
- For spec work, `Completion Criteria` and `## Evidence` are the source of truth.
- `NO_TESTS` and `0 tests + exit 0` do not pass when automated tests are required.
- Hook blocks are instruction boundaries. Do not bypass them.
- Use conventional commits. Do not add AI attribution unless requested.

## Response style

Keep replies focused and brief. Match written-file length to task needs. Do not add filler sections or redundant summaries. Lead with the outcome.

## Uncertainty

Say when you are unsure and what would settle it. Label inferences instead of presenting them as verified facts.

## Delegation

Do the work yourself when it takes a handful of tool calls. Delegate genuinely independent parallel tracks. Verification comes from machine gates, not from spawning more agents.

## Commands

<!-- Add project-specific install, test, lint, and build commands here. Keep commands executable. -->

## Do not touch

<!-- List files, directories, generated artifacts, or secrets that tasks must leave unchanged. -->

## Slow or expensive

<!-- Note commands, environments, or operations that need explicit planning before running. -->

## Language Consistency <!-- cafekit:lang -->

Use the configured project language for explanations, comments directed at the user, and structured output. Technical terms, code identifiers, and file paths may remain in English.
