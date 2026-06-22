# Research & Design Decisions — Place Value Bridge MVP

---
**Feature**: `place-value-bridge-mvp`
**Discovery Mode**: light
---

## Summary
- **Feature**: First polished vertical MVP slice of *MathQuest: Star Trail* — the `place_value_bridge` loop (Map → Lesson → Reward).
- **Discovery Scope**: New Feature (greenfield browser game, single slice).
- **Key Findings**:
  - The repo is a **greenfield design package**: only `json/` config + `assets/` reference imagery exist. No source code, `package.json`, README, or build tooling.
  - Every behavioral contract is already specified in `json/mathquest_mvp_implementation_config.json` (state machine, scoring rules, animation cues, acceptance criteria). The spec must implement those verbatim, not reinvent them.
  - Art direction is fully locked by `json/mathquest_ai_agent_art_guideline.json` + 4 reference PNGs + 3 screen mockups. New generated assets MUST match palette, fox mascot, UI components, and map world references.

## Evidence Summary
Written before requirements/design/tasks were finalized.

- **Codebase Scout**: Required (done)
  - Result: Greenfield. No code to extend; we build from scratch. No existing tests, contracts, or runtime to preserve.
  - Relevant files/modules: `json/mathquest_mvp_implementation_config.json` (behavioral source of truth), `json/mathquest_ai_agent_art_guideline.json` (art rules), `json/mathquest_asset_manifest.json` (approved asset inventory + dimensions), `assets/references/*.png` (palette, fox, UI, map), `assets/screens/0[1-3]_*.png` (target screen mockups at 941×1672 portrait).
  - Existing patterns/contracts: 9-step `state_machine`, `scoring_rules` table, `animation` cue map, 6 `acceptance_criteria`. These are the canonical contracts the implementation inherits.
  - Tests or checks affected: None pre-exist. New unit tests (scoring/state-machine/persistence) and a manual E2E acceptance walkthrough will be created.
- **External / Current Research**: Required (done — verified current library norms)
  - Result: Vite 5 + vanilla JS is the lightest zero-config bundler path for a static browser game; GSAP 3 is the standard timeline animation library and ships an idle/free core sufficient for this slice. `prefers-reduced-motion` is the W3C/WCAG-mandated media query for the reduced-motion fallback the config calls for.
  - Primary sources: Vite docs (build/static deploy), GSAP 3 timeline docs, MDN `prefers-reduced-motion`, WCAG 2.1 SC 2.3.3 (Animation from Interactions) & 1.4.3 (Contrast).
  - Current constraints/best practices: Prefer CSS transform/opacity for GPU-friendly animation; gate non-essential motion behind `prefers-reduced-motion: reduce`; keep tap targets ≥ 44×44px (config already uses large tiles); maintain high text contrast (art guideline already mandates this).
- **Selected Decision**:
  - Decision: **Vanilla JS + Vite + GSAP**, scene-based architecture with a single state machine driving DOM scenes layered over gpt-image-2 generated art.
  - Why it fits the codebase: Greenfield + single slice → no framework justification (YAGNI). DOM + GSAP gives per-layer control needed to animate fox/stars/nodes independently of backgrounds.
  - Why it fits external constraints: Vite static output deploys anywhere; GSAP covers every animation cue; `prefers-reduced-motion` satisfies accessibility requirement.
- **Rejected Alternatives**:
  - React + Vite + GSAP — extra component/boilerplate overhead unjustified for 3 scenes (YAGNI). Rejected.
  - Canvas/WebGL engine (PixiJS/Phaser) — overkill for a 3-screen DOM-friendly slice; harder accessibility + heavier bundle. Rejected.
  - Composite from existing 3 screen PNGs as flat backgrounds — cheaper but cannot separate fox/star/node layers, so "fully completed animation" polish bar is unreachable. Rejected by user decision.
- **Remaining Gaps / Questions**:
  - gpt-image-2 output is non-deterministic; generated sprites may need 1–2 regeneration passes to hit the art bar. Mitigated by a documented prompt set + visual review gate in R0-02.
  - Audio for Read/Help is stubbed (out of scope) — controls must still be present/operable per acceptance criteria.
- **Downstream Task & Test Implications**:
  - Task implication: A dedicated asset-pipeline task (R0-02) must land before scene tasks; a final integration/acceptance task (R7-01) must prove all 6 acceptance criteria end-to-end.
  - Test/verification implication: Pure logic (scoring, state transitions, persistence) gets unit tests; scenes get manual/visual runtime checks against reference PNGs; the full loop gets an acceptance walkthrough.

## Codebase Scout

| Area | Finding | Evidence / Path | Implication |
|------|---------|-----------------|-------------|
| Project surface | Greenfield design package, no code | repo root: only `json/`, `assets/`, `.claude/`, `CLAUDE.md` | Build scaffolding from zero (R0-01) |
| Relevant files/modules | Behavioral source of truth | `json/mathquest_mvp_implementation_config.json` | Implement state machine + scoring verbatim |
| Existing patterns | Art direction locked | `json/mathquest_ai_agent_art_guideline.json`, `assets/references/*` | Generated assets must match palette/mascot/UI |
| Contracts | 9-state machine, scoring table, animation cues, 6 acceptance criteria | config JSON keys `state_machine`, `scoring_rules`, `animation`, `acceptance_criteria` | These are canonical invariants |
| Tests and verification | None exist | — | Add unit + manual E2E acceptance |
| Blast radius | None (no existing code) | — | No legacy breakage risk |
| Staleness / conflicts | Asset policy: old SVG placeholders removed, renamed PNGs are source of truth | `json/mathquest_asset_manifest.json` `asset_policy` | Reference only the approved PNGs |

## External / Current Research

| Question | Source | Finding | Decision Impact |
|----------|--------|---------|-----------------|
| Lightest build tool for a static browser game? | Vite docs | Vite 5 zero-config dev server + static build | Use Vite, no framework |
| Timeline animation library? | GSAP 3 docs | `gsap.timeline()` sequences the banner-drop/star-pop/XP count-up cleanly | Use GSAP for all cues |
| Reduced-motion standard? | MDN, WCAG 2.1 SC 2.3.3 | `prefers-reduced-motion: reduce` is the canonical gate | Drive `reduced_motion` fallback from this query |
| Tap target + contrast norms? | WCAG 2.1 SC 2.5.5 / 1.4.3 | ≥44px targets, ≥4.5:1 text contrast | Already satisfied by art direction; verify in QA |

## Design Decisions

### Decision: Scene-router + single state machine
- **Context**: Config defines a strict 9-step linear loop that must not skip states.
- **Selected Approach**: One `GameStateMachine` holds the canonical state enum + allowed transitions; a `SceneRouter` mounts/unmounts the matching scene module on each transition.
- **Rationale**: Centralizes the contract, makes illegal transitions throw, keeps scenes dumb/rendering-only.
- **Status**: Accepted.
- **Trade-offs**: Slight indirection vs. direct scene calls; worth it for contract enforcement + testability.

### Decision: Layered DOM scenes over generated art
- **Context**: "Fully completed animation" requires animating fox/stars/nodes independently of backgrounds.
- **Selected Approach**: Each scene = absolutely-positioned background `<img>` + transparent sprite layers + interactive DOM (buttons/tiles) styled to match UI reference.
- **Rationale**: Enables GSAP to target individual layers; keeps accessibility (real buttons, ARIA) intact.
- **Status**: Accepted.

### Decision: localStorage persistence
- **Context**: Acceptance criteria require node 27 to become available after node 26 reward; no backend in scope.
- **Selected Approach**: Single namespaced key `mathquest:save:v1` holding learner state + node states; loaded at boot, written at `save_progress`.
- **Rationale**: Simplest durable client store; satisfies unlock requirement without backend.
- **Status**: Accepted.

## Risks & Mitigations
- gpt-image-2 art drift from reference → documented prompt set + visual review gate before scenes consume assets.
- GSAP timeline complexity creating jank on low-end mobile → prefer transform/opacity, cap concurrent particles, honor reduced-motion.
- State machine illegal transitions → enforce allowed-transition table, throw on violation, unit-test the map.
- localStorage save is plaintext and trivially tamperable (a user could grant XP/unlocks) → **Accepted risk** (Red Team F7). Single-player local kids' education game, no server, no competitive stakes; integrity protection is YAGNI for this slice.

## References
- [Vite Guide](https://vitejs.dev/guide/) — static build + dev server
- [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) — sequencing animation cues
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — reduced-motion gate
- [WCAG 2.1 SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- `json/mathquest_mvp_implementation_config.json` — behavioral source of truth
- `json/mathquest_ai_agent_art_guideline.json` — art direction
- `json/mathquest_asset_manifest.json` — approved asset inventory
