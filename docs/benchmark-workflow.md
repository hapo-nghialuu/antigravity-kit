# B1 benchmark workflow

B1 là harness bounded cho baseline/treatment của CafeKit. Script chỉ đọc JSON, kiểm tra freeze/receipt, và tính summary. Script không gọi model, API, network, agent, hay tool workflow; không tự chạy task.

**Trạng thái hiện tại (2026-08-06):** chỉ có harness, schema, rubric, và template/fixture contract. Live baseline và treatment runs vẫn **pending**. **Live baseline and treatment runs remain pending.** Không có benchmark result nào được claim từ task này.

## Files

- `packages/spec/scripts/benchmark-workflow.mjs`: Node 18 CLI, standard library only.
- `packages/spec/benchmarks/corpus.schema.json`: JSON Schema cho corpus task metadata.
- `packages/spec/benchmarks/benchmark-config.example.json`: template invalid-by-design; không phải frozen experiment.
- `packages/spec/benchmarks/rubric.md`: blind adjudication và lane gates.

## Corpus contract

Corpus JSON có dạng:

```json
{
  "schema_version": "b1.v1",
  "status": "frozen",
  "corpus_id": "b1-2026-08",
  "tasks": [{
    "task_id": "sample-direct-01",
    "lane": "Direct",
    "prompt": "...",
    "repo_sample": "repo/name@sample",
    "acceptance": {"criteria": ["observable criterion"]},
    "risk": {"level": "low", "reasons": ["reversible"]}
  }]
}
```

Mỗi entry bắt buộc có `task_id`, `lane` (`Direct|Standard|Critical`), đúng một trong `prompt` hoặc `prompt_sha256`, `repo_sample`, và object `acceptance`/`risk` không rỗng. Corpus nên gồm task thật trên 1–2 repo/sample, task nhỏ reversible, Standard multi-file, và Critical negative controls. Không chỉ dùng installer/hook/skill edits.

`status: example_template` chỉ dành cho fixture/template. Không coi nó là corpus live.

## Freeze config

Mỗi arm có config riêng; summary nhận nhiều `--config` để so baseline và treatment. Freeze bắt buộc:

- `schema_version: "b1.v1"`, `status: "frozen"`, `experiment_id`.
- `arm: "baseline"|"treatment"`.
- `model.name`, `model.version`, `reasoning_effort`.
- `repo.identifier`, `repo.commit`, `repo.clean_initial_tree_sha`.
- `permissions_fingerprint`, `tool_availability_fingerprint`.
- `corpus_sha256` và `config_sha256`.
- `repeat_policy.repeats_per_task > 0`, `context_isolated: true`.
- Optional cost rates `input_usd_per_1k`, `output_usd_per_1k`; summary tính `estimated_cost_usd` từ token counts.

Hash dùng canonical JSON: object keys sort đệ quy, array giữ nguyên thứ tự, không whitespace. `corpus_sha256` hash toàn corpus. `config_sha256` hash config sau khi bỏ field `config_sha256`. Dùng prefix `sha256:` và 64 hex. Missing, placeholder (`<...>`, `{{...}}`, `example`, `TODO`, zero hash) hoặc status không phải `frozen` bị reject fail-closed.

Baseline là workflow hiện tại. Treatment là Direct/Standard/Critical thật sau B2–B5. Hai arm phải dùng cùng corpus, repeat policy, context isolation, và freeze metadata tương thích; không thay bằng prompt mock.

## Immutable receipt

Receipt là object append-only trong array hoặc `{ "receipts": [] }`. Các field bắt buộc:

```json
{
  "task_id": "sample-direct-01",
  "lane": "Direct",
  "arm": "baseline",
  "repeat": 1,
  "model": {"name": "model", "version": "version"},
  "reasoning_effort": "standard",
  "repo_commit": "abc1234",
  "clean_initial_tree_sha": "sha256:<64-hex>",
  "permissions_fingerprint": "sha256:<64-hex>",
  "tool_availability_fingerprint": "sha256:<64-hex>",
  "corpus_sha256": "sha256:<64-hex>",
  "config_sha256": "sha256:<64-hex>",
  "wall_ms": 1000,
  "input_tokens": 100,
  "output_tokens": 50,
  "context_loaded_tokens": 500,
  "tool_calls": 2,
  "subagent_calls": 0,
  "correctness": true,
  "regression": false,
  "unsupported_completion_claim": false,
  "user_corrections": 0,
  "useful_reviewer_findings": 1,
  "false_positive_reviewer_findings": 0,
  "evidence": {"artifact_ref": "reports/run-001.json", "command": "..."}
}
```

CLI reject duplicate `arm/task_id/repeat`, unknown task, invalid lane, missing/non-negative metrics, mismatched corpus/config/model/repo/permission/tool hashes, and missing or placeholder evidence. Receipt không được sửa để biến run fail thành pass; correction/adjudication ghi artifact mới.

## Commands

Validate one frozen arm:

```bash
node packages/spec/scripts/benchmark-workflow.mjs validate \
  --corpus /path/to/corpus.json \
  --config /path/to/baseline-config.json \
  --receipts /path/to/baseline-receipts.json
```

Validate both arms together:

```bash
node packages/spec/scripts/benchmark-workflow.mjs validate \
  --corpus /path/to/corpus.json \
  --config /path/to/baseline-config.json \
  --config /path/to/treatment-config.json \
  --receipts /path/to/receipts.json
```

Summary tách theo `arm` rồi `lane`, không collapse thành một score:

```bash
node packages/spec/scripts/benchmark-workflow.mjs summarize \
  --corpus /path/to/corpus.json \
  --config /path/to/baseline-config.json \
  --config /path/to/treatment-config.json \
  --receipts /path/to/receipts.json
```

Mỗi group có `p25`, `median`, `p75` cho wall time, token, context, tool/subagent calls, reviewer/correction counts, và estimated cost. `quality_rates` tách correctness, regression, unsupported completion claims, user-correction, useful/false-positive reviewer findings.

Không có receipts: summary trả `status: "exploratory/no-live-runs"`, `live_runs: false`. Có receipts nhưng thiếu arm/task tương ứng hoặc gate fail: `not-ready`. Rollout chỉ có thể `ready` khi hai arm có task set comparable và lane gates pass. Direct/Standard cần giảm median latency **và** estimated cost mà không tăng quality failures; Critical giữ hoặc tăng correctness, không tăng regression/unsupported claims.

## Repeat và blind adjudication

Chọn repeat policy trước freeze; mục tiêu 2–3 repeats/task. Một repeat gắn nhãn exploratory, không đủ để claim ổn định. Mỗi repeat context-isolated, không dùng output/memory run trước. Nếu khả thi, adjudicator nhận artifact đã ẩn arm; rubric chấm correctness, regression, unsupported completion claim, user correction, useful/false-positive reviewer findings riêng. Test pass là tín hiệu, không phải correctness tổng.

## Boundary của verification

`npm test` hoặc contract tests chỉ chứng minh script/schema contract và fixture math. Chúng **không** chứng minh workflow correctness, model quality, baseline/treatment parity, hay rollout readiness. Live runs phải được thực hiện riêng, ghi exact commands/artifacts, freeze metadata, immutable receipts, rồi adjudicate theo `rubric.md`.
