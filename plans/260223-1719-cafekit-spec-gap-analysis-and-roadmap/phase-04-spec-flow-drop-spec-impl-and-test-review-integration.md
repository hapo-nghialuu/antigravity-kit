# Phase 04 — Spec Flow Refactor: Drop `spec-impl` + Integrate Test/Review

## Context Links
- `packages/spec/src/claude/commands/spec-init.md`
- `packages/spec/src/claude/commands/spec-requirements.md`
- `packages/spec/src/claude/commands/spec-design.md`
- `packages/spec/src/claude/commands/spec-tasks.md`
- `packages/spec/src/claude/commands/spec-status.md`
- `packages/spec/src/claude/commands/spec-impl.md` (to remove/deprecate)
- `packages/spec/src/common/skills/spec-driven-development/SKILL.md`
- Antigravity mirrors in `packages/spec/src/antigravity/workflows/`

## Overview
- Priority: P1
- Status: In Progress
- Brief: Chuẩn hóa workflow không còn `spec-impl`; chuyển execution sang command `code`, và buộc gate `test -> review` sau coding.

## Key Insights
- User xác nhận bỏ `spec-impl` khỏi workflow chính.
- `spec-*` nên tập trung vào spec lifecycle; phần implement giao cho `code` command.
- Cần tránh để docs/commands mâu thuẫn (vẫn nhắc `spec-impl`).

## Requirements
### Functional
- Workflow mục tiêu:
  - `spec-init -> spec-requirements -> spec-design -> spec-tasks -> code -> test -> review`
- Bỏ `spec-impl` khỏi chain chính trong command docs + skill docs.
- `spec-status` phải phản ánh chain mới (không hiển thị next-step `spec-impl`).
- `code` command nhận input từ spec task artifacts rõ ràng.

### Non-functional
- Giữ KISS/YAGNI: không thêm command mới nếu không cần.
- Tương thích cả Claude và Antigravity variants.

## Architecture
- **Spec layer**: tạo và quản lý artifacts trong `.specs/{feature}`.
- **Execution layer**: `code` command đọc artifacts rồi implement.
- **Quality gates**: sau code bắt buộc run `test`, sau test run `review`.

## Related Code Files
### Files to modify
- `packages/spec/src/claude/commands/spec-status.md`
- `packages/spec/src/claude/commands/spec-tasks.md` (nếu có references cũ)
- `packages/spec/src/common/skills/spec-driven-development/SKILL.md`
- `packages/spec/README.md`
- Mirror files trong `packages/spec/src/antigravity/workflows/`

### Files to deprecate/remove
- `packages/spec/src/claude/commands/spec-impl.md`
- `packages/spec/src/antigravity/workflows/spec-impl.md`

## Implementation Steps
1. Chốt policy: remove hẳn `spec-impl` hay giữ alias deprecation 1 phiên bản.
2. Cập nhật command/skill docs theo chain mới.
3. Cập nhật `spec-status` recommendation/output.
4. Đồng bộ antigravity workflows.
5. Cập nhật README examples và migration note.

## Todo List
- [x] Decide removal strategy (hard remove vs one-version deprecation)
- [ ] Update spec command docs
- [ ] Update shared SDD skill docs
- [ ] Update status/recommendation flow
- [ ] Sync Claude + Antigravity workflows
- [ ] Add migration notes in README

## Success Criteria
- Người dùng chạy flow không còn thấy `spec-impl` trong docs và next-step.
- Chain mới chạy xuyên suốt: `spec-init -> ... -> spec-tasks -> code -> test -> review`.
- Không còn mâu thuẫn giữa commands, skills, README.

## Risk Assessment
- Rủi ro: xóa nhanh `spec-impl` làm user cũ bị vỡ workflow.
- Mitigation: có migration note rõ, cân nhắc deprecation ngắn hạn.

## Security Considerations
- Bắt buộc test/review sau code giúp giảm nguy cơ merge code chưa verify.

## Next Steps
- Sau khi chốt strategy bỏ `spec-impl`, bắt đầu implement phase 03/04 song song theo phạm vi file không chồng chéo.
