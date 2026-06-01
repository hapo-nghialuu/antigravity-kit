# Xưng hô (Addressing Feature)

## Tổng quan

CafeKit cho phép cấu hình **cách AI gọi người dùng** khi giao tiếp tiếng Việt, với **hai mục đích**:
1. **Cá nhân hóa giao tiếp**: AI gọi đúng theo mong muốn (ví dụ: "anh", "đại ca", "sếp")
2. **Phát hiện Context Overflow**: Khi AI đột nhiên không còn gọi đúng = dấu hiệu context window đã bị compact

---

## Cách hoạt động

Quy tắc xưng hô được **ghi trực tiếp vào `CLAUDE.md`** khi cài đặt CafeKit. Mỗi session mới, Claude Code tự động đọc CLAUDE.md và AI sẽ gọi người dùng theo cấu hình. Khi context bị tràn và compact, AI sẽ quên quy tắc này → dấu hiệu rõ ràng để user biết cần `/clear`.

---

## Cấu hình

### Khi cài đặt CafeKit

Installer sẽ hỏi một câu duy nhất:
```
🎯 Xưng hô (Addressing Configuration)
  • Để trống = bỏ qua (không thiết lập xưng hô)

AI gọi bạn là gì? (ví dụ: anh, chị, đại ca, sếp - Enter=bỏ qua):
```

Installer sẽ **ghi trực tiếp vào `CLAUDE.md`** (ở thư mục gốc dự án) theo input của user. Để trống = bỏ qua, không thêm section xưng hô.

### Thay đổi sau khi cài đặt

**Cách 1: Chỉnh sửa trực tiếp CLAUDE.md**

Mở file `CLAUDE.md` (ở thư mục gốc dự án) và sửa section:

```markdown
## Xưng hô (Addressing - Context Overflow Indicator)

AI luôn gọi người dùng là "đại ca" trong suốt conversation.    ← SỬA ĐÂY
```

Sau đó chạy `/clear` để reset session.

**Cách 2: Chạy lại installer**

```bash
npx @haposoft/cafekit
```

Nhập lại cách gọi mới.

---

## Context Overflow Detection

### Dấu hiệu

Khi AI đột nhiên:
- Không còn gọi user theo cấu hình (ví dụ: từ "anh" sang "bạn")
- Trả lời lạc đề

→ **Context đã bị compact**

### Hành động

AI sẽ tự thông báo:
```
⚠️ Context có thể đã bị compact.
Anh có thể cần /clear để reset session.
```

User nên:
1. Chạy `/clear` để reset
2. Hoặc bắt đầu conversation mới
3. Tóm tắt lại yêu cầu quan trọng

---

## Tắt xưng hô

Nếu không cần, xóa section "Xưng hô" trong `CLAUDE.md` (ở thư mục gốc dự án), hoặc chạy lại installer và để trống khi được hỏi.

---

## Technical Details

- **Không dùng hook**: Quy tắc được ghi trực tiếp vào `CLAUDE.md`
- **Ghi vào CLAUDE.md khi install**: Installer modify file theo user input
- **Chỉ 1 ngôi xưng**: Cấu hình cách AI gọi user (không cấu hình AI tự xưng)
- **Để trống = bỏ qua**: Không thêm section nếu user không nhập
- **Canary signal**: Pattern dễ nhận biết để phát hiện context overflow sớm
- **Validation**: Chỉ chấp nhận chữ cái tiếng Việt (a-z, À-ỹ) và khoảng trắng

---

## FAQ

**Q: Có tốn thêm tokens không?**
A: Không đáng kể, vì quy tắc nằm trong CLAUDE.md (đã được load sẵn mỗi session).

**Q: Có thể nhập cụm từ nhiều từ không?**
A: Có. Ví dụ "đại ca", "chị hai", "sếp lớn" đều hợp lệ.

**Q: Tại sao không dùng hook?**
A: CLAUDE.md đã đủ mạnh để AI nhớ và tuân thủ. Hook chỉ thêm phức tạp không cần thiết.

**Q: Có thể nhập ký tự đặc biệt/số không?**
A: Không. Chỉ chấp nhận chữ cái tiếng Việt và khoảng trắng. Input không hợp lệ sẽ bị bỏ qua.

---

## Changelog

### v0.9.4
- ✨ Thêm tính năng xưng hô (cấu hình cách AI gọi user)
- 🎯 Hỗ trợ context overflow detection
- 📝 Installer prompt 1 câu với validation
- 📚 Ghi trực tiếp vào CLAUDE.md (không dùng hook)
- ✅ Để trống = bỏ qua thiết lập
