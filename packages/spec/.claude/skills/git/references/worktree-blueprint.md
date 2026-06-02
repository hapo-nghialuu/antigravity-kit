# Bản Vẽ Thiết Kế: Khởi Tạo Worktree (Worktree Blueprint)

Worktree là chìa khóa để phát triển các tính năng song song mà không dẫm đạp lên nhau. Hapo Agent dùng chính Bash Shell của Local OS để thi triển, tránh phụ thuộc vào JS runtime.

## Kịch Bản Tạo Môi Trường Tách Biệt (Clean-Room Blueprint)

### Bước 1: Trích Xuất Thông Tin Repository (Native Git)
Kêu gọi lệnh Bash để kiểm tra thư mục gốc:
```bash
git rev-parse --show-toplevel
git branch --show-current
```
*-> Giả sử top-level path là `/path/to/project` và current là `main`.*

### Bước 2: Nhận Diện & Định Tên Nhánh (Slugifier)
Tuỳ theo `<feature-description>`, hãy sinh ra một cái tên nhánh dạng Kebab-case.
- Bắt đầu phải là Type: `feat/`, `fix/`, `refactor/`, `chore/`...
- Nối tiếp là Tên ngắn (<= 50 text): `feat/add-auth-system`.
*Lưu ý: Nếu User chủ động gõ tên có sẵn mã Jira (TD-1234) hoặc tên tuyệt đối thì bỏ qua prefix Type.*

### Bước 3: Khởi Sinh Worktree (Sibling Pattern)
**LUẬT THÉP:** Worktree KHÔNG BAO GIỜ được đặt lồng bên trong thư mục Git hiện tại để tránh git cache xung đột/rác index. 
Luôn phải đặt cấp Sibling (`../`).

Cấu trúc lệnh Bash thực thi:
```bash
export REPO_HOME=$(git rev-parse --show-toplevel)
export REPO_NAME=$(basename $REPO_HOME)
export BRANCH_NAME="feat/add-auth"

# Sanitize folder path (thay / thành - để tránh lỗi subfolder nếu k cần thiết)
export SAFE_FOLDER_NAME="${REPO_NAME}-${BRANCH_NAME//\//-}"
export TARGET_DIR="$REPO_HOME/../$SAFE_FOLDER_NAME"

git worktree add -b "$BRANCH_NAME" "$TARGET_DIR" main || git worktree add "$TARGET_DIR" "$BRANCH_NAME"
```

### Bước 4: Tự Động Hóa Môi Trường (Hydration)
Tại `$TARGET_DIR` mới, bạn phải tự scan (bằng `ls` hoặc `find`) để tìm file cấu trúc và cài đặt:
- Nếu tìm thấy `.env.example`, tự chạy `cp .env.example .env`.
- Nếu tìm thấy `bun.lockb` / `bun.lock`: Chạy `bun install`.
- Nếu tìm thấy `pnpm-lock.yaml`: Chạy `pnpm install`.
- Nếu tìm thấy `package-lock.json`: Chạy `npm install`.

### Bước 5: Báo Cáo Chuyển Giao
Sau khi chạy hoàn thiện qua Native Bash, xuất báo cáo cho Tướng Lĩnh.
Nội dung thông báo (Mẫu):
> "✅ Worktree được khởi tạo thành công tại thư mục Sibling: `/path/to/.../project-feat-auth`. Môi trường npm và .env đã được setup. Để bắt đầu code, vui lòng mở cửa sổ Terminal/IDE mới tại đường dẫn đó."
