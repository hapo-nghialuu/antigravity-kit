# Quality Gate — Parallel Test + Review Loop

This is the critical checkpoint protecting codebase quality at Step 4 of `hapo:develop`.
Runs AUTOMATICALLY. Only escalates to user after 3 consecutive failures or a critical block.
Green tests are NOT enough. The gate requires three proofs:
1. Automated verification (typecheck/test/build)
2. Code/spec review
3. Task evidence (completion criteria + runtime/artifact proof from the task file)

## Automation Semantics

- If the task names exact commands in `Verification & Evidence`, those exact commands are mandatory and must run before any fallback repo defaults.
- Preflight compile/typecheck/build health is mandatory. If compile/typecheck/build fails before tests are meaningful, the gate result is `PRECHECK_FAIL`, not `NO_TESTS`.
- `NO_TESTS` is never an automatic PASS.
- `NO_TESTS` is acceptable only when the task does **not** require a dedicated test suite command and every other required automated command/evidence item passes.
- If the task explicitly requires tests and the repo has no such test command or suite, the task is FAIL or BLOCKED, not done.
- Named frameworks, auth systems, transports, datastores, and runtime boundaries in the task/spec are contractual. Silent substitutions are review failures, not acceptable implementation trade-offs.
- Multi-process or multi-runtime flows must prove shared real state or a real boundary contract. Matching in-memory placeholders on both sides do not count as working integration.

## Parallel Quality Cycle

Maximum retry counter: **3 attempts**. Exceeding 3 triggers a collapse warning.

```text
Variable: retry_count = 0

Before START_LOOP:
  - Read the active task file(s)
  - Extract Related Files, Completion Criteria, Verification & Evidence
  - Extract the exact executable verification commands in declaration order
  - Extract relevant design contracts/invariants for the touched area
  - If any of these are missing or too vague to verify, FAIL immediately and route back to spec correction

START_LOOP:
  ---------------------------------------------------------------
  PARALLEL GATE: Spawn BOTH agents simultaneously
  ---------------------------------------------------------------
  → Task(subagent_type="test-runner",
        prompt="Run task-aware verification for the recently implemented code. Read the active task file(s) and execute the exact verification commands named there first, in order. Preflight compile/typecheck/build failures must be reported as PRECHECK_FAIL and take precedence over NO_TESTS. After that, run any additional repo-level typecheck/test/build checks needed for confidence. Inspect named artifacts/runtime outputs. For multi-service tasks, verify the flow does not rely on process-local stand-ins masquerading as shared state. Return PASS only if automated checks and task evidence both pass. Mark anything unexecuted as UNVERIFIED. Treat NO_TESTS as non-passing unless the task did not require a dedicated test suite.",
        description="Test [feature]")

  → Task(subagent_type="code-auditor",
        prompt="Review all recently written code against the active task file(s), referenced requirements, and design contracts. Missing deliverables, placeholder-only wiring, missing runtime entrypoints, overscope edits outside the task packet, silent replacement of named technologies/contracts, or fake cross-service proof via process-local state are Critical even if build/tests pass. Check security, logic, architecture, YAGNI/KISS/DRY. Return score (X/10), critical count, warning list, and evidence gaps.",
        description="Review [feature]")

  Wait for BOTH to return results.

  ---------------------------------------------------------------
  COMBINE RESULTS
  ---------------------------------------------------------------

  CASE 1 — PRECHECK_FAIL OR Automated FAIL OR required command missing OR Evidence FAIL / UNVERIFIED OR NO_TESTS when tests were required:
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! AskUserQuestion: "Quality gate cannot prove this task is complete! User intervention required!"
    - If retry_count < 3:
        → Return to Step 3 (god-developer). Fix the failing checks or missing evidence first.
        → GOTO START_LOOP (re-run BOTH test + review)

  CASE 2 — Test PASS + Evidence PASS + Review FAIL (Score < 9.5 OR Critical > 0):
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! AskUserQuestion: "Code does not meet minimum standards! User intervention required!"
    - If retry_count < 3:
        → Fix each review issue from warning log.
        → GOTO REVIEW_ONLY (skip re-test only if the fixes cannot affect automated evidence; otherwise rerun full loop)

  CASE 3 — Test PASS + Evidence PASS + Review PASS (Score >= 9.5 AND Critical = 0):
    → PASS! Auto-approved.
    → PROCEED to completion report with a verification receipt summarizing exact commands executed, artifact/runtime proof, and review result.

REVIEW_ONLY:
  ---------------------------------------------------------------
  Re-run ONLY code-auditor (tests already passed and no new evidence-producing code changed)
  ---------------------------------------------------------------
  → Task(subagent_type="code-auditor", ...)

  IF Score >= 9.5 AND Critical = 0 → PASS!
  IF Score < 9.5 OR Critical > 0:
    - retry_count++
    - If retry_count >= 3 → COLLAPSE
    - Else → fix issues, GOTO REVIEW_ONLY
```

## Critical Issue Definitions
- **Security:** XSS vulnerabilities, SQL injection, leaked env tokens/secrets.
- **Performance:** Bottlenecks, O(n³) algorithms, unbounded loops over DB calls.
- **Architecture:** Breaking MVC boundaries, cross-module coupling, convention violations.
- **Principles:** YAGNI violations, KISS violations, DRY violations (excessive code duplication).
- **Evidence / Done-Criteria Drift:** Missing required artifacts, placeholder-only wiring, missing entrypoints, unproven completion criteria, or runtime contract mismatches.
- **Overscope Delivery Drift:** Implementing later-task deliverables or editing out-of-scope files without direct justification for the active task.
- **Contract Substitution Drift:** Replacing a named framework/auth/transport/datastore/runtime boundary with a custom simplification without a spec amendment.
- **Cross-Service Reality Failure:** Claiming end-to-end behavior across web/api/worker/extension boundaries while state only exists in local process memory or placeholder adapters.

## Terminal Log Format

Must log the Quality Gate result to the terminal for user visibility:

- **Quick Pass:** `✓ Step 4 Quality Gate: Test PASS + Evidence PASS + Review 9.5/10 - Auto-Approved`
- **Hard-Won Pass:** `✓ Step 4 Quality Gate: Failed 2 rounds → Test PASS + Evidence PASS + Review 9.6/10`
- **Preflight Fail:** `[x] Step 4 Quality Gate: PRECHECK_FAIL → compile/typecheck/build failed before tests mattered`
- **Fix Needed:** `[~] Step 4 Quality Gate: Tests/evidence failed → returned to god-developer`
- **Awaiting Rescue:** `[!] Step 4 Quality Gate: Failed 3 rounds! Awaiting user intervention...`
