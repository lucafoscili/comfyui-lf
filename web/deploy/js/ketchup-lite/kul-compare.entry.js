import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, F as Fragment, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance } from './kul-manager-26d0782a.js';
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

const DEFAULTS = (_isOverlay) => {
    return {
        left: {
            image: () => [
                {
                    htmlProps: { className: 'kul-fit' },
                    kulSizeX: '100%',
                    kulSizeY: '100%',
                },
            ],
        },
        right: {
            image: () => [
                {
                    htmlProps: { className: 'kul-fit' },
                    kulSizeX: '100%',
                    kulSizeY: '100%',
                },
            ],
        },
    };
};

const kulCompareCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_compare_grid_template:var(--kul-compare-grid-template, 1fr auto);--kul_compare_change_view_background_color:var(\n    --kul-compare-change-view-background-color,\n    var(--kul-title-background-color)\n  );--kul_compare_change_view_padding:var(\n    --kul-compare-change-view-padding,\n    8px\n  );--kul_compare_slider_width:var(--kul-compare-slider-width, 3px);--kul_compare_slider_color:var(\n    --kul-compare-slider-color,\n    var(--kul-title-background-color)\n  );display:block}#kul-component{height:100%;width:100%}.compare{height:100%;width:100%}.grid{display:grid;grid-template-rows:var(--kul_compare_grid_template);height:100%;position:relative;width:100%}.change-view{background:var(--kul_compare_change_view_background_color);box-sizing:border-box;display:flex;justify-content:space-between;padding:var(--kul_compare_change_view_padding);width:100%}.view{height:100%;position:relative;width:100%}.view--overlay>:first-child{height:100%;position:relative;width:100%}.view--overlay>:last-child{clip-path:inset(0 var(--kul_compare_overlay_width, 50%) 0 0);height:100%;left:0;overflow:hidden;position:absolute;top:0}.view--overlay>:last-child:after{background-color:var(--kul_compare_slider_color);content:\"\";height:100%;pointer-events:none;position:absolute;right:var(--kul_compare_overlay_width, 50%);top:0;width:var(--kul_compare_slider_width)}.view--split{display:grid;grid-template-columns:50% 50%;overflow:hidden}.view__panel{background:var(--kul_compare_change_view_background_color);bottom:0;height:max-content;max-height:50%;overflow:auto;position:absolute;width:50%;z-index:2}.view__panel--left{left:0}.view__panel--right{right:0}.view__slider{height:100%;left:0;position:absolute;top:0;width:100%;z-index:1}.view__slider__input{appearance:none;background:transparent;cursor:grab;height:100%;margin:0;pointer-events:all;width:100%;z-index:1}.view__slider__input::-webkit-slider-thumb{appearance:none;background-color:var(--kul_compare_slider_color);cursor:ew-resize;height:100%;margin:0;width:10px}.view__slider__input::-moz-slider-thumb{appearance:none;background-color:var(--kul_compare_slider_color);cursor:ew-resize;height:100%;margin:0;width:10px}";
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
        this.shapes = {};
        this.isLeftPanelOpened = false;
        this.isRightPanelOpened = false;
        this.leftShape = undefined;
        this.rightShape = undefined;
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
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async updateShapes() {
        try {
            this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
            const shapes = this.#getShapes();
            this.leftShape = shapes[0];
            this.rightShape = shapes[1];
        }
        catch (error) {
            this.#kulManager.debug.logs.new(this, 'Error updating shapes: ' + error, 'error');
        }
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
    #getShapes() {
        return this.shapes?.[this.kulShape] || [];
    }
    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }
    #isOverlay() {
        return !!(this.kulView === 'overlay');
    }
    #prepChangeView() {
        const ids = {
            left: 'toggle-left-panel',
            right: 'toggle-right-panel',
            view: 'toggle-view',
        };
        const panelIcon = 'close';
        const panelIconOff = 'view-sequential';
        const styling = 'icon';
        const buttonEventHandler = (e) => {
            const { eventType, id, value } = e.detail;
            switch (eventType) {
                case 'click':
                    switch (id) {
                        case ids.left:
                            this.isLeftPanelOpened =
                                value === 'on' ? true : false;
                            break;
                        case ids.right:
                            this.isRightPanelOpened =
                                value === 'on' ? true : false;
                            break;
                        case ids.view:
                            this.kulView = value === 'on' ? 'split' : 'overlay';
                            break;
                    }
                    break;
            }
        };
        return (h("div", { class: "change-view" }, h("kul-button", { id: ids.left, kulIcon: panelIcon, kulIconOff: panelIconOff, kulStyling: styling, kulToggable: true, "onKul-button-event": buttonEventHandler, title: this.#isOverlay()
                ? 'Click to open the left panel.'
                : 'Click to close the left panel.' }), h("kul-button", { id: ids.view, kulIcon: "compare", kulIconOff: "book-open", kulStyling: styling, kulToggable: true, "onKul-button-event": buttonEventHandler, title: this.#isOverlay()
                ? 'Click for split screen comparison.'
                : 'Click for overlay comparison' }), h("kul-button", { id: ids.right, kulIcon: panelIcon, kulIconOff: panelIconOff, kulStyling: styling, kulToggable: true, "onKul-button-event": buttonEventHandler, title: this.#isOverlay()
                ? 'Click to open the right panel.'
                : 'Click to close the right panel.' })));
    }
    #prepPanel(side) {
        const dataset = { nodes: [] };
        const shapes = this.#getShapes();
        for (let index = 0; index < shapes.length; index++) {
            const shape = shapes[index];
            const isCurrentLeft = side === 'left' && this.leftShape === shape;
            const isCurrentRight = side === 'right' && this.rightShape === shape;
            const strIndex = String(index).valueOf();
            const node = {
                id: strIndex,
                value: `${this.kulShape} #${strIndex}`,
            };
            if (isCurrentLeft || isCurrentRight) {
                node.icon = 'check';
            }
            dataset.nodes.push(node);
        }
        return (h("kul-tree", { class: `view__panel view__panel--${side}`, kulData: dataset, "onKul-tree-event": (e) => {
                const { eventType, node } = e.detail;
                switch (eventType) {
                    case 'click':
                        const shape = this.#getShapes()[parseInt(node.id)];
                        switch (side) {
                            case 'left':
                                this.leftShape = shape;
                                break;
                            case 'right':
                                this.rightShape = shape;
                                break;
                        }
                        break;
                }
            } }));
    }
    #prepView() {
        const { left, right } = DEFAULTS(this.#isOverlay());
        const shapes = this.#kulManager.data.cell.shapes.decorate(this.kulShape, [this.leftShape, this.rightShape], async (e) => this.onKulEvent(e, 'kul-event'), [...left[this.kulShape](), ...right[this.kulShape]()]).element;
        return (h(Fragment, null, h("div", { class: `view view--${this.kulView}` }, h("div", { class: "view__left" }, shapes[0]), this.isLeftPanelOpened ? this.#prepPanel('left') : null, this.isRightPanelOpened ? this.#prepPanel('right') : null, this.#isOverlay() ? (h("div", { class: "view__slider", onInput: this.#updateOverlayWidth.bind(this), onTouchStart: this.#updateOverlayWidth.bind(this) }, h("input", { class: "view__slider__input", type: "range", min: "0", max: "100", value: "50" }))) : null, h("div", { class: "view__right" }, shapes[1]))));
    }
    #prepCompare() {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length > 1) {
                return (h("div", { class: "grid" }, this.#prepView(), this.#prepChangeView()));
            }
        }
    }
    #updateOverlayWidth(event) {
        const sliderValue = 100 - parseInt(event.target.value);
        this.rootElement.style.setProperty('--kul_compare_overlay_width', `${sliderValue}%`);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.updateShapes();
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
        return (h(Host, { key: 'd55e38c58e152adfcd56f4549706f68d4d55b134' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '1749140f84541b63f3dea10d058ee087c10ed37e', id: KUL_WRAPPER_ID }, h("div", { key: 'e4646da54f0e037927e9b3ca51187e7f5031531d', class: "compare" }, this.#prepCompare()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get watchers() { return {
        "kulData": ["updateShapes"],
        "kulShape": ["updateShapes"]
    }; }
};
KulCompare.style = KulCompareStyle0;

export { KulCompare as kul_compare };

//# sourceMappingURL=kul-compare.entry.js.map