#!/usr/bin/env node
/**
 * Hapo Native Browser Multi-Tool (Puppeteer Bundler)
 * Gồm: screenshot, aria-snapshot, và console logs. Gọn gàng nén trong 1 script.
 * 
 * Usage:
 *   node browser-tool.cjs --action screenshot --url http://localhost:3000 --output ./shot.png
 *   node browser-tool.cjs --action console --url http://localhost:3000
 *   node browser-tool.cjs --action aria --url http://localhost:3000
 */

const fs = require('fs');
const path = require('path');

let puppeteer;
try {
  puppeteer = require('puppeteer-core');
} catch (e) {
  try {
    puppeteer = require('puppeteer');
  } catch (err) {
    console.error('\n[LỖI] Hapo Browser Tool yêu cầu gói thư viện Puppeteer!');
    console.error('Do tôn trọng dung lượng nhẹ (Clean-room), Hapo không tự nhồi nhét Puppeteer vào dự án.');
    console.error('-> HÃY BẢO LLM (hoặc Dev) CHẠY LỆNH: `npm i -D puppeteer` TRONG PROJECT TRƯỚC KHI DÙNG CÔNG CỤ NÀY!\n');
    process.exit(1);
  }
}

// Hàm phân tích Argument đơn giản
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { action: 'screenshot', url: '', output: './hapo-debug.png' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--action') config.action = args[++i];
    if (args[i] === '--url') config.url = args[++i];
    if (args[i] === '--output') config.output = args[++i];
  }
  return config;
}

async function getBrowser() {
  // Ưu tiên nỗ lực dùng Chromium của máy nếu xài puppeteer-core (Edge / Chrome)
  let executablePath = process.env.CHROME_BIN || process.env.PUPPETEER_EXECUTABLE_PATH;
  
  if (!executablePath && puppeteer.executablePath) {
    try {
      executablePath = puppeteer.executablePath();
    } catch(e) {}
  }

  // Fallback map cơ bản cho Mac/Linux
  if (!executablePath) {
    if (process.platform === 'darwin') executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    else if (process.platform === 'linux') executablePath = '/usr/bin/google-chrome';
    else if (process.platform === 'win32') executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  }

  console.log(`[Hapo Browser] Khởi tạo trình duyệt tại: ${executablePath}`);
  
  return puppeteer.launch({
    executablePath: executablePath || undefined,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

async function takeScreenshot(page, output) {
  console.log(`[Hapo Browser] Đang chụp hình dồn vào file: ${output}`);
  await fs.promises.mkdir(path.dirname(path.resolve(output)), { recursive: true });
  await page.screenshot({ path: output, fullPage: true });
  console.log(`✅ [THÀNH CÔNG] Ảnh chụp full-page đã được nướng chín! LLM hãy gửi cho User lệnh mở ảnh nhé.`);
}

async function captureConsole(page) {
  console.log(`[Hapo Browser] Đang rình Console Log trong 5 giây...`);
  const logs = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      logs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });
  // Gài thêm bẫy vớt lỗi Page Error (JS Crash)
  page.on('pageerror', err => logs.push(`[CRASH] ${err.message}`));

  // Cho thời gian sống 5 giấy để lắng nghe event
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('\n=== KẾT QUẢ RÌNH RẬP DÀNH CHO LLM ===');
  if (logs.length === 0) console.log('Sạch bóng quân thù! Không có Warning hay Error nào gào thét trên Console cả.');
  else logs.forEach(l => console.log(l));
  console.log('=====================================\n');
}

async function captureAria(page) {
  console.log(`[Hapo Browser] Đang quét cấu trúc xẻ thịt HTML (ARIA DOM)...`);
  // Truy xuất cây Accessibility đơn giản
  const snapshot = await page.accessibility.snapshot();
  console.log('\n=== CẤU TRÚC DOM ẨN DƯỚI GÓC NHÌN ARIA ===');
  console.log(JSON.stringify(snapshot, null, 2));
  console.log('=============================================\n');
}

async function main() {
  const config = parseArgs();
  if (!config.url || !config.url.startsWith('http')) {
    console.error('[LỖI] Thiếu --url hợp lệ (Ví dụ: --url http://localhost:3000)');
    process.exit(1);
  }

  let browser;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    
    // Set viewport như Macbook Pro
    await page.setViewport({ width: 1440, height: 900 });
    
    console.log(`[Hapo Browser] Định vị tọa độ: ${config.url}`);
    await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 15000 });

    if (config.action === 'screenshot') {
      await takeScreenshot(page, config.output);
    } else if (config.action === 'console') {
      await captureConsole(page);
    } else if (config.action === 'aria') {
      await captureAria(page);
    } else {
      console.error(`[LỖI] Không tồn tại Action tên là: ${config.action}`);
    }

  } catch (error) {
    console.error('\n[LỖI SẬP NGUỒN]', error.message);
  } finally {
    if (browser) await browser.close();
  }
}

main();
