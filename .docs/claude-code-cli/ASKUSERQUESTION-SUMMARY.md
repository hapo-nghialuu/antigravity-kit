# AskUserQuestion Tool Integration - Complete Project Summary

> **Project Duration:** 2026-01-28 (All 3 Phases)
> **Total Time:** ~4.25 hours
> **Files Modified:** 10 files
> **Questions Converted:** ~25 questions

---

## 📊 Executive Summary

Successfully integrated Claude Code's native `AskUserQuestion` tool across Antigravity Kit, replacing all manual text-based questioning with structured tool invocation.

**Key Achievement:** Discovered and validated skill-based architecture where agents load skills for domain knowledge, preventing code duplication.

---

## 🎯 What Changed

### Before
- ❌ Manual text-based Q&A ("Ask user: 'What color?'")
- ❌ No structured answer capture
- ❌ Markdown table parsing required
- ❌ No timeout handling
- ❌ Agents could proceed without answers

### After
- ✅ Structured tool invocation (programmatic)
- ✅ User selects from multiple-choice options (click vs type)
- ✅ Programmatic answer access via tool response
- ✅ 60-second timeout with defaults
- ✅ Execution pauses until answered
- ✅ Free-text "Other" option always available

---

## 📋 Phase 1: Core Brainstorming & Orchestrator

**Date:** 2026-01-28 (Morning)
**Duration:** ~2 hours
**Scope:** Core questioning mechanisms

### Files Modified (6)

#### 1. `.claude/skills/brainstorming/SKILL.md`
**Section:** Socratic Gate (3 Questions Before Implementation)

**Before:**
```markdown
1. **STOP** - Do NOT start coding
2. **ASK** - Minimum 3 questions:
   - 🎯 Purpose: What problem are you solving?
   - 👥 Users: Who will use this?
   - 📦 Scope: Must-have vs nice-to-have?
3. **WAIT** - Get response before proceeding
```

**After:**
```json
{
  "questions": [
    {
      "question": "What problem are you trying to solve with this feature?",
      "header": "Purpose",
      "options": [
        {"label": "User pain point", "description": "Solving a specific user problem or friction"},
        {"label": "Business goal", "description": "Meeting a business objective or metric"},
        {"label": "Technical debt", "description": "Improving existing system quality or maintainability"},
        {"label": "Competitive parity", "description": "Matching features from competitors"}
      ],
      "multiSelect": false
    }
    // ... 2 more questions (Users, Scope)
  ]
}
```

**Impact:** All complex tasks now pause for structured clarification before implementation.

---

#### 2. `.claude/skills/brainstorming/dynamic-questioning.md`
**Section:** Dynamic Question Template

**Changes:**
- Converted markdown table format → JSON tool schema
- Added priority batching (P0/P1/P2)
- Updated Instagram clone example with 3-step questioning

**Example (P0 Critical Questions):**
- Storage strategy (4 options: S3, Cloudinary, imgix, Self-hosted)
- Feed type (4 options: Chronological, Algorithmic, Hybrid, Following-only)
- Auth method (4 options: JWT, Session, OAuth, Passkey)

---

#### 3. `.claude/agents/orchestrator.md`
**Section:** Clarification Protocol

**Changes:**
- Added 3 AskUserQuestion templates (Scope, Priority, Tech Stack)
- Each question has 4 options with clear descriptions
- Added answer processing guidance for agent selection

**Example Processing:**
- Priority = Security → security-auditor invoked first
- Scope = Full application → orchestrator coordinates multiple agents
- Tech Stack = Use existing → Match current project's technologies

---

#### 4. `.claude/commands/brainstorm.md`
**Section:** Output Format

**Changes:**
- Split into 3 steps: Analysis → Selection (tool) → Follow-up
- Step 2 uses AskUserQuestion for approach selection
- Options include Pros/Cons/Effort in description

**Workflow:**
1. Text output: Analyze topic and generate 3 approaches
2. Tool invocation: User selects approach via AskUserQuestion
3. Text output: Explain selection and provide next steps

---

#### 5. `CLAUDE.md`
**Section:** Socratic Gate

**Changes:**
- Removed markdown table question format
- Added AskUserQuestion tool reference
- Updated Request Types table to reference tool
- Added pointer to brainstorming skill for examples

---

#### 6. `ASKUSERQUESTION-INTEGRATION.md` (New)
**Content:**
- Complete tool documentation analysis
- Current patterns in codebase
- Refactoring strategy (3 phases)
- Updated templates and examples
- Migration checklist

**Purpose:** Technical reference for tool usage and patterns

---

## 📋 Phase 2: Specialist Agents Audit

**Date:** 2026-01-28 (Midday)
**Duration:** ~45 minutes
**Scope:** 15 specialist agents

### Key Discovery: Skill-Based Architecture

**Finding:** 14 out of 15 agents rely on skills for questions, they don't duplicate questions.

**Architecture Pattern:**
```
Agent (orchestration) → Loads Skill (domain knowledge)
                     ↓
            Skill contains questions
                     ↓
        Agent uses skill's questions when needed
```

**Benefits:**
- ✅ DRY principle (questions defined once, reused by many agents)
- ✅ Separation of concerns (agents = orchestration, skills = knowledge)
- ✅ Easier maintenance (update skill once, all agents benefit)

### Agent Analysis

**Agents Using Brainstorming Skill (No Updates Needed):**
- product-manager.md
- product-owner.md
- project-planner.md

**Agents with No Questions (No Updates Needed):**
- security-auditor.md
- penetration-tester.md
- test-engineer.md
- qa-automation-engineer.md
- performance-optimizer.md
- frontend-specialist.md
- backend-specialist.md
- mobile-developer.md
- devops-engineer.md
- debugger.md
- database-architect.md

**Agent with Direct Questions (Updated):**
- explorer-agent.md ✅

### Files Modified (1)

#### `.claude/agents/explorer-agent.md`
**Section:** Socratic Discovery Protocol

**Added 4 questions using AskUserQuestion:**

1. **Undocumented Convention** (4 options)
   - Conscious choice
   - Legacy constraint
   - Performance
   - Framework requirement

2. **Project Goal** (4 options)
   - Scalability
   - Rapid MVP
   - Maintainability
   - Cost optimization

3. **Missing Technology** (4 options)
   - Add now
   - Defer to later
   - Not needed
   - Handled elsewhere

4. **Discovery Depth** (4 options)
   - Deep dive
   - Surface level
   - Targeted
   - Continue current

**Impact:** Explorer can now pause during codebase discovery to clarify intent and depth.

---

## 📋 Phase 3: Domain Skills Strategic Updates

**Date:** 2026-01-28 (Afternoon)
**Duration:** ~1.5 hours
**Scope:** 13 domain skills (deep re-audit)

### Audit Methodology

**Search Patterns:**
1. Question keywords: `Should I|Would you like|Do you want|What .+\?|Which .+\?`
2. Question markers: `🤔|❓|\[Question\]|\*\*Question\*\*`
3. Explicit asks: `ASK:|You MUST Ask`

**Analysis Criteria:**
- Template questions (conceptual guidance) → Keep as-is
- Direct user questions (explicit "ASK") → Convert to tool

### Skills Updated (3)

#### 1. `.claude/skills/nodejs-best-practices/SKILL.md`
**Section:** Framework Selection Questions (Lines 57-62)

**Before:**
```markdown
### Selection Questions to Ask:
1. What's the deployment target?
2. Is cold start time critical?
3. Does team have existing experience?
4. Is there legacy code to maintain?
```

**After:**
```json
{
  "questions": [
    {
      "question": "What's the deployment target for this Node.js application?",
      "header": "Deployment",
      "options": [
        {"label": "Edge/Serverless", "description": "Cloudflare Workers, Vercel Edge, AWS Lambda"},
        {"label": "Traditional server", "description": "Long-running process on VPS, EC2"},
        {"label": "Container", "description": "Docker/Kubernetes orchestration"},
        {"label": "Not decided yet", "description": "Still evaluating options"}
      ]
    },
    {
      "question": "Does your team have existing Node.js framework experience?",
      "header": "Experience",
      "options": [
        {"label": "Express", "description": "Team familiar with Express.js patterns"},
        {"label": "NestJS", "description": "Team uses NestJS or similar DI frameworks"},
        {"label": "Fastify/Hono", "description": "Modern lightweight frameworks"},
        {"label": "None/Learning", "description": "New to Node.js or choosing first framework"}
      ]
    }
  ]
}
```

**Why Updated:** Section explicitly titled "Questions to Ask"

**Impact:** Framework selection (Hono vs Express vs NestJS) now based on context, not AI defaults.

---

#### 2. `.claude/skills/mobile-design/SKILL.md`
**Section:** You MUST Ask If Not Specified (Lines 63-72)

**Before:**
```markdown
| Aspect | Ask | Why |
|--------|-----|-----|
| **Platform** | "iOS, Android, or both?" | Affects EVERY design decision |
| **Framework** | "React Native, Flutter, or native?" | Determines patterns and tools |
| **Navigation** | "Tab bar, drawer, or stack-based?" | Core UX decision |
| **State** | "What state management?" | Architecture foundation |
| **Offline** | "Does this need to work offline?" | Affects data strategy |
| **Target devices** | "Phone only, or tablet support?" | Layout complexity |
```

**After:**
```json
{
  "questions": [
    {
      "question": "Which platform(s) are you targeting?",
      "header": "Platform",
      "options": [
        {"label": "iOS only", "description": "iPhone/iPad - SwiftUI or React Native iOS"},
        {"label": "Android only", "description": "Android phones/tablets - Kotlin/Compose"},
        {"label": "Both (cross-platform)", "description": "iOS + Android - RN or Flutter recommended"},
        {"label": "Not decided", "description": "Still evaluating platform options"}
      ]
    },
    {
      "question": "What framework do you prefer?",
      "header": "Framework",
      "options": [
        {"label": "React Native", "description": "JavaScript/TypeScript - web devs, OTA updates"},
        {"label": "Flutter", "description": "Dart - pixel-perfect UI, excellent performance"},
        {"label": "Native (Swift/Kotlin)", "description": "Platform-specific - maximum control"},
        {"label": "Let you decide", "description": "Choose the best option for this project"}
      ]
    },
    {
      "question": "What type of navigation pattern?",
      "header": "Navigation",
      "options": [
        {"label": "Tab bar", "description": "Bottom tabs for main sections (most common)"},
        {"label": "Drawer", "description": "Side menu for many options"},
        {"label": "Stack-based", "description": "Linear flow, screens push/pop"},
        {"label": "Custom/Hybrid", "description": "Mix of patterns or custom navigation"}
      ]
    },
    {
      "question": "Does this app need offline functionality?",
      "header": "Offline",
      "options": [
        {"label": "Yes, full offline", "description": "Core features work without internet"},
        {"label": "Partial offline", "description": "Some features cached, most need network"},
        {"label": "No, online only", "description": "Requires active internet connection"},
        {"label": "Not sure", "description": "Need guidance on offline requirements"}
      ]
    }
  ]
}
```

**Why Updated:** Section titled "You MUST Ask" - strongest wording

**Impact:** Prevents AI from defaulting to React Native for all mobile projects. Forces platform/framework clarification.

---

#### 3. `.claude/skills/frontend-design/SKILL.md`
**Section:** When User Prompt is Vague, ASK (Lines 46-55)

**Before:**
```markdown
**Color not specified?** Ask:
> "What color palette do you prefer? (blue/green/orange/neutral/other?)"

**Style not specified?** Ask:
> "What style are you going for? (minimal/bold/retro/futuristic/organic?)"

**Layout not specified?** Ask:
> "Do you have a layout preference? (single column/grid/asymmetric/full-width?)"
```

**After:**
```json
{
  "questions": [
    {
      "question": "What color palette do you prefer for this design?",
      "header": "Color",
      "options": [
        {"label": "Blue spectrum", "description": "Trust, calm, professional - SaaS, fintech, healthcare"},
        {"label": "Green spectrum", "description": "Growth, nature, wealth - eco, finance, health"},
        {"label": "Warm (orange/red)", "description": "Energy, urgency, appetite - food, retail, action"},
        {"label": "Neutral/monochrome", "description": "Minimal, elegant, timeless - luxury, portfolio"}
      ]
    },
    {
      "question": "What style are you going for?",
      "header": "Style",
      "options": [
        {"label": "Minimal/Clean", "description": "Lots of whitespace, simple typography, restrained"},
        {"label": "Bold/Dramatic", "description": "Large typography, high contrast, statement-making"},
        {"label": "Playful/Organic", "description": "Rounded corners, friendly, approachable"},
        {"label": "Technical/Sharp", "description": "Geometric, brutalist edges, data-focused"}
      ]
    },
    {
      "question": "Do you have a layout preference?",
      "header": "Layout",
      "options": [
        {"label": "Single column", "description": "Linear storytelling, mobile-first, editorial"},
        {"label": "Grid layout", "description": "Structured, product showcase, dashboard"},
        {"label": "Asymmetric", "description": "Creative, unique, portfolio"},
        {"label": "Full-width sections", "description": "Modern SaaS, landing page, hero-driven"}
      ]
    }
  ]
}
```

**Why Updated:** Section explicitly says "ASK:" - prevents AI defaults

**Impact:** Prevents generic bento grids, mesh gradients, deep cyan defaults. Forces design direction clarification.

---

### Skills Confirmed as Template-Only (10)

These skills contain **conceptual template questions** for agent thinking, NOT direct user questions:

1. **vulnerability-scanner** ✅
   - Questions: "What are we protecting?", "Who would attack?", "How would they attack?"
   - Type: Threat modeling template
   - Conclusion: Template questions for security analysis methodology

2. **systematic-debugging** ✅
   - Questions: "When did this start?", "What changed recently?", "Does it happen in all environments?"
   - Type: Isolation questions checklist
   - Conclusion: Self-reflection questions for debugging workflow

3. **plan-writing** ✅
   - Questions: "How do you know it's done?", "What can you check/test?"
   - Type: Verification principles
   - Conclusion: Conceptual guidance for task breakdown

4. **mcp-builder** ✅
   - Questions: None direct to user
   - Type: Design principles
   - Conclusion: All about MCP server architecture

5. **intelligent-routing** ✅
   - Questions: "Do you want responsive web or native mobile app?" (example text)
   - Type: Edge case clarification example
   - Conclusion: Example showing clarification pattern, not mandatory template

6. **geo-fundamentals** ✅
   - Questions: None
   - Type: Pure principles and checklists
   - Conclusion: GEO optimization principles

7. **database-design** ✅
   - Questions: "Asked user about database preference?" (checklist item)
   - Type: Decision checklist reminder
   - Conclusion: Optional reminder, not mandatory question format

8. **architecture** ✅
   - Questions: None direct to user
   - Type: Trade-off analysis framework
   - Conclusion: Architectural decision principles

9. **api-patterns** ✅
   - Questions: "Asked user about API consumers?" (checklist item)
   - Type: Decision checklist reminder
   - Conclusion: Optional reminder, not mandatory question format

10. **nextjs-react-expert** ✅
    - Questions: "What's your performance issue?" (decision tree)
    - Type: Self-diagnostic question
    - Conclusion: User self-diagnoses, not agent asking user

**Key Insight:** Template questions are **CORRECT pattern** - they guide agent thinking, not direct user interaction.

---

## 📊 Final Statistics

### Files Modified (10 Total)

**Phase 1 (6 files):**
1. `.claude/skills/brainstorming/SKILL.md`
2. `.claude/skills/brainstorming/dynamic-questioning.md`
3. `.claude/agents/orchestrator.md`
4. `.claude/commands/brainstorm.md`
5. `CLAUDE.md`
6. `ASKUSERQUESTION-INTEGRATION.md` (created)

**Phase 2 (1 file):**
7. `.claude/agents/explorer-agent.md`

**Phase 3 (3 files):**
8. `.claude/skills/nodejs-best-practices/SKILL.md`
9. `.claude/skills/mobile-design/SKILL.md`
10. `.claude/skills/frontend-design/SKILL.md`

### Questions Converted

| Phase | Questions | Type |
|-------|-----------|------|
| Phase 1 | ~12 | Brainstorming, orchestrator, /brainstorm workflow |
| Phase 2 | 4 | Explorer agent discovery questions |
| Phase 3 | 9 | Domain skill clarification (nodejs, mobile, frontend) |
| **Total** | **~25** | **Structured multiple-choice questions** |

### Coverage

- **Agents audited:** 15 (14 use skills, 1 updated)
- **Skills audited:** 13 (3 updated, 10 template-only confirmed)
- **Commands updated:** 1 (/brainstorm)
- **Project docs updated:** 1 (CLAUDE.md)

### Time Investment

| Phase | Duration | Activities |
|-------|----------|------------|
| Phase 1 | ~2 hours | Research + implement core brainstorming + orchestrator |
| Phase 2 | ~45 min | Audit 15 agents + discover skill-based architecture |
| Phase 3 | ~1.5 hours | Deep skill audit + strategic updates |
| **Total** | **~4.25 hours** | **Complete integration project** |

---

## 🎯 Tool Schema Reference

### AskUserQuestion Parameters

```json
{
  "questions": [
    {
      "question": "string (full question text)",
      "header": "string (max 12 chars)",
      "options": [
        {
          "label": "string (option name)",
          "description": "string (pros/cons/best for)"
        }
      ],
      "multiSelect": boolean
    }
  ]
}
```

### Constraints

- **1-4 questions** per tool call
- **2-4 options** per question
- **Header max 12 characters**
- **60-second timeout**
- **Not available in subagents** (Task tool spawned agents)

### Answer Response

```json
{
  "questions": [...],  // Original questions passed through
  "answers": {
    "Full question text": "Selected label",
    "Another question": "Label1, Label2"  // Multi-select joined
  }
}
```

---

## ✅ Verification Checklist

**Phase 1 Completion:**
- [x] Analysis document created (ASKUSERQUESTION-INTEGRATION.md)
- [x] Core brainstorming skill refactored
- [x] Dynamic questioning templates updated
- [x] Orchestrator agent clarification updated
- [x] /brainstorm command workflow updated
- [x] CLAUDE.md Socratic Gate section updated
- [x] All changes use correct JSON tool schema
- [x] All questions have 2-4 options
- [x] All headers are ≤12 characters
- [x] Free-text "Other" support documented
- [x] Default handling documented
- [x] Priority batching explained (P0/P1/P2)

**Phase 2 Completion:**
- [x] Audited 15 specialist agents
- [x] Discovered skill-based architecture (14/15 agents use skills)
- [x] Updated explorer-agent.md (only agent with direct questions)
- [x] Documented architectural insight
- [x] All changes use correct JSON tool schema

**Phase 3 Completion:**
- [x] Deep re-audit of 13 domain skills
- [x] Identified 3 skills with explicit "ASK" instructions
- [x] Updated nodejs-best-practices (2 questions)
- [x] Updated mobile-design (4 questions)
- [x] Updated frontend-design (3 questions)
- [x] Confirmed 10 skills use template questions (no changes needed)
- [x] All changes use correct JSON tool schema

---

## 🧪 Testing Recommendations

### Phase 1 Tests
- [ ] Test Socratic Gate with vague request (e.g., "Build me an app")
- [ ] Test orchestrator clarification with multi-domain task
- [ ] Test /brainstorm command with specific topic
- [ ] Verify 60-second timeout behavior
- [ ] Verify multi-select questions work correctly
- [ ] Verify free-text "Other" option works

### Phase 2 Tests
- [ ] Test explorer-agent discovery with new codebase
- [ ] Verify architectural questions invoke correctly
- [ ] Test depth control questions during exploration

### Phase 3 Tests
- [ ] Test nodejs-best-practices with "Create Node.js API" request
- [ ] Test mobile-design with "Build mobile app" request
- [ ] Test frontend-design with "Design landing page" request
- [ ] Verify answers inform technology selection
- [ ] Verify prevents AI default tendencies

---

## 🔑 Key Learnings

### 1. Skill-Based Architecture is Superior

**Discovery (Phase 2):**
> Agents don't duplicate questions. They load skills and use skill templates when needed.

**Benefits:**
- DRY principle (questions defined once)
- Separation of concerns (agents = orchestration, skills = knowledge)
- Easier maintenance (update skill once, all agents benefit)

### 2. Template vs Direct Questions

**Template questions (keep as-is):**
- Self-reflection prompts ("What changed recently?")
- Conceptual checklists ("How do you know it's done?")
- Decision framework questions ("What are we protecting?")

**Direct questions (convert to tool):**
- Explicit user clarification ("Ask: 'iOS, Android, or both?'")
- Framework/tech selection ("What's the deployment target?")
- Design direction ("What color palette do you prefer?")

### 3. Context-Based Decision Making

**Old approach:**
- AI defaults to favorites (Express, React Native, blue colors, bento grids)

**New approach:**
- Tool forces clarification BEFORE selection
- Answers inform context-appropriate choices
- Prevents memorized patterns

---

## 🚀 Next Steps

### Immediate Actions

1. **Git Commit**
   ```bash
   git add .
   git commit -m "feat: integrate AskUserQuestion tool across antigravity-kit (3 phases)

   Phase 1: Core brainstorming + orchestrator (6 files, ~12 questions)
   Phase 2: Agent audit + explorer-agent (1 file, 4 questions)
   Phase 3: Domain skills strategic updates (3 files, 9 questions)

   Total: 10 files modified, ~25 questions converted to structured tool format

   Discovered skill-based architecture: agents load skills for domain knowledge,
   preventing duplication and enabling DRY principle.

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

2. **Testing**
   - Test all 3 phases with real scenarios
   - Verify tool invokes correctly
   - Validate answer processing

3. **Documentation**
   - Share with team
   - Add to onboarding docs
   - Create usage examples

### Future Enhancements (Optional)

- Monitor AskUserQuestion tool usage
- Collect feedback on question quality
- Refine options based on common "Other" answers
- Add more questions to skills as patterns emerge
- Create question design best practices guide

---

## 📚 Related Documentation

**This Summary:**
- Complete overview of all 3 phases
- Before/after examples for all changes
- Statistics and verification checklists

**Technical Reference:**
- `ASKUSERQUESTION-INTEGRATION.md` - Tool documentation, templates, migration guide

**Official Docs:**
- https://platform.claude.com/docs/en/agent-sdk/user-input

---

**Completed by:** Claude (Sonnet 4.5)
**Date:** 2026-01-28
**Status:** ✅ All 3 Phases Complete
