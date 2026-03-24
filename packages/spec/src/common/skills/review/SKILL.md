---
name: hapo:review
description: Review recent changes for correctness, security, regressions, and maintainability after hapo:code.
version: 1.0.0
argument-hint: [scope]
---

# Hapo Review

Review recent code changes with the spec context in mind.

## Usage

```bash
/hapo:review
/hapo:review <scope>
```

## Load First

- `references/review-focus.md`
- recent diff or changed files
- relevant spec context when the changes came from `.specs/`

## Execute

1. Review recent changes or the requested scope.
2. Prioritize:
   - correctness
   - security
   - regressions
   - maintainability
3. Use the spec context when changes were produced from a spec workflow.
4. Output findings by severity with concrete fixes.
5. If there are no findings, say so clearly.

## Rules

- Prefer concrete, actionable findings over vague style notes.
- Focus on code that changed.
- Call out missing tests when the change risk is non-trivial.

## Related

- Command: `/review`
- Previous skills: `/hapo:code`, `/hapo:test`
