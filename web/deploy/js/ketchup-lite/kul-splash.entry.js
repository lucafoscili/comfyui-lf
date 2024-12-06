import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-64e8bec6.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulSplashProps;
(function (KulSplashProps) {
    KulSplashProps["kulLabel"] = "The text displayed inside the badge.";
    KulSplashProps["kulStyle"] = "Custom style of the component.";
})(KulSplashProps || (KulSplashProps = {}));

const kulSplashCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_splash_label_color:var(\n    --kul-splash-label-color,\n    var(--kul-text-color)\n  );--kul_splash_font_family:var(\n    --kul-splash-font-family,\n    var(--kul-font-family)\n  );--kul_splash_font_size:var(--kul-splash-font-size, var(--kul-font-size));--kul_splash_background_color:var(\n    --kul-splash-background-color,\n    var(--kul-background-color)\n  );--kul_splash_label_display:var(--kul-splash-label-display, block);--kul_splash_widget_color:var(\n    --kul-splash-widget-color,\n    var(--kul-primary-color)\n  );--kul_splash_widget_height:var(--kul-splash-widget-height, 150px);--kul_splash_widget_width:var(--kul-splash-widget-width, 150px)}.modal{--kul-spinner-color:var(--kul_splash_widget_color);background:var(--kul_splash_background_color);display:flex;height:100dvh;left:0;opacity:1;position:fixed;top:0;transition:opacity 0.5s ease-out;width:100dvw;z-index:999}.modal.active{opacity:0}.wrapper{margin:auto}.widget{height:var(--kul_splash_widget_height);margin:auto;width:var(--kul_splash_widget_width)}.label{color:var(--kul_splash_label_color);display:var(--kul_splash_label_display);font-family:var(--kul_splash_font_family);font-size:var(--kul_splash_font_size);font-weight:bold;letter-spacing:2px;text-align:center}";
const KulSplashStyle0 = kulSplashCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulSplash_kulManager;
const KulSplash = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-splash-event", 6);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulSplash_kulManager.set(this, kulManagerInstance());
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.state = "initializing";
        this.kulLabel = "Loading...";
        this.kulStyle = "";
    }
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
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
        return getProps(this, KulSplashProps, descriptions);
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
    async unmount(ms = 575) {
        setTimeout(() => {
            this.state = "unmounting";
            setTimeout(() => {
                this.onKulEvent(new CustomEvent("unmount"), "unmount");
                this.rootElement.remove();
            }, 300);
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulSplash_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulSplash_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulSplash_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulSplash_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        return (h(Host, { key: '75c0b466ce0a23ad0a0f334eb446d7b16ffce755' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulSplash_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'b022ff4edd100f3f380f9d024b84b86667d3693e', id: KUL_WRAPPER_ID }, h("div", { key: '14457486eafcd7de0c7117dae9df765c318e6e78', class: "modal" + (this.state === "unmounting" ? " active" : "") }, h("div", { key: '12e4f43b5b1d432717e2aad90118c8f25ad6d851', class: "wrapper" }, h("div", { key: '92c47dfde16527765683540ebb042d138b7d49e2', class: "widget" }, h("slot", { key: '7105805a96fc4c98b19400f3a394f5090dec23a3' })), h("div", { key: '5ef4513655b7d32cfe0910a69c0c2aed12e20056', class: "label" }, this.state === "unmounting" ? "Ready!" : this.kulLabel))))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulSplash_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
};
_KulSplash_kulManager = new WeakMap();
KulSplash.style = KulSplashStyle0;

export { KulSplash as kul_splash };

//# sourceMappingURL=kul-splash.entry.js.map