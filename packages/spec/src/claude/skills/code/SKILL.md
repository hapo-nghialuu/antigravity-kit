---
name: hapo:code
description: Implement the next approved spec task and then hand off to hapo:test and hapo:review.
version: 1.0.0
argument-hint: <feature-name>
---

# Code

Implement the next pending task from an approved spec instead of coding from memory.

## Usage

```bash
/hapo:code <feature-name>
```

## Load First

- `references/execution-loop.md`
- `.specs/$ARGUMENTS/tasks.md`
- `.specs/$ARGUMENTS/design.md`
- `.specs/$ARGUMENTS/requirements.md`

## Execute

1. Read `.specs/$ARGUMENTS/tasks.md` and identify the next pending task.
2. Read the related context from `design.md` and `requirements.md`.
3. Implement only that task. Keep scope tight.
4. Follow the project standards already present in the repo.
5. Update task status in the spec artifact if the workflow supports it.
6. Hand off immediately to:
   - `/hapo:test`
   - `/hapo:review`

## Output

Return:
- implemented task name
- touched files
- blockers or follow-up items
- explicit handoff to `/hapo:test` and `/hapo:review`

## Rules

- Do not implement multiple major tasks in one pass.
- Stop if `tasks.md` is missing.
- Prefer existing patterns over new abstractions.
- Keep the work aligned to the spec.

## Related

- Command: `/code`
- Previous skill: `/hapo:spec-tasks`
- Next skills: `/hapo:test`, `/hapo:review`
