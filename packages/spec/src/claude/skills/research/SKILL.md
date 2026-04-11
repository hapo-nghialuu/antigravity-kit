---
name: hapo:research
description: "Research technical solutions and analyze architectures. Acts as a command facade to trigger the 'researcher' subagent for multi-source verification and deep report synthesis."
argument-hint: "<topic_or_question>"
version: 2.0.0
---

# Research (Delegation Facade)

**Mantra:** YAGNI, KISS, DRY. Be brutal, straight to the point, and strictly authoritative.

This skill acts as a **Command Facade**. When invoked, the main Orchestrator MUST NOT attempt to run WebSearch itself. Instead, it must instantly delegate the operation to the Specialized Subagent.

## Execution Sequence

### Phase 1: Clarification (Scope Lock)
Before delegating, briefly assess the `[topic]`.
- Is it vague? (e.g. "Research React"). If yes, immediately reject and demand the user specify the context (e.g. "Research SEO capabilities of React Server Components").
- If solid, proceed.

### Phase 2: Agent Delegation
Call the `TaskCreate` tool to spin up the `researcher` subagent.
**Instructions to pass to Researcher:**
```text
Conduct comprehensive research on: [topic]
Constraint 1: Limit WebSearch calls to a maximum of 5 distinct queries to conserve context.
Constraint 2: Utilize scripts/docs-fetch.js if official Github/Doc URLs are discovered.
Constraint 3: Validate information via cross-referencing capabilities.
Output Format: Must strictly follow the 'Standard Research Report' layout.
```

### Phase 3: The Standard Report Format (Mandatory)
The subagent MUST return the findings formatted EXACTLY according to the built-in specification template.

Instruct the Researcher Subagent with this strict requirement:
> "Sử dụng nguyên bản template tại `packages/spec/src/claude/skills/specs/templates/research.md`. Tuyệt đối không tự ý đẻ thêm các đề mục ngoài phạm vi file template này."

## Post-Execution
Once the `researcher` completes the Task and returns the Markdown output:
1. Save the file cleanly using the naming path format injected by the Context Hook (typically `plans/reports/Report-<slug>-<date>.md`).
2. Conclude the workflow by providing the user with the file path.
