# Review Cycle

How to handle code review results after a fix is implemented. Ensures quality without unnecessary friction.

## Default Review Handling

The agent reviews its own fix using `hapo:code-review` and applies the verdict. Every review returns exactly one verdict from the shared surface: `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`. The definition of `PASS` defers to `hapo:code-review`; hotfix never redefines it with local severity thresholds.

```
attempt = 0
LOOP:
  1. Trigger hapo:code-review → receives: verdict and severity-classified findings

  2. Evaluate:
     IF verdict == PASS:
       → ACCEPT. Log: "✓ Review PASS"
       → Proceed to Step 6 (Finalize)

     ELSE IF verdict == BLOCKED:
       → TERMINAL STOP. Do not blind-retry.
       → Present the blocker and required execution proof, permission, environment,
         or user-owned decision to the user.

     ELSE IF (verdict == FAIL OR verdict == PASS_WITH_WARNINGS) AND attempt < 3:
       → REMEDIATE the reported findings (or pause for the user when the
         Required User Pause conditions below apply)
       → Re-run verification (typecheck + lint + test)
       → attempt += 1
       → GOTO LOOP

     ELSE IF attempt >= 3:
       → HALT. Present findings to user:
         "3 auto-fix cycles exhausted. [N] findings remain."
         Options: "Fix manually" | "Approve with known issues" | "Abort"
```

`BLOCKED` is terminal for this review cycle. Only `FAIL` and `PASS_WITH_WARNINGS` enter remediation retry; `PASS_WITH_WARNINGS` never auto-accepts, and a blocked review is never retried unchanged.

## Required User Pause

When the fix touches production-critical code, changes public contracts, introduces a behavior change, or the user explicitly requests review control:

1. Run `hapo:code-review` → collect verdict + severity findings
2. Present a structured summary to user:
   ```
   ┌──────────────────────────────────┐
   │ Review Verdict: [verdict]        │
   ├──────────────────────────────────┤
   │ Critical: [list or "none"]       │
   │ High: [list or "none"]           │
   │ Medium: [list or "none"]         │
   │ Low: [list or "none"]            │
   └──────────────────────────────────┘
   ```
3. Ask user for direction:
   - If verdict is `BLOCKED` → resolve the blocker; do not retry this review cycle unchanged.
   - If verdict is `FAIL` with Critical or High findings → "Fix blocking findings" | "Fix all" | "Approve anyway" | "Abort"
   - If verdict is `FAIL` or `PASS_WITH_WARNINGS` with only Medium/Low findings → "Approve" | "Address findings" | "Abort"
4. Execute user's choice. Max 3 remediation cycles for `FAIL` and `PASS_WITH_WARNINGS`; `BLOCKED` never enters this retry limit.

## When To Pause vs Continue

| Situation | Mode |
|-----------|------|
| Type errors, lint, syntax fixes | Continue after passing verification |
| Single-file logic bugs | Continue after passing verification |
| Multi-file changes touching auth/payments/data | Pause recommended |
| Architecture-impacting changes | Pause required |
| User said "review with me" or similar | Pause required |

## Blocking Issues (Never Auto-Approve)

Regardless of verdict, always flag and pause for these:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication/authorization bypasses
- Unbounded resource consumption (∞ loops, uncontrolled allocations)
- Data loss or corruption paths
- Breaking changes to public API contracts without migration path
