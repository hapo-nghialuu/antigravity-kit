# Execution Workflow

> Token efficiency matters — deliver high quality without wasting context.

## Phase 0: Understand

Before planning, establish project awareness:

- Read `./docs/codebase-summary.md` if it exists and is fresh (< 2 days old)
- Otherwise, generate one using `repomix` or delegate to `hapo:inspect` for scoped discovery
- Scan `./docs/code-standards.md` and `./docs/system-architecture.md` for constraints
- Identify which parts of the codebase are affected by the upcoming work

## Phase 1: Plan

- Delegate to `hapo:spec-maker` to draft an implementation plan with actionable TODO items in `./specs`
- For complex features, spawn multiple `hapo:researcher` agents in parallel to investigate different technical areas, then feed findings back into the plan
- Never start coding without a clear, reviewed plan

## Phase 2: Execute

### 2a. Implement

- Produce clean, maintainable code following the project's architectural patterns
- Modify existing files — do not create "enhanced" duplicates
- Cover edge cases and error paths
- Run compile/build after every file change to catch issues immediately

### 2b. Test

- Delegate to `hapo:test-runner` to validate the **final, production-ready code**
- Expectations for test suites:
  - Comprehensive unit coverage
  - Error scenario testing
  - Performance validation where applicable
- Absolutely **no fake data, mocks-for-passing, or temporary workarounds** to make CI green
- If tests fail: fix the root cause, re-run via `hapo:test-runner`, repeat until all pass — never end a session with red tests
- If a test failure persists after **3 fix attempts**, stop and escalate to the user with a diagnostic summary

### 2c. Review

- Once tests are green, delegate to `hapo:code-auditor` for a code quality pass
- Self-documenting code is the goal; add comments only for genuinely complex logic
- Optimize for long-term maintainability and runtime performance

## Phase 3: Integrate & Verify

- Follow the plan established by `hapo:planner` throughout integration
- Honor existing API contracts and preserve backward compatibility
- Document any breaking changes explicitly
- Delegate to `hapo:docs-keeper` to keep `./docs` in sync with the implementation

### Handling Production Issues

When bugs surface in production or CI/CD:

1. Delegate to `hapo:debugger` to analyze failures and produce a diagnostic report
2. Implement the fix based on the report
3. Delegate to `hapo:test-runner` to verify the fix
4. If new test failures appear, resolve them and loop back to **Phase 2c (Review)**
