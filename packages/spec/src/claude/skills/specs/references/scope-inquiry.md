# Scope Inquiry

## Purpose

Before investing time in planning, confirm with the user the appropriate level of investment. Avoid wasting time on deep research for simple tasks, or missing risks for complex ones.

## Skip Conditions

Skip Scope Inquiry when:
- Task is clearly trivial (1 file, typo fix, config change)
- Description is under 20 words and unambiguous
- User signals urgency ("just do it", "quick", etc.)

## 5-Dimension Complexity Assessment

Evaluate complexity across **5 dimensions** to avoid blind spots. A task may be architecturally small but extremely risky, or seemingly simple but with a huge blast radius.

### Dimension 1: Semantic Intent & Current State
- What is the core business or technical meaning of the request?
- How does the system currently behave in this area? What existing patterns, services, or infrastructure can be leveraged?
- Would this spec rebuild something that already exists? If yes, warn before proceeding.

### Dimension 2: High-Level Implementation Hypothesis
- Conceptually, how must the architecture adapt to fulfill the semantic intent?
- Hypothesize the structural impact: Does this require new database models, API contracts, third-party integrations, or is it strictly localized logic/UI changes?

### Dimension 3: Gap Analysis & Sizing
Evaluate the gap between Current State and Hypothesis:
- **Small**: No architectural changes. Extending existing patterns, adding UI components, or patching localized logic.
- **Medium**: Modifying data flows, adding new API endpoints, or bridging two previously unconnected modules.
- **Large**: New persistence models, security/auth changes, cross-system migrations, or touching core system foundations.
- **Scope check**: Separate aspirational goals (nice-to-haves) from what is strictly necessary to bridge the core gap.

### Dimension 4: Risk & Uncertainty (Cynefin-inspired)
Classify the *knowability* of the solution path:
- **Clear**: Well-understood problem with established patterns and documentation (e.g., CRUD endpoints, standard auth flows). Proceed with confidence.
- **Complicated**: Solution exists but requires expert analysis or research (e.g., payment gateway integration, complex query optimization). Plan carefully, may need `researcher` subagent.
- **Complex**: Outcome is uncertain; solution emerges through experimentation (e.g., AI/ML tuning, novel UX interactions, performance bottleneck with unknown root cause). Requires prototyping or spike tasks before committing to a full spec.
- **Chaotic**: No clear path; urgent stabilization needed first (e.g., production outage, data corruption). Skip spec workflow entirely — use `hapo:hotfix` instead.

> **Rule**: If Dimension 4 = Complex or Chaotic, flag this to the user immediately. Complex tasks should include explicit spike/prototype tasks in the spec. Chaotic tasks should exit the spec workflow.

### Dimension 5: Dependency & Blast Radius
Assess how many other parts of the system are affected if this change breaks or behaves unexpectedly:
- **Isolated**: Change is self-contained within a single module or feature. No shared interfaces touched.
- **Moderate**: Change touches shared utilities, common components, or API contracts consumed by 2-3 other modules.
- **Critical Path**: Change affects core infrastructure (auth, data layer, routing, state management) or shared libraries used system-wide. A bug here cascades everywhere.

> **Rule**: If Blast Radius = Critical Path, the spec MUST include rollback strategy and explicit test coverage requirements in the task files.

## Level Selection

After completing the 5-Dimension Assessment, present via `AskUserQuestion`:

**Title:** "Scope Inquiry"
**Question:** "Based on analysis, what scope level do you want?"

| Option | Description | Impact |
|---|---|---|
| **Expand** | Deep research, explore multiple approaches, add stretch features | More research, stretch requirements, more tasks |
| **Hold** | Keep scope as described, prioritize quality | Focus on edge cases, test coverage, failure modes |
| **Reduce** | Core only, defer everything non-essential | Fewer tasks, simpler architecture, defer non-blocking parts |

## Immutable Rule

**Once user picks a level, respect it throughout the entire workflow:**
- Don't silently shrink when user chose Expand or Hold
- Don't silently expand when user chose Reduce
- Raise scope concerns ONCE at this step. Then commit and optimize within the chosen scope.

## Output Format

```
Scope Inquiry:
- Semantic Intent: [Core meaning of request]
- Hypothesis: [High-level architectural adaptation needed]
- Gap Size: [Small/Medium/Large] — [reason]
- Risk Level: [Clear/Complicated/Complex/Chaotic] — [reason]
- Blast Radius: [Isolated/Moderate/Critical Path] — [affected modules]
- Minimum Change: [Essential gap vs Niceties]
- User chose: [Expand / Hold / Reduce]
```
