---
name: hapo:inspect
description: "Fast codebase discovery using parallel agents. Use for file discovery, task context gathering, quick searches across directories. Supports internal (Explore) and external (Gemini) agents."
user-invocable: true
when_to_use: "Invoke for fast parallel codebase discovery and file location."
category: discovery
keywords: [discovery, search, explore, context]
argument-hint: "[search-target] [ext]"
metadata:
  author: haposoft
  version: "2.0.0"
---
# Inspect

Fast, token-efficient codebase discovery using parallel agents to find files needed for tasks.

## Arguments
- Default: Inspect using built-in Explore subagents in parallel (`./references/internal-inspection.md`)
- `ext`: Inspect using external Gemini CLI tool in parallel (`./references/external-gemini-inspection.md`)

## When to Use

- Feature spanning multiple directories; user wants to find/locate/search files
- Debugging that needs file relationships; project structure questions
- Before multi-area changes, review, debug, or impact analysis

## Preflight Scope Gate (MANDATORY - All Modes)

Before scanning with ANY mode (internal or external):
1. Detect repo-root or root-wide scans such as `.`, `/`, `./`, `**/*`, `**/*.ts`, or similar broad patterns without a scoped directory.
2. Apply the built-in no-scan lists below.
3. Prefer file-type or glob hints whenever possible.

**When scope is too broad:** use a **2-phase approach** — lightweight Structure Scout first, then parallel agents on real sub-scopes.

### Phase 1 — Structure Scout (Single Agent, Run First)

Spawn **one scout** to map top-level layout before dividing work:
1. List immediate children of the scope root (dirs + key config; monorepo markers)
2. Rough file count per discovered directory
3. Return a division plan of 1–6 logical sub-scopes (path/glob, est. files, focus)

Wait for Scout before Phase 2.

### Phase 2 — Parallel Explore Agents (Based on Scout Results)

1. Follow Scout's plan; merge scopes < 10 files; split scopes > 100 files
2. Spawn parallel Explore agents (SCALE 3–6 recommended), one per sub-scope
3. Aggregate into the Inspect Report; offer deeper follow-up on specific areas

**Fallback to AskUserQuestion:** if Scout is ambiguous (flat layout, < 3 areas), offer 2–4 concrete scopes from findings, then re-invoke with the chosen scope.

## Built-in No-Scan Guidance

### `NO_SCAN_PATHS`
- `.git/`, `node_modules/`, `dist/`, `build/`, `.next/`, `coverage/`
- `tmp/`, `temp/`, `vendor/`, `artifacts/`, `secrets/`, `private/`

### `NO_SCAN_CONTENT_HINTS`
- private keys, token dumps, credential exports, `.env` secrets
- generated bundles, binary blobs

## Configuration

Read from `.claude/runtime.json`:
```json
{
  "gemini": {
    "model": "gemma-4-31b-it"
  }
}
```

Default model: `gemma-4-31b-it` (installed with `npx @haposoft/cafekit`).

## Workflow

### 1. Analyze Task
- Parse search targets; identify directories, patterns, file types
- Determine SCALE of subagents

**SCALE Calculation:**
```
SCALE = ceil(estimated_files_to_scan / 50)
```

- Min SCALE = 1; Max SCALE = 10
- SCALE 1-2: focused (< 100 files)
- SCALE 3-5: medium (suitable for external Gemini CLI)
- SCALE 6-10: large (internal Explore agents)

### 2. Divide and Conquer
- Split into logical segments; assign distinct directories/patterns; no overlap

### 3. Register Inspect Tasks
- **Skip if:** Agent count ≤ 2
- `TaskList` first; if none, `TaskCreate` per agent with scope metadata
- See `./references/internal-inspection.md` for patterns

### 4. Choose Mode

| Condition | Mode |
|---|---|
| No `ext` argument | Internal Explore agents |
| `ext` + SCALE ≤ 5 | Gemini CLI (if available + scope gate passed) |
| `ext` + SCALE ≥ 6 | Internal Explore agents |
| Gemini unavailable/fails | Fallback to internal Explore |

Load: **Internal** `./references/internal-inspection.md` or **External** `./references/external-gemini-inspection.md`.

### 5. Spawn Parallel Agents

**Internal mode:** dispatch native Explore agents with breadth medium/very-thorough + the Scope Gate above. Details: `./references/internal-inspection.md`.

- `TaskUpdate` each task to `in_progress` before spawn
- Prompt each subagent with exact directories/files; each has < 200K context
- Agent count follows resources + file volume; each returns a summary to the main agent

### 6. Collect Results
- Timeout: 3 minutes per agent (skip non-responders; log in report)
- `TaskUpdate` completed tasks; aggregate; list unresolved questions at end

## Report Format

```markdown
# Inspect Report

## Relevant Files
- `path/to/file.ts` - Brief description
- ...

## Patterns
- Key patterns observed

## Unresolved Questions
- Any gaps in findings
```

## Rules

- Keep scope narrow. Do not use `hapo:inspect` as a runtime policy engine.
- Prefer listing files first, then reading only the shortlisted files.
- Never encourage scanning ignored/generated/sensitive areas from the no-scan list.
- Keep reports concise and actionable.
- Ensure no overlap between agent scopes.
- Skip non-responding agents, do not retry.

## References

- `./references/internal-inspection.md` - Using Explore subagents
- `./references/external-gemini-inspection.md` - Using Gemini CLI
