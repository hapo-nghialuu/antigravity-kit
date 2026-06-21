# Requirements Document

## Introduction
{{INTRODUCTION}}

## Requirements

### Requirement 1: {{REQUIREMENT_AREA_1}}
<!-- Requirement headings MUST include a leading numeric ID only (for example: "Requirement 1: ...", "1. Overview", "2 Feature: ..."). Alphabetic IDs like "Requirement A" are not allowed. -->
<!-- Acceptance criteria use EXPLICIT literal IDs `R{N}.{M}` (R1.1, R1.2, ...), NOT a bare numbered list. This lets the validator verify per-criterion coverage (each R1.1 must be mapped by a task `_Requirements: 1.1_`). Do not switch to a bare `1. 2. 3.` list — that silently disables sub-criterion coverage. -->
**Objective:** As a {{ROLE}}, I want {{CAPABILITY}}, so that {{BENEFIT}}

#### Acceptance Criteria
- **R1.1** When [event], the [system] shall [response/action]
- **R1.2** If [trigger], then the [system] shall [response/action]
- **R1.3** While [precondition], the [system] shall [response/action]
- **R1.4** Where [feature is included], the [system] shall [response/action]
- **R1.5** The [system] shall [response/action]

### Requirement 2: {{REQUIREMENT_AREA_2}}
**Objective:** As a {{ROLE}}, I want {{CAPABILITY}}, so that {{BENEFIT}}

#### Acceptance Criteria
- **R2.1** When [event], the [system] shall [response/action]
- **R2.2** When [event] and [condition], the [system] shall [response/action]

<!-- Additional requirements follow the same pattern, with literal R{N}.{M} IDs -->

## Non-Functional Requirements

<!-- Continue the SAME numeric sequence as functional requirements. Do NOT switch to labels like NFR-1, SEC-1, PERF-1. -->

### Requirement {{NEXT_REQ_NUMBER}}: Performance & Scalability
**Objective:** As a system owner, I want predictable performance characteristics, so that the feature remains usable under expected load.

#### Acceptance Criteria
- **R{{NEXT_REQ_NUMBER}}.1** The [system] shall [measurable performance metric, e.g. "respond within 500ms"]
- **R{{NEXT_REQ_NUMBER}}.2** The [system] shall [measurable scale metric, e.g. "support 100 concurrent users"]

### Requirement {{NEXT_REQ_NUMBER_PLUS_ONE}}: Security & Privacy
**Objective:** As a security/compliance stakeholder, I want the feature to protect sensitive data and enforce access boundaries, so that the system is safe to ship.

#### Acceptance Criteria
- **R{{NEXT_REQ_NUMBER_PLUS_ONE}}.1** The [system] shall [measurable security behavior, e.g. "encrypt data at rest using AES-256"]
- **R{{NEXT_REQ_NUMBER_PLUS_ONE}}.2** If [unauthorized or invalid condition], the [system] shall [deny or recover with explicit behavior]

### Requirement {{NEXT_REQ_NUMBER_PLUS_TWO}}: Reliability & Availability
**Objective:** As an operator, I want predictable failure handling, so that incidents remain diagnosable and recoverable.

#### Acceptance Criteria
- **R{{NEXT_REQ_NUMBER_PLUS_TWO}}.1** If [failure condition], the [system] shall [recovery behavior]
- **R{{NEXT_REQ_NUMBER_PLUS_TWO}}.2** The [system] shall [durability / retry / fallback expectation]
