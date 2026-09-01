# Chaining patterns

Use a chain only when one link's output is required by another. The default
skeleton is:

```text
understand -> decide -> execute -> verify -> deliver
```

## Link contract

Every retained link must state:

- **Entry:** the evidence or artifact required to start.
- **Exit:** one observable artifact or decision passed forward.
- **Owner:** exactly one installed skill, installed agent, or the controller.

Pass only the exit artifact plus the target, constraints, authority, acceptance,
and unresolved gaps needed by the next owner. For one or two short links, chat
context is enough. For longer or interruption-prone work, use an already
authorized repository artifact; routing never grants permission to create one.

## Collapse and insertion

Remove a link when its exit is already current and evidenced. An explicit valid
skill or one obvious low-risk intent normally collapses to one link. Do not keep
Scout, Brainstorm, Research, Specs, Test, Review, Git, or delivery merely for
ceremony.

Insert a link only for a real modifier:

- unresolved repository shape -> discovery;
- unresolved material choice -> decision;
- implementation or repair -> execution;
- elevated risk or changed behavior -> verification;
- high risk -> independent review and confirmation;
- commit, push, deploy, publish, or release -> delivery, only with matching
  user authority.

## Failure detours and stop

On a failed link, preserve its valid exit evidence, normalize the root cause,
and choose one bounded detour that can change that cause. Track the failure key
as `(link, owner, normalized cause)` within the current chain.

Two failures with the same failure key stop the chain and return `BLOCKED` with
the evidence and missing decision or capability. Different normalized causes do
not share a key and must not stop early merely because the link name matches.
This route-level stop does not replace a separate orchestrator's authoritative
task-retry budget.

No detour may add authority. In particular, review cannot imply push,
diagnosis cannot imply repair, and build cannot imply deploy.
