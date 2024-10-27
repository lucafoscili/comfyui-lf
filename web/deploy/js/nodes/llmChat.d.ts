import { ChatWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
export declare const llmChatFactory: {
    register: (setW: ChatWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.chat>) => void;
};
