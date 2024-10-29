import {
  KulDataDataset,
  KulImageEventPayload,
  KulMasonryEventPayload,
} from '../types/ketchup-lite/components';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  MasonryWidgetFactory,
  NormalizeValueCallback,
} from '../types/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-masonry';
const TYPE = CustomWidgetName.masonry;

export const masonryFactory: MasonryWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
  },
  options: (masonry) => {
    return {
      hideOnZoom: true,
      getComp() {
        return masonry;
      },
      getValue() {
        return {
          dataset: masonry?.kulData || {},
          index: parseInt(masonry?.dataset.index) || 0,
          name: masonry?.dataset.name || '',
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          masonry.kulData = (u.parsedJson as KulDataDataset) || {};
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node, name) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const masonry = document.createElement('kul-masonry');
    const options = masonryFactory.options(masonry);

    content.classList.add(masonryFactory.cssClasses.content);
    masonry.classList.add(masonryFactory.cssClasses.widget);
    masonry.addEventListener('kul-masonry-event', masonryEventHandler);

    switch (node.comfyClass) {
      case NodeName.loadImages:
        masonry.kulSelectable = true;
        break;
    }

    content.appendChild(masonry);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const masonryEventHandler = (e: CustomEvent<KulMasonryEventPayload>) => {
  const { comp, eventType, originalEvent, selectedShape } = e.detail;
  const masonry = comp.rootElement as HTMLKulMasonryElement;

  switch (eventType) {
    case 'kul-event':
      const { eventType } = (originalEvent as CustomEvent<KulImageEventPayload>).detail;
      switch (eventType) {
        case 'click':
          masonry.dataset.index = selectedShape.index.toString();
          masonry.dataset.value = String(selectedShape.shape?.value)?.valueOf() || '';
          break;
      }
      break;
  }
};
