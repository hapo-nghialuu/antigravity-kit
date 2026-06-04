import type { Locale } from "@/lib/locale-utils";

type SiteShellTranslations = {
  header: {
    workflow: string;
    whyItWorks: string;
    artifacts: string;
    quickstart: string;
    github: string;
    tryQuickstart: string;
  };
  footer: {
    description: string;
    readDocs: string;
    github: string;
    product: string;
    workflows: string;
    resources: string;
    documentation: string;
    installation: string;
    quickstart: string;
    commandReference: string;
    specs: string;
    coreWorkflow: string;
    develop: string;
    testReview: string;
    claudeCode: string;
    releases: string;
    issues: string;
    faq: string;
    copyright: string;
  };
};

const translations: Record<Locale, SiteShellTranslations> = {
  en: {
    header: {
      workflow: "Workflow",
      whyItWorks: "Differentiators",
      artifacts: "Artifacts",
      quickstart: "Quickstart",
      github: "GitHub",
      tryQuickstart: "Quickstart",
    },
    footer: {
      description:
        "Spec-driven runtime for AI coding agents. Install it into your repo, create spec artifacts, implement task packets with Evidence, then test/review before release handoff.",
      readDocs: "Read docs",
      github: "GitHub",
      product: "Product",
      workflows: "Workflows",
      resources: "Resources",
      documentation: "Documentation",
      installation: "Installation",
      quickstart: "Quickstart",
      commandReference: "Command Reference",
      coreWorkflow: "Core workflow",
      specs: "/hapo:specs",
      develop: "/hapo:develop",
      testReview: "/hapo:test + /hapo:code-review",
      claudeCode: "Claude Code",
      releases: "Releases",
      issues: "Issues",
      faq: "FAQ",
      copyright: "Built for real repos, not demo prompts.",
    },
  },
  vi: {
    header: {
      workflow: "Quy trình",
      whyItWorks: "Điểm khác biệt",
      artifacts: "Kết quả",
      quickstart: "Bắt đầu nhanh",
      github: "GitHub",
      tryQuickstart: "Bắt đầu nhanh",
    },
    footer: {
      description:
        "Runtime spec-driven cho AI coding agents. Cài vào repo, tạo spec artifacts, triển khai từng task packet có Evidence, rồi test/review trước khi release handoff.",
      readDocs: "Đọc tài liệu",
      github: "GitHub",
      product: "Sản phẩm",
      workflows: "Quy trình",
      resources: "Tài nguyên",
      documentation: "Tài liệu",
      installation: "Cài đặt",
      quickstart: "Bắt đầu nhanh",
      commandReference: "Tham chiếu lệnh",
      coreWorkflow: "Quy trình chính",
      specs: "/hapo:specs",
      develop: "/hapo:develop",
      testReview: "/hapo:test + /hapo:code-review",
      claudeCode: "Claude Code",
      releases: "Releases",
      issues: "Issues",
      faq: "FAQ",
      copyright: "Dành cho repo thật, không phải prompt demo.",
    },
  },
  ja: {
    header: {
      workflow: "ワークフロー",
      whyItWorks: "差別化ポイント",
      artifacts: "Artifacts",
      quickstart: "クイックスタート",
      github: "GitHub",
      tryQuickstart: "クイックスタート",
    },
    footer: {
      description:
        "AI coding agents 向けの spec-driven runtime。repo に導入し、spec artifacts を作り、Evidence 付きの task packet を実装し、release handoff 前に test/review します。",
      readDocs: "ドキュメントを読む",
      github: "GitHub",
      product: "プロダクト",
      workflows: "ワークフロー",
      resources: "リソース",
      documentation: "ドキュメント",
      installation: "インストール",
      quickstart: "クイックスタート",
      commandReference: "コマンドリファレンス",
      coreWorkflow: "メインワークフロー",
      specs: "/hapo:specs",
      develop: "/hapo:develop",
      testReview: "/hapo:test + /hapo:code-review",
      claudeCode: "Claude Code",
      releases: "Releases",
      issues: "Issues",
      faq: "FAQ",
      copyright: "demo prompt ではなく実際の repo 向けに作られています。",
    },
  },
};

export function getSiteShellTranslations(locale: Locale): SiteShellTranslations {
  return translations[locale] ?? translations.en;
}
