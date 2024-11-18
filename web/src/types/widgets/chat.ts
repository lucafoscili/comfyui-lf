import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from '../widgets';

//#region Chat
export interface Chat extends Widget {
  options: ChatOptions;
  type: [CustomWidgetName.chat];
}
export interface ChatFactory extends BaseWidgetFactory<ChatOptions> {
  options: ChatOptionsCallback;
}
export type ChatOptionsCallback = (chat: HTMLKulChatElement) => ChatOptions;
export interface ChatOptions extends BaseWidgetOptions<ChatValueDeserializedValue> {
  getComp(): HTMLKulChatElement;
}
export type ChatSetter = () => {
  [CustomWidgetName.chat]: BaseWidgetCallback<CustomWidgetName.chat>;
};
export type ChatValueDeserializedValue = string;
//#endregion
