# Antigravity Kit - Claude Code Plugin

> 20 specialist agents + 36 domain skills for comprehensive AI-assisted development

## 📋 Overview

Antigravity Kit is a Claude Code plugin that provides:
- **20 Specialist Agents** - Domain experts (frontend, backend, security, DevOps, etc.)
- **36 Skills** - Deep knowledge modules (React performance, API patterns, database design, etc.)
- **11 Workflows** - Slash command procedures (brainstorm, create, debug, deploy, etc.)
- **16 Validation Scripts** - Automated quality checks

## 🚀 Quick Start

### Installation

This plugin is pre-configured in the `.claude/` directory. Claude Code will automatically discover:

1. **Agents** from `.claude/agents/*.md`
2. **Skills** from `.claude/skills/*/SKILL.md`
3. **Hooks** from `.claude/hooks/hooks.json`

### How It Works

**No manual activation needed!** Claude Code's model analyzes your requests and automatically:

1. Selects the most relevant agent(s)
2. Loads required skills
3. Provides expert-level responses
4. Runs validation scripts when you edit code

## 🎯 Usage Examples

### Example 1: React Performance Optimization

```
You: "Optimize this React component for performance"

Claude Code:
1. Activates: frontend-specialist agent
2. Loads: nextjs-react-expert skill
3. Analyzes your component
4. Provides performance recommendations
5. When you edit the .tsx file → react_performance_checker.py runs automatically
```

### Example 2: API Design

```
You: "Design a RESTful API for user management"

Claude Code:
1. Activates: backend-specialist agent
2. Loads: api-patterns skill
3. Designs the API
4. When you create API routes → api_validator.py runs automatically
```

### Example 3: Database Schema

```
You: "Create a Prisma schema for e-commerce"

Claude Code:
1. Activates: database-architect agent
2. Loads: database-design skill
3. Creates schema.prisma
4. When you save → schema_validator.py runs automatically
```

## 📚 Available Agents

| Agent | Expertise | Trigger Keywords |
|-------|-----------|------------------|
| `orchestrator` | Multi-agent coordination | "comprehensive", "full analysis" |
| `frontend-specialist` | React/Next.js/UI | "component", "UI", "frontend" |
| `backend-specialist` | Node.js/Python/API | "API", "server", "backend" |
| `security-auditor` | Security | "security", "auth", "vulnerabilities" |
| `test-engineer` | Testing | "test", "coverage", "QA" |
| `devops-engineer` | DevOps/CI/CD | "deploy", "docker", "infrastructure" |
| `database-architect` | Database design | "schema", "database", "Prisma" |
| `mobile-developer` | Mobile apps | "React Native", "Flutter", "mobile" |
| `performance-optimizer` | Performance | "slow", "optimize", "performance" |
| `debugger` | Debugging | "bug", "error", "not working" |
| ... | ... | ... |

**Total: 20 agents**

See `.claude/agents/` for full list.

## 🧠 Available Skills

### Critical Priority

| Skill | Focus | When to Use |
|-------|-------|-------------|
| `nextjs-react-expert` | React/Next.js performance (57 rules) | Building React apps, optimizing performance |
| `api-patterns` | REST/GraphQL/API design | Designing APIs, reviewing endpoints |
| `database-design` | Schema design, migrations | Creating databases, Prisma schemas |
| `vulnerability-scanner` | Security scanning | Security audits, penetration testing |

### High Priority

| Skill | Focus | When to Use |
|-------|-------|-------------|
| `clean-code` | Code quality principles | Writing maintainable code |
| `testing-patterns` | TDD, unit/integration tests | Writing tests |
| `deployment-procedures` | CI/CD, deployment | Deploying applications |
| `performance-profiling` | Performance analysis | Optimizing slow code |

### Medium Priority

| Skill | Focus | When to Use |
|-------|-------|-------------|
| `frontend-design` | UI/UX, accessibility | Designing user interfaces |
| `mobile-design` | Mobile UI patterns | Building mobile apps |
| `seo-fundamentals` | SEO optimization | Improving search ranking |
| `i18n-localization` | Internationalization | Multi-language support |

**Total: 36 skills**

See `.claude/skills/` for full list.

## 🪝 Validation Hooks

Hooks automatically run validation scripts after code modifications:

### Configured Validators

| File Type | Validator | What It Checks |
|-----------|-----------|----------------|
| `.tsx`, `.jsx` | `react_performance_checker.py` | React performance anti-patterns |
| `.ts` | `type_coverage.py` | TypeScript type coverage |
| `.py` | `lint_runner.py` | Python linting (PEP8, etc.) |
| `schema.prisma` | `schema_validator.py` | Database schema issues |
| `api/`, `routes/` | `api_validator.py` | API design best practices |
| `.env` | `security_scan.py` | Leaked secrets, security issues |
| `.html` | `accessibility_checker.py` | Accessibility compliance |
| `.css` | `ux_audit.py` | UX design issues |

### How Hooks Work

1. You edit a file (e.g., `component.tsx`)
2. Hook triggers after Edit/Write
3. `validate_dispatcher.py` detects file type
4. Runs relevant validators
5. Reports findings immediately

**Disable hooks**: Remove or rename `.claude/hooks/hooks.json`

## 🔧 Advanced Usage

### Progressive Skill Loading

Load specific sections on-demand to save context:

```
You: "Load @nextjs-react-expert"
→ Loads SKILL.md only (~30KB)

You: "Show me bundle optimization tips"
→ Loads references/2-bundle-optimization.md (~25KB)
```

**Benefits**: Only load what you need, avoid filling context with all 36 skills.

### Manual Validator Execution

Run validators manually:

```bash
# React performance check
python3 .claude/scripts/validate_dispatcher.py --file src/components/Button.tsx --tool edit

# API validation
python3 .claude/scripts/validate_dispatcher.py --file app/api/users/route.ts --tool write

# Quiet mode (only show issues)
python3 .claude/scripts/validate_dispatcher.py --file app.py --tool edit --quiet
```

### Workflow Commands

Use workflows for structured tasks:

| Command | Description |
|---------|-------------|
| `/brainstorm` | Explore options before implementation |
| `/create` | Create new features or apps |
| `/debug` | Systematic debugging |
| `/deploy` | Deploy application |
| `/enhance` | Improve existing code |
| `/orchestrate` | Multi-agent coordination |
| `/plan` | Create task breakdown |
| `/preview` | Preview changes locally |
| `/status` | Check project status |
| `/test` | Generate and run tests |
| `/ui-ux-pro-max` | Design with 50+ styles |

## 📊 Plugin Architecture

```
.claude/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── agents/                      # 20 agents (auto-discovered)
├── skills/                      # 38 skills (auto-discovered)
│   └── <skill-name>/
│       ├── SKILL.md             # Entry point
│       ├── references/          # Progressive loading
│       └── scripts/             # Validation scripts
├── commands/                    # 17 slash commands
├── hooks/
│   └── hooks.json              # PostToolUse hooks
└── scripts/
    ├── validate_dispatcher.py  # Validator router
    └── migrate.sh              # Migration script
```

## 🎓 How Claude Code Discovers Components

### Agent Discovery

1. Claude Code scans `.claude/agents/*.md`
2. Reads YAML frontmatter for metadata
3. Model analyzes descriptions to match your requests
4. No manual routing needed!

Example agent frontmatter:

```yaml
---
name: frontend-specialist
description: Expert React/Next.js architect for UI development
tools: Read, Write, Edit, Bash, Grep, Glob
model: inherit
skills: nextjs-react-expert, frontend-design, tailwind-patterns
---
```

### Skill Discovery

1. Claude Code scans `.claude/skills/*/SKILL.md`
2. Loads skills based on agent requirements
3. Progressive loading via @mentions

Example skill frontmatter:

```yaml
---
name: nextjs-react-expert
description: React/Next.js performance optimization (57 rules)
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---
```

## ✅ Verification

Check if plugin is working:

```bash
# Verify structure
ls .claude/agents/*.md | wc -l
# Expected: 20

ls -d .claude/skills/*/ | wc -l
# Expected: 36+

# Verify hooks
cat .claude/hooks/hooks.json
# Should show PostToolUse configuration

# Test dispatcher
python3 .claude/scripts/validate_dispatcher.py --help
# Should show usage information
```

## 🔄 Maintenance

### Re-run Migration

If you update `.agent/` content:

```bash
bash .claude/scripts/migrate.sh
```

### Add New Validator

1. Create validator script in `.claude/skills/<skill>/scripts/`
2. Add mapping to `validate_dispatcher.py`:

```python
VALIDATOR_MAP = {
    '.myext': {
        'validators': ['my_validator.py'],
        'skill': 'my-skill',
        'description': 'My custom validation'
    }
}
```

## 📝 Notes

- **No indexing needed** - Claude Code scans folders automatically
- **No routing logic** - Model analyzes descriptions and selects agents
- **No progressive loader** - Use @mentions for on-demand loading
- **Hooks are optional** - Remove `hooks.json` to disable
- **Plugin format** - Standard Claude Code plugin, can be distributed

## 📖 Documentation

- **Full docs**: See `.agent/ARCHITECTURE.md` for detailed architecture
- **Skills reference**: Browse `.claude/skills/` for all available skills
- **Agents reference**: Browse `.claude/agents/` for all available agents

## 🆘 Support

For issues or questions:
- GitHub: https://github.com/vudovn/antigravity-kit
- Docs: https://antigravity-kit.vercel.app/

## 📄 License

MIT © nghialuutrung
