# Task Sizing

## Goal

Produce tasks small enough for incremental delivery and review.

## Good task size

Target sub-tasks that fit one focused implementation pass.

## Rules

- Every task maps to valid numeric requirement IDs.
- Keep only two levels: major tasks and sub-tasks.
- Prefer capability-based task names, not file-dump checklists.
- Remove tasks that only serve out-of-scope work.

## Good examples

- Add theme state provider
- Persist theme selection
- Update navigation to expose toggle
- Add tests for preference persistence

## Bad examples

- Build entire auth system
- Refactor everything first
- Add optional analytics that was never approved

## Ordering

1. foundations
2. feature behavior
3. integration points
4. tests and cleanup
