---
name: docs
description: Documentation management command. Use '/docs init' to create initial docs, '/docs update' to update existing docs.
allowed-tools: Read, Write, Glob, Grep, Bash
argument-hint: <init|update> [--focus=dir1,dir2]
---

# /docs - Documentation Management

$ARGUMENTS

---

## Purpose

Unified command for project documentation:
- `/docs init` - Initialize comprehensive documentation (replaces old /init)
- `/docs update` - Update docs after code changes

---

## Parse Arguments

**Extract subcommand:**
- If `$ARGUMENTS` starts with `init` → Run INIT workflow
- If `$ARGUMENTS` starts with `update` → Run UPDATE workflow
- Else → Show usage help

**Extract flags:**
- `--focus=dir1,dir2` - Focus on specific directories
- `--dir=./path` - Target specific directory

---

## INIT Workflow (`/docs init`)

### Step 1: Check Prerequisites

```bash
# Check if docs/ already exists
ls -la docs/ 2>/dev/null && echo "EXISTS" || echo "NOT_FOUND"

# Check repomix
which repomix || npm list -g repomix 2>/dev/null || echo "REPOMIX_NOT_FOUND"
```

**If docs/ exists:**
- Ask: "docs/ already exists. Overwrite / Merge / Skip?"

### Step 2: Install Repomix (if needed)

```bash
# Check if repomix is installed
which repomix 2>/dev/null || npm list -g repomix 2>/dev/null
```

**If repomix not found:**
- Detect package manager: npm, pnpm, yarn, bun
- Install repomix globally:

```bash
# Detect package manager
test -f pnpm-lock.yaml && PM="pnpm"
test -f yarn.lock && PM="yarn"
test -f bun.lockb && PM="bun"
PM="${PM:-npm}"

# Install repomix globally
$PM install -g repomix

# Verify installation
which repomix
```

**Report:**
```
📦 Installing repomix... ✅ Done
```

### Step 3: Run Repomix

```bash
# Generate codebase compaction
repomix

# Verify output
ls -la ./repomix-output.xml
```

### Step 4: Auto-Detect Project Info

```bash
# Package manager & config
test -f pnpm-lock.yaml && echo "PNPM"
test -f yarn.lock && echo "YARN"
test -f package-lock.json && echo "NPM"
test -f bun.lockb && echo "BUN"
test -f requirements.txt && echo "PIP"
test -f poetry.lock && echo "POETRY"
test -f go.mod && echo "GO"
test -f Cargo.toml && echo "CARGO"

# Read configs
cat package.json 2>/dev/null
cat pyproject.toml 2>/dev/null
cat go.mod 2>/dev/null
```

**Extract:**
- Project name, version, description
- Tech stack with versions
- Scripts/commands
- Dependencies

### Step 5: Detect Structure & Platform

```bash
# Directory structure
find . -maxdepth 3 -type d ! -path './node_modules/*' ! -path './.git/*' ! -path './.*' 2>/dev/null | sort | head -40

# Deployment platform
test -f vercel.json && echo "Vercel"
test -f netlify.toml && echo "Netlify"
test -f Dockerfile && echo "Docker"
test -f docker-compose.yml && echo "Docker Compose"
test -f fly.toml && echo "Fly.io"
test -d .github/workflows && echo "GitHub Actions"

# Database
test -f prisma/schema.prisma && echo "Prisma"
test -f drizzle.config.ts && echo "Drizzle"

# API
test -d src/app/api && echo "NextJS_API"
test -d src/routes && echo "Express_Routes"

# Testing
cat package.json | grep -E '"(vitest|jest|playwright|cypress)"' && echo "Testing"
```

### Step 6: Generate 7 Documentation Files

Create `docs/` directory and generate:

#### 1. codebase-summary.md
```markdown
# Codebase Summary

> Auto-generated project overview

## Project Info
| Property | Value |
|----------|-------|
| **Name** | {detected} |
| **Version** | {detected} |
| **Type** | {detected} |

## Statistics
| Metric | Value |
|--------|-------|
| Files | {from repomix} |
| Tokens | {from repomix} |
| Generated | {timestamp} |

## Tech Stack
| Layer | Technology |
|-------|------------|
| {detected} | {with versions} |

## Structure
```
{directory tree}
```
```

#### 2. project-overview-pdr.md
```markdown
# Project Overview (PDR)

## Identity
- **Name:** {name}
- **Type:** {type}
- **Status:** Active

## Description
{from package.json or README}

## Features
{extracted from codebase}

## Roadmap
- [ ] Current sprint
- [ ] Next milestones
```

#### 3. code-standards.md
```markdown
# Code Standards

## Stack
- Language: {detected}
- Framework: {detected}
- Linting: {detected}

## Conventions
{inferred from codebase patterns}

## Patterns
{common patterns detected}
```

#### 4. system-architecture.md
```markdown
# System Architecture

## Overview
{architecture type}

## Components
| Component | Tech | Purpose |
|-----------|------|---------|
| {detected} | {tech} | {purpose} |

## Data Flow
{simple description}

## API Structure
{if detected}

## Database
{if detected}
```

#### 5. design-guidelines.md
```markdown
# Design Guidelines

## System
- CSS: {Tailwind/Styled/etc}
- UI Library: {detected}

## Patterns
{detected patterns}

## Responsive
{breakpoints}
```

#### 6. deployment-guide.md
```markdown
# Deployment Guide

## Platform
{detected platform}

## Quick Deploy
```bash
{platform commands}
```

## Environment
{from .env.example if exists}

## Commands
| Command | Purpose |
|---------|---------|
| {from package.json} | {description} |
```

#### 7. project-roadmap.md
```markdown
# Project Roadmap

## Current
{detected state}

## Short Term (30d)
- [ ] Tasks

## Medium Term (90d)
- [ ] Enhancements

## Long Term (6mo)
- [ ] Scale

## Tech Debt
{detected issues}
```

### Step 7: Generate CLAUDE.md

```bash
# Check if CLAUDE.md exists
test -f CLAUDE.md && echo "EXISTS" || echo "NOT_FOUND"
```

**Create or update CLAUDE.md:**

```markdown
# {Project Name}

> Project-specific context for Claude Code. See `.claude/ROUTING.md` for agent routing rules.

---

## Project Overview

{description from package.json or README}

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| {detected from package.json} | {with versions} |

---

## Project Structure

```
{key directories from analysis}
```

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| {detected} | {description} |

---

## Quick Commands

| Task | Command |
|------|---------|
| {from package.json scripts} | `{pm} run {script}` |

---

## Project Docs (On-demand)

| Doc | Purpose | Load when |
|-----|---------|-----------|
| `docs/codebase-summary.md` | Project overview | "summary", "overview" |
| `docs/project-overview-pdr.md` | Product requirements | "requirements", "pdr" |
| `docs/code-standards.md` | Coding conventions | "standards", "conventions" |
| `docs/system-architecture.md` | Architecture | "architecture", "design" |
| `docs/deployment-guide.md` | Deployment | "deploy", "production" |

---

## Framework Reference

See `.claude/ROUTING.md` for agent routing and framework rules.

---

**Last Updated:** {timestamp}
```

**Write to file:**
```bash
# Generate CLAUDE.md content
cat > CLAUDE.md << 'EOF'
# {Project Name}

> Project-specific context for Claude Code. See `.claude/ROUTING.md` for agent routing rules.

---

## Project Overview

{description}

---

## Tech Stack

| Layer | Technology |
|-------|------------|
{tech_stack_rows}

---

## Project Structure

```
{structure}
```

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
{directory_rows}

---

## Quick Commands

| Task | Command |
|------|---------|
{commands_rows}

---

## Project Docs (On-demand)

| Doc | Purpose | Load when |
|-----|---------|-----------|
| `docs/codebase-summary.md` | Project overview | "summary", "overview" |
| `docs/project-overview-pdr.md` | Product requirements | "requirements", "pdr" |
| `docs/code-standards.md` | Coding conventions | "standards", "conventions" |
| `docs/system-architecture.md` | Architecture | "architecture", "design" |
| `docs/design-guidelines.md` | UI/UX standards | "design", "ui", "ux" |
| `docs/deployment-guide.md` | Deployment | "deploy", "production" |
| `docs/project-roadmap.md` | Roadmap | "roadmap", "future" |

---

## Framework Reference

See `.claude/ROUTING.md` for agent routing and framework rules.

---

**Last Updated:** {timestamp}
EOF
```

### Step 8: Report

```markdown
✅ Documentation initialized!

📊 Detected:
   - Project: {name}
   - Type: {type}
   - Stack: {summary}
   - Files: {count} | Tokens: {count}

📁 Generated (docs/):
   ✓ codebase-summary.md
   ✓ project-overview-pdr.md
   ✓ code-standards.md
   ✓ system-architecture.md
   ✓ design-guidelines.md
   ✓ deployment-guide.md
   ✓ project-roadmap.md

📝 Also created:
   ✓ repomix-output.xml (AI context)
   ✓ CLAUDE.md (root)

🚀 Next: Run `/docs update` after code changes
```

---

## UPDATE Workflow (`/docs update`)

### Step 1: Verify

```bash
# Check docs/ exists
ls docs/ 2>/dev/null || echo "ERROR: Run '/docs init' first"

# Backup
cp -r docs docs.backup.$(date +%Y%m%d_%H%M%S)
```

### Step 2: Ensure Repomix Installed

```bash
# Check if repomix is installed
which repomix 2>/dev/null || npm list -g repomix 2>/dev/null
```

**If repomix not found:**
- Detect package manager
- Install repomix globally

```bash
# Detect package manager
test -f pnpm-lock.yaml && PM="pnpm"
test -f yarn.lock && PM="yarn"
test -f bun.lockb && PM="bun"
PM="${PM:-npm}"

# Install repomix
$PM install -g repomix
```

### Step 3: Re-analyze

```bash
# Fresh repomix
repomix

# Detect changes
git diff --stat HEAD~5..HEAD 2>/dev/null
```

### Step 4: Update Files

Read existing docs, merge with new analysis:

1. **codebase-summary.md** - Refresh stats, structure
2. **project-overview-pdr.md** - Add new features
3. **code-standards.md** - Update patterns
4. **system-architecture.md** - Sync components
5. **design-guidelines.md** - Refresh UI patterns
6. **deployment-guide.md** - Update commands
7. **project-roadmap.md** - Mark progress

### Step 5: Update CLAUDE.md

Update `CLAUDE.md` with latest project info:

```bash
# Read existing CLAUDE.md if exists
test -f CLAUDE.md && cat CLAUDE.md || echo "NOT_FOUND"

# Update key sections:
# - Tech Stack (from package.json)
# - Project Structure (from repomix)
# - Quick Commands (from package.json scripts)
# - Last Updated timestamp
```

**Update content:**
- Refresh "Tech Stack" table with latest versions
- Update "Project Structure" if directories changed
- Sync "Quick Commands" with package.json scripts
- Update "Last Updated" timestamp

**If CLAUDE.md doesn't exist:**
- Create new following INIT workflow template

### Step 6: Report

```markdown
🔄 Documentation updated!

📊 Changes:
   - Files: {old} → {new}
   - Tokens: {old} → {new}

📝 Updated:
   ✓ codebase-summary.md
   ✓ project-overview-pdr.md
   ✓ code-standards.md
   ✓ system-architecture.md
   ✓ design-guidelines.md
   ✓ deployment-guide.md
   ✓ project-roadmap.md
   ✓ CLAUDE.md (root)

💡 Review docs/ for any manual adjustments needed
```

---

## HELP (no valid subcommand)

```markdown
/docs - Documentation Management

Usage:
  /docs init    - Create initial documentation
  /docs update  - Update docs after code changes

Options:
  --focus=dir1,dir2  - Focus on specific directories
  --dir=./path       - Target specific directory

Examples:
  /docs init
  /docs init --focus=src,api
  /docs update
  /docs update --focus=ui
```

---

## Error Handling

| Scenario | Action |
|----------|--------|
| repomix not found | Warn, continue with manual analysis |
| No package.json | Ask user for project type |
| docs/ exists (init) | Ask: Overwrite/Merge/Skip |
| docs/ not found (update) | Prompt to run `/docs init` |
| Permission denied | Report path, suggest fix |

---

## Notes

- Always use detected values, never placeholders
- Include versions: "Next.js 14.1.0" not "Next.js"
- repomix-output.xml helps AI understand full context
- 7 docs files = comprehensive coverage
