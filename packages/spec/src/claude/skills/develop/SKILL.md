---
name: hapo:develop
description: "Implement an explicitly requested process-first feature or task, run its real verification, and close it with one evidence owner. Also supports existing legacy Specs packets."
user-invocable: true
when_to_use: "Use to implement a ready feature packet, one named task, or a clear low-risk change."
category: utilities
keywords: [implementation, specs, verification]
argument-hint: "[feature-name|specs-directory-path] [task-file] [--flash] [--parallel [N]] [--notes]"
metadata:
  author: haposoft
  version: "3.0.0"
---
# Develop — implement, prove, synchronize

Implement only the explicitly requested scope. For a process-first feature,
`plan.md` and flat tasks are the durable packet; one closeout owner coordinates verification, review, sync, and docs impact without borrowing evidence.

Develop never starts merely because Specs finished. The user invokes it.

## Usage and pre-state guard

```text
/hapo:develop <feature>
/hapo:develop specs/<feature>
/hapo:develop <feature> task-02-<slug>.md
/hapo:develop <feature> --flash
/hapo:develop <feature> --parallel [N]
/hapo:develop <feature> --notes
```

`--notes` is opt-in. Only then load `references/implementation-notes-template.html`;
record decisions, scope exceptions, risks, gaps, and verification limits. Never create it by default.

Before any state mutation, reject `--flash` combined with `--parallel`:

```bash
node .claude/scripts/workflow-policy.cjs --flash --parallel --json
```

The pair exits `2` before a task edit, receipt, worktree, subagent, or commit. Do not reproduce it with a looser parser.

## Resolve the work packet

1. Resolve one `specs/<feature>/plan.md` plus flat `task-NN-*.md`; an explicit task path wins.
2. Read C1 scope, exclusions, acceptance mapping, ownership, and task order.
3. A task is unblocked only when every named dependency is done with a valid inline Receipt.
4. Full-feature mode selects one unblocked task at a time, in plan order.
   Specific-task mode implements only that task and then stops.
5. Without a packet, work directly only when the change is clear, isolated, reversible, and low-risk.

Ambiguity, overlapping ownership, a dependency cycle, or a missing Verification Plan is a blocker. Do not guess.

## Modes

### Sequential feature or specific task

Set the selected task's single `Status:` field to `in_progress`. Implement its
Outcome and Acceptance only. Do not start the next task until proof, review,
and sync for the current task finish. A specific-task invocation never chains.

### Parallel (`--parallel [N]`)

Load `references/parallel-waves.md`. Require disjoint writes, satisfied dependencies,
isolated worktrees, a bounded wave, and one controller writer; otherwise work sequentially.

### Flash (`--flash`)

Flash is an explicit speed trade-off, never completion:

- run only an available cheap syntax, typecheck, or compile preflight;
- skip dedicated tests, extended manual checks, and review retry loops;
- keep `Status: in_progress` and record `FLASH_UNVERIFIED` plus blocker
  `awaiting /hapo:test <feature>`;
- do not unblock dependents or report Test PASS, Evidence PASS,
  production-ready, or done;
- promotion later requires a fresh canonical PASS receipt through the trusted
  sync-finalize path.

Never weaken, delete, or rewrite tests to make Flash look complete.

## Task cycle

### 1. Scout

Trace entrypoints, callers, dependents, registration, errors, and owned files.
Compilation does not prove an unmounted UI, unregistered route, uncalled service, or missing consumer.

### 2. Implement

Honor Scope, Ownership, Acceptance, and Dependencies. Do not silently replace named contracts;
scope expansion requires evidence and a return to C1, not implementation convenience.

### 3. Verify and review once

The test owner executes the exact Verification Plan and records real output.
The review owner, when risk or repository policy requires review, evaluates
correctness, security, scope, and reachability but does not manufacture proof.
Use `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`; only literal PASS can close.

Load `references/quality-gate.md` for the closeout contract. Remediate an
observed failure, then rerun only affected proof and review. Do not blind-retry
a blocked environment. After three failed repair rounds, stop and ask the user.

### 4. Write the inline Receipt and sync

After a real pass, append or replace the task's final `## Receipt` with:

- `Verification: PASS`;
- the exact `Command:` and `Exit: 0`;
- runtime-derived `Base:` and `Head:`;
- a non-empty fenced block containing current command output;
- required negative, reachability, and artifact proof from the task.

Then set `Status: done`, update only implemented checkboxes, and recompute the
queue. Missing, stale, contradictory, zero-test, placeholder, or marker-only
proof leaves the task unfinished.

### 5. Finish the requested boundary

Specific-task mode stops after its sync. Full-feature mode continues one task
at a time, then runs the feature-level integration command and reachability
check named by the repository or plan. Show current evidence and limitations at
C3; the user decides completion.

Evaluate docs impact from the behavior actually changed:

- `none`: report it and make no docs edit;
- `minor` or `major`: update only affected existing docs through the docs flow.

## Definition of done

Done requires satisfied acceptance, reachable behavior, current executable
proof, correct Base/Head binding, resolved blocking review findings, and no
scope substitution. `PASS_WITH_WARNINGS`, `NO_TESTS`, `FLASH_UNVERIFIED`, or a
review-only pass cannot close work.

## Attached references

- `references/quality-gate.md` — proof and review ownership.
- `references/parallel-waves.md` — opt-in isolated worktree waves.
- `references/implementation-notes-template.html` — only with `--notes`.

## Legacy workflow compatibility

If the selected feature contains `spec.json`, use its persisted
`workflow_policy`, `task_registry`, nested task paths, typed boundaries,
separate task receipts, and feature closeout receipt exactly as the legacy
adapters require. Preserve `planning_depth`, `assurance_level`, derived lane,
and read-only `execution_tier`; do not project these fields into a new v3
packet. Keep JSON and Markdown status synchronized, and use the existing
completion-authority path for final closeout.
