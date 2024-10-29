import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, F as Fragment, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance } from './kul-manager-5dda66e6.js';
import { g as getProps } from './componentUtils-a994b230.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulMasonryProps;
(function (KulMasonryProps) {
    KulMasonryProps["kulColumns"] = "Number of columns of the masonry.";
    KulMasonryProps["kulData"] = "Actual data to masonry.";
    KulMasonryProps["kulSelectable"] = "Allows for the selection of elements.";
    KulMasonryProps["kulShape"] = "Sets the type of shapes to compare.";
    KulMasonryProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulMasonryProps["kulView"] = "Sets the type of view, either the actual masonry or a waterfall view.";
})(KulMasonryProps || (KulMasonryProps = {}));

const kulMasonryCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_masonry_button_bottom:var(--kul-masonry-grid-gap, 30px);--kul_masonry_button_right:var(--kul-masonry-button-right, 30px);--kul_masonry_column_size:var(--kul-masonry-column-size, minmax(0px, 1fr));--kul_masonry_grid_gap:var(--kul-masonry-grid-gap, 8px);display:block;height:100%;width:100%}:host([kul-selectable]) kul-image{cursor:pointer;overflow:hidden}#kul-component{height:100%;width:100%}.masonry{display:flex;flex-direction:column;gap:var(--kul_masonry_grid_gap);height:100%;width:100%}.grid{align-items:start;column-gap:var(--kul_masonry_grid_gap);display:grid}.grid--masonry{grid-template-columns:repeat(var(--kul_masonry_columns), var(--kul_masonry_column_size))}.grid--waterfall{grid-template-columns:1fr}.grid__column{display:flex;flex:1;flex-direction:column;gap:var(--kul_masonry_grid_gap);width:100%}.grid__change-view{bottom:var(--kul_masonry_button_bottom);position:absolute;right:var(--kul_masonry_button_right);z-index:2}[data-selected=true]{border-radius:5px;box-shadow:0 4px 10px var(--kul-primary-color);outline:2px solid var(--kul-primary-color);outline-offset:4px;position:relative;transform:scale(1.05);transition:transform 0.3s ease, box-shadow 0.3s ease, outline-offset 0.3s ease;z-index:1}[data-selected=true]:after{border:4px solid var(--kul-primary-color);border-radius:8px;bottom:-4px;content:\"\";left:-4px;pointer-events:none;position:absolute;right:-4px;top:-4px}";
const KulMasonryStyle0 = kulMasonryCss;

const KulMasonry = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-masonry-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.selectedShape = {};
        this.shapes = {};
        this.view = 'masonry';
        this.kulColumns = 4;
        this.kulData = null;
        this.kulSelectable = false;
        this.kulShape = 'image';
        this.kulStyle = '';
        this.kulView = 'masonry';
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
        let shouldUpdateState = false;
        const state = {};
        switch (eventType) {
            case 'kul-event':
                const { eventType } = e.detail;
                switch (eventType) {
                    case 'click':
                        if (this.kulSelectable) {
                            const { comp } = e.detail;
                            const index = parseInt(comp.rootElement.dataset.index);
                            if (this.selectedShape.index !== index) {
                                state.index = index;
                                state.shape = this.shapes[this.kulShape][index];
                            }
                            shouldUpdateState = true;
                        }
                        break;
                }
                break;
        }
        if (shouldUpdateState) {
            this.selectedShape = state;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            selectedShape: this.selectedShape,
        });
    }
    /*-------------------------------------------------*/
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async updateShapes() {
        try {
            this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
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
        return getProps(this, KulMasonryProps, descriptions);
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
    #divideShapesIntoColumns(columnCount) {
        const props = this.shapes[this.kulShape].map(() => ({
            htmlProps: {
                dataset: { selected: '' },
            },
        }));
        if (this.selectedShape.index) {
            props[this.selectedShape.index] = {
                htmlProps: {
                    dataset: { selected: 'true' },
                },
            };
        }
        const columns = Array.from({ length: columnCount }, () => [], []);
        const decoratedShapes = this.#kulManager.data.cell.shapes.decorate(this.kulShape, this.shapes[this.kulShape], async (e) => this.onKulEvent(e, 'kul-event'), props);
        decoratedShapes.element.forEach((element, index) => {
            element.$attrs$['data-index'] = index.toString();
            columns[index % columnCount].push(element);
        });
        return columns;
    }
    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }
    #isMasonry() {
        return !!(this.view === 'masonry');
    }
    #prepChangeView() {
        const icon = this.#isMasonry() ? 'view_day' : 'view_quilt';
        const iconOff = this.#isMasonry() ? 'view_quilt' : 'view_day';
        const buttonEventHandler = (e) => {
            const { eventType, value } = e.detail;
            switch (eventType) {
                case 'click':
                    this.view = value === 'on' ? 'masonry' : 'waterfall';
                    break;
            }
        };
        return (h("kul-button", { class: 'grid__change-view', kulIcon: icon, kulIconOff: iconOff, kulStyling: 'floating', kulToggable: true, kulValue: this.#isMasonry() ? true : false, "onKul-button-event": buttonEventHandler, title: this.#isMasonry()
                ? 'Click to view the images arranged as a waterfall.'
                : 'Click to view the images arranged as a masonry.' }));
    }
    #prepView() {
        const columnCount = this.#isMasonry() ? this.kulColumns : 1;
        const columns = this.#divideShapesIntoColumns(columnCount);
        return columns.map((column, colIndex) => (h("div", { key: colIndex, class: "grid__column" }, column.map((element) => (h(Fragment, null, element))))));
    }
    #prepMasonry() {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length) {
                return (h(Fragment, null, h("div", { class: `grid grid--${this.view}` }, this.#prepView()), this.#prepChangeView()));
            }
        }
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.view = this.kulView;
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
        const style = {
            ['--kul_masonry_columns']: this.kulColumns?.toString() || '4',
        };
        return (h(Host, { key: '9a1f74575ff4afd85024d23ba57247f1c786b594' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '6b333804f13cc03902f0afb95cf82eb415deda9c', id: KUL_WRAPPER_ID, style: style }, h("div", { key: '2e442b0a6fd9442e826d688c7bc1e8c5a54cc5a0', class: "masonry" }, this.#prepMasonry()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get watchers() { return {
        "kulData": ["updateShapes"],
        "kulShape": ["updateShapes"]
    }; }
};
KulMasonry.style = KulMasonryStyle0;

export { KulMasonry as kul_masonry };

//# sourceMappingURL=kul-masonry.entry.js.map