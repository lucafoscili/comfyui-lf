import { h, r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-7cf82e95.js';
import { a as KulDataCyAttributes, k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-72505221.js';
import { g as getProps } from './componentUtils-a994b230.js';

const ACTIONS = {
    //#region clearHistory
    async clearHistory(adapter, index = null) {
        const history = adapter.set.state.history;
        if (index === null) {
            history.clear();
            adapter.actions.clearSelection(adapter);
        }
        else {
            history.clear(index);
        }
    },
    //#endregion
    //#region clearSelection
    async clearSelection(adapter) {
        const stateSetter = adapter.set.state;
        stateSetter.currentShape({});
        stateSetter.history.index(null);
        adapter.components.refs.masonry.setSelectedShape(null);
    },
    //#endregion
    //#region delete
    async delete(adapter) {
        const getters = adapter.get;
        const imageviewer = getters.imageviewer();
        const dataset = getters.imageviewer().kulData;
        const manager = getters.manager();
        const currentSelectedShape = getters.state.currentShape();
        await adapter.actions.clearHistory(adapter, currentSelectedShape.shape.index);
        const cell = adapter.actions.findImage(adapter);
        const node = manager.data.node.findNodeByCell(dataset, cell);
        manager.data.node.pop(dataset.nodes, node);
        imageviewer.kulData = { ...dataset };
        await adapter.actions.clearSelection(adapter);
    },
    //#endregion
    //#region findImage
    findImage(adapter) {
        const imageviewer = adapter.get.imageviewer();
        const manager = adapter.get.manager();
        const currentSelectedShape = adapter.get.state.currentShape();
        const cells = manager.data.cell.shapes.getAll(imageviewer.kulData, false);
        return cells['image'].find((c) => c.value === currentSelectedShape.value ||
            c.kulValue === currentSelectedShape.value);
    },
    //#endregion
    //#region load
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
    //#endregion
    //#region redo
    async redo(adapter) {
        const currentHistory = adapter.get.state.history.current();
        const index = adapter.get.state.history.index();
        if (currentHistory && index < currentHistory.length - 1) {
            adapter.set.state.history.index(index + 1);
        }
    },
    //#endregion
    //#region save
    async save(adapter) {
        const currentSelectedShape = adapter.get.state.currentShape();
        if (!currentSelectedShape) {
            return;
        }
        const imageviewer = adapter.get.imageviewer();
        const index = currentSelectedShape.shape.index;
        const shape = currentSelectedShape.shape.shape;
        const currentSnapshot = adapter.get.state.history.currentSnapshot();
        const value = currentSnapshot.value;
        const cell = adapter.actions.findImage(adapter);
        cell.value = value;
        cell.kulValue = value;
        adapter.actions.updateValue(shape, value);
        await adapter.actions.clearHistory(adapter, index);
        imageviewer.kulData = { ...imageviewer.kulData };
    },
    //#endregion
    //#region undo
    async undo(adapter) {
        const index = adapter.get.state.history.index();
        if (index > 0) {
            const newIndex = index - 1;
            adapter.set.state.history.index(newIndex);
        }
    },
    //#endregion
    //#region updateValue
    updateValue(shape, value) {
        const s = shape;
        shape.value = value;
        if (s.kulValue) {
            s.kulValue = value;
        }
    },
    //#endregion
};

const COMPONENTS = {
    jsx: {
        canvas: (adapter) => prepCanvas(adapter),
        clearHistory: (adapter) => prepClearHistory(adapter),
        delete: (adapter) => prepDelete(adapter),
        load: (adapter) => prepLoad(adapter),
        masonry: (adapter) => prepMasonry(adapter),
        redo: (adapter) => prepRedo(adapter),
        save: (adapter) => prepSave(adapter),
        spinner: (adapter) => prepSpinner(adapter),
        textfield: (adapter) => prepTextfield(adapter),
        tree: (adapter) => prepTree(adapter),
        undo: (adapter) => prepUndo(adapter),
    },
    refs: {
        canvas: null,
        clearHistory: null,
        delete: null,
        load: null,
        masonry: null,
        redo: null,
        save: null,
        spinner: null,
        textfield: null,
        tree: null,
        undo: null,
    },
};
// #region Canvas
const prepCanvas = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__canvas': true,
    };
    const eventHandler = (e) => {
        imageviewer.onKulEvent(e, 'kul-event');
    };
    const currentSnapshot = adapter.get.state.history.currentSnapshot();
    if (!currentSnapshot) {
        return;
    }
    const imageProps = {
        kulValue: currentSnapshot.value,
    };
    return (h("kul-canvas", { class: className, kulImageProps: imageProps, "onKul-canvas-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.canvas = el;
            }
        } }));
};
// #endregion
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
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "layers_clear", kulLabel: "Clear history", kulStyling: "flat", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.clearHistory = el;
            }
        } },
        h("kul-spinner", { kulActive: true, kulDimensions: "2px", kulLayout: 1, slot: "spinner" })));
};
// #endregion
// #region Delete
const prepDelete = (adapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__delete': true,
        'kul-danger': true,
        'kul-full-width': true,
    };
    const eventHandler = async (e) => {
        const { comp, eventType } = e.detail;
        imageviewer.onKulEvent(e, 'kul-event');
        switch (eventType) {
            case 'click':
                requestAnimationFrame(() => (comp.kulShowSpinner = true));
                await adapter.actions.delete(adapter);
                requestAnimationFrame(() => (comp.kulShowSpinner = false));
                break;
        }
    };
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulIcon: "delete-empty", kulLabel: "Delete image", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.delete = el;
            }
        } },
        h("kul-spinner", { kulActive: true, kulDimensions: "2px", kulLayout: 1, slot: "spinner" })));
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
                            adapter.actions.clearSelection(adapter);
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
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "redo", kulLabel: "Redo", kulStyling: "flat", "onKul-button-event": eventHandler, ref: (el) => {
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
// #region Spinner
const prepSpinner = (adapter) => {
    const className = {
        'details-grid__spinner': true,
    };
    return (h("kul-spinner", { class: className, kulActive: adapter.get.state.spinnerStatus(), kulDimensions: "16px", kulFader: true, kulFaderTimeout: 125, kulLayout: 14, ref: (el) => {
            if (el) {
                adapter.components.refs.spinner = el;
            }
        } }));
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
    return (h("kul-button", { class: className, "data-cy": KulDataCyAttributes.BUTTON, kulDisabled: isDisabled, kulIcon: "undo", kulLabel: "Undo", kulStyling: "flat", "onKul-button-event": eventHandler, ref: (el) => {
            if (el) {
                adapter.components.refs.undo = el;
            }
        } }));
};
// #endregion

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

const kulImageviewerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_imageviewer_display:var(--kul-imageviewer-display, block);--kul_imageviewer_height:var(--kul-imageviewer-height, 100%);--kul_imageviewer_width:var(--kul-imageviewer-width, 100%);--kul_imageviewer_component_height:var(\n    --kul-imageviewer-component-height,\n    100%\n  );--kul_imageviewer_component_width:var(\n    --kul-imageviewer-component-width,\n    100%\n  );--kul_imageviewer_viewer_height:var(--kul-imageviewer-viewer-height, 100%);--kul_imageviewer_viewer_width:var(--kul-imageviewer-viewer-width, 100%);--kul_imageviewer_main_grid_border_width:var(\n    --kul-imageviewer-main-grid-border-width,\n    2px\n  );--kul_imageviewer_main_grid_border_style:var(\n    --kul-imageviewer-main-grid-border-style,\n    solid\n  );--kul_imageviewer_main_grid_border_color:var(\n    --kul-imageviewer-main-grid-border-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_main_grid_box_sizing:var(\n    --kul-imageviewer-main-grid-box-sizing,\n    border-box\n  );--kul_imageviewer_main_grid_display:var(\n    --kul-imageviewer-main-grid-display,\n    grid\n  );--kul_imageviewer_main_grid_template_columns:var(\n    --kul-imageviewer-main-grid-template-columns,\n    100% 0\n  );--kul_imageviewer_main_grid_height:var(\n    --kul-imageviewer-main-grid-height,\n    100%\n  );--kul_imageviewer_main_grid_width:var(\n    --kul-imageviewer-main-grid-width,\n    100%\n  );--kul_imageviewer_main_grid_has_selection_template_columns:var(\n    --kul-imageviewer-main-grid-has-selection-template-columns,\n    30% 70%\n  );--kul_imageviewer_navigation_grid_display:var(\n    --kul-imageviewer-navigation-grid-display,\n    grid\n  );--kul_imageviewer_navigation_grid_template_rows:var(\n    --kul-imageviewer-navigation-grid-template-rows,\n    auto auto 1fr\n  );--kul_imageviewer_navigation_grid_height:var(\n    --kul-imageviewer-navigation-grid-height,\n    100%\n  );--kul_imageviewer_navigation_grid_width:var(\n    --kul-imageviewer-navigation-grid-width,\n    100%\n  );--kul_imageviewer_navigation_grid_textfield_padding:var(\n    --kul-imageviewer-navigation-grid-textfield-padding,\n    0\n  );--kul_imageviewer_navigation_grid_button_padding_bottom:var(\n    --kul-imageviewer-navigation-grid-button-padding-bottom,\n    12px\n  );--kul_imageviewer_navigation_grid_masonry_overflow:var(\n    --kul-imageviewer-navigation-grid-masonry-overflow,\n    auto\n  );--kul_imageviewer_navigation_grid_masonry_position:var(\n    --kul-imageviewer-navigation-grid-masonry-position,\n    relative\n  );--kul_imageviewer_details_grid_border_left_width:var(\n    --kul-imageviewer-details-grid-border-left-width,\n    2px\n  );--kul_imageviewer_details_grid_border_left_style:var(\n    --kul-imageviewer-details-grid-border-left-style,\n    solid\n  );--kul_imageviewer_details_grid_border_left_color:var(\n    --kul-imageviewer-details-grid-border-left-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_box_sizing:var(\n    --kul-imageviewer-details-grid-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_display:var(\n    --kul-imageviewer-details-grid-display,\n    none\n  );--kul_imageviewer_details_grid_template_areas:var(\n    --kul-imageviewer-details-grid-template-areas,\n    \"image image\" \"actions actions\" \"tree settings\"\n  );--kul_imageviewer_details_grid_template_columns:var(\n    --kul-imageviewer-details-grid-template-columns,\n    40% 1fr\n  );--kul_imageviewer_details_grid_template_rows:var(\n    --kul-imageviewer-details-grid-template-rows,\n    60% auto 1fr\n  );--kul_imageviewer_details_grid_height:var(\n    --kul-imageviewer-details-grid-height,\n    100%\n  );--kul_imageviewer_details_grid_width:var(\n    --kul-imageviewer-details-grid-width,\n    100%\n  );--kul_imageviewer_details_grid_actions_border_bottom_width:var(\n    --kul-imageviewer-details-grid-actions-border-bottom-width,\n    2px\n  );--kul_imageviewer_details_grid_actions_border_bottom_style:var(\n    --kul-imageviewer-details-grid-actions-border-bottom-style,\n    solid\n  );--kul_imageviewer_details_grid_actions_border_bottom_color:var(\n    --kul-imageviewer-details-grid-actions-border-bottom-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_actions_box_sizing:var(\n    --kul-imageviewer-details-grid-actions-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_actions_display:var(\n    --kul-imageviewer-details-grid-actions-display,\n    flex\n  );--kul_imageviewer_details_grid_actions_grid_area:var(\n    --kul-imageviewer-details-grid-actions-grid-area,\n    actions\n  );--kul_imageviewer_details_grid_canvas_border_bottom_width:var(\n    --kul-imageviewer-details-grid-image-border-bottom-width,\n    2px\n  );--kul_imageviewer_details_grid_canvas_border_bottom_style:var(\n    --kul-imageviewer-details-grid-image-border-bottom-style,\n    solid\n  );--kul_imageviewer_details_grid_canvas_border_bottom_color:var(\n    --kul-imageviewer-details-grid-image-border-bottom-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_canvas_box_sizing:var(\n    --kul-imageviewer-details-grid-image-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_canvas_grid_area:var(\n    --kul-imageviewer-details-grid-image-grid-area,\n    image\n  );--kul_imageviewer_details_grid_tree_border_right_width:var(\n    --kul-imageviewer-details-grid-tree-border-right-width,\n    2px\n  );--kul_imageviewer_details_grid_tree_border_right_style:var(\n    --kul-imageviewer-details-grid-tree-border-right-style,\n    solid\n  );--kul_imageviewer_details_grid_tree_border_right_color:var(\n    --kul-imageviewer-details-grid-tree-border-right-color,\n    var(--kul-border-color)\n  );--kul_imageviewer_details_grid_tree_box_sizing:var(\n    --kul-imageviewer-details-grid-tree-box-sizing,\n    border-box\n  );--kul_imageviewer_details_grid_tree_grid_area:var(\n    --kul-imageviewer-details-grid-tree-grid-area,\n    tree\n  );-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:var(--kul_imageviewer_display);height:var(--kul_imageviewer_height);width:var(--kul_imageviewer_width)}#kul-component{height:var(--kul_imageviewer_component_height);width:var(--kul_imageviewer_component_width)}.imageviewer{height:var(--kul_imageviewer_viewer_height);width:var(--kul_imageviewer_viewer_width)}.main-grid{border:var(--kul_imageviewer_main_grid_border_width) var(--kul_imageviewer_main_grid_border_style) var(--kul_imageviewer_main_grid_border_color);box-sizing:var(--kul_imageviewer_main_grid_box_sizing);display:var(--kul_imageviewer_main_grid_display);grid-template-columns:var(--kul_imageviewer_main_grid_template_columns);height:var(--kul_imageviewer_main_grid_height);overflow:auto;width:var(--kul_imageviewer_main_grid_width)}.main-grid--has-selection{grid-template-columns:var(--kul_imageviewer_main_grid_has_selection_template_columns)}.main-grid--has-selection .details-grid{display:grid}.navigation-grid{display:var(--kul_imageviewer_navigation_grid_display);grid-template-rows:var(--kul_imageviewer_navigation_grid_template_rows);height:var(--kul_imageviewer_navigation_grid_height);overflow:auto;width:var(--kul_imageviewer_navigation_grid_width)}.navigation-grid__textfield{padding:var(--kul_imageviewer_navigation_grid_textfield_padding)}.navigation-grid__button{padding-bottom:var(--kul_imageviewer_navigation_grid_button_padding_bottom)}.navigation-grid__masonry{overflow:var(--kul_imageviewer_navigation_grid_masonry_overflow);position:var(--kul_imageviewer_navigation_grid_masonry_position)}.details-grid{border-left:var(--kul_imageviewer_details_grid_border_left_width) var(--kul_imageviewer_details_grid_border_left_style) var(--kul_imageviewer_details_grid_border_left_color);box-sizing:var(--kul_imageviewer_details_grid_box_sizing);display:var(--kul_imageviewer_details_grid_display);grid-template-areas:var(--kul_imageviewer_details_grid_template_areas);grid-template-columns:var(--kul_imageviewer_details_grid_template_columns);grid-template-rows:var(--kul_imageviewer_details_grid_template_rows);height:var(--kul_imageviewer_details_grid_height);overflow:auto;width:var(--kul_imageviewer_details_grid_width)}.details-grid__actions{border-bottom:var(--kul_imageviewer_details_grid_actions_border_bottom_width) var(--kul_imageviewer_details_grid_actions_border_bottom_style) var(--kul_imageviewer_details_grid_actions_border_bottom_color);box-sizing:var(--kul_imageviewer_details_grid_actions_box_sizing);display:var(--kul_imageviewer_details_grid_actions_display);grid-area:var(--kul_imageviewer_details_grid_actions_grid_area)}.details-grid__canvas{border-bottom:var(--kul_imageviewer_details_grid_canvas_border_bottom_width) var(--kul_imageviewer_details_grid_canvas_border_bottom_style) var(--kul_imageviewer_details_grid_canvas_border_bottom_color);box-sizing:var(--kul_imageviewer_details_grid_canvas_box_sizing)}.details-grid__preview{grid-area:var(--kul_imageviewer_details_grid_canvas_grid_area);position:relative}.details-grid__spinner{height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.details-grid__tree{border-right:var(--kul_imageviewer_details_grid_tree_border_right_width) var(--kul_imageviewer_details_grid_tree_border_right_style) var(--kul_imageviewer_details_grid_tree_border_right_color);box-sizing:var(--kul_imageviewer_details_grid_tree_box_sizing);grid-area:var(--kul_imageviewer_details_grid_tree_grid_area);overflow:auto}";
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
        this.history = {};
        this.historyIndex = null;
        this.isSpinnerActive = false;
        this.kulData = {};
        this.kulLoadCallback = null;
        this.kulStyle = '';
        this.kulValue = {};
    }
    get rootElement() { return getElement(this); }
    //#endregion
    //#region Internal variables
    #kulManager = kulManagerInstance();
    #stringify = this.#kulManager.data.cell.stringify;
    //#endregion
    //#region Events
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    //#endregion
    //#region Public methods
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
     * Clears the history related to the shape identified by the index.
     * When index is not provided, it clear the full history.
     */
    async clearHistory(index = null) {
        await this.#adapter.actions.clearHistory(this.#adapter, index);
    }
    /**
     * Clears the currently selected shape.
     */
    async clearSelection() {
        await this.#adapter.actions.clearSelection(this.#adapter);
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
     * Clears the full history and clears the current selection.
     */
    async reset() {
        await this.#adapter.actions.clearHistory(this.#adapter);
        await this.#adapter.actions.clearSelection(this.#adapter);
    }
    /**
     * Displays/hides the spinner over the preview.
     */
    async setSpinnerStatus(status) {
        this.isSpinnerActive = status;
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
                spinnerStatus: () => this.isSpinnerActive,
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
                spinnerStatus: (active) => (this.#adapter.components.refs.spinner.kulActive = active),
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
        return (h("div", { class: "details-grid" }, h("div", { class: "details-grid__preview" }, jsx.canvas(this.#adapter), jsx.spinner(this.#adapter)), h("div", { class: "details-grid__actions" }, jsx.delete(this.#adapter), jsx.clearHistory(this.#adapter), jsx.undo(this.#adapter), jsx.redo(this.#adapter), jsx.save(this.#adapter)), jsx.tree(this.#adapter), h("div", { class: "details-grid__settings" }, h("slot", { name: "settings" }))));
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
    //#endregion
    //#region Lifecycle hooks
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
        return (h(Host, { key: '497fda0c0f8e35d252c19635ab295a8c613faa28' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '9843b4dae9bc02a90e2f1498353d13f72b9591d8', id: KUL_WRAPPER_ID }, h("div", { key: 'aed2e229cff4d71adfc2c8f24561b5ce2be18dcd', class: "imageviewer" }, this.#prepImageviewer()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulImageviewer.style = KulImageviewerStyle0;

export { KulImageviewer as kul_imageviewer };

//# sourceMappingURL=kul-imageviewer.entry.js.map