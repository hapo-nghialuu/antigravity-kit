# Specs v2.1 state synchronization

## Authority layers

`spec.json` is machine semantic authority. Requirements, design, conditional
research, and conditional task Markdown are human projections. Host state may
record authority or integrity, but it never supplies product semantics.

Planning depth and assurance level remain independent. Route artifacts before
discovery: None persists no spec; Compact and Full persist the bounded core;
research and tasks remain absent unless their semantic triggers exist.

## Canonical lifecycle

The feature lifecycle is exactly `in_progress`, `paused`, `blocked`, or `done`.
Authoring state is independently `draft`, `validated`, or `absent`. New 2.1
artifacts never emit legacy lifecycle aliases.

Technical readiness is not lifecycle completion. `ready_for_implementation`
may change only through the installed machine finalization path after every
routed artifact, projection, semantic review, grounding check, and deterministic
gate passes. The author cannot directly declare readiness, authority, approval,
review capability, execution proof, or closeout.

## Projection sync

After a semantic Markdown edit:

1. invoke the explicit installed machine semantic-sync step to promote `semantic_model`;
2. regenerate or reconcile every affected Markdown projection;
3. verify requirements, decisions, anchors, task registry, typed boundaries,
   and verification refs round-trip without loss; and
4. rerun applicable deterministic validation and grounding checks.

For Codex, the isolated promotion is
`node .codex/scripts/spec-scaffold.cjs <feature> --sync-semantic-model`.

Task Markdown exists only for typed ownership, dependency, transition, proof,
or parallel topology. Its status and dependencies project the matching
`task_registry` entry. Its Verification Plan is prospective, never execution
proof. Typed `coordination.boundaries` alone define topology; legacy trigger
fields, priority markers, related-file lists, and prose do not.

## Lifecycle updates

- Active work uses `in_progress`.
- A deliberate resumable stop uses `paused` with the exact remaining decision.
- An external or semantic blocker uses `blocked` with a concrete cause.
- Task state changes update the registry and matching projection together only
  from observed work and verification.
- Feature `done` is reserved for final-state authority after implementation
  closeout; authoring or readiness cannot produce it.

State synchronization never fabricates commands, PASS results, timestamps,
receipts, completed work, reviewer identity, or user approval. When execution
evidence is absent, preserve unfinished state and report the missing proof.
Never hand-author the `semantic_model` shape or treat an unsynchronized Markdown
edit as machine authority.

Codex-native plan or task state may mirror physical state when available, but
it is never a substitute for `spec.json` or authority to advance lifecycle.
