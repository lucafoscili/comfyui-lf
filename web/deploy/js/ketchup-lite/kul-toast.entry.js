import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-64e8bec6.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulToastProps;
(function (KulToastProps) {
    KulToastProps["kulCloseCallback"] = "Callback invoked when the toast is closed.";
    KulToastProps["kulCloseIcon"] = "Sets the props of the clickable icon used to close the toast.";
    KulToastProps["kulIcon"] = "Sets the props of an optional icon that will be displayed along with the message.";
    KulToastProps["kulMessage"] = "Sets the message of the toast.";
    KulToastProps["kulStyle"] = "Enables customization of the component's style.";
    KulToastProps["kulTimer"] = "When kulTimer is set with a number, the toast will close itself after the specified amount of time (in ms).";
})(KulToastProps || (KulToastProps = {}));

const kulToastCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_toast_accent_color:var(\n    --kul-toast-accent-color,\n    var(--kul-info-color)\n  );--kul_toast_accent_height:var(--kul-toast-accent-height, 4px);--kul_toast_icon_opacity:var(--kul-toast-icon-opacity, 0.625);--kul_toast_slidein_from:var(--kul-toast-slidein-from, translateX(100%));--kul_toast_slidein_to:var(--kul-toast-slidein-to, translateX(0));animation:slideIn 250ms ease-out;-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);background-color:rgba(var(--kul-background-color-rgb), 0.375);border-radius:4px;box-shadow:var(--kul-box-shadow);box-sizing:border-box;display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}.toast{height:100%;width:100%}.toast__accent{background-color:var(--kul_toast_accent_color);height:var(--kul_toast_accent_height);width:100%}.toast__accent--temporary{animation:reduceWidthToZero linear 5s forwards}.toast__message-wrapper{align-content:center;box-sizing:border-box;display:flex;height:100%;padding:12px}.toast__icon{margin:auto 8px;opacity:var(--kul_toast_icon_opacity)}.toast__icon--close{cursor:pointer;margin:auto 8px auto auto;position:relative}.toast__icon--close:hover:before{background-color:rgba(var(--kul-danger-color-rgb), 0.175);border-radius:50%;content:\"\";left:-3px;padding:12px;position:absolute;top:-3px}.toast__message{padding:12px 12px 12px 0}@media only screen and (max-width: 600px){.host{animation:slideUp 250ms ease-out}}@keyframes reduceWidthToZero{0%{width:100%}100%{width:0}}@keyframes slideIn{0%{transform:var(--kul_toast_slidein_from)}100%{transform:var(--kul_toast_slidein_to)}}@keyframes slideUp{0%{transform:var(--kul_toast_slideup_from)}100%{transform:var(--kul_toast_slideup_to)}}";
const KulToastStyle0 = kulToastCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulToast_kulManager;
const KulToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-toast-event", 6);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulToast_kulManager.set(this, kulManagerInstance());
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulCloseIcon = {
            kulSizeX: "18px",
            kulSizeY: "18px",
            kulValue: "clear",
        };
        this.kulCloseCallback = () => {
            this.rootElement.remove();
        };
        this.kulIcon = {
            kulSizeX: "18px",
            kulSizeY: "18px",
            kulValue: "info",
        };
        this.kulTimer = null;
        this.kulMessage = "Wow, such empty.";
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
        return getProps(this, KulToastProps, descriptions);
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
        __classPrivateFieldGet(this, _KulToast_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulToast_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulToast_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        if (this.kulTimer) {
            setTimeout(() => { }, this.kulTimer);
        }
        __classPrivateFieldGet(this, _KulToast_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        return (h(Host, { key: '2dbf1ca55ca7743fef2e3a7df5f5095dc9ad66e8' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulToast_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: '0e3a1f31d73b1fa5d0c018450196c62b8287bed5', id: KUL_WRAPPER_ID }, h("div", { key: '9ef5765571bae955638ec36ee031b60eb95e5d76', class: "toast" }, h("div", { key: '3b5694576f4b585c0b1246a33146124ac6465274', class: `toast__accent ${this.kulTimer ? "toast__accent--temporary" : ""}` }), h("div", { key: '7b6f15d93202333aac150c16e5bb90f88554fb46', class: "toast__message-wrapper" }, this.kulIcon ? (h("div", { class: "toast__icon" }, h("kul-image", { ...this.kulIcon }))) : undefined, this.kulMessage ? (h("div", { class: "toast__message" }, this.kulMessage)) : undefined, this.kulCloseIcon ? (h("div", { class: "toast__icon toast__icon--close", onClick: () => this.kulCloseCallback() }, h("kul-image", { ...this.kulCloseIcon }))) : undefined)))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulToast_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
};
_KulToast_kulManager = new WeakMap();
KulToast.style = KulToastStyle0;

export { KulToast as kul_toast };

//# sourceMappingURL=kul-toast.entry.js.map