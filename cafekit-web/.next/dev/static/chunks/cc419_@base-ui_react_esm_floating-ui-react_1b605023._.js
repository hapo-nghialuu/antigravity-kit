(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_KEY",
    ()=>ACTIVE_KEY,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "FOCUSABLE_ATTRIBUTE",
    ()=>FOCUSABLE_ATTRIBUTE,
    "SELECTED_KEY",
    ()=>SELECTED_KEY,
    "TYPEABLE_SELECTOR",
    ()=>TYPEABLE_SELECTOR
]);
const FOCUSABLE_ATTRIBUTE = 'data-base-ui-focusable';
const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeElement",
    ()=>activeElement,
    "contains",
    ()=>contains,
    "getDocument",
    ()=>getDocument,
    "getFloatingFocusElement",
    ()=>getFloatingFocusElement,
    "getTarget",
    ()=>getTarget,
    "isEventTargetWithin",
    ()=>isEventTargetWithin,
    "isRootElement",
    ()=>isRootElement,
    "isTypeableCombobox",
    ()=>isTypeableCombobox,
    "isTypeableElement",
    ()=>isTypeableElement,
    "matchesFocusVisible",
    ()=>matchesFocusVisible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
;
;
;
function activeElement(doc) {
    let element = doc.activeElement;
    while(element?.shadowRoot?.activeElement != null){
        element = element.shadowRoot.activeElement;
    }
    return element;
}
function contains(parent, child) {
    if (!parent || !child) {
        return false;
    }
    const rootNode = child.getRootNode?.();
    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    }
    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShadowRoot"])(rootNode)) {
        let next = child;
        while(next){
            if (parent === next) {
                return true;
            }
            next = next.parentNode || next.host;
        }
    }
    // Give up, the result is false
    return false;
}
function getTarget(event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }
    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
}
function isEventTargetWithin(event, node) {
    if (node == null) {
        return false;
    }
    if ('composedPath' in event) {
        return event.composedPath().includes(node);
    }
    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const eventAgain = event;
    return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
    return element.matches('html,body');
}
function getDocument(node) {
    return node?.ownerDocument || document;
}
function isTypeableElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.matches(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPEABLE_SELECTOR"]);
}
function isTypeableCombobox(element) {
    if (!element) {
        return false;
    }
    return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}
function matchesFocusVisible(element) {
    // We don't want to block focus from working with `visibleOnly`
    // (JSDOM doesn't match `:focus-visible` when the element has `:focus`)
    if (!element || __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"]) {
        return true;
    }
    try {
        return element.matches(':focus-visible');
    } catch (_e) {
        return true;
    }
}
function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
        return null;
    }
    // Try to find the element that has `{...getFloatingProps()}` spread on it.
    // This indicates the floating element is acting as a positioning wrapper, and
    // so focus should be managed on the child element with the event handlers and
    // aria props.
    return floatingElement.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]) ? floatingElement : floatingElement.querySelector(`[${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]}]`) || floatingElement;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isClickLikeEvent",
    ()=>isClickLikeEvent,
    "isMouseLikePointerType",
    ()=>isMouseLikePointerType,
    "isReactEvent",
    ()=>isReactEvent,
    "isVirtualClick",
    ()=>isVirtualClick,
    "isVirtualPointerEvent",
    ()=>isVirtualPointerEvent,
    "stopEvent",
    ()=>stopEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-client] (ecmascript)");
;
function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
}
function isReactEvent(event) {
    return 'nativeEvent' in event;
}
function isVirtualClick(event) {
    // FIXME: Firefox is now emitting a deprecation warning for `mozInputSource`.
    // Try to find a workaround for this. `react-aria` source still has the check.
    if (event.mozInputSource === 0 && event.isTrusted) {
        return true;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"] && event.pointerType) {
        return event.type === 'click' && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"]) {
        return false;
    }
    return !__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"] && event.width === 0 && event.height === 0 || __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"] && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' || // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
}
function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = [
        'mouse',
        'pen'
    ];
    if (!strict) {
        values.push('', undefined);
    }
    return values.includes(pointerType);
}
function isClickLikeEvent(event) {
    const type = event.type;
    return type === 'click' || type === 'mousedown' || type === 'keydown' || type === 'keyup';
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/nodes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-loop-func */ __turbopack_context__.s([
    "getDeepestNode",
    ()=>getDeepestNode,
    "getNodeAncestors",
    ()=>getNodeAncestors,
    "getNodeChildren",
    ()=>getNodeChildren
]);
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
    const directChildren = nodes.filter((node)=>node.parentId === id && (!onlyOpenChildren || node.context?.open));
    return directChildren.flatMap((child)=>[
            child,
            ...getNodeChildren(nodes, child.id, onlyOpenChildren)
        ]);
}
function getDeepestNode(nodes, id) {
    let deepestNodeId;
    let maxDepth = -1;
    function findDeepest(nodeId, depth) {
        if (depth > maxDepth) {
            deepestNodeId = nodeId;
            maxDepth = depth;
        }
        const children = getNodeChildren(nodes, nodeId);
        children.forEach((child)=>{
            findDeepest(child.id, depth + 1);
        });
    }
    findDeepest(id, 0);
    return nodes.find((node)=>node.id === deepestNodeId);
}
function getNodeAncestors(nodes, id) {
    let allAncestors = [];
    let currentParentId = nodes.find((node)=>node.id === id)?.parentId;
    while(currentParentId){
        const currentNode = nodes.find((node)=>node.id === currentParentId);
        currentParentId = currentNode?.parentId;
        if (currentNode) {
            allAncestors = allAncestors.concat(currentNode);
        }
    }
    return allAncestors;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/tabbable.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "disableFocusInside",
    ()=>disableFocusInside,
    "enableFocusInside",
    ()=>enableFocusInside,
    "getNextTabbable",
    ()=>getNextTabbable,
    "getPreviousTabbable",
    ()=>getPreviousTabbable,
    "getTabbableAfterElement",
    ()=>getTabbableAfterElement,
    "getTabbableBeforeElement",
    ()=>getTabbableBeforeElement,
    "getTabbableOptions",
    ()=>getTabbableOptions,
    "isOutsideEvent",
    ()=>isOutsideEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/tabbable/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
;
;
const getTabbableOptions = ()=>({
        getShadowRoot: true,
        displayCheck: // JSDOM does not support the `tabbable` library. To solve this we can
        // check if `ResizeObserver` is a real function (not polyfilled), which
        // determines if the current environment is JSDOM-like.
        typeof ResizeObserver === 'function' && ResizeObserver.toString().includes('[native code]') ? 'full' : 'none'
    });
function getTabbableIn(container, dir) {
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions());
    const len = list.length;
    if (len === 0) {
        return undefined;
    }
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(container));
    const index = list.indexOf(active);
    // eslint-disable-next-line no-nested-ternary
    const nextIndex = index === -1 ? dir === 1 ? 0 : len - 1 : index + dir;
    return list[nextIndex];
}
function getNextTabbable(referenceElement) {
    return getTabbableIn((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
    return getTabbableIn((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(referenceElement).body, -1) || referenceElement;
}
function getTabbableNearElement(referenceElement, dir) {
    if (!referenceElement) {
        return null;
    }
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(referenceElement).body, getTabbableOptions());
    const elementCount = list.length;
    if (elementCount === 0) {
        return null;
    }
    const index = list.indexOf(referenceElement);
    if (index === -1) {
        return null;
    }
    const nextIndex = (index + dir + elementCount) % elementCount;
    return list[nextIndex];
}
function getTabbableAfterElement(referenceElement) {
    return getTabbableNearElement(referenceElement, 1);
}
function getTabbableBeforeElement(referenceElement) {
    return getTabbableNearElement(referenceElement, -1);
}
function isOutsideEvent(event, container) {
    const containerElement = container || event.currentTarget;
    const relatedTarget = event.relatedTarget;
    return !relatedTarget || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(containerElement, relatedTarget);
}
function disableFocusInside(container) {
    const tabbableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions());
    tabbableElements.forEach((element)=>{
        element.dataset.tabindex = element.getAttribute('tabindex') || '';
        element.setAttribute('tabindex', '-1');
    });
}
function enableFocusInside(container) {
    const elements = container.querySelectorAll('[data-tabindex]');
    elements.forEach((element)=>{
        const tabindex = element.dataset.tabindex;
        delete element.dataset.tabindex;
        if (tabindex) {
            element.setAttribute('tabindex', tabindex);
        } else {
            element.removeAttribute('tabindex');
        }
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAttribute",
    ()=>createAttribute
]);
function createAttribute(name) {
    return `data-base-ui-${name}`;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/enqueueFocus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enqueueFocus",
    ()=>enqueueFocus
]);
let rafId = 0;
function enqueueFocus(el, options = {}) {
    const { preventScroll = false, cancelPrevious = true, sync = false } = options;
    if (cancelPrevious) {
        cancelAnimationFrame(rafId);
    }
    const exec = ()=>el?.focus({
            preventScroll
        });
    if (sync) {
        exec();
    } else {
        rafId = requestAnimationFrame(exec);
    }
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/markOthers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markOthers",
    ()=>markOthers,
    "supportsInert",
    ()=>supportsInert
]);
// Modified to add conditional `aria-hidden` support:
// https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
;
;
const counters = {
    inert: new WeakMap(),
    'aria-hidden': new WeakMap(),
    none: new WeakMap()
};
function getCounterMap(control) {
    if (control === 'inert') {
        return counters.inert;
    }
    if (control === 'aria-hidden') {
        return counters['aria-hidden'];
    }
    return counters.none;
}
let uncontrolledElementsSet = new WeakSet();
let markerMap = {};
let lockCount = 0;
const supportsInert = ()=>typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
const unwrapHost = (node)=>node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets)=>targets.map((target)=>{
        if (parent.contains(target)) {
            return target;
        }
        const correctedTarget = unwrapHost(target);
        if (parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        return null;
    }).filter((x)=>x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
    const markerName = 'data-base-ui-inert';
    // eslint-disable-next-line no-nested-ternary
    const controlAttribute = inert ? 'inert' : ariaHidden ? 'aria-hidden' : null;
    const avoidElements = correctElements(body, uncorrectedAvoidElements);
    const elementsToKeep = new Set();
    const elementsToStop = new Set(avoidElements);
    const hiddenElements = [];
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    const markerCounter = markerMap[markerName];
    avoidElements.forEach(keep);
    deep(body);
    elementsToKeep.clear();
    function keep(el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        if (el.parentNode) {
            keep(el.parentNode);
        }
    }
    function deep(parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        [].forEach.call(parent.children, (node)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(node) === 'script') {
                return;
            }
            if (elementsToKeep.has(node)) {
                deep(node);
            } else {
                const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
                const alreadyHidden = attr !== null && attr !== 'false';
                const counterMap = getCounterMap(controlAttribute);
                const counterValue = (counterMap.get(node) || 0) + 1;
                const markerValue = (markerCounter.get(node) || 0) + 1;
                counterMap.set(node, counterValue);
                markerCounter.set(node, markerValue);
                hiddenElements.push(node);
                if (counterValue === 1 && alreadyHidden) {
                    uncontrolledElementsSet.add(node);
                }
                if (markerValue === 1) {
                    node.setAttribute(markerName, '');
                }
                if (!alreadyHidden && controlAttribute) {
                    node.setAttribute(controlAttribute, controlAttribute === 'inert' ? '' : 'true');
                }
            }
        });
    }
    lockCount += 1;
    return ()=>{
        hiddenElements.forEach((element)=>{
            const counterMap = getCounterMap(controlAttribute);
            const currentCounterValue = counterMap.get(element) || 0;
            const counterValue = currentCounterValue - 1;
            const markerValue = (markerCounter.get(element) || 0) - 1;
            counterMap.set(element, counterValue);
            markerCounter.set(element, markerValue);
            if (!counterValue) {
                if (!uncontrolledElementsSet.has(element) && controlAttribute) {
                    element.removeAttribute(controlAttribute);
                }
                uncontrolledElementsSet.delete(element);
            }
            if (!markerValue) {
                element.removeAttribute(markerName);
            }
        });
        lockCount -= 1;
        if (!lockCount) {
            counters.inert = new WeakMap();
            counters['aria-hidden'] = new WeakMap();
            counters.none = new WeakMap();
            uncontrolledElementsSet = new WeakSet();
            markerMap = {};
        }
    };
}
function markOthers(avoidElements, ariaHidden = false, inert = false) {
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(avoidElements[0]).body;
    return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll('[aria-live]'))), body, ariaHidden, inert);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingPortal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingPortal",
    ()=>FloatingPortal,
    "useFloatingPortalNode",
    ()=>useFloatingPortalNode,
    "usePortalContext",
    ()=>usePortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/FocusGuard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/tabbable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/constants.js [app-client] (ecmascript) <locals>");
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
const PortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
if ("TURBOPACK compile-time truthy", 1) PortalContext.displayName = "PortalContext";
const usePortalContext = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](PortalContext);
const attr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('portal');
function useFloatingPortalNode(props = {}) {
    const { ref, container: containerProp, componentProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], elementProps, elementState } = props;
    const uniqueId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const portalContext = usePortalContext();
    const parentPortalNode = portalContext?.portalNode;
    const [containerElement, setContainerElement] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [portalNode, setPortalNode] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const setPortalNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFloatingPortalNode.useStableCallback[setPortalNodeRef]": (node)=>{
            if (node !== null) {
                // the useIsoLayoutEffect below watching containerProp / parentPortalNode
                // sets setPortalNode(null) when the container becomes null or changes.
                // So even though the ref callback now ignores null, the portal node still gets cleared.
                setPortalNode(node);
            }
        }
    }["useFloatingPortalNode.useStableCallback[setPortalNodeRef]"]);
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFloatingPortalNode.useIsoLayoutEffect": ()=>{
            // Wait for the container to be resolved if explicitly `null`.
            if (containerProp === null) {
                if (containerRef.current) {
                    containerRef.current = null;
                    setPortalNode(null);
                    setContainerElement(null);
                }
                return;
            }
            // React 17 does not use React.useId().
            if (uniqueId == null) {
                return;
            }
            const resolvedContainer = (containerProp && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"])(containerProp) ? containerProp : containerProp.current)) ?? parentPortalNode ?? document.body;
            if (resolvedContainer == null) {
                if (containerRef.current) {
                    containerRef.current = null;
                    setPortalNode(null);
                    setContainerElement(null);
                }
                return;
            }
            if (containerRef.current !== resolvedContainer) {
                containerRef.current = resolvedContainer;
                setPortalNode(null);
                setContainerElement(resolvedContainer);
            }
        }
    }["useFloatingPortalNode.useIsoLayoutEffect"], [
        containerProp,
        parentPortalNode,
        uniqueId
    ]);
    const portalElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            ref,
            setPortalNodeRef
        ],
        state: elementState,
        props: [
            {
                id: uniqueId,
                [attr]: ''
            },
            elementProps
        ]
    });
    // This `createPortal` call injects `portalElement` into the `container`.
    // Another call inside `FloatingPortal`/`FloatingPortalLite` then injects the children into `portalElement`.
    const portalSubtree = containerElement && portalElement ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"](portalElement, containerElement) : null;
    return {
        portalNode,
        portalSubtree
    };
}
const FloatingPortal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FloatingPortal(componentProps, forwardedRef) {
    const { children, container, className, render, renderGuards, ...elementProps } = componentProps;
    const { portalNode, portalSubtree } = useFloatingPortalNode({
        container,
        ref: forwardedRef,
        componentProps,
        elementProps
    });
    const beforeOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const beforeInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const [focusManagerState, setFocusManagerState] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const modal = focusManagerState?.modal;
    const open = focusManagerState?.open;
    const shouldRenderGuards = typeof renderGuards === 'boolean' ? renderGuards : !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
    // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingPortal.FloatingPortal.useEffect": ()=>{
            if (!portalNode || modal) {
                return undefined;
            }
            // Make sure elements inside the portal element are tabbable only when the
            // portal has already been focused, either by tabbing into a focus trap
            // element outside or using the mouse.
            function onFocus(event) {
                if (portalNode && event.relatedTarget && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event)) {
                    const focusing = event.type === 'focusin';
                    const manageFocus = focusing ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enableFocusInside"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disableFocusInside"];
                    manageFocus(portalNode);
                }
            }
            // Listen to the event on the capture phase so they run before the focus
            // trap elements onFocus prop is called.
            portalNode.addEventListener('focusin', onFocus, true);
            portalNode.addEventListener('focusout', onFocus, true);
            return ({
                "FloatingPortal.FloatingPortal.useEffect": ()=>{
                    portalNode.removeEventListener('focusin', onFocus, true);
                    portalNode.removeEventListener('focusout', onFocus, true);
                }
            })["FloatingPortal.FloatingPortal.useEffect"];
        }
    }["FloatingPortal.FloatingPortal.useEffect"], [
        portalNode,
        modal
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingPortal.FloatingPortal.useEffect": ()=>{
            if (!portalNode || open) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enableFocusInside"])(portalNode);
        }
    }["FloatingPortal.FloatingPortal.useEffect"], [
        open,
        portalNode
    ]);
    const portalContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FloatingPortal.FloatingPortal.useMemo[portalContextValue]": ()=>({
                beforeOutsideRef,
                afterOutsideRef,
                beforeInsideRef,
                afterInsideRef,
                portalNode,
                setFocusManagerState
            })
    }["FloatingPortal.FloatingPortal.useMemo[portalContextValue]"], [
        portalNode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            portalSubtree,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(PortalContext.Provider, {
                value: portalContextValue,
                children: [
                    shouldRenderGuards && portalNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGuard"], {
                        "data-type": "outside",
                        ref: beforeOutsideRef,
                        onFocus: (event)=>{
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalNode)) {
                                beforeInsideRef.current?.focus();
                            } else {
                                const domReference = focusManagerState ? focusManagerState.domReference : null;
                                const prevTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreviousTabbable"])(domReference);
                                prevTabbable?.focus();
                            }
                        }
                    }),
                    shouldRenderGuards && portalNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        "aria-owns": portalNode.id,
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerVisuallyHidden"]
                    }),
                    portalNode && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"](children, portalNode),
                    shouldRenderGuards && portalNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGuard"], {
                        "data-type": "outside",
                        ref: afterOutsideRef,
                        onFocus: (event)=>{
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalNode)) {
                                afterInsideRef.current?.focus();
                            } else {
                                const domReference = focusManagerState ? focusManagerState.domReference : null;
                                const nextTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNextTabbable"])(domReference);
                                nextTabbable?.focus();
                                if (focusManagerState?.closeOnFocusOut) {
                                    focusManagerState?.onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].focusOut, event.nativeEvent));
                                }
                            }
                        }
                    })
                ]
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) FloatingPortal.displayName = "FloatingPortal";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createEventEmitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createEventEmitter",
    ()=>createEventEmitter
]);
function createEventEmitter() {
    const map = new Map();
    return {
        emit (event, data) {
            map.get(event)?.forEach((listener)=>listener(data));
        },
        on (event, listener) {
            if (!map.has(event)) {
                map.set(event, new Set());
            }
            map.get(event).add(listener);
        },
        off (event, listener) {
            map.get(event)?.delete(listener);
        }
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTreeStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingTreeStore",
    ()=>FloatingTreeStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createEventEmitter.js [app-client] (ecmascript)");
;
class FloatingTreeStore {
    nodesRef = {
        current: []
    };
    events = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEventEmitter"])();
    addNode(node) {
        this.nodesRef.current.push(node);
    }
    removeNode(node) {
        const index = this.nodesRef.current.findIndex((n)=>n === node);
        if (index !== -1) {
            this.nodesRef.current.splice(index, 1);
        }
    }
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingNode",
    ()=>FloatingNode,
    "FloatingTree",
    ()=>FloatingTree,
    "useFloatingNodeId",
    ()=>useFloatingNodeId,
    "useFloatingParentNodeId",
    ()=>useFloatingParentNodeId,
    "useFloatingTree",
    ()=>useFloatingTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useRefWithInit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTreeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTreeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const FloatingNodeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
if ("TURBOPACK compile-time truthy", 1) FloatingNodeContext.displayName = "FloatingNodeContext";
const FloatingTreeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
/**
 * Returns the parent node id for nested floating elements, if available.
 * Returns `null` for top-level floating elements.
 */ if ("TURBOPACK compile-time truthy", 1) FloatingTreeContext.displayName = "FloatingTreeContext";
const useFloatingParentNodeId = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FloatingNodeContext)?.id || null;
const useFloatingTree = (externalTree)=>{
    const contextTree = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FloatingTreeContext);
    return externalTree ?? contextTree;
};
function useFloatingNodeId(externalTree) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const tree = useFloatingTree(externalTree);
    const parentId = useFloatingParentNodeId();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFloatingNodeId.useIsoLayoutEffect": ()=>{
            if (!id) {
                return undefined;
            }
            const node = {
                id,
                parentId
            };
            tree?.addNode(node);
            return ({
                "useFloatingNodeId.useIsoLayoutEffect": ()=>{
                    tree?.removeNode(node);
                }
            })["useFloatingNodeId.useIsoLayoutEffect"];
        }
    }["useFloatingNodeId.useIsoLayoutEffect"], [
        tree,
        id,
        parentId
    ]);
    return id;
}
function FloatingNode(props) {
    const { children, id } = props;
    const parentId = useFloatingParentNodeId();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FloatingNodeContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
            "FloatingNode.useMemo": ()=>({
                    id,
                    parentId
                })
        }["FloatingNode.useMemo"], [
            id,
            parentId
        ]),
        children: children
    });
}
function FloatingTree(props) {
    const { children, externalTree } = props;
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "FloatingTree.useRefWithInit": ()=>externalTree ?? new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTreeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingTreeStore"]()
    }["FloatingTree.useRefWithInit"]).current;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FloatingTreeContext.Provider, {
        value: tree,
        children: children
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingFocusManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingFocusManager",
    ()=>FloatingFocusManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/tabbable/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/visuallyHidden.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useAnimationFrame.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/FocusGuard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/nodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/tabbable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/enqueueFocus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/markOthers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingPortal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/constants.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveRef.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
function getEventType(event, lastInteractionType) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(event.target);
    if (event instanceof win.KeyboardEvent) {
        return 'keyboard';
    }
    if (event instanceof win.FocusEvent) {
        // Focus events can be caused by a preceding pointer interaction (e.g., focusout on outside press).
        // Prefer the last known pointer type if provided, else treat as keyboard.
        return lastInteractionType || 'keyboard';
    }
    if ('pointerType' in event) {
        return event.pointerType || 'keyboard';
    }
    if ('touches' in event) {
        return 'touch';
    }
    if (event instanceof win.MouseEvent) {
        // onClick events may not contain pointer events, and will fall through to here
        return lastInteractionType || (event.detail === 0 ? 'keyboard' : 'mouse');
    }
    return '';
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
    previouslyFocusedElements = previouslyFocusedElements.filter((el)=>el.isConnected);
}
function addPreviouslyFocusedElement(element) {
    clearDisconnectedPreviouslyFocusedElements();
    if (element && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(element) !== 'body') {
        previouslyFocusedElements.push(element);
        if (previouslyFocusedElements.length > LIST_LIMIT) {
            previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
        }
    }
}
function getPreviouslyFocusedElement() {
    clearDisconnectedPreviouslyFocusedElements();
    return previouslyFocusedElements[previouslyFocusedElements.length - 1];
}
function getFirstTabbableElement(container) {
    if (!container) {
        return null;
    }
    const tabbableOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTabbableOptions"])();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabbable"])(container, tabbableOptions)) {
        return container;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, tabbableOptions)[0] || container;
}
function isFocusable(element) {
    if (!element || !element.isConnected) {
        return false;
    }
    if (typeof element.checkVisibility === 'function') {
        return element.checkVisibility();
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(element).display !== 'none';
}
function handleTabIndex(floatingFocusElement, orderRef) {
    if (!orderRef.current.includes('floating') && !floatingFocusElement.getAttribute('role')?.includes('dialog')) {
        return;
    }
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTabbableOptions"])();
    const focusableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusable"])(floatingFocusElement, options);
    const tabbableContent = focusableElements.filter((element)=>{
        const dataTabIndex = element.getAttribute('data-tabindex') || '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabbable"])(element, options) || element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-');
    });
    const tabIndex = floatingFocusElement.getAttribute('tabindex');
    if (orderRef.current.includes('floating') || tabbableContent.length === 0) {
        if (tabIndex !== '0') {
            floatingFocusElement.setAttribute('tabindex', '0');
        }
    } else if (tabIndex !== '-1' || floatingFocusElement.hasAttribute('data-tabindex') && floatingFocusElement.getAttribute('data-tabindex') !== '-1') {
        floatingFocusElement.setAttribute('tabindex', '-1');
        floatingFocusElement.setAttribute('data-tabindex', '-1');
    }
}
function FloatingFocusManager(props) {
    const { context, children, disabled = false, order = [
        'content'
    ], initialFocus = true, returnFocus = true, restoreFocus = false, modal = true, closeOnFocusOut = true, openInteractionType = '', getInsideElements: getInsideElementsProp = ()=>[], nextFocusableElement, previousFocusableElement, beforeContentFocusGuardRef, externalTree } = props;
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const domReference = store.useState('domReferenceElement');
    const floating = store.useState('floatingElement');
    const { events, dataRef } = store.context;
    const getNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FloatingFocusManager.useStableCallback[getNodeId]": ()=>dataRef.current.floatingContext?.nodeId
    }["FloatingFocusManager.useStableCallback[getNodeId]"]);
    const getInsideElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(getInsideElementsProp);
    const ignoreInitialFocus = initialFocus === false;
    // If the reference is a combobox and is typeable (e.g. input/textarea),
    // there are different focus semantics. The guards should not be rendered, but
    // aria-hidden should be applied to all nodes still. Further, the visually
    // hidden dismiss button should only appear at the end of the list, not the
    // start.
    const isUntrappedTypeableCombobox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(domReference) && ignoreInitialFocus;
    const orderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(order);
    const initialFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(initialFocus);
    const returnFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(returnFocus);
    const openInteractionTypeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(openInteractionType);
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    const portalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePortalContext"])();
    const startDismissButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const endDismissButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const preventReturnFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isPointerDownRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const pointerDownOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const tabbableIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](-1);
    const closeTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('');
    const lastInteractionTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('');
    const beforeGuardRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterGuardRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedBeforeGuardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(beforeGuardRef, beforeContentFocusGuardRef, portalContext?.beforeInsideRef);
    const mergedAfterGuardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(afterGuardRef, portalContext?.afterInsideRef);
    const blurTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const pointerDownTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const restoreFocusFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(floating);
    const getTabbableContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FloatingFocusManager.useStableCallback[getTabbableContent]": (container = floatingFocusElement)=>{
            return container ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTabbableOptions"])()) : [];
        }
    }["FloatingFocusManager.useStableCallback[getTabbableContent]"]);
    const getTabbableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FloatingFocusManager.useStableCallback[getTabbableElements]": (container)=>{
            const content = getTabbableContent(container);
            return orderRef.current.map({
                "FloatingFocusManager.useStableCallback[getTabbableElements]": ()=>content
            }["FloatingFocusManager.useStableCallback[getTabbableElements]"]).filter(Boolean).flat();
        }
    }["FloatingFocusManager.useStableCallback[getTabbableElements]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled) {
                return undefined;
            }
            if (!modal) {
                return undefined;
            }
            function onKeyDown(event) {
                if (event.key === 'Tab') {
                    // The focus guards have nothing to focus, so we need to stop the event.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    }
                }
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
            doc.addEventListener('keydown', onKeyDown);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    doc.removeEventListener('keydown', onKeyDown);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        domReference,
        floatingFocusElement,
        modal,
        orderRef,
        isUntrappedTypeableCombobox,
        getTabbableContent,
        getTabbableElements
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled) {
                return undefined;
            }
            if (!floating) {
                return undefined;
            }
            function handleFocusIn(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                const tabbableContent = getTabbableContent();
                const tabbableIndex = tabbableContent.indexOf(target);
                if (tabbableIndex !== -1) {
                    tabbableIndexRef.current = tabbableIndex;
                }
            }
            floating.addEventListener('focusin', handleFocusIn);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    floating.removeEventListener('focusin', handleFocusIn);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        floating,
        getTabbableContent
    ]);
    // Track the last interaction type at the document level to disambiguate focus events
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !open) {
                return undefined;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
            function clearPointerDownOutside() {
                pointerDownOutsideRef.current = false;
            }
            function onPointerDown(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                const pointerTargetInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, target) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, target) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(portalContext?.portalNode, target);
                pointerDownOutsideRef.current = !pointerTargetInside;
                lastInteractionTypeRef.current = event.pointerType || 'keyboard';
            }
            function onKeyDown() {
                lastInteractionTypeRef.current = 'keyboard';
            }
            doc.addEventListener('pointerdown', onPointerDown, true);
            doc.addEventListener('pointerup', clearPointerDownOutside, true);
            doc.addEventListener('pointercancel', clearPointerDownOutside, true);
            doc.addEventListener('keydown', onKeyDown, true);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    doc.removeEventListener('pointerdown', onPointerDown, true);
                    doc.removeEventListener('pointerup', clearPointerDownOutside, true);
                    doc.removeEventListener('pointercancel', clearPointerDownOutside, true);
                    doc.removeEventListener('keydown', onKeyDown, true);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        floating,
        domReference,
        floatingFocusElement,
        open,
        portalContext
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled) {
                return undefined;
            }
            if (!closeOnFocusOut) {
                return undefined;
            }
            // In Safari, buttons lose focus when pressing them.
            function handlePointerDown() {
                isPointerDownRef.current = true;
                pointerDownTimeout.start(0, {
                    "FloatingFocusManager.useEffect.handlePointerDown": ()=>{
                        isPointerDownRef.current = false;
                    }
                }["FloatingFocusManager.useEffect.handlePointerDown"]);
            }
            function handleFocusOutside(event) {
                const relatedTarget = event.relatedTarget;
                const currentTarget = event.currentTarget;
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                queueMicrotask({
                    "FloatingFocusManager.useEffect.handleFocusOutside": ()=>{
                        const nodeId = getNodeId();
                        const triggers = store.context.triggerElements;
                        const isRelatedFocusGuard = relatedTarget?.hasAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('focus-guard')) && [
                            beforeGuardRef.current,
                            afterGuardRef.current,
                            portalContext?.beforeInsideRef.current,
                            portalContext?.afterInsideRef.current,
                            portalContext?.beforeOutsideRef.current,
                            portalContext?.afterOutsideRef.current,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(previousFocusableElement),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(nextFocusableElement)
                        ].includes(relatedTarget);
                        const movedToUnrelatedNode = !((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(relatedTarget, floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(portalContext?.portalNode, relatedTarget) || relatedTarget != null && triggers.hasElement(relatedTarget) || triggers.hasMatchingElement({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (trigger)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(trigger, relatedTarget)
                        }["FloatingFocusManager.useEffect.handleFocusOutside"]) || isRelatedFocusGuard || tree && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId).find({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.domReference, relatedTarget)
                        }["FloatingFocusManager.useEffect.handleFocusOutside"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeAncestors"])(tree.nodesRef.current, nodeId).find({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (node)=>[
                                    node.context?.elements.floating,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(node.context?.elements.floating)
                                ].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget
                        }["FloatingFocusManager.useEffect.handleFocusOutside"])));
                        if (currentTarget === domReference && floatingFocusElement) {
                            handleTabIndex(floatingFocusElement, orderRef);
                        }
                        // Restore focus to the previous tabbable element index to prevent
                        // focus from being lost outside the floating tree.
                        if (restoreFocus && currentTarget !== domReference && !isFocusable(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement)) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement).body) {
                            // Let `FloatingPortal` effect knows that focus is still inside the
                            // floating tree.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
                                floatingFocusElement.focus();
                                // If explicitly requested to restore focus to the popup container, do not search
                                // for the next/previous tabbable element.
                                if (restoreFocus === 'popup') {
                                    // If the element is removed on pointerdown, focus tries to move it,
                                    // but since it's removed at the same time, focus gets lost as it
                                    // happens after the .focus() call above.
                                    // In this case, focus needs to be moved asynchronously.
                                    restoreFocusFrame.request({
                                        "FloatingFocusManager.useEffect.handleFocusOutside": ()=>{
                                            floatingFocusElement.focus();
                                        }
                                    }["FloatingFocusManager.useEffect.handleFocusOutside"]);
                                    return;
                                }
                            }
                            const prevTabbableIndex = tabbableIndexRef.current;
                            const tabbableContent = getTabbableContent();
                            const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(nodeToFocus)) {
                                nodeToFocus.focus();
                            }
                        }
                        // https://github.com/floating-ui/floating-ui/issues/3060
                        if (dataRef.current.insideReactTree) {
                            dataRef.current.insideReactTree = false;
                            return;
                        }
                        // Focus did not move inside the floating tree, and there are no tabbable
                        // portal guards to handle closing.
                        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && (// Fix React 18 Strict Mode returnFocus due to double rendering.
                        // For an "untrapped" typeable combobox (input role=combobox with
                        // initialFocus=false), re-opening the popup and tabbing out should still close it even
                        // when the previously focused element (e.g. the next tabbable outside the popup) is
                        // focused again. Otherwise, the popup remains open on the second Tab sequence:
                        // click input -> Tab (closes) -> click input -> Tab.
                        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
                        isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
                            preventReturnFocusRef.current = true;
                            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].focusOut, event));
                        }
                    }
                }["FloatingFocusManager.useEffect.handleFocusOutside"]);
            }
            function markInsideReactTree() {
                if (pointerDownOutsideRef.current) {
                    return;
                }
                dataRef.current.insideReactTree = true;
                blurTimeout.start(0, {
                    "FloatingFocusManager.useEffect.markInsideReactTree": ()=>{
                        dataRef.current.insideReactTree = false;
                    }
                }["FloatingFocusManager.useEffect.markInsideReactTree"]);
            }
            const domReferenceElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(domReference) ? domReference : null;
            const cleanups = [];
            if (!floating && !domReferenceElement) {
                return undefined;
            }
            if (domReferenceElement) {
                domReferenceElement.addEventListener('focusout', handleFocusOutside);
                domReferenceElement.addEventListener('pointerdown', handlePointerDown);
                cleanups.push({
                    "FloatingFocusManager.useEffect": ()=>{
                        domReferenceElement.removeEventListener('focusout', handleFocusOutside);
                        domReferenceElement.removeEventListener('pointerdown', handlePointerDown);
                    }
                }["FloatingFocusManager.useEffect"]);
            }
            if (floating) {
                floating.addEventListener('focusout', handleFocusOutside);
                if (portalContext) {
                    floating.addEventListener('focusout', markInsideReactTree, true);
                    cleanups.push({
                        "FloatingFocusManager.useEffect": ()=>{
                            floating.removeEventListener('focusout', markInsideReactTree, true);
                        }
                    }["FloatingFocusManager.useEffect"]);
                }
                cleanups.push({
                    "FloatingFocusManager.useEffect": ()=>{
                        floating.removeEventListener('focusout', handleFocusOutside);
                    }
                }["FloatingFocusManager.useEffect"]);
            }
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    cleanups.forEach({
                        "FloatingFocusManager.useEffect": (cleanup)=>{
                            cleanup();
                        }
                    }["FloatingFocusManager.useEffect"]);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        domReference,
        floating,
        floatingFocusElement,
        modal,
        tree,
        portalContext,
        store,
        closeOnFocusOut,
        restoreFocus,
        getTabbableContent,
        isUntrappedTypeableCombobox,
        getNodeId,
        orderRef,
        dataRef,
        blurTimeout,
        pointerDownTimeout,
        restoreFocusFrame,
        nextFocusableElement,
        previousFocusableElement
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !floating || !open) {
                return undefined;
            }
            // Don't hide portals nested within the parent portal.
            const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('portal')}]`) || []);
            const ancestors = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeAncestors"])(tree.nodesRef.current, getNodeId()) : [];
            const rootAncestorComboboxDomReference = ancestors.find({
                "FloatingFocusManager.useEffect": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(node.context?.elements.domReference || null)
            }["FloatingFocusManager.useEffect"])?.context?.elements.domReference;
            const insideElements = [
                floating,
                rootAncestorComboboxDomReference,
                ...portalNodes,
                ...getInsideElements(),
                startDismissButtonRef.current,
                endDismissButtonRef.current,
                beforeGuardRef.current,
                afterGuardRef.current,
                portalContext?.beforeOutsideRef.current,
                portalContext?.afterOutsideRef.current,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(previousFocusableElement),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(nextFocusableElement),
                isUntrappedTypeableCombobox ? domReference : null
            ].filter({
                "FloatingFocusManager.useEffect.insideElements": (x)=>x != null
            }["FloatingFocusManager.useEffect.insideElements"]);
            const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markOthers"])(insideElements, modal || isUntrappedTypeableCombobox);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    cleanup();
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        open,
        disabled,
        domReference,
        floating,
        modal,
        orderRef,
        portalContext,
        isUntrappedTypeableCombobox,
        tree,
        getNodeId,
        getInsideElements,
        nextFocusableElement,
        previousFocusableElement
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (!open || disabled || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
                return;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
            const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
            // Wait for any layout effect state setters to execute to set `tabIndex`.
            queueMicrotask({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    const focusableElements = getTabbableElements(floatingFocusElement);
                    const initialFocusValueOrFn = initialFocusRef.current;
                    const resolvedInitialFocus = typeof initialFocusValueOrFn === 'function' ? initialFocusValueOrFn(openInteractionTypeRef.current || '') : initialFocusValueOrFn;
                    // `null` should fallback to default behavior in case of an empty ref.
                    if (resolvedInitialFocus === undefined || resolvedInitialFocus === false) {
                        return;
                    }
                    let elToFocus;
                    if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
                        elToFocus = focusableElements[0] || floatingFocusElement;
                    } else {
                        elToFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(resolvedInitialFocus);
                    }
                    elToFocus = elToFocus || focusableElements[0] || floatingFocusElement;
                    const focusAlreadyInsideFloatingEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, previouslyFocusedElement);
                    if (focusAlreadyInsideFloatingEl) {
                        return;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(elToFocus, {
                        preventScroll: elToFocus === floatingFocusElement
                    });
                }
            }["FloatingFocusManager.useIsoLayoutEffect"]);
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        open,
        floatingFocusElement,
        ignoreInitialFocus,
        getTabbableElements,
        initialFocusRef,
        openInteractionTypeRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (disabled || !floatingFocusElement) {
                return undefined;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
            const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
            addPreviouslyFocusedElement(previouslyFocusedElement);
            // Dismissing via outside press should always ignore `returnFocus` to
            // prevent unwanted scrolling.
            function onOpenChangeLocal(details) {
                if (!details.open) {
                    closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
                }
                if (details.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover && details.nativeEvent.type === 'mouseleave') {
                    preventReturnFocusRef.current = true;
                }
                if (details.reason !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].outsidePress) {
                    return;
                }
                if (details.nested) {
                    preventReturnFocusRef.current = false;
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualClick"])(details.nativeEvent) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(details.nativeEvent)) {
                    preventReturnFocusRef.current = false;
                } else {
                    let isPreventScrollSupported = false;
                    document.createElement('div').focus({
                        get preventScroll () {
                            isPreventScrollSupported = true;
                            return false;
                        }
                    });
                    if (isPreventScrollSupported) {
                        preventReturnFocusRef.current = false;
                    } else {
                        preventReturnFocusRef.current = true;
                    }
                }
            }
            events.on('openchange', onOpenChangeLocal);
            const fallbackEl = doc.createElement('span');
            fallbackEl.setAttribute('tabindex', '-1');
            fallbackEl.setAttribute('aria-hidden', 'true');
            Object.assign(fallbackEl.style, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visuallyHidden"]);
            if (isInsidePortal && domReference) {
                domReference.insertAdjacentElement('afterend', fallbackEl);
            }
            function getReturnElement() {
                const returnFocusValueOrFn = returnFocusRef.current;
                let resolvedReturnFocusValue = typeof returnFocusValueOrFn === 'function' ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;
                // `null` should fallback to default behavior in case of an empty ref.
                if (resolvedReturnFocusValue === undefined || resolvedReturnFocusValue === false) {
                    return null;
                }
                if (resolvedReturnFocusValue === null) {
                    resolvedReturnFocusValue = true;
                }
                if (typeof resolvedReturnFocusValue === 'boolean') {
                    const el = domReference || getPreviouslyFocusedElement();
                    return el && el.isConnected ? el : fallbackEl;
                }
                const fallback = domReference || getPreviouslyFocusedElement() || fallbackEl;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(resolvedReturnFocusValue) || fallback;
            }
            return ({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    events.off('openchange', onOpenChangeLocal);
                    const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
                    const isFocusInsideFloatingTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, activeEl) || tree && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, getNodeId(), false).some({
                        "FloatingFocusManager.useIsoLayoutEffect": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.floating, activeEl)
                    }["FloatingFocusManager.useIsoLayoutEffect"]);
                    const returnElement = getReturnElement();
                    queueMicrotask({
                        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                            // This is `returnElement`, if it's tabbable, or its first tabbable child.
                            const tabbableReturnElement = getFirstTabbableElement(returnElement);
                            const hasExplicitReturnFocus = typeof returnFocusRef.current !== 'boolean';
                            if (// eslint-disable-next-line react-hooks/exhaustive-deps
                            returnFocusRef.current && !preventReturnFocusRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(tabbableReturnElement) && (// If the focus moved somewhere else after mount, avoid returning focus
                            // since it likely entered a different element which should be
                            // respected: https://github.com/floating-ui/floating-ui/issues/2607
                            !hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
                                tabbableReturnElement.focus({
                                    preventScroll: true
                                });
                            }
                            fallbackEl.remove();
                        }
                    }["FloatingFocusManager.useIsoLayoutEffect"]);
                }
            })["FloatingFocusManager.useIsoLayoutEffect"];
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        floating,
        floatingFocusElement,
        returnFocusRef,
        dataRef,
        events,
        tree,
        isInsidePortal,
        domReference,
        getNodeId
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            // The `returnFocus` cleanup behavior is inside a microtask; ensure we
            // wait for it to complete before resetting the flag.
            queueMicrotask({
                "FloatingFocusManager.useEffect": ()=>{
                    preventReturnFocusRef.current = false;
                }
            }["FloatingFocusManager.useEffect"]);
        }
    }["FloatingFocusManager.useEffect"], [
        disabled
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !open) {
                return undefined;
            }
            function handlePointerDown(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                if (target?.closest(`[${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CLICK_TRIGGER_IDENTIFIER"]}]`)) {
                    isPointerDownRef.current = true;
                }
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
            doc.addEventListener('pointerdown', handlePointerDown, true);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    doc.removeEventListener('pointerdown', handlePointerDown, true);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        open,
        floatingFocusElement
    ]);
    // Synchronize the `context` & `modal` value to the FloatingPortal context.
    // It will decide whether or not it needs to render its own guards.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (disabled) {
                return undefined;
            }
            if (!portalContext) {
                return undefined;
            }
            portalContext.setFocusManagerState({
                modal,
                closeOnFocusOut,
                open,
                onOpenChange: store.setOpen,
                domReference
            });
            return ({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    portalContext.setFocusManagerState(null);
                }
            })["FloatingFocusManager.useIsoLayoutEffect"];
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        portalContext,
        modal,
        open,
        store,
        closeOnFocusOut,
        domReference
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (disabled || !floatingFocusElement) {
                return undefined;
            }
            handleTabIndex(floatingFocusElement, orderRef);
            return ({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
                }
            })["FloatingFocusManager.useIsoLayoutEffect"];
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        floatingFocusElement,
        orderRef
    ]);
    const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            shouldRenderGuards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "inside",
                ref: mergedBeforeGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        const els = getTabbableElements();
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(els[els.length - 1]);
                    } else if (portalContext?.portalNode) {
                        preventReturnFocusRef.current = false;
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalContext.portalNode)) {
                            const nextTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNextTabbable"])(domReference);
                            nextTabbable?.focus();
                        } else {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(previousFocusableElement ?? portalContext.beforeOutsideRef)?.focus();
                        }
                    }
                }
            }),
            children,
            shouldRenderGuards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "inside",
                ref: mergedAfterGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(getTabbableElements()[0]);
                    } else if (portalContext?.portalNode) {
                        if (closeOnFocusOut) {
                            preventReturnFocusRef.current = true;
                        }
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalContext.portalNode)) {
                            const prevTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreviousTabbable"])(domReference);
                            prevTabbable?.focus();
                        } else {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(nextFocusableElement ?? portalContext.afterOutsideRef)?.focus();
                        }
                    }
                }
            })
        ]
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useDismiss.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeProp",
    ()=>normalizeProp,
    "useDismiss",
    ()=>useDismiss
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/nodes.js [app-client] (ecmascript)");
/* eslint-disable no-underscore-dangle */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)");
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
const bubbleHandlerKeys = {
    intentional: 'onClick',
    sloppy: 'onPointerDown'
};
function normalizeProp(normalizable) {
    return {
        escapeKey: typeof normalizable === 'boolean' ? normalizable : normalizable?.escapeKey ?? false,
        outsidePress: typeof normalizable === 'boolean' ? normalizable : normalizable?.outsidePress ?? true
    };
}
function useDismiss(context, props = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const referenceElement = store.useState('referenceElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const { onOpenChange, dataRef } = store.context;
    const { enabled = true, escapeKey = true, outsidePress: outsidePressProp = true, outsidePressEvent = 'sloppy', referencePress = false, referencePressEvent = 'sloppy', ancestorScroll = false, bubbles, externalTree } = props;
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    const outsidePressFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(typeof outsidePressProp === 'function' ? outsidePressProp : ({
        "useDismiss.useStableCallback[outsidePressFn]": ()=>false
    })["useDismiss.useStableCallback[outsidePressFn]"]);
    const outsidePress = typeof outsidePressProp === 'function' ? outsidePressFn : outsidePressProp;
    const endedOrStartedInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
    const touchStateRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const cancelDismissOnEndTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const clearInsideReactTreeTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const clearInsideReactTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[clearInsideReactTree]": ()=>{
            clearInsideReactTreeTimeout.clear();
            dataRef.current.insideReactTree = false;
        }
    }["useDismiss.useStableCallback[clearInsideReactTree]"]);
    const isComposingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const currentPointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('');
    const trackPointerType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[trackPointerType]": (event)=>{
            currentPointerTypeRef.current = event.pointerType;
        }
    }["useDismiss.useStableCallback[trackPointerType]"]);
    const getOutsidePressEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[getOutsidePressEvent]": ()=>{
            const type = currentPointerTypeRef.current;
            const computedType = type === 'pen' || !type ? 'mouse' : type;
            const resolved = typeof outsidePressEvent === 'function' ? outsidePressEvent() : outsidePressEvent;
            if (typeof resolved === 'string') {
                return resolved;
            }
            return resolved[computedType];
        }
    }["useDismiss.useStableCallback[getOutsidePressEvent]"]);
    const closeOnEscapeKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[closeOnEscapeKeyDown]": (event)=>{
            if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
                return;
            }
            // Wait until IME is settled. Pressing `Escape` while composing should
            // close the compose menu, but not the floating element.
            if (isComposingRef.current) {
                return;
            }
            const nodeId = dataRef.current.floatingContext?.nodeId;
            const children = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId) : [];
            if (!escapeKeyBubbles) {
                if (children.length > 0) {
                    let shouldDismiss = true;
                    children.forEach({
                        "useDismiss.useStableCallback[closeOnEscapeKeyDown]": (child)=>{
                            if (child.context?.open && !child.context.dataRef.current.__escapeKeyBubbles) {
                                shouldDismiss = false;
                            }
                        }
                    }["useDismiss.useStableCallback[closeOnEscapeKeyDown]"]);
                    if (!shouldDismiss) {
                        return;
                    }
                }
            }
            const native = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReactEvent"])(event) ? event.nativeEvent : event;
            const eventDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].escapeKey, native);
            store.setOpen(false, eventDetails);
            if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) {
                event.stopPropagation();
            }
        }
    }["useDismiss.useStableCallback[closeOnEscapeKeyDown]"]);
    const shouldIgnoreEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[shouldIgnoreEvent]": (event)=>{
            const computedOutsidePressEvent = getOutsidePressEvent();
            return computedOutsidePressEvent === 'intentional' && event.type !== 'click' || computedOutsidePressEvent === 'sloppy' && event.type === 'click';
        }
    }["useDismiss.useStableCallback[shouldIgnoreEvent]"]);
    const markInsideReactTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[markInsideReactTree]": ()=>{
            dataRef.current.insideReactTree = true;
            clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
        }
    }["useDismiss.useStableCallback[markInsideReactTree]"]);
    const closeOnPressOutside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[closeOnPressOutside]": (event, endedOrStartedInside = false)=>{
            if (shouldIgnoreEvent(event)) {
                clearInsideReactTree();
                return;
            }
            if (dataRef.current.insideReactTree) {
                clearInsideReactTree();
                return;
            }
            if (getOutsidePressEvent() === 'intentional' && endedOrStartedInside) {
                return;
            }
            if (typeof outsidePress === 'function' && !outsidePress(event)) {
                return;
            }
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            const inertSelector = `[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('inert')}]`;
            const markers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(store.select('floatingElement')).querySelectorAll(inertSelector);
            const triggers = store.context.triggerElements;
            // If another trigger is clicked, don't close the floating element.
            if (target && (triggers.hasElement(target) || triggers.hasMatchingElement({
                "useDismiss.useStableCallback[closeOnPressOutside]": (trigger)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(trigger, target)
            }["useDismiss.useStableCallback[closeOnPressOutside]"]))) {
                return;
            }
            let targetRootAncestor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target) ? target : null;
            while(targetRootAncestor && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(targetRootAncestor)){
                const nextParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(targetRootAncestor);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(nextParent) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(nextParent)) {
                    break;
                }
                targetRootAncestor = nextParent;
            }
            // Check if the click occurred on a third-party element injected after the
            // floating element rendered.
            if (markers.length && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRootElement"])(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
            !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(target, store.select('floatingElement')) && // If the target root element contains none of the markers, then the
            // element was injected after the floating element rendered.
            Array.from(markers).every({
                "useDismiss.useStableCallback[closeOnPressOutside]": (marker)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(targetRootAncestor, marker)
            }["useDismiss.useStableCallback[closeOnPressOutside]"])) {
                return;
            }
            // Check if the click occurred on the scrollbar
            // Skip for touch events: scrollbars don't receive touch events on most platforms
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(target) && !('touches' in event)) {
                const lastTraversableNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(target);
                const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(target);
                const scrollRe = /auto|scroll/;
                const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
                const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
                const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
                const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
                const isRTL = style.direction === 'rtl';
                // Check click position relative to scrollbar.
                // In some browsers it is possible to change the <body> (or window)
                // scrollbar to the left side, but is very rare and is difficult to
                // check for. Plus, for modal dialogs with backdrops, it is more
                // important that the backdrop is checked but not so much the window.
                const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
                const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
                if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
                    return;
                }
            }
            const nodeId = dataRef.current.floatingContext?.nodeId;
            const targetIsInsideChildren = tree && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId).some({
                "useDismiss.useStableCallback[closeOnPressOutside]": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, node.context?.elements.floating)
            }["useDismiss.useStableCallback[closeOnPressOutside]"]);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('floatingElement')) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('domReferenceElement')) || targetIsInsideChildren) {
                return;
            }
            const children = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId) : [];
            if (children.length > 0) {
                let shouldDismiss = true;
                children.forEach({
                    "useDismiss.useStableCallback[closeOnPressOutside]": (child)=>{
                        if (child.context?.open && !child.context.dataRef.current.__outsidePressBubbles) {
                            shouldDismiss = false;
                        }
                    }
                }["useDismiss.useStableCallback[closeOnPressOutside]"]);
                if (!shouldDismiss) {
                    return;
                }
            }
            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].outsidePress, event));
            clearInsideReactTree();
        }
    }["useDismiss.useStableCallback[closeOnPressOutside]"]);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handlePointerDown]": (event)=>{
            if (getOutsidePressEvent() !== 'sloppy' || event.pointerType === 'touch' || !store.select('open') || !enabled || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('floatingElement')) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('domReferenceElement'))) {
                return;
            }
            closeOnPressOutside(event);
        }
    }["useDismiss.useStableCallback[handlePointerDown]"]);
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handleTouchStart]": (event)=>{
            if (getOutsidePressEvent() !== 'sloppy' || !store.select('open') || !enabled || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('floatingElement')) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('domReferenceElement'))) {
                return;
            }
            const touch = event.touches[0];
            if (touch) {
                touchStateRef.current = {
                    startTime: Date.now(),
                    startX: touch.clientX,
                    startY: touch.clientY,
                    dismissOnTouchEnd: false,
                    dismissOnMouseDown: true
                };
                cancelDismissOnEndTimeout.start(1000, {
                    "useDismiss.useStableCallback[handleTouchStart]": ()=>{
                        if (touchStateRef.current) {
                            touchStateRef.current.dismissOnTouchEnd = false;
                            touchStateRef.current.dismissOnMouseDown = false;
                        }
                    }
                }["useDismiss.useStableCallback[handleTouchStart]"]);
            }
        }
    }["useDismiss.useStableCallback[handleTouchStart]"]);
    const handleTouchStartCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handleTouchStartCapture]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            function callback() {
                handleTouchStart(event);
                target?.removeEventListener(event.type, callback);
            }
            target?.addEventListener(event.type, callback);
        }
    }["useDismiss.useStableCallback[handleTouchStartCapture]"]);
    const closeOnPressOutsideCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[closeOnPressOutsideCapture]": (event)=>{
            // When click outside is lazy (`up` event), handle dragging.
            // Don't close if:
            // - The click started inside the floating element.
            // - The click ended inside the floating element.
            const endedOrStartedInside = endedOrStartedInsideRef.current;
            endedOrStartedInsideRef.current = false;
            cancelDismissOnEndTimeout.clear();
            if (event.type === 'mousedown' && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) {
                return;
            }
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            function callback() {
                if (event.type === 'pointerdown') {
                    handlePointerDown(event);
                } else {
                    closeOnPressOutside(event, endedOrStartedInside);
                }
                target?.removeEventListener(event.type, callback);
            }
            target?.addEventListener(event.type, callback);
        }
    }["useDismiss.useStableCallback[closeOnPressOutsideCapture]"]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handleTouchMove]": (event)=>{
            if (getOutsidePressEvent() !== 'sloppy' || !touchStateRef.current || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('floatingElement')) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('domReferenceElement'))) {
                return;
            }
            const touch = event.touches[0];
            if (!touch) {
                return;
            }
            const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
            const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance > 5) {
                touchStateRef.current.dismissOnTouchEnd = true;
            }
            if (distance > 10) {
                closeOnPressOutside(event);
                cancelDismissOnEndTimeout.clear();
                touchStateRef.current = null;
            }
        }
    }["useDismiss.useStableCallback[handleTouchMove]"]);
    const handleTouchMoveCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handleTouchMoveCapture]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            function callback() {
                handleTouchMove(event);
                target?.removeEventListener(event.type, callback);
            }
            target?.addEventListener(event.type, callback);
        }
    }["useDismiss.useStableCallback[handleTouchMoveCapture]"]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handleTouchEnd]": (event)=>{
            if (getOutsidePressEvent() !== 'sloppy' || !touchStateRef.current || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('floatingElement')) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, store.select('domReferenceElement'))) {
                return;
            }
            if (touchStateRef.current.dismissOnTouchEnd) {
                closeOnPressOutside(event);
            }
            cancelDismissOnEndTimeout.clear();
            touchStateRef.current = null;
        }
    }["useDismiss.useStableCallback[handleTouchEnd]"]);
    const handleTouchEndCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handleTouchEndCapture]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            function callback() {
                handleTouchEnd(event);
                target?.removeEventListener(event.type, callback);
            }
            target?.addEventListener(event.type, callback);
        }
    }["useDismiss.useStableCallback[handleTouchEndCapture]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useDismiss.useEffect": ()=>{
            if (!open || !enabled) {
                return undefined;
            }
            dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
            dataRef.current.__outsidePressBubbles = outsidePressBubbles;
            const compositionTimeout = new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timeout"]();
            function onScroll(event) {
                store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event));
            }
            function handleCompositionStart() {
                compositionTimeout.clear();
                isComposingRef.current = true;
            }
            function handleCompositionEnd() {
                // Safari fires `compositionend` before `keydown`, so we need to wait
                // until the next tick to set `isComposing` to `false`.
                // https://bugs.webkit.org/show_bug.cgi?id=165004
                compositionTimeout.start(// 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
                // Only apply to WebKit for the test to remain 0ms.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebKit"])() ? 5 : 0, {
                    "useDismiss.useEffect.handleCompositionEnd": ()=>{
                        isComposingRef.current = false;
                    }
                }["useDismiss.useEffect.handleCompositionEnd"]);
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement);
            doc.addEventListener('pointerdown', trackPointerType, true);
            if (escapeKey) {
                doc.addEventListener('keydown', closeOnEscapeKeyDown);
                doc.addEventListener('compositionstart', handleCompositionStart);
                doc.addEventListener('compositionend', handleCompositionEnd);
            }
            if (outsidePress) {
                doc.addEventListener('click', closeOnPressOutsideCapture, true);
                doc.addEventListener('pointerdown', closeOnPressOutsideCapture, true);
                doc.addEventListener('touchstart', handleTouchStartCapture, true);
                doc.addEventListener('touchmove', handleTouchMoveCapture, true);
                doc.addEventListener('touchend', handleTouchEndCapture, true);
                doc.addEventListener('mousedown', closeOnPressOutsideCapture, true);
            }
            let ancestors = [];
            if (ancestorScroll) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(domReferenceElement)) {
                    ancestors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(domReferenceElement);
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(floatingElement)) {
                    ancestors = ancestors.concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(floatingElement));
                }
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(referenceElement) && referenceElement && referenceElement.contextElement) {
                    ancestors = ancestors.concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(referenceElement.contextElement));
                }
            }
            // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
            ancestors = ancestors.filter({
                "useDismiss.useEffect": (ancestor)=>ancestor !== doc.defaultView?.visualViewport
            }["useDismiss.useEffect"]);
            ancestors.forEach({
                "useDismiss.useEffect": (ancestor)=>{
                    ancestor.addEventListener('scroll', onScroll, {
                        passive: true
                    });
                }
            }["useDismiss.useEffect"]);
            return ({
                "useDismiss.useEffect": ()=>{
                    doc.removeEventListener('pointerdown', trackPointerType, true);
                    if (escapeKey) {
                        doc.removeEventListener('keydown', closeOnEscapeKeyDown);
                        doc.removeEventListener('compositionstart', handleCompositionStart);
                        doc.removeEventListener('compositionend', handleCompositionEnd);
                    }
                    if (outsidePress) {
                        doc.removeEventListener('click', closeOnPressOutsideCapture, true);
                        doc.removeEventListener('pointerdown', closeOnPressOutsideCapture, true);
                        doc.removeEventListener('touchstart', handleTouchStartCapture, true);
                        doc.removeEventListener('touchmove', handleTouchMoveCapture, true);
                        doc.removeEventListener('touchend', handleTouchEndCapture, true);
                        doc.removeEventListener('mousedown', closeOnPressOutsideCapture, true);
                    }
                    ancestors.forEach({
                        "useDismiss.useEffect": (ancestor)=>{
                            ancestor.removeEventListener('scroll', onScroll);
                        }
                    }["useDismiss.useEffect"]);
                    compositionTimeout.clear();
                    endedOrStartedInsideRef.current = false;
                }
            })["useDismiss.useEffect"];
        }
    }["useDismiss.useEffect"], [
        dataRef,
        floatingElement,
        referenceElement,
        domReferenceElement,
        escapeKey,
        outsidePress,
        open,
        onOpenChange,
        ancestorScroll,
        enabled,
        escapeKeyBubbles,
        outsidePressBubbles,
        closeOnEscapeKeyDown,
        closeOnPressOutside,
        closeOnPressOutsideCapture,
        handlePointerDown,
        handleTouchStartCapture,
        handleTouchMoveCapture,
        handleTouchEndCapture,
        trackPointerType,
        store
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](clearInsideReactTree, [
        outsidePress,
        clearInsideReactTree
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDismiss.useMemo[reference]": ()=>({
                onKeyDown: closeOnEscapeKeyDown,
                ...referencePress && {
                    [bubbleHandlerKeys[referencePressEvent]]: ({
                        "useDismiss.useMemo[reference]": (event)=>{
                            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress, event.nativeEvent));
                        }
                    })["useDismiss.useMemo[reference]"],
                    ...referencePressEvent !== 'intentional' && {
                        onClick (event) {
                            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress, event.nativeEvent));
                        }
                    }
                }
            })
    }["useDismiss.useMemo[reference]"], [
        closeOnEscapeKeyDown,
        store,
        referencePress,
        referencePressEvent
    ]);
    const handlePressedInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[handlePressedInside]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(store.select('floatingElement'), target) || event.button !== 0) {
                return;
            }
            endedOrStartedInsideRef.current = true;
        }
    }["useDismiss.useStableCallback[handlePressedInside]"]);
    const markPressStartedInsideReactTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useDismiss.useStableCallback[markPressStartedInsideReactTree]": (event)=>{
            if (!open || !enabled || event.button !== 0) {
                return;
            }
            endedOrStartedInsideRef.current = true;
        }
    }["useDismiss.useStableCallback[markPressStartedInsideReactTree]"]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDismiss.useMemo[floating]": ()=>({
                onKeyDown: closeOnEscapeKeyDown,
                // `onMouseDown` may be blocked if `event.preventDefault()` is called in
                // `onPointerDown`, such as with <NumberField.ScrubArea>.
                // See https://github.com/mui/base-ui/pull/3379
                onPointerDown: handlePressedInside,
                onMouseDown: handlePressedInside,
                onMouseUp: handlePressedInside,
                onClickCapture: markInsideReactTree,
                onMouseDownCapture (event) {
                    markInsideReactTree();
                    markPressStartedInsideReactTree(event);
                },
                onPointerDownCapture (event) {
                    markInsideReactTree();
                    markPressStartedInsideReactTree(event);
                },
                onMouseUpCapture: markInsideReactTree,
                onTouchEndCapture: markInsideReactTree,
                onTouchMoveCapture: markInsideReactTree
            })
    }["useDismiss.useMemo[floating]"], [
        closeOnEscapeKeyDown,
        handlePressedInside,
        markInsideReactTree,
        markPressStartedInsideReactTree
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDismiss.useMemo": ()=>enabled ? {
                reference,
                floating,
                trigger: reference
            } : {}
    }["useDismiss.useMemo"], [
        enabled,
        reference,
        floating
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useInteractions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInteractions",
    ()=>useInteractions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
;
;
function useInteractions(propsList = []) {
    const referenceDeps = propsList.map((key)=>key?.reference);
    const floatingDeps = propsList.map((key)=>key?.floating);
    const itemDeps = propsList.map((key)=>key?.item);
    const triggerDeps = propsList.map((key)=>key?.trigger);
    const getReferenceProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useInteractions.useCallback[getReferenceProps]": (userProps)=>mergeProps(userProps, propsList, 'reference')
    }["useInteractions.useCallback[getReferenceProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps);
    const getFloatingProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useInteractions.useCallback[getFloatingProps]": (userProps)=>mergeProps(userProps, propsList, 'floating')
    }["useInteractions.useCallback[getFloatingProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps);
    const getItemProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useInteractions.useCallback[getItemProps]": (userProps)=>mergeProps(userProps, propsList, 'item')
    }["useInteractions.useCallback[getItemProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps);
    const getTriggerProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useInteractions.useCallback[getTriggerProps]": (userProps)=>mergeProps(userProps, propsList, 'trigger')
    }["useInteractions.useCallback[getTriggerProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    triggerDeps);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useInteractions.useMemo": ()=>({
                getReferenceProps,
                getFloatingProps,
                getItemProps,
                getTriggerProps
            })
    }["useInteractions.useMemo"], [
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        getTriggerProps
    ]);
}
/* eslint-disable guard-for-in */ function mergeProps(userProps, propsList, elementKey) {
    const eventHandlers = new Map();
    const isItem = elementKey === 'item';
    const outputProps = {};
    if (elementKey === 'floating') {
        outputProps.tabIndex = -1;
        outputProps[__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]] = '';
    }
    for(const key in userProps){
        if (isItem && userProps) {
            if (key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVE_KEY"] || key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELECTED_KEY"]) {
                continue;
            }
        }
        outputProps[key] = userProps[key];
    }
    for(let i = 0; i < propsList.length; i += 1){
        let props;
        const propsOrGetProps = propsList[i]?.[elementKey];
        if (typeof propsOrGetProps === 'function') {
            props = userProps ? propsOrGetProps(userProps) : null;
        } else {
            props = propsOrGetProps;
        }
        if (!props) {
            continue;
        }
        mutablyMergeProps(outputProps, props, isItem, eventHandlers);
    }
    mutablyMergeProps(outputProps, userProps, isItem, eventHandlers);
    return outputProps;
}
function mutablyMergeProps(outputProps, props, isItem, eventHandlers) {
    for(const key in props){
        const value = props[key];
        if (isItem && (key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVE_KEY"] || key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELECTED_KEY"])) {
            continue;
        }
        if (!key.startsWith('on')) {
            outputProps[key] = value;
        } else {
            if (!eventHandlers.has(key)) {
                eventHandlers.set(key, []);
            }
            if (typeof value === 'function') {
                eventHandlers.get(key)?.push(value);
                outputProps[key] = (...args)=>{
                    return eventHandlers.get(key)?.map((fn)=>fn(...args)).find((val)=>val !== undefined);
                };
            }
        }
    }
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useRole.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRole",
    ()=>useRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
;
;
;
;
;
const componentRoleToAriaRoleMap = new Map([
    [
        'select',
        'listbox'
    ],
    [
        'combobox',
        'listbox'
    ],
    [
        'label',
        false
    ]
]);
function useRole(context, props = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const defaultFloatingId = store.useState('floatingId');
    const domReference = store.useState('domReferenceElement');
    const floatingElement = store.useState('floatingElement');
    const { enabled = true, role = 'dialog' } = props;
    const defaultReferenceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const referenceId = domReference?.id || defaultReferenceId;
    const floatingId = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useRole.useMemo[floatingId]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(floatingElement)?.id || defaultFloatingId
    }["useRole.useMemo[floatingId]"], [
        floatingElement,
        defaultFloatingId
    ]);
    const ariaRole = componentRoleToAriaRoleMap.get(role) ?? role;
    const parentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])();
    const isNested = parentId != null;
    const trigger = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useRole.useMemo[trigger]": ()=>{
            if (ariaRole === 'tooltip' || role === 'label') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
            }
            return {
                'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
                'aria-expanded': 'false',
                ...ariaRole === 'listbox' && {
                    role: 'combobox'
                },
                ...ariaRole === 'menu' && isNested && {
                    role: 'menuitem'
                },
                ...role === 'select' && {
                    'aria-autocomplete': 'none'
                },
                ...role === 'combobox' && {
                    'aria-autocomplete': 'list'
                }
            };
        }
    }["useRole.useMemo[trigger]"], [
        ariaRole,
        isNested,
        role
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useRole.useMemo[reference]": ()=>{
            if (ariaRole === 'tooltip' || role === 'label') {
                return {
                    [`aria-${role === 'label' ? 'labelledby' : 'describedby'}`]: open ? floatingId : undefined
                };
            }
            const triggerProps = trigger;
            return {
                ...triggerProps,
                'aria-expanded': open ? 'true' : 'false',
                'aria-controls': open ? floatingId : undefined,
                ...ariaRole === 'menu' && {
                    id: referenceId
                }
            };
        }
    }["useRole.useMemo[reference]"], [
        ariaRole,
        floatingId,
        open,
        referenceId,
        role,
        trigger
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useRole.useMemo[floating]": ()=>{
            const floatingProps = {
                id: floatingId,
                ...ariaRole && {
                    role: ariaRole
                }
            };
            if (ariaRole === 'tooltip' || role === 'label') {
                return floatingProps;
            }
            return {
                ...floatingProps,
                ...ariaRole === 'menu' && {
                    'aria-labelledby': referenceId
                }
            };
        }
    }["useRole.useMemo[floating]"], [
        ariaRole,
        floatingId,
        referenceId,
        role
    ]);
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useRole.useCallback[item]": ({ active, selected })=>{
            const commonProps = {
                role: 'option',
                ...active && {
                    id: `${floatingId}-fui-option`
                }
            };
            // For `menu`, we are unable to tell if the item is a `menuitemradio`
            // or `menuitemcheckbox`. For backwards-compatibility reasons, also
            // avoid defaulting to `menuitem` as it may overwrite custom role props.
            switch(role){
                case 'select':
                case 'combobox':
                    return {
                        ...commonProps,
                        'aria-selected': selected
                    };
                default:
            }
            return {};
        }
    }["useRole.useCallback[item]"], [
        floatingId,
        role
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useRole.useMemo": ()=>enabled ? {
                reference,
                floating,
                item,
                trigger
            } : {}
    }["useRole.useMemo"], [
        enabled,
        reference,
        floating,
        trigger,
        item
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingRootStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingRootStore",
    ()=>FloatingRootStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/createSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$ReactStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/ReactStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createEventEmitter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
;
;
;
const selectors = {
    open: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.open),
    domReferenceElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.domReferenceElement),
    referenceElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.positionReference ?? state.referenceElement),
    floatingElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.floatingElement),
    floatingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.floatingId)
};
class FloatingRootStore extends __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$ReactStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactStore"] {
    constructor(options){
        const { nested, noEmit, onOpenChange, triggerElements, ...initialState } = options;
        super({
            ...initialState,
            positionReference: initialState.referenceElement,
            domReferenceElement: initialState.referenceElement
        }, {
            onOpenChange,
            dataRef: {
                current: {}
            },
            events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEventEmitter"])(),
            nested,
            noEmit,
            triggerElements
        }, selectors);
    }
    /**
   * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
   *
   * @param newOpen The new open state.
   * @param eventDetails Details about the event that triggered the open state change.
   */ setOpen = (newOpen, eventDetails)=>{
        if (!newOpen || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
        // click events to upgrade a hover-open.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isClickLikeEvent"])(eventDetails.event)) {
            this.context.dataRef.current.openEvent = newOpen ? eventDetails.event : undefined;
        }
        if (!this.context.noEmit) {
            const details = {
                open: newOpen,
                reason: eventDetails.reason,
                nativeEvent: eventDetails.event,
                nested: this.context.nested,
                triggerElement: eventDetails.trigger
            };
            this.context.events.emit('openchange', details);
        }
        this.context.onOpenChange?.(newOpen, eventDetails);
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSyncedFloatingRootContext",
    ()=>useSyncedFloatingRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useRefWithInit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingRootStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingRootStore.js [app-client] (ecmascript)");
;
;
;
;
;
;
function useSyncedFloatingRootContext(options) {
    const { popupStore, noEmit = false, treatPopupAsFloatingElement = false, onOpenChange } = options;
    const floatingId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const nested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])() != null;
    const open = popupStore.useState('open');
    const referenceElement = popupStore.useState('activeTriggerElement');
    const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? 'popupElement' : 'positionerElement');
    const triggerElements = popupStore.context.triggerElements;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "useSyncedFloatingRootContext.useRefWithInit": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingRootStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingRootStore"]({
                open,
                referenceElement,
                floatingElement,
                triggerElements,
                onOpenChange,
                floatingId,
                nested,
                noEmit
            })
    }["useSyncedFloatingRootContext.useRefWithInit"]).current;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useSyncedFloatingRootContext.useIsoLayoutEffect": ()=>{
            const valuesToSync = {
                open,
                floatingId,
                referenceElement,
                floatingElement
            };
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(referenceElement)) {
                valuesToSync.domReferenceElement = referenceElement;
            }
            if (store.state.positionReference === store.state.referenceElement) {
                valuesToSync.positionReference = referenceElement;
            }
            store.update(valuesToSync);
        }
    }["useSyncedFloatingRootContext.useIsoLayoutEffect"], [
        open,
        floatingId,
        referenceElement,
        floatingElement,
        store
    ]);
    // TODO: When `setOpen` is a part of the PopupStore API, we don't need to sync it.
    store.context.onOpenChange = onOpenChange;
    store.context.nested = nested;
    store.context.noEmit = noEmit;
    return store;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEmptyRootContext",
    ()=>getEmptyRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupTriggerMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingRootStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingRootStore.js [app-client] (ecmascript)");
;
;
function getEmptyRootContext() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingRootStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingRootStore"]({
        open: false,
        floatingElement: null,
        referenceElement: null,
        triggerElements: new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupTriggerMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopupTriggerMap"](),
        floatingId: '',
        nested: false,
        noEmit: false,
        onOpenChange: undefined
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useClick.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClick",
    ()=>useClick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useAnimationFrame.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
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
function useClick(context, props = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const dataRef = store.context.dataRef;
    const { enabled = true, event: eventOption = 'click', toggle = true, ignoreMouse = false, stickIfOpen = true, touchOpenDelay = 0 } = props;
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    const touchOpenTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useClick.useMemo[reference]": ()=>({
                onPointerDown (event) {
                    pointerTypeRef.current = event.pointerType;
                },
                onMouseDown (event) {
                    const pointerType = pointerTypeRef.current;
                    const nativeEvent = event.nativeEvent;
                    const open = store.select('open');
                    // Ignore all buttons except for the "main" button.
                    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
                    if (event.button !== 0 || eventOption === 'click' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) {
                        return;
                    }
                    const openEvent = dataRef.current.openEvent;
                    const openEventType = openEvent?.type;
                    const hasClickedOnInactiveTrigger = store.select('domReferenceElement') !== event.currentTarget;
                    const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? openEventType === 'click' || openEventType === 'mousedown' : true));
                    // Animations sometimes won't run on a typeable element if using a rAF.
                    // Focus is always set on these elements. For touch, we may delay opening.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableElement"])(nativeEvent.target)) {
                        const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress, nativeEvent, nativeEvent.target);
                        if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                            touchOpenTimeout.start(touchOpenDelay, {
                                "useClick.useMemo[reference]": ()=>{
                                    store.setOpen(true, details);
                                }
                            }["useClick.useMemo[reference]"]);
                        } else {
                            store.setOpen(nextOpen, details);
                        }
                        return;
                    }
                    // Capture the currentTarget before the rAF.
                    // as React sets it to null after the event handler completes.
                    const eventCurrentTarget = event.currentTarget;
                    // Wait until focus is set on the element. This is an alternative to
                    // `event.preventDefault()` to avoid :focus-visible from appearing when using a pointer.
                    frame.request({
                        "useClick.useMemo[reference]": ()=>{
                            const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress, nativeEvent, eventCurrentTarget);
                            if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                                touchOpenTimeout.start(touchOpenDelay, {
                                    "useClick.useMemo[reference]": ()=>{
                                        store.setOpen(true, details);
                                    }
                                }["useClick.useMemo[reference]"]);
                            } else {
                                store.setOpen(nextOpen, details);
                            }
                        }
                    }["useClick.useMemo[reference]"]);
                },
                onClick (event) {
                    if (eventOption === 'mousedown-only') {
                        return;
                    }
                    const pointerType = pointerTypeRef.current;
                    if (eventOption === 'mousedown' && pointerType) {
                        pointerTypeRef.current = undefined;
                        return;
                    }
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) {
                        return;
                    }
                    const open = store.select('open');
                    const openEvent = dataRef.current.openEvent;
                    const hasClickedOnInactiveTrigger = store.select('domReferenceElement') !== event.currentTarget;
                    const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isClickLikeEvent"])(openEvent) : true));
                    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress, event.nativeEvent, event.currentTarget);
                    if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                        touchOpenTimeout.start(touchOpenDelay, {
                            "useClick.useMemo[reference]": ()=>{
                                store.setOpen(true, details);
                            }
                        }["useClick.useMemo[reference]"]);
                    } else {
                        store.setOpen(nextOpen, details);
                    }
                },
                onKeyDown () {
                    pointerTypeRef.current = undefined;
                }
            })
    }["useClick.useMemo[reference]"], [
        dataRef,
        eventOption,
        ignoreMouse,
        store,
        stickIfOpen,
        toggle,
        frame,
        touchOpenTimeout,
        touchOpenDelay
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useClick.useMemo": ()=>enabled ? {
                reference
            } : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"]
    }["useClick.useMemo"], [
        enabled,
        reference
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFloatingRootContext",
    ()=>useFloatingRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useRefWithInit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingRootStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingRootStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupTriggerMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function useFloatingRootContext(options) {
    const { open = false, onOpenChange, elements = {} } = options;
    const floatingId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const nested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])() != null;
    if ("TURBOPACK compile-time truthy", 1) {
        const optionDomReference = elements.reference;
        if (optionDomReference && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(optionDomReference)) {
            console.error('Cannot pass a virtual element to the `elements.reference` option,', 'as it must be a real DOM element. Use `context.setPositionReference()`', 'instead.');
        }
    }
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "useFloatingRootContext.useRefWithInit": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingRootStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingRootStore"]({
                open,
                onOpenChange,
                referenceElement: elements.reference ?? null,
                floatingElement: elements.floating ?? null,
                triggerElements: elements.triggers ?? new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popups$2f$popupTriggerMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopupTriggerMap"](),
                floatingId,
                nested,
                noEmit: options.noEmit || false
            })
    }["useFloatingRootContext.useRefWithInit"]).current;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFloatingRootContext.useIsoLayoutEffect": ()=>{
            const valuesToSync = {
                open,
                floatingId
            };
            // Only sync elements that are defined to avoid overwriting existing ones
            if (elements.reference !== undefined) {
                valuesToSync.referenceElement = elements.reference;
                valuesToSync.domReferenceElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elements.reference) ? elements.reference : null;
            }
            if (elements.floating !== undefined) {
                valuesToSync.floatingElement = elements.floating;
            }
            store.update(valuesToSync);
        }
    }["useFloatingRootContext.useIsoLayoutEffect"], [
        open,
        floatingId,
        elements.reference,
        elements.floating,
        store
    ]);
    store.context.onOpenChange = onOpenChange;
    store.context.nested = nested;
    store.context.noEmit = options.noEmit || false;
    return store;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/composite.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGridCellMap",
    ()=>createGridCellMap,
    "findNonDisabledListIndex",
    ()=>findNonDisabledListIndex,
    "getGridCellIndexOfCorner",
    ()=>getGridCellIndexOfCorner,
    "getGridCellIndices",
    ()=>getGridCellIndices,
    "getGridNavigatedIndex",
    ()=>getGridNavigatedIndex,
    "getMaxListIndex",
    ()=>getMaxListIndex,
    "getMinListIndex",
    ()=>getMinListIndex,
    "isDifferentGridRow",
    ()=>isDifferentGridRow,
    "isIndexOutOfListBounds",
    ()=>isIndexOutOfListBounds,
    "isListIndexDisabled",
    ()=>isListIndexDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
;
;
;
;
function isDifferentGridRow(index, cols, prevRow) {
    return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfListBounds(listRef, index) {
    return index < 0 || index >= listRef.current.length;
}
function getMinListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
        disabledIndices
    });
}
function getMaxListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
        decrement: true,
        startingIndex: listRef.current.length,
        disabledIndices
    });
}
function findNonDisabledListIndex(listRef, { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}) {
    let index = startingIndex;
    do {
        index += decrement ? -amount : amount;
    }while (index >= 0 && index <= listRef.current.length - 1 && isListIndexDisabled(listRef, index, disabledIndices))
    return index;
}
function getGridNavigatedIndex(listRef, { event, orientation, loopFocus, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent: stop = false }) {
    let nextIndex = prevIndex;
    // ---------------------------------------------------------------------------
    // Detect row structure based on DOM. This works when items are grouped inside
    // elements that declare `role="row"` (e.g., Combobox.Row). We build a matrix
    // where each entry is the array of item indices for that visual row. The
    // algorithm gracefully falls back to regular `cols`-based handling when no
    // row structure can be detected.
    // ---------------------------------------------------------------------------
    const rows = [];
    const rowIndexMap = {};
    let hasRoleRow = false;
    {
        let currentRowEl = null;
        let currentRowIndex = -1;
        listRef.current.forEach((el, idx)=>{
            if (el == null) {
                return;
            }
            const rowEl = el.closest('[role="row"]');
            if (rowEl) {
                hasRoleRow = true;
            }
            if (rowEl !== currentRowEl || currentRowIndex === -1) {
                currentRowEl = rowEl;
                currentRowIndex += 1;
                rows[currentRowIndex] = [];
            }
            rows[currentRowIndex].push(idx);
            rowIndexMap[idx] = currentRowIndex;
        });
    }
    const hasDomRows = hasRoleRow && rows.length > 0 && rows.some((row)=>row.length !== cols);
    function navigateVertically(direction) {
        if (!hasDomRows || prevIndex === -1) {
            return undefined;
        }
        const currentRow = rowIndexMap[prevIndex];
        if (currentRow == null) {
            return undefined;
        }
        const colInRow = rows[currentRow].indexOf(prevIndex);
        let nextRow = direction === 'up' ? currentRow - 1 : currentRow + 1;
        if (loopFocus) {
            if (nextRow < 0) {
                nextRow = rows.length - 1;
            } else if (nextRow >= rows.length) {
                nextRow = 0;
            }
        }
        const visited = new Set();
        while(nextRow >= 0 && nextRow < rows.length && !visited.has(nextRow)){
            visited.add(nextRow);
            const targetRow = rows[nextRow];
            if (targetRow.length === 0) {
                nextRow = direction === 'up' ? nextRow - 1 : nextRow + 1;
                continue;
            }
            const clampedCol = Math.min(colInRow, targetRow.length - 1);
            // Start from the preferred column, fallback leftwards until first
            // enabled item is found.
            for(let col = clampedCol; col >= 0; col -= 1){
                const candidate = targetRow[col];
                if (!isListIndexDisabled(listRef, candidate, disabledIndices)) {
                    return candidate;
                }
            }
            // Row had no enabled items, move to next row in the same direction.
            nextRow = direction === 'up' ? nextRow - 1 : nextRow + 1;
            if (loopFocus) {
                if (nextRow < 0) {
                    nextRow = rows.length - 1;
                } else if (nextRow >= rows.length) {
                    nextRow = 0;
                }
            }
        }
        return undefined;
    }
    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_UP"]) {
        const domBasedCandidate = navigateVertically('up');
        if (domBasedCandidate !== undefined) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            nextIndex = domBasedCandidate;
        } else {
            // fallback to original logic
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex === -1) {
                nextIndex = maxIndex;
            } else {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: nextIndex,
                    amount: cols,
                    decrement: true,
                    disabledIndices
                });
                if (loopFocus && (prevIndex - cols < minIndex || nextIndex < 0)) {
                    const col = prevIndex % cols;
                    const maxCol = maxIndex % cols;
                    const offset = maxIndex - (maxCol - col);
                    if (maxCol === col) {
                        nextIndex = maxIndex;
                    } else {
                        nextIndex = maxCol > col ? offset : offset - cols;
                    }
                }
            }
            if (isIndexOutOfListBounds(listRef, nextIndex)) {
                nextIndex = prevIndex;
            }
        }
    }
    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_DOWN"]) {
        const domBasedCandidate = navigateVertically('down');
        if (domBasedCandidate !== undefined) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            nextIndex = domBasedCandidate;
        } else {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex === -1) {
                nextIndex = minIndex;
            } else {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    amount: cols,
                    disabledIndices
                });
                if (loopFocus && prevIndex + cols > maxIndex) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex % cols - cols,
                        amount: cols,
                        disabledIndices
                    });
                }
            }
            if (isIndexOutOfListBounds(listRef, nextIndex)) {
                nextIndex = prevIndex;
            }
        }
    }
    // Remains on the same row/column.
    if (orientation === 'both') {
        const prevRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(prevIndex / cols);
        if (event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"])) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex % cols !== cols - 1) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    disabledIndices
                });
                if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex - prevIndex % cols - 1,
                        disabledIndices
                    });
                }
            } else if (loopFocus) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            }
            if (isDifferentGridRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        if (event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"])) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex % cols !== 0) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    decrement: true,
                    disabledIndices
                });
                if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex + (cols - prevIndex % cols),
                        decrement: true,
                        disabledIndices
                    });
                }
            } else if (loopFocus) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex + (cols - prevIndex % cols),
                    decrement: true,
                    disabledIndices
                });
            }
            if (isDifferentGridRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        const lastRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(maxIndex / cols) === prevRow;
        if (isIndexOutOfListBounds(listRef, nextIndex)) {
            if (loopFocus && lastRow) {
                nextIndex = event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"]) ? maxIndex : findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            } else {
                nextIndex = prevIndex;
            }
        }
    }
    return nextIndex;
}
function createGridCellMap(sizes, cols, dense) {
    const cellMap = [];
    let startIndex = 0;
    sizes.forEach(({ width, height }, index)=>{
        if (width > cols) {
            if ("TURBOPACK compile-time truthy", 1) {
                throw new Error(("TURBOPACK compile-time truthy", 1) ? `[Floating UI]: Invalid grid - item width at index ${index} is greater than grid columns` : "TURBOPACK unreachable");
            }
        }
        let itemPlaced = false;
        if (dense) {
            startIndex = 0;
        }
        while(!itemPlaced){
            const targetCells = [];
            for(let i = 0; i < width; i += 1){
                for(let j = 0; j < height; j += 1){
                    targetCells.push(startIndex + i + j * cols);
                }
            }
            if (startIndex % cols + width <= cols && targetCells.every((cell)=>cellMap[cell] == null)) {
                targetCells.forEach((cell)=>{
                    cellMap[cell] = index;
                });
                itemPlaced = true;
            } else {
                startIndex += 1;
            }
        }
    });
    // convert into a non-sparse array
    return [
        ...cellMap
    ];
}
function getGridCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
    if (index === -1) {
        return -1;
    }
    const firstCellIndex = cellMap.indexOf(index);
    const sizeItem = sizes[index];
    switch(corner){
        case 'tl':
            return firstCellIndex;
        case 'tr':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + sizeItem.width - 1;
        case 'bl':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + (sizeItem.height - 1) * cols;
        case 'br':
            return cellMap.lastIndexOf(index);
        default:
            return -1;
    }
}
function getGridCellIndices(indices, cellMap) {
    return cellMap.flatMap((index, cellIndex)=>indices.includes(index) ? [
            cellIndex
        ] : []);
}
function isListIndexDisabled(listRef, index, disabledIndices) {
    if (typeof disabledIndices === 'function') {
        return disabledIndices(index);
    }
    if (disabledIndices) {
        return disabledIndices.includes(index);
    }
    const element = listRef.current[index];
    if (!element) {
        return false;
    }
    return element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useListNavigation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ESCAPE",
    ()=>ESCAPE,
    "useListNavigation",
    ()=>useListNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/composite.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/enqueueFocus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
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
const ESCAPE = 'Escape';
function doSwitch(orientation, vertical, horizontal) {
    switch(orientation){
        case 'vertical':
            return vertical;
        case 'horizontal':
            return horizontal;
        default:
            return vertical || horizontal;
    }
}
function isMainOrientationKey(key, orientation) {
    const vertical = key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_UP"] || key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_DOWN"];
    const horizontal = key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"] || key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"];
    return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
    const vertical = key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_DOWN"];
    const horizontal = rtl ? key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"] : key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"];
    return doSwitch(orientation, vertical, horizontal) || key === 'Enter' || key === ' ' || key === '';
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
    const vertical = rtl ? key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"] : key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"];
    const horizontal = key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_DOWN"];
    return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
    const vertical = rtl ? key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"];
    const horizontal = key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_UP"];
    if (orientation === 'both' || orientation === 'horizontal' && cols && cols > 1) {
        return key === ESCAPE;
    }
    return doSwitch(orientation, vertical, horizontal);
}
function useListNavigation(context, props) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const dataRef = store.context.dataRef;
    const { listRef, activeIndex, onNavigate: onNavigateProp = ()=>{}, enabled = true, selectedIndex = null, allowEscape = false, loopFocus = false, nested = false, rtl = false, virtual = false, focusItemOnOpen = 'auto', focusItemOnHover = true, openOnArrowKeyDown = true, disabledIndices = undefined, orientation = 'vertical', parentOrientation, cols = 1, scrollItemIntoView = true, itemSizes, dense = false, id, resetOnPointerLeave = true, externalTree } = props;
    if ("TURBOPACK compile-time truthy", 1) {
        if (allowEscape) {
            if (!loopFocus) {
                console.warn('`useListNavigation` looping must be enabled to allow escaping.');
            }
            if (!virtual) {
                console.warn('`useListNavigation` must be virtual to allow escaping.');
            }
        }
        if (orientation === 'vertical' && cols > 1) {
            console.warn('In grid list navigation mode (`cols` > 1), the `orientation` should', 'be either "horizontal" or "both".');
        }
    }
    const floatingFocusElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(floatingElement);
    const floatingFocusElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(floatingFocusElement);
    const parentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])();
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useListNavigation.useIsoLayoutEffect": ()=>{
            dataRef.current.orientation = orientation;
        }
    }["useListNavigation.useIsoLayoutEffect"], [
        dataRef,
        orientation
    ]);
    const typeableComboboxReference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(domReferenceElement);
    const focusItemOnOpenRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](focusItemOnOpen);
    const indexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](selectedIndex ?? -1);
    const keyRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const isPointerModalityRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    const onNavigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useListNavigation.useStableCallback[onNavigate]": (event)=>{
            onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event);
        }
    }["useListNavigation.useStableCallback[onNavigate]"]);
    const previousOnNavigateRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](onNavigate);
    const previousMountedRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](!!floatingElement);
    const previousOpenRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](open);
    const forceSyncFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const forceScrollIntoViewRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const disabledIndicesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(disabledIndices);
    const latestOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(open);
    const scrollItemIntoViewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(scrollItemIntoView);
    const selectedIndexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(selectedIndex);
    const resetOnPointerLeaveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(resetOnPointerLeave);
    const focusItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useListNavigation.useStableCallback[focusItem]": ()=>{
            function runFocus(item) {
                if (virtual) {
                    tree?.events.emit('virtualfocus', item);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(item, {
                        sync: forceSyncFocusRef.current,
                        preventScroll: true
                    });
                }
            }
            const initialItem = listRef.current[indexRef.current];
            const forceScrollIntoView = forceScrollIntoViewRef.current;
            if (initialItem) {
                runFocus(initialItem);
            }
            const scheduler = forceSyncFocusRef.current ? ({
                "useListNavigation.useStableCallback[focusItem]": (v)=>v()
            })["useListNavigation.useStableCallback[focusItem]"] : requestAnimationFrame;
            scheduler({
                "useListNavigation.useStableCallback[focusItem]": ()=>{
                    const waitedItem = listRef.current[indexRef.current] || initialItem;
                    if (!waitedItem) {
                        return;
                    }
                    if (!initialItem) {
                        runFocus(waitedItem);
                    }
                    const scrollIntoViewOptions = scrollItemIntoViewRef.current;
                    const shouldScrollIntoView = scrollIntoViewOptions && // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    item && (forceScrollIntoView || !isPointerModalityRef.current);
                    if (shouldScrollIntoView) {
                        // JSDOM doesn't support `.scrollIntoView()` but it's widely supported
                        // by all browsers.
                        waitedItem.scrollIntoView?.(typeof scrollIntoViewOptions === 'boolean' ? {
                            block: 'nearest',
                            inline: 'nearest'
                        } : scrollIntoViewOptions);
                    }
                }
            }["useListNavigation.useStableCallback[focusItem]"]);
        }
    }["useListNavigation.useStableCallback[focusItem]"]);
    // Sync `selectedIndex` to be the `activeIndex` upon opening the floating
    // element. Also, reset `activeIndex` upon closing the floating element.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useListNavigation.useIsoLayoutEffect": ()=>{
            if (!enabled) {
                return;
            }
            if (open && floatingElement) {
                indexRef.current = selectedIndex ?? -1;
                if (focusItemOnOpenRef.current && selectedIndex != null) {
                    // Regardless of the pointer modality, we want to ensure the selected
                    // item comes into view when the floating element is opened.
                    forceScrollIntoViewRef.current = true;
                    onNavigate();
                }
            } else if (previousMountedRef.current) {
                // Since the user can specify `onNavigate` conditionally
                // (onNavigate: open ? setActiveIndex : setSelectedIndex),
                // we store and call the previous function.
                indexRef.current = -1;
                previousOnNavigateRef.current();
            }
        }
    }["useListNavigation.useIsoLayoutEffect"], [
        enabled,
        open,
        floatingElement,
        selectedIndex,
        onNavigate
    ]);
    // Sync `activeIndex` to be the focused item while the floating element is
    // open.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useListNavigation.useIsoLayoutEffect": ()=>{
            if (!enabled) {
                return;
            }
            if (!open) {
                forceSyncFocusRef.current = false;
                return;
            }
            if (!floatingElement) {
                return;
            }
            if (activeIndex == null) {
                forceSyncFocusRef.current = false;
                if (selectedIndexRef.current != null) {
                    return;
                }
                // Reset while the floating element was open (e.g. the list changed).
                if (previousMountedRef.current) {
                    indexRef.current = -1;
                    focusItem();
                }
                // Initial sync.
                if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
                    let runs = 0;
                    const waitForListPopulated = {
                        "useListNavigation.useIsoLayoutEffect.waitForListPopulated": ()=>{
                            if (listRef.current[0] == null) {
                                // Avoid letting the browser paint if possible on the first try,
                                // otherwise use rAF. Don't try more than twice, since something
                                // is wrong otherwise.
                                if (runs < 2) {
                                    const scheduler = runs ? requestAnimationFrame : queueMicrotask;
                                    scheduler(waitForListPopulated);
                                }
                                runs += 1;
                            } else {
                                // initially focus the first non-disabled item
                                indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMinListIndex"])(listRef) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxListIndex"])(listRef);
                                keyRef.current = null;
                                onNavigate();
                            }
                        }
                    }["useListNavigation.useIsoLayoutEffect.waitForListPopulated"];
                    waitForListPopulated();
                }
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIndexOutOfListBounds"])(listRef, activeIndex)) {
                indexRef.current = activeIndex;
                focusItem();
                forceScrollIntoViewRef.current = false;
            }
        }
    }["useListNavigation.useIsoLayoutEffect"], [
        enabled,
        open,
        floatingElement,
        activeIndex,
        selectedIndexRef,
        nested,
        listRef,
        orientation,
        rtl,
        onNavigate,
        focusItem,
        disabledIndicesRef
    ]);
    // Ensure the parent floating element has focus when a nested child closes
    // to allow arrow key navigation to work after the pointer leaves the child.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useListNavigation.useIsoLayoutEffect": ()=>{
            if (!enabled || floatingElement || !tree || virtual || !previousMountedRef.current) {
                return;
            }
            const nodes = tree.nodesRef.current;
            const parent = nodes.find({
                "useListNavigation.useIsoLayoutEffect": (node)=>node.id === parentId
            }["useListNavigation.useIsoLayoutEffect"])?.context?.elements.floating;
            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement));
            const treeContainsActiveEl = nodes.some({
                "useListNavigation.useIsoLayoutEffect.treeContainsActiveEl": (node)=>node.context && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context.elements.floating, activeEl)
            }["useListNavigation.useIsoLayoutEffect.treeContainsActiveEl"]);
            if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
                parent.focus({
                    preventScroll: true
                });
            }
        }
    }["useListNavigation.useIsoLayoutEffect"], [
        enabled,
        floatingElement,
        tree,
        parentId,
        virtual
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useListNavigation.useIsoLayoutEffect": ()=>{
            previousOnNavigateRef.current = onNavigate;
            previousOpenRef.current = open;
            previousMountedRef.current = !!floatingElement;
        }
    }["useListNavigation.useIsoLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useListNavigation.useIsoLayoutEffect": ()=>{
            if (!open) {
                keyRef.current = null;
                focusItemOnOpenRef.current = focusItemOnOpen;
            }
        }
    }["useListNavigation.useIsoLayoutEffect"], [
        open,
        focusItemOnOpen
    ]);
    const hasActiveIndex = activeIndex != null;
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListNavigation.useMemo[item]": ()=>{
            function syncCurrentTarget(event) {
                if (!latestOpenRef.current) {
                    return;
                }
                const index = listRef.current.indexOf(event.currentTarget);
                if (index !== -1 && indexRef.current !== index) {
                    indexRef.current = index;
                    onNavigate(event);
                }
            }
            const itemProps = {
                onFocus (event) {
                    forceSyncFocusRef.current = true;
                    syncCurrentTarget(event);
                },
                onClick: {
                    "useListNavigation.useMemo[item]": ({ currentTarget })=>currentTarget.focus({
                            preventScroll: true
                        })
                }["useListNavigation.useMemo[item]"],
                // Safari
                onMouseMove (event) {
                    forceSyncFocusRef.current = true;
                    forceScrollIntoViewRef.current = false;
                    if (focusItemOnHover) {
                        syncCurrentTarget(event);
                    }
                },
                onPointerLeave (event) {
                    if (!latestOpenRef.current || !isPointerModalityRef.current || event.pointerType === 'touch') {
                        return;
                    }
                    forceSyncFocusRef.current = true;
                    const relatedTarget = event.relatedTarget;
                    if (!focusItemOnHover || listRef.current.includes(relatedTarget)) {
                        return;
                    }
                    if (!resetOnPointerLeaveRef.current) {
                        return;
                    }
                    indexRef.current = -1;
                    onNavigate(event);
                    if (!virtual) {
                        floatingFocusElementRef.current?.focus({
                            preventScroll: true
                        });
                    }
                }
            };
            return itemProps;
        }
    }["useListNavigation.useMemo[item]"], [
        latestOpenRef,
        floatingFocusElementRef,
        focusItemOnHover,
        listRef,
        onNavigate,
        resetOnPointerLeaveRef,
        virtual
    ]);
    const getParentOrientation = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useListNavigation.useCallback[getParentOrientation]": ()=>{
            return parentOrientation ?? tree?.nodesRef.current.find({
                "useListNavigation.useCallback[getParentOrientation]": (node)=>node.id === parentId
            }["useListNavigation.useCallback[getParentOrientation]"])?.context?.dataRef?.current.orientation;
        }
    }["useListNavigation.useCallback[getParentOrientation]"], [
        parentId,
        tree,
        parentOrientation
    ]);
    const commonOnKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useListNavigation.useStableCallback[commonOnKeyDown]": (event)=>{
            isPointerModalityRef.current = false;
            forceSyncFocusRef.current = true;
            // When composing a character, Chrome fires ArrowDown twice. Firefox/Safari
            // don't appear to suffer from this. `event.isComposing` is avoided due to
            // Safari not supporting it properly (although it's not needed in the first
            // place for Safari, just avoiding any possible issues).
            if (event.which === 229) {
                return;
            }
            // If the floating element is animating out, ignore navigation. Otherwise,
            // the `activeIndex` gets set to 0 despite not being open so the next time
            // the user ArrowDowns, the first item won't be focused.
            if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
                return;
            }
            if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
                // If the nested list's close key is also the parent navigation key,
                // let the parent navigate. Otherwise, stop propagating the event.
                if (!isMainOrientationKey(event.key, getParentOrientation())) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                }
                store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].listNavigation, event.nativeEvent));
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(domReferenceElement)) {
                    if (virtual) {
                        tree?.events.emit('virtualfocus', domReferenceElement);
                    } else {
                        domReferenceElement.focus();
                    }
                }
                return;
            }
            const currentIndex = indexRef.current;
            const minIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMinListIndex"])(listRef, disabledIndices);
            const maxIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxListIndex"])(listRef, disabledIndices);
            if (!typeableComboboxReference) {
                if (event.key === 'Home') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    indexRef.current = minIndex;
                    onNavigate(event);
                }
                if (event.key === 'End') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    indexRef.current = maxIndex;
                    onNavigate(event);
                }
            }
            // Grid navigation.
            if (cols > 1) {
                const sizes = itemSizes || Array.from({
                    length: listRef.current.length
                }, {
                    "useListNavigation.useStableCallback[commonOnKeyDown]": ()=>({
                            width: 1,
                            height: 1
                        })
                }["useListNavigation.useStableCallback[commonOnKeyDown]"]);
                // To calculate movements on the grid, we use hypothetical cell indices
                // as if every item was 1x1, then convert back to real indices.
                const cellMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGridCellMap"])(sizes, cols, dense);
                const minGridIndex = cellMap.findIndex({
                    "useListNavigation.useStableCallback[commonOnKeyDown].minGridIndex": (index)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(listRef, index, disabledIndices)
                }["useListNavigation.useStableCallback[commonOnKeyDown].minGridIndex"]);
                // last enabled index
                const maxGridIndex = cellMap.reduce({
                    "useListNavigation.useStableCallback[commonOnKeyDown].maxGridIndex": (foundIndex, index, cellIndex)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(listRef, index, disabledIndices) ? cellIndex : foundIndex
                }["useListNavigation.useStableCallback[commonOnKeyDown].maxGridIndex"], -1);
                const index = cellMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGridNavigatedIndex"])({
                    current: cellMap.map({
                        "useListNavigation.useStableCallback[commonOnKeyDown]": (itemIndex)=>itemIndex != null ? listRef.current[itemIndex] : null
                    }["useListNavigation.useStableCallback[commonOnKeyDown]"])
                }, {
                    event,
                    orientation,
                    loopFocus,
                    rtl,
                    cols,
                    // treat undefined (empty grid spaces) as disabled indices so we
                    // don't end up in them
                    disabledIndices: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGridCellIndices"])([
                        ...(typeof disabledIndices !== 'function' ? disabledIndices : null) || listRef.current.map({
                            "useListNavigation.useStableCallback[commonOnKeyDown]": (_, listIndex)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(listRef, listIndex, disabledIndices) ? listIndex : undefined
                        }["useListNavigation.useStableCallback[commonOnKeyDown]"]),
                        undefined
                    ], cellMap),
                    minIndex: minGridIndex,
                    maxIndex: maxGridIndex,
                    prevIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGridCellIndexOfCorner"])(indexRef.current > maxIndex ? minIndex : indexRef.current, sizes, cellMap, cols, // use a corner matching the edge closest to the direction
                    // we're moving in so we don't end up in the same item. Prefer
                    // top/left over bottom/right.
                    // eslint-disable-next-line no-nested-ternary
                    event.key === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_DOWN"] ? 'bl' : event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"]) ? 'tr' : 'tl'),
                    stopEvent: true
                })];
                if (index != null) {
                    indexRef.current = index;
                    onNavigate(event);
                }
                if (orientation === 'both') {
                    return;
                }
            }
            if (isMainOrientationKey(event.key, orientation)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                // Reset the index if no item is focused.
                if (open && !virtual && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(event.currentTarget.ownerDocument) === event.currentTarget) {
                    indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
                    onNavigate(event);
                    return;
                }
                if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
                    if (loopFocus) {
                        if (currentIndex >= maxIndex) {
                            if (allowEscape && currentIndex !== listRef.current.length) {
                                indexRef.current = -1;
                            } else {
                                // Give time for virtualizers to update the listRef.
                                forceSyncFocusRef.current = false;
                                indexRef.current = minIndex;
                            }
                        } else {
                            indexRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(listRef, {
                                startingIndex: currentIndex,
                                disabledIndices
                            });
                        }
                    } else {
                        indexRef.current = Math.min(maxIndex, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(listRef, {
                            startingIndex: currentIndex,
                            disabledIndices
                        }));
                    }
                } else if (loopFocus) {
                    if (currentIndex <= minIndex) {
                        if (allowEscape && currentIndex !== -1) {
                            indexRef.current = listRef.current.length;
                        } else {
                            // Give time for virtualizers to update the listRef.
                            forceSyncFocusRef.current = false;
                            indexRef.current = maxIndex;
                        }
                    } else {
                        indexRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(listRef, {
                            startingIndex: currentIndex,
                            decrement: true,
                            disabledIndices
                        });
                    }
                } else {
                    indexRef.current = Math.max(minIndex, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(listRef, {
                        startingIndex: currentIndex,
                        decrement: true,
                        disabledIndices
                    }));
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIndexOutOfListBounds"])(listRef, indexRef.current)) {
                    indexRef.current = -1;
                }
                onNavigate(event);
            }
        }
    }["useListNavigation.useStableCallback[commonOnKeyDown]"]);
    const ariaActiveDescendantProp = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListNavigation.useMemo[ariaActiveDescendantProp]": ()=>{
            return virtual && open && hasActiveIndex && {
                'aria-activedescendant': `${id}-${activeIndex}`
            };
        }
    }["useListNavigation.useMemo[ariaActiveDescendantProp]"], [
        virtual,
        open,
        hasActiveIndex,
        id,
        activeIndex
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListNavigation.useMemo[floating]": ()=>{
            return {
                'aria-orientation': orientation === 'both' ? undefined : orientation,
                ...!typeableComboboxReference ? ariaActiveDescendantProp : {},
                onKeyDown (event) {
                    // Close submenu on Shift+Tab
                    if (event.key === 'Tab' && event.shiftKey && open && !virtual) {
                        // If the event originated from within a nested element (e.g., a Dialog opened from
                        // within the menu), don't close the menu. The nested element has its own focus
                        // management and should handle the Tab key.
                        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
                        if (target && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElementRef.current, target)) {
                            return;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].focusOut, event.nativeEvent));
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(domReferenceElement)) {
                            domReferenceElement.focus();
                        }
                        return;
                    }
                    commonOnKeyDown(event);
                },
                onPointerMove () {
                    isPointerModalityRef.current = true;
                }
            };
        }
    }["useListNavigation.useMemo[floating]"], [
        ariaActiveDescendantProp,
        commonOnKeyDown,
        floatingFocusElementRef,
        orientation,
        typeableComboboxReference,
        store,
        open,
        virtual,
        domReferenceElement
    ]);
    const trigger = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListNavigation.useMemo[trigger]": ()=>{
            function checkVirtualMouse(event) {
                if (focusItemOnOpen === 'auto' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualClick"])(event.nativeEvent)) {
                    focusItemOnOpenRef.current = !virtual;
                }
            }
            function checkVirtualPointer(event) {
                // `pointerdown` fires first, reset the state then perform the checks.
                focusItemOnOpenRef.current = focusItemOnOpen;
                if (focusItemOnOpen === 'auto' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(event.nativeEvent)) {
                    focusItemOnOpenRef.current = true;
                }
            }
            return {
                onKeyDown (event) {
                    // non-reactive open state (to prevent re-creation of the handler)
                    const currentOpen = store.select('open');
                    isPointerModalityRef.current = false;
                    const isArrowKey = event.key.startsWith('Arrow');
                    const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
                    const isMainKey = isMainOrientationKey(event.key, orientation);
                    const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === 'Enter' || event.key.trim() === '';
                    if (virtual && currentOpen) {
                        return commonOnKeyDown(event);
                    }
                    // If a floating element should not open on arrow key down, avoid
                    // setting `activeIndex` while it's closed.
                    if (!currentOpen && !openOnArrowKeyDown && isArrowKey) {
                        return undefined;
                    }
                    if (isNavigationKey) {
                        const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
                        keyRef.current = nested && isParentMainKey ? null : event.key;
                    }
                    if (nested) {
                        if (isParentCrossOpenKey) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                            if (currentOpen) {
                                indexRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMinListIndex"])(listRef, disabledIndicesRef.current);
                                onNavigate(event);
                            } else {
                                store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].listNavigation, event.nativeEvent, event.currentTarget));
                            }
                        }
                        return undefined;
                    }
                    if (isMainKey) {
                        if (selectedIndexRef.current != null) {
                            indexRef.current = selectedIndexRef.current;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        if (!currentOpen && openOnArrowKeyDown) {
                            store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].listNavigation, event.nativeEvent, event.currentTarget));
                        } else {
                            commonOnKeyDown(event);
                        }
                        if (currentOpen) {
                            onNavigate(event);
                        }
                    }
                    return undefined;
                },
                onFocus (event) {
                    if (store.select('open') && !virtual) {
                        indexRef.current = -1;
                        onNavigate(event);
                    }
                },
                onPointerDown: checkVirtualPointer,
                onPointerEnter: checkVirtualPointer,
                onMouseDown: checkVirtualMouse,
                onClick: checkVirtualMouse
            };
        }
    }["useListNavigation.useMemo[trigger]"], [
        commonOnKeyDown,
        disabledIndicesRef,
        focusItemOnOpen,
        listRef,
        nested,
        onNavigate,
        store,
        openOnArrowKeyDown,
        orientation,
        getParentOrientation,
        rtl,
        selectedIndexRef,
        virtual
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListNavigation.useMemo[reference]": ()=>{
            return {
                ...ariaActiveDescendantProp,
                ...trigger
            };
        }
    }["useListNavigation.useMemo[reference]"], [
        ariaActiveDescendantProp,
        trigger
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListNavigation.useMemo": ()=>enabled ? {
                reference,
                floating,
                item,
                trigger
            } : {}
    }["useListNavigation.useMemo"], [
        enabled,
        reference,
        floating,
        trigger,
        item
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useTypeahead.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTypeahead",
    ()=>useTypeahead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-client] (ecmascript)");
;
;
;
;
;
;
function useTypeahead(context, props) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const dataRef = store.context.dataRef;
    const { listRef, activeIndex, onMatch: onMatchProp, onTypingChange, enabled = true, findMatch = null, resetMs = 750, ignoreKeys = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], selectedIndex = null } = props;
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const stringRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('');
    const prevIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](selectedIndex ?? activeIndex ?? -1);
    const matchIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTypeahead.useIsoLayoutEffect": ()=>{
            if (open) {
                timeout.clear();
                matchIndexRef.current = null;
                stringRef.current = '';
            }
        }
    }["useTypeahead.useIsoLayoutEffect"], [
        open,
        timeout
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTypeahead.useIsoLayoutEffect": ()=>{
            // Sync arrow key navigation but not typeahead navigation.
            if (open && stringRef.current === '') {
                prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
            }
        }
    }["useTypeahead.useIsoLayoutEffect"], [
        open,
        selectedIndex,
        activeIndex
    ]);
    const setTypingChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useTypeahead.useStableCallback[setTypingChange]": (value)=>{
            if (value) {
                if (!dataRef.current.typing) {
                    dataRef.current.typing = value;
                    onTypingChange?.(value);
                }
            } else if (dataRef.current.typing) {
                dataRef.current.typing = value;
                onTypingChange?.(value);
            }
        }
    }["useTypeahead.useStableCallback[setTypingChange]"]);
    const onKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useTypeahead.useStableCallback[onKeyDown]": (event)=>{
            function getMatchingIndex(list, orderedList, string) {
                const str = findMatch ? findMatch(orderedList, string) : orderedList.find({
                    "useTypeahead.useStableCallback[onKeyDown].getMatchingIndex": (text)=>text?.toLocaleLowerCase().indexOf(string.toLocaleLowerCase()) === 0
                }["useTypeahead.useStableCallback[onKeyDown].getMatchingIndex"]);
                return str ? list.indexOf(str) : -1;
            }
            const listContent = listRef.current;
            if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
                if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
                    setTypingChange(false);
                } else if (event.key === ' ') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                }
            }
            if (listContent == null || ignoreKeys.includes(event.key) || // Character key.
            event.key.length !== 1 || // Modifier key.
            event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            if (open && event.key !== ' ') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                setTypingChange(true);
            }
            // Bail out if the list contains a word like "llama" or "aaron". TODO:
            // allow it in this case, too.
            const allowRapidSuccessionOfFirstLetter = listContent.every({
                "useTypeahead.useStableCallback[onKeyDown].allowRapidSuccessionOfFirstLetter": (text)=>text ? text[0]?.toLocaleLowerCase() !== text[1]?.toLocaleLowerCase() : true
            }["useTypeahead.useStableCallback[onKeyDown].allowRapidSuccessionOfFirstLetter"]);
            // Allows the user to cycle through items that start with the same letter
            // in rapid succession.
            if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
                stringRef.current = '';
                prevIndexRef.current = matchIndexRef.current;
            }
            stringRef.current += event.key;
            timeout.start(resetMs, {
                "useTypeahead.useStableCallback[onKeyDown]": ()=>{
                    stringRef.current = '';
                    prevIndexRef.current = matchIndexRef.current;
                    setTypingChange(false);
                }
            }["useTypeahead.useStableCallback[onKeyDown]"]);
            const prevIndex = prevIndexRef.current;
            const index = getMatchingIndex(listContent, [
                ...listContent.slice((prevIndex || 0) + 1),
                ...listContent.slice(0, (prevIndex || 0) + 1)
            ], stringRef.current);
            if (index !== -1) {
                onMatchProp?.(index);
                matchIndexRef.current = index;
            } else if (event.key !== ' ') {
                stringRef.current = '';
                setTypingChange(false);
            }
        }
    }["useTypeahead.useStableCallback[onKeyDown]"]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useTypeahead.useMemo[reference]": ()=>({
                onKeyDown
            })
    }["useTypeahead.useMemo[reference]"], [
        onKeyDown
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useTypeahead.useMemo[floating]": ()=>{
            return {
                onKeyDown,
                onKeyUp (event) {
                    if (event.key === ' ') {
                        setTypingChange(false);
                    }
                }
            };
        }
    }["useTypeahead.useMemo[floating]"], [
        onKeyDown,
        setTypingChange
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useTypeahead.useMemo": ()=>enabled ? {
                reference,
                floating
            } : {}
    }["useTypeahead.useMemo"], [
        enabled,
        reference,
        floating
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloating.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFloating",
    ()=>useFloating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-client] (ecmascript)");
;
;
;
;
;
;
function useFloating(options = {}) {
    const { nodeId, externalTree } = options;
    const internalRootStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingRootContext"])(options);
    const rootContext = options.rootContext || internalRootStore;
    const rootContextElements = {
        reference: rootContext.useState('referenceElement'),
        floating: rootContext.useState('floatingElement'),
        domReference: rootContext.useState('domReferenceElement')
    };
    const [positionReference, setPositionReferenceRaw] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const domReferenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFloating.useIsoLayoutEffect": ()=>{
            if (rootContextElements.domReference) {
                domReferenceRef.current = rootContextElements.domReference;
            }
        }
    }["useFloating.useIsoLayoutEffect"], [
        rootContextElements.domReference
    ]);
    const position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"])({
        ...options,
        elements: {
            ...rootContextElements,
            ...positionReference && {
                reference: positionReference
            }
        }
    });
    const setPositionReference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFloating.useCallback[setPositionReference]": (node)=>{
            const computedPositionReference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node) ? {
                getBoundingClientRect: ({
                    "useFloating.useCallback[setPositionReference]": ()=>node.getBoundingClientRect()
                })["useFloating.useCallback[setPositionReference]"],
                getClientRects: ({
                    "useFloating.useCallback[setPositionReference]": ()=>node.getClientRects()
                })["useFloating.useCallback[setPositionReference]"],
                contextElement: node
            } : node;
            // Store the positionReference in state if the DOM reference is specified externally via the
            // `elements.reference` option. This ensures that it won't be overridden on future renders.
            setPositionReferenceRaw(computedPositionReference);
            position.refs.setReference(computedPositionReference);
        }
    }["useFloating.useCallback[setPositionReference]"], [
        position.refs
    ]);
    const [localDomReference, setLocalDomReference] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [localFloatingElement, setLocalFloatingElement] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    rootContext.useSyncedValue('referenceElement', localDomReference);
    rootContext.useSyncedValue('domReferenceElement', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(localDomReference) ? localDomReference : null);
    rootContext.useSyncedValue('floatingElement', localFloatingElement);
    const setReference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFloating.useCallback[setReference]": (node)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node) || node === null) {
                domReferenceRef.current = node;
                setLocalDomReference(node);
            }
            // Backwards-compatibility for passing a virtual element to `reference`
            // after it has set the DOM reference.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
            // `null` to support `positionReference` + an unstable `reference`
            // callback ref.
            node !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node)) {
                position.refs.setReference(node);
            }
        }
    }["useFloating.useCallback[setReference]"], [
        position.refs,
        setLocalDomReference
    ]);
    const setFloating = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFloating.useCallback[setFloating]": (node)=>{
            setLocalFloatingElement(node);
            position.refs.setFloating(node);
        }
    }["useFloating.useCallback[setFloating]"], [
        position.refs
    ]);
    const refs = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo[refs]": ()=>({
                ...position.refs,
                setReference,
                setFloating,
                setPositionReference,
                domReference: domReferenceRef
            })
    }["useFloating.useMemo[refs]"], [
        position.refs,
        setReference,
        setFloating,
        setPositionReference
    ]);
    const elements = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo[elements]": ()=>({
                ...position.elements,
                domReference: rootContextElements.domReference
            })
    }["useFloating.useMemo[elements]"], [
        position.elements,
        rootContextElements.domReference
    ]);
    const open = rootContext.useState('open');
    const floatingId = rootContext.useState('floatingId');
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo[context]": ()=>({
                ...position,
                dataRef: rootContext.context.dataRef,
                open,
                onOpenChange: rootContext.setOpen,
                events: rootContext.context.events,
                floatingId,
                refs,
                elements,
                nodeId,
                rootStore: rootContext
            })
    }["useFloating.useMemo[context]"], [
        position,
        refs,
        elements,
        nodeId,
        rootContext,
        open,
        floatingId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFloating.useIsoLayoutEffect": ()=>{
            rootContext.context.dataRef.current.floatingContext = context;
            const node = tree?.nodesRef.current.find({
                "useFloating.useIsoLayoutEffect": (n)=>n.id === nodeId
            }["useFloating.useIsoLayoutEffect"]);
            if (node) {
                node.context = context;
            }
        }
    }["useFloating.useIsoLayoutEffect"]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo": ()=>({
                ...position,
                context,
                refs,
                elements,
                rootStore: rootContext
            })
    }["useFloating.useMemo"], [
        position,
        refs,
        elements,
        context,
        rootContext
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/middleware/arrow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrow",
    ()=>arrow,
    "baseArrow",
    ()=>baseArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
;
const baseArrow = (options)=>({
        name: 'arrow',
        options,
        async fn (state) {
            const { x, y, placement, rects, platform, elements, middlewareData } = state;
            // Since `element` is required, we don't Partial<> the type.
            const { element, padding = 0, offsetParent = 'real' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state) || {};
            if (element == null) {
                return {};
            }
            const paddingObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaddingObject"])(padding);
            const coords = {
                x,
                y
            };
            const axis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignmentAxis"])(placement);
            const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAxisLength"])(axis);
            const arrowDimensions = await platform.getDimensions(element);
            const isYAxis = axis === 'y';
            const minProp = isYAxis ? 'top' : 'left';
            const maxProp = isYAxis ? 'bottom' : 'right';
            const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
            const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
            const startDiff = coords[axis] - rects.reference[axis];
            const arrowOffsetParent = offsetParent === 'real' ? await platform.getOffsetParent?.(element) : elements.floating;
            let clientSize = elements.floating[clientProp] || rects.floating[length];
            // DOM platform can return `window` as the `offsetParent`.
            if (!clientSize || !await platform.isElement?.(arrowOffsetParent)) {
                clientSize = elements.floating[clientProp] || rects.floating[length];
            }
            const centerToReference = endDiff / 2 - startDiff / 2;
            // If the padding is large enough that it causes the arrow to no longer be
            // centered, modify the padding so that it is centered.
            const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
            const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding);
            const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding);
            // Make sure the arrow doesn't overflow the floating element if the center
            // point is outside the floating element's bounds.
            const min = minPadding;
            const max = clientSize - arrowDimensions[length] - maxPadding;
            const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
            const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(min, center, max);
            // If the reference is small enough that the arrow's padding causes it to
            // to point to nothing for an aligned placement, adjust the offset of the
            // floating element itself. To ensure `shift()` continues to take action,
            // a single reset is performed when this is true.
            const shouldAddOffset = !middlewareData.arrow && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
            // eslint-disable-next-line no-nested-ternary
            const alignmentOffset = shouldAddOffset ? center < min ? center - min : center - max : 0;
            return {
                [axis]: coords[axis] + alignmentOffset,
                data: {
                    [axis]: offset,
                    centerOffset: center - offset - alignmentOffset,
                    ...shouldAddOffset && {
                        alignmentOffset
                    }
                },
                reset: shouldAddOffset
            };
        }
    });
const arrow = (options, deps)=>({
        ...baseArrow(options),
        options: [
            options,
            deps
        ]
    });
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isInteractiveElement",
    ()=>isInteractiveElement,
    "safePolygonIdentifier",
    ()=>safePolygonIdentifier,
    "useHoverInteractionSharedState",
    ()=>useHoverInteractionSharedState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
;
;
;
;
const safePolygonIdentifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('safe-polygon');
const interactiveSelector = `button,a,[role="button"],select,[tabindex]:not([tabindex="-1"]),${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPEABLE_SELECTOR"]}`;
function isInteractiveElement(element) {
    return element ? Boolean(element.closest(interactiveSelector)) : false;
}
function useHoverInteractionSharedState(store) {
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const interactedInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const handlerRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const blockMouseMoveRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    const performedPointerEventsMutationRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const unbindMouseMoveRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]({
        "useHoverInteractionSharedState.useRef[unbindMouseMoveRef]": ()=>{}
    }["useHoverInteractionSharedState.useRef[unbindMouseMoveRef]"]);
    const restTimeoutPendingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const openChangeTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const restTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const handleCloseOptionsRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useHoverInteractionSharedState.useMemo": ()=>{
            const data = store.context.dataRef.current;
            if (!data.hoverInteractionState) {
                data.hoverInteractionState = {
                    pointerTypeRef,
                    interactedInsideRef,
                    handlerRef,
                    blockMouseMoveRef,
                    performedPointerEventsMutationRef,
                    unbindMouseMoveRef,
                    restTimeoutPendingRef,
                    openChangeTimeout,
                    restTimeout,
                    handleCloseOptionsRef
                };
            }
            return data.hoverInteractionState;
        }
    }["useHoverInteractionSharedState.useMemo"], [
        store,
        pointerTypeRef,
        interactedInsideRef,
        handlerRef,
        blockMouseMoveRef,
        performedPointerEventsMutationRef,
        unbindMouseMoveRef,
        restTimeoutPendingRef,
        openChangeTimeout,
        restTimeout,
        handleCloseOptionsRef
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverFloatingInteraction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDelay",
    ()=>getDelay,
    "useHoverFloatingInteraction",
    ()=>useHoverFloatingInteraction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const clickLikeEvents = new Set([
    'click',
    'mousedown'
]);
function useHoverFloatingInteraction(context, parameters = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const { dataRef } = store.context;
    const { enabled = true, closeDelay: closeDelayProp = 0, externalTree } = parameters;
    const { pointerTypeRef, interactedInsideRef, handlerRef, performedPointerEventsMutationRef, unbindMouseMoveRef, restTimeoutPendingRef, openChangeTimeout: openChangeTimeout, handleCloseOptionsRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHoverInteractionSharedState"])(store);
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    const parentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])();
    const isClickLikeOpenEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverFloatingInteraction.useStableCallback[isClickLikeOpenEvent]": ()=>{
            if (interactedInsideRef.current) {
                return true;
            }
            return dataRef.current.openEvent ? clickLikeEvents.has(dataRef.current.openEvent.type) : false;
        }
    }["useHoverFloatingInteraction.useStableCallback[isClickLikeOpenEvent]"]);
    const isHoverOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverFloatingInteraction.useStableCallback[isHoverOpen]": ()=>{
            const type = dataRef.current.openEvent?.type;
            return type?.includes('mouse') && type !== 'mousedown';
        }
    }["useHoverFloatingInteraction.useStableCallback[isHoverOpen]"]);
    const closeWithDelay = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useHoverFloatingInteraction.useCallback[closeWithDelay]": (event, runElseBranch = true)=>{
            const closeDelay = getDelay(closeDelayProp, pointerTypeRef.current);
            if (closeDelay && !handlerRef.current) {
                openChangeTimeout.start(closeDelay, {
                    "useHoverFloatingInteraction.useCallback[closeWithDelay]": ()=>store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event))
                }["useHoverFloatingInteraction.useCallback[closeWithDelay]"]);
            } else if (runElseBranch) {
                openChangeTimeout.clear();
                store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event));
            }
        }
    }["useHoverFloatingInteraction.useCallback[closeWithDelay]"], [
        closeDelayProp,
        handlerRef,
        store,
        pointerTypeRef,
        openChangeTimeout
    ]);
    const cleanupMouseMoveHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverFloatingInteraction.useStableCallback[cleanupMouseMoveHandler]": ()=>{
            unbindMouseMoveRef.current();
            handlerRef.current = undefined;
        }
    }["useHoverFloatingInteraction.useStableCallback[cleanupMouseMoveHandler]"]);
    const clearPointerEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverFloatingInteraction.useStableCallback[clearPointerEvents]": ()=>{
            if (performedPointerEventsMutationRef.current) {
                const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement).body;
                body.style.pointerEvents = '';
                body.removeAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safePolygonIdentifier"]);
                performedPointerEventsMutationRef.current = false;
            }
        }
    }["useHoverFloatingInteraction.useStableCallback[clearPointerEvents]"]);
    const handleInteractInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverFloatingInteraction.useStableCallback[handleInteractInside]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInteractiveElement"])(target)) {
                interactedInsideRef.current = false;
                return;
            }
            interactedInsideRef.current = true;
        }
    }["useHoverFloatingInteraction.useStableCallback[handleInteractInside]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useHoverFloatingInteraction.useIsoLayoutEffect": ()=>{
            if (!open) {
                pointerTypeRef.current = undefined;
                restTimeoutPendingRef.current = false;
                interactedInsideRef.current = false;
                cleanupMouseMoveHandler();
                clearPointerEvents();
            }
        }
    }["useHoverFloatingInteraction.useIsoLayoutEffect"], [
        open,
        pointerTypeRef,
        restTimeoutPendingRef,
        interactedInsideRef,
        cleanupMouseMoveHandler,
        clearPointerEvents
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHoverFloatingInteraction.useEffect": ()=>{
            return ({
                "useHoverFloatingInteraction.useEffect": ()=>{
                    cleanupMouseMoveHandler();
                }
            })["useHoverFloatingInteraction.useEffect"];
        }
    }["useHoverFloatingInteraction.useEffect"], [
        cleanupMouseMoveHandler
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHoverFloatingInteraction.useEffect": ()=>{
            return clearPointerEvents;
        }
    }["useHoverFloatingInteraction.useEffect"], [
        clearPointerEvents
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useHoverFloatingInteraction.useIsoLayoutEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            if (open && handleCloseOptionsRef.current?.blockPointerEvents && isHoverOpen() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(domReferenceElement) && floatingElement) {
                performedPointerEventsMutationRef.current = true;
                const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement).body;
                body.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safePolygonIdentifier"], '');
                const ref = domReferenceElement;
                const floatingEl = floatingElement;
                const parentFloating = tree?.nodesRef.current.find({
                    "useHoverFloatingInteraction.useIsoLayoutEffect": (node)=>node.id === parentId
                }["useHoverFloatingInteraction.useIsoLayoutEffect"])?.context?.elements.floating;
                if (parentFloating) {
                    parentFloating.style.pointerEvents = '';
                }
                body.style.pointerEvents = 'none';
                ref.style.pointerEvents = 'auto';
                floatingEl.style.pointerEvents = 'auto';
                return ({
                    "useHoverFloatingInteraction.useIsoLayoutEffect": ()=>{
                        body.style.pointerEvents = '';
                        ref.style.pointerEvents = '';
                        floatingEl.style.pointerEvents = '';
                    }
                })["useHoverFloatingInteraction.useIsoLayoutEffect"];
            }
            return undefined;
        }
    }["useHoverFloatingInteraction.useIsoLayoutEffect"], [
        enabled,
        open,
        domReferenceElement,
        floatingElement,
        handleCloseOptionsRef,
        isHoverOpen,
        tree,
        parentId,
        performedPointerEventsMutationRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHoverFloatingInteraction.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            // Ensure the floating element closes after scrolling even if the pointer
            // did not move.
            // https://github.com/floating-ui/floating-ui/discussions/1692
            function onScrollMouseLeave(event) {
                if (isClickLikeOpenEvent() || !dataRef.current.floatingContext || !store.select('open')) {
                    return;
                }
                const triggerElements = store.context.triggerElements;
                if (event.relatedTarget && triggerElements.hasElement(event.relatedTarget)) {
                    // If the mouse is leaving the reference element to another trigger, don't explicitly close the popup
                    // as it will be moved.
                    return;
                }
                clearPointerEvents();
                cleanupMouseMoveHandler();
                if (!isClickLikeOpenEvent()) {
                    closeWithDelay(event);
                }
            }
            function onFloatingMouseEnter(event) {
                openChangeTimeout.clear();
                clearPointerEvents();
                handlerRef.current?.(event);
                cleanupMouseMoveHandler();
            }
            function onFloatingMouseLeave(event) {
                if (!isClickLikeOpenEvent()) {
                    closeWithDelay(event, false);
                }
            }
            const floating = floatingElement;
            if (floating) {
                floating.addEventListener('mouseleave', onScrollMouseLeave);
                floating.addEventListener('mouseenter', onFloatingMouseEnter);
                floating.addEventListener('mouseleave', onFloatingMouseLeave);
                floating.addEventListener('pointerdown', handleInteractInside, true);
            }
            return ({
                "useHoverFloatingInteraction.useEffect": ()=>{
                    if (floating) {
                        floating.removeEventListener('mouseleave', onScrollMouseLeave);
                        floating.removeEventListener('mouseenter', onFloatingMouseEnter);
                        floating.removeEventListener('mouseleave', onFloatingMouseLeave);
                        floating.removeEventListener('pointerdown', handleInteractInside, true);
                    }
                }
            })["useHoverFloatingInteraction.useEffect"];
        }
    }["useHoverFloatingInteraction.useEffect"]);
}
function getDelay(value, pointerType) {
    if (pointerType && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType)) {
        return 0;
    }
    if (typeof value === 'function') {
        return value();
    }
    return value;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/safePolygon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safePolygon",
    ()=>safePolygon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/nodes.js [app-client] (ecmascript)");
;
;
;
;
/* eslint-disable no-nested-ternary */ function isPointInPolygon(point, polygon) {
    const [x, y] = point;
    let isInsideValue = false;
    const length = polygon.length;
    // eslint-disable-next-line no-plusplus
    for(let i = 0, j = length - 1; i < length; j = i++){
        const [xi, yi] = polygon[i] || [
            0,
            0
        ];
        const [xj, yj] = polygon[j] || [
            0,
            0
        ];
        const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) {
            isInsideValue = !isInsideValue;
        }
    }
    return isInsideValue;
}
function isInside(point, rect) {
    return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
function safePolygon(options = {}) {
    const { buffer = 0.5, blockPointerEvents = false, requireIntent = true } = options;
    const timeout = new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timeout"]();
    let hasLanded = false;
    let lastX = null;
    let lastY = null;
    let lastCursorTime = typeof performance !== 'undefined' ? performance.now() : 0;
    function getCursorSpeed(x, y) {
        const currentTime = performance.now();
        const elapsedTime = currentTime - lastCursorTime;
        if (lastX === null || lastY === null || elapsedTime === 0) {
            lastX = x;
            lastY = y;
            lastCursorTime = currentTime;
            return null;
        }
        const deltaX = x - lastX;
        const deltaY = y - lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const speed = distance / elapsedTime; // px / ms
        lastX = x;
        lastY = y;
        lastCursorTime = currentTime;
        return speed;
    }
    const fn = ({ x, y, placement, elements, onClose, nodeId, tree })=>{
        return function onMouseMove(event) {
            function close() {
                timeout.clear();
                onClose();
            }
            timeout.clear();
            if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
                return undefined;
            }
            const { clientX, clientY } = event;
            const clientPoint = [
                clientX,
                clientY
            ];
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            const isLeave = event.type === 'mouseleave';
            const isOverFloatingEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.floating, target);
            const isOverReferenceEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.domReference, target);
            const refRect = elements.domReference.getBoundingClientRect();
            const rect = elements.floating.getBoundingClientRect();
            const side = placement.split('-')[0];
            const cursorLeaveFromRight = x > rect.right - rect.width / 2;
            const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
            const isOverReferenceRect = isInside(clientPoint, refRect);
            const isFloatingWider = rect.width > refRect.width;
            const isFloatingTaller = rect.height > refRect.height;
            const left = (isFloatingWider ? refRect : rect).left;
            const right = (isFloatingWider ? refRect : rect).right;
            const top = (isFloatingTaller ? refRect : rect).top;
            const bottom = (isFloatingTaller ? refRect : rect).bottom;
            if (isOverFloatingEl) {
                hasLanded = true;
                if (!isLeave) {
                    return undefined;
                }
            }
            if (isOverReferenceEl) {
                hasLanded = false;
            }
            if (isOverReferenceEl && !isLeave) {
                hasLanded = true;
                return undefined;
            }
            // Prevent overlapping floating element from being stuck in an open-close
            // loop: https://github.com/floating-ui/floating-ui/issues/1910
            if (isLeave && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(event.relatedTarget) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.floating, event.relatedTarget)) {
                return undefined;
            }
            // If any nested child is open, abort.
            if (tree && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId).some(({ context })=>context?.open)) {
                return undefined;
            }
            // If the pointer is leaving from the opposite side, the "buffer" logic
            // creates a point where the floating element remains open, but should be
            // ignored.
            // A constant of 1 handles floating point rounding errors.
            if (side === 'top' && y >= refRect.bottom - 1 || side === 'bottom' && y <= refRect.top + 1 || side === 'left' && x >= refRect.right - 1 || side === 'right' && x <= refRect.left + 1) {
                return close();
            }
            // Ignore when the cursor is within the rectangular trough between the
            // two elements. Since the triangle is created from the cursor point,
            // which can start beyond the ref element's edge, traversing back and
            // forth from the ref to the floating element can cause it to close. This
            // ensures it always remains open in that case.
            let rectPoly = [];
            switch(side){
                case 'top':
                    rectPoly = [
                        [
                            left,
                            refRect.top + 1
                        ],
                        [
                            left,
                            rect.bottom - 1
                        ],
                        [
                            right,
                            rect.bottom - 1
                        ],
                        [
                            right,
                            refRect.top + 1
                        ]
                    ];
                    break;
                case 'bottom':
                    rectPoly = [
                        [
                            left,
                            rect.top + 1
                        ],
                        [
                            left,
                            refRect.bottom - 1
                        ],
                        [
                            right,
                            refRect.bottom - 1
                        ],
                        [
                            right,
                            rect.top + 1
                        ]
                    ];
                    break;
                case 'left':
                    rectPoly = [
                        [
                            rect.right - 1,
                            bottom
                        ],
                        [
                            rect.right - 1,
                            top
                        ],
                        [
                            refRect.left + 1,
                            top
                        ],
                        [
                            refRect.left + 1,
                            bottom
                        ]
                    ];
                    break;
                case 'right':
                    rectPoly = [
                        [
                            refRect.right - 1,
                            bottom
                        ],
                        [
                            refRect.right - 1,
                            top
                        ],
                        [
                            rect.left + 1,
                            top
                        ],
                        [
                            rect.left + 1,
                            bottom
                        ]
                    ];
                    break;
                default:
            }
            function getPolygon([px, py]) {
                switch(side){
                    case 'top':
                        {
                            const cursorPointOne = [
                                isFloatingWider ? px + buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4,
                                py + buffer + 1
                            ];
                            const cursorPointTwo = [
                                isFloatingWider ? px - buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4,
                                py + buffer + 1
                            ];
                            const commonPoints = [
                                [
                                    rect.left,
                                    cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top
                                ],
                                [
                                    rect.right,
                                    cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer
                                ]
                            ];
                            return [
                                cursorPointOne,
                                cursorPointTwo,
                                ...commonPoints
                            ];
                        }
                    case 'bottom':
                        {
                            const cursorPointOne = [
                                isFloatingWider ? px + buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4,
                                py - buffer
                            ];
                            const cursorPointTwo = [
                                isFloatingWider ? px - buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4,
                                py - buffer
                            ];
                            const commonPoints = [
                                [
                                    rect.left,
                                    cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom
                                ],
                                [
                                    rect.right,
                                    cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer
                                ]
                            ];
                            return [
                                cursorPointOne,
                                cursorPointTwo,
                                ...commonPoints
                            ];
                        }
                    case 'left':
                        {
                            const cursorPointOne = [
                                px + buffer + 1,
                                isFloatingTaller ? py + buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4
                            ];
                            const cursorPointTwo = [
                                px + buffer + 1,
                                isFloatingTaller ? py - buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4
                            ];
                            const commonPoints = [
                                [
                                    cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left,
                                    rect.top
                                ],
                                [
                                    cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer,
                                    rect.bottom
                                ]
                            ];
                            return [
                                ...commonPoints,
                                cursorPointOne,
                                cursorPointTwo
                            ];
                        }
                    case 'right':
                        {
                            const cursorPointOne = [
                                px - buffer,
                                isFloatingTaller ? py + buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4
                            ];
                            const cursorPointTwo = [
                                px - buffer,
                                isFloatingTaller ? py - buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4
                            ];
                            const commonPoints = [
                                [
                                    cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right,
                                    rect.top
                                ],
                                [
                                    cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer,
                                    rect.bottom
                                ]
                            ];
                            return [
                                cursorPointOne,
                                cursorPointTwo,
                                ...commonPoints
                            ];
                        }
                    default:
                        return [];
                }
            }
            if (isPointInPolygon([
                clientX,
                clientY
            ], rectPoly)) {
                return undefined;
            }
            if (hasLanded && !isOverReferenceRect) {
                return close();
            }
            if (!isLeave && requireIntent) {
                const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
                const cursorSpeedThreshold = 0.1;
                if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
                    return close();
                }
            }
            if (!isPointInPolygon([
                clientX,
                clientY
            ], getPolygon([
                x,
                y
            ]))) {
                close();
            } else if (!hasLanded && requireIntent) {
                timeout.start(40, close);
            }
            return undefined;
        };
    };
    // eslint-disable-next-line no-underscore-dangle
    fn.__options = {
        blockPointerEvents
    };
    return fn;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFocus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocus",
    ()=>useFocus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const isMacSafari = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMac"] && __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafari"];
function useFocus(context, props = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const { events, dataRef } = store.context;
    const { enabled = true, visibleOnly = true, delay } = props;
    const blockFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    // Track which reference should be blocked from re-opening after Escape/press dismissal.
    const blockedReferenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const keyboardModalityRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useFocus.useEffect": ()=>{
            const domReference = store.select('domReferenceElement');
            if (!enabled) {
                return undefined;
            }
            const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(domReference);
            // If the reference was focused and the user left the tab/window, and the
            // floating element was not open, the focus should be blocked when they
            // return to the tab/window.
            function onBlur() {
                const currentDomReference = store.select('domReferenceElement');
                if (!store.select('open') && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(currentDomReference) && currentDomReference === (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(currentDomReference))) {
                    blockFocusRef.current = true;
                }
            }
            function onKeyDown() {
                keyboardModalityRef.current = true;
            }
            function onPointerDown() {
                keyboardModalityRef.current = false;
            }
            win.addEventListener('blur', onBlur);
            if (isMacSafari) {
                win.addEventListener('keydown', onKeyDown, true);
                win.addEventListener('pointerdown', onPointerDown, true);
            }
            return ({
                "useFocus.useEffect": ()=>{
                    win.removeEventListener('blur', onBlur);
                    if (isMacSafari) {
                        win.removeEventListener('keydown', onKeyDown, true);
                        win.removeEventListener('pointerdown', onPointerDown, true);
                    }
                }
            })["useFocus.useEffect"];
        }
    }["useFocus.useEffect"], [
        store,
        enabled
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useFocus.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            function onOpenChangeLocal(details) {
                if (details.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress || details.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].escapeKey) {
                    const referenceElement = store.select('domReferenceElement');
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(referenceElement)) {
                        blockedReferenceRef.current = referenceElement;
                        blockFocusRef.current = true;
                    }
                }
            }
            events.on('openchange', onOpenChangeLocal);
            return ({
                "useFocus.useEffect": ()=>{
                    events.off('openchange', onOpenChangeLocal);
                }
            })["useFocus.useEffect"];
        }
    }["useFocus.useEffect"], [
        events,
        enabled,
        store
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFocus.useMemo[reference]": ()=>({
                onMouseLeave () {
                    blockFocusRef.current = false;
                    blockedReferenceRef.current = null;
                },
                onFocus (event) {
                    const focusTarget = event.currentTarget;
                    if (blockFocusRef.current) {
                        if (blockedReferenceRef.current === focusTarget) {
                            return;
                        }
                        blockFocusRef.current = false;
                        blockedReferenceRef.current = null;
                    }
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
                    if (visibleOnly && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target)) {
                        // Safari fails to match `:focus-visible` if focus was initially
                        // outside the document.
                        if (isMacSafari && !event.relatedTarget) {
                            if (!keyboardModalityRef.current && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableElement"])(target)) {
                                return;
                            }
                        } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesFocusVisible"])(target)) {
                            return;
                        }
                    }
                    const movedFromOtherTrigger = event.relatedTarget && store.context.triggerElements.hasElement(event.relatedTarget);
                    const { nativeEvent, currentTarget } = event;
                    const delayValue = typeof delay === 'function' ? delay() : delay;
                    if (store.select('open') && movedFromOtherTrigger || delayValue === 0 || delayValue === undefined) {
                        store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerFocus, nativeEvent, currentTarget));
                        return;
                    }
                    timeout.start(delayValue, {
                        "useFocus.useMemo[reference]": ()=>{
                            if (blockFocusRef.current) {
                                return;
                            }
                            store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerFocus, nativeEvent, currentTarget));
                        }
                    }["useFocus.useMemo[reference]"]);
                },
                onBlur (event) {
                    blockFocusRef.current = false;
                    blockedReferenceRef.current = null;
                    const relatedTarget = event.relatedTarget;
                    const nativeEvent = event.nativeEvent;
                    // Hit the non-modal focus management portal guard. Focus will be
                    // moved into the floating element immediately after.
                    const movedToFocusGuard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(relatedTarget) && relatedTarget.hasAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('focus-guard')) && relatedTarget.getAttribute('data-type') === 'outside';
                    // Wait for the window blur listener to fire.
                    timeout.start(0, {
                        "useFocus.useMemo[reference]": ()=>{
                            const domReference = store.select('domReferenceElement');
                            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(domReference ? domReference.ownerDocument : document);
                            // Focus left the page, keep it open.
                            if (!relatedTarget && activeEl === domReference) {
                                return;
                            }
                            // When focusing the reference element (e.g. regular click), then
                            // clicking into the floating element, prevent it from hiding.
                            // Note: it must be focusable, e.g. `tabindex="-1"`.
                            // We can not rely on relatedTarget to point to the correct element
                            // as it will only point to the shadow host of the newly focused element
                            // and not the element that actually has received focus if it is located
                            // inside a shadow root.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(dataRef.current.floatingContext?.refs.floating.current, activeEl) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, activeEl) || movedToFocusGuard) {
                                return;
                            }
                            // If the next focused element is one of the triggers, do not close
                            // the floating element. The focus handler of that trigger will
                            // handle the open state.
                            const nextFocusedElement = relatedTarget ?? activeEl;
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(nextFocusedElement)) {
                                const triggerElements = store.context.triggerElements;
                                if (triggerElements.hasElement(nextFocusedElement) || triggerElements.hasMatchingElement({
                                    "useFocus.useMemo[reference]": (trigger)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(trigger, nextFocusedElement)
                                }["useFocus.useMemo[reference]"])) {
                                    return;
                                }
                            }
                            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerFocus, nativeEvent));
                        }
                    }["useFocus.useMemo[reference]"]);
                }
            })
    }["useFocus.useMemo[reference]"], [
        dataRef,
        store,
        visibleOnly,
        timeout,
        delay
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFocus.useMemo": ()=>enabled ? {
                reference,
                trigger: reference
            } : {}
    }["useFocus.useMemo"], [
        enabled,
        reference
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHover.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDelay",
    ()=>getDelay,
    "useHover",
    ()=>useHover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
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
const safePolygonIdentifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('safe-polygon');
const interactiveSelector = `button,[role="button"],select,[tabindex]:not([tabindex="-1"]),${__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPEABLE_SELECTOR"]}`;
function isInteractiveElement(element) {
    return element ? Boolean(element.closest(interactiveSelector)) : false;
}
function getDelay(value, prop, pointerType) {
    if (pointerType && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType)) {
        return 0;
    }
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'function') {
        const result = value();
        if (typeof result === 'number') {
            return result;
        }
        return result?.[prop];
    }
    return value?.[prop];
}
function getRestMs(value) {
    if (typeof value === 'function') {
        return value();
    }
    return value;
}
function useHover(context, props = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const { dataRef, events } = store.context;
    const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true, triggerElement = null, externalTree } = props;
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    const parentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])();
    const handleCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(handleClose);
    const delayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(delay);
    const restMsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(restMs);
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const interactedInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const handlerRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const restTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const blockMouseMoveRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    const performedPointerEventsMutationRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const unbindMouseMoveRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]({
        "useHover.useRef[unbindMouseMoveRef]": ()=>{}
    }["useHover.useRef[unbindMouseMoveRef]"]);
    const restTimeoutPendingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isHoverOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHover.useStableCallback[isHoverOpen]": ()=>{
            const type = dataRef.current.openEvent?.type;
            return type?.includes('mouse') && type !== 'mousedown';
        }
    }["useHover.useStableCallback[isHoverOpen]"]);
    const isClickLikeOpenEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHover.useStableCallback[isClickLikeOpenEvent]": ()=>{
            if (interactedInsideRef.current) {
                return true;
            }
            return dataRef.current.openEvent ? [
                'click',
                'mousedown'
            ].includes(dataRef.current.openEvent.type) : false;
        }
    }["useHover.useStableCallback[isClickLikeOpenEvent]"]);
    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHover.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            function onOpenChangeLocal(details) {
                if (!details.open) {
                    timeout.clear();
                    restTimeout.clear();
                    blockMouseMoveRef.current = true;
                    restTimeoutPendingRef.current = false;
                }
            }
            events.on('openchange', onOpenChangeLocal);
            return ({
                "useHover.useEffect": ()=>{
                    events.off('openchange', onOpenChangeLocal);
                }
            })["useHover.useEffect"];
        }
    }["useHover.useEffect"], [
        enabled,
        events,
        timeout,
        restTimeout
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHover.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            if (!handleCloseRef.current) {
                return undefined;
            }
            if (!open) {
                return undefined;
            }
            function onLeave(event) {
                if (isClickLikeOpenEvent()) {
                    return;
                }
                if (isHoverOpen()) {
                    store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event, event.currentTarget ?? undefined));
                }
            }
            const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement).documentElement;
            html.addEventListener('mouseleave', onLeave);
            return ({
                "useHover.useEffect": ()=>{
                    html.removeEventListener('mouseleave', onLeave);
                }
            })["useHover.useEffect"];
        }
    }["useHover.useEffect"], [
        floatingElement,
        open,
        store,
        enabled,
        handleCloseRef,
        isHoverOpen,
        isClickLikeOpenEvent
    ]);
    const closeWithDelay = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useHover.useCallback[closeWithDelay]": (event, runElseBranch = true)=>{
            const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
            if (closeDelay && !handlerRef.current) {
                timeout.start(closeDelay, {
                    "useHover.useCallback[closeWithDelay]": ()=>store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event))
                }["useHover.useCallback[closeWithDelay]"]);
            } else if (runElseBranch) {
                timeout.clear();
                store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event));
            }
        }
    }["useHover.useCallback[closeWithDelay]"], [
        delayRef,
        store,
        timeout
    ]);
    const cleanupMouseMoveHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHover.useStableCallback[cleanupMouseMoveHandler]": ()=>{
            unbindMouseMoveRef.current();
            handlerRef.current = undefined;
        }
    }["useHover.useStableCallback[cleanupMouseMoveHandler]"]);
    const clearPointerEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHover.useStableCallback[clearPointerEvents]": ()=>{
            if (performedPointerEventsMutationRef.current) {
                const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement).body;
                body.style.pointerEvents = '';
                body.removeAttribute(safePolygonIdentifier);
                performedPointerEventsMutationRef.current = false;
            }
        }
    }["useHover.useStableCallback[clearPointerEvents]"]);
    const handleInteractInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHover.useStableCallback[handleInteractInside]": (event)=>{
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            if (!isInteractiveElement(target)) {
                interactedInsideRef.current = false;
                return;
            }
            interactedInsideRef.current = true;
        }
    }["useHover.useStableCallback[handleInteractInside]"]);
    // Registering the mouse events on the reference directly to bypass React's
    // delegation system. If the cursor was on a disabled element and then entered
    // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHover.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            function onReferenceMouseEnter(event) {
                timeout.clear();
                blockMouseMoveRef.current = false;
                if (mouseOnly && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerTypeRef.current) || getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, 'open')) {
                    return;
                }
                const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
                const trigger = event.currentTarget ?? undefined;
                const domReference = store.select('domReferenceElement');
                const isOverInactiveTrigger = domReference && trigger && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, trigger);
                if (openDelay) {
                    timeout.start(openDelay, {
                        "useHover.useEffect.onReferenceMouseEnter": ()=>{
                            if (!store.select('open')) {
                                store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event, trigger));
                            }
                        }
                    }["useHover.useEffect.onReferenceMouseEnter"]);
                } else if (!open || isOverInactiveTrigger) {
                    store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event, trigger));
                }
            }
            function onReferenceMouseLeave(event) {
                if (isClickLikeOpenEvent()) {
                    clearPointerEvents();
                    return;
                }
                unbindMouseMoveRef.current();
                const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement);
                restTimeout.clear();
                restTimeoutPendingRef.current = false;
                const triggers = store.context.triggerElements;
                if (event.relatedTarget && triggers.hasElement(event.relatedTarget)) {
                    // If the mouse is leaving the reference element to another trigger, don't explicitly close the popup
                    // as it will be moved.
                    return;
                }
                if (handleCloseRef.current && dataRef.current.floatingContext) {
                    // Prevent clearing `onScrollMouseLeave` timeout.
                    if (!open) {
                        timeout.clear();
                    }
                    handlerRef.current = handleCloseRef.current({
                        ...dataRef.current.floatingContext,
                        tree,
                        x: event.clientX,
                        y: event.clientY,
                        onClose () {
                            clearPointerEvents();
                            cleanupMouseMoveHandler();
                            if (!isClickLikeOpenEvent()) {
                                closeWithDelay(event, true);
                            }
                        }
                    });
                    const handler = handlerRef.current;
                    doc.addEventListener('mousemove', handler);
                    unbindMouseMoveRef.current = ({
                        "useHover.useEffect.onReferenceMouseLeave": ()=>{
                            doc.removeEventListener('mousemove', handler);
                        }
                    })["useHover.useEffect.onReferenceMouseLeave"];
                    return;
                }
                // Allow interactivity without `safePolygon` on touch devices. With a
                // pointer, a short close delay is an alternative, so it should work
                // consistently.
                const shouldClose = pointerTypeRef.current === 'touch' ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingElement, event.relatedTarget) : true;
                if (shouldClose) {
                    closeWithDelay(event);
                }
            }
            // Ensure the floating element closes after scrolling even if the pointer
            // did not move.
            // https://github.com/floating-ui/floating-ui/discussions/1692
            function onScrollMouseLeave(event) {
                if (isClickLikeOpenEvent() || !dataRef.current.floatingContext || !store.select('open')) {
                    return;
                }
                const triggers = store.context.triggerElements;
                if (event.relatedTarget && triggers.hasElement(event.relatedTarget)) {
                    // If the mouse is leaving the reference element to another trigger, don't explicitly close the popup
                    // as it will be moved.
                    return;
                }
                handleCloseRef.current?.({
                    ...dataRef.current.floatingContext,
                    tree,
                    x: event.clientX,
                    y: event.clientY,
                    onClose () {
                        clearPointerEvents();
                        cleanupMouseMoveHandler();
                        if (!isClickLikeOpenEvent()) {
                            closeWithDelay(event);
                        }
                    }
                })(event);
            }
            function onFloatingMouseEnter() {
                timeout.clear();
                clearPointerEvents();
            }
            function onFloatingMouseLeave(event) {
                if (!isClickLikeOpenEvent()) {
                    closeWithDelay(event, false);
                }
            }
            const trigger = triggerElement ?? domReferenceElement;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(trigger)) {
                const floating = floatingElement;
                if (open) {
                    trigger.addEventListener('mouseleave', onScrollMouseLeave);
                }
                if (move) {
                    trigger.addEventListener('mousemove', onReferenceMouseEnter, {
                        once: true
                    });
                }
                trigger.addEventListener('mouseenter', onReferenceMouseEnter);
                trigger.addEventListener('mouseleave', onReferenceMouseLeave);
                if (floating) {
                    floating.addEventListener('mouseleave', onScrollMouseLeave);
                    floating.addEventListener('mouseenter', onFloatingMouseEnter);
                    floating.addEventListener('mouseleave', onFloatingMouseLeave);
                    floating.addEventListener('pointerdown', handleInteractInside, true);
                }
                return ({
                    "useHover.useEffect": ()=>{
                        if (open) {
                            trigger.removeEventListener('mouseleave', onScrollMouseLeave);
                        }
                        if (move) {
                            trigger.removeEventListener('mousemove', onReferenceMouseEnter);
                        }
                        trigger.removeEventListener('mouseenter', onReferenceMouseEnter);
                        trigger.removeEventListener('mouseleave', onReferenceMouseLeave);
                        if (floating) {
                            floating.removeEventListener('mouseleave', onScrollMouseLeave);
                            floating.removeEventListener('mouseenter', onFloatingMouseEnter);
                            floating.removeEventListener('mouseleave', onFloatingMouseLeave);
                            floating.removeEventListener('pointerdown', handleInteractInside, true);
                        }
                    }
                })["useHover.useEffect"];
            }
            return undefined;
        }
    }["useHover.useEffect"], [
        enabled,
        mouseOnly,
        move,
        domReferenceElement,
        floatingElement,
        triggerElement,
        store,
        closeWithDelay,
        cleanupMouseMoveHandler,
        clearPointerEvents,
        open,
        tree,
        delayRef,
        handleCloseRef,
        dataRef,
        isClickLikeOpenEvent,
        restMsRef,
        timeout,
        restTimeout,
        handleInteractInside
    ]);
    // Block pointer-events of every element other than the reference and floating
    // while the floating element is open and has a `handleClose` handler. Also
    // handles nested floating elements.
    // https://github.com/floating-ui/floating-ui/issues/1722
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useHover.useIsoLayoutEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            // eslint-disable-next-line no-underscore-dangle
            if (open && handleCloseRef.current?.__options?.blockPointerEvents && isHoverOpen()) {
                performedPointerEventsMutationRef.current = true;
                const floatingEl = floatingElement;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(domReferenceElement) && floatingEl) {
                    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingElement).body;
                    body.setAttribute(safePolygonIdentifier, '');
                    const ref = domReferenceElement;
                    const parentFloating = tree?.nodesRef.current.find({
                        "useHover.useIsoLayoutEffect": (node)=>node.id === parentId
                    }["useHover.useIsoLayoutEffect"])?.context?.elements.floating;
                    if (parentFloating) {
                        parentFloating.style.pointerEvents = '';
                    }
                    body.style.pointerEvents = 'none';
                    ref.style.pointerEvents = 'auto';
                    floatingEl.style.pointerEvents = 'auto';
                    return ({
                        "useHover.useIsoLayoutEffect": ()=>{
                            body.style.pointerEvents = '';
                            ref.style.pointerEvents = '';
                            floatingEl.style.pointerEvents = '';
                        }
                    })["useHover.useIsoLayoutEffect"];
                }
            }
            return undefined;
        }
    }["useHover.useIsoLayoutEffect"], [
        enabled,
        open,
        parentId,
        tree,
        handleCloseRef,
        isHoverOpen,
        domReferenceElement,
        floatingElement
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useHover.useIsoLayoutEffect": ()=>{
            if (!open) {
                pointerTypeRef.current = undefined;
                restTimeoutPendingRef.current = false;
                interactedInsideRef.current = false;
                cleanupMouseMoveHandler();
                clearPointerEvents();
            }
        }
    }["useHover.useIsoLayoutEffect"], [
        open,
        cleanupMouseMoveHandler,
        clearPointerEvents
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHover.useEffect": ()=>{
            return ({
                "useHover.useEffect": ()=>{
                    cleanupMouseMoveHandler();
                    timeout.clear();
                    restTimeout.clear();
                    interactedInsideRef.current = false;
                }
            })["useHover.useEffect"];
        }
    }["useHover.useEffect"], [
        enabled,
        domReferenceElement,
        cleanupMouseMoveHandler,
        timeout,
        restTimeout
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHover.useEffect": ()=>{
            return clearPointerEvents;
        }
    }["useHover.useEffect"], [
        clearPointerEvents
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useHover.useMemo[reference]": ()=>{
            function setPointerRef(event) {
                pointerTypeRef.current = event.pointerType;
            }
            return {
                onPointerDown: setPointerRef,
                onPointerEnter: setPointerRef,
                onMouseMove (event) {
                    const { nativeEvent } = event;
                    const trigger = event.currentTarget;
                    // `true` when there are multiple triggers per floating element and user hovers over the one that
                    // wasn't used to open the floating element.
                    const isOverInactiveTrigger = store.select('domReferenceElement') && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(store.select('domReferenceElement'), event.target);
                    function handleMouseMove() {
                        if (!blockMouseMoveRef.current && (!store.select('open') || isOverInactiveTrigger)) {
                            store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, nativeEvent, trigger));
                        }
                    }
                    if (mouseOnly && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerTypeRef.current)) {
                        return;
                    }
                    if (store.select('open') && !isOverInactiveTrigger || getRestMs(restMsRef.current) === 0) {
                        return;
                    }
                    // Ignore insignificant movements to account for tremors.
                    if (!isOverInactiveTrigger && restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
                        return;
                    }
                    restTimeout.clear();
                    if (pointerTypeRef.current === 'touch') {
                        handleMouseMove();
                    } else if (isOverInactiveTrigger) {
                        handleMouseMove();
                    } else {
                        restTimeoutPendingRef.current = true;
                        restTimeout.start(getRestMs(restMsRef.current), handleMouseMove);
                    }
                }
            };
        }
    }["useHover.useMemo[reference]"], [
        mouseOnly,
        store,
        restMsRef,
        restTimeout
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useHover.useMemo": ()=>enabled ? {
                reference
            } : {}
    }["useHover.useMemo"], [
        enabled,
        reference
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverReferenceInteraction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHoverReferenceInteraction",
    ()=>useHoverReferenceInteraction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js [app-client] (ecmascript)");
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
function getRestMs(value) {
    if (typeof value === 'function') {
        return value();
    }
    return value;
}
const EMPTY_REF = {
    current: null
};
function useHoverReferenceInteraction(context, props = {}) {
    const store = 'rootStore' in context ? context.rootStore : context;
    const { dataRef, events } = store.context;
    const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true, triggerElementRef = EMPTY_REF, externalTree, isActiveTrigger = true } = props;
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    const { pointerTypeRef, interactedInsideRef, handlerRef: closeHandlerRef, blockMouseMoveRef, performedPointerEventsMutationRef, unbindMouseMoveRef, restTimeoutPendingRef, openChangeTimeout, restTimeout, handleCloseOptionsRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHoverInteractionSharedState"])(store);
    const handleCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(handleClose);
    const delayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(delay);
    const restMsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(restMs);
    if (isActiveTrigger) {
        // eslint-disable-next-line no-underscore-dangle
        handleCloseOptionsRef.current = handleCloseRef.current?.__options;
    }
    const isClickLikeOpenEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverReferenceInteraction.useStableCallback[isClickLikeOpenEvent]": ()=>{
            if (interactedInsideRef.current) {
                return true;
            }
            return dataRef.current.openEvent ? [
                'click',
                'mousedown'
            ].includes(dataRef.current.openEvent.type) : false;
        }
    }["useHoverReferenceInteraction.useStableCallback[isClickLikeOpenEvent]"]);
    const closeWithDelay = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useHoverReferenceInteraction.useCallback[closeWithDelay]": (event, runElseBranch = true)=>{
            const closeDelay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDelay"])(delayRef.current, 'close', pointerTypeRef.current);
            if (closeDelay && !closeHandlerRef.current) {
                openChangeTimeout.start(closeDelay, {
                    "useHoverReferenceInteraction.useCallback[closeWithDelay]": ()=>store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event))
                }["useHoverReferenceInteraction.useCallback[closeWithDelay]"]);
            } else if (runElseBranch) {
                openChangeTimeout.clear();
                store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event));
            }
        }
    }["useHoverReferenceInteraction.useCallback[closeWithDelay]"], [
        delayRef,
        closeHandlerRef,
        store,
        pointerTypeRef,
        openChangeTimeout
    ]);
    const cleanupMouseMoveHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverReferenceInteraction.useStableCallback[cleanupMouseMoveHandler]": ()=>{
            unbindMouseMoveRef.current();
            closeHandlerRef.current = undefined;
        }
    }["useHoverReferenceInteraction.useStableCallback[cleanupMouseMoveHandler]"]);
    const clearPointerEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverReferenceInteraction.useStableCallback[clearPointerEvents]": ()=>{
            if (performedPointerEventsMutationRef.current) {
                const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(store.select('domReferenceElement')).body;
                body.style.pointerEvents = '';
                body.removeAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHoverInteractionSharedState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safePolygonIdentifier"]);
                performedPointerEventsMutationRef.current = false;
            }
        }
    }["useHoverReferenceInteraction.useStableCallback[clearPointerEvents]"]);
    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHoverReferenceInteraction.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            function onOpenChangeLocal(details) {
                if (!details.open) {
                    openChangeTimeout.clear();
                    restTimeout.clear();
                    blockMouseMoveRef.current = true;
                    restTimeoutPendingRef.current = false;
                }
            }
            events.on('openchange', onOpenChangeLocal);
            return ({
                "useHoverReferenceInteraction.useEffect": ()=>{
                    events.off('openchange', onOpenChangeLocal);
                }
            })["useHoverReferenceInteraction.useEffect"];
        }
    }["useHoverReferenceInteraction.useEffect"], [
        enabled,
        events,
        openChangeTimeout,
        restTimeout,
        blockMouseMoveRef,
        restTimeoutPendingRef
    ]);
    const handleScrollMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useHoverReferenceInteraction.useStableCallback[handleScrollMouseLeave]": (event)=>{
            if (isClickLikeOpenEvent()) {
                return;
            }
            if (!dataRef.current.floatingContext) {
                return;
            }
            const triggerElements = store.context.triggerElements;
            if (event.relatedTarget && triggerElements.hasElement(event.relatedTarget)) {
                return;
            }
            const currentTrigger = triggerElementRef.current;
            handleCloseRef.current?.({
                ...dataRef.current.floatingContext,
                tree,
                x: event.clientX,
                y: event.clientY,
                onClose () {
                    clearPointerEvents();
                    cleanupMouseMoveHandler();
                    if (!isClickLikeOpenEvent() && currentTrigger === store.select('domReferenceElement')) {
                        closeWithDelay(event);
                    }
                }
            })(event);
        }
    }["useHoverReferenceInteraction.useStableCallback[handleScrollMouseLeave]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHoverReferenceInteraction.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            const trigger = triggerElementRef.current ?? (isActiveTrigger ? store.select('domReferenceElement') : null);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(trigger)) {
                return undefined;
            }
            function onMouseEnter(event) {
                openChangeTimeout.clear();
                blockMouseMoveRef.current = false;
                if (mouseOnly && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerTypeRef.current)) {
                    return;
                }
                // Only rest delay is set; there's no fallback delay.
                // This will be handled by `onMouseMove`.
                if (getRestMs(restMsRef.current) > 0 && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDelay"])(delayRef.current, 'open')) {
                    return;
                }
                const openDelay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDelay"])(delayRef.current, 'open', pointerTypeRef.current);
                const currentDomReference = store.select('domReferenceElement');
                const allTriggers = store.context.triggerElements;
                const isOverInactiveTrigger = (allTriggers.hasElement(event.target) || allTriggers.hasMatchingElement({
                    "useHoverReferenceInteraction.useEffect.onMouseEnter": (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(t, event.target)
                }["useHoverReferenceInteraction.useEffect.onMouseEnter"])) && (!currentDomReference || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(currentDomReference, event.target));
                const triggerNode = event.currentTarget ?? null;
                const isOpen = store.select('open');
                const shouldOpen = !isOpen || isOverInactiveTrigger;
                // When moving between triggers while already open, open immediately without delay
                if (isOverInactiveTrigger && isOpen) {
                    store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event, triggerNode));
                } else if (openDelay) {
                    openChangeTimeout.start(openDelay, {
                        "useHoverReferenceInteraction.useEffect.onMouseEnter": ()=>{
                            if (shouldOpen) {
                                store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event, triggerNode));
                            }
                        }
                    }["useHoverReferenceInteraction.useEffect.onMouseEnter"]);
                } else if (shouldOpen) {
                    store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, event, triggerNode));
                }
            }
            function onMouseLeave(event) {
                if (isClickLikeOpenEvent()) {
                    clearPointerEvents();
                    return;
                }
                unbindMouseMoveRef.current();
                const domReferenceElement = store.select('domReferenceElement');
                const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(domReferenceElement);
                restTimeout.clear();
                restTimeoutPendingRef.current = false;
                const triggerElements = store.context.triggerElements;
                if (event.relatedTarget && triggerElements.hasElement(event.relatedTarget)) {
                    return;
                }
                if (handleCloseRef.current && dataRef.current.floatingContext) {
                    if (!store.select('open')) {
                        openChangeTimeout.clear();
                    }
                    const currentTrigger = triggerElementRef.current;
                    closeHandlerRef.current = handleCloseRef.current({
                        ...dataRef.current.floatingContext,
                        tree,
                        x: event.clientX,
                        y: event.clientY,
                        onClose () {
                            clearPointerEvents();
                            cleanupMouseMoveHandler();
                            if (!isClickLikeOpenEvent() && currentTrigger === store.select('domReferenceElement')) {
                                closeWithDelay(event, true);
                            }
                        }
                    });
                    const handler = closeHandlerRef.current;
                    handler(event);
                    doc.addEventListener('mousemove', handler);
                    unbindMouseMoveRef.current = ({
                        "useHoverReferenceInteraction.useEffect.onMouseLeave": ()=>{
                            doc.removeEventListener('mousemove', handler);
                        }
                    })["useHoverReferenceInteraction.useEffect.onMouseLeave"];
                    return;
                }
                const shouldClose = pointerTypeRef.current === 'touch' ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(store.select('floatingElement'), event.relatedTarget) : true;
                if (shouldClose) {
                    closeWithDelay(event);
                }
            }
            function onScrollMouseLeave(event) {
                handleScrollMouseLeave(event);
            }
            if (store.select('open')) {
                trigger.addEventListener('mouseleave', onScrollMouseLeave);
            }
            if (move) {
                trigger.addEventListener('mousemove', onMouseEnter, {
                    once: true
                });
            }
            trigger.addEventListener('mouseenter', onMouseEnter);
            trigger.addEventListener('mouseleave', onMouseLeave);
            return ({
                "useHoverReferenceInteraction.useEffect": ()=>{
                    trigger.removeEventListener('mouseleave', onScrollMouseLeave);
                    if (move) {
                        trigger.removeEventListener('mousemove', onMouseEnter);
                    }
                    trigger.removeEventListener('mouseenter', onMouseEnter);
                    trigger.removeEventListener('mouseleave', onMouseLeave);
                }
            })["useHoverReferenceInteraction.useEffect"];
        }
    }["useHoverReferenceInteraction.useEffect"], [
        cleanupMouseMoveHandler,
        clearPointerEvents,
        blockMouseMoveRef,
        dataRef,
        delayRef,
        closeWithDelay,
        store,
        enabled,
        handleCloseRef,
        handleScrollMouseLeave,
        isActiveTrigger,
        isClickLikeOpenEvent,
        mouseOnly,
        move,
        pointerTypeRef,
        restMsRef,
        restTimeout,
        restTimeoutPendingRef,
        openChangeTimeout,
        triggerElementRef,
        tree,
        unbindMouseMoveRef,
        closeHandlerRef
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useHoverReferenceInteraction.useMemo": ()=>{
            function setPointerRef(event) {
                pointerTypeRef.current = event.pointerType;
            }
            return {
                onPointerDown: setPointerRef,
                onPointerEnter: setPointerRef,
                onMouseMove (event) {
                    const { nativeEvent } = event;
                    const trigger = event.currentTarget;
                    const currentDomReference = store.select('domReferenceElement');
                    const allTriggers = store.context.triggerElements;
                    const currentOpen = store.select('open');
                    const isOverInactiveTrigger = (allTriggers.hasElement(event.target) || allTriggers.hasMatchingElement({
                        "useHoverReferenceInteraction.useMemo": (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(t, event.target)
                    }["useHoverReferenceInteraction.useMemo"])) && (!currentDomReference || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(currentDomReference, event.target));
                    if (mouseOnly && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerTypeRef.current)) {
                        return;
                    }
                    if (currentOpen && !isOverInactiveTrigger || getRestMs(restMsRef.current) === 0) {
                        return;
                    }
                    if (!isOverInactiveTrigger && restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
                        return;
                    }
                    restTimeout.clear();
                    function handleMouseMove() {
                        restTimeoutPendingRef.current = false;
                        // A delayed hover open should not override a click-like open that happened
                        // while the hover delay was pending.
                        if (isClickLikeOpenEvent()) {
                            return;
                        }
                        const latestOpen = store.select('open');
                        if (!blockMouseMoveRef.current && (!latestOpen || isOverInactiveTrigger)) {
                            store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover, nativeEvent, trigger));
                        }
                    }
                    if (pointerTypeRef.current === 'touch') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"]({
                            "useHoverReferenceInteraction.useMemo": ()=>{
                                handleMouseMove();
                            }
                        }["useHoverReferenceInteraction.useMemo"]);
                    } else if (isOverInactiveTrigger && currentOpen) {
                        handleMouseMove();
                    } else {
                        restTimeoutPendingRef.current = true;
                        restTimeout.start(getRestMs(restMsRef.current), handleMouseMove);
                    }
                }
            };
        }
    }["useHoverReferenceInteraction.useMemo"], [
        blockMouseMoveRef,
        isClickLikeOpenEvent,
        mouseOnly,
        store,
        pointerTypeRef,
        restMsRef,
        restTimeout,
        restTimeoutPendingRef
    ]);
}
}),
]);

//# sourceMappingURL=cc419_%40base-ui_react_esm_floating-ui-react_1b605023._.js.map