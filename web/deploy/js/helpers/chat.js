import { LogSeverity } from '../types/manager/manager.js';
import { getLFManager } from '../utils/common.js';
export const EV_HANDLERS = {
    //#region Chat handler
    chat: (state, e) => {
        const { eventType, history, status } = e.detail;
        switch (eventType) {
            case 'polling':
                const severity = status === 'ready'
                    ? LogSeverity.Info
                    : status === 'offline'
                        ? LogSeverity.Error
                        : LogSeverity.Warning;
                getLFManager().log('Chat widget, polling status: ' + status, { chat: e.detail }, severity);
                break;
            case 'update':
                state.history = history;
                break;
        }
    },
    //#endregion
};
