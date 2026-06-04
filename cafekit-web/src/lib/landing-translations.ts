import type { Locale } from "@/lib/locale-utils";

type WorkflowNote = {
  title: string;
  description: string;
};

type WorkflowStep = {
  tab: string;
  title: string;
  description: string;
  status?: string;
  highlights: string[];
  notes: WorkflowNote[];
};

type LandingTranslations = {
  hero: {
    headingLead: string;
    headingAccent: string;
    badge: string;
    subtitle: string;
    availability: string;
    runtimeStats: WorkflowNote[];
    readDocs: string;
    copied: string;
    copy: string;
  };
  features: {
    heading: string;
    subheading: string;
    workflowLabel: string;
    activeLoopLabel: string;
    activeLoopValue: string;
    detailsLabel: string;
    notesLabel: string;
    steps: WorkflowStep[];
  };
  quickStart: {
    heading: string;
    subheading: string;
    viewGuide: string;
    copied: string;
    copy: string;
    comments: string[];
    tutorialHeading: string;
    tutorialBody: string;
    tutorialCta: string;
  };
  contactForm: {
    heading: string;
    subheading: string;
    fullnameLabel: string;
    fullnamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    jobtitleLabel: string;
    jobtitlePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    reset: string;
    validation: {
      fullnameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneRequired: string;
      companyRequired: string;
      messageTooLong: string;
    };
  };
};

const translations: Record<Locale, LandingTranslations> = {
  en: {
    hero: {
      headingLead: "CafeKit runtime",
      headingAccent: "for verified AI coding",
      badge: "Spec-driven runtime installed inside your repo",
      subtitle:
        "Turn ad-hoc prompts into a delivery flow with specs, task boundaries, verification gates, and state sync. Built for Claude Code, with OpenCode support.",
      availability: "Ready for Claude Code",
      runtimeStats: [
        { title: "Spec gate", description: "validate first" },
        { title: "Task registry", description: "explicit state" },
        { title: "Evidence", description: "proof before done" },
      ],
      readDocs: "Read docs",
      copied: "Copied!",
      copy: "Copy",
    },
    features: {
      heading: "From first prompt to verified release",
      subheading:
        "CafeKit installs an operating layer into your repo: create specs, split task packets, implement one task at a time, run test/review, sync state, and hand off release through your existing stack.",
      workflowLabel: "Runtime flow",
      activeLoopLabel: "Main loop",
      activeLoopValue: "install -> specs -> develop -> test -> review -> git -> release",
      detailsLabel: "Core mechanics",
      notesLabel: "What to lock down",
      steps: [
        {
          tab: "install",
          title: "Install the runtime into your repo",
          description:
            "Bootstrap CafeKit into a Claude Code or OpenCode project without touching application code.",
          highlights: [
            "Installs skills, agents, hooks, rules, statusline, and workflow context into `.claude` or `.opencode`.",
            "Writes version metadata and an ownership manifest so future installs preserve user edits.",
            "Moves the repo to a spec-driven command surface instead of relying on long prompts.",
          ],
          notes: [
            {
              title: "Install command",
              description: "Run `npx @haposoft/cafekit` in the project root.",
            },
            {
              title: "Result",
              description: "The repo is ready to run `hapo:*` workflows with a project-local runtime.",
            },
          ],
        },
        {
          tab: "/hapo:specs",
          title: "Create the feature contract",
          description:
            "Create `spec.json`, requirements, research, design, and task packets before implementation begins.",
          highlights: [
            "Creates `specs/<feature>/` with machine-readable state, task files, and task registry.",
            "Scans in-progress specs and cross-spec dependencies before opening a new scope.",
            "Runs the validator to block specs that are not ready for develop handoff.",
          ],
          notes: [
            {
              title: "Required gate",
              description:
                "A spec cannot set `ready_for_implementation` until validation passes.",
            },
            {
              title: "Task packet",
              description:
                "Each `task-R*.md` is the execution boundary for one verifiable develop pass.",
            },
          ],
        },
        {
          tab: "/hapo:develop",
          title: "Implement one task packet at a time",
          description:
            "Code only after the spec is ready, process one task boundary per pass, and sync state after proof exists.",
          highlights: [
            "Supports full-spec orchestration or an exact single task file.",
            "Scouts the codebase before edits to avoid orphan code, scope drift, and wrong entrypoints.",
            "Rejects placeholders, fake adapters, and silent contract swaps as completion proof.",
          ],
          notes: [
            {
              title: "Definition of done",
              description:
                "A task is done only when Completion Criteria and Evidence both have real proof.",
            },
            {
              title: "State sync",
              description:
                "`spec.json.task_registry` and task markdown must be aligned before returning results.",
            },
          ],
        },
        {
          tab: "/hapo:test",
          title: "Verify with real signals",
          description:
            "Run exact Evidence commands, prechecks, test suites, and UI verification according to task scope.",
          highlights: [
            "Auto-detects the test runner and chooses blast-radius or full suite by context.",
            "`NO_TESTS` and `0 tests` are not treated as pass when a task requires automated proof.",
            "Returns a structured verdict with scope, failures, coverage, and runtime reachability.",
          ],
          notes: [
            {
              title: "Exact commands",
              description:
                "Verification starts from commands declared in the task packet Evidence.",
            },
            {
              title: "UI mode",
              description:
                "Protected flows can use `--ui-auth` or `--ui-flow` when runtime pages are available.",
            },
          ],
        },
        {
          tab: "/hapo:code-review",
          title: "Adversarial review before merge",
          description:
            "Check spec compliance, code quality, security, and regression risk before the candidate moves forward.",
          highlights: [
            "Stage 1 compares implementation against spec and task evidence.",
            "Stage 2 checks YAGNI, KISS, DRY, maintainability, and test gaps.",
            "Stage 3 red-teams security, edge cases, false assumptions, and contract drift.",
          ],
          notes: [
            {
              title: "Real PASS",
              description: "Review passes only with score >= 9.5 and zero Critical findings.",
            },
            {
              title: "Release gate",
              description:
                "Critical findings should stop the handoff to Git and deployment.",
            },
          ],
        },
        {
          tab: "/hapo:git",
          title: "Safe commit and handoff",
          description:
            "Use native Git operations for commit, push, PR prep, and worktree flow after code is verified.",
          highlights: [
            "Supports `commit`, `push`, `pr`, and sibling worktree flows.",
            "Checks staged diff content for sensitive values before commit.",
            "Keeps Git handoff aligned with task state and verification receipts.",
          ],
          notes: [
            {
              title: "Command surface",
              description: "Use `/hapo:git commit` and `/hapo:git push` after review is green.",
            },
            {
              title: "Safety",
              description:
                "Conventional commits and sensitive-value checks happen before the repo is handed off.",
            },
          ],
        },
        {
          tab: "/hapo:deploy",
          title: "Hand off release through your existing stack",
          description:
            "CafeKit does not replace your deployment pipeline; it keeps the release story closed after test, review, and Git handoff.",
          highlights: [
            "Represents Vercel, CI/CD, or your team's existing production pipeline.",
            "Should only run after `hapo:test`, `hapo:code-review`, and `hapo:git`.",
            "Avoids over-claiming native deploy; this is release handoff through your stack.",
          ],
          notes: [
            {
              title: "Release handoff",
              description:
                "Deployment stays in your existing pipeline; CafeKit provides guardrails before handoff.",
            },
            {
              title: "Release condition",
              description:
                "Only ship code that already passed `hapo:test`, `hapo:code-review`, and `hapo:git`.",
            },
          ],
        },
      ],
    },
    quickStart: {
      heading: "Install the runtime, run the first flow",
      subheading:
        "Install CafeKit, create a validated spec, implement a task with Evidence, then test/review before Git handoff.",
      viewGuide: "View full quickstart guide",
      copied: "Copied!",
      copy: "Copy",
      comments: [
        "# 1. Install CafeKit",
        "# 2. Create and validate a spec",
        "# 3. Implement one task packet at a time",
        "# 4. Test and review the candidate",
        "# 5. Commit, push, and hand off release",
      ],
      tutorialHeading: "New to CafeKit?",
      tutorialBody:
        "Go from an untouched repo to your first feature with spec, task, and verification receipt.",
      tutorialCta: "Start tutorial",
    },
    contactForm: {
      heading: "Get in touch",
      subheading: "Tell us about your project or ask anything. We usually reply within one business day.",
      fullnameLabel: "Full name",
      fullnamePlaceholder: "Alex Rivera",
      emailLabel: "Email address",
      emailPlaceholder: "you@company.com",
      phoneLabel: "Phone number",
      phonePlaceholder: "+1 (555) 123-4567",
      jobtitleLabel: "Job title",
      jobtitlePlaceholder: "Engineering Manager",
      companyLabel: "Company",
      companyPlaceholder: "Acme Corp",
      messageLabel: "Message",
      messagePlaceholder: "Tell us about your use case, timeline, or questions...",
      submit: "Send message",
      submitting: "Sending...",
      successTitle: "Thank you!",
      successMessage: "Your message has been sent. We'll get back to you within one business day.",
      errorTitle: "Something went wrong",
      errorMessage: "We couldn't send your message right now. Please try again in a moment.",
      reset: "Send another message",
      validation: {
        fullnameRequired: "Full name is required",
        emailRequired: "Email address is required",
        emailInvalid: "Please enter a valid email address",
        phoneRequired: "Phone number is required",
        companyRequired: "Company is required",
        messageTooLong: "Message must be 10000 characters or less",
      },
    },
  },
  vi: {
    hero: {
      headingLead: "CafeKit",
      headingAccent: "cho quy trình AI coding có kiểm chứng",
      badge: "Bộ công cụ vận hành cài trực tiếp vào dự án",
      subtitle:
        "Biến prompt rời rạc thành quy trình có đặc tả, tác vụ, cổng kiểm chứng và đồng bộ trạng thái. Ưu tiên Claude Code, có hỗ trợ OpenCode.",
      availability: "Sẵn sàng cho Claude Code",
      runtimeStats: [
        { title: "Cổng đặc tả", description: "kiểm tra trước" },
        { title: "Sổ tác vụ", description: "trạng thái rõ ràng" },
        { title: "Bằng chứng", description: "đủ chứng cứ mới hoàn tất" },
      ],
      readDocs: "Đọc tài liệu",
      copied: "Đã sao chép",
      copy: "Sao chép",
    },
    features: {
      heading: "Từ ý tưởng đầu tiên đến bàn giao code có kiểm chứng",
      subheading:
        "CafeKit cài vào dự án một bộ công cụ vận hành: tạo đặc tả, chia tác vụ, triển khai từng phần, chạy kiểm thử và review, đồng bộ trạng thái rồi bàn giao qua quy trình sẵn có.",
      workflowLabel: "Quy trình vận hành",
      activeLoopLabel: "Vòng chạy chính",
      activeLoopValue: "cài đặt -> đặc tả -> triển khai -> kiểm thử -> review -> git -> bàn giao",
      detailsLabel: "Cơ chế chính",
      notesLabel: "Điểm cần chốt",
      steps: [
        {
          tab: "cài đặt",
          title: "Cài bộ công cụ vào dự án",
          description:
            "Khởi tạo CafeKit cho dự án Claude Code hoặc OpenCode mà không sửa code ứng dụng.",
          highlights: [
            "Cài bộ kỹ năng, agent hỗ trợ, hook, quy tắc, statusline và ngữ cảnh quy trình vào `.claude` hoặc `.opencode`.",
            "Ghi thông tin phiên bản và manifest sở hữu để lần cài sau cập nhật phần do CafeKit quản lý mà vẫn giữ chỉnh sửa của bạn.",
            "Đưa dự án vào quy trình dựa trên đặc tả thay vì phụ thuộc vào prompt dài.",
          ],
          notes: [
            {
              title: "Lệnh cài đặt",
              description: "Chạy `npx @haposoft/cafekit` ở thư mục gốc của dự án.",
            },
            {
              title: "Kết quả",
              description: "Dự án sẵn sàng chạy các quy trình `hapo:*` bằng bộ công cụ vận hành cục bộ.",
            },
          ],
        },
        {
          tab: "/hapo:specs",
          title: "Tạo đặc tả cho tính năng",
          description:
            "Tạo `spec.json`, yêu cầu, nghiên cứu, thiết kế và danh sách tác vụ trước khi bắt đầu triển khai.",
          highlights: [
            "Tạo `specs/<feature>/` với trạng thái máy đọc được, file tác vụ và sổ tác vụ.",
            "Rà soát các đặc tả đang dang dở và phụ thuộc giữa đặc tả trước khi mở phạm vi mới.",
            "Chạy bộ kiểm tra đặc tả để chặn những đặc tả chưa đủ điều kiện bàn giao sang triển khai.",
          ],
          notes: [
            {
              title: "Gate bắt buộc",
              description:
                "Đặc tả chưa qua kiểm tra thì `ready_for_implementation` không được bật.",
            },
            {
              title: "Gói tác vụ",
              description:
                "Mỗi `task-R*.md` là ranh giới thực thi cho một lượt triển khai có thể kiểm chứng.",
            },
          ],
        },
        {
          tab: "/hapo:develop",
          title: "Triển khai theo từng gói tác vụ",
          description:
            "Chỉ viết code khi đặc tả đã sẵn sàng, xử lý một ranh giới tác vụ mỗi lượt và đồng bộ trạng thái sau khi có bằng chứng.",
          highlights: [
            "Hỗ trợ điều phối toàn bộ đặc tả hoặc chạy chính xác một file tác vụ.",
            "Khảo sát mã nguồn dự án trước khi sửa để tránh code mồ côi, lệch phạm vi và sai điểm vào.",
            "Không chấp nhận phần dựng tạm, adapter giả hoặc đổi ngầm hợp đồng làm bằng chứng hoàn thành.",
          ],
          notes: [
            {
              title: "Định nghĩa hoàn tất",
              description:
                "Tác vụ chỉ hoàn tất khi tiêu chí hoàn thành và bằng chứng đều có chứng cứ thật.",
            },
            {
              title: "Đồng bộ trạng thái",
              description:
                "`spec.json.task_registry` và markdown tác vụ phải khớp nhau trước khi trả kết quả.",
            },
          ],
        },
        {
          tab: "/hapo:test",
          title: "Xác minh bằng tín hiệu thật",
          description:
            "Chạy đúng lệnh bằng chứng, kiểm tra trước, bộ kiểm thử và xác minh giao diện theo phạm vi tác vụ.",
          highlights: [
            "Tự nhận diện trình chạy kiểm thử và chọn phạm vi hẹp hoặc toàn bộ bộ kiểm thử theo ngữ cảnh.",
            "`NO_TESTS` và `0 tests` không được coi là đạt khi tác vụ cần bằng chứng tự động.",
            "Trả kết luận có cấu trúc với phạm vi, lỗi, độ phủ và khả năng truy cập lúc chạy.",
          ],
          notes: [
            {
              title: "Lệnh chính xác",
              description:
                "Xác minh bắt đầu từ các lệnh được ghi trong phần bằng chứng của gói tác vụ.",
            },
            {
              title: "Chế độ giao diện",
              description:
                "Luồng có xác thực có thể dùng `--ui-auth` hoặc `--ui-flow` khi trang chạy thực tế đã sẵn sàng.",
            },
          ],
        },
        {
          tab: "/hapo:code-review",
          title: "Review đối kháng trước khi hợp nhất",
          description:
            "Kiểm tra độ khớp với đặc tả, chất lượng code, bảo mật và rủi ro hồi quy trước khi bản thay đổi đi tiếp.",
          highlights: [
            "Giai đoạn 1 đối chiếu phần triển khai với đặc tả và bằng chứng tác vụ.",
            "Giai đoạn 2 kiểm tra YAGNI, KISS, DRY, khả năng bảo trì và khoảng trống kiểm thử.",
            "Giai đoạn 3 rà soát bảo mật, trường hợp biên, giả định sai và lệch hợp đồng.",
          ],
          notes: [
            {
              title: "Kết luận đạt",
              description: "Review chỉ đạt khi điểm >= 9.5 và không còn phát hiện nghiêm trọng.",
            },
            {
              title: "Cổng bàn giao",
              description:
                "Phát hiện nghiêm trọng phải chặn bàn giao sang Git và triển khai.",
            },
          ],
        },
        {
          tab: "/hapo:git",
          title: "Commit và bàn giao an toàn",
          description:
            "Dùng thao tác Git gốc cho commit, push, chuẩn bị PR và worktree sau khi code đã được kiểm chứng.",
          highlights: [
            "Hỗ trợ `commit`, `push`, `pr` và luồng worktree song song.",
            "Kiểm tra staged diff để phát hiện giá trị nhạy cảm trước commit.",
            "Giữ bàn giao Git nhất quán với trạng thái tác vụ và biên nhận kiểm chứng.",
          ],
          notes: [
            {
              title: "Bề mặt lệnh",
              description:
                "Dùng `/hapo:git commit` và `/hapo:git push` sau khi review đã xanh.",
            },
            {
              title: "An toàn",
              description:
                "Conventional commit và kiểm tra giá trị nhạy cảm diễn ra trước khi bàn giao dự án.",
            },
          ],
        },
        {
          tab: "/hapo:deploy",
          title: "Bàn giao code qua quy trình sẵn có",
          description:
            "CafeKit không thay thế quy trình triển khai; nó khép lại phần bàn giao sau kiểm thử, review và Git.",
          highlights: [
            "Đại diện cho Vercel, CI/CD hoặc quy trình production hiện có của đội ngũ.",
            "Chỉ nên chạy sau `hapo:test`, `hapo:code-review` và `hapo:git`.",
            "Tránh nói quá về triển khai trực tiếp; đây là bước bàn giao qua quy trình của bạn.",
          ],
          notes: [
            {
              title: "Bàn giao",
              description:
                "Triển khai vẫn thuộc quy trình hiện có; CafeKit cung cấp hàng rào kiểm chứng trước khi bàn giao.",
            },
            {
              title: "Điều kiện bàn giao",
              description:
                "Chỉ bàn giao code đã qua `hapo:test`, `hapo:code-review` và `hapo:git`.",
            },
          ],
        },
      ],
    },
    quickStart: {
      heading: "Cài bộ công cụ, chạy quy trình đầu tiên",
      subheading:
        "Cài CafeKit, tạo đặc tả đã kiểm tra, triển khai một tác vụ có bằng chứng, rồi kiểm thử và review trước khi bàn giao bằng Git.",
      viewGuide: "Xem hướng dẫn bắt đầu nhanh đầy đủ",
      copied: "Đã sao chép",
      copy: "Sao chép",
      comments: [
        "# 1. Cài đặt CafeKit",
        "# 2. Tạo và kiểm tra đặc tả",
        "# 3. Triển khai từng gói tác vụ",
        "# 4. Kiểm thử và review bản thay đổi",
        "# 5. Commit, push và bàn giao code",
      ],
      tutorialHeading: "Mới biết CafeKit?",
      tutorialBody: "Đi từ dự án chưa cài gì đến tính năng đầu tiên có đặc tả, tác vụ và biên nhận kiểm chứng.",
      tutorialCta: "Bắt đầu hướng dẫn",
    },
    contactForm: {
      heading: "Liên hệ với chúng tôi",
      subheading: "Kể về dự án của bạn hoặc đặt câu hỏi. Chúng tôi thường trả lời trong một ngày làm việc.",
      fullnameLabel: "Họ và tên",
      fullnamePlaceholder: "Nguyễn Văn A",
      emailLabel: "Địa chỉ email",
      emailPlaceholder: "ban@congty.com",
      phoneLabel: "Số điện thoại",
      phonePlaceholder: "+84 901 234 567",
      jobtitleLabel: "Chức vụ",
      jobtitlePlaceholder: "Quản lý Kỹ thuật",
      companyLabel: "Công ty",
      companyPlaceholder: "Công ty Acme",
      messageLabel: "Tin nhắn",
      messagePlaceholder: "Mô tả trường hợp sử dụng, thời gian hoặc câu hỏi của bạn...",
      submit: "Gửi tin nhắn",
      submitting: "Đang gửi...",
      successTitle: "Cảm ơn bạn!",
      successMessage: "Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi trong một ngày làm việc.",
      errorTitle: "Đã xảy ra lỗi",
      errorMessage: "Chúng tôi không thể gửi tin nhắn lúc này. Vui lòng thử lại sau.",
      reset: "Gửi tin nhắn khác",
      validation: {
        fullnameRequired: "Họ và tên là bắt buộc",
        emailRequired: "Email là bắt buộc",
        emailInvalid: "Vui lòng nhập địa chỉ email hợp lệ",
        phoneRequired: "Số điện thoại là bắt buộc",
        companyRequired: "Tên công ty là bắt buộc",
        messageTooLong: "Tin nhắn phải tối đa 2000 ký tự",
      },
    },
  },
  ja: {
    hero: {
      headingLead: "CafeKit runtime",
      headingAccent: "検証可能な AI coding のために",
      badge: "repo に導入する spec-driven runtime",
      subtitle:
        "ad-hoc prompt を、spec、task boundary、verification gate、state sync を持つ delivery flow に変えます。Claude Code を優先し、OpenCode もサポートします。",
      availability: "Claude Code 対応",
      runtimeStats: [
        { title: "Spec gate", description: "validate first" },
        { title: "Task registry", description: "明確な state" },
        { title: "Evidence", description: "done 前の proof" },
      ],
      readDocs: "ドキュメントを読む",
      copied: "コピーしました！",
      copy: "コピー",
    },
    features: {
      heading: "最初の prompt から verified release まで",
      subheading:
        "CafeKit は repo に operating layer を追加します。spec 作成、task packet 分割、1 task ずつの実装、test/review、state sync、既存 stack への release handoff までをつなぎます。",
      workflowLabel: "Runtime flow",
      activeLoopLabel: "Main loop",
      activeLoopValue: "install -> specs -> develop -> test -> review -> git -> release",
      detailsLabel: "Core mechanics",
      notesLabel: "固定すべきポイント",
      steps: [
        {
          tab: "install",
          title: "runtime を repo にインストール",
          description:
            "Claude Code または OpenCode project に CafeKit を bootstrap します。application code は変更しません。",
          highlights: [
            "skills、agents、hooks、rules、statusline、workflow context を `.claude` または `.opencode` に配置します。",
            "version metadata と ownership manifest を記録し、次回 install でも user edits を preserve します。",
            "長い prompt 依存ではなく、repo を spec-driven command surface に移行します。",
          ],
          notes: [
            {
              title: "Install command",
              description: "project root で `npx @haposoft/cafekit` を実行します。",
            },
            {
              title: "Result",
              description: "repo は project-local runtime で `hapo:*` workflows を実行できる状態になります。",
            },
          ],
        },
        {
          tab: "/hapo:specs",
          title: "feature contract を作成",
          description:
            "implementation 前に `spec.json`、requirements、research、design、task packets を作成します。",
          highlights: [
            "machine-readable state、task files、task registry を持つ `specs/<feature>/` を作成します。",
            "新しい scope を開く前に in-progress specs と cross-spec dependencies を scan します。",
            "develop handoff に足りない spec は validator で block します。",
          ],
          notes: [
            {
              title: "Required gate",
              description:
                "validation が pass するまで spec は `ready_for_implementation` を set できません。",
            },
            {
              title: "Task packet",
              description: "`task-R*.md` は verifiable な develop pass 1回分の execution boundary です。",
            },
          ],
        },
        {
          tab: "/hapo:develop",
          title: "task packet を1つずつ実装",
          description:
            "spec が ready になってから code を書き、1 pass で1つの task boundary を処理し、proof が揃ってから state を sync します。",
          highlights: [
            "full-spec orchestration または exact single task file のどちらにも対応します。",
            "編集前に codebase を scout し、orphan code、scope drift、wrong entrypoint を避けます。",
            "placeholder、fake adapter、silent contract swap は completion proof として扱いません。",
          ],
          notes: [
            {
              title: "Definition of done",
              description: "Completion Criteria と Evidence の両方に real proof がある場合だけ task は done です。",
            },
            {
              title: "State sync",
              description:
                "結果を返す前に `spec.json.task_registry` と task markdown を一致させます。",
            },
          ],
        },
        {
          tab: "/hapo:test",
          title: "real signals で verify",
          description:
            "task scope に合わせて exact Evidence commands、prechecks、test suites、UI verification を実行します。",
          highlights: [
            "test runner を auto-detect し、context に応じて blast-radius または full suite を選びます。",
            "automated proof が必要な task では `NO_TESTS` と `0 tests` を pass 扱いしません。",
            "scope、failures、coverage、runtime reachability を含む structured verdict を返します。",
          ],
          notes: [
            {
              title: "Exact commands",
              description: "verification は task packet の Evidence に書かれた commands から始まります。",
            },
            {
              title: "UI mode",
              description:
                "保護された flow は `--ui-auth` や `--ui-flow` を利用できます。",
            },
          ],
        },
        {
          tab: "/hapo:code-review",
          title: "merge 前の adversarial review",
          description:
            "candidate を先へ進める前に spec compliance、code quality、security、regression risk を確認します。",
          highlights: [
            "Stage 1 で implementation を spec と task evidence に照合します。",
            "Stage 2 で YAGNI、KISS、DRY、maintainability、test gaps を確認します。",
            "Stage 3 で security、edge cases、false assumptions、contract drift を red-team します。",
          ],
          notes: [
            {
              title: "Real PASS",
              description: "score >= 9.5 かつ Critical finding が 0 の場合だけ review は pass です。",
            },
            {
              title: "Release gate",
              description: "critical findings は Git と deploy への handoff を止めるべきです。",
            },
          ],
        },
        {
          tab: "/hapo:git",
          title: "safe commit と handoff",
          description:
            "code が verified になった後、native Git operations で commit、push、PR prep、worktree flow へ進めます。",
          highlights: [
            "`commit`、`push`、`pr`、sibling worktree flows をサポートします。",
            "commit 前に staged diff の sensitive value check を行います。",
            "Git handoff を task state と verification receipts に揃えます。",
          ],
          notes: [
            {
              title: "Command surface",
              description: "`/hapo:git commit` と `/hapo:git push` を使います。",
            },
            {
              title: "Safety",
              description: "conventional commit と sensitive value check を先に通します。",
            },
          ],
        },
        {
          tab: "/hapo:deploy",
          title: "既存 stack への release handoff",
          description:
            "CafeKit は deployment pipeline を置き換えません。test、review、Git handoff 後の release story を閉じます。",
          highlights: [
            "Vercel、CI/CD、または team の既存 production pipeline を表します。",
            "`hapo:test`、`hapo:code-review`、`hapo:git` の後にだけ実行すべきです。",
            "native deploy を過剰に claim せず、既存 stack への release handoff として扱います。",
          ],
          notes: [
            {
              title: "Release handoff",
              description:
                "deployment は既存 pipeline に残し、CafeKit は handoff 前の guardrails を提供します。",
            },
            {
              title: "Release condition",
              description:
                "`hapo:test`、`hapo:code-review`、`hapo:git` を通った code のみ ship します。",
            },
          ],
        },
      ],
    },
    quickStart: {
      heading: "runtime をインストールし、最初の flow を実行",
      subheading:
        "CafeKit をインストールし、validated spec を作成し、Evidence 付き task を実装してから Git handoff 前に test/review します。",
      viewGuide: "クイックスタートを詳しく見る",
      copied: "コピーしました！",
      copy: "コピー",
      comments: [
        "# 1. CafeKit をインストール",
        "# 2. spec を作成して validate",
        "# 3. task packet を1つずつ実装",
        "# 4. candidate を test/review",
        "# 5. commit, push, release handoff",
      ],
      tutorialHeading: "CafeKit が初めてですか？",
      tutorialBody: "未導入の repo から、spec、task、verification receipt を持つ最初の feature まで進めます。",
      tutorialCta: "チュートリアルを開始",
    },
    contactForm: {
      heading: "お問い合わせ",
      subheading: "プロジェクトについてお知らせいただくか、ご質問をお寄せください。通常1営業日以内にご返信いたします。",
      fullnameLabel: "お名前",
      fullnamePlaceholder: "山田 太郎",
      emailLabel: "メールアドレス",
      emailPlaceholder: "you@company.com",
      phoneLabel: "電話番号",
      phonePlaceholder: "+81 90-1234-5678",
      jobtitleLabel: "役職",
      jobtitlePlaceholder: "エンジニアリングマネージャー",
      companyLabel: "会社名",
      companyPlaceholder: "株式会社Acme",
      messageLabel: "メッセージ",
      messagePlaceholder: "ユースケース、タイムライン、質問などをご記入ください...",
      submit: "メッセージを送信",
      submitting: "送信中...",
      successTitle: "ありがとうございます！",
      successMessage: "メッセージを送信しました。1営業日以内にご連絡いたします。",
      errorTitle: "エラーが発生しました",
      errorMessage: "現在メッセージを送信できません。しばらくしてから再度お試しください。",
      reset: "別のメッセージを送信",
      validation: {
        fullnameRequired: "お名前は必須です",
        emailRequired: "メールアドレスは必須です",
        emailInvalid: "有効なメールアドレスを入力してください",
        phoneRequired: "電話番号は必須です",
        companyRequired: "会社名は必須です",
        messageTooLong: "メッセージは2000文字以下である必要があります",
      },
    },
  },
};

export function getLandingTranslations(locale: Locale): LandingTranslations {
  return translations[locale] ?? translations.en;
}
