---
name: hapo:debug
description: Investigate issues methodically before changing anything. Use for regressions, broken workflows, inconsistent outputs, hidden cause chains, drift analysis, forensic review, and confidence-gated verification.
version: 1.0.0
argument-hint: "[issue or anomaly description]"
---

# Hapo Debug

Investigation framework for understanding failures before acting on them.

## Core Laws

1. **Do not change the system before identifying a plausible cause.**
2. **Correct the source of failure, not its loudest symptom.**
3. **Do not claim success without fresh proof.**

## When to Use

Use this skill when:
- behavior changed and the reason is unclear
- outputs are inconsistent across steps, tools, or environments
- a regression appeared after recent edits
- a workflow breaks but the visible failure may not be the true source
- you need a structured investigation report before deciding next action

## Modules

### 1. Investigation Doctrine (`./references/investigation-doctrine.md`)
Defines the non-negotiable rules, stop-signs, and anti-patterns for all investigations.

**Load when:** Starting any investigation.

### 2. Primary Investigation Loop (`./references/primary-investigation-loop.md`)
Default execution loop: clarify the issue, collect evidence, form one hypothesis, run the smallest proving action, interpret result.

**Load when:** The issue is local enough to investigate directly.

### 3. Cause Chain Analysis (`./references/cause-chain-analysis.md`)
Trace backward from symptom to trigger through propagation layers.

**Load when:** The visible failure likely originates upstream.

### 4. Containment and Hardening (`./references/containment-and-hardening.md`)
Separate immediate containment from lasting protection after the cause is understood.

**Load when:** The issue is understood and you need to reduce recurrence risk.

### 5. Proof Gate (`./references/proof-gate.md`)
Require current evidence before any claim of completion, correctness, or recovery.

**Load when:** About to say fixed, ready, aligned, passing, or complete.

### 6. Broad Incident Method (`./references/broad-incident-method.md`)
Structured approach for multi-surface incidents with wider impact and multiple evidence sources.

**Load when:** The issue spans multiple components, steps, or owners.

### 7. Change History Analysis (`./references/change-history-analysis.md`)
Use diffs, history, and temporal clues to answer: what changed, and why now?

**Load when:** The issue appears to be a regression or drift.

### 8. Diagnostic Quality Checks (`./references/diagnostic-quality-checks.md`)
Audit the quality of the investigation itself: evidence quality, hypothesis quality, and conclusion confidence.

**Load when:** The investigation feels shaky, circular, or guess-driven.

### 9. Investigation Reporting (`./references/investigation-reporting.md`)
Produce concise, evidence-backed summaries for handoff and decision-making.

**Load when:** You need to summarize findings or recommend next actions.

### 10. Investigation Scaling (`./references/investigation-scaling.md`)
Decide when to stay sequential, when to split work, and when to orchestrate tasks or parallel evidence gathering.

**Load when:** The issue grows beyond a simple single-path investigation.

## Quick Routing

```text
Unclear issue            -> investigation-doctrine.md + primary-investigation-loop.md
Upstream suspicion       -> cause-chain-analysis.md
Regression / drift       -> change-history-analysis.md
Large blast radius       -> broad-incident-method.md
Need safer follow-up     -> containment-and-hardening.md
About to claim success   -> proof-gate.md
Investigation feels weak -> diagnostic-quality-checks.md
Need summary             -> investigation-reporting.md
Issue getting large      -> investigation-scaling.md
```

## Related Skills

- `hapo:inspect` - useful when available and you need to discover relevant files and boundaries fast
- `impact-analysis` - reason about downstream consequences after a likely cause is identified
- `specs` - useful only when the investigation touches generated spec artifacts or templates

## Red Flags

Stop and reset the investigation if you catch yourself thinking:
- "I’ll patch this first and understand it later"
- "Let me try three fixes at once"
- "The symptom is close enough to the source"
- "It probably works now"
- "The output looks fine, that’s enough"

All of these mean the investigation has drifted away from evidence.
