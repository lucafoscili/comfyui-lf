import { KulListEventPayload } from '../types/ketchup-lite/components';
import { HistoryState } from '../types/widgets/history';
export declare const EV_HANDLERS: {
    list: (state: HistoryState, e: CustomEvent<KulListEventPayload>) => void;
};
