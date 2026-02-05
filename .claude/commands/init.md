---
description: Initialize CLAUDE.md for a new project. Creates project-specific context file with tech stack detection.
---

# /init - Initialize Project Context

$ARGUMENTS

---

## Task

Initialize a new `CLAUDE.md` file for the current project with project-specific context.

### Steps:

1. **Check Existing CLAUDE.md**
   - If `CLAUDE.md` exists, ask user if they want to overwrite or update
   - If updating, preserve existing content and enhance

2. **Detect Project Context**
   - Scan for `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, etc.
   - Identify tech stack from dependencies
   - Detect project structure (src/, app/, lib/, etc.)
   - Look for existing README.md for project description

3. **Gather Information via AskUserQuestion**

   Ask the user (if not detected):
   ```
   Question 1: "What is this project about?"
   Options: [Web App, Mobile App, API/Backend, CLI Tool, Library, Other]

   Question 2: "What's the primary tech stack?"
   Options: [Detected options based on scan, Other]

   Question 3: "Any specific coding conventions?"
   Options: [Follow .claude/CONVENTIONS.md, Custom rules, None]
   ```

4. **Create .claude/docs/ folder**

   Create project documentation folder with templates:
   ```
   .claude/docs/
   ├── README.md          # Index of all docs
   ├── SETUP.md           # Installation, run commands
   ├── DEPLOY.md          # Deployment procedures
   ├── ARCHITECTURE.md    # System design (empty template)
   ├── API.md             # API endpoints (empty template)
   ├── DATABASE.md        # Schema, models (empty template)
   └── TESTING.md         # Test commands (empty template)
   ```

5. **Generate CLAUDE.md**

   Create file with this structure:
   ```markdown
   # [Project Name]

   > Project-specific context for Claude Code. See `.claude/CONVENTIONS.md` for framework rules.

   ---

   ## Project Overview

   [Auto-detected or user-provided description]

   ---

   ## Tech Stack

   | Layer | Technology |
   |-------|------------|
   | **Frontend** | [Detected] |
   | **Backend** | [Detected] |
   | **Database** | [Detected] |
   | **Testing** | [Detected] |

   ---

   ## Project Structure

   ```
   [Auto-generated from directory scan]
   ```

   ---

   ## Key Directories

   | Directory | Purpose |
   |-----------|---------|
   | [Detected] | [Description] |

   ---

   ## Project-Specific Rules

   [User-provided or defaults]

   ---

   ## Project Docs (On-demand)

   | Doc | Purpose |
   |-----|---------|
   | `.claude/docs/SETUP.md` | Installation, run |
   | `.claude/docs/DEPLOY.md` | Deployment |
   | `.claude/docs/ARCHITECTURE.md` | System design |

   ## Framework Reference

   See `.claude/CONVENTIONS.md` for:
   - Agent routing rules
   - Clean code principles
   - Socratic gate protocol
   - Available agents and skills

   ---

   **Last Updated:** [Current Date]
   ```

5. **Verify CONVENTIONS.md**
   - Check if `.claude/CONVENTIONS.md` exists
   - If not, warn user that framework rules are missing
   - Suggest copying from CafeKit source

6. **Report Success**
   - Show created file path
   - Summarize detected tech stack
   - List next steps

---

## Usage Examples

```bash
# Basic init (auto-detect everything)
/init

# Init with project description
/init e-commerce platform with Next.js and Stripe

# Init for specific project type
/init mobile app with React Native
```

---

## Detection Patterns

### Package Managers
| File | Stack |
|------|-------|
| `package.json` | Node.js/JavaScript |
| `requirements.txt` / `pyproject.toml` | Python |
| `go.mod` | Go |
| `Cargo.toml` | Rust |
| `pom.xml` / `build.gradle` | Java |
| `Gemfile` | Ruby |
| `composer.json` | PHP |

### Frameworks (from package.json)
| Dependency | Framework |
|------------|-----------|
| `next` | Next.js |
| `react` | React |
| `vue` | Vue.js |
| `express` | Express.js |
| `fastify` | Fastify |
| `@nestjs/core` | NestJS |
| `react-native` | React Native |
| `expo` | Expo |

### Databases
| Pattern | Database |
|---------|----------|
| `prisma` | Prisma ORM |
| `@prisma/client` | Prisma |
| `mongoose` | MongoDB |
| `pg` / `postgres` | PostgreSQL |
| `mysql2` | MySQL |
| `better-sqlite3` | SQLite |

---

## Output Example

```
✅ CLAUDE.md created successfully!

📋 Detected:
   - Project: my-awesome-app
   - Type: Web Application
   - Frontend: Next.js 14, React 18, Tailwind CSS
   - Backend: Node.js, Prisma
   - Database: PostgreSQL
   - Testing: Jest, Playwright

📁 File: ./CLAUDE.md (87 lines)

🔗 Framework: .claude/CONVENTIONS.md ✓

💡 Next steps:
   1. Review and customize CLAUDE.md
   2. Add project-specific rules
   3. Start coding with Claude Code!
```

---

## Notes

- This command is idempotent - running twice will ask before overwriting
- Detected values can be manually adjusted after creation
- Works with monorepos (detects workspace packages)
- Preserves user customizations when updating
