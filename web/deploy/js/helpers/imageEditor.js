import { SETTINGS } from '../fixtures/imageEditor.js';
import { KulEventName } from '../types/events/events.js';
import { LogSeverity } from '../types/manager/manager.js';
import { ImageEditorColumnId, ImageEditorControls, ImageEditorCSS, ImageEditorIcons, ImageEditorStatus, } from '../types/widgets/imageEditor.js';
import { NodeName, TagName } from '../types/widgets/widgets.js';
import { debounce, getApiRoutes, getLFManager, isTree, isValidObject, unescapeJson, } from '../utils/common.js';
export const EV_HANDLERS = {
    //#region Button handler
    button: async (state, e) => {
        const { comp, eventType } = e.detail;
        const { elements } = state;
        const { actionButtons, grid, imageviewer } = elements;
        if (eventType === 'click') {
            const update = async () => {
                const dataset = imageviewer.kulData;
                const pathColumn = getPathColumn(dataset);
                const statusColumn = getStatusColumn(dataset);
                if (statusColumn?.title === ImageEditorStatus.Pending) {
                    statusColumn.title = ImageEditorStatus.Completed;
                    const path = unescapeJson(pathColumn).parsedJson.title;
                    await getApiRoutes().json.update(path, dataset);
                    setGridStatus(ImageEditorStatus.Completed, grid, actionButtons);
                    const { masonry } = await imageviewer.getComponents();
                    await imageviewer.reset();
                    await masonry.setSelectedShape(null);
                }
            };
            switch (comp.kulIcon) {
                case ImageEditorIcons.Interrupt:
                    getApiRoutes().comfy.interrupt();
                    break;
            }
            await update();
            resetSettings(imageviewer);
        }
    },
    //#endregion
    //#region Canvas handler
    canvas: async (state, e) => {
        const { comp, eventType, points } = e.detail;
        const { filter, filterType } = state;
        switch (eventType) {
            case 'stroke':
                const originalFilter = filter;
                const originalFilterType = filterType;
                if (!filter?.hasCanvasAction) {
                    state.filterType = 'brush';
                }
                const temporaryFilter = {
                    ...JSON.parse(JSON.stringify(SETTINGS.brush)),
                    settings: {
                        color: comp.kulColor,
                        opacity: comp.kulOpacity,
                        points,
                        size: comp.kulSize,
                    },
                };
                state.filter = temporaryFilter;
                try {
                    await updateCb(state, true);
                }
                finally {
                    state.filter = originalFilter;
                    state.filterType = originalFilterType;
                }
                break;
        }
    },
    //#endregion
    //#region Imageviewer handler
    imageviewer: async (state, e) => {
        const { comp, eventType, originalEvent } = e.detail;
        const { node } = state;
        switch (eventType) {
            case 'kul-event':
                const ogEv = originalEvent;
                switch (ogEv.detail.eventType) {
                    case 'click':
                        if (isTree(ogEv.detail.comp)) {
                            const { node } = ogEv.detail;
                            if (node.cells?.kulCode) {
                                prepSettings(state, node);
                            }
                        }
                        break;
                    case 'stroke':
                        const canvasEv = ogEv;
                        EV_HANDLERS.canvas(state, canvasEv);
                        break;
                }
                break;
            case 'ready':
                const components = await comp.getComponents();
                switch (node.comfyClass) {
                    case NodeName.imagesEditingBreakpoint:
                        components.load.kulDisabled = true;
                        components.load.kulLabel = '';
                        components.textfield.kulDisabled = true;
                        components.textfield.kulLabel = 'Previews are visible in your ComfyUI/temp folder';
                        break;
                    default:
                        components.textfield.kulLabel = 'Directory (relative to ComfyUI/input)';
                        break;
                }
                break;
        }
    },
    //#endregion
    //#region Slider handler
    slider: async (state, e) => {
        const { eventType } = e.detail;
        const { update } = state;
        const { preview, snapshot } = update;
        switch (eventType) {
            case 'change':
                snapshot();
                break;
            case 'input':
                const debouncedCallback = debounce(preview, 300);
                debouncedCallback();
                break;
        }
    },
    //#endregion
    //#region Textfield handler
    textfield: async (state, e) => {
        const { eventType } = e.detail;
        const { update } = state;
        const { preview, snapshot } = update;
        switch (eventType) {
            case 'change':
                snapshot();
                break;
            case 'input':
                const debouncedCallback = debounce(preview, 300);
                debouncedCallback();
                break;
        }
    },
    //#endregion
    //#region Toggle
    toggle: async (state, e) => {
        const { eventType } = e.detail;
        const { update } = state;
        const { snapshot } = update;
        switch (eventType) {
            case 'change':
                snapshot();
                break;
        }
    },
    //#endregion
};
//#region apiCall
export const apiCall = async (state, addSnapshot) => {
    const { elements, filter, filterType } = state;
    const { imageviewer } = elements;
    const lfManager = getLFManager();
    const snapshotValue = (await imageviewer.getCurrentSnapshot()).value;
    requestAnimationFrame(() => imageviewer.setSpinnerStatus(true));
    try {
        const response = await getApiRoutes().image.process(snapshotValue, filterType, filter.settings);
        if (response.status === 'success') {
            if (addSnapshot) {
                imageviewer.addSnapshot(response.data);
            }
            else {
                const { canvas } = await imageviewer.getComponents();
                const image = await canvas.getImage();
                requestAnimationFrame(() => (image.kulValue = response.data));
            }
        }
        else {
            lfManager.log('Error processing image!', { response }, LogSeverity.Error);
        }
    }
    catch (error) {
        lfManager.log('Error processing image!', { error }, LogSeverity.Error);
    }
    requestAnimationFrame(() => imageviewer.setSpinnerStatus(false));
};
//#endregion
//#region refreshValues
export const refreshValues = async (state, addSnapshot = false) => {
    const { elements, filter } = state;
    const { controls } = elements;
    const lfManager = getLFManager();
    for (const key in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, key)) {
            const id = key;
            const control = controls[id];
            switch (control.tagName) {
                case 'KUL-SLIDER': {
                    const slider = control;
                    const sliderValue = await slider.getValue();
                    filter.settings[id] = addSnapshot ? sliderValue.real : sliderValue.display;
                    break;
                }
                case 'KUL-TEXTFIELD': {
                    const textfield = control;
                    const textfieldValue = await textfield.getValue();
                    filter.settings[id] = textfieldValue;
                    break;
                }
                case 'KUL-TOGGLE': {
                    const toggle = control;
                    const toggleValue = await toggle.getValue();
                    filter.settings[id] = toggleValue === 'on' ? toggle.dataset.on : toggle.dataset.off;
                    break;
                }
                default:
                    lfManager.log(`Unhandled control type: ${control.tagName}`, { control }, LogSeverity.Warning);
                    continue;
            }
        }
    }
};
//#endregion
//#region prepSettings
export const prepSettings = (state, node) => {
    state.elements.controls = {};
    state.filter = unescapeJson(node.cells.kulCode.value).parsedJson;
    state.filterType = node.id;
    const { elements, filter } = state;
    const { settings } = elements;
    settings.innerHTML = '';
    const controlsContainer = document.createElement(TagName.Div);
    controlsContainer.classList.add(ImageEditorCSS.SettingsControls);
    settings.appendChild(controlsContainer);
    const controlNames = Object.keys(filter.configs);
    controlNames.forEach((controlName) => {
        const controls = filter.configs[controlName];
        if (controls) {
            controls.forEach((control) => {
                switch (controlName) {
                    case ImageEditorControls.Slider:
                        const slider = createSlider(state, control);
                        controlsContainer.appendChild(slider);
                        state.elements.controls[control.id] = slider;
                        break;
                    case ImageEditorControls.Textfield:
                        const textfield = createTextfield(state, control);
                        controlsContainer.appendChild(textfield);
                        state.elements.controls[control.id] = textfield;
                        break;
                    case ImageEditorControls.Toggle:
                        const toggle = createToggle(state, control);
                        controlsContainer.appendChild(toggle);
                        state.elements.controls[control.id] = toggle;
                        break;
                    default:
                        throw new Error(`Unknown control type: ${controlName}`);
                }
            });
        }
    });
    const resetButton = document.createElement(TagName.KulButton);
    resetButton.classList.add('kul-full-width');
    resetButton.kulIcon = ImageEditorIcons.Reset;
    resetButton.kulLabel = 'Reset';
    resetButton.addEventListener('click', () => resetSettings(settings));
    settings.appendChild(resetButton);
};
//#endregion
//#region createSlider
export const createSlider = (state, data) => {
    const comp = document.createElement(TagName.KulSlider);
    comp.kulLabel = parseLabel(data);
    comp.kulLeadingLabel = true;
    comp.kulMax = Number(data.max);
    comp.kulMin = Number(data.min);
    comp.kulStep = Number(data.step);
    comp.kulStyle = '.form-field { width: 100%; }';
    comp.kulValue = Number(data.defaultValue);
    comp.title = data.title;
    comp.addEventListener(KulEventName.KulSlider, (e) => EV_HANDLERS.slider(state, e));
    return comp;
};
//#endregion
//#region createTextfield
export const createTextfield = (state, data) => {
    const comp = document.createElement(TagName.KulTextfield);
    comp.kulLabel = parseLabel(data);
    comp.kulHtmlAttributes = { type: data.type };
    comp.kulValue = String(data.defaultValue).valueOf();
    comp.title = data.title;
    comp.addEventListener(KulEventName.KulTextfield, (e) => EV_HANDLERS.textfield(state, e));
    return comp;
};
//#endregion
//#region createToggle
export const createToggle = (state, data) => {
    const comp = document.createElement(TagName.KulToggle);
    comp.dataset.off = data.off;
    comp.dataset.on = data.on;
    comp.kulLabel = parseLabel(data);
    comp.kulValue = false;
    comp.title = data.title;
    comp.addEventListener(KulEventName.KulToggle, (e) => EV_HANDLERS.toggle(state, e));
    return comp;
};
//#endregion
//#region Utils
export const getPathColumn = (dataset) => {
    return dataset?.columns?.find((c) => c.id === ImageEditorColumnId.Path) || null;
};
export const getStatusColumn = (dataset) => {
    return dataset?.columns?.find((c) => c.id === ImageEditorColumnId.Status) || null;
};
export const parseLabel = (data) => {
    return data.isMandatory ? `${data.ariaLabel}*` : data.ariaLabel;
};
export const resetSettings = async (settings) => {
    const controls = settings.querySelectorAll('[data-id]');
    for (const control of controls) {
        switch (control.tagName) {
            case 'KUL-SLIDER':
                const slider = control;
                await slider.setValue(slider.kulValue);
                await slider.refresh();
                break;
            case 'KUL-TEXTFIELD':
                const textfield = control;
                await textfield.setValue(textfield.kulValue);
                break;
            case 'KUL-TOGGLE':
                const toggle = control;
                toggle.setValue(toggle.kulValue ? 'on' : 'off');
                break;
        }
    }
};
export const setGridStatus = (status, grid, actionButtons) => {
    switch (status) {
        case ImageEditorStatus.Completed:
            requestAnimationFrame(() => {
                actionButtons.interrupt.kulDisabled = true;
                actionButtons.resume.kulDisabled = true;
            });
            grid.classList.add(ImageEditorCSS.GridIsInactive);
            break;
        case ImageEditorStatus.Pending:
            requestAnimationFrame(() => {
                actionButtons.interrupt.kulDisabled = false;
                actionButtons.resume.kulDisabled = false;
            });
            grid.classList.remove(ImageEditorCSS.GridIsInactive);
            break;
    }
};
export const updateCb = async (state, addSnapshot = false) => {
    await refreshValues(state, addSnapshot);
    const { elements, filter } = state;
    const { imageviewer } = elements;
    const { settings } = filter;
    const validValues = isValidObject(settings);
    const isStroke = !filter || filter.hasCanvasAction;
    if (validValues && isStroke) {
        const { color, size, opacity } = settings;
        const canvas = (await imageviewer.getComponents()).canvas;
        canvas.kulColor = color;
        canvas.kulSize = size;
        canvas.kulOpacity = opacity;
    }
    const shouldUpdate = !!(validValues && (!isStroke || (isStroke && settings.points)));
    if (shouldUpdate) {
        apiCall(state, addSnapshot);
    }
};
//#endregion
