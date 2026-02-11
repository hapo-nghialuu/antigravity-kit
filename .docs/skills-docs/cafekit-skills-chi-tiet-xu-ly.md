# CafeKit Framework - Phân Tích Chi Tiết Quy Trình Xử Lý Skill

> Tài liệu chi tiết về quy trình xử lý của tất cả 90 skills trong CafeKit AI Agent Framework
> Phiên bản Tiếng Việt
> Ngày tạo: 2026-02-05

---

## Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Skill Hoạt Động Như Thế Nào](#skill-hoạt-động-như-thế-nào)
3. [Chi Tiết Xử Lý Skill Theo Danh Mục](#chi-tiết-xử-lý-skill-theo-danh-mục)
4. [Tham Khảo Công Cụ](#tham-khảo-công-cụ)
5. [Luồng Thực Thi Skill](#luồng-thực-thi-skill)

---

## Tổng Quan

Tài liệu này cung cấp **thông tin chi tiết về quy trình xử lý** cho mọi skill trong CafeKit, bao gồm:

- **Các bước chính xác** mà mỗi skill thực hiện khi được kích hoạt
- **Công cụ sử dụng** (Read, Edit, Bash, Grep, v.v.)
- **Files đọc/chỉnh sửa**
- **Luồng xử lý nội bộ/logic**
- **Cây quyết định** và logic phân nhánh

---

## Skill Hoạt Động Như Thế Nào

### Luồng Kích Hoạt Skill

```
User Input (Ngườ dùng nhập)
    ↓
Keyword Matching (So khớp từ khóa với trigger trong skill.json)
    ↓
Skill Loading (Tải SKILL.md + skill.json + references/)
    ↓
Context Analysis (Phân tích files hiện tại, trạng thái project)
    ↓
Tool Execution (Thực thi công cụ: Read → Analyze → Edit/Write/Bash)
    ↓
Output Generation (Tạo kết quả đầu ra)
```

### Cấu Trúc Skill

Mỗi thư mục skill chứa:
```
skill-name/
├── SKILL.md          # Hướng dẫn chính (được load vào context)
├── skill.json        # Metadata + trigger words
└── references/       # Tài liệu chi tiết (load khi cần)
    └── *.md
```

---

## Chi Tiết Xử Lý Skill Theo Danh Mục

---

### DANH MỤC 1: AI & ĐA PHƯƠNG TIỆN

---

#### 1. AI-MULTIMODAL (AI Đa Phương Tiện)

**File:** `.claude/skills/ai-multimodal/SKILL.md`

**Phát Hiện Trigger:**
- Upload file hình ảnh (PNG, JPG, GIF, WebP)
- Từ khóa: "ảnh chụp màn hình", "hình ảnh", "ảnh", "biểu đồ", "thiết kế UI"
- Đề cập file video/audio

**Các Bước Xử Lý:**

```
Bước 1: PHÁT HIỆN FILE
├── Kiểm tra nếu input chứa đường dẫn file
├── Xác thực đuôi file (.png, .jpg, .mp4, .mp3, v.v.)
└── Xác minh file tồn tại bằng công cụ Read

Bước 2: PHÂN TÍCH ĐA PHƯƠNG TIỆN
├── Tải hình ảnh/video/audio qua công cụ Read
├── Xử lý qua LLM đa phương tiện (Gemini API)
├── Trích xuất thông tin hình ảnh/văn bản/audio
└── Xây dựng ngữ cảnh từ nội dung media

Bước 3: TÍCH HỢP NGỮ CẢNH
├── Kết hợp phân tích media với hội thoại văn bản
├── Xác định mối quan hệ giữa media và văn bản
├── Xác định ý định ngườ dùng từ ngữ cảnh kết hợp
└── Xây dựng hiểu biết toàn diện

Bước 4: TẠO PHẢN HỒI
├── Tạo phân tích mô tả về media
├── Trả lờ câu hỏi về nội dung media
├── Đưa ra đề xuất dựa trên hình ảnh
└── Triển khai code (nếu được yêu cầu)
```

**Công Cụ Sử Dụng:**
| Công Cụ | Mục Đích |
|---------|----------|
| `Read` | Tải files hình ảnh/video/audio |
| `Grep` | Tìm kiếm code liên quan |
| `Edit` | Triển khai thay đổi giao diện |
| `Write` | Tạo files mới dựa trên phân tích |

**Files Đọc:**
- Hình ảnh: `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`
- Video: `*.mp4`, `*.mov`, `*.webm`
- Audio: `*.mp3`, `*.wav`, `*.m4a`

**Ví Dụ Luồng:**
```
Ngườ dùng: "Phân tích ảnh chụp màn hình UI của tôi"
↓
Read: Tải screenshot.png
↓
Phân tích: Xác định vấn đề layout, màu sắc, khoảng cách
↓
Phản hồi: Đánh giá UI chi tiết + đề xuất cải thiện
↓
(Tùy chọn) Edit: Áp dụng fixes vào files component
```

---

#### 2. SEQUENTIAL-THINKING (Tư Duy Tuần Tự)

**Phát Hiện Trigger:**
- Từ khóa: "từng bước", "suy luận", "làm rõ", "logic"
- Mô tả vấn đề phức tạp
- Yêu cầu suy luận nhiều bước

**Các Bước Xử Lý:**

```
Bước 1: PHÂN RÃ VẤN ĐỀ
├── Xác định vấn đề cốt lõi
├── Chia thành các vấn đề con logic
├── Thiết lập phụ thuộc giữa các bước
└── Tạo cấu trúc chuỗi suy luận

Bước 2: SUY LUẬN TUẦN TỰ
├── Xử lý bước 1 → Ghi kết luận
├── Xử lý bước 2 (dựa trên bước 1) → Ghi kết luận
├── Xử lý bước 3 (dựa trên bước 2) → Ghi kết luận
├── Tiếp tục đến khi giải quyết xong
└── Cho phép phân nhánh các cách tiếp cận khác

Bước 3: XÁC THỰC
├── Xác minh logic từng bước
├── Kiểm tra mâu thuẫn
├── Xác thực kết luận cuối cùng
└── Xác định khoảng trống hoặc lỗi

Bước 4: SỬA ĐỔI (nếu cần)
├── Đánh dấu các bước không chắc chắn
├── Sửa đổi với thông tin mới
├── Phân nhánh thành các đường khác nhau
└── Tổng hợp kết quả
```

---

#### 3. GOOGLE-ADK-PYTHON

**Phát Hiện Trigger:**
- Từ khóa: "Google ADK", "ADK Python", "Gemini agent"

**Các Bước Xử Lý:**

```
Bước 1: THIẾT LẬP MÔI TRƯỜNG
├── Kiểm tra phiên bản Python (3.9+)
├── Cài đặt gói google-adk
├── Xác minh thông tin xác thực Google Cloud
└── Thiết lập môi trường ảo

Bước 2: TẠO CẤU TRÚC AGENT
├── Tạo cấu trúc thư mục agent
├── Định nghĩa agent.py với LlmAgent
├── Cấu hình model (Gemini)
├── Thiết lập thư mục tools/
└── Tạo files __init__.py

Bước 3: TRIỂN KHAI TOOL
├── Định nghĩa hàm tool với decorator @tool
├── Thêm type hints và docstrings
├── Triển khai xử lý lỗi
└── Kiểm tra chức năng tool

Bước 4: CẤU HÌNH SESSION
├── Tạo quản lý trạng thái session
├── Cấu hình memory (nếu cần)
├── Thiết lập callbacks
└── Định nghĩa điều kiện thoát
```

---

### DANH MỤC 2: XÂY DỰNG ỨNG DỤNG & ĐIỀU PHỐI

---

#### 4. APP-BUILDER (Trình Xây Dựng Ứng Dụng)

**Phát Hiện Trigger:**
- Từ khóa: "tạo app", "xây dựng ứng dụng", "dự án mới", "full-stack", "SaaS", "MVP"

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH YÊU CẦU
├── Phân tích yêu cầu ngôn ngữ tự nhiên
├── Trích xuất yêu cầu chức năng
├── Xác định yêu cầu phi chức năng
├── Xác định ngườ dùng mục tiêu/nền tảng
└── Làm rõ phạm vi (MVP vs full feature)

Bước 2: CHỌN TECH STACK
├── Phát hiện công nghệ ưu tiên từ yêu cầu
├── Phân tích dự án hiện có (nếu có)
├── Chọn framework frontend (React, Vue, v.v.)
├── Chọn backend (Node.js, Python, v.v.)
├── Chọn database (PostgreSQL, MongoDB, v.v.)
└── Xác định nền tảng triển khai

Bước 3: TẠO KHUNG DỰ ÁN
├── Chạy lệnh CLI (create-next-app, v.v.)
├── Thiết lập cấu trúc thư mục
├── Khởi tạo repository git
├── Cấu hình package.json / pyproject.toml
└── Cài đặt dependencies

Bước 4: KIẾN TRÚC CỐT LÕI
├── Tạo schema database
├── Thiết lập routes/endpoints API
├── Triển khai xác thực (nếu cần)
├── Tạo components cơ bản
└── Thiết lập routing/navigation

Bước 5: TRIỂN KHAI TÍNH NĂNG
├── Triển khai các thao tác CRUD
├── Tạo forms và validation
├── Thêm quản lý state
├── Triển khai logic nghiệp vụ
└── Thêm xử lý lỗi

Bước 6: TESTING & CHẤT LƯỢNG
├── Thiết lập framework testing
├── Viết tests ban đầu
├── Cấu hình linting/formatting
└── Thêm type checking

Bước 7: THIẾT LẬP TRIỂN KHAI
├── Tạo configs triển khai
├── Thiết lập biến môi trường
├── Cấu hình CI/CD (tùy chọn)
└── Viết docs triển khai
```

**Phối Hợp Với Các Agent Khác:**
```
App Builder (điều phối viên)
    ├── frontend-specialist → UI components
    ├── backend-specialist → Triển khai API
    ├── database-architect → Thiết kế schema
    └── devops-engineer → Config triển khai
```

---

#### 5. ENHANCE (Nâng Cấp)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH TRẠNG THÁI DỰ ÁN
├── Đọc cấu trúc dự án hiện tại
├── Phân tích tính năng hiện có
├── Xác định tech stack
├── Kiểm tra specs hiện có
└── Xem xét thay đổi gần đây

Bước 2: LÀM RÕ YÊU CẦU
├── Phân tích yêu cầu tính năng
├── Xác định components bị ảnh hưởng
├── Xác định phạm vi (nhỏ/vừa/lớn)
├── Kiểm tra dependencies
└── Đánh giá thay đổi breaking

Bước 3: LẬP KẾ HOẠCH (cho thay đổi lớn)
├── Tạo kế hoạch triển khai
├── Xác định files cần sửa
├── Ước tính effort
├── Trình bày cho ngườ dùng phê duyệt
└── Chờ xác nhận

Bước 4: TRIỂN KHAI
├── Đọc files bị ảnh hưởng
├── Áp dụng thay đổi từng bước
├── Tuân theo patterns code hiện có
├── Duy trì backward compatibility
└── Thêm/cập nhật tests

Bước 5: XÁC MINH
├── Chạy tests
├── Kiểm tra lỗi
├── Xác minh tính năng hoạt động
├── Xem xét chất lượng code
└── Cập nhật documentation
```

---

#### 6. CREATE (/create command)

**Các Bước Xử Lý:**

```
Bước 1: KHỞI ĐẦU HỘI THOẠI
├── Xác nhận lệnh create
├── Bắt đầu hỏi tương tác
├── Thu thập yêu cầu từng bước
└── Xây dựng đặc tả dự án

Bước 2: THU THẬP YÊU CẦU
├── Hỏi: Loại ứng dụng gì? (web, mobile, API)
├── Hỏi: Cần những tính năng gì?
├── Hỏi: Có preferences công nghệ nào không?
├── Hỏi: Ngườ dùng mục tiêu là ai?
└── Làm rõ: Thờ hạn timeline?

Bước 3: XÂY DỰNG ĐẶC TẢ
├── Biên soạn câu trả lờ thành spec
├── Xác định tính năng cốt lõi (MVP)
├── Đề xuất tính năng nice-to-have
├── Đề xuất tech stack
└── Trình bày kế hoạch cho ngườ dùng

Bước 4: GỌI APP BUILDER
├── Truyền spec đã biên soạn cho app-builder
├── Thiết lập thư mục dự án
├── Bắt đầu scaffolding
└── Báo cáo tiến độ
```

---

#### 7. ORCHESTRATE (Điều Phối)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH TASK
├── Phân rã task phức tạp thành subtasks
├── Xác định lĩnh vực chuyên môn cần thiết
├── Xác định phụ thuộc task
├── Đánh giá nhu cầu song song vs tuần tự
└── Tạo kế hoạch phân công task

Bước 2: CHỌN AGENT
├── Ánh xạ subtasks đến các agent chuyên gia:
│   ├── Frontend UI → frontend-specialist
│   ├── Thiết kế API → backend-specialist
│   ├── Database → database-architect
│   ├── Bảo mật → security-auditor
│   └── DevOps → devops-engineer
└── Xác thực agent có sẵn

Bước 3: THỰC THI SONG SONG
├── Spawn Task tool cho mỗi agent
├── Cung cấp context + subtask cụ thể
├── Chạy agents đồng thờ
├── Theo dõi tiến độ
└── Thu thập kết quả trung gian

Bước 4: TỔNG HỢP KẾT QUẢ
├── Nhận outputs từ tất cả agents
├── Hòa giải các đề xuất xung đột
├── Merge các thay đổi code
├── Giải quyết vấn đề tích hợp
└── Tổng hợp giải pháp cuối cùng
```

**Ma Trận Phối Hợp Agent:**

| Loại Task | Agent Chính | Agent Phụ |
|-----------|-------------|-----------|
| Tính năng full-stack | orchestrator | frontend + backend + database |
| Kiểm tra bảo mật | security-auditor | backend-specialist (sửa lỗi) |
| Tối ưu hiệu suất | performance-optimizer | frontend + backend + database |
| Migration database | database-architect | devops + backend |
| Fix bug phức tạp | debugger | chuyên gia domain liên quan |

---

#### 8. PARALLEL-AGENTS (Agents Song Song)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN RÃ TASK
├── Phân tích task chính
├── Xác định các subtasks độc lập
├── Xác định cái nào có thể chạy song song
├── Định nghĩa tiêu chí thành công cho mỗi cái
└── Tạo đặc tả subtask

Bước 2: CHUẨN BỊ CONTEXT
├── Chuẩn bị context chia sẻ (files chung, yêu cầu)
├── Tạo context riêng cho từng agent
├── Đảm bảo không có hướng dẫn xung đột
└── Thiết lập cơ chế thu thập kết quả

Bước 3: THỰC THI ĐỒNG THỜI
├── Spawn Task tool calls song song:
│   ├── Task 1: subagent_type="frontend-specialist"
│   ├── Task 2: subagent_type="backend-specialist"
│   ├── Task 3: subagent_type="security-auditor"
│   └── ... (tối đa 32 tasks đồng thờ)
├── Tất cả tasks chạy đồng thờ
└── Chờ tất cả hoàn thành

Bước 4: TÍCH HỢP KẾT QUẢ
├── Thu thập outputs từ tất cả tasks
├── Xác định chồng chéo/xung đột
├── Merge các đề xuất tương thích
├── Đánh dấu lờ khuyên mâu thuẫn
└── Tạo phản hồi thống nhất
```

**Giới Hạn Đồng Thờ:**
- Tối đa 32 tasks song song
- Mỗi task nhận đầy đủ context
- Kết quả tổng hợp khi tất cả hoàn thành

---

#### 9. BRAINSTORMING (Động Não)

**Các Bước Xử Lý:**

```
Bước 1: LÀM RÕ VẤN ĐỀ
├── Diễn giải lại vấn đề/câu hỏi
├── Xác định ràng buộc
├── Làm rõ mục tiêu
├── Định nghĩa tiêu chí thành công
└── Thiết lập phạm vi

Bước 2: TƯ DUY PHÂN KỲ
├── Tạo nhiều cách tiếp cận (10+)
├── Khám phá các góc độ khác nhau
├── Xem xét giải pháp phi truyền thống
├── Xây dựng trên ý tưởng ban đầu
└── Tránh đánh giá vội vàng

Bước 3: TỔ CHỨC
├── Nhóm các ý tưởng liên quan
├── Phân loại theo loại cách tiếp cận
├── Xác định chủ đề/patterns
├── Ưu tiên theo khả thi
└── Tạo bản đồ khái niệm

Bước 4: ĐÁNH GIÁ
├── Đánh giá ưu/nhược điểm của ý tưởng hàng đầu
├── Xem xét effort triển khai
├── Đánh giá rủi ro
├── Kiểm tra sự phù hợp với mục tiêu
└── Xếp hạng đề xuất
```

---

### DANH MỤC 3: BACKEND & DATABASE

---

#### 10. BACKEND-DEVELOPMENT (Phát Triển Backend)

**Các Bước Xử Lý:**

```
Bước 1: PHÁT HIỆN FRAMEWORK
├── Kiểm tra package.json cho framework hiện có
├── Phát hiện ngôn ngữ ưu tiên (TypeScript/JavaScript/Python)
├── Xác định ORM (Prisma, TypeORM, Drizzle, SQLAlchemy)
└── Xác định pattern kiến trúc

Bước 2: THIẾT LẬP CẤU TRÚC DỰ ÁN
├── Tạo cấu trúc thư mục:
│   ├── src/
│   │   ├── controllers/    # Xử lý routes
│   │   ├── services/       # Logic nghiệp vụ
│   │   ├── models/         # Model dữ liệu
│   │   ├── middleware/     # Auth, validation
│   │   ├── utils/          # Helpers
│   │   └── config/         # Cấu hình
│   ├── tests/
│   └── docs/
├── Khởi tạo framework
└── Thiết lập entry point

Bước 3: THIẾT LẬP DATABASE
├── Tạo config kết nối
├── Thiết lập ORM models/entities
├── Tạo files migration
├── Seed dữ liệu ban đầu (nếu cần)
└── Test kết nối

Bước 4: TRIỂN KHAI API
├── Định nghĩa routes/endpoints
├── Triển khai controllers
├── Thêm validation request (Zod, Joi, class-validator)
├── Tạo service layer
├── Thêm xử lý lỗi
└── Triển khai pagination

Bước 5: XÁC THỰC & PHÂN QUYỀN
├── Thiết lập JWT hoặc session auth
├── Tạo auth middleware
├── Triển khai role-based access
├── Thêm password hashing
└── Thiết lập OAuth (nếu cần)
```

---

#### 11. NODEJS-BEST-PRACTICES (Best Practices Node.js)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH CODE
├── Đọc code Node.js hiện có
├── Xác định framework (Express/Fastify/NestJS)
├── Kiểm tra dependencies package.json
├── Phân tích patterns async đã dùng
└── Xác định vấn đề bảo mật

Bước 2: ÁP DỤNG PATTERN
├── Áp dụng async/await (tránh callbacks)
├── Triển khai xử lý lỗi đúng cách
├── Thêm validation input
├── Sử dụng dependency injection (NestJS)
└── Áp dụng patterns middleware

Bước 3: CỦNG CỐ BẢO MẬT
├── Thêm Helmet cho headers
├── Triển khai rate limiting
├── Làm sạch user inputs
├── Sử dụng parameterized queries
├── Thêm CORS configuration
└── Ẩn chi tiết lỗi trong production

Bước 4: TỐI ƯU HIỆU SUẤT
├── Triển khai strategies caching
├── Thêm connection pooling
├── Sử dụng streams cho dữ liệu lớn
├── Tối ưu event loop usage
└── Thêm monitoring (PM2, New Relic)
```

**Các Pattern Chính:**
| Pattern | Triển Khai |
|---------|------------|
| Async/Await | Thay thế tất cả callbacks |
| Error Handling | Try-catch + error middleware |
| Validation | Zod/Joi cho mọi input |
| Security | Helmet + express-rate-limit |
| Logging | Structured logging với Pino |

---

#### 12. PYTHON-PATTERNS

**Các Bước Xử Lý:**

```
Bước 1: THIẾT LẬP MÔI TRƯỜNG
├── Kiểm tra Python version (3.9+)
├── Tạo virtual environment
├── Thiết lập pyproject.toml hoặc requirements.txt
├── Cài đặt dependencies
└── Cấu hình type checking (mypy)

Bước 2: CẤU TRÚC DỰ ÁN
├── Tạo layout thư mục:
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models/
│   │   ├── services/
│   │   └── api/
│   ├── tests/
│   ├── Dockerfile
│   └── pyproject.toml
└── Thiết lập entry points

Bước 3: CHỌN FRAMEWORK
├── FastAPI: Hiện đại, async, auto-docs
├── Flask: Đơn giản, linh hoạt
├── Django: Đầy đủ tính năng
└── Cấu hình framework đã chọn

Bước 4: TRIỂN KHAI CODE
├── Thêm type hints (PEP 484)
├── Sử dụng dataclasses/Pydantic models
├── Triển khai async functions
├── Thêm docstrings (Google/NumPy style)
└── Tuân theo PEP 8 style guide
```

---

#### 13. API-PATTERNS

**Các Bước Xử Lý:**

```
Bước 1: CHỌN STYLE API
├── Đánh giá các lựa chọn:
│   ├── REST: Chuẩn, cacheable, đơn giản
│   ├── GraphQL: Queries linh hoạt, dữ liệu phức tạp
│   ├── tRPC: Type-safe, full-stack TypeScript
│   └── gRPC: Hiệu suất cao, binary
└── Đề xuất dựa trên use case

Bước 2: THIẾT KẾ ENDPOINT
├── Định nghĩa đặt tên resource (danh từ số nhiều)
├── Thiết kế cấu trúc URL:
│   ├── GET    /api/v1/users       (danh sách)
│   ├── GET    /api/v1/users/:id   (lấy một)
│   ├── POST   /api/v1/users       (tạo)
│   ├── PUT    /api/v1/users/:id   (cập nhật)
│   ├── PATCH  /api/v1/users/:id   (cập nhật một phần)
│   └── DELETE /api/v1/users/:id   (xóa)
└── Thiết lập giới hạn nesting (tối đa 2 cấp)

Bước 3: THIẾT KẾ REQUEST/RESPONSE
├── Định nghĩa envelope nhất quán:
│   {
│     "data": {...},        // hoặc [...]
│     "meta": {...},        // pagination, v.v.
│     "error": null         // hoặc error object
│   }
├── Chuẩn hóa HTTP status codes
├── Thêm request ID để tracing
└── Triển khai HATEOAS (tùy chọn)

Bước 4: CHIẾN LƯỢC VERSIONING
├── URL versioning: /api/v1/... (khuyến nghị)
├── Header versioning: Accept-Version: v1
└── Document deprecation policy

Bước 5: PAGINATION
├── Offset-based: ?page=1&limit=20
├── Cursor-based: ?cursor=xyz&limit=20 (cho datasets lớn)
├── Bao gồm trong response:
│   {
│     "data": [...],
│     "pagination": {
│       "page": 1,
│       "limit": 20,
│       "total": 100,
│       "hasMore": true
│     }
│   }
```

---

#### 14. DATABASE-DESIGN (Thiết Kế Database)

**Các Bước Xử Lý:**

```
Bước 1: THU THẬP YÊU CẦU
├── Xác định entities từ yêu cầu
├── Định nghĩa relationships (1:1, 1:N, M:N)
├── Ước tính khối lượng dữ liệu
├── Xác định patterns query
└── Ghi chú yêu cầu hiệu suất

Bước 2: THIẾT KẾ KHÁI NIỆM
├── Tạo ER diagram (entities & relationships)
├── Định nghĩa primary keys
├── Xác định natural keys vs surrogate keys
├── Ánh xạ inheritance hierarchies
└── Document business rules

Bước 3: THIẾT KẾ LOGIC
├── Chuyển ER thành tables
├── Định nghĩa columns với types:
│   ├── Sử dụng data types phù hợp
│   ├── Đặt lengths/precision
│   ├── Định nghĩa NULL constraints
│   └── Thêm default values
├── Normalize đến 3NF (hoặc denormalize cho hiệu suất)
└── Tạo junction tables cho M:N

Bước 4: THIẾT KẾ VẬT LÝ
├── Thiết kế indexes:
│   ├── Primary key (clustered)
│   ├── Foreign key indexes
│   ├── Indexes theo query cụ thể
│   └── Partial/filtered indexes
├── Xem xét partitioning (tables lớn)
├── Lập kế hoạch sharding (nếu cần)
└── Thiết lập tablespaces/storage
```

**Quy Tắc Chuẩn Hóa:**
| Dạng Chuẩn | Quy Tắc |
|------------|---------|
| 1NF | Giá trị nguyên tử, không nhóm lặp |
| 2NF | 1NF + không phụ thuộc một phần |
| 3NF | 2NF + không phụ thuộc bắc cầu |
| BCNF | Mọi determinant là candidate key |

---

#### 15. DATABASES

**Các Bước Xử Lý:**

```
Bước 1: PHÁT HIỆN DATABASE
├── Kiểm tra Prisma schema
├── Tìm Drizzle config
├── Xác định TypeORM entities
├── Phát hiện MongoDB connections
└── Xác định loại database

Bước 2: VIẾT QUERY
├── Cho SQL:
│   ├── Viết câu lệnh SELECT hiệu quả
│   ├── Sử dụng JOINs phù hợp
│   ├── Thêm WHERE clauses với indexes
│   ├── Dùng LIMIT/OFFSET hoặc cursor pagination
│   └── Tối ưu với EXPLAIN ANALYZE
├── Cho NoSQL:
│   ├── Thiết kế cấu trúc document
│   ├── Tạo indexes phù hợp
│   ├── Sử dụng aggregation pipelines
│   └── Triển khai pagination

Bước 3: THAO TÁC ORM
├── Prisma:
│   ├── Viết Prisma Client queries
│   ├── Dùng include cho relations
│   ├── Triển khai transactions
│   └── Dùng raw queries khi cần
├── Drizzle:
│   ├── Định nghĩa schemas
│   ├── Viết queries type-safe
│   └── Dùng migrations

Bước 4: QUẢN LÝ MIGRATION
├── Tạo files migration
├── Viết up/down migrations
├── Test migrations locally
├── Lập kế hoạch production deployment
└── Document breaking changes
```

---

#### 16. BETTER-AUTH

**Các Bước Xử Lý:**

```
Bước 1: PHÁT HIỆN DỰ ÁN
├── Kiểm tra Next.js (mục tiêu chính)
├── Phát hiện giải pháp auth hiện có
├── Xác định database (Prisma ưu tiên)
└── Kiểm tra framework compatibility

Bước 2: CÀI ĐẶT PACKAGE
├── Chạy: npm install better-auth
├── Cài adapter database
├── Thêm packages social provider (nếu cần)
└── Cập nhật package.json

Bước 3: THIẾT LẬP CẤU HÌNH
├── Tạo file auth.ts:
│   ├── Định nghĩa database adapter
│   ├── Cấu hình social providers
│   ├── Đặt session strategy
│   ├── Định nghĩa callbacks
│   └── Thêm custom fields
└── Thiết lập biến môi trường

Bước 4: SCHEMA DATABASE
├── Thêm tables auth vào schema:
│   ├── User
│   ├── Session
│   ├── Account (cho OAuth)
│   └── VerificationToken
├── Tạo migration
└── Áp dụng vào database

Bước 5: ROUTES API
├── Tạo auth API route:
│   ├── /api/auth/[...all]
│   ├── Xử lý mọi thao tác auth
│   └── Export auth handler
└── Thiết lập CORS nếu cần

Bước 6: TRIỂN KHAI CLIENT
├── Tạo AuthProvider wrapper
├── Thêm hook useSession
├── Triển khai form login
├── Tạo form signup
├── Thêm OAuth buttons
└── Xử lý password reset

Bước 7: ROUTES ĐƯỢC BẢO VỆ
├── Tạo middleware cho protection
├── Thêm getServerSession cho SSR
├── Triển khai client-side guards
└── Xử lý role-based access
```

---

#### 17. SERVER-MANAGEMENT (Quản Lý Server)

**Các Bước Xử Lý:**

```
Bước 1: ĐÁNH GIÁ SERVER
├── Xác định loại server (VPS, dedicated, cloud)
├── Kiểm tra OS (Ubuntu, CentOS, v.v.)
├── Đánh giá cấu hình hiện tại
├── Xác định services đang chạy
└── Kiểm tra resource usage

Bước 2: THIẾT LẬP WEB SERVER
├── Cho Nginx:
│   ├── Cài nginx
│   ├── Tạo site config
│   ├── Thiết lập reverse proxy
│   ├── Cấu hình SSL
│   └── Bật gzip/brotli
├── Cho Apache:
│   ├── Cài apache2
│   ├── Bật các modules cần thiết
│   ├── Tạo virtual host
│   └── Cấu hình .htaccess

Bước 3: CẤU HÌNH SSL/TLS
├── Cài Certbot
├── Tạo certificates
├── Thiết lập auto-renewal
├── Cấu hình HTTPS redirects
├── Thêm HSTS headers
└── Test SSL rating

Bước 4: DOMAIN & DNS
├── Cấu hình DNS records:
│   ├── A record → IP server
│   ├── CNAME cho www
│   └── MX records (nếu có email)
├── Thiết lập reverse DNS
├── Cấu hình subdomain routing
└── Test DNS propagation

Bước 5: CỦNG CỐ BẢO MẬT
├── Cấu hình firewall (ufw/iptables)
├── Disable root SSH
├── Thiết lập fail2ban
├── Xóa các services không cần thiết
├── Cập nhật system packages
└── Cấu hình automatic security updates
```

---

#### 18. DEPLOYMENT-PROCEDURES (Quy Trình Triển Khai)

**Các Bước Xử Lý:**

```
Bước 1: CHECKLIST PRE-DEPLOYMENT
├── Chạy tất cả tests (unit, integration, e2e)
├── Kiểm tra test coverage (>80%)
├── Chạy security audit (npm audit)
├── Xác minh biến môi trường
├── Kiểm tra database migrations
└── Tạo deployment notes

Bước 2: PHÁT HIỆN NỀN TẢNG
├── Kiểm tra vercel.json → Vercel
├── Kiểm tra netlify.toml → Netlify
├── Kiểm tra Dockerfile → Docker
├── Kiểm tra fly.toml → Fly.io
└── Mặc định manual deployment

Bước 3: QUY TRÌNH BUILD
├── Chạy production build
├── Xác minh build output
├── Kiểm tra bundle size
├── Tối ưu assets
└── Generate source maps

Bước 4: DATABASE MIGRATIONS
├── Tạo backup
├── Chạy migrations
├── Xác minh schema changes
├── Sẵn sàng rollback plan
└── Test trên staging trước

Bước 5: THỰC THI TRIỂN KHAI
├── Triển khai lên staging
├── Chạy smoke tests
├── Triển khai lên production
├── Xác minh triển khai
├── Monitor error rates
└── Kiểm tra performance metrics

Bước 6: POST-DEPLOYMENT
├── Xác minh mọi tính năng hoạt động
├── Monitor logs cho errors
├── Kiểm tra feedback ngườ dùng
├── Document các vấn đề
└── Lên lịch rollback window

Bước 7: THỦ TỤC ROLLBACK (nếu cần)
├── Xác định version ổn định cuối cùng
├── Thực thi rollback command
├── Xác minh rollback thành công
├── Thông báo team
└── Document bài học kinh nghiệm
```

---

#### 19. DEVOPS

**Các Bước Xử Lý:**

```
Bước 1: ĐÁNH GIÁ INFRASTRUCTURE
├── Phân tích setup hiện tại
├── Xác định điểm đau
├── Xác định nhu cầu scalability
├── Đánh giá tư thế bảo mật
└── Định nghĩa mục tiêu automation

Bước 2: CONTAINERIZATION (Docker)
├── Tạo Dockerfile:
│   ├── Multi-stage build
│   ├── Base image tối thiểu (Alpine/Distroless)
│   ├── Non-root user
│   └── Tối ưu layer caching
├── Tạo docker-compose.yml
├── Thiết lập Docker registry
└── Document build process

Bước 3: ORCHESTRATION (Kubernetes)
├── Tạo K8s manifests:
│   ├── Deployment
│   ├── Service
│   ├── Ingress
│   ├── ConfigMap
│   └── Secret
├── Thiết lập Helm charts
├── Cấu hình auto-scaling (HPA)
└── Triển khai health checks

Bước 4: CI/CD PIPELINE
├── GitHub Actions:
│   ├── .github/workflows/ci.yml
│   ├── Test on PR
│   ├── Build on merge
│   └── Deploy on release
├── GitLab CI:
│   ├── .gitlab-ci.yml
│   ├── Stages: test → build → deploy
│   └── Environment-specific jobs
└── Thiết lập deployment gates

Bước 5: THIẾT LẬP CLOUD PLATFORM
├── Cloudflare:
│   ├── Cấu hình Workers
│   ├── Thiết lập R2 storage
│   ├── Cấu hình D1 database
│   └── Thêm Pages deployment
├── GCP:
│   ├── Cloud Run deployment
│   ├── Cloud Storage
│   └── Cloud SQL
└── AWS (nếu cần):
    ├── ECS/EKS
    ├── S3
    └── RDS

Bước 6: MONITORING & OBSERVABILITY
├── Thiết lập logging (ELK/Loki)
├── Cấu hình metrics (Prometheus/Grafana)
├── Thêm distributed tracing
├── Thiết lập alerting (PagerDuty/Slack)
└── Tạo dashboards
```

---

### DANH MỤC 4: FRONTEND & UI

---

#### 20. FRONTEND-DESIGN (Thiết Kế Frontend)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH THIẾT KẾ
├── Hiểu yêu cầu
├── Xác định design patterns
├── Kiểm tra design system hiện có
├── Xác định nhu cầu accessibility
└── Xem xét yêu cầu responsive

Bước 2: KIẾN TRÚC COMPONENT
├── Chọn loại component:
│   ├── Presentational (props in, UI out)
│   ├── Container (data fetching)
│   ├── Layout (cấu trúc trang)
│   └── Higher-Order (logic chia sẻ)
├── Định nghĩa prop interface
├── Lập kế hoạch state management
└── Xác định side effects

Bước 3: TRIỂN KHAI
├── Tạo file component
├── Triển khai JSX/template
├── Thêm styling (CSS/Tailwind/styled)
├── Xử lý interactions
├── Thêm animations (nếu cần)
└── Triển khai error states

Bước 4: THIẾT KẾ RESPONSIVE
├── Định nghĩa breakpoints:
│   ├── Mobile: < 640px
│   ├── Tablet: 640px - 1024px
│   └── Desktop: > 1024px
├── Triển khai mobile-first approach
├── Test touch interactions
└── Tối ưu hình ảnh

Bước 5: ACCESSIBILITY (a11y)
├── Thêm semantic HTML
├── Triển khai ARIA labels
├── Đảm bảo keyboard navigation
├── Kiểm tra color contrast (WCAG 4.5:1)
├── Test với screen readers
└── Thêm focus indicators
```

---

#### 21. NEXTJS-REACT-EXPERT

**Các Bước Xử Lý:**

```
Bước 1: PHÁT HIỆN DỰ ÁN
├── Kiểm tra Next.js version (13+ cho App Router)
├── Phát hiện loại router:
│   ├── App Router (thư mục app/)
│   └── Pages Router (thư mục pages/)
├── Xác định rendering strategy:
│   ├── Static Generation (SSG)
│   ├── Server-Side Rendering (SSR)
│   ├── Incremental Static Regeneration (ISR)
│   └── Client-Side Rendering (CSR)
└── Kiểm tra config hiện có

Bước 2: PATTERNS APP ROUTER
├── Server Components (mặc định):
│   ├── Fetch data trực tiếp
│   ├── Truy cập backend resources
│   ├── Giữ bundle size nhỏ
│   └── Dùng cho UI không tương tác
├── Client Components ("use client"):
│   ├── Thêm cho tương tác
│   ├── Dùng hooks (useState, useEffect)
│   ├── Truy cập browser APIs
│   └── Giữ ở mức tối thiểu
└── Composition pattern:
    ├── Server Component làm parent
    └── Client Component cho tương tác

Bước 3: DATA FETCHING
├── Server Components:
│   ├── async function Component()
│   ├── Gọi fetch() trực tiếp
│   ├── Caching với revalidate
│   └── Xử lý lỗi với error.tsx
├── Route Handlers:
│   ├── app/api/route.ts
│   ├── HTTP methods (GET, POST, v.v.)
│   └── Edge vs Node runtime

Bước 4: PATTERNS ROUTING
├── Parallel Routes (@folder):
│   ├── app/@dashboard/page.tsx
│   ├── app/@settings/page.tsx
│   └── layout.tsx render children + @slots
├── Intercepting Routes (.()):
│   ├── app/feed/page.tsx
│   └── app/feed/(.)photo/[id]/page.tsx
├── Route Groups (folder):
│   └── app/(marketing)/page.tsx
└── Dynamic Segments:
    ├── app/blog/[slug]/page.tsx
    └── generateStaticParams()

Bước 5: TỐI ƯU RENDERING
├── Image Optimization:
│   ├── Dùng next/image
│   ├── Tự động chuyển WebP
│   ├── Responsive srcSet
│   └── Priority loading cho LCP
├── Font Optimization:
│   ├── Dùng next/font
│   ├── Tự động subsetting
│   └── CSS variable injection
└── Script Optimization:
    ├── Dùng next/script
```

---

#### 22. UI-STYLING

**Các Bước Xử Lý:**

```
Bước 1: PHÁT HIỆN TECH STACK
├── Kiểm tra Tailwind config
├── Phát hiện shadcn/ui usage
├── Xác định CSS-in-JS (styled-components, emotion)
├── Kiểm tra theme hiện có
└── Đánh giá design system

Bước 2: THIẾT LẬP COMPONENT LIBRARY (shadcn/ui)
├── Initialize shadcn:
│   └── npx shadcn-ui@latest init
├── Thêm components:
│   └── npx shadcn add button card input
├── Tùy chỉnh theme:
│   ├── colors trong tailwind.config.ts
│   ├── border-radius
│   └── CSS variables
└── Mở rộng components khi cần

Bước 3: TRIỂN KHAI TAILWIND
├── Cấu hình tailwind.config.ts:
│   ├── content paths
│   ├── theme extensions
│   ├── plugins
│   └── custom utilities
├── Áp dụng utility classes:
│   ├── Layout: flex, grid, container
│   ├── Spacing: p-4, m-2, gap-4
│   ├── Sizing: w-full, h-screen
│   ├── Typography: text-lg, font-bold
│   └── Colors: bg-primary, text-muted
└── Dùng arbitrary values ít nhất có thể

Bước 4: CẤU HÌNH THEME
├── Light/Dark mode:
│   ├── next-themes setup
│   ├── class strategy
│   └── dark: variants
├── Hệ thống màu:
│   ├── Primary, secondary, accent
│   ├── Background, foreground
│   ├── Muted, destructive
│   └── Custom brand colors
└── CSS Variables:
    └── --background, --foreground, v.v.
```

---

### DANH MỤC 5: TESTING & CHẤT LƯỢNG

---

#### 28. TESTING-PATTERNS

**Các Bước Xử Lý:**

```
Bước 1: CHỌN LOẠI TEST
├── Unit Tests:
│   ├── Test các hàm riêng lẻ
│   ├── Mock dependencies
│   ├── Thực thi nhanh
│   └── Mục tiêu coverage cao (80%+)
├── Integration Tests:
│   ├── Test tương tác components
│   ├── Dependencies thật
│   └── Chậm hơn, ít tests hơn
├── E2E Tests:
│   ├── Full user flows
│   ├── Browser automation
│   └── Chỉ smoke tests
└── Test Pyramid: Nhiều unit → Một số integration → Ít E2E

Bước 2: THIẾT LẬP FRAMEWORK
├── Vitest (khuyến nghị cho Vite):
│   ├── npm install -D vitest
│   ├── Create vitest.config.ts
│   ├── Setup coverage (v8)
│   └── Happy DOM cho component tests
├── Jest (nếu bắt buộc):
│   ├── Configure jest.config.js
│   ├── Setup ts-jest
│   └── Configure testEnvironment

Bước 3: VIẾT UNIT TEST
├── AAA Pattern:
│   // Arrange (Chuẩn bị)
│   const input = { name: "John" };
│
│   // Act (Hành động)
│   const result = greet(input);
│
│   // Assert (Khẳng định)
│   expect(result).toBe("Hello, John");
├── Các trường hợp test:
│   ├── Happy path (đường vui vẻ)
│   ├── Edge cases (trường hợp biên)
│   ├── Error cases (lỗi)
│   └── Boundary values (giá trị ranh giới)

Bước 4: MOCKING
├── Mock functions:
│   const mockFn = vi.fn();
│   mockFn.mockReturnValue('mocked');
├── Mock modules:
│   vi.mock('./api', () => ({
│     fetchUser: vi.fn()
│   }));
├── Mock timers:
│   vi.useFakeTimers();
│   vi.advanceTimersByTime(1000);
└── Restore mocks sau mỗi test
```

---

#### 29. WEB-TESTING

**Các Bước Xử Lý:**

```
Bước 1: THIẾT LẬP PLAYWRIGHT
├── Cài đặt:
│   └── npm init playwright@latest
├── Cấu hình playwright.config.ts:
│   ├── Multiple browsers (Chromium, Firefox, WebKit)
│   ├── Viewport sizes
│   ├── Base URL
│   └── Retry configuration

Bước 2: VIẾT E2E TEST
├── Cấu trúc cơ bản:
│   test('user can login', async ({ page }) => {
│     await page.goto('/login');
│     await page.fill('[name=email]', 'test@example.com');
│     await page.fill('[name=password]', 'password');
│     await page.click('button[type=submit]');
│     await expect(page).toHaveURL('/dashboard');
│   });
├── Best practices:
│   ├── Test hành vi ngườ dùng thấy được
│   ├── Dùng role selectors (ưu tiên)
│   ├── Tránh test implementation
│   └── Một assertion mỗi test (lý tưởng)

Bước 3: VISUAL REGRESSION
├── So sánh screenshots:
│   test('homepage visual', async ({ page }) => {
│     await page.goto('/');
│     await expect(page).toHaveScreenshot();
│   });
├── Cập nhật baselines:
│   └── npx playwright test --update-snapshots

Bước 4: ACCESSIBILITY TESTING
├── Dùng @axe-core/playwright:
│   const accessibilityScanResults =
│     await new AxeBuilder({ page }).analyze();
│   expect(accessibilityScanResults.violations)
│     .toEqual([]);
```

---

#### 31. TDD-WORKFLOW

**Các Bước Xử Lý:**

```
CHU KỲ RED-GREEN-REFACTOR:

GIAI ĐOẠN 1: RED (Viết test thất bại)
├── Hiểu yêu cầu
├── Viết test tối thiểu:
│   test('calculates sum', () => {
│     expect(add(2, 2)).toBe(4);
│   });
├── Chạy test → Phải FAIL
├── Xác nhận thất bại là mong đợi
└── Commit: "Add failing test for add function"

GIAI ĐOẠN 2: GREEN (Làm test pass)
├── Viết triển khai tối thiểu:
│   function add(a, b) {
│     return a + b;
│   }
├── Chạy test → Phải PASS
├── Chưa cần lo về chất lượng
├── Tất cả tests phải pass
└── Commit: "Implement add function"

GIAI ĐOẠN 3: REFACTOR (Cải thiện code)
├── Cải thiện triển khai:
│   // Thêm type safety
│   function add(a: number, b: number): number {
│     return a + b;
│   }
├── Chạy tests → Vẫn PASS
├── Cải thiện không đổi hành vi
├── Dọn sạch duplication
├── Đặt tên tốt hơn
└── Commit: "Refactor add with types"

LẶP LẠI cho mỗi tính năng

NGUYÊN TẮC TDD:
├── Viết test trước triển khai
├── Tests là specifications
├── Từng bước nhỏ
├── Vòng phản hồi nhanh
├── Refactor tự tin
└── Emergent design (thiết kế nổi)
```

---

### DANH MỤC 6: DEBUGGING (GỠ LỖI)

---

#### 36. DEBUGGING (Router Chính)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH LỖI
├── Capture error message
├── Xác định loại lỗi:
│   ├── Syntax error (Lỗi cú pháp)
│   ├── Runtime error (Lỗi runtime)
│   ├── Logic error (Lỗi logic)
│   ├── Performance issue (Vấn đề hiệu suất)
│   └── Network/Async error (Lỗi mạng/async)
├── Xác định vị trí lỗi
└── Thu thập stack trace

Bước 2: THU THẬP NGỮ CẢNH
├── Đọc file vị trí lỗi
├── Kiểm tra thay đổi gần đây (git)
├── Xác định dependencies liên quan
├── Xem xét test failures liên quan
└── Tái tạo vấn đề

Bước 3: ROUTING SUB-SKILL
├── Route đến chuyên gia phù hợp:
│   ├── systematic-debugging → Cách tiếp cận có phương pháp
│   ├── root-cause-tracing → Phân tích sâu
│   ├── verification-before-completion → Xác thực
│   └── defense-in-depth → Fixes robust
└── Truyền context cho sub-skill

Bước 4: TRIỂN KHAI FIX
├── Phân tích root cause
├── Triển khai fix tối thiểu
├── Test fix
├── Kiểm tra side effects
└── Document giải pháp

Bước 5: PHÒNG NGỪA
├── Thêm regression test
├── Cập nhật documentation
├── Cải thiện error messages
├── Thêm monitoring/logging
└── Chia sẻ bài học kinh nghiệm
```

---

#### 37. SYSTEMATIC-DEBUGGING (Gỡ Lỗi Có Hệ Thống)

**Các Bước Xử Lý:**

```
PHƯƠNG PHÁP KHOA HỌC CHO DEBUGGING:

GIAI ĐOẠN 1: QUAN SÁT (OBSERVE)
├── Thu thập bằng chứng:
│   ├── Error messages
│   ├── Stack traces
│   ├── Log output
│   ├── User reports
│   └── System state
├── Document symptoms:
│   ├── Chuyện gì xảy ra?
│   ├── Khi nào xảy ra?
│   ├── Tần suất?
│   └── Chi tiết môi trường
└── Tạo bug reproduction steps

GIAI ĐOẠN 2: ĐƯA RA GIẢ THUYẾT (HYPOTHESIZE)
├── Tạo các nguyên nhân có thể:
│   ├── Thay đổi code gần đây
│   ├── Cập nhật dependencies
│   ├── Khác biệt môi trường
│   ├── Biến động dữ liệu
│   └── Race conditions
├── Ưu tiên theo khả năng
├── Tạo giả thuyết có thể test
└── Document mỗi giả thuyết

GIAI ĐOẠN 3: THỬ NGHIỆM (EXPERIMENT)
├── Thiết kế test xác thực giả thuyết:
│   ├── Thêm logging
│   ├── Kiểm tra giá trị biến
│   ├── Tách biệt components
│   ├── Thay đổi một biến
│   └── Chạy tests kiểm soát
├── Thực thi thử nghiệm
├── Ghi kết quả
└── So sánh với dự đoán

GIAI ĐOẠN 4: KẾT LUẬN (CONCLUDE)
├── Phân tích kết quả:
│   ├── Giả thuyết được xác nhận?
│   ├── Cần thêm dữ liệu?
│   ├── Giả thuyết khác?
│   └── Xác định root cause?
├── Nếu xác nhận → Fix
├── Nếu không → Giả thuyết mới
└── Document findings

GIAI ĐOẠN 5: XÁC THỰC (VERIFY)
├── Áp dụng fix
├── Test reproduction steps
├── Xác minh fix hoạt động
├── Kiểm tra regressions
└── Đóng vòng lặp
```

---

### DANH MỤC 7: KIẾN TRÚC & THIẾT KẾ

---

#### 40. ARCHITECTURE (Kiến Trúc)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH YÊU CẦU
├── Yêu cầu chức năng:
│   ├── Hệ thống phải làm gì?
│   ├── User workflows
│   ├── Thao tác dữ liệu
│   └── Điểm tích hợp
├── Yêu cầu phi chức năng:
│   ├── Mục tiêu hiệu suất
│   ├── Nhu cầu scalability
│   ├── Availability (SLA)
│   ├── Yêu cầu bảo mật
│   └── Khả năng bảo trì
└── Ràng buộc:
    ├── Ngân sách
    ├── Thờ gian
    ├── Technology stack
    └── Kinh nghiệm team

Bước 2: CHỌN STYLE KIẾN TRÚC
├── Monolith:
│   ├── Codebase đơn nhất
│   ├── Triển khai đơn giản
│   ├── Tốt cho team nhỏ
│   └── Khó scale hơn
├── Microservices:
│   ├── Services độc lập
│   ├── Team autonomy
│   ├── Scale độc lập
│   └── Phối hợp phức tạp
├── Serverless:
│   ├── Event-driven
│   ├── Auto-scaling
│   ├── Pay-per-use
│   └── Vấn đề cold start
└── Modular Monolith:
    ├── Ranh giới module rõ ràng
    ├── Triển khai đơn nhất
    ├── Lộ trình tách sau này
    └── Cân bằng cả hai thế giới

Bước 3: THIẾT KẾ COMPONENT
├── Xác định components cốt lõi:
│   ├── API Gateway
│   ├── Authentication Service
│   ├── Business Services
│   ├── Data Layer
│   └── Message Queue (nếu cần)
├── Định nghĩa interfaces:
│   ├── API contracts
│   ├── Event schemas
│   └── Data formats
└── Lập kế hoạch patterns giao tiếp

Bước 4: KIẾN TRÚC DỮ LIỆU
├── Chọn database:
│   ├── Relational (PostgreSQL)
│   ├── Document (MongoDB)
│   ├── Cache (Redis)
│   └── Search (Elasticsearch)
├── Thiết kế data flow
├── Strategy caching
└── Backup/disaster recovery

Bước 5: TÀI LIỆU C4 MODEL
├── Context Diagram (L1):
│   ├── System boundary
│   ├── Users và external systems
│   └── High-level responsibilities
├── Container Diagram (L2):
│   ├── Applications/services
│   ├── Data stores
│   └── Interactions
├── Component Diagram (L3):
│   ├── Code components
│   └── Interfaces
└── Code Diagram (L4):
    └── Class/sequence diagrams

Bước 6: TẠO ADR
├── Document các quyết định:
│   ├── Title
│   ├── Context (tại sao cần)
│   ├── Decision (chọn gì)
│   ├── Consequences (trade-offs)
│   ├── Status (proposed/accepted)
│   └── Date/author
└── Lưu trong docs/architecture/
```

---

#### 43. SPEC-DRIVEN-DEVELOPMENT (Phát Triển Theo Đặc Tả)

**Các Bước Xử Lý:**

```
LUỒNG CÔNG VIỆC SPEC:

GIAI ĐOẠN 1: SPEC-INIT (/spec-init)
├── Khởi tạo cấu trúc spec:
│   ├── .specs/
│   │   └── feature-name/
│   │       ├── spec.json
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
├── Thiết lập metadata spec.json:
│   ├── id, name, description
│   ├── status: draft
│   └── approvals: {}
└── Capture mô tả ban đầu

GIAI ĐOẠN 2: SPEC-REQUIREMENTS (/spec-requirements)
├── Tạo requirements toàn diện:
│   ├── User stories
│   ├── Acceptance criteria
│   ├── Định dạng EARS (nếu áp dụng)
│   ├── Constraints
│   └── Dependencies
├── Review với stakeholders
├── Iterate dựa trên feedback
└── Đánh dấu requirements đã approved

GIAI ĐOẠN 3: SPEC-DESIGN (/spec-design)
├── Tạo technical design:
│   ├── Architecture overview
│   ├── Data models
│   ├── API contracts
│   ├── UI mockups
│   ├── Error handling
│   └── Testing strategy
├── Review khả thi
├── Cập nhật dựa trên feedback
└── Đánh dấu design đã approved

GIAI ĐOẠN 4: SPEC-TASKS (/spec-tasks)
├── Tạo implementation tasks:
│   ├── Phân rã design thành tasks
│   ├── Định nghĩa dependencies
│   ├── Ước tính effort
│   └── Gán priorities
├── Tạo task list
├── Review đầy đủ
└── Đánh dấu tasks sẵn sàng

GIAI ĐOẠN 5: SPEC-IMPL (/spec-impl)
├── Triển khai tasks:
│   ├── Theo thứ tự task list
│   ├── Cập nhật task status
│   ├── Viết tests cho mỗi task
│   └── Xác thực theo spec
├── Theo dõi tiến độ
├── Cập nhật spec.json status
└── Đánh dấu hoàn thành

GIAI ĐOẠN 6: SPEC-STATUS (/spec-status)
├── Hiển thị trạng thái hiện tại:
│   ├── Tiến độ phase
│   ├── % hoàn thành task
│   ├── Blockers/vấn đề
│   └── Next steps
└── Tạo status report
```

---

### DANH MỤC 8: MEDIA & 3D

---

#### 46. THREEJS

**Các Bước Xử Lý:**

```
Bước 1: THIẾT LẬP SCENE
├── Khởi tạo Three.js:
│   ├── Tạo Scene
│   ├── Tạo Camera (PerspectiveCamera)
│   ├── Tạo Renderer (WebGLRenderer)
│   └── Đặt pixel ratio
├── Cấu hình renderer:
│   ├── Bật shadows
│   ├── Đặt antialias
│   ├── Cấu hình tone mapping
│   └── Đặt output color space

Bước 2: TẠO OBJECT
├── Tạo geometries:
│   ├── BoxGeometry, SphereGeometry
│   ├── PlaneGeometry, CylinderGeometry
│   ├── Custom BufferGeometry
│   └── Tải external models (GLTF/GLB)
├── Tạo materials:
│   ├── MeshBasicMaterial
│   ├── MeshStandardMaterial (PBR)
│   ├── MeshPhysicalMaterial
│   └── ShaderMaterial (tùy chỉnh)
├── Assemble meshes:
│   └── const mesh = new Mesh(geometry, material);

Bước 3: ÁNH SÁNG
├── Thêm nguồn sáng:
│   ├── AmbientLight (cơ bản)
│   ├── DirectionalLight (mặt trờ/chính)
│   ├── PointLight (local)
│   ├── SpotLight (tập trung)
│   └── Environment map (HDR)
├── Cấu hình shadows:
│   ├── Bật shadowMap
│   ├── Đặt shadow camera
│   └── Điều chỉnh shadow bias

Bước 4: ĐIỀU KHIỂN CAMERA
├── Thêm tương tác:
│   ├── OrbitControls (xoay/zoom/pan)
│   ├── TrackballControls
│   ├── FirstPersonControls
│   └── Controls tùy chỉnh
├── Đặt vị trí ban đầu
├── Cấu hình giới hạn:
│   ├── min/max distance
│   ├── min/max polar angle
│   └── damping

Bước 5: VÒNG LẶP ANIMATION
├── Tạo render loop:
│   function animate() {
│     requestAnimationFrame(animate);
│     controls.update();
│     renderer.render(scene, camera);
│   }
├── Thêm animations:
│   ├── Object transformations
│   ├── Material updates
│   ├── Shader uniforms
│   └── Physics simulations
└── Xử lý delta time
```

---

### DANH MỤC 9: PHÁT TRIỂN GAME

---

#### 49. GAME-DEVELOPMENT (Chính)

**Các Bước Xử Lý:**

```
Bước 1: PHÂN TÍCH LOẠI GAME
├── Nền tảng:
│   ├── Web (browser)
│   ├── Mobile (iOS/Android)
│   ├── PC (desktop)
│   ├── Console (nếu áp dụng)
│   └── VR/AR
├── Thể loại:
│   ├── 2D: platformer, RPG, puzzle
│   ├── 3D: FPS, adventure, simulation
│   └── Multiplayer: PvP, co-op, MMO
├── Yêu cầu kỹ thuật:
│   ├── Nhu cầu physics
│   ├── Độ phức tạp đồ họa
│   ├── Yêu cầu audio
│   └── Networking (nếu multiplayer)

Bước 2: CHỌN ENGINE/FRAMEWORK
├── Web 2D:
│   ├── Phaser (đầy đủ tính năng)
│   ├── PixiJS (rendering)
│   └── Kaboom.js (đơn giản)
├── Web 3D:
│   ├── Three.js (linh hoạt)
│   ├── Babylon.js (tập trung game)
│   └── PlayCanvas (commercial)
├── Native/Compiled:
│   ├── Unity (cross-platform)
│   ├── Godot (open source)
│   └── GameMaker (tập trung 2D)
└── Mobile:
    ├── React Native
    ├── Flutter
    └── Native (Swift/Kotlin)

Bước 3: TẠO KHUNG DỰ ÁN
├── Tạo cấu trúc thư mục:
│   ├── src/
│   │   ├── scenes/
│   │   ├── entities/
│   │   ├── systems/
│   │   ├── assets/
│   │   └── utils/
│   ├── assets/
│   │   ├── images/
│   │   ├── audio/
│   │   └── data/
│   └── config files
├── Khởi tạo engine
├── Thiết lập build pipeline
└── Cấu hình asset pipeline

Bước 4: HỆ THỐNG CỐT LÕI
├── Triển khai game loop:
│   ├── Update (logic)
│   ├── Render (vẽ)
│   └── Fixed update (physics)
├── Xử lý input:
│   ├── Keyboard
│   ├── Mouse/touch
│   └── Gamepad
├── Quản lý state:
│   ├── Menu, Playing, Paused, GameOver
│   └── State transitions
└── Hệ thống audio

Bước 5: ROUTE ĐẾN CHUYÊN GIA
├── 2D games → game-development/2d-games
├── 3D games → game-development/3d-games
├── Mobile → game-development/mobile-games
├── Multiplayer → game-development/multiplayer
├── Art → game-development/game-art
└── Audio → game-development/game-audio
```

---

### DANH MỤC 10: BẢO MẬT

---

#### 56. VULNERABILITY-SCANNER (Quét Lỗ Hổng)

**Các Bước Xử Lý:**

```
Bước 1: QUÉT DEPENDENCIES
├── npm audit:
│   ├── Chạy: npm audit
│   ├── Kiểm tra mức độ nghiêm trọng
│   ├── Review CVEs
│   └── Đề xuất updates
├── Snyk scan:
│   ├── Quét dependency sâu
│   ├── License compliance
│   └── Đề xuất fixes
└── Kiểm tra:
    ├── Lỗ hổng đã biết
    ├── Packages outdated
    └── Dependencies không còn maintained

Bước 2: PHÂN TÍCH CODE
├── Static analysis:
│   ├── Hardcoded secrets
│   ├── SQL injection risks
│   ├── XSS vulnerabilities
│   ├── Path traversal
│   └── Insecure deserialization
├── Pattern detection:
│   ├── eval() usage
│   ├── innerHTML assignments
│   ├── document.write()
│   └── unsafe regex

Bước 3: REVIEW CẤU HÌNH
├── Environment variables:
│   ├── Không có secrets trong code
│   ├── Xử lý .env đúng cách
│   └── Secret rotation
├── Authentication:
│   ├── JWT best practices
│   ├── Session security
│   └── Password policies
└── CORS configuration:
    ├── Origins hạn chế
    └── Headers phù hợp

Bước 4: KIỂM TRA COMPLIANCE
├── OWASP Top 10:
│   ├── A01: Broken Access Control
│   ├── A02: Cryptographic Failures
│   ├── A03: Injection
│   ├── A07: Auth Failures
│   └── v.v.
├── Security headers:
│   ├── Content-Security-Policy
│   ├── X-Frame-Options
│   ├── X-Content-Type-Options
│   └── Strict-Transport-Security

Bước 5: BÁO CÁO
├── Tạo findings:
│   ├── Critical (fix ngay)
│   ├── High (fix sớm)
│   ├── Medium (lập kế hoạch fix)
│   └── Low (monitor)
├── Cung cấp remediation:
│   ├── Các bước fix cụ thể
│   ├── Code examples
│   └── Verification steps
└── Theo dõi resolution
```

---

### DANH MỤC 11: TÀI LIỆU & NỘI DUNG

---

#### 58-61. CÁC SKILL TÀI LIỆU

**Chi Tiết Xử Lý:**

| Skill | Input | Xử Lý | Output |
|-------|-------|-------|--------|
| **docx** | Word documents | python-docx, read/write | Modified .docx |
| **pdf** | PDF files | PyPDF2/pdfplumber | Trích xuất text/data |
| **pptx** | PowerPoint | python-pptx | Slides, charts |
| **xlsx** | Excel | openpyxl/pandas | Phân tích dữ liệu, charts |

---

### DANH MỤC 12: MCP & TÍCH HỢP

---

#### 65. MCP-BUILDER

**Các Bước Xử Lý:**

```
Bước 1: ĐỊNH NGHĨA SERVER
├── Xác định mục đích:
│   ├── Tích hợp service nào?
│   ├── Cần những thao tác gì?
│   └── Ai sẽ sử dụng?
├── Chọn transport:
│   ├── stdio (local)
│   ├── HTTP (remote)
│   └── WebSocket (real-time)

Bước 2: TRIỂN KHAI
├── Tạo cấu trúc server:
│   ├── src/server.ts
│   ├── src/tools/
│   ├── src/resources/
│   └── src/prompts/
├── Triển khai handlers:
│   ├── Tool handlers
│   ├── Resource providers
│   └── Prompt templates
└── Thêm error handling

Bước 3: ĐỊNH NGHĨA TOOL
├── Định nghĩa tool schema:
│   name: string;
│   description: string;
│   inputSchema: JSONSchema;
│   handler: (args) => Promise<Result>;
├── Triển khai business logic
├── Thêm validation
└── Trả về kết quả có cấu trúc

Bước 4: TRIỂN KHAI
├── Package server
├── Deploy lên hosting
├── Cấu hình Claude
└── Test tích hợp
```

---

### DANH MỤC 13: CLI & HỆ THỐNG

---

#### 67-68. BASH-LINUX & POWERSHELL-WINDOWS

**Các Pattern Xử Lý:**

| Khía Cạnh | Bash/Linux | PowerShell |
|-----------|------------|------------|
| Phong cách lệnh | Pipes, công cụ nhỏ | Cmdlets, objects |
| Xử lý lỗi | `set -e`, `\|\|` | Try/catch blocks |
| Xử lý đường dẫn | Forward slashes | Backslashes |
| Tác vụ thông thường | grep, sed, awk | Get-Content, Where-Object |

---

### DANH MỤC 14: HIỆU SUẤT & TỐI ƯU

---

#### 70-71. CÁC SKILL HIỆU SUẤT

**Các Bước Xử Lý:**

```
Bước 1: PROFILING
├── CPU profiling:
│   ├── Chrome DevTools Performance
│   ├── Node.js --prof
│   └── Python cProfile
├── Memory profiling:
│   ├── Heap snapshots
│   ├── Phát hiện memory leaks
│   └── Phân tích garbage collection
└── Network profiling:
    ├── Request waterfall
│   ├── Bundle analysis
│   └── CDN performance

Bước 2: PHÂN TÍCH
├── Xác định bottlenecks:
│   ├── Long tasks (>50ms)
│   ├── Layout thrashing
│   ├── Forced synchronous layout
│   └── Memory bloat
├── Đo metrics:
│   ├── Core Web Vitals
│   ├── Time to Interactive
│   └── Bundle size

Bước 3: TỐI ƯU
├── Tối ưu code:
│   ├── Cải thiện algorithms
│   ├── Memoization
│   ├── Lazy loading
│   └── Code splitting
├── Tối ưu assets:
│   ├── Nén hình ảnh
│   ├── Font subsetting
│   ├── Minification
│   └── Compression (gzip/brotli)
└── Strategies caching
```

---

### DANH MỤC 15: E-COMMERCE & THANH TOÁN

---

#### 74. PAYMENT-INTEGRATION (Tích Hợp Thanh Toán)

**Các Nhà Cung Cấp Hỗ Trợ:**
- Stripe (toàn cầu)
- PayPal (toàn cầu)
- SePay/VietQR (Việt Nam)
- Paddle (subscriptions)
- Creem.io (licensing)

**Các Bước Xử Lý:**
- Tạo checkout flow
- Xử lý webhooks
- Quản lý subscriptions
- Xử lý refunds

---

### DANH MỤC 16: SEO & MARKETING

---

#### 75-76. CÁC SKILL SEO

**Xử Lý:**
- Tối ưu meta tags
- Structured data (Schema.org)
- Tạo sitemap
- robots.txt
- Core Web Vitals
- Nguyên tắc E-E-A-T

---

### DANH MỤC 17: I18N & LOCALIZATION

---

#### 77. I18N-LOCALIZATION

**Xử Lý:**
- Thiết lập framework (next-intl, react-i18next)
- Trích xuất strings
- Quản lý files dịch
- Chuyển đổi locale
- Hỗ trợ RTL
- Định dạng date/number

---

### DANH MỤC 18: GIẢI QUYẾT VẤN ĐỀ

---

#### 78-79. CÁC SKILL GIẢI QUYẾT VẤN ĐỀ

**Các Kỹ Thuật:**
- Collision Zone Thinking (giao điểm ý tưởng)
- Inversion (tránh thất bại)
- Meta Pattern Recognition (nhận diện pattern)
- Scale Game (tư duy theo cấp độ)
- Simplification Cascades (đơn giản hóa)
- When Stuck strategies (khi bí)

---

### DANH MỤC 19: QUẢN LÝ SKILL

---

#### 80. SKILL-CREATOR (Trình Tạo Skill)

**Xử Lý:**
- SKILL.md template
- skill.json metadata
- Định nghĩa trigger words
- Tổ chức references
- Validation

---

#### 81-89. CÁC LỆNH

**Tóm Tắt Xử Lý Lệnh:**

| Lệnh | Mục Đích | Xử Lý Chính |
|------|----------|-------------|
| `/init` | Khởi tạo dự án | Phát hiện stack, tạo CLAUDE.md |
| `/create` | App mới | Hội thoại tương tác, app-builder |
| `/enhance` | Thêm tính năng | Phân tích, lập kế hoạch, triển khai |
| `/debug` | Chế độ debug | Điều tra có hệ thống |
| `/test` | Chạy tests | Tạo + thực thi |
| `/deploy` | Triển khai | Pre-flight checks, release |
| `/plan` | Tạo kế hoạch | Project-planner agent |
| `/preview` | Dev server | Start/stop/status |
| `/status` | Hiển thị trạng thái | Theo dõi tiến độ |

---

## Tham Khảo Công Cụ

| Công Cụ | Use Cases |
|---------|-----------|
| `Read` | Tải files, hình ảnh, configs |
| `Write` | Tạo files mới |
| `Edit` | Sửa files hiện có |
| `Bash` | Chạy commands, cài packages |
| `Grep` | Tìm patterns code |
| `Glob` | Tìm files theo pattern |
| `Task` | Spawn subagents |
| `Skill` | Gọi skills |
| `WebSearch` | Tìm kiếm internet |
| `WebFetch` | Truy xuất trang cụ thể |
| `SequentialThinking` | Suy luận có cấu trúc |

---

## Luồng Thực Thi Skill

```
┌─────────────────────────────────────────────┐
│ 1. USER INPUT (Ngườ dùng nhập)              │
│    ↓                                        │
│ 2. TRIGGER MATCHING (So khớp trigger)       │
│    - Kiểm tra skill.json triggers           │
│    - Chấm điểm keyword matches              │
│    - Chọn match tốt nhất                    │
│    ↓                                        │
│ 3. SKILL LOADING (Tải skill)                │
│    - Tải SKILL.md                           │
│    - Tải skill.json                         │
│    - Tải references/ (khi cần)              │
│    ↓                                        │
│ 4. CONTEXT ANALYSIS (Phân tích ngữ cảnh)    │
│    - Đọc files liên quan                    │
│    - Kiểm tra trạng thái dự án              │
│    - Tải memory                             │
│    ↓                                        │
│ 5. PROCESSING (Xử lý)                       │
│    - Thực thi logic skill                   │
│    - Sử dụng công cụ phù hợp                │
│    - Xử lý lỗi                              │
│    ↓                                        │
│ 6. OUTPUT (Đầu ra)                          │
│    - Tạo kết quả                            │
│    - Ghi/sửa files                          │
│    - Trình bày cho ngườ dùng                │
└─────────────────────────────────────────────┘
```

---

*Phiên Bản: 2.0*
*Tổng Skills Documented: 90*
*Danh Mục: 20*
*Cập Nhật: 2026-02-05*