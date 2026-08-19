# Capability dispatch patterns

Load this optional reference only when a task benefits from independent
inspection, implementation, verification, review, or docs capability. Runtime
role names are configuration, not workflow policy.

## Dispatch packet

Every dispatch includes:

- work context and reports/plans paths;
- exact task outcome, scope, acceptance, and dependencies;
- owned read/write paths and explicit exclusions;
- risk, blast radius, stop conditions, and required evidence;
- expected status and handoff format.

Use one capability per concrete responsibility. The runtime may map it to an
available local role, but that mapping cannot add scope or weaken proof.

## Independence and ownership

- Inspection traces entrypoints and risks without editing source.
- Implementation edits only granted paths and does not write task state.
- Verification is the sole producer of executable proof.
- Review consumes proof and reports findings without claiming execution.
- Documentation starts only after a real docs-impact decision.
- The controller alone writes Status and inline Receipt.

A specific-task invocation ends after that task. Full-feature execution may
continue only after the current task is synchronized and the next dependency
set is recomputed.

## Safe fallback

If a required capability or isolated workspace is unavailable, record BLOCKED
or run only a permitted main-session check. Never silently substitute an actor
for an independence requirement. A PENDING, BLOCKED, or provenance-free result
cannot be normalized to PASS.

## Legacy workflow compatibility

When the selected packet is legacy, include its persisted lane snapshot and
obligations in the dispatch, but do not let workers edit that state or infer an
independent result from a role label.
