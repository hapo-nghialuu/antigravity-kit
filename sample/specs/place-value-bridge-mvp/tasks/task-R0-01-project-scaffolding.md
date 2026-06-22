# Task R0-01: Project scaffolding (Vite + GSAP + structure)

**Requirement:** R0 — Foundation
**Status:** pending
**Priority:** P1
**Estimated Effort:** S
**Dependencies:** none
**Spec:** specs/place-value-bridge-mvp/

## Context

- **Why**: The repo is a greenfield design package (only `json/` + `assets/`). Every functional task needs a runnable build, dependency graph, and module skeleton before code can land.
- **Current state**: greenfield — no `package.json`, no source, no test tooling.
- **Target outcome**: `npm run dev` serves a portrait app shell; `npm run build` produces a static bundle; `npm test` runs Vitest; the directory skeleton from `design.md` exists with placeholder modules.

## Constraints

- **MUST**: Use Vite 5, GSAP 3, Vitest. ES modules only. Match the directory structure in `design.md`.
- **SHOULD**: Configure a mobile-portrait viewport shell (max-width device frame, centered) as the root container `#app`.
- <!-- Updated: Red Team F6 --> **SHOULD**: Establish a CSS convention where every scene background `<img>` sits over a solid palette-colored fallback panel, so a missing/failed generated asset degrades gracefully (no broken-image icon).
- **MUST NOT**: Introduce React/Vue/any UI framework, or a Canvas/WebGL engine.
- **SCOPE**: Scaffolding only — no scene logic, no asset generation, no business rules here.

## Steps

- [ ] 1. Initialize `package.json` with Vite, GSAP, Vitest and scripts `dev`, `build`, `preview`, `test`.
  - Business intent: a reproducible runnable project.
  - Code detail: `vite`, `gsap`, `vitest` deps; scripts wire to Vite/Vitest binaries.
  - _Requirements: 0.1_
- [ ] 2. Create `index.html` + `src/main.js` entry mounting a portrait `#app` shell and `src/styles/main.css`.
  - Business intent: visible app frame to host scenes.
  - Code detail: `#app` fixed portrait aspect (e.g. 412×892 max), background, import `main.js` as module.
  - _Requirements: 0.1_
- [ ] 3. Create empty module files per `design.md` (`config.js`, `state/*`, `scenes/*`, `anim/*`, `ui/*`) and `src/config.js` importing + `Object.freeze`-ing the MVP config JSON.
  - Business intent: stable import surface so later tasks fill modules without restructuring.
  - Code detail: `config.js` imports `../json/mathquest_mvp_implementation_config.json` via Vite JSON import.
  - _Requirements: 0.1_
- [ ] 4. Add `vitest.config.js` and a trivial smoke test asserting config loads.
  - _Requirements: 0.1_

## Requirements

- 0.1 — Runnable Vite project with GSAP, Vitest, portrait shell, and module skeleton matching design.

## Related Files

| Path | Action | Description |
|---|---|---|
| `package.json` | Create | Deps + scripts |
| `vite.config.js` | Create | Vite config (JSON import, base) |
| `vitest.config.js` | Create | Test config |
| `index.html` | Create | Portrait app shell |
| `src/main.js` | Create | Entry, mounts `#app` |
| `src/config.js` | Create | Frozen MVP config |
| `src/styles/main.css` | Create | Base + portrait frame |
| `src/state/*.js`, `src/scenes/*.js`, `src/anim/*.js`, `src/ui/*.js` | Create | Empty module stubs |
| `test/config.test.js` | Create | Smoke test |

## Completion Criteria

- [ ] `npm run dev` serves a portrait app shell without console errors.
- [ ] `npm run build` exits 0 producing `dist/`.
- [ ] `npm test` runs and the config smoke test passes.
- [ ] All module stub paths from `design.md` exist (no orphaned references for later tasks).

## Evidence

- [ ] Automated verification
  - Command(s): `npm run build && npm test`
  - Expected proof: build exits 0 with `dist/` emitted; Vitest reports 1+ passing test, exit 0.
- [ ] Artifact / runtime verification
  - Inspect: `dist/index.html` and dev server at `/`
  - Expect: Portrait shell renders; `#app` present.
- [ ] Runtime reachability verification
  - Entrypoint/caller: `index.html` → `src/main.js`
  - Expect: `main.js` is the module entry; `config.js` import resolves at runtime.
- [ ] Contract / negative-path verification
  - Check: missing/renamed config import
  - Expect: build fails loudly (proves config is actually wired, not stubbed).

## Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Vite JSON import path wrong | Medium | Verify resolved path in build output |
| Over-scaffolding unused tooling | Low | Keep deps to Vite/GSAP/Vitest only (YAGNI) |
