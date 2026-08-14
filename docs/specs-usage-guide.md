# Hướng dẫn sử dụng `hapo:specs` — semantic kernel v2.1

`spec.json` là machine authority. `requirements.md`, `design.md`, research và
task Markdown chỉ là human projections. Host state chỉ xác nhận authority và
integrity, không chứa product semantics. Claude Code và Codex là hai acceptance
target chính của v2.1.

## Chọn đúng mức làm việc

Specs v2 tách hai quyết định độc lập:

| Trục | Giá trị | Ý nghĩa |
|---|---|---|
| `planning_depth` | `None`, `Compact`, `Full` | Cần bao nhiêu durable authoring. |
| `assurance_level` | `Routine`, `Elevated`, `Strict` | Cần review/counterexample sâu đến đâu. |

Canonical authoring chỉ cung cấp hai axis, `classified_minimum`, `risks`; policy
`version` nhận diện v2.1. Lane, label và ceremony đều derive. Phải reclassify
trước lần persist đầu tiên. Sau persistence, baseline cùng feature là monotonic:
không hỗ trợ downgrade cho đến khi có trusted issuer. Baseline không lây
ceremony sang feature khác và độc lập với project minimum. Risk không tự tạo
research, task, phase hoặc reviewer.

## Các lệnh chính

```text
/hapo:specs "<mô tả>"             # Claude Code
$hapo-specs "<mô tả>"             # Codex
/hapo:specs --validate <feature>
/hapo:specs --status
/hapo:specs --archive
```

`--auto` có thể author, validate và set technical readiness khi mọi gate đã
pass, rồi phải dừng trong Specs. Nó không gọi Develop. Implementation luôn bắt
đầu bằng một lần gọi Develop mới và explicit.

## Output mặc định

`None` không tạo durable spec. `Compact` và `Full` đều bắt đầu bằng core:

```text
specs/<feature>/
├── spec.json
├── requirements.md
└── design.md
```

Artifact tùy điều kiện:

- `research.md`: chỉ khi có uncertainty hoặc grounding cần lưu bền vững;
- `tasks/task-R{N}-{SEQ}-<slug>.md`: chỉ khi có distinct ownership, dependency,
  durable transition, separate proof hoặc parallel coordination;
- phase: chỉ là metadata gọn trong `spec.json` cho complex Full task graph;
  không tạo `phase-*.md`;
- translation mirror: tùy chọn, chỉ để đọc; canonical artifacts vẫn là nguồn
  dùng để validate và implement.

Spec authoring không tạo `feature-receipt.md`, task receipt, execution verdict,
Base/Head hoặc provenance. Task chỉ chứa `Verification Plan`; proof thật được
ghi ở execution closeout.

## Nội dung một spec tốt

- `requirements.md`: outcomes, scope/non-goals, numeric `RN.M`, behavior và
  negative/error outcome đo được. User Story/scenario/NFR chỉ thêm khi giúp loại
  bỏ ambiguity.
- `design.md`: boundary, typed source anchors, decisions/invariants, named
  contracts và verification. Contract được định nghĩa một lần; task chỉ reference
  ID.
- task tùy chọn có đúng bảy section: `Outcome`, `Scope`, `Anchors and
  Ownership`, `Changes`, `Acceptance`, `Dependencies`, `Verification Plan`;
- bảng ownership duy nhất là `ID | Type | Target | Role | Access | Action`.

`design.md` có đúng một section `Verification Definitions`. Mỗi dòng V dùng
đúng syntax parser nhìn thấy:

```markdown
- **V1**: Criterion R1.1; Decision refs D1, I1, C1; Method `npm test`; Expected exit 0 và state đúng; Negative/failure input sai trả lỗi đã định nghĩa; Reachability/grounding `src/entry.js` gọi boundary A-D-01 và anchors đều ground.
```

Không đổi thành table hoặc `### V1`. Mỗi `RN.M` có đúng một implementation
owner. Với proof boundary, subject implement criterion; verifier reference V ID,
own proof criterion/artifact riêng và không lặp Acceptance của subject.

Task topology chỉ lấy authority từ `spec.json.coordination.boundaries` typed:
`ownership`, `dependency`, `transition`, `proof`, `parallel`. `(P)`,
`task_triggers`, `Related Files`, keyword hoặc prose chung không có authority.

Validator structural exit 0 không tự chứng minh semantic quality. Trước
readiness vẫn phải review toàn consistency graph và thử counterexample có thể
khiến hai implementer chọn behavior khác nhau.

Sau khi chốt bytes cuối, lấy digest read-only:

```bash
node .claude/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest
```

Ghi digest, toàn bộ exact `RN.M` và counterexample vào
`validation.semantic_review`. Mỗi counterexample có đúng `criterion`,
`case_kind`, `scenario`, `expected`, `decision_refs`, `verification_ref`, và
mọi ref phải tồn tại trong `design.md`. Routine/Elevated không có reviewer
ceremony. Strict cần event được host hook quan sát từ allowlisted reviewer
capability; đây là honest-agent guardrail, không phải host-attested evidence hay
security boundary. Không persist reviewer identity vào semantic receipt.
Không tạo `semantic-review.md`; nếu artifact hoặc topology đổi, digest cũ tự
trở thành stale và phải review lại.

Grounding là gate bắt buộc trước readiness: validator/grounder recompute
path/symbol/command/reachability trên bytes hiện tại và không tạo thêm receipt.
Trong task anchor table: `read/read` đòi target tồn tại; `write/modify|delete`
đòi target tồn tại và task own; `write/create` đòi target chưa tồn tại nhưng
parent/boundary đã ground.

## Authoring state và handoff

Authoring state chỉ là `draft`, `validated`, hoặc `absent`; không gọi chúng là
approval. Legacy approval fields chỉ được đọc tương thích và inert. Pause giữ
`ready_for_implementation=false`, không tạo execution receipt hoặc bịa proof.

Chỉ handoff khi final artifacts, grounding, semantic review và deterministic
validation đều hoàn tất:

```text
/hapo:develop <feature>             # Claude Code
$hapo-develop <feature>             # Codex
```

Trong execution, task proof nằm ở `receipts/<task-basename>.md` và
`feature-receipt.md` chỉ được tạo một lần cho final integration closeout.

## Translation mirror

Nếu bật mirror, bản dịch nằm tại `specs/<feature>/i18n/<lang>/`, có marker
`<!-- TRANSLATION MIRROR — reference only -->`, và được đồng bộ từ canonical
artifacts. Không sửa mirror như source of truth; validator và Develop chỉ dùng
canonical tree.

## Quy tắc ngắn gọn

- Không tạo tasks/research/phase vì thói quen hoặc vì nhãn risk.
- Không coi plan verification là kết quả đã chạy.
- Không coi validator exit 0 là semantic proof.
- Không invent execution proof, approval, readiness hoặc audit status.
- Nếu implementer vẫn phải chọn giữa hai behavior hợp lý, spec chưa sẵn sàng.
