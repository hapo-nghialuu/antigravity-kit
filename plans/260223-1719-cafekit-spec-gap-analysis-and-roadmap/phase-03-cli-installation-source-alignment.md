# Phase 03 — CLI Installer & Source Alignment

## Context Links
- Installer: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/bin/install.js`
- Claude source: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/claude/commands/`
- Antigravity source: `/Users/luutrungnghia/projects/antigravity-kit/packages/spec/src/antigravity/workflows/`

## Overview
- Priority: P1
- Status: Pending
- Brief: Loại bỏ mismatch giữa installer copy list và source thực tế để install ổn định.

## Key Insights
- `install.js` đang copy `docs_init.md/docs_update.md` cho mọi platform, nhưng Claude source chỉ có `docs.md`.
- Đây là lỗi functional có khả năng gây error khi install.

## Requirements
### Functional
- Installer copy đúng file theo từng platform.
- Không còn “source file not found” trong install path hợp lệ.

### Non-functional
- Idempotent behavior giữ nguyên.
- Không phá backward compatibility không cần thiết.

## Architecture
- Tách `specFiles` theo platform hoặc dùng mapping dynamic:
  - claude: `spec-*.md` + `docs.md`
  - antigravity: `spec-*.md` + `docs_init.md` + `docs_update.md`

## Related Code Files
### Files to modify
- `packages/spec/bin/install.js`

### Files to validate
- `packages/spec/src/claude/commands/docs.md`
- `packages/spec/src/antigravity/workflows/docs_init.md`
- `packages/spec/src/antigravity/workflows/docs_update.md`

## Implementation Steps
1. Refactor copy list theo platform.
2. Chạy dry verification (logical check paths).
3. Cập nhật installer output nếu cần.

## Todo List
- [ ] Refactor file copy matrix
- [ ] Validate all source paths exist
- [ ] Re-check idempotent skip behavior

## Success Criteria
- Installer chạy không lỗi thiếu file trong setup Claude/Antigravity chuẩn.

## Risk Assessment
- Rủi ro: sửa nhanh gây bug logic detect platform.
- Mitigation: test cả 2 branch logic claude + antigravity.

## Security Considerations
- Không có rủi ro bảo mật mới; đây là reliability fix.

## Next Steps
- Sang Phase 04 để thêm/chuẩn hóa gate test/review trong flow.
