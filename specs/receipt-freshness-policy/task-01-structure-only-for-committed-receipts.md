# Task 01 — Structure-only for a committed receipt on a clean tree

Status: pending

## Outcome

The Claude completion gate stops rebinding a receipt once its task file is
committed, unchanged, and the tree outside the specs root is clean. Every other
state keeps today's full provenance binding.

## Scope

- In: the mode selector, the seam in the shared receipt checker that switches
  binding on, the two Claude gate paths that validate done tasks, the tollgate's
  dependency proof and its policy message, and behavioral proof of both modes.
- Out: `provenance.cjs`, which is not modified; the Codex mirror (task 02); rules,
  skill and guide wording (task 03); and the legacy and feature-receipt paths,
  which keep binding.

## Coverage

- CP-01, CP-02, CP-03, CP-05

## Ownership

- Modify: `packages/spec/src/claude/scripts/spec-receipt.cjs`
- Modify: `packages/spec/src/claude/hooks/spec-gate.cjs`
- Modify: `packages/spec/src/claude/hooks/spec-state.cjs`
- Modify: `packages/spec/src/claude/hooks/__tests__/spec-gate.test.js`
- Modify: `packages/spec/bin/__tests__/develop-contract.test.js`
- Modify: `packages/spec/bin/__tests__/specs-v2-execution-closeout.test.js`
- Read: `packages/spec/src/claude/scripts/workflow-policy.cjs`
- Read: `packages/spec/src/claude/scripts/change-firewall.cjs`

## Acceptance

- AC-01: structure-only applies only when all three hold — reading
  `HEAD:<repository-relative task path>` succeeds, those bytes equal the file on
  disk, and `git -C <project root> status --porcelain -- . ':(exclude,literal)<specs root>'`
  is empty. The gate then accepts, and keeps accepting after further commits.
- Every git invocation pins the repository with `-C <project root>`, taken from
  `runtimeContext.project_root`, which both gate paths already supply. A command
  whose root depends on the process working directory is not acceptable: run from
  inside the specs root, an unpinned `-- .` reports an empty status while the tree
  is dirty, which would grant structure-only on a dirty tree. The specs-root
  exclusion uses the `:(exclude,literal)` magic already used by `gitBase`
  (`provenance.cjs:88-91`), so a specs root containing a glob character still
  excludes exactly itself.
- AC-02: every other state keeps full binding, each proved separately: untracked
  task file; staged but not committed; committed then modified, including a change
  only inside `## Receipt`; `HEAD:<task path>` unreadable, covering an unborn
  `HEAD` and a path absent at `HEAD`; and a clean task file with an uncommitted
  change elsewhere outside the specs root.
- The mode selector reads `HEAD:<task path>` through a tri-state helper whose
  `null` result means undetermined and selects binding. The helper lives in
  `spec-receipt.cjs`, modeled on `change-firewall.cjs:187-189`, because that
  function is not exported and its module is scheduled for removal; this task does
  not modify `change-firewall.cjs`.
- AC-03: in structure-only mode every other check keeps its current strength.
  Removing the command, changing it away from the Verification Plan, setting a
  nonzero `Exit`, emptying the output fence, deleting a `Base` or `Head` field,
  adding a second `Status` or `## Receipt`, and editing the bytes of a declared
  artifact each still block. The artifact case is explicit because withholding the
  runtime context also nulls `artifactRoot` and `verifyArtifactBytes`
  (`workflow-policy.cjs:289-292`, `:2021-2036`), so artifact verification must be
  preserved deliberately rather than inherited.
- AC-05: the legacy and feature-receipt paths keep `requireProvenanceBinding: true`.
  The mode reaches `canonicalFailures` (`spec-receipt.cjs:180-186`) only through the
  workflow task path; `checkTaskReceipt` (`:227`) and `checkFeatureReceipt` (`:340`)
  are unchanged. The binding is produced in two places on that path,
  `canonicalFailures` at `:261-265` and the guard at `:269`, and both change together
  or AC-01 cannot pass.
- AC-05 needs a case that can fail. The existing cases in
  `specs-v2-execution-closeout.test.js` only assert that legacy receipts stay valid,
  so loosening `canonicalFailures` for every caller leaves them green; an experiment
  confirmed 9 of 9 still pass under a global loosening. This task therefore adds one
  legacy case that runs with the task file committed and the tree clean, feeds a
  legacy receipt whose `Base` and `Head` do not match the runtime, and asserts the
  returned failures still contain `provenance`. That case fails under a global
  loosening and passes when the mode is confined to the workflow task path.
- Both Claude gate paths use the mode, so `spec-gate.cjs:132-146` and `:237-244`
  cannot disagree, and `workflowDependencyProofState` uses it too, so a task the
  gate accepts is never permanently ineligible as a dependency.
- The tollgate message at `spec-state.cjs:225` states the two modes and the
  clean-tree condition instead of claiming revalidation of every done task.
- The gate cache gains no authority: clearing it changes no decision.

## Dependencies

- none

## Verification Plan

- Command: `node --test packages/spec/src/claude/hooks/__tests__/spec-gate.test.js && node --test packages/spec/bin/__tests__/develop-contract.test.js && node --test packages/spec/bin/__tests__/specs-v2-execution-closeout.test.js`
- Named probe: new cases in `spec-gate.test.js` —
  `committed receipt on a clean tree survives later commits`,
  `untracked task file requires binding`,
  `staged but uncommitted task file requires binding`,
  `modified receipt requires binding`,
  `unreadable HEAD path requires binding`,
  `dirty tree outside specs requires binding`,
  `structure checks still block in committed mode`,
  `edited artifact bytes still block in committed mode`,
  `cleared cache changes no decision`;
  plus the existing `develop-contract.test.js` cases at `:933`, `:943`, `:946`,
  `:1687`, `:1718` and `:1727`, which consume the same APIs, and the six legacy
  receipt cases in `specs-v2-execution-closeout.test.js`, the only suite that
  exercises `checkTaskReceipt` and `checkFeatureReceipt`, which must stay green; and
  the new case `legacy receipt still requires provenance under a clean committed tree`
  added to that file, which is the executable guard for AC-05.
- Reachability: both suites run the real hook or the real module against a
  temporary git fixture. Today's gate fixture only runs `git init` and an empty
  commit (`spec-gate.test.js:61-62`), so it never reaches the committed branch;
  the fixture must stage and commit the task file for the structure-only cases.
  The packet must also be driven through both gate branches explicitly, because a
  packet with an unfinished task resolves to the single active packet
  (`spec-resolver.cjs:901`) and never enters the completed-set branch
  (`spec-resolver.cjs:911-916`).
- Oracle: the gate writes nothing on accept, and a `{"decision":"block"}` payload
  naming the exact task path on block.
- Counterexample: an implementation that treats a staged-but-uncommitted file as
  committed must fail `staged but uncommitted task file requires binding`; one that
  ignores the tree state must fail `dirty tree outside specs requires binding`; one
  that runs the status command without `-C` must fail that same case when the suite
  is invoked from inside the specs root; and one that loosens `canonicalFailures`
  for every caller must fail the new legacy binding case in
  `specs-v2-execution-closeout.test.js`, which asserts a `provenance` failure for a
  legacy receipt under a committed, clean tree. The pre-existing cases in that file
  assert only that valid receipts stay valid, so they cannot detect a loosening and
  are not the guard.
- Artifacts: none; fixture roots are temporary and removed in cleanup.

## Receipt
