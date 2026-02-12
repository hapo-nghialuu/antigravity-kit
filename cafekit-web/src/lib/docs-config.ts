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
        title: "Examples",
        href: "/docs/examples",
    },
];

const sidebarNavEn = [
    {
        title: "Getting Started",
        items: [
            {
                title: "Introduction",
                href: "/docs",
            },
            {
                title: "Installation",
                href: "/docs/getting-started/installation",
            },
            {
                title: "Quick Start",
                href: "/docs/getting-started/quickstart",
            },
        ],
    },
    {
        title: "Documentation Workflows",
        items: [
            {
                title: "Overview",
                href: "/docs/docs-workflow",
            },
            {
                title: "/docs init",
                href: "/docs/docs-workflow/init",
            },
            {
                title: "/docs update",
                href: "/docs/docs-workflow/update",
            },
        ],
    },
    {
        title: "Spec Workflows",
        items: [
            {
                title: "Overview",
                href: "/docs/spec",
            },
            {
                title: "/spec-init",
                href: "/docs/spec/init",
            },
            {
                title: "/spec-requirements",
                href: "/docs/spec/requirements",
            },
            {
                title: "/spec-design",
                href: "/docs/spec/design",
            },
            {
                title: "/spec-tasks",
                href: "/docs/spec/tasks",
            },
            {
                title: "/spec-impl",
                href: "/docs/spec/impl",
            },
            {
                title: "/spec-status",
                href: "/docs/spec/status",
            },
        ],
    },
    {
        title: "Platform Guides",
        items: [
            {
                title: "Platform Guides",
                href: "/docs/platforms",
            },
            {
                title: "Claude Code",
                href: "/docs/platforms/claude",
            },
            {
                title: "Antigravity",
                href: "/docs/platforms/antigravity",
            },
        ],
    },
    {
        title: "Examples",
        items: [
            {
                title: "Overview",
                href: "/docs/examples",
            },
            {
                title: "User Authentication",
                href: "/docs/examples/user-authentication",
            },
            {
                title: "Todo App API",
                href: "/docs/examples/todo-app",
            },
        ],
    },
    {
        title: "Reference",
        items: [
            {
                title: "Reference",
                href: "/docs/reference",
            },
            {
                title: "File Structure",
                href: "/docs/reference/file-structure",
            },
            {
                title: "FAQ",
                href: "/docs/faq",
            },
        ],
    },
];

const sidebarNavVi = [
    {
        title: "Bắt đầu",
        items: [
            {
                title: "Giới thiệu",
                href: "/docs",
            },
            {
                title: "Cài đặt",
                href: "/docs/getting-started/installation",
            },
            {
                title: "Bắt đầu nhanh",
                href: "/docs/getting-started/quickstart",
            },
        ],
    },
    {
        title: "Documentation Workflows",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/docs-workflow",
            },
            {
                title: "/docs init",
                href: "/docs/docs-workflow/init",
            },
            {
                title: "/docs update",
                href: "/docs/docs-workflow/update",
            },
        ],
    },
    {
        title: "Spec Workflows",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/spec",
            },
            {
                title: "/spec-init",
                href: "/docs/spec/init",
            },
            {
                title: "/spec-requirements",
                href: "/docs/spec/requirements",
            },
            {
                title: "/spec-design",
                href: "/docs/spec/design",
            },
            {
                title: "/spec-tasks",
                href: "/docs/spec/tasks",
            },
            {
                title: "/spec-impl",
                href: "/docs/spec/impl",
            },
            {
                title: "/spec-status",
                href: "/docs/spec/status",
            },
        ],
    },
    {
        title: "Platform Guides",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/docs-workflow",
            },
            {
                title: "/docs init",
                href: "/docs/docs-workflow/init",
            },
            {
                title: "/docs update",
                href: "/docs/docs-workflow/update",
            },
        ],
    },
    {
        title: "Platform Guides",
        items: [
            {
                title: "Hướng dẫn Nền tảng",
                href: "/docs/platforms",
            },
            {
                title: "Claude Code",
                href: "/docs/platforms/claude",
            },
            {
                title: "Antigravity",
                href: "/docs/platforms/antigravity",
            },
        ],
    },
    {
        title: "Ví Dụ",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/examples",
            },
            {
                title: "Xác thực ngườì dùng",
                href: "/docs/examples/user-authentication",
            },
            {
                title: "Todo App API",
                href: "/docs/examples/todo-app",
            },
        ],
    },
    {
        title: "Tham Khảo",
        items: [
            {
                title: "Tham khảo",
                href: "/docs/reference",
            },
            {
                title: "Cấu trúc File",
                href: "/docs/reference/file-structure",
            },
            {
                title: "Câu hỏi thường gặp",
                href: "/docs/faq",
            },
        ],
    },
];

export const docsConfig = {
    mainNav,
    sidebarNav: sidebarNavVi, // Default to VI
};

export function getDocsConfig(locale: string): DocsConfig {
    return {
        mainNav,
        sidebarNav: locale === 'vi' ? sidebarNavVi : sidebarNavEn,
    };
}
