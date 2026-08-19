---
name: hapo:specs
description: "Turn a substantial feature idea into a bounded, reviewed plan and executable flat task files, with human decisions at scope, findings, and completion. Use when the work needs durable coordination; skip for a clear one-file or two-file change."
user-invocable: true
argument-hint: "<feature-description>"
metadata:
  author: haposoft
  version: "3.0.0"
---
# Specs — process-first planning

Quality comes from a short decision process; honesty comes from evidence. Keep
the human at exactly three gates and let the agent do the work between them.
The durable output is Markdown that can be read and edited without a compiler.

## Step 0 — decide whether a plan earns its cost

Work directly when the cause and change are clear, isolated, reversible, and
likely limited to one or two files. Use this skill when the request crosses
components, contains a product or architecture choice, has meaningful failure
risk, or needs several tasks, sessions, or owners.

Do not create a plan merely because this skill was mentioned in surrounding
documentation. The user must invoke Specs or ask for durable planning.

## The three human gates

| Gate | Timing | Human decision |
|---|---|---|
| C1 — Scope | before writing the plan | EXPAND, KEEP, or CUT the proposed minimum change |
| C2 — Findings | after adversarial review | accept, reject, or revise each deduplicated finding |
| C3 — Done | after execution | accept completion from current command output and receipts |

Ask once at each gate. Do not ask for routine implementation choices between
the gates. If new evidence invalidates the scope, return to C1 instead of
silently expanding it.

## Primary output layout

Create one direct child of the repository's `specs/` directory:

```text
specs/<feature>/
├── plan.md
├── task-01-<slug>.md
└── task-02-<slug>.md
```

Task files are flat beside `plan.md`. Do not create a nested task directory.
Use safe lowercase feature and task slugs. Read
[`references/templates.md`](references/templates.md) before authoring these
files.

## Flow

### 1. Challenge scope, then open C1

Inspect the repository before drafting. Answer three questions with current
`path:line` evidence:

1. What already exists and can be reused?
2. What is the smallest change set that delivers the requested outcome?
3. What signals expansion: more than eight touched files, more than two new
   services/classes, or more than three independent work groups?

Present the answers and ask the user to EXPAND, KEEP, or CUT. Record the chosen
scope and explicit exclusions in `plan.md`.

### 2. Write the plan and task packets

Keep `plan.md` as the short index: C1 decision, EARS acceptance criteria,
explicit exclusions, and a task table. Every acceptance criterion receives a
stable ID, and every task row lists the criteria it satisfies.

Make each task small enough for one owner to hold in one reading: one outcome,
normally no more than about five owned files, explicit dependencies, measurable
acceptance, and a runnable verification command. A task must deliver usable
behavior; do not create preparation-only tasks.

When an outcome is uncertain, write a question rather than guessing. When a
rule remains ambiguous, add two or three concrete examples and resolve the rule
at C1 or C2.

### 3. Review adversarially, then open C2

Read [`references/review.md`](references/review.md) and run its fresh-context
review. Every finding needs a reproducible `path:line` citation and a concrete
failure scenario. Deduplicate, rank, and cap the list at 15.

Ask the user to accept, reject, or revise each finding. Apply only accepted
decisions. After every plan edit, run the consistency sweep across all plan and
task files. Stop after two paper-review rounds; later findings require runtime
evidence.

### 4. Execute one task at a time

An implementation workflow owns execution. It selects one unblocked task,
changes its single `Status:` field to `in_progress`, respects owned paths, runs
the task's verification, and appends a real inline `## Receipt` only after the
command finishes.

Parallel work is allowed only for tasks with disjoint write ownership and
satisfied dependencies. One file has one writer in a wave. The controller is
the sole writer of task status and receipts.

### 5. Prove completion, then open C3

A task may say `Status: done` only when its inline receipt contains the exact
command, `Exit: 0`, `Verification: PASS`, runtime-bound Base and Head values,
and a non-empty fenced command-output block. Placeholder or remembered output
is not evidence.

Show the user the current evidence and unresolved limitations. The user decides
at C3 whether the feature is done. A passing command proves only what it ran;
it does not invent product approval, review independence, or runtime coverage.

## Ten operating laws

1. **A1 — Scope once.** Raise scope pressure at C1; reopen only with new proof.
2. **A2 — Small packets.** One task, one outcome, one owner, one proof command.
3. **A3 — One fact, one home.** Reference decisions; never copy mutable lists.
4. **A4 — Files are state.** `plan.md` and flat task files are canonical and
   hand-editable; indexes are disposable views.
5. **B1 — Cite the repository.** Codebase claims carry current `path:line`
   evidence or an explicit `[UNVERIFIED]` marker.
6. **B2 — Review from fresh context.** The author does not impersonate the
   independent adversarial reviewer.
7. **B3 — Sweep after edits.** Search renamed concepts, rejected assumptions,
   ownership, dependencies, criteria IDs, and copied prose across every file.
8. **B4 — Stop paper churn.** Two pre-code review rounds maximum; later claims
   need runtime evidence.
9. **C1 — Done is derived.** Status follows fresh proof, never confidence.
10. **C2 — Rules pay rent.** Add a rule or machine check only when it prevents a
    cited real incident; reassess rules when the primary model changes.

## Machine boundary

The shared workflow resolver recognizes only a regular `plan.md` plus one or
more regular flat `task-*.md` files inside one direct feature directory. The
Stop gate revalidates every done task's inline Receipt and provenance. The old
task-scaffold guard remains limited to the older nested layout; flat v3 tasks
do not invoke that kernel path.

These checks are a final safety net, not a substitute for C1-C3 judgment. Do
not add a new schema, approval field, readiness bit, or review state to make the
Markdown look more authoritative.

## Legacy compatibility

Existing features that contain `spec.json`, nested task files, or separate
receipt files stay on the installed legacy adapters. Do not migrate or rewrite
them while authoring an unrelated v3 feature. New Specs output always uses the
flat layout above and never requires the legacy kernel.

## Maintenance

Keep this entrypoint focused on routing and invariants. Put templates and
examples in `references/templates.md`; put review mechanics in
`references/review.md`. Before adding guidance, identify the observed failure
it prevents and remove duplicated wording elsewhere.
