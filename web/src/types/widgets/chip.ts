import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-chip';
export enum ChipCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion

//#region Widget
export type Chip = Widget<CustomWidgetName.chip>;
export type ChipFactory = WidgetFactory<ChipDeserializedValue, ChipState>;
export type ChipNormalizeCallback = NormalizeValueCallback<ChipDeserializedValue | string>;
//#endregion

//#region Value
export type ChipDeserializedValue = string;
//#endregion

//#region State
export interface ChipState extends BaseWidgetState {
  chip: HTMLKulChipElement;
  selected: string;
}
//#endregion
