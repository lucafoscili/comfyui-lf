import { KulMessengerEventPayload } from '../types/ketchup-lite/components';
import { MessengerState } from '../types/widgets/messenger';
export declare const EV_HANDLERS: {
    messenger: (state: MessengerState, e: CustomEvent<KulMessengerEventPayload>) => void;
};
