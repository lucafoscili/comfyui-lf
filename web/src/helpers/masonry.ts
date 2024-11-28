import { KulImageEventPayload, KulMasonryEventPayload } from '../types/ketchup-lite/components';
import { KulDataCell } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { MasonryState } from '../types/widgets/masonry';

export const EV_HANDLERS = {
  //#region Masonry handler
  masonry: (state: MasonryState, e: CustomEvent<KulMasonryEventPayload>) => {
    const { eventType, originalEvent, selectedShape } = e.detail;

    switch (eventType) {
      case 'kul-event':
        const { eventType } = (originalEvent as CustomEvent<KulImageEventPayload>).detail;
        switch (eventType) {
          case 'click':
            const v =
              selectedShape.shape?.value || (selectedShape.shape as KulDataCell<'image'>)?.kulValue;
            state.selected.index = selectedShape.index;
            state.selected.name = v ? String(v).valueOf() : '';
            break;
        }
        break;
    }
  },
  //#endregion
};
