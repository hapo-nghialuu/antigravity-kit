---
description: Display current status of a specification.
---

# /spec-status - View Specification Status

$ARGUMENTS

---

## Purpose

Hiển thị trạng thái hiện tại của một spec hoặc liệt kê tất cả specs.

---

## Task

### Execution Steps

**If `$ARGUMENTS` is provided:**

1. Read `.specs/$ARGUMENTS/spec.json`
2. Display:
   - Feature name
   - Current phase
   - Approval status
   - Created/Updated timestamps
   - Summary of files

**If no arguments:**

1. Glob `.specs/*/spec.json`
2. List all specs with their status

---

## Output Format

### Single Spec Status

```markdown
## 📊 Spec Status: `<feature-name>`

| Property | Value |
|----------|-------|
| **Phase** | `<phase>` |
| **Created** | `<timestamp>` |
| **Updated** | `<timestamp>` |

### Approvals
- Requirements: ✅/❌ Generated | ✅/❌ Approved
- Design: ✅/❌ Generated | ✅/❌ Approved
- Tasks: ✅/❌ Generated | ✅/❌ Approved

### Files
- `spec.json` ✅
- `requirements.md` ✅/❌
- `research.md` ✅/❌
- `design.md` ✅/❌
- `tasks.md` ✅/❌

### Next Action
- If phase = `requirements-generated`: Run `/spec-design <feature-name>`
- If phase = `design-generated`: Run `/spec-tasks <feature-name>`
- If phase = `tasks-generated`: Run `/code <feature-name>`, then `/test`, then `/review`
```

### All Specs List

```markdown
## 📊 All Specs

| Feature | Phase | Last Updated |
|---------|-------|--------------|
| `mobile-app` | tasks-generated | 2026-01-21 |
| `auth-module` | design-generated | 2026-01-20 |
```

---

## Usage Examples

```
/spec-status mobile-app
/spec-status
```
