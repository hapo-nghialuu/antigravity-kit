# Task R7-01: Integration and acceptance verification

**Requirement:** R7 — Integration, Accessibility & Acceptance
**Status:** pending
**Priority:** P1
**Estimated Effort:** S
**Dependencies:** task-R5-01-progress-persistence-and-unlock.md, task-R6-01-gsap-animations-and-reduced-motion.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: This is the final reachability + acceptance gate — it wires every scene through one entrypoint and proves the full slice satisfies all six configured acceptance criteria.
- **Current state**: all scenes, scoring, persistence, and animations exist; `scenes/scene-router.js` + `main.js` boot need final wiring.
- **Target outcome**: A single `main.js` boot drives the scene router across the full 9-state loop; the happy path (436 → +60 XP, three stars → node 27 available) works end-to-end and accessibly.

## Constraints

- **MUST**: One entrypoint (`main.js`) + `scene-router.js` mounting/unmounting scenes by state. No manual code edits needed to traverse the loop.
- **MUST**: Complete the full 9-state sequence for the happy path; Hint/Help/Read present + operable; all six config `acceptance_criteria` satisfied; approved polished assets on every screen.
- **SHOULD**: Add a concise acceptance checklist artifact mapping each criterion to observed proof.
- **MUST NOT**: Leave any scene unreachable or any acceptance criterion unverified.
- **SCOPE**: Router wiring + end-to-end acceptance verification. No new features.

## Steps

- [ ] 1. Implement `scenes/scene-router.js` subscribing to state-machine transitions, mounting the matching scene and unmounting the previous.
  - _Requirements: 7.1_
- [ ] 2. Finalize `main.js` boot: load persistence → seed store → start state machine at `boot` → `adventure_map`.
  - _Requirements: 7.1, 7.2_
- [ ] 3. Walk the full happy path and record proof for each of the six acceptance criteria.
  - _Requirements: 7.2, 7.4_
- [ ] 4. Verify Hint/Help/Read keyboard + screen-reader operability across the loop.
  - _Requirements: 7.3_
- [ ] 5. Write `specs/place-value-bridge-mvp/reports/acceptance-checklist.md` mapping criteria → evidence.
  - _Requirements: 7.4_

## Requirements

- 7.1 — Single entrypoint + scene router; full loop reachable.
- 7.2 — Full 9-state sequence completes for happy path.
- 7.3 — Hint/Help/Read operable via keyboard + labels.
- 7.4 — All six acceptance criteria satisfied + polished assets everywhere.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/scenes/scene-router.js` | Modify | Mount/unmount by state |
| `src/main.js` | Modify | Final boot wiring |
| `specs/place-value-bridge-mvp/reports/acceptance-checklist.md` | Create | Criteria → evidence map |

## Completion Criteria

- [ ] Booting the app and playing reaches map → lesson → reward → map with no manual edits.
- [ ] Correct answer 436 → +60 XP + three stars → node 27 available after return/reload.
- [ ] All six config `acceptance_criteria` verified with recorded proof.
- [ ] Hint/Help/Read operable by keyboard; scenes use approved polished assets.

## Evidence

- [ ] Automated verification
  - Command(s): `npm run build && npm test`
  - Expected proof: build exits 0; all unit suites (scoring/state-machine/persistence) pass.
- [ ] Artifact / runtime verification
  - Inspect: full dev-server playthrough + `reports/acceptance-checklist.md`
  - Expect: every acceptance criterion marked satisfied with a concrete observation.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `index.html` → `src/main.js` → `scene-router.js`
  - Expect: every scene (map/lesson/reward) is mounted by the router on its state; none orphaned.
- [ ] Contract / negative-path verification
  - Check: wrong-then-correct path + reload after completion
  - Expect: retry works, hearts decrement, node 27 stays unlocked after reload.
- [ ] Accessibility verification
  - Check: full keyboard-only playthrough
  - Expect: all interactive controls reachable/operable with visible focus + labels.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Scene left unreachable | High | Router-driven mounting verified per state |
| Acceptance criterion missed | High | Explicit checklist artifact mapping all six |
| Keyboard trap in a scene | Medium | Keyboard-only playthrough verification |
