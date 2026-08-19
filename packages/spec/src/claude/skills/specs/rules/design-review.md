# Design review contract

Review the complete routed artifact graph for implementation-blocking semantic
gaps. Concise presentation is encouraged; inventory size is never capped.

## Coverage

For every `RN.M` criterion:

1. trace the exact implementation owner, boundary, applicable `D`/`I`/`C`
   definitions, and canonical `V` definition;
2. construct a concrete counterexample or failure scenario;
3. confirm the expected result rejects or handles that scenario;
4. confirm referenced anchors are reachable and grounded; and
5. record every unresolved contradiction, ambiguity, missing owner, broken
   dependency, unreachable proof, or scope violation as a blocker.

Also review cross-criterion contracts, state transitions, concurrency,
authorization, recovery, compatibility, and rollback where scope activates
them. Do not perform broad technology research during review; return an exact
uncertainty to the artifact router when new material uncertainty is discovered.

## Finding shape

Each blocker states:

- affected criterion and design/verification refs;
- concrete counterexample;
- observed conflicting or missing artifact content;
- impact on implementation or proof; and
- smallest semantic decision or correction required.

Group duplicates for readability without dropping distinct blockers. Positive
observations are optional and never displace a blocker.

## Decision

- `PASS`: the full routed graph is coherent, grounded, and every criterion's
  counterexample is resolved.
- `FAIL`: at least one semantic or structural blocker is actionable now.
- `BLOCKED`: required product input, trusted capability, or external evidence
  is unavailable.

Routine and Elevated require semantic review but no reviewer ceremony. Strict
requires an independent allowlisted reviewer capability observed by the host
hook. An author, task marker, receipt text, or claimed role cannot self-attest
that capability. Risk alone has an Elevated floor; Strict is opt-in only for an
explicit user/project audit requirement or a user-confirmed, scope-specific
audit decision. If the host event is unavailable, pause once rather than retry,
downgrade, or simulate authority. Deterministic validation checks implemented
structure and grounding; it never replaces this semantic judgment.

Readiness stays false until the complete blocker inventory is resolved and all
required machine gates pass. Review does not claim implementation execution,
approval, closeout, or lifecycle completion.
