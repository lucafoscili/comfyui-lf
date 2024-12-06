import { h, a as getAssetPath, r as registerInstance, d as createEvent, f as forceUpdate, H as Host, g as getElement } from './index-64e8bec6.js';
import { K as KulDataCyAttributes, k as kulManagerInstance, a as KUL_WRAPPER_ID, e as KulLanguageSearch, f as KulLanguageGeneric, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulTreeProps;
(function (KulTreeProps) {
    KulTreeProps["kulAccordionLayout"] = "When enabled, the first level of depth will create an accordion-style appearance for nodes.";
    KulTreeProps["kulData"] = "Actual data of the tree.";
    KulTreeProps["kulFilter"] = "When true, displays a text field which enables filtering the dataset of the tree.";
    KulTreeProps["kulInitialExpansionDepth"] = "Sets the initial expanded nodes based on the specified depth. If the property is not provided, all nodes in the tree will be expanded.";
    KulTreeProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulTreeProps["kulSelectable"] = "When true, nodes can be selected.";
    KulTreeProps["kulStyle"] = "Custom style of the component.";
})(KulTreeProps || (KulTreeProps = {}));
//#endregion

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/
const TreeNodeContent = ({ depth, expanded = false, node, onClickExpand, type }) => {
    switch (type) {
        case "dropdown":
            return (h("div", { class: `node__dropdown ${expanded ? "node__dropdown--expanded" : ""} ` }));
        case "expand":
            return (h("div", { class: `node__expand ${expanded ? "node__expand--expanded" : ""} `, onClick: onClickExpand }));
        case "icon":
            const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
            const style = {
                mask: `url('${path}') no-repeat center`,
                webkitMask: `url('${path}') no-repeat center`,
            };
            return h("div", { class: "node__icon", style: style });
        case "padding":
            return (h("div", { class: "node__padding", style: {
                    ["--kul_tree_padding_multiplier"]: depth.toString(),
                } }));
        default:
            return h("div", { class: "node__expand node__expand--placeholder" });
    }
};

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/
const TreeNode = (props) => {
    const { accordionLayout, depth, elements, events, expanded, node, selected } = props || {};
    const icon = node.icon ? (h(TreeNodeContent, { node: node, type: "icon" })) : (h(TreeNodeContent, { type: "placeholder" }));
    const classList = {
        node: true,
        ["node--expanded"]: expanded ? true : false,
        ["node--selected"]: selected ? true : false,
    };
    if (accordionLayout) {
        return (h("div", { class: classList, "data-depth": depth.toString(), key: node.id, onClick: events.onClickExpand, onPointerDown: events.onPointerDown, title: node.description },
            h("div", { class: "node__content" },
                elements.ripple,
                icon,
                elements.value,
                node.children?.length ? (h(TreeNodeContent, { expanded: expanded, node: node, type: "dropdown" })) : (h(TreeNodeContent, { type: "placeholder" })))));
    }
    else {
        return (h("div", { class: `node ${expanded ? "node--expanded" : ""} ${selected ? "node--selected" : ""}`, "data-cy": KulDataCyAttributes.NODE, "data-depth": depth.toString(), key: node.id, onClick: events.onClick, onPointerDown: events.onPointerDown, title: node.description },
            h("div", { class: "node__content" },
                elements.ripple,
                h(TreeNodeContent, { depth: depth, type: "padding" }),
                node.children?.length ? (h(TreeNodeContent, { expanded: expanded, node: node, onClickExpand: events.onClickExpand, type: "expand" })) : (h(TreeNodeContent, { type: "placeholder" })),
                icon,
                elements.value)));
    }
};

const kulTreeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_tree_accordion_background_color:var(\n    --kul-tree-accordion-background-color,\n    var(--kul-title-background-color)\n  );--kul_tree_accordion_border_radius:var(\n    --kul-tree-accordion-border-radius,\n    4px\n  );--kul_tree_accordion_color:var(\n    --kul-tree-accordion-color,\n    var(--kul-title-color)\n  );--kul_tree_accordion_font_size:var(--kul-tree-accordion-font-size, 1.125em);--kul_tree_accordion_hover_background_color:var(\n    --kul-tree-accordion-hover-background-color,\n    var(--kul-primary-color)\n  );--kul_tree_accordion_hover_color:var(\n    --kul-tree-accordion-hover-color,\n    var(--kul-text-on-primary-color)\n  );--kul_tree_accordion_node_height:var(--kul-tree-accordion-node-height, 4em);--kul_tree_node_height:var(--kul-tree-node-height, 2em);--kul_tree_backdrop_filter:var(--kul-tree-backdrop-filter, blur(3.5px));--kul_tree_node_background_color_hover:var(\n    --kul-tree-node-background-color-hover,\n    rgba(var(--kul-primary-color-rgb), 0.175)\n  );--kul_tree_node_background_color_selected:var(\n    --kul-tree-node-background-color-selected,\n    rgba(var(--kul-primary-color-rgb), 0.375)\n  );--kul_tree_node_padding:var(--kul-tree-node-padding, 0 1em);--kul_tree_padding:var(--kul-tree-padding, 0);--kul_tree_text_color:var(--kul-tree-text-color, var(--kul-text-color));display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}:host([kul-selectable]) .node:hover:not(.node--selected){background-color:var(--kul_tree_node_background_color_hover)}:host([kul-selectable]) .node--selected{background-color:var(--kul_tree_node_background_color_selected)}:host([kul-accordion-layout]) .node[data-depth=\"0\"]{background-color:var(--kul_tree_accordion_background_color);border-radius:var(--kul_tree_accordion_border_radius);color:var(--kul_tree_accordion_color);font-size:var(--kul_tree_accordion_font_size);height:var(--kul_tree_accordion_node_height)}:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover{background-color:var(--kul_tree_accordion_hover_background_color);color:var(--kul_tree_accordion_hover_color)}:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover .node__dropdown,:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover .node__expand,:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover .node__icon{background-color:var(--kul_tree_accordion_hover_color)}.tree{-webkit-backdrop-filter:var(--kul_tree_backdrop_filter);backdrop-filter:var(--kul_tree_backdrop_filter);color:var(--kul_tree_text_color);padding:var(--kul_tree_padding)}.node{box-sizing:border-box;color:var(--kul_tree_text_color);height:var(--kul_tree_node_height);padding:var(--kul_tree_node_padding);position:relative;transition:background-color 125ms ease}.node__content{align-items:center;display:flex;height:100%;width:100%}.node__dropdown,.node__expand,.node__icon{background-color:var(--kul_tree_text_color);cursor:pointer;height:1.5em;margin:0;width:1.5em}.node__dropdown,.node__expand{overflow:hidden;transition:transform 125ms ease}.node__dropdown:hover,.node__expand:hover{transform:scale(1.25)}.node__dropdown{-webkit-mask:var(--kul-dropdown-icon);mask:var(--kul-dropdown-icon)}.node__dropdown--expanded{transform:rotate(180deg)}.node__dropdown--expanded:hover{transform:rotate(-180deg) scale(1.25)}.node__dropdown--placeholder{visibility:hidden}.node__expand{-webkit-mask:var(--kul-collapsed-icon);mask:var(--kul-collapsed-icon)}.node__expand--expanded{-webkit-mask:var(--kul-expanded-icon);mask:var(--kul-expanded-icon)}.node__expand--placeholder{visibility:hidden}.node__padding{height:100%;width:calc(1.75em * var(--kul_tree_padding_multiplier))}.node__value{margin:0 0 0 0.5em;overflow:hidden;text-overflow:ellipsis;white-space:pre;width:100%}.no-matches{align-items:center;box-sizing:border-box;color:var(--kul_tree_text_color);display:flex;justify-content:center;margin:auto;padding:1em;width:100%}.no-matches__icon{background-color:var(--kul-primary-color);height:1.25em;margin-right:0.375em;-webkit-mask:var(--kul-warning-icon);mask:var(--kul-warning-icon);width:1.25em}.no-matches__text{font-size:0.975em}.no-matches__filter{color:var(--kul-primary-color)}.empty-data{align-items:center;display:flex;justify-content:center;height:100%;padding:1.5em 0;width:100%}";
const KulTreeStyle0 = kulTreeCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m")
        throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _KulTree_instances, _KulTree_filterTimeout, _KulTree_filterValue, _KulTree_kulManager, _KulTree_rippleSurface, _KulTree_filter, _KulTree_prepTree, _KulTree_recursive;
const KulTree = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-tree-event", 6);
        _KulTree_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulTree_filterTimeout.set(this, void 0);
        _KulTree_filterValue.set(this, "");
        _KulTree_kulManager.set(this, kulManagerInstance());
        _KulTree_rippleSurface.set(this, {});
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.expandedNodes = new Set();
        this.hiddenNodes = new Set();
        this.selectedNode = null;
        this.kulAccordionLayout = true;
        this.kulData = null;
        this.kulFilter = true;
        this.kulInitialExpansionDepth = undefined;
        this.kulRipple = true;
        this.kulSelectable = true;
        this.kulStyle = "";
    }
    onKulEvent(e, eventType, args) {
        const { expansion, node } = args || {};
        switch (eventType) {
            case "click":
                if (expansion && node.children?.length) {
                    if (this.expandedNodes.has(node)) {
                        this.expandedNodes.delete(node);
                    }
                    else {
                        this.expandedNodes.add(node);
                    }
                    this.expandedNodes = new Set(this.expandedNodes);
                }
                else if (node) {
                    this.selectedNode = node;
                }
                break;
            case "pointerdown":
                if (this.kulRipple) {
                    __classPrivateFieldGet(this, _KulTree_kulManager, "f").theme.ripple.trigger(e, __classPrivateFieldGet(this, _KulTree_rippleSurface, "f")[node.id]);
                }
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            node,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    async getProps(descriptions) {
        return getProps(this, KulTreeProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    async unmount(ms = 0) {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent("unmount"), "unmount");
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulTree_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulTree_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulTree_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        if (Object.keys(__classPrivateFieldGet(this, _KulTree_rippleSurface, "f")).length) {
            for (const key in __classPrivateFieldGet(this, _KulTree_rippleSurface, "f")) {
                if (Object.prototype.hasOwnProperty.call(__classPrivateFieldGet(this, _KulTree_rippleSurface, "f"), key)) {
                    const surface = __classPrivateFieldGet(this, _KulTree_rippleSurface, "f")[key];
                    __classPrivateFieldGet(this, _KulTree_kulManager, "f").theme.ripple.setup(surface);
                }
            }
        }
        __classPrivateFieldGet(this, _KulTree_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        const isEmpty = !!!this.kulData?.nodes?.length;
        __classPrivateFieldSet(this, _KulTree_rippleSurface, {}, "f");
        return (h(Host, { key: 'a6bc6f1880b346091a9485afe9d71b650cba0691' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulTree_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: '7417a874387fcd02c05d3c9664892fa64768a224', id: KUL_WRAPPER_ID }, h("div", { key: '603fad7562582293e2417aec4ed376ec0adb7671', class: "tree" }, this.kulFilter ? (h("kul-textfield", { kulIcon: "magnify", kulFullWidth: true, kulLabel: __classPrivateFieldGet(this, _KulTree_kulManager, "f").language.translate(KulLanguageSearch.SEARCH), kulStyling: "flat", "onKul-textfield-event": (e) => {
                this.onKulEvent(e, "kul-event");
                if (e.detail.eventType === "input") {
                    __classPrivateFieldGet(this, _KulTree_instances, "m", _KulTree_filter).call(this, e);
                }
            } })) : undefined, isEmpty ? (h("div", { class: "empty-data" }, h("div", { class: "empty-data__text" }, __classPrivateFieldGet(this, _KulTree_kulManager, "f").language.translate(KulLanguageGeneric.EMPTY_DATA)))) : (__classPrivateFieldGet(this, _KulTree_instances, "m", _KulTree_prepTree).call(this))))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulTree_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
};
_KulTree_filterTimeout = new WeakMap(), _KulTree_filterValue = new WeakMap(), _KulTree_kulManager = new WeakMap(), _KulTree_rippleSurface = new WeakMap(), _KulTree_instances = new WeakSet(), _KulTree_filter = function _KulTree_filter(e) {
    clearTimeout(__classPrivateFieldGet(this, _KulTree_filterTimeout, "f"));
    __classPrivateFieldSet(this, _KulTree_filterTimeout, setTimeout(() => {
        __classPrivateFieldSet(this, _KulTree_filterValue, e.detail.inputValue?.toLowerCase(), "f");
        if (!__classPrivateFieldGet(this, _KulTree_filterValue, "f")) {
            this.hiddenNodes = new Set();
        }
        else {
            const filter = __classPrivateFieldGet(this, _KulTree_kulManager, "f").data.node.filter(this.kulData, { value: __classPrivateFieldGet(this, _KulTree_filterValue, "f") }, true);
            this.hiddenNodes = new Set(filter.remainingNodes);
            if (filter.ancestorNodes) {
                filter.ancestorNodes.forEach((ancestor) => {
                    this.hiddenNodes.delete(ancestor);
                });
            }
        }
    }, 300), "f");
}, _KulTree_prepTree = function _KulTree_prepTree() {
    const elements = [];
    const nodes = this.kulData.nodes;
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        __classPrivateFieldGet(this, _KulTree_instances, "m", _KulTree_recursive).call(this, elements, node, 0);
    }
    return elements.length ? (elements) : __classPrivateFieldGet(this, _KulTree_filterValue, "f") ? (h("div", { class: "no-matches" }, h("div", { class: "no-matches__icon" }), h("div", { class: "no-matches__text" }, "No matches found for \"", h("strong", { class: "no-matches__filter" }, __classPrivateFieldGet(this, _KulTree_filterValue, "f")), "\"."))) : undefined;
}, _KulTree_recursive = function _KulTree_recursive(elements, node, depth) {
    if (!this.debugInfo.endTime) {
        if (this.kulInitialExpansionDepth === null ||
            this.kulInitialExpansionDepth === undefined ||
            this.kulInitialExpansionDepth > depth) {
            this.expandedNodes.add(node);
        }
    }
    const isExpanded = __classPrivateFieldGet(this, _KulTree_filterValue, "f") ? true : this.expandedNodes.has(node);
    const isHidden = this.hiddenNodes.has(node);
    const isSelected = this.selectedNode === node;
    const nodeProps = {
        accordionLayout: this.kulAccordionLayout && depth === 0,
        depth,
        elements: {
            ripple: (h("div", { ref: (el) => {
                    if (el && this.kulRipple) {
                        __classPrivateFieldGet(this, _KulTree_rippleSurface, "f")[node.id] = el;
                    }
                } })),
            value: (h("div", { class: "node__value" }, __classPrivateFieldGet(this, _KulTree_kulManager, "f").data.cell.stringify(node.value))),
        },
        events: {
            onClick: (e) => {
                this.onKulEvent(e, "click", { node });
            },
            onClickExpand: (e) => {
                this.onKulEvent(e, "click", { expansion: true, node });
            },
            onPointerDown: (e) => {
                this.onKulEvent(e, "pointerdown", { node });
            },
        },
        expanded: isExpanded,
        node,
        selected: isSelected,
    };
    if (!isHidden) {
        elements.push(h(TreeNode, { ...nodeProps }));
        if (isExpanded) {
            node.children?.map((child) => __classPrivateFieldGet(this, _KulTree_instances, "m", _KulTree_recursive).call(this, elements, child, depth + 1));
        }
    }
};
KulTree.style = KulTreeStyle0;

export { KulTree as kul_tree };

//# sourceMappingURL=kul-tree.entry.js.map