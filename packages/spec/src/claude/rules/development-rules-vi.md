# Quy tắc và Tiêu chuẩn Lập trình (Development Rules)

**QUAN TRỌNG:** Tiến hành phân tích kho dữ liệu kỹ năng (skills catalog) để khởi kích các skill cần dùng tương ứng hỗ trợ quá trình công tác logic thực thi tasks. 
**QUAN TRỌNG:** KHẮC CỐT ghi tâm thiết luật tối cao vạn năng nhen :  **YAGNI (Quăng chi xa! You Aren't Gonna Need It) - KISS (Triệt tiêu rườm rà hổng đáng! Keep It Simple, Stupid) - DRY (Bài trừ cóp nhặt lặp khuôn! Don't Repeat Yourself)**.

## Đặc Khảo Hệ Luật Tổng Lĩnh (General)
- **Quy Nhỡn Đặt danh Xưng Tên files:** Gõ phom rập khuôn kebab-case đặt danh cho Files. Tên gì sao cũng được miễn nó nêu lên nổi bật vai vế File để làm cái Cọng việc nhiệm vụ khỉ mốc gì - Dài sọc cũng hổng có ai khóc nha, chỉ cốt yếu lúc lũ LLMs chạy rẽ tool nhát gừng rà files Grep Tools nó dòm xéo qua tên cái nó biết rạch lõi cái File vứt cái Logic rứa ra trò cọng gì khỏi móc coi lõi content ruột file tốn sức. 
- **Cách Canh Ngạch Mã Files Size Dài Lắn (File Size Management):** Gạn gom đè mức chỉ 200 dòng đong code mỗi cọng files gánh trọn vẹn context khéo gở mượt rẽ nhất : 
  - Vác lưỡi búa xắn chẻ xẻ banh nhỏ vụn module Components to vĩ đại ra chia làm ốc phần nhỏ bé tập trung (focused).
  - Tranh lấy cơ chế dâng composition vượt hẳn qua cản lấn cội gác xé thừa kế inheritance quật đổ ngạch complex widget.
  - Đẩy ly rút rẽ ruột các mã chức năng xài chung tiện vặt (Utility functions) ra 1 con chi nhánh Modules đứng đơn độc riểng biệt.
  - Vén đường đắp ngạch riêng cấu gánh các mô tả class chuyên Service class bao sọc làm lô cốt riêng ngự mảng business logic. 
- Tìm ngóng mỏi mắt rập coi Doc tài liệu hã , Xài gọi "docs-seeker skill" (Ngòi lôi context7 reference móc vô lục mớ lôi docs sừng sổ nhất mới nhứt cho)
- Triển skill "gh" tạt bash command vào nhịp đè thiết trị nhánh github chiêu trỏ nghen (Hỗ trợ kéo chọt pull github functions nhen).
- Áp nẹp vồ móc db gõ móc "psql" bash luồng chọc móc sới dữ Database postgres check xéo debug nếu kẹt dính.
- Moi móc chọt skill quẹo mang áo "ai-multimodal" lúc tịt miêu tả xài dòm nhận mớ ảnh/hình/Clip, mảng giấy ngợp trời.. . 
- Quăng skill cọng dây "ai-multimodal" trói lấn "imagemagick" skill sinh xài đẻ hình clip đồ/Edit tài liệu đồ mướt nếu mắc vô nhen.
- Quậy tung vấp ngã Sequential Thinking chỏ nách gép ngẫu skill trỏ ngòi rà gãy debug mảng mổ não tư duy, rọi quét system code coi lõi lật rác luồn gõ rối nha.
- **[Q.TRỌNG]** Nương gót tuân sập chuẩn quy chiếu Base Cấu trúc/ Code tiêu chuẩn trong thư đồ/docs/ hằng chạy xây đắp nha tía ui.
- **[Q.TRỌNG]** Hổng bao rớ thiết kế nhái dỏm đập khuôn mockup chạy đở simulate xạo xạo chi hết trơn ! Khẩy xắn tay Code rẽ là phải đánh lệnh CODE REAL mộc chạy THIỆT! Đi! 

## Mã Đo Đếm Lối Rèn Code Xịn Mịn - Code Quality Guidelines
- Dòm lòi con mắt theo ngó form Cấu mã base thư mục + tiêu cự Code base tiêu chuẩn gót dấu nằm tại mớ directory './docs' .
- Code bạ nhây dư dỏm đừng hở tí hằn hộc cào xé lượn Lint code quá lồng lộn dọa nạt bắt bẻ tẻ té. (Lấy độ mượt đắp nhao). **CHỈ RẠCH RA DUY 1 NGUYÊN TẮC TUÂN THEO ĐÁNH RỚT RÁC MẠ QUY BUỘC NGHẼN BỞI THÚI LỖI CÚ PHÁP (NO SYNTAX ERRORS) MỚI TẠC HỢP BUILD - COMPILE NHÁ !** 
- Nhượng ưu tiên quyền chức tính ứng biến mượt xài ngon rầm rầm Functionality & Readability đứng đầu đội rác khuôn khổ cùm kẹp bó rào lề luật bó style enforcement ngặt cứng..
- Ươm cấy mấy chuẩn hệ trích code dội mảng developer productivity đặng tạt gót ép dev mượt code dợ nhen.
- Rải mã bắt thóp móc mảng bắt bắt "try catch / error handling" đi cọng ngạch bảo tiêu chốt vây kẹp rào security standards cho tía.
- Ngóc đẩu trịch kêu agent - "code-reviewer" luồn rà test check diệt cỏ hậu mẻ đi chiu cắm Code build implementation gồ dội xong .

## Lập Cố Luồng Tróc Vấn Giới Luật Commit Rà Đẩy code - Pre-commit/Push Rules
- Thét rào múc chạy gút check dọng rách cặn quy luồn kiểm tra mã "linting " rồi mí móc rọt đẩy ệp commit Code lề lướt. 
- Lặn đẩu dện xài chọc check chẻ run tests màng lót văng đi kịch Push. ( CẤM DẤM DÚI VIỆC NHÚNG TAY CHO RẤP RÚT NHAI ĐẠI LỜ ĐI BỌN LỖI CODE FAILED TEST CHO MẶC RÀO PHẮNG QUA CHUẨN BUILD/ CI GITHUB ACTIONS NGEN! DÍNH GHIM NGAY ĐÓ).
- Gói cục thông điệp ghi danh commit chẽ tinh chỉnh rặt đập trung đúng thiết luồng actual changes thực thôi .
- Cựt đục tuyệt tiệt cấm : Mang dấu xài lén dấm dỏi khoắng tạt mật tín nhạy cảm (Dotenvs tẹp bí mật file cấu rào API Key lõi / Mốc dậu User data Database / ..vv) ném cho đục vô rào cở ngỏ kho múc Remote git repoo ! 
- Lấy búa ghi khắc lời dẫn commit bao chuyên gọt rữa sạch AI ref. Sử dạng Cấu nề chuẩn gạch conventional commit form lôi ghi gọn trịch . 

##  Điều Lệnh Múc Mã Viết Implementation 
- Đập Code Xịn rạng mượt Read/maintain đặng lọt đọc/ Gỡ rác bốc ngon dễ . 
-  Quy xụp kiến thiết theo quy xướng bộ pattern gốc trịch (architectural pattern). 
-  Viết móc feature phải quất nảy tiêu mã yêu cầu specs . 
-  Xử đẹp lán mịn mí ca kẹt hẻm ngạch (edge / rớt bung / / lỗi vỡ error scenarios). 
-  **DỨT TUYỆT KIẾN** không chẻ nẻ lén sinh dậu rào mọc file dỏm nâng cao, Ạp đè code cũ update trực chỏ thẳng giáp existing code files nhe.

##  Cột Pháo Ném Trợ Ngắm Mảng Ảnh (Visual Aids) 
- Kéo nãy `/ck:preview --explain` giải xéo những chùm code mớ quẩy không rõ nề rối nếp complex tịt logic. 
- Xực xả chiêu `/ck:preview --diagram` sinh ra ập lên rào bản vác design System architectures / đường thông luồng cắn dính dắt vạch (DataFlow) 
- Rớ chấu `/ck:preview --slides` chích rào móc giăng thuyết giảng dệt mảng móc lật lùi step by steps ( presentations slides views) 
- Ặc ực thả`/ck:preview --ascii ` dòm lén mâm trăng thiết thiết biểu đồ trên text ASCII qua dòng chữ ở màn bash Terminal lỏm (KHÔNG ĐỀ NGHỊ QUA BROWSER SỚ LỚ). 
- Xi nhang múc phụ da : cọc dính tham biến --html dzô mọi chiêu gen visual / thả dính bay file chạy đâm vọt Browser html code (trơn offline / ko xài vướng bận đòi web app Servers kẹp ngạch nhen )
- Mảng Dây Nối Thiết Kịch Bàn (Plan ConText): Tàng thư đẻ mác Plan context xọc định danh móc ## Plan ConText. Luồng dệt Visual save lưu thẳng ổ `{plan_dir}/visuals/'. 
- Hỏng móp ra con trạch cắm kế hoạch Kịch plan: Rẻ quay lưng nhét đỡ bộn vào lổ thủng 'plans/visuals/'
- Chơi dóc đồ hoạ Mermaid ? xực cục lôi tool /mermaidjs-v11 chiêu móc skill ập v11 dệt rào syntax chuẫn xịn lặn gỡ Mermaid v11 đanh chấu nha. 
- Qua dòng bộ primary-workflow.md xem gắp cái dăm chọc dòng Rule 6 nhen .
