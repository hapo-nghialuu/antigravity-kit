---
name: hapo:spec-init
description: Initialize a new specification from a feature description. Use in Claude Code when starting spec-driven work.
version: 1.0.0
argument-hint: <feature-description>
---

# Hapo Spec Init

Create the initial `.specs/<feature>/` structure from a concrete feature description.

## Usage

```bash
/hapo:spec-init <feature-description>
```

## When to Use

Use this when starting a new feature that should go through requirements, design, tasks, code, test, and review.

Do not use this for tiny fixes, vague requests, or work that already has a spec folder.

## Execute

1. Treat `$ARGUMENTS` as the feature description only.
2. If the description is vague, too short, or missing concrete nouns, stop and ask the user 1-2 focused clarification questions.
3. Check `.specs/` for slug conflicts with `Glob`.
4. Read these installed templates first:
   - `.claude/skills/specs/templates/init.json`
   - `.claude/skills/specs/templates/requirements-init.md`
5. Generate a kebab-case feature name from the description.
6. If the slug already exists, append a numeric suffix.
7. Create `.specs/<feature-name>/spec.json` and `.specs/<feature-name>/requirements.md`.
8. Initialize `scope_lock` in `spec.json` with:
   - `source`
   - `in_scope`
   - `out_of_scope`
   - `expansion_policy: requires-user-approval`
9. Do not generate requirements, design, or tasks in this step.

## Output

Return:
- generated feature name
- short project summary
- created file paths
- next command: `/hapo:spec-requirements <feature-name>`

## Rules

- Keep phase separation strict.
- Only initialize files in this step.
- Prefer the shared `specs` templates over ad-hoc structure.
- If templates are missing, stop and report the exact missing path.

## Related

- Command: `/spec-init`
- Next skill: `/hapo:spec-requirements <feature-name>`
- Shared resources: `.claude/skills/specs/templates/`
