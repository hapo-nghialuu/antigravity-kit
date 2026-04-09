---
name: hapo:develop
description: "Code execution engine: Reads specs and implements code end-to-end with automatic code review and self-healing."
argument-hint: "[feature-name|specs-directory-path]"
---

# Hapo Develop — Feature Implementation (Full Build)

Reads the full project specification (`hapo:specs`) and relentlessly implements code from A to Z in a disciplined, single-track workflow. Automatically overcomes obstacles and only escalates to the user when facing persistent critical failures.

**Principles:** YAGNI, KISS, DRY | Continuous execution | Smart self-healing

## Usage

```bash
/hapo:develop <feature name>
/hapo:develop specs/<feature-name>
```

<HARD-GATE>
DO NOT write implementation code until an approved spec exists.
- If the directory `specs/<feature-name>` DOES NOT EXIST or `spec.json` is not ready, automatically trigger `/hapo:specs <feature-name>` first to create the specification. Do not improvise.
</HARD-GATE>

## Anti-Rationalization Protocol

| Thought (Excuse) | Reality (Rule) |
|-------------------|----------------|
| "No need to scout first" | Coding without knowing the architecture is blind. ALWAYS call `inspector` to scan files. |
| "Review process is too tedious, let me just finish it myself" | The system needs an audit trail through agents. ALWAYS delegate via `Task` tool. |

## Absolute 4-Step Workflow

```mermaid
flowchart TD
    A["/hapo:develop \u003cfeature\u003e"] --> B[Step 1: Load Spec]
    B -->|Missing| Z[Stop: Run /hapo:specs]
    B -->|Ready| C[Step 2: Scout Codebase (inspector)]
    C --> D[Step 3: Implement Code (god-developer)]
    D --> E[Step 4: Auto-Fix Code Review / Max 3 rounds]
    E -->|Fail (code-reviewer)| D
    E -->|Pass| F[Report Completion]
```

### Step 1: Initialize & Load Spec
- Identify input. Open `specs/<feature-name>/spec.json`.
- Check `ready_for_implementation` status. If not ready, notify user.
- List all Markdown files in `specs/<feature-name>/tasks/*.md`. Load them into working memory as the execution guide.

### Step 2: Scout (Codebase Inspection)
- **Mandatory:** Call agent `Task(subagent_type="inspector", ...)` to scan the overall codebase structure (e.g., where components live, where utils are). Avoid wandering into forbidden zones.

### Step 3: Implement Code
- Act as `god-developer` OR directly write code, executing tasks specified in the Markdown files sequentially.
- **Important:** You may create and modify files directly, but must faithfully follow the design from the Spec.
- Progress tracking: Temporarily change `[ ]` to `[/]` in Spec files while coding is in progress.

### Step 4: Self-Healing (Quality Gate Auto-Fix)
The moment you finish coding, DO NOT proceed further. Switch to `references/quality-gate.md` and run the automatic review loop.
**Mantra:** All feedback from code-reviewer must be addressed thoroughly: Score >= 9.5 & Zero Critical issues.

- Only escalate to the user after 3 consecutive failed review rounds.

---
## Attached References
- `references/quality-gate.md` - Rules for the Code Review loop.
- `references/subagent-patterns.md` - Standard prompts for calling subagents.
