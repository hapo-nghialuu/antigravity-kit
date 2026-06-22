# Task R2-01: Lesson / Question scene

**Requirement:** R2 — Lesson / Question Scene
**Status:** pending
**Priority:** P1
**Estimated Effort:** M
**Dependencies:** task-R0-02-asset-generation-pipeline.md, task-R0-03-state-machine-and-store.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The lesson is the core learning interaction — the place-value question with answer tiles and support controls.
- **Current state**: store + state machine + generated lesson art available; `scenes/lesson.js` is a stub.
- **Target outcome**: A polished lesson scene rendering the topic header, progress, hearts, question, four answer tiles, fox support pose, and anchored Hint/Help/Read controls — emitting answer-selection intent to the state machine.

## Constraints

- **MUST**: Render question/choices/hint/explanation from config `lesson`. Correctness comes from the choice `correct` flag, not hardcoded.
- **MUST**: Hint/Help/Read controls present, anchored at bottom, keyboard-operable, ARIA-labeled. Hint reveals configured hint text and marks attempt as hinted.
- **MUST**: Question is the visual priority with large numerals; four large tap-target tiles (436/463/406/346).
- <!-- Updated: Red Team F1 --> **MUST**: On answer activation, immediately disable all four tiles (set `disabled` + remove from tab order) until feedback resolves / the next scene mounts, preventing double-tap from firing a second transition.
- **SHOULD**: Use `assets/generated/bg_lesson.png` + `fox_idle.png`/`fox_cheer.png`.
- **MUST NOT**: Implement real audio for Read/Help (stub the hook only).
- **SCOPE**: Lesson rendering + answer/hint intent. Feedback animation + scoring math live in R3-01; this scene exposes tile elements + emits `answer_selected`.

## Steps

- [ ] 1. Implement `scenes/lesson.js` `mount(root, store, sm)` rendering header (topic/objective), progress `4 / 10`, hearts (2 filled/1 empty), question card.
  - _Requirements: 2.1, 2.2_
- [ ] 2. Render four answer tiles from config choices as large, focusable buttons; neutral state until selected.
  - _Requirements: 2.3, 2.7_
- [ ] 3. On tile activate → record attempt in store, `sm.transition('answer_selected')`, evaluate `correct` flag, hand off to R3 feedback.
  - <!-- Updated: Red Team F1 --> Disable all tiles on activation; on incorrect retry, re-enable tiles when the lesson scene returns to interactive state.
  - _Requirements: 2.4_
- [ ] 4. Render Hint/Help/Read controls anchored at bottom; Hint reveals hint text + sets `store.lesson.hintUsed = true`.
  - _Requirements: 2.5, 2.6_
- [ ] 5. Verification: render + selection + hint checks.
  - _Requirements: 2_

## Requirements

- 2.1 — Topic/objective/progress/hearts from config.
- 2.2 — Question as visual priority, large numerals.
- 2.3 — Four answer tiles as large tap targets.
- 2.4 — Tile select → answer_selected + correctness eval.
- 2.5 — Hint/Help/Read anchored, labeled, keyboard-operable.
- 2.6 — Hint reveals text + flags attempt as hinted.
- 2.7 — Neutral tile state before selection.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/scenes/lesson.js` | Modify | Lesson scene render + intents |
| `src/ui/components.js` | Modify | Tile/heart/control builders + ARIA |
| `src/styles/main.css` | Modify | Lesson layout |
| `assets/generated/bg_lesson.png`, `fox_idle.png` | Use | Background + fox |

## Completion Criteria

- [ ] Header, progress, hearts, question, 4 tiles, and support controls render from config.
- [ ] Selecting a tile transitions to `answer_selected` and exposes correctness for R3.
- [ ] Hint reveals configured text and sets `hintUsed`.
- [ ] Controls and tiles are keyboard-operable with ARIA labels.

## Evidence

- [ ] Automated verification
  - Command(s): `npm run build`
  - Expected proof: build exits 0 with lesson scene compiled.
- [ ] Artifact / runtime verification
  - Inspect: dev server, Lesson scene
  - Expect: matches `assets/screens/02_lesson_question_screen.png`; question dominant, 4 tiles, controls anchored.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `scene-router.js` mounts `lesson.js` on `lesson_question` (router finalized R7-01)
  - Expect: scene mounts after node-26 select.
- [ ] Contract / negative-path verification
  - Check: activate Hint, then inspect store
  - Expect: `hintUsed=true`, hint text visible; no tile pre-selected on mount.
  - <!-- Updated: Red Team F1 --> Check: double-tap a tile rapidly
  - Expect: only one transition fires; second tap ignored (tiles disabled), no thrown error.
- [ ] Accessibility verification
  - Check: Tab through tiles + controls, activate via Enter/Space
  - Expect: focus visible, ARIA labels present.

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Hardcoded correctness | Medium | Read `correct` flag from config |
| Controls not keyboard-operable | Medium | Use real `<button>` + focus styles |
