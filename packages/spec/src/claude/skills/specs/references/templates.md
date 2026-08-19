# Process-first plan, task, and receipt templates

Use these as compact starting points. Remove unused examples and placeholders
before C2. The primary layout is always flat:

```text
specs/<feature>/
├── plan.md
├── task-01-<slug>.md
└── task-NN-<slug>.md
```

## `plan.md` template

Keep the plan short enough to scan as one index, normally under 100 lines.

```markdown
# <Feature name>

## Scope decision (C1 — YYYY-MM-DD)
- Existing: <reusable code with path:line>
- Minimum change: <required behavior>
- Expansion signals: <none or evidence>
- User decision: EXPAND | KEEP | CUT — <reason>

## Out of scope
- <deliberate exclusion>

## Acceptance criteria
| ID | EARS criterion | Proof |
|---|---|---|
| AC-01 | When <trigger>, the system shall <response>. | `<command>` |

## Tasks
| # | Task | Criteria | Primary ownership | Dependencies | Status |
|---|---|---|---|---|---|
| 01 | <one outcome> | AC-01 | `src/example.ts` | - | pending |

## Review log
- Round 1: <findings accepted/rejected/revised>; sweep <result>.
```

Each acceptance ID must map to at least one task and one proof. A task with no
criterion is scope drift; a criterion with no task or proof is not executable.

## `task-NN-*.md` template

Keep one exact `Status:` field. The task file is one owner's packet.

````markdown
# Task NN — <one observable outcome>

Status: pending

## Outcome
<What becomes true when this task succeeds.>

## Scope
- In: <exact behavior>
- Out: <nearby behavior deliberately excluded>

## Ownership
- Modify: `src/a.ts`
- Create: `test/a.test.ts`
- Read: `src/caller.ts`

## Acceptance
- AC-01: <task-local measurable condition>

## Dependencies
- <task number or `none`>

## Verification Plan
- Command: `<exact runnable command>`
- Expected: <observable success, including nonzero/negative behavior if relevant>
- Reachability: <entrypoint or consumer>
- Artifacts: <path and digest requirement, or none>

## Receipt
<!-- Fill only after execution; see canonical form below. -->
````

## Canonical inline Receipt

The completed task keeps this section at the end of the same file. Derive Base
and Head from the current runtime; do not invent or reuse them.

````markdown
## Receipt

Verification: PASS
Command: pnpm test -- --filter example
Exit: 0
Base: <runtime-derived base commit>
Head: <runtime-derived tree digest or commit>
```text
$ pnpm test -- --filter example
PASS example.test.ts
Tests: 3 passed, 3 total
```
````

The receipt is invalid when it has a placeholder, missing output fence, zero
executed tests where tests are required, a failure marker, nonzero exit, stale
Base/Head, or a bare PASS claim without the command output.

## EARS sentence patterns

Use the narrowest pattern that describes observable behavior:

1. **Ubiquitous:** `The <system> shall <response>.`
2. **Event-driven:** `When <trigger>, the <system> shall <response>.`
3. **State-driven:** `While <state>, the <system> shall <response>.`
4. **Unwanted behavior:** `If <fault>, the <system> shall <response>.`
5. **Optional feature:** `Where <feature is enabled>, the <system> shall <response>.`

Avoid implementation detail unless it is a user-approved contract. Replace
"fast", "robust", and "works" with a measurable threshold or observation.

## Example Mapping rule

When the expected outcome is uncertain, write a question and take it to C1 or
C2; do not guess. When a rule is ambiguous, add two or three examples:

```text
Rule: A done task has fresh executable proof.
Example: command exits 0 and reports 3 tests passed -> done may be proposed.
Example: command exits 0 but reports 0 tests -> remains unfinished.
Example: output is copied from an earlier session -> remains unfinished.
Question: which environment owns the authoritative integration run?
```

Keep examples only until they clarify a rule or acceptance criterion.

## Twelve edge-case dimensions

For each material boundary, select relevant dimensions rather than filling a
ceremonial matrix:

| Dimension | Probe |
|---|---|
| Input shape | empty, malformed, duplicate, maximum size |
| Identity | missing, wrong actor, cross-scope, replay |
| State | initial, partial, terminal, stale |
| Order | early, late, repeated, out of order |
| Concurrency | double writer, race, cancellation |
| Dependency | missing, blocked, version drift |
| Failure | timeout, exception, nonzero exit |
| Recovery | retry, resume, rollback, cleanup |
| Persistence | partial write, corruption, migration |
| Integration | caller, registration, packaging, reachability |
| Security/privacy | injection, traversal, secret exposure |
| Observability/proof | logs, artifact, negative path, provenance |

Turn a discovered risk into an EARS criterion, a task acceptance item, or a
verification probe. Do not duplicate it across all three.

## Quality and saturation checks

Before C2 confirm:

- every repository fact has current evidence or `[UNVERIFIED]`;
- every acceptance criterion maps to task and proof;
- task ownership does not overlap within a proposed parallel wave;
- dependencies are acyclic and refer to real task numbers;
- commands are runnable from the named work context;
- negative, recovery, and reachability probes exist where risk requires them;
- examples settle ambiguous rules rather than adding prose;
- the latest consistency sweep reports zero unresolved contradictions.

Stop expanding when a fresh reviewer finds no new material failure with new
evidence, the 12 dimensions yield no uncovered relevant boundary, and every
accepted C2 finding is represented exactly once.
