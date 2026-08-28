---
name: hapo:scout
description: "Fast scoped codebase discovery using local search first and user-permitted Explore delegation only for broad independent scopes. Use for file discovery, task context, entrypoints, call paths, and blast radius."
user-invocable: true
when_to_use: "Invoke for fast scoped codebase discovery and file location."
category: discovery
keywords: [scout, inspect, discovery, search, context]
argument-hint: "[search-target]"
metadata:
  author: haposoft
  version: "2.1.0"
---
# Scout

Fast, token-efficient codebase discovery that uses focused local search by default
and delegates only when parallel scouting has a concrete benefit.

## Arguments
- Default: Scout the named target with local `rg` and targeted reads. For a
  genuinely broad scope, use the conditional delegation route in
  `./references/internal-inspection.md`.

## When to Use

- Feature spanning multiple directories; user wants to find/locate/search files
- Debugging that needs file relationships; project structure questions
- Before multi-area changes, review, debug, or impact analysis

## Preflight Scope Gate (MANDATORY)

Before scanning:
1. Detect repo-root or root-wide scans such as `.`, `/`, `./`, `**/*`, `**/*.ts`, or similar broad patterns without a scoped directory.
2. Apply the built-in no-scan lists below.
3. Prefer file-type or glob hints whenever possible.

**When scope is too broad:** use a **2-phase approach** — lightweight structure
mapping first, then parallel agents only when the Delegation Gate is open.

### Phase 1 — Structure Map

Map the top-level layout in the main agent. A single Explore agent may do this
only when the Delegation Gate below is already open:
1. List immediate children of the scope root (dirs + key config; monorepo markers)
2. Rough file count per discovered directory
3. Return a division plan of 1–10 logical sub-scopes (path/glob, est. files, focus)

Complete the structure map before Phase 2.

### Phase 2 — Conditional Parallel Explore

1. Follow the structure map; merge scopes < 10 files; split scopes > 100 files
2. If the Delegation Gate is open, spawn Explore agents on distinct sub-scopes;
   otherwise scout the sub-scopes sequentially in the main agent
3. Aggregate into the Scout Report; offer deeper follow-up on specific areas

**Fallback to AskUserQuestion:** if the structure map still leaves multiple
plausible targets and the choice would materially change the scan, offer 2–4
concrete scopes from findings, then continue with the selected scope.

## Built-in No-Scan Guidance

### `NO_SCAN_PATHS`
- `.git/`, `node_modules/`, `dist/`, `build/`, `.next/`, `coverage/`
- `tmp/`, `temp/`, `vendor/`, `artifacts/`, `secrets/`, `private/`

### `NO_SCAN_CONTENT_HINTS`
- private keys, token dumps, credential exports, `.env` secrets
- generated bundles, binary blobs

## Workflow

### 1. Analyze Task
- Parse search targets; identify directories, patterns, file types
- Estimate scan size and whether the work divides into independent scopes

### 2. Choose The Smallest Route

| Condition | Route |
|---|---|
| Named files/directories or focused scope (about 50 files or fewer) | Main-agent `rg` plus targeted reads; do not delegate |
| Medium scope that still fits one coherent search | Main-agent scouting; narrow before considering delegation |
| Broad scope with two or more independent areas | Structure map, then evaluate the Delegation Gate |

Do not use the file estimate alone to justify agents. A focused 100-file search
may still be cheaper locally; a smaller cross-system search may justify two
independent scopes.

### 3. Delegation Gate

Delegate only when all are true:

- The user explicitly requested or permitted subagents, delegation, or parallel work.
- The active runtime exposes an Explore/delegation capability.
- At least two non-overlapping scopes have useful independent work.

If any condition is false, continue in the main agent with scoped `rg`, file
listing, and targeted reads. Do not ask for delegation merely to complete an
ordinary focused scout.

### 4. Divide And Scout

For local scouting, search the shortlisted scopes sequentially and stop when the
question is answered. For delegated scouting, load
`./references/internal-inspection.md`, split by logical boundaries, and ensure
no overlap.

- Skip task registration for two or fewer agents.
- For three or more agents, use the live task/plan surface when available.
- Prompt each agent with exact directories/files and a read-only boundary.

### 5. Collect Results
- Timeout: 3 minutes per agent (skip non-responders; log in report)
- Update live task/plan state when one was used; aggregate; list unresolved questions at end

## Report Format

```markdown
# Scout Report

## Relevant Files
- `path/to/file.ts` - Brief description
- ...

## Patterns
- Key patterns observed

## Unresolved Questions
- Any gaps in findings
```

## Rules

- Keep scope narrow. Do not use `hapo:scout` as a runtime policy engine.
- Prefer listing files first, then reading only the shortlisted files.
- Never encourage scanning ignored/generated/sensitive areas from the no-scan list.
- Keep reports concise and actionable.
- Ensure no overlap between agent scopes.
- Skip non-responding agents, do not retry.

## References

- `./references/internal-inspection.md` - Conditional Explore delegation
