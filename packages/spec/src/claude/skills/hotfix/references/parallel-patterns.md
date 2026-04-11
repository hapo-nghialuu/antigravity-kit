# Parallel Patterns & Task Coordination

How to effectively leverage multiple subagents and native Task tools during fix workflows.

## When to Go Parallel

| Situation | Strategy | Agent Type |
|-----------|----------|------------|
| Searching for root cause across 3+ directories | Parallel scout | `Explore` × 2-3 |
| Testing 2-3 diagnostic hypotheses simultaneously | Parallel hypothesis test | `Explore` × 2-3 |
| Verifying fix (typecheck + lint + build + test) | Parallel verification | `Bash` × 3-4 |
| Fixing 2+ independent bugs in one session | Parallel issue trees | `god-developer` × N |
| Deep workflow: scout + diagnose + research together | Parallel investigation | Mixed |

## Pattern A: Parallel Scouting

When you need to understand multiple areas of the codebase before diagnosing:

```
// Spawn in a SINGLE message — agents run concurrently
Task("Explore", "Scan src/auth/ for token validation logic and recent changes")
Task("Explore", "Scan src/middleware/ for request interceptors that touch headers")
Task("Explore", "Find all test files matching *auth*.test.* and check coverage")
```

Wait for all agents to return. Merge their findings into a unified context map before proceeding to diagnosis.

## Pattern B: Parallel Hypothesis Verification

After forming 2-3 hypotheses in Step 2 (Diagnose), test them concurrently:

```
Task("Explore", "Verify hypothesis: cache returns stale data — check TTL config in src/cache/")
Task("Explore", "Verify hypothesis: race condition in login flow — trace async calls in src/auth/login.ts")
Task("Explore", "Verify hypothesis: env var missing in production — check .env.example vs deployed config")
```

Each agent returns CONFIRMED, REFUTED, or INCONCLUSIVE with evidence.

## Pattern C: Parallel Verification

After implementing a fix, validate from every angle simultaneously:

```
Task("Bash", "npx tsc --noEmit")           // Typecheck
Task("Bash", "npx eslint src/ --quiet")     // Lint
Task("Bash", "npm run build")               // Build
Task("Bash", "npm test -- --bail")           // Tests
```

All four must pass. If any fails, investigate that specific failure before re-attempting.

## Pattern D: Task-Coordinated Issue Trees

For 2+ independent bugs, create separate dependency chains per issue:

```
// Issue A — payment processing error
A1 = TaskCreate(subject="[Payment] Scout affected handlers")
A2 = TaskCreate(subject="[Payment] Diagnose root cause",    addBlockedBy=[A1])
A3 = TaskCreate(subject="[Payment] Implement fix",          addBlockedBy=[A2])
A4 = TaskCreate(subject="[Payment] Verify + test",          addBlockedBy=[A3])

// Issue B — auth token expiry
B1 = TaskCreate(subject="[Auth] Scout token lifecycle")
B2 = TaskCreate(subject="[Auth] Diagnose root cause",       addBlockedBy=[B1])
B3 = TaskCreate(subject="[Auth] Implement fix",             addBlockedBy=[B2])
B4 = TaskCreate(subject="[Auth] Verify + test",             addBlockedBy=[B3])

// Final convergence
TaskCreate(subject="Integration verification",              addBlockedBy=[A4, B4])
```

Spawn one `god-developer` agent per issue tree. Each agent claims tasks via `TaskUpdate(status="in_progress")` and completes via `TaskUpdate(status="completed")`.

## Pattern E: Deep Workflow — Parallel Investigation Phase

In complex bugs (Deep workflow), Steps 1+2+3 should run **concurrently** to save time:

```
// All three launch simultaneously:
Task("Explore", "Scout: map affected files, dependencies, and test coverage")
// Meanwhile, main agent starts diagnosis using available error context
// Meanwhile:
Task("researcher", "Research: find latest docs and known issues for [library/framework]")
```

The main agent begins hypothesis formation (Step 2) immediately using the error message and stack trace. Scout results enrich the diagnosis when they arrive. Research results inform the fix approach.

**Key insight:** You don't need to wait for scouting to finish before starting diagnosis — the error message itself is often enough to form initial hypotheses.

## Resource Constraints

- **Max concurrent agents:** 3-5 (beyond this, coordination overhead exceeds benefit)
- **Context limit per agent:** ~200K tokens — keep prompts focused
- **Timeout:** If an agent hasn't returned in 3 minutes, skip it and proceed with available data
- **No file conflicts:** Parallel agents must NOT edit the same files. Read-only during investigation phases.

## Fallback: When Task Tools Are Unavailable

`TaskCreate`/`TaskUpdate` are CLI-only — they error in some IDE extensions. If they fail:
- Track progress manually using markdown checklists
- The fix workflow itself remains fully functional — Tasks add visibility, not core logic
