import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum CardCSS {
    Content = "lf-card",
    ContentHasButton = "lf-card--has-button",
    Grid = "lf-card__grid"
}
export type Card = Widget<CustomWidgetName.card>;
export type CardFactory = WidgetFactory<CardDeserializedValue, CardState>;
export type CardNormalizeCallback = NormalizeValueCallback<CardDeserializedValue | string>;
export interface CardDeserializedValue {
    props: Partial<HTMLKulCardElement>[];
}
export interface CardState extends BaseWidgetState {
    grid: HTMLDivElement;
}
