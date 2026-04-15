# Quality Gate — Parallel Test + Review Loop

This is the critical checkpoint protecting codebase quality at Step 4 of `hapo:develop`.
Runs AUTOMATICALLY. Only escalates to user after 3 consecutive failures or a critical block.
Green tests are NOT enough. The gate requires three proofs:
1. Automated verification (typecheck/test/build)
2. Code/spec review
3. Task evidence (completion criteria + runtime/artifact proof from the task file)

## Parallel Quality Cycle

Maximum retry counter: **3 attempts**. Exceeding 3 triggers a collapse warning.

```text
Variable: retry_count = 0

Before START_LOOP:
  - Read the active task file(s)
  - Extract Related Files, Completion Criteria, Verification & Evidence
  - Extract relevant design contracts/invariants for the touched area
  - If any of these are missing or too vague to verify, FAIL immediately and route back to spec correction

START_LOOP:
  ---------------------------------------------------------------
  PARALLEL GATE: Spawn BOTH agents simultaneously
  ---------------------------------------------------------------
  → Task(subagent_type="test-runner",
        prompt="Run task-aware verification for the recently implemented code. Read the active task file(s) and execute: pre-flight typecheck/lint, relevant tests, build commands, and every Verification & Evidence item that is executable. Inspect named artifacts/runtime outputs. Return PASS only if automated checks and task evidence both pass. Mark anything unexecuted as UNVERIFIED.",
        description="Test [feature]")

  → Task(subagent_type="code-auditor",
        prompt="Review all recently written code against the active task file(s), referenced requirements, and design contracts. Missing deliverables, placeholder-only wiring, missing runtime entrypoints, or contract drift are Critical even if build/tests pass. Check security, logic, architecture, YAGNI/KISS/DRY. Return score (X/10), critical count, warning list, and evidence gaps.",
        description="Review [feature]")

  Wait for BOTH to return results.

  ---------------------------------------------------------------
  COMBINE RESULTS
  ---------------------------------------------------------------

  CASE 1 — Test FAIL OR Evidence FAIL / UNVERIFIED:
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
    → PROCEED to completion report.

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

## Terminal Log Format

Must log the Quality Gate result to the terminal for user visibility:

- **Quick Pass:** `✓ Step 4 Quality Gate: Test PASS + Evidence PASS + Review 9.5/10 - Auto-Approved`
- **Hard-Won Pass:** `✓ Step 4 Quality Gate: Failed 2 rounds → Test PASS + Evidence PASS + Review 9.6/10`
- **Fix Needed:** `[~] Step 4 Quality Gate: Tests/evidence failed → returned to god-developer`
- **Awaiting Rescue:** `[!] Step 4 Quality Gate: Failed 3 rounds! Awaiting user intervention...`
