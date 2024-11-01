import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  ProgressbarWidgetDeserializedValue,
  ProgressbarWidgetFactory,
} from '../types/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-progressbar';
const FALLBACK_LABEL = 'N/A';
const TYPE = CustomWidgetName.progressbar;

export const progressbarFactory: ProgressbarWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
  },
  options: (progressbar, nodeType) => {
    return {
      hideOnZoom: false,
      getComp() {
        return progressbar;
      },
      getValue() {
        return {
          bool: progressbar.kulLabel === 'true' ? true : false,
          roll: progressbar.kulValue || 0,
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const { bool, roll } = u.parsedJson as ProgressbarWidgetDeserializedValue;

          const isFalse = !!(bool === false);
          const isTrue = !!(bool === true);

          switch (nodeType.comfyClass) {
            case NodeName.resolutionSwitcher:
              progressbar.kulLabel = '!';
              if (isTrue) {
                progressbar.kulIcon = 'landscape';
              } else if (isFalse) {
                progressbar.kulIcon = 'portrait';
              } else {
                progressbar.kulLabel = FALLBACK_LABEL;
              }
              break;
            default:
              progressbar.classList.remove('kul-success');
              progressbar.classList.remove('kul-danger');
              if (isTrue) {
                progressbar.classList.add('kul-success');
                progressbar.kulLabel = 'true';
              } else if (isFalse) {
                progressbar.classList.add('kul-danger');
                progressbar.kulLabel = 'false';
              } else {
                progressbar.kulLabel = FALLBACK_LABEL;
              }
              break;
          }

          progressbar.title = roll ? 'Actual roll: ' + roll.toString() : '';
          progressbar.kulValue = roll || 100;
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const progressbar = document.createElement('kul-progressbar');
    const options = progressbarFactory.options(progressbar, node);

    content.classList.add(progressbarFactory.cssClasses.content);
    progressbar.kulIsRadial = true;
    progressbar.kulLabel = FALLBACK_LABEL;

    content.appendChild(progressbar);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
