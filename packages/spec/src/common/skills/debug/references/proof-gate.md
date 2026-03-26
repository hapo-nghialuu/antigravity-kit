# Proof Gate

No conclusion is valid until supported by current proof.

## Goal

Block premature success claims.

## Gate Sequence

### 1. Name the claim
Examples:
- fixed
- aligned
- complete
- recovered
- ready

### 2. Name the proof required
Ask:
- what exact check would prove this claim now?

### 3. Run the check
Use a current command, current artifact read, or current state inspection.

### 4. Read the result fully
Do not infer success from partial output.

### 5. Compare claim to evidence
If evidence is weaker than the claim, weaken the claim.

## Weak vs Strong Language

Weak and forbidden:
- should work
- seems good
- probably fixed
- looks aligned

Allowed:
- current check shows X
- latest output confirms Y
- evidence supports Z with these limits

## Rule

No fresh proof -> no completion language.

## Exit Condition

You may claim success only when the current evidence directly supports the exact claim being made.
