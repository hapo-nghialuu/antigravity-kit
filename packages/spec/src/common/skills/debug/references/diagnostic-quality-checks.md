# Diagnostic Quality Checks

Audit the quality of the investigation itself.

## Goal

Detect when the investigation is becoming vague, biased, or circular.

## Quality Questions

### Issue quality
- Is the symptom stated clearly?
- Is the expected behavior stated clearly?
- Is the scope explicit?

### Evidence quality
- Is the evidence current?
- Is it direct or inferred?
- Does it actually discriminate between hypotheses?

### Hypothesis quality
- Is there only one active hypothesis?
- Is it falsifiable?
- Is the next action capable of disproving it?

### Conclusion quality
- Is the claimed confidence level honest?
- Did the result actually prove the conclusion?
- Are unknowns still visible in the summary?

## Smells

- broad fixes with narrow evidence
- narrow conclusions from weak clues
- using memory instead of current state
- escalating complexity without gaining certainty
- re-running actions that do not produce new information

## Confidence Bands

- **Low** — plausible but weakly supported
- **Medium** — supported by current evidence, some gaps remain
- **High** — directly supported, minimal ambiguity remains

## Exit Condition

Proceed only when the investigation quality is good enough that the next step is evidence-driven rather than momentum-driven.
