import { type Locale, localizeHref } from "@/lib/locale-utils";

export type DocsNavItem = {
  title: string;
  href: string;
  description: string;
  keywords: string;
  children?: DocsNavItem[];
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

type DocsLabels = {
  mainNav: Record<"docs" | "quickstart" | "reference", string>;
  sections: Record<"start" | "tutorials" | "runtime" | "catalog" | "reference", string>;
  pages: Record<string, Omit<DocsNavItem, "href">>;
};

type RouteItem = readonly [pageKey: string, href: string, children?: readonly RouteItem[]];

const skillRoutes = [
  ["skillQuestion", "/docs/skills/question"],
  ["skillBrainstorm", "/docs/skills/brainstorm"],
  ["skillSpecs", "/docs/skills/specs"],
  ["skillDevelop", "/docs/skills/develop"],
  ["skillTest", "/docs/skills/test"],
  ["skillCodeReview", "/docs/skills/code-review"],
  ["skillSync", "/docs/skills/sync"],
  ["skillDebug", "/docs/skills/debug"],
  ["skillHotfix", "/docs/skills/hotfix"],
  ["skillDocs", "/docs/skills/docs"],
  ["skillInspect", "/docs/skills/inspect"],
  ["skillGit", "/docs/skills/git"],
] as const satisfies readonly RouteItem[];

const routes = {
  tutorials: [
    ["tutorial", "/docs/tutorial"],
  ],
  start: [
    ["overview", "/docs"],
    ["specDriven", "/docs/spec-driven-development"],
    ["installation", "/docs/installation"],
    ["quickstart", "/docs/quickstart"],
    ["coreWorkflow", "/docs/core-workflow"],
  ],
  runtime: [
    ["runtime", "/docs/runtime"],
    ["specLifecycle", "/docs/spec-lifecycle"],
    ["workflows", "/docs/workflows"],
  ],
  catalog: [
    ["skills", "/docs/skills", skillRoutes],
    ["agents", "/docs/agents"],
    ["platforms", "/docs/platforms", [
      ["platformsClaude", "/docs/platforms/claude"],
      ["platformsOpencode", "/docs/platforms/opencode"],
    ]],
  ],
  reference: [
    ["reference", "/docs/reference"],
    ["faq", "/docs/faq"],
  ],
} as const satisfies Record<string, readonly RouteItem[]>;

const labels: Record<Locale, DocsLabels> = {
  en: {
    mainNav: { docs: "Docs", quickstart: "Quickstart", reference: "Reference" },
    sections: { tutorials: "Tutorials", start: "Docs", runtime: "Runtime model", catalog: "Catalog", reference: "Reference" },
    pages: {
      overview: page("Overview", "What CafeKit is, who it is for, and how the docs are organized.", "overview what is cafekit"),
      specDriven: page("Spec-driven development", "The simple visual guide to CafeKit SDD: spec, develop, verify, sync.", "sdd specification driven development visual guide"),
      installation: page("Installation", "Install, upgrade, and verify the CafeKit runtime bundle.", "install npx upgrade package"),
      quickstart: page("Quickstart", "Run the first spec-driven workflow from idea to review.", "quickstart first workflow"),
      tutorial: page("Tutorial: from zero", "Step-by-step guide from no install to your first verified feature.", "tutorial getting started beginner from zero walkthrough first feature"),
      coreWorkflow: page("Core workflow", "Understand the main CafeKit path from idea to verified change.", "core workflow main workflow specs develop test review"),
      runtime: page("Runtime bundle", "Understand installed files, hooks, state, and safety gates.", "runtime hooks settings statusline"),
      specLifecycle: page("Spec lifecycle", "Understand CafeKit SDD: scope lock, evidence, requirements, design, task packets, validation, and develop handoff.", "sdd spec json task registry lifecycle specification driven development"),
      workflows: page("Workflows", "Choose the right command: brainstorm, specs, develop, debug, hotfix, test, review, sync, docs, graph, git.", "commands workflows brainstorm debug hotfix"),
      skills: page("Skills", "Browse CafeKit workflow and domain skills, with detailed main-skill flows.", "skills catalog main skill flows"),
      skillQuestion: page("Ask", "Answer project and technical questions with repo-first evidence, then current external sources when needed.", "question ask answer source evidence consultation"),
      skillBrainstorm: page("Brainstorm", "Clarify unclear ideas before a spec exists.", "brainstorm ideation scout"),
      skillSpecs: page("Specs", "Create requirements, research, design, task packets, and validation state.", "specs requirements design tasks"),
      skillDevelop: page("Develop", "Implement approved task packets with scope fidelity.", "develop implementation task"),
      skillTest: page("Test", "Verify implementation with real commands and evidence.", "test verification evidence"),
      skillCodeReview: page("Code Review", "Review changes for spec compliance, security, and regressions.", "code review security regression"),
      skillSync: page("Sync", "Update task status, task_registry, task markdown, phase, and audit drift.", "sync state task registry audit phase"),
      skillDebug: page("Debug", "Diagnose failures before changing product code.", "debug root cause"),
      skillHotfix: page("Hotfix", "Apply narrow evidence-backed fixes after diagnosis.", "hotfix repair bug"),
      skillDocs: page("Docs", "Create, update, summarize, or reconstruct docs from source.", "docs reconstruct update"),
      skillInspect: page("Scout", "Discover relevant files, entrypoints, call paths, and blast radius.", "scout inspect discovery"),
      skillGit: page("Git", "Commit, push, PR, finish, and worktree operations with safety checks.", "git commit push pr"),
      agents: page("Agents", "Understand each packaged agent and where it fits in the workflow.", "agents subagents roles"),
      platforms: page("Platforms", "Claude Code and OpenCode support, with future platform notes.", "claude opencode platforms"),
      platformsClaude: page("Claude Code", "Native `.claude/` runtime with hooks, agents, skills, and commands.", "claude code hooks agents skills"),
      platformsOpencode: page("OpenCode", "Self-contained `.opencode/` runtime with TypeScript plugins and AGENTS.md.", "opencode plugins agents skills"),
      reference: page("Reference", "Command cheatsheet, file structure, package facts, and state values.", "reference commands files"),
      faq: page("FAQ", "Answers to common workflow and runtime questions.", "faq questions"),
    },
  },
  vi: {
    mainNav: { docs: "Tài liệu", quickstart: "Bắt đầu nhanh", reference: "Tham khảo" },
    sections: { tutorials: "Hướng dẫn", start: "Tài liệu", runtime: "Runtime", catalog: "Catalog", reference: "Tham khảo" },
    pages: {
      overview: page("Tổng quan", "CafeKit là gì, dành cho ai, và nên đọc docs theo thứ tự nào.", "tong quan cafekit"),
      specDriven: page("Spec-driven development", "Trang giải thích trực quan về SDD của CafeKit: spec, develop, verify, sync.", "sdd specification driven development visual guide"),
      installation: page("Cài đặt", "Cài, nâng cấp, và kiểm tra runtime bundle của CafeKit.", "cai dat npx upgrade package"),
      quickstart: page("Bắt đầu nhanh", "Chạy workflow spec-driven đầu tiên từ ý tưởng đến review.", "quickstart workflow dau tien"),
      tutorial: page("Hướng dẫn từ đầu", "Lộ trình từng bước từ chưa cài gì đến feature đầu tiên đã verify.", "huong dan tutorial bat dau nguoi moi tu dau walkthrough"),
      coreWorkflow: page("Workflow chính", "Hiểu luồng CafeKit chính từ ý tưởng đến thay đổi đã verify.", "workflow chinh core specs develop test review"),
      runtime: page("Runtime bundle", "Hiểu file cài vào repo, hooks, state, và safety gates.", "runtime hooks settings statusline"),
      specLifecycle: page("Vòng đời spec", "Hiểu SDD của CafeKit: scope lock, evidence, requirements, design, task packets, validation, và develop handoff.", "sdd spec json task registry lifecycle specification driven development"),
      workflows: page("Workflows", "Chọn đúng command: brainstorm, specs, develop, debug, hotfix, test, review, sync, docs, graph, git.", "commands workflows brainstorm debug hotfix"),
      skills: page("Skills", "Xem các workflow/domain skill của CafeKit và flow chi tiết cho skill chính.", "skills catalog main skill flows"),
      skillQuestion: page("Ask", "Trả lời câu hỏi về project và kỹ thuật bằng source evidence trước, rồi dùng nguồn ngoài hiện tại khi cần.", "question ask answer source evidence consultation"),
      skillBrainstorm: page("Brainstorm", "Làm rõ ý tưởng trước khi có spec.", "brainstorm ideation scout"),
      skillSpecs: page("Specs", "Tạo requirements, research, design, task packets, và validation state.", "specs requirements design tasks"),
      skillDevelop: page("Develop", "Implement approved task packets với scope fidelity.", "develop implementation task"),
      skillTest: page("Test", "Verify implementation bằng command thật và evidence.", "test verification evidence"),
      skillCodeReview: page("Code Review", "Review changes cho spec compliance, security, và regressions.", "code review security regression"),
      skillSync: page("Sync", "Update task status, task_registry, task markdown, phase, và audit drift.", "sync state task registry audit phase"),
      skillDebug: page("Debug", "Diagnose failures trước khi sửa product code.", "debug root cause"),
      skillHotfix: page("Hotfix", "Apply fix hẹp, có evidence sau diagnosis.", "hotfix repair bug"),
      skillDocs: page("Docs", "Create, update, summarize, hoặc reconstruct docs từ source.", "docs reconstruct update"),
      skillInspect: page("Scout", "Discover relevant files, entrypoints, call paths, và blast radius.", "scout inspect discovery"),
      skillGit: page("Git", "Commit, push, PR, finish, và worktree operations có safety checks.", "git commit push pr"),
      agents: page("Agents", "Hiểu từng agent đóng gói và vai trò trong workflow.", "agents subagents roles"),
      platforms: page("Platforms", "Support Claude Code và OpenCode, kèm ghi chú platform tương lai.", "claude opencode platforms"),
      platformsClaude: page("Claude Code", "Runtime `.claude/` native với hooks, agents, skills, commands.", "claude code hooks agents skills"),
      platformsOpencode: page("OpenCode", "Runtime `.opencode/` self-contained với TypeScript plugins và AGENTS.md.", "opencode plugins agents skills"),
      reference: page("Tham khảo", "Bảng command, cấu trúc file, package facts, và state values.", "reference commands files"),
      faq: page("FAQ", "Câu trả lời cho các câu hỏi runtime và workflow thường gặp.", "faq cau hoi"),
    },
  },
  ja: {
    mainNav: { docs: "Docs", quickstart: "Quickstart", reference: "Reference" },
    sections: { tutorials: "Tutorials", start: "はじめに", runtime: "Runtime", catalog: "Catalog", reference: "Reference" },
    pages: {
      overview: page("概要", "CafeKit の役割、対象ユーザー、読む順番を説明します。", "overview cafekit"),
      specDriven: page("Spec-driven development", "CafeKit SDD: spec、develop、verify、sync の visual guide。", "sdd specification driven development visual guide"),
      installation: page("インストール", "CafeKit runtime bundle の導入、更新、確認方法。", "install npx upgrade package"),
      quickstart: page("クイックスタート", "アイデアから review までの最初の spec-driven workflow。", "quickstart workflow"),
      tutorial: page("チュートリアル（ゼロから）", "未インストールから最初の verified feature までのステップ式ガイド。", "tutorial getting started beginner from zero walkthrough"),
      coreWorkflow: page("Core workflow", "idea から verified change までの CafeKit の主ルートを理解します。", "core workflow specs develop test review"),
      runtime: page("Runtime bundle", "インストールされるファイル、hooks、state、安全ゲートを理解します。", "runtime hooks settings statusline"),
      specLifecycle: page("Spec lifecycle", "CafeKit SDD: scope lock, evidence, requirements, design, task packets, validation, develop handoff。", "sdd spec json task registry lifecycle specification driven development"),
      workflows: page("Workflows", "brainstorm、specs、develop、debug、hotfix、test、review、sync、docs、graph、git の使い分け。", "commands workflows brainstorm debug hotfix"),
      skills: page("Skills", "CafeKit workflow/domain skills と main skill flows。", "skills catalog main skill flows"),
      skillQuestion: page("Ask", "Project と technical questions に repo-first evidence で答え、必要に応じて current external sources を使います。", "question ask answer source evidence consultation"),
      skillBrainstorm: page("Brainstorm", "Spec 前に曖昧な idea を明確にします。", "brainstorm ideation scout"),
      skillSpecs: page("Specs", "requirements、research、design、task packets、validation state を作ります。", "specs requirements design tasks"),
      skillDevelop: page("Develop", "approved task packets を scope fidelity で実装します。", "develop implementation task"),
      skillTest: page("Test", "real commands と evidence で implementation を verify します。", "test verification evidence"),
      skillCodeReview: page("Code Review", "spec compliance、security、regressions を review します。", "code review security regression"),
      skillSync: page("Sync", "task status、task_registry、task markdown、phase、drift audit を扱います。", "sync state task registry audit phase"),
      skillDebug: page("Debug", "product code 変更前に failures を diagnose します。", "debug root cause"),
      skillHotfix: page("Hotfix", "diagnosis 後に narrow evidence-backed fix を適用します。", "hotfix repair bug"),
      skillDocs: page("Docs", "source から docs を create、update、summarize、reconstruct します。", "docs reconstruct update"),
      skillInspect: page("Scout", "relevant files、entrypoints、call paths、blast radius を discover します。", "scout inspect discovery"),
      skillGit: page("Git", "safety checks 付きで commit、push、PR、finish、worktree operations を行います。", "git commit push pr"),
      agents: page("Agents", "同梱 agent と workflow 内の役割。", "agents subagents roles"),
      platforms: page("Platforms", "Claude Code と OpenCode support、今後の platform 方針。", "claude opencode platforms"),
      platformsClaude: page("Claude Code", "Hooks、agents、skills、commands を持つ native `.claude/` runtime。", "claude code hooks agents skills"),
      platformsOpencode: page("OpenCode", "TypeScript plugins と AGENTS.md を持つ self-contained `.opencode/` runtime。", "opencode plugins agents skills"),
      reference: page("Reference", "command、file structure、package facts、state values の早見表。", "reference commands files"),
      faq: page("FAQ", "runtime と workflow に関するよくある質問。", "faq questions"),
    },
  },
};

function page(title: string, description: string, keywords: string) {
  return { title, description, keywords };
}

function normalizeLocale(locale: string): Locale {
  return locale === "vi" || locale === "ja" ? locale : "en";
}

function buildSidebar(locale: Locale): DocsNavSection[] {
  const localeLabels = labels[locale];

  return Object.entries(routes).map(([sectionKey, items]) => ({
    title: localeLabels.sections[sectionKey as keyof typeof routes],
    items: items.map((item) => buildNavItem(localeLabels, locale, item)),
  }));
}

function buildNavItem(localeLabels: DocsLabels, locale: Locale, [pageKey, href, children]: RouteItem): DocsNavItem {
  return {
    ...localeLabels.pages[pageKey],
    href: localizeHref(locale, href),
    ...(children ? { children: children.map((item) => buildNavItem(localeLabels, locale, item)) } : {}),
  };
}

export function flattenDocsNavItems(items: DocsNavItem[]): DocsNavItem[] {
  return items.flatMap(({ children, ...item }) => [item, ...(children ? flattenDocsNavItems(children) : [])]);
}

export function getDocsConfig(locale: string) {
  const normalized = normalizeLocale(locale);
  const localeLabels = labels[normalized];

  return {
    mainNav: [
      { title: localeLabels.mainNav.docs, href: localizeHref(normalized, "/docs") },
      { title: localeLabels.mainNav.quickstart, href: localizeHref(normalized, "/docs/quickstart") },
      { title: localeLabels.mainNav.reference, href: localizeHref(normalized, "/docs/reference") },
    ],
    sidebarNav: buildSidebar(normalized),
  };
}

export function getDocsSearchGroups(locale: string): DocsNavSection[] {
  return getDocsConfig(locale).sidebarNav.map((section) => ({
    ...section,
    items: flattenDocsNavItems(section.items),
  }));
}
