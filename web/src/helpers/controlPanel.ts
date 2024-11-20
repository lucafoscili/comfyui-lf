import { SECTIONS } from '../fixtures/controlPanel';
import { BaseAPIPayload } from '../types/api/api';
import { KulEventName } from '../types/events/events';
import {
  KulDataNode,
  KulListEventPayload,
  KulToggleEventPayload,
} from '../types/ketchup-lite/components';
import {
  KulArticleEventPayload,
  KulArticleNode,
} from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import {
  KulButtonEvent,
  KulButtonEventPayload,
} from '../types/ketchup-lite/components/kul-button/kul-button-declarations';
import { KulList } from '../types/ketchup-lite/components/kul-list/kul-list';
import { KulToggle } from '../types/ketchup-lite/components/kul-toggle/kul-toggle';
import { KulToggleEvent } from '../types/ketchup-lite/components/kul-toggle/kul-toggle-declarations';
import { TagName } from '../types/widgets/_common';
import {
  ControlPanelFixture,
  ControlPanelIds,
  ControlPanelLabels,
  ControlPanelSection,
} from '../types/widgets/controlPanel';
import { getApiRoutes, getKulManager, getLFManager, isButton, isToggle } from '../utils/common';
import { controlPanelFactory } from '../widgets/controlPanel';

const INTRO_SECTION = ControlPanelIds.GitHub;

let TIMEOUT: NodeJS.Timeout;

//#region createContent
export const createContent = () => {
  const grid = document.createElement(TagName.Div);
  const accordion = document.createElement(TagName.KulAccordion);

  const nodes: KulDataNode[] = [];

  accordion.kulData = { nodes };

  for (const id in SECTIONS) {
    if (id !== INTRO_SECTION && Object.prototype.hasOwnProperty.call(SECTIONS, id)) {
      const section = SECTIONS[id as keyof ControlPanelFixture];
      let article: HTMLKulArticleElement;
      let node: KulDataNode;

      switch (id) {
        case ControlPanelIds.Debug:
          const logsData: KulArticleNode[] = [];
          node = section(logsData);
          article = prepArticle(id, node);
          getLFManager().setDebugDataset(article, logsData);
          break;

        default:
          node = section(undefined);
          article = prepArticle(id, node);
          break;
      }

      const { icon, value } = node;
      nodes.push({ icon, id, value });
      accordion.appendChild(article);
    }
  }

  const intro = prepArticle(INTRO_SECTION, SECTIONS[INTRO_SECTION]());

  grid.classList.add(controlPanelFactory.cssClasses.grid);
  grid.appendChild(intro);
  grid.appendChild(accordion);

  return grid;
};
//#endregion
//#region prepArticle
export const prepArticle = (key: string, node: KulArticleNode) => {
  const cb = (e: Event | KulArticleEventPayload) => {
    const { eventType, originalEvent } = (e as CustomEvent<KulArticleEventPayload>).detail;

    switch (eventType) {
      case 'kul-event':
        handleKulEvent(originalEvent);
        break;
    }
  };

  const article = document.createElement(TagName.KulArticle);
  article.kulData = { nodes: [{ children: [node], id: ControlPanelSection.Root }] };
  article.slot = key;
  article.addEventListener(KulEventName.KulArticle, cb);

  return article;
};
//#endregion
//#region handleKulEvent
export const handleKulEvent = (e: Event) => {
  const { comp } = (
    e as CustomEvent<KulButtonEventPayload | KulListEventPayload | KulToggleEventPayload>
  ).detail;

  if (isButton(comp)) {
    handleButtonEvent(e as CustomEvent<KulButtonEventPayload>);
  }

  if (isToggle(comp)) {
    handleToggleEvent(e as CustomEvent<KulToggleEventPayload>);
  }
};

const handleButtonEvent = (e: CustomEvent<KulButtonEventPayload>) => {
  const { comp, eventType, originalEvent } = e.detail;
  const c = (comp as KulButton).rootElement;

  const createSpinner = () => {
    const spinner = document.createElement('kul-spinner');
    spinner.kulActive = true;
    spinner.kulDimensions = '0.6em';
    spinner.kulLayout = 2;
    spinner.slot = 'spinner';
    return spinner;
  };

  const invokeAPI = (promise: Promise<BaseAPIPayload>, label: ControlPanelLabels) => {
    const onResponse = () => {
      c.kulDisabled = true;
      c.kulIcon = 'check';
      c.kulLabel = ControlPanelLabels.Done;
      c.kulShowSpinner = false;
    };
    const restore = (label: ControlPanelLabels) => {
      c.kulDisabled = false;
      c.kulLabel = label;
      c.kulIcon = 'delete';
      TIMEOUT = null;
    };
    requestAnimationFrame(() => (c.kulShowSpinner = true));
    promise.then(() => {
      requestAnimationFrame(onResponse);

      if (TIMEOUT) {
        clearTimeout(TIMEOUT);
      }

      TIMEOUT = setTimeout(() => requestAnimationFrame(() => restore(label)), 1000);
    });
  };

  switch (eventType as KulButtonEvent) {
    case 'click':
      switch (c.kulLabel) {
        case ControlPanelLabels.Backup:
          invokeAPI(getApiRoutes().backup.new('manual'), ControlPanelLabels.Backup);
          break;
        case ControlPanelLabels.ClearLogs:
          const { article, dataset } = getLFManager().getDebugDataset();
          if (dataset?.length > 0) {
            dataset.splice(0, dataset.length);
            article.refresh();
          }
          break;
        case ControlPanelLabels.DeleteMetadata:
          invokeAPI(getApiRoutes().metadata.clear(), ControlPanelLabels.DeleteMetadata);
          break;
        case ControlPanelLabels.DeleteUsage:
          invokeAPI(getApiRoutes().analytics.clear('usage'), ControlPanelLabels.DeleteUsage);
          break;
        case ControlPanelLabels.OpenIssue:
          window.open('https://github.com/lucafoscili/comfyui-lf/issues/new', '_blank');
          break;
        case ControlPanelLabels.Theme:
          getKulManager().theme.randomTheme();
          break;
        default:
          break;
      }
      break;

    case 'kul-event':
      handleListEvent(originalEvent as CustomEvent<KulListEventPayload>);
      break;

    case 'ready':
      switch (c.kulLabel) {
        case ControlPanelLabels.Backup:
          c.appendChild(createSpinner());
          break;
        case ControlPanelLabels.DeleteMetadata:
        case ControlPanelLabels.DeleteUsage:
          c.classList.add('kul-danger');
          c.appendChild(createSpinner());
          break;
      }
  }
};
//#endregion
//#region handleListEvent
const handleListEvent = (e: CustomEvent<KulListEventPayload>) => {
  const { comp, eventType, node } = e.detail;
  const c = (comp as KulList).rootElement;
  const value = node.id;

  switch (eventType) {
    case 'click':
      getKulManager().theme.set(value);
      break;
    case 'ready':
      c.title = 'Change the LF Nodes suite theme';
      getKulManager().theme.set(value);
      break;
  }
};
//#endregion
//#region handleToggleEvent
const handleToggleEvent = (e: CustomEvent<KulToggleEventPayload>) => {
  const { comp, eventType, value } = e.detail;
  const c = (comp as KulToggle).rootElement;

  switch (eventType as KulToggleEvent) {
    case 'change':
      getLFManager().toggleDebug(value === 'on' ? true : false);
      break;
    case 'ready':
      c.title = 'Activate verbose console logging';
  }
};
//#endregion
