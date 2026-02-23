# Phase 06 — Validation & Release Readiness

## Context Links
- Installer: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/bin/install.js`
- Package docs: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/README.md`
- Commands/workflows sources under `packages/spec/src/`

## Overview
- Priority: P1
- Status: Pending
- Brief: Chốt quality gate trước khi publish/update package.

## Key Insights
- Hiện chưa thấy test suite cho installer trong `packages/spec`.
- Regression risk cao khi có nhiều mapping platform/file.

## Requirements
### Functional
- Có checklist validation tối thiểu:
  - path existence
  - installer copy behavior
  - command availability matrix
  - docs consistency
- Chạy smoke test cài đặt cho cả Claude và Antigravity.

### Non-functional
- Validation script đơn giản, dễ chạy local/CI.
- Kết quả fail phải đọc được nguyên nhân nhanh.

## Architecture
- Validation theo 3 lớp:
  1. **Static checks** (file exists, matrix consistency)
  2. **Install smoke checks** (simulate install targets)
  3. **Docs checks** (version/path consistency)

## Related Code Files
### Files to add/modify
- (TBD) scripts/tests under `packages/spec/` for validation
- `package.json` scripts section (if needed)

## Implementation Steps
1. Thiết kế checklist pass/fail.
2. Tạo smoke validation scripts.
3. Chạy validate trước release.
4. Cập nhật release note ngắn.

## Todo List
- [ ] Define release checklist
- [ ] Add basic validation commands
- [ ] Execute validation on both platform scenarios
- [ ] Prepare release notes

## Success Criteria
- Có evidence validation trước publish.
- Không còn mismatch blocker sau khi release.

## Risk Assessment
- Rủi ro: thiếu test khiến bug quay lại ở bản sau.
- Mitigation: đưa validation vào script bắt buộc trước publish.

## Security Considerations
- Validation giúp tránh phát hành command/routing lỗi gây behavior không mong muốn.

## Next Steps
- Khi phase này đạt, có thể tiến hành implementation cycle theo plan.
