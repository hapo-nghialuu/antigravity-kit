# Translation Mirror

Optional, reference-only duplicate of a spec in the user's configured language. The English spec is always the canonical source of truth; the mirror exists only for human cross-reading.

## When To Offer

1. Read the configured language from `.claude/settings.json` → `language` (a freeform label written at install time, e.g. `Tiếng Việt`, `日本語`, `Korean`, `English`).
2. If the label resolves to English (`English` / `en`) → **do not** offer a mirror; there is nothing to duplicate.
3. If it is any other language AND the run is interactive (no `--auto`) → ask once via `AskUserQuestion`:
   - "Generate a `<language>` reference copy of this spec? (kept in sync, read-only)" → `Yes` / `No`.
4. `--auto` runs are non-interactive → **skip** the offer (an `--auto` create makes no mirror). If `translation.enabled` is already `true` from an earlier run, always-sync still applies during an `--auto` resume.
5. Persist the choice in `spec.json.translation` (see Fields).

## Language Code

Map the freeform label to a short folder code:

| Label | Code |
|---|---|
| Tiếng Việt | `vi` |
| 日本語 / Japanese | `ja` |
| 한국어 / Korean | `ko` |
| 中文 / Chinese | `zh` |
| Français / French | `fr` |
| (anything else) | kebab-case slug of the label |

## Layout

The mirror lives under the spec, never replacing canonical files:

```
specs/<feature>/
├── spec.json              # canonical state — NOT mirrored
├── requirements.md        # English canonical
├── design.md
├── research.md
├── tasks/task-R*.md
└── i18n/<code>/           # mirror (reference only)
    ├── requirements.md
    ├── design.md
    ├── research.md
    └── tasks/task-R*.md
```

- Mirror **only** the human-readable docs: `requirements.md`, `design.md`, `research.md`, and every `tasks/task-*.md`.
- Do **not** mirror `spec.json` (machine state is language-agnostic and lives only at the root).
- Keep file names and the `tasks/` substructure identical to canonical so they line up 1:1.

## Mirror File Marker

Every generated mirror file MUST begin with this HTML comment so no one mistakes it for a source:

```
<!-- TRANSLATION MIRROR — generated from English canonical. Reference only. Do not edit; regenerated on sync. -->
```

EARS trigger keywords and fixed phrases stay in English even inside the mirror (`When`, `If`, `While`, `Where`, `The system shall`); only the variable parts are translated — same rule as `rules/ears-format.md`.

## Always-Sync

`spec.json.translation.sync` is `always`:

- Whenever a canonical doc is written or updated (Step 5 requirements/research, Step 6 design, Step 7 tasks, or any later edit), regenerate the matching mirror file from the new canonical content.
- After regenerating, set `spec.json.translation.last_synced_at` to the current time.
- If a canonical task file is added/removed, add/remove the matching mirror file so the two trees stay 1:1.

## Not A Source Of Truth

- The deterministic validator (`validate-spec-output.cjs`) runs on **canonical only**. The `i18n/` tree is never validated and never blocks `ready_for_implementation`.
- `task_files` and `task_registry` reference canonical paths only.
- `hapo:develop` implements from canonical English; it must ignore `i18n/`.
- If the mirror and canonical ever disagree, canonical wins; re-sync the mirror.

## Fields (`spec.json.translation`)

| Field | Meaning |
|---|---|
| `enabled` | `true` once the user opts in |
| `language` | freeform label from settings (e.g. `Tiếng Việt`) |
| `language_code` | folder code (e.g. `vi`) |
| `dir` | relative mirror dir (e.g. `i18n/vi`) |
| `sync` | `always` |
| `last_synced_at` | ISO 8601 timestamp of the last regeneration |
