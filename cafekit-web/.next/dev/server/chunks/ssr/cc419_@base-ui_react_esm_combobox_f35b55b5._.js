module.exports = [
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxDerivedItemsContext",
    ()=>ComboboxDerivedItemsContext,
    "ComboboxFloatingContext",
    ()=>ComboboxFloatingContext,
    "ComboboxInputValueContext",
    ()=>ComboboxInputValueContext,
    "ComboboxRootContext",
    ()=>ComboboxRootContext,
    "useComboboxDerivedItemsContext",
    ()=>useComboboxDerivedItemsContext,
    "useComboboxFloatingContext",
    ()=>useComboboxFloatingContext,
    "useComboboxInputValueContext",
    ()=>useComboboxInputValueContext,
    "useComboboxRootContext",
    ()=>useComboboxRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ComboboxRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxRootContext.displayName = "ComboboxRootContext";
const ComboboxFloatingContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxFloatingContext.displayName = "ComboboxFloatingContext";
const ComboboxDerivedItemsContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
// `inputValue` can't be placed in the store.
// https://github.com/mui/base-ui/issues/2703
if ("TURBOPACK compile-time truthy", 1) ComboboxDerivedItemsContext.displayName = "ComboboxDerivedItemsContext";
const ComboboxInputValueContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]('');
if ("TURBOPACK compile-time truthy", 1) ComboboxInputValueContext.displayName = "ComboboxInputValueContext";
function useComboboxRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxRootContext);
    if (!context) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ComboboxRootContext is missing. Combobox parts must be placed within <Combobox.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
function useComboboxFloatingContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxFloatingContext);
    if (!context) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ComboboxFloatingContext is missing. Combobox parts must be placed within <Combobox.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
function useComboboxDerivedItemsContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxDerivedItemsContext);
    if (!context) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ComboboxItemsContext is missing. Combobox parts must be placed within <Combobox.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
function useComboboxInputValueContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxInputValueContext);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "selectors",
    ()=>selectors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/createSelector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/itemEquality.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveValueLabel.js [app-ssr] (ecmascript)");
;
;
;
const selectors = {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.id),
    query: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.query),
    items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.items),
    selectedValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.selectedValue),
    hasSelectionChips: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>{
        const selectedValue = state.selectedValue;
        return Array.isArray(selectedValue) && selectedValue.length > 0;
    }),
    hasSelectedValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>{
        const { selectedValue, selectionMode } = state;
        if (selectedValue == null) {
            return false;
        }
        if (selectionMode === 'multiple' && Array.isArray(selectedValue)) {
            return selectedValue.length > 0;
        }
        return true;
    }),
    hasNullItemLabel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state, enabled)=>{
        return enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasNullItemLabel"])(state.items) : false;
    }),
    open: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.open),
    mounted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.mounted),
    forceMounted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.forceMounted),
    inline: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.inline),
    activeIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.activeIndex),
    selectedIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.selectedIndex),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state, index)=>state.activeIndex === index),
    isSelected: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state, candidate)=>{
        const comparer = state.isItemEqualToValue;
        const selectedValue = state.selectedValue;
        if (Array.isArray(selectedValue)) {
            return selectedValue.some((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareItemEquality"])(value, candidate, comparer));
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareItemEquality"])(selectedValue, candidate, comparer);
    }),
    transitionStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.transitionStatus),
    popupProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupProps),
    inputProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.inputProps),
    triggerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.triggerProps),
    getItemProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.getItemProps),
    positionerElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.positionerElement),
    listElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.listElement),
    triggerElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.triggerElement),
    inputElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.inputElement),
    popupSide: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupSide),
    openMethod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.openMethod),
    inputInsidePopup: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.inputInsidePopup),
    selectionMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.selectionMode),
    listRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.listRef),
    labelsRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.labelsRef),
    popupRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupRef),
    emptyRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.emptyRef),
    inputRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.inputRef),
    keyboardActiveRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.keyboardActiveRef),
    chipsContainerRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.chipsContainerRef),
    clearRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.clearRef),
    valuesRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.valuesRef),
    allValuesRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.allValuesRef),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.name),
    disabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.disabled),
    readOnly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.readOnly),
    required: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.required),
    grid: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.grid),
    isGrouped: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.isGrouped),
    virtualized: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualized),
    onOpenChangeComplete: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.onOpenChangeComplete),
    openOnInputClick: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.openOnInputClick),
    itemToStringLabel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.itemToStringLabel),
    isItemEqualToValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.isItemEqualToValue),
    modal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.modal),
    autoHighlight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.autoHighlight),
    submitOnItemClick: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.submitOnItemClick)
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCollatorItemFilter",
    ()=>createCollatorItemFilter,
    "createSingleSelectionCollatorFilter",
    ()=>createSingleSelectionCollatorFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveValueLabel.js [app-ssr] (ecmascript)");
;
function createCollatorItemFilter(collatorFilter, itemToStringLabel) {
    return (item, query)=>{
        if (item == null) {
            return false;
        }
        const itemString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, itemToStringLabel);
        return collatorFilter.contains(itemString, query);
    };
}
function createSingleSelectionCollatorFilter(collatorFilter, itemToStringLabel, selectedValue) {
    return (item, query)=>{
        if (item == null) {
            return false;
        }
        if (!query) {
            return true;
        }
        const itemString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, itemToStringLabel);
        const selectedString = selectedValue != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(selectedValue, itemToStringLabel) : '';
        // Handle case-insensitive matching consistently
        if (selectedString && collatorFilter.contains(selectedString, query) && selectedString.length === query.length) {
            return true;
        }
        return collatorFilter.contains(itemString, query);
    };
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/useFilter.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useComboboxFilter",
    ()=>useComboboxFilter,
    "useCoreFilter",
    ()=>useCoreFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveValueLabel.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const filterCache = new Map();
function stringifyLocale(locale) {
    if (Array.isArray(locale)) {
        return locale.map((value)=>stringifyLocale(value)).join(',');
    }
    if (locale == null) {
        return '';
    }
    return String(locale);
}
function getFilter(options = {}) {
    const mergedOptions = {
        usage: 'search',
        sensitivity: 'base',
        ignorePunctuation: true,
        ...options
    };
    const cacheKey = `${stringifyLocale(options.locale)}|${JSON.stringify(mergedOptions)}`;
    const cachedFilter = filterCache.get(cacheKey);
    if (cachedFilter) {
        return cachedFilter;
    }
    const collator = new Intl.Collator(options.locale, mergedOptions);
    const filter = {
        contains (item, query, itemToString) {
            if (!query) {
                return true;
            }
            const itemString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, itemToString);
            for(let i = 0; i <= itemString.length - query.length; i += 1){
                if (collator.compare(itemString.slice(i, i + query.length), query) === 0) {
                    return true;
                }
            }
            return false;
        },
        startsWith (item, query, itemToString) {
            if (!query) {
                return true;
            }
            const itemString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, itemToString);
            return collator.compare(itemString.slice(0, query.length), query) === 0;
        },
        endsWith (item, query, itemToString) {
            if (!query) {
                return true;
            }
            const itemString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, itemToString);
            const queryLength = query.length;
            return itemString.length >= queryLength && collator.compare(itemString.slice(itemString.length - queryLength), query) === 0;
        }
    };
    filterCache.set(cacheKey, filter);
    return filter;
}
const useCoreFilter = getFilter;
function useComboboxFilter(options = {}) {
    const { multiple = false, value, ...collatorOptions } = options;
    const coreFilter = getFilter(collatorOptions);
    const contains = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((item, query, itemToString)=>{
        if (multiple) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCollatorItemFilter"])(coreFilter, itemToString)(item, query);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSingleSelectionCollatorFilter"])(coreFilter, itemToString, value)(item, query);
    }, [
        coreFilter,
        value,
        multiple
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            contains,
            startsWith: coreFilter.startsWith,
            endsWith: coreFilter.endsWith
        }), [
        contains,
        coreFilter
    ]);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_LAST_HIGHLIGHT",
    ()=>INITIAL_LAST_HIGHLIGHT,
    "NO_ACTIVE_VALUE",
    ()=>NO_ACTIVE_VALUE
]);
const NO_ACTIVE_VALUE = Symbol('none');
const INITIAL_LAST_HIGHLIGHT = {
    value: NO_ACTIVE_VALUE,
    index: -1
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/AriaCombobox.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AriaCombobox",
    ()=>AriaCombobox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useOnFirstRender$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useOnFirstRender.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/visuallyHidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useRefWithInit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$Store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/Store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useDismiss.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useInteractions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useListNavigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useListNavigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useClick.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-ssr] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$useField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/useField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/form/FormContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$useLabelableId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/useLabelableId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$useFilter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/useFilter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenInteractionType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenInteractionType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useValueChanged.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/resolveValueLabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/itemEquality.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/utils/constants.js [app-ssr] (ecmascript)");
/**
 * @internal
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
function AriaCombobox(props) {
    const { id: idProp, onOpenChangeComplete: onOpenChangeCompleteProp, defaultSelectedValue = null, selectedValue: selectedValueProp, onSelectedValueChange, defaultInputValue: defaultInputValueProp, inputValue: inputValueProp, selectionMode = 'none', onItemHighlighted: onItemHighlightedProp, name: nameProp, disabled: disabledProp = false, readOnly = false, required = false, inputRef: inputRefProp, grid = false, items, filteredItems: filteredItemsProp, filter: filterProp, openOnInputClick = true, autoHighlight = false, keepHighlight = false, highlightItemOnHover = true, loopFocus = true, itemToStringLabel, itemToStringValue, isItemEqualToValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultItemEquality"], virtualized = false, inline: inlineProp = false, fillInputOnItemPress = true, modal = false, limit = -1, autoComplete = 'list', locale, submitOnItemClick = false } = props;
    const { clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { setDirty, validityData, shouldValidateOnChange, setFilled, name: fieldName, disabled: fieldDisabled, setTouched, setFocused, validationMode, validation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$useLabelableId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabelableId"])({
        id: idProp
    });
    const collatorFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$useFilter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCoreFilter"])({
        locale
    });
    const [queryChangedAfterOpen, setQueryChangedAfterOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [closeQuery, setCloseQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const listRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const labelsRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const popupRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const emptyRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const keyboardActiveRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](true);
    const hadInputClearRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const chipsContainerRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const clearRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const selectionEventRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const lastHighlightRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"]);
    const pendingQueryHighlightRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    /**
   * Contains the currently visible list of item values post-filtering.
   */ const valuesRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    /**
   * Contains all item values in a stable, unfiltered order.
   * This is only used when `items` prop is not provided.
   * It accumulates values on first mount and does not remove them on unmount due to
   * filtering, providing a stable index for selected value tracking.
   */ const allValuesRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const multiple = selectionMode === 'multiple';
    const single = selectionMode === 'single';
    const hasInputValue = inputValueProp !== undefined || defaultInputValueProp !== undefined;
    const hasItems = items !== undefined;
    const hasFilteredItemsProp = filteredItemsProp !== undefined;
    let autoHighlightMode;
    if (autoHighlight === 'always') {
        autoHighlightMode = 'always';
    } else {
        autoHighlightMode = autoHighlight ? 'input-change' : false;
    }
    const [selectedValue, setSelectedValueUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: selectedValueProp,
        default: multiple ? defaultSelectedValue ?? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"] : defaultSelectedValue,
        name: 'Combobox',
        state: 'selectedValue'
    });
    const filter = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (filterProp === null) {
            return ()=>true;
        }
        if (filterProp !== undefined) {
            return filterProp;
        }
        if (single && !queryChangedAfterOpen) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSingleSelectionCollatorFilter"])(collatorFilter, itemToStringLabel, selectedValue);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCollatorItemFilter"])(collatorFilter, itemToStringLabel);
    }, [
        filterProp,
        single,
        selectedValue,
        queryChangedAfterOpen,
        collatorFilter,
        itemToStringLabel
    ]);
    // If neither inputValue nor defaultInputValue are provided, derive it from the
    // selected value for single mode so the input reflects the selection on mount.
    const initialDefaultInputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefWithInit"])(()=>{
        if (hasInputValue) {
            return defaultInputValueProp ?? '';
        }
        if (single) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(selectedValue, itemToStringLabel);
        }
        return '';
    }).current;
    const [inputValue, setInputValueUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: inputValueProp,
        default: initialDefaultInputValue,
        name: 'Combobox',
        state: 'inputValue'
    });
    const [open, setOpenUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: props.open,
        default: props.defaultOpen,
        name: 'Combobox',
        state: 'open'
    });
    const isGrouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isGroupedItems"])(items);
    const query = closeQuery ?? (inputValue === '' ? '' : String(inputValue).trim());
    const selectedLabelString = single ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(selectedValue, itemToStringLabel) : '';
    const shouldBypassFiltering = single && !queryChangedAfterOpen && query !== '' && selectedLabelString !== '' && selectedLabelString.length === query.length && collatorFilter.contains(selectedLabelString, query);
    const filterQuery = shouldBypassFiltering ? '' : query;
    const shouldIgnoreExternalFiltering = hasItems && hasFilteredItemsProp && shouldBypassFiltering;
    const flatItems = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!items) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        }
        if (isGrouped) {
            return items.flatMap((group)=>group.items);
        }
        return items;
    }, [
        items,
        isGrouped
    ]);
    const filteredItems = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (filteredItemsProp && !shouldIgnoreExternalFiltering) {
            return filteredItemsProp;
        }
        if (!items) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        }
        if (isGrouped) {
            const groupedItems = items;
            const resultingGroups = [];
            let currentCount = 0;
            for (const group of groupedItems){
                if (limit > -1 && currentCount >= limit) {
                    break;
                }
                const candidateItems = filterQuery === '' ? group.items : group.items.filter((item)=>filter(item, filterQuery, itemToStringLabel));
                if (candidateItems.length === 0) {
                    continue;
                }
                const remainingLimit = limit > -1 ? limit - currentCount : Infinity;
                const itemsToTake = candidateItems.slice(0, remainingLimit);
                if (itemsToTake.length > 0) {
                    const newGroup = {
                        ...group,
                        items: itemsToTake
                    };
                    resultingGroups.push(newGroup);
                    currentCount += itemsToTake.length;
                }
            }
            return resultingGroups;
        }
        if (filterQuery === '') {
            return limit > -1 ? flatItems.slice(0, limit) : // The cast here is done as `flatItems` is readonly.
            // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
            // reference this exact readonly value, creating a mutation risk.
            // However, <Combobox.Item> can never mutate this value as the mutating effect
            // bails early when `items` is provided, and this is only ever returned
            // when `items` is provided due to the early return at the top of this hook.
            flatItems;
        }
        const limitedItems = [];
        for (const item of flatItems){
            if (limit > -1 && limitedItems.length >= limit) {
                break;
            }
            if (filter(item, filterQuery, itemToStringLabel)) {
                limitedItems.push(item);
            }
        }
        return limitedItems;
    }, [
        filteredItemsProp,
        shouldIgnoreExternalFiltering,
        items,
        isGrouped,
        filterQuery,
        limit,
        filter,
        itemToStringLabel,
        flatItems
    ]);
    const flatFilteredItems = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (isGrouped) {
            const groups = filteredItems;
            return groups.flatMap((g)=>g.items);
        }
        return filteredItems;
    }, [
        filteredItems,
        isGrouped
    ]);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefWithInit"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$Store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Store"]({
            id,
            selectedValue,
            open,
            filter,
            query,
            items,
            selectionMode,
            listRef,
            labelsRef,
            popupRef,
            emptyRef,
            inputRef,
            keyboardActiveRef,
            chipsContainerRef,
            clearRef,
            valuesRef,
            allValuesRef,
            selectionEventRef,
            name,
            disabled,
            readOnly,
            required,
            grid,
            isGrouped,
            virtualized,
            openOnInputClick,
            itemToStringLabel,
            isItemEqualToValue,
            modal,
            autoHighlight: autoHighlightMode,
            submitOnItemClick,
            hasInputValue,
            mounted: false,
            forceMounted: false,
            transitionStatus: 'idle',
            inline: inlineProp,
            activeIndex: null,
            selectedIndex: null,
            popupProps: {},
            inputProps: {},
            triggerProps: {},
            positionerElement: null,
            listElement: null,
            triggerElement: null,
            inputElement: null,
            popupSide: null,
            openMethod: null,
            inputInsidePopup: true,
            onOpenChangeComplete: onOpenChangeCompleteProp || __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            // Placeholder callbacks replaced on first render
            setOpen: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            setInputValue: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            setSelectedValue: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            setIndices: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            onItemHighlighted: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            handleSelection: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            getItemProps: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
            forceMount: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
            requestSubmit: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"]
        })).current;
    const fieldRawValue = selectionMode === 'none' ? inputValue : selectedValue;
    const fieldStringValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (selectionMode === 'none') {
            return fieldRawValue;
        }
        if (Array.isArray(selectedValue)) {
            return selectedValue.map((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsValue"])(value, itemToStringValue));
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsValue"])(selectedValue, itemToStringValue);
    }, [
        fieldRawValue,
        itemToStringValue,
        selectionMode,
        selectedValue
    ]);
    const onItemHighlighted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(onItemHighlightedProp);
    const onOpenChangeComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(onOpenChangeCompleteProp);
    const activeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].activeIndex);
    const selectedIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectedIndex);
    const positionerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].positionerElement);
    const listElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].listElement);
    const triggerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].triggerElement);
    const inputElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputElement);
    const inline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inline);
    const inputInsidePopup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputInsidePopup);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueAsRef"])(triggerElement);
    const { mounted, setMounted, transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(open);
    const { openMethod, triggerProps, reset: resetOpenInteractionType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenInteractionType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenInteractionType"])(open);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$useField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])({
        id,
        name,
        commit: validation.commit,
        value: fieldRawValue,
        controlRef: inputInsidePopup ? triggerRef : inputRef,
        getValue: ()=>fieldStringValue
    });
    const forceMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(()=>{
        if (items) {
            // Ensure typeahead works on a closed list.
            labelsRef.current = flatFilteredItems.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(item, itemToStringLabel));
        } else {
            store.set('forceMounted', true);
        }
    });
    const initialSelectedValueRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](selectedValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        // Ensure the values and labels are registered for programmatic value changes.
        if (selectedValue !== initialSelectedValueRef.current) {
            forceMount();
        }
    }, [
        forceMount,
        selectedValue
    ]);
    const setIndices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((options)=>{
        store.update(options);
        const type = options.type || 'none';
        if (options.activeIndex === undefined) {
            return;
        }
        if (options.activeIndex === null) {
            if (lastHighlightRef.current !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"]) {
                lastHighlightRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"];
                onItemHighlighted(undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGenericEventDetails"])(type, undefined, {
                    index: -1
                }));
            }
        } else {
            const activeValue = valuesRef.current[options.activeIndex];
            lastHighlightRef.current = {
                value: activeValue,
                index: options.activeIndex
            };
            onItemHighlighted(activeValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGenericEventDetails"])(type, undefined, {
                index: options.activeIndex
            }));
        }
    });
    const setInputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((next, eventDetails)=>{
        hadInputClearRef.current = eventDetails.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear;
        props.onInputValueChange?.(next, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        // If user is typing, ensure we don't auto-highlight on open due to a race
        // with the post-open effect that sets this flag.
        if (eventDetails.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange) {
            const hasQuery = next.trim() !== '';
            if (hasQuery) {
                setQueryChangedAfterOpen(true);
            }
            // Defer index updates until after the filtered items have been derived to ensure
            // `onItemHighlighted` receives the latest item.
            pendingQueryHighlightRef.current = {
                hasQuery
            };
            if (hasQuery && autoHighlightMode && store.state.activeIndex == null) {
                store.set('activeIndex', 0);
            }
        }
        setInputValueUnwrapped(next);
    });
    const setOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((nextOpen, eventDetails)=>{
        if (open === nextOpen) {
            return;
        }
        // If the `Empty` component is not used, the positioner or popup should be hidden
        // with CSS. In this case, allow the Escape key to bubble to close a parent popup
        // if there are no items to show.
        if (eventDetails.reason === 'escape-key' && hasItems && flatFilteredItems.length === 0 && !store.state.emptyRef.current) {
            eventDetails.allowPropagation();
        }
        props.onOpenChange?.(nextOpen, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        if (!nextOpen && queryChangedAfterOpen) {
            if (single) {
                setCloseQuery(query);
                // Avoid a flicker when closing the popup with an empty query.
                if (query === '') {
                    setQueryChangedAfterOpen(false);
                }
            } else if (multiple) {
                if (inline || inputInsidePopup) {
                    setIndices({
                        activeIndex: null
                    });
                } else {
                    // Freeze the current query so filtering remains stable while exiting.
                    setCloseQuery(query);
                }
                // Clear the input immediately on close while retaining filtering via closeQuery for exit animations
                // if the input is outside the popup.
                setInputValue('', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear, eventDetails.event));
            }
        }
        setOpenUnwrapped(nextOpen);
        if (!nextOpen && inputInsidePopup && (eventDetails.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].focusOut || eventDetails.reason === __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].outsidePress)) {
            setTouched(true);
            setFocused(false);
            if (validationMode === 'onBlur') {
                const valueToValidate = selectionMode === 'none' ? inputValue : selectedValue;
                validation.commit(valueToValidate);
            }
        }
    });
    const setSelectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((nextValue, eventDetails)=>{
        // Cast to `any` due to conditional value type (single vs. multiple).
        // The runtime implementation already ensures the correct value shape.
        onSelectedValueChange?.(nextValue, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        setSelectedValueUnwrapped(nextValue);
        const shouldFillInput = selectionMode === 'none' && popupRef.current && fillInputOnItemPress || single && !store.state.inputInsidePopup;
        if (shouldFillInput) {
            setInputValue((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(nextValue, itemToStringLabel), (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(eventDetails.reason, eventDetails.event));
        }
        if (single && nextValue != null && eventDetails.reason !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange && queryChangedAfterOpen) {
            setCloseQuery(query);
        }
    });
    const handleSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((event, passedValue)=>{
        let value = passedValue;
        if (value === undefined) {
            if (activeIndex === null) {
                return;
            }
            value = valuesRef.current[activeIndex];
        }
        const targetEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
        const overrideEvent = selectionEventRef.current ?? event;
        selectionEventRef.current = null;
        const eventDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].itemPress, overrideEvent);
        // Let the link handle the click.
        const href = targetEl?.closest('a')?.getAttribute('href');
        if (href) {
            if (href.startsWith('#')) {
                setOpen(false, eventDetails);
            }
            return;
        }
        if (multiple) {
            const currentSelectedValue = Array.isArray(selectedValue) ? selectedValue : [];
            const isCurrentlySelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemIncludes"])(currentSelectedValue, value, store.state.isItemEqualToValue);
            const nextValue = isCurrentlySelected ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeItem"])(currentSelectedValue, value, store.state.isItemEqualToValue) : [
                ...currentSelectedValue,
                value
            ];
            setSelectedValue(nextValue, eventDetails);
            const wasFiltering = inputRef.current ? inputRef.current.value.trim() !== '' : false;
            if (!wasFiltering) {
                return;
            }
            if (store.state.inputInsidePopup) {
                setInputValue('', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear, eventDetails.event));
            } else {
                setOpen(false, eventDetails);
            }
        } else {
            setSelectedValue(value, eventDetails);
            setOpen(false, eventDetails);
        }
    });
    const requestSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(()=>{
        if (!store.state.submitOnItemClick) {
            return;
        }
        const form = store.state.inputElement?.form;
        if (form && typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        }
    });
    const handleUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(()=>{
        setMounted(false);
        onOpenChangeComplete?.(false);
        setQueryChangedAfterOpen(false);
        resetOpenInteractionType();
        setCloseQuery(null);
        if (selectionMode === 'none') {
            setIndices({
                activeIndex: null,
                selectedIndex: null
            });
        } else {
            setIndices({
                activeIndex: null
            });
        }
        // Multiple selection mode:
        // If the user typed a filter and didn't select in multiple mode, clear the input
        // after close completes to avoid mid-exit flicker and start fresh on next open.
        if (multiple && inputRef.current && inputRef.current.value !== '' && !hadInputClearRef.current) {
            setInputValue('', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear));
        }
        // Single selection mode:
        // - If input is rendered inside the popup, clear it so the next open is blank
        // - If input is outside the popup, sync it to the selected value
        if (single) {
            if (store.state.inputInsidePopup) {
                if (inputRef.current && inputRef.current.value !== '') {
                    setInputValue('', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear));
                }
            } else {
                const stringVal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(selectedValue, itemToStringLabel);
                if (inputRef.current && inputRef.current.value !== stringVal) {
                    // If no selection was made, treat this as clearing the typed filter.
                    const reason = stringVal === '' ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none;
                    setInputValue(stringVal, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(reason));
                }
            }
        }
    });
    // Support composing the Dialog component around an inline combobox.
    // `[role="dialog"]` is more interoperable than using a context, e.g. it can work
    // with third-party modal libraries, though the limitation is that the closest
    // `role=dialog` part must be the animated element.
    const resolvedPopupRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (inline && positionerElement) {
            return {
                current: positionerElement.closest('[role="dialog"]')
            };
        }
        return popupRef;
    }, [
        inline,
        positionerElement
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        enabled: !props.actionsRef,
        open,
        ref: resolvedPopupRef,
        onComplete () {
            if (!open) {
                handleUnmount();
            }
        }
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"](props.actionsRef, ()=>({
            unmount: handleUnmount
        }), [
        handleUnmount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(function syncSelectedIndex() {
        if (open || selectionMode === 'none') {
            return;
        }
        const registry = items ? flatItems : allValuesRef.current;
        if (multiple) {
            const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
            const lastValue = currentValue[currentValue.length - 1];
            const lastIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findItemIndex"])(registry, lastValue, isItemEqualToValue);
            setIndices({
                selectedIndex: lastIndex === -1 ? null : lastIndex
            });
        } else {
            const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findItemIndex"])(registry, selectedValue, isItemEqualToValue);
            setIndices({
                selectedIndex: index === -1 ? null : index
            });
        }
    }, [
        open,
        selectedValue,
        items,
        selectionMode,
        flatItems,
        multiple,
        isItemEqualToValue,
        setIndices
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (items) {
            valuesRef.current = flatFilteredItems;
            listRef.current.length = flatFilteredItems.length;
        }
    }, [
        items,
        flatFilteredItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        const pendingHighlight = pendingQueryHighlightRef.current;
        if (pendingHighlight) {
            if (pendingHighlight.hasQuery) {
                if (autoHighlightMode) {
                    store.set('activeIndex', 0);
                }
            } else if (autoHighlightMode === 'always') {
                store.set('activeIndex', 0);
            }
            pendingQueryHighlightRef.current = null;
        }
        if (!open && !inline) {
            return;
        }
        const shouldUseFlatFilteredItems = hasItems || hasFilteredItemsProp;
        const candidateItems = shouldUseFlatFilteredItems ? flatFilteredItems : valuesRef.current;
        const storeActiveIndex = store.state.activeIndex;
        if (storeActiveIndex == null) {
            if (autoHighlightMode === 'always' && candidateItems.length > 0) {
                store.set('activeIndex', 0);
                return;
            }
            if (lastHighlightRef.current !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"]) {
                lastHighlightRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"];
                store.state.onItemHighlighted(undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGenericEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, undefined, {
                    index: -1
                }));
            }
            return;
        }
        if (storeActiveIndex >= candidateItems.length) {
            if (lastHighlightRef.current !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"]) {
                lastHighlightRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_LAST_HIGHLIGHT"];
                store.state.onItemHighlighted(undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGenericEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, undefined, {
                    index: -1
                }));
            }
            store.set('activeIndex', null);
            return;
        }
        const nextActiveValue = candidateItems[storeActiveIndex];
        const lastHighlightedValue = lastHighlightRef.current.value;
        const isSameItem = lastHighlightedValue !== __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NO_ACTIVE_VALUE"] && store.state.isItemEqualToValue(nextActiveValue, lastHighlightedValue);
        if (lastHighlightRef.current.index !== storeActiveIndex || !isSameItem) {
            lastHighlightRef.current = {
                value: nextActiveValue,
                index: storeActiveIndex
            };
            store.state.onItemHighlighted(nextActiveValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGenericEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, undefined, {
                index: storeActiveIndex
            }));
        }
    }, [
        activeIndex,
        autoHighlightMode,
        hasFilteredItemsProp,
        hasItems,
        flatFilteredItems,
        inline,
        open,
        store
    ]);
    // When the available items change, ensure the selected value(s) remain valid.
    // - Single: if current selection is removed, fall back to defaultSelectedValue if it exists in the list; else null.
    // - Multiple: drop any removed selections.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!items || selectionMode === 'none') {
            return;
        }
        const registry = flatItems;
        if (multiple) {
            const current = Array.isArray(selectedValue) ? selectedValue : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
            const next = current.filter((v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemIncludes"])(registry, v, store.state.isItemEqualToValue));
            if (next.length !== current.length) {
                setSelectedValue(next, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none));
            }
            return;
        }
        const isStillPresent = selectedValue == null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemIncludes"])(registry, selectedValue, store.state.isItemEqualToValue);
        if (isStillPresent) {
            return;
        }
        let fallback = null;
        if (defaultSelectedValue != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemIncludes"])(registry, defaultSelectedValue, store.state.isItemEqualToValue)) {
            fallback = defaultSelectedValue;
        }
        setSelectedValue(fallback, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none));
    }, [
        items,
        flatItems,
        multiple,
        selectionMode,
        selectedValue,
        defaultSelectedValue,
        store,
        setSelectedValue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (selectionMode === 'none') {
            setFilled(String(inputValue) !== '');
            return;
        }
        setFilled(multiple ? Array.isArray(selectedValue) && selectedValue.length > 0 : selectedValue != null);
    }, [
        setFilled,
        selectionMode,
        inputValue,
        selectedValue,
        multiple
    ]);
    // Ensures that the active index is not set to 0 when the list is empty.
    // This avoids needing to press ArrowDown twice under certain conditions.
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (hasItems && autoHighlightMode && flatFilteredItems.length === 0) {
            setIndices({
                activeIndex: null
            });
        }
    }, [
        hasItems,
        autoHighlightMode,
        flatFilteredItems.length,
        setIndices
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueChanged"])(query, ()=>{
        if (!open || query === '' || query === String(initialDefaultInputValue)) {
            return;
        }
        setQueryChangedAfterOpen(true);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueChanged"])(selectedValue, ()=>{
        if (selectionMode === 'none') {
            return;
        }
        clearErrors(name);
        setDirty(selectedValue !== validityData.initialValue);
        if (shouldValidateOnChange()) {
            validation.commit(selectedValue);
        } else {
            validation.commit(selectedValue, true);
        }
        if (multiple && store.state.selectedIndex !== null && (!Array.isArray(selectedValue) || selectedValue.length === 0)) {
            setIndices({
                activeIndex: null,
                selectedIndex: null
            });
        }
        if (single && !hasInputValue && !inputInsidePopup) {
            const nextInputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(selectedValue, itemToStringLabel);
            if (inputValue !== nextInputValue) {
                setInputValue(nextInputValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none));
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueChanged"])(inputValue, ()=>{
        if (selectionMode !== 'none') {
            return;
        }
        clearErrors(name);
        setDirty(inputValue !== validityData.initialValue);
        if (shouldValidateOnChange()) {
            validation.commit(inputValue);
        } else {
            validation.commit(inputValue, true);
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueChanged"])(items, ()=>{
        if (!single || hasInputValue || inputInsidePopup || queryChangedAfterOpen) {
            return;
        }
        const nextInputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsLabel"])(selectedValue, itemToStringLabel);
        if (inputValue !== nextInputValue) {
            setInputValue(nextInputValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none));
        }
    });
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingRootContext"])({
        open: inline ? true : open,
        onOpenChange: setOpen,
        elements: {
            reference: inputInsidePopup ? triggerElement : inputElement,
            floating: positionerElement
        }
    });
    let ariaHasPopup;
    let ariaExpanded;
    if (!inline) {
        ariaHasPopup = grid ? 'grid' : 'listbox';
        ariaExpanded = open ? 'true' : 'false';
    }
    const role = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const isPlainInput = inputElement?.tagName === 'INPUT';
        const shouldApplyAria = isPlainInput || open;
        const reference = isPlainInput ? {
            autoComplete: 'off',
            spellCheck: 'false',
            autoCorrect: 'off',
            autoCapitalize: 'none'
        } : {};
        if (shouldApplyAria) {
            reference.role = 'combobox';
            reference['aria-expanded'] = ariaExpanded;
            reference['aria-haspopup'] = ariaHasPopup;
            reference['aria-controls'] = open ? listElement?.id : undefined;
            reference['aria-autocomplete'] = autoComplete;
        }
        return {
            reference,
            floating: {
                role: 'presentation'
            }
        };
    }, [
        inputElement,
        open,
        ariaExpanded,
        ariaHasPopup,
        listElement?.id,
        autoComplete
    ]);
    const click = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClick"])(floatingRootContext, {
        enabled: !readOnly && !disabled && openOnInputClick,
        event: 'mousedown-only',
        toggle: false,
        // Apply a small delay for touch to let iOS viewport centering settle.
        // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
        touchOpenDelay: inputInsidePopup ? 0 : 50
    });
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDismiss"])(floatingRootContext, {
        enabled: !readOnly && !disabled && !inline,
        outsidePressEvent: {
            mouse: 'sloppy',
            // The visual viewport (affected by the mobile software keyboard) can be
            // somewhat small. The user may want to scroll the screen to see more of
            // the popup.
            touch: 'intentional'
        },
        // Without a popup, let the Escape key bubble the event up to other popups' handlers.
        bubbles: inline ? true : undefined,
        outsidePress (event) {
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
            return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(triggerElement, target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(clearRef.current, target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(chipsContainerRef.current, target);
        }
    });
    const listNavigation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useListNavigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useListNavigation"])(floatingRootContext, {
        enabled: !readOnly && !disabled,
        id,
        listRef,
        activeIndex,
        selectedIndex,
        virtual: true,
        loopFocus,
        allowEscape: loopFocus && !autoHighlightMode,
        focusItemOnOpen: queryChangedAfterOpen || selectionMode === 'none' && !autoHighlightMode ? false : 'auto',
        focusItemOnHover: highlightItemOnHover,
        resetOnPointerLeave: !keepHighlight,
        // `cols` > 1 enables grid navigation.
        // Since <Combobox.Row> infers column sizes (and is required when building a grid),
        // it works correctly even with a value of `2`.
        // Floating UI tests don't require `role="row"` wrappers, so retains the number API.
        cols: grid ? 2 : 1,
        orientation: grid ? 'horizontal' : undefined,
        disabledIndices: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"],
        onNavigate (nextActiveIndex, event) {
            // Retain the highlight only while actually transitioning out or closed.
            if (!event && !open || transitionStatus === 'ending') {
                return;
            }
            if (!event) {
                setIndices({
                    activeIndex: nextActiveIndex
                });
            } else {
                setIndices({
                    activeIndex: nextActiveIndex,
                    type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
                });
            }
        }
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInteractions"])([
        role,
        click,
        dismiss,
        listNavigation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useOnFirstRender$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnFirstRender"])(()=>{
        store.update({
            inline: inlineProp,
            popupProps: getFloatingProps(),
            inputProps: getReferenceProps(),
            triggerProps,
            getItemProps,
            setOpen,
            setInputValue,
            setSelectedValue,
            setIndices,
            onItemHighlighted,
            handleSelection,
            forceMount,
            requestSubmit
        });
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        store.update({
            id,
            selectedValue,
            open,
            mounted,
            transitionStatus,
            items,
            inline: inlineProp,
            popupProps: getFloatingProps(),
            inputProps: getReferenceProps(),
            triggerProps,
            openMethod,
            getItemProps,
            selectionMode,
            name,
            disabled,
            readOnly,
            required,
            grid,
            isGrouped,
            virtualized,
            onOpenChangeComplete,
            openOnInputClick,
            itemToStringLabel,
            modal,
            autoHighlight: autoHighlightMode,
            isItemEqualToValue,
            submitOnItemClick,
            hasInputValue,
            requestSubmit
        });
    }, [
        store,
        id,
        selectedValue,
        open,
        mounted,
        transitionStatus,
        items,
        getFloatingProps,
        getReferenceProps,
        getItemProps,
        openMethod,
        triggerProps,
        selectionMode,
        name,
        disabled,
        readOnly,
        required,
        validation,
        grid,
        isGrouped,
        virtualized,
        onOpenChangeComplete,
        openOnInputClick,
        itemToStringLabel,
        modal,
        isItemEqualToValue,
        submitOnItemClick,
        hasInputValue,
        inlineProp,
        requestSubmit,
        autoHighlightMode
    ]);
    const hiddenInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(inputRefProp, validation.inputRef);
    const itemsContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            query,
            filteredItems,
            flatFilteredItems
        }), [
        query,
        filteredItems,
        flatFilteredItems
    ]);
    const serializedValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (Array.isArray(fieldRawValue)) {
            return '';
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsValue"])(fieldRawValue, itemToStringValue);
    }, [
        fieldRawValue,
        itemToStringValue
    ]);
    const hasMultipleSelection = multiple && Array.isArray(selectedValue) && selectedValue.length > 0;
    const hiddenInputs = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!multiple || !Array.isArray(selectedValue) || !name) {
            return null;
        }
        return selectedValue.map((value)=>{
            const currentSerializedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsValue"])(value, itemToStringValue);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("input", {
                type: "hidden",
                name: name,
                value: currentSerializedValue
            }, currentSerializedValue);
        });
    }, [
        multiple,
        selectedValue,
        name,
        itemToStringValue
    ]);
    const children = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            props.children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("input", {
                ...validation.getInputValidationProps({
                    // Move focus when the hidden input is focused.
                    onFocus () {
                        if (inputInsidePopup) {
                            triggerElement?.focus();
                            return;
                        }
                        (inputRef.current || triggerElement)?.focus();
                    },
                    // Handle browser autofill.
                    onChange (event) {
                        // Workaround for https://github.com/facebook/react/issues/9023
                        if (event.nativeEvent.defaultPrevented) {
                            return;
                        }
                        const nextValue = event.target.value;
                        const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange, event.nativeEvent);
                        function handleChange() {
                            // Browser autofill only writes a single scalar value.
                            if (multiple) {
                                return;
                            }
                            if (selectionMode === 'none') {
                                setDirty(nextValue !== validityData.initialValue);
                                setInputValue(nextValue, details);
                                if (shouldValidateOnChange()) {
                                    validation.commit(nextValue);
                                }
                                return;
                            }
                            const matchingValue = valuesRef.current.find((v)=>{
                                const candidate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$resolveValueLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyAsValue"])(v, itemToStringValue);
                                if (candidate.toLowerCase() === nextValue.toLowerCase()) {
                                    return true;
                                }
                                return false;
                            });
                            if (matchingValue != null) {
                                setDirty(matchingValue !== validityData.initialValue);
                                setSelectedValue?.(matchingValue, details);
                                if (shouldValidateOnChange()) {
                                    validation.commit(matchingValue);
                                }
                            }
                        }
                        if (items) {
                            handleChange();
                        } else {
                            forceMount();
                            queueMicrotask(handleChange);
                        }
                    }
                }),
                name: multiple || selectionMode === 'none' ? undefined : name,
                disabled: disabled,
                required: required && !hasMultipleSelection,
                readOnly: readOnly,
                value: serializedValue,
                ref: hiddenInputRef,
                style: name ? __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visuallyHiddenInput"] : __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visuallyHidden"],
                tabIndex: -1,
                "aria-hidden": true
            }),
            hiddenInputs
        ]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxRootContext"].Provider, {
        value: store,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxFloatingContext"].Provider, {
            value: floatingRootContext,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxDerivedItemsContext"].Provider, {
                value: itemsContextValue,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxInputValueContext"].Provider, {
                    value: inputValue,
                    children: children
                })
            })
        })
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/utils/stateAttributesMapping.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "triggerStateAttributesMapping",
    ()=>triggerStateAttributesMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
;
;
const triggerStateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressableTriggerOpenStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fieldValidityMapping"],
    popupSide: (side)=>side ? {
            'data-popup-side': side
        } : null,
    listEmpty: (empty)=>empty ? {
            'data-list-empty': ''
        } : null
};
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/trigger/ComboboxTrigger.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxTrigger",
    ()=>ComboboxTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useTimeout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getPseudoElementBounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getPseudoElementBounds.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-ssr] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useClick.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useTypeahead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useTypeahead.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$useLabelableId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/useLabelableId.js [app-ssr] (ecmascript)");
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
const BOUNDARY_OFFSET = 2;
const ComboboxTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxTrigger(componentProps, forwardedRef) {
    const { render, className, nativeButton = true, disabled: disabledProp = false, id: idProp, ...elementProps } = componentProps;
    const { state: fieldState, disabled: fieldDisabled, setTouched, setFocused, validationMode, validation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const selectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectionMode);
    const comboboxDisabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].disabled);
    const readOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].readOnly);
    const required = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].required);
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].mounted);
    const popupSideValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].popupSide);
    const positionerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].positionerElement);
    const listElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].listElement);
    const triggerProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].triggerProps);
    const triggerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].triggerElement);
    const inputInsidePopup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputInsidePopup);
    const rootId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].id);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const selectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectedValue);
    const activeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].activeIndex);
    const selectedIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectedIndex);
    const hasSelectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].hasSelectedValue);
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxFloatingContext"])();
    const inputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxInputValueContext"])();
    const focusTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const disabled = fieldDisabled || comboboxDisabled || disabledProp;
    const listEmpty = filteredItems.length === 0;
    const popupSide = mounted && positionerElement ? popupSideValue : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$useLabelableId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabelableId"])({
        id: inputInsidePopup ? idProp : undefined
    });
    const id = inputInsidePopup ? idProp ?? rootId : idProp;
    const currentPointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]('');
    function trackPointerType(event) {
        currentPointerTypeRef.current = event.pointerType;
    }
    const domReference = floatingRootContext.select('domReferenceElement');
    // Update the floating root context to use the trigger element when it differs from the current reference.
    // This ensures useClick and useTypeahead attach handlers to the correct element.
    __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!inputInsidePopup) {
            return;
        }
        if (triggerElement && triggerElement !== domReference) {
            floatingRootContext.set('domReferenceElement', triggerElement);
        }
    }, [
        triggerElement,
        domReference,
        floatingRootContext,
        inputInsidePopup
    ]);
    const { reference: triggerTypeaheadProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useTypeahead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTypeahead"])(floatingRootContext, {
        enabled: !open && !readOnly && !comboboxDisabled && selectionMode === 'single',
        listRef: store.state.labelsRef,
        activeIndex,
        selectedIndex,
        onMatch (index) {
            const nextSelectedValue = store.state.valuesRef.current[index];
            if (nextSelectedValue !== undefined) {
                store.state.setSelectedValue(nextSelectedValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('none'));
            }
        }
    });
    const { reference: triggerClickProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClick"])(floatingRootContext, {
        enabled: !readOnly && !comboboxDisabled,
        event: 'mousedown'
    });
    const { buttonRef, getButtonProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        native: nativeButton,
        disabled
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            ...fieldState,
            open,
            disabled,
            popupSide,
            listEmpty,
            placeholder: !hasSelectedValue
        }), [
        fieldState,
        open,
        disabled,
        popupSide,
        listEmpty,
        hasSelectedValue
    ]);
    const setTriggerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((element)=>{
        store.set('triggerElement', element);
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        ref: [
            forwardedRef,
            buttonRef,
            setTriggerElement
        ],
        state,
        props: [
            triggerProps,
            triggerClickProps,
            triggerTypeaheadProps,
            {
                id,
                tabIndex: inputInsidePopup ? 0 : -1,
                role: inputInsidePopup ? 'combobox' : undefined,
                'aria-expanded': open ? 'true' : 'false',
                'aria-haspopup': inputInsidePopup ? 'dialog' : 'listbox',
                'aria-controls': open ? listElement?.id : undefined,
                'aria-readonly': readOnly || undefined,
                'aria-required': inputInsidePopup ? required || undefined : undefined,
                'aria-labelledby': labelId,
                onPointerDown: trackPointerType,
                onPointerEnter: trackPointerType,
                onFocus () {
                    setFocused(true);
                    if (disabled || readOnly) {
                        return;
                    }
                    focusTimeout.start(0, store.state.forceMount);
                },
                onBlur (event) {
                    // If focus is moving into the popup, don't count it as a blur.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(positionerElement, event.relatedTarget)) {
                        return;
                    }
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        const valueToValidate = selectionMode === 'none' ? inputValue : selectedValue;
                        validation.commit(valueToValidate);
                    }
                },
                onMouseDown (event) {
                    if (disabled || readOnly) {
                        return;
                    }
                    if (!inputInsidePopup) {
                        floatingRootContext.set('domReferenceElement', event.currentTarget);
                    }
                    // Ensure items are registered for initial selection highlight.
                    store.state.forceMount();
                    if (currentPointerTypeRef.current !== 'touch') {
                        store.state.inputRef.current?.focus();
                        if (!inputInsidePopup) {
                            event.preventDefault();
                        }
                    }
                    if (open) {
                        return;
                    }
                    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget);
                    function handleMouseUp(mouseEvent) {
                        if (!triggerElement) {
                            return;
                        }
                        const mouseUpTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(mouseEvent);
                        const positioner = store.state.positionerElement;
                        const list = store.state.listElement;
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(triggerElement, mouseUpTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(positioner, mouseUpTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(list, mouseUpTarget) || mouseUpTarget === triggerElement) {
                            return;
                        }
                        const bounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getPseudoElementBounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPseudoElementBounds"])(triggerElement);
                        const withinHorizontal = mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET;
                        const withinVertical = mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET;
                        if (withinHorizontal && withinVertical) {
                            return;
                        }
                        store.state.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('cancel-open', mouseEvent));
                    }
                    if (inputInsidePopup) {
                        doc.addEventListener('mouseup', handleMouseUp, {
                            once: true
                        });
                    }
                },
                onKeyDown (event) {
                    if (disabled || readOnly) {
                        return;
                    }
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        store.state.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].listNavigation, event.nativeEvent));
                        store.state.inputRef.current?.focus();
                    }
                }
            },
            validation ? validation.getValidationProps(elementProps) : elementProps,
            getButtonProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerStateAttributesMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ComboboxTrigger.displayName = "ComboboxTrigger";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/chips/ComboboxChipsContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxChipsContext",
    ()=>ComboboxChipsContext,
    "useComboboxChipsContext",
    ()=>useComboboxChipsContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const ComboboxChipsContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxChipsContext.displayName = "ComboboxChipsContext";
function useComboboxChipsContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxChipsContext);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxPositionerContext",
    ()=>ComboboxPositionerContext,
    "useComboboxPositionerContext",
    ()=>useComboboxPositionerContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ComboboxPositionerContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxPositionerContext.displayName = "ComboboxPositionerContext";
function useComboboxPositionerContext(optional) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxPositionerContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: <Combobox.Popup> and <Combobox.Arrow> must be used within the <Combobox.Positioner> component' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/input/ComboboxInput.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxInput",
    ()=>ComboboxInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/labelable-provider/LabelableContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$chips$2f$ComboboxChipsContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/chips/ComboboxChipsContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-ssr] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
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
const ComboboxInput = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxInput(componentProps, forwardedRef) {
    const { render, className, disabled: disabledProp = false, id: idProp, ...elementProps } = componentProps;
    const { state: fieldState, disabled: fieldDisabled, setTouched, setFocused, validationMode, validation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$labelable$2d$provider$2f$LabelableContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const comboboxChipsContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$chips$2f$ComboboxChipsContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxChipsContext"])();
    const positioning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxPositionerContext"])(true);
    const hasPositionerParent = Boolean(positioning);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    // `inputValue` can't be placed in the store.
    // https://github.com/mui/base-ui/issues/2703
    const inputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxInputValueContext"])();
    const required = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].required);
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const comboboxDisabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].disabled);
    const readOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].readOnly);
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].name);
    const selectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectionMode);
    const autoHighlightMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].autoHighlight);
    const inputProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputProps);
    const triggerProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].triggerProps);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].mounted);
    const selectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectedValue);
    const popupSideValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].popupSide);
    const positionerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].positionerElement);
    const rootId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].id);
    const inline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inline);
    const autoHighlightEnabled = Boolean(autoHighlightMode);
    const popupSide = mounted && positionerElement ? popupSideValue : null;
    const disabled = fieldDisabled || comboboxDisabled || disabledProp;
    const listEmpty = filteredItems.length === 0;
    const isInsidePopup = hasPositionerParent || inline;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp ?? (!isInsidePopup ? rootId : undefined));
    const [composingValue, setComposingValue] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const isComposingRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const setInputElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((element)=>{
        const nextIsInsidePopup = hasPositionerParent || store.state.inline;
        if (nextIsInsidePopup && !store.state.hasInputValue) {
            store.state.setInputValue('', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none));
        }
        store.update({
            inputElement: element,
            inputInsidePopup: nextIsInsidePopup
        });
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            ...fieldState,
            open,
            disabled,
            readOnly,
            popupSide,
            listEmpty
        }), [
        fieldState,
        open,
        disabled,
        readOnly,
        popupSide,
        listEmpty
    ]);
    function handleKeyDown(event) {
        if (!comboboxChipsContext) {
            return undefined;
        }
        let nextIndex;
        const { highlightedChipIndex } = comboboxChipsContext;
        if (highlightedChipIndex !== undefined) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                if (highlightedChipIndex > 0) {
                    nextIndex = highlightedChipIndex - 1;
                } else {
                    nextIndex = undefined;
                }
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                if (highlightedChipIndex < selectedValue.length - 1) {
                    nextIndex = highlightedChipIndex + 1;
                } else {
                    nextIndex = undefined;
                }
            } else if (event.key === 'Backspace' || event.key === 'Delete') {
                event.preventDefault();
                // Move highlight appropriately after removal.
                const computedNextIndex = highlightedChipIndex >= selectedValue.length - 1 ? selectedValue.length - 2 : highlightedChipIndex;
                // If the computed index is negative, treat it as no highlight.
                nextIndex = computedNextIndex >= 0 ? computedNextIndex : undefined;
                store.state.setIndices({
                    activeIndex: null,
                    selectedIndex: null,
                    type: 'keyboard'
                });
            }
            return nextIndex;
        }
        // Handle navigation when no chip is highlighted
        if (event.key === 'ArrowLeft' && (event.currentTarget.selectionStart ?? 0) === 0 && selectedValue.length > 0) {
            event.preventDefault();
            const lastChipIndex = Math.max(selectedValue.length - 1, 0);
            nextIndex = lastChipIndex;
        } else if (event.key === 'Backspace' && event.currentTarget.value === '' && selectedValue.length > 0) {
            store.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: 'keyboard'
            });
            event.preventDefault();
        }
        return nextIndex;
    }
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('input', componentProps, {
        state,
        ref: [
            forwardedRef,
            store.state.inputRef,
            setInputElement
        ],
        props: [
            inputProps,
            triggerProps,
            {
                type: 'text',
                value: componentProps.value ?? composingValue ?? inputValue,
                'aria-readonly': readOnly || undefined,
                'aria-required': required || undefined,
                'aria-labelledby': labelId,
                disabled,
                readOnly,
                required: selectionMode === 'none' ? required : undefined,
                ...selectionMode === 'none' && name && {
                    name
                },
                id,
                onFocus () {
                    setFocused(true);
                },
                onBlur () {
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        const valueToValidate = selectionMode === 'none' ? inputValue : selectedValue;
                        validation.commit(valueToValidate);
                    }
                },
                onCompositionStart (event) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAndroid"]) {
                        return;
                    }
                    isComposingRef.current = true;
                    setComposingValue(event.currentTarget.value);
                },
                onCompositionEnd (event) {
                    isComposingRef.current = false;
                    const next = event.currentTarget.value;
                    setComposingValue(null);
                    store.state.setInputValue(next, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange, event.nativeEvent));
                },
                onChange (event) {
                    // During IME composition, avoid propagating controlled updates to prevent
                    // filtering the options prematurely so `Empty` won't show incorrectly.
                    // We can't rely on this check for Android due to how it handles composition
                    // events with some keyboards (e.g. Samsung keyboard with predictive text on
                    // treats all text as always-composing).
                    // https://github.com/mui/base-ui/issues/2942
                    if (isComposingRef.current) {
                        const nextVal = event.currentTarget.value;
                        setComposingValue(nextVal);
                        if (nextVal === '' && !store.state.openOnInputClick && !store.state.inputInsidePopup) {
                            store.state.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear, event.nativeEvent));
                        }
                        const trimmed = nextVal.trim();
                        const shouldMaintainHighlight = autoHighlightEnabled && trimmed !== '';
                        if (!readOnly && !disabled) {
                            if (trimmed !== '') {
                                store.state.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange, event.nativeEvent));
                                if (!autoHighlightEnabled) {
                                    store.state.setIndices({
                                        activeIndex: null,
                                        selectedIndex: null,
                                        type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
                                    });
                                }
                            }
                        }
                        if (open && store.state.activeIndex !== null && !shouldMaintainHighlight) {
                            store.state.setIndices({
                                activeIndex: null,
                                selectedIndex: null,
                                type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
                            });
                        }
                        return;
                    }
                    store.state.setInputValue(event.currentTarget.value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange, event.nativeEvent));
                    const empty = event.currentTarget.value === '';
                    const clearDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputClear, event.nativeEvent);
                    if (empty && !store.state.inputInsidePopup) {
                        if (selectionMode === 'single') {
                            store.state.setSelectedValue(null, clearDetails);
                        }
                        if (!store.state.openOnInputClick) {
                            store.state.setOpen(false, clearDetails);
                        }
                    }
                    const trimmed = event.currentTarget.value.trim();
                    if (!readOnly && !disabled) {
                        if (trimmed !== '') {
                            store.state.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].inputChange, event.nativeEvent));
                            // When autoHighlight is enabled, keep the highlight (will be set to 0 in root).
                            if (!autoHighlightEnabled) {
                                store.state.setIndices({
                                    activeIndex: null,
                                    selectedIndex: null,
                                    type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
                                });
                            }
                        }
                    }
                    // When the user types, ensure the list resets its highlight so that
                    // virtual focus returns to the input (aria-activedescendant is
                    // cleared).
                    if (open && store.state.activeIndex !== null && !autoHighlightEnabled) {
                        store.state.setIndices({
                            activeIndex: null,
                            selectedIndex: null,
                            type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
                        });
                    }
                },
                onKeyDown (event) {
                    if (disabled || readOnly) {
                        return;
                    }
                    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
                        return;
                    }
                    store.state.keyboardActiveRef.current = true;
                    const input = event.currentTarget;
                    const scrollAmount = input.scrollWidth - input.clientWidth;
                    const isRTL = direction === 'rtl';
                    if (event.key === 'Home') {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        const cursor = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFirefox"] && isRTL ? input.value.length : 0;
                        input.setSelectionRange(cursor, cursor);
                        input.scrollLeft = 0;
                        return;
                    }
                    if (event.key === 'End') {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        const cursor = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFirefox"] && isRTL ? 0 : input.value.length;
                        input.setSelectionRange(cursor, cursor);
                        input.scrollLeft = isRTL ? -scrollAmount : scrollAmount;
                        return;
                    }
                    if (!mounted && event.key === 'Escape') {
                        const isClear = selectionMode === 'multiple' && Array.isArray(selectedValue) ? selectedValue.length === 0 : selectedValue === null;
                        const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].escapeKey, event.nativeEvent);
                        const value = selectionMode === 'multiple' ? [] : null;
                        store.state.setInputValue('', details);
                        store.state.setSelectedValue(value, details);
                        if (!isClear && !store.state.inline && !details.isPropagationAllowed) {
                            event.stopPropagation();
                        }
                        return;
                    }
                    // Handle deletion when no chip is highlighted and the input is empty.
                    if (comboboxChipsContext && event.key === 'Backspace' && input.value === '' && comboboxChipsContext.highlightedChipIndex === undefined && Array.isArray(selectedValue) && selectedValue.length > 0) {
                        const newValue = selectedValue.slice(0, -1);
                        // If the removed item was also the active (highlighted) item, clear highlight
                        store.state.setIndices({
                            activeIndex: null,
                            selectedIndex: null,
                            type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
                        });
                        store.state.setSelectedValue(newValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent));
                        return;
                    }
                    const nextIndex = handleKeyDown(event);
                    comboboxChipsContext?.setHighlightedChipIndex(nextIndex);
                    if (nextIndex !== undefined) {
                        comboboxChipsContext?.chipsRef.current[nextIndex]?.focus();
                    } else {
                        store.state.inputRef.current?.focus();
                    }
                    // event.isComposing
                    if (event.which === 229) {
                        return;
                    }
                    if (event.key === 'Enter' && open) {
                        const activeIndex = store.state.activeIndex;
                        const nativeEvent = event.nativeEvent;
                        if (activeIndex === null) {
                            // Allow form submission when no item is highlighted.
                            store.state.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, nativeEvent));
                            return;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        const listItem = store.state.listRef.current[activeIndex];
                        if (listItem) {
                            store.state.selectionEventRef.current = nativeEvent;
                            listItem.click();
                            store.state.selectionEventRef.current = null;
                        }
                    }
                },
                onPointerMove () {
                    store.state.keyboardActiveRef.current = false;
                },
                onPointerDown () {
                    store.state.keyboardActiveRef.current = false;
                }
            },
            validation ? validation.getValidationProps(elementProps) : elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerStateAttributesMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ComboboxInput.displayName = "ComboboxInput";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/icon/ComboboxIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxIcon",
    ()=>ComboboxIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
const ComboboxIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxIcon(componentProps, forwardedRef) {
    const { className, render, ...elementProps } = componentProps;
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('span', componentProps, {
        ref: forwardedRef,
        props: [
            {
                'aria-hidden': true,
                children: '▼'
            },
            elementProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ComboboxIcon.displayName = "ComboboxIcon";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/clear/ComboboxClear.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxClear",
    ()=>ComboboxClear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/reason-parts.js [app-ssr] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
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
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerOpenStateMapping"]
};
const ComboboxClear = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxClear(componentProps, forwardedRef) {
    const { render, className, disabled: disabledProp = false, nativeButton = true, keepMounted = false, ...elementProps } = componentProps;
    const { disabled: fieldDisabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const selectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectionMode);
    const comboboxDisabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].disabled);
    const readOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].readOnly);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const selectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectedValue);
    const hasSelectionChips = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].hasSelectionChips);
    const inputValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxInputValueContext"])();
    let visible = false;
    if (selectionMode === 'none') {
        visible = inputValue !== '';
    } else if (selectionMode === 'single') {
        visible = selectedValue != null;
    } else {
        visible = hasSelectionChips;
    }
    const disabled = fieldDisabled || comboboxDisabled || disabledProp;
    const { buttonRef, getButtonProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        native: nativeButton,
        disabled
    });
    const { mounted, transitionStatus, setMounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(visible);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            open,
            transitionStatus
        }), [
        disabled,
        open,
        transitionStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open: visible,
        ref: store.state.clearRef,
        onComplete () {
            if (!visible) {
                setMounted(false);
            }
        }
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef,
            store.state.clearRef
        ],
        props: [
            {
                tabIndex: -1,
                children: 'x',
                'aria-readonly': readOnly || undefined,
                // Avoid stealing focus from the input.
                onMouseDown (event) {
                    event.preventDefault();
                },
                onClick (event) {
                    if (disabled || readOnly) {
                        return;
                    }
                    const keyboardActiveRef = store.state.keyboardActiveRef;
                    store.state.setInputValue('', (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].clearPress, event.nativeEvent));
                    if (selectionMode !== 'none') {
                        store.state.setSelectedValue(Array.isArray(selectedValue) ? [] : null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].clearPress, event.nativeEvent));
                        store.state.setIndices({
                            activeIndex: null,
                            selectedIndex: null,
                            type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
                        });
                    } else {
                        store.state.setIndices({
                            activeIndex: null,
                            type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
                        });
                    }
                    store.state.inputRef.current?.focus();
                }
            },
            elementProps,
            getButtonProps
        ],
        stateAttributesMapping
    });
    const shouldRender = keepMounted || mounted;
    if (!shouldRender) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ComboboxClear.displayName = "ComboboxClear";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/collection/GroupCollectionContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroupCollectionProvider",
    ()=>GroupCollectionProvider,
    "useGroupCollectionContext",
    ()=>useGroupCollectionContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const GroupCollectionContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](null);
if ("TURBOPACK compile-time truthy", 1) GroupCollectionContext.displayName = "GroupCollectionContext";
function useGroupCollectionContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](GroupCollectionContext);
}
function GroupCollectionProvider(props) {
    const { children, items } = props;
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            items
        }), [
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GroupCollectionContext.Provider, {
        value: contextValue,
        children: children
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/collection/ComboboxCollection.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxCollection",
    ()=>ComboboxCollection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$GroupCollectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/collection/GroupCollectionContext.js [app-ssr] (ecmascript)");
/**
 * Renders filtered list items.
 * Doesn't render its own HTML element.
 *
 * If rendering a flat list, pass a function child to the `List` component instead, which implicitly wraps it.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ComboboxCollection(props) {
    const { children } = props;
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const groupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$GroupCollectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGroupCollectionContext"])();
    const itemsToRender = groupContext ? groupContext.items : filteredItems;
    if (!itemsToRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: itemsToRender.map(children)
    });
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/list/ComboboxList.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxList",
    ()=>ComboboxList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$ComboboxCollection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/collection/ComboboxCollection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
/**
 * A list container for the items.
 * Renders a `<div>` element.
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
;
;
const ComboboxList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxList(componentProps, forwardedRef) {
    var _ComboboxCollection;
    const { render, className, children, ...elementProps } = componentProps;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxFloatingContext"])();
    const hasPositionerContext = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxPositionerContext"])(true));
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].items);
    const labelsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].labelsRef);
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].listRef);
    const selectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectionMode);
    const grid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].grid);
    const popupProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].popupProps);
    const disabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].disabled);
    const readOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].readOnly);
    const virtualized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].virtualized);
    const multiple = selectionMode === 'multiple';
    const empty = filteredItems.length === 0;
    const setPositionerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((element)=>{
        store.set('positionerElement', element);
    });
    const setListElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((element)=>{
        store.set('listElement', element);
    });
    // Support "closed template" API: if children is a function, implicitly wrap it
    // with a Combobox.Collection that reads items from context/root.
    // Ensures this component's `popupProps` subscription does not cause <Combobox.Item>
    // to re-render on every active index change.
    const resolvedChildren = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (typeof children === 'function') {
            return _ComboboxCollection || (_ComboboxCollection = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$ComboboxCollection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxCollection"], {
                children: children
            }));
        }
        return children;
    }, [
        children
    ]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            empty
        }), [
        empty
    ]);
    const floatingId = floatingRootContext.useState('floatingId');
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            setListElement,
            hasPositionerContext ? null : setPositionerElement
        ],
        props: [
            popupProps,
            {
                children: resolvedChildren,
                tabIndex: -1,
                id: floatingId,
                role: grid ? 'grid' : 'listbox',
                'aria-multiselectable': multiple ? 'true' : undefined,
                onKeyDown (event) {
                    if (disabled || readOnly) {
                        return;
                    }
                    if (event.key === 'Enter') {
                        const activeIndex = store.state.activeIndex;
                        if (activeIndex == null) {
                            // Allow form submission when no item is highlighted.
                            return;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        const nativeEvent = event.nativeEvent;
                        const listItem = store.state.listRef.current[activeIndex];
                        if (listItem) {
                            store.state.selectionEventRef.current = nativeEvent;
                            listItem.click();
                            store.state.selectionEventRef.current = null;
                        }
                    }
                },
                onKeyDownCapture () {
                    store.state.keyboardActiveRef.current = true;
                },
                onPointerMoveCapture () {
                    store.state.keyboardActiveRef.current = false;
                }
            },
            elementProps
        ]
    });
    if (virtualized) {
        return element;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeList"], {
        elementsRef: listRef,
        labelsRef: items ? undefined : labelsRef,
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxList.displayName = "ComboboxList";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/status/ComboboxStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxStatus",
    ()=>ComboboxStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
const ComboboxStatus = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxStatus(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        props: [
            {
                role: 'status',
                'aria-live': 'polite',
                'aria-atomic': true
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxStatus.displayName = "ComboboxStatus";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortalContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxPortalContext",
    ()=>ComboboxPortalContext,
    "useComboboxPortalContext",
    ()=>useComboboxPortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ComboboxPortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxPortalContext.displayName = "ComboboxPortalContext";
function useComboboxPortalContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxPortalContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: <Combobox.Portal> is missing.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxPortal",
    ()=>ComboboxPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingPortal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$portal$2f$ComboboxPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const ComboboxPortal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].mounted);
    const forceMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].forceMounted);
    const shouldRender = mounted || keepMounted || forceMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$portal$2f$ComboboxPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxPortalContext"].Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingPortal"], {
            ref: forwardedRef,
            ...portalProps
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxPortal.displayName = "ComboboxPortal";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/backdrop/ComboboxBackdrop.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxBackdrop",
    ()=>ComboboxBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const ComboboxBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxBackdrop(componentProps, forwardedRef) {
    const { className, render, ...elementProps } = componentProps;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].mounted);
    const transitionStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].transitionStatus);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            transitionStatus
        }), [
        open,
        transitionStatus
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: forwardedRef,
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
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxBackdrop.displayName = "ComboboxBackdrop";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositioner.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxPositioner",
    ()=>ComboboxPositioner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/inertValue.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useScrollLock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useAnchorPositioning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useAnchorPositioning.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$portal$2f$ComboboxPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/constants.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/InternalBackdrop.js [app-ssr] (ecmascript)");
/**
 * Positions the popup against the trigger.
 * Renders a `<div>` element.
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
;
;
;
;
;
;
;
const ComboboxPositioner = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxPositioner(componentProps, forwardedRef) {
    const { render, className, anchor, positionMethod = 'absolute', side = 'bottom', align = 'center', sideOffset = 0, alignOffset = 0, collisionBoundary = 'clipping-ancestors', collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DROPDOWN_COLLISION_AVOIDANCE"], ...elementProps } = componentProps;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxFloatingContext"])();
    const keepMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$portal$2f$ComboboxPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxPortalContext"])();
    const modal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].modal);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].mounted);
    const openMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].openMethod);
    const triggerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].triggerElement);
    const inputElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputElement);
    const inputInsidePopup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputInsidePopup);
    const empty = filteredItems.length === 0;
    const resolvedAnchor = anchor ?? (inputInsidePopup ? triggerElement : inputElement);
    const positioning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useAnchorPositioning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnchorPositioning"])({
        anchor: resolvedAnchor,
        floatingRootContext,
        positionMethod,
        mounted,
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        collisionBoundary,
        collisionPadding,
        sticky,
        disableAnchorTracking,
        keepMounted,
        collisionAvoidance,
        lazyFlip: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollLock"])(open && modal && openMethod !== 'touch', triggerElement);
    const defaultProps = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const style = {
            ...positioning.positionerStyles
        };
        if (!open) {
            style.pointerEvents = 'none';
        }
        return {
            role: 'presentation',
            hidden: !mounted,
            style
        };
    }, [
        open,
        mounted,
        positioning.positionerStyles
    ]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            side: positioning.side,
            align: positioning.align,
            anchorHidden: positioning.anchorHidden,
            empty
        }), [
        open,
        positioning.side,
        positioning.align,
        positioning.anchorHidden,
        empty
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        store.set('popupSide', positioning.side);
    }, [
        store,
        positioning.side
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            side: positioning.side,
            align: positioning.align,
            arrowRef: positioning.arrowRef,
            arrowUncentered: positioning.arrowUncentered,
            arrowStyles: positioning.arrowStyles,
            anchorHidden: positioning.anchorHidden,
            isPositioned: positioning.isPositioned
        }), [
        positioning.side,
        positioning.align,
        positioning.arrowRef,
        positioning.arrowUncentered,
        positioning.arrowStyles,
        positioning.anchorHidden,
        positioning.isPositioned
    ]);
    const setPositionerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((element)=>{
        store.set('positionerElement', element);
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            setPositionerElement
        ],
        props: [
            defaultProps,
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxPositionerContext"].Provider, {
        value: contextValue,
        children: [
            mounted && modal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InternalBackdrop"], {
                inert: (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inertValue"])(!open),
                cutout: inputElement ?? triggerElement
            }),
            element
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxPositioner.displayName = "ComboboxPositioner";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/popup/ComboboxPopup.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxPopup",
    ()=>ComboboxPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingFocusManager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getDisabledMountTransitionStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/getDisabledMountTransitionStyles.js [app-ssr] (ecmascript)");
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
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const ComboboxPopup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxPopup(componentProps, forwardedRef) {
    const { render, className, initialFocus, finalFocus, ...elementProps } = componentProps;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const positioning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxPositionerContext"])();
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxFloatingContext"])();
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].mounted);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const openMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].openMethod);
    const transitionStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].transitionStatus);
    const inputInsidePopup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputInsidePopup);
    const inputElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].inputElement);
    const modal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].modal);
    const empty = filteredItems.length === 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open,
        ref: store.state.popupRef,
        onComplete () {
            if (open) {
                store.state.onOpenChangeComplete(true);
            }
        }
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            side: positioning.side,
            align: positioning.align,
            anchorHidden: positioning.anchorHidden,
            transitionStatus,
            empty
        }), [
        open,
        positioning.side,
        positioning.align,
        positioning.anchorHidden,
        transitionStatus,
        empty
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            store.state.popupRef
        ],
        props: [
            {
                role: inputInsidePopup ? 'dialog' : 'presentation',
                tabIndex: -1,
                onFocus (event) {
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
                    if (openMethod !== 'touch' && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(store.state.listElement, target) || target === event.currentTarget)) {
                        store.state.inputRef.current?.focus();
                    }
                }
            },
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getDisabledMountTransitionStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDisabledMountTransitionStyles"])(transitionStatus),
            elementProps
        ],
        stateAttributesMapping
    });
    // Default initial focus logic:
    // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
    // (this is required for Android specifically as iOS handles this automatically).
    const computedDefaultInitialFocus = inputInsidePopup ? (interactionType)=>interactionType === 'touch' ? store.state.popupRef.current : inputElement : false;
    const resolvedInitialFocus = initialFocus === undefined ? computedDefaultInitialFocus : initialFocus;
    let resolvedFinalFocus;
    if (finalFocus != null) {
        resolvedFinalFocus = finalFocus;
    } else {
        resolvedFinalFocus = inputInsidePopup ? undefined : false;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingFocusManager"], {
        context: floatingRootContext,
        disabled: !mounted,
        modal: inputInsidePopup ? modal : false,
        openInteractionType: openMethod,
        initialFocus: resolvedInitialFocus,
        returnFocus: resolvedFinalFocus,
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxPopup.displayName = "ComboboxPopup";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/arrow/ComboboxArrow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxArrow",
    ()=>ComboboxArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const ComboboxArrow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxArrow(componentProps, forwardedRef) {
    const { className, render, ...elementProps } = componentProps;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const { arrowRef, side, align, arrowUncentered, arrowStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$positioner$2f$ComboboxPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxPositionerContext"])();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            side,
            align,
            uncentered: arrowUncentered
        }), [
        open,
        side,
        align,
        arrowUncentered
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            arrowRef,
            forwardedRef
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
        state,
        props: {
            style: arrowStyles,
            'aria-hidden': true,
            ...elementProps
        }
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxArrow.displayName = "ComboboxArrow";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group/ComboboxGroupContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxGroupContext",
    ()=>ComboboxGroupContext,
    "useComboboxGroupContext",
    ()=>useComboboxGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ComboboxGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxGroupContext.displayName = "ComboboxGroupContext";
function useComboboxGroupContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxGroupContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ComboboxGroupContext is missing. ComboboxGroup parts must be placed within <Combobox.Group>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group/ComboboxGroup.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxGroup",
    ()=>ComboboxGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2f$ComboboxGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group/ComboboxGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$GroupCollectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/collection/GroupCollectionContext.js [app-ssr] (ecmascript)");
/**
 * Groups related items with the corresponding label.
 * Renders a `<div>` element.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const ComboboxGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxGroup(componentProps, forwardedRef) {
    const { render, className, items, ...elementProps } = componentProps;
    const [labelId, setLabelId] = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]();
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            labelId,
            setLabelId,
            items
        }), [
        labelId,
        setLabelId,
        items
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        props: [
            {
                role: 'group',
                'aria-labelledby': labelId
            },
            elementProps
        ]
    });
    const wrappedElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2f$ComboboxGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxGroupContext"].Provider, {
        value: contextValue,
        children: element
    });
    if (items) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$collection$2f$GroupCollectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GroupCollectionProvider"], {
            items: items,
            children: wrappedElement
        });
    }
    return wrappedElement;
});
if ("TURBOPACK compile-time truthy", 1) ComboboxGroup.displayName = "ComboboxGroup";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group-label/ComboboxGroupLabel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxGroupLabel",
    ()=>ComboboxGroupLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2f$ComboboxGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/group/ComboboxGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const ComboboxGroupLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxGroupLabel(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { setLabelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$group$2f$ComboboxGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxGroupContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        setLabelId(id);
        return ()=>{
            setLabelId(undefined);
        };
    }, [
        id,
        setLabelId
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) ComboboxGroupLabel.displayName = "ComboboxGroupLabel";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/item/ComboboxItemContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxItemContext",
    ()=>ComboboxItemContext,
    "useComboboxItemContext",
    ()=>useComboboxItemContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ComboboxItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ComboboxItemContext.displayName = "ComboboxItemContext";
function useComboboxItemContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxItemContext);
    if (!context) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ComboboxItemContext is missing. ComboboxItem parts must be placed within <Combobox.Item>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/row/ComboboxRowContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxRowContext",
    ()=>ComboboxRowContext,
    "useComboboxRowContext",
    ()=>useComboboxRowContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const ComboboxRowContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](false);
if ("TURBOPACK compile-time truthy", 1) ComboboxRowContext.displayName = "ComboboxRowContext";
function useComboboxRowContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ComboboxRowContext);
}
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/item/ComboboxItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxItem",
    ()=>ComboboxItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/store/useStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$item$2f$ComboboxItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/item/ComboboxItemContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$row$2f$ComboboxRowContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/row/ComboboxRowContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/itemEquality.js [app-ssr] (ecmascript)");
/**
 * An individual item in the list.
 * Renders a `<div>` element.
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
;
;
;
;
const ComboboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxItem(componentProps, forwardedRef) {
    const { render, className, value = null, index: indexProp, disabled = false, nativeButton = false, ...elementProps } = componentProps;
    const didPointerDownRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const textRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const listItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        index: indexProp,
        textRef,
        indexGuessBehavior: __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndexGuessBehavior"].GuessFromOrder
    });
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const isRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$row$2f$ComboboxRowContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRowContext"])();
    const { flatFilteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].open);
    const selectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].selectionMode);
    const readOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].readOnly);
    const virtualized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].virtualized);
    const isItemEqualToValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].isItemEqualToValue);
    const selectable = selectionMode !== 'none';
    const index = indexProp ?? (virtualized ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findItemIndex"])(flatFilteredItems, value, isItemEqualToValue) : listItem.index);
    const hasRegistered = listItem.index !== -1;
    const rootId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].id);
    const highlighted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].isActive, index);
    const matchesSelectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].isSelected, value);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].items);
    const getItemProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$store$2f$useStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectors"].getItemProps);
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const id = rootId != null && hasRegistered ? `${rootId}-${index}` : undefined;
    const selected = matchesSelectedValue && selectable;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        const shouldRun = hasRegistered && (virtualized || indexProp != null);
        if (!shouldRun) {
            return undefined;
        }
        const list = store.state.listRef.current;
        list[index] = itemRef.current;
        return ()=>{
            delete list[index];
        };
    }, [
        hasRegistered,
        virtualized,
        index,
        indexProp,
        store
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!hasRegistered || items) {
            return undefined;
        }
        const visibleMap = store.state.valuesRef.current;
        visibleMap[index] = value;
        // Stable registry that doesn't depend on filtering. Assume that no
        // filtering had occurred at this point; otherwise, an `items` prop is
        // required.
        if (selectionMode !== 'none') {
            store.state.allValuesRef.current.push(value);
        }
        return ()=>{
            delete visibleMap[index];
        };
    }, [
        hasRegistered,
        items,
        index,
        value,
        store,
        selectionMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!open) {
            didPointerDownRef.current = false;
            return;
        }
        if (!hasRegistered || items) {
            return;
        }
        const selectedValue = store.state.selectedValue;
        const lastSelectedValue = Array.isArray(selectedValue) ? selectedValue[selectedValue.length - 1] : selectedValue;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$itemEquality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareItemEquality"])(lastSelectedValue, value, isItemEqualToValue)) {
            store.set('selectedIndex', index);
        }
    }, [
        hasRegistered,
        items,
        open,
        store,
        index,
        value,
        isItemEqualToValue
    ]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            selected,
            highlighted
        }), [
        disabled,
        selected,
        highlighted
    ]);
    const rootProps = getItemProps({
        active: highlighted,
        selected
    });
    rootProps.id = undefined;
    rootProps.onFocus = undefined;
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        focusableWhenDisabled: true,
        native: nativeButton
    });
    function commitSelection(nativeEvent) {
        function selectItem() {
            store.state.handleSelection(nativeEvent, value);
        }
        if (store.state.submitOnItemClick) {
            __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"](selectItem);
            store.state.requestSubmit();
        } else {
            selectItem();
        }
    }
    const defaultProps = {
        id,
        role: isRow ? 'gridcell' : 'option',
        'aria-selected': selectable ? selected : undefined,
        // Focusable items steal focus from the input upon mouseup.
        // Warn if the user renders a natively focusable element like `<button>`,
        // as it should be a `<div>` instead.
        tabIndex: undefined,
        onPointerDownCapture (event) {
            didPointerDownRef.current = true;
            event.preventDefault();
        },
        onClick (event) {
            if (disabled || readOnly) {
                return;
            }
            commitSelection(event.nativeEvent);
        },
        onMouseUp (event) {
            const pointerStartedOnItem = didPointerDownRef.current;
            didPointerDownRef.current = false;
            if (disabled || readOnly || event.button !== 0 || pointerStartedOnItem || !highlighted) {
                return;
            }
            commitSelection(event.nativeEvent);
        }
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            buttonRef,
            forwardedRef,
            listItem.ref,
            itemRef
        ],
        state,
        props: [
            rootProps,
            defaultProps,
            elementProps,
            getButtonProps
        ]
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            selected,
            textRef
        }), [
        selected,
        textRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$item$2f$ComboboxItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxItemContext"].Provider, {
        value: contextValue,
        children: element
    });
}));
if ("TURBOPACK compile-time truthy", 1) ComboboxItem.displayName = "ComboboxItem";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/row/ComboboxRow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxRow",
    ()=>ComboboxRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$row$2f$ComboboxRowContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/row/ComboboxRowContext.js [app-ssr] (ecmascript)");
/**
 * Displays a single row of items in a grid list.
 * Enable `grid` on the root component to turn the listbox into a grid.
 * Renders a `<div>` element.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const ComboboxRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxRow(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        props: [
            {
                role: 'row'
            },
            elementProps
        ]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$row$2f$ComboboxRowContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComboboxRowContext"].Provider, {
        value: true,
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxRow.displayName = "ComboboxRow";
}),
"[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/empty/ComboboxEmpty.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComboboxEmpty",
    ()=>ComboboxEmpty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafekit-web/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const ComboboxEmpty = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ComboboxEmpty(componentProps, forwardedRef) {
    const { render, className, children: childrenProp, ...elementProps } = componentProps;
    const { filteredItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxDerivedItemsContext"])();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$combobox$2f$root$2f$ComboboxRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComboboxRootContext"])();
    const children = filteredItems.length === 0 ? childrenProp : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafekit$2d$web$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            store.state.emptyRef
        ],
        props: [
            {
                children,
                role: 'status',
                'aria-live': 'polite',
                'aria-atomic': true
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) ComboboxEmpty.displayName = "ComboboxEmpty";
}),
];

//# sourceMappingURL=cc419_%40base-ui_react_esm_combobox_f35b55b5._.js.map