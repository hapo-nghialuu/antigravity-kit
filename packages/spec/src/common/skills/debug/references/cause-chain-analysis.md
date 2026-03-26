# Cause Chain Analysis

Trace from the visible failure back to the originating trigger.

## Goal

Separate:
- trigger
- propagation path
- final symptom

## When to Use

Use this when the breakage is probably not born where it appears.

## Method

### 1. Define the symptom
Describe the last visible wrong state.

### 2. Find the immediate predecessor
Ask: what state, input, or decision made this symptom possible?

### 3. Walk upstream one layer at a time
At each layer ask:
- who produced this state?
- what assumption allowed it?
- what should have stopped it earlier?

### 4. Distinguish categories
- **Trigger** — the first meaningful cause
- **Propagation** — the chain that carried it forward
- **Amplifier** — something that made the issue worse
- **Symptom** — what finally became visible

### 5. Identify the correction point
Choose the highest-leverage point that removes the problem closest to its source.

## Rules

- Do not stop at the first plausible cause if there is a clear upstream path left to inspect.
- Do not confuse "first thing that failed loudly" with "first thing that failed."
- If the chain becomes large, switch to `broad-incident-method.md`.

## Output

Summarize the chain as:
`trigger -> propagation -> symptom`
