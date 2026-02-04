# Multi-Platform Support: Claude Code CLI vs Google Antigravity

> **Project:** CafeKit
> **Original Purpose:** Agent definition tool for **[Google Antigravity](https://antigravity.google/)** (AI coding editor)
> **Current Status:** Multi-platform support for both **[Claude Code](https://claude.ai/code)** (Anthropic) AND **[Antigravity](https://antigravity.google/)** (Google)
> **Target Users:** AI coding assistant users across platforms

---

## 📋 Platform Overview

| Aspect | Claude Code CLI | Google Antigravity |
|--------|-----------------|-------------------|
| **Directory** | `.claude/` | `.agent/` |
| **Platform** | [Anthropic Claude Code](https://claude.ai/code) | [Google Antigravity Editor](https://antigravity.google/) |
| **Status** | ✅ Active/Primary | ⚠️ Legacy/Original |
| **Agents** | 20 agents | 20 agents |
| **Skills** | 39 skills | 38 skills |
| **Commands** | 17 commands | 17 workflows |
| **Format** | Claude Code plugin format | Antigravity format |

## 🌐 Platform Compatibility Matrix

| Feature | Claude Code | Antigravity | Notes |
|---------|-------------|-------------|-------|
| **Agents** | ✅ 20 | ✅ 20 | Same agent definitions |
| **Skills** | ✅ 39 | ✅ 38 | +1 skill in Claude format |
| **Slash Commands** | ✅ 17 | ✅ 17 | Same workflows |
| **YAML Frontmatter** | ✅ Required | ❌ No | Claude requires metadata |
| **Auto-discovery** | ✅ Automatic | ⚠️ Manual | Claude scans frontmatter |
| **Plugin System** | ✅ Yes | ❌ No | Claude has marketplace |
| **Hooks** | ✅ PostToolUse | ❌ No | Auto-validation |
| **Auto-validation** | ✅ Hooks-triggered | ❌ Manual | Run scripts explicitly |
| **Progressive Loading** | ✅ On-demand | ❌ Load all | Efficient context use |
| **AskUserQuestion Tool** | ✅ Structured | ❌ Text-based | Better UX |
| **Multi-platform Support** | ✅ Yes | ✅ Yes | Use either platform |

---

## 🏗️ Cấu trúc Thư mục

### `.agent/` - Google Antigravity (Legacy)

```
.agent/
├── ARCHITECTURE.md          # Architecture docs
├── agents/                  # 20 Specialist Agents
│   ├── orchestrator.md
│   ├── frontend-specialist.md
│   └── ... (18 more)
├── skills/                  # 38 Skills
│   ├── nextjs-react-expert/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── references/
│   └── ... (37 more)
├── workflows/               # 17 Slash Commands
│   ├── brainstorm.md
│   ├── create.md
│   └── ... (15 more)
├── rules/                   # Global Rules
├── scripts/                 # Master Validation Scripts
│   ├── checklist.py
│   └── verify_all.py
└── .shared/                 # Shared data (ui-ux-pro-max)
```

### `.claude/` - Claude Code CLI (Primary)

```
.claude/
├── .claude-plugin/
│   └── plugin.json          # ❌ TODO: Plugin manifest
├── agents/                  # 20 Specialist Agents
│   ├── orchestrator.md
│   ├── frontend-specialist.md
│   └── ... (18 more)
├── skills/                  # 39 Skills (includes slash commands as skills)
│   ├── nextjs-react-expert/
│   │   └── SKILL.md
│   ├── brainstorm/          # Slash command as skill
│   │   └── SKILL.md
│   └── ... (37 more)
├── commands/                # 17 Slash Commands
│   ├── brainstorm.md        # User-invocable commands
│   ├── create.md
│   └── ... (15 more)
├── hooks/
│   └── hooks.json           # PostToolUse hooks
└── scripts/                 # Utility scripts
    ├── validate_dispatcher.py
    └── session_manager.py
```

---

## 🔑 Sự Khác biệt Chính

### 1. **File Format & Frontmatter**

#### **Google Antigravity** (`.agent/`)

**Agent format:**
```markdown
# Agent Name

## Purpose
[Description]

## Skills
- skill-1
- skill-2

## Tools
- tool-1
- tool-2

## Instructions
[Prompt content]
```

**Skill format:**
```markdown
# Skill Name

## Description
[What this skill does]

## When to Use
[Triggers]

## Content
[Knowledge content]
```

**Workflow format:**
```markdown
# /command - Title

## Purpose
[What it does]

## Task
[Steps]

## Usage Examples
[Examples]
```

#### **Claude Code CLI** (`.claude/`)

**Agent format (YAML frontmatter):**
```yaml
---
name: frontend-specialist
description: Expert React/Next.js architect
tools: Read, Write, Edit, Bash, Grep, Glob
model: inherit
skills: nextjs-react-expert, frontend-design
---

# System Prompt Content
[Prompt instructions]
```

**Skill format (YAML frontmatter):**
```yaml
---
name: nextjs-react-expert
description: React/Next.js performance optimization
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
disable-model-invocation: false
user-invocable: true
---

# Skill Content
[Knowledge content]
```

**Command format (YAML frontmatter):**
```yaml
---
name: brainstorm
description: Structured brainstorming for projects
allowed-tools: Read, Grep
argument-hint: [topic]
---

# /brainstorm - Structured Idea Exploration

$ARGUMENTS

[Command instructions]
```

---

### 2. **Slash Commands vs Skills**

#### **Google Antigravity**
- **Workflows:** `.agent/workflows/*.md` - Slash command procedures
- **Format:** Markdown files without frontmatter
- **Invocation:** `/command`

#### **Claude Code CLI**
- **Commands:** `.claude/commands/*.md` - User-invocable slash commands (legacy)
- **Skills:** `.claude/skills/*/SKILL.md` - Modern approach (can also be user-invocable)
- **Format:** YAML frontmatter + markdown body
- **Invocation:** `/command` hoặc auto-invoke by Claude
- **Frontmatter required:** `name` field for slash command registration

**Example:**
```
Google Antigravity: .agent/workflows/brainstorm.md
Claude Code CLI:    .claude/commands/brainstorm.md (user-invocable)
                    .claude/skills/brainstorm/SKILL.md (skill version)
```

---

### 3. **Plugin System**

#### **Google Antigravity**
- **No plugin system** - Agents/skills loaded directly by Antigravity Editor
- **No manifest file** needed
- **Integration:** Native to Google Antigravity

#### **Claude Code CLI**
- **Plugin system** - Must have `.claude-plugin/plugin.json` to be distributed
- **Manifest required** for marketplace
- **Installation:** `/plugin install cafekit`
- **Hooks:** Support for PreToolUse, PostToolUse, etc.

**Missing file (TODO):**
```json
// .claude/.claude-plugin/plugin.json
{
  "name": "cafekit",
  "description": "Comprehensive Claude Code plugin",
  "version": "1.0.0",
  "author": {
    "name": "Hapo Nghia Luu",
    "email": "nghialt@haposoft.com"
  }
}
```

---

### 4. **Validation Scripts**

#### **Google Antigravity** (`.agent/scripts/`)

**Master scripts:**
- `checklist.py` - Priority-based validation (development, pre-commit)
- `verify_all.py` - Comprehensive verification (pre-deployment)

**Usage:**
```bash
python .agent/scripts/checklist.py .
python .agent/scripts/verify_all.py . --url http://localhost:3000
```

**Skill-level scripts:**
- Located in `.agent/skills/*/scripts/`
- Called by master scripts
- 18+ validators total

#### **Claude Code CLI** (`.claude/scripts/`)

**Dispatcher:**
- `validate_dispatcher.py` - Routes validation to appropriate skill scripts

**Usage:**
```bash
python .claude/scripts/validate_dispatcher.py --file <path> --tool edit
```

**Hooks integration:**
```json
// .claude/hooks/hooks.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/scripts/validate_dispatcher.py --file \"$FILE\""
          }
        ]
      }
    ]
  }
}
```

**Key difference:** Claude Code runs validators automatically via hooks after Edit/Write.

---

### 5. **Agent Discovery**

#### **Google Antigravity**
- **Manual loading:** Antigravity Editor reads `.agent/agents/*.md`
- **No auto-discovery**
- **Explicit invocation**

#### **Claude Code CLI**
- **Auto-discovery:** Claude Code scans `.claude/agents/*.md` frontmatter
- **Intelligent routing:** Based on `description` field
- **Auto-selection:** Claude chooses agent based on task keywords

**Example:**
```yaml
# .claude/agents/mobile-developer.md
---
description: Expert in React Native and Flutter mobile development. Use for cross-platform mobile apps...
---
```

When user says "build mobile app" → Claude auto-selects `mobile-developer`.

---

### 6. **Skills Organization**

#### **Google Antigravity**
- **38 skills** in `.agent/skills/`
- Skills are pure knowledge modules
- No user-invocable skills

#### **Claude Code CLI**
- **39 skills** in `.claude/skills/`
- Includes 11 slash commands converted to skills (e.g., `brainstorm/`, `create/`)
- Skills can be:
  - **Auto-invoked** by Claude (`disable-model-invocation: false`)
  - **User-invocable** via `/menu` (`user-invocable: true`)

**Dual format example:**
```
.claude/commands/brainstorm.md      → Slash command (legacy, user-invocable)
.claude/skills/brainstorm/SKILL.md  → Skill version (knowledge module)
```

---

## 📊 Feature Comparison

| Feature | Claude Code CLI | Google Antigravity |
|---------|-----------------|-------------------|
| **Agents** | ✅ 20 agents | ✅ 20 agents |
| **Skills** | ✅ 39 skills (+ 11 command skills) | ✅ 38 skills |
| **Slash Commands** | ✅ 17 commands | ✅ 17 workflows |
| **YAML Frontmatter** | ✅ Required | ❌ No |
| **Auto-discovery** | ✅ Automatic | ❌ Manual |
| **Plugin System** | ✅ Yes (TODO: manifest) | ❌ No |
| **Hooks** | ✅ PostToolUse, PreToolUse | ❌ No |
| **Auto-validation** | ✅ Hooks-triggered | ❌ Manual |
| **Progressive Loading** | ✅ On-demand | ❌ Load all |
| **Marketplace** | ✅ Yes (after plugin.json) | ❌ No |
| **AskUserQuestion Tool** | ✅ Structured tool | ❌ Text-based |
| **Multi-platform Support** | ✅ Yes | ✅ Yes |

---

## 🔄 Migration Status

### ✅ Completed

1. **Agents:** All 20 agents migrated with YAML frontmatter
2. **Skills:** All 38 skills migrated + 1 new skill (spec-driven-development)
3. **Commands:** All 17 workflows → commands with `name` field
4. **AskUserQuestion Integration:** 10 files updated (3 phases)
5. **Spec Commands:** 6 commands updated with frontmatter

### ⏳ Pending (TODO)

1. **Plugin Manifest:** Create `.claude/.claude-plugin/plugin.json`
2. **Hooks Enhancement:** Wire up all validators
3. **Commands → Skills Migration:** Consider migrating commands to modern skill format
4. **MCP/LSP:** Add external integrations (optional)
5. **Documentation:** Update README with both systems

---

## 🎯 Recommended Usage

### **Platform Detection (Automatic)**

CafeKit automatically detects your AI coding assistant platform:

```bash
# Install CafeKit (works on both platforms)
npx @haposoft/cafekit-spec

# Auto-detects and installs to correct directory:
# → Claude Code users: .claude/
# → Antigravity users: .agent/
```

### **For Claude Code Users:**
```bash
# Use .claude/ directory
# Reference: CLAUDE.md (project instructions)
# Scripts: .claude/scripts/validate_dispatcher.py (auto via hooks)

# Invoke commands:
/brainstorm authentication system
/create blog site
/debug login not working

# Or use skill mentions:
@nextjs-react-expert how to optimize this component?
@mobile-design best navigation pattern?
```

### **For Antigravity Users:**
```bash
# Use .agent/ directory
# Reference: .agent/ARCHITECTURE.md
# Scripts: .agent/scripts/checklist.py

# Invoke workflows:
/brainstorm authentication system
/create blog site
/debug login not working
```

---

## 📝 Key Takeaways

### **Multi-Platform Philosophy**
CafeKit is designed to work seamlessly across AI coding assistant platforms. Choose the platform that fits your workflow:

| Use Case | Recommended Platform |
|----------|---------------------|
| Terminal-based workflow | Claude Code CLI |
| Editor-based workflow | Google Antigravity |
| Team already using one | Stick with current |
| New project | Either (both fully supported) |

### **Google Antigravity (`.agent/`)**
- ✅ **Original system** - Initially designed for Google's AI coding tool
- ✅ **Simple format** - Markdown files, no frontmatter
- ✅ **Manual validation** - Run scripts explicitly
- ✅ **Fully supported** - CafeKit maintains compatibility

### **Claude Code CLI (`.claude/`)**
- ✅ **Modern system** - Native support for Anthropic's Claude Code
- ✅ **Plugin format** - YAML frontmatter, structured metadata
- ✅ **Auto-validation** - Hooks trigger validators automatically
- ✅ **Active development** - New features, AskUserQuestion integration
- ✅ **Marketplace ready** - Plugin system for distribution

---

## 🔗 Related Documentation

### **Claude Code CLI:**
- `CLAUDE.md` - Project-level instructions
- `.docs/claude-code-cli/README.md` - Documentation index
- `.docs/claude-code-cli/ASKUSERQUESTION-SUMMARY.md` - Tool integration guide
- `.docs/claude-code-cli/BOOTSTRAP-EVIDENCE.md` - Official Claude Code docs

### **Google Antigravity:**
- `.agent/ARCHITECTURE.md` - System architecture
- `.agent/scripts/README.md` - Validation scripts guide

---

**Last Updated:** 2026-02-04
**Comparison Version:** 1.1
**Total Components:** 40 agents + 77 skills + 34 commands/workflows across both systems
**Supported Platforms:** Claude Code CLI (Anthropic) + Google Antigravity
