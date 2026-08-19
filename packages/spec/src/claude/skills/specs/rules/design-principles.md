# Adaptive design principles

The design exists to remove implementation guesses. It defines behavior-owning
boundaries and stable contracts without prescribing incidental code.

## Detail by planning depth

### Compact

Keep only:

1. boundary and responsibilities;
2. typed source anchors;
3. decisions, named contracts, and invariants needed for consistency; and
4. verification, including relevant negative paths.

Delete every unused heading. Compact is a complete durable design, not a teaser
for a later Full document.

### Full

Start from Compact. Add only relevant sections for:

- cross-boundary contracts and flows;
- data ownership, schema, consistency, and concurrency;
- error classification and recovery;
- security/privacy boundaries;
- migration, compatibility, rollback, or deployment transition; and
- proof that spans owners or runtime surfaces.

Do not add a section because the template contains it. Empty tables, generic
best practices, and restated requirements form a template cemetery and must be
deleted.

## Boundaries and typed anchors

A boundary names what owns, reads, writes, calls, registers, or exposes the
behavior. “Service”, “module”, or “layer” without a grounded target is invalid.

Design and task anchors use the same closed six-column machine model:
`ID | Type | Target | Role | Access | Action`. Every implementation-facing
anchor has:

| Field | Rule |
|---|---|
| ID | Unique across the entire spec. Design-owned anchors use `A-D-NN`; task-owned anchors use `A-R{requirement}-{sequence}-NN`. |
| Type | `file`, `symbol`, `command`, `route`, `schema`, `contract`, `artifact`, or `external`. |
| Target | Exact path, identifier, command, route, schema object, contract ID, artifact path, or primary source. |
| Role | Why the target matters: owner, consumer, entrypoint, proof, constraint, or reference. |
| Access | `read` or `write`. |
| Action | `read` for read access; `create`, `modify`, or `delete` for write access. |

Files-first is canonical. List `file` anchors before symbols, routes, schemas,
or contracts they contain. A symbol anchor names its file. A command anchor is
an exact project command. An external anchor states which decision it grounds.
Role is descriptive only and never implies Action; words such as create,
planned, new, producer, or output in prose have zero machine authority. Never
reuse an anchor ID, even in another task. A task that consumes a canonical
design anchor references its `A-D-NN` ID and does not redefine the same target in
its task-scoped namespace.

## Named contracts and invariants

- Give every implementation-significant contract and invariant a stable ID,
  such as `C1` or `I1`.
- Define the canonical body once in `design.md`.
- Task files reference IDs; they do not copy contract bodies.
- Name one implementation owner before any cross-task consumer. Consumers
  depend directly or transitively on the owner.
- If implementation needs a different contract, revise and explicitly approve
  the design before changing consumers.

Contracts are required when drift could change auth/session, transport, API or
event shape, persistence/schema, deletion/retention, generated artifacts,
runtime entrypoints, or recovery behavior. Do not invent contract ceremony for
local details that cannot drift across a boundary.

For any public, replay, or operator surface contract, specify method, route,
auth, required headers, request schema, success response, error semantics, and
idempotency/concurrency behavior in one place; a partial contract is not a
contract.

## Decision quality

Record a decision only when another reasonable implementation would behave
differently. For each decision state:

- chosen behavior and boundary;
- relevant alternative or ambiguity rejected;
- invariant or negative path that constrains implementation; and
- anchor or evidence that makes it feasible.

Use explicit types for public inputs, outputs, states, and errors. Avoid generic
`any`, `object`, or unbounded maps unless the contract explains why they are
intentional.

## Conditional detail

- Flow: include only for branching, asynchronous, or multi-party behavior.
- Data: include only when shape, ownership, consistency, or lifecycle changes. Any retention/lifecycle policy must state clock anchor, clock source, timezone/precision, cutoff comparator/inclusivity, enforcement boundary, and a wrong-clock/boundary counterexample; domain-generic.
- Error/recovery: include concrete triggers, responses, retry/rollback, and
  terminal states only when relevant.
- Security/privacy: include trust boundary, authorization, sensitive data, and
  retention decisions only when touched.
- Migration: include compatibility window, ordering, rollback trigger, and
  verification only when existing state or public contracts change.
- Diagrams: use plain Mermaid only when the relationship is materially clearer
  than prose; do not duplicate the diagram in text.

## Traceability and verification

Every acceptance criterion has exactly one implementation owner and maps to a
boundary, contract/invariant, or explicit verification definition. Keep exactly
one visible `## Verification Definitions`
section. The validator's canonical grammar is a single line per definition:

```markdown
- **V1**: Criteria R1.1; Owner A-D-01; Decision refs D1, I1, C1; Method command `npm test`; Expected exit 0 and the persisted state; Negative/failure invalid input returns the named error; Reachability/grounding entrypoint `src/entry.js` via A-D-01.
```

Do not use a V table, `### V1` heading, or prose-only “see verification” alias;
the semantic-review parser recognizes the bold V-ID line above. Each line names
every exact `RN.M` it covers, all applicable `D`/`I`/`C` refs, a command or anchored
inspection, observable expected result, concrete negative/failure case, and
runtime reachability plus grounding expectation.

For a typed proof boundary, extend the same line after Owner with `Proof criteria
R1.2; Proof owner A-D-02; Evidence anchor A-D-02;`. Both criteria remain
single-owner; without that boundary, omit the extension.

Validator success proves structure only. The author and reviewer still test the
design against concrete counterexamples and check that an implementer can act
without choosing unspecified product behavior.

For task-bearing specs, typed `spec.json.coordination.boundaries` are the only
authority for ownership, dependencies, transitions, proof separation, and
parallel eligibility. Design prose explains semantics but cannot replace those
typed edges.
