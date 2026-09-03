---
name: cf:loop
description: "Run an explicit, bounded optimization loop against a numeric metric while a separate correctness guard protects the result."
user-invocable: true
when_to_use: "Use only when the user explicitly requests measurable iterative optimization and supplies a safe Metric and Guard contract."
category: utilities
keywords: [loop, optimization, benchmark, metric, experiment]
argument-hint: "<goal>"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Loop — bounded metric optimization

Loop is explicit-only. Never auto-route ordinary implementation, debugging, or
research into Loop. It optimizes one numeric outcome under a separate correctness
Guard; it does not guarantee improvement or replace Test/Review.

Live-agent adherence to this written contract is `[UNPROVEN]` without a host run.
The safety boundary is cooperative: commands must already be trusted by the user
or repository. No instruction-only workflow can contain a malicious executable
without an OS sandbox.

## 1. Preflight before mutation

Load `references/metric-and-guard-contract.md` and freeze every field before any
worktree, process, patch, or file mutation:

- Goal and canonical repository root.
- Scope: contained regular tracked text paths; symlink, untracked, binary, and
  submodule policy. Default is reject each unsupported kind.
- Pinned base OID plus primary tracked/untracked status. Reject dirty in-scope
  state; record but never import or clean out-of-scope dirt.
- Metric argv, unit, `higher|lower`, sample count, IEEE-754 binary64 numeric and
  rounding policy, fixed aggregation/noise rule, minimum delta, timeout, and
  reproducible baseline environment.
- Distinct immutable Guard argv and timeout for code mutation. Metric and Guard
  may not be the same command or validate the same sole outcome.
- Frozen positive iteration and wall-clock budgets; explicit success,
  no-improvement, drift, failure, timeout, and cancellation stops.
- Unique run identity, exact disposable root, ownership marker, upfront cleanup
  consent, handoff mode/destination, retention, and cleanup owner.

Missing, ambiguous, unsafe, or non-reproducible input returns `BLOCKED` without
mutation. A subjective score, a metric that can be edited by the loop, or code
mutation without a distinct Guard is ineligible.

## 2. Establish isolation and baseline

Load `references/bounded-loop-protocol.md`. Create a never-reused canonical temp
root and ownership marker, then add a detached Git worktree at the pinned OID.
Do not create a branch or commit. Necessary common-Git-dir worktree metadata is
the only allowed primary-repository metadata effect; primary worktree bytes,
index, branch, and refs remain untouched.

Screen each trusted command as an argv vector and run it with `cwd` fixed to the
canonical detached root. The executable is a separately approved external
realpath; only path-valued target arguments must resolve inside the detached
root. Never use `eval`, `sh -c`, `bash -c`, `zsh -c`,
`cmd /c`, PowerShell `-Command`, inline interpreter code, Git `-C`, `--git-dir`,
`--work-tree`, destructive Git operations, path traversal, or an absolute target
outside the detached root. Use a minimal fixed environment and redact secrets.

Capture the complete detached-worktree tracked/untracked manifest before and
after every Metric and Guard run, subtracting only an exact immutable cache
allowlist frozen at preflight. Any other oracle mutation is drift. Establish
baseline samples on pinned bytes before allowing a candidate.

## 3. Iterate one attributable change

For every iteration:

1. Create a fresh unique detached worktree from pinned base and apply only the
   accepted-best patch, if one exists. Never restore in place.
2. Make exactly one bounded hypothesis change inside Scope. Multiple unrelated
   changes are forbidden. Reject unexpected,
   untracked, binary, symlink, submodule, or out-of-scope bytes.
3. Fingerprint candidate bytes, run Metric samples, fingerprint again, then run
   Guard on those identical bytes and fingerprint once more.
4. Reject on nonzero exit, timeout, malformed/non-finite/multi-value output,
   oracle mutation, Guard failure, or any source/environment/contract drift.
5. Accept only when Guard passes and improvement over current best is strictly
   greater than both the frozen minimum delta and calculated noise threshold.
   Record the candidate as a base-bound accepted-best patch; otherwise discard
   only that iteration's owned disposable environment.

Do not edit Metric, Guard, tests, benchmarks, datasets, budgets, or thresholds
to win; their frozen digests are revalidated before every candidate.
Stop at the first budget, cancellation, drift, ownership, cleanup, or repeated
no-improvement condition named in preflight.

## 4. Failure and process ownership

Launch every command in an isolated process group on POSIX or Job Object on
Windows. If the runtime cannot terminate the whole process tree, refuse to run.
On timeout/cancel, terminate, escalate to kill, reap, and verify quiescence before
cleanup. Never reuse a timed-out path. If descendants, path ownership, or cleanup
is uncertain, retain exact residue and return `BLOCKED`; never use
`git reset --hard`, `git clean`, broad deletion, or unrelated recovery.

## 5. Handoff

Return baseline, best value/noise, the exact keep formula, accepted/rejected
iteration ledger, Guard evidence, stop reason, remaining limits, and live-proof
status. A successful handoff is a redacted tracked-text patch bound to base OID,
complete scoped file manifest, and lowercase SHA-256. Reject secret-bearing,
untracked, binary, incomplete, or stale output unless a separately approved
bundle contract exists.

Use only the preflight-selected handoff mode: inline ephemeral patch, or an exact
user-approved path outside the primary worktree with retention and cleanup owner.
Never apply, commit, push, merge, cherry-pick, deploy, publish, or write an
artifact into the primary worktree implicitly. The user reviews and explicitly
authorizes any later application through the normal Develop/Test/Review flow.
