import type {
  KulButtonEventPayload,
  KulEventPayload,
  KulListEventPayload,
  KulSwitchEventPayload,
} from '../types/ketchup-lite/components';
import { createDOMWidget, getKulManager, getKulThemes, getLFManager } from '../utils/utils';

const BASE_CSS_CLASS = 'lf-controlpanel';

export const controlPanelWidget = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    debug: `${BASE_CSS_CLASS}__debug`,
    spinner: `${BASE_CSS_CLASS}__spinner`,
    themes: `${BASE_CSS_CLASS}__themes`,
  },
  options: () => {
    return {
      async getValue() {
        return { debug: getLFManager()?.isDebug(), themes: getKulManager()?.theme.name };
      },
      async setValue(value) {
        if (value) {
          const { debug, themes } = value;
          if (debug !== undefined) {
            getLFManager().toggleDebug(debug);
          }
          if (themes !== undefined) {
            getKulManager().theme.set(themes);
          }
        }
      },
    } as ControlPanelWidgetOptions;
  },
  render: (node: NodeType, name: string, wType: CustomWidgetNames) => {
    const wrapper = document.createElement('div');
    contentCb(wrapper, false);
    wrapper.dataset.isInVisibleNodes = 'true';
    const options = controlPanelWidget.options();
    const widget = createDOMWidget(name, wType, wrapper, node, options);
    return { widget };
  },
};

const buttonCb = (e: CustomEvent<KulButtonEventPayload>) => {
  if (e.detail.eventType === 'click') {
    getKulManager().theme.randomTheme();
  } else if (e.detail.eventType === 'kul-event') {
    const listEvent = e.detail.originalEvent as CustomEvent<KulListEventPayload>;
    const value = listEvent.detail.node.id;
    getKulManager().theme.set(value);
  }
};

const readyCb = (domWidget: HTMLDivElement) => {
  setTimeout(() => {
    contentCb(domWidget, true);
  }, 750);
};

const switchCb = (e: CustomEvent<KulSwitchEventPayload>) => {
  if (e.detail.eventType === 'change') {
    const value = e.detail.value === 'on' ? true : false;
    getLFManager().toggleDebug(value);
  }
};

export function contentCb(domWidget: HTMLDivElement, isReady: boolean) {
  const content = document.createElement('div');

  const createSpinner = () => {
    const spinner = document.createElement('kul-spinner');
    spinner.classList.add(controlPanelWidget.cssClasses.spinner);
    spinner.kulActive = true;
    spinner.kulLayout = 11;

    return spinner;
  };

  const createDebug = () => {
    const debug = document.createElement('kul-switch');
    debug.classList.add(controlPanelWidget.cssClasses.debug);
    debug.kulLabel = 'Debug';
    debug.kulLeadingLabel = true;
    debug.addEventListener('kul-switch-event', switchCb);

    return debug;
  };

  const createTheme = () => {
    const themes = document.createElement('kul-button');
    themes.classList.add(controlPanelWidget.cssClasses.themes);
    themes.kulData = getKulThemes();
    themes.addEventListener('kul-button-event', buttonCb);

    return themes;
  };

  if (isReady) {
    const debug = createDebug();
    const themes = createTheme();
    content.appendChild(debug);
    content.appendChild(themes);
    domWidget.replaceChild(content, domWidget.firstChild);
  } else {
    const spinner = createSpinner();
    spinner.addEventListener('kul-spinner-event', readyCb.bind(null, domWidget));
    content.appendChild(spinner);
    domWidget.appendChild(content);
  }

  content.classList.add(controlPanelWidget.cssClasses.content);
}
