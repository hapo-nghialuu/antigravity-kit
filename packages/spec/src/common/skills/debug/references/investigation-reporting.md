# Investigation Reporting

Turn findings into a concise, decision-useful report.

## Goal

A reader should understand:
- what went wrong
- what evidence supports that view
- what should happen next

## Report Structure

### 1. Summary
- issue statement
- current impact
- confidence level
- current status

### 2. Findings
List the strongest findings first.
Separate fact from interpretation.

### 3. Evidence
Include only the evidence that matters.
Reference commands, outputs, diffs, or artifact excerpts.

### 4. Cause Statement
State the best current explanation.
If not confirmed, say likely or provisional.

### 5. Actions
Split by type:
- containment
- correction
- hardening
- follow-up investigation

### 6. Open Questions
List what remains unclear.

## Writing Rules

- concise over polished
- evidence-backed over persuasive
- explicit uncertainty over false confidence
- actionable over exhaustive

## Minimal Template

```markdown
## Summary
- Issue:
- Impact:
- Confidence:
- Status:

## Findings
1.
2.

## Evidence
-

## Cause Statement
-

## Actions
- Containment:
- Correction:
- Hardening:
- Follow-up:

## Open Questions
-
```
