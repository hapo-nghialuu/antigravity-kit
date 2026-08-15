# Task generation rules

Load this file only after the task gate passes. Compact durable specs are
taskless by default, but may have a task bundle and matching registry when a real
ownership, dependency, durable transition, separate proof, or parallel
coordination boundary activates the same gate used by Full specs. Full depth
does not activate the gate by itself.

## Generation gate

A task must represent at least one real boundary: distinct ownership, a durable
dependency, a state transition, separate proof, or parallel coordination. If no
boundary exists, keep behavior in requirements/design and generate no task.

Persist the audited topology only in typed `spec.json.coordination.boundaries`:

- `ownership`: disjoint task write sets;
- `dependency`: producer, consumer, and exact deliverable;
- `transition`: owner/consumers plus pre/post/failure/recovery semantics;
- `proof`: subject, verifier, verification ref, and verifier-owned artifact anchor;
- `parallel`: independent tasks and exact resources.

A task bundle requires at least one complete boundary. Legacy trigger fields,
coordination flags, artifact flags, priority markers, and prose labels are
read compatibility inputs and forbidden in schema 2.1 authoring. Optional
phases may group task IDs but must reference a typed owner boundary.

Use `phase-decision-matrix.md` only when split/merge boundaries remain unclear.
Use the scoring rubric only as advisory input; scores, effort estimates, risk
labels, and requirement count never make a task mandatory.

## Default decomposition

Prefer a vertical outcome slice that implements behavior through its real
runtime entrypoint and proves the result. Split horizontally only when:

- one owner must produce a contract, schema, or transition before consumers;
- file or contract ownership must be disjoint;
- a proof surface has a different durable owner; or
- parallel work has no dependency or shared resource contention.

Do not create foundation, integration, spike, testing, or release tasks by
habit. A support output must be consumed by a named later task or identified as
internal to the same vertical slice.

## Task shape

Each task contains exactly the information an implementer needs:

1. **Outcome** — observable behavior delivered by the task.
2. **Scope** — exact in/out behavior boundary.
3. **Anchors and Ownership** — one six-column ownership projection.
4. **Changes** — behavior and code changes, including relevant negative paths.
5. **Acceptance** — measurable requirement IDs and task-local outcomes.
6. **Dependencies** — projection of typed dependency boundaries or `none`.
7. **Verification Plan** — command/inspection, expected result, negative path,
   runtime reachability, exact design `V` ID, and task role when applicable.

Do not add estimated effort, empty risk tables, receipt fields, Base/Head,
verdicts, provenance, agent chains, or generic completion ceremony.

`**Status:**` is the canonical files-first lifecycle projection for each task.
Its value must stay byte-for-byte equivalent in meaning to
`spec.json.task_registry[path].status`; use the same exact canonical token in
both places. Allowed values are `pending`, `in_progress`, `blocked`, and `done`.
Authoring initializes tasks as `pending`. A later lifecycle transition updates
the task Markdown and registry together. `done` proof remains owned by execution
closeout; do not add receipts, Evidence sections, Base/Head bindings, verdicts,
or provenance to the task plan.

## Typed anchors

The task's only ownership table is `ID | Type | Target | Role | Access |
Action`. IDs are unique across the spec. `Access` is `read` or `write`; read
requires `Action=read`, while write requires `create`, `modify`, or `delete`.
Targets are exact and grounded, never globs or parent-directory claims. Allowed
types are `file`, `symbol`, `command`, `route`, `schema`, `contract`, `artifact`,
and `external`.

- Files-first: list exact `file` anchors before anchors contained by those files.
- Task-owned anchors use `A-R{requirement}-{sequence}-NN`, populated from the
  canonical task ID; their counter is local to that namespace, not globally
  reused as an unnamespaced counter.
- When the task only consumes a target already anchored by design, reference the
  canonical `A-D-NN` anchor instead of creating another anchor for that target.
- `Modify`, `Delete`, and `Read` paths must exist when authored; `Create` paths
  need a grounded parent/boundary.
- A symbol target names or references its containing file.
- A command target is copied from real project tooling, not invented.
- A contract anchor references its stable design ID; never copy the contract
  body into the task.
- Duplicate IDs anywhere in design or tasks block readiness.

## Contracts, ownership, and dependencies

Each cross-task contract, invariant, schema transition, or recovery authority
has exactly one owner task. Every consumer:

- references the named contract/invariant ID;
- depends directly or transitively on the owner; and
- does not redefine the canonical body.

Each `RN.M` has exactly one implementation owner. A proof boundary means its
subject implements the product criterion and its verifier verifies the referenced
`V` definition through a separately owned proof criterion/artifact. The verifier
must not repeat the subject's criterion in `Acceptance`; sharing a proof boundary
does not create a second implementation owner. Their shared V definition names
both exact criteria so subject, verifier, and proof boundary resolve to one
verification contract.

Task Markdown and `spec.json.task_registry[path]` must keep both `status` and
`dependencies` synchronized. Derive task ID from
`tasks/task-R{N}-{SEQ}-<slug>.md`; use two-digit `SEQ`. Do not create shorthand
filenames.

Parallel eligibility exists only when a typed `parallel` boundary proves exact
disjoint resources, no dependency path, and no shared transition/proof
authority. Do not author a parallel-priority marker.

## Changes and acceptance

Describe product behavior and the code boundary together. Name exact validation,
state, route, schema, error, and integration behavior only when relevant. Keep
all work inside `scope_lock`; an expansion pauses for explicit user approval.

Map acceptance to numeric `N.M` IDs from `requirements.md`. Include negative or
error outcomes where invalid input, missing permission, failure, conflict,
timeout, retry, rollback, or recovery is relevant. Do not add vague acceptance
such as “works”, “safe”, or “performant”.

## Verification plan

Choose proportional proof for the changed surface:

- exact command-shaped invocation or justified `N/A`;
- expected exit, output, state, artifact, or UI result;
- contract-preserving negative-path check when relevant; and
- real entrypoint/caller for runtime-facing work, or the exact dependent task
  that will establish reachability.

Declare exactly `Verification ref: Vn` and `Task role: subject` or `Task role:
verifier`. The V definition lives once in `design.md` using the canonical
single-line bold-ID syntax. The task references it and does not copy its body.

Every executable implementation task must declare concrete test ownership: at
least one `file` or `artifact` anchor with `write` `create` or `modify` that is
the focused test, or share proof through a typed `proof` boundary whose
verifier owns the separate proof artifact. A generic `npm test` string alone
is not ownership; shared proof without a typed boundary is not ownership.

Access/action reachability is deterministic:

| Access | Allowed Action | Grounding meaning |
|---|---|---|
| `read` | `read` | Exact target already exists and is inspected/consumed. |
| `write` | `modify` or `delete` | Exact target already exists and is owned by this task. |
| `write` | `create` | Exact target is absent and its parent/boundary is grounded. |

Commands, symbols, contracts, routes, schemas, artifacts, and external targets
also receive their type-specific grounding check. Grounding is mandatory before
readiness; the deterministic validator/grounder recompute facts and never create
an extra receipt or claim semantic judgment.

Build success alone is not behavior proof. Static validation may check command
shape and anchors, but execution owns actual runtime proof.

`feature-receipt.md` is created only during execution closeout. Never create or
reference it as a spec-ready requirement.

Every physical task participates in at least one justified typed boundary.
Ownership and parallel resource maps are keyed exactly by their participants,
contain non-empty unique exact targets, and equal the task write anchors they
claim. An ownership boundary is truthful only when at least two physical tasks
have distinct, non-overlapping exact write anchors. A dependency boundary must match
the registry DAG and producer-write/consumer-read anchors. Proof, transition,
and parallel boundaries must satisfy their typed fields; labels never suffice.

## Task graph and phases

When a task bundle exists:

- cover every scoped acceptance criterion exactly where it is implemented or
  proven;
- keep owner-before-consumer ordering explicit;
- rebuild registry inventory from physical task files before readiness; and
- use optional phases only as compact task-ID groups in `spec.json` for a
  complex Full graph.

Never create phase files or repeat task prose in phase metadata.
