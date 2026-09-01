# @haposoft/cafekit

> Native spec-driven workflow and runtime bundle for Claude Code and Codex CLI.

[![Version](https://img.shields.io/badge/version-0.16.0-blue.svg)](https://github.com/haposoft/cafekit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude%20Code](https://img.shields.io/badge/Claude%20Code-Native-orange.svg)](https://claude.ai/code)
[![Codex%20CLI](https://img.shields.io/badge/Codex%20CLI-Native-111111.svg)](https://developers.openai.com/codex)

## Overview

CafeKit installs a structured workflow so an AI coding agent can move cleanly from:

```text
Question -> Question answer -> Brainstorm -> Spec -> Design -> Task Files -> Implementation -> Test -> Review
```

Claude Code install support:
- installs CafeKit skills under `.claude/skills/`
- installs supporting agents under `.claude/agents/`
- installs runtime hooks, statusline, and managed settings
- merges Claude settings safely on re-run

Codex CLI install support:
- installs native skills under `.agents/skills/`
- installs auto-discovered custom agents under `.codex/agents/*.toml`
- installs native lifecycle hooks, rules, scripts, references, and runtime config under `.codex/`
- merges a CafeKit-owned block into root `AGENTS.md`
- requires no generated `.codex/config.toml` and never changes global trust config

## Install

Run in your project root:

```bash
npx @haposoft/cafekit
```

Install Codex explicitly:

```bash
npx @haposoft/cafekit --platform codex
```

Re-running the same version selectively refreshes pristine managed files while
preserving edits. To reset user-modified managed files from a saved backup:

```bash
npx @haposoft/cafekit --platform codex --force-overwrite
```

Requirements:
- Node.js 18+
- Claude Code or Codex CLI; choose a runtime when prompted or use `--platform`

## Git ignore policy

On install, CafeKit updates the **project-root** `.gitignore` with:

```text
# CafeKit / Ecosystem
specs/_shared/
plans/*
!plans/*.md
!plans/templates/
!plans/templates/**
.cafekit-backup/
.cafekit.lock
.claude/
.codex/
.agents/
```

Runtime folders are local — reinstall with `npx @haposoft/cafekit` rather than
committing them. Inside the runtime, CafeKit also installs `.claude/.gitignore` or the
Codex pair `.codex/.gitignore` + `.agents/.gitignore`. These keep secrets, skill dependencies, session state,
and hook logs out of git even if someone partially un-ignores a runtime.
Teams may deliberately commit runtime files, but should also commit the
ownership manifest so selective updates share the same baseline.

## What Gets Installed

Claude Code targets:

```text
.claude/
├── .gitignore
├── skills/
├── agents/
├── hooks/
├── rules/
├── scripts/
├── references/
├── cafekit.json
├── status.cjs
├── runtime.json
└── settings.json

CLAUDE.md
```

CafeKit owns only its marked block inside the project-root `CLAUDE.md`; project
instructions outside that block are preserved across installs and upgrades.

Codex CLI targets:

```text
.agents/
├── .gitignore
└── skills/

.codex/
├── .gitignore
├── agents/*.toml
├── hooks.json
├── hooks/
├── rules/
├── scripts/
├── references/
├── cafekit.json
└── runtime.json

AGENTS.md
```

CafeKit owns only its marked block in root `AGENTS.md`. Codex discovers skills
and custom agents natively after the repository is trusted; no project
`config.toml` is generated. Review and trust project hooks with `/hooks`.
On Windows, installed hook commands are bound to the canonical project path
without requiring Git and remain stable when a session starts in a subdirectory.
CafeKit uses Codex's native status and usage UI instead of installing the
Claude statusline.

To check the installed CafeKit package version:

```bash
cat .claude/cafekit.json
cat .codex/cafekit.json
```

## Core Skills

CafeKit ships many skills, but the main release surface is:

- `/hapo:ask <question> [--repo|--web|--both|--brief|--deep]`: answer questions using repo evidence first, then external/current sources when local evidence is insufficient
- `/hapo:scout <search-target>`: discover relevant files locally first, delegating only for permitted broad independent scopes
- `/hapo:brainstorm <idea-or-problem>`: scout the repo, clarify exact requirements, compare approaches, and hand off to specs
- `/hapo:research <decision>`: choose proportional depth and return traceable evidence for an uncertain technical decision
- `/hapo:route <material-request>`: classify ambiguous, multi-step, multi-domain, or elevated-risk work and compose the shortest valid installed chain
- `/hapo:loop <bounded-experiment>`: run explicit-only numeric optimization in an isolated worktree and return a base-bound patch handoff
- `/hapo:specs <feature-description>`: create or resume a structured spec workflow
- `/hapo:develop <feature-name>`: implement from approved spec artifacts
- `/hapo:debug <issue>`: run adaptive-depth, diagnostic-only root-cause analysis with elimination and prevention-aware handoff
- `/hapo:fix <issue>`: repair the diagnosed root cause with proportional depth; Quick/local stays direct, while Standard and Incident/deep bound the repair and use post-diagnosis research, brainstorm, or staged planning only when evidence leaves a real decision; every path consumes the `hapo:debug` handoff and reports shared `PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED` verdicts through verification, prevention, and side-effect gates
- `/hapo:test [scope|--full]`: run verification and return a structured verdict
- `/hapo:code-review [scope|--pending]`: adversarial review focused on correctness, regressions, and security

### Adaptive Brainstorm controls

Brainstorm stays proportional by default: Direct classification runs before any
analysis overlay, then non-direct work selects the smallest adequate Standard or
Deep depth. Controls are parsed only from the leading control segment. Combine
the single-use exact flags `--deep`, `--visual`, and `--advice` in any order;
an unknown or duplicate leading `--*` stops with usage and no action. `--` ends
controls, so literal flag content can start with `/hapo:brainstorm -- --dry-run`.

`--deep` raises non-direct analysis depth only. `--visual` changes presentation
and falls back to text. `--advice` uses the advisory brainstormer only after a
material choice exists. External visual/adviser context is minimized and
redacted first; neither overlay writes, approves, persists, dispatches, or
completes work. Chat is the default output. A durable file needs explicit user
authority, and no Brainstorm output is live proof or Specs/Develop approval or
execution authority.

### Adaptive Research and bounded Loop

Use `/hapo:research` when the result is a decision: Quick, Standard, or Deep
research binds material claims to a URL or repository anchor, authority,
date/version, applicability, and `confirmed`, `inferred`, or `unresolved`
state. Research returns evidence and tradeoffs; it does not implement the
recommendation or guarantee correctness.

Use `/hapo:loop` only by explicit request and only after its preflight freezes
Goal, isolated Scope, finite numeric Metric and Direction, reproducible
Baseline, distinct Guard, noise policy and minimum delta, budget, and stop
conditions. Each iteration stays in a detached worktree. The result is a
base-bound isolated patch handoff, never an automatic apply, commit, push, or
guarantee of improvement.

```text
/hapo:research Compare current local-first search libraries for this repository
/hapo:loop Goal="reduce parser latency" Scope="packages/parser" Metric="median ms, lower" Baseline="pinned base" Guard="npm test" Noise="MAD; minimum delta 2%" Budget="10 iterations" Stop="budget, drift, or failed guard"
$hapo-research Compare current local-first search libraries for this repository
$hapo-loop Goal="reduce parser latency" Scope="packages/parser" Metric="median ms, lower" Baseline="pinned base" Guard="npm test" Noise="MAD; minimum delta 2%" Budget="10 iterations" Stop="budget, drift, or failed guard"
```

Optional document skills are `docs`, `docx`, `pdf`, `pptx`, `xlsx`, and
`ai-multimodal`. Select them interactively or run:

```bash
npx @haposoft/cafekit --with-document-skills
```

Fresh non-interactive installs leave them out by default. Use
`--without-document-skills` to skip them or remove pristine CafeKit-owned
copies; user-modified files are preserved. Documentation validators, hooks,
and the `docs-keeper` agent remain part of the core runtime.

CafeKit uses rule-based skill routing guidance instead of an automatic prompt-scoring hook. See `.claude/rules/skill-workflow-routing.md`, `.claude/rules/skill-domain-routing.md`, or run:

```bash
node .claude/scripts/generate-skill-catalog.cjs --skills
```

Routing uses progressive disclosure: live catalog metadata selects a candidate,
the selected `SKILL.md` supplies its contract, and only relevant references are
loaded. Invoke an installed skill directly for explicit or obvious low-risk
work; use `hapo:route` only when classification or chaining is material. When a
capability or agent is absent, continue inline when safe or name the gap.
Hooks are not a skill router and never grant capability presence or authority. Source
and installed projections are verified; live-model adherence remains
`UNPROVEN`, not deterministic.

On Codex, invoke the transformed native skill names as `$hapo-<name>` or browse
them with `/skills`. Explicit custom-agent delegation uses snake_case agent
names and `fork_turns: "none"`.

## Quick Start

Claude Code:

```bash
/hapo:ask "Which files define the current CafeKit install/runtime behavior?" --repo
/hapo:scout "Find the runtime entrypoints for skill installation"
/hapo:brainstorm Explore approaches for a Google Meet transcript extension
/hapo:research Compare current transcript storage options for this repository
/hapo:specs Build a Google Meet transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test meet-transcript-mvp --full
/hapo:code-review meet-transcript-mvp --pending
```

Codex CLI:

```text
$hapo-ask "Which files define the current CafeKit runtime?" --repo
$hapo-scout "Find the runtime entrypoints for skill installation"
$hapo-brainstorm Explore approaches for a Google Meet transcript extension
$hapo-research Compare current transcript storage options for this repository
$hapo-specs Build a Google Meet transcript extension with AI summaries
$hapo-develop meet-transcript-mvp
$hapo-test meet-transcript-mvp --full
$hapo-code-review meet-transcript-mvp --pending
```

Reconstruct as-is docs from a legacy codebase:

```bash
/hapo:docs --reconstruct apps/legacy-admin
```

The reconstruct bundle includes as-is markdown/JSON evidence and a self-contained `overview.html` review dashboard before the approved docs are handed to `/hapo:specs`.

## Codex hook safety

Codex project hooks cover session/prompt/tool/subagent/stop lifecycle events,
spec and task guardrails, per-session state, and privacy blocking. Sensitive
access approval is one-time and bound to the session, tool, and exact canonical
path set. Hooks are guardrails rather than a complete security boundary:
hosted or specialized tools may not enter the local hook path.

## Spec Output

New process-first Specs packets are stored under:

```text
specs/<feature-name>/
├── plan.md
├── task-01-<slug>.md
└── task-NN-<slug>.md
```

The process-first workflow has three human decision gates. `hapo:specs` opens
C1 to fix scope before authoring and C2 to resolve adversarial findings, then
stops. A later explicit `hapo:develop` invocation executes the tasks and
presents C3 for closeout only after real execution proof. Each task has one
`Status:` field and keeps its canonical `## Receipt` inline, including the
exact Verification Plan command, `Exit: 0`, `Verification: PASS`,
runtime-derived Base and Head, and current command output.

Existing packets with `spec.json`, nested `tasks/task-R*.md`, or separate
receipts remain supported through the legacy compatibility adapter. New Specs
work does not author those legacy artifacts.

## Development

Run package self-tests:

```bash
npm test
```

## License

MIT
