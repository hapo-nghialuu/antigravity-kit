# Task R0-03: Game state machine and store

**Requirement:** R0 — Foundation
**Status:** pending
**Priority:** P1
**Estimated Effort:** S
**Dependencies:** task-R0-01-project-scaffolding.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The config mandates a strict 9-step loop that must not skip states. A single state machine + runtime store is the contract every scene depends on.
- **Current state**: module stubs exist from R0-01 (`state/state-machine.js`, `state/game-store.js`).
- **Target outcome**: A `GameStateMachine` enforcing allowed transitions (throws on illegal), and a `game-store` holding runtime state with subscribe/notify, seeded from config `initial_learner_state`.

## Constraints

- **MUST**: Implement the exact states and transitions from `design.md` Canonical Contracts (boot → adventure_map → node_26_selected → lesson_question → answer_selected → feedback → {lesson_question | reward_completion} → save_progress → return_to_map → adventure_map).
- **MUST**: Illegal transitions throw.
- **SHOULD**: Keep store pure (no DOM); expose `getState`, `setState`, `subscribe`, and intent helpers.
- **MUST NOT**: Embed scene/DOM logic or scoring math here.
- **SCOPE**: State + store only.

## Steps

- [ ] 1. Implement `state/state-machine.js`: state enum + allowed-transitions map + `canTransition(from,to)` + `transition(to)` that throws on illegal.
  - <!-- Updated: Red Team F1 --> `transition(to)` is idempotent: when `to === current`, it is a no-op (returns without throwing) so a stray repeat call cannot crash. Only genuinely illegal (non-adjacent) transitions throw.
  - _Requirements: 0.3_
- [ ] 2. Implement `state/game-store.js`: runtime state shape from `design.md` Data Models, seeded from config; `subscribe(listener)` + immutable-ish `update(patch)`.
  - _Requirements: 0.3_
- [ ] 3. Wire `main.js` boot to instantiate store + state machine and expose them to the scene router (router filled by R7-01).
  - _Requirements: 0.3_
- [ ] 4. Unit tests for legal path + representative illegal transitions + initial seed.
  - <!-- Updated: Red Team F1 --> Include a test asserting `transition(current)` is a no-op (no throw).
  - _Requirements: 0.3_

## Requirements

- 0.3 — Canonical 9-state machine with enforced transitions and a config-seeded runtime store.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/state/state-machine.js` | Modify | States + transition guard |
| `src/state/game-store.js` | Modify | Runtime store + subscribe |
| `src/main.js` | Modify | Instantiate + expose to router |
| `test/state-machine.test.js` | Create | Legal/illegal transition tests |

## Completion Criteria

- [ ] All 9 states and their allowed transitions implemented exactly as the contract.
- [ ] Illegal transition throws.
- [ ] Store seeds from config initial learner state and notifies subscribers on update.
- [ ] Unit tests cover legal path + ≥2 illegal transitions + seed.

## Evidence

- [ ] Automated verification
  - Command(s): `npm test -- state-machine`
  - Expected proof: tests pass; illegal-transition test asserts a thrown error; exit 0.
- [ ] Artifact / runtime verification
  - Inspect: `src/state/state-machine.js` transitions map
  - Expect: matches the design contract 1:1.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `src/main.js`
  - Expect: store + state machine instantiated at boot and passed to scene router.
- [ ] Contract / negative-path verification
  - Check: `transition('reward_completion')` from `adventure_map`
  - Expect: throws (skip not allowed).
  - <!-- Updated: Red Team F1 --> Check: `transition(current)` repeat call → no throw (idempotent no-op).

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Transition map diverges from config | Medium | Derive directly from `state_machine` array; unit-test |
| Store coupling to DOM | Low | Keep store pure; scenes subscribe |
