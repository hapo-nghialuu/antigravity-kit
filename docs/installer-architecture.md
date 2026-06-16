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
  opencode-install.js       OpenCode conversion + writers  (existing, called as-is)
bin/phases/
  select-platform.js        detect platforms, prompt, legacy warning
  copy-payload.js           skills / agents / references / scripts / commands
  claude-runtime.js         ROUTING, runtime files, obsolete cleanup, CLAUDE.md, rules
  claude-settings.js        settings.json merge + obsolete-hook pruning
  opencode-runtime.js       delegates to opencode-install.js (plugins, commands, AGENTS, config)
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
3. **Select platforms** — auto-detect `.claude/` / `.opencode/`, else prompt.
4. **Snapshot** — back up platform folders + root `CLAUDE.md`/`.gitignore` (skipped in dry-run).
5. **Per platform** — read ownership baseline, start a tracker, then: copy payload →
   claude-runtime *or* opencode-runtime → write metadata + manifest.
6. **Root config** — ensure `.gitignore` patterns (incl. `.cafekit-backup/`, `.cafekit.lock`).
7. **Post-install** — OpenCode model, Gemini, addressing (re-records CLAUDE.md baseline).
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

The ownership manifest should be **committed** in the consumer project so a teammate's
clone shares the baseline; otherwise their first install would treat committed
`.claude/` files as user-created and never update them.

## Safety properties

- **Rollback** — destructive steps (obsolete removal, settings prune) are covered by the
  pre-run snapshot; a failure restores platform folders and root files.
- **Concurrency** — the lock prevents two installs racing on the same project.
- **Dry-run** — every write/delete/`mkdir`/manifest write is guarded; OpenCode delegation
  is skipped (it is not dry-run aware) while `rules/` still previews.

## Known follow-ups

- `bin/lib/opencode-install.js` (866 lines) still exceeds the 200-line guidance and its
  writers are not ownership-tracked — a later pass.
- The ownership manifest can grow large (deep skill trees → thousands of entries) and is
  not pruned when files become obsolete.
