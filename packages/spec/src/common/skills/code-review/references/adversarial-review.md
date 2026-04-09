---
name: adversarial-review
description: Stage 3 Red-Team Protocol for Hapo Code Review. Focuses on brutally breaking the code with hostle mindset and strict scope gates.
---

# Đánh Giá Đối Kháng (Adversarial Review - Stage 3)

Tờ bí kíp này chỉ được giở ra sau khi Tầng 1 (Spec Compliance) và Tầng 2 (Code Quality) đã quét xong bề mặt của bản Code. Phải lột tả sự tàn nhẫn, không nhân nhượng.

## 1. Cổng Giới Hạn (The Scope Gate)

Đừng phung phí tài nguyên AI để bắn súng đại bác vào con kiến.
**BỎ QUA (Skip) Tầng Adversarial** nếu KHỚP TẤT CẢ điệu kiện sau:
- Tổng số file đổi <= 2
- Tổng số code đổi <= 30 dòng (chỉ tính logic code)
- Không đụng vào file lõi (Config, Authentication, Security, SQL, Package dependencies).
*Lưu ý ghi `.Adversarial: Skipped (File đổi quá nhỏ)` vào báo cáo.*

**BẮT BUỘC KHỞI ĐỘNG CỔNG NẾU NHÌN THẤY:**
- Có sửa đổi vào hệ thống Đăng nhập / Phân quyền / Route API mới.
- Khai báo / Bổ sung thêm Thư viện npm mới (Lockfile thay đổi) -> Đánh hơi nguy cơ Supply Chain.

## 2. Tư Duy Ác Nhân (The Mindset)

> "Nhiệm vụ của Hapo không phải là vuốt ve cái tôi của Programmer. Code luôn chứa đựng lỗi lầm chết người. Công việc của bạn là **Chọc Thủng Bức Tường Chống Đạn**, chứng minh Code có thể sai, có thể bị Hack, và có thể Quá Tải." 

## 3. Các Góc Tấn Công Mục Tiêu (The Attack Vectors)

Bạn không review xem hàm tên đẹp không, mà đi tìm:

### 3.1. Lỗ Hổng Bảo Mật (Security Holes)
- Form nhập liệu đã được Sanitized (Lọc mã độc) XSS chưa?
- Ghép chuỗi SQL có lộ kẽ hở Injection không?
- Lỗi phân quyền ngớ ngẩn (Auth Bypass) do sơ ý bẻ nhánh logic sai.
- Dữ liệu mật (Stripe Key, API Key, Token JWT) có khả năng bị văng ra Error Logs lúc ứng dụng sập không?

### 3.2. Giả Định Ngây Thơ (False Assumptions)
- Dev cược mạng sống với dòng code: `const id = event.data.userId` mà không check xem `event.data` có Null không.
- Thấy thư viện gọi 1 phát ăn ngay nhưng quên xét trường hợp Network bị rớt lúc gọi lên API server.

### 3.3. Cạn Kiệt Tài Nguyên & Vòng Lặp Vô Hạn (Resource Exhaustion)
- Truy vấn DB nguyên bảng 1 triệu dòng mà không limit / paginate? Bắt lỗi ngay!
- Render 1 Component 1000 phần tử trên màn hình ReactJS có gây treo trình duyệt rò thủng RAM Memory?

### 3.4. Rủi ro Phụ thuộc (Supply Chain Risk)
- Cảnh báo với Dev cài package `left-pad` không rõ tên tuổi. Liệu thư viện này có giấu Logger bẩn chạy file script ẩn gài mã độc không? 

## 4. Xử Lý Khi Tìm Ra Lỗi (Adjudication)
Tìm ra lỗi rồi thì phải phán xử:
- **[CRITICAL]** Hệ thống sập chắc, Hacker đột nhập được 100%. Yêu cầu CHẶN MERGE ngay tức khắc và ném lại command bash cho User fix.
- **[MEDIUM]** Có lỗi nhưng rủi ro không lớn (nhưng vẫn phải nhắc sửa đi).
- **[REJECTED]** Tự biết bản thân phân tích quá khắt khe (False positive vì DB đã bọc rule phòng thủ sẵn). Khôn thì Tự Bác Bỏ.
