# Task R6-01: GSAP animations and reduced-motion

**Requirement:** R6 — Animations & Reduced Motion
**Status:** pending
**Priority:** P1
**Estimated Effort:** M
**Dependencies:** task-R1-01-adventure-map-scene.md, task-R2-01-lesson-question-scene.md, task-R4-01-reward-completion-scene.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: "Fully completed animation" is an explicit polish goal. Every config animation cue must be a real GSAP timeline, with an accessible reduced-motion fallback.
- **Current state**: scenes expose hook elements (node 26, tiles, banner, stars, XP badge); `anim/gsap-timelines.js` is a stub.
- **Target outcome**: Named GSAP timeline factories for all five cues, attached by scenes, plus a central `prefers-reduced-motion` gate that swaps movement for opacity/instant changes.

## Constraints

- **MUST**: Implement all cues — `map_node_active` (pulse glow), `node_select` (scale + brighten bridge), `correct_answer` (green glow + star particles + progress advance), `incorrect_answer` (horizontal shake), `reward_enter` (banner drop + three-star pop + XP count-up).
- **MUST**: `prefers-reduced-motion: reduce` → opacity/instant state changes per config `reduced_motion`. Animations non-blocking.
- **SHOULD**: Animate transform/opacity for GPU efficiency; cap concurrent particles for 60fps target (R8).
- **MUST NOT**: Block the loop — learner can proceed once a timeline completes or is reduced.
- **SCOPE**: Animation layer only; scenes already own their DOM.

## Steps

- [ ] 1. Implement `anim/gsap-timelines.js` factories: `mapNodeActive`, `nodeSelect`, `correctAnswer`, `incorrectAnswer`, `rewardEnter`, each returning a GSAP timeline given target elements.
  - _Requirements: 6.1_
- [ ] 2. Add a `prefersReducedMotion()` gate; when true, factories return reduced timelines (opacity/instant, no large movement).
  - _Requirements: 6.2_
- [ ] 3. Attach timelines from scenes: map (pulse/select), lesson (correct/incorrect), reward (reward_enter).
  - _Requirements: 6.1, 6.3_
- [ ] 4. Verify non-blocking: interactions remain available after timeline completion/reduction.
  - _Requirements: 6.3_

## Requirements

- 6.1 — All five animation cues as GSAP timelines.
- 6.2 — Reduced-motion swaps movement for opacity/instant.
- 6.3 — Animations non-blocking.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/anim/gsap-timelines.js` | Modify | Named timeline factories + reduced gate |
| `src/scenes/map.js` | Modify | Attach pulse/select timelines |
| `src/scenes/lesson.js` | Modify | Attach correct/incorrect timelines |
| `src/scenes/reward.js` | Modify | Attach reward_enter timeline |

## Completion Criteria

- [ ] All five cues animate via GSAP in normal mode.
- [ ] Reduced-motion mode replaces large movement with opacity/instant changes.
- [ ] Animations do not block progression.
- [ ] Pulse glow, node select, correct/incorrect feedback, and reward entrance are visibly correct.

## Evidence

- [ ] Automated verification
  - Command(s): `npm run build`
  - Expected proof: build exits 0; timeline factory module imported by all three scenes.
- [ ] Artifact / runtime verification
  - Inspect: dev server — observe node 26 pulse, select scale, correct green glow + particles, wrong shake, reward banner/star/XP.
  - Expect: each cue matches the config description.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `scenes/{map,lesson,reward}.js` import and call the factories
  - Expect: timelines attached on the real scene lifecycle, not dead code.
- [ ] Contract / negative-path verification
  - Check: emulate `prefers-reduced-motion: reduce` (DevTools rendering) and replay the loop
  - Expect: no large movement; opacity/instant transitions; loop still completes.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Jank on low-end mobile | Medium | transform/opacity, cap particles |
| Reduced-motion not honored | High | Central gate + DevTools verification |
| Blocking timeline stalls loop | Medium | Non-blocking design; proceed on complete |
