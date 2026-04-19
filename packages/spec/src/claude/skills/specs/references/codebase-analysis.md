# Codebase Analysis

## Purpose

Understand the current codebase before designing solutions — ensure the new spec aligns with existing architecture, patterns, and conventions.

## Skip Conditions

- Already provided with inspector reports → skip, use directly

## 4 Mandatory Files to Read First

| # | File | Content | Importance |
|---|---|---|---|
| 1 | `./docs/development-rules.md` | Development rules, naming conventions, file size management, coding standards | **MANDATORY** |
| 2 | `./docs/codebase-summary.md` | Architecture overview, project structure, component relationships | High |
| 3 | `./docs/code-standards.md` | Coding conventions, language-specific patterns | High |
| 4 | `./docs/design-guidelines.md` | Design system, branding, UI/UX conventions | If exists |

### Validation & Fallback Protocol (MANDATORY)
1. **Trust but Verify:** If `codebase-summary.md` or `code-standards.md` exists, you MUST verify their technical claims by cross-checking `package.json`, `go.mod`, etc. (e.g., if Docs say Redux but package.json only has Zustand → Flag documentation as STALE in your research).
2. **The "Blind Flight" Halt:** If ALL 4 mandatory docs are missing in a non-empty repository:
   - **DO NOT** blindly use `inspector` to scan the whole repo.
   - **HALT** the spec process immediately.
   - Ask the User: *"No codebase documentation found. Exploring blind will drain tokens and produce inaccurate specs. Shall I trigger `docs-keeper` or `/hapo:docs` to generate a baseline `codebase-summary.md` first?"*

## Analysis Activities

### 1. Environment Analysis
- Review development environment setup
- Analyze dotenv files and configuration
- Identify required dependencies
- Understand build and deployment processes

### 2. Core Data Structures (MANDATORY for Enhancements)
Before designing any logic, you must identify and read the existing schemas:
- Tell `inspector` to grep for database schema files (`schema.ts`, `schema.prisma`, entities, migrations).
- Identify Global State setups (Redux stores, Zustand, React Context).
- Output the relational impact: How will the new feature alter existing tables or state structures?

### 2. Pattern Recognition
- Study existing patterns in codebase
- Identify conventions and architectural decisions
- Note consistency in implementation approaches
- Understand error handling patterns

### 4. Integration Planning
- Identify how new features integrate with existing architecture
- Map dependencies between components
- Understand data flow and state management
- Consider backward compatibility

### 5. Blast Radius & Regression Check
Write a "Collateral Damage" section in your `research.md`:
- List EXACTLY which existing files will need to be modified.
- **Test Invalidation:** Identify which existing `.test.ts` or `.spec.ts` files will break because of these modifications.
- Ensure the mitigation for these breaking changes is passed downstream to the Task generation phase.

### 6. Inspector Usage (when needed)
- Use inspector agents for targeted file discovery in large codebases
- Each inspector targets a specific aspect of the task
- Wait for all inspectors to report before analysis
- Save results to `reports/inspect-report.md`

## Best Practices

- Start with documentation before diving into code
- Use inspectors for targeted file discovery
- Document patterns found for consistency
- Note any inconsistencies or technical debt
- Consider impact on existing features
