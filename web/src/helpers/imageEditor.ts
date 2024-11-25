import { debounce, getApiRoutes, getLFManager, unescapeJson } from '../utils/common';
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
import { NodeName, TagName } from '../types/widgets/_common';
import {
  ImageEditorActionButtons,
  ImageEditorBrushSettings,
  ImageEditorColumnId,
  ImageEditorControlConfig,
  ImageEditorControls,
  ImageEditorCSS,
  ImageEditorFilter,
  ImageEditorFilterSettingsMap,
  ImageEditorFilterType,
  ImageEditorIcons,
  ImageEditorSliderConfig,
  ImageEditorStatus,
  ImageEditorTextfieldConfig,
  ImageEditorToggleConfig,
  ImageEditorUpdateCallback,
} from '../types/widgets/imageEditor';

//#region buttonEventHandler
export const buttonEventHandler = async (
  imageviewer: HTMLKulImageviewerElement,
  actionButtons: ImageEditorActionButtons,
  grid: HTMLDivElement,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { comp, eventType } = e.detail;

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
};
//#endregion
//#region canvasviewerEventHandler
export const canvasviewerEventHandler = async (
  imageviewer: HTMLKulImageviewerElement,
  e: CustomEvent<KulCanvasEventPayload>,
) => {
  const { comp, eventType, points } = e.detail;

  switch (eventType) {
    case 'stroke':
      callApi(imageviewer, true, {
        color: comp.kulColor,
        points,
        size: comp.kulSize,
        opacity: comp.kulOpacity,
      } as ImageEditorBrushSettings);
      break;
  }
};
//#endregion
//#region imageviewerEventHandler
export const imageviewerEventHandler = async (
  settings: HTMLDivElement,
  node: NodeType,
  e: CustomEvent<KulImageviewerEventPayload>,
) => {
  const { comp, eventType, originalEvent } = e.detail;

  switch (eventType) {
    case 'kul-event':
      const ogEv = originalEvent as KulGenericEvent;
      switch (ogEv.detail.eventType) {
        case 'click':
          if ((ogEv.detail.comp.rootElement as HTMLElement).tagName === 'KUL-TREE') {
            const { node } = ogEv.detail as KulTreeEventPayload;
            if (node.cells?.kulCode) {
              prepSettings(settings, node, comp.rootElement as HTMLKulImageviewerElement);
            }
          }
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
};
//#endregion
//#region sliderEventHandler
export const sliderEventHandler = async (
  updateCb: ImageEditorUpdateCallback,
  e: CustomEvent<KulSliderEventPayload>,
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
};
//#endregion
//#region textfieldEventHandler
export const textfieldEventHandler = async (
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
};
//#endregion
//#region toggleEventHandler
export const toggleEventHandler = async (
  updateCb: ImageEditorUpdateCallback,
  e: CustomEvent<KulToggleEventPayload>,
) => {
  const { eventType } = e.detail;

  switch (eventType) {
    case 'change':
      updateCb(true);
      break;
  }
};
//#endregion
//#region callApi
export const callApi = async (
  imageviewer: HTMLKulImageviewerElement,
  addSnapshot: boolean,
  settingsValues: unknown,
) => {
  const lfManager = getLFManager();
  const filterType = imageviewer.dataset.filter as keyof ImageEditorFilterSettingsMap;
  const settings = settingsValues as ImageEditorFilterSettingsMap[typeof filterType];

  const snapshotValue = (await imageviewer.getCurrentSnapshot()).value;
  requestAnimationFrame(() => imageviewer.setSpinnerStatus(true));
  try {
    const response = await getApiRoutes().image.process(snapshotValue, filterType, settings);
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
//#region getValues
export const getValues = async (
  imageviewer: HTMLKulImageviewerElement,
  settings: HTMLDivElement,
  widgets: ImageEditorFilter,
  filterType: ImageEditorFilterType,
  addSnapshot = false,
) => {
  const lfManager = getLFManager();
  const values: ImageEditorFilterSettingsMap[typeof filterType] =
    {} as ImageEditorFilterSettingsMap[typeof filterType];
  const controls: HTMLElement[] = Array.from(settings.querySelectorAll('[data-id]'));

  let mandatoryCheck = true;

  for (const control of controls) {
    const id = control.dataset.id as keyof ImageEditorFilterSettingsMap[typeof filterType];
    let value: number | boolean | string;

    switch (control.tagName) {
      case 'KUL-SLIDER': {
        const slider = control as HTMLKulSliderElement;
        const sliderValue = await slider.getValue();
        value = addSnapshot ? sliderValue.real : sliderValue.display;
        break;
      }
      case 'KUL-TEXTFIELD': {
        const textfield = control as HTMLKulTextfieldElement;
        const textfieldValue = await textfield.getValue();
        value = textfieldValue;
        break;
      }
      case 'KUL-TOGGLE': {
        const toggle = control as HTMLKulToggleElement;
        const toggleValue = await toggle.getValue();
        value = toggleValue === 'on' ? toggle.dataset.on : toggle.dataset.off;
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

    if (control.dataset.mandatory === 'true' && !value) {
      mandatoryCheck = false;
      break;
    }

    values[id] = value;
  }

  if (widgets.hasCanvasAction) {
    updateCanvasConfig(imageviewer, values as ImageEditorFilterSettingsMap['brush']);
    return null;
  }

  if (!mandatoryCheck) {
    return null;
  }

  return values;
};
//#endregion
//#region prepSettings
export const prepSettings = (
  settings: HTMLDivElement,
  node: KulDataNode,
  imageviewer: HTMLKulImageviewerElement,
) => {
  settings.innerHTML = '';

  const filterType = node.id as ImageEditorFilterType;
  const widgets = unescapeJson(node.cells.kulCode.value).parsedJson as ImageEditorFilter;

  const updateSettings = async (addSnapshot = false) => {
    const values = await getValues(imageviewer, settings, widgets, filterType, addSnapshot);
    if (!values) {
      return;
    }
    callApi(imageviewer, addSnapshot, values);
  };

  imageviewer.dataset.filter = node.id;

  const controlsContainer = document.createElement(TagName.Div);
  controlsContainer.classList.add(ImageEditorCSS.SettingsControls);
  settings.appendChild(controlsContainer);

  const controlNames = Object.keys(widgets.configs);
  controlNames.forEach((controlName) => {
    const controls: ImageEditorControlConfig[] = widgets.configs[controlName];
    if (controls) {
      controls.forEach((controlData) => {
        switch (controlName) {
          case ImageEditorControls.Slider:
            controlsContainer.appendChild(
              createSlider(controlData as ImageEditorSliderConfig, updateSettings),
            );
            break;
          case ImageEditorControls.Textfield:
            controlsContainer.appendChild(
              createTextfield(controlData as ImageEditorTextfieldConfig, updateSettings),
            );
            break;
          case ImageEditorControls.Toggle:
            controlsContainer.appendChild(
              createToggle(controlData as ImageEditorToggleConfig, updateSettings),
            );
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
export const createSlider = (
  data: ImageEditorSliderConfig,
  updateCb: ImageEditorUpdateCallback,
) => {
  const comp = document.createElement('kul-slider');
  comp.dataset.id = data.id;
  comp.dataset.mandatory = data.isMandatory ? 'true' : 'false';
  comp.kulLabel = parseLabel(data);
  comp.kulLeadingLabel = true;
  comp.kulMax = Number(data.max);
  comp.kulMin = Number(data.min);
  comp.kulStep = Number(data.step);
  comp.kulStyle = '.form-field { width: 100%; }';
  comp.kulValue = Number(data.defaultValue);
  comp.title = data.title;

  comp.addEventListener('kul-slider-event', sliderEventHandler.bind(sliderEventHandler, updateCb));

  return comp;
};
//#endregion
//#region createTextfield
export const createTextfield = (
  data: ImageEditorTextfieldConfig,
  updateCb: ImageEditorUpdateCallback,
) => {
  const comp = document.createElement('kul-textfield');
  comp.dataset.id = data.id;
  comp.dataset.mandatory = data.isMandatory ? 'true' : 'false';
  comp.kulLabel = parseLabel(data);
  comp.kulHtmlAttributes = { type: data.type };
  comp.kulValue = String(data.defaultValue).valueOf();
  comp.title = data.title;

  comp.addEventListener(
    'kul-textfield-event',
    textfieldEventHandler.bind(textfieldEventHandler, updateCb),
  );

  return comp;
};
//#endregion
//#region createToggle
export const createToggle = (
  data: ImageEditorToggleConfig,
  updateCb: ImageEditorUpdateCallback,
) => {
  const comp = document.createElement('kul-toggle');
  comp.dataset.id = data.id;
  comp.dataset.mandatory = data.isMandatory ? 'true' : 'false';
  comp.dataset.off = data.off;
  comp.dataset.on = data.on;
  comp.kulLabel = parseLabel(data);
  comp.kulValue = false;
  comp.title = data.title;

  comp.addEventListener('kul-toggle-event', sliderEventHandler.bind(toggleEventHandler, updateCb));

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
export const updateCanvasConfig = async (
  imageviewer: HTMLKulImageviewerElement,
  settingsValues: ImageEditorFilterSettingsMap['brush'],
) => {
  const { canvas } = await imageviewer.getComponents();
  const { color, size, opacity } = settingsValues;
  canvas.kulColor = color;
  canvas.kulSize = size;
  canvas.kulOpacity = opacity;
};
//#endregion
