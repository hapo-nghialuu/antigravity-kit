# Giao thức điều phối dự án (Orchestration Protocol)

## Ngữ cảnh ủy thác (BẮT BUỘC) (Delegation Context - MANDATORY)

Trong lúc thực thi sinh lệnh tạo các subagents với tool Task, **LUÔN LUÔN** phải kẹp kèm đoạn prompt này:

1. **Đường dẫn thư mục làm việc (Work Context Path)**: Đường dẫn git root tuyệt đối của các file cấu thành CHÍNH đang bị cập nhật chỉnh sửa.
2. **Thư mục báo cáo (Reports Path)**: Chuỗi `{work_context}/plans/reports/` ứng với thư mục gốc của project đó.
3. **Thư mục Plan Kế hoạch (Plans Path)**: Chuỗi `{work_context}/plans/` ứng với thư mục gốc của project đó.

**Thí dụ (Example):**
```
Task prompt: "Fix parser bug.
Work context: /path/to/project-b
Reports: /path/to/project-b/plans/reports/
Plans: /path/to/project-b/plans/"
```

**Quy định:** Nếu đường dẫn hiện hành (CWD) khác lệch với phần đường dẫn work context (do đang sửa file ở các project khác nhau), ưu tiên dội ngay tham số **work context paths**, tuyệt đối không dùng CWD paths.

---

#### Rẽ chuỗi kết nối Nối tiếp tịnh tiến (Sequential Chaining)
Khớp chuỗi các subagent gắn nối tiếp nhau mỗi độ các tasks cần lệ thuộc thông số dependencies hoặc cần dùng đến outputs văng ra từ vạch xuất phát chạy task trước đó:
- **Chu kỳ Plan Lên Kế Hoạch → Code Đầu ra Implementation → Code tối ưu Simplification → Dò Tét Testing → Thẩm định Review**: Phục vụ mảng khơi mào làm thêm tính năng (tests dùng kiểm rào cấu trút simplified code test mượt mà).
- **Chu kỳ Bới Tìm mỏ rác Research → Thiết Kiến trúc Design → Móc File mã Code → Dựng Biên Documentation**: Ươm rào mới xây nền công năng rễ hệ thống mới (new system components).
- Cứ thế rào agents rẽ xử rọn rạch gỡ việc 100% trước kho tát anh kia tới chạy ké the next begins.
- Rót đổ móc chuyển tạt dội Outputs và context luân phiên nhịp chéo nhau trong vòng tay xích chuỗi agents chain qua lại. 

#### Dựng Chạy Mở Dàn Song Song Tích Hợp Đồng Đều (Parallel Execution)
Xả mở van nhiều subagents ồ ạt phóng song hành trên vạch nhịp đi các tasks độc tấu riêng rẻ (independent tasks):
- **Phía Code + Phía Tests + Đoạn Docs**: Triển đẻ cho dứt các modules chẻ cấu kiện lệch sóng không dính rủi ro xô xát lẹ nhau (non-conflicting components). 
- **Phía Chẻ nhánh lằng nhằng rẽ đôi Features Branches**: Đập nhiều agents phóng trên nhiều branch khác nẻo chẻ ngang feature nhánh rễ khác nhau .
- **Phía Đổ Đa hệ Device OS Cụm Nhánh Platforms chéo**: Xẻ iOS ra dứt mạch iOS/ Và Android móc cắm iOS dứt code hệ iOS rành mạch. 
- **Đóng chốt rào Điều Tiết Hết sức cẩn trọng (Careful Coordination)**:  Canh lố đập vỡ hệ quy củ chớ hề xáp vô gây File ngập conflict nhen (cấu chém rào chéo tay vỡ file) và rạch ròi dứt điểm lấn lướt rào xé resource tranh nhau (resource contention). 
- **Chốt dậu Phương Tiện dẹp quy cắm móc Merge rào Strategy**: Dàn trận sơ họa thiết đồ phân luồng chuẩn rẽ ráng nắn mảng hội ngộ ghim dính integration points trước giờ ngọ đâm lún mảng Parallel sớ vào sới .

---

## Giao Thức Quản Trị Hệ Thông Số Subagent Phom Dấu Tích (Subagent Status Protocol)

Bọn lính Subagents LUÔN BAO GỒM NẸP BÁO CHỐT dội 1 trong 4 cờ rào ngạch Status này sau khâu việc ngút nắp chót:

| Status (Trạng thái) | Nghĩa bóng (Meaning)  |  Hướng Quyết của Sứ Điều hành vòng trùm (Controller Action) |
|--------|---------|-------------------|
| **DONE** | Ngọt lịm tươm sút sứt ván  | Quẹo đường múc nhai mảng step tiếp tục thôi sếp rảo. |
| **DONE_WITH_CONCERNS** | Hoàn Cục êm xuôi song ngầm nhát gan có vướng dăm nghi kị nhỏ | Mục sở thị soi xem coi dính lỗi quái quỷ chi, nếu lòi rụng lõm rào móng correctness or quạp hụt scope -> ghim vô xử lý address ngó móp ngay; Còn nếu rớ đăm chọt vài vệt chỉ điểm kiểu mơ màng linh tính chú ý chơi ngâu (observational) - Bơ đẹp nhắm con trù tiến nấp tiếp đĩ . |
| **BLOCKED** | Bít đường xịt lỗ nghẽn hẻm rồi.  | Dấn ngắm soi lý trấu tắc ngộp não blocker - nhả hint thêm chùm Context / Cắt nhỏ vụn task bầm ngộp nhỏ xíu lột / gởi ối á cứu réo User kêu viện cớ .  |
| **NEEDS_CONTEXT** | Vụt lỏng mảng context dữ tính nên hỏng lết bánh đặng rào . | Châm nước mắm nhồi cọc hố rớt Data ngạch lổng mỏ, rồi đánh mớ pháo re-dispatch nó đi đập nhiệm lần mơi mơi lặn lội .|

### Chỉnh Nắn Lệ Cụm Gấp Rút Ràng Buộc Phom xử gỡ - Handling Rules
- **Đời Đời Cấm Tuyệt** Phớt lạnh hử điếc giả làm ngoơ tạt quẹo lơ lơ đứt rào mớ phom dội cảnh báo xé não rào bọc báo Blocked/ Né bơ mẻ báo Missing Need_Context. ( Cụt cũng bứng gảy có lòi móng nhồi fix vô mớ đặng thả test ngụ chọc retry chứ hổng làm nín cắn lật bựa  ).  
- **Cấm Tuyệt Luôn mảng Trò Áp Chế Ép Tội Độc Ác (Never force)** Nện gập đầu vặn ẻo đánh rạp xài chẻ theo kịch phom tiếp nhịp lổ nhào sạt đít y phóc trổ lối đi củ bạt ngay khi đâm gốc sập BLOCKED: Dẻ nhịp test quăng cách sửa rào xáp: Đổ chậu context cho tràn mâm trút -> thu nhai gút mảng cái cục Task lại nhọ mĩ đặng xé trọc dễ nhâm -> Thuê bợ mượn ngạch con đỉa Model Agent khủng sừng bỰ TO Móc Capable hơn -> Bó cùi đầu réo User văng nạng gòi mắng giùm . 
-  Xổ câu than **DONE_WITH_CONCERNS** kẹp mớ dỉ rào sợ rác code lở phì dính phom file growth bự bè chảng dính chày với nùi rác tạ bự ngập cục tech debt: Cứ ghi ghim note danh vào sảnh đường Future chực xử, Giờ dắn đứt cùm tiến mốc DONE tiếp nghen sếp. 
- Mếu khóc váng **DONE_WITH_CONCERNS** liên hồi có cắn vạch vỡ chệch correctness sai bét quy luồng lố lối cọ đi trật đường logic: Buộc gán giựt tạt cọng fix xong thẩy ném hẵng qua quy trạc chốt review bửa nghen. 
- Ngửa bài ngã ba vập nhão rớt fail đập rớt 3 lần dập đi tạy lại (fail 3+ times ) vào độc 1 cọng Task - Dập họng réo la làng đưa nhủ User bạt cọc Escalate. Đừng ôm ngu tạc rạp run lại khờ đui blind đục thẩy. 

### Mảng Rào Format Cọc Bản Thông Cáo Khai Báo (Reporting Format)

Bọn subagents nên rút đít châm rào vạch 3 hàng chậu chót nãy vào đặng phỉ cút phản hồi: 

```
**Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
**Summary:** [Kéo múc dọng độ chớp gọn 1-2 dòng Summary thoi]
**Concerns/Blockers:** [Nếu vướng rủi ro nhọ chém kẹt chẽ gỡ lỗi thì xì liệt vô]
```

---

## Luân Lý Chặt Khúc Cô Lập Ngữ Cảnh (Context Isolation Principle)

**Subagents chỉ ăn mớ ngữ cảnh đủ đong gầy nặn việc thôi!** Tuyệt chớ nựng phom vác xả ôm sọt luồng đống tro tàn lịch sử trò nói nhăng dài tọc  Của cái Conversation chuổi dài (Session history) đi thả vô bụng tụi nó . 

### Luật Giới Định Rules:
1. **Dứt kịch tạo chầu Prompts Đanh xới lột (Craft prompts explicitly)** — Cất tiếng tảng nói thọc tóm bọc nhiệm task nhanh lẹ (Task desc), đường files path rẽ móc đúng bóc ngóc đụng ngạch trỏ, đưa móc khung điểm nghiệm đồ cho đạt. Hổng thòng kể "A nhô a nài mập ơi.. khúc trên mình bôn bốc chỏ chổ..." . 
2. **Triệt dọn cặn nhây hám danh hửi tàn History Session trôi (No session history)** — Subagent quẹo dô đời mớ lọt cung mâm tiệc nhào lộn mới toanh búp thôi trọn trinh nguyên gài con. Khép dậu quăng rút quyết đính quyết luân dội văng chốt bọc điểm khít mỏi rềnh rập (decisions). Hổng tuông 1 đống trút lộn mẹ văng cọng dứt mảng đứt nùi  dở dở ươn replay 1 vòng tuông lên tít tắt the conversation .  
3. **Móc tiêu khóa Nhắm Khép ngòi files đánh dính trọng file (Scope file references)** — Làm nén gọn list khoắn chỉ đúng chỗ mớ cùi bắp files để đọc moi chọc ngòi gở sửa nha( modify/read ). Đừng lặn quằng cẩu thã nói "Mọ rờ dòm quanh con sộp Codebase rồi đẻ mò luồng ra giùm nghen con ... " (Look at the codebase...) 
4. **Nhồi mọc ngữ cảnh chuẩn mực đi theo plan bám chặt xỉ rào (Include plan context)** — Nén ngòi đinh gõ đi lẹ lót bâm the specific text cái gạch đầu dọn tên cái phase đó nhồi cho đủ sườn lỏ, KHÔNG úp khum chừa chôn mả dọn cả hốc chậu mả con plan phẩn úy the entire plan vào dội đầu khóc é lên rào nhé.  
5. **Giữ gìn Rào bảo tiêu quy tụ mảng Controller context chánh ngạo (Preserve controller context)** — Chẻ chia phân công rọc gỡ đường khống Controller cất kín giấu tại cái con Agent Mẹ trùm. Hỡi nùi ỏ rẽ rạch rạch đánh gộp điều hành lính lác lằng nhằng dọng tọc xẹo sọt qua cho lọt ngạch Subagent prompt đâu nghen bấy.  

### Ma Trận Xịn Sò Form Chế Trình Thiết Mẫu Lẫy Ngôn Dòng Prompt Nhẵn Nhũi (Prompt Template)

```
Task: [specific task description / Miêu trịch gập task đập thẳng gãy cắn gọn]
Files to modify: [list danh hẻm vô mâm băm files]
Files to read for context: [list danh mấy file nhòm coi dạo hint thoii]
Acceptance criteria: [list bộ mẻ thóp rào tiêu chuẩn chốt gán Done]
Constraints: [any relevant constraints - ràng buột gài khó ]
Plan reference: [phase file path if applicable - Lòi plan thì vặt vô the phase ]

Work context: [project path lù lù đường lút gạch]
Reports: [reports path nứt khợp rào gút móc ]
```

### Mã Anti-Patterns Đám Mã Mù Xẹo Nghịch Phom Thấy Hớ Là Chưởi Văng Quãng Mất Chóp (Anti-Patterns)

| Biểu hiện Hớ - Trái Sai (Bad) | Phom Đẹp Xịn Điểm Chuẩn Thật Đẹp (Good) |
|-----|------|
| "Continue from where we left off (Quẩy đoạn cọc nhây bỏ nữa chừng cúc sau kia coi)" | "Implement X feature per spec in phase-02.md (Ráng đu vọt híp thiết lập con mảng X ăn nằm nguyên thông số spec nằm kẹt ở trong cái file phá phase-02.md nghen mài)" |
| "Fix the issues we discussed (Đè lại ngạch fix mớ tụi tía bàn hôm nọ ik chéo kia)" | "Fix null check in auth.ts:45, root cause: missing validation (Tạt đập lòi dội ngạch con mẹ vụ cự null check cấn vô duyên thúi tại lỗ auth.ts:45 nghen, nguyên bớ sứt khuyết cái mã điếm validation lỏ đấy ráng mò lại đập đi)" |
| "Look at the codebase and figure out (Nhìn loạn con mắt đục codebase ngầu tung rát đi tìm mò coi đập sao ...)" | "Read src/api/routes.ts and add POST /users endpoint (Khươi cái lỗ ngó gọt src/api/routes.ts cho tía ik rồi đâm cắm nhụa chồi endpoint là luồng POST /users rẽ dọng nhá)" |
| Đưa đẩy một đụn gàu sọt rọng nhảm chat vứt quá xấp 50 tọc lines dỏm nùi trò the conversation chỏng chê lầy (Passing 50+ lines of conversation) | Cô trút ngắn xíu gọn giỏ mớ Task 5-line sọc nhẵn cho rồi, lồng bọt sẵn cái list mẻ the file paths phom là luân chuẩn đẻ ok nha (5-line task summary with file paths) |

---

## Chi Nhánh Nhóm Cơ Đội Team Agents Tuyến Con (Agent Teams - Optional / Tuỳ Thể Chọn Bo)

Áp chế múc đánh dự phóng đập đa rẽ chia nhánh chia lô song hành Multi session điệp đôi tay phối nhồi trọc parallel, rút skill dán nhãn`/ck:team` đi cho chuẩn đét luồn. 
Cha nội gép gởi này chả có đẻ hệ luân lý trong chuẩn chung Orchestration default tút gởi nhe . Phỉnh mò rảo mốc lục vạch đẻ chiêu cái hang rào mốc tàn dư`.claude/skills/team/SKILL.md` xem đi mà vấp váp chiêu đẽ nhái templates dập mã tiêu cự lẫy (decision criteria) hay điệp kịch đâm dọn xuất thế ngọc của chiêu tạo form con agents con đẻ spawn instruction gõ đâm nghen 
