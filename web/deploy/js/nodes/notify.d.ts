import { NotifyPayload } from '../types/events';
export declare const notifyFactory: {
    eventHandler: (event: CustomEvent<NotifyPayload>) => void;
    register: () => void;
};
