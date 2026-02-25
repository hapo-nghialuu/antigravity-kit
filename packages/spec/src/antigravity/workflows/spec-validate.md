---
description: Validate design decisions with interview questions before task generation
allowed-tools: Read, Write, Edit, Glob, AskUserQuestion
argument-hint: <feature-name>
---

# Specification Validation Interview

<background_information>
- **Mission**: Validate critical design decisions, assumptions, and trade-offs before generating implementation tasks.
- **Success Criteria**:
  - Ask targeted, concrete questions about high-impact decisions
  - Record answers in spec artifacts for future traceability
  - Update spec metadata to reflect validation status
</background_information>

<instructions>
## Core Task
Run a structured interview for feature **$ARGUMENTS** and persist decisions.

## Execution Steps

### Step 0: Resolve & Validate State
- Require `$ARGUMENTS` as feature name
- Read `.specs/$ARGUMENTS/spec.json`
- Stop with guidance if spec does not exist
- Ensure `requirements.md` and `design.md` exist before validation

### Step 1: Load Validation Context
Read:
- `.specs/$ARGUMENTS/spec.json`
- `.specs/$ARGUMENTS/requirements.md`
- `.specs/$ARGUMENTS/design.md`
- `.specs/$ARGUMENTS/research.md` (if exists)

Extract decision points around:
- architecture and boundaries
- assumptions and defaults
- integration risks
- scope and sequencing
- testing/security/performance trade-offs

### Step 2: Determine Question Budget
Use injected session validation settings when available (`Validation: mode=X, questions=MIN-MAX`).
- If unavailable, use 3-6 questions
- Ask only meaningful questions that can change implementation
- Each question must have 2-4 concrete options

### Step 3: Interview User
Use `AskUserQuestion` in batches (max 4 questions per call).
Rules:
- Include one recommended option when a safe default exists
- Keep options mutually exclusive
- Do not ask redundant questions

### Step 4: Persist Validation Log
Append to `.specs/$ARGUMENTS/research.md` under `## Validation Log`.
If section missing, create it.

Session format:
```markdown
## Validation Log

### Session N — YYYY-MM-DD
- Questions asked: X

1. [Category] Question text
   - Options: A | B | C
   - Answer: ...
   - Rationale: why this decision matters

#### Confirmed Decisions
- ...

#### Follow-up Actions
- [ ] ...
```

### Step 5: Update Metadata
Update `.specs/$ARGUMENTS/spec.json`:
- `approvals.requirements.approved: true`
- `approvals.design.approved: true`
- `validation.last_validated_at: <ISO timestamp>`
- `validation.questions_asked: <number>`
- `validation.status: "completed"`
- increment `validation.session_count` (initialize to 1 if absent)
- update `updated_at`

## Constraints
- Keep input/output contract of existing `spec-*` commands unchanged
- Validation must be traceable and append-only (never overwrite old sessions)
- Ask fewer questions when artifact is simple; quality over quantity
</instructions>

## Output Description
Provide concise summary:
1. Validation status and files updated
2. Number of questions asked
3. Top confirmed decisions
4. Recommended next command:
   - `/spec-tasks $ARGUMENTS` when ready

## Safety & Fallback
- Missing spec/design artifacts: stop and instruct the exact preceding command
- Empty decision surface: ask only 1-2 high-value confirmation questions
- Write failure: report exact path and retry guidance
