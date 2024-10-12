import type { KulArticleDataset } from '../types/ketchup-lite/components';
import {
  KulArticleEventPayload,
  KulArticleNode,
} from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
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
  getLFManager,
  serializeValue,
} from '../utils/common';
import { handleKulEvent, sectionsFactory } from '../helpers/control-panel';

const BASE_CSS_CLASS = 'lf-controlpanel';
const TYPE = CustomWidgetName.controlPanel;

export const controlPanelFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    article: `${BASE_CSS_CLASS}__article`,
    spinner: `${BASE_CSS_CLASS}__spinner`,
  },
  options: () => {
    return {
      getValue() {
        return serializeValue({
          backup: getLFManager()?.isBackupEnabled(),
          debug: getLFManager()?.isDebug(),
          themes: getKulManager()?.theme.name,
        });
      },
      setValue(value) {
        const { backup, debug, themes } = deserializeValue(value)
          .parsedJson as ControlPanelWidgetDeserializedValue;

        const set = () => {
          if (backup === true || backup === false) {
            getLFManager().toggleBackup(backup);
          }
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
    getApiRoutes().backup.new();
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
    const article = createArticle();

    content.appendChild(article);
    domWidget.replaceChild(content, domWidget.firstChild);
  } else {
    const spinner = createSpinner();
    spinner.addEventListener('kul-spinner-event', readyCb.bind(null, domWidget));
    content.appendChild(spinner);
    domWidget.appendChild(content);
  }

  content.classList.add(controlPanelFactory.cssClasses.content);
};

const createArticle = () => {
  const { analytics, backup, bug, debug, metadata, theme } = sectionsFactory;
  const logsData: KulArticleNode[] = [];
  const articleData: KulArticleDataset = {
    nodes: [
      {
        children: [
          {
            children: [theme(), analytics(), metadata(), backup(), debug(logsData), bug()],
            id: 'section',
            value: 'Control panel',
          },
        ],
        id: 'root',
        value: '',
      },
    ],
  };

  const cb = (e: Event | KulArticleEventPayload) => {
    const { eventType, originalEvent } = (e as CustomEvent<KulArticleEventPayload>).detail;

    switch (eventType) {
      case 'kul-event':
        handleKulEvent(originalEvent);
        break;
    }
  };

  const article = document.createElement('kul-article');
  article.kulData = articleData;
  article.addEventListener('kul-article-event', cb);

  getLFManager().setDebugDataset(article, logsData);

  return article;
};
