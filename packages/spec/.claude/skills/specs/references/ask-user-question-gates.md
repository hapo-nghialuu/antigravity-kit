# AskUserQuestion Gate Matrix

Use this matrix to decide when `hapo:specs` must pause for user input. Ask only when the answer changes scope, architecture, requirements, task shape, validation disposition, or implementation safety.

## Source Priority

Resolve uncertainty in this order:

1. Existing `spec.json`, `requirements.md`, `research.md`, `design.md`, and task files.
2. Codebase evidence from targeted scout/inspect.
3. Official/current external docs when platform/provider behavior matters.
4. Reasonable default from CafeKit rules.
5. `AskUserQuestion` only when the remaining decision is user-owned.

Do not ask about facts that codebase or official docs can answer.

## Gate Matrix

| Gate | Trigger | Ask? | Question shape | Record in |
|---|---|---:|---|---|
| Operation | `/hapo:specs` called without args | Yes | Choose create/status/resume/validate/archive | none |
| Active spec | In-progress or branch-matched spec exists | Yes | Continue existing vs create new | `spec.json` if changed |
| Pre-spec clarity | Description lacks concrete output, actor, or acceptance signal | Yes | 1-2 clarifying questions | `spec.json.scope_lock` |
| Brainstorm routing | 2+ plausible architectures and no approved direction | Yes | Route to brainstorm vs continue minimal spec | final response / `research.md` |
| Scope inquiry | Non-trivial task after 5D assessment | Yes | Expand / Hold / Reduce | `spec.json.scope_lock` |
| Evidence gap | Required evidence is unavailable after targeted research | Yes | Continue with explicit risk / run more scout / narrow scope | `research.md` |
| Architecture tie | Two approaches are materially similar after evidence | Yes | Pick approach with recommended option first | `design.md` |
| Contract change | Auth, persistence, provider, API, CLI, schema, permissions, or runtime contract changes | Yes if user intent not explicit | Confirm contract and rollback expectations | `design.md` canonical contracts |
| Scope expansion | A task candidate adds work not in `scope_lock` | Yes | Approve expansion / defer / reject | `spec.json.scope_lock` + affected docs |
| High-risk spike | Risk = Complex and spike may change deliverables | Yes if cost/scope impact > 4h | Spike now / reduce / defer | `research.md` + task file |
| Task conflict | Parallel candidate shares files/contracts with another task | No by default | Resolve sequentially unless business deadline requires parallelization | task dependencies |
| Validation findings | Red-team/validate findings modify approved scope/design/tasks | Yes | Apply accepted / review each / reject all | `reports/red-team-report.md` or validation log |
| Final contradiction | Whole-spec sweep finds unresolved contradiction | Yes | Choose authoritative source/decision | affected docs + `spec.json` |

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

## Recording Rules

After a user answer:

- Update the artifact that drives implementation, not only a report.
- Keep exact selected option and custom free text when provided.
- Add unresolved questions at the end of the affected document.
- Do not mark `ready_for_implementation = true` while a blocking question remains unresolved.
