---
name: hapo:spec-requirements
description: Generate EARS requirements with scope-lock checks. Use after hapo:spec-init in Claude Code.
version: 1.0.0
argument-hint: <feature-name>
---

# Hapo Spec Requirements

Generate complete, testable requirements from the initialized spec description.

## Usage

```bash
/hapo:spec-requirements <feature-name>
```

## Load First

- `references/requirements-workflow.md`
- `.claude/skills/specs/rules/ears-format.md`
- `.claude/skills/specs/templates/requirements.md`

## Execute

1. Read `.specs/$ARGUMENTS/spec.json` first.
2. Stop if the spec folder is missing and tell the user to run `/hapo:spec-init` first.
3. Stop if requirements are already past this phase unless the user clearly wants regeneration.
4. Read:
   - `.specs/$ARGUMENTS/spec.json`
   - `.specs/$ARGUMENTS/requirements.md`
   - `.specs/steering/` when present
   - project docs under `docs/` when present
5. Respect `scope_lock` strictly. Keep new requirements inside `in_scope`. Move nearby but unapproved ideas to deferred or out-of-scope notes.
6. Analyze the existing codebase when this is an enhancement, not a greenfield feature.
7. Generate requirements in EARS format only. Focus on what the system shall do, not how to build it.
8. Normalize requirement headings to numeric IDs if needed.
9. Update `spec.json` phase and timestamps after writing the document.

## Output

Return:
- 3-5 bullet summary of requirement areas
- deferred or out-of-scope topics
- confirmation that `requirements.md` and `spec.json` were updated
- next command: `/hapo:spec-design $ARGUMENTS`

## Rules

- Use EARS syntax for acceptance criteria.
- Keep requirements testable and verifiable.
- Ask at most 1-2 focused clarification questions when scope is ambiguous.
- If templates or rules are missing, report the exact missing file.

## Related

- Command: `/spec-requirements`
- Previous skill: `/hapo:spec-init`
- Next skill: `/hapo:spec-design $ARGUMENTS`
