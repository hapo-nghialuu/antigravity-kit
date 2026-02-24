---
name: specs
description: Specs workflow for creating comprehensive feature specifications. Use for new features, complex changes, or when you need structured requirements, design, and task breakdown.
---

# Specs (SDD)

> Hệ thống tạo specification có cấu trúc, từ ý tưởng mơ hồ đến task list cụ thể.

## Overview

Skill này cung cấp quy trình 7 bước để biến ý tưởng thành spec và triển khai thực tế:

```
Idea - Requirements - Design - Tasks - Code - Test - Review
```

## Available Workflows

| Command | Mô tả |
|---------|-------|
| `/spec-init <mô tả>` | Khởi tạo spec mới từ ý tưởng |
| `/spec-requirements <feature>` | Sinh requirements (EARS format) |
| `/spec-design <feature>` | Sinh design doc + research |
| `/spec-tasks <feature>` | Sinh task list |
| `/code <feature>` | Implement task từ spec tasks |
| `/test` | Run tests cho phần code vừa implement |
| `/review` | Review code quality trước khi merge |
| `/spec-status <feature>` | Xem trạng thái hiện tại |

## Quick Start

```bash
# 1. Khởi tạo spec
/spec-init Tạo app mobile cho hệ thống quản lý

# 2. Sinh requirements
/spec-requirements mobile-app

# 3. Sinh design
/spec-design mobile-app

# 4. Sinh tasks
/spec-tasks mobile-app

# 5. Code
/code mobile-app

# 6. Test
/test

# 7. Review
/review
```

## Data Structure

Mỗi feature spec được lưu trong `.specs/<feature-name>/`:

```
.specs/
└── mobile-app/
    ├── spec.json           # Metadata & state
    ├── requirements.md     # Requirements (EARS format)
    ├── research.md         # Research log
    ├── design.md           # Design document
    └── tasks.md            # Task list
```

## Resources

Skill này bao gồm:

### Templates (`templates/`)
- `init.json` - Schema metadata
- `requirements-init.md` - Template requirements rỗng
- `requirements.md` - Template requirements đầy đủ
- `design.md` - Template design doc
- `research.md` - Template research log
- `tasks.md` - Template task list

### Rules (`rules/`)
- `ears-format.md` - Chuẩn viết Requirements (EARS)
- `design-principles.md` - Nguyên tắc thiết kế
- `design-discovery-full.md` - Quy trình research đầy đủ
- `design-discovery-light.md` - Quy trình research nhẹ
- `tasks-generation.md` - Quy tắc chia task
- `tasks-parallel-analysis.md` - Phân tích task song song

## When to Use

✅ **Dùng khi:**
- Tạo feature mới phức tạp
- Cần documentation trước khi code
- Làm việc với team (cần review spec)
- Dự án cần audit trail

❌ **Không cần khi:**
- Fix bug đơn giản
- Thay đổi nhỏ (< 1 giờ)
- Hotfix khẩn cấp
