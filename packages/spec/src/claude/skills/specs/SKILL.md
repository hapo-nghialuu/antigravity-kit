---
name: hapo:specs
description: "Author the smallest durable, grounded specification that removes product decisions from implementation."
user-invocable: true
when_to_use: "Use when a change needs durable requirements or design before implementation."
category: utilities
keywords: [specs, requirements, design, tasks]
argument-hint: "[<feature-description>] [--auto] | --status | --validate <feature> | --archive"
metadata:
  author: haposoft
  version: "2.1.0"
---
# Specs — semantic kernel v2.1

## Canonical authoring contract

`spec.json` is machine semantic authority. `requirements.md`, `design.md`,
conditional `research.md`, and conditional task Markdown are human projections.
Host state records authority/integrity only; it never supplies product semantics.
Markdown edits that affect semantics must be synchronized back into `spec.json`
and pass the same round-trip validation before readiness.
Promote `semantic_model`, semantic review, and readiness together only through
the explicit installed machine semantic-sync step, `spec-readiness.cjs`. Authors
and reviewers never directly write or promote those authority fields; any later
semantic Markdown edit invalidates the bound round-trip result.

```bash
# Claude Code
node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>
# Codex
node .codex/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>
```

`review.json` has exactly `reviewed_criteria` and `counterexamples`. The command
projects current Markdown, validates structure, grounding, round-trip, and
Strict authority, then writes atomically; failure preserves exact original bytes.

Persist `planning_depth`, `assurance_level`, `classified_minimum`, normalized
`risks`, and contract `version`. Planning and assurance are independent:

| Axis | Values | Decides |
|---|---|---|
| `planning_depth` | `None`, `Compact`, `Full` | Durable artifact/detail topology. |
| `assurance_level` | `Routine`, `Elevated`, `Strict` | Review and verification depth. |

`Direct`, `Standard`, and `Critical` are derived compatibility views. Risk may
raise assurance without creating artifacts; decomposition may raise planning
depth without inventing risk. Reclassify before persistence. A persisted
same-feature baseline is monotonic and never contaminates another feature.

Any non-empty normalized risk raises the automatic assurance floor from Routine
to Elevated. Strict is opt-in: select it only when the user or project policy
explicitly requires independent audit, or after the user confirms a concrete,
scope-specific audit need. A keyword, risk severity, Full depth, or model
preference never selects Strict by itself.

Canonical lifecycle is exactly `in_progress`, `paused`, `blocked`, `done`.
Legacy aliases are read compatibility only. `ready_for_implementation` means
technical authoring readiness; it is not lifecycle completion, implementation
permission, execution proof, or closeout. `done` belongs to final-state
authority after execution closeout.

## Artifact router

Decide this table before loading discovery rules or creating files:

| Depth | Durable core | Research route | Task route | Design expansion |
|---|---|---|---|---|
| `None` | none | absent | absent | none |
| `Compact` | `spec.json`, `requirements.md`, `design.md` | only on a research trigger | only on a typed topology trigger | bounded core sections |
| `Full` | `spec.json`, `requirements.md`, `design.md` | only on a research trigger | only on a typed topology trigger | only sections activated by scoped behavior |

Research triggers are: unresolved material uncertainty that can change
requirements/design; an external-current fact that must be grounded; or an
explicit user request. Otherwise `authoring.research=absent`, omit the pointer,
and create no file or placeholder. Repository scouting may inform requirements
or design without producing `research.md`.

Task triggers are typed ownership, dependency, transition, proof, or parallel
boundaries that require separate execution packets. Requirement count, size,
planning depth, assurance level, risk label, architectural layers, and habit do
not trigger tasks. `coordination.boundaries` is machine authority.

Full selects potential detail, never automatic discovery ceremony. It does not
automatically search the web, invoke a researcher, dump discovery results, create
research, create tasks, or retain unused template sections.

## Artifact profiles

- `None`: create no spec directory, registry, research, task, phase, report, or
  receipt artifact.
- `Compact` and `Full`: create the routed core and only optional artifacts whose
  trigger is present.
- Research, task, and phase metadata must disappear when their trigger is absent.
- `feature-receipt.md` and task execution receipts belong to execution closeout,
  not authoring or readiness.

Forbidden authoring artifacts include `init.json`, `spec-state.json`,
`hydration.md`, `phase-*.md`, and shorthand task filenames.

## Route

1. Resolve the request and active feature; ambiguity fails closed.
   Ambiguous active candidates fail closed: multiple active specs require an
   explicit target. Do not rely on first-directory selection or guess from the
   first active directory.
2. Classify both axes and run the artifact router before loading discovery.
3. Establish `scope_lock` with source, in/out scope, and
   `expansion_policy=requires-user-approval`.
4. Author requirements, then design, then conditional research/tasks as their
   actual dependency requires; do not create empty artifacts to reserve them.
5. Review the final graph, synchronize machine and Markdown projections, then
   run deterministic gates.
6. Pause for unresolved product/scope decisions instead of inventing semantics.

Investigate a `repository_fact` and record grounding. Choose the simplest
`reversible_assumption` and record its bounded reversal boundary. Ask the user
for a `user_owned` product, scope, security, data, or irreversible decision.
Persist only actual items in optional `spec.json.decisions`; omit it when none
exist. Unresolved `user_owned` entries block readiness.

Supported flags are `--auto`, `--validate`, `--status`, and `--archive`; bare
`status`, `archive`, and `resume` are compatibility aliases.

## Requirements

Load `rules/ears-format.md` and `templates/requirements.md`.

- Use `Requirement N` and literal `RN.M`; task mappings use numeric `N.M`.
- State scoped outcomes and non-goals before detailed criteria.
- Every behavior has measurable acceptance and relevant negative/error cases.
- Add only feature-specific measurable non-functional constraints.
- User story, rationale, and scenarios are conditional, not ceremony.

## Design and discovery

Load `rules/design-principles.md` plus the routed light/full discovery rule.
Load research guidance only when the artifact router selected research.

- Compact keeps boundary, six-column typed anchors, decisions/invariants, and
  verification. Full adds only triggered contract/flow/data/error/security/
  migration sections.
- Define each implementation-significant contract once and reference its stable
  `D`/`I`/`C` ID.
- For retention/lifecycle and API contracts, follow `rules/design-principles.md` (clock anchor/source/timezone/precision/comparator/inclusivity/boundary + wrong-clock/boundary counterexample; method/route/auth/headers/schema/response/error/idempotency).
- Keep exactly one parser-visible `## Verification Definitions` section. Each
  single-line V definition starts with `Criteria ...; Owner ...;` and traces
  exact decision refs, method,
  expected result, negative/failure case, and reachability/grounding.
- Add `Proof criteria ...; Proof owner ...; Evidence anchor ...;` only for a
  typed proof boundary; ordinary verification stays in the owner boundary.
- Delete unused optional sections. Ground repository facts to exact anchors;
  ground external-current decisions to primary sources.

## Tasks and lightweight phases

Load `rules/tasks-generation.md` and `templates/task.md` only when at least one
typed topology trigger exists. Size, risk labels, and tradition alone do not
create tasks. Keep `Direct`/`Compact` light: do not coerce a task when no typed
boundary exists, and never invent a task to justify structure.

Each task has exactly seven H2 sections: Outcome, Scope, Anchors and Ownership, Changes, Acceptance, Dependencies, and Verification Plan. The only ownership table is `ID | Type | Target | Role | Access | Action`. Planned verification is not execution evidence. Every executable task must own a concrete test file/artifact anchor (write create/modify) or share proof via a typed proof boundary; bare npm test is not ownership.

Typed `coordination.boundaries` entries (`ownership`, `dependency`,
`transition`, `proof`, `parallel`) are the sole topology authority. Legacy
priority markers, trigger fields, related-file lists, and prose labels are inert
read compatibility, never canonical authoring.

Each `RN.M` has exactly one implementation owner. A proof subject implements
its criterion; its verifier owns a separate proof criterion/artifact, references
the same V definition, and never duplicates the subject acceptance claim.

Phases are optional task-ID groups only for a complex Full task graph. They do
not create files, repeat prose, or replace typed edges.

## Review and readiness

Load `references/review.md`. Review the whole graph and inventory every blocker; presentation may be concise, but finding count is never capped. Each `RN.M` receives a concrete counterexample mapped to real `D`/`I`/`C` and `V` refs. For any retention/lifecycle rule, include a counterexample where the wrong clock (for example creation time instead of terminal/state-transition) would violate the policy.

Routine and Elevated have no reviewer ceremony. Strict requires an independent, allowlisted reviewer capability observed by the host hook. The author cannot self-attest Strict. If that host event is unavailable, pause once with the exact capability blocker; do not retry reviewer loops, self-attest, downgrade, or simulate the event. This is an honest-agent guardrail, not host-attested evidence or a security boundary. Two-review target is advisory: after two failed semantic rounds, pause for unresolved product/security/architecture uncertainty or repeated non-convergence; one bounded mechanical correction without weakening gates is allowed; budgets never override correctness.

For Strict, the reviewer binds its host-observed event to the read-only candidate
digest from `node .claude/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest` (Claude Code) or `node .codex/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest` (Codex);
finalization then verifies that current observation.

Run final-byte validation and grounding for every durable spec:

```bash
# Claude Code
node .claude/scripts/validate-spec-output.cjs specs/<feature>
# Codex
node .codex/scripts/validate-spec-output.cjs specs/<feature>
```

Exit 0 proves only implemented structural/grounding checks. It does not prove
semantic quality, product correctness, execution PASS, or closeout.

The installed atomic finalizer may set `ready_for_implementation = true`
only after routed artifacts match policy, all projections round-trip, the full
blocker inventory is resolved, every required authoring state is `validated`,
semantic review coverage is exact, and every deterministic gate passes. The
author must not write this authority conclusion directly. This flag is technical
artifact readiness only.
Specs never invokes or auto-chains into Develop; only a fresh explicit user
invocation of Develop starts implementation. Specs-only never creates or
updates docs; record doc impact as a brief recommendation and leave creation or
update to the docs workflow. Never fabricate execution proof. On failure, keep lifecycle state unfinished and report the exact blocker.

## Platform acceptance and handoff

Semantic acceptance covers Claude Code and Codex. Validate both installed
instruction projections and use native vocabulary for each runtime.

After readiness, report the optional handoff without invoking it:

- Claude Code: `/hapo:develop <feature>`
- Codex: `$hapo-develop <feature>`

For an early stop, keep readiness false and explain how to resume. `--auto` may
set technical readiness after every gate passes, but must stop in Specs. Never
claim proof, authority, approval, readiness, or closeout from placeholders,
self-authored receipts, chat state, or stale validation.
