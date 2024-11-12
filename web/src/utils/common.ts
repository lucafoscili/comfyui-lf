import type { LFWindow } from '../managers/manager';
import {
  ComfyWidgetMap,
  ComfyWidgetName,
  CustomWidgetDeserializedValuesMap,
  CustomWidgetMap,
  CustomWidgetName,
  CustomWidgetOptions,
  NormalizeValueCallback,
  UnescapeJSONPayload,
} from '../types/widgets';
import { LogSeverity } from '../types/manager';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import { KulChart } from '../types/ketchup-lite/components/kul-chart/kul-chart';
import { KulDataDataset } from '../types/ketchup-lite/components';
import { KulList } from '../types/ketchup-lite/components/kul-list/kul-list';
import { KulSwitch } from '../types/ketchup-lite/components/kul-switch/kul-switch';
import { KulComponent, KulComponentName } from '../types/ketchup-lite/types/GenericTypes';
import { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';

const DEFAULT_WIDGET_NAME = 'ui_widget';
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
  type: CustomWidgetName,
  element: HTMLDivElement,
  node: NodeType,
  options: CustomWidgetOptions = undefined,
) => {
  getLFManager().log(`Creating '${type}'`, { element });
  try {
    const { nodeData } = Object.getPrototypeOf(node).constructor as NodeType;
    let name = DEFAULT_WIDGET_NAME;

    for (const key in nodeData.input) {
      if (Object.prototype.hasOwnProperty.call(nodeData.input, key)) {
        const input = nodeData.input[key as keyof Input];

        for (const key in input) {
          if (Object.prototype.hasOwnProperty.call(input, key)) {
            const element = Array.from(input[key]);
            if (element[0] === type) {
              name = key;
              break;
            }
          }
        }
        if (name) {
          break;
        }
      }
    }

    return node.addDOMWidget(name, type, element, options);
  } catch (error) {
    getLFManager().log(
      `Couldn't find a widget of type ${type}`,
      { error, node },
      LogSeverity.Warning,
    );
    return node.addDOMWidget(DEFAULT_WIDGET_NAME, type, element, options);
  }
};

export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
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
): CustomWidgetMap[T] => {
  return node?.widgets?.find(
    (w) => w.type.toLowerCase() === type.toLowerCase(),
  ) as CustomWidgetMap[T];
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
    nodes: [{ children: [], icon: 'style', id: 'root', value: 'Random theme' }],
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

export const isButton = (comp: KulComponent<KulComponentName>): comp is KulButton => {
  return comp.rootElement.tagName.toLowerCase() === 'kul-button';
};
export const isChart = (comp: KulComponent<KulComponentName>): comp is KulChart => {
  return comp.rootElement.tagName.toLowerCase() === 'kul-chart';
};
export const isList = (comp: KulComponent<KulComponentName>): comp is KulList => {
  return comp.rootElement.tagName.toLowerCase() === 'kul-list';
};
export const isSwitch = (comp: KulComponent<KulComponentName>): comp is KulSwitch => {
  return comp.rootElement.tagName.toLowerCase() === 'kul-switch';
};

export const isValidJSON = (value: unknown) => {
  try {
    JSON.stringify(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const isValidNumber = (n: number) => {
  return !isNaN(n) && typeof n === 'number';
};

export const kulManagerExists = () => {
  return !!DOM.ketchupLite;
};

export const log = () => {
  return WINDOW.lfManager.log;
};

export const normalizeValue = <
  W extends CustomWidgetName,
  V extends CustomWidgetDeserializedValuesMap<W>,
>(
  value: V | string,
  callback: NormalizeValueCallback<V | string>,
  widget: W,
  onException?: () => void,
) => {
  try {
    callback(value, unescapeJson(value));
  } catch (error) {
    if (onException) {
      onException();
    }
    getLFManager().log(`Normalization error!`, { error, widget }, LogSeverity.Error);
  }
};

export const refreshChart = (node: NodeType) => {
  try {
    const domWidget =
      findWidget(node, CustomWidgetName.countBarChart)?.element ||
      findWidget(node, CustomWidgetName.tabBarChart)?.element;
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

export const unescapeJson = (input: any): UnescapeJSONPayload => {
  let validJson = false;
  let parsedJson: Record<string, unknown> | undefined = undefined;
  let unescapedStr = input;

  const recursiveUnescape = (inputStr: string): string => {
    let newStr = inputStr.replace(/\\(.)/g, '$1');
    while (newStr !== inputStr) {
      inputStr = newStr;
      newStr = inputStr.replace(/\\(.)/g, '$1');
    }
    return newStr;
  };

  const deepParse = (data: any) => {
    if (typeof data === 'string') {
      try {
        const innerJson = JSON.parse(data);
        if (typeof innerJson === 'object' && innerJson !== null) {
          return deepParse(innerJson);
        }
      } catch (e) {
        return data;
      }
    } else if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach((key) => {
        data[key] = deepParse(data[key]);
      });
    }
    return data;
  };

  try {
    parsedJson = JSON.parse(input);
    validJson = true;
    parsedJson = deepParse(parsedJson);
    unescapedStr = JSON.stringify(parsedJson, null, 2);
  } catch (error) {
    if (typeof input === 'object' && input !== null) {
      try {
        unescapedStr = JSON.stringify(input, null, 2);
        validJson = true;
        parsedJson = input;
      } catch (stringifyError) {
        unescapedStr = recursiveUnescape(input.toString());
      }
    } else {
      unescapedStr = recursiveUnescape(input.toString());
    }
  }

  return { validJson, parsedJson, unescapedStr };
};
