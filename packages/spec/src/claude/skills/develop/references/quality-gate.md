# Quality Gate — Parallel Test + Review Loop

This is the critical checkpoint protecting codebase quality at Step 4 of `hapo:develop`.
Runs AUTOMATICALLY. Only escalates to user after 3 consecutive failures or a critical block.

## Parallel Quality Cycle

Maximum retry counter: **3 attempts**. Exceeding 3 triggers a collapse warning.

```text
Variable: retry_count = 0

START_LOOP:
  ---------------------------------------------------------------
  PARALLEL GATE: Spawn BOTH agents simultaneously
  ---------------------------------------------------------------
  → Task(subagent_type="test-runner",
        prompt="Run tests for recently implemented code. Blast-radius mode.",
        description="Test [feature]")

  → Task(subagent_type="code-auditor",
        prompt="Review all recently written code. Check security, performance,
          YAGNI/KISS/DRY. Return score (X/10), critical count, warning list.",
        description="Review [feature]")

  Wait for BOTH to return results.

  ---------------------------------------------------------------
  COMBINE RESULTS
  ---------------------------------------------------------------

  CASE 1 — Test FAIL:
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! AskUserQuestion: "Tests critically failing! User intervention required!"
    - If retry_count < 3:
        → Return to Step 3 (god-developer). Fix the failing tests first.
        → GOTO START_LOOP (re-run BOTH test + review)

  CASE 2 — Test PASS + Review FAIL (Score < 9.5 OR Critical > 0):
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! AskUserQuestion: "Code does not meet minimum standards! User intervention required!"
    - If retry_count < 3:
        → Fix each review issue from warning log.
        → GOTO REVIEW_ONLY (skip re-test — tests already passed)

  CASE 3 — Test PASS + Review PASS (Score >= 9.5 AND Critical = 0):
    → PASS! Auto-approved.
    → PROCEED to completion report.

REVIEW_ONLY:
  ---------------------------------------------------------------
  Re-run ONLY code-auditor (tests already passed — no re-test)
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

## Terminal Log Format

Must log the Quality Gate result to the terminal for user visibility:

- **Quick Pass:** `✓ Step 4 Quality Gate: Test PASS + Review 9.5/10 - Auto-Approved`
- **Hard-Won Pass:** `✓ Step 4 Quality Gate: Failed 2 rounds → Test PASS + Review 9.6/10`
- **Test Fix Needed:** `[~] Step 4 Quality Gate: Tests failed → returned to god-developer`
- **Awaiting Rescue:** `[!] Step 4 Quality Gate: Failed 3 rounds! Awaiting user intervention...`
