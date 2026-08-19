# Gỡ hỗ trợ OpenCode (dogfood vòng 2)

> Chạy theo `plans/20260818-skill-specs-lean-draft.md`. Vòng 2: việc cross-cutting nhiều task có phụ thuộc — thứ vòng 1 (1 task, không phụ thuộc) chưa test được.

## Quyết định scope (C1 — 2026-08-19)

- **Đã có gì sẵn:** 39 file tracked nhắc OpenCode. Có **platform registry tập trung** tại `bin/lib/context.js:96-109` (entry `opencode: {...}`) — gỡ ở đó cắt được phần lớn nhánh phía dưới. Phân bố: 16 file xoá hẳn, 10 file installer sửa nhánh (nặng nhất `context.js` 21 ref, `post-install.js` 12, `copy-payload.js` 9), 5 hook runtime, 4 test, 4 doc trạng-thái-hiện-tại (46 ref), 3 doc lịch sử (68 ref).
- **Tối thiểu:** gỡ registry + installer core + hook runtime + xoá source + sửa test + README.
- **User chọn: MỞ RỘNG** — làm cả phần dọn doc lịch sử và rà projection `.agents/`/`.codex/`.

### Diễn giải phần mở rộng (chốt tại C1, không bàn lại)

- **Doc trạng-thái-hiện-tại** (`README.md`, `packages/spec/README.md`, `docs/installer-architecture.md`, `docs/provenance.md`): **gỡ sạch** mọi mô tả OpenCode như một platform được hỗ trợ.
- **Doc lịch sử** (`packages/spec/CHANGELOG.md`, `docs/project-changelog.md`, `docs/audit-cafekit-vs-claude-code-2026-07.md`): **không xoá entry cũ** — chúng ghi lại sự thật đã xảy ra, xoá đi là làm changelog nói dối. Thay vào đó: thêm entry mới ghi việc gỡ, và thêm một dòng ghi chú ở đầu mục liên quan để người đọc không tưởng OpenCode còn được hỗ trợ. Đây là cách "dọn lịch sử" đúng nghĩa.
- **Projection `.agents/`, `.codex/`, `.opencode/`** (cả root lẫn trong `packages/spec/`): đã xác minh **đều gitignored**, là artifact cài đặt cục bộ → `rm -rf` trong task dọn, không cần sửa code.

## Ngoài phạm vi

- Không đụng hỗ trợ Claude Code và Codex CLI.
- Không đổi kiến trúc platform registry (chỉ gỡ một entry, không refactor).
- Không đụng WIP semantic-kernel / bộ quy trình specs mới.

## Task

| # | Task | Owner file chính | Phụ thuộc | Trạng thái |
|---|---|---|---|---|
| 01 | Cắt đường cài: registry + installer core | `bin/lib/context.js`, `bin/phases/*`, `bin/install.js` | - | pending |
| 02 | Gỡ nhánh ở hook runtime + skill catalog | `src/claude/hooks/lib/*.cjs`, `generate-skill-catalog.cjs` | - | pending |
| 03 | Xoá source + file/test/doc riêng của OpenCode | `src/opencode/`, `bin/__tests__/opencode-spec-gate.test.js` | 01, 02 | pending |
| 04 | Sửa test còn lại đang assert OpenCode tồn tại | `bin/__tests__/*.test.js` | 03 | pending |
| 05 | Doc: gỡ mô tả hiện tại + ghi chú lịch sử | `README.md`, `docs/*.md`, `CHANGELOG.md` | 04 | pending |

**Ghi chú A2:** Task 01 đụng ~12 file, vượt ngưỡng ~5. Đây là ngoại lệ có chủ đích: gỡ registry và gỡ nhánh tiêu thụ nó là **một thao tác nguyên tử** — tách đôi sẽ để lại trạng thái nửa vời (registry còn entry nhưng phase không xử, hoặc ngược lại) mà suite không build được. Các task còn lại đều ≤5 file.

---

## Task 01 — Cắt đường cài: registry + installer core

### Scope
- Trong: gỡ entry `opencode` khỏi platform registry (`context.js:96-109`) và mọi nhánh tiêu thụ nó trong installer; xoá 2 module chỉ phục vụ OpenCode.
- Ngoài: không đổi hình dạng registry cho claude/codex; không đổi thứ tự phase.

### File
- Sửa: `packages/spec/bin/lib/context.js` (21 ref, gồm registry `:96-109`, `:60`, `:65`, require `:16`), `bin/install.js` (5), `bin/lib/manifest.js` (1), `bin/lib/copy-utils.js` (1), `bin/phases/select-platform.js` (1), `bin/phases/copy-payload.js` (9), `bin/phases/post-install.js` (12), `bin/phases/root-config.js` (3), `bin/phases/summary.js` (1), `bin/phases/claude-runtime.js` (3)
- Xoá: `packages/spec/bin/lib/opencode-install.js`, `packages/spec/bin/phases/opencode-runtime.js`

### Acceptance
- `grep -ri opencode packages/spec/bin/` → 0 kết quả.
- `node packages/spec/bin/install.js --dry-run` chạy exit 0, không liệt kê OpenCode ở output.
- Không còn cách nào chọn platform opencode (kể cả qua flag/env).

### Verification Plan
`grep -ri opencode packages/spec/bin/ ; node packages/spec/bin/install.js --dry-run`

---

## Task 02 — Gỡ nhánh ở hook runtime + skill catalog

### Scope
- Trong: gỡ nhận diện/nhánh OpenCode trong hook lib và bộ sinh skill catalog.
- Ngoài: không đổi hành vi hook với claude/codex.

### File
- Sửa: `src/claude/hooks/lib/detect.cjs`, `src/claude/hooks/lib/context.cjs`, `src/claude/hooks/spec-state.cjs`, `src/claude/hooks/task-scaffold-guard.cjs`, `src/claude/scripts/generate-skill-catalog.cjs`
- Đọc thêm: `src/claude/gitignore`, `src/claude/migration-manifest.json` (kiểm có ref không)

### Acceptance
- `grep -ri opencode packages/spec/src/claude/` → 0 kết quả (trừ file bị xoá ở task khác).
- Hook vẫn nhận diện đúng claude/codex — test hook hiện có vẫn xanh.

### Verification Plan
`grep -ri opencode packages/spec/src/claude/ ; node --test packages/spec/src/claude/hooks/__tests__/`

---

## Task 03 — Xoá source + file/test/doc riêng của OpenCode

### Scope
- Trong: xoá `src/opencode/` (11 file), test riêng, 2 doc riêng; dọn artifact gitignored.
- Ngoài: không đụng file dùng chung.

### File
- Xoá: `packages/spec/src/opencode/`, `packages/spec/bin/__tests__/opencode-spec-gate.test.js`, `packages/spec/docs/opencode-hook-port-audit.md`, `packages/spec/docs/opencode-plugin-contract.md`
- Dọn (gitignored): `rm -rf .opencode packages/spec/.opencode`

### Acceptance
- Các đường dẫn trên không còn tồn tại.
- `git status` không xuất hiện file lạ.

### Verification Plan
`ls packages/spec/src/opencode 2>&1 ; git status --short`

---

## Task 04 — Sửa test còn lại đang assert OpenCode tồn tại

### Scope
- Trong: gỡ/điều chỉnh assertion về OpenCode ở 4 test dùng chung + runner. **Không xoá test để cho qua** — chỉ gỡ đúng phần assert platform đã bỏ.
- Ngoài: không nới lỏng assertion nào khác.

### File
- Sửa: `bin/__tests__/codex-native.test.js`, `bin/__tests__/develop-contract.test.js`, `bin/__tests__/installer-safety.test.js`, `bin/__tests__/package-inventory.test.js`, `scripts/run-skill-self-tests.mjs`

### Acceptance
- `pnpm -C packages/spec test` exit 0.
- Số test không giảm quá số test opencode-only đã xoá ở Task 03; ghi rõ con số trước/sau.

### Verification Plan
`pnpm -C packages/spec test`

---

## Task 05 — Doc: gỡ mô tả hiện tại + ghi chú lịch sử

### Scope
- Trong: gỡ OpenCode khỏi 4 doc mô tả trạng thái hiện tại; thêm entry changelog cho việc gỡ; thêm ghi chú "đã ngừng hỗ trợ" ở 3 doc lịch sử **mà không xoá entry cũ**.
- Ngoài: không viết lại nội dung lịch sử.

### File
- Sửa: `README.md` (4 ref), `packages/spec/README.md` (17), `docs/installer-architecture.md` (24), `docs/provenance.md` (1), `packages/spec/CHANGELOG.md` (thêm entry), `docs/project-changelog.md` (thêm entry + ghi chú), `docs/audit-cafekit-vs-claude-code-2026-07.md` (ghi chú)
- Kiểm: `packages/spec/src/claude/skills/question/SKILL.md`, `packages/spec/src/codex/AGENTS.md` — có ref, quyết định sửa hay không khi đọc.

### Acceptance
- Không doc nào còn mô tả OpenCode như platform **được hỗ trợ**.
- Entry lịch sử cũ vẫn còn nguyên; có entry mới ghi việc gỡ.

### Verification Plan
`grep -ri opencode README.md docs/ packages/spec/README.md packages/spec/CHANGELOG.md` — đọc từng kết quả, xác nhận chỉ còn ngữ cảnh lịch sử.

## Review log
- (điền sau vòng review C2)
