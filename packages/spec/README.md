# @haposoft/cafekit-spec

> Spec-Driven Development workflow for Claude Code

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/hapo-nghialuu/hapo-cafekit)
[![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Claude%20Code-green.svg)](https://github.com/hapo-nghialuu/hapo-cafekit)

## Overview

CafeKit Spec is a lightweight CLI tool that installs a structured 6-step specification workflow for Claude Code. It helps teams move from idea to implementation systematically using slash commands.

**What it does:**
- Installs 6 workflow commands into your `.claude/commands/` folder
- Enables spec-driven development with clear phase separation
- Creates living documentation for every feature
- Works with zero configuration

**What it doesn't do:**
- Generate code (commands guide Claude Code to help you write code)
- Require configuration (zero-config installation)

## Features

- **6-step spec workflow** - From init to implementation tracking
- **Zero-config** - Works out of the box with sensible defaults
- **Idempotent** - Safe to re-run, skips existing files
- **No global install** - Use directly with `npx`

## Installation

### Prerequisites

- Node.js 18+
- Claude Code

### Install Spec Workflow

Run in your project root:

```bash
npx @haposoft/cafekit-spec
```

**Expected output:**
```
CafeKit Spec Installer

Detected .claude/ folder
Copied: spec-init.md
Copied: spec-requirements.md
Copied: spec-design.md
Copied: spec-tasks.md
Copied: spec-impl.md
Copied: spec-status.md

Installation complete!
   Copied: 6 files
   Skipped: 0 files

Next steps:
   1. Run /spec-init <feature-name>
   2. Follow the spec workflow: requirements -> design -> tasks -> impl

Documentation: https://github.com/hapo-nghialuu/hapo-cafekit
```

## Quick Start

### Complete Example - Building User Authentication

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

# Step 4: Break down tasks
/spec-tasks user-authentication

# AI creates:
# - Prioritized task list
# - Dependencies
# - Estimated complexity

# Step 5: Implement (iterative)
/spec-impl user-authentication 1

# AI implements task #1:
# - Generates code
# - Runs tests
# - Updates task status

# Repeat for remaining tasks
/spec-impl user-authentication 2
/spec-impl user-authentication 3

# Step 6: Check status
/spec-status user-authentication

# AI reports:
# - Progress (5/8 tasks complete)
# - Blockers
# - Next steps
```

## Workflow Overview

### Workflow Diagram

```
Idea -> /spec-init -> /spec-requirements -> /spec-design -> /spec-tasks -> /spec-impl -> /spec-status
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

### 4. /spec-tasks

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

### 5. /spec-impl

**Purpose:** Implement a specific task from the task list.

**When to use:** Iteratively, for each task in order of priority.

**What it does:**
- Reads task definition from `tasks.md`
- Generates code based on design specification
- Runs tests (if test files exist)
- Updates task status to "completed"
- Reports any blockers

**Example:**
```bash
# Implement first task
/spec-impl dark-mode-toggle 1

# AI generates:
# - src/context/ThemeContext.tsx
# - Updates tasks.md: Task #1 status -> completed

# Continue with next task
/spec-impl dark-mode-toggle 2
```

**Iteration pattern:**
```bash
# Sequential implementation
for task in 1 2 3 4 5; do
  /spec-impl dark-mode-toggle $task
  # Review, test, commit before next task
done
```

---

### 6. /spec-status

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

## File Structure

Commands are installed to `.claude/commands/`:
```
.claude/
└── commands/
    ├── spec-init.md
    ├── spec-requirements.md
    ├── spec-design.md
    ├── spec-tasks.md
    ├── spec-impl.md
    └── spec-status.md
```

**Usage:** `/spec-init`, `/spec-requirements`, etc.

Specs are created in `.specs/`:
```
.specs/
└── feature-name/
    ├── spec.json
    ├── requirements.md
    ├── design.md
    ├── tasks/
    │   └── sprint-1.md
    └── status.md
```

---

## FAQ

### Q: Does this work with other AI assistants?

A: No. Currently supports Claude Code only.

### Q: Can I customize the workflow steps?

A: Yes. Edit the `.md` files in `.claude/commands/` after installation.

### Q: Is it safe to re-run `npx @haposoft/cafekit-spec`?

A: Yes. It's idempotent (skips existing files).

### Q: What language is the spec generated in?

A: Defaults to English.

### Q: Can I use this for multiple features simultaneously?

A: Yes. Each spec has its own directory in `.specs/`. Work on multiple in parallel.

---

## Troubleshooting

### "No .claude/ folder detected"

**Cause:** You're not in a project with Claude Code set up.

**Solution:**
```bash
# Create .claude/commands/ manually
mkdir -p .claude/commands

# Re-run installer
npx @haposoft/cafekit-spec
```

### "Command not found" after installation

**Cause:** Claude Code may need to reload commands.

**Solution:**
- Commands load automatically
- If not visible, restart Claude Code extension

**Verify installation:**
```bash
# Check files exist
ls .claude/commands/spec-*.md
```

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

- **Report issues:** https://github.com/hapo-nghialuu/hapo-cafekit/issues
- **Suggest improvements:** Open a GitHub Discussion

---

## Support

- **GitHub:** https://github.com/hapo-nghialuu/hapo-cafekit
- **Issues:** https://github.com/hapo-nghialuu/hapo-cafekit/issues
- **Discussions:** https://github.com/hapo-nghialuu/hapo-cafekit/discussions

---

## Changelog

### [0.1.0] - 2026-02-02

#### Added
- Initial release of CafeKit Spec workflow
- 6 workflow commands (init, requirements, design, tasks, impl, status)
- Zero-config installation via npx
- Idempotent file copying (safe to re-run)
- Comprehensive documentation

---

## License

UNLICENSED - Internal Use Only

---

**Made with care by the CafeKit Team**
