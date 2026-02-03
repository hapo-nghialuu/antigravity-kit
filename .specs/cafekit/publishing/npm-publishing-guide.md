# CafeKit NPM Publishing Guide

## Overview

This guide documents how to publish `@haposoft/cafekit-spec` to GitHub Packages for Haposoft team use.

## Prerequisites

### 1. GitHub Personal Access Token (PAT)

**Create Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "CafeKit NPM Publish"
4. Expiration: 90 days (recommended)
5. Scopes:
   - ✅ `write:packages` (required for publishing)
   - ✅ `read:packages` (required for installing)
   - ✅ `delete:packages` (optional, for unpublishing)
6. Generate token and copy it (you'll only see it once)

**Store Token Securely:**
```bash
# Add to ~/.npmrc (NOT project .npmrc)
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc

# Or set as environment variable
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

### 2. Verify Package Ownership

Ensure you have write access to the `haposoft/cafekit` repository on GitHub.

## Publishing Process

### Step 1: Pre-publish Checks

```bash
cd /Users/luutrungnghia/projects/antigravity-kit/packages/spec

# 1. Verify version
cat package.json | grep '"version"'
# Current: "0.1.0"

# 2. Verify files field
cat package.json | grep -A 5 '"files"'
# Should include: bin, src, README.md

# 3. Test CLI locally
node bin/install.js
# Should show "CafeKit Spec Installer"

# 4. Check for uncommitted changes
git status
# Should be clean (commit any changes first)
```

### Step 2: Dry Run (Test Publish)

```bash
# Simulate publish without actually uploading
npm publish --dry-run

# Expected output:
# - List of files to be published
# - Package tarball size
# - No errors
```

### Step 3: Publish to GitHub Packages

```bash
# Publish package
npm publish

# Expected output:
# + @haposoft/cafekit-spec@0.1.0
# Published to GitHub Packages
```

### Step 4: Verify Publication

```bash
# Search for package
npm search @haposoft/cafekit-spec --registry=https://npm.pkg.github.com

# View package info
npm view @haposoft/cafekit-spec --registry=https://npm.pkg.github.com

# Expected output:
# - Name: @haposoft/cafekit-spec
# - Version: 0.1.0
# - Description: Spec-Driven Development workflow...
```

### Step 5: Test Installation

```bash
# Create test project
mkdir -p /tmp/test-cafekit-install
cd /tmp/test-cafekit-install
npm init -y

# Install from registry
npx @haposoft/cafekit-spec

# Should download from GitHub Packages and run installer
```

## Team Installation Instructions

### One-Time Setup (For Haposoft Team Members)

**1. Create GitHub Personal Access Token:**
- Go to: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Name: "CafeKit Install"
- Scopes: `read:packages` (minimum)
- Generate and copy token

**2. Configure npm Authentication:**

Add to `~/.npmrc` (global, not project-specific):
```
@haposoft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**3. Test Installation:**
```bash
cd your-project
npx @haposoft/cafekit-spec
```

Done! The spec workflow files will be copied to your project.

## Troubleshooting

### Error: 401 Unauthorized

**Cause:** Missing or invalid GitHub token

**Fix:**
```bash
# Verify token in ~/.npmrc
cat ~/.npmrc | grep npm.pkg.github.com

# If missing, add it:
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

### Error: 404 Not Found

**Cause:** Package not published yet or wrong registry

**Fix:**
```bash
# Check package exists
npm view @haposoft/cafekit-spec --registry=https://npm.pkg.github.com

# If not found, publish first (see above)
```

### Error: 403 Forbidden

**Cause:** GitHub token lacks write:packages scope

**Fix:**
- Regenerate token with correct scopes
- Update ~/.npmrc with new token

### Error: Package already exists

**Cause:** Version 0.1.0 already published

**Fix:**
```bash
# Bump version
cd packages/spec
npm version patch  # 0.1.0 → 0.1.1
# or
npm version minor  # 0.1.0 → 0.2.0

# Then republish
npm publish
```

### Error: EPRIVATE

**Cause:** Package has `"private": true` in package.json

**Fix:**
```bash
# Remove private field (only if ready to publish)
# Edit packages/spec/package.json and remove the line:
# "private": true,

# Or set to false:
# "private": false,
```

## Version Management

### Semantic Versioning (SemVer)

CafeKit follows semantic versioning: `MAJOR.MINOR.PATCH`

**PATCH (0.1.x):** Bug fixes, docs updates
```bash
npm version patch
# 0.1.0 → 0.1.1
```

**MINOR (0.x.0):** New features, backward compatible
```bash
npm version minor
# 0.1.1 → 0.2.0
```

**MAJOR (x.0.0):** Breaking changes
```bash
npm version major
# 0.2.0 → 1.0.0
```

### Release Checklist

Before bumping version:
- [ ] All tests passing (Task #6)
- [ ] Documentation updated (Task #7)
- [ ] CHANGELOG.md updated
- [ ] Git changes committed
- [ ] No uncommitted files

## Unpublishing (Emergency Only)

```bash
# Unpublish specific version (within 72 hours)
npm unpublish @haposoft/cafekit-spec@0.1.0 --registry=https://npm.pkg.github.com

# Deprecate version (after 72 hours)
npm deprecate @haposoft/cafekit-spec@0.1.0 "Use version 0.2.0 instead"
```

**Warning:** Unpublishing should be rare. Use deprecation for old versions.

## Publishing from CI/CD (Future Enhancement)

### GitHub Actions Example

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          registry-url: 'https://npm.pkg.github.com'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

Save to `.github/workflows/publish.yml` when ready for automation.

## Registry URLs

- **GitHub Packages:** https://npm.pkg.github.com
- **Package Page:** https://github.com/haposoft/cafekit/packages
- **Repository:** https://github.com/haposoft/cafekit

## Support

**Questions:** #cafekit-support (Slack)
**Issues:** https://github.com/haposoft/cafekit/issues
**Maintainer:** nghialt@haposoft.com

---

**Last Updated:** 2026-02-02
**Version:** 0.1.0
**Package:** @haposoft/cafekit-spec
