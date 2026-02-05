---
description: <Cafekit>Initialize CLAUDE.md for a new project. Auto-detects tech stack, directory structure, and commands from actual project files.
---

# /init - Initialize Project Context

$ARGUMENTS

---

## Task

Initialize a new `CLAUDE.md` file with **100% accurate, project-specific content**.

**CRITICAL RULES:**
1. **NO hardcoded values** - Everything must come from actual file analysis
2. **NO placeholders** like `[Detected]`, `[TODO]`, `[Your project]`
3. **NO assumptions** - If can't detect, ask user via AskUserQuestion
4. **Include versions** - e.g., "Next.js 14.1.0" not just "Next.js"

---

## Step 1: Check Existing Files

```bash
test -f CLAUDE.md && echo "EXISTS" || echo "NOT_FOUND"
test -f .claude/CONVENTIONS.md && echo "CONVENTIONS_EXISTS" || echo "CONVENTIONS_NOT_FOUND"
```

If CLAUDE.md exists → AskUserQuestion: ["Skip", "Update", "Overwrite"]

---

## Step 2: Detect Project Type & Tech Stack

### 2.1 Detect Package Manager & Read Config

```bash
# Detect package manager
test -f pnpm-lock.yaml && echo "PNPM"
test -f yarn.lock && echo "YARN"
test -f package-lock.json && echo "NPM"
test -f bun.lockb && echo "BUN"
test -f requirements.txt && echo "PIP"
test -f poetry.lock && echo "POETRY"
test -f go.mod && echo "GO"
test -f Cargo.toml && echo "CARGO"
test -f Gemfile.lock && echo "BUNDLER"
test -f composer.lock && echo "COMPOSER"

# Read main config file
cat package.json 2>/dev/null
cat pyproject.toml 2>/dev/null
cat go.mod 2>/dev/null
cat Cargo.toml 2>/dev/null
```

### 2.2 Extract Dependencies with Versions

**For Node.js (package.json):**
```bash
# Get all dependencies with versions
cat package.json | grep -E '"(dependencies|devDependencies)"' -A 100 | head -50
```

Parse and extract:
- `"next": "14.1.0"` → Frontend: Next.js 14.1.0
- `"react": "^18.2.0"` → React 18.2.0
- `"tailwindcss": "^3.4.0"` → Tailwind CSS 3.4.0
- `"prisma": "^5.8.0"` → Database: Prisma 5.8.0
- `"vitest": "^1.2.0"` → Testing: Vitest 1.2.0

**For Python (pyproject.toml/requirements.txt):**
```bash
cat pyproject.toml | grep -A 50 '\[project.dependencies\]'
cat requirements.txt
```

Parse and extract:
- `fastapi==0.109.0` → Backend: FastAPI 0.109.0
- `sqlalchemy>=2.0` → Database: SQLAlchemy 2.0+
- `pytest>=7.0` → Testing: Pytest 7.0+

### 2.3 Build Tech Stack Table

Based on detected dependencies, build table dynamically:

**If detected Next.js + React + Tailwind + Prisma:**
```markdown
| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14.1.0 (App Router) |
| **Frontend** | React 18.2.0, Tailwind CSS 3.4.0 |
| **Backend** | Node.js, API Routes |
| **Database** | PostgreSQL with Prisma 5.8.0 |
| **Testing** | Vitest 1.2.0, Playwright 1.41.0 |
```

**If detected FastAPI + SQLAlchemy + PostgreSQL:**
```markdown
| Layer | Technology |
|-------|------------|
| **Framework** | FastAPI 0.109.0 |
| **Language** | Python 3.11+ |
| **Database** | PostgreSQL with SQLAlchemy 2.0 |
| **Testing** | Pytest 7.4.0 |
```

**If detected Express + MongoDB:**
```markdown
| Layer | Technology |
|-------|------------|
| **Framework** | Express.js 4.18.0 |
| **Runtime** | Node.js 20 |
| **Database** | MongoDB with Mongoose 8.0 |
| **Testing** | Jest 29.7.0 |
```

---

## Step 3: Detect Directory Structure

```bash
# Get actual directory tree (exclude node_modules, .git, hidden)
find . -maxdepth 3 -type d \
  ! -path './node_modules/*' \
  ! -path './.git/*' \
  ! -path './.*' \
  ! -path './dist/*' \
  ! -path './build/*' \
  ! -path './__pycache__/*' \
  2>/dev/null | sort | head -40
```

Convert output to tree format. Example:
```
Input: ./src ./src/app ./src/components ./src/lib ./public ./prisma

Output:
project-name/
├── src/
│   ├── app/           # [Describe based on content]
│   ├── components/    # [Describe based on content]
│   └── lib/           # [Describe based on content]
├── public/            # Static assets
└── prisma/            # Database schema
```

### 3.1 Describe Directories Based on Content

For each directory, check contents to describe:
```bash
# Check src/app
ls src/app/ 2>/dev/null | head -5
# If contains page.tsx, layout.tsx → "Next.js App Router pages"

# Check src/components
ls src/components/ 2>/dev/null | head -5
# If contains .tsx files → "React components"

# Check prisma/
ls prisma/ 2>/dev/null
# If contains schema.prisma → "Prisma database schema"
```

---

## Step 4: Extract Commands from Scripts

```bash
# Get scripts section
cat package.json | grep -A 30 '"scripts"'
```

Parse and create command table:

**Example package.json scripts:**
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "test": "vitest",
  "test:e2e": "playwright test"
}
```

**Generated table:**
```markdown
| Task | Command |
|------|---------|
| Development | `npm run dev` |
| Build | `npm run build` |
| Start | `npm run start` |
| Lint | `npm run lint` |
| Test | `npm test` |
| E2E Test | `npm run test:e2e` |
```

**For Python projects (Makefile or pyproject.toml):**
```bash
cat Makefile 2>/dev/null | grep -E '^[a-z]+:'
cat pyproject.toml | grep -A 20 '\[tool.poetry.scripts\]'
```

---

## Step 5: Detect Deployment Platform

```bash
test -f vercel.json && echo "Vercel"
test -f netlify.toml && echo "Netlify"
test -f Dockerfile && echo "Docker"
test -f docker-compose.yml && echo "Docker Compose"
test -f fly.toml && echo "Fly.io"
test -f railway.json && echo "Railway"
test -f render.yaml && echo "Render"
test -f .github/workflows/*.yml && echo "GitHub Actions CI/CD"
test -d .vercel && echo "Vercel (deployed)"
```

---

## Step 6: Generate CLAUDE.md

Using ALL detected information, generate file:

```markdown
# {project_name from package.json or directory name}

> Project-specific context for Claude Code. See `.claude/CONVENTIONS.md` for framework rules.

---

## Project Overview

{description from package.json OR first paragraph from README.md OR ask user}

---

## Tech Stack

{Generated table from Step 2.3 - must have actual versions}

---

## Project Structure

```
{Generated tree from Step 3 - must match actual directories}
```

---

## Key Directories

{Generated table from Step 3.1 - only real directories with real descriptions}

---

## Quick Commands

{Generated table from Step 4 - only actual scripts from package.json}

---

## Project Docs (On-demand)

| Doc | Purpose | Load when |
|-----|---------|-----------|
| `.claude/docs/SETUP.md` | Installation, run commands | "how to run", "setup" |
| `.claude/docs/DEPLOY.md` | Deployment procedures | "deploy", "production" |
| `.claude/docs/ARCHITECTURE.md` | System design | "architecture", "how it works" |

---

## Framework Reference

See `.claude/CONVENTIONS.md` for agent routing and framework rules.

---

**Last Updated:** {Current date YYYY-MM-DD}
```

---

## Step 7: Generate .claude/docs/SETUP.md

Based on detected package manager and scripts:

```markdown
# Setup Guide

## Prerequisites

{Detect from engines in package.json or runtime files}
- Node.js >= {detected version or "18"}
- {Package manager} >= {version}

## Quick Start

```bash
# Clone and install
git clone {repo URL from package.json if exists}
cd {project name}
{detected install command: pnpm install / npm install / yarn}

# Setup environment
cp .env.example .env  # {only if .env.example exists}

# Run development server
{detected dev command}
```

## Available Scripts

{Copy from Quick Commands table}
```

---

## Step 8: Verify & Report

Before completing, self-check:

| Check | How to verify |
|-------|---------------|
| Project name correct? | Compare with package.json "name" |
| Versions included? | Search for version numbers in Tech Stack |
| Directories exist? | Run `ls` on each listed directory |
| Commands work? | Commands match package.json scripts |
| No placeholders? | Search for `[`, `TODO`, `Detected` |

**Report format:**
```
✅ CLAUDE.md created successfully!

📋 Detected:
   - Project: {actual name}
   - Type: {Next.js App / FastAPI / Express API / etc.}
   - Stack: {list main technologies with versions}

📁 Files:
   - CLAUDE.md ({line count} lines)
   - .claude/docs/SETUP.md
   - .claude/docs/DEPLOY.md

🔗 Framework: .claude/CONVENTIONS.md {✓ / ⚠️ missing}
```

---

## Handling Different Project Types

### Node.js/JavaScript
- Read: package.json
- Package manager: npm/yarn/pnpm/bun
- Commands: from scripts section

### Python
- Read: pyproject.toml, requirements.txt, setup.py
- Package manager: pip/poetry/pipenv/uv
- Commands: from Makefile or scripts section

### Go
- Read: go.mod
- Commands: from Makefile or go commands

### Rust
- Read: Cargo.toml
- Commands: cargo commands

### Monorepo
- Detect: pnpm-workspace.yaml, lerna.json, turbo.json
- List workspaces/packages
- Include root + package commands

---

## Error Handling

**If package.json not found:**
→ AskUserQuestion: "What type of project is this?" with options based on detected files

**If no dependencies detected:**
→ List files found and ask user to describe project

**If description empty:**
→ Use project name as fallback, note in "Next steps" to add description

---

## Notes

- NEVER use example values in output
- ALWAYS extract from actual project files
- Versions must be real (from lockfiles or config)
- Test commands before listing them
