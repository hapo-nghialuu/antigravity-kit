---
title: "CafeKit Spec Gap Analysis & Alignment Plan"
description: "Rà soát packages/spec và nâng cấp workflow về chuẩn spec-init → spec-requirements → spec-design → spec-tasks → code → test → review"
status: pending
priority: P1
effort: M
branch: feat/antigravity-docs-and-simplified-gemini
tags: [cafekit-spec, workflow, cli, docs]
created: 2026-02-23
---

# CafeKit Spec Gap Analysis & Alignment Plan

## Overview
Mục tiêu: chuẩn hóa `packages/spec` để workflow thực tế không lệch docs, tránh lệnh lỗi khi install, và có quality gate test/review rõ ràng.

## Current Snapshot (Planning Baseline)
- Package: `@haposoft/cafekit-spec@0.1.7`
- Installer: banner `v0.1.6`
- README badge/changelog: `0.1.5`
- CLI source lệch docs command naming/path tại một số chỗ
- `spec-impl` còn tồn tại trong package flow, cần loại bỏ khỏi workflow chính

## Phases

| # | Phase | Status | Link |
|---|-------|--------|------|
| 1 | Baseline audit & gap freeze | Completed (analysis) | [phase-01](./phase-01-baseline-audit-cafekit-spec.md) |
| 2 | Workflow contract decision | Completed (comparison done) | [phase-02](./phase-02-workflow-contract-decision.md) |
| 3 | CLI installer source alignment | Pending | [phase-03](./phase-03-cli-installation-source-alignment.md) |
| 4 | Spec flow refactor (drop spec-impl) + test/review integration | In Progress | [phase-04](./phase-04-spec-flow-drop-spec-impl-and-test-review-integration.md) |
| 5 | Docs/routing/version consistency | Pending | [phase-05](./phase-05-documentation-routing-version-sync.md) |
| 6 | Validation & release readiness | Pending | [phase-06](./phase-06-validation-and-release-readiness.md) |

## Key Dependencies
- Phase 2 quyết định hướng workflow contract trước khi sửa command templates.
- Phase 4 chốt strategy bỏ `spec-impl` trước khi hoàn thiện docs (Phase 5).
- Phase 3 và Phase 4 cần hoàn thành trước validation/release (Phase 6).
- Phase 5 phụ thuộc kết quả Phase 2–4 để docs phản ánh đúng thực tế.

## Primary Risks
- Sửa flow quá tay gây tăng độ phức tạp (vi phạm KISS/YAGNI).
- Remove `spec-impl` đột ngột có thể làm user cũ vỡ workflow.
- Mismatch giữa CLI behavior và README tiếp tục tái diễn nếu không có checklist release.
- Không có test installer => dễ regression khi thêm command mới.

## Definition of Done
- Installer không báo thiếu source file khi cài cho Claude/Antigravity.
- Workflow chính hỗ trợ rõ chuỗi: spec-init → spec-requirements → spec-design → spec-tasks → code → test → review (không dùng spec-impl).
- README + changelog + version + routing đồng bộ một nguồn sự thật.
- Có validation checklist trước publish.
