import { KulChatEventPayload } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager/manager';
import { ChatState } from '../types/widgets/chat';
import { getLFManager } from '../utils/common';

export const EV_HANDLERS = {
  //#region Chat handler
  chat: (e: CustomEvent<KulChatEventPayload>, state: ChatState) => {
    const { eventType, history, status } = e.detail;

    switch (eventType) {
      case 'polling':
        const severity =
          status === 'ready'
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
