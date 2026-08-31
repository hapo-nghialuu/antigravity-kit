# Task 04 — Document operator-facing usage

Status: done

## Outcome
Repository, package, and website guidance explain when to use Research versus
Loop, which inputs are mandatory, and what safe handoff users receive.

## Scope
- In: public catalog/overview, repository and package guidance, changelog entry,
  explicit invocation and limitations.
- Out: marketing performance claims, release notes for an unpublished version,
  tutorials for excluded Autoresearch/Predict/Scenario features.

## Coverage
- CP-03

## Ownership
- Modify: `README.md`
- Modify: `packages/spec/README.md`
- Modify: `packages/spec/CHANGELOG.md`
- Modify: `docs/project-changelog.md`
- Modify: `cafekit-web/src/components/docs/catalog-visuals.tsx`
- Modify: `cafekit-web/src/components/docs/skill-overview.tsx`
- Modify: `packages/spec/bin/__tests__/package-inventory.test.js`

## Acceptance
- AC-08: guidance says Research answers uncertain decisions with traceable
  evidence while Loop performs explicit numeric experiments after a valid
  preflight; neither automatically implements or guarantees improvement.
- AC-08: Loop examples name Goal, Scope, Metric/Direction, Baseline, Guard,
  noise/minimum delta, budget, and stop conditions, plus isolated patch handoff.
- AC-08: public names and runtime invocation syntax match packed artifacts;
  excluded `hapo-autoresearch` is not advertised.
- Existing docs structure and website type contracts remain valid.

## Dependencies
- `task-03-prove-packaging-routing-and-installed-parity.md`

## Verification Plan
- Command: `npm --prefix packages/spec test && pnpm --dir cafekit-web lint && pnpm --dir cafekit-web build`
- Named probes: `repository and package guides document adaptive Research and bounded Loop`.
- Reachability: root/package guides and rendered website catalog/overview data.
- Oracle: all three commands exit 0 and package tests assert the documented
  public names and safety/usage boundary against installed artifacts.
- Counterexample: docs advertise implicit Loop, omit Guard or isolation, claim
  guaranteed improvement, mention nonexistent Autoresearch, or drift from the
  installed invocation; its named probe or web gate fails.
- Artifacts: web build output only as produced by the existing build command.

## Receipt

Verification: PASS
Command: npm --prefix packages/spec test && pnpm --dir cafekit-web lint && pnpm --dir cafekit-web build
Exit: 0
Base: e4988200e250bae26a38618462aeaec8503ba09a
Head: 640dad7c2c375b6eb30092af978bdd28934dd48d0802b909d6d62009d2d00ab8

```text
✔ repository and package guides document adaptive Research and bounded Loop
ℹ tests 354
ℹ pass 353
ℹ skipped 1
ℹ tests 189
ℹ pass 189
[skill-test] PASS: 1076 tests executed
> web@0.1.0 lint
> eslint
✓ Compiled successfully
✓ Generating static pages using 7 workers (10/10)
```
