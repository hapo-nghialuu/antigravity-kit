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

Document and multimodal skills are optional. Choose them in the interactive
installer, or opt in explicitly:

```bash
npx @haposoft/cafekit --with-document-skills
```

Use `--without-document-skills` to skip them or remove pristine CafeKit-owned
copies from an existing install. User-modified skill files are preserved.

## What It Is

CafeKit installs a native runtime bundle for each supported coding agent:
- `hapo:ask` for evidence-backed questions about source code, docs, specs, config, dependencies, or external technical knowledge
- `hapo:scout` for fast scoped discovery of files, entrypoints, call paths, and blast radius
- `hapo:brainstorm` for unresolved product or architecture choices, with proportional routing before delivery
- `hapo:research` for proportional, traceable evidence when a technical decision remains uncertain
- `hapo:route` for ambiguous, multi-step, multi-domain, or elevated-risk work that needs the shortest valid installed chain
- `hapo:loop` for explicit-only, bounded numeric optimization in an isolated worktree
- `hapo:specs` for structured specification work
- `hapo:develop` for implementation after technical spec readiness and an explicit invocation
- `hapo:debug` and `hapo:fix` for evidence-first diagnosis and root-cause repairs — every repair consumes the debug handoff before mutation; Quick/local stays direct; Standard and Incident/deep bound outcome, constraints, non-goals, and acceptance; complex repairs use post-diagnosis research, brainstorm, and staged planning only when the evidence leaves a real decision; all depths retain shared `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED` verdicts
- optional `hapo:docs`, DOCX, PDF, PPTX, XLSX, and multimodal skills when selected during install
- `hapo:test` and `hapo:code-review` for verification
- supporting hooks, agents, rules, and platform-native runtime integration

CafeKit uses rule-based skill routing guidance and an installed skill catalog.
Agents choose the right `hapo:*` skill from workflow/domain rules instead of
using an automatic prompt-scoring hook.

Skill loading uses progressive disclosure: catalog metadata identifies a
candidate, its selected `SKILL.md` defines the contract, and only its needed
references are read. Invoke a valid installed skill directly; escalate to
`hapo:route` only when classification or chaining is material. If a skill or
agent is absent, continue inline when safe or name the gap—never invent it.
Hooks are not a skill router and do not auto-select skills. Source and installed
projection parity is tested; live-model adherence remains `UNPROVEN` and is not
deterministic.

Core routes (shown with Claude Code syntax):

```text
Feature: Idea -> /hapo:brainstorm (if choices remain) -> explicit /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review
Bug/failure: /hapo:debug -> /hapo:fix only when the user requested a fix
Product/architecture exploration: /hapo:brainstorm -> chat recommendation -> stop
Uncertain technical decision: /hapo:research -> traceable evidence -> decision handoff
Explicit numeric optimization: /hapo:loop -> bounded isolated experiments -> patch handoff
```

## Quick Start

Claude Code:

```bash
/hapo:ask "Which config file controls CafeKit runtime behavior in this project?"
/hapo:scout "Find the runtime entrypoints for skill installation"
/hapo:brainstorm Explore approaches for a meeting transcript extension
/hapo:research Compare current local-first search libraries for this repository
/hapo:loop Goal="reduce parser latency" Scope="packages/parser" Metric="median ms, lower" Baseline="pinned base" Guard="npm test" Noise="MAD; minimum delta 2%" Budget="10 iterations" Stop="budget, drift, or failed guard"
/hapo:specs Build a meeting transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test --full
/hapo:code-review --pending
```

Codex CLI uses native skills from `.agents/skills/`:

```text
$hapo-ask "Which config controls CafeKit runtime behavior?" --repo
$hapo-scout "Find the runtime entrypoints for skill installation"
$hapo-brainstorm Explore approaches for a meeting transcript extension
$hapo-research Compare current local-first search libraries for this repository
$hapo-loop Goal="reduce parser latency" Scope="packages/parser" Metric="median ms, lower" Baseline="pinned base" Guard="npm test" Noise="MAD; minimum delta 2%" Budget="10 iterations" Stop="budget, drift, or failed guard"
$hapo-specs Build a meeting transcript extension with AI summaries
$hapo-develop meet-transcript-mvp
$hapo-test --full
$hapo-code-review --pending
```

Use `/skills` to browse installed skills. Trust the repository, then review
project hooks with `/hooks` before enabling them.

### Research versus Loop

Research answers an uncertain decision. It selects Quick, Standard, or Deep
depth, uses repository evidence for local fit, and attaches source, authority,
date/version, applicability, and confidence state to material claims. It does
not implement the recommendation or guarantee that it is correct.

Loop is never selected automatically. Use it only when Goal, isolated Scope,
finite numeric Metric and Direction, reproducible Baseline, distinct Guard,
noise policy and minimum delta, budget, and stop conditions are explicit. It
experiments in a detached worktree and returns a base-bound patch handoff; it
does not apply, commit, push, or guarantee an improvement.

With the optional document skills installed, existing or legacy systems can use:

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
