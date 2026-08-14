# EARS authoring rules

Use EARS to make behavior testable, not to fill a template.

## Canonical IDs

- Top-level headings: `Requirement N: <outcome>`.
- Acceptance criteria: literal `RN.M` (`R1.1`, `R1.2`, ...).
- Task mappings: numeric `N.M` only.
- Do not emit `REQ-01`, `NFR-1`, alphabetic IDs, or bare numbered criteria.

## Patterns

| Need | Pattern |
|---|---|
| Event | `When <event>, the <system> shall <observable response>.` |
| State | `While <state>, the <system> shall <observable response>.` |
| Negative/error | `If <invalid or failure condition>, the <system> shall <observable response or recovery>.` |
| Optional scope | `Where <feature is enabled>, the <system> shall <observable response>.` |
| Always true | `The <system> shall <observable property>.` |

Combine conditions only when they describe one behavior. Split criteria that
have independent triggers, outcomes, or proof.

## Quality gate

Every criterion must be singular, unambiguous, observable, and testable. Name a
concrete subject and replace words such as “fast”, “safe”, “graceful”, or “some”
with an observable result or threshold. Use `shall` for mandatory behavior.

Add a negative/error criterion when invalid input, missing permission,
unavailable dependency, conflict, timeout, retry, rollback, or partial failure
is relevant. Add a concrete example when values, ordering, boundaries, or
transformation rules would otherwise admit multiple interpretations.

User Story, rationale, scenario narrative, and role framing are optional. Keep
them only when they explain a product decision not already clear from the
outcome and criteria.

Non-functional requirements are not a standard appendix. Add one only for a
feature-specific measurable performance, security, privacy, accessibility,
reliability, or compatibility constraint, continuing the same numeric sequence.
