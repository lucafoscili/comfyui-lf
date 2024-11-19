import {
  KulArticleDataset,
  KulArticleEventPayload,
  KulArticleNode,
} from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import {
  createDOMWidget,
  getApiRoutes,
  getKulManager,
  getLFManager,
  normalizeValue,
} from '../utils/common';
import { handleKulEvent, sectionsFactory } from '../helpers/controlPanel';
import { ControlPanelDeserializedValue, ControlPanelFactory } from '../types/widgets/controlPanel';
import { KulEventName } from '../types/events/events';

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
    const wrapper = document.createElement(TagName.Div);
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
  const content = document.createElement(TagName.Div);

  const createSpinner = () => {
    const spinner = document.createElement(TagName.KulSpinner);
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
  const container = document.createElement(TagName.Div);
  const accordion = document.createElement(TagName.KulAccordion);
  const ghArticle = document.createElement(TagName.KulArticle);
  const article = document.createElement(TagName.KulArticle);

  const { analytics, backup, bug, debug, github, metadata, theme } = sectionsFactory;
  const logsData: KulArticleNode[] = [];

  const cb = (e: Event | KulArticleEventPayload) => {
    const { eventType, originalEvent } = (e as CustomEvent<KulArticleEventPayload>).detail;

    switch (eventType) {
      case 'kul-event':
        handleKulEvent(originalEvent);
        break;
    }
  };

  ghArticle.kulData = {
    nodes: [
      {
        children: [
          {
            children: [github()],
            id: 'section',
          },
        ],
        id: 'root',
        value: '',
      },
    ],
  };
  ghArticle.slot = 'gh-article';

  accordion.kulData = { nodes: [{ icon: 'github', id: 'gh-article', value: 'Latest release' }] };
  accordion.appendChild(ghArticle);

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
  article.kulData = articleData;
  article.addEventListener(KulEventName.KulArticle, cb);

  getLFManager().setDebugDataset(article, logsData);

  container.appendChild(accordion);
  container.appendChild(article);

  return container;
};
//#endregion
