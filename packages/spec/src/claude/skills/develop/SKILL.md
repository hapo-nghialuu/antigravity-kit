---
name: hapo:develop
description: "Code execution engine: Reads specs and implements code end-to-end with automatic code review and self-healing."
argument-hint: "[feature-name|specs-directory-path]"
---

# Develop — Feature Implementation (Full Build)

Reads the full project specification (`hapo:specs`) and relentlessly implements code from A to Z in a disciplined, single-track workflow. Automatically overcomes obstacles and only escalates to the user when facing persistent critical failures.

**Principles:** YAGNI, KISS, DRY | Continuous execution | Smart self-healing

## Usage

```bash
/hapo:develop <feature name>
/hapo:develop specs/<feature-name>
/hapo:develop <feature name> <specific-task-file.md>
```

<HARD-GATE>
DO NOT write implementation code until an approved spec exists.
- If the directory `specs/<feature-name>` DOES NOT EXIST or `spec.json` is not ready, automatically trigger `/hapo:specs <feature-name>` first to create the specification. Do not improvise.
</HARD-GATE>

<DEFINITION-OF-DONE>
A task is NOT done because code compiles or a placeholder renders.
A task is done only when the task file's Completion Criteria AND Verification & Evidence section are satisfied with real execution proof.
</DEFINITION-OF-DONE>

## Anti-Rationalization Protocol

| Thought (Excuse) | Reality (Rule) |
|-------------------|----------------|
| "No need to scout first" | Coding without knowing the architecture is blind. ALWAYS call `inspect` to scan files. |
| "Review process is too tedious, let me just finish it myself" | The system needs an audit trail through agents. ALWAYS delegate via `Task` tool. |

## Absolute Workflow

```mermaid
flowchart TD
    A["/hapo:develop \u003cfeature\u003e"] --> B[Step 1: Load Spec]
    B -->|Missing| Z[Stop: Run /hapo:specs]
    B -->|Ready| C[Step 2: Scout Codebase (inspect)]
    C --> D[Step 3: Implement Code (god-developer)]
    D --> E[Step 4: Quality Gate: Test + Review + Evidence]
    E -->|Fail (code-auditor)| D
    E -->|Pass| F[Step 5: State Sync + Incremental Docs Sync]
    F --> G[Report Completion]
```

### Step 1: Initialize & Load Spec
- Identify input: Open `specs/<feature-name>/spec.json`.
- Check `ready_for_implementation` status. If not ready, notify user.
- **Task Scoping (CRITICAL):**
  - If the user specifies a particular task file (e.g., `task-R0-02...md`), load **ONLY** that specific file into working memory.
  - If no specific task is mentioned, list and load all Markdown files in `specs/<feature-name>/tasks/*.md`.
- **Task Packet Extraction (MANDATORY):** Before coding, extract from the active task file(s):
  - Objective + Constraints
  - Related Files
  - Completion Criteria
  - Verification & Evidence
  - Requirement IDs referenced by the task
  - Relevant `Canonical Contracts & Invariants` from `design.md`
- If the task file is missing actionable completion or verification detail, STOP and route back to spec correction. Do not guess.

### Step 2: Scout (Codebase Inspection)
- **Mandatory:** Call agent `Task(subagent_type="inspect", ...)` to scan the overall codebase structure (e.g., where components live, where utils are). Avoid wandering into forbidden zones.

### Step 3: Implement Code
- Act as `god-developer` OR directly write code, executing tasks specified in the loaded Markdown file(s) sequentially.
- **Important:** You may create and modify files directly, but must faithfully follow the design from the Spec.
- Progress tracking: Temporarily change `[ ]` to `[/]` in Spec files while coding is in progress. Do NOT mark `[x]` before Step 4 passes.
- **Hard Stop Protocol:** If you were asked to implement a specific task file, you MUST STOP completely after that task is verified. DO NOT auto-chain or jump to "Next Task" simply because you see it in the spec. Wait for the user's next command.
- **Test Integrity Protocol:** You MUST NOT delete, replace, or reduce the scope of existing test cases to make tests pass. If a test fails, you must fix the **implementation code** or fix the **test setup/mock**, NOT remove the assertion. Reducing test count or weakening assertions (e.g., removing `toHaveBeenCalledWith` and replacing with `toEqual(expect.any(...))`) is a Critical violation.
- **Contract Integrity Protocol:** If implementation appears to require changing auth/session, transport, persistence, entrypoint wiring, or generated artifact behavior beyond what `design.md` states, STOP and route back to spec correction instead of inventing a new contract in code.

### Step 4: Self-Healing (Quality Gate Auto-Fix)
The moment you finish coding, DO NOT proceed further. Switch to `references/quality-gate.md` and run the automatic review loop.
**Mantra:** All feedback from code-auditor must be addressed thoroughly: Score >= 9.5 & Zero Critical issues.

- Passing Step 4 requires ALL of the following:
  1. Automated verification passes (typecheck/test/build as applicable)
  2. Code review passes
  3. Task evidence passes (artifacts/runtime surfaces/negative-path checks from the task file are proven)
- If build/test passes but task evidence is missing, the task is still FAIL.
- Only escalate to the user after 3 consecutive failed review rounds.

### Step 5: State Sync + Incremental Docs Sync
- Only after Step 4 passes may you mark task checkboxes completed and sync `spec.json` progress/timestamps.
- If verification is partial or blocked by environment, keep the task in `pending` or `in_progress` and record the blocker instead of pretending completion.
- After passing the Quality Gate, evaluate if any actual codebase modifications occurred (e.g., check pending files via git status).
- If files were created or modified: Trigger `docs-keeper` automatically to execute `repomix` and update the global `/docs/` and project logs.
- **CWD Protocol (CRITICAL):** When spawning `docs-keeper`, you MUST ensure the agent's Current Working Directory (CWD context) is explicitly set to the **Workspace Root**, NOT the inner package directory you were just coding in. Otherwise, `docs-keeper` will search for the root `docs/` folder in the wrong place and crash.
- Do NOT skip this step! The user explicitly requires documentation to be synced immediately after every `/hapo:develop` action, overriding the default Phase 3-only rule.

---
## Attached References
- `references/quality-gate.md` - Rules for the Code Review loop.
- `references/subagent-patterns.md` - Standard prompts for calling subagents.
