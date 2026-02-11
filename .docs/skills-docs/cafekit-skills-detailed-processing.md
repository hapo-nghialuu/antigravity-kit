# CafeKit Framework - Detailed Skill Processing Analysis

> Comprehensive processing details for all 90 skills in the CafeKit AI Agent Framework
> Generated: 2026-02-05
> Version: 2.0 - Detailed Processing Edition

---

## Table of Contents

1. [Overview](#overview)
2. [How Skills Work](#how-skills-work)
3. [Skill Processing Details by Category](#skill-processing-details-by-category)
4. [Tools Reference](#tools-reference)
5. [Skill Execution Flow](#skill-execution-flow)

---

## Overview

This document provides **detailed processing information** for every skill in CafeKit, including:

- **Exact steps** each skill takes when activated
- **Tools used** (Read, Edit, Bash, Grep, etc.)
- **Files read/modified**
- **Internal workflow/logic**
- **Decision trees** and branching logic

---

## How Skills Work

### Skill Activation Flow

```
User Input
    ↓
Keyword Matching (against skill.json triggers)
    ↓
Skill Loading (SKILL.md + skill.json + references/)
    ↓
Context Analysis (current files, project state)
    ↓
Tool Execution (Read → Analyze → Edit/Write/Bash)
    ↓
Output Generation
```

### Skill Structure

Each skill folder contains:
```
skill-name/
├── SKILL.md          # Main instructions (loaded into context)
├── skill.json        # Metadata + trigger words
└── references/       # Detailed docs (loaded on-demand)
    └── *.md
```

---

## Skill Processing Details by Category

---

### CATEGORY 1: AI & MULTIMEDIA

---

#### 1. AI-MULTIMODAL

**File:** `.claude/skills/ai-multimodal/SKILL.md`

**Trigger Detection:**
- Image file uploads (PNG, JPG, GIF, WebP)
- Keywords: "screenshot", "image", "picture", "photo", "diagram", "chart", "UI", "design", "mockup"
- Video/audio file mentions

**Processing Steps:**

```
Step 1: FILE DETECTION
├── Check if input contains file paths
├── Validate file extensions (.png, .jpg, .mp4, .mp3, etc.)
└── Verify file exists with Read tool

Step 2: MULTIMODAL ANALYSIS
├── Load image/video/audio via Read tool
├── Process through multimodal LLM (Gemini API)
├── Extract visual/textual/audio information
└── Build context from media content

Step 3: CONTEXT INTEGRATION
├── Combine media analysis with text conversation
├── Identify relationships between media and text
├── Determine user intent from combined context
└── Build comprehensive understanding

Step 4: RESPONSE GENERATION
├── Generate descriptive analysis of media
├── Answer questions about media content
├── Provide recommendations based on visuals
└── Code implementation (if requested)
```

**Tools Used:**
| Tool | Purpose |
|------|---------|
| `Read` | Load image/video/audio files |
| `Grep` | Search for related code |
| `Edit` | Implement visual changes |
| `Write` | Create new files based on analysis |

**Files Read:**
- Image files: `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`
- Video files: `*.mp4`, `*.mov`, `*.webm`
- Audio files: `*.mp3`, `*.wav`, `*.m4a`

**Files Modified:**
- UI components when implementing design feedback
- Code files based on visual analysis
- Documentation with diagrams

**Example Workflow:**
```
User: "Analyze this screenshot of my UI"
↓
Read: Load screenshot.png
↓
Analyze: Identify layout issues, color problems, spacing
↓
Response: Detailed UI critique + improvement suggestions
↓
(Optional) Edit: Apply fixes to component files
```

---

#### 2. SEQUENTIAL-THINKING

**File:** `.claude/skills/sequential-thinking/SKILL.md`

**Trigger Detection:**
- Keywords: "step by step", "reasoning", "work through", "logic", "think through"
- Complex problem descriptions
- Multi-step reasoning requests

**Processing Steps:**

```
Step 1: PROBLEM DECOMPOSITION
├── Identify the core problem
├── Break into logical sub-problems
├── Establish dependencies between steps
└── Create reasoning chain structure

Step 2: SEQUENTIAL REASONING
├── Process step 1 → Record conclusion
├── Process step 2 (build on step 1) → Record conclusion
├── Process step 3 (build on step 2) → Record conclusion
├── Continue until problem resolved
└── Allow branching for alternative approaches

Step 3: VALIDATION
├── Verify each step's logic
├── Check for contradictions
├── Validate final conclusion
└── Identify gaps or errors

Step 4: REVISION (if needed)
├── Flag uncertain steps
├── Revise with new information
├── Branch into alternative paths
└── Consolidate findings
```

**Tools Used:**
| Tool | Purpose |
|------|---------|
| `SequentialThinking` | MCP tool for structured reasoning |
| `Read` | Reference materials |
| `WebFetch` | External information |

**Internal State Management:**
- Maintains thought history
- Tracks revision branches
- Records confidence levels
- Enables backtracking

**Example Workflow:**
```
User: "Solve this step by step: database query is slow"
↓
Step 1: Identify query location (confidence: high)
Step 2: Analyze query structure (confidence: high)
Step 3: Check for missing indexes (confidence: medium)
Step 4: Verify with EXPLAIN (confidence: high)
Step 5: Propose optimization (confidence: high)
↓
Output: Step-by-step solution with reasoning
```

---

#### 3. GOOGLE-ADK-PYTHON

**File:** `.claude/skills/google-adk-python/SKILL.md`

**Trigger Detection:**
- Keywords: "Google ADK", "ADK Python", "Gemini agent", "ADK workflow"
- Agent development requests with Google AI

**Processing Steps:**

```
Step 1: ENVIRONMENT SETUP
├── Check Python version (3.9+)
├── Install google-adk package
├── Verify Google Cloud credentials
└── Set up virtual environment

Step 2: AGENT STRUCTURE CREATION
├── Create agent directory structure
├── Define agent.py with LlmAgent
├── Configure model (Gemini)
├── Set up tools/ directory
└── Create __init__.py files

Step 3: TOOL IMPLEMENTATION
├── Define tool functions with @tool decorator
├── Add type hints and docstrings
├── Implement error handling
└── Test tool functionality

Step 4: SESSION CONFIGURATION
├── Create session state management
├── Configure memory (if needed)
├── Set up callbacks
└── Define exit conditions

Step 5: TESTING & DEPLOYMENT
├── Test agent locally
├── Debug tool calls
├── Optimize performance
└── Package for deployment
```

**Tools Used:**
| Tool | Purpose |
|------|---------|
| `Bash` | pip install, python execution |
| `Write` | Create agent files |
| `Read` | Review existing code |
| `Edit` | Modify configurations |

**Files Created:**
```
project/
├── agent.py              # Main agent definition
├── tools/
│   ├── __init__.py
│   └── custom_tools.py   # Tool implementations
├── callback.py           # Optional callbacks
└── .env                  # API keys
```

---

### CATEGORY 2: APP BUILDING & ORCHESTRATION

---

#### 4. APP-BUILDER

**File:** `.claude/skills/app-builder/SKILL.md`

**Trigger Detection:**
- Keywords: "create app", "build app", "new project", "full-stack", "SaaS", "MVP"
- Application scaffolding requests

**Processing Steps:**

```
Step 1: REQUIREMENTS ANALYSIS
├── Parse natural language request
├── Extract functional requirements
├── Identify non-functional requirements
├── Determine target users/platform
└── Clarify scope (MVP vs full feature)

Step 2: TECH STACK SELECTION
├── Detect preferred technologies from request
├── Analyze existing project (if any)
├── Choose frontend framework (React, Vue, etc.)
├── Choose backend (Node.js, Python, etc.)
├── Select database (PostgreSQL, MongoDB, etc.)
└── Determine deployment platform

Step 3: PROJECT SCAFFOLDING
├── Run CLI command (create-next-app, etc.)
├── Set up directory structure
├── Initialize git repository
├── Configure package.json / pyproject.toml
└── Install dependencies

Step 4: CORE ARCHITECTURE
├── Create database schema
├── Set up API routes/endpoints
├── Implement authentication (if needed)
├── Create base components
└── Set up routing/navigation

Step 5: FEATURE IMPLEMENTATION
├── Implement CRUD operations
├── Create forms and validation
├── Add state management
├── Implement business logic
└── Add error handling

Step 6: TESTING & QUALITY
├── Set up testing framework
├── Write initial tests
├── Configure linting/formatting
└── Add type checking

Step 7: DEPLOYMENT SETUP
├── Create deployment configs
├── Set up environment variables
├── Configure CI/CD (optional)
└── Write deployment docs
```

**Tools Used:**
| Tool | Purpose |
|------|---------|
| `Bash` | CLI commands (npm create, git init) |
| `Write` | Create project files |
| `Read` | Check existing structure |
| `Grep` | Find patterns in templates |

**Coordination with Other Agents:**
```
App Builder (orchestrator)
    ├── frontend-specialist → UI components
    ├── backend-specialist → API implementation
    ├── database-architect → Schema design
    └── devops-engineer → Deployment config
```

---

#### 5. ENHANCE

**File:** `.claude/skills/enhance/SKILL.md`

**Trigger Detection:**
- Keywords: "add feature", "update", "improve", "iterative", "enhancement"
- `/enhance` command

**Processing Steps:**

```
Step 1: PROJECT STATE ANALYSIS
├── Read current project structure
├── Analyze existing features
├── Identify tech stack
├── Check for existing specs
└── Review recent changes

Step 2: REQUIREMENT CLARIFICATION
├── Parse feature request
├── Identify affected components
├── Determine scope (small/medium/large)
├── Check dependencies
└── Assess breaking changes

Step 3: PLANNING (for major changes)
├── Create implementation plan
├── Identify files to modify
├── Estimate effort
├── Present to user for approval
└── Wait for confirmation

Step 4: IMPLEMENTATION
├── Read affected files
├── Apply changes incrementally
├── Follow existing code patterns
├── Maintain backward compatibility
└── Add/update tests

Step 5: VERIFICATION
├── Run tests
├── Check for errors
├── Verify feature works
├── Review code quality
└── Update documentation

Step 6: HOT RELOAD
├── Restart dev server if needed
├── Update preview
├── Verify in browser
└── Report completion
```

**Tools Used:**
| Tool | Purpose |
|------|---------|
| `Read` | Analyze existing code |
| `Edit` | Apply changes |
| `Bash` | Run tests, restart server |
| `Glob` | Find related files |

---

#### 6. CREATE (/create command)

**File:** `.claude/skills/create/SKILL.md` (or `.claude/commands/create.md`)

**Trigger Detection:**
- Command: `/create`
- Natural language app creation requests

**Processing Steps:**

```
Step 1: DIALOGUE INITIATION
├── Acknowledge create command
├── Start interactive questioning
├── Gather requirements incrementally
└── Build project specification

Step 2: REQUIREMENT GATHERING
├── Ask: What type of app? (web, mobile, API)
├── Ask: What features are needed?
├── Ask: Any tech preferences?
├── Ask: Target users?
└── Clarify: Timeline/deadline?

Step 3: SPECIFICATION BUILDING
├── Compile answers into spec
├── Identify core features (MVP)
├── Suggest nice-to-have features
├── Propose tech stack
└── Present plan to user

Step 4: APP BUILDER INVOCATION
├── Pass compiled spec to app-builder
├── Set up project directory
├── Begin scaffolding
└── Report progress

Step 5: PROJECT HANDOFF
├── Present completed project
├── Show file structure
├── Explain key files
├── Provide next steps
└── Offer additional features
```

**Interactive Flow:**
```
User: /create
Claude: "What would you like to build?"
User: "A task management app"
Claude: "What features should it have?"
User: "Add tasks, set deadlines, mark complete"
Claude: "Any tech preference? (suggesting Next.js + Prisma)"
User: "Sounds good"
Claude: [Starts building with app-builder]
```

---

#### 7. ORCHESTRATE

**File:** `.claude/skills/orchestrate/SKILL.md`

**Trigger Detection:**
- Keywords: "coordinate", "multi-agent", "orchestrate", "complex task"
- `/orchestrate` command

**Processing Steps:**

```
Step 1: TASK ANALYSIS
├── Decompose complex task into subtasks
├── Identify required expertise areas
├── Determine task dependencies
├── Assess parallel vs sequential needs
└── Create task assignment plan

Step 2: AGENT SELECTION
├── Map subtasks to specialist agents:
│   ├── Frontend UI → frontend-specialist
│   ├── API design → backend-specialist
│   ├── Database → database-architect
│   ├── Security → security-auditor
│   └── DevOps → devops-engineer
└── Validate agent availability

Step 3: PARALLEL EXECUTION
├── Spawn Task tool for each agent
├── Provide context + specific subtask
├── Run agents concurrently
├── Monitor progress
└── Collect intermediate results

Step 4: RESULT AGGREGATION
├── Receive outputs from all agents
├── Reconcile conflicting recommendations
├── Merge code changes
├── Resolve integration issues
└── Synthesize final solution

Step 5: VERIFICATION
├── Verify integrated solution works
├── Check for gaps
├── Validate against original requirements
└── Present unified result to user
```

**Agent Coordination Matrix:**

| Task Type | Primary Agent | Secondary Agents |
|-----------|---------------|------------------|
| Full-stack feature | orchestrator | frontend + backend + database |
| Security audit | security-auditor | backend-specialist (for fixes) |
| Performance optimization | performance-optimizer | frontend + backend + database |
| Database migration | database-architect | devops + backend |
| Complex bug fix | debugger | relevant domain specialists |

---

#### 8. PARALLEL-AGENTS

**File:** `.claude/skills/parallel-agents/SKILL.md`

**Trigger Detection:**
- Keywords: "parallel", "concurrent", "multiple agents", "at the same time"
- Tasks requiring multiple perspectives

**Processing Steps:**

```
Step 1: TASK DECOMPOSITION
├── Analyze main task
├── Identify independent subtasks
├── Determine which can run in parallel
├── Define success criteria for each
└── Create task specifications

Step 2: CONTEXT PREPARATION
├── Prepare shared context (common files, requirements)
├── Create task-specific context for each agent
├── Ensure no conflicting instructions
└── Set up result collection mechanism

Step 3: CONCURRENT EXECUTION
├── Spawn Task tool calls in parallel:
│   ├── Task 1: subagent_type="frontend-specialist"
│   ├── Task 2: subagent_type="backend-specialist"
│   ├── Task 3: subagent_type="security-auditor"
│   └── ... (up to 32 concurrent tasks)
├── All tasks execute simultaneously
└── Wait for all completions

Step 4: RESULT INTEGRATION
├── Collect outputs from all tasks
├── Identify overlaps/conflicts
├── Merge compatible recommendations
├── Flag contradictory advice
└── Create unified response

Step 5: CONFLICT RESOLUTION (if needed)
├── Analyze conflicting recommendations
├── Determine best approach
├── Explain trade-offs
└── Present final recommendation
```

**Concurrency Limits:**
- Maximum 32 parallel tasks
- Each task gets full context
- Results aggregated when all complete

---

#### 9. BRAINSTORMING

**File:** `.claude/skills/brainstorming/SKILL.md`

**Trigger Detection:**
- Keywords: "brainstorm", "ideas", "options", "possibilities", "what if"
- `/brainstorm` command

**Processing Steps:**

```
Step 1: PROBLEM CLARIFICATION
├── Restate the problem/question
├── Identify constraints
├── Clarify goals/objectives
├── Define success criteria
└── Establish scope

Step 2: DIVERGENT THINKING
├── Generate multiple approaches (10+)
├── Explore different angles
├── Consider unconventional solutions
├── Build on initial ideas
└── Avoid premature judgment

Step 3: ORGANIZATION
├── Group related ideas
├── Categorize by approach type
├── Identify themes/patterns
├── Prioritize by feasibility
└── Create concept maps

Step 4: EVALUATION
├── Assess pros/cons of top ideas
├── Consider implementation effort
├── Evaluate risks
├── Check alignment with goals
└── Rank recommendations

Step 5: SYNTHESIS
├── Present organized ideas
├── Provide rationale for each
├── Offer prioritized recommendations
├── Suggest next steps
└── Invite user feedback
```

**Brainstorming Techniques Used:**
- Mind mapping
- SCAMPER (Substitute, Combine, Adapt, Modify, Put, Eliminate, Reverse)
- Six Thinking Hats
- Reverse brainstorming

---

### CATEGORY 3: BACKEND & DATABASE

---

#### 10. BACKEND-DEVELOPMENT

**File:** `.claude/skills/backend-development/SKILL.md`

**Trigger Detection:**
- Keywords: "backend", "API", "server", "NestJS", "FastAPI", "Django", "Express"
- Server-side implementation requests

**Processing Steps:**

```
Step 1: FRAMEWORK DETECTION
├── Check package.json for existing framework
├── Detect language preference (TypeScript/JavaScript/Python)
├── Identify ORM (Prisma, TypeORM, Drizzle, SQLAlchemy)
└── Determine architecture pattern

Step 2: PROJECT STRUCTURE SETUP
├── Create directory structure:
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── middleware/     # Auth, validation
│   │   ├── utils/          # Helpers
│   │   └── config/         # Configuration
│   ├── tests/
│   └── docs/
├── Initialize framework
└── Set up entry point

Step 3: DATABASE SETUP
├── Create connection config
├── Set up ORM models/entities
├── Create migration files
├── Seed initial data (if needed)
└── Test connection

Step 4: API IMPLEMENTATION
├── Define routes/endpoints
├── Implement controllers
├── Add request validation (Zod, Joi, class-validator)
├── Create service layer
├── Add error handling
└── Implement pagination

Step 5: AUTHENTICATION & AUTHORIZATION
├── Set up JWT or session auth
├── Create auth middleware
├── Implement role-based access
├── Add password hashing
└── Set up OAuth (if needed)

Step 6: BUSINESS LOGIC
├── Implement domain logic
├── Add data transformations
├── Handle edge cases
├── Add logging
└── Implement caching (Redis)

Step 7: TESTING
├── Write unit tests for services
├── Write integration tests for APIs
├── Set up test database
├── Mock external dependencies
└── Achieve >80% coverage
```

**Tools Used:**
| Tool | Purpose |
|------|---------|
| `Write` | Create source files |
| `Edit` | Modify existing code |
| `Bash` | Run npm/pip install, migrations |
| `Read` | Review existing code |

---

#### 11. NODEJS-BEST-PRACTICES

**File:** `.claude/skills/nodejs-best-practices/SKILL.md`

**Trigger Detection:**
- Keywords: "Node.js", "Express", "Fastify", "npm", "async patterns"
- Node.js optimization requests

**Processing Steps:**

```
Step 1: CODE ANALYSIS
├── Read existing Node.js code
├── Identify framework (Express/Fastify/NestJS)
├── Check package.json dependencies
├── Analyze async patterns used
└── Identify security issues

Step 2: PATTERN APPLICATION
├── Apply async/await (avoid callbacks)
├── Implement proper error handling
├── Add input validation
├── Use dependency injection (NestJS)
└── Apply middleware patterns

Step 3: SECURITY HARDENING
├── Add Helmet for headers
├── Implement rate limiting
├── Sanitize user inputs
├── Use parameterized queries
├── Add CORS configuration
└── Hide error details in production

Step 4: PERFORMANCE OPTIMIZATION
├── Implement caching strategies
├── Add connection pooling
├── Use streams for large data
├── Optimize event loop usage
└── Add monitoring (PM2, New Relic)

Step 5: STRUCTURE IMPROVEMENT
├── Apply folder structure best practices
├── Separate concerns (MVC/layered)
├── Create reusable utilities
├── Add proper logging (Winston/Pino)
└── Implement config management

Step 6: TESTING SETUP
├── Add Jest/Vitest configuration
├── Write unit tests
├── Add integration tests
├── Set up coverage reporting
└── Add pre-commit hooks
```

**Key Patterns Enforced:**
| Pattern | Implementation |
|---------|----------------|
| Async/Await | Replace all callbacks |
| Error Handling | Try-catch + error middleware |
| Validation | Zod/Joi for all inputs |
| Security | Helmet + express-rate-limit |
| Logging | Structured logging with Pino |

---

#### 12. PYTHON-PATTERNS

**File:** `.claude/skills/python-patterns/SKILL.md`

**Trigger Detection:**
- Keywords: "Python", "FastAPI", "Flask", "Django", "Pandas", "script"
- Python development requests

**Processing Steps:**

```
Step 1: ENVIRONMENT SETUP
├── Check Python version (3.9+)
├── Create virtual environment
├── Set up pyproject.toml or requirements.txt
├── Install dependencies
└── Configure type checking (mypy)

Step 2: PROJECT STRUCTURE
├── Create directory layout:
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models/
│   │   ├── services/
│   │   └── api/
│   ├── tests/
│   ├── Dockerfile
│   └── pyproject.toml
└── Set up entry points

Step 3: FRAMEWORK SELECTION
├── FastAPI: Modern, async, auto-docs
├── Flask: Simple, flexible
├── Django: Full-featured, batteries-included
└── Configure chosen framework

Step 4: CODE IMPLEMENTATION
├── Add type hints (PEP 484)
├── Use dataclasses/Pydantic models
├── Implement async functions
├── Add docstrings (Google/NumPy style)
└── Follow PEP 8 style guide

Step 5: PATTERN APPLICATION
├── Repository pattern for DB access
├── Dependency injection
├── Service layer for business logic
├── Middleware for cross-cutting concerns
└── Context managers for resources

Step 6: TESTING
├── Set up pytest
├── Write unit tests
├── Add integration tests
├── Configure coverage (pytest-cov)
└── Add test fixtures

Step 7: DEPLOYMENT
├── Create Dockerfile
├── Set up Gunicorn/Uvicorn
├── Configure environment variables
├── Add health checks
└── Document deployment
```

**Pythonic Principles Applied:**
- "Explicit is better than implicit"
- "Readability counts"
- Type hints everywhere
- Context managers for resource management
- List/dict comprehensions

---

#### 13. API-PATTERNS

**File:** `.claude/skills/api-patterns/SKILL.md`

**Trigger Detection:**
- Keywords: "API design", "REST", "GraphQL", "endpoint", "swagger"
- API architecture decisions

**Processing Steps:**

```
Step 1: API STYLE SELECTION
├── Evaluate options:
│   ├── REST: Standard, cacheable, simple
│   ├── GraphQL: Flexible queries, complex data
│   ├── tRPC: Type-safe, full-stack TypeScript
│   └── gRPC: High performance, binary
└── Recommend based on use case

Step 2: ENDPOINT DESIGN
├── Define resource naming (plural nouns)
├── Design URL structure:
│   ├── GET    /api/v1/users       (list)
│   ├── GET    /api/v1/users/:id   (get one)
│   ├── POST   /api/v1/users       (create)
│   ├── PUT    /api/v1/users/:id   (update)
│   ├── PATCH  /api/v1/users/:id   (partial update)
│   └── DELETE /api/v1/users/:id   (delete)
└── Establish nesting limits (max 2 levels)

Step 3: REQUEST/RESPONSE DESIGN
├── Define consistent envelope:
│   {
│     "data": {...},        // or [...]
│     "meta": {...},        // pagination, etc.
│     "error": null         // or error object
│   }
├── Standardize HTTP status codes
├── Add request ID for tracing
└── Implement HATEOAS (optional)

Step 4: VERSIONING STRATEGY
├── URL versioning: /api/v1/... (recommended)
├── Header versioning: Accept-Version: v1
└── Document deprecation policy

Step 5: PAGINATION
├── Offset-based: ?page=1&limit=20
├── Cursor-based: ?cursor=xyz&limit=20 (for large datasets)
├── Include in response:
│   {
│     "data": [...],
│     "pagination": {
│       "page": 1,
│       "limit": 20,
│       "total": 100,
│       "hasMore": true
│     }
│   }

Step 6: ERROR HANDLING
├── Standardize error format:
│   {
│     "error": {
│       "code": "VALIDATION_ERROR",
│       "message": "...",
│       "details": [...]
│     }
│   }
├── Use appropriate HTTP codes:
│   ├── 400: Bad Request
│   ├── 401: Unauthorized
│   ├── 403: Forbidden
│   ├── 404: Not Found
│   ├── 422: Validation Error
│   └── 500: Internal Server Error

Step 7: DOCUMENTATION
├── Create OpenAPI/Swagger spec
├── Add endpoint descriptions
├── Document request/response schemas
├── Add authentication docs
└── Include example requests
```

---

#### 14. DATABASE-DESIGN

**File:** `.claude/skills/database-design/SKILL.md`

**Trigger Detection:**
- Keywords: "database schema", "ER diagram", "normalization", "entity"
- Database architecture requests

**Processing Steps:**

```
Step 1: REQUIREMENTS GATHERING
├── Identify entities from requirements
├── Define relationships (1:1, 1:N, M:N)
├── Determine data volume estimates
├── Identify query patterns
└── Note performance requirements

Step 2: CONCEPTUAL DESIGN
├── Create ER diagram (entities & relationships)
├── Define primary keys
├── Identify natural keys vs surrogate keys
├── Map inheritance hierarchies
└── Document business rules

Step 3: LOGICAL DESIGN
├── Convert ER to tables
├── Define columns with types:
│   ├── Use appropriate data types
│   ├── Set lengths/precision
│   ├── Define NULL constraints
│   └── Add default values
├── Normalize to 3NF (or denormalize for performance)
└── Create junction tables for M:N

Step 4: PHYSICAL DESIGN
├── Design indexes:
│   ├── Primary key (clustered)
│   ├── Foreign key indexes
│   ├── Query-specific indexes
│   └── Partial/filtered indexes
├── Consider partitioning (large tables)
├── Plan sharding strategy (if needed)
└── Set up tablespaces/storage

Step 5: CONSTRAINTS & VALIDATION
├── Add foreign key constraints
├── Create check constraints
├── Set up unique constraints
├── Add triggers (if needed)
└── Document constraints

Step 6: MIGRATION PLANNING
├── Create migration sequence
├── Plan data migration
├── Design rollback strategy
├── Add migration tests
└── Document procedures
```

**Normalization Rules:**
| Normal Form | Rule |
|-------------|------|
| 1NF | Atomic values, no repeating groups |
| 2NF | 1NF + no partial dependencies |
| 3NF | 2NF + no transitive dependencies |
| BCNF | Every determinant is a candidate key |

---

#### 15. DATABASES

**File:** `.claude/skills/databases/SKILL.md`

**Trigger Detection:**
- Keywords: "SQL", "PostgreSQL", "MongoDB", "Prisma", "query", "migration"
- Database operation requests

**Processing Steps:**

```
Step 1: DATABASE DETECTION
├── Check for Prisma schema
├── Look for Drizzle config
├── Identify TypeORM entities
├── Detect MongoDB connections
└── Determine database type

Step 2: QUERY WRITING
├── For SQL:
│   ├── Write efficient SELECT statements
│   ├── Use JOINs appropriately
│   ├── Add WHERE clauses with indexes
│   ├── Use LIMIT/OFFSET or cursor pagination
│   └── Optimize with EXPLAIN ANALYZE
├── For NoSQL:
│   ├── Design document structure
│   ├── Create appropriate indexes
│   ├── Use aggregation pipelines
│   └── Implement pagination

Step 3: ORM OPERATIONS
├── Prisma:
│   ├── Write Prisma Client queries
│   ├── Use include for relations
│   ├── Implement transactions
│   └── Use raw queries when needed
├── Drizzle:
│   ├── Define schemas
│   ├── Write type-safe queries
│   └── Use migrations

Step 4: MIGRATION MANAGEMENT
├── Create migration files
├── Write up/down migrations
├── Test migrations locally
├── Plan production deployment
└── Document breaking changes

Step 5: PERFORMANCE OPTIMIZATION
├── Analyze slow queries
├── Add missing indexes
├── Optimize query structure
├── Implement caching (Redis)
└── Consider denormalization

Step 6: CONNECTION MANAGEMENT
├── Set up connection pooling
├── Configure connection limits
├── Handle connection errors
├── Implement retry logic
└── Monitor connection health
```

---

#### 16. BETTER-AUTH

**File:** `.claude/skills/better-auth/SKILL.md`

**Trigger Detection:**
- Keywords: "authentication", "login", "signup", "better-auth", "OAuth", "JWT"
- Auth system implementation requests

**Processing Steps:**

```
Step 1: PROJECT DETECTION
├── Check for Next.js (primary target)
├── Detect existing auth solution
├── Identify database (Prisma preferred)
└── Check framework compatibility

Step 2: PACKAGE INSTALLATION
├── Run: npm install better-auth
├── Install database adapter
├── Add social provider packages (if needed)
└── Update package.json

Step 3: CONFIGURATION SETUP
├── Create auth.ts config file:
│   ├── Define database adapter
│   ├── Configure social providers
│   ├── Set session strategy
│   ├── Define callbacks
│   └── Add custom fields
└── Set up environment variables

Step 4: DATABASE SCHEMA
├── Add auth tables to schema:
│   ├── User
│   ├── Session
│   ├── Account (for OAuth)
│   └── VerificationToken
├── Create migration
└── Apply to database

Step 5: API ROUTES
├── Create auth API route:
│   ├── /api/auth/[...all]
│   ├── Handle all auth operations
│   └── Export auth handler
└── Set up CORS if needed

Step 6: CLIENT IMPLEMENTATION
├── Create AuthProvider wrapper
├── Add useSession hook
├── Implement login form
├── Create signup form
├── Add OAuth buttons
└── Handle password reset

Step 7: PROTECTED ROUTES
├── Create middleware for protection
├── Add getServerSession for SSR
├── Implement client-side guards
└── Handle role-based access

Step 8: TESTING
├── Test login flow
├── Verify session persistence
├── Test OAuth providers
├── Check password reset
└── Test protected routes
```

---

#### 17. SERVER-MANAGEMENT

**File:** `.claude/skills/server-management/SKILL.md`

**Trigger Detection:**
- Keywords: "server", "nginx", "Apache", "SSL", "DNS", "hosting"
- Server configuration requests

**Processing Steps:**

```
Step 1: SERVER ASSESSMENT
├── Identify server type (VPS, dedicated, cloud)
├── Check OS (Ubuntu, CentOS, etc.)
├── Assess current configuration
├── Identify running services
└── Check resource usage

Step 2: WEB SERVER SETUP
├── For Nginx:
│   ├── Install nginx
│   ├── Create site config
│   ├── Set up reverse proxy
│   ├── Configure SSL
│   └── Enable gzip/brotli
├── For Apache:
│   ├── Install apache2
│   ├── Enable required modules
│   ├── Create virtual host
│   └── Configure .htaccess

Step 3: SSL/TLS CONFIGURATION
├── Install Certbot
├── Generate certificates
├── Set up auto-renewal
├── Configure HTTPS redirects
├── Add HSTS headers
└── Test SSL rating

Step 4: DOMAIN & DNS
├── Configure DNS records:
│   ├── A record → server IP
│   ├── CNAME for www
│   └── MX records (if email)
├── Set up reverse DNS
├── Configure subdomain routing
└── Test DNS propagation

Step 5: SECURITY HARDENING
├── Configure firewall (ufw/iptables)
├── Disable root SSH
├── Set up fail2ban
├── Remove unnecessary services
├── Update system packages
└── Configure automatic security updates

Step 6: MONITORING SETUP
├── Install monitoring tools
├── Set up log rotation
├── Configure alerts
├── Set up backup cron jobs
└── Document recovery procedures
```

---

#### 18. DEPLOYMENT-PROCEDURES

**File:** `.claude/skills/deployment-procedures/SKILL.md`

**Trigger Detection:**
- Keywords: "deploy", "production", "release", "CI/CD", "Docker"
- Deployment workflow requests

**Processing Steps:**

```
Step 1: PRE-DEPLOYMENT CHECKLIST
├── Run all tests (unit, integration, e2e)
├── Check test coverage (>80%)
├── Run security audit (npm audit)
├── Verify environment variables
├── Check database migrations
└── Create deployment notes

Step 2: PLATFORM DETECTION
├── Check for vercel.json → Vercel
├── Check for netlify.toml → Netlify
├── Check Dockerfile → Docker
├── Check fly.toml → Fly.io
└── Default to manual deployment

Step 3: BUILD PROCESS
├── Run production build
├── Verify build output
├── Check bundle size
├── Optimize assets
└── Generate source maps

Step 4: DATABASE MIGRATIONS
├── Create backup
├── Run migrations
├── Verify schema changes
├── Rollback plan ready
└── Test on staging first

Step 5: DEPLOYMENT EXECUTION
├── Deploy to staging
├── Run smoke tests
├── Deploy to production
├── Verify deployment
├── Monitor error rates
└── Check performance metrics

Step 6: POST-DEPLOYMENT
├── Verify all features work
├── Monitor logs for errors
├── Check user feedback
├── Document any issues
└── Schedule rollback window

Step 7: ROLLBACK PROCEDURE (if needed)
├── Identify last stable version
├── Execute rollback command
├── Verify rollback success
├── Communicate with team
└── Document lessons learned
```

---

#### 19. DEVOPS

**File:** `.claude/skills/devops/SKILL.md`

**Trigger Detection:**
- Keywords: "DevOps", "Docker", "Kubernetes", "CI/CD", "Cloudflare", "GCP"
- Infrastructure and automation requests

**Processing Steps:**

```
Step 1: INFRASTRUCTURE ASSESSMENT
├── Current setup analysis
├── Identify pain points
├── Determine scalability needs
├── Assess security posture
└── Define automation goals

Step 2: CONTAINERIZATION (Docker)
├── Create Dockerfile:
│   ├── Multi-stage build
│   ├── Minimal base image (Alpine/Distroless)
│   ├── Non-root user
│   └── Optimized layer caching
├── Create docker-compose.yml
├── Set up Docker registry
└── Document build process

Step 3: ORCHESTRATION (Kubernetes)
├── Create K8s manifests:
│   ├── Deployment
│   ├── Service
│   ├── Ingress
│   ├── ConfigMap
│   └── Secret
├── Set up Helm charts
├── Configure auto-scaling (HPA)
└── Implement health checks

Step 4: CI/CD PIPELINE
├── GitHub Actions:
│   ├── .github/workflows/ci.yml
│   ├── Test on PR
│   ├── Build on merge
│   └── Deploy on release
├── GitLab CI:
│   ├── .gitlab-ci.yml
│   ├── Stages: test → build → deploy
│   └── Environment-specific jobs
└── Set up deployment gates

Step 5: CLOUD PLATFORM SETUP
├── Cloudflare:
│   ├── Configure Workers
│   ├── Set up R2 storage
│   ├── Configure D1 database
│   └── Add Pages deployment
├── GCP:
│   ├── Cloud Run deployment
│   ├── Cloud Storage
│   └── Cloud SQL
└── AWS (if needed):
    ├── ECS/EKS
    ├── S3
    └── RDS

Step 6: MONITORING & OBSERVABILITY
├── Set up logging (ELK/Loki)
├── Configure metrics (Prometheus/Grafana)
├── Add distributed tracing
├── Set up alerting (PagerDuty/Slack)
└── Create dashboards

Step 7: SECURITY & COMPLIANCE
├── Run security scans (Trivy, Snyk)
├── Implement secrets management (Vault)
├── Configure network policies
├── Set up WAF rules
└── Regular security audits
```

---

### CATEGORY 4: FRONTEND & UI

---

#### 20. FRONTEND-DESIGN

**File:** `.claude/skills/frontend-design/SKILL.md`

**Trigger Detection:**
- Keywords: "frontend", "UI", "component", "interface", "responsive"
- UI implementation requests

**Processing Steps:**

```
Step 1: DESIGN ANALYSIS
├── Understand requirements
├── Identify design patterns
├── Check for existing design system
├── Determine accessibility needs
└── Review responsive requirements

Step 2: COMPONENT ARCHITECTURE
├── Choose component type:
│   ├── Presentational (props in, UI out)
│   ├── Container (data fetching)
│   ├── Layout (page structure)
│   └── Higher-Order (shared logic)
├── Define prop interface
├── Plan state management
└── Identify side effects

Step 3: IMPLEMENTATION
├── Create component file
├── Implement JSX/template
├── Add styling (CSS/Tailwind/styled)
├── Handle interactions
├── Add animations (if needed)
└── Implement error states

Step 4: RESPONSIVE DESIGN
├── Define breakpoints:
│   ├── Mobile: < 640px
│   ├── Tablet: 640px - 1024px
│   └── Desktop: > 1024px
├── Implement mobile-first approach
├── Test touch interactions
└── Optimize images

Step 5: ACCESSIBILITY (a11y)
├── Add semantic HTML
├── Implement ARIA labels
├── Ensure keyboard navigation
├── Check color contrast (WCAG 4.5:1)
├── Test with screen readers
└── Add focus indicators

Step 6: PERFORMANCE OPTIMIZATION
├── Lazy load below-fold content
├── Optimize images (WebP, srcset)
├── Code split large components
├── Memoize expensive renders
└── Measure Core Web Vitals
```

---

#### 21. NEXTJS-REACT-EXPERT

**File:** `.claude/skills/nextjs-react-expert/SKILL.md`

**Trigger Detection:**
- Keywords: "Next.js", "React", "App Router", "Server Components", "RSC"
- Next.js specific implementation

**Processing Steps:**

```
Step 1: PROJECT DETECTION
├── Check Next.js version (13+ for App Router)
├── Detect router type:
│   ├── App Router (app/ directory)
│   └── Pages Router (pages/ directory)
├── Identify rendering strategy:
│   ├── Static Generation (SSG)
│   ├── Server-Side Rendering (SSR)
│   ├── Incremental Static Regeneration (ISR)
│   └── Client-Side Rendering (CSR)
└── Check for existing config

Step 2: APP ROUTER PATTERNS
├── Server Components (default):
│   ├── Fetch data directly
│   ├── Access backend resources
│   ├── Keep bundle size small
│   └── Use for non-interactive UI
├── Client Components ("use client"):
│   ├── Add for interactivity
│   ├── Use hooks (useState, useEffect)
│   ├── Access browser APIs
│   └── Keep minimal
└── Composition pattern:
    ├── Server Component as parent
    └── Client Component for interactivity

Step 3: DATA FETCHING
├── Server Components:
│   ├── async function Component()
│   ├── Direct fetch() calls
│   ├── Caching with revalidate
│   └── Error handling with error.tsx
├── Route Handlers:
│   ├── app/api/route.ts
│   ├── HTTP methods (GET, POST, etc.)
│   └── Edge vs Node runtime

Step 4: ROUTING PATTERNS
├── Parallel Routes (@folder):
│   ├── app/@dashboard/page.tsx
│   ├── app/@settings/page.tsx
│   └── layout.tsx renders children + @slots
├── Intercepting Routes (.()):
│   ├── app/feed/page.tsx
│   └── app/feed/(.)photo/[id]/page.tsx
├── Route Groups (folder):
│   └── app/(marketing)/page.tsx
└── Dynamic Segments:
    ├── app/blog/[slug]/page.tsx
    └── generateStaticParams()

Step 5: RENDERING OPTIMIZATION
├── Image Optimization:
│   ├── Use next/image
│   ├── Automatic WebP conversion
│   ├── Responsive srcSet
│   └── Priority loading for LCP
├── Font Optimization:
│   ├── Use next/font
│   ├── Automatic subsetting
│   └── CSS variable injection
└── Script Optimization:
    ├── Use next/script
    ├── Lazy loading strategies
    └── Partytown for third-party

Step 6: CACHING STRATEGY
├── fetch() options:
│   ├── cache: 'force-cache' (default)
│   ├── cache: 'no-store'
│   ├── revalidate: 3600
│   └── next: { tags: ['posts'] }
├── Route Segment Config:
│   ├── export const revalidate = 60
│   ├── export const dynamic = 'force-dynamic'
│   └── export const fetchCache = 'default-cache'
└── Data Cache + Full Route Cache
```

---

#### 22. UI-STYLING

**File:** `.claude/skills/ui-styling/SKILL.md`

**Trigger Detection:**
- Keywords: "style", "CSS", "shadcn/ui", "Tailwind", "design system"
- Styling and component library requests

**Processing Steps:**

```
Step 1: TECH STACK DETECTION
├── Check for Tailwind config
├── Detect shadcn/ui usage
├── Identify CSS-in-JS (styled-components, emotion)
├── Check for existing theme
└── Assess design system

Step 2: COMPONENT LIBRARY SETUP (shadcn/ui)
├── Initialize shadcn:
│   └── npx shadcn-ui@latest init
├── Add components:
│   └── npx shadcn add button card input
├── Customize theme:
│   ├── colors in tailwind.config.ts
│   ├── border-radius
│   └── CSS variables
└── Extend components as needed

Step 3: TAILWIND IMPLEMENTATION
├── Configure tailwind.config.ts:
│   ├── content paths
│   ├── theme extensions
│   ├── plugins
│   └── custom utilities
├── Apply utility classes:
│   ├── Layout: flex, grid, container
│   ├── Spacing: p-4, m-2, gap-4
│   ├── Sizing: w-full, h-screen
│   ├── Typography: text-lg, font-bold
│   └── Colors: bg-primary, text-muted
└── Use arbitrary values sparingly

Step 4: THEME CONFIGURATION
├── Light/Dark mode:
│   ├── next-themes setup
│   ├── class strategy
│   └── dark: variants
├── Color system:
│   ├── Primary, secondary, accent
│   ├── Background, foreground
│   ├── Muted, destructive
│   └── Custom brand colors
└── CSS Variables:
    └── --background, --foreground, etc.

Step 5: RESPONSIVE DESIGN
├── Mobile-first approach
├── Breakpoint prefixes:
│   ├── sm: (640px+)
│   ├── md: (768px+)
│   ├── lg: (1024px+)
│   ├── xl: (1280px+)
│   └── 2xl: (1536px+)
└── Container queries for components

Step 6: ANIMATIONS
├── Tailwind transitions:
│   ├── transition-all duration-300
│   └── ease-in-out
├── Framer Motion (if needed):
│   ├── AnimatePresence
│   ├── motion.div
│   └── Layout animations
└── CSS keyframes for complex
```

---

#### 23. TAILWIND-PATTERNS

**File:** `.claude/skills/tailwind-patterns/SKILL.md`

**Trigger Detection:**
- Keywords: "Tailwind CSS", "utility classes", "container queries", "design tokens"
- Tailwind v4 specific patterns

**Processing Steps:**

```
Step 1: TAILWIND VERSION DETECTION
├── Check for v4 (CSS-first config)
├── Detect v3 (JS config)
├── Identify migration needs
└── Check for breaking changes

Step 2: V4 CSS-FIRST CONFIGURATION
├── Create CSS config:
│   @import "tailwindcss";
│   @theme {
│     --color-primary: #3b82f6;
│     --font-sans: "Inter", sans-serif;
│     --spacing-4: 1rem;
│   }
├── Define design tokens in CSS
├── Use @apply for component styles
└── No tailwind.config.js needed

Step 3: CONTAINER QUERIES
├── Use @container:
│   .card {
│     @apply @container;
│   }
│   .card-content {
│     @apply @md:grid-cols-2;
│   }
├── Responsive to container width
├── Better component portability
└── No media query breakpoints

Step 4: UTILITY PATTERNS
├── Layout:
│   flex, grid, block, hidden
│   items-center, justify-between
│   gap-4, space-y-2
├── Spacing:
│   p-4, px-2, py-3, pt-1
│   m-auto, mx-4, my-2
│   space-x-4, space-y-reverse
├── Typography:
│   text-sm, text-lg, text-2xl
│   font-bold, font-medium
│   leading-relaxed, tracking-wide
│   text-center, uppercase
└── Colors:
    bg-white, bg-gray-100
    text-black, text-muted-foreground
    border-border

Step 5: COMPONENT EXTRACTION
├── When to extract:
│   ├── Repeated 3+ times
│   ├── Complex combinations
│   └── Semantic meaning
├── Use @apply:
│   .btn {
│     @apply px-4 py-2 rounded-md
│            bg-primary text-primary-foreground
│            hover:bg-primary/90;
│   }
└── Or create React component

Step 6: PERFORMANCE
├── Purge unused styles (automatic in v4)
├── Minimize arbitrary values
├── Use built-in utilities
├── Lazy load heavy components
└── Monitor bundle size
```

---

#### 24. AESTHETIC

**File:** `.claude/skills/aesthetic/SKILL.md`

**Trigger Detection:**
- Keywords: "aesthetic", "beautiful", "design", "visual", "polish"
- Visual design refinement requests

**Processing Steps:**

```
Step 1: VISUAL AUDIT
├── Analyze current design
├── Identify visual hierarchy issues
├── Check spacing consistency
├── Review color usage
└── Assess typography

Step 2: COLOR THEORY APPLICATION
├── Choose color palette:
│   ├── Primary (brand color)
│   ├── Secondary (complementary)
│   ├── Neutral (grays)
│   ├── Semantic (success, error, warning)
│   └── Ensure WCAG contrast
├── Apply 60-30-10 rule:
│   ├── 60% dominant color
│   ├── 30% secondary color
│   └── 10% accent color

Step 3: TYPOGRAPHY
├── Font pairing:
│   ├── Heading font (display)
│   ├── Body font (readable)
│   └── Monospace (code)
├── Type scale:
│   ├── xs, sm, base, lg, xl
│   ├── 2xl, 3xl, 4xl, 5xl
│   └── Consistent ratios
└── Line height & letter spacing

Step 4: SPACING & LAYOUT
├── 8px grid system
├── Consistent spacing scale
├── Whitespace for breathing room
├── Alignment consistency
└── Visual rhythm

Step 5: VISUAL HIERARCHY
├── Size (larger = more important)
├── Color (contrast draws attention)
├── Spacing (isolation emphasizes)
├── Weight (bold = emphasis)
└── Position (top-left priority)

Step 6: MICRO-INTERACTIONS
├── Hover states
├── Focus indicators
├── Loading states
├── Transitions (300ms ease)
└── Feedback animations
```

---

#### 25. MOBILE-DESIGN

**File:** `.claude/skills/mobile-design/SKILL.md`

**Trigger Detection:**
- Keywords: "mobile", "responsive", "app", "touch", "PWA"
- Mobile-first design requests

**Processing Steps:**

```
Step 1: PLATFORM IDENTIFICATION
├── iOS (Human Interface Guidelines)
├── Android (Material Design)
├── Responsive Web
├── PWA
└── Cross-platform (React Native, Flutter)

Step 2: VIEWPORT CONFIGURATION
├── Meta viewport tag:
│   └── <meta name="viewport" content="width=device-width, initial-scale=1">
├── CSS viewport units:
│   ├── vw, vh for full-screen
│   ├── vmin, vmax
│   └── dvh (dynamic viewport height)
└── Safe area insets (notch handling)

Step 3: TOUCH TARGETS
├── Minimum touch size: 44x44px (iOS), 48x48dp (Android)
├── Adequate spacing between targets
├── Prevent accidental taps
├── Touch feedback (active states)
└── Gesture support (swipe, pinch)

Step 4: RESPONSIVE BREAKPOINTS
├── Mobile: < 640px
├── Tablet: 640px - 1024px
├── Desktop: > 1024px
├── Use container queries for components
└── Mobile-first media queries

Step 5: PERFORMANCE OPTIMIZATION
├── Lazy loading for images
├── Code splitting by route
├── Reduce JavaScript bundle
├── Optimize images (WebP, responsive)
├── Minimize repaints/reflows
└── Use CSS transforms for animations

Step 6: PWA FEATURES (if applicable)
├── Web App Manifest
├── Service Worker
├── Offline functionality
├── Add to Home Screen
├── Push notifications
└── Background sync
```

---

#### 26. WEB-DESIGN-GUIDELINES

**File:** `.claude/skills/web-design-guidelines/SKILL.md`

**Trigger Detection:**
- Keywords: "design guidelines", "accessibility", "a11y", "UX", "review UI"
- Design audit and guideline requests

**Processing Steps:**

```
Step 1: DESIGN AUDIT
├── Review current implementation
├── Compare against guidelines:
│   ├── Human Interface Guidelines (Apple)
│   ├── Material Design (Google)
│   ├── Fluent Design (Microsoft)
│   └── Web Content Accessibility Guidelines (WCAG)
└── Identify violations

Step 2: ACCESSIBILITY CHECK (WCAG 2.1)
├── Perceivable:
│   ├── Text alternatives for images
│   ├── Captions/transcripts for media
│   ├── Color not sole info source
│   └── Resizable text (200%)
├── Operable:
│   ├── Keyboard accessible
│   ├── No seizure triggers
│   ├── Navigable (skip links)
│   └── Input assistance
├── Understandable:
│   ├── Readable language
│   ├── Predictable behavior
│   └── Input error prevention
└── Robust:
    ├── Valid HTML
    └── Compatible with assistive tech

Step 3: USABILITY PRINCIPLES
├── Jakob Nielsen's 10 heuristics:
│   ├── Visibility of system status
│   ├── Match system to real world
│   ├── User control and freedom
│   ├── Consistency and standards
│   ├── Error prevention
│   ├── Recognition over recall
│   ├── Flexibility and efficiency
│   ├── Aesthetic and minimalist design
│   ├── Help users recognize errors
│   └── Help and documentation

Step 4: UX PATTERNS
├── Progressive disclosure
├── Skeuomorphism vs flat
├── Cards for content grouping
├── Infinite scroll vs pagination
├── Modal vs page
└── Form validation patterns

Step 5: DESIGN SYSTEM CONSISTENCY
├── Color palette adherence
├── Typography scale usage
├── Component consistency
├── Spacing rhythm
└── Iconography style
```

---

#### 27. WEB-FRAMEWORKS

**File:** `.claude/skills/web-frameworks/SKILL.md`

**Trigger Detection:**
- Keywords: "framework", "Turborepo", "Remix", "full-stack", "monorepo"
- Framework selection and setup

**Processing Steps:**

```
Step 1: FRAMEWORK EVALUATION
├── Next.js:
│   ├── App Router (React Server Components)
│   ├── Full-stack capabilities
│   ├── Vercel ecosystem
│   └── Best for: Most React projects
├── Remix:
│   ├── Web Standards focused
│   ├── Nested routing
│   ├── Progressive enhancement
│   └── Best for: Forms, dynamic apps
├── SvelteKit:
│   ├── Compiler-based
│   ├── Smaller bundles
│   ├── Less boilerplate
│   └── Best for: Performance-critical
├── Astro:
│   ├── Islands architecture
│   ├── Content-focused
│   ├── Multi-framework
│   └── Best for: Static sites, content
└── Selection based on use case

Step 2: TURBOREPO SETUP (monorepo)
├── Initialize:
│   └── npx create-turbo@latest
├── Structure:
│   ├── apps/
│   │   ├── web/          (Next.js app)
│   │   └── api/          (backend)
│   └── packages/
│       ├── ui/           (shared components)
│       ├── config/       (shared configs)
│       └── utils/        (shared utilities)
├── Configure turbo.json:
│   ├── Pipeline tasks
│   ├── Dependencies
│   └── Outputs/cache
└── Set up shared configs

Step 3: SHARED PACKAGES
├── Create package structure:
│   ├── package.json with exports
│   ├── tsconfig.json
│   └── src/index.ts
├── Build configuration:
│   ├── tsup for bundling
│   ├── TypeScript declarations
│   └── Watch mode for dev
└── Link to apps:
    └── "@repo/ui": "workspace:*"

Step 4: DEVELOPMENT WORKFLOW
├── Install dependencies at root
├── Run tasks with turbo:
│   ├── turbo dev (parallel dev)
│   ├── turbo build
│   ├── turbo test
│   └── turbo lint
└── Remote caching setup
```

---

### CATEGORY 5: TESTING & QUALITY

---

#### 28. TESTING-PATTERNS

**File:** `.claude/skills/testing-patterns/SKILL.md`

**Trigger Detection:**
- Keywords: "test", "Jest", "Vitest", "unit test", "integration test"
- Testing strategy and implementation

**Processing Steps:**

```
Step 1: TEST TYPE SELECTION
├── Unit Tests:
│   ├── Test individual functions
│   ├── Mock dependencies
│   ├── Fast execution
│   └── High coverage target (80%+)
├── Integration Tests:
│   ├── Test component interactions
│   ├── Real dependencies
│   └── Slower, fewer tests
├── E2E Tests:
│   ├── Full user flows
│   ├── Browser automation
│   └── Smoke tests only
└── Test Pyramid: Many unit → Some integration → Few E2E

Step 2: FRAMEWORK SETUP
├── Vitest (recommended for Vite):
│   ├── npm install -D vitest
│   ├── Create vitest.config.ts
│   ├── Setup coverage (v8)
│   └── Happy DOM for component tests
├── Jest (if required):
│   ├── Configure jest.config.js
│   ├── Setup ts-jest
│   └── Configure testEnvironment
└── Add test scripts to package.json

Step 3: UNIT TEST WRITING
├── AAA Pattern:
│   // Arrange
│   const input = { name: "John" };
│
│   // Act
│   const result = greet(input);
│
│   // Assert
│   expect(result).toBe("Hello, John");
├── Test cases:
│   ├── Happy path
│   ├── Edge cases
│   ├── Error cases
│   └── Boundary values
└── Descriptive test names

Step 4: MOCKING
├── Mock functions:
│   const mockFn = vi.fn();
│   mockFn.mockReturnValue('mocked');
├── Mock modules:
│   vi.mock('./api', () => ({
│     fetchUser: vi.fn()
│   }));
├── Mock timers:
│   vi.useFakeTimers();
│   vi.advanceTimersByTime(1000);
└── Restore mocks after each test

Step 5: INTEGRATION TESTS
├── Test API endpoints:
│   ├── Setup test database
│   ├── Make HTTP requests
│   ├── Assert response
│   └── Clean up data
├── Test database operations:
│   ├── Seed test data
│   ├── Run queries
│   ├── Assert results
│   └── Rollback transactions
└── Use test containers (Docker)

Step 6: COVERAGE REPORTING
├── Thresholds:
│   ├── statements: 80
│   ├── branches: 75
│   ├── functions: 80
│   └── lines: 80
├── CI integration
├── HTML report generation
└── Fail CI if below threshold
```

---

#### 29. WEB-TESTING

**File:** `.claude/skills/web-testing/SKILL.md`

**Trigger Detection:**
- Keywords: "Playwright", "E2E test", "browser testing", "cross-browser"
- Web application testing

**Processing Steps:**

```
Step 1: PLAYWRIGHT SETUP
├── Install:
│   └── npm init playwright@latest
├── Configure playwright.config.ts:
│   ├── Multiple browsers (Chromium, Firefox, WebKit)
│   ├── Viewport sizes
│   ├── Base URL
│   └── Retry configuration
└── Generate test files

Step 2: E2E TEST WRITING
├── Basic structure:
│   test('user can login', async ({ page }) => {
│     await page.goto('/login');
│     await page.fill('[name=email]', 'test@example.com');
│     await page.fill('[name=password]', 'password');
│     await page.click('button[type=submit]');
│     await expect(page).toHaveURL('/dashboard');
│   });
├── Best practices:
│   ├── Test user-visible behavior
│   ├── Use role selectors (preferred)
│   ├── Avoid testing implementation
│   └── One assertion per test (ideally)

Step 3: COMPONENT TESTING
├── Mount components:
│   test('button renders', async ({ mount }) => {
│     const component = await mount(<Button>Click</Button>);
│     await expect(component).toBeVisible();
│   });
├── Interact and assert
└── Test in isolation

Step 4: VISUAL REGRESSION
├── Screenshot comparisons:
│   test('homepage visual', async ({ page }) => {
│     await page.goto('/');
│     await expect(page).toHaveScreenshot();
│   });
├── Update baselines:
│   └── npx playwright test --update-snapshots
└── CI approval workflow

Step 5: ACCESSIBILITY TESTING
├── Use @axe-core/playwright:
│   const accessibilityScanResults =
│     await new AxeBuilder({ page }).analyze();
│   expect(accessibilityScanResults.violations)
│     .toEqual([]);
└── Catch a11y violations

Step 6: PERFORMANCE TESTING
├── Core Web Vitals:
│   ├── Largest Contentful Paint (LCP) < 2.5s
│   ├── First Input Delay (FID) < 100ms
│   └── Cumulative Layout Shift (CLS) < 0.1
├── Lighthouse CI integration
└── Performance budgets
```

---

#### 30. WEBAPP-TESTING

**File:** `.claude/skills/webapp-testing/SKILL.md`

**Trigger Detection:**
- Keywords: "webapp testing", "functional testing", "user flow"
- Application-level testing

**Processing Steps:**

```
Step 1: USER FLOW IDENTIFICATION
├── Map critical paths:
│   ├── User registration → Login → Dashboard
│   ├── Product browse → Cart → Checkout
│   ├── Content creation → Publish → View
│   └── Settings update → Verify
├── Define entry and exit points
├── Identify decision points
└── Document expected outcomes

Step 2: TEST SCENARIO DESIGN
├── Happy paths (successful flows)
├── Alternative paths (variations)
├── Exception paths (error handling)
├── Edge cases (boundary conditions)
└── Negative tests (invalid inputs)

Step 3: TEST DATA PREPARATION
├── Create test fixtures:
│   ├── Users (different roles)
│   ├── Products/items
│   ├── Settings/configurations
│   └── State snapshots
├── Data factories for generation
└── Database seeding scripts

Step 4: END-TO-END EXECUTION
├── Setup: Initialize state
├── Exercise: Perform user actions
├── Verify: Check outcomes
└── Teardown: Clean up state

Step 5: CROSS-BROWSER TESTING
├── Test on target browsers:
│   ├── Chrome (latest + 1 version back)
│   ├── Firefox (latest)
│   ├── Safari (latest)
│   └── Edge (latest)
├── Responsive testing:
│   ├── Mobile (375px)
│   ├── Tablet (768px)
│   ├── Desktop (1440px)
│   └── Large (1920px)
└── Device emulation
```

---

#### 31. TDD-WORKFLOW

**File:** `.claude/skills/tdd-workflow/SKILL.md`

**Trigger Detection:**
- Keywords: "TDD", "test-driven", "red green refactor"
- Test-first development requests

**Processing Steps:**

```
THE RED-GREEN-REFACTOR CYCLE:

PHASE 1: RED (Write failing test)
├── Understand requirements
├── Write minimal test:
│   test('calculates sum', () => {
│     expect(add(2, 2)).toBe(4);
│   });
├── Run test → Should FAIL
├── Confirm failure is expected
└── Commit: "Add failing test for add function"

PHASE 2: GREEN (Make test pass)
├── Write minimal implementation:
│   function add(a, b) {
│     return a + b;
│   }
├── Run test → Should PASS
├── Don't worry about quality yet
├── All tests should pass
└── Commit: "Implement add function"

PHASE 3: REFACTOR (Improve code)
├── Improve implementation:
│   // Add type safety
│   function add(a: number, b: number): number {
│     return a + b;
│   }
├── Run tests → Should still PASS
├── Improve without changing behavior
├── Clean up duplication
├── Better naming
└── Commit: "Refactor add with types"

REPEAT for each feature

TDD PRINCIPLES:
├── Write test before implementation
├── Tests are specifications
├── Small steps
├── Fast feedback loop
├── Refactor with confidence
└── Emergent design

WHEN NOT TO USE TDD:
├── Spikes/exploration
├── UI heavy features (use E2E)
├── Legacy code without tests
├── One-off scripts
└── Prototypes
```

---

#### 32. TEST (/test command)

**File:** `.claude/commands/test.md`

**Trigger Detection:**
- Command: `/test`
- Keywords: "run tests", "generate tests"

**Processing Steps:**

```
Step 1: PROJECT ANALYSIS
├── Detect test framework
├── Find test files
├── Check test configuration
└── Identify untested code

Step 2: TEST GENERATION (if needed)
├── Analyze source files:
│   ├── Read function/component
│   ├── Identify inputs/outputs
│   ├── Determine edge cases
│   └── Generate test cases
├── Create test file:
│   ├── Name: [filename].test.ts
│   ├── Import function under test
│   ├── Write describe/it blocks
│   └── Add assertions
└── Place in __tests__ or alongside

Step 3: TEST EXECUTION
├── Run test command:
│   ├── npm test (package.json script)
│   ├── npx vitest
│   ├── npx jest
│   └── npx playwright test
├── Capture output
├── Parse results:
│   ├── Passed count
│   ├── Failed count
│   ├── Coverage %
│   └── Duration
└── Report to user

Step 4: FAILURE ANALYSIS (if failures)
├── Read failed test output
├── Identify failing assertions
├── Locate source of failure
├── Suggest fixes
└── Offer to fix automatically

Step 5: COVERAGE REPORT
├── Generate coverage report
├── Identify uncovered lines
├── Suggest additional tests
└── Prioritize critical paths
```

---

#### 33. CODE-REVIEW

**File:** `.claude/skills/code-review/SKILL.md`

**Trigger Detection:**
- Keywords: "review code", "PR review", "feedback", "check my code"
- Code review requests

**Processing Steps:**

```
Step 1: CODE ANALYSIS
├── Read changed files
├── Understand context:
│   ├── What problem does this solve?
│   ├── Why this approach?
│   ├── Are there alternatives?
│   └── Impact on existing code
├── Check line-by-line:
│   ├── Logic correctness
│   ├── Edge cases
│   ├── Error handling
│   └── Performance implications

Step 2: CORRECTNESS CHECK
├── Does it work as intended?
├── Handle all edge cases?
├── Proper error handling?
├── Thread safety (if applicable)?
└── Resource leaks?

Step 3: SECURITY REVIEW
├── Input validation
├── Injection vulnerabilities
├── Authentication/authorization
├── Data exposure
├── Secrets management
└── Dependency vulnerabilities

Step 4: PERFORMANCE ASSESSMENT
├── Algorithmic complexity
├── Database query efficiency
├── Memory usage
├── Network requests
├── Bundle size (frontend)
└── Caching opportunities

Step 5: MAINTAINABILITY
├── Code readability
├── Naming clarity
├── Function size (max 20 lines)
├── Single responsibility
├── Test coverage
├── Documentation
└── Consistency with codebase

Step 6: FEEDBACK FORMAT
├── Use comment prefixes:
│   ├── 🔴 Critical - Must fix
│   ├── 🟡 Warning - Should fix
│   ├── 🟢 Suggestion - Nice to have
│   └── ❓ Question - Need clarification
├── Be specific and actionable
├── Explain why, not just what
├── Suggest code examples
└── Acknowledge good practices
```

---

#### 34. CODE-REVIEW-CHECKLIST

**File:** `.claude/skills/code-review-checklist/SKILL.md`

**Trigger Detection:**
- Keywords: "review checklist", "code audit", "review criteria"
- Structured review requests

**Processing Steps:**

```
Step 1: QUICK REVIEW (5-10 minutes)
├── Correctness:
│   ├── Logic errors
│   ├── Edge cases handled
│   ├── Error handling present
│   └── No undefined behavior
├── Security:
│   ├── Input validation
│   ├── No injection risks
│   ├── Auth checks present
│   └── No hardcoded secrets
├── Performance:
│   ├── No N+1 queries
│   ├── No memory leaks
│   ├── Efficient algorithms
│   └── Appropriate caching
├── Quality:
│   ├── Clear naming
│   ├── Reasonable complexity
│   ├── No code duplication
│   └── Test coverage adequate
└── Documentation:
    ├── Comments explain why
    ├── README updated
    ├── API docs current
    └── Breaking changes noted

Step 2: AI & LLM SPECIFIC CHECKS
├── Hallucinated APIs:
│   ├── Verify all imports exist
│   ├── Check function signatures
│   ├── Validate method chaining
│   └── Confirm property access
├── File paths:
│   ├── Check relative paths
│   ├── Verify file existence
│   └── Confirm case sensitivity
├── Placeholders:
│   ├── No TODO without ticket
│   ├── No FIXME left
│   ├── No console.log
│   └── No hardcoded test data

Step 3: ANTI-PATTERN FLAGGING
├── TypeScript:
│   ├── No explicit 'any'
│   ├── Proper type exports
│   └── Strict null checks
├── React:
│   ├── No direct DOM manipulation
│   ├── Proper hook dependencies
│   └── No setState in render
├── CSS:
│   ├── No inline styles (use CSS)
│   ├── No !important (rarely)
│   └── Responsive units
└── General:
    ├── No magic numbers
    ├── No commented code
    └── No nested conditionals (deep)

Step 4: COMMENT GUIDELINES
├── Prefix meanings:
│   ├── 🔴 Critical: Security/bug
│   ├── 🟡 Warning: Performance/maintenance
│   ├── 🟢 Suggestion: Style/improvement
│   └── ❓ Question: Clarification needed
├── Be constructive
├── Reference best practices
└── Offer alternatives
```

---

#### 35. LINT-AND-VALIDATE

**File:** `.claude/skills/lint-and-validate/SKILL.md`

**Trigger Detection:**
- Keywords: "lint", "ESLint", "format", "Prettier", "type check"
- Code quality automation

**Processing Steps:**

```
Step 1: TOOL DETECTION
├── Check package.json for:
│   ├── eslint
│   ├── prettier
│   ├── typescript
│   └── lint-staged
├── Detect configuration files:
│   ├── .eslintrc.*
│   ├── .prettierrc
│   ├── tsconfig.json
│   └── .editorconfig
└── Identify installed plugins

Step 2: LINTING EXECUTION
├── Run ESLint:
│   ├── npx eslint . --ext .ts,.tsx
│   ├── Auto-fix: --fix flag
│   ├── Report errors/warnings
│   └── Fail on errors
├── Check rules:
│   ├── no-unused-vars
│   ├── no-console (warn)
│   ├── prefer-const
│   └── @typescript-eslint/explicit-function-return-type
└── Generate report

Step 3: FORMATTING
├── Run Prettier:
│   ├── npx prettier --check .
│   ├── Auto-fix: --write
│   ├── Check all file types
│   └── Ensure consistency
├── Verify:
│   ├── 2 space indentation
│   ├── Single quotes
│   ├── No trailing commas
│   └── 80-100 char line width

Step 4: TYPE CHECKING
├── Run TypeScript:
│   ├── npx tsc --noEmit
│   ├── Strict mode checks
│   ├── Report type errors
│   └── Check all files
├── Verify:
│   ├── No implicit any
│   ├── Strict null checks
│   ├── No unused locals
│   └── Proper type inference

Step 5: SECURITY AUDIT
├── Run npm audit:
│   ├── npm audit
│   ├── Check for CVEs
│   ├── Identify severity
│   └── Suggest fixes
├── Run Snyk (if configured):
│   ├── npx snyk test
│   └── Deep dependency scan

Step 6: AUTO-FIX PROCESS
├── Apply safe fixes:
│   ├── Formatting (Prettier)
│   ├── Simple lint fixes
│   └── Import ordering
├── Report remaining issues:
│   ├── Errors requiring manual fix
│   ├── Warnings to consider
│   └── Suggestions
└── Stage fixed files (if requested)
```

---

### CATEGORY 6: DEBUGGING

---

#### 36. DEBUGGING (Main Router)

**File:** `.claude/skills/debugging/SKILL.md`

**Trigger Detection:**
- Keywords: "bug", "error", "fix", "broken", "not working", "debug"
- General debugging requests

**Processing Steps:**

```
Step 1: ERROR ANALYSIS
├── Capture error message
├── Identify error type:
│   ├── Syntax error
│   ├── Runtime error
│   ├── Logic error
│   ├── Performance issue
│   └── Network/Async error
├── Locate error position
└── Gather stack trace

Step 2: CONTEXT GATHERING
├── Read error location file
├── Check recent changes (git)
├── Identify dependencies involved
├── Review related test failures
└── Reproduce the issue

Step 3: SUB-SKILL ROUTING
├── Route to appropriate specialist:
│   ├── systematic-debugging → Methodical approach
│   ├── root-cause-tracing → Deep analysis
│   ├── verification-before-completion → Validation
│   └── defense-in-depth → Robust fixes
└── Pass context to sub-skill

Step 4: FIX IMPLEMENTATION
├── Analyze root cause
├── Implement minimal fix
├── Test the fix
├── Check for side effects
└── Document the solution

Step 5: PREVENTION
├── Add regression test
├── Update documentation
├── Improve error messages
├── Add monitoring/logging
└── Share learnings
```

---

#### 37. SYSTEMATIC-DEBUGGING

**File:** `.claude/skills/systematic-debugging/SKILL.md`

**Trigger Detection:**
- Keywords: "systematic", "methodical", "step by step", "scientific"
- Structured debugging approach

**Processing Steps:**

```
THE SCIENTIFIC METHOD FOR DEBUGGING:

PHASE 1: OBSERVE
├── Collect evidence:
│   ├── Error messages
│   ├── Stack traces
│   ├── Log output
│   ├── User reports
│   └── System state
├── Document symptoms:
│   ├── What happens?
│   ├── When does it happen?
│   ├── How often?
│   └── Environment details
└── Create bug reproduction steps

PHASE 2: HYPOTHESIZE
├── Generate possible causes:
│   ├── Recent code changes
│   ├── Dependency updates
│   ├── Environment differences
│   ├── Data variations
│   └── Race conditions
├── Prioritize by likelihood
├── Form testable hypothesis
└── Document each hypothesis

PHASE 3: EXPERIMENT
├── Design test to validate hypothesis:
│   ├── Add logging
│   ├── Check variable values
│   ├── Isolate components
│   ├── Change one variable
│   └── Run controlled tests
├── Execute experiment
├── Record results
└── Compare to prediction

PHASE 4: CONCLUDE
├── Analyze results:
│   ├── Hypothesis confirmed?
│   ├── Need more data?
│   ├── Different hypothesis?
│   └── Root cause identified?
├── If confirmed → Fix
├── If not → New hypothesis
└── Document findings

PHASE 5: VERIFY
├── Apply fix
├── Test reproduction steps
├── Verify fix works
├── Check for regressions
└── Close loop
```

---

#### 38. DEBUG (/debug command)

**File:** `.claude/commands/debug.md`

**Trigger Detection:**
- Command: `/debug`
- Keywords: "debug mode", "investigate issue"

**Processing Steps:**

```
Step 1: MODE ACTIVATION
├── Set DEBUG mode flag
├── Increase verbosity
├── Enable detailed logging
├── Pause auto-execution
└── Enter investigation mode

Step 2: ISSUE INVESTIGATION
├── Ask clarifying questions:
│   ├── What is the expected behavior?
│   ├── What is the actual behavior?
│   ├── When did it start?
│   └── What changed recently?
├── Gather evidence:
│   ├── Read relevant files
│   ├── Check git history
│   ├── Review error logs
│   └── Test reproduction

Step 3: SYSTEMATIC ANALYSIS
├── Apply systematic-debugging skill
├── Form hypotheses
├── Test each hypothesis
├── Isolate root cause
└── Document findings

Step 4: SOLUTION PROPOSAL
├── Explain root cause
├── Propose fix(es)
├── Estimate effort
├── Discuss trade-offs
└── Get user approval

Step 5: IMPLEMENTATION
├── Apply fix
├── Test thoroughly
├── Verify no regressions
├── Update tests
└── Document solution
```

---

#### 39. CHROME-DEVTOOLS

**File:** `.claude/skills/chrome-devtools/SKILL.md`

**Trigger Detection:**
- Keywords: "DevTools", "profile", "performance", "network", "console"
- Browser debugging guidance

**Processing Steps:**

```
Step 1: SCENARIO IDENTIFICATION
├── Performance issues:
│   ├── Slow page load → Network, Performance panels
│   ├── Janky animations → Rendering, Performance
│   ├── Memory leaks → Memory panel
│   └── High CPU → Performance profiling
├── Functional issues:
│   ├── JavaScript errors → Console
│   ├── DOM problems → Elements panel
│   ├── Network failures → Network panel
│   └── Storage issues → Application panel
└── Guide to appropriate panel

Step 2: PANEL GUIDANCE
├── Elements Panel:
│   ├── Inspect DOM structure
│   ├── Modify styles live
│   ├── Test responsive layouts
│   └── Check accessibility tree
├── Console Panel:
│   ├── View error messages
│   ├── Execute JavaScript
│   ├── Log debugging info
│   └── Use $0 for selected element
├── Network Panel:
│   ├── Monitor requests
│   ├── Check response times
│   ├── Inspect headers/payloads
│   └── Simulate slow network
├── Performance Panel:
│   ├── Record timeline
│   ├── Identify long tasks
│   ├── Check frame rates
│   └── Analyze call stacks
└── Application Panel:
    ├── Inspect storage
    ├── View service workers
    ├── Check cache
    └── Debug manifest

Step 3: ANALYSIS INTERPRETATION
├── Explain metrics:
│   ├── LCP, FID, CLS (Core Web Vitals)
│   ├── DOMContentLoaded, Load
│   ├── First Paint, First Contentful Paint
│   └── JavaScript execution time
├── Identify bottlenecks
├── Prioritize fixes
└── Suggest optimizations

Step 4: PUPPETEER AUTOMATION (if applicable)
├── Generate Puppeteer script
├── Automate debugging steps
├── Take screenshots
├── Capture performance data
└── Export HAR files
```

---

### CATEGORY 7: ARCHITECTURE & DESIGN

---

#### 40. ARCHITECTURE

**File:** `.claude/skills/architecture/SKILL.md`

**Trigger Detection:**
- Keywords: "architecture", "system design", "structure", "organize"
- High-level design decisions

**Processing Steps:**

```
Step 1: REQUIREMENTS ANALYSIS
├── Functional requirements:
│   ├── What must the system do?
│   ├── User workflows
│   ├── Data operations
│   └── Integration points
├── Non-functional requirements:
│   ├── Performance targets
│   ├── Scalability needs
│   ├── Availability (SLA)
│   ├── Security requirements
│   └── Maintainability
└── Constraints:
    ├── Budget
    ├── Timeline
    ├── Technology stack
    └── Team expertise

Step 2: ARCHITECTURAL STYLE SELECTION
├── Monolith:
│   ├── Single codebase
│   ├── Simple deployment
│   ├── Good for small teams
│   └── Harder to scale
├── Microservices:
│   ├── Independent services
│   ├── Team autonomy
│   ├── Independent scaling
│   └── Complex coordination
├── Serverless:
│   ├── Event-driven
│   ├── Auto-scaling
│   ├── Pay-per-use
│   └── Cold start issues
└── Modular Monolith:
    ├── Clear module boundaries
    ├── Single deployment
    ├── Future extraction path
    └── Balance of both worlds

Step 3: COMPONENT DESIGN
├── Identify core components:
│   ├── API Gateway
│   ├── Authentication Service
│   ├── Business Services
│   ├── Data Layer
│   └── Message Queue (if needed)
├── Define interfaces:
│   ├── API contracts
│   ├── Event schemas
│   └── Data formats
└── Plan communication patterns

Step 4: DATA ARCHITECTURE
├── Database selection:
│   ├── Relational (PostgreSQL)
│   ├── Document (MongoDB)
│   ├── Cache (Redis)
│   └── Search (Elasticsearch)
├── Data flow design
├── Caching strategy
└── Backup/disaster recovery

Step 5: C4 MODEL DOCUMENTATION
├── Context Diagram (L1):
│   ├── System boundary
│   ├── Users and external systems
│   └── High-level responsibilities
├── Container Diagram (L2):
│   ├── Applications/services
│   ├── Data stores
│   └── Interactions
├── Component Diagram (L3):
│   ├── Code components
│   └── Interfaces
└── Code Diagram (L4):
    └── Class/sequence diagrams

Step 6: ADR CREATION
├── Document decisions:
│   ├── Title
│   ├── Context (why needed)
│   ├── Decision (what chosen)
│   ├── Consequences (trade-offs)
│   ├── Status (proposed/accepted)
│   └── Date/author
└── Store in docs/architecture/
```

---

#### 41. PLAN-WRITING

**File:** `.claude/skills/plan-writing/SKILL.md`

**Trigger Detection:**
- Keywords: "plan", "roadmap", "how to implement", "steps"
- Implementation planning

**Processing Steps:**

```
Step 1: SCOPE DEFINITION
├── Understand the goal
├── Define boundaries
├── Identify deliverables
├── Set success criteria
└── Note constraints

Step 2: TASK BREAKDOWN
├── Decompose into tasks:
│   ├── Major phases
│   ├── Individual tasks
│   ├── Sub-tasks (if needed)
│   └── Milestones
├── Estimate effort:
│   ├── Story points or hours
│   ├── Complexity assessment
│   └── Risk factors
└── Identify dependencies

Step 3: SEQUENCING
├── Determine order:
│   ├── Prerequisites first
│   ├── Parallelize where possible
│   ├── Critical path identification
│   └── Buffer for unknowns
├── Create timeline:
│   ├── Start/end dates
│   ├── Milestone dates
│   ├── Dependencies visualized
│   └── Gantt chart (optional)

Step 4: RESOURCE PLANNING
├── Identify needs:
│   ├── Personnel
│   ├── Tools/software
│   ├── Infrastructure
│   └── Budget
├── Assign responsibilities
└── Plan for contingencies

Step 5: RISK ASSESSMENT
├── Identify risks:
│   ├── Technical risks
│   ├── Schedule risks
│   ├── Resource risks
│   └── External dependencies
├── Mitigation strategies
└── Fallback plans

Step 6: DOCUMENTATION
├── Write plan document:
│   ├── Executive summary
│   ├── Detailed tasks
│   ├── Timeline
│   ├── Resources
│   ├── Risks
│   └── Success metrics
├── Review with stakeholders
└── Set up tracking mechanism
```

---

#### 42. PLAN (/plan command)

**File:** `.claude/commands/plan.md`

**Trigger Detection:**
- Command: `/plan [description]`
- Planning mode activation

**Processing Steps:**

```
Step 1: REQUEST PARSING
├── Extract plan description
├── Identify goal
├── Detect constraints
├── Note preferences
└── Clarify ambiguities

Step 2: PROJECT-PLANNER AGENT INVOCATION
├── Spawn project-planner agent
├── Pass full context:
│   ├── Goal description
│   ├── Current project state
│   ├── Available resources
│   └── Constraints
└── Set planning parameters

Step 3: PLAN GENERATION
├── Agent analyzes requirements
├── Creates structured plan
├── Defines tasks
├── Sets dependencies
└── Estimates timeline

Step 4: OUTPUT CREATION
├── Generate plan file:
│   ├── Location: .plans/ or docs/
│   ├── Format: Markdown
│   ├── Sections: Goal, Tasks, Timeline
│   └── Dependencies graph
├── Save to project
└── Present summary

Step 5: NEXT STEPS
├── Explain how to use plan
├── Offer to implement
├── Suggest starting point
└── Schedule check-ins
```

---

#### 43. SPEC-DRIVEN-DEVELOPMENT

**File:** `.claude/skills/spec-driven-development/SKILL.md`

**Trigger Detection:**
- Keywords: "spec", "specification", "requirements", "design doc"
- Formal specification workflow

**Processing Steps:**

```
THE SPEC WORKFLOW:

PHASE 1: SPEC-INIT (/spec-init)
├── Initialize spec structure:
│   ├── .specs/
│   │   └── feature-name/
│   │       ├── spec.json
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
├── Set spec.json metadata:
│   ├── id, name, description
│   ├── status: draft
│   └── approvals: {}
└── Capture initial description

PHASE 2: SPEC-REQUIREMENTS (/spec-requirements)
├── Generate comprehensive requirements:
│   ├── User stories
│   ├── Acceptance criteria
│   ├── EARS format (if applicable)
│   ├── Constraints
│   └── Dependencies
├── Review with stakeholders
├── Iterate based on feedback
└── Mark requirements as approved

PHASE 3: SPEC-DESIGN (/spec-design)
├── Create technical design:
│   ├── Architecture overview
│   ├── Data models
│   ├── API contracts
│   ├── UI mockups
│   ├── Error handling
│   └── Testing strategy
├── Review for feasibility
├── Update based on feedback
└── Mark design as approved

PHASE 4: SPEC-TASKS (/spec-tasks)
├── Generate implementation tasks:
│   ├── Break design into tasks
│   ├── Define dependencies
│   ├── Estimate effort
│   └── Assign priorities
├── Create task list
├── Review completeness
└── Mark tasks as ready

PHASE 5: SPEC-IMPL (/spec-impl)
├── Implement tasks:
│   ├── Follow task list order
│   ├── Update task status
│   ├── Write tests for each
│   └── Verify against spec
├── Track progress
├── Update spec.json status
└── Mark complete when done

PHASE 6: SPEC-STATUS (/spec-status)
├── Display current status:
│   ├── Phase progress
│   ├── Task completion %
│   ├── Blockers/issues
│   └── Next steps
└── Generate status report
```

---

#### 44. CONTEXT-ENGINEERING

**File:** `.claude/skills/context-engineering/SKILL.md`

**Trigger Detection:**
- Keywords: "context", "token limit", "compress", "summarize"
- Context optimization requests

**Processing Steps:**

```
Step 1: CONTEXT ANALYSIS
├── Measure current context:
│   ├── Token count
│   ├── Files loaded
│   ├── Conversation history
│   └── Memory usage
├── Identify bloat:
│   ├── Redundant information
│   ├── Outdated messages
│   ├── Large unused files
│   └── Verbose descriptions

Step 2: COMPRESSION STRATEGIES
├── Summarization:
│   ├── Compress conversation history
│   ├── Summarize file contents
│   ├── Extract key points
│   └── Remove filler
├── Selective loading:
│   ├── Load only relevant file sections
│   ├── Use @file.md#section syntax
│   ├── Unload unused files
│   └── Prioritize recent changes
├── External references:
│   ├── Move details to external files
│   ├── Use links instead of inline
│   └── Create summaries

Step 3: STRUCTURE OPTIMIZATION
├── Organize information:
│   ├── Hierarchical structure
│   ├── Bullet points over paragraphs
│   ├── Tables for structured data
│   └── Code blocks for examples
├── Remove redundancy:
│   ├── Deduplicate information
│   ├── Reference instead of repeat
│   ├── Use symbols/shorthands
│   └── Compress examples

Step 4: TOKEN BUDGET MANAGEMENT
├── Allocate tokens:
│   ├── Core instructions: 20%
│   ├── Relevant files: 50%
│   ├── Conversation: 20%
│   ├── Buffer: 10%
├── Monitor usage
├── Evict LRU items
└── Alert on high usage

Step 5: LONG-TERM MEMORY
├── Extract key learnings:
│   ├── Project patterns
│   ├── User preferences
│   ├── Successful approaches
│   └── Failed attempts
├── Store in MEMORY.md
├── Reference in system prompt
└── Update periodically
```

---

#### 45. INTELLIGENT-ROUTING

**File:** `.claude/skills/intelligent-routing/SKILL.md`

**Trigger Detection:**
- Keywords: "route", "agent", "specialist", "who should"
- Automatic agent selection

**Processing Steps:**

```
Step 1: REQUEST ANALYSIS
├── Parse user input:
│   ├── Extract keywords
│   ├── Identify domain
│   ├── Detect complexity
│   └── Note constraints
├── Analyze context:
│   ├── Current project state
│   ├── Previous interactions
│   └── User preferences

Step 2: AGENT MATCHING
├── Score each agent:
│   ├── Keyword overlap
│   ├── Domain expertise
│   ├── Historical success
│   └── Current availability
├── Select top matches:
│   ├── Primary agent (highest score)
│   ├── Secondary agents (if parallel)
│   └── Fallback agent
└── Check agent capacity

Step 3: CONTEXT PREPARATION
├── Package relevant context:
│   ├── User request
│   ├── Project files
│   ├── Previous outputs
│   └── Constraints
├── Format for target agent
├── Include routing rationale
└── Set expectations

Step 4: AGENT INVOCATION
├── Spawn Task tool:
│   ├── subagent_type = selected_agent
│   ├── Include prepared context
│   ├── Set task description
│   └── Define success criteria
└── Wait for completion

Step 5: RESULT HANDLING
├── Receive agent output
├── Validate completeness
├── Format for user
├── Handle handoffs (if needed)
└── Log routing decision

ROUTING MATRIX (examples):
| Keywords | Primary Agent | Secondary |
|----------|--------------|-----------|
| React bug | frontend-specialist | debugger |
| API slow | backend-specialist | performance-optimizer |
| DB query | database-architect | backend-specialist |
| Deploy issue | devops-engineer | backend-specialist |
| Security | security-auditor | backend-specialist |
```

---

### CATEGORY 8: MEDIA & 3D

---

#### 46. THREEJS

**File:** `.claude/skills/threejs/SKILL.md`

**Trigger Detection:**
- Keywords: "Three.js", "3D", "WebGL", "3D scene", "animation"
- 3D graphics development

**Processing Steps:**

```
Step 1: SCENE SETUP
├── Initialize Three.js:
│   ├── Create Scene
│   ├── Create Camera (PerspectiveCamera)
│   ├── Create Renderer (WebGLRenderer)
│   └── Set pixel ratio
├── Configure renderer:
│   ├── Enable shadows
│   ├── Set antialias
│   ├── Configure tone mapping
│   └── Set output color space

Step 2: OBJECT CREATION
├── Create geometries:
│   ├── BoxGeometry, SphereGeometry
│   ├── PlaneGeometry, CylinderGeometry
│   ├── Custom BufferGeometry
│   └── Load external models (GLTF/GLB)
├── Create materials:
│   ├── MeshBasicMaterial
│   ├── MeshStandardMaterial (PBR)
│   ├── MeshPhysicalMaterial
│   └── ShaderMaterial (custom)
├── Assemble meshes:
│   └── const mesh = new Mesh(geometry, material);

Step 3: LIGHTING
├── Add light sources:
│   ├── AmbientLight (base)
│   ├── DirectionalLight (sun/main)
│   ├── PointLight (local)
│   ├── SpotLight (focused)
│   └── Environment map (HDR)
├── Configure shadows:
│   ├── Enable shadowMap
│   ├── Set shadow camera
│   └── Adjust shadow bias

Step 4: CAMERA CONTROLS
├── Add interaction:
│   ├── OrbitControls (rotate/zoom/pan)
│   ├── TrackballControls
│   ├── FirstPersonControls
│   └── Custom controls
├── Set initial position
├── Configure limits:
│   ├── min/max distance
│   ├── min/max polar angle
│   └── damping

Step 5: ANIMATION LOOP
├── Create render loop:
│   function animate() {
│     requestAnimationFrame(animate);
│     controls.update();
│     renderer.render(scene, camera);
│   }
├── Add animations:
│   ├── Object transformations
│   ├── Material updates
│   ├── Shader uniforms
│   └── Physics simulations
└── Handle delta time

Step 6: OPTIMIZATION
├── Performance tuning:
│   ├── Geometry instancing
│   ├── LOD (Level of Detail)
│   ├── Frustum culling
│   ├── Texture compression
│   └── Occlusion culling
├── Memory management:
│   ├── Dispose of unused geometries
│   ├── Release textures
│   └── Clean up event listeners

Step 7: RESPONSIVE DESIGN
├── Handle resize:
│   window.addEventListener('resize', () => {
│     camera.aspect = width / height;
│     camera.updateProjectionMatrix();
│     renderer.setSize(width, height);
│   });
└── Mobile performance
```

---

#### 47. MEDIA-PROCESSING

**File:** `.claude/skills/media-processing/SKILL.md`

**Trigger Detection:**
- Keywords: "FFmpeg", "convert video", "resize image", "compress"
- Media file operations

**Processing Steps:**

```
Step 1: INPUT ANALYSIS
├── Detect file type:
│   ├── Image: jpg, png, webp, gif
│   ├── Video: mp4, mov, avi, webm
│   ├── Audio: mp3, wav, aac
│   └── Document: pdf
├── Check file properties:
│   ├── Resolution/size
│   ├── Duration (video/audio)
│   ├── Bitrate
│   └── Codec

Step 2: OPERATION SELECTION
├── Image operations:
│   ├── Resize: -vf scale=1920:1080
│   ├── Crop: -vf crop=100:100:0:0
│   ├── Format convert: image.webp
│   ├── Compress: -quality 85
│   └── Filters: blur, sharpen, etc.
├── Video operations:
│   ├── Transcode: -c:v libx264
│   ├── Resize: -vf scale=1920:1080
│   ├── Compress: -crf 23 -preset fast
│   ├── Extract frames: -vf fps=1
│   ├── Trim: -ss 00:01:00 -t 30
│   └── Concatenate: concat demuxer
└── Audio operations:
    ├── Convert: -c:a libmp3lame
    ├── Compress: -b:a 128k
    ├── Trim: -ss 10 -t 30
    └── Extract: -vn -c:a copy

Step 3: COMMAND GENERATION
├── Build FFmpeg command:
│   ffmpeg -i input.mp4 \\
│     -c:v libx264 -crf 23 \\
│     -c:a aac -b:a 128k \\
│     -vf scale=1920:1080 \\
│     output.mp4
├── Optimize for web:
│   ├── Fast start (streaming)
│   ├── Multiple bitrates (HLS/DASH)
│   └── Thumbnail generation

Step 4: EXECUTION
├── Run via Bash tool
├── Monitor progress
├── Handle errors
└── Verify output

Step 5: OPTIMIZATION
├── Web optimization:
│   ├── Convert to WebP (images)
│   ├── Generate srcset
│   ├── Create video variants
│   └── Lazy loading
├── Storage optimization:
│   ├── Compress without quality loss
│   ├── Remove metadata
│   └── Use appropriate formats
```

---

#### 48. MERMAIDJS-V11

**File:** `.claude/skills/mermaidjs-v11/SKILL.md`

**Trigger Detection:**
- Keywords: "mermaid", "diagram", "flowchart", "sequence", "chart"
- Diagram creation

**Processing Steps:**

```
Step 1: DIAGRAM TYPE SELECTION
├── Flowchart:
│   ├── Process flow
│   ├── Decision trees
│   ├── Workflows
│   └── graph TD (top-down) or LR (left-right)
├── Sequence Diagram:
│   ├── API interactions
│   ├── User flows
│   └── sequenceDiagram
├── Class Diagram:
│   ├── OOP structure
│   ├── Data models
│   └── classDiagram
├── ER Diagram:
│   ├── Database schema
│   └── erDiagram
├── State Diagram:
│   ├── State machines
│   └── stateDiagram-v2
├── Gantt Chart:
│   ├── Project timelines
│   └── gantt
└── Git Graph:
    └── gitGraph

Step 2: SYNTAX GENERATION
├── Flowchart example:
│   ```mermaid
│   graph TD
│     A[Start] --> B{Decision}
│     B -->|Yes| C[Action 1]
│     B -->|No| D[Action 2]
│     C --> E[End]
│     D --> E
│   ```
├── Sequence example:
│   ```mermaid
│   sequenceDiagram
│     User->>+API: Request
│     API->>+DB: Query
│     DB-->>-API: Result
│     API-->>-User: Response
│   ```

Step 3: STYLING
├── Apply themes:
│   ├── default, dark, forest, neutral
│   └── %%{init: {'theme': 'dark'}}%%
├── Custom styling:
│   ├── classDef className fill:#f9f
│   ├── linkStyle stroke:#333
│   └── subgraph styling

Step 4: EMBEDDING
├── Markdown files:
│   ```mermaid
│   graph LR
│     A --> B
│   ```
├── HTML:
│   <pre class="mermaid">
│   graph LR; A-->B;
│   </pre>
│   <script src="mermaid.js"></script>
├── CLI conversion:
│   mmdc -i diagram.mmd -o diagram.svg
└── GitHub/GitLab (native support)

Step 5: EXPORT
├── SVG (scalable)
├── PNG (raster)
├── PDF (document)
└── Live editor: mermaid.live
```

---

### CATEGORY 9: GAME DEVELOPMENT

---

#### 49. GAME-DEVELOPMENT (Main)

**File:** `.claude/skills/game-development/SKILL.md`

**Trigger Detection:**
- Keywords: "game", "build game", "game dev", "video game"
- Game project orchestrator

**Processing Steps:**

```
Step 1: GAME TYPE ANALYSIS
├── Platform:
│   ├── Web (browser)
│   ├── Mobile (iOS/Android)
│   ├── PC (desktop)
│   ├── Console (if applicable)
│   └── VR/AR
├── Genre:
│   ├── 2D: platformer, RPG, puzzle
│   ├── 3D: FPS, adventure, simulation
│   └── Multiplayer: PvP, co-op, MMO
├── Technical requirements:
│   ├── Physics needs
│   ├── Graphics complexity
│   ├── Audio requirements
│   └── Networking (if multiplayer)

Step 2: ENGINE/FRAMEWORK SELECTION
├── Web 2D:
│   ├── Phaser (feature-rich)
│   ├── PixiJS (rendering)
│   └── Kaboom.js (simple)
├── Web 3D:
│   ├── Three.js (flexible)
│   ├── Babylon.js (game-focused)
│   └── PlayCanvas (commercial)
├── Native/Compiled:
│   ├── Unity (cross-platform)
│   ├── Godot (open source)
│   └── GameMaker (2D focused)
└── Mobile:
    ├── React Native
    ├── Flutter
    └── Native (Swift/Kotlin)

Step 3: PROJECT SCAFFOLDING
├── Create project structure:
│   ├── src/
│   │   ├── scenes/
│   │   ├── entities/
│   │   ├── systems/
│   │   ├── assets/
│   │   └── utils/
│   ├── assets/
│   │   ├── images/
│   │   ├── audio/
│   │   └── data/
│   └── config files
├── Initialize engine
├── Set up build pipeline
└── Configure asset pipeline

Step 4: CORE SYSTEMS
├── Implement game loop:
│   ├── Update (logic)
│   ├── Render (draw)
│   └── Fixed update (physics)
├── Input handling:
│   ├── Keyboard
│   ├── Mouse/touch
│   └── Gamepad
├── State management:
│   ├── Menu, Playing, Paused, GameOver
│   └── State transitions
└── Audio system

Step 5: ROUTE TO SPECIALISTS
├── 2D games → game-development/2d-games
├── 3D games → game-development/3d-games
├── Mobile → game-development/mobile-games
├── Multiplayer → game-development/multiplayer
├── Art → game-development/game-art
└── Audio → game-development/game-audio
```

---

#### 50-55. GAME SUB-SKILLS

**Processing Overview:**

| Sub-skill | Focus | Key Processing |
|-----------|-------|----------------|
| **2D Games** | Sprite-based, tilemaps, 2D physics | Sprite sheets, animations, collision detection |
| **3D Games** | WebGL, models, lighting | Three.js/Babylon.js, model loading, shaders |
| **Multiplayer** | Networking, sync, matchmaking | WebSocket, state reconciliation, lag compensation |
| **Mobile Games** | Touch controls, performance | Screen adaptation, touch input, app packaging |
| **Web Games** | HTML5, Canvas, browser | Canvas API, Web Audio, local storage |

---

### CATEGORY 10: SECURITY

---

#### 56. VULNERABILITY-SCANNER

**File:** `.claude/skills/vulnerability-scanner/SKILL.md`

**Trigger Detection:**
- Keywords: "security scan", "vulnerability", "CVE", "audit"
- Security assessment requests

**Processing Steps:**

```
Step 1: DEPENDENCY SCANNING
├── npm audit:
│   ├── Run: npm audit
│   ├── Check severity levels
│   ├── Review CVEs
│   └── Suggest updates
├── Snyk scan:
│   ├── Deep dependency check
│   ├── License compliance
│   └── Fix suggestions
└── Check for:
    ├── Known vulnerabilities
    ├── Outdated packages
    └── Unmaintained dependencies

Step 2: CODE ANALYSIS
├── Static analysis:
│   ├── Hardcoded secrets
│   ├── SQL injection risks
│   ├── XSS vulnerabilities
│   ├── Path traversal
│   └── Insecure deserialization
├── Pattern detection:
│   ├── eval() usage
│   ├── innerHTML assignments
│   ├── document.write()
│   └── unsafe regex

Step 3: CONFIGURATION REVIEW
├── Environment variables:
│   ├── No secrets in code
│   ├── Proper .env handling
│   └── Secret rotation
├── Authentication:
│   ├── JWT best practices
│   ├── Session security
│   └── Password policies
└── CORS configuration:
    ├── Restrictive origins
    └── Proper headers

Step 4: COMPLIANCE CHECK
├── OWASP Top 10:
│   ├── A01: Broken Access Control
│   ├── A02: Cryptographic Failures
│   ├── A03: Injection
│   ├── A07: Auth Failures
│   └── etc.
├── Security headers:
│   ├── Content-Security-Policy
│   ├── X-Frame-Options
│   ├── X-Content-Type-Options
│   └── Strict-Transport-Security

Step 5: REPORTING
├── Generate findings:
│   ├── Critical (fix immediately)
│   ├── High (fix soon)
│   ├── Medium (plan to fix)
│   └── Low (monitor)
├── Provide remediation:
│   ├── Specific fix steps
│   ├── Code examples
│   └── Verification steps
└── Track resolution
```

---

#### 57. RED-TEAM-TACTICS

**File:** `.claude/skills/red-team-tactics/SKILL.md`

**Trigger Detection:**
- Keywords: "red team", "penetration test", "ethical hack", "attack"
- Offensive security testing

**Processing Steps:**

```
Step 1: SCOPING
├── Define boundaries:
│   ├── In-scope systems
│   ├── Out-of-scope items
│   ├── Testing hours
│   └── Emergency contacts
├── Get authorization:
│   ├── Written permission
│   ├── Rules of engagement
│   └── Liability coverage

Step 2: RECONNAISSANCE
├── Passive recon:
│   ├── OSINT gathering
│   ├── Social media
│   ├── Domain enumeration
│   └── Technology detection
├── Active recon:
│   ├── Port scanning
│   ├── Service enumeration
│   └── Directory brute-forcing

Step 3: VULNERABILITY IDENTIFICATION
├── Automated scanning:
│   ├── Nessus/OpenVAS
│   ├── Burp Suite
│   └── Nuclei
├── Manual testing:
│   ├── Business logic flaws
│   ├── Authentication bypass
│   └── Privilege escalation

Step 4: EXPLOITATION
├── Attempt exploitation:
│   ├── Proof of concept
│   ├── No damage/DoS
│   ├── Document steps
│   └── Screenshots
├── Post-exploitation:
│   ├── Lateral movement
│   ├── Data access assessment
│   └── Persistence check

Step 5: REPORTING
├── Executive summary:
│   ├── Risk rating
│   ├── Business impact
│   ├── Remediation priority
│   └── Strategic recommendations
├── Technical details:
│   ├── Vulnerability descriptions
│   ├── Reproduction steps
│   ├── Evidence screenshots
│   └── Remediation guidance
```

---

### CATEGORY 11: DOCUMENTATION & CONTENT

---

#### 58-61. DOCUMENTATION SKILLS

**Document Processing Details:**

| Skill | Input | Processing | Output |
|-------|-------|------------|--------|
| **docx** | Word documents | python-docx, read/write | Modified .docx |
| **pdf** | PDF files | PyPDF2/pdfplumber | Extracted text/data |
| **pptx** | PowerPoint | python-pptx | Slides, charts |
| **xlsx** | Excel | openpyxl/pandas | Data analysis, charts |

---

#### 62. DOCUMENTATION-TEMPLATES

**File:** `.claude/skills/documentation-templates/SKILL.md`

**Templates Generated:**
- README.md (project overview)
- CONTRIBUTING.md (contribution guidelines)
- CHANGELOG.md (version history)
- API.md (API documentation)
- ADR.md (Architecture Decision Records)

---

#### 63. DOCS-SEEKER

**File:** `.claude/skills/docs-seeker/SKILL.md`

**Processing:**
- Search llms.txt standard
- GitHub repository docs
- Web documentation
- Parallel exploration
- Synthesize findings

---

#### 64. REPOMIX

**File:** `.claude/skills/repomix/SKILL.md`

**Processing:**
- Package repository into AI-friendly format
- Custom include/exclude patterns
- Multiple output formats (XML, Markdown)
- Code compression
- Repository analysis

---

### CATEGORY 12: MCP & INTEGRATION

---

#### 65. MCP-BUILDER

**File:** `.claude/skills/mcp-builder/SKILL.md`

**Processing Steps:**

```
Step 1: SERVER DEFINITION
├── Define purpose:
│   ├── What service to integrate?
│   ├── What operations needed?
│   └── Who will use it?
├── Choose transport:
│   ├── stdio (local)
│   ├── HTTP (remote)
│   └── WebSocket (real-time)

Step 2: IMPLEMENTATION
├── Create server structure:
│   ├── src/server.ts
│   ├── src/tools/
│   ├── src/resources/
│   └── src/prompts/
├── Implement handlers:
│   ├── Tool handlers
│   ├── Resource providers
│   └── Prompt templates
└── Add error handling

Step 3: TOOL DEFINITION
├── Define tool schema:
│   name: string;
│   description: string;
│   inputSchema: JSONSchema;
│   handler: (args) => Promise<Result>;
├── Implement business logic
├── Add validation
└── Return structured results

Step 4: DEPLOYMENT
├── Package server
├── Deploy to hosting
├── Configure Claude
└── Test integration
```

---

#### 66. MCP-MANAGEMENT

**File:** `.claude/skills/mcp-management/SKILL.md`

**Processing:**
- List configured MCP servers
- Add/remove connections
- Test connectivity
- Execute tools
- Monitor usage

---

### CATEGORY 13: CLI & SYSTEM

---

#### 67-68. BASH-LINUX & POWERSHELL-WINDOWS

**Processing Patterns:**

| Aspect | Bash/Linux | PowerShell |
|--------|-----------|------------|
| Command style | Pipes, small tools | Cmdlets, objects |
| Error handling | `set -e`, `\|\|` | Try/catch blocks |
| Path handling | Forward slashes | Backslashes |
| Common tasks | grep, sed, awk | Get-Content, Where-Object |

---

#### 69. CLAUDE-CODE

**File:** `.claude/skills/claude-code/SKILL.md`

**Processing:**
- Claude Code CLI features
- Slash commands
- MCP integration
- Context7 usage
- Artifacts
- Project management

---

### CATEGORY 14: PERFORMANCE & OPTIMIZATION

---

#### 70-71. PERFORMANCE SKILLS

**Processing Steps:**

```
Step 1: PROFILING
├── CPU profiling:
│   ├── Chrome DevTools Performance
│   ├── Node.js --prof
│   └── Python cProfile
├── Memory profiling:
│   ├── Heap snapshots
│   ├── Memory leaks detection
│   └── Garbage collection analysis
└── Network profiling:
    ├── Request waterfall
    ├── Bundle analysis
    └── CDN performance

Step 2: ANALYSIS
├── Identify bottlenecks:
│   ├── Long tasks (>50ms)
│   ├── Layout thrashing
│   ├── Forced synchronous layout
│   └── Memory bloat
├── Measure metrics:
│   ├── Core Web Vitals
│   ├── Time to Interactive
│   └── Bundle size

Step 3: OPTIMIZATION
├── Code optimizations:
│   ├── Algorithm improvements
│   ├── Memoization
│   ├── Lazy loading
│   └── Code splitting
├── Asset optimizations:
│   ├── Image compression
│   ├── Font subsetting
│   ├── Minification
│   └── Compression (gzip/brotli)
└── Caching strategies
```

---

#### 72. CLEAN-CODE

**Processing:**
- Apply SOLID principles
- Remove duplication (DRY)
- Simplify complexity (KISS)
- Remove unused code (YAGNI)
- Boy Scout Rule (leave cleaner)

---

### CATEGORY 15: E-COMMERCE & PAYMENTS

---

#### 73. SHOPIFY

**Processing:**
- Liquid templating
- Storefront API
- Admin API
- App development
- Theme customization

---

#### 74. PAYMENT-INTEGRATION

**Providers Supported:**
- Stripe (global)
- PayPal (global)
- SePay/VietQR (Vietnam)
- Paddle (subscriptions)
- Creem.io (licensing)

**Processing Steps:**
- Checkout flow creation
- Webhook handling
- Subscription management
- Refund processing

---

### CATEGORY 16: SEO & MARKETING

---

#### 75-76. SEO SKILLS

**Processing:**
- Meta tag optimization
- Structured data (Schema.org)
- Sitemap generation
- robots.txt
- Core Web Vitals
- E-E-A-T principles

---

### CATEGORY 17: I18N & LOCALIZATION

---

#### 77. I18N-LOCALIZATION

**Processing:**
- Framework setup (next-intl, react-i18next)
- String extraction
- Translation file management
- Locale switching
- RTL support
- Date/number formatting

---

### CATEGORY 18: PROBLEM SOLVING

---

#### 78-79. PROBLEM SOLVING SKILLS

**Techniques:**
- Collision Zone Thinking (intersection of ideas)
- Inversion (avoid failure)
- Meta Pattern Recognition
- Scale Game (magnitude thinking)
- Simplification Cascades
- When Stuck strategies

---

### CATEGORY 19: SKILL MANAGEMENT

---

#### 80. SKILL-CREATOR

**File:** `.claude/skills/skill-creator/SKILL.md`

**Processing:**
- SKILL.md template
- skill.json metadata
- Trigger words definition
- References organization
- Validation

---

#### 81-89. COMMANDS

**Command Processing Summary:**

| Command | Purpose | Key Processing |
|---------|---------|----------------|
| `/init` | Initialize project | Detect stack, generate CLAUDE.md |
| `/create` | New app | Interactive dialogue, app-builder |
| `/enhance` | Add features | Analyze, plan, implement |
| `/debug` | Debug mode | Systematic investigation |
| `/test` | Run tests | Generate + execute |
| `/deploy` | Deploy | Pre-flight checks, release |
| `/plan` | Create plan | Project-planner agent |
| `/preview` | Dev server | Start/stop/status |
| `/status` | Show status | Progress tracking |

---

## Tools Reference

| Tool | Use Cases |
|------|-----------|
| `Read` | Load files, images, configs |
| `Write` | Create new files |
| `Edit` | Modify existing files |
| `Bash` | Run commands, install packages |
| `Grep` | Search code patterns |
| `Glob` | Find files by pattern |
| `Task` | Spawn subagents |
| `Skill` | Invoke skills |
| `WebSearch` | Search internet |
| `WebFetch` | Retrieve specific pages |
| `SequentialThinking` | Structured reasoning |

---

## Skill Execution Flow

```
┌─────────────────────────────────────────────┐
│ 1. USER INPUT                               │
│    ↓                                        │
│ 2. TRIGGER MATCHING                         │
│    - Check skill.json triggers              │
│    - Score keyword matches                  │
│    - Select best match                      │
│    ↓                                        │
│ 3. SKILL LOADING                            │
│    - Load SKILL.md                          │
│    - Load skill.json                        │
│    - Load references/ (on demand)           │
│    ↓                                        │
│ 4. CONTEXT ANALYSIS                         │
│    - Read relevant files                    │
│    - Check project state                    │
│    - Load memory                            │
│    ↓                                        │
│ 5. PROCESSING                               │
│    - Execute skill logic                    │
│    - Use appropriate tools                  │
│    - Handle errors                          │
│    ↓                                        │
│ 6. OUTPUT                                   │
│    - Generate result                        │
│    - Write/modify files                     │
│    - Present to user                        │
└─────────────────────────────────────────────┘
```

---

*Document Version: 2.0*
*Total Skills Documented: 90*
*Categories: 20*
*Last Updated: 2026-02-05*