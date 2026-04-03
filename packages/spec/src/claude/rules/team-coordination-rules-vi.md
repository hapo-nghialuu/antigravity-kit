# Quy tắc Phối hợp Nhóm (Team Coordination Rules)

> Các quy tắc này chỉ áp dụng khi bạn hoạt động với tư cách là một thành viên (teammate) bên trong một Nhóm Agent.
> Chúng không có tác dụng trong các phiên làm việc tiêu chuẩn hoặc trong các quy trình làm việc của subagent.

Các quy tắc dành cho hệ subagents hoạt động như những người đồng đội trong một Nhóm Agent.

## Quyền sở hữu File (ĐẶC BIỆT QUAN TRỌNG) (File Ownership - CRITICAL)

- Mỗi một teamamte PHẢI đóng vai trò sở hữu các file riêng biệt — không được thực hiện các chỉnh sửa chồng chéo nhau.
- Xác định quyền sở hữu hệ tệp thông qua các cấu trúc glob patterns (tệp đối sánh) trong các diễn giải tác vụ: `File ownership: src/api/*, src/models/*`
- Trưởng nhóm (Lead) có vai trò đứng ra giải quyết các xung đột quyền sở hữu bằng cách tái cấu trúc lại các task hoặc tiến hành thao tác trên các file chung một cách trực tiếp.
- Người kiểm tra (Tester) chỉ có quyền khởi tạo và sở hữu các file test; có thể đọc các file triển khai (implementation files) nhưng không bao giờ được chỉnh sửa chúng.
- Nếu phát hiện ra có sự vi phạm quyền tác động tệp: DỪNG LẠI và báo cáo với trưởng nhóm (lead) ngay lập tức.

## Quy tắc An toàn với Git (Git Safety)

- Ưu tiên hệ điều hành sử dụng git worktrees đối với các đội thi công trực tiếp — khi mỗi lập trình viên làm việc trên từng worktree riêng biệt sẽ loại bỏ tận gốc hiện tượng xung đột code (conflicts).
- Không bao giờ được phép dùng lệnh force-push trực tiếp xuất phát từ phiên chạy của một thành viên trong nhóm.
- Đẩy commit thường xuyên với các các dòng message chứa nội dung mô tả đầy đủ.
- Hãy tiến hành pull (kéo về) trước khi push (đẩy lên hệ thống) nhằm khéo bắt kịp những xung đột lúc hòa code (merge conflicts) từ sớm.
- Nếu bạn đang làm việc trên hệ nhánh của một git worktree, hãy tiến hành lệnh commit/push thẳng tới nhánh (branch) của worktree đó — chứ tuyệt đối không hướng vào nhánh main hay dev.

## Giao thức Giao tiếp (Communication Protocol)

- Dùng lệnh `SendMessage(type: "message")` để gửi thông điệp dạng DMs cho bên đồng cấp (peer) — luôn chỉ định cụ thể người nhận (recipient) thông qua phân nhánh tên (NAME).
- Chỉ dùng lệnh `SendMessage(type: "broadcast")` CHỈ TRONG trường hợp liên đới các vấn đề nghiêm trọng dạng cấm chặn (critical blocking issues) gây sự cố ảnh hưởng tới quy trình của cả một nhóm lớn.
- Khai báo tình trạng hoàn tất tác vụ (completed) thông qua lệnh `TaskUpdate` TRƯỚC KHI đẩy thông điệp báo cáo điểm hoàn thành ấy nộp đến tay trưởng nhóm (lead).
- Hãy tích hợp các phát hiện vấn đề có cơ sở thiết thực (actionable findings) bên trong dòng thông báo messages gửi đi, thay vì chỉ bỏ ngỏ nói khống kiểu "Tôi đã làm xong" (I'm done) 
- Không bao giờ gửi các dòng thông điệp báo cáo tình hình trạng thái được nạp đóng gói vào trong định dạng hệ thống JSON — hãy dùng chuẩn văn bản cấu trúc thuần túy bình thường (plain text).

## Quy ước hoạt động CK Stack (CK Stack Conventions)

### Kết xuất ra Báo cáo (Report Output)
- Lưu lưu lượng báo cáo (reports) nạp thẳng vào cọc mốc `{CK_REPORTS_PATH}` (được hệ thống tiêm truyền qua hook, luồng dự phòng (fallback) đưa vào: `plans/reports/`).
- Định chuẩn đặt tên (Naming): `{type}-{date}-{slug}.md` trong trường hợp (type) = vai trò tương ứng hiện tại của bạn đóng vai (researcher, reviewer, debugger).
- Có sự cho phép việc lờ đi hoặc tối giản cấu trúc ngữ pháp (grammar) để bảo vệ ưu tiên cho tính súc tích ngắn gọn (concision). Liệt kê mảng các câu hỏi còn tồn đọng chưa được gỡ đáp ở màng cuối văn bản báo cáo.

### Câu lệnh Thông điệp Commit (Commit Messages)
- Gõ dạng theo sườn quy mô của conventional commits chung: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Không để dính líu dẫu một từ khoá định danh liên hệ hay viện dẫn nhắc về tác quyền tạo sinh bởi AI trong phần commit messages.
- Canh chỉnh sát độ tập trung giữ dòng commit đi đúng khớp trọng tâm về sự thay đổi của đoạn code thực thụ tương tác lúc đó.

### Đồng bộ Dữ lệu Tài liệu (Quy Định Riêng Cho Đội Thi Công - Implementation Teams Only)
- Sau khi đóng các nhiệm vụ triển khai, điểm trưởng nhóm (lead) BẮT BUỘC có công cán thẩm định đánh giá xem mức tác động xâm phạm liên lụy tới hồ sơ chung (docs impact) tới đầu.
- Trình vạch hệ thống gãy gọn trực diện: `Docs impact: [none|minor|major]`.
- Nến truy xét điểm dính chùn tác động (If impact): Cập nhật thư mục đầu `docs/` hoặc có ghi chép điểm lưu bút bên trong hộp báo cáo hoàn tất quy trình (completion message).

## Tác thuyên Nhận Việc (Task Claiming)

- Khai mạc khai báo nhận (chốt claim) task còn tồn lỏng (unblocked) mang chỉ số ID lùi thấp dưới chóp nhất (những task phía đầu chuỗi luôn tạo tiền mốc cấu tạo ngữ cảnh chóp cho những task phần ngọn xếp sau).
- Check lại thư hạng ngạch bảng danh `TaskList` rượt sau khi kết xuất qua từng tác vụ (check unblocked work) để vọc ra điểm tắc mới thông chốt .
- Tự bật thiết đặt thay trạng thái tác vụ qua hệ chuẩn `in_progress` trước thời khoản lao vô gài thi công chạy task.
- Nếu đứng trúng phải tình cảnh tất cả công lực (all tasks) đều bị dính tắc nghẽn chặn hết trơn (blocked), tiến báo tới tay vị trí trưởng nhóm (lead) và chìa ý tưởng hiến kế cung lực chọt tháo gỡ luồng nứt.

## Luồng Lệnh Phép Phê Duyệt Kế Hoạch (Plan Approval Flow)

Mỗi khi cấu chế kịch `plan_mode_required` được gắn khởi phát:
1. Nghiên cứu thực lược và phác tay vạch điểm lối đả thông cách thức tiếp cận (chỉ áp dụng đọc - nghiêm cấm tùy chỉnh trực diện chọc đụng (read-only — no file edits)).
2. Rọt đưa nạp bản phương án hoạch (plan) chọc chạy xối qua điểm cấu luân lệnh `ExitPlanMode` — chuỗi thao tác trên này gọi ra phản hệ vớt trình kêu réo hệ kiểm duyệt xác thực tới mâm phó tay hệ Trưởng Lead.
3. Treo trạng chờ chiếu lật chờ rẽ kịch từ phán quyết chỏi hệ báo điểm xác tay của chức Lead `plan_approval_response` .
4. Phân từ rơi lọt kẹt dút ván bác vất bỏ - chối lệnh (rejected): Bóc điểm thu gọt sửa nắn kịch luồng theo móc trỏ phản hồi đóng góp (feedback), thực ấn đệ dọn lại mâm làm tờ xét duyệt gởi (resubmit).
5. Phi duyệt vượt kịch nhận điểm Pass gật chấp cho đậu (approved): Kéo tiếp lướt sải trọc bủa thực binh triển vọng implementation đâm thao lệnh gỡ luôn.

## Giải Mối Quyết Áp Lệnh Mâu Thuẫn Luồng Xô Đẩy Nhau (Conflict Resolution)

- Trường mảng luồng vướng 2 người đồng sự tranh trọc giành giật khuyên 1 mảnh chung tài liệu file: Lập báo động gióng ré kêu trưởng Lead vào đập giải tỏa phân đình tranh nhau.
- Nếu kẹt mịch đứt nứt dây luồng rào kế hoạch đưa tiễn lên đặng bị đội Trưởng Team văng đục đạc đẩy ngửa vứt văng Cancel đủ mốc lần (rejected twice): Lập cọc cho sập vai, trưởng Lead tóm cọc nhận vác ngạnh đẩy nhảy thẳng tọc thay nhái vác lấy gỡ đụng.
- Nếu luồng báo thẩm tra mảng kiểm findings mâu thuẫn xỉ rào đá bay nhau từ hai thành phần Reviewers gõ nạp: Trưởng Lead có phận quy rút nạp cọc xoi trút thục ngạch luồn ghi lưu cất gông ngạnh làm bãi nứt Conflict disagreement.
- Bị rào tắt ngập cục dính mạch xỉ tắt tại do người đồng đội vác đâm lửng chửng chưa giải rạc luồng (incomplete work): Ném đá nổ message luồn hộp riêng tin gợ vứt tẩn móc hắn trước gợ báo mỏ gõ, leo tiếp cấp kêu réo dọng đẩy tới hệ điểm Lead khếu nếu thằng lính im hơi (unresponsive) 

## Giao thức Shutdown Đóng Sạp Thanh Trừng  (Shutdown Protocol)

- Nghiệm phê bật nút xả ngỏ duyệt Approve tắt shutdown gút luồng xới ván ngoại trừ dính chóp quẩn cước điểm ngay giữa lúc đang leo cướp thóp chạy chuỗi kịch chiến gắt cấu rào gỡ điểm thao (mid-critical-operation).
- Chặn đóng điểm gạt nút ấn rạo vút thông lút thẻ mốc the current task cho thảy dội vô danh rào chốt đóng cẩn (completed) rảo đọng ngắt trước khi ốp ngạo cái điểm cấp duyệt tắt máy shut down trượt .
- Giáp bật chống ngạch tạt từ chối quyền tắt máy, giải thanh nhanh ngọn lọn rào cọc ranh lý do nhẹ nhàng. 
- Tìm nhặt móc điểm mọc tọc id mang tên `requestId` xới tút qua cạo lấy ở trọc thẻ hệ mâm chuỗi kẹt báo shutdown request nằm bên hệ JSON JSON thảy qua nổ dứt đưa đổ đít luồng cấu lệnh hồi âm trút `shutdown_response` .

## Trạng Thái Tạm Trống Ngâm Rỗi Gác Hàng (Idle State - Normal Behavior)

- Sau cú dóng quăn rớt điểm đâm gửi tọt xả đi thông điệp gửi hệ message thì chạy chuỗi máy luồn vóc luồng lỏng điểm treo máy nằm nghỉ tay (Going idle) là hoàn cảnh cực BÌNH THƯỜNG NORMAL - Vạch xì rớt hỏng vọt Error rào bậy hay văng thông tin gây mỏi .
- Trạng dọn chọc vọc nhồi chờ mạc ngáp nghỉ dợ idle lột rạng cho hệ chuẩn bị chờ dọng lóp đón tọt dọng dời lệnh mới nhận châm (waiting for input), Mặc định không phải tình trạng treo chẹt bị sập ngắt kết nối đâu nghen(disconnected). 
- Liệng ngạch nảy rọc đậy chọc vô đánh ném 1 viên cọc điểm dọn chat thót dọng phím tin chọt báo gọi quăng móc chéo teammate vốc đương gụ trạm chờ mỏi ngâm Idle - sẽ múc nảy lôi đầu họ tung rạo tỉnh bật phọt bủa dậy ngọn (wakes them up).
- Tuyệt chối nhát đập nhận dạng điểm xả những đụn cảnh báo treo mạc phom Idle giáp hộc (idle notifications) thành luân mạc rào đi báo cọc đọn cặn mã hệ hoản gút móc màng xong thành tích nha con ngự báo rào trối vạch completion signals — Rắp tâm trẹo đi gút móc luân dọng lại dò soát trạng mớ xem the task status coi thể cục chọc vọt tình cục làm sao nha. 

## Thiết Kiến Chỉ Định Tìm Moi Điểm Hú Dọn Tuyến Tên Dòng  (Discovery)
- Khởi tọt vòng mỏ đọng file gốc đội trạc mạn trễ thư kho ở ngòi chỉ trỏ `~/.claude/teams/{team-name}/config.json` moi lợm bớt thu tên nháp dọn dòm điểm mặt danh đồng ngỏ (teammates).
- Lô rảo gọi ạp điểm hú bạn ngắt đội chõ phải giương bằng danh móc xưng là TÊN CHỮ xịch trọc viết cất chưng NAME hệt nhe (Đừng rúc vạch mẻ bóc nhét gọi Agent ID đẻ gánh loạn não nhau nghen khứa nội tước ).
- Trưng nảy danh mạc xưng (Names) cắm vào cọc dùng điểm tạy mác: Mực cài nhồi thọt chỏ `recipient` cài ở rào hộp SendMessage, rảo hệt bóc tướp tạc định mã thẻ `owner` xớ ngạnh chỏ vọt cài bộ báo cáo trạng nộp tin luân chóp TaskUpdate .
