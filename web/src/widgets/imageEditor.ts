import { TREE_DATA } from '../fixtures/imageEditor';
import { EV_HANDLERS, getStatusColumn, setGridStatus, updateCb } from '../helpers/imageEditor';
import { KulEventName } from '../types/events/events';
import { LogSeverity } from '../types/manager/manager';
import {
  ImageEditorActionButtons,
  ImageEditorCSS,
  ImageEditorDeserializedValue,
  ImageEditorFactory,
  ImageEditorIcons,
  ImageEditorNormalizeCallback,
  ImageEditorState,
  ImageEditorStatus,
} from '../types/widgets/imageEditor';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets';
import { createDOMWidget, getLFManager, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, ImageEditorState>();

export const imageEditorFactory: ImageEditorFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue: () => {
        const { imageviewer } = STATE.get(wrapper).elements;

        return imageviewer.kulData || {};
      },
      setValue: (value) => {
        const { actionButtons, grid, imageviewer } = STATE.get(wrapper).elements;

        const callback: ImageEditorNormalizeCallback = (_, u) => {
          const parsedValue = u.parsedJson as ImageEditorDeserializedValue;
          const isPending = getStatusColumn(parsedValue)?.title === ImageEditorStatus.Pending;
          if (isPending) {
            setGridStatus(ImageEditorStatus.Pending, grid, actionButtons);
          }

          imageviewer.kulData = parsedValue || {};
        };

        normalizeValue(value, callback, CustomWidgetName.imageEditor);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const grid = document.createElement(TagName.Div);
    const settings = document.createElement(TagName.Div);
    const imageviewer = document.createElement(TagName.KulImageviewer);

    const refresh = async (directory: string) => {
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
    };

    settings.classList.add(ImageEditorCSS.Settings);
    settings.slot = 'settings';

    imageviewer.classList.add(ImageEditorCSS.Widget);
    imageviewer.kulLoadCallback = async (_, value) => await refresh(value);
    imageviewer.kulValue = TREE_DATA;
    imageviewer.addEventListener(KulEventName.KulImageviewer, (e) =>
      EV_HANDLERS.imageviewer(STATE.get(wrapper), e),
    );
    imageviewer.appendChild(settings);

    const actionButtons: ImageEditorActionButtons = {};

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
        interrupt.addEventListener(KulEventName.KulButton, (e) =>
          EV_HANDLERS.button(STATE.get(wrapper), e),
        );

        resume.classList.add('kul-full-width');
        resume.classList.add('kul-success');
        resume.kulIcon = ImageEditorIcons.Resume;
        resume.kulLabel = 'Resume workflow';
        resume.kulStyling = 'flat';
        resume.title =
          'Click to resume the workflow. Remember to save your snapshots after editing the images!';
        resume.addEventListener(KulEventName.KulButton, (e) =>
          EV_HANDLERS.button(STATE.get(wrapper), e),
        );

        actions.classList.add(ImageEditorCSS.Actions);
        actions.appendChild(interrupt);
        actions.appendChild(resume);

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

    const options = imageEditorFactory.options(wrapper);

    STATE.set(wrapper, {
      elements: { actionButtons, controls: {}, grid, imageviewer, settings },
      filter: null,
      filterType: null,
      node,
      update: {
        preview: () => updateCb(STATE.get(wrapper)),
        snapshot: () => updateCb(STATE.get(wrapper), true),
      },
      wrapper,
    });

    return { widget: createDOMWidget(CustomWidgetName.imageEditor, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
