import { SETTINGS } from '../fixtures/imageEditor';
import { KulEventName } from '../types/events/events';
import {
  KulButtonEventPayload,
  KulCanvasEventPayload,
  KulImageviewerEventPayload,
  KulSliderEventPayload,
  KulTextfieldEventPayload,
  KulToggleEventPayload,
  KulTreeEventPayload,
} from '../types/ketchup-lite/components';
import {
  KulDataColumn,
  KulDataDataset,
  KulDataNode,
} from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { KulGenericEvent } from '../types/ketchup-lite/types/GenericTypes';
import { LogSeverity } from '../types/manager/manager';
import { NodeName, TagName } from '../types/widgets/widgets';
import {
  ImageEditorActionButtons,
  ImageEditorBrushFilter,
  ImageEditorBrushSettings,
  ImageEditorColumnId,
  ImageEditorControlConfig,
  ImageEditorControlIds,
  ImageEditorControls,
  ImageEditorCSS,
  ImageEditorFilter,
  ImageEditorFilterType,
  ImageEditorIcons,
  ImageEditorSliderConfig,
  ImageEditorState,
  ImageEditorStatus,
  ImageEditorTextfieldConfig,
  ImageEditorToggleConfig,
  ImageEditorUpdateCallback,
} from '../types/widgets/imageEditor';
import {
  debounce,
  getApiRoutes,
  getLFManager,
  isTree,
  isValidObject,
  unescapeJson,
} from '../utils/common';

export const EV_HANDLERS = {
  //#region Button handler
  button: async (state: ImageEditorState, e: CustomEvent<KulButtonEventPayload>) => {
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
          const path = (unescapeJson(pathColumn).parsedJson as KulDataColumn).title;

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
  canvas: async (state: ImageEditorState, e: CustomEvent<KulCanvasEventPayload>) => {
    const { comp, eventType, points } = e.detail;

    const { filter, filterType } = state;

    switch (eventType) {
      case 'stroke':
        const originalFilter = filter;
        const originalFilterType = filterType;

        if (!filter?.hasCanvasAction) {
          state.filterType = 'brush';
        }

        const temporaryFilter: ImageEditorBrushFilter = {
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
        } finally {
          state.filter = originalFilter;
          state.filterType = originalFilterType;
        }
        break;
    }
  },
  //#endregion
  //#region Imageviewer handler
  imageviewer: async (state: ImageEditorState, e: CustomEvent<KulImageviewerEventPayload>) => {
    const { comp, eventType, originalEvent } = e.detail;

    const { node } = state;

    switch (eventType) {
      case 'kul-event':
        const ogEv = originalEvent as KulGenericEvent;
        switch (ogEv.detail.eventType) {
          case 'click':
            if (isTree(ogEv.detail.comp)) {
              const { node } = ogEv.detail as KulTreeEventPayload;
              if (node.cells?.kulCode) {
                prepSettings(state, node);
              }
            }
            break;
          case 'stroke':
            const canvasEv = ogEv as CustomEvent<KulCanvasEventPayload>;
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
  slider: async (updateCb: ImageEditorUpdateCallback, e: CustomEvent<KulSliderEventPayload>) => {
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
  },
  //#endregion
  //#region Textfield handler
  textfield: async (
    updateCb: ImageEditorUpdateCallback,
    e: CustomEvent<KulTextfieldEventPayload>,
  ) => {
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
  },
  //#endregion
  //#region Toggle
  toggle: async (updateCb: ImageEditorUpdateCallback, e: CustomEvent<KulToggleEventPayload>) => {
    const { eventType } = e.detail;

    switch (eventType) {
      case 'change':
        updateCb(true);
        break;
    }
  },
  //#endregion
};
//#region apiCall
export const apiCall = async (state: ImageEditorState, addSnapshot: boolean) => {
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
      } else {
        const { canvas } = await imageviewer.getComponents();
        const image = await canvas.getImage();
        requestAnimationFrame(() => (image.kulValue = response.data));
      }
    } else {
      lfManager.log('Error processing image!', { response }, LogSeverity.Error);
    }
  } catch (error) {
    lfManager.log('Error processing image!', { error }, LogSeverity.Error);
  }
  requestAnimationFrame(() => imageviewer.setSpinnerStatus(false));
};
//#endregion
//#region refreshValues
export const refreshValues = async (state: ImageEditorState, addSnapshot = false) => {
  const { elements, filter } = state;
  const { controls } = elements;

  const lfManager = getLFManager();

  for (const key in controls) {
    if (Object.prototype.hasOwnProperty.call(controls, key)) {
      const id = key as ImageEditorControlIds;
      const control = controls[id];

      switch (control.tagName) {
        case 'KUL-SLIDER': {
          const slider = control as HTMLKulSliderElement;
          const sliderValue = await slider.getValue();
          filter.settings[id] = addSnapshot ? sliderValue.real : sliderValue.display;
          break;
        }
        case 'KUL-TEXTFIELD': {
          const textfield = control as HTMLKulTextfieldElement;
          const textfieldValue = await textfield.getValue();
          filter.settings[id] = textfieldValue;
          break;
        }
        case 'KUL-TOGGLE': {
          const toggle = control as HTMLKulToggleElement;
          const toggleValue = await toggle.getValue();
          filter.settings[id] = toggleValue === 'on' ? toggle.dataset.on : toggle.dataset.off;
          break;
        }
        default:
          lfManager.log(
            `Unhandled control type: ${control.tagName}`,
            { control },
            LogSeverity.Warning,
          );
          continue;
      }
    }
  }
};
//#endregion
//#region prepSettings
export const prepSettings = (state: ImageEditorState, node: KulDataNode) => {
  state.filter = unescapeJson(node.cells.kulCode.value).parsedJson as ImageEditorFilter;
  state.filterType = node.id as ImageEditorFilterType;

  const { elements, filter } = state;
  const { settings } = elements;

  settings.innerHTML = '';

  const controlsContainer = document.createElement(TagName.Div);
  controlsContainer.classList.add(ImageEditorCSS.SettingsControls);
  settings.appendChild(controlsContainer);

  const controlNames = Object.keys(filter.configs) as ImageEditorControls[];
  controlNames.forEach((controlName) => {
    const controls: ImageEditorControlConfig[] = filter.configs[controlName];
    if (controls) {
      controls.forEach((control) => {
        switch (controlName) {
          case ImageEditorControls.Slider:
            controlsContainer.appendChild(createSlider(state, control as ImageEditorSliderConfig));
            break;
          case ImageEditorControls.Textfield:
            controlsContainer.appendChild(
              createTextfield(state, control as ImageEditorTextfieldConfig),
            );
            break;
          case ImageEditorControls.Toggle:
            controlsContainer.appendChild(createToggle(state, control as ImageEditorToggleConfig));
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
export const createSlider = (state: ImageEditorState, data: ImageEditorSliderConfig) => {
  const comp = document.createElement(TagName.KulSlider);

  comp.kulLabel = parseLabel(data);
  comp.kulLeadingLabel = true;
  comp.kulMax = Number(data.max);
  comp.kulMin = Number(data.min);
  comp.kulStep = Number(data.step);
  comp.kulStyle = '.form-field { width: 100%; }';
  comp.kulValue = Number(data.defaultValue);
  comp.title = data.title;

  comp.addEventListener(
    KulEventName.KulSlider,
    EV_HANDLERS.slider.bind(EV_HANDLERS.slider.bind, state),
  );

  return comp;
};
//#endregion
//#region createTextfield
export const createTextfield = (state: ImageEditorState, data: ImageEditorTextfieldConfig) => {
  const comp = document.createElement(TagName.KulTextfield);

  comp.kulLabel = parseLabel(data);
  comp.kulHtmlAttributes = { type: data.type };
  comp.kulValue = String(data.defaultValue).valueOf();
  comp.title = data.title;

  comp.addEventListener(
    KulEventName.KulTextfield,
    EV_HANDLERS.textfield.bind(EV_HANDLERS.textfield.bind, state),
  );

  return comp;
};
//#endregion
//#region createToggle
export const createToggle = (state: ImageEditorState, data: ImageEditorToggleConfig) => {
  const comp = document.createElement(TagName.KulToggle);

  comp.dataset.off = data.off;
  comp.dataset.on = data.on;
  comp.kulLabel = parseLabel(data);
  comp.kulValue = false;
  comp.title = data.title;

  comp.addEventListener(
    KulEventName.KulToggle,
    EV_HANDLERS.toggle.bind(EV_HANDLERS.toggle.bind, state),
  );

  return comp;
};
//#endregion
//#region Utils
export const getPathColumn = (dataset: KulDataDataset): KulDataColumn | null => {
  return dataset?.columns?.find((c) => c.id === ImageEditorColumnId.Path) || null;
};
export const getStatusColumn = (dataset: KulDataDataset): KulDataColumn | null => {
  return dataset?.columns?.find((c) => c.id === ImageEditorColumnId.Status) || null;
};
export const parseLabel = (data: ImageEditorControlConfig) => {
  return data.isMandatory ? `${data.ariaLabel}*` : data.ariaLabel;
};
export const resetSettings = async (settings: HTMLElement) => {
  const controls = settings.querySelectorAll('[data-id]');
  for (const control of controls) {
    switch (control.tagName) {
      case 'KUL-SLIDER':
        const slider = control as HTMLKulSliderElement;
        await slider.setValue(slider.kulValue);
        await slider.refresh();
        break;
      case 'KUL-TEXTFIELD':
        const textfield = control as HTMLKulTextfieldElement;
        await textfield.setValue(textfield.kulValue);
        break;
      case 'KUL-TOGGLE':
        const toggle = control as HTMLKulToggleElement;
        toggle.setValue(toggle.kulValue ? 'on' : 'off');
        break;
    }
  }
};
export const setGridStatus = (
  status: ImageEditorStatus,
  grid: HTMLDivElement,
  actionButtons: ImageEditorActionButtons,
) => {
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
export const updateCb = async (state: ImageEditorState, addSnapshot = false) => {
  await refreshValues(state, addSnapshot);

  const { elements, filter } = state;
  const { imageviewer } = elements;
  const { settings } = filter;

  const validValues = isValidObject(settings);

  const isStroke = !filter || filter.hasCanvasAction;

  if (validValues && isStroke) {
    const { color, size, opacity } = settings as ImageEditorBrushSettings;

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
