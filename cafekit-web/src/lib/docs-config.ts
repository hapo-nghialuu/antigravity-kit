type DocsConfig = {
  mainNav: {
    title: string;
    href: string;
  }[];
  sidebarNav: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  }[];
};

const mainNav = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Quickstart",
    href: "/docs/getting-started/quickstart",
  },
  {
    title: "Reference",
    href: "/docs/reference",
  },
];

const hrefGroups = {
  gettingStarted: [
    { href: "/docs", key: "introduction" },
    { href: "/docs/getting-started/installation", key: "installation" },
    { href: "/docs/getting-started/quickstart", key: "quickstart" },
  ],
  coreConcepts: [
    { href: "/docs/core-concepts", key: "overview" },
    { href: "/docs/core-concepts/spec-lifecycle", key: "specLifecycle" },
    { href: "/docs/core-concepts/task-registry", key: "taskRegistry" },
  ],
  workflows: [
    { href: "/docs/workflows/specs", key: "/hapo:specs" },
    { href: "/docs/workflows/develop", key: "/hapo:develop" },
    { href: "/docs/workflows/test-review", key: "/hapo:test + /hapo:code-review" },
    { href: "/docs/workflows/sync", key: "/hapo:sync" },
    { href: "/docs/workflows/generate-graph", key: "/hapo:generate-graph" },
  ],
  docsWorkflow: [
    { href: "/docs/docs-workflow", key: "overview" },
    { href: "/docs/docs-workflow/init", key: "/docs init" },
    { href: "/docs/docs-workflow/update", key: "/docs update" },
  ],
  platforms: [
    { href: "/docs/platforms", key: "overview" },
    { href: "/docs/platforms/claude", key: "claudeCode" },
    { href: "/docs/platforms/antigravity", key: "antigravityComingSoon" },
    { href: "/docs/platforms/cursor", key: "cursorComingSoon" },
  ],
  reference: [
    { href: "/docs/reference", key: "overview" },
    { href: "/docs/reference/file-structure", key: "fileStructure" },
    { href: "/docs/reference/commands", key: "commandCheatsheet" },
    { href: "/docs/faq", key: "faq" },
  ],
} as const;

const labels = {
  en: {
    sectionTitles: {
      gettingStarted: "Getting Started",
      coreConcepts: "Core Concepts",
      workflows: "Workflows",
      docsWorkflow: "Docs Workflow",
      platforms: "Platforms",
      reference: "Reference",
    },
    itemTitles: {
      introduction: "Introduction",
      installation: "Installation",
      quickstart: "Quickstart",
      overview: "Overview",
      specLifecycle: "Spec Lifecycle",
      taskRegistry: "Task Registry",
      claudeCode: "Claude Code",
      antigravityComingSoon: "Antigravity (Coming Soon)",
      cursorComingSoon: "Cursor (Coming Soon)",
      fileStructure: "File Structure",
      commandCheatsheet: "Command Cheatsheet",
      faq: "FAQ",
    },
  },
  vi: {
    sectionTitles: {
      gettingStarted: "Bắt đầu",
      coreConcepts: "Khái niệm cốt lõi",
      workflows: "Workflows",
      docsWorkflow: "Docs Workflow",
      platforms: "Nền tảng",
      reference: "Tham khảo",
    },
    itemTitles: {
      introduction: "Giới thiệu",
      installation: "Cài đặt",
      quickstart: "Bắt đầu nhanh",
      overview: "Tổng quan",
      specLifecycle: "Vòng đời spec",
      taskRegistry: "Task registry",
      claudeCode: "Claude Code",
      antigravityComingSoon: "Antigravity (Sắp có)",
      cursorComingSoon: "Cursor (Sắp có)",
      fileStructure: "Cấu trúc file",
      commandCheatsheet: "Bảng lệnh",
      faq: "FAQ",
    },
  },
  ja: {
    sectionTitles: {
      gettingStarted: "はじめに",
      coreConcepts: "コアコンセプト",
      workflows: "ワークフロー",
      docsWorkflow: "Docs Workflow",
      platforms: "プラットフォーム",
      reference: "リファレンス",
    },
    itemTitles: {
      introduction: "はじめに",
      installation: "インストール",
      quickstart: "クイックスタート",
      overview: "概要",
      specLifecycle: "Spec ライフサイクル",
      taskRegistry: "Task registry",
      claudeCode: "Claude Code",
      antigravityComingSoon: "Antigravity (Coming Soon)",
      cursorComingSoon: "Cursor (Coming Soon)",
      fileStructure: "ファイル構成",
      commandCheatsheet: "コマンド早見表",
      faq: "FAQ",
    },
  },
} as const;

function buildSidebar(locale: keyof typeof labels) {
  const localeLabels = labels[locale] ?? labels.en;

  const makeItems = (group: keyof typeof hrefGroups) =>
    hrefGroups[group].map((item) => ({
      title: localeLabels.itemTitles[item.key as keyof typeof localeLabels.itemTitles] ?? item.key,
      href: item.href,
    }));

  return [
    {
      title: localeLabels.sectionTitles.gettingStarted,
      items: makeItems("gettingStarted"),
    },
    {
      title: localeLabels.sectionTitles.coreConcepts,
      items: makeItems("coreConcepts"),
    },
    {
      title: localeLabels.sectionTitles.workflows,
      items: makeItems("workflows"),
    },
    {
      title: localeLabels.sectionTitles.docsWorkflow,
      items: makeItems("docsWorkflow"),
    },
    {
      title: localeLabels.sectionTitles.platforms,
      items: makeItems("platforms"),
    },
    {
      title: localeLabels.sectionTitles.reference,
      items: makeItems("reference"),
    },
  ];
}

export const docsConfig = {
  mainNav,
  sidebarNav: buildSidebar("en"),
};

export function getDocsConfig(locale: string): DocsConfig {
  const normalized = locale === "vi" || locale === "ja" ? locale : "en";

  return {
    mainNav,
    sidebarNav: buildSidebar(normalized),
  };
}
