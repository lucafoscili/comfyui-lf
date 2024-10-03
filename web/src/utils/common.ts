import type { KulDataDataset } from '../types/ketchup-lite/components';
import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';
import type { LFWindow } from '../managers/manager';
import {
  BaseWidgetCallback,
  ComfyWidgetMap,
  ComfyWidgetName,
  CustomWidgetMap,
  CustomWidgetName,
  CustomWidgetOptions,
} from '../types/widgets';
import { LogSeverity } from '../types/manager';

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

export const deserializeValue = (
  str: string,
): {
  validJson: boolean;
  parsedJson?: {};
  unescapedStr: string;
} => {
  let validJson = false;
  let parsedJson: Record<string, unknown> | undefined = undefined;
  let unescapedStr = str;

  const recursiveUnescape = (inputStr: string): string => {
    let newStr = inputStr.replace(/\\(.)/g, '$1');
    while (newStr !== inputStr) {
      inputStr = newStr;
      newStr = inputStr.replace(/\\(.)/g, '$1');
    }
    return newStr;
  };

  try {
    parsedJson = JSON.parse(str);
    validJson = true;
    unescapedStr = JSON.stringify(parsedJson, null, 2);
  } catch (error) {
    unescapedStr = recursiveUnescape(str);
  }

  return { validJson, parsedJson, unescapedStr };
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

export const serializeValue = <T extends {}>(value: T) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    getLFManager().log(`Error deserializing value`, { value }, LogSeverity.Error);
    return '';
  }
};

export const splitByLastSpaceBeforeAnyBracket = (input: string) => {
  const match = input.match(/\s+(.+)\[.*?\]/);

  if (match && match[1]) {
    return match[1];
  }

  return input;
};
