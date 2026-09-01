# Agent timing

Delegation is optional acceleration, not a mandatory stage. Keep work inline
when it is small, tightly coupled, dependent on shared evolving context, or no
installed specialist offers a material advantage.

Delegate only when at least one trigger is evidenced:

- a specialist needs fresh isolated context;
- a distinct tool or runtime boundary must be owned separately;
- two or more scopes are genuinely independent and can run in parallel;
- an independent reviewer or tester is required by risk.

Discover the current runtime's installed agent catalog before delegation. Use
Claude-native agent types in Claude Code and Codex-native agents/subagents in
Codex. If the preferred agent is absent, do the work inline when safe or name
the gap and stop; never synthesize a role or pretend delegation occurred.

## Delegation brief

Every delegated link receives exactly these seven fields:

1. **Outcome** — observable result.
2. **Scope** — owned files, systems, or questions.
3. **Inputs** — current evidence and prerequisite artifacts.
4. **Constraints** — safety, compatibility, authority, and non-goals.
5. **Acceptance** — proof required for completion.
6. **Handoff** — expected returned artifact and destination.
7. **Status vocabulary** — `DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT`.

Parallel delegates require disjoint write ownership and no hidden dependency.
The controller reconciles their outputs and remains responsible for route state;
an agent never gains commit, push, deploy, publish, release, or other mutation
authority from delegation alone.

## Status handling

- `DONE`: validate the exit artifact, then advance.
- `DONE_WITH_CONCERNS`: resolve correctness or scope concerns before advancing;
  record observational concerns without inventing failure.
- `BLOCKED`: change evidence, owner, scope, or dependency before retrying.
- `NEEDS_CONTEXT`: supply the missing bounded context before retrying.

Never blindly retry `BLOCKED` or `NEEDS_CONTEXT`. A retry without a material
change preserves the same normalized cause and therefore the same route failure
key.
