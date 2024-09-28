import type { KulDataDataset } from '../types/ketchup-lite/components';
import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';
import type { LFWindow } from '../managers/manager';
import {
  BaseWidgetCallback,
  CardWidget,
  ComfyWidgetMap,
  ComfyWidgetName,
  CustomWidgetMap,
  CustomWidgetName,
  CustomWidgetOptions,
} from '../types/widgets';
import { LogSeverity } from '../types/manager';
import { CheckpointSelectorPayload } from '../types/events';

const DOM = document.documentElement as KulDom;
const WINDOW = window as unknown as LFWindow;

export const areJSONEqual = (a: unknown, b: unknown) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const capitalize = (input: string) => {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

export const createDOMWidget = (
  name: string,
  type: CustomWidgetName,
  element: HTMLDivElement,
  node: NodeType,
  options: CustomWidgetOptions = undefined,
) => {
  getLFManager().log(`Creating '${type}'`, { element });

  return node.addDOMWidget(name, type, element, options);
};

export const fetchModelInfo = (
  widget: CardWidget,
  payload: CheckpointSelectorPayload,
  comp: HTMLKulCardElement,
) => {
  widget.options.setValue({
    nodes: [
      {
        cells: {
          kulImage: { shape: 'image', value: 'cloud_download' },
          kulText: { shape: 'text', value: 'Loading...' },
        },
        id: '0',
      },
    ],
  });
  getApiRoutes()
    .modelInfoFromCivitAI(payload.hash)
    .then(async (r) => {
      const id = r.id;
      if (id) {
        switch (typeof id) {
          case 'number':
            const dataset: KulDataDataset = {
              nodes: [
                {
                  cells: { kulImage: null, text1: null, text2: null, text3: null },
                  id: id.toString(),
                },
              ],
            };
            const cells = dataset.nodes[0].cells;
            cells.kulImage = {
              kulStyle: 'img {object-fit: cover;}',
              shape: 'image',
              value: r.images[0].url,
            };
            cells.text1 = { value: r.model.name };
            cells.text2 = { value: r.name };
            cells.text3 = {
              value: `
- Info              
Type: ${r.model?.type ? r.model.type : 'N/A'}
Status: ${r.status ? r.status : 'N/A'}
Base model: ${r.baseModel ? r.baseModel : 'N/A'}
Description: ${r.description ? r.description : 'N/A'}

- Trained words:
${r.trainedWords?.length ? r.trainedWords.join(', ') : 'N/A'}

- Stats
Updated at: ${r.updatedAt ? r.updatedAt : 'N/A'}
Downloads: ${r.stats?.downloadCount ? r.stats.downloadCount : 'N/A'}
Rating: ${r.stats?.rating ? r.stats.rating : 'N/A'}
Thumbs up: ${r.stats?.thumbsUpCount ? r.stats.thumbsUpCount : 'N/A'}
                `,
            };
            comp.dataset.civitaiLink = `https://civitai.com/models/${r.modelId}`;
            comp.kulData = dataset;
            comp.kulStyle = '.sub-2.description { white-space: pre-wrap; }';
            comp.title = "Click to open the model's page on CivitAI";
            break;
          default:
            comp.dataset.civitaiLink = ``;
            comp.title = id;
            payload.dataset.nodes[0].cells.kulButton = {
              kulDisabled: true,
              kulIcon: 'warning',
              shape: 'button',
              value: '',
            };
            payload.dataset.nodes[0].cells.text3 = {
              value: "Whoops! It seems like something's off. Falling back to local data.",
            };
            widget.options.setValue(payload.dataset);
            break;
        }
      }
    });
};

export const findWidget = <T extends CustomWidgetName>(
  node: NodeType,
  type: T,
): CustomWidgetMap[T] => {
  return node?.widgets?.find((w) => w.type === type) as CustomWidgetMap[T];
};

export const getApiRoutes = () => {
  return WINDOW.lfManager.getApiRoutes();
};

export const getCustomWidget = <T extends CustomWidgetName>(
  node: NodeType,
  type: T,
  addW?: BaseWidgetCallback,
): CustomWidgetMap[T] => {
  return (
    (node?.widgets?.find(
      (w) => w.type.toLowerCase() === type.toLowerCase(),
    ) as CustomWidgetMap[T]) || (addW ? (addW(node, type).widget as CustomWidgetMap[T]) : undefined)
  );
};

export const getInput = (node: NodeType, type: ComfyWidgetName | CustomWidgetName): SlotInfo => {
  return node?.inputs?.find((w) => w.type.toLowerCase() === type.toLowerCase()) as SlotInfo;
};

export const getKulManager = () => {
  return DOM.ketchupLite;
};

export const getKulThemes = () => {
  const themes = getKulManager().theme.getThemes();

  const kulData: KulDataDataset = {
    nodes: [{ children: [], icon: 'style', id: 'root', value: 'Theme' }],
  };
  for (let index = 0; index < themes.length; index++) {
    const currentTheme = themes[index];
    kulData.nodes[0].children.push({
      id: currentTheme,
      value: capitalize(currentTheme),
    });
  }

  return kulData;
};

export const getLFManager = () => {
  return WINDOW.lfManager;
};

export const getOutput = (node: NodeType, type: ComfyWidgetName | CustomWidgetName): SlotInfo => {
  return node?.outputs?.find((w) => w.type.toLowerCase() === type.toLowerCase()) as SlotInfo;
};

export const getWidget = <T extends ComfyWidgetName>(
  node: NodeType,
  type: T,
): ComfyWidgetMap[T] => {
  return node?.widgets?.find(
    (w) => w.type.toLowerCase() === type.toLowerCase(),
  ) as ComfyWidgetMap[T];
};

export const isValidJSON = (value: unknown) => {
  try {
    JSON.stringify(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const kulManagerExists = () => {
  return !!DOM.ketchupLite;
};

export const log = () => {
  return WINDOW.lfManager.log;
};

export const refreshChart = (node: NodeType) => {
  try {
    const domWidget =
      findWidget(node, CustomWidgetName.countBarChart)?.element ||
      findWidget(node, CustomWidgetName.histogram)?.element;
    if (domWidget) {
      const chart = domWidget.querySelector('kul-chart') as HTMLKulChartElement;
      if (chart) {
        const canvas = chart.shadowRoot.querySelector('canvas');
        const isSmaller =
          canvas?.clientWidth < chart.clientWidth || canvas?.clientHeight < chart.clientHeight;
        const isBigger =
          canvas?.clientWidth > chart.clientWidth || canvas?.clientHeight > chart.clientHeight;
        if (isSmaller || isBigger) {
          chart.refresh();
        }
      }
    }
  } catch (error) {
    getLFManager().log('Whoops! It seems there is no chart. :V', { error }, LogSeverity.Error);
  }
};

export const splitByLastSpaceBeforeAnyBracket = (input: string) => {
  const match = input.match(/\s+(.+)\[.*?\]/);

  if (match && match[1]) {
    return match[1];
  }

  return input;
};

export const unescapeJson = (
  str: string,
): {
  validJson: boolean;
  parsedJson?: Record<string, unknown>;
  unescapedStr: string;
} => {
  let validJson = false;
  let parsedJson: Record<string, unknown> | undefined = undefined;
  let unescapedStr = str;

  try {
    parsedJson = JSON.parse(str);
    validJson = true;
    unescapedStr = JSON.stringify(parsedJson, null, 2);
  } catch (error) {
    unescapedStr = str.replace(/\\(.)/g, '$1');
  }

  return { validJson, parsedJson, unescapedStr };
};
