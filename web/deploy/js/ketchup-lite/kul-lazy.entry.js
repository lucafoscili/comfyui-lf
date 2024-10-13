import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-6e71b245.js';

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

const kulLazyCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_lazy_animation_time:var(--kul-lazy-animation-time, 2s);--kul_lazy_height:var(--kul-lazy-height, 100%);--kul_lazy_hor_alignment:var(--kul-lazy-hor-alignment, center);--kul_lazy_placeholder_color:var(\n    --kul-lazy-placeholder-color,\n    var(--kul-icon-color)\n  );--kul_lazy_ver_alignment:var(--kul-lazy-ver-alignment, center);--kul_lazy_width:var(--kul-lazy-width, 100%);display:block;height:var(--kul_lazy_height);width:var(--kul_lazy_width);position:relative}#kul-component{align-items:var(--kul_lazy_ver_alignment);display:flex;justify-content:var(--kul_lazy_hor_alignment);height:var(--kul_lazy_height);width:var(--kul_lazy_width)}#kul-component>*{height:var(--kul_lazy_height)}#kul-component kul-data-table{min-width:100%}.kul-loaded,.kul-to-be-loaded{height:var(--kul_lazy_height);width:var(--kul_lazy_width)}svg{fill:var(--kul_lazy_placeholder_color);animation:shine ease var(--kul_lazy_animation_time) infinite}@keyframes shine{0%{opacity:0.4}50%{opacity:0.8}100%{opacity:0.4}}:host(.kul-bottom-aligned){--kul-lazy-ver-alignment:flex-end}:host(.kul-left-aligned){--kul-lazy-hor-alignment:flex-start}:host(.kul-right-aligned){--kul-lazy-hor-alignment:flex-end}:host(.kul-top-aligned){--kul-lazy-ver-alignment:flex-start}:host(.kul-to-be-loaded) #kul-component{position:absolute}:host(.kul-to-be-loaded) #kul-component>*{margin:auto}";
const KulLazyStyle0 = kulLazyCss;

const KulLazy = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-lazy-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.isInViewport = false;
        this.kulComponentName = '';
        this.kulComponentProps = null;
        this.kulRenderMode = 'both';
        this.kulShowPlaceholder = true;
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #intObserver = null;
    #lazyComponent = null;
    #lazyComponentLoaded = false;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes the component's events.
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
     * Returns the HTMLElement of the component to lazy load.
     * @returns {HTMLElement} Lazy loaded component.
     */
    async getComponent() {
        return this.#lazyComponent;
    }
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
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
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #setObserver() {
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.#kulManager.debug.logMessage(this, 'kul-lazy entering the viewport, rendering ' +
                        this.kulComponentName +
                        '.');
                    this.isInViewport = true;
                    this.#intObserver.unobserve(this.rootElement);
                }
            });
        };
        const options = {
            threshold: 0.25,
        };
        this.#intObserver = new IntersectionObserver(callback, options);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.rootElement.addEventListener(`${this.kulComponentName}-event`, (e) => {
            this.onKulEvent(e, 'kul-event');
        });
        this.#kulManager.theme.register(this);
        this.#setObserver();
    }
    componentDidLoad() {
        this.#intObserver.observe(this.rootElement);
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        if (this.#lazyComponent && !this.#lazyComponentLoaded) {
            this.#lazyComponentLoaded = true;
            this.onKulEvent(new CustomEvent('load'), 'load');
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        let content;
        let resource;
        let className = this.kulComponentName;
        switch (this.kulComponentName) {
            case 'kul-button':
                //call_to_action.svg
                resource = (h("svg", { key: 'c9b19daed8dbbf9d2f40a68755af851e292d983d', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '9716557e28ec116520fa45a1adc34d6207f18060', d: "M42 6H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm0 32H6v-6h36v6z" })));
                break;
            case 'kul-card':
                //art_track.svg
                resource = (h("svg", { key: '717fe4fe5a37a5852797f7c1b20c87186f165eb0', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '77798a08c6ceecee9d78229f544273aaeb2142b0', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
            case 'kul-checkbox':
                //check_box_outline_blank.svg
                resource = (h("svg", { key: '25101194edf8d70b4dcec38bb05be79e22938ec8', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: 'bac417050d41cecd4480b63f8fd22b522e1d2e49', d: "M38 10v28H10V10h28m0-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z" })));
                break;
            case 'kul-chart':
                //chart-bar.svg
                resource = (h("svg", { key: 'f3f3606b10281ff876fbbe3fa4693e23c6b4d798', xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "100%", height: "100%", viewBox: "0 0 24 24" }, h("path", { key: '3a74b01b24bc695514e843ab443f8ae8e671be08', d: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" })));
                break;
            case 'kul-image':
                //photo.svg
                resource = (h("svg", { key: '34a8a7642e036533a19c12c1c1f53e9d0318b032', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: 'abee79ea33aca4f786f35007bf4021834eca4cb8', d: "M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" })));
                break;
            default:
                //art_track.svg
                resource = (h("svg", { key: '4da92592e2a788aab969e78c2bb7d679336d2886', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '81891df6cc3b72fad26a0a0cbe16fc9b75dbda3f', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
        }
        if ((this.kulRenderMode === 'viewport' && this.isInViewport) ||
            (this.kulRenderMode === 'props' && this.kulComponentProps) ||
            (this.kulRenderMode === 'both' &&
                this.kulComponentProps &&
                this.isInViewport)) {
            const Tag = this.kulComponentName;
            content = (h(Tag, { key: '7e9ae67e432a92158552d11eb39e10c6e046cded', ...this.kulComponentProps, ref: (el) => (this.#lazyComponent = el) }));
            className += ' kul-loaded';
        }
        else if (this.kulShowPlaceholder) {
            content = resource;
            className += ' kul-to-be-loaded';
        }
        return (h(Host, { key: '3af441c06ff38c27957021c843b07e45c81e6a3e', class: className }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '084ad57c3dad4130cf187f12ec9e63e2b12bd7c1', id: KUL_WRAPPER_ID }, content)));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#intObserver?.unobserve(this.rootElement);
    }
};
KulLazy.style = KulLazyStyle0;

export { KulLazy as kul_lazy };

//# sourceMappingURL=kul-lazy.entry.js.map