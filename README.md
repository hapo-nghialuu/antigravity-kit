# CafeKit

> Claude Code-first spec-driven workflow for AI coding assistants.

## Quick Install

```bash
npx @haposoft/cafekit
```

The installer records the installed package version in `.claude/cafekit.json` for Claude Code projects.

## What It Is

CafeKit installs a working runtime bundle for Claude Code:
- `hapo:brainstorm` for scout-first ideation before a spec is ready
- `hapo:specs` for structured specification work
- `hapo:develop` for implementation from approved specs
- `hapo:debug` and `hapo:hotfix` for evidence-first diagnosis and safe bug fixes
- `hapo:test` and `hapo:code-review` for verification
- `hapo:generate-graph` for technical diagrams
- supporting hooks, agents, rules, and statusline runtime

Core flow:

```text
Idea -> /hapo:brainstorm (if unclear) -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review
```

## Quick Start

```bash
/hapo:brainstorm Explore approaches for a meeting transcript extension
/hapo:specs Build a meeting transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test --full
/hapo:code-review --pending
```

Specs are stored under:

```text
specs/<feature-name>/
├── spec.json
├── requirements.md
├── research.md
├── design.md
└── tasks/task-R*.md
```

## Platform Status

- Claude Code: primary supported runtime
- Antigravity: coming soon
- Cursor: coming soon

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/workflows/specs

## License

MIT © Haposoft
