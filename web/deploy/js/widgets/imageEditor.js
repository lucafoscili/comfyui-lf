import { TREE_DATA } from '../fixtures/imageEditor.js';
import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, debounce, getApiRoutes, getLFManager, isValidNumber, normalizeValue, unescapeJson, } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-imageeditor';
const TYPE = CustomWidgetName.imageEditor;
export const imageEditorFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        dirTextfield: `${BASE_CSS_CLASS}__dir-textfield`,
        editPanel: `${BASE_CSS_CLASS}__edit-panel`,
        loadButton: `${BASE_CSS_CLASS}__load-button`,
        grid: `${BASE_CSS_CLASS}__grid`,
        image: `${BASE_CSS_CLASS}__image`,
        gridSelected: `${BASE_CSS_CLASS}__grid--selected`,
        filtersTree: `${BASE_CSS_CLASS}__filters-tree`,
        masonry: `${BASE_CSS_CLASS}__masonry`,
        settings: `${BASE_CSS_CLASS}__settings`,
    },
    options: (masonry, textfield) => {
        return {
            hideOnZoom: false,
            getComp() {
                return { masonry, textfield };
            },
            getValue: () => {
                return masonry.kulData || {};
            },
            refresh: async (directory) => {
                getLFManager()
                    .getApiRoutes()
                    .image.get(directory)
                    .then((r) => {
                    if (r.status === 'success') {
                        if (r?.data && Object.entries(r.data).length > 0) {
                            masonry.kulData = r.data;
                        }
                        else {
                            getLFManager().log('Images not found.', { r }, LogSeverity.Info);
                        }
                    }
                });
            },
            setValue: (value) => {
                const callback = (_, u) => {
                    const parsedValue = u.parsedJson;
                    masonry.kulData = parsedValue || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const grid = document.createElement('div');
        const editPanel = document.createElement('div');
        const settings = document.createElement('div');
        const button = document.createElement('kul-button');
        const image = document.createElement('kul-image');
        const masonry = document.createElement('kul-masonry');
        const spinner = document.createElement('kul-spinner');
        const textfield = document.createElement('kul-textfield');
        const tree = document.createElement('kul-tree');
        const options = imageEditorFactory.options(masonry, textfield);
        settings.classList.add(imageEditorFactory.cssClasses.settings);
        tree.classList.add(imageEditorFactory.cssClasses.filtersTree);
        tree.kulAccordionLayout = true;
        tree.kulData = TREE_DATA;
        tree.kulSelectable = true;
        tree.addEventListener('kul-tree-event', treeEventHandler.bind(treeEventHandler, image, settings));
        image.classList.add(imageEditorFactory.cssClasses.image);
        image.classList.add('kul-fit');
        editPanel.appendChild(image);
        editPanel.appendChild(tree);
        editPanel.appendChild(settings);
        editPanel.classList.add(imageEditorFactory.cssClasses.editPanel);
        spinner.kulActive = true;
        spinner.kulDimensions = '2px';
        spinner.kulLayout = 1;
        spinner.slot = 'spinner';
        button.appendChild(spinner);
        button.kulIcon = 'find_replace';
        button.kulLabel = 'Load';
        button.classList.add('kul-full-width');
        button.classList.add(imageEditorFactory.cssClasses.loadButton);
        button.addEventListener('kul-button-event', buttonEventHandler.bind(buttonEventHandler, textfield, options.refresh));
        textfield.classList.add(imageEditorFactory.cssClasses.dirTextfield);
        textfield.kulIcon = 'folder';
        textfield.kulLabel = 'Directory (relative to ComfyUI/input)';
        textfield.kulStyling = 'flat';
        masonry.classList.add(imageEditorFactory.cssClasses.masonry);
        masonry.kulSelectable = true;
        masonry.addEventListener('kul-masonry-event', masonryEventHandler.bind(masonryEventHandler, grid, image));
        grid.classList.add(imageEditorFactory.cssClasses.grid);
        grid.appendChild(textfield);
        grid.appendChild(button);
        grid.appendChild(masonry);
        grid.appendChild(editPanel);
        content.classList.add(imageEditorFactory.cssClasses.content);
        content.appendChild(grid);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
const buttonEventHandler = async (textfield, refreshCb, e) => {
    const { comp, eventType } = e.detail;
    const button = comp;
    switch (eventType) {
        case 'click':
            requestAnimationFrame(() => (button.kulShowSpinner = true));
            const value = await textfield.getValue();
            await refreshCb(value);
            requestAnimationFrame(() => (button.kulShowSpinner = false));
            break;
    }
};
const masonryEventHandler = async (grid, image, e) => {
    const { comp, eventType, originalEvent, selectedShape } = e.detail;
    const masonry = comp.rootElement;
    switch (eventType) {
        case 'kul-event':
            const { eventType } = originalEvent.detail;
            switch (eventType) {
                case 'click':
                    const v = selectedShape.shape?.value || selectedShape.shape?.kulValue;
                    const isSelected = isValidNumber(selectedShape.index);
                    masonry.dataset.index = isSelected ? selectedShape.index.toString() : '';
                    masonry.dataset.name = v ? String(v).valueOf() : '';
                    if (isSelected) {
                        grid.classList.add(imageEditorFactory.cssClasses.gridSelected);
                        image.kulValue = String(v).valueOf();
                        image.title = String(v).valueOf();
                    }
                    else {
                        grid.classList.remove(imageEditorFactory.cssClasses.gridSelected);
                        image.kulValue = null;
                        image.title = '';
                    }
                    break;
            }
            break;
    }
};
const treeEventHandler = async (image, settings, e) => {
    const { eventType, node } = e.detail;
    switch (eventType) {
        case 'click':
            prepSettings(settings, node, image);
            break;
    }
};
const createSliderControl = (sliderData) => {
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
const prepSettings = (settings, node, image) => {
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
    const updateSettings = (triggerApiCall = true) => {
        const inputs = settings.querySelectorAll('input');
        inputs.forEach((input) => {
            const id = input.id;
            settingsValues[id] = parseFloat(input.value);
        });
        if (triggerApiCall) {
            getApiRoutes()
                .image.process(image.kulValue, filterType, settingsValues)
                .then((r) => {
                if (r.status === 'success') {
                    image.kulValue = r.data;
                    image.title = r.data;
                }
                else {
                    console.error('Image processing failed:', r.message);
                    image.title = r.message;
                }
            })
                .catch((error) => {
                console.error('API call failed:', error);
                image.title = 'Error processing image';
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
};
