# Task 01 — Author the adaptive coverage contract

Status: done

## Outcome

Specs converts a broad or ambiguous request into the smallest correct workflow and a material coverage profile, without turning routine work into a deep planning ceremony or creating new machine authority.

## Scope

- In: risk-first exact routing, canonical per-outcome coverage rows, multi-valued/open kinds and surfaces, normative ambiguity actions, monotonic risk, proof lifecycle, scoped reviewer selection, profile rederivation, and line-budget-neutral replacement.
- Out: parser/hook/Receipt changes, timing instrumentation, legacy templates, implementation dispatch, and an exhaustive technology registry.

## Ownership

- Modify: `packages/spec/src/claude/skills/specs/SKILL.md`
- Modify: `packages/spec/src/claude/agents/spec-maker.md`
- Modify: `packages/spec/src/claude/skills/specs/references/templates.md`
- Modify: `packages/spec/src/claude/skills/specs/references/review.md`
- Modify: `packages/spec/scripts/run-skill-self-tests.mjs`

## Acceptance

- AC-01: classify risk before route selection; preserve the clear + isolated + reversible + routine + likely one/two-file direct gate; enforce critical/elevated floors from the plan; settle user-owned observable decisions at C1/C2 before Brainstorm; route material design alternatives through Brainstorm; split exactly at `>=3` independently deliverable subsystems. Static cases include a destructive one-file request labeled routine and retention examples that would change behavior.
- AC-02: `plan.md` owns one `## Coverage profile` table with one `CP-NN` row per externally observable outcome and exact columns for kinds, material surfaces, ambiguity/action, risk/evidence, and required proof; each task references its CP IDs. Kinds are sets, unfamiliar kinds/surfaces use `other:<verbatim>`, and obligations union only within affected rows/tasks. Keep group-based reviewer counts, select Fact Checker plus matching highest-risk roles, never omit a relevant security/failure role for a critical row, and add no unrelated reviewer. Canonical semantics stay in the skill/templates, `spec-maker` references them, and accepted scope/outcome/criteria/ownership/dependency/risk/proof changes rederive affected rows before status.
- AC-03: distinguish a planned required proof set from reachability and executed evidence. Unknown command/caller/environment reachability blocks `pending`; known planned-but-unrun proof does not. Missing/failed/unavailable required execution proof blocks `done`/C3, and `source`, `installed`, and `live` remain independent. Source/static checks prove only the written contract, not live model adherence.
- AC-06: existing C1/C2/C3, task statuses, dependency basenames, Receipt rules, legacy compatibility, review cap/two-round stop, and line ceilings remain intact. Replace/compact current Step 0 plus ambiguity routing in `SKILL.md`, merge profile shape into the existing no-invention/boundary section in `templates.md`, and replace group-only review wording instead of appending parallel rules. Report per-file line deltas; do not edit the legacy template files; the nine-file shipped bundle must have net delta `<= 0` and total `<= 750`.

## Dependencies

- none

## Verification Plan

- Command: `node packages/spec/scripts/run-skill-self-tests.mjs --static-only`
- Named probe: `hapo:specs adaptive coverage contract is complete and monotonic`
- Reachability: canonical Claude Specs skill/templates/review and source `spec-maker`; installed skill/agent parity is owned by Task 02. No live-model behavior is claimed.
- Oracle: the static runner exits 0 only when the risk-first routes, canonical CP shape/rederivation, ambiguity actions, scoped lenses, proof lifecycle, existing process-first invariants, per-file deltas, and complete bundle ceiling are all present.
- Counterexample: a mutation permits a destructive routine fast path, drops an `other:<verbatim>` kind/surface, lets examples choose behavior, globalizes a critical lens, leaves a post-C2 profile stale, confuses planned proof with `UNKNOWN`, or raises the bundle above 750; the named detector fails.
- Artifacts: normal command output only; no persistent test artifact.

## Receipt

Verification: PASS
Command: node packages/spec/scripts/run-skill-self-tests.mjs --static-only
Exit: 0
Base: ff4d6d07988f83e001ccf94197dc039464cc5962
Head: c19cd50be0b1433d088f71e6b88697ae78b230f28f883042379d3a8d6b1b3c24
```text
✔ hapo:specs process-task status checker rejects 10 semantic weakenings
✔ hapo:specs implementation-readiness checker rejects 30 gate-specific source mutations
✔ hapo:specs adaptive coverage contract is complete and monotonic; bundle deltas: src/claude/skills/specs/SKILL.md -19, src/claude/skills/specs/references/review.md +3, src/claude/skills/specs/references/templates.md +16; total 750/750
✔ hapo:specs adaptive coverage checker rejects 23 semantic weakenings
✔ Specs v3 flat layout, C1-C3 gates, review, and receipt contracts survive mutations
✔ Specs v2.1 vocabulary is isolated under hierarchical Legacy sections
✔ Claude-to-Codex projection rejects Claude-only tool vocabulary
✔ Specs v2.1 task structure and ownership table are canonical
✔ Specs v2.1 V definitions expose the validator grammar and proof roles
✔ Specs v2.1 machine state and semantic receipt vocabulary are canonical
✔ Specs v2.1 canonical authoring source exposes no downgrade receipt
✔ Full runner preserves exact Node failure counts and locations

[skill-test] static semantic checks
✔ hapo:specs hard output contract requires the flat packet
✔ spec-maker emits only the flat planning packet
✔ installer syncs spec-state template and drops init template
✔ installer writes CafeKit version metadata
✔ installer offers Codex as a native split-root runtime
✔ Codex split roots keep generated skill files locally ignored
✔ installer maps Claude gitignore template to dotfile
✔ Claude migration manifest includes gitignore template
✔ Claude gitignore template ignores generated session state
✔ installer root gitignore ignores runtime folders
✔ hapo:specs and spec-maker never auto-dispatch Develop
✔ hapo:specs frontmatter exposes only feature-description input
✔ spec-maker emits a flat packet and stops at handoff
✔ hapo:question skill answers questions with repo-first evidence
✔ hapo:question template captures answer evidence and gaps
✔ hapo:question is packaged in migration manifest
✔ hapo:specs review requires evidence, fresh context, and bounded findings
✔ hapo:specs review gives C2 ownership to the user and sweeps every edit
✔ hapo:specs requirements template has no SDD phase marker
✔ hapo:specs flow is gated C1-C3 and process-first
✔ parallel-waves reference keeps single-writer, fallback, cap, and cherry-pick recipe
✔ develop SKILL wires --parallel to parallel-waves and keeps sequential default
✔ implementer is single-track within its workspace with spec-state prohibition
✔ orchestrator sanctions worktree parallelism with single-writer rule and cap
✔ parallel waves isolate worktrees and retain blocked recovery state
✔ runtime template documents develop.parallel escape hatch
✔ hapo:specs templates trace acceptance criteria to flat tasks and proof
✔ hapo:specs plan template carries the queue-ready contract marker on line two
✔ hapo:specs templates carry EARS, Example Mapping, and edge-case saturation
✔ hapo:specs keeps human decisions at exactly the three named gates
✔ legacy kernel task template keeps the Specs v2.1 plan contract
✔ spec validator enforces Specs v2.1 task-plan sections
✔ spec validator blocks complex ready state before validation
✔ hapo:specs inline receipt is executable and provenance-bound
✔ spec-maker separates planning from implementation and proof
✔ hapo:develop scouts reachability and enforces task scope
✔ hapo:develop supports explicit flash mode
✔ hapo:develop makes implementation notes opt-in
✔ hapo:develop implementation notes template is self-contained and block-based
✔ hapo:develop quality gate separates proof, review, and closeout owners
✔ hapo:develop quality gate has flash bypass semantics
✔ process-first Develop and Sync keep proof ownership explicit with isolated Legacy vocabulary
✔ inspect uses only internal Explore discovery
✔ quality gate uses shared verdicts instead of numeric scores
✔ inspect runtime config has no legacy Gemini model key
✔ hotfix review cycle consumes severity verdicts
✔ test-runner performs scope and runtime reachability audits
✔ hapo:test supports spec-aware feature testing
✔ hapo:hotfix is deterministic scout-first without mode selection
✔ hapo:hotfix quick path never skips scout or diagnosis
✔ hapo:hotfix enforces no-side-effect gate with user options
✔ hapo:hotfix references are local and not stale debugger paths
✔ hapo:hotfix prevention gate points back to side-effect sweep
✔ hapo:hotfix review cycle uses pause conditions not mode selection
✔ hapo:debug is diagnosis-only and read-only for product code
✔ hapo:debug enforces scout-first before hypotheses
✔ hapo:debug blocks hotfix handoff when root cause is unknown
✔ hapo:debug references installed debugger manuals
✔ hapo:brainstorm uses a structured question framework
✔ hapo:brainstorm question framework covers domains and decision logging
✔ Claude runtime template exposes process-first Specs truth
✔ Codex runtime template exposes process-first Specs truth
✔ Claude wrapper keeps runtime delta without template Language or Addressing
✔ all runtime instruction templates carry local venv guidance
✔ Codex instruction template avoids global Claude skills path
✔ Codex warning describes local hook bypass risk
✔ state cache carries full project, session, and spec identity
✔ shared resolver keeps explicit target and fail-closed ambiguity
✔ rules hooks stay silent when runtime.json is absent
✔ CafeKit skill routing workflow rule maps core flows
✔ CafeKit skill routing domain rule maps installed skills
✔ hapo:docs skill is packaged and supports reconstruct mode
✔ hapo:docs --reconstruct keeps as-is evidence contract
✔ hapo:docs --reconstruct reference defines output and human review gate
✔ hapo:docs --reconstruct templates keep evidence and overview starters
✔ hapo:docs --reconstruct overview template is self-contained
✔ hapo:docs normal docs references keep init update summarize phases
✔ hapo:docs --init reference keeps scout author validate discipline
✔ hapo:docs --update reference reads existing docs before surgical updates
✔ hapo:docs --summarize reference avoids broad codebase scans by default
✔ docs validator accepts configured docs root argument
✔ reconstruct validator is packaged and enforces evidence IDs
✔ reconstruct validator requires overview and bundle registry
✔ CafeKit no longer installs automatic skill router hook
✔ CafeKit runtime config drives shared hook config
✔ CafeKit migration manifest excludes removed skill router files
✔ CafeKit installer cleans obsolete skill router runtime and settings hooks
✔ CafeKit rules hook injects only project-specific reminders
✔ docs sync respects runtime docs path
✔ hapo:specs SKILL stays lean after slim-flow diet
✔ hapo:develop SKILL stays within directional context budget
✔ hapo:specs complete shipped bundle stays at or below 750 lines
✔ process-first Develop and Sync core stays at or below 400 lines
✔ docs-sync.cjs has no shouting banners
✔ workflow routing keeps delegate and ambiguity table
✔ usage hook reads runtime config from hook cwd
✔ statusline colors respect runtime config
✔ templates expose all five EARS forms and measurable wording
✔ templates route ambiguity without guessing outcomes
✔ review contract keeps evidence-backed saturation and runtime-only third round
✔ task template Compact core is per-surface parsed (behavioral)
✔ design template Compact core is per-surface parsed (behavioral)
✔ Specs skill keeps scope and proof boundaries explicit
✔ review keeps user decisions and the bounded paper stop
✔ spec-maker keeps planning separate from dispatch and proof
✔ specs-usage-guide documents the flat packet and canonical inline receipt
✔ specs-usage-guide documents adaptive routing without timing claims
✔ Codex installed projection uses Codex paths (behavioral, temp fixture)
✔ benchmark tuning targets are per-surface explicit (advisory, not waiver)
✔ specs-usage-guide teaches Develop and Sync without leaking v2.1 vocabulary
✔ Specs primary flow is file-first while legacy kernel remains isolated

[skill-test] PASS: 294 focused static tests executed
```
