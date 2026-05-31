# Xưng hô (Addressing Feature)

## Tổng quan

CafeKit hỗ trợ cấu hình xưng hô cho tiếng Việt với **hai mục đích**:
1. **Nhất quán giao tiếp**: AI xưng hô đúng cách theo phong cách mong muốn
2. **Phát hiện Context Overflow**: Khi AI đột nhiên đổi cách xưng hô = dấu hiệu context window đã bị compact

---

## Cách hoạt động

Quy tắc xưng hô được **ghi trực tiếp vào `CLAUDE.md`** khi cài đặt CafeKit. Mỗi session mới, Claude Code tự động đọc CLAUDE.md và AI sẽ tuân thủ quy tắc xưng hô. Khi context bị tràn và compact, AI sẽ quên quy tắc này → dấu hiệu rõ ràng để user biết cần `/clear`.

---

## Cấu hình

### Khi cài đặt CafeKit

Installer sẽ hỏi:
```
🎯 Xưng hô (Addressing Configuration)
  • Để trống = dùng mặc định (em/anh)

AI xưng gì? (ví dụ: em, mình, tôi, con - Enter=em): 
AI hô user là gì? (ví dụ: anh, bạn, thầy - Enter=anh): 
Bật xưng hô? (Y/n, Enter=Y): 
```

Installer sẽ **ghi trực tiếp vào `.claude/CLAUDE.md`** theo input của user.

### Thay đổi sau khi cài đặt

**Cách 1: Chỉnh sửa trực tiếp CLAUDE.md**

Mở file `.claude/CLAUDE.md` và sửa section:

```markdown
## Xưng hô (Addressing - Context Overflow Indicator)

Khi giao tiếp bằng tiếng Việt:
- Luôn xưng "mình" (bản thân AI)      ← SỬA ĐÂY
- Luôn hô "bạn" (người dùng)          ← SỬA ĐÂY
```

Sau đó chạy `/clear` để reset session.

**Cách 2: Chạy lại installer**

```bash
npx @haposoft/cafekit
```

Chọn lại xưng hô mới.

**Các preset phổ biến:**

| Preset | firstPerson | secondPerson | Phù hợp |
|--------|-------------|--------------|---------|
| Formal | `em` | `anh` | Công việc chuyên nghiệp |
| Casual | `mình` | `bạn` | Dự án cá nhân |
| Respectful | `con` | `bố/thầy` | Môi trường gia đình/giáo dục |

---

## Context Overflow Detection

### Dấu hiệu

Khi AI đột nhiên:
- Chuyển từ "em/anh" sang "tôi/bạn"
- Không còn nhất quán trong xưng hô
- Trả lời lạc đề

→ **Context đã bị compact**

### Hành động

AI sẽ tự thông báo:
```
⚠️ Em nhận thấy context có thể đã bị compact. 
Anh có thể cần /clear để reset session.
```

User nên:
1. Chạy `/clear` để reset
2. Hoặc bắt đầu conversation mới
3. Tóm tắt lại yêu cầu quan trọng

---

## Tắt xưng hô

Nếu không cần, xóa hoặc comment section "Xưng hô" trong `.claude/CLAUDE.md`:

```markdown
<!-- ## Xưng hô (Addressing - Context Overflow Indicator)
... toàn bộ section ...
-->
```

Hoặc chạy lại installer và chọn "n" khi hỏi "Bật xưng hô?".

---

## Technical Details

- **Không dùng hook**: Quy tắc được định nghĩa trực tiếp trong `CLAUDE.md`
- **Ghi vào CLAUDE.md khi install**: Installer modify file theo user input
- **Mặc định enabled**: `true` khi cài đặt mới
- **Canary signal**: Pattern dễ nhận biết để phát hiện context overflow sớm
- **Validation**: Installer chỉ chấp nhận chữ cái tiếng Việt (a-z, À-ỹ)

---

## FAQ

**Q: Có tốn thêm tokens không?**  
A: Không, vì quy tắc nằm trong CLAUDE.md (đã được load sẵn mỗi session).

**Q: Có thể dùng cho ngôn ngữ khác không?**  
A: Có! Bất kỳ ngôn ngữ nào có hệ thống xưng hô đều dùng được. Chỉnh sửa trực tiếp CLAUDE.md.

**Q: Tại sao không dùng hook?**  
A: CLAUDE.md đã đủ mạnh để AI nhớ và tuân thủ. Hook chỉ thêm phức tạp không cần thiết.

**Q: Nếu nhập sai khi install thì sao?**  
A: Chỉnh sửa trực tiếp `.claude/CLAUDE.md` hoặc chạy lại installer.

**Q: Có thể nhập ký tự đặc biệt không?**  
A: Không. Installer chỉ chấp nhận chữ cái tiếng Việt (a-z, À-ỹ) và khoảng trắng.

---

## Changelog

### v0.9.4
- ✨ Thêm tính năng xưng hô
- 🎯 Hỗ trợ context overflow detection
- 📝 Installer prompt với validation
- 📚 Ghi trực tiếp vào CLAUDE.md (không dùng hook)
- ✅ Mặc định enabled với preset "em/anh"
