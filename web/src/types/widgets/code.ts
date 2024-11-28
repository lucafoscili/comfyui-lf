import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-code';
export enum CodeCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion

//#region Widget
export type Code = Widget<CustomWidgetName.code>;
export type CodeFactory = WidgetFactory<CodeDeserializedValue, CodeState>;
export type CodeNormalizeCallback = NormalizeValueCallback<CodeDeserializedValue | string>;
//#endregion

//#region Value
export type CodeDeserializedValue = string;
//#endregion

//#region State
export interface CodeState extends BaseWidgetState {
  code: HTMLKulCodeElement;
}
//#endregion
