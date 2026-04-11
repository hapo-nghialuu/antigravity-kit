#!/usr/bin/env node
/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * SessionStart Hook — docs-sync.cjs
 *
 * Kiểm tra phân vùng docs/ và so chiếu với Source Code.
 * Nếu chưa có docs nhưng có code -> Ép tạo docs.
 * Nếu đã có docs và code thay đổi (Git Hash) -> Ép update docs.
 *
 * Exit: 0 always (fail-open)
 */

try {
  const fs = require('fs');
  const path = require('path');
  const { execSync } = require('child_process');

  // Đọc stdin theo chuẩn hook
  const stdin = fs.readFileSync(0, 'utf8').trim();
  const payload = stdin ? JSON.parse(stdin) : {};
  const cwd = payload.cwd || process.cwd();

  const docsDir = path.join(cwd, 'docs');
  
  // Xác định dự án đã có cốt lõi code hay chưa?
  const hasCode = fs.existsSync(path.join(cwd, 'src')) ||
                  fs.existsSync(path.join(cwd, 'app')) ||
                  fs.existsSync(path.join(cwd, 'lib')) ||
                  fs.existsSync(path.join(cwd, 'package.json')) ||
                  fs.existsSync(path.join(cwd, 'index.js')) ||
                  fs.existsSync(path.join(cwd, 'main.py'));

  if (!hasCode) {
    process.exit(0);
  }

  const lines = [];

  // Trường hợp 1: Có Code nhưng chưa có thư mục docs
  if (!fs.existsSync(docsDir)) {
    lines.push('');
    lines.push('### 🔴 URGENT SYSTEM ACTION: MISSING DOCUMENTATION 🔴');
    lines.push(`> BẮT BUỘC (MANDATORY): Hệ thống phát hiện dự án đã có Source Code nhưng thư mục \`docs/\` chưa tồn tại.`);
    lines.push(`> Nhiệm vụ ĐẦU TIÊN của bạn trong session này là đọc hiểu mã nguồn hiện tại và tạo ra các tài liệu tiêu chuẩn:`);
    lines.push(`> 1. \`docs/system-architecture.md\` (Kiến trúc hệ thống, phân tích flow)`);
    lines.push(`> 2. \`docs/project-overview-pdr.md\` (Tổng quan, mục tiêu, tính năng)`);
    lines.push(`> 3. Khởi tạo file hidden \`docs/.sync_hash\` để theo dõi cập nhật.`);
    lines.push(`> `);
    lines.push(`> LƯU Ý BẮT BUỘC: Bạn phải chạy lệnh Git này trong Terminal để lấy Hash Code mới nhất: \`git log -1 --format="%H" -- . ":(exclude)docs"\``);
    lines.push(`> Sau đó ghi chuẩn giá trị Hash đó vào file \`docs/.sync_hash\`.`);
    lines.push('');
  } 
  // Trường hợp 2: Có Code, đã có Docs. Kiểm tra Continuous Sync
  else {
    try {
      // Lấy hash của lần thay đổi SOURCE CODE gần nhất (Bỏ qua những commit chỉ sửa docs)
      const currentHash = execSync('git log -1 --format="%H" -- . ":(exclude)docs"', { 
        cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] 
      }).trim();

      if (currentHash) {
        const syncTrackingFile = path.join(docsDir, '.sync_hash');
        const lastSyncHash = fs.existsSync(syncTrackingFile) 
          ? fs.readFileSync(syncTrackingFile, 'utf8').trim() 
          : '';

        if (lastSyncHash !== currentHash) {
          lines.push('');
          lines.push('### 🔄 CONTINUOUS DOCS SYNC REQUIRED 🔄');
          lines.push(`> Source Code vừa có sự thay đổi mới (Git Hash: \`${currentHash}\`) kể từ lần đồng bộ Docs cuối cùng (\`${lastSyncHash || 'Chưa gán'}\`).`);
          lines.push(`> YÊU CẦU TRƯỚC KHI LÀM THÊM TÍNH NĂNG:`);
          lines.push(`> 1. Rà soát file bị thay đổi gần đây (dùng \`git diff ${lastSyncHash} ${currentHash}\` hoặc \`git log\`).`);
          lines.push(`> 2. Cập nhật lại \`docs/system-architecture.md\` hoặc các chuẩn code nếu cần thiết.`);
          lines.push(`> 3. Cập nhật Changelog (nhật ký thay đổi).`);
          lines.push(`> 4. KHI HOÀN TẤT, BẠN PHẢI GHI ĐÈ GIÁ TRỊ SAU: \`${currentHash}\` VÀO FILE \`docs/.sync_hash\` ĐỂ CHỐT TRẠNG THÁI HIỆN TẠI.`);
          lines.push('');
        }
      }
    } catch (e) {
      // Git chưa init hoặc chưa có commit nào thì im lặng fail-open
    }
  }

  if (lines.length > 0) {
    console.log(lines.join('\n'));
  }

  process.exit(0);

} catch (e) {
  // Ghi log lỗi ẩn danh nếu sập hook
  try {
    const fs = require('fs'), p = require('path');
    const d = p.join(__dirname, '.logs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.appendFileSync(p.join(d, 'hook-log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), hook: 'docs-sync', status: 'crash', error: e.message }) + '\n');
  } catch (_) {}
  process.exit(0);
}
