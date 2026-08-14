# CafeKit

> Native spec-driven workflows for Claude Code, Codex CLI, and OpenCode.

## Quick Install

```bash
npx @haposoft/cafekit
```

Install Codex explicitly:

```bash
npx @haposoft/cafekit --platform codex
```

The installer records the package version in the selected runtime:
`.claude/cafekit.json`, `.codex/cafekit.json`, or `.opencode/cafekit.json`.

## What It Is

CafeKit installs a native runtime bundle for each supported coding agent:
- `hapo:question` for evidence-backed questions about source code, docs, specs, config, dependencies, or external technical knowledge
- `hapo:brainstorm` for scout-first ideation before a spec is ready
- `hapo:specs` for structured specification work
- `hapo:develop` for implementation after technical spec readiness and an explicit invocation
- `hapo:debug` and `hapo:hotfix` for evidence-first diagnosis and safe bug fixes
- `hapo:docs` for project documentation and source-backed as-is reconstruction
- `hapo:test` and `hapo:code-review` for verification
- supporting hooks, agents, rules, and platform-native runtime integration

CafeKit uses rule-based skill routing guidance and an installed skill catalog.
Agents choose the right `hapo:*` skill from workflow/domain rules instead of
using an automatic prompt-scoring hook.

Core flow (shown with Claude Code syntax):

```text
Question -> /hapo:question -> Idea -> /hapo:brainstorm (if design choices remain) -> /hapo:specs -> /hapo:develop -> /hapo:test -> /hapo:code-review
```

## Quick Start

Claude Code:

```bash
/hapo:question "Which config file controls CafeKit runtime behavior in this project?"
/hapo:brainstorm Explore approaches for a meeting transcript extension
/hapo:specs Build a meeting transcript extension with AI summaries
/hapo:develop meet-transcript-mvp
/hapo:test --full
/hapo:code-review --pending
```

Codex CLI uses native skills from `.agents/skills/`:

```text
$hapo-question "Which config controls CafeKit runtime behavior?" --repo
$hapo-brainstorm Explore approaches for a meeting transcript extension
$hapo-specs Build a meeting transcript extension with AI summaries
$hapo-develop meet-transcript-mvp
$hapo-test --full
$hapo-code-review --pending
```

Use `/skills` to browse installed skills. Trust the repository, then review
project hooks with `/hooks` before enabling them.

For existing or legacy systems without reliable documentation:

```bash
/hapo:docs --reconstruct apps/legacy-admin
/hapo:specs Modernize the approved as-is docs with CSV export and split admin/operator permissions
```

The reconstruct run writes an evidence-backed as-is docs bundle plus a self-contained HTML overview for human review before specs begin.

Specs are stored under:

```text
specs/<feature-name>/
├── spec.json
├── requirements.md
├── design.md
├── research.md          # optional: explicit uncertainty/grounding record
└── tasks/task-R*.md     # optional: real ownership/dependency/proof boundaries
```

### Specs semantic kernel v2.1

The North Star is simple: a new implementer should not have to guess a product
or architecture decision. `spec.json` is machine authority; requirements,
design, optional research, and task Markdown are human projections. Host state
tracks authority/integrity only and never supplies product semantics.

Kernel v2.1 separates two independent choices:

- `planning_depth`: `None`, `Compact`, or `Full` controls durable authoring.
- `assurance_level`: `Routine`, `Elevated`, or `Strict` controls review depth.

Canonical authoring supplies only `planning_depth`, `assurance_level`, their
`classified_minimum`, and normalized `risks`; policy `version` identifies v2.1.
`Direct`, `Standard`, and `Critical` are derived compatibility views. `None`
creates no durable spec. `Compact` and `Full` start from
the same three-file core (`spec.json`, `requirements.md`, `design.md`), then add
research, tasks, or lightweight phase groups only when the actual uncertainty
or task graph warrants them. Phase groups live in `spec.json`; Specs v2 does not
create phase files.

Classification may be corrected before first persistence. Once persisted, the
same-feature baseline is monotonic: no downgrade is supported until a trusted
issuer exists. That baseline never spreads ceremony to another feature and is
independent from the project minimum.

Requirements and design are adaptive rather than heading-driven. A v2.1 task
has exactly seven sections: `Outcome`, `Scope`, `Anchors and Ownership`,
`Changes`, `Acceptance`, `Dependencies`, and `Verification Plan`. Its only
ownership table is `ID | Type | Target | Role | Access | Action`.
`coordination.boundaries` entries typed as ownership, dependency, transition,
proof, or parallel are topology authority; prose markers are not. Task execution
receipts and the final `feature-receipt.md` belong to execution closeout, not
spec authoring. Structural validation, factual grounding, and whole-spec
semantic/counterexample review are complementary gates. A tool exit code alone
does not prove semantic correctness.

`design.md` has one `Verification Definitions` section. Its single grammar is
`- **Vn**: Criteria RN.M; Owner ...; [Proof criteria ...; Proof owner ...;
Evidence anchor ...;] Decision refs D/I/C; Method ...; Expected ...;
Negative/failure ...; Reachability/grounding ...`. The bracketed proof extension
is present only for a typed proof boundary; ordinary verification needs one real
product criterion and proportional same-boundary verification.

Authoring states are `draft`, `validated`, or `absent`; they are not user
approvals. After final authoring bytes settle, the validator's read-only
`--semantic-digest` mode binds the reviewed requirements, design, optional
research/tasks, and canonical topology into `validation.semantic_review`.
Readiness requires exact `RN.M` coverage plus counterexamples containing
`criterion`, `case_kind`, `scenario`, `expected`, `decision_refs`, and
`verification_ref`. `Strict` additionally requires a host-hook-observed event
from an allowlisted reviewer capability. This is an honest-agent integrity
guardrail, not host-attested evidence or a security boundary. Routine and
Elevated add no reviewer ceremony. Validator success never substitutes for
semantic judgment. Grounding is mandatory before readiness and is recomputed
deterministically; it adds no receipt ceremony.
The compact receipt adds no report file and becomes stale when reviewed content
changes. `--auto` may complete technical authoring readiness when every gate
passes, then stops; implementation always starts with a new explicit Develop
invocation.

Authors ground repository facts, record bounded reversible assumptions, and ask
the user about product/scope/security/data/irreversible choices. Only unresolved
`user_owned` decisions block readiness. The supported atomic promotion command is:

```bash
node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>
```

`review.json` contains exactly `reviewed_criteria` and `counterexamples`.
Authors never assign `semantic_model`, `validation.semantic_review`, or
`ready_for_implementation` directly.

Claude Code and Codex CLI are the primary Specs v2 acceptance targets. OpenCode
remains a supported CafeKit runtime; this v2 acceptance focus does not remove or
broaden that support claim.

## Platform Status

- Claude Code: native supported runtime
- Codex CLI: native project-local runtime with `.agents/skills`, `.codex/agents`, project hooks, rules, and a managed `AGENTS.md` block
- OpenCode: supported project-local runtime install with prefix-free `.opencode/commands`, `.opencode/agents`, `AGENTS.md`, `opencode.json`, and Claude-compatible skills
- Cursor: coming soon

## Documentation

- Installation: https://cafekit.haposoft.com/docs/getting-started/installation
- Quickstart: https://cafekit.haposoft.com/docs/getting-started/quickstart
- Spec workflow: https://cafekit.haposoft.com/docs/workflows/specs

## License

MIT © Haposoft
