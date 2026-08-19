# Thay skill hapo:specs bằng bản process-first v3

> Chạy theo `plans/20260818-skill-specs-lean-draft.md` (quy trình) — và đây cũng là lần đầu **plan này dogfood chính các kỹ thuật mới** (tiêu chí EARS, cột truy vết, 12 chiều).

## Quyết định scope (C1 — 2026-08-19)

- **Đã có gì sẵn:**
  - Skill đang ship `packages/spec/src/claude/skills/specs/`: **22 file / 1.943 dòng** — SKILL.md 222 dòng ("semantic kernel v2.1") + 8 references + 8 rules + 6 templates.
  - Bản thay thế: draft 216 dòng đã duyệt C2 + dogfood 2 lần (`plans/20260818-skill-specs-lean-draft.md`).
  - 4 kỹ thuật bổ sung đã research 19/08 (mỗi món có nguồn): EARS 5 mẫu câu (đã có sẵn trong skill cũ tại `rules/ears-format.md`, 42 dòng — giữ nội dung, chuyển nhà); bảng 12 chiều edge-case (từ `ak-scenario`); luật Example Mapping ("không chắc outcome = câu hỏi, không đoán"; "rule mờ = kèm 2-3 ví dụ"); cột truy vết Tiêu chí→Task.
  - Ràng buộc kỹ thuật đã xác minh:
    - `spec-scaffold.cjs:34` đọc `skills/specs/templates/` → **templates/ phải giữ nguyên** khi kernel còn sống.
    - Test bám nội dung skill: `run-skill-self-tests.mjs` **54 ref** (ruleChecks `:257-267`, template checks `:316-324`, files lists `:476-501`), `codex-native.test.js` **17**, `validator-grounding.test.js` **14**, `installer-safety`/`develop-contract`/`specs-v2-policy-and-scaffold`/`completion-authority` mỗi file 1.
    - Luật nhà dạy workflow v2.1 (grep `semantic_model|machine authority|task_registry`): `src/claude/CLAUDE.md`, `src/claude/rules/state-sync.md`, `src/claude/rules/workflow.md`, `src/codex/AGENTS.md`, `src/common/AGENTS.md`.
    - Done-gate `spec-gate.cjs:163` resolve `spec.json`, `:173` đọc `task_registry` → **hồ sơ kiểu mới (không spec.json) hiện KHÔNG được máy canh**; Task 04 chỉnh.
- **Tối thiểu:** thay SKILL.md + references; xoá file workflow cũ không còn ai trỏ; dạy lại test; đồng bộ 5 file luật nhà; chỉnh done-gate nhận layout mới; dogfood bằng `/hapo:specs` thật.
- **User chọn:** đi theo hướng đề xuất (GIỮ + hồ sơ ở lại `specs/` + hook chỉnh nhẹ + đồng bộ luật nhà) — chốt qua "làm plan cho tôi" sau khi nghe giải thích lý thuyết + hướng đi.

## Tiêu chí chấp nhận (đo được)

- **R1**: Khi user gõ `/hapo:specs <mô tả feature>` trong repo đã cài lại, agent shall chạy flow 3 cửa: hỏi scope đúng một lần, tạo `specs/<feature>/plan.md` + `task-NN-*.md`, không đòi `spec.json`.
- **R2**: Bundle `skills/specs/` sau swap shall ≤ 700 dòng, và không file nào bị xoá còn được trỏ tới từ code/test/doc (grep 0).
- **R3**: `pnpm -C packages/spec test` shall exit 0 sau MỖI task (không cửa sổ đỏ).
- **R4**: Sau Task 03, grep `semantic_model|machine authority` trong 5 file luật nhà shall chỉ còn ngữ cảnh tương-thích-ngược có chủ đích (đánh dấu legacy), không còn được dạy như quy trình hiện hành.
- **R5**: If một task file layout mới ghi `Status: done` mà thiếu receipt (block lệnh + exit code), done-gate shall chặn ở Stop — chứng minh bằng runtime.
- **R6**: Spec cũ có `spec.json` shall validate/gate y như trước (kernel không đổi hành vi) — `validate-spec-output.cjs` trên `specs/cafekit-semantic-eval-firewall` vẫn exit 0.

## Ngoài phạm vi

- Không gỡ kernel scripts (`spec-scaffold/validate-spec-output/spec-readiness/...`) — chúng phục vụ spec cũ tới đợt gỡ riêng (strangler).
- Không đổi `templates/` (kernel đọc — `spec-scaffold.cjs:34`); không đổi 2 chốt máy ngoài phần Task 04 mô tả.
- Không dịch/đồng bộ `cafekit-web/`; không port skill sang bản render `.claude/` bằng tay (installer lo).
- Bản draft tại `plans/20260818-skill-specs-lean-draft.md` giữ nguyên làm decision record — nguồn thật giờ là bundle trong `packages/spec`.

## Task

| # | Task | Tiêu chí | Owner chính | Phụ thuộc | Trạng thái |
|---|---|---|---|---|---|
| 01 | Thay bundle skill (SKILL + references, xoá file cũ) | R2 | `src/claude/skills/specs/**` | - | pending |
| 02 | Dạy lại test bám nội dung skill | R3 | `scripts/run-skill-self-tests.mjs`, `bin/__tests__/*` | 01 | pending |
| 03 | Đồng bộ 5 file luật nhà | R4 | `src/claude/CLAUDE.md`, `src/claude/rules/*`, `src/{codex,common}/AGENTS.md` | 01 | pending |
| 04 | Done-gate nhận layout mới + cài lại + dogfood `/hapo:specs` thật | R1, R5, R6 | `src/claude/hooks/spec-gate.cjs` (+bản codex) | 01-03 | pending |

**Ghi chú A2:** Task 01+02 mỗi cái chạm nhiều file nhưng là hai lớp tách được (nội dung skill / test soi nội dung); không gộp vì test có thể sửa sau khi nội dung chốt mà suite vẫn xanh giữa chừng **chỉ khi** Task 01 và 02 nằm chung một lần chạy suite — vì vậy quy ước: **suite chỉ bắt buộc xanh sau Task 02**, riêng khoảng giữa 01→02 chấp nhận đỏ trong cùng một phiên làm việc, không commit giữa chừng. (Khác vụ OpenCode: ở đây thay nội dung là một thao tác biên tập lớn, gộp cả test vào một task sẽ thành ~30 file một lần — khó review hơn là chấp nhận một khoảng đỏ không-commit.)

---

## Task 01 — Thay bundle skill

### Scope
- Trong: viết bundle mới **tiếng Anh** (chuẩn skill ship; phần tiếng Việt do installer localize riêng):
  - `SKILL.md` (~170 dòng): frontmatter giữ `name: hapo:specs`/`user-invocable`/`argument-hint` tương thích; thân = triết lý + 3 cửa + flow 5 bước + 10 luật + lằn ranh máy (2 chốt) + luật bảo trì C-2 + 2 luật Example Mapping.
  - `references/review.md` (~120): B1 evidence rule, 4 vai kiểm chứng + bảng co giãn, red-team 4 lens + cap 15, consistency sweep, điều kiện dừng 2 vòng, cửa C2.
  - `references/templates.md` (~150): khung plan.md (có mục Tiêu chí EARS + bảng task có cột Tiêu chí) + khung task + mẫu receipt đạt/không đạt + **EARS 5 mẫu + quality gate** (chuyển từ `rules/ears-format.md`) + **bảng 12 chiều** rút gọn + tiêu chí dừng saturation.
- Xoá (15 file, không còn ai trỏ sau khi test được dạy lại ở Task 02): `references/{archive-workflow,ask-user-question-gates,codebase-analysis,cross-spec-dependency,research-strategy,scope-inquiry,translation-mirror}.md` (7) + `rules/{design-discovery-full,design-discovery-light,design-principles,design-review,ears-format,phase-decision-matrix,task-scoring-rubric,tasks-generation}.md` (8).
- Giữ: `templates/` nguyên 6 file (kernel đọc).
- Ngoài: không sửa test (Task 02), không sửa luật nhà (Task 03).

### Acceptance
- Bundle mới ≤ 700 dòng tổng (đo `find ... | xargs wc -l`).
- `node --check` không áp dụng (markdown) — thay bằng: frontmatter parse được (installer đọc), giữ nguyên `name: hapo:specs`.

### Verification Plan
`find packages/spec/src/claude/skills/specs -type f | xargs wc -l | tail -1` — (suite chạy ở Task 02).

---

## Task 02 — Dạy lại test

### Scope
- Trong: viết lại mọi check đang assert nội dung skill cũ để assert nội dung mới — mỗi check giữ lại phải trỏ được mục đích thật (C-2), không assert chữ nghĩa trang trí:
  - `run-skill-self-tests.mjs` (54 ref): khối ruleChecks `:257-267` load 8 file rule cũ → thay bằng checks trên SKILL.md/review.md/templates.md mới (vd: SKILL chứa 3 cửa, review chứa evidence auto-reject, templates chứa EARS + receipt mẫu); template checks `:316-324` giữ (templates không đổi); files lists `:476-501` cập nhật đường dẫn.
  - `codex-native.test.js` (17 ref): danh sách asset transform `:507-518` — cập nhật còn file tồn tại.
  - `validator-grounding.test.js` (14 ref): helper fixture ghi design/SKILL refs — kiểm từng chỗ, phần thuộc kernel/templates giữ nguyên.
  - 4 file còn lại mỗi file 1 ref — kiểm và sửa path nếu chết.
- Ngoài: không nới lỏng check nào không liên quan; không xoá test để cho qua.

### Cạm bẫy đã biết
- Check "shared resolver keeps explicit target" (sửa đợt OpenCode) đang assert `skills/specs/SKILL.md` chứa các câu cụ thể của bản cũ (`multiple active specs`, `guess from the first active directory`...) — bản mới không còn các câu đó → check phải đổi đối tượng hoặc câu assert, **không được xoá trắng** (nó bảo vệ spec-resolver thật).

### Acceptance
- `pnpm -C packages/spec test` exit 0.
- `grep -rn "rules/ears-format\|rules/tasks-generation\|design-discovery\|task-scoring\|phase-decision\|archive-workflow\|scope-inquiry\|translation-mirror\|research-strategy\|codebase-analysis\|cross-spec-dependency\|ask-user-question-gates" packages/spec/ → 0` (R2: không ai trỏ file đã xoá).

### Verification Plan
```
pnpm -C packages/spec test
grep -rn "design-discovery\|task-scoring-rubric\|phase-decision-matrix" packages/spec/ | wc -l
```

---

## Task 03 — Đồng bộ luật nhà

### Scope
- Trong: 5 file dạy workflow v2.1 phải chuyển sang dạy quy trình mới, phần v2.1 chỉ còn dưới nhãn tương-thích-ngược cho spec cũ:
  - `src/claude/rules/state-sync.md` — viết lại: file là sự thật, receipt/evidence, spec.json chỉ là legacy-compat cho spec cũ.
  - `src/claude/rules/workflow.md` — bước Plan/Verify/Sync theo 3 cửa + receipt.
  - `src/claude/CLAUDE.md` — khối bullets "Specs v2 keeps planning_depth..." thay bằng mô tả quy trình mới (ngắn).
  - `src/codex/AGENTS.md` + `src/common/AGENTS.md` — cùng nội dung bullets, sửa tương ứng.
- Ngoài: `.claude/rules/*` bản render (installer sinh lại); không đổi các rules khác (orchestrator, manage-docs, hook-protocols, ai-dev-rules).

### Acceptance
- R4: grep `semantic_model|machine authority` trong 5 file → chỉ còn trong đoạn đánh dấu legacy/tương-thích.
- `pnpm -C packages/spec test` exit 0 (một số check assert nội dung CLAUDE/AGENTS templates — sửa cùng nếu đỏ, ghi vào evidence).

### Verification Plan
```
grep -n "semantic_model\|machine authority" packages/spec/src/claude/CLAUDE.md packages/spec/src/claude/rules/state-sync.md packages/spec/src/claude/rules/workflow.md packages/spec/src/codex/AGENTS.md packages/spec/src/common/AGENTS.md
pnpm -C packages/spec test
```

---

## Task 04 — Done-gate layout mới + cài lại + dogfood thật

### Scope
- Trong:
  - `src/claude/hooks/spec-gate.cjs` (+ bản codex tương ứng nếu chung code path): khi thư mục `specs/<feature>/` KHÔNG có `spec.json` nhưng có `plan.md` + `task-*.md` → gate vẫn quét task `Status: done` và đòi receipt (block lệnh + `Exit:` + không placeholder — tái dùng validator receipt sẵn có trong `workflow-policy.cjs`); giữ nguyên toàn bộ hành vi khi `spec.json` tồn tại (R6).
  - Thêm test hook cho cả hai nhánh (layout mới bị chặn khi thiếu receipt / cho qua khi đủ; layout cũ không đổi).
  - Chạy `node packages/spec/bin/install.js` cài lại vào repo.
  - **Dogfood**: gõ `/hapo:specs` cho một việc nhỏ thật, đi đủ 3 cửa, để done-gate bắn thật một lần (thử khai done thiếu receipt → bị chặn → bổ sung receipt → qua).
- Ngoài: không đổi digest hook; không thêm check máy nào khác (C-2).

### Acceptance
- R5 bằng chứng runtime: transcript hook chặn task done-không-receipt ở layout mới.
- R6: `node packages/spec/src/claude/scripts/validate-spec-output.cjs specs/cafekit-semantic-eval-firewall` exit 0; hook test layout cũ pass.
- R1: phiên dogfood tạo `specs/<feature>/plan.md` + task, user quyết đúng 3 lần.
- `pnpm -C packages/spec test` exit 0.

### Verification Plan
```
node --test packages/spec/src/claude/hooks/__tests__/   (hoặc file test hook liên quan)
node packages/spec/bin/install.js --dry-run
pnpm -C packages/spec test
```

## Review log
- (điền sau vòng review C2)
