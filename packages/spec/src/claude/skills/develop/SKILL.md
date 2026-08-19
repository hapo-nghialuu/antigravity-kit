---
name: hapo:develop
description: "Implement an explicitly invoked ready or low-risk change with policy-proportional evidence and one closeout owner."
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

Implement the requested scope, then close it with one canonical execution owner.
For a durable spec, `spec.json` is machine authority and Markdown is a human
projection. The v2.1 policy snapshot persists minimum input; lane, label,
artifact profile, and ceremony are derived views. The executable policy source
is `src/claude/scripts/workflow-policy.cjs` (installed as
`.claude/scripts/workflow-policy.cjs`).

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

## Policy authority

For durable specs, persisted `workflow_policy` authority is the v2.1 minimum.
Canonical authoring supplies `planning_depth`, `assurance_level`,
`classified_minimum`, and normalized `risks`; lane and ceremony remain derived
views.

Classify before spec/state mutation:

```bash
node .claude/scripts/workflow-policy.cjs --classify-lane --task-json '<task JSON>' --json
```

- **Direct**: clear, isolated, reversible, low-risk. Skip spec/state/registry ceremony and run targeted verification with proportional evidence.
- **Standard**: use the bounded spec profile and focused inspection. A small feature needs no task registry/bundle and closes once at the feature boundary.
- **Critical**: derived Strict view. Add durable task state, research, or review
  only when actual topology, uncertainty, or assurance requires it.

Risk can raise the classified minimum. Reclassify before persistence. After
persistence, a per-feature baseline is monotonic and no downgrade is supported
until a trusted issuer exists; the baseline applies only to that feature.
Legacy approval fields and caller booleans have zero authority.

Develop starts only from the user's explicit Develop invocation. Technical
`ready_for_implementation` never dispatches Develop, and Specs must never
auto-chain into this workflow.

`execution_tier` (`Light | Standard | Deep`) is a read-only legacy adapter (`Direct | Standard | Critical`). It cannot emit policy, create obligations, select a workflow, or override the lane. Do not branch on it for new behavior.

## Modes

### Specific task

Load exactly one task packet, implement only its scope, run its evidence, and stop after synchronization. Specific-task mode never selects or chains into another pending task.

### Full feature

For a task-bearing policy, resolve one unblocked task at a time, complete its cycle, synchronize, and recompute the queue. A bounded Standard feature without tasks runs one feature-level cycle. Stop on the first unresolved block or missing proof; run final integration only after all pending tasks finish.

### Parallel (opt-in)

Load `references/parallel-waves.md` only with `--parallel`. It may use isolated worktrees and a bounded wave, but lane obligations, single-writer rules, immutable provenance, and final integration remain in force. Otherwise process one unblocked task at a time.

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

Only trusted sync-finalize may promote a current `FLASH_UNVERIFIED` task with explicit `--verdict PASS` and canonical proof; caller promotion fields are ignored/rejected, and marker-only proof never promotes. Stored state remains `in_progress`/`FLASH_UNVERIFIED`, dependency-blocked with a concrete blocker, omits promotion fields, and binds proof to expected Base/Head anchors.
## Workflow
`Classify lane → load lane artifacts → scout obligations → implement current
scope → one closeout owner → test receipt → review → docs-impact sync.`

### Step 1 — Load and scope

- Direct does not create a spec, state, registry, task bundle, or notes file.
- Standard requires its bounded validated artifacts, but not a
  registry when the scope is small and no task obligation is persisted.
- Critical requires only the artifacts named by its snapshot obligations.
- For task-bearing work, load one requested task or one unblocked task and
  extract the exact seven v2.1 sections: `Outcome`, `Scope`, `Anchors and Ownership`,
  `Changes`, `Acceptance`, `Dependencies`, and `Verification Plan`.
  Use typed `coordination.boundaries` for ownership/DAG/proof/parallel authority.
- Before implementation, transition `pending` to `in_progress` in task Markdown `**Status:**` and `spec.json.task_registry[path]` with synchronized timestamps. Never write execution proof into the task plan.
- A spec-ready execution-evidence or independent-audit slot may be `PENDING`
  before implementation; pending is not proof and cannot close the feature.

### Step 2 — Scout

Scout depth follows assurance, risk, and blast radius. Identify real
entrypoints/callers, integration points, dependents, reachability risks, and
safe scope. File count is not review depth; stop if a runtime entrypoint cannot
be grounded.

### Step 3 — Implement

Implement only the scoped behavior and named contracts. Do not silently replace
frameworks, auth, transport, storage, or runtime boundaries. Do not mark a
runtime-facing file complete while it is orphaned, unmounted, unregistered, or
uncalled. A specific-task request ends after that task; no automatic chain.

<SCOPE-FIDELITY>
The `scope_lock`, requirements, design contracts, and active task are
the implementation contract. Scope escape requires a concrete reachability or
compile reason and must not deliver a later task early.
</SCOPE-FIDELITY>

### Step 4 — Closeout owner

The controller assigns exactly one closeout owner for the current task or feature. It invokes testing once, then review once when required; no phase re-runs either as a hidden gate.

- For task-bearing work, the test owner executes the Verification Plan and writes the canonical execution receipt to `receipts/<task-basename>.md` only after real execution.
- The review owner evaluates correctness, security, and spec compliance; it
  consumes existing proof but never creates or claims execution proof.
- Review depth follows `assurance_level`, risk, and blast radius. Lane is only
  a derived view, and depth does not follow the
  number of files changed.
- Finding count never selects review depth or overrides missing execution proof.
- Use the shared adapter surface: `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`.
  Warnings do not waive missing proof; `FAIL` is remediable and `BLOCKED` stops.

Load `references/quality-gate.md` for the exact closeout contract. It has no
fixed Light/Standard/Deep agent sequence.

### Step 5 — Sync and docs checkpoint

Only a canonical receipt with task identity/path, exact command/result, expected versus observed behavior, bound provenance, applicable negative/reachability proof, and required artifact hashes can close a task. Prefer `receipts/<task-basename>.md`; legacy task `## Evidence` is read-compatible, but conflicting proof identities fail closed. Missing, pending, marker-only, or contradictory evidence stays unfinished. Critical audits need distinct session IDs, expected Base/Head binding, concrete evidence, and literal `verdict: "PASS"`; `Audit: PASS` is not evidence.
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

For a full feature, after the last task run the **Final Integration Scout** for runtime-facing surfaces and compare reachability/scope before completion. The same test owner creates `feature-receipt.md` exactly once from final integration proof. Task-bearing closeout requires every task receipt plus that feature receipt; taskless Compact/Full creates only the feature receipt at closeout. Its earlier absence is normal. A specific task stops after synchronization and creates no feature receipt unless it also completes the full integration boundary.

## Attached references

- `references/quality-gate.md` — closeout ownership, verdict normalization, and
  evidence checks.
- `references/parallel-waves.md` — opt-in worktree waves.
- `references/implementation-notes-template.html` — loaded only with `--notes`.
