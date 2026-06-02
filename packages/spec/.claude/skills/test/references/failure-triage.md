# Failure Triage

Classify every test failure into a category, then apply the matching action.
Referenced by `SKILL.md` Phase 3 and by the `test-runner` agent.

---

## Failure Categories

| # | Category | Description | Source |
|---|---|---|---|
| 1 | **Compile Error** | Syntax, type, or import errors preventing test execution | Pre-flight (tsc, eslint, flake8...) |
| 2 | **Logic Error** | Test ran but assertion failed — expected vs actual mismatch | Unit / Integration test output |
| 3 | **Environment Error** | Missing env vars, DB not running, port conflict, network unreachable | Integration / E2E test output |
| 4 | **Flaky Test** | Pass/fail intermittently — indicates race condition or shared state | Observed across multiple runs |
| 5 | **Coverage Gap** | Tests pass but coverage drops below threshold | Coverage report |
| 6 | **Build Error** | Code compiles but production build fails | Build step output |
| 7 | **UI Console Error** | JavaScript errors or pageerrors captured during browser session | `console.js` output |
| 8 | **UI Network Error** | API responses with 4xx or 5xx status during page load | `network.js` output |
| 9 | **UI Performance** | Core Web Vitals exceed acceptable thresholds, or memory leak | `performance.js` |
| 10 | **Accessibility Error** | Interactive elements missing accessible names or labels | `aria-snapshot.js` |
| 11 | **User Flow Error** | E2E form submission failed, unexpected redirect | `click.js` + `fill.js` |
| 12 | **SEO Error** | Missing meta tags, H1 issues, broken canonical | `evaluate.js` |
| 13 | **Security Warning** | Missing HTTP security headers, exposed secrets | `network.js` / source |
| 14 | **Broken Links** | Internal crawler found 404s on discovered pages | Phase 0.5 Crawler |
| 15 | **UI Visual Error** | AI visual analysis detected layout break, overlap | `gemini_batch_process.py` |

---

## Triage Decision Tree

```
Failure detected
│
├─ Compile Error (#1)
│   → STOP immediately. Do NOT run further tests.
│   → Report: file, line, error message.
│   → Action: return to god-developer. Fix compile errors first.
│
├─ Logic Error (#2)
│   → Report: test name, file:line, expected value, actual value.
│   → Action: return to god-developer with precise location.
│   → Do NOT modify test to make it pass.
│
├─ Environment Error (#3)
│   → Report: which service/env var is missing.
│   → Action: escalate to USER (not god-developer).
│     "Environment issue: [DB/service] not reachable. Please start it."
│
├─ Flaky Test (#4)
│   → Report: test name + "intermittent failure observed".
│   → Action: flag for god-developer review.
│     Likely cause: shared state, async timing, or test ordering.
│
├─ Coverage Gap (#5)
│   → Report: specific uncovered files and functions (not just %).
│   → Action: flag as PARTIAL verdict. Do not block PASS.
│     "Coverage gap in: src/auth/refresh.ts — add tests for error path"
│
├─ Build Error (#6)
│   → Report: build command, error output (last 20 lines).
│   → Action: return to god-developer.
│
├─ UI Console Error (#7)
│   → Report: error message, source file, line number.
│   → Action: return to god-developer if JS error.
│     If external script error: flag as warning only.
│
├─ UI Network Error (#8)
│   → Report: endpoint URL, status code, response body excerpt.
│   → Action: 404 → god-developer (missing route/resource).
│     500 → god-developer (server error). 401/403 → auth issue (user).
│
├─ UI Performance (#9)
│   → Report: specific metric name + actual value + threshold.
│   → Action: flag as warning. Block PASS only if LCP > 4s or CLS > 0.25.
│
├─ Accessibility Error (#10)
│   → Report: element role + missing attribute.
│   → Action: return to god-developer. Add aria-label / alt / for attributes.
│
├─ User Flow Error (#11)
│   → Report: step failed (e.g., login submit), expected vs actual URL/state.
│   → Action: return to god-developer to fix E2E UI flow.
│
├─ SEO Error (#12)
│   → Report: missing tag or invalid setup (e.g., no H1, bad canonical).
│   → Action: return to god-developer. Add missing HTML meta tags.
│
├─ Security Warning (#13)
│   → Report: missing header names or exposed secret pattern.
│   → Action: return to god-developer. Add helmet/headers or remove secrets.
│
├─ Broken Links (#14)
│   → Report: crawler source URL → broken target URL (404).
│   → Action: return to god-developer to fix href paths.
│
└─ UI Visual Error (#15)
    → Report: AI parsed visual issue (e.g., button overlapping text).
    → Action: return to god-developer to fix CSS/layout issues.
```

---

## Escalation Protocol

| Failure count | Verdict | Action |
|---|---|---|
| 0 failures | **PASS** | Proceed to hapo:code-review |
| 1–2 failures | **FAIL** | Return to god-developer with targeted fix list |
| 3–10 failures | **FAIL** | Return to god-developer, flag as "significant failures" |
| > 10 failures OR 0 tests pass | **COLLAPSE** | Call `AskUserQuestion`: "Test suite critically broken. User intervention required." |
| Only coverage gaps | **PARTIAL** | Proceed to hapo:code-review, attach coverage gap list |
| Environment errors only | **BLOCKED** | Escalate to user (not god-developer) |

---

## Report Format per Failure

```markdown
### Failure N — [Category]

- **Test:** `path/to/file.test.ts:42` — TestSuiteName > TestCaseName
- **Error:** AssertionError: expected `"admin"` but received `undefined`
- **Stack:** (first 5 relevant lines only)
- **Category:** Logic Error
- **Fix:** Check return value of `getUserRole()` in `src/auth/roles.ts:88`
```
