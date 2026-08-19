---
name: hapo:sync
description: "Synchronize process-first task Status and inline Receipts without inventing proof; also preserves existing legacy Specs state."
user-invocable: true
when_to_use: "Invoke after implementation or verification changes a task's real state, or to audit a feature packet for drift."
category: utilities
keywords: [sync, state, tracking, consistency]
argument-hint: "<feature> <task-file> <pending|in_progress|paused|blocked|done|sync-finalize> [blocker] | audit <feature>"
metadata:
  author: haposoft
  version: "3.0.0"
---
# Sync — file-state synchronization

Synchronize only observed state. For the primary process-first layout, the
single `Status:` field and inline `## Receipt` in each flat task file are the
state. Never infer proof, approval, review independence, or product readiness.

## Commands

```text
/hapo:sync <feature> <task-NN-slug.md> in_progress
/hapo:sync <feature> <task-NN-slug.md> blocked "reason"
/hapo:sync <feature> <task-NN-slug.md> done
/hapo:sync <feature> <task-NN-slug.md> sync-finalize
/hapo:sync audit <feature>
```

Resolve one regular direct-child task inside `specs/<feature>/`. Reject path
escape, symlink, ambiguity, missing `plan.md`, duplicate Status fields, and
unsupported status values.

## Task synchronization

1. Read the task Outcome, Acceptance, Dependencies, Verification Plan, current
   Status, and Receipt before editing.
2. Starting or resuming changes only Status to `in_progress`. Update only
   checkboxes whose implementation is real.
3. Blocking changes Status to `blocked` and records a concrete blocker; it does
   not create proof.
4. Done requires a current inline Receipt with `Verification: PASS`, exact
   Command, `Exit: 0`, runtime-bound Base/Head, non-empty fenced output, and any
   required negative/reachability/artifact proof.
5. Write or replace the Receipt before changing Status to `done`. Missing,
   stale, contradictory, placeholder, failure, or zero-test evidence keeps the
   task `in_progress` or `blocked`.
6. Re-read the file after the surgical edit and confirm exactly one Status and
   one Receipt section.

`sync-finalize` is the only promotion path for `FLASH_UNVERIFIED`. It requires
fresh canonical PASS proof, revalidates Base/Head and artifacts, clears the
flash blocker, then derives `done`. Caller-supplied promotion booleans and a
marker alone have no authority.

## Audit

Scan only `specs/<feature>/task-*.md` beside `plan.md`. Compare plan task rows,
task filenames, dependencies, Status, acceptance mapping, and Receipts. Report
missing files, unknown rows, cycles, duplicate fields, done-without-proof,
proof-on-unfinished-task, and overlapping ownership.

Repair deterministic formatting drift only. A semantic conflict, missing
evidence, or ownership decision requires user or implementation input; do not
pick a winner. After any edit, report exact files changed and unresolved items.

Read `references/sync-protocols.md` for surgical update and audit rules.

## Docs impact

When a task becomes done, report `Docs impact: none|minor|major`. Create no docs
work for `none`; update only affected existing docs for minor or major.

## Legacy workflow compatibility

If `specs/<feature>/spec.json` exists, use the legacy adapter instead: preserve
its machine authority, `task_registry`, nested `tasks/task-R*.md`, timestamps,
typed topology, separate receipts, `workflow_policy`, `planning_depth`, lane,
and `execution_tier`. Keep JSON and Markdown synchronized, retain the exact
legacy sync-finalize contract, and require its feature receipt at closeout.
