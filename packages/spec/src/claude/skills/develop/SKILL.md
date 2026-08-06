---
name: hapo:develop
description: "Code execution engine: Reads specs and implements code end-to-end with automatic code review, self-healing, and visual implementation notes."
user-invocable: true
when_to_use: "Invoke to implement specs and tasks end-to-end after scope is clear."
category: utilities
keywords: [implementation, specs, build, orchestration]
argument-hint: "[feature-name|specs-directory-path] [task-file] [--flash] [--parallel [N]] [--no-notes]"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Develop — Feature Implementation (Task-Orchestrated Build)

Reads the project specification (`hapo:specs`) and implements code through a disciplined task loop. In specific-task mode it behaves like a surgical executor. In full-spec mode it behaves like a sequential orchestrator, processing one unblocked task at a time and syncing state after every verified task.

**Principles:** YAGNI, KISS, DRY | Continuous execution | Smart self-healing

**Executable policy source:** `src/claude/scripts/workflow-policy.cjs` defines mode conflict fail-fast, Light/Standard/Deep delegation, review verdict handling, and flash promotion. Installed Claude runtime uses `.claude/scripts/workflow-policy.cjs`; contracts below must match it.

## Usage

```bash
/hapo:develop <feature name>
/hapo:develop specs/<feature-name>
/hapo:develop <feature name> <specific-task-file.md>
/hapo:develop <feature name> --flash
/hapo:develop <feature name> <specific-task-file.md> --flash
/hapo:develop <feature name> --no-notes
```

## Mode Matrix

| Mode | Scout | Quality gate | Receipt | Notes |
|---|---|---|---|---|
| default (specific-task / full-spec) | per tier | full (Step 4) | verified | |
| `--flash` | per tier | Flash Gate (4F) | `FLASH_UNVERIFIED` | |
| `--parallel` | inspector per task | full, inside each worktree | verified | implies Deep tier |
| `--flash --parallel` | **flash+parallel fail-fast — no execution** | | | reject before state/worktree changes |
| `--no-notes` | — | — | — | composable with all modes |

## Argument validation

Parse flags before loading or mutating spec state. If both `--flash` and `--parallel` are present, print:

```text
Unsupported flags: --flash and --parallel are incompatible.
Remediation: run `/hapo:develop <feature> --flash` or `/hapo:develop <feature> --parallel [N]`.
No spec state, task receipt, worktree, subagent, or commit was created.
```

Then STOP with no execution. Never silently drop `--flash`, prefer `--parallel`, or start a more expensive workflow.


### 1. Specific-Task Mode
Triggered by `/hapo:develop <feature> <task-file>`.

- Load exactly one task file.
- Implement only that task packet.
- STOP immediately after the task is verified and synchronized, or flash-synchronized when `--flash` is active.
- Never auto-chain into the next task.

### 2. Full-Spec Mode
Triggered by `/hapo:develop <feature>` or `/hapo:develop specs/<feature>`.

- Build a queue from `spec.json.task_registry`.
- Select the next `pending` + unblocked task only.
- Run the full implementation cycle for that single task.
- Sync state.
- Recompute the queue and continue.
- STOP the overall run on the first blocked task, unresolved gate failure, or missing proof.
- In `--flash` mode, missing full test proof stores the task as `status: "in_progress"` with receipt `FLASH_UNVERIFIED` and blocker `awaiting /hapo:test <feature>`. It does not unblock dependencies or mark the task done.

### 2b. Parallel Wave Mode (opt-in)
Triggered by adding `--parallel [N]` to Full-Spec mode. Load `references/parallel-waves.md` and follow it exactly — it is the operating procedure (wave planning, dispatch, merge, cleanup).

Contracts: WAVE_CONFIG

<!-- contract:WAVE_CONFIG -->
```jsonc
// .claude/runtime.json — develop parallel toggle (missing key = allowed)
"develop": {
  "parallel": true   // false = --parallel refused, sequential run + notice
}
// Flag: /hapo:develop <feature> --parallel [N]   (N = wave cap, 1..5, default 3)
```

- Preconditions first: if `runtime.json` sets `develop.parallel: false`, refuse `--parallel`, name the key, and run the sequential loop. If the work context is not a git repository or worktree isolation is unavailable, state the reason and fall back sequential (see parallel-waves.md §1).
- Waves are computed from `task_registry.dependencies` with the single-writer-per-file rule; wave cap = N (1..5, default 3).
- Dispatch one `implementer` per wave task — worktree isolation, background, self-contained prompt per `rules/orchestrator.md`, plus the mandatory lines in parallel-waves.md §3 (commit mandate; never edit `spec.json`/`tasks/*.md`; never touch files outside the task's `Related Files`).
- Quality gate (Stage A+B, unchanged) runs inside each task's worktree BEFORE merge; merge = sequential `git cherry-pick` of agent commits with explicit worktree/branch cleanup (spike-verified — see parallel-waves.md §5); post-merge integration check gates the next wave.
- The orchestrator is the single writer of spec state: registry/task-md/receipts update after each cherry-pick, exactly as in sequential mode.
- Without `--parallel`, nothing in this section applies — the sequential Full-Spec loop below is unchanged.

### 3. Flash Mode
Triggered by adding `--flash` to either specific-task or full-spec mode.

- Optimize for fast implementation, not full verification.
- Still load the approved spec, scout every task, obey scope, and implement real code.
- Skip dedicated test suites, E2E/browser/manual QA loops, full task evidence execution, and code-review retry loops.
- Run only cheap preflight checks when available and fast: syntax, typecheck, or build commands that do not require installing dependencies or starting external services.
- Never weaken, delete, or rewrite tests to avoid running them.
- Sync the implementation as `status: "in_progress"` with receipt `FLASH_UNVERIFIED`, blocker `awaiting /hapo:test <feature>`, and no dependency unblocking. Do not claim task or feature completion.
- Final output MUST recommend `/hapo:test <feature>` before merge, release, or publish.

### 4. Implementation Notes
Enabled by default for all develop modes. Disable only with `--no-notes`.

- Maintain `specs/<feature-name>/implementation-notes.html`.
- Use `references/implementation-notes-template.html` when the file does not exist.
- Keep the file self-contained: inline CSS, no JS, no external fonts, no network assets.
- Style notes as readable Claude Code-like blocks: compact cards, left accent bars, category badges, monospace file paths, and a task timeline.
- Record decisions and caveats while implementing, not only at the end.
- Do not use notes to justify scope changes that alter the approved contract. If the contract changes, stop and route back to `/hapo:specs update`.

## Delegation policy (single source for this skill)

Implement in the main session by default. Do not spawn a subagent because a step
mentions an agent name — spawn only per this table:

| Tier (from spec `execution_tier`) | Delegation |
|---|---|
| Light — clear + isolated + ≤2 tasks | None. Main session scouts, implements, verifies. |
| Standard — default / 3-4 tasks | Main session scouts + implements; one independent `code-auditor` review at ship point. |
| Deep — Complex/Critical, auth/payment/migration/schema, 5+ tasks, or `--parallel` | `inspector` scout per task, one `implementer` per worktree (parallel wave), `test-runner` + `code-auditor` gates. |

<HARD-GATE>
DO NOT write implementation code until an approved spec exists.
- If the directory `specs/<feature-name>` DOES NOT EXIST or `spec.json` is not ready, automatically trigger `/hapo:specs <feature-name> --auto` first to create the specification end-to-end (non-interactive). Do not improvise.
</HARD-GATE>

<DEFINITION-OF-DONE>
A task is NOT done because code compiles or a placeholder renders.
A task is done only when the task file's Completion Criteria AND `## Evidence` (legacy heading aliases still parse) are satisfied with real execution proof.
`--flash` is the only exception: it records fast implementation closeout with `FLASH_UNVERIFIED`, not full Definition of Done.
</DEFINITION-OF-DONE>

<CONTRACT-FIDELITY>
If the spec/task explicitly names a framework, auth system, datastore, transport path, or runtime boundary, that named choice is contractual.
You MUST NOT silently replace it with a simpler custom substitute ("for MVP", "placeholder", "temporary auth", "in-memory until later") unless the spec itself is updated first.
</CONTRACT-FIDELITY>

<SCOPE-FIDELITY>
The approved `scope_lock`, requirements, design contracts, and active task packet are the implementation contract.
You MUST implement all scoped behavior for the active task, MUST NOT add out-of-scope behavior, and MUST NOT mark work done while required surfaces exist only as orphaned files, unmounted UI, unregistered routes, uncalled loaders, or placeholder wiring.
</SCOPE-FIDELITY>

## Absolute Workflow

```mermaid
flowchart TD
    A["/hapo:develop \u003cfeature\u003e"] --> B[Step 1: Load Spec]
    B -->|Missing| Z[Stop: Run /hapo:specs]
    B -->|Ready| C[Step 2: Task-Aware Scout (per Delegation policy)]
    C --> D[Step 3: Implement (per Delegation policy)]
    D --> E{Flash Mode?}
    E -->|No| Q[Step 4: Quality Gate: Test + Spec Review + Code Review + Evidence]
    E -->|Yes| R[Step 4F: Flash Gate: Minimal Preflight + Scope Sanity]
    Q -->|Fail| D
    Q -->|Pass| F[Step 5: State Sync + Incremental Docs Sync]
    R -->|Syntax/compile fail| D
    R -->|Flash closeout| F
    F --> H{More tasks?}
    H -->|Yes| B
    H -->|No| G[Final Integration Scout + Report Completion]
```

### Step 1: Initialize & Load Spec
- Identify input: Open `specs/<feature-name>/spec.json`.
- Check `ready_for_implementation` status. If not ready, notify user.
- Load `task_registry` and verify it matches the requested task file(s). If registry is missing or stale, route to `/hapo:sync audit <feature>` before coding.
- Unless `--no-notes` is present, initialize or update `specs/<feature-name>/implementation-notes.html`:
  - If missing, create it from `references/implementation-notes-template.html`.
  - Replace template placeholders for feature name, spec path, creation timestamp, and current mode.
  - If present, preserve existing note cards and update the summary/timeline/status fields.
- **Task Scoping (CRITICAL):**
  - If the user specifies a particular task file (e.g., `task-R0-02...md`), load **ONLY** that specific file into working memory.
  - If no specific task is mentioned, DO NOT load all tasks into working memory. Resolve the next single unblocked `pending` task from `task_registry` and load only that task packet.
- **Task Packet Extraction (MANDATORY):** Before coding, extract from the active task file(s):
  - Objective + Constraints
  - Related Files
  - Completion Criteria
  - `## Evidence` (legacy heading aliases still parse)
  - Exact executable verification commands named in the task
  - Requirement IDs referenced by the task
  - Named technologies, frameworks, protocols, and data stores that the task/spec explicitly requires
  - Relevant `Canonical Contracts & Invariants` from `design.md`
- If the task file is missing actionable completion or verification detail, STOP and route back to spec correction. Do not guess.
- Before coding, set the active task(s) to `in_progress` in both markdown and `spec.json.task_registry`, or route through `/hapo:sync` if the runtime expects the sync protocol.

### Step 2: Scout (Codebase Inspection)
- **Scout per Delegation policy** — Deep tier delegates to `inspector`; Light/Standard scouts in the main session with the same required outputs:
- The scout prompt MUST include:
  - Active task file path and extracted task packet
  - Requirement IDs and `scope_lock`
  - Relevant `design.md` contracts/invariants
  - Prior completed task outputs from `spec.json.task_registry`
  - Related Files from the active task
- The scout MUST report:
  - Real runtime entrypoints/callers affected by the task (`App.tsx`, routes, CLI command, worker registration, manifest, API consumer, etc.)
  - Existing integration points and adjacent code patterns to follow
  - Prior task outputs this task must consume or preserve
  - Blast-radius touchpoints and dependent files that can regress
  - Reachability risks: orphan components, unmounted UI, unregistered routes, uncalled services/loaders, unused providers, disconnected reducers/actions
  - Exact files likely safe to modify and any files outside `Related Files` that require a justified scope escape
- If the inspector cannot identify the entrypoint/caller for a runtime-facing task, STOP and route back to spec correction or ask the user. Do not guess.

### Step 3: Implement Code
- Act as the `implementer` per the Delegation policy (default: the main session), executing tasks specified in the loaded Markdown file(s) sequentially.
- **Important:** You may create and modify files directly, but must faithfully follow the design from the Spec.
- You MUST use the Step 2 scout report as implementation context. If code reality contradicts the task packet, stop and reconcile the spec before coding.
- Unless `--no-notes` is present, append a note card to `implementation-notes.html` whenever any of these occurs:
  - `decision`: a necessary implementation choice not specified by the spec
  - `spec-gap`: missing or ambiguous spec detail discovered during implementation
  - `codebase-reality`: existing code requires a different integration path than the task implied
  - `tradeoff`: a conscious simplicity, performance, UX, or maintainability tradeoff
  - `scope-escape`: a file or behavior outside Related Files must be touched for reachability/compile/integration
  - `risk`: known residual risk, edge case, or deferred follow-up
  - `verification`: command result, skipped check, manual proof, or evidence caveat
- Progress tracking: Temporarily change `[ ]` to `[/]` in Spec files while coding is in progress. Do NOT mark `[x]` before Step 4 passes.
- **Task Boundary Protocol (CRITICAL):**
  - Default editable scope is `Related Files` from the task packet.
  - You may additionally touch direct test files plus minimal support files required to make the current task executable (shared types, exports, config glue, generated migration wiring).
  - If you must edit a file outside this scope, explicitly treat it as a `scope escape` and justify why it is required for the current task.
  - If the out-of-scope change would deliver functionality clearly assigned to a later task, STOP instead of implementing it early.
- **Hard Stop Protocol:** If you were asked to implement a specific task file, you MUST STOP completely after that task is verified. DO NOT auto-chain or jump to "Next Task" simply because you see it in the spec. Wait for the user's next command.
- **Full-Spec Loop Protocol:** If you were asked to implement the whole feature, you MUST still work one task at a time. Finish Step 4 and Step 5 for the current task before selecting the next unblocked task from `task_registry`.
- **Test Integrity Protocol:** You MUST NOT delete, replace, or reduce the scope of existing test cases to make tests pass. If a test fails, you must fix the **implementation code** or fix the **test setup/mock**, NOT remove the assertion. Reducing test count or weakening assertions (e.g., removing `toHaveBeenCalledWith` and replacing with `toEqual(expect.any(...))`) is a Critical violation.
- **Contract Integrity Protocol:** If implementation appears to require changing auth/session, transport, persistence, entrypoint wiring, or generated artifact behavior beyond what `design.md` states, STOP and route back to spec correction instead of inventing a new contract in code.
- **Named Technology Rule:** If the task/spec explicitly requires a named dependency or runtime choice (for example Better Auth, Hono, Next.js proxy routes, Redis, Drizzle, S3), you MUST implement that choice or stop. Do not swap it for a custom/in-memory/local substitute and still call the task complete.
- **Cross-Service Reality Rule:** If a task spans multiple processes or runtimes (web ↔ API, worker ↔ DB, extension ↔ backend), you MUST prove the integration uses shared real state or a real contract boundary. Process-local placeholders on both sides do not count as completion.
- **Placeholder Completion Rule:** You MAY scaffold future files only when the active task truly needs them to compile, but placeholder route handlers, in-memory stores, or fake adapters MUST NOT be used as evidence that the current task's behavior works end-to-end.
- **Reachability Rule:** Runtime-facing work is incomplete until it is reachable from the real entrypoint/caller named in the task evidence or Step 2 scout report. Creating a component/service/route/provider/reducer without importing, mounting, registering, or invoking it is not implementation.
- **Prior Output Consumption Rule:** If this task depends on previous task outputs, verify those outputs are consumed through real code paths. If a prior output is unused and this task is responsible for wiring it, wire it now; if a later task owns the wiring, keep the current task pending unless that deferral is named in the active task evidence.

### Step 4: Self-Healing (Quality Gate Auto-Fix)
The moment you finish coding, DO NOT proceed further. Switch to `references/quality-gate.md` and run the automatic review loop.
**Mantra:** Scope/spec compliance first, code quality second. All feedback from code-auditor must be addressed thoroughly: PASS requires no Critical findings, no High findings, and at most one Medium.

If `--flash` is active, use **Step 4F: Flash Gate** instead of the full automatic review loop.

- Passing Step 4 requires ALL of the following:
  1. Automated verification passes, including preflight compile/typecheck/build health and every exact command named in the task's `## Evidence` (legacy heading aliases still parse)
  2. Spec compliance review passes: every scoped requirement and active task criterion is implemented, with no extras and no omissions
  3. Code quality review passes
  4. Task evidence passes (artifacts/runtime surfaces/reachability/negative-path checks from the task file are proven)
- Violating any Step 3 rule = FAIL.
- `PRECHECK_FAIL` outranks `NO_TESTS`. If compile/typecheck/build fails, the task is FAIL even when no test suite exists yet.
- If build/test passes but task evidence is missing, the task is still FAIL.
- Only escalate to the user after 3 consecutive failed review rounds.

### Step 4F: Flash Gate (`--flash` only)
Flash mode is an explicit speed trade-off requested by the user.

- Skip:
  - dedicated test commands from task Evidence
  - full test-runner delegation
  - E2E/browser/manual QA loops
  - full code-auditor retry loop
  - screenshot, accessibility, performance, and visual verification unless the active task is purely visual and can be checked cheaply
- Still perform:
  - task-aware scout from Step 2
  - active task scope sanity check against Completion Criteria
  - reachability sanity check for runtime-facing files: imported, mounted, registered, routed, or invoked where applicable
  - cheap compile/syntax/typecheck/build command when it is already available and expected to run quickly
- If the cheap preflight fails, return to Step 3 and fix before syncing.
- If no cheap preflight exists or it would require slow setup/external services, record `Preflight: skipped in --flash mode`.
- Flash output MUST log: `⚡ Step 4 Flash Gate: tests skipped by --flash; preflight=<pass|skipped>; evidence=FLASH_UNVERIFIED`.
- Flash output MUST NOT say `Test PASS`, `Evidence PASS`, `Auto-Approved`, or `production-ready`.

### Step 5: State Sync + Task-Level Docs Sync
- Only after Step 4 passes may you mark task checkboxes completed and sync `spec.json` progress/timestamps/task_registry.
- In `--flash`, Step 4F may record implementation closeout only as `status: "in_progress"` with `FLASH_UNVERIFIED` and blocker `awaiting /hapo:test <feature>`; it never syncs `done` or unblocks dependencies.
- If verification is partial or blocked by environment, keep the task in `pending` or `in_progress` and record the blocker instead of pretending completion.
- A completed task MUST leave behind:
  - markdown `**Status:** done`
  - `spec.json.task_registry[path].status = "done"`
  - `completed_at` + `last_updated_at`
  - synchronized top-level `updated_at`
  - a human-readable verification receipt inside the task's `Evidence` section showing which commands ran, their outcomes, and what proof was observed
- In `--flash`, the receipt MUST include `Mode: --flash`, `Tests: skipped by user request`, `Evidence: FLASH_UNVERIFIED`, `Status: in_progress`, `Blocker: awaiting /hapo:test <feature>`, and `Next verification: /hapo:test <feature>`.
- Verification receipts with `PRECHECK_FAIL`, `FAIL`, `UNVERIFIED`, or an explicit note that the implementation intentionally simplified a named contract MUST NOT be synchronized as `done`.
- Exception: `FLASH_UNVERIFIED` is allowed only when `--flash` is explicitly present. It records fast implementation completion, not full verification completion.
- Unless `--no-notes` is present, update `implementation-notes.html` before reporting the task:
  - Mark the task block as `done`, `blocked`, or `flash_unverified`.
  - Add a `verification` note with exact commands run or `Tests skipped by --flash`.
  - If no implementation note was needed for the task, add a compact `decision` note: `No spec gaps, tradeoffs, scope escapes, or deferred risks recorded for this task.`
  - Add `Next verification: /hapo:test <feature>` when any evidence is skipped, partial, or `FLASH_UNVERIFIED`.
- After syncing the active task, run a **Task Closeout Docs Checkpoint**
- Task Closeout Docs Checkpoint:
  - Evaluate `Docs impact: none | minor | major` based on real behavior changes from the just-completed task
  - If `none`: record that explicitly in the completion report and stop
  - If `minor` or `major`: trigger `docs-keeper` to surgically update affected existing docs under `./docs`
  - Default to **lightweight docs sync**: update only the docs touched by this task and its verified behavior; do NOT run `repomix` unless `docs-keeper` truly cannot verify the required architecture/context from the code, spec, and current docs
- **CWD Protocol (CRITICAL):** When spawning `docs-keeper`, set its Current Working Directory (CWD context) to the **Workspace Root**, not the inner package directory.
- Task-level docs sync happens after every verified completed task, but actual edits still depend on `Docs impact`.
- In **Specific-Task Mode**, STOP after sync and report the result.
- In **Full-Spec Mode**, only after sync may you re-read `task_registry`, pick the next unblocked pending task, and repeat from Step 1 for that task.
- When no pending tasks remain, run a **Final Integration Scout** before reporting completion:
  - Trace runtime entrypoints from `main`/route/CLI/worker/manifest/API consumer through the scoped feature surfaces.
  - Compare reachable behavior against `scope_lock`, `requirements.md`, `design.md`, and all task Completion Criteria.
  - FAIL completion if any scoped surface is missing, any created runtime-facing artifact is orphaned, or spec progress/registry says done while evidence is missing.
  - Only then set top-level progress to `code_done` / next phase.

---
## Attached References
- `references/quality-gate.md` - Rules for the Code Review loop.
- `references/subagent-patterns.md` - Standard prompts for calling subagents.
- `references/implementation-notes-template.html` - Self-contained visual implementation notes template.
