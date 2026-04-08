# Quality Gate — Auto-Fix Review Loop

This is the critical checkpoint protecting codebase quality at Step 4 of `hapo:develop`. The entire process runs AUTOMATICALLY without bothering the user unless deadlocked.

## Auto-Quality Cycle

This cycle has a maximum retry counter of **3 attempts** (Max Retries = 3). Exceeding 3 attempts triggers a collapse warning and escalates to the user.

```text
Variable: retry_count = 0

START_LOOP:
  -------------------------------------------------------------
  Phase 1: CODE REVIEW (Invoke code-reviewer agent)
  -------------------------------------------------------------
  Code-reviewer agent must return:
  [Score / 10], [Critical issue count], [Warning list]

  IF Critical > 0 OR Score < 9.5:
    - Increment retry_count++
    - If retry_count >= 3:
        → COLLAPSE! Call `AskUserQuestion`: "Code does not meet minimum standards! User intervention required!"
    - If retry_count < 3:
        → Read the reviewer's warning log and fix each issue one by one.
        → After fixing: GOTO START_LOOP

  IF Fully Satisfied (Score >= 9.5 & Critical = 0):
    - PASS! Auto-approved.
    - PROCEED to completion report.
```

## Critical Issue Definitions
- **Security:** XSS vulnerabilities, SQL injection, leaked env tokens/secrets.
- **Performance:** Bottlenecks, O(n³) algorithms, unbounded loops over DB calls.
- **Architecture:** Breaking MVC boundaries, cross-module coupling, convention violations.
- **Principles:** YAGNI violations, KISS violations, DRY violations (excessive code duplication).

## Terminal Log Format
Must log the Quality Gate result to the terminal for user visibility:

- **Quick Pass:** `✓ Step 4 Quality Gate: Review 9.5/10 - Auto-Approved`
- **Hard-Won Pass:** `✓ Step 4 Quality Gate: Failed 2 rounds → Finally scored 9.6/10`
- **Awaiting Rescue:** `[!] Step 4 Quality Gate: Failed 3 rounds! Awaiting user intervention...`
