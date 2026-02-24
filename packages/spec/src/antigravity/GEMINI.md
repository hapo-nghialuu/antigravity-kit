---
trigger: always_on
---

# GEMINI.md - Antigravity Kit

> This file defines how the AI behaves in this workspace.

---

## CRITICAL: AGENT & SKILL PROTOCOL (START HERE)

> **MANDATORY:** You MUST read the appropriate agent file and its skills BEFORE performing any implementation. This is the highest priority rule.

### 1. Modular Skill Loading Protocol

Agent activated → Check frontmatter "skills:" → Read SKILL.md (INDEX) → Read specific sections.

- **Selective Reading:** DO NOT read ALL files in a skill folder. Read `SKILL.md` first, then only read sections matching the user's request.
- **Rule Priority:** P0 (GEMINI.md) > P1 (Agent .md) > P2 (SKILL.md). All rules are binding.

### 2. Enforcement Protocol

1. **When agent is activated:**
    - ✅ Activate: Read Rules → Check Frontmatter → Load SKILL.md → Apply All.
2. **Forbidden:** Never skip reading agent rules or skill instructions. "Read → Understand → Apply" is mandatory.
3. **Artifact Ban:** DO NOT create "Implementation Plan" artifacts (sidebar artifacts) unless the user EXPLICITLY asks for them. Use standard markdown files in `docs/` or text responses instead.

---

## 📥 REQUEST CLASSIFIER (STEP 1)

**Before ANY action, classify the request:**

| Request Type     | Trigger Keywords                           | Active Tiers                   | Result                      |
| ---------------- | ------------------------------------------ | ------------------------------ | --------------------------- |
| **QUESTION**     | "what is", "how does", "explain"           | TIER 0 only                    | Text Response               |
| **SURVEY/INTEL** | "analyze", "list files", "overview"        | TIER 0 + Explorer              | Session Intel (No File)     |
| **SIMPLE CODE**  | "fix", "add", "change" (single file)       | TIER 0 + TIER 1 (lite)         | Inline Edit                 |
| **COMPLEX CODE** | "build", "create", "implement", "refactor" | TIER 0 + TIER 1 (full) + Agent | **{task-slug}.md Required** |
| **DESIGN/UI**    | "design", "UI", "page", "dashboard"        | TIER 0 + TIER 1 + Agent        | **{task-slug}.md Required** |
| **SLASH CMD**    | /spec-init, /spec-requirements, /spec-design, /spec-tasks, /spec-status, /code, /test, /review, /docs-init, /docs-update | Command-specific flow | Variable |

---

## TIER 0: UNIVERSAL RULES (Always Active)

### 💬 Response Format

All responses must generally follow this structure:
1. **Explanation**: Brief context/problem/solution.
2. **Implementation**: Code/Action with clear comments.
3. **Usage/Caveats**: (If applicable)
4. **Next Action:** (MANDATORY) Specific proposed next step.
   - Example: "Use `/spec-init` to start", "Review `docs/PLAN-x.md`", "Run `pytest`".

### 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

### 🧹 Clean Code (Global Mandatory)

- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern.
- **Performance**: Measure first. Adhere to 2025 standards (Core Web Vitals).
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.
- Concise, direct, solution-focused
- No verbose explanations
- No over-commenting
- No over-engineering
- **Artifact Control:** DO NOT create "Implementation Plan" artifacts (sidebar artifacts) unless the user EXPLICITLY asks for them. Use standard markdown files in `docs/` or text responses instead.
- **Self-Documentation:** Every agent is responsible for documenting their own changes in relevant `.md` files.

### 🗺️ System Map Read

**Path Awareness:**

- Skills: `.agent/skills/` (Project)
- Workflows: `.agent/workflows/` (Project)
- Models: `.agent/models/` (Project)
- Specs: `.specs/` (Project)

### 🧠 Read → Understand → Apply

```
❌ WRONG: Read agent file → Start coding
✅ CORRECT: Read → Understand WHY → Apply PRINCIPLES → Code
```

**Before coding, answer:**

1. What is the GOAL of this agent/skill?
2. What PRINCIPLES must I apply?
3. How does this DIFFER from generic output?

---

## TIER 1: CODE RULES (When Writing Code)

### 🛑 GLOBAL SOCRATIC GATE (TIER 0)

**MANDATORY: Every user request must pass through the Socratic Gate before ANY tool use or implementation.**

| Request Type            | Strategy       | Required Action                                                   |
| ----------------------- | -------------- | ----------------------------------------------------------------- |
| **New Feature / Build** | Deep Discovery | ASK minimum 3 strategic questions                                 |
| **Code Edit / Bug Fix** | Context Check  | Confirm understanding + ask impact questions                      |
| **Vague / Simple**      | Clarification  | Ask Purpose, Users, and Scope                                     |
| **Full Orchestration**  | Gatekeeper     | **STOP** subagents until user confirms plan details               |
| **Direct "Proceed"**    | Validation     | **STOP** → Even if answers are given, ask 2 "Edge Case" questions |

**Protocol:**

1. **Never Assume:** If even 1% is unclear, ASK.
2. **Handle Spec-heavy Requests:** When user gives a list (Answers 1, 2, 3...), do NOT skip the gate. Instead, ask about **Trade-offs** or **Edge Cases** (e.g., "LocalStorage confirmed, but should we handle data clearing or versioning?") before starting.
3. **Wait:** Do NOT invoke subagents or write code until the user clears the Gate.

---

## 📁 AVAILABLE WORKFLOWS

### Spec-Driven Development

| Command | Mô tả |
|---------|-------|
| `/spec-init <mô tả>` | Khởi tạo spec mới từ ý tưởng |
| `/spec-requirements <feature>` | Sinh requirements (EARS format) |
| `/spec-design <feature>` | Sinh design doc + research |
| `/spec-tasks <feature>` | Sinh task list |
| `/code <feature>` | Implement task từ spec và chuyển qua test/review |
| `/spec-status <feature>` | Xem trạng thái hiện tại |

### Documentation

| Command | Mô tả |
|---------|-------|
| `/docs-init` | Initialize project documentation |
| `/docs-update` | Update existing documentation |

**Usage:**
- Read `.agent/skills/specs/SKILL.md` for detailed workflow information
- Each workflow has its own file in `.agent/workflows/` with specific instructions

---

## 📁 QUICK REFERENCE

### Skills

- **specs**: Complete SDD workflow from idea to implementation

### Workflows Location

- Workflows: `.agent/workflows/`
- Skill definitions: `.agent/skills/`
- Spec data: `.specs/<feature-name>/`

---
