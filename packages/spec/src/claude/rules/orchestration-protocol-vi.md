# Giao thức điều phối (Orchestration Protocol)

## Ngữ cảnh ủy thác (BẮT BUỘC) (Delegation Context - MANDATORY)

Khi tạo (spawning) các subagents thông qua công cụ Task, **LUÔN LUÔN** bao gồm trong câu prompt:

1. **Đường dẫn thư mục làm việc (Work Context Path)**: Đường dẫn git root tuyệt đối của các file CHÍNH đang thao tác đến.
2. **Thư mục báo cáo (Reports Path)**: Chuỗi `{work_context}/plans/reports/` cho dự án đó.
3. **Thư mục kế hoạch (Plans Path)**: Chuỗi `{work_context}/plans/` cho dự án đó.

**Ví dụ:**
```
Task prompt: "Fix parser bug.
Work context: /path/to/project-b
Reports: /path/to/project-b/plans/reports/
Plans: /path/to/project-b/plans/"
```

**Quy tắc:** Nếu đường dẫn hiện hành (CWD) khác lệch với phần đường dẫn work context (do sửa file ở dự án khác), hãy ưu tiên các tham số như **work context paths**, không được dùng CWD paths.

---

#### Kết nối tuần tự (Sequential Chaining)
Kết nối các subagents khi các tác vụ có sự phụ thuộc hoặc yêu cầu đầu ra từ các bước trước đó:
- **Lập kế hoạch → Triển khai Code → Đơn giản hóa → Kiểm thử → Review**: Sử dụng để phát triển tính năng (bài test luôn trực tiếp trên the simplified code).
- **Nghiên cứu → Thiết kế → Code → Viết tài liệu**: Sử dụng đối với các thành phần hệ thống mới.
- Mỗi agent hoàn thành đầy đủ tác vụ xong xuôi trước khi bắt đầu agent tiếp theo.
- Chuyển giao các ngữ cảnh và kết quả (outputs) giữa các agents trong cùng chuỗi.

#### Thực thi song song (Parallel Execution)
Khởi chạy nhiều subagents cùng lúc đối với các task hoạt động độc lập:
- **Code/Implement + Test + Docs**: Khi triển khai các thành phần riêng lẻ mà không bị xung đột.
- **Nhiều nhánh tính năng (Feature Branches)**: Các agents khác nhau nhận việc trên các tính năng biệt lập.
- **Phát triển đa nền tảng (Cross-platform)**: Các thực thi trên iOS và Android cụ thể.
- **Điều phối cẩn thận**: Bảo đảm không có file nào xung đột hoặc tranh chấp tài nguyên chung.
- **Chiến lược Merge**: Lập kế hoạch các điểm được tích hợp trước khi khởi động tiến trình song song.

---

## Giao thức trạng thái của Subagent (Subagent Status Protocol)

Các Subagents bắt buộc báo cáo một trạng thái dưới đây khi hoàn tất công việc:

| Trạng thái (Status) | Ý nghĩa (Meaning) | Hành động của bộ kiểm soát (Controller Action) |
|--------|---------|-------------------|
| **DONE** | Tác vụ hoàn thành thành công | Tiến đến bước tiếp theo (review hoặc task kế). |
| **DONE_WITH_CONCERNS** | Hoàn thành nhưng có mối nghi ngại | Đọc các quan ngại → giải quyết nếu là vấn đề độ chính xác/phạm vi → tiếp tục nếu chỉ là nhận xét chung. |
| **BLOCKED** | Không thể hoàn thành tác vụ | Đánh giá lại nguyên nhân (blocker) → cung cấp thêm ngữ cảnh / chia nhỏ task / báo lại cho user. |
| **NEEDS_CONTEXT** | Thiếu thông tin để đi tiếp | Cung cấp ngữ cảnh bị thiếu → tái phân bổ (re-dispatch). |

### Các quy tắc xử lý (Handling Rules)

- **Không bao giờ** phớt lờ BLOCKED hoặc NEEDS_CONTEXT — có điều gì đó phải thay đổi trước khi thử lại.
- **Không bao giờ** ép buộc cùng một hướng tiếp cận khi đã bị BLOCKED — hãy thử: cung cấp ngữ cảnh nhiều hơn → task đơn giản hơn → mô hình LLMs mạnh hơn → báo lại cho user (escalate).
- **DONE_WITH_CONCERNS** về tăng kích thước file hay nợ kỹ thuật (tech debt) → ghi chú lại cho tương lai, tiếp tục ngay bây giờ.
- **DONE_WITH_CONCERNS** về độ chính xác (correctness) → giải quyết trước bước review.
- Nếu subagent thất bại 3+ lần trở lên trên cùng 1 tác vụ → báo cáo nâng cấp tới user, không chạy thử lại liên tục một cách mù quáng.

### Hình thức Báo cáo (Reporting Format)

Các Subagents nên kết thúc phản hồi bằng format:

```
**Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
**Summary:** [1-2 câu tóm tắt]
**Concerns/Blockers:** [nếu có]
```

---

## Nguyên tắc Cô lập Ngữ cảnh (Context Isolation Principle)

**Subagents chỉ nhận được ngữ cảnh mà chúng cần.** Không bao giờ truyền qua toàn bộ lịch sử đoạn hội thoại phiên (full session history).

### Các Quy tắc

1. **Viết prompts dứt khoát rõ ràng** — Đưa luôn bản mô tả chi tiết công việc, đường dẫn các file liên quan, các tiêu chí nghiệm thu (acceptance criteria). Cấm dùng cách nói "đây là thứ chúng ta đã bàn".
2. **Không mang lịch sử hội thoại** — Subagent nhận ngữ cảnh mới. Hãy tóm tắt các quyết định quan trọng, không lặp lại đoạn hội thoại dài.
3. **Phạm vị tham chiếu file cụ thể** — Liệt kê từng file để đọc/sửa đổi. Tránh dùng câu dạng "nhìn vào codebase tự tìm hiểu".
4. **Luôn chứa ngữ cảnh kế hoạch** — Trường hợp làm từ một kế hoạch, hãy trích xuất đúng giai đoạn văn bản tương ứng (specific phase text), đừng quăng toàn bộ kế hoạch.
5. **Duy trì ngữ cảnh điều hành (controller context)** — Các công tác điều phối gánh vác bởi agent chính. Đừng ném các chi tiết điều phối dài dòng lộn xộn vào những prompts cho subagent.

### Mẫu Prompt 

```
Task: [specific task description - miêu tả rõ chức năng nhiệm vụ]
Files to modify: [list - file nào dọn sửa đổi]
Files to read for context: [list - lấy đọc tham khảo]
Acceptance criteria: [list - tiêu chí nghiệm thu]
Constraints: [any relevant constraints - các ràng buộc cản trở]
Plan reference: [phase file path if applicable - kẹp tham số plan phase file link nếu có]

Work context: [project path - thư mục gốc]
Reports: [reports path]
```

### Các biểu thức ngụy trang phản diện (Anti-Patterns)

| Xấu (Bad) | Tốt (Good) |
|-----|------|
| "Continue from where we left off (Tiếp tục từ nơi chúng ta dừng lại lúc nãy)" | "Implement X feature per spec in phase-02.md (Triển khai tính năng X theo đặc tả trong phase-02.md)" |
| "Fix the issues we discussed (Sửa các vấn đề chúng ta đã đem bàn)" | "Fix null check in auth.ts:45, root cause: missing validation (Sửa kiểm tra null do dính dòng auth.ts:45, nguyên nhân gốc: thiếu bước validation xác thực)" |
| "Look at the codebase and figure out (Nhìn loạn vào codebase tự giải quyết)" | "Read src/api/routes.ts and add POST /users endpoint (Đọc file src/api/routes.ts và thiết lập endpoint POST /users)" |
| Truyền tải nội dung trên 50+ dòng hội thoại dài (Passing 50+ lines of conversation) | Tóm tắt tác vụ trong 5 dòng kèm đường dẫn tới thư mục file paths. |

---

## Nhóm Agent (Tùy chọn)

Dùng cho lúc cộng tác song song đa phiên bản ghi qua nhiều luồng khác biệt (multi-session parallel collaboration), kích hoạt kỹ năng thẻ `/ck:team` để đánh mốc nhóm team.
Kỹ năng này không nằm một phần thiết chế của bộ giao thức workflow chuẩn default orchestration mặc định. Mở tham khảo rà trong `.claude/skills/team/SKILL.md` xem qua các templates, tiêu chí ra quyết định (decision criteria) và các lệnh xuất ra cấu trúc sinh mới (spawn instructions).
