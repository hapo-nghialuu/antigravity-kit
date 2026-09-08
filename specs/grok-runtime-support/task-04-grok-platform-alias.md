# Task 04 — `--platform grok` installs the Claude runtime and asks for trust

Status: pending

## Outcome
`npx @haposoft/cafekit --platform grok` resolves to the Claude platform: the install lands under `.claude/` exactly as `--platform claude` would, no `.grok/` directory is created, and one localized line tells the user that grok reads this install through its Claude compatibility and that project hooks run only after `grok --trust` or `/hooks-trust`. Nothing about automatic detection changes.

## Scope
- In: a platform alias table in `bin/lib/context.js` (`grok` → `claude`); its application in `bin/phases/select-platform.js` on `ctx.options.platforms` **before** the language step reads them, followed by a second deduplication so `--platform grok,claude` installs once; one notice string in the three locales of `bin/lib/i18n.js`, printed by `select-platform.js` only when the alias was used.
- Out: a `PLATFORMS.grok` entry, a `.grok/cafekit.json`, any file under `.grok/`, writing `~/.grok/config.toml`, interactive prompt changes beyond accepting the alias, and — by C2 finding 11 — **any detection hint**: adding `.grok` to Claude's `detectFiles` would make a repository that only uses grok install a full `.claude/` tree unattended, since `PLATFORMS.claude` currently has no `detectFiles` and falls back to `['.claude']`.

## Coverage
- CP-04

## Ownership
- Modify: `packages/spec/bin/lib/context.js`, `packages/spec/bin/phases/select-platform.js`, `packages/spec/bin/lib/i18n.js`
- Create: `packages/spec/bin/__tests__/grok-platform.test.js`
- Read: `packages/spec/bin/install.js`, `packages/spec/bin/phases/summary.js`, `packages/spec/bin/phases/write-metadata.js`

## Acceptance
- AC-05 as stated in `plan.md`.
- **The alias resolves before language selection.** `select-platform.js` filters `ctx.options.platforms` through `PLATFORMS[key]` when choosing which installed runtime to read a saved locale from; an unresolved `grok` makes that list empty and the fallback scans every platform folder, so `--platform grok` in a project that also has `.codex/` would silently take Codex's language. The alias is applied to `ctx.options.platforms` upstream of that filter, and the unknown-platform rejection stays reachable for genuinely unknown values.
- **`select-platform.js` prints the notice**, not `summary.js`; it already prints platform-selection lines and owns the moment the alias is known. Exactly one notice per install, in the language selected by `--lang`, naming both `grok --trust` and `/hooks-trust`.
- An install with `--platform claude` prints no grok notice, so the alias leaves the Claude path unchanged.

## Dependencies
- task-02-route-hooks-through-reader.md

## Verification Plan
- Command: `node --test bin/__tests__/grok-platform.test.js`
- Named probe: `--platform grok installs the Claude runtime and no .grok directory`, `the trust reminder is printed once in the selected language`, `grok and claude together install once`, `a plain claude install prints no grok notice`, `a grok-only project is not auto-detected as a Claude install`, `an unknown platform is still rejected`.
- Reachability: known — the real installer runs into a temp git repository, the technique `omp-runtime.test.js` uses.
- Oracle: `.claude/cafekit.json` records `platform: claude`; `fs.existsSync('.grok')` is false; stdout matches the localized notice exactly once; a single Claude summary line for `grok,claude`; a non-interactive run in a repository holding only `.grok/` creates no `.claude/`.
- Counterexample: registering `grok` as its own `PLATFORMS` entry must fail the no-`.grok` case; applying the alias after the language filter must fail the selected-language case; adding `.grok` to `detectFiles` must fail the auto-detect case; printing the notice unconditionally must fail the plain-claude case.
- Artifacts: ephemeral, removed in `finally`.

## Receipt
