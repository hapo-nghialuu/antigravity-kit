# Task 03 — Prove packaging, routing, and installed parity

Status: blocked

## Outcome
Packed Claude and Codex installs expose Research and Loop with equivalent
semantics, complete references, correct routing, and mutation-resistant safety.

## Scope
- In: package inventory, migration manifest, workflow/domain routing, native
  projection, packed fixtures, installed parity, semantic negative tests.
- Out: release/version bump, global install, primary workspace installation.

## Coverage
- CP-03
- CP-02 installed/behavioral proof

## Ownership
- Modify: `packages/spec/src/claude/migration-manifest.json`
- Modify: `packages/spec/src/claude/rules/skill-workflow-routing.md`
- Modify: `packages/spec/src/claude/rules/skill-domain-routing.md`
- Modify: `packages/spec/bin/__tests__/package-inventory.test.js`
- Modify: `packages/spec/bin/__tests__/codex-native.test.js`
- Generate/verify: disposable installed projections for Claude and Codex,
  including `.agents/skills/research`, `.agents/skills/loop`,
  `.codex/agents/researcher.toml`, and `.codex/cafekit-manifest.json`.

## Acceptance
- AC-05/06: disposable fixture execution proves Loop isolation and failure
  handling without touching the repository's primary worktree or branch.
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
  routing, behavior, and semantic mutation checks agree.
- Counterexample: remove a Loop reference, route Loop implicitly, retain
  Claude-only tool names in Codex, weaken Guard/isolation after packing, or
  mutate a primary worktree during a failure fixture; its named probe fails.
- Artifacts: disposable installation and worktree fixtures only.

## Receipt

