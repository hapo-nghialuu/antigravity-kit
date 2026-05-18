# Research & Design Decisions

---
**Purpose**: Capture discovery findings, architectural investigations, and rationale that inform the technical design.

**Usage**:
- Log research activities and outcomes during the discovery phase.
- Document design decision trade-offs that are too detailed for `design.md`.
- Provide references and evidence for future audits or reuse.
---

## Summary
- **Feature**: `<feature-name>`
- **Discovery Scope**: New Feature / Extension / Simple Addition / Complex Integration
- **Key Findings**:
  - Finding 1
  - Finding 2
  - Finding 3

## Evidence Summary
This section is mandatory for non-trivial specs. It must be written before finalizing requirements, design, or tasks.

- **Codebase Scout**: Required / Skipped
  - Result or skip rationale:
  - Relevant files/modules:
  - Existing patterns/contracts:
  - Tests or checks affected:
- **External / Current Research**: Required / Skipped
  - Result or skip rationale:
  - Primary sources:
  - Current constraints or best practices:
- **Selected Decision**:
  - Decision:
  - Why it fits the current codebase:
  - Why it fits current external constraints:
- **Rejected Alternatives**:
  - Alternative 1 — rejection reason
  - Alternative 2 — rejection reason
- **Remaining Gaps / Questions**:
  - Gap 1
  - Gap 2
- **Downstream Task & Test Implications**:
  - Task implication:
  - Test/verification implication:

## Codebase Scout
Capture only useful repo evidence, not raw file dumps.

| Area | Finding | Evidence / Path | Implication |
|------|---------|-----------------|-------------|
| Project surface | | | |
| Relevant files/modules | | | |
| Existing patterns | | | |
| Contracts | | | |
| Tests and verification | | | |
| Blast radius | | | |
| Staleness / conflicts | | | |

## External / Current Research
Use official docs, standards, package repos, release notes, or maintained upstream references first.

| Question | Source | Finding | Decision Impact |
|----------|--------|---------|-----------------|
| | | | |

## Research Log
Document notable investigation steps and their outcomes. Group entries by topic for readability.

### [Topic or Question]
- **Context**: What triggered this investigation?
- **Sources Consulted**: Links, documentation, API references, benchmarks
- **Findings**: Concise bullet points summarizing the insights
- **Implications**: How this affects architecture, contracts, or implementation

_Repeat the subsection for each major topic._

## Architecture Pattern Evaluation
List candidate patterns or approaches that were considered. Use the table format where helpful.

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Hexagonal | Ports & adapters abstraction around core domain | Clear boundaries, testable core | Requires adapter layer build-out | Aligns with existing steering principle X |

## Design Decisions
Record major decisions that influence `design.md`. Focus on choices with significant trade-offs.

### Decision: `<Title>`
- **Context**: Problem or requirement driving the decision
- **Alternatives Considered**:
  1. Option A — short description
  2. Option B — short description
- **Selected Approach**: What was chosen and how it works
- **Rationale**: Why this approach fits the current project context
- **Status**: [Proposed / Accepted / Superseded]
- **Trade-offs**: Benefits vs. compromises
- **Follow-up**: Items to verify during implementation or testing

_Repeat the subsection for each decision._

## Risks & Mitigations
- Risk 1 — Proposed mitigation
- Risk 2 — Proposed mitigation
- Risk 3 — Proposed mitigation

## References
Provide canonical links and citations (official docs, standards, ADRs, internal guidelines).
- [Title](https://example.com) — brief note on relevance
- ...
