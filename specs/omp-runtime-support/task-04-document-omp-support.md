# Task 04 — Documentation states omp's real coverage and its gaps

Status: blocked

## Outcome
The installer architecture document and both changelogs state that omp is supported, which hooks it carries, and which registered hooks it does not. A reader can tell what they get without reading source.

## Scope
- In: the current installer architecture doc and the two changelogs.
- Out: historical records. Past changelog entries and the 2026-07 audit stay as written.

## Coverage
- CP-05

## Ownership
- Modify: `docs/installer-architecture.md`
- Modify: `packages/spec/CHANGELOG.md`
- Modify: `docs/project-changelog.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance
- AC-12: a static probe asserts the architecture doc names omp, names `.omp/extensions/` as the bridge location, states that skills reach omp through its own Claude and agents discovery rather than a copied payload, and names the registered hooks omp does not carry.

## Dependencies
- task-03-bridge-omp-events.md

## Verification Plan
- Command: `node scripts/run-skill-self-tests.mjs`
- Named probe: the `installer architecture documents omp coverage and gaps` static probe added to `runStaticSemanticTests()` in `packages/spec/scripts/run-skill-self-tests.mjs`.
- Reachability: known — `runStaticSemanticTests()` already runs file-content probes of this shape, and the suite is the repository's standard gate.
- Oracle: the suite reports PASS with the new probe among the executed checks.
- Counterexample: deleting the omp paragraph, or listing a hook omp does not actually carry, must fail the probe.
- Artifacts: none; the suite reads tracked files in place.

## Receipt
