module.exports = [
"[project]/cafekit-web/src/components/ui/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <export * as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Root, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 data-[orientation=vertical]:flex-row", className),
        "data-slot": "tabs",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
function TabsList({ variant = "default", className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].List, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground", "data-[orientation=vertical]:flex-col", variant === "default" ? "rounded-lg bg-muted p-0.5 text-muted-foreground/72" : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent", className),
        "data-slot": "tabs-list",
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Indicator, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("-translate-y-(--active-tab-bottom) absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) transition-[width,translate] duration-200 ease-in-out", variant === "underline" ? "data-[orientation=vertical]:-translate-x-px z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-y-px" : "-z-1 rounded-md bg-background shadow-sm/5 dark:bg-input"),
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
function TabsTab({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Tab, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("[&_svg]:-mx-0.5 flex h-9 shrink-0 grow cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-disabled:opacity-64 sm:h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        "data-slot": "tabs-tab",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function TabsPanel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tabs$3e$__["Tabs"].Panel, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 outline-none", className),
        "data-slot": "tabs-content",
        ...props
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/ui/tabs.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/cafekit-web/src/components/docs/mdx-components.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MDXComponents",
    ()=>MDXComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/components/ui/tabs.tsx [app-ssr] (ecmascript)");
'use client';
;
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Tag, {
            id,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sizes[level], "text-foreground group flex items-center"),
            ...props
        }, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                children,
                id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"]
        },
        warning: {
            container: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900',
            icon: 'text-amber-600 dark:text-amber-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
        },
        error: {
            container: 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900',
            icon: 'text-red-600 dark:text-red-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"]
        },
        success: {
            container: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900',
            icon: 'text-emerald-600 dark:text-emerald-400',
            IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
        }
    };
    const style = styles[type];
    const Icon = style.IconComponent;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex gap-3 p-4 rounded-lg border my-6 text-sm", style.container),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-5 h-5 shrink-0 mt-0.5", style.icon)
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
// Custom code block with syntax highlighting (handled by rehype-highlight)
function Pre({ children, ...props }) {
    const preRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isCopied, setIsCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopy = async ()=>{
        if (preRef.current) {
            const text = preRef.current.innerText;
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(()=>setIsCopied(false), 2000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group my-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                ref: preRef,
                className: "p-4 rounded-lg bg-[#0d1117] dark:bg-[#0d1117] overflow-x-auto border border-border font-mono text-sm leading-relaxed",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleCopy,
                className: "absolute top-3 right-3 p-2 rounded-md bg-zinc-800/50 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-200",
                "aria-label": "Copy code",
                children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "w-4 h-4 text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                    lineNumber: 121,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
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
function Code({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
        className: "text-zinc-200 font-mono text-[13px]",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
// Inline code
function InlineCode({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
        className: "px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-[13px] border border-border/50",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
// Custom link component
function CustomLink({ href, children, ...props }) {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
function Cards({ children, cols = 2 }) {
    const gridCols = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("grid gap-4 my-6", gridCols[cols]),
        children: children
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 189,
        columnNumber: 10
    }, this);
}
function Card({ title, children, href }) {
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold text-foreground mb-1 group-hover:text-primary transition-colors flex items-center gap-2",
                children: [
                    title,
                    href && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: "group block p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all no-underline",
            children: content
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 rounded-lg border border-border bg-card text-card-foreground",
        children: content
    }, void 0, false, {
        fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
const MDXComponents = {
    // Headings
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    // Text elements
    p: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-6 leading-8 text-muted-foreground/90 text-[16px]",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 238,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    a: CustomLink,
    strong: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            className: "font-bold text-foreground",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 242,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    em: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
            className: "italic text-muted-foreground",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 245,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Lists
    ul: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "list-disc list-outside mb-6 ml-6 space-y-2 text-muted-foreground/90 leading-7",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 249,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    ol: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "list-decimal list-outside mb-6 ml-6 space-y-2 text-muted-foreground/90 leading-7",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 252,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    li: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Code, {
                ...props
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
                lineNumber: 263,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineCode, {
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 265,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    },
    // Blockquote
    blockquote: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
            className: "pl-4 border-l-4 border-primary/20 italic text-muted-foreground my-6",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 269,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Table
    table: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-x-auto my-6 rounded-lg border border-border",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
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
    thead: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            className: "bg-muted/50 border-b border-border",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 281,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    th: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "px-4 py-3 text-left font-semibold text-foreground",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 284,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    td: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            className: "px-4 py-3 text-muted-foreground border-b border-border last:border-0",
            ...props
        }, void 0, false, {
            fileName: "[project]/cafekit-web/src/components/docs/mdx-components.tsx",
            lineNumber: 290,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Horizontal rule
    hr: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
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
    Tabs: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"],
    TabsList: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"],
    TabsTrigger: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTab"],
    TabsPanel: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsPanel"]
};
}),
"[project]/cafekit-web/src/components/docs/toc.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TableOfContents",
    ()=>TableOfContents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function TableOfContents({ headings }) {
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, {
            rootMargin: '-80px 0px -80% 0px'
        });
        headings.forEach(({ id })=>{
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
        return ()=>observer.disconnect();
    }, [
        headings
    ]);
    if (headings.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold text-foreground mb-4 text-sm tracking-tight",
                children: "On This Page"
            }, void 0, false, {
                fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative pl-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-0 bottom-0 w-px bg-border"
                    }, void 0, false, {
                        fileName: "[project]/cafekit-web/src/components/docs/toc.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2",
                        children: headings.map((heading, index)=>{
                            const isActive = activeId === heading.id;
                            // Indent text based on level, but keep border aligned if we want shared line
                            // OR indent everything. Let's do indent everything but subtle
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `#${heading.id}`,
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("block text-xs py-1.5 transition-colors border-l-2 -ml-px pl-4", isActive ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"),
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
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleAlert
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }
    ]
];
const CircleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("circle-alert", __iconNode);
;
 //# sourceMappingURL=circle-alert.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Info
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 16v-4",
            key: "1dtifu"
        }
    ],
    [
        "path",
        {
            d: "M12 8h.01",
            key: "e9boi3"
        }
    ]
];
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("info", __iconNode);
;
 //# sourceMappingURL=info.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TriangleAlert
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
];
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("triangle-alert", __iconNode);
;
 //# sourceMappingURL=triangle-alert.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Copy
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
            key: "17jyea"
        }
    ],
    [
        "path",
        {
            d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
            key: "zix9uf"
        }
    ]
];
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("copy", __iconNode);
;
 //# sourceMappingURL=copy.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRootContext",
    ()=>TabsRootContext,
    "useTabsRootContext",
    ()=>useTabsRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const TabsRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) TabsRootContext.displayName = "TabsRootContext";
function useTabsRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](TabsRootContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: TabsRootContext is missing. Tabs parts must be placed within <Tabs.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRootDataAttributes",
    ()=>TabsRootDataAttributes
]);
let TabsRootDataAttributes = /*#__PURE__*/ function(TabsRootDataAttributes) {
    /**
   * Indicates the direction of the activation (based on the previous active tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */ TabsRootDataAttributes["activationDirection"] = "data-activation-direction";
    /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */ TabsRootDataAttributes["orientation"] = "data-orientation";
    return TabsRootDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tabsStateAttributesMapping",
    ()=>tabsStateAttributesMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootDataAttributes.js [app-ssr] (ecmascript)");
;
const tabsStateAttributesMapping = {
    tabActivationDirection: (dir)=>({
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsRootDataAttributes"].activationDirection]: dir
        })
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRoot",
    ()=>TabsRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
const TabsRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabsRoot(componentProps, forwardedRef) {
    const { className, defaultValue: defaultValueProp = 0, onValueChange: onValueChangeProp, orientation = 'horizontal', render, value: valueProp, ...elementProps } = componentProps;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    // Track whether the user explicitly provided a `defaultValue` prop.
    // Used to determine if we should honor a disabled tab selection.
    const hasExplicitDefaultValueProp = Object.hasOwn(componentProps, 'defaultValue');
    const tabPanelRefs = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const [mountedTabPanels, setMountedTabPanels] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>new Map());
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValueProp,
        name: 'Tabs',
        state: 'value'
    });
    const isControlled = valueProp !== undefined;
    const [tabMap, setTabMap] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>new Map());
    const [tabActivationDirection, setTabActivationDirection] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('none');
    const onValueChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((newValue, eventDetails)=>{
        onValueChangeProp?.(newValue, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        setValue(newValue);
        setTabActivationDirection(eventDetails.activationDirection);
    });
    const registerMountedTabPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((panelValue, panelId)=>{
        setMountedTabPanels((prev)=>{
            if (prev.get(panelValue) === panelId) {
                return prev;
            }
            const next = new Map(prev);
            next.set(panelValue, panelId);
            return next;
        });
    });
    const unregisterMountedTabPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((panelValue, panelId)=>{
        setMountedTabPanels((prev)=>{
            if (!prev.has(panelValue) || prev.get(panelValue) !== panelId) {
                return prev;
            }
            const next = new Map(prev);
            next.delete(panelValue);
            return next;
        });
    });
    // get the `id` attribute of <Tabs.Panel> to set as the value of `aria-controls` on <Tabs.Tab>
    const getTabPanelIdByValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((tabValue)=>{
        return mountedTabPanels.get(tabValue);
    }, [
        mountedTabPanels
    ]);
    // get the `id` attribute of <Tabs.Tab> to set as the value of `aria-labelledby` on <Tabs.Panel>
    const getTabIdByPanelValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((tabPanelValue)=>{
        for (const tabMetadata of tabMap.values()){
            if (tabPanelValue === tabMetadata?.value) {
                return tabMetadata?.id;
            }
        }
        return undefined;
    }, [
        tabMap
    ]);
    // used in `useActivationDirectionDetector` for setting data-activation-direction
    const getTabElementBySelectedValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((selectedValue)=>{
        if (selectedValue === undefined) {
            return null;
        }
        for (const [tabElement, tabMetadata] of tabMap.entries()){
            if (tabMetadata != null && selectedValue === (tabMetadata.value ?? tabMetadata.index)) {
                return tabElement;
            }
        }
        return null;
    }, [
        tabMap
    ]);
    const tabsContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            direction,
            getTabElementBySelectedValue,
            getTabIdByPanelValue,
            getTabPanelIdByValue,
            onValueChange,
            orientation,
            registerMountedTabPanel,
            setTabMap,
            unregisterMountedTabPanel,
            tabActivationDirection,
            value
        }), [
        direction,
        getTabElementBySelectedValue,
        getTabIdByPanelValue,
        getTabPanelIdByValue,
        onValueChange,
        orientation,
        registerMountedTabPanel,
        setTabMap,
        unregisterMountedTabPanel,
        tabActivationDirection,
        value
    ]);
    const selectedTabMetadata = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        for (const tabMetadata of tabMap.values()){
            if (tabMetadata != null && tabMetadata.value === value) {
                return tabMetadata;
            }
        }
        return undefined;
    }, [
        tabMap,
        value
    ]);
    // Find the first non-disabled tab value.
    // Used as a fallback when the current selection is disabled or missing.
    const firstEnabledTabValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        for (const tabMetadata of tabMap.values()){
            if (tabMetadata != null && !tabMetadata.disabled) {
                return tabMetadata.value;
            }
        }
        return undefined;
    }, [
        tabMap
    ]);
    // Automatically switch to the first enabled tab when:
    // - The current selection is disabled (and wasn't explicitly set via defaultValue)
    // - The current selection is missing (tab was removed from DOM)
    // Falls back to null if all tabs are disabled.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (isControlled || tabMap.size === 0) {
            return;
        }
        const selectionIsDisabled = selectedTabMetadata?.disabled;
        const selectionIsMissing = selectedTabMetadata == null && value !== null;
        const shouldHonorExplicitDefaultSelection = hasExplicitDefaultValueProp && selectionIsDisabled && value === defaultValueProp;
        if (shouldHonorExplicitDefaultSelection) {
            return;
        }
        if (!selectionIsDisabled && !selectionIsMissing) {
            return;
        }
        const fallbackValue = firstEnabledTabValue ?? null;
        if (value === fallbackValue) {
            return;
        }
        setValue(fallbackValue);
        setTabActivationDirection('none');
    }, [
        defaultValueProp,
        firstEnabledTabValue,
        hasExplicitDefaultValueProp,
        isControlled,
        selectedTabMetadata,
        setTabActivationDirection,
        setValue,
        tabMap,
        value
    ]);
    const state = {
        orientation,
        tabActivationDirection
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: forwardedRef,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsRootContext"].Provider, {
        value: tabsContextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeList"], {
            elementsRef: tabPanelRefs,
            children: element
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsRoot.displayName = "TabsRoot";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_COMPOSITE_ITEM",
    ()=>ACTIVE_COMPOSITE_ITEM
]);
const ACTIVE_COMPOSITE_ITEM = 'data-composite-item-active';
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsListContext",
    ()=>TabsListContext,
    "useTabsListContext",
    ()=>useTabsListContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const TabsListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) TabsListContext.displayName = "TabsListContext";
function useTabsListContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](TabsListContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsTab",
    ()=>TabsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/item/useCompositeItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-ssr] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const TabsTab = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabsTab(componentProps, forwardedRef) {
    const { className, disabled = false, render, value, id: idProp, nativeButton = true, ...elementProps } = componentProps;
    const { value: activeTabValue, getTabPanelIdByValue, orientation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const { activateOnFocus, highlightedTabIndex, onTabActivation, setHighlightedTabIndex, tabsListElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsListContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const tabMetadata = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            id,
            value
        }), [
        disabled,
        id,
        value
    ]);
    const { compositeProps, compositeRef, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeItem"])({
        metadata: tabMetadata
    });
    const active = value === activeTabValue;
    const isNavigatingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    // Keep the highlighted item in sync with the currently active tab
    // when the value prop changes externally (controlled mode)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (isNavigatingRef.current) {
            isNavigatingRef.current = false;
            return;
        }
        if (!(active && index > -1 && highlightedTabIndex !== index)) {
            return;
        }
        // If focus is currently within the tabs list, don't override the roving
        // focus highlight. This keeps keyboard navigation relative to the focused
        // item after an external/asynchronous selection change.
        const listElement = tabsListElement;
        if (listElement != null) {
            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(listElement));
            if (activeEl && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(listElement, activeEl)) {
                return;
            }
        }
        // Don't highlight disabled tabs to prevent them from interfering with keyboard navigation.
        // Keyboard focus (tabIndex) should remain on an enabled tab even when a disabled tab is selected.
        if (!disabled) {
            setHighlightedTabIndex(index);
        }
    }, [
        active,
        index,
        highlightedTabIndex,
        setHighlightedTabIndex,
        disabled,
        tabsListElement
    ]);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton,
        focusableWhenDisabled: true
    });
    const tabPanelId = getTabPanelIdByValue(value);
    const isPressingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const isMainButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    function onClick(event) {
        if (active || disabled) {
            return;
        }
        onTabActivation(value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent, undefined, {
            activationDirection: 'none'
        }));
    }
    function onFocus(event) {
        if (active) {
            return;
        }
        // Only highlight enabled tabs when focused (disabled tabs remain focusable via focusableWhenDisabled).
        if (index > -1 && !disabled) {
            setHighlightedTabIndex(index);
        }
        if (disabled) {
            return;
        }
        if (activateOnFocus && (!isPressingRef.current || // keyboard or touch focus
        isPressingRef.current && isMainButtonRef.current) // mouse focus
        ) {
            onTabActivation(value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent, undefined, {
                activationDirection: 'none'
            }));
        }
    }
    function onPointerDown(event) {
        if (active || disabled) {
            return;
        }
        isPressingRef.current = true;
        function handlePointerUp() {
            isPressingRef.current = false;
            isMainButtonRef.current = false;
        }
        if (!event.button || event.button === 0) {
            isMainButtonRef.current = true;
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget);
            doc.addEventListener('pointerup', handlePointerUp, {
                once: true
            });
        }
    }
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            active,
            orientation
        }), [
        disabled,
        active,
        orientation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef,
            compositeRef
        ],
        props: [
            compositeProps,
            {
                role: 'tab',
                'aria-controls': tabPanelId,
                'aria-selected': active,
                id,
                onClick,
                onFocus,
                onPointerDown,
                [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACTIVE_COMPOSITE_ITEM"]]: active ? '' : undefined,
                onKeyDownCapture () {
                    isNavigatingRef.current = true;
                }
            },
            elementProps,
            getButtonProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) TabsTab.displayName = "TabsTab";
}),
"[project]/cafekit-web/node_modules/@base-ui/utils/esm/useForcedRerendering.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useForcedRerendering",
    ()=>useForcedRerendering
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useForcedRerendering() {
    const [, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        setState({});
    }, []);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getCssDimensions.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCssDimensions",
    ()=>getCssDimensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
;
;
function getCssDimensions(element) {
    const css = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getComputedStyle"])(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(width) !== offsetWidth || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(height) !== offsetHeight;
    if (shouldFallback) {
        width = offsetWidth;
        height = offsetHeight;
    }
    return {
        width,
        height
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/indicator/prehydrationScript.min.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file is autogenerated. Do not edit it directly.
// To update it, modify the corresponding source file and run `pnpm inline-scripts`.
// prettier-ignore
__turbopack_context__.s([
    "script",
    ()=>script
]);
const script = '!function(){const t=document.currentScript.previousElementSibling;if(!t)return;const e=t.closest(\'[role="tablist"]\');if(!e)return;const i=e.querySelector("[data-active]");if(!i)return;if(0===i.offsetWidth||0===e.offsetWidth)return;let o=0,n=0,h=0,l=0,r=0,f=0;function s(t){const e=getComputedStyle(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;return(Math.round(i)!==t.offsetWidth||Math.round(o)!==t.offsetHeight)&&(i=t.offsetWidth,o=t.offsetHeight),{width:i,height:o}}if(null!=i&&null!=e){const{width:t,height:c}=s(i),{width:u,height:d}=s(e),a=i.getBoundingClientRect(),g=e.getBoundingClientRect(),p=u>0?g.width/u:1,b=d>0?g.height/d:1;if(Math.abs(p)>Number.EPSILON&&Math.abs(b)>Number.EPSILON){const t=a.left-g.left,i=a.top-g.top;o=t/p+e.scrollLeft-e.clientLeft,h=i/b+e.scrollTop-e.clientTop}else o=i.offsetLeft,h=i.offsetTop;r=t,f=c,n=e.scrollWidth-o-r,l=e.scrollHeight-h-f}function c(e,i){t.style.setProperty(`--active-tab-${e}`,`${i}px`)}c("left",o),c("right",n),c("top",h),c("bottom",l),c("width",r),c("height",f),r>0&&f>0&&t.removeAttribute("hidden")}();';
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicatorCssVars.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsIndicatorCssVars",
    ()=>TabsIndicatorCssVars
]);
let TabsIndicatorCssVars = /*#__PURE__*/ function(TabsIndicatorCssVars) {
    /**
   * Indicates the distance on the left side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabLeft"] = "--active-tab-left";
    /**
   * Indicates the distance on the right side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabRight"] = "--active-tab-right";
    /**
   * Indicates the distance on the top side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabTop"] = "--active-tab-top";
    /**
   * Indicates the distance on the bottom side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabBottom"] = "--active-tab-bottom";
    /**
   * Indicates the width of the tab if it is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabWidth"] = "--active-tab-width";
    /**
   * Indicates the width of the tab if it is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabHeight"] = "--active-tab-height";
    return TabsIndicatorCssVars;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicator.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsIndicator",
    ()=>TabsIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useForcedRerendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useForcedRerendering.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useOnMount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useOnMount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getCssDimensions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getCssDimensions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$prehydrationScript$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/indicator/prehydrationScript.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicatorCssVars.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$csp$2d$provider$2f$CSPContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/csp-provider/CSPContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"],
    activeTabPosition: ()=>null,
    activeTabSize: ()=>null
};
const TabsIndicator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabIndicator(componentProps, forwardedRef) {
    const { className, render, renderBeforeHydration = false, ...elementProps } = componentProps;
    const { nonce } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$csp$2d$provider$2f$CSPContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCSPContext"])();
    const { getTabElementBySelectedValue, orientation, tabActivationDirection, value } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const { tabsListElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsListContext"])();
    const [isMounted, setIsMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const { value: activeTabValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useOnMount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnMount"])(()=>setIsMounted(true));
    const rerender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useForcedRerendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForcedRerendering"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (value != null && tabsListElement != null && typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(rerender);
            resizeObserver.observe(tabsListElement);
            return ()=>{
                resizeObserver.disconnect();
            };
        }
        return undefined;
    }, [
        value,
        tabsListElement,
        rerender
    ]);
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    let width = 0;
    let height = 0;
    let isTabSelected = false;
    if (value != null && tabsListElement != null) {
        const activeTab = getTabElementBySelectedValue(value);
        isTabSelected = true;
        if (activeTab != null) {
            const { width: computedWidth, height: computedHeight } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getCssDimensions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssDimensions"])(activeTab);
            const { width: tabListWidth, height: tabListHeight } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getCssDimensions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssDimensions"])(tabsListElement);
            const tabRect = activeTab.getBoundingClientRect();
            const tabsListRect = tabsListElement.getBoundingClientRect();
            const scaleX = tabListWidth > 0 ? tabsListRect.width / tabListWidth : 1;
            const scaleY = tabListHeight > 0 ? tabsListRect.height / tabListHeight : 1;
            const hasNonZeroScale = Math.abs(scaleX) > Number.EPSILON && Math.abs(scaleY) > Number.EPSILON;
            if (hasNonZeroScale) {
                const tabLeftDelta = tabRect.left - tabsListRect.left;
                const tabTopDelta = tabRect.top - tabsListRect.top;
                left = tabLeftDelta / scaleX + tabsListElement.scrollLeft - tabsListElement.clientLeft;
                top = tabTopDelta / scaleY + tabsListElement.scrollTop - tabsListElement.clientTop;
            } else {
                left = activeTab.offsetLeft;
                top = activeTab.offsetTop;
            }
            width = computedWidth;
            height = computedHeight;
            right = tabsListElement.scrollWidth - left - width;
            bottom = tabsListElement.scrollHeight - top - height;
        }
    }
    const activeTabPosition = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>isTabSelected ? {
            left,
            right,
            top,
            bottom
        } : null, [
        left,
        right,
        top,
        bottom,
        isTabSelected
    ]);
    const activeTabSize = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>isTabSelected ? {
            width,
            height
        } : null, [
        width,
        height,
        isTabSelected
    ]);
    const style = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!isTabSelected) {
            return undefined;
        }
        return {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabLeft]: `${left}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabRight]: `${right}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabTop]: `${top}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabBottom]: `${bottom}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabWidth]: `${width}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabHeight]: `${height}px`
        };
    }, [
        left,
        right,
        top,
        bottom,
        width,
        height,
        isTabSelected
    ]);
    const displayIndicator = isTabSelected && width > 0 && height > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            orientation,
            activeTabPosition,
            activeTabSize,
            tabActivationDirection
        }), [
        orientation,
        activeTabPosition,
        activeTabSize,
        tabActivationDirection
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('span', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'presentation',
                style,
                hidden: !displayIndicator // do not display the indicator before the layout is settled
            },
            elementProps,
            {
                suppressHydrationWarning: true
            }
        ],
        stateAttributesMapping
    });
    if (activeTabValue == null) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            element,
            !isMounted && renderBeforeHydration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("script", {
                nonce: nonce,
                dangerouslySetInnerHTML: {
                    __html: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$prehydrationScript$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["script"]
                },
                suppressHydrationWarning: true
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsIndicator.displayName = "TabsIndicator";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/panel/TabsPanelDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsPanelDataAttributes",
    ()=>TabsPanelDataAttributes
]);
let TabsPanelDataAttributes = /*#__PURE__*/ function(TabsPanelDataAttributes) {
    /**
   * Indicates the index of the tab panel.
   */ TabsPanelDataAttributes["index"] = "data-index";
    /**
   * Indicates the direction of the activation (based on the previous active tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */ TabsPanelDataAttributes["activationDirection"] = "data-activation-direction";
    /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */ TabsPanelDataAttributes["orientation"] = "data-orientation";
    /**
   * Present when the panel is hidden.
   */ TabsPanelDataAttributes["hidden"] = "data-hidden";
    return TabsPanelDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsPanel",
    ()=>TabsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanelDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/panel/TabsPanelDataAttributes.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const TabsPanel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabPanel(componentProps, forwardedRef) {
    const { className, value, render, keepMounted = false, ...elementProps } = componentProps;
    const { value: selectedValue, getTabIdByPanelValue, orientation, tabActivationDirection, registerMountedTabPanel, unregisterMountedTabPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const metadata = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            id,
            value
        }), [
        id,
        value
    ]);
    const { ref: listItemRef, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        metadata
    });
    const hidden = value !== selectedValue;
    const correspondingTabId = getTabIdByPanelValue(value);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            hidden,
            orientation,
            tabActivationDirection
        }), [
        hidden,
        orientation,
        tabActivationDirection
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            listItemRef
        ],
        props: [
            {
                'aria-labelledby': correspondingTabId,
                hidden,
                id: id ?? undefined,
                role: 'tabpanel',
                tabIndex: hidden ? -1 : 0,
                [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanelDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsPanelDataAttributes"].index]: index
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (hidden && !keepMounted) {
            return undefined;
        }
        if (id == null) {
            return undefined;
        }
        registerMountedTabPanel(value, id);
        return ()=>{
            unregisterMountedTabPanel(value, id);
        };
    }, [
        hidden,
        keepMounted,
        value,
        id,
        registerMountedTabPanel,
        unregisterMountedTabPanel
    ]);
    const shouldRender = !hidden || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) TabsPanel.displayName = "TabsPanel";
}),
"[project]/cafekit-web/node_modules/@base-ui/utils/esm/isElementDisabled.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isElementDisabled",
    ()=>isElementDisabled
]);
function isElementDisabled(element) {
    return element == null || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/useCompositeRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompositeRoot",
    ()=>useCompositeRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$isElementDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/isElementDisabled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/composite.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/composite.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/constants.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const EMPTY_ARRAY = [];
function useCompositeRoot(params) {
    const { itemSizes, cols = 1, loopFocus = true, dense = false, orientation = 'both', direction, highlightedIndex: externalHighlightedIndex, onHighlightedIndexChange: externalSetHighlightedIndex, rootRef: externalRef, enableHomeAndEndKeys = false, stopEventPropagation = false, disabledIndices, modifierKeys = EMPTY_ARRAY } = params;
    const [internalHighlightedIndex, internalSetHighlightedIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const isGrid = cols > 1;
    const rootRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(rootRef, externalRef);
    const elementsRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const hasSetDefaultIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex;
    const onHighlightedIndexChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((index, shouldScrollIntoView = false)=>{
        (externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index);
        if (shouldScrollIntoView) {
            const newActiveItem = elementsRef.current[index];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scrollIntoViewIfNeeded"])(rootRef.current, newActiveItem, direction, orientation);
        }
    });
    const onMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((map)=>{
        if (map.size === 0 || hasSetDefaultIndexRef.current) {
            return;
        }
        hasSetDefaultIndexRef.current = true;
        const sortedElements = Array.from(map.keys());
        const activeItem = sortedElements.find((compositeElement)=>compositeElement?.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACTIVE_COMPOSITE_ITEM"])) ?? null;
        // Set the default highlighted index of an arbitrary composite item.
        const activeIndex = activeItem ? sortedElements.indexOf(activeItem) : -1;
        if (activeIndex !== -1) {
            onHighlightedIndexChange(activeIndex);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scrollIntoViewIfNeeded"])(rootRef.current, activeItem, direction, orientation);
    });
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            'aria-orientation': orientation === 'both' ? undefined : orientation,
            ref: mergedRef,
            onFocus (event) {
                const element = rootRef.current;
                if (!element || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isNativeInput"])(event.target)) {
                    return;
                }
                event.target.setSelectionRange(0, event.target.value.length ?? 0);
            },
            onKeyDown (event) {
                const RELEVANT_KEYS = enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ALL_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_KEYS"];
                if (!RELEVANT_KEYS.has(event.key)) {
                    return;
                }
                if (isModifierKeySet(event, modifierKeys)) {
                    return;
                }
                const element = rootRef.current;
                if (!element) {
                    return;
                }
                const isRtl = direction === 'rtl';
                const horizontalForwardKey = isRtl ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"];
                const forwardKey = {
                    horizontal: horizontalForwardKey,
                    vertical: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"],
                    both: horizontalForwardKey
                }[orientation];
                const horizontalBackwardKey = isRtl ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_LEFT"];
                const backwardKey = {
                    horizontal: horizontalBackwardKey,
                    vertical: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"],
                    both: horizontalBackwardKey
                }[orientation];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isNativeInput"])(event.target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$isElementDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElementDisabled"])(event.target)) {
                    const selectionStart = event.target.selectionStart;
                    const selectionEnd = event.target.selectionEnd;
                    const textContent = event.target.value ?? '';
                    // return to native textbox behavior when
                    // 1 - Shift is held to make a text selection, or if there already is a text selection
                    if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) {
                        return;
                    }
                    // 2 - arrow-ing forward and not in the last position of the text
                    if (event.key !== backwardKey && selectionStart < textContent.length) {
                        return;
                    }
                    // 3 -arrow-ing backward and not in the first position of the text
                    if (event.key !== forwardKey && selectionStart > 0) {
                        return;
                    }
                }
                let nextIndex = highlightedIndex;
                const minIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMinListIndex"])(elementsRef, disabledIndices);
                const maxIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMaxListIndex"])(elementsRef, disabledIndices);
                if (isGrid) {
                    const sizes = itemSizes || Array.from({
                        length: elementsRef.current.length
                    }, ()=>({
                            width: 1,
                            height: 1
                        }));
                    // To calculate movements on the grid, we use hypothetical cell indices
                    // as if every item was 1x1, then convert back to real indices.
                    const cellMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGridCellMap"])(sizes, cols, dense);
                    const minGridIndex = cellMap.findIndex((index)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index, disabledIndices));
                    // last enabled index
                    const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index, disabledIndices) ? cellIndex : foundIndex, -1);
                    nextIndex = cellMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGridNavigatedIndex"])({
                        current: cellMap.map((itemIndex)=>itemIndex ? elementsRef.current[itemIndex] : null)
                    }, {
                        event,
                        orientation,
                        loopFocus,
                        cols,
                        // treat undefined (empty grid spaces) as disabled indices so we
                        // don't end up in them
                        disabledIndices: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGridCellIndices"])([
                            ...disabledIndices || elementsRef.current.map((_, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index) ? index : undefined),
                            undefined
                        ], cellMap),
                        minIndex: minGridIndex,
                        maxIndex: maxGridIndex,
                        prevIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGridCellIndexOfCorner"])(highlightedIndex > maxIndex ? minIndex : highlightedIndex, sizes, cellMap, cols, // use a corner matching the edge closest to the direction we're
                        // moving in so we don't end up in the same item. Prefer
                        // top/left over bottom/right.
                        // eslint-disable-next-line no-nested-ternary
                        event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"] ? 'bl' : event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"] ? 'tr' : 'tl'),
                        rtl: isRtl
                    })]; // navigated cell will never be nullish
                }
                const forwardKeys = {
                    horizontal: [
                        horizontalForwardKey
                    ],
                    vertical: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"]
                    ],
                    both: [
                        horizontalForwardKey,
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"]
                    ]
                }[orientation];
                const backwardKeys = {
                    horizontal: [
                        horizontalBackwardKey
                    ],
                    vertical: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"]
                    ],
                    both: [
                        horizontalBackwardKey,
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"]
                    ]
                }[orientation];
                const preventedKeys = isGrid ? RELEVANT_KEYS : ({
                    horizontal: enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HORIZONTAL_KEYS_WITH_EXTRA_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HORIZONTAL_KEYS"],
                    vertical: enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERTICAL_KEYS_WITH_EXTRA_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERTICAL_KEYS"],
                    both: RELEVANT_KEYS
                })[orientation];
                if (enableHomeAndEndKeys) {
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HOME"]) {
                        nextIndex = minIndex;
                    } else if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["END"]) {
                        nextIndex = maxIndex;
                    }
                }
                if (nextIndex === highlightedIndex && (forwardKeys.includes(event.key) || backwardKeys.includes(event.key))) {
                    if (loopFocus && nextIndex === maxIndex && forwardKeys.includes(event.key)) {
                        nextIndex = minIndex;
                    } else if (loopFocus && nextIndex === minIndex && backwardKeys.includes(event.key)) {
                        nextIndex = maxIndex;
                    } else {
                        nextIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(elementsRef, {
                            startingIndex: nextIndex,
                            decrement: backwardKeys.includes(event.key),
                            disabledIndices
                        });
                    }
                }
                if (nextIndex !== highlightedIndex && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIndexOutOfListBounds"])(elementsRef, nextIndex)) {
                    if (stopEventPropagation) {
                        event.stopPropagation();
                    }
                    if (preventedKeys.has(event.key)) {
                        event.preventDefault();
                    }
                    onHighlightedIndexChange(nextIndex, true);
                    // Wait for FocusManager `returnFocus` to execute.
                    queueMicrotask(()=>{
                        elementsRef.current[nextIndex]?.focus();
                    });
                }
            }
        }), [
        cols,
        dense,
        direction,
        disabledIndices,
        elementsRef,
        enableHomeAndEndKeys,
        highlightedIndex,
        isGrid,
        itemSizes,
        loopFocus,
        mergedRef,
        modifierKeys,
        onHighlightedIndexChange,
        orientation,
        stopEventPropagation
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            props,
            highlightedIndex,
            onHighlightedIndexChange,
            elementsRef,
            disabledIndices,
            onMapChange,
            relayKeyboardEvent: props.onKeyDown
        }), [
        props,
        highlightedIndex,
        onHighlightedIndexChange,
        elementsRef,
        disabledIndices,
        onMapChange
    ]);
}
function isModifierKeySet(event, ignoredModifierKeys) {
    for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MODIFIER_KEYS"].values()){
        if (ignoredModifierKeys.includes(key)) {
            continue;
        }
        if (event.getModifierState(key)) {
            return true;
        }
    }
    return false;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/CompositeRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRoot",
    ()=>CompositeRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$useCompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/useCompositeRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/CompositeRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function CompositeRoot(componentProps) {
    const { render, className, refs = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], props = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], stateAttributesMapping, highlightedIndex: highlightedIndexProp, onHighlightedIndexChange: onHighlightedIndexChangeProp, orientation, dense, itemSizes, loopFocus, cols, enableHomeAndEndKeys, onMapChange: onMapChangeProp, stopEventPropagation = true, rootRef, disabledIndices, modifierKeys, highlightItemOnHover = false, tag = 'div', ...elementProps } = componentProps;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const { props: defaultProps, highlightedIndex, onHighlightedIndexChange, elementsRef, onMapChange: onMapChangeUnwrapped, relayKeyboardEvent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$useCompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeRoot"])({
        itemSizes,
        cols,
        loopFocus,
        dense,
        orientation,
        highlightedIndex: highlightedIndexProp,
        onHighlightedIndexChange: onHighlightedIndexChangeProp,
        rootRef,
        stopEventPropagation,
        enableHomeAndEndKeys,
        direction,
        disabledIndices,
        modifierKeys
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])(tag, componentProps, {
        state,
        ref: refs,
        props: [
            defaultProps,
            ...props,
            elementProps
        ],
        stateAttributesMapping
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            highlightedIndex,
            onHighlightedIndexChange,
            highlightItemOnHover,
            relayKeyboardEvent
        }), [
        highlightedIndex,
        onHighlightedIndexChange,
        highlightItemOnHover,
        relayKeyboardEvent
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeRootContext"].Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeList"], {
            elementsRef: elementsRef,
            onMapChange: (newMap)=>{
                onMapChangeProp?.(newMap);
                onMapChangeUnwrapped(newMap);
            },
            children: element
        })
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/list/TabsList.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsList",
    ()=>TabsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/CompositeRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-ssr] (ecmascript)");
/**
 * Groups the individual tab buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabsList(componentProps, forwardedRef) {
    const { activateOnFocus = false, className, loopFocus = true, render, ...elementProps } = componentProps;
    const { getTabElementBySelectedValue, onValueChange, orientation, value, setTabMap, tabActivationDirection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const [highlightedTabIndex, setHighlightedTabIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const [tabsListElement, setTabsListElement] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const detectActivationDirection = useActivationDirectionDetector(value, // the old value
    orientation, tabsListElement, getTabElementBySelectedValue);
    const onTabActivation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((newValue, eventDetails)=>{
        if (newValue !== value) {
            const activationDirection = detectActivationDirection(newValue);
            eventDetails.activationDirection = activationDirection;
            onValueChange(newValue, eventDetails);
        }
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            orientation,
            tabActivationDirection
        }), [
        orientation,
        tabActivationDirection
    ]);
    const defaultProps = {
        'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
        role: 'tablist'
    };
    const tabsListContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            activateOnFocus,
            highlightedTabIndex,
            onTabActivation,
            setHighlightedTabIndex,
            tabsListElement,
            value
        }), [
        activateOnFocus,
        highlightedTabIndex,
        onTabActivation,
        setHighlightedTabIndex,
        tabsListElement,
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsListContext"].Provider, {
        value: tabsListContextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeRoot"], {
            render: render,
            className: className,
            state: state,
            refs: [
                forwardedRef,
                setTabsListElement
            ],
            props: [
                defaultProps,
                elementProps
            ],
            stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"],
            highlightedIndex: highlightedTabIndex,
            enableHomeAndEndKeys: true,
            loopFocus: loopFocus,
            orientation: orientation,
            onHighlightedIndexChange: setHighlightedTabIndex,
            onMapChange: setTabMap,
            disabledIndices: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"]
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsList.displayName = "TabsList";
function getInset(tab, tabsList) {
    const { left: tabLeft, top: tabTop } = tab.getBoundingClientRect();
    const { left: listLeft, top: listTop } = tabsList.getBoundingClientRect();
    const left = tabLeft - listLeft;
    const top = tabTop - listTop;
    return {
        left,
        top
    };
}
function useActivationDirectionDetector(// the old value
activeTabValue, orientation, tabsListElement, getTabElement) {
    const [previousTabEdge, setPreviousTabEdge] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        // Whenever orientation changes, reset the state.
        if (activeTabValue == null || tabsListElement == null) {
            setPreviousTabEdge(null);
            return;
        }
        const activeTab = getTabElement(activeTabValue);
        if (activeTab == null) {
            setPreviousTabEdge(null);
            return;
        }
        const { left, top } = getInset(activeTab, tabsListElement);
        setPreviousTabEdge(orientation === 'horizontal' ? left : top);
    }, [
        orientation,
        getTabElement,
        tabsListElement,
        activeTabValue
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((newValue)=>{
        if (newValue === activeTabValue) {
            return 'none';
        }
        if (newValue == null) {
            setPreviousTabEdge(null);
            return 'none';
        }
        if (newValue != null && tabsListElement != null) {
            const activeTabElement = getTabElement(newValue);
            if (activeTabElement != null) {
                const { left, top } = getInset(activeTabElement, tabsListElement);
                if (previousTabEdge == null) {
                    setPreviousTabEdge(orientation === 'horizontal' ? left : top);
                    return 'none';
                }
                if (orientation === 'horizontal') {
                    if (left < previousTabEdge) {
                        setPreviousTabEdge(left);
                        return 'left';
                    }
                    if (left > previousTabEdge) {
                        setPreviousTabEdge(left);
                        return 'right';
                    }
                } else if (top < previousTabEdge) {
                    setPreviousTabEdge(top);
                    return 'up';
                } else if (top > previousTabEdge) {
                    setPreviousTabEdge(top);
                    return 'down';
                }
            }
        }
        return 'none';
    }, [
        getTabElement,
        orientation,
        previousTabEdge,
        tabsListElement,
        activeTabValue
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indicator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicator"],
    "List",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"],
    "Panel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsPanel"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsRoot"],
    "Tab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$tab$2f$TabsTab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTab"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/root/TabsRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$tab$2f$TabsTab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/list/TabsList.js [app-ssr] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <export * as Tabs>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/tabs/index.parts.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=cafekit-web_309b6161._.js.map