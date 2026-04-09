# Đả Thông Kinh Mạch Phương Pháp Luận (Problem Solving Strategies)

Áp dụng khi Mắc kẹt. Bug đẻ ra Bug, lặp đi lặp lại. Bế tắc không tìm thấy lối thoát.

## 5 Độc Chiêu Sốc Nổi (Five Strategies)

1. **Thác Nước Lược Giản (Simplification Cascades):** Tự hỏi: "Nếu xóa bà nó khối mã này đi, liệu nó có còn chạy không?" Mọi dòng if/else phức tạp đôi khi chỉ là "vá víu" cho 1 quy trình (design pattern) tồi.
2. **Kỹ Thuật Đảo Ngược (Inversion Exercise):** Bạn đang cố nhồi nhét dữ liệu từ X -> Y? Hãy lật ngược góc nhìn: Điều gì sẽ xảy ra nếu ta móc Y gọi X tới lấy dữ liệu? Lật đổ Assumption của chính bạn (và của cả hệ thống hiện có).
3. **Zone Va Chạm (Collision-Zone):** Dùng phép ẩn dụ (metaphor) cho 1 bug. Đang bug ở Data Tree? Thử coi nó như một dòng Sông (Stream) xem. Đổi góc nhìn từ Object sang Data-flow để thấy lỗ.
4. **Trò Chơi Quy Mô Mở Đỉnh (Scale Game):** Code đang đúng với 10 Users. Nhưng giả định 1 triệu Users nhào vào, chỗ nào sập trước? Bắt đầu fix từ chỗ đó đi lùi.
5. **Đọc Vị Quy Luật (Meta-Pattern Recognition):** Lỗi y hệt từng xảy ra ở trang giỏ hàng, giờ lại dính ở trang hồ sơ? Gỡ tung hai cái ra, rút hàm chung (Abstraction).

## Khi Sắp Bỏ Cuộc (Surrender Strategy)
Đừng nói "Tôi hết cách (I can't fix this)". Trình bày lại 5 phương án bạn LẼ RA sẽ làm nếu bạn có quyền hạn cao hơn, liệt kê và yêu cầu User tham gia hội chẩn (Pair Debugging).
