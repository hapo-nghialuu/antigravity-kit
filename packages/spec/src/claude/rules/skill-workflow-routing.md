# Skill Workflow Routing

Use this rule instead of automatic prompt routing. Read the user's intent, choose the primary CafeKit workflow, then load the relevant `.claude/skills/<skill>/SKILL.md`.

Do not inject or force a skill when the user explicitly asks for a direct answer, a specific command, or a different workflow.

## Core Specification Workflow

```text
/hapo:question -> /hapo:brainstorm -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review -> /hapo:git
```

| User intent | Suggested start |
|---|---|
| ask about source code, docs, specs, config, dependencies, or external/current technical facts | `/hapo:question` |
| vague request, missing acceptance criteria, unclear scope, stakeholder questions | ask one clarification or use `/hapo:brainstorm` |
| unclear idea, possible approaches, scope tradeoffs | `/hapo:brainstorm` |
| create requirements, design, task breakdown, validate spec | `/hapo:specs` |
| implement an approved spec or a specific task file | `/hapo:develop` |
| run tests, QA, runtime verification | `/hapo:test` |
| review code quality, security, regressions, maintainability | `/hapo:code-review` |
| commit, tag, push, branch, release prep | `/hapo:git` |

## Bug And Incident Workflow

```text
/hapo:debug -> /hapo:hotfix -> /hapo:test -> /hapo:code-review
```

| User intent | Suggested start |
|---|---|
| diagnose why something fails, find root cause, inspect CI/logs | `/hapo:debug` |
| fix a known bug after diagnosis, urgent regression, production issue | `/hapo:hotfix` |
| verify the fix and affected behavior | `/hapo:test` |
| check side effects before closeout | `/hapo:code-review` |

`/hapo:debug` is diagnostic-only. Do not edit product code there. Use `/hapo:hotfix` when the user asks to fix.

## Existing System Documentation Workflow

```text
/hapo:inspect -> /hapo:docs --reconstruct -> human review -> /hapo:specs -> /hapo:develop
```

| User intent | Suggested start |
|---|---|
| understand source structure or locate implementation areas | `/hapo:inspect` |
| rebuild as-is docs/requirements from a legacy codebase | `/hapo:docs --reconstruct <scope>` |
| update normal project docs | `/hapo:docs --update` |
| initialize missing docs | `/hapo:docs --init` |
| summarize a codebase without full docs work | `/hapo:docs --summarize` |

Do not turn reconstructed docs directly into implementation. Human review must approve the as-is docs before `/hapo:specs` defines future changes.

## Research And Analysis Workflow

```text
/hapo:inspect -> /hapo:research
```

| User intent | Suggested start |
|---|---|
| file discovery, codebase structure, source scouting | `/hapo:inspect` |
| affected files, blast radius, dependency impact, side effects | `/hapo:inspect` |
| external best practices, tool comparison, technical investigation | `/hapo:research` |

Use `/hapo:research` for external knowledge. Use `/hapo:inspect` for local source truth.

## Delegation Workflow

| User intent | Suggested skill |
|---|---|
| assign/offload an implementation task to an external agent CLI (codex, grok) | `/hapo:delegate` |

Claude Code remains the orchestrator: it writes the task brief, dispatches, monitors, and independently verifies the returned work.

## Output Artifact Workflow

| User intent | Suggested skill |
|---|---|
| PowerPoint or slide deck creation/editing | `/hapo:pptx` |
| Word documents | `/hapo:docx` |
| PDF processing | `/hapo:pdf` |
| spreadsheets | `/hapo:xlsx` |
| screenshots, images, audio, video, OCR, multimodal understanding | `/hapo:ai-multimodal` |

## Selection Rules

- Pick one primary workflow first.
- Add a secondary skill only when it materially changes execution.
- Prefer explicit user commands over this table.
- If two workflows conflict, ask one concise clarification.
- If the user asks a factual or project question before workflow selection, use `/hapo:question`.
- If missing information blocks workflow selection, ask one concise clarification or use `/hapo:brainstorm`.
- If the user asks to "fix" and root cause is unknown, start with `/hapo:debug` unless the issue is trivial and local.
