# Requirements Workflow

## Goal

Generate requirement statements that stay inside the initialized scope and can be verified later.

## Sequence

1. Read `spec.json` first.
2. Read the current `requirements.md` seed content.
3. Load steering and `docs/` context when available.
4. Read shared rules from `.claude/skills/specs/rules/ears-format.md`.
5. Filter candidate requirement areas through `scope_lock`.
6. Write requirements in EARS format.
7. Update phase metadata.

## EARS reminder

- Event-driven: `When ... the system shall ...`
- State-driven: `While ... the system shall ...`
- Unwanted: `If ... the system shall ...`
- Optional: `Where ... the system shall ...`
- Ubiquitous: `The system shall ...`

## Scope rules

- Keep only what matches `scope_lock.in_scope`.
- Do not promote adjacent ideas automatically.
- Put unapproved expansions into deferred or out-of-scope notes.

## Output checklist

- Numeric requirement headings
- Testable acceptance criteria
- No implementation details
- Next step points to design
