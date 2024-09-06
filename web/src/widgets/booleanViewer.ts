import { BooleanViewerWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget } from '../utils/common';

const BASE_CSS_CLASS = 'lf-booleanviewer';
const LABEL = 'True or False?';
const TYPE = CustomWidgetName.booleanViewer;

export const booleanViewerFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
  },
  options: (booleanViewer: HTMLKulTextfieldElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return booleanViewer;
      },
      getValue() {
        return booleanViewer?.kulLabel;
      },
      setProps(props: Partial<HTMLKulTextfieldElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            booleanViewer[prop] = prop;
          }
        }
      },
      setValue(value: string) {
        const isFalse = value?.toLowerCase()?.includes('false');
        const isTrue = value?.toLowerCase()?.includes('true');
        if (isTrue) {
          booleanViewer.kulIcon = 'check';
          booleanViewer.kulLabel = 'True!';
        } else if (isFalse) {
          booleanViewer.kulIcon = 'clear';
          booleanViewer.kulLabel = 'False!';
        } else {
          booleanViewer.kulIcon = '';
          booleanViewer.kulLabel = LABEL;
        }
      },
    } as BooleanViewerWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const booleanViewer = document.createElement('kul-textfield');
    const options = booleanViewerFactory.options(booleanViewer);

    content.classList.add(booleanViewerFactory.cssClasses.content);
    booleanViewer.kulDisabled = true;
    booleanViewer.kulLabel = LABEL;

    content.appendChild(booleanViewer);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
