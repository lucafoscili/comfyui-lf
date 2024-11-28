import { KulMasonryEventPayload } from '../types/ketchup-lite/components';
import { MasonryState } from '../types/widgets/masonry';
export declare const EV_HANDLERS: {
    masonry: (state: MasonryState, e: CustomEvent<KulMasonryEventPayload>) => void;
};
