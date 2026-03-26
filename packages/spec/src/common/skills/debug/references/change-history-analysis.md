# Change History Analysis

Use historical change data to answer: what changed, and why now?

## Best Use Cases

- regressions
- drift from a previously stable state
- failures appearing after recent edits or installs
- uncertainty about the first breaking change

## Method

### 1. Define the comparison window
Choose the smallest useful time or version range.

### 2. Inspect relevant history
Look at:
- recent diffs
- commit history
- file-level changes
- generated artifact changes
- configuration edits

### 3. Filter for plausible influence
Favor changes that:
- touch the failing surface
- alter assumptions or dependencies
- align with the first observed break

### 4. Build a change narrative
Explain:
- what changed
- how it could influence behavior
- why it matters now

### 5. Test the narrative
Do not stop at temporal proximity.
The right change must also have a plausible causal path.

## Warnings

- nearest change is not always the real cause
- big change is not automatically the dangerous change
- stable files can still be affected by dependency or contract drift elsewhere
