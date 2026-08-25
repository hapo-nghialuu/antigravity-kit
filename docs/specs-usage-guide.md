# Hướng dẫn sử dụng `hapo:specs` — process-first planning

`hapo:specs` biến một ý tưởng thành một packet có thể đọc, review và thực thi
bằng Markdown thuần. Layout chính là `specs/<feature>/plan.md` kèm các file
`task-NN-<slug>.md` nằm cạnh nó. Luồng mới không dạy registry cũ; phần đó chỉ
còn ở legacy adapter.

## Routing thích ứng theo risk

Luôn phân loại material risk trước khi chọn workflow; cách người dùng gọi một
việc là “nhỏ” hoặc “routine” không được hạ risk floor đã quan sát.

| Route | Điều kiện |
|---|---|
| Làm trực tiếp | Chỉ khi cause và change đều clear, isolated, reversible, `routine`, và likely giới hạn trong một hoặc hai file |
| C1/C2 | Còn user-owned observable choice; hỏi và giữ phần bị ảnh hưởng ở `blocked` |
| Brainstorm | Có material competing technical designs, sau khi user-owned choices đã chốt |
| Một Specs packet | Material work không đủ điều kiện Direct và không phải Brainstorm-only exploration |
| Split Specs | Có từ ba independent subsystem trở lên; mỗi subsystem có outcome, boundary và verification/deployment path tự đi qua lifecycle |

Risk floor tối thiểu:

- `critical`: auth/secrets/privacy; destructive/irreversible hoặc nguy cơ mất,
  hỏng dữ liệu; money/privilege/safety; production-state mutation.
- `elevated`: cross-component contract, compatibility, concurrency, external
  integration, hoặc installed/runtime behavior.
- `routine`: chỉ khi không có signal `critical` hay `elevated`.

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

## Coverage profile

Một Specs route giữ đúng một bảng canonical trong `plan.md`, mỗi row là một
externally observable outcome:

| ID | Outcome | Change kinds | Material surfaces | Ambiguity/action | Risk/evidence | Required proof |
|---|---|---|---|---|---|---|
| CP-01 | Kết quả người dùng hoặc hệ thống quan sát được | Mọi kind liên quan | Mọi surface material | State và action | Risk floor và evidence | Tập `source`/`installed`/`live` cần chứng minh |

Change kinds là tập nhiều giá trị; kind hoặc surface chưa có tên dùng
`other:<verbatim>` thay vì bị bỏ qua. Mỗi task có `## Coverage` và chỉ tham
chiếu các `CP-NN` mình sở hữu; không copy profile sang task. Obligations chỉ
union trong affected rows/tasks. Sau scope, outcome, criteria, ownership,
dependency, risk hoặc proof delta đã được chấp nhận, rederive affected CP rows
trước khi derive task status.

## Ambiguity và task status

| State | Hành động bắt buộc | Hệ quả status |
|---|---|---|
| `none` | Tiếp tục | Có thể vào `pending` khi các blocker khác đã đóng |
| `examples-needed` | Thêm ví dụ chỉ để làm rõ rule đã quyết định; nếu ví dụ đổi observable behavior thì promote sang `decision-needed` | Không tự chọn product outcome |
| `decision-needed` | Hỏi người dùng tại C1/C2 | Affected task giữ `blocked` |
| `design-needed` | Sau khi user-owned decision đã chốt, chuyển material competing designs sang Brainstorm | Chưa author implementation choice trong task |

`pending` nghĩa là semantic contract và reachability đã biết, chưa có nghĩa
proof đã chạy. `done` chỉ hợp lệ khi required execution evidence hiện tại PASS
và inline Receipt canonical đầy đủ.

### `task-NN-<slug>.md`

- Một `Status:` duy nhất.
- Một outcome, một owner, một verification plan.
- Một `## Coverage` tham chiếu chính xác các `CP-NN` của task.
- Một canonical `## Receipt` ở cuối file khi task đã done.

## Proof lifecycle

`Required proof` trong CP row là planned level set, không phải evidence đã chạy.
Với từng level cần thiết, task map named probe và reachability tương ứng; một
command có thể chạy nhiều level probes nếu từng probe được nêu rõ.

- `UNKNOWN` command/caller/environment reachability giữ task ở `blocked`.
- Known nhưng chưa chạy required proof vẫn có thể ở `pending`.
- Missing, failed hoặc unavailable required evidence chặn `done` và C3.
- `source`, `installed` và `live` độc lập; PASS ở level này không promote level
  khác. Source/static checks chỉ chứng minh written contract, không chứng minh
  live-model adherence.

## Structural speed và wall-clock

Direct gate, một CP row cho mỗi outcome, affected-row union, giới hạn paper
review và split theo independent subsystem giúp giảm ceremony theo cấu trúc.
Chúng không phải số đo thời gian. CafeKit chưa đo wall-clock generation time và
không công bố SLA cho Specs. Việc đo thời gian thuộc packet riêng
`specs/specs-session-timing-benchmark/plan.md`; kết quả chỉ được ghi sau một
benchmark run có evidence.

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
