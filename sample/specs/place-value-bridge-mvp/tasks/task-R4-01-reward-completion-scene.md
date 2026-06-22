# Task R4-01: Reward / Completion scene

**Requirement:** R4 — Reward / Completion Scene
**Status:** pending
**Priority:** P1
**Estimated Effort:** M
**Dependencies:** task-R0-02-asset-generation-pipeline.md, task-R3-01-scoring-and-feedback-engine.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The reward screen makes completion feel celebratory — the payoff of the loop and a key polish surface.
- **Current state**: scoring produces `result {score,stars,xp}`; generated reward art available; `scenes/reward.js` is a stub.
- **Target outcome**: A polished reward scene with banner-drop "Bridge Repaired!", three-star pop reflecting earned tier, +60 XP count-up badge, dominant "Continue Adventure" CTA + "Back to Map" secondary, driving the state machine through `save_progress` → `return_to_map`.

## Constraints

- **MUST**: Read earned stars/xp from `store.result`. Banner = "Bridge Repaired!", message "Great job!", XP count-up to +60.
- **MUST**: "Continue Adventure" is the dominant CTA; "Back to Map" secondary. Either CTA → `save_progress` → `return_to_map`.
- <!-- Updated: Red Team F1 --> **MUST**: On CTA activation, disable both CTAs immediately until the next scene mounts, so a double-tap cannot fire a second transition.
- <!-- Updated: Red Team F5 --> **MUST**: Render exactly three star slots; fill exactly `result.stars` with gold/glow and render the rest empty/dimmed. Pop animation only on filled stars (a 2-star result shows 2 gold + 1 dimmed, never 3 glowing).
- **SHOULD**: Use `assets/generated/bg_reward.png` + `fox_jump.png`/`fox_cheer.png` + `bridge.png` + `star_particle.png`.
- **MUST NOT**: Use casino/gambling reward language (per art guideline `avoid`).
- **SCOPE**: Reward rendering + CTA intents. Banner-drop/star-pop/XP-count-up timelines defined in R6-01; scene exposes the hook elements. Persistence happens in R5-01 on `save_progress`.

## Steps

- [ ] 1. Implement `scenes/reward.js` `mount(root, store, sm)` rendering banner, three stars (earned tier highlighted), XP badge, fox, bridge, CTAs.
  - <!-- Updated: Red Team F5 --> Three fixed star slots; fill `result.stars`, dim the rest.
  - _Requirements: 4.1, 4.2, 4.3, 4.4_
- [ ] 2. Expose hook elements for banner-drop, star-pop, XP count-up (timelines attached in R6-01).
  - _Requirements: 4.1, 4.2, 4.3_
- [ ] 3. Wire both CTAs → `sm.transition('save_progress')` then `return_to_map`.
  - _Requirements: 4.5_
- [ ] 4. Verification: render + CTA transition checks.
  - _Requirements: 4_

## Requirements

- 4.1 — Banner-drop "Bridge Repaired!".
- 4.2 — Three-star pop reflecting earned tier + "Great job!".
- 4.3 — Centered readable XP badge count-up to +60.
- 4.4 — "Continue Adventure" dominant CTA + "Back to Map" secondary.
- 4.5 — CTA → save_progress → return_to_map.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/scenes/reward.js` | Modify | Reward scene render + intents |
| `src/ui/components.js` | Modify | Star/badge/CTA builders + ARIA |
| `src/styles/main.css` | Modify | Reward layout |
| `assets/generated/bg_reward.png`, `fox_jump.png`, `bridge.png`, `star_particle.png` | Use | Reward art |

## Completion Criteria

- [ ] Banner, three stars (earned tier), XP badge, and both CTAs render from `store.result`.
- [ ] Hook elements for banner-drop/star-pop/XP-count-up exist for R6-01.
- [ ] Either CTA transitions through `save_progress` to `return_to_map`.
- [ ] CTAs keyboard-operable with ARIA labels.

## Evidence

- [ ] Automated verification
  - Command(s): `npm run build`
  - Expected proof: build exits 0 with reward scene compiled.
- [ ] Artifact / runtime verification
  - Inspect: dev server, Reward scene
  - Expect: matches `assets/screens/03_reward_completion_screen.png`; banner top, 3 glowing stars, +60 XP, dominant Continue CTA.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `scene-router.js` mounts `reward.js` on `reward_completion` (router finalized R7-01)
  - Expect: scene mounts after correct answer.
- [ ] Contract / negative-path verification
  - Check: activate "Back to Map"
  - Expect: still routes through `save_progress` → `return_to_map` (progress saved either way).
  - <!-- Updated: Red Team F1 --> Check: double-tap "Continue Adventure"
  - Expect: single transition; second tap ignored (CTAs disabled), no error.
  - <!-- Updated: Red Team F5 --> Check: arrive with `result.stars = 2`
  - Expect: exactly 2 gold stars + 1 dimmed slot rendered.
- [ ] Accessibility verification
  - Check: Tab to CTAs + Enter
  - Expect: focus visible, labels present.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| XP/stars not from result | Medium | Render strictly from `store.result` |
| CTA skips save | High | Both CTAs route via `save_progress` |
