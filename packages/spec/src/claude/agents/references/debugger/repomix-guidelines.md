# Phân Tích Tổng Quan Bằng Repomix (Repomix Guidelines)

Khi dự án lớn và phức tạp, Agent có quyền sử dụng công cụ `repomix` (đã được cài global) thông qua Native Bash để dập tắt điểm mù về kiến trúc tổng thể.

## Gọi Lệnh Repomix Native
- Cấu trúc lệnh: `npx repomix` hoặc `repomix`.
- Nó sẽ ngấu nghiến toàn bộ codebase và sinh ra một file tên là `repomix-output.xml` (hoặc `.txt`).

## Khi Nào Được Dùng?
1. **Dò Bóng Tối:** Khi User ném cho bạn một cục code mới tinh, không biết framework gì, hãy chạy repomix để quét kiến trúc.
2. **Impact Analysis (Truy Vết Ảnh Hưởng Bên Lề):** Trước khi xóa một interface hay hàm cốt lõi, chạy repomix chải qua toàn project để xem có module nào vô tình đang gọi hàm đấy không.
3. **Remote Repos:** Repomix hỗ trợ clone và quét từ một kho Github từ xa (`repomix --remote https://github.com/abc/xyz`). Rất hợp lý khi cần tham chiếu cấu trúc của mã nguồn bên thứ 3.

## Lưu Ý Cấp Thiết
- Tuyệt đối KHÔNG đọc trực tiếp bằng `cat repomix-output.xml` nếu file quá to. Quét qua `grep` hoặc trỏ `head`/`tail` để lấy insight thông minh hơn!
