import { KulImageEventPayload, KulMasonryEventPayload } from '../types/ketchup-lite/components';
import { KulDataCell } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
} from '../types/widgets/_common';
import { MasonryDeserializedValue, MasonryFactory } from '../types/widgets/masonry';
import { createDOMWidget, isValidNumber, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-masonry';
const TYPE = CustomWidgetName.masonry;

export const masonryFactory: MasonryFactory = {
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
        const index = parseInt(masonry?.dataset.index);
        return {
          columns: masonry?.kulColumns || 3,
          dataset: masonry?.kulData || {},
          index: isValidNumber(index) ? index : NaN,
          name: masonry?.dataset.name || '',
          view: masonry?.kulView || 'masonry',
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const { columns, dataset, index, name, view } = u.parsedJson as MasonryDeserializedValue;
          if (columns) {
            masonry.kulColumns = columns;
          }
          if (dataset) {
            masonry.kulData = dataset || {};
          }
          if (view) {
            masonry.kulView = view;
          }
          if (isValidNumber(index)) {
            masonry.dataset.index = index.toString() || '';
            masonry.dataset.name = name || '';
            masonry.setSelectedShape(index);
          }
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
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

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
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
          const v =
            selectedShape.shape?.value || (selectedShape.shape as KulDataCell<'image'>)?.kulValue;
          masonry.dataset.index = isValidNumber(selectedShape.index)
            ? selectedShape.index.toString()
            : '';
          masonry.dataset.name = v ? String(v).valueOf() : '';
          break;
      }
      break;
  }
};
