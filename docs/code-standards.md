# Code Standards

## Stack

| Component     | Technology                      |
|---------------|---------------------------------|
| Language      | TypeScript 5.7.2                |
| Web Framework | Next.js 16.1.3                  |
| UI Library    | React 19.2.3                    |
| Styling       | Tailwind CSS v4                 |
| Linting       | ESLint 9 (Next.js config)       |
| Package Mgr   | pnpm                            |

## Project Conventions

### Directory Structure

- **`.claude/`** - Claude Code specific configuration
  - `commands/` - Slash command definitions (Markdown format)
  - `skills/` - Skill templates and configurations
  - `ROUTING.md` - Agent routing rules

- **`.agent/`** - Antigravity specific configuration
  - `agents/` - Agent definitions
  - `skills/` - Reusable skill modules
  - `workflows/` - Workflow orchestrations
  - `CONVENTIONS.md` - Platform conventions

- **`cafekit-web/`** - Documentation website
  - `app/` - Next.js App Router
  - `components/` - React components
  - `content/docs/` - MDX documentation files

### Naming Conventions

| Type         | Convention     | Example                   |
|--------------|----------------|---------------------------|
| Directories  | kebab-case     | `spec-driven-development` |
| Files        | kebab-case     | `spec-init.md`            |
| Components   | PascalCase     | `DocContent.tsx`          |
| Variables    | camelCase      | `specStatus`              |
| Constants    | UPPER_SNAKE    | `MAX_RETRY_COUNT`         |
| Functions    | camelCase      | `getSpecStatus()`         |
| Types        | PascalCase     | `SpecConfig`              |

### TypeScript Standards

- **Strict mode:** Enabled
- **Target:** ES2020+
- **Module:** ESNext with NodeNext resolution
- **Type imports:** Use `import type { X }` for type-only imports

```typescript
// Good
import type { SpecConfig } from '@/types/spec';
import { parseConfig } from '@/lib/config';

// Avoid
import { SpecConfig } from '@/types/spec'; // if only used as type
```

### React Components

- Use functional components with hooks
- Prefer server components by default
- Use `'use client'` only when necessary (hooks, browser APIs)

```typescript
// Server component (default)
export function DocPage({ params }: { params: { slug: string } }) {
  return <article>{/* ... */}</article>;
}

// Client component (when needed)
'use client';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark')}>Dark</button>;
}
```

### Styling (Tailwind CSS v4)

- Use Tailwind's utility-first approach
- Leverage CSS variables for theming
- Group related utilities with `@apply` when needed

```tsx
// Good - utility classes
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>

// Good - with tailwind-merge for dynamic classes
import { cn } from '@/lib/utils';

<button className={cn('px-4 py-2', isActive && 'bg-blue-500')}>Click</button>
```

### MDX Content

- Use frontmatter for metadata
- Keep content in `content/docs/{locale}/`
- Use relative links for internal navigation

```mdx
---
title: Getting Started
description: Learn how to install CafeKit
---

# Getting Started

Welcome to CafeKit...
```

## Code Patterns

### Spec-Driven Development Workflow

All specs follow this structure:

```
specs/
└── {spec-name}/
    ├── README.md          # Overview
    ├── requirements.md    # EARS format requirements
    ├── design.md          # Technical design
    └── tasks.md           # Implementation tasks
```

### Error Handling

```typescript
// Use Result type pattern for expected errors
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Example
async function loadSpec(name: string): Promise<Result<Spec>> {
  try {
    const spec = await readFile(`specs/${name}/README.md`);
    return { success: true, data: parseSpec(spec) };
  } catch (error) {
    return { success: false, error: new Error(`Spec not found: ${name}`) };
  }
}
```

### Async/Await Patterns

```typescript
// Prefer async/await over raw promises
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

## Linting Rules

ESLint configuration extends Next.js recommended:

```json
{
  "extends": "next/core-web-vitals"
}
```

### Key Rules

- No unused variables
- Prefer const over let
- No console.log in production (warn)
- Proper React hook dependencies

## Git Conventions

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(spec): add status command`
- `fix(web): resolve MDX rendering issue`
- `docs: update installation guide`

### Branch Naming

- `feature/spec-status-command`
- `fix/mdx-rendering`
- `docs/installation-guide`

## Documentation Standards

### Code Comments

```typescript
/**
 * Initialize a new specification with the given name.
 * Creates directory structure and template files.
 *
 * @param name - The specification name (kebab-case)
 * @param options - Configuration options
 * @returns Path to created spec directory
 * @throws Error if spec already exists
 */
export async function initSpec(
  name: string,
  options: SpecOptions = {}
): Promise<string> {
  // Implementation
}
```

### README Files

Every major directory should have a README.md:

```markdown
# Directory Name

Brief description of what this directory contains.

## Structure

- `file.ts` - Description
- `folder/` - Description

## Usage

Example usage or link to documentation.
```
