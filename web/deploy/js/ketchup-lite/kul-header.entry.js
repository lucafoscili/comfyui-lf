import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-4ebcb21f.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-0684a7cb.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulHeaderProps;
(function (KulHeaderProps) {
    KulHeaderProps["kulStyle"] = "Custom style of the component.";
})(KulHeaderProps || (KulHeaderProps = {}));

const kulHeaderCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_header_box_shadow:var(\n    --kul-header-box-shadow,\n    0 2px 4px -1px rgba(128, 128, 128, 0.2),\n    0 4px 5px 0 rgba(128, 128, 128, 0.14),\n    0 1px 10px 0 rgba(128, 128, 128, 0.12)\n  );--kul_header_padding:var(--kul-header-padding, 8px 12px);--kul_header_position:var(--kul-header-position, fixed);--kul_header_transition:var(--kul-header-transition, 250ms);--kul_header_width:var(--kul-header-width, 100%);box-sizing:border-box;font-size:var(--kul-font-size);left:0;position:var(--kul_header_position);top:0;transition:all var(--kul_header_transition);width:var(--kul_header_width);z-index:var(--kul-header-zindex)}#kul-component{width:var(--kul_header_width)}.header{background-color:var(--kul-header-background-color);box-shadow:var(--kul_header_box_shadow);box-sizing:border-box;color:var(--kul-header-color);display:flex;flex-direction:column;justify-content:space-between;padding:var(--kul_header_padding);width:var(--kul_header_width)}.header__section{box-sizing:border-box;display:flex;height:var(--kul-header-height);position:relative;width:var(--kul_header_width)}";
const KulHeaderStyle0 = kulHeaderCss;

const KulHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-header-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulHeaderProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
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
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
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
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: 'c1f6fe857fd24d5434e77f8e9e439a95a8ed1f77', class: "header" }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '2f42eb90474cd41b4e3a8972a2a874392c9e6472', id: KUL_WRAPPER_ID }, h("header", { key: 'aa704b7fab3dd89592322cc69c37f4f08ba45256', class: "header" }, h("section", { key: '13a423365bec829c6bf69c07612c88b88839ce65', class: "header__section" }, h("slot", { key: 'be40f140906603e0c02f1365be97126b22cd5662', name: "content" }))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulHeader.style = KulHeaderStyle0;

export { KulHeader as kul_header };

//# sourceMappingURL=kul-header.entry.js.map