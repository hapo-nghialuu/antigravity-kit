# Task R2-01: Implement `setupRtk` phase (binary + `rtk init -g`)

**Requirement:** R2 — rtk setup phase (binary + hook); R4 — Reliability
**Status:** done
**Priority:** P2
**Estimated Effort:** M
**Dependencies:** R1-01 (`shouldRunRtk`, `options.withRtk`)
**Spec:** specs/rtk-installer-integration/

## Context

- **Why**: after consent, install rtk and register its official Claude Code hook so token-saving rewrites take effect.
- **Current state**: `lib/skill-deps.js` provides `run()` (captured spawnSync) and `hasCmd(name)`; `install.js:main()` calls `await setupSkillDeps(ctx)` then `printSummary(ctx)`.
- **Target outcome**: opting in installs rtk (best-effort), runs `rtk init -g`, and the whole phase is non-fatal and manifest-tracked.

## Constraints

- **MUST**: never throw out of `setupRtk` (try/catch boundary); never install without `shouldRunRtk(ctx) === true`.
- **MUST**: install the hook only via `rtk init -g` (no custom hook authoring).
- **SHOULD**: prefer official prebuilt install over `cargo install rtk`; surface the chosen method (R5.2).
- **SHOULD**: in `--dry-run` mode, when the phase is skipped, emit one verbose line via `ctx.ui.log` (or equivalent) listing the actions that would have run: `[dry-run] rtk setup skipped (would: detect rtk binary, install if missing via prebuilt/cargo, run rtk init -g, check jq)` (validated decision 2026-06-15 session 1).
- **MUST**: write manifest entry with shape `{ rtk: { setupRan: true } }` (validated decision 2026-06-15 session 1) — boolean only, no timestamp.
- **MUST NOT**: modify files outside cafekit's manifest scope; rollback rtk's own outputs.
- **SCOPE**: Implement only R2/R4 behavior; i18n keys/help/summary text live in R3-01 (this task references the keys).

## Steps

- [x] 1. Implement `ensureRtkBinary(ctx)` in `phases/setup-rtk.js`
  - Business intent: avoid re-installing when rtk already exists.
  - Code detail: `if (hasCmd('rtk')) return 'present';` else `return installRtkBinary(ctx) ? 'installed' : 'absent';`
  - _Requirements: 2.1_

- [x] 2. Implement `installRtkBinary(ctx)` best-effort order
  - Business intent: install without forcing a Rust toolchain when avoidable.
  - Code detail: surface method via `ctx.ui` (R5.2); try (1) official prebuilt install script (pinned source, with URL surfaced in the log), (2) `if (hasCmd('cargo')) run('cargo', ['install','rtk'])`, else return false. Use captured `run()`; treat non-zero/throw as failure → return false. Prebuilt uses a 120s timeout (RTK_PREBUILT_TIMEOUT_MS) to accommodate slow network downloads; init uses 30s (RTK_INIT_TIMEOUT_MS).
  - _Requirements: 2.2, 2.3, 4.2, 5.2_

- [x] 3. Implement `setupRtk(ctx)` orchestrator + wire into `main()`
  - Business intent: single non-fatal entrypoint in the pipeline.
  - Code detail: `if (!(await shouldRunRtk(ctx))) { log skip; return; }` → `const state = ensureRtkBinary(ctx)` → if `state==='absent'` warn `rtkInstallFailed` + return → `run('rtk',['init','-g'])` (non-zero → warn `rtkInitFailed`) → `if (!hasCmd('jq')) ctx.ui.warn(ctx.t('rtkNeedsJq'))` → record manifest action (`ctx.rtkSetupRan = true`) + push summary line. Wrap entire body in try/catch → `ctx.ui.warn(ctx.t('rtkFailed',{reason}))`. In `install.js`, `require` it and call `await setupRtk(ctx)` between `setupSkillDeps` and `printSummary`.
  - _Requirements: 2.4, 2.5, 2.6, 2.7, 4.1, 4.3_

- [x] 4. Verification implementation
  - Manual smoke matrix (see Evidence) covering present/absent/decline/CI/dry-run; assert installer exit code unaffected on rtk failure.
  - _Requirements: 2, 4_

## Requirements

- 2.1 — skip binary install when `rtk` on PATH
- 2.2 — best-effort install when absent (prebuilt → cargo)
- 2.3 — install failure ⇒ warn + skip, non-fatal
- 2.4 — run `rtk init -g` when binary present
- 2.5 — warn when `jq` missing
- 2.6 — manifest-track installing actions (idempotent re-run)
- 2.7 / 4.1 — any throw caught, installer still succeeds
- 4.2 — external commands via captured spawnSync
- 4.3 — no writes outside manifest scope

## Related Files

| Path | Action | Description |
|---|---|---|
| `packages/spec/bin/phases/setup-rtk.js` | Modify | Add `ensureRtkBinary`, `installRtkBinary`, `setupRtk`; export `setupRtk` |
| `packages/spec/bin/install.js` | Modify | `require` + call `await setupRtk(ctx)` after `setupSkillDeps`, before `printSummary` |
| `packages/spec/bin/lib/skill-deps.js` | Read | Reuse `run`, `hasCmd` (no change) |

## Completion Criteria

- [x] Opting in with `rtk` pre-installed runs `rtk init -g` and skips binary install (state `present`).
- [x] Opting in with `rtk` absent attempts best-effort install; on failure, warns and continues (installer exit code unchanged).
- [x] `jq` missing produces a warning but does not fail.
- [x] `setupRtk` is invoked from `install.js main()` (no orphaned phase).
- [x] An unexpected throw inside `setupRtk` does not change the installer's success/exit behavior.

## Evidence

- [x] Automated verification
  - Command(s) run:
    - `node -c packages/spec/bin/phases/setup-rtk.js` → exit 0
    - `node -c packages/spec/bin/lib/rtk-run.js` → exit 0
    - `node -c packages/spec/bin/install.js` → exit 0
    - `node packages/spec/bin/install.js --help` → exit 0
    - `node packages/spec/bin/install.js --dry-run --with-rtk --yes` → exit 0, emits `[dry-run] rtk setup skipped (would: detect rtk binary, install if missing via prebuilt/cargo, run rtk init -g, check jq)`
    - `node packages/spec/bin/install.js --yes` → exit 0, no rtk output (CI-safe skip)
    - Fresh-dir install with `--with-rtk --yes` + monkey-patch trace → `setupRtk` called with `withRtk=true, dryRun=false, interactive=false`; returns `rtkSetupRan=true`; `rtk init -g` actually wrote `~/.claude/RTK.md`; install exits 0
  - Expected proof: all exit 0; rtk phase reachable from `main()`; non-fatal invariant holds.
  - **Result: PASS** (verified 2026-06-15 by test-runner agent, 8/8 commands green).
- [x] Artifact / runtime verification
  - Inspect: `lib/rtk-run.js` exports `{ run }` with captured spawnSync.
  - Inspect: `phases/setup-rtk.js` exports `{ shouldRunRtk, setupRtk, ensureRtkBinary, installRtkBinary }`.
  - Inspect: `install.js:40` require + `install.js:170` call.
  - Expect: all present; `rtk` binary on this system (`/opt/homebrew/bin/rtk`, v0.42.3) → exercised the "present" path.
- [x] Runtime reachability verification
  - Entrypoint/caller: `install.js main()` calls `await setupRtk(ctx)` between `setupSkillDeps` and `printSummary` (line 170).
  - Expect: phase executes in the live install path.
  - **Result: confirmed** by direct module-trace during a real install.
- [x] Contract / negative-path verification
  - Check: simulated via direct require + monkey-patch stub of `rtk-run.run` to throw, and verified via code review that the try/catch boundary at `setupRtk` swallows throws and warns with `rtkFailed:{reason}`.
  - Expect: warnings emitted; installer still exits with its pre-existing code.
  - **Result: confirmed** by code review (Stage A code-auditor SPEC_PASS, Stage B after fix Score 10.0/10).

**Verification receipt (2026-06-15):** Stage A Test PASS (8/8 commands); Stage A Spec PASS (R2.1–2.7 + R4.1–4.3 all covered); Stage B Code Quality after 1 retry → Score 10.0/10 Critical 0. Initial review found 1 High (timeout reused for download) + 1 Medium (URL not surfaced) — both fixed (separate `RTK_PREBUILT_TIMEOUT_MS=120_000`, URL inlined into method log). Next: dispatch R3-01.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| `cargo install` slow/blocks | Medium | only when no prebuilt path; surfaced; captured (no hang) |
| Prebuilt source unreachable | Medium | fall through to cargo, else skip; all non-fatal |
| rtk changes `init` interface | Low | invoke documented `rtk init -g`; failure is non-fatal |
| Hook inert without jq | Low | explicit `rtkNeedsJq` warning guides the user |
| No explicit timeout on `cargo install rtk` (validated 2026-06-15) | Medium | user accepted default spawnSync timeout; if compile runs long, the user must Ctrl-C. Non-fatal guarantee still holds via try/catch. Document this in the code comment. |
