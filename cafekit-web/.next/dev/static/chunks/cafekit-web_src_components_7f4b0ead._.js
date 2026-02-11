(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cafekit-web/src/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsPanel,
    "TabsList",
    ()=>TabsList,
    "TabsPanel",
    ()=>TabsPanel,
    "TabsTab",
    ()=>TabsTab,
    "TabsTrigger",
    ()=>TabsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-client] (ecmascript) <export * as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Root, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 data-[orientation=vertical]:flex-row", className),
        "data-slot": "tabs",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ variant = "default", className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].List, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground", "data-[orientation=vertical]:flex-col", variant === "default" ? "rounded-lg bg-muted p-0.5 text-muted-foreground/72" : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent", className),
        "data-slot": "tabs-list",
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Indicator, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-translate-y-(--active-tab-bottom) absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) transition-[width,translate] duration-200 ease-in-out", variant === "underline" ? "data-[orientation=vertical]:-translate-x-px z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-y-px" : "-z-1 rounded-md bg-background shadow-sm/5 dark:bg-input"),
                "data-slot": "tab-indicator"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTab({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Tab, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_svg]:-mx-0.5 flex h-9 shrink-0 grow cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-disabled:opacity-64 sm:h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        "data-slot": "tabs-tab",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c2 = TabsTab;
function TabsPanel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Panel, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 outline-none", className),
        "data-slot": "tabs-content",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c3 = TabsPanel;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTab");
__turbopack_context__.k.register(_c3, "TabsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/docs/mdx-components.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MDXComponents",
    ()=>MDXComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/tabs.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Custom heading components with anchor links
function createHeading(level) {
    const Component = ({ children, id, ...props })=>{
        const Tag = `h${level}`;
        const sizes = {
            1: 'text-3xl sm:text-4xl font-bold tracking-tight mb-6 mt-10 scroll-mt-24',
            2: 'text-2xl sm:text-3xl font-bold tracking-tight mb-4 mt-10 scroll-mt-24 pb-2 border-b border-border',
            3: 'text-xl sm:text-2xl font-semibold tracking-tight mb-3 mt-8 scroll-mt-24',
            4: 'text-lg sm:text-xl font-semibold tracking-tight mb-3 mt-6 scroll-mt-24',
            5: 'text-base sm:text-lg font-semibold tracking-tight mb-2 mt-6 scroll-mt-24',
            6: 'text-base font-semibold tracking-tight mb-2 mt-4 scroll-mt-24'
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Tag, {
            id,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sizes[level], "text-foreground group flex items-center"),
            ...props
        }, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                children,
                id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: `#${id}`,
                    className: "ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground no-underline",
                    "aria-label": "Link to this section",
                    children: "#"
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true));
    };
    Component.displayName = `Heading${level}`;
    return Component;
}
function Callout({ children, type = 'info' }) {
    const styles = {
        info: {
            container: 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
            icon: 'text-blue-600 dark:text-blue-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"]
        },
        warning: {
            container: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900',
            icon: 'text-amber-600 dark:text-amber-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
        },
        error: {
            container: 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900',
            icon: 'text-red-600 dark:text-red-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"]
        },
        success: {
            container: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900',
            icon: 'text-emerald-600 dark:text-emerald-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
        }
    };
    const style = styles[type];
    const Icon = style.IconComponent;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex gap-3 p-4 rounded-lg border my-6 text-sm", style.container),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-5 h-5 shrink-0 mt-0.5", style.icon)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-foreground prose-sm [&>p]:mb-0",
                children: children
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c = Callout;
// Custom code block with syntax highlighting (handled by rehype-highlight)
function Pre({ children, ...props }) {
    _s();
    const preRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isCopied, setIsCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopy = async ()=>{
        if (preRef.current) {
            const text = preRef.current.innerText;
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(()=>setIsCopied(false), 2000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group my-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                ref: preRef,
                className: "p-4 rounded-lg bg-[#0d1117] dark:bg-[#0d1117] overflow-x-auto border border-border font-mono text-sm leading-relaxed",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleCopy,
                className: "absolute top-3 right-3 p-2 rounded-md bg-zinc-800/50 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-200",
                "aria-label": "Copy code",
                children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "w-4 h-4 text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                    lineNumber: 121,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                    lineNumber: 121,
                    columnNumber: 74
                }, this)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(Pre, "NuvHb9I8cwKc2sr5SfQtKKy+pMI=");
_c1 = Pre;
function Code({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
        className: "text-zinc-200 font-mono text-[13px]",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_c2 = Code;
// Inline code
function InlineCode({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
        className: "px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-[13px] border border-border/50",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_c3 = InlineCode;
// Custom link component
function CustomLink({ href, children, ...props }) {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "font-medium text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all",
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href || '#',
        className: "font-medium text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c4 = CustomLink;
function Cards({ children, cols = 2 }) {
    const gridCols = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid gap-4 my-6", gridCols[cols]),
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 189,
        columnNumber: 10
    }, this);
}
_c5 = Cards;
function Card({ title, children, href }) {
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold text-foreground mb-1 group-hover:text-primary transition-colors flex items-center gap-2",
                children: [
                    title,
                    href && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                        lineNumber: 203,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: children
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: "group block p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all no-underline",
            children: content
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 rounded-lg border border-border bg-card text-card-foreground",
        children: content
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
_c6 = Card;
const MDXComponents = {
    // Headings
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    // Text elements
    p: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-6 leading-8 text-muted-foreground/90 text-[16px]",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 238,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    a: CustomLink,
    strong: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            className: "font-bold text-foreground",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 242,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    em: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
            className: "italic text-muted-foreground",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 245,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Lists
    ul: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "list-disc list-outside mb-6 ml-6 space-y-2 text-muted-foreground/90 leading-7",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 249,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    ol: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "list-decimal list-outside mb-6 ml-6 space-y-2 text-muted-foreground/90 leading-7",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 252,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    li: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "pl-1",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 255,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Code
    pre: Pre,
    code: (props)=>{
        // If code is inside pre (code block), use Code component
        // Otherwise use InlineCode
        if (props.className?.includes('hljs')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Code, {
                ...props
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 263,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineCode, {
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 265,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    },
    // Blockquote
    blockquote: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
            className: "pl-4 border-l-4 border-primary/20 italic text-muted-foreground my-6",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 269,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Table
    table: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-x-auto my-6 rounded-lg border border-border",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full border-collapse text-sm",
                ...props
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 276,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    thead: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            className: "bg-muted/50 border-b border-border",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 281,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    th: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "px-4 py-3 text-left font-semibold text-foreground",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 284,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    td: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            className: "px-4 py-3 text-muted-foreground border-b border-border last:border-0",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 290,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Horizontal rule
    hr: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
            className: "my-8 border-border",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 297,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Custom components
    Callout,
    Cards,
    Card,
    // Tabs
    Tabs: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"],
    TabsList: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"],
    TabsTrigger: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"],
    TabsPanel: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"]
};
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Callout");
__turbopack_context__.k.register(_c1, "Pre");
__turbopack_context__.k.register(_c2, "Code");
__turbopack_context__.k.register(_c3, "InlineCode");
__turbopack_context__.k.register(_c4, "CustomLink");
__turbopack_context__.k.register(_c5, "Cards");
__turbopack_context__.k.register(_c6, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cafekit-web/src/components/docs/toc.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TableOfContents",
    ()=>TableOfContents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TableOfContents({ headings }) {
    _s();
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TableOfContents.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "TableOfContents.useEffect": (entries)=>{
                    entries.forEach({
                        "TableOfContents.useEffect": (entry)=>{
                            if (entry.isIntersecting) {
                                setActiveId(entry.target.id);
                            }
                        }
                    }["TableOfContents.useEffect"]);
                }
            }["TableOfContents.useEffect"], {
                rootMargin: '-80px 0px -80% 0px'
            });
            headings.forEach({
                "TableOfContents.useEffect": ({ id })=>{
                    const element = document.getElementById(id);
                    if (element) observer.observe(element);
                }
            }["TableOfContents.useEffect"]);
            return ({
                "TableOfContents.useEffect": ()=>observer.disconnect()
            })["TableOfContents.useEffect"];
        }
    }["TableOfContents.useEffect"], [
        headings
    ]);
    if (headings.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold text-foreground mb-4 text-sm tracking-tight",
                children: "On This Page"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative pl-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-0 bottom-0 w-px bg-border"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2",
                        children: headings.map((heading, index)=>{
                            const isActive = activeId === heading.id;
                            // Indent text based on level, but keep border aligned if we want shared line
                            // OR indent everything. Let's do indent everything but subtle
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `#${heading.id}`,
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("block text-xs py-1.5 transition-colors border-l-2 -ml-px pl-4", isActive ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"),
                                    style: {
                                        paddingLeft: `${(heading.level - 2) * 0.75 + 1}rem`
                                    },
                                    children: heading.text
                                }, void 0, false, {
                                    fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                                    lineNumber: 61,
                                    columnNumber: 17
                                }, this)
                            }, `${heading.id}-${index}`, false, {
                                fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(TableOfContents, "7z36JjnWiW9X7oCvCcUw0JXMRcg=");
_c = TableOfContents;
var _c;
__turbopack_context__.k.register(_c, "TableOfContents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=cafekit-web_src_components_7f4b0ead._.js.map