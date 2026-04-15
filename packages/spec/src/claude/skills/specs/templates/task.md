# Task R{{REQ_NUMBER}}-{{SEQ}}: {{TITLE}}

**Requirement:** R{{REQ_NUMBER}} — {{REQUIREMENT_TITLE}}
**Status:** pending
**Priority:** {{PRIORITY}}
**Estimated Effort:** {{EFFORT}}
**Dependencies:** {{DEPENDENCIES}}
**Spec:** specs/{{FEATURE_NAME}}/

## Objective

{{Brief 1-2 sentence objective detailing WHAT to accomplish, not HOW. Must relate directly to requirement R{{REQ_NUMBER}}.}}

## Constraints

- **MUST**: {{Non-negotiable requirement or technical constraint}}
- **SHOULD**: {{Recommended approach or optimization}}
- **MUST NOT**: {{Explicitly forbidden action or approach}}

## Implementation Steps

- [ ] 1. {{MAJOR_STEP_1}}
  - [ ] 1.1 {{Sub-task describing specific behavior/action}}
    - {{Detail: business logic, behavior, target validation}}
    - {{Detail: edge case or constraint}}
    - _Requirements: {{REQ_NUMBER}}.{{X}}_
  - [ ] 1.2 {{Next sub-task}}
    - {{Detail items}}
    - _Requirements: {{REQ_NUMBER}}.{{Y}}_

- [ ] 2. {{MAJOR_STEP_2}}
  - [ ] 2.1 {{Sub-task}}
    - {{Details}}
    - _Requirements: {{REQ_NUMBER}}.{{Z}}_
  - [ ] 2.2 {{Sub-task}}
    - {{Details}}
    - _Requirements: {{REQ_NUMBER}}.{{W}}_

- [ ] 3. Test coverage for R{{REQ_NUMBER}}
  - [ ] 3.1 Unit tests
    - {{Test case 1: target behavior to verify}}
    - {{Test case 2: edge case / error case}}
    - _Requirements: {{REQ_NUMBER}}_
  - [ ]* 3.2 Integration tests (optional for MVP)
    - {{Describe end-to-end flow to verify}}
    - _Requirements: {{REQ_NUMBER}}_

## Related Files

| Path | Action | Description |
|---|---|---|
| `{{FILE_PATH_1}}` | Create / Modify / Delete | {{DESCRIPTION_1}} |
| `{{FILE_PATH_2}}` | Create / Modify / Delete | {{DESCRIPTION_2}} |

## Completion Criteria

- [ ] {{Criteria 1 — observable output or artifact, maps to acceptance criteria R{{REQ_NUMBER}}}}
- [ ] {{Criteria 2 — measurable behavior or negative-path outcome}}
- [ ] {{Criteria 3 — maps directly to acceptance criteria from requirements.md and can be proven below}}

## Verification & Evidence

- [ ] Automated verification
  - Command(s): `{{TYPECHECK / TEST / BUILD COMMANDS OR N/A}}`
  - Expected proof: {{What output, exit code, or report proves success}}
- [ ] Artifact / runtime verification
  - Inspect: `{{artifact path | route | UI state | DB object | manifest entry}}`
  - Expect: {{Observable result that proves the task is really wired}}
- [ ] Contract / negative-path verification
  - Check: {{Unauthorized path, validation error, permission omission, missing env behavior, deletion effect, etc.}}
  - Expect: {{Concrete failure mode or contract-preserving behavior}}

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| {{RISK_1}} | High/Medium/Low | {{MITIGATION_1}} |
| {{RISK_2}} | High/Medium/Low | {{MITIGATION_2}} |

---

> **Parallel marker**: Append `(P)` to the title if this task can run concurrently with another (usually when serving different requirements).
> **Test note**: If a test coverage sub-task can be deferred post-MVP, mark it with `- [ ]*`.
> **Requirement mapping**: Every sub-task MUST end with `_Requirements: X.X_`. No mapping = invalid task file.
> **Verification rule**: No `## Verification & Evidence` section = invalid task file.
