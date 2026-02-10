# Project Overview (PDR)

## Identity

- **Name:** CafeKit
- **Version:** 2.0.0
- **Type:** AI Agent Templates & Spec-Driven Development Workflow
- **Status:** Active Development
- **License:** MIT

## Description

CafeKit is a comprehensive AI coding assistant toolkit that provides structured workflows, skills, and templates for enhanced software development. It implements Spec-Driven Development (SDD) - a methodology that bridges the gap between natural language requirements and implementation through structured specifications.

## Problem Statement

Traditional AI coding often leads to:
- Incomplete requirements causing rework
- Missing edge cases discovered late in development
- Lost context between AI sessions
- Inconsistent code quality
- Difficulty managing complex, multi-file features

## Solution

CafeKit provides a structured 6-phase workflow:

```
Idea → /spec-init → /spec-requirements → /spec-design → /spec-tasks → /spec-impl → /spec-status
```

Each phase produces concrete artifacts that build upon each other, ensuring complete requirements and designs before implementation begins.

## Platform Compatibility

| Platform                  | Status           | Directory   | Installation                 |
|---------------------------|------------------|-------------|------------------------------|
| **Claude Code** (Anthropic) | ✅ Fully supported | `.claude/`  | `npx @haposoft/cafekit-spec` |
| **Antigravity** (Google)    | ✅ Fully supported | `.agent/`   | `npx @haposoft/cafekit-spec` |

## Core Features

### 1. Spec-Driven Development Commands

| Command               | Purpose                                         |
|-----------------------|-------------------------------------------------|
| `/spec-init`          | Initialize feature specification with templates |
| `/spec-requirements`  | Generate comprehensive EARS-format requirements |
| `/spec-design`        | Create technical design documents               |
| `/spec-tasks`         | Break down into implementable tasks             |
| `/spec-impl`          | Implement specific tasks with context           |
| `/spec-status`        | Check spec progress and status                  |

### 2. Extensive Skill Library

The `.agent/skills/` directory contains 40+ specialized skills:

- **api-patterns** - API design patterns and best practices
- **app-builder** - Application scaffolding templates
- **architecture** - System architecture guidance
- **database-design** - Database modeling and optimization
- **frontend-design** - UI/UX patterns and components
- **game-development** - Game dev-specific workflows
- **deployment-procedures** - CI/CD and deployment guides
- And more...

### 3. Documentation Website

- **URL:** https://cafekit.vercel.app
- **Framework:** Next.js 16 with Tailwind CSS v4
- **Features:**
  - Multi-language support (English, Vietnamese)
  - MDX-based documentation
  - Dark/light theme support
  - Responsive design

### 4. NPM Package

- **Package:** `@haposoft/cafekit-spec`
- **Purpose:** CLI installer for the CafeKit workflow
- **Usage:** `npx @haposoft/cafekit-spec`

## Target Users

1. **Software Developers** - Using Claude Code or Antigravity for AI-assisted coding
2. **Development Teams** - Seeking structured AI workflows
3. **AI Assistant Users** - Wanting better context management and spec-driven development

## Roadmap

### Current (v2.0.0)
- ✅ Core spec-driven workflow (6 commands)
- ✅ Multi-platform support (Claude Code + Antigravity)
- ✅ Documentation website
- ✅ NPM package distribution

### Short Term (30 days)
- [ ] Additional language support
- [ ] More skill templates
- [ ] Integration examples
- [ ] Video tutorials

### Medium Term (90 days)
- [ ] VS Code extension
- [ ] Web-based spec editor
- [ ] Community skill sharing
- [ ] Automated testing integration

### Long Term (6 months)
- [ ] AI-powered spec generation
- [ ] Real-time collaboration
- [ ] Enterprise features
- [ ] Plugin ecosystem

## Success Metrics

- NPM package downloads
- GitHub stars and forks
- Documentation website traffic
- Community contributions
- User satisfaction surveys

## Acknowledgments

CafeKit Spec is inspired by and built upon ideas from [Antigravity Kit](https://github.com/vudovn/antigravity-kit) by [@vudovn](https://github.com/vudovn).
