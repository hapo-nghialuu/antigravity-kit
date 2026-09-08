# omp runtime support — packet chờ chỗ trong specs/

Packet process-first v3 hoàn chỉnh cho việc thêm nền tảng Oh My Pi (omp). C1 chốt KEEP, C2 chốt fork cây hook, cùng ngày 2026-09-08. Resolver đã xác nhận bố cục: `layoutKind: process-v3`, `queueReady: true`, 4 task, task 01 `pending` và ba task còn lại `blocked` theo dependency.

**Vì sao nằm ở `plans/` chứ không phải `specs/`:** `spec-resolver.cjs:275` chỉ coi packet là hết hoạt động khi *mọi* task đều `done`. Đặt vào `specs/` khi `receipt-freshness-policy` còn dang dở tạo hai active spec, và cổng Stop chặn mọi lượt. CafeKit hiện không hỗ trợ hai packet song song.

**Khôi phục:** sau khi `receipt-freshness-policy` đóng, tạo `specs/omp-runtime-support/` rồi tách năm phần dưới đây thành `plan.md` và bốn `task-NN-*.md` đúng tên đã ghi.

---

## ↳ tệp `plan.md`

# Oh My Pi (omp) runtime support
Specs-Contract: process-first-ready-v1

## Scope decision (C1 — 2026-09-08)
- Existing: `bin/lib/context.js:73` holds the `PLATFORMS` registry with an "Add new platforms here" stub at `:123`. `bin/install.js:66,76` branches phases per `platformKey`. `src/claude/settings/settings.json` registers **15** hook scripts; two further `.cjs` files under `src/claude/hooks/` are libraries, not gates. `src/codex/hooks/` is the working precedent for a forked runtime: 16 hook scripts plus 8 libraries, with three shared libraries materialized from the Claude source at `bin/phases/codex-runtime.js:81,88,95`.
- Minimum change: register omp as a platform, fork the hook tree the way Codex already does, and add one bridge extension that maps omp lifecycle events onto the forked hooks.
- Expansion signals: above the eight-file threshold and now a forked tree. One subsystem only; grok and pi stay in separate packets.
- User decision: KEEP — deliver the bridge with gate coverage (C1, 2026-09-08). C2 chose the forked-tree architecture over a translate-everything bridge (2026-09-08).

## Verified runtime contract
Read from `/opt/homebrew/Cellar/omp/18.1.11/bin/omp` on 2026-09-08. Each row was confirmed by reading the binary, not inferred.
| Fact | Consequence |
|---|---|
| `emitToolCall` returns `{ block: true, reason }`; on handler timeout or throw omp itself substitutes `{ block: true, reason: "Extension … timed out after <ms>" }` | omp fails **closed** at `tool_call`. A bridge cannot fail open there even if it tries. |
| `extensionHandlers.toolCallTimeoutMs` defaults to 30000 | The bridge needs its own budget below 30000 ms or omp blocks first with a useless reason. |
| `emitSessionStop({ …, session_id, session_file, stop_hook_active, … })` | `stop_hook_active` is real and host-owned; `spec-gate.cjs:82` can rely on it. |
| `session_stop` result reads `decision`, `reason`, `additionalContext`, `continue` | The Stop gate's existing block shape maps directly. |
| `input` payload is `{ type, text, images, source }` | **No `session_id`, no `cwd`.** `rules.cjs:57` exits when session id is absent. |
| Tool registry names are lowercase: `bash`, `read`, `edit`, `grep` | `privacy-block.cjs:182` compares `toolName === 'Bash'` exactly and would never match. |
| `skills.enableClaudeProject` and `skills.enableAgentsProject` default true | Skills already reach omp; no skill payload is copied. |

## Denial mechanisms actually in use
No hook emits a block reason on stderr. Verified across `src/claude/hooks/`.
| Mechanism | Hooks | Where |
|---|---|---|
| `{"decision":"block","reason":R}` on stdout, exit 0 | `spec-gate.cjs`, `completion-authority.cjs` | `spec-gate.cjs:57` |
| `hookSpecificOutput.permissionDecision: "ask"` on stdout, exit 0 | `privacy-block.cjs` | `privacy-block.cjs:191-198`, catch-all `:239-245` |
| exit 2 with the reason on **stdout** | `inspect-block.cjs`, `task-scaffold-guard.cjs` | `inspect-block.cjs:91-96` |

## Out of scope
- grok and pi; each gets its own packet.
- Any change to `src/claude/hooks/`. The omp fork carries omp-specific contract changes, exactly as `src/codex/hooks/` does.
- Claude Code plugin packaging, deferred by the user on 2026-09-03.
- Copying skills or rules content, since omp discovers both already.

## Coverage profile
| ID | Outcome | Change kinds | Material surfaces | Ambiguity/action | Risk/evidence | Required proof |
|---|---|---|---|---|---|---|
| CP-01 | `--platform omp` installs a complete omp runtime | add platform entry, add install phase, add ignore rule | `bin/lib/context.js`, `bin/install.js`, `bin/phases/omp-runtime.js`, `bin/phases/root-config.js` | settled | elevated — installed behavior | source + installed |
| CP-02 | The forked hooks speak omp's vocabulary | fork tree, change verdict and tool-name handling | `src/omp/hooks/` | settled by C2 | elevated — a wrong verdict silently disables a gate | source + installed |
| CP-03 | The bridge maps omp events onto the forked hooks | add bridge module | `src/omp/extensions/` | settled | elevated — enforcement correctness | source + installed |
| CP-04 | A blocked turn can still be approved and closed | map the approve path | `src/omp/hooks/`, bridge | settled | elevated — an unmapped approve path deadlocks every session | source |
| CP-05 | Docs state omp's real coverage and its gaps | modify docs | `docs/installer-architecture.md`, changelogs | settled | routine | source |

## Acceptance criteria
| ID | EARS criterion | Proof |
|---|---|---|
| AC-01 | When the installer runs with `--platform omp`, it shall create `.omp/hooks/`, `.omp/extensions/`, and `.omp/cafekit.json` recording `platform: "omp"`. | `node --test bin/__tests__/omp-runtime.test.js` |
| AC-02 | When the installer runs with a non-omp platform, it shall not create `.omp/`. | `node --test bin/__tests__/omp-runtime.test.js` |
| AC-03 | When the installer provisions omp, it shall add `.omp/` to the project ignore rules, because `.omp/extensions/` is auto-executed by omp. | `node --test bin/__tests__/omp-runtime.test.js` |
| AC-04 | When a forked hook receives a lowercase omp tool name, it shall apply the same rule it applies to the Claude name, for at least `bash`, `read`, `edit`, `write`, `grep`. | `node --test bin/__tests__/omp-hooks.test.js` |
| AC-05 | When the forked privacy hook would ask under Claude, it shall deny under omp, since omp's `tool_call` contract has no ask state. | `node --test bin/__tests__/omp-hooks.test.js` |
| AC-06 | When a forked hook cannot evaluate an access safely, it shall deny rather than allow. | `node --test bin/__tests__/omp-hooks.test.js` |
| AC-07 | When the bridge dispatches a hook, it shall pass a Claude-shaped payload carrying a stable session identifier derived from omp's session, so session-scoped hooks do not silently no-op. | `node --test bin/__tests__/omp-bridge.test.js` |
| AC-08 | When a dispatched hook denies through any of the three mechanisms in this plan, the bridge shall return omp's block shape carrying the hook's own reason text. | `node --test bin/__tests__/omp-bridge.test.js` |
| AC-09 | When a dispatched hook exceeds the bridge's own timeout budget, the bridge shall return a block naming the hook, before omp's 30000 ms cut-off produces a reasonless block. | `node --test bin/__tests__/omp-bridge.test.js` |
| AC-10 | When `session_stop` arrives with `stop_hook_active` true, the bridge shall return without dispatching the gate. | `node --test bin/__tests__/omp-bridge.test.js` |
| AC-11 | When the user submits the approval phrase that the completion gate demanded, the bridge shall route it to the hook's approve path so the session can close. | `node --test bin/__tests__/omp-bridge.test.js` |
| AC-12 | When operator documentation lists platforms, it shall name omp, name the hooks it carries, and name the registered hooks it does not carry. | `node scripts/run-skill-self-tests.mjs` |

## Tasks
| # | Task | Criteria | Primary ownership | Dependencies | Status |
|---|---|---|---|---|---|
| 01 | Register omp as an install target | AC-01, AC-02, AC-03 | `bin/lib/context.js`, `bin/install.js`, `bin/phases/omp-runtime.js`, `bin/phases/root-config.js` | - | pending |
| 02 | Fork the hook tree for omp's vocabulary | AC-04, AC-05, AC-06 | `src/omp/hooks/` | task-01-register-omp-platform.md | blocked |
| 03 | Bridge omp events onto the forked hooks | AC-07, AC-08, AC-09, AC-10, AC-11 | `src/omp/extensions/cafekit-bridge.mjs` | task-02-fork-omp-hooks.md | blocked |
| 04 | Document omp coverage and its gaps | AC-12 | `docs/installer-architecture.md`, `packages/spec/CHANGELOG.md`, `docs/project-changelog.md`, `packages/spec/scripts/run-skill-self-tests.mjs` | task-03-bridge-omp-events.md | blocked |

## Review log
- Round 1 (2026-09-08): two fresh-context reviewers, both FAIL. 15 deduplicated findings. Accepted 13 as defects and rewrote the acceptance layer: AC-04 previously named two denial mechanisms where three exist and put the reason on stderr where every hook writes stdout; AC-05 mandated fail-open where omp itself fails closed at `tool_call`; task 01 installed no hooks at all; lowercase omp tool names, the missing session id on `input`, and the unmapped approve path were all absent from the plan. Corrected the hook count from seventeen to fifteen registered plus two libraries, and narrowed the coverage claim. Rejected nothing. One reviewer flagged `stop_hook_active` as unverified; the other verified it in the binary and the flag was wrong — the field is real and AC-10 stands. C2 decision: fork the hook tree following the Codex precedent.

---

## ↳ tệp `task-01-register-omp-platform.md`

# Task 01 — `--platform omp` installs a complete omp runtime

Status: pending

## Outcome
`node bin/install.js --platform omp` creates `.omp/hooks/`, `.omp/extensions/`, and `.omp/cafekit.json`, and adds `.omp/` to the project ignore rules. Installing any other platform leaves `.omp/` absent.

## Scope
- In: the `PLATFORMS` entry, a dedicated install phase that copies the forked tree and the bridge, and the ignore rule.
- Out: the content of the forked hooks (task 02) and the bridge logic (task 03). This task installs whatever those directories hold; it is verified against directory and metadata presence, never against gate behaviour.

## Coverage
- CP-01

## Ownership
- Modify: `packages/spec/bin/lib/context.js`
- Modify: `packages/spec/bin/install.js`
- Modify: `packages/spec/bin/phases/root-config.js`
- Create: `packages/spec/bin/phases/omp-runtime.js`
- Create: `packages/spec/bin/__tests__/omp-runtime.test.js`
- Read: `packages/spec/bin/phases/codex-runtime.js`

## Acceptance
- AC-01: after `--platform omp`, `.omp/hooks/` contains the forked hook scripts, `.omp/extensions/` contains the bridge file, and `.omp/cafekit.json` records `platform: "omp"`.
- AC-02: after `--platform claude` alone, `.omp/` does not exist.
- AC-03: after `--platform omp`, the project ignore rules cover `.omp/`, matching how `bin/phases/root-config.js:111-113` already covers `.claude/`, `.codex/`, and `.agents/`.

## Dependencies
- none

## Verification Plan
- Command: `node --test bin/__tests__/omp-runtime.test.js`
- Named probe: the `an omp install creates hooks, extensions and metadata`, `a non-omp install creates no .omp directory`, and `an omp install ignores its own auto-executed extension directory` cases in `bin/__tests__/omp-runtime.test.js`.
- Reachability: known — `bin/install.js:66,76` already dispatches per `platformKey`, and the test drives the real installer against a temporary git project exactly as `bin/__tests__/codex-hooks-ownership.test.js` does.
- Oracle: the three cases pass and the installer exits 0.
- Counterexample: wiring the phase outside a `platformKey === 'omp'` guard must fail the second case; omitting the ignore rule must fail the third.
- Artifacts: ephemeral temporary project directories from `fs.mkdtempSync`, removed in `finally`.

## Receipt

---

## ↳ tệp `task-02-fork-omp-hooks.md`

# Task 02 — The forked hooks speak omp's vocabulary

Status: blocked

## Outcome
`src/omp/hooks/` holds a hook tree derived from `src/claude/hooks/` with three omp-specific contract changes: lowercase tool names are recognised, the privacy hook denies where it would ask, and an unevaluable access denies rather than allows.

## Scope
- In: the forked tree and its omp-specific contract changes.
- Out: `src/claude/hooks/`, which does not change. Shared libraries with no omp-specific behaviour are materialized from the Claude source at install time rather than copied into the fork, following `bin/phases/codex-runtime.js:81,88,95`.

## Coverage
- CP-02

## Ownership
- Create: `packages/spec/src/omp/hooks/` (forked scripts and omp-specific libraries)
- Create: `packages/spec/bin/__tests__/omp-hooks.test.js`
- Read: `packages/spec/src/claude/hooks/privacy-block.cjs`
- Read: `packages/spec/src/codex/hooks/privacy-block.cjs`
- Read: `packages/spec/src/claude/settings/settings.json`

## Acceptance
- AC-04: a payload naming tool `bash` reaches the same command-scanning branch that `Bash` reaches today, and the same holds for `read`, `edit`, `write`, and `grep`. Verified against `src/claude/hooks/privacy-block.cjs:182`, which compares the Claude name exactly.
- AC-05: where `src/claude/hooks/privacy-block.cjs:191-198` emits `permissionDecision: "ask"`, the omp fork emits a denial, because omp's `tool_call` result has only `block` and `reason`. `src/codex/hooks/privacy-block.cjs` is the precedent for this substitution.
- AC-06: where `src/claude/hooks/privacy-block.cjs:239-245` catches an unexpected error and asks, the omp fork denies. The identifier surfaces this protects are the ones listed in that hook's own pattern table, including `.env*`, `credentials*`, `*.pem`, `*.key`, `id_rsa`-class keys, `.netrc`, `.pgpass`, and `kubeconfig`.

## Dependencies
- task-01-register-omp-platform.md

## Verification Plan
- Command: `node --test bin/__tests__/omp-hooks.test.js`
- Named probe: the `lowercase omp tool names hit the same rules`, `the privacy hook denies where Claude asks`, and `an unevaluable access denies` cases in `bin/__tests__/omp-hooks.test.js`.
- Reachability: known — the tests run each forked hook as a real child process over stdin, the same way `bin/__tests__/secret-output-guardrail.test.js` already drives installed hooks.
- Oracle: a `bash` payload carrying a secret-bearing path is denied; the same payload with an ordinary path is allowed; a malformed payload is denied.
- Counterexample: leaving the exact `=== 'Bash'` comparison in the fork must fail the first case; keeping `permissionDecision: "ask"` must fail the second; making the catch-all allow must fail the third.
- Artifacts: ephemeral temporary directories from `fs.mkdtempSync`, removed in `finally`. Mutation checks run only on copies inside those directories, never on tracked source.

## Receipt

---

## ↳ tệp `task-03-bridge-omp-events.md`

# Task 03 — The bridge maps omp events onto the forked hooks

Status: blocked

## Outcome
An extension loaded from `.omp/extensions/` receives omp lifecycle events, dispatches the matching forked hook with a Claude-shaped payload carrying a stable session identifier, and returns omp's block shape with the hook's own reason. A blocked turn can be approved and closed.

## Scope
- In: event mapping, payload shaping including session identity, verdict translation across all three denial mechanisms, the bridge's own timeout budget, the re-entry guard, and the approve path.
- Out: hook contract changes, owned by task 02.

## Coverage
- CP-03
- CP-04

## Ownership
- Create: `packages/spec/src/omp/extensions/cafekit-bridge.mjs`
- Create: `packages/spec/bin/__tests__/omp-bridge.test.js`
- Read: `packages/spec/src/claude/hooks/spec-gate.cjs`
- Read: `packages/spec/src/claude/hooks/completion-authority.cjs`
- Read: `packages/spec/src/claude/settings/settings.json`

## Acceptance
- AC-07: every dispatched payload carries a session identifier the bridge derives from omp's session context and keeps stable for that session, because omp's `input` payload is only `{ type, text, images, source }` and `src/claude/hooks/rules.cjs:57` exits when the identifier is absent.
- AC-08: a hook denying through any of the plan's three mechanisms yields omp's `{ block: true, reason }` carrying the hook's own reason text, including the exit-2 hooks whose reason arrives on stdout per `src/claude/hooks/inspect-block.cjs:91-96`.
- AC-09: a hook exceeding the bridge's budget yields a block naming that hook. The budget is fixed below omp's `extensionHandlers.toolCallTimeoutMs` default of 30000 ms so the bridge's reason wins over omp's substitute.
- AC-10: a `session_stop` payload with `stop_hook_active` true returns without dispatching the gate, matching `src/claude/hooks/spec-gate.cjs:82`.
- AC-11: the approval phrase produced by `src/claude/hooks/completion-authority.cjs:132-133` reaches that hook's approve path, which `:77` reaches only for a `UserPromptSubmit` event with a session id, so a blocked turn has a real exit.

## Dependencies
- task-02-fork-omp-hooks.md

## Verification Plan
- Command: `node --test bin/__tests__/omp-bridge.test.js`
- Named probe: the `each denial mechanism becomes an omp block`, `a slow hook blocks with its own name before omp cuts it off`, `stop_hook_active short-circuits the gate`, `the approval phrase reaches the approve path`, and `every dispatch carries a stable session id` cases in `bin/__tests__/omp-bridge.test.js`.
- Reachability: known — omp auto-discovery of `.omp/extensions/` and the `session_start` dispatch were observed on 2026-09-08 from a real `omp -p` run against a probe extension, and the omp contract rows in `plan.md` were read from the installed binary. The automated tests drive the bridge's exported functions against real child hook processes; they do not launch omp, which needs provider credentials. That gap is the reason AC-08 and AC-09 assert on the bridge's return value rather than on omp's observed behaviour.
- Oracle: each named case's assertion holds; a blocked dispatch reports the hook's own reason rather than a generic one.
- Counterexample: dropping the `stop_hook_active` guard must fail the third case; treating a non-zero exit as a bare block without reading stdout must fail the first; omitting session identity must fail the fifth.
- Artifacts: ephemeral temporary directories from `fs.mkdtempSync`, removed in `finally`.

## Receipt

---

## ↳ tệp `task-04-document-omp-support.md`

# Task 04 — Documentation states omp's real coverage and its gaps

Status: blocked

## Outcome
The installer architecture document and both changelogs state that omp is supported, which hooks it carries, and which registered hooks it does not. A reader can tell what they get without reading source.

## Scope
- In: the current installer architecture doc and the two changelogs.
- Out: historical records. Past changelog entries and the 2026-07 audit stay as written.

## Coverage
- CP-05

## Ownership
- Modify: `docs/installer-architecture.md`
- Modify: `packages/spec/CHANGELOG.md`
- Modify: `docs/project-changelog.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance
- AC-12: a static probe asserts the architecture doc names omp, names `.omp/extensions/` as the bridge location, states that skills reach omp through its own Claude and agents discovery rather than a copied payload, and names the registered hooks omp does not carry.

## Dependencies
- task-03-bridge-omp-events.md

## Verification Plan
- Command: `node scripts/run-skill-self-tests.mjs`
- Named probe: the `installer architecture documents omp coverage and gaps` static probe added to `runStaticSemanticTests()` in `packages/spec/scripts/run-skill-self-tests.mjs`.
- Reachability: known — `runStaticSemanticTests()` already runs file-content probes of this shape, and the suite is the repository's standard gate.
- Oracle: the suite reports PASS with the new probe among the executed checks.
- Counterexample: deleting the omp paragraph, or listing a hook omp does not actually carry, must fail the probe.
- Artifacts: none; the suite reads tracked files in place.

## Receipt

---
