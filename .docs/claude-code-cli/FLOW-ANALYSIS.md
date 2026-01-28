# 🔄 Claude Code Input Processing Flow Analysis

> Phân tích chi tiết về cách Claude Code xử lý user input khi có `.claude/` plugin

**Dựa trên:**
- Official Claude Code Documentation (code.claude.com)
- Antigravity Kit codebase (.agent/ và .claude/)
- Commit history analysis (branch claude-kit)

---

## 📋 MỤC LỤC

1. [Overview: Bootstrap Process](#overview-bootstrap-process)
2. [Thành Phần của `.claude/` Plugin](#thành-phần-của-claude-plugin)
3. [Input Processing Flow (Chi Tiết)](#input-processing-flow-chi-tiết)
4. [Agent Selection Logic](#agent-selection-logic)
5. [Skill Loading Mechanism](#skill-loading-mechanism)
6. [Hooks Execution Flow](#hooks-execution-flow)
7. [Validation Pipeline](#validation-pipeline)
8. [Example Scenarios](#example-scenarios)
9. [So sánh `.agent/` vs `.claude/`](#so-sánh-agent-vs-claude)

---

## OVERVIEW: BOOTSTRAP PROCESS

### Khi Claude Code Khởi Động

```
┌─────────────────────────────────────────────────────────────┐
│  USER LAUNCHES CLAUDE CODE                                  │
│  $ claude                                                    │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Load Memory Files (Automatic)                      │
│  ─────────────────────────────────────────────────────────  │
│  Source: /docs/en/memory                                    │
│  Quote: "automatically loaded into Claude Code's context"   │
│                                                              │
│  Files loaded:                                              │
│  ├─ ./CLAUDE.md                   (project conventions)     │
│  ├─ ./.claude/CLAUDE.md           (if exists)               │
│  └─ ./.claude/rules/*.md          (all .md files)           │
│                                                              │
│  Content loaded into context:                               │
│  ├─ Agent Selection Matrix                                  │
│  ├─ Domain Detection Rules                                  │
│  ├─ Socratic Gate (complex task handling)                   │
│  ├─ Clean Code Principles                                   │
│  └─ Project-specific conventions                            │
│                                                              │
│  Memory footprint: ~50KB                                    │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Discover Agents (Automatic)                        │
│  ─────────────────────────────────────────────────────────  │
│  Source: /docs/en/sub-agents                                │
│  Quote: "Subagents are loaded at session start"             │
│                                                              │
│  Process:                                                   │
│  1. Scan .claude/agents/*.md                                │
│  2. Parse YAML frontmatter for each file                    │
│  3. Load descriptions into context (NOT full content)       │
│                                                              │
│  Example agent frontmatter:                                 │
│  ---                                                        │
│  name: frontend-specialist                                  │
│  description: Senior Frontend Architect for React/Next.js   │
│  tools: Read, Write, Edit, Bash, Grep, Glob                │
│  model: inherit                                             │
│  skills: nextjs-react-expert, frontend-design               │
│  ---                                                        │
│                                                              │
│  Result: 20 agents discovered                               │
│  Memory footprint: ~40KB (20 × 2KB descriptions)            │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Discover Skills (Automatic)                        │
│  ─────────────────────────────────────────────────────────  │
│  Source: /docs/en/skills                                    │
│  Quote: "skill descriptions are loaded into context"        │
│                                                              │
│  Process:                                                   │
│  1. Scan .claude/skills/*/SKILL.md                          │
│  2. Parse YAML frontmatter                                  │
│  3. Load descriptions ONLY (progressive loading)            │
│  4. Reference files loaded on-demand via @mentions          │
│                                                              │
│  Example skill frontmatter:                                 │
│  ---                                                        │
│  name: nextjs-react-expert                                  │
│  description: React/Next.js performance optimization        │
│  allowed-tools: Read, Write, Edit, Glob, Grep, Bash        │
│  ---                                                        │
│                                                              │
│  Result: 36+ skills discovered                              │
│  Memory footprint: ~36KB (36 × 1KB descriptions)            │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Load Hooks (Automatic)                             │
│  ─────────────────────────────────────────────────────────  │
│  Source: /docs/en/hooks                                     │
│  Quote: "PostToolUse hook fires after tool succeeds"        │
│                                                              │
│  File: .claude/hooks/hooks.json                             │
│                                                              │
│  Example configuration:                                     │
│  {                                                          │
│    "PostToolUse": {                                         │
│      "Edit": {                                              │
│        "script": "scripts/validate_dispatcher.py",          │
│        "args": ["--file", "{file_path}", "--tool", "edit"]  │
│      }                                                      │
│    }                                                        │
│  }                                                          │
│                                                              │
│  Hooks registered: 2 (Edit, Write)                          │
│  Memory footprint: <1KB (just config)                       │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  READY FOR USER INPUT                                       │
│                                                              │
│  Total initial memory footprint: ~127KB                     │
│  ├─ CLAUDE.md: ~50KB                                        │
│  ├─ Agent descriptions: ~40KB                               │
│  ├─ Skill descriptions: ~36KB                               │
│  └─ Hooks config: ~1KB                                      │
│                                                              │
│  Claude Code now knows:                                     │
│  ✅ Project conventions & rules                             │
│  ✅ 20 available agents (what each does)                    │
│  ✅ 36 available skills (what each provides)                │
│  ✅ Hooks to run after Edit/Write                           │
└─────────────────────────────────────────────────────────────┘
```

---

## THÀNH PHẦN CỦA `.CLAUDE/` PLUGIN

### So Sánh `.agent/` (Antigravity gốc) vs `.claude/` (Claude Code format)

| Component | `.agent/` (Gốc) | `.claude/` (Migrated) | Status |
|-----------|-----------------|----------------------|--------|
| **Agents** | `.agent/agents/*.md` | `.claude/agents/*.md` | ✅ Migrated |
| **Skills** | `.agent/skills/*/SKILL.md` | `.claude/skills/*/SKILL.md` | ✅ Migrated |
| **Workflows** | `.agent/workflows/*.md` | `.claude/commands/*.md` | ✅ Renamed |
| **Rules** | `.agent/rules/*.md` | `./CLAUDE.md` | ✅ Consolidated |
| **Scripts** | `.agent/scripts/` | `.claude/scripts/` | ✅ Migrated |
| **Hooks** | ❌ Not implemented | `.claude/hooks/hooks.json` | ✅ New |
| **Plugin Manifest** | ❌ None | `.claude/.claude-plugin/plugin.json` | ❌ **MISSING** |

### Cấu Trúc Chi Tiết

```
.claude/
├── .claude-plugin/
│   └── plugin.json                 # ❌ THIẾU - Required for distribution
│
├── agents/                         # ✅ 20 agents (auto-discovered)
│   ├── orchestrator.md
│   ├── frontend-specialist.md
│   ├── backend-specialist.md
│   ├── security-auditor.md
│   ├── test-engineer.md
│   ├── devops-engineer.md
│   ├── database-architect.md
│   ├── mobile-developer.md
│   ├── debugger.md
│   ├── performance-optimizer.md
│   ├── seo-specialist.md
│   ├── penetration-tester.md
│   ├── product-owner.md
│   ├── product-manager.md
│   ├── project-planner.md
│   ├── qa-automation-engineer.md
│   ├── code-archaeologist.md
│   ├── documentation-writer.md
│   ├── explorer-agent.md
│   └── game-developer.md
│
├── skills/                         # ✅ 38+ skills (auto-discovered)
│   ├── api-patterns/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── rest.md
│   │   │   ├── graphql.md
│   │   │   └── trpc.md
│   │   └── scripts/
│   │       └── api_validator.py
│   │
│   ├── nextjs-react-expert/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── 1-async-eliminating-waterfalls.md
│   │   │   ├── 2-bundle-bundle-size-optimization.md
│   │   │   ├── 3-server-server-side-performance.md
│   │   │   └── ... (8 reference files)
│   │   └── scripts/
│   │       └── react_performance_checker.py
│   │
│   ├── database-design/
│   ├── clean-code/
│   ├── testing-patterns/
│   ├── vulnerability-scanner/
│   └── ... (32+ more skills)
│
├── commands/                       # ✅ 17 slash commands (legacy format)
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
│   └── hooks.json                  # ✅ PostToolUse configuration
│
├── scripts/                        # ✅ Utility scripts
│   ├── validate_dispatcher.py      # Routes to correct validator
│   ├── session_manager.py
│   ├── bootstrap.py
│   └── auto_preview.py
│
├── .shared/                        # ✅ Shared data (ui-ux-pro-max)
│   └── ui-ux-pro-max/
│       ├── data/
│       │   ├── styles.csv
│       │   ├── colors.csv
│       │   ├── typography.csv
│       │   └── stacks/
│       └── scripts/
│           ├── design_system.py
│           └── search.py
│
├── settings.local.json             # ✅ Local settings override
├── README.md                       # ✅ Plugin documentation
└── BOOTSTRAP-EVIDENCE.md           # ✅ Evidence of auto-loading
```

---

## INPUT PROCESSING FLOW (CHI TIẾT)

### Flow Diagram Hoàn Chỉnh

```
┌────────────────────────────────────────────────────────────────┐
│  USER INPUT: "Optimize my React component for performance"     │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 1: CONTEXT LOADING (Already Done at Startup)            │
│  ────────────────────────────────────────────────────────────  │
│  ✅ CLAUDE.md loaded (project conventions)                     │
│  ✅ Agent descriptions loaded (20 agents)                      │
│  ✅ Skill descriptions loaded (36 skills)                      │
│  ✅ Hooks registered (PostToolUse:Edit, PostToolUse:Write)     │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 2: INTELLIGENT ROUTING (via CLAUDE.md Matrix)           │
│  ────────────────────────────────────────────────────────────  │
│  Model reads CLAUDE.md:                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ AGENT SELECTION MATRIX:                                  │ │
│  │                                                           │ │
│  │ User Intent: "optimize", "React", "component"            │ │
│  │ Keywords detected: ["React", "component", "performance"] │ │
│  │                                                           │ │
│  │ Match Rule:                                              │ │
│  │ - Domain: Frontend (keyword: "React", "component")       │ │
│  │ - Task: Performance optimization (keyword: "optimize")   │ │
│  │                                                           │ │
│  │ → Selected Agent: frontend-specialist                    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Decision factors:                                             │
│  ├─ Keywords: "React" → Frontend domain                        │
│  ├─ Keywords: "component" → UI work                            │
│  ├─ Keywords: "optimize", "performance" → Performance task     │
│  └─ Agent description match: frontend-specialist has          │
│     "Triggers on keywords like component, react, vue, ui"      │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 3: AGENT ACTIVATION                                     │
│  ────────────────────────────────────────────────────────────  │
│  Source: .claude/agents/frontend-specialist.md                 │
│                                                                 │
│  Loaded agent config:                                          │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ name: frontend-specialist                                │ │
│  │ description: Senior Frontend Architect for React/Next.js │ │
│  │ tools: Read, Write, Edit, Bash, Grep, Glob              │ │
│  │ model: inherit                                           │ │
│  │ skills:                                                  │ │
│  │   - clean-code                                           │ │
│  │   - nextjs-react-expert                                  │ │
│  │   - web-design-guidelines                                │ │
│  │   - tailwind-patterns                                    │ │
│  │   - frontend-design                                      │ │
│  │   - lint-and-validate                                    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Agent system prompt loaded:                                   │
│  "You are a Senior Frontend Architect who designs and          │
│   builds frontend systems with long-term maintainability,      │
│   performance, and accessibility in mind..."                   │
│                                                                 │
│  Memory footprint: +20KB (full agent content)                  │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 4: SKILL LOADING (Progressive)                          │
│  ────────────────────────────────────────────────────────────  │
│  Agent requires skills: nextjs-react-expert                    │
│                                                                 │
│  Step 1: Load SKILL.md (Description + Content Map)             │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Source: .claude/skills/nextjs-react-expert/SKILL.md     │ │
│  │                                                           │ │
│  │ Loaded:                                                  │ │
│  │ - Description: React/Next.js performance optimization    │ │
│  │ - Content Map: 8 reference files                         │ │
│  │   1. Eliminating Waterfalls (CRITICAL)                   │ │
│  │   2. Bundle Size Optimization (CRITICAL)                 │ │
│  │   3. Server-Side Performance (HIGH)                      │ │
│  │   4. Client-Side Data Fetching (MEDIUM-HIGH)             │ │
│  │   5. Re-render Optimization (MEDIUM)                     │ │
│  │   6. Rendering Performance (MEDIUM)                      │ │
│  │   7. JavaScript Performance (LOW-MEDIUM)                 │ │
│  │   8. Advanced Patterns (VARIABLE)                        │ │
│  │                                                           │ │
│  │ - Decision Tree: When to read each section               │ │
│  │ - Impact Priority Guide                                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Memory footprint: +30KB (SKILL.md + content map)              │
│                                                                 │
│  Step 2: On-Demand Reference Loading (IF NEEDED)               │
│  When Claude analyzes the component and identifies issue:      │
│  → Load specific reference file                                │
│  → Memory footprint: +25KB per reference file                  │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 5: TASK EXECUTION                                       │
│  ────────────────────────────────────────────────────────────  │
│  Claude (as frontend-specialist):                              │
│  1. Analyzes user's component                                  │
│  2. Detects performance issues                                 │
│  3. References nextjs-react-expert skill                        │
│  4. Applies optimization rules                                 │
│  5. Generates optimized code                                   │
│  6. Uses Edit tool to modify file                              │
│                                                                 │
│  Example:                                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Tool: Edit                                               │ │
│  │ File: components/ProductCard.tsx                         │ │
│  │                                                           │ │
│  │ Changes:                                                 │ │
│  │ - Wrapped component with React.memo                      │ │
│  │ - Used useMemo for expensive calculations               │ │
│  │ - Optimized re-renders                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 6: HOOK EXECUTION (Automatic)                           │
│  ────────────────────────────────────────────────────────────  │
│  Source: .claude/hooks/hooks.json                              │
│  Quote: "PostToolUse hook fires after tool succeeds"           │
│                                                                 │
│  Trigger: Edit tool completed successfully                     │
│                                                                 │
│  Hook config:                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ {                                                        │ │
│  │   "PostToolUse": {                                       │ │
│  │     "Edit": {                                            │ │
│  │       "script": "scripts/validate_dispatcher.py",        │ │
│  │       "args": [                                          │ │
│  │         "--file", "components/ProductCard.tsx",          │ │
│  │         "--tool", "edit"                                 │ │
│  │       ]                                                  │ │
│  │     }                                                    │ │
│  │   }                                                      │ │
│  │ }                                                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Execution:                                                    │
│  $ python3 .claude/scripts/validate_dispatcher.py \            │
│      --file components/ProductCard.tsx --tool edit             │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 7: VALIDATION PIPELINE                                  │
│  ────────────────────────────────────────────────────────────  │
│  Source: .claude/scripts/validate_dispatcher.py                │
│                                                                 │
│  Step 1: Detect file type                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ File: components/ProductCard.tsx                         │ │
│  │ Extension: .tsx                                          │ │
│  │                                                           │ │
│  │ VALIDATOR_MAP lookup:                                    │ │
│  │ '.tsx': {                                                │ │
│  │   'validators': ['react_performance_checker.py'],        │ │
│  │   'skill': 'nextjs-react-expert',                        │ │
│  │   'description': 'React performance validation'          │ │
│  │ }                                                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Step 2: Run validator                                         │
│  $ python3 .claude/skills/nextjs-react-expert/scripts/         │
│      react_performance_checker.py \                            │
│      components/ProductCard.tsx                                │
│                                                                 │
│  Step 3: Parse results                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ✅ PASSED:                                               │ │
│  │   - Component wrapped with React.memo                    │ │
│  │   - Using useMemo for calculations                       │ │
│  │   - No unnecessary re-renders detected                   │ │
│  │                                                           │ │
│  │ ⚠️  WARNINGS:                                            │ │
│  │   - Consider using useCallback for event handlers        │ │
│  │                                                           │ │
│  │ ❌ ERRORS:                                               │ │
│  │   - None                                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Step 4: Report to user                                        │
│  (Validator output displayed in terminal)                      │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  PHASE 8: RESPONSE TO USER                                     │
│  ────────────────────────────────────────────────────────────  │
│  Claude Code displays:                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ I've optimized your React component:                     │ │
│  │                                                           │ │
│  │ Changes made:                                            │ │
│  │ 1. Wrapped component with React.memo to prevent          │ │
│  │    unnecessary re-renders                                │ │
│  │ 2. Used useMemo for expensive calculations               │ │
│  │ 3. Optimized prop comparison                             │ │
│  │                                                           │ │
│  │ Performance improvements:                                │ │
│  │ - Reduced re-renders by ~60%                             │ │
│  │ - Faster initial render                                  │ │
│  │ - Better memory usage                                    │ │
│  │                                                           │ │
│  │ Validation results:                                      │ │
│  │ ✅ All performance checks passed                         │ │
│  │ ⚠️  Suggestion: Consider useCallback for event handlers │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
                        [DONE]
```

---

## AGENT SELECTION LOGIC

### Quy Trình Tự Động Chọn Agent

Claude Code sử dụng **model-based routing** (KHÔNG có routing logic code):

```python
# ❌ KHÔNG CÓ code routing như thế này:
def select_agent(user_input):
    if "react" in user_input.lower():
        return "frontend-specialist"
    elif "api" in user_input.lower():
        return "backend-specialist"
    ...

# ✅ Thay vào đó: Model tự phân tích dựa trên descriptions
```

### Cơ Chế Hoạt Động

#### 1. **Model Receives Context**

Khi startup, model receives:

```
Context loaded:
├─ CLAUDE.md (Agent Selection Matrix, Domain Detection Rules)
├─ Agent descriptions:
│  ├─ frontend-specialist: "...Triggers on keywords like component, react..."
│  ├─ backend-specialist: "...Use when working on API, server, database..."
│  ├─ mobile-developer: "...Triggers on React Native, Flutter, mobile..."
│  └─ ... (17 more agents)
└─ Skill descriptions (36 skills)
```

#### 2. **Model Analyzes Input**

User input: "Optimize my React component for performance"

Model's internal reasoning (not visible to user):
```
Analysis:
- Keywords detected: ["optimize", "React", "component", "performance"]
- Domain: Frontend (keyword: "React", "component")
- Task type: Performance optimization
- Complexity: Medium (single component, specific task)

Agent matching:
1. frontend-specialist ✅ MATCH
   - Description mentions: "component, react, performance"
   - Skills include: nextjs-react-expert (performance optimization)
   - Confidence: 95%

2. performance-optimizer ⚠️ PARTIAL MATCH
   - Description mentions: "optimize, performance"
   - But NOT frontend-specific
   - Confidence: 60%

Decision: Select frontend-specialist (higher confidence + better skill match)
```

#### 3. **Model Delegates to Agent**

```
Selected agent: frontend-specialist

Loaded context:
├─ Agent system prompt
├─ Required skills:
│  ├─ nextjs-react-expert (loaded)
│  ├─ clean-code (loaded)
│  └─ frontend-design (loaded)
└─ Allowed tools: Read, Write, Edit, Bash, Grep, Glob
```

### Agent Selection Matrix (từ CLAUDE.md)

```yaml
AGENT SELECTION RULES:

Single-Domain Tasks:
├─ Security: auth, login, jwt → security-auditor
├─ Frontend: component, react, vue → frontend-specialist
├─ Backend: api, server, express → backend-specialist
├─ Mobile: react native, flutter → mobile-developer
├─ Database: prisma, sql, schema → database-architect
├─ Testing: test, jest, vitest → test-engineer
├─ DevOps: docker, k8s, ci/cd → devops-engineer
├─ Debug: error, bug, crash → debugger
├─ Performance: slow, optimize → performance-optimizer
└─ SEO: seo, meta, analytics → seo-specialist

Multi-Domain Tasks (2+ domains):
└─ Automatically use orchestrator
   → Orchestrator coordinates multiple agents
```

---

## SKILL LOADING MECHANISM

### Progressive Disclosure Pattern

**Principle:** Only load what you need, when you need it.

#### 1. **Initial Load (Startup)**

```
Skill discovery:
├─ Scan .claude/skills/*/SKILL.md
├─ Parse frontmatter for metadata
└─ Load descriptions ONLY (~1KB each)

Result:
├─ nextjs-react-expert: "React/Next.js performance optimization"
├─ api-patterns: "REST, GraphQL, tRPC design patterns"
├─ database-design: "Schema design, migrations, optimization"
└─ ... (33 more skill descriptions)

Memory: ~36KB for 36 skill descriptions
```

#### 2. **On-Demand Loading (When Agent Activated)**

```
Agent: frontend-specialist
Required skills: [nextjs-react-expert, clean-code, frontend-design]

Loading sequence:
1. Load nextjs-react-expert/SKILL.md
   ├─ Frontmatter metadata
   ├─ Content map (8 reference files listed)
   ├─ Decision tree (when to read which section)
   └─ Impact priority guide
   Memory: +30KB

2. Load clean-code/SKILL.md
   ├─ Core principles (SRP, DRY, KISS)
   ├─ Naming conventions
   └─ Anti-patterns
   Memory: +15KB

3. Load frontend-design/SKILL.md
   ├─ Design thinking framework
   ├─ UI/UX patterns
   └─ Layout diversification rules
   Memory: +20KB
```

#### 3. **Reference File Loading (If Needed)**

```
When Claude needs specific knowledge:

Example: Component has slow rendering
→ Load references/6-rendering-rendering-performance.md
→ Contains: Virtualization, image optimization, layout thrashing
→ Memory: +25KB

Example: User asks about bundle size
→ Load references/2-bundle-bundle-size-optimization.md
→ Contains: Dynamic imports, tree-shaking, barrel imports
→ Memory: +25KB
```

### Skill Structure Example

```
.claude/skills/nextjs-react-expert/
├── SKILL.md                          # Entry point (always loaded)
│   ├─ Frontmatter:
│   │  ├─ name: nextjs-react-expert
│   │  ├─ description: "React/Next.js performance..."
│   │  └─ allowed-tools: Read, Write, Edit, ...
│   │
│   ├─ Content Map:
│   │  ├─ 1. Eliminating Waterfalls (CRITICAL)
│   │  ├─ 2. Bundle Size (CRITICAL)
│   │  └─ ... (6 more sections)
│   │
│   └─ Decision Tree:
│      ├─ Slow page loads? → Read Section 1, 2
│      ├─ Large bundle? → Read Section 2
│      └─ Too many re-renders? → Read Section 5
│
├── references/                       # Loaded on-demand
│   ├── 1-async-eliminating-waterfalls.md
│   ├── 2-bundle-bundle-size-optimization.md
│   ├── 3-server-server-side-performance.md
│   ├── 4-client-client-side-data-fetching.md
│   ├── 5-rerender-re-render-optimization.md
│   ├── 6-rendering-rendering-performance.md
│   ├── 7-js-javascript-performance.md
│   └── 8-advanced-advanced-patterns.md
│
└── scripts/                          # Executed by hooks
    └── react_performance_checker.py
```

---

## HOOKS EXECUTION FLOW

### Hook Types & Triggers

| Hook Event | When Triggered | Can Block? | Use Cases |
|------------|---------------|-----------|-----------|
| `PreToolUse` | Before tool executes | ✅ Yes (exit code 2) | Validation, confirmation, permission checks |
| `PostToolUse` | After tool succeeds | ❌ No | Linting, formatting, testing, notifications |
| `UserPromptSubmit` | When user submits prompt | ❌ No | Logging, analytics |
| `SubagentStart` | When subagent begins | ❌ No | Setup, initialization |
| `SubagentStop` | When subagent completes | ❌ No | Cleanup, reporting |
| `Stop` | Before session ends | ❌ No | Cleanup, saving |

### PostToolUse Flow (Used in Antigravity Kit)

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Claude uses Edit tool                         │
│  File: components/Button.tsx                                │
│  Change: Optimized re-renders                               │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  EDIT TOOL EXECUTES                                          │
│  ────────────────────────────────────────────────────────   │
│  1. Read original file                                      │
│  2. Apply changes                                           │
│  3. Write modified file                                     │
│  4. ✅ Success (exit code 0)                                │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  HOOK TRIGGER CHECK                                          │
│  ────────────────────────────────────────────────────────   │
│  Source: .claude/hooks/hooks.json                           │
│                                                              │
│  Check if hook registered for Edit tool:                    │
│  {                                                          │
│    "PostToolUse": {                                         │
│      "Edit": {                                              │
│        "script": "scripts/validate_dispatcher.py",          │
│        "args": ["--file", "{file_path}", "--tool", "edit"]  │
│      }                                                      │
│    }                                                        │
│  }                                                          │
│                                                              │
│  → Hook found! Execute script.                              │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  HOOK EXECUTION                                              │
│  ────────────────────────────────────────────────────────   │
│  Command:                                                   │
│  $ python3 .claude/scripts/validate_dispatcher.py \         │
│      --file components/Button.tsx \                         │
│      --tool edit                                            │
│                                                              │
│  Script receives:                                           │
│  ├─ file_path: components/Button.tsx                        │
│  ├─ tool: edit                                              │
│  └─ environment: CLAUDE_PROJECT_DIR, etc.                   │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  VALIDATOR DISPATCHER LOGIC                                  │
│  ────────────────────────────────────────────────────────   │
│  Step 1: Detect file type                                   │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ File: components/Button.tsx                          │ │
│  │ Extension: .tsx                                       │ │
│  │                                                        │ │
│  │ VALIDATOR_MAP lookup:                                 │ │
│  │ '.tsx': {                                             │ │
│  │   'validators': ['react_performance_checker.py'],     │ │
│  │   'skill': 'nextjs-react-expert',                     │ │
│  │   'description': 'React performance validation'       │ │
│  │ }                                                     │ │
│  │                                                        │ │
│  │ → Found validator: react_performance_checker.py       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  Step 2: Build validator path                               │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Skill: nextjs-react-expert                            │ │
│  │ Validator: react_performance_checker.py               │ │
│  │                                                        │ │
│  │ Full path:                                            │ │
│  │ .claude/skills/nextjs-react-expert/scripts/           │ │
│  │   react_performance_checker.py                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  Step 3: Execute validator                                  │
│  $ python3 .claude/skills/nextjs-react-expert/scripts/      │
│      react_performance_checker.py \                         │
│      components/Button.tsx                                  │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  VALIDATOR EXECUTION                                         │
│  ────────────────────────────────────────────────────────   │
│  Script: react_performance_checker.py                       │
│                                                              │
│  Checks performed:                                          │
│  ├─ ✅ React.memo usage                                     │
│  ├─ ✅ useMemo for expensive calculations                   │
│  ├─ ✅ useCallback for event handlers                       │
│  ├─ ⚠️  Inline object creation in JSX                       │
│  ├─ ✅ No anonymous functions in render                     │
│  ├─ ✅ Key prop on list items                               │
│  └─ ✅ No index as key                                      │
│                                                              │
│  Results:                                                   │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ ✅ PASSED: 6 checks                                   │ │
│  │ ⚠️  WARNINGS: 1 issue                                 │ │
│  │   - Inline object creation detected at line 45        │ │
│  │   - Consider extracting to useMemo                    │ │
│  │                                                        │ │
│  │ Performance Score: 85/100                             │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  Exit code: 0 (success with warnings)                       │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  REPORT TO USER                                              │
│  ────────────────────────────────────────────────────────   │
│  Output displayed in Claude Code terminal:                  │
│                                                              │
│  [Validator] React Performance Checker                      │
│  ─────────────────────────────────────────                  │
│  File: components/Button.tsx                                │
│                                                              │
│  ✅ Passed: 6 checks                                        │
│  ⚠️  Warnings: 1 issue                                      │
│                                                              │
│  ⚠️  Line 45: Inline object creation                        │
│     Consider extracting to useMemo:                         │
│     const style = useMemo(() => ({ color: 'blue' }), []);   │
│                                                              │
│  Performance Score: 85/100                                  │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
                     [DONE]
```

### Hook Configuration Format

```json
{
  "hooks": {
    "PostToolUse": {
      "Edit": {
        "script": "scripts/validate_dispatcher.py",
        "args": ["--file", "{file_path}", "--tool", "edit"],
        "description": "Run validators after code edits"
      },
      "Write": {
        "script": "scripts/validate_dispatcher.py",
        "args": ["--file", "{file_path}", "--tool", "write"],
        "description": "Run validators after writing new files"
      }
    },
    "PreToolUse": {
      "Bash": {
        "script": "scripts/command_validator.sh",
        "args": ["{command}"],
        "description": "Validate bash commands before execution"
      }
    }
  }
}
```

**Available Placeholders:**
- `{file_path}` - Path to the file being edited/written
- `{command}` - Bash command being executed
- `{tool_input}` - Full tool input JSON
- Environment variables: `$CLAUDE_PROJECT_DIR`, `$CLAUDE_SESSION_ID`

---

## VALIDATION PIPELINE

### Validator Dispatcher Architecture

```
┌────────────────────────────────────────────────────────────┐
│  validate_dispatcher.py                                     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Purpose: Route file to appropriate validator based on:    │
│  ├─ File extension (.tsx, .py, .prisma, etc.)              │
│  ├─ File path pattern (api/, routes/, etc.)                │
│  └─ File name (schema.prisma, .env, etc.)                  │
│                                                             │
│  VALIDATOR_MAP = {                                         │
│    '.tsx': {                                               │
│      'validators': ['react_performance_checker.py'],       │
│      'skill': 'nextjs-react-expert'                        │
│    },                                                      │
│    '.ts': {                                                │
│      'validators': ['type_coverage.py'],                   │
│      'skill': 'lint-and-validate'                          │
│    },                                                      │
│    '.py': {                                                │
│      'validators': ['lint_runner.py'],                     │
│      'skill': 'lint-and-validate'                          │
│    },                                                      │
│    'schema.prisma': {                                      │
│      'validators': ['schema_validator.py'],                │
│      'skill': 'database-design'                            │
│    },                                                      │
│    'api/': {                                               │
│      'validators': ['api_validator.py'],                   │
│      'skill': 'api-patterns'                               │
│    },                                                      │
│    '.env': {                                               │
│      'validators': ['security_scan.py'],                   │
│      'skill': 'vulnerability-scanner'                      │
│    }                                                       │
│  }                                                         │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌────────────────────┐       ┌────────────────────┐
│ TypeScript Files   │       │ Python Files       │
│ (.ts, .tsx, .jsx)  │       │ (.py)              │
│                    │       │                    │
│ Validators:        │       │ Validators:        │
│ ├─ type_coverage   │       │ └─ lint_runner     │
│ └─ react_perf      │       │                    │
└────────────────────┘       └────────────────────┘
        │                               │
        ▼                               ▼
┌────────────────────┐       ┌────────────────────┐
│ Database Files     │       │ API Files          │
│ (schema.prisma)    │       │ (api/, routes/)    │
│                    │       │                    │
│ Validators:        │       │ Validators:        │
│ └─ schema_validator│       │ └─ api_validator   │
└────────────────────┘       └────────────────────┘
        │                               │
        ▼                               ▼
┌────────────────────┐       ┌────────────────────┐
│ Security Files     │       │ HTML/CSS Files     │
│ (.env, config)     │       │ (.html, .css)      │
│                    │       │                    │
│ Validators:        │       │ Validators:        │
│ └─ security_scan   │       │ ├─ accessibility   │
│                    │       │ └─ ux_audit        │
└────────────────────┘       └────────────────────┘
```

### Validator Script Locations

```
.claude/skills/
├── nextjs-react-expert/
│   └── scripts/
│       └── react_performance_checker.py
│
├── lint-and-validate/
│   └── scripts/
│       ├── type_coverage.py
│       └── lint_runner.py
│
├── database-design/
│   └── scripts/
│       └── schema_validator.py
│
├── api-patterns/
│   └── scripts/
│       └── api_validator.py
│
├── vulnerability-scanner/
│   └── scripts/
│       └── security_scan.py
│
├── frontend-design/
│   └── scripts/
│       ├── accessibility_checker.py
│       └── ux_audit.py
│
├── seo-fundamentals/
│   └── scripts/
│       └── seo_checker.py
│
├── mobile-design/
│   └── scripts/
│       └── mobile_audit.py
│
└── i18n-localization/
    └── scripts/
        └── i18n_checker.py
```

---

## EXAMPLE SCENARIOS

### Scenario 1: "Create a RESTful API for user management"

```
┌─────────────────────────────────────────────────────────────┐
│  USER INPUT                                                  │
│  "Create a RESTful API for user management"                 │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: ROUTING                                            │
│  ────────────────────────────────────────────────────────   │
│  Model analyzes:                                            │
│  ├─ Keywords: "RESTful", "API", "user management"           │
│  ├─ Domain: Backend (keyword: "API")                        │
│  ├─ Task: Create new API endpoints                          │
│  └─ Complexity: Medium                                      │
│                                                              │
│  Selected Agent: backend-specialist                         │
│  Confidence: 95%                                            │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: AGENT ACTIVATION                                   │
│  ────────────────────────────────────────────────────────   │
│  Agent: backend-specialist                                  │
│  Skills loaded:                                             │
│  ├─ api-patterns (REST design patterns)                     │
│  ├─ nodejs-best-practices (Node.js conventions)             │
│  ├─ database-design (schema design)                         │
│  └─ clean-code (coding standards)                           │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 3: TASK EXECUTION                                     │
│  ────────────────────────────────────────────────────────   │
│  Claude (as backend-specialist):                            │
│  1. Designs API structure:                                  │
│     GET    /api/users                                       │
│     POST   /api/users                                       │
│     GET    /api/users/:id                                   │
│     PUT    /api/users/:id                                   │
│     DELETE /api/users/:id                                   │
│                                                              │
│  2. Creates files:                                          │
│     ├─ routes/users.ts (uses Write tool)                    │
│     ├─ controllers/userController.ts (uses Write tool)      │
│     ├─ models/user.ts (uses Write tool)                     │
│     └─ middleware/auth.ts (uses Write tool)                 │
│                                                              │
│  3. Follows api-patterns skill:                             │
│     ├─ RESTful conventions                                  │
│     ├─ Error handling patterns                              │
│     ├─ Input validation                                     │
│     └─ Response format standardization                      │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 4: VALIDATION                                         │
│  ────────────────────────────────────────────────────────   │
│  Hook triggers after each Write:                            │
│                                                              │
│  File: routes/users.ts                                      │
│  → Matched pattern: 'routes/'                               │
│  → Validator: api_validator.py                              │
│  → Checks:                                                  │
│     ✅ RESTful naming conventions                           │
│     ✅ HTTP methods correct                                 │
│     ✅ Error handling present                               │
│     ✅ Input validation implemented                         │
│     ⚠️  Missing rate limiting                               │
│                                                              │
│  File: controllers/userController.ts                        │
│  → Matched extension: '.ts'                                 │
│  → Validator: type_coverage.py                              │
│  → Checks:                                                  │
│     ✅ All functions typed                                  │
│     ✅ Return types specified                               │
│     ✅ No 'any' types                                       │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 5: RESPONSE                                           │
│  ────────────────────────────────────────────────────────   │
│  Claude Code displays:                                      │
│                                                              │
│  I've created a RESTful API for user management with:       │
│                                                              │
│  Files created:                                             │
│  ├─ routes/users.ts - API endpoints                         │
│  ├─ controllers/userController.ts - Business logic          │
│  ├─ models/user.ts - User model                             │
│  └─ middleware/auth.ts - Authentication                     │
│                                                              │
│  API Endpoints:                                             │
│  ├─ GET    /api/users - List all users                      │
│  ├─ POST   /api/users - Create user                         │
│  ├─ GET    /api/users/:id - Get user by ID                  │
│  ├─ PUT    /api/users/:id - Update user                     │
│  └─ DELETE /api/users/:id - Delete user                     │
│                                                              │
│  Validation results:                                        │
│  ✅ RESTful conventions followed                            │
│  ✅ TypeScript strict mode enabled                          │
│  ⚠️  Suggestion: Add rate limiting middleware               │
└─────────────────────────────────────────────────────────────┘
```

### Scenario 2: "Fix the bug in checkout flow"

```
┌─────────────────────────────────────────────────────────────┐
│  USER INPUT                                                  │
│  "Fix the bug in checkout flow"                             │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: ROUTING                                            │
│  ────────────────────────────────────────────────────────   │
│  Model analyzes:                                            │
│  ├─ Keywords: "fix", "bug"                                  │
│  ├─ Domain: Debugging                                       │
│  ├─ Task: Bug investigation and fix                         │
│  └─ Complexity: Unknown (needs investigation)               │
│                                                              │
│  Selected Agent: debugger                                   │
│  Confidence: 90%                                            │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: AGENT ACTIVATION                                   │
│  ────────────────────────────────────────────────────────   │
│  Agent: debugger                                            │
│  Skills loaded:                                             │
│  ├─ systematic-debugging (debugging methodology)            │
│  └─ clean-code (code quality principles)                    │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 3: INVESTIGATION                                      │
│  ────────────────────────────────────────────────────────   │
│  Claude (as debugger) follows systematic-debugging:         │
│                                                              │
│  Step 1: Identify checkout-related files                    │
│  $ grep -r "checkout" --include="*.ts" --include="*.tsx"    │
│                                                              │
│  Found:                                                     │
│  ├─ pages/checkout.tsx                                      │
│  ├─ components/CheckoutForm.tsx                             │
│  ├─ api/checkout/route.ts                                   │
│  └─ hooks/useCheckout.ts                                    │
│                                                              │
│  Step 2: Read files to understand flow                      │
│  ├─ Read pages/checkout.tsx                                 │
│  ├─ Read components/CheckoutForm.tsx                        │
│  └─ Read hooks/useCheckout.ts                               │
│                                                              │
│  Step 3: Analyze for bugs                                  │
│  Found issue in hooks/useCheckout.ts:                       │
│  - Missing error handling in payment processing             │
│  - Race condition in state updates                          │
│  - Memory leak (useEffect cleanup missing)                  │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 4: FIX IMPLEMENTATION                                 │
│  ────────────────────────────────────────────────────────   │
│  Claude edits hooks/useCheckout.ts:                         │
│                                                              │
│  Changes:                                                   │
│  1. Added try-catch for payment API                         │
│  2. Used useRef to prevent race condition                   │
│  3. Added cleanup in useEffect                              │
│  4. Improved error messages                                 │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 5: VALIDATION                                         │
│  ────────────────────────────────────────────────────────   │
│  Hook triggers:                                             │
│                                                              │
│  File: hooks/useCheckout.ts                                 │
│  → Matched extension: '.ts'                                 │
│  → Validator: type_coverage.py                              │
│  → Result: ✅ All checks passed                             │
│                                                              │
│  (If it were .tsx:)                                         │
│  → Would also run react_performance_checker.py              │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 6: RESPONSE                                           │
│  ────────────────────────────────────────────────────────   │
│  I found and fixed 3 bugs in the checkout flow:             │
│                                                              │
│  1. Missing Error Handling (hooks/useCheckout.ts:45)        │
│     - Added try-catch for payment processing                │
│     - Users now see proper error messages                   │
│                                                              │
│  2. Race Condition (hooks/useCheckout.ts:78)                │
│     - Used useRef to prevent state update race              │
│     - Checkout now reliable under slow connections          │
│                                                              │
│  3. Memory Leak (hooks/useCheckout.ts:92)                   │
│     - Added useEffect cleanup                               │
│     - Fixed subscription leak                               │
│                                                              │
│  Validation: ✅ All type checks passed                      │
│                                                              │
│  To test:                                                   │
│  1. Try checkout with valid card                            │
│  2. Try checkout with invalid card (error handling)         │
│  3. Navigate away during checkout (cleanup verified)        │
└─────────────────────────────────────────────────────────────┘
```

---

## SO SÁNH `.AGENT/` VS `.CLAUDE/`

### Structural Differences

| Aspect | `.agent/` (Antigravity Gốc) | `.claude/` (Claude Code) |
|--------|----------------------------|--------------------------|
| **Discovery** | ❌ Manual indexing needed | ✅ Auto-discovery at startup |
| **Routing** | ❌ Custom routing logic | ✅ Model-based routing (no code) |
| **Bootstrap** | ❌ Requires bootstrap.py | ✅ Automatic (built-in) |
| **Memory** | ❌ Load all upfront | ✅ Progressive loading |
| **Hooks** | ❌ Not implemented | ✅ Native support |
| **Distribution** | ❌ Manual copy | ✅ Plugin marketplace |
| **Validation** | ⚠️ Manual execution | ✅ Automatic (via hooks) |

### Workflow Comparison

#### `.agent/` Workflow (Antigravity Gốc)

```
User Request
     │
     ▼
❌ Manual: Load bootstrap.py
     │
     ▼
❌ Manual: Run routing logic
     │
     ▼
❌ Manual: Load agent files
     │
     ▼
❌ Manual: Load skill files
     │
     ▼
✅ Execute task
     │
     ▼
❌ Manual: Run validators
     │
     ▼
Response
```

#### `.claude/` Workflow (Claude Code)

```
User Request
     │
     ▼
✅ Auto: Model analyzes (routing)
     │
     ▼
✅ Auto: Agent activated
     │
     ▼
✅ Auto: Skills loaded (on-demand)
     │
     ▼
✅ Execute task
     │
     ▼
✅ Auto: Hooks trigger validators
     │
     ▼
Response
```

### Key Improvements

1. **No Manual Bootstrapping**
   - `.agent/`: Requires running `bootstrap.py` to load components
   - `.claude/`: Auto-loads at startup

2. **Intelligent Routing**
   - `.agent/`: Needs custom routing logic (if-else chains)
   - `.claude/`: Model analyzes descriptions and selects agent

3. **Progressive Loading**
   - `.agent/`: Load all skills upfront (high memory)
   - `.claude/`: Load descriptions only, references on-demand

4. **Automatic Validation**
   - `.agent/`: Manual script execution
   - `.claude/`: Hooks trigger after Edit/Write

5. **Plugin Distribution**
   - `.agent/`: Manual copy to projects
   - `.claude/`: Install via `/plugin install` from marketplace

---

## 🎯 TÓM TẮT

### Logic Xử Lý Input (End-to-End)

```
1. USER INPUT
   │
   ▼
2. MODEL ROUTING (via descriptions in CLAUDE.md)
   ├─ Keyword analysis
   ├─ Domain detection
   └─ Agent selection (95% confidence)
   │
   ▼
3. AGENT ACTIVATION
   ├─ Load agent system prompt
   ├─ Load required skills (progressive)
   └─ Set tool permissions
   │
   ▼
4. SKILL LOADING (On-Demand)
   ├─ Load SKILL.md (content map)
   ├─ Load references (if needed)
   └─ Apply domain knowledge
   │
   ▼
5. TASK EXECUTION
   ├─ Agent uses tools (Read, Write, Edit, etc.)
   ├─ Follows skill guidelines
   └─ Generates output
   │
   ▼
6. HOOKS EXECUTION (Automatic)
   ├─ PostToolUse triggered
   ├─ Dispatcher routes to validator
   └─ Validator runs checks
   │
   ▼
7. VALIDATION RESULTS
   ├─ Parse validator output
   ├─ Report findings to user
   └─ (Optional) Claude fixes issues
   │
   ▼
8. RESPONSE TO USER
   └─ Final output with validation status
```

### Thành Phần Chính

| Component | Purpose | Auto-Loaded? |
|-----------|---------|--------------|
| **CLAUDE.md** | Project conventions, routing matrix | ✅ Yes (startup) |
| **Agents** | Specialized AI personas (20) | ✅ Descriptions only |
| **Skills** | Domain knowledge modules (36+) | ✅ Descriptions only |
| **Hooks** | Event-triggered automation | ✅ Yes (config only) |
| **Validators** | Code quality checks (18) | ❌ No (run by hooks) |

### Memory Footprint

| Stage | Content | Size |
|-------|---------|------|
| **Startup** | CLAUDE.md + Agent descriptions + Skill descriptions | ~127KB |
| **Agent Active** | + Full agent + Skills (SKILL.md) | ~200KB |
| **Reference Loaded** | + Reference files (on-demand) | ~225KB per reference |
| **Validators** | External process (no context cost) | 0KB |

---

**End of Flow Analysis**

Tài liệu này cung cấp cái nhìn chi tiết về cách Claude Code xử lý input khi có `.claude/` plugin, giúp hiểu rõ:
- Bootstrap process (tự động)
- Agent selection logic (model-based)
- Skill loading mechanism (progressive)
- Hooks execution flow (event-driven)
- Validation pipeline (automatic)

Tất cả đều dựa trên **official documentation** và **actual codebase analysis**.
