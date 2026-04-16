# Task Generation Rules

## Core Principles

### 1. Natural Language Descriptions
Focus on capabilities and outcomes, not code structure.

**Describe**:
- What functionality to achieve
- Business logic and behavior
- Features and capabilities
- Domain language and concepts
- Data relationships and workflows
**Required (Hybrid Human-AI Style)**:
Every sub-task MUST balance Human Intent (for PM review) and Code-Level Details (for AI implementation).
Detail bullets must include:
1. **Human Intent (The "Why")**: Briefly explain the business logic, expected UX behavior, or why this code exists (e.g., "Mục đích: Chặn user sử dụng extension nếu chưa đồng ý Privacy").
2. **AI Code-Level Details (The "How")**:
   - File paths and specific UI components to create/modify.
   - Database tables, columns, and Zod/Type schemas (e.g., `Update users.consent_version`).
   - API payloads, routes, and JSON contracts.
   - Edge cases, error handling, and exact validation thresholds (e.g., `Return 403 if invalid`).

**Rationale**: Humans review tasks to verify business requirements are met; AI Coders (like god-developer or ck) read tasks to write explicit code. If you only write business jargon, the AI hallucinates. If you only write code names, the human reviewer cannot verify the business value. You MUST provide both.

### 2. Task Integration & Progression

**Every task must**:
- Build on previous outputs (no orphaned code)
- Connect to the overall system (no hanging features)
- Progress incrementally (no big jumps in complexity)
- Validate core functionality early in sequence
- Respect architecture boundaries defined in design.md (Architecture Pattern & Boundary Map)
- Honor interface contracts documented in design.md
- Translate completion criteria into concrete proof (commands, artifacts, routes, manifests, schema objects, UI states)
- Reuse canonical contracts from `design.md` verbatim; never invent alternate auth/provider/deletion policies in task prose
- Use major task summaries sparingly—omit detail bullets if the work is fully captured by child tasks.

**End with integration tasks** to wire everything together.

### 3. Flexible Task Sizing

**Guidelines**:
- **Major tasks**: As many sub-tasks as logically needed (group by cohesion)
- **Sub-tasks**: 1-3 hours each, 3-10 details per sub-task
- Balance between too granular and too broad

### 3b. Requirement-to-Task Splitting Heuristics

Each requirement from `requirements.md` generates **1 or more task files**. Use the following decision logic to determine how many:

#### When to keep as 1 task file
- Requirement has ≤ 3 acceptance criteria
- All criteria touch the same architectural layer (e.g., all frontend, all backend)
- Total estimated effort ≤ 3 hours

#### When to split into multiple task files
- Requirement has > 3 acceptance criteria spanning different concerns
- Acceptance criteria touch **multiple architectural layers** (e.g., frontend + backend + database)
- Total estimated effort > 4 hours
- Criteria contain both "happy path" AND "error/edge case" logic that are independently testable

#### Splitting strategy
When splitting a requirement into multiple tasks:
1. **Split by architectural layer** — e.g., R1-01 for content script, R1-02 for API endpoint, R1-03 for database schema
2. **Split by concern** — e.g., R3-01 for consent onboarding UI, R3-02 for consent version re-check logic
3. **Split by dependency chain** — if acceptance criteria A must finish before B can start, they belong in separate task files with explicit `Dependencies:`
4. **Never split by arbitrary size** — don't create 3 task files just because "3 feels right"

#### Cross-cutting requirements
Some requirements (e.g., "language handling", "error handling") naturally touch code in many other requirements' tasks. For these:
- Create 1 primary task file for the core logic (e.g., `task-R6-01-language-detection.md`)
- Add secondary `_Requirements: 6_` references in other tasks' sub-tasks where the cross-cutting concern applies
- Do NOT duplicate the same work across multiple task files

### 3c. Maintaining the Big Picture (Preventing Fragmentation)

Grouping tasks vertically by requirement carries the risk of "siloed" or fragmented code (e.g., each requirement building its own isolated setup). To ensure the system remains cohesive:

1. **Foundation First (The R0 Concept)**: Extract shared infrastructure, core database migrations, authentication wrappers, and base UI layouts into foundational tasks running before feature work. If these aren't explicitly in requirements, classify them as `task-R0-XX-foundation.md` or map them to the most logical architectural requirement. All parallel feature tasks MUST depend on these foundation tasks.
2. **Shared Interfaces (Horizontal Contracts)**: Sub-tasks that touch shared cross-requirement architecture (like registering a new page in a global `router.ts` or adding a column to a shared table) MUST explicitly reference the shared contract defined in `design.md`. 
3. **Integration Enforcers**: If R1 and R2 interact (e.g., R2 UI displays data fetched by R1 backend), the later task MUST have a sub-task explicitly dedicated to "Wiring/Integrating with [Previous Feature] output".

### 3d. Spike Tasks for Complex/Uncertain Areas (MANDATORY)

When the 5-Dimension Complexity Assessment (Step 3) flags a component or requirement as **Risk = Complex** (Cynefin), the task breakdown MUST include a dedicated **spike/prototype task** before the main implementation task for that area.

**Purpose**: Validate assumptions and reduce uncertainty before committing to full implementation.

**Naming convention:** `tasks/task-R{N}-00-spike-<slug>.md`
- Use `00` as the sequence number to ensure it runs FIRST within its requirement group.

**Spike task structure:**
1. **Objective**: State the specific uncertainty to resolve (e.g., "Validate that Google Meet captions DOM can be reliably scraped across account types")
2. **Success Criteria**: Define what a successful spike looks like (e.g., "Demonstrate caption text extraction from 3 different Meet account types")
3. **Time-box**: Maximum 4 hours. If spike exceeds time-box, escalate to user.
4. **Output**: A brief findings report (can be inline in the task file) and a go/no-go recommendation.
5. **Dependencies**: The main implementation task for this area MUST depend on the spike task.

**When NOT to create spike tasks:**
- Risk = Clear or Complicated → skip spike, proceed directly.
- The uncertain area is already covered by research.md with concrete evidence (real API tests, not just documentation links).

### 6. Risk Assessment Table (MANDATORY)

Every task file MUST contain the Risk Assessment table, even if no risks are identified.
- **Rule**: If there are risks, list them with Severity and Mitigation.
- **Rule**: If no risks are found, you MUST still include the table and write `| None identified | — | — |`.
- Never skip the `## Risk Assessment` section.

### 4. Requirements Mapping

**End each task detail section with**:
- `_Requirements: X.X, Y.Y_` listing **only numeric requirement IDs** (comma-separated). Never append descriptive text, parentheses, translations, or free-form labels.
- For cross-cutting requirements, list every relevant requirement ID. All requirements MUST have numeric IDs in requirements.md. If an ID is missing, stop and correct requirements.md before generating tasks.
- Reference components/interfaces from design.md when helpful (e.g., `_Contracts: AuthService API`)
- If a validation interview or red-team finding changes implementation behavior, update the sub-task itself. Do NOT hide the decision only inside `Risk Assessment`.

### 5. Code-Only Focus

**Include ONLY**:
- Coding tasks (implementation)
- Testing tasks (unit, integration, E2E)
- Technical setup tasks (infrastructure, configuration)

**Exclude**:
- Deployment tasks
- Documentation tasks
- User testing
- Marketing/business activities

### Optional Test Coverage Tasks

- When the design already guarantees functional coverage and rapid MVP delivery is prioritized, mark purely test-oriented follow-up work (e.g., baseline rendering/unit tests) as **optional** using the `- [ ]*` checkbox form.
- Only apply the optional marker when the sub-task directly references acceptance criteria from requirements.md in its detail bullets.
- Never mark implementation work or integration-critical verification as optional—reserve `*` for auxiliary/deferrable test coverage that can be revisited post-MVP.
- Never mark auth, permissions, privacy, data deletion, migration, schema, or contract verification work as optional.

### Mandatory Verification & Evidence

Every task file MUST include a `## Verification & Evidence` section.

That section MUST contain:
1. **Automated proof** — exact command(s) for typecheck, tests, build, or explicit `N/A`
2. **Artifact/runtime proof** — exact files, routes, UI surfaces, generated outputs, or persisted state to inspect
3. **Contract/negative-path proof** — at least one contract-preserving check for unauthorized, invalid, missing-permission, rollback, or failure-path behavior when relevant

Rules:
- If the task produces a build artifact or generated file, name the exact artifact path to inspect.
- If the task wires entrypoints (popup, content script, route, worker, CLI command), name the exact runtime surface that must exist after implementation.
- If verification depends on environment or manual setup, document the blocker explicitly instead of implying success.
- Build success alone is NEVER enough evidence for a completed task.
- For provider-sensitive work, use provider-neutral wording unless the scope lock explicitly names a vendor.
- For delete-data/privacy work, task text MUST match the single deletion/retention policy chosen in `design.md`. Mixed policies are invalid.

## Task Hierarchy Rules

### Maximum 2 Levels
- **Level 1**: Major tasks (1, 2, 3, 4...)
- **Level 2**: Sub-tasks (1.1, 1.2, 2.1, 2.2...)
- **No deeper nesting** (no 1.1.1)
- If a major task would contain only a single actionable item, collapse the structure and promote the sub-task to the major level (e.g., replace `1.1` with `1.`).
- When a major task exists purely as a container, keep the checkbox description concise and avoid duplicating detailed bullets—reserve specifics for its sub-tasks.

### Sequential Numbering
- Major tasks MUST increment: 1, 2, 3, 4, 5...
- Sub-tasks reset per major task: 1.1, 1.2, then 2.1, 2.2...
- Never repeat major task numbers

### Parallel Analysis (default)
- Assume parallel analysis is enabled unless explicitly disabled (e.g. `--sequential` flag).
- Identify tasks that can run concurrently when **all** conditions hold:
  - No data dependency on other pending tasks
  - No shared file or resource contention
  - No prerequisite review/approval from another task
- Validate that identified parallel tasks operate within separate boundaries defined in the Architecture Pattern & Boundary Map.
- Confirm API/event contracts from design.md do not overlap in ways that cause conflicts.
- Append `(P)` immediately after the task number for each parallel-capable task:
  - Example: `- [ ] 2.1 (P) Build background worker`
  - Apply to both major tasks and sub-tasks when appropriate.
- If sequential mode is requested, omit `(P)` markers entirely.
- Group parallel tasks logically (same parent when possible) and highlight any ordering caveats in detail bullets.
- Explicitly call out dependencies that prevent `(P)` even when tasks look similar.

### Checkbox Format
```markdown
- [ ] 1. Major task description
- [ ] 1.1 Sub-task description
  - Detail item 1
  - Detail item 2
  - _Requirements: X.X_

- [ ] 1.2 Sub-task description
  - Detail items...
  - _Requirements: Y.Y_

- [ ] 1.3 Sub-task description
  - Detail items...
  - _Requirements: Z.Z, W.W_

- [ ] 2. Next major task (NOT 1 again!)
- [ ] 2.1 Sub-task...
```

## Requirements Coverage

**Mandatory Check**:
- ALL requirements from requirements.md MUST be covered
- Cross-reference every requirement ID with task mappings
- If gaps found: Return to requirements or design phase
- No requirement should be left without corresponding tasks

Use `N.M`-style numeric requirement IDs where `N` is the top-level requirement number from requirements.md (for example, Requirement 1 → 1.1, 1.2; Requirement 2 → 2.1, 2.2), and `M` is a local index within that requirement group.

Document any intentionally deferred requirements with rationale.
