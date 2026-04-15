# Tollgate Protocol (State Sync)

## Single Source of Truth

In any Spec-driven workflow (`hapo:specs`), the state of the project is physically persisted in **two layers**:
1. **Machine Layer (`spec.json`)**: Tracks phase, status, and overall completion.
2. **Human Layer (`tasks/task-*.md`)**: Checkboxes indicating granular execution progress.

## The Sync-back Rule (Mandatory)

Whenever an agent finishes a task or blocks due to an issue, it **MUST NOT** simply respond with "Done" or "Blocked" in chat. 
Before returning control to the user or orchestrator, the agent **MUST**:

### On Success:
1. Update `spec.json`: Modify `current_phase` if moving forward, ensure `status` accurately reflects progress, and keep `task_files` synchronized with the real files on disk.
2. Edit `task-XX.md`: Change `Status` only after real verification has passed (build/test/runtime/artifact). Then check `[x]` the sub-task boxes and relevant completion criteria.
3. Call `TaskUpdate` if Claude Tasks are active, setting the status to "completed" only after the physical files were updated.

### On Block/Failure (>3 retries):
1. Update `spec.json`: Set `"status": "blocked"` and fill out the `"blocker"` string with the root cause.
2. Edit `task-XX.md`: Change `Trạng thái: pending` (or `in_progress`) to `Trạng thái: blocked` with a note.
3. Alert the orchestrator or user via `AskUserQuestion` or explicit warning.

**Canonical state values:** New specs MUST use `status: "in_progress"` for active work. Legacy `in-progress` may be read for compatibility, but must not be emitted in new files.

**Golden Rule:** If the current phase changes, or a task completes, the agent must update the physical files. Never mark a task completed before there is execution proof. The context is intentionally NOT persisted in the chat to save tokens. An injected Hook (`spec-state.cjs`) constantly enforces and validates this state.
