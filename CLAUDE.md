<<<<<<< HEAD
# Antigravity Kit - Claude Code Convention
=======
# CafeKit
>>>>>>> new-refactor

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

<<<<<<< HEAD
## SOCRATIC GATE (For Complex Tasks)

**MANDATORY: Complex requests must pass through clarification using AskUserQuestion tool.**

### When to Trigger

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | 🛑 Use AskUserQuestion |
| Complex feature or architecture | 🛑 Clarify before implementing |
| Update/change request | 🛑 Confirm scope |
| Vague requirements | 🛑 Ask purpose, users, constraints |

### Required: Use AskUserQuestion Tool

**Claude Code provides the `AskUserQuestion` tool for structured clarification.**

**Protocol:**
1. **STOP** - Do NOT start coding
2. **INVOKE** - Use AskUserQuestion tool with 1-4 questions (refer to brainstorming skill for examples)
3. **WAIT** - Tool execution pauses until user answers (60s timeout)
4. **PROCEED** - Use answers to inform implementation

**See:** `.claude/skills/brainstorming/SKILL.md` for full question templates and examples.

### Request Types

| Request Type            | Strategy       | Required Action                                |
| ----------------------- | -------------- | ---------------------------------------------- |
| **New Feature / Build** | Deep Discovery | Use AskUserQuestion with minimum 3 questions   |
| **Code Edit / Bug Fix** | Context Check  | Confirm understanding + ask impact questions   |
| **Vague / Simple**      | Clarification  | Ask Purpose, Users, and Scope via tool         |
| **Full Orchestration**  | Gatekeeper     | STOP subagents until user confirms plan        |

**Protocol:**
1. **Never Assume:** If even 1% is unclear, use AskUserQuestion tool.
2. **Wait:** Do NOT invoke subagents or write code until user answers.

---

## 📁 Project Structure

This project uses **Antigravity Kit** - a Claude Code plugin with specialist agents and domain skills.

```
antigravity-kit/
├── .agent/                    # ⚠️ LEGACY - Google Antigravity format
│   └── (Keep for reference, but DO NOT USE)
│
├── .claude/                   # ✅ ACTIVE - Claude Code plugin format
│   ├── .claude-plugin/
│   │   └── plugin.json       # Plugin manifest
│   ├── agents/               # 20 specialist agents
│   ├── skills/               # 36+ domain skills
│   ├── workflows/            # 11 slash command procedures
│   ├── hooks/                # Validation hooks
│   └── scripts/              # Utilities & validators
│
└── web/                       # Demo web application
=======
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
│   └── spec/                   # NPM package @haposoft/cafekit-spec
├── docs/                       # Project documentation
│   ├── codebase-summary.md
│   ├── project-overview-pdr.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── design-guidelines.md
│   ├── deployment-guide.md
│   └── project-roadmap.md
└── repomix-output.xml          # AI context file
>>>>>>> new-refactor
```

---

<<<<<<< HEAD
## 🎯 How to Use Antigravity Kit
=======
## Key Directories
>>>>>>> new-refactor

| Directory | Purpose |
|-----------|---------|
| `.claude/` | Claude Code commands and skills |
| `.agent/` | Antigravity agents, skills, workflows |
| `cafekit-web/` | Next.js documentation website |
| `packages/spec/` | NPM package @haposoft/cafekit-spec |
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
| `/spec-impl` | Implement specific tasks |
| `/spec-status` | Check spec progress |

---

## Framework Reference

See `.claude/ROUTING.md` for agent routing and framework rules.

---

**Last Updated:** 2026-02-10
