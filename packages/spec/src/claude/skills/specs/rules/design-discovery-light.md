# Compact design discovery

Load this rule only after the artifact router selects `Compact`. The goal is a
bounded durable design, not a reduced version of a default research process.

## Focus

1. locate the real entrypoint and existing behavior owner;
2. inspect the smallest set of contracts and dependencies touched by scope;
3. record compatibility, negative-path, and verification constraints; and
4. ground the selected anchors and stop.

Keep the result in `design.md`. File lists without behavior ownership, generic
best practices, and broad architecture inventories are not useful discovery.

## Research gate

Research remains absent unless there is unresolved material uncertainty, an
external-current fact that must be grounded, or an explicit user request. A new
library is not automatically a trigger: inspect repository declarations first;
consult primary external documentation only when a current fact can change the
decision. When the gate opens, create the minimal uncertainty-to-evidence-to-
decision projection and retain any honest remaining gap.

If discovery reveals cross-boundary behavior needing materially more design
detail, reclassify planning depth before persistence. If the Compact baseline
is already persisted, expand monotonically to Full; do not silently downgrade
or create optional artifacts merely to resemble Full.
