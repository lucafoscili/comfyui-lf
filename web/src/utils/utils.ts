import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';

const DOM = document.documentElement as KulDom;

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

export const kulManagerExists: () => boolean = () => {
  return !!DOM.ketchupLite;
};
