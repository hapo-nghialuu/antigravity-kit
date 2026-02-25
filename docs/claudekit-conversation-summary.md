# Tổng hợp cuộc trao đổi: ClaudeKit trong repo antigravity-kit

**Ngày:** 2026-02-23
**Repo:** `/Users/luutrungnghia/projects/antigravity-kit`

## 1) Mục tiêu người dùng

- Hiểu dự án này là gì (ban đầu yêu cầu bỏ qua `.agent` và `.claude`)
- Nghiên cứu kỹ ClaudeKit từ:
  - `https://claudekit.cc`
  - `https://docs.claudekit.cc/vi/docs/getting-started/introduction`
- Đối chiếu với bản đã cài local trong `.claude/`
- Tìm workflow phát triển cơ bản, tinh gọn:
  `plan -> requirement -> task -> code -> test -> review`
- So sánh `commands` hiện tại và `commands-archived`
- Kiểm tra xem command cũ đã chuyển sang skill chưa

---

## 2) Kết quả nhận diện dự án (giai đoạn đầu)

- Đây là monorepo toolkit cho AI coding assistants (CafeKit/Antigravity branding cùng tồn tại).
- Thành phần chính:
  - `packages/spec`: package `@haposoft/cafekit-spec` (CLI/workflow spec-driven)
  - `cafekit-web`: website docs (Next.js)
  - `docs/`: tài liệu dự án

---

## 3) Nghiên cứu ClaudeKit (official web/docs)

### Kết luận chính
- ClaudeKit định vị là bộ mở rộng cho Claude Code với **agents + commands + skills + workflows/hooks**.
- Docs giới thiệu rõ mô hình vận hành theo workflow nhiều bước.
- Có sự khác biệt số lượng giữa homepage và từng trang docs theo phạm vi (bundle/toàn bộ vs từng kit).

### Nguồn đã dùng
- `https://claudekit.cc`
- `https://docs.claudekit.cc/vi/docs/getting-started/introduction`
- `https://docs.claudekit.cc/docs/engineer/agents`
- `https://docs.claudekit.cc/docs/engineer/skills`
- `https://docs.claudekit.cc/docs/engineer/configuration/workflows`
- `https://docs.claudekit.cc/docs/engineer/configuration/hooks`
- `https://docs.claudekit.cc/docs/engineer/configuration/claude-md`

---

## 4) Audit local `.claude/` (bản đang cài)

### Xác nhận bản cài
- `ClaudeKit Engineer v2.11.3 (local)`
- Tham chiếu: `.claude/metadata.json`

### Inventory chính
- Commands active: **37** (`.claude/commands/**/*.md`)
- Commands archived: **37** (`.claude/commands-archived/**/*.md`)
- Agents: **14** (`.claude/agents/*.md`)
- Skills: **50** (`.claude/skills/*/SKILL.md`)
- Hooks entrypoints: **10** (`.claude/hooks/*.cjs`)
- Rules: **4** (`.claude/rules/*.md`)

### Runtime quan trọng
- Hook chain đang được gắn dày trong `.claude/settings.json`:
  - `SessionStart`, `SubagentStart/Stop`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`
- Hook ảnh hưởng trực tiếp hành vi thực thi (context injection, privacy/scout block, reminders).

### Lệch/stale phát hiện
- `.claude/ROUTING.md` tham chiếu nhiều agent không tồn tại local (frontend-specialist, backend-specialist, ...).
- Có tham chiếu skill `claude-code` trong ROUTING nhưng local không có thư mục skill tương ứng.
- Kết luận: `ROUTING.md` có dấu hiệu cũ, không nên coi là nguồn sự thật duy nhất.

---

## 5) Workflow tinh gọn được đề xuất

## Luồng recommended (lean)
1. **Plan**: `/plan "<task>"` (chỉ dùng khi bài toán mơ hồ/phức tạp)
2. **Requirement**: `/spec-init` -> `/spec-requirements <feature>`
3. **Task**: `/spec-tasks <feature> -y`
4. **Code**: `/spec-impl <feature> <task-id>` (làm theo từng task)
5. **Test**: `/test`
6. **Review**: `/review:codebase`

### Lý do
- Bám đúng trục spec-driven hiện tại.
- Giảm trùng lặp orchestration so với `/bootstrap` và các lệnh legacy nặng.
- Dễ kiểm soát context và phạm vi thay đổi.

---

## 6) Kết quả so sánh command cũ vs skills

## Kết luận
**Đúng một phần**: command cũ đã được chuyển đáng kể sang skills/references, nhưng **không 1:1 toàn bộ**.

### Mapping rõ ràng
- `cook*` (archived) -> **skill `cook`** (modes: `--fast`, `--parallel`, `--no-test`, `--auto`, intent detect)
- `fix*` (archived) -> **skill `fix`** + references chuyên biệt (`workflow-types/ui/test/ci/...`)
- `scout*` (archived) -> **skill `scout`** (internal + external mode)
- `debug` (archived) -> **skill `debug`**
- `skill/*` (archived) -> **skill `skill-creator`**

### Không chuyển 1:1
- `code*` archived không còn command active tương đương trực tiếp; đã được hấp thụ vào mode của `cook`.
- `design/*`, `content/*` archived tách thành domain skills (`frontend-design`, `ui-ux-pro-max`, `copywriting`, `ai-multimodal`).

### Mismatch cụ thể
- `commands-archived/fix/ui.md` nhắc skill `aesthetic`, nhưng local không có `.claude/skills/aesthetic/`.

---

## 7) Bộ chọn lọc ClaudeKit Lite (khuyến nghị)

## Keep (core)
- Commands:
  - `spec-init`, `spec-requirements`, `spec-design` (optional), `spec-tasks`, `spec-impl`, `spec-status`
  - `plan` (có điều kiện), `test`, `review:codebase`, `ask`, `status`
- Agents:
  - `planner`, `fullstack-developer`, `tester`, `code-reviewer`, `debugger`
- Skills:
  - `spec-driven-development`, `planning`, `fix`, `debug`, `scout`, `code-review`, `web-testing`
- Hooks tối thiểu:
  - `session-init`, `usage-context-awareness`, `privacy-block`, `scout-block`

## Optional
- `docs:update`, `preview`, `kanban`, `watzup`

## Không dùng mặc định
- `bootstrap*`
- `plan:hard|two|parallel|ci|cro|archive|validate`
- `commands-archived/**` (chỉ giữ tham khảo)

---

## 8) Kết luận cuối cùng

- Mục tiêu “flow hoàn chỉnh nhưng tinh gọn” khả thi nhất là đi theo **spec-driven core + test + review**.
- Command archived chủ yếu là lớp orchestration cũ; phần giá trị đã được dịch chuyển vào skills/references hiện tại.
- Nếu tối ưu vận hành team, nên chuẩn hóa một profile Lite và dùng nhất quán.

---

## 9) Cập nhật mới: thiết lập plan hoàn chỉnh cho `cafekit-spec`

### Mục tiêu mới từ user
- Chưa triển khai code ngay.
- Ưu tiên lập plan đầy đủ để rà soát `packages/spec` và chuẩn hóa workflow.

### Kết quả đã thực hiện
- Tạo active plan mới:
  - `plans/260223-1719-cafekit-spec-gap-analysis-and-roadmap/plan.md`
- Tạo 6 phase chi tiết ban đầu:
  1. `phase-01-baseline-audit-cafekit-spec.md`
  2. `phase-02-workflow-contract-decision.md`
  3. `phase-03-cli-installation-source-alignment.md`
  4. `phase-04-spec-workflow-test-review-integration.md`
  5. `phase-05-documentation-routing-version-sync.md`
  6. `phase-06-validation-and-release-readiness.md`
- Sau đó refactor phase 4 theo yêu cầu mới (drop `spec-impl`):
  - `phase-04-spec-flow-drop-spec-impl-and-test-review-integration.md`
- Đặt active plan bằng script:
  - `node .claude/scripts/set-active-plan.cjs <plan-dir>`

### Baseline phát hiện trong `packages/spec`
- `package.json`: `0.1.7`
- `README` badge/changelog: `0.1.5`
- installer banner: `v0.1.6`
- Mismatch copy list installer: có `docs_init.md/docs_update.md` trong `specFiles` nhưng Claude command source hiện dùng `docs.md`.

---

## 10) Cập nhật mới: chỉnh plan theo chuỗi spec đầy đủ

User yêu cầu plan phải bám đúng chuỗi:

`spec-init -> spec-requirements -> spec-design -> spec-tasks -> code -> test -> review`

### Kết quả cập nhật plan
- `plan.md` đã đổi description + Definition of Done theo chuỗi trên.
- `phase-02` đã thêm comparison rõ giữa:
  - `/plan` family (`plan`, `plan:fast`, `plan:hard`)
  - chuỗi `spec-*`

### Quyết định contract trong plan
- Chuỗi `spec-* + code/test/review` là **primary execution chain**.
- `/plan` là **optional pre-step** cho bài toán mơ hồ/kiến trúc lớn, không thay thế chuỗi `spec-*`.

---

## 11) Cập nhật mới: đào sâu cơ chế “plan active” (không tính spec chain)

### Cơ chế lõi
- Source of truth: session temp state `ck-session-{sessionId}.json` trong `/tmp`.
- Kích hoạt explicit bằng script:
  - `.claude/scripts/set-active-plan.cjs`
- Script ghi `activePlan` (absolute path) vào session state.

### Resolution logic
- Thứ tự resolve plan: `session -> branch` (trong `.claude/.ck.json`).
- `session` = Active (directive)
- `branch` = Suggested (hint)
- Suggested plan không được dùng như active plan.

### Hook/Context dependencies
- `SessionStart` (`session-init.cjs`) resolve plan, set env:
  - `CK_ACTIVE_PLAN`, `CK_SUGGESTED_PLAN`, `CK_REPORTS_PATH`, `CK_NAME_PATTERN`, `CK_VALIDATION_MODE`, ...
- `UserPromptSubmit` (`dev-rules-reminder.cjs`) inject `## Plan Context` vào prompt.
- `SubagentStart` (`subagent-init.cjs`) truyền Plan/Reports/Paths/Naming cho subagent.

### Command/Skill/Agent phụ thuộc plan context
- Commands: `plan.md`, `plan/fast.md`, `plan/hard.md`, `plan/parallel.md`, `plan/validate.md`.
- Agent: `.claude/agents/planner.md`.
- Skill: `.claude/skills/planning/SKILL.md` (+ references).

### Lưu ý kỹ thuật phát hiện
- Có dấu hiệu `Reports` path bị double-prefix trong injected context ở một số lần chạy (khả năng join absolute path thêm lần nữa).

---

## 12) Cập nhật mới: quyết định bỏ `spec-impl` khỏi flow chính

### User decision
- User yêu cầu bỏ `spec-impl` khỏi workflow.
- Flow mục tiêu chính thức:
  `spec-init -> spec-requirements -> spec-design -> spec-tasks -> code -> test -> review`

### Plan updates đã thực hiện
- Cập nhật `plan.md` để phản ánh chain mới (không dùng `spec-impl`).
- Tạo phase mới thay thế phase 4 cũ:
  - `phase-04-spec-flow-drop-spec-impl-and-test-review-integration.md`
- Đặt status phase 4 mới là `In Progress`.
- Đánh dấu hoàn thành bước quyết định chiến lược remove/deprecate trong todo phase 4.

### Lý do kỹ thuật
- `spec-*` nên tập trung lifecycle đặc tả.
- Execution chuyển về `code` command để tách lớp spec và lớp implement.
- Chất lượng giữ qua gates: `test -> review` sau coding.

---

## 13) Unresolved questions

1. Chọn strategy remove `spec-impl`: **hard remove ngay** hay **deprecate 1 phiên bản**?
2. Có cần mình cập nhật luôn command/docs antigravity mirrors cùng lúc với claude commands trong cùng một PR không?
3. Có muốn ưu tiên fix issue **double-prefix reports path** trước khi bắt đầu phase implement tiếp theo không?