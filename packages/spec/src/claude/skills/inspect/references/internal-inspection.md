# Internal Discovery with Explore Subagents

Use Explore subagents when SCALE >= 6 or external tools unavailable.

## How It Works

Spawn multiple `Explore` subagents via `Agent` tool to search codebase in parallel.

## Agent Tool Configuration

```
subagent_type: "Explore"
```

## Prompt Template

```
Quickly search {DIRECTORY} for files related to: {USER_PROMPT}

Instructions:
- Search for relevant files matching the task
- Use Glob/Grep for file discovery
- List files with brief descriptions
- Timeout: 3 minutes max
- Skip if timeout reached

Report format:
## Found Files
- `path/file.ext` - description

## Patterns
- Key patterns observed
```

## Spawning Strategy

### Directory Division
Split codebase logically:
- `src/` - Source code
- `lib/` - Libraries
- `tests/` - Test files
- `config/` - Configuration
- `api/` - API routes
- `types/` - Type definitions

### Parallel Execution
- Spawn all agents in single `Agent` tool call
- Each agent gets distinct directory scope
- No overlap between agents

## Example

User prompt: "Find authentication-related files"

```
Agent 1: Inspect src/auth/, src/middleware/ for auth files
Agent 2: Inspect src/api/, src/routes/ for auth endpoints
Agent 3: Inspect tests/ for auth tests
Agent 4: Inspect lib/, utils/ for auth utilities
Agent 5: Inspect config/ for auth configuration
Agent 6: Inspect types/, interfaces/ for auth types
```

## Task Registration (Optional)

### When to Register Tasks

| Agents | Create Tasks? | Rationale |
|--------|--------------|-----------|
| ≤ 2    | No           | Overhead exceeds benefit, finishes quickly |
| ≥ 3    | Yes          | Meaningful coordination, progress monitoring |

### Task Registration Flow

```
TaskList()                          // Check for existing inspect tasks
  → Found tasks?  → Skip creation, reuse existing
  → Empty?        → TaskCreate per agent
```

### Task Metadata Pattern

```
TaskCreate(
  subject: "Inspect {directory} for {target}",
  activeForm: "Searching {directory}",
  description: "Search {directories} for {patterns}",
  metadata: {
    agentType: "Explore",
    scope: "src/auth/,src/middleware/",
    scale: 6,
    agentIndex: 1,
    totalAgents: 6,
    toolMode: "internal",
    priority: "P2",
    effort: "3m"
  }
)
```

### Task Lifecycle

```
Step 3: TaskCreate per agent     → status: pending
Step 4: Before spawning agent    → TaskUpdate → status: in_progress
Step 5: Agent returns report     → TaskUpdate → status: completed
Step 5: Agent times out (3m)     → Keep in_progress, add error metadata
```

## Timeout Handling

- Set 3-minute timeout per agent
- Skip non-responding agents
- Don't restart timed-out agents
- Aggregate available results
- Log timeouts in final report's "Unresolved Questions" section

## Reading File Content

When needing to read file content, use chunking to stay within context limits (<150K tokens safe zone).

### Step 1: Get Line Counts
Use Read tool with limit/offset or check file size before reading.

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

## Result Aggregation

Combine results from all agents:
1. Deduplicate file paths
2. Merge descriptions
3. Note any gaps/timeouts
4. List unresolved questions

## Scope Discipline

- Start from concrete directories, not repo root
- Prefer scope like `packages/spec/src/claude/skills/**/*.md` over `**/*.md`
- Skip `NO_SCAN_PATHS` from SKILL.md
- Avoid content matching `NO_SCAN_CONTENT_HINTS`
- If request still broad, stop and narrow before continuing

## Output Contract

Return:
- file paths
- brief description per file
- notable relationships or repeated patterns
- unresolved questions
