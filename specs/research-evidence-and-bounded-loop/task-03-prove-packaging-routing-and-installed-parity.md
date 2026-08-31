# Task 03 — Prove packaging, routing, and installed parity

Status: done

## Outcome
Packed Claude and Codex installs expose Research and Loop with equivalent
semantics, complete references, correct routing, and mutation-resistant safety.

## Scope
- In: package inventory, migration manifest, workflow/domain routing, native
  projection, packed fixtures, installed parity, semantic negative tests.
- Out: release/version bump, global install, primary workspace installation.

## Coverage
- CP-03
- CP-02 installed instruction-contract proof; live adherence `[UNPROVEN]`

## Ownership
- Modify: `packages/spec/src/claude/migration-manifest.json`
- Modify: `packages/spec/src/claude/rules/skill-workflow-routing.md`
- Modify: `packages/spec/src/claude/rules/skill-domain-routing.md`
- Modify: `packages/spec/bin/__tests__/package-inventory.test.js`
- Modify: `packages/spec/bin/__tests__/codex-native.test.js`
- Read/execute: `packages/spec/bin/__tests__/specs-v2-policy-and-scaffold.test.js`
- Read/execute: `packages/spec/bin/__tests__/specs-v2-validator-grounder-contract.test.js`
- Generate/verify: disposable installed projections for Claude and Codex,
  including `.agents/skills/research`, `.agents/skills/loop`,
  `.codex/agents/researcher.toml`, and `.codex/cafekit-manifest.json`.

## Acceptance
- AC-05/06: deterministic negative fixtures prove the packed written contract
  rejects dirty scope, external path/Git targeting, oracle mutation, ambiguous
  metrics, surviving descendants, ownership races, and incomplete handoff; they
  do not prove live-agent adherence.
- AC-07: manifest and routing expose Research for evidence-backed decisions and
  Loop only for explicit bounded optimization; ordinary implementation does not
  auto-route into Loop.
- AC-07: packed Claude and Codex artifacts include all references, translate
  runtime-native vocabulary without semantic loss, and reject missing or
  weakened safety clauses through negative mutations.
- Installation verification runs only in disposable roots and records literal
  exits; it does not rewrite unrelated local installed artifacts.

## Dependencies
- `task-01-strengthen-adaptive-research-contract.md`
- `task-02-add-safe-bounded-loop-engine.md`

## Verification Plan
- Command: `npm --prefix packages/spec test`
- Named probes: `Codex installed Research preserves adaptive evidence semantics`;
  `packed Claude and Codex installs preserve bounded Loop safety and routing`;
  `packed Research and Loop reject semantic weakenings`.
- Reachability: source manifest/rules through packed Claude and Codex disposable
  installs, including the researcher agent projection and Loop references.
- Oracle: package tests exit 0 only when inventory, both runtime projections,
  routing, legacy template consumers, and semantic mutation checks agree; live
  execution remains explicitly `[UNPROVEN]`.
- Counterexample: remove a Loop reference, route Loop implicitly, retain
  Claude-only tool names in Codex, weaken Guard/isolation after packing, or
  mutate a primary worktree during a failure fixture; its named probe fails.
- Artifacts: disposable install/mutation fixtures with cleanup asserted by tests;
  no production Loop patch artifact is created by this proof.

## Receipt

Verification: PASS
Command: npm --prefix packages/spec test
Exit: 0
Base: 65fd5d0bbfb4700b50339897009e2df9fcb6877a
Head: bde4bb7e559cb7a15b8d10c9909a10b149724a214769b24e5b6bb4d24e6c954c

```text
✔ Codex installed Research preserves adaptive evidence semantics
✔ packed Claude and Codex installs preserve bounded Loop safety and routing
✔ packed Research and Loop reject semantic weakenings
ℹ tests 356
ℹ pass 355
ℹ skipped 1
ℹ tests 189
ℹ pass 189
[skill-test] PASS: 1078 tests executed
```
