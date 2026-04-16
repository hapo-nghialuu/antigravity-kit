# Tollgate Protocol (State Sync)

## Single Source of Truth

In any Spec-driven workflow (`hapo:specs`), the state of the project is physically persisted in **two layers**:
1. **Machine Layer (`spec.json`)**: Tracks phase, status, overall completion, and per-task machine state via `task_registry`.
2. **Human Layer (`tasks/task-*.md`)**: Checkboxes indicating granular execution progress.

## The Sync-back Rule (Mandatory)

Whenever an agent finishes a task or blocks due to an issue, it **MUST NOT** simply respond with "Done" or "Blocked" in chat. 
Before returning control to the user or orchestrator, the agent **MUST**:

### On Success:
1. Update `spec.json`: Modify `current_phase` if moving forward, ensure `status` accurately reflects progress, keep `task_files` synchronized with the real files on disk, and update the corresponding `task_registry` entry (`status`, `blocker`, `started_at`, `completed_at`, `last_updated_at`).
2. Edit `task-R*.md`: Change `Status` only after real verification has passed (build/test/runtime/artifact). Then check `[x]` the sub-task boxes and relevant completion criteria.
3. Call `TaskUpdate` if Claude Tasks are active, setting the status to "completed" only after the physical files were updated.

### On Block/Failure (>3 retries):
1. Update `spec.json`: Set `"status": "blocked"` and fill out the `"blocker"` string with the root cause.
2. Update the corresponding `task_registry` entry to `blocked`, persist the blocker reason, and stamp `last_updated_at`.
3. Edit `task-R*.md`: Change `Status: pending` (or `in_progress`) to `Status: blocked` with a note.
4. Alert the orchestrator or user via `AskUserQuestion` or explicit warning.

**Canonical state values:** New specs MUST use `status: "in_progress"` for active work. Legacy `in-progress` may be read for compatibility, but must not be emitted in new files.

**Golden Rule:** If the current phase changes, or a task completes, the agent must update the physical files. Never mark a task completed before there is execution proof, and never let `task_registry` disagree with the matching markdown task file. The context is intentionally NOT persisted in the chat to save tokens. An injected Hook (`spec-state.cjs`) constantly enforces and validates this state.
