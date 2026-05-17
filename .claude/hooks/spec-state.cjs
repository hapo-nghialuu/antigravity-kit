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
          if (specData.status === 'in_progress' || specData.status === 'in-progress') {
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
  const taskRegistry = activeSpec.task_registry || {};
  const taskEntries = Object.entries(taskRegistry);
  const taskCounts = taskEntries.reduce((acc, [, task]) => {
    const status = task?.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const taskStatusByPath = new Map(taskEntries.map(([taskPath, task]) => [taskPath, task?.status || 'pending']));
  const nextUnblocked = taskEntries.find(([, task]) => {
    const status = task?.status || 'pending';
    const deps = Array.isArray(task?.dependencies) ? task.dependencies : [];
    return status === 'pending' && deps.every((dep) => taskStatusByPath.get(dep) === 'done');
  });

  // Format the output
  const lines = [];
  lines.push('');
  lines.push('### 🔴 URGENT SYSTEM TOLLGATE (STATE SYNC) 🔴');
  lines.push(`- **Active Feature:** \`${featureName}\``);
  lines.push(`- **Current Phase:** \`${phase}\``);
  if (taskEntries.length > 0) {
    lines.push(`- **Task Registry:** \`${taskEntries.length} total | ${(taskCounts.done || 0)} done | ${(taskCounts.in_progress || 0)} in_progress | ${(taskCounts.blocked || 0)} blocked | ${(taskCounts.pending || 0)} pending\``);
    if (nextUnblocked) {
      lines.push(`- **Next Unblocked Task:** \`${nextUnblocked[0]}\``);
    }
  }
  lines.push('');
  lines.push(`> BẮT BUỘC (MANDATORY): Nếu bạn vừa hoàn thành một bước, bạn KHÔNG ĐƯỢC báo cáo "Đã xong" ngay.`);
  lines.push(`> Bạn PHẢI sử dụng công cụ Edit để cập nhật trạng thái vật lý sau khi đã có bằng chứng verify thật (build/test/runtime/artifact), không phải chỉ vì code đã viết xong.`);
  lines.push(`> 1. Sửa file \`spec.json\` (status, phase/current_phase, timestamps, \`task_files\`, \`task_registry\`, validation state nếu có thay đổi).`);
  lines.push(`> 2. Chỉ khi verify xong mới sửa file \`tasks/task-*.md\` (status + tick '[x]' các sub-task và completion criteria liên quan).`);
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
