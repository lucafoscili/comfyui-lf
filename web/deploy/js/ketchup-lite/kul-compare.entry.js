import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, F as Fragment, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance } from './kul-manager-8d12091b.js';
import { g as getProps } from './componentUtils-a994b230.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulCompareProps;
(function (KulCompareProps) {
    KulCompareProps["kulData"] = "Actual data to compare.";
    KulCompareProps["kulShape"] = "Sets the type of shapes to compare.";
    KulCompareProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulCompareProps["kulView"] = "Sets the type of view, either styled as a before-after or a side-by-side comparison.";
})(KulCompareProps || (KulCompareProps = {}));

const SOURCE_DEFAULTS = {
    image: () => [
        {
            kulSizeX: '100%',
            kulSizeY: '100%',
        },
    ],
};
const TARGET_DEFAULTS = {
    image: () => [
        {
            kulSizeX: 'auto',
            kulSizeY: '100%',
        },
    ],
};

const kulCompareCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_compare_grid_template:var(--kul-compare-grid-template, 1fr auto);--kul_compare_change_view_background_color:var(\n    --kul-compare-change-view-background-color,\n    var(--kul-title-background-color)\n  );--kul_compare_slider_color:var(\n    --kul-compare-slider-color,\n    var(--kul-title-background-color)\n  );--kul_compare_change_view_padding:var(\n    --kul-compare-change-view-padding,\n    8px\n  );display:block}#kul-component{height:100%;width:100%}.grid{display:grid;grid-template-rows:var(--kul_compare_grid_template);height:100%;position:relative;width:100%}.change-view{background:var(--kul_compare_change_view_background_color);box-sizing:border-box;display:flex;justify-content:center;padding:var(--kul_compare_change_view_padding);width:100%}.view{height:100%;position:relative;width:100%}.view--overlay>:first-child{height:100%;position:relative;width:100%}.view--overlay>:last-child{border-right:3px solid var(--kul_compare_slider_color);height:100%;left:0;overflow:hidden;position:absolute;top:0;width:var(--kul_compare_overlay_width, 50%)}.view--split{display:grid;grid-template-columns:50% 50%;overflow:hidden}.draggable-slider{height:100%;left:0;position:absolute;top:0;width:100%;z-index:1}.draggable-slider__input{appearance:none;background:transparent;cursor:grab;height:100%;margin:0;pointer-events:all;width:100%;z-index:1}.draggable-slider__input::-webkit-slider-thumb{appearance:none;background-color:var(--kul_compare_slider_color);cursor:ew-resize;height:100%;margin:0;width:10px}.draggable-slider__input::-moz-slider-thumb{appearance:none;background-color:var(--kul_compare_slider_color);cursor:ew-resize;height:100%;margin:0;width:10px}";
const KulCompareStyle0 = kulCompareCss;

const KulCompare = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-compare-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.shapes = undefined;
        this.view = 'overlay';
        this.kulData = null;
        this.kulShape = 'image';
        this.kulStyle = '';
        this.kulView = 'overlay';
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
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's properties and descriptions.
     * @param {boolean} descriptions - When true, includes descriptions for each property.
     * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
     */
    async getProps(descriptions) {
        return getProps(this, KulCompareProps, descriptions);
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
    #isOverlay() {
        return !!(this.view === 'overlay');
    }
    #prepChangeView() {
        return (h("div", { class: "change-view" }, h("kul-button", { kulIcon: "compare", kulIconOff: "book-open", kulStyling: "icon", kulToggable: true, onClick: () => {
                this.view = this.#isOverlay() ? 'split' : 'overlay';
            }, title: this.#isOverlay()
                ? 'Click for split screen comparison.'
                : 'Click for overlay comparison' })));
    }
    #prepView() {
        const rawShapes = this.shapes[this.kulShape];
        const shapes = this.#kulManager.data.cell.shapes.decorate(this.kulShape, rawShapes, async (e) => this.onKulEvent(e, 'kul-event'), [
            ...SOURCE_DEFAULTS[this.kulShape](),
            ...TARGET_DEFAULTS[this.kulShape](),
        ]).element;
        return (h(Fragment, null, h("div", { class: `view view--${this.view}` }, h("div", { class: "view__source" }, shapes[0]), this.#isOverlay() ? (h("div", { class: "draggable-slider", onInput: this.#updateOverlayWidth.bind(this) }, h("input", { class: "draggable-slider__input", type: "range", min: "0", max: "100", value: "50" }))) : null, h("div", { class: "view__target" }, shapes[1]))));
    }
    #prepCompare() {
        const hasShapes = !!this.shapes?.[this.kulShape];
        if (hasShapes) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length > 1) {
                return (h("div", { class: "grid" }, this.#prepView(), this.#prepChangeView()));
            }
        }
    }
    #updateOverlayWidth(event) {
        const sliderValue = event.target.value;
        this.rootElement.style.setProperty('--kul_compare_overlay_width', `${sliderValue}%`);
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
        if (this.kulData) {
            this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
        }
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: '6cba9a0ebbe314b323d26618bea60b5c0a4d969e' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '346a3f1e6a2c655448b0897b2bdcd7daf0bf1f7c', id: KUL_WRAPPER_ID }, h("div", { key: 'c68ded85d696d66fb8e5d7d20104b28aa0872c3e', class: "compare" }, this.#prepCompare()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulCompare.style = KulCompareStyle0;

export { KulCompare as kul_compare };

//# sourceMappingURL=kul-compare.entry.js.map