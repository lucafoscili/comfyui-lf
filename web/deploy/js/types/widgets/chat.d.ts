import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum ChatCSS {
    Content = "lf-chat",
    Widget = "lf-chat__widget"
}
export type Chat = Widget<CustomWidgetName.chat>;
export type ChatFactory = WidgetFactory<ChatDeserializedValue, ChatState>;
export type ChatNormalizeCallback = NormalizeValueCallback<ChatDeserializedValue | string>;
export type ChatDeserializedValue = string;
export interface ChatState extends BaseWidgetState {
    chat: HTMLKulChatElement;
    history: string;
}
