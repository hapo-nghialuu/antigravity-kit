# CafeKit

> Claude Code-first spec-driven workflow for AI coding assistants.

## Quick Install

```bash
npx @haposoft/cafekit
```

The installer records the installed package version in `.claude/cafekit.json` for Claude Code projects and `.opencode/cafekit.json` for OpenCode projects.

## What It Is

CafeKit installs a working runtime bundle for Claude Code:
- `hapo:qs` for requirement clarification before specs, design, or implementation
- `hapo:brainstorm` for scout-first ideation before a spec is ready
- `hapo:specs` for structured specification work
- `hapo:develop` for implementation from approved specs
- `hapo:debug` and `hapo:hotfix` for evidence-first diagnosis and safe bug fixes
- `hapo:docs` for project documentation and source-backed as-is reconstruction
- `hapo:test` and `hapo:code-review` for verification
- `hapo:generate-graph` for technical diagrams
- supporting hooks, agents, rules, and statusline runtime

CafeKit uses rule-based skill routing guidance and an installed skill catalog.
Agents choose the right `hapo:*` skill from workflow/domain rules instead of
using an automatic prompt-scoring hook.

Core flow:

```text
Idea -> /hapo:qs (if unclear) -> /hapo:brainstorm (if design choices remain) -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review
```

## Quick Start

```bash
/hapo:qs "What is still unclear before writing the transcript extension spec?" --spec-ready
/hapo:brainstorm Explore approaches for a meeting transcript extension
/hapo:specs Build a meeting transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test --full
/hapo:code-review --pending
```

For existing or legacy systems without reliable documentation:

```bash
/hapo:docs --reconstruct apps/legacy-admin
/hapo:specs Modernize the approved as-is docs with CSV export and split admin/operator permissions
```

The reconstruct run writes an evidence-backed as-is docs bundle plus a self-contained HTML overview for human review before specs begin.

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
- OpenCode: supported project-local runtime install with prefix-free `.opencode/commands`, `.opencode/agents`, `AGENTS.md`, `opencode.json`, and Claude-compatible skills
- Cursor: coming soon

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/workflows/specs

## License

MIT © Haposoft
