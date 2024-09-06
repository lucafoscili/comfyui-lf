import { CustomWidgetName, RollViewerWidgetOptions, RollViewerWidgetValue } from '../types/widgets';
import { createDOMWidget } from '../utils/common';

const BASE_CSS_CLASS = 'lf-rollviewer';
const TYPE = CustomWidgetName.rollViewer;

export const rollViewerFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
  },
  options: (rollViewer: HTMLKulProgressbarElement) => {
    return {
      hideOnZoom: true,
      getComp() {
        return rollViewer;
      },
      getValue() {
        return { bool: rollViewer.kulLabel === 'true' ? true : false, roll: rollViewer.kulValue };
      },
      setProps(props: Partial<HTMLKulProgressbarElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            rollViewer[prop] = prop;
          }
        }
      },
      setValue(value: RollViewerWidgetValue) {
        const { bool, roll } = value;
        rollViewer.classList.remove('kul-success');
        rollViewer.classList.remove('kul-danger');
        const isFalse = !!(bool === false);
        const isTrue = !!(bool === true);
        if (isTrue) {
          rollViewer.classList.add('kul-success');
          rollViewer.kulLabel = 'true';
        } else if (isFalse) {
          rollViewer.classList.add('kul-danger');
          rollViewer.kulLabel = 'false';
        } else {
          rollViewer.kulLabel = 'Roll!';
        }
        rollViewer.title = 'Actual roll: ' + roll.toString();
        rollViewer.kulValue = roll;
      },
    } as RollViewerWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const rollViewer = document.createElement('kul-progressbar');
    const options = rollViewerFactory.options(rollViewer);

    content.classList.add(rollViewerFactory.cssClasses.content);
    rollViewer.kulIsRadial = true;
    rollViewer.kulLabel = 'Roll!';

    content.appendChild(rollViewer);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
