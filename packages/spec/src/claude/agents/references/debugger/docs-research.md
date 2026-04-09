# Nghệ Thuật Lùng Sục Tài Liệu (Docs-Research Cẩm Nang)

Không bao giờ đoán mò cú pháp API của third-party library, đặc biệt khi hệ thống đang báo lỗi Deprecated hoặc Undefined Function.

## Vũ Khí Nằm Ở Đâu? (Zero-token Execution Strategy)
Tướng lĩnh Hapo tận dụng bộ script của CK đang ngầm cài đặt trong ổ cứng (tại `~/.claude/skills/docs-seeker/scripts`) bằng cách truyền lệnh thực thi (Exectute) vào bash. Tốc độ thu hồi tài liệu sẽ nhanh hơn 100 lần và không bị mất context.

## Quy Trình 3 Bước Qua Bash:
1. **[Script] Định vị từ khoá (Detect):**
   ```bash
   node ~/.claude/skills/docs-seeker/scripts/detect-topic.js "Làm sao dùng useForm của React Hook Form"
   ```
2. **[Script] Cào Link Tương Ứng (Fetch llms.txt):**
   ```bash
   node ~/.claude/skills/docs-seeker/scripts/fetch-docs.js "Làm sao dùng useForm của React Hook Form"
   ```
3. **Phân Tích URL (Analyzer):** Trích xuất những link mà script #2 trả về, dùng `curl` tải text HTML về hoặc yêu cầu người dùng copy ném vào.

**Quy Tắc Thép:** Đừng ngần ngại gọi Node JS xuyên từ `~/.claude` nếu nó đã có mặt. Việc này là tận dụng vũ khí đồng minh triệt để.
