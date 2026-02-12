---
activation: always_on
---

# cafekit

> Project-specific context for AI agents (Antigravity, Claude Code, etc.). See `.agent/` for workflows and skills.

---

## Project Overview

Spec-Driven Development workflow for AI coding assistants. It works with both Claude Code and Antigravity, adding slash commands that guide you through building complex features.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Node.js |
| Language | TypeScript |
| Styling | Tailwind CSS |

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| .agent | Antigravity agent configuration and skills |
| cafekit-web | Web application component |
| docs | Project documentation |

---

## Quick Commands

| Task | Command |
|------|---------|
| build | `pnpm run build` |
| dev | `pnpm run dev` |
| test | `pnpm run test` |
| clean | `pnpm run clean` |

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

## Agent Workflows

Available workflows in `.agent/workflows/`:
- `/docs-init` - Initialize documentation
- `/docs-update` - Update documentation

---

**Last Updated:** 2026-02-11
