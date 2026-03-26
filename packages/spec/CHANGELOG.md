# Changelog

All notable changes to @haposoft/cafekit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-03-26

### Added
- **hapo:inspector skill** - Fast codebase discovery using parallel agents
  - Dual-mode support: internal (Explore agents) and external (Gemini CLI)
  - SCALE-based routing (1-10 agents based on file count)
  - Preflight scope gate to prevent broad scans
  - Built-in no-scan lists for security
  - 3-minute timeout per agent with skip-on-timeout
  - Task registration for ≥3 agents
  - 500-line file chunking strategy
- **hapo:debug skill** - Structured incident investigation methodology
  - 10 reference documents for systematic debugging
  - Proof gate, cause chain analysis, containment strategies
- **Gemini CLI auto-install** - Interactive setup during cafekit installation
  - Prompts user to install gemini-cli
  - API key configuration during setup
  - Fallback to internal mode if skipped
- **runtime.json configuration** - Centralized config for external tools
  - Auto-installed to `.claude/runtime.json`
  - Gemini model configuration
  - Extensible for future external tools

### Changed
- **BREAKING:** Renamed `hapo:inspect` to `hapo:inspector` for clarity
- Updated all downstream references in agents, commands, and skills

### Fixed
- Config path now uses `.claude/runtime.json` instead of project root

## [0.4.0] - 2026-03-25

### Added
- **Claude Code Statusline Support** - Enhanced statusline with real-time session context
  - Context usage tracking (tokens, percentage)
  - Session timer
  - Git status (branch, dirty state)
  - Active agents count
  - Todo items tracking
- **Runtime Bundle System** - 12 runtime files with short renamed paths (copyright-safe)
  - `status.cjs` - Main statusline renderer
  - `hooks/session.cjs` - Session initialization
  - `hooks/agent.cjs` - Subagent context injection
  - `hooks/usage.cjs` - Usage tracking
  - `hooks/lib/*.cjs` - Shared utilities (color, parser, git, config, counter, detect, context)
- **Smart Settings Merge** - Preserves user config during install/upgrade
  - Automatic settings.json merge without overwriting user settings
  - Hook deduplication by command identity
  - Safe to re-run installer
- **Manifest v2 Schema** - Runtime files array with validation
  - Schema validation on load
  - Fails fast on invalid manifest structure

### Changed
- **Installer Modes** - Idempotent by default with upgrade option
  - Install mode: Skip existing files (default)
  - Upgrade mode: Refresh managed files (`--upgrade` or `--force`)
- **README Documentation** - Added comprehensive statusline feature documentation

### Fixed
- Task ID tracking in transcript parser (High Priority #3)
- Hook deduplication now checks all hooks in array, not just first (High Priority #1)
- Manifest v2 schema validation prevents invalid installations (High Priority #4)

### Security
- 4,613 LOC code reviewed
- 0 critical security issues
- Path traversal prevention
- Command injection protection
- Null byte blocking

## [0.3.12] - 2026-03-24

### Changed
- Version bump for hapo skills release

## [0.3.1] - 2026-03-13

### Changed
- **Renamed package** from `@haposoft/cafekit-spec` to `@haposoft/cafekit`
- Deprecated the old `@haposoft/cafekit-spec` package
- Updated repository and homepage URLs to point to the official `haposoft` organization

## [0.2.2] - 2026-02-25

### Changed
- Added `scope_lock` contract to spec initialization metadata
- Updated spec lifecycle commands to enforce scope lock
- Reduced default expansion in `/spec-design`
- Clarified steering usage in requirements phase
- Added task-generation guardrail for requirement ID mapping
- Added installer sync for specs template files

### Fixed
- Regression guard for installer CLI upgrade mode

## [0.1.7] - 2026-02-24

### Changed
- Unified workflow naming around hyphens for Antigravity workflows
- Replaced `spec-impl` with `code - test - review` in primary flow
- Installer ensures dependency templates for code/test/review commands
- Updated docs workflow naming to `/docs-init` and `/docs-update` for Antigravity

## [0.1.5] - 2026-02-11

### Added
- **Documentation workflow for Antigravity** - New `/docs-init` and `/docs-update` workflows
- **GEMINI.md rule file** - Auto-installs `.agent/rules/GEMINI.md` with system rules
- **Full Antigravity support** - Documentation commands now work on both platforms
- **AGENTS.md auto-generation** - Created automatically when running docs commands

## [0.1.2] - 2026-02-04

### Changed
- **Multi-platform support** - Renamed from "Claude Code only" to "AI coding assistants"
- Updated documentation to reflect dual-platform support (Claude Code + Antigravity)
- Improved platform detection and installation UX
- Added platform compatibility matrix

## [0.1.1] - 2026-02-03

### Added
- Dual-platform installer supporting both Claude Code and Antigravity
- Auto-detection of existing `.claude/` and `.agent/` configurations
- Interactive platform selection when no configuration detected

## [0.1.0] - 2026-02-02

### Added
- Initial release of CafeKit workflow
- Initial spec workflow foundation
- Zero-config installation via npx
- Idempotent file copying (safe to re-run)
- Comprehensive documentation

---

[0.4.0]: https://github.com/haposoft/cafekit/compare/v0.3.12...v0.4.0
[0.3.12]: https://github.com/haposoft/cafekit/compare/v0.3.1...v0.3.12
[0.3.1]: https://github.com/haposoft/cafekit/compare/v0.2.2...v0.3.1
[0.2.2]: https://github.com/haposoft/cafekit/compare/v0.1.7...v0.2.2
[0.1.7]: https://github.com/haposoft/cafekit/compare/v0.1.5...v0.1.7
[0.1.5]: https://github.com/haposoft/cafekit/compare/v0.1.2...v0.1.5
[0.1.2]: https://github.com/haposoft/cafekit/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/haposoft/cafekit/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/haposoft/cafekit/releases/tag/v0.1.0
