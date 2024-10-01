import { KulDataDataset } from '../types/ketchup-lite/components';
import { CardWidget } from '../types/widgets';
export declare const fetchModelMetadata: (widget: CardWidget, models: {
    dataset: KulDataDataset;
    hash: string;
    path: string;
}[]) => void;
