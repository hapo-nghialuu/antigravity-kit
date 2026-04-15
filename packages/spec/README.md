# @haposoft/cafekit

> Claude Code-first spec-driven workflow and runtime bundle for AI coding assistants.

[![Version](https://img.shields.io/badge/version-0.7.23-blue.svg)](https://github.com/haposoft/cafekit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude%20Code](https://img.shields.io/badge/Claude%20Code-Primary-orange.svg)](https://claude.ai/code)

## Overview

CafeKit installs a structured workflow into Claude Code so the assistant can move cleanly from:

```text
Idea -> Spec -> Design -> Task Files -> Implementation -> Test -> Review
```

This package currently focuses on the Claude Code runtime:
- installs CafeKit skills under `.claude/skills/`
- installs supporting agents under `.claude/agents/`
- installs runtime hooks, statusline, and managed settings
- merges Claude settings safely on re-run

Antigravity remains in the repository as a legacy path, but Claude Code is the primary supported runtime for this release.

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
- Claude Code project with a `.claude/` directory, or choose Claude when prompted

## What Gets Installed

Claude Code install targets:

```text
.claude/
├── skills/
├── agents/
├── hooks/
├── status.cjs
├── runtime.json
├── settings.json
└── CLAUDE.md
```

Managed runtime features include:
- Claude Code statusline
- session and subagent hooks
- rule/context injection
- spec state awareness
- safe settings merge on reinstall

## Core Skills

CafeKit ships many skills, but the main release surface is:

- `/hapo:specs <feature-description>`: create or resume a structured spec workflow
- `/hapo:develop <feature-name>`: implement from approved spec artifacts
- `/hapo:test [scope|--full]`: run verification and return a structured verdict
- `/hapo:code-review [scope|--pending]`: adversarial review focused on correctness, regressions, and security
- `/hapo:generate-graph <diagram request>`: generate technical SVG/PNG diagrams

Common companion skills bundled in this package include `inspect`, `impact-analysis`, `research`, `ai-multimodal`, `frontend-development`, `backend-development`, and `react-best-practices`.

## Quick Start

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
- each task file to carry completion criteria and verification evidence

## Release Notes For 0.7.23

This release is centered on Claude Code:
- tightened `hapo:specs` state integrity and task finalization rules
- tightened `hapo:develop` definition-of-done and evidence-based quality gates
- bundled `hapo:generate-graph`
- cleaned Claude installer expectations so it no longer looks for removed Claude artifacts

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/guides/spec-workflow

## License

MIT © Haposoft
