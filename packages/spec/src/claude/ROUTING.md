# CafeKit Routing Guide

> Project-specific routing and conventions for CafeKit. Complements Claude Code CLI's built-in agent system.

---

## Quick Agent Selection

| Domain | Keywords | Agent File |
|--------|----------|------------|
| **Frontend** | ui, component, react, css, layout | `.claude/agents/frontend-specialist.md` |
| **Backend** | api, route, server, endpoint | `.claude/agents/fullstack-developer.md` |
| **Database** | schema, migration, query, table | `.claude/agents/fullstack-developer.md` |
| **Security** | auth, login, jwt, password | `.claude/agents/code-reviewer.md` |
| **Mobile** | react native, flutter, ios, android | `.claude/agents/fullstack-developer.md` |
| **Debug** | error, bug, crash, not working | `.claude/agents/debugger.md` |
| **Testing** | test, coverage, unit, e2e | `.claude/agents/tester.md` |
| **DevOps** | deploy, docker, ci/cd | `.claude/agents/fullstack-developer.md` |
| **Performance** | slow, optimize, cache | `.claude/agents/code-reviewer.md` |
| **Docs** | documentation, readme | `.claude/agents/code-reviewer.md` |

**Multi-domain:** Use `fullstack-developer` and coordinate with `tester` + `code-reviewer`.

---

## Project-Specific Rules

### Socratic Gate (Complex Tasks)

**MANDATORY:** Use `AskUserQuestion` for:
- "Build/Create/Make [thing]" without details
- Complex features or architecture
- Vague requirements

**Protocol:**
1. STOP - Do NOT start coding
2. INVOKE - Use AskUserQuestion tool
3. WAIT - For user answers
4. PROCEED - With clarified requirements

### Clean Code Standards

| Principle | Rule |
|-----------|------|
| **SRP** | One function = one thing |
| **DRY** | Extract duplicates, reuse |
| **KISS** | Simplest solution that works |
| **YAGNI** | Don't build unused features |

**Naming:**
- Variables: `userCount` not `n`
- Functions: `getUserById()` not `user()`
- Booleans: `isActive`, `hasPermission`

### Before Editing Files

1. **Check imports:** Who depends on this file?
2. **Identify impact:** What else needs updating?
3. **Edit together:** File + all dependents in same task

---

## Slash Commands

| Command | Purpose | Args |
|---------|---------|------|
| `/docs init` | Create docs | `[--focus=dirs]` |
| `/docs update` | Update docs | `[--focus=dirs]` |
| `/spec-init` | Init spec | `<description>` |
| `/spec-requirements` | Requirements | `<feature>` |
| `/spec-design` | Design doc | `<feature> [-y]` |
| `/spec-tasks` | Task list | `<feature> [-y]` |
| `/code` | Implement | `<feature> [task-id]` |
| `/spec-status` | View status | `[feature]` |

---

## Core Skills

| Skill | Use When | Location |
|-------|----------|----------|
| **spec-driven-development** | New features, specs | `.claude/skills/spec-driven-development/` |
| **claude-code** | Claude CLI help | `.claude/skills/claude-code/` |

**All skills:** `.claude/skills/`

---

## Project Context

| File | Purpose | Load When |
|------|---------|-----------|
| `CLAUDE.md` | Project overview | Every session |
| `docs/codebase-summary.md` | Stats, structure | "overview" |
| `docs/system-architecture.md` | Architecture | "architecture" |
| `repomix-output.xml` | Full codebase | Deep analysis |

---

**Last Updated:** 2026-02-24
