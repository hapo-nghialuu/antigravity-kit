# Phase 01 — Baseline Audit (packages/spec)

## Context Links
- Package manifest: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/package.json`
- Installer: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/bin/install.js`
- Readme: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/README.md`
- Claude commands source: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/claude/commands/`
- Antigravity workflows source: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/antigravity/workflows/`
- Shared skill: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/common/skills/spec-driven-development/`

## Overview
- Priority: P1
- Status: Completed
- Date: 2026-02-23
- Brief: Chốt hiện trạng để làm baseline trước khi thiết kế thay đổi.

## Key Insights
1. **Version drift rõ ràng**:
   - `package.json` = `0.1.7`
   - README badge/changelog = `0.1.5`
   - installer banner = `v0.1.6`
2. **Installer đang copy 2 file docs không tồn tại ở Claude source**:
   - `docs_init.md`, `docs_update.md` có trong danh sách `specFiles`
   - nhưng Claude chỉ có `docs.md`.
3. **README mô tả path Antigravity cũ ở vài đoạn** (`.agent/commands`) trong khi source dùng `.agent/workflows`.
4. **SDD flow hiện tại mạnh ở spec generation nhưng chưa có test/review gate rõ trong package spec**.

## Requirements
### Functional
- Có bảng gap chuẩn giữa “thực thi installer” và “tài liệu public”.
- Xác định rõ những mismatch làm fail install hoặc gây hiểu nhầm.

### Non-functional
- Phân tích dựa trên file thực tế, không suy đoán.
- Tài liệu ngắn, rõ, làm baseline cho phase sau.

## Architecture
- Không thay đổi kiến trúc ở phase này.
- Chỉ tạo “audit snapshot” làm nguồn tham chiếu.

## Related Code Files
### Files to inspect
- `packages/spec/package.json`
- `packages/spec/bin/install.js`
- `packages/spec/README.md`
- `packages/spec/src/claude/commands/*.md`
- `packages/spec/src/antigravity/workflows/*.md`

### Files to modify
- None (planning phase)

### Files to create
- This phase file (current)

### Files to delete
- None

## Implementation Steps
1. Đọc manifest/package metadata.
2. Đọc installer copy logic + source registry.
3. Đọc README và đối chiếu với source tree thực tế.
4. Ghi lại mismatch có impact trực tiếp.
5. Khóa baseline để phase sau không tranh luận lại “hiện trạng”.

## Todo List
- [x] Confirm package version baseline
- [x] Confirm installer copy matrix
- [x] Confirm docs/README mismatch points
- [x] Capture baseline summary

## Success Criteria
- Liệt kê được mismatch có dẫn chứng file path cụ thể.
- Baseline đủ rõ để phase sau chuyển sang decision/implementation.

## Risk Assessment
- Rủi ro: bỏ sót mismatch nhỏ trong README dài.
- Mitigation: phase 05 sẽ chạy pass consistency toàn bộ docs.

## Security Considerations
- Không có thay đổi runtime/security ở phase audit.

## Next Steps
- Chuyển sang Phase 02 để chốt contract workflow mục tiêu trước khi sửa code.
