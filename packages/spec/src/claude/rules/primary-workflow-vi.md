# Quy trình làm việc chính (Primary Workflow)

**QUAN TRỌNG:** Phân tích danh mục kỹ năng (skills catalog) và kích hoạt các kỹ năng cần thiết cho tác vụ trong quá trình thực hiện.
**QUAN TRỌNG:** Đảm bảo hiệu quả sử dụng token trong khi vẫn duy trì chất lượng cao.

#### 1. Triển khai Code (Code Implementation)
- Trước khi bắt đầu, hãy giao việc cho agent `planner` để tạo kế hoạch triển khai với các tác vụ TODO trong thư mục `./plans`.
- Khi ở giai đoạn lập kế hoạch, sử dụng song song nhiều agent `researcher` để tiến hành nghiên cứu các chủ đề kỹ thuật liên quan khác nhau và báo cáo lại cho agent `planner` để tạo kế hoạch triển khai.
- Viết code sạch, dễ đọc và dễ bảo trì.
- Tuân theo các mẫu kiến trúc đã được thiết lập.
- Triển khai các tính năng theo đúng đặc tả.
- Xử lý các trường hợp ngoại lệ (edge cases) và các kịch bản lỗi.
- **KHÔNG ĐƯỢC** tạo file nâng cấp mới, hãy cập nhật trực tiếp vào các file hiện có.
- **[QUAN TRỌNG]** Sau khi tạo hoặc sửa đổi file code, hãy chạy lệnh/script biên dịch để kiểm tra xem có lỗi biên dịch nào không.

#### 2. Kiểm thử (Testing)
- Giao việc cho agent `tester` để chạy test trên **đoạn code đã được đơn giản hóa**
  - Viết các bài unit tests toàn diện
  - Đảm bảo độ bao phủ code cao
  - Kiểm thử các kịch bản lỗi
  - Xác thực các yêu cầu về hiệu năng
- Các bài test dùng để kiểm chứng đoạn code CUỐI CÙNG sẽ được xem xét và merge.
- **KHÔNG ĐƯỢC** bỏ qua các bài test bị rớt chỉ để vượt qua quá trình build.
- **QUAN TRỌNG:** Đảm bảo không sử dụng dữ liệu giả (fake data), mocks, các chiêu trò hay giải pháp tạm thời chỉ để pass quá trình build hoặc github actions.
- **QUAN TRỌNG:** Luôn sửa các bài test bị lỗi theo các đề xuất và giao cho agent `tester` để chạy lại test, chỉ kết thúc phiên làm việc của bạn khi tất cả các bài test đều pass.

#### 3. Chất lượng Code (Code Quality)
- Sau khi quá trình kiểm thử kết thúc thành công, giao việc cho agent `code-reviewer` để review lại đoạn code đã sạch và được test.
- Tuân thủ các tiêu chuẩn và quy ước viết code.
- Viết code có khả năng tự giải thích (self-documenting code).
- Thêm các bình luận có ý nghĩa vào các đoạn logic phức tạp.
- Tối ưu hóa vì mục đích hiệu năng và khả năng bảo trì.

#### 4. Tích hợp (Integration)
- Luôn tuân theo kế hoạch mà agent `planner` đưa ra.
- Đảm bảo việc tích hợp diễn ra liền mạch với đoạn code hiện có.
- Tuân thủ chính xác các giao thức API (API contracts).
- Duy trì tính tương thích ngược (backward compatibility).
- Soạn tài liệu cho các thay đổi đột phá (breaking changes).
- Giao việc cho agent `docs-manager` để cập nhật tài liệu trong thư mục `./docs` nếu có.

#### 5. Gỡ lỗi (Debugging)
- Khi người dùng báo cáo lỗi (bugs) hoặc vấn đề trên máy chủ hoặc quy trình chạy CI/CD, giao việc cho agent `debugger` chạy test và phân tích báo cáo tóm tắt.
- Đọc báo cáo tóm tắt từ agent `debugger` và tiến hành sửa lỗi.
- Giao việc cho agent `tester` để chạy test và phân tích báo cáo tóm tắt.
- Nếu agent `tester` báo cáo rằng có bài test bị rớt, hãy sửa chúng tuân theo những đề xuất và lặp lại từ **Bước 3**.

#### 6. Giải thích trực quan (Visual Explanations)
Khi cần giải thích code, giao thức hoặc kiến trúc phức tạp:
- **Trường hợp sử dụng:** Người dùng yêu cầu "giải thích" (explain), "X hoạt động thế nào" (how does X work), "trực quan hóa" (visualize), hoặc chủ đề có chứa trên 3 thành phần tương tác.
- Sử dụng `/ck:preview --explain <topic>` để tạo giải thích trực quan bằng ASCII + Mermaid.
- Sử dụng `/ck:preview --diagram <topic>` cho các biểu đồ kiến trúc và luồng dữ liệu.
- Sử dụng `/ck:preview --slides <topic>` để xem các hướng dẫn thực hiện từng bước.
- Sử dụng `/ck:preview --ascii <topic>` để có kết quả hiển thị trên terminal.
- **Chế độ HTML** (thêm `--html` cho các trang HTML độc lập, mở ngay trong trình duyệt):
  - `/ck:preview --html --explain <topic>` — giải thích HTML chất lượng xuất bản.
  - `/ck:preview --html --diagram <topic>` — biểu đồ HTML tương tác hỗ trợ tính năng zoom.
  - `/ck:preview --html --slides <topic>` — định dạng slide chất lượng tạp chí.
  - `/ck:preview --html --diff [ref]` — đánh giá trực quan sự khác biệt rẽ file.
  - `/ck:preview --html --plan-review` — so sánh kế hoạch hiện hành và codebase.
  - `/ck:preview --html --recap [timeframe]` — ảnh chụp tổng quan ngữ cảnh dự án.
- **Ngữ cảnh kế hoạch:** Hình ảnh tĩnh lưu vào thư mục kế hoạch từ hook tiêm `## Plan Context`; nếu không có dữ liệu, mặc định lưu vào `plans/visuals/`.
- **Chế độ Markdown:** Tự động mở qua trình duyệt bằng phần mềm markdown-novel-viewer cùng bộ kết xuất Mermaid.
- **Chế độ HTML:** Mở ngay trên trình duyệt — chạy độc lập, không yêu cầu gọi máy chủ.
- Xem mục "Hỗ trợ hình ảnh" trong file `development-rules.md` để có thêm hướng dẫn cụ thể.
