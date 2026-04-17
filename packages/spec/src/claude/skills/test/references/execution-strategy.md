# Execution Strategy

Detailed instructions for how `hapo:test` and the `test-runner` agent execute
each test type. Referenced by `SKILL.md` during Phase 2.

---

## Phase A: Blast Radius Scoping (Default Mode)

When `--full` is NOT specified, narrow the test scope to only what changed:

```
1. git diff --name-only HEAD
   → List all modified files since last commit

2. For each changed file:
   a. Look for co-located test file:
      src/auth/login.ts → src/auth/login.test.ts (same dir)
   b. If not found, grep reverse import:
      grep -r "from.*login" tests/ --include="*.test.*" -l
   c. If changed file is a config (tsconfig, jest.config, package.json, .env):
      → Escalate to full suite immediately

3. Count mapped tests vs total tests:
   If mapped > 60% of total → run full suite (not worth the diff overhead)

4. Run only mapped tests.
   Report: "Blast-radius mode: N changed files → M test files mapped"

5. Flag any changed file with NO matching test:
   "[!] No tests found for `src/utils/parser.ts` — consider adding tests"
```

---

## Phase B: Code Test Execution

### Pre-flight Checks (always run first)

Catch compile errors before spending time on tests.
**HARD RULE:** Do NOT auto-install missing tooling during verification. If a required pre-flight tool (like `eslint`, `flake8`, `tsc`) is missing, stop and report it as an environment gap or missing project setup.

```bash
# JavaScript / TypeScript
npx tsc --noEmit          # Type check
npx eslint . --max-warnings 0  # Lint

# Python
python -m py_compile src/  # Syntax check
flake8 src/                # Lint

# Go
go vet ./...

# Rust
cargo check

# Flutter
flutter analyze
```

If pre-flight fails or a required tool is missing → report `Compile Error` / `Environment Gap`, do NOT proceed to test execution.

### Test Execution by Language

```bash
# JavaScript / TypeScript
npm test                        # Auto-detect npm/yarn/pnpm/bun
npm run test:coverage           # With coverage
npx vitest run --coverage       # Vitest
npx jest --coverage             # Jest

# Python
pytest                          # Basic
pytest --cov=src --cov-report=term-missing  # With coverage

# Go
go test ./... -cover -coverprofile=coverage.out

# Rust
cargo test

# Flutter
flutter test --coverage
```

### Coverage Thresholds

| Metric    | Minimum | Focus Areas                        |
|-----------|---------|------------------------------------|
| Lines     | 80%     | All business logic                 |
| Branches  | 70%     | Error paths, conditionals          |
| Functions | 80%     | Public API surfaces                |
| Priority  | —       | Auth, payment, data mutation paths |

### Build Verification (after tests pass)

```bash
npm run build          # JS/TS
go build ./...         # Go
cargo build --release  # Rust
flutter build          # Flutter
```

Check for: unresolved deps, deprecation warnings, missing env vars.

---

## Phase C: UI Verification via chrome-devtools Scripts

**Script directory:** `packages/spec/src/claude/skills/chrome-devtools/scripts/`

### Execution Model: Parallel Subagents

UI verification is split across multiple `test-runner` subagents running **in parallel** to reduce total test time. Each subagent owns a distinct scope:

```
Caller (hapo:test)
  │
  ├─ Spawn simultaneously:
  │   ├─ test-runner #1 → Phase C-pre + C-0 + C-1 + C-2 + C-3 (Auth, Smoke, Console, Network)
  │   ├─ test-runner #2 → Phase C-4 + C-5 (Performance + Screenshots)
  │   ├─ test-runner #3 → Phase C-6 + C-7 (Accessibility + SEO)
  │   ├─ test-runner #4 → Phase C-8 (Security)
  │   └─ test-runner #5 → Phase C-5b (User Flow, only if --ui-flow specified)
  │
  └─ Collect all verdicts → merge into single UI Results section
```

Each subagent must run **Phase C-pre (Lazy Install)** first before executing its assigned phases.

---

### Phase C-pre: Dependency Lazy Installation

Chrome-devtools scripts require Puppeteer & Chromium. Installed strictly on first use.

1. Check if `node_modules` exists:
   `test -d packages/spec/src/claude/skills/chrome-devtools/scripts/node_modules`
2. If NOT found:
   Log: *"Preparing UI Testing environment (first-time setup)..."*
   Run: `cd packages/spec/src/claude/skills/chrome-devtools/scripts && npm install`
   *(Downloads Puppeteer & Chromium — may take 1-2 minutes.)*
3. Proceed after successful installation.

---

### Phase C-0: Auth Injection (only for `--ui-auth`)

Ask user to log in manually and provide credentials. Then inject:

```bash
# Option A — Cookies
node inject-auth.js --url <url> \
  --cookies '[{"name":"session","value":"abc123","domain":".example.com"}]'

# Option B — Bearer token
node inject-auth.js --url <url> \
  --token "Bearer eyJhbGci..." --header Authorization

# Option C — localStorage
node inject-auth.js --url <url> \
  --local-storage '{"auth_token":"xyz","user_id":"123"}'
```

---

### Phase C-0.5: Multi-page Discovery

Before individual phase tests, crawl the site to discover all pages to test:

```bash
# Navigate root URL, collect all internal links via evaluate.js
node navigate.js --url <url> --wait-until networkidle2
node evaluate.js --script "
  Array.from(document.querySelectorAll('a[href]'))
    .map(a => a.href)
    .filter(h => h.startsWith(window.location.origin))
    .filter((v,i,a) => a.indexOf(v) === i)
" --output discovered-pages.json
```

Collects: list of all internal URLs on the site.
If discovered pages > 20: sample top 10 by depth + priority pages (homepage, auth, key flows).
Pass discovered URL list to subsequent phases — run checks on ALL discovered pages, not just the entry URL.

---

### Phase C-1: Smoke Test (navigate.js)

```bash
node navigate.js --url <url> --wait-until networkidle2
```

Collects: `{success, url, title}`
Fail if: `success: false` or unexpected redirect (e.g. to login page).

---

### Phase C-2: Console Error Audit (console.js)

```bash
node console.js --url <url> --types error,warn --duration 3000
```

Collects: `{messages[], messageCount}`
Flag as `UI Console Error` if any `type: "error"` or `type: "pageerror"` found.

---

### Phase C-3: Network Error Audit (network.js)

```bash
node network.js --url <url> --types xhr,fetch
```

Collects: request/response pairs.
Flag as `UI Network Error` if any response status is `4xx` or `5xx`.

---

### Phase C-4: Performance Metrics (performance.js)

```bash
node performance.js --url <url> --metrics
```

Collects Core Web Vitals: `LCP`, `FID`, `CLS`, `FCP`, `TTFB`, `JSHeapUsedSize`.

| Metric       | Good    | Needs Work | Poor (BLOCK) |
|--------------|---------|------------|--------------|
| LCP          | < 2.5s  | 2.5–4s     | > 4s         |
| CLS          | < 0.1   | 0.1–0.25   | > 0.25       |
| FCP          | < 1.8s  | 1.8–3s     | > 3s         |
| TTFB         | < 800ms | 800ms–1.8s | > 1.8s       |
| JSHeapUsedSize | < 50MB | 50–100MB  | > 100MB (memory leak flag) |

---

### Phase C-5: Responsive Screenshots (screenshot.js & gemini_batch_process.py)

```bash
# Capture screenshots
node screenshot.js --url <url> --output screenshots/mobile-375.png --full-page true
node screenshot.js --url <url> --output screenshots/desktop-1440.png --full-page true

# AI Visual Analysis (Delegate to hapo:ai-multimodal Hub)
pushd ../../ai-multimodal/scripts
python gemini_batch_process.py --files "../../chrome-devtools/scripts/screenshots/mobile-375.png" --task analyze --prompt "Check for layout overlap"
python gemini_batch_process.py --files "../../chrome-devtools/scripts/screenshots/desktop-1440.png" --task analyze --prompt "Check for layout overlap"
popd
```

Flag as `UI Visual Error` if the AI analysis output reports any of the following:
- Overlapping/overflowing elements (layout broken)
- Text cut off or unreadable
- Images not loading (broken img placeholders)

---

### Phase C-5b: User Flow Testing (click.js + fill.js) — `--ui-flow` only

Test critical user journeys (login, form submission, checkout flow):

```bash
# Step 1: Navigate to form page
node navigate.js --url <url>/login

# Step 2: Fill in form fields
node fill.js --selector "#email" --value "test@example.com"
node fill.js --selector "#password" --value "testpassword123"

# Step 3: Click submit
node click.js --selector "button[type=submit]"

# Step 4: Verify success state
node navigate.js --url <url>/dashboard  # Expect redirect to dashboard
node screenshot.js --output screenshots/after-login.png
node console.js --url <url>/dashboard --types error  # Should be 0 errors
```

Common flows to test:
- **Auth flow**: Login → Dashboard → Logout
- **Form submission**: Fill → Submit → Success/Error state
- **CRUD flow**: Create → Read → Update → Delete (if applicable)

Flag as `User Flow Error` if: redirect fails, form shows error, or console errors appear post-submit.

---

### Phase C-6: Accessibility Snapshot (aria-snapshot.js)

```bash
node aria-snapshot.js --url <url> --output snapshots/aria.yaml
```

Flag as `Accessibility Error` if:
- Interactive elements have no accessible name (`aria-label`, `aria-labelledby`, or visible text)
- Form inputs lack associated `<label>` elements
- Images missing `alt` text (role `img` with no name)

---

### Phase C-7: SEO Audit (evaluate.js)

Check SEO meta tags and structure via in-page JavaScript:

```bash
node evaluate.js --script "({
  title: document.title,
  description: document.querySelector('meta[name=description]')?.content,
  og_title: document.querySelector('meta[property=\"og:title\"]')?.content,
  og_image: document.querySelector('meta[property=\"og:image\"]')?.content,
  canonical: document.querySelector('link[rel=canonical]')?.href,
  h1_count: document.querySelectorAll('h1').length,
  robots: document.querySelector('meta[name=robots]')?.content,
  structured_data: !!document.querySelector('script[type=\"application/ld+json\"]')
})"
```

Flag as `SEO Error` if:
- `title` is empty or > 60 characters
- `description` is missing or > 160 characters
- `h1_count` is 0 (no H1) or > 1 (multiple H1)
- `canonical` is missing
- `og:title` or `og:image` is missing (important for social sharing)

Also check `robots.txt` and `sitemap.xml` exist:
```bash
node navigate.js --url <url>/robots.txt
node navigate.js --url <url>/sitemap.xml
```

---

### Phase C-8: Security Check (network.js + evaluate.js)

Basic client-side security checks:

```bash
# Check response headers for security headers
node network.js --url <url>

# Check for visible secrets in page source
node evaluate.js --script "
  const src = document.documentElement.innerHTML;
  const patterns = [
    /api[_-]?key\s*=\s*['\"][a-zA-Z0-9]{20,}/i,
    /secret[_-]?key\s*=\s*['\"][a-zA-Z0-9]{20,}/i,
    /Bearer\s+[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+/,
    /password\s*=\s*['\"][^'\"]{6,}/i
  ];
  patterns.map(p => ({pattern: p.source, found: p.test(src)}))
    .filter(r => r.found)
"
```

Flag as `Security Warning` if:
- Missing security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`
- API keys, secrets, or JWT tokens visible in page HTML
- Mixed content (HTTP resources on HTTPS page) detected via network audit
- `autocomplete="off"` missing on password fields

