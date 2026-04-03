# Quy tắc Phát triển Code (Development Rules)

**QUAN TRỌNG:** Phân tích danh mục kỹ năng (skills catalog) và chỉ kích hoạt các kỹ năng cần thiết cho tác vụ trong quá trình thực hiện.
**QUAN TRỌNG:** Bạn LUÔN tuân thủ các nguyên tắc sau: **YAGNI (Bạn sẽ không cần đến nó) - KISS (Giữ cho nó đơn giản) - DRY (Không lặp lại chính mình)**

## Quy định chung (General)
- **Đặt tên file (File Naming)**: Sử dụng kebab-case cho tên file với một tên có ý nghĩa mô tả mục đích của file. Tên file dài cũng không sao, chỉ cần đảm bảo khi các công cụ ngôn ngữ lớn (LLMs) đọc tên file bằng Grep hoặc các công cụ khác, chúng có thể hiểu ngay mục đích của file mà không cần phải đọc nội dung.
- **Quản lý kích thước file (File Size Management)**: Giữ các file code riêng lẻ dưới 200 dòng để tối ưu hóa việc quản lý ngữ cảnh.
  - Chia nhỏ các file lớn thành các thành phần (components) / modules nhỏ hơn, tập trung hơn.
  - Ưu tiên mô hình lắp ghép đối tượng (composition) thay vì kế thừa (inheritance) đối với các widget phức tạp.
  - Trích xuất các hàm tiện ích (utility functions) vào các module riêng biệt.
  - Tạo các class Service chuyên dụng cho phần logic nghiệp vụ (business logic).
- Khi tìm kiếm tài liệu, kích hoạt kỹ năng `docs-seeker` (tham chiếu `context7`) để khám phá các tài liệu mới nhất.
- Sử dụng lệnh bash `gh` để tương tác với các tính năng của Github nếu cần.
- Sử dụng lệnh bash `psql` để truy vấn cơ sở dữ liệu Postgres phục vụ xử lý lỗi (debugging) nếu cần.
- Sử dụng kỹ năng `ai-multimodal` để mô tả chi tiết hình ảnh, video, tài liệu, v.v. nếu cần.
- Sử dụng kỹ năng `ai-multimodal` và `imagemagick` để tạo và chỉnh sửa hình ảnh, video, tài liệu, v.v. nếu cần.
- Sử dụng kỹ năng `sequential-thinking` và `debug` để tư duy tuần tự, phân tích code, gỡ lỗi, v.v. nếu cần.
- **[QUAN TRỌNG]** Tuân thủ cấu trúc của codebase và các tiêu chuẩn code nằm trong `./docs` trong thời gian triển khai.
- **[QUAN TRỌNG]** Không chỉ mô phỏng (simulate) mã hoặc làm giả dữ liệu (mocking), hãy luôn triển khai dòng code vận hành chân thực.

## Hướng dẫn về Chất lượng Code (Code Quality Guidelines)
- Đọc và làm theo cấu trúc codebase cũng như các chuẩn mã nguồn trong `./docs`.
- Đừng quá khắt khe đối với việc rà soát định dạng code (code linting), nhưng **phải đảm bảo không có lỗi cú pháp (syntax errors) và code có thể được biên dịch (compilable)**.
- Ưu tiên tính năng và tính dễ đọc hơn là áp dụng quy tắc phong cách và tùy chỉnh định dạng code nghiêm ngặt.
- Áp dụng các tiêu chuẩn chất lượng code hợp lý nhằm đảm bảo nâng cao năng suất của nhà phát triển.
- Sử dụng try catch để xử lý lỗi & bao phủ các tiêu chuẩn bảo mật cơ bản.
- Sử dụng agent `reviewer` để đánh giá (review) code sau mọi lần tiến hành triển khai.

## Các quy tắc trước khi Commit/Push (Pre-commit/Push Rules)
- Chạy hệ thống linting trước khi đưa thành phần vào commit.
- Chạy quá trình kiểm thử trước khi thực hiện push (KHÔNG ĐƯỢC lờ đi các bài test thất bại chỉ nhằm vượt ải build hoặc github actions).
- Giữ các lượt commit thật sự tập trung vào những thay đổi code của riêng bản thân nó.
- **KHÔNG ĐƯỢC** tiến hành commit và push các thông tin mang tính bảo mật (như file dotenv, API keys, thông tin cơ sở dữ liệu, v.v.) vào repository git!
- Tạo commit messages một cách chuyên nghiệp, sạch sẽ mà không chứa chi tiết AI referrence trong đó. Hãy sử dụng định dạng commit quy ước chung (conventional commit format).

## Triển khai Code (Code Implementation)
- Viết code thật sạch, dễ dàng đọc đọc và dễ duy trì.
- Tuân theo các mô hình kiến trúc có sẵn.
- Triển khai các tính năng đảm bảo đúng với đặc tả yêu cầu.
- Xử lý các trường hợp cận biên (edge cases) và các trường hợp lỗi sẽ xảy ra.
- **KHÔNG ĐƯỢC** phát sinh thêm các file nâng cấp, hãy áp dụng cập nhật vào các file nguồn hiện có.

## Hỗ trợ Trực quan Visual Aids
- Cần sử dụng `/ck:preview --explain` khi giải thích các dòng lập trình không thân thuộc hoặc hệ logic chằng chéo phức tạp.
- Sử dụng công cụ `/ck:preview --diagram` thay cho biểu đồ kiến trúc và dựng luồng đồ hình hóa.
- Dùng lệnh `/ck:preview --slides` cho các slide thuyết trình giới thiệu từ đầu tới cuối.
- Dùng hệ lệnh `/ck:preview --ascii` đối với biểu đồ hiển thị qua terminal (để không cần phần mềm trình duyệt).
- Đưa thêm flag phụ `--html` vào mọi chiêu sinh visual để kết xuất cấu hình nội html mở thông qua trình duyệt (bên ngoài không cần truy nguồn tự máy chủ).
- **Ngữ cảnh bản vẽ Kế hoạch:** Mạch kết hoạch phát sinh tự dội biến cắm mốc `## Plan Context` vào injection; thông tin hình lưu trữ cho biến sẽ nhét tại `<thư-mục-kế-hoạch>/visuals/` (`{plan_dir}/visuals/`).
- Nếu đang trống lịch kế hoạch, quay lại lưu về `plans/visuals/`.
- Đối với định dạng sơ đồ công cụ Mermaid, hãy dồn sử dụng thêm rào công cụ `/mermaidjs-v11` thay the cho rules ver cũ để xài v11.
- Truy vấn file `primary-workflow.md` → Ở nhánh Bước 6 xem nội dung bổ sung.
