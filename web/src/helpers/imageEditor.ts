import { debounce, getApiRoutes, getLFManager, isValidObject, unescapeJson } from '../utils/common';
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
  ImageEditorColumnId,
  ImageEditorControlConfig,
  ImageEditorControls,
  ImageEditorCSS,
  ImageEditorData,
  ImageEditorFilter,
  ImageEditorFilterSettings,
  ImageEditorFilterSettingsMap,
  ImageEditorFilterType,
  ImageEditorIcons,
  ImageEditorSliderConfig,
  ImageEditorStatus,
  ImageEditorTextfieldConfig,
  ImageEditorToggleConfig,
  ImageEditorUpdateCallback,
} from '../types/widgets/imageEditor';

const imageviewerDataMap = new WeakMap<HTMLKulImageviewerElement, ImageEditorData>();

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
//#region canvasEventHandler
export const canvasEventHandler = async (
  imageviewer: HTMLKulImageviewerElement,
  e: CustomEvent<KulCanvasEventPayload>,
) => {
  const { comp, eventType, points } = e.detail;

  switch (eventType) {
    case 'stroke':
      const { filter, filterType, settings } = imageviewerDataMap.get(imageviewer);
      if (!filter?.hasCanvasAction) {
        imageviewerDataMap.set(imageviewer, { filter, filterType: 'brush', settings });
      }
      await updateCb(imageviewer, true, {
        color: comp.kulColor,
        opacity: comp.kulOpacity,
        points,
        size: comp.kulSize,
      });

      imageviewerDataMap.set(imageviewer, { filter, filterType, settings });
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
              prepSettings(node, comp.rootElement);
            }
          }
          break;
      }
      break;

    case 'ready':
      const components = await comp.getComponents();
      imageviewerDataMap.set(comp.rootElement, { filter: null, filterType: null, settings });
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
  values: unknown,
) => {
  const { filterType } = imageviewerDataMap.get(imageviewer);
  const lfManager = getLFManager();

  const v = values as ImageEditorFilterSettingsMap[typeof filterType];

  const snapshotValue = (await imageviewer.getCurrentSnapshot()).value;
  requestAnimationFrame(() => imageviewer.setSpinnerStatus(true));
  try {
    const response = await getApiRoutes().image.process(snapshotValue, filterType, v);
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
export const getValues = async (imageviewer: HTMLKulImageviewerElement, addSnapshot = false) => {
  const { filter, filterType, settings } = imageviewerDataMap.get(imageviewer);

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

  if (!mandatoryCheck) {
    return null;
  }

  return values;
};
//#endregion
//#region prepSettings
export const prepSettings = (node: KulDataNode, imageviewer: HTMLKulImageviewerElement) => {
  const { settings } = imageviewerDataMap.get(imageviewer);
  settings.innerHTML = '';

  const filterType = node.id as ImageEditorFilterType;
  const filter = unescapeJson(node.cells.kulCode.value).parsedJson as ImageEditorFilter;
  imageviewerDataMap.set(imageviewer, { filter, filterType, settings });

  const controlsContainer = document.createElement(TagName.Div);
  controlsContainer.classList.add(ImageEditorCSS.SettingsControls);
  settings.appendChild(controlsContainer);

  const cb = updateCb.bind(updateCb, imageviewer);

  const controlNames = Object.keys(filter.configs);
  controlNames.forEach((controlName) => {
    const controls: ImageEditorControlConfig[] = filter.configs[controlName];
    if (controls) {
      controls.forEach((controlData) => {
        switch (controlName) {
          case ImageEditorControls.Slider:
            controlsContainer.appendChild(createSlider(controlData as ImageEditorSliderConfig, cb));
            break;
          case ImageEditorControls.Textfield:
            controlsContainer.appendChild(
              createTextfield(controlData as ImageEditorTextfieldConfig, cb),
            );
            break;
          case ImageEditorControls.Toggle:
            controlsContainer.appendChild(createToggle(controlData as ImageEditorToggleConfig, cb));
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
  values: ImageEditorFilterSettingsMap['brush'],
) => {
  const { canvas } = await imageviewer.getComponents();
  const { color, size, opacity } = values;
  canvas.kulColor = color;
  canvas.kulSize = size;
  canvas.kulOpacity = opacity;
};
const updateCb = async (
  imageviewer: HTMLKulImageviewerElement,
  addSnapshot = false,
  defaults?: ImageEditorFilterSettings,
) => {
  const { filter } = imageviewerDataMap.get(imageviewer);

  const controls = await getValues(imageviewer, addSnapshot);
  const validControls = isValidObject(controls);

  const values = { ...defaults, ...controls };
  const validValues = isValidObject(values);

  const isStroke = !filter || filter.hasCanvasAction;

  if (validControls && isStroke) {
    updateCanvasConfig(imageviewer, values as ImageEditorFilterSettingsMap['brush']);
  }

  const shouldUpdate = !!(validValues && (!isStroke || (isStroke && values.points)));
  if (shouldUpdate) {
    callApi(imageviewer, addSnapshot, values);
  }
};
//#endregion
