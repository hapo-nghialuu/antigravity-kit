# Quality Gate — Task Evidence + Two-Stage Review Loop

This is the critical checkpoint protecting codebase quality at Step 4 of `hapo:develop`.
Runs AUTOMATICALLY. Only escalates to user after 3 consecutive failures or a critical block.
Green tests are NOT enough. The gate requires four proofs:
1. Automated verification (typecheck/test/build)
2. Spec compliance review (scope/task/design adherence)
3. Code quality review
4. Task evidence (completion criteria + runtime/artifact/reachability proof from the task file)

`--flash` is the explicit fast path. It bypasses this full gate and uses the Flash Gate defined below.

## Automation Semantics

- If the task names exact commands in `Evidence` (or `Task Test Plan & Verification Evidence` / legacy `Verification & Evidence`), those exact commands are mandatory and must run before any fallback repo defaults.
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
  - Extract Related Files, Completion Criteria, Evidence (or Task Test Plan & Verification Evidence / legacy Verification & Evidence)
  - Extract the exact executable verification commands in declaration order
  - Extract relevant design contracts/invariants for the touched area
  - Extract scope_lock, requirement IDs, runtime entrypoints/callers, and reachability proof obligations
  - If any of these are missing or too vague to verify, FAIL immediately and route back to spec correction

START_LOOP:
  ---------------------------------------------------------------
  STAGE A: Test + SPEC COMPLIANCE review
  ---------------------------------------------------------------
  → Agent(subagent_type="test-runner",
        prompt="Run task-aware verification for the recently implemented code. Read the active task file(s) and execute the exact verification commands named there first, in order. Preflight compile/typecheck/build failures must be reported as PRECHECK_FAIL and take precedence over NO_TESTS. After that, run any additional repo-level typecheck/test/build checks needed for confidence. Inspect named artifacts/runtime outputs and prove runtime reachability from declared entrypoints/callers. For multi-service tasks, verify the flow does not rely on process-local stand-ins masquerading as shared state. Return PASS only if automated checks and task evidence both pass. Mark anything unexecuted as UNVERIFIED. Treat NO_TESTS as non-passing unless the task did not require a dedicated test suite.",
        description="Test [feature]")

  → Agent(subagent_type="code-auditor",
        prompt="SPEC COMPLIANCE REVIEW ONLY. Do not trust the implementer's report. Read the active task file(s), scope_lock, referenced requirements, design contracts, task-aware scout report, and actual code. Verify line by line that every scoped requirement and completion criterion is implemented, nothing out-of-scope was added, and every runtime-facing artifact is reachable from the declared entrypoint/caller or explicitly deferred to a named later task. Missing deliverables, placeholder-only wiring, orphan components/services, unmounted UI, unregistered routes, uncalled loaders, missing runtime entrypoints, overscope edits outside the task packet, silent replacement of named technologies/contracts, or fake cross-service proof via process-local state are Critical even if build/tests pass. Return SPEC_PASS or SPEC_FAIL, critical count, file:line findings, and evidence gaps.",
        description="Spec review [feature]")

  Wait for BOTH to return results.

  CASE 1 — PRECHECK_FAIL OR Automated FAIL OR required command missing OR Evidence FAIL / UNVERIFIED OR Reachability FAIL / SPEC_FAIL OR NO_TESTS when tests were required:
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! AskUserQuestion: "Quality gate cannot prove this task is complete! User intervention required!"
    - If retry_count < 3:
        → Return to Step 3 (god-developer). Fix the failing checks, spec gaps, or missing evidence first.
        → GOTO START_LOOP

  CASE 2 — Test PASS + Evidence PASS + SPEC_PASS:
    → Proceed to STAGE B code quality review.

STAGE B:
  ---------------------------------------------------------------
  CODE QUALITY REVIEW (only after spec compliance passes)
  ---------------------------------------------------------------
  → Agent(subagent_type="code-auditor",
        prompt="CODE QUALITY REVIEW. Spec compliance already passed. Review recently written code for security, logic correctness, architecture, YAGNI/KISS/DRY, maintainability, tests, and project conventions. Also re-check that no recent edits broke dependents found by the task-aware scout report. Return score (X/10), critical count, warning list, and concrete file:line findings.",
        description="Quality review [feature]")

  CASE 3 — Code quality review FAIL (Score < 9.5 OR Critical > 0):
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! AskUserQuestion: "Code does not meet minimum standards! User intervention required!"
    - If retry_count < 3:
        → Fix each review issue.
        → GOTO START_LOOP unless the fix is prose-only and cannot affect evidence; otherwise re-run Stage B.

  CASE 4 — Test PASS + Evidence PASS + SPEC_PASS + Code quality review PASS (Score >= 9.5 AND Critical = 0):
    → PASS! Auto-approved.
    → PROCEED to completion report with a verification receipt summarizing exact commands executed, artifact/runtime/reachability proof, spec review result, and code quality review result.
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

- **Quick Pass:** `✓ Step 4 Quality Gate: Test PASS + Evidence PASS + Spec PASS + Review 9.5/10 - Auto-Approved`
- **Hard-Won Pass:** `✓ Step 4 Quality Gate: Failed 2 rounds → Test PASS + Evidence PASS + Spec PASS + Review 9.6/10`
- **Preflight Fail:** `[x] Step 4 Quality Gate: PRECHECK_FAIL → compile/typecheck/build failed before tests mattered`
- **Fix Needed:** `[~] Step 4 Quality Gate: Tests/spec/evidence failed → returned to god-developer`
- **Awaiting Rescue:** `[!] Step 4 Quality Gate: Failed 3 rounds! Awaiting user intervention...`
