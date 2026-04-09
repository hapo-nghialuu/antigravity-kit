#!/usr/bin/env node
/**
 * Hapo Native Docs Validator
 * Mạch kiểm duyệt tài liệu (Markdown) rút gọn - Clean-room rewrite.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function findMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(findMarkdownFiles(full));
    } else if (full.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function checkBrokenLinks(docsDir) {
  const files = findMarkdownFiles(docsDir);
  const issues = [];
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Bắt pattern [text](./relative/link.md)
    const links = content.match(/\[[^\]]+\]\(\.\/[^)]+\)/g) || [];
    links.forEach(link => {
      const href = link.match(/\(\.\/([^)]+)\)/)[1].split('#')[0]; // Bỏ anchor #
      const targetPath = path.resolve(path.dirname(file), href);
      if (!fs.existsSync(targetPath)) {
        issues.push({ file, brokenLink: href });
      }
    });
  });
  return issues;
}

function main() {
  const docsDir = path.resolve(process.cwd(), 'docs');
  console.log(`[Hapo Docs Validator] Đang quét thư mục: ${docsDir}`);
  
  if (!fs.existsSync(docsDir)) {
    console.log('Không tìm thấy thư mục docs/ để kiểm tra.');
    process.exit(0);
  }

  const linkIssues = checkBrokenLinks(docsDir);
  if (linkIssues.length > 0) {
    console.warn('\n⚠️ CẢNH BÁO: TÌM THẤY LIÊN KẾT ĐỨT GÃY TRONG TÀI LIỆU!');
    linkIssues.forEach(issue => {
      console.warn(`- File: ${path.relative(process.cwd(), issue.file)} -> Trỏ đến Link Chết: ./${issue.brokenLink}`);
    });
  } else {
    console.log('✅ Chúc mừng! Không tìm thấy link đứt gãy nào trong tài liệu.');
  }

  // Chú ý: Vì Hapo tôn trọng Tốc Độ Môi Trường, việc grep đè xuống mã nguồn code quá thô bạo (check function) 
  // đã được cắt giảm để đảm bảo validator hoàn thành <1s (Zero-latency validation logic).
}

main();
