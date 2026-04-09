#!/usr/bin/env node
/**
 * Hapo Native Docs Fetcher
 * Kéo llms.txt từ context7.com (Gộp chung tư duy detect và fetch từ CK)
 * Usage: node docs-fetch.js "Làm sao dùng Next.js App router"
 */

const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Hapo-Docs-Fetcher' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', () => resolve({ status: 500, data: null }));
  });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('[Hapo Docs Fetcher] Lỗi: Cần truyền vào truy vấn. (Ví dụ: node docs-fetch.js "next.js router")');
    process.exit(1);
  }

  const query = args.join(' ').toLowerCase();

  // Smart Detection (Trích xuất từ khóa thư viện)
  const knownLibs = {
    'next.js': 'vercel/next.js',
    'nextjs': 'vercel/next.js',
    'react': 'facebook/react',
    'shadcn': 'shadcn-ui/ui',
    'shadcn/ui': 'shadcn-ui/ui',
    'astro': 'withastro/astro',
    'remix': 'remix-run/remix'
  };

  let targetRepo = '';
  for (const [key, repo] of Object.entries(knownLibs)) {
    if (query.includes(key)) {
      targetRepo = repo;
      break;
    }
  }

  // Fallback bóc chữ cuối nếu ghi "docs for abc"
  if (!targetRepo) {
    const fallbackMatch = query.match(/for ([a-z0-9-]+)/);
    if (fallbackMatch) targetRepo = `websites/${fallbackMatch[1]}`;
    else targetRepo = `websites/${query.split(' ')[0]}`; // Lấy đại chữ đầu tiên
  }

  const url = `https://context7.com/${targetRepo}/llms.txt`;
  console.log(`[Hapo Docs Fetcher] Đang truy xuất tài liệu từ Tàng Kinh Các: ${url}`);

  const fallbackUrl = `https://raw.githubusercontent.com/${targetRepo}/main/README.md`;

  const result = await fetchUrl(url);

  if (result.status === 200 && result.data) {
    console.log('\n--- KẾT QUẢ ĐÃ LẤY ĐƯỢC ---');
    // Trích đoạn 2000 ký tự đầu để tránh vỡ buffer Terminal
    console.log(result.data.substring(0, 3000));
    console.log('\n(Đã cắt bớt để nén Token LLM)');
  } else {
    console.warn(`[!] Không tìm thấy cấu trúc llms.txt tại: ${url}`);
    console.log(`[+] Thử dội bom Fallback kéo README.md gốc từ Github: ${fallbackUrl}`);
    const fbResult = await fetchUrl(fallbackUrl);
    if (fbResult.status === 200 && fbResult.data) {
      console.log('\n--- KẾT QUẢ (README.md) ---');
      console.log(fbResult.data.substring(0, 3000));
    } else {
      console.error('\n[LỖI] Tìm kiếm thất bại. Không kiếm được sách về thư viện này. Hãy nhờ Agent dùng công cụ WebSearch trên DuckDuckGo nhé!');
      process.exit(1);
    }
  }
}

main();
