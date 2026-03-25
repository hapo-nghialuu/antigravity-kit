---
name: hapo:spec-tasks
description: Break approved design into executable tasks with requirement mapping. Use after hapo:spec-design in Claude Code.
version: 1.0.0
argument-hint: <feature-name>
---

# Hapo Spec Tasks

Turn approved requirements and design into a task list that can be implemented incrementally.

## Usage

```bash
/hapo:spec-tasks <feature-name>
```

## Load First

- `references/task-sizing.md`
- `.claude/skills/specs/rules/tasks-generation.md`
- `.claude/skills/specs/templates/tasks.md`

## Execute

1. Read `.specs/$ARGUMENTS/spec.json` first.
2. Stop if `requirements.md` or `design.md` is missing.
3. Read:
   - `.specs/$ARGUMENTS/spec.json`
   - `.specs/$ARGUMENTS/requirements.md`
   - `.specs/$ARGUMENTS/design.md`
   - `.specs/$ARGUMENTS/tasks.md` when it exists
   - `.specs/$ARGUMENTS/research.md` when it exists
4. Respect `scope_lock` and use only valid in-scope numeric requirement IDs.
5. Generate tasks that are small, ordered, and incremental.
6. Keep a maximum of two levels: major tasks and sub-tasks.
7. Remove or defer tasks that only map to out-of-scope work.
8. Write `.specs/$ARGUMENTS/tasks.md`.
9. Update `spec.json` phase and task generation metadata.

## Output

Return:
- task generation status and file path
- total major tasks and sub-tasks
- confirmation that all in-scope requirements are covered
- next command: `/hapo:code $ARGUMENTS`

## Rules

- Every task must map to at least one valid numeric requirement ID.
- Keep sub-tasks sized for short implementation passes.
- Do not introduce new scope during task generation.
- If requirement IDs are invalid or missing, stop and report it.

## Related

- Command: `/spec-tasks`
- Previous skill: `/hapo:spec-design`
- Next skill: `/hapo:code $ARGUMENTS`
