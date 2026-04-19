# Research Strategy

## Purpose

Provide tools and methods to gather necessary information before writing requirements and design. Prioritize breadth before depth.

## Skip Conditions

- Simple task, small scope → no research needed
- User already provided research reports → skip, use directly

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

### 1. Identify What Needs Research
Before detailing requirements, list unanswered questions:
- Which technology is most suitable?
- Is there an existing pattern/library that solves this?
- How does the current codebase handle similar functionality?
- Are there technical risks that need verification?

### 2. Pick the Right Tool
- Framework/API questions → Docs seeker
- Current codebase questions → Inspector agents
- Architecture/approach questions → Researcher agents
- Complex multi-step reasoning → Sequential thinking
- Historical decision questions → GitHub analysis

### 3. Spawn Researchers (when needed)
- Max 2 agents running in parallel
- Each agent gets a specific aspect (e.g., agent 1 researches auth approach, agent 2 researches database schema)
- Limit each agent to max 5 tool calls
- Wait for all agents to complete before synthesizing

### 4. Record Findings
- Write to `research.md` using template `templates/research.md`
- Save researcher reports to `reports/researcher-{NN}.md`
- Save inspector reports to `reports/inspect-report.md`

## Best Practices

- Breadth before depth
- Record findings before synthesizing
- Identify multiple approaches for comparison
- Consider edge cases during research
- Flag security concerns early
