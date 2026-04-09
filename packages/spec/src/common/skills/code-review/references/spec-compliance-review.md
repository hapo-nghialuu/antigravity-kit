---
name: spec-compliance-review
description: Hapo native protocol for verifying core implementation requirements using multimodal visual validation via llm-moe.
---

# Thẩm Định Đặc Tả (Spec Compliance)

Code chạy mượt, Clean Code, Performance cao... nhưng KHÔNG ĐÚNG YÊU CẦU thì mã nguồn đó vẫn là RÁC. Bước này đóng vai trò chốt chặn xem Dev có làm đúng thiết kế không trước khi soi xét chất lượng code.

## 1. Mục Tiêu (The Goal)
- Chống "cầm đèn chạy trước ô tô": Dev tự ý bịa thêm tính năng không có trong tài liệu.
- Chống "rớt não": Dev code rớt một yêu cầu logic nghiệp vụ cốt lõi.
- Đảm bảo Giao diện Khớp hoàn hảo với Bản vẽ.

## 2. Quy Trình Triệu Hồi (Multimodal Invocation Process)

Đừng review bằng mắt chữ thông thường nếu dự án có đính kèm Visual Specs (Hình ảnh, Layout, PDF).

**Thuật toán Đánh Hơi Spec:**
1. Tra cứu xem khu vực `.specs/`, lệnh của người dùng hoặc vé Jira có đính kèm file Ảnh (`.png`, `.jpg`, `.svg`) hay Tài liệu (`.pdf`) không.
2. Nếu CÓ: LẬP TỨC dừng việc soi Code tĩnh. Gửi toàn bộ file Frontend vừa code / Logic vừa viết kèm với cái Ảnh/PDF đó sang **cổng phân tích của `hapo:llm-moe`**.
   - *Lệnh yêu cầu:* `hapo:llm-moe` ơi, hãy nhìn bản thiết kế này, so sánh nó với logic/style mà Code đang miêu tả xem có sai lệch Layout/Logic gì không.
3. Nếu KHÔNG (chỉ có Markdown Spec): Trực tiếp đọc Spec và rút trích các gạch đầu dòng Requirement ra soi từng file thay đổi.

## 3. Thang Phán Quyết (The Verdicts)

Mỗi Requirement trong Spec phải trả về 1 trong 3 trạng thái:
- `[PASS]` Đã Implement đầy đủ. Đi tiếp sang Code Quality.
- `[MISSING]` Bỏ quên tính năng. Ép DEV phải quay đầu bổ sung liền (BLOCK MERGE).
- `[EXTRA]` Code phình to ra những tính năng tự phát không có trong thẻ Spec. Nếu không giải trình được tính hợp lý -> Đánh Trượt.
- `[VISUAL_MISMATCH]` (Với UI Design): Báo cáo từ `llm-moe` chỉ ra màn hình này sẽ vỡ layout hoặc sai chuẩn Design System.

## 4. Dấu Hiệu Vi Phạm (Red Flags)
- Khen "Code sạch đẹp" mà không đo lường Requirement.
- Nghĩ rằng Design Images chỉ để trưng bày mà không có giá trị kiểm duyệt.
