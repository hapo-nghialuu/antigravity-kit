# Task 02 — Prove Codex projection and installed parity

Status: done

## Outcome

Claude and Codex receive the same proportional Brainstorm contract, and Codex's structured-input wording is grammatical in both direct transforms and packed disposable installs.

## Scope

- In: context-safe `AskUserQuestion` normalization, table-driven transform cases and unchanged controls, installed Brainstorm skill/reference/agent parity, negative grammar assertions, conditional public routing docs, and full package regression.
- Out: manual edits to generated `.agents/skills/brainstorm/**` or `.codex/agents/brainstormer.toml`, installer architecture changes, unrelated tool-token rewrites, live-host adherence tests, release, publish, and pre-commit fabrication of docs sync state.

## Coverage

- CP-01
- CP-02

## Ownership

- Modify: `packages/spec/bin/lib/codex-install.js`
- Modify: `packages/spec/bin/__tests__/codex-native.test.js`
- Modify: `packages/spec/bin/__tests__/package-inventory.test.js`
- Modify: `README.md` only when its public routing remains inaccurate after the contract change
- Read: `packages/spec/src/claude/skills/brainstorm/SKILL.md`
- Read: `packages/spec/src/claude/skills/brainstorm/references/question-framework.md`
- Read: `packages/spec/src/claude/agents/brainstormer.md`
- Post-commit handoff: refresh `docs/.sync_hash` only after affected docs reflect the committed non-doc source revision; it is not task execution proof.

## Acceptance

- AC-06: table-drive standalone and `one`, `each`, `every`, `another`, `this`, `that`, `a`, `an`, `the`, numeric, and plural `AskUserQuestion` call/batch contexts, with valid controls. Reject doubled/incompatible determiners and surviving Claude-only tokens. A disposable Codex install must equal `normalizeCodexBody` for both Brainstorm files, and `.codex/agents/brainstormer.toml` must equal `convertCodexAgentContent` for the source specialist while preserving Task 01 semantics.
- AC-07: mutation cases fail if grammar regresses, an unrelated input changes, a Claude-only token survives, an installed skill/reference/agent diverges, or installed routing weakens the contract. Add a corpus-wide differential oracle so generic expected-output generation cannot hide shared corruption. Run the full runtime/legacy regression. Update `README.md` only if needed to expose the bug detour and exploration stop; defer `docs/.sync_hash` refresh to the post-source-commit Git/docs handoff.

## Dependencies

- task-01-author-proportional-brainstorm-contract.md

## Verification Plan

- Command: `npm --prefix packages/spec test`
- Named probes: `Codex payload transform keeps structured user-input grammar across determiners`; `Codex installed Brainstorm skill reference and agent preserve proportional routing parity`
- Expected: exit 0 with nonzero tests, both named probes pass, all mutations are rejected, and the existing full package/runtime/legacy suite stays green.
- Reachability: Claude skill/reference/agent authoring files → generic instruction and agent normalizers → disposable Codex install → installed skill/reference/`brainstormer.toml` assertions. This proves packaged projection, not live model behavior.
- Counterexamples: `one/each/2 AskUserQuestion call(s)` gains an incompatible article; a token-free instruction changes; source routes bugs through Debug but installed Codex skips it; `brainstormer.toml` still forces strawman options or Specs handoff; installed exploration asks approval; normalized source and installed bytes drift while shared expected generation still passes.
- Artifacts: disposable install fixtures only; canonical source bytes remain unchanged. `docs/.sync_hash` is delivery metadata, not execution proof.

## Receipt

Verification: PASS
Command: npm --prefix packages/spec test
Exit: 0
Base: a9a7a23a9bee12ee9fe84900e368b81305802f86
Head: 02b60a3507719b8dfba222da4cbe8429c3c8256a9b71956ded7c91dcf3046213
```text
> @haposoft/cafekit@0.16.0-rc.8 test
> node scripts/run-skill-self-tests.mjs
[skill-test] PASS: 929 tests executed
```
