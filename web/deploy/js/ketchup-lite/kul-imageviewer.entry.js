import { h, r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-4ebcb21f.js';
import { a as KulDataCyAttributes, k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-233b3207.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulImageviewerProps;
(function (KulImageviewerProps) {
    KulImageviewerProps["kulData"] = "Actual data of the image viewer.";
    KulImageviewerProps["kulLoadCallback"] = "Callback invoked when the load button is clicked.";
    KulImageviewerProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulImageviewerProps["kulValue"] = "Configuration parameters of the detail view.";
})(KulImageviewerProps || (KulImageviewerProps = {}));
//#endregion

const ACTIONS = {
    async clearHistory(adapter, index = null) {
        if (index === null) {
            adapter.set.state.history.clear();
            adapter.set.state.history.index(null);
            adapter.set.state.currentShape({});
            adapter.components.refs.masonry.setSelectedShape(null);
        }
        else {
            adapter.set.state.history.clear(index);
        }
    },
    async load(adapter) {
        const imageviewer = adapter.get.imageviewer();
        const refs = adapter.components.refs;
        const textfield = refs.textfield;
        try {
            await imageviewer.kulLoadCallback(imageviewer, await textfield.getValue());
            adapter.actions.clearHistory(adapter);
        }
        catch (error) {
            console.error('Load operation failed:', error);
        }
    },
    async redo(adapter) {
        const currentHistory = adapter.get.state.history.current();
        const index = adapter.get.state.history.index();
        if (currentHistory && index < currentHistory.length - 1) {
            adapter.set.state.history.index(index + 1);
        }
    },
    async save(adapter) {
        const currentSelectedShape = adapter.get.state.currentShape();
        if (!currentSelectedShape) {
            return;
        }
        const imageviewer = adapter.get.imageviewer();
        const manager = adapter.get.manager();
        const index = currentSelectedShape.shape.index;
        const shape = currentSelectedShape.shape.shape;
        const currentSnapshot = adapter.get.state.history.currentSnapshot();
        const value = currentSnapshot.value;
        adapter.actions.updateValue(shape, value);
        await adapter.actions.clearHistory(adapter, index);
        const cells = manager.data.cell.shapes.getAll(imageviewer.kulData, false);
        const cell = cells['image'].find((c) => c.value === currentSelectedShape.value ||
            c.kulValue === currentSelectedShape.value);
        cell.value = value;
        cell.kulValue = value;
        imageviewer.kulData = { ...imageviewer.kulData };
    },
    async undo(adapter) {
        const index = adapter.get.state.history.index();
        if (index > 0) {
            const newIndex = index - 1;
            adapter.set.state.history.index(newIndex);
        }
    },
    updateValue(shape, value) {
        const s = shape;
        shape.value = value;
        if (s.kulValue) {
            s.kulValue = value;
        }
    },
};

const COMPONENTS = {
    jsx: {
        clearHistory: (adapter) => prepClearHistory(adapter),
        save: (adapter) => prepSave(adapter),
        image: (adapter) => prepImage(adapter),
        load: (adapter) => prepLoad(adapter),
        masonry: (adapter) => prepMasonry(adapter),
        redo: (adapter) => prepRedo(adapter),
        textfield: (adapter) => prepTextfield(adapter),
        tree: (adapter) => prepTree(adapter),
        undo: (adapter) => prepUndo(adapter),
    },
    refs: {
        clearHistory: null,
        save: null,
        image: null,
        load: null,
        masonry: null,
        redo: null,
        textfield: null,
        tree: null,
        undo: null,
    },
};
// #region Clear history
const prepClearHistory = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__clear-history': true,
        'kul-danger': true,
        'kul-full-width': true,
    };
    const eventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'click':
                requestAnimationFrame(() => (comp.kulShowSpinner = true));
                const index = adapter.get.state.currentShape().shape.index;
                await adapter.actions.clearHistory(adapter, index);
                requestAnimationFrame(() => (comp.kulShowSpinner = false));
                break;
        }
    };
    const hasHistory = !!(adapter.get.state.history.current()?.length > 1);
    const isDisabled = !hasHistory;
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "delete-empty", kulLabel: "Clear history", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.clearHistory = el;
            }
        } },
        h("kul-spinner", { kulActive: true, kulDimensions: "2px", kulLayout: 1, slot: "spinner" })));
};
// #endregion
// #region Image
const prepImage = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__image': true,
        'kul-fit': true,
    };
    const eventHandler = (e) => {
        imageviewer.onKulEvent(e, 'kul-event');
    };
    const currentSnapshot = adapter.get.state.history.currentSnapshot();
    if (!currentSnapshot) {
        return;
    }
    return (h("kul-image", { class: className, kulValue: currentSnapshot.value, "onKul-image-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.image = el;
            }
        } }));
};
// #endregion
// #region Load
const prepLoad = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'navigation-grid__button': true,
        'kul-full-width': true,
    };
    const eventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'click':
                requestAnimationFrame(() => (comp.kulShowSpinner = true));
                await adapter.actions.load(adapter);
                requestAnimationFrame(() => (comp.kulShowSpinner = false));
                break;
        }
    };
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulIcon: "find_replace", kulLabel: "Load", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.load = el;
            }
        } },
        h("kul-spinner", { kulActive: true, kulDimensions: "2px", kulLayout: 1, slot: "spinner" })));
};
// #endregion
// #region Masonry
const prepMasonry = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'navigation-grid__masonry': true,
    };
    const eventHandler = (e) => {
        const { eventType, originalEvent, selectedShape } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'kul-event':
                const orig = originalEvent;
                switch (orig.detail.eventType) {
                    case 'click':
                        const currentShape = adapter.get.state.currentShape();
                        if (currentShape?.shape?.index === selectedShape.index) {
                            adapter.set.state.currentShape({});
                            adapter.set.state.history.index(null);
                        }
                        else {
                            adapter.set.state.currentShape(selectedShape);
                            const currentHistory = adapter.get.state.history.current();
                            adapter.set.state.history.index(currentHistory ? currentHistory.length - 1 : 0);
                            adapter.set.state.history.new(selectedShape);
                        }
                        break;
                }
        }
    };
    return (h("kul-masonry", { class: className, kulData: imageviewer.kulData, kulSelectable: true, "onKul-masonry-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.masonry = el;
            }
        } }));
};
// #endregion
// #region Redo
const prepRedo = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__redo': true,
        'kul-full-width': true,
    };
    const eventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'click':
                requestAnimationFrame(() => (comp.kulShowSpinner = true));
                await adapter.actions.redo(adapter);
                requestAnimationFrame(() => (comp.kulShowSpinner = false));
                break;
        }
    };
    const currentHistory = adapter.get.state.history.current();
    const index = adapter.get.state.history.index();
    const hasHistory = !!currentHistory?.length;
    const isDisabled = !(hasHistory && index < currentHistory.length - 1);
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "redo", kulLabel: "Redo", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.redo = el;
            }
        } }));
};
// #endregion
// #region Save
const prepSave = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__commit-changes': true,
        'kul-success': true,
        'kul-full-width': true,
    };
    const eventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'click':
                requestAnimationFrame(() => (comp.kulShowSpinner = true));
                await adapter.actions.save(adapter);
                requestAnimationFrame(() => (comp.kulShowSpinner = false));
                break;
        }
    };
    const hasHistory = !!(adapter.get.state.history.current()?.length > 1);
    const isDisabled = !hasHistory;
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "save", kulLabel: "Save snapshot", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.save = el;
            }
        } },
        h("kul-spinner", { kulActive: true, kulDimensions: "2px", kulLayout: 1, slot: "spinner" })));
};
// #endregion
// #region Textfield
const prepTextfield = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'navigation-grid__textfield': true,
    };
    const eventHandler = (e) => {
        imageviewer.onKulEvent(e, 'kul-event');
    };
    return (h("kul-textfield", { class: className, kulIcon: "folder", kulLabel: "Directory", kulStyling: "flat", "onKul-textfield-event-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.textfield = el;
            }
        } }));
};
// #endregion
// #region Tree
const prepTree = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__tree': true,
    };
    const eventHandler = (e) => {
        imageviewer.onKulEvent(e, 'kul-event');
    };
    return (h("kul-tree", { class: className, "data-cy": KulDataCyAttributes.INPUT, kulAccordionLayout: true, kulData: imageviewer.kulValue, kulSelectable: true, "onKul-tree-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.tree = el;
            }
        } }));
};
// #endregion
// #region Undo
const prepUndo = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__undo': true,
        'kul-full-width': true,
    };
    const eventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'click':
                requestAnimationFrame(() => (comp.kulShowSpinner = true));
                await adapter.actions.undo(adapter);
                requestAnimationFrame(() => (comp.kulShowSpinner = false));
                break;
        }
    };
    const currentHistory = adapter.get.state.history.current();
    const index = adapter.get.state.history.index();
    const hasHistory = !!currentHistory?.length;
    const isDisabled = !(hasHistory && index > 0);
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "undo", kulLabel: "Undo", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.undo = el;
            }
        } }));
};
// #endregion

const kulImageviewerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_imageviewer_display:var(--kul-imageviewer-display, block);--kul_imageviewer_height:var(--kul-imageviewer-height, 100%);--kul_imageviewer_width:var(--kul-imageviewer-width, 100%);--kul_imageviewer_component_height:var(\n    --kul-imageviewer-component-height,\n    100%\n  );--kul_imageviewer_component_width:var(\n    --kul-imageviewer-component-width,\n    100%\n  );--kul_imageviewer_viewer_height:var(--kul-imageviewer-viewer-height, 100%);--kul_imageviewer_viewer_width:var(--kul-imageviewer-viewer-width, 100%);--kul_imageviewer_main_grid_border_width:var(\n    --kul-imageviewer-main-grid-border-width,\n    2px\n  );--kul_imageviewer_main_grid_border_style:var(\n    --kul-imageviewer-main-grid-border-style,\n    solid\n  );--kul_imageviewer_main_grid_border_color:var(\n    --kul-imageviewer-main-grid-border-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_main_grid_box_sizing:var(\n    --kul-imageviewer-main-grid-box-sizing,\n    border-box\n  );--kul_imageviewer_main_grid_display:var(\n    --kul-imageviewer-main-grid-display,\n    grid\n  );--kul_imageviewer_main_grid_template_columns:var(\n    --kul-imageviewer-main-grid-template-columns,\n    100% 0\n  );--kul_imageviewer_main_grid_height:var(\n    --kul-imageviewer-main-grid-height,\n    100%\n  );--kul_imageviewer_main_grid_width:var(\n    --kul-imageviewer-main-grid-width,\n    100%\n  );--kul_imageviewer_main_grid_has_selection_template_columns:var(\n    --kul-imageviewer-main-grid-has-selection-template-columns,\n    30% 70%\n  );--kul_imageviewer_navigation_grid_display:var(\n    --kul-imageviewer-navigation-grid-display,\n    grid\n  );--kul_imageviewer_navigation_grid_template_rows:var(\n    --kul-imageviewer-navigation-grid-template-rows,\n    auto auto 1fr\n  );--kul_imageviewer_navigation_grid_height:var(\n    --kul-imageviewer-navigation-grid-height,\n    100%\n  );--kul_imageviewer_navigation_grid_width:var(\n    --kul-imageviewer-navigation-grid-width,\n    100%\n  );--kul_imageviewer_navigation_grid_textfield_padding:var(\n    --kul-imageviewer-navigation-grid-textfield-padding,\n    0\n  );--kul_imageviewer_navigation_grid_button_padding_bottom:var(\n    --kul-imageviewer-navigation-grid-button-padding-bottom,\n    12px\n  );--kul_imageviewer_navigation_grid_masonry_overflow:var(\n    --kul-imageviewer-navigation-grid-masonry-overflow,\n    auto\n  );--kul_imageviewer_navigation_grid_masonry_position:var(\n    --kul-imageviewer-navigation-grid-masonry-position,\n    relative\n  );--kul_imageviewer_details_grid_border_left_width:var(\n    --kul-imageviewer-details-grid-border-left-width,\n    2px\n  );--kul_imageviewer_details_grid_border_left_style:var(\n    --kul-imageviewer-details-grid-border-left-style,\n    solid\n  );--kul_imageviewer_details_grid_border_left_color:var(\n    --kul-imageviewer-details-grid-border-left-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_box_sizing:var(\n    --kul-imageviewer-details-grid-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_display:var(\n    --kul-imageviewer-details-grid-display,\n    none\n  );--kul_imageviewer_details_grid_template_areas:var(\n    --kul-imageviewer-details-grid-template-areas,\n    \"image image\" \"actions actions\" \"tree settings\"\n  );--kul_imageviewer_details_grid_template_columns:var(\n    --kul-imageviewer-details-grid-template-columns,\n    40% 1fr\n  );--kul_imageviewer_details_grid_template_rows:var(\n    --kul-imageviewer-details-grid-template-rows,\n    60% auto 1fr\n  );--kul_imageviewer_details_grid_height:var(\n    --kul-imageviewer-details-grid-height,\n    100%\n  );--kul_imageviewer_details_grid_width:var(\n    --kul-imageviewer-details-grid-width,\n    100%\n  );--kul_imageviewer_details_grid_actions_border_bottom_width:var(\n    --kul-imageviewer-details-grid-actions-border-bottom-width,\n    2px\n  );--kul_imageviewer_details_grid_actions_border_bottom_style:var(\n    --kul-imageviewer-details-grid-actions-border-bottom-style,\n    solid\n  );--kul_imageviewer_details_grid_actions_border_bottom_color:var(\n    --kul-imageviewer-details-grid-actions-border-bottom-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_actions_box_sizing:var(\n    --kul-imageviewer-details-grid-actions-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_actions_display:var(\n    --kul-imageviewer-details-grid-actions-display,\n    flex\n  );--kul_imageviewer_details_grid_actions_grid_area:var(\n    --kul-imageviewer-details-grid-actions-grid-area,\n    actions\n  );--kul_imageviewer_details_grid_image_border_bottom_width:var(\n    --kul-imageviewer-details-grid-image-border-bottom-width,\n    2px\n  );--kul_imageviewer_details_grid_image_border_bottom_style:var(\n    --kul-imageviewer-details-grid-image-border-bottom-style,\n    solid\n  );--kul_imageviewer_details_grid_image_border_bottom_color:var(\n    --kul-imageviewer-details-grid-image-border-bottom-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_image_box_sizing:var(\n    --kul-imageviewer-details-grid-image-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_image_grid_area:var(\n    --kul-imageviewer-details-grid-image-grid-area,\n    image\n  );--kul_imageviewer_details_grid_tree_border_right_width:var(\n    --kul-imageviewer-details-grid-tree-border-right-width,\n    2px\n  );--kul_imageviewer_details_grid_tree_border_right_style:var(\n    --kul-imageviewer-details-grid-tree-border-right-style,\n    solid\n  );--kul_imageviewer_details_grid_tree_border_right_color:var(\n    --kul-imageviewer-details-grid-tree-border-right-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_tree_box_sizing:var(\n    --kul-imageviewer-details-grid-tree-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_tree_grid_area:var(\n    --kul-imageviewer-details-grid-tree-grid-area,\n    tree\n  );display:var(--kul_imageviewer_display);height:var(--kul_imageviewer_height);width:var(--kul_imageviewer_width)}#kul-component{height:var(--kul_imageviewer_component_height);width:var(--kul_imageviewer_component_width)}.imageviewer{height:var(--kul_imageviewer_viewer_height);width:var(--kul_imageviewer_viewer_width)}.main-grid{border:var(--kul_imageviewer_main_grid_border_width) var(--kul_imageviewer_main_grid_border_style) var(--kul_imageviewer_main_grid_border_color);box-sizing:var(--kul_imageviewer_main_grid_box_sizing);display:var(--kul_imageviewer_main_grid_display);grid-template-columns:var(--kul_imageviewer_main_grid_template_columns);height:var(--kul_imageviewer_main_grid_height);overflow:auto;width:var(--kul_imageviewer_main_grid_width)}.main-grid--has-selection{grid-template-columns:var(--kul_imageviewer_main_grid_has_selection_template_columns)}.main-grid--has-selection .details-grid{display:grid}.navigation-grid{display:var(--kul_imageviewer_navigation_grid_display);grid-template-rows:var(--kul_imageviewer_navigation_grid_template_rows);height:var(--kul_imageviewer_navigation_grid_height);overflow:auto;width:var(--kul_imageviewer_navigation_grid_width)}.navigation-grid__textfield{padding:var(--kul_imageviewer_navigation_grid_textfield_padding)}.navigation-grid__button{padding-bottom:var(--kul_imageviewer_navigation_grid_button_padding_bottom)}.navigation-grid__masonry{overflow:var(--kul_imageviewer_navigation_grid_masonry_overflow);position:var(--kul_imageviewer_navigation_grid_masonry_position)}.details-grid{border-left:var(--kul_imageviewer_details_grid_border_left_width) var(--kul_imageviewer_details_grid_border_left_style) var(--kul_imageviewer_details_grid_border_left_color);box-sizing:var(--kul_imageviewer_details_grid_box_sizing);display:var(--kul_imageviewer_details_grid_display);grid-template-areas:var(--kul_imageviewer_details_grid_template_areas);grid-template-columns:var(--kul_imageviewer_details_grid_template_columns);grid-template-rows:var(--kul_imageviewer_details_grid_template_rows);height:var(--kul_imageviewer_details_grid_height);overflow:auto;width:var(--kul_imageviewer_details_grid_width)}.details-grid__actions{border-bottom:var(--kul_imageviewer_details_grid_actions_border_bottom_width) var(--kul_imageviewer_details_grid_actions_border_bottom_style) var(--kul_imageviewer_details_grid_actions_border_bottom_color);box-sizing:var(--kul_imageviewer_details_grid_actions_box_sizing);display:var(--kul_imageviewer_details_grid_actions_display);grid-area:var(--kul_imageviewer_details_grid_actions_grid_area)}.details-grid__image{border-bottom:var(--kul_imageviewer_details_grid_image_border_bottom_width) var(--kul_imageviewer_details_grid_image_border_bottom_style) var(--kul_imageviewer_details_grid_image_border_bottom_color);box-sizing:var(--kul_imageviewer_details_grid_image_box_sizing);grid-area:var(--kul_imageviewer_details_grid_image_grid_area)}.details-grid__tree{border-right:var(--kul_imageviewer_details_grid_tree_border_right_width) var(--kul_imageviewer_details_grid_tree_border_right_style) var(--kul_imageviewer_details_grid_tree_border_right_color);box-sizing:var(--kul_imageviewer_details_grid_tree_box_sizing);grid-area:var(--kul_imageviewer_details_grid_tree_grid_area);overflow:auto}";
const KulImageviewerStyle0 = kulImageviewerCss;

const KulImageviewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-imageviewer-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.currentShape = {};
        this.historyIndex = null;
        this.history = {};
        this.kulData = {};
        this.kulLoadCallback = null;
        this.kulStyle = '';
        this.kulValue = {};
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #stringify = this.#kulManager.data.cell.stringify;
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
     * Appends a new snapshot to the current shape's history by duplicating it with an updated value.
     * It has no effect when the current shape is not set.
     */
    async addSnapshot(value) {
        if (!this.currentShape || !Object.keys(this.currentShape)?.length) {
            return;
        }
        const newShape = JSON.parse(JSON.stringify(this.currentShape));
        this.#adapter.actions.updateValue(newShape.shape, value);
        this.#adapter.set.state.history.new(newShape, true);
    }
    /**
     * This method is used to retrieve the references to the subcomponents.
     */
    async getComponents() {
        return this.#adapter.components.refs;
    }
    /**
     * Fetches the current snapshot.
     * @returns {Promise<{shape: KulMasonrySelectedShape; value: string;}>} A promise that resolves with the current snapshot's object.
     */
    async getCurrentSnapshot() {
        return this.#adapter.get.state.history.currentSnapshot();
    }
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
        return getProps(this, KulImageviewerProps, descriptions);
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
        actions: ACTIONS,
        components: COMPONENTS,
        get: {
            imageviewer: () => this,
            manager: () => this.#kulManager,
            state: {
                currentShape: () => this.#getSelectedShapeValue(this.currentShape),
                history: {
                    current: () => this.history[this.currentShape.index],
                    currentSnapshot: () => {
                        if (this.historyIndex === null) {
                            return;
                        }
                        const snapshot = this.history[this.currentShape.index][this.historyIndex];
                        return this.#getSelectedShapeValue(snapshot);
                    },
                    full: () => this.history,
                    index: () => this.historyIndex,
                },
            },
        },
        set: {
            state: {
                currentShape: (node) => (this.currentShape = node),
                history: {
                    clear: (index = null) => {
                        if (index !== null) {
                            this.history[index] = [this.history[index][0]];
                            if (this.historyIndex === 0) {
                                this.refresh();
                            }
                            else {
                                this.historyIndex = 0;
                            }
                        }
                        else {
                            this.history = {};
                            this.historyIndex = null;
                        }
                    },
                    index: (index) => (this.historyIndex = index),
                    new: (selectedShape, isSnapshot = false) => {
                        const historyByIndex = this.history?.[selectedShape.index] || [];
                        if (this.historyIndex < historyByIndex.length - 1) {
                            historyByIndex.splice(this.historyIndex + 1);
                        }
                        if (historyByIndex?.length && !isSnapshot) {
                            historyByIndex[0] = selectedShape;
                            return;
                        }
                        historyByIndex.push(selectedShape);
                        this.history[selectedShape.index] = historyByIndex;
                        this.historyIndex = historyByIndex.length - 1;
                    },
                },
            },
        },
    };
    #getSelectedShapeValue(selectedShape) {
        if (selectedShape.index !== undefined) {
            const value = selectedShape.shape.value ||
                selectedShape.shape.kulValue;
            return {
                shape: selectedShape,
                value: this.#stringify(value),
            };
        }
    }
    #prepDetails() {
        const jsx = this.#adapter.components.jsx;
        return (h("div", { class: "details-grid" }, jsx.image(this.#adapter), h("div", { class: "details-grid__actions" }, jsx.clearHistory(this.#adapter), jsx.undo(this.#adapter), jsx.redo(this.#adapter), jsx.save(this.#adapter)), jsx.tree(this.#adapter), h("div", { class: "details-grid__settings" }, h("slot", { name: "settings" }))));
    }
    #prepImageviewer() {
        const className = {
            'main-grid': true,
            'main-grid--has-selection': !!this.#adapter.get.state.currentShape(),
        };
        return (h("div", { class: className }, this.#prepNavigation(), this.#prepDetails()));
    }
    #prepNavigation() {
        return (h("div", { class: "navigation-grid" }, this.#adapter.components.jsx.textfield(this.#adapter), this.#adapter.components.jsx.load(this.#adapter), this.#adapter.components.jsx.masonry(this.#adapter)));
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
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: 'bf54dd516d45bef8a80d46a2040455afb86b2329' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '6b061385a940f0ef54767a866d73e12637892b89', id: KUL_WRAPPER_ID }, h("div", { key: '5a0ebeb3f62c64f3ec25a5aae74aae10a026dd9b', class: "imageviewer" }, this.#prepImageviewer()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulImageviewer.style = KulImageviewerStyle0;

export { KulImageviewer as kul_imageviewer };

//# sourceMappingURL=kul-imageviewer.entry.js.map