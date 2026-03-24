---
name: hapo:test
description: Run project tests after hapo:code and report failures concisely.
version: 1.0.0
argument-hint: [scope]
---

# Hapo Test

Run the relevant test command for the current project and summarize the result.

## Usage

```bash
/hapo:test
/hapo:test <scope>
```

## Execute

1. Detect the project test command from the current repo.
2. Run the relevant tests for the recent changes or requested scope.
3. Report:
   - total passed and failed
   - failing test names
   - likely root cause
   - next fix action
4. If tests fail, do not hide failures. Point back to the failing area.

## Rules

- Prefer the smallest meaningful test scope first.
- Keep the report concise.
- Do not claim success when tests were not run.

## Related

- Command: `/test`
- Previous skill: `/hapo:code`
- Next skill: `/hapo:review`
