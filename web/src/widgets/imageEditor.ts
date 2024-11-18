import { TREE_DATA } from '../fixtures/imageEditor';
import {
  buttonEventHandler,
  getStatusColumn,
  imageviewerEventHandler,
  setGridStatus,
} from '../helpers/imageEditor';
import { LogSeverity } from '../types/manager/manager';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
} from '../types/widgets/_common';
import {
  ImageEditorActionButtons,
  ImageEditorDeserializedValue,
  ImageEditorFactory,
  ImageEditorIcons,
  ImageEditorStatus,
} from '../types/widgets/imageEditor';
import { createDOMWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-imageeditor';
const TYPE = CustomWidgetName.imageEditor;

//#region Image editor
export const imageEditorFactory: ImageEditorFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    actions: `${BASE_CSS_CLASS}__actions`,
    grid: `${BASE_CSS_CLASS}__grid`,
    gridHasActions: `${BASE_CSS_CLASS}__grid--has-actions`,
    gridIsInactive: `${BASE_CSS_CLASS}__grid--is-inactive`,
    imageviewer: `${BASE_CSS_CLASS}__widget`,
    settings: `${BASE_CSS_CLASS}__settings`,
  },
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
          const parsedValue = u.parsedJson as ImageEditorDeserializedValue;
          if (getStatusColumn(parsedValue)?.title === ImageEditorStatus.Pending) {
            setGridStatus(ImageEditorStatus.Pending, grid, actionButtons);
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

    const actionButtons: ImageEditorActionButtons = {};

    switch (node.comfyClass) {
      case NodeName.imagesEditingBreakpoint:
        const actions = document.createElement('div');
        const interrupt = document.createElement('kul-button');
        const resume = document.createElement('kul-button');

        interrupt.classList.add(imageEditorFactory.cssClasses.resume);
        interrupt.classList.add('kul-full-width');
        interrupt.classList.add('kul-danger');
        interrupt.kulIcon = ImageEditorIcons.Interrupt;
        interrupt.kulLabel = 'Interrupt workflow';
        interrupt.kulStyling = 'flat';
        interrupt.title = 'Click to interrupt the workflow.';

        resume.classList.add(imageEditorFactory.cssClasses.resume);
        resume.classList.add('kul-full-width');
        resume.classList.add('kul-success');
        resume.kulIcon = ImageEditorIcons.Resume;
        resume.kulLabel = 'Resume workflow';
        resume.kulStyling = 'flat';
        resume.title =
          'Click to resume the workflow. Remember to save your snapshots after editing the images!';

        actions.classList.add(imageEditorFactory.cssClasses.actions);
        actions.appendChild(interrupt);
        actions.appendChild(resume);
        actions.addEventListener(
          'kul-button-event',
          buttonEventHandler.bind(buttonEventHandler, imageviewer, actionButtons, grid),
        );

        grid.classList.add(imageEditorFactory.cssClasses.gridIsInactive);
        grid.classList.add(imageEditorFactory.cssClasses.gridHasActions);
        grid.appendChild(actions);

        actionButtons.interrupt = interrupt;
        actionButtons.resume = resume;

        setGridStatus(ImageEditorStatus.Completed, grid, actionButtons);
    }

    grid.classList.add(imageEditorFactory.cssClasses.grid);
    grid.appendChild(imageviewer);

    content.classList.add(imageEditorFactory.cssClasses.content);
    content.appendChild(grid);

    wrapper.appendChild(content);

    const options = imageEditorFactory.options(imageviewer, actionButtons, grid);
    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
