# Implementation Plan - Add Cursor AI Configuration

## Goal Description
Configure Cursor AI (Editor) for the `hapo-cafekit` project. The goal is to make Cursor behave similarly to the "Antigravity" agent by teaching it the project's rules, strict tech stack constraints, and providing it with specialized "skills" for frontend, backend, and clean code practices.

## User Review Required
> [!IMPORTANT]
> - **Antigravity Parity**: We will define strict rules in `.cursorrules` derived from `GEMINI.md`.
> - **Skills Transfer**: We will expose the following Antigravity skills to Cursor via `.cursor/skills/`:
>   - `clean-code` (Mandatory)
>   - `frontend-design` (UI/UX)
>   - `nextjs-react-expert` (Framework specific)
>   - `tailwind-patterns` (Styling)
>   - `api-patterns` (Backend)

## Proposed Changes

### 1. Configuration Files

#### [NEW] [.cursorrules](file:///Users/haposoft/Desktop/project/hapo-cafekit/.cursorrules)
The "Constitution" for Cursor.
- **Role & Persona**: Expert Full-Stack Engineer, strictly following Antigravity protocols.
- **Tech Stack Enforced**: Next.js 16, React 19, Tailwind v4, pnpm.
- **Core Rules**:
    - **Clean Code**: Concise, no over-engineering, DRY.
    - **Thinking Process**: "Read -> Understand -> Apply".
    - **No Artifacts**: Do not generate "Implementation Plan" markdown unless asked.
- **Skill References**: "If asked about UI, consult `.cursor/skills/frontend-design.md`".

#### [NEW] [.cursorignore](file:///Users/haposoft/Desktop/project/hapo-cafekit/.cursorignore)
To optimize context window:
- `node_modules/`, `.git/`, `dist/`, `.next/`
- `repomix-output.xml` (Too large)
- `pnpm-lock.yaml` (Noise)

### 2. Skill Integration
We will creating a `.cursor/skills` directory and copy/symlink the following **SKILL.md** files (renamed for clarity):

- `.agent/skills/clean-code/SKILL.md` -> `.cursor/skills/clean-code.md`
- `.agent/skills/frontend-design/SKILL.md` -> `.cursor/skills/frontend-design.md`
- `.agent/skills/nextjs-react-expert/SKILL.md` -> `.cursor/skills/nextjs-react.md`
- `.agent/skills/tailwind-patterns/SKILL.md` -> `.cursor/skills/tailwind.md`

## Verification Plan

### Manual Verification
1. **Rule Enforcement**: Ask Cursor "What are the clean code rules?". It should quote the `clean-code.md` content or the summary in `.cursorrules`.
2. **Tech Stack**: Ask "Create a button". It should use Tailwind v4 and React 19 hooks.
3. **Ignore Check**: Search for files in Cursor (Cmd+P) and ensure `node_modules` files don't appear.
