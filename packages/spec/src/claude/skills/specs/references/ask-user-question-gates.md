# AskUserQuestion Gate Matrix

Use this matrix to classify authority before pausing for user input. A workflow
event, uncertainty, or architecture choice does not by itself justify a question.

## Source Priority

Resolve uncertainty in this order:

1. Existing `spec.json`, `requirements.md`, `research.md`, `design.md`, and task files.
2. Codebase evidence from targeted scout/inspect.
3. Official/current external docs when platform/provider behavior matters.
4. Reasonable default from CafeKit rules.
5. `AskUserQuestion` only when the remaining decision is user-owned.

Classify first:

- `repository_fact`: investigate and ground it from repository or required
  current evidence. Do not ask the user to supply a discoverable fact.
- `reversible_assumption`: choose the simplest engineering option and record its
  bounded reversal boundary. Do not ask unless the user explicitly requested
  control of that choice.
- `user_owned`: HOLD and ASK for a product, scope, security, data, or
  irreversible decision. Never infer or self-approve it.

Store only actual items in optional `spec.json.decisions`; omit it when absent.
Every unresolved `user_owned` entry blocks readiness; facts and reversible
assumptions do not become user questions merely because they are unresolved.

## Gate Matrix

| Class | Example trigger | Action | Record in |
|---|---|---|---|
| Repository fact | Existing behavior, path, dependency, API shape, or current constraint | Investigate and ground; if evidence remains unavailable, report the exact grounding blocker without asking the user to guess | design/research anchor |
| Reversible assumption | Two technically valid internal approaches with bounded rollback | Select the simplest compatible option and record the reversal trigger/boundary | `spec.json.decisions` when material, otherwise design |
| User-owned decision | Product behavior, scope expansion/reduction, security posture, data handling, or irreversible migration | HOLD and ASK; keep the exact decision unresolved until the user answers | `spec.json.decisions` and affected artifact |
| Active-target ambiguity | Multiple plausible feature/spec targets | HOLD and ASK because target selection changes scope | `scope_lock` |
| Validation finding | A factual defect or reversible repair | Ground and repair without approval; ASK only if resolution changes a user-owned decision | affected canonical artifact |
| Task conflict | Shared files/contracts between parallel candidates | Serialize or merge using the simplest reversible topology | task boundaries |

## Question Format

Every `AskUserQuestion` must:

- Ask 1-3 questions max per pause.
- Provide 2-3 concrete options.
- Put recommended option first and suffix label with `(Recommended)`.
- Explain the tradeoff in one sentence per option.
- Include an implicit free-form "Other" option when the tool supports it.

## Do Not Ask

Do not ask when:

- The answer is discoverable via repo files, tests, docs, or official/current docs.
- The choice is pure implementation detail with no scope/user impact.
- The task can safely use an existing codebase convention.
- The question exists only to avoid making a normal engineering judgment.
- Evidence is missing for a `repository_fact`; report the grounding blocker
  instead of asking the user to guess.

## Recording Rules

After a user answer:

- Update the artifact that drives implementation, not only a report.
- Keep exact selected option and custom free text when provided.
- Add unresolved questions at the end of the affected document.
- HOLD while any `user_owned` decision is unresolved. Do not mark
  `ready_for_implementation = true` until the user resolves it.
