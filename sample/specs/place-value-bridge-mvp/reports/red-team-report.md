# Red Team Review — place-value-bridge-mvp — 2026-06-18

**Mode:** Red Team → Validate (10 task files → 4 reviewers, all lenses)
**Reviewers:** Security Adversary, Failure Mode Analyst, Assumption Destroyer, Scope & Complexity Critic
**Pre-review validator:** `node .claude/scripts/validate-spec-output.cjs specs/place-value-bridge-mvp` → PASS (shape only)

---

## Finding 1: No input-lock during feedback/animation → illegal state-machine transition crash
- **Severity:** Critical
- **Location:** Task R2-01 (answer handler), R3-01 (feedback wiring), R4-01 (CTA wiring), R0-03 (state machine throws on illegal transition)
- **Flaw:** The state machine throws on any illegal transition (R0-03), but no task locks input while a transition/animation is in flight. A double-tap on an answer tile or a reward CTA fires a second transition from a state that no longer allows it.
- **Failure scenario:** Learner double-taps "436". First tap: `lesson_question → answer_selected → feedback → reward_completion`. Second tap arrives at `reward_completion`, calls `transition('answer_selected')` → throws an uncaught error → app freezes mid-celebration. Same for double-tapping "Continue Adventure".
- **Evidence:** R0-03 "Illegal transitions throw." No task mentions debouncing, disabling tiles after selection, or guarding CTAs.
- **Suggested fix:** Add an input-lock invariant to the design Canonical Contracts: once an answer tile or CTA is activated, disable all sibling interactive controls until the next scene mounts. Wire it in R2-01 (tiles), R4-01 (CTAs); make `transition()` a no-op (not throw) for a repeated same-target call, OR guard at the scene layer.
- **Disposition:** Accept
- **Rationale:** Real crash on a trivial, common user action (kids double-tap). Must be specified.

## Finding 2: Hearts reach 0 with no fail/game-over path in the 9-state machine
- **Severity:** High
- **Location:** Task R3-01 (R3.4 heart decrement), R0-03 (state machine), design.md State Machine contract
- **Flaw:** Config seeds 2 filled / 1 empty hearts. R3.4 decrements a filled heart on each wrong answer, but the state machine has no transition for "out of hearts" — the loop assumes the learner always eventually answers correctly.
- **Failure scenario:** Learner picks 3 wrong answers. Hearts hit 0. There is no defined behavior: does the lesson fail, reset, force-show the answer, or continue infinitely? Undefined → likely keeps decrementing below 0 or softlocks.
- **Evidence:** State machine in design.md has no `lesson_failed`/`out_of_hearts` node. R3.4 only says "decrement one filled heart."
- **Suggested fix:** Pick an explicit policy. Recommended MVP: hearts are advisory/visual only — never block completion (no fail state), clamp at 0. Document in design Canonical Contracts + R3 requirement so behavior is deterministic.
- **Disposition:** Accept (needs user decision on policy)
- **Rationale:** Undefined terminal state is a correctness hole in core business logic.

## Finding 3: XP/stars re-award not idempotent on save_progress
- **Severity:** High
- **Location:** Task R5-01 (R5.1 "XP += 60, stars += earned")
- **Flaw:** Persistence uses additive deltas on `save_progress`. If `save_progress` is entered more than once for the same completion (e.g., re-entering reward via state replay, or both CTAs somehow firing), XP/stars inflate.
- **Failure scenario:** Reward scene re-mounts (Finding 1 double-tap, or a future replay) → `save_progress` runs twice → learner gets +120 XP and +6 stars for one lesson.
- **Evidence:** R5-01 "On save: XP += 60, stars += earned" with no completion-guard or "already awarded" flag.
- **Suggested fix:** Make node-26 completion idempotent: gate the award on `nodes[26] !== 'completed'`. If already completed, persist without re-adding XP/stars. Add to R5.1 + design Persistence Contract.
- **Disposition:** Accept
- **Rationale:** Data-integrity bug in the only persistent state; cheap to guard.

## Finding 4: "XP-derived level" contradicts the static `level` field — no formula exists
- **Severity:** Medium
- **Location:** Task R5-01 (R5.4 "stars, XP-derived level"), requirements.md R5.4
- **Flaw:** Config provides `level: 12` and `xp: 1840` as independent fields. R5.4 says counters reflect an "XP-derived level," implying a level formula that the config does not define.
- **Failure scenario:** Implementer invents an arbitrary XP→level formula; after +60 XP the level either jumps unexpectedly or stays at 12, inconsistent with the static mockup. Ambiguous acceptance.
- **Evidence:** `initial_learner_state` has both `level` and `xp` as literals; no level curve anywhere in `json/`.
- **Suggested fix:** Drop "XP-derived"; treat `level` as a static stored counter for this slice (level does not change on a single lesson). R5.4 reflects stars + XP only; level stays 12. Update requirement wording.
- **Disposition:** Accept
- **Rationale:** Removes an invented contract with no source; aligns with YAGNI for a one-lesson slice.

## Finding 5: "Earned star tier" vs always-three-stars display is ambiguous
- **Severity:** Medium
- **Location:** Task R4-01 (R4.2 "three-star pop reflecting earned tier"), reward reference asset (3 full gold stars)
- **Flaw:** The reward mockup shows three full gold stars, but scoring can award 1 or 2 stars. "Reflecting earned tier" + "three stars are large and glowing" conflict — does a 2-star result show 3 glowing stars or 2 filled + 1 empty?
- **Failure scenario:** Learner earns 2 stars (after one wrong); reward shows 3 glowing stars (looks like a perfect score) → misleading feedback, or implementer guesses inconsistently.
- **Evidence:** R4.2 wording vs `03_reward_completion_screen.png` (three identical filled stars).
- **Suggested fix:** Specify: always render 3 star slots; fill exactly `result.stars`, show remaining as empty/dimmed; pop animation only on filled stars. Update R4.2 + design.
- **Disposition:** Accept
- **Rationale:** Core reward correctness; must be unambiguous.

## Finding 6: No asset load/error handling — runtime depends on generated PNGs existing
- **Severity:** Medium
- **Location:** Tasks R1-01/R2-01/R4-01 (consume `assets/generated/*`), R0-02 (produces them)
- **Flaw:** Every scene hard-depends on generated assets. No fallback/`onerror` path if an asset is missing or fails to load (e.g., regeneration not yet run, wrong filename).
- **Failure scenario:** `bg_reward.png` missing → reward scene renders with a broken image and the "polish" bar fails silently; no console signal beyond a 404.
- **Suggested fix:** Lightweight note in R0-01/R1-01: scenes set a solid palette-colored background fallback (CSS) behind `<img>`, and a build/runtime check that all `assets/generated/*` referenced files exist. No elaborate loader needed (YAGNI).
- **Disposition:** Accept (note only)
- **Rationale:** Cheap guard that protects the headline "polished" goal.

## Finding 7: localStorage save is trivially tamperable (no integrity)
- **Severity:** Low
- **Location:** Task R5-01 (persistence)
- **Flaw:** `mathquest:save:v1` is plaintext; a user can grant themselves XP/stars/unlocks by editing it.
- **Failure scenario:** Learner edits localStorage to unlock all nodes.
- **Evidence:** Plain JSON, no checksum/signature.
- **Suggested fix:** None for MVP.
- **Disposition:** Reject
- **Rationale:** Single-player local kids' education game, no server, no competitive stakes. Integrity protection is YAGNI; accepted risk. (Recorded as accepted risk, not a fix.)

## Finding 8: Three fox poses + three sparkle-class assets may exceed actual usage
- **Severity:** Low
- **Location:** Task R0-02 (asset list)
- **Flaw:** `fox_idle/cheer/jump` and `node_glow/star_particle/sparkle` — map scene (which also shows a fox in the mockup) references no fox sprite; some particle assets overlap.
- **Failure scenario:** Wasted generation effort on unused sprites.
- **Suggested fix:** Allow R0-02 to generate only sprites actually referenced by a scene task; treat extras as optional.
- **Disposition:** Reject
- **Rationale:** Minor; the poses map to distinct lesson/reward uses and the map fox can reuse `fox_idle`. Not worth constraining the art pass. Note left for implementer judgment.

---

## Red Team Summary — 2026-06-18
**Findings:** 8 (6 accepted, 2 rejected)
**Severity breakdown:** 1 Critical, 2 High, 3 Medium, 2 Low

| # | Finding | Severity | Disposition | Applied To |
|---|---------|----------|-------------|------------|
| 1 | Input-lock missing → illegal-transition crash | Critical | Accept | design.md, task-R2-01, task-R4-01, task-R0-03 |
| 2 | Hearts=0 has no fail/clamp policy | High | Accept | design.md, requirements.md (R3), task-R3-01 |
| 3 | save_progress XP/stars not idempotent | High | Accept | design.md, requirements.md (R5), task-R5-01 |
| 4 | "XP-derived level" invented contract | Medium | Accept | requirements.md (R5), task-R5-01 |
| 5 | Earned-tier vs 3-star display ambiguity | Medium | Accept | requirements.md (R4), design.md, task-R4-01 |
| 6 | No asset load/error fallback | Medium | Accept (note) | task-R0-01, task-R1-01 |
| 7 | localStorage tamperable | Low | Reject (accepted risk) | research.md (risk note) |
| 8 | Possible unused sprites | Low | Reject | — |
