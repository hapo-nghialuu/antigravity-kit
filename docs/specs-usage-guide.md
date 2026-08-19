# Hướng dẫn sử dụng `hapo:specs` — process-first planning

`hapo:specs` biến một ý tưởng thành một packet có thể đọc, review và thực thi
bằng Markdown thuần. Layout chính là `specs/<feature>/plan.md` kèm các file
`task-NN-<slug>.md` nằm cạnh nó. Luồng mới không dạy registry cũ; phần đó chỉ
còn ở legacy adapter.

## Khi nào dùng Specs

| Khi nào | Dùng gì |
|---|---|
| Chỉ 1-2 file, rõ nguyên nhân, reversible, low-risk | Làm trực tiếp |
| Chạm nhiều component, có lựa chọn product/architecture, hoặc cần nhiều task | Dùng `hapo:specs` |
| Cần hỏi scope, evidence, hoặc review trước khi code | Dùng `hapo:specs` |

## Ba cổng quyết định

| Cổng | Khi nào | Quyết định của người dùng |
|---|---|---|
| C1 — Scope | Trước khi viết plan | EXPAND, KEEP hoặc CUT |
| C2 — Findings | Sau adversarial review | Accept, reject, hoặc revise từng finding |
| C3 — Done | Sau execution | Chấp nhận completion từ output và receipts hiện tại |

Chỉ hỏi ở ba cổng này. Nếu evidence mới làm scope sai, quay lại C1 thay vì tự
nới phạm vi âm thầm.

## Luồng chính

1. Scout repo trước khi viết kế hoạch: tìm code đã có, callers, tests, exports,
   file thật và bất kỳ điểm tái sử dụng nào.
2. Viết `plan.md` như một index ngắn: quyết định C1, acceptance criteria kiểu
   EARS, explicit exclusions, và bảng task.
3. Review adversarially từ fresh context, dedupe finding, cap danh sách ở 15,
   và dừng sau tối đa hai vòng giấy.
4. Execute một task chưa bị block tại một thời điểm: đổi `Status:` sang
   `in_progress`, implement đúng Outcome và Acceptance, rồi chạy verification
   thật.
5. Ghi inline canonical `## Receipt`, đổi `Status:` sang `done`, rồi sync trạng
   thái hiện tại thay vì mô tả điều chưa xảy ra.

## Packet chuẩn

```text
specs/<feature>/
├── plan.md
├── task-01-<slug>.md
└── task-NN-<slug>.md
```

### `plan.md`

- C1 scope decision và explicit exclusions.
- EARS acceptance criteria có ID ổn định.
- Bảng task: mỗi criterion phải map tới ít nhất một task và một proof command.

### `task-NN-<slug>.md`

- Một `Status:` duy nhất.
- Một outcome, một owner, một verification plan.
- Một canonical `## Receipt` ở cuối file khi task đã done.

### Receipt canonical

````markdown
## Receipt

Verification: PASS
Command: pnpm test -- --filter example
Exit: 0
Base: <runtime-derived base commit>
Head: <runtime-derived tree digest or commit>
```text
$ pnpm test -- --filter example
PASS example.test.ts
Tests: 3 passed, 3 total
```
````

Receipt không hợp lệ nếu thiếu fenced output, thiếu `Exit: 0`, thiếu `Base` /
`Head`, có placeholder, hoặc chỉ là một câu PASS rỗng.

## Develop và Sync

- `hapo:develop` chọn một task chưa block trong packet hiện tại, set
  `Status: in_progress`, implement, verify và dừng sau task đó.
- `hapo:sync` chỉ cập nhật observed state của task file và receipt.
- `sync-finalize` chỉ dùng để promote một task flash/unverified sau khi có fresh
  canonical PASS.

## Legacy compatibility

Nếu một feature đã có `spec.json`, nested `tasks/task-R*.md`, hoặc receipt
riêng, hãy giữ nó trên legacy adapter đang cài sẵn. Phần legacy có thể tiếp tục
giữ `spec.json`, `task_registry`, `planning_depth`, `assurance_level`, `lane`,
`execution_tier`, và `semantic_model`, nhưng các field này không thuộc v3
packet mới.

## Tham chiếu

- Mẫu packet và receipt: `packages/spec/src/claude/skills/specs/references/templates.md`
- Quy tắc review: `packages/spec/src/claude/skills/specs/references/review.md`
