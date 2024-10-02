import { KulDataDataset } from '../types/ketchup-lite/components';
import { CardsWithChipWidget, CardWidget } from '../types/widgets';
export declare const fetchModelMetadata: (widget: CardWidget | CardsWithChipWidget, models: {
    dataset: KulDataDataset;
    hash: string;
    path: string;
}[]) => Promise<KulDataDataset[]>;
