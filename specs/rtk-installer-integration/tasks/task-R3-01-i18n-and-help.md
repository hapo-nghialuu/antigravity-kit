# Task R3-01: Localize prompt/messages, help text, and summary line

**Requirement:** R3 — Surfacing & localization
**Status:** done
**Priority:** P2
**Estimated Effort:** S
**Dependencies:** R1-01 (key `rtkConfirm` used by gate), R2-01 (status/warn keys used by phase)
**Spec:** specs/rtk-installer-integration/

## Context

- **Why**: the prompt and outcomes must be understandable in every supported locale, discoverable via `--help`, and reflected in the install summary — without overstating savings.
- **Current state**: `packages/spec/bin/lib/i18n.js` holds en/ja/vi maps (e.g. `skillDepsConfirm`); `printHelp()` and `printSummary(ctx)` live in `install.js`.
- **Target outcome**: all rtk strings exist in en/ja/vi; `--help` lists `--with-rtk`; the summary shows a one-line rtk result.

## Constraints

- **MUST**: add every new key to all three locales (no missing-key fallback).
- **MUST**: prompt copy describes token-saving for Claude Code Bash output; NO fixed percentage claims.
- **SHOULD**: keep wording parallel to existing `skillDeps*` entries for tone/format.
- **MUST NOT**: introduce a new i18n mechanism; reuse the existing maps + `ctx.t`.
- **SCOPE**: Only strings, help text, and summary wiring for R3.

## Steps

- [x] 1. Add rtk i18n keys to `packages/spec/bin/lib/i18n.js` (en/ja/vi)
  - Business intent: localized, honest prompt + outcomes.
  - Code detail: keys `rtkConfirm`, `rtkInstalling`, `rtkInstalled`, `rtkInstallFailed`, `rtkInitFailed`, `rtkNeedsJq`, `rtkFailed`, `rtkSkipped`, `rtkSummary`. `rtkConfirm` ≈ "Install rtk token-saver (compacts git/grep/ls/build output for Claude Code Bash commands)?". Support `{reason}` interpolation in `rtkFailed`/`rtkInitFailed`, `{method}` in `rtkInstalling`.
  - _Requirements: 3.1, 3.4_

- [x] 2. Update `printHelp()` in `install.js`
  - Business intent: discoverability of the non-interactive flag.
  - Code detail: add a line under Options: `--with-rtk           Install the rtk token-saver (binary + Claude Code hook). Otherwise prompted interactively.`
  - _Requirements: 3.2_

- [x] 3. Add the rtk result to `printSummary(ctx)`
  - Business intent: confirm what happened.
  - Code detail: when `setupRtk` recorded an action (`ctx.rtkSetupRan`), append `ctx.t('rtkSummary')` to the next-steps lines in the summary output.
  - _Requirements: 3.3_

- [x] 4. Verification implementation
  - Locale key-parity check + `--help` snapshot + summary line presence on an opted-in run.
  - _Requirements: 3_

## Requirements

- 3.1 — localized confirm + status/skip/done messages in en/ja/vi
- 3.2 — `--with-rtk` in `--help`
- 3.3 — one-line rtk result in summary
- 3.4 — token-saving framing, no fixed percentage claims

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/bin/lib/i18n.js` | Modify | Add rtk keys to en/ja/vi maps |
| `packages/spec/bin/install.js` | Modify | `printHelp()` line + `printSummary()` rtk result |

## Completion Criteria

- [x] All rtk keys present in en, ja, and vi (parity verified).
- [x] `--with-rtk` appears in `--help` output.
- [x] An opted-in run prints a one-line rtk summary; a skipped run does not error.
- [x] No prompt/summary string contains a fixed percentage savings claim.

## Evidence

- [x] Automated verification
  - Command(s) run:
    - `node -c packages/spec/bin/lib/i18n.js` / `install.js` / `phases/summary.js` → all exit 0
    - Key-parity script (9 keys × en/ja/vi) → `missing=0`, exit 0
    - Interpolation-token check (`{method}` in rtkInstalling, `{reason}` in rtkInitFailed/rtkFailed across 3 locales) → `bad-interp=0`, exit 0
    - `node packages/spec/bin/install.js --help | grep with-rtk` → shows `--with-rtk` line, exit 0
    - Fresh-dir `--with-rtk --yes` install → summary shows `rtk token-saver: hook registered for Claude Code Bash commands`, exit 0
    - Fresh-dir `--yes` (no flag) install → no rtk summary line (grep -c = 0), exit 0
    - Percentage-claim grep across 9 keys × 3 locales → `hits=0`, exit 0
  - Expected proof: parity 0 missing; help shows flag; summary line on opt-in; no % claim.
  - **Result: PASS** (verified 2026-06-16 by test-runner agent, 7/7 evidence + 3/3 preflight).
- [x] Artifact / runtime verification
  - Inspect: `i18n.js` en (64-72) / ja (181-189) / vi (295-303) rtk blocks; `--help` text; opted-in summary output.
  - Expect: keys present; flag documented; rtk line shown.
  - **Result: confirmed.**
- [x] Runtime reachability verification
  - Entrypoint/caller: `ctx.t('rtkConfirm')` used by R1 gate; `rtk*` status keys used by R2 phase (`setup-rtk.js`); `rtkSummary` used by `printSummary` (`summary.js:60`).
  - Expect: every added key is referenced by code (no orphaned strings).
  - **Result: confirmed** — code-auditor cross-task key-match table: all 9 keys have a caller, no orphans, no typos causing raw-key fallback.
- [x] Contract / negative-path verification
  - Check: grep new strings for "%", "percent", "60-90", "85".
  - Expect: no fixed-percentage claim (R3.4).
  - **Result: PASS** — 0 hits.

**Verification receipt (2026-06-16):** Stage A Test PASS (7/7 evidence + 3/3 preflight); Stage A Spec PASS (key-match table 9/9, no orphans); Stage B Code Quality Score 9.8/10 Critical 0 (1 Low: dry-run+opt-in summary line — not a bug, dry-run skips early; out of R3 scope). Auto-approved. Note: `pnpm install` was run once to restore a corrupted workspace node_modules (`@clack/prompts` dangling symlink) — environment fix, not a code change.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Missing key in one locale → runtime fallback | Medium | parity check in Evidence before done |
| Overstated marketing copy | Low | negative grep for percentage claims |
