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
Constraint 1: ALWAYS use native `WebSearch` as the primary search method.
Constraint 2: Validate key claims with multiple credible sources. Prioritize official docs, maintainers, release notes, and strong production references.
Constraint 3: Use direct `WebFetch` only when search results are insufficient or raw source inspection is required.
Constraint 4: Limit total search calls to a maximum of 5 distinct queries.
Constraint 5: Stop excessive "chain-searching". Synthesize decisively once the evidence is sufficient.
Output Format: Must strictly follow the 'Standard Research Report' layout.
```

### Phase 3: The Standard Report Format (Mandatory)
The subagent MUST return the findings formatted EXACTLY according to the built-in specification template.

Instruct the Researcher Subagent with this strict requirement:
> "Sử dụng nguyên bản template tại `packages/spec/src/claude/skills/specs/templates/research.md`. Tuyệt đối không tự ý đẻ thêm các đề mục ngoài phạm vi file template này."

## Post-Execution
Once the `researcher` completes the Task and returns the Markdown output, save it based on context:

### Output Routing
| Context | Save to | Example |
|---|---|---|
| Active spec exists (`specs/<feature>/`) | `specs/<feature>/research.md` | `specs/auth-login/research.md` |
| No active spec (system-wide / general) | `specs/_shared/Research-<slug>-<date>.md` | `specs/_shared/Research-mv3-best-practices-2026-04-11.md` |

### Rules
1. **Feature research** → Always save inside the active spec folder. If `specs/<feature>/` doesn't exist yet, create it.
2. **System-wide research** → Save to `specs/_shared/`. Create the directory if it doesn't exist.
3. **Never** save to `plans/reports/` or `docs/`. All research belongs in `specs/`.
4. Conclude the workflow by providing the user with the saved file path.
