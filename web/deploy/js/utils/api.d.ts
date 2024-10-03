import { KulDataDataset } from '../types/ketchup-lite/components';
import { CardsWithChipWidget, CardWidget } from '../types/widgets';
export declare const cardPlaceholders: (widget: CardWidget | CardsWithChipWidget, count: number) => void;
export declare const fetchModelMetadata: (models: {
    apiFlag: boolean;
    dataset: KulDataDataset;
    hash: string;
    path: string;
}[]) => Promise<Partial<HTMLKulCardElement>[]>;
