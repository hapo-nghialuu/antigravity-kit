---
name: hapo:test
description: "Run and verify project tests across all scopes: unit, integration, e2e, and UI. Blast-radius scoping for speed, chrome-devtools for UI verification, structured verdicts for downstream automation."
argument-hint: "[scope|--full|--ui <url>|--ui-auth <url>|--ui-flow <url>]"
version: 2.0.0
---

# Test — Verify Implementation Quality

Run the project's test suite, analyze results, and return a structured verdict.
Designed to work **after `hapo:develop`**. Standalone `/hapo:test` uses the same `test-runner` contract that `hapo:develop` relies on during its Quality Gate, and may run **in parallel with `hapo:code-review`**.

**Principles:** Fail-fast | Blast-radius scoping | Zero hidden failures | No mocking to pass

## Usage

```bash
/hapo:test                    # Blast-radius mode: only tests affected by recent changes
/hapo:test --full             # Run full test suite regardless of changes
/hapo:test <scope>            # Test a specific module or path
/hapo:test --ui <url>         # UI verification via chrome-devtools (public pages)
/hapo:test --ui-auth <url>    # UI verification with auth injection (protected pages)
/hapo:test --ui-flow <url>    # UI testing with User Journey (form fill/submit simulation)
```

<HARD-GATE>
NEVER claim tests pass when they were NOT actually executed.
NEVER mock, stub, or skip a failing test to produce a green result.
If no test command is detected, report NO_TESTS — do not fabricate results.
If tests fail, list every failure explicitly — do not summarize failures away.
</HARD-GATE>

## 4-Phase Execution

```mermaid
flowchart TD
    A["/hapo:test"] --> B[Phase 1: Detect]
    B --> C{Test runner found?}
    C -->|No| Z[STOP: Verdict = NO_TESTS]
    C -->|Yes| D[Phase 2: Execute]
    D --> E{--ui / auth / flow?}
    E -->|Yes| F["UI Verification (Parallel Subagents)"]
    E -->|No| G[Code Tests (Blast Radius)]
    F --> H[Phase 3: Verdict]
    G --> H
    H --> I[Phase 4: Sync Memory]
    I -->|PASS| J[Hand off to hapo:code-review]
    I -->|FAIL| K[Load failure-triage.md → classify → escalate]
```

### Phase 1 — Detect

Auto-detect the test runner from project files:
- `package.json` → npm/yarn/pnpm/bun test, jest, vitest, mocha
- `pyproject.toml` / `setup.cfg` → pytest
- `go.mod` → go test
- `Cargo.toml` → cargo test
- `pubspec.yaml` → flutter test

Unless `--full` is specified: apply **Blast Radius scoping** to run only tests
affected by recent file changes. See `references/execution-strategy.md` Phase A.

### Phase 2 — Execute

**Code testing (default):**
1. Pre-flight: run typecheck/lint to catch compile errors first
2. Execute test command with coverage flags
3. Collect results, coverage percentages, and fail stack traces

**UI verification (`--ui` / `--ui-auth` / `--ui-flow`):**
Execute multi-page discovery, then spawn **Parallel UI Subagents** (test-runner instances) to handle Smoke, Core-Vitals, Accessibility, SEO, Security, and User Flows simultaneously.
See `references/execution-strategy.md` Phase C for full phase breakdown.

Delegate execution to `test-runner` agent:
```
Task(subagent_type="test-runner",
  prompt="Run tests. Scope: [blast-radius|full|ui]. Target: [path|url]. Return structured verdict.",
  description="Test [feature]")
```

### Phase 3 — Verdict

Return a **structured verdict** (required format — not free-form prose):

```markdown
## Test Verdict

**Status:** PASS | FAIL | PARTIAL | NO_TESTS
**Scope:** blast-radius (N/M tests) | full-suite (N tests) | ui-check
**Duration:** Xs

### Results
- Passed: N | Failed: N | Skipped: N

### Coverage (if applicable)
| Metric    | Result | Threshold | Status    |
|-----------|--------|-----------|-----------|
| Lines     | X%     | 80%       | PASS/FAIL |
| Branches  | X%     | 70%       | PASS/FAIL |
| Functions | X%     | 80%       | PASS/FAIL |

### Failures (if any)
1. `path/to/file.test.ts:42` — AssertionError: expected X but got Y — Category: Logic Error

### UI Results (if --ui)
- Console errors: N found | none
- Network errors (4xx/5xx): N found | none
- Performance: LCP Xms | CLS X | FCP Xms
- Accessibility issues: N found | none
- Screenshots: [paths]

### Test Regression Check
- **Comparison:** Compare current test count and assertion depth against previous runs.
- **Result:** OK | REGRESSION (tests deleted/weakened)

### Action
- PASS → Proceed. Hand off to hapo:code-review.
- FAIL → [list specific fixes needed] → Return to god-developer. (If REGRESSION: label "Test Regression — tests were deleted or weakened to produce green result")
- PARTIAL → [list uncovered areas] → Consider adding tests.
- NO_TESTS → No test runner detected. User must configure tests first.

<lessons_learned>
{
  "flaky_tests_added": []
}
</lessons_learned>
```

### Phase 4 — Sync Memory

After receiving the verdict from `test-runner`, the orchestrator (`hapo:test`) intercepts the `<lessons_learned>` block.
It merges the JSON data into `.hapo/test-memory.json` per `references/test-memory.md` to ensure that future runs remember flaky tests or environment setup requirements without modifying the codebase.

## Skill Interconnections

| Skill / Agent | Direction | Role |
|---|---|---|
| `hapo:code-review` | runs in parallel | Both run at Quality Gate Step 4 |
| `hapo:develop` | orchestrates | Spawns hapo:test at Step 4 |
| `inspector` agent | hapo:test → | Scout test file locations when structure is unfamiliar |
| `god-developer` agent | hapo:test → | FAIL verdicts route back here for fixing |
| `test-runner` agent | hapo:test → | Primary executor, spawned via Task tool |
| chrome-devtools scripts | test-runner → | UI verification (navigate, screenshot, console, network, performance, aria-snapshot, inject-auth) |

## References

- `references/execution-strategy.md` — Blast-radius algorithm, auto-detect logic, UI verification phases (A–E)
- `references/failure-triage.md` — Failure categories, triage decision tree, escalation rules

## Related

- Previous skill: `hapo:develop`
- Parallel skill: `hapo:code-review`
- Parent workflow: `hapo:develop` Step 4 Quality Gate
