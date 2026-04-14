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

> If a file doesn't exist → skip it silently. If all are missing → use an inspector to explore the codebase directly.

## Analysis Activities

### 1. Environment Analysis
- Review development environment setup
- Analyze dotenv files and configuration
- Identify required dependencies
- Understand build and deployment processes

### 2. Pattern Recognition
- Study existing patterns in codebase
- Identify conventions and architectural decisions
- Note consistency in implementation approaches
- Understand error handling patterns

### 3. Integration Planning
- Identify how new features integrate with existing architecture
- Map dependencies between components
- Understand data flow and state management
- Consider backward compatibility

### 4. Inspector Usage (when needed)
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
