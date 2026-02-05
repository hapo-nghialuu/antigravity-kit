# CafeKit

> Project-specific context for Claude Code. See `.claude/CONVENTIONS.md` for framework rules.

---

## Project Overview

CafeKit is a Claude Code plugin framework providing:
- 20 specialist agents for domain-specific tasks
- 66+ skills for deep knowledge modules
- 17 slash commands for structured workflows
- Automated validation hooks

This is the **source repository** for the CafeKit framework itself.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js, Python 3 |
| **Framework** | Claude Code CLI plugin |
| **Languages** | Markdown (agents, skills), Python (validators), Bash (scripts) |

---

## Project Structure with Claude Code

```
root/
├── CLAUDE.md              # This file (project context)
├── .claude/               # CafeKit plugin
│   ├── CONVENTIONS.md     # Framework rules (reusable)
│   ├── settings.json      # Project settings
│   ├── hooks.json         # Validation hooks
│   ├── agents/            # 20 specialist agents
│   ├── skills/            # 66+ domain skills
│   ├── commands/          # 17 slash commands
│   └── scripts/           # Utility scripts
└── web/                   # Demo web application
```

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `.claude/agents/` | Agent definitions (YAML frontmatter + system prompt) |
| `.claude/skills/` | Skill modules (SKILL.md + skill.json + references/) |
| `.claude/commands/` | Slash command definitions |
| `.claude/scripts/` | Python validators and utilities |
| `web/` | Demo/test web application |

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
- Use `{{input}}` for user arguments
- Keep commands focused on single workflow

### 4. When Editing Validators
- Python scripts in `.claude/scripts/` or skill-specific `scripts/`
- Must output clear errors/warnings/passes
- Exit code 0 = success, 1 = failure

---

## Development Workflow

```bash
# Test an agent
claude "fix a React component bug"  # Should trigger frontend-specialist

# Test a skill
claude --skill nextjs-react-expert "optimize this component"

# Test a command
/create a new user dashboard

# Run validators manually
python3 .claude/scripts/validate_dispatcher.py --file src/App.tsx --tool edit
```

---

## Project Docs (On-demand)

Detailed references loaded when needed:

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

# 2. Create new CLAUDE.md with project context
cat > /path/to/new-project/CLAUDE.md << 'EOF'
# My New Project

## Project Overview
[Describe your project]

## Tech Stack
[Your tech stack]

## Project Structure
[Your structure]

## Project-Specific Rules
[Your rules]

## Framework Reference
See `.claude/CONVENTIONS.md` for agent routing and framework rules.
EOF
```

---

**Last Updated:** 2026-02-05
