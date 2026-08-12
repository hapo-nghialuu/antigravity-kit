---
name: hapo:specs
description: "Route a request into the smallest evidence-backed CafeKit specification that its lane requires."
user-invocable: true
when_to_use: "Use when a request needs a durable specification or a lane decision before implementation."
category: utilities
keywords: [specs, requirements, design, tasks]
argument-hint: "[<feature-description>] [--auto] | --status | --validate <feature> | --archive"
metadata:
  author: haposoft
  version: "2.0.0"
---
# Specs — routing and handoff contract

This file is the small control plane for specification work. It owns routing,
phase boundaries, stop conditions, lane obligations, and the implementation
handoff. Load the detailed rules only when the selected phase needs them; do
not preload every template, rubric, diagram rule, or discovery manual.

## Core contract

The normal route is:

`Route → Requirements → Design → [task bundle when required] → Validate → Handoff`

Each phase must finish before the next begins. A simple request may stop before
spec creation; a bounded Standard request may finish without tasks. Init is
never a stop point. Never implement code from this skill.

### Hard Output Contract

- Do NOT create `specs/<feature>/init.json`.
- Do NOT create `specs/<feature>/hydration.md`.
- Task filenames are never shorthand such as `tasks/task-R0-1.md`.

The persisted `spec.json.workflow_policy` snapshot is the only new lane-policy
authority. It is written once, validated strictly, and never reclassified by a
later prose field. The `execution_tier` value (`Light | Standard | Deep`) is a
legacy read adapter only: `Light → Direct`, `Standard → Standard`, `Deep →
Critical`. It never creates policy or controls workflow.

## Lane gate

Classify at the runtime boundary before creating spec state or asking for
approval:

```bash
node .claude/scripts/workflow-policy.cjs --classify-lane --task-json '<task JSON>' --json
```

- **Direct**: clear, isolated, reversible, low-risk work. Do not create a spec,
  state, registry, task bundle, or research artifact. Run targeted verification
  and retain proportional evidence.
- **Standard bounded**: create exactly `spec.json`, `requirements.md`, `design.md`, and one `feature-receipt.md`. Do not require
  `tasks/`, `task_registry`, `reports/`, or `research.md` for a small scope.
- **Critical**: destructive/irreversible, auth/payment/privacy/data,
  migration/schema, public contract, cross-runtime, difficult rollback, or
  other persisted high-risk obligations. Add only the required durable task
  state, registry/DAG, research, and independent audit surfaces.

Risk signals may escalate a lane but never downgrade it. A downgrade without a
trusted runtime-issued receipt is blocked; boolean approval fields are not
authorization. `--auto` never writes `user_approved: true`.

Task scoring is optional advisory input when a required task bundle needs help
with decomposition. It cannot choose a lane, make a task bundle mandatory, or
gate readiness. Cynefin is advisory for discovery/spikes only; it never adds
ceremony by itself.

## Dispatch and flags

Supported flags are `--auto`, `--validate`, `--status`, and `--archive`; bare
`status`, `archive`, and `resume` remain compatibility aliases.

1. `--status` reports state and stops.
2. `--validate <feature>` jumps to validation and stops on any validator error.
3. `--archive` runs archival rules and stops.
4. `--auto` generates lane-required artifacts, validates them, then pauses for
   explicit user approval; it is always `paused` and `not-ready` at that point.
5. A description enters the lane-appropriate route. If no description exists,
   ask only the minimum user-owned question needed to continue.

Before selecting a new Standard/Critical spec, inspect only the relevant active
state and branch match. Multiple active candidates are an ambiguity stop, not a
reason to pick the first directory. Direct work does not perform registry
discovery as ceremony.

## Phase contract

### Route and scope

Use repository evidence for facts. Ask the user only for scope, architecture,
acceptance, or risk decisions that evidence cannot settle. If the idea is
unclear or competing designs remain, stop and route to `hapo:brainstorm`.
Load `references/ask-user-question-gates.md` only when a user-owned decision is
actually needed. Multimodal/document references load their domain reference
only when the request contains that input.

### Requirements

Create numeric, testable requirements only for Standard/Critical work. Load
`rules/ears-format.md` when writing EARS acceptance criteria; it is not part of
the routing context. Run targeted codebase discovery when behavior, contracts,
paths, tests, package boundaries, or runtime surfaces are uncertain.

External research is required only when `needsResearchGrounding` or an
applicable persisted risk obligation says so. Otherwise record the bounded skip
implicitly through the selected artifact profile and do not create `research.md`.

### Design

Write `design.md` only after requirements are sufficient. Load the design
template/principles and `rules/phase-decision-matrix.md`. For discovery, load
`rules/design-discovery-light.md` for bounded work or
`rules/design-discovery-full.md` for complex, security-sensitive, or externally
uncertain work; load only the selected mode.
Use diagrams only for multi-step or cross-boundary
flows. Auth, transport, persistence, generated artifacts, runtime boundaries,
and deletion policy require canonical contracts and invariants.

### Task bundle (conditional)

Create tasks only when the persisted lane obligations require durable task
execution, traceability, or a separate task proof path. When tasks are needed,
load `rules/tasks-generation.md`. Load `rules/task-scoring-rubric.md` only if
scoring helps resolve a real split/merge or dependency question. The task
template and filename/registry rules are lazy inputs, not core ceremony.

Every generated task still needs exact scope, requirement mapping, completion
criteria, executable evidence, and runtime reachability where applicable.
Do not add an R0 task, integration task, spike, `(P)` marker, or DAG edge unless
there is a real dependency or proof boundary. Cynefin may explain a spike
recommendation but does not mandate one.

### Validation and finalization

Load `references/review.md` and detailed design/task rules only for an explicit
validation request or when the persisted policy marks validation required.
Always run the deterministic validator before readiness:

```bash
node .claude/scripts/validate-spec-output.cjs specs/<feature>
```

**MUST run deterministic validator.** A non-zero result overrides any LLM checklist result;
output MUST NOT suggest `/hapo:develop` and must keep
`ready_for_implementation = false`. For a task-bearing policy, also rebuild the
real task inventory/registry and run grounding when that validator requires it.

## Stop conditions

Stop and report `BLOCKED` or `FAIL` when any of these holds:

- lane classification or a required trusted downgrade receipt is unavailable;
- scope/architecture/acceptance is unresolved and needs the user;
- an active-spec choice is ambiguous;
- a required artifact, approval, task mapping, contract, or evidence is missing;
- a validator, grounding check, or required research obligation fails;
- a path, dependency, or runtime entrypoint cannot be grounded;
- execution is blocked by permissions or environment.

Never turn a placeholder, empty result, or model claim into independent evidence;
an `Audit: PASS` marker is not evidence. State the exact missing proof and leave
the lifecycle unfinished.

## Lifecycle and handoff

`spec-ready` is pre-implementation. Set `ready_for_implementation = true` only
after lane artifacts, explicit user approval, deterministic spec validation, and
grounded requirement/task mappings and contracts are complete. Execution-evidence
and independent-audit slots remain honestly `PENDING` when applicable; neither a
canonical execution receipt nor an independent closeout audit is required yet.

After implementation, feature/task closeout is a separate gate: the test owner
must provide one canonical execution receipt and every required independent audit.
Critical work requires a real independent audit when `needsIndependentAudit` is
persisted. Review consumes proof and never creates or claims it; `Audit: PASS` is
not evidence.

The shared verdict adapter keeps the workflow surface to
`PASS | PASS_WITH_WARNINGS | FAIL | BLOCKED`; adapters must not invent a second
completion enum. Warnings never erase missing proof; closeout remains unfinished
until its post-implementation receipt and applicable audit obligations are met.

On successful completion, return paths and evidence, then:

**Command integrity:** The implementation handoff command is always
`/hapo:develop <feature>`. Never suggest `/work`, `/code`, or another alias.

```text
✅ Spec complete: specs/<feature>/
📌 Next step — run:
   /hapo:develop <feature>

💡 Tip: Run /clear or start a new chat session before implementing to reduce planning context carryover.
```

For `--auto` or an early phase stop, use a paused block instead; keep
`ready_for_implementation=false` and tell the user to resume with
`/hapo:specs`.

## Lazy references

| Need | Load only then |
|---|---|
| user-owned questions | `references/ask-user-question-gates.md` |
| EARS syntax | `rules/ears-format.md` |
| design choices | `rules/design-principles.md`, phase matrix, selected discovery rule |
| task decomposition | `rules/tasks-generation.md`, optional scoring rubric, task template |
| validation | `references/review.md`, design review rules, validators |
| archive/translation/research | the matching reference only when enabled by scope/policy |

`spec.json` remains the source of truth for status, timestamps, approvals,
`scope_lock`, and the single `workflow_policy` snapshot. Do not emit
`init.json`, `spec-state.json`, `hydration.md`, shorthand task filenames, or
unregistered artifacts.
