#!/usr/bin/env node
/**
 * Copyright (c) 2026 soft. MIT License.
 *
 * UserPromptSubmit Hook — spec-state.cjs
 * Implements: https://docs.anthropic.com/en/docs/claude-code/hooks
 *
 * Scans for an active spec in progress and dynamically injects
 * the State Sync (Tollgate) rule into the agent's context.
 *
 * Exit: 0 always (fail-open)
 */

try {
  const fs   = require('fs');
  const path = require('path');

  // ── Main ──────────────────────────────────────────────────────────────────

  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (!stdin) process.exit(0);

  const payload = JSON.parse(stdin);
  const cwd     = payload.cwd || process.cwd();

  // Read runtime configuration if exists
  let runtime = {};
  try {
    const p = path.join(cwd, '.claude', 'runtime.json');
    if (fs.existsSync(p)) runtime = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch { /* ignore */ }

  const baseDir   = process.env.PROJECT_ROOT || cwd;
  const specsPath = path.join(baseDir, runtime.paths?.specs || 'specs');

  if (!fs.existsSync(specsPath)) {
    process.exit(0);
  }

  // Find the active spec
  let activeSpec = null;
  let featureName = null;

  const entries = fs.readdirSync(specsPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const specFile = path.join(specsPath, entry.name, 'spec.json');
      if (fs.existsSync(specFile)) {
        try {
          const specData = JSON.parse(fs.readFileSync(specFile, 'utf8'));
          if (specData.status === 'in_progress') {
            activeSpec = specData;
            featureName = entry.name;
            break; // take the first active one
          }
        } catch { /* skip bad JSON */ }
      }
    }
  }

  if (!activeSpec) {
    process.exit(0); // No active spec, do nothing
  }

  const phase = activeSpec.current_phase || activeSpec.phase || 'unknown';
  
  // Format the output
  const lines = [];
  lines.push('');
  lines.push('### 🔴 URGENT SYSTEM TOLLGATE (STATE SYNC) 🔴');
  lines.push(`- **Active Feature:** \`${featureName}\``);
  lines.push(`- **Current Phase:** \`${phase}\``);
  lines.push('');
  lines.push(`> BẮT BUỘC (MANDATORY): Nếu bạn vừa hoàn thành một bước, bạn KHÔNG ĐƯỢC báo cáo "Đã xong" ngay.`);
  lines.push(`> Bạn PHẢI sử dụng công cụ Edit để cập nhật 2 tầng trạng thái dưới đây trước khi kết thúc lượt chat:`);
  lines.push(`> 1. Sửa file \`spec.json\` (chuyển đổi status, phase tương ứng).`);
  lines.push(`> 2. Sửa file \`tasks/task-*.md\` (chuyển 'pending' thành 'completed' và tick '[x]' các sub-task).`);
  lines.push(`> 3. NẾU VỪA HOÀN THÀNH 1 TASK CÓ SỬA SOURCE CODE, BẮT BUỘC cập nhật ngay tài liệu trong \`docs/\` (\`system-architecture.md\` hoặc Changelog) cho đồng bộ.`);
  lines.push(`> CẤM VI PHẠM LUẬT TOLLGATE NÀY NHẰM ĐẢM BẢO TÍNH ĐỒNG BỘ CỦA HỆ THỐNG.`);
  lines.push('');

  console.log(lines.join('\n'));
  process.exit(0);

} catch (e) {
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'spec-state', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
