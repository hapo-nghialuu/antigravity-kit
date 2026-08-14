# Task R{{REQ_NUMBER}}-{{SEQ}}: {{TITLE}}
**Status:** pending

## Outcome

{{Concrete observable vertical outcome, named entrypoint, and resulting state delivered by this task.}}

## Scope

- **In scope:** {{Exact behavior owned by this task}}
- **Out of scope:** {{Explicit exclusions or delegated behavior}}

## Anchors and Ownership

| ID | Type | Target | Role | Access | Action |
|---|---|---|---|---|---|
| A-R{{REQ_NUMBER}}-{{SEQ}}-01 | file | `{{exact/path/to/file}}` | owner | write | modify |
| A-R{{REQ_NUMBER}}-{{SEQ}}-02 | command | `{{exact project command}}` | verifier | read | read |

## Changes

<!-- Every checkbox maps exact RN.M IDs; the set must equal Acceptance below. -->
- [ ] {{Implement behavior at the exact owned boundary.}} _Requirements: {{REQ_NUMBER}}.{{X}}_
- [ ] {{Handle the concrete negative or recovery path.}} _Requirements: {{REQ_NUMBER}}.{{Y}}_

## Acceptance

<!-- Declare each mapped RN.M once with a measurable output/state and negative behavior. -->
- **R{{REQ_NUMBER}}.{{X}}:** {{Measurable observable outcome}}
- **R{{REQ_NUMBER}}.{{Y}}:** {{Concrete negative or recovery outcome}}

## Dependencies

- {{DEPENDENCIES}}

## Verification Plan

- **Verification ref:** {{V reference whose structured subject/proof owner matches this task}}
- **Task role:** {{subject | verifier}}
- **Command:** `{{Exact project command}}`
- **Expected:** {{Exit, output, state, artifact, or UI result}}
- **Negative path:** {{Contract-preserving failure check}}
- **Reachability:** `{{Real entrypoint/caller or generated artifact}}`

<!-- The table above is the only task anchor/ownership table. Access read requires Action read. Access write requires create, modify, or delete. Targets are exact; globs and parent-directory claims are invalid. A verifier must not repeat the subject's Acceptance criterion. -->
