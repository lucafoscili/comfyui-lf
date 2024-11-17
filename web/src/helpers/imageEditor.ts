import {
  KulButtonEventPayload,
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
import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import {
  ImageEditorWidgetActionButtons,
  ImageEditorWidgetColumnId,
  ImageEditorWidgetControlConfig,
  ImageEditorWidgetControls,
  ImageEditorWidgetFilterSettingsMap,
  ImageEditorWidgetFilterType,
  ImageEditorWidgetIcons,
  ImageEditorWidgetSettingsFor,
  ImageEditorWidgetSliderConfig,
  ImageEditorWidgetStatus,
  ImageEditorWidgetTextfieldConfig,
  ImageEditorWidgetToggleConfig,
  ImageEditorWidgetUpdateCallback,
} from '../types/widgets';
import { debounce, getApiRoutes, getLFManager, unescapeJson } from '../utils/common';
import { imageEditorFactory } from '../widgets/imageEditor';

//#region buttonEventHandler
export const buttonEventHandler = async (
  imageviewer: HTMLKulImageviewerElement,
  actionButtons: ImageEditorWidgetActionButtons,
  grid: HTMLDivElement,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { comp, eventType } = e.detail;

  if (eventType === 'click') {
    const update = async () => {
      const dataset = imageviewer.kulData;
      const pathColumn = getPathColumn(dataset);
      const statusColumn = getStatusColumn(dataset);

      if (statusColumn?.title === ImageEditorWidgetStatus.Pending) {
        statusColumn.title = ImageEditorWidgetStatus.Completed;
        const path = (unescapeJson(pathColumn).parsedJson as KulDataColumn).title;

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
export const imageviewerEventHandler = async (
  settings: HTMLDivElement,
  node: NodeType,
  e: CustomEvent<KulImageviewerEventPayload>,
) => {
  const { comp, eventType, originalEvent } = e.detail;

  switch (eventType) {
    case 'kul-event':
      const ogEv = originalEvent as KulGenericEvent;
      if (ogEv.detail.eventType === 'click') {
        if ((ogEv.detail.comp.rootElement as HTMLElement).tagName === 'KUL-TREE') {
          const { node } = ogEv.detail as KulTreeEventPayload;
          prepSettings(settings, node, comp.rootElement as HTMLKulImageviewerElement);
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
export const sliderEventHandler = async (
  updateCb: ImageEditorWidgetUpdateCallback,
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
  updateCb: ImageEditorWidgetUpdateCallback,
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
  updateCb: ImageEditorWidgetUpdateCallback,
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
//#region prepSettings
export const prepSettings = (
  settings: HTMLDivElement,
  node: KulDataNode,
  imageviewer: HTMLKulImageviewerElement,
) => {
  const lfManager = getLFManager();
  const filterType = node.id as ImageEditorWidgetFilterType;
  const widgets = unescapeJson(node.cells.kulCode.value).parsedJson as ImageEditorWidgetSettingsFor;

  const updateSettings = async (addSnapshot = false) => {
    const settingsValues: ImageEditorWidgetFilterSettingsMap[typeof filterType] =
      {} as ImageEditorWidgetFilterSettingsMap[typeof filterType];
    const controls: HTMLElement[] = Array.from(settings.querySelectorAll('[data-id]'));

    let mandatoryCheck = true;

    for (const control of controls) {
      const id = control.dataset.id as keyof ImageEditorWidgetFilterSettingsMap[typeof filterType];
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

      if (Boolean(control.dataset.mandatory) && !value) {
        mandatoryCheck = false;
        break;
      }

      settingsValues[id] = value;
    }

    if (!mandatoryCheck) {
      return;
    }

    const snapshotValue = (await imageviewer.getCurrentSnapshot()).value;
    requestAnimationFrame(() => imageviewer.setSpinnerStatus(true));
    try {
      const response = await getApiRoutes().image.process(
        snapshotValue,
        filterType,
        settingsValues,
      );
      if (response.status === 'success') {
        if (addSnapshot) {
          imageviewer.addSnapshot(response.data);
        } else {
          const { image } = await imageviewer.getComponents();
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

  settings.innerHTML = '';

  const resetButton = document.createElement('kul-button');
  resetButton.classList.add('kul-full-width');
  resetButton.kulIcon = ImageEditorWidgetIcons.Reset;
  resetButton.kulLabel = 'Reset';
  settings.appendChild(resetButton);

  const controlNames = Object.keys(widgets) as Array<ImageEditorWidgetControls>;

  controlNames.forEach((controlName) => {
    const controls: ImageEditorWidgetControlConfig[] = widgets[controlName];
    if (controls) {
      controls.forEach((controlData) => {
        switch (controlName) {
          case ImageEditorWidgetControls.Slider:
            settings.appendChild(
              createSlider(controlData as ImageEditorWidgetSliderConfig, updateSettings),
            );
            break;
          case ImageEditorWidgetControls.Textfield:
            settings.appendChild(
              createTextfield(controlData as ImageEditorWidgetTextfieldConfig, updateSettings),
            );
            break;
          case ImageEditorWidgetControls.Toggle:
            settings.appendChild(
              createToggle(controlData as ImageEditorWidgetToggleConfig, updateSettings),
            );
            break;
          default:
            throw new Error(`Unknown control type: ${controlName}`);
        }
      });
    }
  });

  // Add Reset Functionality
  resetButton.addEventListener('click', () => resetSettings(settings));
};
//#endregion
//#region createSlider
export const createSlider = (
  data: ImageEditorWidgetSliderConfig,
  updateCb: ImageEditorWidgetUpdateCallback,
) => {
  const comp = document.createElement('kul-slider');
  comp.dataset.id = data.id;
  comp.dataset.mandatory = data.isMandatory ? 'true' : 'false';
  comp.kulLabel = data.ariaLabel;
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
  data: ImageEditorWidgetTextfieldConfig,
  updateCb: ImageEditorWidgetUpdateCallback,
) => {
  const comp = document.createElement('kul-textfield');
  comp.dataset.id = data.id;
  comp.dataset.mandatory = data.isMandatory ? 'true' : 'false';
  comp.kulLabel = data.ariaLabel;
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
  data: ImageEditorWidgetToggleConfig,
  updateCb: ImageEditorWidgetUpdateCallback,
) => {
  const comp = document.createElement('kul-toggle');
  comp.dataset.id = data.id;
  comp.dataset.mandatory = data.isMandatory ? 'true' : 'false';
  comp.dataset.off = data.off;
  comp.dataset.on = data.on;
  comp.kulLabel = data.ariaLabel;
  comp.kulValue = false;
  comp.title = data.title;

  comp.addEventListener('kul-toggle-event', sliderEventHandler.bind(toggleEventHandler, updateCb));

  return comp;
};
//#endregion
//#region Utils
export const getPathColumn = (dataset: KulDataDataset): KulDataColumn | null => {
  return dataset?.columns?.find((c) => c.id === ImageEditorWidgetColumnId.Path) || null;
};
export const getStatusColumn = (dataset: KulDataDataset): KulDataColumn | null => {
  return dataset?.columns?.find((c) => c.id === ImageEditorWidgetColumnId.Status) || null;
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
      case 'KUL-TOGGLE':
        const toggle = control as HTMLKulToggleElement;
        toggle.setValue(toggle.kulValue ? 'on' : 'off');
        break;
    }
  }
};
export const setGridStatus = (
  status: ImageEditorWidgetStatus,
  grid: HTMLDivElement,
  actionButtons: ImageEditorWidgetActionButtons,
) => {
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
