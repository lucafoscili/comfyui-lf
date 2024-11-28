import { APIMetadataEntry } from '../types/api/api';
import { KulButtonEventPayload, KulCardEventPayload } from '../types/ketchup-lite/components';
import { Card, CardState } from '../types/widgets/card';
import { CardsWithChip, CardsWithChipState } from '../types/widgets/cardsWithChip';
export declare const CARD_PROPS_TO_SERIALIZE: string[];
export declare const EV_HANDLERS: {
    button: (state: CardState | CardsWithChipState, e: CustomEvent<KulButtonEventPayload>) => void;
    card: (e: CustomEvent<KulCardEventPayload>) => void;
};
export declare const cardPlaceholders: (widget: Card | CardsWithChip, count: number) => void;
export declare const apiCall: (models: APIMetadataEntry[], forcedSave?: boolean) => Promise<Partial<HTMLKulCardElement>[]>;
export declare const prepCards: (container: HTMLDivElement, propsArray: Partial<HTMLKulCardElement>[]) => number;
export declare const getCardProps: (container: HTMLDivElement) => Partial<HTMLKulCardElement>[];
export declare const createCard: () => HTMLKulCardElement;
