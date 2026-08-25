# CafeKit

> Native spec-driven workflows for Claude Code and Codex CLI.

## Quick Install

```bash
npx @haposoft/cafekit
```

Install Codex explicitly:

```bash
npx @haposoft/cafekit --platform codex
```

The installer records the package version in the selected runtime:
`.claude/cafekit.json` or `.codex/cafekit.json`.

## What It Is

CafeKit installs a native runtime bundle for each supported coding agent:
- `hapo:question` for evidence-backed questions about source code, docs, specs, config, dependencies, or external technical knowledge
- `hapo:brainstorm` for unresolved product or architecture choices, with proportional routing before delivery
- `hapo:specs` for structured specification work
- `hapo:develop` for implementation after technical spec readiness and an explicit invocation
- `hapo:debug` and `hapo:hotfix` for evidence-first diagnosis and safe bug fixes
- `hapo:docs` for project documentation and source-backed as-is reconstruction
- `hapo:test` and `hapo:code-review` for verification
- supporting hooks, agents, rules, and platform-native runtime integration

CafeKit uses rule-based skill routing guidance and an installed skill catalog.
Agents choose the right `hapo:*` skill from workflow/domain rules instead of
using an automatic prompt-scoring hook.

Core routes (shown with Claude Code syntax):

```text
Feature/docs: Idea -> /hapo:brainstorm (if choices remain) -> explicit /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review
Bug/failure: /hapo:debug -> /hapo:hotfix only when the user requested a fix
Product/architecture exploration: /hapo:brainstorm -> chat recommendation -> stop
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
specs/<feature>/
├── plan.md
├── task-01-<slug>.md
└── task-NN-<slug>.md
```

## Spec Output

Process-first Specs packets are flat and hand-editable. `plan.md` is the
index; each `task-NN-<slug>.md` lives beside it and owns one outcome.

- C1 — scope, before the plan is written.
- C2 — findings, after adversarial review.
- C3 — done, after execution proof and receipts.

`plan.md` keeps the C1 scope decision, EARS acceptance criteria, explicit
exclusions, and a task table. Every acceptance criterion must map to at least
one task and one proof command.

Each task file keeps exactly one `Status:` field. A task is complete only when
its inline canonical `## Receipt` is current and contains the exact command,
`Exit: 0`, `Verification: PASS`, runtime-derived `Base` and `Head`, and a
fenced block with current command output.

### Legacy compatibility

Existing features that already have `spec.json`, nested `tasks/task-R*.md`, or
separate receipt files stay on the installed legacy adapter. Keep `spec.json`,
`task_registry`, `planning_depth`, `assurance_level`, `lane`, `execution_tier`,
and `semantic_model` there only; new Specs output does not author them.

Claude Code and Codex CLI are the primary Specs v2 acceptance targets.

## Platform Status

- Claude Code: native supported runtime
- Codex CLI: native project-local runtime with `.agents/skills`, `.codex/agents`, project hooks, rules, and a managed `AGENTS.md` block
- OpenCode: support removed in 0.17 (last supported release: 0.16.x)
- Cursor: coming soon

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/workflows/specs

## License

MIT © Haposoft
