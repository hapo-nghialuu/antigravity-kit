---
name: hapo:develop
description: "Implement an approved or explicitly low-risk change with lane-proportional evidence and one closeout owner."
user-invocable: true
when_to_use: "Use to implement a ready spec, a specific task, or a Direct low-risk change."
category: utilities
keywords: [implementation, specs, verification]
argument-hint: "[feature-name|specs-directory-path] [task-file] [--flash] [--parallel [N]] [--notes]"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Develop — implementation and closeout contract

Implement the requested scope, then close it with one canonical execution owner. Keep the lane, not a legacy tier or fixed actor sequence, as authority.

The executable policy source is `src/claude/scripts/workflow-policy.cjs`; the persisted workflow-policy snapshot is the contract (installed as `.claude/scripts/workflow-policy.cjs`). It owns `workflow_policy`, escalation, approvals, verdict adaptation, receipt validation, and flash promotion.

## Usage and pre-state guard

```text
/hapo:develop <feature>
/hapo:develop specs/<feature>
/hapo:develop <feature> <specific-task-file.md>
/hapo:develop <feature> --flash
/hapo:develop <feature> --parallel [N]
/hapo:develop <feature> --notes
```

`--notes` is opt-in. Without it, do not create or update `implementation-notes.html`; there is no notes opt-out flag. When requested, load `references/implementation-notes-template.html` and record concrete decisions, gaps, scope-escape exceptions, risks, and verification caveats.

Run the policy pre-state guard before loading a spec or mutating state. The incompatible pair must exit `2` and create no state, receipt, worktree, subagent, or commit: this is the `flash+parallel fail-fast` gate.

```bash
node .claude/scripts/workflow-policy.cjs --flash --parallel --json
```

Expected message:

```text
Unsupported flags: --flash and --parallel are incompatible.
Remediation: run `/hapo:develop <feature> --flash` or `/hapo:develop <feature> --parallel [N]`.
No spec state, task receipt, worktree, subagent, or commit was created.
```

## Lane authority

Classify before spec/state mutation:

```bash
node .claude/scripts/workflow-policy.cjs --classify-lane --task-json '<task JSON>' --json
```

- **Direct**: clear, isolated, reversible, low-risk. Skip spec/state/registry
  ceremony and run targeted verification with proportional evidence.
- **Standard**: use the bounded spec profile and focused inspection. A small
  feature need not have a task registry or task bundle. Close once at the
  feature boundary.
- **Critical**: require the approved strict profile. Add durable task state,
  registry/DAG, research, or independent audit only when the persisted
  `proof_obligations` require each one.

Risk can escalate but cannot downgrade the persisted lane. A downgrade without a
trusted runtime-issued receipt is blocked; `user_approved` requires explicit user
approval, and `userAuthorized` plus similar booleans are not authorization.

`execution_tier` (`Light | Standard | Deep`) is a read-only legacy adapter
(`Direct | Standard | Critical`). It cannot emit policy, create obligations,
select a workflow, or override the lane. Do not branch on it for new behavior.

## Modes

### Specific task

Load exactly one task packet, implement only its scope, run its evidence, and
stop after synchronization. Specific-task mode never selects or chains into the
next task, even when another task is pending.

### Full feature

For a task-bearing policy, resolve one unblocked task at a time, complete its
cycle, synchronize, and recompute the queue. A bounded Standard feature without
tasks runs one feature-level cycle. Stop on the first unresolved block or
missing proof. Run a final integration check only when the feature has no more
pending tasks.

### Parallel (opt-in)

Load `references/parallel-waves.md` only when `--parallel` is present. It may
use isolated worktrees and a bounded wave, but lane obligations, single-writer
rules, immutable provenance, and the final integration check remain in force.
Without `--parallel`, process one unblocked task at a time.

### 3. Flash Mode (`--flash`)
Flash is an explicit speed trade-off, not a completion shortcut:

- skip dedicated test suites, full task evidence execution, and extended manual
  checks;
- run only a cheap available syntax/typecheck/compile preflight;
- never weaken or delete tests;
- synchronize only as `in_progress` with `FLASH_UNVERIFIED`,
  `dependencyBlocked: true`, `unblocks: false`, and blocker
  `awaiting /hapo:test <feature>`;
- never claim `Test PASS`, `Evidence PASS`, `Auto-Approved`, or
  `production-ready`.

Only trusted sync-finalize may promote a flash task. It must receive the current
`FLASH_UNVERIFIED` task plus explicit `--verdict PASS` and a canonical proof;
caller-supplied promotion fields are ignored/rejected. A marker-only proof
never promotes or finalizes. Stored state keeps `in_progress`,
`FLASH_UNVERIFIED`, `dependencyBlocked: true`, `unblocks: false`, and a concrete
blocker, omits promotion fields, and binds proof to expected Base/Head anchors.
## Workflow
`Classify lane → load lane artifacts → scout obligations → implement current
scope → one closeout owner → test receipt → review → docs-impact sync.`

### Step 1 — Load and scope

- Direct does not create a spec, state, registry, task bundle, or notes file.
- Standard requires its bounded artifacts and explicit approval, but not a
  registry when the scope is small and no task obligation is persisted.
- Critical requires only the artifacts named by its snapshot obligations.
- For task-bearing work, load one requested task or one unblocked task and
  extract scope, requirements, contracts, completion criteria, and exact
  evidence commands.
- A spec-ready execution-evidence or independent-audit slot may be `PENDING`
  before implementation; pending is not proof and cannot close the feature.

### Step 2 — Scout

Scout depth follows the persisted lane, risk, and blast radius. Identify real
entrypoints/callers, integration points, dependent files, reachability risks,
and safe scope. Do not use file count as a proxy for review depth. If a runtime
entrypoint cannot be grounded, stop.

### Step 3 — Implement

Implement only the approved scope and named contracts. Do not silently replace
frameworks, auth, transport, storage, or runtime boundaries. Do not mark a
runtime-facing file complete while it is orphaned, unmounted, unregistered, or
uncalled. A specific-task request ends after that task; no automatic chain.

<SCOPE-FIDELITY>
The approved `scope_lock`, requirements, design contracts, and active task are
the implementation contract. Scope escape requires a concrete reachability or
compile reason and must not deliver a later task early.
</SCOPE-FIDELITY>

### Step 4 — Closeout owner

The controller assigns exactly one closeout owner for the current task or
feature. That owner invokes the test workflow once, receives its result, then
invokes the review workflow once when the lane requires it. No other phase
re-runs the same test or review as a hidden gate.

- The test owner executes commands and creates the canonical execution receipt.
- The review owner evaluates correctness, security, and spec compliance; it
  consumes existing proof but never creates or claims execution proof.
- Review depth follows lane, risk, and blast radius. It does not follow the
  number of files changed.
- Finding count never selects review depth or overrides missing execution proof.
- Use the shared adapter surface: `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`.
  Warnings do not waive missing proof; `FAIL` is remediable and `BLOCKED` stops.

Load `references/quality-gate.md` for the exact closeout contract. It has no
fixed Light/Standard/Deep agent sequence.

### Step 5 — Sync and docs checkpoint

Only a canonical execution receipt with command, exit result, bound provenance,
and required artifact hashes can close a task/feature. Missing, pending,
marker-only, or contradictory evidence stays unfinished. Critical audits need
distinct session IDs, expected Base/Head binding, concrete evidence, and literal
`verdict: "PASS"`; `Audit: PASS` is not evidence.
After verification, synchronize status/timestamps/task state. Then evaluate
actual docs impact:

- `none`: record it and stop;
- `minor`/`major`: update only affected existing docs through the normal docs
  workflow, with no broad refresh.

Do not run a docs checkpoint merely because a task finished.

## Definition of done and handoff

Done requires active criteria, all required evidence, reachable runtime behavior,
a receipt bound to expected Base/Head, and every lane obligation. Only literal
`PASS` can complete; `PASS_WITH_WARNINGS` remains unfinished.
`--flash` records only `FLASH_UNVERIFIED` and never done.

For a full feature, after the last task run the **Final Integration Scout** when
runtime-facing surfaces exist; compare reachability and scope before reporting
completion. For a specific task, stop after its synchronized result.

## Attached references

- `references/quality-gate.md` — closeout ownership, verdict normalization, and
  evidence checks.
- `references/parallel-waves.md` — opt-in worktree waves.
- `references/implementation-notes-template.html` — loaded only with `--notes`.
