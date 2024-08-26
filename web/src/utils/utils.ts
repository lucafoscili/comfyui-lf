import type { KulDataDataset } from '../types/ketchup-lite/components';
import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager';
import type { LFManager, LFWindow } from '../manager/lf-manager';

const DOM = document.documentElement as KulDom;
const WINDOW = window as unknown as LFWindow;

export const capitalize = (input: string) => {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

export const getKulManager: () => KulManager = () => {
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

export const getLFManager: () => LFManager = () => {
  return WINDOW.lfManager;
};

export const kulManagerExists: () => boolean = () => {
  return !!DOM.ketchupLite;
};
