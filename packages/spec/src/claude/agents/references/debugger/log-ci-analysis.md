# Điều Tra Hồ Sơ Máy Chủ & Hệ Thống Tự Động (Log & CI/CD Analysis)

Biện pháp gỡ lỗi trong môi trường Producttion hoặc quá trình Build tự động Github Actions.

## Khai Thác Hệ Thống (Github CLI)
Đừng bắt User copy log cho mình. Tự kích hoạt sức mạnh nội tại qua bash:
- List lỗi Github Action: `gh run list`
- Soi Log chi tiết của Job hỏng: `gh run view <job-id> --log`
- Dùng awk/grep khoanh vùng từ khóa `FAIL`, `ERROR`, `FATAL`, `EXCEPTION`.

## Trinh Sát Log Hệ Thống Máy Chủ (Server Diagnostics)
- Log Ứng Dụng: Khai thác thư mục `logs/` hoặc `/var/log`.
- Lọc theo khung thời gian (Time-bound query) để dò chính xác khung giờ crash hệ thống.
- Yêu cầu User khởi chạy server dev tại local (Ví dụ: `npm run dev`) sau đó Agent lắng nghe Terminal Stream trên background hoặc đọc file stdout ghi tạm ra.

Với năng lực này, Agent có thể xử lý việc sập Pipeline hoặc Deploy Failed một cách dễ dàng và nhắm thẳng vào nguyên do hạ tầng thay vì sửa bậy mã code.
