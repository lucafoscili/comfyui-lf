import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-5c52ec0e.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-c48a993d.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulLazyProps;
(function (KulLazyProps) {
    KulLazyProps["kulComponentName"] = "Sets the tag name of the component to be lazy loaded.";
    KulLazyProps["kulComponentProps"] = "Sets the data of the component to be lazy loaded.";
    KulLazyProps["kulRenderMode"] = "Decides when the sub-component should be rendered. By default when both the component props exist and the component is in the viewport.";
    KulLazyProps["kulShowPlaceholder"] = "Displays an animated SVG placeholder until the component is loaded.";
    KulLazyProps["kulStyle"] = "Custom style of the component.";
})(KulLazyProps || (KulLazyProps = {}));

const kulLazyCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_lazy_animation_time:var(--kul-lazy-animation-time, 2s);--kul_lazy_height:var(--kul-lazy-height, 100%);--kul_lazy_hor_alignment:var(--kul-lazy-hor-alignment, center);--kul_lazy_placeholder_color:var(\n    --kul-lazy-placeholder-color,\n    var(--kul-icon-color)\n  );--kul_lazy_ver_alignment:var(--kul-lazy-ver-alignment, center);--kul_lazy_width:var(--kul-lazy-width, 100%);display:block;height:var(--kul_lazy_height);width:var(--kul_lazy_width);position:relative}#kul-component{align-items:var(--kul_lazy_ver_alignment);display:flex;justify-content:var(--kul_lazy_hor_alignment);height:var(--kul_lazy_height);width:var(--kul_lazy_width)}#kul-component>*{height:var(--kul_lazy_height)}#kul-component kul-data-table{min-width:100%}.kul-loaded,.kul-to-be-loaded{height:var(--kul_lazy_height);width:var(--kul_lazy_width)}svg{fill:var(--kul_lazy_placeholder_color);animation:shine ease var(--kul_lazy_animation_time) infinite}@keyframes shine{0%{opacity:0.4}50%{opacity:0.8}100%{opacity:0.4}}:host(.kul-bottom-aligned){--kul-lazy-ver-alignment:flex-end}:host(.kul-left-aligned){--kul-lazy-hor-alignment:flex-start}:host(.kul-right-aligned){--kul-lazy-hor-alignment:flex-end}:host(.kul-top-aligned){--kul-lazy-ver-alignment:flex-start}:host(.kul-to-be-loaded) #kul-component{position:absolute}:host(.kul-to-be-loaded) #kul-component>*{margin:auto}";
const KulLazyStyle0 = kulLazyCss;

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
var _KulLazy_instances, _KulLazy_kulManager, _KulLazy_intObserver, _KulLazy_lazyComponent, _KulLazy_lazyComponentLoaded, _KulLazy_setObserver;
const KulLazy = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-lazy-event", 6);
        _KulLazy_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulLazy_kulManager.set(this, kulManagerInstance());
        _KulLazy_intObserver.set(this, null);
        _KulLazy_lazyComponent.set(this, null);
        _KulLazy_lazyComponentLoaded.set(this, false);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.isInViewport = false;
        this.kulComponentName = "";
        this.kulComponentProps = null;
        this.kulRenderMode = "both";
        this.kulShowPlaceholder = true;
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
     * Returns the HTMLElement of the component to lazy load.
     * @returns {HTMLElement} Lazy loaded component.
     */
    async getComponent() {
        return __classPrivateFieldGet(this, _KulLazy_lazyComponent, "f");
    }
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
        return getProps(this, KulLazyProps, descriptions);
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
        this.rootElement.addEventListener(`${this.kulComponentName}-event`, (e) => {
            this.onKulEvent(e, "kul-event");
        });
        __classPrivateFieldGet(this, _KulLazy_kulManager, "f").theme.register(this);
        __classPrivateFieldGet(this, _KulLazy_instances, "m", _KulLazy_setObserver).call(this);
    }
    componentDidLoad() {
        __classPrivateFieldGet(this, _KulLazy_intObserver, "f").observe(this.rootElement);
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulLazy_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulLazy_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        if (__classPrivateFieldGet(this, _KulLazy_lazyComponent, "f") && !__classPrivateFieldGet(this, _KulLazy_lazyComponentLoaded, "f")) {
            __classPrivateFieldSet(this, _KulLazy_lazyComponentLoaded, true, "f");
            this.onKulEvent(new CustomEvent("load"), "load");
        }
        __classPrivateFieldGet(this, _KulLazy_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        let content;
        let resource;
        let className = this.kulComponentName;
        switch (this.kulComponentName) {
            case "kul-button":
                //call_to_action.svg
                resource = (h("svg", { key: 'b119c68ef1cb9fb1d5467195ceb692ab99f01c16', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '873c56cb3c5220d1bf16b97bd661320d90e174b8', d: "M42 6H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm0 32H6v-6h36v6z" })));
                break;
            case "kul-card":
                //art_track.svg
                resource = (h("svg", { key: '027c2afe0b1be892dc95392f56789a44c857d9f1', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: 'f5fed4cae39ebe4ee0e90ca12570db1774e1649a', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
            case "kul-checkbox":
                //check_box_outline_blank.svg
                resource = (h("svg", { key: 'e4ae9209c311e0b895db3c58c8b8684f143d88d0', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '247d8dbaaa779078b82add934580bdae74f59359', d: "M38 10v28H10V10h28m0-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z" })));
                break;
            case "kul-chart":
                //chart-bar.svg
                resource = (h("svg", { key: '8ad6a0074ec4e00b38636e5fce1836a929b49a81', xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "100%", height: "100%", viewBox: "0 0 24 24" }, h("path", { key: '90f9b99c9c75870ed98b69a3afb68eb5586eb667', d: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" })));
                break;
            case "kul-image":
                //photo.svg
                resource = (h("svg", { key: '2a63e4a5f4c833316e80c2918fffbd7ddbc61458', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '7f438a6eddbbad20427dd74d745560f9c37bd8fe', d: "M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" })));
                break;
            default:
                //art_track.svg
                resource = (h("svg", { key: 'f5d2ada88bc6dbef1bbc86d627d408a5afffe4d1', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '3dc07dbaba070c3aa6075984c75a0260b63c8166', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
        }
        if ((this.kulRenderMode === "viewport" && this.isInViewport) ||
            (this.kulRenderMode === "props" && this.kulComponentProps) ||
            (this.kulRenderMode === "both" &&
                this.kulComponentProps &&
                this.isInViewport)) {
            const Tag = this.kulComponentName;
            content = (h(Tag, { key: 'ce228478dccff3c89d86abed17d8398f3a4484ba', ...this.kulComponentProps, ref: (el) => (__classPrivateFieldSet(this, _KulLazy_lazyComponent, el, "f")) }));
            className += " kul-loaded";
        }
        else if (this.kulShowPlaceholder) {
            content = resource;
            className += " kul-to-be-loaded";
        }
        return (h(Host, { key: '8cc810ddc8052e9130851beb25f5bb8f7b9b7d79', class: className }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulLazy_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'a1fbdb8121cc965658fd8daa1023ff6fcc986df8', id: KUL_WRAPPER_ID }, content)));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulLazy_kulManager, "f").theme.unregister(this);
        __classPrivateFieldGet(this, _KulLazy_intObserver, "f")?.unobserve(this.rootElement);
    }
    get rootElement() { return getElement(this); }
};
_KulLazy_kulManager = new WeakMap(), _KulLazy_intObserver = new WeakMap(), _KulLazy_lazyComponent = new WeakMap(), _KulLazy_lazyComponentLoaded = new WeakMap(), _KulLazy_instances = new WeakSet(), _KulLazy_setObserver = function _KulLazy_setObserver() {
    const callback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                __classPrivateFieldGet(this, _KulLazy_kulManager, "f").debug.logs.new(this, "kul-lazy entering the viewport, rendering " +
                    this.kulComponentName +
                    ".");
                this.isInViewport = true;
                __classPrivateFieldGet(this, _KulLazy_intObserver, "f").unobserve(this.rootElement);
            }
        });
    };
    const options = {
        threshold: 0.25,
    };
    __classPrivateFieldSet(this, _KulLazy_intObserver, new IntersectionObserver(callback, options), "f");
};
KulLazy.style = KulLazyStyle0;

export { KulLazy as kul_lazy };

//# sourceMappingURL=kul-lazy.entry.js.map