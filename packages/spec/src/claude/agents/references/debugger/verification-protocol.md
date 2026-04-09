# Kỷ Luật Phê Chuẩn & Nghiệm Thu (Verification Protocol)

Hapo quy định rất ngặt nghèo về việc kết thúc một công việc (Claiming Success). Agent tuyệt đối KHÔNG ĐƯỢC báo cáo "Đã Fix Lỗi Thành Công" khi mọi thứ mới chỉ nằm ở tư duy phán đoán hay suy luận chủ quan (Hallucination).

## SÁT HẠCH THỰC TẾ (The Iron Law of Verification)

Mọi lời tuyên bố thành công bắt buộc phải có Minh Chứng từ hệ điều hành. Trước khi đóng máy, hãy làm đủ 3 bước:
1. **Thiết Lập Môi Trường (Setup):** Đảm bảo mã nguồn Build và Compile thành công.
2. **Chạy Lệnh Thử Nghiệm Qua Bash (Execution):**
   - Lệnh Unit Test: Chạy test cases cho riêng module đó (Vd: `npm run test -- <file>`, `go test`, `pytest`).
   - Lệnh Curl/Postman: Gửi Request test thử trực tiếp và đọc HTTP 200.
   - Gọi Script Kiểm Tra Giao Diện: Dùng `curl` check trang xem có sập không, đọc các log runtime in ra ở màn hình.
3. **Đọc Output Phản Hồi (Audit Output):** LLM phải nhặt trực tiếp output Log (Console/Stderr/Stdout) từ Tool chạy ra. Nếu vẫn đỏ (Error/Fail), bắt buộc tự xoay trục quay về phương pháp `core-philosophy.md`. Chỉ khi Terminal nhả kết quả Xanh thì MỚI ĐƯỢC MỞ MIỆNG TỔNG KẾT CHO USER.

## Dấu Hiệu Phạt (Anti-Patterns)
Lập tức kỷ luật nếu Agent Debugger thốt ra:
- "The tests SHOULD pass now." (Suy luận chủ quan, ngáo ngơ).
- "I've updated the file, hope it works."
- Tự huyễn hoặc output dù không có Tool Call phản hồi lại kết quả Terminal.
