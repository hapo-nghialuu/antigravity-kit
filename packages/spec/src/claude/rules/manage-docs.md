# Documentation & Planning Standards

## Living Documents

The project maintains these core documents in `./docs`:

| Document | Purpose |
|----------|---------|
| `development-roadmap.md` | Phase tracking, milestones, and progress metrics |
| `project-changelog.md` | Chronological record of features, fixes, and changes |
| `system-architecture.md` | Technical architecture and design decisions |
| `code-standards.md` | Coding conventions and quality expectations |

### Freshness Rule

- Before updating any doc, check its last modified date
- If a doc hasn't been updated in >2 weeks while development is active, flag it for review
- The `hapo:docs-keeper` should proactively scan for stale docs during weekly reviews

## When to Update

The `hapo:docs-keeper` agent is responsible for keeping these documents current. Trigger an update whenever:

- A development phase transitions (e.g., "In Progress" → "Complete")
- A verified task completion changes user-facing behavior, architecture, API contracts, operational flow, or project status enough that docs should be refreshed
- A significant feature ships or a critical bug is resolved
- Security patches are applied or dependencies change
- Project scope or timeline shifts
- Weekly progress reviews are due

### Update Discipline

1. **Read first** — review the current state of roadmap and changelog before editing
2. **Stay consistent** — maintain formatting, version numbering, and cross-references
3. **Verify after** — confirm links work and dates are accurate
4. **Reality check** — documentation must reflect actual implementation status, not aspirations

### Changelog Entry Format

Use [Keep a Changelog](https://keepachangelog.com/) convention:

```markdown
## [version] - YYYY-MM-DD

### Added
- Feature description (#PR-number)

### Fixed
- Bug fix description (#issue-number)

### Changed
- Breaking change or behavior change description
```

---

## Specification & Execution Tracker (Hapo Protocol)

### Where Specs Live
Hapo does not use chaotic plan folders. Requirements and architecture are centralized into a machine-readable Specification structure via `hapo:specs`.

All specifications exist strictly in `./specs/<feature-slug>/`.

### Directory Layout
```text
specs/
└── user-auth/
    ├── spec.json               # System state machine & global status
    ├── design.md               # Architecture, requirements, and data flows
    └── tasks/
        ├── task-R0-01-setup.md  # Actionable granular steps for development
        └── task-R1-01-api.md    # Next requirement-driven task
```

### The State Machine (`spec.json`)
The `spec.json` is the sole source of truth for the Project State. 
When creating or updating a spec, it must accurately reflect the overall progress.

### Architecture Document (`design.md`)
This blueprint covers:
- **Context & Overview:** The "Why" of the feature.
- **Data Flow:** Mandatory Mermaid Data Flow Diagram detailing state transitions, DB interactions, and API payloads.
- **Risk Assessment:** Pre-identified failure points and mitigations.

### Execution Checklists (`tasks/task-R*.md`)
Work is decomposed into requirement-driven markdown task files.
Each task file contains:
- **Prerequisites:** Blockers that must clear before this stage begins. (Task N+1 cannot start without Task N defining its payload).
- **Execution Checklist:** Granular `[ ]` markdown items for agents to toggle `[x]` as they implement code.
- **Success Criteria:** Strict definition of "Done".

Comply with the overarching rules in `./rules/ai-dev-rules.md`.
