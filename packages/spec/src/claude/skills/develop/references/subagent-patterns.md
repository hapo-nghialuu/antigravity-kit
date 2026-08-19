# Capability dispatch patterns

This reference is optional. Load it only when the persisted lane requires
independent capability work. Role names are runtime configuration, not workflow
policy: resolve them from the installed catalog instead of hardcoding an actor
name or a sequence in a skill.

## Dispatch contract

Every dispatch prompt includes:

- Work context: the git root of the primary files;
- Reports path: `<work-context>/plans/reports/`;
- Plans path: `<work-context>/plans/`;
- exact task/scope and owned files;
- lane snapshot, risk/blast-radius obligations, and stop conditions;
- required output, evidence, and status.

Use a capability request such as:

```text
dispatch(capability="inspection|implementation|verification|review|docs",
  work_context="<root>",
  scope="<task or feature>",
  owned_files=["<paths>"],
  obligations=["<persisted obligations>"],
  output="<required packet and evidence>")
```

The runtime may map a capability to a local role. That mapping must not change
the lane, add ceremony, or become a new persisted policy field.

## Independence and ownership

- Inspection may report entrypoints and blast radius but does not edit source.
- Implementation edits only the active task scope and does not sync state.
- Verification is the sole producer of canonical execution proof.
- Review consumes proof and reports correctness/security/spec findings only.
- Documentation work is invoked only after a real docs-impact decision.

Specific-task mode ends after one task. Full-feature mode may continue only
after the closeout owner synchronizes the current task and finds another
unblocked task. A capability result marked `PENDING`, `BLOCKED`, or lacking
provenance cannot be converted into PASS by the controller.

## Safe fallback

If the required capability or isolated workspace is unavailable, keep the
workflow in `BLOCKED` or run the permitted main-session check. Do not substitute
a model, profile, or actor silently, and do not claim an independent result
without an actually independent execution.
