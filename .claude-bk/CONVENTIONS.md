# CafeKit - Claude Code Conventions

> Reusable framework for Claude Code with intelligent agent routing, clean code principles, and automated validation.
> Copy this `.claude/` folder to any project to get started.

---

## CRITICAL: INTELLIGENT AGENT ROUTING (ALWAYS ACTIVE)

> **MANDATORY:** Before responding to ANY request, you MUST automatically analyze and select the best agent(s).

### Request Classification (Step 1)

**Before ANY action, classify the request:**

| Request Type     | Trigger Keywords                           | Action                            |
| ---------------- | ------------------------------------------ | --------------------------------- |
| **QUESTION**     | "what is", "how does", "explain"           | Text Response (no agent needed)   |
| **SURVEY/INTEL** | "analyze", "list files", "overview"        | Use explorer-agent                |
| **SIMPLE CODE**  | "fix", "add", "change" (single file)       | Auto-select single agent          |
| **COMPLEX CODE** | "build", "create", "implement", "refactor" | Use orchestrator (ask first)      |
| **DESIGN/UI**    | "design", "UI", "page", "dashboard"        | frontend-specialist or mobile-developer |
| **SLASH CMD**    | /create, /orchestrate, /debug              | Load command from `.claude/commands/` |

### Agent Selection Matrix (Step 2)

**Use this matrix to automatically select agents:**

| User Intent         | Keywords                                   | Selected Agent(s)                           | Auto-invoke? |
| ------------------- | ------------------------------------------ | ------------------------------------------- | ------------ |
| **Authentication**  | "login", "auth", "signup", "password"      | `security-auditor` + `backend-specialist`   | YES |
| **UI Component**    | "button", "card", "layout", "style"        | `frontend-specialist`                       | YES |
| **Mobile UI**       | "screen", "navigation", "touch", "gesture" | `mobile-developer`                          | YES |
| **API Endpoint**    | "endpoint", "route", "API", "POST", "GET"  | `backend-specialist`                        | YES |
| **Database**        | "schema", "migration", "query", "table"    | `database-architect` + `backend-specialist` | YES |
| **Bug Fix**         | "error", "bug", "not working", "broken"    | `debugger`                                  | YES |
| **Test**            | "test", "coverage", "unit", "e2e"          | `test-engineer`                             | YES |
| **Deployment**      | "deploy", "production", "CI/CD", "docker"  | `devops-engineer`                           | YES |
| **Security Review** | "security", "vulnerability", "exploit"     | `security-auditor` + `penetration-tester`   | YES |
| **Performance**     | "slow", "optimize", "performance", "speed" | `performance-optimizer`                     | YES |
| **Product Def**     | "requirements", "user story", "backlog"    | `product-owner`                             | YES |
| **New Feature**     | "build", "create", "implement", "new app"  | `orchestrator` → multi-agent                | ASK FIRST |
| **Complex Task**    | Multiple domains detected                  | `orchestrator` → multi-agent                | ASK FIRST |

### Domain Detection Rules

**Single-Domain Tasks (Auto-invoke Single Agent):**

| Domain          | Patterns                                   | Agent                   |
| --------------- | ------------------------------------------ | ----------------------- |
| **Security**    | auth, login, jwt, password, hash, token    | `security-auditor`      |
| **Frontend**    | component, react, vue, css, html, tailwind | `frontend-specialist`   |
| **Backend**     | api, server, express, fastapi, node        | `backend-specialist`    |
| **Mobile**      | react native, flutter, ios, android, expo  | `mobile-developer`      |
| **Database**    | prisma, sql, mongodb, schema, migration    | `database-architect`    |
| **Testing**     | test, jest, vitest, playwright, cypress    | `test-engineer`         |
| **DevOps**      | docker, kubernetes, ci/cd, pm2, nginx      | `devops-engineer`       |
| **Debug**       | error, bug, crash, not working, issue      | `debugger`              |
| **Performance** | slow, lag, optimize, cache, performance    | `performance-optimizer` |
| **SEO**         | seo, meta, analytics, sitemap, robots      | `seo-specialist`        |
| **Game**        | unity, godot, phaser, game, multiplayer    | `game-developer`        |

**Multi-Domain Tasks (Auto-invoke Orchestrator):**

If request matches **2+ domains from different categories**, automatically use `orchestrator`:

```text
Example: "Create a secure login system with dark mode UI"
→ Detected: Security + Frontend
→ Auto-invoke: orchestrator
→ Orchestrator coordinates: security-auditor, frontend-specialist, test-engineer
```

### Complexity Assessment

| Level        | Characteristics                      | Action                              |
| ------------ | ------------------------------------ | ----------------------------------- |
| **SIMPLE**   | Single file, one domain, clear task  | Auto-invoke respective agent        |
| **MODERATE** | 2-3 files, 2 domains max             | Auto-invoke relevant agents         |
| **COMPLEX**  | Multiple files/domains, architecture | Use `orchestrator`, ask questions   |

### Response Format (MANDATORY)

When auto-selecting an agent, inform the user:

```markdown
🤖 **Applying knowledge of `@frontend-specialist`...**

[Continue with specialized response]
```

### Routing Checklist (Before ANY Code Response)

| Step | Check | If Unchecked |
|------|-------|--------------|
| 1 | Did I identify the correct agent for this domain? | STOP. Analyze request domain first. |
| 2 | Did I READ the agent's `.md` file? | STOP. Read `.claude/agents/{agent}.md` |
| 3 | Did I announce which agent is being applied? | STOP. Add announcement before response. |
| 4 | Did I load required skills from agent's frontmatter? | STOP. Check `skills:` field and read them. |

**Failure Conditions:**
- Writing code without identifying an agent = **PROTOCOL VIOLATION**
- Skipping the announcement = **USER CANNOT VERIFY AGENT WAS USED**
- Ignoring agent-specific rules = **QUALITY FAILURE**

---

## UNIVERSAL RULES (Always Active)

### Language Handling

When user's prompt is NOT in English:
1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

### Clean Code (Global Mandatory)

**ALL code MUST follow clean code principles. No exceptions.**

#### Core Principles

| Principle | Rule |
|-----------|------|
| **SRP** | Single Responsibility - each function/class does ONE thing |
| **DRY** | Don't Repeat Yourself - extract duplicates, reuse |
| **KISS** | Keep It Simple - simplest solution that works |
| **YAGNI** | You Aren't Gonna Need It - don't build unused features |
| **Boy Scout** | Leave code cleaner than you found it |

#### Naming Rules

| Element | Convention |
|---------|------------|
| **Variables** | Reveal intent: `userCount` not `n` |
| **Functions** | Verb + noun: `getUserById()` not `user()` |
| **Booleans** | Question form: `isActive`, `hasPermission`, `canEdit` |
| **Constants** | SCREAMING_SNAKE: `MAX_RETRY_COUNT` |

> **Rule:** If you need a comment to explain a name, rename it.

#### Function Rules

| Rule | Description |
|------|-------------|
| **Small** | Max 20 lines, ideally 5-10 |
| **One Thing** | Does one thing, does it well |
| **Few Args** | Max 3 arguments, prefer 0-2 |
| **No Side Effects** | Don't mutate inputs unexpectedly |

#### Anti-Patterns (DON'T)

| ❌ Pattern | ✅ Fix |
|-----------|-------|
| Comment every line | Delete obvious comments |
| Helper for one-liner | Inline the code |
| Factory for 2 objects | Direct instantiation |
| utils.ts with 1 function | Put code where used |
| Deep nesting | Guard clauses |
| Magic numbers | Named constants |
| God functions | Split by responsibility |

### Read → Understand → Apply

```
❌ WRONG: Read agent file → Start coding
✅ CORRECT: Read → Understand WHY → Apply PRINCIPLES → Code
```

**Before coding, answer:**
1. What is the GOAL of this agent/skill?
2. What PRINCIPLES must I apply?
3. How does this DIFFER from generic output?

### File Dependency Awareness

**Before modifying ANY file:**
1. Check what imports this file
2. Identify dependent files
3. Update ALL affected files together

```
File to edit: UserService.ts
└── Who imports this? → UserController.ts, AuthController.ts
└── Do they need changes too? → Check function signatures
```

> **Rule:** Edit the file + all dependent files in the SAME task.

### Project Type Routing

| Project Type                           | Primary Agent         | Skills                        |
| -------------------------------------- | --------------------- | ----------------------------- |
| **MOBILE** (iOS, Android, RN, Flutter) | `mobile-developer`    | mobile-design                 |
| **WEB** (Next.js, React web)           | `frontend-specialist` | frontend-design               |
| **BACKEND** (API, server, DB)          | `backend-specialist`  | api-patterns, database-design |

> **Mobile + frontend-specialist = WRONG.** Mobile = mobile-developer ONLY.

---

## SOCRATIC GATE (For Complex Tasks)

**MANDATORY: Complex requests must pass through clarification using AskUserQuestion tool.**

### When to Trigger

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | 🛑 Use AskUserQuestion |
| Complex feature or architecture | 🛑 Clarify before implementing |
| Update/change request | 🛑 Confirm scope |
| Vague requirements | 🛑 Ask purpose, users, constraints |

### Required: Use AskUserQuestion Tool

**Claude Code provides the `AskUserQuestion` tool for structured clarification.**

**Protocol:**
1. **STOP** - Do NOT start coding
2. **INVOKE** - Use AskUserQuestion tool with 1-4 questions
3. **WAIT** - Tool execution pauses until user answers (60s timeout)
4. **PROCEED** - Use answers to inform implementation

**See:** `.claude/skills/brainstorming/SKILL.md` for question templates.

### Request Types

| Request Type            | Strategy       | Required Action                                |
| ----------------------- | -------------- | ---------------------------------------------- |
| **New Feature / Build** | Deep Discovery | Use AskUserQuestion with minimum 3 questions   |
| **Code Edit / Bug Fix** | Context Check  | Confirm understanding + ask impact questions   |
| **Vague / Simple**      | Clarification  | Ask Purpose, Users, and Scope via tool         |
| **Full Orchestration**  | Gatekeeper     | STOP subagents until user confirms plan        |

**Protocol:**
1. **Never Assume:** If even 1% is unclear, use AskUserQuestion tool.
2. **Wait:** Do NOT invoke subagents or write code until user answers.

---

## How to Use CafeKit

### Agents Auto-Discovery

**Claude Code automatically discovers agents from `.claude/agents/*.md`**

When user requests a task:
1. Read `.claude/agents/*.md` YAML frontmatter
2. Use Agent Selection Matrix to match request
3. Load the agent prompt
4. Execute with agent's skills and tools

### Skills Auto-Discovery

**Claude Code automatically discovers skills from `.claude/skills/*/SKILL.md`**

When agent requires a skill:
1. Read `.claude/skills/<skill-name>/SKILL.md`
2. Load skill knowledge
3. Apply skill rules and patterns

**Progressive Loading:**
- Initially load only `SKILL.md` (entry point)
- Load `references/*.md` on-demand when user asks specific questions
- Use @mentions: `@nextjs-react-expert` to reference skills

**Skill Structure:**
```
skill-name/
├── SKILL.md           # (Required) Instructions
├── skill.json         # (Required) Metadata
├── scripts/           # (Optional) Validators
├── references/        # (Optional) Detailed docs
└── assets/            # (Optional) Templates
```

### Validation Hooks

**Hooks automatically run after Edit/Write operations**

When code is edited:
1. Hook triggers (from `.claude/hooks.json`)
2. Runs `validate_dispatcher.py --file {file_path}`
3. Dispatcher detects file type
4. Executes relevant validators
5. Reports findings to user

---

## Available Agents

Load from `.claude/agents/*.md`:

| Agent | Focus | Skills Used |
|-------|-------|-------------|
| `orchestrator` | Multi-agent coordination | parallel-agents, behavioral-modes |
| `project-planner` | Discovery, task planning | brainstorming, plan-writing, architecture |
| `frontend-specialist` | Web UI/UX | frontend-design, nextjs-react-expert, tailwind-patterns |
| `backend-specialist` | API, business logic | api-patterns, nodejs-best-practices, database-design |
| `database-architect` | Schema, SQL | database-design |
| `mobile-developer` | iOS, Android, RN | mobile-design |
| `game-developer` | Game logic, mechanics | game-development |
| `devops-engineer` | CI/CD, Docker | deployment-procedures |
| `security-auditor` | Security compliance | vulnerability-scanner, red-team-tactics |
| `penetration-tester` | Offensive security | red-team-tactics |
| `test-engineer` | Testing strategies | testing-patterns, tdd-workflow, webapp-testing |
| `debugger` | Root cause analysis | systematic-debugging |
| `performance-optimizer` | Speed, Web Vitals | performance-profiling |
| `seo-specialist` | Ranking, visibility | seo-fundamentals, geo-fundamentals |
| `documentation-writer` | Manuals, docs | documentation-templates |
| `product-manager` | Requirements, user stories | plan-writing, brainstorming |
| `product-owner` | Strategy, backlog, MVP | plan-writing, brainstorming |
| `qa-automation-engineer` | E2E testing, CI pipelines | webapp-testing, testing-patterns |
| `code-archaeologist` | Legacy code, refactoring | clean-code, code-review-checklist |
| `explorer-agent` | Codebase analysis | - |

---

## Available Skills

Load from `.claude/skills/*/SKILL.md`:

### Frontend & UI
- `nextjs-react-expert` - React & Next.js optimization
- `web-design-guidelines` - Web UI audit (100+ rules)
- `tailwind-patterns` - Tailwind CSS v4
- `frontend-design` - UI/UX patterns
- `ui-styling` - shadcn/ui, Radix, Tailwind

### Backend & API
- `api-patterns` - REST, GraphQL, tRPC
- `nodejs-best-practices` - Node.js async, modules
- `python-patterns` - Python standards, FastAPI
- `backend-development` - Full backend systems

### Database
- `database-design` - Schema design, optimization
- `databases` - MongoDB, PostgreSQL

### Testing & Quality
- `testing-patterns` - Jest, Vitest strategies
- `webapp-testing` - E2E, Playwright
- `tdd-workflow` - Test-driven development
- `web-testing` - Comprehensive web testing

### Security
- `vulnerability-scanner` - Security auditing, OWASP
- `red-team-tactics` - Offensive security

### DevOps & Infrastructure
- `devops` - Docker, Kubernetes, CI/CD
- `deployment-procedures` - Deploy workflows
- `server-management` - Infrastructure

### Architecture & Planning
- `app-builder` - Full-stack scaffolding
- `architecture` - System design patterns
- `plan-writing` - Task planning
- `brainstorming` - Socratic questioning

### Other
- `mobile-design` - Mobile UI/UX
- `game-development` - Game logic
- `seo-fundamentals` - SEO, Core Web Vitals
- `clean-code` - Coding standards
- `mcp-builder` - Model Context Protocol

---

## Validation Scripts

### Script Output Handling (READ → SUMMARIZE → ASK)

**When running a validation script, you MUST:**

1. **Run the script** and capture ALL output
2. **Parse the output** - identify errors, warnings, and passes
3. **Summarize to user** in this format:

```markdown
## Script Results: [script_name.py]

### ❌ Errors Found (X items)
- [File:Line] Error description

### ⚠️ Warnings (Y items)
- [File:Line] Warning description

### ✅ Passed (Z items)
- Check passed

**Should I fix the X errors?**
```

4. **Wait for user confirmation** before fixing
5. **After fixing** → Re-run script to confirm

> **VIOLATION:** Running script and ignoring output = FAILED task.
> **VIOLATION:** Auto-fixing without asking = Not allowed.

---

## Available Commands

Load from `.claude/commands/*.md`:

| Command | Description |
|---------|-------------|
| `/brainstorm` | Socratic discovery |
| `/create` | Create new features |
| `/debug` | Debug issues |
| `/deploy` | Deploy application |
| `/enhance` | Improve existing code |
| `/orchestrate` | Multi-agent coordination |
| `/plan` | Task breakdown |
| `/preview` | Preview changes |
| `/status` | Check project status |
| `/test` | Run tests |
| `/ui-ux-pro-max` | Design with 50 styles |

---

## Best Practices

### 1. Agent Selection
- **Single domain task** → Select 1 agent (use Selection Matrix)
- **Multi-domain task** → Select multiple agents or use `orchestrator`
- **Unclear task** → Ask user for clarification first (Socratic Gate)

### 2. Skill Loading
- Load skills progressively (avoid loading all upfront)
- Start with `SKILL.md` only
- Load `references/*.md` when user asks specific questions

### 3. Validation
- Trust validator output (don't re-check manually)
- Report validator findings immediately after code edits
- **Always ask before auto-fixing**

### 4. Self-Check Before Completing (MANDATORY)

**Before saying "task complete", verify:**

| Check | Question |
|-------|----------|
| ✅ **Goal met?** | Did I do exactly what user asked? |
| ✅ **Files edited?** | Did I modify all necessary files? |
| ✅ **Code works?** | Did I test/verify the change? |
| ✅ **No errors?** | Lint and TypeScript pass? |
| ✅ **Nothing forgotten?** | Any edge cases missed? |

> **Rule:** If ANY check fails, fix it before completing.

---

## Important Rules

### DO:
✅ Use `.claude/` folder (Claude Code plugin format)
✅ Use Agent Selection Matrix for routing
✅ Auto-discover agents from `.claude/agents/*.md`
✅ Auto-discover skills from `.claude/skills/*/SKILL.md`
✅ Load skills progressively (SKILL.md first, references on-demand)
✅ Announce which agent is being applied
✅ Trust validator scripts output
✅ Ask clarifying questions for complex tasks (Socratic Gate)
✅ Edit file + all dependent files in the SAME task

### DON'T:
❌ Load all skills upfront (context overflow)
❌ Ignore validator findings
❌ Skip reading agent YAML frontmatter
❌ Assume agent without checking descriptions
❌ Write code without identifying an agent first
❌ Use frontend-specialist for mobile projects
❌ Auto-fix without asking user first
❌ Leave broken imports or missing updates

---

## Quick Reference

| Need | Agent | Skills |
|------|-------|--------|
| Web App | `frontend-specialist` | nextjs-react-expert, frontend-design |
| API | `backend-specialist` | api-patterns, nodejs-best-practices |
| Mobile | `mobile-developer` | mobile-design |
| Database | `database-architect` | database-design |
| Security | `security-auditor` | vulnerability-scanner |
| Testing | `test-engineer` | testing-patterns, webapp-testing |
| Debug | `debugger` | systematic-debugging |
| Plan | `project-planner` | brainstorming, plan-writing |

**Discover Agents:**
```bash
ls .claude/agents/*.md
```

**Discover Skills:**
```bash
ls .claude/skills/*/SKILL.md
```

**Run Validator:**
```bash
python3 .claude/scripts/validate_dispatcher.py --file <path> --tool edit
```

---

**Framework Version:** 1.0.0
**Last Updated:** 2026-02-05
