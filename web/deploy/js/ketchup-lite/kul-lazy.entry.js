import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-ed681a28.js';

var KulLazyProps;
(function (KulLazyProps) {
    KulLazyProps["kulComponentName"] = "Sets the tag name of the component to be lazy loaded.";
    KulLazyProps["kulComponentProps"] = "Sets the data of the component to be lazy loaded.";
    KulLazyProps["kulRenderMode"] = "Decides when the sub-component should be rendered. By default when both the component props exist and the component is in the viewport.";
    KulLazyProps["kulShowPlaceholder"] = "Displays an animated SVG placeholder until the component is loaded.";
    KulLazyProps["kulStyle"] = "Custom style of the component.";
})(KulLazyProps || (KulLazyProps = {}));

const kulLazyCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_lazy_animation_time:var(--kul-lazy-animation-time, 2s);--kul_lazy_height:var(--kul-lazy-height, 100%);--kul_lazy_hor_alignment:var(--kul-lazy-hor-alignment, center);--kul_lazy_placeholder_color:var(\n    --kul-lazy-placeholder-color,\n    var(--kul-icon-color)\n  );--kul_lazy_ver_alignment:var(--kul-lazy-ver-alignment, center);--kul_lazy_width:var(--kul-lazy-width, 100%);display:block;height:var(--kul_lazy_height);width:var(--kul_lazy_width);position:relative}#kul-component{align-items:var(--kul_lazy_ver_alignment);display:flex;justify-content:var(--kul_lazy_hor_alignment);height:var(--kul_lazy_height);width:var(--kul_lazy_width)}#kul-component>*{height:var(--kul_lazy_height)}#kul-component kul-data-table{min-width:100%}.kul-loaded,.kul-to-be-loaded{height:var(--kul_lazy_height);width:var(--kul_lazy_width)}svg{fill:var(--kul_lazy_placeholder_color);animation:shine ease var(--kul_lazy_animation_time) infinite}@keyframes shine{0%{opacity:0.4}50%{opacity:0.8}100%{opacity:0.4}}:host(.kul-bottom-aligned){--kul-lazy-ver-alignment:flex-end}:host(.kul-left-aligned){--kul-lazy-hor-alignment:flex-start}:host(.kul-right-aligned){--kul-lazy-hor-alignment:flex-end}:host(.kul-top-aligned){--kul-lazy-ver-alignment:flex-start}:host(.kul-to-be-loaded) #kul-component{position:absolute}:host(.kul-to-be-loaded) #kul-component>*{margin:auto}";
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
                resource = (h("svg", { key: '06c6cda88934073959d374d052c66861f73bb057', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '1ad874e857e171b1a26dec267237198d5d402fda', d: "M42 6H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm0 32H6v-6h36v6z" })));
                break;
            case 'kul-card':
                //art_track.svg
                resource = (h("svg", { key: 'da6f3c3e1b99da89e19dc808800b20ba5636afbd', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: 'bc6bd1b4840debe4a62552c3ffb5d69c724a2beb', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
            case 'kul-checkbox':
                //check_box_outline_blank.svg
                resource = (h("svg", { key: '038f32508603dc00777318e5a184f9edafa65fbe', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '8faff47688ebe7aedecfebc0a5982f8816a7b5b2', d: "M38 10v28H10V10h28m0-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z" })));
                break;
            case 'kul-chart':
                //chart-bar.svg
                resource = (h("svg", { key: '1c343c77988d6254c15fbca57681673c83860145', xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "100%", height: "100%", viewBox: "0 0 24 24" }, h("path", { key: 'a9f4502ed4355a52590f132a57cdd54ed8b3b795', d: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" })));
                break;
            case 'kul-image':
                //photo.svg
                resource = (h("svg", { key: '5de08129bca04e9688ad744e3137fb819da164de', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: 'f3ecb80dab154729c134e686c622c53b53f5b993', d: "M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" })));
                break;
            default:
                //art_track.svg
                resource = (h("svg", { key: '7c3a2bc522614d7f6e209427480f68829f3d6a4e', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '361ebf03d0b85adaa5a2ccafccecd3504a79753b', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
        }
        if ((this.kulRenderMode === 'viewport' && this.isInViewport) ||
            (this.kulRenderMode === 'props' && this.kulComponentProps) ||
            (this.kulRenderMode === 'both' &&
                this.kulComponentProps &&
                this.isInViewport)) {
            const Tag = this.kulComponentName;
            content = (h(Tag, { key: 'fdf28683a10f1ffcefb90742ca2723997523268d', ...this.kulComponentProps, ref: (el) => (this.#lazyComponent = el) }));
            className += ' kul-loaded';
        }
        else if (this.kulShowPlaceholder) {
            content = resource;
            className += ' kul-to-be-loaded';
        }
        return (h(Host, { key: '10cfa22f943025426835c90025284d69b4584036', class: className }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '4989f7e3118a0bd5a008a902ea1548f07282ff49', id: KUL_WRAPPER_ID }, content)));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#intObserver?.unobserve(this.rootElement);
    }
};
KulLazy.style = KulLazyStyle0;

export { KulLazy as kul_lazy };
