# CafeKit

> AI Agent templates - Skills, Agents, and Workflows for enhanced coding assistance. See `.claude/ROUTING.md` for agent routing rules.

---

## Project Overview

CafeKit is a comprehensive AI coding assistant toolkit that provides structured workflows, skills, and templates for enhanced software development. It implements Spec-Driven Development (SDD) - a methodology that bridges the gap between natural language requirements and implementation through structured specifications.

The project supports both **Claude Code** (Anthropic) and **Antigravity** (Google) platforms.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Web Framework | Next.js 16.1.3 |
| UI Library | React 19.2.3 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript 5.7.2 |
| Package Manager | pnpm |
| UI Components | @base-ui/react, lucide-react |
| Content | MDX, next-mdx-remote, gray-matter |
| Themes | next-themes |

---

## Project Structure

```
.
├── .claude/                    # Claude Code configuration
│   ├── commands/               # Slash commands (spec-init, spec-design, etc.)
│   ├── skills/                 # Claude skills
│   ├── scripts/                # Utility scripts
│   └── ROUTING.md              # Agent routing rules
├── .agent/                     # Antigravity configuration
│   ├── agents/                 # Agent definitions
│   ├── skills/                 # 40+ reusable skills
│   ├── workflows/              # Workflow definitions
│   ├── ARCHITECTURE.md         # Architecture docs
│   └── CONVENTIONS.md          # Platform conventions
├── cafekit-web/                # Documentation website (Next.js 16)
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   ├── content/docs/           # MDX documentation (en, vi)
│   └── package.json
├── packages/
│   └── spec/                   # NPM package @haposoft/cafekit
├── docs/                       # Project documentation
│   ├── codebase-summary.md
│   ├── project-overview-pdr.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── design-guidelines.md
│   ├── deployment-guide.md
│   └── project-roadmap.md
└── repomix-output.xml          # AI context file
```

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `.claude/` | Claude Code commands and skills |
| `.agent/` | Antigravity agents, skills, workflows |
| `cafekit-web/` | Next.js documentation website |
| `packages/spec/` | NPM package @haposoft/cafekit |
| `docs/` | Project documentation |

---

## Quick Commands

| Task | Command |
|------|---------|
| Install dependencies | `pnpm install` |
| Dev server (root) | `pnpm dev` |
| Dev server (web) | `pnpm --filter cafekit-web dev` |
| Build all | `pnpm build` |
| Build web | `pnpm --filter cafekit-web build` |
| Lint | `pnpm --filter cafekit-web lint` |
| Publish package | `cd packages/spec && npm publish` |

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

## Spec-Driven Development Commands

| Command | Purpose |
|---------|---------|
| `/spec-init` | Initialize feature specification |
| `/spec-requirements` | Generate EARS-format requirements |
| `/spec-design` | Create technical design |
| `/spec-tasks` | Break down into implementable tasks |
| `/code` | Implement approved tasks |
| `/test` | Validate implementation |
| `/review` | Review code quality |
| `/spec-status` | Check spec progress |

---

## Framework Reference

See `.claude/ROUTING.md` for agent routing and framework rules.

---

**Last Updated:** 2026-02-10
