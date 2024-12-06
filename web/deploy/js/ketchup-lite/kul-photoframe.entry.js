import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-64e8bec6.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulPhotoframeProps;
(function (KulPhotoframeProps) {
    KulPhotoframeProps["kulPlaceholder"] = "Html attributes of the picture before the component enters the viewport.";
    KulPhotoframeProps["kulStyle"] = "Custom style of the component.";
    KulPhotoframeProps["kulThreshold"] = "Percentage of the component's dimensions entering the viewport (0.1 => 1)";
    KulPhotoframeProps["kulValue"] = "Html attributes of the picture after the component enters the viewport.";
})(KulPhotoframeProps || (KulPhotoframeProps = {}));
//#endregion

const kulPhotoframeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_photoframe_border:var(\n    --kul-photoframe-border,\n    1px inset var(--kul-border-color)\n  );--kul_photoframe_fade_out_time:var(--kul-photoframe-fade-out-time, 2000ms);border:var(--kul_photoframe_border);display:block;height:100%;position:relative;width:100%}#kul-component{position:relative;height:100%;width:100%}img{max-height:100%;max-width:100%}.horizontal img{width:100%}.vertical img{height:100%}.placeholder{display:none;transition:opacity var(--kul_photoframe_fade_out_time) ease-out;will-change:opacity;z-index:1}.placeholder--loaded{display:block}.placeholder--fade-out{opacity:0;position:absolute}.value{display:none;left:0;position:absolute;top:0;z-index:0}.value--fade-in{display:block;position:relative}:host(.kul-fit) img{height:100%;object-fit:cover;width:100%}";
const KulPhotoframeStyle0 = kulPhotoframeCss;

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
var _KulPhotoframe_instances, _KulPhotoframe_intObserver, _KulPhotoframe_kulManager, _KulPhotoframe_placeholderEl, _KulPhotoframe_valueEl, _KulPhotoframe_renderValue, _KulPhotoframe_wrapperEl, _KulPhotoframe_setObserver;
const KulPhotoframe = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-photoframe-event", 6);
        _KulPhotoframe_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulPhotoframe_intObserver.set(this, void 0);
        _KulPhotoframe_kulManager.set(this, kulManagerInstance());
        _KulPhotoframe_placeholderEl.set(this, void 0);
        _KulPhotoframe_valueEl.set(this, void 0);
        _KulPhotoframe_renderValue.set(this, false);
        _KulPhotoframe_wrapperEl.set(this, void 0);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.isInViewport = false;
        this.kulPlaceholder = null;
        this.kulStyle = "";
        this.kulThreshold = 0.25;
        this.kulValue = null;
    }
    onKulEvent(e, eventType, isPlaceholder = false) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
            isPlaceholder,
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
        return getProps(this, KulPhotoframeProps, descriptions);
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
        __classPrivateFieldGet(this, _KulPhotoframe_kulManager, "f").theme.register(this);
        __classPrivateFieldGet(this, _KulPhotoframe_instances, "m", _KulPhotoframe_setObserver).call(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulPhotoframe_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulPhotoframe_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulPhotoframe_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        if (this.isInViewport && !__classPrivateFieldGet(this, _KulPhotoframe_renderValue, "f")) {
            __classPrivateFieldSet(this, _KulPhotoframe_renderValue, true, "f");
        }
        return (h(Host, { key: 'b3419d861378627c228f3fd21305e58a9c63caf2' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulPhotoframe_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'fd7e1d10b29202f53532e43eb3106f15e79f2c2b', id: KUL_WRAPPER_ID, ref: (el) => {
                __classPrivateFieldSet(this, _KulPhotoframe_wrapperEl, el, "f");
            } }, h("img", { key: '5f2bdfdcd9c9e2df232b2737602b39e5faf5a9ca', ...this.kulPlaceholder, class: "placeholder", ref: (el) => (__classPrivateFieldSet(this, _KulPhotoframe_placeholderEl, el, "f")), onLoad: (e) => {
                if (__classPrivateFieldGet(this, _KulPhotoframe_placeholderEl, "f").naturalWidth >
                    __classPrivateFieldGet(this, _KulPhotoframe_placeholderEl, "f").naturalHeight) {
                    __classPrivateFieldGet(this, _KulPhotoframe_wrapperEl, "f").classList.add("horizontal");
                }
                else {
                    __classPrivateFieldGet(this, _KulPhotoframe_wrapperEl, "f").classList.add("vertical");
                }
                __classPrivateFieldGet(this, _KulPhotoframe_intObserver, "f").observe(this.rootElement);
                __classPrivateFieldGet(this, _KulPhotoframe_placeholderEl, "f").classList.add("placeholder--loaded");
                this.onKulEvent(e, "load", true);
            } }), __classPrivateFieldGet(this, _KulPhotoframe_renderValue, "f") ? (h("img", { ...this.kulValue, class: "value", ref: (el) => (__classPrivateFieldSet(this, _KulPhotoframe_valueEl, el, "f")), onLoad: (e) => {
                __classPrivateFieldGet(this, _KulPhotoframe_placeholderEl, "f").classList.add("placeholder--fade-out");
                __classPrivateFieldGet(this, _KulPhotoframe_valueEl, "f").classList.add("value--fade-in");
                this.onKulEvent(e, "load");
            } })) : null)));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulPhotoframe_kulManager, "f").theme.unregister(this);
        __classPrivateFieldGet(this, _KulPhotoframe_intObserver, "f")?.unobserve(this.rootElement);
    }
    get rootElement() { return getElement(this); }
};
_KulPhotoframe_intObserver = new WeakMap(), _KulPhotoframe_kulManager = new WeakMap(), _KulPhotoframe_placeholderEl = new WeakMap(), _KulPhotoframe_valueEl = new WeakMap(), _KulPhotoframe_renderValue = new WeakMap(), _KulPhotoframe_wrapperEl = new WeakMap(), _KulPhotoframe_instances = new WeakSet(), _KulPhotoframe_setObserver = function _KulPhotoframe_setObserver() {
    const callback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.isInViewport = true;
                __classPrivateFieldGet(this, _KulPhotoframe_intObserver, "f").unobserve(this.rootElement);
            }
        });
    };
    const options = {
        threshold: this.kulThreshold,
    };
    __classPrivateFieldSet(this, _KulPhotoframe_intObserver, new IntersectionObserver(callback, options), "f");
};
KulPhotoframe.style = KulPhotoframeStyle0;

export { KulPhotoframe as kul_photoframe };

//# sourceMappingURL=kul-photoframe.entry.js.map