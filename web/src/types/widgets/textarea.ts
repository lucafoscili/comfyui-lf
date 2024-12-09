import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-textarea';
export enum TextareaCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
  WidgetError = `${BASE_CSS_CLASS}__widget--error`,
}
//#endregion

//#region Widget
export type Textarea = Widget<CustomWidgetName.textarea>;
export type TextareaFactory = WidgetFactory<TextareaDeserializedValue, TextareaState>;
export type TextareaNormalizeCallback = NormalizeValueCallback<TextareaDeserializedValue | string>;
//#endregion

//#region Value
export type TextareaDeserializedValue = Record<string, unknown> | Array<Record<string, unknown>>;
//#endregion

//#region State
export interface TextareaState extends BaseWidgetState {
  textarea: HTMLTextAreaElement;
}
//#endregion
