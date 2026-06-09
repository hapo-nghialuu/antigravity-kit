# Hướng dẫn sử dụng `hapo:specs` (bản mới — 0.11.11+)

Tài liệu này hướng dẫn cách dùng skill `hapo:specs` sau khi nâng cấp: **Creation Mode**, bộ **4 flag**, và **bản dịch đối chiếu (translation mirror)**.

> Tóm tắt 1 câu: trước đây `/hapo:specs <mô tả>` luôn chạy một mạch tới khi sinh task. Bây giờ nó **hỏi bạn muốn chạy tới đâu** (Creation Mode), và toàn bộ spec viết **tiếng Anh làm chuẩn**, có thể kèm 1 bản dịch để đối chiếu.

---

## 1. Bộ flag (chỉ có 4)

| Flag | Tác dụng |
|------|----------|
| `--auto` | Tạo (hoặc chạy tiếp) spec **end-to-end** tới Tasks, **không hỏi** |
| `--validate <feature>` | Review / red-team spec |
| `--status` | Liệt kê trạng thái mọi spec |
| `--archive` | Lưu trữ spec đã hoàn tất |

> Các kiểu cũ `status` / `resume` / `archive` (không có `--`) vẫn chạy như alias, nhưng nên dùng dạng `--flag`.

---

## 2. Tạo spec mới (interactive)

```
/hapo:specs "thêm tính năng xuất hóa đơn PDF cho đơn hàng"
```

Skill sẽ:
1. Kiểm tra có spec nào đang làm dở không → nếu có, hỏi *tiếp tục cái đó* hay *tạo mới*.
2. Nếu mô tả mơ hồ/quá ngắn → hỏi lại cho rõ (hoặc gợi ý `/hapo:brainstorm`).
3. **Hỏi Creation Mode** — bạn muốn chạy tới đâu.

### Creation Mode — 3 lựa chọn

| Lựa chọn | Chạy tới | Khi nào dùng |
|----------|----------|--------------|
| **Auto (→ Tasks)** | Sinh đủ requirements → design → tasks | Muốn ra spec hoàn chỉnh ngay |
| **Stop after Design** | Dừng sau `design.md` (chưa sinh task) | Muốn **review thiết kế trước** khi chẻ task |
| **Step by step** | Dừng + chờ duyệt sau **mỗi** phase | Muốn kiểm soát chặt từng bước |

> "Stop after Design" / "Step by step" sẽ dừng và in **Paused Block**; spec chưa sẵn sàng implement (`ready_for_implementation = false`).

---

## 3. Tạo nhanh, không hỏi gì

```
/hapo:specs "thêm tính năng xuất hóa đơn PDF" --auto
```

→ Chạy thẳng tới Tasks, tự duyệt mỗi phase, **không** hiện Creation Mode. Đây là hành vi giống bản cũ.

---

## 4. Tiếp tục spec đang làm dở

Không cần nhớ tên hay gõ `resume`. Chỉ cần:

```
/hapo:specs
```

Skill tự phát hiện spec dở → hỏi *"Tiếp tục &lt;tên&gt; / Tạo mới"* → đọc `current_phase` → mời chọn phase còn lại để chạy tiếp.

Muốn chạy nốt một mạch tới Tasks:

```
/hapo:specs <tên-feature> --auto
```

---

## 5. Bản dịch đối chiếu (Translation Mirror)

Áp dụng khi ngôn ngữ cài đặt (lúc `npx @haposoft/cafekit`) **không phải tiếng Anh**.

- **Bản gốc (canonical) luôn là tiếng Anh** — đây là bản AI dùng để implement.
- Khi tạo spec **interactive**, skill hỏi thêm: *"Tạo bản đối chiếu &lt;ngôn ngữ&gt;? (đồng bộ, chỉ để đọc)"*.
- Nếu **Có**:
  - Sinh 1 bản duplicate **toàn bộ** spec sang ngôn ngữ đó tại `specs/<feature>/i18n/<lang>/`.
  - Mỗi file có dòng marker `<!-- TRANSLATION MIRROR — reference only -->`.
  - **Luôn đồng bộ lại** mỗi khi bản gốc tiếng Anh thay đổi.

> Bản dịch **chỉ để đọc/đối chiếu**, không phải nguồn chính: validator và `hapo:develop` chỉ dùng bản tiếng Anh. **Không sửa** trong `i18n/` (sẽ bị ghi đè khi sync).

`--auto` sẽ **không** hỏi tạo mirror (nhưng nếu spec đã bật mirror từ trước thì vẫn tự sync).

---

## 6. Các lệnh quản lý

```
/hapo:specs --status              # xem trạng thái mọi spec
/hapo:specs --validate <feature>  # review / red-team trước khi implement
/hapo:specs --archive             # lưu trữ spec đã xong
```

---

## 7. Cấu trúc output

```
specs/<feature>/
├── spec.json          # trạng thái máy (English/lang-agnostic)
├── requirements.md    # tiếng Anh (canonical)
├── research.md
├── design.md
├── tasks/task-R*.md
├── reports/
└── i18n/<lang>/       # (tùy chọn) bản đối chiếu — chỉ để đọc
    ├── requirements.md
    ├── design.md
    ├── research.md
    └── tasks/task-R*.md
```

---

## 8. Cheat sheet — chọn lệnh theo nhu cầu

| Bạn muốn… | Gõ |
|-----------|----|
| Tạo spec, tự chọn dừng ở đâu | `/hapo:specs "<mô tả>"` |
| Tạo spec trọn gói ngay | `/hapo:specs "<mô tả>" --auto` |
| Chỉ tới design rồi review | `/hapo:specs "<mô tả>"` → chọn **Stop after Design** |
| Tiếp tục spec dở | `/hapo:specs` → chọn **Continue** |
| Chạy nốt spec dở không hỏi | `/hapo:specs <feature> --auto` |
| Xem trạng thái | `/hapo:specs --status` |
| Review trước khi code | `/hapo:specs --validate <feature>` |
| Lưu trữ | `/hapo:specs --archive` |
| Bắt đầu implement | `/hapo:develop <feature>` |

---

## 9. Lưu ý quan trọng

- **Spec viết bằng tiếng Anh** kể cả khi bạn đang chat tiếng Việt — đây là chuẩn mới (giúp AI implement nhất quán). Câu trả lời chat vẫn theo ngôn ngữ của bạn.
- Pipeline 10 bước, validator, quy tắc, schema `spec.json` **không đổi** — bản mới chỉ thay đổi *cách gọi*, *điểm dừng*, và *ngôn ngữ canonical + mirror*.
- Dừng sớm (Stop after Design / Step by step) là an toàn: gõ lại `/hapo:specs` để tiếp tục bất cứ lúc nào.
- Sau khi spec `ready_for_implementation = true` → chuyển sang `/hapo:develop <feature>`.

---

*Tài liệu sơ đồ trực quan chi tiết: `docs/hapo-specs-flow.html`.*
