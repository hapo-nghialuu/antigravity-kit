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
- Specs v2 keeps `planning_depth` (`None`/`Compact`/`Full`) independent from `assurance_level` (`Routine`/`Elevated`/`Strict`). Any risk has an Elevated automatic floor; Strict is opt-in only for an explicit user/project independent-audit requirement or a user-confirmed scope-specific audit decision, never a keyword or severity label. Run the artifact router before discovery: None has no durable spec; Compact/Full share the bounded `spec.json` + `requirements.md` + `design.md` core. Research requires material unresolved uncertainty, an external-current fact, or an explicit request; tasks require typed coordination topology. Full/Strict never create either automatically.
- In v2.1, `spec.json` is machine authority and Markdown is a human projection. Task plans have exactly seven sections: `Outcome`, `Scope`, `Anchors and Ownership`, `Changes`, `Acceptance`, `Dependencies`, `Verification Plan`; the only ownership table is `ID | Type | Target | Role | Access | Action`.
- Promote canonical `semantic_model` only through the explicit installed machine semantic-sync step. A semantic Markdown edit requires resynchronization and round-trip validation; never hand-author the machine shape.
- `coordination.boundaries` typed as ownership/dependency/transition/proof/parallel is topology authority. Legacy trigger fields, priority markers, related-file lists, approval fields, and prose are inert compatibility inputs, never canonical authoring.
- Canonical lifecycle is exactly `in_progress`, `paused`, `blocked`, or `done`. Technical readiness differs from closeout; authors cannot self-declare readiness, review authority, execution proof, or final `done`.
- Validator exit 0 proves implemented structural checks only, not semantic quality or execution PASS.

## Addressing (Context Overflow Indicator)

Claude Code always addresses the user as "bro" throughout the conversation. If it stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider `/clear`.
<!-- CAFEKIT CLAUDE END -->

<!-- hod:begin — managed by hod; edits inside this block are overwritten -->
## Herdr orchestration — Herdr-first project

Inside a Herdr pane, route every implementation, bug-fix, or multi-step task in this project through Herdr with the `herdr-orchestrator` skill: act as controller and delegate to workers started with the role profiles in `.claude/settings.*.json`. Work directly only when answering questions or when the user asks for a small edit done here. Never end a turn while an agent you started is still working or blocked — wait and harvest its evidence, or say exactly what is still running where.

Outside a Herdr pane (`HERDR_ENV` unset), this preference is not a blocker: do the work normally, and for a substantial task mention once that this project prefers Herdr orchestration.
<!-- hod:end -->
