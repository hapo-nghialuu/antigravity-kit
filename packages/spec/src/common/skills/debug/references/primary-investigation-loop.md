# Primary Investigation Loop

Default loop for direct investigations.

## Goal

Move from unclear failure to evidence-backed conclusion with the smallest number of actions.

## Loop

### 1. Clarify the issue
State:
- what is happening
- what should happen instead
- where the mismatch appears

### 2. Collect focused evidence
Gather only the information needed to reason about the next step.
Prefer current outputs, current files, and current state over memory.

### 3. Form one hypothesis
Write one sentence:
- "I think X is happening because Y evidence suggests Z."

A weak hypothesis is acceptable. Multiple simultaneous hypotheses are not.

### 4. Run the smallest proving action
Pick the smallest check that can strengthen or kill the hypothesis.
Examples:
- inspect one file
- compare one artifact
- run one command
- trace one dependency edge

### 5. Interpret the result
Classify outcome:
- hypothesis supported
- hypothesis rejected
- insufficient signal

### 6. Decide next move
- supported -> move toward cause-chain analysis or containment
- rejected -> form a new hypothesis
- insufficient signal -> collect sharper evidence

## Decision Handoffs

Use another module when:
- upstream origin is suspected -> `cause-chain-analysis.md`
- impact is wide -> `broad-incident-method.md`
- regression timing matters -> `change-history-analysis.md`
- conclusion is near -> `proof-gate.md`

## Rules

- Change one variable at a time.
- Prefer short loops over broad wandering.
- Keep the investigation narrow until evidence forces expansion.
