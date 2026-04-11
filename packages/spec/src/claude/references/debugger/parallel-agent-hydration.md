# Swarm Tactics (Parallel Agent Hydration)

In order to resolve wide-radius cascading failures (e.g. Microservices collapsing simultaneously, Databases going down concurrently with Caches, or obscure Data Race conditions), relying purely on single-threaded execution (Serial execution) within an isolated Context Window will overwhelm and burn immense amounts of time. 

Do not attempt to solve everything alone! Elevate yourself to the role of **Head of Debugging (Chief Orchestrator)** and exploit the swarm potential (Parallel Hydration) inherent to the Multi-Agent grid.

## 1. When to Issue Swarm Directives?
- **Cross-examination Audits:** When you suspect an error heavily involves 2-3 disparate services. You must read Frontend Server logs, API Backend endpoints, and Slow Query PostgreSQL logs concurrently.
- **Widespread Impact Reconnaissance:** Exploring how many times an entire codebase invokes an API that recently suffered a Deprecation notice.
- **Polluter Isolation Tactics:** Scanning isolated codebase sectors independently to track down memory leaks or Data Races. Instead of executing Git Bisect linearly, deploy 3 Sub-Agents to investigate 3 separate commit history timelines simultaneously.

## 2. Dispatching Proxy Agents (Task Management)

Fully weaponized with the `TaskCreate` tool. Broadcast multiple `TaskCreate` commands AS EARLY AS POSSIBLE, granting robust execution authority to each spawned Sub-Agent.

### The Classic Execution: 3 Parallel Operatives
When investigating severe system latency/bottleneck incidents, initiate 3 concurrent Agents before executing localized manual sweeps:

```json
// TaskCreate Command 1: Assign to Database Analysis Agent
{
  "Goal": "Execute EXPLAIN ANALYZE on queries choking within the last 24h block. Must return a list containing the top 3 worst SQL execution plans.",
  "Files/Context": "src/database/... (assign appropriate CWD)",
  "ExpectedOutput": "A concise text summary published via TaskUpdate."
}

// TaskCreate Command 2: Assign to Frontend Performance Agent
{
  "Goal": "Monitor Network tabs, analyze HAR files or Load Test scripts. Specifically identify any JS Bundle requiring more than 5 seconds to load.",
  "Files/Context": "src/frontend/... "
}

// TaskCreate Command 3: Assign to Infrastructure/CI Pipeline Agent
{
  "Goal": "Download GitHub Actions pipeline logs executed at midnight. Scan precisely for Out Of Memory (OOM) Errors occurring within Docker pods.",
  "Files/Context": "Utilize robust bash curl executions pointing to Github APIs."
}
```

## 3. Disruption Avoidance Rules (Isolation Paradigms)
- **Zero Shared Modification Allowed:** Sub-Agents deployed during the "Reconnaissance" Phase (Hydration) are explicitly RESTRICTED TO READ-ONLY OPERATIONS (Read-only, Grep, Log search). Absolutely forbid assigning dual sub-agents to mutate the same `.ts` file simultaneously, an act which guarantees catastrophic Merge Conflicts.
- **Context Injection (Knowledge Passing):** Do not expect your proxy agents to derive full systemic context from nothing. Inject rich knowledge matrices directly into the Description string during `TaskCreate`: "Navigate exclusively into directory X, execute command Y, locate error line Z. Return report immediately here".
- **Acknowledge & Gather Pattern (Re-assimilation):** After deploying the fleet, aggressively monitor the grid using `TaskList` or `TaskGet`. Wait for operative `DONE` statuses and updates. Finally, amalgamate returning reports into a master Cross-correlation diagnostic map before passing your final judgment execution.
