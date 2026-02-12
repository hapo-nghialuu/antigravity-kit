---
description: Update existing documentation to match current codebase. Use when code has changed and docs are out of sync, or after adding new features.
---

# /docs-update - Update Project Documentation

## Overview

This workflow updates all documentation to reflect the current state of the codebase:
- Re-analyzes project structure
- Updates all 7 documentation files
- Syncs AGENTS.md with latest changes
- Creates backup before updating

## ⚠️ IMPORTANT: Execute Immediately

**DO NOT create an implementation plan.** This workflow should be executed directly without planning mode.
- Run all steps sequentially
- Update files immediately as described
- No approval needed between steps

---

## Step 1: Verify Prerequisites

**Check if docs/ exists:**
```bash
ls docs/ 2>/dev/null || echo "ERROR: Run '/docs-init' first"
```

**If docs/ not found:**
- Stop and prompt: "❌ docs/ not found. Run `/docs-init` first to create documentation."

---

## Step 2: Create Backup

// turbo
```bash
cp -r docs docs.backup.$(date +%Y%m%d_%H%M%S)
echo "Backup created: docs.backup.{timestamp}"
```

---

## Step 3: Ensure Repomix Available

**Check if repomix is installed:**
```bash
which repomix 2>/dev/null || npm list -g repomix 2>/dev/null
```

**If repomix not found:**
- Detect package manager:
  ```bash
  test -f pnpm-lock.yaml && PM="pnpm"
  test -f yarn.lock && PM="yarn"
  test -f bun.lockb && PM="bun"
  PM="${PM:-npm}"
  ```

// turbo
- Run `$PM install -g repomix`

---

## Step 4: Re-analyze Codebase

// turbo
```bash
repomix
ls -la ./repomix-output.xml
```

**Detect recent changes:**
```bash
git diff --stat HEAD~5..HEAD 2>/dev/null || echo "No git history"
```

---

## Step 5: Read Current Documentation

Read all existing docs to understand what needs updating:
- `docs/codebase-summary.md`
- `docs/project-overview-pdr.md`
- `docs/code-standards.md`
- `docs/system-architecture.md`
- `docs/design-guidelines.md`
- `docs/deployment-guide.md`
- `docs/project-roadmap.md`
- `.agent/rules/AGENTS.md` (if exists)

---

## Step 6: Detect Updated Project Info

**Re-read config files:**
- `package.json` - check for new scripts, dependencies, version changes
- `pyproject.toml`, `go.mod`, etc. - based on project type
- Check for new directories or removed ones

**Detect changes:**
- New frameworks/libraries added
- Version updates
- New scripts
- Structure changes
- New deployment configs
- New database schemas

---

## Step 7: Update Documentation Files

### 7.1 Update docs/codebase-summary.md

**Refresh:**
- File count and token count from repomix
- Tech stack versions (from package.json)
- Directory structure if changed
- Timestamp

### 7.2 Update docs/project-overview-pdr.md

**Add:**
- New features detected in codebase
- Updated description if changed
- Any new capabilities

### 7.3 Update docs/code-standards.md

**Sync:**
- New patterns detected in code
- Updated conventions
- New linting rules if config changed

### 7.4 Update docs/system-architecture.md

**Update:**
- New components or services
- Changed data flows
- New API endpoints
- Database schema changes

### 7.5 Update docs/design-guidelines.md

**Refresh:**
- New UI components
- Updated styling patterns
- Theme changes

### 7.6 Update docs/deployment-guide.md

**Update:**
- New environment variables
- Changed deployment commands
- Platform updates

### 7.7 Update docs/project-roadmap.md

**Progress tracking:**
- Mark completed items
- Add new tasks based on TODOs found
- Update technical debt section

---

## Step 8: Update .agent/rules/AGENTS.md

**Check if .agent/rules/AGENTS.md exists:**
```bash
test -f .agent/rules/AGENTS.md && cat .agent/rules/AGENTS.md || echo "NOT_FOUND"
```

**If exists - Update sections:**
- **Tech Stack** - Update versions, add new dependencies
- **Key Directories** - Add new directories
- **Quick Commands** - Sync with package.json scripts
- **Last Updated** - Refresh timestamp

**If not exists - Create new:**
- Use same template as in `/docs-init`
- Or skip if user không muốn tạo

**Note:** `.agent/rules/AGENTS.md` với `activation: always_on` sẽ luôn active trong Antigravity.

---

## Step 9: Clean Up

// turbo
**Remove old repomix if needed:**
```bash
# Keep repomix-output.xml for AI context
ls -la repomix-output.xml
```

---

## Step 10: Generate Report

**Output success message:**

```
🔄 Documentation updated!

💾 Backup: docs.backup.{timestamp}/

📊 Changes:
   - Files: {old_count} → {new_count}
   - Tokens: {old_tokens} → {new_tokens}

📝 Updated:
   ✓ codebase-summary.md
   ✓ project-overview-pdr.md
   ✓ code-standards.md
   ✓ system-architecture.md
   ✓ design-guidelines.md
   ✓ deployment-guide.md
   ✓ project-roadmap.md
   ✓ .agent/rules/AGENTS.md (if exists)

💡 Review docs/ for any manual adjustments needed
```

---

## Error Handling

| Scenario | Action |
|----------|--------|
| docs/ not found | Prompt to run `/docs-init` |
| repomix fails | Continue with manual analysis |
| Permission denied | Report path, suggest sudo/fix |
| Conflicts detected | Ask user which version to keep |

---

## Notes

- Always create backup before updating
- Merge existing content with new analysis
- Preserve manual edits when possible
- Update timestamp on all modified files
- Keep repomix-output.xml for AI context
