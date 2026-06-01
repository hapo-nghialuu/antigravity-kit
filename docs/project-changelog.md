# Project Changelog

All notable changes to CafeKit are documented here, following
[Keep a Changelog](https://keepachangelog.com/).

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
