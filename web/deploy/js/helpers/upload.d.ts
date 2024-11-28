import { KulUploadEventPayload } from '../types/ketchup-lite/components';
import { UploadState } from '../types/widgets/upload';
export declare const EV_HANDLERS: {
    upload: (state: UploadState, e: CustomEvent<KulUploadEventPayload>) => Promise<void>;
};
