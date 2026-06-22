# Task R0-02: Asset generation pipeline (gpt-image-2 layered sprites)

**Requirement:** R0 — Foundation
**Status:** pending
**Priority:** P1
**Estimated Effort:** M
**Dependencies:** task-R0-01-project-scaffolding.md
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The "polish" bar requires layered, animatable art (backgrounds + transparent fox/star/node sprites) that the 3 flat reference screens cannot provide. Scenes consume these generated assets.
- **Current state**: Only approved reference PNGs exist (`assets/references/*`, `assets/screens/*`). No `assets/generated/`.
- **Target outcome**: `assets/generated/` populated with backgrounds and transparent sprites that pass a visual review against the references and match the art guideline, plus a documented prompt set for regeneration.

## Constraints

- **MUST**: Use the `gpt-image2-skill` (gpt-image-2) with prompts derived from `json/mathquest_ai_agent_art_guideline.json` `future_generation_prompts`. Sprites (fox, star, node glow, sparkle, bridge) MUST have transparent backgrounds.
- **MUST**: Match palette, fox mascot costume (blue wizard + yellow star), and UI language from the references. No watermark, no text baked into sprites.
- **SHOULD**: Generate at portrait-friendly resolution; keep file sizes web-reasonable.
- **MUST NOT**: Use casino/ad-heavy/horror styling or screenshot crops (per art guideline `avoid` list).
- **SCOPE**: Asset production + manifest only — no scene wiring here.

## Steps

- [ ] 1. Author `assets/generated/PROMPTS.md` documenting the exact gpt-image-2 prompt per asset (backgrounds + sprites) traceable to the art guideline.
  - Business intent: reproducible, reviewable art generation.
  - _Requirements: 0.2_
- [ ] 2. Generate backgrounds: `bg_map.png`, `bg_lesson.png`, `bg_reward.png` via gpt-image-2.
  - Code detail: use `screen`/`map`/`reward` guideline prompts; portrait framing per 941×1672 references.
  - _Requirements: 0.2_
- [ ] 3. Generate transparent sprites: `fox_idle.png`, `fox_cheer.png`, `fox_jump.png`, `node_glow.png`, `star_particle.png`, `sparkle.png`, `bridge.png`.
  - Code detail: mascot prompt for fox poses; ensure alpha transparency.
  - _Requirements: 0.2_
- [ ] 4. Visual review gate: compare each asset to `assets/references/*` and `assets/screens/*`; regenerate any that miss the art bar. Record pass/fail in `PROMPTS.md`.
  - _Requirements: 0.2_

## Requirements

- 0.2 — Layered, transparent, art-aligned generated assets available under `assets/generated/` for scene consumption.

## Related Files

| Path | Action | Description |
|---|---|---|
| `assets/generated/PROMPTS.md` | Create | Prompt set + review log |
| `assets/generated/bg_map.png` | Create | Map background |
| `assets/generated/bg_lesson.png` | Create | Lesson background |
| `assets/generated/bg_reward.png` | Create | Reward background |
| `assets/generated/fox_idle.png` | Create | Fox idle (transparent) |
| `assets/generated/fox_cheer.png` | Create | Fox cheer (transparent) |
| `assets/generated/fox_jump.png` | Create | Fox jump (transparent) |
| `assets/generated/node_glow.png` | Create | Active node glow |
| `assets/generated/star_particle.png` | Create | Star particle |
| `assets/generated/sparkle.png` | Create | Sparkle accent |
| `assets/generated/bridge.png` | Create | Reward bridge |

## Completion Criteria

- [ ] All assets in the Asset Contract table (design.md) exist in `assets/generated/`.
- [ ] Sprites have verified alpha transparency.
- [ ] Each asset visually matches the palette/mascot/UI references (review log records PASS).
- [ ] `PROMPTS.md` documents reproducible prompts per asset.

## Evidence

- [ ] Automated verification
  - Command(s): `ls -la assets/generated && node -e "for(const f of ['bg_map','bg_lesson','bg_reward','fox_idle','fox_cheer','fox_jump','node_glow','star_particle','sparkle','bridge']) require('fs').accessSync('assets/generated/'+f+'.png')"`
  - Expected proof: all required files present, command exits 0.
- [ ] Artifact / runtime verification
  - Inspect: each PNG visually + alpha channel on sprites
  - Expect: transparent sprites, art matches references, no watermark/text.
- [ ] Runtime reachability verification
  - Entrypoint/caller: consumed by `scenes/map.js`, `scenes/lesson.js`, `scenes/reward.js` (R1/R2/R4)
  - Expect: paths under `assets/generated/` are the ones scene tasks import; deferred wiring is owned by R1-01/R2-01/R4-01.
- [ ] Contract / negative-path verification
  - Check: an off-palette or watermarked generation
  - Expect: review gate marks it FAIL and triggers regeneration (proves the gate is real).

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| gpt-image-2 art drift | High | Prompt set + visual review gate + regeneration loop |
| Sprite lacks transparency | Medium | Verify alpha; regenerate with explicit transparent-bg prompt |
| Asset bloat | Low | Keep web-reasonable resolution/compression |
