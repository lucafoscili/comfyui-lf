import { TREE_DATA } from '../fixtures/imageEditor';
import {
  buttonEventHandler,
  getStatusColumn,
  imageviewerEventHandler,
  INTERRUPT_ICON,
  RESUME_ICON,
  Status,
} from '../helpers/imageEditor';
import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  ImageEditorWidgetDeserializedValue,
  ImageEditorWidgetFactory,
  ImageEditorWidgetActionButtons,
} from '../types/widgets';
import { createDOMWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-imageeditor';
const TYPE = CustomWidgetName.imageEditor;
//#region imageEditorFactory
export const imageEditorFactory: ImageEditorWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    actions: `${BASE_CSS_CLASS}__actions`,
    grid: `${BASE_CSS_CLASS}__grid`,
    gridHasResume: `${BASE_CSS_CLASS}__grid--has-actions`,
    imageviewer: `${BASE_CSS_CLASS}__widget`,
    settings: `${BASE_CSS_CLASS}__settings`,
  },
  options: (imageviewer, actionButtons) => {
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
              } else {
                getLFManager().log('Images not found.', { r }, LogSeverity.Info);
              }
            }
          });
      },
      setValue: (value) => {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const parsedValue = u.parsedJson as ImageEditorWidgetDeserializedValue;
          if (getStatusColumn(parsedValue)?.title === Status.Pending) {
            actionButtons.resume.kulDisabled = false;
          }

          imageviewer.kulData = parsedValue || {};
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const grid = document.createElement('div');
    const settings = document.createElement('div');
    const imageviewer = document.createElement('kul-imageviewer');

    settings.classList.add(imageEditorFactory.cssClasses.settings);
    settings.slot = 'settings';

    imageviewer.classList.add(imageEditorFactory.cssClasses.imageviewer);
    imageviewer.kulLoadCallback = async (_, value) => await options.refresh(value);
    imageviewer.kulValue = TREE_DATA;
    imageviewer.addEventListener(
      'kul-imageviewer-event',
      imageviewerEventHandler.bind(imageviewerEventHandler, settings, node),
    );
    imageviewer.appendChild(settings);

    const actionButtons: ImageEditorWidgetActionButtons = {};

    switch (node.comfyClass) {
      case NodeName.imagesEditingBreakpoint:
        const actions = document.createElement('div');
        const interrupt = document.createElement('kul-button');
        const resume = document.createElement('kul-button');

        interrupt.classList.add(imageEditorFactory.cssClasses.resume);
        interrupt.classList.add('kul-full-width');
        interrupt.classList.add('kul-danger');
        interrupt.kulIcon = INTERRUPT_ICON;
        interrupt.kulLabel = 'Interrupt workflow';
        interrupt.kulStyling = 'flat';
        interrupt.title = 'Click to interrupt the workflow.';
        interrupt.addEventListener(
          'kul-button-event',
          buttonEventHandler.bind(buttonEventHandler, imageviewer),
        );

        resume.classList.add(imageEditorFactory.cssClasses.resume);
        resume.classList.add('kul-full-width');
        resume.classList.add('kul-success');
        resume.kulDisabled = true;
        resume.kulIcon = RESUME_ICON;
        resume.kulLabel = 'Resume workflow';
        resume.kulStyling = 'flat';
        resume.title =
          'Click to resume the workflow. Remember to save your snapshots after editing the images!';
        resume.addEventListener(
          'kul-button-event',
          buttonEventHandler.bind(buttonEventHandler, imageviewer),
        );

        actions.classList.add(imageEditorFactory.cssClasses.actions);
        actions.appendChild(interrupt);
        actions.appendChild(resume);

        grid.classList.add(imageEditorFactory.cssClasses.gridHasResume);
        grid.appendChild(actions);

        actionButtons.interrupt = interrupt;
        actionButtons.resume = resume;
    }

    grid.classList.add(imageEditorFactory.cssClasses.grid);
    grid.appendChild(imageviewer);

    content.classList.add(imageEditorFactory.cssClasses.content);
    content.appendChild(grid);

    wrapper.appendChild(content);

    const options = imageEditorFactory.options(imageviewer, actionButtons);
    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
