import { h, r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, F as Fragment, H as Host } from './index-4ebcb21f.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-233b3207.js';
import { g as getProps } from './componentUtils-a994b230.js';

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
    KulMasonryProps["kulView"] = "Sets the type of view, either the actual masonry or a sequential view.";
})(KulMasonryProps || (KulMasonryProps = {}));

const STYLING = 'floating';
const MASONRY_ICON = 'view_quilt';
const HORIZONTAL_ICON = 'view_column';
const MINUS_ICON = 'remove';
const PLUS_ICON = 'plus';
const VERTICAL_ICON = 'view_day';
const buttonHandler = (adapter, e) => {
    const { eventType, id } = e.detail;
    switch (eventType) {
        case 'click':
            switch (id) {
                case MASONRY_ICON:
                    adapter.actions.changeView();
                    break;
                case MINUS_ICON:
                    adapter.actions.removeColumn();
                    break;
                case PLUS_ICON:
                    adapter.actions.addColumn();
                    break;
            }
            break;
    }
};
const ACTIONS = {
    masonry: {
        add: (adapter) => {
            return (h("kul-button", { class: 'grid__add-column kul-slim', id: PLUS_ICON, key: PLUS_ICON, kulIcon: PLUS_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                    if (el) {
                        adapter.components.buttons.addColumn = el;
                    }
                }, title: "Click to add a column to the masonry." }));
        },
        remove: (adapter) => {
            return (h("kul-button", { class: 'grid__remove-column kul-slim', id: MINUS_ICON, key: MINUS_ICON, kulIcon: MINUS_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                    if (el) {
                        adapter.components.buttons.removeColumn = el;
                    }
                }, title: "Click to remove a column from the masonry." }));
        },
    },
    changeView: (adapter) => {
        return (h("kul-button", { class: 'grid__change-view', id: MASONRY_ICON, key: MASONRY_ICON, kulIcon: adapter.isMasonry()
                ? VERTICAL_ICON
                : adapter.isVertical()
                    ? HORIZONTAL_ICON
                    : MASONRY_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.changeView = el;
                }
            }, title: adapter.isMasonry()
                ? 'Click to view the images arranged vertically.'
                : adapter.isVertical()
                    ? 'Click to view the images arranged horizontally.'
                    : 'Click to view the images arranged in a masonry.' }));
    },
};

const kulMasonryCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_masonry_button_bottom:var(--kul-masonry-button-bottom, 16px);--kul_masonry_button_right:var(--kul-masonry-button-right, 16px);--kul_masonry_column_size:var(--kul-masonry-column-size, minmax(0px, 1fr));--kul_masonry_grid_items_alignment:var(\n    --kul-masonry-grid-items-alignment,\n    start\n  );--kul_masonry_grid_gap:var(--kul-masonry-grid-gap, 8px);--kul_masonry_padding:var(--kul-masonry-padding, 12px);--kul_masonry_selected_border:var(\n    --kul-masonry-selected-border,\n    var(--kul-primary-color)\n  );--kul_masonry_transition_duration:var(\n    --kul-masonry-transition-duration,\n    0.3s\n  );--kul_masonry_transition_timing_function:var(\n    --kul-masonry-transition-timing-function,\n    ease\n  );--kul_masonry_grid_gap_actions:var(--kul-masonry-grid-gap-actions, 8px);--kul_masonry_grid_gap_actions_sub:var(\n    --kul-masonry-grid-gap-actions-sub,\n    4px\n  );--kul_masonry_selected_border_radius:var(\n    --kul-masonry-selected-border-radius,\n    5px\n  );--kul_masonry_selected_outline_offset:var(\n    --kul-masonry-selected-outline-offset,\n    4px\n  );--kul_masonry_selected_outline_width:var(\n    --kul-masonry-selected-outline-width,\n    2px\n  );--kul_masonry_selected_transform_scale:var(\n    --kul-masonry-selected-transform-scale,\n    1.05\n  );--kul_masonry_hover_brightness:var(--kul-masonry-hover-brightness, 125%);--kul_masonry_selected_after_border_width:var(\n    --kul-masonry-selected-after-border-width,\n    4px\n  );--kul_masonry_selected_after_border_radius:var(\n    --kul-masonry-selected-after-border-radius,\n    8px\n  );--kul_masonry_selected_after_offset:var(\n    --kul-masonry-selected-after-offset,\n    -4px\n  );--kul_masonry_selected_box_shadow_offset_y:var(\n    --kul-masonry-selected-box-shadow-offset-y,\n    4px\n  );--kul_masonry_selected_box_shadow_blur:var(\n    --kul-masonry-selected-box-shadow-blur,\n    10px\n  );--kul_masonry_selected_z_index:var(--kul-masonry-selected-z-index, 1);--kul_masonry_actions_z_index:var(--kul-masonry-actions-z-index, 2);display:block;height:100%;width:100%}:host([kul-selectable]) kul-image{cursor:pointer;overflow:hidden;transition:filter var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function)}:host([kul-selectable]) kul-image:hover{filter:brightness(var(--kul_masonry_hover_brightness))}#kul-component{height:100%;width:100%}.masonry{box-sizing:border-box;display:flex;flex-direction:column;gap:var(--kul_masonry_grid_gap);height:100%;padding:var(--kul_masonry_padding);width:100%}.masonry:not(:hover) .grid__actions{display:none}.grid{align-items:var(--kul_masonry_grid_items_alignment);column-gap:var(--kul_masonry_grid_gap);display:grid}.grid--horizontal{grid-template-rows:1fr}.grid--horizontal .grid__column{flex-direction:row}.grid--masonry{grid-template-columns:repeat(var(--kul_masonry_columns), var(--kul_masonry_column_size))}.grid--masonry .grid__column{flex-direction:column}.grid--vertical{grid-template-columns:1fr}.grid--vertical .grid__column{flex-direction:column}.grid__column{display:flex;flex:1;gap:var(--kul_masonry_grid_gap);width:100%}.grid__actions{animation:fade-in-grid 125ms ease-in;bottom:var(--kul_masonry_button_bottom);display:grid;grid-auto-flow:row;grid-gap:var(--kul_masonry_grid_gap_actions);justify-items:center;position:absolute;right:var(--kul_masonry_button_right);z-index:var(--kul_masonry_actions_z_index)}.grid__actions__sub{display:grid;grid-gap:var(--kul_masonry_grid_gap_actions_sub)}[data-selected=true]{border-radius:var(--kul_masonry_selected_border_radius);box-shadow:0 var(--kul_masonry_selected_box_shadow_offset_y) var(--kul_masonry_selected_box_shadow_blur) var(--kul_masonry_selected_border);outline:var(--kul_masonry_selected_outline_width) solid var(--kul_masonry_selected_border);outline-offset:var(--kul_masonry_selected_outline_offset);position:relative;transform:scale(var(--kul_masonry_selected_transform_scale));transition:transform var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function), box-shadow var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function), outline-offset var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function);z-index:var(--kul_masonry_selected_z_index)}[data-selected=true]:after{border:var(--kul_masonry_selected_after_border_width) solid var(--kul_masonry_selected_border);border-radius:var(--kul_masonry_selected_after_border_radius);bottom:var(--kul_masonry_selected_after_offset);content:\"\";left:var(--kul_masonry_selected_after_offset);pointer-events:none;position:absolute;right:var(--kul_masonry_selected_after_offset);top:var(--kul_masonry_selected_after_offset)}";
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
        this.kulColumns = 3;
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
     * Returns the selected shape.
     * @returns {Promise<KulMasonrySelectedShape>} Selected shape.
     */
    async getSelectedShape() {
        return this.selectedShape;
    }
    /**
     * Redecorates the shapes, updating potential new values.
     */
    async redecorateShapes() {
        this.updateShapes();
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Sets the selected shape by index.
     */
    async setSelectedShape(index) {
        const shape = this.shapes?.[this.kulShape]?.[index];
        if (shape) {
            const newState = {
                index,
                shape,
            };
            this.selectedShape = newState;
        }
        else {
            this.selectedShape = {};
            this.#kulManager.debug.logs.new(this, `Couldn't set shape with index: ${index}`);
        }
        this.updateShapes();
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
            addColumn: async () => {
                this.kulColumns++;
            },
            removeColumn: async () => {
                if (this.kulColumns > 2) {
                    this.kulColumns--;
                }
            },
            changeView: async () => {
                if (this.#isMasonry()) {
                    this.kulView = 'vertical';
                }
                else if (this.#isVertical()) {
                    this.kulView = 'horizontal';
                }
                else {
                    this.kulView = 'masonry';
                }
            },
        },
        components: {
            buttons: {
                addColumn: null,
                removeColumn: null,
                changeView: null,
            },
        },
        isMasonry: () => this.#isMasonry(),
        isVertical: () => this.#isVertical(),
        get: { masonry: () => this, shapes: () => this.shapes },
    };
    #divideShapesIntoColumns(columnCount) {
        const props = this.shapes[this.kulShape].map(() => ({
            htmlProps: {
                dataset: { selected: '' },
            },
        }));
        if (this.selectedShape.index !== undefined) {
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
    #isVertical() {
        return this.kulView === 'vertical';
    }
    #isMasonry() {
        return this.kulView === 'masonry';
    }
    #prepChangeView() {
        return (h("div", { class: "grid__actions" }, this.#isMasonry() ? (h("div", { class: "grid__actions__sub" }, ACTIONS.masonry.add(this.#adapter), ACTIONS.masonry.remove(this.#adapter))) : null, ACTIONS.changeView(this.#adapter)));
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
                return (h(Fragment, null, h("div", { class: `grid grid--${this.kulView}` }, this.#prepView()), this.#prepChangeView()));
            }
        }
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
        const style = {
            ['--kul_masonry_columns']: this.kulColumns?.toString() || '4',
        };
        return (h(Host, { key: '2aeacef47345f960a75365d9bc09b74de677a8d4' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'b8d05f1d065b529caf9803ca52109cfcd33ec69a', id: KUL_WRAPPER_ID, style: style }, h("div", { key: '4b0cd4ea4b69957d988dda6be2398ff4f222d23b', class: "masonry" }, this.#prepMasonry()))));
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