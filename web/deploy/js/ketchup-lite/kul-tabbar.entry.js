import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-9570d2db.js';
import { k as kulManagerInstance, g as getProps, K as KulThemeColorValues } from './kul-manager-18eb90c7.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';
import { K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './GenericVariables-0efba181.js';

var KulTabbarProps;
(function (KulTabbarProps) {
    KulTabbarProps["kulData"] = "Actual data of the component.";
    KulTabbarProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulTabbarProps["kulStyle"] = "Custom style of the component.";
    KulTabbarProps["kulValue"] = "Sets the initial selected node's index.";
})(KulTabbarProps || (KulTabbarProps = {}));

const kulTabbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_tabbar_backdrop_filter:var(--kul-tabbar-backdrop-filter, blur(3.5px));--kul_tabbar_backdrop_filter_hover:var(\n    --kul-tabbar-backdrop-filter-hover,\n    blur(5px)\n  );--kul_tabbar_font_size:var(--kul-tabbar-font-size, var(--kul-font-size));--kul_tabbar_font_weight:var(--kul-tabbar-font-weight, 500);--kul_tabbar_height:var(--kul-tabbar-height, 36px);--kul_tabbar_primary_color_rgb:var(\n    --kul-tabbar-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_tabbar_primary_color:var(\n    --kul-tabbar-primary-color,\n    var(--kul-primary-color)\n  );--kul_tabbar_tab_padding:var(--kul-tabbar-tab-padding, 0 24px);display:block;font-size:var(--kul_tabbar_font_size);width:100%}.tabbar{width:100%}.tabbar__scroller{height:var(--kul_tabbar_height);overflow-y:hidden}.tabbar__scroll-area{display:flex;overflow:auto;overflow-x:hidden}.tabbar__scroll-content{display:flex;flex:1 0 auto;position:relative;transform:none;will-change:transform}.tab{appearance:none;-webkit-backdrop-filter:var(--kul_tabbar_backdrop_filter);backdrop-filter:var(--kul_tabbar_backdrop_filter);background:none;border:none;box-sizing:border-box;color:var(--kul_tabbar_primary_color);cursor:pointer;display:flex;flex:1 0 auto;font-family:var(--kul_tabbar_font_family);font-size:0.875em;font-weight:var(--kul_tabbar_font_weight);height:var(--kul_tabbar_height);justify-content:center;letter-spacing:0.0892857143em;margin:0px;min-width:90px;outline:none;padding:var(--kul_tabbar_tab_padding);position:relative;text-align:center;text-transform:uppercase;white-space:nowrap;z-index:1}.tab:hover{-webkit-backdrop-filter:var(--kul_tabbar_backdrop_filter_hover);backdrop-filter:var(--kul_tabbar_backdrop_filter_hover);background-color:rgba(var(--kul_tabbar_primary_color_rgb), 0.075)}.tab--active .tab__icon{transition-delay:100ms}.tab--active .tab__text-label{transition-delay:100ms}.tab__icon{font-size:24px;height:24px;transition:color 150ms linear 0s;width:24px;z-index:2}.tab__icon.kul-icon{background-color:var(--kul_tabbar_primary_color);height:24px;width:24px}.tab__content{align-items:center;display:flex;height:inherit;justify-content:center;pointer-events:none;position:relative}.tab__text-label{color:var(--kul_tabbar_primary_color);display:inline-block;line-height:1;transition:color 150ms linear 0s;z-index:2}.tab__icon+.tab__text-label{padding-left:8px;padding-right:0px}.tab__indicator{display:flex;height:100%;justify-content:center;left:0px;pointer-events:none;position:absolute;top:0px;width:100%;z-index:1}.tab__indicator--active .tab__indicator-content{opacity:1}.tab__indicator-content{border-color:var(--kul_tabbar_primary_color);opacity:0;transform-origin:left center}.tab__indicator-content--underline{align-self:flex-end;border-top-style:solid;border-top-width:2px;box-sizing:border-box;transition:all 125ms cubic-bezier(0.4, 0, 0.2, 1) 0s;width:100%}";
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

export { KulTabbar as kul_tabbar };
