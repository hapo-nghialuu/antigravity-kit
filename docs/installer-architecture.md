# Installer Architecture

How `@haposoft/cafekit` (`packages/spec/`) installs itself into a target project.
Entry point: `bin/install.js` (bin name `cafekit`).

## Design

A thin orchestrator runs a sequence of **phase handlers**. Each phase receives and
returns the run context (`ctx`) and guards on `ctx.cancelled`. Heavy logic lives in
`bin/lib/` (reusable) and `bin/phases/` (one concern each).

```
bin/install.js              orchestrator: lock → snapshot → phases (try/catch rollback) → release
bin/lib/
  context.js                PLATFORMS registry, INSTALL_COMMAND, migration-manifest loader,
                            arg parsing, results factory, buildContext()
  ui.js                     terminal UI (clack when interactive TTY; plain logs otherwise),
                            ctx.ui — intro/outro/spinner/note + select/text/confirm
  manifest.js               SHA-256 ownership: read / classify / tracker (cafekit-manifest.json)
  managed-writer.js         ownership-aware single-file + tree writer (core of selective update)
  backup.js                 snapshot / restore / prune  (.cafekit-backup/<runId>/)
  lock.js                   acquire / release / stale-PID reclaim  (.cafekit.lock)
  copy-utils.js             copyRecursive / isTextAsset / readJsonFile  (existing)
  opencode-install.js       OpenCode conversion + writers
  codex-install.js          Codex path/tool/skill transforms + managed AGENTS block
  codex-frontmatter.js      minimal agent frontmatter reader for TOML conversion
  path-safety.js            reject managed targets that traverse project symlinks
bin/phases/
  select-platform.js        detect platforms, prompt, legacy warning
  copy-payload.js           skills / agents / references / scripts / commands
  claude-runtime.js         ROUTING, runtime files, obsolete cleanup, CLAUDE.md, rules
  claude-settings.js        settings.json merge + obsolete-hook pruning
  opencode-runtime.js       delegates to opencode-install.js (plugins, commands, AGENTS, config)
  codex-runtime.js          native hooks/rules, split-root ignores, managed AGENTS block
  write-metadata.js         cafekit.json version metadata + ownership manifest write
  root-config.js            root .gitignore patterns
  post-install.js           OpenCode model, Gemini API key, addressing (platform-aware)
  skills-setup.js           opt-in: venv+pip, skill npm, Chromium; detect+guide system tools
  setup-rtk.js              opt-in: rtk token-saver binary + Claude Code hook registration
  summary.js / report.js    summary output + per-action reporting helper
bin/lib/
  skill-deps.js             cross-platform setup primitives (venv/pip/npm/chromium/detect)
```

## Run sequence

1. **Lock** — acquire `.cafekit.lock`; refuse if a live PID owns it, reclaim if stale.
2. **Context** — parse args (`--force-overwrite`/`--upgrade`, `--dry-run`, `--with-skills-deps`, `--with-rtk`), load the
   migration manifest, init results counters.
3. **Select platforms** — honor `--platform`, otherwise restore installed/detected
   `.claude/`, `.codex/`, and `.opencode/` runtimes or prompt.
4. **Snapshot** — back up each platform's declared targets plus root `.gitignore`
   (skipped in dry-run). Codex snapshots `.codex/`, `.agents/`, and `AGENTS.md`.
5. **Per platform** — read ownership baseline, start a tracker, then: copy payload →
   Claude, Codex, or OpenCode runtime → write metadata + manifest.
6. **Root config** — ensure `.gitignore` patterns (incl. `.claude/`, `.codex/`,
   `.agents/`, `.opencode/`, `.cafekit-backup/`, `.cafekit.lock`).
7. **Post-install** — OpenCode model, runtime locale, Gemini, and managed
   `CLAUDE.md`/`AGENTS.md` addressing.
8. **Skills setup** — opt-in: Python venv, pip deps, skill npm, Chromium; detect system tools.
9. **rtk setup** — opt-in: rtk binary + hook registration for token-saving on Bash commands.
10. **Summary**; prune old backups. On any throw: **restore snapshot** and exit 1.

## Ownership model

Two distinct manifests (never conflated):

- **Migration manifest** (`src/claude/migration-manifest.json`, `ctx.manifest`) — what
  skills/agents/runtime files to install and which are obsolete.
- **Ownership manifest** (`<folder>/cafekit-manifest.json`, `ctx.ownership`) — SHA-256 of
  every file CafeKit wrote, used to classify on re-install.

`managed-writer` compares three hashes — disk, recorded baseline, incoming payload:

| State | Condition | Default action | With `--force-overwrite` |
|---|---|---|---|
| absent | not on disk | write | write |
| pristine | disk == baseline | write if payload differs, else skip | same |
| user-modified | disk != baseline | **preserve** (report) | overwrite (snapshot keeps copy) |
| user-created | on disk, not in baseline | **preserve** | overwrite |

A file written earlier in the same run (e.g. spec templates copied by the `specs/`
tree, then revisited by the template-sync loop) is treated as pristine via the
tracker's in-run record, avoiding false "user-created" classification.

Claude and OpenCode keep their ownership manifest inside one runtime root.
Codex uses one tracker with `recordRoot: "."` and only allows keys under
`.codex/` or `.agents/`; root `AGENTS.md` is managed separately as a marked
block so project and OpenCode instructions remain byte-preserved.

By default the installer gitignores the runtime folders (`.claude/`, `.codex/`,
`.agents/`, `.opencode/`)
at project root — reinstall with `npx @haposoft/cafekit` on each machine. The
ownership manifest therefore lives only on disk as a local re-install baseline.
If a team deliberately force-adds and commits the runtime folder, they should
also commit the ownership manifest so teammates share the baseline; otherwise
their first install would treat those files as user-created and never update them.

A second layer lives inside the runtime: `.claude/.gitignore`,
`.opencode/.gitignore`, or Codex's `.codex/.gitignore` +
`.agents/.gitignore`. These ignore secrets, skill dependencies, session state,
and logs so partial un-ignores and force-adds stay safer.

## Native Codex layout

`npx @haposoft/cafekit --platform codex` installs:

```text
.agents/skills/             native skills (`$hapo-*`, discoverable via `/skills`)
.codex/agents/*.toml        auto-discovered snake_case custom agents
.codex/hooks.json           project lifecycle registration
.codex/hooks/               native event handlers and state/privacy libraries
.codex/{rules,scripts,references}/
.codex/{runtime,cafekit}.json
AGENTS.md                    CafeKit-owned marked block only
```

The installer does not create `.codex/config.toml` or change user-global trust.
Codex loads project agents/hooks after the repository is trusted; users review
hook definitions with `/hooks`. It uses Codex's native status/usage UI, not the
Claude statusline.

Codex payload conversion is scoped by asset type. Markdown/text instructions
map Claude paths, skill syntax, tools, and agent examples to native Codex
equivalents. Executable source files receive path/label rewrites only, preventing
keywords such as Python `prompt=` or `description=` from being corrupted.

## Safety properties

- **Rollback** — destructive steps (obsolete removal, settings prune) are covered by the
  pre-run snapshot; a failure restores platform folders and root files.
- **Concurrency** — the lock prevents two installs racing on the same project.
- **Dry-run** — every write/delete/`mkdir`/manifest write is guarded; OpenCode delegation
  is skipped (it is not dry-run aware) while `rules/` still previews.
- **Path safety** — managed writes and snapshots reject symlink traversal outside
  the intended project paths.
- **Permissions** — POSIX execute bits from payload scripts are preserved without
  replacing destination read/write bits.
- **Selective refresh** — re-running the same version updates pristine payload
  files and preserves user modifications; only explicit `--force-overwrite`
  resets them.
- **Codex privacy/state** — sensitive approval is one-use and bound to the exact
  session/tool/canonical path set. State, locks, resume context, and archives are
  isolated by hashed session ID. Hooks remain guardrails: hosted or specialized
  tools may not enter the local hook path.

## Known follow-ups

- `bin/lib/opencode-install.js` (866 lines) still exceeds the 200-line guidance and its
  writers are not ownership-tracked — a later pass.
- The ownership manifest can grow large (deep skill trees → thousands of entries) and is
  not pruned when files become obsolete.
