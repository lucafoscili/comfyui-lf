import { CustomWidgetName, NodeName, TagName } from '../types/widgets/_common';
import {
  ProgressbarCSS,
  ProgressbarDeserializedValue,
  ProgressbarFactory,
  ProgressbarIcons,
  ProgressbarLabels,
  ProgressbarNormalizeCallback,
  ProgressbarState,
} from '../types/widgets/progressBar';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, ProgressbarState>();

export const progressbarFactory: ProgressbarFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { progressbar } = STATE.get(wrapper);

        return {
          bool: progressbar.kulLabel === 'true' ? true : false,
          roll: progressbar.kulValue || 0,
        };
      },
      setValue(value) {
        const { node, progressbar } = STATE.get(wrapper);

        const callback: ProgressbarNormalizeCallback = (_, u) => {
          const { bool, roll } = u.parsedJson as ProgressbarDeserializedValue;

          const isFalse = !!(bool === false);
          const isTrue = !!(bool === true);

          switch (node.comfyClass) {
            case NodeName.resolutionSwitcher:
              if (isTrue) {
                progressbar.kulIcon = ProgressbarIcons.Landscape;
              } else if (isFalse) {
                progressbar.kulIcon = ProgressbarIcons.Portrait;
              } else {
                progressbar.kulLabel = ProgressbarLabels.Fallback;
              }
              break;
            default:
              progressbar.classList.remove('kul-success');
              progressbar.classList.remove('kul-danger');
              if (isTrue) {
                progressbar.classList.add('kul-success');
                progressbar.kulLabel = ProgressbarLabels.True;
              } else if (isFalse) {
                progressbar.classList.add('kul-danger');
                progressbar.kulLabel = ProgressbarLabels.False;
              } else {
                progressbar.kulLabel = ProgressbarLabels.Fallback;
              }
              break;
          }

          progressbar.title = roll ? 'Actual roll: ' + roll.toString() : '';
          progressbar.kulValue = roll || 100;
        };

        normalizeValue(value, callback, CustomWidgetName.progressbar);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const progressbar = document.createElement(TagName.KulProgressbar);

    progressbar.kulIsRadial = true;
    progressbar.kulLabel = ProgressbarLabels.Fallback;

    content.classList.add(ProgressbarCSS.Content);
    content.appendChild(progressbar);

    wrapper.appendChild(content);

    const options = progressbarFactory.options(wrapper);

    STATE.set(wrapper, { node, progressbar, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.progressbar, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
