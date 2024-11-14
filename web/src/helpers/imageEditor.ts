import { ON_COMPLETE } from '../fixtures/imageEditor';
import {
  KulButtonEventPayload,
  KulImageviewerEventPayload,
  KulTreeEventPayload,
} from '../types/ketchup-lite/components';
import {
  KulDataColumn,
  KulDataDataset,
  KulDataNode,
} from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { KulGenericEvent } from '../types/ketchup-lite/types/GenericTypes';
import { FilterSettingsMap, LogSeverity, SliderConfig } from '../types/manager';
import { NodeName } from '../types/nodes';
import { ImageEditorWidgetActionButtons } from '../types/widgets';
import { debounce, getApiRoutes, getLFManager, unescapeJson } from '../utils/common';
import { imageEditorFactory } from '../widgets/imageEditor';

export enum ColumnId {
  Path = 'path',
  Status = 'status',
}
export enum Status {
  Completed = 'completed',
  Pending = 'pending',
}
export const INTERRUPT_ICON = 'stop';
export const RESET_ICON = 'refresh';
export const RESUME_ICON = 'play';

//#region buttonEventHandler
export const buttonEventHandler = async (
  imageviewer: HTMLKulImageviewerElement,
  actionButtons: ImageEditorWidgetActionButtons,
  grid: HTMLDivElement,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { comp, eventType } = e.detail;

  switch (eventType) {
    case 'click':
      const update = async () => {
        const dataset = imageviewer.kulData;
        const pathColumn = getPathColumn(dataset);
        const statusColumn = getStatusColumn(dataset);

        if (statusColumn?.title === Status.Pending) {
          statusColumn.title = Status.Completed;
          const path = (unescapeJson(pathColumn).parsedJson as KulDataColumn).title;

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
          if (ogEv.detail.comp.rootElement.tagName === 'KUL-TREE') {
            const { node } = ogEv.detail as KulTreeEventPayload;
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
export const prepSettings = (
  settings: HTMLDivElement,
  node: KulDataNode,
  imageviewer: HTMLKulImageviewerElement,
) => {
  const updateSettings = async (addSnapshot = false) => {
    const settingsValues: FilterSettingsMap[typeof filterType] =
      {} as FilterSettingsMap[typeof filterType];

    const sliders = settings.querySelectorAll('kul-slider');
    for (const slider of sliders) {
      const id = slider.dataset.id as keyof FilterSettingsMap[typeof filterType];
      const value = await slider.getValue();
      (settingsValues as any)[id] = addSnapshot ? value.real : value.display;
    }

    const value = (await imageviewer.getCurrentSnapshot()).value;
    getApiRoutes()
      .image.process(value, filterType, settingsValues)
      .then(async (r) => {
        if (r.status === 'success') {
          if (addSnapshot) {
            imageviewer.addSnapshot(r.data);
          } else {
            const image = (await imageviewer.getComponents()).image;
            requestAnimationFrame(() => (image.kulValue = r.data));
          }
        } else {
          console.error('Image processing failed:', r.message);
          getLFManager().log('Error processing image!', { r }, LogSeverity.Error);
        }
      })
      .catch((error) => {
        console.error('API call failed:', error);
        getLFManager().log('Error processing image!', { error }, LogSeverity.Error);
      });
  };

  settings.innerHTML = '';

  const widgets = unescapeJson(node.cells.kulCode.value).parsedJson;
  const filterType = node.id as keyof FilterSettingsMap;

  const resetButton = document.createElement('kul-button');
  resetButton.classList.add('kul-full-width');
  resetButton.kulIcon = RESET_ICON;
  resetButton.kulLabel = 'Reset';
  settings.appendChild(resetButton);

  for (const controlName in widgets) {
    const sliders = widgets[controlName];
    sliders.forEach((sliderData: SliderConfig<string>) => {
      const sliderControl = createSliderControl(sliderData, updateSettings);
      settings.appendChild(sliderControl);
    });
  }

  resetButton.addEventListener('click', async () => {
    const sliders = settings.querySelectorAll('kul-slider');
    sliders.forEach(async (slider) => {
      await slider.setValue(slider.kulValue);
      await slider.refresh();
    });
  });
};
//#endregion
//#region createSliderControl
export const createSliderControl = (
  sliderData: { [key: string]: string },
  callback: (triggerApiCall?: boolean, addSnapshot?: boolean) => Promise<void>,
) => {
  const slider = document.createElement('kul-slider');
  slider.dataset.id = sliderData.id;
  slider.kulLabel = sliderData.ariaLabel;
  slider.kulLeadingLabel = true;
  slider.kulMax = Number(sliderData.max);
  slider.kulMin = Number(sliderData.min);
  slider.kulStep = Number(sliderData.step);
  slider.kulStyle = '.form-field { width: 100%; }';
  slider.kulValue = Number(sliderData.defaultValue);
  slider.addEventListener('kul-slider-event', (e) => {
    const { eventType } = e.detail;

    switch (eventType) {
      case 'change':
        callback(true);
        break;

      case 'input':
        const debouncedCallback = debounce(callback, 300);
        debouncedCallback();
        break;
    }
  });

  return slider;
};
//#endregion
//#region Utils
export const getPathColumn = (dataset: KulDataDataset) => {
  return dataset?.columns?.find((c) => c.id === ColumnId.Path) || null;
};
export const getStatusColumn = (dataset: KulDataDataset) => {
  return dataset?.columns?.find((c) => c.id === ColumnId.Status) || null;
};
export const setGridStatus = (
  status: Status,
  grid: HTMLDivElement,
  actionButtons: ImageEditorWidgetActionButtons,
) => {
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