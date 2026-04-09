# Kỹ Thuật Truy Vết Lỗi Từ Lõi (Root-Cause Tracing)

Vũ khí dành riêng cho việc phân tách các hệ thống lớn có Bug đâm sâu vào nhiều lớp Stack.

## 1. Call-Stack Navigation (Đọc Lộ Trình Chạy Ngược)
Đừng bao giờ chỉ xem dòng log ném ra Exception. Hãy đi ngược Call Stack (từ Đỉnh Xuống Đáy):
- Dùng `grep` tìm kiếm đoạn Code liên đới (Sử dụng `hapo:inspect`).
- Dùng Native Bash (`cat`, `sed`, `awk`) để quét và đọc các dòng xung quanh lỗi +/- 20 dòng.

## 2. Kỹ Thuật Bisection (Chia để Trị)
Khi không chắc mã hỏng ở phân đoạn nào (Frontend gọi Backend -> Backend gọi DB):
1. **Phân Rã Trực Tiếp (Bisect):** Sử dụng các Endpoint độc lập (như Bash gọi thẳng Postman `curl` vào API Backend) để xem Backend có Lỗi không. Nếu lỗi, Frontend vô tội. Nếu không lỗi, lỗi nằm ở JS gửi Payload phía trình duyệt.
2. **Database Trace:** Xài lệnh psql hay command sql tương đương để chọc thử các câu query, soi Performance Explain nếu API kêu "Nặng".

## 3. UI/UX Visual Gaps (Soi Frontend UI qua Terminal)
Không có Extension chụp hình, Agent hãy dùng tư duy bù đắp:
- Parse cấu trúc HTML bằng Bash.
- Check DOM qua Node scripts.
- Tự inject một đoạn Console Log đơn giản để test luồng JS trên Client.
