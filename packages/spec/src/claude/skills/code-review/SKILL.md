---
name: hapo:code-review
description: "Adversarial code review with technical rigor. Supports 3-Stage Protocol with ai-multimodal injection for multimodal spec compliance. Red-team analysis finds security holes, logic gaps, and architecture violations."
argument-hint: "[#PR | COMMIT | --pending | scope]"
version: 1.0.0
---

# Code Review

Adversarial code review with technical rigor, evidence-based claims, and visual/document intelligence via the `hapo:ai-multimodal` Hub.

Runs during the `hapo:develop` Quality Gate (parallel to `hapo:test`), or standalone.

## Load First
Before executing any review, firmly grasp these two pillars:
- `references/spec-compliance-review.md` (Stage 1 rules)
- `references/verification-gate.md` (Execution Proofs)
- `references/pre-landing-checklists.md` (Stage 2 rules)
- `references/adversarial-review.md` (Stage 3 rules)

## Core Principles
1. **YAGNI**, **KISS**, **DRY** always prevail. 
2. Technical correctness over social comfort. Be honest and straight to the point.
3. If Specs are provided as PDF or Design Images, do not guess — use `hapo:ai-multimodal` to verify.

## Usage & Input Modes

If invoked without explicit arguments, default to reviewing recent changes (pending diff).

| Input | Mode | Target Definition |
|-------|------|--------------------|
| `#123` | **PR** | Full PR diff via `gh pr diff` |
| `abc1234` | **Commit** | Single commit diff via `git show` |
| `--pending`| **Pending** | Staged + unstaged changes via `git diff` |
| `scope` | **Path** | Specific files or directories |

## 3-Stage Adversarial Protocol

Ensure verification walks through these three stages before delivering a final score.

### Stage 1 — Spec Compliance (with `ai-multimodal` injection)
Does the code match what was requested?
- Read contextual spec records (markdown files).
- **Multimodal Delegation:** If the spec references or provides PDF requirements, architecture diagrams, or UI mockups (images), **STOP**. Delegate to `hapo:ai-multimodal` scripts (e.g. `gemini_batch_process.py`) to parse the JSON constraints from the document, then compare the implementation against the true layout/logic constraints.
- Any missing requirements? Any unjustified extras?

### Stage 2 — Code Quality
- Identify YAGNI, DRY, KISS violations. 
- Ensure readability, naming conventions, and proper component boundaries (MVC/Clean Architecture compliance).
- Check for hardcoded values and missing tests.

### Stage 3 — Adversarial Review (Red-Team)
Actively try to break the code.
- **Edge Case Scouting:** If the Pull Request modifies >= 5 files, invoke the `inspect` agent to scout the codebase to see where modified functions/components are imported and if boundary errors exist before finishing the review.
- Find security holes (XSS, SQL Injection, Hardcoded tokens, Exposed Secrets).
- Find false assumptions, resource exhaustion loops, and race conditions.
- Find unhandled edge cases (e.g. empty strings, null pointers, negative integers). 

## Output Scoring

Your report MUST return a score out of 10.
- **PASS:** Score >= 9.5 and **0 Critical findings**.
- **FAIL:** Score < 9.5 or > 0 Critical findings.

Format:
```markdown
# Code Review Results [hapo:code-review]

**Score:** X.X / 10
**Status:** PASS | FAIL
**Target:** [PR | Commit | Path]

## Stage 1: Spec Compliance
- [Issue or OK] (If visual/PDF used, mention ai-multimodal analysis result)

## Stage 2: Code Quality
- [Issue or OK]

## Stage 3: Adversarial Findings
- [🔴 Critical] ...
- [🟡 Warning] ...
- [🔵 Suggestion] ...

## Fix Commands (Terminal ready)
[List exact bash commands or SED replacements to fix the issues quickly if possible]
```

## Related
- Parallel skill: `/hapo:test`
- AI Hub: `/hapo:ai-multimodal`
- Parent orchestrator: `quality-gate.md`
