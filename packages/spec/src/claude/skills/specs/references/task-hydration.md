# Task Hydration

## Purpose

Convert task files (persistent storage) into Claude Tasks (session-scoped only), enabling real-time progress tracking and automatic unblocking when predecessor tasks complete. `spec.json.task_registry` is the machine-state bridge between markdown task files and session-scoped Claude Tasks.

## When to Run

- **Default:** Auto-run after task files are created
- **Skip if:** Fewer than 3 task files (overhead not worth it)
- **User opt-out:** When user explicitly says no task tracking

## Hydrate ↔ Sync-back Diagram

```
┌──────────────────┐  Hydrate   ┌───────────────────┐
│ Task Files       │ ─────────► │ Claude Tasks      │
│ (persistent)     │            │ (session-scoped)  │
│ [ ] Task 01      │            │ ◼ pending         │
│ [ ] Task 02      │            │ ◼ pending         │
└──────────────────┘            └───────────────────┘
                                        │ Work
                                        ▼
┌──────────────────┐  Sync-back ┌───────────────────┐
│ Task Files       │ ◄───────── │ Task Updates      │
│ (updated)        │            │ (completed)       │
│ [x] Task 01      │            │ ✓ completed       │
│ [ ] Task 02      │            │ ◼ in_progress     │
└──────────────────┘            └───────────────────┘
```

- **Hydrate:** Read task files → `TaskCreate` for each unchecked `[ ]` item
- **Work:** `TaskUpdate` tracks in_progress/completed in real-time
- **Sync-back:** Update `[ ]` → `[x]` in task files, update `spec.json` progress

## Required Metadata for Task Creation

| Field | Description | Example |
|---|---|---|
| `taskNumber` | Task sequence number | `R0-02` |
| `priority` | Priority level | `P1`, `P2`, `P3` |
| `effort` | Time estimate | `2h` |
| `specDir` | Spec directory path | `specs/mobile-app/` |
| `taskFile` | Task file name | `task-R0-02-extension-shell.md` |

## Hydration Workflow

1. Read all `tasks/task-R*.md` files → filter incomplete tasks
2. Load `spec.json.task_registry` and prefer its task status/dependencies when present
3. Create `TaskCreate` for each major task, attach `addBlockedBy` per dependency chain:
   ```
   Task R0-01 (no blockers) ← start here
   Task R0-02 (addBlockedBy: [task-R0-01-id])
   Task R1-01 (addBlockedBy: [task-R0-02-id])
   ```
4. Create additional `TaskCreate` for high-risk steps within tasks (if any)
5. Verify: no dependency cycles, all tasks have complete metadata, and every hydrated task has a corresponding `task_registry` entry

## Fallback

`TaskCreate`/`TaskUpdate`/`TaskGet`/`TaskList` tools are CLI-only. If running in VSCode extension:
- Use `TodoWrite` as a tracking substitute
- Task files remain the single source of truth
- Hydration is an optimization convenience, NOT a requirement

## Cook Handoff Protocol

### Same session (spec → code immediately)
1. Spec creates tasks + hydrates → tasks exist in session
2. Code reads `TaskList` → finds existing tasks → picks them up
3. Skips re-creation, begins implementing directly

### New session (resume)
1. User runs `/hapo:develop <feature>` in a new session
2. Code reads `TaskList` → empty (tasks died with old session)
3. Code reads task files → re-hydrates from `[ ]` items
4. `[x]` items = done, skip those

### Sync-back (after code completes)
1. `TaskUpdate` marks tasks as completed
2. Update `[ ]` → `[x]` in task files
3. Update `spec.json.task_registry[path].status`, timestamps, blocker, and last_updated_at
4. Update `spec.json` progress for the corresponding phase
5. Git commit captures the state transition

## Quality Checks

After hydration, verify:
- [ ] Dependency chain has no cycles
- [ ] All task files have corresponding Tasks
- [ ] Required metadata fields are complete
- [ ] Task count matches `[ ]` items in files
- Output: `✓ Hydrated [N] tasks with dependency chain`
