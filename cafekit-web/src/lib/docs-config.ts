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
        title: "Guides",
        items: [
            {
                title: "Spec Workflow",
                href: "/docs/guides/spec-workflow",
            },
            {
                title: "Contributing",
                href: "/docs/guides/contributing",
            },
        ],
    },
    {
        title: "Reference",
        items: [
            {
                title: "FAQ",
                href: "/docs/faq",
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
];

const sidebarNavVi = [
    {
        title: "Bắt Đầu",
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
        title: "Hướng Dẫn",
        items: [
            {
                title: "Quy trình Spec",
                href: "/docs/guides/spec-workflow",
            },
            {
                title: "Đóng góp",
                href: "/docs/guides/contributing",
            },
        ],
    },
    {
        title: "Tham Khảo",
        items: [
            {
                title: "Câu hỏi thường gặp",
                href: "/docs/faq",
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
                title: "Xác thực người dùng",
                href: "/docs/examples/user-authentication",
            },
            {
                title: "Todo App API",
                href: "/docs/examples/todo-app",
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
