# Task and phase decision matrix

Tasks and phases are conditional structure, not mandatory planning ceremony.

## Task gate

Create a task only when at least one boundary is real:

| Boundary | Create a separate task when |
|---|---|
| Ownership | A distinct owner can change the files or contract without overlap. |
| Dependency | One durable output must exist before another consumer can begin. |
| Transition | Stateful, migration, async, retry, or recovery behavior needs one named owner. |
| Proof | The outcome needs proof that cannot coherently live with the implementation slice. |
| Parallel coordination | Independent work can proceed with disjoint ownership and no hidden shared resource. |

Do not create tasks from estimated effort, requirement count, architectural
layers, risk labels, or a desire for uniform files.

When the gate passes, encode the real reason as one or more typed
`coordination.boundaries` entries. Legacy trigger fields, priority markers,
related-file lists, and free-form declarations are not authority.

## Split preference

Start with one vertical outcome slice that reaches a real user or runtime
entrypoint. Split horizontally only because dependency, ownership, or proof
requires it.

- Foundation: only when two or more consumers need the same owned prerequisite.
- Spike: only for a named uncertainty with a time-box and go/no-go output.
- Integration: only when earlier outputs are not already proven reachable.
- Verification: only when separate ownership or evidence is genuinely required.
- Release/packaging: only when explicitly in `scope_lock`.

Merge slices that touch the same files, share one proof, or would otherwise
produce an orphaned intermediate output.

## Owner-before-consumer

Every cross-task contract, invariant, schema transition, or recovery authority
has exactly one owner task. All consumers reference its stable ID and depend
directly or transitively on the owner. The typed dependency boundary is machine
authority; Markdown and `task_registry.dependencies` are projections that must
agree with it.

## Lightweight phases

Use phases only for a complex `Full` task graph where grouping materially helps
navigation or sequencing. Persist them as lightweight task-ID groups in
`spec.json`.

- Never create `phase-*.md` files.
- Never copy requirement, design, or task prose into a phase.
- A phase does not replace dependency edges or ownership.
- Compact specs and simple Full graphs omit phases.
