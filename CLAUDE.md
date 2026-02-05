# CafeKit

> Project-specific context for Claude Code. See `.claude/CONVENTIONS.md` for framework rules.

---

## Project Overview

**CafeKit** is an AI Agent templates framework providing Skills, Agents, and Workflows for enhanced coding assistance. It's designed as a Claude Code plugin with specialist agents and domain skills.

This is the **source repository** for the CafeKit framework itself.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js 20+, Python 3.11+ |
| **Package Manager** | pnpm (monorepo) |
| **Framework** | Claude Code CLI plugin |
| **Languages** | Markdown (agents, skills), Python (validators), Bash (scripts) |
| **Demo Web** | Next.js 16.1.3, React 19.2.3, Tailwind CSS v4 |
| **TypeScript** | v5.7.2 |

---

## Project Structure

```
cafekit/
├── CLAUDE.md                 # This file (project context)
├── package.json              # Root monorepo config (pnpm)
├── .claude/                  # CafeKit plugin (main content)
│   ├── CONVENTIONS.md        # Framework rules (reusable)
│   ├── settings.local.json   # Local settings
│   ├── agents/               # 20 specialist agents
│   ├── skills/               # 66 domain skills
│   ├── commands/             # 18 slash commands
│   ├── hooks/                # Validation hooks
│   ├── scripts/              # Utility scripts
│   └── docs/                 # Project documentation
├── .agent/                   # Legacy Google Antigravity format (reference only)
├── .docs/                    # External documentation references
├── .specs/                   # Feature specifications
├── cafekit-web/              # Demo website (Next.js)
│   ├── src/                  # Source code
│   ├── content/              # MDX content
│   └── public/               # Static assets
└── packages/                 # Shared packages
    └── spec/                 # Spec utilities
```

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `.claude/agents/` | 20 agent definitions (YAML frontmatter + system prompt) |
| `.claude/skills/` | 66 skill modules (SKILL.md + skill.json + references/) |
| `.claude/commands/` | 18 slash command definitions |
| `.claude/scripts/` | Python validators and utilities |
| `.claude/docs/` | Project-specific documentation |
| `cafekit-web/` | Demo website built with Next.js |
| `.specs/` | Feature specifications for development |

---

## Quick Commands

| Task | Command |
|------|---------|
| Dev (all packages) | `pnpm dev` |
| Build | `pnpm build` |
| Test | `pnpm test` |
| Clean | `pnpm clean` |
| Demo web dev | `cd cafekit-web && pnpm dev` |
| Demo web build | `cd cafekit-web && pnpm build` |

---

## Project-Specific Rules

### 1. When Editing Agents
- Keep YAML frontmatter format: `name`, `description`, `tools`, `model`, `skills`
- System prompt goes after the frontmatter
- Test agent by invoking related keywords

### 2. When Editing Skills
- Use `skill.json` for metadata (name, description, version)
- Use `SKILL.md` for instructions
- Put detailed docs in `references/` subfolder
- Validators go in `scripts/` subfolder

### 3. When Editing Commands
- Commands are markdown files in `.claude/commands/`
- Use `$ARGUMENTS` for user arguments
- Keep commands focused on single workflow

### 4. When Editing Validators
- Python scripts in `.claude/scripts/` or skill-specific `scripts/`
- Must output clear errors/warnings/passes
- Exit code 0 = success, 1 = failure

### 5. Legacy Format
- `.agent/` folder is Google Antigravity format (legacy)
- DO NOT use for new development
- Keep for reference only

---

## Development Workflow

```bash
# Test an agent
claude "fix a React component bug"  # Should trigger frontend-specialist

# Test a skill
/skill nextjs-react-expert "optimize this component"

# Test a command
/create a new user dashboard

# Run validators manually
python3 .claude/scripts/validate_dispatcher.py --file src/App.tsx --tool edit

# Run demo website
cd cafekit-web && pnpm dev
```

---

## Project Docs (On-demand)

| Doc | Purpose | Load when |
|-----|---------|-----------|
| `.claude/docs/SETUP.md` | Installation, run commands | "how to run", "setup" |
| `.claude/docs/DEPLOY.md` | Deployment procedures | "deploy", "production" |
| `.claude/docs/ARCHITECTURE.md` | System design | "architecture", "how it works" |
| `.claude/docs/API.md` | API endpoints | "API", "endpoints" |
| `.claude/docs/DATABASE.md` | Schema, models | "database", "schema" |
| `.claude/docs/TESTING.md` | Test commands | "test", "coverage" |

---

## Framework Reference

For detailed framework rules, see:
- **Agent routing**: `.claude/CONVENTIONS.md` → Agent Selection Matrix
- **Clean code**: `.claude/CONVENTIONS.md` → Universal Rules
- **Socratic gate**: `.claude/CONVENTIONS.md` → Socratic Gate
- **Available agents/skills**: `.claude/CONVENTIONS.md` → Available Agents/Skills

---

## Sharing This Framework

To use CafeKit in another project:

```bash
# 1. Copy .claude folder
cp -r .claude/ /path/to/new-project/.claude/

# 2. Initialize CLAUDE.md for the new project
cd /path/to/new-project
/init
```

---

## Component Summary

| Component | Count | Location |
|-----------|-------|----------|
| Agents | 20 | `.claude/agents/*.md` |
| Skills | 66 | `.claude/skills/*/SKILL.md` |
| Commands | 18 | `.claude/commands/*.md` |
| Validators | 16+ | `.claude/scripts/*.py` |

---

**Last Updated:** 2026-02-05
**Version:** 2.0.0
