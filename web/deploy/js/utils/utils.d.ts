import type { KulDataDataset } from '../types/ketchup-lite/components';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager';
export declare const capitalize: (input: string) => string;
export declare const getKulManager: () => KulManager;
export declare const getKulThemes: () => KulDataDataset;
export declare const kulManagerExists: () => boolean;
