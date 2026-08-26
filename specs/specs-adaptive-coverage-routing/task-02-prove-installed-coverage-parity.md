# Task 02 — Prove installed parity and document usage

Status: done

## Outcome

Packed Claude and Codex installs preserve the same adaptive Specs contract, its known weakening mutations fail on disposable copies, and operators can understand when the structurally shorter direct path, Brainstorm, one Specs packet, or split Specs applies.

## Scope

- In: source and installed skill/agent mutation coverage, native transform parity, packed-install coverage, exact usage-guide checks, honest changed-path auditing, and full package regression.
- Out: installer code changes, live-host timing claims, package release/publish, and runtime enforcement of prose profile fields.

## Ownership

- Modify: `packages/spec/bin/__tests__/codex-native.test.js`
- Modify: `packages/spec/bin/__tests__/package-inventory.test.js`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs` (sequential follow-up to Task 01 for the guide probe)
- Modify: `docs/specs-usage-guide.md`
- Read: `packages/spec/bin/phases/copy-payload.js`
- Read: `packages/spec/bin/lib/codex-install.js`

## Acceptance

- AC-04: source and disposable installed copies reject mutations covering risk-first/direct routing, forced single or dropped unknown kind/surface, ambiguity bypass, risk downgrade, irrelevant global ceremony, stale profile lifecycle, planned-versus-observed proof confusion, proof-level promotion, and canonical Specs/`spec-maker` authority. Exercise both `.claude/skills/specs` plus `.claude/agents/spec-maker.md` and `.agents/skills/specs` plus `.codex/agents/spec_maker.toml`.
- AC-05: the guide explains the exact routes, CP shape/references, ambiguity/status consequences, risk floors, proof lifecycle, and the difference between structural speed controls and still-unmeasured wall-clock generation time. Static label `specs-usage-guide documents adaptive routing without timing claims` must fail when any element is removed or when an SLA is invented.
- AC-06: recursive copy and generic Codex skill/agent transforms remain sufficient and the full runtime/legacy regression stays green. Changed-path ownership is a separate controller audit, not a claim proved by `npm test`: compare the implementation delta with the eight unique Modify paths across Tasks 01/02, report pre-existing dirt separately, and fail handoff on any newly changed installer, hook, resolver, Receipt, legacy, timing-packet, or other unowned path.

## Dependencies

- task-01-author-adaptive-coverage-contract.md

## Verification Plan

- Command: `npm --prefix packages/spec test`
- Named probes: `hapo:specs adaptive coverage contract is complete and monotonic`; `specs-usage-guide documents adaptive routing without timing claims`; `Codex installed Specs and spec-maker reject adaptive coverage mutations`; `packed Claude and Codex installs preserve adaptive Specs and spec-maker`
- Reachability: canonical skill source → recursive payload copy → Claude/Codex installed skill roots; source `spec-maker.md` → native agent copy/transform → `.claude/agents/spec-maker.md` and `.codex/agents/spec_maker.toml`; guide → exact static check. No live routing or wall-clock claim is inferred.
- Oracle: the package runner exits 0 with nonzero executed tests, every named adaptive source/installed mutation rejected, native skill/agent semantics equivalent after allowed transformations, exact guide assertions present, and existing runtime/legacy suites green.
- Counterexample: skill checks pass while an installed agent retains stale routing, one runtime drops an unknown surface, the guide invents measured speed, or a planned live proof is treated as already passed; the owning named probe fails.
- Artifacts: disposable package/install fixtures only; tests verify containment and cleanup, leaving canonical source bytes unchanged.

## Receipt

Verification: PASS
Command: npm --prefix packages/spec test
Exit: 0
Base: ff4d6d07988f83e001ccf94197dc039464cc5962
Head: c19cd50be0b1433d088f71e6b88697ae78b230f28f883042379d3a8d6b1b3c24
```text
> @haposoft/cafekit@0.16.0-rc.8 test
> node scripts/run-skill-self-tests.mjs

✔ hapo:specs adaptive coverage contract is complete and monotonic; bundle deltas: src/claude/skills/specs/SKILL.md -19, src/claude/skills/specs/references/review.md +3, src/claude/skills/specs/references/templates.md +16; total 750/750
✔ specs-usage-guide documents adaptive routing without timing claims
✔ Codex installed Specs and spec-maker reject adaptive coverage mutations (5834.833583ms)
✔ packed Claude and Codex installs preserve adaptive Specs, spec-maker, and proportional Brainstorm (90597.739333ms)
﹣ packed Codex live host E2E via codex binary (opt-in) (0.894334ms) # opt-in only: set CAFEKIT_CODEX_HOST_E2E=1 to run live Codex host

ℹ tests 337
ℹ suites 0
ℹ pass 336
ℹ fail 0
ℹ cancelled 0
ℹ skipped 1
ℹ todo 0
ℹ duration_ms 167030.420042

ℹ tests 189
ℹ suites 0
ℹ pass 189
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 458923.618625

ℹ tests 42
ℹ suites 13
ℹ pass 42
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 10778.177584

[skill-test] pdf bounding-box tests
..........
----------------------------------------------------------------------
Ran 10 tests in 0.000s

OK

[skill-test] PASS: 883 tests executed
```
