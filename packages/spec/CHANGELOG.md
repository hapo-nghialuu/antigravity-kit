# Changelog

All notable changes to @haposoft/cafekit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.9.7] - 2026-06-01

### Changed
- The generated addressing section in `CLAUDE.md` is now written in English (heading `## Addressing (Context Overflow Indicator)` and an English instruction); only the address term itself stays as the user entered it.
- The section matcher keys off the shared `Context Overflow Indicator` marker, so reinstalling over an older Vietnamese section replaces it in place without duplicating.

## [0.9.6] - 2026-06-01

### Fixed
- Addressing configuration now writes to the project-root `CLAUDE.md` instead of the non-existent `.claude/CLAUDE.md`, so the term entered during install (`đại ca`, etc.) is actually applied.
- Shortened the generated addressing section to a single-line instruction; `docs/addressing.md` updated to reference the correct `CLAUDE.md` location.

## [0.9.5] - 2026-05-31

### Added
- Addressing (xưng hô) configuration as a context-overflow indicator:
  - Installer asks a single question for how the AI should address the user (e.g. `boss`, `sir`, `anh`, `đại ca`), writing the rule directly into the runtime `CLAUDE.md`. Leaving it blank skips the section entirely.
  - When the model stops addressing the user as configured mid-session, it signals that the context window has likely been compacted/truncated and suggests `/clear`.
  - Input is validated to letters and spaces; invalid entries are skipped.
- `docs/addressing.md` documents the feature, configuration, and overflow-detection behavior.

## [0.9.3] - 2026-05-29

### Added
- Added `hapo:specs` planning decision frameworks:
  - `ask-user-question-gates.md` defines when specs must pause for user-owned decisions and when evidence/research should answer instead.
  - `phase-decision-matrix.md` guides implementation slices/task clusters such as R0 foundation, risk spikes, vertical slices, integration gates, and verification gates.
  - `task-scoring-rubric.md` scores candidate tasks for priority, split/merge, spike needs, dependencies, parallel eligibility, and evidence depth.

### Changed
- `hapo:specs` now loads the decision frameworks during description analysis, scope inquiry, design, task breakdown, and validation review.
- `tasks-generation.md` now requires pre-generation decision gates before writing `tasks/task-R*.md` files.

## [0.9.2] - 2026-05-28

### Fixed
- `hooks/state.cjs` no longer emits "Agent Result: unknown" sections (skipped at `SubagentStop` when `agent_type` is missing or `unknown`) and caps retained agent sections at 3 most recent. Also limits `Key Files Modified` to top 5 entries. Reduces SessionStart payload re-injection across resume/compact events.

## [0.9.1] - 2026-05-27

### Added
- Added `hapo:question` / OpenCode `/question` as the standard evidence-backed Q&A skill for source code, docs, specs, config, dependencies, and external technical knowledge.
- OpenCode installs now ship CafeKit runtime plugins under `.opencode/plugins/`:
  - `privacy-block.ts` — blocks reads of `.env`, key, credential, and token files via `tool.execute.before`; mirrors the Claude `privacy-block.cjs` JSON-marker UX so assistants prompt the user before retrying via `bash cat`.
  - `inspect-block.ts` — blocks reads/globs that target heavy dirs (`node_modules`, `.next`, `dist`, …) and excessively broad glob patterns; allows approved build/package-manager commands.
  - `docs-sync.ts` — on `session.created`, writes a banner to `.opencode/session-banner.md` when source code exists without `docs/` or when `docs/.sync_hash` is stale.
  - `session.ts` — writes project type / package manager / framework / git branch banner; emits the compaction warning on `session.compacted`.
  - `state.ts` — loads `.opencode/session-state/latest.md` on `session.created`, refreshes on `tool.execute.after` for state-shaping tools (`todowrite`, `task*`), and archives on `session.idle`.
- Installer now writes `.opencode/package.json` with `@opencode-ai/plugin ^1.15.11`; OpenCode runs `bun install` automatically at startup.

### Changed
- Standardized the temporary `qs` skill surface back to `question` across Claude Code, OpenCode, package docs, and cafekit-web docs.
- `normalizeOpenCodeBody` now rewrites `hooks/.logs/` → `plugins/.logs/` so the OpenCode `.gitignore` ignores plugin log output rather than the legacy hook log path.

### Gaps (documented, intentionally unported)
- `rules.cjs`, `agent.cjs`, `spec-state.cjs`, and the prompt half of `usage.cjs` remain Claude-only — OpenCode has no equivalent for `UserPromptSubmit` / `SubagentStart`. Equivalent guidance lives in `AGENTS.md` + `.opencode/rules/*` (skill workflow + domain routing) so OpenCode users still get the routing and spec-drift reminders, just statically rather than via a runtime hook.
- The Claude statusline (`status.cjs`) remains Claude-only.

## [0.9.0] - 2026-05-26

### Changed (breaking)
- OpenCode installs are now self-contained under `.opencode/`. Skills, rules, scripts, references, `runtime.json`, and `.gitignore` previously written to `.claude/` are now installed to `.opencode/skills`, `.opencode/rules`, `.opencode/scripts`, `.opencode/references`, `.opencode/runtime.json`, and `.opencode/.gitignore`.
- Text assets copied into `.opencode/` are rewritten on copy so internal references and Windows path variants point at the OpenCode runtime layout (`CLAUDE.md` → `AGENTS.md`, quoted `.claude` literals → `.opencode`).
- Installer now prints a warning when an existing `.claude/` directory is detected during an OpenCode-only install so users can clean up the legacy layout manually.

### Fixed
- OpenCode skill installs now strip the Claude-only `hapo:` prefix from `SKILL.md` `name` frontmatter so skills satisfy OpenCode's strict `^[a-z0-9]+(-[a-z0-9]+)*$` validation and match the containing directory name.

### Migration
- Existing OpenCode users upgrading from 0.8.17 may safely delete the legacy `.claude/` directory after re-running the installer; the OpenCode runtime no longer reads from it.
- Combined installs (Claude + OpenCode) continue to write both `.claude/` and `.opencode/` as independent self-contained runtimes.

## [0.8.17] - 2026-05-26

### Changed
- Replaced the secondary installer platform option from Antigravity to OpenCode.
- OpenCode installs now write `.opencode/commands`, converted `.opencode/agents`, root `AGENTS.md`, merged `opencode.json`, shared `.claude/skills`, `.claude/rules`, and `.claude/scripts`.
- OpenCode commands now use prefix-free command names, bind to matching CafeKit agents with `agent`/`subtask`, and use OpenCode `permission` frontmatter for skill/task access.
- OpenCode setup now supports project-local model configuration through `OPENCODE_MODEL`, `OPENCODE_DEFAULT_MODEL`, or installer input.

### Removed
- Removed the legacy Antigravity source bundle from packaged install assets.

## [0.8.16] - 2026-05-25

### Changed
- Replaced the automatic scoring-based `skill-router` hook with Research-style workflow/domain routing rules and a generated skill catalog script.
- Installer upgrades now remove obsolete `skill-router` runtime files and settings hooks from existing projects.

### Removed
- Removed `hooks/skill-router.cjs` and `hooks/lib/skill-router-routes.cjs` from the Claude runtime bundle.

## [0.8.15] - 2026-05-23

### Added
- Added `hapo:docs` for project documentation workflows, including `reconstruct` mode for source-backed as-is system documentation with evidence, confidence, and unknown tracking.
- Expanded `hapo:docs` normal-docs workflow into detailed `init`, `update`, and `summarize` phases with source scouting, docs reading, size checks, docs validation, and runtime docs-root support.
- Added reconstruct templates, a self-contained `overview.html` review dashboard, source snapshot/review metadata, and a deterministic as-is bundle validator.
- Added skill-router coverage for project docs, legacy/as-is documentation, and source-code-to-docs prompts in Vietnamese, English, and Japanese.

### Changed
- Switched explicit `hapo:docs` mode selection to flag forms such as `--init`, `--update`, `--summarize`, and `--reconstruct`.

## [0.8.13] - 2026-05-22

### Changed
- Unified CafeKit runtime configuration on `.claude/runtime.json` for Claude Code projects.
- `hapo:skill-router`, statusline rendering, docs sync, and usage tracking now read project runtime settings consistently from the installed runtime bundle.

### Fixed
- `hapo:skill-router` now respects `hooks.skill-router` from `.claude/runtime.json`.
- `docs-sync` now honors `paths.docs`, `usage` resolves runtime config from hook `cwd`, and `statuslineColors` now actually controls statusline color output.

## [0.8.11] - 2026-05-19

### Changed
- Hardened `hapo:specs` task validation so generated tasks must keep the full CafeKit task shape: `Context`, `Constraints`, `Related Files`, `Completion Criteria`, `Evidence`, runtime reachability proof, and `Risk Assessment`.
- Prevented complex specs with 5+ tasks from becoming implementation-ready until `/hapo:specs --validate` completes Red Team + Validate and persists validation state.
- Installed `.claude/.gitignore` from the Claude runtime bundle so generated session state, hook logs, caches, local env files, and skill dependencies stay out of commits.

## [0.8.10] - 2026-05-19

### Added
- Added installed CafeKit version tracking in `.claude/cafekit.json` / `.agent/cafekit.json`, including current version, previous version, install timestamps, platform metadata, and reproducible `npx @haposoft/cafekit@<version>` install command.

### Changed
- Strengthened `hapo:specs --validate` so deterministic validator failure blocks PASS, `ready_for_implementation`, and `/hapo:develop` handoff.

## [0.8.9] - 2026-05-19

### Added
- Added a deterministic `validate-spec-output.cjs` validator for generated `hapo:specs` artifacts. It blocks boolean `scope_lock`, stale `tasks` arrays, stale or incomplete `task_registry`, missing `research.md` evidence summaries, all-`R0` feature task sets, and task files without evidence.
- Added self-test fixtures that prove a compact valid spec passes and a triage-dashboard-like invalid spec fails.

### Changed
- Simplified the task template toward the v0.7.29 super-admin style: `Context`, `Steps`, `Requirements`, `Related Files`, `Completion Criteria`, `Evidence`, and `Risk Assessment`.
- Relaxed task grouping so task IDs follow implementation flow while requirement coverage remains explicit in each task, avoiding over-fragmentation by requirement number.
- Updated specs, develop, test, and review guidance to treat `Evidence` as the primary task proof section while still accepting `Task Test Plan & Verification Evidence` and legacy `Verification & Evidence`.
- Added task-level test type guidance so unit, component, integration, E2E/UI, visual, accessibility, smoke, regression, performance, and security checks are applied only when the task risk/surface requires them.

## [0.8.8] - 2026-05-18

### Changed
- `hapo:specs` now requires runtime reachability proof for task outputs and final integration coverage for UI/app/runtime workflows.
- `hapo:develop` now performs task-aware source scouting for every task and runs a final integration scout before reporting completion.
- `hapo:develop` quality gate now separates spec compliance review from code quality review, with scope drift and orphaned runtime artifacts treated as blocking failures.
- `hapo:test` now supports spec-aware feature verification via `/hapo:test <feature>` or `/hapo:test specs/<feature>`.

### Fixed
- `hapo:specs --validate` handoff text now consistently points to `/hapo:develop <feature>` instead of legacy approve/spec aliases.

## [0.8.7] - 2026-05-18

### Fixed
- Hardened the `hapo:specs` output contract to keep generated specs on `spec.json` / `spec-state.json` and CafeKit task filename conventions.
- Strengthened self-tests around spec artifact names and legacy output redirects.

## [0.8.6] - 2026-05-18

### Fixed
- `hapo:specs <feature-description>` now explicitly continues past Init into requirements, design, tasks, and finalization.
- Legacy `spec-init` output now redirects to `/hapo:specs resume <feature>`.
- Skill self-tests now cover the init-continuation and legacy-command redirect semantics.

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
