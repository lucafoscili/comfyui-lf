import { TREE_DATA } from '../fixtures/imageEditor';
import { KulImageviewerEventPayload, KulTreeEventPayload } from '../types/ketchup-lite/components';
import { KulDataNode } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { KulGenericEvent } from '../types/ketchup-lite/types/GenericTypes';
import { FilterSettingsMap, LogSeverity, SliderConfig } from '../types/manager';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  ImageEditorWidgetDeserializedValue,
  ImageEditorWidgetFactory,
} from '../types/widgets';
import {
  createDOMWidget,
  debounce,
  getApiRoutes,
  getLFManager,
  normalizeValue,
  unescapeJson,
} from '../utils/common';

const BASE_CSS_CLASS = 'lf-imageeditor';
const TYPE = CustomWidgetName.imageEditor;

export const imageEditorFactory: ImageEditorWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    imageviewer: `${BASE_CSS_CLASS}__widget`,
    settings: `${BASE_CSS_CLASS}__settings`,
  },
  options: (imageviewer) => {
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

          imageviewer.kulData = parsedValue || {};
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const settings = document.createElement('div');
    const imageviewer = document.createElement('kul-imageviewer');
    const options = imageEditorFactory.options(imageviewer);

    settings.classList.add(imageEditorFactory.cssClasses.settings);

    imageviewer.classList.add(imageEditorFactory.cssClasses.imageviewer);
    imageviewer.kulLoadCallback = async (_, value) => await options.refresh(value);
    imageviewer.kulValue = TREE_DATA;
    imageviewer.addEventListener(
      'kul-imageviewer-event',
      imageviewerEventHandler.bind(imageviewerEventHandler, settings),
    );

    content.classList.add(imageEditorFactory.cssClasses.content);
    content.appendChild(imageviewer);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};

const imageviewerEventHandler = async (
  settings: HTMLDivElement,
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
  }
};

const prepSettings = (
  settings: HTMLDivElement,
  node: KulDataNode,
  imageviewer: HTMLKulImageviewerElement,
) => {
  settings.innerHTML = '';

  const widgets = unescapeJson(node.cells.kulCode.value).parsedJson;
  const filterType = node.id as keyof FilterSettingsMap;
  const settingsValues: FilterSettingsMap[typeof filterType] =
    {} as FilterSettingsMap[typeof filterType];

  const resetButton = document.createElement('kul-button');
  resetButton.kulIcon = 'refresh';
  resetButton.kulLabel = 'Reset';
  settings.appendChild(resetButton);

  for (const controlName in widgets) {
    const sliders = widgets[controlName];
    sliders.forEach((sliderData: SliderConfig<string>) => {
      const sliderControl = createSliderControl(sliderData);
      settings.appendChild(sliderControl);
    });
  }

  const updateSettings = async (triggerApiCall: boolean = true) => {
    const inputs = settings.querySelectorAll('input');
    inputs.forEach((input) => {
      const id = input.id as keyof FilterSettingsMap[typeof filterType];
      (settingsValues as any)[id] = parseFloat(input.value);
    });

    if (triggerApiCall) {
      const image = (await imageviewer.getComponents()).image;
      getApiRoutes()
        .image.process(image.kulValue, filterType, settingsValues)
        .then((r) => {
          if (r.status === 'success') {
            image.kulValue = r.data;
            image.title = r.data;
          } else {
            console.error('Image processing failed:', r.message);
            getLFManager().log('Error processing image!', { r }, LogSeverity.Error);
          }
        })
        .catch((error) => {
          console.error('API call failed:', error);
          getLFManager().log('Error processing image!', { error }, LogSeverity.Error);
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

const createSliderControl = (sliderData: { [key: string]: string }): HTMLDivElement => {
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
