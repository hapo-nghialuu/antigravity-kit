# Định Dạng & Tiêu Chuẩn Commit (Hapo Git Protocols)

Bộ quy chuẩn Native dành cho Hapo Agents khi gọi lệnh `commit`. Không dùng tool bên ngoài, LLM phải tự phân tích qua Bash.

## Chuẩn Bị (Staging Setup)
Khởi động bằng lệnh Bash:
```bash
git add -A && git diff --cached --stat && git diff --cached --name-only
```

## Giải Thuật: Tách Commit (Auto-Split vs Single Commit)

Đọc kỹ Data do `git diff --cached --stat` cung cấp để ra quyết định chia nhỏ Commit bằng lệnh `git reset HEAD <file>` và `git add <file>`.

**Tiến hành NGAY LẬP TỨC việc Tách (Split) Commit NẾU:**
1. Có sự khác nhau rõ ràng về Loại Hành Động (Types): Có cả `feat` (tính năng) và `fix` (sửa lỗi) trong cùng 1 cục rổ.
2. Có nhiều Scope đan xen: Vừa sửa liên quan tới `auth` lại vừa động vào `payment`.
3. Số file thay đổi > 10 files VÀ không chạm tới chung một chủ đề.
4. Trộn lẫn giữa cập nhật cấu hình file (`package.json`, `.eslintrc`) với tính năng Code (`src/..`).

**Được gộp thành 1 Nhát (Single Commit) NẾU:**
- Cùng 1 Scope/Type duy nhất.
- Tổng số file <= 3 và tổng Line Diffs <= 50 dòng.

## Cú pháp Bắt buộc (Conventional Commits)
- `feat(scope): ...` — Tính năng mới
- `fix(scope): ...` — Vá lỗi
- `refactor(scope): ...` — Cấu trúc lại mã nhưng không làm đổi logic hành vi
- `perf(scope): ...` — Cải thiện hiệu suất
- `chore(deps): ...` — Cập nhật thư viện
- `docs(readme): ...` — Tài liệu
- `test(api): ...` — Kiểm thử (Unit/E2E)

*LƯU Ý: Tuyệt đối không dùng `docs` hoặc `chore` khi có file nằm ở `.claude` thay đổi. Hãy dùng `feat` hoặc `fix`.*

## Xử lý Vướng Mắc Git (Error Handling via Bash)
- **Có Secret bị rò rỉ:** Cảnh báo đỏ. Gọi lệnh xoá file đó khỏi staged `git rm --cached <file>`. Cảnh cáo người dùng.
- **Push bị báo Rejected:** Cấm dùng `--force` mù quáng. Yêu cầu chạy Bash: `git pull --rebase origin <branch>`.
- **Merge Conflicts:** Báo "BLOCKED", in lệnh Bash hướng dẫn người dùng chạy command giải quyết hoặc gọi agent `hapo:develop` xử lý conflict file.
