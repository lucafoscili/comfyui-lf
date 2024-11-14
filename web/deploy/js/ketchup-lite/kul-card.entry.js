import { h, r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-4ebcb21f.js';
import { k as kulManagerInstance, R as RIPPLE_SURFACE_CLASS, a as KulDataCyAttributes, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-0684a7cb.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                 I n t e r n a l                 */
/*-------------------------------------------------*/
var KulCardCSSClasses;
(function (KulCardCSSClasses) {
    KulCardCSSClasses["HAS_ACTIONS"] = "has-actions";
    KulCardCSSClasses["HAS_CONTENT"] = "has-content";
})(KulCardCSSClasses || (KulCardCSSClasses = {}));
var KulCardShapesIds;
(function (KulCardShapesIds) {
    KulCardShapesIds["CLEAR"] = "clear";
    KulCardShapesIds["THEME"] = "theme";
})(KulCardShapesIds || (KulCardShapesIds = {}));
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulCardProps;
(function (KulCardProps) {
    KulCardProps["kulData"] = "The actual data of the card.";
    KulCardProps["kulLayout"] = "Sets the layout.";
    KulCardProps["kulSizeX"] = "The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).";
    KulCardProps["kulSizeY"] = "The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).";
    KulCardProps["kulStyle"] = "Custom style of the component.";
})(KulCardProps || (KulCardProps = {}));

const getThemes = () => {
    const nodes = [];
    kulManagerInstance()
        .theme.getThemes()
        .forEach((t) => {
        const char0 = t.charAt(0).toUpperCase();
        nodes.push({
            id: t,
            value: `${char0}${t.substring(1)}`,
        });
    });
    return nodes;
};
const DEFAULTS = {
    debug: {
        button: () => [
            {
                htmlProps: {
                    className: 'kul-full-width kul-danger',
                    id: KulCardShapesIds.CLEAR,
                },
                kulIcon: 'refresh',
                kulLabel: 'Clear logs',
            },
            {
                htmlProps: {
                    className: 'kul-full-width',
                    id: KulCardShapesIds.THEME,
                },
                kulData: {
                    nodes: [
                        {
                            icon: 'style',
                            id: 'root',
                            value: 'Random theme',
                            children: getThemes(),
                        },
                    ],
                },
            },
        ],
        code: () => [{ kulLanguage: 'markdown' }],
        switch: () => [
            {
                kulLeadingLabel: true,
                kulLabel: 'Toggle debug',
                kulValue: kulManagerInstance().debug.isEnabled(),
            },
        ],
    },
    keywords: {
        button: () => [
            {
                htmlProps: {
                    className: 'kul-full-width',
                },
                kulIcon: 'content_copy',
                kulLabel: 'Copy selected',
                kulStyling: 'flat',
            },
        ],
        chart: () => [
            {
                kulLegend: 'hidden',
                kulTypes: ['bar'],
            },
        ],
        chip: () => [
            {
                kulStyle: '#kul-component .chip-set { height: auto; }',
                kulStyling: 'filter',
            },
        ],
    },
    material: {
        image: () => [
            {
                htmlProps: {
                    className: 'kul-cover',
                },
                kulSizeX: '100%',
                kulSizeY: '100%',
            },
        ],
    },
    upload: {
        button: () => [
            {
                htmlProps: {
                    className: 'kul-full-width',
                },
                kulIcon: 'upload',
                kulLabel: 'Upload',
            },
        ],
    },
};

function getKeywordsLayout(adapter) {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const decorator = kulManagerInstance().data.cell.shapes.decorate;
    const buttonEventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        const chipEl = chips?.ref?.[0];
        if (chipEl && eventType === 'pointerdown') {
            comp.setMessage();
            if (chipEl) {
                const selectedChips = [];
                (await chipEl.getSelectedNodes()).forEach((n) => {
                    selectedChips.push(n.id);
                });
                navigator.clipboard.writeText(selectedChips.join(', '));
            }
        }
    };
    const buttons = decorator('button', shapes.button, eventDispatcher, DEFAULTS.keywords.button(), buttonEventHandler);
    const charts = decorator('chart', shapes.chart, eventDispatcher, DEFAULTS.keywords.chart());
    const chips = decorator('chip', shapes.chip, eventDispatcher, DEFAULTS.keywords.chip());
    const className = {
        [`${card.kulLayout}-layout`]: true,
    };
    return (h("div", { class: className },
        charts?.element?.length && (h("div", { class: "section-1 chart" }, charts.element[0])),
        chips?.element?.length && (h("div", { class: "section-2 chip" }, chips.element[0])),
        buttons?.element?.length && (h("div", { class: "section-3 button" }, buttons.element[0]))));
}

function getMaterialLayout(adapter) {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const decorator = kulManagerInstance().data.cell.shapes.decorate;
    const buttons = decorator('button', shapes.button, eventDispatcher);
    const images = decorator('image', shapes.image, eventDispatcher, DEFAULTS.material.image());
    const texts = decorator('text', shapes.text, eventDispatcher);
    const coverIndex = 0;
    const cover = images.element?.length
        ? images.element[coverIndex]
        : null;
    const titleIndex = 0;
    const title = texts.element?.length ? shapes.text[titleIndex].value : null;
    const subtitleIndex = 1;
    const subtitle = texts.element?.length > subtitleIndex
        ? shapes.text[subtitleIndex].value
        : null;
    const descriptionIndex = 2;
    const description = texts.element?.length > descriptionIndex
        ? shapes.text[descriptionIndex].value
        : undefined;
    const className = {
        [`${card.kulLayout}-layout`]: true,
        [KulCardCSSClasses.HAS_ACTIONS]: !!buttons.element?.length,
    };
    return (h("div", { class: className },
        h("div", { class: RIPPLE_SURFACE_CLASS, "data-cy": KulDataCyAttributes.RIPPLE, onPointerDown: (e) => {
                kulManagerInstance().theme.ripple.trigger(e, e.currentTarget);
            } },
            h("div", { class: "section-1" }, cover),
            h("div", { class: "section-2" },
                h("div", { class: "sub-2 title" }, title),
                h("div", { class: "sub-2 subtitle" }, subtitle),
                h("div", { class: "sub-2 description" }, description))),
        buttons.element?.length ? (h("div", { class: "section-3" }, buttons.element)) : null));
}

function getUploadLayout(adapter) {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const decorator = kulManagerInstance().data.cell.shapes.decorate;
    const buttons = decorator('button', shapes.button, eventDispatcher, DEFAULTS.upload.button());
    const uploads = decorator('upload', shapes.upload, eventDispatcher);
    const className = {
        [`${card.kulLayout}-layout`]: true,
    };
    return (h("div", { class: className },
        uploads?.element?.length && (h("div", { class: "section-1 upload" }, uploads.element[0])),
        buttons?.element?.length && (h("div", { class: "section-2 button" }, buttons.element[0]))));
}

function getDebugLayout(adapter) {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const decorator = kulManagerInstance().data.cell.shapes.decorate;
    const buttons = decorator('button', shapes.button, eventDispatcher, DEFAULTS.debug.button(), buttonEventHandler);
    const codes = decorator('code', shapes.code, eventDispatcher, DEFAULTS.debug.code(), codeEventHandler);
    const switches = decorator('switch', shapes.switch, eventDispatcher, DEFAULTS.debug.switch(), switchEventHandler);
    const className = {
        [`${card.kulLayout}-layout`]: true,
    };
    return (h("div", { class: className },
        switches?.element?.length && (h("div", { class: "section-1 switch" }, switches.element[0])),
        codes?.element?.length && (h("div", { class: "section-2 code" }, codes.element[0])),
        buttons?.element?.length && (h("div", { class: "section-3 button" }, buttons.element[0])),
        buttons?.element?.length && (h("div", { class: "section-4 button" }, buttons.element[1]))));
}
const buttonEventHandler = (e) => {
    const { eventType, id, originalEvent } = e.detail;
    switch (eventType) {
        case 'click':
            switch (id) {
                case KulCardShapesIds.CLEAR:
                    kulManagerInstance().debug.logs.dump();
                    break;
                case KulCardShapesIds.THEME:
                    kulManagerInstance().theme.randomTheme();
                    break;
            }
            break;
        case 'kul-event':
            switch (id) {
                case KulCardShapesIds.THEME:
                    listEventHandler(originalEvent);
                    break;
            }
            break;
    }
};
const codeEventHandler = (e) => {
    const { comp, eventType } = e.detail;
    switch (eventType) {
        case 'ready':
            kulManagerInstance().debug.register(comp);
            break;
        case 'unmount':
            kulManagerInstance().debug.unregister(comp);
            break;
    }
};
const listEventHandler = (e) => {
    const { eventType, node } = e.detail;
    switch (eventType) {
        case 'click':
            kulManagerInstance().theme.set(node.id);
            break;
    }
};
const switchEventHandler = (e) => {
    const { comp, eventType, value } = e.detail;
    const boolValue = value === 'on' ? true : false;
    switch (eventType) {
        case 'change':
            kulManagerInstance().debug.toggle(boolValue, false);
            break;
        case 'ready':
            kulManagerInstance().debug.register(comp);
            break;
        case 'unmount':
            kulManagerInstance().debug.unregister(comp);
            break;
    }
};

const LAYOUT_HUB = {
    debug: (adapter) => getDebugLayout(adapter),
    keywords: (adapter) => getKeywordsLayout(adapter),
    material: (adapter) => getMaterialLayout(adapter),
    upload: (adapter) => getUploadLayout(adapter),
};

const kulCardCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}.keywords-layout{display:grid;grid-template-rows:60% 1fr auto;height:100%;width:100%}.debug-layout{display:grid;grid-template-rows:auto 1fr auto auto;height:100%;width:100%}.debug-layout .switch{display:flex;justify-content:center;padding:16px}.debug-layout .code{overflow:auto}.material-layout{-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);background-color:rgba(var(--kul-background-color-rgb), 0.4);border-radius:4px;box-sizing:border-box;box-shadow:0 2px 1px -1px rgba(128, 128, 128, 0.1), 0 1px 1px 0 rgba(128, 128, 128, 0.1), 0 1px 3px 0 rgba(128, 128, 128, 0.6);display:flex;flex-direction:column;height:100%;overflow:auto;position:relative;width:100%}.material-layout kul-button{margin-right:0}.material-layout img{object-fit:cover}.material-layout.has-actions{padding-bottom:52px}.material-layout.has-actions .section-2 .sub-2.description{padding-bottom:0}.material-layout .ripple-surface{cursor:pointer;height:100%;transition:background-color 175ms ease-in-out}.material-layout .ripple-surface:hover{background-color:rgba(var(--kul-primary-color-rgb), 0.075)}.material-layout .section-1{height:60%;width:100%}.material-layout .section-2{box-sizing:border-box;height:40%;overflow:auto;padding:0.75em 1em;width:100%}.material-layout .section-2 .sub-2.title{color:var(--kul-text-color);overflow:hidden;text-align:left;text-overflow:ellipsis}.material-layout .section-2 .sub-2.title div{font-size:1.25em;font-weight:500;letter-spacing:0.0125em}.material-layout .section-2 .sub-2.subtitle{opacity:0.6;overflow:hidden;text-align:left;text-overflow:ellipsis}.material-layout .section-2 .sub-2.subtitle div{font-size:0.875em;font-weight:500;letter-spacing:0.0071428571em;line-height:1.375em}.material-layout .section-2 .sub-2.description{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;opacity:0.6;padding-top:0.75em;text-align:left;white-space:pre-wrap}.material-layout .section-2 .sub-2.description div{font-size:0.875em;font-weight:400;letter-spacing:0.0178571429em;line-height:1.25em}.material-layout .section-3{display:flex;justify-content:flex-end;align-items:center;box-sizing:border-box;position:absolute;left:0;bottom:0;height:52px;width:100%;text-align:right}.material-layout .section-3 kul-button{margin-left:0.25em}.upload-layout{display:grid;grid-template-rows:1fr auto;height:100%;width:100%}.upload-layout .upload{overflow:hidden}:host{--kul_card_backdrop:var(--kul-card-backdrop, rgba(0, 0, 0, 0.32));display:block;font-size:var(--kul-font-size);height:var(--kul_card_height);min-height:var(--kul_card_height);min-width:var(--kul_card_width);outline:none;position:relative;width:var(--kul_card_width)}#kul-component{height:100%;width:100%}";
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
        this.kulLayout = 'material';
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
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #adapter = {
        actions: {
            dispatchEvent: async (e) => {
                this.onKulEvent(e, 'kul-event');
            },
        },
        get: { card: () => this, shapes: () => this.shapes },
    };
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.language.register(this);
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        if (this.kulData) {
            this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
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
        return (h(Host, { style: style }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID, onClick: (e) => this.onKulEvent(e, 'click'), onContextMenu: (e) => this.onKulEvent(e, 'contextmenu'), onPointerDown: (e) => this.onKulEvent(e, 'pointerdown') }, LAYOUT_HUB[this.kulLayout.toLowerCase()](this.#adapter))));
    }
    disconnectedCallback() {
        this.#kulManager.language.unregister(this);
        this.#kulManager.theme.unregister(this);
    }
};
KulCard.style = KulCardStyle0;

export { KulCard as kul_card };

//# sourceMappingURL=kul-card.entry.js.map