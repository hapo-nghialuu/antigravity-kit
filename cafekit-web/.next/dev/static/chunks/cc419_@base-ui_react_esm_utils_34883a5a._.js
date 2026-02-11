(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getStateAttributesProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStateAttributesProps",
    ()=>getStateAttributesProps
]);
function getStateAttributesProps(state, customMapping) {
    const props = {};
    /* eslint-disable-next-line guard-for-in */ for(const key in state){
        const value = state[key];
        if (customMapping?.hasOwnProperty(key)) {
            const customProps = customMapping[key](value);
            if (customProps != null) {
                Object.assign(props, customProps);
            }
            continue;
        }
        if (value === true) {
            props[`data-${key.toLowerCase()}`] = '';
        } else if (value) {
            props[`data-${key.toLowerCase()}`] = value.toString();
        }
    }
    return props;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveClassName.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */ __turbopack_context__.s([
    "resolveClassName",
    ()=>resolveClassName
]);
function resolveClassName(className, state) {
    return typeof className === 'function' ? className(state) : className;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveStyle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */ __turbopack_context__.s([
    "resolveStyle",
    ()=>resolveStyle
]);
function resolveStyle(style, state) {
    return typeof style === 'function' ? style(state) : style;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRenderElement",
    ()=>useRenderElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$getReactElementRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/getReactElementRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/mergeObjects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getStateAttributesProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getStateAttributesProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveClassName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveStyle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
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
function useRenderElement(element, componentProps, params = {}) {
    const renderProp = componentProps.render;
    const outProps = useRenderElementProps(componentProps, params);
    if (params.enabled === false) {
        return null;
    }
    const state = params.state ?? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    return evaluateRenderProp(element, renderProp, outProps, state);
}
/**
 * Computes render element final props.
 */ function useRenderElementProps(componentProps, params = {}) {
    const { className: classNameProp, style: styleProp, render: renderProp } = componentProps;
    const { state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], ref, props, stateAttributesMapping, enabled = true } = params;
    const className = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveClassName"])(classNameProp, state) : undefined;
    const style = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStyle"])(styleProp, state) : undefined;
    const stateProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getStateAttributesProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStateAttributesProps"])(state, stateAttributesMapping) : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const outProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(stateProps, Array.isArray(props) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergePropsN"])(props) : props) ?? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
    // switching between them at runtime is safe. If this assertion fails, React will
    // throw at runtime anyway.
    // This also skips the `useMergedRefs` call on the server, which is fine because
    // refs are not used on the server side.
    /* eslint-disable react-hooks/rules-of-hooks */ if (typeof document !== 'undefined') {
        if (!enabled) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(null, null);
        } else if (Array.isArray(ref)) {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefsN"])([
                outProps.ref,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$getReactElementRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactElementRef"])(renderProp),
                ...ref
            ]);
        } else {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(outProps.ref, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$getReactElementRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactElementRef"])(renderProp), ref);
        }
    }
    if (!enabled) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    }
    if (className !== undefined) {
        outProps.className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClassNames"])(outProps.className, className);
    }
    if (style !== undefined) {
        outProps.style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(outProps.style, style);
    }
    return outProps;
}
function evaluateRenderProp(element, render, props, state) {
    if (render) {
        if (typeof render === 'function') {
            return render(props, state);
        }
        const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(props, render.props);
        mergedProps.ref = props.ref;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](render, mergedProps);
    }
    if (element) {
        if (typeof element === 'string') {
            return renderTag(element, props);
        }
    }
    // Unreachable, but the typings on `useRenderElement` need to be reworked
    // to annotate it correctly.
    throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: Render element or function are not defined.' : "TURBOPACK unreachable");
}
function renderTag(Tag, props) {
    if (Tag === 'button') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("button", {
            type: "button",
            ...props,
            key: props.key
        });
    }
    if (Tag === 'img') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("img", {
            alt: "",
            ...props,
            key: props.key
        });
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](Tag, props);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransitionStatusDataAttributes",
    ()=>TransitionStatusDataAttributes,
    "transitionStatusMapping",
    ()=>transitionStatusMapping
]);
let TransitionStatusDataAttributes = /*#__PURE__*/ function(TransitionStatusDataAttributes) {
    /**
   * Present when the component is animating in.
   */ TransitionStatusDataAttributes["startingStyle"] = "data-starting-style";
    /**
   * Present when the component is animating out.
   */ TransitionStatusDataAttributes["endingStyle"] = "data-ending-style";
    return TransitionStatusDataAttributes;
}({});
const STARTING_HOOK = {
    [TransitionStatusDataAttributes.startingStyle]: ''
};
const ENDING_HOOK = {
    [TransitionStatusDataAttributes.endingStyle]: ''
};
const transitionStatusMapping = {
    transitionStatus (value) {
        if (value === 'starting') {
            return STARTING_HOOK;
        }
        if (value === 'ending') {
            return ENDING_HOOK;
        }
        return null;
    }
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommonPopupDataAttributes",
    ()=>CommonPopupDataAttributes,
    "CommonTriggerDataAttributes",
    ()=>CommonTriggerDataAttributes,
    "popupStateMapping",
    ()=>popupStateMapping,
    "pressableTriggerOpenStateMapping",
    ()=>pressableTriggerOpenStateMapping,
    "triggerOpenStateMapping",
    ()=>triggerOpenStateMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-client] (ecmascript)");
;
let CommonPopupDataAttributes = function(CommonPopupDataAttributes) {
    /**
   * Present when the popup is open.
   */ CommonPopupDataAttributes["open"] = "data-open";
    /**
   * Present when the popup is closed.
   */ CommonPopupDataAttributes["closed"] = "data-closed";
    /**
   * Present when the popup is animating in.
   */ CommonPopupDataAttributes[CommonPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the popup is animating out.
   */ CommonPopupDataAttributes[CommonPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the anchor is hidden.
   */ CommonPopupDataAttributes["anchorHidden"] = "data-anchor-hidden";
    return CommonPopupDataAttributes;
}({});
let CommonTriggerDataAttributes = /*#__PURE__*/ function(CommonTriggerDataAttributes) {
    /**
   * Present when the popup is open.
   */ CommonTriggerDataAttributes["popupOpen"] = "data-popup-open";
    /**
   * Present when a pressable trigger is pressed.
   */ CommonTriggerDataAttributes["pressed"] = "data-pressed";
    return CommonTriggerDataAttributes;
}({});
const TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: ''
};
const PRESSABLE_TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: '',
    [CommonTriggerDataAttributes.pressed]: ''
};
const POPUP_OPEN_HOOK = {
    [CommonPopupDataAttributes.open]: ''
};
const POPUP_CLOSED_HOOK = {
    [CommonPopupDataAttributes.closed]: ''
};
const ANCHOR_HIDDEN_HOOK = {
    [CommonPopupDataAttributes.anchorHidden]: ''
};
const triggerOpenStateMapping = {
    open (value) {
        if (value) {
            return TRIGGER_HOOK;
        }
        return null;
    }
};
const pressableTriggerOpenStateMapping = {
    open (value) {
        if (value) {
            return PRESSABLE_TRIGGER_HOOK;
        }
        return null;
    }
};
const popupStateMapping = {
    open (value) {
        if (value) {
            return POPUP_OPEN_HOOK;
        }
        return POPUP_CLOSED_HOOK;
    },
    anchorHidden (value) {
        if (value) {
            return ANCHOR_HIDDEN_HOOK;
        }
        return null;
    }
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useFocusableWhenDisabled.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusableWhenDisabled",
    ()=>useFocusableWhenDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFocusableWhenDisabled.useMemo[props]": ()=>{
            const additionalProps = {
                // allow Tabbing away from focusableWhenDisabled elements
                onKeyDown (event) {
                    if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                        event.preventDefault();
                    }
                }
            };
            if (!composite) {
                additionalProps.tabIndex = tabIndexProp;
                if (!isNativeButton && disabled) {
                    additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
                }
            }
            if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
                additionalProps['aria-disabled'] = disabled;
            }
            if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
                additionalProps.disabled = disabled;
            }
            return additionalProps;
        }
    }["useFocusableWhenDisabled.useMemo[props]"], [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChangeEventDetails",
    ()=>createChangeEventDetails,
    "createGenericEventDetails",
    ()=>createGenericEventDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
;
;
function createChangeEventDetails(reason, event, trigger, customProperties) {
    let canceled = false;
    let allowPropagation = false;
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const details = {
        reason,
        event: event ?? new Event('base-ui'),
        cancel () {
            canceled = true;
        },
        allowPropagation () {
            allowPropagation = true;
        },
        get isCanceled () {
            return canceled;
        },
        get isPropagationAllowed () {
            return allowPropagation;
        },
        trigger,
        ...custom
    };
    return details;
}
function createGenericEventDetails(reason, event, customProperties) {
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const details = {
        reason,
        event: event ?? new Event('base-ui'),
        ...custom
    };
    return details;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelOpen",
    ()=>cancelOpen,
    "chipRemovePress",
    ()=>chipRemovePress,
    "clearPress",
    ()=>clearPress,
    "closePress",
    ()=>closePress,
    "decrementPress",
    ()=>decrementPress,
    "disabled",
    ()=>disabled,
    "drag",
    ()=>drag,
    "escapeKey",
    ()=>escapeKey,
    "focusOut",
    ()=>focusOut,
    "imperativeAction",
    ()=>imperativeAction,
    "incrementPress",
    ()=>incrementPress,
    "inputBlur",
    ()=>inputBlur,
    "inputChange",
    ()=>inputChange,
    "inputClear",
    ()=>inputClear,
    "inputPaste",
    ()=>inputPaste,
    "itemPress",
    ()=>itemPress,
    "keyboard",
    ()=>keyboard,
    "linkPress",
    ()=>linkPress,
    "listNavigation",
    ()=>listNavigation,
    "none",
    ()=>none,
    "outsidePress",
    ()=>outsidePress,
    "pointer",
    ()=>pointer,
    "scrub",
    ()=>scrub,
    "siblingOpen",
    ()=>siblingOpen,
    "trackPress",
    ()=>trackPress,
    "triggerFocus",
    ()=>triggerFocus,
    "triggerHover",
    ()=>triggerHover,
    "triggerPress",
    ()=>triggerPress,
    "wheel",
    ()=>wheel,
    "windowResize",
    ()=>windowResize
]);
const none = 'none';
const triggerPress = 'trigger-press';
const triggerHover = 'trigger-hover';
const triggerFocus = 'trigger-focus';
const outsidePress = 'outside-press';
const itemPress = 'item-press';
const closePress = 'close-press';
const linkPress = 'link-press';
const clearPress = 'clear-press';
const chipRemovePress = 'chip-remove-press';
const trackPress = 'track-press';
const incrementPress = 'increment-press';
const decrementPress = 'decrement-press';
const inputChange = 'input-change';
const inputClear = 'input-clear';
const inputBlur = 'input-blur';
const inputPaste = 'input-paste';
const focusOut = 'focus-out';
const escapeKey = 'escape-key';
const listNavigation = 'list-navigation';
const keyboard = 'keyboard';
const pointer = 'pointer';
const drag = 'drag';
const wheel = 'wheel';
const scrub = 'scrub';
const cancelOpen = 'cancel-open';
const siblingOpen = 'sibling-open';
const disabled = 'disabled';
const imperativeAction = 'imperative-action';
const windowResize = 'window-resize';
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REASONS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript)");
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseUiId",
    ()=>useBaseUiId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useId.js [app-client] (ecmascript)");
'use client';
;
function useBaseUiId(idOverride) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(idOverride, 'base-ui');
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/FocusGuard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FocusGuard",
    ()=>FocusGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/visuallyHidden.js [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const FocusGuard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FocusGuard(props, ref) {
    const [role, setRole] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FocusGuard.FocusGuard.useIsoLayoutEffect": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafari"]) {
                // Unlike other screen readers such as NVDA and JAWS, the virtual cursor
                // on VoiceOver does trigger the onFocus event, so we can use the focus
                // trap element. On Safari, only buttons trigger the onFocus event.
                setRole('button');
            }
        }
    }["FocusGuard.FocusGuard.useIsoLayoutEffect"], []);
    const restProps = {
        tabIndex: 0,
        // Role is only for VoiceOver
        role
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ...props,
        ref: ref,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visuallyHidden"],
        "aria-hidden": role ? undefined : true,
        ...restProps,
        "data-base-ui-focus-guard": ""
    });
});
if ("TURBOPACK compile-time truthy", 1) FocusGuard.displayName = "FocusGuard";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/constants.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLICK_TRIGGER_IDENTIFIER",
    ()=>CLICK_TRIGGER_IDENTIFIER,
    "DISABLED_TRANSITIONS_STYLE",
    ()=>DISABLED_TRANSITIONS_STYLE,
    "DROPDOWN_COLLISION_AVOIDANCE",
    ()=>DROPDOWN_COLLISION_AVOIDANCE,
    "PATIENT_CLICK_THRESHOLD",
    ()=>PATIENT_CLICK_THRESHOLD,
    "POPUP_COLLISION_AVOIDANCE",
    ()=>POPUP_COLLISION_AVOIDANCE,
    "TYPEAHEAD_RESET_MS",
    ()=>TYPEAHEAD_RESET_MS,
    "ownerVisuallyHidden",
    ()=>ownerVisuallyHidden
]);
const TYPEAHEAD_RESET_MS = 500;
const PATIENT_CLICK_THRESHOLD = 500;
const DISABLED_TRANSITIONS_STYLE = {
    style: {
        transition: 'none'
    }
};
;
const CLICK_TRIGGER_IDENTIFIER = 'data-base-ui-click-trigger';
const DROPDOWN_COLLISION_AVOIDANCE = {
    fallbackAxisSide: 'none'
};
const POPUP_COLLISION_AVOIDANCE = {
    fallbackAxisSide: 'end'
};
const ownerVisuallyHidden = {
    clipPath: 'inset(50%)',
    position: 'fixed',
    top: 0,
    left: 0
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveRef.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */ __turbopack_context__.s([
    "resolveRef",
    ()=>resolveRef
]);
function resolveRef(maybeRef) {
    if (maybeRef == null) {
        return maybeRef;
    }
    return 'current' in maybeRef ? maybeRef.current : maybeRef;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useAnimationsFinished.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimationsFinished",
    ()=>useAnimationsFinished
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useAnimationFrame.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useAnimationsFinished.useStableCallback": (fnToExecute, /**
   * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
   * can be used to abort `fnToExecute` before all the animations have finished.
   * @default null
   */ signal = null)=>{
            frame.cancel();
            function done() {
                // Synchronously flush the unmounting of the component so that the browser doesn't
                // paint: https://github.com/mui/base-ui/issues/979
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"](fnToExecute);
            }
            const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(elementOrRef);
            if (element == null) {
                return;
            }
            const resolvedElement = element;
            if (typeof resolvedElement.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
                fnToExecute();
            } else {
                function execWaitForStartingStyleRemoved() {
                    const startingStyleAttribute = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].startingStyle;
                    // If `[data-starting-style]` isn't present, fall back to waiting one more frame
                    // to give "open" animations a chance to be registered.
                    if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
                        frame.request(exec);
                        return;
                    }
                    // Wait for `[data-starting-style]` to have been removed.
                    const attributeObserver = new MutationObserver({
                        "useAnimationsFinished.useStableCallback.execWaitForStartingStyleRemoved": ()=>{
                            if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
                                attributeObserver.disconnect();
                                exec();
                            }
                        }
                    }["useAnimationsFinished.useStableCallback.execWaitForStartingStyleRemoved"]);
                    attributeObserver.observe(resolvedElement, {
                        attributes: true,
                        attributeFilter: [
                            startingStyleAttribute
                        ]
                    });
                    signal?.addEventListener('abort', {
                        "useAnimationsFinished.useStableCallback.execWaitForStartingStyleRemoved": ()=>attributeObserver.disconnect()
                    }["useAnimationsFinished.useStableCallback.execWaitForStartingStyleRemoved"], {
                        once: true
                    });
                }
                function exec() {
                    Promise.all(resolvedElement.getAnimations().map({
                        "useAnimationsFinished.useStableCallback.exec": (anim)=>anim.finished
                    }["useAnimationsFinished.useStableCallback.exec"])).then({
                        "useAnimationsFinished.useStableCallback.exec": ()=>{
                            if (signal?.aborted) {
                                return;
                            }
                            done();
                        }
                    }["useAnimationsFinished.useStableCallback.exec"]).catch({
                        "useAnimationsFinished.useStableCallback.exec": ()=>{
                            const currentAnimations = resolvedElement.getAnimations();
                            if (treatAbortedAsFinished) {
                                if (signal?.aborted) {
                                    return;
                                }
                                done();
                            } else if (currentAnimations.length > 0 && currentAnimations.some({
                                "useAnimationsFinished.useStableCallback.exec": (anim)=>anim.pending || anim.playState !== 'finished'
                            }["useAnimationsFinished.useStableCallback.exec"])) {
                                // Sometimes animations can be aborted because a property they depend on changes while the animation plays.
                                // In such cases, we need to re-check if any new animations have started.
                                exec();
                            }
                        }
                    }["useAnimationsFinished.useStableCallback.exec"]);
                }
                if (waitForStartingStyleRemoved) {
                    execWaitForStartingStyleRemoved();
                    return;
                }
                frame.request(exec);
            }
        }
    }["useAnimationsFinished.useStableCallback"]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenChangeComplete.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenChangeComplete",
    ()=>useOpenChangeComplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useAnimationsFinished$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useAnimationsFinished.js [app-client] (ecmascript)");
'use client';
;
;
;
function useOpenChangeComplete(parameters) {
    const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters;
    const onComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(onCompleteParam);
    const runOnceAnimationsFinish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useAnimationsFinished$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationsFinished"])(ref, open, false);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useOpenChangeComplete.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            const abortController = new AbortController();
            runOnceAnimationsFinish(onComplete, abortController.signal);
            return ({
                "useOpenChangeComplete.useEffect": ()=>{
                    abortController.abort();
                }
            })["useOpenChangeComplete.useEffect"];
        }
    }["useOpenChangeComplete.useEffect"], [
        enabled,
        open,
        onComplete,
        runOnceAnimationsFinish
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/InternalBackdrop.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternalBackdrop",
    ()=>InternalBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
const InternalBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function InternalBackdrop(props, ref) {
    const { cutout, ...otherProps } = props;
    let clipPath;
    if (cutout) {
        const rect = cutout?.getBoundingClientRect();
        clipPath = `polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% 0%,
      ${rect.left}px ${rect.top}px,
      ${rect.left}px ${rect.bottom}px,
      ${rect.right}px ${rect.bottom}px,
      ${rect.right}px ${rect.top}px,
      ${rect.left}px ${rect.top}px
    )`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        role: "presentation",
        "data-base-ui-inert": "",
        ...otherProps,
        style: {
            position: 'fixed',
            inset: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            clipPath
        }
    });
});
if ("TURBOPACK compile-time truthy", 1) InternalBackdrop.displayName = "InternalBackdrop";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenInteractionType.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenInteractionType",
    ()=>useOpenInteractionType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useEnhancedClickHandler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useEnhancedClickHandler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function useOpenInteractionType(open) {
    const [openMethod, setOpenMethod] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const handleTriggerClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useOpenInteractionType.useStableCallback[handleTriggerClick]": (_, interactionType)=>{
            if (!open) {
                setOpenMethod(interactionType || (// On iOS Safari, the hitslop around touch targets means tapping outside an element's
                // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
                // will be "" in that case.
                __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIOS"] ? 'touch' : ''));
            }
        }
    }["useOpenInteractionType.useStableCallback[handleTriggerClick]"]);
    const reset = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useOpenInteractionType.useCallback[reset]": ()=>{
            setOpenMethod(null);
        }
    }["useOpenInteractionType.useCallback[reset]"], []);
    const { onClick, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useEnhancedClickHandler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnhancedClickHandler"])(handleTriggerClick);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useOpenInteractionType.useMemo": ()=>({
                openMethod,
                reset,
                triggerProps: {
                    onClick,
                    onPointerDown
                }
            })
    }["useOpenInteractionType.useMemo"], [
        openMethod,
        reset,
        onClick,
        onPointerDown
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useTransitionStatus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTransitionStatus",
    ()=>useTransitionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useAnimationFrame.js [app-client] (ecmascript)");
'use client';
;
;
;
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
    const [transitionStatus, setTransitionStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](open && enableIdleState ? 'idle' : undefined);
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](open);
    if (open && !mounted) {
        setMounted(true);
        setTransitionStatus('starting');
    }
    if (!open && mounted && transitionStatus !== 'ending' && !deferEndingState) {
        setTransitionStatus('ending');
    }
    if (!open && !mounted && transitionStatus === 'ending') {
        setTransitionStatus(undefined);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTransitionStatus.useIsoLayoutEffect": ()=>{
            if (!open && mounted && transitionStatus !== 'ending' && deferEndingState) {
                const frame = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].request({
                    "useTransitionStatus.useIsoLayoutEffect.frame": ()=>{
                        setTransitionStatus('ending');
                    }
                }["useTransitionStatus.useIsoLayoutEffect.frame"]);
                return ({
                    "useTransitionStatus.useIsoLayoutEffect": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
                    }
                })["useTransitionStatus.useIsoLayoutEffect"];
            }
            return undefined;
        }
    }["useTransitionStatus.useIsoLayoutEffect"], [
        open,
        mounted,
        transitionStatus,
        deferEndingState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTransitionStatus.useIsoLayoutEffect": ()=>{
            if (!open || enableIdleState) {
                return undefined;
            }
            const frame = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].request({
                "useTransitionStatus.useIsoLayoutEffect.frame": ()=>{
                    // Avoid `flushSync` here due to Firefox.
                    // See https://github.com/mui/base-ui/pull/3424
                    setTransitionStatus(undefined);
                }
            }["useTransitionStatus.useIsoLayoutEffect.frame"]);
            return ({
                "useTransitionStatus.useIsoLayoutEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
                }
            })["useTransitionStatus.useIsoLayoutEffect"];
        }
    }["useTransitionStatus.useIsoLayoutEffect"], [
        enableIdleState,
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTransitionStatus.useIsoLayoutEffect": ()=>{
            if (!open || !enableIdleState) {
                return undefined;
            }
            if (open && mounted && transitionStatus !== 'idle') {
                setTransitionStatus('starting');
            }
            const frame = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].request({
                "useTransitionStatus.useIsoLayoutEffect.frame": ()=>{
                    setTransitionStatus('idle');
                }
            }["useTransitionStatus.useIsoLayoutEffect.frame"]);
            return ({
                "useTransitionStatus.useIsoLayoutEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
                }
            })["useTransitionStatus.useIsoLayoutEffect"];
        }
    }["useTransitionStatus.useIsoLayoutEffect"], [
        enableIdleState,
        open,
        mounted,
        setTransitionStatus,
        transitionStatus
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useTransitionStatus.useMemo": ()=>({
                mounted,
                setMounted,
                transitionStatus
            })
    }["useTransitionStatus.useMemo"], [
        mounted,
        transitionStatus
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupStoreUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useImplicitActiveTrigger",
    ()=>useImplicitActiveTrigger,
    "useOpenStateTransitions",
    ()=>useOpenStateTransitions,
    "useTriggerDataForwarding",
    ()=>useTriggerDataForwarding,
    "useTriggerRegistration",
    ()=>useTriggerRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useTransitionStatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenChangeComplete.js [app-client] (ecmascript)");
;
;
;
;
;
function useTriggerRegistration(id, store) {
    // Keep track of the currently registered element to unregister it on unmount or id change.
    const registeredElementIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const registeredElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useTriggerRegistration.useCallback": (element)=>{
            if (id === undefined) {
                return;
            }
            if (registeredElementIdRef.current !== null) {
                const registeredId = registeredElementIdRef.current;
                const registeredElement = registeredElementRef.current;
                const currentElement = store.context.triggerElements.getById(registeredId);
                if (registeredElement && currentElement === registeredElement) {
                    store.context.triggerElements.delete(registeredId);
                }
                registeredElementIdRef.current = null;
                registeredElementRef.current = null;
            }
            if (element !== null) {
                registeredElementIdRef.current = id;
                registeredElementRef.current = element;
                store.context.triggerElements.add(id, element);
            }
        }
    }["useTriggerRegistration.useCallback"], [
        store,
        id
    ]);
}
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
    const isMountedByThisTrigger = store.useState('isMountedByTrigger', triggerId);
    const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
    const registerTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useTriggerDataForwarding.useStableCallback[registerTrigger]": (element)=>{
            baseRegisterTrigger(element);
            if (!element || !store.select('open')) {
                return;
            }
            const activeTriggerId = store.select('activeTriggerId');
            if (activeTriggerId === triggerId) {
                store.update({
                    activeTriggerElement: element,
                    ...stateUpdates
                });
                return;
            }
            if (activeTriggerId == null) {
                // This runs when popup is open, but no active trigger is set.
                // It can happen when using controlled mode and the trigger is mounted after opening or if `triggerId` prop is not set explicitly.
                // In such cases the first trigger to run this code becomes the active trigger (store.select('activeTriggerId') should not return null after that).
                // This is mostly for compatibility with contained triggers where no explicit `triggerId` was required in controlled mode.
                store.update({
                    activeTriggerId: triggerId,
                    activeTriggerElement: element,
                    ...stateUpdates
                });
            }
        }
    }["useTriggerDataForwarding.useStableCallback[registerTrigger]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTriggerDataForwarding.useIsoLayoutEffect": ()=>{
            if (isMountedByThisTrigger) {
                store.update({
                    activeTriggerElement: triggerElementRef.current,
                    ...stateUpdates
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useTriggerDataForwarding.useIsoLayoutEffect"], [
        isMountedByThisTrigger,
        store,
        triggerElementRef,
        ...Object.values(stateUpdates)
    ]);
    return {
        registerTrigger,
        isMountedByThisTrigger
    };
}
function useImplicitActiveTrigger(store) {
    const open = store.useState('open');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useImplicitActiveTrigger.useIsoLayoutEffect": ()=>{
            if (open && !store.select('activeTriggerId') && store.context.triggerElements.size === 1) {
                const iteratorResult = store.context.triggerElements.entries().next();
                if (!iteratorResult.done) {
                    const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
                    store.update({
                        activeTriggerId: implicitTriggerId,
                        activeTriggerElement: implicitTriggerElement
                    });
                }
            }
        }
    }["useImplicitActiveTrigger.useIsoLayoutEffect"], [
        open,
        store
    ]);
}
function useOpenStateTransitions(open, store, onUnmount) {
    const { mounted, setMounted, transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransitionStatus"])(open);
    store.useSyncedValues({
        mounted,
        transitionStatus
    });
    const forceUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useOpenStateTransitions.useStableCallback[forceUnmount]": ()=>{
            setMounted(false);
            store.update({
                activeTriggerId: null,
                activeTriggerElement: null,
                mounted: false
            });
            onUnmount?.();
            store.context.onOpenChangeComplete?.(false);
        }
    }["useOpenStateTransitions.useStableCallback[forceUnmount]"]);
    const preventUnmountingOnClose = store.useState('preventUnmountingOnClose');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        enabled: !preventUnmountingOnClose,
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (!open) {
                forceUnmount();
            }
        }
    });
    return {
        forceUnmount,
        transitionStatus
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PopupTriggerMap",
    ()=>PopupTriggerMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
class PopupTriggerMap {
    constructor(){
        this.elements = new Set();
        this.idMap = new Map();
    }
    /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */ add(id, element) {
        const existingElement = this.idMap.get(id);
        if (existingElement === element) {
            return;
        }
        if (existingElement !== undefined) {
            // We assume that the same element won't be registered under multiple ids.
            // This is safe considering how useTriggerRegistration is implemented.
            this.elements.delete(existingElement);
        }
        this.elements.add(element);
        this.idMap.set(id, element);
        if ("TURBOPACK compile-time truthy", 1) {
            if (this.elements.size !== this.idMap.size) {
                throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.' : "TURBOPACK unreachable");
            }
        }
    }
    /**
   * Removes the trigger element with the given ID.
   */ delete(id) {
        const element = this.idMap.get(id);
        if (element) {
            this.elements.delete(element);
            this.idMap.delete(id);
        }
    }
    /**
   * Whether the given element is registered as a trigger.
   */ hasElement(element) {
        return this.elements.has(element);
    }
    /**
   * Whether there is a registered trigger element matching the given predicate.
   */ hasMatchingElement(predicate) {
        for (const element of this.elements){
            if (predicate(element)) {
                return true;
            }
        }
        return false;
    }
    getById(id) {
        return this.idMap.get(id);
    }
    entries() {
        return this.idMap.entries();
    }
    get size() {
        return this.idMap.size;
    }
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInitialPopupStoreState",
    ()=>createInitialPopupStoreState,
    "popupStoreSelectors",
    ()=>popupStoreSelectors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/createSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$getEmptyRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
;
;
;
function createInitialPopupStoreState() {
    return {
        open: false,
        mounted: false,
        transitionStatus: 'idle',
        floatingRootContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$getEmptyRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEmptyRootContext"])(),
        preventUnmountingOnClose: false,
        payload: undefined,
        activeTriggerId: null,
        activeTriggerElement: null,
        popupElement: null,
        positionerElement: null,
        activeTriggerProps: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
        inactiveTriggerProps: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
        popupProps: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"]
    };
}
const popupStoreSelectors = {
    open: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.open),
    mounted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.mounted),
    transitionStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.transitionStatus),
    floatingRootContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.floatingRootContext),
    preventUnmountingOnClose: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.preventUnmountingOnClose),
    payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.payload),
    activeTriggerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.activeTriggerId),
    activeTriggerElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.mounted ? state.activeTriggerElement : null),
    /**
   * Whether the trigger with the given ID was used to open the popup.
   */ isTriggerActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state, triggerId)=>triggerId !== undefined && state.activeTriggerId === triggerId),
    /**
   * Whether the popup is open and was activated by a trigger with the given ID.
   */ isOpenedByTrigger: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state, triggerId)=>triggerId !== undefined && state.activeTriggerId === triggerId && state.open),
    /**
   * Whether the popup is mounted and was activated by a trigger with the given ID.
   */ isMountedByTrigger: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state, triggerId)=>triggerId !== undefined && state.activeTriggerId === triggerId && state.mounted),
    triggerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state, isActive)=>isActive ? state.activeTriggerProps : state.inactiveTriggerProps),
    popupProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupProps),
    popupElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupElement),
    positionerElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.positionerElement)
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/itemEquality.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareItemEquality",
    ()=>compareItemEquality,
    "defaultItemEquality",
    ()=>defaultItemEquality,
    "findItemIndex",
    ()=>findItemIndex,
    "itemIncludes",
    ()=>itemIncludes,
    "removeItem",
    ()=>removeItem
]);
const defaultItemEquality = (item, value)=>Object.is(item, value);
function compareItemEquality(item, value, comparer) {
    if (item == null || value == null) {
        return Object.is(item, value);
    }
    return comparer(item, value);
}
function itemIncludes(collection, value, comparer) {
    if (!collection || collection.length === 0) {
        return false;
    }
    return collection.some((item)=>{
        if (item === undefined) {
            return false;
        }
        return compareItemEquality(item, value, comparer);
    });
}
function findItemIndex(collection, value, comparer) {
    if (!collection || collection.length === 0) {
        return -1;
    }
    return collection.findIndex((item)=>{
        if (item === undefined) {
            return false;
        }
        return compareItemEquality(item, value, comparer);
    });
}
function removeItem(collection, value, comparer) {
    return collection.filter((item)=>!compareItemEquality(item, value, comparer));
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/serializeValue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeValue",
    ()=>serializeValue
]);
function serializeValue(value) {
    if (value == null) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    try {
        return JSON.stringify(value);
    } catch  {
        return String(value);
    }
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveValueLabel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasNullItemLabel",
    ()=>hasNullItemLabel,
    "isGroupedItems",
    ()=>isGroupedItems,
    "resolveMultipleLabels",
    ()=>resolveMultipleLabels,
    "resolveSelectedLabel",
    ()=>resolveSelectedLabel,
    "stringifyAsLabel",
    ()=>stringifyAsLabel,
    "stringifyAsValue",
    ()=>stringifyAsValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$serializeValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/serializeValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
function isGroupedItems(items) {
    return items != null && items.length > 0 && typeof items[0] === 'object' && items[0] != null && 'items' in items[0];
}
function hasNullItemLabel(items) {
    if (!Array.isArray(items)) {
        return items != null && !('null' in items);
    }
    if (isGroupedItems(items)) {
        for (const group of items){
            for (const item of group.items){
                if (item && item.value == null && item.label != null) {
                    return true;
                }
            }
        }
        return false;
    }
    for (const item of items){
        if (item && item.value == null && item.label != null) {
            return true;
        }
    }
    return false;
}
function stringifyAsLabel(item, itemToStringLabel) {
    if (itemToStringLabel && item != null) {
        return itemToStringLabel(item) ?? '';
    }
    if (item && typeof item === 'object') {
        if ('label' in item && item.label != null) {
            return String(item.label);
        }
        if ('value' in item) {
            return String(item.value);
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$serializeValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeValue"])(item);
}
function stringifyAsValue(item, itemToStringValue) {
    if (itemToStringValue && item != null) {
        return itemToStringValue(item) ?? '';
    }
    if (item && typeof item === 'object' && 'value' in item && 'label' in item) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$serializeValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeValue"])(item.value);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$serializeValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeValue"])(item);
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
    function fallback() {
        return stringifyAsLabel(value, itemToStringLabel);
    }
    if (itemToStringLabel && value != null) {
        return itemToStringLabel(value);
    }
    // Custom object with explicit label takes precedence
    if (value && typeof value === 'object' && 'label' in value && value.label != null) {
        return value.label;
    }
    // Items provided as plain record map
    if (items && !Array.isArray(items)) {
        return items[value] ?? fallback();
    }
    // Items provided as array (flat or grouped)
    if (Array.isArray(items)) {
        const flatItems = isGroupedItems(items) ? items.flatMap((g)=>g.items) : items;
        if (value == null || typeof value !== 'object') {
            const match = flatItems.find((item)=>item.value === value);
            if (match && match.label != null) {
                return match.label;
            }
            return fallback();
        }
        // Object without explicit label: try matching by its `value` property
        if ('value' in value) {
            const match = flatItems.find((item)=>item && item.value === value.value);
            if (match && match.label != null) {
                return match.label;
            }
        }
    }
    return fallback();
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
    return values.reduce((acc, value, index)=>{
        if (index > 0) {
            acc.push(', ');
        }
        acc.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: resolveSelectedLabel(value, items, itemToStringLabel)
        }, index));
        return acc;
    }, []);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useValueChanged.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useValueChanged",
    ()=>useValueChanged
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
;
;
;
function useValueChanged(value, onChange) {
    const valueRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](value);
    const onChangeCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(onChange);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useValueChanged.useIsoLayoutEffect": ()=>{
            if (valueRef.current === value) {
                return;
            }
            onChangeCallback(valueRef.current);
        }
    }["useValueChanged.useIsoLayoutEffect"], [
        value,
        onChangeCallback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useValueChanged.useIsoLayoutEffect": ()=>{
            valueRef.current = value;
        }
    }["useValueChanged.useIsoLayoutEffect"], [
        value
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getPseudoElementBounds.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPseudoElementBounds",
    ()=>getPseudoElementBounds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function getPseudoElementBounds(element) {
    const elementRect = element.getBoundingClientRect();
    // Avoid "Not implemented: window.getComputedStyle(elt, pseudoElt)"
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const beforeStyles = window.getComputedStyle(element, '::before');
    const afterStyles = window.getComputedStyle(element, '::after');
    const hasPseudoElements = beforeStyles.content !== 'none' || afterStyles.content !== 'none';
    if (!hasPseudoElements) {
        return elementRect;
    }
    // Get dimensions of pseudo-elements
    const beforeWidth = parseFloat(beforeStyles.width) || 0;
    const beforeHeight = parseFloat(beforeStyles.height) || 0;
    const afterWidth = parseFloat(afterStyles.width) || 0;
    const afterHeight = parseFloat(afterStyles.height) || 0;
    // Calculate max dimensions including pseudo-elements
    const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth);
    const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight);
    // Calculate the differences to extend the bounds
    const widthDiff = totalWidth - elementRect.width;
    const heightDiff = totalHeight - elementRect.height;
    return {
        left: elementRect.left - widthDiff / 2,
        right: elementRect.right + widthDiff / 2,
        top: elementRect.top - heightDiff / 2,
        bottom: elementRect.bottom + heightDiff / 2
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/hideMiddleware.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hide",
    ()=>hide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>");
;
const hide = {
    name: 'hide',
    async fn (state) {
        const { width, height, x, y } = state.rects.reference;
        const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0;
        const nativeHideResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hide"])().fn(state);
        return {
            data: {
                referenceHidden: nativeHideResult.data?.referenceHidden || anchorHidden
            }
        };
    }
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/adaptiveOriginMiddleware.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SIDES",
    ()=>DEFAULT_SIDES,
    "adaptiveOrigin",
    ()=>adaptiveOrigin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/owner.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
;
;
const DEFAULT_SIDES = {
    sideX: 'left',
    sideY: 'top'
};
const adaptiveOrigin = {
    name: 'adaptiveOrigin',
    async fn (state) {
        const { x: rawX, y: rawY, rects: { floating: floatRect }, elements: { floating }, platform, strategy, placement } = state;
        const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(floating);
        const styles = win.getComputedStyle(floating);
        const hasTransition = styles.transitionDuration !== '0s' && styles.transitionDuration !== '';
        if (!hasTransition) {
            return {
                x: rawX,
                y: rawY,
                data: DEFAULT_SIDES
            };
        }
        const offsetParent = await platform.getOffsetParent?.(floating);
        let offsetDimensions = {
            width: 0,
            height: 0
        };
        // For fixed strategy, prefer visualViewport if available
        if (strategy === 'fixed' && win?.visualViewport) {
            offsetDimensions = {
                width: win.visualViewport.width,
                height: win.visualViewport.height
            };
        } else if (offsetParent === win) {
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floating);
            offsetDimensions = {
                width: doc.documentElement.clientWidth,
                height: doc.documentElement.clientHeight
            };
        } else if (await platform.isElement?.(offsetParent)) {
            offsetDimensions = await platform.getDimensions(offsetParent);
        }
        const currentSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement);
        let x = rawX;
        let y = rawY;
        if (currentSide === 'left') {
            x = offsetDimensions.width - (rawX + floatRect.width);
        }
        if (currentSide === 'top') {
            y = offsetDimensions.height - (rawY + floatRect.height);
        }
        const sideX = currentSide === 'left' ? 'right' : DEFAULT_SIDES.sideX;
        const sideY = currentSide === 'top' ? 'bottom' : DEFAULT_SIDES.sideY;
        return {
            x,
            y,
            data: {
                sideX,
                sideY
            }
        };
    }
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useAnchorPositioning.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnchorPositioning",
    ()=>useAnchorPositioning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/owner.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloating.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$middleware$2f$arrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/middleware/arrow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$hideMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/hideMiddleware.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$adaptiveOriginMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/adaptiveOriginMiddleware.js [app-client] (ecmascript)");
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
function getLogicalSide(sideParam, renderedSide, isRtl) {
    const isLogicalSideParam = sideParam === 'inline-start' || sideParam === 'inline-end';
    const logicalRight = isRtl ? 'inline-start' : 'inline-end';
    const logicalLeft = isRtl ? 'inline-end' : 'inline-start';
    return ({
        top: 'top',
        right: isLogicalSideParam ? logicalRight : 'right',
        bottom: 'bottom',
        left: isLogicalSideParam ? logicalLeft : 'left'
    })[renderedSide];
}
function getOffsetData(state, sideParam, isRtl) {
    const { rects, placement } = state;
    const data = {
        side: getLogicalSide(sideParam, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement), isRtl),
        align: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement) || 'center',
        anchor: {
            width: rects.reference.width,
            height: rects.reference.height
        },
        positioner: {
            width: rects.floating.width,
            height: rects.floating.height
        }
    };
    return data;
}
function useAnchorPositioning(params) {
    const { // Public parameters
    anchor, positionMethod = 'absolute', side: sideParam = 'bottom', sideOffset = 0, align = 'center', alignOffset = 0, collisionBoundary, collisionPadding: collisionPaddingParam = 5, sticky = false, arrowPadding = 5, disableAnchorTracking = false, // Private parameters
    keepMounted = false, floatingRootContext, mounted, collisionAvoidance, shiftCrossAxis = false, nodeId, adaptiveOrigin, lazyFlip = false, externalTree } = params;
    const [mountSide, setMountSide] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    if (!mounted && mountSide !== null) {
        setMountSide(null);
    }
    const collisionAvoidanceSide = collisionAvoidance.side || 'flip';
    const collisionAvoidanceAlign = collisionAvoidance.align || 'flip';
    const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || 'end';
    const anchorFn = typeof anchor === 'function' ? anchor : undefined;
    const anchorFnCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(anchorFn);
    const anchorDep = anchorFn ? anchorFnCallback : anchor;
    const anchorValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(anchor);
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDirection"])();
    const isRtl = direction === 'rtl';
    const side = mountSide || ({
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
        'inline-end': isRtl ? 'left' : 'right',
        'inline-start': isRtl ? 'right' : 'left'
    })[sideParam];
    const placement = align === 'center' ? side : `${side}-${align}`;
    let collisionPadding = collisionPaddingParam;
    // Create a bias to the preferred side.
    // On iOS, when the mobile software keyboard opens, the input is exactly centered
    // in the viewport, but this can cause it to flip to the top undesirably.
    const bias = 1;
    const biasTop = sideParam === 'bottom' ? bias : 0;
    const biasBottom = sideParam === 'top' ? bias : 0;
    const biasLeft = sideParam === 'right' ? bias : 0;
    const biasRight = sideParam === 'left' ? bias : 0;
    if (typeof collisionPadding === 'number') {
        collisionPadding = {
            top: collisionPadding + biasTop,
            right: collisionPadding + biasRight,
            bottom: collisionPadding + biasBottom,
            left: collisionPadding + biasLeft
        };
    } else if (collisionPadding) {
        collisionPadding = {
            top: (collisionPadding.top || 0) + biasTop,
            right: (collisionPadding.right || 0) + biasRight,
            bottom: (collisionPadding.bottom || 0) + biasBottom,
            left: (collisionPadding.left || 0) + biasLeft
        };
    }
    const commonCollisionProps = {
        boundary: collisionBoundary === 'clipping-ancestors' ? 'clippingAncestors' : collisionBoundary,
        padding: collisionPadding
    };
    // Using a ref assumes that the arrow element is always present in the DOM for the lifetime of the
    // popup. If this assumption ends up being false, we can switch to state to manage the arrow's
    // presence.
    const arrowRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    // Keep these reactive if they're not functions
    const sideOffsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(sideOffset);
    const alignOffsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(alignOffset);
    const sideOffsetDep = typeof sideOffset !== 'function' ? sideOffset : 0;
    const alignOffsetDep = typeof alignOffset !== 'function' ? alignOffset : 0;
    const middleware = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])((state)=>{
            const data = getOffsetData(state, sideParam, isRtl);
            const sideAxis = typeof sideOffsetRef.current === 'function' ? sideOffsetRef.current(data) : sideOffsetRef.current;
            const alignAxis = typeof alignOffsetRef.current === 'function' ? alignOffsetRef.current(data) : alignOffsetRef.current;
            return {
                mainAxis: sideAxis,
                crossAxis: alignAxis,
                alignmentAxis: alignAxis
            };
        }, [
            sideOffsetDep,
            alignOffsetDep,
            isRtl,
            sideParam
        ])
    ];
    const shiftDisabled = collisionAvoidanceAlign === 'none' && collisionAvoidanceSide !== 'shift';
    const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === 'shift');
    const flipMiddleware = collisionAvoidanceSide === 'none' ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])({
        ...commonCollisionProps,
        // Ensure the popup flips if it's been limited by its --available-height and it resizes.
        // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
        padding: {
            top: collisionPadding.top + bias,
            right: collisionPadding.right + bias,
            bottom: collisionPadding.bottom + bias,
            left: collisionPadding.left + bias
        },
        mainAxis: !shiftCrossAxis && collisionAvoidanceSide === 'flip',
        crossAxis: collisionAvoidanceAlign === 'flip' ? 'alignment' : false,
        fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
    });
    const shiftMiddleware = shiftDisabled ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])((data)=>{
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(data.elements.floating).documentElement;
        return {
            ...commonCollisionProps,
            // Use the Layout Viewport to avoid shifting around when pinch-zooming
            // for context menus.
            rootBoundary: shiftCrossAxis ? {
                x: 0,
                y: 0,
                width: html.clientWidth,
                height: html.clientHeight
            } : undefined,
            mainAxis: collisionAvoidanceAlign !== 'none',
            crossAxis: crossAxisShiftEnabled,
            limiter: sticky || shiftCrossAxis ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limitShift"])((limitData)=>{
                if (!arrowRef.current) {
                    return {};
                }
                const { width, height } = arrowRef.current.getBoundingClientRect();
                const sideAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(limitData.placement));
                const arrowSize = sideAxis === 'y' ? width : height;
                const offsetAmount = sideAxis === 'y' ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
                return {
                    offset: arrowSize / 2 + offsetAmount / 2
                };
            })
        };
    }, [
        commonCollisionProps,
        sticky,
        shiftCrossAxis,
        collisionPadding,
        collisionAvoidanceAlign
    ]);
    // https://floating-ui.com/docs/flip#combining-with-shift
    if (collisionAvoidanceSide === 'shift' || collisionAvoidanceAlign === 'shift' || align === 'center') {
        middleware.push(shiftMiddleware, flipMiddleware);
    } else {
        middleware.push(flipMiddleware, shiftMiddleware);
    }
    middleware.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"])({
        ...commonCollisionProps,
        apply ({ elements: { floating }, rects: { reference }, availableWidth, availableHeight }) {
            Object.entries({
                '--available-width': `${availableWidth}px`,
                '--available-height': `${availableHeight}px`,
                '--anchor-width': `${reference.width}px`,
                '--anchor-height': `${reference.height}px`
            }).forEach(([key, value])=>{
                floating.style.setProperty(key, value);
            });
        }
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$middleware$2f$arrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrow"])(()=>({
            // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
            // we'll create a fake element.
            element: arrowRef.current || document.createElement('div'),
            padding: arrowPadding,
            offsetParent: 'floating'
        }), [
        arrowPadding
    ]), {
        name: 'transformOrigin',
        fn (state) {
            const { elements, middlewareData, placement: renderedPlacement, rects, y } = state;
            const currentRenderedSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(renderedPlacement);
            const currentRenderedAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])(currentRenderedSide);
            const arrowEl = arrowRef.current;
            const arrowX = middlewareData.arrow?.x || 0;
            const arrowY = middlewareData.arrow?.y || 0;
            const arrowWidth = arrowEl?.clientWidth || 0;
            const arrowHeight = arrowEl?.clientHeight || 0;
            const transformX = arrowX + arrowWidth / 2;
            const transformY = arrowY + arrowHeight / 2;
            const shiftY = Math.abs(middlewareData.shift?.y || 0);
            const halfAnchorHeight = rects.reference.height / 2;
            const sideOffsetValue = typeof sideOffset === 'function' ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
            const isOverlappingAnchor = shiftY > sideOffsetValue;
            const adjacentTransformOrigin = {
                top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
                bottom: `${transformX}px ${-sideOffsetValue}px`,
                left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
                right: `${-sideOffsetValue}px ${transformY}px`
            }[currentRenderedSide];
            const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`;
            elements.floating.style.setProperty('--transform-origin', crossAxisShiftEnabled && currentRenderedAxis === 'y' && isOverlappingAnchor ? overlapTransformOrigin : adjacentTransformOrigin);
            return {};
        }
    }, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$hideMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hide"], adaptiveOrigin);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useAnchorPositioning.useIsoLayoutEffect": ()=>{
            // Ensure positioning doesn't run initially for `keepMounted` elements that
            // aren't initially open.
            if (!mounted && floatingRootContext) {
                floatingRootContext.update({
                    referenceElement: null,
                    floatingElement: null,
                    domReferenceElement: null
                });
            }
        }
    }["useAnchorPositioning.useIsoLayoutEffect"], [
        mounted,
        floatingRootContext
    ]);
    const autoUpdateOptions = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useAnchorPositioning.useMemo[autoUpdateOptions]": ()=>({
                elementResize: !disableAnchorTracking && typeof ResizeObserver !== 'undefined',
                layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== 'undefined'
            })
    }["useAnchorPositioning.useMemo[autoUpdateOptions]"], [
        disableAnchorTracking
    ]);
    const { refs, elements, x, y, middlewareData, update, placement: renderedPlacement, context, isPositioned, floatingStyles: originalFloatingStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloating"])({
        rootContext: floatingRootContext,
        placement,
        middleware,
        strategy: positionMethod,
        whileElementsMounted: keepMounted ? undefined : ({
            "useAnchorPositioning.useFloating": (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(...args, autoUpdateOptions)
        })["useAnchorPositioning.useFloating"],
        nodeId,
        externalTree
    });
    const { sideX, sideY } = middlewareData.adaptiveOrigin || __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$adaptiveOriginMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SIDES"];
    // Default to `fixed` when not positioned to prevent `autoFocus` scroll jumps.
    // This ensures the popup is inside the viewport initially before it gets positioned.
    const resolvedPosition = isPositioned ? positionMethod : 'fixed';
    const floatingStyles = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useAnchorPositioning.useMemo[floatingStyles]": ()=>adaptiveOrigin ? {
                position: resolvedPosition,
                [sideX]: x,
                [sideY]: y
            } : {
                position: resolvedPosition,
                ...originalFloatingStyles
            }
    }["useAnchorPositioning.useMemo[floatingStyles]"], [
        adaptiveOrigin,
        resolvedPosition,
        sideX,
        x,
        sideY,
        y,
        originalFloatingStyles
    ]);
    const registeredPositionReferenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useAnchorPositioning.useIsoLayoutEffect": ()=>{
            if (!mounted) {
                return;
            }
            const anchorValue = anchorValueRef.current;
            const resolvedAnchor = typeof anchorValue === 'function' ? anchorValue() : anchorValue;
            const unwrappedElement = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
            const finalAnchor = unwrappedElement || null;
            if (finalAnchor !== registeredPositionReferenceRef.current) {
                refs.setPositionReference(finalAnchor);
                registeredPositionReferenceRef.current = finalAnchor;
            }
        }
    }["useAnchorPositioning.useIsoLayoutEffect"], [
        mounted,
        refs,
        anchorDep,
        anchorValueRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useAnchorPositioning.useEffect": ()=>{
            if (!mounted) {
                return;
            }
            const anchorValue = anchorValueRef.current;
            // Refs from parent components are set after useLayoutEffect runs and are available in useEffect.
            // Therefore, if the anchor is a ref, we need to update the position reference in useEffect.
            if (typeof anchorValue === 'function') {
                return;
            }
            if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
                refs.setPositionReference(anchorValue.current);
                registeredPositionReferenceRef.current = anchorValue.current;
            }
        }
    }["useAnchorPositioning.useEffect"], [
        mounted,
        refs,
        anchorDep,
        anchorValueRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useAnchorPositioning.useEffect": ()=>{
            if (keepMounted && mounted && elements.domReference && elements.floating) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(elements.domReference, elements.floating, update, autoUpdateOptions);
            }
            return undefined;
        }
    }["useAnchorPositioning.useEffect"], [
        keepMounted,
        mounted,
        elements,
        update,
        autoUpdateOptions
    ]);
    const renderedSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(renderedPlacement);
    const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
    const renderedAlign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(renderedPlacement) || 'center';
    const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
    /**
   * Locks the flip (makes it "sticky") so it doesn't prefer a given placement
   * and flips back lazily, not eagerly. Ideal for filtered lists that change
   * the size of the popup dynamically to avoid unwanted flipping when typing.
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useAnchorPositioning.useIsoLayoutEffect": ()=>{
            if (lazyFlip && mounted && isPositioned) {
                setMountSide(renderedSide);
            }
        }
    }["useAnchorPositioning.useIsoLayoutEffect"], [
        lazyFlip,
        mounted,
        isPositioned,
        renderedSide
    ]);
    const arrowStyles = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useAnchorPositioning.useMemo[arrowStyles]": ()=>({
                position: 'absolute',
                top: middlewareData.arrow?.y,
                left: middlewareData.arrow?.x
            })
    }["useAnchorPositioning.useMemo[arrowStyles]"], [
        middlewareData.arrow
    ]);
    const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useAnchorPositioning.useMemo": ()=>({
                positionerStyles: floatingStyles,
                arrowStyles,
                arrowRef,
                arrowUncentered,
                side: logicalRenderedSide,
                align: renderedAlign,
                physicalSide: renderedSide,
                anchorHidden,
                refs,
                context,
                isPositioned,
                update
            })
    }["useAnchorPositioning.useMemo"], [
        floatingStyles,
        arrowStyles,
        arrowRef,
        arrowUncentered,
        logicalRenderedSide,
        renderedAlign,
        renderedSide,
        anchorHidden,
        refs,
        context,
        isPositioned,
        update
    ]);
}
function isRef(param) {
    return param != null && 'current' in param;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getDisabledMountTransitionStyles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDisabledMountTransitionStyles",
    ()=>getDisabledMountTransitionStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/constants.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
;
function getDisabledMountTransitionStyles(transitionStatus) {
    return transitionStatus === 'starting' ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DISABLED_TRANSITIONS_STYLE"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "styleDisableScrollbar",
    ()=>styleDisableScrollbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
const DISABLE_SCROLLBAR_CLASS_NAME = 'base-ui-disable-scrollbar';
const styleDisableScrollbar = {
    className: DISABLE_SCROLLBAR_CLASS_NAME,
    getElement (nonce) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("style", {
            nonce: nonce,
            href: DISABLE_SCROLLBAR_CLASS_NAME,
            precedence: "base-ui:low",
            children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
        });
    }
};
if ("TURBOPACK compile-time truthy", 1) styleDisableScrollbar.getElement.displayName = "styleDisableScrollbar.getElement";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/clamp.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp
]);
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.max(min, Math.min(val, max));
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useMixedToggleClickHandler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMixedToggleClickHandler",
    ()=>useMixedToggleClickHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/owner.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
;
;
;
function useMixedToggleClickHandler(params) {
    const { enabled = true, mouseDownAction, open } = params;
    const ignoreClickRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useMixedToggleClickHandler.useMemo": ()=>{
            if (!enabled) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
            }
            return {
                onMouseDown: ({
                    "useMixedToggleClickHandler.useMemo": (event)=>{
                        if (mouseDownAction === 'open' && !open || mouseDownAction === 'close' && open) {
                            ignoreClickRef.current = true;
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget).addEventListener('click', {
                                "useMixedToggleClickHandler.useMemo": ()=>{
                                    ignoreClickRef.current = false;
                                }
                            }["useMixedToggleClickHandler.useMemo"], {
                                once: true
                            });
                        }
                    }
                })["useMixedToggleClickHandler.useMemo"],
                onClick: ({
                    "useMixedToggleClickHandler.useMemo": (event)=>{
                        if (ignoreClickRef.current) {
                            ignoreClickRef.current = false;
                            event.preventBaseUIHandler();
                        }
                    }
                })["useMixedToggleClickHandler.useMemo"]
            };
        }
    }["useMixedToggleClickHandler.useMemo"], [
        enabled,
        mouseDownAction,
        open
    ]);
}
}),
]);

//# sourceMappingURL=cc419_%40base-ui_react_esm_utils_34883a5a._.js.map