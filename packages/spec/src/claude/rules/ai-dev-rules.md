# Development Rules for AI/Agents

> Core principles: **YAGNI** · **KISS** · **DRY** — apply these consistently across all work.

## Coding Principles

- Prefer clean, readable code over clever optimizations
- Implement real, production-ready code — never mock, simulate, or stub implementations
- Update existing files directly; do not create duplicated "enhanced" or "v2" variants
- Respect the project's established architectural patterns and conventions documented in `./docs`
- After modifying any source file, always run the build or compile step to catch errors early

### Naming & File Organization

- File names use `kebab-case` with descriptive slugs (long names are fine — they help LLM tools like grep identify files without reading contents)
- Target ≤200 lines per source file for optimal context management:
  - Break large files into focused modules
  - Favor composition over deep inheritance
  - Extract reusable utilities and dedicated service classes

## AI Agent Tooling

Activate relevant skills from the catalog before starting work:

| Need | Skill/Tool |
|------|-----------|
| Latest documentation lookup | `hapo:docs-seeker` |
| Image/video/document analysis | `hapo:multimodal` |
| Image/video generation & editing | `hapo:multimodal` + `imagemagick` |
| Step-by-step reasoning & debugging | `hapo:sequential-thinking`, `hapo:debug` |
| GitHub operations | `gh` CLI |
| Database inspection | `psql` CLI |


## Visual Explanations (Diagrams First)

When asked to explain complex logic, unfamiliar code patterns, system architecture, or workflows involving 3+ intersecting components:
- **DO NOT** output dense walls of text.
- **DO** generate clean, inline Markdown `Mermaid.js` diagrams directly in the chat response to map out the data flows.
- **ASCII Art:** Use simple terminal-friendly ASCII block diagrams if Mermaid is considered overkill for basic structures.
- **Priority:** Optimize for speed, cleanliness, and visual clarity above writing verbose prose.

## Quality & Review Process

- Ensure code compiles without syntax errors — this is non-negotiable
- Balance readability and functionality over strict linting enforcement
- Apply structured error handling (`try/catch`) and follow security best practices
- After each implementation cycle, delegate to `hapo:code-auditor` for a review pass
- Adhere to coding standards outlined in `./docs`

## Common Pitfalls

- Do not wrap every function call in try/catch — only at meaningful error boundaries
- Avoid premature abstraction; wait until a pattern repeats 3+ times before extracting
- Do not refactor while implementing a feature — finish first, refactor separately
- Never log sensitive data (tokens, passwords, PII) even during debugging
- Do not over-engineer: if a simple `if/else` works, skip the strategy pattern

## Git Hygiene

- Lint before every commit
- Run the full test suite before pushing — **never skip failing tests** to force a green build
- Scope each commit to its actual code changes
- Write clean conventional commit messages (`feat:`, `fix:`, `refactor:`, etc.) with no AI attribution
- **Never commit secrets** — no `.env` files, API keys, or credentials in the repository