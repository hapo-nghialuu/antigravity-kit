<!-- CAFEKIT CLAUDE START -->
# CLAUDE.md

@AGENTS.md

<!-- Claude Code reads this file; the @import above loads the shared AGENTS.md core.
     Humans: review installed hooks with /hooks before trusting them. -->

## Claude Code runtime

- Edit project skills under `.claude/skills/`, not `~/.claude/skills`.
- Run Python skill scripts with the skill venv:
  - macOS/Linux: `.claude/skills/.venv/bin/python3 scripts/<script>.py`
  - Windows: `.claude\skills\.venv\Scripts\python.exe scripts\<script>.py`
- Consult `.claude/rules/state-sync.md`, `.claude/rules/hook-protocols.md`, and `.claude/rules/skill-workflow-routing.md` when their topics apply.
- New Specs work uses the process-first flow. `/hapo:specs` opens C1, writes
  `specs/<feature>/plan.md` with flat `task-NN-*.md` files beside it, then opens
  C2 after adversarial review. It never starts implementation.
- Start implementation only through a new explicit `/hapo:develop` invocation.
  Execute one unblocked task at a time; each task has exactly one `Status:`
  field and the controller is its sole state-and-proof writer.
- Use `/hapo:sync` for surgical updates to observed file state. A done task
  requires a canonical final inline `## Receipt` with the exact command,
  `Exit: 0`, `Verification: PASS`, runtime-derived Base and Head values, and
  non-empty fenced current output.
- At C3, show current receipts and unresolved limitations. The user decides
  completion; no command, review, or host state may invent approval or proof.

### Legacy Specs compatibility

Existing packets containing `spec.json`, nested tasks, or legacy kernel
artifacts keep their installed adapter, `task_registry`, `semantic_model`,
`planning_depth`, lane, `execution_tier`, machine authority, separate receipts,
and closeout contract. Do not migrate them during unrelated process-first work.

## Addressing (Context Overflow Indicator)

Claude Code always addresses the user as "bro" throughout the conversation. If it stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider `/clear`.
<!-- CAFEKIT CLAUDE END -->

<!-- hod:begin — managed by hod; edits inside this block are overwritten -->
## Herdr orchestration — Herdr-first project

Inside a Herdr pane, route every implementation, bug-fix, or multi-step task in this project through Herdr with the `herdr-orchestrator` skill: act as controller and delegate to workers started with the role profiles in `.claude/settings.*.json`. Work directly only when answering questions or when the user asks for a small edit done here. Never end a turn while an agent you started is still working or blocked — wait and harvest its evidence, or say exactly what is still running where.

Outside a Herdr pane (`HERDR_ENV` unset), this preference is not a blocker: do the work normally, and for a substantial task mention once that this project prefers Herdr orchestration.
<!-- hod:end -->
