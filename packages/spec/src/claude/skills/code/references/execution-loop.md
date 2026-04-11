# Execution Loop

## Goal

Implement one approved task at a time and immediately validate it.

## Loop

1. Read the next pending task in `tasks.md`.
2. Read the matching context in `design.md` and `requirements.md`.
3. Implement only that task.
4. Run `/hapo:test`.
5. Run `/hapo:review`.
6. Move to the next task only after the current pass is clear.

## Guardrails

- Keep scope tight.
- Prefer existing project patterns.
- Do not batch multiple major tasks into one pass.
- Stop and report blockers instead of guessing.
