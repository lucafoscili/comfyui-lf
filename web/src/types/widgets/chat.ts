import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-chat';
export enum ChatCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion

//#region Widget
export type Chat = Widget<CustomWidgetName.chat>;
export type ChatFactory = WidgetFactory<ChatDeserializedValue, ChatState>;
export type ChatNormalizeCallback = NormalizeValueCallback<ChatDeserializedValue | string>;
//#endregion

//#region Value
export type ChatDeserializedValue = string;
//#endregion

//#region State
export interface ChatState extends BaseWidgetState {
  chat: HTMLKulChatElement;
  history: string;
}
//#endregion
