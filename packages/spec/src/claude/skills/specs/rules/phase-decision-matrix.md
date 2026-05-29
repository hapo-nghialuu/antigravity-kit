# Phase Decision Matrix

CafeKit does not create `phase-XX.md` files. In `hapo:specs`, "phase" means an implementation slice or task cluster that becomes one or more `tasks/task-R*.md` files.

Use this matrix after `requirements.md` and `design.md` exist, before generating task files.

## Slice Types

| Slice | Use when | Output pattern | Must prove |
|---|---|---|---|
| R0 Foundation | Shared setup, contracts, schema, config, base runtime, permissions, package wiring | `task-R0-01-<slug>.md` | Later tasks depend on it or explicitly consume it |
| Risk Spike | Risk = Complex, API/platform behavior uncertain, or feasibility not proven by evidence | `task-R{N}-00-spike-<slug>.md` | Go/no-go, findings, time-box <= 4h |
| Vertical Slice | User-visible behavior crosses multiple layers but can be delivered end-to-end | `task-R{N}-01-<feature-slice>.md` | Runtime entrypoint reaches the behavior |
| Layer Slice | Work naturally splits by layer and dependencies are clear | `task-R{N}-01-api.md`, `task-R{N}-02-ui.md` | Contract handoff between layers |
| Cross-Cutting Slice | One concern affects many requirements, e.g. language handling, privacy, error policy | One primary task plus secondary requirement refs in related tasks | No duplicated implementation across tasks |
| Integration Gate | Prior outputs must be wired into a route, app, command, worker, extension manifest, or runtime surface | Final task in dependency chain | No orphaned services/components/files |
| Verification Gate | Security/performance/migration/critical path needs dedicated proof | Dedicated task only when proof cannot live inside related task | Exact command/artifact/negative-path evidence |
| Release/Packaging | Store/package/release behavior is explicitly in scope | Last task | Build artifact and release-specific checks |

## Selection Rules

1. Start with requirement IDs and design contracts.
2. Extract shared infrastructure into R0 only when 2+ later tasks consume it or a contract must exist first.
3. Prefer vertical slices for user-facing workflows because they prove reachability early.
4. Use layer slices when one layer blocks another or file ownership would conflict.
5. Add a spike before implementation when evidence says the outcome is uncertain.
6. Add an integration gate for every feature with runtime-facing outputs.
7. Add a verification gate only when the required proof is too broad for a single implementation task.
8. Do not create a slice just because the plan "feels large"; every slice needs a deliverable boundary.

## Split / Merge Signals

Split into separate task files when:

- Acceptance criteria span multiple architectural layers.
- Effort exceeds 4 hours.
- A task would modify unrelated files or contracts.
- One part can be verified independently before the next part starts.
- Different agents could own the work without touching the same files.

Merge when:

- Work touches the same files and cannot be verified separately.
- A task would only wrap another task with no independent deliverable.
- Splitting would create orphaned support code before integration.

## Output Requirements

Before writing task files, capture the chosen slices in working notes and ensure:

- Every slice maps to at least one requirement ID or R0 foundation rationale.
- Every runtime-facing slice names its entrypoint or later integration task.
- Every dependency is explicit.
- Every parallel-capable slice has no shared file ownership with sibling tasks.
- Scope additions route through `references/ask-user-question-gates.md`.
