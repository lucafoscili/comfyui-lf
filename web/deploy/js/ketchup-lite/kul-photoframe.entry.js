import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-dc9a333c.js';

var KulPhotoframeProps;
(function (KulPhotoframeProps) {
    KulPhotoframeProps["kulPlaceholder"] = "Html attributes of the picture before the component enters the viewport.";
    KulPhotoframeProps["kulStyle"] = "Custom style of the component.";
    KulPhotoframeProps["kulThreshold"] = "Percentage of the component's dimensions entering the viewport (0.1 => 1)";
    KulPhotoframeProps["kulValue"] = "Html attributes of the picture after the component enters the viewport.";
})(KulPhotoframeProps || (KulPhotoframeProps = {}));

const kulPhotoframeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_photoframe_border:var(\n    --kul-photoframe-border,\n    1px inset var(--kul-border-color)\n  );--kul_photoframe_fade_out_time:var(--kul-photoframe-fade-out-time, 2000ms);border:var(--kul_photoframe_border);display:block;height:100%;position:relative;width:100%}#kul-component{position:relative;height:100%;width:100%}img{max-height:100%;max-width:100%}.horizontal img{width:100%}.vertical img{height:100%}.placeholder{display:none;transition:opacity var(--kul_photoframe_fade_out_time) ease-out;will-change:opacity;z-index:1}.placeholder--loaded{display:block}.placeholder--fade-out{opacity:0;position:absolute}.value{display:none;left:0;position:absolute;top:0;z-index:0}.value--fade-in{display:block;position:relative}:host(.kul-fit) img{height:100%;object-fit:cover;width:100%}";
const KulPhotoframeStyle0 = kulPhotoframeCss;

const KulPhotoframe = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-photoframe-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.isInViewport = false;
        this.kulPlaceholder = null;
        this.kulStyle = '';
        this.kulThreshold = 0.25;
        this.kulValue = null;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #intObserver;
    #kulManager = kulManagerInstance();
    #placeholderEl;
    #valueEl;
    #renderValue = false;
    #wrapperEl;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
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
        return getProps(this, KulPhotoframeProps, descriptions);
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
                    this.isInViewport = true;
                    this.#intObserver.unobserve(this.rootElement);
                }
            });
        };
        const options = {
            threshold: this.kulThreshold,
        };
        this.#intObserver = new IntersectionObserver(callback, options);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.#setObserver();
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
        if (this.isInViewport && !this.#renderValue) {
            this.#renderValue = true;
        }
        return (h(Host, { key: '587c62f325dc95cf804902b515137344b5c2a4c7' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '856d3b1918290955a8d69ce399f5e78a0f0db644', id: KUL_WRAPPER_ID, ref: (el) => {
                this.#wrapperEl = el;
            } }, h("img", { key: 'e97b1f01e31d7a02f9efcd1229f6f23f0cc373be', ...this.kulPlaceholder, class: "placeholder", ref: (el) => (this.#placeholderEl = el), onLoad: (e) => {
                if (this.#placeholderEl.naturalWidth >
                    this.#placeholderEl.naturalHeight) {
                    this.#wrapperEl.classList.add('horizontal');
                }
                else {
                    this.#wrapperEl.classList.add('vertical');
                }
                this.#intObserver.observe(this.rootElement);
                this.#placeholderEl.classList.add('placeholder--loaded');
                this.onKulEvent(e, 'load', true);
            } }), this.#renderValue ? (h("img", { ...this.kulValue, class: "value", ref: (el) => (this.#valueEl = el), onLoad: (e) => {
                this.#placeholderEl.classList.add('placeholder--fade-out');
                this.#valueEl.classList.add('value--fade-in');
                this.onKulEvent(e, 'load');
            } })) : null)));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#intObserver?.unobserve(this.rootElement);
    }
};
KulPhotoframe.style = KulPhotoframeStyle0;

export { KulPhotoframe as kul_photoframe };

//# sourceMappingURL=kul-photoframe.entry.js.map