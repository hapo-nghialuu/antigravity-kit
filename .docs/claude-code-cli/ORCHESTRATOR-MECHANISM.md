# 🎭 Orchestrator Mechanism trong `.claude/`

> Phân tích chi tiết về cơ chế multi-agent orchestration trong Claude Code

**Trạng thái:** ✅ **CÓ** - Orchestrator agent được implement đầy đủ trong `.claude/agents/orchestrator.md`

---

## 📋 OVERVIEW

### Orchestrator là gì?

**Orchestrator** là một **special agent** trong `.claude/` plugin có khả năng:

1. **Điều phối nhiều agents** - Coordinate 2-5 specialized agents
2. **Decompose complex tasks** - Chia task phức tạp thành subtasks
3. **Synthesize results** - Tổng hợp kết quả từ nhiều agents
4. **Enforce boundaries** - Đảm bảo agents không vượt domain

### Vị trí trong Plugin

```
.claude/
├── agents/
│   ├── orchestrator.md           ✅ Master coordinator
│   ├── frontend-specialist.md    → Domain agent
│   ├── backend-specialist.md     → Domain agent
│   ├── security-auditor.md       → Domain agent
│   └── ... (16 more agents)
│
└── skills/
    ├── parallel-agents/          ✅ Multi-agent coordination patterns
    ├── behavioral-modes/         ✅ Agent personas
    └── intelligent-routing/      ✅ Auto-routing rules
```

---

## 🎯 CƠ CHẾ HOẠT ĐỘNG

### 1. Khi Nào Orchestrator Được Kích Hoạt?

#### **Tự Động** (via Model Routing)

Model phân tích user input và chọn orchestrator khi:

| Điều kiện | Ví dụ User Input | Lý do |
|-----------|-----------------|-------|
| **Multi-domain task** | "Build a secure e-commerce site" | Security + Frontend + Backend + Database |
| **Complex task** | "Review and improve authentication" | Audit + Code review + Testing |
| **Keywords detected** | "comprehensive", "full analysis", "multi-perspective" | Explicit orchestration request |
| **2+ domains** | "Create login with dark mode UI" | Security (auth) + Frontend (UI) |

#### **Thủ Công** (via User Command)

```bash
# User explicitly invokes orchestrator
/orchestrate "Build authentication system"

# Or via intelligent routing
"Use orchestrator to coordinate security and backend review"
```

### 2. Orchestrator Frontmatter

```yaml
---
name: orchestrator
description: Multi-agent coordination and task orchestration. Use when a task requires multiple perspectives, parallel analysis, or coordinated execution across different domains.
tools: Read, Grep, Glob, Bash, Write, Edit, Agent  # ✅ HAS Agent tool
model: inherit
skills:
  - clean-code
  - parallel-agents          # Multi-agent patterns
  - behavioral-modes         # Agent personas
  - plan-writing
  - brainstorming
  - architecture
  - lint-and-validate
  - powershell-windows
  - bash-linux
---
```

**Đặc biệt:** `tools: Agent` - Cho phép orchestrator invoke các agents khác

---

## 🔄 ORCHESTRATION WORKFLOW (Chi Tiết)

### Flow Diagram Hoàn Chỉnh

```
┌────────────────────────────────────────────────────────────┐
│  USER INPUT (Complex Task)                                 │
│  "Review and improve the authentication system"            │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 1: MODEL ROUTING                                     │
│  ───────────────────────────────────────────────────────   │
│  Model analyzes:                                           │
│  ├─ Keywords: "review", "improve", "authentication"        │
│  ├─ Domains detected:                                      │
│  │  ├─ Security (authentication)                           │
│  │  ├─ Backend (system implementation)                     │
│  │  └─ Testing (verification)                              │
│  ├─ Complexity: High (multiple domains)                    │
│  └─ Decision: Use orchestrator                             │
│                                                             │
│  Selected Agent: orchestrator                              │
│  Confidence: 90%                                           │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 2: ORCHESTRATOR ACTIVATION                          │
│  ───────────────────────────────────────────────────────   │
│  Source: .claude/agents/orchestrator.md                    │
│                                                             │
│  Loaded config:                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ name: orchestrator                                   │ │
│  │ tools: Read, Grep, Glob, Bash, Write, Edit, Agent   │ │
│  │ skills: parallel-agents, behavioral-modes, ...       │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  System prompt loaded:                                     │
│  "You are the master orchestrator agent. You coordinate    │
│   multiple specialized agents using Claude Code's native   │
│   Agent Tool to solve complex tasks..."                    │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 3: PRE-FLIGHT CHECKS (MANDATORY)                    │
│  ───────────────────────────────────────────────────────   │
│  🔴 STEP 0: Verify PLAN.md                                 │
│                                                             │
│  Orchestrator checks:                                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Check 1: Does PLAN.md exist?                         │ │
│  │ → Read docs/PLAN-auth-review.md                      │ │
│  │ → Status: ❌ NOT FOUND                               │ │
│  │                                                       │ │
│  │ Action: STOP specialist agent invocation             │ │
│  │ → Use project-planner agent first                    │ │
│  │ → Create PLAN.md                                     │ │
│  │ → THEN resume orchestration                          │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  🔴 VIOLATION if skipped:                                  │
│  "Invoking specialist agents without PLAN.md = FAILED"     │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 4: TASK DECOMPOSITION                               │
│  ───────────────────────────────────────────────────────   │
│  Orchestrator analyzes task:                               │
│                                                             │
│  Task: "Review and improve authentication system"          │
│                                                             │
│  Decomposed subtasks:                                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 1. Map codebase structure                            │ │
│  │    → Agent: explorer-agent                           │ │
│  │    → Purpose: Find auth-related files                │ │
│  │                                                       │ │
│  │ 2. Security audit                                    │ │
│  │    → Agent: security-auditor                         │ │
│  │    → Purpose: Identify vulnerabilities               │ │
│  │                                                       │ │
│  │ 3. Implementation review                             │ │
│  │    → Agent: backend-specialist                       │ │
│  │    → Purpose: Check code quality                     │ │
│  │                                                       │ │
│  │ 4. Test coverage analysis                            │ │
│  │    → Agent: test-engineer                            │ │
│  │    → Purpose: Find missing tests                     │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 5: AGENT INVOCATION (Sequential)                    │
│  ───────────────────────────────────────────────────────   │
│  Orchestrator invokes agents using Agent Tool:             │
│                                                             │
│  Step 1: Invoke explorer-agent                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Command:                                             │ │
│  │ "Use explorer-agent to map authentication-related    │ │
│  │  files in the codebase"                              │ │
│  │                                                       │ │
│  │ Agent executes...                                    │ │
│  │                                                       │ │
│  │ Result:                                              │ │
│  │ - Found: auth/login.ts, auth/register.ts            │ │
│  │ - Found: middleware/auth.ts                          │ │
│  │ - Found: utils/jwt.ts                                │ │
│  │ - Dependencies: bcrypt, jsonwebtoken                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  Step 2: Invoke security-auditor                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Command:                                             │ │
│  │ "Use security-auditor to review authentication       │ │
│  │  implementation for vulnerabilities. Focus on        │ │
│  │  files: auth/*, middleware/auth.ts, utils/jwt.ts"    │ │
│  │                                                       │ │
│  │ Agent executes...                                    │ │
│  │                                                       │ │
│  │ Result:                                              │ │
│  │ ✅ JWT implementation correct                        │ │
│  │ ⚠️  Missing rate limiting                            │ │
│  │ ❌ Password hashing uses weak algorithm (MD5)        │ │
│  │ ❌ No CSRF protection                                │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  Step 3: Invoke backend-specialist                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Command:                                             │ │
│  │ "Use backend-specialist to review code quality       │ │
│  │  and implementation patterns in authentication       │ │
│  │  system"                                             │ │
│  │                                                       │ │
│  │ Agent executes...                                    │ │
│  │                                                       │ │
│  │ Result:                                              │ │
│  │ ✅ Clean separation of concerns                      │ │
│  │ ⚠️  Error handling inconsistent                      │ │
│  │ ⚠️  Missing input validation in register route       │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  Step 4: Invoke test-engineer                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Command:                                             │ │
│  │ "Use test-engineer to analyze test coverage for      │ │
│  │  authentication system"                              │ │
│  │                                                       │ │
│  │ Agent executes...                                    │ │
│  │                                                       │ │
│  │ Result:                                              │ │
│  │ ⚠️  Coverage: 45% (below 80% target)                 │ │
│  │ ❌ No tests for password reset flow                  │ │
│  │ ❌ Missing integration tests                         │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 6: SYNTHESIS                                         │
│  ───────────────────────────────────────────────────────   │
│  Orchestrator combines findings:                           │
│                                                             │
│  ## Orchestration Report                                   │
│                                                             │
│  ### Task: Review and Improve Authentication System        │
│                                                             │
│  ### Agents Invoked                                        │
│  1. explorer-agent: Mapped auth files (4 files, 2 deps)    │
│  2. security-auditor: Found 2 critical, 1 warning          │
│  3. backend-specialist: Code quality issues                │
│  4. test-engineer: Low coverage (45%)                      │
│                                                             │
│  ### Key Findings                                          │
│                                                             │
│  🔴 **Critical Issues:**                                   │
│  - Weak password hashing (MD5) - MUST upgrade to bcrypt    │
│  - No CSRF protection - Vulnerable to cross-site attacks   │
│                                                             │
│  ⚠️  **Warnings:**                                         │
│  - Missing rate limiting - Risk of brute force             │
│  - Inconsistent error handling                             │
│  - Missing input validation in register route              │
│  - Low test coverage (45% vs 80% target)                   │
│                                                             │
│  ✅ **Strengths:**                                         │
│  - Clean separation of concerns                            │
│  - JWT implementation correct                              │
│                                                             │
│  ### Recommendations (Priority Order)                      │
│                                                             │
│  1. **CRITICAL - Security Fixes**                          │
│     - Replace MD5 with bcrypt (min 10 rounds)              │
│     - Implement CSRF protection (csurf middleware)         │
│     - Add rate limiting (express-rate-limit)               │
│                                                             │
│  2. **HIGH - Code Quality**                                │
│     - Standardize error handling (create error middleware) │
│     - Add input validation (joi/zod schemas)               │
│                                                             │
│  3. **MEDIUM - Testing**                                   │
│     - Write integration tests for auth flows               │
│     - Add unit tests for password reset                    │
│     - Target: 80% coverage                                 │
│                                                             │
│  ### Next Steps                                            │
│  - [ ] Fix critical security issues (Est: 2-3 hours)       │
│  - [ ] Improve code quality (Est: 3-4 hours)               │
│  - [ ] Increase test coverage (Est: 4-5 hours)             │
│  - [ ] Re-run security audit after fixes                   │
└────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│  PHASE 7: RESPONSE TO USER                                  │
│  ───────────────────────────────────────────────────────   │
│  Orchestrator presents unified report:                     │
│                                                             │
│  I've coordinated 4 specialized agents to comprehensively   │
│  review your authentication system. Here's what we found:   │
│                                                             │
│  [Full report from Phase 6]                                │
│                                                             │
│  Would you like me to:                                     │
│  1. Fix the critical security issues first?                │
│  2. Create a detailed implementation plan?                 │
│  3. Start with testing improvements?                       │
└────────────────────────────────────────────────────────────┘
```

---

## 🛡️ AGENT BOUNDARY ENFORCEMENT

### Cơ Chế Kiểm Soát

Orchestrator **enforce strict boundaries** để tránh agents vượt domain:

#### **File Type Ownership**

```yaml
File Ownership Matrix:

**/*.test.{ts,tsx,js}:
  Owner: test-engineer
  Blocked: ALL other agents

**/__tests__/**:
  Owner: test-engineer
  Blocked: ALL other agents

**/components/**:
  Owner: frontend-specialist
  Blocked: backend-specialist, test-engineer

**/api/**, **/server/**:
  Owner: backend-specialist
  Blocked: frontend-specialist

**/prisma/**, **/drizzle/**:
  Owner: database-architect
  Blocked: frontend-specialist
```

#### **Enforcement Protocol**

```python
# Orchestrator logic (conceptual - trong system prompt)

def before_agent_writes_file(agent, file_path):
    owner = get_file_owner(file_path)

    if owner != agent.name:
        STOP_AGENT()
        INVOKE_CORRECT_AGENT(owner, file_path)
        return BLOCKED

    return ALLOWED

# Example:
frontend_specialist.write("__tests__/Button.test.tsx")
→ Detected: test files belong to test-engineer
→ STOP frontend-specialist
→ INVOKE test-engineer
```

#### **Example Violation**

```
❌ WRONG:
Orchestrator invokes frontend-specialist
→ frontend-specialist writes: __tests__/TaskCard.test.tsx
→ VIOLATION: Test files belong to test-engineer

✅ CORRECT:
Orchestrator invokes frontend-specialist
→ frontend-specialist writes: components/TaskCard.tsx
→ Orchestrator then invokes test-engineer
→ test-engineer writes: __tests__/TaskCard.test.tsx
```

---

## 🎛️ NATIVE AGENT TOOL

### Cách Orchestrator Invoke Agents

Orchestrator sử dụng **Claude Code's native Agent Tool**:

#### **Single Agent Invocation**

```
Use the security-auditor agent to review authentication implementation
```

Internal flow:
```
Claude Code receives orchestrator instruction
    ↓
Parse agent name: "security-auditor"
    ↓
Load .claude/agents/security-auditor.md
    ↓
Create subagent context
    ↓
Execute security-auditor
    ↓
Return results to orchestrator
```

#### **Multiple Agents (Sequential)**

```
First, use the explorer-agent to map the codebase structure.
Then, use the backend-specialist to review API endpoints.
Finally, use the test-engineer to identify missing test coverage.
```

Execution:
```
Agent 1: explorer-agent
    ↓ (wait for completion)
Result 1 → Pass to orchestrator
    ↓
Agent 2: backend-specialist (receives context from Agent 1)
    ↓ (wait for completion)
Result 2 → Pass to orchestrator
    ↓
Agent 3: test-engineer (receives context from Agent 1 + 2)
    ↓ (wait for completion)
Result 3 → Pass to orchestrator
    ↓
Synthesize all results
```

#### **Agent Chaining with Context**

```
Use the frontend-specialist to analyze React components,
then have the test-engineer generate tests for the identified components.
```

Context flow:
```
orchestrator → frontend-specialist
    ↓ (analyzes components)
Result: ["Button.tsx", "Card.tsx", "Modal.tsx"]
    ↓
orchestrator → test-engineer (with component list)
    ↓ (generates tests for Button, Card, Modal)
Result: 3 test files created
```

---

## 🔍 CHECKPOINT SYSTEM

### Mandatory Pre-Flight Checks

Orchestrator **MUST verify** trước khi invoke specialists:

| Checkpoint | Verification | If Failed |
|------------|--------------|-----------|
| **PLAN.md exists?** | `Read docs/PLAN-*.md` | STOP → Use project-planner first |
| **Project type identified?** | Check for WEB/MOBILE/BACKEND | STOP → Ask user or analyze |
| **Agent routing correct?** | Mobile → mobile-developer ONLY | STOP → Reassign agents |
| **Socratic Gate passed?** | Complex tasks need clarification | STOP → Ask 3 questions |

### Violation Examples

#### ❌ **WRONG - Skip Checkpoint**

```
User: "Build an e-commerce site"

Orchestrator (WRONG):
❌ Skip PLAN.md check
❌ Directly invoke frontend-specialist
❌ Directly invoke backend-specialist
→ VIOLATION: Failed orchestration protocol
```

#### ✅ **CORRECT - Follow Checkpoint**

```
User: "Build an e-commerce site"

Orchestrator (CORRECT):
🔴 STEP 0: Pre-flight Check
→ Checking for PLAN.md...
→ PLAN.md NOT FOUND
→ STOPPING specialist agent invocation

→ "No PLAN.md found. Creating plan first..."
→ Use project-planner agent
→ After PLAN.md created → Resume orchestration
```

---

## 🧠 INTELLIGENT ROUTING TO ORCHESTRATOR

### Auto-Trigger Rules (từ CLAUDE.md)

Model tự động chọn orchestrator khi detect:

#### **Multi-Domain Detection**

```javascript
// Conceptual logic (trong model reasoning)

function shouldUseOrchestrator(userInput) {
    const domains = detectDomains(userInput);

    // Rule 1: Multiple domains
    if (domains.length >= 2) {
        return true; // Auto-select orchestrator
    }

    // Rule 2: Complex keywords
    const keywords = ["comprehensive", "full analysis", "review and improve"];
    if (containsAny(userInput, keywords)) {
        return true;
    }

    // Rule 3: Explicit orchestration request
    if (contains(userInput, "orchestrate") || contains(userInput, "/orchestrate")) {
        return true;
    }

    return false;
}

// Example:
userInput = "Create a secure login system with dark mode UI"
domains = ["security", "frontend"] // 2 domains
→ shouldUseOrchestrator() = true
→ Auto-select orchestrator
```

#### **Domain Detection Matrix**

```yaml
Request Analysis:

"Build a secure e-commerce site"
→ Domains:
  - Security: "secure" keyword
  - Frontend: "site" keyword
  - Backend: "e-commerce" implies API
  - Database: "e-commerce" implies products table
→ Total: 4 domains
→ Action: Auto-invoke orchestrator

"Optimize React component"
→ Domains:
  - Frontend: "React component"
→ Total: 1 domain
→ Action: Use frontend-specialist directly (NO orchestrator)
```

---

## 📊 SO SÁNH: ORCHESTRATOR vs SINGLE AGENT

| Aspect | Single Agent | Orchestrator |
|--------|--------------|--------------|
| **Task Complexity** | Simple, single-domain | Complex, multi-domain |
| **Agents Involved** | 1 | 2-5 |
| **Coordination** | N/A | Sequential invocation |
| **Synthesis** | Direct output | Unified report |
| **Example Task** | "Fix button style" | "Review and improve auth system" |
| **Memory Cost** | ~50KB (1 agent) | ~200KB (orchestrator + 4 agents) |
| **Execution Time** | Fast (1 agent) | Slower (sequential) |

---

## 🔗 INTEGRATION WITH SKILLS

### Orchestrator-Specific Skills

Orchestrator loads these skills:

```yaml
skills:
  - parallel-agents       # Multi-agent coordination patterns
  - behavioral-modes      # Agent personas & modes
  - plan-writing          # Task breakdown
  - brainstorming         # Socratic questioning
  - architecture          # System design patterns
  - clean-code            # Code quality principles
  - lint-and-validate     # Validation standards
```

#### **parallel-agents Skill**

Cung cấp patterns cho multi-agent coordination:

```markdown
# Parallel Agent Patterns

## Pattern 1: Sequential Invocation
Use when: Tasks have dependencies
Example: explorer → analysis → testing

## Pattern 2: Parallel Invocation
Use when: Tasks are independent
Example: frontend + backend (separate files)

## Pattern 3: Chained Invocation
Use when: Later agents need earlier results
Example: security-audit → fix → re-audit
```

#### **behavioral-modes Skill**

Định nghĩa agent behaviors:

```markdown
# Agent Behavioral Modes

| Mode | Behavior | When to Use |
|------|----------|-------------|
| ANALYZE | Read-only, no writes | Code review, audit |
| IMPLEMENT | Write code | Feature development |
| DEBUG | Root cause analysis | Bug investigation |
| REVIEW | Code quality check | Pre-merge review |
```

---

## 🎯 EXAMPLE SCENARIOS

### Scenario 1: "Build authentication system"

```
User: "Build authentication system"

┌─────────────────────────────────────────┐
│ MODEL ROUTING                            │
│ ────────────────────────────────────── │
│ Keywords: "build", "authentication"     │
│ Domains: Security + Backend + Testing   │
│ Complexity: High                        │
│ → Select: orchestrator                  │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ ORCHESTRATOR ACTIVATION                 │
│ ────────────────────────────────────── │
│ 🔴 Pre-flight: Check PLAN.md           │
│ → NOT FOUND                             │
│ → Use project-planner first             │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ PROJECT-PLANNER CREATES PLAN            │
│ ────────────────────────────────────── │
│ File: docs/PLAN-auth-system.md          │
│ Content:                                │
│ - Tech: Node.js + Express + JWT         │
│ - Tasks: Login, Register, Reset         │
│ - Database: User model                  │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ ORCHESTRATOR RESUMES                    │
│ ────────────────────────────────────── │
│ Invokes agents:                         │
│ 1. security-auditor (design review)     │
│ 2. backend-specialist (implement)       │
│ 3. database-architect (schema)          │
│ 4. test-engineer (tests)                │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ SYNTHESIS                               │
│ ────────────────────────────────────── │
│ Unified output:                         │
│ - Auth system implemented               │
│ - Security best practices applied       │
│ - Tests coverage: 85%                   │
│ - Ready for review                      │
└─────────────────────────────────────────┘
```

### Scenario 2: "Optimize React component" (NO Orchestrator)

```
User: "Optimize React component"

┌─────────────────────────────────────────┐
│ MODEL ROUTING                            │
│ ────────────────────────────────────── │
│ Keywords: "optimize", "React"           │
│ Domains: Frontend ONLY                  │
│ Complexity: Medium (single domain)      │
│ → Select: frontend-specialist           │
│ → NO orchestrator needed                │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ FRONTEND-SPECIALIST DIRECT              │
│ ────────────────────────────────────── │
│ 1. Read component                       │
│ 2. Apply React performance patterns     │
│ 3. Edit component                       │
│ 4. Hook triggers → validator runs       │
│ → Done (no orchestration needed)        │
└─────────────────────────────────────────┘
```

---

## 🔄 COMPARISON: `.agent/` vs `.claude/` ORCHESTRATOR

| Feature | `.agent/` (Gốc) | `.claude/` (Migrated) |
|---------|-----------------|---------------------|
| **Orchestrator Agent** | ✅ Yes | ✅ Yes (identical) |
| **Agent Tool** | ❌ Manual coordination | ✅ Native Agent Tool |
| **Auto-routing** | ❌ Manual invocation | ✅ Model-based |
| **Checkpoint System** | ⚠️ Optional | ✅ Mandatory |
| **Boundary Enforcement** | ⚠️ Guidelines only | ✅ Strict enforcement |
| **PLAN.md Requirement** | ⚠️ Recommended | ✅ MANDATORY |

---

## ✅ TÓM TẮT

### Orchestrator CÓ trong `.claude/`?

**✅ YES** - Đầy đủ và hoạt động

### Cơ Chế Chính

1. **Model-based selection** - Tự động chọn khi multi-domain
2. **Native Agent Tool** - Invoke specialists qua tool
3. **Checkpoint system** - PLAN.md mandatory
4. **Boundary enforcement** - Agents không vượt domain
5. **Sequential invocation** - Agents chạy tuần tự
6. **Synthesis** - Tổng hợp kết quả thống nhất

### Khi Nào Dùng?

| Use Orchestrator | Use Single Agent |
|-----------------|------------------|
| Multi-domain task | Single-domain task |
| Complex analysis | Simple modification |
| "Review and improve X" | "Fix X" |
| 2+ domains detected | 1 domain only |

### Ví Dụ

**Orchestrator Tasks:**
- "Build authentication system" (security + backend + database)
- "Review codebase for security and performance" (security + performance)
- "Create e-commerce site" (frontend + backend + database)

**Single Agent Tasks:**
- "Fix button styling" (frontend only)
- "Optimize API endpoint" (backend only)
- "Write tests for UserService" (testing only)

---

**Kết luận:** Orchestrator mechanism trong `.claude/` hoạt động **đầy đủ và tự động**, sử dụng Claude Code's native Agent Tool để coordinate multiple specialized agents cho complex tasks.
