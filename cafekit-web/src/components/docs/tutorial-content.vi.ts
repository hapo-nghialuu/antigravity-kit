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
    openCodeNote: "Dùng OpenCode? Bỏ tiền tố hapo: — dùng /specs, /develop, /test thay thế.",
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
        "CafeKit chạy bên trong Claude Code — một AI coding assistant bạn điều khiển từ terminal. Các lệnh /hapo:* được gõ TRONG phiên Claude Code, không phải trong terminal thông thường.",
        "Chuẩn bị 3 thứ sau. Khi đã xong, quay lại đây và bấm Tiếp theo.",
      ],
      links: [
        { label: "Cài Claude Code", href: "https://code.claude.com/docs/en/setup", external: true },
        { label: "Ngày đầu với Claude Code", href: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code", external: true },
        { label: "Dùng OpenCode thay thế?", href: "/docs/platforms/opencode" },
      ],
    },
    {
      id: "install",
      label: "Cài đặt",
      title: "Cài CafeKit vào dự án",
      narrative: [
        "Mở terminal, vào thư mục dự án của bạn rồi chạy lệnh cài đặt. CafeKit ghi một runtime bundle vào .claude/ — gồm skills, agents, hooks và quy tắc workflow mà Claude Code sẽ dùng.",
      ],
      command: "npx @haposoft/cafekit",
      outputs: [
        { kind: "output", text: "đang nhận diện loại dự án…" },
        { kind: "output", text: "đang cài runtime bundle cho Claude Code…" },
        { kind: "success", text: "✓ skills   agents   hooks   statusline" },
        { kind: "success", text: "✓ runtime sẵn sàng — chạy /hapo:specs để bắt đầu" },
      ],
      youWillSee: [
        "Thư mục .claude/ mới xuất hiện trong project root",
        "Bên trong: skills/, agents/, hooks/, runtime.json, settings.json",
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
        "Mở phiên Claude Code trong project bằng cách chạy claude trong terminal. Bây giờ bạn đang ở trong Claude Code — đây là nơi gõ các lệnh /hapo:*.",
        "Spec là bản hợp đồng mô tả điều bạn muốn xây dựng TRƯỚC khi code. Chạy lệnh dưới đây trong Claude Code.",
      ],
      command: "/hapo:specs Build a word counter that counts words in a sentence",
      outputs: [
        { kind: "output", text: "đang tạo specs/word-counter/…" },
        { kind: "success", text: "✓ spec.json          trạng thái machine-readable" },
        { kind: "success", text: "✓ requirements.md    tính năng cần làm gì" },
        { kind: "success", text: "✓ design.md          sẽ xây dựng như thế nào" },
        { kind: "success", text: "✓ tasks/task-R0-01-count-words.md" },
        { kind: "output", text: "task_registry: 1 pending  |  ready_for_implementation: false" },
      ],
      youWillSee: [
        "Thư mục specs/word-counter/ với 4+ file",
        "spec.json — trạng thái machine-readable (phase, task registry)",
        "requirements.md — countWords() cần làm gì",
        "tasks/ — một file task sẵn sàng để implement",
      ],
      troubleshooting: [
        { problem: "/hapo:specs không được nhận diện", fix: "Đảm bảo đã chạy npx @haposoft/cafekit trong project này. Kiểm tra .claude/ tồn tại." },
        { problem: "Lệnh chạy nhưng không có output", fix: "Bạn có thể đang ở terminal thường, không phải phiên Claude Code. Chạy claude trước rồi thử lại." },
      ],
      glossary: [
        { term: "spec", definition: "Thư mục chứa các file mô tả cần xây dựng gì. Đây là nguồn sự thật — không phải chat." },
        { term: "task packet", definition: "Đơn vị implement nhỏ, có phạm vi rõ ràng, định nghĩa trong tasks/task-R*.md." },
      ],
    },
    {
      id: "validate",
      label: "Kiểm tra",
      title: "Validate spec trước khi code",
      narrative: [
        "Trước khi viết một dòng code nào, hãy validate rằng spec đã đầy đủ và nhất quán. Bước này bắt các chi tiết còn thiếu sớm — trước khi chúng trở thành bug.",
      ],
      command: "/hapo:specs --validate word-counter",
      outputs: [
        { kind: "output", text: "kiểm tra tính nhất quán của spec.json…" },
        { kind: "output", text: "kiểm tra task_registry với các task file…" },
        { kind: "success", text: "✓ validation.status: completed" },
        { kind: "success", text: "✓ ready_for_implementation: true" },
      ],
      youWillSee: [
        "validation.status: completed — spec nhất quán, không có vấn đề",
        "ready_for_implementation: true — sẵn sàng để implement",
      ],
      troubleshooting: [
        { problem: "Validation trả về lỗi", fix: "Đọc kỹ output lỗi. Thường do thiếu trường trong spec.json hoặc task file không khớp. Chạy lại /hapo:specs để tạo mới." },
      ],
    },
    {
      id: "develop",
      label: "Code",
      title: "Implement task đầu tiên",
      narrative: [
        "Bây giờ mới implement — từng task một. CafeKit đọc file task, kiểm tra những gì cần xây dựng và implement. Sau khi code xong, nó chạy quality gate: build, evidence và review đều phải pass.",
      ],
      command: "/hapo:develop word-counter task-R0-01-count-words.md",
      openCodeCommand: "/develop word-counter task-R0-01-count-words.md",
      outputs: [
        { kind: "output", text: "đang đọc task-R0-01-count-words.md…" },
        { kind: "output", text: "đang implement countWords()…" },
        { kind: "output", text: "quality gate → build · evidence · review" },
        { kind: "success", text: "✓ implement hoàn thành" },
        { kind: "success", text: "✓ task synced: in_progress" },
      ],
      youWillSee: [
        "Hàm countWords() được tạo trong project",
        "Verification receipt bên trong file task",
        "task_registry entry được cập nhật thành in_progress",
      ],
      glossary: [
        { term: "quality gate", definition: "Ba kiểm tra phải pass trước khi task xong: build thành công, evidence được ghi, review không có lỗi chặn." },
        { term: "task_registry", definition: "Danh sách machine-readable trong spec.json theo dõi trạng thái mọi task (pending → in_progress → done)." },
      ],
    },
    {
      id: "test",
      label: "Test",
      title: "Verify bằng test thật",
      narrative: [
        "Chạy test suite. CafeKit kiểm tra build, types và tests — và từ chối kết quả hời hợt. Một lệnh thoát 0 trong khi chạy 0 test KHÔNG phải là pass.",
      ],
      command: "/hapo:test",
      openCodeCommand: "/test",
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
        { problem: "verdict: NO_TESTS", fix: "Không tìm thấy file test. Thêm test cho countWords() và chạy lại /hapo:test. Zero test không phải pass." },
        { problem: "Tests fail", fix: "Đọc output lỗi. Fix implementation hoặc test rồi chạy lại /hapo:test." },
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
        "Sau khi review pass, chạy: /hapo:sync word-counter task-R0-01-count-words.md done",
      ],
      command: "/hapo:code-review",
      openCodeCommand: "/code-review",
      outputs: [
        { kind: "output", text: "đang review implementation word-counter…" },
        { kind: "success", text: "✓ spec compliance: ok" },
        { kind: "success", text: "✓ không có critical finding" },
        { kind: "output", text: "tiếp theo: /hapo:sync word-counter task-R0-01-count-words.md done" },
      ],
      youWillSee: [
        "no critical findings — sẵn sàng đánh dấu done",
        "task_registry status trở thành done sau khi sync",
      ],
      troubleshooting: [
        { problem: "Review tìm thấy critical issues", fix: "Fix các vấn đề, chạy lại /hapo:test, rồi /hapo:code-review trước khi sync." },
      ],
    },
  ],
  recap: {
    title: "Bạn vừa ship một feature đã verify",
    bullets: [
      "Spec trước, code sau — hợp đồng ngăn scope drift",
      "Từng task một — mỗi thay đổi nhỏ và có thể review",
      "Cần evidence thật — không có kết quả xanh giả",
      "State luôn đồng bộ — spec.json và task file lúc nào cũng khớp",
    ],
    nextLinks: [
      { label: "Spec-driven development", href: "/docs/spec-driven-development" },
      { label: "Workflow chính", href: "/docs/core-workflow" },
      { label: "Xem các skills", href: "/docs/skills" },
    ],
    glossary: [
      { term: "spec", definition: "Thư mục file mô tả cần xây dựng gì trước khi code bắt đầu." },
      { term: "task packet", definition: "Đơn vị công việc nhỏ có steps, criteria và evidence." },
      { term: "task_registry", definition: "Danh sách trạng thái task machine-readable trong spec.json." },
      { term: "quality gate", definition: "Build + evidence + review — cả ba phải pass." },
      { term: "NO_TESTS", definition: "Không có test suite nào chạy. Không bao giờ là kết quả pass." },
    ],
  },
};
