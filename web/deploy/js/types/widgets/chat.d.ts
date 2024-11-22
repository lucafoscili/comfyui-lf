import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
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
export declare enum ChatCSS {
    Content = "lf-chat",
    Widget = "lf-chat__widget"
}
