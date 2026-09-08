# runtime-dir-portability — packet tạm gửi trong lúc hotfix omp

C1 chốt KEEP (A + C), C2 chốt "sửa gốc + overlay" ngày 2026-09-08. Hai review vòng 1 FAIL với 13 khiếm khuyết khách quan chưa áp dụng (xem review log khi viết lại). Packet nằm đây vì `spec-resolver.cjs:275` không cho hai active spec; sẽ về `specs/` sau khi packet omp đóng lại. Tách năm phần dưới thành `plan.md` + bốn `task-NN-*.md`.

---

## ↳ tệp `plan.md`

# Runtime-directory portability for the gate hooks
Specs-Contract: process-first-ready-v1

## Scope decision (C1 — 2026-09-08)
- Existing: `src/claude/hooks/lib/hook-state-dir.cjs:24` already derives a directory from the hook's own location (`HOOKS_DIR = path.join(__dirname, '..')`) and `src/codex/hooks/lib/hook-context.cjs:13` does the same for the project root. `lib/context.cjs:51` already parameterises the config directory name (`resolveRulesPath(filename, configDirName = '.claude')`). The pattern exists; it is not applied to the 66 remaining `.claude` sites.
- Minimum change: one helper that derives the runtime directory from the hook's location, replacing the sites that read or write project runtime files and the strings that tell the model where those files live. Applied to `src/claude/hooks` and propagated to the `src/omp/hooks` fork.
- Expansion signals: about twelve hook files in each of two trees plus one helper, above the eight-file threshold. One subsystem: every edit has the same shape and uses the same helper.
- User decision: KEEP — fix category A (runtime reads and writes) and category C (model-facing strings); leave category B (`~/.claude/` Claude Code globals) as documented Claude-specific behaviour.

## Census of the 66 hardcoded sites (read 2026-09-08)
| Category | What | Sites | Effect on a non-Claude install |
|---|---|---|---|
| A — project runtime dir | `path.join(cwd, '.claude', 'runtime.json')` in `rules.cjs:21`, `agent.cjs:21`, `inspect-block.cjs:65`, `usage.cjs:32`, `spec-state.cjs:72`, `task-scaffold-guard.cjs:57`, `session.cjs:61`, `completion-authority.cjs:53`; installed-hook detection `join(root, '.claude', 'hooks', basename)` in `completion-authority.cjs:30`, `semantic-review-authority.cjs:31,73`, `session.cjs:52`, `spec-gate.cjs:14`; `session.cjs:151,168` (`cafekit.json`, update cache); `state.cjs:35-36` (`session-state`); `agent.cjs:29-30` (skills venv) | ≈19 | Broken. `rules.cjs` reads no config and injects nothing; `session.cjs` finds no `cafekit.json`; `state.cjs` writes into a directory that does not exist. |
| B — Claude Code globals | `usage.cjs:68` `~/.claude/.credentials.json`; `state.cjs:42` `~/.claude/session-states`; `lib/context.cjs:54-64` `~/.claude/rules`, `~/.claude/workflows` | 6 | Not broken. These are Claude Code's own files; omp and grok have no equivalent, so rewriting them would be guessing another host's semantics. |
| C — model-facing strings | `"node .claude/scripts/spec-scaffold.cjs"` (`task-scaffold-guard.cjs:78`), `"Disable: set … in .claude/runtime.json"` (`inspect-block.cjs:11`, `usage.cjs:20`), `"Validate with node .claude/scripts/…"` (`spec-state.cjs:229`), `"Python in .claude/skills/"` (`agent.cjs:76`), and header comments | ≈40 | Misleading. Gates behave correctly but the advice shown to the model names a directory that does not exist on that host. |

## Verified contract
- A hook installed for platform P lives at `<project>/<P-folder>/hooks/<name>.cjs`; a library at `<project>/<P-folder>/hooks/lib/<name>.cjs`. The folder basename is `.claude`, `.codex`, or `.omp` (`bin/lib/context.js:78,100` and the omp entry).
- In the source tree the same files live at `packages/spec/src/<platform>/hooks/…`, so the parent basename is `claude`, `omp`, or `codex` without the dot. `hook-state-dir.cjs:25-28` already detects the source tree with `SOURCE_MARKER`.
- The omp install phase (`bin/phases/omp-runtime.js`) currently copies hooks, the bridge, and rules only. It ships no `runtime.json` or `runtime.schema.json`, so even a portable `rules.cjs` has nothing to read on an omp-only project. Codex ships both via `CODEX_OWN_RUNTIME` and a materialised schema (`bin/phases/codex-runtime.js:21-24,74`).

## Out of scope
- Category B. Documented in `docs/installer-architecture.md` as Claude Code behaviour, not ported.
- grok. It inherits this work; its packet comes after.
- Any change to the three omp-specific contract edits in `src/omp/hooks` (tool-name normalisation, ask→deny, fail-closed catch-all). Those are preserved byte for byte.
- Test fixtures that pin `.claude`. The source-tree mapping keeps them valid; if one must change, that is a finding, not a plan item.

## Coverage profile
| ID | Outcome | Change kinds | Material surfaces | Ambiguity/action | Risk/evidence | Required proof |
|---|---|---|---|---|---|---|
| CP-01 | A hook knows its own runtime directory | add helper | `src/claude/hooks/lib/runtime-dir.cjs` | settled — precedent at `hook-state-dir.cjs:24` | elevated — every gate depends on it | source |
| CP-02 | Claude gate hooks read and write through the helper | modify 12 hooks | `src/claude/hooks/*.cjs` | settled | elevated — touches two shipped platforms; suite is the guard | source + installed |
| CP-03 | Model-facing strings name the real directory | modify strings | same files | settled | routine | source |
| CP-04 | An omp-only install has working rules injection | propagate to fork, ship runtime.json | `src/omp/hooks/`, `bin/phases/omp-runtime.js` | settled | elevated — this is the user-visible outcome | source + installed |
| CP-05 | Docs record what is portable and what stays Claude-only | modify docs | `docs/installer-architecture.md`, changelogs | settled | routine | source |

## Acceptance criteria
| ID | EARS criterion | Proof |
|---|---|---|
| AC-01 | When a hook or library under `<X>/hooks/` asks for its runtime directory name, the helper shall return the basename of `<X>` for an installed tree and the dotted platform name for a source tree (`claude`→`.claude`, `omp`→`.omp`, `codex`→`.codex`). | `node --test bin/__tests__/runtime-dir.test.js` |
| AC-02 | When the same hook source is copied under `.omp/hooks/` and run against a project holding `.omp/runtime.json`, every category-A read shall resolve to `.omp/…`, with no `.claude` path consulted. | `node --test bin/__tests__/runtime-dir.test.js` |
| AC-03 | When the Claude hook test suite runs after the category-A edits, it shall pass unchanged, proving Claude behaviour did not move. | `node --test src/claude/hooks/__tests__/` |
| AC-04 | When a hook emits advice naming a runtime path, the string shall be built from the derived directory, so it reads `.omp/…` on omp and `.claude/…` on Claude. | `node --test bin/__tests__/runtime-dir.test.js` |
| AC-05 | When the installer runs with `--platform omp`, it shall ship `.omp/runtime.json` and `.omp/runtime.schema.json`, and `rules.cjs` from the installed `.omp/hooks/` shall inject `## Rules` for a session. | `node --test bin/__tests__/omp-runtime.test.js` |
| AC-06 | When the omp fork is compared to the Claude tree, the only differences shall be the three omp contract edits and `lib/omp-tool-names.cjs`. | `node --test bin/__tests__/omp-hooks.test.js` |
| AC-07 | When documentation describes hook portability, it shall name the helper, the two categories ported, and the six `~/.claude/` sites kept as Claude Code behaviour. | `node scripts/run-skill-self-tests.mjs` |

## Tasks
| # | Task | Criteria | Primary ownership | Dependencies | Status |
|---|---|---|---|---|---|
| 01 | Derive the runtime directory from the hook's location | AC-01 | `src/claude/hooks/lib/runtime-dir.cjs`, `bin/__tests__/runtime-dir.test.js` | - | pending |
| 02 | Route category-A reads and writes through the helper | AC-02, AC-03 | `src/claude/hooks/*.cjs` (12 files) | task-01-derive-runtime-dir.md | pending |
| 03 | Build model-facing strings from the derived directory | AC-04 | same 12 files, strings only | task-02-route-runtime-reads.md | pending |
| 04 | Make an omp-only install inject rules | AC-05, AC-06 | `src/omp/hooks/`, `bin/phases/omp-runtime.js`, `bin/__tests__/omp-runtime.test.js`, `bin/__tests__/omp-hooks.test.js` | task-03-derive-model-facing-strings.md | pending |
| 05 | Document portability and the Claude-only remainder | AC-07 | `docs/installer-architecture.md`, `packages/spec/CHANGELOG.md`, `docs/project-changelog.md`, `packages/spec/scripts/run-skill-self-tests.mjs` | task-04-omp-rules-injection.md | pending |

## Review log
- Round 1: pending.

---

## ↳ tệp `task-01-derive-runtime-dir.md`

# Task 01 — A hook knows its own runtime directory

Status: pending

## Outcome
`src/claude/hooks/lib/runtime-dir.cjs` exports `runtimeDirName()`, `runtimeDir(cwd)`, and `runtimePath(cwd, ...segments)`. A hook or library asks for its runtime directory and gets the right answer whether it runs installed under `.claude/`, `.codex/`, or `.omp/`, or from the source tree under `src/<platform>/hooks/`.

## Scope
- In: the helper, its derivation rules, and a unit test that exercises every layout.
- Out: any call site. Nothing else changes in this task.

## Coverage
- CP-01

## Ownership
- Create: `packages/spec/src/claude/hooks/lib/runtime-dir.cjs`
- Create: `packages/spec/bin/__tests__/runtime-dir.test.js`
- Read: `packages/spec/src/claude/hooks/lib/hook-state-dir.cjs`

## Acceptance
- AC-01: for a file at `<X>/hooks/lib/runtime-dir.cjs` the name is `basename(<X>)` when `<X>` starts with a dot; for the source layout `packages/spec/src/<platform>/hooks/lib/…` it is `.` + `<platform>`; anything else falls back to `.claude` and is reported through a `derived: false` flag so a caller can tell.

## Dependencies
- none

## Verification Plan
- Command: `node --test bin/__tests__/runtime-dir.test.js`
- Named probe: the `installed layouts derive their own folder`, `the source tree maps platform to dotted name`, and `an unknown layout falls back to .claude and says so` cases in `bin/__tests__/runtime-dir.test.js`.
- Reachability: known — the test copies the helper into temporary directories shaped like each layout and requires it from there, the same technique `bin/__tests__/secret-output-guardrail.test.js` uses to run installed hooks.
- Oracle: each layout yields the expected name; the fallback case yields `.claude` with `derived: false`.
- Counterexample: hardcoding `.claude` inside the helper must fail the installed `.omp` and `.codex` cases.
- Artifacts: ephemeral `fs.mkdtempSync` directories removed in `finally`.

## Receipt

---

## ↳ tệp `task-02-route-runtime-reads.md`

# Task 02 — Category-A reads and writes go through the helper

Status: pending

## Outcome
Every site that builds a project runtime path with a literal `.claude` — `runtime.json`, `cafekit.json`, the update cache, `session-state`, the skills venv, and installed-hook detection — uses `runtimePath()` instead. The Claude hook test suite passes unchanged.

## Scope
- In: the ≈19 category-A sites listed in `plan.md` across `rules.cjs`, `agent.cjs`, `inspect-block.cjs`, `usage.cjs`, `spec-state.cjs`, `task-scaffold-guard.cjs`, `session.cjs`, `state.cjs`, `completion-authority.cjs`, `semantic-review-authority.cjs`, `spec-gate.cjs`.
- Out: category B (`~/.claude/…` globals) and category C (strings), which stay for tasks 03 and the documented remainder.

## Coverage
- CP-02

## Ownership
- Modify: `packages/spec/src/claude/hooks/rules.cjs`, `agent.cjs`, `inspect-block.cjs`, `usage.cjs`, `spec-state.cjs`, `task-scaffold-guard.cjs`, `session.cjs`, `state.cjs`, `completion-authority.cjs`, `semantic-review-authority.cjs`, `spec-gate.cjs`
- Modify: `packages/spec/bin/__tests__/runtime-dir.test.js` (add the copied-tree case)
- Read: `packages/spec/src/claude/hooks/lib/runtime-dir.cjs`

## Acceptance
- AC-02: the whole `src/claude/hooks/` tree copied under `<tmp>/.omp/hooks/` and run against `<tmp>/.omp/runtime.json` reads that file; a probe replaces the file with a sentinel value and the hook's output reflects it, while no `.claude` path exists in `<tmp>`.
- AC-03: `node --test src/claude/hooks/__tests__/` passes with zero fixture edits.
- After the edits, `grep -rn "'\.claude'" src/claude/hooks --include='*.cjs' | grep -v __tests__` matches only the six category-B sites and category-C strings.

## Dependencies
- task-01-derive-runtime-dir.md

## Verification Plan
- Command: `node --test bin/__tests__/runtime-dir.test.js && node --test src/claude/hooks/__tests__/`
- Named probe: the `a hook tree copied under .omp resolves .omp/runtime.json` case in `bin/__tests__/runtime-dir.test.js`, plus every existing case under `src/claude/hooks/__tests__/` as the regression guard.
- Reachability: known — hooks run as child processes over stdin from the copied tree; the existing hook suite is the repository's standard guard.
- Oracle: the copied-tree probe sees the sentinel from `.omp/runtime.json`; the existing suite count is unchanged and green.
- Counterexample: leaving any one `runtime.json` read on the literal `.claude` must fail the copied-tree case for that hook.
- Artifacts: ephemeral `fs.mkdtempSync` directories removed in `finally`.

## Receipt

---

## ↳ tệp `task-03-derive-model-facing-strings.md`

# Task 03 — Model-facing strings name the real directory

Status: pending

## Outcome
Advice a hook prints for the model — scaffold commands, disable instructions, venv hints, validate commands — is built from `runtimeDirName()` so it reads `.omp/…` on omp and `.claude/…` on Claude.

## Scope
- In: the ≈40 category-C strings in the same files task 02 touched, including header comments that state a path as fact.
- Out: category B and any behavioural change.

## Coverage
- CP-03

## Ownership
- Modify: the same eleven hook files as task 02, strings only
- Modify: `packages/spec/bin/__tests__/runtime-dir.test.js` (add the string case)

## Acceptance
- AC-04: with the tree copied under `.omp/hooks/`, `task-scaffold-guard.cjs` names `.omp/scripts/spec-scaffold.cjs`, `inspect-block.cjs`'s disable hint names `.omp/runtime.json`, and `agent.cjs` names `.omp/skills/`; under `.claude/hooks/` the same strings name `.claude/…`.

## Dependencies
- task-02-route-runtime-reads.md

## Verification Plan
- Command: `node --test bin/__tests__/runtime-dir.test.js`
- Named probe: the `advice names the directory the hook actually lives in` case.
- Reachability: known — same copied-tree technique as task 02, asserting on captured stdout/stderr.
- Oracle: the three named strings carry the copied tree's folder name.
- Counterexample: a string left as a literal must fail its assertion under `.omp/`.
- Artifacts: ephemeral, removed in `finally`.

## Receipt

---

## ↳ tệp `task-04-omp-rules-injection.md`

# Task 04 — An omp-only install injects rules

Status: pending

## Outcome
A project with only `--platform omp` installed ships `.omp/runtime.json` and `.omp/runtime.schema.json`, its forked hooks carry the portability edits, and `rules.cjs` from `.omp/hooks/` injects `## Rules` for a session. This is the user-visible result the packet exists for.

## Scope
- In: propagate tasks 02–03 into `src/omp/hooks/` while preserving the three omp contract edits and `lib/omp-tool-names.cjs` byte for byte; ship `runtime.json` and the schema for omp in the install phase.
- Out: any new omp-specific behaviour.

## Coverage
- CP-04

## Ownership
- Modify: `packages/spec/src/omp/hooks/` (the eleven hook files)
- Create: `packages/spec/src/omp/runtime.json`
- Modify: `packages/spec/bin/phases/omp-runtime.js`
- Modify: `packages/spec/bin/__tests__/omp-runtime.test.js`
- Modify: `packages/spec/bin/__tests__/omp-hooks.test.js`

## Acceptance
- AC-05: after `--platform omp` into a temp project with no `.claude/`, `.omp/runtime.json` and `.omp/runtime.schema.json` exist, and running `.omp/hooks/rules.cjs` with a session id prints `## Rules`.
- AC-06: a diff of `src/omp/hooks/` against `src/claude/hooks/` lists only `privacy-block.cjs`, `task-scaffold-guard.cjs`, and `lib/omp-tool-names.cjs`, and the differences in the first two are the three contract edits already pinned by `omp-hooks.test.js`.

## Dependencies
- task-03-derive-model-facing-strings.md

## Verification Plan
- Command: `node --test bin/__tests__/omp-runtime.test.js && node --test bin/__tests__/omp-hooks.test.js`
- Named probe: the `an omp-only install injects rules` case in `bin/__tests__/omp-runtime.test.js` and the `the fork differs from Claude only by its contract edits` case in `bin/__tests__/omp-hooks.test.js`.
- Reachability: known — the test drives the real installer into a temp project and runs the installed hook as a child process.
- Oracle: `## Rules` appears; the fork diff matches the allow-list exactly.
- Counterexample: shipping no `runtime.json` must fail the first case; a stray edit in any other fork file must fail the second.
- Artifacts: ephemeral, removed in `finally`.

## Receipt

---

## ↳ tệp `task-05-document-portability.md`

# Task 05 — Documentation records what is portable and what stays Claude-only

Status: pending

## Outcome
The installer architecture document names `runtime-dir.cjs`, states that runtime reads and model-facing strings derive from the hook's location, and lists the six `~/.claude/` sites kept as Claude Code behaviour. Both changelogs gain an entry.

## Scope
- In: the current architecture doc, the two changelogs, one static probe.
- Out: historical records.

## Coverage
- CP-05

## Ownership
- Modify: `docs/installer-architecture.md`
- Modify: `packages/spec/CHANGELOG.md`
- Modify: `docs/project-changelog.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance
- AC-07: a static probe asserts the doc names `runtime-dir.cjs`, the phrase that hooks derive their directory from their own location, and the six `~/.claude/` sites as Claude-only.

## Dependencies
- task-04-omp-rules-injection.md

## Verification Plan
- Command: `node scripts/run-skill-self-tests.mjs`
- Named probe: the `installer architecture documents hook portability` static probe in `runStaticSemanticTests()`.
- Reachability: known — same probe shape as `installer architecture documents omp coverage and gaps`.
- Oracle: suite PASS with the probe executed.
- Counterexample: deleting the portability paragraph must fail the probe.
- Artifacts: none.

## Receipt

---
