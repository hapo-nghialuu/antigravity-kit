# Design Discovery

## Goal

Pick the lightest discovery mode that still supports a solid design.

## Modes

### Minimal
Use for:
- small UI changes
- basic CRUD
- at most 2 clear integration points

### Light
Use for:
- extensions to existing features
- moderate integration work
- pattern matching against current codebase

### Full
Use only when there is a concrete trigger:
- external service integration
- auth or security boundaries
- schema or storage boundaries
- explicit performance constraints
- explicit user request for deep research

## Default

If uncertain, choose **light**.

## Discovery outputs

Capture only what affects the design:
- existing patterns to follow
- constraints from steering or docs
- interfaces and boundaries
- integration risks
- deferred out-of-scope findings

## Guardrails

- Design only for in-scope requirement IDs.
- Do not open new domains without approval.
- Keep `research.md` short and decision-focused.
