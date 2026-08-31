# Task 02 — Add safe bounded Loop engine

Status: blocked

## Outcome
CafeKit gains an explicit optimization loop that can improve a numeric metric
without trading away correctness or endangering the user's working branch.

## Scope
- In: preflight, metric/guard contract, disposable isolation, one-change
  iterations, keep/discard rule, drift and stop handling, final handoff.
- Out: Autoresearch router, subjective scoring, automatic delivery to the user's
  branch, deploy/publish, or autonomous test/guard edits.

## Coverage
- CP-02

## Ownership
- Create: `packages/spec/src/claude/skills/loop/SKILL.md`
- Create: `packages/spec/src/claude/skills/loop/references/bounded-loop-protocol.md`
- Create: `packages/spec/src/claude/skills/loop/references/metric-and-guard-contract.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance
- AC-04: preflight validates every required input before mutation and refuses
  code mutation without an independent mandatory Guard.
- AC-05: a fresh disposable worktree contains every experiment; commands are
  explicit argument vectors or equivalently non-evaluated invocations; one
  attributable change is retained only when metric delta clears noise/minimum
  delta and Guard passes on the same candidate.
- AC-05: drift in source, baseline, metric, Guard, scope, or environment stops
  the run; primary worktree and branch remain byte/commit-state untouched.
- AC-06: failure cleans only loop-owned disposable resources when ownership is
  certain, otherwise stops and reports exact residue; no destructive recovery.
- Final output reports baseline, best value, accepted/rejected iteration ledger,
  Guard evidence, residual limits, and a reviewable patch/reference without
  applying or committing it to the primary branch.

## Dependencies
- `task-01-strengthen-adaptive-research-contract.md`

## Verification Plan
- Command: `node packages/spec/scripts/run-skill-self-tests.mjs --static-only`
- Named probes: `hapo:loop bounded experiment contract is complete and fail-closed`;
  `hapo:loop checker rejects unsafe semantic weakenings`.
- Reachability: canonical Loop skill and both references.
- Oracle: the runner exits 0 only when mandatory preflight, isolation,
  one-change attribution, metric-plus-Guard keep rule, stop rules, and forbidden
  Git/shell actions coexist.
- Counterexample: a mutation makes Guard optional, uses `eval` or reset-hard,
  commits the primary branch, accepts noisy regression, edits the benchmark, or
  cleans an unowned path; its named probe fails.
- Artifacts: disposable test fixtures only.

## Receipt

