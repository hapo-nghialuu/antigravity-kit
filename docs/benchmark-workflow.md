# B1 benchmark workflow

B1 là harness bounded cho baseline/treatment của CafeKit. Script kiểm tra freeze/receipt, tính summary, và **thực thi có ghi nhận** qua runner-adapter tường minh. Script không tự gọi model/API/network; chỉ chạy runner do người dùng chỉ định qua hợp đồng argv rõ ràng.

**Trạng thái hiện tại (2026-08-07):** harness Track B đã triển khai — gồm freeze corpus/config, runner contract, thực thi ghi receipt bất biến, và validate/summarize honest (example_template và thiếu receipts không bao giờ báo live success). **Live baseline và treatment runs vẫn pending / chưa chạy (no-live-runs).** Không có benchmark result nào được claim từ task này.

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

Mỗi entry bắt buộc có `task_id`, `lane` (`Direct|Standard|Critical`), đúng một trong `prompt` hoặc `prompt_sha256`, `repo_sample`, và object `acceptance`/`risk` không rỗng. `prompt` phải là nội dung cụ thể, không chứa placeholder/template marker; dùng `prompt_sha256` nếu không muốn lưu prompt trong corpus. Corpus nên gồm task thật trên 1–2 repo/sample, task nhỏ reversible, Standard multi-file, và Critical negative controls. Không chỉ dùng installer/hook/skill edits.

`status: example_template` chỉ dành cho fixture/template. Validator từ chối receipt validation và live summary có receipts trên corpus này; fixture/live test phải dùng `status: frozen`.

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

Baseline là workflow hiện tại. Treatment là Direct/Standard/Critical thật sau B2–B5. Khi truyền cả hai config, mọi freeze metadata phải giống hệt nhau và `arm` là khác biệt có chủ đích duy nhất: gồm experiment/model/reasoning, repo identifier/commit/clean-tree hash, permissions/tool fingerprints, repeat policy, và cả cost rates nếu có. Không thay bằng prompt mock.

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
  "evidence": {
    "artifact_ref": "reports/run-001.json",
    "artifact_sha256": "sha256:<64-hex-raw-file-digest>",
    "command": "..."
  }
}
```

CLI reject duplicate `arm/task_id/repeat`, unknown task, invalid lane, missing/non-negative metrics, mismatched corpus/config/model/repo/permission/tool hashes, and missing or placeholder evidence. `artifact_ref` phải là path tương đối tới local file cạnh receipt bundle; validator đọc raw bytes và so khớp `artifact_sha256`, không truy cập network, URI, hay evidence ngoài local file. Receipt không được sửa để biến run fail thành pass; correction/adjudication ghi artifact mới.

## Runner contract & reproducible execution (B1 Track B harness)

Harness **không** tự gọi model/workflow ngầm. Mọi live execution phải đi qua **runner-adapter boundary** tường minh:

**Runner contract JSON** (`--runner FILE`):

```json
{
  "schema_version": "b1.v1",
  "command": ["node", "scripts/my-benchmark-runner.mjs"],
  "timeout_ms": 120000
}
```

- `command` là **argv array** rõ ràng, không phải shell string. `runner.shell` hoặc `command` dạng string bị reject fail-closed. Mỗi phần tử bị kiểm placeholder (`<...>`, `{{}}`, `example`, `replace_me`, …) và `missing or placeholder freeze field`.
- `timeout_ms` optional, >0, ≤600s.
- Thiếu `--runner`, runner invalid, hoặc shell ngầm → `benchmark validation failed: runner contract is required …` exit `2`.

**Thực thi (deterministic, fail-closed):**

- Freeze corpus/config/repo/permissions/tool metadata được kiểm trước khi spawn (mismatched `corpus_sha256`, `config_sha256`, `example_template` corpus, hoặc placeholder → reject).
- Mỗi `config.arm × task × repeat` được spawn **không shell** (`spawnSync` với `shell:false`, argv array), env được lọc allowlist (`PATH`, `HOME`, `TMPDIR`, … — không truyền secrets/API keys), `stdin` là JSON payload chứa `task_id/lane/arm/repeat`, `corpus_sha256/config_sha256`, `model/reasoning_effort`, `repo`, fingerprints, `prompt`/`prompt_sha256`, `acceptance/risk`, và `artifact_path` tuyệt đối trong bundle.
- Harness đo `wall_ms` (thời gian thực quanh spawn), capture `command` (joined argv), `exit` (exit code), và đọc **raw bytes** artifact do runner ghi tại `artifacts/<arm>/<task_id>__<repeat>.bin`, tính `artifact_sha256` (raw-byte digest) — không log secret hay dump log runner.
- Runner phải thoát `0` và in ra **stdout JSON duy nhất** với metrics:
  `input_tokens`, `output_tokens`, `context_loaded_tokens`, `tool_calls`, `subagent_calls` (non-negative int), `correctness`, `regression`, `unsupported_completion_claim` (boolean), `user_corrections`, `useful_reviewer_findings`, `false_positive_reviewer_findings` (non-negative int).
  Thiếu field, sai kiểu, exit non-zero, timeout, hoặc không tạo artifact → fail-closed, **không fabricate receipt** (partial run sẽ ghi `receipts.json` kèm `_incomplete:true` để debug nhưng `validate`/`summarize` vẫn báo `incomplete receipt matrix`).
- Mỗi runner invocation là `context_isolated`; không dùng output/memory của run trước. Artifact `artifact_ref` được ghi tương đối trong bundle (`artifacts/...`), validator kiểm `path escapes receipt bundle directory` cả trên path lẫn realpath (symlink traversal) và so `artifact_sha256` trên raw bytes.
- Sau khi chạy đủ ma trận, receipts được sắp deterministically (`arm/task_id/repeat`), kiểm `matrixCoverage` completeness (thiếu ô → `incomplete receipt matrix: missing …` exit 2), rồi ghi atomically `receipts.json` (`<out>/receipts.json` hoặc `--receipts FILE`). File này được `validate`/`summarize` tiêu thụ trực tiếp.

**Không có live runs:** khi chưa supply `--runner` và chưa có `receipts`, `summarize` vẫn trả `status: "exploratory/no-live-runs"`, `live_runs: false` — honest, không claim success. Đây là trạng thái hiện tại của repo (harness đã sẵn, baseline/treatment thực tế chưa chạy).

**An toàn artifact/secret:**

- `artifact_ref` phải relative, không URI, không absolute, không `..` escape; harness `validateArtifact` kiểm cả `path.relative` lẫn `realpath` để chặn symlink escape.
- Runner `command` là **argv array, `shell:false`**; nếu bất kỳ phần tử chứa secret-like assignment/flag (`OPENAI_API_KEY=...`, `--api-key=sk-...`, `--api-key <value>`, `--password=...`, `GITHUB_TOKEN=ghp_...`, `JWT_SECRET=ey...`…) harness **fail-closed** `secret-like assignment/flag is forbidden (Value not shown)` — không ghi receipt, không echo giá trị. Các tên an toàn như `tokenizer`, `api_key_file`, `token_path`, `*_label/*_hint/*_path/*_file` không bị false-positive (theo `scan-staged-secrets` safe-suffix).
- `stderr` khi runner exit non-zero được **redact** trước khi đưa vào error: các `name=value`, `flag value`, credential URL, PEM, và token high-entropy (`sk-…`, `ghp_…`, `ey…`) được thay bằng `[REDACTED]`; chỉ báo exit code + snippet đã redact, không rò rỉ `OPENAI_API_KEY`, `AWS_SECRET`, `GITHUB_TOKEN`, `password`, `JWT`.
- Không in secret value ra stdout/stderr; Runner env được allowlist (`PATH,HOME,TMPDIR,…`) để tránh rò rỉ `*_API_KEY`, `*_TOKEN`, … qua log.
- Không fabricate: mọi validation (placeholder, hash mismatch, partial matrix, artifact hash) fail-closed exit 2.

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

`validate` kiểm tra từng receipt và tính expected task/repeat matrix cho mọi arm đã cung cấp. Có receipts nhưng thiếu bất kỳ ô matrix nào thì thoát `2` với lỗi `incomplete receipt matrix`; chỉ matrix đầy đủ mới trả `status: "valid"`. `summarize` dùng cùng coverage nhưng không fail process khi matrix thiếu: trả `status: "not-ready"` để giữ chẩn đoán thiếu coverage.

Execute (reproducible, runner-adapter) — minimal CLI cho baseline và treatment arms (dùng lại cùng corpus/config freeze, chỉ khác runner/out):

```bash
# Baseline arm
node packages/spec/scripts/benchmark-workflow.mjs run \
  --corpus /path/to/corpus.json \
  --config /path/to/baseline-config.json \
  --runner /path/to/runner.json \
  --out /path/to/out-baseline

# Treatment arm (cùng corpus, config khác arm)
node packages/spec/scripts/benchmark-workflow.mjs run \
  --corpus /path/to/corpus.json \
  --config /path/to/treatment-config.json \
  --runner /path/to/runner.json \
  --out /path/to/out-treatment

# Hoặc chạy cả hai arm cùng lúc (một receipts bundle so sánh được)
node packages/spec/scripts/benchmark-workflow.mjs run \
  --corpus /path/to/corpus.json \
  --config /path/to/baseline-config.json \
  --config /path/to/treatment-config.json \
  --runner /path/to/runner.json \
  --out /path/to/out-both
# → ghi /path/to/out-both/receipts.json + artifacts/… ; có thể validate/summarize như trên
```

Thiếu `--runner`, runner placeholder, `example_template` corpus, `corpus_sha256`/`config_sha256` mismatch, hoặc artifact escape đều fail-closed exit 2. Partial matrix (runner crash/timeout hoặc thiếu repeat) cũng fail với `incomplete receipt matrix`.

Summary tách theo `arm` rồi `lane`, không collapse thành một score:

```bash
node packages/spec/scripts/benchmark-workflow.mjs summarize \
  --corpus /path/to/corpus.json \
  --config /path/to/baseline-config.json \
  --config /path/to/treatment-config.json \
  --receipts /path/to/receipts.json
```

Mỗi group có `p25`, `median`, `p75` cho wall time, token, context, tool/subagent calls, reviewer/correction counts, và estimated cost. `quality_rates` tách correctness, regression, unsupported completion claims, user-correction, useful/false-positive reviewer findings.

Không có receipts: summary trả `status: "exploratory/no-live-runs"`, `live_runs: false`. Có receipts nhưng thiếu arm/task/repeat tương ứng hoặc gate fail: `not-ready`. Rollout chỉ có thể `ready` khi hai arm có task set comparable và lane gates pass. Direct/Standard cần giảm median latency **và** estimated cost mà không tăng quality failures; Critical giữ hoặc tăng correctness, không tăng regression/unsupported claims/user corrections/false-positive reviewer finding rate, và không làm giảm useful reviewer finding rate. Các `quality_rates` useful/false-positive được so trực tiếp treatment với baseline.

## Repeat và blind adjudication

Chọn repeat policy trước freeze; mục tiêu 2–3 repeats/task. Một repeat gắn nhãn exploratory, không đủ để claim ổn định. Mỗi repeat context-isolated, không dùng output/memory run trước. Nếu khả thi, adjudicator nhận artifact đã ẩn arm; rubric chấm correctness, regression, unsupported completion claim, user correction, useful/false-positive reviewer findings riêng. Test pass là tín hiệu, không phải correctness tổng.

## Boundary của verification

`npm test` hoặc contract tests chỉ chứng minh script/schema contract và fixture math. Chúng **không** chứng minh workflow correctness, model quality, baseline/treatment parity, hay rollout readiness. Live runs phải được thực hiện riêng qua `run --runner` (ghi exact commands/artifacts, freeze metadata, immutable receipts), rồi adjudicate theo `rubric.md`. Hiện tại harness đã triển khai nhưng **chưa có live baseline/treatment run** — mọi `summarize` không receipts vẫn báo `exploratory/no-live-runs` trung thực.
