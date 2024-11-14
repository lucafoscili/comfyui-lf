import { ON_COMPLETE } from '../fixtures/imageEditor.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { debounce, getApiRoutes, getLFManager, unescapeJson } from '../utils/common.js';
import { imageEditorFactory } from '../widgets/imageEditor.js';
export var ColumnId;
(function (ColumnId) {
    ColumnId["Path"] = "path";
    ColumnId["Status"] = "status";
})(ColumnId || (ColumnId = {}));
export var Status;
(function (Status) {
    Status["Completed"] = "completed";
    Status["Pending"] = "pending";
})(Status || (Status = {}));
export const INTERRUPT_ICON = 'stop';
export const RESUME_ICON = 'play';
//#region buttonEventHandler
export const buttonEventHandler = async (imageviewer, actionButtons, grid, e) => {
    const { comp, eventType } = e.detail;
    switch (eventType) {
        case 'click':
            const update = async () => {
                const dataset = imageviewer.kulData;
                const pathColumn = getPathColumn(dataset);
                const statusColumn = getStatusColumn(dataset);
                if (statusColumn?.title === Status.Pending) {
                    statusColumn.title = Status.Completed;
                    const path = unescapeJson(pathColumn).parsedJson.title;
                    await getApiRoutes().json.update(path, dataset);
                    setGridStatus(Status.Completed, grid, actionButtons);
                    const masonry = (await imageviewer.getComponents()).masonry;
                    await imageviewer.reset();
                    await masonry.setSelectedShape(null);
                    imageviewer.kulData = ON_COMPLETE;
                }
            };
            switch (comp.kulIcon) {
                case INTERRUPT_ICON:
                    getApiRoutes().interrupt();
                    update();
                    break;
                case RESUME_ICON:
                    update();
                    break;
            }
            break;
        default:
            break;
    }
};
//#endregion
//#region imageviewerEventHandler
export const imageviewerEventHandler = async (settings, node, e) => {
    const { comp, eventType, originalEvent } = e.detail;
    switch (eventType) {
        case 'kul-event':
            const ogEv = originalEvent;
            switch (ogEv.detail.eventType) {
                case 'click':
                    if (ogEv.detail.comp.rootElement.tagName === 'KUL-TREE') {
                        const { node } = ogEv.detail;
                        prepSettings(settings, node, comp.rootElement);
                    }
                    break;
            }
            break;
        case 'ready':
            comp.getComponents().then((r) => {
                switch (node.comfyClass) {
                    case NodeName.imagesEditingBreakpoint:
                        r.load.kulDisabled = true;
                        r.load.kulIcon = 'timer-sand';
                        r.load.kulLabel = '';
                        r.textfield.kulDisabled = true;
                        r.textfield.kulLabel = 'Previews are visible in your ComfyUI/temp folder';
                        break;
                    default:
                        r.textfield.kulLabel = 'Directory (relative to ComfyUI/input)';
                        break;
                }
            });
            break;
    }
};
//#endregion
//#region prepSettings
export const prepSettings = (settings, node, imageviewer) => {
    settings.innerHTML = '';
    const widgets = unescapeJson(node.cells.kulCode.value).parsedJson;
    const filterType = node.id;
    const settingsValues = {};
    const resetButton = document.createElement('kul-button');
    resetButton.kulIcon = 'refresh';
    resetButton.kulLabel = 'Reset';
    settings.appendChild(resetButton);
    for (const controlName in widgets) {
        const sliders = widgets[controlName];
        sliders.forEach((sliderData) => {
            const sliderControl = createSliderControl(sliderData);
            settings.appendChild(sliderControl);
        });
    }
    const updateSettings = async (triggerApiCall = true, addSnapshot = false) => {
        const inputs = settings.querySelectorAll('input');
        inputs.forEach((input) => {
            const id = input.id;
            settingsValues[id] = parseFloat(input.value);
        });
        if (triggerApiCall) {
            const value = (await imageviewer.getCurrentSnapshot()).value;
            getApiRoutes()
                .image.process(value, filterType, settingsValues)
                .then(async (r) => {
                if (r.status === 'success') {
                    if (addSnapshot) {
                        imageviewer.addSnapshot(r.data);
                    }
                    else {
                        const image = (await imageviewer.getComponents()).image;
                        image.kulValue = r.data;
                    }
                }
                else {
                    console.error('Image processing failed:', r.message);
                    getLFManager().log('Error processing image!', { r }, LogSeverity.Error);
                }
            })
                .catch((error) => {
                console.error('API call failed:', error);
                getLFManager().log('Error processing image!', { error }, LogSeverity.Error);
            });
        }
    };
    resetButton.addEventListener('click', () => {
        const inputs = settings.querySelectorAll('input');
        inputs.forEach((input) => {
            input.value = input.defaultValue;
        });
        updateSettings(false);
    });
    const debouncedUpdateSettings = debounce(updateSettings, 300);
    settings.addEventListener('input', () => debouncedUpdateSettings());
    settings.addEventListener('change', () => updateSettings(true, true));
};
//#endregion
//#region createSliderControl
export const createSliderControl = (sliderData) => {
    const container = document.createElement('div');
    container.className = 'slider-control';
    const label = document.createElement('label');
    label.textContent = sliderData.ariaLabel || 'Slider';
    label.title = sliderData.title;
    const input = document.createElement('input');
    input.type = 'range';
    input.id = sliderData.id;
    input.min = sliderData.min;
    input.max = sliderData.max;
    input.step = sliderData.step;
    input.value = sliderData.defaultValue;
    input.ariaLabel = sliderData.ariaLabel;
    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'slider-value';
    valueDisplay.textContent = sliderData.defaultValue;
    input.addEventListener('input', () => {
        valueDisplay.textContent = input.value;
    });
    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(valueDisplay);
    return container;
};
//#endregion
//#region Utils
export const getPathColumn = (dataset) => {
    return dataset?.columns?.find((c) => c.id === ColumnId.Path) || null;
};
export const getStatusColumn = (dataset) => {
    return dataset?.columns?.find((c) => c.id === ColumnId.Status) || null;
};
export const setGridStatus = (status, grid, actionButtons) => {
    switch (status) {
        case Status.Completed:
            requestAnimationFrame(() => {
                actionButtons.interrupt.kulDisabled = true;
                actionButtons.resume.kulDisabled = true;
            });
            grid.classList.add(imageEditorFactory.cssClasses.gridIsInactive);
            break;
        case Status.Pending:
            requestAnimationFrame(() => {
                actionButtons.interrupt.kulDisabled = false;
                actionButtons.resume.kulDisabled = false;
            });
            grid.classList.remove(imageEditorFactory.cssClasses.gridIsInactive);
            break;
    }
};
//#endregion
