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
