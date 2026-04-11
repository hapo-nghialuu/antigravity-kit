---
name: hapo:sync
description: "Dumb-proof status tracker and file synchronizer. Updates spec.json and tasks/*.md without breaking structural schemas. Includes Auto-Audit."
version: 1.0.0
argument-hint: "<feature_name> <task_id> <status> [blocker] | phase <feature_name> <next_phase> | audit <feature_name>"
---

# Sync (State Tracking Protocol)

This skill safely bridges the gap between active development state and physical documentation files (`spec.json` & `task-0*.md`). Instead of relying on risky raw AI edits, this skill executes precise contextual replacements.

## Supported Commands

### 1. Task Synchronization
Update a specific task's status and automatically check its relevant sub-checkboxes.

**Usage:** `/hapo:sync <feature_name> <task_id> <status> ["optional blocker msg"]`
- Example 1: `/hapo:sync auth task-01 completed`
- Example 2: `/hapo:sync payment task-03 blocked "API Endpoint Down"`

### 2. Phase Advancement
Advance the entire project to the next logical phase.

**Usage:** `/hapo:sync phase <feature_name> <next_phase>`
- Example: `/hapo:sync phase shopping_cart test`

### 3. State Audit
Scans the `spec.json` against all physical `task-0*.md` files to detect mismatches or un-checked boxes and repairs them.

**Usage:** `/hapo:sync audit <feature_name>`
- Example: `/hapo:sync audit auth`

## Directives

1. **Precision Edits:** Never overwrite the entire `spec.json` string. Provide surgical JSON modification protocols.
2. **Markdown Integrity:** When marking a task "completed", use Regex to turn `[ ]` into `[x]` ONLY inside the `## Các bước thực hiện` section.
3. **Task Completion Hook:** When `hapo:sync` marks the final pending task as `completed`, it should automatically prompt the user if they'd like to advance the Phase via `hapo:sync phase`.

## References
Read `references/sync-protocols.md` for exact Search/Replace regex patterns and JSON schema expectations before acting on the files.
