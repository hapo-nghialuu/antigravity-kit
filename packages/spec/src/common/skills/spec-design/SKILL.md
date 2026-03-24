---
name: hapo:spec-design
description: Create technical design from approved requirements. Use after hapo:spec-requirements in Claude Code.
version: 1.0.0
argument-hint: <feature-name> [-y]
---

# Hapo Spec Design

Translate approved requirements into architecture, interfaces, research notes, and design decisions.

## Usage

```bash
/hapo:spec-design <feature-name>
```

## Load First

- `references/design-discovery.md`
- `.claude/skills/specs/templates/design.md`
- `.claude/skills/specs/templates/research.md`
- `.claude/skills/specs/rules/design-principles.md`

## Execute

1. Read `.specs/$ARGUMENTS/spec.json` first.
2. Stop if requirements are missing or not ready.
3. Read:
   - `.specs/$ARGUMENTS/spec.json`
   - `.specs/$ARGUMENTS/requirements.md`
   - `.specs/$ARGUMENTS/design.md` when it already exists
   - `.specs/$ARGUMENTS/research.md` when it exists
   - `.specs/steering/` and `docs/` context when present
4. Respect `scope_lock`. Design only for in-scope requirement IDs.
5. Choose a discovery mode:
   - minimal for small CRUD or UI-only changes
   - light for extensions of existing systems
   - full only for explicit integration, security, schema, or performance reasons
6. Persist findings to `.specs/$ARGUMENTS/research.md` before finalizing the design.
7. Generate `.specs/$ARGUMENTS/design.md` using the shared template.
8. Add diagrams only when the design is genuinely multi-step or cross-boundary.
9. Update `spec.json` with phase, timestamps, discovery mode, and validation recommendation.

## Output

Return:
- design status and file path
- chosen discovery mode and reason
- 2-3 key findings that shaped the design
- any deferred or out-of-scope items
- next step: run `/spec-validate $ARGUMENTS` when validation is recommended, otherwise continue with `/hapo:spec-tasks $ARGUMENTS`

## Rules

- Keep design focused on architecture and interfaces, not implementation code.
- Prefer light discovery unless a concrete trigger requires full discovery.
- Stop if requirements use invalid numeric IDs.
- If templates are missing, report the exact missing file.

## Related

- Command: `/spec-design`
- Previous skill: `/hapo:spec-requirements`
- Validation bridge: `/spec-validate $ARGUMENTS`
- Next skill: `/hapo:spec-tasks $ARGUMENTS`
