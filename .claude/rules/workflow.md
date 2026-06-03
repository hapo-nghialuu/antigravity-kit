# Execution Workflow

Use the CafeKit loop: **Understand -> Plan -> Execute -> Verify -> Sync**.

## 1. Understand

- Read `./README.md` before feature planning or coding.
- Read the active spec/task file when one exists.
- Read and activate any CafeKit skill that likely applies before taking action.
- Inspect only the code needed to understand the affected area.
- Use `inspect` or focused search when structure is unclear.

## 2. Plan

- For non-trivial features, use `/specs` to create or validate the spec.
- For approved specs, work one task file at a time.
- Extract from the active task:
  - `Context`
  - `Steps`
  - `Requirements`
  - `Related Files`
  - `Completion Criteria`
  - `Evidence`
- If these are missing or too vague to verify, route back to spec correction.

## 3. Execute

- Implement only the active scope.
- Modify existing files directly; do not create duplicate "enhanced" variants.
- Keep named contracts from `design.md` intact.
- Do not use placeholder wiring, process-local stand-ins, or fake adapters as completion proof.

## 4. Verify

- Run exact commands from `Evidence` first.
- Then run repo-level lint/test/build as needed for confidence.
- Use only fresh verification from the current run when claiming completion.
- `PRECHECK_FAIL` outranks `NO_TESTS`.
- `NO_TESTS` or `0 tests + exit 0` is not a pass when automated tests are required.
- If verification fails, fix root cause and rerun. After 3 failed attempts, escalate with evidence.

## 5. Sync

- Mark task state only after implementation, tests/evidence, and review pass.
- Write a verification receipt with commands run, outcomes, and artifact/runtime proof.
- Keep `spec.json.task_registry` and markdown task files aligned.
- Run docs checkpoint when a completed task affects public docs or architecture docs.

## Production Or CI Issues

1. Capture the failing signal.
2. Diagnose root cause with logs/tests.
3. Implement the smallest fix.
4. Rerun the failing check plus relevant regression checks.
5. Review before syncing or shipping.

Do not patch symptoms before diagnosis unless the issue is a trivial syntax/type/lint failure with an obvious local cause.
