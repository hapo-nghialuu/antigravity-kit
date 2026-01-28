# AskUserQuestion Tool Integration Analysis

> **Goal:** Replace all manual question-asking patterns in Antigravity Kit with Claude Code's native `AskUserQuestion` tool

---

## 📚 AskUserQuestion Tool Documentation

### Purpose
- **Clarifying questions** when task has multiple valid approaches
- Pause execution until user provides answers
- Especially useful in **plan mode** for gathering requirements

### When to Use
- Multiple valid implementation approaches exist
- Need user input to make architectural decisions
- Complex tasks requiring clarification before proceeding

### Tool Schema

**Input Format:**
```json
{
  "questions": [
    {
      "question": "Full question text to display",
      "header": "Short label (max 12 chars)",
      "options": [
        {
          "label": "Option 1",
          "description": "What this option means and its implications"
        },
        {
          "label": "Option 2",
          "description": "What this option means"
        }
      ],
      "multiSelect": false  // or true for multiple selections
    }
  ]
}
```

**Response Format:**
```json
{
  "questions": [...],  // Pass through original
  "answers": {
    "Full question text": "Selected label",
    "Another question": "Label1, Label2"  // Multi-select joined
  }
}
```

### Constraints
- **1-4 questions** per call
- **2-4 options** per question
- **60-second timeout** for user response
- **Not available in subagents** (spawned via Task tool)
- User can always type "Other" for free-text input

---

## 🔍 Current Question-Asking Patterns in Codebase

### Pattern 1: Socratic Gate (brainstorming skill)

**Location:** `.claude/skills/brainstorming/SKILL.md`

**Current Approach:**
```markdown
### 🚫 MANDATORY: 3 Questions Before Implementation

1. **STOP** - Do NOT start coding
2. **ASK** - Minimum 3 questions:
   - 🎯 Purpose: What problem are you solving?
   - 👥 Users: Who will use this?
   - 📦 Scope: Must-have vs nice-to-have?
3. **WAIT** - Get response before proceeding
```

**Problem:**
- Manual text output, no structured tool
- No guarantee user will answer
- No programmatic answer capture

---

### Pattern 2: Dynamic Question Generation

**Location:** `.claude/skills/brainstorming/dynamic-questioning.md`

**Current Approach:**
```markdown
### [PRIORITY] **[DECISION POINT]**

**Question:** [Clear question]

**Why This Matters:**
- [Architectural consequence]

**Options:**
| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| A | [+] | [-] | [Use case] |

**If Not Specified:** [Default + rationale]
```

**Problem:**
- Markdown table output, not tool invocation
- User must manually type answer in chat
- No structured answer capture

---

### Pattern 3: Orchestrator Clarification

**Location:** `.claude/agents/orchestrator.md`

**Current Approach:**
```markdown
Before I coordinate the agents, I need to understand your requirements better:
1. [Specific question about scope]
2. [Specific question about priority]
3. [Specific question about any unclear aspect]
```

**Problem:**
- Relies on text-based Q&A
- No structured multi-choice presentation

---

### Pattern 4: /brainstorm Command

**Location:** `.claude/commands/brainstorm.md`

**Current Approach:**
- Asks for topic
- Generates 3+ options with pros/cons
- User types preference in chat

**Problem:**
- User must read full markdown output
- Manual selection via text

---

## 🎯 Refactoring Strategy

### Phase 1: Core Skills Refactor

**Files to Update:**

1. **`.claude/skills/brainstorming/SKILL.md`**
   - Replace "STOP → ASK → WAIT" with AskUserQuestion tool invocation
   - Convert 3 mandatory questions to tool format

2. **`.claude/skills/brainstorming/dynamic-questioning.md`**
   - Update question format template to use AskUserQuestion
   - Provide examples with tool invocation
   - Keep domain-specific question banks but format for tool

3. **`.claude/agents/orchestrator.md`**
   - Replace clarification section with AskUserQuestion tool usage
   - Update checkpoint system to include tool invocation

4. **`.claude/commands/brainstorm.md`**
   - Update behavior to use AskUserQuestion for option selection

---

### Phase 2: Agent-Level Integration

**Agents with Question Patterns (from grep results):**
- security-auditor.md
- project-planner.md
- product-owner.md
- product-manager.md
- performance-optimizer.md
- penetration-tester.md
- mobile-developer.md
- game-developer.md
- frontend-specialist.md
- explorer-agent.md
- documentation-writer.md
- devops-engineer.md
- debugger.md
- database-architect.md
- backend-specialist.md

**Action:**
- Search for "Should I", "Would you like", "Do you want" patterns
- Replace with AskUserQuestion tool invocation
- Ensure questions fit 1-4 question, 2-4 option constraints

---

### Phase 3: Skill-Level Integration

**Skills with Question Patterns:**
- vulnerability-scanner/SKILL.md
- systematic-debugging/SKILL.md
- plan-writing/SKILL.md
- nodejs-best-practices/SKILL.md
- nextjs-react-expert/SKILL.md
- mobile-design/SKILL.md
- mcp-builder/SKILL.md
- intelligent-routing/SKILL.md
- geo-fundamentals/SKILL.md
- frontend-design/SKILL.md
- database-design/SKILL.md
- architecture/SKILL.md
- api-patterns/SKILL.md

---

## 📋 Updated Templates

### Template 1: Socratic Gate with AskUserQuestion

**Before:**
```markdown
### 🚫 MANDATORY: 3 Questions Before Implementation

1. **STOP** - Do NOT start coding
2. **ASK** - Minimum 3 questions:
   - 🎯 Purpose: What problem are you solving?
   - 👥 Users: Who will use this?
   - 📦 Scope: Must-have vs nice-to-have?
3. **WAIT** - Get response before proceeding
```

**After:**
```markdown
### 🚫 MANDATORY: Use AskUserQuestion Tool Before Implementation

**Trigger Conditions:**
- "Build/Create/Make [thing]" without details
- Complex feature or architecture
- Update/change request
- Vague requirements

**Protocol:**
1. **STOP** - Do NOT start coding
2. **INVOKE** AskUserQuestion tool with these questions:

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

3. **WAIT** - Process user answers before proceeding
4. **APPLY** - Use answers to inform implementation approach
```

---

### Template 2: Dynamic Question with Trade-offs

**Before:**
```markdown
### [P0] **Photo Storage Strategy**

**Question:** Where will user photos be stored and served?

**Why This Matters:**
- Affects: Monthly hosting costs, page load speed, CDN complexity

**Options:**
| Option | Cost | Speed | Best For |
|--------|------|-------|----------|
| Cloudinary | $89/mo | Fast | MVP |
| AWS S3 | $0.023/GB | Fast | Production |

**If Not Specified:** Cloudinary (balanced for MVP)
```

**After:**
```json
{
  "question": "Where should user photos be stored and served from?",
  "header": "Storage",
  "options": [
    {
      "label": "Cloudinary",
      "description": "$89/mo (25GB), Fast CDN, Low complexity - Best for MVP rapid launch"
    },
    {
      "label": "AWS S3 + CloudFront",
      "description": "$0.023/GB, Fast CDN, Medium complexity - Best for production cost optimization"
    },
    {
      "label": "Supabase Storage",
      "description": "Free tier 1GB, Medium speed, Low complexity - Best for small scale"
    },
    {
      "label": "Local Storage",
      "description": "Server cost only, Slow, Low complexity - Development only, not for production"
    }
  ],
  "multiSelect": false
}
```

**Default Handling:**
```markdown
**If user doesn't answer within 60 seconds:**
- Use Cloudinary as default (balanced for MVP)
- Note: This is a temporary choice, can be changed later
```

---

### Template 3: Multi-Select Questions

**Use Case:** "Which features should I include?"

```json
{
  "question": "Which sections should be included in the documentation?",
  "header": "Sections",
  "options": [
    {
      "label": "Introduction",
      "description": "Opening context and overview of the project"
    },
    {
      "label": "API Reference",
      "description": "Detailed API endpoint documentation"
    },
    {
      "label": "Examples",
      "description": "Code examples and usage patterns"
    },
    {
      "label": "Troubleshooting",
      "description": "Common issues and solutions"
    }
  ],
  "multiSelect": true
}
```

**Answer Processing:**
```
If user selects: Introduction, API Reference, Examples
→ answers["Which sections should be included in the documentation?"] = "Introduction, API Reference, Examples"
```

---

## 🔄 Migration Checklist

### Skill: brainstorming

- [ ] Update SKILL.md Socratic Gate section
- [ ] Refactor dynamic-questioning.md templates
- [ ] Add AskUserQuestion invocation examples
- [ ] Update domain-specific question banks (E-commerce, Auth, Real-time, CMS)
- [ ] Add free-text fallback instructions

### Agent: orchestrator

- [ ] Update clarification section
- [ ] Replace pre-flight check questions with AskUserQuestion
- [ ] Add tool invocation to checkpoint system
- [ ] Update example orchestrations

### Command: /brainstorm

- [ ] Update behavior section
- [ ] Replace markdown table output with tool invocation
- [ ] Add answer processing logic

### All Agents (15 files)

- [ ] Search for "Should I" patterns
- [ ] Search for "Would you like" patterns
- [ ] Search for "What/Which/How" questions
- [ ] Replace with AskUserQuestion tool format
- [ ] Ensure max 4 questions per invocation
- [ ] Ensure 2-4 options per question

### All Skills (13 files)

- [ ] Same as agents above
- [ ] Update decision trees to include tool invocation
- [ ] Preserve principle-based guidance

---

## 🎯 Benefits of AskUserQuestion Integration

| Before | After |
|--------|-------|
| ❌ Manual text Q&A | ✅ Structured tool invocation |
| ❌ User types answer in chat | ✅ User clicks option |
| ❌ No answer validation | ✅ Forced selection from options |
| ❌ Markdown table parsing | ✅ Programmatic answer access |
| ❌ No timeout handling | ✅ 60-second timeout with defaults |
| ❌ Agents guess if unclear | ✅ Execution pauses until answered |

---

## 🚧 Constraints to Remember

1. **1-4 questions max** per AskUserQuestion call
   - If more questions needed → Multiple tool calls
   - Or prioritize to P0/P1 questions only

2. **2-4 options max** per question
   - If more options → Group similar options
   - Always support "Other" for free-text

3. **60-second timeout**
   - Provide sensible default for each question
   - Document what happens if user doesn't answer

4. **Not in subagents**
   - AskUserQuestion only works in main conversation
   - Subagents spawned via Task tool cannot use it
   - Orchestrator can ask, but not its invoked agents

5. **Free-text support**
   - Always allow "Other" option
   - Use user's custom text directly in answers

---

## 📝 Implementation Priority

### Phase 1: Core Brainstorming (HIGH PRIORITY)
- `.claude/skills/brainstorming/SKILL.md`
- `.claude/skills/brainstorming/dynamic-questioning.md`
- These are fundamental to Socratic Gate

### Phase 2: Orchestrator (HIGH PRIORITY)
- `.claude/agents/orchestrator.md`
- Central coordination agent
- Most complex tasks flow through it

### Phase 3: User-Facing Commands (MEDIUM)
- `.claude/commands/brainstorm.md`
- Direct user interaction

### Phase 4: Specialist Agents (MEDIUM)
- 15 agents with question patterns
- Update individually

### Phase 5: Domain Skills (LOW)
- 13 skills with question patterns
- Most inherit from brainstorming skill

---

## 🎯 Success Criteria

- ✅ All Socratic Gate invocations use AskUserQuestion tool
- ✅ All clarification checkpoints use AskUserQuestion tool
- ✅ No "Should I..." or "Would you like..." text questions remain
- ✅ All questions have 2-4 options with descriptions
- ✅ All questions have defaults documented
- ✅ Free-text "Other" option always available
- ✅ Multi-select used where appropriate
- ✅ Questions grouped to fit 1-4 per call constraint

---

**Next Step:** Begin refactoring Phase 1 (Core Brainstorming) files.
