import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface Card extends Widget {
    options: CardOptions;
    type: [CustomWidgetName.card];
}
export interface CardFactory extends BaseWidgetFactory<CardOptions> {
    options: CardOptionsCallback;
}
export type CardOptionsCallback = (grid: HTMLDivElement) => CardOptions;
export interface CardOptions extends BaseWidgetOptions<CardDeserializedValue> {
    getComp(): HTMLKulCardElement[];
}
export type CardSetter = () => {
    [CustomWidgetName.card]: BaseWidgetCallback<CustomWidgetName.card>;
};
export interface CardDeserializedValue {
    props: Partial<HTMLKulCardElement>[];
}
export declare enum CardCSS {
    Content = "lf-card",
    ContentHasButton = "lf-card--has-button",
    Grid = "lf-card__grid"
}
