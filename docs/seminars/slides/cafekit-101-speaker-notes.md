# CafeKit 101 Speaker Notes

Use these notes as a facilitator script for `cafekit-101-slides.md`. Keep the live presentation conversational; the slide deck is intentionally compact.

## Timing Plan

| Section | Slides | Time |
|---|---:|---:|
| Opening and problem framing | 1-6 | 10-15 min |
| Claude Code foundation | 7-17 | 20-25 min |
| CafeKit workflow and artifacts | 18-29 | 25-30 min |
| Live demo | 30-36 | 30-45 min |
| Failure modes, lab, adoption | 37-42 | 15-25 min |

For a 45-minute seminar, shorten the live demo to specs + validate only.
For a 3-hour workshop, keep all demo sections and run the hands-on lab.

## Opening

### Slides 1-4

Main point:

CafeKit exists because AI coding assistants are powerful but need a disciplined workflow. The problem is not that AI cannot write code; the problem is that it can write code too early, before scope, requirements, evidence, and review gates are clear.

Suggested wording:

> Today I want to show how CafeKit turns Claude Code into a spec-driven workflow. The goal is not to make Claude write more code. The goal is to make Claude write code from a shared source of truth.

Avoid:

- Overclaiming that CafeKit prevents all mistakes.
- Positioning CafeKit as replacing engineering judgment.

## Demo Project Setup

### Slides 5-6

Explain why the triage dashboard works well as a demo:

- It is easy to understand.
- It has UI, state, filtering, detail view, and status update.
- It creates enough task complexity to show validation.
- It stays small enough for a live session.

Suggested wording:

> This demo is intentionally ordinary. CafeKit should make everyday product work more controlled, not only exotic AI demos.

## Claude Code Foundation

### Slides 7-17

Main point:

CafeKit is built from Claude Code primitives. The audience must understand these before CafeKit makes sense.

Use this framing:

| Primitive | CafeKit usage |
|---|---|
| `CLAUDE.md` | Project instructions and workflow rules |
| Skills | Repeatable workflows like `hapo:specs` |
| Agents | Specialized roles like tester/reviewer/debugger |
| Hooks | Guardrails and runtime automation |
| Settings | Wiring hooks/statusline/runtime behavior |
| Scripts | Deterministic checks |

Suggested wording:

> If you understand these six primitives, CafeKit becomes easier to reason about. It is not magic; it is a coordinated project runtime.

Demo files to open:

```text
CLAUDE.md
.claude/skills/specs/SKILL.md
.claude/agents/test-runner.md
.claude/settings.json
.claude/hooks/
```

## CafeKit Workflow

### Slides 18-24

Main point:

CafeKit separates thinking, planning, implementation, verification, and review.

Emphasize:

- `brainstorm` is for unclear ideas.
- `specs` creates artifacts.
- `validate` catches spec defects before code.
- `develop` implements from task files.
- `test` verifies against task evidence.
- `code-review` checks spec compliance before code quality.
- `git` packages the work.

Suggested wording:

> The workflow matters because each step has a different definition of done.

## Spec Artifacts

### Slides 25-29

Main point:

The spec folder is the contract between planning and implementation.

When opening files, show:

```text
specs/customer-support-triage-dashboard/spec.json
specs/customer-support-triage-dashboard/requirements.md
specs/customer-support-triage-dashboard/research.md
specs/customer-support-triage-dashboard/design.md
specs/customer-support-triage-dashboard/tasks/task-R1-06-ticket-list.md
```

Explain the key distinction:

> `PASS` from the validator means the artifacts have a valid shape. It does not automatically mean the spec has completed the workflow. For complex specs, Red Team + Validate must complete and `ready_for_implementation` must be true.

## Live Demo

### Slide 30: Install

Commands:

```bash
mkdir triage-dashboard
cd triage-dashboard
npx @haposoft/cafekit@0.8.11
claude
```

Show:

```bash
cat .claude/cafekit.json
```

Talking points:

- Version tracking matters because CafeKit behavior changes across releases.
- `.claude/.gitignore` prevents generated session state and caches from polluting commits.

### Slide 31: Create Specs

Command:

```text
/hapo:specs Build a customer support triage dashboard that helps support agents prioritize tickets, filter work, inspect ticket details, and update ticket status
```

What to show:

- Scope inquiry.
- Generated task files.
- A task file with full sections.

Do not spend too long reading every generated file.

### Slide 32: Validate

Command:

```text
/hapo:specs customer-support-triage-dashboard --validate
```

What to show:

- Validator command output.
- Red Team findings.
- Any physical changes to task files.
- Final readiness fields in `spec.json`.

Important:

If the run stops before final state update, explain that artifact validation and workflow readiness are separate.

### Slide 33: Develop

Command:

```text
/hapo:develop customer-support-triage-dashboard
```

What to show:

- It reads task files.
- It scouts the source before each task.
- It should not add out-of-scope work.
- It should prove runtime reachability.

If the live run is slow, switch to a prepared checkpoint.

### Slide 34: Test

Command:

```text
/hapo:test customer-support-triage-dashboard
```

Talking points:

- CafeKit does not mean “run every test type for every task.”
- Test type follows the task surface:
  - logic -> unit
  - UI/state -> component/integration
  - full workflow -> E2E/UI
  - responsive/style -> visual viewport checks
  - focus/ARIA -> accessibility checks

### Slide 35: Code Review

Command:

```text
/hapo:code-review --pending
```

Talking points:

- Spec compliance comes before style cleanup.
- Code quality review only matters after the implementation actually satisfies the spec.

### Slide 36: Git

Command:

```text
/hapo:git
```

or manual:

```bash
git status
git add ...
git commit -m "feat: implement triage dashboard"
git push
```

Talking points:

- Keep commits scoped.
- Avoid generated runtime/session files.
- Version metadata helps future debugging.

## Common Failure Modes

### Slide 37

Use examples from the recent CafeKit v0.8.10 -> v0.8.11 iteration:

- Reduced task template passed older validator.
- Session-state files were still tracked after `.gitignore` was added.
- A spec could pass artifact validation without being implementation-ready.

Suggested wording:

> This is why deterministic checks keep getting stricter. We want the workflow to fail early when the artifact is not safe to hand to development.

## Usage Guidance

### Slides 38-39

Be pragmatic:

- CafeKit is useful when coordination cost matters.
- It is not required for tiny edits.
- A good team should choose workflow depth based on risk and blast radius.

## Hands-on Lab

### Slide 40

Recommended lab prompt:

```text
/hapo:specs Build a simple expense tracker that lets users add expenses, categorize them, filter by category, and see monthly totals
```

Expected lab output:

- Spec folder exists.
- Validator can run.
- Participants can explain at least one task’s evidence section.

## Adoption

### Slide 41

Recommended rollout:

1. Use `/hapo:specs` for new feature planning.
2. Require `/hapo:specs --validate` before implementation for specs with 5+ tasks.
3. Use `/hapo:develop` only when `ready_for_implementation = true`.
4. Add `/hapo:test` before PR.
5. Add `/hapo:code-review` as a compliance gate.

## Closing

### Slide 42

End with the core statement:

> CafeKit is Claude Code with engineering discipline.

The closing should be short. Do not introduce new commands or architecture at the end.

## Backup Plan

Prepare before the seminar:

- A clean demo repo.
- A completed spec folder.
- A validated spec folder.
- A working app checkpoint.
- Screenshots of validator failures and passes.
- A short screen recording of the full flow.

Suggested checkpoints:

```text
demo-00-empty
demo-01-installed
demo-02-specs-generated
demo-03-specs-validated
demo-04-developed
demo-05-tested-reviewed
```

## Questions To Expect

### “Is CafeKit just prompts?”

Answer:

No. CafeKit includes prompts/instructions, but also project skills, agents, hooks, settings, scripts, validators, and runtime metadata.

### “Do we need specs for every change?”

Answer:

No. Use CafeKit where coordination, risk, and traceability matter. Skip full specs for tiny edits.

### “What happens if Claude ignores the workflow?”

Answer:

CafeKit combines instructions with deterministic scripts and hooks. The validator catches artifact shape problems even if a model tries to simplify the task format.

### “Can teams customize it?”

Answer:

Yes, but start with the default workflow first. Customize rules/agents/hooks after the team understands the baseline.

### “Why not just use TDD?”

Answer:

TDD is about implementation feedback. CafeKit starts earlier: scope, requirements, design, task evidence, and validation before code.
