# Skill Workflow Routing

Use this rule instead of automatic prompt routing. Read the user's intent, choose the primary CafeKit workflow, then load the relevant `.claude/skills/<skill>/SKILL.md`.

Do not inject or force a skill when the user explicitly asks for a direct answer, a specific command, or a different workflow.

Claude Code selects skills from frontmatter descriptions; trust it for clear intents.

## Core chain

```text
/hapo:ask -> /hapo:brainstorm -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review -> /hapo:git
```

Bug path: `/hapo:debug -> /hapo:fix` then test/review. As-is docs: `/hapo:scout` → `/hapo:docs --reconstruct <scope>` → human review → specs → develop. Delegate implementation to an external agent CLI: `/hapo:delegate`.

## Ambiguous cases

| Ambiguity | Prefer | Not when |
|---|---|---|
| debug-vs-hotfix | `/hapo:debug` first when root cause unknown | Root cause is known / trivial local fix → `/hapo:fix` |
| ask-vs-research | `/hapo:ask` to ask about source code, docs, specs, config, dependencies, or project facts | External best-practice comparison / multi-source investigation → `/hapo:research` |
| ask-vs-brainstorm | `/hapo:ask` for factual answers with evidence | Vague idea, missing acceptance criteria, unclear scope, multi-approach tradeoffs → `/hapo:brainstorm` |
| specs-vs-brainstorm | `/hapo:specs` when intent and acceptance are concrete enough | Unclear idea / architecture choices still open → `/hapo:brainstorm` first |
| develop-vs-loop | `/hapo:develop` for ordinary implementation from an accepted task | Only an explicit request with numeric Metric, reproducible Baseline, distinct immutable Guard, and bounded budget → `/hapo:loop`; never auto-route |
