---
name: hapo:test
description: "Execute the smallest adequate verification scope and own the canonical execution proof."
user-invocable: true
when_to_use: "Use after implementation, for a feature scope, or for an explicit test request."
category: testing
keywords: [test, unit, integration, e2e, proof]
argument-hint: "[scope|--full|--ui <url>|--ui-auth <url>|--ui-flow <url>]"
metadata:
  author: haposoft
  version: "2.0.0"
---
# Test — execution proof owner

`hapo:test` is the sole owner of canonical execution proof. It runs real
commands, records what ran, and emits the receipt consumed by closeout and
review. Review may consume that receipt but must not run tests, create a second
receipt, or claim execution proof.

## Usage

```text
/hapo:test
/hapo:test --full
/hapo:test <scope-or-path>
/hapo:test <feature-name>
/hapo:test specs/<feature>
/hapo:test --ui <url>
/hapo:test --ui-auth <url>
/hapo:test --ui-flow <url>
```

## Hard gates

- Never claim a pass without executing the relevant command.
- Never mock, stub, delete, weaken, or skip a failing assertion to obtain green.
- A missing runner, missing required command, or zero executed tests is not
  `PASS`; report the blocker and keep closeout unfinished.
- A compile/typecheck failure is a precheck failure even if no test command is
  available.
- Preserve the exact command, exit result, provenance, and artifact hashes
  required by the canonical receipt schema.

## Scope and lane

For a feature target, load `spec.json`, `requirements.md`, `design.md`, and
task evidence only when that target exists. Compare actual execution against
`scope_lock`, contracts, completion criteria, runtime reachability, and
negative-path obligations.

Choose depth from the persisted lane, risk, and blast radius:

- Direct: targeted commands and diff/runtime self-check;
- Standard: bounded affected suite and feature receipt;
- Critical: strict commands plus the independent evidence required by the
  persisted obligations.

Do not infer depth from file count or from the legacy `execution_tier`. That
field is a read-only compatibility adapter. A task bundle is not required for a
small Standard feature.

## Spec-Aware Mode

<SCOPE-GATE>
For a feature target, test only the active scope, requirements, completion
criteria, and reachable runtime surfaces. A missing or orphaned runtime surface
is a failure even when the command exits successfully.
</SCOPE-GATE>

Use blast-radius selection by default; `--full` overrides selection, not proof
requirements. Use UI checks only when a reachable UI surface is in scope.

## Execution

1. Detect the project runner and exact commands from repository files and task
   evidence. Do not invent commands.
2. Run a cheap compile/typecheck precheck where the project provides one.
3. Execute the smallest adequate unit, integration, UI, E2E, accessibility,
   performance, or security proof for the changed surface.
4. Inspect runtime reachability and declared artifacts when the task creates
   runtime-facing or generated output.
5. Preserve raw outcomes and write one canonical receipt. A receipt must not
   contain secrets or placeholder provenance.

Required proof type follows the behavior, not ceremony:

| Surface | Adequate proof |
|---|---|
| pure logic/parser/validator | unit plus negative path |
| stateful UI or module wiring | component/integration and mounted path |
| API, persistence, provider, or process boundary | real contract/state handoff |
| complete user workflow | E2E or UI flow |
| layout or responsive behavior | viewport/visual check |
| interactive focus/labels/keyboard | accessibility check |
| regression | reproduction before fix plus passing regression |
| security/performance | only when requirement, risk, or boundary requires it |

## Canonical receipt

The receipt is execution evidence, not a status marker. It must contain the
actual command, a successful exit result, both provenance anchors (`Base` and
`Head`, or their canonical aliases), and any declared artifact SHA-256. Reject
`Exit: 1`, conflicting outcomes, empty commands, placeholders, missing
provenance, zero execution, and failure summaries. No-artifact tasks remain
compatible; declared artifacts require hashes.

Closeout and flash callers must also provide an explicit runtime binding; a
valid-length `Base`/`Head` pair alone is not identity proof. The minimal adapter
contract is `const binding = policy.createReceiptBinding({ base, head })`, then
pass `receipt_binding: binding` to `completionDecision` or include the binding's
`expectedProvenance` in the flash task. The policy requires that binding and
compares both receipt anchors before completion or flash promotion.

For a normal closeout, emit a receipt that the shared policy validator accepts.
For `--flash`, emit proof for the current `FLASH_UNVERIFIED` task only. Only explicit trusted sync-finalize may promote it. The
receipt may make the task eligible for trusted sync-finalize, but it must not
promote the task, unblock dependents, or fabricate a done state.

## Verdict and handoff

The shared workflow surface is:

`PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`

Warnings describe residual, non-blocking concerns; they never replace missing
execution proof. A legacy diagnostic result such as `NO_TESTS` is normalized by
the shared adapter to an unfinished outcome and is never treated as `PASS`.

```markdown
## Test Verdict

**Status:** PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED
**Scope:** [target and selection]
**Commands:** [exact commands]
**Exit:** [actual result]
**Duration:** [measured time]
**Receipt:** [path or inline canonical receipt]

### Results
- Passed: N | Failed: N | Skipped: N | Executed: N

### Scope / reachability
- Requirements: [covered/uncovered]
- Runtime reachability: PASS | FAIL | BLOCKED
- Artifact/provenance checks: PASS | FAIL | BLOCKED

### Action
- PASS → give the receipt to the single closeout owner; only literal `PASS` can
  complete a task.
- PASS_WITH_WARNINGS → give the receipt to the closeout owner, but keep the
  task unfinished until a literal `PASS` decision is recorded.
- FAIL → list exact failures; implementation remains unfinished.
- BLOCKED → state the changed prerequisite; do not blind-retry.
```

The closeout owner calls this workflow once for the current task or feature.
Do not trigger review from inside the test workflow and do not run a duplicate
test pass merely because review is requested. Review evaluates correctness,
security, and spec compliance against this proof.

## Flash proof

When the target contains an in-progress `FLASH_UNVERIFIED` task, test only its
exact Evidence and reachability obligations. On pass, keep the task
`in_progress`, keep `FLASH_UNVERIFIED`, `dependencyBlocked: true`, and
`unblocks: false`; return canonical proof to trusted sync-finalize. On failure,
blocker, or no tests, do not promote any task.

## References

- `references/execution-strategy.md` — blast-radius and UI selection, loaded
  only when the default strategy needs detail.
- `references/failure-triage.md` — failure classification, loaded on failure.
- `references/test-memory.md` — optional historical context; current receipt
  evidence always wins.
