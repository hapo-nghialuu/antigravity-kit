---
name: hapo:hotfix
description: "ALWAYS activate this skill when you are asked to FIX a bug, error, test failure, CI/CD issue, type error, lint error, log error, UI issue, or code problem. Uses hapo:debug for evidence-first diagnosis before any code change."
user-invocable: true
when_to_use: "Invoke to fix a bug or failure with scout-first diagnosis before change."
category: dev-tools
keywords: [hotfix, fix, bug, diagnosis]
argument-hint: "[issue] --quick|--parallel|--from-debug"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Hotfix - Structured Bug Elimination

Kill bugs systematically. No guessing. Evidence first, fix second.

## Arguments

- `--quick` - Reduced-depth path for trivial issues (lint, type errors, syntax); still scout-first
- `--parallel` - Spawn multiple `god-developer` agents for independent issues
- `--from-debug` - Start from an existing `hapo:debug` report and validate its root-cause contract

Default: deterministic scout-first hotfix. There is no initial mode selection step.

<HARD-GATE>
Do NOT propose or implement fixes before completing Steps 1-2 (Scout + `hapo:debug` diagnosis).
Symptom fixes are FAILURE. Find the root cause first.
The exact root-cause contract is mandatory: symptom, reproduction, expected/actual, root cause file:line or config/env source, why now, evidence chain, blast radius.
The side-effect gate is mandatory before completion.
If 3+ fix attempts fail → STOP. Question the architecture. Discuss with user.
Exception: `--quick` mode only abbreviates depth; it never skips scout, pre-fix evidence, diagnosis, or before/after verification.
</HARD-GATE>

<HARD-GATE-SCOUT-FIRST>
Hotfix ALWAYS scouts before asking broad clarification questions, forming hypotheses, or changing files.
Collect these scout outputs first:
1. Project type, language(s), framework(s), and package/test runner from repo files.
2. Exact file(s) where the symptom surfaces and their direct callers/dependents.
3. Related tests covering the affected area.
4. Recent commits touching affected files: `git log --oneline -10 -- <affected-files>`.
5. Existing patterns/conventions for this kind of fix.
Then state a concise 3-6 bullet codebase-context summary before Step 2.
</HARD-GATE-SCOUT-FIRST>

<HARD-GATE-NO-SIDE-EFFECTS>
The fix is not done until Step 5 proves:
1. The original symptom no longer reproduces with the exact pre-fix command/user flow.
2. Modified files and transitively affected modules still pass relevant tests.
3. Blast-radius workflows have no business-logic regression.
4. No new lint/type/build errors were introduced.
5. Public contracts are unchanged unless intentionally called out: function signatures, exported types, response shapes, DB schemas, env vars.

If verification reveals a side effect or regression, STOP and present 2-4 concrete options to the user:
- Revert this fix and try a different root-cause angle.
- Narrow the fix scope to remove the regression.
- Keep the fix and update named dependent files/contracts.
- Accept the behavior change intentionally.
Do not silently patch around the regression.
</HARD-GATE-NO-SIDE-EFFECTS>

## Anti-Rationalization

| Thought | Reality |
|---------|---------|
| "I can see the problem, let me fix it" | Seeing symptoms ≠ understanding root cause. Scout first. |
| "Quick fix for now, investigate later" | "Later" never comes. Fix properly now. |
| "Just try changing X" | Random fixes waste time and create new bugs. Diagnose first. |
| "It's probably X" | "Probably" = guessing. Use structured diagnosis. |
| "One more fix attempt" (after 2+) | 3+ failures = wrong approach. Question architecture. |
| "Quick mode means skip process" | Quick mode only reduces depth. Scout, diagnosis, and before/after proof remain mandatory. |

## Process Flow

```mermaid
flowchart TD
    A[Issue Input] --> B[Step 1: Scout via hapo:inspect]
    B --> C[Step 2: Diagnose via hapo:debug]
    C --> D[Step 3: Classify Complexity]
    D -->|Trivial| E[Quick Fix after scout+diagnose]
    D -->|Standard| F[Standard Fix]
    D -->|Complex| G[Deep Fix + Subagents]
    D -->|Multiple Issues| H[Parallel Fix]
    E --> I[Step 4: Implement Fix]
    F --> I
    G --> I
    H --> I
    I --> J[Step 5: Verify + Prevent]
    J --> N[Side-Effect Gate]
    N -->|Pass| K[Step 6: Finalize]
    N -->|Regression Risk| C
    J -->|Fail, <3 attempts| C
    J -->|Fail, 3+ attempts| L[Question Architecture → Discuss with User]
    K --> M[Report + Commit]
```

**This diagram is the authoritative workflow.** If prose conflicts with this flow, follow the diagram.

---

## Step 1: Scout (MANDATORY — never skip)

**Purpose:** Understand the affected codebase BEFORE forming any hypotheses.

**Action:** Activate `hapo:inspect` skill to map the blast radius.

Do not ask generic questions before this step unless there is no repo, no error text, and no observable artifact to inspect.

| Path | Scout Depth |
|------|-------------|
| `--quick` | Minimal — project type, affected file(s), direct callers/dependents, related tests, recent commits |
| Standard | Full — project type, module boundaries, test coverage, call chains, recent changes, existing patterns |
| `--parallel` | Per-issue independent scouts |

**Checklist:**
- [ ] Project type, language, framework, package manager, and test runner identified
- [ ] Affected files identified
- [ ] Direct callers/dependents mapped (imports/exports, route registrations, provider wiring, consumers)
- [ ] Related tests located
- [ ] Recent git changes checked: `git log --oneline -10 -- <affected-files>`
- [ ] Existing local patterns for this code path identified
- [ ] 3-6 bullet codebase-context summary reported before diagnosis

**Output:** `✓ Step 1: Scouted — [N] files mapped, [M] dependencies, [K] tests found`

---

## Step 2: Diagnose via `hapo:debug` (MANDATORY — never skip)

**Purpose:** Evidence-based root cause analysis. NO guessing.

Use `hapo:debug` or validate an existing debug report when `--from-debug` is provided. See `references/diagnosis-protocol.md` for full methodology.

**Mandatory chain:**
1. **Capture pre-fix state:** Record exact error messages, failing test output, stack traces. This is your baseline for Step 5.
2. **Observe:** Read the actual error. Where does it occur? When did it start? (`git log -p`)
3. **Hypothesize:** Form 2-3 hypotheses through structured reasoning:
   ```
   Hypothesis: [statement]
   Confirm if: [what evidence would prove it]
   Refute if: [what evidence would disprove it]
   Quick test: [how to verify fast]
   ```
4. **Test:** Use `Grep`, `Read`, or spawn parallel `Explore` subagents to validate each hypothesis against codebase evidence.
5. **Trace root cause:** Follow the chain backward — symptom → immediate cause → contributing factor → **ROOT CAUSE**.
6. **Escalate:** If 2+ hypotheses fail, apply Inversion Thinking (see `references/escalation-tactics.md`).

**Exact root-cause contract:**
- Symptom: exact observable failure
- Reproduction: command, user flow, CI job, log trigger, or route
- Expected vs actual behavior
- Root cause: file:line, config, environment, dependency, or data source
- Why now: recent change, dependency drift, data state, environment, timing, or load
- Evidence chain: observations proving the cause
- Blast radius: affected files, modules, tests, users, workflows, or release paths

If any field is vague (`probably`, `maybe`, `I think`, or missing file:line/config/env evidence), keep diagnosing or ask the user for the specific missing artifact. Do not implement.

**Output:** `✓ Step 2: Diagnosed — Root cause: [summary], Evidence: [brief], Scope: [N files]`

---

## Step 3: Classify Complexity

| Level | Indicators | Workflow |
|-------|------------|----------|
| **Trivial** | Single file, clear error, type/lint/syntax | Quick: straight to fix |
| **Standard** | Multi-file, root cause identified via diagnosis | Standard: fix + regression test |
| **Complex** | System-wide, architecture impact, unclear boundaries | Deep: research + plan + fix |
| **Parallel** | 2+ independent issues OR `--parallel` flag | Spawn `god-developer` agents per issue |

**Task Orchestration (Standard+ only):**
- Use `TaskCreate` with dependencies to track fix phases
- Skip for Trivial (overhead exceeds benefit)
- If `TaskCreate` / `TaskUpdate` are unavailable, use a concise markdown checklist or `TodoWrite` fallback. Do not block the hotfix because structured task tools are missing.

**Output:** `✓ Step 3: [Complexity] detected — [workflow] selected`

---

## Step 4: Implement Fix

**Rules:**
- Fix the ROOT CAUSE, not the symptom. Follow diagnosis findings.
- Minimal changes only. Follow existing code patterns.
- One logical change per commit boundary.

### Quick Workflow
1. Apply the minimal fix directly from completed scout + diagnosis
2. Run exact pre-fix command plus typecheck/lint immediately
3. Report before/after proof

### Standard Workflow
1. Implement fix targeting root cause
2. Add/update regression test that fails without fix, passes with it
3. Run full test suite

### Deep Workflow
1. **Parallel investigation:** After initial scope is known, gather evidence in parallel — Scout (`hapo:inspect`), Diagnose (`hapo:debug`), and Research (`researcher` subagent) can run concurrently. See `references/parallel-patterns.md` Pattern E.
2. Synthesize findings from all three into a unified fix approach
3. Plan the fix (consider writing to `references/` for future use)
4. Implement in stages, verifying each stage
5. Comprehensive regression tests

### Parallel Workflow
1. Create separate `TaskCreate` per independent issue
2. Spawn `god-developer` subagents — one per issue
3. Each agent follows Steps 1-5 independently
4. Aggregate results upon completion

**Output:** `✓ Step 4: Fixed — [N] files changed`

---

## Step 5: Verify + Prevent (MANDATORY — never skip)

**Purpose:** Prove the fix works AND prevent the same bug class from recurring.

**Mandatory chain:**
1. **Iron-law verification:** Run the EXACT commands from pre-fix state capture (Step 2). Compare output. NO claims without fresh terminal evidence.
2. **Regression test:** The test MUST fail without the fix and pass with it.
3. **Parallel verification:** Run typecheck + lint + build + test simultaneously via `Bash`. See `references/parallel-patterns.md` Pattern C.
4. **Prevention guard (Standard+ only):** See `references/prevention-gate.md`.
5. **Side-effect gate:** Sweep the full blast radius identified in Step 2:
   - Modified files and direct dependents pass relevant tests
   - Affected user/API/CLI workflows still work
   - Public contracts unchanged unless intentionally called out
   - No new lint/type/build errors
6. **Code review:** Trigger `hapo:code-review`; never auto-approve blocking security, auth, data-loss, resource-exhaustion, or public-contract issues.

**If verification fails:**
- < 3 attempts → Loop back to Step 2 (re-diagnose with new evidence)
- 3+ attempts → STOP. Question architecture. Discuss with user.

**If a side effect appears:**
- STOP and present concrete options to the user. Do not silently broaden the fix.

**Output:** `✓ Step 5: Verified + Prevented — [before/after comparison], [N] tests added`

---

## Step 6: Finalize (MANDATORY — never skip)

1. **Report:** Confidence score, root cause, changes made, files affected, prevention measures, side-effect sweep result
2. **Docs update:** If API/behavior changed → delegate to `docs-keeper` subagent
3. **Task cleanup:** `TaskUpdate` → mark all tasks `completed` (skip if no tasks created)
4. **Commit:** Ask user if ready to commit via `git-ops` subagent

**Output:** `✓ Step 6: Complete — [action taken]`

---

## Output Format

Unified step markers (emit after each step):
```
✓ Step 1: Scouted — [N] files, [M] deps
✓ Step 2: Diagnosed — Root cause: [summary]
✓ Step 3: [Complexity] detected — [workflow] selected
✓ Step 4: Fixed — [N] files changed
✓ Step 5: Verified + Prevented — [tests added], [guards added]
✓ Step 6: Complete — [action taken]
```

## Subagent Usage

| Subagent | When |
|----------|------|
| `hapo:debug` | Mandatory diagnosis gate before code edits (Step 2) |
| `debugger` | Root cause unclear, need deep systematic investigation (Step 2) |
| `Explore` (parallel) | Scout multiple areas (Step 1), test hypotheses (Step 2) |
| `Bash` (parallel) | Verify: typecheck + lint + build + test (Step 5) |
| `researcher` | External docs needed (Deep workflow only) |
| `test-runner` | After fix, verify correctness (Step 5) |
| `hapo:code-review` | After fix, quality check (Step 5) |
| `git-ops` | Commit changes (Step 6) |
| `docs-keeper` | Update docs if behavior changed (Step 6) |
| `god-developer` | Parallel independent issues (each gets own agent) |

## Specialized Paths

Use `references/workflow-specialized.md` as an overlay after Step 1 scout:
- CI/CD failures
- Test suite failures
- TypeScript type errors
- UI / visual issues
- Application log errors

Specialized paths do not replace the 6-step hotfix process.

## References

Load as needed:
- `references/diagnosis-protocol.md` — Structured root cause analysis methodology
- `references/escalation-tactics.md` — What to do when hypotheses fail (Inversion, Scale Game)
- `references/prevention-gate.md` — Defense-in-depth validation after fix
- `references/review-cycle.md` — Review handling and required user-pause conditions
- `references/parallel-patterns.md` — Parallel Explore/Bash/Task coordination with code templates
- `references/workflow-specialized.md` — CI/CD, test, TypeScript, UI-specific workflows
