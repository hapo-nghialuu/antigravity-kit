# Project Changelog

All notable changes to CafeKit are documented here, following
[Keep a Changelog](https://keepachangelog.com/).

## [0.12.0] - 2026-06-16

### Added
- **Opt-in rtk token-saver integration** (`specs/rtk-installer-integration`): CafeKit installer now offers an opt-in phase to install the rtk binary and register its official Claude Code PreToolUse hook. Invoked via `--with-rtk` flag or interactive confirmation (defaults to off); non-fatal if rtk is unavailable or installation fails. Token savings apply to Bash command output logged by Claude Code.

## [0.11.7] - 2026-06-03

### Added
- **Version picker on update**: When upgrading, the installer fetches the 5 most recent CafeKit versions from the npm registry and presents an interactive picker. Selecting a different version re-execs `npx @haposoft/cafekit@<chosen>` automatically. Falls back to the classic 3-option menu when offline or registry is unreachable (3 s timeout).

### Changed
- **Skip language prompt on re-install**: Saved locale is read from `.claude/runtime.json`; the language picker is skipped and the stored language is applied silently.
- **Skip platform prompt on re-install**: Installed platform is read from `.claude/cafekit.json` or `.opencode/cafekit.json`; the platform confirmation step is skipped. Fixes a latent bug where the guard used `ctx.isUpdate` before it was set.

## [0.11.6] - 2026-06-03

### Changed
- **Streamlined update flow**: When selecting "Update" in version prompt:
  - Assistant name (addressing) step shows "Keep X / Change?" instead of re-asking
  - Skill dependencies setup still runs for re-installing dependencies
  - Reduces redundant prompts during updates

## [0.11.5] - 2026-06-03

### Fixed
- **Installer version prompt error**: Fixed "select is not a function" error by using `ctx.ui.select()` instead of direct `@clack/prompts` import
- Added missing `versionForceReinstall` translations (en/ja/vi)

## [0.11.4] - 2026-06-03

### Added
- **Interactive version upgrade prompt**: When CafeKit is already installed, the installer now displays:
  - Current version installed
  - Version available to update
  - Interactive options: "Update to X", "Reinstall", "Skip"
  - Clear information about what will happen in each case
- **New version check flow**:
  - Same version: Prompts "CafeKit X is already installed. What would you like to do?" with options to Reinstall or Skip
  - Upgrade available: Shows "CafeKit X → Y: Update available!" with options to Update, Reinstall current, or Skip
  - Downgrade: Warns and asks for confirmation
- **Enhanced installer intro**: Redesigned intro banner with cleaner visual style and description "AI-native development workflow for Claude Code"

### Changed
- **Update check cache TTL**: Reduced from 12 hours to 1 hour for faster detection of new versions

## [0.11.3] - 2026-06-03

### Changed
- **Skill auto-activation metadata**: All 30 skills now declare `user-invocable`, `when_to_use`, `category`, and `keywords` in frontmatter so Claude Code matches user intent to the right skill at startup, matching the reference ClaudeKit schema.
- **Normalized version field**: All skills use `metadata.version` instead of top-level `version` for consistency.
- **Agent activation names**: Agents now reference skills by directory name (`git`) rather than frontmatter name (`hapo:git`) for correct Skill tool resolution.
- **CLAUDE.md**: Skill activation guidance updated to generic "analyze the skills catalog and activate" pattern.
- **`impact-analysis` branding fix**: `name: impact-analysis` corrected to `name: hapo:impact-analysis`.
- **Status line**: Active spec indicator now shows `📋 <slug>` when a spec is `in_progress`, replacing the disabled active-plan lookup.

## [0.11.2] - 2026-06-02

### Added
- **Update check on session start**: `session.cjs` calls the npm registry on each
  new conversation and prints a banner when a newer version is available.
  Result is cached in `.claude/.cafekit-update-cache.json` for **12 hours** to
  avoid spamming the network. Cache file added to `.claude/gitignore`.

## [0.11.1] - 2026-06-02

### Added
- **"Other…" option in language picker**: user can type any language name freely
  (e.g. Korean, French, Spanish). UI installer stays English; the chosen label is
  written to `CLAUDE.md`, `runtime.json` and `settings.json` so the AI responds
  in that language. Separates `ctx.lang` (UI) from `ctx.locale` (AI response).

## [0.11.0] - 2026-06-02

### Added
- **Installer i18n (en / ja / vi)**: language picker as first step; all prompts,
  spinners, summary and next-steps render in the chosen language. Stored in
  `runtime.json`, `CLAUDE.md` (Language Consistency section) and `settings.json`.
- **`--lang <code>`** flag for non-interactive / CI installs.
- **Opt-in skill dependency setup** (`--with-skills-deps`): Python venv + pip,
  skill-local npm, Chromium (chrome-devtools) and Playwright browser (pptx).
  Re-runs now upgrade existing packages (`pip install --upgrade`, `npm update`).
- **Dependency manifests for pdf, docx, pptx skills** so `--with-skills-deps`
  auto-provisions them (previously only ai-multimodal and chrome-devtools).
- **`--help` / `-h` and `--version` / `-v`** flags.
- **Summary surfaces skills needing API keys** dynamically from `.env.example`.
- **Version check before install**: same version → "already up to date" + exit;
  downgrade → confirm or abort; upgrade → proceeds normally.

### Fixed
- **Chromium download** (`chrome-devtools`): switched to puppeteer's own
  `install.mjs` (cache-aware); previous `npx puppeteer browsers install chrome`
  had no such bin and silently failed.
- **Manifest prune**: `removeObsoleteClaudeRuntimeFiles` now also removes the
  deleted files' entries from `cafekit-manifest.json`, preventing zombie entries.
- **Gemini API key prompt removed** (upstream `@google/gemini-cli` was removed).
  `GEMINI_API_KEY` is documented in `ai-multimodal/.env.example` instead.
- **`API keys isolated in .env` next-step line** corrected (no longer valid after
  removing the Gemini prompt).
- Addressing regex upgraded to Unicode `\p{L}` — accepts Japanese, Vietnamese
  and any-script names.
- `CLAUDE.md`/`rules/` no longer force-overwrite user edits (tracked since 0.10.0).

### Changed
- **Addressing label is platform-aware**: "Claude Code will call you…" / "OpenCode
  will call you…" instead of "AI".



### Added
- **Installer i18n (en / ja / vi).** Language is chosen as the first step
  (interactive) or via `--lang <en|ja|vi>`; prompts, milestones, summary and
  next-steps render in that language. Non-interactive defaults to English; an
  unknown code falls back to Japanese. The choice is written to the installed
  `runtime.json` (`locale.responseLanguage`) so the AI responds in it. New
  `bin/lib/i18n.js`. Addressing input now accepts any-script names (Unicode).
- **`--help` / `-h` and `--version` / `-v`** flags so the installer's options
  (`--dry-run`, `--force-overwrite`, `--with-skills-deps`, `--yes`, `--lang`) are discoverable.
- **Summary surfaces skills needing keys**: lists installed skills that ship a
  `.env.example` (e.g. ai-multimodal, devops) so users know to copy it to `.env`.

### Fixed
- **Chromium download for chrome-devtools** now works. The previous
  `npx puppeteer browsers install chrome` invocation failed (puppeteer ships no
  such bin and `--yes` refetched from the registry); switched to puppeteer's own
  `install.mjs` (cache-aware), with `@puppeteer/browsers` as fallback.

### Removed
- **Gemini API key prompt dropped from install.** With gemini-cli gone, the key
  served only the `ai-multimodal` skill — which documents it in its own
  `.env.example`. Users set `GEMINI_API_KEY` there if/when they use that skill,
  instead of being prompted on every install.

## [0.10.2] - 2026-06-01

### Added
- **Opt-in skill dependency setup** (`bin/phases/skills-setup.js`, `bin/lib/skill-deps.js`).
  During install (interactive prompt) or via `--with-skills-deps`, CafeKit can now
  provision the parts a file-copy can't: a Python venv at `<skillsDir>/.venv` +
  `pip install` each skill's `scripts/requirements.txt`, skill-local `npm install`,
  and the Puppeteer Chromium binary. Cross-platform, no sudo, all steps non-fatal.
- **Detect-and-guide for system tools.** Missing `ffmpeg`/`poppler`/`librsvg`/
  `tesseract` and global npm CLIs (agent-browser) are detected and printed with
  per-OS install commands — never auto-installed.
- **Dependency manifests for `pdf`, `docx`, `pptx` skills** (`scripts/requirements.txt`
  and `scripts/package.json`) so their pip/npm deps are auto-installed by the setup
  (previously declared only in SKILL.md prose). Playwright browser is fetched for the
  pptx html2pptx workflow.

### Changed
- **Addressing message is platform-aware**: now reads "Claude Code will call you …"
  (or "OpenCode" for OpenCode installs) instead of "AI".

### Removed
- **Gemini CLI auto-install dropped.** The upstream `@google/gemini-cli` package was
  removed by Google, so the installer no longer attempts to install it. The Gemini
  **API key** prompt remains (SDK-based skills like ai-multimodal read it directly).

## [0.10.0] - 2026-06-01

### Changed
- **Installer rewritten into a phase architecture.** `packages/spec/bin/install.js`
  went from a 1297-line monolith to a thin orchestrator (~150 lines) plus focused
  modules under `bin/lib/` and `bin/phases/` (each ≤ ~265 lines), satisfying the
  project's 200-line guidance. `bin/lib/opencode-install.js` is unchanged and still
  called in the same order.
- **`--upgrade` / `-u` / `-f` / `--force` are now aliases of `--force-overwrite`.**
  Re-running the installer no longer blindly overwrites managed files.

### Added
- **Interactive TUI via `@clack/prompts`.** Installer now renders framed
  intro/outro, a spinner per platform, and `◆/│/└` prompts (`bin/lib/ui.js`,
  `ctx.ui`). Falls back to plain output when piped/CI/`--yes`.
- **`--yes` / `-y` and non-interactive detection.** Piped/CI runs skip prompts
  and use defaults instead of hanging — fixes the previous readline-on-pipe stall
  and makes the installer CI-friendly.
- **Ownership tracking (SHA-256).** Each install records a per-platform
  `<folder>/cafekit-manifest.json` mapping every managed file to its content hash.
  Re-installs classify files as pristine / user-modified / user-created and update
  only what changed (selective merge).
- **User-edit preservation.** Files a user has modified are kept by default and
  reported in the summary; `--force-overwrite` replaces them (a backup is kept).
- **Backup + rollback.** Platform folders and root `CLAUDE.md` / `.gitignore` are
  snapshotted to `.cafekit-backup/<runId>/` before any writes; a mid-install
  failure rolls back to the pre-run state.
- **Process lock.** `.cafekit.lock` prevents concurrent installs; stale locks from
  dead processes are reclaimed automatically.
- **`--dry-run`.** Previews every create/update/preserve decision without touching
  the filesystem.

### Fixed
- **`CLAUDE.md` and `rules/` no longer force-overwrite user edits** on every run
  (latent data loss). They are now tracked; installer-managed content (template +
  addressing section) is re-recorded so upstream updates still propagate to users
  who configured addressing.
- **`.gitignore` over-broad `bin/` rule** unignored for `packages/spec/bin/` so the
  installer's own modules are version-controlled (they were silently untracked).
- Backup copies preserve restrictive file permissions (e.g. `.env` stays `0o600`).
