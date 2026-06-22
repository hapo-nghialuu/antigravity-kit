# Task R3-01: Scoring and feedback engine

**Requirement:** R3 — Scoring & Feedback Engine
**Status:** pending
**Priority:** P1
**Estimated Effort:** M
**Dependencies:** task-R0-03-state-machine-and-store.md, task-R2-01-lesson-question-scene.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The slice must reward effort and accuracy fairly and give immediate feedback — the heart of the "business logic fully completed" goal.
- **Current state**: lesson scene emits `answer_selected` with attempt data; `state/scoring.js` is a stub.
- **Target outcome**: A pure `scoring.js` computing `{score, stars, xp}` from attempt history per the config table, plus feedback behavior (correct → advance toward reward; incorrect → shake + retry + heart decrement).

## Constraints

- **MUST**: Implement the scoring table exactly: first_try 10/3★, after_hint 7/2★, after_one_incorrect 5/2★, after_multiple_incorrect 3/1★; `completion_xp=60` on success. Worst-case-wins precedence.
- **MUST**: Correct → `feedback` → `reward_completion`; incorrect → `feedback` → back to `lesson_question` (retry), decrement one filled heart.
- <!-- Updated: Red Team F2 --> **MUST**: Hearts are advisory/visual only — clamp at floor 0, never block completion, no fail state.
- **SHOULD**: Keep `scoring.js` pure/DOM-free; feedback wiring lives in lesson scene + animation hooks.
- **MUST NOT**: Award XP/stars before the correct answer is reached.
- **SCOPE**: Scoring math + feedback state transitions + heart decrement. Particle/shake timelines defined in R6-01; this task triggers them via named hooks.

## Steps

- [ ] 1. Implement `state/scoring.js` `score(attempts, hintUsed)` returning `{score, stars, xp}` per the contract with worst-case precedence.
  - _Requirements: 3.3, 3.6_
- [ ] 2. On correct selection: store `result`, trigger correct-feedback hook, `sm.transition('feedback')` → `reward_completion`, advance progress.
  - _Requirements: 3.1, 3.5_
- [ ] 3. On incorrect selection: trigger incorrect-feedback hook (shake), decrement one filled heart, `sm.transition('feedback')` → `lesson_question` for retry.
  - <!-- Updated: Red Team F2 --> Hearts are advisory only: clamp the decrement at a floor of 0. Reaching 0 hearts does NOT block completion and does NOT trigger any fail/game-over state — the learner keeps retrying until correct.
  - _Requirements: 3.2, 3.4_
- [ ] 4. Unit tests covering all four scoring branches + xp + precedence.
  - _Requirements: 3.3_

## Requirements

- 3.1 — Correct answer plays correct feedback + → feedback state.
- 3.2 — Incorrect plays shake + retry without leaving lesson.
- 3.3 — Stars/score from config scoring_rules.
- 3.4 — Incorrect decrements a filled heart.
- 3.5 — Correct advances progress toward reward.
- 3.6 — Award completion XP 60 on success.

## Related Files

| Path | Action | Description |
|---|---|---|
| `src/state/scoring.js` | Modify | Pure scoring function |
| `src/scenes/lesson.js` | Modify | Feedback wiring + heart decrement |
| `test/scoring.test.js` | Create | All scoring branches |

## Completion Criteria

- [ ] `score()` returns correct `{score,stars,xp}` for first_try / after_hint / after_one_incorrect / after_multiple_incorrect.
- [ ] Correct answer routes toward reward; incorrect allows retry and decrements a heart.
- [ ] XP 60 awarded on success only.
- [ ] Unit tests pass for every branch + precedence.

## Evidence

- [ ] Automated verification
  - Command(s): `npm test -- scoring`
  - Expected proof: all branch tests pass (e.g., 1 wrong then correct → 5/2★; hint then correct → 7/2★), exit 0.
- [ ] Artifact / runtime verification
  - Inspect: dev server lesson — pick 463 (wrong) then 436 (correct)
  - Expect: shake + heart drop on wrong; correct routes to reward with score 5, 2 stars.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `scenes/lesson.js` answer handler calls `scoring.score(...)`
  - Expect: scoring invoked on the real selection path, result stored.
- [ ] Contract / negative-path verification
  - Check: select correct on first try, no hint
  - Expect: score 10, 3 stars, xp 60.
  - <!-- Updated: Red Team F2 --> Check: answer wrong 3 times (hearts 2→1→0) then correct
  - Expect: hearts clamp at 0 (no negative), no fail state, lesson still completes with after_multiple_incorrect tier (3/1★).

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Precedence bug (hint vs incorrect) | Medium | Worst-case-wins rule + per-branch tests |
| XP double-award | Low | Award once at success transition |
