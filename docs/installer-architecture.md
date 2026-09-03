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
  copy-utils.js             copyRecursive / isTextAsset / isGeneratedArtifact /
                            normalizeSourcePaths / readJsonFile  (existing)
  instruction-blocks.js     shared CORE block upsert/migrate + Addressing-section
                            extract/preserve primitives
  codex-install.js          Codex path/tool/skill transforms + managed AGENTS block
  codex-frontmatter.js      minimal agent frontmatter reader for TOML conversion
  path-safety.js            reject managed targets that traverse project symlinks
bin/phases/
  select-platform.js        detect platforms, prompt, legacy warning
  copy-payload.js           skills / agents / references / scripts / commands
  claude-runtime.js         ROUTING, runtime files, obsolete cleanup, CLAUDE.md,
                            AGENTS core + wrappers, rules (Addressing-preserving)
  claude-settings.js        settings.json merge + obsolete-hook pruning
  codex-runtime.js          native hooks/rules, split-root ignores, managed AGENTS block
  write-metadata.js         cafekit.json version metadata + ownership manifest write
  root-config.js            root .gitignore patterns
  post-install.js           Gemini API key, language + managed-block
                            addressing for Claude and Codex
  skills-setup.js           opt-in: venv+pip, skill npm, Chromium; detect+guide system tools
  setup-rtk.js              opt-in: rtk token-saver binary + Claude Code hook registration
  summary.js / report.js    summary output + per-action reporting helper
bin/lib/
  skill-deps.js             cross-platform setup primitives (venv/pip/npm/chromium/detect)
```

## Run sequence

1. **Lock** — acquire `.cafekit.lock`; refuse if a live PID owns it, reclaim if stale.
2. **Context** — parse args (`--force-overwrite`/`--upgrade`, `--dry-run`, `--with-skills-deps`, `--with-rtk`,
   `--with-document-skills`/`--without-document-skills`), load the
   migration manifest, init results counters.
3. **Select platforms** — honor `--platform`, otherwise restore installed/detected
   `.claude/` and `.codex/` runtimes or prompt.
4. **Snapshot** — back up each platform's declared targets plus root `.gitignore`
   (skipped in dry-run). Claude snapshots `.claude/`, `CLAUDE.md`, and `AGENTS.md`;
   Codex snapshots `.codex/`, `.agents/`, and `AGENTS.md`.
5. **Per platform** — read ownership baseline, start a tracker, then: copy payload → Claude or Codex runtime → write that runtime's managed instruction block → write metadata + manifest. Before this loop, the installer runs **`ensureSharedAgentsMdCore`** once for every selected runtime, installing/refreshing the shared `src/common/AGENTS.md` CORE block (`<!-- CAFEKIT CORE START/END -->`) in root `AGENTS.md`; the Codex writer appends only its runtime-specific managed block.

   The Claude-specific per-platform sequence is:
   - copyClaudeRuntimeFiles (ROUTING, rules, scripts, references)
   - removeObsoleteClaudeRuntimeFiles
   - mergeClaudeSettings
   - **ensureSharedAgentsMdCore** — installs/refreshes the shared `src/common/AGENTS.md` core exactly once in root `AGENTS.md`; the Codex writer appends only its runtime-specific managed block
   - copyClaudeMdFile — writes `CLAUDE.md` with `@AGENTS.md` import and Claude-specific runtime guidance
   - copyRulesDirectory
6. **Root config** — ensure `.gitignore` patterns (incl. `.claude/`, `.codex/`,
   `.agents/`, `.cafekit-backup/`, `.cafekit.lock`).
7. **Post-install** — runtime locale, language and managed-block addressing for Claude and Codex.
8. **Skills setup** — opt-in: Python venv, pip deps, skill npm, Chromium; detect system tools.
9. **rtk setup** — opt-in: rtk binary + hook registration for token-saving on Bash commands.
10. **Summary**; prune old backups. On any throw: **restore snapshot** and exit 1.

## Optional document skills

The install inventory has two tiers. Core skills always install. The document
bundle — `docs`, `docx`, `pdf`, `pptx`, `xlsx`, `ai-multimodal` — is optional and
off by default on a fresh install; an interactive run prompts once, and
`--with-document-skills` / `--without-document-skills` decide it non-interactively.
The two flags are mutually exclusive.

The selection persists per runtime under `schemaVersion: 2`. A legacy
`schemaVersion: 1` install keeps the bundle on its first upgrade, so an existing
project does not silently lose skills it already had. Opting out prunes only
pristine CafeKit-owned copies of those directories; a file the user edited is
left in place.

Six broad engineering skills — `backend-development`, `frontend-development`,
`frontend-design`, `mobile-development`, `devops`, `react-best-practices` — are no
longer installed and are pruned ownership-aware on both runtimes.

The optional `docs` skill does not gate the documentation runtime: the
`docs-sync` hook, `validate-docs.cjs`, and the `docs-keeper` agent stay core
assets whether or not the bundle is installed.

## Ownership model

Two distinct manifests (never conflated):

- **Migration manifest** (`src/claude/migration-manifest.json`, `ctx.manifest`) — what
  skills/agents/runtime files to install and which are obsolete.
- **Ownership manifest** (`<folder>/cafekit-manifest.json`, `ctx.ownership`) — SHA-256 of
  every file CafeKit wrote, used to classify on re-install.

### Payload mapping and self-tests

The implementation agent payload is `agents/implementer.md`; the legacy
`god-developer.md` name is not used. The migration manifest and Codex `AGENT_NAMES`
use the same `implementer` name so every runtime resolves the same
implementation role.

The installer copies payload files and transforms paths, syntax, and command
mappings for each target runtime. Installer self-tests exercise the transformed
output and assert that agent mappings stay aligned.

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

Claude keeps its ownership manifest inside one runtime root.
Codex uses one tracker with `recordRoot: "."` and only allows keys under
`.codex/` or `.agents/`; root `AGENTS.md` is managed separately as a marked
block so project instructions remain byte-preserved.

By default the installer gitignores the runtime folders (`.claude/`, `.codex/`,
`.agents/`)
at project root — reinstall with `npx @haposoft/cafekit` on each machine. The
ownership manifest therefore lives only on disk as a local re-install baseline.
If a team deliberately force-adds and commits the runtime folder, they should
also commit the ownership manifest so teammates share the baseline; otherwise
their first install would treat those files as user-created and never update them.

A second layer lives inside the runtime: `.claude/.gitignore` or Codex's
`.codex/.gitignore` + `.agents/.gitignore`. These ignore secrets, skill dependencies, session state,
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
AGENTS.md                    shared CafeKit CORE block (once) plus the runtime-specific Codex block, all marker-managed
```

Codex uses root `AGENTS.md` as its native project instruction surface, and Claude imports that file through `CLAUDE.md`. In combined installs, the shared CORE block (`<!-- CAFEKIT CORE START/END -->`) remains runtime-neutral while the Codex managed markers preserve ownership and user bytes.

**Combined-install boundary (fail-safe by ownership, not filesystem isolation):**
- `CORE` is runtime-neutral by contract: it contains no runtime-specific tool names, paths, or commands (`Codex`, `.codex`, `$hapo-`, `/hapo:` are forbidden in CORE — enforced by installer tests).
- Each runtime owns exactly one additional managed block (Codex: `<!-- CAFEKIT CODEX START/END -->`). The block header states an explicit ignore contract: non-owners must ignore that block and consume only `CORE` plus their native block. If ownership cannot be determined, the file is treated as `CORE`-only (fail-safe).
- Markers are not a filesystem isolation boundary — they are an ownership/ignore contract. Tests assert no cross-runtime directive leakage (e.g., Codex block not treated as Claude instructions, and `CORE` stays neutral). Do not claim cross-runtime instruction isolation until a native alternate entrypoint is proven for the affected runtime.

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
- **Dry-run** — every write/delete/`mkdir`/manifest write is guarded.
- **Path safety** — managed writes and snapshots reject symlink traversal outside
  the intended project paths.
- **Permissions** — POSIX execute bits from payload scripts are preserved without
  replacing destination read/write bits.
- **Selective refresh** — re-running the same version updates pristine payload
  files and preserves user modifications; only explicit `--force-overwrite`
  resets them.
- **Managed Addressing survives reinstall** — Claude and Codex block
  upserts carry over the exact saved `## Addressing (Context Overflow Indicator)`
  section from the existing managed block when a newer template drops it, so the
  user's address is not lost; only reads the managed body, never user-owned or
  shared-CORE content.
- **Generated-artifact filtering** — `.coverage`, `__pycache__`, and `.pyc`/`.pyo`
  are never copied as runtime payload, in `copyRecursive` and `copyManagedTree`.
- **Source-path tripwire** — install self-tests assert no installed payload under
  `.claude` or `.codex` leaks a `packages/spec/src/` source path,
  covering standalone and combined installs; direct text plugin files are also
  byte-normalized.
- **Codex privacy/state** — sensitive approval is one-use and bound to the exact
  session/tool/canonical path set. State, locks, resume context, and archives are
  isolated by hashed session ID. Hooks remain guardrails: hosted or specialized
  tools may not enter the local hook path.

## Known follow-ups

- The ownership manifest can grow large (deep skill trees → thousands of entries) and is
  not pruned when files become obsolete.
