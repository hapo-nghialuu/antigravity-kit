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

## v2.1 authority-aware synchronization

Read canonical policy before mutating state. Lane is a derived view:

```bash
node .claude/scripts/workflow-policy.cjs --classify-lane --task-json '<task JSON>' --json
```

- Direct may have no spec/state/registry; sync only concrete targeted evidence
  and never invents proof, readiness, approval, or audit state.
- Standard stores one bounded spec; final integration creates one canonical
  feature receipt. A combined closeout review is required only when the
  persisted policy says an independent audit is needed.
- Critical requires strict durable evidence and the persisted capability obligations; choose available actors or the main session according to required capability and independence, never a fixed actor sequence.
- Authoring states are only `draft`, `validated`, or `absent`. Legacy approval
  fields are readable but inert.
- Preserve `classified_minimum`. Reclassification happens before persistence;
  after persistence, the same-feature baseline is monotonic and no downgrade is
  supported until a trusted issuer exists.
- `spec.json` is machine authority. Task status/checkboxes, dependencies, and
  ownership Markdown are projections. Typed `coordination.boundaries` are the
  only topology authority.

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
3. **Markdown Integrity:** Task Markdown is a plan plus `**Status:**`. Update
   Status and `Changes` checkboxes only when their implementation is real; never
   insert Base/Head, verdicts, command outcomes, or receipt proof into the plan.
4. **Verification Receipt Rule:** `done` is illegal without a valid canonical
   `receipts/<task-basename>.md`, or a readable legacy `## Evidence` receipt.
   Prefer the separate receipt; if both exist and proof identity conflicts,
   refuse completion. If proof is missing, keep the task `in_progress` or
   `blocked`.
5. **Task Docs Hook:** When `hapo:sync` marks a task as `done`, assess actual documentation impact and report `Docs impact: major|minor|none`; do not create a docs update request when impact is `none`.
6. **Topology Rule:** Never infer dependency or parallel state from `(P)`,
   `task_triggers`, `Related Files`, or prose; project typed boundaries instead.

### 4. Explicit Flash Finalization

**Usage:** `/hapo:sync <feature_name> <task_id|task-file> sync-finalize` (the adapter must call `workflow-policy.cjs --sync-finalize --task-json <current-task> --verdict PASS --proof <canonical-receipt> --json`)

This is the only operation allowed to turn the current `FLASH_UNVERIFIED` task into `done` and unblock dependencies. The policy derives promotion from that current state and explicit proof; `readyForSync`, `flashTransition`, and `promotionReceipt` supplied by the caller are not proof. A normal `done` request cannot bypass flash promotion or stale `FLASH_UNVERIFIED` state.

The current state must be the exact stored form: `status: "in_progress"`,
`receipt: "FLASH_UNVERIFIED"`, `dependencyBlocked: true`, `unblocks: false`, a
concrete blocker, and no caller promotion fields. The canonical proof must be
bound by the runtime adapter with `policy.createReceiptBinding({ base, head })`
and must match both receipt anchors; arbitrary valid-length Base/Head values do
not authorize finalization.

### Flash implementation state

Executable policy source: `.claude/scripts/workflow-policy.cjs` (source: `src/claude/scripts/workflow-policy.cjs`). Trusted sync-finalize invokes `promoteFlashTask` only after the exact task Verification Plan and reachability return PASS; test PASS itself only supplies canonical proof and leaves the persisted task blocked in progress. FAIL, BLOCKED, and NO_TESTS remain blocked in progress.

`FLASH_UNVERIFIED` is storage for implemented-but-unverified work, not a completion status. Store it as `status: "in_progress"` with `dependencyBlocked: true`, `unblocks: false`, a concrete blocker, and no promotion fields; do not unblock dependencies. `/hapo:test` may produce canonical proof, but the supported sync-finalize boundary must receive explicit `--verdict PASS` and `--proof`, require the runtime Base/Head binding, revalidate the receipt/artifact, derive the transition, and only then set `done`. FAIL, BLOCKED, NO_TESTS, marker-only proof, minimal state, and pre-promoted caller JSON remain `in_progress`.

After the last task is done, sync does not synthesize proof. Test/Develop must
run final integration and create `feature-receipt.md` once. Task-bearing
completion requires all task receipts plus the feature receipt. Taskless
Compact/Full completion requires the feature receipt only; its absence before
final closeout is normal. No receipt grants or infers approval, readiness, or
audit status.

## References
Read `references/sync-protocols.md` for exact Search/Replace regex patterns and JSON schema expectations before acting on the files.
