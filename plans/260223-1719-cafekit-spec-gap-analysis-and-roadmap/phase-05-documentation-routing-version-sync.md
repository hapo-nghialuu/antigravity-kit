# Phase 05 — Documentation, Routing, and Version Sync

## Context Links
- `packages/spec/README.md`
- `packages/spec/package.json`
- `packages/spec/bin/install.js`
- `packages/spec/src/claude/ROUTING.md`

## Overview
- Priority: P1
- Status: Pending
- Brief: Đồng bộ thông tin công bố (README/changelog/version/routing) với behavior thực tế.

## Key Insights
- README chứa các đoạn path cũ (`.agent/commands`) và version/changelog lệch.
- ROUTING trong package có references cũ, dễ gây hiểu sai khi install.

## Requirements
### Functional
- README phản ánh đúng command set + path + version.
- Installer banner version khớp package version.
- ROUTING mẫu không trỏ file không tồn tại.

### Non-functional
- Giữ README ngắn, rõ, có quick-start chuẩn.
- Tránh duplicate thông tin mâu thuẫn giữa nhiều section.

## Architecture
- Single source of truth cho version: lấy từ `package.json` (hoặc generate vào banner/docs).
- Routing template chỉ giữ references có thật trong package skeleton.

## Related Code Files
### Files to modify
- `packages/spec/README.md`
- `packages/spec/bin/install.js`
- `packages/spec/src/claude/ROUTING.md`

## Implementation Steps
1. Chuẩn hóa section paths (claude vs antigravity).
2. Chuẩn hóa version references.
3. Rà soát lại command matrix trong README.
4. Cập nhật changelog block gần nhất.

## Todo List
- [ ] Fix path naming inconsistencies
- [ ] Fix version/changelog inconsistencies
- [ ] Fix routing stale references
- [ ] Re-check all examples executable

## Success Criteria
- Đọc README và chạy install theo README không gặp mâu thuẫn.
- Không còn reference “file không tồn tại” ở ROUTING.

## Risk Assessment
- Rủi ro: sửa docs sót section dài.
- Mitigation: dùng checklist consistency trước merge.

## Security Considerations
- Docs accuracy là yếu tố giảm vận hành sai/lạm quyền command.

## Next Steps
- Sang Phase 06 để validation + release readiness.
