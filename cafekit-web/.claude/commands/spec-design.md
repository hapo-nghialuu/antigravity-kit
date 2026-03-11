---
name: spec-design
description: Create comprehensive technical design for a specification
allowed-tools: Glob, Grep, Read, Write, Edit, WebSearch, WebFetch
argument-hint: <feature-name> [-y]
---

# Technical Design Generator

<background_information>
- **Mission**: Generate comprehensive technical design document that translates requirements (WHAT) into architectural design (HOW)
- **Success Criteria**:
  - All requirements mapped to technical components with clear interfaces
  - Appropriate architecture discovery and research completed
  - Design aligns with steering context and existing patterns
  - Visual diagrams included for complex architectures
</background_information>

<instructions>
## Core Task
Generate technical design document for feature **$ARGUMENTS** based on approved requirements.

## Execution Steps

### Step 0: Validate Phase State (Plan-Style Gate)

- Read `.specs/$ARGUMENTS/spec.json` first
- If feature directory or `spec.json` is missing: stop and instruct user to run `/spec-init <project-description>` and `/spec-requirements <feature-name>` first
- If requirements have not been generated yet (phase before requirements): stop and instruct user to run `/spec-requirements $ARGUMENTS`
- If `phase` is `tasks-generated`: stop and explain design phase is already completed; only re-run for explicit regeneration/update intent

### Step 1: Load Context

**Read all necessary context**:
- `.specs/$ARGUMENTS/spec.json`, `requirements.md`, `design.md` (if exists)
- Resolve scope baseline from `spec.json.scope_lock`:
  - `scope_lock.source` = canonical original intent
  - `scope_lock.in_scope[]` = designable capability space
  - `scope_lock.out_of_scope[]` = capabilities that must stay deferred
  - `scope_lock.expansion_policy` = default `requires-user-approval`
- Backward-compatible fallback for older specs without `scope_lock`:
  - Derive baseline scope from project description and existing requirements
  - Continue without hard-fail, but keep strict no-expansion behavior
- Load `.specs/steering/` (if exists) as constraints and standards only
- `.claude/skills/specs/templates/design.md` for document structure
- `.claude/skills/specs/rules/design-principles.md` for design principles
- `.claude/skills/specs/templates/research.md` for discovery log structure
- **Load project docs context (Plan-style quality gate)** when available:
  - `docs/codebase-summary.md`
  - `docs/code-standards.md`
  - `docs/system-architecture.md`
  - `docs/project-overview-pdr.md`
- If any docs file is missing, continue and mention missing context in execution output (do not block generation)

**Validate requirements approval and scope eligibility**:
- If `-y` flag provided: Auto-approve requirements in spec.json
- Otherwise: Verify approval status (stop if unapproved, see Safety & Fallback)
- Build `in_scope_requirement_ids` by filtering requirements against scope_lock
- If no in-scope requirement IDs found, or requirements are ambiguous against scope_lock: stop and instruct user to re-run `/spec-requirements $ARGUMENTS`

### Step 2: Discovery & Analysis

**Critical: This phase ensures design is based on complete, accurate information.**

### Step 2A: Discovery Mode Router (Plan-Style)

Before discovery, select a deterministic mode and record the reason:
- **minimal**: UI/CRUD-only change, no new external dependency/API, no schema change, <=2 integration points
- **light**: extension of existing feature with known patterns and limited integration risk
- **full**: new subsystem, external integration, auth/security/performance impact, schema boundary changes, or explicit user request for deep exploration
- **Default rule**: when uncertain, choose **light** (scope-safe by default)
- **Escalation trigger**: switch to **full** only when a concrete trigger is present and documented
- **Research budget**: keep discovery scoped; use at most 2 major external investigations unless findings reveal a blocker

Use the selected mode to drive Step 2 execution and persist it in spec metadata during Step 3 finalize.

1. **Classify Feature Type**:
   - **New Feature** (greenfield) → Start with light discovery; escalate to full only with explicit triggers
   - **Extension** (existing system) → Integration-focused discovery
   - **Simple Addition** (CRUD/UI) → Minimal or no discovery
   - **Complex Integration** → Full discovery required
   - **Note**: Full mode is triggered by concrete signals, not by default uncertainty

2. **Execute Appropriate Discovery Process**:

   **For Full Mode**:
   - Read and execute `.claude/skills/specs/rules/design-discovery-full.md`
   - Conduct focused research using WebSearch/WebFetch only for in-scope uncertainty:
     - External dependency verification (APIs, libraries, versions, compatibility)
     - Official documentation, migration guides, known issues
     - Security/performance considerations tied to current scope

   **For Light Mode**:
   - Read and execute `.claude/skills/specs/rules/design-discovery-light.md`
   - Focus on integration points, existing patterns, compatibility
   - Use Grep to analyze existing codebase patterns

   **For Minimal Mode / Simple Additions**:
   - Skip formal discovery, quick pattern check only

3. **Retain Discovery Findings for Step 3**:
   - External API contracts and constraints (only if in-scope)
   - Technology decisions with rationale
   - Existing patterns to follow or extend
   - Integration points and dependencies
   - Identified risks and mitigation strategies
   - Potential architecture patterns and boundary options
   - Explicitly note any out-of-scope discoveries as deferred (do not design them now)

4. **Persist Findings to Research Log**:
   - Create or update `.specs/$ARGUMENTS/research.md` using the shared template
   - Summarize discovery scope and key findings (Summary section)
   - Record investigations in Research Log topics with sources and implications
   - Document architecture pattern evaluation, design decisions, and risks
   - Use the language specified in spec.json

### Step 2B: Scope-Lock Enforcement Before Writing Design

- Validate each planned component/flow against `in_scope_requirement_ids`
- If a design element does not map to an in-scope requirement ID:
  - Remove it from main design sections
  - Optionally note it in `research.md` as deferred/out-of-scope
- Do not open new domains (e.g., API/mobile/new data platform) without explicit user approval under `scope_lock.expansion_policy`

### Step 3: Generate Design Document

1. **Load Design Template and Rules**:
   - Read `.claude/skills/specs/templates/design.md` for structure
   - Read `.claude/skills/specs/rules/design-principles.md` for principles

2. **Generate Design Document**:
   - **Follow template structure strictly**
   - **Design only for in-scope requirement IDs** from Step 1
   - **Integrate only in-scope discovery findings** throughout component definitions
   - If existing design.md found, use it as reference context (merge mode)
   - Apply design rules: Type Safety, Visual Communication, Formal Tone
   - Use language specified in spec.json
   - Include Mermaid diagrams only when complexity warrants visualization

3. **Required Sections & Detail Level** (Complexity-Aware):

   **Verbosity Guideline**: Match depth to feature complexity. Prefer concise, concrete decisions over exhaustive boilerplate.
   **Type Detail Rule**: Define full TypeScript interfaces only for components/contracts that cross boundaries or carry non-trivial state.

   | Section | Requirement | Instructions |
   |---------|-------------|--------------|
   | **Overview** | ✅ Mandatory | Purpose, users, impact, goals, non-goals focused on current scope |
   | **Architecture** | ✅ Mandatory | Pattern and boundaries for in-scope requirements only |
   | **System Flows** | 🔶 Conditional | Add Mermaid sequence/flow only when interactions are non-trivial |
   | **Requirements Traceability** | ✅ Mandatory | Map only valid in-scope numeric requirement IDs |
   | **Components and Interfaces** | ✅ Mandatory | Define interfaces/contracts only for components that need explicit boundaries |
   | **Data Models** | 🔶 Conditional | Include only if data/storage changes are in-scope |
   | **Error Handling** | ✅ Mandatory | Include feature-relevant errors and recovery strategies |
   | **Testing Strategy** | ✅ Mandatory | Right-size test scope to feature risk and complexity |
   | **Security Considerations** | 🔶 Conditional | Required when feature touches auth, input trust boundaries, or sensitive data |
   | **Performance & Scalability** | 🔶 Conditional | Required when feature has explicit performance/scalability constraints |
   | **Supporting References** | 🔶 Optional | Include only when details would hurt readability in main sections |

4. **Update Metadata** in spec.json:
   - Set `phase: "design-generated"`
   - Set `approvals.design.generated: true, approved: false`
   - Set `approvals.requirements.approved: true`
   - Set `design_context.discovery_mode: "minimal" | "light" | "full"` (based on Step 2A)
   - Set `design_context.discovery_reason: "<short reason>"`
   - Set `design_context.validation_recommended: true` when discovery mode is `full` or risk level is medium/high
   - Update `updated_at` timestamp

## Critical Constraints
- **Type Safety**:
  - Enforce strong typing aligned with the project's technology stack
  - For TypeScript, never use `any`; prefer precise types and generics
  - Document public interfaces and contracts clearly where relevant
- **Scope Lock**: Do not design capabilities outside `scope_lock`; out-of-scope discoveries must be marked deferred
- **Latest Information**: Use WebSearch/WebFetch only when external dependencies are in-scope and uncertain
- **Steering Alignment**: Respect existing architecture patterns from steering context
- **Template Adherence**: Follow template structure while allowing complexity-aware section optionality
- **Design Focus**: Architecture and interfaces ONLY, no implementation code
- **Requirements Traceability IDs**: Use numeric requirement IDs only (e.g. "1.1", "1.2") as defined in requirements.md
</instructions>

## Tool Guidance
- **Read first**: Load all context before taking action (specs, steering, templates, rules)
- **Research when uncertain**: Use WebSearch/WebFetch only for in-scope external dependencies and unresolved constraints
- **Analyze existing code**: Use Grep to find patterns and integration points in codebase
- **Write last**: Generate design.md only after all research and analysis complete

## Output Description

**Command execution output** (separate from design.md content):

Provide brief summary in the language specified in spec.json:

1. **Status**: Confirm design document generated at `.specs/$ARGUMENTS/design.md`
2. **Discovery Type**: Which discovery process was executed (full/light/minimal)
3. **Discovery Rationale**: One-line reason why this mode was selected
4. **Key Findings**: 2-3 critical in-scope insights from `research.md` that shaped the design
5. **Scope Guard**: Confirm no out-of-scope domains were added to design.md (or list deferred items)
6. **Next Action**: Approval workflow guidance (include whether `/spec-validate $ARGUMENTS` is recommended before `/spec-tasks`)
7. **Research Log**: Confirm `research.md` updated with latest decisions

**Format**: Concise Markdown (under 200 words)

## Safety & Fallback

### Error Scenarios

**Requirements Not Approved**:
- **Stop Execution**: Cannot proceed without approved requirements
- **User Message**: "Requirements not yet approved. Approval required before design generation."
- **Suggested Action**: "Run `/spec-design $ARGUMENTS -y` to auto-approve requirements and proceed"

**Missing Requirements**:
- **Stop Execution**: Requirements document must exist
- **User Message**: "No requirements.md found at `.specs/$ARGUMENTS/requirements.md`"
- **Suggested Action**: "Run `/spec-requirements $ARGUMENTS` to generate requirements first"

**Template Missing**:
- **User Message**: "Template file missing"
- **Suggested Action**: "Check repository setup or restore template file"
- **Fallback**: Use inline basic structure with warning

**Steering Context Missing**:
- **Warning**: "Steering directory empty or missing - design may not align with project standards"
- **Proceed**: Continue with generation but keep scope strictly bound to scope_lock

**Discovery Complexity Unclear**:
- **Default**: Use light discovery process
- **Escalate to Full**: Only when explicit trigger exists (external integration, security/perf criticality, schema boundary change, or user request)

**Invalid Requirement IDs**:
- **Stop Execution**: If requirements.md uses non-numeric headings, stop and instruct user to fix

**No In-Scope Requirement IDs**:
- **Stop Execution**: If none of the requirement IDs are in-scope under scope_lock, stop and ask user to regenerate requirements

### Next Phase: Task Generation

**If Design Approved**:
- Review generated design at `.specs/$ARGUMENTS/design.md`
- **Recommended for medium/high-risk designs**: Run `/spec-validate $ARGUMENTS` to confirm assumptions and trade-offs
- Then `/spec-tasks $ARGUMENTS -y` to generate implementation tasks

**If Modifications Needed**:
- Provide feedback and re-run `/spec-design $ARGUMENTS`
- Existing design used as reference (merge mode)

**Note**: Design approval is mandatory before proceeding to task generation.
