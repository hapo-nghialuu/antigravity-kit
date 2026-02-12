# Google Antigravity AI IDE

> Agent-first AI IDE launched by Google in November 2025 alongside Gemini 3 model.

---

## What is Antigravity?

**Google Antigravity** is an **agent-first AI IDE** that treats AI as an autonomous workforce of specialized agents capable of planning, executing, and verifying complex development tasks with minimal supervision.

Built as a modified fork of **VS Code**, it maintains compatibility with existing extensions while fundamentally reimagining the development workflow around **asynchronous agent management** rather than line-by-line coding.

---

## Core Architecture: Agent-First Development

The IDE operates on a **Plan → Execute → Verify** loop across three integrated surfaces:

| Surface | Purpose |
|---------|---------|
| **Editor** | AI-powered coding environment with natural language commands |
| **Terminal** | Agents run commands, install dependencies, execute tests |
| **Browser** | Integrated Chrome automation for UI interaction, screenshots, verification |

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Mission Control / Agent Manager** | Dashboard to orchestrate multiple AI agents working in parallel across different workspaces |
| **Multi-Model Support** | Switch between **Gemini 3 Pro** (default), **Claude Sonnet 4.5**, and **GPT-OSS** |
| **Artifacts System** | Auto-generated deliverables: task lists, plans, code diffs, screenshots, browser recordings |
| **Autonomous Multi-Surface Operation** | Agents work across editor, terminal, and browser simultaneously |
| **Nano Banana Integration** | AI-generated UI assets and images directly within the editor |
| **Knowledge Base Learning** | System learns from every interaction to improve future performance |

---

## Skills & Workflows

### Skills (`@mention`)
Reusable knowledge packages that extend AI agent capabilities:
- Stored in `.agent/skills/<skill-name>/`
- Defined via `SKILL.md` with YAML frontmatter
- Invoked with `@skill-name`

### Workflows (`/command`)
High-level commands that guide agents through multi-step processes:
- Stored in `.agent/workflows/<workflow-name>.md`
- Orchestrate multiple skills together
- Executed with `/workflow-name`

See [antigravity-agent-skill-workflow.md](./antigravity-agent-skill-workflow.md) for detailed documentation.

---

## Competitive Comparison

| Tool | Focus | Key Difference |
|------|-------|---------------|
| **Google Antigravity** | Task-level execution via autonomous agents | Multi-agent orchestration, browser integration, completely free during preview |
| **Cursor** | AI-first code editing | Strong in-editor experience but lacks browser integration and true multi-agent parallelism |
| **GitHub Copilot** | Code suggestions/autocomplete | Assists with writing code but doesn't autonomously execute tasks |
| **Windsurf** | Collaborative AI flows | Strong all-in-one IDE but Antigravity offers more generous free usage |

---

## Availability & Pricing

| Attribute | Details |
|-----------|---------|
| **Current Status** | Public preview (launched November 2025) |
| **Cost** | **100% free** during public preview with generous rate limits |
| **Platforms** | macOS 12+, Windows 10 64-bit+, Linux (Ubuntu 20+, Debian 10+, Fedora 36+, RHEL 8+) |
| **Requirements** | Gmail account, Chrome browser, local installation |

---

## Target Use Cases

- **Feature Development**: Describe high-level goals in natural language; agents handle implementation
- **Automated Testing**: Agents perform E2E testing by interacting with browser UI directly
- **Parallel Workflows**: Run background research while focusing on foreground coding tasks
- **Debugging & Refactoring**: Self-directed error detection and correction across multiple files
- **Documentation**: Automatic generation of implementation plans and walkthrough reports

---

## Cross-Platform Compatibility

The skill system works across multiple AI coding tools:

| Tool | Project Path | Global Path |
|------|--------------|-------------|
| **Antigravity** | `.agent/skills/` | `~/.gemini/antigravity/skills/` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` |
| **Cursor** | `.cursor/skills/` | `~/.cursor/skills/` |
| **Windsurf** | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |
| **Trae** | `.trae/skills/` | `~/.trae/skills/` |

---

## Official Resources

- **Documentation**: https://antigravity.google/docs/skills
- **Skill Creator Assistant**: Built-in "Gary" assistant helps draft custom skills
- **VS Code Extensions**:
  - [AgentSkillsManager](https://github.com/lasoons/AgentSkillsManager) - Browse and install skills
  - [Skill Manager for Google Antigravity](https://marketplace.visualstudio.com/items?itemName=yxshee.skill-manager-antigravity)

---

## References

- [Google Antigravity: Agentic AI IDE Explained](https://webwallah.in/google-antigravity-agentic-ai-ide/)
- [Best AI IDE in January 2026: Antigravity Wins](https://tokencalculator.com/blog/best-ai-ide-january-2026-antigravity-wins)
- [Google Antigravity: 5 Key Features](https://zeabur.com/blogs/google-antigravity-agentic-ide-features)
- [GitHub - Spec-Kit-Antigravity-Skills](https://github.com/compnew2006/Spec-Kit-Antigravity-Skills)

---

*Last Updated: February 2026*
