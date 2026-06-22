# Task R1-01: Adventure Map scene

**Requirement:** R1 — Adventure Map Scene
**Status:** pending
**Priority:** P1
**Estimated Effort:** M
**Dependencies:** task-R0-02-asset-generation-pipeline.md, task-R0-03-state-machine-and-store.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The map is the entrypoint of the loop — it shows progress and lets the learner select node 26 to begin the lesson.
- **Current state**: store + state machine (R0-03) and generated map art (R0-02) available; `scenes/map.js` is a stub.
- **Target outcome**: A polished portrait map scene rendering counters, 7 nodes, region labels, 3-destination bottom nav, an idle pulse glow on node 26, and a node-select interaction that drives the state machine to the lesson.

## Constraints

- **MUST**: Render from `game-store` state, not hardcoded values. Use `assets/generated/bg_map.png` + `node_glow.png`.
- **MUST**: Nodes 21–25 completed (3★), 26 active, 27 locked; counters Level 12 / 152 / 7-streak; bottom nav exactly Quests, Practice, Shop.
- **MUST**: Only node 26 starts the lesson; locked/completed nodes are inert.
- **SHOULD**: Use shared `ui/components.js` builders; ARIA labels + keyboard focus on nodes/nav.
- <!-- Updated: Red Team F6 --> **SHOULD**: Place `bg_map.png` over a palette-colored CSS fallback panel so a missing asset degrades to a coloured background rather than a broken image.
- **MUST NOT**: Implement Shop/Practice/Quests content (placeholders only).
- **SCOPE**: Map rendering + node-select intent. Animation timelines are defined in R6-01 but the scene exposes the hook points (node 26 element, bridge path element).

## Steps

- [ ] 1. Implement `scenes/map.js` `mount(root, store, sm)` rendering background, top counters, nodes, region labels, bottom nav.
  - Business intent: learner sees their adventure progress (R1.1, R1.2, R1.7).
  - Code detail: map `store.nodes` → node markers with state classes; counters from `store.learner`.
  - _Requirements: 1.1, 1.2, 1.7_
- [ ] 2. Add idle pulse-glow placeholder element/class on node 26 (timeline attached in R6-01).
  - _Requirements: 1.3_
- [ ] 3. Wire node 26 click/Enter → `sm.transition('node_26_selected')` then `lesson_question`; locked/completed nodes no-op.
  - _Requirements: 1.4, 1.6_
- [ ] 4. Render bottom nav with 3 labeled, focusable destinations (non-functional placeholders).
  - _Requirements: 1.5_
- [ ] 5. Verification: render + interaction checks.
  - _Requirements: 1_

## Requirements

- 1.1 — Top counters Level 12 / 152 stars / 7 streak from learner state.
- 1.2 — Node states 21–25 completed, 26 active, 27 locked.
- 1.3 — Idle pulse glow on active node 26.
- 1.4 — Tap node 26 → node-select anim + transition to lesson.
- 1.5 — Bottom nav with Quests, Practice, Shop.
- 1.6 — Locked/completed nodes do not start the lesson.
- 1.7 — Legible region labels per art direction.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/scenes/map.js` | Modify | Map scene render + interaction |
| `src/ui/components.js` | Modify | Pill/node/nav builders + ARIA |
| `src/styles/main.css` | Modify | Map layout styles |
| `assets/generated/bg_map.png`, `node_glow.png` | Use | Background + node glow |

## Completion Criteria

- [ ] Counters, nodes, labels, and bottom nav render from store state.
- [ ] Node 26 select transitions to the lesson; nodes 21–25 and 27 do not.
- [ ] Node 26 has a visible idle glow hook; bottom nav shows exactly 3 destinations.
- [ ] Nodes and nav are keyboard-focusable with ARIA labels.

## Evidence

- [ ] Automated verification
  - Command(s): `npm run build`
  - Expected proof: build exits 0 with map scene compiled.
- [ ] Artifact / runtime verification
  - Inspect: dev server, Adventure Map scene
  - Expect: matches `assets/screens/01_adventure_map_screen.png` layout; counters/nodes/nav correct.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `scene-router.js` mounts `map.js` on `adventure_map` state (router finalized R7-01)
  - Expect: scene mounts at boot and on return-to-map.
- [ ] Contract / negative-path verification
  - Check: click node 27 (locked) and node 23 (completed)
  - Expect: no transition to lesson.
- [ ] Accessibility verification
  - Check: Tab to node 26 + Enter; nav buttons labeled
  - Expect: keyboard activation works; ARIA labels present.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Node positions drift from art | Medium | Position against reference screen; visual compare |
| Hardcoded state instead of store | Medium | Render strictly from `store` |
