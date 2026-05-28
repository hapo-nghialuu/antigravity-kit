# @haposoft/cafekit

> Claude Code-first spec-driven workflow and runtime bundle for AI coding assistants.

[![Version](https://img.shields.io/badge/version-0.9.2-blue.svg)](https://github.com/haposoft/cafekit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude%20Code](https://img.shields.io/badge/Claude%20Code-Primary-orange.svg)](https://claude.ai/code)

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

OpenCode install support:
- installs command wrappers under `.opencode/commands/`
- installs converted OpenCode agents under `.opencode/agents/`
- installs CafeKit skills under `.opencode/skills/`
- installs OpenCode plugin runtime files under `.opencode/plugins/`
- merges `opencode.json` and root `AGENTS.md`
- omits the Claude `hapo:` command prefix

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
- Claude Code project with `.claude/`, OpenCode project with `.opencode/` or `opencode.json`, or choose a runtime when prompted

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
├── settings.json
└── CLAUDE.md
```

OpenCode targets:

```text
.opencode/
├── .gitignore
├── commands/
├── agents/
├── skills/
├── rules/
├── scripts/
├── references/
├── plugins/
├── cafekit.json
├── runtime.json
└── package.json

AGENTS.md
opencode.json
```

OpenCode setup also:
- binds generated commands to matching CafeKit subagents with `agent` + `subtask`
- configures `permission.skill` and `permission.task`
- optionally writes `model` to `opencode.json` from `OPENCODE_MODEL`, `OPENCODE_DEFAULT_MODEL`, or installer input

To check the installed CafeKit package version:

```bash
cat .claude/cafekit.json
cat .opencode/cafekit.json
```

## Core Skills

CafeKit ships many skills, but the main release surface is:

- `/hapo:question <question> [--repo|--web|--both|--brief|--deep]`: answer questions using repo evidence first, then external/current sources when local evidence is insufficient
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

Claude Code:

```bash
/hapo:question "Which files define the current CafeKit install/runtime behavior?" --repo
/hapo:brainstorm Explore approaches for a Google Meet transcript extension
/hapo:specs Build a Google Meet transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test meet-transcript-mvp --full
/hapo:code-review meet-transcript-mvp --pending
```

OpenCode uses the generated command names without the Claude `hapo:` prefix:

```bash
/question "Which files define the current CafeKit install/runtime behavior?" --repo
/brainstorm Explore approaches for a Google Meet transcript extension
/specs Build a Google Meet transcript extension with AI summaries
/develop meet-transcript-mvp
/test --full
/code-review --pending
```

Reconstruct as-is docs from a legacy codebase:

```bash
/hapo:docs --reconstruct apps/legacy-admin
```

The reconstruct bundle includes as-is markdown/JSON evidence and a self-contained `overview.html` review dashboard before the approved docs are handed to `/hapo:specs`.

## Spec Output

Specs are stored under:

```text
specs/<feature-name>/
├── spec.json
├── requirements.md
├── research.md
├── design.md
└── tasks/task-R*.md
```

## Development

Run package self-tests:

```bash
npm test
```

## License

MIT
