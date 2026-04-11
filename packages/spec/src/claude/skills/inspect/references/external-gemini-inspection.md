# External Discovery with Gemini

Use external Gemini CLI for faster searches with large context windows (1M+ tokens) when SCALE ≤ 5.

## Tool Selection

```
SCALE ≤ 5   → gemini CLI
SCALE ≥ 6   → Use internal discovery instead
```

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

## When External Mode is Allowed

External Gemini inspection requires:

**Gemini-Specific Requirements:**
1. The prompt explicitly includes `ext` argument
2. SCALE ≤ 5 (calculated from estimated file count)

**General Preflight Gate (applies to all modes):**
3. At least one concrete directory scope is present
4. The request is not a repo-root or root-wide scan
5. The built-in no-scan guidance has been applied

If any condition fails, use internal discovery instead.

## Gemini CLI

### Command
```bash
gemini -y -m <model> "[prompt]"
```

### Example
```bash
gemini -y -m gemini-3-flash-preview "Search src/ for authentication files. List paths with brief descriptions."
```

## Installation Check

Before using, verify Gemini CLI is installed:
```bash
which gemini
```

If not installed, ask user:
1. **Yes** - Provide installation instructions (may need manual auth steps)
2. **No** - Fall back to internal discovery (`internal-inspection.md`)

## Spawning Parallel Bash Agents

Use `Agent` tool with `subagent_type: "Bash"` to spawn parallel agents:

```
Agent 1: subagent_type="Bash", prompt="Run: gemini -y -m gemini-3-flash-preview '[prompt1]'"
Agent 2: subagent_type="Bash", prompt="Run: gemini -y -m gemini-3-flash-preview '[prompt2]'"
Agent 3: subagent_type="Bash", prompt="Run: gemini -y -m gemini-3-flash-preview '[prompt3]'"
```

Spawn all in single message for parallel execution.

## Prompt Guidelines

- Be specific about directories to search
- Request file paths with descriptions
- Set clear scope boundaries
- Ask for patterns/relationships if relevant
- Do not include no-scan paths
- Do not request secret material or generated bundles

## Prompt Template

```text
Inspect these scoped directories only:
- {dir-1}
- {dir-2}

Goal:
- {what to find}

Return:
1. relevant file paths
2. one-line description per file
3. notable patterns or relationships
4. unresolved questions

Do not inspect repo root, generated directories, or sensitive content.
Do not expand beyond the provided scope.
```

## Example Workflow

User: "Find database migration files" with `ext`

Spawn 3 parallel Bash agents via Agent tool:
```
Agent 1 (Bash): "Run: gemini -y -m gemini-3-flash-preview 'Search db/, migrations/ for migration files'"
Agent 2 (Bash): "Run: gemini -y -m gemini-3-flash-preview 'Search lib/, src/ for database schema files'"
Agent 3 (Bash): "Run: gemini -y -m gemini-3-flash-preview 'Search config/ for database configuration'"
```

## Reading File Content

When needing to read file content, use chunking to stay within context limits (<150K tokens safe zone).

### Step 1: Get Line Counts
Use Read tool to check file size before reading.

### Step 2: Calculate Chunks
- **Target:** ~500 lines per chunk (safe for most files)
- **Max files per agent:** 3-5 small files OR 1 large file chunked

**Chunking formula:**
```
chunks = ceil(total_lines / 500)
lines_per_chunk = ceil(total_lines / chunks)
```

### Step 3: Read Strategy

**Small files (<500 lines each):**
- Read entire file with Read tool

**Large file (>500 lines):**
- Use Read tool with offset/limit parameters
- Read in 500-line chunks

### Chunking Decision Tree
```
File < 500 lines     → Read entire file
File 500-1500 lines  → Split into 2-3 chunks
File > 1500 lines    → Split into ceil(lines/500) chunks
```

## Timeout and Error Handling

- Set 3-minute timeout per bash call
- Skip timed-out agents
- Don't restart failed agents
- On persistent failures, fall back to internal discovery

## Fallback Behavior

If Gemini is unavailable, misconfigured, or errors out:
1. Stop external mode
2. Continue with internal discovery
3. Note the fallback in the final report

## Expected Outcome

- Scoped Gemini discovery
- Concise file list with descriptions
- Patterns and relationships
- Fallback to internal mode if Gemini cannot run
