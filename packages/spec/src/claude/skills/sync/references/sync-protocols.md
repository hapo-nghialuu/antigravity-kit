# Sync Protocols 

The following guidelines dictate exactly how `hapo:sync` should interact with files to prevent data corruption.

**Canonical task status vocabulary:** `pending`, `in_progress`, `blocked`, `done`

## 1. Updating `spec.json`

When requested to update a phase or change task configuration, `spec.json` must maintain its strict schema (defined in `hapo:specs/templates/init.json`).

*   **JSON Modification Rule:** Do not output whole files. Instead, load the JSON structure, apply the update to `status`, `current_phase`, `blocker` (if any), `task_files`, and the relevant `task_registry` entry, then overwrite the file cleanly.
*   **Task Registry Rule:** Resolve the incoming task reference to a single relative path in `task_registry`. Accept either:
    - compact task ID like `R0-02`
    - full filename like `task-R0-02-extension-shell.md`
    - full relative path like `tasks/task-R0-02-extension-shell.md`
*   **Status Update:** If a task changes to `blocked`, the matching `task_registry[path].status` must become `"blocked"`, `task_registry[path].blocker` must record the reason, and `spec.json.status` / `spec.json.blocker` must reflect the top-level block if work is globally blocked.
*   **Timestamp Rule:** Update `task_registry[path].started_at`, `completed_at`, and `last_updated_at` consistently with the new state. Also refresh `spec.json.updated_at`.
*   **Done-State Rule:** Never set `task_registry[path].status = "done"` unless the matching markdown task file already contains a verification receipt in `## Verification & Evidence`, or the caller explicitly provides proof that can be written there first.
*   **Receipt Integrity Rule:** A valid verification receipt must include the exact commands run, their outcomes, and artifact/runtime proof. Receipts containing `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, or explicit "placeholder / simplified for MVP / production later" contract deviations are not eligible for `done`.
*   **Contract Fidelity Rule:** If the task file notes or evidence show that a named framework/auth/runtime choice from the spec was silently replaced, sync MUST refuse `done` until the spec is amended or the implementation is corrected.
*   **Task Docs Rule:** After a task is moved to `done`, emit a short alert that a task-level docs checkpoint is due for this verified task.

## 2. Updating `tasks/task-**.md`

The structure of `tasks/task.md` relies heavily on exact keyword markers. Follow these surgical protocols against `tasks/task-R*.md`:

### A. Completing a Task
When `/hapo:sync <feature> <task-id> done`:
1. Find: `**Status:** pending` (or `in_progress` / `blocked`).
2. Inspect `## Verification & Evidence` first. If it has no explicit proof lines (commands run, artifact proof, runtime proof, or blockers cleared), STOP and refuse to mark the task done.
3. Refuse completion if the receipt contains any non-passing marker such as `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, or an explicit note that the implementation substituted a named contract with a placeholder/custom simplification.
4. Replace with: `**Status:** done`.
5. Locate block: `## Implementation Steps`.
6. Convert `- [ ]` into `- [x]` strictly within that section.
7. Update relevant checkboxes in `## Completion Criteria` and `## Verification & Evidence` only when the caller provides or the file already contains real proof.
8. Surface a note such as: `Docs checkpoint due: task Rn-mm just completed`.

### B. Blocking a Task
When `/hapo:sync <feature> <task-id> blocked "API error"`:
1. Find: `**Status:** <anything>`.
2. Replace with: `**Status:** blocked`.
3. Ensure that an entry under `## Blocker Log` exists recording the explicit reason (e.g. `API error`) and timestamp.

### C. Starting / Resuming a Task
When `/hapo:sync <feature> <task-id> in_progress`:
1. Find: `**Status:** pending` (or `blocked`).
2. Replace with: `**Status:** in_progress`.
3. Do NOT pre-check completion boxes.
4. Stamp `task_registry[path].started_at` if missing and refresh `last_updated_at`.

## 3. Audit Protocol

When `/hapo:sync audit <feature>` is activated:
1. **Load Truth:** Read `specs/<feature>/spec.json`.
2. **Scan Directory:** Loop through `specs/<feature>/tasks/`.
3. **Compare Constraints:** Rebuild `task_files` from disk, ensure every file exists in `task_registry`, and compare markdown `**Status:**` headers against `task_registry[path].status`.
4. **Reconciliation Rules:**
   - Missing registry entry → create it
   - Missing disk file referenced in registry → remove or flag it
   - Markdown says `done` but registry not done → registry wins only if evidence already exists; otherwise downgrade markdown or flag conflict
   - Registry says `done` but markdown still pending → update markdown only if evidence exists
   - Either side says `done` but `## Verification & Evidence` has no concrete proof → downgrade to `in_progress` or flag conflict instead of preserving fake completion
   - Either side says `done` but the receipt contains `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, or explicit contract-substitution notes → downgrade to `in_progress` or flag conflict
5. **Correction Alert:** Output a brief markdown alert detailing mismatches fixed and any unresolved conflicts requiring manual review.
6. **Task Docs Alert:** If audit reveals tasks newly marked `done`, include whether task-level docs sync appears still due or already accounted for in the current run summary.
