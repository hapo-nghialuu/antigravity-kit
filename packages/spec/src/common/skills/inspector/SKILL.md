---
name: hapo:inspector
description: "Fast codebase discovery using parallel agents. Use for file discovery, task context gathering, quick searches across directories. Supports internal (Explore) and external (Gemini) agents."
version: 2.0.0
argument-hint: "[search-target] [ext]"
---

# Inspector

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

Instead of rejecting, **auto-divide** the scope into logical sub-scopes and spawn parallel Explore agents:

1. **Analyze project structure** - Use `Glob` to discover top-level directories (src/, apps/, backend/, frontend/, packages/, etc.)
2. **Auto-divide into sub-scopes** - Create 3-6 logical divisions based on:
   - Top-level directories (src/, apps/, backend/)
   - Key files (README.md, package.json, tsconfig.json)
   - Monorepo structure (packages/*, apps/*)
3. **Spawn parallel Explore agents** - One agent per sub-scope (SCALE 3-6 recommended)
4. **Aggregate findings** - Collect results from all agents into unified report
5. **Suggest next steps** - Based on findings, ask if user wants deeper investigation of specific areas

**Example auto-division:**
```
User: "scan entire ~/Desktop/project project"

Auto-divide into:
- Agent 1: ~/Desktop/project/README.md + package.json (overview)
- Agent 2: ~/Desktop/project/src/ (main source)
- Agent 3: ~/Desktop/project/apps/* (applications)
- Agent 4: ~/Desktop/project/backend/ (backend services)
- Agent 5: ~/Desktop/project/frontend/ (frontend code)

Result: "This is a monorepo with 3 apps, NestJS backend, React frontend..."
Follow-up: "Want to investigate deeper? Choose: backend API | frontend components | specific app"
```

**Fallback to AskUserQuestion:**
- If auto-division is unclear (flat structure, no obvious divisions)
- Use `AskUserQuestion` with 2-4 concrete scope suggestions
- After user selects, re-invoke inspector with chosen scope

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

Read from `.claude/runtime.json`:
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
- `TaskList` first — check for existing inspector tasks in session
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
# Inspector Report

## Relevant Files
- `path/to/file.ts` - Brief description
- ...

## Patterns
- Key patterns observed

## Unresolved Questions
- Any gaps in findings
```

## Rules

- Keep scope narrow. Do not use `hapo:inspector` as a runtime policy engine.
- Prefer listing files first, then reading only the shortlisted files.
- Never encourage scanning ignored/generated/sensitive areas from the no-scan list.
- Keep reports concise and actionable.
- Ensure no overlap between agent scopes.
- Skip non-responding agents, do not retry.

## References

- `./references/internal-inspection.md` - Using Explore subagents
- `./references/external-gemini-inspection.md` - Using Gemini CLI
