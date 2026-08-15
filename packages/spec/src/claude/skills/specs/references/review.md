# Whole-spec semantic review v2.1

## Purpose

Review the spec as one consistency graph. A structural validator exit 0 proves
only implemented structural checks; it does not prove semantic completeness,
grounding, product correctness, negative paths, or executable behavior.

## Resolve and inventory

1. Resolve the exact spec path; ambiguous active specs fail closed.
2. Read final physical `spec.json`, `requirements.md`, `design.md`, optional
   `research.md`, every task, and the machine-recorded semantic-review state.
3. Confirm the physical artifact set matches `planning_depth` and its justified
   optional gates:
   - `None`: no durable spec;
   - `Compact`: three-file core plus an optional task bundle/registry only when
     ownership, dependency, durable transition, separate proof, or parallel
     coordination activates the task gate;
   - `Full`: the same three-file core plus only justified optional research,
     task, or complex-task-graph phase metadata. Full depth
     alone does not justify any optional artifact.
4. Reject `feature-receipt.md` in spec authoring. It belongs to execution
   closeout only.

## Consistency graph

Build and inspect these edges:

```text
scope_lock
  -> outcomes/non-goals
  -> RN.M acceptance
  -> design boundary + typed anchors
  -> named contracts/invariants
  -> conditional task owners/consumers
  -> verification + negative paths
  -> technical readiness
```

Check both directions:

- every scoped outcome reaches measurable acceptance and proof;
- every design decision traces to scope or acceptance;
- every anchor has an ID unique across the whole spec, allowed type, exact
  target, and role;
- design anchors use `A-D-NN`; task-owned anchors use the canonical task-scoped
  `A-R{requirement}-{sequence}-NN` namespace;
- file anchors come first and symbols identify their containing files;
- a task that only consumes a design target references its canonical `A-D-NN`
  anchor instead of redefining the same target under a task-local ID;
- every named contract/invariant has one canonical definition;
- tasks reference contract IDs without copying bodies;
- every cross-task contract/transition has exactly one owner before consumers;
- every `RN.M` has exactly one implementation owner; a proof verifier owns a
  separate proof criterion/artifact and does not repeat the subject's Acceptance;
- every dependency is real and Markdown agrees with `task_registry`;
- every task has one canonical `**Status:**` header using `pending`,
  `in_progress`, `blocked`, or `done`, and its exact status token matches
  `spec.json.task_registry[path].status`;
- every task has exactly seven H2 sections and one
  `ID | Type | Target | Role | Access | Action` table;
- typed `coordination.boundaries` own topology; legacy trigger fields, priority
  markers, related-file lists, and prose own nothing;
- every executable implementation task owns a concrete test file or artifact
  anchor or shares proof through a typed `proof` boundary; a bare `npm test`
  string without such an anchor is not ownership;
- specs-only never creates or updates docs and never fabricates execution
  proof; doc impact is a brief recommendation at most;
- no task, phase, research note, or review finding expands `scope_lock`;
- optional phases exist only as compact `spec.json` groups for a complex Full
  task graph and never repeat prose.
- exactly one `## Verification Definitions` section uses parser-visible lines
  `- **Vn**: Criteria RN.M; Owner ...; [Proof criteria ...; Proof owner ...;
  Evidence anchor ...;] Decision refs D/I/C; Method ...; Expected ...;
  Negative/failure ...; Reachability/grounding ...`; the proof extension is
  conditional on a typed proof boundary; tables and V headings are not canonical.

## Counterexample review

For every `RN.M`, try at least one concrete counterexample that could
make two competent implementers choose different behavior. Use relevant lenses:

- missing/invalid input or permission;
- dependency unavailable, timeout, partial success, retry, or duplicate event;
- conflicting state, ordering, concurrency, restart, rollback, or migration;
- boundary bypass, data disclosure, retention, or authorization confusion;
- wrong clock anchor/source/timezone/precision or cutoff comparator/inclusivity or enforcement boundary for a retention/lifecycle rule (for example creation time or UTC vs local or `>` vs `>=` mismatch) that would retain or delete the wrong records;
- partial public, replay, or operator API contract (missing method, route, auth, headers, request or response schema, error semantics, or idempotency and concurrency behavior);
- orphaned route/component/worker/artifact with no runtime reachability;
- task consumer beginning before its contract/schema/transition owner;
- verification command passing while the user-visible behavior is wrong;
- an executable task with only a generic test command and no owned test file or typed proof verifier.

A counterexample passes only when requirements or design already choose the
behavior and the verification plan can distinguish the correct result. Do not
invent a product decision during review; unresolved choices require a user
decision. Two-review target is advisory: after two failed semantic rounds, pause for unresolved product/security/architecture uncertainty or repeated non-convergence; one clearly bounded mechanical correction without weakening gates is allowed; budgets never override correctness. Specs-only never creates or updates docs and never fabricates execution proof; record doc impact as a brief recommendation only.

## Assurance depth

| Level | Required semantic review |
|---|---|
| Routine | Same-session graph check and relevant counterexamples; no reviewer ceremony. |
| Elevated | Same-session targeted adversarial review; no reviewer ceremony. |
| Strict | Full red-team plus a host-hook-observed event from an allowlisted reviewer capability. |

Risk presence sets the automatic minimum to Elevated. Strict is opt-in only
for an explicit user/project independent-audit requirement or a user-confirmed,
scope-specific audit decision. Never select it from a keyword, severity label,
Full depth, or reviewer availability. If the required host event is unavailable,
pause once and report the capability blocker; do not retry loops or downgrade.

Strict red-team lenses are Security Adversary, Failure Mode Analyst, Assumption
Destroyer, and Scope & Complexity Critic. Findings without a concrete physical
location and counterexample are rejected as unsupported.

## Finding format

```markdown
## Finding N: <title>
- **Severity:** Critical | High | Medium
- **Location:** <file:line or exact section/anchor/requirement ID>
- **Broken edge:** <source -> target in the consistency graph>
- **Flaw:** <specific contradiction or omission>
- **Counterexample:** <concrete input/state/event and incorrect possible result>
- **Evidence:** <short quote or missing required mapping>
- **Suggested fix:** <smallest semantic correction>
- **Disposition:** Accept | Reject
- **Rationale:** <why>
```

Apply accepted findings to requirements, design, task acceptance/changes, named
contracts/invariants, dependencies, or verification. A report-only fix is not a
fix. Scope or product decisions require explicit user approval before editing.

## Deterministic and grounding gates

Finalize requirements, design, optional research, task files, and canonical
`spec.json` topology first. Compute the candidate digest read-only, then provide
a review JSON object with exactly `reviewed_criteria` and `counterexamples`. The
author must not fabricate or directly write authority state.

The digest projects task registry semantics as `id`, `dependencies`, and optional
`artifacts`. Execution-only status, blocker, timestamps, Markdown `Status`, and
checkbox checked state do not stale review; requirement, design, research, task
prose, dependency, artifact, or coordination changes do.

```bash
# Claude Code
node .claude/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest
# Codex (installed projection — verify, not raw .claude path)
node .codex/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest
```

The machine-recorded state binds the returned digest, exact reviewed `RN.M`
criteria, and one concrete counterexample per criterion. Each counterexample uses exactly `criterion`,
`case_kind`, `scenario`, `expected`, `decision_refs`, and `verification_ref`.
Decision refs resolve to real `D`/`I`/`C` definitions; the `V` definition traces
both the criterion and decisions. This state binds what was reviewed; it never
substitutes for semantic judgment or resolves ambiguity.

Routine and Elevated have no reviewer ceremony. Strict requires a real event
observed by the installed host hook from an allowlisted reviewer capability.
The hook derives reviewer identity/capability and binds the digest; authoring
prose cannot self-declare it.
The final reviewer message contains
exactly one line:

```text
CAFEKIT_SEMANTIC_REVIEW_ATTESTATION {"feature_name":"<feature>","spec_file":"specs/<feature>/spec.json","semantic_digest":"sha256:<digest>","verdict":"PASS"}
```

The `SubagentStop` hook recomputes the digest and stores a MAC-protected record
outside the project, bound to canonical project/spec/feature identity. Codex
must use its event-capable thread-spawn path for this Strict gate. Its legacy
internal multi-agent path does not expose the child completion message through
a supported hook event, so it stays not-ready; never derive authority from a
parent summary or a spawn-only `PostToolUse` event.
Do not add reviewer identity or independence claims to `semantic_review`.
This is a host-hook-observed honest-agent guardrail. It is not host-attested
evidence and not a security boundary against another process running as the
same OS account.

After the Strict observation (or immediately for Routine/Elevated), invoke the
only supported atomic promotion path:

```bash
# Claude Code
node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>
# Codex (installed projection — verify, not raw .claude path)
node .codex/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>
```

Run normal validation only after the installed finalizer records that state:

```bash
# Claude Code
node .claude/scripts/validate-spec-output.cjs specs/<feature>
# Codex (installed projection)
node .codex/scripts/validate-spec-output.cjs specs/<feature>
```

Run the runtime-provided grounding command for every durable spec. It
deterministically recomputes factual anchor/path/symbol/command reachability and
creates no additional receipt. Record command, exit code, and failing categories.
Non-zero blocks readiness. Exit 0 does not override a broken consistency edge or
counterexample; semantic review remains mandatory at the selected assurance level.

## Final reconciliation

Before readiness:

1. Re-read all physical artifacts after fixes.
2. Confirm accepted findings changed implementation-facing content.
3. Confirm requirements, globally unique anchor IDs, canonical design-anchor
   references, contracts, owners/consumers, dependencies, negative paths, and
   verification form a closed graph.
4. Confirm `feature-receipt.md`, phase files, copied contract bodies, legacy
   topology markers, and unused template sections are absent.
5. Write coherent final timestamps/status and rerun deterministic gates;
   readiness means technical artifact readiness, not permission to implement.

If any check fails, report `FAIL` or `BLOCKED`, preserve unfinished lifecycle
state, and do not suggest implementation handoff.

## Platform acceptance

Acceptance covers Claude Code and Codex artifacts only. Verify the semantic
rules/templates installed for both runtimes remain equivalent. Do not add a
third runtime to this acceptance scope.
