# Quality Gate — one closeout, separate proof and review

This reference is loaded at develop closeout. It is an executable contract, not
a fixed actor checklist. Canonical v2.1 policy input is authoritative; lane and
`execution_tier` are derived/read-only compatibility views.

## Inputs and ownership

The single closeout owner receives the current scope, assurance, risk signals, blast
radius, exact evidence commands, and the current diff. It calls the test owner
once, then the review owner once when required. No parallel path, review path,
or sync hook runs a duplicate hidden gate.

- **Test owner:** executes commands and creates the canonical execution receipt.
- **Review owner:** evaluates correctness, security, scope, and spec compliance;
  consumes the receipt but never creates or claims execution proof.
- **Closeout owner:** combines both results and performs one state/docs sync.

Review depth follows assurance, risk, and blast radius, not the number of files or
tasks. There is no fixed Light/Standard/Deep agent sequence. The shared verdict
surface is `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`; all adapters must use
the same normalizer.

## Working directory (parallel mode)

When an opt-in wave is active, each command runs in its task worktree. A
collapse of one task does not cancel other in-flight tasks; merge and state
synchronization remain single-writer operations.

## Required evidence

Before completion, verify:

1. compile/typecheck precheck and every exact command named by the active
   `Verification Plan`;
2. real runtime reachability and declared artifact inspection;
3. canonical `receipts/<task-basename>.md` with task identity/path, non-empty
   exact command, successful exit/result, expected versus observed behavior,
   applicable negative/reachability proof, both provenance anchors bound to the
   runtime's expected Base/Head pair, and required SHA-256 declarations;
4. correctness/security/spec review at the selected depth;
5. a real independent audit when `needsIndependentAudit` is persisted. The
   audit must use schema version `1`, distinct reviewer and implementation
   session IDs, matching expected Base/Head binding, concrete evidence, and
   literal `verdict: "PASS"`.

`PRECHECK_FAIL` outranks no-tests. Missing, pending, marker-only, contradictory,
or placeholder proof is unfinished. `Audit: PASS` is not an independent audit.
`NO_TESTS` may be retained as a legacy diagnostic input, but it can never become
the shared completion verdict `PASS`.

## Spec compliance review

Check scope lock, requirements, design contracts, task Acceptance, Verification
Plan, runtime reachability, and artifact/provenance boundaries. A missing or orphaned
runtime deliverable is a failure even when compilation succeeds.

**Specific-task mode:** review exactly the requested task and its diff, then
stop. Do not select a next task.

**Full-feature mode:** use the cumulative feature scope only at its closeout;
intermediate synchronization does not claim feature completion. Run the Final
Integration Scout when runtime-facing surfaces exist.

## Correctness and security review

Apply only the checks relevant to the touched boundary. For logging/redaction,
check safe identifiers, quoted schemes, idempotence, and receipt secrecy. For
filesystem writes, check lexical and canonical containment, symlink rejection,
atomic same-directory replacement, cleanup, and canonical return paths. Add
auth, persistence, provider, or concurrency checks only when scope/risk requires.

## Quality cycle

```text
retry_count = 0
while closeout is not PASS:
  test owner executes required proof once
  if proof is BLOCKED: stop without blind retry
  review owner evaluates correctness/security/spec once
  if FAIL: fix only the affected scope and rerun affected proof/review
if retry_count reaches 3: stop and request user intervention
```

Only `FAIL` enters remediation. `BLOCKED` is terminal until its prerequisite
changes. `PASS_WITH_WARNINGS` is a review result only and remains unfinished;
only literal `PASS` may close when all execution and policy obligations are
complete.

## Flash Gate (`--flash`)

Use only when the flag is explicit. Skip dedicated tests, full evidence
execution, extended UI/manual checks, and review retry loops. Still perform a
cheap preflight and scope/reachability sanity check.

The flash record must contain exactly the unfinished semantics:

```text
Mode: --flash
Tests: skipped by user request
Evidence: FLASH_UNVERIFIED
Status: in_progress
Blocker: awaiting /hapo:test <feature>
Next verification: /hapo:test <feature>
```

The persisted flash input must also contain `dependencyBlocked: true`,
`unblocks: false`, and a non-placeholder blocker, and must omit
`readyForSync`, `flashTransition`, and `promotionReceipt`. Sync-finalize
rejects minimal or caller-pre-promoted states.

Terminal log:

```text
⚡ Step 4 Flash Gate: tests skipped by --flash; preflight=<pass|skipped>; evidence=FLASH_UNVERIFIED
```

Do not report `Test PASS`, `Evidence PASS`, `Auto-Approved`, or
`production-ready`. Flash never sets `done`, unblocks dependents, or promotes
from a marker. Trusted sync-finalize alone may consume a fresh canonical PASS
receipt and derive promotion.

## Closeout and docs impact

After the test receipt and review verdict are both available, the closeout owner
uses the policy adapter and synchronizes state. A review-only pass cannot close
missing execution proof. Evaluate docs impact from the actual behavior change:

- `none`: record no docs edit and stop;
- `minor` or `major`: update only affected existing docs through the normal docs
  workflow.

Do not run a docs checkpoint merely because a task completed. Do not refresh the
whole repository for a local change.

After every task receipt is valid, final integration execution creates
`feature-receipt.md` once. A task-bearing feature cannot close without all task
receipts and the feature receipt. A taskless Compact/Full feature closes from a
valid feature receipt; absence before final closeout is not a failure. Receipts
never supply or imply approval, readiness, audit status, or product semantics.

## Review threshold

`PASS` requires no Critical or High correctness/security/spec finding and no
blocking Medium finding. `PASS_WITH_WARNINGS` may carry documented non-blocking
findings. Finding count never selects review depth or overrides missing proof.
Any missing proof, unresolved obligation, scope drift, contract substitution, or
reachability failure remains unfinished regardless of review severity.

### Reachability Failure

An unmounted UI, unregistered route, uncalled service/loader, disconnected
worker/command/provider/reducer, missing artifact consumer, or other orphaned
runtime-facing output is a review failure.
