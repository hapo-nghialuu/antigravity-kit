# Task 04 — Documentation records what is portable and what stays Claude-only

Status: pending

## Outcome
The installer architecture document names `runtime-dir.cjs`, states that runtime reads and advice derive from the hook's location while skill paths come from the platform registry, lists the 13 `~/.claude/` sites kept as Claude Code behaviour and the 20 dead-code lines left in place, and describes the omp overlay. Both changelogs gain an entry.

## Scope
- In: the current architecture doc, the two changelogs, one static probe.
- Out: historical records.

## Coverage
- CP-04

## Ownership
- Modify: `docs/installer-architecture.md`
- Modify: `packages/spec/CHANGELOG.md`
- Modify: `docs/project-changelog.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance
- AC-08: a static probe asserts the doc names `runtime-dir.cjs`, contains the phrase that hooks derive their runtime directory from their own location, names the `~/.claude/` remainder as Claude-only, and describes `src/omp/hooks/` as an overlay of three files.

## Dependencies
- task-03-omp-overlay-and-runtime.md

## Verification Plan
- Command: `node scripts/run-skill-self-tests.mjs`
- Named probe: `installer architecture documents hook portability` in `runStaticSemanticTests()`.
- Reachability: known — same shape as `installer architecture documents omp coverage and gaps`.
- Oracle: suite PASS with the probe executed.
- Counterexample: deleting the portability paragraph must fail the probe.
- Artifacts: none.

## Receipt
