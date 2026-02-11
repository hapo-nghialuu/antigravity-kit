# Deployment Guide

## Platform
- **Vercel** (for `cafekit-web`)
- **NPM/Ref** (for CLI tools)

## Quick Deploy
```bash
# Web
cd cafekit-web
vercel deploy

# CLI (Local)
pnpm build
```

## Available Commands
| Command | Purpose |
|---------|---------|
| `build` | Build all packages |
| `dev` | Run development servers in parallel |
| `test` | Run tests |
| `clean` | Clean build artifacts |
