# Tollgate Protocol (State Sync)

## Sources Of Truth

Spec-driven work persists state in two synchronized layers:

1. `spec.json` tracks phase, overall status, and `task_registry`.
2. `tasks/task-*.md` tracks the human-readable checklist and verification receipt.

## Sync-back Rule

Before reporting a task completed or blocked:

### On success

1. Update `spec.json` only after verification. Keep `current_phase`,
   `task_files`, status, timestamps, and the matching `task_registry` entry accurate.
2. Update the matching task Markdown status, checkboxes, completion criteria,
   and `## Evidence` receipt from the current verification run.
3. Update native plan or task state when the active Codex session provides it,
   but never use chat-only state as a substitute for the files above.

### On block after repeated attempts

1. Set the spec and matching registry entry to `blocked`, with the root cause and timestamp.
2. Mark the task Markdown `blocked` and record the evidence.
3. Tell the user or orchestrator exactly what external input or state change is required.

New specs use `in_progress`; legacy `in-progress` may be read but not emitted.
Never let `task_registry` disagree with its task Markdown file.

## Completion Gate

The Stop hook checks newly completed tasks. Each requires:

- `Status: done`;
- a non-placeholder `## Evidence` section with a command block or PASS/FAIL result;
- a non-empty `task_registry[path].completed_at`.

The first run seeds completion history without blocking. Humans can disable the
gate with `"spec": { "completion_gate": false }` in `.codex/runtime.json`.
