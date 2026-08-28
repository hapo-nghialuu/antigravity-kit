# Conditional Discovery with Explore Subagents

Use native Explore agents only after the `SKILL.md` Delegation Gate passes.
Focused discovery stays in the main agent even when Explore is available.

## Delegation Preconditions

All are required:

1. The user explicitly requested or permitted delegation or parallel agents.
2. The active runtime exposes an Explore/delegation capability.
3. The structure map identifies at least two distinct, non-overlapping scopes
   with useful independent work.

If any precondition fails, use scoped `rg`, file listing, and targeted reads in
the main agent. Do not request extra authority for an ordinary focused scout.

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

Split by logical dirs (`src/`, `lib/`, `tests/`, `config/`, `api/`, `types/`).
Spawn agents concurrently only when the runtime supports it; keep scopes
distinct and non-overlapping.

**Example** (auth): A1 `src/auth/, middleware/`; A2 `api/, routes/`; A3 `tests/`; A4 `lib/, utils/`; A5 `config/`; A6 `types/`.

## Task Registration (Optional)

| Agents | Create Tasks? |
|--------|--------------|
| ≤ 2    | No (overhead) |
| ≥ 3    | Yes |

Use the live task or plan surface when available. Record scope and ownership
before spawn, then completion or timeout after collection. Do not create task
state solely for one or two short probes.

## Timeout, Aggregation, Reading

- 3 min/agent; skip non-responders; do not restart; dedupe paths; note gaps in Unresolved Questions
- Stay under ~150K tokens; ~500 lines/chunk; max 3–5 small files or 1 large file chunked (`chunks = ceil(total_lines / 500)`); Read with offset/limit

## Scope Discipline

Start from concrete directories (not repo root); prefer scoped globs; skip `NO_SCAN_PATHS` / `NO_SCAN_CONTENT_HINTS` from SKILL.md; if still broad, narrow first.

## Output Contract

Return: file paths, brief description per file, notable relationships/patterns, unresolved questions.
