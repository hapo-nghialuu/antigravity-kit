---
description: Initialize comprehensive documentation for the project. Use when setting up docs for the first time or creating documentation skeleton from existing codebase.
---

# /docs-init - Initialize Project Documentation

## Overview

This workflow creates comprehensive documentation structure for your project:
- Generates 7 core documentation files
- Creates project context file (.agent/rules/AGENTS.md)
- Uses repomix for codebase analysis

## ⚠️ IMPORTANT: Execute Immediately

**DO NOT create an implementation plan.** This workflow should be executed directly without planning mode.
- Run all steps sequentially
- Create files immediately as described
- No approval needed between steps

---

## Step 1: Check Prerequisites

**Check if docs/ already exists:**
```bash
ls -la docs/ 2>/dev/null && echo "EXISTS" || echo "NOT_FOUND"
```

**If docs/ exists:**
- Ask user: "docs/ already exists. Overwrite / Merge / Skip?"
- Default: "Merge" (preserve existing, add missing)

---

## Step 2: Install Repomix

**Check if repomix is installed:**
```bash
which repomix 2>/dev/null || npm list -g repomix 2>/dev/null
```

**If repomix not found:**
- Detect package manager:
  ```bash
  test -f pnpm-lock.yaml && PM="pnpm"
  test -f yarn.lock && PM="yarn"
  test -f bun.lockb && PM="bun"
  PM="${PM:-npm}"
  ```

// turbo
- Run `$PM install -g repomix`
- Verify: `which repomix`

---

## Step 3: Run Repomix Analysis

// turbo
```bash
repomix
ls -la ./repomix-output.xml
```

---

## Step 4: Auto-Detect Project Information

**Detect Package Manager & Tech Stack:**
```bash
test -f pnpm-lock.yaml && echo "PNPM"
test -f yarn.lock && echo "YARN"
test -f package-lock.json && echo "NPM"
test -f bun.lockb && echo "BUN"
test -f requirements.txt && echo "PIP"
test -f poetry.lock && echo "POETRY"
test -f go.mod && echo "GO"
test -f Cargo.toml && echo "CARGO"
```

**Read Config Files:**
- Read `package.json` for name, version, scripts, dependencies
- Read `pyproject.toml` if Python project
- Read `go.mod` if Go project
- Read `README.md` for description

**Extract:**
- Project name, version, description
- Tech stack with versions
- Available scripts/commands
- Key dependencies

---

## Step 5: Detect Project Structure

**Get directory structure:**
```bash
find . -maxdepth 3 -type d ! -path './node_modules/*' ! -path './.git/*' ! -path './.*' 2>/dev/null | sort | head -40
```

**Detect Platforms & Tools:**
- **Deployment**: `vercel.json`, `netlify.toml`, `Dockerfile`, `fly.toml`, `.github/workflows`
- **Database**: `prisma/schema.prisma`, `drizzle.config.ts`
- **API**: `src/app/api`, `src/routes`, `pages/api`
- **Testing**: Check package.json for `vitest`, `jest`, `playwright`, `cypress`
- **UI**: Check for `tailwind`, `@base-ui`, `shadcn`, etc.

---

## Step 6: Create docs/ Directory

// turbo
```bash
mkdir -p docs/
```

---

## Step 7: Generate Documentation Files

### 7.1 Create docs/codebase-summary.md

```markdown
# Codebase Summary

> Auto-generated project overview

## Project Info
| Property | Value |
|----------|-------|
| **Name** | {from package.json} |
| **Version** | {from package.json} |
| **Type** | {detected} |
| **Package Manager** | {detected} |

## Statistics
| Metric | Value |
|--------|-------|
| Files | {from repomix} |
| Tokens | {from repomix} |
| Generated | {timestamp} |

## Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | {detected with version} |
| Language | {detected} |
| Styling | {detected} |
| UI Library | {detected} |
| Database | {if detected} |
| Testing | {if detected} |

## Project Structure
```
{directory tree from analysis}
```

## Key Directories
| Directory | Purpose |
|-----------|---------|
| {detected} | {inferred purpose} |
```

### 7.2 Create docs/project-overview-pdr.md

```markdown
# Project Overview (PDR)

## Identity
- **Name:** {name}
- **Type:** {type}
- **Status:** Active

## Description
{from package.json description or README}

## Features
{extract from codebase}

## Roadmap
- [ ] Current sprint
- [ ] Next milestones
```

### 7.3 Create docs/code-standards.md

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

## File Organization
{detected structure}
```

### 7.4 Create docs/system-architecture.md

```markdown
# System Architecture

## Overview
{architecture type: monolith, microservices, serverless, etc.}

## Components
| Component | Tech | Purpose |
|-----------|------|---------|
| Frontend | {detected} | UI layer |
| Backend | {detected} | API layer |
| Database | {detected} | Data persistence |

## Data Flow
{simple description}

## API Structure
{if detected}

## Database Schema
{if detected}
```

### 7.5 Create docs/design-guidelines.md

```markdown
# Design Guidelines

## System
- CSS Framework: {Tailwind/Styled/etc}
- UI Library: {detected}
- Icons: {detected}

## Patterns
{detected patterns}

## Responsive
{breakpoints if Tailwind}

## Theme
{dark/light mode setup}
```

### 7.6 Create docs/deployment-guide.md

```markdown
# Deployment Guide

## Platform
{detected platform}

## Quick Deploy
```bash
{platform-specific commands}
```

## Environment Variables
{from .env.example if exists}

## Available Commands
| Command | Purpose |
|---------|---------|
| {from package.json} | {description} |
```

### 7.7 Create docs/project-roadmap.md

```markdown
# Project Roadmap

## Current
{detected state}

## Short Term (30 days)
- [ ] Tasks

## Medium Term (90 days)
- [ ] Enhancements

## Long Term (6 months)
- [ ] Scale

## Technical Debt
{detected issues}
```

---

## Step 8: Create .agent/rules/AGENTS.md (Optional)

**Check if .agent/rules/ exists:**
```bash
test -d .agent/rules && echo "EXISTS" || echo "NOT_FOUND"
```

**If not exists, create it:**
// turbo
```bash
mkdir -p .agent/rules
```

**Create .agent/rules/AGENTS.md:**

```markdown
---
activation: always_on
---

# {Project Name}

> Project-specific context for AI agents (Antigravity, Claude Code, etc.). See `.agent/` for workflows and skills.

---

## Project Overview

{description from package.json or README}

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| {detected} | {with versions} |

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
| `docs/design-guidelines.md` | UI/UX standards | "design", "ui", "ux" |
| `docs/deployment-guide.md` | Deployment | "deploy", "production" |
| `docs/project-roadmap.md` | Roadmap | "roadmap", "future" |

---

## Agent Workflows

Available workflows in `.agent/workflows/`:
- `/docs-init` - Initialize documentation
- `/docs-update` - Update documentation

---

**Last Updated:** {timestamp}
```

**Note:**
- File `.agent/rules/AGENTS.md` với `activation: always_on` sẽ được **always active** trong Antigravity
- Đặt trong `.agent/rules/` để Antigravity tự động nhận diện và load
- Có thể đồng thờI tạo symlink `AGENTS.md` ở root để dùng cho Claude Code

---

## Step 9: Generate Report

**Output success message:**

```
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
   ✓ .agent/rules/AGENTS.md (always-active project context)

🚀 Next: Run `/docs-update` after code changes
```

---

## Error Handling

| Scenario | Action |
|----------|--------|
| repomix not found | Warn, continue with manual analysis |
| No package.json | Ask user for project type |
| docs/ exists | Ask: Overwrite/Merge/Skip |
| Permission denied | Report path, suggest fix |

---

## Notes

- Always use detected values, never placeholders
- Include versions: "Next.js 14.1.0" not "Next.js"
- repomix-output.xml helps AI understand full context
- 7 docs files = comprehensive coverage
