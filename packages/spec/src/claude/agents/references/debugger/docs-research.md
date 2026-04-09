# Nghệ Thuật Lùng Sục Tài Liệu (Docs-Research Cẩm Nang)

Không bao giờ đoán mò cú pháp API của third-party library, đặc biệt khi hệ thống đang báo lỗi Deprecated hoặc Undefined Function.

## Vũ Khí Nằm Ở Đâu? (Zero-token Execution Strategy)
Tướng lĩnh Hapo tận dụng bộ script gốc được cài cắm độc lập ngay trong lõi của mình (tại `scripts/docs-fetch.js`) bằng cách truyền lệnh thực thi (Execute) vào bash. Tốc độ thu hồi tài liệu sẽ nhanh hơn 100 lần và không bị mất context.

## Quy Trình Xử Lý Qua Bash:
1. **[Script] Kéo Link và Phân Tích (Fetch/Detect):**
   ```bash
   node scripts/docs-fetch.js "Làm sao dùng useForm của React Hook Form"
   ```

**Quy Tắc Thép:** Đừng ngần ngại gọi `node scripts/docs-fetch.js` nếu thư viện đó được support. Việc này là tận dụng vũ khí đồng minh triệt để.
