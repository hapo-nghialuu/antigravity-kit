# Quality Gate — Task Evidence + Two-Stage Review Loop

This is the critical checkpoint protecting codebase quality at Step 4 of `hapo:develop`.
Runs AUTOMATICALLY. Only escalates to user after 3 consecutive failures or a critical block.
Green tests are NOT enough. The gate requires four proofs:
1. Automated verification (typecheck/test/build)
2. Spec compliance review (scope/task/design adherence)
3. Code quality review
4. Task evidence (completion criteria + runtime/artifact/reachability proof from the task file)

`--flash` is the explicit fast path. It bypasses this full gate and uses the Flash Gate defined below.

## Tier input (from develop Delegation policy)

Quality-gate input MUST include `execution_tier` and `ship_point`:

- **Light:** main session runs verification commands and the same spec-compliance checklist. Spawn zero `test-runner` or `code-auditor` subagents.
- **Standard:** main session runs tests and spec checks. At the ship point, run exactly one combined `code-auditor` review for spec compliance plus code quality.
- **Deep / `--parallel`:** retain the documented per-worktree Stage A+B chain in Track A. Do not treat that chain as a permanent product contract.

Checklist and FAIL conditions stay identical for every tier; tier changes only who executes each check and when.

## Ship point semantics

- **Specific-task mode:** requested task is ship point. Review that task packet and its diff exactly once.
- **Full-spec Standard:** intermediate tasks receive only the main-session gate. After the final task and Final Integration Scout, run one combined auditor over the cumulative feature diff, all acceptance criteria, and runtime reachability.
- Do not set feature-level `code_done` or completion before combined auditor returns `PASS`.
- Auditor `FAIL` maps each finding to its owning task/surface. Fix only affected evidence, then rerun affected checks and the combined review; do not replay unrelated gates already passed.

## Automation Semantics

- If the task names exact commands in `## Evidence` (legacy heading aliases still parse), those exact commands are mandatory and must run before any fallback repo defaults.
- Preflight compile/typecheck/build health is mandatory. If compile/typecheck/build fails before tests are meaningful, the gate result is `PRECHECK_FAIL`, not `NO_TESTS`.
- `NO_TESTS` is never an automatic PASS.
- `NO_TESTS` is acceptable only when the task does **not** require a dedicated test suite command and every other required automated command/evidence item passes.
- If the task explicitly requires tests and the repo has no such test command or suite, the task is FAIL or BLOCKED, not done.
- If the task kind implies a concrete test type, the gate must enforce it: unit tests for logic/regression, component or integration tests for stateful UI or cross-module wiring, E2E/UI-flow checks for complete user workflows, visual/responsive checks for layout/theme work, accessibility checks for interactive UI, and smoke checks for scaffold/config. Performance/security checks are mandatory only when specified by requirement/risk/boundary.
- Named frameworks, auth systems, transports, datastores, and runtime boundaries in the task/spec are contractual. Silent substitutions are review failures, not acceptable implementation trade-offs.
- Multi-process or multi-runtime flows must prove shared real state or a real boundary contract. Matching in-memory placeholders on both sides do not count as working integration.
- Scope fidelity is mandatory: missing scoped behavior, extra unapproved behavior, or task output that exists only as orphaned/unreachable code is a review failure even when build/tests pass.
- Runtime-facing artifacts must be reachable from the real entrypoint/caller named by the task or the task-aware scout report.

## Flash Gate (`--flash`)

Use this only when `/hapo:develop ... --flash` is present.

- Skip dedicated test commands, E2E/browser/manual QA, full task evidence execution, test-runner delegation, and code-auditor retry loops.
- Do not report `Test PASS`, `Evidence PASS`, `Auto-Approved`, or `production-ready`.
- Still perform a scope sanity check against active task Completion Criteria.
- Still perform a reachability sanity check for runtime-facing files: imported, mounted, registered, routed, or invoked where applicable.
- Run a cheap compile/syntax/typecheck/build command only when available and expected to complete quickly without dependency install or external services.
- If the cheap preflight fails, return to implementation; do not sync.
- If the cheap preflight is unavailable or too slow, record `Preflight: skipped in --flash mode`.
- Sync only with receipt fields:
  - `Mode: --flash`
  - `Tests: skipped by user request`
  - `Evidence: FLASH_UNVERIFIED`
  - `Next verification: /hapo:test <feature>`

Terminal log:

```text
⚡ Step 4 Flash Gate: tests skipped by --flash; preflight=<pass|skipped>; evidence=FLASH_UNVERIFIED
```

## Quality Cycle

Maximum retry counter: **3 attempts**. Exceeding 3 triggers a collapse warning.

```text
Variable: retry_count = 0

Before START_LOOP:
  - Read the active task file(s)
  - Extract Related Files, Completion Criteria, `## Evidence` (legacy heading aliases still parse)
  - Extract the exact executable verification commands in declaration order
  - Extract relevant design contracts/invariants for the touched area
  - Extract scope_lock, requirement IDs, runtime entrypoints/callers, and reachability proof obligations
  - If any of these are missing or too vague to verify, FAIL immediately and route back to spec correction

START_LOOP:
  ---------------------------------------------------------------
  STAGE A: Test + SPEC COMPLIANCE review
  ---------------------------------------------------------------
  → Light: main session executes exact Evidence commands, spec checklist,
    artifact checks, and reachability checks; spawn 0 subagents.
  → Standard: main session executes exact Evidence commands and spec checklist;
    defer one combined auditor to the ship point.
  → Deep / --parallel: run the existing test-runner + spec-review chain in the
    task worktree, then preserve its documented merge/integration gates.

  Test result and spec-review result use the review enum only: PASS | FAIL | BLOCKED.
  PASS proceeds. FAIL returns actionable findings to implementer. BLOCKED means
  execution proof, permissions, environment, or a user-owned decision is missing:
  stop immediately and do not blind-retry.

  Standard specific-task ship point:
    → run exactly one combined code-auditor review after Stage A PASS.
  Standard full-spec ship point:
    → run exactly one combined code-auditor review after the final task and
      Final Integration Scout over the cumulative feature diff.

  CASE 1 — PRECHECK_FAIL OR Automated FAIL OR required command missing OR Evidence FAIL / UNVERIFIED OR Reachability FAIL:
    - For FAIL: increment retry_count; return to implementation while retry_count < 3.
    - For BLOCKED: stop without retry; record blocker and await resolution.
    - If retry_count >= 3: COLLAPSE and ask for user intervention.

  CASE 2 — Test PASS + Evidence PASS + spec checklist PASS:
    → Proceed to the ship-point review for Standard, or the Deep Stage B review.

STAGE B:
  ---------------------------------------------------------------
  COMBINED CODE QUALITY + SPEC REVIEW (Standard ship point)
  ---------------------------------------------------------------
  → `code-auditor` runs once with both scopes at the declared ship point.
  → PASS = no Critical, no High, at most one Medium; proceed to sync.
  → FAIL = findings mapped to task/surface; fix affected scope and rerun only
    affected evidence plus this combined review.
  → BLOCKED = missing proof/permission/environment/user decision; stop, no blind retry.
```

## Critical Issue Definitions

- **Security:** XSS vulnerabilities, SQL injection, leaked env tokens/secrets.
- **Performance:** Bottlenecks, O(n^3) algorithms, unbounded loops over DB calls.
- **Architecture:** Breaking MVC boundaries, cross-module coupling, convention violations.
- **Principles:** YAGNI violations, KISS violations, DRY violations (excessive code duplication).
- **Evidence / Done-Criteria Drift:** Missing required artifacts, placeholder-only wiring, missing entrypoints, unproven completion criteria, or runtime contract mismatches.
- **Reachability Failure:** Orphan components/services/hooks/routes/workers/commands/providers/reducers, unmounted UI, unregistered routes, uncalled data loaders, unused providers, disconnected actions, or any runtime-facing artifact that cannot be reached from the declared entrypoint/caller.
- **Scope Drift:** Scoped acceptance criteria omitted, behavior added outside `scope_lock`, or a task marked complete while part of its approved requirement remains unwired.
- **Overscope Delivery Drift:** Implementing later-task deliverables or editing out-of-scope files without direct justification for the active task packet.
- **Contract Substitution Drift:** Replacing a named framework/auth/transport/datastore/runtime boundary with a custom simplification without a spec amendment.
- **Cross-Service Reality Failure:** Claiming end-to-end behavior across web/api/worker/extension boundaries while state only exists in local process memory or placeholder adapters.

## Terminal Log Format

Must log the Quality Gate result to the terminal for user visibility:

- **Quick Pass:** `✓ Step 4 Quality Gate: Test PASS + Evidence PASS + Spec PASS + Review PASS (no Critical, no High, at most one Medium) - Auto-Approved`
- **Hard-Won Pass:** `✓ Step 4 Quality Gate: Failed 2 rounds → Test PASS + Evidence PASS + Spec PASS + Review PASS (no Critical, no High, at most one Medium)`
- **Preflight Fail:** `[x] Step 4 Quality Gate: PRECHECK_FAIL → compile/typecheck/build failed before tests mattered`
- **Fix Needed:** `[~] Step 4 Quality Gate: Tests/spec/evidence failed → returned to implementer`
- **Awaiting Rescue:** `[!] Step 4 Quality Gate: Failed 3 rounds! Awaiting user intervention...`

## Working directory (parallel mode)

When `hapo:develop` runs in Parallel Wave Mode (`references/parallel-waves.md`), every Stage A and Stage B command for a task executes **with that task's worktree as the working directory**. Gate evidence recorded from the worktree run feeds the task's verification receipt. Thresholds, retry counter, and the COLLAPSE protocol are identical to sequential mode. A COLLAPSE of one task does not cancel other in-flight tasks of the wave.

## Post-merge integration check (per wave)

After the orchestrator cherry-picks the last gate-passed task of a wave: run the project build **or** the affected test subset (never the full suite mid-flight — it runs once at develop completion). While this check fails, the next wave MUST NOT start.
