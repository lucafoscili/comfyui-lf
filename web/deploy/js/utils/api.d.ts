import { APIMetadataEntry } from '../types/api/api';
import { Card } from '../types/widgets/card';
import { CardsWithChip } from '../types/widgets/cardsWithChip';
export declare const cardPlaceholders: (widget: Card | CardsWithChip, count: number) => void;
export declare const fetchModelMetadata: (models: APIMetadataEntry[], forcedSave?: boolean) => Promise<Partial<HTMLKulCardElement>[]>;
