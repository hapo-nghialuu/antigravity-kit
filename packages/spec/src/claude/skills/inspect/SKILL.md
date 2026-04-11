---
name: hapo:inspect
description: "Fast codebase discovery using parallel agents. Use for file discovery, task context gathering, quick searches across directories. Supports internal (Explore) and external (Gemini) agents."
version: 2.0.0
argument-hint: "[search-target] [ext]"
---

# Inspect

Fast, token-efficient codebase discovery using parallel agents to find files needed for tasks.

## Arguments
- Default: Inspect using built-in Explore subagents in parallel (`./references/internal-inspection.md`)
- `ext`: Inspect using external Gemini CLI tool in parallel (`./references/external-gemini-inspection.md`)

## When to Use

- Beginning work on feature spanning multiple directories
- User mentions needing to "find", "locate", or "search for" files
- Starting debugging session requiring file relationships understanding
- User asks about project structure or where functionality lives
- Before changes that might affect multiple codebase parts
- Before review/debug/impact-analysis when affected files are unclear

## Preflight Scope Gate (MANDATORY - All Modes)

Before scanning with ANY mode (internal or external):
1. Detect repo-root or root-wide scans such as `.`, `/`, `./`, `**/*`, `**/*.ts`, or similar broad patterns without a scoped directory.
2. Apply the built-in no-scan lists below.
3. Prefer file-type or glob hints whenever possible.

**When scope is too broad:**

Instead of rejecting, use a **2-phase approach**: first run a lightweight Structure Scout to understand the real layout, then divide work among parallel agents based on actual findings.

### Phase 1 — Structure Scout (Single Agent, Run First)

Spawn **one dedicated scout agent** to map the top-level structure before any work is divided:

1. **Discover top-level layout** - Use `Glob` / `LS` to list immediate children of the scope root:
   - Top-level directories (src/, apps/, backend/, frontend/, packages/, etc.)
   - Key config files (README.md, package.json, tsconfig.json, pyproject.toml, go.mod, etc.)
   - Monorepo markers (packages/*, apps/*, lerna.json, pnpm-workspace.yaml, turbo.json)
2. **Estimate sub-scope sizes** - For each discovered directory, do a rough file count (no deep read needed)
3. **Return a division plan** - Scout outputs a structured list of logical sub-scopes (1-6), each with:
   - Path or glob pattern
   - Estimated file count
   - Suggested focus area description

> Wait for Scout to complete before proceeding to Phase 2.

### Phase 2 — Parallel Explore Agents (Based on Scout Results)

Use the Scout's division plan to spawn parallel agents — one per sub-scope:

1. **Auto-divide into sub-scopes** - Follow Scout's plan, adjusted for:
   - Merging sub-scopes that are too small (< 10 files)
   - Splitting sub-scopes that are too large (> 100 files)
2. **Spawn parallel Explore agents** - One agent per sub-scope (SCALE 3-6 recommended)
3. **Aggregate findings** - Collect results from all agents into unified report
4. **Suggest next steps** - Based on findings, ask if user wants deeper investigation of specific areas

**Example flow:**
```
User: "scan entire ~/Desktop/project"

Phase 1 — Scout discovers:
  - README.md, package.json, turbo.json  → monorepo root
  - packages/  → 3 sub-packages (~40 files each)
  - apps/web/  → React frontend (~120 files)
  - apps/api/  → NestJS backend (~80 files)

Scout outputs division plan:
  - Scope A: root config files (README.md, package.json, turbo.json)
  - Scope B: packages/* (shared libs)
  - Scope C: apps/web/ (frontend)
  - Scope D: apps/api/ (backend)

Phase 2 — 4 agents run in parallel on Scope A–D

Result: "This is a monorepo with 2 apps, NestJS backend, React frontend, 3 shared packages..."
Follow-up: "Want to investigate deeper? Choose: backend API | frontend components | shared packages"
```

**Fallback to AskUserQuestion:**
- If Scout result is ambiguous (flat structure, no obvious divisions, < 3 distinguishable areas)
- Use `AskUserQuestion` with 2-4 concrete scope suggestions derived from Scout findings
- After user selects, re-invoke inspect with chosen scope

## Built-in No-Scan Guidance

### `NO_SCAN_PATHS`
- `.git/`
- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `coverage/`
- `tmp/`
- `temp/`
- `vendor/`
- `artifacts/`
- `secrets/`
- `private/`

### `NO_SCAN_CONTENT_HINTS`
- private keys
- token dumps
- credential exports
- `.env` secrets
- generated bundles
- binary blobs

## Configuration

Read from `packages/spec/src/claude/runtime.json`:
```json
{
  "gemini": {
    "model": "gemini-3-flash-preview"
  }
}
```

Default model: `gemini-3-flash-preview`

**Note:** This file is automatically installed when you run `npx @haposoft/cafekit`.

## Workflow

### 1. Analyze Task
- Parse user prompt for search targets
- Identify key directories, patterns, file types, lines of code
- Determine optimal SCALE value of subagents to spawn

**SCALE Calculation:**
```
SCALE = ceil(estimated_files_to_scan / 50)
```

Where:
- `estimated_files_to_scan` = rough count of files matching scope
- Minimum SCALE = 1 (single agent)
- Maximum SCALE = 10 (practical limit for coordination overhead)

**SCALE Thresholds:**
- SCALE 1-2: Simple, focused searches (< 100 files)
- SCALE 3-5: Medium scope, suitable for external Gemini CLI
- SCALE 6-10: Large scope, requires internal Explore agents

### 2. Divide and Conquer
- Split codebase into logical segments per agent
- Assign each agent specific directories or patterns
- Ensure no overlap, maximize coverage

### 3. Register Inspect Tasks
- **Skip if:** Agent count ≤ 2 (overhead exceeds benefit)
- `TaskList` first — check for existing inspect tasks in session
- If not found, `TaskCreate` per agent with scope metadata
- See `./references/internal-inspection.md` for patterns and examples

### 4. Choose Mode

Decision table:
- **No `ext` argument** → Use internal Explore agents
- **`ext` argument + SCALE ≤ 5** → Use Gemini CLI (if scope gate passed and Gemini available)
- **`ext` argument + SCALE ≥ 6** → Use internal Explore agents (external not suitable for large scale)
- **Gemini unavailable or fails** → Fallback to internal Explore agents

Load appropriate reference:
- **Internal (Default):** `./references/internal-inspection.md` (Explore subagents)
- **External:** `./references/external-gemini-inspection.md` (Gemini CLI)

### 5. Spawn Parallel Agents

**Notes:**
- `TaskUpdate` each task to `in_progress` before spawning its agent
- Prompt detailed instructions for each subagent with exact directories or files it should read
- Remember that each subagent has less than 200K tokens of context window
- Amount of subagents to-be-spawned depends on the current system resources available and amount of files to be scanned
- Each subagent must return a detailed summary report to a main agent

### 6. Collect Results
- Timeout: 3 minutes per agent (skip non-responders)
- `TaskUpdate` completed tasks; log timed-out agents in report
- Aggregate findings into single report
- List unresolved questions at end

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
