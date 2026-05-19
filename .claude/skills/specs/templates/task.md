# Task R{{REQ_NUMBER}}-{{SEQ}}: {{TITLE}}

**Requirement:** R{{REQ_NUMBER}} — {{REQUIREMENT_TITLE}}
**Status:** pending
**Priority:** {{PRIORITY}}
**Estimated Effort:** {{EFFORT}}
**Dependencies:** {{DEPENDENCIES}}
**Spec:** specs/{{FEATURE_NAME}}/

## Context

- **Why**: {{Business/user reason this task exists}}
- **Current state**: {{Relevant existing files, route, model, API, screen, or "greenfield"}}
- **Target outcome**: {{Observable behavior after this task is done}}

## Constraints

- **MUST**: {{Non-negotiable requirement or technical constraint}}
- **SHOULD**: {{Recommended approach or optimization}}
- **MUST NOT**: {{Explicitly forbidden action or approach}}
- **SCOPE**: Implement only the behavior mapped to R{{REQ_NUMBER}} and the approved `scope_lock`; do not add out-of-scope features or leave scoped acceptance criteria unwired.

## Steps

- [ ] 1. {{Actionable step with exact file/path/contract}}
  - {{Business intent: what user/system behavior this enables}}
  - {{Code detail: schema/API/component/function/route and validation rules}}
  - _Requirements: {{REQ_NUMBER}}.{{X}}_

- [ ] 2. {{Next actionable step}}
  - {{Business intent}}
  - {{Code detail, edge case, or integration contract}}
  - _Requirements: {{REQ_NUMBER}}.{{Y}}_

- [ ] 3. Verification implementation
  - {{Unit/integration/e2e test or explicit manual verification hook}}
  - _Requirements: {{REQ_NUMBER}}_

## Requirements

- {{REQ_NUMBER}}.{{X}} — {{Acceptance criterion or requirement covered}}
- {{REQ_NUMBER}}.{{Y}} — {{Acceptance criterion or requirement covered}}

## Related Files

| Path | Action | Description |
|---|---|---|
| `{{FILE_PATH_1}}` | Create / Modify / Delete | {{DESCRIPTION_1}} |
| `{{FILE_PATH_2}}` | Create / Modify / Delete | {{DESCRIPTION_2}} |

## Completion Criteria

- [ ] {{Criteria 1 — observable output or artifact, maps to acceptance criteria R{{REQ_NUMBER}}}}
- [ ] {{Criteria 2 — measurable behavior or negative-path outcome}}
- [ ] {{Criteria 3 — maps directly to acceptance criteria from requirements.md and can be proven below}}
- [ ] {{Criteria 4 — no orphaned component/service/route/command; created runtime-facing work is reachable from the declared entrypoint or explicitly deferred to a named integration task}}

## Evidence

This section is both the task-level test plan and the proof checklist. Keep it short, exact, and executable.
Select the proof by task risk; do not run every test type for every task.

- Logic/data/validator task: include unit tests.
- Stateful UI/component task: include component or integration tests.
- Cross-module/API/state flow task: include integration tests.
- User-facing end-to-end workflow: include E2E/UI flow verification.
- Layout/theme/responsive task: include visual/runtime viewport checks.
- Interactive UI task: include accessibility checks when keyboard, focus, labels, or ARIA can regress.
- Scaffold/release task: include smoke build/test/dev-server checks.
- Performance/security checks are required only when the requirement, risk, or touched surface calls for them.

- [ ] Automated verification (unit/component/integration/E2E as applicable)
  - Command(s): `{{TYPECHECK / TEST / BUILD COMMANDS OR N/A}}`
  - Expected proof: {{What output, exit code, or report proves success}}
- [ ] Artifact / runtime verification
  - Inspect: `{{artifact path | route | UI state | DB object | manifest entry}}`
  - Expect: {{Observable result that proves the task is really wired}}
- [ ] Runtime reachability verification
  - Entrypoint/caller: `{{App.tsx | route file | CLI command | worker registration | manifest | API consumer}}`
  - Expect: {{Created component/service/route/worker/loader is imported, mounted, registered, or invoked from the runtime path; if deferred, name the later integration task}}
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
> **Evidence rule**: No `## Evidence` section = invalid task file. Existing specs may use `## Task Test Plan & Verification Evidence` or legacy `## Verification & Evidence`; agents must support all three headings.
