---
name: code
description: Implement approved work from specification tasks and then hand off to test and review.
allowed-tools: Read, Glob, Grep, Edit, Write, Bash
argument-hint: <feature-name>
---

# /code - Implement from spec tasks

Use this command after /spec-tasks.

1. Read `.specs/$ARGUMENTS/tasks.md` and identify the next pending task.
2. Implement only that task following project standards.
3. Run `/test`.
4. Run `/review`.

Preferred flow: /spec-init -> /spec-requirements -> /spec-design -> /spec-tasks -> /code -> /test -> /review
