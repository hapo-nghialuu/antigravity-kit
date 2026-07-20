# Skill Workflow Routing

Use this rule instead of automatic prompt routing. Read the user's intent, choose the primary CafeKit workflow, then load the relevant `.claude/skills/<skill>/SKILL.md`.

Do not inject or force a skill when the user explicitly asks for a direct answer, a specific command, or a different workflow.

Claude Code selects skills from frontmatter descriptions; trust it for clear intents.

## Core chain

```text
/hapo:question -> /hapo:brainstorm -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review -> /hapo:git
```

Bug path: `/hapo:debug -> /hapo:hotfix` then test/review. As-is docs: `/hapo:inspect` → `/hapo:docs --reconstruct <scope>` → human review → specs → develop. Delegate implementation to an external agent CLI: `/hapo:delegate`.

## Ambiguous cases

| Ambiguity | Prefer | Not when |
|---|---|---|
| debug-vs-hotfix | `/hapo:debug` first when root cause unknown | Root cause is known / trivial local fix → `/hapo:hotfix` |
| question-vs-research | `/hapo:question` to ask about source code, docs, specs, config, dependencies, or project facts | External best-practice comparison / multi-source investigation → `/hapo:research` |
| question-vs-brainstorm | `/hapo:question` for factual answers with evidence | Vague idea, missing acceptance criteria, unclear scope, multi-approach tradeoffs → `/hapo:brainstorm` |
| specs-vs-brainstorm | `/hapo:specs` when intent and acceptance are concrete enough | Unclear idea / architecture choices still open → `/hapo:brainstorm` first |
