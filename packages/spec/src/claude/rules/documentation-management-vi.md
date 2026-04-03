# Quản lý Tài liệu Dự án (Project Documentation Management)

### Bảo trì Xây dựng Lộ trình & Lịch sử Nhật ký (Roadmap & Changelog)
- **Lộ trình dự án (Project Roadmap)** (`./docs/development-roadmap.md`): Một tài liệu sống (living document) được dùng để theo dõi các giai đoạn, cột mốc và tiến độ đạt được của dự án.
- **Nhật ký thay đổi (Project Changelog)** (`./docs/project-changelog.md`): Bản ghi chép nội dung chi tiết của tất cả các thay đổi lớn, cập nhật thêm tính năng và các bản vá lỗi (fixes).
- **Kiến trúc hệ thống (System Architecture)** (`./docs/system-architecture.md`): Bản ghi chép kiến trúc chi tiết của tất cả các thay đổi lớn, tính năng và bản sửa lỗi hệ thống.
- **Tiêu chuẩn mã nguồn (Code Standards)** (`./docs/code-standards.md`): Bản ghi chép chi tiết của tất cả các thay đổi lớn, tính năng và bản sửa lỗi tiêu chuẩn.

### Các bản Cập nhật Bắt buộc
- **Sau quá trình Triển khai Tính năng**: Hãy cập nhật trạng thái tiến độ trên roadmap và bổ sung các hạng mục (entries) tương ứng vào changelog.
- **Sau các Cột mốc (Milestones) chính yếu**: Đánh giá và điều chỉnh lại các giai đoạn nằm trên roadmap, cập nhật các chỉ số đánh giá độ thành công (success metrics).
- **Sau các đợt Fix lỗi (Bug Fixes)**: Ghi chép tài liệu về các bản vá lỗi được đưa vào changelog cùng với mức độ nghiêm trọng và mức tác động thực tế của sự cố.
- **Sau các bản Cập nhật Bảo mật (Security Updates)**: Ghi lại các cải tiến về phía bảo mật cũng như sự cập nhật mới cho các phiên bản.
- **Đánh giá Hằng tuần (Weekly Reviews)**: Cập nhật tỷ lệ phần trăm tiến bộ thực tiễn và trạng thái mới nhất cho các mốc milestones.

### Điều kiện Mồi Kích Hoạt Tài Liệu (Documentation Triggers)
Agent `project-manager` BẮT BUỘC cập nhật các loại tài liệu này mỗi khi:
- Trạng thái của một giai đoạn quy trình phát triển dịch chuyển thông báo (ví dụ: bẻ trạng thái từ "In Progress" sang mục "Complete").
- Lên lịch các tính năng chính đã được triển khai đầy đủ hoặc phát hành tới hạn (released).
- Các luồng lỗi phát triển (bugs) đáng kể đã được giải quyết xong, hoặc là bản vá bảo mật đã được cài thiết lập áp dụng.
- Lịch trình dự án (timeline) hoặc phạm vi giới hạn của dự án (scope) có những điều chỉnh sửa đổi nhất định.
- Phát sinh hiện tượng lỗi rễ do các cấu kiện phụ thuộc luồng bên ngoài (external dependencies) hoặc gây nên sự thay đổi đột biến làm vỡ cấu trúc chức năng gốc (breaking changes).

### Giao thức xử lý Cập nhật (Update Protocol)
1. **Trước khi cập nhật**: Phải luôn tham chiếu và đọc trạng thái hiển thị hiện tại của luồng bản đồ lộ trình roadmap và file nội dung nhật ký changelog.
2. **Trong lúc cập nhật**: Luôn luôn duy trì thuộc tính hợp lệ (consistency) đối với đánh số phiên bản version và trình bày quy cách (formatting) đúng cách.
3. **Sau khi cập nhật**: Xác minh, kiểm tra sự chính xác cho chuẩn xác đường dẫn links, ngày tháng sửa đổi thời gian, và các hệ móc đa tham chiếu chéo tệp (cross-references).
4. **Đánh giá Chất lượng**: Đảm bảo tất cả thông số file cập nhật hoàn toàn bám sát song song cùng thực tế với tiến độ triển khai hiện hữu trên kho.

### Các dạng Kế hoạch Cấu Trúc (Plans)

### Vị trí phân bố của Kế hoạch (Plan Location)
Hãy lưu cất những bản dự liệu kế hoạch ngầm bên trong thư mục `./plans` cùng đính kèm thẻ mốc thời gian ấn định (timestamp) và đặt định danh mang tên mô tả vắn tắt dễ hiểu.

**Định dạng chuẩn:** Áp dụng form hệ thiết kế định danh cấu trúc tên lấy từ mục quy định ngầm `## Naming` đã được gọi bằng cách tiêm (injected) mã từ hooks.

**Ví dụ:** `plans/251101-1505-authentication-and-profile-implementation/`

#### Tổ chức tệp Cấu trúc thư mục (File Organization)

```
plans/
├── 20251101-1505-authentication-and-profile-implementation/
    ├── research/
    │   ├── researcher-XX-report.md
    │   └── ...
│   ├── reports/
│   │   ├── scout-report.md
│   │   ├── researcher-report.md
│   │   └── ...
│   ├── plan.md                                # Điểm điều nhập mở tổng quan
│   ├── phase-01-setup-environment.md          # Thiết lập tạo môi trường
│   ├── phase-02-implement-database.md         # Mô hình cơ sở cấp dữ liệu lưu
│   ├── phase-03-implement-api-endpoints.md    # API endpoints
│   ├── phase-04-implement-ui-components.md    # Thành phần cấu tạo giao diện (UI)
│   ├── phase-05-implement-authentication.md   # Xác thực hệ & quy quyền
│   ├── phase-06-implement-profile.md          # Cấu hình trang hồ sơ tài khoản
│   └── phase-07-write-tests.md                # Các quy định cho bài tests
└── ...
```

#### Cấu trúc thành phần Tệp cụ thể (File Structure)

##### Bản kế đồ Tổng quát Plan (plan.md)
- Chỉ giữ ở mức độ thông số chung và cố gắng thu ngắn phần nội dung chứa không quá ngưỡng 80 dòng.
- Liệt kê theo hàng từng phase một cùng các thông số đánh giá trạng thái hiện hành (status/progress).
- Cung cấp link chuyển tiếp nhảy đi vào từng file phase với các ghi chú chi tiết hơn bên trong.
- Thiết lập ghi danh các thành phần phụ thuộc bị móc nối chính phụ (Key dependencies).

##### Các File giai đoạn Phase (phase-XX-name.md)
Tuyệt đối cung kính tuân thủ và vận hành những quy định nêu tại file `./docs/development-rules.md`.
Bố cục cho mỗi một file phase nên bao gồm đủ ngần này phần:

**Bảo điểm Liên kết ngữ cảnh (Context Links)**
- Cung cấp các đường links dẫn lối nối tiếp dự báo đến thông số về các file cấu kiện có liên can như kho reports, luồng files tài nguyên liên thông (documentation).

**Tổng quan (Overview)**
- Mức độ của điểm khẩn cần đặt ưu tiên cao áp thế nào (Priority)
- Trạng thái chạy tính tới dòng chảy hiện thời (Current status)
- Đoạn mô tả khái quát vắn tắt cởi mở của luồng đó (Brief description)

**Những Thông tin đắt giá Chiết xuất nhận (Key Insights)**
- Những dữ liệu tìm được mấu chốt quan trọng thông qua khảo sát nghiên cứu được nhận định ngầm (research).
- Các cân nhắc xem xét điểm cốt yếu rào nguy cấp cản điểm. (Critical considerations).

**Yêu Cầu Hạng Mục Gắn Mác Bắt Luộc (Requirements)**
- Thông lượng các yêu cầu mang mảng quy định có tích hợp được trên thiết kế về hệ chức năng (Functional).
- Các yêu cầu được đôn mang bản chất hệ tính rẽ quy chế chéo phi tính năng gút (Non-functional).

**Kết cơ Hệ Kiến trúc Điển hình (Architecture)**
- Thiết bộ mặt layout quy họa hệ System design.
- Điểm đụng tương tác giữa các mối nối khối hệ mạch kết lại (Component interactions).
- Truyết diễn dòng dẫn dòng tải cấu cất xử thông số dữ truyền (Data flow).

**Danh sách File danh Tệp nối Tầng (Related Code Files)**
- Bản danh liệt kê tên file được lôi lên để tiến hành đặng cập nhật (modify).
- Danh sách thả xích liệt file mới được đặt tên mới để rào sinh thành hình ngạch (create).
- Lô các danh mục có lệnh xoá vĩnh biệt cất khỏi dự trù tài nguyên (delete).

**Xâu Chuỗi Cấu Thiết Trình Tự Mã Mạch Implementation (Implementation Steps)**
- Các chuỗi mảng bước đánh số phân bổ có hệ chi tiết ngạch bài bản.
- Có luồng kèm hướng chỉ đạo tham chiếu với những ngạch có lệnh riêng rành mạch đứt quãng (Specific instructions).

**Danh sách liệt mục Todo Cần mảng thao dọn (Todo List)**
- Các biểu Checkbox liệt chỉa danh mục các hệ rành rẽ để đếm điểm soát theo (tracking).

**Tiêu chí Chấm ranh Mốc Độ nghiệm Hoàn Chốt (Success Criteria)**
- Điểm đụng rào cắm khái niệm Definition thế nào đạt là ngậm mục xong done.
- Bộ các phương thức (validation methods) nhận định và rào kiểm chuẩn soát coi cấu liệu rạch coi đã định dạng ra sao.

**Khoan Đo Ngắm Độ Đáng Ngại rớt Sai Độ Rủi (Risk Assessment)**
- Các ngánh vấn đề độ tiềm chối tàng hốc nấp lùi phát đột mốc cản lột (potential issues).
- Mảng đề xuất giải pháp thả lưới ngăn xử thiết chiêu đối đáp ứng phó ngạch dập cản đọng rào rớt.

**Yêu Cầu Cân Nhắc Về Yếu Tố An Ninh Dữ Liệu Bảo Mật (Security Considerations)**
- Ổ ngạch chặn quản trị thông chốt mở thẻ chứng rào đăng (Auth / Authorization).
- Đóng bao vỏ đậy khóa che lấp vỏ thảm bịt mã thông nguồn truyền (Data protection).

**Các Bước Kế Cấp Liền Sau Chờ - Next Steps**
- Các sự hệ rập chờ cấu lặp liên đới lọng xáp (Dependencies) đi vướng dội.
- Các list mộng tác vụ dọn tiến việc tiếp đi ngầm lùa theo chân sau (Follow-up tasks).
