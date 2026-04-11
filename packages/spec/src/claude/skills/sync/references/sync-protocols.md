# Sync Protocols 

The following guidelines dictate exactly how `hapo:sync` should interact with files to prevent data corruption.

## 1. Updating `spec.json`

When requested to update a phase or change task configuration, `spec.json` must maintain its strict schema (defined in `hapo:specs/templates/init.json`).

*   **JSON Modification Rule:** Do not output whole files. Instead, load the JSON structure, apply the update to `status`, `current_phase`, `blocker` (if any), and overwrite the file cleanly.
*   **Status Update:** If a task changes to `blocked`, `spec.json`'s main `status` must transition to `"blocked"`, and the `"blocker"` string must record the task ID & reason.

## 2. Updating `tasks/task-**.md`

The structure of `tasks/task.md` relies heavily on exact keyword markers. Follow these surgical regex protocols:

### A. Completing a Task
When `/hapo:sync <feature> <task-id> completed`:
1. Find: `**Trạng thái:** pending` (or `in_progress`).
2. Replace with: `**Trạng thái:** completed`.
3. Locate block: `## Các bước thực hiện`.
4. Convert every `- [ ]` into `- [x]` strictly within that section. Ignore checkboxes elsewhere in the document.

### B. Blocking a Task
When `/hapo:sync <feature> <task-id> blocked "API error"`:
1. Find: `**Trạng thái:** <anything>`.
2. Replace with: `**Trạng thái:** blocked`.
3. Ensure that an entry under `## Đánh giá Rủi ro` or a new section `## Blocker Log` is injected recording the explicit reason (e.g. `API error`).

## 3. Audit Protocol

When `/hapo:sync audit <feature>` is activated:
1. **Load Truth:** Read `specs/<feature>/spec.json`.
2. **Scan Directory:** Loop through `specs/<feature>/tasks/`.
3. **Compare Constraints:** If parsing `task-01.md` reveals `Trạng thái: completed` but `spec.json` is missing this accounting, update the JSON. 
4. **Correction Alert:** Output a brief markdown alert detailing mismatches fixed.
