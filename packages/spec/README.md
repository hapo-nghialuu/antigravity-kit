# @haposoft/cafekit

> Spec-Driven Development workflow for AI coding assistants

[![Version](https://img.shields.io/badge/version-0.3.1-blue.svg)](https://github.com/haposoft/cafekit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-orange.svg)](https://claude.ai/code)
[![Antigravity](https://img.shields.io/badge/Antigravity-Supported-purple.svg)](https://github.com/google/antigravity)

## Overview

CafeKit is a **multi-platform** CLI tool that installs a structured workflow for AI coding assistants. It helps teams move from idea to implementation systematically using natural language commands.

**Supported Platforms:**
| Platform | Status | Installation Path |
|----------|--------|-------------------|
| [Claude Code](https://claude.ai/code) | ✅ Supported | `.claude/commands/` |
| [Antigravity](https://antigravity.google/) | ✅ Supported | `.agent/workflows/` |
| Cursor | 🔮 Planned | 🔮 Planned |
| GitHub Copilot | 🔮 Planned | TBD |
| Windsurf | 🔮 Planned | TBD |

**What it does:**
- Installs workflow commands into your AI editor command/workflow folder
- Enables spec-driven development with clear phase separation
- Creates living documentation for every feature
- Works with zero configuration
- **Idempotent by default** - Safe to re-run, skips existing files
- **Upgrade mode available** - Use `--upgrade` (or `--force`) to refresh managed templates

**What it doesn't do:**
- Generate code (commands guide AI to help you write code)
- Require configuration (zero-config installation)
- Lock you to a specific AI editor

## Features

- **🎯 Multi-platform** - Works with Claude Code, Antigravity, and future AI editors
- **📋 Spec-first workflow** - `spec-init - spec-requirements - spec-design - spec-tasks` + `code - test - review`
- **📝 Documentation workflow** - `/docs init` and `/docs update` for project documentation
- **⚡ Zero-config** - Works out of the box with sensible defaults
- **🔄 Idempotent** - Safe to re-run, skips existing files
- **📦 No global install** - Use directly with `npx`
- **🚀 Future-proof** - Easy to add support for new AI editors

## Claude Code Statusline (Claude Code Only)

CafeKit automatically installs an enhanced statusline for Claude Code that provides real-time session context.

**What it shows:**
- **Context usage** - Percentage and token count (e.g., `23% 45K/200K`)
- **Session timer** - Elapsed time since session start
- **Git status** - Current branch and dirty state indicator
- **Active agents** - Count of running subagents
- **Todo items** - Count of pending tasks

**Installation:**
- Automatically installed when running `npx @haposoft/cafekit` in a Claude Code project
- Merges with existing `settings.json` configuration without overwriting user settings
- Safe to re-run - preserves non-CafeKit statusline configurations
- Upgrade mode (`--upgrade`) refreshes managed runtime files

**Configuration:**
The statusline is configured via `.claude/settings.json`:
```json
{
  "statusLine": {
    "type": "command",
    "command": "node \"$CLAUDE_PROJECT_DIR/.claude/status.cjs\"",
    "padding": 0
  }
}
```

**Runtime files installed:**
- `.claude/status.cjs` - Main statusline script
- `.claude/hooks/session.cjs` - Session initialization hook
- `.claude/hooks/agent.cjs` - Subagent context injection hook
- `.claude/hooks/usage.cjs` - Usage tracking hook
- `.claude/hooks/lib/*.cjs` - Shared utilities (color, parser, git, config, etc.)

**Note:** This feature is Claude Code exclusive and not available for Antigravity.

## Installation

### Prerequisites

- Node.js 18+
- An AI coding assistant (Claude Code or Antigravity)

### Install Workflow

Run in your project root:

```bash
npx @haposoft/cafekit
```

The installer will:
1. **Auto-detect** your AI editor configuration (`.claude/` or `.agent/`)
2. **Prompt** you to select platform if not detected
3. **Copy** workflow commands to the appropriate directory
4. **Install** shared skills for spec-driven development
5. **[Claude Code only]** Install unprefixed skill directories (`spec-init`, `spec-requirements`, `spec-design`, `spec-tasks`, `code`, `test`, `review`) that expose `hapo:`-prefixed skill names
6. **Ensure dependencies** for `code - test - review` by installing missing command/agent templates

Installer modes:
- **Default install mode**: `npx @haposoft/cafekit` (skip existing files)
- **Upgrade mode**: `npx @haposoft/cafekit --upgrade` (overwrite managed templates)
- **Alias**: `--force` / `-f` behaves the same as `--upgrade`

**Example output (Claude Code):**
```
CafeKit Installer v0.3.12
========================================

Installing for: Claude Code
Mode: install (skip existing files)

Claude Code (.claude/)
----------------------------------------
✓ Skill installed: specs
✓ Skill installed: spec-init
✓ Skill installed: spec-requirements
✓ Skill installed: spec-design
✓ Skill installed: spec-tasks
✓ Skill installed: code
✓ Skill installed: test
✓ Skill installed: review
✓ Copied: spec-init.md
✓ Copied: spec-requirements.md
...

╔════════════════════════════════════════════════════════╗
║         Installation Complete!                         ║
╚════════════════════════════════════════════════════════╝

  Installed Skills:   Yes ✓

Next steps:
  1. Start your AI editor

  For Claude Code:
     Run: /spec-init <feature-name>
     Or use skill: /hapo:spec-init <feature-description>

  2. Follow the workflow: requirements - design - tasks - code - test - review

Documentation: https://github.com/haposoft/cafekit
```

## Workflows

CafeKit provides two workflow categories:

### 1. Spec-Driven Development Workflows (`spec-*`)

**Purpose:** Structured feature development from idea to implementation

**Claude Code Commands:**
| Command | Purpose | Phase |
|---------|---------|-------|
| `/spec-init` | Initialize new feature spec | 1 |
| `/spec-requirements` | Generate EARS requirements | 2 |
| `/spec-design` | Create technical design | 3 |
| `/spec-validate` | Validate design decisions via interview | 4 |
| `/spec-tasks` | Break down into tasks | 5 |
| `/code` | Implement tasks from spec artifacts | 6 |
| `/test` | Run tests for implemented changes | 7 |
| `/review` | Review code quality and risks | 8 |
| `/spec-status` | Check progress | 9 |

**Antigravity Workflows:**
| Workflow | Purpose | Phase |
|----------|---------|-------|
| `/spec-init` | Initialize new feature spec | 1 |
| `/spec-requirements` | Generate EARS requirements | 2 |
| `/spec-design` | Create technical design | 3 |
| `/spec-validate` | Validate design decisions via interview | 4 |
| `/spec-tasks` | Break down into tasks | 5 |
| `/code` | Implement tasks from spec artifacts | 6 |
| `/test` | Run tests for implemented changes | 7 |
| `/review` | Review code quality and risks | 8 |
| `/spec-status` | Check progress | 9 |

**Generated Files:**
```
.specs/
└── feature-name/
    ├── spec.json
    ├── requirements.md
    ├── design.md
    └── tasks/
```

---

### 2. Documentation Workflows (`docs`)

**Purpose:** Project documentation management and maintenance

**Claude Code Commands:**
| Command | Purpose |
|---------|---------|
| `/docs init` | Initialize comprehensive documentation |
| `/docs update` | Update docs after code changes |

**Antigravity Workflows:**
| Workflow | Purpose |
|----------|---------|
| `/docs-init` | Initialize comprehensive documentation |
| `/docs-update` | Update docs after code changes |

**Generated Files:**
```
docs/
├── codebase-summary.md
├── project-overview-pdr.md
├── code-standards.md
├── system-architecture.md
├── design-guidelines.md
├── deployment-guide.md
└── project-roadmap.md
```

---

## Quick Start

### A. Spec Workflow - Building User Authentication

```bash
# Step 1: Initialize spec
/spec-init User authentication with JWT and refresh tokens

# AI creates:
# - .specs/user-authentication/
# - .specs/user-authentication/spec.json
# - .specs/user-authentication/requirements.md

# Step 2: Generate requirements
/spec-requirements user-authentication

# AI analyzes codebase and generates:
# - Functional requirements (EARS format)
# - Acceptance criteria
# - Constraints

# Step 3: Create design
/spec-design user-authentication

# AI generates:
# - Architecture decisions
# - API endpoints
# - Database schema
# - Component structure

# Step 4: Validate design decisions (recommended for medium/high-risk features)
/spec-validate user-authentication

# AI confirms:
# - Critical trade-offs and assumptions
# - Risk-sensitive defaults
# - Follow-up actions before task generation

# Step 5: Break down tasks
/spec-tasks user-authentication

# AI creates:
# - Prioritized task list
# - Dependencies
# - Estimated complexity

# Step 6: Code
/code user-authentication

# Step 7: Test
/test

# Step 8: Review
/review

# Step 9: Check status
/spec-status user-authentication

# AI reports:
# - Progress (5/8 tasks complete)
# - Blockers
# - Next steps
```

## Workflow Overview

### Workflow Diagram

```
Idea - /spec-init - /spec-requirements - /spec-design - /spec-validate - /spec-tasks - /code - /test - /review - /spec-status
       |<----------------------------------------------|-----------------------------|
                                                      |
                                                   iterate
```

### 1. /spec-init

**Purpose:** Initialize a new specification from a project description.

**When to use:** Starting a new feature, enhancement, or component.

**What it does:**
- Generates feature name from description
- Creates `.specs/[feature-name]/` directory
- Initializes `spec.json` metadata
- Creates `requirements.md` template

**Example:**
```bash
/spec-init Dark mode toggle with user preference persistence

# Creates:
# .specs/dark-mode-toggle/
#   ├── spec.json
#   └── requirements.md (with initial description)
```

**Tips:**
- Be specific (5+ words describing what to build)
- Avoid vague terms like "improve" or "better" without context
- Include key nouns (e.g., "login form", "dashboard chart")

---

### 2. /spec-requirements

**Purpose:** Generate comprehensive requirements in EARS format.

**When to use:** After initialization, before design phase.

**What it does:**
- Analyzes existing codebase for related code
- Loads project steering context (`.specs/steering/`)
- Generates functional requirements with acceptance criteria
- Documents constraints and assumptions

**Example:**
```bash
/spec-requirements dark-mode-toggle

# Updates requirements.md with:
# - Functional Requirements (EARS format)
#   - "When user clicks toggle, system shall switch theme"
#   - "When theme changes, system shall persist preference"
# - Acceptance Criteria
# - Constraints (browser support, accessibility)
```

**EARS format example:**
```markdown
## Functional Requirements

### FR-1: Theme Toggle
When user clicks the theme toggle button,
the system shall switch between light and dark themes
and update UI within 200ms.

**Acceptance Criteria:**
- Toggle state reflects current theme
- Animation is smooth (no flash)
- All components respect theme
```

---

### 3. /spec-design

**Purpose:** Create detailed technical design from requirements.

**When to use:** After requirements are finalized, before task breakdown.

**What it does:**
- Generates architecture decisions
- Defines API contracts (if needed)
- Creates database schema (if needed)
- Specifies component structure
- Documents technology choices

**Example:**
```bash
/spec-design dark-mode-toggle

# Creates design.md with:
# - Architecture: Context API for theme state
# - Components: ThemeToggle.tsx, ThemeProvider.tsx
# - Storage: localStorage with 'theme' key
# - CSS: Tailwind dark: variants
```

**Output structure:**
```markdown
# Design Specification

## Architecture Decisions
- Use React Context for global theme state
- Tailwind CSS dark mode (class strategy)

## Component Structure
- ThemeProvider (context wrapper)
- ThemeToggle (button component)
- useTheme hook (consume context)

## Data Flow
User clicks -> dispatch action -> update context -> localStorage -> re-render
```

---

### 4. /spec-validate

**Purpose:** Validate design assumptions, trade-offs, and risk-sensitive decisions before task generation.

**When to use:** After `/spec-design`, especially for medium/high-risk features or external integrations.

**What it does:**
- Interviews critical decision points using structured questions
- Appends validation log to `research.md`
- Updates validation metadata in `spec.json`
- Recommends follow-up actions before task breakdown

**Example:**
```bash
/spec-validate dark-mode-toggle
```

---

### 5. /spec-tasks

**Purpose:** Break design into implementable tasks.

**When to use:** After design is approved, before implementation.

**What it does:**
- Generates prioritized task list
- Identifies dependencies between tasks
- Estimates complexity (simple/medium/complex)
- Creates execution order

**Example:**
```bash
/spec-tasks dark-mode-toggle

# Creates tasks.md with:
# Task #1: Create ThemeContext and Provider (simple)
# Task #2: Build ThemeToggle button component (simple)
# Task #3: Implement localStorage persistence (medium)
# Task #4: Add dark mode CSS variables (medium)
# Task #5: Test theme switching across pages (medium)
```

**Task format:**
```markdown
## Task #1: Create ThemeContext
- **Priority:** High
- **Complexity:** Simple
- **Dependencies:** None
- **Files:** src/context/ThemeContext.tsx
- **Description:** Set up React Context with theme state
- **Status:** pending
```

---

### 5. /code

**Purpose:** Implement a specific task from the task list.

**When to use:** After `/spec-tasks`, to implement approved tasks from spec artifacts.

**What it does:**
- Reads spec artifacts (`tasks.md`, `design.md`, `requirements.md`)
- Implements approved work with minimal scope
- Hands off to `/test` and `/review`
- Reports blockers and next actions

**Example:**
```bash
# Implement from approved spec tasks
/code dark-mode-toggle

# Then run quality gates
/test
/review
```

**Iteration pattern:**
```bash
# Repeat the quality loop after each coding pass
/code dark-mode-toggle
/test
/review
```

---

### 6. /test

**Purpose:** Run tests after `/code`.

**When to use:** Immediately after each coding pass.

**Example:**
```bash
/test
```

---

### 7. /review

**Purpose:** Review recent changes for quality and risk.

**When to use:** After `/test` passes.

**Example:**
```bash
/review
```

---

### 8. /spec-status

**Purpose:** Check progress and next steps.

**When to use:** Anytime during or after implementation.

**What it does:**
- Reads `tasks.md` for completion status
- Calculates progress percentage
- Identifies blockers or pending tasks
- Suggests next actions

**Example:**
```bash
/spec-status dark-mode-toggle

# Output:
# Progress: 3/5 tasks completed (60%)
# Completed: #1, #2, #3
# Pending: #4, #5
# Next: Implement Task #4 (Add dark mode CSS variables)
# Blockers: None
```

**Status indicators:**
- `pending` - Not started
- `in-progress` - Partially implemented
- `completed` - Finished
- `blocked` - Waiting on dependency

---

### B. Docs Workflow - Initialize Project Documentation

**Claude Code:**
```bash
# Initialize documentation
/docs init

# AI creates:
# - docs/codebase-summary.md
# - docs/project-overview-pdr.md
# - docs/code-standards.md
# - docs/system-architecture.md
# - docs/design-guidelines.md
# - docs/deployment-guide.md
# - docs/project-roadmap.md
# - .agent/rules/AGENTS.md (for Antigravity) or CLAUDE.md (for Claude Code)

# Update after code changes
/docs update
```

**Antigravity:**
```bash
# Initialize documentation
/docs-init

# AI creates the same 7 docs files + AGENTS.md

# Update after code changes
/docs-update
```

---

## File Structure

### Platform-Specific Installation

**Claude Code** (`.claude/`):
```
.claude/
├── commands/
│   ├── spec-init.md          # Spec workflows
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── code.md
│   ├── test.md
│   ├── review.md
│   ├── spec-status.md
│   └── docs.md               # Docs workflows
└── skills/
    ├── specs/
    ├── impact-analysis/
    ├── spec-init/
    ├── spec-requirements/
    ├── spec-design/
    ├── spec-tasks/
    ├── code/
    ├── test/
    └── review/
```

**Antigravity** (`.agent/`):
```
.agent/
├── workflows/                   # Antigravity workflows (hyphen naming)
│   ├── spec-init.md
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── code.md
│   ├── test.md
│   ├── review.md
│   ├── spec-status.md
│   ├── docs-init.md            # Docs workflows
│   └── docs-update.md
├── skills/
│   ├── specs/
│   └── impact-analysis/
└── rules/
    └── GEMINI.md               # System rules (always_on)
```

**Command Naming:**
- **Claude Code:** Uses hyphens (`/spec-init`, `/docs init`)
- **Antigravity:** Uses hyphens (`/spec-init`, `/docs-init`)

### Generated Specs Directory

Specs are created in `.specs/` (shared across all platforms):
```
.specs/
├── steering/              # Project-wide conventions
│   ├── tech.md
│   ├── structure.md
│   └── product.md
└── feature-name/          # Individual feature specs
    ├── spec.json
    ├── requirements.md
    ├── design.md
    ├── research.md
    └── tasks/
        └── sprint-1.md
```

---

## FAQ

### Q: Which AI editors are supported?

A: Currently supports:
- ✅ **Claude Code** - `.claude/commands/`
- ✅ **Antigravity** - `.agent/workflows/`

Planned for future:
- 🔮 **Cursor** - `.cursor/commands/`
- 🔮 **GitHub Copilot** - TBD
- 🔮 **Windsurf** - TBD

### Q: Can I use multiple AI editors on the same project?

A: Yes! You can install CafeKit for multiple platforms:
```bash
npx @haposoft/cafekit
# Select "Both" when prompted
```

This installs commands to both `.claude/` and `.agent/`. The `.specs/` directory is shared, so your specifications work across all editors.

### Q: Can I customize the workflow steps?

A: Yes. Edit the `.md` files in `.claude/commands/` (Claude Code) or `.agent/workflows/` (Antigravity) after installation.

### Q: Is it safe to re-run `npx @haposoft/cafekit`?

A: Yes. Default mode is idempotent and skips existing files.

### Q: How do I update existing installed templates to the latest version?

A: Run installer in upgrade mode:
```bash
npx @haposoft/cafekit --upgrade
# or
npx @haposoft/cafekit --force
```
This overwrites files managed by the installer (commands/workflows, managed dependencies, and routing/rules templates).

### Q: What language is the spec generated in?

A: Defaults to English.

### Q: Can I use this for multiple features simultaneously?

A: Yes. Each spec has its own directory in `.specs/`. Work on multiple in parallel.

### Q: Why are the command names different between Claude Code and Antigravity?

A: Each platform has different conventions:
- **Claude Code** uses hyphens: `/spec-init`, `/docs update`
- **Antigravity** uses hyphens: `/spec-init`, `/docs-init`

The functionality is identical, only the naming convention differs.

---

## Troubleshooting

### "No platform configuration detected"

**Cause:** Neither `.claude/` nor `.agent/` folder exists in your project.

**Solution:**
```bash
# Option 1: Create Claude Code folder
mkdir -p .claude/commands

# Option 2: Create Antigravity folder
mkdir -p .agent/workflows

# Option 3: Run installer and it will prompt you to select platform
npx @haposoft/cafekit
```

### "Command not found" after installation

**Claude Code:**
- Commands load automatically
- If not visible, restart Claude Code extension
- Verify: `ls .claude/commands/spec-*.md`

**Antigravity:**
- Workflows load automatically when IDE opens the project
- Verify: `ls .agent/workflows/*.md`
- Check `GEMINI.md` is in `.agent/rules/` for system rules

---

## Best Practices

### 1. Phase Separation

Complete each phase before moving to the next:
- Don't skip requirements (even for "simple" features)
- Finalize design before creating tasks
- Implement tasks sequentially (respect dependencies)

### 2. Incremental Implementation

Break large features into smaller specs:
```bash
# Instead of:
/spec-init Complete e-commerce system

# Do:
/spec-init Product listing page
/spec-init Shopping cart functionality
/spec-init Checkout flow
```

### 3. Steering Context

For projects with shared conventions:
1. Create `.specs/steering/` directory
2. Add files like `tech.md`, `structure.md`, `product.md`
3. All specs will automatically reference these

Example `.specs/steering/tech.md`:
```markdown
# Technology Standards

- Frontend: React 18 + TypeScript
- Styling: Tailwind CSS v4
- State: Zustand
- Testing: Vitest + Playwright
```

### 4. Version Control

Commit after each phase:
```bash
/spec-init feature-name
git add .specs/feature-name/
git commit -m "spec: init feature-name"

/spec-requirements feature-name
git add .specs/feature-name/requirements.md
git commit -m "spec: requirements for feature-name"

# ... continue for design, tasks, impl
```

### 5. Task Granularity

Good task size: 30-60 minutes of work.

Too large:
```markdown
Task #1: Build entire authentication system
```

Better:
```markdown
Task #1: Create User model and migration
Task #2: Implement JWT generation
Task #3: Add login endpoint
Task #4: Add protected route middleware
```

---

## Contributing

- **Report issues:** https://github.com/haposoft/cafekit/issues
- **Suggest improvements:** Open a GitHub Discussion

---

## Support

- **GitHub:** https://github.com/haposoft/cafekit
- **Issues:** https://github.com/haposoft/cafekit/issues
- **Discussions:** https://github.com/haposoft/cafekit/discussions

---

## Changelog

### [0.3.1] - 2026-03-13

#### Changed
- **Renamed package** from `@haposoft/cafekit-spec` to `@haposoft/cafekit`
- Deprecated the old `@haposoft/cafekit-spec` package
- Updated repository and homepage URLs to point to the official `haposoft` organization

### [0.2.2] - 2026-02-25

#### Changed
- Added `scope_lock` contract to spec initialization metadata (`source`, `in_scope`, `out_of_scope`, `expansion_policy`)
- Updated `/spec-requirements`, `/spec-design`, `/spec-validate`, and `/spec-tasks` to enforce scope lock across the full spec lifecycle
- Reduced default expansion in `/spec-design`: uncertain cases now default to light discovery and only escalate to full on explicit triggers
- Clarified steering usage in requirements phase: steering is constraints-only and must not introduce new capability domains
- Added task-generation guardrail: every task must map to valid in-scope numeric requirement IDs
- Added installer sync for specs template files in Claude mode to reduce stale runtime copy drift

#### Regression Guard (installer CLI upgrade mode)
Use this checklist after running `npx @haposoft/cafekit --upgrade`:
- Run `/spec-init` with an installer-CLI-scoped feature description and verify `spec.json.scope_lock` is populated
- Run `/spec-requirements`, `/spec-design`, `/spec-validate`, `/spec-tasks` in order
- Verify requirements/design/tasks do **not** introduce API/mobile/DynamoDB domains unless explicitly approved
- Verify task entries reference valid in-scope numeric requirement IDs only
- If scope expansion is explicitly approved during validation, verify `scope_lock` updates are reflected in `spec.json`

### [0.1.7] - 2026-02-24

#### Changed
- Unified workflow naming around hyphens for Antigravity workflows
- Replaced `spec-impl` in primary flow with `code - test - review`
- Installer now ensures dependency templates for `code/test/review` commands and required agents
- Updated docs workflow naming to `/docs-init` and `/docs-update` for Antigravity

### [0.1.5] - 2026-02-11

#### Added
- **Documentation workflow for Antigravity** - New `/docs-init` and `/docs-update` workflows
- **GEMINI.md rule file** - Auto-installs `.agent/rules/GEMINI.md` with system rules for Antigravity
- **Full Antigravity support** - Documentation commands now work on both Claude Code and Antigravity
- **AGENTS.md auto-generation** - Created automatically when running `/docs-init` or `/docs-update`

### [0.1.2] - 2026-02-04

#### Changed
- **Multi-platform support** - Renamed from "Claude Code only" to "AI coding assistants"
- Updated documentation to reflect dual-platform support (Claude Code + Antigravity)
- Improved platform detection and installation UX
- Added platform compatibility matrix

### [0.1.1] - 2026-02-03

#### Added
- Dual-platform installer supporting both Claude Code and Antigravity
- Auto-detection of existing `.claude/` and `.agent/` configurations
- Interactive platform selection when no configuration detected

### [0.1.0] - 2026-02-02

#### Added
- Initial release of CafeKit workflow
- Initial spec workflow foundation
- Zero-config installation via npx
- Idempotent file copying (safe to re-run)
- Comprehensive documentation

---

## License

MIT License - See [LICENSE](LICENSE) for details

---

**Made with care by the Haposoft Team**

<p align="center">
  <sub>Multi-platform Workflow for AI Coding Assistants</sub>
</p>
