import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, a as getAssetPath, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID, b as KulThemeColorValues } from './kul-manager-dc9a333c.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';

var KulChipProps;
(function (KulChipProps) {
    KulChipProps["kulData"] = "The data of the chip chip.";
    KulChipProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulChipProps["kulStyle"] = "Custom style of the component.";
    KulChipProps["kulStyling"] = "Styling of the chip component, includes: \"choice\", \"input\", \"filter\" and \"standard\".";
})(KulChipProps || (KulChipProps = {}));

const kulChipCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_chip_background_color:var(\n    --kul-chip-background-color,\n    var(--kul-background-color)\n  );--kul_chip_border_radius:var(--kul-chip-border-radius, 16px);--kul_chip_font_family:var(--kul-chip-font-family, var(--kul-font-family));--kul_chip_font_size:var(--kul-chip-font-size, var(--kul-font-size));--kul_chip_font_weight:var(--kul-chip-font-weight, var(--kul-font-weight));--kul_chip_height:var(--kul-chip-height, 32px);--kul_chip_indent_multiplier:var(--kul-chip-indent-multiplier, 10);--kul_chip_margin:var(--kul-chip-margin, 4px);--kul_chip_padding:var(--kul-chip-padding, 0 12px);--kul_chip_primary_color:var(\n    --kul-chip-primary-color,\n    var(--kul-primary-color)\n  );--kul_chip_primary_color_rgb:var(\n    --kul-chip-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_chip_text_color:var(--kul-chip-text-color, var(--kul-text-color));--kul_chip_text_color_rgb:var(\n    --kul-chip-text_color_rgb,\n    var(--kul-text-color-rgb)\n  )}:host{-webkit-backdrop-filter:var(--kul_list_backdrop_filter);backdrop-filter:var(--kul_list_backdrop_filter);background-color:var(--kul_list_background_color);display:block;font-family:var(--kul_chip_font_family);font-size:var(--kul_chip_font_size);height:100%;outline:none;width:100%}#kul-component,.chip-set{height:100%;width:100%}.chip-set{align-content:center;box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;padding:4px}.chip-set--choice .chip,.chip-set--filter .chip,.chip-set--input .chip{cursor:pointer}.chip-set--choice .chip--selected{background-color:var(--kul_chip_background_color);background-image:linear-gradient(to right, rgba(var(--kul_chip_primary_color_rgb), 0.25) 0%, rgba(var(--kul_chip_primary_color_rgb), 0.25) 0.1%, rgba(var(--kul_chip_primary_color_rgb), 0.25));color:var(--kul_chip_primary_color)}.chip-set--filter .chip__icon--leading{opacity:1;transition:opacity 75ms linear;transition-delay:-50ms}.chip-set--filter .chip__icon--leading+.chip__checkmark{opacity:0;transition:opacity 75ms linear;transition-delay:80ms}.chip-set--filter .chip__icon--leading+.chip__checkmark .chip__checkmark-svg{transition:width 0ms}.chip-set--filter .chip__icon--leading.chip__icon--leading-hidden{display:none;width:0;opacity:0}.chip-set--filter .chip__icon--leading.chip__icon--leading-hidden+.chip__checkmark{height:20px;width:20px;opacity:1}.chip-set--filter .chip--selected .chip__icon--leading{opacity:0}.chip-set--filter .chip--selected .chip__checkmark-path{stroke-dashoffset:0}.chip-set--filter .chip--selected .chip__checkmark{margin-left:-4px;margin-right:4px}.chip-set--filter .chip--selected .chip__checkmark .chip__checkmark-svg{height:20px;width:20px}.chip-set--input .kul-clear-icon{margin-left:4px;margin-right:-4px}.chip-set--input .kul-clear-icon:hover{opacity:0.75}.node{display:flex;flex-direction:column}.node__expand{background-color:var(--kul_chip_text_color);cursor:pointer;height:1.5em;margin:0;-webkit-mask:var(--kul-collapsed-icon);mask:var(--kul-collapsed-icon);overflow:hidden;transition:transform 125ms ease;width:1.5em}.node__expand:hover{transform:scale(1.25)}.node__expand--expanded{-webkit-mask:var(--kul-expanded-icon);mask:var(--kul-expanded-icon)}.node__expand--placeholder{visibility:hidden}.chip-wrapper{align-items:center;display:flex}.chip-wrapper--hidden-children .dropdown-icon{transform:unset}.indent{width:calc(var(--kul_chip_margin) * var(--kul_chip_indent_offset) * var(--kul_chip_indent_multiplier))}.chip{align-items:center;background-color:var(--kul_chip_background_color);background-image:linear-gradient(to right, rgba(var(--kul_chip_text_color_rgb), 0.1) 0%, rgba(var(--kul_chip_text_color_rgb), 0.1) 0.1%, rgba(var(--kul_chip_text_color_rgb), 0.1));border-radius:var(--kul_chip_border_radius);border-width:0;box-sizing:border-box;color:var(--kul_chip_text_color);display:inline-flex;font-size:0.875em;font-weight:var(--kul_chip_font_weight);height:var(--kul_chip_height);letter-spacing:0.0178571429em;margin:var(--kul_chip_margin);max-width:max-content;outline:none;padding:var(--kul_chip_padding);position:relative;text-decoration:inherit;text-transform:inherit}.chip__icon--leading{color:var(--kul_chip_text_color)}.chip__icon--leading:not(.chip__icon--leading-hidden){margin-left:-4px;margin-right:6px}.chip__icon{background:var(--kul_chip_text_color);display:block;height:18px;outline:none;width:18px}.chip__icon--leading:not(.chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.chip__icon--trailing{margin-right:-4px;margin-left:6px}.chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.chip svg path{color:var(--kul_chip_text_color);stroke:var(--kul_chip_text_color)}.chip__primary-action{outline:none}.chip__primary-action .chip__text{white-space:nowrap}:host(.kul-danger){--kul-chip-primary-color:var(--kul-danger-color);--kul-chip-primary-color-rgb:var(--kul-danger-color-rgb)}:host(.kul-info){--kul-chip-primary-color:var(--kul-info-color);--kul-chip-primary-color-rgb:var(--kul-info-color-rgb)}:host(.kul-secondary){--kul-chip-primary-color:var(--kul-secondary-color);--kul-chip-primary-color-rgb:var(--kul-secondary-color-rgb)}:host(.kul-success){--kul-chip-primary-color:var(--kul-success-color);--kul-chip-primary-color-rgb:var(--kul-success-color-rgb)}:host(.kul-warning){--kul-chip-primary-color:var(--kul-warning-color);--kul-chip-primary-color-rgb:var(--kul-warning-color-rgb)}";
const KulChipStyle0 = kulChipCss;

const KulChip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-chip-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.expandedNodes = new Set();
        this.hiddenNodes = new Set();
        this.selectedNodes = new Set();
        this.kulData = null;
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulStyling = 'standard';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #nodeItems = [];
    #kulManager = kulManagerInstance();
    #rippleSurface = [];
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
                if (expansion && this.#hasChildren(node)) {
                    if (this.expandedNodes.has(node)) {
                        this.expandedNodes.delete(node);
                    }
                    else {
                        this.expandedNodes.add(node);
                    }
                    this.expandedNodes = new Set(this.expandedNodes);
                }
                else if (node) {
                    if (this.selectedNodes.has(node)) {
                        this.selectedNodes.delete(node);
                    }
                    else {
                        this.selectedNodes.add(node);
                    }
                    this.selectedNodes = new Set(this.selectedNodes);
                }
                break;
            case 'delete':
                const nodeIndex = this.kulData?.nodes?.indexOf(node);
                if (nodeIndex > -1) {
                    this.kulData.nodes.splice(nodeIndex, 1);
                    this.refresh();
                }
                break;
            case 'pointerdown':
                if (this.kulRipple && this.#isClickable()) {
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
            selectedNodes: this.selectedNodes,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the chip of props with their description.
     * @returns {Promise<GenericObject>} Chip of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulChipProps, descriptions);
    }
    /**
     * Returns the selected nodes.
     * @returns {Promise<KulChipNode[]>} Selected nodes.
     */
    async getSelectedNodes() {
        return this.selectedNodes;
    }
    /**
     * Selects one or more nodes in the chip component.
     * @param {KulDataNode[] | string[]} nodes - An array of KulDataNode objects or node IDs to be selected.
     * @returns {Promise<void>}
     */
    async setSelectedNodes(nodes) {
        const nodesToAdd = new Set();
        const isStringArray = Array.isArray(nodes) &&
            nodes.every((item) => typeof item === 'string');
        this.kulData?.nodes?.forEach((n) => {
            if (isStringArray) {
                if (typeof n.id === 'string' && nodes.includes(n.id)) {
                    nodesToAdd.add(n);
                }
            }
            else {
                if (nodes.includes(n)) {
                    nodesToAdd.add(n);
                }
            }
        });
        this.selectedNodes = nodesToAdd;
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #hasChildren(node) {
        return !!(node.children && node.children.length);
    }
    #hasIconOnly(node) {
        return !!(node.icon && !node.value);
    }
    #isChoice() {
        return this.kulStyling === 'choice';
    }
    #isClickable() {
        return this.kulStyling === 'choice' || this.kulStyling === 'filter';
    }
    #isExpanded(node) {
        return this.expandedNodes.has(node);
    }
    #isFilter() {
        return this.kulStyling === 'filter';
    }
    #isInput() {
        return this.kulStyling === 'input';
    }
    #isSelected(node) {
        return this.selectedNodes.has(node);
    }
    #prepChip(node, i) {
        const className = {
            chip: true,
            'chip--only-icon': this.#hasIconOnly(node),
            'chip--selected': this.#isSelected(node),
        };
        return (h("div", { class: className, "data-value": node.id, onClick: (e) => {
                this.onKulEvent(e, 'click', { node });
            }, role: "row", title: node.description ?? '' }, this.#prepRipple(node), h("span", { class: "indent" }), this.#prepIcons(node), h("span", { role: "button", tabindex: i, class: "chip__primary-action", "data-cy": KulDataCyAttributes.INPUT, onBlur: (e) => {
                this.onKulEvent(e, 'blur', { node });
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus', { node });
            } }, h("span", { class: "chip__text" }, node.value)), this.#isInput() && this.#prepDeleteIcon(node)));
    }
    #prepChipSet() {
        const elements = [];
        const nodeCount = this.kulData?.nodes?.length;
        for (let i = 0; nodeCount && i < nodeCount; i++) {
            this.#nodeItems = [];
            const node = this.kulData.nodes[i];
            this.#prepNode(node, 0);
            elements.push(h("div", { class: "node" }, this.#nodeItems));
        }
        return elements;
    }
    #prepDeleteIcon(node) {
        const path = getAssetPath(`./assets/svg/clear.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return (h("div", { class: "chip__icon chip__icon--trailing", "data-cy": KulDataCyAttributes.BUTTON, key: node.id + '_delete', onClick: (e) => {
                this.onKulEvent(e, 'delete', { node });
            }, style: style }));
    }
    #prepIcons(node) {
        const icons = [];
        const className = {
            chip__icon: true,
            'chip__icon--leading': true,
            'chip__icon--leading-hidden': this.kulStyling === 'filter' && this.#isSelected(node),
        };
        if (node.icon) {
            const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
            const style = {
                mask: `url('${path}') no-repeat center`,
                webkitMask: `url('${path}') no-repeat center`,
            };
            icons.push(h("div", { class: className, style: style }));
        }
        if (this.#isFilter()) {
            icons.push(h("span", { class: "chip__checkmark" }, h("svg", { class: "chip__checkmark-svg", viewBox: "-2 -3 30 30" }, h("path", { class: "chip__checkmark-path", fill: "none", stroke: "black", d: "M1.73,12.91 8.1,19.28 22.79,4.59" }))));
        }
        return icons;
    }
    #prepNode(node, indent) {
        const className = {
            'chip-wrapper': true,
            'chip-wrapper--hidden-children': this.#hasChildren(node) && !this.#showChildren(node),
        };
        const indentStyle = {
            ['--kul_chip_indent_offset']: indent.toString(),
        };
        this.#nodeItems.push(h("div", { class: className }, h("div", { class: "indent", style: indentStyle }), this.#hasChildren(node) ? (h("div", { class: `node__expand ${this.#isExpanded(node) ? 'node__expand--expanded' : ''}`, onClick: (e) => {
                this.onKulEvent(e, 'click', {
                    expansion: true,
                    node,
                });
            } })) : indent ? (h("div", { class: `node__expand node__expand--placeholder` })) : null, this.#prepChip(node, indent)));
        if (this.#showChildren(node)) {
            for (let index = 0; index < node.children.length; index++) {
                if (node.children[index]) {
                    this.#prepNode(node.children[index], indent + 1);
                }
            }
        }
    }
    #prepRipple(node) {
        if (this.kulRipple && this.#isClickable()) {
            return (h("div", { onPointerDown: (e) => this.onKulEvent(e, 'pointerdown', { node }), ref: (el) => {
                    if (el && this.kulRipple) {
                        this.#rippleSurface[node.id] = el;
                    }
                } }));
        }
    }
    #showChildren(node) {
        return this.expandedNodes.has(node);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#rippleSurface?.length) {
            this.#rippleSurface.forEach((el) => {
                this.#kulManager.theme.ripple.setup(el);
            });
        }
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
        this.#nodeItems = [];
        const className = {
            'chip-set': true,
            'chip-set--choice': this.#isChoice(),
            'chip-set--filter': this.#isFilter(),
            'chip-set--input': this.#isInput(),
        };
        return (h(Host, { key: 'e0c814860deb70f9b1df858853197679ce18489b' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '04998dc231ff6044010f1eb3908525093d804b9c', id: KUL_WRAPPER_ID }, h("div", { key: 'f6b9768ce4f9375ba49ed660b111a9d1937c6a7f', class: className, role: "grid" }, this.#prepChipSet()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulChip.style = KulChipStyle0;

var KulTabbarProps;
(function (KulTabbarProps) {
    KulTabbarProps["kulData"] = "Actual data of the component.";
    KulTabbarProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulTabbarProps["kulStyle"] = "Custom style of the component.";
    KulTabbarProps["kulValue"] = "Sets the initial selected node's index.";
})(KulTabbarProps || (KulTabbarProps = {}));

const kulTabbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_tabbar_backdrop_filter:var(--kul-tabbar-backdrop-filter, blur(3.5px));--kul_tabbar_backdrop_filter_hover:var(\n    --kul-tabbar-backdrop-filter-hover,\n    blur(5px)\n  );--kul_tabbar_font_size:var(--kul-tabbar-font-size, var(--kul-font-size));--kul_tabbar_font_weight:var(--kul-tabbar-font-weight, 500);--kul_tabbar_height:var(--kul-tabbar-height, 36px);--kul_tabbar_primary_color_rgb:var(\n    --kul-tabbar-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_tabbar_primary_color:var(\n    --kul-tabbar-primary-color,\n    var(--kul-primary-color)\n  );--kul_tabbar_tab_padding:var(--kul-tabbar-tab-padding, 0 24px);display:block;font-size:var(--kul_tabbar_font_size);width:100%}.tabbar{width:100%}.tabbar__scroller{height:var(--kul_tabbar_height);overflow-y:hidden}.tabbar__scroll-area{display:flex;overflow:auto;overflow-x:hidden}.tabbar__scroll-content{display:flex;flex:1 0 auto;position:relative;transform:none;will-change:transform}.tab{appearance:none;-webkit-backdrop-filter:var(--kul_tabbar_backdrop_filter);backdrop-filter:var(--kul_tabbar_backdrop_filter);background:none;border:none;box-sizing:border-box;color:var(--kul_tabbar_primary_color);cursor:pointer;display:flex;flex:1 0 auto;font-family:var(--kul_tabbar_font_family);font-size:0.875em;font-weight:var(--kul_tabbar_font_weight);height:var(--kul_tabbar_height);justify-content:center;letter-spacing:0.0892857143em;margin:0px;min-width:90px;outline:none;padding:var(--kul_tabbar_tab_padding);position:relative;text-align:center;text-transform:uppercase;white-space:nowrap;z-index:1}.tab:hover{-webkit-backdrop-filter:var(--kul_tabbar_backdrop_filter_hover);backdrop-filter:var(--kul_tabbar_backdrop_filter_hover);background-color:rgba(var(--kul_tabbar_primary_color_rgb), 0.075)}.tab--active .tab__icon{transition-delay:100ms}.tab--active .tab__text-label{transition-delay:100ms}.tab__icon{font-size:24px;height:24px;transition:color 150ms linear 0s;width:24px;z-index:2}.tab__icon.kul-icon{background-color:var(--kul_tabbar_primary_color);height:24px;width:24px}.tab__content{align-items:center;display:flex;height:inherit;justify-content:center;pointer-events:none;position:relative}.tab__text-label{color:var(--kul_tabbar_primary_color);display:inline-block;line-height:1;transition:color 150ms linear 0s;z-index:2}.tab__icon+.tab__text-label{padding-left:8px;padding-right:0px}.tab__indicator{display:flex;height:100%;justify-content:center;left:0px;pointer-events:none;position:absolute;top:0px;width:100%;z-index:1}.tab__indicator--active .tab__indicator-content{opacity:1}.tab__indicator-content{border-color:var(--kul_tabbar_primary_color);opacity:0;transform-origin:left center}.tab__indicator-content--underline{align-self:flex-end;border-top-style:solid;border-top-width:2px;box-sizing:border-box;transition:all 125ms cubic-bezier(0.4, 0, 0.2, 1) 0s;width:100%}";
const KulTabbarStyle0 = kulTabbarCss;

const KulTabbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-tabbar-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = null;
        this.kulData = null;
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulValue = null;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #rippleSurface;
    #scrollArea;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes events emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, index = 0, node) {
        if (eventType === 'pointerdown') {
            if (this.kulRipple) {
                this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface[index]);
            }
        }
        if (eventType === 'click') {
            this.value = {
                index,
                node,
            };
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
        return getProps(this, KulTabbarProps, descriptions);
    }
    /**
     * Returns the selected node and its index.
     * @returns {Promise<KulTabbarState>} Selected node and its index.
     */
    async getValue() {
        return this.value;
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Sets the value of the component based on the provided argument.
     * @param {number | string} value - The index of the node or the id of the node.
     * @returns {Promise<KulTabbarState>} The newly set value.
     */
    async setValue(value) {
        let index;
        let node;
        if (typeof value === 'number') {
            index = value;
            node = this.kulData.nodes[index];
        }
        else if (typeof value === 'string') {
            index = this.kulData.nodes.findIndex((node) => node.id === value);
            node = this.kulData.nodes[index];
        }
        this.value = {
            index,
            node,
        };
        return this.value;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        if (this.kulValue !== null) {
            this.value = this.kulData[this.kulValue];
        }
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#rippleSurface?.length) {
            this.#rippleSurface.forEach((el) => {
                this.#kulManager.theme.ripple.setup(el);
            });
        }
        if (this.#scrollArea) {
            this.#kulManager.scrollOnHover.register(this.#scrollArea);
        }
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        if (!this.#kulManager.data.node.exists(this.kulData)) {
            return;
        }
        this.#rippleSurface = [];
        const nodes = this.kulData.nodes;
        const elements = [];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const isActive = node === this.value?.node;
            const tabClass = {
                tab: true,
                'tab--active': isActive ? true : false,
            };
            elements.push(h("button", { "aria-selected": isActive ? true : false, class: tabClass, "data-cy": KulDataCyAttributes.BUTTON, onClick: (e) => {
                    this.onKulEvent(e, 'click', i, node);
                }, onPointerDown: (e) => {
                    this.onKulEvent(e, 'pointerdown', i, node);
                }, role: "tab", tabIndex: i, title: node.description ? node.description : null }, h("div", { ref: (el) => {
                    if (el && this.kulRipple) {
                        this.#rippleSurface.push(el);
                    }
                } }), h("span", { class: "tab__content" }, node.icon ? (h("kul-image", { class: "tab__icon", kulColor: `var(${KulThemeColorValues.PRIMARY})`, kulSizeX: "24px", kulSizeY: "24px", kulValue: node.icon })) : null, node.value ? (h("span", { class: "tab__text-label" }, node.value)) : null), h("span", { class: `tab__indicator ${isActive ? ' tab__indicator--active' : ''}` }, h("span", { class: "tab__indicator-content tab__indicator-content--underline" }))));
        }
        return (h(Host, null, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID }, h("div", { class: "tabbar", role: "tablist" }, h("div", { class: "tabbar_scroller" }, h("div", { class: "tabbar__scroll-area", ref: (el) => (this.#scrollArea =
                el) }, h("div", { class: "tabbar__scroll-content" }, elements)))))));
    }
    disconnectedCallback() {
        if (this.#scrollArea) {
            this.#kulManager.scrollOnHover.unregister(this.#scrollArea);
        }
        this.#kulManager.theme.unregister(this);
    }
};
KulTabbar.style = KulTabbarStyle0;

export { KulChip as kul_chip, KulTabbar as kul_tabbar };

//# sourceMappingURL=kul-chip_2.entry.js.map