# @haposoft/cafekit

> Claude Code-first spec-driven workflow and runtime bundle for AI coding assistants.

[![Version](https://img.shields.io/badge/version-0.8.16-blue.svg)](https://github.com/haposoft/cafekit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude%20Code](https://img.shields.io/badge/Claude%20Code-Primary-orange.svg)](https://claude.ai/code)

## Overview

CafeKit installs a structured workflow into Claude Code so the assistant can move cleanly from:

```text
Idea -> Brainstorm when unclear -> Spec -> Design -> Task Files -> Implementation -> Test -> Review
```

This package currently focuses on the Claude Code runtime:
- installs CafeKit skills under `.claude/skills/`
- installs supporting agents under `.claude/agents/`
- installs runtime hooks, statusline, and managed settings
- merges Claude settings safely on re-run

OpenCode install support installs command wrappers under `.opencode/commands/`, converted OpenCode agents under `.opencode/agents/`, root `AGENTS.md`, merged `opencode.json`, and CafeKit skills under `.claude/skills/` so OpenCode can read the Claude-compatible skill bundle. OpenCode command names intentionally omit the `hapo:` prefix.

## Install

Run in your project root:

```bash
npx @haposoft/cafekit
```

Refresh managed files:

```bash
npx @haposoft/cafekit --upgrade
```

Requirements:
- Node.js 18+
- Claude Code project with a `.claude/` directory, OpenCode project with `.opencode/` or `opencode.json`, or choose a runtime when prompted

## What Gets Installed

Claude Code install targets:

```text
.claude/
├── .gitignore
├── skills/
├── agents/
├── hooks/
├── cafekit.json
├── status.cjs
├── runtime.json
├── settings.json
└── CLAUDE.md
```

OpenCode install targets:

```text
.opencode/
├── commands/
├── agents/
└── cafekit.json

.claude/
├── .gitignore
├── skills/
├── rules/
├── scripts/
└── runtime.json

AGENTS.md
opencode.json
```

OpenCode setup also:
- binds generated commands to the matching CafeKit subagent with `agent` + `subtask`
- configures `permission.skill` and `permission.task` for CafeKit skills/subtasks
- optionally writes `model` to `opencode.json` from `OPENCODE_MODEL`, `OPENCODE_DEFAULT_MODEL`, or installer input

Managed runtime features include:
- Claude Code statusline
- session and subagent hooks
- rule/context injection
- spec state awareness
- safe settings merge on reinstall
- installed CafeKit version tracking in `.claude/cafekit.json` or `.opencode/cafekit.json`

To check the installed CafeKit package version:

```bash
cat .claude/cafekit.json
cat .opencode/cafekit.json
```

## Core Skills

CafeKit ships many skills, but the main release surface is:

- `/hapo:brainstorm <idea-or-problem>`: scout the repo, clarify exact requirements, compare approaches, and hand off to specs
- `/hapo:specs <feature-description>`: create or resume a structured spec workflow
- `/hapo:develop <feature-name>`: implement from approved spec artifacts
- `/hapo:debug <issue>`: diagnose bugs, incidents, CI failures, flaky tests, UI regressions, and performance issues before fixing
- `/hapo:hotfix <issue>`: fix diagnosed bugs with root-cause, verification, prevention, and side-effect gates
- `/hapo:docs [--init|--update|--summarize|--reconstruct]`: create project docs or reconstruct as-is system documentation from source code
- `/hapo:test [scope|--full]`: run verification and return a structured verdict
- `/hapo:code-review [scope|--pending]`: adversarial review focused on correctness, regressions, and security
- `/hapo:generate-graph <diagram request>`: generate technical SVG/PNG diagrams

Common companion skills bundled in this package include `inspect`, `impact-analysis`, `research`, `ai-multimodal`, `frontend-development`, `backend-development`, and `react-best-practices`.

CafeKit uses rule-based skill routing guidance instead of an automatic prompt-scoring hook. See `.claude/rules/skill-workflow-routing.md`, `.claude/rules/skill-domain-routing.md`, or run:

```bash
node .claude/scripts/generate-skill-catalog.cjs --skills
```

## Quick Start

OpenCode uses the generated command names without the Claude `hapo:` prefix:

```bash
/specs Build a Google Meet transcript extension with AI summaries
/develop meet-transcript-mvp
/test --full
```

For unclear ideas, brainstorm first:

```bash
/hapo:brainstorm Explore approaches for a Google Meet transcript extension
```

Create a new spec:

```bash
/hapo:specs Build a Google Meet transcript extension with AI summaries
```

Implement the whole feature:

```bash
/hapo:develop meet-transcript-mvp
```

Implement one specific task file:

```bash
/hapo:develop meet-transcript-mvp task-R0-02-extension-scaffold-dashboard-skeleton.md
```

Run tests and review:

```bash
/hapo:test --full
/hapo:code-review --pending
```

Generate a diagram:

```bash
/hapo:generate-graph Draw a sequence diagram for auth flow between browser, API, and database
```

Reconstruct current-state docs for an existing or legacy system:

```bash
/hapo:docs --reconstruct apps/legacy-admin
```

The reconstruct bundle includes as-is markdown/JSON evidence and a self-contained `overview.html` review dashboard before the approved docs are handed to `/hapo:specs`.

## Spec Artifacts

CafeKit's current spec workflow writes artifacts under:

```text
specs/<feature-name>/
├── spec.json
├── requirements.md
├── research.md
├── design.md
└── tasks/
    ├── task-R0-01-*.md
    ├── task-R1-01-*.md
    └── ...
```

The active workflow expects:
- `spec.json` to hold state, approvals, validation, and `task_files`
- design to define canonical contracts
- each task file to carry completion criteria and `Task Test Plan & Verification Evidence`

## Release Notes For 0.8.0

This release strengthens CafeKit's Claude Code workflow:
- added `hapo:brainstorm` as a scout-first pre-spec design workflow for unclear ideas
- tightened `hapo:specs` routing so unresolved architecture choices move through brainstorm first
- added task-level `Task Test Plan & Verification Evidence` guidance across specs, develop, test, review, and sync
- added skill self-tests for bundled Chrome DevTools and PDF scripts
- added `hapo:git finish` guidance for verified branch closeout
- simplified Claude runtime rules and added hook protocol guidance
- fixed web lint/build issues in the docs app

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/guides/spec-workflow

## License

MIT © Haposoft
