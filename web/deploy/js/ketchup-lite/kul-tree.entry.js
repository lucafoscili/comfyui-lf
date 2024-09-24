import { h, a as getAssetPath, r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, c as KulLanguageSearch, d as KulLanguageGeneric, a as KUL_STYLE_ID } from './kul-manager-8205ca5d.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';

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

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/
const TreeNodeContent = ({ depth, expanded = false, node, onClickExpand, type }) => {
    switch (type) {
        case 'dropdown':
            return (h("div", { class: `node__dropdown ${expanded ? 'node__dropdown--expanded' : ''} ` }));
        case 'expand':
            return (h("div", { class: `node__expand ${expanded ? 'node__expand--expanded' : ''} `, onClick: onClickExpand }));
        case 'icon':
            const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
            const style = {
                mask: `url('${path}') no-repeat center`,
                webkitMask: `url('${path}') no-repeat center`,
            };
            return h("div", { class: 'node__icon', style: style });
        case 'padding':
            return (h("div", { class: "node__padding", style: {
                    ['--kul_tree_padding_multiplier']: depth.toString(),
                } }));
        default:
            return h("div", { class: 'node__expand node__expand--placeholder' });
    }
};

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/
const TreeNode = (props) => {
    const { accordionLayout, depth, elements, events, expanded, node, selected, } = props || {};
    const icon = node.icon ? (h(TreeNodeContent, { node: node, type: "icon" })) : (h(TreeNodeContent, { type: "placeholder" }));
    const classList = {
        node: true,
        ['node--expanded']: expanded ? true : false,
        ['node--selected']: selected ? true : false,
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
        return (h("div", { class: `node ${expanded ? 'node--expanded' : ''} ${selected ? 'node--selected' : ''}`, "data-cy": KulDataCyAttributes.NODE, "data-depth": depth.toString(), key: node.id, onClick: events.onClick, onPointerDown: events.onPointerDown, title: node.description },
            h("div", { class: "node__content" },
                elements.ripple,
                h(TreeNodeContent, { depth: depth, type: "padding" }),
                node.children?.length ? (h(TreeNodeContent, { expanded: expanded, node: node, onClickExpand: events.onClickExpand, type: "expand" })) : (h(TreeNodeContent, { type: "placeholder" })),
                icon,
                elements.value)));
    }
};

const kulTreeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_tree_accordion_background_color:var(\n    --kul-tree-accordion-background-color,\n    var(--kul-title-background-color)\n  );--kul_tree_accordion_border_radius:var(\n    --kul-tree-accordion-border-radius,\n    4px\n  );--kul_tree_accordion_color:var(\n    --kul-tree-accordion-color,\n    var(--kul-title-color)\n  );--kul_tree_accordion_font_size:var(--kul-tree-accordion-font-size, 1.125em);--kul_tree_accordion_hover_background_color:var(\n    --kul-tree-accordion-hover-background-color,\n    var(--kul-primary-color)\n  );--kul_tree_accordion_hover_color:var(\n    --kul-tree-accordion-hover-color,\n    var(--kul-text-on-primary-color)\n  );--kul_tree_accordion_node_height:var(--kul-tree-accordion-node-height, 4em);--kul_tree_node_height:var(--kul-tree-node-height, 2em);--kul_tree_backdrop_filter:var(--kul-tree-backdrop-filter, blur(3.5px));--kul_tree_node_background_color_hover:var(\n    --kul-tree-node-background-color-hover,\n    rgba(var(--kul-primary-color-rgb), 0.175)\n  );--kul_tree_node_background_color_selected:var(\n    --kul-tree-node-background-color-selected,\n    rgba(var(--kul-primary-color-rgb), 0.375)\n  );--kul_tree_node_padding:var(--kul-tree-node-padding, 0 1em);--kul_tree_padding:var(--kul-tree-padding, 0);--kul_tree_text_color:var(--kul-tree-text-color, var(--kul-text-color));display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}:host([kul-selectable]) .node:hover:not(.node--selected){background-color:var(--kul_tree_node_background_color_hover)}:host([kul-selectable]) .node--selected{background-color:var(--kul_tree_node_background_color_selected)}:host([kul-accordion-layout]) .node[data-depth=\"0\"]{background-color:var(--kul_tree_accordion_background_color);border-radius:var(--kul_tree_accordion_border_radius);color:var(--kul_tree_accordion_color);font-size:var(--kul_tree_accordion_font_size);height:var(--kul_tree_accordion_node_height)}:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover{background-color:var(--kul_tree_accordion_hover_background_color);color:var(--kul_tree_accordion_hover_color)}:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover .node__dropdown,:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover .node__expand,:host([kul-accordion-layout]) .node[data-depth=\"0\"]:hover .node__icon{background-color:var(--kul_tree_accordion_hover_color)}.tree{-webkit-backdrop-filter:var(--kul_tree_backdrop_filter);backdrop-filter:var(--kul_tree_backdrop_filter);padding:var(--kul_tree_padding)}.node{box-sizing:border-box;color:var(--kul_tree_text_color);height:var(--kul_tree_node_height);padding:var(--kul_tree_node_padding);position:relative;transition:background-color 125ms ease}.node__content{align-items:center;display:flex;height:100%;width:100%}.node__dropdown,.node__expand,.node__icon{background-color:var(--kul_tree_text_color);cursor:pointer;height:1.5em;margin:0;width:1.5em}.node__dropdown,.node__expand{overflow:hidden;transition:transform 125ms ease}.node__dropdown:hover,.node__expand:hover{transform:scale(1.25)}.node__dropdown{-webkit-mask:var(--kul-dropdown-icon);mask:var(--kul-dropdown-icon)}.node__dropdown--expanded{transform:rotate(180deg)}.node__dropdown--expanded:hover{transform:rotate(-180deg) scale(1.25)}.node__dropdown--placeholder{visibility:hidden}.node__expand{-webkit-mask:var(--kul-collapsed-icon);mask:var(--kul-collapsed-icon)}.node__expand--expanded{-webkit-mask:var(--kul-expanded-icon);mask:var(--kul-expanded-icon)}.node__expand--placeholder{visibility:hidden}.node__padding{height:100%;width:calc(1.75em * var(--kul_tree_padding_multiplier))}.node__value{margin:0 0 0 0.5em;width:100%}.no-matches{align-items:center;box-sizing:border-box;color:var(--kul_tree_text_color);display:flex;justify-content:center;margin:auto;padding:1em;width:100%}.no-matches__icon{background-color:var(--kul-primary-color);height:1.25em;margin-right:0.375em;-webkit-mask:var(--kul-warning-icon);mask:var(--kul-warning-icon);width:1.25em}.no-matches__text{font-size:0.975em}.no-matches__filter{color:var(--kul-primary-color)}.empty-data{align-items:center;display:flex;justify-content:center;height:100%;padding:1.5em 0;width:100%}";
const KulTreeStyle0 = kulTreeCss;

const KulTree = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-tree-event", 6);
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
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #filterTimeout;
    #filterValue = '';
    #kulManager = kulManagerInstance();
    #rippleSurface = {};
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, args) {
        const { expansion, node } = args || {};
        switch (eventType) {
            case 'click':
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
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface[node.id]);
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
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves to a KulDebugComponentInfo object containing debug information.
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
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #filter(e) {
        clearTimeout(this.#filterTimeout);
        this.#filterTimeout = setTimeout(() => {
            this.#filterValue = e.detail.inputValue?.toLowerCase();
            if (!this.#filterValue) {
                this.hiddenNodes = new Set();
            }
            else {
                const filter = this.#kulManager.data.node.filter(this.kulData, { value: this.#filterValue }, true);
                this.hiddenNodes = new Set(filter.remainingNodes);
                if (filter.ancestorNodes) {
                    filter.ancestorNodes.forEach((ancestor) => {
                        this.hiddenNodes.delete(ancestor);
                    });
                }
            }
        }, 300);
    }
    #prepTree() {
        const elements = [];
        const nodes = this.kulData.nodes;
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            this.#recursive(elements, node, 0);
        }
        return elements.length ? (elements) : this.#filterValue ? (h("div", { class: "no-matches" }, h("div", { class: "no-matches__icon" }), h("div", { class: "no-matches__text" }, "No matches found for \"", h("strong", { class: "no-matches__filter" }, this.#filterValue), "\"."))) : undefined;
    }
    #recursive(elements, node, depth) {
        if (!this.debugInfo.endTime) {
            if (this.kulInitialExpansionDepth === null ||
                this.kulInitialExpansionDepth === undefined ||
                this.kulInitialExpansionDepth > depth) {
                this.expandedNodes.add(node);
            }
        }
        const isExpanded = this.#filterValue
            ? true
            : this.expandedNodes.has(node);
        const isHidden = this.hiddenNodes.has(node);
        const isSelected = this.selectedNode === node;
        const nodeProps = {
            accordionLayout: this.kulAccordionLayout && depth === 0,
            depth,
            elements: {
                ripple: (h("div", { ref: (el) => {
                        if (el && this.kulRipple) {
                            this.#rippleSurface[node.id] = el;
                        }
                    } })),
                value: (h("div", { class: "node__value" }, this.#kulManager.data.cell.stringify(node.value))),
            },
            events: {
                onClick: (e) => {
                    this.onKulEvent(e, 'click', { node });
                },
                onClickExpand: (e) => {
                    this.onKulEvent(e, 'click', { expansion: true, node });
                },
                onPointerDown: (e) => {
                    this.onKulEvent(e, 'pointerdown', { node });
                },
            },
            expanded: isExpanded,
            node,
            selected: isSelected,
        };
        if (!isHidden) {
            elements.push(h(TreeNode, { ...nodeProps }));
            if (isExpanded) {
                node.children?.map((child) => this.#recursive(elements, child, depth + 1));
            }
        }
    }
    #setExpansion(node) {
        if (this.expandedNodes.has(node)) {
            this.expandedNodes.delete(node);
        }
        else {
            this.expandedNodes.add(node);
        }
        if (node.children?.length) {
            node.children.forEach((child) => {
                this.#setExpansion(child);
            });
        }
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        if (Object.keys(this.#rippleSurface).length) {
            for (const key in this.#rippleSurface) {
                if (Object.prototype.hasOwnProperty.call(this.#rippleSurface, key)) {
                    const surface = this.#rippleSurface[key];
                    this.#kulManager.theme.ripple.setup(surface);
                }
            }
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const isEmpty = !!!this.kulData?.nodes?.length;
        this.#rippleSurface = {};
        return (h(Host, { key: '2aa0b5a0089c9a2a9ec842107d2de58917d911ec' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '06d7d3a83e68def9ae66f130a5b9072f689c83e2', id: KUL_WRAPPER_ID }, h("div", { key: 'd9e2a99abf53df5cb4dce20033b6a1a1aafea6b9', class: "tree" }, this.kulFilter ? (h("kul-textfield", { kulIcon: "magnify", kulFullWidth: true, kulLabel: this.#kulManager.language.translate(KulLanguageSearch.SEARCH), kulStyling: "flat", "onKul-textfield-event": (e) => {
                this.onKulEvent(e, 'kul-event');
                if (e.detail.eventType === 'input') {
                    this.#filter(e);
                }
            } })) : undefined, isEmpty ? (h("div", { class: "empty-data" }, h("div", { class: "empty-data__text" }, this.#kulManager.language.translate(KulLanguageGeneric.EMPTY_DATA)))) : (this.#prepTree())))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulTree.style = KulTreeStyle0;

export { KulTree as kul_tree };

//# sourceMappingURL=kul-tree.entry.js.map