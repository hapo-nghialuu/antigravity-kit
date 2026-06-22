# Task R5-01: Progress persistence and node unlock

**Requirement:** R5 — Progress Persistence & Node Unlock
**Status:** pending
**Priority:** P1
**Estimated Effort:** S
**Dependencies:** task-R0-03-state-machine-and-store.md, task-R4-01-reward-completion-scene.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: Acceptance requires node 27 to become available after completing node 26 — this needs durable progress without a backend.
- **Current state**: reward scene transitions to `save_progress`; `state/persistence.js` is a stub.
- **Target outcome**: On `save_progress`, persist updated learner state + node states to localStorage; on boot, load (corrupt-safe) and seed the store; on return to map, node 26 = completed and node 27 = available, counters updated.

## Constraints

- **MUST**: Versioned key `mathquest:save:v1`, shape per `design.md` Persistence Contract. Corrupt/missing load → fall back to config `initial_learner_state` without crashing.
- **MUST**: On save: XP += 60, stars += earned, node 26 → completed, node 27 → available (locked removed).
- <!-- Updated: Red Team F3 --> **MUST**: Idempotent award — gate the XP/stars addition on `nodes["26"] !== "completed"`. A repeat `save_progress` for an already-completed node 26 persists without re-adding XP/stars.
- <!-- Updated: Red Team F4 --> **MUST**: `level` is a static stored counter; do NOT derive or mutate it from XP for this slice.
- <!-- Updated: Red Team / validation --> **SHOULD**: On boot with `?reset` query param, clear the save and re-seed from config initial state (dev/QA convenience for repeatable walkthroughs).
- **SHOULD**: Keep `persistence.js` pure (inject storage for testability).
- **MUST NOT**: Store any PII; only game progress.
- **SCOPE**: Persistence + unlock logic + map re-render reflection.

## Steps

- [ ] 1. Implement `state/persistence.js` `load(storage)` (corrupt-safe → null) and `save(storage, state)`.
  - _Requirements: 5.1, 5.3_
- [ ] 2. On `save_progress`: compute new learner/node state, persist, update store.
  - <!-- Updated: Red Team F3 --> Guard the XP/stars award behind `nodes["26"] !== "completed"` so re-entry does not inflate totals.
  - _Requirements: 5.1, 5.4_
- [ ] 3. On boot (`main.js`): load save or seed from config; pass to store.
  - <!-- Updated: validation --> Support `?reset` query param → clear save + seed from config.
  - _Requirements: 5.3_
- [ ] 4. Ensure map re-mount reflects node 26 completed + node 27 available + updated counters.
  - _Requirements: 5.2, 5.4_
- [ ] 5. Unit tests: save round-trip, corrupt fallback, unlock transition.
  - <!-- Updated: Red Team F3 --> Add a test: two consecutive saves for node 26 award XP/stars only once (idempotent).
  - _Requirements: 5.1, 5.3_

## Requirements

- 5.1 — Persist updated state on save_progress under versioned key.
- 5.2 — Map re-mount shows node 26 completed + node 27 available.
- 5.3 — Boot loads save; corrupt/missing → config fallback.
- 5.4 — Top counters reflect awarded rewards on return.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/state/persistence.js` | Modify | load/save, corrupt-safe |
| `src/main.js` | Modify | Boot load + seed |
| `src/scenes/map.js` | Modify | Reflect unlock + counters on re-mount |
| `test/persistence.test.js` | Create | Round-trip + corrupt + unlock |

## Completion Criteria

- [ ] Save writes versioned key with correct learner/node deltas.
- [ ] Boot loads save; corrupt/missing falls back to config without crash.
- [ ] After completion + return, node 27 is available and node 26 completed.
- [ ] Counters reflect +60 XP and earned stars.

## Evidence

- [ ] Automated verification
  - Command(s): `npm test -- persistence`
  - Expected proof: round-trip test passes; corrupt-JSON test returns fallback (no throw); unlock test asserts node 27 available; exit 0.
- [ ] Artifact / runtime verification
  - Inspect: complete the loop, reload page, open Application → localStorage
  - Expect: `mathquest:save:v1` present; map shows node 27 unlocked after reload.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `main.js` boot calls `persistence.load`; `save_progress` handler calls `persistence.save`
  - Expect: both invoked on the real loop path.
- [ ] Contract / negative-path verification
  - Check: set `mathquest:save:v1` to `"{ broken"` then boot
  - Expect: app boots from config initial state, no crash.
  - <!-- Updated: Red Team F3 --> Check: trigger `save_progress` twice for node 26
  - Expect: XP/stars added once only; no inflation.
  - <!-- Updated: validation --> Check: boot with `?reset`
  - Expect: save cleared, node 26 active again.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Corrupt save crashes boot | Medium | try/catch + schema guard → config fallback |
| Unlock not reflected on re-mount | Medium | Map renders from store; re-read after save |
