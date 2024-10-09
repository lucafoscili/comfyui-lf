import { APIMetadataEntry } from '../types/manager';
import { CardsWithChipWidget, CardWidget } from '../types/widgets';
export declare const cardPlaceholders: (widget: CardWidget | CardsWithChipWidget, count: number) => void;
export declare const fetchModelMetadata: (models: APIMetadataEntry[], forcedSave?: boolean) => Promise<Partial<HTMLKulCardElement>[]>;
