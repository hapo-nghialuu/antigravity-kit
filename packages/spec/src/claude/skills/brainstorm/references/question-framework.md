# Brainstorm Question Framework

Use this reference to decide **what to ask**, **what not to ask**, and **how to record decisions** during `hapo:brainstorm`.

The goal is not to ask many questions. The goal is to ask the smallest set of questions that can materially change the design.

## Source Hierarchy

Generate questions from this hierarchy, in order:

1. **Scout evidence** — repo type, framework, existing modules, docs, specs, plans, runtime config, and constraints.
2. **User intent** — nouns, verbs, success language, target users, examples, and implied deliverables in the prompt.
3. **Exact requirement gaps** — expected output, acceptance criteria, scope boundary, non-negotiable constraints, touchpoints.
4. **Domain matrix** — only domains that actually apply to the request.
5. **Risk matrix** — security, privacy, cost, runtime limits, provider failure, migration, compliance, maintainability.

Never ask a question that the repository, docs, or trusted technical research can answer directly.

## Ask / Do Not Ask

Ask the user when the answer changes:

- product scope or MVP boundaries
- target user workflow or UX surface
- expected output artifact or delivery format
- acceptance criteria
- business priority, timeline, or rollout
- cost, privacy, API-key ownership, external provider choice
- irreversible workspace action such as renaming/moving/deleting
- whether to accept a trade-off after you explain it

Do **not** ask the user when the answer is a technical fact you should verify:

- browser or runtime limits
- package/API compatibility
- dependency maintenance state
- security best practice
- exact syntax for framework config
- existing code location, schema, endpoint, or convention

If a topic mixes user preference and technical fact, verify the technical facts first, then ask the preference question with those facts included.

## Prioritization

Before asking, score each candidate question:

| Signal | Score |
|---|---:|
| Could change architecture, data model, or platform | +3 |
| Could change MVP scope or exclude a feature | +3 |
| Could affect cost, privacy, security, or compliance | +3 |
| Defines observable acceptance criteria | +2 |
| Defines UX flow or primary user surface | +2 |
| Can be answered from repo/docs/research | -4 |
| Merely names an implementation detail with a safe default | -2 |

Ask only the highest-impact question. If several are tied and independent, ask at most 3 in one `AskUserQuestion` batch; otherwise ask one at a time.

## Required Decision Surfaces

Every brainstorm must eventually resolve these surfaces:

| Surface | Question Intent |
|---|---|
| Outcome | What does the user expect to exist or happen after the work? |
| Done | How will the user verify it works? |
| Scope | What is explicitly not included now? |
| Constraints | What cannot change: stack, platform, naming, runtime, compatibility, deadline? |
| Touchpoints | Which existing files/modules/contracts will this affect? |

If any surface is missing, ask a grounded question before proposing architecture.

## Domain Matrix

Use only the domains that match the request.

### Product / UX

Ask when the prompt includes UI, workflow, dashboard, extension, app, or user-facing behavior.

- Primary user: who uses this first?
- Primary flow: what is the shortest successful path?
- Surface: page, overlay, sidebar, modal, command, background task?
- State: loading, empty, error, partial result, retry?
- Accessibility or localization expectations?

### Browser Extension

Ask when the work involves Chrome, Edge, Firefox, YouTube, DOM injection, content scripts, popup, options page, or browser APIs.

- Target browser/runtime and manifest version?
- UI surface: content overlay, sidebar, popup, options page, or all?
- Permissions posture: minimal host permissions or broader convenience?
- Storage: browser storage, IndexedDB, sync storage, or no persistence?
- Publishing target: dev-only, Chrome Web Store, enterprise install?

Verify instead of asking:

- Manifest V3 service worker lifetime.
- Browser-reserved shortcut conflicts.
- Content script isolated-world vs main-world behavior.
- Current Chrome API compatibility.

### AI / LLM

Ask when the work involves translation, summarization, agents, prompt output, generation, or provider choice.

- Provider ownership: user API key, app-owned key, proxy, or local model?
- Provider shape: fixed provider, multi-provider, or custom base URL?
- Output contract: prose, JSON, markdown, SRT, code, patch?
- Failure behavior: retry, fallback, partial result, ask user, or stop?
- Cache policy: never, per session, persistent, or shared?
- Privacy boundary: what content may leave the browser/server?

Verify instead of asking:

- Whether a provider is Anthropic-compatible vs OpenAI-compatible.
- Whether a provider supports tool use / JSON schema / streaming.
- Current API endpoint paths and auth header format.

### Data / Transcript / Documents

Ask when the work transforms documents, captions, data, logs, OCR, audio, video, or legacy code into another artifact.

- Source priority and fallback order?
- Output format and fidelity level?
- Confidence / evidence tracking requirement?
- Missing/unknown handling?
- Export/import requirements?

### Backend / API / Database

Ask when the work includes server endpoints, persistence, auth, jobs, integrations, or migrations.

- API contract: endpoint, method, request/response shape?
- Persistence: new table, existing table, no DB?
- Auth/permission model?
- Idempotency, retries, and background job behavior?
- Migration and rollback constraints?

### Docs / Legacy Reconstruction

Ask when the work is documentation, legacy analysis, or requirement reconstruction.

- Scope path/module to reconstruct?
- Output docs required: overview, requirements, architecture, evidence map, unknowns?
- Evidence level: observed-only or inferred allowed with confidence?
- Review gate: who approves the reconstructed docs?
- Change request follows reconstruction or is separate?

### Release / Packaging

Ask when the work includes publish, store listing, npm release, versioning, or deployment.

- Target release channel?
- Version bump type?
- Required checks before publish?
- Store/listing metadata ownership?
- Rollback or deprecation plan?

## Question Format

Use `AskUserQuestion` when available.

- Use 2-4 concrete options.
- Put the recommended option first and label it `(Recommended)`.
- Include a one-sentence impact description per option.
- Do not add an explicit "Other" option; the tool supplies it.
- Avoid abstract labels like "Option A" unless paired with concrete meaning.

Good:

> "Where should transcript fallback live?"
> - "Defer STT for MVP (Recommended)" — Ships faster; no fragile audio extraction now.
> - "Browser-only STT" — No backend, but fragile and heavy.
> - "Companion backend" — More robust, but requires hosting and ops.

Bad:

> "What architecture do you want?"

## Explain Before Asking

When the user cannot reasonably know the answer, first explain the trade-off briefly, then ask.

Use this pattern:

1. State why the decision matters.
2. Give 2-3 viable options with consequences.
3. Recommend one.
4. Ask the user to confirm or override.

Do not force a choice before explaining hidden technical risk.

## Decision Register

Every final brainstorm report must include a decision register.

```markdown
## Decision Register

| ID | Question | Options Presented | User Decision | Rationale | Impact |
|---|---|---|---|---|---|
| D-001 | Where does transcript fallback live? | Defer STT / Browser-only / Backend | Defer STT | Ships MVP safely | Phase 7 becomes graceful fallback |
```

Rules:

- Record only decisions actually made by the user or explicitly accepted in chat.
- Do not write "user selected" unless `AskUserQuestion` or direct user text confirms it.
- If you infer a default, label it as `Assumption`, not `User Decision`.
- Carry unresolved decisions into `Open Questions`.

## Maximum Question Budget

Default budget:

- Small change: 1-2 questions.
- Medium feature: 3-6 questions.
- Large/greenfield/architecture-heavy: 6-10 questions across multiple rounds.

Stop asking when the next question would only refine an implementation detail with a safe default. Propose the design and list remaining assumptions instead.

## Final Self-Check

Before presenting design:

- Did each asked question map to one of the required decision surfaces or domain risks?
- Did any question ask the user to answer a technical fact that should have been researched?
- Are all user decisions captured in the decision register?
- Are assumptions clearly separated from user decisions?
- Are open questions truly blocking, or can they be deferred?
