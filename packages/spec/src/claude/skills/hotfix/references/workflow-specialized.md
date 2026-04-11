# Specialized Workflows

Targeted procedures for common bug categories. Use these as supplements to the main 6-step process (they don't replace it).

---

## CI/CD Pipeline Failures

When GitHub Actions or CI/CD is failing:

1. **Identify the failing job:** `gh run list --status failure -L 5`
2. **Pull the failure log:** `gh run view <ID> --log-failed`
3. **Common traps:**
   - Environment setup step failed silently (DB container didn't start, npm ci cache corrupted)
   - Secrets/env vars missing in the CI environment
   - Version mismatch between local Node/Python and CI runner
   - Flaky tests (passes locally, fails on CI) — check for timezone, file ordering, or race conditions
4. **Fix pattern:** Reproduce locally first. Never push blind fixes to CI.

---

## Test Suite Failures

When unit/integration/e2e tests are failing:

1. **Isolate:** Run the failing test alone: `npx jest --testPathPattern=<file> --verbose`
2. **Check for pollution:** Does it pass alone but fail in suite? → Test order dependency or shared state leaking
3. **Check for staleness:** Did the implementation change but the test assertions were not updated?
4. **Snapshot drift:** If snapshot tests fail, review the diff carefully — is it an intentional change or a regression?

---

## TypeScript Type Errors

When `tsc` is throwing type errors:

1. **Never** suppress with `any`, `@ts-ignore`, or `as unknown as X` — these are band-aids that rot
2. **Trace the type chain:** Where was the type originally defined? Follow the generic flow
3. **Common roots:**
   - Library update changed return types → check CHANGELOG/migration guide
   - Missing null check → add proper narrowing
   - Generic type inference failure → provide explicit type argument
4. **Fix pattern:** Fix the type definition at the source, not at the consumption point

---

## UI / Visual Issues

When the interface is broken, misaligned, or not rendering:

1. **Capture visual evidence:** Use `pushd skills/chrome-devtools/scripts && node screenshot.js --url <url> && popd`
2. **Check ARIA structure:** `pushd skills/chrome-devtools/scripts && node aria-snapshot.js --url <url> && popd` — reveals hidden overlays, z-index battles
3. **Check console errors:** `pushd skills/chrome-devtools/scripts && node console.js --url <url> && popd` — catches JS crashes preventing render
4. **Common traps:**
   - CSS specificity wars (use browser DevTools or ARIA snapshot to verify computed styles)
   - Hydration mismatch in SSR frameworks (server HTML differs from client render)
   - Missing responsive breakpoints (test at multiple viewport widths)
   - Z-index stacking context trapping click events

---

## Application Log Errors

When investigating production or server-side log errors:

1. **Pull wide context:** `tail -n 200 <logfile>` — don't just look at the last error line
2. **Timestamp correlation:** Cross-reference error timestamps across multiple log sources (app, DB, reverse proxy)
3. **Pattern recognition:** Is it a single occurrence or repeated? Use `grep -c` to count
4. **Common traps:**
   - Silent exception swallowing upstream (the real error was caught and logged as a warning 50 lines earlier)
   - Database connection pool exhaustion (errors appear random but correlate with connection count)
   - Memory leaks (errors start appearing after extended uptime, not immediately)
