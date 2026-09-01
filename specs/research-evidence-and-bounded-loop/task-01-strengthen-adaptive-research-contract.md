# Task 01 — Strengthen adaptive Research contract

Status: done

## Outcome
Research scales effort to decision risk and returns traceable, honest evidence
without forcing delegation or persistent files.

## Scope
- In: Quick/Standard/Deep routing, claim provenance, contradictions, uncertainty,
  recommendation tradeoffs, sequential fallback, persistence boundary.
- Out: Loop behavior, new research domains, live-model quality claims.

## Coverage
- CP-01

## Ownership
- Modify: `packages/spec/src/claude/skills/research/SKILL.md`
- Modify: `packages/spec/src/claude/agents/researcher.md`
- Modify: `packages/spec/src/claude/skills/specs/templates/research.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance
- AC-01: depth is selected from reversibility, blast radius, uncertainty, and
  decision cost; Quick is bounded lookup, Standard verifies alternatives, and
  Deep adds contradiction/gap analysis without arbitrary research theatre.
- AC-02: material claims carry resolvable evidence metadata and certainty;
  comparisons name a winner only with explicit fit, tradeoffs, and limitations.
- AC-03: delegation is optional acceleration, not a correctness dependency;
  output stays in chat unless durable persistence has explicit authority.
- Existing Specs research headings and ordering remain byte-compatible; full
  scaffold/validator consumer compatibility is owned by Task 03 package proof.

## Dependencies
- none

## Verification Plan
- Command: `node packages/spec/scripts/run-skill-self-tests.mjs --static-only`
- Named probes: `hapo:research adaptive evidence contract is complete and bounded`;
  `hapo:research checker rejects semantic weakenings`.
- Reachability: canonical Research skill, researcher agent, and report template;
  installed and legacy-consumer proof belongs to Task 03.
- Oracle: the runner exits 0 only when depth, provenance, uncertainty,
  contradiction handling, fallback, and persistence boundaries coexist.
- Counterexample: a mutation forces delegation, persists every answer, removes a
  claim anchor/date/certainty, or allows Deep to skip contradiction checks; its
  named probe fails.
- Artifacts: none.

## Receipt

Verification: PASS
Command: node packages/spec/scripts/run-skill-self-tests.mjs --static-only
Exit: 0
Base: 16c4fbc01b25a1d64ebd825607a8e6ff09e4e788
Head: 93a415002eb3d682ec54225314e91fb559a1cf64d60644aa0a5dc8c1d81362b9

```text
✔ hapo:research adaptive evidence contract is complete and bounded
✔ hapo:research checker rejects semantic weakenings; count=18
[skill-test] PASS: 505 focused static tests executed
```
