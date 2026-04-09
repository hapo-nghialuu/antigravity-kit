# Chụp Ảnh Tự Động Hóa (Chrome DevTools Automation)

Hapo không bao giờ bó tay khi thiếu mắt (Visual Verification). Khi bạn fix lỗi giao diện, CSS bị méo, hay logic đăng nhập tịt ngòi, bạn có quyền "mượn" đôi mắt của hệ thống Puppeteer ngầm giấu trong `~/.claude/skills/chrome-devtools`.

## Script Bỏ Túi (Gọi Trực Tiếp Bằng Bash)
Kích hoạt các kịch bản có sẵn thay vì tự viết mã.

- **Chụp Toàn Bộ Màn Hình:**
  ```bash
  node ~/.claude/skills/chrome-devtools/scripts/screenshot.js --url http://localhost:3000 --output ./debug-shot.png --full-page true
  ```
- **Tracking Network & Log Lỗi FrontEnd (Console Log):**
  ```bash
  node ~/.claude/skills/chrome-devtools/scripts/console.js --url http://localhost:3000 --types error,warn --duration 5000
  ```
- **Quét Toàn Bộ Cấu Trúc Khả Dụng (ARIA Snapshot):** Để bắt các nút bấm ẩn hoặc bị đè DOM.
  ```bash
  node ~/.claude/skills/chrome-devtools/scripts/aria-snapshot.js --url http://localhost:3000
  ```

## Cảnh Cáo & Chống Mù Kỹ Thuật
1. Tuyệt đối không dùng giao thức `file://`. Bắt buộc dùng `npx serve -p 3000` chạy ngầm.
2. Với lỗi Login đụng Auth Token, dùng `inject-auth.js` để nạp cookie cho trình duyệt ma trước khi chụp. Do not give up if the page redirects automatically!
