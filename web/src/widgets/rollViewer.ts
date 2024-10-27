import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  RollViewerWidgetDeserializedValue,
  RollViewerWidgetFactory,
} from '../types/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-rollviewer';
const TYPE = CustomWidgetName.rollViewer;

export const rollViewerFactory: RollViewerWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
  },
  options: (progressbar: HTMLKulProgressbarElement, nodeType: NodeType) => {
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
          const { bool, roll } = u.parsedJson as RollViewerWidgetDeserializedValue;

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
                progressbar.kulLabel = 'Roll!';
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
                progressbar.kulLabel = 'Roll!';
              }
              break;
          }

          progressbar.title = 'Actual roll: ' + roll.toString();
          progressbar.kulValue = roll;
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node, name) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const progressbar = document.createElement('kul-progressbar');
    const options = rollViewerFactory.options(progressbar, node);

    content.classList.add(rollViewerFactory.cssClasses.content);
    progressbar.kulIsRadial = true;
    progressbar.kulLabel = 'Roll!';

    content.appendChild(progressbar);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
