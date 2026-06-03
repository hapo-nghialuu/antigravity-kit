---
name: hapo:docs
description: "Create, update, summarize, or reconstruct project/system documentation from source code. Use reconstruct mode for as-is documentation of existing or legacy systems with evidence and uncertainty tracking."
user-invocable: true
when_to_use: "Invoke to create, update, or reconstruct project documentation from source."
category: document-skills
keywords: [docs, reconstruct, documentation, evidence]
argument-hint: "[--init|--update|--summarize|--reconstruct] [scope]"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Docs

Project documentation workflow for CafeKit.

`hapo:docs` covers two related but distinct jobs:

1. **Normal project docs** — create, update, or summarize living project documentation.
2. **As-is reconstruction** — rebuild current-state system documentation from source code, especially for existing or legacy systems with missing documents.

## Command Forms

```text
/hapo:docs
/hapo:docs --init
/hapo:docs --update
/hapo:docs --summarize
/hapo:docs --reconstruct <scope>
```

Mode flags are exclusive. When one is present, use it as the selected mode before interpreting any natural-language scope or instructions.

## Default Behavior

Parse the user intent before selecting a mode.

| Intent signal | Mode |
|---|---|
| Existing system, legacy system, source-to-docs, as-is, reverse documentation, or requirement reconstruction | `reconstruct` |
| Missing docs, initialize docs, bootstrap docs | `init` |
| Existing docs need refresh after code changes | `update` |
| Short overview, quick codebase summary, summarize docs | `summarize` |

When `/hapo:docs` has no clear mode:

1. Read the docs root from `.claude/runtime.json`.
2. If the docs root is missing, choose `init`.
3. If the docs root exists and user did not request only a summary, choose `update`.
4. Ask one concise clarification only when choosing between normal docs and as-is reconstruction would change the output materially.

Do not show a menu when prompt intent is already clear.

## Output Roots

Read `.claude/runtime.json` first. Use:

```json
{
  "paths": {
    "docs": "docs"
  }
}
```

Default docs root: `docs/`.

Normal docs live directly under the docs root:

```text
docs/
├── project-overview-pdr.md
├── codebase-summary.md
├── system-architecture.md
├── code-standards.md
├── design-guidelines.md
├── deployment-guide.md
└── project-roadmap.md
```

Reconstructed as-is docs live under:

```text
docs/as-is/<scope-slug>/
├── overview.html
├── reconstruction.json
├── system-overview.md
├── requirements-as-is.md
├── roles-and-permissions.md
├── entities-and-statuses.md
├── business-rules.md
├── integrations.md
├── architecture-c4.md
├── constraints-risks-and-decisions.md
├── glossary.md
├── evidence-map.md
└── unknowns-and-assumptions.md
```

## Mode Flags

### `--init`

Create the standard project docs set from the current source code.

Use when:
- the repository has code but no useful docs
- the user asks to create project docs
- SessionStart docs-sync reports missing documentation

Load:
- `references/standard-docs-workflow.md`
- `references/init-workflow.md`

### `--update`

Refresh existing docs after code changes.

Use when:
- docs exist and source code changed
- the user asks to update or refresh docs
- docs-sync reports stale docs

Load:
- `references/standard-docs-workflow.md`
- `references/update-workflow.md`

### `--summarize`

Create or update only `codebase-summary.md`.

Use when:
- the user asks for a quick project summary
- downstream work needs orientation but not full docs

Load:
- `references/standard-docs-workflow.md`
- `references/summarize-workflow.md`

### `--reconstruct`

Rebuild current-state, as-is system documentation from source code.

Use when the user asks for:
- legacy system documentation
- source-code-to-documentation
- current system requirements
- as-is requirements
- requirement reconstruction
- reverse documentation
- Japanese-style legacy system modernization discovery

Load:
- `references/reconstruct-workflow.md`
- `templates/reconstruction.json`
- `templates/requirements-as-is.md`
- `templates/evidence-map.md`
- `templates/unknowns-and-assumptions.md`
- `templates/reconstruct-overview.html`

## Reconstruction Is Not Specs

`hapo:docs --reconstruct` MUST NOT:

- design future behavior
- add new requirements
- create implementation tasks
- create `specs/<feature>/`
- run `/hapo:develop`
- claim full business intent from code alone

Correct handoff:

```text
/hapo:docs --reconstruct <scope>
-> human review of as-is docs
-> /hapo:specs <modernization or change request>
-> /hapo:develop <feature>
```

## Reconstruction Evidence Rules

Every major finding in reconstructed docs MUST be classified:

```text
Type: Observed | Inferred | Unknown
Confidence: High | Medium | Low
Evidence: file path, symbol, route, schema, test, or config
```

Definitions:

- `Observed`: directly visible in source code, tests, schemas, route definitions, config, or docs.
- `Inferred`: likely behavior derived from multiple signals, but not directly proven.
- `Unknown`: cannot be established from available evidence.

Do not hide uncertainty. Preserving unknowns is part of the output.

## Scope Discipline

Start with the narrowest useful scope.

For broad inputs such as `.`, `/`, `whole repo`, or `entire system`:

1. Run a lightweight structure scout first.
2. Split the project into modules or bounded contexts.
3. Ask the user to pick a module if the first pass cannot safely choose one.

Prefer:

```text
/hapo:docs --reconstruct apps/admin
/hapo:docs --reconstruct modules/expense-approval
/hapo:docs --reconstruct src/features/order
```

Avoid reconstructing a large monolith in one pass unless the user explicitly accepts lower precision.

## Agent And Tool Fit

Normal docs workflows reuse the CafeKit docs stack already shipped in the package:

- use `hapo:inspect` or targeted reads to scout source scope
- use `docs-keeper` for evidence-backed docs writing when delegation is available
- use `.claude/scripts/validate-docs.cjs <docs-root>` after create/update work
- use `.claude/scripts/validate-docs-reconstruct.cjs <docs-root>/as-is/<scope-slug>` before a reconstructed bundle is handed to human review

The upstream Research docs workflow names a `docs-manager` agent. CafeKit ships `docs-keeper` instead; keep the same scouting, size-check, and validation discipline while using the packaged agent contract.

`reconstruct` may use the same scout patterns, but it writes a scoped as-is bundle and must keep uncertainty visible.

## Best-Practice Basis

Use these documentation principles:

- **Docs as Code**: docs live in the repo and are reviewed like code.
- **C4 Model**: use system context/container/component views when architecture is relevant.
- **arc42**: capture context, building blocks, runtime behavior, deployment, risks, and decisions when useful.
- **Diataxis**: separate explanation, reference, and how-to content instead of dumping one long file.
- **ADR discipline**: if code reveals important architectural decisions, record them as recovered decision notes, not guesses.

## Required Final Report

For any `hapo:docs` run, report:

- files created or updated
- scope analyzed
- evidence quality
- unresolved questions
- recommended next command, if any

For `reconstruct`, the recommended next command is usually:

```text
/hapo:specs <change request based on approved as-is docs>
```

## References

- `references/standard-docs-workflow.md`
- `references/init-workflow.md`
- `references/update-workflow.md`
- `references/summarize-workflow.md`
- `references/reconstruct-workflow.md`
- `templates/reconstruction.json`
- `templates/requirements-as-is.md`
- `templates/evidence-map.md`
- `templates/unknowns-and-assumptions.md`
- `templates/reconstruct-overview.html`
