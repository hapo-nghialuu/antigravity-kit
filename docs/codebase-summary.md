# Codebase Summary

> Auto-generated project overview for CafeKit

## Project Info

| Property    | Value                                                      |
|-------------|------------------------------------------------------------|
| **Name**    | CafeKit                                                    |
| **Version** | 2.0.0                                                      |
| **Type**    | AI Agent Templates Monorepo                                |
| **License** | MIT                                                        |
| **Author**  | vudovn / Haposoft                                          |

## Description

AI Agent templates - Skills, Agents, and Workflows for enhanced coding assistance. CafeKit provides a Spec-Driven Development workflow that works with both Claude Code (Anthropic) and Antigravity (Google).

## Statistics

| Metric         | Value                |
|----------------|----------------------|
| Files          | 1,171                |
| Tokens         | 2,489,067            |
| Characters     | 9,532,345            |
| Generated      | 2026-02-10           |

## Tech Stack

| Layer           | Technology                             |
|-----------------|----------------------------------------|
| Web Framework   | Next.js 16.1.3                         |
| UI Library      | React 19.2.3                           |
| Styling         | Tailwind CSS v4                        |
| Language        | TypeScript 5.7.2                       |
| Package Manager | pnpm                                   |
| Monorepo        | pnpm workspaces                        |
| UI Components   | @base-ui/react, lucide-react           |
| Content         | MDX, next-mdx-remote, gray-matter      |
| Themes          | next-themes                            |

## Project Structure

```
.
├── .claude/                    # Claude Code configuration
│   ├── commands/               # Slash commands
│   │   ├── docs.md
│   │   ├── spec-design.md
│   │   ├── spec-impl.md
│   │   ├── spec-init.md
│   │   ├── spec-requirements.md
│   │   ├── spec-status.md
│   │   └── status.md
│   ├── skills/                 # Claude skills
│   │   ├── claude-code/
│   │   └── spec-driven-development/
│   ├── scripts/
│   ├── ROUTING.md
│   └── settings.local.json
├── .agent/                     # Antigravity configuration
│   ├── agents/                 # Agent definitions
│   ├── skills/                 # 40+ skills
│   ├── workflows/              # Workflow definitions
│   ├── commands/
│   ├── docs/
│   ├── rules/
│   ├── scripts/
│   ├── ARCHITECTURE.md
│   ├── CONVENTIONS.md
│   └── mcp_config.json
├── cafekit-web/                # Documentation website
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   ├── content/docs/           # MDX documentation
│   │   ├── en/                 # English docs
│   │   └── vi/                 # Vietnamese docs
│   ├── lib/
│   ├── public/
│   └── package.json
├── packages/
│   └── spec/                   # NPM package
│       ├── bin/                # CLI installer
│       └── src/
├── docs/                       # Project documentation
├── repomix-output.xml          # AI context file
└── package.json
```

## Key Directories

| Directory         | Purpose                                   |
|-------------------|-------------------------------------------|
| `.claude/`        | Claude Code commands and skills           |
| `.agent/`         | Antigravity agents, skills, workflows     |
| `cafekit-web/`    | Next.js documentation website             |
| `packages/spec/`  | NPM package @haposoft/cafekit-spec        |
| `docs/`           | Project documentation (this folder)       |

## Core Features

1. **Spec-Driven Development Workflow**
   - `/spec-init` - Initialize feature specification
   - `/spec-requirements` - Generate EARS-format requirements
   - `/spec-design` - Create technical design
   - `/spec-tasks` - Break down into implementable tasks
   - `/spec-impl` - Implement specific tasks
   - `/spec-status` - Check progress

2. **Multi-Platform Support**
   - Claude Code (Anthropic) via `.claude/`
   - Antigravity (Google) via `.agent/`

3. **Documentation Website**
   - Multi-language support (English, Vietnamese)
   - MDX-based content
   - Built with Next.js 16 + Tailwind CSS v4

4. **NPM Package**
   - `@haposoft/cafekit-spec` - CLI installer for the workflow

## Repository

- **GitHub**: https://github.com/hapo-nghialuu/hapo-cafekit
- **Website**: https://cafekit.vercel.app
