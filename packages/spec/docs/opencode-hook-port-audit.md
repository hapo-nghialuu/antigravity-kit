# Claude Hook → OpenCode Plugin Port Audit (T1)

Per-hook decision matrix with exact behavior translation, dependencies on shared libs, and runtime semantics. Cross-reference with `opencode-plugin-contract.md`.

## Summary Table

| Hook | Claude events | OpenCode equivalent | Verdict | Owner task |
|---|---|---|---|---|
| `privacy-block.cjs` | PreToolUse(Read,Write,Edit,MultiEdit,Bash,Glob,Grep) | `tool.execute.before` | **PORT (full)** | T2.1 |
| `inspect-block.cjs` | PreToolUse | `tool.execute.before` | **PORT (full)** | T3.4 |
| `state.cjs` | SessionStart, PostToolUse, Stop, SubagentStop | `event` + `tool.execute.after` | **PORT (partial)** — drop SubagentStop branch; Stop ≈ session.idle | T3.1 |
| `docs-sync.cjs` | SessionStart | `event` (session.created) | **PORT (full)** | T3.2 |
| `session.cjs` | SessionStart(startup,resume,clear,compact) | `event` (session.created + session.compacted) | **PORT (partial)** — banner only, no `CLAUDE_ENV_FILE` writes (OpenCode has no equivalent) | T3.3 |
| `spec-state.cjs` | UserPromptSubmit | `chat.message` (mutate `output.parts`) | **PORTED** — inject tollgate text part before model turn |
| `task-scaffold-guard.cjs` | PreToolUse(Write) | `tool.execute.before` (`write` + `apply_patch`) | **PORTED** — block task-file creation; three safety valves |
| `rules.cjs` | UserPromptSubmit | none | **DROP** — fold into AGENTS.md + skill-workflow-routing.md |
| `agent.cjs` | SubagentStart | none | **DROPPED** — OpenCode `session.created`+`parentID` subagent surface is unreliable; orchestrator already mandates self-contained subagent prompts (low ROI) |
| `usage.cjs` | UserPromptSubmit + PostToolUse | `tool.execute.after` (only) | **PORT (partial)** — drop prompt half; keep file-edit counter |

## Detailed Per-Hook Translation

### 1. privacy-block.cjs → `.opencode/plugins/privacy-block.ts`

**Behavior:** Match tool input paths against RESTRICTED_PATTERNS; if Bash, warn (allow); otherwise throw with `@@PRIVACY_PROMPT_START@@…END@@` JSON marker.

**OpenCode mapping:**
- Hook: `tool.execute.before(input, output)`
- Tools to gate: `read`, `write`, `edit`, `bash`, `glob`, `grep` (lowercase per OpenCode)
- Path extraction:
  - `read|write|edit` → `output.args.filePath` (OpenCode tool schema uses `filePath` camelCase, verify in T2.1)
  - `bash` → parse `output.args.command` with same regex
  - `glob|grep` → `output.args.path` / `output.args.pattern`
- Block: `throw new Error(formatBlockMessage(filePath))` — message contains JSON marker exactly as today.
- Bash branch: do NOT throw; log warning to stderr via `console.error(...)`.

**Runtime config:** read `.opencode/runtime.json` (`privacyBlock: false` disables). Helper: copy `lib/config.cjs` minimal `readRuntime` or inline.

**Side effects:** crash logging to `.opencode/plugins/.logs/hook-log.jsonl` (mirror existing pattern).

### 2. inspect-block.cjs → `.opencode/plugins/inspect-block.ts`

**Behavior:** Block reads into `node_modules`/`.next`/`dist`/`.git`/etc., block broad globs (`**/*.ts`), allow approved build commands.

**OpenCode mapping:**
- Hook: `tool.execute.before`
- Tools: `read`, `write`, `edit`, `glob`, `grep`, `bash`
- Block: `throw new Error(<message>)` (no JSON marker — just the SCOPE LIMIT message — Claude version uses console.log + exit 2, OpenCode equivalent is throw).
- Allowed command regex (npm/pnpm/yarn/bun/tsc/vite/…): port unchanged.

**Runtime config:** `runtime.json` `inspect.enabled === false` or `scout.enabled === false` disables.

### 3. state.cjs → `.opencode/plugins/state.ts`

**Behavior split:**

| Claude branch | OpenCode equivalent | Decision |
|---|---|---|
| `SessionStart` → print prior context | `event` with `type === "session.created"` → `console.log(loadLatest(cwd))` | PORT |
| `PostToolUse(Task/TaskCreate/TaskUpdate/TodoWrite)` → write snapshot | `tool.execute.after` filtered by tool name | PORT (tool names: `todowrite` likely; verify in T3.1) |
| `SubagentStop` → append agent section | none | DROP (no subagent lifecycle in OpenCode) |
| `Stop` → archive snapshot | `event` with `type === "session.idle"` | PORT (semantic mismatch tolerated — idle ≈ stop) |

**Storage path:** `.opencode/session-state/latest.md` + `archive/` (mirror `.claude/session-state/` layout).

**Shared lib:** uses `lib/parser.cjs` (transcript parsing). OpenCode plugin context does NOT expose `transcript_path` directly; use OpenCode SDK `client.session.message.list(sessionID)` instead. This is a non-trivial swap — flag for T3.1.

**Dependency footnote:** transcript-based todo extraction may need to switch to the OpenCode message API. If too costly, drop todo tracking and keep only file-modified list (still useful).

### 4. docs-sync.cjs → `.opencode/plugins/docs-sync.ts`

**Behavior:** On session start, print docs-sync banner if `docs/` missing or `.sync_hash` stale vs current git hash.

**OpenCode mapping:**
- Hook: `event` with `type === "session.created"`
- Output channel: `console.log(...)` — appears in OpenCode server log; user-visible? **Risk:** Claude prints to stdout which surfaces in conversation context; OpenCode's `event` hook console.log goes to server logs, NOT to the assistant. To inject into the assistant, write a marker to a file the assistant reads, OR use `client.session.message.create(...)` to append a system note (verify API in T3.2).
- Shared lib: `lib/config.cjs` `loadConfig` — copy as-is.
- Git execSync: keep (works in Bun via `import { execSync } from "child_process"` or Bun shell `$`).

**Open question (T3.2 spike):** confirm whether OpenCode auto-replays last system event into next chat turn. If not, accept that banner appears in server log only and document the regression.

### 5. session.cjs → `.opencode/plugins/session.ts`

**Behavior:** Detect project type/PM/framework, write env vars to `CLAUDE_ENV_FILE`, print one-line session banner, print compact warning if `source === "compact"`.

**OpenCode mapping:**
- Hook: `event` discriminating on `session.created` and `session.compacted`.
- **DROP** all `CLAUDE_ENV_FILE` writes — OpenCode does not expose `CLAUDE_ENV_FILE`; statusline/env-injection is Claude-specific.
- Keep banner (`console.log(...)`) — same caveat as docs-sync re: visibility.
- Compact warning: trigger via `session.compacted` event branch.
- `source` field: OpenCode events do not carry source discriminator → all session.created becomes generic "Session started.".

### 6. spec-state.cjs → `.opencode/plugins/spec-state.ts` (**PORTED**)

**Rationale (2026-07 re-investigation):** OpenCode `@opencode-ai/plugin` `chat.message` fires **before** the model processes the user message. Mutating `output.parts` (push a text part) injects tollgate context into the turn — the OpenCode equivalent of Claude `UserPromptSubmit` stdout injection.

**OpenCode mapping:**
- Hook: `chat.message(input, output)` → push a **schema-complete** part onto `output.parts`: `{ id, sessionID: output.message.sessionID, messageID: output.message.id, type: "text", text, synthetic: true }`. A bare `{ type, text }` part fails OpenCode's durable-part schema and **crashes the entire user turn** ("invalid user part before save" — verified on 1.17.15).
- Scan `<project>/<runtime.paths.specs || "specs">/*/spec.json` for first `status === "in_progress"` (also accept legacy `"in-progress"`)
- State-change gate: fingerprint `phase|done/total` in `plugins/.logs/tollgate-last.txt`; unchanged → one-line reminder; changed → full URGENT block (Vietnamese text preserved) + refresh fingerprint
- Escape hatch: `.opencode/runtime.json` `{ "spec": { "tollgate": false } }` (default ON)
- Fail-open crash wrapper → `plugins/.logs/hook-log.jsonl`; never throw

### 6b. task-scaffold-guard.cjs → `.opencode/plugins/task-scaffold-guard.ts` (**PORTED**)

**OpenCode mapping:**
- Hook: `tool.execute.before`
- Gate tools: `write` (`output.args.filePath`), `apply_patch` (scan `output.args.patchText` for `*** Add File: <path>` lines — absent from the 1.17.15 default toolset, kept as a defensive branch), and `edit` on a **non-existent** task file — OpenCode's `edit` CAN create files (unlike Claude's Edit, which requires an existing file), verified on 1.17.15; edit on an existing stub stays allowed (legitimate stub filling). The existence check resolves the project-relative `specs/...` suffix against the plugin `directory` because tool paths may be sandbox-virtual (`/home/user/...`).
- Task-file regex: `/(^|\/)specs\/[^/]+\/tasks\/task-[^/]+\.md$/`
- Three safety valves preserved: runtime `spec.scaffold_guard === false` escape (fail-closed on missing runtime); fail-open if `.opencode/scripts/spec-scaffold.cjs` absent; actionable block message with exact scaffold command
- **Escape hatch is NOT advertised in the block message.** Smoke-tested: when the message included the `runtime.json` override line, the model wrote `{"spec":{"scaffold_guard":false}}` itself and disabled the guard (self-disarm). The hatch stays functional for humans and is documented here only. The Claude `.cjs` hook was hardened identically.
- Crash-wrapper fail-open: re-throw only intentional `TASK SCAFFOLD REQUIRED` errors

### 7. rules.cjs → **DROP**

**Reason:** Same UserPromptSubmit dependency historically. OpenCode users rely on `AGENTS.md` + `.opencode/rules/skill-workflow-routing.md` + `.opencode/rules/skill-domain-routing.md` — already installed. (Not re-ported; AGENTS fold-in remains sufficient.)

### 8. agent.cjs → **DROPPED** (explicit, low ROI)

**Reason:** OpenCode's subagent event surface (`session.created` + `parentID`) is unreliable for seeding subagent context. CafeKit orchestrator rule (`orchestrator.md`) already mandates self-contained subagent prompts including work-context paths. Porting would add fragile coupling for little gain.

### 9. usage.cjs → `.opencode/plugins/usage.ts` (partial)

**Behavior:** Increment a counter on user prompt + on every Edit/Write/MultiEdit.

**OpenCode mapping:**
- DROP prompt half (UserPromptSubmit unavailable).
- KEEP tool half via `tool.execute.after` filtered on `tool === "edit" || tool === "write"`.
- Counter storage: copy `lib/counter.cjs` verbatim. Path becomes `.opencode/.usage`.

**Decision:** since the prompt half drives most of the metric, this port has reduced value. Defer to a follow-up task; not in current scope of T3.x.

## Shared Lib Decision

Files to copy under `.opencode/plugins/lib/` (Bun CJS interop):

| File | Used by | Action |
|---|---|---|
| `color.cjs` | session.cjs (statusline-adjacent) | SKIP — not needed in plugin path |
| `config.cjs` | docs-sync, privacy, inspect | COPY |
| `context.cjs` | agent.cjs only | SKIP (agent dropped) |
| `counter.cjs` | usage.cjs only | SKIP (usage deferred) |
| `detect.cjs` | session.cjs project detection | COPY |
| `git.cjs` | session.cjs | COPY |
| `parser.cjs` | state.cjs (transcript todos) | DEFER — see state.cjs note |

Net libs to install: `config.cjs`, `detect.cjs`, `git.cjs`.

## Tool-Name Normalization Helper

Single source of truth for the plugin set:

```ts
// .opencode/plugins/lib/tool-names.ts
export const SENSITIVE_FILE_TOOLS = new Set(["read", "write", "edit", "bash", "glob", "grep"]);
export const SCOUT_TOOLS = new Set(["read", "write", "edit", "glob", "grep", "bash"]);
export const STATE_REFRESH_TOOLS = new Set(["todowrite"]); // verify in T3.1
export const EDIT_TOOLS = new Set(["edit", "write"]);
```

## Risk Register (refined)

| Risk | Severity | Mitigation |
|---|---|---|
| OpenCode tool arg schema differs from Claude (e.g., `filePath` vs `file_path`) | HIGH | T2.1 will validate by logging raw `output.args` for `read`/`edit`/`bash` once before writing the matchers |
| `console.log` in `event` hook not visible to assistant | MEDIUM | Fallback: write banner to `.opencode/session-banner.md` and have skill/AGENTS.md instruct agents to read it on start. Defer concrete fix to T3.2 |
| Transcript parsing (todos) absent in OpenCode plugin context | MEDIUM | T3.1: drop todo tracking; keep modifiedFiles only |
| Bun CJS interop edge cases | LOW | Per-file fallback to TS conversion |
| `session.idle` semantics ≠ Claude `Stop` (idle may fire while session paused) | LOW | Accept; archive triggers more often, harmless |

## Acceptance for T1

This audit is complete. Next: T2.1 (privacy-block POC) — smallest, highest-value, validates tool arg schema + throw-block UX.
