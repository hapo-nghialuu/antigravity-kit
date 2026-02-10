# System Architecture

## Overview

CafeKit is a monorepo containing AI agent templates, skills, and workflows for Spec-Driven Development. It supports multiple AI platforms through platform-specific configuration directories.

## Architecture Type

**Monorepo with Platform Adapters**

The project follows a monorepo architecture with pnpm workspaces, containing:
- Platform-specific configurations (`.claude/`, `.agent/`)
- Shared documentation website (`cafekit-web/`)
- Distributable NPM package (`packages/spec/`)

## Components

| Component | Tech | Purpose |
|-----------|------|---------|
| `.claude/` | Markdown, JSON | Claude Code commands and skills |
| `.agent/` | Markdown, JSON | Antigravity agents, skills, workflows |
| `cafekit-web/` | Next.js 16, Tailwind v4 | Documentation website |
| `packages/spec/` | Node.js, TypeScript | NPM package for CLI installation |
| `repomix-output.xml` | XML | AI context for codebase understanding |

## Data Flow

### Spec-Driven Development Flow

```
User Input
    ↓
/spec-init → Creates spec/ directory with README.md
    ↓
/spec-requirements → Generates EARS format requirements.md
    ↓
/spec-design → Creates technical design.md
    ↓
/spec-tasks → Breaks down into tasks.md
    ↓
/spec-impl → Implements tasks with full context
    ↓
/spec-status → Tracks progress
```

### Documentation Website Flow

```
MDX Content (content/docs/)
    ↓
next-mdx-remote (compile MDX)
    ↓
gray-matter (parse frontmatter)
    ↓
React Components (render)
    ↓
Next.js App Router (serve)
```

## Platform Structure

### Claude Code (`.claude/`)

```
.claude/
├── commands/           # Slash commands
│   ├── spec-init.md
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── spec-impl.md
│   └── spec-status.md
├── skills/
│   ├── claude-code/    # Claude-specific skills
│   └── spec-driven-development/  # SDD workflow skills
├── scripts/            # Utility scripts
├── ROUTING.md          # Agent routing rules
└── settings.local.json # Local settings
```

### Antigravity (`.agent/`)

```
.agent/
├── agents/             # Agent definitions
├── skills/             # 40+ reusable skills
│   ├── api-patterns/
│   ├── app-builder/
│   ├── architecture/
│   ├── database-design/
│   ├── frontend-design/
│   └── ...
├── workflows/          # Workflow orchestrations
├── commands/           # Command definitions
├── docs/               # Documentation
├── rules/              # Rule files
├── scripts/            # Utility scripts
├── ARCHITECTURE.md     # Architecture docs
└── CONVENTIONS.md      # Platform conventions
```

## Web Application Architecture

### Next.js App Router Structure

```
cafekit-web/app/
├── layout.tsx          # Root layout with theme provider
├── page.tsx            # Home page
├── docs/
│   ├── layout.tsx      # Docs layout with sidebar
│   └── [...slug]/
│       └── page.tsx    # Dynamic doc page
└── api/                # API routes (if any)
```

### Content Management

- **Source**: `content/docs/{locale}/**
- **Format**: MDX with frontmatter
- **Locales**: `en`, `vi`
- **Build-time**: Content compiled with `next-mdx-remote`

### Theming

- **Library**: `next-themes`
- **CSS**: Tailwind CSS v4 with CSS variables
- **Dark Mode**: System preference + manual toggle

## Package Architecture

### @haposoft/cafekit-spec

```
packages/spec/
├── bin/
│   └── install.js      # CLI installer
├── src/                # Source code (if any)
├── README.md
└── package.json
```

**Installation Flow:**
1. User runs `npx @haposoft/cafekit-spec`
2. CLI detects platform (Claude Code or Antigravity)
3. Copies appropriate files to `.claude/` or `.agent/`
4. Sets up routing and conventions

## Key Design Decisions

1. **Platform Separation**: `.claude/` and `.agent/` are separate to allow platform-specific optimizations
2. **Markdown-based**: Commands and skills use Markdown for easy editing and versioning
3. **Monorepo**: Shared documentation while maintaining separate platform configs
4. **MDX for Docs**: Rich documentation with React components support
5. **Repomix Integration**: XML output for AI context understanding

## Security Considerations

- No sensitive data in repository
- MIT licensed open source
- No API keys or secrets in code
- Security check in repomix for suspicious files

## Scalability

- **Horizontal**: Add more skills to `.agent/skills/`
- **Vertical**: Add more commands to `.claude/commands/`
- **Content**: Add more MDX files to `content/docs/`
- **Packages**: Add more packages to `packages/`
