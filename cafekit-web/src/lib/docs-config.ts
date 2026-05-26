import { type Locale, localizeHref } from "@/lib/locale-utils";

export type DocsNavItem = {
  title: string;
  href: string;
  description: string;
  keywords: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

type DocsLabels = {
  mainNav: Record<"docs" | "quickstart" | "reference", string>;
  sections: Record<"start" | "runtime" | "catalog" | "reference", string>;
  pages: Record<string, Omit<DocsNavItem, "href">>;
};

const routes = {
  start: [
    ["overview", "/docs"],
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
    ["skills", "/docs/skills"],
    ["agents", "/docs/agents"],
    ["platforms", "/docs/platforms"],
  ],
  reference: [
    ["reference", "/docs/reference"],
    ["faq", "/docs/faq"],
  ],
} as const;

const labels: Record<Locale, DocsLabels> = {
  en: {
    mainNav: { docs: "Docs", quickstart: "Quickstart", reference: "Reference" },
    sections: { start: "Start here", runtime: "Runtime model", catalog: "Catalog", reference: "Reference" },
    pages: {
      overview: page("Overview", "What CafeKit is, who it is for, and how the docs are organized.", "overview what is cafekit"),
      installation: page("Installation", "Install, upgrade, and verify the CafeKit runtime bundle.", "install npx upgrade package"),
      quickstart: page("Quickstart", "Run the first spec-driven workflow from idea to review.", "quickstart first workflow"),
      coreWorkflow: page("Core workflow", "Understand the main CafeKit path from idea to verified change.", "core workflow main workflow specs develop test review"),
      runtime: page("Runtime bundle", "Understand installed files, hooks, state, and safety gates.", "runtime hooks settings statusline"),
      specLifecycle: page("Spec lifecycle", "Follow a feature from brainstorm to validated task packets.", "spec json task registry lifecycle"),
      workflows: page("Workflows", "Choose the right command: brainstorm, specs, develop, debug, hotfix, test, review, sync, docs, graph, git.", "commands workflows brainstorm debug hotfix"),
      skills: page("Skills", "Browse every packaged CafeKit skill and when to use it.", "skills catalog"),
      agents: page("Agents", "Understand each packaged agent and where it fits in the workflow.", "agents subagents roles"),
      platforms: page("Platforms", "Claude Code and OpenCode support, with future platform notes.", "claude opencode platforms"),
      reference: page("Reference", "Command cheatsheet, file structure, package facts, and state values.", "reference commands files"),
      faq: page("FAQ", "Answers to common workflow and runtime questions.", "faq questions"),
    },
  },
  vi: {
    mainNav: { docs: "Tài liệu", quickstart: "Bắt đầu nhanh", reference: "Tham khảo" },
    sections: { start: "Bắt đầu", runtime: "Runtime", catalog: "Catalog", reference: "Tham khảo" },
    pages: {
      overview: page("Tổng quan", "CafeKit là gì, dành cho ai, và nên đọc docs theo thứ tự nào.", "tong quan cafekit"),
      installation: page("Cài đặt", "Cài, nâng cấp, và kiểm tra runtime bundle của CafeKit.", "cai dat npx upgrade package"),
      quickstart: page("Bắt đầu nhanh", "Chạy workflow spec-driven đầu tiên từ ý tưởng đến review.", "quickstart workflow dau tien"),
      coreWorkflow: page("Workflow chính", "Hiểu luồng CafeKit chính từ ý tưởng đến thay đổi đã verify.", "workflow chinh core specs develop test review"),
      runtime: page("Runtime bundle", "Hiểu file cài vào repo, hooks, state, và safety gates.", "runtime hooks settings statusline"),
      specLifecycle: page("Vòng đời spec", "Theo dõi feature từ brainstorm đến task packet đã validate.", "spec json task registry lifecycle"),
      workflows: page("Workflows", "Chọn đúng command: brainstorm, specs, develop, debug, hotfix, test, review, sync, docs, graph, git.", "commands workflows brainstorm debug hotfix"),
      skills: page("Skills", "Xem toàn bộ skill CafeKit đóng gói và lúc nên dùng.", "skills catalog"),
      agents: page("Agents", "Hiểu từng agent đóng gói và vai trò trong workflow.", "agents subagents roles"),
      platforms: page("Platforms", "Support Claude Code và OpenCode, kèm ghi chú platform tương lai.", "claude opencode platforms"),
      reference: page("Tham khảo", "Bảng command, cấu trúc file, package facts, và state values.", "reference commands files"),
      faq: page("FAQ", "Câu trả lời cho các câu hỏi runtime và workflow thường gặp.", "faq cau hoi"),
    },
  },
  ja: {
    mainNav: { docs: "Docs", quickstart: "Quickstart", reference: "Reference" },
    sections: { start: "はじめに", runtime: "Runtime", catalog: "Catalog", reference: "Reference" },
    pages: {
      overview: page("概要", "CafeKit の役割、対象ユーザー、読む順番を説明します。", "overview cafekit"),
      installation: page("インストール", "CafeKit runtime bundle の導入、更新、確認方法。", "install npx upgrade package"),
      quickstart: page("クイックスタート", "アイデアから review までの最初の spec-driven workflow。", "quickstart workflow"),
      coreWorkflow: page("Core workflow", "idea から verified change までの CafeKit の主ルートを理解します。", "core workflow specs develop test review"),
      runtime: page("Runtime bundle", "インストールされるファイル、hooks、state、安全ゲートを理解します。", "runtime hooks settings statusline"),
      specLifecycle: page("Spec lifecycle", "brainstorm から validated task packet までの流れ。", "spec json task registry lifecycle"),
      workflows: page("Workflows", "brainstorm、specs、develop、debug、hotfix、test、review、sync、docs、graph、git の使い分け。", "commands workflows brainstorm debug hotfix"),
      skills: page("Skills", "同梱される CafeKit skill と使いどころ。", "skills catalog"),
      agents: page("Agents", "同梱 agent と workflow 内の役割。", "agents subagents roles"),
      platforms: page("Platforms", "Claude Code と OpenCode support、今後の platform 方針。", "claude opencode platforms"),
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
    items: items.map(([pageKey, href]) => ({
      ...localeLabels.pages[pageKey],
      href: localizeHref(locale, href),
    })),
  }));
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
  return getDocsConfig(locale).sidebarNav;
}
