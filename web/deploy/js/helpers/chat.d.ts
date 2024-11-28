import { KulChatEventPayload } from '../types/ketchup-lite/components';
import { ChatState } from '../types/widgets/chat';
export declare const EV_HANDLERS: {
    chat: (state: ChatState, e: CustomEvent<KulChatEventPayload>) => void;
};
