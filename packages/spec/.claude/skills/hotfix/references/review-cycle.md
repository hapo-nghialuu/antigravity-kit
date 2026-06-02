# Review Cycle

How to handle code review results after a fix is implemented. Ensures quality without unnecessary friction.

## Default Review Handling

The agent reviews its own fix using `hapo:code-review` and decides automatically:

```
attempt = 0
LOOP:
  1. Trigger hapo:code-review → receives: score, critical_issues[], warnings[]

  2. Evaluate:
     IF score >= 9.0 AND len(critical_issues) == 0:
       → ACCEPT. Log: "✓ Review [score]/10 — auto-approved"
       → Proceed to Step 6 (Finalize)

     ELSE IF len(critical_issues) > 0 AND attempt < 3:
       → AUTO-REMEDIATE critical issues only
       → Re-run verification (typecheck + lint + test)
       → attempt += 1
       → GOTO LOOP

     ELSE IF attempt >= 3:
       → HALT. Present findings to user:
         "3 auto-fix cycles exhausted. [N] critical issues remain."
         Options: "Fix manually" | "Approve with known issues" | "Abort"

     ELSE (score < 9.0, zero critical):
       → ACCEPT with advisory. Log: "✓ Review [score]/10 — approved, [N] warnings noted"
       → Proceed to Step 6
```

## Required User Pause

When the fix touches production-critical code, changes public contracts, introduces a behavior change, or the user explicitly requests review control:

1. Run `hapo:code-review` → collect score + findings
2. Present a structured summary to user:
   ```
   ┌──────────────────────────────────┐
   │ Review Score: [X]/10             │
   ├──────────────────────────────────┤
   │ Critical: [list or "none"]      │
   │ Warnings: [list or "none"]      │
   │ Suggestions: [list or "none"]   │
   └──────────────────────────────────┘
   ```
3. Ask user for direction:
   - If critical issues exist → "Fix critical" | "Fix all" | "Approve anyway" | "Abort"
   - If no critical issues → "Approve" | "Address warnings" | "Abort"
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

Regardless of score, always flag and pause for these:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication/authorization bypasses
- Unbounded resource consumption (∞ loops, uncontrolled allocations)
- Data loss or corruption paths
- Breaking changes to public API contracts without migration path
