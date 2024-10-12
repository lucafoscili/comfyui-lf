import { KulCardEventPayload } from '../types/ketchup-lite/components';
export declare const CARD_PROPS_TO_SERIALIZE: string[];
export declare const cardHandler: (container: HTMLDivElement, propsArray: Partial<HTMLKulCardElement>[]) => number;
export declare const cardEventHandler: (e: CustomEvent<KulCardEventPayload>) => void;
export declare const getCardProps: (container: HTMLDivElement) => Partial<HTMLKulCardElement>[];
export declare const createCard: () => HTMLKulCardElement;
