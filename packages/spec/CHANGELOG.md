# Changelog

All notable changes to @haposoft/cafekit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.5] - 2026-05-18

### Fixed
- `hapo:specs --validate` now explicitly forbids stale `/sdd:execute-spec` handoff text and keeps the approved next step on `/hapo:develop <feature>`.
- Validation now treats non-CafeKit task filenames such as `tasks/R0-1-...` as invalid and requires `tasks/task-R0-01-...` style task paths.
- Removed the remaining `/sdd:spec-requirements` marker from the requirements template.

## [0.8.4] - 2026-05-18

### Fixed
- `hapo:specs` now explicitly locks its completion handoff to `/hapo:develop <feature>` and forbids legacy `/work` or `/code` next-step suggestions.
- `spec-maker` now reinforces the same CafeKit-native handoff when reporting generated specs.
- Skill self-tests now include static semantic checks for the `hapo:specs` implementation handoff.

## [0.8.3] - 2026-05-18

### Changed
- Claude Code subagent guidance now uses the current `Agent` invocation shape while retaining legacy `Task` compatibility notes.
- `spec-maker` now reads installed `.claude/skills/...` paths directly and avoids nested subagent orchestration from inside a subagent.
- Research, develop, test, hotfix, and inspect workflow references now distinguish subagent invocation, task-list tracking, and Bash command execution more clearly.

### Fixed
- Agent `tools:` allowlists no longer include unsupported tool names or nested subagent declarations.
- `hapo:research` now uses `Agent` for researcher delegation and reserves `TaskCreate` for task tracking.
- `hapo:inspect` now points runtime configuration at `.claude/runtime.json` in installed projects.
- State hooks now listen for current `Agent` tool usage in addition to legacy task/state tools.

## [0.8.1] - 2026-05-18

### Changed
- `hapo:specs` now uses an evidence-first gate before requirements: targeted codebase scout for existing-code changes and current external research for fast-moving or third-party decisions.
- `research.md` now records codebase evidence, external/current research, selected decisions, rejected alternatives, and downstream task/test implications.

## [0.8.0] - 2026-05-17

### Added
- `hapo:brainstorm` now runs as a scout-first pre-spec workflow for unclear ideas, architectural choices, and scope gates.
- `brainstormer` now acts as a specialist advisory agent for architecture pressure-testing inside the brainstorm workflow.
- Skill self-tests now run bundled Chrome DevTools and PDF script tests through `pnpm test`.
- `hapo:git finish` guidance documents verified branch closeout options.
- Hook protocol guidance documents privacy-block handling without expanding the main Claude runtime rules.

### Changed
- `hapo:specs` now routes unclear ideas and unresolved architecture decisions to `hapo:brainstorm` before creating spec artifacts.
- Specs, develop, test, review, and sync workflows now use `Task Test Plan & Verification Evidence` for task-level proof.
- Claude runtime rules were simplified around scout-first work, fresh verification, root-cause analysis, and concise reporting.
- Public docs now surface `hapo:brainstorm` in command references and quickstarts.

### Fixed
- Web docs lint and build issues around image usage, hooks, unused imports, and dependency overrides.

## [0.7.29] - 2026-05-05

### Fixed
- `hapo:develop` now invokes the bundled `inspector` agent instead of the non-existent `inspect` agent during codebase scouting.

## [0.7.25] - 2026-04-16

### Changed
- `hapo:specs` now maintains `task_registry` machine-state in `spec.json` alongside `task_files`
- `hapo:specs --validate` now requires a reconciliation audit before marking validation complete or enabling implementation readiness
- task hydration, sync, develop, and the active-spec hook now understand requirement-driven `task-R*.md` files and shared per-task machine state

### Fixed
- provider drift such as stale `Claude API` / `Haiku` wording is now treated as a validation failure outside `research.md`
- delete-data specs now require a single canonical deletion/retention policy instead of mixed task-level interpretations
- legacy `task-01` / `task-02` references were removed from Claude Code-facing protocols and docs

## [0.7.23] - 2026-04-15

### Added
- **hapo:generate-graph** bundled into the Claude Code skill catalog for technical SVG/PNG diagram generation

### Changed
- Claude Code is now the primary documented release surface for CafeKit
- `hapo:specs` protocol tightened around canonical state, task inventory integrity, contract locking, and implementation readiness gates
- `hapo:develop` quality gate tightened around completion criteria, verification evidence, and task-aware definition-of-done

### Fixed
- Claude installer now syncs `task.md` instead of expecting the removed `tasks.md` template
- Claude manifest no longer references the removed `code` skill
- bundled `generate-graph` metadata and docs now point to CafeKit instead of upstream install instructions

## [0.5.6] - 2026-03-26

### Added
- **hapo:inspector 2-phase approach** - Intelligent scope handling for broad requests
  - Phase 1: Structure Scout discovers actual project layout before division
  - Phase 2: Parallel Explore agents based on scout findings
  - Auto-merge small scopes (<10 files), auto-split large scopes (>100 files)
  - AskUserQuestion fallback for ambiguous structures
  - Enhanced report format with Patterns section and Suggested Next Steps

### Changed
- hapo:inspector no longer rejects broad scopes - auto-divides intelligently instead

## [0.5.5] - 2026-03-26

### Fixed
- Added missing `os` module import for API key configuration

## [0.5.4] - 2026-03-26

### Fixed
- Gemini API key prompt now writes directly to `~/.gemini/.env` file
- Prevents launching Gemini CLI in interactive mode during installation

## [0.5.3] - 2026-03-26

### Changed
- Published version (skipped due to local testing)

## [0.5.2] - 2026-03-26

### Fixed
- Corrected Gemini CLI package name from `@google/generative-ai-cli` to `@google/gemini-cli`

## [0.5.1] - 2026-03-26

### Fixed
- Gemini CLI installation prompt now waits for user input (missing `await`)
- Updated references from `hapo:inspect` to `hapo:inspector` in installer messages

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
- **Gemini CLI auto-install** - Interactive setup during cafekit installation
  - Prompts user to install gemini-cli
  - API key configuration during setup
  - Fallback to internal mode if skipped
- **runtime.json configuration** - Centralized config for external tools
  - Auto-installed to `.claude/runtime.json`
  - Gemini model configuration
  - Extensible for future external tools

### Changed
- **BREAKING:** Buid `hapo:inspector` for hapo-cafekit
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

[0.8.0]: https://github.com/haposoft/cafekit/compare/v0.7.29...v0.8.0
[0.7.29]: https://github.com/haposoft/cafekit/compare/v0.7.28...v0.7.29
[0.7.23]: https://github.com/haposoft/cafekit/compare/v0.5.6...v0.7.23
[0.4.0]: https://github.com/haposoft/cafekit/compare/v0.3.12...v0.4.0
[0.3.12]: https://github.com/haposoft/cafekit/compare/v0.3.1...v0.3.12
[0.3.1]: https://github.com/haposoft/cafekit/compare/v0.2.2...v0.3.1
[0.2.2]: https://github.com/haposoft/cafekit/compare/v0.1.7...v0.2.2
[0.1.7]: https://github.com/haposoft/cafekit/compare/v0.1.5...v0.1.7
[0.1.5]: https://github.com/haposoft/cafekit/compare/v0.1.2...v0.1.5
[0.1.2]: https://github.com/haposoft/cafekit/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/haposoft/cafekit/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/haposoft/cafekit/releases/tag/v0.1.0
