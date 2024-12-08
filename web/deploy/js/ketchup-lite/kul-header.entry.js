import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-5c52ec0e.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-c48a993d.js';
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

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulHeader_kulManager;
const KulHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-header-event", 6);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulHeader_kulManager.set(this, kulManagerInstance());
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulStyle = "";
    }
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
            this.onKulEvent(new CustomEvent("unmount"), "unmount");
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulHeader_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulHeader_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulHeader_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulHeader_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        return (h(Host, { key: '3f219e7b4d0d4c74adee85bced563f698158d6aa', class: "header" }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulHeader_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'eb8f823ab6fc236026690417e4d160ff54b6cda5', id: KUL_WRAPPER_ID }, h("header", { key: 'fb3997972ef23a6bd89c90ea29a6956867bb646f', class: "header" }, h("section", { key: 'c47fc704f10fe684b92c6108ca333df0e530d0d4', class: "header__section" }, h("slot", { key: '75afb40ff145dd0aa0c4fa8615fe61a4aedd1cdb', name: "content" }))))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulHeader_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
};
_KulHeader_kulManager = new WeakMap();
KulHeader.style = KulHeaderStyle0;

export { KulHeader as kul_header };

//# sourceMappingURL=kul-header.entry.js.map