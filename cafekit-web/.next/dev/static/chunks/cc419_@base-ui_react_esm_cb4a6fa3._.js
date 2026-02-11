(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cafekit-web/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeEventPreventable",
    ()=>makeEventPreventable,
    "mergeClassNames",
    ()=>mergeClassNames,
    "mergeProps",
    ()=>mergeProps,
    "mergePropsN",
    ()=>mergePropsN
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/mergeObjects.js [app-client] (ecmascript)");
;
const EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
    // We need to mutably own `merged`
    let merged = {
        ...resolvePropsGetter(a, EMPTY_PROPS)
    };
    if (b) {
        merged = mergeOne(merged, b);
    }
    if (c) {
        merged = mergeOne(merged, c);
    }
    if (d) {
        merged = mergeOne(merged, d);
    }
    if (e) {
        merged = mergeOne(merged, e);
    }
    return merged;
}
function mergePropsN(props) {
    if (props.length === 0) {
        return EMPTY_PROPS;
    }
    if (props.length === 1) {
        return resolvePropsGetter(props[0], EMPTY_PROPS);
    }
    // We need to mutably own `merged`
    let merged = {
        ...resolvePropsGetter(props[0], EMPTY_PROPS)
    };
    for(let i = 1; i < props.length; i += 1){
        merged = mergeOne(merged, props[i]);
    }
    return merged;
}
function mergeOne(merged, inputProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(merged);
    }
    return mutablyMergeInto(merged, inputProps);
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */ function mutablyMergeInto(mergedProps, externalProps) {
    if (!externalProps) {
        return mergedProps;
    }
    // eslint-disable-next-line guard-for-in
    for(const propName in externalProps){
        const externalPropValue = externalProps[propName];
        switch(propName){
            case 'style':
                {
                    mergedProps[propName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(mergedProps.style, externalPropValue);
                    break;
                }
            case 'className':
                {
                    mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
                    break;
                }
            default:
                {
                    if (isEventHandler(propName, externalPropValue)) {
                        mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
                    } else {
                        mergedProps[propName] = externalPropValue;
                    }
                }
        }
    }
    return mergedProps;
}
function isEventHandler(key, value) {
    // This approach is more efficient than using a regex.
    const code0 = key.charCodeAt(0);
    const code1 = key.charCodeAt(1);
    const code2 = key.charCodeAt(2);
    return code0 === 111 /* o */  && code1 === 110 /* n */  && code2 >= 65 /* A */  && code2 <= 90 /* Z */  && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
    return typeof inputProps === 'function';
}
function resolvePropsGetter(inputProps, previousProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(previousProps);
    }
    return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
    if (!theirHandler) {
        return ourHandler;
    }
    if (!ourHandler) {
        return theirHandler;
    }
    return (event)=>{
        if (isSyntheticEvent(event)) {
            const baseUIEvent = event;
            makeEventPreventable(baseUIEvent);
            const result = theirHandler(baseUIEvent);
            if (!baseUIEvent.baseUIHandlerPrevented) {
                ourHandler?.(baseUIEvent);
            }
            return result;
        }
        const result = theirHandler(event);
        ourHandler?.(event);
        return result;
    };
}
function makeEventPreventable(event) {
    event.preventBaseUIHandler = ()=>{
        event.baseUIHandlerPrevented = true;
    };
    return event;
}
function mergeClassNames(ourClassName, theirClassName) {
    if (theirClassName) {
        if (ourClassName) {
            // eslint-disable-next-line prefer-template
            return theirClassName + ' ' + ourClassName;
        }
        return theirClassName;
    }
    return ourClassName;
}
function isSyntheticEvent(event) {
    return event != null && typeof event === 'object' && 'nativeEvent' in event;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/use-render/useRender.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRender",
    ()=>useRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
;
function useRender(params) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])(params.defaultTagName ?? 'div', params, params);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/index.parts.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
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
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogRootContext",
    ()=>DialogRootContext,
    "useDialogRootContext",
    ()=>useDialogRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const DialogRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
    const dialogRootContext = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](DialogRootContext);
    if (optional === false && dialogRootContext === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.' : "TURBOPACK unreachable");
    }
    return dialogRootContext;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogBackdrop",
    ()=>DialogBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const DialogBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogBackdrop(componentProps, forwardedRef) {
    const { render, className, forceRender = false, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const mounted = store.useState('mounted');
    const transitionStatus = store.useState('transitionStatus');
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DialogBackdrop.DialogBackdrop.useMemo[state]": ()=>({
                open,
                transitionStatus
            })
    }["DialogBackdrop.DialogBackdrop.useMemo[state]"], [
        open,
        transitionStatus
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            store.context.backdropRef,
            forwardedRef
        ],
        stateAttributesMapping,
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                style: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }
            },
            elementProps
        ],
        enabled: forceRender || !nested
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogBackdrop.displayName = "DialogBackdrop";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/close/DialogClose.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogClose",
    ()=>DialogClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
'use client';
;
;
;
;
;
;
const DialogClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogClose(componentProps, forwardedRef) {
    const { render, className, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    function handleClick(event) {
        if (open) {
            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].closePress, event.nativeEvent));
        }
    }
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DialogClose.DialogClose.useMemo[state]": ()=>({
                disabled
            })
    }["DialogClose.DialogClose.useMemo[state]"], [
        disabled
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            {
                onClick: handleClick
            },
            elementProps,
            getButtonProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogClose.displayName = "DialogClose";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/description/DialogDescription.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogDescription",
    ()=>DialogDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
'use client';
;
;
;
;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogDescription(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('descriptionElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogDescription.displayName = "DialogDescription";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopupCssVars",
    ()=>DialogPopupCssVars
]);
let DialogPopupCssVars = /*#__PURE__*/ function(DialogPopupCssVars) {
    /**
   * Indicates how many dialogs are nested within.
   * @type {number}
   */ DialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
    return DialogPopupCssVars;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopupDataAttributes",
    ()=>DialogPopupDataAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)");
;
let DialogPopupDataAttributes = function(DialogPopupDataAttributes) {
    /**
   * Present when the dialog is open.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["open"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].open] = "open";
    /**
   * Present when the dialog is closed.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["closed"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].closed] = "closed";
    /**
   * Present when the dialog is animating in.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the dialog is animating out.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the dialog is nested within another dialog.
   */ DialogPopupDataAttributes["nested"] = "data-nested";
    /**
   * Present when the dialog has other open dialogs nested within it.
   */ DialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
    return DialogPopupDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPortalContext",
    ()=>DialogPortalContext,
    "useDialogPortalContext",
    ()=>useDialogPortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const DialogPortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](DialogPortalContext);
    if (value === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: <Dialog.Portal> is missing.' : "TURBOPACK unreachable");
    }
    return value;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopup",
    ()=>DialogPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingFocusManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenChangeComplete.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/composite.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    nestedDialogOpen (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPopupDataAttributes"].nestedDialogOpen]: ''
        } : null;
    }
};
const DialogPopup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogPopup(componentProps, forwardedRef) {
    const { className, finalFocus, initialFocus, render, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const descriptionElementId = store.useState('descriptionElementId');
    const disablePointerDismissal = store.useState('disablePointerDismissal');
    const floatingRootContext = store.useState('floatingRootContext');
    const rootPopupProps = store.useState('popupProps');
    const modal = store.useState('modal');
    const mounted = store.useState('mounted');
    const nested = store.useState('nested');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const open = store.useState('open');
    const openMethod = store.useState('openMethod');
    const titleElementId = store.useState('titleElementId');
    const transitionStatus = store.useState('transitionStatus');
    const role = store.useState('role');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogPortalContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.onOpenChangeComplete?.(true);
            }
        }
    });
    // Default initial focus logic:
    // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
    // (this is required for Android specifically as iOS handles this automatically).
    function defaultInitialFocus(interactionType) {
        if (interactionType === 'touch') {
            return store.context.popupRef.current;
        }
        return true;
    }
    const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DialogPopup.DialogPopup.useMemo[state]": ()=>({
                open,
                nested,
                transitionStatus,
                nestedDialogOpen
            })
    }["DialogPopup.DialogPopup.useMemo[state]"], [
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        props: [
            rootPopupProps,
            {
                'aria-labelledby': titleElementId ?? undefined,
                'aria-describedby': descriptionElementId ?? undefined,
                role,
                tabIndex: -1,
                hidden: !mounted,
                onKeyDown (event) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COMPOSITE_KEYS"].has(event.key)) {
                        event.stopPropagation();
                    }
                },
                style: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPopupCssVars"].nestedDialogs]: nestedOpenDialogCount
                }
            },
            elementProps
        ],
        ref: [
            forwardedRef,
            store.context.popupRef,
            store.useStateSetter('popupElement')
        ],
        stateAttributesMapping
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingFocusManager"], {
        context: floatingRootContext,
        openInteractionType: openMethod,
        disabled: !mounted,
        closeOnFocusOut: !disablePointerDismissal,
        initialFocus: resolvedInitialFocus,
        returnFocus: finalFocus,
        modal: modal !== false,
        restoreFocus: "popup",
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogPopup.displayName = "DialogPopup";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPortal",
    ()=>DialogPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/inertValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingPortal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/InternalBackdrop.js [app-client] (ecmascript)");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const DialogPortal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const mounted = store.useState('mounted');
    const modal = store.useState('modal');
    const open = store.useState('open');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPortalContext"].Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingPortal"], {
            ref: forwardedRef,
            ...portalProps,
            children: [
                mounted && modal === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalBackdrop"], {
                    ref: store.context.internalBackdropRef,
                    inert: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inertValue"])(!open)
                }),
                props.children
            ]
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogPortal.displayName = "DialogPortal";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/useDialogRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDialogRoot",
    ()=>useDialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useScrollLock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useScrollLock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useDismiss.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useInteractions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useRole$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useRole.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useSyncedFloatingRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenInteractionType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenInteractionType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupStoreUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupStoreUtils.js [app-client] (ecmascript)");
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
function useDialogRoot(params) {
    const { store, parentContext, actionsRef } = params;
    const open = store.useState('open');
    const disablePointerDismissal = store.useState('disablePointerDismissal');
    const modal = store.useState('modal');
    const popupElement = store.useState('popupElement');
    const { openMethod, triggerProps, reset: resetOpenInteractionType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenInteractionType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenInteractionType"])(open);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupStoreUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImplicitActiveTrigger"])(store);
    const { forceUnmount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupStoreUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenStateTransitions"])(open, store, {
        "useDialogRoot.useOpenStateTransitions": ()=>{
            resetOpenInteractionType();
        }
    }["useDialogRoot.useOpenStateTransitions"]);
    const createDialogEventDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDialogRoot.useStableCallback[createDialogEventDetails]": (reason)=>{
            const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(reason);
            details.preventUnmountOnClose = ({
                "useDialogRoot.useStableCallback[createDialogEventDetails]": ()=>{
                    store.set('preventUnmountingOnClose', true);
                }
            })["useDialogRoot.useStableCallback[createDialogEventDetails]"];
            return details;
        }
    }["useDialogRoot.useStableCallback[createDialogEventDetails]"]);
    const handleImperativeClose = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useDialogRoot.useCallback[handleImperativeClose]": ()=>{
            store.setOpen(false, createDialogEventDetails(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction));
        }
    }["useDialogRoot.useCallback[handleImperativeClose]"], [
        store,
        createDialogEventDetails
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"](actionsRef, {
        "useDialogRoot.useImperativeHandle": ()=>({
                unmount: forceUnmount,
                close: handleImperativeClose
            })
    }["useDialogRoot.useImperativeHandle"], [
        forceUnmount,
        handleImperativeClose
    ]);
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useSyncedFloatingRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncedFloatingRootContext"])({
        popupStore: store,
        onOpenChange: store.setOpen,
        treatPopupAsFloatingElement: true,
        noEmit: true
    });
    const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const isTopmost = ownNestedOpenDialogs === 0;
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useRole$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])(floatingRootContext);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDismiss"])(floatingRootContext, {
        outsidePressEvent () {
            if (store.context.internalBackdropRef.current || store.context.backdropRef.current) {
                return 'intentional';
            }
            // Ensure `aria-hidden` on outside elements is removed immediately
            // on outside press when trapping focus.
            return {
                mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
                touch: 'sloppy'
            };
        },
        outsidePress (event) {
            // For mouse events, only accept left button (button 0)
            // For touch events, a single touch is equivalent to left button
            if ('button' in event && event.button !== 0) {
                return false;
            }
            if ('touches' in event && event.touches.length !== 1) {
                return false;
            }
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            if (isTopmost && !disablePointerDismissal) {
                const eventTarget = target;
                // Only close if the click occurred on the dialog's owning backdrop.
                // This supports multiple modal dialogs that aren't nested in the React tree:
                // https://github.com/mui/base-ui/issues/1320
                if (modal) {
                    return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === eventTarget || store.context.backdropRef.current === eventTarget || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(eventTarget, popupElement) && !eventTarget?.hasAttribute('data-base-ui-portal') : true;
                }
                return true;
            }
            return false;
        },
        escapeKey: isTopmost
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useScrollLock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollLock"])(open && modal === true, popupElement);
    const { getReferenceProps, getFloatingProps, getTriggerProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInteractions"])([
        role,
        dismiss
    ]);
    // Listen for nested open/close events on this store to maintain the count
    store.useContextCallback('onNestedDialogOpen', {
        "useDialogRoot.useContextCallback": (ownChildrenCount)=>{
            setOwnNestedOpenDialogs(ownChildrenCount + 1);
        }
    }["useDialogRoot.useContextCallback"]);
    store.useContextCallback('onNestedDialogClose', {
        "useDialogRoot.useContextCallback": ()=>{
            setOwnNestedOpenDialogs(0);
        }
    }["useDialogRoot.useContextCallback"]);
    // Notify parent of our open/close state using parent callbacks, if any
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useDialogRoot.useEffect": ()=>{
            if (parentContext?.onNestedDialogOpen && open) {
                parentContext.onNestedDialogOpen(ownNestedOpenDialogs);
            }
            if (parentContext?.onNestedDialogClose && !open) {
                parentContext.onNestedDialogClose();
            }
            return ({
                "useDialogRoot.useEffect": ()=>{
                    if (parentContext?.onNestedDialogClose && open) {
                        parentContext.onNestedDialogClose();
                    }
                }
            })["useDialogRoot.useEffect"];
        }
    }["useDialogRoot.useEffect"], [
        open,
        parentContext,
        ownNestedOpenDialogs
    ]);
    const activeTriggerProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDialogRoot.useMemo[activeTriggerProps]": ()=>getReferenceProps(triggerProps)
    }["useDialogRoot.useMemo[activeTriggerProps]"], [
        getReferenceProps,
        triggerProps
    ]);
    const inactiveTriggerProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDialogRoot.useMemo[inactiveTriggerProps]": ()=>getTriggerProps(triggerProps)
    }["useDialogRoot.useMemo[inactiveTriggerProps]"], [
        getTriggerProps,
        triggerProps
    ]);
    const popupProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDialogRoot.useMemo[popupProps]": ()=>getFloatingProps()
    }["useDialogRoot.useMemo[popupProps]"], [
        getFloatingProps
    ]);
    store.useSyncedValues({
        openMethod,
        activeTriggerProps,
        inactiveTriggerProps,
        popupProps,
        floatingRootContext,
        nestedOpenDialogCount: ownNestedOpenDialogs
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/store/DialogStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogStore",
    ()=>DialogStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/createSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$ReactStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/ReactStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupTriggerMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js [app-client] (ecmascript)");
;
;
;
const selectors = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStoreSelectors"],
    modal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.modal),
    nested: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nested),
    nestedOpenDialogCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nestedOpenDialogCount),
    disablePointerDismissal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.disablePointerDismissal),
    openMethod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.openMethod),
    descriptionElementId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.descriptionElementId),
    titleElementId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.titleElementId),
    viewportElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.viewportElement),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.role)
};
class DialogStore extends __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$ReactStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactStore"] {
    constructor(initialState){
        super(createInitialState(initialState), {
            popupRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"](),
            backdropRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"](),
            internalBackdropRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"](),
            triggerElements: new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupTriggerMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopupTriggerMap"](),
            onOpenChange: undefined,
            onOpenChangeComplete: undefined
        }, selectors);
    }
    setOpen = (nextOpen, eventDetails)=>{
        eventDetails.preventUnmountOnClose = ()=>{
            this.set('preventUnmountingOnClose', true);
        };
        if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) {
            // When closing the dialog, pass the old trigger to the onOpenChange event
            // so it's not reset too early (potentially causing focus issues in controlled scenarios).
            eventDetails.trigger = this.state.activeTriggerElement ?? undefined;
        }
        this.context.onOpenChange?.(nextOpen, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        const details = {
            open: nextOpen,
            nativeEvent: eventDetails.event,
            reason: eventDetails.reason,
            nested: this.state.nested
        };
        this.state.floatingRootContext.context.events?.emit('openchange', details);
        const updatedState = {
            open: nextOpen
        };
        // If a popup is closing, the `trigger` may be null.
        // We want to keep the previous value so that exit animations are played and focus is returned correctly.
        const newTriggerId = eventDetails.trigger?.id ?? null;
        if (newTriggerId || nextOpen) {
            updatedState.activeTriggerId = newTriggerId;
            updatedState.activeTriggerElement = eventDetails.trigger ?? null;
        }
        this.update(updatedState);
    };
}
function createInitialState(initialState = {}) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialPopupStoreState"])(),
        modal: true,
        disablePointerDismissal: false,
        popupElement: null,
        viewportElement: null,
        descriptionElementId: undefined,
        titleElementId: undefined,
        openMethod: null,
        nested: false,
        nestedOpenDialogCount: 0,
        role: 'dialog',
        ...initialState
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogRoot",
    ()=>DialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useRefWithInit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$useDialogRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/useDialogRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/store/DialogStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function DialogRoot(props) {
    const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, disablePointerDismissal = false, modal = true, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
    const parentDialogRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])(true);
    const nested = Boolean(parentDialogRootContext);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "DialogRoot.useRefWithInit": ()=>{
            return handle?.store ?? new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogStore"]({
                open: openProp ?? defaultOpen,
                activeTriggerId: triggerIdProp !== undefined ? triggerIdProp : defaultTriggerIdProp,
                modal,
                disablePointerDismissal,
                nested
            });
        }
    }["DialogRoot.useRefWithInit"]).current;
    store.useControlledProp('open', openProp, defaultOpen);
    store.useControlledProp('activeTriggerId', triggerIdProp, defaultTriggerIdProp);
    store.useSyncedValues({
        disablePointerDismissal,
        nested,
        modal
    });
    store.useContextCallback('onOpenChange', onOpenChange);
    store.useContextCallback('onOpenChangeComplete', onOpenChangeComplete);
    const payload = store.useState('payload');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$useDialogRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRoot"])({
        store,
        actionsRef,
        parentContext: parentDialogRootContext?.store.context,
        onOpenChange,
        triggerIdProp
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DialogRoot.useMemo[contextValue]": ()=>({
                store
            })
    }["DialogRoot.useMemo[contextValue]"], [
        store
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogRootContext"].Provider, {
        value: contextValue,
        children: typeof children === 'function' ? children({
            payload
        }) : children
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewportDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogViewportDataAttributes",
    ()=>DialogViewportDataAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)");
;
let DialogViewportDataAttributes = function(DialogViewportDataAttributes) {
    /**
   * Present when the dialog is open.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["open"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].open] = "open";
    /**
   * Present when the dialog is closed.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["closed"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].closed] = "closed";
    /**
   * Present when the dialog is animating in.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the dialog is animating out.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the dialog is nested within another dialog.
   */ DialogViewportDataAttributes["nested"] = "data-nested";
    /**
   * Present when the dialog has other open dialogs nested within it.
   */ DialogViewportDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
    return DialogViewportDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogViewport",
    ()=>DialogViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$viewport$2f$DialogViewportDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewportDataAttributes.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    nested (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$viewport$2f$DialogViewportDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogViewportDataAttributes"].nested]: ''
        } : null;
    },
    nestedDialogOpen (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$viewport$2f$DialogViewportDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogViewportDataAttributes"].nestedDialogOpen]: ''
        } : null;
    }
};
const DialogViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogViewport(componentProps, forwardedRef) {
    const { className, render, children, ...elementProps } = componentProps;
    const keepMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogPortalContext"])();
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const transitionStatus = store.useState('transitionStatus');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const mounted = store.useState('mounted');
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DialogViewport.DialogViewport.useMemo[state]": ()=>({
                open,
                nested,
                transitionStatus,
                nestedDialogOpen
            })
    }["DialogViewport.DialogViewport.useMemo[state]"], [
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    ]);
    const shouldRender = keepMounted || mounted;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        enabled: shouldRender,
        state,
        ref: [
            forwardedRef,
            store.useStateSetter('viewportElement')
        ],
        stateAttributesMapping,
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                children
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogViewport.displayName = "DialogViewport";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTitle",
    ()=>DialogTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
'use client';
;
;
;
;
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTitle(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('titleElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('h2', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogTitle.displayName = "DialogTitle";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/constants.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupStoreUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupStoreUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useClick.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useInteractions.js [app-client] (ecmascript)");
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
const DialogTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTrigger(componentProps, forwardedRef) {
    const { render, className, disabled = false, nativeButton = true, id: idProp, payload, handle, ...elementProps } = componentProps;
    const dialogRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])(true);
    const store = handle?.store ?? dialogRootContext?.store;
    if (!store) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle.' : "TURBOPACK unreachable");
    }
    const thisTriggerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const floatingContext = store.useState('floatingRootContext');
    const isOpenedByThisTrigger = store.useState('isOpenedByTrigger', thisTriggerId);
    const triggerElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const { registerTrigger, isMountedByThisTrigger } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupStoreUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTriggerDataForwarding"])(thisTriggerId, triggerElementRef, store, {
        payload
    });
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    const click = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClick"])(floatingContext, {
        enabled: floatingContext != null
    });
    const localInteractionProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInteractions"])([
        click
    ]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DialogTrigger.DialogTrigger.useMemo[state]": ()=>({
                disabled,
                open: isOpenedByThisTrigger
            })
    }["DialogTrigger.DialogTrigger.useMemo[state]"], [
        disabled,
        isOpenedByThisTrigger
    ]);
    const rootTriggerProps = store.useState('triggerProps', isMountedByThisTrigger);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            buttonRef,
            forwardedRef,
            registerTrigger,
            triggerElementRef
        ],
        props: [
            localInteractionProps.getReferenceProps(),
            rootTriggerProps,
            {
                [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CLICK_TRIGGER_IDENTIFIER"]]: '',
                id: thisTriggerId
            },
            elementProps,
            getButtonProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["triggerOpenStateMapping"]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogTrigger.displayName = "DialogTrigger";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/store/DialogHandle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogHandle",
    ()=>DialogHandle,
    "createDialogHandle",
    ()=>createDialogHandle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/store/DialogStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
;
;
;
class DialogHandle {
    /**
   * Internal store holding the dialog state.
   * @internal
   */ constructor(store){
        this.store = store ?? new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogStore"]();
    }
    /**
   * Opens the dialog and associates it with the trigger with the given id.
   * The trigger, if provided, must be a Dialog.Trigger component with this handle passed as a prop.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   *
   * @param triggerId ID of the trigger to associate with the dialog. If null, the dialog will open without a trigger association.
   */ open(triggerId) {
        const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : undefined;
        if ("TURBOPACK compile-time truthy", 1) {
            if (triggerId && !triggerElement) {
                console.warn(`Base UI: DialogHandle.open: No trigger found with id "${triggerId}". The dialog will open, but the trigger will not be associated with the dialog.`);
            }
        }
        this.store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction, undefined, triggerElement));
    }
    /**
   * Opens the dialog and sets the payload.
   * Does not associate the dialog with any trigger.
   *
   * @param payload Payload to set when opening the dialog.
   */ openWithPayload(payload) {
        this.store.set('payload', payload);
        this.store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction, undefined, undefined));
    }
    /**
   * Closes the dialog.
   */ close() {
        this.store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction, undefined, undefined));
    }
    /**
   * Indicates whether the dialog is currently open.
   */ get isOpen() {
        return this.store.state.open;
    }
}
function createDialogHandle() {
    return new DialogHandle();
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/index.parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Backdrop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$backdrop$2f$DialogBackdrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"],
    "Close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$close$2f$DialogClose$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogClose"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$description$2f$DialogDescription$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"],
    "Handle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogHandle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHandle"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPopup"],
    "Portal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPortal"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogRoot"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$title$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"],
    "Trigger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$trigger$2f$DialogTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTrigger"],
    "Viewport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$viewport$2f$DialogViewport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogViewport"],
    "createHandle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogHandle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDialogHandle"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/index.parts.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$backdrop$2f$DialogBackdrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$close$2f$DialogClose$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/close/DialogClose.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$description$2f$DialogDescription$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/description/DialogDescription.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$viewport$2f$DialogViewport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$title$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$trigger$2f$DialogTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$store$2f$DialogHandle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/store/DialogHandle.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/index.parts.js [app-client] (ecmascript) <export * as Dialog>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/dialog/index.parts.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRootContext",
    ()=>CompositeRootContext,
    "useCompositeRootContext",
    ()=>useCompositeRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CompositeRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CompositeRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/composite.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_KEYS",
    ()=>ALL_KEYS,
    "ALT",
    ()=>ALT,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_KEYS",
    ()=>ARROW_KEYS,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "COMPOSITE_KEYS",
    ()=>COMPOSITE_KEYS,
    "CONTROL",
    ()=>CONTROL,
    "END",
    ()=>END,
    "HOME",
    ()=>HOME,
    "HORIZONTAL_KEYS",
    ()=>HORIZONTAL_KEYS,
    "HORIZONTAL_KEYS_WITH_EXTRA_KEYS",
    ()=>HORIZONTAL_KEYS_WITH_EXTRA_KEYS,
    "META",
    ()=>META,
    "MODIFIER_KEYS",
    ()=>MODIFIER_KEYS,
    "SHIFT",
    ()=>SHIFT,
    "VERTICAL_KEYS",
    ()=>VERTICAL_KEYS,
    "VERTICAL_KEYS_WITH_EXTRA_KEYS",
    ()=>VERTICAL_KEYS_WITH_EXTRA_KEYS,
    "isNativeInput",
    ()=>isNativeInput,
    "scrollIntoViewIfNeeded",
    ()=>scrollIntoViewIfNeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
;
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const HOME = 'Home';
const END = 'End';
const HORIZONTAL_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT
]);
const HORIZONTAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const VERTICAL_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN
]);
const VERTICAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    HOME,
    END
]);
const ARROW_KEYS = new Set([
    ...HORIZONTAL_KEYS,
    ...VERTICAL_KEYS
]);
const ALL_KEYS = new Set([
    ...ARROW_KEYS,
    HOME,
    END
]);
const COMPOSITE_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const SHIFT = 'Shift';
const CONTROL = 'Control';
const ALT = 'Alt';
const META = 'Meta';
const MODIFIER_KEYS = new Set([
    SHIFT,
    CONTROL,
    ALT,
    META
]);
function isInputElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'INPUT';
}
function isNativeInput(element) {
    if (isInputElement(element) && element.selectionStart != null) {
        return true;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'TEXTAREA') {
        return true;
    }
    return false;
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
    if (!scrollContainer || !element || !element.scrollTo) {
        return;
    }
    let targetX = scrollContainer.scrollLeft;
    let targetY = scrollContainer.scrollTop;
    const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
    const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;
    if (isOverflowingX && orientation !== 'vertical') {
        const elementOffsetLeft = getOffset(scrollContainer, element, 'left');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (direction === 'ltr') {
            if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            } else if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            }
        }
        if (direction === 'rtl') {
            if (elementOffsetLeft - elementStyles.scrollMarginRight < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            } else if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            }
        }
    }
    if (isOverflowingY && orientation !== 'horizontal') {
        const elementOffsetTop = getOffset(scrollContainer, element, 'top');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (elementOffsetTop - elementStyles.scrollMarginTop < scrollContainer.scrollTop + containerStyles.scrollPaddingTop) {
            // overflow upwards, align top edges
            targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop;
        } else if (elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom > scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom) {
            // overflow downwards, align bottom edges
            targetY = elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom - scrollContainer.clientHeight + containerStyles.scrollPaddingBottom;
        }
    }
    scrollContainer.scrollTo({
        left: targetX,
        top: targetY,
        behavior: 'auto'
    });
}
function getOffset(ancestor, element, side) {
    const propName = side === 'left' ? 'offsetLeft' : 'offsetTop';
    let result = 0;
    while(element.offsetParent){
        result += element[propName];
        if (element.offsetParent === ancestor) {
            break;
        }
        element = element.offsetParent;
    }
    return result;
}
function getStyles(element) {
    const styles = getComputedStyle(element);
    return {
        scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
        scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
        scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
        scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
        scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
        scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
        scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
        scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeListContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeListContext",
    ()=>CompositeListContext,
    "useCompositeListContext",
    ()=>useCompositeListContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const CompositeListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    register: ()=>{},
    unregister: ()=>{},
    subscribeMapChange: ()=>{
        return ()=>{};
    },
    elementsRef: {
        current: []
    },
    nextIndexRef: {
        current: 0
    }
});
if ("TURBOPACK compile-time truthy", 1) CompositeListContext.displayName = "CompositeListContext";
function useCompositeListContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CompositeListContext);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeList.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeList",
    ()=>CompositeList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useRefWithInit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeListContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
/* eslint-disable no-bitwise */ 'use client';
;
;
;
;
;
;
function CompositeList(props) {
    const { children, elementsRef, labelsRef, onMapChange: onMapChangeProp } = props;
    const onMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(onMapChangeProp);
    const nextIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])(createListeners).current;
    // We use a stable `map` to avoid O(n^2) re-allocation costs for large lists.
    // `mapTick` is our re-render trigger mechanism. We also need to update the
    // elements and label refs, but there's a lot of async work going on and sometimes
    // the effect that handles `onMapChange` gets called after those refs have been
    // filled, and we don't want to lose those values by setting their lengths to `0`.
    // We also need to have them at the proper length because floating-ui uses that
    // information for list navigation.
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])(createMap).current;
    // `mapTick` uses a counter rather than objects for low precision-loss risk and better memory efficiency
    const [mapTick, setMapTick] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const lastTickRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](mapTick);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "CompositeList.useStableCallback[register]": (node, metadata)=>{
            map.set(node, metadata ?? null);
            lastTickRef.current += 1;
            setMapTick(lastTickRef.current);
        }
    }["CompositeList.useStableCallback[register]"]);
    const unregister = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "CompositeList.useStableCallback[unregister]": (node)=>{
            map.delete(node);
            lastTickRef.current += 1;
            setMapTick(lastTickRef.current);
        }
    }["CompositeList.useStableCallback[unregister]"]);
    const sortedMap = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CompositeList.useMemo[sortedMap]": ()=>{
            // `mapTick` is the `useMemo` trigger as `map` is stable.
            disableEslintWarning(mapTick);
            const newMap = new Map();
            // Filter out disconnected elements before sorting to avoid inconsistent
            // compareDocumentPosition results when elements are detached from the DOM.
            const sortedNodes = Array.from(map.keys()).filter({
                "CompositeList.useMemo[sortedMap].sortedNodes": (node)=>node.isConnected
            }["CompositeList.useMemo[sortedMap].sortedNodes"]).sort(sortByDocumentPosition);
            sortedNodes.forEach({
                "CompositeList.useMemo[sortedMap]": (node, index)=>{
                    const metadata = map.get(node) ?? {};
                    newMap.set(node, {
                        ...metadata,
                        index
                    });
                }
            }["CompositeList.useMemo[sortedMap]"]);
            return newMap;
        }
    }["CompositeList.useMemo[sortedMap]"], [
        map,
        mapTick
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            if (typeof MutationObserver !== 'function' || sortedMap.size === 0) {
                return undefined;
            }
            const mutationObserver = new MutationObserver({
                "CompositeList.useIsoLayoutEffect": (entries)=>{
                    const diff = new Set();
                    const updateDiff = {
                        "CompositeList.useIsoLayoutEffect.updateDiff": (node)=>diff.has(node) ? diff.delete(node) : diff.add(node)
                    }["CompositeList.useIsoLayoutEffect.updateDiff"];
                    entries.forEach({
                        "CompositeList.useIsoLayoutEffect": (entry)=>{
                            entry.removedNodes.forEach(updateDiff);
                            entry.addedNodes.forEach(updateDiff);
                        }
                    }["CompositeList.useIsoLayoutEffect"]);
                    if (diff.size === 0) {
                        lastTickRef.current += 1;
                        setMapTick(lastTickRef.current);
                    }
                }
            }["CompositeList.useIsoLayoutEffect"]);
            sortedMap.forEach({
                "CompositeList.useIsoLayoutEffect": (_, node)=>{
                    if (node.parentElement) {
                        mutationObserver.observe(node.parentElement, {
                            childList: true
                        });
                    }
                }
            }["CompositeList.useIsoLayoutEffect"]);
            return ({
                "CompositeList.useIsoLayoutEffect": ()=>{
                    mutationObserver.disconnect();
                }
            })["CompositeList.useIsoLayoutEffect"];
        }
    }["CompositeList.useIsoLayoutEffect"], [
        sortedMap
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            const shouldUpdateLengths = lastTickRef.current === mapTick;
            if (shouldUpdateLengths) {
                if (elementsRef.current.length !== sortedMap.size) {
                    elementsRef.current.length = sortedMap.size;
                }
                if (labelsRef && labelsRef.current.length !== sortedMap.size) {
                    labelsRef.current.length = sortedMap.size;
                }
                nextIndexRef.current = sortedMap.size;
            }
            onMapChange(sortedMap);
        }
    }["CompositeList.useIsoLayoutEffect"], [
        onMapChange,
        sortedMap,
        elementsRef,
        labelsRef,
        mapTick
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            return ({
                "CompositeList.useIsoLayoutEffect": ()=>{
                    elementsRef.current = [];
                }
            })["CompositeList.useIsoLayoutEffect"];
        }
    }["CompositeList.useIsoLayoutEffect"], [
        elementsRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            return ({
                "CompositeList.useIsoLayoutEffect": ()=>{
                    if (labelsRef) {
                        labelsRef.current = [];
                    }
                }
            })["CompositeList.useIsoLayoutEffect"];
        }
    }["CompositeList.useIsoLayoutEffect"], [
        labelsRef
    ]);
    const subscribeMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "CompositeList.useStableCallback[subscribeMapChange]": (fn)=>{
            listeners.add(fn);
            return ({
                "CompositeList.useStableCallback[subscribeMapChange]": ()=>{
                    listeners.delete(fn);
                }
            })["CompositeList.useStableCallback[subscribeMapChange]"];
        }
    }["CompositeList.useStableCallback[subscribeMapChange]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            listeners.forEach({
                "CompositeList.useIsoLayoutEffect": (l)=>l(sortedMap)
            }["CompositeList.useIsoLayoutEffect"]);
        }
    }["CompositeList.useIsoLayoutEffect"], [
        listeners,
        sortedMap
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CompositeList.useMemo[contextValue]": ()=>({
                register,
                unregister,
                subscribeMapChange,
                elementsRef,
                labelsRef,
                nextIndexRef
            })
    }["CompositeList.useMemo[contextValue]"], [
        register,
        unregister,
        subscribeMapChange,
        elementsRef,
        labelsRef,
        nextIndexRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompositeListContext"].Provider, {
        value: contextValue,
        children: children
    });
}
function createMap() {
    return new Map();
}
function createListeners() {
    return new Set();
}
function sortByDocumentPosition(a, b) {
    const position = a.compareDocumentPosition(b);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
    }
    return 0;
}
function disableEslintWarning(_) {}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/useCompositeListItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexGuessBehavior",
    ()=>IndexGuessBehavior,
    "useCompositeListItem",
    ()=>useCompositeListItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeListContext.js [app-client] (ecmascript)");
'use client';
;
;
;
let IndexGuessBehavior = /*#__PURE__*/ function(IndexGuessBehavior) {
    IndexGuessBehavior[IndexGuessBehavior["None"] = 0] = "None";
    IndexGuessBehavior[IndexGuessBehavior["GuessFromOrder"] = 1] = "GuessFromOrder";
    return IndexGuessBehavior;
}({});
function useCompositeListItem(params = {}) {
    const { label, metadata, textRef, indexGuessBehavior, index: externalIndex } = params;
    const { register, unregister, subscribeMapChange, elementsRef, labelsRef, nextIndexRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeListContext"])();
    const indexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](-1);
    const [index, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](externalIndex ?? (indexGuessBehavior === IndexGuessBehavior.GuessFromOrder ? ({
        "useCompositeListItem.useState": ()=>{
            if (indexRef.current === -1) {
                const newIndex = nextIndexRef.current;
                nextIndexRef.current += 1;
                indexRef.current = newIndex;
            }
            return indexRef.current;
        }
    })["useCompositeListItem.useState"] : -1));
    const componentRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useCompositeListItem.useCallback[ref]": (node)=>{
            componentRef.current = node;
            if (index !== -1 && node !== null) {
                elementsRef.current[index] = node;
                if (labelsRef) {
                    const isLabelDefined = label !== undefined;
                    labelsRef.current[index] = isLabelDefined ? label : textRef?.current?.textContent ?? node.textContent;
                }
            }
        }
    }["useCompositeListItem.useCallback[ref]"], [
        index,
        elementsRef,
        labelsRef,
        label,
        textRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useCompositeListItem.useIsoLayoutEffect": ()=>{
            if (externalIndex != null) {
                return undefined;
            }
            const node = componentRef.current;
            if (node) {
                register(node, metadata);
                return ({
                    "useCompositeListItem.useIsoLayoutEffect": ()=>{
                        unregister(node);
                    }
                })["useCompositeListItem.useIsoLayoutEffect"];
            }
            return undefined;
        }
    }["useCompositeListItem.useIsoLayoutEffect"], [
        externalIndex,
        register,
        unregister,
        metadata
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useCompositeListItem.useIsoLayoutEffect": ()=>{
            if (externalIndex != null) {
                return undefined;
            }
            return subscribeMapChange({
                "useCompositeListItem.useIsoLayoutEffect": (map)=>{
                    const i = componentRef.current ? map.get(componentRef.current)?.index : null;
                    if (i != null) {
                        setIndex(i);
                    }
                }
            }["useCompositeListItem.useIsoLayoutEffect"]);
        }
    }["useCompositeListItem.useIsoLayoutEffect"], [
        externalIndex,
        subscribeMapChange,
        setIndex
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useCompositeListItem.useMemo": ()=>({
                ref,
                index
            })
    }["useCompositeListItem.useMemo"], [
        index,
        ref
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/item/useCompositeItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompositeItem",
    ()=>useCompositeItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/useCompositeListItem.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function useCompositeItem(params = {}) {
    const { highlightItemOnHover, highlightedIndex, onHighlightedIndexChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRootContext"])();
    const { ref, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeListItem"])(params);
    const isHighlighted = highlightedIndex === index;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, itemRef);
    const compositeProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useCompositeItem.useMemo[compositeProps]": ()=>({
                tabIndex: isHighlighted ? 0 : -1,
                onFocus () {
                    onHighlightedIndexChange(index);
                },
                onMouseMove () {
                    const item = itemRef.current;
                    if (!highlightItemOnHover || !item) {
                        return;
                    }
                    const disabled = item.hasAttribute('disabled') || item.ariaDisabled === 'true';
                    if (!isHighlighted && !disabled) {
                        item.focus();
                    }
                }
            })
    }["useCompositeItem.useMemo[compositeProps]"], [
        isHighlighted,
        onHighlightedIndexChange,
        index,
        highlightItemOnHover
    ]);
    return {
        compositeProps,
        compositeRef: mergedRef,
        index
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/item/CompositeItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeItem",
    ()=>CompositeItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/item/useCompositeItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
'use client';
;
;
;
function CompositeItem(componentProps) {
    const { render, className, state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], props = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], refs = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], metadata, stateAttributesMapping, tag = 'div', ...elementProps } = componentProps;
    const { compositeProps, compositeRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeItem"])({
        metadata
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])(tag, componentProps, {
        state,
        ref: [
            ...refs,
            compositeRef
        ],
        props: [
            compositeProps,
            ...props,
            elementProps
        ],
        stateAttributesMapping
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useButton",
    ()=>useButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useFocusableWhenDisabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useFocusableWhenDisabled.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true } = parameters;
    const elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const isCompositeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRootContext"])(true) !== undefined;
    const isValidLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useButton.useStableCallback[isValidLink]": ()=>{
            const element = elementRef.current;
            return Boolean(element?.tagName === 'A' && element?.href);
        }
    }["useButton.useStableCallback[isValidLink]"]);
    const { props: focusableWhenDisabledProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useFocusableWhenDisabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusableWhenDisabled"])({
        focusableWhenDisabled,
        disabled,
        composite: isCompositeItem,
        tabIndex,
        isNativeButton
    });
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
            "useButton.useEffect": ()=>{
                if (!elementRef.current) {
                    return;
                }
                const isButtonTag = elementRef.current.tagName === 'BUTTON';
                if (isNativeButton) {
                    if (!isButtonTag) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('A component that acts as a button was not rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is a real <button>, or set the `nativeButton` prop on the component to `false`.');
                    }
                } else if (isButtonTag) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('A component that acts as a button was rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is not a real <button>, or set the `nativeButton` prop on the component to `true`.');
                }
            }
        }["useButton.useEffect"], [
            isNativeButton
        ]);
    }
    // handles a disabled composite button rendering another button, e.g.
    // <Toolbar.Button disabled render={<Menu.Trigger />} />
    // the `disabled` prop needs to pass through 2 `useButton`s then finally
    // delete the `disabled` attribute from DOM
    const updateDisabled = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[updateDisabled]": ()=>{
            const element = elementRef.current;
            if (!isButtonElement(element)) {
                return;
            }
            if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
                element.disabled = false;
            }
        }
    }["useButton.useCallback[updateDisabled]"], [
        disabled,
        focusableWhenDisabledProps.disabled,
        isCompositeItem
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(updateDisabled, [
        updateDisabled
    ]);
    const getButtonProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[getButtonProps]": (externalProps = {})=>{
            const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
            const type = isNativeButton ? 'button' : undefined;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
                type,
                onClick (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnClick?.(event);
                },
                onMouseDown (event) {
                    if (!disabled) {
                        externalOnMouseDown?.(event);
                    }
                },
                onKeyDown (event) {
                    if (!disabled) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                        externalOnKeyDown?.(event);
                    }
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    const shouldClick = event.target === event.currentTarget && !isNativeButton && !isValidLink() && !disabled;
                    const isEnterKey = event.key === 'Enter';
                    const isSpaceKey = event.key === ' ';
                    // Keyboard accessibility for non interactive elements
                    if (shouldClick) {
                        if (isSpaceKey || isEnterKey) {
                            event.preventDefault();
                        }
                        if (isEnterKey) {
                            externalOnClick?.(event);
                        }
                    }
                },
                onKeyUp (event) {
                    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
                    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
                    // Keyboard accessibility for non interactive elements
                    if (!disabled) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                        externalOnKeyUp?.(event);
                    }
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    if (event.target === event.currentTarget && !isNativeButton && !disabled && event.key === ' ') {
                        externalOnClick?.(event);
                    }
                },
                onPointerDown (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnPointerDown?.(event);
                }
            }, !isNativeButton ? {
                role: 'button'
            } : undefined, focusableWhenDisabledProps, otherExternalProps);
        }
    }["useButton.useCallback[getButtonProps]"], [
        disabled,
        focusableWhenDisabledProps,
        isNativeButton,
        isValidLink
    ]);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useButton.useStableCallback[buttonRef]": (element)=>{
            elementRef.current = element;
            updateDisabled();
        }
    }["useButton.useStableCallback[buttonRef]"]);
    return {
        getButtonProps,
        buttonRef
    };
}
function isButtonElement(elem) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(elem) && elem.tagName === 'BUTTON';
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/index.parts.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
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
;
;
;
;
;
;
;
;
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/root/AutocompleteRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutocompleteRoot",
    ()=>AutocompleteRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$AriaCombobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/AriaCombobox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$useFilter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/useFilter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveValueLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
/**
 * Groups all parts of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function AutocompleteRoot(props) {
    const { openOnInputClick = false, value, defaultValue, onValueChange, mode = 'list', itemToStringValue, ...other } = props;
    const enableInline = mode === 'inline' || mode === 'both';
    const staticItems = mode === 'inline' || mode === 'none';
    // Mirror the typed value for uncontrolled usage so we can compose the temporary
    // inline input value.
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultValue ?? '');
    const [inlineInputValue, setInlineInputValue] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AutocompleteRoot.useEffect": ()=>{
            if (isControlled) {
                setInlineInputValue('');
            }
        }
    }["AutocompleteRoot.useEffect"], [
        value,
        isControlled
    ]);
    // Compose the input value shown to the user: inline value takes precedence when present.
    let resolvedInputValue;
    if (enableInline && inlineInputValue !== '') {
        resolvedInputValue = inlineInputValue;
    } else if (isControlled) {
        resolvedInputValue = value ?? '';
    } else {
        resolvedInputValue = internalValue;
    }
    const handleValueChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "AutocompleteRoot.useStableCallback[handleValueChange]": (nextValue, eventDetails)=>{
            setInlineInputValue('');
            if (!isControlled) {
                setInternalValue(nextValue);
            }
            onValueChange?.(nextValue, eventDetails);
        }
    }["AutocompleteRoot.useStableCallback[handleValueChange]"]);
    const collator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$useFilter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCoreFilter"])();
    const baseFilter = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AutocompleteRoot.useMemo[baseFilter]": ()=>{
            if (other.filter) {
                return other.filter;
            }
            return ({
                "AutocompleteRoot.useMemo[baseFilter]": (item, query, toString)=>{
                    return collator.contains((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, toString), query);
                }
            })["AutocompleteRoot.useMemo[baseFilter]"];
        }
    }["AutocompleteRoot.useMemo[baseFilter]"], [
        other,
        collator
    ]);
    const resolvedQuery = String(isControlled ? value : internalValue).trim();
    // In "both", wrap filtering to use only the typed value, ignoring the inline value.
    const resolvedFilter = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AutocompleteRoot.useMemo[resolvedFilter]": ()=>{
            if (mode !== 'both') {
                return staticItems ? null : other.filter;
            }
            return ({
                "AutocompleteRoot.useMemo[resolvedFilter]": (item, _query, toString)=>{
                    return baseFilter(item, resolvedQuery, toString);
                }
            })["AutocompleteRoot.useMemo[resolvedFilter]"];
        }
    }["AutocompleteRoot.useMemo[resolvedFilter]"], [
        baseFilter,
        mode,
        other.filter,
        resolvedQuery,
        staticItems
    ]);
    const handleItemHighlighted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "AutocompleteRoot.useStableCallback[handleItemHighlighted]": (highlightedValue, eventDetails)=>{
            props.onItemHighlighted?.(highlightedValue, eventDetails);
            if (eventDetails.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].pointer) {
                return;
            }
            if (enableInline) {
                if (highlightedValue == null) {
                    setInlineInputValue('');
                } else {
                    setInlineInputValue((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(highlightedValue, itemToStringValue));
                }
            } else {
                setInlineInputValue('');
            }
        }
    }["AutocompleteRoot.useStableCallback[handleItemHighlighted]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$AriaCombobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AriaCombobox"], {
        ...other,
        itemToStringLabel: itemToStringValue,
        openOnInputClick: openOnInputClick,
        selectionMode: "none",
        fillInputOnItemPress: true,
        filter: resolvedFilter,
        autoComplete: mode,
        inputValue: resolvedInputValue,
        defaultInputValue: defaultValue,
        onInputValueChange: handleValueChange,
        onItemHighlighted: handleItemHighlighted
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/value/AutocompleteValue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutocompleteValue",
    ()=>AutocompleteValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-client] (ecmascript)");
/**
 * The current value of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
function AutocompleteValue(props) {
    const { children } = props;
    const inputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComboboxInputValueContext"])();
    let returnValue = null;
    if (typeof children === 'function') {
        returnValue = children(String(inputValue));
    } else if (children != null) {
        returnValue = children;
    } else {
        returnValue = inputValue;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: returnValue
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/index.parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Arrow",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$arrow$2f$ComboboxArrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxArrow"],
    "Backdrop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$backdrop$2f$ComboboxBackdrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxBackdrop"],
    "Clear",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$clear$2f$ComboboxClear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxClear"],
    "Collection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$ComboboxCollection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxCollection"],
    "Empty",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$empty$2f$ComboboxEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxEmpty"],
    "Group",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2f$ComboboxGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxGroup"],
    "GroupLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2d$label$2f$ComboboxGroupLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxGroupLabel"],
    "Icon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$icon$2f$ComboboxIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxIcon"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$input$2f$ComboboxInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxInput"],
    "Item",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$item$2f$ComboboxItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxItem"],
    "List",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$list$2f$ComboboxList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxList"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$popup$2f$ComboboxPopup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxPopup"],
    "Portal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$portal$2f$ComboboxPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxPortal"],
    "Positioner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositioner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxPositioner"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$root$2f$AutocompleteRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteRoot"],
    "Row",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$row$2f$ComboboxRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxRow"],
    "Separator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$separator$2f$Separator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"],
    "Status",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$status$2f$ComboboxStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxStatus"],
    "Trigger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$trigger$2f$ComboboxTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxTrigger"],
    "Value",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$value$2f$AutocompleteValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteValue"],
    "useFilter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$useFilter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCoreFilter"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/index.parts.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$root$2f$AutocompleteRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/root/AutocompleteRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$value$2f$AutocompleteValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/value/AutocompleteValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$trigger$2f$ComboboxTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/trigger/ComboboxTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$input$2f$ComboboxInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/input/ComboboxInput.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$icon$2f$ComboboxIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/icon/ComboboxIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$clear$2f$ComboboxClear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/clear/ComboboxClear.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$list$2f$ComboboxList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/list/ComboboxList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$status$2f$ComboboxStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/status/ComboboxStatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$portal$2f$ComboboxPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$backdrop$2f$ComboboxBackdrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/backdrop/ComboboxBackdrop.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositioner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositioner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$popup$2f$ComboboxPopup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/popup/ComboboxPopup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$arrow$2f$ComboboxArrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/arrow/ComboboxArrow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2f$ComboboxGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group/ComboboxGroup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2d$label$2f$ComboboxGroupLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group-label/ComboboxGroupLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$item$2f$ComboboxItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/item/ComboboxItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$row$2f$ComboboxRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/row/ComboboxRow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$ComboboxCollection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/collection/ComboboxCollection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$empty$2f$ComboboxEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/empty/ComboboxEmpty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$separator$2f$Separator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/separator/Separator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$useFilter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/useFilter.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/index.parts.js [app-client] (ecmascript) <export * as Autocomplete>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Autocomplete",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$autocomplete$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/autocomplete/index.parts.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/control/FieldControlDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldControlDataAttributes",
    ()=>FieldControlDataAttributes
]);
let FieldControlDataAttributes = /*#__PURE__*/ function(FieldControlDataAttributes) {
    /**
   * Present when the field is disabled.
   */ FieldControlDataAttributes["disabled"] = "data-disabled";
    /**
   * Present when the field is in valid state.
   */ FieldControlDataAttributes["valid"] = "data-valid";
    /**
   * Present when the field is in invalid state.
   */ FieldControlDataAttributes["invalid"] = "data-invalid";
    /**
   * Present when the field has been touched.
   */ FieldControlDataAttributes["touched"] = "data-touched";
    /**
   * Present when the field's value has changed.
   */ FieldControlDataAttributes["dirty"] = "data-dirty";
    /**
   * Present when the field is filled.
   */ FieldControlDataAttributes["filled"] = "data-filled";
    /**
   * Present when the field control is focused.
   */ FieldControlDataAttributes["focused"] = "data-focused";
    return FieldControlDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_VALIDITY_STATE",
    ()=>DEFAULT_VALIDITY_STATE,
    "fieldValidityMapping",
    ()=>fieldValidityMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$control$2f$FieldControlDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/control/FieldControlDataAttributes.js [app-client] (ecmascript)");
;
const DEFAULT_VALIDITY_STATE = {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: null,
    valueMissing: false
};
const fieldValidityMapping = {
    valid (value) {
        if (value === null) {
            return null;
        }
        if (value) {
            return {
                [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$control$2f$FieldControlDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldControlDataAttributes"].valid]: ''
            };
        }
        return {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$control$2f$FieldControlDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldControlDataAttributes"].invalid]: ''
        };
    }
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldRootContext",
    ()=>FieldRootContext,
    "useFieldRootContext",
    ()=>useFieldRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const FieldRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    invalid: undefined,
    name: undefined,
    validityData: {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
        errors: [],
        error: '',
        value: '',
        initialValue: null
    },
    setValidityData: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    disabled: undefined,
    touched: false,
    setTouched: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    dirty: false,
    setDirty: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    filled: false,
    setFilled: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    focused: false,
    setFocused: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    validate: ()=>null,
    validationMode: 'onSubmit',
    validationDebounceTime: 0,
    shouldValidateOnChange: ()=>false,
    state: {
        disabled: false,
        valid: null,
        touched: false,
        dirty: false,
        filled: false,
        focused: false
    },
    markedDirtyRef: {
        current: false
    },
    validation: {
        getValidationProps: (props = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"])=>props,
        getInputValidationProps: (props = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"])=>props,
        inputRef: {
            current: null
        },
        commit: async ()=>{}
    }
});
if ("TURBOPACK compile-time truthy", 1) FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FieldRootContext);
    if (context.setValidityData === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"] && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Combines the field's client-side, stateful validity data with the external invalid state to
 * determine the field's true validity.
 */ __turbopack_context__.s([
    "getCombinedFieldValidityData",
    ()=>getCombinedFieldValidityData
]);
function getCombinedFieldValidityData(validityData, invalid) {
    return {
        ...validityData,
        state: {
            ...validityData.state,
            valid: !invalid && validityData.state.valid
        }
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/useField.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useField",
    ()=>useField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/form/FormContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
;
;
;
;
;
;
function useField(params) {
    const { enabled = true, value, id, name, controlRef, commit } = params;
    const { formRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { invalid, markedDirtyRef, validityData, setValidityData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const getValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(params.getValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useField.useIsoLayoutEffect": ()=>{
            if (!enabled) {
                return;
            }
            let initialValue = value;
            if (initialValue === undefined) {
                initialValue = getValue();
            }
            if (validityData.initialValue === null && initialValue !== null) {
                setValidityData({
                    "useField.useIsoLayoutEffect": (prev)=>({
                            ...prev,
                            initialValue
                        })
                }["useField.useIsoLayoutEffect"]);
            }
        }
    }["useField.useIsoLayoutEffect"], [
        enabled,
        setValidityData,
        value,
        validityData.initialValue,
        getValue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useField.useIsoLayoutEffect": ()=>{
            if (!enabled || !id) {
                return;
            }
            formRef.current.fields.set(id, {
                getValue,
                name,
                controlRef,
                validityData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid),
                validate (flushSync = true) {
                    let nextValue = value;
                    if (nextValue === undefined) {
                        nextValue = getValue();
                    }
                    markedDirtyRef.current = true;
                    if (!flushSync) {
                        commit(nextValue);
                    } else {
                        // Synchronously update the validity state so the submit event can be prevented.
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"]({
                            "useField.useIsoLayoutEffect": ()=>commit(nextValue)
                        }["useField.useIsoLayoutEffect"]);
                    }
                }
            });
        }
    }["useField.useIsoLayoutEffect"], [
        commit,
        controlRef,
        enabled,
        formRef,
        getValue,
        id,
        invalid,
        markedDirtyRef,
        name,
        validityData,
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useField.useIsoLayoutEffect": ()=>{
            const fields = formRef.current.fields;
            return ({
                "useField.useIsoLayoutEffect": ()=>{
                    if (id) {
                        fields.delete(id);
                    }
                }
            })["useField.useIsoLayoutEffect"];
        }
    }["useField.useIsoLayoutEffect"], [
        formRef,
        id
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/index.parts.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/useFieldValidation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFieldValidation",
    ()=>useFieldValidation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/form/FormContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js [app-client] (ecmascript)");
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
const validityKeys = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"]);
function isOnlyValueMissing(state) {
    if (!state || state.valid || !state.valueMissing) {
        return false;
    }
    let onlyValueMissing = false;
    for (const key of validityKeys){
        if (key === 'valid') {
            continue;
        }
        if (key === 'valueMissing') {
            onlyValueMissing = state[key];
        }
        if (state[key]) {
            onlyValueMissing = false;
        }
    }
    return onlyValueMissing;
}
function useFieldValidation(params) {
    const { formRef, clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { setValidityData, validate, validityData, validationDebounceTime, invalid, markedDirtyRef, state, name, shouldValidateOnChange } = params;
    const { controlId, getDescriptionProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const commit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFieldValidation.useStableCallback[commit]": async (value, revalidate = false)=>{
            const element = inputRef.current;
            if (!element) {
                return;
            }
            if (revalidate) {
                if (state.valid !== false) {
                    return;
                }
                const currentNativeValidity = element.validity;
                if (!currentNativeValidity.valueMissing) {
                    // The 'valueMissing' (required) condition has been resolved by the user typing.
                    // Temporarily mark the field as valid for this onChange event.
                    // Other native errors (e.g., typeMismatch) will be caught by full validation on blur or submit.
                    const nextValidityData = {
                        value,
                        state: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
                            valid: true
                        },
                        error: '',
                        errors: [],
                        initialValue: validityData.initialValue
                    };
                    element.setCustomValidity('');
                    if (controlId) {
                        const currentFieldData = formRef.current.fields.get(controlId);
                        if (currentFieldData) {
                            formRef.current.fields.set(controlId, {
                                ...currentFieldData,
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(nextValidityData, false) // invalid = false
                            });
                        }
                    }
                    setValidityData(nextValidityData);
                    return;
                }
                // Value is still missing, or other conditions apply.
                // Let's use a representation of current validity for isOnlyValueMissing.
                const currentNativeValidityObject = validityKeys.reduce({
                    "useFieldValidation.useStableCallback[commit].currentNativeValidityObject": (acc, key)=>{
                        acc[key] = currentNativeValidity[key];
                        return acc;
                    }
                }["useFieldValidation.useStableCallback[commit].currentNativeValidityObject"], {});
                // If it's (still) natively invalid due to something other than just valueMissing,
                // then bail from this revalidation on change to avoid "scolding" for other errors.
                if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) {
                    return;
                }
            // If valueMissing is still true AND it's the only issue, or if the field is now natively valid,
            // let it fall through to the main validation logic below.
            }
            function getState(el) {
                const computedState = validityKeys.reduce({
                    "useFieldValidation.useStableCallback[commit].getState.computedState": (acc, key)=>{
                        acc[key] = el.validity[key];
                        return acc;
                    }
                }["useFieldValidation.useStableCallback[commit].getState.computedState"], {});
                let hasOnlyValueMissingError = false;
                for (const key of validityKeys){
                    if (key === 'valid') {
                        continue;
                    }
                    if (key === 'valueMissing' && computedState[key]) {
                        hasOnlyValueMissingError = true;
                    } else if (computedState[key]) {
                        return computedState;
                    }
                }
                // Only make `valueMissing` mark the field invalid if it's been changed
                // to reduce error noise.
                if (hasOnlyValueMissingError && !markedDirtyRef.current) {
                    computedState.valid = true;
                    computedState.valueMissing = false;
                }
                return computedState;
            }
            timeout.clear();
            let result = null;
            let validationErrors = [];
            const nextState = getState(element);
            let defaultValidationMessage;
            const validateOnChange = shouldValidateOnChange();
            if (element.validationMessage && !validateOnChange) {
                // not validating on change, if there is a `validationMessage` from
                // native validity, set errors and skip calling the custom validate fn
                defaultValidationMessage = element.validationMessage;
                validationErrors = [
                    element.validationMessage
                ];
            } else {
                // call the validate function because either
                // - validating on change, or
                // - native constraint validations passed, custom validity check is next
                const formValues = Array.from(formRef.current.fields.values()).reduce({
                    "useFieldValidation.useStableCallback[commit].formValues": (acc, field)=>{
                        if (field.name) {
                            acc[field.name] = field.getValue();
                        }
                        return acc;
                    }
                }["useFieldValidation.useStableCallback[commit].formValues"], {});
                const resultOrPromise = validate(value, formValues);
                if (typeof resultOrPromise === 'object' && resultOrPromise !== null && 'then' in resultOrPromise) {
                    result = await resultOrPromise;
                } else {
                    result = resultOrPromise;
                }
                if (result !== null) {
                    nextState.valid = false;
                    nextState.customError = true;
                    if (Array.isArray(result)) {
                        validationErrors = result;
                        element.setCustomValidity(result.join('\n'));
                    } else if (result) {
                        validationErrors = [
                            result
                        ];
                        element.setCustomValidity(result);
                    }
                } else if (validateOnChange) {
                    // validate function returned no errors, if validating on change
                    // we need to clear the custom validity state
                    element.setCustomValidity('');
                    nextState.customError = false;
                    if (element.validationMessage) {
                        defaultValidationMessage = element.validationMessage;
                        validationErrors = [
                            element.validationMessage
                        ];
                    } else if (element.validity.valid && !nextState.valid) {
                        nextState.valid = true;
                    }
                }
            }
            const nextValidityData = {
                value,
                state: nextState,
                error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ''),
                errors: validationErrors,
                initialValue: validityData.initialValue
            };
            if (controlId) {
                const currentFieldData = formRef.current.fields.get(controlId);
                if (currentFieldData) {
                    formRef.current.fields.set(controlId, {
                        ...currentFieldData,
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(nextValidityData, invalid)
                    });
                }
            }
            setValidityData(nextValidityData);
        }
    }["useFieldValidation.useStableCallback[commit]"]);
    const getValidationProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFieldValidation.useCallback[getValidationProps]": (externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(getDescriptionProps, state.valid === false ? {
                'aria-invalid': true
            } : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], externalProps)
    }["useFieldValidation.useCallback[getValidationProps]"], [
        getDescriptionProps,
        state.valid
    ]);
    const getInputValidationProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFieldValidation.useCallback[getInputValidationProps]": (externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
                onChange (event) {
                    // Workaround for https://github.com/facebook/react/issues/9023
                    if (event.nativeEvent.defaultPrevented) {
                        return;
                    }
                    clearErrors(name);
                    if (!shouldValidateOnChange()) {
                        commit(event.currentTarget.value, true);
                        return;
                    }
                    if (invalid) {
                        return;
                    }
                    const element = event.currentTarget;
                    if (element.value === '') {
                        // Ignore the debounce time for empty values.
                        commit(element.value);
                        return;
                    }
                    timeout.clear();
                    if (validationDebounceTime) {
                        timeout.start(validationDebounceTime, {
                            "useFieldValidation.useCallback[getInputValidationProps]": ()=>{
                                commit(element.value);
                            }
                        }["useFieldValidation.useCallback[getInputValidationProps]"]);
                    } else {
                        commit(element.value);
                    }
                }
            }, getValidationProps(externalProps))
    }["useFieldValidation.useCallback[getInputValidationProps]"], [
        getValidationProps,
        clearErrors,
        name,
        timeout,
        commit,
        invalid,
        validationDebounceTime,
        shouldValidateOnChange
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFieldValidation.useMemo": ()=>({
                getValidationProps,
                getInputValidationProps,
                inputRef,
                commit
            })
    }["useFieldValidation.useMemo"], [
        getValidationProps,
        getInputValidationProps,
        commit
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldRoot",
    ()=>FieldRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$fieldset$2f$root$2f$FieldsetRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/fieldset/root/FieldsetRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/form/FormContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$useFieldValidation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/useFieldValidation.js [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
const FieldRootInner = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldRootInner(componentProps, forwardedRef) {
    const { errors, validationMode: formValidationMode, submitAttemptedRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { render, className, validate: validateProp, validationDebounceTime = 0, validationMode = formValidationMode, name, disabled: disabledProp = false, invalid: invalidProp, dirty: dirtyProp, touched: touchedProp, actionsRef, ...elementProps } = componentProps;
    const { disabled: disabledFieldset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$fieldset$2f$root$2f$FieldsetRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldsetRootContext"])();
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(validateProp || ({
        "FieldRootInner.FieldRootInner.useStableCallback[validate]": ()=>null
    })["FieldRootInner.FieldRootInner.useStableCallback[validate]"]);
    const disabled = disabledFieldset || disabledProp;
    const [touchedState, setTouchedUnwrapped] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [dirtyState, setDirtyUnwrapped] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [filled, setFilled] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [focused, setFocused] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const dirty = dirtyProp ?? dirtyState;
    const touched = touchedProp ?? touchedState;
    const markedDirtyRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const setDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldRootInner.FieldRootInner.useStableCallback[setDirty]": (value)=>{
            if (dirtyProp !== undefined) {
                return;
            }
            if (value) {
                markedDirtyRef.current = true;
            }
            setDirtyUnwrapped(value);
        }
    }["FieldRootInner.FieldRootInner.useStableCallback[setDirty]"]);
    const setTouched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldRootInner.FieldRootInner.useStableCallback[setTouched]": (value)=>{
            if (touchedProp !== undefined) {
                return;
            }
            setTouchedUnwrapped(value);
        }
    }["FieldRootInner.FieldRootInner.useStableCallback[setTouched]"]);
    const shouldValidateOnChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldRootInner.FieldRootInner.useStableCallback[shouldValidateOnChange]": ()=>validationMode === 'onChange' || validationMode === 'onSubmit' && submitAttemptedRef.current
    }["FieldRootInner.FieldRootInner.useStableCallback[shouldValidateOnChange]"]);
    const invalid = Boolean(invalidProp || name && ({}).hasOwnProperty.call(errors, name) && errors[name] !== undefined);
    const [validityData, setValidityData] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        state: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
        error: '',
        errors: [],
        value: null,
        initialValue: null
    });
    const valid = !invalid && validityData.state.valid;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldRootInner.FieldRootInner.useMemo[state]": ()=>({
                disabled,
                touched,
                dirty,
                valid,
                filled,
                focused
            })
    }["FieldRootInner.FieldRootInner.useMemo[state]"], [
        disabled,
        touched,
        dirty,
        valid,
        filled,
        focused
    ]);
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$useFieldValidation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldValidation"])({
        setValidityData,
        validate,
        validityData,
        validationDebounceTime,
        invalid,
        markedDirtyRef,
        state,
        name,
        shouldValidateOnChange
    });
    const handleImperativeValidate = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "FieldRootInner.FieldRootInner.useCallback[handleImperativeValidate]": ()=>{
            markedDirtyRef.current = true;
            validation.commit(validityData.value);
        }
    }["FieldRootInner.FieldRootInner.useCallback[handleImperativeValidate]"], [
        validation,
        validityData
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"](actionsRef, {
        "FieldRootInner.FieldRootInner.useImperativeHandle": ()=>({
                validate: handleImperativeValidate
            })
    }["FieldRootInner.FieldRootInner.useImperativeHandle"], [
        handleImperativeValidate
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldRootInner.FieldRootInner.useMemo[contextValue]": ()=>({
                invalid,
                name,
                validityData,
                setValidityData,
                disabled,
                touched,
                setTouched,
                dirty,
                setDirty,
                filled,
                setFilled,
                focused,
                setFocused,
                validate,
                validationMode,
                validationDebounceTime,
                shouldValidateOnChange,
                state,
                markedDirtyRef,
                validation
            })
    }["FieldRootInner.FieldRootInner.useMemo[contextValue]"], [
        invalid,
        name,
        validityData,
        disabled,
        touched,
        setTouched,
        dirty,
        setDirty,
        filled,
        setFilled,
        focused,
        setFocused,
        validate,
        validationMode,
        validationDebounceTime,
        shouldValidateOnChange,
        state,
        validation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldRootContext"].Provider, {
        value: contextValue,
        children: element
    });
});
/**
 * Groups all parts of the field.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ if ("TURBOPACK compile-time truthy", 1) FieldRootInner.displayName = "FieldRootInner";
const FieldRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldRoot(componentProps, forwardedRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelableProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FieldRootInner, {
            ...componentProps,
            ref: forwardedRef
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) FieldRoot.displayName = "FieldRoot";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/label/FieldLabel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldLabel",
    ()=>FieldLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/owner.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
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
const FieldLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldLabel(componentProps, forwardedRef) {
    const { render, className, id: idProp, nativeLabel = true, ...elementProps } = componentProps;
    const fieldRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const { controlId, setLabelId, labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const labelRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleInteraction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldLabel.FieldLabel.useStableCallback[handleInteraction]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
            if (target?.closest('button,input,select,textarea')) {
                return;
            }
            // Prevent text selection when double clicking label.
            if (!event.defaultPrevented && event.detail > 1) {
                event.preventDefault();
            }
            if (nativeLabel || !controlId) {
                return;
            }
            const controlElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget).getElementById(controlId);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(controlElement)) {
                controlElement.focus({
                    // Available from Chrome 144+ (January 2026).
                    // Safari and Firefox already support it.
                    // @ts-expect-error not available in types yet
                    focusVisible: true
                });
            }
        }
    }["FieldLabel.FieldLabel.useStableCallback[handleInteraction]"]);
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
            "FieldLabel.FieldLabel.useEffect": ()=>{
                if (!labelRef.current) {
                    return;
                }
                const isLabelTag = labelRef.current.tagName === 'LABEL';
                if (nativeLabel) {
                    if (!isLabelTag) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('<Field.Label> was not rendered as a <label> element, which does not match the `nativeLabel` prop on the component. Ensure that the element passed to the `render` prop of <Field.Label> is a real <label>, or set the `nativeLabel` prop on the component to `false`.');
                    }
                } else if (isLabelTag) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('<Field.Label> was rendered as a <label> element, which does not match the `nativeLabel` prop on the component. Ensure that the element passed to the `render` prop of <Field.Label> is not a real <label>, or set the `nativeLabel` prop on the component to `true`.');
                }
            }
        }["FieldLabel.FieldLabel.useEffect"], [
            nativeLabel
        ]);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldLabel.FieldLabel.useIsoLayoutEffect": ()=>{
            if (id) {
                setLabelId(id);
            }
            return ({
                "FieldLabel.FieldLabel.useIsoLayoutEffect": ()=>{
                    setLabelId(undefined);
                }
            })["FieldLabel.FieldLabel.useIsoLayoutEffect"];
        }
    }["FieldLabel.FieldLabel.useIsoLayoutEffect"], [
        id,
        setLabelId
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('label', componentProps, {
        ref: [
            forwardedRef,
            labelRef
        ],
        state: fieldRootContext.state,
        props: [
            {
                id: labelId
            },
            nativeLabel ? {
                htmlFor: controlId ?? undefined,
                onMouseDown: handleInteraction
            } : {
                onClick: handleInteraction,
                onPointerDown (event) {
                    event.preventDefault();
                }
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldLabel.displayName = "FieldLabel";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/error/FieldError.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldError",
    ()=>FieldError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/form/FormContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const FieldError = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldError(componentProps, forwardedRef) {
    const { render, id: idProp, className, match, ...elementProps } = componentProps;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const { validityData, state, name } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const { setMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const { errors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const formError = name ? errors[name] : null;
    let rendered = false;
    if (formError || match === true) {
        rendered = true;
    } else if (match) {
        rendered = Boolean(validityData.state[match]);
    } else {
        rendered = validityData.state.valid === false;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldError.FieldError.useIsoLayoutEffect": ()=>{
            if (!rendered || !id) {
                return undefined;
            }
            setMessageIds({
                "FieldError.FieldError.useIsoLayoutEffect": (v)=>v.concat(id)
            }["FieldError.FieldError.useIsoLayoutEffect"]);
            return ({
                "FieldError.FieldError.useIsoLayoutEffect": ()=>{
                    setMessageIds({
                        "FieldError.FieldError.useIsoLayoutEffect": (v)=>v.filter({
                                "FieldError.FieldError.useIsoLayoutEffect": (item)=>item !== id
                            }["FieldError.FieldError.useIsoLayoutEffect"])
                    }["FieldError.FieldError.useIsoLayoutEffect"]);
                }
            })["FieldError.FieldError.useIsoLayoutEffect"];
        }
    }["FieldError.FieldError.useIsoLayoutEffect"], [
        rendered,
        id,
        setMessageIds
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id,
                children: formError || (validityData.errors.length > 1 ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]('ul', {}, validityData.errors.map({
                    "FieldError.FieldError.useRenderElement[element]": (message)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]('li', {
                            key: message
                        }, message)
                }["FieldError.FieldError.useRenderElement[element]"])) : validityData.error)
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    if (!rendered) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldError.displayName = "FieldError";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/description/FieldDescription.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldDescription",
    ()=>FieldDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const FieldDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldDescription(componentProps, forwardedRef) {
    const { render, id: idProp, className, ...elementProps } = componentProps;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const fieldRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const { setMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldDescription.FieldDescription.useIsoLayoutEffect": ()=>{
            if (!id) {
                return undefined;
            }
            setMessageIds({
                "FieldDescription.FieldDescription.useIsoLayoutEffect": (v)=>v.concat(id)
            }["FieldDescription.FieldDescription.useIsoLayoutEffect"]);
            return ({
                "FieldDescription.FieldDescription.useIsoLayoutEffect": ()=>{
                    setMessageIds({
                        "FieldDescription.FieldDescription.useIsoLayoutEffect": (v)=>v.filter({
                                "FieldDescription.FieldDescription.useIsoLayoutEffect": (item)=>item !== id
                            }["FieldDescription.FieldDescription.useIsoLayoutEffect"])
                    }["FieldDescription.FieldDescription.useIsoLayoutEffect"]);
                }
            })["FieldDescription.FieldDescription.useIsoLayoutEffect"];
        }
    }["FieldDescription.FieldDescription.useIsoLayoutEffect"], [
        id,
        setMessageIds
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        state: fieldRootContext.state,
        props: [
            {
                id
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldDescription.displayName = "FieldDescription";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/control/FieldControl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldControl",
    ()=>FieldControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useControlled.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$useLabelableId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/useLabelableId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$useField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/useField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
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
const FieldControl = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldControl(componentProps, forwardedRef) {
    const { render, className, id: idProp, name: nameProp, value: valueProp, disabled: disabledProp = false, onValueChange, defaultValue, ...elementProps } = componentProps;
    const { state: fieldState, name: fieldName, disabled: fieldDisabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldControl.FieldControl.useMemo[state]": ()=>({
                ...fieldState,
                disabled
            })
    }["FieldControl.FieldControl.useMemo[state]"], [
        fieldState,
        disabled
    ]);
    const { setTouched, setDirty, validityData, setFocused, setFilled, validationMode, validation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$useLabelableId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableId"])({
        id: idProp
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldControl.FieldControl.useIsoLayoutEffect": ()=>{
            const hasExternalValue = valueProp != null;
            if (validation.inputRef.current?.value || hasExternalValue && valueProp !== '') {
                setFilled(true);
            } else if (hasExternalValue && valueProp === '') {
                setFilled(false);
            }
        }
    }["FieldControl.FieldControl.useIsoLayoutEffect"], [
        validation.inputRef,
        setFilled,
        valueProp
    ]);
    const [value, setValueUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValue,
        name: 'FieldControl',
        state: 'value'
    });
    const isControlled = valueProp !== undefined;
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldControl.FieldControl.useStableCallback[setValue]": (nextValue, eventDetails)=>{
            onValueChange?.(nextValue, eventDetails);
            if (eventDetails.isCanceled) {
                return;
            }
            setValueUnwrapped(nextValue);
        }
    }["FieldControl.FieldControl.useStableCallback[setValue]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$useField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useField"])({
        id,
        name,
        commit: validation.commit,
        value,
        getValue: {
            "FieldControl.FieldControl.useField": ()=>validation.inputRef.current?.value
        }["FieldControl.FieldControl.useField"],
        controlRef: validation.inputRef
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('input', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id,
                disabled,
                name,
                ref: validation.inputRef,
                'aria-labelledby': labelId,
                ...isControlled ? {
                    value
                } : {
                    defaultValue
                },
                onChange (event) {
                    const inputValue = event.currentTarget.value;
                    setValue(inputValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent));
                    setDirty(inputValue !== validityData.initialValue);
                    setFilled(inputValue !== '');
                },
                onFocus () {
                    setFocused(true);
                },
                onBlur (event) {
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        validation.commit(event.currentTarget.value);
                    }
                },
                onKeyDown (event) {
                    if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
                        setTouched(true);
                        validation.commit(event.currentTarget.value);
                    }
                }
            },
            validation.getInputValidationProps(),
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldControl.displayName = "FieldControl";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/validity/FieldValidity.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldValidity",
    ()=>FieldValidity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
const FieldValidity = function FieldValidity(props) {
    const { children } = props;
    const { validityData, invalid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const fieldValidityState = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldValidity.useMemo[fieldValidityState]": ()=>{
            const combinedFieldValidityData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid);
            return {
                ...combinedFieldValidityData,
                validity: combinedFieldValidityData.state
            };
        }
    }["FieldValidity.useMemo[fieldValidityState]"], [
        validityData,
        invalid
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children(fieldValidityState)
    });
};
if ("TURBOPACK compile-time truthy", 1) FieldValidity.displayName = "FieldValidity";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/item/FieldItemContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldItemContext",
    ()=>FieldItemContext,
    "useFieldItemContext",
    ()=>useFieldItemContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const FieldItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    disabled: false
});
if ("TURBOPACK compile-time truthy", 1) FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FieldItemContext);
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/item/FieldItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldItem",
    ()=>FieldItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$item$2f$FieldItemContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/item/FieldItemContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$checkbox$2d$group$2f$CheckboxGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/checkbox-group/CheckboxGroupContext.js [app-client] (ecmascript)");
/**
 * Groups individual items in a checkbox group or radio group with a label and description.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const FieldItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldItem(componentProps, forwardedRef) {
    const { render, className, disabled: disabledProp = false, ...elementProps } = componentProps;
    const { state, disabled: rootDisabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const disabled = rootDisabled || disabledProp;
    const checkboxGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$checkbox$2d$group$2f$CheckboxGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCheckboxGroupContext"])();
    // checkboxGroupContext.parent is truthy even if no parent checkbox is involved
    const parentId = checkboxGroupContext?.parent.id;
    // this a more reliable check
    const hasParentCheckbox = checkboxGroupContext?.allValues !== undefined;
    const initialControlId = hasParentCheckbox ? parentId : undefined;
    const fieldItemContext = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldItem.FieldItem.useMemo[fieldItemContext]": ()=>({
                disabled
            })
    }["FieldItem.FieldItem.useMemo[fieldItemContext]"], [
        disabled
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelableProvider"], {
        initialControlId: initialControlId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$item$2f$FieldItemContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldItemContext"].Provider, {
            value: fieldItemContext,
            children: element
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) FieldItem.displayName = "FieldItem";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/index.parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$control$2f$FieldControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldControl"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$description$2f$FieldDescription$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldDescription"],
    "Error",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$error$2f$FieldError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"],
    "Item",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$item$2f$FieldItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldItem"],
    "Label",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$label$2f$FieldLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldRoot"],
    "Validity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$validity$2f$FieldValidity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldValidity"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/index.parts.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$label$2f$FieldLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/label/FieldLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$error$2f$FieldError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/error/FieldError.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$description$2f$FieldDescription$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/description/FieldDescription.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$control$2f$FieldControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/control/FieldControl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$validity$2f$FieldValidity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/validity/FieldValidity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$item$2f$FieldItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/item/FieldItem.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/field/index.parts.js [app-client] (ecmascript) <export * as Field>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/index.parts.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/form/FormContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormContext",
    ()=>FormContext,
    "useFormContext",
    ()=>useFormContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
'use client';
;
;
const FormContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    formRef: {
        current: {
            fields: new Map()
        }
    },
    errors: {},
    clearErrors: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    validationMode: 'onSubmit',
    submitAttemptedRef: {
        current: false
    }
});
if ("TURBOPACK compile-time truthy", 1) FormContext.displayName = "FormContext";
function useFormContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FormContext);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelableContext",
    ()=>LabelableContext,
    "useLabelableContext",
    ()=>useLabelableContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
'use client';
;
;
const LabelableContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    controlId: undefined,
    setControlId: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    labelId: undefined,
    setLabelId: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    messageIds: [],
    setMessageIds: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    getDescriptionProps: (externalProps)=>externalProps
});
if ("TURBOPACK compile-time truthy", 1) LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](LabelableContext);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/useLabelableId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLabelableId",
    ()=>useLabelableId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function useLabelableId(params = {}) {
    const { id, implicit = false, controlRef } = params;
    const { controlId, setControlId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const defaultId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useLabelableId.useIsoLayoutEffect": ()=>{
            if (!implicit && !id || setControlId === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"]) {
                return undefined;
            }
            if (implicit) {
                const elem = controlRef?.current;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elem) && elem.closest('label') != null) {
                    setControlId(id ?? null);
                } else {
                    setControlId(controlId ?? defaultId);
                }
            } else if (id) {
                setControlId(id);
            }
            return ({
                "useLabelableId.useIsoLayoutEffect": ()=>{
                    if (id) {
                        setControlId(undefined);
                    }
                }
            })["useLabelableId.useIsoLayoutEffect"];
        }
    }["useLabelableId.useIsoLayoutEffect"], [
        id,
        controlRef,
        controlId,
        setControlId,
        implicit,
        defaultId
    ]);
    return controlId ?? defaultId;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelableProvider",
    ()=>LabelableProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const LabelableProvider = function LabelableProvider(props) {
    const defaultId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const [controlId, setControlId] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](props.initialControlId === undefined ? defaultId : props.initialControlId);
    const [labelId, setLabelId] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](undefined);
    const [messageIds, setMessageIds] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const { messageIds: parentMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const getDescriptionProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LabelableProvider.useCallback[getDescriptionProps]": (externalProps)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
                'aria-describedby': parentMessageIds.concat(messageIds).join(' ') || undefined
            }, externalProps);
        }
    }["LabelableProvider.useCallback[getDescriptionProps]"], [
        parentMessageIds,
        messageIds
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LabelableProvider.useMemo[contextValue]": ()=>({
                controlId,
                setControlId,
                labelId,
                setLabelId,
                messageIds,
                setMessageIds,
                getDescriptionProps
            })
    }["LabelableProvider.useMemo[contextValue]"], [
        controlId,
        setControlId,
        labelId,
        setLabelId,
        messageIds,
        setMessageIds,
        getDescriptionProps
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelableContext"].Provider, {
        value: contextValue,
        children: props.children
    });
};
if ("TURBOPACK compile-time truthy", 1) LabelableProvider.displayName = "LabelableProvider";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectionContext",
    ()=>DirectionContext,
    "useDirection",
    ()=>useDirection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const DirectionContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DirectionContext.displayName = "DirectionContext";
function useDirection() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](DirectionContext);
    return context?.direction ?? 'ltr';
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/separator/Separator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
'use client';
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function SeparatorComponent(componentProps, forwardedRef) {
    const { className, render, orientation = 'horizontal', ...elementProps } = componentProps;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Separator.SeparatorComponent.useMemo[state]": ()=>({
                orientation
            })
    }["Separator.SeparatorComponent.useMemo[state]"], [
        orientation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'separator',
                'aria-orientation': orientation
            },
            elementProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) Separator.displayName = "Separator";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/fieldset/root/FieldsetRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldsetRootContext",
    ()=>FieldsetRootContext,
    "useFieldsetRootContext",
    ()=>useFieldsetRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const FieldsetRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    legendId: undefined,
    setLegendId: ()=>{},
    disabled: undefined
});
if ("TURBOPACK compile-time truthy", 1) FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FieldsetRootContext);
    if (!context && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/checkbox-group/CheckboxGroupContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckboxGroupContext",
    ()=>CheckboxGroupContext,
    "useCheckboxGroupContext",
    ()=>useCheckboxGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CheckboxGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CheckboxGroupContext.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CheckboxGroupContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/input/Input.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/index.parts.js [app-client] (ecmascript) <export * as Field>");
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function Input(props, forwardedRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__["Field"].Control, {
        ref: forwardedRef,
        ...props
    });
});
if ("TURBOPACK compile-time truthy", 1) Input.displayName = "Input";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/index.parts.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaRootContext",
    ()=>ScrollAreaRootContext,
    "useScrollAreaRootContext",
    ()=>useScrollAreaRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ScrollAreaRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ScrollAreaRootContext.displayName = "ScrollAreaRootContext";
function useScrollAreaRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ScrollAreaRootContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ScrollAreaRootContext is missing. ScrollArea parts must be placed within <ScrollArea.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootCssVars.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaRootCssVars",
    ()=>ScrollAreaRootCssVars
]);
let ScrollAreaRootCssVars = /*#__PURE__*/ function(ScrollAreaRootCssVars) {
    /**
   * The scroll area's corner height.
   * @type {number}
   */ ScrollAreaRootCssVars["scrollAreaCornerHeight"] = "--scroll-area-corner-height";
    /**
   * The scroll area's corner width.
   * @type {number}
   */ ScrollAreaRootCssVars["scrollAreaCornerWidth"] = "--scroll-area-corner-width";
    return ScrollAreaRootCssVars;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIN_THUMB_SIZE",
    ()=>MIN_THUMB_SIZE,
    "SCROLL_TIMEOUT",
    ()=>SCROLL_TIMEOUT
]);
const SCROLL_TIMEOUT = 500;
const MIN_THUMB_SIZE = 16;
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/utils/getOffset.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOffset",
    ()=>getOffset
]);
function getOffset(element, prop, axis) {
    if (!element) {
        return 0;
    }
    const styles = getComputedStyle(element);
    const propAxis = axis === 'x' ? 'Inline' : 'Block';
    // Safari misreports `marginInlineEnd` in RTL.
    // We have to assume the start/end values are symmetrical, which is likely.
    if (axis === 'x' && prop === 'margin') {
        return parseFloat(styles[`${prop}InlineStart`]) * 2;
    }
    return parseFloat(styles[`${prop}${propAxis}Start`]) + parseFloat(styles[`${prop}${propAxis}End`]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaScrollbarDataAttributes",
    ()=>ScrollAreaScrollbarDataAttributes
]);
let ScrollAreaScrollbarDataAttributes = /*#__PURE__*/ function(ScrollAreaScrollbarDataAttributes) {
    /**
   * Indicates the orientation of the scrollbar.
   * @type {'horizontal' | 'vertical'}
   */ ScrollAreaScrollbarDataAttributes["orientation"] = "data-orientation";
    /**
   * Present when the pointer is over the scroll area.
   */ ScrollAreaScrollbarDataAttributes["hovering"] = "data-hovering";
    /**
   * Present when the users scrolls inside the scroll area.
   */ ScrollAreaScrollbarDataAttributes["scrolling"] = "data-scrolling";
    /**
   * Present when the scroll area content is wider than the viewport.
   */ ScrollAreaScrollbarDataAttributes["hasOverflowX"] = "data-has-overflow-x";
    /**
   * Present when the scroll area content is taller than the viewport.
   */ ScrollAreaScrollbarDataAttributes["hasOverflowY"] = "data-has-overflow-y";
    /**
   * Present when there is overflow on the horizontal start side.
   */ ScrollAreaScrollbarDataAttributes["overflowXStart"] = "data-overflow-x-start";
    /**
   * Present when there is overflow on the horizontal end side.
   */ ScrollAreaScrollbarDataAttributes["overflowXEnd"] = "data-overflow-x-end";
    /**
   * Present when there is overflow on the vertical start side.
   */ ScrollAreaScrollbarDataAttributes["overflowYStart"] = "data-overflow-y-start";
    /**
   * Present when there is overflow on the vertical end side.
   */ ScrollAreaScrollbarDataAttributes["overflowYEnd"] = "data-overflow-y-end";
    return ScrollAreaScrollbarDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaRootDataAttributes",
    ()=>ScrollAreaRootDataAttributes
]);
let ScrollAreaRootDataAttributes = /*#__PURE__*/ function(ScrollAreaRootDataAttributes) {
    /**
   * Present when the scroll area content is wider than the viewport.
   */ ScrollAreaRootDataAttributes["hasOverflowX"] = "data-has-overflow-x";
    /**
   * Present when the scroll area content is taller than the viewport.
   */ ScrollAreaRootDataAttributes["hasOverflowY"] = "data-has-overflow-y";
    /**
   * Present when there is overflow on the horizontal start side.
   */ ScrollAreaRootDataAttributes["overflowXStart"] = "data-overflow-x-start";
    /**
   * Present when there is overflow on the horizontal end side.
   */ ScrollAreaRootDataAttributes["overflowXEnd"] = "data-overflow-x-end";
    /**
   * Present when there is overflow on the vertical start side.
   */ ScrollAreaRootDataAttributes["overflowYStart"] = "data-overflow-y-start";
    /**
   * Present when there is overflow on the vertical end side.
   */ ScrollAreaRootDataAttributes["overflowYEnd"] = "data-overflow-y-end";
    return ScrollAreaRootDataAttributes;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrollAreaStateAttributesMapping",
    ()=>scrollAreaStateAttributesMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootDataAttributes.js [app-client] (ecmascript)");
;
const scrollAreaStateAttributesMapping = {
    hasOverflowX: (value)=>value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootDataAttributes"].hasOverflowX]: ''
        } : null,
    hasOverflowY: (value)=>value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootDataAttributes"].hasOverflowY]: ''
        } : null,
    overflowXStart: (value)=>value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootDataAttributes"].overflowXStart]: ''
        } : null,
    overflowXEnd: (value)=>value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootDataAttributes"].overflowXEnd]: ''
        } : null,
    overflowYStart: (value)=>value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootDataAttributes"].overflowYStart]: ''
        } : null,
    overflowYEnd: (value)=>value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootDataAttributes"].overflowYEnd]: ''
        } : null,
    cornerHidden: ()=>null
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaRoot",
    ()=>ScrollAreaRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootCssVars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/utils/getOffset.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/styles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$csp$2d$provider$2f$CSPContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/csp-provider/CSPContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
;
;
const DEFAULT_COORDS = {
    x: 0,
    y: 0
};
const DEFAULT_SIZE = {
    width: 0,
    height: 0
};
const DEFAULT_OVERFLOW_EDGES = {
    xStart: false,
    xEnd: false,
    yStart: false,
    yEnd: false
};
const DEFAULT_HIDDEN_STATE = {
    x: false,
    y: false,
    corner: false
};
const ScrollAreaRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function ScrollAreaRoot(componentProps, forwardedRef) {
    const { render, className, overflowEdgeThreshold: overflowEdgeThresholdProp, ...elementProps } = componentProps;
    const overflowEdgeThreshold = normalizeOverflowEdgeThreshold(overflowEdgeThresholdProp);
    const rootId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const scrollYTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const scrollXTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const { nonce, disableStyleElements } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$csp$2d$provider$2f$CSPContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCSPContext"])();
    const [hovering, setHovering] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [scrollingX, setScrollingX] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [scrollingY, setScrollingY] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [touchModality, setTouchModality] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [cornerSize, setCornerSize] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](DEFAULT_SIZE);
    const [thumbSize, setThumbSize] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](DEFAULT_SIZE);
    const [overflowEdges, setOverflowEdges] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](DEFAULT_OVERFLOW_EDGES);
    const [hiddenState, setHiddenState] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](DEFAULT_HIDDEN_STATE);
    const rootRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const viewportRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const scrollbarYRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const scrollbarXRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const thumbYRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const thumbXRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const cornerRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const thumbDraggingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const startYRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const startXRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const startScrollTopRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const startScrollLeftRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const currentOrientationRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('vertical');
    const scrollPositionRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](DEFAULT_COORDS);
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handleScroll]": (scrollPosition)=>{
            const offsetX = scrollPosition.x - scrollPositionRef.current.x;
            const offsetY = scrollPosition.y - scrollPositionRef.current.y;
            scrollPositionRef.current = scrollPosition;
            if (offsetY !== 0) {
                setScrollingY(true);
                scrollYTimeout.start(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCROLL_TIMEOUT"], {
                    "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handleScroll]": ()=>{
                        setScrollingY(false);
                    }
                }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handleScroll]"]);
            }
            if (offsetX !== 0) {
                setScrollingX(true);
                scrollXTimeout.start(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCROLL_TIMEOUT"], {
                    "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handleScroll]": ()=>{
                        setScrollingX(false);
                    }
                }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handleScroll]"]);
            }
        }
    }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handleScroll]"]);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerDown]": (event)=>{
            if (event.button !== 0) {
                return;
            }
            thumbDraggingRef.current = true;
            startYRef.current = event.clientY;
            startXRef.current = event.clientX;
            currentOrientationRef.current = event.currentTarget.getAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbarDataAttributes"].orientation);
            if (viewportRef.current) {
                startScrollTopRef.current = viewportRef.current.scrollTop;
                startScrollLeftRef.current = viewportRef.current.scrollLeft;
            }
            if (thumbYRef.current && currentOrientationRef.current === 'vertical') {
                thumbYRef.current.setPointerCapture(event.pointerId);
            }
            if (thumbXRef.current && currentOrientationRef.current === 'horizontal') {
                thumbXRef.current.setPointerCapture(event.pointerId);
            }
        }
    }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerDown]"]);
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerMove]": (event)=>{
            if (!thumbDraggingRef.current) {
                return;
            }
            const deltaY = event.clientY - startYRef.current;
            const deltaX = event.clientX - startXRef.current;
            if (viewportRef.current) {
                const scrollableContentHeight = viewportRef.current.scrollHeight;
                const viewportHeight = viewportRef.current.clientHeight;
                const scrollableContentWidth = viewportRef.current.scrollWidth;
                const viewportWidth = viewportRef.current.clientWidth;
                if (thumbYRef.current && scrollbarYRef.current && currentOrientationRef.current === 'vertical') {
                    const scrollbarYOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(scrollbarYRef.current, 'padding', 'y');
                    const thumbYOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(thumbYRef.current, 'margin', 'y');
                    const thumbHeight = thumbYRef.current.offsetHeight;
                    const maxThumbOffsetY = scrollbarYRef.current.offsetHeight - thumbHeight - scrollbarYOffset - thumbYOffset;
                    const scrollRatioY = deltaY / maxThumbOffsetY;
                    viewportRef.current.scrollTop = startScrollTopRef.current + scrollRatioY * (scrollableContentHeight - viewportHeight);
                    event.preventDefault();
                    setScrollingY(true);
                    scrollYTimeout.start(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCROLL_TIMEOUT"], {
                        "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerMove]": ()=>{
                            setScrollingY(false);
                        }
                    }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerMove]"]);
                }
                if (thumbXRef.current && scrollbarXRef.current && currentOrientationRef.current === 'horizontal') {
                    const scrollbarXOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(scrollbarXRef.current, 'padding', 'x');
                    const thumbXOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(thumbXRef.current, 'margin', 'x');
                    const thumbWidth = thumbXRef.current.offsetWidth;
                    const maxThumbOffsetX = scrollbarXRef.current.offsetWidth - thumbWidth - scrollbarXOffset - thumbXOffset;
                    const scrollRatioX = deltaX / maxThumbOffsetX;
                    viewportRef.current.scrollLeft = startScrollLeftRef.current + scrollRatioX * (scrollableContentWidth - viewportWidth);
                    event.preventDefault();
                    setScrollingX(true);
                    scrollXTimeout.start(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCROLL_TIMEOUT"], {
                        "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerMove]": ()=>{
                            setScrollingX(false);
                        }
                    }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerMove]"]);
                }
            }
        }
    }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerMove]"]);
    const handlePointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerUp]": (event)=>{
            thumbDraggingRef.current = false;
            if (thumbYRef.current && currentOrientationRef.current === 'vertical') {
                thumbYRef.current.releasePointerCapture(event.pointerId);
            }
            if (thumbXRef.current && currentOrientationRef.current === 'horizontal') {
                thumbXRef.current.releasePointerCapture(event.pointerId);
            }
        }
    }["ScrollAreaRoot.ScrollAreaRoot.useStableCallback[handlePointerUp]"]);
    function handleTouchModalityChange(event) {
        setTouchModality(event.pointerType === 'touch');
    }
    function handlePointerEnterOrMove(event) {
        handleTouchModalityChange(event);
        if (event.pointerType !== 'touch') {
            const isTargetRootChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(rootRef.current, event.target);
            setHovering(isTargetRootChild);
        }
    }
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaRoot.ScrollAreaRoot.useMemo[state]": ()=>({
                hasOverflowX: !hiddenState.x,
                hasOverflowY: !hiddenState.y,
                overflowXStart: overflowEdges.xStart,
                overflowXEnd: overflowEdges.xEnd,
                overflowYStart: overflowEdges.yStart,
                overflowYEnd: overflowEdges.yEnd,
                cornerHidden: hiddenState.corner
            })
    }["ScrollAreaRoot.ScrollAreaRoot.useMemo[state]"], [
        hiddenState.x,
        hiddenState.y,
        hiddenState.corner,
        overflowEdges
    ]);
    const props = {
        role: 'presentation',
        onPointerEnter: handlePointerEnterOrMove,
        onPointerMove: handlePointerEnterOrMove,
        onPointerDown: handleTouchModalityChange,
        onPointerLeave () {
            setHovering(false);
        },
        style: {
            position: 'relative',
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootCssVars"].scrollAreaCornerHeight]: `${cornerSize.height}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootCssVars"].scrollAreaCornerWidth]: `${cornerSize.width}px`
        }
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            rootRef
        ],
        props: [
            props,
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrollAreaStateAttributesMapping"]
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaRoot.ScrollAreaRoot.useMemo[contextValue]": ()=>({
                handlePointerDown,
                handlePointerMove,
                handlePointerUp,
                handleScroll,
                cornerSize,
                setCornerSize,
                thumbSize,
                setThumbSize,
                touchModality,
                cornerRef,
                scrollingX,
                setScrollingX,
                scrollingY,
                setScrollingY,
                hovering,
                setHovering,
                viewportRef,
                rootRef,
                scrollbarYRef,
                scrollbarXRef,
                thumbYRef,
                thumbXRef,
                rootId,
                hiddenState,
                setHiddenState,
                overflowEdges,
                setOverflowEdges,
                viewportState: state,
                overflowEdgeThreshold
            })
    }["ScrollAreaRoot.ScrollAreaRoot.useMemo[contextValue]"], [
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handleScroll,
        cornerSize,
        thumbSize,
        touchModality,
        scrollingX,
        setScrollingX,
        scrollingY,
        setScrollingY,
        hovering,
        setHovering,
        rootId,
        hiddenState,
        overflowEdges,
        state,
        overflowEdgeThreshold
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootContext"].Provider, {
        value: contextValue,
        children: [
            !disableStyleElements && __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styleDisableScrollbar"].getElement(nonce),
            element
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) ScrollAreaRoot.displayName = "ScrollAreaRoot";
function normalizeOverflowEdgeThreshold(threshold) {
    if (typeof threshold === 'number') {
        const value = Math.max(0, threshold);
        return {
            xStart: value,
            xEnd: value,
            yStart: value,
            yEnd: value
        };
    }
    return {
        xStart: Math.max(0, threshold?.xStart || 0),
        xEnd: Math.max(0, threshold?.xEnd || 0),
        yStart: Math.max(0, threshold?.yStart || 0),
        yEnd: Math.max(0, threshold?.yEnd || 0)
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaViewportContext",
    ()=>ScrollAreaViewportContext,
    "useScrollAreaViewportContext",
    ()=>useScrollAreaViewportContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ScrollAreaViewportContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ScrollAreaViewportContext.displayName = "ScrollAreaViewportContext";
function useScrollAreaViewportContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ScrollAreaViewportContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ScrollAreaViewportContext missing. ScrollAreaViewport parts must be placed within <ScrollArea.Viewport>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/utils/onVisible.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Executes a callback when an element becomes visible.
 */ __turbopack_context__.s([
    "onVisible",
    ()=>onVisible
]);
function onVisible(element, callback) {
    if (typeof IntersectionObserver === 'undefined') {
        return ()=>{};
    }
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.intersectionRatio > 0) {
                callback();
                observer.disconnect();
            }
        });
    });
    observer.observe(element);
    return ()=>{
        observer.disconnect();
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportCssVars.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaViewportCssVars",
    ()=>ScrollAreaViewportCssVars
]);
let ScrollAreaViewportCssVars = /*#__PURE__*/ function(ScrollAreaViewportCssVars) {
    /**
   * The distance from the horizontal start edge in pixels.
   * @type {number}
   */ ScrollAreaViewportCssVars["scrollAreaOverflowXStart"] = "--scroll-area-overflow-x-start";
    /**
   * The distance from the horizontal end edge in pixels.
   * @type {number}
   */ ScrollAreaViewportCssVars["scrollAreaOverflowXEnd"] = "--scroll-area-overflow-x-end";
    /**
   * The distance from the vertical start edge in pixels.
   * @type {number}
   */ ScrollAreaViewportCssVars["scrollAreaOverflowYStart"] = "--scroll-area-overflow-y-start";
    /**
   * The distance from the vertical end edge in pixels.
   * @type {number}
   */ ScrollAreaViewportCssVars["scrollAreaOverflowYEnd"] = "--scroll-area-overflow-y-end";
    return ScrollAreaViewportCssVars;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewport.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaViewport",
    ()=>ScrollAreaViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/utils/getOffset.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/clamp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/styles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$onVisible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/utils/onVisible.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportCssVars.js [app-client] (ecmascript)");
// Module-level flag to ensure we only register the CSS properties once,
// regardless of how many Scroll Area components are mounted.
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
;
;
;
;
let scrollAreaOverflowVarsRegistered = false;
/**
 * Removes inheritance of the scroll area overflow CSS variables, which
 * improves rendering performance in complex scroll areas with deep subtrees.
 * Instead, each child must manually opt-in to using these properties by
 * specifying `inherit`.
 * See https://motion.dev/blog/web-animation-performance-tier-list
 * under the "Improving CSS variable performance" section.
 */ function removeCSSVariableInheritance() {
    if (scrollAreaOverflowVarsRegistered || // When `inherits: false`, specifying `inherit` on child elements doesn't work
    // in Safari. To let CSS features work correctly, this optimization must be skipped.
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebKit"]) {
        return;
    }
    if (typeof CSS !== 'undefined' && 'registerProperty' in CSS) {
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowXStart,
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowXEnd,
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowYStart,
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowYEnd
        ].forEach((name)=>{
            try {
                CSS.registerProperty({
                    name,
                    syntax: '<length>',
                    inherits: false,
                    initialValue: '0px'
                });
            } catch  {
            /* ignore already-registered */ }
        });
    }
    scrollAreaOverflowVarsRegistered = true;
}
const ScrollAreaViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function ScrollAreaViewport(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    const { viewportRef, scrollbarYRef, scrollbarXRef, thumbYRef, thumbXRef, cornerRef, cornerSize, setCornerSize, setThumbSize, rootId, setHiddenState, hiddenState, handleScroll, setHovering, setOverflowEdges, overflowEdges, overflowEdgeThreshold } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaRootContext"])();
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDirection"])();
    const programmaticScrollRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    const scrollEndTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const waitForAnimationsTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const computeThumbPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]": ()=>{
            const viewportEl = viewportRef.current;
            const scrollbarYEl = scrollbarYRef.current;
            const scrollbarXEl = scrollbarXRef.current;
            const thumbYEl = thumbYRef.current;
            const thumbXEl = thumbXRef.current;
            const cornerEl = cornerRef.current;
            if (!viewportEl) {
                return;
            }
            const scrollableContentHeight = viewportEl.scrollHeight;
            const scrollableContentWidth = viewportEl.scrollWidth;
            const viewportHeight = viewportEl.clientHeight;
            const viewportWidth = viewportEl.clientWidth;
            const scrollTop = viewportEl.scrollTop;
            const scrollLeft = viewportEl.scrollLeft;
            if (scrollableContentHeight === 0 || scrollableContentWidth === 0) {
                return;
            }
            const scrollbarYHidden = viewportHeight >= scrollableContentHeight;
            const scrollbarXHidden = viewportWidth >= scrollableContentWidth;
            const ratioX = viewportWidth / scrollableContentWidth;
            const ratioY = viewportHeight / scrollableContentHeight;
            const maxScrollLeft = Math.max(0, scrollableContentWidth - viewportWidth);
            const maxScrollTop = Math.max(0, scrollableContentHeight - viewportHeight);
            let scrollLeftFromStart = 0;
            let scrollLeftFromEnd = 0;
            if (!scrollbarXHidden) {
                if (direction === 'rtl') {
                    scrollLeftFromStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(-scrollLeft, 0, maxScrollLeft);
                } else {
                    scrollLeftFromStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollLeft, 0, maxScrollLeft);
                }
                scrollLeftFromEnd = maxScrollLeft - scrollLeftFromStart;
            }
            const scrollTopFromStart = !scrollbarYHidden ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollTop, 0, maxScrollTop) : 0;
            const scrollTopFromEnd = !scrollbarYHidden ? maxScrollTop - scrollTopFromStart : 0;
            const nextWidth = scrollbarXHidden ? 0 : viewportWidth;
            const nextHeight = scrollbarYHidden ? 0 : viewportHeight;
            let nextCornerWidth = 0;
            let nextCornerHeight = 0;
            if (!scrollbarXHidden && !scrollbarYHidden) {
                nextCornerWidth = scrollbarYEl?.offsetWidth || 0;
                nextCornerHeight = scrollbarXEl?.offsetHeight || 0;
            }
            // Only subtract corner size from scrollbar dimensions if the corner hasn't been sized yet.
            // Once sized, the layout will already account for it.
            const cornerNotYetSized = cornerSize.width === 0 && cornerSize.height === 0;
            const cornerWidthOffset = cornerNotYetSized ? nextCornerWidth : 0;
            const cornerHeightOffset = cornerNotYetSized ? nextCornerHeight : 0;
            const scrollbarXOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(scrollbarXEl, 'padding', 'x');
            const scrollbarYOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(scrollbarYEl, 'padding', 'y');
            const thumbXOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(thumbXEl, 'margin', 'x');
            const thumbYOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(thumbYEl, 'margin', 'y');
            const idealNextWidth = nextWidth - scrollbarXOffset - thumbXOffset;
            const idealNextHeight = nextHeight - scrollbarYOffset - thumbYOffset;
            const maxNextWidth = scrollbarXEl ? Math.min(scrollbarXEl.offsetWidth - cornerWidthOffset, idealNextWidth) : idealNextWidth;
            const maxNextHeight = scrollbarYEl ? Math.min(scrollbarYEl.offsetHeight - cornerHeightOffset, idealNextHeight) : idealNextHeight;
            const clampedNextWidth = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_THUMB_SIZE"], maxNextWidth * ratioX);
            const clampedNextHeight = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_THUMB_SIZE"], maxNextHeight * ratioY);
            setThumbSize({
                "ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]": (prevSize)=>{
                    if (prevSize.height === clampedNextHeight && prevSize.width === clampedNextWidth) {
                        return prevSize;
                    }
                    return {
                        width: clampedNextWidth,
                        height: clampedNextHeight
                    };
                }
            }["ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]"]);
            // Handle Y (vertical) scroll
            if (scrollbarYEl && thumbYEl) {
                const maxThumbOffsetY = scrollbarYEl.offsetHeight - clampedNextHeight - scrollbarYOffset - thumbYOffset;
                const scrollRangeY = scrollableContentHeight - viewportHeight;
                const scrollRatioY = scrollRangeY === 0 ? 0 : scrollTop / scrollRangeY;
                // In Safari, don't allow it to go negative or too far as `scrollTop` considers the rubber
                // band effect.
                const thumbOffsetY = Math.min(maxThumbOffsetY, Math.max(0, scrollRatioY * maxThumbOffsetY));
                thumbYEl.style.transform = `translate3d(0,${thumbOffsetY}px,0)`;
            }
            // Handle X (horizontal) scroll
            if (scrollbarXEl && thumbXEl) {
                const maxThumbOffsetX = scrollbarXEl.offsetWidth - clampedNextWidth - scrollbarXOffset - thumbXOffset;
                const scrollRangeX = scrollableContentWidth - viewportWidth;
                const scrollRatioX = scrollRangeX === 0 ? 0 : scrollLeft / scrollRangeX;
                // In Safari, don't allow it to go negative or too far as `scrollLeft` considers the rubber
                // band effect.
                const thumbOffsetX = direction === 'rtl' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollRatioX * maxThumbOffsetX, -maxThumbOffsetX, 0) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollRatioX * maxThumbOffsetX, 0, maxThumbOffsetX);
                thumbXEl.style.transform = `translate3d(${thumbOffsetX}px,0,0)`;
            }
            const clampedScrollLeftStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollLeftFromStart, 0, maxScrollLeft);
            const clampedScrollLeftEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollLeftFromEnd, 0, maxScrollLeft);
            const clampedScrollTopStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollTopFromStart, 0, maxScrollTop);
            const clampedScrollTopEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(scrollTopFromEnd, 0, maxScrollTop);
            const overflowMetricsPx = [
                [
                    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowXStart,
                    clampedScrollLeftStart
                ],
                [
                    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowXEnd,
                    clampedScrollLeftEnd
                ],
                [
                    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowYStart,
                    clampedScrollTopStart
                ],
                [
                    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportCssVars"].scrollAreaOverflowYEnd,
                    clampedScrollTopEnd
                ]
            ];
            for (const [cssVar, value] of overflowMetricsPx){
                viewportEl.style.setProperty(cssVar, `${value}px`);
            }
            if (cornerEl) {
                if (scrollbarXHidden || scrollbarYHidden) {
                    setCornerSize({
                        width: 0,
                        height: 0
                    });
                } else if (!scrollbarXHidden && !scrollbarYHidden) {
                    setCornerSize({
                        width: nextCornerWidth,
                        height: nextCornerHeight
                    });
                }
            }
            setHiddenState({
                "ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]": (prevState)=>{
                    const cornerHidden = scrollbarYHidden || scrollbarXHidden;
                    if (prevState.y === scrollbarYHidden && prevState.x === scrollbarXHidden && prevState.corner === cornerHidden) {
                        return prevState;
                    }
                    return {
                        y: scrollbarYHidden,
                        x: scrollbarXHidden,
                        corner: cornerHidden
                    };
                }
            }["ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]"]);
            const nextOverflowEdges = {
                xStart: !scrollbarXHidden && clampedScrollLeftStart > overflowEdgeThreshold.xStart,
                xEnd: !scrollbarXHidden && clampedScrollLeftEnd > overflowEdgeThreshold.xEnd,
                yStart: !scrollbarYHidden && clampedScrollTopStart > overflowEdgeThreshold.yStart,
                yEnd: !scrollbarYHidden && clampedScrollTopEnd > overflowEdgeThreshold.yEnd
            };
            setOverflowEdges({
                "ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]": (prev)=>{
                    if (prev.xStart === nextOverflowEdges.xStart && prev.xEnd === nextOverflowEdges.xEnd && prev.yStart === nextOverflowEdges.yStart && prev.yEnd === nextOverflowEdges.yEnd) {
                        return prev;
                    }
                    return nextOverflowEdges;
                }
            }["ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]"]);
        }
    }["ScrollAreaViewport.ScrollAreaViewport.useStableCallback[computeThumbPosition]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect": ()=>{
            if (!viewportRef.current) {
                return undefined;
            }
            removeCSSVariableInheritance();
            let hasInitialized = false;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$onVisible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onVisible"])(viewportRef.current, {
                "ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect": ()=>{
                    if (!hasInitialized) {
                        hasInitialized = true;
                        return;
                    }
                    computeThumbPosition();
                }
            }["ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect"]);
        }
    }["ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect"], [
        computeThumbPosition,
        viewportRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect": ()=>{
            // Wait for scrollbar-related refs to be set
            queueMicrotask(computeThumbPosition);
        }
    }["ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect"], [
        computeThumbPosition,
        hiddenState,
        direction
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect": ()=>{
            // `onMouseEnter` doesn't fire upon load, so we need to check if the viewport is already
            // being hovered.
            if (viewportRef.current?.matches(':hover')) {
                setHovering(true);
            }
        }
    }["ScrollAreaViewport.ScrollAreaViewport.useIsoLayoutEffect"], [
        viewportRef,
        setHovering
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ScrollAreaViewport.ScrollAreaViewport.useEffect": ()=>{
            const viewport = viewportRef.current;
            if (typeof ResizeObserver === 'undefined' || !viewport) {
                return undefined;
            }
            let hasInitialized = false;
            const ro = new ResizeObserver({
                "ScrollAreaViewport.ScrollAreaViewport.useEffect": ()=>{
                    // ResizeObserver fires once upon observing, so we skip the initial call
                    // to avoid double-calculating the thumb position on mount.
                    if (!hasInitialized) {
                        hasInitialized = true;
                        return;
                    }
                    computeThumbPosition();
                }
            }["ScrollAreaViewport.ScrollAreaViewport.useEffect"]);
            ro.observe(viewport);
            // If there are animations in the viewport, wait for them to finish and then recompute the thumb position.
            // This is necessary when the viewport contains a Dialog that is animating its popup on open
            // and the popup is using a transform for the animation, which affects the size of the viewport.
            // Without this, the thumb position will be incorrect until scrolling (i.e. if the scrollbar shows
            // on hover, the thumb has an incorrect size).
            // We assume the user is using `onOpenChangeComplete` to hide the scrollbar
            // until animations complete because otherwise the scrollbar would show the thumb resizing mid-animation.
            waitForAnimationsTimeout.start(0, {
                "ScrollAreaViewport.ScrollAreaViewport.useEffect": ()=>{
                    const animations = viewport.getAnimations({
                        subtree: true
                    });
                    if (animations.length === 0) {
                        return;
                    }
                    Promise.all(animations.map({
                        "ScrollAreaViewport.ScrollAreaViewport.useEffect": (animation)=>animation.finished
                    }["ScrollAreaViewport.ScrollAreaViewport.useEffect"])).then(computeThumbPosition).catch({
                        "ScrollAreaViewport.ScrollAreaViewport.useEffect": ()=>{}
                    }["ScrollAreaViewport.ScrollAreaViewport.useEffect"]);
                }
            }["ScrollAreaViewport.ScrollAreaViewport.useEffect"]);
            return ({
                "ScrollAreaViewport.ScrollAreaViewport.useEffect": ()=>{
                    ro.disconnect();
                    waitForAnimationsTimeout.clear();
                }
            })["ScrollAreaViewport.ScrollAreaViewport.useEffect"];
        }
    }["ScrollAreaViewport.ScrollAreaViewport.useEffect"], [
        computeThumbPosition,
        viewportRef,
        waitForAnimationsTimeout
    ]);
    function handleUserInteraction() {
        programmaticScrollRef.current = false;
    }
    const props = {
        role: 'presentation',
        ...rootId && {
            'data-id': `${rootId}-viewport`
        },
        // https://accessibilityinsights.io/info-examples/web/scrollable-region-focusable/
        ...(!hiddenState.x || !hiddenState.y) && {
            tabIndex: 0
        },
        className: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styleDisableScrollbar"].className,
        style: {
            overflow: 'scroll'
        },
        onScroll () {
            if (!viewportRef.current) {
                return;
            }
            computeThumbPosition();
            if (!programmaticScrollRef.current) {
                handleScroll({
                    x: viewportRef.current.scrollLeft,
                    y: viewportRef.current.scrollTop
                });
            }
            // Debounce the restoration of the programmatic flag so that it only
            // flips back to `true` once scrolling has come to a rest. This ensures
            // that momentum scrolling (where no further user-interaction events fire)
            // is still treated as user-driven.
            // 100 ms without scroll events ≈ scroll end
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event
            scrollEndTimeout.start(100, ()=>{
                programmaticScrollRef.current = true;
            });
        },
        onWheel: handleUserInteraction,
        onTouchMove: handleUserInteraction,
        onPointerMove: handleUserInteraction,
        onPointerEnter: handleUserInteraction,
        onKeyDown: handleUserInteraction
    };
    const viewportState = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaViewport.ScrollAreaViewport.useMemo[viewportState]": ()=>({
                hasOverflowX: !hiddenState.x,
                hasOverflowY: !hiddenState.y,
                overflowXStart: overflowEdges.xStart,
                overflowXEnd: overflowEdges.xEnd,
                overflowYStart: overflowEdges.yStart,
                overflowYEnd: overflowEdges.yEnd,
                cornerHidden: hiddenState.corner
            })
    }["ScrollAreaViewport.ScrollAreaViewport.useMemo[viewportState]"], [
        hiddenState.x,
        hiddenState.y,
        hiddenState.corner,
        overflowEdges
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            viewportRef
        ],
        state: viewportState,
        props: [
            props,
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrollAreaStateAttributesMapping"]
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaViewport.ScrollAreaViewport.useMemo[contextValue]": ()=>({
                computeThumbPosition
            })
    }["ScrollAreaViewport.ScrollAreaViewport.useMemo[contextValue]"], [
        computeThumbPosition
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewportContext"].Provider, {
        value: contextValue,
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) ScrollAreaViewport.displayName = "ScrollAreaViewport";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaScrollbarContext",
    ()=>ScrollAreaScrollbarContext,
    "useScrollAreaScrollbarContext",
    ()=>useScrollAreaScrollbarContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ScrollAreaScrollbarContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ScrollAreaScrollbarContext.displayName = "ScrollAreaScrollbarContext";
function useScrollAreaScrollbarContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ScrollAreaScrollbarContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ScrollAreaScrollbarContext is missing. ScrollAreaScrollbar parts must be placed within <ScrollArea.Scrollbar>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaScrollbarCssVars",
    ()=>ScrollAreaScrollbarCssVars
]);
let ScrollAreaScrollbarCssVars = /*#__PURE__*/ function(ScrollAreaScrollbarCssVars) {
    /**
   * The scroll area thumb's height.
   * @type {number}
   */ ScrollAreaScrollbarCssVars["scrollAreaThumbHeight"] = "--scroll-area-thumb-height";
    /**
   * The scroll area thumb's width.
   * @type {number}
   */ ScrollAreaScrollbarCssVars["scrollAreaThumbWidth"] = "--scroll-area-thumb-width";
    return ScrollAreaScrollbarCssVars;
}({});
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaScrollbar",
    ()=>ScrollAreaScrollbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/utils/getOffset.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootCssVars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
const ScrollAreaScrollbar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function ScrollAreaScrollbar(componentProps, forwardedRef) {
    const { render, className, orientation = 'vertical', keepMounted = false, ...elementProps } = componentProps;
    const { hovering, scrollingX, scrollingY, hiddenState, overflowEdges, scrollbarYRef, scrollbarXRef, viewportRef, thumbYRef, thumbXRef, handlePointerDown, handlePointerUp, rootId, thumbSize } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaRootContext"])();
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaScrollbar.ScrollAreaScrollbar.useMemo[state]": ()=>({
                hovering,
                scrolling: ({
                    horizontal: scrollingX,
                    vertical: scrollingY
                })[orientation],
                orientation,
                hasOverflowX: !hiddenState.x,
                hasOverflowY: !hiddenState.y,
                overflowXStart: overflowEdges.xStart,
                overflowXEnd: overflowEdges.xEnd,
                overflowYStart: overflowEdges.yStart,
                overflowYEnd: overflowEdges.yEnd,
                cornerHidden: hiddenState.corner
            })
    }["ScrollAreaScrollbar.ScrollAreaScrollbar.useMemo[state]"], [
        hovering,
        scrollingX,
        scrollingY,
        orientation,
        hiddenState,
        overflowEdges
    ]);
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDirection"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ScrollAreaScrollbar.ScrollAreaScrollbar.useEffect": ()=>{
            const viewportEl = viewportRef.current;
            const scrollbarEl = orientation === 'vertical' ? scrollbarYRef.current : scrollbarXRef.current;
            if (!scrollbarEl) {
                return undefined;
            }
            function handleWheel(event) {
                if (!viewportEl || !scrollbarEl || event.ctrlKey) {
                    return;
                }
                event.preventDefault();
                if (orientation === 'vertical') {
                    if (viewportEl.scrollTop === 0 && event.deltaY < 0) {
                        return;
                    }
                } else if (viewportEl.scrollLeft === 0 && event.deltaX < 0) {
                    return;
                }
                if (orientation === 'vertical') {
                    if (viewportEl.scrollTop === viewportEl.scrollHeight - viewportEl.clientHeight && event.deltaY > 0) {
                        return;
                    }
                } else if (viewportEl.scrollLeft === viewportEl.scrollWidth - viewportEl.clientWidth && event.deltaX > 0) {
                    return;
                }
                if (orientation === 'vertical') {
                    viewportEl.scrollTop += event.deltaY;
                } else {
                    viewportEl.scrollLeft += event.deltaX;
                }
            }
            scrollbarEl.addEventListener('wheel', handleWheel, {
                passive: false
            });
            return ({
                "ScrollAreaScrollbar.ScrollAreaScrollbar.useEffect": ()=>{
                    scrollbarEl.removeEventListener('wheel', handleWheel);
                }
            })["ScrollAreaScrollbar.ScrollAreaScrollbar.useEffect"];
        }
    }["ScrollAreaScrollbar.ScrollAreaScrollbar.useEffect"], [
        orientation,
        scrollbarXRef,
        scrollbarYRef,
        viewportRef
    ]);
    const props = {
        ...rootId && {
            'data-id': `${rootId}-scrollbar`
        },
        onPointerDown (event) {
            if (event.button !== 0) {
                return;
            }
            // Ignore clicks on thumb
            if (event.currentTarget !== event.target) {
                return;
            }
            if (!viewportRef.current) {
                return;
            }
            // Handle Y-axis (vertical) scroll
            if (thumbYRef.current && scrollbarYRef.current && orientation === 'vertical') {
                const thumbYOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(thumbYRef.current, 'margin', 'y');
                const scrollbarYOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(scrollbarYRef.current, 'padding', 'y');
                const thumbHeight = thumbYRef.current.offsetHeight;
                const trackRectY = scrollbarYRef.current.getBoundingClientRect();
                const clickY = event.clientY - trackRectY.top - thumbHeight / 2 - scrollbarYOffset + thumbYOffset / 2;
                const scrollableContentHeight = viewportRef.current.scrollHeight;
                const viewportHeight = viewportRef.current.clientHeight;
                const maxThumbOffsetY = scrollbarYRef.current.offsetHeight - thumbHeight - scrollbarYOffset - thumbYOffset;
                const scrollRatioY = clickY / maxThumbOffsetY;
                const newScrollTop = scrollRatioY * (scrollableContentHeight - viewportHeight);
                viewportRef.current.scrollTop = newScrollTop;
            }
            if (thumbXRef.current && scrollbarXRef.current && orientation === 'horizontal') {
                const thumbXOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(thumbXRef.current, 'margin', 'x');
                const scrollbarXOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$utils$2f$getOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffset"])(scrollbarXRef.current, 'padding', 'x');
                const thumbWidth = thumbXRef.current.offsetWidth;
                const trackRectX = scrollbarXRef.current.getBoundingClientRect();
                const clickX = event.clientX - trackRectX.left - thumbWidth / 2 - scrollbarXOffset + thumbXOffset / 2;
                const scrollableContentWidth = viewportRef.current.scrollWidth;
                const viewportWidth = viewportRef.current.clientWidth;
                const maxThumbOffsetX = scrollbarXRef.current.offsetWidth - thumbWidth - scrollbarXOffset - thumbXOffset;
                const scrollRatioX = clickX / maxThumbOffsetX;
                let newScrollLeft;
                if (direction === 'rtl') {
                    // In RTL, invert the scroll direction
                    newScrollLeft = (1 - scrollRatioX) * (scrollableContentWidth - viewportWidth);
                    // Adjust for browsers that use negative scrollLeft in RTL
                    if (viewportRef.current.scrollLeft <= 0) {
                        newScrollLeft = -newScrollLeft;
                    }
                } else {
                    newScrollLeft = scrollRatioX * (scrollableContentWidth - viewportWidth);
                }
                viewportRef.current.scrollLeft = newScrollLeft;
            }
            handlePointerDown(event);
        },
        onPointerUp: handlePointerUp,
        style: {
            position: 'absolute',
            touchAction: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            ...orientation === 'vertical' && {
                top: 0,
                bottom: `var(${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootCssVars"].scrollAreaCornerHeight})`,
                insetInlineEnd: 0,
                [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbarCssVars"].scrollAreaThumbHeight]: `${thumbSize.height}px`
            },
            ...orientation === 'horizontal' && {
                insetInlineStart: 0,
                insetInlineEnd: `var(${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRootCssVars"].scrollAreaCornerWidth})`,
                bottom: 0,
                [__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbarCssVars"].scrollAreaThumbWidth]: `${thumbSize.width}px`
            }
        }
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            orientation === 'vertical' ? scrollbarYRef : scrollbarXRef
        ],
        state,
        props: [
            props,
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrollAreaStateAttributesMapping"]
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaScrollbar.ScrollAreaScrollbar.useMemo[contextValue]": ()=>({
                orientation
            })
    }["ScrollAreaScrollbar.ScrollAreaScrollbar.useMemo[contextValue]"], [
        orientation
    ]);
    const isHidden = orientation === 'vertical' ? hiddenState.y : hiddenState.x;
    const shouldRender = keepMounted || !isHidden;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbarContext"].Provider, {
        value: contextValue,
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/content/ScrollAreaContent.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaContent",
    ()=>ScrollAreaContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const ScrollAreaContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function ScrollAreaContent(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    const contentWrapperRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const { computeThumbPosition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewportContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaViewportContext"])();
    const { viewportState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaRootContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "ScrollAreaContent.ScrollAreaContent.useIsoLayoutEffect": ()=>{
            if (typeof ResizeObserver === 'undefined') {
                return undefined;
            }
            let hasInitialized = false;
            const ro = new ResizeObserver({
                "ScrollAreaContent.ScrollAreaContent.useIsoLayoutEffect": ()=>{
                    // ResizeObserver fires once upon observing, so we skip the initial call
                    // to avoid double-calculating the thumb position on mount.
                    if (!hasInitialized) {
                        hasInitialized = true;
                        return;
                    }
                    computeThumbPosition();
                }
            }["ScrollAreaContent.ScrollAreaContent.useIsoLayoutEffect"]);
            if (contentWrapperRef.current) {
                ro.observe(contentWrapperRef.current);
            }
            return ({
                "ScrollAreaContent.ScrollAreaContent.useIsoLayoutEffect": ()=>{
                    ro.disconnect();
                }
            })["ScrollAreaContent.ScrollAreaContent.useIsoLayoutEffect"];
        }
    }["ScrollAreaContent.ScrollAreaContent.useIsoLayoutEffect"], [
        computeThumbPosition
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            contentWrapperRef
        ],
        state: viewportState,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$stateAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrollAreaStateAttributesMapping"],
        props: [
            {
                role: 'presentation',
                style: {
                    minWidth: 'fit-content'
                }
            },
            elementProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ScrollAreaContent.displayName = "ScrollAreaContent";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/thumb/ScrollAreaThumb.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaThumb",
    ()=>ScrollAreaThumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const ScrollAreaThumb = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function ScrollAreaThumb(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    const { thumbYRef, thumbXRef, handlePointerDown, handlePointerMove, handlePointerUp, setScrollingX, setScrollingY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaRootContext"])();
    const { orientation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaScrollbarContext"])();
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ScrollAreaThumb.ScrollAreaThumb.useMemo[state]": ()=>({
                orientation
            })
    }["ScrollAreaThumb.ScrollAreaThumb.useMemo[state]"], [
        orientation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            orientation === 'vertical' ? thumbYRef : thumbXRef
        ],
        state,
        props: [
            {
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp (event) {
                    if (orientation === 'vertical') {
                        setScrollingY(false);
                    }
                    if (orientation === 'horizontal') {
                        setScrollingX(false);
                    }
                    handlePointerUp(event);
                },
                style: {
                    ...orientation === 'vertical' && {
                        height: `var(${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbarCssVars"].scrollAreaThumbHeight})`
                    },
                    ...orientation === 'horizontal' && {
                        width: `var(${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbarCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbarCssVars"].scrollAreaThumbWidth})`
                    }
                }
            },
            elementProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ScrollAreaThumb.displayName = "ScrollAreaThumb";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/corner/ScrollAreaCorner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAreaCorner",
    ()=>ScrollAreaCorner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
'use client';
;
;
;
const ScrollAreaCorner = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function ScrollAreaCorner(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    const { cornerRef, cornerSize, hiddenState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAreaRootContext"])();
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            cornerRef
        ],
        props: [
            {
                style: {
                    position: 'absolute',
                    bottom: 0,
                    insetInlineEnd: 0,
                    width: cornerSize.width,
                    height: cornerSize.height
                }
            },
            elementProps
        ]
    });
    if (hiddenState.corner) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ScrollAreaCorner.displayName = "ScrollAreaCorner";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/index.parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Content",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$content$2f$ScrollAreaContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaContent"],
    "Corner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$corner$2f$ScrollAreaCorner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaCorner"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaRoot"],
    "Scrollbar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"],
    "Thumb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$thumb$2f$ScrollAreaThumb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"],
    "Viewport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaViewport"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/index.parts.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$root$2f$ScrollAreaRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$viewport$2f$ScrollAreaViewport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewport.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$scrollbar$2f$ScrollAreaScrollbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$content$2f$ScrollAreaContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/content/ScrollAreaContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$thumb$2f$ScrollAreaThumb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/thumb/ScrollAreaThumb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$corner$2f$ScrollAreaCorner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/corner/ScrollAreaCorner.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/index.parts.js [app-client] (ecmascript) <export * as ScrollArea>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$scroll$2d$area$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/scroll-area/index.parts.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/csp-provider/CSPContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSPContext",
    ()=>CSPContext,
    "useCSPContext",
    ()=>useCSPContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const CSPContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CSPContext.displayName = "CSPContext";
const DEFAULT_CSP_CONTEXT_VALUE = {
    disableStyleElements: false
};
function useCSPContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CSPContext) ?? DEFAULT_CSP_CONTEXT_VALUE;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/context-menu/root/ContextMenuRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextMenuRootContext",
    ()=>ContextMenuRootContext,
    "useContextMenuRootContext",
    ()=>useContextMenuRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ContextMenuRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ContextMenuRootContext.displayName = "ContextMenuRootContext";
function useContextMenuRootContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ContextMenuRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/toolbar/root/ToolbarRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolbarRootContext",
    ()=>ToolbarRootContext,
    "useToolbarRootContext",
    ()=>useToolbarRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const ToolbarRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ToolbarRootContext.displayName = "ToolbarRootContext";
function useToolbarRootContext(optional) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ToolbarRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/menubar/MenubarContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenubarContext",
    ()=>MenubarContext,
    "useMenubarContext",
    ()=>useMenubarContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const MenubarContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
if ("TURBOPACK compile-time truthy", 1) MenubarContext.displayName = "MenubarContext";
function useMenubarContext(optional) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](MenubarContext);
    if (context === null && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
]);

//# sourceMappingURL=cc419_%40base-ui_react_esm_cb4a6fa3._.js.map