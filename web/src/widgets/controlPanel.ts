import type {
  KulButtonEventPayload,
  KulListEventPayload,
  KulSwitchEventPayload,
} from '../types/ketchup-lite/components';
import {
  ControlPanelWidgetDeserializedValue,
  ControlPanelWidgetOptions,
  CustomWidgetName,
} from '../types/widgets';
import {
  createDOMWidget,
  deserializeValue,
  getApiRoutes,
  getKulManager,
  getKulThemes,
  getLFManager,
  serializeValue,
} from '../utils/common';

const DEF_ICON = 'delete';
const DEF_LABEL = 'Delete models info';
const BASE_CSS_CLASS = 'lf-controlpanel';
const TYPE = CustomWidgetName.controlPanel;
let TIMEOUT: NodeJS.Timeout;

export const controlPanelFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    clearInfo: `${BASE_CSS_CLASS}__clear-info`,
    debug: `${BASE_CSS_CLASS}__debug`,
    grid: `${BASE_CSS_CLASS}__grid`,
    spinner: `${BASE_CSS_CLASS}__spinner`,
    themes: `${BASE_CSS_CLASS}__themes`,
  },
  options: () => {
    return {
      getValue() {
        return serializeValue({
          debug: getLFManager()?.isDebug(),
          themes: getKulManager()?.theme.name,
        });
      },
      setValue(value) {
        const { debug, themes } = deserializeValue(value)
          .parsedJson as ControlPanelWidgetDeserializedValue;

        const set = () => {
          if (debug === true || debug === false) {
            getLFManager().toggleDebug(debug);
          }
          if (themes) {
            getKulManager().theme.set(themes);
          }
          return value;
        };

        const kulManager = getKulManager();
        if (kulManager) {
          set();
        } else {
          const managerCb = () => {
            set();
            document.removeEventListener('kul-manager-ready', managerCb);
          };
          document.addEventListener('kul-manager-ready', managerCb);
        }
      },
    } as ControlPanelWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const options = controlPanelFactory.options();

    contentCb(wrapper, false);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const readyCb = (domWidget: HTMLDivElement) => {
  setTimeout(() => {
    contentCb(domWidget, true);
  }, 750);
};

const contentCb = (domWidget: HTMLDivElement, isReady: boolean) => {
  const content = document.createElement('div');

  const createSpinner = () => {
    const spinner = document.createElement('kul-spinner');
    spinner.classList.add(controlPanelFactory.cssClasses.spinner);
    spinner.kulActive = true;
    spinner.kulLayout = 11;

    return spinner;
  };

  if (isReady) {
    const grid = document.createElement('div');
    const debug = createDebug();
    const themes = createTheme();
    const clearInfo = createClearInfo();

    grid.classList.add(controlPanelFactory.cssClasses.grid);

    grid.appendChild(clearInfo);
    grid.appendChild(themes);
    grid.appendChild(debug);
    content.appendChild(grid);
    domWidget.replaceChild(content, domWidget.firstChild);
  } else {
    const spinner = createSpinner();
    spinner.addEventListener('kul-spinner-event', readyCb.bind(null, domWidget));
    content.appendChild(spinner);
    domWidget.appendChild(content);
  }

  content.classList.add(controlPanelFactory.cssClasses.content);
};

const createClearInfo = () => {
  const cb = (e: CustomEvent<KulButtonEventPayload>) => {
    const onResponse = () => {
      clearInfo.classList.remove('kul-danger');
      clearInfo.classList.add('kul-success');
      clearInfo.kulShowSpinner = false;
      clearInfo.kulLabel = 'Done!';
      clearInfo.kulIcon = 'check';
    };
    const restore = () => {
      clearInfo.classList.add('kul-danger');
      clearInfo.classList.remove('kul-success');
      clearInfo.kulLabel = DEF_LABEL;
      clearInfo.kulIcon = DEF_ICON;
      TIMEOUT = null;
    };
    if (e.detail.eventType === 'click') {
      requestAnimationFrame(() => (clearInfo.kulShowSpinner = true));
      getApiRoutes()
        .clearModelMetadata()
        .then(() => {
          requestAnimationFrame(onResponse);

          if (TIMEOUT) {
            clearTimeout(TIMEOUT);
          }

          TIMEOUT = setTimeout(() => requestAnimationFrame(restore), 1000);
        });
    }
  };

  const clearInfo = document.createElement('kul-button');
  const spinner = document.createElement('kul-spinner');

  clearInfo.classList.add(controlPanelFactory.cssClasses.clearInfo);
  clearInfo.classList.add('kul-danger');
  clearInfo.kulIcon = DEF_ICON;
  clearInfo.kulLabel = DEF_LABEL;
  clearInfo.kulStyling = 'outlined';
  clearInfo.title = "Deletes all models' .info files containing CivitAI metadata";
  clearInfo.addEventListener('kul-button-event', cb);

  spinner.kulActive = true;
  spinner.kulDimensions = '0.6em';
  spinner.kulLayout = 2;
  spinner.slot = 'spinner';

  clearInfo.appendChild(spinner);

  return clearInfo;
};

const createDebug = () => {
  const cb = (e: CustomEvent<KulSwitchEventPayload>) => {
    if (e.detail.eventType === 'change') {
      const value = e.detail.value === 'on' ? true : false;
      getLFManager().toggleDebug(value);
    }
  };

  const debug = document.createElement('kul-switch');
  debug.classList.add(controlPanelFactory.cssClasses.debug);
  debug.kulLabel = 'Debug';
  debug.kulLeadingLabel = true;
  debug.kulValue = !!getLFManager().isDebug();
  debug.title = 'Activate verbose console logging';
  debug.addEventListener('kul-switch-event', cb);

  return debug;
};

const createTheme = () => {
  const cb = (e: CustomEvent<KulButtonEventPayload>) => {
    if (e.detail.eventType === 'click') {
      getKulManager().theme.randomTheme();
    } else if (e.detail.eventType === 'kul-event') {
      const listEvent = e.detail.originalEvent as CustomEvent<KulListEventPayload>;
      const value = listEvent.detail.node.id;
      getKulManager().theme.set(value);
    }
  };

  const themes = document.createElement('kul-button');
  themes.classList.add(controlPanelFactory.cssClasses.themes);
  themes.kulData = getKulThemes();
  themes.title = 'Change the LF Nodes suite theme';
  themes.addEventListener('kul-button-event', cb);

  return themes;
};
