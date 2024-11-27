import { KulMessengerEventPayload } from '../types/ketchup-lite/components';
import { MessengerState } from '../types/widgets/messenger';

//#region handleMessengerEvent
export const handleMessengerEvent = (
  e: CustomEvent<KulMessengerEventPayload>,
  state: MessengerState,
) => {
  const { eventType, config } = e.detail;

  const { elements } = state;
  const { messenger } = elements;

  switch (eventType) {
    case 'save':
      if (config && typeof config === 'object') {
        messenger.dataset.config = JSON.stringify(config);
      }
      break;
  }
};
//#endregion
