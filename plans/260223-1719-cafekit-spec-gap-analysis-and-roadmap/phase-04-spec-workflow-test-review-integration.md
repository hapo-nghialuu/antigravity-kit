# Phase 04 — Spec Workflow Test/Review Integration

## Context Links
- `packages/spec/src/claude/commands/spec-impl.md`
- `packages/spec/src/claude/commands/spec-tasks.md`
- `packages/spec/src/common/skills/spec-driven-development/SKILL.md`
- Antigravity mirrors in `packages/spec/src/antigravity/workflows/`

## Overview
- Priority: P1
- Status: Pending
- Brief: Đưa rõ test/review vào contract execution để khớp workflow mục tiêu user.

## Key Insights
- Flow hiện tại mới đến mức “implement tasks” + cảnh báo context bloat.
- Chưa có “must-do gate” rõ cho test/review sau code.

## Requirements
### Functional
- Mỗi vòng `/spec-impl` phải có next-step rõ cho test/review.
- `spec-status` phản ánh được readiness theo gate test/review (nếu chọn tích hợp metadata).

### Non-functional
- Không thêm command mới nếu chưa cần.
- Giữ templates đơn giản, tránh rườm rà.

## Architecture
- Option khuyến nghị: **Light gate integration**
  - Task/impl output bắt buộc nhắc test/review command.
  - Có thể thêm trạng thái gate trong `spec.json` (optional nếu cần theo dõi mạnh).

## Related Code Files
### Files to modify
- `packages/spec/src/claude/commands/spec-impl.md`
- `packages/spec/src/claude/commands/spec-tasks.md`
- `packages/spec/src/claude/commands/spec-status.md`
- Mirror files trong `src/antigravity/workflows/`
- (optional) `templates/init.json`

## Implementation Steps
1. Chốt mức gate (instruction-only vs metadata).
2. Sửa output contracts trong `spec-impl/spec-tasks/spec-status`.
3. Mirror sang Antigravity workflow tương ứng.
4. Đảm bảo ngôn ngữ/semantics không mâu thuẫn giữa 2 platform.

## Todo List
- [ ] Define gate model
- [ ] Update command/workflow prompts
- [ ] Sync claude + antigravity variants
- [ ] Validate no regression in existing flow

## Success Criteria
- Luồng thể hiện rõ: code xong phải test, test xong phải review.
- Người dùng đọc command docs hiểu ngay thứ tự thực thi.

## Risk Assessment
- Rủi ro: gate quá cứng, giảm linh hoạt cho tác vụ nhỏ.
- Mitigation: cho phép “recommended by default, enforce in status only when opted-in”.

## Security Considerations
- Test/review gate giúp giảm nguy cơ merge code chưa kiểm tra.

## Next Steps
- Sang Phase 05 để đồng bộ docs/README/routing/version.
