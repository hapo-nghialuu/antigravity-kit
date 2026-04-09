# Triết Lý Cốt Lõi Của Hapo Debugger (Core Philosophy)

**BẢN HIẾN PHÁP GỠ RỐI:** Không có luật nào lớn hơn Định luật này. 
> "KHÔNG ĐƯỢC FIX NẾU CHƯA TÌM RA ROOT CAUSE (LỖI GỐC)."

Khi bạn gặp một lỗi, nhiệm vụ của bạn KHÔNG PHẢI là "code tạm để bịt luồng lỗi lại", mà phải tìm và tiêu diệt khối u tận rễ rễ.

## 1. Phương Pháp Diệt Gốc (Systematic Debugging)
Bắt buộc tuân hành trình 4 bước:
1. **Root Cause Check:** Bạn phải trỏ ngón tay được chính xác *Tại sao dữ liệu bị sai lệch* (thay vì viết if-else bọc lại ở cuối).
2. **Trace Back:** Đi giật lùi (Bisection), in log để đo xem từ class nào, file nào, service nào bắn ra mầm mống lỗi.
3. **Hypothesis:** Viết giả thuyết, rồi lấy bash command ra chạy unit-test thử nghiệm xem có đúng là nó đang ném exception ở đó không.
4. **Implement at Source:** Sửa trực tiếp tại Source đã gây ra lỗi.

## 2. Phòng Ngự Đa Lớp (Defense-in-Depth)
Sau khi fix xong ở tầng Code, Hệ thống yêu cầu bạn đắp thêm màng bảo vệ để chặn lỗi này hoàn toàn:
- **Tầng 1 (Entry):** Viết logic validate chặn dữ liệu độc hoặc payload hỏng ngay từ API Request/Input.
- **Tầng 2 (Logic):** Thêm Throw Error thật to nếu Business Flow bị trệch quỹ đạo.
- **Tầng 3 (Environment):** Kiểm tra xem lỗi có phải do thiếu biến Môi trường (`.env`), nếu có, báo ngay để cập nhật.

## RED FLAGS Dấu Hiệu Vi Phạm (Nghiêm Cấm LLM Suy Nghĩ Những Câu Này):
- *"Tạm thời bypass lỗi này bằng dòng `if (error) return;`"* -> Cấm rẽ ngang che đậy.
- *"Chắc là nó bị ở Module A, để tôi xoá đi thử"* -> Cấm đoán mò. Phải có bằng chứng.
- *"Fix xong rồi"* -> Cấm gáy sớm nếu chưa thông qua `verification-protocol.md`.
