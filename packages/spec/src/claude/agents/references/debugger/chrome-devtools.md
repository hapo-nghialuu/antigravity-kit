# Chụp Ảnh Tự Động Hóa (Chrome DevTools Automation)

Hapo không bao giờ bó tay khi thiếu mắt (Visual Verification). Khi bạn fix lỗi giao diện, CSS bị méo, hay logic đăng nhập tịt ngòi, bạn có quyền "mượn" đôi mắt của hệ thống Puppeteer ngầm giấu trong Hapo Tooling (`scripts/browser-tool.cjs`).

## Script Bỏ Túi (Gọi Trực Tiếp Bằng Bash)
Kích hoạt kịch bản gộp đa năng thay vì tự viết mã:

- **Chụp Toàn Bộ Màn Hình:**
  ```bash
  node scripts/browser-tool.cjs --action screenshot --url http://localhost:3000 --output ./debug-shot.png
  ```
- **Tracking Network & Log Lỗi FrontEnd (Console Log):**
  ```bash
  node scripts/browser-tool.cjs --action console --url http://localhost:3000
  ```
- **Quét Toàn Bộ Cấu Trúc Khả Dụng (ARIA Snapshot):** Để bắt các nút bấm ẩn hoặc bị đè DOM.
  ```bash
  node scripts/browser-tool.cjs --action aria --url http://localhost:3000
  ```

## Cảnh Cáo & Chống Mù Kỹ Thuật
1. Tuyệt đối không dùng giao thức `file://`. Bắt buộc dùng `npx serve -p 3000` chạy ngầm.
2. Lệnh yêu cầu thư viện `puppeteer`. Nếu bạn gõ lệnh báo lỗi Missing Module, hãy yêu cầu User chạy `npm i -D puppeteer` hoặc `npm i -D puppeteer-core` vào dự án trước nhé!
