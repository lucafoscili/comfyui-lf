import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-7cf82e95.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-72505221.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulHeaderProps;
(function (KulHeaderProps) {
    KulHeaderProps["kulStyle"] = "Custom style of the component.";
})(KulHeaderProps || (KulHeaderProps = {}));
//#endregion

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
    //#endregion
    //#region Internal variables
    #kulManager = kulManagerInstance();
    //#endregion
    //#region Events
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
        });
    }
    //#endregion
    //#region Public methods
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
    //#endregion
    //#region Lifecycle hooks
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
        return (h(Host, { key: '89b8d8d920fb7a728ecb5a8b7f4cade0f5f47398', class: "header" }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'e9707b2080cc1c46c53ce6d3efeb6485d32debb1', id: KUL_WRAPPER_ID }, h("header", { key: '3d768c91551fa9dbd75bf722b747a6f8ecfb4002', class: "header" }, h("section", { key: 'bc49c43c055b956caa920882c13a946321e5754a', class: "header__section" }, h("slot", { key: '1236e9a1a1865ee087c6c1486ce149ea2d6a8f7d', name: "content" }))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulHeader.style = KulHeaderStyle0;

export { KulHeader as kul_header };

//# sourceMappingURL=kul-header.entry.js.map