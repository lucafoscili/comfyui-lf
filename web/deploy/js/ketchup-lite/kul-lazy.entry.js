import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-7cf82e95.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-72505221.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulLazyProps;
(function (KulLazyProps) {
    KulLazyProps["kulComponentName"] = "Sets the tag name of the component to be lazy loaded.";
    KulLazyProps["kulComponentProps"] = "Sets the data of the component to be lazy loaded.";
    KulLazyProps["kulRenderMode"] = "Decides when the sub-component should be rendered. By default when both the component props exist and the component is in the viewport.";
    KulLazyProps["kulShowPlaceholder"] = "Displays an animated SVG placeholder until the component is loaded.";
    KulLazyProps["kulStyle"] = "Custom style of the component.";
})(KulLazyProps || (KulLazyProps = {}));
//#endregion

const kulLazyCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_lazy_animation_time:var(--kul-lazy-animation-time, 2s);--kul_lazy_height:var(--kul-lazy-height, 100%);--kul_lazy_hor_alignment:var(--kul-lazy-hor-alignment, center);--kul_lazy_placeholder_color:var(\n    --kul-lazy-placeholder-color,\n    var(--kul-icon-color)\n  );--kul_lazy_ver_alignment:var(--kul-lazy-ver-alignment, center);--kul_lazy_width:var(--kul-lazy-width, 100%);display:block;height:var(--kul_lazy_height);width:var(--kul_lazy_width);position:relative}#kul-component{align-items:var(--kul_lazy_ver_alignment);display:flex;justify-content:var(--kul_lazy_hor_alignment);height:var(--kul_lazy_height);width:var(--kul_lazy_width)}#kul-component>*{height:var(--kul_lazy_height)}#kul-component kul-data-table{min-width:100%}.kul-loaded,.kul-to-be-loaded{height:var(--kul_lazy_height);width:var(--kul_lazy_width)}svg{fill:var(--kul_lazy_placeholder_color);animation:shine ease var(--kul_lazy_animation_time) infinite}@keyframes shine{0%{opacity:0.4}50%{opacity:0.8}100%{opacity:0.4}}:host(.kul-bottom-aligned){--kul-lazy-ver-alignment:flex-end}:host(.kul-left-aligned){--kul-lazy-hor-alignment:flex-start}:host(.kul-right-aligned){--kul-lazy-hor-alignment:flex-end}:host(.kul-top-aligned){--kul-lazy-ver-alignment:flex-start}:host(.kul-to-be-loaded) #kul-component{position:absolute}:host(.kul-to-be-loaded) #kul-component>*{margin:auto}";
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
    //#endregion
    //#region Internal variables
    #kulManager = kulManagerInstance();
    #intObserver = null;
    #lazyComponent = null;
    #lazyComponentLoaded = false;
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
     * Returns the HTMLElement of the component to lazy load.
     * @returns {HTMLElement} Lazy loaded component.
     */
    async getComponent() {
        return this.#lazyComponent;
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
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    //#endregion
    //#region Private methods
    #setObserver() {
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.#kulManager.debug.logs.new(this, 'kul-lazy entering the viewport, rendering ' +
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
    //#endregion
    //#region Lifecycle hooks
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
                resource = (h("svg", { key: '2b5249d659ca5959d9b4ed963d5cbb23075f9b45', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '410f83357323baf97978178813ea7ddcbb3b7823', d: "M42 6H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm0 32H6v-6h36v6z" })));
                break;
            case 'kul-card':
                //art_track.svg
                resource = (h("svg", { key: 'f48819330f6d39f76bd93fffca9d2ddcb3dad583', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '98874430100bbea5beb6b4c74f800ff62fb74224', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
            case 'kul-checkbox':
                //check_box_outline_blank.svg
                resource = (h("svg", { key: '2331dc5807bdf172f237b1edc766ec42448c5666', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '2a503e483735198949aad8b6086f1a23b9d01d3b', d: "M38 10v28H10V10h28m0-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z" })));
                break;
            case 'kul-chart':
                //chart-bar.svg
                resource = (h("svg", { key: '7a11bc830a5a15a6ced27eb0971729a2783d64dd', xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "100%", height: "100%", viewBox: "0 0 24 24" }, h("path", { key: '31209050ee271a0f68c61a968d61a4e42fa1b026', d: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" })));
                break;
            case 'kul-image':
                //photo.svg
                resource = (h("svg", { key: '1bbff8af5d61f35f9ae70ec3ba97eaab8c3ef7c6', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: 'd284d9a8530d8a4eb77df177f162fa56f7d86a70', d: "M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" })));
                break;
            default:
                //art_track.svg
                resource = (h("svg", { key: '20cc90ac6a653a78eb2d4ad53cced78f1f0d9f33', xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 48 48" }, h("path", { key: '8d67c3af50d7cea1c7ddacb131370439212b90d1', d: "M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" })));
                break;
        }
        if ((this.kulRenderMode === 'viewport' && this.isInViewport) ||
            (this.kulRenderMode === 'props' && this.kulComponentProps) ||
            (this.kulRenderMode === 'both' &&
                this.kulComponentProps &&
                this.isInViewport)) {
            const Tag = this.kulComponentName;
            content = (h(Tag, { key: '31ced39ae11ac22902648bf90d4155f41ac12d8a', ...this.kulComponentProps, ref: (el) => (this.#lazyComponent = el) }));
            className += ' kul-loaded';
        }
        else if (this.kulShowPlaceholder) {
            content = resource;
            className += ' kul-to-be-loaded';
        }
        return (h(Host, { key: 'cc9d5193464c25cc09cf1cd2545bb82bb75a0745', class: className }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'b015b22020f6d4d4a7af669283e82939e52221f4', id: KUL_WRAPPER_ID }, content)));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#intObserver?.unobserve(this.rootElement);
    }
};
KulLazy.style = KulLazyStyle0;

export { KulLazy as kul_lazy };

//# sourceMappingURL=kul-lazy.entry.js.map