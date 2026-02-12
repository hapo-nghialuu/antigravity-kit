# Antigravity: Agent, Skill & Workflow Documentation

> Complete guide to creating and using Agents, Skills, and Workflows in Google Antigravity IDE.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Agents](#agents)
3. [Skills](#skills)
4. [Workflows](#workflows)
5. [Best Practices](#best-practices)
6. [Cross-Platform Compatibility](#cross-platform-compatibility)

---

## Architecture Overview

Antigravity uses a **dual-mode architecture**:

| Component | Format | Purpose | Invocation |
|-----------|--------|---------|------------|
| **Skills** | `@skill` | Give the agent "know-how" for specific tasks | `@skill-name` |
| **Workflows** | `/command` | Chain multiple steps/skills together | `/workflow-name` |

### Agent Operation Loop

```
┌─────────┐    ┌──────────┐    ┌──────────┐
│  Plan   │ →  │ Execute  │ →  │ Verify   │
└─────────┘    └──────────┘    └──────────┘
      ↑                              │
      └──────────────────────────────┘
```

---

## Agents

### How Agents Work

Agents in Antigravity operate across **three surfaces**:

| Surface | Capabilities |
|---------|--------------|
| **Editor** | Write/suggest code, refactor, explain code, natural language commands |
| **Terminal** | Run shell commands, install dependencies, execute tests, manage git |
| **Browser** | Launch applications, interact with UI elements, take screenshots, verify functionality |

### Agent Skill Discovery (Progressive Disclosure)

1. **Discovery**: Agent sees available skill names/descriptions at conversation start
2. **Activation**: When relevant to the task, agent reads full `SKILL.md` content
3. **Execution**: Agent follows skill instructions while working

### Mission Control / Agent Manager

A unique dashboard that allows:
- Orchestrating multiple AI agents working in parallel
- Different workspaces (e.g., one agent researches APIs while another builds frontend)
- Monitoring agent progress and artifacts

---

## Skills

### What is a Skill?

Skills are **packaged agentic capabilities** that provide immediate context and "know-how" for specific tasks. Think of them as specialized SOPs (Standard Operating Procedures) that the AI can reference.

### Storage Locations

| Scope | Path |
|-------|------|
| Project-specific | `<workspace-root>/.agent/skills/<skill-name>/` |
| Global (all projects) | `~/.gemini/antigravity/skills/<skill-name>/` |

### Skill Directory Structure

```
.agent/skills/<skill-name>/
├── SKILL.md          # Required: Main instructions with YAML frontmatter
├── scripts/          # Optional: Helper scripts (Python, bash, etc.)
├── examples/         # Optional: Reference implementations
└── resources/        # Optional: Templates and assets
```

### SKILL.md Format

```markdown
---
name: seo-auditor                    # kebab-case identifier (optional)
description: Specialist for checking article SEO scores.
             Use when user needs SEO analysis or optimization.
---

# SEO Auditor Skill

## Role
You are an expert SEO consultant with 10 years of experience.

## When to Use
- Use this when the user asks to check SEO scores
- Use this when analyzing keyword distribution
- Use this when optimizing meta tags

## Instructions
Follow these steps exactly:

1. **Check Title Length**: Verify title is 50-60 characters
2. **Analyze Keywords**: Check if primary keyword appears in:
   - First 100 words
   - At least one H2 heading
   - Meta description
3. **Structure Check**: Ensure proper H2/H3 hierarchy exists
4. **Output Format**: Return results as JSON with score 0-100

## Guardrails (What NOT to do)
- Do not modify the original HTML tags
- Do not suggest black-hat SEO techniques
- Do not change the article's main topic/keywords
```

### Critical Requirements for SKILL.md

| Field | Description | Required |
|-------|-------------|----------|
| `name` | kebab-case identifier (e.g., `code-reviewer`) | Optional |
| `description` | Read by Orchestrator AI to decide when to invoke skill | **Required** |
| Instructions | Numbered steps, specific, actionable | **Required** |
| Guardrails | What the skill should NOT do | Recommended |

### Example Skills from Spec-Kit

| Skill | Purpose |
|-------|---------|
| `@speckit.constitution` | Project governance and rules |
| `@speckit.specify` | Generate EARS-format requirements |
| `@speckit.plan` | Create technical design plans |
| `@speckit.implement` | Implement specific tasks |
| `@speckit.reviewer` | Code review and quality checks |

### Using Skills

```
@seo-auditor Please analyze this blog post for SEO issues

@code-reviewer Check this Python file for security vulnerabilities

@speckit.plan Create a technical design for the authentication feature
```

---

## Workflows

### What is a Workflow?

Workflows are **high-level commands** that guide agents through multi-step processes. They orchestrate multiple skills or commands in sequence.

### Storage Location

```
.agent/workflows/<workflow-name>.md
```

### Workflow Format

```markdown
---
description: Deploy application to production environment
---

# Production Deployment Workflow

## Steps

1. Run unit tests
   // turbo

2. Build production package
   // turbo

3. Call @security-audit to scan for vulnerabilities

4. Push to production server

5. Send deployment notification to Slack
   // Use @slack-notifier skill
```

### Turbo Annotations

| Annotation | Behavior |
|------------|----------|
| `// turbo` | Step executes automatically without user confirmation |
| `// turbo-all` | Entire workflow runs autonomously |

### Advanced Workflow Example (Skill Stacking)

```markdown
---
description: New client onboarding automation
---

# Client Onboarding Workflow

1. **Welcome Phase**
   - @email-composer: Write personalized welcome email
   - @crm-updater: Add client to CRM with "Active" status

2. **Announcement Phase**
   - @linkedin-poster: Create announcement post (with permission)
   - @slack-notifier: Notify #sales channel

3. **Setup Phase**
   - Run: `mkdir -p clients/{client-name}`
   - @project-scaffolder: Create standard project structure
```

### Using Workflows

```
/deploy-production

/run-client-onboarding for ACME Corp

/00-speckit.all
```

### Spec-Kit Workflow Mapping

| Phase | Workflow Command | Skill Mention |
|-------|-----------------|---------------|
| Full Pipeline | `/00-speckit.all` | — |
| Governance | `/01-speckit.constitution` | `@speckit.constitution` |
| Feature Spec | `/02-speckit.specify` | `@speckit.specify` |
| Technical Plan | `/04-speckit.plan` | `@speckit.plan` |
| Implementation | `/07-speckit.implement` | `@speckit.implement` |
| Code Review | `/10-speckit.reviewer` | `@speckit.reviewer` |

---

## Best Practices

### Creating Skills

1. **Start with the Skill Creator**: Use Antigravity's built-in "Skill Creator" (Gary) to help draft:
   > "Gary, I want to create a skill called `code-reviewer` that checks for security vulnerabilities in Python code. Please help me create this skill."

2. **Keep skills focused**: One skill per specific task (avoid "do-everything" skills)

3. **Write clear descriptions**: The description determines whether the agent selects the skill

4. **Iterate from V1**: Don't aim for perfection. Create a working `v1.0`, test it, then refine.

5. **Include Guardrails**: Always specify what the skill should NOT do

6. **Use scripts as black boxes**: Encourage agents to run with `--help` rather than reading source

7. **Include decision trees**: For complex skills, help agents choose the right approach

### Storage Strategy

| Use Case | Location |
|----------|----------|
| Project-specific conventions | `.agent/skills/` |
| Personal universal utilities | `~/.gemini/antigravity/skills/` |
| Team standards | `.agent/skills/` (committed to repo) |

### Naming Conventions

- Use **kebab-case** for skill names: `seo-auditor`, not `Content Optimizer`
- The folder name must match how you'll invoke it
- The `name` field in YAML is optional but recommended

---

## Cross-Platform Compatibility

The skill system follows the universal **SKILL.md** format and works across multiple tools:

| Tool | Type | Project Path | Global Path |
|------|------|--------------|-------------|
| **Antigravity** | IDE | `.agent/skills/` | `~/.gemini/antigravity/skills/` |
| **Claude Code** | CLI | `.claude/skills/` | `~/.claude/skills/` |
| **Cursor** | IDE | `.cursor/skills/` | `~/.cursor/skills/` |
| **Windsurf** | IDE | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |
| **Trae** | IDE | `.trae/skills/` | `~/.trae/skills/` |
| **Gemini CLI** | CLI | `.gemini/skills/` | `~/.gemini/skills/` |

### Converting Between Platforms

To use the same skills with Claude Code:
```bash
mv .agent .claude
```

The structure and functionality remain identical.

---

## VS Code Extensions for Skill Management

| Extension | Purpose | Link |
|-----------|---------|------|
| **AgentSkillsManager** | Browse and install skills for multiple IDEs | [GitHub](https://github.com/lasoons/AgentSkillsManager) |
| **Skill Manager for Google Antigravity** | Manage skill repositories and installations | [Marketplace](https://marketplace.visualstudio.com/items?itemName=yxshee.skill-manager-antigravity) |

---

## Community Resources

| Resource | Description | Link |
|----------|-------------|------|
| **Spec-Kit-Antigravity-Skills** | Complete agentic skill system for SDLC | [GitHub](https://github.com/compnew2006/Spec-Kit-Antigravity-Skills) |
| **antigravity-skills** | Modular skill library for full-stack development | [GitHub](https://github.com/guanyang/antigravity-skills) |
| **antigravity-awesome-skills** | Community skill collection | [Playbooks](https://playbooks.com/skills/sickn33/antigravity-awesome-skills/agent-manager-skill) |

---

## Quick Reference

### File Structure Summary

```
project-root/
├── .agent/
│   ├── skills/
│   │   ├── my-skill/
│   │   │   └── SKILL.md
│   │   └── another-skill/
│   │       ├── SKILL.md
│   │       └── scripts/
│   └── workflows/
│       ├── deploy.md
│       └── onboarding.md
└── src/
    └── ...
```

### Command Summary

| Action | Syntax |
|--------|--------|
| Invoke skill | `@skill-name` |
| Run workflow | `/workflow-name` |
| Combined | `Run @skill-name with /workflow-name` |

---

*Last Updated: February 2026*
