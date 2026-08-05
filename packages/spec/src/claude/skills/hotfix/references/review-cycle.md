# Review Cycle

How to handle code review results after a fix is implemented. Ensures quality without unnecessary friction.

## Default Review Handling

The agent reviews its own fix using `hapo:code-review` and decides automatically:

```
attempt = 0
LOOP:
  1. Trigger hapo:code-review → receives: verdict and severity-classified findings

  2. Evaluate:
     IF verdict == PASS (no Critical, no High, at most one Medium):
       → ACCEPT. Log: "✓ Review PASS — auto-approved"
       → Proceed to Step 6 (Finalize)

     ELSE IF any Critical or High finding AND attempt < 3:
       → AUTO-REMEDIATE the blocking findings
       → Re-run verification (typecheck + lint + test)
       → attempt += 1
       → GOTO LOOP

     ELSE IF attempt >= 3:
       → HALT. Present findings to user:
         "3 auto-fix cycles exhausted. [N] blocking findings remain."
         Options: "Fix manually" | "Approve with known issues" | "Abort"

     ELSE (two or more Medium findings):
       → AUTO-REMEDIATE the Medium findings
       → Re-run verification (typecheck + lint + test)
       → attempt += 1
       → GOTO LOOP
```

## Required User Pause

When the fix touches production-critical code, changes public contracts, introduces a behavior change, or the user explicitly requests review control:

1. Run `hapo:code-review` → collect verdict + severity findings
2. Present a structured summary to user:
   ```
   ┌──────────────────────────────────┐
   │ Review Verdict: [PASS|FAIL]      │
   ├──────────────────────────────────┤
   │ Critical: [list or "none"]       │
   │ High: [list or "none"]           │
   │ Medium: [list or "none"]         │
   │ Low: [list or "none"]            │
   └──────────────────────────────────┘
   ```
3. Ask user for direction:
   - If Critical or High findings exist → "Fix blocking findings" | "Fix all" | "Approve anyway" | "Abort"
   - If only Medium/Low findings exist → "Approve" | "Address findings" | "Abort"
4. Execute user's choice. Max 3 remediation cycles.

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
