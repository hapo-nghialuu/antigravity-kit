---
description: Initialize CLAUDE.md for a new project. Auto-detects tech stack, directory structure, and commands from actual project files. Works with any project type.
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

## Step 7: Generate .claude/docs/ with REAL Content

**CRITICAL: Docs must contain project-specific content, NOT templates.**

### 7.1 Create .claude/docs/ directory

```bash
mkdir -p .claude/docs
```

### 7.2 Generate SETUP.md with REAL data

**Detection commands:**
```bash
# Get repo URL
cat package.json | grep -E '"url".*git' | head -1

# Get project name
cat package.json | grep '"name"' | head -1

# Detect package manager
test -f pnpm-lock.yaml && echo "pnpm"
test -f yarn.lock && echo "yarn"
test -f package-lock.json && echo "npm"

# Check for .env.example
test -f .env.example && echo "HAS_ENV_EXAMPLE"

# Get engines
cat package.json | grep -A 3 '"engines"'

# Get scripts
cat package.json | grep -A 20 '"scripts"'
```

**Generate SETUP.md with detected values:**

```markdown
# Setup Guide

> How to set up and run {PROJECT_NAME} locally.

---

## Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | >= {FROM_ENGINES_OR_18} | `node -v` |
| {DETECTED_PM: pnpm/npm/yarn} | >= {VERSION} | `{PM} -v` |

---

## Quick Start

\`\`\`bash
# 1. Clone repository
git clone {ACTUAL_REPO_URL}
cd {ACTUAL_PROJECT_NAME}

# 2. Install dependencies
{DETECTED_PM} install

# 3. Set up environment
{IF .env.example EXISTS: "cp .env.example .env"}
{IF NO .env.example: "# No .env required" OR skip this step}

# 4. Run development server
{DETECTED_PM} run dev
\`\`\`

---

## Available Scripts

| Command | Description |
|---------|-------------|
{FOR EACH SCRIPT IN package.json:}
| `{PM} run {SCRIPT_NAME}` | {SCRIPT_DESCRIPTION} |

---

## Troubleshooting

### Port already in use
\`\`\`bash
lsof -i :{DETECTED_PORT_OR_3000}
kill -9 <PID>
\`\`\`

### Dependencies not installing
\`\`\`bash
rm -rf node_modules {LOCKFILE}
{PM} install
\`\`\`
```

### 7.3 Generate DEPLOY.md based on detected platform

**Detection commands:**
```bash
# Detect deployment platform
test -f vercel.json && echo "VERCEL"
test -f netlify.toml && echo "NETLIFY"
test -f Dockerfile && echo "DOCKER"
test -f docker-compose.yml && echo "DOCKER_COMPOSE"
test -f fly.toml && echo "FLY"
test -f railway.json && echo "RAILWAY"
test -d .vercel && echo "VERCEL_DEPLOYED"
ls .github/workflows/*.yml 2>/dev/null && echo "GITHUB_ACTIONS"
```

**Generate DEPLOY.md based on platform:**

**If Vercel detected:**
```markdown
# Deployment Guide

> Deploy {PROJECT_NAME} to Vercel.

## Quick Deploy

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
\`\`\`

## Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
{FROM .env.example IF EXISTS}
```

**If Docker detected:**
```markdown
# Deployment Guide

> Deploy {PROJECT_NAME} with Docker.

## Quick Deploy

\`\`\`bash
# Build image
docker build -t {PROJECT_NAME} .

# Run container
docker run -p {PORT}:{PORT} {PROJECT_NAME}
\`\`\`

## Docker Compose

\`\`\`bash
docker-compose up -d
\`\`\`
```

**If NO deployment platform detected:**
```markdown
# Deployment Guide

> Deployment configuration not detected for {PROJECT_NAME}.

## Options

1. **Vercel** (Recommended for Next.js)
   \`\`\`bash
   npm i -g vercel && vercel
   \`\`\`

2. **Docker**
   Create a Dockerfile for containerized deployment.

3. **Manual Server**
   \`\`\`bash
   {PM} run build
   {PM} run start
   \`\`\`

## Next Steps

- Add `vercel.json` for Vercel configuration
- Or add `Dockerfile` for container deployment
- Or add `.github/workflows/deploy.yml` for CI/CD
```

### 7.4 Auto-detect and create additional docs

**Only create docs when content is detected. Run detection commands first.**

#### DATABASE.md - Create if database detected

```bash
# Detection
test -f prisma/schema.prisma && echo "PRISMA"
test -f drizzle.config.ts && echo "DRIZZLE"
cat package.json | grep -E '"(mongoose|pg|mysql2|better-sqlite3)"' && echo "DB_DRIVER"
test -f docker-compose.yml && grep -q "postgres\|mysql\|mongo" docker-compose.yml && echo "DB_CONTAINER"
```

**If detected, generate DATABASE.md:**
```markdown
# Database Guide

> Database setup and management for {PROJECT_NAME}.

## Database Type

{PRISMA: PostgreSQL with Prisma ORM}
{DRIZZLE: with Drizzle ORM}
{MONGOOSE: MongoDB with Mongoose}

## Setup

\`\`\`bash
{IF PRISMA:}
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
{/IF}

{IF DRIZZLE:}
# Generate migrations
npx drizzle-kit generate

# Push to database
npx drizzle-kit push
{/IF}
\`\`\`

## Schema Location

- {prisma/schema.prisma | drizzle/schema.ts | src/models/}

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Database connection string |
```

#### API.md - Create if API routes detected

```bash
# Detection
test -d src/app/api && echo "NEXTJS_API"
test -d pages/api && echo "NEXTJS_PAGES_API"
test -d src/routes && echo "EXPRESS_ROUTES"
test -d src/api && echo "API_DIR"
cat package.json | grep -E '"(express|fastify|hono|@nestjs)"' && echo "API_FRAMEWORK"
```

**If detected, generate API.md:**
```markdown
# API Reference

> API endpoints for {PROJECT_NAME}.

## Base URL

- Development: `http://localhost:{PORT}`
- Production: `{PROD_URL_IF_DETECTED}`

## Endpoints

{Scan and list directories/files in api folder}

| Method | Endpoint | Description |
|--------|----------|-------------|
{FOR EACH route file detected:}
| GET/POST | `/api/{route}` | {filename} |

## Authentication

{IF better-auth detected: "Uses Better Auth - see auth endpoints"}
{IF next-auth detected: "Uses NextAuth.js"}
{ELSE: "Not configured"}
```

#### TESTING.md - Create if test framework detected

```bash
# Detection
cat package.json | grep -E '"(vitest|jest|playwright|cypress|pytest)"' && echo "TEST_FRAMEWORK"
test -d __tests__ && echo "TESTS_DIR"
test -d tests && echo "TESTS_DIR"
test -d e2e && echo "E2E_DIR"
cat package.json | grep -E '"test"' && echo "TEST_SCRIPT"
```

**If detected, generate TESTING.md:**
```markdown
# Testing Guide

> How to run tests for {PROJECT_NAME}.

## Test Framework

{VITEST: Vitest}
{JEST: Jest}
{PLAYWRIGHT: Playwright (E2E)}
{CYPRESS: Cypress (E2E)}

## Quick Commands

| Command | Description |
|---------|-------------|
| `{PM} test` | Run all tests |
| `{PM} test:watch` | Run tests in watch mode |
| `{PM} test:e2e` | Run E2E tests |
| `{PM} test:coverage` | Run with coverage |

## Test Locations

- Unit tests: `{__tests__/ | tests/ | src/**/*.test.ts}`
- E2E tests: `{e2e/ | tests/e2e/}`

## Running Specific Tests

\`\`\`bash
# Run single test file
{PM} test path/to/test.ts

# Run tests matching pattern
{PM} test -t "pattern"
\`\`\`
```

#### ARCHITECTURE.md - Create if complex structure detected

```bash
# Detection - only for larger projects
find . -type f -name "*.ts" -o -name "*.tsx" | wc -l  # If > 50 files
test -d src/modules && echo "MODULAR"
test -d src/features && echo "FEATURE_BASED"
test -d src/services && echo "SERVICE_LAYER"
test -f pnpm-workspace.yaml && echo "MONOREPO"
```

**If complex project detected, generate ARCHITECTURE.md:**
```markdown
# Architecture Overview

> System architecture for {PROJECT_NAME}.

## Project Type

{MONOREPO: Monorepo with pnpm workspaces}
{MODULAR: Modular architecture}
{FEATURE_BASED: Feature-based structure}

## Directory Structure

\`\`\`
{Generated tree from actual structure}
\`\`\`

## Key Patterns

{Based on detected structure}

## Data Flow

{If API + DB detected: describe request flow}
```

### 7.5 Summary: Auto-create rules

| Doc | Create when |
|-----|-------------|
| `SETUP.md` | Always (every project needs setup) |
| `DEPLOY.md` | Always (even if "not configured") |
| `DATABASE.md` | Prisma/Drizzle/DB driver detected |
| `API.md` | API routes directory detected |
| `TESTING.md` | Test framework in package.json |
| `ARCHITECTURE.md` | Complex project (>50 files or monorepo) |

**Rule: Create doc only if there's real content to put in it.**

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

📁 Files created:
   - CLAUDE.md ({line count} lines)
   - .claude/docs/SETUP.md ✓
   - .claude/docs/DEPLOY.md ✓
   {IF DATABASE detected:} - .claude/docs/DATABASE.md ✓
   {IF API detected:} - .claude/docs/API.md ✓
   {IF TESTING detected:} - .claude/docs/TESTING.md ✓
   {IF COMPLEX detected:} - .claude/docs/ARCHITECTURE.md ✓

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
