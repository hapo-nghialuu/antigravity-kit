# Phase 02 — Workflow Contract Decision

## Context Links
- Baseline: `./phase-01-baseline-audit-cafekit-spec.md`
- SDD skill: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/common/skills/spec-driven-development/SKILL.md`
- Commands: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/claude/commands/spec-*.md`

## Overview
- Priority: P1
- Status: Pending
- Brief: Chốt contract workflow chuẩn cho package spec để các phase sau implement nhất quán.

## Key Insights
- User target workflow: **spec-init → spec-requirements → spec-design → spec-tasks → code → test → review**.
- Trục hiện tại của `cafekit-spec` đã có `spec-*` nhưng thiếu “gate” test/review rõ trong hợp đồng workflow.
- Nếu không chốt contract trước, phase sửa command/docs dễ mâu thuẫn.

## Requirements
### Functional
- Định nghĩa rõ “workflow contract vNext” theo đúng chuỗi:
  - `spec-init` → `spec-requirements` → `spec-design` → `spec-tasks` → code (`spec-impl`) → test → review.
- Quyết định mức tích hợp gate test/review:
  - Option A: chỉ hướng dẫn test/review trong output của spec flow
  - Option B: bổ sung command-level integration rõ hơn
  - Option C: kết hợp (khuyến nghị)

### Non-functional
- Giữ KISS/YAGNI: không biến spec package thành full orchestration framework.
- Tương thích cả Claude và Antigravity.

## Architecture
- Contract layer gồm 3 phần:
  1. **Phase contract** (ý nghĩa từng phase)
  2. **Gate contract** (điều kiện sang phase sau)
  3. **Execution contract** (lệnh chính thức + output expectation)

### Comparison: `plan` command vs `spec-*` chain

| Aspect | `/plan` (`plan.md`, `plan:fast`, `plan:hard`) | `spec-*` chain (`spec-init -> spec-requirements -> spec-design -> spec-tasks`) |
|---|---|---|
| Mục tiêu chính | Tạo implementation plan cấp dự án/feature | Tạo spec artifact theo từng phase chuẩn SDD |
| Output chính | `plans/{timestamp}/plan.md` + phase files | `.specs/{feature}/spec.json, requirements.md, design.md, tasks.md` |
| Bản chất | Meta-planning/orchestration | Spec lifecycle có trạng thái approvals |
| Gate mặc định | Không ràng buộc trực tiếp test/review trong bản plan | Có gate giữa requirements/design/tasks; chưa có gate test/review mạnh |
| Fit với yêu cầu user | Tốt cho pre-planning phạm vi lớn | Khớp trực tiếp chuỗi user yêu cầu |

### Contract Decision (vNext)
- **Primary execution chain (bắt buộc):**
  `spec-init -> spec-requirements -> spec-design -> spec-tasks -> code(spec-impl) -> test -> review`
- **Role của `/plan`:** optional pre-step, dùng khi bài toán mơ hồ hoặc cần nhiều phương án kiến trúc; không thay thế `spec-*` chain.

## Related Code Files
### Files to modify (future phases)
- `packages/spec/src/claude/commands/spec-*.md`
- `packages/spec/src/antigravity/workflows/spec-*.md`
- `packages/spec/README.md`

## Implementation Steps
1. Chốt workflow contract với user (scope và độ sâu).
2. Quy ước gate test/review ở đâu (task generation vs impl output vs docs guidance).
3. Freeze contract thành checklist implement.

## Todo List
- [x] Compare `plan` command with `spec-*` chain
- [x] Confirm primary chain as `spec-init -> spec-requirements -> spec-design -> spec-tasks -> code -> test -> review`
- [x] Define `/plan` as optional pre-step only
- [ ] Choose integration option (A/B/C) for test/review gate depth
- [ ] Produce implementation checklist for phase 3-5

## Success Criteria
- Có tài liệu contract ngắn gọn, không mơ hồ.
- Phase 3-5 có thể làm tuần tự không phải đổi hướng.

## Risk Assessment
- Rủi ro over-engineering nếu nhồi quá nhiều logic vào command templates.
- Mitigation: giới hạn ở contract + minimal gates.

## Security Considerations
- Bổ sung test/review gate giúp giảm rủi ro đưa code chưa verify vào workflow.

## Next Steps
- Chốt option tích hợp test/review gate (A/B/C) với user.
- Sau khi chốt, chuyển sang Phase 03 sửa installer/source alignment.
