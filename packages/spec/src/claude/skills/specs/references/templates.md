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
Specs-Contract: process-first-ready-v1

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
| 01 | <one outcome> | AC-01 | `src/example.ts` | - | blocked |

## Review log
- Round 1: <findings accepted/rejected/revised>; sweep <result>.
```

Each acceptance ID must map to at least one task and one proof. A task with no
criterion is scope drift; a criterion with no task or proof is not executable.

## `task-NN-*.md` template

Keep one exact `Status:` field. The task file is one owner's packet.

````markdown
# Task NN — <one observable outcome>

Status: blocked

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
- <exact `task-NN-*.md` basename or `none`; one bullet per dependency>

## Verification Plan
- Command: `<exact runnable command>`
- Named probe: <existing concrete probe/test/hook ID; never only a suite label>
- Reachability: <real entrypoint/caller at each `source`/`installed`/`live` level; `UNKNOWN` if unexecuted>
- Oracle: <externally observable success or failure>
- Counterexample: <material alternative behavior that must make this proof fail>
- Artifacts: <required artifact path plus digest algorithm/comparison rule, or explicitly ephemeral with cleanup rule>

## Receipt
<!-- Fill only after execution; see canonical form below. -->
````

Trace `Command → Named probe → Reachability → Oracle`. Aggregate suites
name the owning concrete probe. Proof at `source`/`installed`/`live` stays
separate; one level never promotes another. Run mutation or destructive
negative controls only on disposable copies under a verified temporary root,
never tracked worktree or canonical source bytes.

## Status matrix

| Status condition | Persisted state |
|---|---|
| C1/C2 decision open | `blocked` |
| accepted finding open or `UNKNOWN` | `blocked` |
| every non-dependency blocker closed | `pending` |
| named task dependency not done | keep `pending`; queue gates it |
Use only direct-child task basenames or `none` under `## Dependencies`; keep `## Receipt` empty until execution produces canonical proof.

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

## No-invention and conditional boundary contracts

Before implementation handoff, apply the **no-invention gate**: if two implementations conform to the packet text yet can produce different externally observable output, state, error, security, or compatibility behavior, surface the missing choice as an explicit C1 or C2 question and block handoff.

A boundary is material when the task creates, changes, or depends on it and a different choice changes an external observation, security, durable data, compatibility, or proof reachability. Require only the matching material row; omit nonmaterial categories.
For every required row, name each listed choice exactly; labels such as “JSON”, “local path”, “locked”, or “timestamped” alone remain unresolved.

| Boundary | Required contract when material |
|---|---|
| API/CLI | entrypoint/route or command grammar; identity/auth; input/default/normalization; success output; error/status/exit; duplicate/retry/idempotency; compatibility |
| Schema | version; exact keys/nesting/types; required/optional; enum/format/bounds/cardinality; unknown-field behavior; compatibility/migration |
| State/concurrency | initial/terminal states; event + guard + effect + next + error; ordering; duplicate/retry; writer/lock acquire/contention/release; rollback/recovery |
| Filesystem/security | authoritative root; trusted/untrusted segment grammar; lexical + canonical containment and symlink policy; flags/mode; temp/rename/fsync; lock/stale reclaim; crash cleanup |
| Time/retention | clock source; unit/precision/timezone; endpoints and inclusion/comparator; anomaly behavior; expiry/purge/recovery |
| Integration/proof | caller; export/registration; packaging/config; native path/consumer; proof level (`source`/`installed`/`live`); observable failure oracle |

## Twelve edge-case dimensions

For each material boundary, select relevant dimensions rather than filling a
ceremonial matrix:

- Input shape, identity, state, order: malformed/duplicate/bounds, wrong actor,
  partial/stale state, replay/reordering.
- Concurrency, dependency, failure, recovery: races/cancellation, version drift,
  timeout/nonzero exit, retry/rollback/cleanup.
- Persistence, integration, security/privacy, observability/proof: partial
  writes, registration/reachability, traversal/secrets, artifacts/provenance.

`Crash` means abrupt unhandled termination before the claimed catch point; a catchable failure returns/raises an error or exits nonzero. Never use them interchangeably.

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
