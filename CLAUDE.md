# Antigravity Kit - Claude Code Convention

> Instructions for Claude Code to understand and use the `.claude/` plugin structure

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
| **SLASH CMD**    | /create, /orchestrate, /debug              | Load workflow from `.claude/workflows/` |

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

## TIER 0: UNIVERSAL RULES (Always Active)

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

**MANDATORY: Complex requests must pass through clarification first.**

### When to Trigger

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | 🛑 ASK 3 questions |
| Complex feature or architecture | 🛑 Clarify before implementing |
| Update/change request | 🛑 Confirm scope |
| Vague requirements | 🛑 Ask purpose, users, constraints |

### 3 Questions Before Implementation

1. **STOP** - Do NOT start coding
2. **ASK** - Minimum 3 questions:
   - 🎯 Purpose: What problem are you solving?
   - 👥 Users: Who will use this?
   - 📦 Scope: Must-have vs nice-to-have?
3. **WAIT** - Get response before proceeding

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

### Request Types

| Request Type            | Strategy       | Required Action                                |
| ----------------------- | -------------- | ---------------------------------------------- |
| **New Feature / Build** | Deep Discovery | ASK minimum 3 strategic questions              |
| **Code Edit / Bug Fix** | Context Check  | Confirm understanding + ask impact questions   |
| **Vague / Simple**      | Clarification  | Ask Purpose, Users, and Scope                  |
| **Full Orchestration**  | Gatekeeper     | STOP subagents until user confirms plan        |

**Protocol:**
1. **Never Assume:** If even 1% is unclear, ASK.
2. **Wait:** Do NOT invoke subagents or write code until user clears the Gate.

---

## 📁 Project Structure

This project uses **Antigravity Kit** - a Claude Code plugin with specialist agents and domain skills.

```
antigravity-kit/
├── .agent/                    # ⚠️ LEGACY - Google Antigravity format
│   └── (Keep for reference, but DO NOT USE)
│
├── .claude/                   # ✅ ACTIVE - Claude Code plugin format
│   ├── .claude-plugin/
│   │   └── plugin.json       # Plugin manifest
│   ├── agents/               # 20 specialist agents
│   ├── skills/               # 36+ domain skills
│   ├── workflows/            # 11 slash command procedures
│   ├── hooks/                # Validation hooks
│   └── scripts/              # Utilities & validators
│
└── web/                       # Demo web application
```

---

## 🎯 How to Use Antigravity Kit

### Agents Auto-Discovery

**You (Claude Code) automatically discover agents from `.claude/agents/*.md`**

When user requests a task:
1. Read all `.claude/agents/*.md` YAML frontmatter
2. Use Agent Selection Matrix to match request
3. Load the agent prompt
4. Execute with agent's skills and tools

### Skills Auto-Discovery

**You automatically discover skills from `.claude/skills/*/SKILL.md`**

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
├── SKILL.md           # (Required) Metadata & instructions
├── scripts/           # (Optional) Python/Bash validators
├── references/        # (Optional) Templates, docs
└── assets/            # (Optional) Images, logos
```

### Validation Hooks

**Hooks automatically run after Edit/Write operations**

When user edits code:
1. Hook triggers (from `.claude/hooks/hooks.json`)
2. Runs `validate_dispatcher.py --file {file_path}`
3. Dispatcher detects file type
4. Executes relevant validators from `.claude/skills/*/scripts/`
5. Reports findings to user

---

## 📋 Available Agents (20)

Load from `.claude/agents/*.md`:

| Agent | Focus | Skills Used |
|-------|-------|-------------|
| `orchestrator` | Multi-agent coordination | parallel-agents, behavioral-modes |
| `project-planner` | Discovery, task planning | brainstorming, plan-writing, architecture |
| `frontend-specialist` | Web UI/UX | frontend-design, nextjs-react-expert, tailwind-patterns |
| `backend-specialist` | API, business logic | api-patterns, nodejs-best-practices, database-design |
| `database-architect` | Schema, SQL | database-design, prisma-expert |
| `mobile-developer` | iOS, Android, RN | mobile-design |
| `game-developer` | Game logic, mechanics | game-development |
| `devops-engineer` | CI/CD, Docker | deployment-procedures, docker-expert |
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

## 🧩 Available Skills (36)

Load from `.claude/skills/*/SKILL.md`:

### Frontend & UI
| Skill | Description |
|-------|-------------|
| `nextjs-react-expert` | React & Next.js performance optimization (Vercel - 57 rules) |
| `web-design-guidelines` | Web UI audit - 100+ rules for accessibility, UX, performance |
| `tailwind-patterns` | Tailwind CSS v4 utilities |
| `frontend-design` | UI/UX patterns, design systems |
| `ui-ux-pro-max` | 50 styles, 21 palettes, 50 fonts |

### Backend & API
| Skill | Description |
|-------|-------------|
| `api-patterns` | REST, GraphQL, tRPC |
| `nestjs-expert` | NestJS modules, DI, decorators |
| `nodejs-best-practices` | Node.js async, modules |
| `python-patterns` | Python standards, FastAPI |

### Database
| Skill | Description |
|-------|-------------|
| `database-design` | Schema design, optimization |
| `prisma-expert` | Prisma ORM, migrations |

### TypeScript/JavaScript
| Skill | Description |
|-------|-------------|
| `typescript-expert` | Type-level programming, performance |

### Cloud & Infrastructure
| Skill | Description |
|-------|-------------|
| `docker-expert` | Containerization, Compose |
| `deployment-procedures` | CI/CD, deploy workflows |
| `server-management` | Infrastructure management |

### Testing & Quality
| Skill | Description |
|-------|-------------|
| `testing-patterns` | Jest, Vitest, strategies |
| `webapp-testing` | E2E, Playwright |
| `tdd-workflow` | Test-driven development |
| `code-review-checklist` | Code review standards |
| `lint-and-validate` | Linting, validation |

### Security
| Skill | Description |
|-------|-------------|
| `vulnerability-scanner` | Security auditing, OWASP |
| `red-team-tactics` | Offensive security |

### Architecture & Planning
| Skill | Description |
|-------|-------------|
| `app-builder` | Full-stack app scaffolding |
| `architecture` | System design patterns |
| `plan-writing` | Task planning, breakdown |
| `brainstorming` | Socratic questioning |

### Mobile
| Skill | Description |
|-------|-------------|
| `mobile-design` | Mobile UI/UX patterns |

### Game Development
| Skill | Description |
|-------|-------------|
| `game-development` | Game logic, mechanics |

### SEO & Growth
| Skill | Description |
|-------|-------------|
| `seo-fundamentals` | SEO, E-E-A-T, Core Web Vitals |
| `geo-fundamentals` | GenAI optimization |

### Shell/CLI
| Skill | Description |
|-------|-------------|
| `bash-linux` | Linux commands, scripting |
| `powershell-windows` | Windows PowerShell |

### Other
| Skill | Description |
|-------|-------------|
| `clean-code` | Coding standards (Global) |
| `behavioral-modes` | Agent personas |
| `parallel-agents` | Multi-agent patterns |
| `mcp-builder` | Model Context Protocol |
| `documentation-templates` | Doc formats |
| `i18n-localization` | Internationalization |
| `performance-profiling` | Web Vitals, optimization |
| `systematic-debugging` | Troubleshooting |
| `intelligent-routing` | Auto agent selection |

---

## 🔧 Validation Scripts (18)

### Agent → Script Mapping

| Agent | Script | Command |
|-------|--------|---------|
| **frontend-specialist** | UX Audit | `python .claude/skills/frontend-design/scripts/ux_audit.py .` |
| **frontend-specialist** | A11y Check | `python .claude/skills/frontend-design/scripts/accessibility_checker.py .` |
| **backend-specialist** | API Validator | `python .claude/skills/api-patterns/scripts/api_validator.py .` |
| **mobile-developer** | Mobile Audit | `python .claude/skills/mobile-design/scripts/mobile_audit.py .` |
| **database-architect** | Schema Validate | `python .claude/skills/database-design/scripts/schema_validator.py .` |
| **security-auditor** | Security Scan | `python .claude/skills/vulnerability-scanner/scripts/security_scan.py .` |
| **seo-specialist** | SEO Check | `python .claude/skills/seo-fundamentals/scripts/seo_checker.py .` |
| **seo-specialist** | GEO Check | `python .claude/skills/geo-fundamentals/scripts/geo_checker.py .` |
| **performance-optimizer** | Lighthouse | `python .claude/skills/performance-profiling/scripts/lighthouse_audit.py <url>` |
| **test-engineer** | Test Runner | `python .claude/skills/testing-patterns/scripts/test_runner.py .` |
| **test-engineer** | Playwright | `python .claude/skills/webapp-testing/scripts/playwright_runner.py <url>` |
| **Any agent** | Lint Check | `python .claude/skills/lint-and-validate/scripts/lint_runner.py .` |
| **Any agent** | Type Coverage | `python .claude/skills/lint-and-validate/scripts/type_coverage.py .` |
| **Any agent** | i18n Check | `python .claude/skills/i18n-localization/scripts/i18n_checker.py .` |
| **Any agent** | React Perf | `python .claude/skills/nextjs-react-expert/scripts/react_performance_checker.py .` |

### Script Output Handling (READ → SUMMARIZE → ASK)

**When running a validation script, you MUST:**

1. **Run the script** and capture ALL output
2. **Parse the output** - identify errors, warnings, and passes
3. **Summarize to user** in this format:

```markdown
## Script Results: [script_name.py]

### ❌ Errors Found (X items)
- [File:Line] Error description 1
- [File:Line] Error description 2

### ⚠️ Warnings (Y items)
- [File:Line] Warning description

### ✅ Passed (Z items)
- Check 1 passed
- Check 2 passed

**Should I fix the X errors?**
```

4. **Wait for user confirmation** before fixing
5. **After fixing** → Re-run script to confirm

> **VIOLATION:** Running script and ignoring output = FAILED task.
> **VIOLATION:** Auto-fixing without asking = Not allowed.

### Master Scripts

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `checklist.py` | Priority-based validation (Core checks) | Development, pre-commit |
| `verify_all.py` | Comprehensive verification (All checks) | Pre-deployment, releases |

**Usage:**
```bash
# Quick validation during development
python .claude/scripts/checklist.py .

# Full verification before deployment
python .claude/scripts/verify_all.py . --url http://localhost:3000
```

---

## 📖 Workflows (11)

Available workflows in `.claude/workflows/*.md`:

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

## 🎯 Best Practices for You (Claude Code)

### 1. Agent Selection
- **Single domain task** → Select 1 agent (use Selection Matrix)
- **Multi-domain task** → Select multiple agents or use `orchestrator`
- **Unclear task** → Ask user for clarification first (Socratic Gate)

### 2. Skill Loading
- Load skills progressively (avoid loading all 36 upfront)
- Start with `SKILL.md` only
- Load `references/*.md` when user asks specific questions
- Use skill's "Content Map" or "Quick Decision Tree" to find relevant sections

### 3. Validation
- Trust validator output (don't re-check manually)
- Report validator findings immediately after code edits
- If validator fails, explain the issue and suggest fixes
- **Always ask before auto-fixing**

### 4. Context Management
- Agents auto-discovered (no need to list all 20)
- Skills loaded on-demand (use @mentions)
- Validators run automatically (via hooks)

### 5. Self-Check Before Completing (MANDATORY)

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

## ⚠️ Important Rules

### DO:
✅ Use `.claude/` folder (active plugin format)
✅ Use Agent Selection Matrix for routing
✅ Auto-discover agents from `.claude/agents/*.md`
✅ Auto-discover skills from `.claude/skills/*/SKILL.md`
✅ Load skills progressively (SKILL.md first, references on-demand)
✅ Announce which agent is being applied
✅ Trust validator scripts output
✅ Use agent's specified tools and skills
✅ Ask clarifying questions for complex tasks (Socratic Gate)
✅ Edit file + all dependent files in the SAME task

### DON'T:
❌ Use `.agent/` folder (legacy Google Antigravity format)
❌ Load all 36 skills upfront (context overflow)
❌ Ignore validator findings
❌ Skip reading agent YAML frontmatter
❌ Assume agent without checking descriptions
❌ Write code without identifying an agent first
❌ Use frontend-specialist for mobile projects
❌ Auto-fix without asking user first
❌ Leave broken imports or missing updates

---

## 🔍 How to Read Agent/Skill Files

### Agent Format (`.claude/agents/*.md`)

```yaml
---
name: frontend-specialist
description: Expert React/Next.js architect for UI development
tools: Read, Write, Edit, Bash, Grep, Glob
model: inherit
skills: nextjs-react-expert, frontend-design, tailwind-patterns
---

# System Prompt Content
You are a Frontend Development Specialist...
```

**You should:**
1. Read YAML frontmatter for metadata
2. Check `description` to match user request
3. Load specified `skills`
4. Use allowed `tools`
5. Follow system prompt instructions

### Skill Format (`.claude/skills/*/SKILL.md`)

```yaml
---
name: nextjs-react-expert
description: React/Next.js performance optimization
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Skill Content
## Quick Decision Tree
[Decision tree for selective reading]

## Section 1: Critical Topic
[Critical knowledge]

## References
- references/1-detailed-topic.md
```

**You should:**
1. Read SKILL.md for overview
2. Use "Quick Decision Tree" or "Content Map" to find relevant sections
3. Load `references/*.md` only when user needs specific details
4. Run validation scripts from `scripts/` if available

---

## 📊 Example User Interactions

### Example 1: Simple Task (Auto-route)
```
User: "Fix the login button style"

Your workflow:
1. Classify: SIMPLE CODE (single file, one domain)
2. Detect domain: Frontend (keyword: "button", "style")
3. Select: frontend-specialist
4. Announce: "🤖 Applying knowledge of @frontend-specialist..."
5. Load skills: nextjs-react-expert
6. Fix the button
7. Hook triggers → react_performance_checker.py runs
8. Report validator findings
```

### Example 2: Multi-Domain Task (Orchestrator)
```
User: "Create a secure login system with dark mode UI"

Your workflow:
1. Classify: COMPLEX CODE (multi-domain)
2. Detect domains: Security + Frontend
3. Select: orchestrator
4. Ask Socratic questions first:
   - "What authentication method? (JWT, session, OAuth)"
   - "What styling framework? (Tailwind, CSS-in-JS)"
   - "Any specific security requirements?"
5. After user answers, invoke:
   - security-auditor → authentication logic
   - frontend-specialist → dark mode UI
   - test-engineer → test coverage
6. Synthesize results
```

### Example 3: Mobile Task
```
User: "Build a mobile app screen for user profile"

Your workflow:
1. Detect domain: Mobile (keyword: "mobile", "screen")
2. Select: mobile-developer (NOT frontend-specialist)
3. Announce: "🤖 Applying knowledge of @mobile-developer..."
4. Load skills: mobile-design
5. Build mobile screen
```

---

## 🚀 Quick Reference

| Need | Agent | Skills |
|------|-------|--------|
| Web App | `frontend-specialist` | nextjs-react-expert, frontend-design |
| API | `backend-specialist` | api-patterns, nodejs-best-practices |
| Mobile | `mobile-developer` | mobile-design |
| Database | `database-architect` | database-design, prisma-expert |
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

**Check Validators:**
```bash
ls .claude/skills/*/scripts/*.py
```

**Run Validator Manually:**
```bash
python3 .claude/scripts/validate_dispatcher.py --file <path> --tool edit
```

---

## 📝 Summary

**As Claude Code, you should:**
1. ✅ Use Agent Selection Matrix to route requests
2. ✅ Automatically discover agents from `.claude/agents/`
3. ✅ Load skills from `.claude/skills/` on-demand
4. ✅ Announce which agent is being applied
5. ✅ Use progressive loading (SKILL.md first, references later)
6. ✅ Trust validator output from hooks
7. ✅ Follow Socratic Gate for complex tasks
8. ✅ Ask before auto-fixing issues
9. ❌ Never use `.agent/` folder (legacy format)
10. ❌ Never use frontend-specialist for mobile projects

**This ensures:**
- Expert-level responses (intelligent routing)
- Efficient context usage (progressive loading)
- Code quality (automated validation)
- Claude Code native compatibility (plugin format)

---

**Last Updated:** 2026-01-27
**Plugin Version:** 1.0.0
**Total Components:** 20 agents + 36 skills + 11 workflows + 18 validators
