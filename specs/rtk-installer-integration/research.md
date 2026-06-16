# Research

## R1. rtk official Claude Code integration (source: github.com/rtk-ai/rtk, develop)

- README explicitly names the **PreToolUse hook** as the recommended integration:
  > "The most effective way to use rtk. The hook transparently intercepts Bash commands and rewrites them to rtk equivalents before execution."
- Recommended install command: **`rtk init -g`** — README annotation: *"Install hook + RTK.md (recommended)"*.
- Integration table: `Claude Code | rtk init -g | PreToolUse hook (bash)`.
- Proof in repo: `.claude/hooks/rtk-rewrite.sh` (header `rtk-hook-version: 3`) registers `PreToolUse:Bash`, reads `tool_input.command`, calls `rtk rewrite "$CMD"`, returns Claude Code hook JSON (`hookSpecificOutput` with `permissionDecision`/`updatedInput`).
- **Hook dependency:** the script guards `command -v rtk` AND `command -v jq` and silently skips if either is missing → `jq` is required for the hook to function.
- **Limitation (README):** the hook only affects the `Bash` tool, not Claude Code built-in `Read`/`Grep`.

**Decision:** cafekit installs the binary + runs `rtk init -g`; it does NOT author a hook. This avoids duplicating rtk's mapping logic (single source of truth = `rtk rewrite`).

## R2. rtk install methods

- `cargo install rtk` — requires Rust toolchain; compiles from source (slow).
- Prebuilt binary / install script — fastest, no Rust dependency (preferred when available; pin to the official release source).
- `brew` — macOS only.

**Decision:** best-effort, in priority order: (1) official prebuilt install script if reachable, (2) `cargo install rtk` when `cargo` exists, (3) otherwise warn + skip. All non-fatal.

## R3. Existing cafekit installer anchors (to mirror, not reinvent)

| Concern | Existing reference | Reuse |
|---|---|---|
| Opt-in gate (flag OR confirm, CI-safe) | `packages/spec/bin/phases/skills-setup.js` → `shouldRun(ctx)` | Copy pattern verbatim |
| Flag parsing | `packages/spec/bin/lib/context.js` (`--with-skills-deps` → `args.withSkillsDeps`) | Add `--with-rtk` → `args.withRtk` |
| External command exec | `packages/spec/bin/lib/skill-deps.js` → `run()` (spawnSync, captured), `hasCmd(name)` (which/where) | Reuse `hasCmd`; add `run` calls for rtk |
| Phase invocation | `packages/spec/bin/install.js:166-172` (`await setupSkillDeps(ctx)` then `printSummary`) | Add `await setupRtk(ctx)` right after |
| Non-fatal contract | skills-setup.js header: *"a failure never breaks the install"* | Same try/catch wrapper |
| i18n | `packages/spec/bin/lib/i18n.js` (en/ja/vi maps, `skillDepsConfirm` key) | Add `rtkConfirm` + status keys |
| UI prompt | `ctx.ui.confirm({ message, initialValue:false }, false)` | Same call shape |
| Manifest tracking | cafekit manifest lib (`manifestLib`) used per-platform | Track rtk setup action |
| Help text | `printHelp()` in install.js | Add `--with-rtk` line |

## R4. ROI context (from hapo-ai-hub prod measurements — informational only)

- RTK real savings measured at the gateway: ~$0.30/day (tool-output is a small share of total input; caching is the dominant cost lever at ~$200/day).
- Value of rtk at the client is primarily **context-bloat reduction** (cleaner Claude Code sessions), not large dollar savings.
- Implication for messaging: prompt copy must NOT promise a fixed percentage; describe it as token-saving for Bash tool output (R3.4 / R5).

## Evidence Summary

| Claim | Evidence | Source |
|---|---|---|
| Hook (PreToolUse) is rtk's official Claude Code integration | README "recommended" + `rtk init -g`; `.claude/hooks/rtk-rewrite.sh` v3 in repo | github.com/rtk-ai/rtk (develop) |
| rtk hook requires `jq` | Hook script guards `command -v rtk` AND `command -v jq`, skips if missing | `.claude/hooks/rtk-rewrite.sh` |
| cafekit already has a non-fatal opt-in install phase to mirror | `shouldRun(ctx)` (flag\|confirm\|CI-skip) + non-fatal header | `packages/spec/bin/phases/skills-setup.js` |
| Reusable command/exec helpers exist | `run()` (captured spawnSync), `hasCmd()` (which/where) | `packages/spec/bin/lib/skill-deps.js` |
| Pipeline insertion point is stable | `await setupSkillDeps(ctx)` then `printSummary(ctx)` in `main()` | `packages/spec/bin/install.js` |
| Flag parsing pattern | `--with-skills-deps` → `args.withSkillsDeps` in the arg loop | `packages/spec/bin/lib/context.js` |
| Savings should not be overstated | Gateway prod: RTK ≈ $0.30/day; caching dominates (~$200/day) | hapo-ai-hub prod measurement |

