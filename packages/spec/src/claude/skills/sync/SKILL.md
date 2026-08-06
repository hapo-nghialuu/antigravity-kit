---
name: hapo:sync
description: "Dumb-proof status tracker and file synchronizer. Updates spec.json, task_registry, and tasks/*.md without breaking structural schemas. Includes Auto-Audit."
user-invocable: true
when_to_use: "Invoke to synchronize spec state, docs, or task tracking after changes."
category: utilities
keywords: [sync, state, tracking, consistency]
argument-hint: "<feature_name> <task_id|task-file> <status> [blocker] | phase <feature_name> <next_phase> | audit <feature_name>"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Sync (State Tracking Protocol)

This skill safely bridges the gap between active development state and physical documentation files (`spec.json` + `task_registry` + `tasks/task-R*.md`). Instead of relying on risky raw AI edits, this skill executes precise contextual replacements.

## Lane-aware synchronization

Read lane policy before mutating state:

```bash
node .claude/scripts/workflow-policy.cjs --classify-lane --task-json '<task JSON>' --json
```

- Direct may have no spec/state/registry; sync only concrete targeted evidence and never invents approval state.
- Standard stores one bounded spec and one canonical feature receipt; one combined `code-auditor` review gates feature closeout.
- Critical requires strict durable evidence and `inspector → implementer → test-runner → code-auditor` delegation by default.
- `generated`, `agent_validated`, and `user_approved` are independent. Missing `user_approved` stays false; sync never auto-approves user-owned state.
- Explicit lane overrides must preserve automatic classification and warning in receipt/state output, especially Critical downgrades.

## Supported Commands
### 1. Task Synchronization
Update a specific task's status and automatically check its relevant sub-checkboxes.

**Usage:** `/hapo:sync <feature_name> <task_id|task-file> <status> ["optional blocker msg"]`
- Example 1: `/hapo:sync auth R0-02 done`
- Example 2: `/hapo:sync payment task-R1-03-chunks-api.md blocked "API Endpoint Down"`

### 2. Phase Advancement
Advance the entire project to the next logical phase.

**Usage:** `/hapo:sync phase <feature_name> <next_phase>`
- Example: `/hapo:sync phase shopping_cart test`

### 3. State Audit
Scans the `spec.json` against all physical `task-R*.md` files to detect mismatches between `task_files`, `task_registry`, and markdown task headers, then repairs them.

**Usage:** `/hapo:sync audit <feature_name>`
- Example: `/hapo:sync audit auth`

## Directives

1. **Precision Edits:** Never overwrite the entire `spec.json` string blindly. Update only the required keys, while keeping JSON valid.
2. **Machine + Human Sync:** Every task status update MUST modify both `spec.json.task_registry[...]` and the matching markdown task file header/status section.
3. **Markdown Integrity:** When marking a task `done`, only then turn `[ ]` into `[x]` inside `## Steps` / `## Implementation Steps` and relevant `Completion Criteria` / `Evidence` checkboxes that have actual proof. Use `## Evidence` (legacy heading aliases still parse).
4. **Verification Receipt Rule:** `done` is illegal without a human-readable verification receipt already present in `## Evidence` (legacy heading aliases still parse) (commands executed, artifact/runtime proof, or equivalent concrete evidence). If proof is missing, keep the task `in_progress` or `blocked`.
5. **Task Docs Hook:** Every time `hapo:sync` marks a task as `done`, it must flag that a task-level docs checkpoint is now due for that verified task.
6. **Phase Prompt Rule:** When `hapo:sync` marks the final pending task in the whole feature as `done`, it should automatically prompt the user if they'd like to advance the phase, but only after the docs checkpoint for that last completed task has been considered.

### 4. Explicit Flash Finalization

**Usage:** `/hapo:sync <feature_name> <task_id|task-file> sync-finalize`

This is the only operation allowed to turn a flash-promoted task (`Verification: PASS`, `status: in_progress`, `readyForSync: true`) into `done` and unblock dependencies. A normal `done` request cannot bypass flash promotion or stale `FLASH_UNVERIFIED` state.

### Flash implementation state

Executable policy source: `.claude/scripts/workflow-policy.cjs` (source: `src/claude/scripts/workflow-policy.cjs`). Use `promoteFlashTask` only after exact task Evidence and reachability return PASS; FAIL, BLOCKED, and NO_TESTS remain blocked in progress.

`FLASH_UNVERIFIED` is storage for implemented-but-unverified work, not a completion status. Store it as `status: "in_progress"` with blocker `awaiting /hapo:test <feature>`; do not unblock dependencies. `/hapo:test` may promote one task only after its exact Evidence and reachability PASS, replacing the receipt with proof, clearing blocker, and setting `readyForSync: true` while dependencies remain blocked. Only explicit `/hapo:sync ... sync-finalize` may set `done` and unblock. FAIL, BLOCKED, and NO_TESTS remain `in_progress`.

## References
Read `references/sync-protocols.md` for exact Search/Replace regex patterns and JSON schema expectations before acting on the files.
