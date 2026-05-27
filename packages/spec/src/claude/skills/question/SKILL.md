---
name: hapo:question
description: "Clarify vague requests before planning or implementation. Use when requirements, acceptance criteria, scope, constraints, stakeholder decisions, or next workflow readiness are unclear."
argument-hint: "<request_or_context> [--batch|--spec-ready|--stakeholder]"
version: 1.0.0
---

# Question Skill

`hapo:question` turns unclear intent into answerable questions and a readiness verdict. It is a clarification gate before `hapo:brainstorm`, `hapo:specs`, `hapo:docs --reconstruct`, `hapo:debug`, or `hapo:develop`.

## Core Stance

- Context before questions. Read the useful project/spec/docs/source context before asking.
- Questions are work products. Make them specific, prioritized, and easy to answer.
- One thing at a time in interactive mode.
- Prefer multiple-choice options with a recommended default when the context supports it.
- Do not design the solution unless the user explicitly moves to `hapo:brainstorm`.
- Do not create specs or write code from this skill.

<CLARIFICATION-ONLY-GATE>
Do NOT implement, scaffold, edit product code, generate full specs, or make architecture decisions as final.
The output is questions, assumptions, readiness, and next-step guidance.
</CLARIFICATION-ONLY-GATE>

## When To Use

Use `hapo:question` when:
- The request is too vague to verify.
- Acceptance criteria are missing.
- Scope boundary is unclear.
- Stakeholder/customer input is needed before specs.
- The user asks "what should I ask?", "what is missing?", "can this go to specs?", or "is this clear enough?"
- A spec/task has ambiguity that would make `hapo:develop` risky.
- A legacy reconstruction or bug report lacks enough scope to start the correct workflow.

Do not use it when:
- The user asks for a direct factual answer that can be answered safely.
- The user already gave exact output, acceptance criteria, scope, constraints, and target files.
- The right action is clearly `hapo:debug`, `hapo:inspect`, `hapo:research`, or `hapo:docs --reconstruct`.

## Modes

- Default interactive mode: ask one highest-value question, then wait.
- `--batch`: produce a grouped question list for a stakeholder/customer/team.
- `--spec-ready`: audit whether the request can move to `hapo:specs`.
- `--stakeholder`: write business-friendly questions with minimal implementation jargon.

If multiple modes appear, use the most restrictive mode in this order: `--spec-ready`, `--batch`, `--stakeholder`, default.

## Workflow

### 1. Context Scout

Read only enough context to make the questions concrete:
- `README.md`
- relevant `docs/`
- relevant `specs/`
- relevant source files when the request names a feature, module, API, UI, or bug

Use `hapo:inspect` or focused search when the location is unclear. Do not scan the whole repo unless the question is about the whole repo.

### 2. Build The Clarification Map

Create a private map with these fields:

```text
Known facts:
Assumptions:
Missing decisions:
Blocking unknowns:
Non-blocking unknowns:
Possible next workflow:
```

Classify each unknown:
- `P0`: blocks correct next action.
- `P1`: high-risk ambiguity; should answer before implementation.
- `P2`: useful detail; can defer.

### 3. Ask Or Report

Default interactive mode:
- Ask exactly one `P0` question.
- Make it concrete and grounded in observed context.
- If possible, provide 2-3 options.
- Put the recommended option first and explain the tradeoff in one sentence.

`--batch` or `--stakeholder`:
- Produce grouped questions by priority.
- Keep each question answerable.
- Include recommended options only when they are justified by context.

`--spec-ready`:
- Return a readiness checklist and verdict.
- Do not ask a long question list unless verdict is `not-ready`.

### 4. Readiness Verdict

End with one of:
- `not-ready`: missing P0 decisions.
- `brainstorm-ready`: enough to explore solution options, but not enough for specs.
- `specs-ready`: enough to run `/hapo:specs <request>`.
- `develop-ready`: an approved spec/task exists and no blocking ambiguity remains.

### 5. Next Step

Suggest exactly one next command:
- `/hapo:question ...` when another clarification round is required.
- `/hapo:brainstorm ...` when design/options are still open.
- `/hapo:specs ...` when requirements are clear enough.
- `/hapo:debug ...` when the issue is a bug with unknown root cause.
- `/hapo:docs --reconstruct <scope>` when the task is legacy/as-is docs.
- `/hapo:develop <feature>` only when an approved spec/task is already clear.

## Output Formats

### Default Interactive Output

```markdown
**Context Read**
- ...

**Known**
- ...

**Blocking Unknown**
- P0: ...

**Question**
...

**Options**
- A. ... (Recommended) - ...
- B. ... - ...
- C. ... - ...

**Readiness**
not-ready | brainstorm-ready | specs-ready | develop-ready

**Next**
/hapo:question ...
```

### Batch Output

Use `templates/question.md` when the user asks to save or document the question set.

```markdown
**Question Set**

**P0 - Must Answer**
1. ...

**P1 - Should Answer**
1. ...

**P2 - Can Defer**
1. ...

**Assumptions To Confirm**
- ...

**Readiness**
...

**Next**
...
```

## Quality Bar

- Every P0 question must explain what decision it unlocks.
- No generic "please clarify" questions.
- No more than one interactive question per response.
- No implementation plan unless the next command is `hapo:brainstorm` or `hapo:specs`.
- If no P0/P1 unknown exists, do not invent questions. Say it is ready and name the next command.
