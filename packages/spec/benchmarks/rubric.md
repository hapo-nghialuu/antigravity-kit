# B1 adjudication rubric

Rubric này dùng cho adjudication độc lập, ưu tiên evidence cụ thể. Người adjudicator nên blind theo `arm` khi khả thi. Không cộng thành một vanity score.

## Trường receipt

- `correctness`: mọi acceptance criteria của task đạt, có artifact/evidence truy được. Test pass chỉ là một tín hiệu.
- `regression`: thay đổi làm hỏng behavior đã tồn tại, contract, test, hoặc surface không thuộc scope.
- `unsupported_completion_claim`: receipt/agent claim hoàn tất nhưng thiếu proof tương xứng blast radius, evidence không truy được, hoặc còn blocker chưa nêu.
- `user_corrections`: số lần người dùng phải sửa hướng, scope, nội dung, hoặc kết quả để task đạt acceptance.
- `useful_reviewer_findings`: finding reviewer đúng, actionable, và bắt lỗi thật trước ship.
- `false_positive_reviewer_findings`: finding reviewer không tái hiện được hoặc ngoài contract/scope.

Mỗi receipt phải ghi boolean quality fields và count nguyên không âm. Ghi failure category trong artifact adjudication; không suy ra correctness từ `npm test` một mình.

## Gate theo lane

### Direct

- Reversible, isolated, low-risk.
- `correctness = true`, `regression = false`, `unsupported_completion_claim = false`.
- Treatment phải giảm rõ median `wall_ms` và `estimated_cost_usd` so với baseline trên cùng task set; không tăng user-correction rate.

### Standard

- Multi-file hoặc workflow mặc định, có acceptance/review evidence.
- Cùng quality gate như Direct.
- Treatment chỉ đạt khi giảm rõ median latency và cost, đồng thời không tăng regression hoặc user correction. Review findings phải phân biệt useful và false-positive.

### Critical

- Auth/privacy, migration, public contract, cross-runtime, destructive hoặc rollback khó.
- Không được đánh đổi security/contract/evidence quality lấy latency/cost.
- Treatment phải có correctness không thấp hơn baseline, regression và unsupported-completion rate không cao hơn baseline; evidence phải truy được và reviewer finding không bị bỏ qua.

Nếu thiếu task tương ứng ở một arm, thiếu repeat, hash freeze không khớp, hoặc evidence placeholder/non-clean: `not-ready`, không extrapolate.

## Adjudication record

Ghi cho từng task/repeat: acceptance mapping, regression category, claim support, correction count, useful/false-positive findings, evidence/artifact reference, và quyết định. Giữ baseline/treatment độc lập; không đổi receipt sau khi freeze, chỉ append correction/adjudication artifact mới.
