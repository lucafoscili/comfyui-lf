import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-caaff688.js';

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

const kulToastCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_toast_accent_color:var(\n    --kul-toast-accent-color,\n    var(--kul-info-color)\n  );--kul_toast_accent_height:var(--kul-toast-accent-height, 4px);--kul_toast_icon_opacity:var(--kul-toast-icon-opacity, 0.625);--kul_toast_slidein_from:var(--kul-toast-slidein-from, translateX(100%));--kul_toast_slidein_to:var(--kul-toast-slidein-to, translateX(0));animation:slideIn 250ms ease-out;-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);background-color:rgba(var(--kul-background-color-rgb), 0.375);border-radius:4px;box-shadow:var(--kul-box-shadow);box-sizing:border-box;display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}.toast{height:100%;width:100%}.toast__accent{background-color:var(--kul_toast_accent_color);height:var(--kul_toast_accent_height);width:100%}.toast__accent--temporary{animation:reduceWidthToZero linear 5s forwards}.toast__message-wrapper{align-content:center;box-sizing:border-box;display:flex;height:100%;padding:12px}.toast__icon{margin:auto 8px;opacity:var(--kul_toast_icon_opacity)}.toast__icon--close{cursor:pointer;margin:auto 8px auto auto;position:relative}.toast__icon--close:hover:before{background-color:rgba(var(--kul-danger-color-rgb), 0.175);border-radius:50%;content:\"\";left:-3px;padding:12px;position:absolute;top:-3px}.toast__message{padding:12px 12px 12px 0}@media only screen and (max-width: 600px){.host{animation:slideUp 250ms ease-out}}@keyframes reduceWidthToZero{0%{width:100%}100%{width:0}}@keyframes slideIn{0%{transform:var(--kul_toast_slidein_from)}100%{transform:var(--kul_toast_slidein_to)}}@keyframes slideUp{0%{transform:var(--kul_toast_slideup_from)}100%{transform:var(--kul_toast_slideup_to)}}";
const KulToastStyle0 = kulToastCss;

const KulToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-toast-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulCloseIcon = {
            kulSizeX: '18px',
            kulSizeY: '18px',
            kulValue: 'clear',
        };
        this.kulCloseCallback = () => {
            const e = new CustomEvent('unmount');
            this.onKulEvent(e, 'unmount');
            this.kulEvent.emit({
                comp: this,
                eventType: 'unmount',
                id: this.rootElement.id,
                originalEvent: e,
            });
            this.rootElement.remove();
        };
        this.kulIcon = {
            kulSizeX: '18px',
            kulSizeY: '18px',
            kulValue: 'info',
        };
        this.kulTimer = null;
        this.kulMessage = 'Wow, such empty.';
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
        return getProps(this, KulToastProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
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
        if (this.kulTimer) {
            setTimeout(() => { }, this.kulTimer);
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: 'aa1174da66b7abe4d2d5a7b2f7ba9061e6a3face' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'dc493b00f56a6ba053faf494444edb966981fe7a', id: KUL_WRAPPER_ID }, h("div", { key: '4cf86b53fb679f3b94c5d3358049b9a7c0f9d5b4', class: "toast" }, h("div", { key: '1189f66a19bd5bc68dc22ec2b646e0fab7a7a58b', class: `toast__accent ${this.kulTimer ? 'toast__accent--temporary' : ''}` }), h("div", { key: '6171f5ba15ba4a75534ba5b93fb55069929b1f00', class: "toast__message-wrapper" }, this.kulIcon ? (h("div", { class: "toast__icon" }, h("kul-image", { ...this.kulIcon }))) : undefined, this.kulMessage ? (h("div", { class: "toast__message" }, this.kulMessage)) : undefined, this.kulCloseIcon ? (h("div", { class: "toast__icon toast__icon--close", onClick: () => this.kulCloseCallback() }, h("kul-image", { ...this.kulCloseIcon }))) : undefined)))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulToast.style = KulToastStyle0;

export { KulToast as kul_toast };

//# sourceMappingURL=kul-toast.entry.js.map