# 🧠 Brainstorming & Brainstorm - Phân Tích Chi Tiết

> Nghiên cứu về skill `brainstorming` và command `/brainstorm` trong `.claude/` plugin

**Ngày phân tích:** 2026-01-28

---

## 📋 MỤC LỤC

1. [Overview & So Sánh](#overview--so-sánh)
2. [Skill: brainstorming](#skill-brainstorming)
3. [Command: /brainstorm](#command-brainstorm)
4. [Dynamic Question Generation Algorithm](#dynamic-question-generation-algorithm)
5. [Socratic Gate Mechanism](#socratic-gate-mechanism)
6. [Domain-Specific Question Banks](#domain-specific-question-banks)
7. [Ví Dụ Thực Tế](#ví-dụ-thực-tế)
8. [Best Practices](#best-practices)

---

## OVERVIEW & SO SÁNH

### Có Gì Trong `.claude/`?

| Component | Type | Path | Purpose |
|-----------|------|------|---------|
| **brainstorming** | Skill | `.claude/skills/brainstorming/SKILL.md` | Socratic questioning protocol + communication patterns |
| **dynamic-questioning.md** | Reference | `.claude/skills/brainstorming/dynamic-questioning.md` | Question generation algorithm |
| **/brainstorm** | Command | `.claude/commands/brainstorm.md` | User-invocable slash command |

### Khác Biệt: Skill vs Command

```
┌─────────────────────────────────────────────────────────┐
│  SKILL: brainstorming                                    │
│  ─────────────────────────────────────────────────────  │
│  • KHÔNG user-invocable                                 │
│  • Được LOAD BỞI AGENTS (orchestrator, project-planner) │
│  • Cung cấp: Socratic Gate, Dynamic Questioning         │
│  • Use case: Complex requests, vague requirements       │
│  • Trigger: Automatic (when agent needs clarification)  │
└─────────────────────────────────────────────────────────┘
                        vs
┌─────────────────────────────────────────────────────────┐
│  COMMAND: /brainstorm                                    │
│  ─────────────────────────────────────────────────────  │
│  • USER-INVOCABLE (slash command)                       │
│  • User explicitly runs: /brainstorm "topic"            │
│  • Cung cấp: Structured idea exploration                │
│  • Use case: Explore options before implementation      │
│  • Trigger: Manual (user types /brainstorm)             │
└─────────────────────────────────────────────────────────┘
```

### Relationship Flow

```
USER INPUT: "Build authentication system"
    ↓
MODEL ROUTING
    ↓
AGENT: orchestrator (or project-planner)
    ↓
LOADS SKILL: brainstorming
    ↓
APPLIES: Socratic Gate (mandatory for complex tasks)
    ↓
ASKS: 3-5 Dynamic Questions
    ↓
USER ANSWERS
    ↓
PROCEEDS with implementation

────────────────────────────────────────────

USER INPUT: "/brainstorm authentication system"
    ↓
COMMAND: /brainstorm
    ↓
DIRECT EXECUTION (no agent routing)
    ↓
OUTPUT: 3+ Options (A, B, C) with pros/cons
    ↓
USER CHOOSES
```

---

## SKILL: BRAINSTORMING

### Metadata

```yaml
---
name: brainstorming
description: Socratic questioning protocol + user communication. MANDATORY for complex requests, new features, or unclear requirements. Includes progress reporting and error handling.
allowed-tools: Read, Glob, Grep
---
```

### Khi Nào Được Load?

Skill này được load bởi các agents:

| Agent | When Loaded | Use Case |
|-------|-------------|----------|
| `orchestrator` | Complex multi-domain tasks | Clarify requirements before invoking specialists |
| `project-planner` | Creating project plans | Understand scope, tech stack, constraints |
| `product-owner` | Defining product features | Gather requirements, prioritize backlog |
| `product-manager` | Writing user stories | Clarify acceptance criteria |

### Core Components

#### 1. **Socratic Gate (MANDATORY)**

**Purpose:** Prevent jumping to implementation without understanding requirements

**Trigger Patterns:**

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | 🛑 ASK 3 questions |
| Complex feature or architecture | 🛑 Clarify before implementing |
| Update/change request | 🛑 Confirm scope |
| Vague requirements | 🛑 Ask purpose, users, constraints |

**Protocol:**

```
1. STOP ─ Do NOT start coding
2. ASK ─ Minimum 3 questions:
   - 🎯 Purpose: What problem are you solving?
   - 👥 Users: Who will use this?
   - 📦 Scope: Must-have vs nice-to-have?
3. WAIT ─ Get response before proceeding
```

**Example:**

```markdown
User: "Build an e-commerce site"

Agent with brainstorming skill:
🛑 SOCRATIC GATE TRIGGERED

Before I start building, I need to understand:

### 🎯 **Purpose**
What specific problem are you solving?
- Selling physical products?
- Digital products?
- Services?
- Multi-vendor marketplace?

### 👥 **Users**
Who is your target audience?
- B2C consumers?
- B2B businesses?
- Niche market (books, fashion, etc.)?

### 📦 **Scope**
What's the MVP (must-have) vs future features?
- Must-have: Product listing, cart, checkout?
- Nice-to-have: Reviews, wishlist, recommendations?

Please answer these so I can build the right solution!
```

#### 2. **Dynamic Question Generation**

**Principle:** Questions are NOT about gathering data—they reveal **architectural consequences**

**Bad Question:**
```
❌ "What authentication method?"
```

**Good Question:**
```
✅ "Should users sign up with email/password or social login?

   Impact:
   - Email/Password → Need password reset, hashing, 2FA infrastructure
   - Social Login → OAuth providers, profile mapping, less control

   Trade-off: Security vs. Development time vs. User friction"
```

#### 3. **Question Format (MANDATORY)**

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
| B | [+] | [-] | [Use case] |

**If Not Specified:** [Default + rationale]
```

#### 4. **Progress Reporting**

**Status Board Format:**

```markdown
| Agent | Status | Current Task | Progress |
|-------|--------|--------------|----------|
| database-architect | 🔄 | Creating schema | 2/5 tables |
| backend-specialist | ⏳ | Waiting for schema | - |
| frontend-specialist | ✅ | UI components done | 100% |
```

**Status Icons:**
- ✅ Completed
- 🔄 Running
- ⏳ Waiting (blocked)
- ❌ Error
- ⚠️ Warning

#### 5. **Error Handling**

**Pattern:**

```
1. Acknowledge the error
2. Explain what happened (user-friendly)
3. Offer specific solutions with trade-offs
4. Ask user to choose or provide alternative
```

**Example:**

```markdown
❌ Port 3000 is already in use.

This means another application is running on that port.

**Options:**
1. Stop the other app: `lsof -ti:3000 | xargs kill`
2. Use a different port: `PORT=3001 npm run dev`
3. Let me check what's using it: `lsof -i:3000`

Which would you like me to do?
```

#### 6. **Communication Principles**

| Principle | Implementation |
|-----------|----------------|
| **Concise** | No unnecessary details |
| **Visual** | Use emojis ✅🔄⏳❌ for quick scanning |
| **Specific** | "~2 minutes" not "wait a bit" |
| **Alternatives** | Offer multiple paths when stuck |
| **Proactive** | Suggest next step after completion |

---

## COMMAND: /BRAINSTORM

### Metadata

```yaml
---
description: Structured brainstorming for projects and features. Explores multiple options before implementation.
---
```

### Usage

```bash
/brainstorm authentication system
/brainstorm state management for complex form
/brainstorm database schema for social app
/brainstorm caching strategy
```

### Behavior

When `/brainstorm` is triggered:

1. **Understand the goal**
   - What problem are we solving?
   - Who is the user?
   - What constraints exist?

2. **Generate options**
   - Provide at least 3 different approaches
   - Each with pros and cons
   - Consider unconventional solutions

3. **Compare and recommend**
   - Summarize tradeoffs
   - Give a recommendation with reasoning

### Output Format

```markdown
## 🧠 Brainstorm: [Topic]

### Context
[Brief problem statement]

---

### Option A: [Name]
[Description]

✅ **Pros:**
- [benefit 1]
- [benefit 2]

❌ **Cons:**
- [drawback 1]

📊 **Effort:** Low | Medium | High

---

### Option B: [Name]
[Description]

✅ **Pros:**
- [benefit 1]

❌ **Cons:**
- [drawback 1]
- [drawback 2]

📊 **Effort:** Low | Medium | High

---

### Option C: [Name]
[Description]

✅ **Pros:**
- [benefit 1]

❌ **Cons:**
- [drawback 1]

📊 **Effort:** Low | Medium | High

---

## 💡 Recommendation

**Option [X]** because [reasoning].

What direction would you like to explore?
```

### Key Principles

- **No code** - About ideas, not implementation
- **Visual when helpful** - Use diagrams for architecture
- **Honest tradeoffs** - Don't hide complexity
- **Defer to user** - Present options, let them decide

---

## DYNAMIC QUESTION GENERATION ALGORITHM

### Core Principles

#### 1. Questions Reveal Consequences

```markdown
Every question must connect to a concrete implementation decision
that affects cost, complexity, or timeline.
```

#### 2. Context Before Content

First understand WHERE this request fits:

| Context | Question Focus |
|---------|----------------|
| **Greenfield** (new project) | Foundation: stack, hosting, scale |
| **Feature Addition** | Integration points, existing patterns |
| **Refactor** | Why? Performance? Maintainability? |
| **Debug** | Symptoms → Root cause → Reproduction |

#### 3. Minimum Viable Questions

**Principle:** Each question must eliminate a fork in the implementation road.

```
Before Question:
├── Path A: Do X (5 min)
├── Path B: Do Y (15 min)
└── Path C: Do Z (1 hour)

After Question:
└── Path Confirmed: Do X (5 min)
```

If a question doesn't reduce paths → **DELETE IT**

#### 4. Questions Generate Data, Not Assumptions

```markdown
❌ ASSUMPTION: "User probably wants Stripe for payments"

✅ QUESTION: "Which payment provider fits your needs?

   Stripe → Best docs, 2.9% + $0.30, US-centric
   LemonSqueezy → Merchant of Record, 5% + $0.50, global
   Paddle → Complex pricing, handles EU VAT, enterprise"
```

### Algorithm Flow

```
INPUT: User request + Context
│
├── STEP 1: Parse Request
│   ├── Extract domain (ecommerce, auth, realtime, etc.)
│   ├── Extract features (explicit and implied)
│   └── Extract scale indicators (users, data, frequency)
│
├── STEP 2: Identify Decision Points
│   ├── Blocking: MUST decide before coding
│   ├── Deferable: COULD decide later
│   └── High-leverage: ARCHITECTURAL impact
│
├── STEP 3: Generate Questions (Priority Order)
│   ├── P0: Blocking (cannot proceed without)
│   ├── P1: High-leverage (affects >30% of impl)
│   ├── P2: Medium-leverage (specific features)
│   └── P3: Nice-to-have (edge cases)
│
└── STEP 4: Format Each Question
    ├── What: Clear question
    ├── Why: Impact on implementation
    ├── Options: Trade-offs (not just A vs B)
    └── Default: What if user doesn't answer
```

---

## SOCRATIC GATE MECHANISM

### Implementation Flow

```
┌─────────────────────────────────────────────┐
│ USER REQUEST (Vague/Complex)                 │
│ "Build an Instagram clone"                  │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ AGENT LOADS SKILL: brainstorming            │
│ (orchestrator, project-planner, etc.)       │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 🛑 SOCRATIC GATE TRIGGERED                 │
│ ───────────────────────────────────────────│
│ Detected: Vague request without details     │
│ Action: STOP implementation                 │
│ Required: Ask 3-5 clarifying questions      │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ DYNAMIC QUESTION GENERATION                 │
│ ───────────────────────────────────────────│
│ STEP 1: Parse                               │
│ ├─ Domain: Social Media                     │
│ ├─ Features: Photo sharing, engagement      │
│ └─ Scale: Potentially high                  │
│                                             │
│ STEP 2: Decision Points                     │
│ ├─ P0: Storage, Feed, Auth                  │
│ ├─ P1: Real-time, Media processing          │
│ └─ P2: Stories, DM (defer)                  │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ ASK QUESTIONS (Formatted)                   │
│ ───────────────────────────────────────────│
│ ## 🔴 CRITICAL DECISIONS                   │
│                                             │
│ ### 1. Photo Storage Strategy               │
│ **Question:** Where store/serve photos?     │
│                                             │
│ **Why:** Affects cost, speed, CDN           │
│                                             │
│ **Options:**                                │
│ | Cloudinary | $89/mo | Fast | Low  |      │
│ | AWS S3     | $0.023  | Fast | Med |      │
│                                             │
│ **Default:** Cloudinary (MVP balanced)      │
│                                             │
│ ### 2. Feed Algorithm... (etc)              │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ USER ANSWERS                                │
│ ───────────────────────────────────────────│
│ "Use Cloudinary for storage.                │
│  Chronological feed is fine.                │
│  Use Clerk for auth."                       │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ ✅ GATE PASSED                              │
│ Proceed with implementation                 │
└─────────────────────────────────────────────┘
```

### Enforcement

**MANDATORY for:**
- Complex requests ("Build X")
- Vague requirements ("Make it better")
- New features without details
- Architectural changes

**VIOLATION:**
```
❌ Jumping to implementation without asking
❌ Assuming requirements
❌ Guessing user intent
→ Results in: Wrong solution, wasted time
```

---

## DOMAIN-SPECIFIC QUESTION BANKS

### E-Commerce

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **Single or Multi-vendor?** | Multi → Commission logic, vendor dashboards | +Revenue, -Complexity |
| **Inventory Tracking?** | Needs stock tables, low-stock alerts | +Accuracy, -Dev time |
| **Digital or Physical?** | Digital → Downloads | Physical → Shipping APIs |
| **Subscription or One-time?** | Subscription → Recurring billing, dunning | +Revenue, -Complexity |

### Authentication

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **Social Login Needed?** | OAuth vs password reset infra | +UX, -Control |
| **Role-Based Permissions?** | RBAC tables, policy enforcement | +Security, -Dev time |
| **2FA Required?** | TOTP infra, backup codes | +Security, -UX friction |
| **Email Verification?** | Verification tokens, email service | +Security, -Sign-up friction |

### Real-time

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **WebSocket or Polling?** | WS → Server scaling | Polling → Simpler, higher latency |
| **Expected Concurrent Users?** | <100 → Single server | >1000 → Redis pub/sub |
| **Message Persistence?** | History tables, storage costs | +UX, -Storage |
| **Ephemeral or Durable?** | Ephemeral → In-memory | Durable → DB writes |

### Content/CMS

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **Rich Text or Markdown?** | Rich Text → Sanitization, XSS | Markdown → Simple |
| **Draft/Publish Workflow?** | Status field, scheduled jobs | +Control, -Complexity |
| **Media Handling?** | Upload endpoints, storage | +Features, -Dev time |
| **Multi-language?** | i18n tables, translation UI | +Reach, -Complexity |

---

## VÍ DỤ THỰC TẾ

### Example 1: Skill brainstorming (Auto-Triggered)

**Scenario:** User asks orchestrator to build feature

```
┌─────────────────────────────────────────────┐
│ USER INPUT                                   │
│ "Build an Instagram clone"                  │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ ORCHESTRATOR ACTIVATED                      │
│ Loads skill: brainstorming                  │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 🛑 SOCRATIC GATE TRIGGERED                 │
│                                             │
│ Before I coordinate agents, I need clarity: │
│                                             │
│ ## 🔴 CRITICAL DECISIONS                   │
│                                             │
│ ### 1. Photo Storage Strategy               │
│ Where will photos be stored?                │
│                                             │
│ **Why:** Affects monthly cost, page speed   │
│ - 1000 users × 10 photos × 2MB = 20GB       │
│                                             │
│ **Options:**                                │
│ | Cloudinary | $89/mo | Fast (CDN) | Low | │
│ | AWS S3     | $0.023  | Fast | Medium |   │
│ | Supabase   | Free 1GB| Med  | Low    |   │
│                                             │
│ **Default:** Cloudinary (MVP balanced)      │
│                                             │
│ ### 2. Feed Algorithm                       │
│ How should the main feed work?              │
│                                             │
│ **Why:** DB complexity, caching, dev time   │
│                                             │
│ **Options:**                                │
│ | Chronological | Low  | Simple | Early |  │
│ | Follow-Only   | Med  | JOIN   | Most  |  │
│ | Algorithmic   | High | ML     | Insta |  │
│                                             │
│ **Default:** Follow-Only (balanced)         │
│                                             │
│ ### 3. Authentication                       │
│ How do users sign up?                       │
│                                             │
│ **Options:**                                │
│ | Email/Pass | 4-5 hrs | High | Medium |   │
│ | Social     | 1-2 hrs | Prov | Smooth |   │
│ | Clerk      | 1 hr    | High | Smooth |   │
│                                             │
│ **Default:** Clerk (fastest to market)      │
└─────────────────────────────────────────────┘
```

**USER RESPONDS:**
```
"Use Cloudinary.
Follow-only feed is fine.
Clerk for auth."
```

**ORCHESTRATOR:**
```
✅ Requirements clarified. Proceeding...

Creating PLAN.md with tech decisions:
- Storage: Cloudinary
- Feed: Follow-only (chronological for followed users)
- Auth: Clerk

Now invoking agents:
1. database-architect → Schema design
2. backend-specialist → API endpoints
3. frontend-specialist → UI components
4. test-engineer → E2E tests
```

### Example 2: Command /brainstorm (User-Invoked)

**User Input:**
```
/brainstorm authentication system
```

**Output:**

```markdown
## 🧠 Brainstorm: Authentication System

### Context
Need to add user authentication to application. Considering
security, development time, and user experience.

---

### Option A: Email/Password with JWT

Traditional approach using email/password with JWT tokens.

✅ **Pros:**
- Full control over auth flow
- No dependency on external providers
- Works offline (JWT validation)
- Custom password policies

❌ **Cons:**
- Must implement: password reset, hashing, 2FA
- Security responsibility on you
- More development time (4-5 hours)
- User friction (another password to remember)

📊 **Effort:** Medium-High (4-5 hours)

**Best For:** When you need full control or offline capability

---

### Option B: Social Login (OAuth)

Use Google/GitHub/Facebook OAuth for authentication.

✅ **Pros:**
- Fast implementation (1-2 hours)
- No password management
- Smooth UX (one-click login)
- Provider handles security

❌ **Cons:**
- Dependency on external providers
- Less control over auth flow
- Provider downtime affects your app
- May need fallback for non-social users

📊 **Effort:** Low (1-2 hours)

**Best For:** B2C apps, rapid prototyping, startup MVPs

---

### Option C: Auth Service (Clerk/Auth0/Supabase)

Use dedicated authentication service.

✅ **Pros:**
- Fastest implementation (30 min - 1 hour)
- Production-ready security
- Built-in 2FA, magic links, social
- Admin dashboard included
- Handles edge cases

❌ **Cons:**
- Monthly cost ($0-25/mo for small apps)
- Vendor lock-in
- Less customization
- External dependency

📊 **Effort:** Very Low (30 min - 1 hour)

**Best For:** Fastest time to market, security-critical apps

---

### Option D: Magic Link (Passwordless)

Email-based authentication without passwords.

✅ **Pros:**
- Great UX (no password to remember)
- More secure (no password to steal)
- Medium implementation time (2-3 hours)
- Reduces support (no password resets)

❌ **Cons:**
- Requires email reliability
- Slightly higher friction (check email each time)
- Email delivery issues affect login
- Not suitable for high-frequency logins

📊 **Effort:** Medium (2-3 hours)

**Best For:** Security-focused, infrequent logins

---

## 💡 Recommendation

**Option C (Auth Service - Clerk)** because:

1. **Fastest to market** (30 min setup)
2. **Production-ready** security out of box
3. **Free tier** available (up to 5000 users)
4. **Scalable** (handles growth without code changes)
5. **Multiple auth methods** (social + email + magic link)

Start with Clerk for MVP. If you later need custom auth,
you can migrate (Clerk provides export APIs).

**For self-hosted/full control:** Choose Option A
**For rapid prototype:** Choose Option B
**For security-first:** Choose Option D

What direction would you like to explore?
```

### Example 3: Complex Feature (Socratic Gate Full Flow)

**User Input:**
```
"Add real-time notifications to the app"
```

**Agent:** backend-specialist (loads brainstorming skill)

**Response:**

```markdown
🛑 Before implementing real-time notifications, I need clarity:

## 🔴 CRITICAL DECISIONS

### 1. **Notification Delivery Method**

**Question:** How should users receive notifications?

**Why This Matters:**
- WebSocket → Persistent connection, instant, complex infrastructure
- Polling → Periodic checks, simpler, higher latency
- Push API → Browser native, works offline, limited mobile support

**Options:**
| Option | Latency | Infrastructure | Offline | Best For |
|--------|---------|---------------|---------|----------|
| WebSocket | <100ms | Redis pub/sub | No | Real-time chat |
| Polling (30s) | ~30s | DB queries | No | <1000 users |
| Push API | <1s | Service worker | Yes | Web apps |
| FCM/APNS | <1s | Firebase/Apple | Yes | Mobile apps |

**If Not Specified:** Polling for MVP (simplest, validate first)

---

### 2. **Notification Types**

**Question:** What events trigger notifications?

**Why This Matters:**
- More types → More event listeners, more DB writes
- Affects: Database schema, event system architecture

**Common Types:**
- [ ] New message/comment
- [ ] Mention/tag
- [ ] Like/reaction
- [ ] Follow
- [ ] System alerts

**Please specify** which types you need for MVP.

---

### 3. **Notification Persistence**

**Question:** Should notifications be stored in database?

**Why This Matters:**
- Persistent → History, mark as read, notification center
- Ephemeral → Simpler, no storage, only real-time

**Options:**
| Option | Features | Complexity | Storage Cost |
|--------|----------|------------|--------------|
| Persistent | History, search, archive | High | $5-20/mo |
| Ephemeral | Real-time only | Low | $0 |
| Hybrid | Recent 30 days | Medium | $2-5/mo |

**If Not Specified:** Hybrid (balance UX and cost)

---

### 4. **Expected Scale**

**Question:** How many concurrent users?

**Why This Matters:**
- <100 users → Single server, in-memory state
- 100-1000 → Redis for shared state
- >1000 → Dedicated WebSocket servers, load balancer

**Please estimate** your user base for infrastructure planning.

---

## 📋 Summary

Once you answer these, I can recommend:
- Delivery method (WebSocket vs Polling vs Push)
- Infrastructure setup (servers, Redis, etc.)
- Database schema
- Implementation plan

What are your answers to the above questions?
```

---

## BEST PRACTICES

### For Skill: brainstorming

**DO:**
✅ Always trigger Socratic Gate for vague requests
✅ Ask minimum 3 questions for complex tasks
✅ Show trade-offs, not just options
✅ Provide defaults if user doesn't answer
✅ Use domain-specific question banks
✅ Prioritize blocking decisions (P0) first

**DON'T:**
❌ Jump to implementation without asking
❌ Ask questions that don't eliminate paths
❌ Use static question templates
❌ Assume user's requirements
❌ Hide complexity or trade-offs
❌ Ask more than 5 questions at once

### For Command: /brainstorm

**DO:**
✅ Present at least 3 options
✅ Show honest pros and cons
✅ Estimate effort (Low/Medium/High)
✅ Give a recommendation with reasoning
✅ Defer to user for final decision

**DON'T:**
❌ Write code (this is ideas only)
❌ Hide drawbacks
❌ Recommend without explaining why
❌ Present only 1-2 options
❌ Make the decision for user

### Communication Principles

1. **Concise** - Get to the point
2. **Visual** - Use emojis, tables, icons
3. **Specific** - "~2 hours" not "some time"
4. **Alternatives** - Always offer multiple paths
5. **Proactive** - Suggest next steps

---

## 🎯 TÓM TẮT

### Skill: brainstorming

**Type:** Agent skill (loaded by orchestrator, project-planner, etc.)
**Purpose:** Socratic questioning protocol for complex/vague requests
**Key Features:**
- Socratic Gate (mandatory for complex requests)
- Dynamic question generation algorithm
- Domain-specific question banks (e-commerce, auth, real-time, CMS)
- Progress reporting patterns
- Error handling templates

**When Used:** Automatically when agent detects vague/complex request

### Command: /brainstorm

**Type:** User-invocable slash command
**Purpose:** Structured idea exploration before implementation
**Key Features:**
- Generate 3+ options with pros/cons
- Effort estimation
- Recommendation with reasoning
- No code output (ideas only)

**When Used:** Manually when user types `/brainstorm [topic]`

### Key Differences

| Aspect | Skill | Command |
|--------|-------|---------|
| **Invocation** | Automatic (by agent) | Manual (by user) |
| **Purpose** | Clarify requirements | Explore options |
| **Output** | Questions → Answers | Options → Choice |
| **Scope** | Requirements gathering | Idea comparison |
| **Result** | Proceed with implementation | User decides direction |

---

**Brainstorming trong Antigravity Kit cung cấp một framework mạnh mẽ cho việc requirements discovery và idea exploration, đảm bảo rằng implementation luôn được build trên foundation rõ ràng và được user xác nhận.**
