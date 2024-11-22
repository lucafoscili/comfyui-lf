import { TREE_DATA } from '../fixtures/imageEditor.js';
import { buttonEventHandler, getStatusColumn, imageviewerEventHandler, setGridStatus, } from '../helpers/imageEditor.js';
import { KulEventName } from '../types/events/events.js';
import { LogSeverity } from '../types/manager/manager.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { ImageEditorCSS, ImageEditorIcons, ImageEditorStatus, } from '../types/widgets/imageEditor.js';
import { createDOMWidget, getLFManager, normalizeValue } from '../utils/common.js';
//#region Image editor
export const imageEditorFactory = {
    options: (imageviewer, actionButtons, grid) => {
        return {
            hideOnZoom: false,
            getComp() {
                return { imageviewer };
            },
            getValue: () => {
                return imageviewer.kulData || {};
            },
            refresh: async (directory) => {
                getLFManager()
                    .getApiRoutes()
                    .image.get(directory)
                    .then((r) => {
                    if (r.status === 'success') {
                        if (r?.data && Object.entries(r.data).length > 0) {
                            imageviewer.kulData = r.data;
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
                    if (getStatusColumn(parsedValue)?.title === ImageEditorStatus.Pending) {
                        setGridStatus(ImageEditorStatus.Pending, grid, actionButtons);
                    }
                    imageviewer.kulData = parsedValue || {};
                };
                normalizeValue(value, callback, CustomWidgetName.imageEditor);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const grid = document.createElement(TagName.Div);
        const settings = document.createElement(TagName.Div);
        const imageviewer = document.createElement(TagName.KulImageviewer);
        settings.classList.add(ImageEditorCSS.Settings);
        settings.slot = 'settings';
        imageviewer.classList.add(ImageEditorCSS.Widget);
        imageviewer.kulLoadCallback = async (_, value) => await options.refresh(value);
        imageviewer.kulValue = TREE_DATA;
        imageviewer.addEventListener(KulEventName.KulImageviewer, imageviewerEventHandler.bind(imageviewerEventHandler, settings, node));
        imageviewer.appendChild(settings);
        const actionButtons = {};
        switch (node.comfyClass) {
            case NodeName.imagesEditingBreakpoint:
                const actions = document.createElement(TagName.Div);
                const interrupt = document.createElement(TagName.KulButton);
                const resume = document.createElement(TagName.KulButton);
                interrupt.classList.add('kul-full-width');
                interrupt.classList.add('kul-danger');
                interrupt.kulIcon = ImageEditorIcons.Interrupt;
                interrupt.kulLabel = 'Interrupt workflow';
                interrupt.kulStyling = 'flat';
                interrupt.title = 'Click to interrupt the workflow.';
                resume.classList.add('kul-full-width');
                resume.classList.add('kul-success');
                resume.kulIcon = ImageEditorIcons.Resume;
                resume.kulLabel = 'Resume workflow';
                resume.kulStyling = 'flat';
                resume.title =
                    'Click to resume the workflow. Remember to save your snapshots after editing the images!';
                actions.classList.add(ImageEditorCSS.Actions);
                actions.appendChild(interrupt);
                actions.appendChild(resume);
                actions.addEventListener(KulEventName.KulButton, buttonEventHandler.bind(buttonEventHandler, imageviewer, actionButtons, grid));
                grid.classList.add(ImageEditorCSS.GridIsInactive);
                grid.classList.add(ImageEditorCSS.GridHasActions);
                grid.appendChild(actions);
                actionButtons.interrupt = interrupt;
                actionButtons.resume = resume;
                setGridStatus(ImageEditorStatus.Completed, grid, actionButtons);
        }
        grid.classList.add(ImageEditorCSS.Grid);
        grid.appendChild(imageviewer);
        content.classList.add(ImageEditorCSS.Content);
        content.appendChild(grid);
        wrapper.appendChild(content);
        const options = imageEditorFactory.options(imageviewer, actionButtons, grid);
        return { widget: createDOMWidget(CustomWidgetName.imageEditor, wrapper, node, options) };
    },
};
//#endregion
