---
name: hapo:brainstorm
description: "Turn unresolved product or architecture intent into a bounded decision contract, with proportional routing, evidence, and safe handoff."
user-invocable: true
when_to_use: "Use when material product, scope, or architecture choices remain; skip direct factual answers and already-concrete Specs work."
category: utilities
keywords: [ideation, tradeoffs, decisions, scope]
argument-hint: "<idea_or_problem>"
metadata:
  author: haposoft
  version: "3.0.0"
---
# Brainstorm — proportional pre-delivery design

Turn unresolved intent into a bounded contract without turning clear work into
an interview. `hapo:brainstorm` owns the workflow; `brainstormer` is an optional
specialist for real architectural trade-offs.

<HARD-GATE>
Brainstorm never writes implementation, invokes Develop, or treats approval as
implementation authority. Feature or documentation delivery may prepare context
for a new explicit `hapo:specs` invocation; it never starts Specs implicitly.
</HARD-GATE>

## Front-door routing — before scout or questions

Classify intent first. This routing never waives safety or permission rules.

1. **Direct request:** for a factual answer, a specific command, or an explicitly
   different workflow, leave Brainstorm before scout, questions, approval, or
   persistence. Read-only product or architecture exploration is not direct merely
   because it writes no files.
2. **Hydrate the contract, then keep routing:** for every request that remains,
   reuse accepted Outcome, Constraints, Non-goals, and Acceptance field by field
   only when current user text or an approved artifact binds them to the same
   target and revision. Preserve current non-conflicting fields; treat missing,
   stale, or conflicting fields as gaps. Never infer approval. Hydration is not a
   terminal route; continue to exactly one intent route below.
3. **Bug or failure:** before diagnosis, capture the repaired-behavior Outcome,
   Constraints, Non-goals, and Acceptance evidence. Then use `hapo:debug` until
   root cause is evidenced. Do not brainstorm fixes from a symptom. If at least
   two cause-aligned remedies remain, compare 2–3 here. Hand off to `hapo:hotfix`
   only when the user explicitly requested a fix; diagnosis-only work returns the
   root-cause report and stops.
4. **Non-bug exploration only:** inspect enough evidence, give a chat
   recommendation, and stop. Do not request design approval, persist a report, or
   invoke another workflow without a new explicit request.
5. **Feature or documentation delivery:** continue through the design workflow.

## Contract and evidence

For feature/docs delivery and every bug/failure, resolve four user-owned fields:

- **Outcome:** observable end state.
- **Constraints:** safety, compatibility, time, technology, and ownership limits.
- **Non-goals:** nearby work excluded from this delivery.
- **Acceptance:** observable evidence that proves completion.

After front-door routing, run `hapo:inspect` or a narrow equivalent before
technical design. Inspect relevant modules, patterns, docs/plans, contracts, and
runtime constraints; summarize only useful findings in 3–6 bullets.

For supplied images, video, PDFs, or mockups, use `hapo:ai-multimodal` before
designing. Add a diagram only when it clarifies a material choice or flow.

Derive technical touchpoints from repository evidence. Ask the user about a
touchpoint only when its ownership or scope boundary is a product decision that
cannot be discovered. Keep intent separate from current-state evidence.

If the request spans three or more independently deliverable subsystems, split
it. A subsystem is independent only when its outcome, boundary, and verification
or deployment path can move through the lifecycle separately.

## Discovery Question Framework

Load `references/question-framework.md` before the first discovery question.
Generate questions from scout evidence, user intent, contract gaps, applicable
domain guidance, and risk surfaces. Never ask the user for a technical fact that
code, docs, or trusted current research can answer.

Use the runtime's native structured user-input tool when available. Ask one
highest-impact question by default; batch at most three independent questions
only when none depends on an earlier answer. Record confirmed decisions,
assumptions, and open questions separately in the decision register.

Stop asking when remaining details have safe implementation defaults. Do not
force questions merely to consume a budget.

## Options and specialist use

A material design choice exists only when at least two viable paths would satisfy
the contract with meaningfully different consequences.

- For a material choice, compare 2–3 mechanically distinct viable approaches by
  setup cost, runtime complexity, maintenance, UX/DX, compatibility/migration,
  risk, and time-to-value.
- With one viable path, present it and explain briefly why alternatives would be
  artificial or fail the contract. Never create strawman options.
- Recommend the smallest path that satisfies the contract.

Call `brainstormer` only for a material architectural choice that benefits from
deeper pressure-testing. Use researcher only for current external facts the
repository cannot establish. The controller remains responsible for questions,
approval, persistence, and handoff.

## Delivery design and approval

For feature or documentation delivery:

1. Draft one coherent candidate scaled to the work: architecture, data flow,
   interfaces/UX, error behavior, verification, and rollout only when material.
2. Run the internal 4-point review before presentation:
   - remove placeholders and vague instructions;
   - reconcile contradictory behavior;
   - remove scope creep;
   - make observable behavior and proof concrete.
3. Present the reviewed candidate.
4. Before final approval, require a separate explicit section decision when
   the design changes auth/secrets/privacy, destructive or irreversible behavior
   or data-loss risk, money/privilege/safety, or production-state mutation.
5. After critical section decisions and revisions, request one final approval by
   default.

Revise material disagreement before handoff. An already accepted, current
contract is not re-approved unless new evidence changes it.

## Persistence and handoff

Persist only approved decisions and semantics, only with user authority, and
only when they must survive the session or feed Specs. Use the repository's
configured report path and naming convention. Do not create a report merely to
satisfy this skill. Before writing, redact live secrets, credentials, private
keys, access tokens, and unnecessary PII; preserve exact approved meaning with a
safe placeholder and ownership reference instead of copying the sensitive value.

A durable summary contains the four contract fields, discovered touchpoints,
options actually evaluated, chosen direction, risks, validation, decision
register, and unresolved questions.

- Feature/docs delivery: provide the approved summary and ask the user to invoke
  `hapo:specs` explicitly in a new request.
- Diagnosed bug: follow the fix-authority rule in front-door routing.
- Non-bug exploration: recommendation already returned in chat; stop.

## Completion bar

Brainstorm is complete when the selected route is explicit, current evidence is
separated from intent, every material user-owned gap is resolved or named, and
the route-specific output has been returned without unauthorized persistence or
implementation. Never claim live behavior from this written contract alone.
