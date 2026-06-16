# Task R1-01: Add `--with-rtk` flag and consent gate

**Requirement:** R1 — Opt-in trigger (flag + prompt)
**Status:** done
**Priority:** P2
**Estimated Effort:** S
**Dependencies:** none
**Spec:** specs/rtk-installer-integration/

## Context

- **Why**: rtk installs a third-party binary; the installer must obtain explicit consent (flag or affirmative prompt) and must skip silently in CI.
- **Current state**: `packages/spec/bin/lib/context.js` parses installer flags (`--with-skills-deps` → `args.withSkillsDeps`); `phases/skills-setup.js` has the `shouldRun(ctx)` opt-in pattern to mirror.
- **Target outcome**: `ctx.options.withRtk` exists, and a reusable `shouldRunRtk(ctx)` returns the correct boolean for flag / interactive-yes / interactive-no / CI / dry-run.

## Constraints

- **MUST**: default OFF; CI/non-interactive without flag ⇒ false; never prompt when `--with-rtk` is set.
- **SHOULD**: reuse `ctx.ui.confirm({ message, initialValue:false }, false)` exactly as skills-setup does.
- **MUST NOT**: install anything in this task; this is gating only.
- **SCOPE**: Implement only R1; no binary/hook work (that is R2).

## Steps

- [x] 1. Add `--with-rtk` parsing in `packages/spec/bin/lib/context.js`
  - Business intent: let users/CI opt in non-interactively.
  - Code detail: initialize `withRtk: false` in the options object next to `withSkillsDeps`; add `else if (arg === '--with-rtk') { args.withRtk = true; }` in the same arg loop.
  - _Requirements: 1.5_

- [x] 2. Implement `shouldRunRtk(ctx)` in new `packages/spec/bin/phases/setup-rtk.js`
  - Business intent: single decision point for consent.
  - Code detail: `if (ctx.dryRun) return false; if (ctx.options.withRtk) return true; if (!ctx.interactive) return false; const yes = await ctx.ui.confirm({ message: ctx.t('rtkConfirm'), initialValue:false }, false); return yes === true;`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Verification implementation
  - Unit-style decision-matrix check of `shouldRunRtk` with a stubbed `ctx` (flag on; interactive→true; interactive→false; `!interactive`; `dryRun`).
  - _Requirements: 1_

## Requirements

- 1.1 — `--with-rtk` ⇒ opted-in without prompting
- 1.2 — interactive without flag ⇒ single yes/no confirm, default no
- 1.3 — non-interactive/CI/`--yes` without flag ⇒ skip
- 1.4 — `--dry-run` ⇒ install nothing
- 1.5 — flag parsed in the same loop, exposed as `options.withRtk`

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/bin/lib/context.js` | Modify | Parse `--with-rtk`, default `withRtk:false` |
| `packages/spec/bin/phases/setup-rtk.js` | Create | Hosts `shouldRunRtk(ctx)` (full orchestrator lands in R2) |

## Completion Criteria

- [x] `ctx.options.withRtk` is `true` only when `--with-rtk` is passed; `false` otherwise.
- [x] `shouldRunRtk` returns the documented value for all five input cases.
- [x] No install/side-effect occurs in this task's code path.
- [x] `shouldRunRtk` is exported/importable for the R2 orchestrator (no orphaned function).

## Evidence

- [x] Automated verification
  - Command(s) run:
    - `node -c packages/spec/bin/phases/setup-rtk.js` → exit 0 (SYNTAX OK)
    - `node -c packages/spec/bin/lib/context.js` → exit 0 (SYNTAX OK)
    - `node packages/spec/bin/install.js --help` → exit 0, parses cleanly
    - `node -e "..."` 6-case decision-matrix harness (flag-on, interactive-yes, interactive-no, ci-skip, dry-run, yes-no-flag) → 6/6 PASS, exit 0
    - `node -e "...buildContext..."` end-to-end flag parse → `withRtk:true` khi `--with-rtk`, `withRtk:false` mặc định
    - `node packages/spec/bin/install.js --dry-run --yes` → exit 0, `Dry-run complete — no files were changed.`
    - `node packages/spec/bin/install.js --dry-run --with-rtk --yes` → exit 0, dry-run emitted, no install
  - Expected proof: all branches pass; help runs exit 0; no smoke regression.
  - **Result: PASS** (verified 2026-06-15 by test-runner agent, 6/6 commands green).
- [x] Artifact / runtime verification
  - Inspect: `context.js:189` (default `withRtk: false`) and `context.js:203-204` (arg loop branch).
  - Expect: `withRtk:false` default present; `--with-rtk` sets it true.
  - **Result: confirmed** by `buildContext` smoke test.
- [x] Runtime reachability verification
  - Entrypoint/caller: `shouldRunRtk` exported from `phases/setup-rtk.js`; `setupRtk` thin wrapper also exported for R2-01 wiring.
  - Expect: function exists and is referenced (or explicitly deferred to R2-01).
  - **Result: confirmed** — `module.exports = { shouldRunRtk, setupRtk }`. Wiring into `install.js main()` is explicitly deferred to R2-01 per task file evidence ("or explicitly deferred to R2-01").
- [x] Contract / negative-path verification
  - Check: `--yes` (non-interactive) without `--with-rtk`.
  - Expect: `shouldRunRtk` returns false (no prompt, no install).
  - **Result: PASS** (decision-matrix case 6 `yes-no-flag`).

**Verification receipt (2026-06-15):** Stage A Test PASS + Stage A Spec PASS + Stage B Score 10.0/10 Critical 0. Auto-approved at Step 4 Quality Gate. Next: dispatch R2-01.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Confirm prompt hangs in CI | Medium | `!ctx.interactive` short-circuits before any prompt |
| Flag name clash | Low | `--with-rtk` is unused today (grep-verified) |
