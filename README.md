# CafeKit

> Native spec-driven workflows for Claude Code, Codex CLI, and OpenCode.

## Quick Install

```bash
npx @haposoft/cafekit
```

Install Codex explicitly:

```bash
npx @haposoft/cafekit --platform codex
```

The installer records the package version in the selected runtime:
`.claude/cafekit.json`, `.codex/cafekit.json`, or `.opencode/cafekit.json`.

## What It Is

CafeKit installs a native runtime bundle for each supported coding agent:
- `hapo:question` for evidence-backed questions about source code, docs, specs, config, dependencies, or external technical knowledge
- `hapo:brainstorm` for scout-first ideation before a spec is ready
- `hapo:specs` for structured specification work
- `hapo:develop` for implementation from approved specs
- `hapo:debug` and `hapo:hotfix` for evidence-first diagnosis and safe bug fixes
- `hapo:docs` for project documentation and source-backed as-is reconstruction
- `hapo:test` and `hapo:code-review` for verification
- supporting hooks, agents, rules, and platform-native runtime integration

CafeKit uses rule-based skill routing guidance and an installed skill catalog.
Agents choose the right `hapo:*` skill from workflow/domain rules instead of
using an automatic prompt-scoring hook.

Core flow (shown with Claude Code syntax):

```text
Question -> /hapo:question -> Idea -> /hapo:brainstorm (if design choices remain) -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review
```

## Quick Start

Claude Code:

```bash
/hapo:question "Which config file controls CafeKit runtime behavior in this project?"
/hapo:brainstorm Explore approaches for a meeting transcript extension
/hapo:specs Build a meeting transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test --full
/hapo:code-review --pending
```

Codex CLI uses native skills from `.agents/skills/`:

```text
$hapo-question "Which config controls CafeKit runtime behavior?" --repo
$hapo-brainstorm Explore approaches for a meeting transcript extension
$hapo-specs Build a meeting transcript extension with AI summaries
$hapo-develop meet-transcript-mvp
$hapo-test --full
$hapo-code-review --pending
```

Use `/skills` to browse installed skills. Trust the repository, then review
project hooks with `/hooks` before enabling them.

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

- Claude Code: native supported runtime
- Codex CLI: native project-local runtime with `.agents/skills`, `.codex/agents`, project hooks, rules, and a managed `AGENTS.md` block
- OpenCode: supported project-local runtime install with prefix-free `.opencode/commands`, `.opencode/agents`, `AGENTS.md`, `opencode.json`, and Claude-compatible skills
- Cursor: coming soon

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/workflows/specs

## License

MIT © Haposoft
