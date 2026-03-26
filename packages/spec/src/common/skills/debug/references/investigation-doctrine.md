# Investigation Doctrine

This module defines the rules that govern every investigation.

## Purpose

Prevent thrashing, patch-first behavior, and premature conclusions.

## Non-Negotiable Rules

1. Do not edit before you can describe the failure clearly.
2. Do not treat the first visible symptom as the source.
3. Do not merge multiple hypotheses into one test.
4. Do not accept stale evidence.
5. Do not say complete, fixed, aligned, or passing without a current check.

## Required Inputs

Before proceeding, capture:
- observed symptom
- expected behavior
- known scope of impact
- current confidence level

## Common Failure Modes

- **Patch-first drift** — changing things before understanding them
- **Symptom fixation** — fixing the visible break instead of the trigger
- **Evidence inflation** — treating weak clues as proof
- **Conclusion leakage** — speaking as if success is already established
- **Scope creep during investigation** — expanding the mission before the current issue is understood

## Stop Signs

Pause and reset if:
- you cannot state the symptom in one or two lines
- each attempt changes the shape of the problem without reducing uncertainty
- the investigation keeps widening without a cause chain
- you are relying on memory instead of current output

## Investigation Classes

- **Local issue** — one path, one output, limited blast radius
- **Layered issue** — symptom appears downstream from its source
- **Broad incident** — multiple surfaces, owners, or evidence streams
- **Regression** — something worked before and no longer does

## Exit Condition

Leave doctrine mode only when the issue is framed well enough to enter a concrete investigation loop.
