# Spec Review (Red Team + Validate)

## Purpose

Review a spec before implementation. The system auto-decides the review depth based on spec complexity — from lightweight validation interview to full adversarial red team assault.

## Spec Resolution

1. If `<feature>` argument provided → use `specs/<feature>/`
2. If not → check active spec (spec with `in_progress` status; accept legacy `in-progress` when reading existing files)
3. If nothing found → ask user to specify path

## Auto-Decision: When to Red Team vs Validate

The system evaluates the spec and picks the appropriate review mode:

| Signal | Mode | Rationale |
|---|---|---|
| < 3 task files, no security/perf concerns | **Validate only** | Lightweight interview is sufficient |
| 3-4 task files, medium complexity | **Validate only** | Interview catches most issues |
| >= 5 task files | **Red Team → then Validate** | Complex enough to warrant adversarial review |
| Keywords: "auth", "security", "payment", "migration", "database schema" | **Red Team → then Validate** | High-risk areas need hostile reviewers |
| Keywords: "refactor", "architecture", "breaking change" | **Red Team → then Validate** | Structural changes need stress testing |
| User says "quick review" or "just validate" | **Validate only** | Respect user's explicit intent |
| User says "tear it apart" or "find flaws" | **Red Team only** | Respect user's explicit intent |

**Important:** When both modes run, Red Team ALWAYS runs BEFORE Validate because:
1. Red Team may change the spec (added risks, removed sections)
2. Validate should confirm the FINAL spec, not a pre-review draft

## Guardrails (NON-NEGOTIABLE)

These rules override any self-reasoning or optimization the system may attempt:

1. **No self-override of auto-decision.** If the table above says "Red Team → then Validate", you MUST run Red Team. You CANNOT skip it because:
   - A `code-auditor` previously reviewed the spec (code review ≠ spec review)
   - The spec "looks good" to you
   - You want to "save time"
   - Only the USER can downgrade the mode by explicitly saying "just validate" or "skip red team"
2. **No implementation code files.** This workflow produces ONLY `.md` files. If a finding requires a new shared module or config file, describe it inside the relevant `task-*.md` file. Do NOT create `.ts`, `.js`, `.py`, or any source code file.
3. **Findings must use the exact format** defined in Part A Step 5 below. No shortened or custom formats.
4. **Apply YAGNI to fixes.** When user says "configure later" or "decide later", add a single note to the task file. Do NOT generate multiple concrete implementations (e.g., 4 provider files when user only asked for abstraction).
5. **No false completion.** You MUST NOT set `validation.status = "completed"` or `ready_for_implementation = true` until a reconciliation audit proves the accepted findings and validation decisions are reflected in the physical spec artifacts.
6. **Provider drift is a real defect.** If the scope changed away from Claude/Anthropic, stale strings like `Claude API`, `Haiku`, or `haiku_reachable` in `requirements.md`, `design.md`, or `tasks/*.md` are validation failures. `research.md` may mention them only as historical comparison.
7. **Implementation-facing propagation is mandatory.** A decision that affects implementation is NOT considered applied if it only appears in `Risk Assessment`, `validate-log.md`, or `red-team-report.md`. It must update at least one of: `requirements.md`, `Canonical Contracts & Invariants`, `Objective`, `Constraints`, `Implementation Steps`, `Completion Criteria`, or `Verification & Evidence`.

---

## Part A: Red Team Review (Adversarial)

### 8-Step Workflow

#### Step 1: Read Entire Spec
- `spec.json` — metadata and scope
- `requirements.md` — technical requirements
- `design.md` — architectural design
- `tasks/task-*.md` — all task files

#### Step 2: Determine Reviewer Count

| Task file count | Reviewers | Lenses |
|---|---|---|
| 1-2 | 2 | Security + Assumption Destroyer |
| 3-5 | 3 | + Failure Mode Analyst |
| 6+ | 4 | + Scope & Complexity Critic (all) |

#### Step 3: Assign Analysis Lenses

| Reviewer | Lens | Focus |
|---|---|---|
| **Security Adversary** | Attacker mindset | Auth bypass, injection, data exposure, privilege escalation, OWASP Top 10 |
| **Failure Mode Analyst** | Murphy's Law | Race conditions, data loss, cascading failures, recovery gaps, rollback holes |
| **Assumption Destroyer** | Skeptic | Unstated dependencies, false claims, missing error paths, scale assumptions |
| **Scope & Complexity Critic** | YAGNI enforcer | Over-engineering, premature abstraction, scope creep, gold plating |

#### Step 4: Spawn Reviewers in Parallel
Each reviewer receives:
- Their specific lens and persona
- Spec file paths to read directly
- Instructions: find 5-10 flaws, findings only, NO praise

**Reviewer instructions:**
```
You are a hostile reviewer. Your job is to DESTROY this spec.
Adopt the {LENS_NAME} perspective. Find every flaw you can.

Rules:
- Be specific: cite exact task/section where flaw lives
- Be concrete: describe failure scenario, not just "could be a problem"
- Rate severity: Critical (blocks success) | High (significant risk) | Medium (notable concern)
- Skip trivial observations (style, naming, formatting)
- No praise. No "overall looks good". Only findings.
- 5-10 findings. Quality over quantity.
```

#### Step 5: Collect → Deduplicate → Cap
1. Gather all findings from all reviewers
2. Remove duplicate or overlapping findings
3. Sort by severity: Critical → High → Medium
4. Cap at 15 findings maximum

#### Step 6: Adjudicate
For each finding, evaluate and propose: **Accept** or **Reject** with rationale.

#### Step 7: User Review
Present via `AskUserQuestion`:
- "Apply all accepted findings"
- "Let me review each one"
- "Reject all, spec is fine"

If "Review each one": For each finding, ask: "Apply" | "Reject" | "Modify suggestion"

#### Step 8: Apply to Spec
- Edit design.md / task files directly for accepted findings
- Create `reports/red-team-report.md` documenting the full review session
- Mark a finding as `Applied To = ...` only after the physical file really contains the change

### Finding Output Format

```markdown
## Finding {N}: {title}
- **Severity:** Critical | High | Medium
- **Location:** Task {X}, section "{name}"
- **Flaw:** {description}
- **Failure scenario:** {concrete description of how this fails}
- **Evidence:** {quote from spec or missing element}
- **Suggested fix:** {brief recommendation}
- **Disposition:** Accept | Reject
- **Rationale:** {explanation}
```

### Red Team Summary

```markdown
## Red Team Review — {YYYY-MM-DD}
**Findings:** {total} ({N} accepted, {M} rejected)
**Severity breakdown:** {N} Critical, {N} High, {N} Medium

| # | Finding | Severity | Disposition | Applied To |
|---|---------|----------|-------------|------------|
| 1 | {title} | Critical | Accept | task-R0-02-... |
```

---

## Part B: Validation Interview

### 8-Step Workflow

#### Step 1: Read Spec
- `requirements.md` — technical requirements
- `design.md` — architectural design
- `tasks/task-*.md` — all task files
- Look for: decision points, assumptions, risks, trade-offs

#### Step 2: Extract Question Topics

| Category | Detection Keywords |
|---|---|
| **Architecture** | "approach", "pattern", "design", "structure", "database", "API" |
| **Assumptions** | "assume", "expect", "should", "will", "must", "default" |
| **Trade-offs** | "tradeoff", "vs", "alternative", "option", "choice" |
| **Risks** | "risk", "might", "could fail", "dependency", "blocker" |
| **Scope** | "phase", "MVP", "future", "out of scope", "nice to have" |

#### Step 3: Generate Questions
- Each question has 2-4 concrete options
- Mark recommended option with "(Recommended)" suffix
- "Other" option is automatically added
- Questions should surface implicit decisions

#### Step 4: Interview User
- Use `AskUserQuestion` tool
- Group max 4 questions per call
- Focus on: assumptions → risks → trade-offs → architecture
- If spec is simple → fewer than 3 questions is OK

#### Step 5: Document Answers

Save to `reports/validate-log.md`:

```markdown
## Validation Log — Session {N} — {YYYY-MM-DD}
**Trigger:** {what prompted this validation session}
**Questions asked:** {N}

### Questions & Answers

1. **[{Category}]** {full question text}
   - Options: {A} | {B} | {C}
   - **Answer:** {user's choice}
   - **Custom input:** {verbatim "Other" text if applicable}
   - **Rationale:** {why this decision affects implementation}

### Confirmed Decisions
- {decision}: {choice} — {brief why}

### Action Items
- [ ] {specific change needed}

### Impact on Tasks
- Task {N}: {what needs updating and why}
```

#### Step 6: Propagate Changes
- Auto-update task files affected by new decisions
- Add marker: `<!-- Updated: Validation Session N — {change} -->`
- Change mapping:

| Change Type | Update Target |
|---|---|
| Requirements | `requirements.md` |
| Architecture | `design.md` |
| Scope | `requirements.md` + task files |
| Risk | Task files (Risk Assessment section) |
| Unknown | `design.md` (add new subsection) |

**Additional propagation rules:**
- If the decision changes implementation behavior, update an implementation-facing section, not only `Risk Assessment`.
- If the decision changes scope or provider choice, scan `requirements.md`, `design.md`, and `tasks/*.md` for stale wording and normalize it.
- If the decision changes deletion/privacy behavior, update `Canonical Contracts & Invariants` first, then tasks that inherit that contract.

#### Step 7: Reconciliation Audit (MANDATORY)
Before declaring validation complete:
1. Re-read `spec.json`, `requirements.md`, `design.md`, and all `tasks/task-*.md`
2. Verify every accepted red-team finding and every validation action item is reflected in the correct physical file(s)
3. Fail the audit if:
   - a report says "applied" but the file still contains the old text
   - stale provider strings remain after a provider change
   - delete-data/privacy artifacts mix multiple canonical policies
   - `spec.json.updated_at`, `timestamps.review_done`, or `timestamps.validation_done` do not reflect the final reviewed state
4. Only after the audit passes may you:
   - set `spec.json.validation.status = "completed"`
   - set `spec.json.timestamps.validation_done`
   - set `spec.json.timestamps.review_done`
   - set `spec.json.ready_for_implementation = true` when all other gates are satisfied

#### Step 8: Final Status Write-Back
- Update `spec.json.updated_at` to the reconciliation time
- Ensure `red-team-report.md` and `validate-log.md` do not contradict `spec.json`
- If reconciliation fails, keep `validation.status` as `not-run` or `in_progress` and list blockers explicitly

---

## Combined Output

When both Red Team and Validate run:

```
📋 Review Complete: specs/<feature>/

Red Team: {N} findings ({A} accepted, {R} rejected)
Validate: {Q} questions asked, {D} decisions confirmed

Files modified: {list}

📌 Next step: /hapo:develop <feature>    (ONLY if reconciliation audit passed)
```
