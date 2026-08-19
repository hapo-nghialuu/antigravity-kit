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

Risk bất kỳ tự động nâng assurance tối thiểu từ `Routine` lên `Elevated` để có
inspection kỹ hơn. `Strict` là opt-in: chỉ chọn khi user/project policy yêu cầu
independent audit, hoặc user xác nhận một nhu cầu audit cụ thể của scope. Keyword
như auth/privacy/migration, nhãn high/critical, `Full`, hay sở thích của model
không tự bật `Strict`.

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
đúng syntax parser nhìn thấy (Criteria và Owner là bắt buộc):

```markdown
- **V1**: Criteria R1.1; Owner A-D-01; Decision refs D1, I1, C1; Method command `npm test`; Expected exit 0 và state đúng; Negative/failure input sai trả lỗi đã định nghĩa; Reachability/grounding entrypoint `src/entry.js` via A-D-01.
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

Sau khi chốt bytes cuối, lấy digest read-only (không hand-edit authority):

```bash
# Claude Code
node .claude/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest
# Codex (installed projection)
node .codex/scripts/validate-spec-output.cjs specs/<feature> --semantic-digest
```

Tạo `review.json` với đúng hai field `reviewed_criteria` và `counterexamples` rồi gọi atomic finalizer duy nhất — không tự ghi `semantic_model`, `validation.semantic_review`, hay `ready_for_implementation`:

```json
{
  "reviewed_criteria": ["R1.1"],
  "counterexamples": [{
    "criterion": "R1.1",
    "case_kind": "failure",
    "scenario": "Input sai tại boundary A-D-01.",
    "expected": "Trả lỗi đã định nghĩa, không đổi state.",
    "decision_refs": ["D1"],
    "verification_ref": "V1"
  }]
}
```

```bash
# Claude Code
node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result review.json
# Codex (installed projection)
node .codex/scripts/spec-readiness.cjs specs/<feature> --review-result review.json
```

Mỗi counterexample phải có đúng `criterion`, `case_kind`, `scenario`, `expected`, `decision_refs`, `verification_ref`, và mọi ref phải tồn tại trong `design.md`. Routine/Elevated không có reviewer ceremony. Strict cần event được host hook quan sát từ allowlisted reviewer capability; nếu host không cung cấp event này thì pause một lần và báo đúng blocker, không retry vòng reviewer, tự attestation, downgrade hay giả event. Đây là honest-agent guardrail, không phải host-attested evidence hay security boundary. Không persist reviewer identity vào semantic receipt. Không tạo `semantic-review.md`; nếu artifact hoặc topology đổi, digest cũ tự trở thành stale và phải review lại. Verify cả hai projection đã cài (`.claude` và `.codex/.agents`) chứ không giả định raw source path.

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

## Nguyên tắc ngữ nghĩa chung

Canonical: `src/claude/skills/specs/rules/design-principles.md` (retention: clock anchor/source/timezone/precision/comparator/inclusivity/boundary + wrong-clock/boundary counterexample; API: method/route/auth/headers/schema/response/error/idempotency) và `src/claude/skills/specs/references/review.md` (test ownership via file/artifact hoặc proof boundary, docs-only, two-review advisory, benchmark). Nhắc ngắn:

- Tuân canonical cho retention, API, test ownership, docs-only, review budget, benchmark targets (`≤10 phút` / `≤40 phút, ≤500K tokens` / 2 vòng), Direct/Compact và machine authority; không lặp nguyên đoạn dài. Vượt mục tiêu là tín hiệu tinh chỉnh, không phải để cắt gate; budget không thắng correctness.

## Quy tắc ngắn gọn

- Không tạo tasks/research/phase vì thói quen hoặc vì nhãn risk.
- Không coi plan verification là kết quả đã chạy.
- Không coi validator exit 0 là semantic proof.
- Không invent execution proof, approval, readiness hoặc audit status.
- Nếu implementer vẫn phải chọn giữa hai behavior hợp lý, spec chưa sẵn sàng.
