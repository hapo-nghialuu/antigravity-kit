# CafeKit Spec

> Spec-Driven Development workflow for AI coding assistants

## Quick Install

```bash
npx @haposoft/cafekit-spec
```

## What is CafeKit Spec?

CafeKit Spec is a structured spec-driven development workflow for AI coding assistants. It works with both **[Claude Code](https://claude.ai/code)** (Anthropic) and **[Antigravity](https://antigravity.google/)** (Google), adding 10 powerful slash commands that guide you through building complex features and managing documentation:

### Spec Workflows

| Command | Purpose |
|---------|---------|
| `/spec-init` | Initialize feature specification |
| `/spec-requirements` | Generate EARS-format requirements |
| `/spec-design` | Create technical design |
| `/spec-tasks` | Break down into implementable tasks |
| `/code` | Implement from approved task list |
| `/test` | Validate, run tests and analyze failures |
| `/review` | Review correctness, security, and regressions |
| `/spec-status` | Check progress |

### Documentation Workflows

| Platform | Init Command | Update Command |
|----------|--------------|----------------|
| **Claude Code** | `/docs init` | `/docs update` |
| **Antigravity** | `/docs-init` | `/docs-update` |

## Why Spec-Driven Development?

Traditional AI coding often leads to:
- Incomplete requirements causing rework
- Missing edge cases discovered late
- Lost context between sessions

**CafeKit Spec solves this** with a structured spec-driven workflow:

```
Idea → /spec-init → /spec-requirements → /spec-design → /spec-tasks → /code → /test → /review
```

## Platform Compatibility

| Platform | Status | Directory | Installation |
|----------|--------|-----------|--------------|
| **Claude Code** (Anthropic) | ✅ Fully supported | `.claude/` | `npx @haposoft/cafekit-spec` |
| **Antigravity** (Google) | ✅ Fully supported | `.agent/` | `npx @haposoft/cafekit-spec` |

## Quick Start

```bash
# 1. Install (auto-detects your platform)
npx @haposoft/cafekit-spec

# 2. Initialize a spec
/spec-init user-authentication

# 3. Gather requirements
/spec-requirements user-authentication

# 4. Create design
/spec-design user-authentication

# 5. Generate tasks
/spec-tasks user-authentication

# 6. Implement, Test, and Review
/code
/test
/review
```

## Documentation

- **[Installation](https://cafekit.vercel.app/docs/getting-started/installation)** - Get set up
- **[Quickstart](https://cafekit.vercel.app/docs/getting-started/quickstart)** - Build your first spec
- **[Spec Workflow](https://cafekit.vercel.app/docs/guides/spec-workflow)** - Complete guide

## Acknowledgments

CafeKit Spec is inspired by and built upon ideas from [Antigravity Kit](https://github.com/vudovn/antigravity-kit) by [@vudovn](https://github.com/vudovn).

## License

MIT © Haposoft
