# Validation Log — Session 1 — 2026-06-15

**Trigger:** `/hapo:specs --validate rtk-installer-integration`
**Auto-decision:** Validate only (3 task files; no Red Team keywords; user explicit `--validate`)
**Questions asked:** 4
**Deterministic validator:** `node .claude/scripts/validate-spec-output.cjs specs/rtk-installer-integration` → **PASS**

## Questions & Answers

1. **[Architecture / External Source]** Prebuilt install source cho rtk binary (R2.2 + R5.2) — nguồn nào để `installRtkBinary` ưu tiên?
   - Options: `curl | sh từ github raw của rtk-ai` | `brew install rtk (macOS only)` | `Chỉ dùng cargo install rtk`
   - **Answer:** "chưa rõ, có cái nào đối ứng đa nền tảng OS không"
   - **Custom input:** user muốn hỏi về cross-OS option
   - **Rationale:** quyết định này ảnh hưởng đến implementation của `installRtkBinary` và risk của R5.2. Cần thông báo rằng spec đã chọn **best-effort priority order** (R2.2 đã ghi: (1) prebuilt install script, (2) `cargo install rtk` nếu có cargo, (3) skip+warn). Đây **đã là cross-platform** vì fall-through xuống cargo bắt được Linux/macOS khi prebuilt fail. Không cần thêm 1 platform layer. → **Treated as accepted with clarification**: design.md và R2 task đã cover cross-OS; không thêm OS-specific ưu tiên (giữ best-effort order).

2. **[Surface / Dry-run]** Trong `--dry-run`, `setupRtk` cần output gì khi phase bị skip?
   - Options: `Log 1 dòng ngắn` | `Log 1 dòng liệt kê đầy đủ hành động sẽ chạy` | `Không log, chỉ skip silently`
   - **Answer:** "Log 1 dòng liệt kê đầy đủ hành động sẽ chạy"
   - **Custom input:** none
   - **Rationale:** quyết định này tăng tính transparent khi dev test. Implement: nếu `ctx.dryRun && shouldRunRtk(ctx)===false` thì in `[dry-run] rtk setup skipped (would: check rtk binary, install if missing, run rtk init -g, check jq)`.

3. **[Data Model / Manifest]** Manifest key shape cho rtk action (R2.6 + idempotency) — ghi dạng nào?
   - Options: `{ "rtk": { "setupRan": true } }` | timestamp variant | `bỏ manifest`
   - **Answer:** `{ "rtk": { "setupRan": true } }` (Recommended)
   - **Custom input:** none
   - **Rationale:** đơn giản nhất, idempotent, đủ cho R2.6. Propagate vào R2 task Evidence.

4. **[Reliability / Timeout]** Timeout cho `cargo install rtk` (R2.2, R4.1) — đề xuất bao nhiêu ms?
   - Options: `600s` | `300s` | `Không set timeout (mặc định)`
   - **Answer:** "Không set timeout (mặc định)"
   - **Custom input:** none
   - **Rationale:** user chấp nhận rủi ro compile lâu. Non-fatal guarantee đã có (try/catch). Nếu muốn dừng sớm, cần Ctrl-C thủ công. Document risk này vào R2 task Risk Assessment — không set timeout để tránh rớt giữa chừng gây phải re-compile.

## Confirmed Decisions

- D1: `installRtkBinary` giữ best-effort priority order (prebuilt → cargo → skip+warn); đã cover cross-OS, không thêm ưu tiên OS-specific.
- D2: `--dry-run` của `setupRtk` in 1 dòng liệt kê các hành động sẽ chạy khi skip.
- D3: Manifest ghi `{ rtk: { setupRan: true } }`.
- D4: Không set timeout cho `cargo install rtk`; chỉ try/catch.

## Action Items

- [x] Cập nhật task-R2-01 Evidence: thêm line `[dry-run] rtk setup skipped (would: ...)` shape.
- [x] Cập nhật task-R2-01 Risk Assessment: ghi "no timeout for cargo install" risk.
- [x] Cập nhật design.md `installRtkBinary order`: thêm clarification "best-effort order đã cover cross-OS qua fall-through".
- [x] Cập nhật design.md `Dry-run behavior` subsection: nêu shape output 1 dòng.
- [x] Cập nhật design.md `Data Models`: manifest shape `{ rtk: { setupRan: true } }`.
- [x] Cập nhật spec.json `validation`: status, session_count, last_validated_at, validation_done timestamp.
- [x] Re-run validator → PASS, sau đó set `ready_for_implementation = true` (vì spec này < 5 task files, không bắt buộc Red Team).

## Impact on Tasks

- Task R1-01: không thay đổi (gate chỉ, không liên quan manifest/dry-run/timeout).
- Task R2-01: thêm 1 dòng Evidence (dry-run shape) + 1 dòng Risk Assessment (no-timeout note).
- Task R3-01: không thay đổi (chỉ strings, không liên quan quyết định trên).
- design.md: 3 subsection bổ sung (Dry-run behavior, install order clarification, manifest shape).
- spec.json: 4 field cập nhật (validation, timestamps, ready_for_implementation, updated_at).
