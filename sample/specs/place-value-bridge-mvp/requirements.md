# Requirements — Place Value Bridge MVP

**Feature**: `place-value-bridge-mvp`
**Format**: EARS (Easy Approach to Requirements Syntax)
**Source of truth**: `json/mathquest_mvp_implementation_config.json`, `json/mathquest_ai_agent_art_guideline.json`

> Foundation work (scaffolding, asset pipeline, state machine) is tracked as R0 tasks and is a prerequisite for all functional requirements below. R0 has no standalone acceptance requirement; it is validated through R1–R7.

---

## R1: Adventure Map Scene

**User story**: As a learner, I want to see my Star Trail adventure map with my progress and select the active node, so that I can start the next lesson.

- **R1.1** WHEN the Adventure Map scene mounts, THE SYSTEM SHALL render the top counters showing Level 12, 152 stars, and a 7-day streak from the learner state.
- **R1.2** THE SYSTEM SHALL render nodes 21–25 as completed (3 stars each), node 26 as active, and node 27 as locked, matching the configured node states.
- **R1.3** WHILE the map is idle, THE SYSTEM SHALL display a pulsing glow animation on the active node 26 so it is visually dominant.
- **R1.4** WHEN the learner taps node 26, THE SYSTEM SHALL play the node-select animation (scale node + brighten bridge path) and transition the state machine to `node_26_selected` then `lesson_question`.
- **R1.5** THE SYSTEM SHALL render the bottom navigation with exactly three visible destinations: Quests, Practice, Shop.
- **R1.6** WHEN the learner taps a locked node (27) or a completed node (21–25), THE SYSTEM SHALL NOT start the place-value lesson.
- **R1.7** THE SYSTEM SHALL render world/region labels (e.g., Number Meadow, Fraction Lagoon, Shape Castle) legibly per the art direction.

## R2: Lesson / Question Scene

**User story**: As a learner, I want to answer the place-value question with helpful supports, so that I can complete the lesson.

- **R2.1** WHEN the Lesson scene mounts, THE SYSTEM SHALL display the topic "Place Value", the objective, progress "4 / 10", and hearts (2 filled, 1 empty) from config.
- **R2.2** THE SYSTEM SHALL render the question "Which number is 400 + 30 + 6?" as the visual priority with large readable numerals.
- **R2.3** THE SYSTEM SHALL render four answer tiles (436, 463, 406, 346) as large tap targets, with 436 marked as the correct choice internally.
- **R2.4** WHEN the learner selects an answer tile, THE SYSTEM SHALL transition to `answer_selected` and evaluate correctness against the configured `correct` flag.
- **R2.5** THE SYSTEM SHALL render Hint, Help, and Read support controls anchored at the bottom, each keyboard-operable and labeled.
- **R2.6** WHEN the learner activates Hint, THE SYSTEM SHALL reveal the configured hint text ("Think about the hundreds, tens and ones.") and flag the attempt as hinted for scoring.
- **R2.7** WHERE no answer has been selected, THE SYSTEM SHALL keep all tiles in their neutral (non-feedback) visual state.

## R3: Scoring & Feedback Engine

**User story**: As a learner, I want immediate feedback and a fair score, so that effort and accuracy are rewarded.

- **R3.1** WHEN the learner selects the correct answer (436), THE SYSTEM SHALL play the correct-answer feedback (green glow, star particles, progress bar advance) and transition to `feedback`.
- **R3.2** WHEN the learner selects an incorrect answer, THE SYSTEM SHALL play the incorrect-answer feedback (short horizontal shake + supportive retry) and allow another attempt without leaving the lesson.
- **R3.3** THE SYSTEM SHALL compute stars and score from the attempt history using the configured `scoring_rules`: first_try (10/3★), after_hint (7/2★), after_one_incorrect (5/2★), after_multiple_incorrect (3/1★).
- **R3.4** WHEN an incorrect answer is chosen, THE SYSTEM SHALL decrement one filled heart in the lesson HUD, clamped at a floor of 0. Hearts are advisory/visual only and SHALL NOT block completion; there is no fail/game-over state (validation decision: hearts advisory).
- **R3.5** WHEN the question is answered correctly, THE SYSTEM SHALL advance lesson progress and transition toward `reward_completion`.
- **R3.6** THE SYSTEM SHALL award completion XP of 60 on successful completion regardless of star tier.

## R4: Reward / Completion Scene

**User story**: As a learner, I want a celebratory reward screen, so that completing the lesson feels rewarding.

- **R4.1** WHEN the Reward scene mounts, THE SYSTEM SHALL play the banner-drop animation showing "Bridge Repaired!".
- **R4.2** THE SYSTEM SHALL render exactly three star slots, filling exactly `result.stars` (1–3) with the gold/glowing style and rendering remaining slots as empty/dimmed, with the pop animation playing only on filled stars, alongside the "Great job!" message.
- **R4.3** THE SYSTEM SHALL display a centered, readable XP badge animating a count-up to +60 XP.
- **R4.4** THE SYSTEM SHALL render "Continue Adventure" as the dominant CTA and "Back to Map" as the secondary CTA.
- **R4.5** WHEN the learner activates either reward CTA, THE SYSTEM SHALL transition through `save_progress` to `return_to_map`.

## R5: Progress Persistence & Node Unlock

**User story**: As a learner, I want my progress saved, so that completing node 26 unlocks node 27.

- **R5.1** WHEN the state machine enters `save_progress` for the first time on node 26 (`nodes["26"] !== "completed"`), THE SYSTEM SHALL persist updated learner state (XP +60, stars +earned, node 26 → completed, node 27 → available) to localStorage under a versioned key. WHEN `save_progress` runs again for an already-completed node 26, THE SYSTEM SHALL persist without re-adding XP or stars (idempotent award).
- **R5.2** WHEN the Adventure Map scene re-mounts after a completion, THE SYSTEM SHALL render node 26 as completed and node 27 as available (no longer locked).
- **R5.3** WHEN the app boots, THE SYSTEM SHALL load any persisted save and fall back to the configured initial learner state if none exists or the save is corrupt. WHEN booted with a `?reset` query param, THE SYSTEM SHALL clear the save and re-seed from the configured initial state (dev/QA convenience).
- **R5.4** THE SYSTEM SHALL update the top counters (stars and XP) on return to map to reflect the awarded rewards. `level` is a static stored counter and SHALL NOT change from a single lesson (no XP-derived level formula).

## R6: Animations & Reduced Motion

**User story**: As a learner (including motion-sensitive users), I want polished but accessible animations, so that the experience is delightful and safe.

- **R6.1** THE SYSTEM SHALL implement every animation cue in the config (`map_node_active`, `node_select`, `correct_answer`, `incorrect_answer`, `reward_enter`) as GSAP timelines.
- **R6.2** WHERE the user agent reports `prefers-reduced-motion: reduce`, THE SYSTEM SHALL replace large movement with opacity/instant state changes per the configured `reduced_motion` rule.
- **R6.3** THE SYSTEM SHALL ensure all feedback and reward animations are non-blocking (the learner can proceed once the timeline completes or is reduced).

## R7: Integration, Accessibility & Acceptance

**User story**: As a stakeholder, I want the full slice playable end-to-end and accessible, so that the MVP meets its acceptance criteria.

- **R7.1** THE SYSTEM SHALL wire all scenes through a single entrypoint + scene router so the full loop (boot → map → lesson → reward → map) is reachable without manual code edits.
- **R7.2** THE SYSTEM SHALL complete the full 9-state machine sequence end-to-end for the happy path (correct answer 436 → +60 XP, three stars → node 27 available).
- **R7.3** THE SYSTEM SHALL keep Hint, Help, and Read controls present and operable via keyboard and screen-reader labels.
- **R7.4** THE SYSTEM SHALL satisfy all six configured `acceptance_criteria` and present the approved polished asset direction on every screen.

---

## Non-Functional Requirements

- **R8 (Performance)**: THE SYSTEM SHALL target 60fps on the animation timelines on a mid-range mobile browser by using transform/opacity-based animation and capping concurrent particle counts. *(Verified within R6/R7 runtime checks.)*
- **R9 (Accessibility)**: THE SYSTEM SHALL maintain ≥4.5:1 text contrast, ≥44×44px interactive tap targets, visible focus states, and ARIA labels on all interactive controls. *(Verified within R1/R2/R7.)*
- **R10 (Reliability)**: THE SYSTEM SHALL guard against corrupt/missing localStorage by falling back to the configured initial state without crashing. *(Verified within R5.)*

> NFRs R8–R10 are validated through the functional task evidence (R1, R2, R5, R6, R7) and do not have standalone task files.

## Unresolved Questions
- None blocking. gpt-image-2 asset acceptance is a visual-review gate handled in R0-02, not a requirements gap.
