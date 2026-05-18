---
name: hapo:debug
description: "Use before fixing any bug, failing test, CI/CD failure, production incident, performance issue, UI regression, flaky test, or unexpected behavior. Diagnostic-only root-cause workflow with evidence, hypotheses, blast-radius mapping, and verification plan."
argument-hint: "[issue] --quick|--ci|--frontend|--perf"
version: "1.0.0"
---

# Debug - Evidence-First Root Cause Analysis

Debugging is diagnosis, not repair. Find the source of the failure before changing product code.

## Arguments

- `--quick` - Abbreviated path for syntax, lint, type, or single-test failures with obvious local scope
- `--ci` - Focus on CI/CD logs, runner environment, dependency versions, and pipeline setup
- `--frontend` - Include browser console, screenshot, accessibility tree, network, and responsive checks
- `--perf` - Include baseline measurements, bottleneck layer, profiling, and before/after targets

Default: systematic diagnosis with no product-code edits.

<HARD-GATE>
Do NOT implement a fix inside `hapo:debug`.
Do NOT recommend a fix until the root-cause contract is complete.
Do NOT stop at the first plausible explanation. Test hypotheses against evidence.
If 2+ hypotheses are refuted, change strategy before continuing.
If evidence is insufficient, report `Root cause: unknown` with the missing evidence needed.
</HARD-GATE>

Temporary instrumentation is allowed only when it is the minimal way to observe hidden state. Remove it before finishing and report what was instrumented.

## Process Flow

```mermaid
flowchart TD
    A[Issue Input] --> B[Step 1: Scout via hapo:inspect]
    B --> C[Step 2: Capture Evidence]
    C --> D[Step 3: Pattern Analysis]
    D --> E[Step 4: Hypothesis Tests]
    E --> F[Step 5: Root Cause Trace]
    F --> G[Step 6: Blast Radius + Verification Plan]
    G --> H[Diagnostic Report]
    H --> I{Fix requested?}
    I -->|Yes| J[Hand off to hapo:hotfix]
    I -->|No| K[Stop after diagnosis]
```

**This diagram is the authoritative workflow.** `hapo:debug` stops at diagnosis unless the user explicitly asks to fix.

---

## Step 1: Scout

Understand the affected code before forming hypotheses.

**Action:** Activate `hapo:inspect` for the relevant scope.

**Checklist:**
- [ ] Affected files and modules identified
- [ ] Direct dependencies and call paths mapped
- [ ] Related tests located
- [ ] Recent changes checked: `git log --oneline -10 -- <affected-files>`
- [ ] Existing working examples or adjacent patterns identified

**Output:** `✓ Step 1: Scouted - [N] files, [M] deps, [K] tests`

---

## Step 2: Capture Evidence

Create a baseline that can later prove whether the issue changed.

**Capture:**
- Exact command, URL, user flow, or trigger
- Exact error message, stack trace, failing assertion, or visual symptom
- Expected vs actual behavior
- Relevant logs with timestamps
- Environment facts: runtime, dependency versions, OS, browser, CI runner, config
- Whether the issue reproduces consistently or intermittently

For frontend issues, use `references/debugger/frontend-verification.md`.
For CI/log issues, use `references/debugger/log-ci-analysis.md`.
For performance issues, use `references/debugger/performance-diagnostics.md`.

**Output:** `✓ Step 2: Evidence captured - baseline command/symptom recorded`

---

## Step 3: Pattern Analysis

Before proposing a cause, compare against known-good patterns.

**Check:**
- Similar implementation that works
- Similar tests that pass
- Recent code that changed the same contract
- Config/env differences between passing and failing contexts
- Dependency/API contract changes

**Output:** `✓ Step 3: Patterns compared - [working reference] vs [failing path]`

---

## Step 4: Hypothesis Tests

Create 2-3 competing hypotheses. Test one variable at a time.

```text
Hypothesis: [statement]
Confirm if: [evidence that proves it]
Refute if: [evidence that disproves it]
Quick test: [command/search/log/query]
Result: confirmed | refuted | inconclusive
```

Rules:
- Never batch unrelated changes as a test.
- Prefer read-only evidence: logs, grep, stack traces, DB queries, browser traces.
- For flaky async tests, use `references/debugger/condition-based-waiting.md`.
- If 2+ hypotheses are refuted, use inversion: ask what evidence would make the current explanation impossible.

**Output:** `✓ Step 4: Hypotheses tested - [confirmed/refuted counts]`

---

## Step 5: Root Cause Trace

Trace backward from symptom to origin.

```text
Symptom
  <- immediate cause
    <- contributing factor
      <- ROOT CAUSE
```

**Exact root-cause contract:**
- Symptom: exact observable failure
- Reproduction: command/user flow/log trigger
- Expected vs actual behavior
- Root cause: file:line or config/env source
- Why now: recent change, data state, dependency, environment, timing, or load factor
- Evidence chain: observations that prove this cause
- Blast radius: files/modules/tests/users/workflows affected

**Output:** `✓ Step 5: Root cause traced - [file:line/config/env]`

---

## Step 6: Blast Radius + Verification Plan

Prepare the handoff to `hapo:hotfix` or the user.

**Verification plan must include:**
- Original failing command or reproduction path
- Targeted regression test or scenario
- Affected-module tests
- Typecheck/lint/build commands when relevant
- UI screenshot/console/network checks when relevant
- Side-effect sweep from `references/debugger/side-effect-gate.md`

**Output:** `✓ Step 6: Verification planned - [commands/scenarios]`

---

## Diagnostic Report Format

```markdown
## Debug Report

**Issue:** [one-line summary]
**Mode:** quick | standard | ci | frontend | perf
**Root cause confidence:** high | medium | low | unknown

### Root Cause Contract
- Symptom:
- Reproduction:
- Expected:
- Actual:
- Root cause:
- Why now:
- Evidence chain:
- Blast radius:

### Hypotheses Tested
1. [confirmed/refuted/inconclusive] [hypothesis] - [evidence]

### Verification Plan
- Original reproduction:
- Regression guard:
- Side-effect sweep:

### Recommended Fix Direction
[Smallest root-cause fix, or "insufficient evidence"]

### Unresolved Questions
- [Only if any]
```

## Relationship To Hotfix

- Use `hapo:debug` to determine what is wrong.
- Use `hapo:hotfix` to change code after the root-cause contract is complete.
- If `hapo:hotfix` verification fails, return to `hapo:debug` with the new evidence.

## References

Load as needed:
- `references/debugger/core-philosophy.md` - Anti-guessing discipline
- `references/debugger/root-cause-tracing.md` - Backward trace to origin
- `references/debugger/verification-protocol.md` - Fresh evidence requirements
- `references/debugger/log-ci-analysis.md` - Logs and CI/CD failure analysis
- `references/debugger/parallel-agent-hydration.md` - Parallel reconnaissance
- `references/debugger/frontend-verification.md` - Browser/UI verification
- `references/debugger/performance-diagnostics.md` - Performance investigation
- `references/debugger/condition-based-waiting.md` - Flaky async test diagnosis
- `references/debugger/side-effect-gate.md` - Regression and blast-radius checks
