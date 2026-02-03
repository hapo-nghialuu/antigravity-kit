---
name: spec-impl
description: Implement specific tasks from task list.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: <feature-name> [task-ids]
---

# /spec-impl - Implement Tasks

$ARGUMENTS

---

## Purpose

Hướng dẫn và thực hiện implement các task cụ thể từ task list.

---

## Task

### Prerequisites
- Tasks phải được generate trước (`/spec-tasks`)
- Đọc skill: `{{SKILLS_DIR}}/spec-driven-development/SKILL.md`

### Arguments

- `$1`: Feature name (required)
- `$2`: Task ID(s) (optional)
  - Single task: `1.1`
  - Multiple tasks: `1.1,1.2,1.3`
  - All tasks: (no argument - NOT recommended)

### Execution Steps

1. **Load Context**
   - Read `.specs/$1/tasks.md`
   - Read `.specs/$1/design.md`
   - Read `.specs/$1/requirements.md`

2. **Parse Task(s)**
   - Nếu có `$2`: Parse task IDs
   - Nếu không có `$2`: Lấy tất cả pending tasks (⚠️ context bloat risk)

3. **For Each Task**
   - Đọc task details từ `tasks.md`
   - Đọc related design từ `design.md`
   - Implement code theo design contracts
   - Verify acceptance criteria từ requirements

4. **Update Progress**
   - Mark task as `[x]` trong `tasks.md`
   - Update `spec.json` nếu tất cả tasks hoàn thành

---

## Output Format

```markdown
## 🚀 Implementing Task $2

**Feature:** `<feature-name>`
**Task:** [Task description]

### Design Reference:
- Component: [Component name]
- Interface: [Interface contract]

### Implementation:
[Code implementation]

### Verification:
✅ [Acceptance criteria 1]
✅ [Acceptance criteria 2]

### Next Task:
```
/spec-impl <feature-name> <next-task-id>
```
```

---

## Usage Examples

```
/spec-impl mobile-app 1.1
/spec-impl mobile-app 1.1,1.2,1.3
/spec-impl auth-module 2.1
```

---

## ⚠️ Important Notes

1. **Clear context between tasks** - Tránh context window đầy
2. **Implement one task at a time** - Recommended approach
3. **Verify before moving on** - Đảm bảo task hoàn thành trước khi làm task tiếp
