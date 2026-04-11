# Tollgate Protocol (State Sync)

## Single Source of Truth

In any Spec-driven workflow (`hapo:specs`), the state of the project is physically persisted in **two layers**:
1. **Machine Layer (`spec.json`)**: Tracks phase, status, and overall completion.
2. **Human Layer (`tasks/task-0*.md`)**: Checkboxes indicating granular execution progress.

## The Sync-back Rule (Mandatory)

Whenever an agent finishes a task or blocks due to an issue, it **MUST NOT** simply respond with "Done" or "Blocked" in chat. 
Before returning control to the user or orchestrator, the agent **MUST**:

### On Success:
1. Update `spec.json`: Modify `current_phase` if moving forward, and ensure `status` accurately reflects progress.
2. Edit `task-XX.md`: Change `Trạng thái: pending` to `Trạng thái: completed` and check `[x]` the sub-task boxes.
3. Call `TaskUpdate` if Claude Tasks are active, setting the status to "completed" to unblock downstream agents.

### On Block/Failure (>3 retries):
1. Update `spec.json`: Set `"status": "blocked"` and fill out the `"blocker"` string with the root cause.
2. Edit `task-XX.md`: Change `Trạng thái: pending` (or `in_progress`) to `Trạng thái: blocked` with a note.
3. Alert the orchestrator or user via `AskUserQuestion` or explicit warning.

**Golden Rule:** If the current phase changes, or a task completes, the agent must update the physical files. The context is intentionally NOT persisted in the chat to save tokens. An injected Hook (`spec-state.cjs`) constantly enforces and validates this state.
