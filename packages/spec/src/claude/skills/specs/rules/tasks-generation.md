# Task Generation Rules

## Core Principles

### 0. Pre-Generation Decision Gates

Before writing any `tasks/task-R*.md` file:

1. Load `phase-decision-matrix.md` and identify implementation slices/task clusters: R0 foundation, risk spikes, vertical slices, layer slices, cross-cutting slices, integration gates, verification gates, and release/packaging slices when in scope.
2. Load `task-scoring-rubric.md` and score each candidate task. Use the result to choose priority, split/merge, spike needs, dependencies, parallel eligibility, and evidence depth.
3. Load `../references/ask-user-question-gates.md` if scoring or slicing detects unapproved scope expansion, unresolved architecture tie, missing evidence, contract ambiguity, or final contradiction.
4. Do not ask about facts that targeted scout, repo files, tests, or official/current docs can answer.

The raw score table does not need to appear in each task file. The task file must reflect the decisions: why the task exists, what it depends on, why it is split/merged, whether it can be parallel, and what proof is required.

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
- Stay inside the approved `scope_lock` and requirement IDs; do not add unapproved features or silently drop scoped behavior
- Progress incrementally (no big jumps in complexity)
- Validate core functionality early in sequence
- Respect architecture boundaries defined in design.md (Architecture Pattern & Boundary Map)
- Honor interface contracts documented in design.md
- Translate completion criteria into concrete proof (commands, artifacts, routes, manifests, schema objects, UI states)
- Reuse canonical contracts from `design.md` verbatim; never invent alternate auth/provider/deletion policies in task prose
- Use major task summaries sparingly—omit detail bullets if the work is fully captured by child tasks.

**End with integration tasks** to wire everything together.
- For UI/app/runtime workflows, the final integration task MUST name the real entrypoint (`App.tsx`, route, command, worker, extension manifest, API route, etc.) and verify every user-visible surface from the requirements is reachable from that entrypoint.
- Components, services, routes, commands, workers, providers, and data loaders created by earlier tasks MUST be consumed by a later integration task or explicitly marked as internal support in `design.md`; orphaned deliverables are invalid.
- Prefer compact, implementation-ready task prose over large boilerplate. The golden shape is: `Context` -> `Steps` -> `Requirements` -> `Related Files` -> `Completion Criteria` -> `Evidence` -> `Risk Assessment`.
- A compact task is valid when it names exact files/contracts, maps requirements, and gives executable evidence. Do not expand it into nested filler just to satisfy a template.

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
5. **Use the Phase Decision Matrix** — only split when the implementation slice has an independent deliverable boundary or proof path.

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
4. **Final Runtime Integration**: For any feature that has a user-facing screen, public route, CLI command, background worker, browser extension surface, or API flow, create a final integration task (or a final integration section in the last dependent task) that proves the whole scoped feature works from its runtime entrypoint. This task MUST fail if prior-task outputs exist but are not imported, mounted, registered, or invoked.
5. **Scored Sequencing**: Use `task-scoring-rubric.md` to schedule high-value/high-dependency tasks early, but only after required foundation/spike work. High file-conflict or high blast-radius tasks must not be marked `(P)` without isolated ownership.

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

### Mandatory Evidence Section

Every new task file MUST include a `## Evidence` section. Existing specs may still use the v0.8 heading `## Task Test Plan & Verification Evidence` or the legacy `## Verification & Evidence` heading; readers and sync tools must support all three.

That section is the task-level test plan and proof checklist. It MUST contain:
1. **Automated proof** — exact command(s) for typecheck, tests, build, or explicit `N/A`
2. **Artifact/runtime proof** — exact files, routes, UI surfaces, generated outputs, or persisted state to inspect
3. **Contract/negative-path proof** — at least one contract-preserving check for unauthorized, invalid, missing-permission, rollback, or failure-path behavior when relevant
4. **Reachability proof** — when the task creates a runtime-facing artifact, name the upstream entrypoint or caller that reaches it; if reachability is deferred, name the exact later integration task responsible

Rules:
- If the task produces a build artifact or generated file, name the exact artifact path to inspect.
- If the task wires entrypoints (popup, content script, route, worker, CLI command), name the exact runtime surface that must exist after implementation.
- If the task creates a UI component, service, hook, reducer, route handler, worker, command, or data loader, the evidence MUST prove it is either reachable from the declared runtime surface or intentionally internal support for a named later task.
- If verification depends on environment or manual setup, document the blocker explicitly instead of implying success.
- Build success alone is NEVER enough evidence for a completed task.
- For provider-sensitive work, use provider-neutral wording unless the scope lock explicitly names a vendor.
- For delete-data/privacy work, task text MUST match the single deletion/retention policy chosen in `design.md`. Mixed policies are invalid.

### Test Type Selection

Choose verification by task risk and touched surface. Do not force every task to include every test type, but do not omit the test type that proves the task's actual behavior.

| Task kind | Required / expected proof |
|---|---|
| Pure logic, data transform, parser, sorting, filtering, validator | Unit test plus negative-path case |
| Stateful UI component or user interaction | Component test or integration test; add runtime UI check if the component must be mounted |
| Cross-module state, API, persistence, provider, or service boundary | Integration test that proves real contract/state handoff |
| User-facing workflow across screens/components | E2E or UI flow verification after the vertical slice exists |
| Layout, theme, responsive, visual style | Runtime/visual viewport checks; screenshot proof when practical |
| Keyboard/focus/form/modal/table interaction | Accessibility check for focus, labels, roles, and keyboard behavior |
| Scaffolding/config/release plumbing | Smoke checks: typecheck/build/test/dev-server or equivalent |
| Bug fix/regression | Regression test reproducing the old failure, then passing |
| Performance/security-sensitive requirement or touched surface | Performance/security check only when specified by requirements, design risk, or changed boundary |

`hapo:specs` writes the expected proof into each task. `hapo:develop` executes the task-local proof before marking the task done. `hapo:test` runs the broader system pass after implementation or for a requested feature scope.

### Frontend Fidelity Rule (when a visual reference is provided)

If the user/spec provides ANY visual reference for a frontend task — design image, Figma frame, screenshot, mockup, brand palette, design tokens, or a style guide — the task MUST reproduce it faithfully, not approximate it. Concretely, the task file MUST:

1. **Extract concrete values into the task** (do NOT paraphrase as "make it look nice"): exact colors (`#DAF1EE`), font family + sizes, spacing/radius/shadow when the reference shows them, and verbatim UI text/labels (especially non-English copy, e.g. `「投稿を削除しました」`).
2. **State a `MUST: match <reference>` constraint** naming the exact reference (e.g. `image_4.png` / Figma node / `tokens.css`), so fidelity is a requirement, not a suggestion.
3. **Prove fidelity in Evidence**: a visual/runtime check that compares the rendered UI against the named reference (screenshot diff or side-by-side inspection), plus accessibility/contrast if interactive.

Reuse vs new component:
- **Reuse** an existing component → reference it by path; it carries the design system's style (no need to restate pixels).
- **New** component (`Create`) WITH a reference → the task MUST cite the concrete tokens/values from the reference (this is the gap that lets new components drift from the design).
- **New** component WITHOUT any reference → derive from a named sibling component or explicitly flag it as an open design question; never invent un-grounded styling silently.

> Rationale: a spec that says "build the list screen" but omits the provided palette/text/spacing forces the implementer to guess, and the result drifts from what the user actually showed. When a reference exists, "looks roughly similar" is a failure — the task must carry the real values so the build matches the design.

## Task Hierarchy Rules

### Maximum 2 Levels
- Prefer one actionable checkbox per real implementation step.
- Use sub-tasks (`1.1`, `1.2`) only when a step has multiple separately verifiable units.
- **No deeper nesting** (no `1.1.1`).
- If a major task would contain only a single actionable item, collapse the structure and promote the sub-task to the major level.
- When a major task exists purely as a container, keep the checkbox description concise and avoid duplicating detailed bullets.

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
  - Environment/setup work needed by the task is already satisfied or covered within the task itself
- Validate that identified parallel tasks operate within separate boundaries defined in the Architecture Pattern & Boundary Map.
- Confirm API/event contracts from design.md do not overlap in ways that cause conflicts.
- Append `(P)` immediately after the task number for each parallel-capable task, kept **outside** the checkbox brackets:
  - Example: `- [ ] 2.1 (P) Build background worker`
  - Apply to both major tasks and sub-tasks when appropriate.
- If sequential mode is requested, omit `(P)` markers entirely.
- Group parallel tasks logically (same parent when possible) and highlight any ordering caveats in detail bullets.
- Do not mark container-only major tasks (no own actionable bullets) with `(P)` — evaluate parallelism at the sub-task level.
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

Use the requirement ID style already present in `requirements.md` (`R1`, `REQ-01`, or `N.M`). The task filename cluster (`task-R1-01-*`) does not have to mirror every requirement ID exactly, but every requirement MUST be listed in at least one task's `## Requirements` section.

Document any intentionally deferred requirements with rationale.
