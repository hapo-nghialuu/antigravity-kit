# Research Strategy

## Purpose

Provide tools and methods to gather necessary information before writing requirements and design. The goal is evidence-backed decision-making: use the current codebase and current external knowledge before locking requirements, architecture, and tasks.

## Skip Conditions

- Simple one-file task with no integration point → record skip rationale in `research.md`
- Internal text/docs-only change → record skip rationale in `research.md`
- User already provided recent research reports → use directly, but record what was reused

Skipping research does NOT mean skipping the evidence trail. Every non-trivial spec still needs an Evidence Summary in `research.md`.

## Evidence Gate Triggers

### Targeted Codebase Scout — Mandatory When

- The spec changes existing behavior rather than creating an isolated new artifact.
- The spec touches API routes, CLI commands, package exports, database schemas, migrations, auth/session, permissions, runtime config, hooks, generated artifacts, or settings.
- Requirements or tasks cannot name exact affected files, modules, tests, or contracts.
- The change may invalidate existing `.test.*`, `.spec.*`, e2e, build, or integration checks.
- The spec is being resumed or validated after the codebase may have changed.
- The work crosses monorepo, package source, installed runtime, docs site, or publish/install boundaries.

### External / Current Research — Mandatory When

- The spec depends on third-party APIs, libraries, SDKs, browser/platform policies, package manager behavior, cloud services, or external protocols.
- The spec touches security, auth, payment, privacy, delete-data, compliance, performance, accessibility, SEO, or current framework best practices.
- The spec involves AI providers, model behavior, agent tooling, browser automation, or fast-moving platform constraints.
- The user asks for "best", "optimal", "latest", "recommended", "current", "modern", or equivalent.
- Existing internal docs are stale, incomplete, or contradict package manifests/source code.

## 7 Research Tools

| # | Tool | Description | When to Use |
|---|---|---|---|
| 1 | **Researcher agents** (max 2) | Spawn in parallel, each investigates a different aspect | Complex tasks, need to explore multiple approaches |
| 2 | **Sequential thinking** | Step-by-step reasoning, avoids context overload | Multi-step logic analysis, tangled problems |
| 3 | **Docs seeker** | Look up framework/package docs from official sources | Need to understand external APIs/libraries, find best practices |
| 4 | **GitHub analysis** (`gh`) | Read action logs, PRs, issues, discussions | Need context from project history, understand past decisions |
| 5 | **Repomix remote** (`repomix --remote <url>`) | Generate codebase summary from remote repo | Reference how other repos solve similar problems. *(If not installed, use WebFetch as fallback)* |
| 6 | **Inspector agents** | Search for files across large codebases | Find relevant files faster than grep in large projects |
| 7 | **Debugger delegation** | Hand off to debugger agent for analysis | Investigate root cause of bugs |

## Workflow

### 1. Classify Evidence Needs
Before detailing requirements, list unanswered questions:
- Which technology is most suitable?
- Is there an existing pattern/library that solves this?
- How does the current codebase handle similar functionality?
- Are there technical risks that need verification?
- What evidence is needed from the repository?
- What evidence requires current external sources?

### 2. Run Targeted Codebase Scout
- Read project docs first, then verify claims against source files such as `package.json`, `go.mod`, schemas, routes, tests, and runtime config.
- Use inspector agents for large codebases or when multiple focused searches are needed.
- Save scout details to `reports/inspect-report.md` when inspector agents are used.
- Record the useful summary in `research.md`; do not dump raw search output.

### 3. Run External / Current Research
- Prefer official documentation, standards, release notes, package repositories, or maintained upstream examples.
- Use broader web search only when primary sources do not answer the question.
- Record links and explain why each source matters.
- If sources conflict, state which source wins and why.

### 4. Pick the Right Tool
- Framework/API questions → Docs seeker
- Current codebase questions → Inspector agents
- Architecture/approach questions → Researcher agents
- Complex multi-step reasoning → Sequential thinking
- Historical decision questions → GitHub analysis

### 5. Spawn Researchers (when needed)
- Max 2 agents running in parallel
- Each agent gets a specific aspect (e.g., agent 1 researches auth approach, agent 2 researches database schema)
- Limit each agent to max 5 tool calls
- Wait for all agents to complete before synthesizing

### 6. Synthesize Decisions
- Convert raw findings into decisions before writing requirements:
  - selected approach
  - rejected alternatives
  - codebase fit
  - external/current constraints
  - downstream task and test implications
- If evidence leaves multiple viable choices with no obvious winner, route to `/hapo:brainstorm` or ask the user for a decision.

### 7. Record Findings
- Write to `research.md` using template `templates/research.md`
- Save researcher reports to `reports/researcher-{NN}.md`
- Save inspector reports to `reports/inspect-report.md`

## Best Practices

- Breadth before depth
- Record findings before synthesizing
- Identify multiple approaches for comparison
- Consider edge cases during research
- Flag security concerns early
- Do not design from memory when repository or current external evidence can settle the decision
- Keep external research concise: source, finding, implication, decision
