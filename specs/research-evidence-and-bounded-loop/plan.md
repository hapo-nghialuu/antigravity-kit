# Adaptive research evidence and bounded optimization loop
Specs-Contract: process-first-ready-v1

## Scope decision (C1 — 2026-08-31)
- Existing: `hapo-research` provides multi-source research and ranked recommendations,
  but its skill, researcher agent, and report template disagree about depth,
  persistence, delegation fallback, and claim provenance. CafeKit has no bounded
  iterative optimization engine.
- Minimum change: make Research adaptive and evidence-addressable; add one explicit
  `hapo-loop` engine with fail-closed metric, guard, isolation, and stop contracts.
- Expansion evidence: packaging, native projection, routing, tests, and operator
  docs require four sequential tasks, while retaining only the two requested
  product outcomes.
- User decision: **KEEP and learn** — keep CafeKit Research, learn the useful
  autoresearch loop semantics without copying unsafe Git behavior.

## Out of scope
- `hapo-autoresearch`; AK Predict/Scenario/Security/Deep-SWE ports; subjective or
  missing-metric loops; live success, performance, or cost claims.
- `eval`, `git reset --hard`, force push, deploy, publish, primary-branch commit,
  silent merge/cherry-pick, weakening tests/guards, or unrelated recovery.
- Legacy Specs migration, hook changes, release, version bump, commit, or push.

## Coverage profile
| ID | Outcome | Surfaces | Proof level | Required proof |
|---|---|---|---|---|
| CP-01 | Research selects proportional depth and makes important claims traceable. | Research skill, researcher agent, report contract | source + installed | static mutation contract |
| CP-02 | Loop runs only bounded, measurable, guarded experiments in isolation. | Loop skill and references | source + installed | static mutation + disposable fixture |
| CP-03 | Claude/Codex packaging, routing, and docs preserve the two contracts. | manifest, rules, native projections, tests, guides | installed | disposable native installs + docs gates |

## Acceptance criteria
| ID | EARS criterion | Proof |
|---|---|---|
| AC-01 | When Research receives a decision, it shall choose Quick, Standard, or Deep depth from decision risk; use repository evidence for local fit; and use current external sources only for material external claims. | `node packages/spec/scripts/run-skill-self-tests.mjs --static-only` |
| AC-02 | For every material claim, Research shall bind a URL or repository anchor, authority, date/version, applicability, and `confirmed|inferred|unresolved`; Deep shall perform a contradiction/gap round and return a winner, tradeoffs, and limitations for comparative decisions. | `node packages/spec/scripts/run-skill-self-tests.mjs --static-only` |
| AC-03 | If delegation is unavailable, unauthorized, or not useful, Research shall continue sequentially without lowering evidence requirements; it shall persist a report only for an active Spec or explicit durable-report request, otherwise answer in chat. | `node packages/spec/scripts/run-skill-self-tests.mjs --static-only` |
| AC-04 | Before Loop mutates anything, it shall require Goal, isolated Scope, numeric Metric with direction, reproducible Baseline, mandatory Guard for code mutation, noise/minimum-delta policy, iteration/time budget, and stop conditions. | `node packages/spec/scripts/run-skill-self-tests.mjs --static-only` |
| AC-05 | During Loop, each iteration shall make one attributable change in a disposable worktree, run screened exact commands without `eval`, keep only a metric improvement that also passes Guard, stop on drift, and never mutate/commit/push/merge the primary branch. | `npm --prefix packages/spec test` |
| AC-06 | If a command fails, regresses, times out, invalidates Guard, or cannot restore with certainty, Loop shall discard only its disposable environment and report `BLOCKED`; it shall never use reset-hard, edit tests/Guard to win, or recover unrelated state. | `npm --prefix packages/spec test` |
| AC-07 | When CafeKit packs and installs Claude/Codex projections, public names, native vocabulary, routing, references, and safety semantics for Research and Loop shall remain equivalent and mutation-tested. | `npm --prefix packages/spec test` |
| AC-08 | Operator docs shall distinguish Research from explicit-only Loop, explain inputs/outputs and handoff, and make no guarantee of improvement. | `npm --prefix packages/spec test && pnpm --dir cafekit-web lint && pnpm --dir cafekit-web build` |

## Tasks
| # | Task | Criteria | Primary ownership | Dependencies | Status |
|---|---|---|---|---|---|
| 01 | Strengthen adaptive Research contract | CP-01; AC-01–03 | Research source, agent, template, static checker | none | blocked |
| 02 | Add safe bounded Loop engine | CP-02; AC-04–06 | Loop source, references, static checker | task-01-strengthen-adaptive-research-contract.md | blocked |
| 03 | Prove packaging, routing, and installed parity | CP-03; AC-05–07 | manifest, routing, package/native tests | task-01-strengthen-adaptive-research-contract.md; task-02-add-safe-bounded-loop-engine.md | blocked |
| 04 | Document operator-facing usage | CP-03; AC-08 | repository/package/web guides | task-03-prove-packaging-routing-and-installed-parity.md | blocked |

## Review log
- C1 accepted on 2026-08-31. C2 pending fresh adversarial review.

