import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { ImageEditorWidgetColumnId, ImageEditorWidgetControls, ImageEditorWidgetIcons, ImageEditorWidgetStatus, } from '../types/widgets.js';
import { debounce, getApiRoutes, getLFManager, unescapeJson } from '../utils/common.js';
import { imageEditorFactory } from '../widgets/imageEditor.js';
//#region buttonEventHandler
export const buttonEventHandler = async (imageviewer, actionButtons, grid, e) => {
    const { comp, eventType } = e.detail;
    if (eventType === 'click') {
        const update = async () => {
            const dataset = imageviewer.kulData;
            const pathColumn = getPathColumn(dataset);
            const statusColumn = getStatusColumn(dataset);
            if (statusColumn?.title === ImageEditorWidgetStatus.Pending) {
                statusColumn.title = ImageEditorWidgetStatus.Completed;
                const path = unescapeJson(pathColumn).parsedJson.title;
                await getApiRoutes().json.update(path, dataset);
                setGridStatus(ImageEditorWidgetStatus.Completed, grid, actionButtons);
                const { masonry } = await imageviewer.getComponents();
                await imageviewer.reset();
                await masonry.setSelectedShape(null);
            }
        };
        switch (comp.kulIcon) {
            case ImageEditorWidgetIcons.Interrupt:
                getApiRoutes().interrupt();
                break;
        }
        await update();
        resetSettings(imageviewer);
    }
};
//#endregion
//#region imageviewerEventHandler
export const imageviewerEventHandler = async (settings, node, e) => {
    const { comp, eventType, originalEvent } = e.detail;
    switch (eventType) {
        case 'kul-event':
            const ogEv = originalEvent;
            if (ogEv.detail.eventType === 'click') {
                if (ogEv.detail.comp.rootElement.tagName === 'KUL-TREE') {
                    const { node } = ogEv.detail;
                    prepSettings(settings, node, comp.rootElement);
                }
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
};
//#endregion
//#region sliderEventHandler
export const sliderEventHandler = async (updateCb, e) => {
    const { eventType } = e.detail;
    switch (eventType) {
        case 'change':
            updateCb(true);
            break;
        case 'input':
            const debouncedCallback = debounce(updateCb, 300);
            debouncedCallback();
            break;
    }
};
//#endregion
//#region toggleEventHandler
export const toggleEventHandler = async (updateCb, e) => {
    const { eventType } = e.detail;
    switch (eventType) {
        case 'change':
            updateCb(true);
            break;
    }
};
//#endregion
//#region prepSettings
export const prepSettings = (settings, node, imageviewer) => {
    const filterType = node.id;
    const widgets = unescapeJson(node.cells.kulCode.value)
        .parsedJson;
    const updateSettings = async (addSnapshot = false) => {
        const settingsValues = {};
        const controls = Array.from(settings.querySelectorAll('[data-id]'));
        for (const control of controls) {
            const id = control.dataset.id;
            let value;
            switch (control.tagName) {
                case 'KUL-SLIDER':
                    const slider = control;
                    const sliderValue = await slider.getValue();
                    value = addSnapshot ? sliderValue.real : sliderValue.display;
                    break;
                case 'KUL-TOGGLE':
                    const toggle = control;
                    //value = await toggle.getValue();
                    break;
            }
            settingsValues[id] = value;
        }
        const snapshotValue = (await imageviewer.getCurrentSnapshot()).value;
        try {
            const r = await getApiRoutes().image.process(snapshotValue, filterType, settingsValues);
            if (r.status === 'success') {
                if (addSnapshot) {
                    imageviewer.addSnapshot(r.data);
                }
                else {
                    const { image } = await imageviewer.getComponents();
                    requestAnimationFrame(() => (image.kulValue = r.data));
                }
            }
            else {
                console.error('Image processing failed:', r.message);
                getLFManager().log('Error processing image!', { r }, LogSeverity.Error);
            }
        }
        catch (error) {
            console.error('API call failed:', error);
            getLFManager().log('Error processing image!', { error }, LogSeverity.Error);
        }
    };
    settings.innerHTML = '';
    const resetButton = document.createElement('kul-button');
    resetButton.classList.add('kul-full-width');
    resetButton.kulIcon = ImageEditorWidgetIcons.Reset;
    resetButton.kulLabel = 'Reset';
    settings.appendChild(resetButton);
    const controlNames = Object.keys(widgets);
    controlNames.forEach((controlName) => {
        const controls = widgets[controlName];
        if (controls) {
            controls.forEach((controlsData) => {
                switch (controlName) {
                    case ImageEditorWidgetControls.Slider:
                        settings.appendChild(createSlider(controlsData, updateSettings));
                        break;
                    case ImageEditorWidgetControls.Toggle:
                        settings.appendChild(createToggle(controlsData, updateSettings));
                        break;
                    default:
                        throw new Error(`Unknown control type: ${controlName}`);
                }
            });
        }
    });
    resetButton.addEventListener('click', resetSettings.bind(resetSettings, settings));
};
//#endregion
//#region createSlider
export const createSlider = (data, updateCb) => {
    const comp = document.createElement('kul-slider');
    comp.dataset.id = data.id;
    comp.kulLabel = data.ariaLabel;
    comp.kulLeadingLabel = true;
    comp.kulMax = Number(data.max);
    comp.kulMin = Number(data.min);
    comp.kulStep = Number(data.step);
    comp.kulStyle = '.form-field { width: 100%; }';
    comp.kulValue = Number(data.defaultValue);
    comp.addEventListener('kul-slider-event', sliderEventHandler.bind(sliderEventHandler, updateCb));
    return comp;
};
//#endregion
//#region createToggle
export const createToggle = (data, updateCb) => {
    const comp = document.createElement('kul-toggle');
    comp.dataset.id = data.id;
    comp.kulLabel = data.ariaLabel;
    comp.kulValue = false;
    comp.addEventListener('kul-toggle-event', sliderEventHandler.bind(toggleEventHandler, updateCb));
    return comp;
};
//#endregion
//#region Utils
export const getPathColumn = (dataset) => {
    return dataset?.columns?.find((c) => c.id === ImageEditorWidgetColumnId.Path) || null;
};
export const getStatusColumn = (dataset) => {
    return dataset?.columns?.find((c) => c.id === ImageEditorWidgetColumnId.Status) || null;
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
            case 'KUL-TOGGLE':
                const toggle = control;
                toggle.setValue(toggle.kulValue ? 'on' : 'off');
                break;
        }
    }
};
export const setGridStatus = (status, grid, actionButtons) => {
    switch (status) {
        case ImageEditorWidgetStatus.Completed:
            requestAnimationFrame(() => {
                actionButtons.interrupt.kulDisabled = true;
                actionButtons.resume.kulDisabled = true;
            });
            grid.classList.add(imageEditorFactory.cssClasses.gridIsInactive);
            break;
        case ImageEditorWidgetStatus.Pending:
            requestAnimationFrame(() => {
                actionButtons.interrupt.kulDisabled = false;
                actionButtons.resume.kulDisabled = false;
            });
            grid.classList.remove(imageEditorFactory.cssClasses.gridIsInactive);
            break;
    }
};
//#endregion
