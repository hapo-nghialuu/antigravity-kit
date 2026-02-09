# Project Documentation

> Project-specific references for Claude Code. These files are loaded on-demand.

## Available Docs

| File | Purpose | When to Load |
|------|---------|--------------|
| `SETUP.md` | Installation, dependencies, environment | User asks "how to run", "setup", "install" |
| `DEPLOY.md` | Deployment procedures, environments | User asks "deploy", "production", "release" |
| `ARCHITECTURE.md` | System design, components, data flow | User asks about "architecture", "how it works" |
| `API.md` | API endpoints, request/response formats | User asks about "API", "endpoints", "routes" |
| `DATABASE.md` | Schema, models, migrations | User asks about "database", "schema", "models" |
| `TESTING.md` | Test commands, coverage, strategies | User asks about "test", "coverage" |
| `TROUBLESHOOTING.md` | Common issues, solutions | User encounters errors or issues |

## How Claude Uses These Docs

1. **User asks a question** about setup, deploy, etc.
2. **Claude reads CLAUDE.md** for overview
3. **Claude loads relevant doc** from this folder on-demand
4. **Claude applies knowledge** from the loaded doc

## Template for Each Doc

```markdown
# [Topic]

## Quick Reference
[Most common commands/info at the top]

## Detailed Guide
[Step-by-step instructions]

## Troubleshooting
[Common issues and fixes]

## See Also
[Links to related docs]
```

## Creating New Docs

When adding project-specific documentation:

1. Create `[TOPIC].md` in this folder
2. Add entry to the table above
3. Reference in `CLAUDE.md` if frequently needed
