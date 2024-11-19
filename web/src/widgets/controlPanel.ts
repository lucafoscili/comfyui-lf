import {
  KulArticleDataset,
  KulArticleEventPayload,
  KulArticleNode,
} from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
} from '../types/widgets/_common';
import {
  createDOMWidget,
  getApiRoutes,
  getKulManager,
  getLFManager,
  normalizeValue,
} from '../utils/common';
import { handleKulEvent, sectionsFactory } from '../helpers/control-panel';
import { ControlPanelDeserializedValue, ControlPanelFactory } from '../types/widgets/controlPanel';

const BASE_CSS_CLASS = 'lf-controlpanel';
const TYPE = CustomWidgetName.controlPanel;

//#region Control panel
export const controlPanelFactory: ControlPanelFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    article: `${BASE_CSS_CLASS}__article`,
    spinner: `${BASE_CSS_CLASS}__spinner`,
  },
  options: () => {
    return {
      hideOnZoom: false,
      getValue() {
        return {
          backup: getLFManager().isBackupEnabled() || false,
          debug: getLFManager().isDebug() || false,
          themes: getKulManager()?.theme?.name || '',
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const { backup, debug, themes } = u.parsedJson as ControlPanelDeserializedValue;

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

          if (getKulManager()) {
            set();
          } else {
            const managerCb = () => {
              set();
              document.removeEventListener('kul-manager-ready', managerCb);
            };
            document.addEventListener('kul-manager-ready', managerCb);
          }
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement('div');
    const options = controlPanelFactory.options();

    contentCb(wrapper, false);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
//#region readyCb
const readyCb = (domWidget: HTMLDivElement) => {
  setTimeout(() => {
    getApiRoutes().backup.new();
    contentCb(domWidget, true);
  }, 750);
};
//#endregion
//#region contentCb
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
//#endregion
//#region Create
const createArticle = () => {
  const { analytics, backup, bug, debug, metadata, theme } = sectionsFactory;
  const logsData: KulArticleNode[] = [];
  const articleData: KulArticleDataset = {
    nodes: [
      {
        children: [
          {
            children: [theme(), analytics(), metadata(), backup(), bug()],
            id: 'section',
          },
          {
            children: [debug(logsData)],
            id: 'section',
          },
        ],
        cssStyle: { display: 'grid', gridTemplateColumns: '1fr 1fr' },
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
//#endregion
