# Deployment Guide

> Deployment options for CafeKit (antigravity-kit).

---

## CafeKit Framework (This Repository)

CafeKit is a **plugin/framework** that gets copied into other projects. It doesn't need deployment itself.

### Sharing CafeKit with Other Projects

```bash
# Copy .claude folder to another project
cp -r .claude/ /path/to/your-project/.claude/

# Initialize CLAUDE.md for the new project
cd /path/to/your-project
# Run: /init
```

This will:
1. Auto-detect the target project's tech stack
2. Generate a project-specific CLAUDE.md
3. Create docs based on detected features (database, API, testing, etc.)

---

## Demo Website Deployment (cafekit-web)

The demo website (`cafekit-web/`) runs Next.js 16.1.3 and can be deployed to various platforms.

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to demo web
cd cafekit-web

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Manual Build

```bash
cd cafekit-web

# Build
pnpm build

# Start production server
pnpm start
```

Production server runs at `http://localhost:3000`

---

## CI/CD (Not Configured)

This project does not have GitHub Actions or CI/CD configured yet.

### To Add GitHub Actions:

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

---

## Release Process

### Version Bump

```bash
# Update version in package.json
# Current: 2.0.0
npm version patch  # 2.0.1
npm version minor  # 2.1.0
npm version major  # 3.0.0
```

### Changelog

Update `CHANGELOG.md` with changes before release.

---

## See Also

- Setup: `SETUP.md`
- Main docs: `../../README.md`
