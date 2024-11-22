import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-chip';

//#region Chip
export interface Chip extends Widget {
  options: ChipOptions;
  type: [CustomWidgetName.chip];
}
export interface ChipFactory extends BaseWidgetFactory<ChipOptions> {
  options: ChipOptionsCallback;
}
export type ChipOptionsCallback = (chip: HTMLKulChipElement) => ChipOptions;
export interface ChipOptions extends BaseWidgetOptions<ChipValueDeserializedValue> {
  getComp(): HTMLKulChipElement;
}
export type ChipSetter = () => {
  [CustomWidgetName.chip]: BaseWidgetCallback<CustomWidgetName.chip>;
};
export type ChipValueDeserializedValue = string;
export enum ChipCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
