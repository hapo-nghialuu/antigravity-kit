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
- The `hapo:docs-manager` should proactively scan for stale docs during weekly reviews

## When to Update

The `hapo:docs-manager` agent is responsible for keeping these documents current. Trigger an update whenever:

- A development phase transitions (e.g., "In Progress" → "Complete")
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

## Implementation Plans

### Where Plans Live

Store plans under `./plans` using a timestamped, descriptive directory name.

**Naming convention:** `YYYYMMDD-HHmm-descriptive-kebab-slug`

**Example:** `plans/20251101-1505-user-auth-and-profiles/`

### Directory Layout

```
plans/
└── 20251101-1505-user-auth-and-profiles/
    ├── plan.md                          # High-level overview (≤80 lines)
    ├── research/
    │   └── researcher-*.md              # Background research reports
    ├── reports/
    │   └── *.md                         # Inspector, reviewer, etc. reports
    ├── phase-01-environment-setup.md
    ├── phase-02-data-models.md
    ├── phase-03-api-layer.md
    ├── phase-04-ui-components.md
    └── phase-05-testing.md
```

### Overview File (`plan.md`)

Keep it concise — under 80 lines. It should list:
- Each phase with its current status
- Links to the detailed phase files
- Key dependencies and blockers

### Phase Files (`phase-XX-*.md`)

Comply with the development rules in `./.claude/rules/ai-dev-rules.md`.

Each phase file covers:

**Context & Overview**
- Links to related reports and reference material
- Priority level, current status, and a short description

**Specification**
- Functional and non-functional requirements
- Architecture decisions, component interactions, data flow
- Key research insights and critical considerations

**Execution**
- Files to create, modify, or remove
- Numbered implementation steps with specific instructions
- Checklist for progress tracking

**Validation & Risk**
- Success criteria and how to verify them
- Risk assessment with mitigation strategies
- Security considerations (auth, data protection)
- Follow-up tasks and dependencies on other phases