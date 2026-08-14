# Sync Protocols 

The following guidelines dictate exactly how `hapo:sync` should interact with files to prevent data corruption.

**Flash implementation state:** `FLASH_UNVERIFIED` MUST remain the exact stored form: `status: "in_progress"`, `dependencyBlocked: true`, `unblocks: false`, a concrete blocker, and no `readyForSync`, `flashTransition`, or `promotionReceipt` fields. It never unblocks dependencies. The supported sync-finalize adapter must pass the current task, `--verdict PASS`, and canonical `--proof` to `workflow-policy.cjs`; the policy derives promotion, requires a runtime `createReceiptBinding({ base, head })` match for both receipt anchors, revalidates receipt/artifact requirements, and rejects caller-supplied promotion fields before setting `done`. FAIL, BLOCKED, NO_TESTS, marker-only proof, minimal state, and pre-promoted caller JSON stay `in_progress`.

**Policy state rule:** read the v2.1 policy input before sync. Direct/Standard/
Critical are derived views. Preserve `classified_minimum`, risks, and explicit
override receipt. Authoring states are only `draft`, `validated`, or `absent`;
legacy approval fields are inert.

**Authority rule:** `spec.json` is machine authority. Markdown is a projection.
Typed `coordination.boundaries` own dependency, ownership, transition, proof,
and parallel semantics; never infer them from `(P)`, `task_triggers`, `Related
Files`, or prose.

## 1. Updating `spec.json`

*   **JSON Modification Rule:** Do not output whole files. Load the JSON,
    update only lifecycle fields and the relevant registry entry, then write
    valid JSON without changing semantic topology.
*   **Task Registry Rule:** Resolve the incoming task reference to a single relative path in `task_registry`. Accept either:
    - compact task ID like `R0-02`
    - full filename like `task-R0-02-extension-shell.md`
    - full relative path like `tasks/task-R0-02-extension-shell.md`
*   **Status Update:** If a task changes to `blocked`, the matching `task_registry[path].status` must become `"blocked"`, `task_registry[path].blocker` must record the reason, and `spec.json.status` / `spec.json.blocker` must reflect the top-level block if work is globally blocked.
*   **Timestamp Rule:** Update `task_registry[path].started_at`, `completed_at`, and `last_updated_at` consistently with the new state. Also refresh `spec.json.updated_at`.
*   **Done-State Rule:** Never set `task_registry[path].status = "done"` unless `receipts/<task-basename>.md` is valid, or a legacy `## Evidence` receipt is valid. Write proof to the separate receipt first; never add execution evidence to a new-format task plan.
*   **Receipt Integrity Rule:** A valid task receipt includes task identity/path, exact commands and outcomes, expected versus observed behavior, applicable negative/reachability/artifact proof, and Base/Head binding. If separate and legacy receipts both exist with conflicting proof identity, refuse `done`. `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, placeholders, and contract substitutions are not eligible.
*   **Contract Fidelity Rule:** If the task file notes or evidence show that a named framework/auth/runtime choice from the spec was silently replaced, sync MUST refuse `done` until the spec is amended or the implementation is corrected.
*   **Task Docs Rule:** After a task is moved to `done`, assess actual documentation impact and report `Docs impact: major|minor|none`. Only affected docs receive a follow-up checkpoint.

## 2. Updating `tasks/task-**.md`

The structure of `tasks/task.md` relies heavily on exact keyword markers. Follow these surgical protocols against `tasks/task-R*.md`:

### A. Completing a Task
When `/hapo:sync <feature> <task-id> done`:
1. Find: `**Status:** pending` (or `in_progress` / `blocked`).
2. Resolve `receipts/<task-basename>.md` first, with legacy `## Evidence` as fallback. If neither has valid proof, STOP and refuse to mark the task done.
3. Refuse completion if the receipt contains any non-passing marker such as `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, or an explicit note that the implementation substituted a named contract with a placeholder/custom simplification.
4. Replace with: `**Status:** done`.
5. Update only implemented checkboxes under `## Changes`; never append receipt fields to the task plan.
6. Surface `Docs impact: major|minor|none`; if impact is not `none`, name the affected docs and the follow-up checkpoint.

### B. Blocking a Task
When `/hapo:sync <feature> <task-id> blocked "API error"`:
1. Find: `**Status:** <anything>`.
2. Replace with: `**Status:** blocked`.
3. Record the reason and timestamp in `task_registry[path].blocker`; do not add
   a non-canonical task section.

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
   - Markdown says `done` but registry not done → registry wins only if a canonical separate or legacy receipt exists; otherwise downgrade markdown or flag conflict
   - Registry says `done` but markdown still pending → update markdown only if a canonical separate or legacy receipt exists
   - Either side says `done` but neither receipt source has concrete proof → downgrade to `in_progress` or flag conflict instead of preserving fake completion
   - Both receipt sources exist with conflicting proof identity → fail closed and require manual reconciliation
   - Either side says `done` but the receipt contains `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, or explicit contract-substitution notes → downgrade to `in_progress` or flag conflict
5. **Correction Alert:** Output a brief markdown alert detailing mismatches fixed and any unresolved conflicts requiring manual review.
6. **Task Docs Alert:** If audit reveals tasks newly marked `done`, include the actual docs impact; do not emit a generic docs-sync request when no docs are affected.

## 4. Feature closeout

- Before all tasks are done, missing `feature-receipt.md` is normal.
- After all tasks are done, require final integration execution and one valid
  `feature-receipt.md`; never derive it from task status alone.
- A taskless Compact/Full spec uses the same final feature receipt and does not
  require a synthetic registry entry.
