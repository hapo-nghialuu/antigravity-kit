# Bounded Loop protocol

This is a cooperative instruction contract, not a sandbox or a production
runtime. Live-agent adherence remains `[UNPROVEN]` until separately observed.

## Run identity and filesystem boundary

1. Resolve the repository root and pinned base OID without changing checkout.
2. Capture primary tracked and untracked status. Reject any dirty path that is
   inside Scope; never import, stash, clean, or overwrite primary dirt.
3. Create a unique temp directory using the platform's secure temp API. Resolve
   its lexical and canonical path, require it outside the repository, and refuse
   a symlink, pre-existing reused run path, broad root, or ownership ambiguity.
4. Write an ownership marker containing a random run ID, base OID, canonical
   root, and creation time. Acquire one exclusive run lock; contention blocks.
5. With upfront consent for this exact path, use `git worktree add --detach`
   against the pinned OID. Do not use `-b`, create refs, or commit.

Every later path must be a lexical and canonical descendant of the owned root.
Reject `..`, symlink traversal, mount redirection, absolute external targets,
submodules, and paths that changed identity after validation.

## Command trust and screening

Commands are supplied or already owned by the trusted repository/user. Record
the separately trusted/allowlisted executable realpath (which may be outside the
worktree), argv, fixed cwd, timeout, output limit, and allowlisted
environment before execution. Do not pass secrets; redact credentials, tokens,
cookies, authorization headers, PII, and secret-looking patch lines from reports.

Refuse general shell evaluation, inline code flags, Git external targeting
(`-C`, `--git-dir`, `--work-tree`), destructive Git (`reset --hard`, `clean`,
branch/ref deletion), recursive deletion, privilege escalation, deploy/publish,
and any path-valued target argument that resolves outside the detached root,
including response/config/output targets. Do not apply the target-path rule to
the separately approved executable itself. A trusted script file may run through
its declared interpreter, but inline `-c`, `-e`, `--eval`, and equivalent dynamic
code are forbidden.

This screening reduces mistakes; it cannot contain arbitrary side effects from
a malicious or compromised executable. If that threat is material, return
`BLOCKED` and require an OS sandbox outside this skill's scope.

## Iteration lifecycle

- Revalidate base OID, primary status, contract digests, lock, ownership marker,
  and canonical roots before every iteration.
- Build a new never-reused detached worktree from pinned base plus the current
  accepted-best tracked-text patch. Do not repair a rejected candidate in place.
- Capture a complete Scope manifest of path, type, mode, size, and SHA-256 before
  mutation; lstat paths and reject symlink/type/identity changes.
- Permit one hypothesis patch. Its post-change manifest must be contained in
  Scope and attributable to that hypothesis.
- Capture the complete detached-worktree tracked/untracked fingerprint around
  every Metric and Guard command. Subtract only exact immutable cache paths
  frozen at preflight; every other oracle-created file or byte/mode/type/path
  change, inside or outside Scope, rejects the candidate as drift.
- Record command exit/signal/timeout, bounded redacted output, raw finite samples,
  median/noise, Guard verdict, patch digest, and keep/discard reason.

Parallel iterations are forbidden: one run, one lock, one candidate at a time.
An external source/base/contract change stops the run; it never triggers an
automatic rebase, new baseline, threshold change, or wider Scope.

## Process-tree timeout and cancellation

Spawn a new process group on POSIX or Job Object on Windows. On timeout or user
cancellation, stop scheduling, terminate the whole tree, wait the frozen grace
period, escalate to kill, reap, and verify no owned descendant remains. The run
path is permanently retired after timeout.

If the platform cannot own/observe descendants, termination fails, a process
survives, or quiescence cannot be proven, do not clean. Preserve the exact path,
PID/process evidence, and ownership marker; return `BLOCKED` for operator action.

## Cleanup and recovery

Clean only a canonical path whose run ID, lock, marker, base OID, and inode/path
identity still match the run and whose process tree is quiescent. Release the
detached worktree through Git, then remove only that exact temp root using the
pre-approved cleanup action. Never broaden a glob or follow a symlink.

No `git reset --hard`, `git clean`, force checkout, stash, branch deletion,
primary-index edit, or unrelated recovery is permitted. Cleanup uncertainty is
a retained residue plus `BLOCKED`, not a reason to become more destructive.

## Patch handoff

Default handoff supports tracked regular UTF-8 text files only. Generate a
reviewable unified patch against the pinned base, then bind:

- `base_oid`;
- sorted complete Scope manifest before/after with file SHA-256;
- patch byte length and lowercase SHA-256;
- Metric/Guard contract digests and evidence;
- accepted/rejected iteration ledger and stop reason;
- secret/redaction scan result;
- mode: inline ephemeral, or exact approved external path;
- creation time, retention/expiry, cleanup owner, and application authority.

Reject missing/untracked/binary/symlink/submodule/secret-bearing/incomplete or
stale patch bytes. Never store the artifact in the primary worktree implicitly.
Never apply or commit it. A later authorized workflow revalidates base, patch,
tests, review, and current repository state before application.
