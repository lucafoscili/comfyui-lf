import { h, r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-21ee70d9.js';
import { R as RIPPLE_SURFACE_CLASS, k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-caaff688.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';

/*-------------------------------------------------*/
/*                 I n t e r n a l                 */
/*-------------------------------------------------*/
var KulCardCSSClasses;
(function (KulCardCSSClasses) {
    KulCardCSSClasses["HAS_ACTIONS"] = "has-actions";
    KulCardCSSClasses["HAS_CONTENT"] = "has-content";
})(KulCardCSSClasses || (KulCardCSSClasses = {}));
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulCardProps;
(function (KulCardProps) {
    KulCardProps["kulData"] = "The actual data of the card.";
    KulCardProps["kulLayoutNumber"] = "Sets the number of the layout.";
    KulCardProps["kulSizeX"] = "The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).";
    KulCardProps["kulSizeY"] = "The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).";
    KulCardProps["kulStyle"] = "Custom style of the component.";
})(KulCardProps || (KulCardProps = {}));

const getShapes = {
    buttons: (buttons, extraProps) => {
        const r = [];
        for (let index = 0; buttons && index < buttons.length; index++) {
            const b = buttons[index];
            r.push(h("kul-button", { "data-cy": KulDataCyAttributes.SHAPE, id: `button${index}`, ...b, ...extraProps }));
        }
        return r;
    },
    image: (images, extraProps) => {
        const r = [];
        for (let index = 0; images && index < images.length; index++) {
            const i = images[index];
            r.push(h("kul-image", { "data-cy": KulDataCyAttributes.SHAPE, id: `image${index}`, ...i, ...extraProps }));
        }
        return r;
    },
    text: (text) => {
        const r = [];
        for (let index = 0; text && index < text.length; index++) {
            const t = text[index].value;
            r.push(h("div", { id: `text${index}` }, t));
        }
        return text;
    },
};

function getLayoutA(component, shapes = {}) {
    const buttons = getShapes.buttons(shapes.button);
    const images = getShapes.image(shapes.image, [
        {
            kulSizeX: '100%',
            kulSizeY: '100%',
        },
    ]);
    const text = getShapes.text(shapes.text);
    const coverIndex = 0;
    const cover = images.length ? images[coverIndex] : null;
    const titleIndex = 0;
    const title = text.length ? shapes.text[titleIndex].value : null;
    const subtitleIndex = 1;
    const subtitle = text.length > subtitleIndex ? shapes.text[subtitleIndex].value : null;
    const descriptionIndex = 2;
    const description = text.length > descriptionIndex
        ? shapes.text[descriptionIndex].value
        : undefined;
    return (h("div", { class: `layout-${component.kulLayout} ${buttons.length ? KulCardCSSClasses.HAS_ACTIONS : ''}` },
        h("div", { class: RIPPLE_SURFACE_CLASS, "data-cy": KulDataCyAttributes.RIPPLE, onPointerDown: (e) => {
                kulManagerInstance().theme.ripple.trigger(e, e.currentTarget);
            } },
            h("div", { class: "section-1" }, cover),
            h("div", { class: "section-2" },
                h("div", { class: "sub-2 title" }, title),
                h("div", { class: "sub-2 subtitle" }, subtitle),
                h("div", { class: "sub-2 description" }, description))),
        buttons.length ? h("div", { class: "section-3" }, buttons) : null));
}

const kulCardCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}.layout-a{-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);background-color:rgba(var(--kul-background-color-rgb), 0.4);border-radius:4px;box-sizing:border-box;box-shadow:0 2px 1px -1px rgba(128, 128, 128, 0.1), 0 1px 1px 0 rgba(128, 128, 128, 0.1), 0 1px 3px 0 rgba(128, 128, 128, 0.6);display:flex;flex-direction:column;height:100%;overflow:auto;position:relative;width:100%}.layout-a kul-button{margin-right:0}.layout-a img{object-fit:cover}.layout-a.has-actions{padding-bottom:52px}.layout-a.has-actions .section-2 .sub-2.description{padding-bottom:0}.layout-a .ripple-surface{cursor:pointer;height:100%;transition:background-color 175ms ease-in-out}.layout-a .ripple-surface:hover{background-color:rgba(var(--kul-primary-color-rgb), 0.075)}.layout-a .section-1{height:60%;width:100%}.layout-a .section-2{box-sizing:border-box;height:40%;overflow:auto;padding:0.75em 1em;width:100%}.layout-a .section-2 .sub-2.title{color:var(--kul-text-color);text-align:left}.layout-a .section-2 .sub-2.title div{font-size:1.25em;font-weight:500;letter-spacing:0.0125em}.layout-a .section-2 .sub-2.subtitle{opacity:0.6;text-align:left}.layout-a .section-2 .sub-2.subtitle div{font-size:0.875em;font-weight:500;letter-spacing:0.0071428571em;line-height:1.375em}.layout-a .section-2 .sub-2.description{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;opacity:0.6;padding-top:0.75em;text-align:left}.layout-a .section-2 .sub-2.description div{font-size:0.875em;font-weight:400;letter-spacing:0.0178571429em;line-height:1.25em}.layout-a .section-3{display:flex;justify-content:flex-end;align-items:center;box-sizing:border-box;position:absolute;left:0;bottom:0;height:52px;width:100%;text-align:right}.layout-a .section-3 kul-button{margin-left:0.25em}:host{--kul_card_backdrop:var(--kul-card-backdrop, rgba(0, 0, 0, 0.32));display:block;font-size:var(--kul-font-size);height:var(--kul_card_height);min-height:var(--kul_card_height);min-width:var(--kul_card_width);outline:none;position:relative;width:var(--kul_card_width)}#kul-component{height:100%;width:100%}";
const KulCardStyle0 = kulCardCss;

const KulCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-card-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.shapes = undefined;
        this.kulData = null;
        this.kulLayout = 'a';
        this.kulSizeX = '100%';
        this.kulSizeY = '100%';
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
     * Triggered when an event is fired.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            eventType,
            originalEvent: e,
        });
    }
    #cardEvent = (e) => {
        e.stopPropagation();
        this.onKulEvent(e, 'kul-event');
    };
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
        return getProps(this, KulCardProps, descriptions);
    }
    /**
     * Used to retrieve component's shapes.
     * @returns {Promise<KulDataShapesMap>} Map of shapes.
     */
    async getShapes() {
        return this.shapes;
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
    /**
     * This method will return the virtual node of the card containing the core layout of the card.
     * @returns {VNode} Virtual node of the card for the specified layout.
     */
    getLayout() {
        switch (this.kulLayout.toLowerCase()) {
            case 'a':
            default:
                return getLayoutA(this, this.shapes);
        }
    }
    /**
     * Sets the event listeners on the sub-components, in order to properly emit the generic kul-card-event.
     */
    registerListeners() {
        const root = this.rootElement.shadowRoot;
        root.addEventListener('kul-badge-event', this.#cardEvent);
        root.addEventListener('kul-button-event', this.#cardEvent);
        root.addEventListener('kul-code-event', this.#cardEvent);
        root.addEventListener('kul-image-event', this.#cardEvent);
        root.addEventListener('kul-upload-event', this.#cardEvent);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.language.register(this);
        this.#kulManager.theme.register(this);
        this.registerListeners();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        if (this.kulData) {
            this.shapes = this.#kulManager.data.extract.shapes(this.kulData);
        }
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        if (!this.kulData && this.rootElement.children.length < 1) {
            return;
        }
        const style = {
            '--kul_card_height': this.kulSizeY ? this.kulSizeY : '100%',
            '--kul_card_width': this.kulSizeX ? this.kulSizeX : '100%',
        };
        return (h(Host, { style: style }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID, onClick: (e) => this.onKulEvent(e, 'click'), onPointerDown: (e) => this.onKulEvent(e, 'pointerdown') }, this.getLayout())));
    }
    disconnectedCallback() {
        this.#kulManager.language.unregister(this);
        this.#kulManager.theme.unregister(this);
    }
};
KulCard.style = KulCardStyle0;

export { KulCard as kul_card };

//# sourceMappingURL=kul-card.entry.js.map