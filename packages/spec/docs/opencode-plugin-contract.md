# OpenCode Plugin Contract (CafeKit Reference)

Verified reference for porting CafeKit Claude hooks to OpenCode plugins. Sourced from `anomalyco/opencode@dev`: `packages/plugin/src/index.ts`, `packages/plugin/src/tool.ts`, `packages/sdk/js/src/gen/types.gen.ts`.

> Compatible with OpenCode where `Plugin` type matches the shape below. Re-verify if upstream major version changes.

## Discovery

Plugins are auto-loaded from:

- `.opencode/plugins/*.ts` (project-local, recommended for CafeKit installs — plural `plugins`)
- `~/.config/opencode/plugins/*.ts` (user global)
- npm packages declared in `opencode.json#plugin[]`

OpenCode runs `bun install` against `.opencode/package.json` at startup, so external npm deps (e.g. `@opencode-ai/plugin`) listed there resolve automatically.

Each file must `export` one or more named plugin factories. Filename is irrelevant — exports drive registration.

Runtime: Bun. TypeScript native, ESM default, CJS interop via `import x from './lib/foo.cjs'`. `import.meta` and top-level await supported.

## Signature

```ts
import type { Plugin } from "@opencode-ai/plugin";

export const Name: Plugin = async ({
  client,         // OpenCode SDK client (createOpencodeClient)
  project,        // { worktree: string, vcs?: "git" }
  directory,      // OpenCode runtime working directory
  worktree,       // git worktree path (if applicable)
  experimental_workspace, // { register(type, adapter) }
  serverUrl,      // URL of local OpenCode server
  $,              // Bun shell ($`echo hi`)
}, options) => ({
  // any subset of Hooks members
  "tool.execute.before": async (input, output) => { /* ... */ },
  event: async ({ event }) => { /* ... */ },
  dispose: async () => { /* cleanup */ },
});
```

`Plugin` is `(input: PluginInput, options?: PluginOptions) => Promise<Hooks>`. Multiple plugins can coexist; OpenCode merges their hook handlers.

## Hooks Interface (verbatim shape, paraphrased comments)

```ts
interface Hooks {
  dispose?: () => Promise<void>;

  // Generic event firehose — discriminate by event.type
  event?: (input: { event: Event }) => Promise<void>;

  // Config mutation just after load
  config?: (input: Config) => Promise<void>;

  // Register custom tools by name (input.tool[name] = tool(...))
  tool?: { [key: string]: ToolDefinition };

  // Tool lifecycle
  "tool.execute.before"?: (
    input: { tool: string; sessionID: string; callID: string },
    output: { args: any }, // mutate output.args to alter call; throw to block
  ) => Promise<void>;

  "tool.execute.after"?: (
    input: { tool: string; sessionID: string; callID: string; args: any },
    output: { title: string; output: string; metadata: any }, // mutable
  ) => Promise<void>;

  // Shell environment for $-style shell tools
  "shell.env"?: (
    input: { command: string },
    output: { env: Record<string, string> },
  ) => Promise<void>;

  // Permission gate (analogous to Claude PreToolUse approval prompt)
  "permission.ask"?: (
    input: PermissionInfo,
    output: { status: "ask" | "allow" | "deny" },
  ) => Promise<void>;

  // Chat lifecycle
  "chat.message"?: (input: {}, output: { message: UserMessage; parts: Part[] }) => Promise<void>;
  "chat.params"?: (
    input: { model: ModelInfo; provider: ProviderInfo; message: UserMessage },
    output: { temperature: number; topP: number; options: Record<string, any> },
  ) => Promise<void>;

  // Slash command execution
  "command.execute.before"?: (
    input: { command: string; sessionID: string },
    output: { args: string },
  ) => Promise<void>;

  // Experimental session compaction (context truncation)
  "experimental.session.compacting"?: (
    input: { sessionID: string },
    output: { messages: Message[] },
  ) => Promise<void>;
}
```

### Block vs Mutate

- **Block** a tool call: `throw new Error("reason")` inside `tool.execute.before` or `permission.ask`. The thrown message surfaces to the assistant; the tool call is aborted.
- **Mutate** call args: edit `output.args` in place inside `tool.execute.before` (e.g., normalize paths, inject env). Do NOT reassign `output = { ... }` — only mutate.
- **Mutate** tool result: edit `output.title`, `output.output`, `output.metadata` in `tool.execute.after`.
- **No-op**: `return` without throwing or mutating.

## Event Types (the `event` hook firehose)

Session, file, command, and TUI events all route through the single `event` hook. Discriminate on `event.type`:

```ts
event: async ({ event }) => {
  switch (event.type) {
    case "session.created":
      // event.properties.info: Session
      break;
    case "session.idle":
      // event.properties.sessionID: string
      break;
    case "session.compacted":
      // event.properties.sessionID: string
      break;
    case "file.edited":
      // event.properties.file: string
      break;
    case "command.executed":
      // event.properties.command: string
      break;
    case "tui.prompt.append":
      // event.properties.text: string
      break;
    // ... see types.gen.ts Event union for full list
  }
};
```

**Important:** There is no separate `"session.created"` hook key. Use the `event` hook for all session/file/command/TUI signals.

## Tool Authoring (custom tools)

```ts
import { tool } from "@opencode-ai/plugin";

const myTool = tool({
  description: "...",
  args: { /* JSON-schema-ish */ },
  async execute(args, ctx /* ToolContext */) {
    return {
      title: "...",
      metadata: {},
      output: "stringified result",
    };
  },
});

export const MyPlugin: Plugin = async () => ({
  tool: { my_tool: myTool },
});
```

`ToolContext` exposes `sessionID`, `messageID`, `abort: AbortSignal`. Return value matches `ToolResult { title; metadata; output }`.

## Claude Hook → OpenCode Plugin Mapping

| Claude event | OpenCode equivalent | Notes |
|---|---|---|
| `PreToolUse` | `tool.execute.before` (throw to block, mutate args) | Tool names differ — see normalization below |
| `PostToolUse` | `tool.execute.after` | Has full `args` + result |
| `UserPromptSubmit` | `chat.message` (mutate `output.parts`) | Fires before model processing (verified on 1.17.15); pushed parts MUST be schema-complete — `id`, `sessionID`, `messageID`, `type`, `text` — or the WHOLE turn fails with "invalid user part before save" (used by `spec-state.ts`) |
| `SessionStart` (startup/resume/clear) | `event` with `type === "session.created"` | No `source` discriminator; treat as single mode |
| `Stop` | `event` with `type === "session.idle"` | Fires on idle, not exactly Stop semantics |
| `SubagentStart` | **none** | No subagent lifecycle exposed |
| `SubagentStop` | **none** | Same |
| `SessionStart:compact` | `event` with `type === "session.compacted"` or `experimental.session.compacting` | Compacting hook is preempt-style |
| Statusline | **none** (Claude TUI-only) | Drop |

### Tool Name Normalization

OpenCode tool names are lowercase: `read`, `write`, `edit`, `bash`, `glob`, `grep`. Claude uses PascalCase: `Read`, `Write`, `Edit`, `MultiEdit`, `Bash`, `Glob`, `Grep`.

When porting matchers from Claude hooks, normalize via a single helper, e.g.:

```ts
const CLAUDE_TO_OPENCODE_TOOL: Record<string, string> = {
  Read: "read", Write: "write", Edit: "edit", MultiEdit: "edit",
  Bash: "bash", Glob: "glob", Grep: "grep",
};
```

`MultiEdit` collapses into `edit` (OpenCode batches edits inside the single `edit` tool).

## Shared Lib Interop

CafeKit Claude hooks share `~2.5K LOC` of CJS helpers under `src/claude/hooks/lib/` (`color`, `config`, `context`, `counter`, `detect`, `git`, `parser`). Strategy for OpenCode:

1. Copy `lib/*.cjs` verbatim into `.opencode/plugin/lib/` during install.
2. Import via Bun CJS interop: `import config from "./lib/config.cjs"`.
3. If Bun chokes on a specific file, convert that file alone to TS — do not migrate the whole set proactively.

## Error & Block Output

Claude hooks emit privacy/inspect block messages via stdout with `@@PRIVACY_PROMPT_START@@`/`END` markers. OpenCode equivalents:

- For blocking: `throw new Error(<full marker payload>)`. The assistant sees the message verbatim.
- For passive log/banner: write to stderr inside the handler (Bun forwards) — does not abort.

## Install Layout for CafeKit

```
.opencode/
├── package.json           # { dependencies: { "@opencode-ai/plugin": "^1.15.11" } }
├── plugins/               # *.ts files auto-loaded (plural!)
│   ├── privacy-block.ts
│   ├── inspect-block.ts
│   ├── state.ts
│   ├── docs-sync.ts
│   ├── session.ts
│   └── lib/
│       ├── config.cjs
│       ├── context.cjs
│       ├── detect.cjs
│       ├── git.cjs
│       └── parser.cjs
├── runtime.json
├── skills/ rules/ scripts/ ...
```

`opencode.json` does not need `plugin[]` entries — directory-scan picks them up.

## Verification Checklist for Each Port

1. File exists at `.opencode/plugin/<name>.ts`.
2. `bun build --no-emit .opencode/plugin/<name>.ts` (or `tsc --noEmit`) passes.
3. Smoke test: install into `/tmp/cafekit-opencode-test/`, launch `opencode`, perform an action that should trigger the hook, confirm behavior:
   - Block hooks: assistant sees the thrown error and stops the tool call.
   - Banner hooks: stderr log appears in opencode server log.
   - State hooks: target state files (e.g., `.opencode/runtime/state/*.json`) are written.
4. Negative: an unrelated tool call is NOT blocked or mutated.

## Open Gaps (intentionally unported)

- `rules.cjs` (UserPromptSubmit routing) → workaround: keep routing in `AGENTS.md` + skill-routing rules.
- `agent.cjs` (SubagentStart context injection) → workaround: callers must include context in subagent prompt (CafeKit orchestrator rule already enforces this).
- `spec-state.cjs` (UserPromptSubmit drift warning) → workaround: bake reminder into `AGENTS.md` and the spec workflow skill.
- `usage.cjs` prompt-side counter → workaround: rely on PostToolUse half only via `tool.execute.after`.

Document these gaps in CHANGELOG and the install README when shipping.
