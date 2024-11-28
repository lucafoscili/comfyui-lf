import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum ChipCSS {
    Content = "lf-chip",
    Widget = "lf-chip__widget"
}
export type Chip = Widget<CustomWidgetName.chip>;
export type ChipFactory = WidgetFactory<ChipDeserializedValue, ChipState>;
export type ChipNormalizeCallback = NormalizeValueCallback<ChipDeserializedValue | string>;
export type ChipDeserializedValue = string;
export interface ChipState extends BaseWidgetState {
    chip: HTMLKulChipElement;
    selected: string;
}
