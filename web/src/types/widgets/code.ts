import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-code';

//#region Code
export interface Code extends Widget {
  options: CodeOptions;
  type: [CustomWidgetName.code];
}
export interface CodeFactory extends BaseWidgetFactory<CodeOptions> {
  options: CodeOptionsCallback;
}
export type CodeOptionsCallback = (code: HTMLKulCodeElement) => CodeOptions;
export interface CodeOptions extends BaseWidgetOptions<CodeValueDeserializedValue> {
  getComp(): HTMLKulCodeElement;
}
export type CodeSetter = () => {
  [CustomWidgetName.code]: BaseWidgetCallback<CustomWidgetName.code>;
};
export type CodeValueDeserializedValue = string;
export enum CodeCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
