import type { KulDataDataset } from '../types/ketchup-lite/components';
import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';
import type { LFWindow } from '../managers/manager';
import type {
  BaseWidgetCallback,
  CustomWidgetMap,
  CustomWidgetName,
  CustomWidgetOptions,
} from '../types/widgets';

const DOM = document.documentElement as KulDom;
const WINDOW = window as unknown as LFWindow;

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

export const getApiRoutes = () => {
  return WINDOW.lfManager.getApiRoutes();
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

export const kulManagerExists = () => {
  return !!DOM.ketchupLite;
};

export const getWidget = <T extends CustomWidgetName>(
  node: NodeType,
  name: T,
  addW: BaseWidgetCallback,
): CustomWidgetMap[T] => {
  return (
    (node?.widgets?.find((w) => w.name === name) as CustomWidgetMap[T]) ||
    (addW(node, name).widget as CustomWidgetMap[T])
  );
};

export const log = () => {
  return WINDOW.lfManager.log;
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
    const parsed = JSON.parse(str);
    validJson = true;
    parsedJson = parsed;
    unescapedStr = JSON.stringify(parsed);
  } catch (error) {
    unescapedStr = str.replace(/\\(.)/g, '$1');
  }

  return { validJson, parsedJson, unescapedStr };
};
