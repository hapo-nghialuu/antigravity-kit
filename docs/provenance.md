# Provenance Ledger

Ledger for borrowed workflow patterns. Allowed reuse values: `idea` or
`clean-room`. `copied-text` is never valid.

## Current ledger

| Pattern | Source anchor | Reuse type | CafeKit destination | Evidence/status |
|---|---|---|---|---|
| Parallel-wave evidence and retention protocol | `plans/20260806-fixup-and-postmerge-plan.md`, §B5; local implementation reference `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | clean-room | `packages/spec/src/claude/skills/develop/references/parallel-waves.md` | Implemented from local B5 requirements; receipt fields, immutable diff ranges, retention, conflict graph, failure classification, and integration gates verified by focused contract tests. |
| Direct AgentKit or `cafekit-ref` source text | No direct source text identified in the current repository scope | idea | None | No borrowed text recorded; no verbatim source material used. |

## Ledger rule

Future borrowed patterns require a ledger row before implementation. Record local
source anchors, destination, reuse type, and evidence/status first. Adapt patterns
at behavior level only; never copy source text verbatim. Update this ledger when
source evidence or implementation status changes.
