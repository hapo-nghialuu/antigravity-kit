# Full design discovery

Load this rule only after the artifact router selects `Full`. Full controls
design detail; it does not select research, web access, tasks, or ceremony.

## Discovery boundary

Inspect only facts needed to remove an implementation-significant ambiguity:

1. map scoped requirements to existing entrypoints and behavior owners;
2. inspect reusable contracts, data flows, dependencies, and recovery paths;
3. identify decisions whose alternatives would change observable behavior;
4. ground each chosen decision to repository anchors or, when needed, a
   primary external source; and
5. stop when the routed design can be implemented without a product decision.

Do not inventory unrelated architecture, compare fashionable patterns, or
collect findings merely because they are available. Repository scouting is
normal design work and does not by itself create `research.md`.

## Research gate

Create `research.md` only when the router has found at least one of:

- unresolved material uncertainty that can change requirements or design;
- an external-current fact that must be grounded; or
- an explicit user request for durable research.

If none applies, research is absent: do not load the research template, invoke
a researcher, search the web, or create a placeholder. When external-current
facts matter, prefer primary authoritative sources and capture only evidence
that resolves the named uncertainty. General best-practice browsing is not a
research trigger.

## Projection

Put settled behavior, contracts, invariants, negative paths, and grounded
anchors in `design.md`. If research was selected, keep `research.md` minimal:
named uncertainty, relevant evidence, resulting decision, and remaining gaps.
Synchronize every promoted semantic decision into `spec.json`; research notes
that do not affect semantics remain supporting evidence, not authority.

Full may add flow, data, error/recovery, security/privacy, migration, or proof
detail only when the scoped topology activates that section. Delete unused
sections rather than reserving them for implementation.
