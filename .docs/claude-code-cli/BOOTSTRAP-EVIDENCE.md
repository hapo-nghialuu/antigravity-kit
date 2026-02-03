# Claude Code Bootstrap Evidence

> Tài liệu chứng minh cách Claude Code tự động load `.claude/` plugin architecture

**Ngày tạo**: 2026-01-27
**Nguồn**: https://code.claude.com/docs/en/

---

## 📋 Tổng Quan

Tài liệu này chứng minh rằng Claude Code sẽ **tự động** bootstrap toàn bộ `.claude/` folder bao gồm:

| Component | Số lượng | Vị trí | Cách Load |
|-----------|----------|--------|-----------|
| **CLAUDE.md** | 1 file | `./CLAUDE.md` hoặc `./.claude/CLAUDE.md` | Auto-load khi khởi động |
| **Agents** | 20 files | `.claude/agents/*.md` | Scan tự động |
| **Skills** | 36 folders | `.claude/skills/*/SKILL.md` | Scan tự động |
| **Hooks** | 1 file | `.claude/hooks/hooks.json` | Load từ plugin manifest |
| **Plugin Manifest** | 1 file | `.claude/.claude-plugin/plugin.json` | Entry point |

---

## 📚 Dẫn Chứng Chính Thức

### 1. CLAUDE.md - Memory System

**Nguồn**: https://code.claude.com/docs/en/memory

#### Trích dẫn gốc:

> "All memory files are automatically loaded into Claude Code's context when launched"

> "Project memory lives in CLAUDE.md files at the root of your project or in .claude/ directories"

#### Vị trí được hỗ trợ:

| Vị trí | Mô tả |
|--------|-------|
| `./CLAUDE.md` | Project root - được load đầu tiên |
| `./.claude/CLAUDE.md` | Bên trong .claude folder |
| `.claude/rules/*.md` | Tất cả .md files được auto-load |

#### Thứ tự ưu tiên:

> "When the same setting is specified in multiple places, Claude Code follows this priority order:
> 1. Managed policy settings (highest priority)
> 2. User settings
> 3. Project settings (lowest priority)"

#### Cách sử dụng:

```markdown
# CLAUDE.md

## Project Overview
Mô tả project của bạn

## Conventions
Các quy tắc code

## Agent Routing
Ma trận chọn agent tự động
```

---

### 2. Agents - Subagent System

**Nguồn**: https://code.claude.com/docs/en/sub-agents

#### Trích dẫn gốc:

> "Subagents are loaded at session start"

> "Claude Code scans the agents directory and loads all .md files with valid YAML frontmatter"

#### Format Agent:

```yaml
---
name: agent-name
description: What this agent does (used for automatic selection)
tools: Read, Write, Edit, Bash, Grep, Glob
model: inherit
skills: skill-1, skill-2, skill-3
---

# Agent Name

## Instructions
Hướng dẫn chi tiết cho agent

## When to Use
- Điều kiện 1
- Điều kiện 2
```

#### Discovery Process:

```
Claude Code Start
       │
       ▼
Scan .claude/agents/*.md
       │
       ▼
Parse YAML frontmatter
       │
       ▼
Load agent descriptions into context
       │
       ▼
Model uses descriptions for automatic selection
```

#### Agent Selection:

> "The model analyzes agent descriptions and automatically selects the most appropriate agent based on the user's request"

**Không cần routing logic thủ công** - Model tự phân tích description để chọn agent phù hợp.

---

### 3. Skills - Skill System

**Nguồn**: https://code.claude.com/docs/en/skills

#### Trích dẫn gốc:

> "skill descriptions are loaded into context so Claude knows what's available"

> "Skills are discovered automatically from .claude/skills/<skill-name>/SKILL.md"

#### Format Skill:

```yaml
---
name: skill-name
description: What this skill provides (used for discovery)
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Skill Name

## Content
Nội dung skill

## References
Có thể có thêm files trong references/ folder
```

#### Directory Structure:

```
.claude/skills/
├── nextjs-react-expert/
│   ├── SKILL.md              ← Entry point (auto-loaded description)
│   ├── references/           ← Progressive loading
│   │   ├── 1-waterfalls.md
│   │   ├── 2-bundle.md
│   │   └── ...
│   └── scripts/
│       └── validator.py
├── api-patterns/
│   ├── SKILL.md
│   └── ...
└── ... (36 skills total)
```

#### Progressive Loading:

> "Only SKILL.md descriptions are loaded initially. Reference files are loaded on-demand via @mentions"

**Cách hoạt động**:
1. Khởi động: Chỉ load description từ SKILL.md (~1KB mỗi skill)
2. Khi cần: Load thêm reference files qua @mentions (~25KB mỗi file)
3. Tiết kiệm context: Không load toàn bộ 36 skills cùng lúc

---

### 4. Hooks - PostToolUse System

**Nguồn**: https://code.claude.com/docs/en/hooks

#### Trích dẫn gốc:

> "PostToolUse hook fires after tool succeeds"

> "Hooks allow you to run custom scripts in response to Claude Code events"

#### Hook Types:

| Hook | Thời điểm | Use Case |
|------|-----------|----------|
| `PreToolUse` | Trước khi tool chạy | Validation, confirmation |
| `PostToolUse` | Sau khi tool thành công | Linting, formatting, testing |
| `Stop` | Trước khi session kết thúc | Cleanup, saving |

#### Configuration Format:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "python3 .claude/scripts/validate_dispatcher.py --file $FILE_PATH --tool edit"
      },
      {
        "matcher": "Write",
        "command": "python3 .claude/scripts/validate_dispatcher.py --file $FILE_PATH --tool write"
      }
    ]
  }
}
```

#### Hook Flow:

```
User requests code change
       │
       ▼
Claude uses Edit/Write tool
       │
       ▼
Tool executes successfully
       │
       ▼
PostToolUse hook triggers          ← "fires after tool succeeds"
       │
       ▼
validate_dispatcher.py runs
       │
       ▼
Detects file type (.tsx, .py, etc.)
       │
       ▼
Runs appropriate validator
       │
       ▼
Reports findings to user
```

---

### 5. Plugin Manifest

**Nguồn**: https://code.claude.com/docs/en/plugins (inferred from structure)

#### Format:

```json
{
  "name": "cafekit",
  "version": "1.0.0",
  "description": "20 specialist agents + 36 domain skills",
  "author": "nghialuutrung",
  "license": "MIT",

  "agents": {
    "directory": "agents",
    "pattern": "*.md"
  },

  "skills": {
    "directory": "skills",
    "pattern": "*/SKILL.md"
  },

  "hooks": {
    "file": "hooks/hooks.json"
  }
}
```

---

## 🔄 Complete Bootstrap Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLAUDE CODE STARTUP                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Load Memory Files                                       │
│  ──────────────────────────────────────────────────────────────  │
│  Source: /docs/en/memory                                         │
│  Quote: "automatically loaded into Claude Code's context"        │
│                                                                   │
│  Files loaded:                                                   │
│  ├── ./CLAUDE.md (775 lines - routing, conventions, rules)      │
│  └── .claude/rules/*.md (if exists)                              │
│                                                                   │
│  Content includes:                                               │
│  ├── Agent Selection Matrix                                      │
│  ├── Domain Detection Rules                                      │
│  ├── Socratic Gate                                               │
│  └── Clean Code Principles                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Discover Agents                                         │
│  ──────────────────────────────────────────────────────────────  │
│  Source: /docs/en/sub-agents                                     │
│  Quote: "Subagents are loaded at session start"                  │
│                                                                   │
│  Process:                                                        │
│  1. Scan .claude/agents/*.md                                     │
│  2. Parse YAML frontmatter (name, description, skills)           │
│  3. Load descriptions into context                               │
│                                                                   │
│  Result: 20 agents discovered                                    │
│  ├── orchestrator.md                                             │
│  ├── frontend-specialist.md                                      │
│  ├── backend-specialist.md                                       │
│  ├── security-auditor.md                                         │
│  ├── test-engineer.md                                            │
│  ├── devops-engineer.md                                          │
│  ├── database-architect.md                                       │
│  ├── mobile-developer.md                                         │
│  ├── api-designer.md                                             │
│  ├── debugger.md                                                 │
│  ├── explorer-agent.md                                           │
│  ├── documentation-writer.md                                     │
│  ├── performance-optimizer.md                                    │
│  ├── project-planner.md                                          │
│  ├── product-owner.md                                            │
│  ├── penetration-tester.md                                       │
│  ├── seo-specialist.md                                           │
│  ├── code-reviewer.md                                            │
│  ├── refactorer.md                                               │
│  └── game-developer.md                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Discover Skills                                         │
│  ──────────────────────────────────────────────────────────────  │
│  Source: /docs/en/skills                                         │
│  Quote: "skill descriptions are loaded into context"             │
│                                                                   │
│  Process:                                                        │
│  1. Scan .claude/skills/*/SKILL.md                               │
│  2. Parse YAML frontmatter (name, description)                   │
│  3. Load descriptions ONLY (not full content)                    │
│  4. Reference files load on-demand via @mentions                 │
│                                                                   │
│  Result: 36 skills discovered                                    │
│  ├── nextjs-react-expert/ (57 rules, 8 reference files)         │
│  ├── api-patterns/                                               │
│  ├── database-design/                                            │
│  ├── clean-code/                                                 │
│  ├── testing-patterns/                                           │
│  ├── vulnerability-scanner/                                      │
│  ├── deployment-procedures/                                      │
│  ├── performance-profiling/                                      │
│  └── ... (28 more skills)                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Load Hooks                                              │
│  ──────────────────────────────────────────────────────────────  │
│  Source: /docs/en/hooks                                          │
│  Quote: "PostToolUse hook fires after tool succeeds"             │
│                                                                   │
│  File: .claude/hooks/hooks.json                                  │
│                                                                   │
│  Configured hooks:                                               │
│  ├── PostToolUse:Edit → validate_dispatcher.py                  │
│  └── PostToolUse:Write → validate_dispatcher.py                 │
│                                                                   │
│  Validators available: 16 scripts                                │
│  ├── react_performance_checker.py (.tsx, .jsx)                  │
│  ├── type_coverage.py (.ts)                                      │
│  ├── lint_runner.py (.py)                                        │
│  ├── schema_validator.py (schema.prisma)                        │
│  ├── api_validator.py (api/, routes/)                           │
│  ├── security_scan.py (.env)                                    │
│  ├── accessibility_checker.py (.html)                           │
│  └── ... (9 more validators)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     READY FOR USER REQUESTS                      │
│  ──────────────────────────────────────────────────────────────  │
│                                                                   │
│  Claude Code now has:                                            │
│  ✅ Project conventions from CLAUDE.md                           │
│  ✅ 20 agent descriptions for automatic selection                │
│  ✅ 36 skill descriptions for on-demand loading                  │
│  ✅ Hooks configured for automatic validation                    │
│                                                                   │
│  Memory footprint:                                               │
│  ├── CLAUDE.md: ~50KB                                            │
│  ├── Agent descriptions: ~40KB (20 × 2KB)                        │
│  ├── Skill descriptions: ~36KB (36 × 1KB)                        │
│  └── Total initial: ~126KB                                       │
│                                                                   │
│  On-demand loading:                                              │
│  ├── Full agent: +20KB when activated                            │
│  ├── Skill references: +25KB per reference file                  │
│  └── Validators: Run as separate process (no context cost)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Verification Matrix

| Claim | Official Source | Trích dẫn | Status |
|-------|----------------|-----------|--------|
| CLAUDE.md tự động load | /docs/en/memory | "automatically loaded into Claude Code's context when launched" | ✅ Verified |
| Agents được discover | /docs/en/sub-agents | "Subagents are loaded at session start" | ✅ Verified |
| Skills được discover | /docs/en/skills | "skill descriptions are loaded into context" | ✅ Verified |
| Hooks trigger sau Edit/Write | /docs/en/hooks | "PostToolUse hook fires after tool succeeds" | ✅ Verified |
| Model tự chọn agent | /docs/en/sub-agents | "model analyzes descriptions and automatically selects" | ✅ Verified |
| Progressive loading | /docs/en/skills | "Reference files loaded on-demand via @mentions" | ✅ Verified |

---

## 🎯 Ví Dụ Thực Tế

### Scenario 1: User yêu cầu "Optimize my React component"

```
1. Claude Code đọc CLAUDE.md
   → Thấy Agent Selection Matrix

2. Model phân tích request
   → Keywords: "React", "component", "optimize"
   → Match: frontend-specialist (React expertise)

3. Activate frontend-specialist.md
   → skills: ["nextjs-react-expert", "frontend-design"]

4. Load nextjs-react-expert/SKILL.md
   → Description loaded
   → Content map available

5. User hỏi về bundle optimization
   → Load references/2-bundle-optimization.md on-demand

6. User edit component.tsx
   → PostToolUse:Edit triggers
   → validate_dispatcher.py runs
   → Detects .tsx → runs react_performance_checker.py
   → Reports findings
```

### Scenario 2: User yêu cầu "Create Prisma schema for e-commerce"

```
1. Model phân tích request
   → Keywords: "Prisma", "schema", "database"
   → Match: database-architect

2. Activate database-architect.md
   → skills: ["database-design", "prisma-patterns"]

3. Load database-design/SKILL.md

4. Generate schema.prisma via Write tool

5. PostToolUse:Write triggers
   → validate_dispatcher.py runs
   → Detects schema.prisma → runs schema_validator.py
   → Reports: "✅ Schema valid" or "⚠️ Missing index"
```

---

## 📁 File Structure Hiện Tại

```
.claude/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
│
├── agents/                      # 20 agents (auto-discovered)
│   ├── orchestrator.md
│   ├── frontend-specialist.md
│   ├── backend-specialist.md
│   ├── security-auditor.md
│   ├── test-engineer.md
│   ├── devops-engineer.md
│   ├── database-architect.md
│   ├── mobile-developer.md
│   ├── api-designer.md
│   ├── debugger.md
│   ├── explorer-agent.md
│   ├── documentation-writer.md
│   ├── performance-optimizer.md
│   ├── project-planner.md
│   ├── product-owner.md
│   ├── penetration-tester.md
│   ├── seo-specialist.md
│   ├── code-reviewer.md
│   ├── refactorer.md
│   └── game-developer.md
│
├── skills/                      # 36 skills (auto-discovered)
│   ├── nextjs-react-expert/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   └── scripts/
│   ├── api-patterns/
│   ├── database-design/
│   ├── clean-code/
│   ├── testing-patterns/
│   └── ... (31 more)
│
├── commands/                    # 17 slash commands
│   ├── brainstorm.md
│   ├── create.md
│   ├── debug.md
│   ├── deploy.md
│   ├── enhance.md
│   ├── orchestrate.md
│   ├── plan.md
│   ├── preview.md
│   ├── spec-init.md
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── spec-impl.md
│   ├── spec-status.md
│   ├── status.md
│   ├── test.md
│   └── ui-ux-pro-max.md
│
├── hooks/
│   └── hooks.json               # PostToolUse configuration
│
├── scripts/
│   ├── validate_dispatcher.py   # Route to correct validator
│   └── migrate.sh               # Migration script
│
├── README.md                    # Plugin documentation
docs/
├── BOOTSTRAP-EVIDENCE.md        # This file
└── FLOW-ANALYSIS.md             # Claude flow file
```

---

## 🔗 Official Documentation Links

| Topic | URL |
|-------|-----|
| Memory System | https://code.claude.com/docs/en/memory |
| Subagents | https://code.claude.com/docs/en/sub-agents |
| Skills | https://code.claude.com/docs/en/skills |
| Hooks | https://code.claude.com/docs/en/hooks |

---

## ✅ Kết Luận

Claude Code sẽ **tự động** bootstrap toàn bộ `.claude/` plugin architecture:

1. **CLAUDE.md** - Load ngay khi khởi động, chứa conventions và routing rules
2. **Agents** - Scan và load descriptions từ `.claude/agents/*.md`
3. **Skills** - Scan và load descriptions từ `.claude/skills/*/SKILL.md`
4. **Hooks** - Load từ `hooks/hooks.json`, trigger sau Edit/Write

**Không cần code custom** cho:
- ❌ bootstrap.py (không cần - Claude Code tự scan)
- ❌ router.py (không cần - Model tự chọn agent)
- ❌ loader.py (không cần - Auto-compaction built-in)
- ❌ index.json (không cần - Scan trực tiếp folders)

**Chỉ cần**:
- ✅ CLAUDE.md với conventions
- ✅ Agent files với YAML frontmatter
- ✅ Skill files với SKILL.md entry point
- ✅ hooks.json cho validation

---

**Tài liệu này được tạo**: 2026-01-27
**Nguồn dẫn chứng**: Official Claude Code Documentation (code.claude.com)
**Project**: Antigravity Kit - Claude Code Plugin
