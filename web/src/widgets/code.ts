import { getLFManager } from '../utils/utils';

const cssClasses = {
  wrapper: 'lf-displayjson',
  widget: 'lf-displayjson__widget',
};

export function getCode(node: NodeType, name: string, type: string) {
  getLFManager().log(`Adding KUL_CODE custom widget`, { node });

  const props = node.lfProps as DisplayJSONProps;
  const domWidget = document.createElement('div') as DOMWidget;
  domWidget.refresh = () => {
    getLFManager().log(`Refreshing KUL_CODE custom widget`, { domWidget });

    if (domWidget.firstChild) {
      domWidget.removeChild(domWidget.firstChild);
    }
    const content = createWidget(props);
    domWidget.appendChild(content);
  };
  domWidget.refresh();
  const widget = node.addDOMWidget(name, type, domWidget);
  return { widget };
}

function createWidget(props: DisplayJSONProps) {
  const value = props?.payload?.json;

  const content = document.createElement('div');
  content.classList.add(cssClasses.wrapper);

  const codeWidget: HTMLKulCodeElement = document.createElement('kul-code');
  codeWidget.classList.add(cssClasses.widget);
  codeWidget.kulLanguage = 'json';
  codeWidget.kulValue = value ? JSON.stringify(value, null, 2) : 'Wow. Such empty!';
  content.appendChild(codeWidget);

  return content;
}
