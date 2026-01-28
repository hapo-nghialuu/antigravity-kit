# Dynamic Question Generation

> **PRINCIPLE:** Questions are not about gathering data—they are about **revealing architectural consequences**.
>
> Every question must connect to a concrete implementation decision that affects cost, complexity, or timeline.

---

## 🧠 Core Principles

### 1. Questions Reveal Consequences

A good question is not "What color do you want?" but:

```markdown
❌ BAD: "What authentication method?"
✅ GOOD: "Should users sign up with email/password or social login?

   Impact:
   - Email/Pass → Need password reset, hashing, 2FA infrastructure
   - Social → OAuth providers, user profile mapping, less control

   Trade-off: Security vs. Development time vs. User friction"
```

### 2. Context Before Content

First understand **where** this request fits:

| Context | Question Focus |
|---------|----------------|
| **Greenfield** (new project) | Foundation decisions: stack, hosting, scale |
| **Feature Addition** | Integration points, existing patterns, breaking changes |
| **Refactor** | Why refactor? Performance? Maintainability? What's broken? |
| **Debug** | Symptoms → Root cause → Reproduction path |

### 3. Minimum Viable Questions

**PRINCIPLE:** Each question must eliminate a fork in the implementation road.

```
Before Question:
├── Path A: Do X (5 min)
├── Path B: Do Y (15 min)
└── Path C: Do Z (1 hour)

After Question:
└── Path Confirmed: Do X (5 min)
```

If a question doesn't reduce implementation paths → **DELETE IT**.

### 4. Questions Generate Data, Not Assumptions

```markdown
❌ ASSUMPTION: "User probably wants Stripe for payments"
✅ QUESTION: "Which payment provider fits your needs?

   Stripe → Best documentation, 2.9% + $0.30, US-centric
   LemonSqueezy → Merchant of Record, 5% + $0.50, global taxes
   Paddle → Complex pricing, handles EU VAT, enterprise focus"
```

---

## 📋 Question Generation Algorithm

```
INPUT: User request + Context (greenfield/feature/refactor/debug)
│
├── STEP 1: Parse Request
│   ├── Extract domain (ecommerce, auth, realtime, cms, etc.)
│   ├── Extract features (explicit and implied)
│   └── Extract scale indicators (users, data volume, frequency)
│
├── STEP 2: Identify Decision Points
│   ├── What MUST be decided before coding? (blocking)
│   ├── What COULD be decided later? (deferable)
│   └── What has ARCHITECTURAL impact? (high-leverage)
│
├── STEP 3: Generate Questions (Priority Order)
│   ├── P0: Blocking decisions (cannot proceed without answer)
│   ├── P1: High-leverage (affects >30% of implementation)
│   ├── P2: Medium-leverage (affects specific features)
│   └── P3: Nice-to-have (edge cases, optimization)
│
└── STEP 4: Format Each Question
    ├── What: Clear question
    ├── Why: Impact on implementation
    ├── Options: Trade-offs (not just A vs B)
    └── Default: What happens if user doesn't answer
```

---

## 🎯 Domain-Specific Question Banks

### E-Commerce

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **Single or Multi-vendor?** | Multi-vendor → Commission logic, vendor dashboards, split payments | +Revenue, -Complexity |
| **Inventory Tracking?** | Needs stock tables, reservation logic, low-stock alerts | +Accuracy, -Development time |
| **Digital or Physical Products?** | Digital → Download links, no shipping | Physical → Shipping APIs, tracking |
| **Subscription or One-time?** | Subscription → Recurring billing, dunning, proration | +Revenue, -Complexity |

### Authentication

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **Social Login Needed?** | OAuth providers vs. password reset infrastructure | +UX, -Control |
| **Role-Based Permissions?** | RBAC tables, policy enforcement, admin UI | +Security, -Development time |
| **2FA Required?** | TOTP/SMI infrastructure, backup codes, recovery flow | +Security, -UX friction |
| **Email Verification?** | Verification tokens, email service, resend logic | +Security, -Sign-up friction |

### Real-time

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **WebSocket or Polling?** | WS → Server scaling, connection management | Polling → Simpler, higher latency |
| **Expected Concurrent Users?** | <100 → Single server, >1000 → Redis pub/sub, >10k → specialized infra | +Scale, -Complexity |
| **Message Persistence?** | History tables, storage costs, pagination | +UX, -Storage |
| **Ephemeral or Durable?** | Ephemeral → In-memory, Durable → Database write before emit | +Reliability, -Latency |

### Content/CMS

| Question | Why It Matters | Trade-offs |
|----------|----------------|------------|
| **Rich Text or Markdown?** | Rich Text → Sanitization, XSS risks | Markdown → Simple, no WYSIWYG |
| **Draft/Publish Workflow?** | Status field, scheduled jobs, versioning | +Control, -Complexity |
| **Media Handling?** | Upload endpoints, storage, optimization | +Features, -Development time |
| **Multi-language?** | i18n tables, translation UI, fallback logic | +Reach, -Complexity |

---

## 📐 Dynamic Question Template (Using AskUserQuestion Tool)

**IMPORTANT:** All questions must use Claude Code's `AskUserQuestion` tool instead of markdown tables.

### Template Structure

```json
{
  "questions": [
    {
      "question": "[Clear, specific question with architectural consequence]",
      "header": "[12 chars max]",
      "options": [
        {
          "label": "[Option A name]",
          "description": "[Pros + Cons + Best for - concise]"
        },
        {
          "label": "[Option B name]",
          "description": "[Pros + Cons + Best for - concise]"
        },
        {
          "label": "[Option C name]",
          "description": "[Pros + Cons + Best for - concise]"
        }
      ],
      "multiSelect": false
    }
  ]
}
```

### Priority-Based Question Batching

**🔴 CRITICAL (P0) - 1st AskUserQuestion call:**
- Blocking decisions (cannot proceed without answer)
- Max 4 questions
- Must answer before any coding

**🟡 HIGH-LEVERAGE (P1) - 2nd AskUserQuestion call (after P0):**
- Affects >30% of implementation
- Max 4 questions
- Can defer if user wants to proceed

**🟢 NICE-TO-HAVE (P2) - 3rd call or document as defaults:**
- Edge cases, optimizations
- Document defaults in plan
- Ask only if user requests

### Constraints

- **1-4 questions** per AskUserQuestion invocation
- **2-4 options** per question
- **Header max 12 chars** (e.g., "Storage", "Auth", "Cache")
- **Description < 100 chars** (concise trade-offs)
- **Always support "Other"** for free-text input

### Default Handling

**For each question, document:**
```markdown
**If user doesn't answer within 60s or selects "Other" without specifics:**
- Default: [Chosen option]
- Rationale: [Why this default makes sense]
- Impact: [Can be changed later? What's the cost?]
```

---

## 🔄 Iterative Questioning

### First Pass (3-5 Questions)
Focus on **blocking decisions**. Don't proceed without answers.

### Second Pass (After Initial Implementation)
As patterns emerge, ask:
- "This feature implies [X]. Should we handle [edge case] now or defer?"
- "We're using [Pattern A]. Should [Feature B] follow the same pattern?"

### Third Pass (Optimization)
When functionality works:
- "Performance bottleneck at [X]. Optimize now or acceptable for now?"
- "Refactor [Y] for maintainability or ship as-is?"

---

## 🎭 Example: Full Question Generation

```
USER REQUEST: "Build an Instagram clone"

STEP 1: Parse
├── Domain: Social Media
├── Features: Photo sharing, engagement (likes/comments), user profiles
├── Implied: Feed, following, authentication
└── Scale: Potentially high (social apps go viral)

STEP 2: Decision Points
├── Blocking: Storage strategy, authentication method, feed type
├── High-leverage: Real-time notifications, data model complexity
└── Deferable: Analytics, advanced search, reels/video

STEP 3: Generate Questions (Priority)

P0 (Blocking):
1. Storage Strategy → Affects architecture, cost, speed
2. Feed Algorithm → Affects database queries, complexity
3. Auth Method → Affects dev time, UX, security

P1 (High-leverage):
4. Real-time Notifications → WebSocket vs polling
5. Media Processing → Client-side vs server-side optimization

P2 (Deferable):
6. Story/Reels → Major feature creep, defer to v2
7. DM/Chat → Separate subsystem, defer to v2

STEP 4: Format Output
```

---

## 📊 Generated Output (Example Using AskUserQuestion Tool)

**User Request:** "Build an Instagram clone"

### Step 1: P0 Questions (CRITICAL - Must Answer First)

```json
{
  "questions": [
    {
      "question": "Where should user photos be stored and served from? (Affects hosting costs, page load speed, CDN complexity)",
      "header": "Storage",
      "options": [
        {
          "label": "Cloudinary",
          "description": "$89/mo (25GB), Fast CDN, Low complexity - MVP rapid launch"
        },
        {
          "label": "AWS S3 + CloudFront",
          "description": "$0.023/GB, Fast CDN, Medium complexity - Production cost-optimized"
        },
        {
          "label": "Supabase Storage",
          "description": "Free tier 1GB, Medium speed, Low complexity - Small scale"
        },
        {
          "label": "Local Storage",
          "description": "Server cost, Slow, Low complexity - Development only"
        }
      ],
      "multiSelect": false
    },
    {
      "question": "How should the main feed algorithm work? (Affects DB query complexity, caching strategy, dev time)",
      "header": "Feed Type",
      "options": [
        {
          "label": "Chronological",
          "description": "Low complexity, Simple query - Early stage transparency"
        },
        {
          "label": "Follow-Only",
          "description": "Medium complexity, JOIN pagination - Most social apps"
        },
        {
          "label": "Algorithmic",
          "description": "High complexity, Pre-computed tables - Instagram competitor"
        }
      ],
      "multiSelect": false
    },
    {
      "question": "How should users sign up and login? (Affects dev time 2-5 hrs, security, UX friction)",
      "header": "Auth Method",
      "options": [
        {
          "label": "Email/Password",
          "description": "4-5 hrs, High security (with 2FA), Medium UX - Full control"
        },
        {
          "label": "Social Only (Google/FB)",
          "description": "1-2 hrs, Provider-dependent security, Smooth UX - B2C rapid launch"
        },
        {
          "label": "Magic Link",
          "description": "2-3 hrs, Medium security, Very smooth UX - Security-focused"
        },
        {
          "label": "Clerk/Auth0 (Recommended)",
          "description": "1 hr, High security, Smooth UX - Fastest to market"
        }
      ],
      "multiSelect": false
    }
  ]
}
```

**Default Handling (if 60s timeout or no answer):**
- Storage: Cloudinary (balanced for MVP, can migrate later)
- Feed: Follow-Only (standard for social apps)
- Auth: Clerk (fastest implementation, production-ready)

---

### Step 2: P1 Questions (HIGH-LEVERAGE - After P0 Answered)

```json
{
  "questions": [
    {
      "question": "Do users need instant notifications for likes/comments? (WebSocket adds complexity, polling simpler)",
      "header": "Real-time",
      "options": [
        {
          "label": "WebSocket + Redis",
          "description": "High complexity, $10+/mo scale cost - >1000 concurrent users"
        },
        {
          "label": "Polling (30s) (Recommended)",
          "description": "Low complexity, DB query cost - <1000 users, MVP validation"
        },
        {
          "label": "No Real-time",
          "description": "None, Free - Defer until validated"
        }
      ],
      "multiSelect": false
    }
  ]
}
```

**Default:** Polling for MVP (defer WebSocket until user base validated)

---

### Step 3: P2 Features (NICE-TO-HAVE - Document as Deferred)

**Documented in Plan (not asked via tool):**

| Feature | Recommendation | Rationale |
|---------|----------------|-----------|
| **Video/Reels** | Defer to v2 | Major complexity (video processing, streaming infrastructure) |
| **Direct Messaging** | Defer to v2 | Separate subsystem (chat != feed architecture) |
| **Stories (24h)** | Defer to v2 | Requires scheduled cleanup, TTL logic |

---

### Final Implementation Summary

**After P0 + P1 answers collected:**

```markdown
## Implementation Plan

### Tech Stack (Based on Answers)
- Storage: [User's P0 answer]
- Feed: [User's P0 answer]
- Auth: [User's P0 answer]
- Real-time: [User's P1 answer]

### Deferred Features
- Video/Reels → v2
- Direct Messaging → v2
- Stories → v2

### Estimated MVP Time
- With Cloudinary + Follow-Only + Clerk + Polling: **15-20 hours**
- If changed to AWS S3 + Algorithmic + Custom Auth: **+10 hours**

### Next Steps
1. Create project structure
2. Set up authentication ([chosen method])
3. Implement photo upload ([chosen storage])
4. Build feed ([chosen algorithm])
5. Add engagement (likes/comments)
6. Testing + deployment
```

---

## 🎯 Principles Recap

1. **Every question = Architectural decision** → Not data gathering
2. **Show trade-offs** → User understands consequences
3. **Prioritize blocking decisions** → Cannot proceed without
4. **Provide defaults** → If user doesn't answer, we proceed anyway
5. **Domain-aware** → Ecommerce questions ≠ Auth questions ≠ Real-time questions
6. **Iterative** → More questions as patterns emerge during implementation
