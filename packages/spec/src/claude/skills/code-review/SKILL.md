---
name: hapo:code-review
description: "Review a change for correctness, security, and specification compliance without owning execution proof."
user-invocable: true
when_to_use: "Use for a pending diff, commit, PR, or explicitly scoped review."
category: dev-tools
keywords: [review, diff, correctness, security]
argument-hint: "[#PR | COMMIT | --pending | scope]"
metadata:
  author: haposoft
  version: "2.0.0"
---
# Code Review — correctness and compliance owner

Review evaluates correctness, security, scope, architecture, and specification
compliance. It does not execute the test suite, create a canonical execution
receipt, or turn a missing test result into a review-owned proof. `hapo:test`
owns execution proof; the single closeout owner combines both results.

## Input and depth

With no argument, review the pending diff. Supported targets are a PR, commit,
pending changes, or an explicit path. Load only the spec and references needed
for the target.

Select review depth from `assurance_level`, risk, and blast radius. Lane is a
derived view:

- Direct: targeted correctness/security/spec check;
- Standard: bounded feature review at closeout;
- Critical: independent, adversarial review covering every required obligation.

Do not use file count as the depth selector. `execution_tier` is a read-only
legacy adapter and cannot choose a review sequence. The review contract has no
fixed Light/Standard/Deep sequence.

## Review stages

### 1. Specification compliance

Compare the diff with `scope_lock`, requirements, design contracts, active task
Outcome/Scope/Anchors and Ownership/Changes/Acceptance/Dependencies/
`Verification Plan`, typed `coordination.boundaries`, and declared
runtime reachability. Identify missing behavior,
unjustified extras, contract substitution, orphaned outputs, and incorrect
completion claims. If a design image or document carries requirements, load its
multimodal reference only when needed; do not guess from a filename.

### 2. Correctness and security

Trace changed entrypoints and callers. Check boundary validation, error paths,
resource handling, race assumptions, secrets, authorization, persistence, and
failure recovery in proportion to risk. Apply YAGNI/KISS/DRY as maintainability
signals, not as a numeric score.

### 3. Adversarial checks

Try empty, malformed, unauthorized, duplicate, stale, boundary, and concurrent
inputs where the changed contract makes them relevant. For Critical obligations,
review the required independent evidence and provenance. A marker such as
`Audit: PASS` is not independent evidence.

The independent-audit proof must be a durable object with exactly
`schema_version: "1"`, distinct concrete `reviewer_session_id` and
`implementation_session_id`, `expected_provenance: { base, head }` matching the
runtime binding, concrete `evidence`, and literal `verdict: "PASS"`.
`independent: true`, `PASS_WITH_WARNINGS`, missing binding, or reused session
provenance is insufficient.

## Execution-proof boundary

Consume the current canonical receipt when available and report its identity,
scope, and caveats. Never rerun commands to manufacture proof. If execution
proof is missing, say `execution proof unavailable` and leave the overall
closeout to the test owner; do not claim PASS on the feature from review alone.
A review can still return a correctness verdict when its review inputs are
complete.

For new tasks, read proof from `receipts/<task-basename>.md`; use legacy task
`## Evidence` only as fallback. If both exist and their proof identities
conflict, fail closed. At feature closeout also consume `feature-receipt.md`.
Receipt validity never supplies approval, readiness, audit status, or product
semantics.

## Verdict

Use the shared adapter surface exactly:

`PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`

Legacy adapter inputs may include `PASS | FAIL | BLOCKED`, but they are
normalized to the shared surface and no second enum is allowed. `PASS` means no
Critical/High correctness, security, or compliance finding. `PASS_WITH_WARNINGS`
means only documented non-blocking findings remain. `FAIL` requires remediation;
`PASS` also requires no blocking Medium finding. `PASS_WITH_WARNINGS` may carry
documented non-blocking findings. Finding count never selects depth or overrides
missing execution proof. A review `PASS_WITH_WARNINGS` remains an unfinished
closeout result; only literal `PASS` can finish a task. `BLOCKED` means the review input or a user-owned
decision is unavailable.

```markdown
# Code Review Results [hapo:code-review]

**Verdict:** PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED
**Target:** [PR | Commit | Path]
**Assurance / risk:** [canonical policy input and relevant signals]
**Execution proof:** consumed | unavailable (owned by hapo:test)

## Findings
- [Critical|High|Medium|Low] path:line — issue, failure scenario, evidence,
  and fix boundary.

## Decision
- Scope/spec compliance: PASS | WARN | FAIL
- Correctness/security: PASS | WARN | FAIL
- Reachability/provenance review: PASS | WARN | FAIL
```

Do not add a test command, a fabricated receipt, or an `Audit: PASS` marker to
make the review look complete. Return unresolved questions at the end.

## References

- `references/spec-compliance-review.md` — load for detailed scope checks.
- `references/pre-landing-checklists.md` — load for the selected risk surface.
- `references/adversarial-review.md` — load for Critical/adversarial depth.
- `references/verification-gate.md` — receipt consumption only; execution stays
  with `hapo:test`.
