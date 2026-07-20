# Internal Discovery with Explore Subagents

Dispatch native Explore agents with breadth medium/very-thorough + the Scope Gate in `SKILL.md`. Use when SCALE ≥ 6 or external tools are unavailable.

## Agent Tool Configuration

```
subagent_type: "Explore"
```

## Prompt Template

```
Quickly search {DIRECTORY} for files related to: {USER_PROMPT}

Instructions:
- Search for relevant files matching the task (Glob/Grep)
- List files with brief descriptions; timeout 3 minutes; skip if timed out

Report format:
## Found Files
- `path/file.ext` - description
## Patterns
- Key patterns observed
```

## Spawning Strategy

Split by logical dirs (`src/`, `lib/`, `tests/`, `config/`, `api/`, `types/`). Spawn all in one call; distinct scopes; no overlap.

**Example** (auth): A1 `src/auth/, middleware/`; A2 `api/, routes/`; A3 `tests/`; A4 `lib/, utils/`; A5 `config/`; A6 `types/`.

## Task Registration (Optional)

| Agents | Create Tasks? |
|--------|--------------|
| ≤ 2    | No (overhead) |
| ≥ 3    | Yes |

`TaskList` → reuse or `TaskCreate` per agent (`agentType: Explore`, scope, scale, agentIndex, totalAgents, toolMode: internal). Lifecycle: pending → in_progress before spawn → completed on return (timeout: keep in_progress + error metadata).

## Timeout, Aggregation, Reading

- 3 min/agent; skip non-responders; do not restart; dedupe paths; note gaps in Unresolved Questions
- Stay under ~150K tokens; ~500 lines/chunk; max 3–5 small files or 1 large file chunked (`chunks = ceil(total_lines / 500)`); Read with offset/limit

## Scope Discipline

Start from concrete directories (not repo root); prefer scoped globs; skip `NO_SCAN_PATHS` / `NO_SCAN_CONTENT_HINTS` from SKILL.md; if still broad, narrow first.

## Output Contract

Return: file paths, brief description per file, notable relationships/patterns, unresolved questions.

