(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cafekit-web/src/lib/docs-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "docsConfig",
    ()=>docsConfig,
    "getDocsConfig",
    ()=>getDocsConfig
]);
const mainNav = [
    {
        title: "Documentation",
        href: "/docs"
    },
    {
        title: "Examples",
        href: "/docs/examples"
    }
];
const sidebarNavEn = [
    {
        title: "Getting Started",
        items: [
            {
                title: "Introduction",
                href: "/docs"
            },
            {
                title: "Installation",
                href: "/docs/getting-started/installation"
            },
            {
                title: "Quick Start",
                href: "/docs/getting-started/quickstart"
            }
        ]
    },
    {
        title: "Spec Workflows",
        items: [
            {
                title: "Overview",
                href: "/docs/spec"
            },
            {
                title: "/spec-init",
                href: "/docs/spec/init"
            },
            {
                title: "/spec-requirements",
                href: "/docs/spec/requirements"
            },
            {
                title: "/spec-design",
                href: "/docs/spec/design"
            },
            {
                title: "/spec-tasks",
                href: "/docs/spec/tasks"
            },
            {
                title: "/spec-impl",
                href: "/docs/spec/impl"
            },
            {
                title: "/spec-status",
                href: "/docs/spec/status"
            }
        ]
    },
    {
        title: "Documentation Workflows",
        items: [
            {
                title: "Overview",
                href: "/docs/docs-workflow"
            },
            {
                title: "/docs init",
                href: "/docs/docs-workflow/init"
            },
            {
                title: "/docs update",
                href: "/docs/docs-workflow/update"
            }
        ]
    },
    {
        title: "Platform Guides",
        items: [
            {
                title: "Claude Code",
                href: "/docs/platforms/claude"
            },
            {
                title: "Antigravity",
                href: "/docs/platforms/antigravity"
            }
        ]
    },
    {
        title: "Examples",
        items: [
            {
                title: "Overview",
                href: "/docs/examples"
            },
            {
                title: "User Authentication",
                href: "/docs/examples/user-authentication"
            },
            {
                title: "Todo App API",
                href: "/docs/examples/todo-app"
            }
        ]
    },
    {
        title: "Reference",
        items: [
            {
                title: "File Structure",
                href: "/docs/reference/file-structure"
            },
            {
                title: "FAQ",
                href: "/docs/faq"
            }
        ]
    }
];
const sidebarNavVi = [
    {
        title: "Bắt Đầu",
        items: [
            {
                title: "Giới thiệu",
                href: "/docs"
            },
            {
                title: "Cài đặt",
                href: "/docs/getting-started/installation"
            },
            {
                title: "Bắt đầu nhanh",
                href: "/docs/getting-started/quickstart"
            }
        ]
    },
    {
        title: "Spec Workflows",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/spec"
            },
            {
                title: "/spec-init",
                href: "/docs/spec/init"
            },
            {
                title: "/spec-requirements",
                href: "/docs/spec/requirements"
            },
            {
                title: "/spec-design",
                href: "/docs/spec/design"
            },
            {
                title: "/spec-tasks",
                href: "/docs/spec/tasks"
            },
            {
                title: "/spec-impl",
                href: "/docs/spec/impl"
            },
            {
                title: "/spec-status",
                href: "/docs/spec/status"
            }
        ]
    },
    {
        title: "Documentation Workflows",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/docs-workflow"
            },
            {
                title: "/docs init",
                href: "/docs/docs-workflow/init"
            },
            {
                title: "/docs update",
                href: "/docs/docs-workflow/update"
            }
        ]
    },
    {
        title: "Platform Guides",
        items: [
            {
                title: "Claude Code",
                href: "/docs/platforms/claude"
            },
            {
                title: "Antigravity",
                href: "/docs/platforms/antigravity"
            }
        ]
    },
    {
        title: "Ví Dụ",
        items: [
            {
                title: "Tổng quan",
                href: "/docs/examples"
            },
            {
                title: "Xác thực ngườì dùng",
                href: "/docs/examples/user-authentication"
            },
            {
                title: "Todo App API",
                href: "/docs/examples/todo-app"
            }
        ]
    },
    {
        title: "Tham Khảo",
        items: [
            {
                title: "Cấu trúc File",
                href: "/docs/reference/file-structure"
            },
            {
                title: "Câu hỏi thường gặp",
                href: "/docs/faq"
            }
        ]
    }
];
const docsConfig = {
    mainNav,
    sidebarNav: sidebarNavVi
};
function getDocsConfig(locale) {
    return {
        mainNav,
        sidebarNav: locale === 'vi' ? sidebarNavVi : sidebarNavEn
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/docs/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocsSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$docs$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/docs-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DocsSidebar({ locale = 'en' }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$docs$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocsConfig"])(locale);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "space-y-6",
        children: config.sidebarNav.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-2 px-2 text-sm font-semibold text-foreground tracking-tight flex items-center gap-1",
                        children: section.title
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
                        lineNumber: 17,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: section.items.map((item)=>{
                            const isActive = pathname === item.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex items-center justify-between rounded-md border border-transparent px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground", isActive ? "bg-primary/10 text-primary hover:bg-primary/15 border-l-primary" : "text-muted-foreground"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
                                        lineNumber: 34,
                                        columnNumber: 37
                                    }, this),
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "h-3 w-3 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
                                        lineNumber: 35,
                                        columnNumber: 50
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
                                lineNumber: 24,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 21
                    }, this)
                ]
            }, section.title, true, {
                fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
                lineNumber: 16,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/sidebar.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
_s(DocsSidebar, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = DocsSidebar;
var _c;
__turbopack_context__.k.register(_c, "DocsSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable react-hooks/set-state-in-effect */ 'use client';
;
;
;
const navSections = [
    {
        title: 'Getting Started',
        items: [
            {
                href: '/docs',
                label: 'Introduction'
            },
            {
                href: '/docs/installation',
                label: 'Installation'
            }
        ]
    },
    {
        title: 'Core Concepts',
        items: [
            {
                href: '/docs/agents',
                label: 'Agents'
            },
            {
                href: '/docs/skills',
                label: 'Skills'
            },
            {
                href: '/docs/workflows',
                label: 'Workflows'
            }
        ]
    },
    {
        title: 'CLI Reference',
        items: [
            {
                href: '/docs/cli',
                label: 'Commands & Options'
            }
        ]
    }
];
function MobileMenu() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Close menu when route changes (using layoutEffect to avoid visual flicker)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "MobileMenu.useLayoutEffect": ()=>{
            if (isOpen) {
                setIsOpen(false);
            }
        }
    }["MobileMenu.useLayoutEffect"], [
        pathname,
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "lg:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                "aria-label": "Toggle menu",
                children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                        lineNumber: 53,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                    lineNumber: 52,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 6h16M4 12h16M4 18h16"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                        lineNumber: 57,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                    lineNumber: 56,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden absolute left-0 right-0 top-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg animate-in slide-in-from-top-2 max-h-[calc(100vh-3.5rem)] overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 lg:px-8 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-6",
                        children: navSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50",
                                        children: section.title
                                    }, void 0, false, {
                                        fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                                        lineNumber: 70,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: section.items.map((item)=>{
                                            const isActive = pathname === item.href;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.href,
                                                className: `
                                                        block px-3 py-2 text-sm rounded-md transition-colors
                                                        ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium' : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800'}
                                                    `,
                                                children: item.label
                                            }, item.href, false, {
                                                fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                                                lineNumber: 77,
                                                columnNumber: 49
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                                        lineNumber: 73,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, section.title, true, {
                                fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                                lineNumber: 69,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                        lineNumber: 67,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                    lineNumber: 65,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/layout/header/components/mobile-menu.tsx",
                lineNumber: 64,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(MobileMenu, "OCZVupZgc+g+s14zeJFVcZ4hLA0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileMenu;
var _c;
__turbopack_context__.k.register(_c, "MobileMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$render$2f$useRender$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-render/useRender.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("[&_svg]:-mx-0.5 relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
    defaultVariants: {
        size: "default",
        variant: "default"
    },
    variants: {
        size: {
            default: "h-9 px-[calc(--spacing(3)-1px)] sm:h-8",
            icon: "size-9 sm:size-8",
            "icon-lg": "size-10 sm:size-9",
            "icon-sm": "size-8 sm:size-7",
            "icon-xl": "size-11 sm:size-10 [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
            "icon-xs": "size-7 rounded-md before:rounded-[calc(var(--radius-md)-1px)] sm:size-6 not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-4 sm:not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-10 px-[calc(--spacing(3.5)-1px)] sm:h-9",
            sm: "h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:h-7",
            xl: "h-11 px-[calc(--spacing(4)-1px)] text-lg sm:h-10 sm:text-base [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
            xs: "h-7 gap-1 rounded-md px-[calc(--spacing(2)-1px)] text-sm before:rounded-[calc(var(--radius-md)-1px)] sm:h-6 sm:text-xs [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5"
        },
        variant: {
            default: "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-primary bg-primary text-primary-foreground shadow-primary/24 shadow-xs [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none [:hover,[data-pressed]]:bg-primary/90",
            destructive: "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-destructive bg-destructive text-white shadow-destructive/24 shadow-xs [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none [:hover,[data-pressed]]:bg-destructive/90",
            "destructive-outline": "border-input bg-transparent not-dark:bg-clip-padding text-destructive-foreground shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/6%)] dark:bg-input/32 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none [:hover,[data-pressed]]:border-destructive/32 [:hover,[data-pressed]]:bg-destructive/4",
            ghost: "border-transparent data-pressed:bg-accent [:hover,[data-pressed]]:bg-accent",
            link: "border-transparent underline-offset-4 [:hover,[data-pressed]]:underline",
            outline: "border-input bg-background not-dark:bg-clip-padding shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/6%)] dark:bg-input/32 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none [:hover,[data-pressed]]:bg-accent/50 dark:[:hover,[data-pressed]]:bg-input/64",
            secondary: "border-transparent bg-secondary text-secondary-foreground [:active,[data-pressed]]:bg-secondary/80 [:hover,[data-pressed]]:bg-secondary/90"
        }
    }
});
function Button({ className, variant, size, render, ...props }) {
    _s();
    const typeValue = render ? undefined : "button";
    const defaultProps = {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            className,
            size,
            variant
        })),
        "data-slot": "button",
        type: typeValue
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$render$2f$useRender$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])({
        defaultTagName: "button",
        props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(defaultProps, props),
        render
    });
}
_s(Button, "Yxn2JZFvED13KkqGsiyGOoQOkjM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$render$2f$useRender$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"]
    ];
});
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$input$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/input/Input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Input({ className, size = "default", unstyled = false, nativeInput = false, ...props }) {
    const inputClassName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8.5 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-8.5 outline-none placeholder:text-muted-foreground/72 sm:h-7.5 sm:leading-7.5", size === "sm" && "h-7.5 px-[calc(--spacing(2.5)-1px)] leading-7.5 sm:h-6.5 sm:leading-6.5", size === "lg" && "h-9.5 leading-9.5 sm:h-8.5 sm:leading-8.5", props.type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none", props.type === "file" && "text-muted-foreground file:me-3 file:bg-transparent file:font-medium file:text-foreground file:text-sm");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(!unstyled && "relative inline-flex w-full rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/6%)] has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none has-focus-visible:ring-[3px] sm:text-sm dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]", className) || undefined,
        "data-size": size,
        "data-slot": "input-control",
        children: nativeInput ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: inputClassName,
            "data-slot": "input",
            size: typeof size === "number" ? size : undefined,
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/input.tsx",
            lineNumber: 48,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$input$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            className: inputClassName,
            "data-slot": "input",
            size: typeof size === "number" ? size : undefined,
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/input.tsx",
            lineNumber: 55,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/input.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/index.parts.js [app-client] (ecmascript) <export * as ScrollArea>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ScrollArea({ className, children, scrollFade = false, scrollbarGutter = false, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Root, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("size-full min-h-0", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Viewport, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full rounded-[inherit] outline-none transition-shadows focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-has-overflow-x:overscroll-x-contain", scrollFade && "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))] [--fade-size:1.5rem]", scrollbarGutter && "data-has-overflow-y:pe-2.5 data-has-overflow-x:pb-2.5"),
                "data-slot": "scroll-area-viewport",
                children: children
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {
                orientation: "vertical"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {
                orientation: "horizontal"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Corner, {
                "data-slot": "scroll-area-corner"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ScrollArea;
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Scrollbar, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100", className),
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Thumb, {
            className: "relative flex-1 rounded-full bg-foreground/20",
            "data-slot": "scroll-area-thumb"
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/scroll-area.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/autocomplete.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Autocomplete",
    ()=>Autocomplete,
    "AutocompleteClear",
    ()=>AutocompleteClear,
    "AutocompleteCollection",
    ()=>AutocompleteCollection,
    "AutocompleteEmpty",
    ()=>AutocompleteEmpty,
    "AutocompleteGroup",
    ()=>AutocompleteGroup,
    "AutocompleteGroupLabel",
    ()=>AutocompleteGroupLabel,
    "AutocompleteInput",
    ()=>AutocompleteInput,
    "AutocompleteItem",
    ()=>AutocompleteItem,
    "AutocompleteList",
    ()=>AutocompleteList,
    "AutocompletePopup",
    ()=>AutocompletePopup,
    "AutocompleteRow",
    ()=>AutocompleteRow,
    "AutocompleteSeparator",
    ()=>AutocompleteSeparator,
    "AutocompleteStatus",
    ()=>AutocompleteStatus,
    "AutocompleteTrigger",
    ()=>AutocompleteTrigger,
    "AutocompleteValue",
    ()=>AutocompleteValue,
    "useAutocompleteFilter",
    ()=>useAutocompleteFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/index.parts.js [app-client] (ecmascript) <export * as Autocomplete>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDownIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-client] (ecmascript) <export default as ChevronsUpDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const Autocomplete = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Root;
function AutocompleteInput({ className, showTrigger = false, showClear = false, startAddon, size, ...props }) {
    const sizeValue = size ?? "default";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative not-has-[>*.w-full]:w-fit w-full has-disabled:opacity-64",
        children: [
            startAddon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: "[&_svg]:-mx-0.5 pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
                "data-slot": "autocomplete-start-addon",
                children: startAddon
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Input, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(startAddon && "data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=autocomplete-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(8)-1px)]", sizeValue === "sm" ? "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-6.5" : "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-7", className),
                "data-slot": "autocomplete-input",
                render: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    nativeInput: true,
                    size: sizeValue
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, void 0),
                ...props
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            showTrigger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AutocompleteTrigger, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", sizeValue === "sm" ? "end-0" : "end-0.5"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDownIcon$3e$__["ChevronsUpDownIcon"], {}, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            showClear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AutocompleteClear, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", sizeValue === "sm" ? "end-0" : "end-0.5"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                    lineNumber: 69,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = AutocompleteInput;
function AutocompletePopup({ className, children, sideOffset = 4, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Portal, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Positioner, {
            className: "z-50 select-none",
            "data-slot": "autocomplete-positioner",
            sideOffset: sideOffset,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex max-h-full origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/6%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Popup, {
                    className: "flex max-h-[min(var(--available-height),23rem)] w-(--anchor-width) max-w-(--available-width) flex-col",
                    "data-slot": "autocomplete-popup",
                    ...props,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                    lineNumber: 97,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c1 = AutocompletePopup;
function AutocompleteItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Item, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-8 cursor-default select-none items-center rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm", className),
        "data-slot": "autocomplete-item",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_c2 = AutocompleteItem;
function AutocompleteSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Separator, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mx-2 my-1 h-px bg-border last:hidden", className),
        "data-slot": "autocomplete-separator",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c3 = AutocompleteSeparator;
function AutocompleteGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Group, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[[role=group]+&]:mt-1.5", className),
        "data-slot": "autocomplete-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_c4 = AutocompleteGroup;
function AutocompleteGroupLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].GroupLabel, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 font-medium text-muted-foreground text-xs", className),
        "data-slot": "autocomplete-group-label",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_c5 = AutocompleteGroupLabel;
function AutocompleteEmpty({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Empty, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("not-empty:p-2 text-center text-base text-muted-foreground sm:text-sm", className),
        "data-slot": "autocomplete-empty",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_c6 = AutocompleteEmpty;
function AutocompleteRow({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Row, {
        className: className,
        "data-slot": "autocomplete-row",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
_c7 = AutocompleteRow;
function AutocompleteValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Value, {
        "data-slot": "autocomplete-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_c8 = AutocompleteValue;
function AutocompleteList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
        scrollbarGutter: true,
        scrollFade: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].List, {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3", className),
            "data-slot": "autocomplete-list",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
            lineNumber: 212,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
_c9 = AutocompleteList;
function AutocompleteClear({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Clear, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-translate-y-1/2 absolute end-0.5 top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-[color,background-color,box-shadow,opacity] pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        "data-slot": "autocomplete-clear",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
            lineNumber: 237,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
_c10 = AutocompleteClear;
function AutocompleteStatus({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Status, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0", className),
        "data-slot": "autocomplete-status",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_c11 = AutocompleteStatus;
function AutocompleteCollection({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Collection, {
        "data-slot": "autocomplete-collection",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 262,
        columnNumber: 5
    }, this);
}
_c12 = AutocompleteCollection;
function AutocompleteTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].Trigger, {
        className: className,
        "data-slot": "autocomplete-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/autocomplete.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_c13 = AutocompleteTrigger;
const useAutocompleteFilter = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Autocomplete$3e$__["Autocomplete"].useFilter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "AutocompleteInput");
__turbopack_context__.k.register(_c1, "AutocompletePopup");
__turbopack_context__.k.register(_c2, "AutocompleteItem");
__turbopack_context__.k.register(_c3, "AutocompleteSeparator");
__turbopack_context__.k.register(_c4, "AutocompleteGroup");
__turbopack_context__.k.register(_c5, "AutocompleteGroupLabel");
__turbopack_context__.k.register(_c6, "AutocompleteEmpty");
__turbopack_context__.k.register(_c7, "AutocompleteRow");
__turbopack_context__.k.register(_c8, "AutocompleteValue");
__turbopack_context__.k.register(_c9, "AutocompleteList");
__turbopack_context__.k.register(_c10, "AutocompleteClear");
__turbopack_context__.k.register(_c11, "AutocompleteStatus");
__turbopack_context__.k.register(_c12, "AutocompleteCollection");
__turbopack_context__.k.register(_c13, "AutocompleteTrigger");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/command.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Command",
    ()=>Command,
    "CommandCollection",
    ()=>CommandCollection,
    "CommandCreateHandle",
    ()=>CommandCreateHandle,
    "CommandDialog",
    ()=>CommandDialog,
    "CommandDialogPopup",
    ()=>CommandDialogPopup,
    "CommandDialogTrigger",
    ()=>CommandDialogTrigger,
    "CommandEmpty",
    ()=>CommandEmpty,
    "CommandFooter",
    ()=>CommandFooter,
    "CommandGroup",
    ()=>CommandGroup,
    "CommandGroupLabel",
    ()=>CommandGroupLabel,
    "CommandInput",
    ()=>CommandInput,
    "CommandItem",
    ()=>CommandItem,
    "CommandList",
    ()=>CommandList,
    "CommandPanel",
    ()=>CommandPanel,
    "CommandSeparator",
    ()=>CommandSeparator,
    "CommandShortcut",
    ()=>CommandShortcut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/index.parts.js [app-client] (ecmascript) <export * as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as SearchIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/autocomplete.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const CommandDialog = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Root;
const CommandDialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Portal;
const CommandCreateHandle = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].createHandle;
function CommandDialogTrigger(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Trigger, {
        "data-slot": "command-dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = CommandDialogTrigger;
function CommandDialogBackdrop({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Backdrop, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0", className),
        "data-slot": "command-dialog-backdrop",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = CommandDialogBackdrop;
function CommandDialogViewport({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Viewport, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]", className),
        "data-slot": "command-dialog-viewport",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = CommandDialogViewport;
function CommandDialogPopup({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommandDialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommandDialogBackdrop, {}, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommandDialogViewport, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Popup, {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-translate-y-[calc(1.25rem*var(--nested-dialogs))] relative row-start-2 flex max-h-105 min-h-0 w-full min-w-0 max-w-xl scale-[calc(1-0.1*var(--nested-dialogs))] flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-0.1*var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/6%)] data-nested:data-ending-style:translate-y-8 data-nested:data-starting-style:translate-y-8 data-nested-dialog-open:origin-top data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", className),
                    "data-slot": "command-dialog-popup",
                    ...props,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c3 = CommandDialogPopup;
function Command({ autoHighlight = "always", keepHighlight = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Autocomplete"], {
        autoHighlight: autoHighlight,
        inline: true,
        keepHighlight: keepHighlight,
        open: true,
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c4 = Command;
function CommandInput({ className, placeholder = undefined, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-2.5 py-1.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteInput"], {
            autoFocus: true,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0", className),
            placeholder: placeholder,
            size: "lg",
            startAddon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__["SearchIcon"], {}, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
                lineNumber: 121,
                columnNumber: 21
            }, void 0),
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_c5 = CommandInput;
function CommandList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteList"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("not-empty:scroll-py-2 not-empty:p-2", className),
        "data-slot": "command-list",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c6 = CommandList;
function CommandEmpty({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteEmpty"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("not-empty:py-6", className),
        "data-slot": "command-empty",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_c7 = CommandEmpty;
function CommandPanel({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "-mx-px not-has-[+[data-slot=command-footer]]:-mb-px relative min-h-0 rounded-t-xl not-has-[+[data-slot=command-footer]]:rounded-b-2xl border border-b-0 bg-popover not-dark:bg-clip-padding shadow-xs/5 [clip-path:inset(0_1px)] not-has-[+[data-slot=command-footer]]:[clip-path:inset(0_1px_1px_1px_round_0_0_calc(var(--radius-2xl)-1px)_calc(var(--radius-2xl)-1px))] before:pointer-events-none before:absolute before:inset-0 before:rounded-t-[calc(var(--radius-xl)-1px)] **:data-[slot=scroll-area-scrollbar]:mt-2 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_c8 = CommandPanel;
function CommandGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteGroup"], {
        className: className,
        "data-slot": "command-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_c9 = CommandGroup;
function CommandGroupLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteGroupLabel"], {
        className: className,
        "data-slot": "command-group-label",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_c10 = CommandGroupLabel;
function CommandCollection({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteCollection"], {
        "data-slot": "command-collection",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 192,
        columnNumber: 10
    }, this);
}
_c11 = CommandCollection;
function CommandItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteItem"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-1.5", className),
        "data-slot": "command-item",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_c12 = CommandItem;
function CommandSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$autocomplete$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteSeparator"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("my-2", className),
        "data-slot": "command-separator",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_c13 = CommandSeparator;
function CommandShortcut({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest", className),
        "data-slot": "command-shortcut",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_c14 = CommandShortcut;
function CommandFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between gap-2 rounded-b-[calc(var(--radius-2xl)-1px)] border-t px-5 py-3 text-muted-foreground text-xs", className),
        "data-slot": "command-footer",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/command.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_c15 = CommandFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15;
__turbopack_context__.k.register(_c, "CommandDialogTrigger");
__turbopack_context__.k.register(_c1, "CommandDialogBackdrop");
__turbopack_context__.k.register(_c2, "CommandDialogViewport");
__turbopack_context__.k.register(_c3, "CommandDialogPopup");
__turbopack_context__.k.register(_c4, "Command");
__turbopack_context__.k.register(_c5, "CommandInput");
__turbopack_context__.k.register(_c6, "CommandList");
__turbopack_context__.k.register(_c7, "CommandEmpty");
__turbopack_context__.k.register(_c8, "CommandPanel");
__turbopack_context__.k.register(_c9, "CommandGroup");
__turbopack_context__.k.register(_c10, "CommandGroupLabel");
__turbopack_context__.k.register(_c11, "CommandCollection");
__turbopack_context__.k.register(_c12, "CommandItem");
__turbopack_context__.k.register(_c13, "CommandSeparator");
__turbopack_context__.k.register(_c14, "CommandShortcut");
__turbopack_context__.k.register(_c15, "CommandFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/kbd.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Kbd",
    ()=>Kbd,
    "KbdGroup",
    ()=>KbdGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Kbd({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded bg-muted px-1 font-medium font-sans text-muted-foreground text-xs [&_svg:not([class*='size-'])]:size-3", className),
        "data-slot": "kbd",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/kbd.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Kbd;
function KbdGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1", className),
        "data-slot": "kbd-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/kbd.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = KbdGroup;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Kbd");
__turbopack_context__.k.register(_c1, "KbdGroup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$corner$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CornerDownLeftIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/corner-down-left.js [app-client] (ecmascript) <export default as CornerDownLeftIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileTextIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/kbd.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const searchGroups = [
    {
        value: 'Getting Started',
        items: [
            {
                label: 'Introduction',
                value: 'introduction',
                href: '/docs',
                keywords: 'getting started overview what is'
            },
            {
                label: 'Installation',
                value: 'installation',
                href: '/docs/installation',
                keywords: 'install setup init npm npx global cli'
            }
        ]
    },
    {
        value: 'Core Concepts',
        items: [
            {
                label: 'Agents',
                value: 'agents',
                href: '/docs/agents',
                keywords: 'specialist personas orchestrator planner security backend frontend'
            },
            {
                label: 'Skills',
                value: 'skills',
                href: '/docs/skills',
                keywords: 'knowledge modules react nextjs tailwind patterns testing'
            },
            {
                label: 'Workflows',
                value: 'workflows',
                href: '/docs/workflows',
                keywords: 'slash commands brainstorm create debug deploy enhance'
            }
        ]
    },
    {
        value: 'Reference',
        items: [
            {
                label: 'CLI Reference',
                value: 'cli',
                href: '/docs/cli',
                keywords: 'command line interface init update status options'
            }
        ]
    }
];
function SearchDialog() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    function handleItemClick(item) {
        router.push(item.href);
        setOpen(false);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchDialog.useEffect": ()=>{
            const down = {
                "SearchDialog.useEffect.down": (e)=>{
                    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        setOpen({
                            "SearchDialog.useEffect.down": (open)=>!open
                        }["SearchDialog.useEffect.down"]);
                    }
                }
            }["SearchDialog.useEffect.down"];
            document.addEventListener('keydown', down);
            return ({
                "SearchDialog.useEffect": ()=>document.removeEventListener('keydown', down)
            })["SearchDialog.useEffect"];
        }
    }["SearchDialog.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandDialog"], {
        onOpenChange: setOpen,
        open: open,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandDialogTrigger"], {
                className: "md:hidden",
                render: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "icon",
                    "aria-label": "Search"
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                    lineNumber: 118,
                    columnNumber: 21
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                        lineNumber: 126,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                    lineNumber: 125,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandDialogTrigger"], {
                className: "hidden md:flex bg-transparent",
                render: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    className: "w-full justify-start text-sm text-muted-foreground font-normal h-9"
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                    lineNumber: 134,
                    columnNumber: 21
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 mr-2 shrink-0",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        }, void 0, false, {
                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                            lineNumber: 141,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                        lineNumber: 140,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1 text-left",
                        children: "Search docs..."
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                        lineNumber: 143,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KbdGroup"], {
                        className: "hidden sm:inline-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                children: "⌘"
                            }, void 0, false, {
                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                lineNumber: 145,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                children: "K"
                            }, void 0, false, {
                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                lineNumber: 146,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                        lineNumber: 144,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandDialogPopup"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                    items: searchGroups,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                            placeholder: "Search documentation..."
                        }, void 0, false, {
                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                            lineNumber: 152,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandPanel"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center py-6 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-10 h-10 text-muted-foreground/30 mb-2",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                lineNumber: 156,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-foreground mb-1",
                                                children: "No results found"
                                            }, void 0, false, {
                                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                lineNumber: 159,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: "Try searching for something else"
                                            }, void 0, false, {
                                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                lineNumber: 160,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                        lineNumber: 155,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                    lineNumber: 154,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandList"], {
                                    children: (group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                    items: group.items,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroupLabel"], {
                                                            children: group.value
                                                        }, void 0, false, {
                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandCollection"], {
                                                            children: (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                                    onClick: ()=>handleItemClick(item),
                                                                    value: item.value + ' ' + (item.keywords || ''),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileTextIcon$3e$__["FileTextIcon"], {
                                                                            className: "mr-2 h-4 w-4 text-muted-foreground"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                                            lineNumber: 175,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex-1",
                                                                            children: item.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                                            lineNumber: 176,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: item.href
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                                            lineNumber: 177,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, item.value, true, {
                                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 49
                                                                }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandSeparator"], {}, void 0, false, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, group.value, true, {
                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                            lineNumber: 165,
                                            columnNumber: 33
                                        }, this)
                                }, void 0, false, {
                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                    lineNumber: 163,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                            lineNumber: 153,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KbdGroup"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpIcon$3e$__["ArrowUpIcon"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                                lineNumber: 192,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownIcon$3e$__["ArrowDownIcon"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                                lineNumber: 195,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Navigate"
                                                }, void 0, false, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                            lineNumber: 189,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$corner$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CornerDownLeftIcon$3e$__["CornerDownLeftIcon"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Select"
                                                }, void 0, false, {
                                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                            lineNumber: 200,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                    lineNumber: 188,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                            children: "Esc"
                                        }, void 0, false, {
                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                            lineNumber: 208,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                            lineNumber: 209,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                                    lineNumber: 207,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                            lineNumber: 187,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                    lineNumber: 151,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/layout/header/components/search-dialog.tsx",
        lineNumber: 113,
        columnNumber: 9
    }, this);
}
_s(SearchDialog, "yV6DxSubyy4ZmDiTQIQFSXuuW1o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchDialog;
var _c;
__turbopack_context__.k.register(_c, "SearchDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable react-hooks/set-state-in-effect */ 'use client';
;
;
;
function ThemeToggle() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { theme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    // Mount indicator to avoid hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ThemeToggle.useLayoutEffect": ()=>{
            setMounted(true);
        }
    }["ThemeToggle.useLayoutEffect"], []);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-9 h-9 rounded-md border border-zinc-200 dark:border-zinc-800"
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: ()=>setTheme(theme === 'dark' ? 'light' : 'dark'),
        variant: "ghost",
        size: "icon",
        "aria-label": "Toggle theme",
        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            className: "-rotate-45 size-4 text-zinc-700 dark:text-zinc-300",
            strokeWidth: 2,
            stroke: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z",
                    stroke: "currentColor",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
                    lineNumber: 41,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5 20L19 5",
                    stroke: "currentColor",
                    strokeLinejoin: "round",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
                    lineNumber: 46,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5",
                    stroke: "currentColor",
                    strokeLinejoin: "round",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
                    lineNumber: 52,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
            lineNumber: 31,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            className: "-rotate-225 size-4 text-zinc-700 dark:text-zinc-300",
            strokeWidth: 2,
            stroke: "currentColor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z",
                    stroke: "currentColor",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
                    lineNumber: 70,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5 20L19 5",
                    stroke: "currentColor",
                    strokeLinejoin: "round",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
                    lineNumber: 75,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5",
                    stroke: "currentColor",
                    strokeLinejoin: "round",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
                    lineNumber: 81,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
            lineNumber: 60,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/layout/header/components/theme-toggle.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_s(ThemeToggle, "uBAIyJCvPTefK3id1VrqeIYyGOw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/ui/menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>Menu,
    "DropdownMenuCheckboxItem",
    ()=>MenuCheckboxItem,
    "DropdownMenuContent",
    ()=>MenuPopup,
    "DropdownMenuCreateHandle",
    ()=>MenuCreateHandle,
    "DropdownMenuGroup",
    ()=>MenuGroup,
    "DropdownMenuItem",
    ()=>MenuItem,
    "DropdownMenuLabel",
    ()=>MenuGroupLabel,
    "DropdownMenuPortal",
    ()=>MenuPortal,
    "DropdownMenuRadioGroup",
    ()=>MenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>MenuRadioItem,
    "DropdownMenuSeparator",
    ()=>MenuSeparator,
    "DropdownMenuShortcut",
    ()=>MenuShortcut,
    "DropdownMenuSub",
    ()=>MenuSub,
    "DropdownMenuSubContent",
    ()=>MenuSubPopup,
    "DropdownMenuSubTrigger",
    ()=>MenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>MenuTrigger,
    "Menu",
    ()=>Menu,
    "MenuCheckboxItem",
    ()=>MenuCheckboxItem,
    "MenuCreateHandle",
    ()=>MenuCreateHandle,
    "MenuGroup",
    ()=>MenuGroup,
    "MenuGroupLabel",
    ()=>MenuGroupLabel,
    "MenuItem",
    ()=>MenuItem,
    "MenuPopup",
    ()=>MenuPopup,
    "MenuPortal",
    ()=>MenuPortal,
    "MenuRadioGroup",
    ()=>MenuRadioGroup,
    "MenuRadioItem",
    ()=>MenuRadioItem,
    "MenuSeparator",
    ()=>MenuSeparator,
    "MenuShortcut",
    ()=>MenuShortcut,
    "MenuSub",
    ()=>MenuSub,
    "MenuSubPopup",
    ()=>MenuSubPopup,
    "MenuSubTrigger",
    ()=>MenuSubTrigger,
    "MenuTrigger",
    ()=>MenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/menu/index.parts.js [app-client] (ecmascript) <export * as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const MenuCreateHandle = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].createHandle;
const Menu = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Root;
const MenuPortal = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Portal;
function MenuTrigger(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Trigger, {
        "data-slot": "menu-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
_c = MenuTrigger;
function MenuPopup({ children, className, sideOffset = 4, align = "center", alignOffset, side = "bottom", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Portal, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Positioner, {
            align: align,
            alignOffset: alignOffset,
            className: "z-50",
            "data-slot": "menu-positioner",
            side: side,
            sideOffset: sideOffset,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Popup, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/6%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", className),
                "data-slot": "menu-popup",
                ...props,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-(--available-height) w-full overflow-y-auto p-1",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c1 = MenuPopup;
function MenuGroup(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Group, {
        "data-slot": "menu-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 60,
        columnNumber: 10
    }, this);
}
_c2 = MenuGroup;
function MenuItem({ className, inset, variant = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Item, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0", className),
        "data-inset": inset,
        "data-slot": "menu-item",
        "data-variant": variant,
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c3 = MenuItem;
function MenuCheckboxItem({ className, children, checked, variant = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].CheckboxItem, {
        checked: checked,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default items-center gap-2 rounded-sm py-1 ps-2 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", variant === "switch" ? "grid-cols-[1fr_auto] gap-4 pe-1.5" : "grid-cols-[1rem_1fr] pe-4", className),
        "data-slot": "menu-checkbox-item",
        ...props,
        children: variant === "switch" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "col-start-1",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].CheckboxItemIndicator, {
                    className: "inset-shadow-[0_1px_--theme(--color-black/6%)] inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(3)]",
                    keepMounted: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none block aspect-square h-full in-[[data-slot=menu-checkbox-item][data-checked]]:origin-[var(--thumb-size)_50%] origin-left in-[[data-slot=menu-checkbox-item][data-checked]]:translate-x-[calc(var(--thumb-size)-4px)] in-[[data-slot=menu-checkbox-item]:active]:not-data-disabled:scale-x-110 in-[[data-slot=menu-checkbox-item]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.10)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                        lineNumber: 115,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].CheckboxItemIndicator, {
                    className: "col-start-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        fill: "none",
                        height: "24",
                        stroke: "currentColor",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        viewBox: "0 0 24 24",
                        width: "24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M5.252 12.7 10.2 18.63 18.748 5.37"
                        }, void 0, false, {
                            fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "col-start-2",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c4 = MenuCheckboxItem;
function MenuRadioGroup(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].RadioGroup, {
        "data-slot": "menu-radio-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 143,
        columnNumber: 10
    }, this);
}
_c5 = MenuRadioGroup;
function MenuRadioItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].RadioItem, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        "data-slot": "menu-radio-item",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].RadioItemIndicator, {
                className: "col-start-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    fill: "none",
                    height: "24",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    viewBox: "0 0 24 24",
                    width: "24",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M5.252 12.7 10.2 18.63 18.748 5.37"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "col-start-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_c6 = MenuRadioItem;
function MenuGroupLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].GroupLabel, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8", className),
        "data-inset": inset,
        "data-slot": "menu-label",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_c7 = MenuGroupLabel;
function MenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].Separator, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mx-2 my-1 h-px bg-border", className),
        "data-slot": "menu-separator",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_c8 = MenuSeparator;
function MenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest", className),
        "data-slot": "menu-shortcut",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_c9 = MenuShortcut;
function MenuSub(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].SubmenuRoot, {
        "data-slot": "menu-sub",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 224,
        columnNumber: 10
    }, this);
}
_c10 = MenuSub;
function MenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Menu$3e$__["Menu"].SubmenuTrigger, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-8 items-center gap-2 rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-popup-open:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", className),
        "data-inset": inset,
        "data-slot": "menu-sub-trigger",
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
                className: "-me-0.5 ms-auto opacity-80"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_c11 = MenuSubTrigger;
function MenuSubPopup({ className, sideOffset = 0, alignOffset, align = "start", ...props }) {
    const defaultAlignOffset = align !== "center" ? -5 : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuPopup, {
        align: align,
        alignOffset: alignOffset ?? defaultAlignOffset,
        className: className,
        "data-slot": "menu-sub-content",
        side: "inline-end",
        sideOffset: sideOffset,
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/menu.tsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
_c12 = MenuSubPopup;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12;
__turbopack_context__.k.register(_c, "MenuTrigger");
__turbopack_context__.k.register(_c1, "MenuPopup");
__turbopack_context__.k.register(_c2, "MenuGroup");
__turbopack_context__.k.register(_c3, "MenuItem");
__turbopack_context__.k.register(_c4, "MenuCheckboxItem");
__turbopack_context__.k.register(_c5, "MenuRadioGroup");
__turbopack_context__.k.register(_c6, "MenuRadioItem");
__turbopack_context__.k.register(_c7, "MenuGroupLabel");
__turbopack_context__.k.register(_c8, "MenuSeparator");
__turbopack_context__.k.register(_c9, "MenuShortcut");
__turbopack_context__.k.register(_c10, "MenuSub");
__turbopack_context__.k.register(_c11, "MenuSubTrigger");
__turbopack_context__.k.register(_c12, "MenuSubPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/layout/header/language-switcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageSwitcher",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/languages.js [app-client] (ecmascript) <export default as Languages>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function LanguageSwitcher() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageSwitcher.useEffect": ()=>{
            // Determine initial locale from cookie
            const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
            if (match) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setLocale(match[2]);
            }
        }
    }["LanguageSwitcher.useEffect"], []);
    // Only show on docs pages
    if (!pathname?.startsWith('/docs')) {
        return null;
    }
    const switchLanguage = (target)=>{
        // Set cookie
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`; // 1 year
        setLocale(target);
        router.refresh();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
                    variant: "ghost",
                    size: "sm"
                }), "gap-2 px-2"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__["Languages"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden sm:inline-block",
                        children: locale === 'vi' ? 'Tiếng Việt' : 'English'
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: ()=>switchLanguage('en'),
                        className: locale === 'en' ? 'bg-accent' : '',
                        children: "English"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: ()=>switchLanguage('vi'),
                        className: locale === 'vi' ? 'bg-accent' : '',
                        children: "Tiếng Việt"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/layout/header/language-switcher.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
_s(LanguageSwitcher, "sMQb3VhkpA63Nl3Ua90d+iWy9ag=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LanguageSwitcher;
var _c;
__turbopack_context__.k.register(_c, "LanguageSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=cafekit-web_src_4810fc00._.js.map