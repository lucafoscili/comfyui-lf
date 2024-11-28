import { KulChipEventPayload } from '../types/ketchup-lite/components';
import { ChipState } from '../types/widgets/chip';
export declare const EV_HANDLERS: {
    chip: (state: ChipState, e: CustomEvent<KulChipEventPayload>) => Promise<void>;
};
