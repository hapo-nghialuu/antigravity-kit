---
name: spec-requirements
description: Generate comprehensive requirements for a specification
allowed-tools: Glob, Grep, Read, Write, Edit, WebSearch, WebFetch
argument-hint: <feature-name>
---

# Requirements Generation

<background_information>
- **Mission**: Generate comprehensive, testable requirements in EARS format based on the project description from spec initialization
- **Success Criteria**:
  - Create complete requirements document aligned with steering context
  - Follow the project's EARS patterns and constraints for all acceptance criteria
  - Focus on core functionality without implementation details
  - Update metadata to track generation status
</background_information>

<instructions>
## Core Task
Generate complete requirements for feature **$ARGUMENTS** based on the project description in requirements.md.

## Execution Steps

0. **Validate Phase State (Plan-Style Gate)**:
   - Read `.specs/$ARGUMENTS/spec.json` first
   - If missing feature directory or spec.json: stop and ask user to run `/spec-init <project-description>` first
   - If `phase` is `design-generated` or `tasks-generated`: stop and explain requirements phase already completed; ask user to edit/re-run only with explicit intent to regenerate requirements

1. **Load Context**:
   - Read `.specs/$ARGUMENTS/spec.json` for language and metadata
   - Read `.specs/$ARGUMENTS/requirements.md` for project description
   - Resolve scope baseline from `spec.json.scope_lock`:
     - `scope_lock.source` = canonical original intent
     - `scope_lock.in_scope[]` = capability list that requirements MUST stay within
     - `scope_lock.out_of_scope[]` = nearby capabilities that MUST NOT be promoted into main requirements
     - `scope_lock.expansion_policy` = default `requires-user-approval`
   - Backward-compatible fallback for older specs without `scope_lock`:
     - Derive initial scope from project description in requirements.md
     - Initialize scope lock in memory for this run (do not hard-fail)
   - Load steering context from `.specs/steering/` (if exists) as **constraints only**:
     - Use steering to enforce standards, conventions, and constraints
     - Do NOT add new product capabilities/domains beyond scope_lock

2. **Read Guidelines**:
   - Read `{{SKILLS_DIR}}/specs/rules/ears-format.md` for EARS syntax rules
   - Read `{{SKILLS_DIR}}/specs/templates/requirements.md` for document structure
   - **Load project docs context (Plan-style quality gate)** when available:
     - `docs/codebase-summary.md`
     - `docs/code-standards.md`
     - `docs/system-architecture.md`
     - `docs/project-overview-pdr.md`
   - If any docs file is missing, continue and note the missing context in output (do not block generation)

3. **Analyze Existing Codebase** (for Extension/Enhancement features):
   - Search for related files: `**/*.{tsx,jsx,ts,js,vue,py}`
   - Read existing components/modules related to the feature
   - Identify what's already implemented vs what needs to be added
   - If existing implementation found:
     - Add Introduction section in requirements.md acknowledging existing code
     - Focus requirements on enhancements/additions, not reimplementation
     - Reference existing components (e.g., "The project already has X and Y")
   - If greenfield (no existing code): Skip Introduction, proceed normally

4. **Scope-Lock Filtering & Clarification**:
   - Draft candidate requirement topics from description + codebase findings
   - Keep only topics that fit `scope_lock.in_scope` and `scope_lock.source`
   - For topics matching `scope_lock.out_of_scope` or introducing new domains:
     - Mark as `Deferred / Out of Scope` in requirements.md notes section
     - Do NOT include them in main requirement list
   - If ambiguity could change scope boundaries, ask 1-2 focused clarification questions before finalizing requirements

5. **Generate Requirements**:
   - Create initial requirements based on project description
   - Consider existing codebase findings (if any)
   - Group related functionality into logical requirement areas
   - Apply EARS format to all acceptance criteria:
     - Event-Driven: `When [event], the [system] shall [response]`
     - State-Driven: `While [precondition], the [system] shall [response]`
     - Unwanted: `If [trigger], the [system] shall [response]`
     - Optional: `Where [feature], the [system] shall [response]`
     - Ubiquitous: `The [system] shall [response]`
   - Use language specified in spec.json

6. **Update Metadata**:
   - Set `phase: "requirements-generated"`
   - Set `approvals.requirements.generated: true`
   - Update `updated_at` timestamp

## Important Constraints
- Focus on WHAT, not HOW (no implementation details)
- Requirements must be testable and verifiable
- Choose appropriate subject for EARS statements (system/service name for software)
- Requirements generation is scope-locked by `spec.json.scope_lock`
- Out-of-scope ideas must be captured as deferred, not merged into primary requirements
- Requirement headings in requirements.md MUST include a leading numeric ID only (for example: "Requirement 1", "1.", "2 Feature ..."); do not use alphabetic IDs like "Requirement A".
</instructions>

## Tool Guidance
- **Read first**: Load all context (spec, scope lock, steering constraints, rules, templates) before generation
- **Write last**: Update requirements.md only after complete generation
- Use **WebSearch/WebFetch** only if external domain knowledge needed

## Output Description
Provide output in the language specified in spec.json with:

1. **Generated Requirements Summary**: Brief overview of major in-scope requirement areas (3-5 bullets)
2. **Scope Guard Summary**: List deferred/out-of-scope topics excluded from primary requirements
3. **Document Status**: Confirm requirements.md updated and spec.json metadata updated
4. **Next Steps**: Guide user on how to proceed (approve and continue, or modify)

**Format Requirements**:
- Use Markdown headings for clarity
- Include file paths in code blocks
- Keep summary concise (under 300 words)

## Safety & Fallback

### Error Scenarios
- **Missing Project Description**: If requirements.md lacks project description, ask user for feature details
- **Ambiguous Requirements**: Propose initial version and iterate with user rather than asking many upfront questions
- **Template Missing**: If template files don't exist, use inline fallback structure with warning
- **Language Undefined**: Default to English (`en`) if spec.json doesn't specify language
- **Incomplete Requirements**: After generation, explicitly ask user if requirements cover all expected functionality
- **Steering Directory Empty**: Warn user that project standards context is missing and may affect quality constraints
- **Scope Drift Risk**: If candidate requirements introduce domains outside scope_lock, ask 1-2 clarifying questions; if unconfirmed, classify as deferred/out-of-scope
- **Non-numeric Requirement Headings**: If existing headings do not include a leading numeric ID, normalize them to numeric IDs

### Next Phase: Design Generation

**If Requirements Approved**:
- Review generated requirements at `.specs/$ARGUMENTS/requirements.md`
- Then `/spec-design $ARGUMENTS` to proceed to design phase

**If Modifications Needed**:
- Provide feedback and re-run `/spec-requirements $ARGUMENTS`

**Note**: Approval is mandatory before proceeding to design phase.
