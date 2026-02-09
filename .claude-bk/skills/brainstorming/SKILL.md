---
name: brainstorming
description: Socratic questioning protocol + user communication. MANDATORY for complex requests, new features, or unclear requirements. Includes progress reporting and error handling.
allowed-tools: Read, Glob, Grep
---

# Brainstorming & Communication Protocol

> **MANDATORY:** Use for complex/vague requests, new features, updates.

---

## 🛑 SOCRATIC GATE (ENFORCEMENT)

### When to Trigger

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | 🛑 Use AskUserQuestion tool |
| Complex feature or architecture | 🛑 Clarify before implementing |
| Update/change request | 🛑 Confirm scope |
| Vague requirements | 🛑 Ask purpose, users, constraints |

### 🚫 MANDATORY: Use AskUserQuestion Tool Before Implementation

**CRITICAL:** Claude Code provides the `AskUserQuestion` tool for structured clarification. **ALWAYS use this tool** instead of text-based questions.

**Protocol:**
1. **STOP** - Do NOT start coding
2. **INVOKE** - Use AskUserQuestion tool with minimum 3 questions
3. **WAIT** - Tool execution pauses until user answers
4. **PROCEED** - Use answers to inform implementation

**Required Questions (Use AskUserQuestion tool):**

```json
{
  "questions": [
    {
      "question": "What problem are you trying to solve with this feature?",
      "header": "Purpose",
      "options": [
        {
          "label": "User pain point",
          "description": "Solving a specific user problem or friction"
        },
        {
          "label": "Business goal",
          "description": "Meeting a business objective or metric"
        },
        {
          "label": "Technical debt",
          "description": "Improving existing system quality or maintainability"
        },
        {
          "label": "Competitive parity",
          "description": "Matching features from competitors"
        }
      ],
      "multiSelect": false
    },
    {
      "question": "Who is the primary user of this feature?",
      "header": "Users",
      "options": [
        {
          "label": "End users",
          "description": "Direct product users (customers/visitors)"
        },
        {
          "label": "Developers",
          "description": "Internal team members building the product"
        },
        {
          "label": "Admins",
          "description": "Platform administrators or moderators"
        },
        {
          "label": "Multiple roles",
          "description": "Feature serves multiple user types"
        }
      ],
      "multiSelect": false
    },
    {
      "question": "What is the scope of this work?",
      "header": "Scope",
      "options": [
        {
          "label": "MVP only",
          "description": "Minimum viable version to validate the idea"
        },
        {
          "label": "Production-ready",
          "description": "Full implementation with error handling, tests, docs"
        },
        {
          "label": "Specific module",
          "description": "Limited to one area of the system"
        },
        {
          "label": "Full system",
          "description": "Affects multiple components or layers"
        }
      ],
      "multiSelect": false
    }
  ]
}
```

**Answer Processing:**
- Answers are captured programmatically via the tool
- User selects from options (or provides custom "Other" text)
- 60-second timeout with sensible defaults
- Proceed only after receiving answers

---

## 🧠 Dynamic Question Generation

**⛔ NEVER use static templates.** Read `dynamic-questioning.md` for principles.

### Core Principles

| Principle | Meaning |
|-----------|---------|
| **Questions Reveal Consequences** | Each question connects to an architectural decision |
| **Context Before Content** | Understand greenfield/feature/refactor/debug context first |
| **Minimum Viable Questions** | Each question must eliminate implementation paths |
| **Generate Data, Not Assumptions** | Don't guess—ask with trade-offs |

### Question Generation Process

```
1. Parse request → Extract domain, features, scale indicators
2. Identify decision points → Blocking vs. deferable
3. Generate questions → Priority: P0 (blocking) > P1 (high-leverage) > P2 (nice-to-have)
4. Format with trade-offs → What, Why, Options, Default
```

### Question Format (MANDATORY)

```markdown
### [PRIORITY] **[DECISION POINT]**

**Question:** [Clear question]

**Why This Matters:**
- [Architectural consequence]
- [Affects: cost/complexity/timeline/scale]

**Options:**
| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| A | [+] | [-] | [Use case] |

**If Not Specified:** [Default + rationale]
```

**For detailed domain-specific question banks and algorithms**, see: `dynamic-questioning.md`

---

## Progress Reporting (PRINCIPLE-BASED)

**PRINCIPLE:** Transparency builds trust. Status must be visible and actionable.

### Status Board Format

| Agent | Status | Current Task | Progress |
|-------|--------|--------------|----------|
| [Agent Name] | ✅🔄⏳❌⚠️ | [Task description] | [% or count] |

### Status Icons

| Icon | Meaning | Usage |
|------|---------|-------|
| ✅ | Completed | Task finished successfully |
| 🔄 | Running | Currently executing |
| ⏳ | Waiting | Blocked, waiting for dependency |
| ❌ | Error | Failed, needs attention |
| ⚠️ | Warning | Potential issue, not blocking |

---

## Error Handling (PRINCIPLE-BASED)

**PRINCIPLE:** Errors are opportunities for clear communication.

### Error Response Pattern

```
1. Acknowledge the error
2. Explain what happened (user-friendly)
3. Offer specific solutions with trade-offs
4. Ask user to choose or provide alternative
```

### Error Categories

| Category | Response Strategy |
|----------|-------------------|
| **Port Conflict** | Offer alternative port or close existing |
| **Dependency Missing** | Auto-install or ask permission |
| **Build Failure** | Show specific error + suggested fix |
| **Unclear Error** | Ask for specifics: screenshot, console output |

---

## Completion Message (PRINCIPLE-BASED)

**PRINCIPLE:** Celebrate success, guide next steps.

### Completion Structure

```
1. Success confirmation (celebrate briefly)
2. Summary of what was done (concrete)
3. How to verify/test (actionable)
4. Next steps suggestion (proactive)
```

---

## Communication Principles

| Principle | Implementation |
|-----------|----------------|
| **Concise** | No unnecessary details, get to point |
| **Visual** | Use emojis (✅🔄⏳❌) for quick scanning |
| **Specific** | "~2 minutes" not "wait a bit" |
| **Alternatives** | Offer multiple paths when stuck |
| **Proactive** | Suggest next step after completion |

---

## Anti-Patterns (AVOID)

| Anti-Pattern | Why |
|--------------|-----|
| Jumping to solutions before understanding | Wastes time on wrong problem |
| Assuming requirements without asking | Creates wrong output |
| Over-engineering first version | Delays value delivery |
| Ignoring constraints | Creates unusable solutions |
| "I think" phrases | Uncertainty → Ask instead |

---
