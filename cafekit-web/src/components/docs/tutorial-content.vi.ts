import type { TutorialContent } from "./tutorial-types";

export const tutorialContentVi: TutorialContent = {
  eyebrow: "Bắt đầu",
  title: "Feature đầu tiên với CafeKit",
  description: "Hướng dẫn từng bước từ chưa cài gì đến feature đầu tiên đã verify. Khoảng 15 phút.",
  ui: {
    stepWord: "Bước",
    youWillSeeLabel: "Bạn sẽ thấy",
    troubleshootingLabel: "Nếu gặp vấn đề",
    glossaryLabel: "Từ mới",
    replay: "Chạy lại",
    back: "← Quay lại",
    next: "Tiếp theo →",
    prerequisiteItems: [
      "Node.js 18 trở lên (kiểm tra: node --version)",
      "Terminal đang mở — Terminal trên Mac, PowerShell trên Windows",
      "Claude Code đã cài (xem link bên dưới — ĐỪNG dùng sudo)",
      "Một thư mục dự án để làm việc",
    ],
    installCommand: "npm install -g @anthropic-ai/claude-code",
  },
  steps: [
    {
      id: "prereqs",
      label: "Chuẩn bị",
      title: "Bạn cần gì trước khi bắt đầu",
      narrative: [
        "CafeKit chạy bên trong Claude Code — một AI coding assistant bạn điều khiển từ terminal. Các lệnh /cf:* được gõ TRONG phiên Claude Code, không phải trong terminal thông thường.",
        "Chuẩn bị 3 thứ sau. Khi đã xong, quay lại đây và bấm Tiếp theo.",
      ],
      links: [
        { label: "Cài Claude Code", href: "https://code.claude.com/docs/en/setup", external: true },
        { label: "Ngày đầu với Claude Code", href: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code", external: true },
        { label: "Dùng Codex CLI?", href: "/docs/platforms" },
      ],
    },
    {
      id: "install",
      label: "Cài đặt",
      title: "Cài CafeKit vào dự án",
      narrative: [
        "Mở terminal, vào thư mục dự án của bạn rồi chạy lệnh cài đặt. Trình cài đặt sẽ hỏi bạn vài câu (ngôn ngữ, xưng hô, cài dependencies). CafeKit ghi runtime bundle vào .claude/ — gồm skills, agents, hooks và quy tắc workflow.",
      ],
      command: "npx @haposoft/cafekit",
      outputs: [
        { kind: "output", text: "Select language · 言語を選択 · Chọn ngôn ngữ" },
        { kind: "output", text: "Chọn (các) nền tảng cần cài…" },
        { kind: "output", text: "Claude Code — 67 tệp, 30 skill" },
        { kind: "output", text: "Bạn muốn AI gọi bạn là gì?" },
        { kind: "success", text: "✓ skill dependencies ready (Python venv, pip, npm, Chromium)" },
        { kind: "success", text: "✓ cài đặt hoàn tất — đã cài: 67  đã cập nhật: 1  không đổi: 6" },
      ],
      youWillSee: [
        "Các bước tương tác: chọn ngôn ngữ, nền tảng, xưng hô, cài skill deps",
        "Thư mục .claude/ mới xuất hiện trong project root",
        "Bên trong: skills/, agents/, hooks/, runtime.json, settings.json, cafekit-manifest.json",
        "File CLAUDE.md chứa quy tắc workflow",
      ],
      troubleshooting: [
        { problem: "Không tìm thấy lệnh npx", fix: "Cần Node.js 18+. Kiểm tra: node --version" },
        { problem: "Lỗi permission khi cài", fix: "Không dùng sudo. Trên Mac kiểm tra: npm config get prefix" },
      ],
    },
    {
      id: "spec",
      label: "Tạo spec",
      title: "Tạo spec đầu tiên",
      narrative: [
        "Mở phiên Claude Code trong project bằng cách chạy claude trong terminal. Bây giờ bạn đang ở trong Claude Code — đây là nơi gõ các lệnh /cf:*.",
        "Spec là bản hợp đồng mô tả điều bạn muốn xây dựng TRƯỚC khi code. Chạy lệnh dưới đây trong Claude Code.",
      ],
      command: "/cf:specs Build a word counter that counts words in a sentence",
      outputs: [
        { kind: "output", text: "C1 → xác nhận outcome, scope, exclusions và constraints" },
        { kind: "success", text: "✓ specs/word-counter/plan.md" },
        { kind: "success", text: "✓ specs/word-counter/task-01-count-words.md" },
        { kind: "output", text: "C2 → review findings trước implementation" },
      ],
      youWillSee: [
        "Thư mục specs/word-counter/ với plan.md và flat task files",
        "plan.md — scope, exclusions, acceptance criteria và task map",
        "task-01-count-words.md — một outcome, một Status và planned proof command",
      ],
      troubleshooting: [
        { problem: "/cf:specs không được nhận diện", fix: "Đảm bảo đã chạy npx @haposoft/cafekit trong project này. Kiểm tra .claude/ tồn tại." },
        { problem: "Lệnh chạy nhưng không có output", fix: "Bạn có thể đang ở terminal thường, không phải phiên Claude Code. Chạy claude trước rồi thử lại." },
      ],
      glossary: [
        { term: "spec", definition: "Thư mục chứa các file mô tả cần xây dựng gì. Đây là nguồn sự thật — không phải chat." },
        { term: "task packet", definition: "Đơn vị implement nhỏ, có phạm vi rõ ràng, định nghĩa trong flat task-NN-*.md." },
      ],
    },
    {
      id: "validate",
      label: "Duyệt",
      title: "Giải quyết C2 trước khi code",
      narrative: [
        "Sau adversarial review, CafeKit đưa ra gap, risk và contradiction quan trọng tại C2. Bạn accept, yêu cầu sửa, hoặc KEEP một limitation có tên rõ trước khi implement.",
      ],
      command: "Accept all",
      outputs: [
        { kind: "output", text: "ghi quyết định C2 vào plan.md…" },
        { kind: "success", text: "✓ scope và findings đã được chấp nhận" },
        { kind: "success", text: "✓ sẵn sàng cho invocation /cf:develop mới" },
      ],
      youWillSee: [
        "Quyết định C2 được lưu bền vững trong plan.md",
        "Planning dừng tại đây; implementation bắt đầu bằng command develop mới",
      ],
      troubleshooting: [
        { problem: "Validation trả về lỗi", fix: "Đọc kỹ output lỗi. Thường do thiếu trường trong plan.md hoặc task file không khớp. Chạy lại /cf:specs để tạo mới." },
      ],
    },
    {
      id: "develop",
      label: "Code",
      title: "Implement task đầu tiên",
      narrative: [
        "Bây giờ mới implement — từng task một. CafeKit đọc file task, kiểm tra những gì cần xây dựng và implement. Sau khi code xong, nó chạy quality gate: build, evidence và review đều phải pass.",
      ],
      command: "/cf:develop word-counter",
      outputs: [
        { kind: "output", text: "đang đọc task-01-count-words.md…" },
        { kind: "output", text: "đang implement countWords()…" },
        { kind: "output", text: "quality gate → build · evidence · review" },
        { kind: "success", text: "✓ implement hoàn thành" },
        { kind: "success", text: "✓ task Status: done với inline Receipt" },
      ],
      youWillSee: [
        "Hàm countWords() được tạo trong project",
        "Verification receipt bên trong file task",
        "Status và inline Receipt cuối của task do controller cập nhật",
      ],
      glossary: [
        { term: "quality gate", definition: "Ba kiểm tra phải pass trước khi task xong: build thành công, evidence được ghi, review không có lỗi chặn." },
        { term: "Receipt", definition: "Proof chuẩn trong task: exact command, exit, verdict, Base, Head và current output." },
      ],
    },
    {
      id: "test",
      label: "Test",
      title: "Verify bằng test thật",
      narrative: [
        "Chạy test suite. CafeKit kiểm tra build, types và tests — và từ chối kết quả hời hợt. Một lệnh thoát 0 trong khi chạy 0 test KHÔNG phải là pass.",
      ],
      command: "/cf:test",
      outputs: [
        { kind: "output", text: "đang nhận diện test runner…" },
        { kind: "output", text: "đang chạy test suite…" },
        { kind: "success", text: "✓ 3 passed   0 failed" },
        { kind: "success", text: "✓ verdict: PASS" },
      ],
      youWillSee: [
        "Số lượng test > 0 — test thật đã chạy",
        "verdict: PASS — build, types và tests đều xanh",
      ],
      troubleshooting: [
        { problem: "verdict: NO_TESTS", fix: "Không tìm thấy file test. Thêm test cho countWords() và chạy lại /cf:test. Zero test không phải pass." },
        { problem: "Tests fail", fix: "Đọc output lỗi. Fix implementation hoặc test rồi chạy lại /cf:test." },
      ],
      glossary: [
        { term: "NO_TESTS", definition: "Không có test suite nào chạy. KHÔNG phải kết quả pass — task cần evidence thật." },
      ],
    },
    {
      id: "sync",
      label: "Xong",
      title: "Review và đánh dấu hoàn thành",
      narrative: [
        "Chạy code review để bắt các vấn đề, rồi sync trạng thái task thành done. Task chỉ được coi là done khi implementation, evidence, tests và review đều đồng ý.",
        "Sau khi review pass, chạy: /cf:sync word-counter task-01-count-words.md done",
      ],
      command: "/cf:code-review",
      outputs: [
        { kind: "output", text: "đang review implementation word-counter…" },
        { kind: "success", text: "✓ spec compliance: ok" },
        { kind: "success", text: "✓ không có critical finding" },
        { kind: "output", text: "tiếp theo: /cf:sync word-counter task-01-count-words.md done" },
      ],
      youWillSee: [
        "no critical findings — sẵn sàng đánh dấu done",
        "Status và inline Receipt của task vẫn đồng bộ sau sync",
      ],
      troubleshooting: [
        { problem: "Review tìm thấy critical issues", fix: "Fix các vấn đề, chạy lại /cf:test, rồi /cf:code-review trước khi sync." },
      ],
    },
  ],
  recap: {
    title: "Bạn vừa ship một feature đã verify",
    bullets: [
      "Spec trước, code sau — hợp đồng ngăn scope drift",
      "Từng task một — mỗi thay đổi nhỏ và có thể review",
      "Cần evidence thật — không có kết quả xanh giả",
      "State luôn audit được — mỗi task có đúng một Status và một inline Receipt hiện tại",
    ],
    nextLinks: [
      { label: "Spec-driven development", href: "/docs/spec-driven-development" },
      { label: "Workflow chính", href: "/docs/core-workflow" },
      { label: "Xem các skills", href: "/docs/skills" },
    ],
    glossary: [
      { term: "spec", definition: "Thư mục file mô tả cần xây dựng gì trước khi code bắt đầu." },
      { term: "task packet", definition: "Đơn vị công việc nhỏ có steps, criteria và evidence." },
      { term: "C3", definition: "Quyết định cuối của user rằng proof hiện tại và limitation đã nêu là đủ để đóng feature." },
      { term: "quality gate", definition: "Build + evidence + review — cả ba phải pass." },
      { term: "NO_TESTS", definition: "Không có test suite nào chạy. Không bao giờ là kết quả pass." },
    ],
  },
};
