# Plan review — evidence, adversarial lenses, and C2

Review exists to find costly errors before code. It is not a prose-quality
score. Every accepted finding must be reproducible from current repository
evidence.

## B1 — evidence rule

- Cite at least one real `path:line` for every repository claim. A finding
  without a citation is excluded rather than debated.
- Run the search or read command; a plausible-looking citation is not proof.
- When a plan changes a symbol, interface, route, config key, or file contract,
  count and list its callers, tests, exports, help text, and generated copies.
- Replace "update all callers" with the observed count and names. Above ten,
  list the first ten plus the total.
- Label an unresolved external or runtime claim `[UNVERIFIED]` and name the
  command, document, or environment that would settle it.
- Any privacy/security claim names the exact identifier surface at risk, such as an env var, header, path, token class, or field name; generic “sensitive data” is insufficient.

## Reviewer roles

| Role | Question | Required evidence |
|---|---|---|
| Fact Checker | Do named paths, symbols, commands, and keys exist? | search/read output with `path:line` |
| Flow Tracer | Does the claimed call order and error path exist? | entrypoint-to-effect trace, including early returns |
| Scope Auditor | Is new state scoped to the right lifetime and owner? | constructors, writers, cleanup, and existing equivalents |
| Contract Verifier | Are all consumers and compatibility surfaces covered? | caller/test/export/config/help inventory |

Scale the review to the number of independent work groups:

| Groups | Reviewers | Roles | Claim budget |
|---|---:|---|---:|
| 1-2 | 2 | Fact Checker plus the highest-risk role | about 5 per group |
| 3-5 | 3 | Fact Checker, Contract Verifier, one risk role | about 10 per group |
| 6+ | 4 | all roles | at least 15 total |

The table is a sizing guide, not permission to skip a material boundary.

## B2 — fresh-context red team

Use reviewers that did not author the plan and give each one a distinct lens:

- **Security adversary:** authorization bypass, injection, secret exposure,
  unsafe path and trust-boundary transitions.
- **Failure-mode analyst:** race, partial write, crash recovery, retry,
  cancellation, and stale state.
- **Assumption destroyer:** implicit dependencies, unavailable services,
  untested error paths, and claims that something "should" work.
- **Scope and complexity critic:** premature abstraction, duplicated state,
  optional work, and tasks too large for one owner.

Prompt them to break the plan. For every finding require: severity, exact plan
location, concrete counterexample, repository evidence, and the smallest repair.
Ignore style-only feedback.
Run mutation or destructive negative controls only on disposable copies below a verified temporary root, never tracked worktree or canonical source bytes.

## Four red-team lenses

Apply these to the relevant boundary:

1. **Input and identity:** empty, duplicate, malformed, adversarial, stale, and
   cross-tenant inputs.
2. **State transition:** retry, partial completion, reordering, concurrency,
   rollback, and recovery.
3. **Integration:** callers, exports, registration, transport, persistence,
   packaging, and runtime reachability.
4. **Proof:** negative path, exact command, nonzero exit, zero-test result,
   missing artifact, stale provenance, and environment limitation.

Each finding must describe an observable failure, not a preference.

## Aggregate before C2

Normalize duplicate findings by root cause. Preserve the strongest evidence and
smallest counterexample. Sort Critical, High, then Medium. Cap the presented
list at 15; a larger useful set means the plan should be split.

Present C2 as a table:

| ID | Severity | Plan location | Failure scenario | Evidence | Proposed repair | Decision |
|---|---|---|---|---|---|---|

The user chooses accept, reject, or revise. Do not apply findings before that
decision. Record the result in the plan review log.

## Accepted-repair closure

After applying an accepted C2 finding, a fresh-context closure pass records and
freshly replays its original counterexample after the repair under this exact review-log header:

| ID | Decision | Original counterexample | Repaired at | Proved at | Replay | Closure |
|---|---|---|---|---|---|---|

`Repaired at` cites the repair edit; `Proved at` must cite distinct evidence from the fresh replay, never the repair-edit citation.
An accepted finding transitions `accepted → repaired → PASS|FAIL|UNKNOWN`.
Only `PASS` closes it; `FAIL` remains open for the remaining paper-review round; `UNKNOWN` blocks implementation handoff.
A repair that adds user semantics or scope returns to C1.

## B3 — consistency sweep

After any accepted finding or user edit:

1. Reread every file in `specs/<feature>/`.
2. List deltas: renamed terms, changed decisions, removed assumptions, task
   order, ownership, dependencies, acceptance IDs, and commands.
3. Search every delta and its old spelling across the whole feature packet.
4. Reconcile the plan table, task details, examples, acceptance mapping, and
   verification commands.
5. Record: `files reread / deltas / stale references fixed / conflicts left`.

Any unresolved contradiction keeps the plan unready.

## B4 — stop condition

- Allow at most two review-and-repair rounds before implementation.
- Round three requires runtime evidence: an executed test, command output, or
  observed host behavior. More paper argument is not a new finding.
- A repair round should not grow the plan unless evidence proves missing scope.
- Two add-only rounds trigger a split, deferral, or return to C1.
- Stop early when remaining findings are duplicates, preferences, or already
  covered by one acceptance criterion and one verification command.

Review saturation means new reviewers no longer find a distinct material
failure with new evidence. It does not mean the plan is guaranteed correct.
