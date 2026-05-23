# CafeKit 101 Seminar Draft

## Purpose

This document is the first draft for a CafeKit 101 seminar/workshop. It is designed as a practical introduction to CafeKit for developers who already understand Git and terminal-based development, but may not yet understand how Claude Code can be extended with skills, agents, hooks, and project runtime configuration.

Core message:

> CafeKit turns Claude Code from a general coding assistant into a spec-driven engineering workflow with scope control, task evidence, validation, testing, review, and git handoff.

## Audience

- Application developers using Claude Code or planning to adopt it.
- Tech leads who want AI coding workflows with traceability and review gates.
- AI engineering teams building internal Claude Code workflows.
- Developer productivity teams evaluating project-level AI assistant conventions.

## Prerequisites

- Basic command line usage.
- Basic Git workflow: clone, commit, push.
- Basic React/TypeScript familiarity for the demo project.
- Claude Code installed and logged in.
- Node.js 18+.

## Learning Outcomes

By the end of the session, participants should be able to:

- Explain the Claude Code primitives CafeKit builds on: `CLAUDE.md`, skills, agents/subagents, hooks, settings, and project files.
- Install CafeKit and identify the files it adds under `.claude/`.
- Run the core CafeKit workflow:
  - `/hapo:brainstorm`
  - `/hapo:specs`
  - `/hapo:specs <feature> --validate`
  - `/hapo:develop`
  - `/hapo:test`
  - `/hapo:code-review`
  - `/hapo:git`
- Read and evaluate a generated spec folder.
- Understand why artifact validation is different from implementation readiness.
- Recognize common failure modes: scope drift, reduced task templates, missing runtime reachability proof, stale session-state commits.

## Proposed Format

Recommended duration: 2.5-3 hours.

Alternative formats:

| Format | Duration | Best For |
|---|---:|---|
| Executive overview | 45-60 min | Product/engineering leaders |
| Technical seminar | 90 min | Developers evaluating CafeKit |
| Hands-on workshop | 2.5-3h | Teams adopting CafeKit |
| Internal enablement course | 2 sessions | Teams standardizing AI coding workflows |

## Course Structure

### Module 1: Why CafeKit Exists

Goal: Establish the problem.

Key points:

- AI coding can move fast but often skips scope clarification.
- Specs can become vague, inconsistent, or disconnected from implementation.
- Code may compile but still fail user intent or runtime reachability.
- Test and review often happen after scope drift has already entered the codebase.
- CafeKit makes Claude Code follow a repeatable engineering loop.

Recommended time: 15 minutes.

### Module 2: Claude Code Foundation

Goal: Explain the building blocks CafeKit relies on.

Key points:

- `CLAUDE.md` provides project memory and team-shared instructions.
- Skills add reusable workflows and can be invoked with slash commands.
- Agents/subagents provide role-specific assistants with separate context.
- Hooks automate checks and context injection around Claude Code lifecycle events.
- Settings configure project behavior, hooks, permissions, and runtime preferences.

Recommended time: 30 minutes.

### Module 3: What CafeKit Installs

Goal: Map CafeKit files to Claude Code concepts.

Key points:

- `.claude/skills/` contains CafeKit workflows.
- `.claude/agents/` contains specialist roles.
- `.claude/hooks/` contains runtime automation and guardrails.
- `.claude/rules/` and `.claude/references/` contain shared guidance.
- `.claude/scripts/` contains deterministic validators and utilities.
- `.claude/cafekit.json` tracks installed CafeKit version and install command.

Recommended time: 20 minutes.

### Module 4: The CafeKit Workflow

Goal: Show the end-to-end loop.

Core flow:

```text
Idea
  -> /hapo:brainstorm       # clarify when needed
  -> /hapo:specs            # create requirements/design/tasks
  -> /hapo:specs --validate # red-team + deterministic validation
  -> /hapo:develop          # implement from approved specs
  -> /hapo:test             # verify behavior and reachability
  -> /hapo:code-review      # spec compliance + code quality
  -> /hapo:git              # commit/push handoff
```

Recommended time: 20 minutes.

### Module 5: Live Demo

Goal: Demonstrate the workflow on a concrete project.

Demo project:

```text
customer-support-triage-dashboard
```

Feature prompt:

```text
Build a customer support triage dashboard that helps support agents prioritize tickets, filter work, inspect ticket details, and update ticket status
```

Recommended time: 45-60 minutes.

### Module 6: Hands-on Lab

Goal: Participants create and validate their own spec.

Recommended time: 45-60 minutes.

## Slide-by-Slide Draft

### Slide 1: CafeKit 101

Subtitle:

> Spec-driven AI coding workflow for Claude Code.

Speaker notes:

- Introduce CafeKit as a workflow layer, not a replacement for Claude Code.
- Set expectation: this session focuses on concepts and workflow, not every internal implementation detail.

Visual:

```text
Idea -> Spec -> Develop -> Test -> Review -> Git
```

### Slide 2: The Problem With Unstructured AI Coding

Content:

- AI can write code before understanding scope.
- Requirements can disappear during implementation.
- Tests may not match the original user problem.
- Reviews often catch quality issues but not spec drift.

Speaker notes:

- Use examples: added pagination when not asked, built a UI component but never mounted it, forgot mobile flow.

Visual:

```text
Prompt -> Code -> Surprise
```

### Slide 3: The CafeKit Answer

Content:

- Scope first.
- Spec artifacts before code.
- Task evidence before completion.
- Validation before implementation.
- Review against the spec, not just code style.

Visual:

```text
Prompt
  -> scope_lock
  -> requirements/design/tasks
  -> validator
  -> implementation
  -> test/review
```

### Slide 4: What We Will Build Today

Content:

- Customer support triage dashboard.
- Ticket list.
- Priority/status badges.
- Filters.
- Detail view.
- Status update.
- Responsive UI.

Visual:

Simple wireframe:

```text
+------------------------------------------------+
| Header                                         |
+-------------+-------------------+--------------+
| Filters     | Ticket List        | Detail       |
| Status      | Priority / Status  | Conversation |
| Priority    | Sort / Count       | Status Edit  |
+-------------+-------------------+--------------+
```

### Slide 5: Claude Code Foundation

Content:

CafeKit uses Claude Code primitives:

- Memory: `CLAUDE.md`
- Skills: `.claude/skills/*/SKILL.md`
- Agents: `.claude/agents/*.md`
- Hooks: `.claude/hooks/*.cjs`
- Settings: `.claude/settings.json`
- Scripts: `.claude/scripts/*.cjs`

Speaker notes:

- CafeKit is a project-level Claude Code runtime bundle.
- Most CafeKit behavior comes from these primitives working together.

### Slide 6: Claude Code Mental Model

Content:

Claude Code works as an agentic coding loop:

```text
User request
  -> project context
  -> selected instructions/skills
  -> tool actions
  -> file edits / commands
  -> user-visible result
```

CafeKit adds:

- Workflow instructions.
- Specialist agents.
- Hook-based guardrails.
- Deterministic validation scripts.

### Slide 7: CLAUDE.md / Project Memory

Content:

- Shared project instructions.
- Architecture and coding standards.
- Required workflow rules.
- Common commands and conventions.

CafeKit usage:

- Adds project-level guidance.
- Explains the CafeKit workflow.
- Keeps AI behavior consistent across sessions.

Demo:

Open:

```text
CLAUDE.md
```

### Slide 8: Skills

Content:

Skills are reusable instructions stored as:

```text
.claude/skills/<skill-name>/SKILL.md
```

They can:

- Create slash commands.
- Load only when relevant.
- Include references, scripts, and templates.
- Define workflow behavior.

CafeKit examples:

- `hapo:specs`
- `hapo:develop`
- `hapo:test`
- `hapo:code-review`
- `hapo:debug`

Demo:

Open:

```text
.claude/skills/specs/SKILL.md
```

### Slide 9: Skills vs Prompt Snippets

Content:

Prompt snippet:

- Manual copy/paste.
- Easy to drift.
- Hard to share.

Skill:

- Versioned.
- Project-local.
- Discoverable.
- Can have references/scripts/templates.

Key message:

> Skills turn repeated prompting into a maintained workflow.

### Slide 10: Agents / Subagents

Content:

Agents are specialized assistants with their own instructions and context.

CafeKit uses them for:

- Spec creation.
- Development.
- Testing.
- Code review.
- Debugging.
- Git operations.

Examples:

```text
.claude/agents/spec-maker.md
.claude/agents/test-runner.md
.claude/agents/code-auditor.md
.claude/agents/debugger.md
.claude/agents/git-ops.md
```

Speaker notes:

- The main agent should not do every role in one context.
- Specialists improve focus and preserve context.

### Slide 11: Hooks

Content:

Hooks run around Claude Code lifecycle events.

Common events:

- `SessionStart`
- `UserPromptSubmit`
- `PreToolUse`
- `PostToolUse`
- `Stop`
- `SubagentStart`
- `SubagentStop`

CafeKit uses hooks for:

- Rule injection.
- State tracking.
- Docs sync.
- Privacy checks.
- Spec state awareness.
- Statusline context.

Demo:

Open:

```text
.claude/settings.json
.claude/hooks/
```

### Slide 12: Hooks as Guardrails

Content:

Skills tell Claude what to do.

Hooks help enforce when/how things happen.

Examples:

- Block risky file access.
- Add current spec state into context.
- Track subagent lifecycle.
- Prevent stale runtime assumptions.

Key message:

> Prompts guide behavior; hooks make parts of the workflow deterministic.

### Slide 13: CafeKit Installation

Command:

```bash
npx @haposoft/cafekit@0.8.11
```

What it installs:

```text
.claude/
├── .gitignore
├── agents/
├── hooks/
├── references/
├── rules/
├── scripts/
├── skills/
├── cafekit.json
├── runtime.json
├── settings.json
└── status.cjs
```

### Slide 14: Version Tracking

Content:

CafeKit writes:

```text
.claude/cafekit.json
```

Example:

```json
{
  "packageName": "@haposoft/cafekit",
  "version": "0.8.11",
  "platform": "claude",
  "installCommand": "npx @haposoft/cafekit@0.8.11"
}
```

Why it matters:

- Reproducible demos.
- Debugging version-specific behavior.
- Clear audit trail in sample projects.

### Slide 15: Main CafeKit Skills

Content:

| Skill | Purpose |
|---|---|
| `hapo:brainstorm` | Explore unclear ideas before specs |
| `hapo:specs` | Create requirements, design, tasks |
| `hapo:develop` | Implement from approved specs |
| `hapo:test` | Verify against spec/task evidence |
| `hapo:code-review` | Review spec compliance and code quality |
| `hapo:debug` | Evidence-first diagnosis |
| `hapo:hotfix` | Controlled urgent fix workflow |
| `hapo:git` | Commit/push handoff |

### Slide 16: The Spec Folder

Output shape:

```text
specs/<feature>/
├── spec.json
├── requirements.md
├── research.md
├── design.md
└── tasks/
    ├── task-R1-01-project-setup.md
    ├── task-R1-02-types-constants.md
    └── ...
```

Speaker notes:

- These artifacts become the source of truth for downstream develop/test/review.

### Slide 17: spec.json

Content:

`spec.json` stores machine-readable state:

- `scope_lock`
- approvals
- progress
- task files
- task registry
- validation state
- readiness state

Important distinction:

```text
validator PASS != ready_for_implementation
```

For complex specs:

- Artifact shape must pass.
- Red Team + Validate must complete.
- `ready_for_implementation` must become true.

### Slide 18: requirements.md

Content:

Requirements should be:

- Singular.
- Unambiguous.
- Testable.
- Traceable to tasks.

Example:

```text
R2: Ticket Filtering
- The system shall filter tickets by status.
- The system shall filter tickets by priority.
- The system shall combine filters.
```

### Slide 19: research.md

Content:

Research records why decisions were made.

Examples:

- Tech stack selected.
- Codebase scout result.
- External research or skip rationale.
- Rejected alternatives.
- Downstream test implications.

Key message:

> Research prevents design-from-memory.

### Slide 20: design.md

Content:

Design clarifies:

- Architecture.
- State model.
- Components.
- Data schema.
- Runtime entrypoints.
- Visual/responsive behavior.

Demo:

Open `design.md` and show:

- Component hierarchy.
- Data model.
- State flow.

### Slide 21: Task Anatomy

Every task should contain:

- `Context`
- `Constraints`
- `Steps`
- `Requirements`
- `Related Files`
- `Completion Criteria`
- `Evidence`
- `Risk Assessment`

Speaker notes:

- This is the key improvement after v0.8.11.
- Reduced task shapes are rejected by validator.

### Slide 22: Evidence

Content:

Evidence answers:

> How do we know this task is actually done?

Evidence types:

- Unit test.
- Component/integration test.
- E2E/UI flow.
- Visual responsive check.
- Accessibility check.
- Build/typecheck.
- Runtime reachability proof.
- Negative-path proof.

### Slide 23: Runtime Reachability

Content:

Common AI failure:

> It created the component but never mounted it.

CafeKit requires:

- Entrypoint/caller.
- Import/mount/registration proof.
- Route/manifest/runtime connection.

Example:

```text
Entrypoint/caller: src/App.tsx
Expect: TicketList is mounted on the dashboard route
```

### Slide 24: Deterministic Validator

Command:

```bash
node .claude/scripts/validate-spec-output.cjs specs/customer-support-triage-dashboard
```

Checks include:

- Forbidden artifacts absent.
- `spec.json` exists.
- `task_files` matches disk.
- `task_registry` matches disk.
- Task filenames follow CafeKit convention.
- Task sections exist.
- Runtime reachability evidence exists.

### Slide 25: Red Team + Validate

For specs with 5+ tasks:

```text
validator PASS
  -> Red Team
  -> Validate
  -> physical fixes
  -> validator PASS again
  -> validation.status = completed
  -> ready_for_implementation = true
```

Key message:

> Validator checks shape. Red Team checks judgment.

### Slide 26: Demo Part 1 — Install

Commands:

```bash
mkdir triage-dashboard
cd triage-dashboard
npx @haposoft/cafekit@0.8.11
claude
```

Show:

```bash
cat .claude/cafekit.json
```

### Slide 27: Demo Part 2 — Create Spec

Command:

```text
/hapo:specs Build a customer support triage dashboard that helps support agents prioritize tickets, filter work, inspect ticket details, and update ticket status
```

Show:

- Scope questions.
- Generated files.
- Task files.

### Slide 28: Demo Part 3 — Validate

Command:

```text
/hapo:specs customer-support-triage-dashboard --validate
```

Show:

- Validator output.
- Red Team findings.
- How fixes update task files.
- `spec.json` state after validation.

### Slide 29: Demo Part 4 — Develop

Command:

```text
/hapo:develop customer-support-triage-dashboard
```

Show:

- Develop reads spec/task.
- Scouts source per task.
- Implements only scoped behavior.
- Uses task evidence to verify done.

### Slide 30: Demo Part 5 — Test

Command:

```text
/hapo:test customer-support-triage-dashboard
```

Explain:

- Unit tests for logic.
- Component/integration tests for UI/state.
- E2E/UI flow for full workflows.
- Visual/responsive checks when layout changes.
- Accessibility checks when keyboard/focus/labels matter.

### Slide 31: Demo Part 6 — Code Review

Command:

```text
/hapo:code-review --pending
```

Review layers:

1. Spec compliance.
2. Runtime reachability.
3. Code quality.
4. Security/performance risks.
5. Missing tests.

### Slide 32: Demo Part 7 — Git

Command:

```text
/hapo:git
```

Or manual:

```bash
git status
git add ...
git commit -m "feat: implement triage dashboard"
git push
```

Show:

- `.claude/.gitignore`
- Avoid `session-state` commits.
- Keep commits scoped.

### Slide 33: Common Failure Modes

| Failure | Symptom | CafeKit Guardrail |
|---|---|---|
| Reduced task template | Missing Context/Evidence/Risk | Validator fails |
| Scope drift | Extra feature appears | `scope_lock` + review |
| Orphaned component | Created but not mounted | Runtime reachability proof |
| Fake readiness | Validator pass but not validated | `ready_for_implementation` gate |
| Session noise | `.claude/session-state` committed | `.claude/.gitignore` |

### Slide 34: When To Use CafeKit

Use CafeKit for:

- New feature with multiple tasks.
- UI workflow with state and routes.
- Backend/API changes.
- Debugging with uncertain root cause.
- Refactor with blast radius.
- Release/publish workflows.

Do not overuse for:

- Tiny typo.
- One-line copy change.
- Emergency manual patch.

### Slide 35: Hands-on Lab

Lab feature options:

1. Meeting transcript summarizer.
2. Admin user table with filters.
3. Markdown note organizer.
4. Lightweight expense tracker.
5. Customer support triage dashboard.

Lab steps:

```text
1. Install CafeKit
2. Run /hapo:specs <idea>
3. Inspect spec artifacts
4. Run /hapo:specs <feature> --validate
5. Fix issues until pass
6. Start /hapo:develop <feature>
```

### Slide 36: Adoption Plan

Recommended team rollout:

1. Start with `hapo:specs` for new features.
2. Add `--validate` before implementation.
3. Require task evidence for complex work.
4. Add `hapo:test` before PRs.
5. Add `hapo:code-review` as a review assistant.
6. Customize rules/agents/hooks only after the team understands defaults.

### Slide 37: Closing

Final message:

> CafeKit is Claude Code with engineering discipline: scope, specs, tasks, evidence, validation, implementation, test, review, and git.

## Live Demo Script

### Setup

```bash
mkdir -p ~/Desktop/cafekit-demo/triage-dashboard
cd ~/Desktop/cafekit-demo/triage-dashboard
npx @haposoft/cafekit@0.8.11
claude
```

### Create Spec

```text
/hapo:specs Build a customer support triage dashboard that helps support agents prioritize tickets, filter work, inspect ticket details, and update ticket status
```

Pause and inspect:

```bash
find specs/customer-support-triage-dashboard -maxdepth 2 -type f | sort
cat .claude/cafekit.json
```

### Validate

```text
/hapo:specs customer-support-triage-dashboard --validate
```

Inspect:

```bash
node .claude/scripts/validate-spec-output.cjs specs/customer-support-triage-dashboard
cat specs/customer-support-triage-dashboard/spec.json
```

### Develop

Only run after `ready_for_implementation = true`.

```text
/hapo:develop customer-support-triage-dashboard
```

### Test

```text
/hapo:test customer-support-triage-dashboard
```

### Review

```text
/hapo:code-review --pending
```

### Git

```text
/hapo:git
```

## Facilitator Notes

### Do Not Over-Demo

Recommended live sections:

- Install.
- Specs.
- Validate.
- Read task anatomy.

Use pre-created checkpoints for:

- Full develop.
- Full test.
- Full review.

### Suggested Checkpoints

Create branches/tags before the seminar:

```text
demo-00-empty
demo-01-installed
demo-02-specs-generated
demo-03-specs-validated
demo-04-developed
demo-05-tested-reviewed
```

### Backup Plan

Prepare:

- Terminal log screenshots.
- Generated spec folder.
- Short screen recording of validation.
- Final working app screenshot.

## Hands-on Exercise Details

### Exercise 1: Inspect CafeKit Runtime

Goal:

Understand what CafeKit installed.

Commands:

```bash
find .claude -maxdepth 2 -type f | sort | sed -n '1,120p'
cat .claude/cafekit.json
```

Questions:

- Which files are skills?
- Which files are agents?
- Which scripts are deterministic checks?

### Exercise 2: Generate a Spec

Prompt:

```text
/hapo:specs Build a simple expense tracker that lets users add expenses, categorize them, filter by category, and see monthly totals
```

Tasks:

- Open `requirements.md`.
- Open `design.md`.
- Open one task file.
- Identify `Context`, `Constraints`, `Evidence`, and `Risk Assessment`.

### Exercise 3: Validate a Spec

Command:

```text
/hapo:specs expense-tracker --validate
```

Tasks:

- Record validator result.
- Record red-team findings.
- Confirm physical task files changed after accepted fixes.

### Exercise 4: Readiness Check

Open:

```text
specs/<feature>/spec.json
```

Confirm:

- `validation.status = completed`
- `ready_for_implementation = true`
- `task_files` matches disk.
- `task_registry` matches disk.

## Reference Links

- Claude Code skills: https://code.claude.com/docs/en/skills
- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
- Claude Code memory: https://docs.anthropic.com/en/docs/claude-code/memory
- Claude Code settings: https://docs.anthropic.com/en/docs/claude-code/settings
- Claude Code slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands

## Open Questions

- Seminar duration: 90 minutes or 3-hour hands-on workshop?
- Audience level: Claude Code beginners or experienced users?
- Should the demo use only Claude Code, or also show GitHub PR workflow?
- Should the final output be a slide deck, a workshop handout, or both?
- Should we include a recorded demo fallback?
